/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['Spartan', 'sans-serif'], 
      },
      colors: {
        lightBg: '#f9fafb', 
        darkBg: '#1f2937',  
      },
    },
  },
  plugins: [],
}
