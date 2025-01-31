/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-1000': { 'max': '790px' }, // For screens with max-width of 1000px
        'lw': {'max':'400px'},
        'lq': { 'max': '640px', 'min': '547px' },
        'li': { 'max': '489px'},
        'lp': {'min':'489px'}
      },
    },
  },
  plugins: [],
}