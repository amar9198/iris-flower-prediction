"""
Reproduces the exact pipeline from the user's Kaggle notebook
(Iris_prediction.ipynb) and exports the artifacts the API needs.

Pipeline (matches the notebook):
- Features, in this exact order: SepalLengthCm, SepalWidthCm, PetalLengthCm, PetalWidthCm
- Labels: LabelEncoder on Species -> alphabetical -> setosa=0, versicolor=1, virginica=2
- train_test_split(test_size=0.2, random_state=42, stratify=y)
- StandardScaler fit on X_train ONLY (the notebook's Cell 11 mistakenly does
  scaler.fit_transform(X_test) too, which refits/leaks on the test set and
  would give a scaler unfit for real-world use. We keep the correct
  train-only fit here — same behavior the notebook *intends*.)
- Keras Sequential: Dense(16, relu) -> Dense(8, relu) -> Dense(3, softmax)
- adam / categorical_crossentropy, 100 epochs, batch_size=8, validation_split=0.2

If you'd rather serve the *exact* weights you already trained on Kaggle,
skip this script and instead add the export cell from KAGGLE_EXPORT_CELL.py
to the end of your notebook, run it, and drop the three resulting files
(iris_model.keras, scaler.pkl, classes.json) into this model/ folder.
"""
import json
import numpy as np
import joblib
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.utils import to_categorical

RANDOM_STATE = 42
FEATURE_ORDER = ["SepalLengthCm", "SepalWidthCm", "PetalLengthCm", "PetalWidthCm"]

np.random.seed(RANDOM_STATE)
tf.random.set_seed(RANDOM_STATE)

# --- Load data (identical values/order to the Kaggle Iris.csv) ---
iris = load_iris()
X = iris.data  # columns already in Sepal L/W, Petal L/W order
species_names = np.array(["setosa", "versicolor", "virginica"])
y = species_names[iris.target]

# --- Label encode (alphabetical, matches notebook's LabelEncoder) ---
encoder = LabelEncoder()
y_int = encoder.fit_transform(y)

# --- Split (same params as notebook) ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y_int, test_size=0.2, random_state=RANDOM_STATE, stratify=y_int
)

# --- Scale: fit on TRAIN ONLY (fixes the notebook's test-refit bug) ---
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# --- One-hot targets ---
y_train_cat = to_categorical(y_train, num_classes=3)
y_test_cat = to_categorical(y_test, num_classes=3)

# --- Model: identical architecture to the notebook ---
model = Sequential([
    Dense(16, input_dim=4, activation="relu"),
    Dense(8, activation="relu"),
    Dense(3, activation="softmax"),
])
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

history = model.fit(
    X_train_scaled, y_train_cat,
    epochs=100, batch_size=8, validation_split=0.2, verbose=0,
)

loss, acc = model.evaluate(X_test_scaled, y_test_cat, verbose=0)
print(f"Test accuracy: {acc:.4f}  (notebook reported 0.9667)")

# --- Export artifacts for the API ---
model.save("model/iris_model.keras")
joblib.dump(scaler, "model/scaler.pkl")
with open("model/classes.json", "w") as f:
    json.dump({
        "classes": list(encoder.classes_),      # index -> species name, alphabetical
        "feature_order": FEATURE_ORDER,
    }, f, indent=2)

print("Saved model/iris_model.keras, model/scaler.pkl, model/classes.json")
