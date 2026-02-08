/ ** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,md,html,webc,liquid,js,ts}",
    "./node_modules/@wcs-mn/eleventy-excellent-core/src/**/*.{njk,md,html,webc,liquid,js,ts}"
  ],

  darkMode: "class",

  theme: {
    extend: {
      // Used by Eleventy Excellent styles (e.g. @screen ltsm)
      screens: {
        // "less than small" (< 640px)
        ltsm: { max: "639px" }
      }
    }
  },

  plugins: []
};