/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode:'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        gray: colors.neutral,
        'flow': {
          100:'#cbeafe',
          200:'#98e9fd',
          300:'#64b9fa',
          400:'#3d9cf5',
          500:'#00bbef',
          600:'#008ccd',
          700:'#0087ac',
          800:'#00638a',
          900:'#005272',
        },
        'link': {
          100: '#10100e'
        }
      }
    },
  },
  plugins: [],
}
