/*
Input Mask plugin extentions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)

Optional extentions on the jquery.inputmask base
*/
(function($){
$.extend($.inputmask.defaults.aliases, {
    'dd/mm/yyyy': {
        mask: "d/m/y",
        definitions: {
                    'm': { //month
                        "validator": function(chrs, buffer) { 
                        				var dayValue = buffer.join('').substr(0, 3);
                        				return new RegExp("((0[1-9]|[12][0-9])\/(0[1-9]|1[012]))|(30\/(0[13-9]|1[012]))|(31\/(0[13578]|1[02]))").test(dayValue + chrs); },
                        "cardinality": 2,
                        "prevalidator": [{ "validator": "[01]", "cardinality": 1}]
                    },
                    'y': { //year
                        "validator": "(19|20)\\d\\d",
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
        definitions: {
                    'd': { //day
                        "validator": function(chrs, buffer) { 
                        				var monthValue = buffer.join('').substr(0, 3);
                        				return new RegExp("((0[1-9]|1[012])\/(0[1-9]|[12][0-9]))|((0[13-9]|1[012])\/30)|((0[13578]|1[02])\/31)").test(monthValue + chrs); },
                        "cardinality": 2,
                        "prevalidator": [{ "validator": function(chrs, buffer) { 
                        									var monthValue = buffer.join('').substr(0, 3);
                        									return new RegExp("((0[13-9]|1[012])\/[0-3])|(02\/[0-2])").test(monthValue + chrs); },
                        				 "cardinality": 1}]
                    },
                    'y': { //year
                        "validator": "(19|20)\\d\\d",
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