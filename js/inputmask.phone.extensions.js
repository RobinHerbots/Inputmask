/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 -  Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0-dev

Phone extension.
When using this extension make sure you specify the correct url to get the masks

 $(selector).inputmask("phone", {
                url: "Scripts/jquery.inputmask/phone-codes/phone-codes.json",
                onKeyValidation: function () { //show some metadata in the console
                    console.log($(this).inputmask("getmetadata")["cd"]);
                }
  });


*/
(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["jquery", "inputmask"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("jquery"), require("./inputmask"));
		} else {
			factory(window.dependencyLib || jQuery, window.Inputmask);
		}
	}
	(function($, Inputmask) {
		Inputmask.extendAliases({
			"phone": {
				url: "phone-codes/phone-codes.js",
				countrycode: "",
				mask: function(opts) {
					opts.definitions["#"] = opts.definitions["9"];
					var maskList = [];
					$.ajax({
						url: opts.url,
						async: false,
						dataType: "json",
						success: function(response) {
							maskList = response;
						},
						error: function(xhr, ajaxOptions, thrownError) {
							alert(thrownError + " - " + opts.url);
						}
					});

					maskList = maskList.sort(function(a, b) {
						return (a.mask || a) < (b.mask || b) ? -1 : 1;
					});

					return maskList;
				},
				keepStatic: false,
				nojumps: true,
				nojumpsThreshold: 1,
				onBeforeMask: function(value, opts) {
					var processedValue = value.replace(/^0/g, "");
					if (processedValue.indexOf(opts.countrycode) > 1 || processedValue.indexOf(opts.countrycode) === -1) {
						processedValue = "+" + opts.countrycode + processedValue;
					}

					return processedValue;
				}
			},
			"phonebe": {
				alias: "phone",
				url: "phone-codes/phone-be.js",
				countrycode: "32",
				nojumpsThreshold: 4
			}
		});
		return Inputmask;
	}));
