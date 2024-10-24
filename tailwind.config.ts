import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom right, #111e21, #0b242b)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#01e477"
      },
    },
  },
  plugins: [],
};
export default config;
