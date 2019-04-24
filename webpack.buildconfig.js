var $ = require("./lib/dependencyLibs/inputmask.dependencyLib"),
	webpackconfig = require("./webpack.config"),
	webPackBuildConfig = $.extend(true, {}, webpackconfig);


webPackBuildConfig.optimization.minimize = true;

module.exports = webPackBuildConfig;