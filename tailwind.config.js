/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
    },
    screens: {
      'tablet': { 'max': '1200px' },
    }
  },
  plugins: [],
};
