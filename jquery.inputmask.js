/*
Input Mask plugin for jquery
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.5
   
This plugin is based on the masked input plugin written by Josh Bush (digitalbush.com)
*/

(function($) {

    $.fn.inputmask = function(fn, options) {
        //options default
        var defaults = {
            placeholder: "_",
            mask: null,
            onComplete: null,
            repeat: 0, //repetitions of the mask
            definitions: {
                '9': {
                    "validator": "[0-9]",
                    "cardinality": 1,
                    'prevalidator': null
                },
                'a': {
                    "validator": "[A-Za-z]",
                    "cardinality": 1,
                    "prevalidator": null
                },
                '*': {
                    "validator": "[A-Za-z0-9]",
                    "cardinality": 1,
                    "prevalidator": null
                },
                'd': { //day
                    "validator": "0[1-9]|[12][0-9]|3[01]",
                    "cardinality": 2,
                    "prevalidator": [{ "validator": "[0-3]", "cardinality": 1}]
                },
                'm': { //month
                    "validator": "0[1-9]|1[012]",
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
            keyCode: { ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
            }
        };

        var opts = $.extend({}, defaults, options);

        if (typeof fn == "string") {
            if (fn == 'mask') {
                //init buffer
                var _buffer = getMaskTemplate();
                var pasteEventName = $.browser.msie ? 'paste' : 'input';
                var iPhone = (window.orientation != undefined);
                var tests = getTestingChain();

                return this.each(function() {
                    mask($(this));
                });
            } else if (fn == 'unmaskedvalue') {
                return unmaskedvalue($(this));
            } else { //maybe fn is a mask so we try
                //set mask
                opts.mask = fn;

                //init buffer
                var _buffer = getMaskTemplate();
                var pasteEventName = $.browser.msie ? 'paste' : 'input';
                var iPhone = (window.orientation != undefined);
                var tests = getTestingChain();

                return this.each(function() {
                    mask($(this));
                });
            }
        } if (typeof fn == "object") {
            opts = $.extend({}, defaults, fn);

            //init buffer
            var _buffer = getMaskTemplate();
            var pasteEventName = $.browser.msie ? 'paste' : 'input';
            var iPhone = (window.orientation != undefined);
            var tests = getTestingChain();

            return this.each(function() {
                mask($(this));
            });
        }

        //functions
        function getMaskTemplate() {
            var singleMask = $.map(opts.mask.split(""), function(element, index) {
                var outElem = [];
                var maskdef = opts.definitions[element];
                if (maskdef) {
                    for (i = 0; i < maskdef.cardinality; i++) {
                        outElem.push(opts.placeholder);
                    }
                } else outElem.push(element);

                return outElem;
            });

            var repeatedMask = singleMask.slice();
            for (var i = 0; i < opts.repeat; i++) {
                repeatedMask = repeatedMask.concat(singleMask.slice());
            }
            return repeatedMask;
        };

        function getTestingChain() {
            return $.map(opts.mask.split(""), function(element, index) {
                var outElem = [];
                var maskdef = opts.definitions[element];
                if (maskdef) {
                    for (i = 1; i < maskdef.cardinality; i++) {
                        var prevalidator = maskdef.prevalidator[i - 1];
                        outElem.push([new RegExp(prevalidator.validator), prevalidator.cardinality]);
                    }
                    outElem.push([new RegExp(maskdef.validator), maskdef.cardinality]);
                } else outElem.push(null);

                return outElem;
            });
        };

        function unmaskedvalue(el) {
            var tests = el.data('tests');
            if (tests) {
                return $.map(el.val().split(""), function(element, index) {
                    return tests[index] ? element : null;
                }).join('');
            }
            else {
                return el.val();
            }
        }

        function mask(el) {
            var input = $(el);
            //store tests in the input element - used to get the unmasked value
            input.data('tests', tests);

            //init buffer
            var buffer = _buffer.slice();
            var undoBuffer = input.val();
            var ignore = false;              //Variable for ignoring control keys
            var len = _buffer.length;

            //bind events
            if (!input.attr("readonly")) {
                input.bind("focus", function() {
                    input.addClass('focus');
                    undoBuffer = input.val();
                    var pos = checkVal();
                    writeBuffer();
                    setTimeout(function() {
                        if (pos >= _buffer.length)
                            caret(input, 0, pos);
                        else
                            caret(input, pos);
                    }, 0);
                }).bind("mouseenter", function() {
                    if (!input.hasClass('focus') && input.val().length == 0) {
                        buffer = _buffer.slice();
                        writeBuffer();
                    }
                }).bind("blur", function() {
                    input.removeClass('focus');
                    if (input.val() == _buffer.join('')) {
                        input.val('');
                    } else {
                        checkVal();
                        if (input.val() != undoBuffer)
                            input.change();
                    }
                }).bind("mouseleave", function() {
                    if (!input.hasClass('focus') && input.val() == _buffer.join(''))
                        input.val('');
                }).bind("keydown", keydownEvent
                ).bind("keypress", keypressEvent
                ).bind(pasteEventName, function() {
                    setTimeout(function() { caret(input, checkVal(true)); }, 0);
                });

            }

            checkVal();


            //private functions
            function writeBuffer() { return input.val(buffer.join('')).val(); };
            function clearBuffer(start, end) {
                for (var i = start; i < end && i < len; i++) {
                    buffer[i] = _buffer[i];
                }
            };

            function seekNext(pos) {
                while (++pos <= len && !isMask(pos));
                return pos;
            };

            function shiftL(pos) {
                while (!isMask(pos) && --pos >= 0);
                for (var i = pos; i < len; i++) {
                    if (isMask(i)) {
                        buffer[i] = opts.placeholder;
                        var j = seekNext(i);
                        if (j < len && isValid(i, buffer[j])) {
                            buffer[i] = buffer[j];
                        } else
                            break;
                    }
                }
                writeBuffer();
                caret(input, pos);
            };

            function shiftR(pos) {
                for (var i = pos, c = opts.placeholder; i < len; i++) {
                    if (isMask(i)) {
                        var j = seekNext(i);
                        var t = buffer[i];
                        buffer[i] = c;
                        if (j < len && isValid(j, t))
                            c = t;
                        else
                            break;
                    }
                }
            };

            function caret(input, begin, end) {
                if (input.length == 0) return;
                if (typeof begin == 'number') {
                    end = (typeof end == 'number') ? end : begin;
                    return input.each(function() {
                        if (this.setSelectionRange) {
                            this.focus();
                            this.setSelectionRange(begin, end);
                        } else if (this.createTextRange) {
                            var range = this.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', end);
                            range.moveStart('character', begin);
                            range.select();
                        }
                    });
                } else {
                    if (input[0].setSelectionRange) {
                        begin = input[0].selectionStart;
                        end = input[0].selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        begin = 0 - range.duplicate().moveStart('character', -100000);
                        end = begin + range.text.length;
                    }
                    return { begin: begin, end: end };
                }
            };

            function keydownEvent(e) {
                var pos = caret($(this));
                var k = e.keyCode;
                ignore = (k < 16 || (k > 16 && k < 32) || (k > 32 && k < 41));

                //delete selection before proceeding
                if ((pos.begin - pos.end) != 0 && (!ignore || k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE))
                    clearBuffer(pos.begin, pos.end);

                //backspace, delete, and escape get special treatment
                if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iPhone && k == 127)) {//backspace/delete
                    shiftL(pos.begin + (k == opts.keyCode.DELETE ? 0 : -1));
                    return false;
                } else if (k == opts.keyCode.ESCAPE) {//escape
                    input.val(undoBuffer);
                    caret(input, 0, checkVal());
                    return false;
                }
            }

            function keypressEvent(e) {
                if (ignore) {
                    ignore = false;
                    //Fixes Mac FF bug on backspace
                    return (e.keyCode == 8) ? false : null;
                }
                e = e || window.event;
                var k = e.charCode || e.keyCode || e.which;
                var pos = caret($(this));

                if (e.ctrlKey || e.altKey || e.metaKey) {//Ignore
                    return true;
                } else if ((k >= 32 && k <= 125) || k > 186) {//typeable characters
                    var p = seekNext(pos.begin - 1);
                    if (p < len) {
                        var c = String.fromCharCode(k);
                        if (isValid(p, c)) {
                            shiftR(p);
                            buffer[p] = c;
                            writeBuffer();
                            var next = seekNext(p);
                            caret($(this), next);
                            if (opts.onComplete && next == len)
                                opts.onComplete.call(input);
                        }
                    }
                }
                return false;
            }

            function isValid(pos, c) {
                var testPos = determineTestPosition(pos);

                var loopend = 0;
                if (c) { loopend = 1; ; }

                var chrs = '';
                for (var i = tests[testPos][1]; i > loopend; i--) {
                    chrs += buffer[testPos - (i - 1)];
                }

                if (c) { chrs += c; }

                return tests[testPos][0].test(chrs);
            }

            function isMask(pos) {
                return tests[determineTestPosition(pos)];
            }

            function determineTestPosition(pos) {
                return pos % tests.length;
            }

            function checkVal(clearInvalid) {
                var inputValue = input.val();
                buffer = _buffer.slice(); //clear buffer
                var lastMatch = -1;
                for (var i = 0; i < inputValue.length; i++) {
                    for (var pos = lastMatch + 1; pos < len; pos++) {
                        if (isMask(pos)) {
                            buffer[pos] = opts.placeholder;
                            if (isValid(pos, inputValue.charAt(i))) {
                                buffer[pos] = inputValue.charAt(i);
                                lastMatch = pos;
                            }
                            break;
                        } else {   //nonmask
                            lastMatch++;
                        }
                    }
                }
                if (clearInvalid) {
                    writeBuffer();
                }
                return seekNext(lastMatch);
            };
        }
    };

})(jQuery);