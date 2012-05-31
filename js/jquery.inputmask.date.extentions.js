/*
Input Mask plugin extentions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2012 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 1.0.2

Optional extentions on the jquery.inputmask base
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
            mask: "d/m/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                monthpre: new RegExp("[01]"),
                month: function(separator) { return new RegExp("((0[1-9]|[12][0-9])\\" + separator + "(0[1-9]|1[012]))|(30\\" + separator + "(0[13-9]|1[012]))|(31\\" + separator + "(0[13578]|1[02]))")},
				yearpre1: new RegExp("[12]"),                
				yearpre3: new RegExp("(19|20)\\d"),
                year: new RegExp("(19|20)\\d{2}"),
                daypre: new RegExp("[0-3]"),
                day: new RegExp("0[1-9]|[12][0-9]|3[01]")
            },
            leapday: "29/02/",
            separator: '/',
            onKeyUp: function(e, opts) {
                                var $input = $(this), input = this;
                                if(e.ctrlKey && e.keyCode == opts.keyCode.RIGHT){
                                	var today = new Date();
                                	$input.val(today.getDate().toString() + (today.getMonth()+1).toString() + today.getFullYear().toString());
                                }
                            },
            definitions: {
                'd': { //day
                    validator: function(chrs, buffer, pos, strict, opts) {
                        var isValid = opts.regex.day.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator[opts.separator.length -1]) {
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
                            var isValid = opts.regex.month(opts.separator).test(dayValue + chrs);
                            if (!strict && !isValid) {
                                if (chrs.charAt(1) == opts.separator[opts.separator.length -1]) {
                                    isValid = opts.regex.month(opts.separator).test(dayValue + "0" + chrs.charAt(0));
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
                                isValid = opts.regex.month(opts.separator).test(dayValue + "0" + chrs);
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
                                    if (dayMonthValue != opts.leapday)
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
                        { validator: function(chrs, buffer, pos, strict, opts) {
                        		var isValid = opts.regex.yearpre1.test(chrs);
                            	if (!strict && !isValid) {
                                	var yearPrefix = (new Date()).getFullYear().toString().slice(0,2);

                            	    isValid = opts.regex.yearpre3.test(yearPrefix + chrs);
                        	        if (isValid) {
                    	                buffer[pos++] = yearPrefix[0];
                	                    buffer[pos++] = yearPrefix[1];
            	                        return pos;
        	                        }
    	                        }
	                            return isValid;
                        	}
                        	, cardinality: 1 },
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
                        day: function(separator) { return new RegExp("((0[1-9]|1[012])\\" + separator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])\\" + separator + "30)|((0[13578]|1[02])\\" + separator + "31)")},
                        daypre: function(separator) { return new RegExp("((0[13-9]|1[012])\\" + separator + "[0-3])|(02\\" + separator + "[0-2])")},
                        month: new RegExp("0[1-9]|1[012]"),
                        monthpre: new RegExp("[01]"),
                        yearpre1: new RegExp("[12]"),
                        yearpre3: new RegExp("(19|20)\\d"),                 
                        year: new RegExp("(19|20)\\d{2}")
                    },
                    leapday: "02/29/",
                    separator: '/',
                    onKeyUp: function(e, opts) {
                                var $input = $(this), input = this;
                                if(e.ctrlKey && e.keyCode == opts.keyCode.RIGHT){
                                	var today = new Date();
                                	$input.val((today.getMonth()+1).toString() + today.getDate().toString() + today.getFullYear().toString());
                                }
                            },
                    definitions: {
                        'd': { //day
                            validator: function(chrs, buffer, pos, strict, opts) {
                                var monthValue = buffer.join('').substr(0, 3);
                                var isValid = opts.regex.day(opts.separator).test(monthValue + chrs);
                                if (!strict && !isValid) {
                                    if (chrs.charAt(1) == opts.separator[opts.separator.length -1]) {
                                        isValid = opts.regex.day(opts.separator).test(monthValue + "0" + chrs.charAt(0));
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
                                var isValid = opts.regex.daypre(opts.separator).test(monthValue + chrs);
                                if (!strict && !isValid) {
                                    isValid = opts.regex.day(opts.separator).test(monthValue + "0" + chrs);
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
                                        if (chrs.charAt(1) == opts.separator[opts.separator.length -1]) {
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
                                            if (monthDayValue != opts.leapday)
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
                        { validator: function(chrs, buffer, pos, strict, opts) {
                        		var isValid = opts.regex.yearpre1.test(chrs);
                            	if (!strict && !isValid) {
                                	var yearPrefix = (new Date()).getFullYear().toString().slice(0,2);

                            	    isValid = opts.regex.yearpre3.test(yearPrefix + chrs);
                        	        if (isValid) {
                    	                buffer[pos++] = yearPrefix[0];
                	                    buffer[pos++] = yearPrefix[1];
            	                        return pos;
        	                        }
    	                        }
	                            return isValid;
                        	}                       
                        , cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
                        ]
                                }
                            },
                            insertMode: false,
                            autoUnmask: false
                        },
                        'dd.mm.yyyy': {
                    		mask: "d.m.y",
                    		placeholder: "dd.mm.yyyy",
                    		leapday: "29.02.",
                    		separator: '\.',
                         	alias: "dd/mm/yyyy"
                        },
                        'dd-mm-yyyy': {
                    		mask: "d-m-y",
                    		placeholder: "dd-mm-yyyy",
                    		leapday: "29-02-",
                    		separator: '\-',
                         	alias: "dd/mm/yyyy"
                        },
                        'mm.dd.yyyy': {
                    		mask: "m.d.y",
                    		placeholder: "mm.dd.yyyy",
                    		leapday: "02.29.",
                    		separator: '\.',
                         	alias: "mm/dd/yyyy"
                        },
                        'mm-dd-yyyy': {
                    		mask: "m-d-y",
                    		placeholder: "mm-dd-yyyy",
                    		leapday: "02-29-",
                    		separator: '\-',
                         	alias: "mm/dd/yyyy"
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
})(jQuery);