import IrisMark from "./IrisMark";

export default function Footer() {
  return (
    <footer className="border-t border-bloom-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <IrisMark className="w-6 h-6" />
          <span className="font-display text-base text-bloom-900">Iris Flower Predictor</span>
        </div>
        <p className="text-sm text-ink/40">Built with machine learning</p>
      </div>
    </footer>
  );
}
