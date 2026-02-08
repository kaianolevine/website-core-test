/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require("@wcs-mn/eleventy-excellent-core/tailwind-preset")
  ],

  content: [
    "./src/**/*.{njk,md,html,webc,liquid,js,ts}",
    "./node_modules/@wcs-mn/eleventy-excellent-core/src/**/*.{njk,md,html,webc,liquid,js,ts}"
  ],

  darkMode: "class",

  theme: {
    extend: {
      // site-specific extensions go here
    }
  },

  plugins: []
};