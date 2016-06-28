/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 -  Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 0.0.0-dev

 Phone extension.

 */
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["inputmask.dependencyLib", "inputmask"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("./inputmask.dependencyLib.jquery"), require("./inputmask"));
	} else {
		factory(window.dependencyLib || jQuery, window.Inputmask);
	}
}
(function ($, Inputmask) {
	Inputmask.extendAliases({
		"abstractphone": {
			countrycode: "",
			phoneCodes: [],
			mask: function (opts) {
				opts.definitions = {"#": opts.definitions["9"]};
				return opts.phoneCodes.sort(function (a, b) {
					return (a.mask || a) < (b.mask || b) ? -1 : 1;
				});
			},
			keepStatic: false,
			onBeforeMask: function (value, opts) {
				var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
				if (processedValue.indexOf(opts.countrycode) > 1 || processedValue.indexOf(opts.countrycode) === -1) {
					processedValue = "+" + opts.countrycode + processedValue;
				}

				return processedValue;
			}
		}
	});
	return Inputmask;
}));
