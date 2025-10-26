/**
 * PostCSS Configuration
 *
 * PostCSS processes CSS files and applies transformations via plugins.
 * This configuration supports Tailwind CSS v4 and autoprefixing.
 *
 * Plugins:
 * - @tailwindcss/postcss: Processes Tailwind directives and generates utility classes (v4+)
 * - autoprefixer: Adds vendor prefixes for browser compatibility
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
