/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        koho: ["KoHo", "sans-serif"],
        serifJp: ["Noto Serif JP", "serif"],
        sansJp: ["Noto Sans JP", "sans-serif"],
        sakurata: ["Sakurata", "sans-serif"],
        shuriken: ["Shuriken", "sans-serif"],
        deathNote: ["DeathNote", "sans-serif"],
      },
    },
  },
  plugins: [],
};
