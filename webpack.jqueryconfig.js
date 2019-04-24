var $ = require("./lib/dependencyLibs/inputmask.dependencyLib"),
	webpackconfig = require("./webpack.config"),
	webPackJqueryConfig = $.extend(true, {}, webpackconfig);


webPackJqueryConfig.optimization.minimize = true;
webPackJqueryConfig.resolve.alias = {
	"./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
};

webPackJqueryConfig.entry = {
	"dist/jquery.inputmask": "./bundle.jquery.js",
	"dist/jquery.inputmask.min": "./bundle.jquery.js",
	"qunit/qunit": "./qunit/index.js"
};

module.exports = webPackJqueryConfig;