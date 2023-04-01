/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-red": "#BF2121",
        "dark-green": "#248900",
        "light-blue": "#2E7EC5",
        "light-cyan": "#24C9BF",
        "sky-blue": "#EDF4F8",
        "button-blue": "#35ADF1",
      },
    },
  },
  plugins: [],
};
