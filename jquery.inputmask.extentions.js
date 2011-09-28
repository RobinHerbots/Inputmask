/*
Input Mask plugin extentions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)

Optional extentions on the jquery.inputmask base
*/

$.extend($.inputmask.defaults.aliases, {
    'date': {
        mask: "d/m/y"
    },
    'dd/mm/yyyy': {
        mask: "d/m/y"
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