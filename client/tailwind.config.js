/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        blueGray: '#35393F',
        bodyGray: '#7C8187',
        bloodOrange: '#E46643',
      },
      fontFamily: {
        roboto: 'Roboto',
        robotoSlab: ['Roboto Slab'],
        markdown: ['Roboto Mono'],
      },
    },
  },
  plugins: [],
};
