/*
Input Mask plugin for jquery
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.4.7
 
This plugin is based on the masked input plugin written by Josh Bush (digitalbush.com)
*/

(function($) {
    if ($.fn.inputmask == undefined) {
        $.inputmask = {
            //options default
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                escapeChar: "\\",
                mask: null,
                oncomplete: null, //executes when the mask is complete
                onincomplete: null, //executes when the mask is incomplete and focus is lost
                oncleared: null, //executes when the mask is cleared
                repeat: 0, //repetitions of the mask
                greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
                patch_val: true, //override the jquery.val fn to detect changed in the inputmask by setting val(value)
                autoUnmask: false, //in combination with patch_val: true => automatically unmask when retrieving the value with $.fn.val
                numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
                clearMaskOnLostFocus: true,
                insertMode: true, //insert the input or overwrite the input
                clearIncomplete: false, //clear the incomplete input on blur
                aliases: {}, //aliases definitions => see jquery.inputmask.extentions.js
                definitions: {
                    '9': {
                        validator: "[0-9]",
                        cardinality: 1
                    },
                    'a': {
                        validator: "[A-Za-z]",
                        cardinality: 1
                    },
                    '*': {
                        validator: "[A-Za-z0-9]",
                        cardinality: 1
                    }
                },
                keyCode: { ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
                }
            },
            val: $.fn.val //store the original jquery val function
        };

        $.fn.inputmask = function(fn, options) {
            var opts = $.extend(true, {}, $.inputmask.defaults, options);
            var pasteEventName = $.browser.msie ? 'paste.inputmask' : 'input.inputmask';

            var iphone = navigator.userAgent.match(/iphone/i) != null;
            var android = navigator.userAgent.match(/android/i) != null;

            var _val = $.inputmask.val;
            if (opts.patch_val && $.fn.val.inputmaskpatch != true) {
                $.fn.val = function() {
                    if (this.data('inputmask')) {
                        if (this.data('inputmask')['autoUnmask'] && arguments.length == 0) {
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
                switch (fn) {
                    case "mask":
                        //init buffer
                        var _buffer = getMaskTemplate();
                        var tests = getTestingChain();

                        return this.each(function() {
                            mask(this);
                        });
                        break;
                    case "unmaskedvalue":
                        var tests = this.data('inputmask')['tests'];
                        var _buffer = this.data('inputmask')['_buffer'];
                        opts.greedy = this.data('inputmask')['greedy'];
                        opts.repeat = this.data('inputmask')['repeat'];
                        opts.definitions = this.data('inputmask')['definitions'];
                        return unmaskedvalue(this);
                        break;
                    case "setvalue":
                        setvalue(this, options); //options in this case the value
                        break;
                    case "remove":
                        var tests, _buffer;
                        return this.each(function() {
                            var input = $(this);
                            if (input.data('inputmask')) {
                                tests = input.data('inputmask')['tests'];
                                _buffer = input.data('inputmask')['_buffer'];
                                opts.greedy = input.data('inputmask')['greedy'];
                                opts.repeat = input.data('inputmask')['repeat'];
                                opts.definitions = input.data('inputmask')['definitions'];
                                //writeout the unmaskedvalue
                                _val.call(input, unmaskedvalue(input, true));
                                //clear data
                                input.removeData('inputmask');
                                //unbind all events
                                input.unbind(".inputmask");
                                input.removeClass('focus.inputmask');
                            }
                        });
                        break;
                    case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
                        if (this.data('inputmask'))
                            return this.data('inputmask')['_buffer'].join('');
                        else return "";
                    default:
                        //check if the fn is an alias
                        if (!ResolveAlias(fn)) {
                            //maybe fn is a mask so we try
                            //set mask
                            opts.mask = fn;
                        }
                        //init buffer
                        var _buffer = getMaskTemplate();
                        var tests = getTestingChain();

                        return this.each(function() {
                            mask(this);
                        });

                        break;
                }
            } if (typeof fn == "object") {
                opts = $.extend(true, {}, $.inputmask.defaults, fn);

                //init buffer
                var _buffer = getMaskTemplate();
                var tests = getTestingChain();

                return this.each(function() {
                    mask(this);
                });
            }

            //helper functions
            function ResolveAlias(aliasStr) {
                var aliasDefinition = opts.aliases[aliasStr];
                if (aliasDefinition)
                    if (!aliasDefinition.alias) {
                    $.extend(true, opts, aliasDefinition);  //merge alias definition in the options
                    return true;
                } else return ResolveAlias(aliasDefinition.alias); //alias is another alias
                return false;
            }

            function getMaskTemplate() {
                var escaped = false, outCount = 0;
                if (opts.mask.length == 1 && opts.greedy == false) { opts.placeholder = ""; } //hide placeholder with single non-greedy mask
                var singleMask = $.map(opts.mask.split(""), function(element, index) {
                    var outElem = [];
                    if (element == opts.escapeChar) {
                        escaped = true;
                    }
                    else if ((element != opts.optionalmarker.start && element != opts.optionalmarker.end) || escaped) {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            for (i = 0; i < maskdef.cardinality; i++) {
                                outElem.push(getPlaceHolder(outCount + i));
                            }
                        } else {
                            outElem.push(element);
                            escaped = false;
                        }
                        outCount += outElem.length;
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

            //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int}
            function getTestingChain() {
                var isOptional = false, escaped = false;
                var newBlockMarker = false; //indicates wheter the begin/ending of a block should be indicated

                return $.map(opts.mask.split(""), function(element, index) {
                    var outElem = [];

                    if (element == opts.escapeChar) {
                        escaped = true;
                    } else if (element == opts.optionalmarker.start && !escaped) {
                        isOptional = true;
                        newBlockMarker = true;
                    }
                    else if (element == opts.optionalmarker.end && !escaped) {
                        isOptional = false;
                        newBlockMarker = true;
                    }
                    else {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            var prevalidators = maskdef["prevalidator"], prevalidatorsL = prevalidators ? prevalidators.length : 0;
                            for (i = 1; i < maskdef.cardinality; i++) {
                                var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator["validator"], cardinality = prevalidator["cardinality"];
                                outElem.push({ fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function() { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: isOptional, newBlockMarker: isOptional == true ? newBlockMarker : false, offset: 0, casing: maskdef["casing"] });
                                if (isOptional == true) //reset newBlockMarker
                                    newBlockMarker = false;
                            }
                            outElem.push({ fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function() { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: maskdef["casing"] });
                        } else {
                            outElem.push({ fn: null, cardinality: 0, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: null });
                            escaped = false;
                        }
                        //reset newBlockMarker
                        newBlockMarker = false;
                        return outElem;
                    }
                });
            }

            function isValid(pos, c, buffer) {
                if (pos < 0 || pos >= getMaskLength()) return false;
                var testPos = determineTestPosition(pos), loopend = c ? 1 : 0, chrs = '';
                for (var i = tests[testPos].cardinality; i > loopend; i--) {
                    chrs += getBufferElement(buffer, testPos - (i - 1));
                }

                if (c) { chrs += c; }
                return tests[testPos].fn != null ? tests[testPos].fn.test(chrs, buffer) : false;
            }

            function isMask(pos) {
                var testPos = determineTestPosition(pos);
                var test = tests[testPos];

                return test != undefined ? test.fn : false;
            }

            function determineTestPosition(pos) {
                return pos % tests.length;
            }

            function getPlaceHolder(pos) {
                return opts.placeholder.charAt(pos % opts.placeholder.length);
            }

            function getMaskLength() {
                var calculatedLength = _buffer.length;
                if (!opts.greedy && opts.repeat > 1) {
                    calculatedLength += (_buffer.length * (opts.repeat - 1))
                }
                return calculatedLength;
            }

            //pos: from position
            function seekNext(buffer, pos) {
                var maskL = getMaskLength();
                if (pos >= maskL) return maskL;
                var position = pos;
                while (++position < maskL && !isMask(position)) { };
                return position;
            }
            //pos: from position
            function seekPrevious(buffer, pos) {
                if (pos <= 0) return 0;
                var position = pos;
                while (--position > 0 && !isMask(position)) { };
                return position;
            }
            //these are needed to handle the non-greedy mask repetitions
            function setBufferElement(buffer, position, element) {
                prepareBuffer(buffer, position);

                var test = tests[determineTestPosition(position)];
                var elem = element;
                switch (test.casing) {
                    case "upper":
                        elem = element.toUpperCase();
                        break;
                    case "lower":
                        elem = element.toLowerCase();
                        break;
                }

                buffer[position] = elem;
            }
            function getBufferElement(buffer, position) {
                prepareBuffer(buffer, position);
                return buffer[position];
            }

            function prepareBuffer(buffer, position) {
                while ((buffer.length <= position || position < 0) && buffer.length < getMaskLength()) {
                    var j = 0;
                    if (opts.numericInput) {
                        j = determineTestPosition(position);
                        buffer.unshift(_buffer[j]);
                    } else while (_buffer[j] !== undefined) {
                        buffer.push(_buffer[j++]);
                    }
                }
            }

            function writeBuffer(input, buffer, caretPos) {
                _val.call(input, buffer.join(''));
                if (caretPos != undefined)
                    caret(input, caretPos);
            };
            function clearBuffer(buffer, start, end) {
                for (var i = start, maskL = getMaskLength(); i < end && i < maskL; i++) {
                    setBufferElement(buffer, i, getBufferElement(_buffer.slice(), i));
                }
            };

            function SetReTargetPlaceHolder(buffer, pos) {
                var testPos = determineTestPosition(pos);
                setBufferElement(buffer, pos, getBufferElement(_buffer, testPos));
            }

            function checkVal(input, buffer, clearInvalid) {
                var inputValue = TruncateInput(_val.call(input));
                clearBuffer(buffer, 0, buffer.length);
                buffer.length = _buffer.length;
                var lastMatch = -1, checkPosition = -1, maskL = getMaskLength(), ivl = inputValue.length;
                if (opts.numericInput) {
                    lastMatch += maskL;
                    var p = seekPrevious(buffer, ivl);
                    for (var ivp = 0; ivp < ivl; ivp++) {
                        var c = inputValue.charAt(ivp);
                        if (isValid(p, c, buffer)) {
                            for (var i = 0; i < maskL; i++) {
                                if (isMask(i)) {
                                    SetReTargetPlaceHolder(buffer, i);

                                    var j = seekNext(buffer, i);
                                    var el = getBufferElement(buffer, j);
                                    if (el != getPlaceHolder(j)) {
                                        if (j < getMaskLength() && isValid(i, el, buffer) !== false) {
                                            setBufferElement(buffer, i, getBufferElement(buffer, j));
                                        } else {
                                            if (isMask(i))
                                                break;
                                        }
                                    }
                                } else
                                    SetReTargetPlaceHolder(buffer, i);
                            }
                            lastMatch = seekPrevious(buffer, maskL);
                            setBufferElement(buffer, lastMatch, c);
                        }
                    }
                } else {
                    for (var i = 0; i < ivl; i++) {
                        for (var pos = checkPosition + 1; pos < maskL; pos++) {
                            if (isMask(pos)) {
                                if (isValid(pos, inputValue.charAt(i), buffer) !== false) {
                                    setBufferElement(buffer, pos, inputValue.charAt(i));
                                    lastMatch = checkPosition = pos;
                                } else {
                                    SetReTargetPlaceHolder(buffer, pos);
                                    if (isMask(i) && inputValue.charAt(i) == getPlaceHolder(i))
                                        checkPosition = pos;
                                }
                                break;
                            } else {   //nonmask
                                SetReTargetPlaceHolder(buffer, pos);
                                if (lastMatch == checkPosition) //once outsync the nonmask cannot be the lastmatch
                                    lastMatch = pos;
                                checkPosition = pos;
                                if (inputValue.charAt(i) == getBufferElement(buffer, pos))
                                    break;
                            }
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
            function TruncateInput(input) {
                return input.replace(new RegExp("(" + EscapeRegex(_buffer.join('')) + ")*$"), "");
            }


            //functionality fn
            function setvalue(el, value) {
                _val.call(el, value);
                el.triggerHandler('setvalue.inputmask');
            }

            function unmaskedvalue(el, skipDatepickerCheck) {

                if (tests && (skipDatepickerCheck === true || !el.hasClass('hasDatepicker'))) {
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

            function caret(input, begin, end) {
                var npt = input.jquery && input.length > 0 ? input[0] : input;
                if (typeof begin == 'number') {
                    end = (typeof end == 'number') ? end : begin;
                    if (opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
                    if (npt.setSelectionRange) {
                        npt.setSelectionRange(begin, end);
                    } else if (npt.createTextRange) {
                        var range = npt.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', begin);
                        range.select();
                    }
                    npt.focus();
                    //setSelectionRange in android is buggy - so we manually track the position
                    if(android) input.data('inputmask', $.extend(input.data('inputmask'), { caretpos: { begin: begin, end: end} }));
                } else {
                	var caretpos = android ? input.data('inputmask').caretpos : null;
                	if(caretpos == null){
                    	if (npt.setSelectionRange) {
                        	begin = npt.selectionStart;
                        	end = npt.selectionEnd;
                    	} else if (document.selection && document.selection.createRange) {
                        	var range = document.selection.createRange();
                        	begin = 0 - range.duplicate().moveStart('character', -100000);
                        	end = begin + range.text.length;
                    	}
                    	caretpos = { begin: begin, end: end };
                    }
                    return caretpos;
                }
            };

            function mask(el) {
                var input = $(el);
                //store tests & original buffer in the input element - used to get the unmasked value
                input.data('inputmask', {
                    'tests': tests,
                    '_buffer': _buffer,
                    'greedy': opts.greedy,
                    'repeat': opts.repeat,
                    'autoUnmask': opts.autoUnmask,
                    'definitions': opts.definitions
                });

                //init buffer
                var buffer = _buffer.slice();
                var undoBuffer = _val.call(input);
                var ignore = false;              //Variable for ignoring control keys
                var lastPosition = -1;
                var firstMaskPos = seekNext(buffer, -1);

                //unbind all events - to make sure that no other mask will interfere when re-masking
                input.unbind(".inputmask");
                input.removeClass('focus.inputmask');
                //bind events
                if (!input.attr("readonly")) {
                    input.bind("mouseenter.inputmask", function() {
                        var input = $(this);
                        if (!input.hasClass('focus.inputmask') && _val.call(input).length == 0) {
                            buffer = _buffer.slice();
                            writeBuffer(input, buffer);
                        }
                    }).bind("blur.inputmask", function() {
                        var input = $(this);
                        input.removeClass('focus.inputmask');
                        if (_val.call(input) != undoBuffer) {
                            input.change();
                        }
                        if (opts.clearMaskOnLostFocus && _val.call(input) == _buffer.join(''))
                            _val.call(input, '');
                        if ((opts.clearIncomplete || opts.onincomplete) && checkVal(input, buffer, true) != getMaskLength()) {
                            if (opts.onincomplete)
                            {
                            	opts.onincomplete.call(input);
                            }
                            if (opts.clearIncomplete)
                            {
                                if (opts.clearMaskOnLostFocus)
                                    _val.call(input, '');
                                else {
                                    buffer = _buffer.slice();
                                    writeBuffer(input, buffer);
                                }
                            }
                        }
                    }).bind("focus.inputmask", function() {
                        var input = $(this);
                        input.addClass('focus.inputmask');
                        undoBuffer = _val.call(input);
                    }).bind("mouseleave.inputmask", function() {
                        var input = $(this);
                        if (opts.clearMaskOnLostFocus && !input.hasClass('focus.inputmask') && _val.call(input) == _buffer.join(''))
                            _val.call(input, '');
                    }).bind("click.inputmask", function() {
                        var input = $(this);
                        if(android) input.data('inputmask', $.extend(input.data('inputmask'), { caretpos: null })); //android workaround - see caret fn
                        setTimeout(function() {
                            var selectedCaret = caret(input);
                            if (selectedCaret.begin == selectedCaret.end) {
                                var clickPosition = selectedCaret.begin;
                                lastPosition = checkVal(input, buffer, false);
                                caret(input, clickPosition < lastPosition && (isValid(clickPosition, buffer[clickPosition], buffer) || !isMask(clickPosition)) ? clickPosition : lastPosition);
                            }
                        }, 0);
                    }).bind('dblclick.inputmask', function() {
                        var input = $(this);
                        setTimeout(function() {
                            caret(input, 0, lastPosition);
                        }, 0);
                    }).bind("keydown.inputmask", keydownEvent
                ).bind("keypress.inputmask", keypressEvent
                ).bind("keyup.inputmask", function(e) {
                    var input = $(this);
                    var k = e.keyCode;
                    if (k == opts.keyCode.TAB && input.hasClass('focus.inputmask') && _val.call(input).length == 0) {
                        buffer = _buffer.slice();
                        writeBuffer(input, buffer);
                        if (!opts.numericInput) caret(input, 0);
                    }
                }).bind(pasteEventName, function() {
                    var input = $(this);
                    setTimeout(function() {
                        caret(input, checkVal(input, buffer, true));
                    }, 0);
                }).bind('setvalue.inputmask', function() {
                    var input = $(this);
                    setTimeout(function() {
                        undoBuffer = _val.call(input);
                        checkVal(input, buffer, true);
                        if (_val.call(input) == _buffer.join(''))
                            _val.call(input, '');
                    }, 0);
                });
                }

                setTimeout(function() {
                    lastPosition = checkVal(input, buffer, true);
                    if (document.activeElement === input[0]) { //position the caret when in focus
                        input.addClass('focus.inputmask');
                        caret(input, lastPosition);
                    } else if (opts.clearMaskOnLostFocus && _val.call(input) == _buffer.join(''))
                        _val.call(input, '');
                }, 0);

                //private functions
                //shift chars to left from start to end and put c at end position if defined
                function shiftL(start, end, c) {
                    while (!isMask(start) && start - 1 >= 0) start--;
                    for (var i = start; i <= end && i < getMaskLength(); i++) {
                        if (isMask(i)) {
                            SetReTargetPlaceHolder(buffer, i);
                            var j = seekNext(buffer, i);
                            var p = getBufferElement(buffer, j);
                            if (p != getPlaceHolder(j)) {
                                if (j < getMaskLength() && isValid(i, p, buffer) !== false) {
                                    setBufferElement(buffer, i, getBufferElement(buffer, j));
                                } else {
                                    if (isMask(i))
                                        break;
                                }
                            } else if (c == undefined) break;
                        } else {
                            SetReTargetPlaceHolder(buffer, i);
                        }
                    }
                    if (c != undefined)
                        setBufferElement(buffer, seekPrevious(buffer, end), c);

                    buffer = TruncateInput(buffer.join('')).split('');
                    if (buffer.length == 0) buffer = _buffer.slice();

                    return start; //return the used start position
                }
                function shiftR(pos, c, full) { //full => behave like a push right ~ do not stop on placeholders
                    for (var i = pos; i < getMaskLength(); i++) {
                        if (isMask(i)) {
                            var t = getBufferElement(buffer, i);
                            setBufferElement(buffer, i, c);
                            if (t != getPlaceHolder(i)) {
                                var j = seekNext(buffer, i);
                                if (j < getMaskLength()) {
                                    if (isValid(j, t, buffer) !== false)
                                        c = t;
                                    else {
                                        if (isMask(j))
                                            break;
                                        else c = t;
                                    }
                                } else break;
                            } else if (full !== true) break;
                        } else
                            SetReTargetPlaceHolder(buffer, i);
                    }
                };

                function keydownEvent(e) {
                    var input = $(this);

                    //Safari 5.1.x - modal dialog fires keypress twice workaround
                    input.data('inputmask', $.extend(input.data('inputmask'), { skipKeyPressEvent: false }));

                    var k = e.keyCode;
                    if(android && (k == opts.keyCode.RIGHT || k == opts.keyCode.LEFT)) //android workaround - see caret fn
						input.data('inputmask', $.extend(input.data('inputmask'), { caretpos: null }));

					var pos = caret(input);
                    ignore = (k < 16 || (k > 16 && k < 32) || (k > 32 && k < 41));

                    //delete selection before proceeding
                    if (((pos.end - pos.begin) > 1 || ((pos.end - pos.begin) == 1 && opts.insertMode)) && (!ignore || k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE)) {

                        clearBuffer(buffer, pos.begin, pos.end);
                    }

                    //backspace, delete, and escape get special treatment
                    if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127)) {//backspace/delete
                        var maskL = getMaskLength();
                        if (pos.begin == 0 && pos.end == maskL) {
                            buffer = _buffer.slice();
                            writeBuffer(input, buffer);
                            if (!opts.numericInput) caret(input, 0);
                        } else {
                            var beginPos = pos.begin - (k == opts.keyCode.DELETE ? 0 : 1);
                            beginPos = shiftL(beginPos < 0 ? 0 : beginPos, maskL);
                            if (opts.numericInput) {
                                shiftR(0, getPlaceHolder(0), true);
                                beginPos = seekNext(buffer, beginPos);
                            }
                            writeBuffer(input, buffer, beginPos);
                            if (!opts.insertMode && k == opts.keyCode.BACKSPACE) {
                                caret(input, beginPos);
                            }
                        }
                        if (opts.oncleared && _val.call(input) == _buffer.join(''))
                            opts.oncleared.call(input);

                        return false;
                    } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
                        setTimeout(function() {
                            var caretPos = checkVal(input, buffer, false);
                            if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
                            caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
                        }, 0);
                        return false;
                    } else if (k == opts.keyCode.HOME || k == opts.keyCode.PAGE_UP) {//Home or page_up
                        caret(input, 0, e.shiftKey ? pos.begin : 0);
                        return false;
                    }
                    else if (k == opts.keyCode.ESCAPE) {//escape
                        _val.call(input, undoBuffer);
                        caret(input, 0, checkVal(input, buffer));
                        return false;
                    } else if (k == opts.keyCode.INSERT) {//insert
                        opts.insertMode = !opts.insertMode;
                        caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
                        return false;
                    }
                    else if (!opts.insertMode) { //overwritemode
                        if (k == opts.keyCode.RIGHT) {//right
                            var caretPos = pos.begin == pos.end ? pos.end + 1 : pos.end;
                            caretPos = caretPos < getMaskLength() ? caretPos : pos.end;
                            caret(input, e.shiftKey ? pos.begin : caretPos, e.shiftKey ? caretPos + 1 : caretPos);
                            return false;
                        } else if (k == opts.keyCode.LEFT) {//left
                            var caretPos = pos.begin - 1;
                            caretPos = caretPos > 0 ? caretPos : 0;
                            caret(input, caretPos, e.shiftKey ? pos.end : caretPos);
                            return false;
                        }
                    }
                }

                function keypressEvent(e) {
                    var input = $(this);

                    //Safari 5.1.x - modal dialog fires keypress twice workaround
                    if (input.data('inputmask').skipKeyPressEvent) return false;
                    input.data('inputmask', $.extend(input.data('inputmask'), { skipKeyPressEvent: true }));
                    
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
                        var c = String.fromCharCode(k);
                        if (opts.numericInput) {
                            var posEnd = opts.greedy ? pos.end : (pos.end + 1);
                            var p = seekPrevious(buffer, posEnd);
                            if (isValid(p, c, buffer)) {
                                if (isValid(firstMaskPos, buffer[firstMaskPos], buffer) == false || (opts.greedy === false && buffer.length < getMaskLength())) {
                                    shiftL(firstMaskPos, posEnd, c);
                                    writeBuffer(input, buffer, posEnd);
                                } else if (opts.oncomplete)
                                    opts.oncomplete.call(input);
                            }
                        }
                        else {
                            var p = seekNext(buffer, pos.begin - 1);
                            if (isValid(p, c, buffer)) {
                                if (opts.insertMode == true) shiftR(p, c); else setBufferElement(buffer, p, c);
                                var next = seekNext(buffer, p);
                                writeBuffer(input, buffer, next);

                                if (opts.oncomplete && next == getMaskLength())
                                    opts.oncomplete.call(input);
                            }
                        }
                    }
                    return false;
                }


            }
        };
    }
})(jQuery);