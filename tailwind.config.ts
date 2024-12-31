import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      backgroundImage: {
        'tv': 'radial-gradient(circle, #B67360 40%, #E1CEAE 100%)',
      },
      colors: {
        offblack: "#0D0D0D",
        offwhite: "#FFF8EF",
        cyanblue: "#129BC0"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: "1" },
          '50%': { opacity: "0" },
        },
        rotate180: {
          '0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(180deg)' },
        },
        rotateback180: {
          '0%': { transform: 'rotate(180deg)' },
					'100%': { transform: 'rotate(0deg)' },
        },
        flyInUp: {
          '0%': { opacity: '0', transform: 'translateY(200px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flyInDown: {
          '0%': { opacity: '0', transform: 'translateY(-200px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 0.9s steps(1, end) infinite',
        'rotate-180': 'rotate180 0.5s ease-in-out forwards',
        'rotate-back-180': 'rotateback180 0.5s ease-in-out forwards',
        flyInUp: 'flyInUp 0.6s forwards',
        flyInDown: 'flyInDown 0.6s forwards',
      },
    }
  },
  variants: {
    extend: {
      animation: ['responsive'],
    },
  },

  plugins: []
} satisfies Config;
