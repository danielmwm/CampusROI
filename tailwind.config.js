/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        'navy-900': '#080E1A',
        'navy-800': '#1E293B',
        'navy-700': '#334155',
        'navy-600': '#475569',
        brand: '#22C55E',
        'brand-50': '#F0FDF4',
        'brand-100': '#DCFCE7',
        'brand-600': '#16A34A',
        'brand-700': '#15803D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 65%)',
        'cta-glow': 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(34,197,94,0.07) 0%, transparent 60%)',
      },
      boxShadow: {
        'brand': '0 4px 24px rgba(34, 197, 94, 0.25)',
        'brand-sm': '0 2px 12px rgba(34, 197, 94, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
