/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adha: {
          navy: '#123B63',
          'navy-dark': '#0C2A48',
          'navy-light': '#1A4D7E',
          teal: '#0F766E',
          'teal-light': '#149188',
          amber: '#F97316',
          'amber-light': '#FB8C00',
          success: '#15803D',
          warning: '#D97706',
          danger: '#DC2626',
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#CBD5E1',
          'border-light': '#E2E8F0',
          text: '#0F172A',
          muted: '#64748B',
          card: '#F1F5F9',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
      },
      boxShadow: {
        'none': 'none',
        'dialog': '0 4px 12px rgba(15,23,42,0.08)',
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }
    },
  },
  plugins: [],
}
