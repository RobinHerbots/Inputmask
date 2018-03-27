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
    //extra definitions
    Inputmask.extendDefinitions({
        "A": {
            validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
            casing: "upper" //auto uppercasing
        },
        "&": { //alfanumeric uppercasing
            validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
            casing: "upper"
        },
        "#": { //hexadecimal
            validator: "[0-9A-Fa-f]",
            casing: "upper"
        }
    });
    Inputmask.extendAliases({
        "cssunit": {
            regex: '[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)'
        },
        "url": { //needs update => https://en.wikipedia.org/wiki/URL
            regex: "(https?|ftp)//.*",
            autoUnmask: false
        },
        "ip": { //ip-address mask
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                "i": {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
                            chrs = maskset.buffer[pos - 1] + chrs;
                            if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
                                chrs = maskset.buffer[pos - 2] + chrs;
                            } else chrs = "0" + chrs;
                        } else chrs = "00" + chrs;
                        return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    }
                }
            },
            onUnMask: function (maskedValue, unmaskedValue, opts) {
                return maskedValue;
            },
            inputmode: "numeric",
        },
        "email": {
            //https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
            //https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
            //should be extended with the toplevel domains at the end
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
            greedy: false,
            casing: "lower",
            onBeforePaste: function (pastedValue, opts) {
                pastedValue = pastedValue.toLowerCase();
                return pastedValue.replace("mailto:", "");
            },
            definitions: {
                "*": {
                    validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5!#$%&'*+/=?^_`{|}~\-]"
                },
                "-": {
                    validator: "[0-9A-Za-z\-]"
                }
            },
            onUnMask: function (maskedValue, unmaskedValue, opts) {
                return maskedValue;
            },
            inputmode: "email"
        },
        "mac": {
            mask: "##:##:##:##:##:##"
        },
        //https://en.wikipedia.org/wiki/Vehicle_identification_number
        // see issue #1199
        "vin": {
            mask: "V{13}9{4}",
            definitions: {
                'V': {
                    validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                    casing: "upper"
                }
            },
            clearIncomplete: true,
            autoUnmask: true
        }
    });
    return Inputmask;
}));
