const { readFileSync } = require("fs");
const path = require("path");

const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const { createFilter } = require("@rollup/pluginutils");

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

const rootDir = path.resolve(__dirname);

// The modules that have side effects as far as the build is concerned.
//
// package.json's "sideEffects" field is deliberately NOT read here: that field
// describes the package as consumers see it (the published bundles), while this
// list describes the build (the entry points, the qunit harness, the source
// modules that are imported for their side effects only and the built bundles
// the qunit harness loads). Keeping the two apart means editing the published
// metadata can no longer silently change what the build tree-shakes.
//
// The same glob semantics as webpack (and @rollup/plugin-node-resolve) are
// used: a pattern containing a "/" is relative to the package root, a bare file
// name matches at any depth.
//
// Every module that is reachable through a used export keeps its side effects
// either way, so a module only has to be listed when it is imported for its
// side effects alone.
const buildSideEffects = [
  // Bundle entry points (bundle.colormask.js imports bundle.js for its side
  // effects only).
  "./bundle.js",
  "./bundle.colormask.js",
  // The qunit harness and the prototype extensions it installs.
  "./qunit/index.js",
  "./qunit/prototypeExtensions.js",
  // The built UMD bundles the qunit entries import.
  "./dist/*.js",
  // The ESM lane imports the FormData patch for its side effects only.
  "./dist/esm/dom/FormData.mjs",
  // Source modules that are imported for their side effects only: they patch
  // globals, register a custom element or extend $.fn.
  "./lib/index.js",
  "./lib/dom/FormData.js",
  "./lib/extensions/date.i18n.js",
  "./lib/components/inputmaskElement.js"
];

const sideEffectPatterns = buildSideEffects.map((pattern) =>
  pattern.includes("/") ? pattern : `**/${pattern}`
);
const listedSideEffects = createFilter(sideEffectPatterns, null, {
  resolve: rootDir
});

// Modules outside the package (dependencies) keep rollup's own resolution.
const moduleSideEffects = (id) => {
  const relativePath = path.relative(rootDir, id).split(path.sep).join("/");
  if (relativePath.startsWith("..")) return true;
  return listedSideEffects(id);
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
  // The <input-mask> custom element is deliberately not part of it: the
  // element lives in lib/components/inputmaskElement.js and lib/index.js does
  // not import it. It ships as its own bundle (dist/esm/inputmaskElement.mjs)
  // and is registered by the UMD bundles only.
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
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects }
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
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects }
  })),

  // Date i18n - has side effects (populates default i18n)
  {
    input: "lib/extensions/date.i18n.js",
    output: {
      file: "dist/esm/extensions/date.i18n.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window", "../inputmask.mjs"],
    plugins: [
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects }
  },

  // FormData patch - side effect: patches global FormData
  {
    input: "lib/dom/FormData.js",
    output: {
      file: "dist/esm/dom/FormData.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window"],
    plugins: [
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects }
  },

  // InputmaskElement - side effect: registers custom element
  {
    input: "lib/components/inputmaskElement.js",
    output: {
      file: "dist/esm/inputmaskElement.mjs",
      format: "esm",
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: ["jquery", "jqlite", "qunit", "window", "../inputmask.mjs"],
    plugins: [
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions)
    ],
    treeshake: { moduleSideEffects }
  },

  // jQuery plugin - side effect: extends $.fn
  // Moved to @inputmask/jquery package
  // {
  //   input: "lib/components/jquery.inputmask.esm.js",
  //   output: {
  //     file: "dist/esm/jquery.inputmask.mjs",
  //     format: "esm",
  //     sourcemap: true,
  //     banner,
  //     generatedCode: { preset: "es2015" }
  //   },
  //   external: ["jquery", "jqlite", "qunit", "window", "../inputmask.mjs"],
  //   plugins: [
  //     resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
  //     commonjs(),
  //     babel(babelConfig),
  //     terser(terserOptions)
  //   ],
  //   treeshake: { moduleSideEffects }
  // },

  // Binding - side effect: attaches jQuery event handlers
  // {
  //   input: "lib/bindings/inputmask.binding.js",
  //   output: {
  //     file: "dist/esm/bindings/inputmask.binding.mjs",
  //     format: "esm",
  //     sourcemap: true,
  //     banner,
  //     generatedCode: { preset: "es2015" }
  //   },
  //   external: ["jquery", "jqlite", "qunit", "window"],
  //   plugins: [
  //     resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
  //     commonjs(),
  //     babel(babelConfig),
  //     terser(terserOptions)
  //   ],
  //   treeshake: { moduleSideEffects }
  // },

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
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects }
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
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects }
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
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects }
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
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig),
      terser(terserOptions),
      umdDefaultExport()
    ],
    treeshake: { moduleSideEffects }
  },

  // Test bundles (IIFE for QUnit). One bundle per artifact under test; Karma
  // selects one with INPUTMASK_BUNDLE (see karma.conf.js).
  // The jquery lane loads the UMD bundle as a global script, so the harness
  // must not import it (to avoid pulling in a second instance).
  ...[
    ["qunit/index.js", "qunit/qunit.js"],
    ["qunit/index.jquery.js", "qunit/qunit.jquery.js"],
    ["qunit/index.esm.js", "qunit/qunit.esm.js"]
  ].map(([input, file]) => ({
    input,
    output: {
      file,
      format: "iife",
      name: "InputmaskTest",
      globals,
      sourcemap: true,
      banner,
      generatedCode: { preset: "es2015" }
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ browser: true, ignoreSideEffectsForRoot: true, rootDir }),
      commonjs(),
      babel(babelConfig)
    ],
    treeshake: { moduleSideEffects }
  }))
];
