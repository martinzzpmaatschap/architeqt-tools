import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-turquoise': {
          DEFAULT: '#00A693',
          hover: '#008577',
          light: '#33B8A9',
          bg: '#E6F7F5',
        },
        'secondary-gold': {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
        },
        foreground: 'var(--foreground)',
        background: 'var(--background)',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
