// tailwind.config.ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155',
            'h1, h2, h3': {
              color: '#111827',
            },
            'ul > li::before': {
              backgroundColor: '#94a3b8',
            }
          }
        }
      }
    }
  },
  plugins: [
    typography,
  ],
}

export default config