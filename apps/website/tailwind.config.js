/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#111",
        light: "#f7f7f7",
        brandVia: "#D946EF",
        primary: "#6366F1",
        secondary: "#FB7185",
        uncolor: "#999",
      },
      fontFamily: {
        code: ["Noto Sans SC", "sans-serif"],
      },
    },
  },
  plugins: [],
};
