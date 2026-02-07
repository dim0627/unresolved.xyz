/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(253, 206, 18)',
        base: 'rgb(51, 51, 51)',
      },
      boxShadow: {
        bordered: '0 0 0 .3rem rgb(253, 206, 18), 0 0 0 .4rem rgba(51, 51, 51, .09)',
        button: '0 4px 0 0 rgba(51, 51, 51, .1)',
      },
    },
  },
};
