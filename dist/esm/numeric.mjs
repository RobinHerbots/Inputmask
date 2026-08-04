/*!
 * dist/esm/numeric.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.11
 */
export const __webpack_esm_id__ = 69;
export const __webpack_esm_ids__ = [69];
export const __webpack_esm_modules__ = {

/***/ 574
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gl: () => (/* binding */ currency),
/* harmony export */   VM: () => (/* binding */ indianns),
/* harmony export */   X1: () => (/* binding */ percentage),
/* harmony export */   _: () => (/* binding */ decimal),
/* harmony export */   nd: () => (/* binding */ integer),
/* harmony export */   pd: () => (/* binding */ registerNumeric),
/* harmony export */   sH: () => (/* binding */ numeric)
/* harmony export */ });
/* harmony import */ var _escapeRegex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(340);
/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(375);
/* harmony import */ var _keycode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(539);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(472);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(123);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */






function autoEscape(txt, opts) {
  let escapedTxt = "";
  for (let i = 0; i < txt.length; i++) {
    if (_definitions__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i)) {
      escapedTxt += "\\" + txt.charAt(i);
    } else {
      escapedTxt += txt.charAt(i);
    }
  }
  return escapedTxt;
}
function alignDigits(buffer, digits, opts, force) {
  if (buffer.length > 0 && digits > 0 && (!opts.digitsOptional || force)) {
    var radixPosition = buffer.indexOf(opts.radixPoint),
      negationBack = false;
    if (opts.negationSymbol.back === buffer[buffer.length - 1]) {
      negationBack = true;
      buffer.length--;
    }
    if (radixPosition === -1) {
      buffer.push(opts.radixPoint);
      radixPosition = buffer.length - 1;
    }
    for (let i = 1; i <= digits; i++) {
      if (!isFinite(buffer[radixPosition + i])) {
        buffer[radixPosition + i] = "0";
      }
    }
  }
  if (negationBack) buffer.push(opts.negationSymbol.back);
  return buffer;
}
function findValidator(symbol, maskset) {
  let posNdx = 0;
  if (symbol === "+") {
    posNdx = _positioning__WEBPACK_IMPORTED_MODULE_3__/* .seekNext */ .u4.call(this, maskset.validPositions.length - 1);
  }
  for (let tstNdx in maskset.tests) {
    tstNdx = parseInt(tstNdx);
    if (tstNdx >= posNdx) {
      for (let ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) {
        if ((maskset.validPositions[tstNdx] === undefined || symbol === "-") && maskset.tests[tstNdx][ndx].match.def === symbol) {
          return tstNdx + (maskset.validPositions[tstNdx] !== undefined && symbol !== "-" ? 1 : 0);
        }
      }
    }
  }
  return posNdx;
}
function findValid(symbol, maskset) {
  let ret = -1;
  for (let ndx = 0, vpl = maskset.validPositions.length; ndx < vpl; ndx++) {
    const tst = maskset.validPositions[ndx];
    if (tst && tst.match.def === symbol) {
      ret = ndx;
      break;
    }
  }
  return ret;
}
function parseMinMaxOptions(opts) {
  if (opts.parseMinMaxOptions === undefined) {
    // convert min and max options
    if (opts.min !== null) {
      opts.min = opts.min.toString().replace(new RegExp((0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.groupSeparator), "g"), "");
      if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
      opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
      if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
    }
    if (opts.max !== null) {
      opts.max = opts.max.toString().replace(new RegExp((0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.groupSeparator), "g"), "");
      if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
      opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
      if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
    }
    opts.parseMinMaxOptions = "done";
  }
}
function genMask(opts) {
  opts.repeat = 0;
  // treat equal separator and radixpoint
  if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
    if (opts.radixPoint === ".") {
      opts.groupSeparator = ",";
    } else if (opts.radixPoint === ",") {
      opts.groupSeparator = ".";
    } else {
      opts.groupSeparator = "";
    }
  }
  // prevent conflict with default skipOptionalPartCharacter
  if (opts.groupSeparator === " ") {
    opts.skipOptionalPartCharacter = undefined;
  }

  // enforce placeholder to single
  if (opts.placeholder.length > 1) {
    opts.placeholder = opts.placeholder.charAt(0);
  }
  // only allow radixfocus when placeholder = 0
  if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "") {
    opts.positionCaretOnClick = "lvp";
  }
  let decimalDef = "0",
    radixPointDef = opts.radixPoint;
  if (opts.numericInput === true && opts.__financeInput === undefined) {
    // finance people input style
    decimalDef = "1";
    opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
    opts.digitsOptional = false;
    if (isNaN(opts.digits)) opts.digits = opts.digits.indexOf(",") !== -1 ? opts.digits.split(",")[0] : 2;
    opts._radixDance = false;
    radixPointDef = opts.radixPoint === "," ? "?" : "!";
    if (opts.radixPoint !== "" && opts.definitions[radixPointDef] === undefined) {
      // update separator definition
      opts.definitions[radixPointDef] = {};
      opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]";
      opts.definitions[radixPointDef].placeholder = opts.radixPoint;
      opts.definitions[radixPointDef].static = true;
      opts.definitions[radixPointDef].generated = true; // forced marker as generated input
    }
  } else {
    opts.__financeInput = false; // needed to keep original selection when remasking
    opts.numericInput = true;
  }
  let mask = "[+]",
    altMask;
  mask += autoEscape(opts.prefix, opts);
  if (opts.groupSeparator !== "") {
    if (opts.definitions[opts.groupSeparator] === undefined) {
      // update separator definition
      opts.definitions[opts.groupSeparator] = {};
      opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]";
      opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator;
      opts.definitions[opts.groupSeparator].static = true;
      opts.definitions[opts.groupSeparator].generated = true; // forced marker as generated input
    }
    mask += opts._mask(opts);
  } else {
    mask += "9{+}";
  }
  if (opts.digits !== undefined && opts.digits !== 0) {
    const dq = opts.digits.toString().split(",");
    if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
      mask += radixPointDef + decimalDef + "{" + opts.digits + "}";
    } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
      if (opts.digitsOptional || opts.jitMasking) {
        altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}";
        // mask += "[" + opts.radixPoint + "]";
        opts.keepStatic = true;
      } else {
        mask += radixPointDef + decimalDef + "{" + opts.digits + "}";
      }
    }
  } else {
    opts.inputmode = "numeric";
  }
  mask += autoEscape(opts.suffix, opts);
  mask += "[-]";
  if (altMask) {
    mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask];
  }
  opts.greedy = false; // enforce greedy false

  parseMinMaxOptions(opts);
  if (opts.radixPoint !== "" && opts.substituteRadixPoint) opts.substitutes[opts.radixPoint == "." ? "," : "."] = opts.radixPoint;
  // console.log(mask);
  return mask;
}
function handleRadixDance(pos, c, radixPos, maskset, opts) {
  if (opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back) {
    if (pos <= radixPos && (radixPos > 0 || c == opts.radixPoint) && (maskset.validPositions[pos - 1] === undefined || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back)) {
      pos -= 1;
    }
  }
  return pos;
}
function decimalValidator(chrs, maskset, pos, strict, opts) {
  const radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
    result = (radixPos !== -1 || strict && opts.jitMasking) && new RegExp(opts.definitions["9"].validator).test(chrs);
  if (!strict && opts._radixDance && radixPos !== -1 && result && maskset.validPositions[radixPos] == undefined) {
    return {
      insert: {
        pos: radixPos === pos ? radixPos + 1 : radixPos,
        c: opts.radixPoint
      },
      pos
    };
  }
  return result;
}
function checkForLeadingZeroes(buffer, opts) {
  // check leading zeros
  let numberMatches = new RegExp("(^" + (opts.negationSymbol.front !== "" ? (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.negationSymbol.front) + "?" : "") + (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.prefix) + ")(.*)(" + (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.suffix) + (opts.negationSymbol.back != "" ? (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
    number = numberMatches ? numberMatches[2] : "",
    leadingzeroes = false;
  if (number) {
    number = number.split(opts.radixPoint.charAt(0))[0];
    leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number);
  }
  return leadingzeroes && (leadingzeroes[0].length > 1 || leadingzeroes[0].length > 0 && leadingzeroes[0].length < number.length) ? leadingzeroes : false;
}

// number aliases
const numericAlias = {
  mask: genMask,
  _mask: function (opts) {
    return "(" + opts.groupSeparator + "999){+|1}";
  },
  digits: "*",
  // number of fractionalDigits
  digitsOptional: true,
  enforceDigitsOnBlur: false,
  radixPoint: ".",
  positionCaretOnClick: "radixFocus",
  _radixDance: true,
  groupSeparator: "",
  allowMinus: true,
  negationSymbol: {
    front: "-",
    // "("
    back: "" // ")"
  },
  prefix: "",
  suffix: "",
  min: null,
  // minimum value
  max: null,
  // maximum value
  SetMaxOnOverflow: false,
  step: 1,
  inputType: "text",
  // number ~ specify that values which are set are in textform (radix point  is same as in the options) or in numberform (radixpoint = .)
  unmaskAsNumber: false,
  roundingFN: Math.round,
  // Math.floor ,  fn(x)
  inputmode: "decimal",
  shortcuts: {
    k: "1000",
    m: "1000000"
  },
  // global options
  placeholder: "0",
  greedy: false,
  rightAlign: true,
  insertMode: true,
  autoUnmask: false,
  skipOptionalPartCharacter: "",
  usePrototypeDefinitions: false,
  stripLeadingZeroes: true,
  substituteRadixPoint: true,
  definitions: {
    0: {
      validator: decimalValidator
    },
    1: {
      validator: decimalValidator,
      definitionSymbol: "9"
    },
    9: {
      // \uFF11-\uFF19 #1606
      validator: "[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]",
      definitionSymbol: "*"
    },
    "+": {
      validator: function (chrs, maskset, pos, strict, opts) {
        return opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front);
      }
    },
    "-": {
      validator: function (chrs, maskset, pos, strict, opts) {
        return opts.allowMinus && chrs === opts.negationSymbol.back;
      }
    }
  },
  preValidation: function (buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
    const inputmask = this;
    if (opts.__financeInput !== false && c === opts.radixPoint) return false;
    const radixPos = buffer.indexOf(opts.radixPoint),
      initPos = pos;
    pos = handleRadixDance(pos, c, radixPos, maskset, opts);
    if (c === "-" || c === opts.negationSymbol.front) {
      if (opts.allowMinus !== true) return false;
      let isNegative = false,
        front = findValid("+", maskset),
        back = findValid("-", maskset);
      if (front !== -1) {
        isNegative = [front];
        if (back !== -1) isNegative.push(back);
      }
      return isNegative !== false ? {
        remove: isNegative,
        caret: initPos - opts.negationSymbol.back.length
      } : {
        insert: [{
          pos: findValidator.call(inputmask, "+", maskset),
          c: opts.negationSymbol.front,
          fromIsValid: true
        }, {
          pos: findValidator.call(inputmask, "-", maskset),
          c: opts.negationSymbol.back,
          fromIsValid: undefined
        }],
        caret: initPos + opts.negationSymbol.back.length
      };
    }
    if (c === opts.groupSeparator) {
      return {
        caret: initPos
      };
    }
    if (strict) return true;
    if (radixPos !== -1 && opts._radixDance === true && isSelection === false && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && radixPos !== pos) {
      const radixValidatorPos = findValidator.call(inputmask, opts.radixPoint, maskset);
      if (maskset.validPositions[radixValidatorPos]) {
        maskset.validPositions[radixValidatorPos].generatedInput = maskset.validPositions[radixValidatorPos].generated || false;
      }
      return {
        caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
      };
    }
    if (opts.__financeInput === false) {
      if (isSelection) {
        if (opts.digitsOptional) {
          return {
            rewritePosition: caretPos.end
          };
        } else if (!opts.digitsOptional) {
          if (caretPos.begin > radixPos && caretPos.end <= radixPos) {
            if (c === opts.radixPoint) {
              return {
                insert: {
                  pos: radixPos + 1,
                  c: "0",
                  fromIsValid: true
                },
                rewritePosition: radixPos
              };
            } else {
              return {
                rewritePosition: radixPos + 1
              };
            }
          } else if (caretPos.begin < radixPos) {
            return {
              rewritePosition: caretPos.begin - 1
            };
          }
        }
      } else {
        if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && opts.digits > 0 && this.__valueGet.call(this.el) === "") {
          return {
            rewritePosition: radixPos
          };
        }

        // Cursor placed at or before the prefix on a field with no digits
        // would otherwise fall through to alternation switching and land
        // in the decimal part (#2615)
        if (pos >= buffer.length - opts.prefix.length && opts.radixPoint !== "") {
          const digitTest = new RegExp(opts.definitions["9"].validator);
          if (!maskset.validPositions.some(vp => vp && !vp.generatedInput && digitTest.test(vp.input))) {
            return {
              rewritePosition: radixPos !== -1 ? radixPos : 0
            };
          }
        }
      }
    }
    return {
      rewritePosition: pos
    };
  },
  postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval, fromAlternate) {
    if (currentResult === false) return currentResult;
    if (strict) return true;
    if (opts.min !== null || opts.max !== null) {
      const unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend({}, opts, {
        unmaskAsNumber: true
      }));
      if (opts.min !== null && unmasked < opts.min && fromAlternate !== true && (unmasked.toString().length > opts.min.toString().length ||
      // > instead of >= because we want to allow to type a bigger number
      buffer[0] === opts.radixPoint ||
      // disallow radixpoint when value is smaller than min
      unmasked < 0)) {
        return false;
        // return {
        // 	refreshFromBuffer: true,
        // 	buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
        // };
      }
      if (opts.max !== null && opts.max >= 0 && unmasked > opts.max) {
        return opts.SetMaxOnOverflow ? {
          refreshFromBuffer: true,
          buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
        } : false;
      }
    }
    return currentResult;
  },
  onUnMask: function (maskedValue, unmaskedValue, opts) {
    if (unmaskedValue === "" && opts.nullable === true) {
      return unmaskedValue;
    }
    let processValue = maskedValue.replace(opts.prefix, "");
    processValue = processValue.replace(opts.suffix, "");
    processValue = processValue.replace(new RegExp((0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.groupSeparator), "g"), "");
    if (opts.placeholder.charAt(0) !== "") {
      processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0");
    }
    if (opts.unmaskAsNumber) {
      if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$.call(this, opts.radixPoint), ".");
      processValue = processValue.replace(new RegExp("^" + (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.negationSymbol.front)), "-");
      processValue = processValue.replace(new RegExp((0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.negationSymbol.back) + "$"), "");
      return Number(processValue);
    }
    return processValue;
  },
  isComplete: function (buffer, opts) {
    let maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
    maskedValue = maskedValue.replace(new RegExp("^" + (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.negationSymbol.front)), "-");
    maskedValue = maskedValue.replace(new RegExp((0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.negationSymbol.back) + "$"), "");
    maskedValue = maskedValue.replace(opts.prefix, "");
    maskedValue = maskedValue.replace(opts.suffix, "");
    maskedValue = maskedValue.replace(new RegExp((0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
    if (opts.radixPoint === ",") maskedValue = maskedValue.replace((0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.radixPoint), ".");
    return isFinite(maskedValue);
  },
  onBeforeMask: function (initialValue, opts) {
    initialValue = initialValue ?? "";
    const radixPoint = opts.radixPoint || ",";
    if (isFinite(opts.digits)) opts.digits = parseInt(opts.digits);
    if ((typeof initialValue === "number" || opts.inputType === "number") && radixPoint !== "") {
      initialValue = initialValue.toString().replace(".", radixPoint);
    }
    const isNegative = initialValue.charAt(0) === "-" || initialValue.charAt(0) === opts.negationSymbol.front,
      valueParts = initialValue.split(radixPoint),
      integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
      decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "",
      forceDigits = valueParts.length > 1;
    initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);
    let digits = 0;
    if (radixPoint !== "") {
      digits = !opts.digitsOptional ? opts.digits : opts.digits < decimalPart.length ? opts.digits : decimalPart.length;
      if (decimalPart !== "" || !opts.digitsOptional) {
        const digitsFactor = Math.pow(10, digits || 1);

        // make the initialValue a valid javascript number for the parsefloat
        initialValue = initialValue.replace((0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(radixPoint), ".");
        if (!isNaN(parseFloat(initialValue))) {
          initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits);
        }
        initialValue = initialValue.toString().replace(".", radixPoint);
      }
    }
    // this needs to be in a separate part and not directly in decimalPart to allow rounding
    if (opts.digits === 0 && initialValue.indexOf(radixPoint) !== -1) {
      initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint));
    }
    if (initialValue !== "" && (opts.min !== null || opts.max !== null)) {
      const numberValue = initialValue.toString().replace(radixPoint, ".");
      if (opts.min !== null && numberValue < opts.min) {
        initialValue = opts.min.toString().replace(".", radixPoint);
      } else if (opts.max !== null && numberValue > opts.max) {
        initialValue = opts.max.toString().replace(".", radixPoint);
      }
    }
    if (isNegative && initialValue.charAt(0) !== "-") {
      initialValue = "-" + initialValue;
    }
    return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
  },
  onBeforeWrite: function (e, buffer, caretPos, opts) {
    function stripBuffer(buffer, stripRadix) {
      if (opts.__financeInput !== false || stripRadix) {
        var position = buffer.indexOf(opts.radixPoint);
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
    let result, leadingzeroes;
    if (opts.stripLeadingZeroes && (leadingzeroes = checkForLeadingZeroes(buffer, opts))) {
      const caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1),
        offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0;
      for (let i = leadingzeroes[0].length - offset; i > 0; i--) {
        this.maskset.validPositions.splice(caretNdx + i, 1);
        delete buffer[caretNdx + i];
      }
    }
    if (e) {
      switch (e.type) {
        case "blur":
        case "checkval":
          if (opts.min !== null || opts.max !== null) {
            const unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend({}, opts, {
              unmaskAsNumber: true
            }));
            if (opts.min !== null && unmasked < opts.min && buffer.join() !== "") {
              return {
                refreshFromBuffer: true,
                buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
              };
            } else if (opts.max !== null && unmasked > opts.max) {
              return {
                refreshFromBuffer: true,
                buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
              };
            }
          }
          if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
            // strip negation symbol on blur when value is 0
            const nmbrMtchs = new RegExp("(^" + (opts.negationSymbol.front != "" ? (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.negationSymbol.front) + "?" : "") + (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.prefix) + ")(.*)(" + (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.suffix) + (opts.negationSymbol.back != "" ? (0,_escapeRegex__WEBPACK_IMPORTED_MODULE_0__/* .escapeRegex */ .$)(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), true).reverse().join("")),
              number = nmbrMtchs ? nmbrMtchs[2] : "";
            if (number == 0) {
              result = {
                refreshFromBuffer: true,
                buffer: [0]
              };
            }
          } else if (opts.radixPoint !== "") {
            // strip radixpoint on blur when it is the latest char
            const radixNDX = buffer.indexOf(opts.radixPoint);
            if (radixNDX === opts.suffix.length) {
              if (result && result.buffer) {
                result.buffer.splice(0, 1 + opts.suffix.length);
              } else {
                buffer.splice(0, 1 + opts.suffix.length);
                result = {
                  refreshFromBuffer: true,
                  buffer: stripBuffer(buffer)
                };
              }
            }
          }
          if (opts.enforceDigitsOnBlur) {
            result = result || {};
            const bffr = (result && result.buffer || buffer).slice().reverse();
            result.refreshFromBuffer = true;
            result.buffer = alignDigits(bffr, opts.digits, opts, true).reverse();
          }
      }
    }
    return result;
  },
  onKeyDown: function (e, buffer, caretPos, opts) {
    let $input = (0,_dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(this),
      bffr;
    if (e.location != 3) {
      let pattern,
        c = e.key;
      if (pattern = opts.shortcuts && opts.shortcuts[c]) {
        if (pattern.length > 1) {
          this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) * parseInt(pattern));
          $input.trigger("setvalue");
          return false;
        }
      }
    }
    if (e.ctrlKey) {
      switch (e.key) {
        case _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.ArrowUp:
          this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
          $input.trigger("setvalue");
          return false;
        case _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.ArrowDown:
          this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
          $input.trigger("setvalue");
          return false;
      }
    }
    if (!e.shiftKey && (e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.Delete || e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.Backspace || e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.BACKSPACE_SAFARI) && caretPos.begin !== buffer.length) {
      if (buffer[e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.Delete ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) {
        bffr = buffer.slice().reverse();
        if (opts.negationSymbol.front !== "") bffr.shift();
        if (opts.negationSymbol.back !== "") bffr.pop();
        $input.trigger("setvalue", [bffr.join(""), caretPos.begin]);
        return false;
      } else if (opts._radixDance === true) {
        const radixPos = buffer.indexOf(opts.radixPoint);
        if (!opts.digitsOptional) {
          if (radixPos !== -1 && (caretPos.begin < radixPos || caretPos.end < radixPos || e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.Delete && (caretPos.begin === radixPos || caretPos.begin - 1 === radixPos))) {
            let restoreCaretPos;
            if (caretPos.begin === caretPos.end) {
              // only adjust when not a selection
              if (e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.Backspace || e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.BACKSPACE_SAFARI) caretPos.begin++;else if (e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.Delete && caretPos.begin - 1 === radixPos) {
                restoreCaretPos = _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend({}, caretPos);
                caretPos.begin--;
                caretPos.end--;
              }
            }
            bffr = buffer.slice().reverse();
            bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end || 1);
            if (e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.Backspace || e.key === _keycode__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.BACKSPACE_SAFARI) bffr.splice(bffr.length - caretPos.end + 1, 0, "0");
            // console.log(caretPos);
            bffr = alignDigits(bffr, opts.digits, opts).join("");
            if (restoreCaretPos) {
              caretPos = restoreCaretPos;
            }
            $input.trigger("setvalue", [bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin]);
            return false;
          }
        } else if (radixPos === 0) {
          bffr = buffer.slice().reverse();
          bffr.pop();
          $input.trigger("setvalue", [bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin]);
          return false;
        }
      }
    }
  }
};
const currencyAlias = {
  prefix: "",
  // "$ ",
  groupSeparator: ",",
  // alias: "numeric",
  digits: 2,
  digitsOptional: false
};
const decimalAlias = {
  // alias: "numeric"
};
const integerAlias = {
  // alias: "numeric",
  inputmode: "numeric",
  digits: 0
};
const percentageAlias = {
  // alias: "numeric",
  min: 0,
  max: 100,
  suffix: " %",
  digits: 0,
  allowMinus: false
};
const indiannsAlias = {
  // indian numbering system
  // alias: "numeric",
  _mask: function (opts) {
    return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
  },
  groupSeparator: ",",
  radixPoint: ".",
  placeholder: "0",
  digits: 2,
  digitsOptional: false
};

