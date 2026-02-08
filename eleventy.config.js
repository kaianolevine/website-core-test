// Theme/core plugin
import eleventyExcellentCore from "@wcs-mn/eleventy-excellent-core";

export default async function (eleventyConfig) {
  // Mount shared core (registers shared plugins/filters/shortcodes/build pipeline)
  eleventyConfig.addPlugin(eleventyExcellentCore, {
    siteInputDir: "src",
    outputDir: "dist",
    enableBuildPipeline: true,
    siteWebcComponents: ["./src/_includes/webc/**/*.webc"]
  });

  // Watch site assets/includes during dev
  eleventyConfig.addWatchTarget("./src/assets/");
  eleventyConfig.addWatchTarget("./src/_includes/");
  eleventyConfig.addWatchTarget("./src/_layouts/");

  // Site-only passthrough assets (widgets, etc.). Core assets are handled by the core plugin.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      output: "dist",
      input: "src",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
}
