/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 -  Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0-dev

Optional extensions on the jquery.inputmask base
*/
(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["inputmask.dependencyLib", "inputmask"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("./inputmask.dependencyLib.jquery"), require("./inputmask"));
		} else {
			factory(window.dependencyLib || jQuery, window.Inputmask);
		}
	}
	(function($, Inputmask) {
		//extra definitions
		Inputmask.extendDefinitions({
			"A": {
				validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
				cardinality: 1,
				casing: "upper" //auto uppercasing
			},
			"&": { //alfanumeric uppercasing
				validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
				cardinality: 1,
				casing: "upper"
			},
			"#": { //hexadecimal
				validator: "[0-9A-Fa-f]",
				cardinality: 1,
				casing: "upper"
			}
		});
		Inputmask.extendAliases({
			"url": {
				definitions: {
					"i": {
						validator: ".",
						cardinality: 1
					}
				},
				mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
				insertMode: false,
				autoUnmask: false
			},
			"ip": { //ip-address mask
				mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
				definitions: {
					"i": {
						validator: function(chrs, maskset, pos, strict, opts) {
							if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
								chrs = maskset.buffer[pos - 1] + chrs;
								if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
									chrs = maskset.buffer[pos - 2] + chrs;
								} else chrs = "0" + chrs;
							} else chrs = "00" + chrs;
							return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
						},
						cardinality: 1
					}
				},
				onUnMask: function(maskedValue, unmaskedValue, opts) {
					return maskedValue;
				}
			},
			"email": {
				mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",
				greedy: false,
				onBeforePaste: function(pastedValue, opts) {
					pastedValue = pastedValue.toLowerCase();
					return pastedValue.replace("mailto:", "");
				},
				definitions: {
					"*": {
						validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
						cardinality: 1,
						casing: "lower"
					}
				},
				onUnMask: function(maskedValue, unmaskedValue, opts) {
					return maskedValue;
				}
			},
			"mac": {
				mask: "##:##:##:##:##:##"
			}
		});
		return Inputmask;
	}));
