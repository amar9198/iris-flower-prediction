// A small original iris-flower glyph (three drooping falls, three
// upright standards) used as the site mark. Pure SVG, no external assets.
export default function IrisMark({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g>
        {/* three falls (lower, drooping petals) */}
        <path
          d="M24 26 C15 28 8 36 6 44 C15 43 22 37 24 26 Z"
          fill="#7D4FB0"
          opacity="0.9"
        />
        <path
          d="M24 26 C33 28 40 36 42 44 C33 43 26 37 24 26 Z"
          fill="#653C90"
          opacity="0.9"
        />
        <path
          d="M24 26 C22 33 21 40 22 46 C28 43 27 33 24 26 Z"
          fill="#502F72"
          opacity="0.85"
        />
        {/* three standards (upright petals) */}
        <path
          d="M24 26 C19 22 15 14 17 6 C24 9 26 18 24 26 Z"
          fill="#9A6FCB"
        />
        <path
          d="M24 26 C29 22 33 14 31 6 C24 9 22 18 24 26 Z"
          fill="#B594DD"
        />
        {/* stem */}
        <path
          d="M24 26 L24 46"
          stroke="#458750"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M24 34 C20 34 17 32 16 29"
          stroke="#458750"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
