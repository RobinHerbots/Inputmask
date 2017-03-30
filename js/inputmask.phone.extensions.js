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
		define(["./dependencyLibs/inputmask.dependencyLib", "./inputmask"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask"));
	} else {
		factory(window.dependencyLib || jQuery, window.Inputmask);
	}
}
(function ($, Inputmask) {
	function maskSort(a, b) {
		var maska = (a.mask || a).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""),
			maskb = (b.mask || b).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""),
			maskas = (a.mask || a).split("#")[0],
			maskbs = (b.mask || b).split("#")[0];

		return maskbs.indexOf(maskas) === 0 ? -1 : (maskas.indexOf(maskbs) === 0 ? 1 : maska.localeCompare(maskb));
	}

	var analyseMaskBase = Inputmask.prototype.analyseMask;

	Inputmask.prototype.analyseMask = function (mask, regexMask, opts) {
		var maskGroups = {};

		function reduceVariations(masks, previousVariation, previousmaskGroup) {
			previousVariation = previousVariation || "";
			previousmaskGroup = previousmaskGroup || maskGroups;
			if (previousVariation !== "")
				previousmaskGroup[previousVariation] = {};
			var variation = "", maskGroup = previousmaskGroup[previousVariation] || previousmaskGroup;
			for (var i = masks.length - 1; i >= 0; i--) {
				mask = masks[i].mask || masks[i];
				variation = mask.substr(0, 1);
				maskGroup[variation] = maskGroup[variation] || [];
				maskGroup[variation].unshift(mask.substr(1));
				masks.splice(i, 1);
			}
			for (var ndx in maskGroup) {
				if (maskGroup[ndx].length > 500) {
					reduceVariations(maskGroup[ndx].slice(), ndx, maskGroup);
				}
			}
		}

		function rebuild(maskGroup) {
			var mask = "", submasks = [];
			for (var ndx in maskGroup) {
				if ($.isArray(maskGroup[ndx])) {
					if (maskGroup[ndx].length === 1)
						submasks.push(ndx + maskGroup[ndx]);
					else
						submasks.push(ndx + opts.groupmarker.start + maskGroup[ndx].join(opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start) + opts.groupmarker.end);
				} else {
					submasks.push(ndx + rebuild(maskGroup[ndx]));
				}
			}
			if (submasks.length === 1) {
				mask += submasks[0];
			} else {
				mask += opts.groupmarker.start + submasks.join(opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start) + opts.groupmarker.end;
			}

			return mask;
		}


		if (opts.phoneCodes) {
			if (opts.phoneCodes && opts.phoneCodes.length > 1000) {
				mask = mask.substr(1, mask.length - 2);
				reduceVariations(mask.split(opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start));
				mask = rebuild(maskGroups);
			}
			//escape 9 definition
			mask = mask.replace(/9/g, "\\9");
		}
		// console.log(mask);
		var mt = analyseMaskBase.call(this, mask, regexMask,opts);
		return mt;
	};
	Inputmask.extendAliases({
		"abstractphone": {
			groupmarker: {
				start: "<",
				end: ">"
			},
			countrycode: "",
			phoneCodes: [],
			mask: function (opts) {
				opts.definitions = {"#": Inputmask.prototype.definitions["9"]};
				return opts.phoneCodes.sort(maskSort);
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
			},
			inputmode: "tel",
		}
	});
	return Inputmask;
}));
