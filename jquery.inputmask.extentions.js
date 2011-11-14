/*
Input Mask plugin extentions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)

Optional extentions on the jquery.inputmask base
*/
(function($) {
    $.extend($.inputmask.defaults.aliases, {
        'dd/mm/yyyy': {
            mask: "d/m/y",
            regex: {
                month: new RegExp("((0[1-9]|[12][0-9])\/(0[1-9]|1[012]))|(30\/(0[13-9]|1[012]))|(31\/(0[13578]|1[02]))"),
                year: new RegExp("(19|20)\\d\\d")
            },
            definitions: {
                'm': { //month
                    "validator": function(chrs, buffer) {
                        var dayValue = buffer.join('').substr(0, 3);
                        return $.inputmask.defaults.aliases['dd/mm/yyyy'].regex.month.test(dayValue + chrs);
                    },
                    "cardinality": 2,
                    "prevalidator": [{ "validator": "[01]", "cardinality": 1}]
                },
                'y': { //year
                    "validator": function(chrs, buffer) {
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
                    "cardinality": 4,
                    "prevalidator": [
                        { "validator": "[12]", "cardinality": 1 },
                        { "validator": "(19|20)", "cardinality": 2 },
                        { "validator": "(19|20)\\d", "cardinality": 3 }
                        ]
                }
            },
            insertMode: false
        },
        'mm/dd/yyyy': {
            mask: "m/d/y",
            regex: {
                day: new RegExp("((0[1-9]|1[012])\/(0[1-9]|[12][0-9]))|((0[13-9]|1[012])\/30)|((0[13578]|1[02])\/31)"),
                daypre: new RegExp("((0[13-9]|1[012])\/[0-3])|(02\/[0-2])"),
                year: new RegExp("(19|20)\\d\\d")
            },
            definitions: {
                'd': { //day
                    "validator": function(chrs, buffer) {
                        var monthValue = buffer.join('').substr(0, 3);
                        return $.inputmask.defaults.aliases['mm/dd/yyyy'].regex.day.test(monthValue + chrs);
                    },
                    "cardinality": 2,
                    "prevalidator": [{ "validator": function(chrs, buffer) {
                        var monthValue = buffer.join('').substr(0, 3);
                        return $.inputmask.defaults.aliases['mm/dd/yyyy'].regex.daypre.test(monthValue + chrs);
                    },
                        "cardinality": 1}]
                    },
                    'y': { //year
                        "validator": function(chrs, buffer) {
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
                        "cardinality": 4,
                        "prevalidator": [
                        { "validator": "[12]", "cardinality": 1 },
                        { "validator": "(19|20)", "cardinality": 2 },
                        { "validator": "(19|20)\\d", "cardinality": 3 }
                        ]
                    }
                },
                insertMode: false
            },
            'date': {
                alias: "dd/mm/yyyy"
            },
            'hh:mm:ss': {
                mask: "h:s:s",
                autoUnmask: false,
                definitions: {
                    'h': {
                        "validator": "[01][0-9]|2[0-3]",
                        "cardinality": 2,
                        "prevalidator": [{ "validator": "[0-2]", "cardinality": 1}]
                    },
                    's': {
                        "validator": "[0-5][0-9]",
                        "cardinality": 2,
                        "prevalidator": [{ "validator": "[0-5]", "cardinality": 1}]
                    }
                }
            }
        });
    })(jQuery);