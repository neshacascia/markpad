/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        blueGray: '#35393F',
      },
      fontFamily: {
        roboto: 'Roboto',
        robotoSlab: ['Roboto Slab'],
      },
    },
  },
  plugins: [],
};
