"""
FastAPI backend for the Iris Flower Predictor.

Loads the trained Keras model (Dense 16->8->3 softmax), the StandardScaler
fit on training data, and the label-class order, once at startup. Exposes
POST /predict, matching the pipeline from the user's Kaggle notebook exactly:
feature order, scaling, and label decoding.
"""
import json
import os
import tempfile
import zipfile

import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import tensorflow as tf

MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")


def load_compatible_model(model_path):
    with zipfile.ZipFile(model_path) as source:
        config = json.loads(source.read("config.json"))

        def remove_unsupported_fields(value):
            if isinstance(value, dict):
                value.pop("quantization_config", None)
                value.pop("input_axes", None)
                value.pop("output_axes", None)
                for child in value.values():
                    remove_unsupported_fields(child)
            elif isinstance(value, list):
                for child in value:
                    remove_unsupported_fields(child)

        remove_unsupported_fields(config)

        with tempfile.NamedTemporaryFile(suffix=".keras", delete=False) as temp_file:
            compatible_path = temp_file.name

        try:
            with zipfile.ZipFile(compatible_path, "w") as target:
                for item in source.infolist():
                    data = json.dumps(config).encode() if item.filename == "config.json" else source.read(item.filename)
                    target.writestr(item, data)
            return tf.keras.models.load_model(compatible_path)
        finally:
            os.remove(compatible_path)

app = FastAPI(title="Iris Flower Predictor API")

# Enable CORS for the React frontend (Vite dev server + common local ports)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", "").rstrip("/"),
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load model artifacts once at startup ---
try:
    model = load_compatible_model(os.path.join(MODEL_DIR, "iris_model.keras"))
    scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
    with open(os.path.join(MODEL_DIR, "classes.json")) as f:
        meta = json.load(f)
    CLASSES = meta["classes"]  # index -> species name, e.g. ["setosa", "versicolor", "virginica"]
    FEATURE_ORDER = meta["feature_order"]
except Exception as e:  # noqa: BLE001
    raise RuntimeError(
        f"Failed to load model artifacts from {MODEL_DIR}. "
        f"Run `python train_model.py` first, or drop in your exported "
        f"iris_model.keras / scaler.pkl / classes.json. Original error: {e}"
    ) from e


class IrisInput(BaseModel):
    sepal_length: float = Field(..., gt=0, le=15, description="Sepal length in cm")
    sepal_width: float = Field(..., gt=0, le=15, description="Sepal width in cm")
    petal_length: float = Field(..., gt=0, le=15, description="Petal length in cm")
    petal_width: float = Field(..., gt=0, le=15, description="Petal width in cm")


@app.get("/health")
def health():
    return {"status": "ok", "classes": CLASSES}


@app.post("/predict")
def predict(payload: IrisInput):
    try:
        # Build the feature vector in the exact order the model was trained on
        features = np.array([[
            payload.sepal_length,
            payload.sepal_width,
            payload.petal_length,
            payload.petal_width,
        ]])

        scaled = scaler.transform(features)
        probs = model.predict(scaled, verbose=0)[0]  # softmax output, shape (3,)

        predicted_idx = int(np.argmax(probs))
        prediction = CLASSES[predicted_idx]

        probabilities = {
            CLASSES[i]: round(float(probs[i]), 4) for i in range(len(CLASSES))
        }

        return {
            "prediction": prediction,
            "probabilities": probabilities,
        }
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"Prediction failed: {e}") from e


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
