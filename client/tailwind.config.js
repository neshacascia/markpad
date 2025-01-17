/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blueGray: '#35393F',
        bodyGray: '#7C8187',
        bloodOrange: '#E46643',
        orangeHover: '#F39765',
        lightGray: '#C1C4CB',
      },
      fontFamily: {
        roboto: 'Roboto',
        robotoSlab: ['Roboto Slab'],
        markdown: ['Roboto Mono'],
        title: 'Commissioner',
      },
    },
  },
  plugins: [],
};
