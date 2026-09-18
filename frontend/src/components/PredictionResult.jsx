import { AlertTriangle, Leaf } from "lucide-react";
import IrisMark from "./IrisMark";
import { SPECIES_INFO } from "../data/species";

const BAR_COLOR = {
  bloom: "bg-bloom-500",
  sky: "bg-sky-500",
  leaf: "bg-leaf-500",
};

export default function PredictionResult({ result, error }) {
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 flex gap-3 items-start">
        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-red-700 text-sm">Couldn't complete the prediction</p>
          <p className="text-sm text-red-600/90 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl border border-dashed border-bloom-200 bg-white/60 p-8 text-center">
        <Leaf className="w-6 h-6 text-leaf-400 mx-auto mb-3" />
        <p className="text-sm text-ink/50 max-w-xs mx-auto">
          Your predicted species will appear here once you submit the four
          measurements.
        </p>
      </div>
    );
  }

  const key = result.prediction?.toLowerCase();
  const info = SPECIES_INFO[key] ?? {
    label: result.prediction,
    color: "bloom",
    description: "",
  };
  const probabilities = result.probabilities;
  const topConfidence = probabilities ? probabilities[key] : null;

  return (
    <div className="rounded-2xl bg-white border border-bloom-100 shadow-petal p-7 animate-bloomIn">
      <p className="text-xs font-medium text-ink/40 mb-1">Prediction result</p>

      <div className="flex items-center gap-4 mt-2">
        <div className="w-14 h-14 rounded-full bg-bloom-50 flex items-center justify-center shrink-0">
          <IrisMark className="w-8 h-8" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/40 mb-0.5">Species</p>
          <h3 className="font-display text-2xl text-bloom-900">{info.label}</h3>
        </div>
      </div>

      {topConfidence != null && (
        <p className="mt-4 text-sm text-ink/70">
          Confidence:{" "}
          <span className="font-semibold text-ink">
            {(topConfidence * 100).toFixed(1)}%
          </span>
        </p>
      )}

      {info.description && (
        <p className="mt-3 text-sm text-ink/60 leading-relaxed">{info.description}</p>
      )}

      {probabilities && (
        <div className="mt-6 space-y-3">
          <p className="text-xs font-medium text-ink/40">Probability by species</p>
          {Object.entries(probabilities).map(([species, prob]) => {
            const meta = SPECIES_INFO[species] ?? { label: species, color: "bloom" };
            return (
              <div key={species}>
                <div className="flex justify-between text-xs text-ink/60 mb-1">
                  <span>{meta.label}</span>
                  <span>{(prob * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 rounded-full bg-ink/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${BAR_COLOR[meta.color] || "bg-bloom-500"} transition-all duration-700`}
                    style={{ width: `${Math.max(prob * 100, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
