/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        1: "#000",
        2: "#0f0e17",
        3: "#1c1c1c",
      },
      white: {
        1: "#fffffe",
        2: "#a7a9be",
      },
      pink: "#e53170",
      orange: "#ff8906",
      blue: "#6246ea",
      yellow: "#ffd803",
      green: {
        1: "#2cb67d",
        2: "#078080",
      },
    },
  },
  plugins: [],
};
