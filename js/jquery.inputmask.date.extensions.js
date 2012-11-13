/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2012 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 1.2.0

Optional extensions on the jquery.inputmask base
*/
(function($) {
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
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"), //daypre
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"), //day
                val2pre: function(separator) { return new RegExp("((0[1-9]|[12][0-9]|3[01])\\" + separator + "[01])"); }, //monthpre
                val2: function(separator) { return new RegExp("((0[1-9]|[12][0-9])\\" + separator + "(0[1-9]|1[012]))|(30\\" + separator + "(0[13-9]|1[012]))|(31\\" + separator + "(0[13578]|1[02]))"); },//month
                yearpre1: new RegExp("[12]"),
                yearpre2: new RegExp("(19|20)"),
                yearpre3: new RegExp("(19|20)\\d"),
                year: new RegExp("(19|20)\\d{2}")
            },
            leapday: "29/02/",
            separator: '/',
            onKeyUp: function(e, opts) {
                var $input = $(this), input = this;
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString());
                }
            },
            definitions: {
                '1': { //val1 ~ day or month
                    validator: function(chrs, buffer, pos, strict, opts) {
                        var isValid = opts.regex.val1.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator.charAt(opts.separator.length - 1) || "-./".indexOf(chrs.charAt(1)) != -1 ) {
                                isValid = opts.regex.val1.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    return { "pos": pos ,"c": chrs.charAt(0) };
                                }
                            }
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                        var isValid = opts.regex.val1pre.test(chrs);
                        if (!strict && !isValid) {
                            isValid = opts.regex.val1.test("0" + chrs);
                            if (isValid) {
                                buffer[pos] = "0";
                                pos++;
                                return { "pos": pos };
                            }
                        }
                        return isValid;
                    }, cardinality: 1}]
                    },
                    '2': { //val2 ~ day or month
                        validator: function(chrs, buffer, pos, strict, opts) {
                            var frontValue = buffer.join('').substr(0, 3);
                            var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                            if (!strict && !isValid) {
                                if (chrs.charAt(1) == opts.separator.charAt(opts.separator.length - 1) || "-./".indexOf(chrs.charAt(1)) != -1 ) {
                                    isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0));
                                    if (isValid) {
                                        buffer[pos - 1] = "0";
                                        return { "pos": pos, "c": chrs.charAt(0) };
                                    }
                                }
                            }
                            return isValid;
                        },
                        cardinality: 2,
                        prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                            var frontValue = buffer.join('').substr(0, 3);
                            var isValid = opts.regex.val2pre(opts.separator).test(frontValue + chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1}]
                        },
                        'y': { //year
                            validator: function(chrs, buffer, pos, strict, opts) {
                                if (opts.regex.year.test(chrs)) {
                                    var dayMonthValue = buffer.join('').substr(0, 6);
                                    if (dayMonthValue != opts.leapday)
                                        return true;
                                    else {
                                        var year = parseInt(chrs,10);//detect leap year
                                        if (year % 4 === 0)
                                            if (year % 100 === 0)
                                            if (year % 400 === 0)
                                            return true;
                                        else return false;
                                        else return true;
                                        else return false;
                                    }
                                } else return false;
                            },
                            cardinality: 4,
                            prevalidator: [
                        { validator: function(chrs, buffer, pos, strict, opts) {
                            var isValid = opts.regex.yearpre1.test(chrs);
                            if (!strict && !isValid) {
                                var yearPrefix = (new Date()).getFullYear().toString().slice(0, 2);

                                isValid = opts.regex.yearpre3.test(yearPrefix + chrs);
                                if (isValid) {
                                    buffer[pos++] = yearPrefix[0];
                                    buffer[pos++] = yearPrefix[1];
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        },
                            cardinality: 1
                        },
                        { validator: function(chrs, buffer, pos, strict, opts) {
                            var isValid = opts.regex.yearpre2.test(chrs);
                            if (!strict && !isValid) {
                                var yearPrefix = (new Date()).getFullYear().toString().slice(0, 2);
                                if (opts.regex.year.test(yearPrefix + chrs)) {
                                    var dayMonthValue = buffer.join('').substr(0, 6);
                                    if (dayMonthValue != opts.leapday)
                                        isValid = true;
                                    else {
                                        var year = parseInt(chrs,10);//detect leap year
                                        if (year % 4 === 0)
                                            if (year % 100 === 0)
                                            if (year % 400 === 0)
                                            isValid = true;
                                        else isValid = false;
                                        else isValid = true;
                                        else isValid = false;
                                    }
                                } else isValid = false;
                                if (isValid) {
                                    buffer[pos-1] = yearPrefix[0];
                                    buffer[pos++] = yearPrefix[1];
                                    buffer[pos++] = chrs[0];
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
                        ]
                        }
                    },
                    insertMode: false,
                    autoUnmask: false
                },
                'mm/dd/yyyy': {
                    placeholder: "mm/dd/yyyy",
                    alias: "dd/mm/yyyy", //reuse functionality of dd/mm/yyyy alias
                    regex: {
                        val2pre: function(separator) { return new RegExp("((0[13-9]|1[012])\\" + separator + "[0-3])|(02\\" + separator + "[0-2])"); }, //daypre
                        val2: function(separator) { return new RegExp("((0[1-9]|1[012])\\" + separator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])\\" + separator + "30)|((0[13578]|1[02])\\" + separator + "31)"); }, //day
                        val1pre: new RegExp("[01]"), //monthpre
                        val1: new RegExp("0[1-9]|1[012]") //month
                    },
                    leapday: "02/29/",
                    onKeyUp: function(e, opts) {
                        var $input = $(this), input = this;
                        if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                            var today = new Date();
                            $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString());
                        }
                    }
                },
                'yyyy/mm/dd': {
                    mask: "y/1/2",
                    placeholder: "yyyy/mm/dd",
                    alias: "mm/dd/yyyy",
                    leapday: "/02/29",
                    onKeyUp: function(e, opts) {
                        var $input = $(this), input = this;
                        if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                            var today = new Date();
                            $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString());
                        }
                    },
                    definitions: {
                        '2': { //val2 ~ day or month
                            validator: function(chrs, buffer, pos, strict, opts) {
                                var frontValue = buffer.join('').substr(5, 3);
                                var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                                if (!strict && !isValid) {
                                    if (chrs.charAt(1) == opts.separator.charAt(opts.separator.length - 1) || "-./".indexOf(chrs.charAt(1)) != -1 ) {
                                        isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0));
                                        if (isValid) {
                                            buffer[pos - 1] = "0";
                                            return { "pos": pos, "c": chrs.charAt(0) };
                                        }
                                    }
                                }

                                //check leap yeap
                                if (isValid) {
                                    var dayMonthValue = buffer.join('').substr(4, 4) + chrs;
                                    if (dayMonthValue != opts.leapday)
                                        return true;
                                    else {
                                        var year = parseInt(buffer.join('').substr(0, 4),10);  //detect leap year
                                        if (year % 4 === 0)
                                            if (year % 100 === 0)
                                            if (year % 400 === 0)
                                            return true;
                                        else return false;
                                        else return true;
                                        else return false;
                                    }
                                }

                                return isValid;
                            },
                            cardinality: 2,
                            prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                                var frontValue = buffer.join('').substr(5, 3);
                                var isValid = opts.regex.val2pre(opts.separator).test(frontValue + chrs);
                                if (!strict && !isValid) {
                                    isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs);
                                    if (isValid) {
                                        buffer[pos] = "0";
                                        pos++;
                                        return { "pos": pos };
                                    }
                                }
                                return isValid;
                            }, cardinality: 1}]
                            }
                        }
                    },
                    'dd.mm.yyyy': {
                        mask: "1.2.y",
                        placeholder: "dd.mm.yyyy",
                        leapday: "29.02.",
                        separator: '\.',
                        alias: "dd/mm/yyyy"
                    },
                    'dd-mm-yyyy': {
                        mask: "1-2-y",
                        placeholder: "dd-mm-yyyy",
                        leapday: "29-02-",
                        separator: '\-',
                        alias: "dd/mm/yyyy"
                    },
                    'mm.dd.yyyy': {
                        mask: "1.2.y",
                        placeholder: "mm.dd.yyyy",
                        leapday: "02.29.",
                        separator: '\.',
                        alias: "mm/dd/yyyy"
                    },
                    'mm-dd-yyyy': {
                        mask: "1-2-y",
                        placeholder: "mm-dd-yyyy",
                        leapday: "02-29-",
                        separator: '\-',
                        alias: "mm/dd/yyyy"
                    },
                    'yyyy.mm.dd': {
                        mask: "y.1.2",
                        placeholder: "yyyy.mm.dd",
                        leapday: ".02.29",
                        separator: '\.',
                        alias: "yyyy/mm/dd"
                    },
                    'yyyy-mm-dd': {
                        mask: "y-1-2",
                        placeholder: "yyyy-mm-dd",
                        leapday: "-02-29",
                        separator: '\-',
                        alias: "yyyy/mm/dd"
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
                        mask: "1/2/y h:s",
                        placeholder: "dd/mm/yyyy hh:mm",
                        alias: "date"
                    }
                });
            })(jQuery);