/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
var Inputmask = require("../inputmask"), $ = Inputmask.dependencyLib,
	keyCode = require("../keycode"),
	//supported codes for formatting
	//http://blog.stevenlevithan.com/archives/date-time-format
	//https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7
	formatCode = { //regex, valueSetter, type, displayformatter
		d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate], //Day of the month as digits; no leading zero for single-digit days.
		dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
			return pad(Date.prototype.getDate.call(this), 2);
		}], //Day of the month as digits; leading zero for single-digit days.
		ddd: [""], //Day of the week as a three-letter abbreviation.
		dddd: [""], //Day of the week as its full name.
		m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
			return Date.prototype.getMonth.call(this) + 1;
		}], //Month as digits; no leading zero for single-digit months.
		mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
			return pad(Date.prototype.getMonth.call(this) + 1, 2);
		}], //Month as digits; leading zero for single-digit months.
		mmm: [""], //Month as a three-letter abbreviation.
		mmmm: [""], //Month as its full name.
		yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
			return pad(Date.prototype.getFullYear.call(this), 2);
		}], //Year as last two digits; leading zero for years less than 10.
		yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
			return pad(Date.prototype.getFullYear.call(this), 4);
		}],
		h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours], //Hours; no leading zero for single-digit hours (12-hour clock).
		hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
			return pad(Date.prototype.getHours.call(this), 2);
		}], //Hours; leading zero for single-digit hours (12-hour clock).
		hx: [function (x) {
			return `[0-9]{${x}}`;
		}, Date.prototype.setHours, "hours", function (x) {
			return Date.prototype.getHours;
		}], //Hours; no limit; set maximum digits
		H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours], //Hours; no leading zero for single-digit hours (24-hour clock).
		HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
			return pad(Date.prototype.getHours.call(this), 2);
		}], //Hours; leading zero for single-digit hours (24-hour clock).
		Hx: [function (x) {
			return `[0-9]{${x}}`;
		}, Date.prototype.setHours, "hours", function (x) {
			return function () {
				return pad(Date.prototype.getHours.call(this), x);
			};
		}], //Hours; no limit; set maximum digits
		M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes], //Minutes; no leading zero for single-digit minutes. Uppercase M unlike CF timeFormat's m to avoid conflict with months.
		MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
			return pad(Date.prototype.getMinutes.call(this), 2);
		}], //Minutes; leading zero for single-digit minutes. Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
		s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds], //Seconds; no leading zero for single-digit seconds.
		ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
			return pad(Date.prototype.getSeconds.call(this), 2);
		}], //Seconds; leading zero for single-digit seconds.
		l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
			return pad(Date.prototype.getMilliseconds.call(this), 3);
		}], //Milliseconds. 3 digits.
		L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
			return pad(Date.prototype.getMilliseconds.call(this), 2);
		}], //Milliseconds. 2 digits.
		t: ["[ap]"], //Lowercase, single-character time marker string: a or p.
		tt: ["[ap]m"], //two-character time marker string: am or pm.
		T: ["[AP]"], //single-character time marker string: A or P.
		TT: ["[AP]M"], //two-character time marker string: AM or PM.
		Z: [""], //US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
		o: [""], //GMT/UTC timezone offset, e.g. -0500 or +0230.
		S: [""] //The date's ordinal suffix (st, nd, rd, or th).
	},
	formatAlias = {
		isoDate: "yyyy-mm-dd", //2007-06-09
		isoTime: "HH:MM:ss", //17:46:21
		isoDateTime: "yyyy-mm-dd'T'HH:MM:ss", //2007-06-09T17:46:21
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'" //2007-06-09T22:46:21Z
	};

function formatcode(match) {
	var dynMatches = new RegExp("\\d+$").exec(match[0]);
	if (dynMatches && dynMatches[0] !== undefined) {
		var fcode = formatCode[match[0][0] + "x"].slice("");
		fcode[0] = fcode[0](dynMatches[0]);
		fcode[3] = fcode[3](dynMatches[0]);

		return fcode;
	} else if (formatCode[match[0]]) {
		return formatCode[match[0]];
	}
}

