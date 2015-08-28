(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["jQuery"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("jQuery"));
		} else {
			factory(jQuery);
		}
	}
	(function($) {
		var dependencyLib = $; //todo split out needed functionality
		window.dependencyLib = dependencyLib;
		return dependencyLib;
	}));
