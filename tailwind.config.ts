import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gh: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          text: '#c9d1d9',
          muted: '#8b949e',
          green: '#39d353',
          blue: '#58a6ff',
          red: '#f85149',
          yellow: '#d29922',
          orange: '#e3b341',
          purple: '#bc8cff',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      animation: {
        'float-up': 'floatUp 1s ease-out forwards',
        'pulse-red': 'pulseRed 0.5s ease-in-out',
        'toast-in': 'toastIn 0.3s ease-out',
        'toast-out': 'toastOut 0.3s ease-in forwards',
        'tooltip-in': 'tooltipIn 0.12s ease-out',
        'social-in': 'socialIn 0.3s ease-out forwards',
        'social-out': 'socialOut 0.35s ease-in forwards',
      },
      keyframes: {
        socialIn: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.94)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        socialOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-8px) scale(0.95)' },
        },
        tooltipIn: {
          '0%': { opacity: '0', transform: 'translateX(-6px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-60px)' },
        },
        pulseRed: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(248, 81, 73, 0.1)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        toastOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
