import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssImport from "postcss-import";
import postcssImportExtGlob from "postcss-import-ext-glob";

export default {
  plugins: [
    postcssImportExtGlob,
    postcssImport,
    tailwindcss({ config: "./tailwind.config.js" }),
    autoprefixer,
    cssnano
  ]
};
