import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#2f2f2f",
        "lite": "#ebebeb",
        "prime": "#8c4cf9"
      }
    },
  },
  plugins: [daisyui],
  darkMode: "class"
}