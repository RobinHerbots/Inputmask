(function (factory) {
	if (typeof define === "function" && define.amd) {
		define([
			"./inputmask.dependencyLib",
			"./inputmask",
			"./inputmask.extensions",
			"./inputmask.date.extensions",
			"./inputmask.numeric.extensions",
			"./inputmask.phone.extensions",
			"./inputmask.regex.extensions",
			"./jquery.inputmask"
		], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(
			require("./inputmask.dependencyLib"),
			require("./inputmask"),
			require("./inputmask.extensions"),
			require("./inputmask.date.extensions"),
			require("./inputmask.numeric.extensions"),
			require("./inputmask.phone.extensions"),
			require("./inputmask.regex.extensions"),
			require("./jquery.inputmask")
		);
	} else {
		window.InputmaskLoader = jQuery.Deferred();
		jQuery.getScript("./js/inputmask.dependencyLib.js").done(function () {
			jQuery.getScript("./js/inputmask.js").done(function () {
				jQuery.getScript("./js/inputmask.extensions.js").done(function () {
					jQuery.getScript("./js/inputmask.date.extensions.js").done(function () {
						jQuery.getScript("./js/inputmask.numeric.extensions.js").done(function () {
							jQuery.getScript("./js/inputmask.phone.extensions.js").done(function () {
								jQuery.getScript("./js/inputmask.regex.extensions.js").done(function () {
									jQuery.getScript("./js/jquery.inputmask.js").done(function () {
										window.InputmaskLoader.resolve();
									})
								})
							})
						})
					})
				})
			})
		});
	}
}(function ($, Inputmask) {
	return Inputmask;
}));
