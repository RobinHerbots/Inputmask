const { readFileSync } = require("fs");
const path = require("path");

const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
const banner = `/*!
 * ${pkg.name}
 * ${pkg.homepage}
 * Copyright (c) 2010 - ${new Date().getFullYear()} ${pkg.author?.name || "Robin Herbots"}
 * Licensed under the ${pkg.license} license
 * Version: ${pkg.version}
 */`;

const globals = {
  jquery: "jQuery",
  inputmask: "Inputmask"
};

module.exports = [
  // UMD (unminified)
  {
    input: "src/index.ts",
    output: {
      file: "dist/jquery.inputmask.js",
      format: "umd",
      name: "InputmaskJQuery",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" },
      exports: "default"
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir: __dirname }),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: { esmodules: true }, modules: false }],
          "@babel/preset-typescript"
        ]
      })
    ]
  },

  // UMD (minified)
  {
    input: "src/index.ts",
    output: {
      file: "dist/jquery.inputmask.min.js",
      format: "umd",
      name: "InputmaskJQuery",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" },
      exports: "default"
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir: __dirname }),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: { esmodules: true }, modules: false }],
          "@babel/preset-typescript"
        ]
      }),
      terser({
        ecma: 2015,
        format: { comments: /^!/ },
        compress: { passes: 2, toplevel: true },
        mangle: { toplevel: true }
      })
    ]
  }
];