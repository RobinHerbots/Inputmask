/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
var Inputmask = require("../inputmask"), $ = Inputmask.dependencyLib;

function autoEscape(txt, opts) {
	var escapedTxt = "";
	for (var i = 0; i < txt.length; i++) {
		if (Inputmask.prototype.definitions[txt.charAt(i)] ||
			opts.definitions[txt.charAt(i)] ||
			opts.optionalmarker.start === txt.charAt(i) ||
			opts.optionalmarker.end === txt.charAt(i) ||
			opts.quantifiermarker.start === txt.charAt(i) ||
			opts.quantifiermarker.end === txt.charAt(i) ||
			opts.groupmarker.start === txt.charAt(i) ||
			opts.groupmarker.end === txt.charAt(i) ||
			opts.alternatormarker === txt.charAt(i)) {
			escapedTxt += "\\" + txt.charAt(i);
		} else {
			escapedTxt += txt.charAt(i);
		}
	}
	return escapedTxt;
}

function alignDigits(buffer, digits, opts, force) {
	if (digits > 0 && (!opts.digitsOptional || force)) {
		var radixPosition = $.inArray(opts.radixPoint, buffer);
		if (radixPosition === -1) {
			buffer.push(opts.radixPoint);
			radixPosition = buffer.length - 1;
		}
		for (var i = 1; i <= digits; i++) {
			buffer[radixPosition + i] = buffer[radixPosition + i] || "0";
		}
	}


	return buffer;
}

function findValidator(symbol, maskset) {
	var posNdx = 0;
	if (symbol === "+") {
		for (posNdx in maskset.validPositions) ;
		posNdx = parseInt(posNdx);
	}
	for (var tstNdx in maskset.tests) {
		tstNdx = parseInt(tstNdx);
		if (tstNdx >= posNdx) {
			for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) {
				if ((maskset.validPositions[tstNdx] === undefined || symbol === "-") && maskset.tests[tstNdx][ndx].match.def === symbol) {
					return tstNdx + ((maskset.validPositions[tstNdx] !== undefined && symbol !== "-") ? 1 : 0);
				}
			}
		}
	}
	return posNdx;
}

function findValid(symbol, maskset) {
	var ret = -1;
	$.each(maskset.validPositions, function (ndx, tst) {
		if (tst && tst.match.def === symbol) {
			ret = parseInt(ndx);
			return false;
		}
	});
	return ret;
}

function parseMinMaxOptions(opts) {
	if (opts.parseMinMaxOptions === undefined) {
		// convert min and max options
		if (opts.min !== null) {
			opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
			if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
			opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
			if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
		}
		if (opts.max !== null) {
			opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
			if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
			opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
			if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
		}
		opts.parseMinMaxOptions = "done";
	}
}

function genMask(opts) {
	opts.repeat = 0;
	//treat equal separator and radixpoint
	if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
		if (opts.radixPoint === ".") {
			opts.groupSeparator = ",";
		} else if (opts.radixPoint === ",") {
			opts.groupSeparator = ".";
		} else {
			opts.groupSeparator = "";
		}
	}
	//prevent conflict with default skipOptionalPartCharacter
	if (opts.groupSeparator === " ") {
		opts.skipOptionalPartCharacter = undefined;
	}

	//enforce placeholder to single
	if (opts.placeholder.length > 1) {
		opts.placeholder = opts.placeholder.charAt(0);
	}
	//only allow radixfocus when placeholder = 0
	if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "") {
		opts.positionCaretOnClick = "lvp";
	}

	var decimalDef = "0";
	if (opts.numericInput === true && opts.__financeInput === undefined) { //finance people input style
		decimalDef = "1";
		opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
		// opts.digitsOptional = false;
		if (isNaN(opts.digits)) opts.digits = 2;
		opts._radixDance = false;
	} else {
		opts.__financeInput = false; //needed to keep original selection when remasking
		opts.numericInput = true;
	}

	var mask = "[+]", altMask;
	mask += autoEscape(opts.prefix, opts);
	if (opts.groupSeparator !== "") {
		mask += opts._mask(opts);
	} else {
		mask += "9{+}";
	}
	if (opts.digits !== undefined && opts.digits !== 0) {
		var dq = opts.digits.toString().split(",");
		if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
			mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}";
		} else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
			if (opts.digitsOptional) {
				altMask = mask + opts.radixPoint + decimalDef + "{0," + opts.digits + "}";
				// mask += "[" + opts.radixPoint + "]";
				opts.keepStatic = true;
			} else {
				mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}";
			}
		}
	}
	mask += autoEscape(opts.suffix, opts);
	mask += "[-]";

	if (altMask) {
		mask = [(altMask + autoEscape(opts.suffix, opts) + "[-]"), mask];
	}


	opts.greedy = false; //enforce greedy false

	parseMinMaxOptions(opts);

	// console.log(mask);
	return mask;
}

