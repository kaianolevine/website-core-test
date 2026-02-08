/**
 * Site Tailwind config.
 *
 * - Inherits the shared preset from @wcs-mn/eleventy-excellent-core
 * - Keeps content globs site-scoped
 */

module.exports = {
  presets: [require('@wcs-mn/eleventy-excellent-core/tailwind-preset')],
  content: ['./src/**/*.{njk,liquid,html,md,webc,js}']
};
