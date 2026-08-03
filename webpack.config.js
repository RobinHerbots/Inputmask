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
  js: {
    test: /\.js$/,
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
      passPerPreset: true
    }
  },
  // commonjs flavour, needed for the legacy UMD bundles
  jsCommonjs: {
    test: /\.js$/,
    loader: "babel-loader",
    exclude: /(node_modules)/,
    options: {
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
      plugins: ["@babel/plugin-transform-modules-commonjs"],
      passPerPreset: true
    }
  },
  ts: {
    test: /\.tsx?$/,
    loader: "babel-loader",
    exclude: /(node_modules)/,
    options: {
      presets: ["@babel/preset-typescript"],
      passPerPreset: true
    }
  }
};

function createMinimizer(pattern, env) {
  return new terserPlugin({
    include: pattern,
    terserOptions: {
      sourceMap: env.production !== true,
      format: {
        ascii_only: true,
        beautify: false,
        comments: /^!/
      },
      compress: {
        drop_console: env.production === true
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
        "dist/esm/inputmask.extensions.mjs": {
          import: "./lib/extensions/inputmask.extensions.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/inputmask.date.extensions.mjs": {
          import: "./lib/extensions/inputmask.date.extensions.js",
          dependOn: "dist/esm/inputmask.mjs"
        },
        "dist/esm/inputmask.numeric.extensions.mjs": {
          import: "./lib/extensions/inputmask.numeric.extensions.js",
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
        rules: [rules.js, rules.ts]
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
      "dist/inputmask.min": "./bundle.js",
      "qunit/qunit": "./qunit/index.js"
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
      rules: [rules.jsCommonjs, rules.ts]
    },
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".ts", ".json"],
      alias: {
        // "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
      }
    },
    target: ["web", "es5"]
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
      "dist/jquery.inputmask.min": "./bundle.jquery.js",
      "qunit/qunit": "./qunit/index.js"
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

  return [config, jqueryConfig, colorMaskConfig, modernConfig];
};
