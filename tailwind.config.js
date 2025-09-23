/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#1DB954",
        darkBg: "#121212",
      },
    },
  },
  plugins: [],
};
