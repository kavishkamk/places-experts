/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",],
  theme: {
    extend: {
      colors: {
        'bggray': '#4d4d4d',
        'goldcolor': '#ffd900',
        'darkblack' : '#292929',
        'headred': '#ff0055',
        'bgnav': '#f8df00',
        'backdropcolor': 'rgba(0, 0, 0, 0.75)',
      },
      width: {
        'cardw': 'calc(45% - 2rem)',
        '9/10': '90%',
        '7/10': '70%',
      },
      minWidth: {
        '70': '17.5rem',
      },
      maxWidth: {
        '3.25': '50rem',
      },
      height: {
        '6.125': '2.5px',
      },
      borderRadius: {
        '50': "50%",
      },
      boxShadow: {
        'cardshadow': '0 2px 8px rgba(0, 0, 0, 0.26)',
        'headshadow': '0 2px 6px rgba(0, 0, 0, 0.26)',
      },
      zIndex: {
        '100': '100',
      },
    }
  },
  plugins: [],
}
