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
				var masks = opts.phoneCodes.sort(function (a, b) {
					var maska = (a.mask || a).replace(/#/g, "9").replace(/[\+\(\)#-]/g, ""),
						maskb = (b.mask || b).replace(/#/g, "9").replace(/[\+\(\)#-]/g, ""),
						maskas = (a.mask || a).split("#")[0],
						maskbs = (b.mask || b).split("#")[0];

					return maskbs.indexOf(maskas) === 0 ? -1 : (maskas.indexOf(maskbs) === 0 ? 1 : maska.localeCompare(maskb));
				});
				//console.log(JSON.stringify(masks));
				return masks;
			},
			keepStatic: true,
			onBeforeMask: function (value, opts) {
				var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
				if (processedValue.indexOf(opts.countrycode) > 1 || processedValue.indexOf(opts.countrycode) === -1) {
					processedValue = "+" + opts.countrycode + processedValue;
				}

				return processedValue;
			},
			onUnMask: function (maskedValue, unmaskedValue, opts) {
				//implement me
				return unmaskedValue;
			}
		}
	});
	return Inputmask;
}));
