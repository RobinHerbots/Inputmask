/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2012 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 1.0.4

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
                    var radixPosition = nptStr.indexOf(opts.radixPoint[opts.radixPoint.length - 1]);
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
                        var cbuf = buffer.slice();
                        cbuf.splice(pos, 0, chrs);
                        var bufferStr = cbuf.join('');
                        var isValid = opts.regex.number(opts.groupSeparator, opts.groupSize, opts.radixPoint, digitExpression()).test(bufferStr);
                        if (!isValid) {
                            if (strict) { //shiftL & shiftR use strict only validate from 0 to position
                                var cbuf = buffer.slice(0, pos);
                                cbuf.splice(pos, 0, chrs);
                                var bufferStr = cbuf.join('');
                                var isValid = opts.regex.number(opts.groupSeparator, opts.groupSize, opts.radixPoint, digitExpression()).test(bufferStr);
                            }
                            else {
                                if (bufferStr == opts.radixPoint) {
                                    isValid = opts.regex.number(opts.groupSeparator, opts.groupSize, opts.radixPoint, digitExpression()).test("0" + bufferStr);
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
                            var firstGroupPos = buffer.length % opts.groupSize;
                            if (buffer.length >= opts.groupSize && firstGroupPos >= 0) {
                                if (buffer[firstGroupPos] != opts.groupSeparator[opts.groupSeparator.length - 1]) {
                                    buffer.splice(firstGroupPos + 1, 0, opts.groupSeparator[opts.groupSeparator.length - 1]);
                                    return { "pos": buffer.length + 1 };
                                }
                            }
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