function numeric(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend(true, {}, numericAlias, options);
}
function currency(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend(true, {}, numericAlias, currencyAlias, options);
}
function decimal(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend(true, {}, numericAlias, decimalAlias, options);
}
function integer(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend(true, {}, numericAlias, integerAlias, options);
}
function percentage(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend(true, {}, numericAlias, percentageAlias, options);
}
function indianns(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend(true, {}, numericAlias, indiannsAlias, options);
}
function registerNumeric() {
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.extend(true, _inputmask__WEBPACK_IMPORTED_MODULE_1__/* .aliases */ .z2, {
    numeric: numericAlias,
    currency: {
      alias: "numeric",
      ...currencyAlias
    },
    decimal: {
      alias: "numeric",
      ...decimalAlias
    },
    integer: {
      alias: "numeric",
      ...integerAlias
    },
    percentage: {
      alias: "numeric",
      ...percentageAlias
    },
    indianns: {
      alias: "numeric",
      ...indiannsAlias
    }
  });
}

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./numeric.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(574);
const __webpack_exports__currency = __webpack_exports__.Gl;
const __webpack_exports__decimal = __webpack_exports__._;
const __webpack_exports__indianns = __webpack_exports__.VM;
const __webpack_exports__integer = __webpack_exports__.nd;
const __webpack_exports__numeric = __webpack_exports__.sH;
const __webpack_exports__percentage = __webpack_exports__.X1;
const __webpack_exports__registerNumeric = __webpack_exports__.pd;
export { __webpack_exports__currency as currency, __webpack_exports__decimal as decimal, __webpack_exports__indianns as indianns, __webpack_exports__integer as integer, __webpack_exports__numeric as numeric, __webpack_exports__percentage as percentage, __webpack_exports__registerNumeric as registerNumeric };
