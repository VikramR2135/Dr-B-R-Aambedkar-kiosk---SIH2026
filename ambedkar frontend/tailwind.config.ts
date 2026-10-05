import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#F3EEDE",
          light: "#FAF7EE",
          dark: "#E7DFC9",
        },
        ink: {
          DEFAULT: "#171310",
          soft: "#3A342C",
        },
        navy: {
          DEFAULT: "#102A4C",
          deep: "#0B1E37",
          light: "#1E4272",
        },
        brass: {
          DEFAULT: "#A8783B",
          light: "#C79A55",
        },
        stone: {
          DEFAULT: "#6B6459",
          light: "#96907F",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "ui-serif", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
      backgroundImage: {
        grain: "url('/textures/grain.svg')",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        wave: "wave 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
