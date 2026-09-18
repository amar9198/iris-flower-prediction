const STEPS = [
  {
    title: "Enter flower measurements",
    body: "Type in the sepal and petal length and width, in centimeters.",
  },
  {
    title: "The model processes the measurements",
    body: "Your values are scaled the same way the training data was, then passed through the trained neural network.",
  },
  {
    title: "The model predicts the species",
    body: "The network outputs a probability for each of the three Iris species.",
  },
  {
    title: "The prediction is displayed",
    body: "The most likely species — and its confidence — appears instantly, no page reload.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-bloom-50/60 border-y border-bloom-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
        <p className="text-sm font-medium text-leaf-600 mb-3">How it works</p>
        <h2 className="font-display text-3xl sm:text-4xl text-bloom-900 max-w-lg leading-tight">
          From measurement to prediction
        </h2>

        <ol className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="font-display text-2xl text-bloom-300 leading-none pt-0.5 shrink-0">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
