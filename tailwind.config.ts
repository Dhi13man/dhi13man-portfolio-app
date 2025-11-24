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
          accent: '#06B6D4',
        },

        // Text hierarchy - white with opacity
        text: {
          primary: 'rgba(255, 255, 255, 1.0)',
          secondary: 'rgba(255, 255, 255, 0.7)',
          tertiary: 'rgba(255, 255, 255, 0.5)',
          quaternary: 'rgba(255, 255, 255, 0.3)',
        },

        // Accent colors - distinctive teal/cyan
        accent: {
          DEFAULT: '#06B6D4',
          hover: '#22D3EE',
          muted: 'rgba(6, 182, 212, 0.15)',
        },

        // Secondary accent - warm coral for contrast
        secondary: {
          DEFAULT: '#F97316',
          hover: '#FB923C',
          muted: 'rgba(249, 115, 22, 0.15)',
        },

        // Status colors
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },

        // Gradient stops
        gradient: {
          start: '#06B6D4',
          mid: '#8B5CF6',
          end: '#F97316',
        },

        // Hover states
        hover: {
          bg: 'rgba(255, 255, 255, 0.05)',
        },
      },

      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
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

      // Enhanced animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'blur-in': {
          '0%': { opacity: '0', filter: 'blur(8px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
      },

      animation: {
        'fade-in': 'fade-in 500ms ease-out forwards',
        'slide-up': 'slide-up 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slide-down 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blur-in': 'blur-in 700ms ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
