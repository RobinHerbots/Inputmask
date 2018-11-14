'use strict';
var $ = require("./lib/dependencyLibs/inputmask.dependencyLib"),
    webpackconfig = require('./webpack.config'),
    webPackJqueryConfig = $.extend(true, {}, webpackconfig);

webPackJqueryConfig.resolve.alias = {
    "./lib/dependencyLibs/inputmask.dependencyLib": "./lib/dependencyLibs/inputmask.dependencyLib.jquery",
    "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
};

webPackJqueryConfig.entry = {
    "dist/jquery.inputmask": "./bundle.jquery.js",
    "dist/jquery.inputmask.min": "./bundle.jquery.js"
};

module.exports = webPackJqueryConfig;