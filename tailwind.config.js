/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        main: '#8b4513',//#ff7675
        hover: '#bdc3c7',
        hot: '#FFC312',
        textmain: '#8b4513',
        texthover: '#2d3436',
      },
    },
  },
  plugins: [],
}