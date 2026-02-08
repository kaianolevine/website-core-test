/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: include both the site + the core package templates/components
  content: [
    "./src/**/*.{njk,md,html,webc,js,ts}",
    "./node_modules/@wcs-mn/eleventy-excellent-core/src/**/*.{njk,md,html,webc,js,ts}"
  ],

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