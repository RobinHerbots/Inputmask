/*!
* inputmask.date.extensions.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.1-beta.12
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "./dependencyLibs/inputmask.dependencyLib", "./inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
}(function($, Inputmask) {
    var formatCode = {
        d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
        dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
            return pad(Date.prototype.getDate.call(this), 2);
        } ],
        ddd: [ "" ],
        dddd: [ "" ],
        m: [ "[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
            return Date.prototype.getMonth.call(this) + 1;
        } ],
        mm: [ "0[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
            return pad(Date.prototype.getMonth.call(this) + 1, 2);
        } ],
        mmm: [ "" ],
        mmmm: [ "" ],
        yy: [ "[0-9]{2}", Date.prototype.setFullYear, "year", function() {
            return pad(Date.prototype.getFullYear.call(this), 2);
        } ],
        yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
            return pad(Date.prototype.getFullYear.call(this), 4);
        } ],
        h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
        hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
            return pad(Date.prototype.getHours.call(this), 2);
        } ],
        hhh: [ "[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours ],
        H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
        HH: [ "[01][0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
            return pad(Date.prototype.getHours.call(this), 2);
        } ],
        HHH: [ "[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours ],
        M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
        MM: [ "[0-5][0-9]", Date.prototype.setMinutes, "minutes", function() {
            return pad(Date.prototype.getMinutes.call(this), 2);
        } ],
        s: [ "[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds ],
        ss: [ "[0-5][0-9]", Date.prototype.setSeconds, "seconds", function() {
            return pad(Date.prototype.getSeconds.call(this), 2);
        } ],
        l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
            return pad(Date.prototype.getMilliseconds.call(this), 3);
        } ],
        L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
            return pad(Date.prototype.getMilliseconds.call(this), 2);
        } ],
        t: [ "[ap]" ],
        tt: [ "[ap]m" ],
        T: [ "[AP]" ],
        TT: [ "[AP]M" ],
        Z: [ "" ],
        o: [ "" ],
        S: [ "" ]
    }, formatAlias = {
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    function getTokenizer(opts) {
        if (!opts.tokenizer) {
            var tokens = [];
            for (var ndx in formatCode) -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
            opts.tokenizer = "(" + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g");
        }
        return opts.tokenizer;
    }
    function parse(format, dateObjValue, opts) {
        for (var match, mask = ""; match = getTokenizer(opts).exec(format); ) {
            if (void 0 === dateObjValue) if (formatCode[match[0]]) mask += "(" + formatCode[match[0]][0] + ")"; else switch (match[0]) {
              case "[":
                mask += "(";
                break;

              case "]":
                mask += ")?";
                break;

              default:
                mask += Inputmask.escapeRegex(match[0]);
            } else if (formatCode[match[0]]) mask += formatCode[match[0]][3].call(dateObjValue.date); else mask += match[0];
        }
        return mask;
    }
    function pad(val, len) {
        for (val = String(val), len = len || 2; val.length < len; ) val = "0" + val;
        return val;
    }
    function analyseMask(maskString, format, opts) {
        var targetProp, match, dateOperation, targetValidator, dateObj = {
            date: new Date(1, 0, 1)
        }, mask = maskString;
        function extendProperty(value) {
            var correctedValue;
            if (opts.min && opts.min[targetProp] || opts.max && opts.max[targetProp]) {
                var min = opts.min && opts.min[targetProp] || opts.max[targetProp], max = opts.max && opts.max[targetProp] || opts.min[targetProp];
                for (correctedValue = value.replace(/[^0-9]/g, ""), correctedValue += (min.indexOf(correctedValue) < max.indexOf(correctedValue) ? max : min).toString().substr(correctedValue.length); !new RegExp(targetValidator).test(correctedValue); ) correctedValue--;
            } else correctedValue = value.replace(/[^0-9]/g, "0");
            return correctedValue;
        }
        function setValue(dateObj, value, opts) {
            dateObj[targetProp] = extendProperty(value), dateObj["raw" + targetProp] = value, 
            void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
        }
        if ("string" == typeof mask) {
            for (;match = getTokenizer(opts).exec(format); ) {
                var value = mask.slice(0, match[0].length);
                formatCode.hasOwnProperty(match[0]) && (targetValidator = formatCode[match[0]][0], 
                targetProp = formatCode[match[0]][2], dateOperation = formatCode[match[0]][1], setValue(dateObj, value)), 
                mask = mask.slice(value.length);
            }
            return dateObj;
        }
    }
    return Inputmask.extendAliases({
        datetime: {
            mask: function(opts) {
                return formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, 
                opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, 
                opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, 
                opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[\[\]]/, ""), 
                opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), 
                opts.regex = parse(opts.inputFormat, void 0, opts), null;
            },
            placeholder: "",
            inputFormat: "isoDateTime",
            displayFormat: void 0,
            outputFormat: void 0,
            min: null,
            max: null,
            i18n: {
                dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                ordinalSuffix: [ "st", "nd", "rd", "th" ]
            },
            postValidation: function(buffer, pos, currentResult, opts) {
                var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = (result = function(dateParts, currentResult) {
                    return (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) && currentResult;
                }(dateParts, result)) && function(dateParts, opts) {
                    var result = !0;
                    if (opts.min) {
                        if (dateParts.rawyear) {
                            var rawYear = dateParts.rawyear.replace(/[^0-9]/g, "");
                            result = opts.min.year.substr(0, rawYear.length) <= rawYear;
                        }
                        dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime());
                    }
                    return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), 
                    result;
                }(dateParts, opts)), result && currentResult.pos !== pos ? {
                    buffer: parse(opts.inputFormat, dateParts, opts),
                    refreshFromBuffer: {
                        start: pos,
                        end: currentResult.pos
                    }
                } : result;
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    for (var match, today = new Date(), date = ""; match = getTokenizer(opts).exec(opts.inputFormat); ) "d" === match[0].charAt(0) ? date += pad(today.getDate(), match[0].length) : "m" === match[0].charAt(0) ? date += pad(today.getMonth() + 1, match[0].length) : "yyyy" === match[0] ? date += today.getFullYear().toString() : "y" === match[0].charAt(0) && (date += pad(today.getYear(), match[0].length));
                    this.inputmask._valueSet(date), $(this).trigger("setvalue");
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts);
            },
            casing: function(elem, test, pos, validPositions) {
                return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem;
            },
            insertMode: !1
        }
    }), Inputmask;
});