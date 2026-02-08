import dotenv from "dotenv";
dotenv.config();

import yaml from "js-yaml";

// Import core config modules from the generated copy (src/_core)
import { getAllPosts, showInSitemap, tagList } from "./src/_core/_config/collections.js";
import events from "./src/_core/_config/events.js";
import filters from "./src/_core/_config/filters.js";
import plugins from "./src/_core/_config/plugins.js";
import shortcodes from "./src/_core/_config/shortcodes.js";

export default async function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async () => {
    await events.buildAllCss();
    await events.buildAllJs();
  });

  eleventyConfig.addWatchTarget("./src/assets/**/*.{css,js,svg,png,jpeg,webp}");
  eleventyConfig.addWatchTarget("./src/_merged/_includes/**/*.{webc}");

  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("page", "page.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");
  eleventyConfig.addLayoutAlias("tags", "tags.njk");

  eleventyConfig.addCollection("allPosts", getAllPosts);
  eleventyConfig.addCollection("showInSitemap", showInSitemap);
  eleventyConfig.addCollection("tagList", tagList);

  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ["./src/_merged/_includes/webc/**/*.webc"],
    useTransform: true
  });

  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: ["auto"],
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async" },
      pictureAttributes: {}
    }
  });

  eleventyConfig.addBundle("css", { hoist: true });

  eleventyConfig.setLibrary("md", plugins.markdownLib);
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  eleventyConfig.addFilter("toIsoString", filters.toISOString);
  eleventyConfig.addFilter("formatDate", filters.formatDate);
  eleventyConfig.addFilter("markdownFormat", filters.markdownFormat);
  eleventyConfig.addFilter("splitlines", filters.splitlines);
  eleventyConfig.addFilter("striptags", filters.striptags);
  eleventyConfig.addFilter("shuffle", filters.shuffleArray);
  eleventyConfig.addFilter("alphabetic", filters.sortAlphabetically);
  eleventyConfig.addFilter("slugify", filters.slugifyString);

  eleventyConfig.addShortcode("svg", shortcodes.svgShortcode);
  eleventyConfig.addShortcode("image", shortcodes.imageShortcode);
  eleventyConfig.addShortcode("imageKeys", shortcodes.imageKeysShortcode);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  if (process.env.ELEVENTY_RUN_MODE === "serve") {
    eleventyConfig.on("eleventy.after", events.svgToJpeg);
  }

  // passthroughs (same as upstream)
  ["src/assets/fonts/", "src/assets/images/template", "src/assets/og-images"].forEach(p =>
    eleventyConfig.addPassthroughCopy(p)
  );

  eleventyConfig.addPassthroughCopy({
    "src/assets/images/favicon/*": "/",
    "node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}": "assets/components/"
  });

  if (process.env.ELEVENTY_ENV != "test") {
    eleventyConfig.ignores.add("src/common/pa11y.njk");
  }

  return {
    markdownTemplateEngine: "njk",
    dir: {
      output: "dist",
      input: "src",
      includes: "_merged/_includes",
      layouts: "_merged/_layouts"
    }
  };
}
