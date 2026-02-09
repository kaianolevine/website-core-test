import corePreset from "@wcs-mn/ee-core/tailwind-config";

export default {
  ...corePreset,
  content: [
    "./src/**/*.{html,js,md,njk,liquid,webc}",
    "./node_modules/@wcs-mn/ee-core/src/**/*.{html,js,md,njk,liquid,webc}"
  ]
};
