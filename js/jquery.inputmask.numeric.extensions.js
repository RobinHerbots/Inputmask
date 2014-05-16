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
                var mask = opts.prefix;
                mask += "[+]";
                mask += "~{1," + opts.integerDigits + "}";
                if (opts.digits != undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                    if (opts.digitsOptional)
                        mask += "[" + opts.radixPoint + "~{" + opts.digits + "}]";
                    else mask += opts.radixPoint + "~{" + opts.digits + "}";
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
            integerDigits: "*", //number of integerDigits
            defaultValue: "",
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
                if (opts.groupSeparator == "") return pos;
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
                    var reg = new RegExp('([-\+]?[\\d\?]+)([\\d\?]{' + opts.groupSize + '})');
                    while (reg.test(bufVal)) {
                        bufVal = bufVal.replace(reg, '$1' + opts.groupSeparator + '$2');
                        bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
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

                return reformatOnly ? pos : newPos;
            },
            onKeyDown: function (e, buffer, opts) {
                var $input = $(this), input = this;
                if (opts.autoGroup && e.keyCode == opts.keyCode.DELETE || e.keyCode == opts.keyCode.BACKSPACE) {
                    opts.postFormat(buffer, 0, true, opts);
                    return { "refreshFromBuffer": true };
                }
            },
            regex: {
                integerPart: function (opts) { return new RegExp('[-\+]?\\d+'); }
            },
            definitions: {
                '~': {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        if (!strict && chrs === "-") {
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
                        var isValid = strict ? new RegExp("[0-9" + $.inputmask.escapeRegex.call(this, opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);

                        if (isValid != false && !strict && chrs != opts.radixPoint && opts.autoGroup === true) {
                            var newPos = opts.postFormat(buffer, pos, (chrs == "-" || chrs == "+") ? true : false, opts);
                            return { "pos": newPos, "refreshFromBuffer": true };
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
                }
            },
            insertMode: true,
            autoUnmask: false
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
