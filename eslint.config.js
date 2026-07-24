"use strict";

const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js"),
  globals = require("globals");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

module.exports = [
  {
    ignores: ["build/**", "webpack.config.js", "inputmask-pages/**", "dist/**"]
  },
  ...compat.extends(
    "eslint:recommended",
    "standard",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended"
  ),
  {
    languageOptions: {
      parser: require("@babel/eslint-parser"),
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        Inputmask: true,
        jQuery: false,
        define: false,
        require: false
      }
    },
    rules: {
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always"
        }
      ],
      semi: [
        "error",
        "always",
        {
          omitLastInOneLineBlock: true
        }
      ],
      "comma-dangle": "off",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "import/named": "error",
      "prettier/prettier": ["error", { singleQuote: false }],
      "one-var": ["error", "consecutive"],
      "no-use-before-define": "off",
      "no-unmodified-loop-condition": "off",
      eqeqeq: "warn",
      "prefer-const": "warn",
      "no-proto": "warn"
    }
  }
];
