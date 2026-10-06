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
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        primary: {
          DEFAULT: '#123B63',
          hover: '#0e2f50',
          light: '#EFF6FF',
        },
        secondary: {
          DEFAULT: '#0F766E',
          hover: '#0d635d',
          light: '#E6F4F2',
        },
        darkBg: '#0B1120',
        darkCard: '#151F32',
        darkCardHeader: '#1A263D',
        darkBorder: '#23324E',
        darkText: '#F1F5F9',
        darkMuted: '#94A3B8',
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
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'none': 'none',
        'dialog': '0 4px 12px rgba(15,23,42,0.08)',
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px -5px rgba(18, 59, 99, 0.3)',
      }
    },
  },
  plugins: [],
}
