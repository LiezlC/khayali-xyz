const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      // Gutters live in globals.css, not here: almost every call site writes
      // `container mx-auto px-4`, and a utility always beats the container's
      // own padding, so a responsive value set here never reaches the page.
      padding: '1rem',
      // Khayali is an image-led house, not a fixed-width documentation site.
      // Individual prose blocks keep their own max-width; page canvases do not.
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '100%',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-display)', ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
