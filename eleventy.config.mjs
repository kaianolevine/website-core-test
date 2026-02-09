import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";

import eeCore from "@wcs-mn/ee-core/plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (eleventyConfig) {
  // Core plugin wires filters/shortcodes/plugins + passthrough core assets
  eleventyConfig.addPlugin(eeCore);

  // Site passthrough (compiled CSS output lives in src/assets/css)
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });

  // Nunjucks: site overrides first, then core fallback.
  const siteIncludes = path.join(__dirname, "src", "_includes");
  const coreIncludes = path.join(
    path.dirname(fileURLToPath(import.meta.resolve("@wcs-mn/ee-core/package.json"))),
    "src",
    "_includes"
  );

  const loader = new nunjucks.FileSystemLoader([siteIncludes, coreIncludes], { noCache: true });
  const env = new nunjucks.Environment(loader, { autoescape: true });

  eleventyConfig.setLibrary("njk", env);

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  };
}
