import eleventyExcellentCore from '@wcs-mn/eleventy-excellent-core/plugin';

export default async function (eleventyConfig) {
  // Use the shared core plugin for all shared config, assets, layouts, includes, etc.
  eleventyConfig.addPlugin(eleventyExcellentCore, {
    siteInputDir: 'src',
    outputDir: 'dist'
  });

  // Optional: site-specific watch targets
  eleventyConfig.addWatchTarget('./src/assets/');

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}
