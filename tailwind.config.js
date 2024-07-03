// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': { max: "480px" },
      },
      colors: {
        customGrey: '#F5F5F5',
      },
    },
  },
  plugins: [],
};