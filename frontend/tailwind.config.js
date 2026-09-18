/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Iris-flower-inspired palette
        bloom: {
          50: "#F5F1FB",
          100: "#EAE1F6",
          200: "#D2BEEC",
          300: "#B594DD",
          400: "#9A6FCB",
          500: "#7D4FB0",
          600: "#653C90",
          700: "#502F72",
          800: "#3B2354",
          900: "#271738",
        },
        leaf: {
          50: "#F0F7F1",
          100: "#DCEEDF",
          200: "#B4DABB",
          300: "#88C193",
          400: "#5FA76C",
          500: "#458750",
          600: "#376C40",
          700: "#2C5433",
          800: "#213D26",
          900: "#16281A",
        },
        sky: {
          50: "#EFF5FA",
          100: "#DCE9F4",
          200: "#B4D2E7",
          300: "#87B7D6",
          400: "#5E9AC1",
          500: "#3F7EA6",
          600: "#326586",
          700: "#274E68",
          800: "#1C384A",
          900: "#12242F",
        },
        ink: "#20241F",
        paper: "#FBFAF7",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Work Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        bloom: "0 20px 60px -20px rgba(80, 47, 114, 0.35)",
        petal: "0 12px 30px -12px rgba(39, 23, 56, 0.25)",
      },
      backgroundImage: {
        "iris-radial":
          "radial-gradient(120% 120% at 100% 0%, #F5F1FB 0%, #FBFAF7 45%, #EFF5FA 100%)",
      },
      keyframes: {
        bloomIn: {
          "0%": { opacity: "0", transform: "scale(0.94) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
      },
      animation: {
        bloomIn: "bloomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
