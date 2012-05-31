/*
Input Mask plugin extentions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2012 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 1.0.2

Optional extentions on the jquery.inputmask base
*/
(function($) {
                    //number aliases 
                    $.extend($.inputmask.defaults, {
                        radixPoint: "\.", // | ","
                        digits: "*", //numer of digits
                        groupSeparator: ",", // | "\."
                        groupSize: 3
                    });
                    $.extend($.inputmask.defaults.aliases, {
                        'decimal': {
                            mask: "~",
                            placeholder: "",
                            repeat: 10,
                            greedy: false,
                            numericInput: true,
                            regex: {
                                number: function(radixPoint, digits) { return new RegExp("^[\+\\d\-]{1}\\d*[" + radixPoint + "]?\\d" + digits + "$"); }
                            },
                            onKeyDown: function(e, opts) {
                                var $input = $(this), input = this;
                                if (e.keyCode == opts.keyCode.TAB) {
                                    var nptStr = input._valueGet();
                                    var radixPosition = nptStr.indexOf(opts.radixPoint[opts.radixPoint.length -1]);
                                    if(radixPosition != -1){
                                    	for(var i = 1; i < opts.digits; i++) {
                                    		if(nptStr[radixPosition + i]) nptStr = nptStr + "0";  
                                    	}
                                    	$input.val(nptStr);
                                    }
                                }
                            },
                            definitions: {
                                '~': { //real number
                                    validator: function(chrs, buffer, pos, strict, opts) {
                                        function digitExpression() {
                                            return isNaN(opts.digits) ? opts.digits : '{0,' + opts.digits + '}';
                                        }
                                        var cbuf = buffer.slice();
                                        cbuf.splice(pos, 0, chrs);
                                        var bufferStr = cbuf.join('');
                                        var isValid = opts.regex.number(opts.radixPoint, digitExpression()).test(bufferStr);
                                        if (!isValid) {
                                            if (strict) { //shiftL & shiftR use strict only validate from 0 to position
                                                var cbuf = buffer.slice(0, pos);
                                                cbuf.splice(pos, 0, chrs);
                                                var bufferStr = cbuf.join('');
                                                var isValid = opts.regex.number(opts.radixPoint, digitExpression()).test(bufferStr);
                                            }
                                            else {
                                                if (bufferStr == opts.radixPoint) {
                                                    isValid = opts.regex.number(opts.radixPoint, digitExpression()).test("0" + bufferStr);
                                                    if (isValid) {
                                                        buffer[pos] = "0";
                                                        pos++;
                                                        return pos;
                                                    }
                                                }
                                            }
                                        }
                                        //todo grouping, radixpoint positioning
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
                                number: function(radixPoint, digits) { return new RegExp("^\\d+[" + radixPoint + "]?\\d" + digits + "$"); }
                            },
                            alias: "decimal"
                        },
                        'integer': {
                            regex: {
                                number: function() { return new RegExp("^([\+\-]?\\d*)$"); }
                            },
                            alias: "decimal"
                        }
                    });
})(jQuery);