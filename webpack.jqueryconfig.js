'use strict';

let webpackconfig = require('./webpack.config');

let webPackJqueryConfig = Object.assign({}, webpackconfig);

webPackJqueryConfig.resolve.alias = {
    "./js/dependencyLibs/inputmask.dependencyLib": "./js/dependencyLibs/inputmask.dependencyLib.jquery",
    "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
};

webPackJqueryConfig.entry = {
    "dist/jquery.inputmask.bundle": "./bundle.jquery.js",
    "dist/jquery.inputmask.bundle.min": "./bundle.jquery.js"
};

module.exports = webPackJqueryConfig;