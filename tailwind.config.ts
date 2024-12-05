import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      backgroundImage: {
        'tv': '',
        'books': ''
      },
      colors: {
        offblack: "#0D0D0D",
        offwhite: "#FFF8EF",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },

  plugins: []
} satisfies Config;
