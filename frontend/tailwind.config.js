/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1A1A2E',
          coral: '#E94560',
          pageBg: '#F7F6F4',
          surface: '#FFFFFF',
          border: '#E5E5E5',
          success: '#1D9E75',
          warning: '#BA7517',
          info: '#378ADD',
          danger: '#E24B4A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
