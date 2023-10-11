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
        blackHoverCard: 'rgba(0, 0, 0, 0.9)',
        modalBackground: 'rgba(22, 41, 183, 0.39)',
        profile_hover: 'rgba(0, 0, 0, 0.5)',
        homeContentBg: 'rgba(17, 25, 40, 0.75)'
      },
      fontFamily: {
        mooli: 'Mooli, sans-serif',
        abrilFatface: 'Abril Fatface, cursive'
      },
      backgroundImage: {
        'home-bg': 'url(./src/assets/images/bg-home.jpg)'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-animated')
  ],
}

