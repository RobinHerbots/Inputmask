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
    function isLeapYear(year) {
        return isNaN(year) || new Date(year, 2, 0).getDate() === 29;
    }

    Inputmask.extendAliases({
        "dd/mm/yyyy": {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"), //daypre
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"), //day
                val2pre: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])");
                }, //monthpre
                val2: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))");
                } //month
            },
            leapday: "29/02/",
            separator: "/",
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            },
            isInYearRange: function (chrs, minyear, maxyear) {
                if (isNaN(chrs)) return false;
                var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length)));
                var enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
                return (!isNaN(enteredyear) ? minyear <= enteredyear && enteredyear <= maxyear : false) ||
                    (!isNaN(enteredyear2) ? minyear <= enteredyear2 && enteredyear2 <= maxyear : false);
            },
            determinebaseyear: function (minyear, maxyear, hint) {
                var currentyear = (new Date()).getFullYear();
                if (minyear > currentyear) return minyear;
                if (maxyear < currentyear) {
                    var maxYearPrefix = maxyear.toString().slice(0, 2);
                    var maxYearPostfix = maxyear.toString().slice(2, 4);
                    while (maxyear < maxYearPrefix + hint) {
                        maxYearPrefix--;
                    }
                    var maxxYear = maxYearPrefix + maxYearPostfix;
                    return minyear > maxxYear ? minyear : maxxYear;
                }
                if (minyear <= currentyear && currentyear <= maxyear) {
                    var currentYearPrefix = currentyear.toString().slice(0, 2);
                    while (maxyear < currentYearPrefix + hint) {
                        currentYearPrefix--;
                    }
                    var currentYearAndHint = currentYearPrefix + hint;
                    return currentYearAndHint < minyear ? minyear : currentYearAndHint;
                }
                return currentyear;
            },
            onKeyDown: function (e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString());
                    $input.trigger("setvalue");
                }
            },
            getFrontValue: function (mask, buffer, opts) {
                var start = 0,
                    length = 0;
                for (var i = 0; i < mask.length; i++) {
                    if (mask.charAt(i) === "2") break;
                    var definition = opts.definitions[mask.charAt(i)];
                    if (definition) {
                        start += length;
                        length = definition.cardinality;
                    } else length++;
                }
                return buffer.join("").substr(start, length);
            },
            postValidation: function (buffer, currentResult, opts) {
                var dayMonthValue, year, bufferStr = buffer.join("");
                if (opts.mask.indexOf("y") === 0) {
                    year = bufferStr.substr(0, 4);
                    dayMonthValue = bufferStr.substring(4, 10);
                } else {
                    year = bufferStr.substring(6, 10);
                    dayMonthValue = bufferStr.substr(0, 6);
                }

                return currentResult && (dayMonthValue !== opts.leapday ? true : isLeapYear(year));
            },
            definitions: {
                "1": { //val1 ~ day or month
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.regex.val1.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) === opts.separator || "-./".indexOf(chrs.charAt(1)) !== -1) {
                                isValid = opts.regex.val1.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    maskset.buffer[pos - 1] = "0";
                                    return {
                                        "refreshFromBuffer": {
                                            start: pos - 1,
                                            end: pos
                                        },
                                        "pos": pos,
                                        "c": chrs.charAt(0)
                                    };
                                }
                            }
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, maskset, pos, strict, opts) {
                            var pchrs = chrs;
                            if (!isNaN(maskset.buffer[pos + 1])) pchrs += maskset.buffer[pos + 1];
                            var isValid = pchrs.length === 1 ? opts.regex.val1pre.test(pchrs) : opts.regex.val1.test(pchrs);

                            if (isValid && maskset.validPositions[pos]) { //check if total is valid if defined
                                if (!opts.regex.val2(opts.separator).test(chrs + maskset.validPositions[pos].input)) {
                                    maskset.validPositions[pos].input = (chrs === "0" ? "1" : "0");
                                }
                            }

                            if (!strict && !isValid) {
                                isValid = opts.regex.val1.test(chrs + "0");
                                if (isValid) {
                                    maskset.buffer[pos] = chrs;
                                    maskset.buffer[++pos] = "0";
                                    return {
                                        "pos": pos,
                                        "c": "0"
                                    };
                                }
                                isValid = opts.regex.val1.test("0" + chrs);
                                if (isValid) {
                                    maskset.buffer[pos] = "0";
                                    pos++;
                                    return {
                                        "pos": pos
                                    };
                                }
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }]
                },
                "2": { //val2 ~ day or month
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                        if (frontValue.indexOf(opts.placeholder[0]) !== -1) frontValue = "01" + opts.separator;
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) === opts.separator || "-./".indexOf(chrs.charAt(1)) !== -1) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0));
                                if (isValid) {
                                    maskset.buffer[pos - 1] = "0";
                                    return {
                                        "refreshFromBuffer": {
                                            start: pos - 1,
                                            end: pos
                                        },
                                        "pos": pos,
                                        "c": chrs.charAt(0)
                                    };
                                }
                            }
                        }

                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, maskset, pos, strict, opts) {
                            if (!isNaN(maskset.buffer[pos + 1])) chrs += maskset.buffer[pos + 1];
                            var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                            if (frontValue.indexOf(opts.placeholder[0]) !== -1) frontValue = "01" + opts.separator;
                            var isValid = chrs.length === 1 ? opts.regex.val2pre(opts.separator).test(frontValue + chrs) : opts.regex.val2(opts.separator).test(frontValue + chrs);

                            if (isValid && maskset.validPositions[pos]) { //check if total is valid if defined
                                if (!opts.regex.val2(opts.separator).test(chrs + maskset.validPositions[pos].input)) {
                                    maskset.validPositions[pos].input = (chrs === "0" ? "1" : "0");
                                }
                            }

                            if (!strict && !isValid) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs);
                                if (isValid) {
                                    maskset.buffer[pos] = "0";
                                    pos++;
                                    return {
                                        "pos": pos
                                    };
                                }
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }]
                },
                "y": { //year
                    validator: function (chrs, maskset, pos, strict, opts) {
                        return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                    },
                    cardinality: 4,
                    prevalidator: [{
                        validator: function (chrs, maskset, pos, strict, opts) {
                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (!strict && !isValid) {
                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);

                                isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                                if (isValid) {
                                    maskset.buffer[pos++] = yearPrefix.charAt(0);
                                    return {
                                        "pos": pos
                                    };
                                }
                                yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2);

                                isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                                if (isValid) {
                                    maskset.buffer[pos++] = yearPrefix.charAt(0);
                                    maskset.buffer[pos++] = yearPrefix.charAt(1);
                                    return {
                                        "pos": pos
                                    };
                                }
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }, {
                        validator: function (chrs, maskset, pos, strict, opts) {
                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (!strict && !isValid) {
                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);

                                isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear);
                                if (isValid) {
                                    maskset.buffer[pos++] = yearPrefix.charAt(1);
                                    return {
                                        "pos": pos
                                    };
                                }

                                yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                                isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                                if (isValid) {
                                    maskset.buffer[pos - 1] = yearPrefix.charAt(0);
                                    maskset.buffer[pos++] = yearPrefix.charAt(1);
                                    maskset.buffer[pos++] = chrs.charAt(0);
                                    return {
                                        "refreshFromBuffer": {
                                            start: pos - 3,
                                            end: pos
                                        },
                                        "pos": pos
                                    };
                                }
                            }
                            return isValid;
                        },
                        cardinality: 2
                    }, {
                        validator: function (chrs, maskset, pos, strict, opts) {
                            return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        },
                        cardinality: 3
                    }]
                }
            },
            insertMode: false,
            autoUnmask: false
        },
        "mm/dd/yyyy": {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy", //reuse functionality of dd/mm/yyyy alias
            regex: {
                val2pre: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                }
                , //daypre
                val2: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                }
                , //day
                val1pre: new RegExp("[01]"), //monthpre
                val1: new RegExp("0[1-9]|1[012]") //month
            }
            ,
            leapday: "02/29/",
            onKeyDown: function (e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString());
                    $input.trigger("setvalue");
                }
            }
        }
        ,
        "yyyy/mm/dd": {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyDown: function (e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString());
                    $input.trigger("setvalue");
                }
            }
        }
        ,
        "dd.mm.yyyy": {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: ".",
            alias: "dd/mm/yyyy"
        }
        ,
        "dd-mm-yyyy": {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: "-",
            alias: "dd/mm/yyyy"
        }
        ,
        "mm.dd.yyyy": {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: ".",
            alias: "mm/dd/yyyy"
        }
        ,
        "mm-dd-yyyy": {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: "-",
            alias: "mm/dd/yyyy"
        }
        ,
        "yyyy.mm.dd": {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: ".",
            alias: "yyyy/mm/dd"
        }
        ,
        "yyyy-mm-dd": {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: "-",
            alias: "yyyy/mm/dd"
        }
        ,
        "datetime": {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"), //hours pre
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"), //hours
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"), //minutes/seconds pre
                ms: new RegExp("[0-5][0-9]")
            }
            ,
            timeseparator: ":",
            hourFormat: "24", // or 12
            definitions: {
                "h": { //hours
                    validator: function (chrs, maskset, pos, strict, opts) {
                        if (opts.hourFormat === "24") {
                            if (parseInt(chrs, 10) === 24) {
                                maskset.buffer[pos - 1] = "0";
                                maskset.buffer[pos] = "0";
                                return {
                                    "refreshFromBuffer": {
                                        start: pos - 1,
                                        end: pos
                                    },
                                    "c": "0"
                                };
                            }
                        }

                        var isValid = opts.regex.hrs.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) === opts.timeseparator || "-.:".indexOf(chrs.charAt(1)) !== -1) {
                                isValid = opts.regex.hrs.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    maskset.buffer[pos - 1] = "0";
                                    maskset.buffer[pos] = chrs.charAt(0);
                                    pos++;
                                    return {
                                        "refreshFromBuffer": {
                                            start: pos - 2,
                                            end: pos
                                        },
                                        "pos": pos,
                                        "c": opts.timeseparator
                                    };
                                }
                            }
                        }

                        if (isValid && opts.hourFormat !== "24" && opts.regex.hrs24.test(chrs)) {

                            var tmp = parseInt(chrs, 10);

                            if (tmp === 24) {
                                maskset.buffer[pos + 5] = "a";
                                maskset.buffer[pos + 6] = "m";
                            } else {
                                maskset.buffer[pos + 5] = "p";
                                maskset.buffer[pos + 6] = "m";
                            }

                            tmp = tmp - 12;

                            if (tmp < 10) {
                                maskset.buffer[pos] = tmp.toString();
                                maskset.buffer[pos - 1] = "0";
                            } else {
                                maskset.buffer[pos] = tmp.toString().charAt(1);
                                maskset.buffer[pos - 1] = tmp.toString().charAt(0);
                            }

                            return {
                                "refreshFromBuffer": {
                                    start: pos - 1,
                                    end: pos + 6
                                },
                                "c": maskset.buffer[pos]
                            };
                        }

                        return isValid;
                    }
                    ,
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.hrspre.test(chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.hrs.test("0" + chrs);
                                if (isValid) {
                                    maskset.buffer[pos] = "0";
                                    pos++;
                                    return {
                                        "pos": pos
                                    };
                                }
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }]
                }
                ,
                "s": { //seconds || minutes
                    validator: "[0-5][0-9]",
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.mspre.test(chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.ms.test("0" + chrs);
                                if (isValid) {
                                    maskset.buffer[pos] = "0";
                                    pos++;
                                    return {
                                        "pos": pos
                                    };
                                }
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }]
                }
                ,
                "t": { //am/pm
                    validator: function (chrs, maskset, pos, strict, opts) {
                        return opts.regex.ampm.test(chrs + "m");
                    }
                    ,
                    casing: "lower",
                    cardinality: 1
                }
            }
            ,
            insertMode: false,
            autoUnmask: false
        }
        ,
        "datetime12": {
            mask: "1/2/y h:s t\\m",
            placeholder: "dd/mm/yyyy hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        }
        ,
        "mm/dd/yyyy hh:mm xm": {
            mask: "1/2/y h:s t\\m",
            placeholder: "mm/dd/yyyy hh:mm xm",
            alias: "datetime12",
            regex: {
                val2pre: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                }
                ,
                val2: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                }
                ,
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            }
            ,
            leapday: "02/29/",
            onKeyDown: function (e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString());
                    $input.trigger("setvalue");
                }
            }
        }
        ,
        "hh:mm t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        }
        ,
        "h:s t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        }
        ,
        "hh:mm:ss": {
            mask: "h:s:s",
            placeholder: "hh:mm:ss",
            alias: "datetime",
            autoUnmask: false
        }
        ,
        "hh:mm": {
            mask: "h:s",
            placeholder: "hh:mm",
            alias: "datetime",
            autoUnmask: false
        }
        ,
        "date": {
            alias: "dd/mm/yyyy" // "mm/dd/yyyy"
        }
        ,
        "mm/yyyy": {
            mask: "1/y",
            placeholder: "mm/yyyy",
            leapday: "donotuse",
            separator: "/",
            alias: "mm/dd/yyyy"
        }
        ,
        "shamsi": {
            regex: {
                val2pre: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "[0-3])");
                }
                ,
                val2: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + escapedSeparator + "30)|((0[1-6])" + escapedSeparator + "31)");
                }
                ,
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            }
            ,
            yearrange: {
                minyear: 1300,
                maxyear: 1499
            }
            ,
            mask: "y/1/2",
            leapday: "/12/30",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            clearIncomplete: true
        },
        "yyyy-mm-dd hh:mm:ss": {
            mask: "y-1-2 h:s:s",
            placeholder: "yyyy-mm-dd hh:mm:ss",
            alias: "datetime",
            separator: "-",
            leapday: "-02-29",
            regex: {
                val2pre: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                }, //daypre
                val2: function (separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                }, //day
                val1pre: new RegExp("[01]"), //monthpre
                val1: new RegExp("0[1-9]|1[012]") //month
            },
            onKeyDown: function (e, buffer, caretPos, opts) {
            }
        }
    });

    return Inputmask;
}));
