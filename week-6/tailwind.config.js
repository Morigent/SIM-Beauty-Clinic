/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./page/**/*.{php,html,js}",
    "./script/**/*.js",
    "./*.php"
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          dark: "#0d5c4e",
          DEFAULT: "#1a6b5e",
          mid: "#2a8c7a",
          light: "#4db6a0",
          pale: "#d0eeea",
          bg: "#e8f6f3"
        },
        orange: {
          DEFAULT: "#e8704a",
          light: "#f0a080"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
