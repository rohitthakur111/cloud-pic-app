/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        // 'primary' : rgb('55', '65','81' )
      },
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-left': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-right': 'slide-right .8s ease-in-out forwards',
        'slide-left': 'slide-left .8s ease-in-out forwards',
      },
    },
  },
  plugins: [
    daisyui,
  ],
}

