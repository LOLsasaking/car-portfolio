import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        charcoal: "#0d0d0f",
        graphite: "#16161a",
        smoke: "#1f1f24",
        bone: "#f5f2ea",
        gold: {
          DEFAULT: "#c9a961",
          light: "#e3cf94",
          dark: "#9a7d3f",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-serif)", "serif"],
        cars: ["var(--font-cars)", "serif"],
      },
      letterSpacing: {
        luxe: "0.35em",
        wide2: "0.18em",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
