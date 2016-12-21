/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 - Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 0.0.0-dev

 Optional extensions on the jquery.inputmask base
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
	//number aliases
	Inputmask.extendAliases({
		"numeric": {
			mask: function (opts) {
				function autoEscape(txt) {
					var escapedTxt = "";
					for (var i = 0; i < txt.length; i++) {
						if (opts.definitions[txt.charAt(i)] ||
							opts.optionalmarker.start === txt.charAt(i) ||
							opts.optionalmarker.end === txt.charAt(i) ||
							opts.quantifiermarker.start === txt.charAt(i) ||
							opts.quantifiermarker.end === txt.charAt(i) ||
							opts.groupmarker.start === txt.charAt(i) ||
							opts.groupmarker.end === txt.charAt(i) ||
							opts.alternatormarker === txt.charAt(i))
							escapedTxt += "\\" + txt.charAt(i)
						else escapedTxt += txt.charAt(i);
					}
					return escapedTxt;
				}

				if (opts.repeat !== 0 && isNaN(opts.integerDigits)) {
					opts.integerDigits = opts.repeat;
				}
				opts.repeat = 0;
				if (opts.groupSeparator === opts.radixPoint) { //treat equal separator and radixpoint
					if (opts.radixPoint === ".") {
						opts.groupSeparator = ",";
					} else if (opts.radixPoint === ",") {
						opts.groupSeparator = ".";
					} else opts.groupSeparator = "";
				}
				if (opts.groupSeparator === " ") { //prevent conflict with default skipOptionalPartCharacter
					opts.skipOptionalPartCharacter = undefined;
				}
				opts.autoGroup = opts.autoGroup && opts.groupSeparator !== "";
				if (opts.autoGroup) {
					if (typeof opts.groupSize == "string" && isFinite(opts.groupSize)) opts.groupSize = parseInt(opts.groupSize);
					if (isFinite(opts.integerDigits)) {
						var seps = Math.floor(opts.integerDigits / opts.groupSize);
						var mod = opts.integerDigits % opts.groupSize;
						opts.integerDigits = parseInt(opts.integerDigits) + (mod === 0 ? seps - 1 : seps);
						if (opts.integerDigits < 1) {
							opts.integerDigits = "*";
						}
					}
				}

				//enforce placeholder to single
				if (opts.placeholder.length > 1) {
					opts.placeholder = opts.placeholder.charAt(0);
				}
				//only allow radixfocus when placeholder = 0
				if (opts.positionCaretOnClick === "radixFocus" && (opts.placeholder === "" && opts.integerOptional === false)) {
					opts.positionCaretOnClick = "lvp";
				}
				opts.definitions[";"] = opts.definitions["~"]; //clone integer def for decimals
				opts.definitions[";"].definitionSymbol = "~";

				if (opts.numericInput === true) { //finance people input style
					opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
					opts.digitsOptional = false;
					if (isNaN(opts.digits)) opts.digits = 2;
					opts.decimalProtect = false;
				}

				var mask = "[+]";
				mask += autoEscape(opts.prefix);

				if (opts.integerOptional === true) {
					mask += "~{1," + opts.integerDigits + "}";
				} else mask += "~{" + opts.integerDigits + "}";
				if (opts.digits !== undefined) {
					if (opts.decimalProtect) opts.radixPointDefinitionSymbol = ":";
					var dq = opts.digits.toString().split(",");
					if (isFinite(dq[0] && dq[1] && isFinite(dq[1]))) {
						mask += (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}";
					} else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
						if (opts.digitsOptional) {
							mask += "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{1," + opts.digits + "}]";
						} else mask += (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}";
					}
				}
				mask += autoEscape(opts.suffix);
				mask += "[-]";

				opts.greedy = false; //enforce greedy false

//convert min and max options
				if (opts.min !== null) {
					opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
				}
				if (opts.max !== null) {
					opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
				}

				return mask;
			},
			placeholder: "",
			greedy: false,
			digits: "*", //number of fractionalDigits
			digitsOptional: true,
			radixPoint: ".",
			positionCaretOnClick: "radixFocus",
			groupSize: 3,
			groupSeparator: "",
			autoGroup: false,
			allowPlus: true,
			allowMinus: true,
			negationSymbol: {
				front: "-", //"("
				back: "" //")"
			}
			,
			integerDigits: "+", //number of integerDigits
			integerOptional: true,
			prefix: "",
			suffix: "",
			rightAlign: true,
			decimalProtect: true, //do not allow assumption of decimals input without entering the radixpoint
			min: null, //minimum value
			max: null, //maximum value
			step: 1,
			insertMode: true,
			autoUnmask: false,
			unmaskAsNumber: false,
			inputmode: "numeric",
			postFormat: function (buffer, pos, opts) { //this needs to be removed // this is crap
				// console.log(buffer);
				if (opts.numericInput === true) {
					buffer = buffer.reverse();
					if (isFinite(pos)) {
						pos = buffer.join("").length - pos - 1;
					}
				}
				var i, l;

				//position overflow corrections
				pos = pos >= buffer.length ? buffer.length - 1 : (pos < 0 ? 0 : pos);

				var charAtPos = buffer[pos];

				var cbuf = buffer.slice();
				if (charAtPos === opts.groupSeparator) {
					cbuf.splice(pos--, 1);
					charAtPos = cbuf[pos];
				}

				var isNegative = cbuf.join("").match(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)));
				isNegative = isNegative !== null && isNegative.length === 1;

				if (pos > ((isNegative ? opts.negationSymbol.front.length : 0 ) + opts.prefix.length ) && (pos < (cbuf.length - opts.suffix.length))) {
					//mark current pos
					cbuf[pos] = "!";
				}
				var bufVal = cbuf.join(""), bufValOrigin = cbuf.join(); //join without args to keep the exact elements

				if (isNegative) {
					bufVal = bufVal.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "");
					bufVal = bufVal.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
				}

				bufVal = bufVal.replace(new RegExp(Inputmask.escapeRegex(opts.suffix) + "$"), "");
				bufVal = bufVal.replace(new RegExp("^" + Inputmask.escapeRegex(opts.prefix)), "");
				if (bufVal.length > 0 && opts.autoGroup || bufVal.indexOf(opts.groupSeparator) !== -1) {
					var escapedGroupSeparator = Inputmask.escapeRegex(opts.groupSeparator);
					bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
					var radixSplit = bufVal.split(charAtPos === opts.radixPoint ? "!" : opts.radixPoint);
					bufVal = opts.radixPoint === "" ? bufVal : radixSplit[0];
					if (charAtPos !== opts.negationSymbol.front) bufVal = bufVal.replace("!", "?");
					if (bufVal.length > opts.groupSize) {
						var reg = new RegExp("([-\+]?[\\d\?]+)([\\d\?]{" + opts.groupSize + "})");
						while (reg.test(bufVal) && opts.groupSeparator !== "") {
							bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2");
							bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
						}
					}
					bufVal = bufVal.replace("?", "!");
					if (opts.radixPoint !== "" && radixSplit.length > 1) {
						bufVal += (charAtPos === opts.radixPoint ? "!" : opts.radixPoint) + radixSplit[1];
					}
				}

				bufVal = opts.prefix + bufVal + opts.suffix;
				if (isNegative) {
					bufVal = opts.negationSymbol.front + bufVal + opts.negationSymbol.back;
				}

				var needsRefresh = bufValOrigin !== bufVal.split('').join(),
					newPos = $.inArray("!", bufVal);
				if (newPos === -1) newPos = pos;
				if (needsRefresh) {
					buffer.length = bufVal.length; //align the length
					for (i = 0, l = bufVal.length; i < l; i++) {
						buffer[i] = bufVal.charAt(i);
					}
					buffer[newPos] = charAtPos;
				}

				// console.log("formatted " + buffer + " refresh " + needsRefresh);
				newPos = (opts.numericInput && isFinite(pos)) ? buffer.join("").length - newPos - 1 : newPos;
				if (opts.numericInput) {
					buffer = buffer.reverse();
					if ($.inArray(opts.radixPoint, buffer) < newPos && (buffer.join("").length - opts.suffix.length) !== newPos) {
						newPos = newPos - 1;
					}
				}
				return {
					pos: newPos,
					"refreshFromBuffer": needsRefresh,
					"buffer": buffer,
					isNegative: isNegative
				};
			}
			,
			onBeforeWrite: function (e, buffer, caretPos, opts) {
				var rslt;
				if (e && (e.type === "blur" || e.type === "checkval" || e.type === "keydown")) {
					var maskedValue = opts.numericInput ? buffer.slice().reverse().join("") : buffer.join(""),
						processValue = maskedValue.replace(opts.prefix, "");
					processValue = processValue.replace(opts.suffix, "");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.radixPoint === ",") processValue = processValue.replace(opts.radixPoint, ".");
					//handle negation symbol
					var isNegative = processValue.match(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"));
					isNegative = isNegative !== null && isNegative.length === 1;
					processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
					//strip placeholder at the end
					if (isNaN(opts.placeholder)) {
						processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "");
					}
					processValue = processValue === opts.negationSymbol.front ? processValue + "0" : processValue;

					if (processValue !== "" && isFinite(processValue)) {
						var floatValue = parseFloat(processValue),
							signedFloatValue = isNegative ? floatValue * -1 : floatValue;
						if (opts.min !== null && isFinite(opts.min) && signedFloatValue < parseFloat(opts.min)) {
							floatValue = Math.abs(opts.min);
							isNegative = opts.min < 0;
							maskedValue = undefined;
						}
						else if (opts.max !== null && isFinite(opts.max) && signedFloatValue > parseFloat(opts.max)) {
							floatValue = Math.abs(opts.max);
							isNegative = opts.max < 0;
							maskedValue = undefined;
						}

						processValue = floatValue.toString().replace(".", opts.radixPoint).split('');
						if (isFinite(opts.digits)) {
							var radixPosition = $.inArray(opts.radixPoint, processValue);
							var rpb = $.inArray(opts.radixPoint, maskedValue);
							if (radixPosition === -1) {
								processValue.push(opts.radixPoint);
								radixPosition = processValue.length - 1;
							}
							for (var i = 1; i <= opts.digits; i++) {
								if (!opts.digitsOptional && (processValue[radixPosition + i] === undefined || processValue[radixPosition + i] === opts.placeholder.charAt(0))) {
									processValue[radixPosition + i] = "0";
								} else if (rpb !== -1 && maskedValue[rpb + i] !== undefined) {
									processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i];
								}
							}

							if (processValue[processValue.length - 1] === opts.radixPoint) {
								delete processValue[processValue.length - 1];
							}
						}

						if ((floatValue.toString() !== processValue && floatValue.toString() + "." !== processValue) || isNegative) {
							processValue = (opts.prefix + processValue.join("")).split("");
							if (isNegative && (floatValue !== 0 || e.type !== "blur")) {
								processValue.unshift(opts.negationSymbol.front);
								processValue.push(opts.negationSymbol.back);
							}

							if (opts.numericInput) processValue = processValue.reverse();
							rslt = opts.postFormat(processValue, opts.numericInput ? caretPos : caretPos - 1, opts);
							if (rslt.buffer) rslt.refreshFromBuffer = rslt.buffer.join("") !== buffer.join("");
							return rslt;
						}
					}
				}
				if (opts.autoGroup) {
					rslt = opts.postFormat(buffer, opts.numericInput ? caretPos : (caretPos - 1), opts);
					rslt.caret =
						((caretPos < (rslt.isNegative ? opts.negationSymbol.front.length : 0) + opts.prefix.length) ||
						(caretPos > (rslt.buffer.length - (rslt.isNegative ? opts.negationSymbol.back.length : 0))))
							? rslt.pos : rslt.pos + 1;
					return rslt;
				}
			}
			,
			regex: {
				integerPart: function (opts) {
					return new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "\+]?\\d+");
				}
				,
				integerNPart: function (opts) {
					return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
				}
			}
			,
			signHandler: function (chrs, maskset, pos, strict, opts) {
				if (!strict && (opts.allowMinus && chrs === "-") || (opts.allowPlus && chrs === "+")) {
					var matchRslt = maskset.buffer.join("").match(opts.regex.integerPart(opts));

					if (matchRslt && matchRslt[0].length > 0) {
						if (maskset.buffer[matchRslt.index] === (chrs === "-" ? "+" : opts.negationSymbol.front)) {
							if (chrs === "-") {
								if (opts.negationSymbol.back !== "") {
									return {
										"pos": 0,
										"c": opts.negationSymbol.front,
										"remove": 0,
										"caret": pos,
										"insert": {
											"pos": maskset.buffer.length - 1,
											"c": opts.negationSymbol.back
										}
									};
								} else {
									return {
										"pos": 0,
										"c": opts.negationSymbol.front,
										"remove": 0,
										"caret": pos
									};
								}
							} else {
								if (opts.negationSymbol.back !== "") {
									return {
										"pos": 0,
										"c": "+",
										"remove": [0, maskset.buffer.length - 1],
										"caret": pos
									};
								} else {
									return {
										"pos": 0,
										"c": "+",
										"remove": 0,
										"caret": pos
									};
								}
							}
						} else if (maskset.buffer[0] === (chrs === "-" ? opts.negationSymbol.front : "+")) {
							if (chrs === "-" && opts.negationSymbol.back !== "") {
								return {
									"remove": [0, maskset.buffer.length - 1],
									"caret": pos - 1
								};
							} else {
								return {
									"remove": 0,
									"caret": pos - 1
								};
							}
						} else {
							if (chrs === "-") {
								if (opts.negationSymbol.back !== "") {
									return {
										"pos": 0,
										"c": opts.negationSymbol.front,
										"caret": pos + 1,
										"insert": {
											"pos": maskset.buffer.length,
											"c": opts.negationSymbol.back
										}
									};
								} else {
									return {
										"pos": 0,
										"c": opts.negationSymbol.front,
										"caret": pos + 1
									};
								}
							} else {
								return {
									"pos": 0,
									"c": chrs,
									"caret": pos + 1
								};
							}
						}
					}
				}
				return false;
			}
			,
			radixHandler: function (chrs, maskset, pos, strict, opts) {
				if (!strict && opts.numericInput !== true) {
					//if ($.inArray(chrs, [",", "."]) !== -1) chrs = opts.radixPoint;
					if (chrs === opts.radixPoint && (opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0))) {
						var radixPos = $.inArray(opts.radixPoint, maskset.buffer),
							integerValue = maskset.buffer.join("").match(opts.regex.integerPart(opts));

						if (radixPos !== -1 && maskset.validPositions[radixPos]) {
							if (maskset.validPositions[radixPos - 1]) {
								return {
									"caret": radixPos + 1
								};
							} else {
								return {
									"pos": integerValue.index,
									c: integerValue[0],
									"caret": radixPos + 1
								};
							}
						} else if (!integerValue || (integerValue["0"] === "0" && (integerValue.index + 1) !== pos)) {
							maskset.buffer[integerValue ? integerValue.index : pos] = "0";
							return {
								"pos": (integerValue ? integerValue.index : pos) + 1,
								c: opts.radixPoint
							};
						}
					}
				}
				return false;
			}
			,
			leadingZeroHandler: function (chrs, maskset, pos, strict, opts, isSelection) {
				if (!strict) {
					var buffer = maskset.buffer.slice("");
					buffer.splice(0, opts.prefix.length);
					buffer.splice(buffer.length - opts.suffix.length, opts.suffix.length);
					if (opts.numericInput === true) {
						var buffer = buffer.reverse();
						var bufferChar = buffer[0];
						if (bufferChar === "0" && maskset.validPositions[pos - 1] === undefined) {
							return {
								"pos": pos,
								"remove": buffer.length - 1
							};
						}
					} else {
						pos = pos - opts.prefix.length;
						var radixPosition = $.inArray(opts.radixPoint, buffer),
							matchRslt = buffer.slice(0, radixPosition !== -1 ? radixPosition : undefined).join("").match(opts.regex.integerNPart(opts));
						if (matchRslt && (radixPosition === -1 || pos <= radixPosition)) {
							var decimalPart = radixPosition === -1 ? 0 : parseInt(buffer.slice(radixPosition + 1).join(""));
							if (matchRslt["0"].indexOf(opts.placeholder !== "" ? opts.placeholder.charAt(0) : "0") === 0 &&
								(matchRslt.index + 1 === pos || (isSelection !== true && decimalPart === 0))) {
								maskset.buffer.splice(matchRslt.index + opts.prefix.length, 1);
								return {
									"pos": matchRslt.index + opts.prefix.length,
									"remove": matchRslt.index + opts.prefix.length
								};
							} else if (chrs === "0" && pos <= matchRslt.index && matchRslt["0"] !== opts.groupSeparator) {
								return false;
							}
						}
					}
				}
				return true;
			}
			,
			definitions: {
				"~": {
					validator: function (chrs, maskset, pos, strict, opts, isSelection) {
						var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
						if (!isValid) {
							isValid = opts.radixHandler(chrs, maskset, pos, strict, opts);
							if (!isValid) {
								isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
								if (isValid === true) {
									isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts, isSelection);
									if (isValid === true) {
										//handle overwrite when fixed precision
										var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
										if (radixPosition !== -1 && (opts.digitsOptional === false || maskset.validPositions[pos]) && opts.numericInput !== true && pos > radixPosition && !strict) {
											isValid = {
												"pos": pos,
												"remove": pos
											};
										} else {
											isValid = {
												pos: pos
											};
										}
									}
								}
							}
						}

						return isValid;
					}
					,
					cardinality: 1
				}
				,
				"+": {
					validator: function (chrs, maskset, pos, strict, opts) {
						var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
						if (!isValid && ((strict && opts.allowMinus && chrs === opts.negationSymbol.front) || (opts.allowMinus && chrs === "-") || (opts.allowPlus && chrs === "+"))) {
							if (!strict && chrs === "-") {
								if (opts.negationSymbol.back !== "") {
									isValid = {
										"pos": pos,
										"c": chrs === "-" ? opts.negationSymbol.front : "+",
										"caret": pos + 1,
										"insert": {
											"pos": maskset.buffer.length,
											"c": opts.negationSymbol.back
										}
									};
								} else {
									isValid = {
										"pos": pos,
										"c": chrs === "-" ? opts.negationSymbol.front : "+",
										"caret": pos + 1
									};
								}
							} else {
								isValid = true;
							}
						}
						return isValid;
					}
					,
					cardinality: 1,
					placeholder: ""
				}
				,
				"-": {
					validator: function (chrs, maskset, pos, strict, opts) {
						var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
						if (!isValid && strict && opts.allowMinus && chrs === opts.negationSymbol.back) {
							isValid = true;
						}
						return isValid;
					}
					,
					cardinality: 1,
					placeholder: ""
				}
				,
				":": {
					validator: function (chrs, maskset, pos, strict, opts) {
						var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
						if (!isValid) {
							var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]";
							isValid = new RegExp(radix).test(chrs);
							if (isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint) {
								isValid = {
									"caret": pos + 1
								};
							}
						}
						return isValid;
					}
					,
					cardinality: 1,
					placeholder: function (opts) {
						return opts.radixPoint;
					}
				}
			}
			,
			onUnMask: function (maskedValue, unmaskedValue, opts) {
				if (unmaskedValue === "" && opts.nullable === true) {
					return unmaskedValue;
				}
				var processValue = maskedValue.replace(opts.prefix, "");
				processValue = processValue.replace(opts.suffix, "");
				processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
				if (opts.unmaskAsNumber) {
					if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".");
					return Number(processValue);
				}
				return processValue;
			}
			,
			isComplete: function (buffer, opts) {
				var maskedValue = buffer.join(""),
					bufClone = buffer.slice();
				//verify separator positions
				opts.postFormat(bufClone, 0, opts);
				if (bufClone.join("") !== maskedValue) return false;

				var processValue = maskedValue.replace(opts.prefix, "");
				processValue = processValue.replace(opts.suffix, "");
				processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
				if (opts.radixPoint === ",") processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
				return isFinite(processValue);
			}
			,
			onBeforeMask: function (initialValue, opts) {
				if (opts.numericInput === true) {
					initialValue = initialValue.split("").reverse().join("");
				}
				if (opts.radixPoint !== "" && isFinite(initialValue)) {
					var vs = initialValue.split("."),
						groupSize = opts.groupSeparator !== "" ? parseInt(opts.groupSize) : 0;
					if (vs.length === 2 && (vs[0].length > groupSize || vs[1].length > groupSize))
						initialValue = initialValue.toString().replace(".", opts.radixPoint);
				}
				var kommaMatches = initialValue.match(/,/g);
				var dotMatches = initialValue.match(/\./g);
				if (dotMatches && kommaMatches) {
					if (dotMatches.length > kommaMatches.length) {
						initialValue = initialValue.replace(/\./g, "");
						initialValue = initialValue.replace(",", opts.radixPoint);
					} else if (kommaMatches.length > dotMatches.length) {
						initialValue = initialValue.replace(/,/g, "");
						initialValue = initialValue.replace(".", opts.radixPoint);
					} else { //equal
						initialValue = initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue = initialValue.replace(/,/g, "");
					}
				} else {
					initialValue = initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
				}

				if (opts.digits === 0) {
					if (initialValue.indexOf(".") !== -1) {
						initialValue = initialValue.substring(0, initialValue.indexOf("."));
					} else if (initialValue.indexOf(",") !== -1) {
						initialValue = initialValue.substring(0, initialValue.indexOf(","));
					}
				}

				if (opts.radixPoint !== "" && isFinite(opts.digits) && initialValue.indexOf(opts.radixPoint) !== -1) {
					var valueParts = initialValue.split(opts.radixPoint),
						decPart = valueParts[1].match(new RegExp("\\d*"))[0];
					if (parseInt(opts.digits) < decPart.toString().length) {
						var digitsFactor = Math.pow(10, parseInt(opts.digits));
						//make the initialValue a valid javascript number for the parsefloat
						initialValue = initialValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
						initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor;
						initialValue = initialValue.toString().replace(".", opts.radixPoint);
					}
				}

				if (opts.numericInput === true) {
					initialValue = initialValue.split("").reverse().join("");
				}
				return initialValue.toString();
			},
			canClearPosition: function (maskset, position, lvp, strict, opts) {
				var positionInput = maskset.validPositions[position].input,
					canClear = ((positionInput !== opts.radixPoint || (maskset.validPositions[position].match.fn !== null && opts.decimalProtect === false)) || isFinite(positionInput)) ||
						position === lvp ||
						positionInput === opts.groupSeparator ||
						positionInput === opts.negationSymbol.front ||
						positionInput === opts.negationSymbol.back;
				return canClear;
			},
			onKeyDown: function (e, buffer, caretPos, opts) {
				var $input = $(this);
				if (e.ctrlKey) {
					switch (e.keyCode) {
						case Inputmask.keyCode.UP:
							$input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
							$input.trigger("setvalue");
							break;
						case Inputmask.keyCode.DOWN:
							$input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
							$input.trigger("setvalue");
							break;
					}
				}
			}
		},
		"currency": {
			prefix: "$ ",
			groupSeparator: ",",
			alias: "numeric",
			placeholder: "0",
			autoGroup: true,
			digits: 2,
			digitsOptional: false,
			clearMaskOnLostFocus: false
		},
		"decimal": {
			alias: "numeric"
		},
		"integer": {
			alias: "numeric",
			digits: 0,
			radixPoint: ""
		},
		"percentage": {
			alias: "numeric",
			digits: 2,
			radixPoint: ".",
			placeholder: "0",
			autoGroup: false,
			min: 0,
			max: 100,
			suffix: " %",
			allowPlus: false,
			allowMinus: false
		}
	})
	;
	return Inputmask;
}));
