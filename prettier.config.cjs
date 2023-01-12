/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  tsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,

  // Tailwind CSS
  tailwindcss: {
    // Path to Tailwind config file
    config: './tailwind.config.js',
    // Format CSS files
    format: true,
  },
};
