/*!
* inputmask.date.extensions.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-53
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "./dependencyLibs/inputmask.dependencyLib", "./inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
}(function($, Inputmask) {
    function getTokenizer(opts) {
        return opts.tokenizer || (opts.tokenizer = "(" + $.map(formatCode, function(lmnt, ndx) {
            return ndx;
        }).join("|") + ")+|.", opts.tokenizer = new RegExp(opts.tokenizer, "g")), opts.tokenizer;
    }
    function isLeapYear(year) {
        return 29 === new Date(year, 2, 0).getDate();
    }
    function isDateInRange(maskDate, opts) {
        var result = !0;
        return opts.min && opts.min.date.getTime() === opts.min.date.getTime() && (result = result && opts.min.date.getTime() <= maskDate.getTime()), 
        opts.max && opts.max.date.getTime() === opts.max.date.getTime() && (result = result && opts.max.date.getTime() >= maskDate.getTime()), 
        result;
    }
    function parse(format, opts) {
        for (var match, mask = ""; match = getTokenizer(opts).exec(format); ) mask += formatCode[match[0]] ? "(" + ($.isFunction(formatCode[match[0]]) ? formatCode[match[0]](opts.min, opts.max) : formatCode[match[0]]) + ")" : match[0];
        return mask;
    }
    function analyseMask(maskString, format, opts) {
        function extendYear(year) {
            var correctedyear = 4 === year.length ? year : new Date().getFullYear().toString().substr(0, 4 - year.length) + year;
            return opts.min && opts.min.year && opts.max && opts.max.year ? (correctedyear = correctedyear.replace(/[^0-9]/g, ""), 
            correctedyear = year.charAt(0) === opts.max.year.charAt(0) ? year.replace(/[^0-9]/g, "0") : correctedyear + opts.min.year.substr(correctedyear.length)) : correctedyear = correctedyear.replace(/[^0-9]/g, "0"), 
            correctedyear;
        }
        var targetProp, match, dateObj = {}, mask = maskString;
        if ("string" == typeof mask) {
            for (;match = getTokenizer(opts).exec(format); ) if ("d" === match[0].charAt(0)) targetProp = "day"; else if ("m" === match[0].charAt(0)) targetProp = "month"; else if ("y" === match[0].charAt(0)) targetProp = "year"; else if ("h" === match[0].charAt(0).toLowerCase()) targetProp = "hour"; else if ("M" === match[0].charAt(0)) targetProp = "minutes"; else if ("s" === match[0].charAt(0)) targetProp = "seconds"; else if (formatCode.hasOwnProperty(match[0])) targetProp = "unmatched"; else {
                var value = mask.split(match[0])[0];
                "year" === targetProp ? (dateObj[targetProp] = extendYear(value), dateObj["raw" + targetProp] = value) : dateObj[targetProp] = opts.min && value.match(/[^0-9]/) ? opts.min[targetProp] : value, 
                mask = mask.slice((value + match[0]).length), targetProp = void 0;
            }
            return void 0 !== targetProp && ("year" === targetProp ? (dateObj[targetProp] = extendYear(mask), 
            dateObj["raw" + targetProp] = mask) : dateObj[targetProp] = mask.replace(/[^0-9]/g, "0")), 
            dateObj.date = new Date(dateObj.year + "-" + dateObj.month + "-" + dateObj.day + "T" + dateObj.hour + ":" + dateObj.minutes + ":" + dateObj.seconds), 
            dateObj;
        }
    }
    var formatCode = {
        d: "[1-9]|[12][0-9]|3[01]",
        dd: "0[1-9]|[12][0-9]|3[01]",
        ddd: "",
        dddd: "",
        m: "[1-9]|1[012]",
        mm: "0[1-9]|1[012]",
        mmm: "",
        mmmm: "",
        yy: "[0-9]{2}",
        yyyy: "[0-9]{4}",
        h: "[1-9]|1[0-2]",
        hh: "0[1-9]|1[0-2]",
        H: "1?[1-9]|2[0-4]",
        HH: "[01][1-9]|2[0-4]",
        M: "[1-5]?[0-9]",
        MM: "[0-5][0-9]",
        s: "[1-5]?[0-9]",
        ss: "[0-5][0-9]",
        l: "",
        L: "",
        t: "",
        tt: "",
        T: "",
        TT: "",
        Z: "",
        o: "",
        S: ""
    }, formatAlias = {
        default: "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    return Inputmask.extendAliases({
        datetime: {
            mask: function(opts) {
                return opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, 
                opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, 
                opts.placeholder = opts.placeholder !== Inputmask.prototype.defaults.placeholder ? opts.placeholder : opts.inputFormat, 
                opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), 
                opts.regex = parse(opts.inputFormat, opts), null;
            },
            inputFormat: "dd/mm/yyyy HH:MM",
            displayFormat: void 0,
            outputFormat: void 0,
            min: null,
            max: null,
            postValidation: function(buffer, currentResult, opts) {
                var dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts), result = currentResult;
                return result && isFinite(dateParts.rawyear) && (result = result && ("29" !== dateParts.day || !isLeapYear(dateParts.rawyear))), 
                result && dateParts.date.getTime() === dateParts.date.getTime() && (result = result && isDateInRange(dateParts.date, opts)), 
                result;
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                var input = this;
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    for (var match, today = new Date(), date = ""; match = getTokenizer(opts).exec(opts.inputFormat); ) "d" === match[0].charAt(0) ? date += today.getDate().toString() : "m" === match[0].charAt(0) ? date += (today.getMonth() + 1).toString() : "yyyy" === match[0] ? date += today.getFullYear().toString() : "yy" === match[0] && (date += today.getYear().toString());
                    input.inputmask._valueSet(date), $(input).trigger("setvalue");
                }
            },
            insertMode: !1
        }
    }), Inputmask;
});