import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        trading: {
          buy: '#10B981',
          sell: '#EF4444',
          neutral: '#6B7280',
        }
      }
    },
  },
  plugins: [],
}
export default config
