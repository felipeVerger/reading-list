/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
      },
      fontFamily: {
        mooli: 'Mooli, sans-serif'
      },
      backgroundImage: {
        'home-bg': 'url(./src/assets/images/bg-home.jpg)'
      }
    },
  },
  plugins: [],
}

