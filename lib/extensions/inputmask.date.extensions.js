/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import Inputmask from "../inputmask";
import keyCode from "../keycode.json";
import escapeRegex from "../escapeRegex";
import {seekNext} from "../positioning";
import {getMaskTemplate} from "../validation-tests";

const $ = Inputmask.dependencyLib;

class DateObject {
	constructor(mask, format, opts) {
		this.mask = mask;
		this.format = format;
		this.opts = opts;
		this._date = new Date(1, 0, 1);
		this.initDateObject(mask, this.opts);
	}

	get date() {
		if (this._date === undefined) {
			this._date = new Date(1, 0, 1);
			this.initDateObject(undefined, this.opts);
		}
		return this._date;
	}

	initDateObject(mask, opts) {
		let match;
		getTokenizer(opts).lastIndex = 0;
		while ((match = getTokenizer(opts).exec(this.format))) {
			let dynMatches = new RegExp("\\d+$").exec(match[0]),
				fcode = dynMatches ? (match[0][0] + "x") : match[0],
				value;
			if (mask !== undefined) {
				if (dynMatches) {
					let lastIndex = getTokenizer(opts).lastIndex,
						tokenMatch = getTokenMatch(match.index, opts);
					getTokenizer(opts).lastIndex = lastIndex;
					value = mask.slice(0, mask.indexOf(tokenMatch.nextMatch[0]));
				} else {
					value = mask.slice(0, (formatCode[fcode] && formatCode[fcode][4]) || fcode.length);
				}
				mask = mask.slice(value.length);
			}

			if (Object.prototype.hasOwnProperty.call(formatCode, fcode)) {
				this.setValue(this, value, fcode, formatCode[fcode][2], formatCode[fcode][1]);
			}
		}
	}

	setValue(dateObj, value, fcode, targetProp, dateOperation) {
		if (value !== undefined) {
			dateObj[targetProp] = targetProp === "ampm" ? value : value.replace(/[^0-9]/g, "0");
			dateObj["raw" + targetProp] = value.replace(/\s/g, "_");
		}
		if (dateOperation !== undefined) {
			let datavalue = dateObj[targetProp];
			if ((targetProp === "day" && parseInt(datavalue) === 29) || (targetProp === "month" && parseInt(datavalue) === 2)) {
				if (parseInt(dateObj.day) === 29 && parseInt(dateObj.month) === 2 && (dateObj.year === "" || dateObj.year === undefined)) {
					//set temporary leap year in dateObj
					dateObj._date.setFullYear(2012, 1, 29);
				}
			}
			if (targetProp === "day") {
				useDateObject = true;
				if (parseInt(datavalue) === 0)
					datavalue = 1;
			}
			if (targetProp === "month")
				useDateObject = true;
			if (targetProp === "year") {
				useDateObject = true;
				if (datavalue.length < 4)
					datavalue = pad(datavalue, 4, true);
			}
			if (datavalue !== "" && !isNaN(datavalue)) dateOperation.call(dateObj._date, datavalue);
			if (targetProp === "ampm")
				dateOperation.call(dateObj._date, datavalue);
		}
	}

	reset() {
		this._date = new Date(1, 0, 1);
	}

	reInit() {
		this._date = undefined;
		this.date;
	}
}

let currentYear = new Date().getFullYear(),
	useDateObject = false,
	//supported codes for formatting
	//http://blog.stevenlevithan.com/archives/date-time-format
	//https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7
	formatCode = { //regex, valueSetter, type, displayformatter, #entries (optional)
		d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate], //Day of the month as digits; no leading zero for single-digit days.
		dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
			return pad(Date.prototype.getDate.call(this), 2);
		}], //Day of the month as digits; leading zero for single-digit days.
		ddd: [""], //Day of the week as a three-letter abbreviation.
		dddd: [""], //Day of the week as its full name.
		m: ["[1-9]|1[012]", function (val) {
			let mval = val ? parseInt(val) : 0;
			if (mval > 0) mval--;
			return Date.prototype.setMonth.call(this, mval);
		}, "month", function () {
			return Date.prototype.getMonth.call(this) + 1;
		}], //Month as digits; no leading zero for single-digit months.
		mm: ["0[1-9]|1[012]", function (val) {
			let mval = val ? parseInt(val) : 0;
			if (mval > 0) mval--;
			return Date.prototype.setMonth.call(this, mval);
		}, "month", function () {
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
		}, 3], //Milliseconds. 3 digits.
		L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
			return pad(Date.prototype.getMilliseconds.call(this), 2);
		}, 2], //Milliseconds. 2 digits.
		t: ["[ap]", setAMPM, "ampm", getAMPM, 1], //Lowercase, single-character time marker string: a or p.
		tt: ["[ap]m", setAMPM, "ampm", getAMPM, 2], //two-character time marker string: am or pm.
		T: ["[AP]", setAMPM, "ampm", getAMPM, 1], //single-character time marker string: A or P.
		TT: ["[AP]M", setAMPM, "ampm", getAMPM, 2], //two-character time marker string: AM or PM.
		Z: [".*", undefined, "Z", getTimeZoneAbbreviated], //US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
		o: [""], //GMT/UTC timezone offset, e.g. -0500 or +0230.
		S: [""] //The date's ordinal suffix (st, nd, rd, or th).
	},
	formatAlias = {
		isoDate: "yyyy-mm-dd", //2007-06-09
		isoTime: "HH:MM:ss", //17:46:21
		isoDateTime: "yyyy-mm-dd'T'HH:MM:ss", //2007-06-09T17:46:21
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'" //2007-06-09T22:46:21Z
	};

