/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#ffffff',
        },
        primary: {
          50: '#eeebff',
          100: '#cdc7fe',
          200: '#aa9ffd',
          300: '#8777fc',
          400: '#5045fd',
          500: '#2101FC', // Deep Blue — Main Accent
          600: '#0030FC', // Electric Accent — Hover & Highlight
          700: '#0026d4',
          800: '#001caa',
          900: '#001280',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        surface: {
          bg: '#FAFAFC',    // Slate Background
          dark: '#0A0A1A',  // Dark Surface
          text: '#0D0D1A',  // Text Primary
          muted: '#6B7280', // Text Muted
        },
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
