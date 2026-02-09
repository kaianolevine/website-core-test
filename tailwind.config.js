import corePreset from "@wcs-mn/ee-core/tailwind-preset";

export default {
  presets: [corePreset],
  content: [
    "./src/**/*.{njk,md,html,liquid}",
    "./node_modules/@wcs-mn/ee-core/src/**/*.{njk,md,html,liquid,webc}"
  ]
};