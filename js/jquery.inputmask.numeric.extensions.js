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
                if (opts.repeat !== 0 && isNaN(opts.integerDigits)) {
                    opts.integerDigits = opts.repeat;
                }
                opts.repeat = 0;

                opts.autoGroup = opts.autoGroup && opts.groupSeparator != "";

                if (opts.autoGroup && isFinite(opts.integerDigits)) {
                    var seps = Math.floor(opts.integerDigits / opts.groupSize);
                    var mod = opts.integerDigits % opts.groupSize;
                    opts.integerDigits += mod == 0 ? seps - 1 : seps;
                }

                var mask = opts.prefix;
                mask += "[+]";
                mask += "~{1," + opts.integerDigits + "}";
                if (opts.digits != undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                    if (opts.digitsOptional)
                        mask += "[" + ":" + "~{" + opts.digits + "}]";
                    else mask += ":" + "~{" + opts.digits + "}";
                }
                mask += opts.suffix;
                return mask;
            },
            placeholder: "",
            greedy: false,
            digits: "*", //number of fractionalDigits
            digitsOptional: true,
            groupSeparator: "",//",", // | "."
            radixPoint: ".",
            groupSize: 3,
            autoGroup: false,
            allowPlus: true,
            allowMinus: true,
            integerDigits: "+", //number of integerDigits
            prefix: "",
            suffix: "",
            skipRadixDance: false, //disable radixpoint caret positioning
            getLastValidPosition: function (maskset, closestTo, opts) {
                var lastValidPosition = -1, valids = maskset["validPositions"];
                for (var posNdx in valids) {
                    var psNdx = parseInt(posNdx);
                    if (psNdx > lastValidPosition) lastValidPosition = psNdx;
                }

                if (closestTo != undefined) {
                    var buffer = maskset["buffer"];
                    if (opts.skipRadixDance === false && opts.radixPoint != "" && $.inArray(opts.radixPoint, buffer) != -1)
                        lastValidPosition = $.inArray(opts.radixPoint, buffer);
                }

                return lastValidPosition;
            },
            rightAlign: true,
            postFormat: function (buffer, pos, reformatOnly, opts) {
                var needsRefresh = false;
                if (opts.groupSeparator == "" || ($.inArray(opts.radixPoint, buffer) != -1 && pos >= $.inArray(opts.radixPoint, buffer))) return { pos: pos };
                var cbuf = buffer.slice();
                if (!reformatOnly) {
                    cbuf.splice(pos, 0, "?"); //set position indicator
                }
                var bufVal = cbuf.join('');
                if (opts.autoGroup || (reformatOnly && bufVal.indexOf(opts.groupSeparator) != -1)) {
                    var escapedGroupSeparator = $.inputmask.escapeRegex.call(this, opts.groupSeparator);
                    bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), '');
                    var radixSplit = bufVal.split(opts.radixPoint);
                    bufVal = radixSplit[0];
                    if (bufVal != (opts.prefix + "?0")) {
                        needsRefresh = true;
                        var reg = new RegExp('([-\+]?[\\d\?]+)([\\d\?]{' + opts.groupSize + '})');
                        while (reg.test(bufVal)) {
                            bufVal = bufVal.replace(reg, '$1' + opts.groupSeparator + '$2');
                            bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                        }
                    }
                    if (radixSplit.length > 1)
                        bufVal += opts.radixPoint + radixSplit[1];
                }
                buffer.length = bufVal.length; //align the length
                for (var i = 0, l = bufVal.length; i < l; i++) {
                    buffer[i] = bufVal.charAt(i);
                }
                var newPos = $.inArray("?", buffer);
                if (!reformatOnly) buffer.splice(newPos, 1);

                return { pos: reformatOnly ? pos : newPos, "refreshFromBuffer": needsRefresh };
            },
            onKeyDown: function (e, buffer, opts) {
                if (opts.autoGroup && (e.keyCode == opts.keyCode.DELETE || e.keyCode == opts.keyCode.BACKSPACE)) {
                    return opts.postFormat(buffer, 0, true, opts);
                }
            },
            onKeyPress: function (e, buffer, opts) {
                var k = (e.which || e.charCode || e.keyCode);
                if (k == 46 && e.shiftKey == false && opts.radixPoint == ",") k = 44;
                if (opts.autoGroup && String.fromCharCode(k) == opts.radixPoint) {
                    var refresh = opts.postFormat(buffer, 0, true, opts);
                    refresh.caret = $.inArray(opts.radixPoint, buffer) + 1;
                    return refresh;
                }
            },
            regex: {
                integerPart: function (opts) { return new RegExp('[-\+]?\\d+'); }
            },
            negationhandler: function (chrs, buffer, pos, strict, opts) {
                if (!strict && opts.allowMinus && chrs === "-") {
                    var matchRslt = buffer.join('').match(opts.regex.integerPart(opts));

                    if (matchRslt.length > 0) {
                        if (buffer[matchRslt.index] == "+") {
                            buffer.splice(matchRslt.index, 1);
                            return { "pos": matchRslt.index, "c": "-", "refreshFromBuffer": true, "caret": pos };
                        } else if (buffer[matchRslt.index] == "-") {
                            buffer.splice(matchRslt.index, 1);
                            return { "refreshFromBuffer": true, "caret": pos - 1 };
                        } else {
                            return { "pos": matchRslt.index, "c": "-", "caret": pos + 1 };
                        }
                    }
                }
                return false;
            },
            definitions: {
                '~': {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.negationhandler(chrs, buffer, pos, strict, opts);
                        if (!isValid) {
                            isValid = strict ? new RegExp("[0-9" + $.inputmask.escapeRegex.call(this, opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);

                            //handle 0 for integerpart
                            if (isValid != false) {
                                var matchRslt = buffer.join('').match(opts.regex.integerPart(opts)), radixPosition = $.inArray(opts.radixPoint, buffer);
                                if (matchRslt && matchRslt["0"][0] == "0" && pos >= opts.prefix.length && (radixPosition == -1 || pos < radixPosition)) {
                                    buffer.splice(matchRslt.index, 1);
                                } else if (chrs == "0" && matchRslt && matchRslt["0"].length > 0 && pos == opts.prefix.length) {
                                    return false;
                                }
                            }
                            if (isValid != false && !strict && chrs != opts.radixPoint && opts.autoGroup === true) {
                                isValid = opts.postFormat(buffer, pos, (chrs == "-" || chrs == "+") ? true : false, opts);
                            }
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                '+': {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var signed = "[";
                        if (opts.allowMinus === true) signed += "-";
                        if (opts.allowPlus === true) signed += "\+";
                        signed += "]";
                        var isValid = new RegExp(signed).test(chrs);
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                ':': {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.negationhandler(chrs, buffer, pos, strict, opts);
                        if (!isValid) {
                            var radix = "[" + $.inputmask.escapeRegex.call(this, opts.radixPoint) + "]";
                            isValid = new RegExp(radix).test(chrs);
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null
                }
            },
            insertMode: true,
            autoUnmask: false,
            onUnMask: function (maskedValue, unmaskedValue, opts) {
                var processValue = maskedValue.replace(opts.prefix, "");
                processValue = processValue.replace(opts.suffix, "");
                processValue = processValue.replace(new RegExp(opts.groupSeparator, "g"), "");
                processValue = processValue.replace(opts.radixPoint, ".");
                return Number(processValue);
            },
            isComplete: function (buffer, opts) {
                var maskedValue = buffer.join('');
                var processValue = maskedValue.replace(opts.prefix, "");
                processValue = processValue.replace(opts.suffix, "");
                processValue = processValue.replace(new RegExp(opts.groupSeparator, "g"), "");
                processValue = processValue.replace(opts.radixPoint, ".");
                return isFinite(processValue);
            },
            onBeforeMask: function (initialValue, opts) {
                return isFinite(initialValue) ? initialValue.toString().replace(".", opts.radixPoint) : initialValue;
            }
        },
        'decimal': {
            alias: "numeric"
        },
        'integer': {
            alias: "numeric",
            digits: "0"
        }
    });
})(jQuery);
