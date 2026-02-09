import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";

import eeCore, { getTemplateSearchPaths } from "@wcs-mn/ee-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (eleventyConfig) {
  // Core plugin: filters/collections + buildAllCss/buildAllJs + passthrough, etc.
  eleventyConfig.addPlugin(eeCore);

  // Site overrides first, core fallback second
  const corePkgDir = path.dirname(
    fileURLToPath(import.meta.resolve("@wcs-mn/ee-core/package.json"))
  );
  const coreSrc = path.join(corePkgDir, "src");
  const siteSrc = path.join(__dirname, "src");

  const searchPaths = getTemplateSearchPaths({ siteSrc, coreSrc });
  const loader = new nunjucks.FileSystemLoader(searchPaths, { noCache: true });
  eleventyConfig.setLibrary("njk", new nunjucks.Environment(loader, { autoescape: true }));

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  };
}