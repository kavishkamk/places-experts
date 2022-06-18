/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",],
  theme: {
    extend: {
      colors: {
        'bggray': '#4d4d4d',
      },
    }
  },
  plugins: [],
}
