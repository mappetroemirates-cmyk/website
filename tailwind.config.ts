import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Placeholder brand palette — swap these hex values for the client's
        // confirmed brand colors once available. Every component should
        // reference primary/accent/neutral tokens only, never raw Tailwind
        // colors, so a rebrand is a one-file change.
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
          50: "#fff8ec",
          100: "#ffedc7",
          200: "#ffd98a",
          300: "#ffbf4d",
          400: "#ffa726",
          500: "#f78c0e",
          600: "#db6d05",
          700: "#b55208",
          800: "#93400d",
          900: "#78350f",
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
