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
            escapedTxt += "\\" + txt.charAt(i)
        } else escapedTxt += txt.charAt(i);
    }
    return escapedTxt;
}

function alignDigits(buffer, opts) {
    if (buffer.length > 0) {
        var radixPosition = $.inArray(opts.radixPoint, buffer);
        if (radixPosition === -1) {
            buffer.push(opts.radixPoint);
            radixPosition = buffer.length - 1;
        }
        for (var i = 1; i <= opts.digits; i++) {
            buffer[radixPosition + i] = buffer[radixPosition + i] || "0";
        }
    }
    return buffer;
}

//number aliases
Inputmask.extendAliases({
    "numeric": {
        mask: function (opts) {
            opts.repeat = 0;
            //treat equal separator and radixpoint
            if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
                if (opts.radixPoint === ".") {
                    opts.groupSeparator = ",";
                } else if (opts.radixPoint === ",") {
                    opts.groupSeparator = ".";
                } else opts.groupSeparator = "";
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

            if (opts.numericInput === true) { //finance people input style
                opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
                opts.digitsOptional = false;
                if (isNaN(opts.digits)) opts.digits = 2;
                opts._radixDance = false;
            } else opts.numericInput = true;

            var mask = "[+]";
            mask += autoEscape(opts.prefix, opts);
            if (opts.groupSeparator !== "")
                mask += "(" + opts.groupSeparator + "999){+|1}";
            else mask += "9{+}";
            if (opts.digits !== undefined) {
                var dq = opts.digits.toString().split(",");
                if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
                    mask += opts.radixPoint + "0{" + opts.digits + "}";
                } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
                    if (opts.digitsOptional) {
                        mask += "[" + opts.radixPoint + "0{1," + opts.digits + "}]";
                    } else mask += opts.radixPoint + "0{" + opts.digits + "}";
                }
            }
            mask += autoEscape(opts.suffix, opts);
            mask += "[-]";

            opts.greedy = false; //enforce greedy false


            console.log(mask);
            return mask;
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
        definitions: {
            "0": {
                validator: "[0-9\uFF11-\uFF19]"
            },
            "+": {
                validator: function (chrs, maskset, pos, strict, opts) {
                    console.log("+ " + pos);
                    return (opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front));

                }
            },
            "-": {
                validator: function (chrs, maskset, pos, strict, opts) {
                    console.log("- " + pos);
                    return (opts.allowMinus && chrs === opts.negationSymbol.back);
                }
            }
        },
        preValidation: function (buffer, pos, c, isSelection, opts, maskset) {
            if (c === "-" || c === opts.negationSymbol.front) {
                if (opts.allowMinus !== true) return false;
                return {
                    insert: {pos: buffer.length, c: c, fromIsValid: true} //numericinput ~ pos 0
                };
            }
            if (isSelection === false && c === opts.radixPoint && (opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0))) {
                var radixPos = $.inArray(opts.radixPoint, buffer);
                if (radixPos !== pos)
                    return {
                        "caret": opts._radixDance && pos > radixPos ? radixPos : radixPos - 1
                    };
            }

            return true;
        },
        postValidation: function (buffer, pos, currentResult, opts) {
            return currentResult;
        },
        onBeforeWrite: function (e, buffer, caretPos, opts) {
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

            var input = this;
            if (e) {
                switch (e.type) {
                    case "blur":
                    case "checkval":
                        var unmasked;
                        parseMinMaxOptions(opts);
                        if (opts.min !== null || opts.max !== null) {
                            unmasked = opts.onUnMask(buffer.join(""), undefined, $.extend({}, opts, {
                                unmaskAsNumber: true
                            }));
                            if (opts.min !== null && unmasked < opts.min) {
                                input.value = opts.min;
                                $(input).trigger("setvalue");
                            } else if (opts.max !== null && unmasked > opts.max) {
                                input.value = opts.max;
                                $(input).trigger("setvalue");
                            }
                        }
                }
            }
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
            opts.isNegative = undefined;
            var radixPoint = opts.radixPoint || ",";

            if ((typeof initialValue == "number" || opts.inputType === "number") && radixPoint !== "") {
                initialValue = initialValue.toString().replace(".", radixPoint);
            }

            var valueParts = initialValue.split(radixPoint),
                integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
                decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "";

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
                    if (isFinite(initialValue))
                        initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor;
                    initialValue = initialValue.toString().replace(".", radixPoint);
                }
            }
            //this needs to be in a separate part and not directly in decimalPart to allow rounding
            if (opts.digits === 0 && initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) !== -1) {
                initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)));
            }
            return alignDigits(initialValue.toString().split(""), digits, opts).join("");
        },
        onKeyDown: function (e, buffer, caretPos, opts) {
            //     TODO FIXME
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
        digitsOptional: true,
        radixPoint: ".",
        placeholder: "0",
        groupSeparator: "",
        min: 0,
        max: 100,
        suffix: " %",
        allowMinus: false
    },
    "indianns": { //indian numbering system
        alias: "numeric",
        mask: function (opts) {
            opts.repeat = 0;
            opts.groupSeparator = ",";
            opts.radixPoint = ".";
            //only allow radixfocus when placeholder = 0
            if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "") {
                opts.positionCaretOnClick = "lvp";
            }

            if (opts.numericInput === true) { //finance people input style
                opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
                opts.digitsOptional = false;
                if (isNaN(opts.digits)) opts.digits = 2;
                opts._radixDance = false;
            } else opts.numericInput = true;

            var mask = "[+]";
            mask += autoEscape(opts.prefix, opts);
            mask += "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";

            if (opts.digits !== undefined) {
                var dq = opts.digits.toString().split(",");
                if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
                    mask += opts.radixPoint + "0{" + opts.digits + "}";
                } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
                    if (opts.digitsOptional) {
                        mask += "[" + opts.radixPoint + "0{1," + opts.digits + "}]";
                    } else mask += opts.radixPoint + "0{" + opts.digits + "}";
                }
            }
            mask += autoEscape(opts.suffix, opts);
            mask += "[-]";

            opts.greedy = false; //enforce greedy false


            console.log(mask);
            return mask;
        },
        placeholder: "0",
        digits: 2,
        digitsOptional: false
    }
});
module.exports = Inputmask;