function hanndleRadixDance(pos, c, radixPos, opts) {
	if (opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back) {
		if (pos <= radixPos && (radixPos > 0 || c == opts.radixPoint)) {
			pos -= 1;
		}
	}
	return pos;
}

function decimalValidator(chrs, maskset, pos, strict, opts) {
	var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
		result = radixPos !== -1 && new RegExp("[0-9\uFF11-\uFF19]").test(chrs);
	if (opts._radixDance && result && maskset.validPositions[radixPos] == undefined) {
		return {
			insert: {
				pos: radixPos === pos ? radixPos + 1 : radixPos,
				c: opts.radixPoint
			},
			pos: pos
		};
	}

	return result;
}

function checkForLeadingZeroes(buffer, opts) {
	//check leading zeros
	try {
		var numberMatches = new RegExp("(^" + (opts.negationSymbol.front !== "" ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + (opts.negationSymbol.back != "" ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
			number = numberMatches ? numberMatches[2] : "", leadingzeroes = false;
		if (number) {
			number = number.split(opts.radixPoint.charAt(0))[0];
			leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number);
		}
		return leadingzeroes && (leadingzeroes[0].length > 1 || leadingzeroes[0].length > 0 && leadingzeroes[0].length < number.length) ? leadingzeroes : false;
	} catch(e){
		console.log(buffer.slice().reverse().join(""));
	}
}

//number aliases
Inputmask.extendAliases({
	"numeric": {
		mask: genMask,
		_mask: function (opts) {
			return "(" + opts.groupSeparator + "999){+|1}";
		},
		placeholder: "0",
		greedy: false,
		digits: "*", //number of fractionalDigits
		digitsOptional: true,
		enforceDigitsOnBlur: false,
		radixPoint: ".",
		positionCaretOnClick: "radixFocus",
		_radixDance: true,
		groupSeparator: "",
		allowMinus: true,
		negationSymbol: {
			front: "-", //"("
			back: "" //")"
		},
		prefix: "",
		suffix: "",
		rightAlign: true,
		min: null, //minimum value
		max: null, //maximum value
		step: 1,
		insertMode: true,
		autoUnmask: false,
		unmaskAsNumber: false,
		inputmode: "numeric",
		skipOptionalPartCharacter: "",
		definitions: {
			"0": {
				validator: decimalValidator
			},
			"1": {
				validator: decimalValidator,
				definitionSymbol: "*"
			},
			"+": {
				validator: function (chrs, maskset, pos, strict, opts) {
					return (opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front));

				}
			},
			"-": {
				validator: function (chrs, maskset, pos, strict, opts) {
					return (opts.allowMinus && chrs === opts.negationSymbol.back);
				}
			}
		},
		preValidation: function (buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
			if (opts.__financeInput !== false && c === opts.radixPoint) return false;
			var radixPos = $.inArray(opts.radixPoint, buffer);
			pos = hanndleRadixDance(pos, c, radixPos, opts);
			if (c === "-" || c === opts.negationSymbol.front) {
				if (opts.allowMinus !== true) return false;
				var isNegative = false,
					front = findValid("+", maskset), back = findValid("-", maskset);
				if (front !== -1) {
					isNegative = [front, back];
				}

				return isNegative !== false ? {
					remove: isNegative,
					caret: radixPos > pos ? pos + 1 : pos
				} : {
					insert: [
						{pos: findValidator("+", maskset), c: opts.negationSymbol.front, fromIsValid: true},
						{pos: findValidator("-", maskset), c: opts.negationSymbol.back, fromIsValid: undefined}],
					caret: radixPos > pos ? pos + 1 : pos
				};
			}

			if (strict) return true;
			if (radixPos !== -1 && (opts._radixDance === true && isSelection === false && c === opts.radixPoint && (opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) && radixPos !== pos)) {
				return {
					"caret": opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
				};
			}

			return {rewritePosition: (isSelection && opts.digitsOptional) ? caretPos.end : pos};
		},
		postValidation: function (buffer, pos, currentResult, opts, maskset, strict) {
			if (strict) return true;
			if (opts.min !== null || opts.max !== null) {
				var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, $.extend({}, opts, {
					unmaskAsNumber: true
				}));
				if (opts.min !== null && unmasked < opts.min && (unmasked.toString().length >= opts.min.toString().length || unmasked < 0)) {
					return {
						refreshFromBuffer: true,
						buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
					};
				}

				if (opts.max !== null && unmasked > opts.max) {
					return {
						refreshFromBuffer: true,
						buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
					};
				}
			}

			return currentResult;
		},
		onUnMask: function (maskedValue, unmaskedValue, opts) {
			if (unmaskedValue === "" && opts.nullable === true) {
				return unmaskedValue;
			}
			var processValue = maskedValue.replace(opts.prefix, "");
			processValue = processValue.replace(opts.suffix, "");
			processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
			if (opts.placeholder.charAt(0) !== "") {
				processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0");
			}
			if (opts.unmaskAsNumber) {
				if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".");
				processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
				processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
				return Number(processValue);
			}
			return processValue;
		},
		isComplete: function (buffer, opts) {
			var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
			maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
			maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
			maskedValue = maskedValue.replace(opts.prefix, "");
			maskedValue = maskedValue.replace(opts.suffix, "");
			maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
			if (opts.radixPoint === ",") maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
			return isFinite(maskedValue);
		},
		onBeforeMask: function (initialValue, opts) {
			var radixPoint = opts.radixPoint || ",";

			if ((typeof initialValue == "number" || opts.inputType === "number") && radixPoint !== "") {
				initialValue = initialValue.toString().replace(".", radixPoint);
			}

			var valueParts = initialValue.split(radixPoint),
				integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
				decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "",
				forceDigits = valueParts.length > 1;

			initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);

			var digits = 0;
			if (radixPoint !== "") {
				digits = decimalPart.length;
				if (decimalPart !== "") {
					var digitsFactor = Math.pow(10, digits || 1);
					if (isFinite(opts.digits)) {
						digits = parseInt(opts.digits);
						digitsFactor = Math.pow(10, digits);
					}

					//make the initialValue a valid javascript number for the parsefloat
					initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), ".");
					if (isFinite(initialValue)) {
						initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor;
					}
					initialValue = initialValue.toString().replace(".", radixPoint);
				}
			}
			//this needs to be in a separate part and not directly in decimalPart to allow rounding
			if (opts.digits === 0 && initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) !== -1) {
				initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)));
			}

			if (opts.min !== null || opts.max !== null) {
				var numberValue = initialValue.toString().replace(radixPoint, ".");
				if (opts.min !== null && numberValue < opts.min) {
					initialValue = opts.min.toString().replace(".", radixPoint);
				} else if (opts.max !== null && numberValue > opts.max) {
					initialValue = opts.max.toString().replace(".", radixPoint);
				}
			}

			return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
		},
		onBeforeWrite: function (e, buffer, caretPos, opts) {
			function stripBuffer(buffer, stripRadix) {
				if (opts.__financeInput !== false || stripRadix) {
					var position = $.inArray(opts.radixPoint, buffer);
					if (position !== -1) {
						buffer.splice(position, 1);
					}
				}
				if (opts.groupSeparator !== "") {
					while ((position = buffer.indexOf(opts.groupSeparator)) !== -1) {
						buffer.splice(position, 1);
					}
				}

				return buffer;
			}

			var result,
				leadingzeroes = checkForLeadingZeroes(buffer, opts);

			if (leadingzeroes) {
				var buf = buffer.slice().reverse(), caretNdx = buf.join("").indexOf(leadingzeroes[0]);
				buf.splice(caretNdx, leadingzeroes[0].length);
				var newCaretPos = buf.length - caretNdx;
				stripBuffer(buf);
				result = {
					refreshFromBuffer: true,
					buffer: buf.reverse(),
					caret: caretPos < newCaretPos ? caretPos : newCaretPos
				};
			}

			if (e) {
				switch (e.type) {
					case "blur":
					case "checkval":
						if (opts.min !== null) {
							var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, $.extend({}, opts, {
								unmaskAsNumber: true
							}));
							if (opts.min !== null && unmasked < opts.min) {
								return {
									refreshFromBuffer: true,
									buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
								};
							}
						}
						if (opts.radixPoint !== "" && buffer[0] === opts.radixPoint) {
							if (result && result.buffer) {
								result.buffer.shift();
							} else {
								buffer.shift();
								result =
									{refreshFromBuffer: true, buffer: stripBuffer(buffer)};
							}
						} else {
							if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
								var nmbrMtchs = new RegExp("(^" + (opts.negationSymbol.front != "" ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + (opts.negationSymbol.back != "" ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), true).reverse().join("")),
									number = nmbrMtchs ? nmbrMtchs[2] : "";
								if (number == 0) {
									result = {refreshFromBuffer: true, buffer: [0]};
								}
							}
						}


				}
			}
			return result;
		},
		onKeyDown: function (e, buffer, caretPos, opts) {
			var $input = $(this), bffr;
			if (e.ctrlKey) {
				switch (e.keyCode) {
					case Inputmask.keyCode.UP:
						this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
						$input.trigger("setvalue");
						return false;
					case Inputmask.keyCode.DOWN:
						this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
						$input.trigger("setvalue");
						return false;
				}
			}
			if (!e.shiftKey && (e.keyCode === Inputmask.keyCode.DELETE || e.keyCode === Inputmask.keyCode.BACKSPACE || e.keyCode === Inputmask.keyCode.BACKSPACE_SAFARI)) {
				if (buffer[e.keyCode === Inputmask.keyCode.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) {
					bffr = buffer.slice().reverse();
					if (opts.negationSymbol.front !== "") bffr.shift();
					if (opts.negationSymbol.back !== "") bffr.pop();
					$input.trigger("setvalue", [bffr.join(""), caretPos.begin]);
					return false;
				} else if (opts._radixDance === true) {
					var radixPos = $.inArray(opts.radixPoint, buffer);
					if (!opts.digitsOptional) {
						if (radixPos !== -1 && (caretPos.begin < radixPos || (e.keyCode === Inputmask.keyCode.DELETE && caretPos.begin === radixPos))) {
							if (e.keyCode === Inputmask.keyCode.BACKSPACE || e.keyCode === Inputmask.keyCode.BACKSPACE_SAFARI) {
								caretPos.begin++;
							}
							bffr = buffer.slice().reverse();
							bffr.splice(bffr.length - caretPos.begin, 1);
							$input.trigger("setvalue", [alignDigits(bffr, opts.digits, opts).join(""), caretPos.begin]);
							return false;
						}
					} else if (radixPos === 0) {
						bffr = buffer.slice().reverse();
						bffr.pop();
						$input.trigger("setvalue", [bffr.join(""), caretPos.begin]);
						return false;
					}
				}
			}
		}
	},
	"currency": {
		prefix: "$ ",
		groupSeparator: ",",
		alias: "numeric",
		digits: 2,
		digitsOptional: false
	},
	"decimal": {
		alias: "numeric"
	},
	"integer": {
		alias: "numeric",
		digits: 0
	},
	"percentage": {
		alias: "numeric",
		min: 0,
		max: 100,
		suffix: " %",
		digits: 0,
		allowMinus: false
	},
	"indianns": { //indian numbering system
		alias: "numeric",
		_mask: function (opts) {
			return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
		},
		groupSeparator: ",",
		radixPoint: ".",
		placeholder: "0",
		digits: 2,
		digitsOptional: false
	}
});
module.exports = Inputmask;
