(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery", "../global/window"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("jquery"), require("../global/window"));
	} else {
		factory(jQuery, window);
	}
}
(function ($, window) {
	window.dependencyLib = $;
	return $;
}));
