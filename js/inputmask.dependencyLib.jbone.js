(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["jbone"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("jbone"));
		} else {
			factory(jBone);
		}
	}
	(function($) {
		window.dependencyLib = $;
		return $;
	}));
