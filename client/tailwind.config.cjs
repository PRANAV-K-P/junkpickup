/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-red": "#BF2121",
        "dark-green": "#248900",
        "light-blue": "#2E7EC5"
      },
    },
  },
  plugins: [],
};
