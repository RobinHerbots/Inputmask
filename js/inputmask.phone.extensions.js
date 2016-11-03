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
		module.exports = factory(require("./inputmask.dependencyLib"), require("./inputmask"));
	} else {
		factory(window.dependencyLib || jQuery, window.Inputmask);
	}
}
(function ($, Inputmask) {
	var analyseMaskBase = Inputmask.analyseMask;

	function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
		this.matches = [];
		this.isGroup = isGroup || false;
		this.isOptional = isOptional || false;
		this.isQuantifier = isQuantifier || false;
		this.isAlternator = isAlternator || false;
		this.quantifier = {
			min: 1,
			max: 1
		};
	}

	Inputmask.analyseMask = function (mask, opts) {
		function consolidateAlternateTokens(matches) {
			var consolidatedTokens = [];
			$.each(matches, function (ndx, maskToken) {
				if (maskToken.isAlternator) {
					var cleanupNdx = [];
					$.each(maskToken.matches, function (ndx, childToken) {
						if (childToken && childToken.matches) {
							if (childToken.matches.length > 0) {
								if (consolidatedTokens[childToken.matches[0].nativeDef] === undefined && childToken.matches && !childToken.isGroup && !childToken.isOptional && !childToken.isQuantifier && !childToken.isAlternator) {
									consolidatedTokens[childToken.matches[0].nativeDef] = new MaskToken(false, false, false, true);
									var alternateToken = consolidatedTokens[childToken.matches[0].nativeDef];
									var token = new MaskToken();
									token.matches = childToken.matches.slice(1);
									alternateToken.matches.push(token);
									childToken.matches.splice(1, token.matches.length, alternateToken);
								}
								else {
									cleanupNdx.push(ndx);
									var alternateToken = consolidatedTokens[childToken.matches[0].nativeDef];
									var token = new MaskToken();
									token.matches = childToken.matches.slice(1);
									alternateToken.matches.push(token);
								}
							} else {
								maskToken.matches.splice(ndx, 1);
							}
						}
					});
					maskToken.matches = $.map(maskToken.matches, function (match, ndx) {
						if (cleanupNdx.indexOf(ndx) === -1) return match;
					});
				}
				if (maskToken.matches) {
					if (maskToken.matches.length === 1) //remove unnecessary nesting
						matches[ndx] = maskToken.matches[0];
					else if (maskToken.matches.length > 1) {
						var prevMatch;
						$.each(maskToken.matches, function (ndx, match) {
							if (prevMatch) {

							} else prevMatch = match;
						});
					}
				}
				if (matches[ndx].matches) {
					consolidateAlternateTokens(matches[ndx].matches);
				}
			});
		}

		var mt = analyseMaskBase.call(this, mask, opts);
		if (false && opts.phoneCodes) {
			console.time("Optimizing...");
			consolidateAlternateTokens(mt[0].matches);
			if (mt[0].matches && mt[0].matches.length === 1) //remove unnecessary nesting
				mt[0] = mt[0].matches[0];
			console.timeEnd("Optimizing...");
			console.log(JSON.stringify(mt));
		}
		return mt;
	};
	Inputmask.extendAliases({
		"abstractphone": {
			countrycode: "",
			phoneCodes: [],
			mask: function (opts) {
				opts.definitions = {"#": opts.definitions["9"]};
				//do some sorting
				var masks = opts.phoneCodes.sort(function (a, b) {
					var maska = (a.mask || a).replace(/#/g, "9").replace(/[\)]/, "9").replace(/[\+\(\)#-]/g, ""),
						maskb = (b.mask || b).replace(/#/g, "9").replace(/[\)]/, "9").replace(/[\+\(\)#-]/g, ""),
						maskas = (a.mask || a).split("#")[0],
						maskbs = (b.mask || b).split("#")[0];

					return maskbs.indexOf(maskas) === 0 ? -1 : (maskas.indexOf(maskbs) === 0 ? 1 : maska.localeCompare(maskb));
				});
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
			},
			inputmode: "tel",
		}
	});
	return Inputmask;
}));
