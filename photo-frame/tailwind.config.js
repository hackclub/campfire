/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campfire: {
          red: '#ec3750', // Hack Club Red
          orange: '#ff8c37',
          yellow: '#f1c40f',
          dark: '#1a1a1a',
          darker: '#0a0a0a',
        },
        fontFamily: {
          dream: ['DreamPlanner', 'system-ui', 'sans-serif'],
        },
      },
    },
  },
  plugins: [],
}
