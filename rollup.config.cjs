const { readFileSync } = require("fs");

const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");

const pkg = JSON.parse(readFileSync("./package.json", "utf-8")),
  banner = `/*!
 * ${pkg.name}
 * ${pkg.homepage}
 * Copyright (c) 2010 - ${new Date().getFullYear()} ${pkg.author.name}
 * Licensed under the ${pkg.license} license
 * Version: ${pkg.version}
 */`,
  extensions = [
    "definitions",
    "cssunit",
    "url",
    "ip",
    "email",
    "mac",
    "vin",
    "ssn",
    "date",
    "numeric"
  ],
  // Sibling bundles an extension imports at runtime. They are kept external so
  // they resolve as sibling files next to the extension bundle instead of
  // being inlined (and duplicated) into it.
  extensionSiblings = {
    date: ["./date.i18n.mjs"],
    mac: ["./definitions.mjs"]
  };

// Plugin to add .default to UMD CommonJS exports
function umdDefaultExport() {
  return {
    name: "umd-default-export",
    renderChunk(code, chunk) {
      if (
        chunk.fileName.endsWith(".js") &&
        !chunk.fileName.endsWith(".mjs") &&
        !chunk.fileName.includes("qunit")
      ) {
        const magicString = new (require("magic-string"))(code);
        const pattern = /module\.exports\s*=\s*factory\(\)\s*:/;
        const match = pattern.exec(code);
        if (match) {
          const replacement =
            "(module.exports = factory(), module.exports.default = module.exports) :";
          magicString.overwrite(
            match.index,
            match.index + match[0].length,
            replacement
          );
          return {
            code: magicString.toString(),
            map: magicString.generateMap({ hires: true })
          };
        }
      }
      return null;
    }
  };
}

const babelConfig = {
    babelHelpers: "bundled",
    presets: [
      ["@babel/preset-env", { targets: { esmodules: true }, modules: false }],
      "@babel/preset-typescript"
    ]
  },
  terserOptions = {
    ecma: 2015,
    format: { comments: /^!/ },
    compress: { passes: 2, toplevel: true },
    mangle: { toplevel: true }
  },
  globals = {
    jquery: "jQuery",
    jqlite: "jqlite",
    qunit: "QUnit",
    window: "window"
  };

module.exports = [
  // ===== ESM Builds =====

  // Main ESM entry: full bundle
  {
    input: "lib/index.js",
    output: {
      file: "dist/esm/inputmask.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window"],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects: "no-external" }
  },

  // Extensions ESM: each imports from main entry
  ...extensions.map((ext) => ({
    input: `lib/.rollup/${ext}.js`,
    output: {
      file: `dist/esm/extensions/${ext}.mjs`,
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: [
      "jquery",
      "jqlite",
      "qunit",
      "window",
      "../inputmask.mjs",
      ...(extensionSiblings[ext] || [])
    ],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    // the date extension pulls in the i18n module, which is a side-effect
    // module: it must never be dropped
    treeshake:
      ext === "date" ? { moduleSideEffects: true } : { moduleSideEffects: "no-external" }
  })),

    // Date i18n - has side effects (populates default i18n)
  {
    input: "lib/.rollup/date.i18n.js",
    output: {
      file: "dist/esm/extensions/date.i18n.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window", "../inputmask.mjs"],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects: true }
  },

// FormData patch - side effect: patches global FormData
  {
    input: "lib/global/FormData.js",
    output: {
      file: "dist/esm/global/FormData.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window"],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects: true }
  },

  // InputmaskElement - side effect: registers custom element
  {
    input: "lib/inputmaskElement.js",
    output: {
      file: "dist/esm/inputmaskElement.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window", "../inputmask.mjs"],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects: true }
  },

  // jQuery plugin - side effect: extends $.fn
  {
    input: "lib/jquery.inputmask.js",
    output: {
      file: "dist/esm/jquery.inputmask.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window", "../inputmask.mjs"],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects: true }
  },

  // Binding - side effect: attaches jQuery event handlers
  {
    input: "lib/bindings/inputmask.binding.js",
    output: {
      file: "dist/esm/bindings/inputmask.binding.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window"],
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects: true }
  },

  // ===== UMD Builds =====

  // Vanilla UMD (unminified)
  {
    input: "bundle.js",
    output: {
      file: "dist/inputmask.js",
      format: "umd",
      name: "Inputmask",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" },
      exports: "default"
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects: "no-external" }
  },

  // Vanilla UMD (minified)
  {
    input: "bundle.js",
    output: {
      file: "dist/inputmask.min.js",
      format: "umd",
      name: "Inputmask",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" },
      exports: "default"
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects: "no-external" }
  },

  // jQuery UMD (unminified)
  {
    input: "bundle.jquery.js",
    output: {
      file: "dist/jquery.inputmask.js",
      format: "umd",
      name: "Inputmask",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" },
      exports: "default"
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects: "no-external" }
  },

  // jQuery UMD (minified)
  {
    input: "bundle.jquery.js",
    output: {
      file: "dist/jquery.inputmask.min.js",
      format: "umd",
      name: "Inputmask",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" },
      exports: "default"
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects: "no-external" }
  },

  // ColorMask UMD (unminified)
  {
    input: "bundle.colormask.js",
    output: {
      file: "dist/colormask.js",
      format: "umd",
      name: "Inputmask",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" },
      exports: "default"
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects: "no-external" }
  },

  // ColorMask UMD (minified)
  {
    input: "bundle.colormask.js",
    output: {
      file: "dist/colormask.min.js",
      format: "umd",
      name: "Inputmask",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" },
      exports: "default"
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects: "no-external" }
  },

  // Test bundle (IIFE for QUnit)
  {
    input: "qunit/index.js",
    output: {
      file: "qunit/qunit.js",
      format: "iife",
      name: "InputmaskTest",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: Object.keys(globals),
    plugins: [
      // ignoreSideEffectsForRoot: the published "sideEffects" whitelist must
      // not strip the side effects of the bundles loaded by the test bundle
      // (the jquery plugin bundle registers $.fn.inputmask)
      resolve({ browser: true, ignoreSideEffectsForRoot: true }),
      commonjs(),
      babel(babelConfig)
    ],
    treeshake: { moduleSideEffects: true }
  }
];
