const fs = require("fs"),
  _ = require("lodash"),
  terserPlugin = require("terser-webpack-plugin"),
  webpack = require("webpack");

function createBanner() {
  const pkg = JSON.parse(fs.readFileSync("./package.json"));
  return (
    "[name]\n" +
    `${pkg.homepage}\n` +
    `Copyright (c) 2010 - ${new Date().getFullYear()} ${pkg.author.name}\n` +
    `Licensed under the ${pkg.license} license\n` +
    `Version: ${pkg.version}`
  );
}

const rules = {
  // ESM build: no polyfills injected, the consumer is responsible for its own
  js: {
    test: /\.(js|ts)x?$/,
    loader: "babel-loader",
    exclude: /(node_modules)/,
    options: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: { esmodules: true },
            modules: false
          }
        ],
        "@babel/preset-typescript"
      ],
      passPerPreset: true
    }
  },
  // UMD flavour, needed for the legacy UMD bundles
  jsCommonjs: {
    test: /\.(js|ts)x?$/,
    loader: "babel-loader",
    exclude: /(node_modules)/,
    options: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ],
        "@babel/preset-typescript"
      ],
      plugins: [
        // UMD build: inject only the polyfills required by the browserslist targets
        [
          "polyfill-corejs3",
          {
            method: "usage-global",
            version: require("./package.json").dependencies["core-js"]
          }
        ]
      ],
      passPerPreset: true
    }
  }
};

function createMinimizer(pattern, env) {
  return new terserPlugin({
    include: pattern,
    terserOptions: {
      ecma: 2015,
      sourceMap: env.production !== true,
      format: {
        ecma: 2015,
        ascii_only: true,
        beautify: false,
        comments: /^!/
      },
      compress: {
        ecma: 2015,
        passes: 2,
        toplevel: true,
        drop_console: env.production === true
      },
      mangle: {
        toplevel: true
      }
    },
    extractComments: false
  });
}

module.exports = function (env, argv) {
  // The modern ES Module build is the base/default configuration.
  // Every other (legacy) build extends/overrides on top of this base.
  const modernConfig = {
      name: "modern",
      entry: {
        "dist/esm/inputmask.mjs": "./lib/inputmask.js",
        "dist/esm/inputmaskElement.mjs": {
          import: "./lib/inputmaskElement.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/definitions.mjs": {
          import: "./lib/extensions/definitions.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/cssunit.mjs": {
          import: "./lib/extensions/cssunit.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/url.mjs": {
          import: "./lib/extensions/url.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/ip.mjs": {
          import: "./lib/extensions/ip.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/email.mjs": {
          import: "./lib/extensions/email.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/mac.mjs": {
          import: "./lib/extensions/mac.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/vin.mjs": {
          import: "./lib/extensions/vin.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/ssn.mjs": {
          import: "./lib/extensions/ssn.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/date.mjs": {
          import: "./lib/extensions/date.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/numeric.mjs": {
          import: "./lib/extensions/numeric.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/colormask.mjs": {
          import: "./lib/extensions/colormask.js",
          dependOn: "dist/esm/inputmask.mjs"
        }
      },
      output: {
        path: __dirname,
        filename: "[name]",
        library: {
          type: "module"
        }
      },
      experiments: {
        outputModule: true
      },
      externals: {
        jquery: {
          commonjs: "jquery",
          commonjs2: "jquery",
          amd: "jquery",
          root: "jQuery"
        },
        jqlite: "jqlite",
        qunit: "QUnit",
        window: "window"
      },
      optimization: {
        minimize: false
      },
      module: {
        rules: [rules.js]
      },
      resolve: {
        extensions: [".wasm", ".mjs", ".js", ".ts", ".json"],
        alias: {
          // "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
        }
      },
      devtool: env.production === true ? undefined : "source-map",
      plugins: [
        new webpack.BannerPlugin({
          banner: createBanner,
          entryOnly: true
        })
      ],
      bail: true,
      mode: env.production === true ? "production" : "none",
      target: "web"
    },
    // Legacy UMD bundle (vanilla), extends on the modern base config.
    config = _.defaultsDeep({}, modernConfig);
  config.entry = {};
  _.assignIn(config, {
    name: "main",
    entry: {
      "dist/inputmask": "./bundle.js",
      "dist/inputmask.min": "./bundle.js"
    },
    experiments: {},
    output: {
      path: __dirname,
      filename: "[name].js",
      library: {
        type: "umd2"
      },
      globalObject: "typeof self !== 'undefined' ? self : this"
    },
    optimization: {
      minimize: env.production === true,
      minimizer: [createMinimizer(/\.min\.js$/, env)]
    },
    module: {
      rules: [rules.jsCommonjs]
    },
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".ts", ".json"],
      alias: {
        // "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
      }
    },
    target: ["web", "es2015"]
  });

  const jqueryConfig = _.defaultsDeep({}, config);
  jqueryConfig.entry = {};
  _.assignIn(jqueryConfig, {
    name: "jquery",
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".ts", ".json"],
      alias: {
        "./dependencyLibs/inputmask.dependencyLib":
          "./dependencyLibs/inputmask.dependencyLib.jquery"
      }
    },
    entry: {
      "dist/jquery.inputmask": "./bundle.jquery.js",
      "dist/jquery.inputmask.min": "./bundle.jquery.js"
    }
  });

  const colorMaskConfig = _.defaultsDeep({}, config);
  colorMaskConfig.entry = {};
  _.assignIn(colorMaskConfig, {
    name: "colormask",
    entry: {
      "dist/colormask": "./bundle.colormask.js",
      "dist/colormask.min": "./bundle.colormask.js"
    }
  });

  // Test bundle, dev only
  const testConfig = _.defaultsDeep({}, config);
  testConfig.entry = {};
  _.assignIn(testConfig, {
    name: "test",
    entry: {
      "qunit/qunit": "./qunit/index.js"
    },
    optimization: {
      minimize: false
    }
  });

  return [config, jqueryConfig, colorMaskConfig, modernConfig, testConfig];
};
