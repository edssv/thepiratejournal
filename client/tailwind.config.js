/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      popover: {
        DEFAULT: 'var(--md-sys-color-surface)'
      },
      primary: 'var(--md-sys-color-primary)',
      error: 'var(--md-sys-color-error)',
      'outline-variant': 'var(--md-sys-color-outline-variant)',
      'on-surface-variant': 'var(--md-sys-color-on-surface-variant)'
    },
    screens: {
      sm: { max: '509.98px' },
      // => @media (max-width: 509.98px) { ... }

      md: { max: '767.98px' },
      // => @media (max-width: 767.98px) { ... }

      lg: { max: '990.98px' },
      // => @media (max-width: 990.98px) { ... }

      xl: { max: '1279.98px' },
      // => @media (max-width: 1279.98px) { ... }

      '2xl': { max: '1599.98px' }
      // => @media (max-width: 1599.98px) { ... }
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: []
};
