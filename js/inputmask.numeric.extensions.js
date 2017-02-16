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
		define(["./dependencyLibs/inputmask.dependencyLib", "./inputmask"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask"));
	} else {
		factory(window.dependencyLib || jQuery, window.Inputmask);
	}
}
(function ($, Inputmask, undefined) {
	function autoEscape(txt, opts) {
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

	//number aliases
	Inputmask.extendAliases({
		"numeric": {
			mask: function (opts) {
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
				mask += autoEscape(opts.prefix, opts);

				if (opts.integerOptional === true) {
					mask += "~{1," + opts.integerDigits + "}";
				} else mask += "~{" + opts.integerDigits + "}";
				if (opts.digits !== undefined) {
					opts.radixPointDefinitionSymbol = opts.decimalProtect ? ":" : opts.radixPoint;
					var dq = opts.digits.toString().split(",");
					if (isFinite(dq[0] && dq[1] && isFinite(dq[1]))) {
						mask += opts.radixPointDefinitionSymbol + ";{" + opts.digits + "}";
					} else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
						if (opts.digitsOptional) {
							mask += "[" + opts.radixPointDefinitionSymbol + ";{1," + opts.digits + "}]";
						} else mask += opts.radixPointDefinitionSymbol + ";{" + opts.digits + "}";
					}
				}
				mask += autoEscape(opts.suffix, opts);
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
			inputmode: "numeric",
			preValidation: function (buffer, pos, c, opts) {
				if (c === "-" || c == opts.negationSymbol.front) {
					if (opts.allowMinus !== true) return false;
					opts.isNegative = opts.isNegative === undefined ? true : !opts.isNegative;
					return {caretPos: pos};
				}
				if (opts.numericInput !== true && c === opts.radixPoint && (opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0))) {
					var radixPos = $.inArray(opts.radixPoint, buffer);
					if (radixPos !== -1) {
						return {"caret": radixPos + 1};
					}
				}

				return true;
			},
			postValidation: function (buffer, currentResult, opts) {
				function buildPostMask(buffer, opts) {
					//define base for formatter
					var postMask = "";
					postMask += "(" + opts.groupSeparator + "*{" + opts.groupSize + "}){*}";
					if (opts.radixPoint !== "") {
						var radixSplit = buffer.join("").split(opts.radixPoint);
						if (radixSplit[1]) {
							postMask += opts.radixPoint + "*{" + radixSplit[1].match(/^\d*\??\d*/)[0].length + "}";
						}
					}

					return postMask;
				}

				var suffix = opts.suffix.split(""), prefix = opts.prefix.split("");

				if (currentResult.pos == undefined && currentResult.caret !== undefined) return currentResult;

				var caretPos = currentResult.caretPos || currentResult.pos;
				var maskedValue = buffer.slice();
				if (opts.numericInput) {
					caretPos = maskedValue.length - caretPos;
					maskedValue = maskedValue.reverse();
				}
				//mark caretPos
				var charAtPos = maskedValue[caretPos];
				if (caretPos == maskedValue.length - 1 && charAtPos === opts.radixPoint) return currentResult;

				if (charAtPos !== undefined) {
					if (charAtPos !== opts.radixPoint &&
						charAtPos !== opts.negationSymbol.front &&
						charAtPos !== opts.negationSymbol.back
					) {
						maskedValue[caretPos] = "?";
						if (caretPos >= (opts.isNegative ? 0 : 1) && caretPos < opts.prefix.length + (opts.isNegative ? 0 : 1)) {
							prefix[caretPos - (opts.isNegative ? 0 : 1)] = "?";
						} else if (caretPos >= (maskedValue.length - opts.suffix.length) - (opts.isNegative ? 0 : 1)) {
							suffix[caretPos - (maskedValue.length - opts.suffix.length - (opts.isNegative ? 0 : 1))] = "?";
						}
					}
				}
				//make numeric
				prefix = prefix.join("");
				suffix = suffix.join("");
				var processValue = maskedValue.join("").replace(prefix, "");
				processValue = processValue.replace(suffix, "");
				processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
				//strip negation symbol
				processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "");
				processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
				//strip placeholder at the end
				if (isNaN(opts.placeholder)) {
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "");
				}

				//strip leading zeroes
				processValue = processValue.replace(/^0/g, "");
				if (processValue[0] === opts.radixPoint) processValue = "0" + processValue;

				if (processValue !== "") {
					processValue = processValue.split("");
					//handle digits
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
					}

					if (opts.autoGroup === true && opts.groupSeparator !== "") {
						processValue = Inputmask(buildPostMask(processValue, opts), {
							numericInput: true, jitMasking: true,
							definitions: {
								"*": {
									validator: "[0-9?]",
									cardinality: 1
								}
							}
						}).format(processValue.join(""));
					} else processValue = processValue.join("");

					processValue = prefix + processValue;
					processValue += suffix;
					if (opts.isNegative) {
						processValue = opts.negationSymbol.front + processValue;
						processValue += opts.negationSymbol.back;
					}
					processValue = processValue.split("");
					//unmark position
					if (charAtPos !== undefined) {
						if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) {
							caretPos = $.inArray("?", processValue);
							processValue[caretPos] = charAtPos;
						} else if (charAtPos === opts.radixPoint &&
							charAtPos === opts.negationSymbol.front &&
							charAtPos === opts.negationSymbol.back) {
							caretPos = $.inArray(charAtPos, processValue);
						}
					}


					if (opts.numericInput) {
						caretPos = processValue.length - caretPos;
						processValue = processValue.reverse();
					}

					var rslt = {
						caret: currentResult.caret || (currentResult.pos ? caretPos + 1 : caretPos),
						buffer: processValue,
						refreshFromBuffer: processValue.join("") != buffer.join("")
					};

					console.log(JSON.stringify(rslt));
					return rslt;
				}
				return currentResult;
			},
			onBeforeWrite: function (e, buffer, caretPos, opts) {
				if (e) {
					if (e.type === "keydown") {
						return opts.postValidation(buffer, {caretPos: caretPos}, opts);
					}
					if (e.type === "blur") {
						// var valc = processValue.split("")[caretPos] = charAtPos;
						// var floatValue = parseFloat(valc),
						// 	signedFloatValue = opts.isNegative ? floatValue * -1 : floatValue;
						//
						// if (opts.min !== null && isFinite(opts.min) && signedFloatValue < parseFloat(opts.min)) {
						// 	floatValue = Math.abs(opts.min);
						// 	opts.isNegative = opts.min < 0;
						// 	maskedValue = undefined;
						// }
						// else if (opts.max !== null && isFinite(opts.max) && signedFloatValue > parseFloat(opts.max)) {
						// 	floatValue = Math.abs(opts.max);
						// 	opts.isNegative = opts.max < 0;
						// 	maskedValue = undefined;
						// }


						//strip radixpoint at the end
						// if (processValue[processValue.length - 1] === opts.radixPoint) {
						// 	delete processValue[processValue.length - 1];
						// }
					}
				}
			},
			regex: {
				integerPart: function (opts, emptyCheck) {
					return emptyCheck ? new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "\+]?") : new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "\+]?\\d+");
				}
				,
				integerNPart: function (opts) {
					return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
				}
			}
			,
			definitions: {
				"~": {
					validator: function (chrs, maskset, pos, strict, opts, isSelection) {
						var isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
						if (isValid === true && opts.numericInput !== true) {
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
						return isValid;
					},
					cardinality: 1
				},
				"+": {
					validator: function (chrs, maskset, pos, strict, opts) {
						return (strict && opts.allowMinus && chrs === opts.negationSymbol.front);

					},
					cardinality: 1,
					placeholder: ""
				},
				"-": {
					validator: function (chrs, maskset, pos, strict, opts) {
						return (strict && opts.allowMinus && chrs === opts.negationSymbol.back);

					},
					cardinality: 1,
					placeholder: ""
				},
				":": {
					validator: function (chrs, maskset, pos, strict, opts) {
						var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]";
						isValid = new RegExp(radix).test(chrs);
						if (isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint) {
							isValid = {
								"caret": pos + 1
							};
						}
						return isValid;
					},
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
				if (bufClone.join("") !== maskedValue) return false;

				var processValue = maskedValue.replace(opts.prefix, "");
				processValue = processValue.replace(opts.suffix, "");
				processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
				if (opts.radixPoint === ",") processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
				return isFinite(processValue);
			}
			,
			onBeforeMask: function (initialValue, opts) {
				initialValue = initialValue.toString();
				if (opts.numericInput === true) {
					initialValue = initialValue.split("").reverse().join("");
				}
				if (opts.radixPoint !== "" && isFinite(initialValue)) {
					var vs = initialValue.split("."),
						groupSize = opts.groupSeparator !== "" ? parseInt(opts.groupSize) : 0;
					if (vs.length === 2 && (vs[0].length > groupSize || vs[1].length > groupSize))
						initialValue = initialValue.replace(".", opts.radixPoint);
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
				return initialValue;
			}
			,
			canClearPosition: function (maskset, position, lvp, strict, opts) {
				var positionInput = maskset.validPositions[position].input,
					canClear = ((positionInput !== opts.radixPoint || (maskset.validPositions[position].match.fn !== null && opts.decimalProtect === false)) || isFinite(positionInput)) ||
						position === lvp ||
						positionInput === opts.groupSeparator ||
						positionInput === opts.negationSymbol.front ||
						positionInput === opts.negationSymbol.back;
				return canClear;
			}
			,
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
			allowMinus: false
		}
	})
	;
	return Inputmask;
}));
