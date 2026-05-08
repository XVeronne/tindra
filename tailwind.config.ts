import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './.storybook/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'rgb(var(--paper) / <alpha-value>)',
          raised: 'rgb(var(--paper-raised) / <alpha-value>)',
          sunken: 'rgb(var(--paper-sunken) / <alpha-value>)'
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)'
        },
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        clay: {
          DEFAULT: 'rgb(var(--clay) / <alpha-value>)',
          deep: 'rgb(var(--clay-deep) / <alpha-value>)',
          soft: 'rgb(var(--clay-soft) / <alpha-value>)'
        },
        moss: {
          DEFAULT: 'rgb(var(--moss) / <alpha-value>)',
          deep: 'rgb(var(--moss-deep) / <alpha-value>)',
          soft: 'rgb(var(--moss-soft) / <alpha-value>)'
        },
        burgundy: 'rgb(var(--burgundy) / <alpha-value>)',
        pine: 'rgb(var(--pine) / <alpha-value>)',
        ochre: 'rgb(var(--ochre) / <alpha-value>)'
      },
      fontFamily: {
        display: ['"Fraunces"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        eyebrow: '0.12em'
      },
      borderRadius: {
        'asym-1': '24px 4px 24px 4px',
        'asym-2': '4px 24px 4px 24px'
      },
      keyframes: {
        'march-y': {
          to: { backgroundPositionY: '12px' }
        },
        'march-x': {
          to: { backgroundPositionX: '12px' }
        }
      },
      animation: {
        'march-y': 'march-y 0.6s linear infinite',
        'march-x': 'march-x 0.6s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;
