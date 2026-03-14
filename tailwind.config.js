/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Syne', 'sans-serif'],
      },
      colors: {
        'vanta-black': '#000000',
        'vanta-900': '#0a0a0a',
        'vanta-800': '#111111',
        'vanta-700': '#1a1a1a',
        'vanta-600': '#444444',
        'vanta-400': '#888888',
        'vanta-200': '#cccccc',
        'vanta-white': '#ffffff',
        'luxury-gold': '#D4AF37',
        'luxury-gold-light': '#F3E5AB',
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'chevron': 'chevronBounce 2s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
        'ambient-pulse': 'ambientPulse 15s ease-in-out infinite alternate',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        chevronBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        ambientPulse: {
          '0%': { opacity: '0.3', transform: 'scale(1)' },
          '100%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
