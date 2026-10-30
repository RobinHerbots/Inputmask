import { readFileSync } from "node:fs";
import path from "node:path";

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

// Every bare import is a peer dependency of the published package. Only relative
// modules (the local sources) are bundled.
const external = (id) => !id.startsWith(".") && !path.isAbsolute(id);

function createBanner(pkg) {
  const homepage =
    pkg.homepage ||
    pkg.repository?.url ||
    "https://github.com/RobinHerbots/Inputmask";

  return `/*!
 * ${pkg.name}
 * ${homepage}
 * Copyright (c) 2010 - ${new Date().getFullYear()} ${pkg.author?.name || "Robin Herbots"}
 * Licensed under the ${pkg.license} license
 * Version: ${pkg.version}
 */`;
}

function createBabelPlugin({ jsx, legacy }) {
  const presets = jsx
    ? [
        "@babel/preset-typescript",
        ["@babel/preset-react", { runtime: "automatic", development: false }]
      ]
    : ["@babel/preset-typescript"];

  if (legacy) {
    // The UMD bundles target browsers that support ES modules, matching the
    // existing jQuery UMD build.
    presets.unshift([
      "@babel/preset-env",
      { targets: { esmodules: true }, modules: false }
    ]);
  }

  return babel({
    babelHelpers: "bundled",
    babelrc: false,
    configFile: false,
    extensions,
    presets
  });
}

function createPlugins({ pkgDir, jsx, legacy = false }) {
  return [
    nodeResolve({
      browser: true,
      extensions,
      ignoreSideEffectsForRoot: true,
      rootDir: pkgDir
    }),
    commonjs(),
    createBabelPlugin({ jsx, legacy })
  ];
}

/**
 * Builds the rollup config for a framework wrapper package.
 *
 * @param {object} options
 * @param {string} options.pkgDir absolute path to the package directory
 * @param {string} options.entry entry point, relative to `pkgDir`
 * @param {string} options.name output basename, without extension
 * @param {boolean} [options.jsx] enable the React JSX transform
 * @param {boolean} [options.umd] emit standalone UMD bundles (jQuery only)
 * @param {boolean} [options.cjsStandalone] bundle everything but the peer deps
 * into the CJS output (jQuery only)
 */
export function createPackageConfig({
  pkgDir,
  entry,
  name,
  jsx = false,
  umd = false,
  cjsStandalone = false
}) {
  const pkg = JSON.parse(
    readFileSync(path.join(pkgDir, "package.json"), "utf8")
  );
  const input = path.join(pkgDir, entry);
  const dist = (file) => path.join(pkgDir, "dist", file);

  const configs = [
    {
      input,
      external,
      plugins: createPlugins({ pkgDir, jsx }),
      output: {
        file: dist(`${name}.js`),
        format: "es",
        sourcemap: true
      }
    },
    {
      input,
      // The core only exposes the extension modules through an `import`
      // condition, so a CJS build that keeps them external cannot be
      // required. Bundle the core and its extensions instead: they share a
      // single Inputmask instance, which is the instance the plugin
      // configures.
      external: cjsStandalone ? ["jquery"] : external,
      plugins: createPlugins({ pkgDir, jsx }),
      output: {
        file: dist(`${name}.cjs`),
        format: "cjs",
        sourcemap: true
      }
    }
  ];

  if (umd) {
    // The UMD build is standalone: it bundles the core and its extensions so
    // that extension registration happens on the same Inputmask instance the
    // plugin uses. jQuery stays external as a browser global.
    const umdOutput = {
      format: "umd",
      name: "InputmaskJQuery",
      globals: { jquery: "jQuery" },
      sourcemap: true,
      banner: createBanner(pkg),
      exports: "default",
      generatedCode: { preset: "es2015" }
    };

    configs.push(
      {
        input,
        external: ["jquery"],
        plugins: createPlugins({ pkgDir, jsx, legacy: true }),
        output: { ...umdOutput, file: dist(`${name}.umd.js`) }
      },
      {
        input,
        external: ["jquery"],
        plugins: [
          ...createPlugins({ pkgDir, jsx, legacy: true }),
          terser({
            ecma: 2015,
            format: { comments: /^!/ },
            compress: { passes: 2, toplevel: true },
            mangle: { toplevel: true }
          })
        ],
        output: { ...umdOutput, file: dist(`${name}.min.js`) }
      }
    );
  }

  return configs;
}
