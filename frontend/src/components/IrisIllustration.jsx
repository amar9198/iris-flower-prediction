export default function IrisIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 420 460"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fallA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9A6FCB" />
          <stop offset="100%" stopColor="#653C90" />
        </linearGradient>
        <linearGradient id="fallB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B594DD" />
          <stop offset="100%" stopColor="#7D4FB0" />
        </linearGradient>
        <linearGradient id="standard" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#D2BEEC" />
          <stop offset="100%" stopColor="#EAE1F6" />
        </linearGradient>
      </defs>

      {/* soft backdrop bloom */}
      <circle cx="210" cy="200" r="170" fill="#F5F1FB" />
      <circle cx="300" cy="120" r="60" fill="#EFF5FA" />

      {/* stem */}
      <path
        d="M210 250 C204 310 206 370 200 430"
        stroke="#458750"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M210 320 C190 322 172 316 160 300"
        stroke="#5FA76C"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M204 380 C224 380 240 372 250 358"
        stroke="#458750"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* three falls (lower petals) */}
      <path
        d="M210 210 C160 220 110 260 95 330 C150 320 195 280 210 210 Z"
        fill="url(#fallA)"
      />
      <path
        d="M210 210 C260 220 310 260 325 330 C270 320 225 280 210 210 Z"
        fill="url(#fallB)"
      />
      <path
        d="M210 210 C198 260 195 310 205 360 C235 335 228 260 210 210 Z"
        fill="#7D4FB0"
        opacity="0.92"
      />

      {/* vein details on falls */}
      <path d="M200 225 C165 245 130 275 112 320" stroke="#3B2354" strokeOpacity="0.25" strokeWidth="2" fill="none" />
      <path d="M220 225 C255 245 290 275 308 320" stroke="#3B2354" strokeOpacity="0.25" strokeWidth="2" fill="none" />

      {/* three standards (upright petals) */}
      <path
        d="M210 210 C170 190 145 145 155 95 C195 110 218 160 210 210 Z"
        fill="url(#standard)"
      />
      <path
        d="M210 210 C250 190 275 145 265 95 C225 110 202 160 210 210 Z"
        fill="url(#standard)"
      />
      <path
        d="M210 210 C204 160 206 110 218 70 C240 100 232 165 210 210 Z"
        fill="#EAE1F6"
      />

      {/* center throat accent */}
      <ellipse cx="210" cy="222" rx="16" ry="10" fill="#F5C563" opacity="0.85" />

      {/* small satellite bud */}
      <g transform="translate(300 250)">
        <path
          d="M0 60 C-4 40 -2 20 4 0"
          stroke="#458750"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M4 0 C-8 -6 -14 -20 -8 -34 C4 -30 12 -14 4 0 Z"
          fill="#9A6FCB"
        />
        <path
          d="M4 0 C16 -6 22 -20 16 -34 C4 -30 -4 -14 4 0 Z"
          fill="#B594DD"
        />
      </g>
    </svg>
  );
}
