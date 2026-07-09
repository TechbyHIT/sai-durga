import type { Config } from "tailwindcss";

// 60/30/10 premium palette: 60% shining white, 30% premium gold, 10% silver/grey accents.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          white: "#FFFFFF",
          off: "#FAFAF8",
        },
        gold: {
          50: "#FBF6E9",
          100: "#F5E8C2",
          200: "#EAD28C",
          300: "#DFBC5A",
          400: "#CFA23A",
          500: "#B4872A",
          600: "#8F6A20",
          700: "#6C4F17",
        },
        silver: {
          50: "#F7F7F8",
          100: "#EDEEF0",
          200: "#DCDEE2",
          300: "#C2C5CB",
          400: "#9AA0A8",
          500: "#6E7480",
          600: "#4B505A",
          700: "#2E313A",
          900: "#15171B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 8px 30px -8px rgba(180, 135, 42, 0.35)",
        card: "0 2px 12px rgba(20, 20, 25, 0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
