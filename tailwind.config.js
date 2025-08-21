/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['Pixelify Sans', 'sans-serif'],
        'code': ['Source Code Pro', 'monospace'],
      },
    },
  },
  plugins: [],
}
