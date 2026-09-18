import { useState } from "react";
import { Menu, X } from "lucide-react";
import IrisMark from "./IrisMark";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Prediction", href: "#predict" },
  { label: "About Model", href: "#about-model" },
];

function scrollTo(e, href) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-bloom-100">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          className="flex items-center gap-2.5"
        >
          <IrisMark className="w-8 h-8" />
          <span className="font-display text-lg text-bloom-900 tracking-tight">
            Iris Flower Predictor
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm font-medium text-ink/70 hover:text-bloom-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2 text-ink/70"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden px-5 pb-4 flex flex-col gap-1 border-t border-bloom-100">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  scrollTo(e, link.href);
                  setOpen(false);
                }}
                className="block py-2.5 text-sm font-medium text-ink/70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
