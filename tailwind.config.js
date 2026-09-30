/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        family: {
          papa: '#0284c7', // Sky-600
          mama: '#9333ea', // Purple-600
          ambos: '#0d9488', // Teal-600
          hijos: '#ea580c', // Orange-600
        }
      }
    },
  },
  plugins: [],
}
