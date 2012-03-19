/*
Input Mask plugin extentions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)

Optional extentions on the jquery.inputmask base
*/
(function($) {
    //extra definitions
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
        'd': { //day
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-3]", cardinality: 1}]
        },
        'm': { //month
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [{ validator: "[01]", cardinality: 1}]
        },
        'y': { //year
            validator: "(19|20)\\d\\d",
            cardinality: 4,
            prevalidator: [
                        { validator: "[12]", cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
                        ]
        },
        'A': {
            validator: "[A-Za-z]",
            cardinality: 1,
            casing: "upper"
        }
    });
    //aliases
    $.extend($.inputmask.defaults.aliases, {
        'dd/mm/yyyy': {
            mask: "d/m/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                month: new RegExp("((0[1-9]|[12][0-9])\/(0[1-9]|1[012]))|(30\/(0[13-9]|1[012]))|(31\/(0[13578]|1[02]))"),
                year: new RegExp("(19|20)\\d\\d")
            },
            definitions: {
                'm': { //month
                    validator: function(chrs, buffer) {
                        var dayValue = buffer.join('').substr(0, 3);
                        return $.inputmask.defaults.aliases['dd/mm/yyyy'].regex.month.test(dayValue + chrs);
                    },
                    cardinality: 2,
                    prevalidator: [{ validator: "[01]", cardinality: 1}]
                },
                'y': { //year
                    validator: function(chrs, buffer) {
                        if ($.inputmask.defaults.aliases['dd/mm/yyyy'].regex.year.test(chrs)) {
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
                year: new RegExp("(19|20)\\d\\d")
            },
            definitions: {
                'd': { //day
                    validator: function(chrs, buffer) {
                        var monthValue = buffer.join('').substr(0, 3);
                        return $.inputmask.defaults.aliases['mm/dd/yyyy'].regex.day.test(monthValue + chrs);
                    },
                    cardinality: 2,
                    prevalidator: [{ validator: function(chrs, buffer) {
                        var monthValue = buffer.join('').substr(0, 3);
                        return $.inputmask.defaults.aliases['mm/dd/yyyy'].regex.daypre.test(monthValue + chrs);
                    },
                        cardinality: 1}]
                    },
                    'y': { //year
                        validator: function(chrs, buffer) {
                            if ($.inputmask.defaults.aliases['mm/dd/yyyy'].regex.year.test(chrs)) {
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
                regex: {
                    month: new RegExp("((0[1-9]|[12][0-9])\/(0[1-9]|1[012]))|(30\/(0[13-9]|1[012]))|(31\/(0[13578]|1[02]))"),
                    year: new RegExp("(19|20)\\d\\d")
                },
                definitions: {
                    'm': { //month
                        validator: function(chrs, buffer) {
                            var dayValue = buffer.join('').substr(0, 3);
                            return $.inputmask.defaults.aliases['dd/mm/yyyy'].regex.month.test(dayValue + chrs);
                        },
                        cardinality: 2,
                        prevalidator: [{ validator: "[01]", cardinality: 1}]
                    },
                    'y': { //year
                        validator: function(chrs, buffer) {
                            if ($.inputmask.defaults.aliases['dd/mm/yyyy'].regex.year.test(chrs)) {
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
            //number aliases by Dean (datimson)
            'decimal': {
                mask: "~",
                placeholder: "",
                repeat: 10,
                greedy: false,
                regex: {
                    real: new RegExp("^([\+\-]?[0-9]*[\.]?[0-9]*)$")
                },
                definitions: {
                    '~': { //real number
                        validator: function(chrs, buffer, pos) {
                            var myBuffer = buffer.slice();
                            myBuffer.splice(pos, 0, chrs);
                            var test = myBuffer.join('');
                            var isValid = $.inputmask.defaults.aliases['decimal'].regex.real.test(test);
                            return isValid;
                        },
                        cardinality: 1,
                        prevalidator: null
                    }
                },
                insertMode: true
            },
            'non-negative-decimal': {
                mask: "~",
                placeholder: "",
                repeat: 10,
                greedy: false,
                regex: {
                    decimal: new RegExp("^([0-9]*[\.]?[0-9]*)$")
                },
                definitions: {
                    '~': {
                        validator: function(chrs, buffer, pos) {
                            var myBuffer = buffer.slice();
                            myBuffer.splice(pos, 0, chrs);
                            var test = myBuffer.join('');
                            var isValid = $.inputmask.defaults.aliases['non-negative-decimal'].regex.decimal.test(test);
                            return isValid;
                        },
                        cardinality: 1,
                        prevalidator: null
                    }
                },
                insertMode: true
            },
            'integer': {
                mask: "~",
                placeholder: "",
                repeat: 10,
                greedy: false,
                regex: {
                    integer: new RegExp("^([\+\-]?[0-9]*)$")
                },
                definitions: {
                    '~': {
                        validator: function(chrs, buffer, pos) {
                            var myBuffer = buffer.slice();
                            myBuffer.splice(pos, 0, chrs);
                            var test = myBuffer.join('');
                            var isValid = $.inputmask.defaults.aliases['integer'].regex.integer.test(test);
                            return isValid;
                        },
                        cardinality: 1,
                        prevalidator: null
                    }
                },
                insertMode: true
            }
        });
    })(jQuery);