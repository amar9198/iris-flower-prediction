import IrisIllustration from "./IrisIllustration";

function scrollToPredict(e) {
  e.preventDefault();
  document.querySelector("#predict")?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section id="top" className="bg-iris-radial">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-leaf-600 mb-4">
            Machine learning powered flower classification
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-bloom-900">
            Predict iris flower species
          </h1>
          <p className="mt-6 text-lg text-ink/70 max-w-md leading-relaxed">
            Enter the flower measurements below and let our machine learning
            model identify the Iris species — setosa, versicolor, or
            virginica.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#predict"
              onClick={scrollToPredict}
              className="inline-flex items-center justify-center rounded-full bg-bloom-600 hover:bg-bloom-700 text-white px-7 py-3.5 text-sm font-semibold shadow-bloom transition-colors"
            >
              Start prediction
            </a>
            <a
              href="#about-model"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about-model")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-medium text-ink/70 hover:text-bloom-600 transition-colors"
            >
              How the model works
            </a>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <IrisIllustration className="w-full max-w-sm animate-drift" />
        </div>
      </div>
    </section>
  );
}
