'use strict';

let webpack = require('webpack');
let path = require('path');

function _path(p) {
    return path.join(__dirname, p);
}

const rules = {
    sourceMap: {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
    },
    js: {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
            presets: [
                'env'
            ],
            passPerPreset: true,
        },
    },
    styles: {
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [
                            require('postcss-cssnext')
                        ];
                    }
                }
            }
        ]
    }
}

module.exports = {
    entry: "./bundle.js",
    output: {
        path: __dirname,
        filename: "build/bundle.js"
    },
    externals: {
        "jquery": "jQuery"
    },
    module: {
        rules: [
            rules.sourceMap,
            rules.js,
            rules.styles
        ]
    },
    resolve: {
        alias: {
            "./js/dependencyLibs/inputmask.dependencyLib": "./js/dependencyLibs/inputmask.dependencyLib.jquery",
            "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
            //"./js/dependencyLibs/inputmask.dependencyLib": "./js/dependencyLibs/inputmask.dependencyLib.jqlite",
            // "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jqlite"
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            // file and reference
            filename: '[file].map',
            // sources naming
            moduleFilenameTemplate: '[absolute-resource-path]',
            fallbackModuleFilenameTemplate: '[absolute-resource-path]',
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    bail: true,
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
