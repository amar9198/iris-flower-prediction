import { SPECIES_INFO } from "../data/species";

const FACTS = [
  { label: "Dataset", value: "Iris dataset" },
  { label: "Samples", value: "150" },
  { label: "Input features", value: "4" },
  { label: "Output classes", value: "3" },
];

export default function ModelInfo() {
  return (
    <section id="about-model" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-sky-600 mb-3">About the model</p>
        <h2 className="font-display text-3xl sm:text-4xl text-bloom-900 leading-tight">
          A small, well-understood classifier
        </h2>
        <p className="mt-4 text-ink/60 leading-relaxed">
          The model is trained on the classic Iris dataset, learning to tell
          the three species apart from four petal and sepal measurements.
        </p>
      </div>

      <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-bloom-100 py-8">
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs text-ink/40 mb-1">{fact.label}</dt>
            <dd className="font-display text-2xl text-bloom-800">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid sm:grid-cols-3 gap-5">
        {Object.entries(SPECIES_INFO).map(([key, info]) => (
          <div
            key={key}
            className="rounded-2xl border border-bloom-100 bg-white p-6"
          >
            <h3 className="font-display text-lg text-bloom-900 mb-2">{info.label}</h3>
            <p className="text-sm text-ink/60 leading-relaxed">{info.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
