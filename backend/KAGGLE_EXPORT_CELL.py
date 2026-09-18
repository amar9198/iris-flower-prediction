# =====================================================================
# Add this as a NEW cell at the END of your Kaggle notebook (after the
# cell that trains `model`) and run it. It saves the exact weights you
# trained on Kaggle, plus a correctly-fit scaler and the class order,
# so the backend can serve YOUR model instead of a retrained stand-in.
#
# Note: this also fixes the scaler bug from Cell 11
# (`X_test_scaled = scaler.fit_transform(X_test)` refits/leaks on the
# test set). Re-fitting scaler on X_train only here does not change
# your already-trained `model` weights, it only produces a scaler that
# is safe to use on brand-new inputs at inference time.
# =====================================================================
import json
import joblib

# Refit the scaler on TRAIN ONLY (the model's weights are unaffected)
scaler_export = StandardScaler()
scaler_export.fit(X_train)

model.save("iris_model.keras")
joblib.dump(scaler_export, "scaler.pkl")

with open("classes.json", "w") as f:
    json.dump({
        "classes": list(encoder.classes_),  # index -> species name
        "feature_order": list(X.columns),   # exact column order the model expects
    }, f, indent=2)

print("Saved: iris_model.keras, scaler.pkl, classes.json")
print("Download these 3 files from the notebook's Output panel and")
print("place them in backend/model/, replacing the stand-in versions.")
