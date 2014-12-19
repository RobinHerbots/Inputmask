/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0

Optional extensions on the jquery.inputmask base
*/
(function ($) {
    //number aliases
    $.extend($.inputmask.defaults.aliases, {
        'numeric': {
            mask: function (opts) {
                function autoEscape(txt) {
                    var escapedTxt = "";
                    for (var i = 0; i < txt.length; i++) {
                        escapedTxt += opts.definitions[txt[i]] ? "\\" + txt[i] : txt[i];
                    }
                    return escapedTxt;
                }
                if (opts.repeat !== 0 && isNaN(opts.integerDigits)) {
                    opts.integerDigits = opts.repeat;
                }
                opts.repeat = 0;
                if (opts.groupSeparator == opts.radixPoint) { //treat equal separator and radixpoint
                    if (opts.radixPoint == ".")
                        opts.groupSeparator = ",";
                    else if (opts.radixPoint == ",")
                        opts.groupSeparator = ".";
                    else opts.groupSeparator = "";
                }
                if (opts.groupSeparator === " ") { //prevent conflict with default skipOptionalPartCharacter
                    opts.skipOptionalPartCharacter = undefined;
                }
                opts.autoGroup = opts.autoGroup && opts.groupSeparator != "";
                if (opts.autoGroup) {
                    if (typeof opts.groupSize == "string" && isFinite(opts.groupSize)) opts.groupSize = parseInt(opts.groupSize);
                    if (isFinite(opts.integerDigits)) {
                        var seps = Math.floor(opts.integerDigits / opts.groupSize);
                        var mod = opts.integerDigits % opts.groupSize;
                        opts.integerDigits = parseInt(opts.integerDigits) + (mod == 0 ? seps - 1 : seps);
                    }
                }

                opts.definitions[";"] = opts.definitions["~"]; //clone integer def for decimals

                var mask = autoEscape(opts.prefix);
                mask += "[+]";
                mask += "~{1," + opts.integerDigits + "}";
                if (opts.digits != undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                    if (opts.digitsOptional)
                        mask += "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}]";
                    else mask += (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}";
                }
                mask += autoEscape(opts.suffix);

                opts.greedy = false; //enforce greedy false
                return mask;
            },
            placeholder: "",
            greedy: false,
            digits: "*", //number of fractionalDigits
            digitsOptional: true,
            groupSeparator: "",//",", // | "."
            radixPoint: ".",
            radixFocus: true,
            groupSize: 3,
            autoGroup: false,
            allowPlus: true,
            allowMinus: true,
            integerDigits: "+", //number of integerDigits
            prefix: "",
            suffix: "",
            rightAlign: true,
            decimalProtect: true, //do not allow assumption of decimals input without entering the radixpoint
            postFormat: function (buffer, pos, reformatOnly, opts) {  //this needs to be removed // this is crap
                //position overflow corrections
                pos = pos >= buffer.length ? buffer.length - 1 : (pos < opts.prefix.length ? opts.prefix.length : pos);

                var needsRefresh = false, charAtPos = buffer[pos];
                if (opts.groupSeparator == "" ||
                    ($.inArray(opts.radixPoint, buffer) != -1 && pos >= $.inArray(opts.radixPoint, buffer)) ||
                    new RegExp('[-\+]').test(charAtPos)
                    )
                    return { pos: pos };
                var cbuf = buffer.slice();
                if (charAtPos == opts.groupSeparator) {
                    cbuf.splice(pos--, 1);
                    charAtPos = cbuf[pos];
                }
                if (reformatOnly) cbuf[pos] = "?"; else cbuf.splice(pos, 0, "?"); //set position indicator
                var bufVal = cbuf.join('');
                if (bufVal.length > 0 && opts.autoGroup || (reformatOnly && bufVal.indexOf(opts.groupSeparator) != -1)) {
                    var escapedGroupSeparator = $.inputmask.escapeRegex.call(this, opts.groupSeparator);
                    needsRefresh = bufVal.indexOf(opts.groupSeparator) == 0;
                    bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), '');
                    var radixSplit = bufVal.split(opts.radixPoint);
                    bufVal = opts.radixPoint == "" ? bufVal : radixSplit[0];
                    if (bufVal != (opts.prefix + "?0") && bufVal.length >= (opts.groupSize + opts.prefix.length)) {
                        //needsRefresh = true;
                        var reg = new RegExp('([-\+]?[\\d\?]+)([\\d\?]{' + opts.groupSize + '})');
                        while (reg.test(bufVal)) {
                            bufVal = bufVal.replace(reg, '$1' + opts.groupSeparator + '$2');
                            bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                        }
                    }
                    if (opts.radixPoint != "" && radixSplit.length > 1)
                        bufVal += opts.radixPoint + radixSplit[1];
                }
                needsRefresh = buffer.join('') != bufVal;
                buffer.length = bufVal.length; //align the length
                for (var i = 0, l = bufVal.length; i < l; i++) {
                    buffer[i] = bufVal.charAt(i);
                }
                var newPos = $.inArray("?", buffer);
                if (reformatOnly) buffer[newPos] = charAtPos; else buffer.splice(newPos, 1);

                return { pos: newPos, "refreshFromBuffer": needsRefresh };
            },
            onBeforeWrite: function (e, buffer, caretPos, opts) {
                if (e && e.type == "blur") {
                    var tmpBufSplit = opts.radixPoint != "" ? buffer.join('').split(opts.radixPoint) : [buffer.join('')],
                   matchRslt = tmpBufSplit[0].match(opts.regex.integerPart(opts)),
                   matchRsltDigits = tmpBufSplit.length == 2 ? tmpBufSplit[1].match(opts.regex.integerNPart(opts)) : undefined;
                    if (matchRslt && matchRslt[0] == "-0" && (matchRsltDigits == undefined || matchRsltDigits[0].match(/^0+$/))) {
                        buffer.splice(matchRslt.index, 1);
                    }
                    var radixPosition = $.inArray(opts.radixPoint, buffer);
                    if (radixPosition != -1 && isFinite(opts.digits) && !opts.digitsOptional) {
                        for (var i = 1; i <= opts.digits; i++) {
                            if (buffer[radixPosition + i] == undefined || buffer[radixPosition + i] == opts.placeholder.charAt(0)) buffer[radixPosition + i] = "0";
                        }
                        return { "refreshFromBuffer": true, "buffer": buffer };
                    }
                }

                if (opts.autoGroup) {
                    var rslt = opts.postFormat(buffer, caretPos - 1, true, opts);
                    rslt.caret = rslt.pos + 1;
                    return rslt;
                }
            },
            regex: {
                integerPart: function (opts) { return new RegExp('[-\+]?\\d+'); },
                integerNPart: function (opts) { return new RegExp('[\\d' + $.inputmask.escapeRegex.call(this, opts.groupSeparator) + ']+'); }
            },
            signHandler: function (chrs, maskset, pos, strict, opts) {
                if (!strict && (opts.allowMinus && chrs === "-" || opts.allowPlus && chrs === "+")) {
                    var matchRslt = maskset.buffer.join('').match(opts.regex.integerPart(opts));

                    if (matchRslt && matchRslt[0].length > 0) {
                        if (maskset.buffer[matchRslt.index] == (chrs === "-" ? "+" : "-")) {
                            return { "pos": matchRslt.index, "c": chrs, "remove": matchRslt.index, "caret": pos };
                        } else if (maskset.buffer[matchRslt.index] == (chrs === "-" ? "-" : "+")) {
                            return { "remove": matchRslt.index, "caret": pos - 1 };
                        } else {
                            return { "pos": matchRslt.index, "c": chrs, "caret": pos + 1 };
                        }
                    }
                }
                return false;
            },
            radixHandler: function (chrs, maskset, pos, strict, opts) {
                if (!strict && chrs === opts.radixPoint && opts.digits > 0) {
                    var radixPos = $.inArray(opts.radixPoint, maskset.buffer), integerValue = maskset.buffer.join('').match(opts.regex.integerPart(opts));

                    if (radixPos != -1 && maskset["validPositions"][radixPos]) {
                        if (maskset["validPositions"][radixPos - 1])
                            return { "caret": radixPos + 1 };
                        else return { "pos": integerValue.index, c: integerValue[0], "caret": radixPos + 1 };
                    } else if (!integerValue || (integerValue["0"] == "0" && (integerValue.index + 1) != pos)) {
                        maskset.buffer[integerValue ? integerValue.index : pos] = "0";
                        return { "pos": (integerValue ? integerValue.index : pos) + 1 };
                    }
                }
                return false;
            },
            leadingZeroHandler: function (chrs, maskset, pos, strict, opts) {
                var matchRslt = maskset.buffer.join('').match(opts.regex.integerNPart(opts)), radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                if (matchRslt && !strict && (radixPosition == -1 || pos <= radixPosition)) {
                    if (matchRslt["0"].indexOf("0") == 0) {
                        if (pos < opts.prefix.length) pos = matchRslt.index; //position
                        var _radixPosition = $.inArray(opts.radixPoint, maskset._buffer);
                        var digitsMatch = maskset._buffer && maskset.buffer.slice(radixPosition).join('') == maskset._buffer.slice(_radixPosition).join('');
                        var integerMatch = maskset._buffer && maskset.buffer.slice(matchRslt.index, radixPosition).join('') == maskset._buffer.slice(opts.prefix.length, _radixPosition).join('');

                        if (radixPosition == -1 || digitsMatch && integerMatch) {
                            maskset.buffer.splice(matchRslt.index, 1);
                            pos = pos > matchRslt.index ? pos - 1 : matchRslt.index;
                            return { "pos": pos, "remove": matchRslt.index };
                        } else if (matchRslt.index + 1 == pos || chrs == "0") {
                            maskset.buffer.splice(matchRslt.index, 1);
                            pos = matchRslt.index;
                            return { "pos": pos, "remove": matchRslt.index };
                        }
                    } else if (chrs === "0" && pos <= matchRslt.index) {
                        return false;
                    }
                }
                return true;
            },
            definitions: {
                '~': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid) {
                            isValid = opts.radixHandler(chrs, maskset, pos, strict, opts);
                            if (!isValid) {
                                isValid = strict ? new RegExp("[0-9" + $.inputmask.escapeRegex.call(this, opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
                                if (isValid === true) {
                                    isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts);
                                    if (isValid === true) {
                                        //handle overwrite when fixed precision
                                        var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                                        if (opts.digitsOptional === false && pos > radixPosition && !strict) {
                                            isValid = { "pos": pos, "remove": pos };
                                        } else isValid = { pos: pos };
                                    }
                                }
                            }
                        }

                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                '+': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid) {
                            isValid = (opts.allowMinus && chrs == "-") || (opts.allowPlus && chrs == "+");
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ''
                },
                ':': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid) {
                            var radix = "[" + $.inputmask.escapeRegex.call(this, opts.radixPoint) + "]";
                            isValid = new RegExp(radix).test(chrs);
                            if (isValid && maskset["validPositions"][pos] && maskset["validPositions"][pos]["match"].placeholder == opts.radixPoint) {
                                isValid = { "caret": pos + 1 };
                            }
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: function (opts) { return opts.radixPoint; }
                }
            },
            insertMode: true,
            autoUnmask: false,
            onUnMask: function (maskedValue, unmaskedValue, opts) {
                var processValue = maskedValue.replace(opts.prefix, "");
                processValue = processValue.replace(opts.suffix, "");
                processValue = processValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), "");
                //processValue = processValue.replace($.inputmask.escapeRegex.call(this, opts.radixPoint), ".");
                return processValue;
            },
            isComplete: function (buffer, opts) {
                var maskedValue = buffer.join(''), bufClone = buffer.slice();
                //verify separator positions
                opts.postFormat(bufClone, 0, true, opts);
                if (bufClone.join('') != maskedValue) return false;

                var processValue = maskedValue.replace(opts.prefix, "");
                processValue = processValue.replace(opts.suffix, "");
                processValue = processValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), "");
                processValue = processValue.replace($.inputmask.escapeRegex.call(this, opts.radixPoint), ".");
                return isFinite(processValue);
            },
            onBeforeMask: function (initialValue, opts) {
                if (opts.radixPoint != "" && isFinite(initialValue)) {
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
                        initialValue = initialValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), "");
                    }
                }

                if (opts.digits == 0) {
                    if (initialValue.indexOf(".") != -1) {
                        initialValue = initialValue.substring(0, initialValue.indexOf("."));
                    } else if (initialValue.indexOf(",") != -1) {
                        initialValue = initialValue.substring(0, initialValue.indexOf(","));
                    }
                }

                return initialValue;
            },
            canClearPosition: function (maskset, position, lvp, opts) {
                var canClear = maskset["validPositions"][position].input != opts.radixPoint || position == lvp;

                if (canClear) {
                    var matchRslt = maskset.buffer.join('').match(opts.regex.integerNPart(opts)), radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                    if (matchRslt && (radixPosition == -1 || position <= radixPosition)) {
                        if (matchRslt["0"].indexOf("0") == 0) {
                            canClear = matchRslt.index != position;
                        } else if (radixPosition != -1 && matchRslt["0"].length == 1 && matchRslt.index == position) {
                            maskset["validPositions"][position].input = "0";
                            canClear = false;
                        }
                    }
                }

                if (canClear && maskset["validPositions"][position + 1] && maskset["validPositions"][position + 1].input == opts.groupSeparator) {
                    delete maskset["validPositions"][position + 1];
                }

                return canClear;
            }
        },
        'currency': {
            prefix: "$ ",
            groupSeparator: ",",
            alias: "numeric",
            placeholder: "0",
            autoGroup: true,
            digits: 2,
            digitsOptional: false,
            clearMaskOnLostFocus: false
        },
        'decimal': {
            alias: "numeric"
        },
        'integer': {
            alias: "numeric",
            digits: "0",
            radixPoint: ""
        }
    });
    return $.fn.inputmask;
})(jQuery);