import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-primary": "#3B5E2B",
        "green-light": "#EAF3DE",
        "green-dark": "#2C3D1E",
        "amber-cabin": "#8B5E3C",
        "dark-cabin": "#2C2A1E",
        cream: "#F5F0E8",
        "muted-cabin": "#5F5E5A",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        lato: ["var(--font-lato)", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
