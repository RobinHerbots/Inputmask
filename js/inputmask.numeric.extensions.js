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
		//number aliases
		Inputmask.extendAliases({
			"numeric": {
				mask: function(opts) {
					function autoEscape(txt) {
						var escapedTxt = "";
						for (var i = 0; i < txt.length; i++) {
							escapedTxt += opts.definitions[txt.charAt(i)] ? "\\" + txt.charAt(i) : txt.charAt(i);
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
					opts.radixFocus = opts.radixFocus && opts.placeholder !== "" && opts.integerOptional === true;

					opts.definitions[";"] = opts.definitions["~"]; //clone integer def for decimals
					opts.definitions[";"].definitionSymbol = "~";

					if (opts.numericInput == true) { //finance people input style
						opts.radixFocus = false;
						opts.digitsOptional = false;
						if (isNaN(opts.digits)) opts.digits = 2;
						opts.decimalProtect = false;
					}

					var mask = autoEscape(opts.prefix);
					mask += "[+]";
					if (opts.integerOptional === true) {
						mask += "~{1," + opts.integerDigits + "}";
					} else mask += "~{" + opts.integerDigits + "}";
					if (opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
						if (opts.digitsOptional) {
							mask += "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{1," + opts.digits + "}]";
						} else mask += (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}";
					}
					if (opts.negationSymbol.back !== "") {
						mask += "[-]";
					}
					mask += autoEscape(opts.suffix);

					opts.greedy = false; //enforce greedy false

					return mask;
				},
				placeholder: "",
				greedy: false,
				digits: "*", //number of fractionalDigits
				digitsOptional: true,
				radixPoint: ".",
				radixFocus: true,
				groupSize: 3,
				groupSeparator: "",
				autoGroup: false,
				allowPlus: true,
				allowMinus: true,
				negationSymbol: {
					front: "-", //"("
					back: "" //")"
				},
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
				postFormat: function(buffer, pos, reformatOnly, opts) { //this needs to be removed // this is crap
					// console.log(buffer);
					if (opts.numericInput === true) {
						buffer = buffer.reverse();
						if (isFinite(pos)) {
							pos = buffer.join("").length - pos - 1;
						}
					}
					var suffixStripped = false,
						i, l;
					if (buffer.length >= opts.suffix.length && buffer.join("").indexOf(opts.suffix) === (buffer.length - opts.suffix.length)) {
						buffer.length = buffer.length - opts.suffix.length; //strip suffix
						suffixStripped = true;
					}
					//position overflow corrections
					pos = pos >= buffer.length ? buffer.length - 1 : (pos < opts.prefix.length ? opts.prefix.length : pos);

					var needsRefresh = false,
						charAtPos = buffer[pos];
					if (opts.groupSeparator === "" || (opts.numericInput !== true &&
							($.inArray(opts.radixPoint, buffer) !== -1 && pos > $.inArray(opts.radixPoint, buffer)) ||
							new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "\+]").test(charAtPos))) {
						if (suffixStripped) {
							for (i = 0, l = opts.suffix.length; i < l; i++) {
								buffer.push(opts.suffix.charAt(i));
							}
						}
						//console.log("return input " + buffer);
						return {
							pos: pos
						};
					}

					var cbuf = buffer.slice();
					if (charAtPos === opts.groupSeparator) {
						cbuf.splice(pos--, 1);
						charAtPos = cbuf[pos];
					}
					if (reformatOnly) {
						if (charAtPos !== opts.radixPoint) cbuf[pos] = "?";
					} else cbuf.splice(pos, 0, "?"); //set position indicator
					var bufVal = cbuf.join(""),
						bufValOrigin = bufVal;
					if (bufVal.length > 0 && opts.autoGroup || (reformatOnly && bufVal.indexOf(opts.groupSeparator) !== -1)) {
						var escapedGroupSeparator = Inputmask.escapeRegex(opts.groupSeparator);
						needsRefresh = bufVal.indexOf(opts.groupSeparator) === 0;
						bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
						var radixSplit = bufVal.split(opts.radixPoint);
						bufVal = opts.radixPoint === "" ? bufVal : radixSplit[0];
						if (bufVal !== (opts.prefix + "?0") && bufVal.length >= (opts.groupSize + opts.prefix.length)) {
							//needsRefresh = true;
							var reg = new RegExp("([-\+]?[\\d\?]+)([\\d\?]{" + opts.groupSize + "})");
							while (reg.test(bufVal)) {
								bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2");
								bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
							}
						}
						if (opts.radixPoint !== "" && radixSplit.length > 1) {
							bufVal += opts.radixPoint + radixSplit[1];
						}
					}
					needsRefresh = bufValOrigin !== bufVal;
					buffer.length = bufVal.length; //align the length
					for (i = 0, l = bufVal.length; i < l; i++) {
						buffer[i] = bufVal.charAt(i);
					}
					var newPos = $.inArray("?", buffer);
					if (newPos === -1 && charAtPos === opts.radixPoint) newPos = $.inArray(opts.radixPoint, buffer);
					if (reformatOnly) buffer[newPos] = charAtPos;
					else buffer.splice(newPos, 1);

					if (!needsRefresh && suffixStripped) {
						for (i = 0, l = opts.suffix.length; i < l; i++) {
							buffer.push(opts.suffix.charAt(i));
						}
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
						"buffer": buffer
					};
				},
				onBeforeWrite: function(e, buffer, caretPos, opts) {
					if (e && (e.type === "blur" || e.type === "checkval")) {
						//handle minvalue
						var maskedValue = buffer.join(""),
							processValue = maskedValue.replace(opts.prefix, "");
						processValue = processValue.replace(opts.suffix, "");
						processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
						if (opts.radixPoint === ",") processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");

						if (isFinite(processValue)) {
							if (isFinite(opts.min) && parseFloat(processValue) < parseFloat(opts.min)) {
								return $.extend(true, {
									"refreshFromBuffer": true,
									"buffer": (opts.prefix + opts.min).split("")
								}, opts.postFormat((opts.prefix + opts.min).split(""), 0, true, opts));
							}
						}
						if (opts.numericInput !== true) {
							var tmpBufSplit = opts.radixPoint !== "" ? buffer.join("").split(opts.radixPoint) : [buffer.join("")],
								matchRslt = tmpBufSplit[0].match(opts.regex.integerPart(opts)),
								matchRsltDigits = tmpBufSplit.length === 2 ? tmpBufSplit[1].match(opts.regex.integerNPart(opts)) : undefined;
							if (matchRslt) {
								if ((matchRslt[0] === opts.negationSymbol.front + "0" || matchRslt[0] === opts.negationSymbol.front || matchRslt[0] === "+") && (matchRsltDigits === undefined || matchRsltDigits[0].match(/^0+$/))) {
									buffer.splice(matchRslt.index, 1);
								}
								var radixPosition = $.inArray(opts.radixPoint, buffer);
								if (radixPosition !== -1) {
									if (isFinite(opts.digits) && !opts.digitsOptional) {
										for (var i = 1; i <= opts.digits; i++) {
											if (buffer[radixPosition + i] === undefined || buffer[radixPosition + i] === opts.placeholder.charAt(0)) {
												buffer[radixPosition + i] = "0";
											}
										}
										return {
											"refreshFromBuffer": maskedValue !== buffer.join(""),
											"buffer": buffer
										};
									} else if (radixPosition === buffer.length - opts.suffix.length - 1) {
										buffer.splice(radixPosition, 1);
										return {
											"refreshFromBuffer": true,
											"buffer": buffer
										};
									}
								}
							}
						}
					}

					if (opts.autoGroup) {
						var rslt = opts.postFormat(buffer, opts.numericInput ? caretPos : caretPos - 1, true, opts);
						rslt.caret = caretPos <= opts.prefix.length ? rslt.pos : rslt.pos + 1;
						return rslt;
					}
				},
				regex: {
					integerPart: function(opts) {
						return new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "\+]?\\d+");
					},
					integerNPart: function(opts) {
						return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + "]+");
					}
				},
				signHandler: function(chrs, maskset, pos, strict, opts) {
					if (!strict && (opts.allowMinus && chrs === "-") || (opts.allowPlus && chrs === "+")) {
						var matchRslt = maskset.buffer.join("").match(opts.regex.integerPart(opts));

						if (matchRslt && matchRslt[0].length > 0) {
							if (maskset.buffer[matchRslt.index] === (chrs === "-" ? "+" : opts.negationSymbol.front)) {
								if (chrs === "-") {
									if (opts.negationSymbol.back !== "") {
										return {
											"pos": matchRslt.index,
											"c": opts.negationSymbol.front,
											"remove": matchRslt.index,
											"caret": pos,
											"insert": {
												"pos": maskset.buffer.length - opts.suffix.length - 1,
												"c": opts.negationSymbol.back
											}
										};
									} else {
										return {
											"pos": matchRslt.index,
											"c": opts.negationSymbol.front,
											"remove": matchRslt.index,
											"caret": pos
										};
									}
								} else {
									if (opts.negationSymbol.back !== "") {
										return {
											"pos": matchRslt.index,
											"c": "+",
											"remove": [matchRslt.index, maskset.buffer.length - opts.suffix.length - 1],
											"caret": pos
										};
									} else {
										return {
											"pos": matchRslt.index,
											"c": "+",
											"remove": matchRslt.index,
											"caret": pos
										};
									}
								}
							} else if (maskset.buffer[matchRslt.index] === (chrs === "-" ? opts.negationSymbol.front : "+")) {
								if (chrs === "-" && opts.negationSymbol.back !== "") {
									return {
										"remove": [matchRslt.index, maskset.buffer.length - opts.suffix.length - 1],
										"caret": pos - 1
									};
								} else {
									return {
										"remove": matchRslt.index,
										"caret": pos - 1
									};
								}
							} else {
								if (chrs === "-") {
									if (opts.negationSymbol.back !== "") {
										return {
											"pos": matchRslt.index,
											"c": opts.negationSymbol.front,
											"caret": pos + 1,
											"insert": {
												"pos": maskset.buffer.length - opts.suffix.length,
												"c": opts.negationSymbol.back
											}
										};
									} else {
										return {
											"pos": matchRslt.index,
											"c": opts.negationSymbol.front,
											"caret": pos + 1
										};
									}
								} else {
									return {
										"pos": matchRslt.index,
										"c": chrs,
										"caret": pos + 1
									};
								}
							}
						}
					}
					return false;
				},
				radixHandler: function(chrs, maskset, pos, strict, opts) {
					if (!strict) {
						if ($.inArray(chrs, [",", "."]) !== -1) chrs = opts.radixPoint;
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
				},
				leadingZeroHandler: function(chrs, maskset, pos, strict, opts) {
					if (opts.numericInput === true) {
						if (maskset.buffer[maskset.buffer.length - opts.prefix.length - 1] === "0") {
							return {
								"pos": pos,
								"remove": maskset.buffer.length - opts.prefix.length - 1
							};
						}
					} else {
						var matchRslt = maskset.buffer.join("").match(opts.regex.integerNPart(opts)),
							radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
						if (matchRslt && !strict && (radixPosition === -1 || pos <= radixPosition)) {
							if (matchRslt["0"].indexOf("0") === 0) {
								if (pos < opts.prefix.length) pos = matchRslt.index; //position
								var _radixPosition = $.inArray(opts.radixPoint, maskset._buffer);
								var digitsMatch = maskset._buffer && maskset.buffer.slice(radixPosition).join("") === maskset._buffer.slice(_radixPosition).join("") || parseInt(maskset.buffer.slice(radixPosition + 1).join("")) === 0;
								var integerMatch = maskset._buffer && maskset.buffer.slice(matchRslt.index, radixPosition).join("") === maskset._buffer.slice(opts.prefix.length, _radixPosition).join("") || maskset.buffer.slice(matchRslt.index, radixPosition).join("") === "0";

								if (radixPosition === -1 || digitsMatch && integerMatch) {
									maskset.buffer.splice(matchRslt.index, 1);
									pos = pos > matchRslt.index ? pos - 1 : matchRslt.index;
									return {
										"pos": pos,
										"remove": matchRslt.index
									};
								} else if (matchRslt.index + 1 === pos || chrs === "0") {
									maskset.buffer.splice(matchRslt.index, 1);
									pos = matchRslt.index;
									return {
										"pos": pos,
										"remove": matchRslt.index
									};
								}
							} else if (chrs === "0" && pos <= matchRslt.index && matchRslt["0"] !== opts.groupSeparator) {
								return false;
							}
						}
					}
					return true;
				},
				postValidation: function(buffer, currentResult, opts) {
					//handle maxvalue
					var isValid = true,
						maskedValue = opts.numericInput ? buffer.slice().reverse().join("") : buffer.join(""),
						processValue = maskedValue.replace(opts.prefix, "");
					processValue = processValue.replace(opts.suffix, "");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.radixPoint === ",") processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
					//handle negation symbol
					processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
					processValue = processValue === opts.negationSymbol.front ? processValue + "0" : processValue;

					if (isFinite(processValue)) {
						if (opts.max !== null && isFinite(opts.max)) {
							processValue = parseFloat(processValue) > parseFloat(opts.max) ? opts.max : processValue;
							isValid = opts.postFormat((opts.prefix + processValue).split(""), 0, true, opts);
						}
						if (opts.min !== null && isFinite(opts.min)) {
							processValue = parseFloat(processValue) < parseFloat(opts.min) ? opts.min : processValue;
							isValid = opts.postFormat((opts.prefix + processValue).split(""), 0, true, opts);
						}
					}

					return isValid;
				},
				definitions: {
					"~": {
						validator: function(chrs, maskset, pos, strict, opts) {
							var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
							if (!isValid) {
								isValid = opts.radixHandler(chrs, maskset, pos, strict, opts);
								if (!isValid) {
									isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
									if (isValid === true) {
										isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts);
										if (isValid === true) {
											//handle overwrite when fixed precision
											var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
											if (radixPosition !== -1 && opts.digitsOptional === false && opts.numericInput !== true && pos > radixPosition && !strict) {
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
						},
						cardinality: 1,
						prevalidator: null
					},
					"+": {
						validator: function(chrs, maskset, pos, strict, opts) {
							var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
							if (!isValid && ((strict && opts.allowMinus && chrs === opts.negationSymbol.front) || (opts.allowMinus && chrs === "-") || (opts.allowPlus && chrs === "+"))) {
								if (chrs === "-") {
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
						},
						cardinality: 1,
						prevalidator: null,
						placeholder: ""
					},
					"-": {
						validator: function(chrs, maskset, pos, strict, opts) {
							var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
							if (!isValid && strict && opts.allowMinus && chrs === opts.negationSymbol.back) {
								isValid = true;
							}
							return isValid;
						},
						cardinality: 1,
						prevalidator: null,
						placeholder: ""
					},
					":": {
						validator: function(chrs, maskset, pos, strict, opts) {
							var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
							if (!isValid) {
								var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + ",\\." + "]";
								isValid = new RegExp(radix).test(chrs);
								if (isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint) {
									isValid = {
										"caret": pos + 1
									};
								}
							}
							return isValid ? {
								c: opts.radixPoint
							} : isValid;
						},
						cardinality: 1,
						prevalidator: null,
						placeholder: function(opts) {
							return opts.radixPoint;
						}
					}
				},
				onUnMask: function(maskedValue, unmaskedValue, opts) {
					var processValue = maskedValue.replace(opts.prefix, "");
					processValue = processValue.replace(opts.suffix, "");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.unmaskAsNumber) {
						if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".");
						return Number(processValue);
					}
					return processValue;
				},
				isComplete: function(buffer, opts) {
					var maskedValue = buffer.join(""),
						bufClone = buffer.slice();
					//verify separator positions
					opts.postFormat(bufClone, 0, true, opts);
					if (bufClone.join("") !== maskedValue) return false;

					var processValue = maskedValue.replace(opts.prefix, "");
					processValue = processValue.replace(opts.suffix, "");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.radixPoint === ",") processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
					return isFinite(processValue);
				},
				onBeforeMask: function(initialValue, opts) {
					if (opts.radixPoint !== "" && isFinite(initialValue)) {
						initialValue = initialValue.toString().replace(".", opts.radixPoint);
					} else {
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
					return initialValue.toString();
				},
				canClearPosition: function(maskset, position, lvp, strict, opts) {
					var positionInput = maskset.validPositions[position].input,
						canClear = ((positionInput !== opts.radixPoint || (maskset.validPositions[position].match.fn !== null && opts.decimalProtect === false)) || isFinite(positionInput)) ||
						position === lvp ||
						positionInput === opts.groupSeparator ||
						positionInput === opts.negationSymbol.front ||
						positionInput === opts.negationSymbol.back;

					if (canClear && isFinite(positionInput)) {
						var matchRslt,
							radixPos = $.inArray(opts.radixPoint, maskset.buffer);

						//inject radixpoint
						var radixInjection = false;
						if (maskset.validPositions[radixPos] === undefined) {
							maskset.validPositions[radixPos] = {
								input: opts.radixPoint
							};
							radixInjection = true;
						}

						if (!strict && maskset.buffer) {
							matchRslt = maskset.buffer.join("").substr(0, position).match(opts.regex.integerNPart(opts));
							var pos = position + 1,
								isNull = matchRslt == null || parseInt(matchRslt["0"].replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "")) === 0;
							if (isNull) {
								while (maskset.validPositions[pos] && (maskset.validPositions[pos].input === opts.groupSeparator || maskset.validPositions[pos].input === "0")) {
									delete maskset.validPositions[pos];
									pos++;
								}
							}
						}

						var buffer = [];
						//build new buffer from validPositions
						for (var vp in maskset.validPositions) {
							if (maskset.validPositions[vp].input !== undefined) buffer.push(maskset.validPositions[vp].input);
						}
						//remove radix Injection
						if (radixInjection) {
							delete maskset.validPositions[radixPos];
						}

						if (radixPos > 0) {
							var bufVal = buffer.join("");
							matchRslt = bufVal.match(opts.regex.integerNPart(opts));
							if (matchRslt) {
								if (position <= radixPos) {
									if (matchRslt["0"].indexOf("0") === 0) {
										canClear = matchRslt.index !== position || opts.placeholder === "0";
									} else {
										var intPart = parseInt(matchRslt["0"].replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "")),
											radixPart = parseInt(bufVal.split(opts.radixPoint)[1]);
										if (intPart < 10 && maskset.validPositions[position] && (opts.placeholder !== "0" || radixPart > 0)) {
											maskset.validPositions[position].input = "0";
											maskset.p = opts.prefix.length + 1;
											canClear = false;
										}
									}
								} else if (matchRslt["0"].indexOf("0") === 0) {
									if (bufVal.length === 3) {
										maskset.validPositions = {};
										canClear = false;
									}
								}
							}
						}
					}

					return canClear;
				},
				onKeyDown: function(e, buffer, caretPos, opts) {
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
		});
		return Inputmask;
	}));
