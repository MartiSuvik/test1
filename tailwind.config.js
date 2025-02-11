import aspectRatio from '@tailwindcss/aspect-ratio';
import relumeTailwind from '@relume_io/relume-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}'
  ],
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
  presets: [relumeTailwind],
  plugins: [
    aspectRatio,
  ],
};