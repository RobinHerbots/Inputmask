(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["jqlite"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("jqlite"));
		} else {
			factory(jqlite);
		}
	}
	(function($) {
		window.dependencyLib = $;
		return $;
	}));
