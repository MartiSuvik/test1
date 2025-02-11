/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C5A267',
        secondary: '#2D2D2D',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    aspectRatio,
  ],
};