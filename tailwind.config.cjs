/** @type {import('tailwindcss').Config} */
const corePresetModule = require("@wcs-mn/eleventy-excellent-core/tailwind-preset");
const corePreset = corePresetModule?.default ?? corePresetModule;

module.exports = {
  presets: [corePreset],

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