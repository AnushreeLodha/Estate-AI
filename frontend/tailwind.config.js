/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1A1512', // Deep Dark Brown
        surface: '#2A231E', // Lighter Dark Brown for cards
        surfaceLight: '#3D332A',
        primary: '#D4AF37', // Gold/Beige accent
        primaryHover: '#E8C553',
        textMain: '#F2ECE4', // Soft beige for text
        textMuted: '#B8A89A',
        borderCol: '#3D332A',
        success: '#4CAF50',
        danger: '#F44336',
        warning: '#FF9800'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
