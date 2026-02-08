import dotenv from "dotenv";
dotenv.config();

import path from "node:path";
import { createRequire } from "node:module";

// Theme/core plugin
import eleventyExcellentCore from "@wcs-mn/eleventy-excellent-core";

const require = createRequire(import.meta.url);
const corePkgJson = require.resolve("@wcs-mn/eleventy-excellent-core/package.json");
const coreRoot = path.dirname(corePkgJson);
const coreSrc = path.join(coreRoot, "src");
const coreIncludesDir = path.join(coreSrc, "_includes");
const coreLayoutsDir = path.join(coreSrc, "_layouts");

export default async function (eleventyConfig) {
  // Mount shared core (registers shared plugins/filters/shortcodes/build pipeline)
  eleventyConfig.addPlugin(eleventyExcellentCore, {
    siteInputDir: "src",
    outputDir: "dist",
    enableBuildPipeline: true,
    siteWebcComponents: ["./src/_includes/webc/**/*.webc"]
  });

  // Site-first, core-second template search paths (override behavior)
  const siteSrc = path.resolve("src");
  const includePaths = [
    path.join(siteSrc, "_includes"),
    path.join(siteSrc, "_layouts"),
    coreIncludesDir,
    coreLayoutsDir
  ];

  // Nunjucks + Liquid fallbacks
  eleventyConfig.setNunjucksEnvironmentOptions({ includePaths });
  eleventyConfig.setLiquidOptions({ partials: includePaths });

  // Watch site assets/includes during dev
  eleventyConfig.addWatchTarget("./src/assets/**/*.{css,js,svg,png,jpeg,webp}");
  eleventyConfig.addWatchTarget("./src/_includes/**/*.{webc,njk,liquid,md,11ty.js}");
  eleventyConfig.addWatchTarget("./src/_layouts/**/*.{njk,liquid,md,11ty.js}");

  // Site-only passthrough assets (widgets, etc.). Core assets are handled by the core plugin.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      output: "dist",
      input: "src",
      includes: "_includes",
      // Layout resolution must include core layouts; site layouts can still override via Nunjucks/Liquid includePaths.
      layouts: coreLayoutsDir
    }
  };
}
