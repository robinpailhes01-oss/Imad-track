import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F0B1E",
          soft: "#1B1530",
          muted: "#6B6880",
        },
        paper: "#FAFAFE",
        card: "#FFFFFF",
        accent: {
          pink: "#F472B6",
          rose: "#FB7185",
          violet: "#A78BFA",
          purple: "#8B5CF6",
          mint: "#34D399",
          amber: "#F59E0B",
          sky: "#38BDF8",
        },
        surface: {
          lilac: "#F3EEFF",
          blush: "#FFE9F1",
          cream: "#FFF6EC",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["'Plus Jakarta Sans'", "Inter", "ui-sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,12,45,0.04), 0 10px 30px -12px rgba(93,55,172,0.18)",
        soft: "0 4px 20px -8px rgba(93,55,172,0.18)",
        pop: "0 20px 45px -18px rgba(139,92,246,0.45)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #F5EBFF 0%, #FEE6F2 45%, #FFF5F1 100%)",
        "hero-gradient":
          "radial-gradient(120% 80% at 50% 0%, #F2E7FF 0%, #FDE4EF 45%, #FFFFFF 100%)",
        "pill-gradient":
          "linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
