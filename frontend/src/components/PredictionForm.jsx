import { useState } from "react";
import { Sparkles, RotateCcw, Loader2 } from "lucide-react";
import { EXAMPLE_VALUES } from "../data/species";

const FIELDS = [
  { key: "sepal_length", label: "Sepal length", placeholder: "e.g. 5.1", min: 0.1, max: 15 },
  { key: "sepal_width", label: "Sepal width", placeholder: "e.g. 3.5", min: 0.1, max: 15 },
  { key: "petal_length", label: "Petal length", placeholder: "e.g. 1.4", min: 0.1, max: 15 },
  { key: "petal_width", label: "Petal width", placeholder: "e.g. 0.2", min: 0.1, max: 15 },
];

const EMPTY = { sepal_length: "", sepal_width: "", petal_length: "", petal_width: "" };

export default function PredictionForm({ onSubmit, loading, onReset }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  function handleChange(key, raw) {
    setValues((v) => ({ ...v, [key]: raw }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
  }

  function validate() {
    const nextErrors = {};
    for (const field of FIELDS) {
      const raw = values[field.key];
      if (raw === "" || raw === null) {
        nextErrors[field.key] = "Required";
        continue;
      }
      const num = Number(raw);
      if (Number.isNaN(num)) {
        nextErrors[field.key] = "Enter a number";
      } else if (num < field.min || num > field.max) {
        nextErrors[field.key] = `Between ${field.min}–${field.max} cm`;
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const measurements = Object.fromEntries(
      FIELDS.map((f) => [f.key, Number(values[f.key])])
    );
    onSubmit(measurements);
  }

  function fillExample() {
    const example = EXAMPLE_VALUES[Math.floor(Math.random() * EXAMPLE_VALUES.length)];
    setValues({
      sepal_length: example.sepal_length,
      sepal_width: example.sepal_width,
      petal_length: example.petal_length,
      petal_width: example.petal_width,
    });
    setErrors({});
  }

  function handleReset() {
    setValues(EMPTY);
    setErrors({});
    onReset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={field.key}
              className="block text-sm font-medium text-ink/80 mb-1.5"
            >
              {field.label} <span className="text-ink/40 font-normal">(cm)</span>
            </label>
            <input
              id={field.key}
              type="number"
              inputMode="decimal"
              step="0.1"
              min={field.min}
              max={field.max}
              placeholder={field.placeholder}
              value={values[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-ink/30 focus:ring-2 focus:ring-bloom-300 focus:border-bloom-400 transition-colors ${
                errors[field.key] ? "border-red-400" : "border-bloom-100"
              }`}
            />
            {errors[field.key] && (
              <p id={`${field.key}-error`} className="mt-1.5 text-xs text-red-600">
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-bloom-600 hover:bg-bloom-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-7 py-3.5 text-sm font-semibold shadow-bloom transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Predicting…
            </>
          ) : (
            "Predict iris species"
          )}
        </button>
        <button
          type="button"
          onClick={fillExample}
          className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-leaf-50 hover:bg-leaf-100 text-leaf-700 px-5 py-3.5 text-sm font-medium transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Example values
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 hover:bg-ink/5 text-ink/60 px-5 py-3.5 text-sm font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </form>
  );
}