function getTokenizer(opts) {
	if (!opts.tokenizer) {
		var tokens = [], dyntokens = [];
		for (var ndx in formatCode) {
			if (/\.*x$/.test(ndx)) {
				var dynToken = ndx[0] + "\\d+";
				if (dyntokens.indexOf(dynToken) === -1) {
					dyntokens.push(dynToken);
				}
			} else if (tokens.indexOf(ndx[0]) === -1) {
				tokens.push(ndx[0]);
			}
		}
		opts.tokenizer = "(" + (dyntokens.length > 0 ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.";
		opts.tokenizer = new RegExp(opts.tokenizer, "g");
	}

	return opts.tokenizer;
}

function isValidDate(dateParts, currentResult) {
	return !isFinite(dateParts.rawday)
	|| (dateParts.day == "29" && !isFinite(dateParts.rawyear))
	|| new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day
		? currentResult
		: false; //take corrective action if possible
}

function isDateInRange(dateParts, opts) {
	var result = true;
	if (opts.min) {
		if (dateParts["rawyear"]) {
			var rawYear = dateParts["rawyear"].replace(/[^0-9]/g, ""),
				minYear = opts.min.year.substr(0, rawYear.length);
			result = minYear <= rawYear;
		}
		if (dateParts["year"] === dateParts["rawyear"]) {
			if (opts.min.date.getTime() === opts.min.date.getTime()) {
				result = opts.min.date.getTime() <= dateParts.date.getTime();
			}
		}
	}

	if (result && opts.max && opts.max.date.getTime() === opts.max.date.getTime()) {
		result = opts.max.date.getTime() >= dateParts.date.getTime();
	}
	return result;
}

//parse the given format and return a mask pattern
//when a dateObjValue is passed a datestring in the requested format is returned
function parse(format, dateObjValue, opts, raw) {
	//parse format to regex string
	var mask = "", match, fcode;
	getTokenizer(opts).lastIndex = 0;
	while ((match = getTokenizer(opts).exec(format))) {
		if (dateObjValue === undefined) {
			if ((fcode = formatcode(match))) {
				mask += "(" + fcode[0] + ")";
			} else {
				switch (match[0]) {
					case "[":
						mask += "(";
						break;
					case "]":
						mask += ")?";
						break;
					default:
						mask += Inputmask.escapeRegex(match[0]);
				}
			}
		} else {
			if ((fcode = formatcode(match))) {
				if (raw !== true && fcode[3]) {
					var getFn = fcode[3];
					mask += getFn.call(dateObjValue.date);
				} else if (fcode[2]) {
					mask += dateObjValue["raw" + fcode[2]];
				} else {
					mask += match[0];
				}
			} else {
				mask += match[0];
			}
		}
	}
	return mask;
}

//padding function
function pad(val, len) {
	val = String(val);
	len = len || 2;
	while (val.length < len) val = "0" + val;
	return val;
}

function analyseMask(maskString, format, opts) {
	var dateObj = {"date": new Date(1, 0, 1)}, targetProp, mask = maskString, match, dateOperation;

	function extendProperty(value) {
		var correctedValue = value.replace(/[^0-9]/g, "0");
		// if (correctedValue != value) { //only do correction on incomplete values
		//     //determine best validation match
		//     var enteredPart = value.replace(/[^0-9]/g, ""),
		//         enteredPartIndex = value.indexOf(enteredPart),
		//         minPart = (opts.min && opts.min[targetProp] || value).slice(enteredPartIndex, enteredPartIndex + enteredPart.length),
		//         maxPart = (opts.max && opts.max[targetProp] || value).slice(enteredPartIndex, enteredPartIndex + enteredPart.length),
		//         correctedPart = enteredPart < minPart ? minPart : (enteredPart > maxPart ? maxPart : correctedValue.slice(enteredPartIndex, enteredPartIndex + enteredPart.length));
		//     correctedValue = correctedValue.split("");
		//     correctedValue.splice(enteredPartIndex, 1, correctedPart);
		//     correctedValue = correctedValue.join("");
		// }
		return correctedValue;
	}

	function setValue(dateObj, value, opts) {
		dateObj[targetProp] = extendProperty(value);
		dateObj["raw" + targetProp] = value;

		if (dateOperation !== undefined) {
			dateOperation.call(dateObj.date, targetProp == "month" ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
		}
	}

	if (typeof mask === "string") {
		getTokenizer(opts).lastIndex = 0;
		while ((match = getTokenizer(opts).exec(format))) {
			var value = mask.slice(0, match[0].length);
			if (formatCode.hasOwnProperty(match[0])) {
				// targetValidator = formatCode[match[0]][0];
				targetProp = formatCode[match[0]][2];
				dateOperation = formatCode[match[0]][1];
				setValue(dateObj, value, opts);
			}
			mask = mask.slice(value.length);
		}

		return dateObj;
	} else if (mask && typeof mask === "object" && mask.hasOwnProperty("date")) {
		return mask;
	}
	return undefined;
}

function importDate(dateObj, opts) {
	var match, date = "";

	getTokenizer(opts).lastIndex = 0;
	while ((match = getTokenizer(opts).exec(opts.inputFormat))) {
		if (match[0].charAt(0) === "d") {
			date += pad(dateObj.getDate(), match[0].length);
		} else if (match[0].charAt(0) === "m") {
			date += pad((dateObj.getMonth() + 1), match[0].length);
		} else if (match[0] === "yyyy") {
			date += dateObj.getFullYear().toString();
		} else if (match[0].charAt(0) === "y") {
			date += pad(dateObj.getYear(), match[0].length);
		}
	}

	return date;
}

function getTokenMatch(pos, opts) {
	var calcPos = 0, targetMatch, match, matchLength = 0;
	getTokenizer(opts).lastIndex = 0;
	while ((match = getTokenizer(opts).exec(opts.inputFormat))) {
		var dynMatches = new RegExp("\\d+$").exec(match[0]);
		matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length;
		calcPos += matchLength;
		if (calcPos >= pos) {
			targetMatch = match;
			match = getTokenizer(opts).exec(opts.inputFormat);
			break;
		}
	}
	return {
		targetMatchIndex: calcPos - matchLength,
		nextMatch: match,
		targetMatch: targetMatch
	};
}


Inputmask.extendAliases({
	"datetime": {
		mask: function (opts) {
			//do not allow numeric input in datetime alias
			opts.numericInput = false;

			//localize
			formatCode.S = opts.i18n.ordinalSuffix.join("|");

			opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat; //resolve possible formatAlias
			opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat; //resolve possible formatAlias
			opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat; //resolve possible formatAlias
			opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, "");
			opts.regex = parse(opts.inputFormat, undefined, opts);
			opts.min = analyseMask(opts.min, opts.inputFormat, opts);
			opts.max = analyseMask(opts.max, opts.inputFormat, opts);
			return null; //migrate to regex mask
		},
		placeholder: "", //set default as none (~ auto); when a custom placeholder is passed it will be used
		inputFormat: "isoDateTime", //format used to input the date
		displayFormat: undefined, //visual format when the input looses focus
		outputFormat: undefined, //unmasking format
		min: null, //needs to be in the same format as the inputfornat
		max: null, //needs to be in the same format as the inputfornat,
		skipOptionalPartCharacter: "",
		// Internationalization strings
		i18n: {
			dayNames: [
				"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
				"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			],
			ordinalSuffix: ["st", "nd", "rd", "th"]
		},
		preValidation: function (buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
			if (strict) return true;
			if (isNaN(c) && buffer[pos] !== c) {
				var tokenMatch = getTokenMatch(pos, opts);
				if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && tokenMatch.targetMatch[0].length > 1) {
					var validator = formatCode[tokenMatch.targetMatch[0]][0];
					if (new RegExp(validator).test("0" + buffer[pos - 1])) {
						buffer[pos] = buffer[pos - 1];
						buffer[pos - 1] = "0";
						return {
							fuzzy: true,
							buffer: buffer,
							refreshFromBuffer: {start: pos - 1, end: pos + 1},
							pos: pos + 1
						};
					}
				}
			}
			return true;
		},
		postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict) {
			if (strict) return true;
			var tokenMatch, validator;
			if (currentResult === false) {
				tokenMatch = getTokenMatch(pos + 1, opts);
				if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && tokenMatch.targetMatch[0].length > 1 && formatCode[tokenMatch.targetMatch[0]] !== undefined) {
					validator = formatCode[tokenMatch.targetMatch[0]][0];
					if (new RegExp(validator).test("0" + c)) {
						return {
							insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
							pos: pos + 1
						};
					}
				}
				return currentResult;
			}

			if (currentResult.fuzzy) {
				buffer = currentResult.buffer;
				pos = currentResult.pos;
			}

			//full validate target
			tokenMatch = getTokenMatch(pos, opts);
			if (tokenMatch.targetMatch && tokenMatch.targetMatch[0] && formatCode[tokenMatch.targetMatch[0]] !== undefined) {
				validator = formatCode[tokenMatch.targetMatch[0]][0];
				var part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
				if (new RegExp(validator).test(part.join("")) === false && tokenMatch.targetMatch[0].length === 2 && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1]) {
					maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0";
				}
			}

			var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
			if (result && dateParts.date.getTime() === dateParts.date.getTime()) { //check for a valid date ~ an invalid date returns NaN which isn't equal
				result = isValidDate(dateParts, result);
				result = result && isDateInRange(dateParts, opts);
			}

			if (pos && result && currentResult.pos !== pos) {
				return {
					buffer: parse(opts.inputFormat, dateParts, opts).split(""),
					refreshFromBuffer: {start: pos, end: currentResult.pos}
				};
			}

			return result;
		}
		,
		onKeyDown: function (e, buffer, caretPos, opts) {
			var input = this;
			if (e.ctrlKey && e.keyCode === keyCode.RIGHT) {
				input.inputmask._valueSet(importDate(new Date(), opts));
				$(input).trigger("setvalue");
			}
		}
		,
		onUnMask: function (maskedValue, unmaskedValue, opts) {
			return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, true) : unmaskedValue;
		}
		,
		casing: function (elem, test, pos, validPositions) {
			if (test.nativeDef.indexOf("[ap]") == 0) return elem.toLowerCase();
			if (test.nativeDef.indexOf("[AP]") == 0) return elem.toUpperCase();
			return elem;
		}
		,
		onBeforeMask: function (initialValue, opts) {
			if (Object.prototype.toString.call(initialValue) === "[object Date]") {
				initialValue = importDate(initialValue, opts);
			}

			return initialValue;
		}
		,
		insertMode: false,
		shiftPositions:
			false,
		keepStatic:
			false,
		inputmode:
			"numeric"
	}
});

module.exports = Inputmask;
