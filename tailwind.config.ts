import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display serif for headings — reference as `font-display`.
        // Body text stays on the default sans (Inter) stack.
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        // Brand palette sampled directly from the actual logo artwork
        // (public/logo-icon.png) — navy + green, no orange. Every component
        // should reference primary/accent/neutral tokens only, never raw
        // Tailwind colors, so a rebrand stays a one-file change.
        primary: {
          50: "#eef4fb",
          100: "#d9e6f5",
          200: "#b3cdeb",
          300: "#82abdb",
          400: "#4f80c2",
          500: "#3361a5",
          600: "#254a82",
          700: "#1f3d6b",
          800: "#1a3156",
          900: "#152841",
          950: "#0c1626",
        },
        accent: {
          50: "#f3f6ef",
          100: "#e3eadb",
          200: "#c7d6b7",
          300: "#a3bd8a",
          400: "#88a577",
          500: "#5c8343",
          600: "#4c6d38",
          700: "#3d582d",
          800: "#304523",
          900: "#26361c",
          950: "#141d0f",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
    },
  },
  plugins: [],
};

export default config;
