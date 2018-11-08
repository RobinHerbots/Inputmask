'use strict';
let $ = require("./lib/dependencyLibs/inputmask.dependencyLib");
let webpackconfig = require('./webpack.config');

let webPackJqueryConfig = $.extend(true, {}, webpackconfig);

webPackJqueryConfig.resolve.alias = {
    "./lib/dependencyLibs/inputmask.dependencyLib": "./lib/dependencyLibs/inputmask.dependencyLib.jquery",
    "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
};

webPackJqueryConfig.entry = {
    "dist/inputmask/jquery.inputmask": "./lib/jquery.inputmask.js",
    "dist/inputmask/jquery.inputmask.min": "./lib/jquery.inputmask.js",
    "dist/jquery.inputmask.bundle": "./bundle.jquery.js",
    "dist/jquery.inputmask.bundle.min": "./bundle.jquery.js"
};

module.exports = webPackJqueryConfig;