var webpack = require("webpack"),
	terserPlugin = require("terser-webpack-plugin"),
	_ = require("lodash"),
	fs = require("fs");

function createBanner() {
	var pkg = JSON.parse(fs.readFileSync("./package.json"));
	return "[name]\n" +
		`${pkg.homepage}\n` +
		`Copyright (c) 2010 - ${new Date().getFullYear()} ${pkg.author.name}\n` +
		`Licensed under the ${pkg.license} license\n` +
		`Version: ${pkg.version}`;
}

var rules = {
	js: {
		test: /\.js$/,
		loader: "babel-loader",
		exclude: /(node_modules)/,
		options: {
			presets: ["@babel/preset-env"],
			plugins: ["@babel/plugin-transform-modules-commonjs"],
			passPerPreset: true,
		},
	},
	ts: {
		test: /\.tsx?$/,
		loader: "babel-loader",
		exclude: /(node_modules)/,
		options: {
			presets: ["@babel/preset-typescript"],
			passPerPreset: true,
		},
	}
};

module.exports = function (env, argv) {
	var config = {
		name: "main",
		entry: {
			"dist/inputmask": "./bundle.js",
			"dist/inputmask.min": "./bundle.js",
			"qunit/qunit": "./qunit/index.js"
		},
		// experiments: {
		// 	outputModule: true,
		// },
		output: {
			path: __dirname,
			filename: "[name].js",
			library: {
				"type": "umd2",
			},
			globalObject: "self || this"
		},
		externals: {
			"jquery": {
				commonjs: "jquery",
				commonjs2: "jquery",
				amd: "jquery",
				root: "jQuery"
			},
			"jqlite": "jqlite",
			"qunit": "QUnit",
			"window": "window"
		},
		optimization: {
			minimize: env === "production",
			minimizer: [new terserPlugin({
				include: /\.min\.js$/,
				terserOptions: {
					sourceMap: env !== "production",
					format: {
						ascii_only: true,
						beautify: false,
						comments: /^!/
					}
				},
				extractComments: false
			}), new terserPlugin({
				exclude: /\.min\.js$/,
				terserOptions: {
					sourceMap: env !== "production",
					format: {
						ascii_only: true,
						beautify: true,
						comments: /^!/
					}
				},
				extractComments: false
			})]
		},
		module: {
			rules: [
				rules.js,
				rules.ts
			]
		},
		resolve: {
			extensions: [".wasm", ".mjs", ".js", ".ts", ".json"],
			alias: {
				// "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
			},
		},
		devtool: env === "production" ? undefined : "source-map",
		plugins: [
			new webpack.BannerPlugin({
				banner: createBanner,
				entryOnly: true
			})
		],
		bail: true,
		mode: env === "production" ? "production" : "none",
		target: ["web", "es5"]
	};

	var jqueryConfig = _.defaultsDeep({}, config);
	jqueryConfig.entry = {};
	_.assignIn(jqueryConfig, {
		name: "jquery",
		resolve: {
			extensions: [".wasm", ".mjs", ".js", ".ts", ".json"],
			alias: {
				"./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
			}
		},
		entry: {
			"dist/jquery.inputmask": "./bundle.jquery.js",
			"dist/jquery.inputmask.min": "./bundle.jquery.js",
			"qunit/qunit": "./qunit/index.js"
		}
	});

	return [config, jqueryConfig];
};
