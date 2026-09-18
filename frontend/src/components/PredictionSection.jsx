import { useState } from "react";
import PredictionForm from "./PredictionForm";
import PredictionResult from "./PredictionResult";
import { predictSpecies } from "../api";

export default function PredictionSection() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(measurements) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await predictSpecies(measurements);
      setResult(data);
    } catch (err) {
      setError(err.friendlyMessage || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError(null);
  }

  return (
    <section id="predict" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
      <div className="max-w-xl mb-10">
        <p className="text-sm font-medium text-bloom-600 mb-3">Prediction</p>
        <h2 className="font-display text-3xl sm:text-4xl text-bloom-900 leading-tight">
          Enter your measurements
        </h2>
      </div>

      <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-8 items-start">
        <div className="rounded-3xl bg-white border border-bloom-100 shadow-petal p-6 sm:p-9">
          <PredictionForm onSubmit={handleSubmit} loading={loading} onReset={handleReset} />
        </div>

        <PredictionResult result={result} error={error} />
      </div>
    </section>
  );
}
