/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2012 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 1.0.10.c

Optional extensions on the jquery.inputmask base
*/
(function ($) {
    //number aliases
    //$.extend($.inputmask.defaults.definitions, {
    //    '9': {
    //        validator: function(chrs, buffer, pos, strict, opts) {
    //            var isValid = opts.definitions['9'].regex.test(chrs);
    //            if (isValid) {
    //do some grouping
    //            }
    //            return isValid;
    //        },
    //        cardinality: 1,
    //        regex: new RegExp("[0-9]")
    //    }
    //});
    $.extend($.inputmask.defaults.aliases, {
        'decimal': {
            mask: "~",
            placeholder: "",
            repeat: 10,
            greedy: false,
            numericInput: true,
            regex: {
                number: function (groupSeparator, groupSize, radixPoint, digits) { return new RegExp("^[\+\\d\-]{1}[\\d" + groupSeparator + "]*[" + radixPoint + "]?\\d" + digits + "$"); }
            },
            onKeyDown: function (e, opts) {
                var $input = $(this), input = this;
                if (e.keyCode == opts.keyCode.TAB) {
                    var nptStr = input._valueGet();
                    var radixPosition = nptStr.indexOf(opts.radixPoint);
                    if (radixPosition != -1) {
                        for (var i = 1; i < opts.digits; i++) {
                            if (nptStr[radixPosition + i]) nptStr = nptStr + "0";
                        }
                        $input.val(nptStr);
                    }
                }
            },
            definitions: {
                '~': { //real number
                    validator: function (chrs, buffer, pos, strict, opts) {
                        function digitExpression() {
                            return isNaN(opts.digits) ? opts.digits : '{0,' + opts.digits + '}';
                        }
                        function radixPointExpression() {
                            return opts.radixPoint == '.' ? "\\" + opts.radixPoint : opts.radixPoint;
                        }
                        function separatorExpression() {
                            return opts.groupSeparator == '.' ? "\\" + opts.groupSeparator : opts.groupSeparator;
                        }
                        var cbuf = buffer.slice();
                        cbuf.splice(pos, 0, chrs);
                        var bufferStr = cbuf.join('');
                        var isValid = opts.regex.number(separatorExpression(), opts.groupSize, radixPointExpression(), digitExpression()).test(bufferStr);
                        if (!isValid) {
                            if (strict) { //shiftL & shiftR use strict only validate from 0 to position
                                var cbuf = buffer.slice(0, pos);
                                cbuf.splice(pos, 0, chrs);
                                var bufferStr = cbuf.join('');
                                var isValid = opts.regex.number(separatorExpression(), opts.groupSize, radixPointExpression(), digitExpression()).test(bufferStr);
                            }
                            else {
                                if (bufferStr == opts.radixPoint) {
                                    isValid = opts.regex.number(separatorExpression(), opts.groupSize, radixPointExpression(), digitExpression()).test("0" + bufferStr);
                                    if (isValid) {
                                        buffer[pos] = "0";
                                        pos++;
                                        isValid = { "pos": pos };
                                    }
                                }
                            }
                        }
                        //grouping
                        if (opts.autoGroup && isValid != false && !strict) {
                            var bufVal = buffer.join('') + chrs;
                            bufVal = bufVal.replace(new RegExp(separatorExpression(), "g"), '');
                            var reg = new RegExp('(-?[0-9]+)([0-9]{3})');
                            while (reg.test(bufVal)) {
                                bufVal = bufVal.replace(reg, '$1' + opts.groupSeparator + '$2');
                            }
                            for (var i = 0, l = bufVal.length - 1; i < l; i++) {
                                buffer[i] = bufVal.charAt(i);
                            }

                            return { "pos": buffer.length + 1 };
                        }

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
                number: function (groupSeparator, groupSize, radixPoint, digits) { return new RegExp("^[\\d]+[" + radixPoint + "]?\\d" + digits + "$"); }
            },
            alias: "decimal"
        },
        'integer': {
            regex: {
                number: function (groupSeparator, groupSize) { return new RegExp("^([\+\-]?\\d*)$"); }
            },
            alias: "decimal"
        }
    });
})(jQuery);