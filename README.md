# Iris Flower Predictor

A full-stack app for your Iris classifier: a FastAPI backend serving the
Keras neural network from your Kaggle notebook, and a React + Tailwind
frontend for entering measurements and viewing predictions.

## Project structure

```
iris-flower-prediction/
├── backend/
│   ├── app.py                  # FastAPI app, exposes POST /predict
│   ├── train_model.py          # Reproduces the notebook's pipeline; run once
│   ├── KAGGLE_EXPORT_CELL.py   # Paste into your Kaggle notebook to export YOUR exact weights
│   ├── requirements.txt
│   └── model/
│       ├── iris_model.keras    # Trained Keras model (already generated)
│       ├── scaler.pkl          # StandardScaler fit on training data
│       └── classes.json        # Class order + feature order
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── PredictionSection.jsx   # holds form + result state
    │   │   ├── PredictionForm.jsx
    │   │   ├── PredictionResult.jsx
    │   │   ├── ModelInfo.jsx
    │   │   ├── HowItWorks.jsx
    │   │   ├── Statistics.jsx
    │   │   ├── Footer.jsx
    │   │   ├── IrisMark.jsx            # logo glyph (SVG)
    │   │   └── IrisIllustration.jsx    # hero illustration (SVG)
    │   ├── data/species.js             # species descriptions + example values
    │   ├── api.js                      # axios client for /predict
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── package.json
    └── tailwind.config.js
```

## What's actually being served

Your notebook (`Iris_prediction.ipynb`) trains **two** models on the same
data — a scikit-learn `Perceptron` and a Keras `Sequential` neural network
(`Dense(16) → Dense(8) → Dense(3, softmax)`). You chose the **neural
network** (96.7% test accuracy, and it supports confidence scores via
softmax), so that's what `backend/app.py` loads and serves.

Everything about the pipeline matches your notebook exactly:
- **Feature order:** `SepalLengthCm, SepalWidthCm, PetalLengthCm, PetalWidthCm`
- **Label order:** alphabetical via `LabelEncoder` → `setosa=0, versicolor=1, virginica=2`
- **Scaling:** `StandardScaler`
- **Architecture:** `Dense(16, relu) → Dense(8, relu) → Dense(3, softmax)`, Adam optimizer, categorical cross-entropy, 100 epochs, batch size 8

One deliberate difference: your notebook's Cell 11 does
`X_test_scaled = scaler.fit_transform(X_test)`, which **refits** the
scaler on the test set (a data leak) right after it had already been
correctly fit on `X_train`. That bug doesn't affect the model's trained
weights, but it does mean the `scaler` object saved that way would be
unfit for real-world input. Both `train_model.py` and
`KAGGLE_EXPORT_CELL.py` fit the scaler on **training data only**, which is
what your notebook clearly intends.

The `model/` folder already contains a working model, trained here with
the exact same architecture and hyperparameters as your notebook (test
accuracy came out to ~93%, close to but not identical to your Kaggle run,
since Keras training isn't perfectly seed-reproducible across
environments). If you'd rather serve the **exact weights** you trained on
Kaggle, see "Using your exact Kaggle-trained model" below.

Also note: your dataset's `Species` column is `setosa` / `versicolor` /
`virginica` (no "Iris-" prefix) — the app displays it that way rather than
the "Iris-setosa" format your original spec used as an example.

## Installation & running

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The API runs at `http://localhost:5000`. Confirm it's up:

```bash
curl http://localhost:5000/health
# {"status":"ok","classes":["setosa","versicolor","virginica"]}
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local         # points the app at http://localhost:5000
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

## Testing with sample values

| Sepal length | Sepal width | Petal length | Petal width | Expected |
|---|---|---|---|---|
| 5.1 | 3.5 | 1.4 | 0.2 | setosa |
| 5.9 | 3.0 | 4.2 | 1.5 | versicolor |
| 6.7 | 3.0 | 5.2 | 2.3 | virginica |

The "Example values" button on the form fills these in for you at random.
You can also hit the API directly:

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"sepal_length":5.1,"sepal_width":3.5,"petal_length":1.4,"petal_width":0.2}'
```

## How the frontend talks to the model

`PredictionForm` validates the four inputs client-side, then
`PredictionSection` calls `predictSpecies()` in `src/api.js`, which POSTs
JSON to `http://localhost:5000/predict` (configurable via `VITE_API_URL`).
FastAPI validates the payload with Pydantic, scales it with the same
`StandardScaler` used in training, runs it through the loaded Keras model,
and returns the predicted class plus per-class probabilities. The
frontend renders those as the result card and confidence bars — no page
reload, with friendly error messages if the backend is unreachable or the
input is invalid.

## Using your exact Kaggle-trained model

If you want to serve the precise weights from your Kaggle run (96.7%
accuracy) instead of the stand-in trained locally:

1. Open your notebook on Kaggle.
2. Add the contents of `backend/KAGGLE_EXPORT_CELL.py` as a new cell at
   the end, after the cell that trains `model`.
3. Run that cell. It saves `iris_model.keras`, `scaler.pkl`, and
   `classes.json` to the notebook's output.
4. Download those three files (Kaggle's Output panel → download) and
   drop them into `backend/model/`, replacing the existing files.
5. Restart `python app.py`.

No frontend or API changes needed — the shapes and format are identical.
