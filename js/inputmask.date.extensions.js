/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 -  Robin Herbots
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
(function ($, Inputmask) {
    var //supported codes for formatting
        //http://blog.stevenlevithan.com/archives/date-time-format
        //https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7
        formatCode = {
            d: "[1-9]|[12][0-9]|3[01]", //Day of the month as digits; no leading zero for single-digit days.
            dd: "0[1-9]|[12][0-9]|3[01]", //Day of the month as digits; leading zero for single-digit days.
            ddd: "", //Day of the week as a three-letter abbreviation.
            dddd: "", //Day of the week as its full name.
            m: "[1-9]|1[012]", //Month as digits; no leading zero for single-digit months.
            mm: "0[1-9]|1[012]", //Month as digits; leading zero for single-digit months.
            mmm: "", //Month as a three-letter abbreviation.
            mmmm: "", //Month as its full name.
            yy: "[0-9]{2}", //Year as last two digits; leading zero for years less than 10.
            yyyy: "[0-9]{4}",
            h: "[1-9]|1[0-2]", //Hours; no leading zero for single-digit hours (12-hour clock).
            hh: "0[1-9]|1[0-2]", //Hours; leading zero for single-digit hours (12-hour clock).
            H: "1?[1-9]|2[0-4]", //Hours; no leading zero for single-digit hours (24-hour clock).
            HH: "[01][1-9]|2[0-4]", //Hours; leading zero for single-digit hours (24-hour clock).
            M: "[1-5]?[0-9]", //Minutes; no leading zero for single-digit minutes. Uppercase M unlike CF timeFormat's m to avoid conflict with months.
            MM: "[0-5][0-9]", //Minutes; leading zero for single-digit minutes. Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
            s: "[1-5]?[0-9]", //Seconds; no leading zero for single-digit seconds.
            ss: "[0-5][0-9]", //Seconds; leading zero for single-digit seconds.
            l: "", //Milliseconds. 3 digits.
            L: "", //Milliseconds. 2 digits.
            t: "", //Lowercase, single-character time marker string: a or p.
            tt: "", //two-character time marker string: am or pm.
            T: "", //single-character time marker string: A or P.
            TT: "", //two-character time marker string: AM or PM.
            Z: "", //US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
            o: "", //GMT/UTC timezone offset, e.g. -0500 or +0230.
            S: "" //The date's ordinal suffix (st, nd, rd, or th). Works well with d.
        },
        formatAlias = {
            default: "ddd mmm dd yyyy HH:MM:ss", //Sat Jun 09 2007 17:46:21
            shortDate: "m/d/yy", //6/9/07
            mediumDate: "mmm d, yyyy", //Jun 9, 2007
            longDate: "mmmm d, yyyy", //June 9, 2007
            fullDate: "dddd, mmmm d, yyyy", //Saturday, June 9, 2007
            shortTime: "h:MM TT", //5:46 PM
            mediumTime: "h:MM:ss TT", //5:46:21 PM
            longTime: "h:MM:ss TT Z", //5:46:21 PM EST
            isoDate: "yyyy-mm-dd", //2007-06-09
            isoTime: "HH:MM:ss", //17:46:21
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss", //2007-06-09T17:46:21
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'" //2007-06-09T22:46:21Z
        };

    function getTokenizer(opts) {
        if (!opts.tokenizer) {
            opts.tokenizer = "(" + $.map(formatCode, function (lmnt, ndx) {
                return ndx;
            }).join("|") + ")+|.";

            opts.tokenizer = new RegExp(opts.tokenizer, "g");
        }

        return opts.tokenizer;
    }

    function isLeapYear(year) {
        return new Date(year, 2, 0).getDate() === 29;
    }

    function isDateInRange(maskDate, opts) {
        var result = true;
        if (opts.min && opts.min.date.getTime() === opts.min.date.getTime()) {
            result = result && opts.min.date.getTime() <= maskDate.getTime();
        }
        if (opts.max && opts.max.date.getTime() === opts.max.date.getTime()) {
            result = result && opts.max.date.getTime() >= maskDate.getTime();
        }

        return result;
    }

    function parse(format, opts) {
        //parse format to regex string
        var mask = "", match;
        while (match = getTokenizer(opts).exec(format)) {
            mask += formatCode[match[0]] ? "(" + ($.isFunction(formatCode[match[0]]) ? formatCode[match[0]](opts.min, opts.max) : formatCode[match[0]]) + ")" : match[0];
        }
        return mask;
    }

    function analyseMask(maskString, format, opts) {
        function extendYear(year) {
            var correctedyear = year.length === 4 ? year : new Date().getFullYear().toString().substr(0, 4 - year.length) + year;
            if (opts.min && opts.min.year && opts.max && opts.max.year) {
                correctedyear = correctedyear.replace(/[^0-9]/g, "");
                correctedyear = year.charAt(0) === opts.max.year.charAt(0) ? year.replace(/[^0-9]/g, "0") : correctedyear + opts.min.year.substr(correctedyear.length);
            } else correctedyear = correctedyear.replace(/[^0-9]/g, "0");
            return correctedyear;
        }


        var dateObj = {
            // day:  "01",
            // month: "01",
            // year: extendYear("____"),
            // hour: "00",
            // minutes: "00",
            // seconds: "00"
        }, targetProp, mask = maskString, match;
        if (typeof mask === "string") {
            while (match = getTokenizer(opts).exec(format)) {
                if (match[0].charAt(0) === "d") {
                    targetProp = "day";
                } else if (match[0].charAt(0) === "m") {
                    targetProp = "month";
                } else if (match[0].charAt(0) === "y") {
                    targetProp = "year";
                } else if (match[0].charAt(0).toLowerCase() === "h") {
                    targetProp = "hour";
                } else if (match[0].charAt(0) === "M") {
                    targetProp = "minutes";
                } else if (match[0].charAt(0) === "s") {
                    targetProp = "seconds";
                } else if (formatCode.hasOwnProperty(match[0])) {
                    targetProp = "unmatched";
                } else { //separatot
                    var value = mask.split(match[0])[0];
                    if (targetProp === "year") {
                        dateObj[targetProp] = extendYear(value);
                        dateObj["raw" + targetProp] = value;
                    }
                    else dateObj[targetProp] = opts.min && value.match(/[^0-9]/) ? opts.min[targetProp] : value;
                    mask = mask.slice((value + match[0]).length);
                    targetProp = undefined;
                }
            }
            if (targetProp !== undefined) {
                if (targetProp === "year") {
                    dateObj[targetProp] = extendYear(mask);
                    dateObj["raw" + targetProp] = mask;
                }
                else dateObj[targetProp] = mask.replace(/[^0-9]/g, "0");
            }
            dateObj.date = new Date(dateObj.year + "-" + dateObj.month + "-" + dateObj.day + "T" + dateObj.hour + ":" + dateObj.minutes + ":" + dateObj.seconds);
            return dateObj;
        }
        return undefined;
    }

    Inputmask.extendAliases({
        "datetime": {
            mask: function (opts) {
                opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat; //resolve possible formatAkias
                opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat; //resolve possible formatAkias
                opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat; //resolve possible formatAkias
                opts.placeholder = opts.placeholder !== Inputmask.prototype.defaults.placeholder ? opts.placeholder : opts.inputFormat;
                opts.min = analyseMask(opts.min, opts.inputFormat, opts);
                opts.max = analyseMask(opts.max, opts.inputFormat, opts);
                opts.regex = parse(opts.inputFormat, opts);
                console.log(opts.regex);
                return null; //migrate to regex mask
            },
            inputFormat: "dd/mm/yyyy HH:MM", //format used to input the date
            displayFormat: undefined, //visual format when the input looses focus
            outputFormat: undefined, //unmasking format
            min: null, //needs to be in the same format as the inputfornat
            max: null, //needs to be in the same format as the inputfornat
            postValidation: function (buffer, currentResult, opts) {
                var dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                var result = currentResult;

                if (result && isFinite(dateParts.rawyear)) {
                    result = result && (dateParts.day !== "29" || !isLeapYear(dateParts.rawyear));
                }
                if (result) {
                    if (dateParts.date.getTime() === dateParts.date.getTime()) { //check for a valid date ~ an invalid date returns NaN which isn't equal
                        result = result && isDateInRange(dateParts.date, opts);
                    }
                }
                return result;
            },
            onKeyDown: function (e, buffer, caretPos, opts) {
                var input = this;
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date(), match, date = "";

                    while (match = getTokenizer(opts).exec(opts.inputFormat)) {
                        if (match[0].charAt(0) === "d") {
                            date += today.getDate().toString();
                        } else if (match[0].charAt(0) === "m") {
                            date += (today.getMonth() + 1).toString();
                        } else if (match[0] === "yyyy") {
                            date += today.getFullYear().toString();
                        } else if (match[0] === "yy") {
                            date += today.getYear().toString();
                        }
                    }

                    input.inputmask._valueSet(date);
                    $(input).trigger("setvalue");
                }
            },
            insertMode: false
        }
    });

    return Inputmask;
}))
;