(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("jquery"));
	} else {
		window.dependencyLib = factory(jQuery);
	}
}
(function ($) {
	return $;
}));
