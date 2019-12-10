/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
var Inputmask = require("../inputmask");
//extra definitions
Inputmask.extendDefinitions({
	"A": {
		validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
		casing: "upper" //auto uppercasing
	},
	"&": { //alfanumeric uppercasing
		validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
		casing: "upper"
	},
	"#": { //hexadecimal
		validator: "[0-9A-Fa-f]",
		casing: "upper"
	}
});

var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
function ipValidator(chrs, maskset, pos, strict, opts) {
	if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
		chrs = maskset.buffer[pos - 1] + chrs;
		if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
			chrs = maskset.buffer[pos - 2] + chrs;
		} else chrs = "0" + chrs;
	} else chrs = "00" + chrs;
	return ipValidatorRegex.test(chrs);
}


Inputmask.extendAliases({
	"cssunit": {
		regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
	},
	"url": { //needs update => https://en.wikipedia.org/wiki/URL
		regex: "(https?|ftp)//.*",
		autoUnmask: false
	},
	"ip": { //ip-address mask
		mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
		definitions: {
			"i": {
				validator: ipValidator
			},
			"j": {
				validator: ipValidator
			},
			"k": {
				validator: ipValidator
			},
			"l": {
				validator: ipValidator
			}
		},
		onUnMask: function (maskedValue, unmaskedValue, opts) {
			return maskedValue;
		},
		inputmode: "numeric",
	},
	"email": {
		//https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
		//https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
		//should be extended with the toplevel domains at the end
		mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
		greedy: false,
		casing: "lower",
		onBeforePaste: function (pastedValue, opts) {
			pastedValue = pastedValue.toLowerCase();
			return pastedValue.replace("mailto:", "");
		},
		definitions: {
			"*": {
				validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5!#$%&'*+/=?^_`{|}~-]"
			},
			"-": {
				validator: "[0-9A-Za-z-]"
			}
		},
		onUnMask: function (maskedValue, unmaskedValue, opts) {
			return maskedValue;
		},
		inputmode: "email"
	},
	"mac": {
		mask: "##:##:##:##:##:##"
	},
	//https://en.wikipedia.org/wiki/Vehicle_identification_number
	// see issue #1199
	"vin": {
		mask: "V{13}9{4}",
		definitions: {
			"V": {
				validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
				casing: "upper"
			}
		},
		clearIncomplete: true,
		autoUnmask: true
	},
	//http://rion.io/2013/09/10/validating-social-security-numbers-through-regular-expressions-2/
	//https://en.wikipedia.org/wiki/Social_Security_number
	"ssn": {
		mask: "999-99-9999",
		postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict) {
			return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(buffer.join(""));
		}
	},
});
module.exports = Inputmask;