function setAMPM(value) {
	const hours = this.getHours();
	if (value.toLowerCase().includes("p")) {
		this.setHours(hours + 12);
		// console.log("setAMPM + 12");
	} else if (value.toLowerCase().includes("a") && hours >= 12) {
		this.setHours(hours - 12);
	}
}

function getAMPM() {
	let date = this,
		hours = date.getHours();
	hours = hours || 12;
	return hours >= 12 ? "PM" : "AM";
}

function getTimeZoneAbbreviated() {
	//not perfect, but ok for now
	let date = this, {1: tz} = date.toString().match(/\((.+)\)/);
	if (tz.includes(" ")) {
		tz = tz.replace("-", " ").toUpperCase();
		tz = tz.split(" ").map(([first]) => first).join("");
	}
	return tz;
}

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

function prefillYear(dateParts, currentResult, opts) {
	if (dateParts.year !== dateParts.rawyear) {
		var crrntyear = currentYear.toString(),
			enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""),
			currentYearPart = crrntyear.slice(0, enteredPart.length),
			currentYearNextPart = crrntyear.slice(enteredPart.length);
		if (enteredPart.length === 2 && enteredPart === currentYearPart) {
			const entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
			if (dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime())) {
				//update dateParts
				dateParts.date.setFullYear(currentYear);
				dateParts.year = crrntyear;
				//update result
				currentResult.insert = [{
					pos: currentResult.pos + 1,
					c: currentYearNextPart[0]
				}, {
					pos: currentResult.pos + 2,
					c: currentYearNextPart[1]
				}];
			}
		}
	}

	return currentResult;
}

function isValidDate(dateParts, currentResult, opts) {
	if (!useDateObject) return true;
	if (dateParts.rawday === undefined
		|| (!isFinite(dateParts.rawday) && new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day)
		|| (dateParts.day == "29" && (!isFinite(dateParts.rawyear) || dateParts.rawyear === undefined || dateParts.rawyear === ""))
		|| new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) {
		return currentResult;
	} else { //take corrective action if possible
		if (dateParts.day == "29") {
			var tokenMatch = getTokenMatch(currentResult.pos, opts);
			if (tokenMatch.targetMatch[0] === "yyyy" && currentResult.pos - tokenMatch.targetMatchIndex === 2) {
				currentResult.remove = currentResult.pos + 1;
				return currentResult;
			}
		} else if (dateParts.month == "02" && dateParts.day == "30" && currentResult.c !== undefined) {
			dateParts.day = "03";
			dateParts.date.setDate(3);
			dateParts.date.setMonth(1);
			currentResult.insert = [{pos: currentResult.pos, c: "0"}, {pos: currentResult.pos + 1, c: currentResult.c}];
			currentResult.caret = seekNext.call(this, currentResult.pos + 1);
			return currentResult;
		}
		return false;
	}
}

