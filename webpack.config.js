'use strict';

let webpack = require('webpack');
let postcss_cssnext = require('postcss-cssnext');
let path = require('path');

function _path(p) {
	return path.join(__dirname, p);
}

module.exports = {
	entry: "./app.js",
	output: {
		path: __dirname,
		filename: "build/bundle.js"
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader:'source-map',
			},
		],
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /(node_modules)/,
				query: {
					presets: [
						'es2015',
						'stage-0',
					],
					passPerPreset: true,
				},
			},
			{
				test: /\.css$/,
				loader: 'style!css?importLoaders=1!postcss',
			},
		]
	},
	postcss: [postcss_cssnext],
	resolve: {
		alias: {
		},
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin(
			'[file].map', null,
			'[absolute-resource-path]',
			'[absolute-resource-path]'
		),
	],
	bail: true,
	debug: true,
	devServer: {
		publicPath: '/',
		outputPath: _path('build'),
		stats: {colors: true},
		host: '0.0.0.0',
		inline: true,
		port: '8080',
		quiet: false,
		noInfo: false,
	},
};
