import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser, // Add browser globals
        ...globals.node,    // Add Node.js globals
      },
    },
  },
  pluginJs.configs.recommended,
];
