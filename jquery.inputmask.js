/*
Input Mask plugin for jquery
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.2.6d
   
This plugin is based on the masked input plugin written by Josh Bush (digitalbush.com)
*/

(function($) {
    $.inputmask = {
        //options default
        defaults: {
            placeholder: "_",
            optionalmarker: {
                start: "[",
                end: "]"
            },
            mask: null,
            oncomplete: null,
            repeat: 0, //repetitions of the mask
            greedy: true, //true: allocated buffer for all mask repetitions - false: allocate only if needed
            patch_val: true, //override the jquery.val fn to detect changed in the inputmask by setting val(value)
            autounmask: false, //in combination with patch_val: true => automatically unmask when retrieving the value with $.fn.val
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
        },
        val: $.fn.val //store the original jquery val function
    };

    $.fn.inputmask = function(fn, options) {
        var opts = $.extend({}, $.inputmask.defaults, options);
        var pasteEventName = $.browser.msie ? 'paste.inputmask' : 'input.inputmask';
        var iPhone = (window.orientation != undefined);

        var _val = $.inputmask.val;
        if (opts.patch_val && $.fn.val.inputmaskpatch != true) {
            $.fn.val = function() {
                if (this.data('inputmask')) {
                    if (this.data('autounmask') && arguments.length == 0) {
                        return this.inputmask('unmaskedvalue');
                    }
                    else {
                        var result = _val.apply(this, arguments);
                        if (arguments.length > 0) {
                            this.triggerHandler('setvalue.inputmask');
                        }
                        return result;
                    }
                }
                else {
                    return _val.apply(this, arguments);
                }
            };
            $.extend($.fn.val, {
                inputmaskpatch: true
            });
        }

        if (typeof fn == "string") {
            if (fn == 'mask') {
                //init buffer
                var _buffer = getMaskTemplate();
                var _numberOfRemovedElementsFromMask = 0;
                var tests = getTestingChain();

                return this.each(function() {
                    mask($(this));
                });
            } else if (fn == 'unmaskedvalue') {
                var tests = this.data('tests');
                var _buffer = this.data('_buffer');
                var _numberOfRemovedElementsFromMask = 0;
                opts.greedy = this.data('greedy');
                opts.repeat = this.data('repeat');
                return unmaskedvalue(this);
            } else if (fn == 'setvalue') {
                setvalue(this, options); //options in this case the value
            }
            else { //maybe fn is a mask so we try
                //set mask
                opts.mask = fn;

                //init buffer
                var _buffer = getMaskTemplate();
                var _numberOfRemovedElementsFromMask = 0;
                var tests = getTestingChain();

                return this.each(function() {
                    mask($(this));
                });
            }
        } if (typeof fn == "object") {
            opts = $.extend({}, $.inputmask.defaults, fn);

            //init buffer
            var _buffer = getMaskTemplate();
            var _numberOfRemovedElementsFromMask = 0;
            var tests = getTestingChain();

            return this.each(function() {
                mask($(this));
            });
        }

        //helper functions
        function getMaskTemplate() {
            if (opts.mask.length == 1 && opts.greedy == false) { opts.placeholder = ""; } //hide placeholder with single non-greedy mask
            var singleMask = $.map(opts.mask.split(""), function(element, index) {
                var outElem = [];
                if (element != opts.optionalmarker.start && element != opts.optionalmarker.end) {
                    var maskdef = opts.definitions[element];
                    if (maskdef) {
                        for (i = 0; i < maskdef.cardinality; i++) {
                            outElem.push(opts.placeholder);
                        }
                    } else outElem.push(element);

                    return outElem;
                }
            });

            //allocate repetitions
            var repeatedMask = singleMask.slice();
            for (var i = 1; i < opts.repeat && opts.greedy; i++) {
                repeatedMask = repeatedMask.concat(singleMask.slice());
            }
            return repeatedMask;
        }

        //test definition => {regex: RegExp, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int}
        function getTestingChain() {
            var isOptional = false;
            var newBlockMarker = false; //indicates wheter the begin/ending of a block should be indicated

            return $.map(opts.mask.split(""), function(element, index) {
                var outElem = [];

                if (element == opts.optionalmarker.start) {
                    isOptional = true;
                    newBlockMarker = true;
                }
                else if (element == opts.optionalmarker.end) {
                    isOptional = false;
                    newBlockMarker = true;
                }
                else {
                    var maskdef = opts.definitions[element];
                    if (maskdef) {
                        for (i = 1; i < maskdef.cardinality; i++) {
                            var prevalidator = maskdef.prevalidator[i - 1];
                            outElem.push({ regex: new RegExp(prevalidator.validator), cardinality: prevalidator.cardinality, optionality: isOptional, newBlockMarker: isOptional == true ? newBlockMarker : false, offset: 0 });
                            if (isOptional == true) //reset newBlockMarker
                                newBlockMarker = false;
                        }
                        outElem.push({ regex: new RegExp(maskdef.validator), cardinality: maskdef.cardinality, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0 });
                    } else outElem.push({ regex: null, cardinality: 0, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0 });

                    //reset newBlockMarker
                    newBlockMarker = false;
                    return outElem;
                }
            });
        }

        function isValid(pos, c, buffer) {
            if (pos >= getMaskLength() + _numberOfRemovedElementsFromMask) return false;
            var testPos = determineTestPosition(pos);
            var firstMaskPosition = false;
            //apply offset
            if (tests[testPos].optionality) {
                firstMaskPosition = isFirstMaskOfBlock(testPos);
                if (tests[testPos].offset > 0) {
                    if (firstMaskPosition !== false && firstMaskPosition == testPos) {
                        clearOffsets(firstMaskPosition, firstMaskPosition + tests[firstMaskPosition].offset, buffer);
                    }
                    else {
                        var newPos = pos + tests[testPos].offset;
                        testPos = determineTestPosition(newPos);
                        firstMaskPosition = isFirstMaskOfBlock(testPos);
                    }
                }
            }

            var loopend = 0;
            if (c) { loopend = 1; }

            var chrs = '';
            for (var i = tests[testPos].cardinality; i > loopend; i--) {
                chrs += getBufferElement(buffer, testPos - (i - 1));
            }

            if (c) { chrs += c; }
            var testResult = tests[testPos].regex != null ? tests[testPos].regex.test(chrs) : false;

            if (!testResult) {
                if (tests[testPos].optionality && firstMaskPosition !== false) {
                    //adjust the position with the firstMaskPosition offset
                    var isNextValid = isValid(seekNext(buffer, pos - (testPos - firstMaskPosition), true), c, buffer);
                    return isNextValid ? (testPos - firstMaskPosition) : false; //return the offset of the firstmask if valid
                }
            }
            return testResult;
        }

        function isMask(pos) {
            var testPos = determineTestPosition(pos);
            var test = tests[testPos];
            if (test != undefined && test.optionality && test.offset > 0) {
                var newPos = pos + test.offset;
                return test.regex || isMask(newPos);
            }
            return test != undefined ? test.regex : false;
        }

        //returns the testPosition of the newBlockMarker or false
        function isFirstMaskOfBlock(testPosition) {
            if (!tests[testPosition].newBlockMarker) {
                while (testPosition > 0 && tests[testPosition - 1].regex == null) {//search marker in nonmask items
                    if (tests[--testPosition].newBlockMarker)
                        break;
                };
            }
            return tests[testPosition].newBlockMarker ? testPosition : false;
        }

        function determineTestPosition(pos) {
            return pos % tests.length;
        }

        function clearOffsets(start, end, buffer) {
            if (buffer)
                SetReTargetPlaceHolder(buffer, start);

            for (var i = start, maskL = getMaskLength(); i < end && i < maskL; i++) {
                tests[determineTestPosition(i)].offset = 0;
            }
        }

        function getMaskLength() {
            var calculatedLength = _buffer.length;
            if (!opts.greedy && opts.repeat > 1) {
                calculatedLength += (_buffer.length * (opts.repeat - 1))
            }
            return calculatedLength - _numberOfRemovedElementsFromMask;
        }

        //pos: from position, nextBlock: true/false goto next newBlockMarker
        function seekNext(buffer, pos, nextBlock) {
            var position = pos;
            if (nextBlock) {
                var offset = 1;
                while (++position < getMaskLength() && tests[determineTestPosition(position)].newBlockMarker != nextBlock) { offset++; };
                if (position < getMaskLength() && tests[determineTestPosition(position)].newBlockMarker) {
                    for (var i = 0; i < offset; i++) {
                        tests[determineTestPosition(pos + i)].offset = offset;
                    }
                    SetReTargetPlaceHolder(buffer, pos);
                }
                position--;
            }
            while (++position < getMaskLength() && !isMask(position)) { };
            return position;
        }
        //these are needed to handle the non-greedy mask repetitions
        function setBufferElement(buffer, position, element) {
            while (buffer.length <= position && buffer.length < getMaskLength()) {
                $.merge(buffer, _buffer);
            }
            buffer[position] = element;
        }
        function getBufferElement(buffer, position) {
            while (buffer.length <= position && buffer.length < getMaskLength()) {
                $.merge(buffer, _buffer);
            }
            return buffer[position];
        }

        function writeBuffer(input, buffer) { return _val.call(_val.call(input, buffer.join(''))); };
        function clearBuffer(buffer, start, end) {
            for (var i = start, maskL = getMaskLength(); i < end && i < maskL; i++) {
                setBufferElement(buffer, i, getBufferElement(_buffer.slice(), i));
            }
        };

        function SetReTargetPlaceHolder(buffer, pos, clearOptionalElement) {
            var testPos = determineTestPosition(pos);
            var test = tests[testPos];
            if (test != undefined) {
                if (test.optionality && test.offset > 0) {
                    var firstMaskPosition = isFirstMaskOfBlock(testPos + test.offset);
                    if (firstMaskPosition !== false && _numberOfRemovedElementsFromMask >= test.offset) {  //needs fixing does not take multiple optional masks into account
                        if (clearOptionalElement)
                            setBufferElement(buffer, pos, getBufferElement(_buffer, testPos + test.offset));
                        for (var i = firstMaskPosition - test.offset; i < testPos; i++) { //reset placeholders
                            setBufferElement(buffer, i, getBufferElement(_buffer, i));
                        }
                        $.each(_buffer.slice(testPos, testPos + test.offset), function() {
                            buffer.splice(pos++, 0, this.toString());
                        });
                        _numberOfRemovedElementsFromMask -= test.offset;
                        clearOffsets(firstMaskPosition - test.offset, firstMaskPosition);

                    }
                    else {
                        var testedPosition = testPos + test.offset;
                        setBufferElement(buffer, pos, getBufferElement(_buffer, testedPosition));
                        if (testedPosition < buffer.length) {
                            //remove RetargetPosition
                            buffer.splice(pos, test.offset);
                            _numberOfRemovedElementsFromMask += test.offset;
                        }
                    }
                } else setBufferElement(buffer, pos, getBufferElement(_buffer, testPos));
            }
        }

        function checkVal(input, buffer, clearInvalid) {
            clearOffsets(0, _buffer.length);
            var inputValue = _val.call(input).replace(new RegExp("(" + EscapeRegex(_buffer.join('')) + ")*$"), "");
            clearBuffer(buffer, 0, buffer.length);
            buffer.length = _buffer.length; //reset the buffer to its original size
            _numberOfRemovedElementsFromMask = 0;
            var lastMatch = -1, checkPosition = -1;
            for (var i = 0, ivl = inputValue.length; i < ivl; i++) {
                for (var pos = checkPosition + 1; pos < getMaskLength(); pos++) {
                    if (isMask(pos)) {
                        if (isValid(pos, inputValue.charAt(i), buffer) !== false) {
                            setBufferElement(buffer, pos, inputValue.charAt(i));
                            lastMatch = checkPosition = pos;
                        } else {
                            var testPos = determineTestPosition(pos);
                            if (tests[testPos] && tests[testPos].newBlockMarker) {
                                clearOffsets(testPos, testPos + tests[testPos].offset, buffer);
                            }
                            setBufferElement(buffer, pos, getBufferElement(_buffer, testPos));
                            if (inputValue.charAt(i) == opts.placeholder)
                                checkPosition = pos;
                        }

                        break;
                    } else {   //nonmask
                        SetReTargetPlaceHolder(buffer, pos);
                        if (lastMatch == checkPosition) //once outsync the nonmask cannot be the lastmatch
                            lastMatch = pos;
                        checkPosition = pos;
                    }
                }
            }
            if (clearInvalid) {
                writeBuffer(input, buffer);
            }
            return seekNext(buffer, lastMatch);
        }

        function EscapeRegex(str) {
            var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
            return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
        }


        //functionality fn
        function setvalue(el, value) {
            _val.call(el, value);
            el.triggerHandler('setvalue.inputmask');
        }

        function unmaskedvalue(el) {

            if (tests && !el.hasClass('hasDatepicker')) {
                var buffer = _buffer.slice();
                checkVal(el, buffer);
                return $.map(buffer, function(element, index) {
                    return isMask(index) && element != getBufferElement(_buffer.slice(), index) ? element : null;
                }).join('');
            }
            else {
                return _val.call(el);
            }
        }

        function mask(el) {
            var input = $(el);
            //store tests & original buffer in the input element - used to get the unmasked value
            input.data('tests', tests);
            input.data('_buffer', _buffer);
            input.data('greedy', opts.greedy);
            input.data('repeat', opts.repeat);
            input.data('inputmask', true);
            input.data('autounmask', opts.autounmask);

            //init buffer
            var buffer = _buffer.slice();
            var undoBuffer = _val.call(input);
            var ignore = false;              //Variable for ignoring control keys
            var lastPosition = -1;

            //unbind all events - to make sure that no other mask will interfere when re-masking
            input.unbind(".inputmask");
            input.removeClass('focus.inputmask');
            //bind events
            if (!input.attr("readonly")) {
                input.bind("mouseenter.inputmask", function() {
                    if (!input.hasClass('focus.inputmask') && _val.call(input).length == 0) {
                        buffer = _buffer.slice();
                        writeBuffer(input, buffer);
                    }
                }).bind("blur.inputmask", function() {
                    input.removeClass('focus.inputmask');
                    if (_val.call(input) != undoBuffer) {
                        input.change();
                    }
                    if (_val.call(input) == _buffer.join(''))
                        _val.call(input, '');
                }).bind("focus.inputmask", function() {
                    input.addClass('focus.inputmask');
                    undoBuffer = _val.call(input);
                }).bind("mouseleave.inputmask", function() {
                    if (!input.hasClass('focus.inputmask') && _val.call(input) == _buffer.join(''))
                        _val.call(input, '');
                }).bind("click.inputmask", function() {
                    setTimeout(function() {
                        var selectedCaret = caret(input);
                        if (selectedCaret.begin == selectedCaret.end) {
                            var clickPosition = selectedCaret.begin;
                            lastPosition = checkVal(input, buffer, true);
                            caret(input, clickPosition < lastPosition ? clickPosition : lastPosition);
                        }
                    }, 0);
                }).bind('dblclick.inputmask', function() {
                    setTimeout(function() {
                        caret(input, 0, lastPosition);
                    }, 0);
                }).bind("keydown.inputmask", keydownEvent
                ).bind("keypress.inputmask", keypressEvent
                ).bind(pasteEventName, function() {
                    setTimeout(function() {
                        caret(input, checkVal(input, buffer, true));
                    }, 0);
                }).bind('setvalue.inputmask', function() {
                    setTimeout(function() {
                        undoBuffer = _val.call(input);
                        checkVal(input, buffer, true);
                        if (_val.call(input) == _buffer.join(''))
                            _val.call(input, '');
                    }, 0);
                });
            }

            setTimeout(function() {
                checkVal(input, buffer, true);
                if (_val.call(input) == _buffer.join(''))
                    _val.call(input, '');
            }, 0);

            //private functions
            function shiftL(pos) {
                while (!isMask(pos) && --pos >= 0);
                for (var i = pos; i < getMaskLength(); i++) {
                    if (isMask(i)) {
                        SetReTargetPlaceHolder(buffer, i, true); //clear the position

                        var j = seekNext(buffer, i);
                        var p = getBufferElement(buffer, j);
                        if (p != opts.placeholder) {
                            if (j < getMaskLength() && isValid(i, p, buffer) !== false) {
                                setBufferElement(buffer, i, getBufferElement(buffer, j));
                            } else {
                                //var firstMaskOfBlock = isFirstMaskOfBlock(determineTestPosition(i));
                                //if (firstMaskOfBlock !== false)
                                //clearOffsets(firstMaskOfBlock, firstMaskOfBlock + tests[firstMaskOfBlock].offset, buffer);
                                if (isMask(i))
                                    break;
                            }
                        } else break;
                    } else
                        SetReTargetPlaceHolder(buffer, i);
                }
                buffer = buffer.join('').replace(new RegExp("(" + EscapeRegex(_buffer.join('')) + ")*$"), "").split('');
                if (buffer.length == 0) buffer = _buffer.slice();
                writeBuffer(input, buffer);
                caret(input, pos);
            };

            function shiftR(pos, c) {
                for (var i = pos; i < getMaskLength(); i++) {
                    if (isMask(i)) {
                        var t = getBufferElement(buffer, i);
                        setBufferElement(buffer, i, c);
                        if (t != opts.placeholder) {
                            var j = seekNext(buffer, i);
                            if (j < getMaskLength()) {
                                if (isValid(j, t, buffer) !== false)
                                    c = t;
                                else {
                                    var firstMaskOfBlock = isFirstMaskOfBlock(determineTestPosition(j));
                                    if (firstMaskOfBlock !== false) {
                                        clearOffsets(firstMaskOfBlock, firstMaskOfBlock + tests[firstMaskOfBlock].offset, buffer);
                                    }
                                    if (isMask(j))
                                        break;
                                    else c = t;
                                }
                            } else break;
                        } else break;
                    } else
                        SetReTargetPlaceHolder(buffer, i);
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
                    clearBuffer(buffer, pos.begin, pos.end);

                //backspace, delete, and escape get special treatment
                if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iPhone && k == 127)) {//backspace/delete
                    if (pos.begin == 0 && pos.end == getMaskLength()) {
                        buffer = _buffer.slice();
                        writeBuffer(input, buffer);
                        caret(input, 0);
                    } else
                        shiftL(pos.begin + (k == opts.keyCode.DELETE || pos.begin < pos.end ? 0 : -1));
                    return false;
                } else if (k == opts.keyCode.ESCAPE) {//escape
                    _val.call(input, undoBuffer);
                    caret(input, 0, checkVal(input, buffer));
                    return false;
                }
            }

            function keypressEvent(e) {
                if (ignore) {
                    ignore = false;
                    //Fixes Mac FF bug on backspace
                    return (e.keyCode == opts.keyCode.BACKSPACE) ? false : null;
                }
                e = e || window.event;
                var k = e.charCode || e.keyCode || e.which;
                var pos = caret($(this));
                if (e.ctrlKey || e.altKey || e.metaKey) {//Ignore
                    return true;
                } else if ((k >= 32 && k <= 125) || k > 186) {//typeable characters
                    var p = seekNext(buffer, pos.begin - 1);
                    if (p < getMaskLength()) {
                        var c = String.fromCharCode(k);
                        var firstMaskOffset = isValid(p, c, buffer)
                        if (firstMaskOffset !== false) {
                            if (typeof (firstMaskOffset) == 'number')
                                p = p - firstMaskOffset;
                            shiftR(p, c);
                            writeBuffer(input, buffer);
                            var next = seekNext(buffer, p);
                            caret($(this), next);
                            if (opts.oncomplete && next == getMaskLength())
                                opts.oncomplete.call(input);
                        }
                    }
                }
                return false;
            }


        }
    };

})(jQuery);