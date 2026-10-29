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
          50: '#f0f4ff',
          100: '#e0e9fe',
          200: '#c7d7fe',
          300: '#a4bcfc',
          400: '#7c98f9',
          500: '#536df5',
          600: '#384ced',
          700: '#2b39d6',
          800: '#1e289f',
          900: '#0f1754',
          950: '#090d2e',
        },
        navy: {
          800: '#0b1329',
          900: '#070c1e',
          950: '#040712',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(79, 70, 229, 0.35)',
        'glow-accent': '0 0 35px -8px rgba(56, 189, 248, 0.3)',
      }
    },
  },
  plugins: [],
}
