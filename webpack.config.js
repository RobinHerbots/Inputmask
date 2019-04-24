var webpack = require("webpack"),
	UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function createBanner() {
	return "[name]\n" +
		"<%= pkg.homepage %>\n" +
		"Copyright (c) 2010 - <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
		"Licensed under the <%= pkg.license %> license\n" +
		"Version: <%= pkg.version %>";
}

var rules = {
	// sourceMap: {
	//     enforce: 'pre',
	//     test: /\.js$/,
	//     loader: 'source-map-loader',
	// },
	js: {
		test: /\.js$/,
		loader: "babel-loader",
		exclude: /(node_modules)/,
		options: {
			presets: [
				["@babel/preset-env"]
			],
			passPerPreset: true,
		},
	},
	// ts: {
	//     test: /\.tsx?$/,
	//     loader: 'awesome-typescript-loader',
	//     exclude: /(node_modules)/
	// },
	styles: {
		test: /\.css$/,
		use: [
			"style-loader",
			{
				loader: "css-loader",
				options: {
					importLoaders: 1
				}
			},
			{
				loader: "postcss-loader",
				options: {
					plugins: function () {
						return [
							require("postcss-cssnext")
						];
					}
				}
			}
		]
	}
};

module.exports = {
	entry: {
		"dist/inputmask": "./bundle.js",
		"dist/inputmask.min": "./bundle.js",
		"qunit/qunit": "./qunit/index.js"
	},
	output: {
		path: __dirname,
		filename: "[name].js",
		libraryTarget: "umd"
	},
	externals: {
		"jquery": {
			commonjs: "jquery",
			commonjs2: "jquery",
			amd: "jquery",
			root: "jQuery"
		},
		"jqlite": "jqlite",
		"qunit": "QUnit"
	},
	optimization: {
		minimize: false,
		minimizer: [new UglifyJsPlugin({
			include: /\.min\.js$/,
			sourceMap: false,
			uglifyOptions: {
				warnings: "verbose",
				mangle: false,
				compress: {
					keep_fnames: true,
					unused: false,
					typeofs: false,
					dead_code: false,
					collapse_vars: false
				},
				output: {
					ascii_only: true,
					beautify: false,
					comments: /^!/
				}
			},
			extractComments: false
		}), new UglifyJsPlugin({
			exclude: /\.min\.js$/,
			sourceMap: true,
			uglifyOptions: {
				warnings: "verbose",
				mangle: false,
				compress: {
					keep_fnames: true,
					unused: false,
					typeofs: false,
					dead_code: false,
					collapse_vars: false
				},
				output: {
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
			// rules.sourceMap,
			rules.js,
			// rules.ts,
			rules.styles
		]
	},
	resolve: {
		alias: {
			// "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
			// "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jqlite"
		}
	},
	devtool: "source-map",
	plugins: [
		new webpack.BannerPlugin({
			banner: createBanner(),
			entryOnly: true
		})
	],
	bail: true,
	mode: "none"
	// devServer: {
	// 	publicPath: '/',
	// 	stats: {
	// 		colors: true
	// 	},
	// 	host: '0.0.0.0',
	// 	inline: true,
	// 	port: '8080',
	// 	quiet: false,
	// 	noInfo: false,
	// },
};