function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
	if (!result) return result;
	if (result && opts.min) {
		if (/*useDateObject && (dateParts["year"] === undefined || dateParts["yearSet"]) && */!isNaN(opts.min.date.getTime())) {
			let match;
			dateParts.reset();
			getTokenizer(opts).lastIndex = 0;
			while ((match = getTokenizer(opts).exec(opts.inputFormat))) {
				var fcode;
				if ((fcode = formatcode(match))) {
					if (fcode[3]) {
						var setFn = fcode[1];
						var current = dateParts[fcode[2]],
							minVal = opts.min[fcode[2]],
							maxVal = opts.max ? opts.max[fcode[2]] : minVal,
							curVal = [];

						let forceCurrentValue = false;
						for (let i = 0; i < minVal.length; i++) {
							if (maskset.validPositions[i + match.index] === undefined && !forceCurrentValue) {
								curVal[i] = minVal[i];
								// ADD +1 to whoile
								if (fcode[2] === "year" && current.length - 1 == i && minVal != maxVal)
									curVal = (parseInt(curVal.join("")) + 1).toString().split("");
								if (fcode[2] === "ampm" && minVal != maxVal && opts.min.date.getTime() > dateParts.date.getTime())
									curVal[i] = maxVal[i];
							} else {
								curVal[i] = current[i];
								forceCurrentValue = forceCurrentValue || current[i] > minVal[i];
							}
						}

						setFn.call(dateParts._date, curVal.join(""));
					}
				}
			}

			result = opts.min.date.getTime() <= dateParts.date.getTime();
			dateParts.reInit();
		}
	}

	if (result && opts.max) {
		if (!isNaN(opts.max.date.getTime())) {
			result = opts.max.date.getTime() >= dateParts.date.getTime();
		}
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
						mask += escapeRegex(match[0]);
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
function pad(val, len, right) {
	val = String(val);
	len = len || 2;
	while (val.length < len) val = right ? val + "0" : "0" + val;
	return val;
}

function analyseMask(mask, format, opts) {
	if (typeof mask === "string") {
		return new DateObject(mask, format, opts);
	} else if (mask && typeof mask === "object" && Object.prototype.hasOwnProperty.call(mask, "date")) {
		return mask;
	}
	return undefined;
}

function importDate(dateObj, opts) {
	return parse(opts.inputFormat, {date: dateObj}, opts);
}

function getTokenMatch(pos, opts) {
	var calcPos = 0, targetMatch, match, matchLength = 0;
	getTokenizer(opts).lastIndex = 0;
	while ((match = getTokenizer(opts).exec(opts.inputFormat))) {
		var dynMatches = new RegExp("\\d+$").exec(match[0]);
		matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length;
		calcPos += matchLength;
		if (calcPos >= pos + 1) {
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
		displayFormat: null, //visual format when the input looses focus
		outputFormat: null, //unmasking format
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
		postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
			const inputmask = this;

			if (strict) return true;
			var tokenMatch, validator;
			if (currentResult === false) { //try some shifting
				tokenMatch = getTokenMatch(pos + 1, opts);
				if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && tokenMatch.targetMatch[0].length > 1 && formatCode[tokenMatch.targetMatch[0]] !== undefined) {
					validator = formatCode[tokenMatch.targetMatch[0]][0];
				} else {
					tokenMatch = getTokenMatch(pos + 2, opts);
					if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos + 1 && tokenMatch.targetMatch[0].length > 1 && formatCode[tokenMatch.targetMatch[0]] !== undefined) {
						validator = formatCode[tokenMatch.targetMatch[0]][0];
					}
				}
				if (validator !== undefined) {
					if (maskset.validPositions[pos + 1] !== undefined && new RegExp(validator).test(c + "0")) {
						buffer[pos] = c;
						buffer[pos + 1] = "0";
						currentResult = {
							//insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
							pos: pos + 2, //this will triggeer a refreshfrombuffer
							caret: pos
						};
					} else if (new RegExp(validator).test("0" + c)) {
						buffer[pos] = "0";
						buffer[pos + 1] = c;
						currentResult = {
							//insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
							pos: pos + 2 //this will triggeer a refreshfrombuffer
						};
					}
				}

				if (currentResult === false) return currentResult;
			}

			if (currentResult.fuzzy) {
				buffer = currentResult.buffer;
				pos = currentResult.pos;
			}

			//full validate target
			tokenMatch = getTokenMatch(pos, opts);
			if (tokenMatch.targetMatch && tokenMatch.targetMatch[0] && formatCode[tokenMatch.targetMatch[0]] !== undefined) {
				let fcode = formatCode[tokenMatch.targetMatch[0]];
				validator = fcode[0];
				var part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
				if (new RegExp(validator).test(part.join("")) === false && tokenMatch.targetMatch[0].length === 2 && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1]) {
					maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0";
				}
				if (fcode[2] == "year") {
					var _buffer = getMaskTemplate.call(inputmask, false, 1, undefined, true);
					for (let i = pos + 1; i < buffer.length; i++) {
						buffer[i] = _buffer[i];
						delete maskset.validPositions[i];
					}
				}
			}

			var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
			if (result && !isNaN(dateParts.date.getTime())) { //check for a valid date ~ an invalid date returns NaN which isn't equal
				if (opts.prefillYear) result = prefillYear(dateParts, result, opts);
				result = isValidDate.call(inputmask, dateParts, result, opts);
				result = isDateInRange(dateParts, result, opts, maskset, fromCheckval);
			}

			if (pos !== undefined && result && currentResult.pos !== pos) {
				return {
					buffer: parse(opts.inputFormat, dateParts, opts).split(""),
					refreshFromBuffer: {start: pos, end: currentResult.pos},
					pos: currentResult.caret || currentResult.pos //correct caret position
				};
			}

			return result;
		},
		onKeyDown: function (e, buffer, caretPos, opts) {
			var input = this;
			if (e.ctrlKey && e.keyCode === keyCode.RIGHT) {
				input.inputmask._valueSet(importDate(new Date(), opts));
				$(input).trigger("setvalue");
			}
		},
		onUnMask: function (maskedValue, unmaskedValue, opts) {
			return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, true) : unmaskedValue;
		},
		casing: function (elem, test, pos, validPositions) {
			if (test.nativeDef.indexOf("[ap]") == 0) return elem.toLowerCase();
			if (test.nativeDef.indexOf("[AP]") == 0) return elem.toUpperCase();
			return elem;
		},
		onBeforeMask: function (initialValue, opts) {
			if (Object.prototype.toString.call(initialValue) === "[object Date]") {
				initialValue = importDate(initialValue, opts);
			}

			return initialValue;
		},
		insertMode: false,
		shiftPositions: false,
		keepStatic: false,
		inputmode: "numeric",
		prefillYear: true //Allows to disable prefill for datetime year.
	}
});
