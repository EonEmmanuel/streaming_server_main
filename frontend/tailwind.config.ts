import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#080b14',
        foreground: '#ebefff',
        card: '#121726'
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
} satisfies Config;
