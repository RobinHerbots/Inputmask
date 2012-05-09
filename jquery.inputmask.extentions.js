/*
Input Mask plugin extentions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.6

Optional extentions on the jquery.inputmask base
*/
(function($) {
    //extra definitions
    $.extend($.inputmask.defaults.definitions, {
        'A': { //auto uppercasing
            validator: "[A-Za-z]",
            cardinality: 1,
            casing: "upper"
        }
    });
    //date & time aliases
    $.extend($.inputmask.defaults.definitions, {
        'h': { //hours
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-2]", cardinality: 1}]
        },
        's': { //seconds || minutes
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-5]", cardinality: 1}]
        },
        'd': { //basic day
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-3]", cardinality: 1}]
        },
        'm': { //basic month
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [{ validator: "[01]", cardinality: 1}]
        },
        'y': { //basic year
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [
                        { validator: "[12]", cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
                        ]
        }
    });
    $.extend($.inputmask.defaults.aliases, {
        'dd/mm/yyyy': {
            mask: "d/m/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                monthpre: new RegExp("[01]"),
                month: new RegExp("((0[1-9]|[12][0-9])\/(0[1-9]|1[012]))|(30\/(0[13-9]|1[012]))|(31\/(0[13578]|1[02]))"),
                year: new RegExp("(19|20)\\d{2}"),
                daypre: new RegExp("[0-3]"),
                day: new RegExp("0[1-9]|[12][0-9]|3[01]")
            },
            definitions: {
                'd': { //day
                    validator: function(chrs, buffer, pos, strict, opts) {
                        var isValid = opts.regex.day.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == '/') {
                                isValid = opts.regex.day.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    buffer[pos] = chrs.charAt(0);
                                    pos++;
                                    return pos;
                                }
                            }
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                        var isValid = opts.regex.daypre.test(chrs);
                        if (!strict && !isValid) {
                            isValid = opts.regex.day.test("0" + chrs);
                            if (isValid) {
                                buffer[pos] = "0";
                                pos++;
                                return pos;
                            }
                        }
                        return isValid;
                    }, cardinality: 1}]
                    },
                    'm': { //month
                        validator: function(chrs, buffer, pos, strict, opts) {
                            var dayValue = buffer.join('').substr(0, 3);
                            var isValid = opts.regex.month.test(dayValue + chrs);
                            if (!strict && !isValid) {
                                if (chrs.charAt(1) == '/') {
                                    isValid = opts.regex.month.test(dayValue + "0" + chrs.charAt(0));
                                    if (isValid) {
                                        buffer[pos - 1] = "0";
                                        buffer[pos] = chrs.charAt(0);
                                        pos++;
                                        return pos;
                                    }
                                }
                            }
                            return isValid;
                        },
                        cardinality: 2,
                        prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                            var isValid = opts.regex.monthpre.test(chrs);
                            if (!strict && !isValid) {
                                var dayValue = buffer.join('').substr(0, 3);
                                isValid = opts.regex.month.test(dayValue + "0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return pos;
                                }
                            }
                            return isValid;
                        }, cardinality: 1}]
                        },
                        'y': { //year
                            validator: function(chrs, buffer, pos, strict, opts) {
                                if (opts.regex.year.test(chrs)) {
                                    var dayMonthValue = buffer.join('').substr(0, 6);
                                    if (dayMonthValue != "29/02/")
                                        return true;
                                    else {
                                        var year = parseInt(chrs);  //detect leap year
                                        if (year % 4 == 0)
                                            if (year % 100 == 0)
                                            if (year % 400 == 0)
                                            return true;
                                        else return false;
                                        else return true;
                                        else return false;
                                    }
                                } else return false;
                            },
                            cardinality: 4,
                            prevalidator: [
                        { validator: "[12]", cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
                        ]
                        }
                    },
                    insertMode: false,
                    autoUnmask: false
                },
                'mm/dd/yyyy': {
                    mask: "m/d/y",
                    placeholder: "mm/dd/yyyy",
                    regex: {
                        day: new RegExp("((0[1-9]|1[012])\/(0[1-9]|[12][0-9]))|((0[13-9]|1[012])\/30)|((0[13578]|1[02])\/31)"),
                        daypre: new RegExp("((0[13-9]|1[012])\/[0-3])|(02\/[0-2])"),
                        month: new RegExp("0[1-9]|1[012]"),
                        monthpre: new RegExp("[01]"),
                        year: new RegExp("(19|20)\\d{2}")
                    },
                    definitions: {
                        'd': { //day
                            validator: function(chrs, buffer, pos, strict, opts) {
                                var monthValue = buffer.join('').substr(0, 3);
                                var isValid = opts.regex.day.test(monthValue + chrs);
                                if (!strict && !isValid) {
                                    if (chrs.charAt(1) == '/') {
                                        isValid = opts.regex.day.test(monthValue + "0" + chrs.charAt(0));
                                        if (isValid) {
                                            buffer[pos - 1] = "0";
                                            buffer[pos] = chrs.charAt(0);
                                            pos++;
                                            return pos;
                                        }
                                    }
                                }
                                return isValid;
                            },
                            cardinality: 2,
                            prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                                var monthValue = buffer.join('').substr(0, 3);
                                var isValid = opts.regex.daypre.test(monthValue + chrs);
                                if (!strict && !isValid) {
                                    isValid = opts.regex.day.test(monthValue + "0" + chrs);
                                    if (isValid) {
                                        buffer[pos] = "0";
                                        pos++;
                                        return pos;
                                    }
                                }
                                return isValid;
                            },
                                cardinality: 1}]
                            },
                            'm': { //month
                                validator: function(chrs, buffer, pos, strict, opts) {
                                    var isValid = opts.regex.month.test(chrs);
                                    if (!strict && !isValid) {
                                        if (chrs.charAt(1) == '/') {
                                            isValid = opts.regex.month.test("0" + chrs.charAt(0));
                                            if (isValid) {
                                                buffer[pos - 1] = "0";
                                                buffer[pos] = chrs.charAt(0);
                                                pos++;
                                                return pos;
                                            }
                                        }
                                    }
                                    return isValid;
                                },
                                cardinality: 2,
                                prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                                    var isValid = opts.regex.monthpre.test(chrs);
                                    if (!strict && !isValid) {
                                        isValid = opts.regex.month.test("0" + chrs);
                                        if (isValid) {
                                            buffer[pos] = "0";
                                            pos++;
                                            return pos;
                                        }
                                    }
                                    return isValid;
                                }, cardinality: 1}]
                                },
                                'y': { //year
                                    validator: function(chrs, buffer, pos, strict, opts) {
                                        if (opts.regex.year.test(chrs)) {
                                            var monthDayValue = buffer.join('').substr(0, 6);
                                            if (monthDayValue != "02/29/")
                                                return true;
                                            else {
                                                var year = parseInt(chrs);  //detect leap year
                                                if (year % 4 == 0)
                                                    if (year % 100 == 0)
                                                    if (year % 400 == 0)
                                                    return true;
                                                else return false;
                                                else return true;
                                                else return false;
                                            }
                                        } else return false;
                                    },
                                    cardinality: 4,
                                    prevalidator: [
                        { validator: "[12]", cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
                        ]
                                }
                            },
                            insertMode: false,
                            autoUnmask: false
                        },
                        'hh:mm:ss': {
                            mask: "h:s:s",
                            autoUnmask: false
                        },
                        'hh:mm': {
                            mask: "h:s",
                            autoUnmask: false
                        },
                        'date': {
                            alias: "dd/mm/yyyy" // "mm/dd/yyyy"
                        },
                        'datetime': {
                            mask: "d/m/y h:s",
                            placeholder: "dd/mm/yyyy hh:mm",
                            alias: "date"
                        }
                    });
                    //number aliases 
                    $.extend($.inputmask.defaults, {
                        radixPoint: "\.", // | ","
                        digits: "*", //numer of digits
                        groupSeparator: ",", // | "\."
                        groupSize: 3
                    });
                    $.extend($.inputmask.defaults.aliases, {
                        'decimal': {
                            mask: "~",
                            placeholder: "",
                            repeat: 10,
                            greedy: false,
                            numericInput: true,
                            regex: {
                            number: function(radixPoint, digits) { return new RegExp("^[\+\\d\-]{1}\\d*[" + radixPoint + "]?\\d" + digits + "$"); }
                            },
                            definitions: {
                                '~': { //real number
                                    validator: function(chrs, buffer, pos, strict, opts) {
                                        function digitExpression() {
                                            return isNaN(opts.digits) ? opts.digits : '{0,' + opts.digits + '}';
                                        }
                                        var cbuf = buffer.slice();
                                        cbuf.splice(pos, 0, chrs);
                                        var bufferStr = cbuf.join('');
                                        var isValid = opts.regex.number(opts.radixPoint, digitExpression()).test(bufferStr);
                                        if (!isValid) {
                                            if (strict) { //shiftL & shiftR use strict only validate from 0 to position
                                                var cbuf = buffer.slice(0, pos);
                                                cbuf.splice(pos, 0, chrs);
                                                var bufferStr = cbuf.join('');
                                                var isValid = opts.regex.number(opts.radixPoint, digitExpression()).test(bufferStr);
                                            }
                                            else {
                                                if (bufferStr == opts.radixPoint) {
                                                    isValid = opts.regex.number(opts.radixPoint, digitExpression()).test("0" + bufferStr);
                                                    if (isValid) {
                                                        buffer[pos] = "0";
                                                        pos++;
                                                        return pos;
                                                    }
                                                }
                                            }
                                        }
                                        //todo grouping, radixpoint positioning
                                        return isValid;
                                    },
                                    cardinality: 1,
                                    prevalidator: null
                                }
                            },
                            insertMode: true
                        },
                        'non-negative-decimal': {
                            regex: {
                                number: function(radixPoint, digits) { return new RegExp("^\\d+[" + radixPoint + "]?\\d" + digits + "$"); }
                            },
                            alias: "decimal"
                        },
                        'integer': {
                            regex: {
                                number: function() { return new RegExp("^([\+\-]?\\d*)$"); }
                            },
                            alias: "decimal"
                        }
                    });
                })(jQuery);