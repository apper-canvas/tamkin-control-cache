/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E5B7E",
        secondary: "#2C8CB8",
        accent: "#D4AF37",
        success: "#2D9F5E",
        warning: "#E67E22",
        error: "#C0392B",
        info: "#3498DB",
        surface: "#FFFFFF",
        background: "#F5F7FA"
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem'
      },
      borderWidth: {
        '3': '3px'
      }
    },
  },
  plugins: [],
  corePlugins: {
    container: false
  }
}