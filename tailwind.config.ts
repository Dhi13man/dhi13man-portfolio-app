import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Linear color system - near-black backgrounds
        background: '#0a0a0a',
        surface: '#141414',

        // Border system - subtle dividers
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.15)',
          accent: '#8B5CF6',
        },

        // Text hierarchy - white with opacity
        text: {
          primary: 'rgba(255, 255, 255, 1.0)',
          secondary: 'rgba(255, 255, 255, 0.7)',
          tertiary: 'rgba(255, 255, 255, 0.5)',
          quaternary: 'rgba(255, 255, 255, 0.3)',
        },

        // Accent colors - minimal use
        accent: {
          DEFAULT: '#8B5CF6',
          hover: '#9F7AEA',
        },

        // Status colors
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },

        // Hover states
        hover: {
          bg: 'rgba(255, 255, 255, 0.05)',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },

      // Linear typography scale - fixed sizes, 8px base, 1.25 ratio
      fontSize: {
        '12': ['12px', { lineHeight: '1.5' }],      // Captions, timestamps
        '14': ['14px', { lineHeight: '1.5' }],      // Small labels
        '16': ['16px', { lineHeight: '1.5' }],      // Base body (default)
        '20': ['20px', { lineHeight: '1.5' }],      // Large body
        '24': ['24px', { lineHeight: '1.5' }],      // Section headings (h3)
        '32': ['32px', { lineHeight: '1.25' }],     // Page section titles (h2)
        '48': ['48px', { lineHeight: '1.1' }],      // Page titles (h1)
        '64': ['64px', { lineHeight: '1.1' }],      // Hero displays
      },

      // Spacing system - 4px base unit, tight and precise
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },

      // Border radius - subtle, not rounded
      borderRadius: {
        DEFAULT: '8px',
        sm: '4px',
        lg: '12px',
        none: '0',
      },

      // NO shadows - Linear is flat
      boxShadow: {
        none: 'none',
      },

      // Fast transitions only
      transitionDuration: {
        DEFAULT: '150ms',
        fast: '150ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Minimal animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      animation: {
        'fade-in': 'fade-in 150ms ease-out',
      },
    },
  },
  plugins: [],
}

export default config
