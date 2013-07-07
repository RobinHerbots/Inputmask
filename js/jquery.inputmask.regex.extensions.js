/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2013 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0

Regex extensions on the jquery.inputmask base
Allows for using regular expressions as a mask
*/
(function ($) {
    $.extend($.inputmask.defaults.aliases, { // $(selector).inputmask("Regex", { regex: "[0-9]*"}
        'Regex': {
            mask: "r",
            greedy: false,
            repeat: "*",
            regex: null,
            regexSplit: null,
            definitions: {
                'r': {
                    validator: function (chrs, buffer, pos, strict, opts) {

                        function analyseRegex() {  //ENHANCE ME
                            var regexSplitRegex = "\\[.*?\]\\*";

                            opts.regexSplit = opts.regex.match(new RegExp(regexSplitRegex, "g"));

                            //if (opts.regex.indexOf("*") != (opts.regex.length - 1)) {
                            //    opts.regex += "{1}";
                            //}
                            //opts.regexSplit.push(opts.regex);
                        }

                        if (opts.regexSplit == null) {
                            analyseRegex();
                        }

                        var cbuffer = buffer.slice(), regexPart = "", isValid = false;
                        cbuffer.splice(pos, 0, chrs);
                        var bufferStr = cbuffer.join('');
                        for (var i = 0; i < opts.regexSplit.length; i++) {
                            regexPart += opts.regexSplit[i];
                            var exp = new RegExp("^" + regexPart + "$");
                            isValid = exp.test(bufferStr);
                            console.log(bufferStr + ' ' + isValid + ' ' + regexPart);
                            if (isValid) break;
                        }

                        return isValid;
                    },
                    cardinality: 1
                }
            }
        }
    });
})(jQuery);
