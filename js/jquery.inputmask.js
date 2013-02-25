/**
* @license Input Mask plugin for jquery
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2013 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 2.1.1a
*/

(function ($) {
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
                oncomplete: $.noop, //executes when the mask is complete
                onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
                oncleared: $.noop, //executes when the mask is cleared
                repeat: 0, //repetitions of the mask
                greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
                autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
                clearMaskOnLostFocus: true,
                insertMode: true, //insert the input or overwrite the input
                clearIncomplete: false, //clear the incomplete input on blur
                aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
                onKeyUp: $.noop, //override to implement autocomplete on certain keys for example
                onKeyDown: $.noop, //override to implement autocomplete on certain keys for example
                showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
                onKeyValidation: $.noop, //executes on every key-press with the result of isValid
                skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
                //numeric basic properties
                numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
                radixPoint: ".", // | ","
                //numeric basic properties
                definitions: {
                    '9': {
                        validator: "[0-9]",
                        cardinality: 1
                    },
                    'a': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u0451]",
                        cardinality: 1
                    },
                    '*': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
                        cardinality: 1
                    }
                },
                keyCode: {
                    ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
                },
                //specify keycodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
                ignorables: [9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123]
            },
            val: $.fn.val, //store the original jquery val function
            escapeRegex: function (str) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
            },
            getMaskLength: function (buffer, greedy, repeat) {
                var calculatedLength = buffer.length;
                if (!greedy && repeat > 1) {
                    calculatedLength += (buffer.length * (repeat - 1));
                }
                return calculatedLength;
            }
        };

        $.fn.inputmask = function (fn, options) {
            var opts = $.extend(true, {}, $.inputmask.defaults, options);
            var pasteEvent = isInputEventSupported('paste') ? 'paste' : 'input';

            var iphone = navigator.userAgent.match(/iphone/i) != null;
            var android = navigator.userAgent.match(/android.*mobile safari.*/i) != null;
            if (android) {
                var browser = navigator.userAgent.match(/mobile safari.*/i);
                var version = parseInt(new RegExp(/[0-9]+/).exec(browser));
                android = version <= 533;
            }
            var caretposCorrection = null;
            var masksets,
	        activeMasksetIndex = 0;

            if (typeof fn == "string") {
                switch (fn) {
                    case "mask":
                        //resolve possible aliases given by options
                        resolveAlias(opts.alias, options);
                        masksets = generateMaskSets();

                        return this.each(function () {
                            mask(this);
                        });
                        break;
                    case "unmaskedvalue":
                        masksets = this.data('inputmask')['masksets'];
                        activeMasksetIndex = this.data('inputmask')['activeMasksetIndex'];
                        opts.greedy = this.data('inputmask')['greedy'];
                        opts.repeat = this.data('inputmask')['repeat'];
                        opts.definitions = this.data('inputmask')['definitions'];
                        return unmaskedvalue(this);
                        break;
                    case "remove":
                        return this.each(function () {
                            var $input = $(this), input = this;
                            setTimeout(function () {
                                if ($input.data('inputmask')) {
                                    masksets = $input.data('inputmask')['masksets'];
                                    activeMasksetIndex = $input.data('inputmask')['activeMasksetIndex'];
                                    opts.greedy = $input.data('inputmask')['greedy'];
                                    opts.repeat = $input.data('inputmask')['repeat'];
                                    opts.definitions = $input.data('inputmask')['definitions'];
                                    //writeout the unmaskedvalue
                                    input._valueSet(unmaskedvalue($input, true));
                                    //clear data
                                    $input.removeData('inputmask');
                                    //unbind all events
                                    $input.unbind(".inputmask");
                                    $input.removeClass('focus.inputmask');
                                    //restore the value property
                                    var valueProperty;
                                    if (Object.getOwnPropertyDescriptor)
                                        valueProperty = Object.getOwnPropertyDescriptor(input, "value");
                                    if (valueProperty && valueProperty.get) {
                                        if (input._valueGet) {
                                            Object.defineProperty(input, "value", {
                                                get: input._valueGet,
                                                set: input._valueSet
                                            });
                                        }
                                    } else if (document.__lookupGetter__ && input.__lookupGetter__("value")) {
                                        if (input._valueGet) {
                                            input.__defineGetter__("value", input._valueGet);
                                            input.__defineSetter__("value", input._valueSet);
                                        }
                                    }
                                    delete input._valueGet;
                                    delete input._valueSet;
                                }
                            }, 0);
                        });
                        break;
                    case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
                        if (this.data('inputmask')) {
                            masksets = this.data('inputmask')['masksets'];
                            activeMasksetIndex = this.data('inputmask')['activeMasksetIndex'];
                            return masksets[activeMasksetIndex]['_buffer'].join('');
                        }
                        else return "";
                    case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value 
                        return this.data('inputmask') ? !this.data('inputmask')['autoUnmask'] : false;
                    case "isComplete":
                        masksets = this.data('inputmask')['masksets'];
                        activeMasksetIndex = this.data('inputmask')['activeMasksetIndex'];
                        opts.greedy = this.data('inputmask')['greedy'];
                        opts.repeat = this.data('inputmask')['repeat'];
                        opts.definitions = this.data('inputmask')['definitions'];
                        return isComplete(this[0]);
                    default:
                        //check if the fn is an alias
                        if (!resolveAlias(fn, options)) {
                            //maybe fn is a mask so we try
                            //set mask
                            opts.mask = fn;
                        }
                        masksets = generateMaskSets();

                        return this.each(function () {
                            mask(this);
                        });

                        break;
                }
            } else if (typeof fn == "object") {
                opts = $.extend(true, {}, $.inputmask.defaults, fn);

                resolveAlias(opts.alias, fn); //resolve aliases
                masksets = generateMaskSets();

                return this.each(function () {
                    mask(this);
                });
            } else if (fn == undefined) {
                //look for data-inputmask atribute - the attribute should only contain optipns
                return this.each(function () {
                    var attrOptions = $(this).attr("data-inputmask");
                    if (attrOptions && attrOptions != "") {
                        try {
                            attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
                            var options = $.parseJSON("{" + attrOptions + "}");
                            opts = $.extend(true, {}, $.inputmask.defaults, options);
                            resolveAlias(opts.alias, options);
                            opts.alias = undefined;
                            $(this).inputmask(opts);
                        } catch (ex) { } //need a more relax parseJSON
                    }
                });
            }

            //helper functions
            function isInputEventSupported(eventName) {
                var el = document.createElement('input'),
		        eventName = 'on' + eventName,
		        isSupported = (eventName in el);
                if (!isSupported) {
                    el.setAttribute(eventName, 'return;');
                    isSupported = typeof el[eventName] == 'function';
                }
                el = null;
                return isSupported;
            }

            function resolveAlias(aliasStr, options) {
                var aliasDefinition = opts.aliases[aliasStr];
                if (aliasDefinition) {
                    if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias); //alias is another alias
                    $.extend(true, opts, aliasDefinition);  //merge alias definition in the options
                    $.extend(true, opts, options);  //reapply extra given options
                    return true;
                }
                return false;
            }

            function getMaskTemplate(mask) {
                var escaped = false, outCount = 0;
                if (mask.length == 1 && opts.greedy == false) { opts.placeholder = ""; } //hide placeholder with single non-greedy mask
                var singleMask = $.map(mask.split(""), function (element, index) {
                    var outElem = [];
                    if (element == opts.escapeChar) {
                        escaped = true;
                    }
                    else if ((element != opts.optionalmarker.start && element != opts.optionalmarker.end) || escaped) {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            for (var i = 0; i < maskdef.cardinality; i++) {
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

            //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int, casing: null/upper/lower, def: definitionSymbol}
            function getTestingChain(mask) {
                var isOptional = false, escaped = false;
                var newBlockMarker = false; //indicates wheter the begin/ending of a block should be indicated

                return $.map(mask.split(""), function (element, index) {
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
                            for (var i = 1; i < maskdef.cardinality; i++) {
                                var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator["validator"], cardinality = prevalidator["cardinality"];
                                outElem.push({ fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function () { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: isOptional, newBlockMarker: isOptional == true ? newBlockMarker : false, offset: 0, casing: maskdef["casing"], def: element });
                                if (isOptional == true) //reset newBlockMarker
                                    newBlockMarker = false;
                            }
                            outElem.push({ fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function () { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: maskdef["casing"], def: element });
                        } else {
                            outElem.push({ fn: null, cardinality: 0, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: null, def: element });
                            escaped = false;
                        }
                        //reset newBlockMarker
                        newBlockMarker = false;
                        return outElem;
                    }
                });
            }

            function generateMaskSets() {  //TODO improve generate masksets
                var ms = [];
                function markOptional(maskPart) { //needed for the clearOptionalTail functionality
                    return opts.optionalmarker.start + maskPart + opts.optionalmarker.end;
                }
                function generateMask(maskPrefix, maskPart) {
                    var maskParts = maskPart.split(opts.optionalmarker.end, 2);
                    var newMask;


                    var masks = maskParts[0].split(opts.optionalmarker.start);
                    if (masks.length > 1) {
                        newMask = maskPrefix + masks[0] + markOptional(masks[1]) + (maskParts.length > 1 ? maskParts[1] : "");
                        ms.push({
                            "_buffer": getMaskTemplate(newMask),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": 0
                        });
                        newMask = maskPrefix + masks[0] + (maskParts.length > 1 ? maskParts[1] : "");
                        ms.push({
                            "_buffer": getMaskTemplate(newMask),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": 0
                        });
                        if (maskParts.length > 1 && maskParts[1].split(opts.optionalmarker.start).length > 1) {
                            generateMask(maskPrefix + masks[0] + markOptional(masks[1]), maskParts[1]);
                            generateMask(maskPrefix + masks[0], maskParts[1]);
                        }
                    }
                    else {
                        newMask = maskPrefix + maskParts;
                        ms.push({
                            "_buffer": getMaskTemplate(newMask),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": 0
                        });
                    }

                }

                generateMask("", opts.mask);
                return ms;
            }

            function getActiveMaskSet() {
                return masksets[activeMasksetIndex];
            }

            function getActiveTests() {
                return getActiveMaskSet()['tests'];
            }

            function getActiveBuffer() {
                return getActiveMaskSet()['_buffer'];
            }

            function isValid(pos, c, buffer, strict, isRTL) { //strict true ~ no correction or autofill
                function _isValid(position, activeMaskset) {
                    var testPos = determineTestPosition(position), loopend = c ? 1 : 0, chrs = '';
                    for (var i = activeMaskset['tests'][testPos].cardinality; i > loopend; i--) {
                        chrs += getBufferElement(buffer, testPos - (i - 1));
                    }

                    if (c) {
                        chrs += c;
                    }
                    //return is false or a json object => { pos: ??, c: ??} or true
                    return activeMaskset['tests'][testPos].fn != null ? activeMaskset['tests'][testPos].fn.test(chrs, buffer, position, strict, opts) : false;
                }

                if (strict) return _isValid(pos, getActiveMaskSet()); //only check validity in current mask when validating strict

                var results = [], result = false, currentActiveMasksetIndex = activeMasksetIndex;
                $.each(masksets, function (index, value) {
                    var activeMaskset = this;
                    activeMasksetIndex = index;

                    var maskPos = pos;
                    if (currentActiveMasksetIndex != activeMasksetIndex && !isMask(pos)) {
                        if (c == activeMaskset['_buffer'][maskPos] || c == opts.skipOptionalPartCharacter) { //match non-mask item
                            results[index] = { "refresh": true };  //new command hack only rewrite buffer
                            activeMaskset['lastValidPosition'] = maskPos;
                            return false;
                        }

                        maskPos = isRTL ? seekPrevious(buffer, pos) : seekNext(buffer, pos);
                    }
                    if (isRTL ? activeMaskset['lastValidPosition'] <= opts.numericInput ? getMaskLength() : seekNext(buffer, maskPos) : activeMaskset['lastValidPosition'] >= seekPrevious(buffer, maskPos)) {
                        if (maskPos >= 0 && maskPos < getMaskLength()) {
                            results[index] = _isValid(maskPos, activeMaskset);
                            if (results[index] !== false) {
                                if (results[index] === true) {
                                    results[index] = { "pos": maskPos }; //always take a possible corrected maskposition into account
                                }
                                activeMaskset['lastValidPosition'] = results[index].pos || maskPos; //set new position from isValid
                            } else activeMaskset['lastValidPosition'] = isRTL ? seekNext(buffer, pos) : seekPrevious(buffer, pos); //autocorrect validposition from backspace etc  	
                        }
                    }
                });
                activeMasksetIndex = currentActiveMasksetIndex; //reset activeMasksetIndex
                determineActiveMasksetIndex(buffer, pos, currentActiveMasksetIndex, isRTL);
                result = results[activeMasksetIndex] || result;
                setTimeout(function () { opts.onKeyValidation.call(this, result, opts); }, 0); //extra stuff to execute on keydown
                return result;
            }

            function determineActiveMasksetIndex(buffer, pos, currentActiveMasksetIndex, isRTL) {
                $.each(masksets, function (index, value) {
                    var activeMaskset = this;
                    if (isRTL ? activeMaskset['lastValidPosition'] <= pos : activeMaskset['lastValidPosition'] >= pos) {
                        activeMasksetIndex = index;
                        //reset to correct masktemplate
                        if (activeMasksetIndex != currentActiveMasksetIndex) {
                            var abl = getMaskLength(), bufTemplate = getActiveBuffer();
                            if (isRTL) {
                                buffer.reverse();
                                bufTemplate.reverse();
                            }
                            buffer.length = pos; //clearout beyond the current
                            for (var i = pos; i < abl; i++) {
                                var testPos = determineTestPosition(i);
                                setBufferElement(buffer, i, getBufferElement(bufTemplate, testPos));
                            }
                            if (isRTL) {
                                buffer.reverse();
                            }
                        }
                        return false; //breaks
                    }
                });
            }

            function isMask(pos) {
                var testPos = determineTestPosition(pos);
                var test = getActiveTests()[testPos];

                return test != undefined ? test.fn : false;
            }

            function determineTestPosition(pos) {
                return pos % getActiveTests().length;
            }

            function getPlaceHolder(pos) {
                return opts.placeholder.charAt(pos % opts.placeholder.length);
            }

            function getMaskLength() {
                return $.inputmask.getMaskLength(getActiveBuffer(), opts.greedy, opts.repeat);
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
                var position = pos;
                if (position <= 0) return 0;

                while (--position > 0 && !isMask(position)) { };
                return position;
            }

            function setBufferElement(buffer, position, element) {
                //position = prepareBuffer(buffer, position);

                var test = getActiveTests()[determineTestPosition(position)];
                var elem = element;
                if (elem != undefined) {
                    switch (test.casing) {
                        case "upper":
                            elem = element.toUpperCase();
                            break;
                        case "lower":
                            elem = element.toLowerCase();
                            break;
                    }
                }

                buffer[position] = elem;
            }
            function getBufferElement(buffer, position, autoPrepare) {
                if (autoPrepare) position = prepareBuffer(buffer, position);
                return buffer[position];
            }

            //needed to handle the non-greedy mask repetitions
            function prepareBuffer(buffer, position, isRTL) {
                var j;
                if (isRTL) {
                    while (position < 0 && buffer.length < getMaskLength()) {
                        j = getActiveBuffer().length - 1;
                        position = getActiveBuffer().length;
                        while (getActiveBuffer()[j] !== undefined) {
                            buffer.unshift(getActiveBuffer()[j--]);
                        }
                    }
                } else {
                    while (buffer[position] == undefined && buffer.length < getMaskLength()) {
                        j = 0;
                        while (getActiveBuffer()[j] !== undefined) { //add a new buffer
                            buffer.push(getActiveBuffer()[j++]);
                        }
                    }
                }

                return position;
            }

            function writeBuffer(input, buffer, caretPos) {
                input._valueSet(buffer.join(''));
                if (caretPos != undefined) {
                    if (android) {
                        setTimeout(function () {
                            caret(input, caretPos);
                        }, 100);
                    }
                    else caret(input, caretPos);
                }
            };
            function clearBuffer(buffer, start, end) {
                for (var i = start, maskL = getMaskLength() ; i < end && i < maskL; i++) {
                    setBufferElement(buffer, i, getBufferElement(getActiveBuffer().slice(), i));
                }
            };

            function setReTargetPlaceHolder(buffer, pos) {
                var testPos = determineTestPosition(pos);
                setBufferElement(buffer, pos, getBufferElement(getActiveBuffer(), testPos));
            }

            function checkVal(input, buffer, clearInvalid, skipRadixHandling) {
                var isRTL = $(input).data('inputmask')['isRTL'],
                    inputValue = truncateInput(input._valueGet(), isRTL).split('');

                if (isRTL) { //align inputValue for RTL/numeric input
                    var maskL = getMaskLength();
                    var inputValueRev = inputValue.reverse(); inputValueRev.length = maskL;

                    for (var i = 0; i < maskL; i++) {
                        var targetPosition = determineTestPosition(maskL - (i + 1));
                        if (getActiveTests()[targetPosition].fn == null && inputValueRev[i] != getBufferElement(getActiveBuffer(), targetPosition)) {
                            inputValueRev.splice(i, 0, getBufferElement(getActiveBuffer(), targetPosition));
                            inputValueRev.length = maskL;
                        } else {
                            inputValueRev[i] = inputValueRev[i] || getBufferElement(getActiveBuffer(), targetPosition);
                        }
                    }
                    inputValue = inputValueRev.reverse();
                }
                clearBuffer(buffer, 0, buffer.length);
                buffer.length = getActiveBuffer().length;
                var lastMatch = -1, checkPosition = -1, np, maskL = getMaskLength(), ivl = inputValue.length, rtlMatch = ivl == 0 ? maskL : -1;
                for (var i = 0; i < ivl; i++) {
                    for (var pos = checkPosition + 1; pos < maskL; pos++) {
                        if (isMask(pos)) {
                            var c = inputValue[i];
                            if ((np = isValid(pos, c, buffer, !clearInvalid, isRTL)) !== false) {
                                if (np !== true) {
                                    pos = np.pos != undefined ? np.pos : pos; //set new position from isValid
                                    c = np.c != undefined ? np.c : c; //set new char from isValid
                                }
                                setBufferElement(buffer, pos, c);
                                lastMatch = checkPosition = pos;
                            } else {
                                setReTargetPlaceHolder(buffer, pos);
                                if (c == getPlaceHolder(pos)) {
                                    checkPosition = pos;
                                    rtlMatch = pos;
                                }
                            }
                            break;
                        } else {   //nonmask
                            setReTargetPlaceHolder(buffer, pos);
                            if (lastMatch == checkPosition) //once outsync the nonmask cannot be the lastmatch
                                lastMatch = pos;
                            checkPosition = pos;
                            if (inputValue[i] == getBufferElement(buffer, pos))
                                break;
                        }
                    }
                }
                //Truncate buffer when using non-greedy masks
                if (opts.greedy == false) {
                    var newBuffer = truncateInput(buffer.join(''), isRTL).split('');
                    while (buffer.length != newBuffer.length) {  //map changes into the original buffer
                        isRTL ? buffer.shift() : buffer.pop();
                    }
                }

                if (clearInvalid) {
                    writeBuffer(input, buffer);
                }
                return isRTL ? (opts.numericInput ? ($.inArray(opts.radixPoint, buffer) != -1 && skipRadixHandling !== true ? $.inArray(opts.radixPoint, buffer) : seekNext(buffer, maskL)) : seekNext(buffer, rtlMatch)) : seekNext(buffer, lastMatch);
            }

            function escapeRegex(str) {
                return $.inputmask.escapeRegex.call(this, str);
            }

            function truncateInput(inputValue, rtl) {
                return rtl ? inputValue.replace(new RegExp("^(" + escapeRegex(getActiveBuffer().join('')) + ")*"), "") : inputValue.replace(new RegExp("(" + escapeRegex(getActiveBuffer().join('')) + ")*$"), "");
            }

            function clearOptionalTail(input, buffer) {
                checkVal(input, buffer, false);
                var tmpBuffer = buffer.slice();
                if ($(input).data('inputmask')['isRTL']) {
                    for (var pos = 0; pos <= tmpBuffer.length - 1; pos++) {
                        var testPos = determineTestPosition(pos);
                        if (getActiveTests()[testPos].optionality) {
                            if (getPlaceHolder(pos) == buffer[pos] || !isMask(pos))
                                tmpBuffer.splice(0, 1);
                            else break;
                        } else break;
                    }
                } else {
                    for (var pos = tmpBuffer.length - 1; pos >= 0; pos--) {
                        var testPos = determineTestPosition(pos);
                        if (getActiveTests()[testPos].optionality) {
                            if (getPlaceHolder(pos) == buffer[pos] || !isMask(pos))
                                tmpBuffer.pop();
                            else break;
                        } else break;
                    }
                }
                writeBuffer(input, tmpBuffer);
            }

            //functionality fn
            function unmaskedvalue($input, skipDatepickerCheck) {
                var input = $input[0];
                if (getActiveTests() && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
                    var buffer = getActiveBuffer().slice();
                    checkVal(input, buffer);
                    return $.map(buffer, function (element, index) {
                        return isMask(index) && element != getBufferElement(getActiveBuffer().slice(), index) ? element : null;
                    }).join('');
                }
                else {
                    return input._valueGet();
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
                    if (android && end != npt.selectionEnd) caretposCorrection = { begin: begin, end: end };
                } else {
                    var caretpos = android ? caretposCorrection : null, caretposCorrection = null;
                    if (caretpos == null) {
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

            function isComplete(npt) {
                var complete = false, nptValue = npt._valueGet(), ml = nptValue.length
                currentActiveMasksetIndex = activeMasksetIndex, highestValidPosition = 0;
                $.each(masksets, function (ndx, ms) {
                    activeMasksetIndex = ndx;
                    var aml = getMaskLength();
                    if (ms["lastValidPosition"] >= highestValidPosition && ms["lastValidPosition"] == (aml - 1)) {
                        var msComplete = true;
                        for (var i = 0; i < aml; i++) {
                            var mask = isMask(i);
                            if ((mask && nptValue.charAt(i) == getPlaceHolder(i)) || (!mask && nptValue.charAt(i) != getActiveBuffer()[i])) {
                                msComplete = false;
                                break;
                            }
                        }
                        complete = complete || msComplete;
                        if (complete) //break loop
                            return false;
                    }
                    highestValidPosition = ms["lastValidPosition"];
                });
                activeMasksetIndex = currentActiveMasksetIndex; //reset activeMaskset
                return complete;
            }

            function mask(el) {
                var $input = $(el);
                if (!$input.is(":input")) return;

                //correct greedy setting if needed
                opts.greedy = opts.greedy ? opts.greedy : opts.repeat == 0;



                //handle maxlength attribute
                var maxLength = $input.prop('maxLength');
                if (getMaskLength() > maxLength && maxLength > -1) { //FF sets no defined max length to -1 
                    if (maxLength < getActiveBuffer().length) getActiveBuffer().length = maxLength;
                    if (opts.greedy == false) {
                        opts.repeat = Math.round(maxLength / getActiveBuffer().length);
                    }
                    $input.prop('maxLength', getMaskLength() * 2);
                }

                //store tests & original buffer in the input element - used to get the unmasked value
                $input.data('inputmask', {
                    'masksets': masksets,
                    'activeMasksetIndex': activeMasksetIndex,
                    'greedy': opts.greedy,
                    'repeat': opts.repeat,
                    'autoUnmask': opts.autoUnmask,
                    'definitions': opts.definitions,
                    'isRTL': false
                });

                patchValueProperty(el);

                //init vars
                var buffer = getActiveBuffer().slice(),
                undoBuffer = el._valueGet(),
                skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
                ignorable = false,
                lastPosition = -1,
                firstMaskPos = seekNext(buffer, -1),
                lastMaskPos = seekPrevious(buffer, getMaskLength()),
                isRTL = false;
                if (el.dir == "rtl" || opts.numericInput) {
                    el.dir = "ltr"
                    $input.css("text-align", "right");
                    $input.removeAttr("dir");
                    var inputData = $input.data('inputmask');
                    inputData['isRTL'] = true;
                    $input.data('inputmask', inputData);
                    isRTL = true;
                }

                //unbind all events - to make sure that no other mask will interfere when re-masking
                $input.unbind(".inputmask");
                $input.removeClass('focus.inputmask');
                //bind events
                $input.bind("mouseenter.inputmask", function () {
                    var $input = $(this), input = this;
                    if (!$input.hasClass('focus.inputmask') && opts.showMaskOnHover) {
                        var nptL = input._valueGet().length;
                        if (nptL < buffer.length) {
                            if (nptL == 0)
                                buffer = getActiveBuffer().slice();
                            writeBuffer(input, buffer);
                        }
                    }
                }).bind("blur.inputmask", function () {
                    var $input = $(this), input = this, nptValue = input._valueGet();
                    $input.removeClass('focus.inputmask');
                    if (nptValue != undoBuffer) {
                        $input.change();
                    }
                    if (opts.clearMaskOnLostFocus && nptValue != '') {
                        if (nptValue == getActiveBuffer().join(''))
                            input._valueSet('');
                        else { //clearout optional tail of the mask
                            clearOptionalTail(input, buffer);
                        }
                    }
                    if (!isComplete(input)) {
                        $input.trigger("incomplete");
                        if (opts.clearIncomplete) {
                            if (opts.clearMaskOnLostFocus)
                                input._valueSet('');
                            else {
                                buffer = getActiveBuffer().slice();
                                writeBuffer(input, buffer);
                            }
                        }
                    }
                }).bind("focus.inputmask", function () {
                    var $input = $(this), input = this, nptValue = input._valueGet();
                    if (!$input.hasClass('focus.inputmask') && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
                        var nptL = nptValue.length;
                        if (nptL < buffer.length) {
                            if (nptL == 0)
                                buffer = getActiveBuffer().slice();
                            caret(input, checkVal(input, buffer, true));
                        }
                    }
                    $input.addClass('focus.inputmask');
                    undoBuffer = input._valueGet();
                }).bind("mouseleave.inputmask", function () {
                    var $input = $(this), input = this;
                    if (opts.clearMaskOnLostFocus) {
                        if (!$input.hasClass('focus.inputmask')) {
                            if (input._valueGet() == getActiveBuffer().join('') || input._valueGet() == '')
                                input._valueSet('');
                            else { //clearout optional tail of the mask
                                clearOptionalTail(input, buffer);
                            }
                        }
                    }
                }).bind("click.inputmask", function () {
                    var input = this;
                    setTimeout(function () {
                        var selectedCaret = caret(input);
                        if (selectedCaret.begin == selectedCaret.end) {
                            var clickPosition = selectedCaret.begin;
                            lastPosition = checkVal(input, buffer, false);
                            if (isRTL)
                                caret(input, clickPosition > lastPosition && (isValid(clickPosition, buffer[clickPosition], buffer, true, isRTL) !== false || !isMask(clickPosition)) ? clickPosition : lastPosition);
                            else
                                caret(input, clickPosition < lastPosition && (isValid(clickPosition, buffer[clickPosition], buffer, true, isRTL) !== false || !isMask(clickPosition)) ? clickPosition : lastPosition);
                        }
                    }, 0);
                }).bind('dblclick.inputmask', function () {
                    var input = this;
                    setTimeout(function () {
                        caret(input, 0, lastPosition);
                    }, 0);
                }).bind("keydown.inputmask", keydownEvent
                ).bind("keypress.inputmask", keypressEvent
                ).bind("keyup.inputmask", keyupEvent
                ).bind(pasteEvent + ".inputmask dragdrop.inputmask drop.inputmask", function () {
                    var input = this;
                    setTimeout(function () {
                        caret(input, checkVal(input, buffer, true));
                        if (isComplete(input))
                            $input.trigger("complete");
                    }, 0);
                }).bind('setvalue.inputmask', function () {
                    var input = this;
                    undoBuffer = input._valueGet();
                    checkVal(input, buffer, true);
                    if (input._valueGet() == getActiveBuffer().join(''))
                        input._valueSet('');
                }).bind('complete.inputmask', opts.oncomplete)
                .bind('incomplete.inputmask', opts.onincomplete)
                .bind('cleared.inputmask', opts.oncleared);

                //apply mask
                lastPosition = checkVal(el, buffer, true);

                // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
                var activeElement;
                try {
                    activeElement = document.activeElement;
                } catch (e) { }
                if (activeElement === el) { //position the caret when in focus
                    $input.addClass('focus.inputmask');
                    caret(el, lastPosition);
                } else if (opts.clearMaskOnLostFocus) {
                    if (el._valueGet() == getActiveBuffer().join('')) {
                        el._valueSet('');
                    } else {
                        clearOptionalTail(el, buffer);
                    }
                }

                installEventRuler(el);

                //private functions
                function installEventRuler(npt) {
                    var events = $._data(npt).events;

                    $.each(events, function (eventType, eventHandlers) {
                        $.each(eventHandlers, function (ndx, eventHandler) {
                            if (eventHandler.namespace == "inputmask") {
                                var handler = eventHandler.handler;
                                eventHandler.handler = function () {
                                    if (this.readOnly || this.disabled)
                                        return false;
                                    return handler.apply(this, arguments);
                                };
                            }
                        });
                    });
                }

                function patchValueProperty(npt) {
                    var valueProperty;
                    if (Object.getOwnPropertyDescriptor)
                        valueProperty = Object.getOwnPropertyDescriptor(npt, "value");
                    if (valueProperty && valueProperty.get) {
                        if (!npt._valueGet) {

                            npt._valueGet = valueProperty.get;
                            npt._valueSet = valueProperty.set;

                            Object.defineProperty(npt, "value", {
                                get: function () {
                                    var $self = $(this), inputData = $(this).data('inputmask'), masksets = inputData['masksets'],
                                    activeMasksetIndex = inputData['activeMasksetIndex'];
                                    return inputData && inputData['autoUnmask'] ? $self.inputmask('unmaskedvalue') : this._valueGet() != masksets[activeMasksetIndex]['_buffer'].join('') ? this._valueGet() : '';
                                },
                                set: function (value) {
                                    this._valueSet(value); $(this).triggerHandler('setvalue.inputmask');
                                }
                            });
                        }
                    } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                        if (!npt._valueGet) {
                            npt._valueGet = npt.__lookupGetter__("value");
                            npt._valueSet = npt.__lookupSetter__("value");

                            npt.__defineGetter__("value", function () {
                                var $self = $(this), inputData = $(this).data('inputmask'), masksets = inputData['masksets'],
                                    activeMasksetIndex = inputData['activeMasksetIndex'];
                                return inputData && inputData['autoUnmask'] ? $self.inputmask('unmaskedvalue') : this._valueGet() != masksets[activeMasksetIndex]['_buffer'].join('') ? this._valueGet() : '';
                            });
                            npt.__defineSetter__("value", function (value) {
                                this._valueSet(value); $(this).triggerHandler('setvalue.inputmask');
                            });
                        }
                    } else {
                        if (!npt._valueGet) {
                            npt._valueGet = function () { return this.value; }
                            npt._valueSet = function (value) { this.value = value; }
                        }
                        if ($.fn.val.inputmaskpatch != true) {
                            $.fn.val = function () {
                                if (arguments.length == 0) {
                                    var $self = $(this);
                                    if ($self.data('inputmask')) {
                                        if ($self.data('inputmask')['autoUnmask'])
                                            return $self.inputmask('unmaskedvalue');
                                        else {
                                            var result = $.inputmask.val.apply($self);
                                            var inputData = $(this).data('inputmask'), masksets = inputData['masksets'],
                                            activeMasksetIndex = inputData['activeMasksetIndex'];
                                            return result != masksets[activeMasksetIndex]['_buffer'].join('') ? result : '';
                                        }
                                    } else return $.inputmask.val.apply($self);
                                } else {
                                    var args = arguments;
                                    return this.each(function () {
                                        var $self = $(this);
                                        var result = $.inputmask.val.apply($self, args);
                                        if ($self.data('inputmask')) $self.triggerHandler('setvalue.inputmask');
                                        return result;
                                    });
                                }
                            };
                            $.extend($.fn.val, {
                                inputmaskpatch: true
                            });
                        }
                    }
                }
                //shift chars to left from start to end and put c at end position if defined
                function shiftL(start, end, c) {
                    while (!isMask(start) && start - 1 >= 0) start--;
                    for (var i = start; i < end && i < getMaskLength() ; i++) {
                        if (isMask(i)) {
                            setReTargetPlaceHolder(buffer, i);
                            var j = seekNext(buffer, i);
                            var p = getBufferElement(buffer, j);
                            if (p != getPlaceHolder(j)) {
                                if (j < getMaskLength() && isValid(i, p, buffer, true, isRTL) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
                                    setBufferElement(buffer, i, getBufferElement(buffer, j));
                                    setReTargetPlaceHolder(buffer, j); //cleanup next position
                                } else {
                                    if (isMask(i))
                                        break;
                                }
                            } else if (c == undefined) break;
                        } else {
                            setReTargetPlaceHolder(buffer, i);
                        }
                    }
                    if (c != undefined)
                        setBufferElement(buffer, isRTL ? end : seekPrevious(buffer, end), c);

                    buffer = truncateInput(buffer.join(''), isRTL).split('');
                    if (buffer.length == 0) buffer = getActiveBuffer().slice();

                    return start; //return the used start position
                }
                function shiftR(start, end, c, full) { //full => behave like a push right ~ do not stop on placeholders
                    for (var i = start; i <= end && i < getMaskLength() ; i++) {
                        if (isMask(i)) {
                            var t = getBufferElement(buffer, i);
                            setBufferElement(buffer, i, c);
                            if (t != getPlaceHolder(i)) {
                                var j = seekNext(buffer, i);
                                if (j < getMaskLength()) {
                                    if (isValid(j, t, buffer, true, isRTL) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def)
                                        c = t;
                                    else {
                                        if (isMask(j))
                                            break;
                                        else c = t;
                                    }
                                } else break;
                            } else if (full !== true) break;
                        } else
                            setReTargetPlaceHolder(buffer, i);
                    }
                    var lengthBefore = buffer.length;
                    buffer = truncateInput(buffer.join(''), isRTL).split('');
                    if (buffer.length == 0) buffer = getActiveBuffer().slice();

                    return end - (lengthBefore - buffer.length);  //return new start position
                };

                function keydownEvent(e) {
                    //Safari 5.1.x - modal dialog fires keypress twice workaround
                    skipKeyPressEvent = false;

                    var input = this, k = e.keyCode, pos = caret(input);

                    //set input direction according the position to the radixPoint
                    if (opts.numericInput) {
                        var nptStr = input._valueGet();
                        var radixPosition = nptStr.indexOf(opts.radixPoint);
                        if (radixPosition != -1) {
                            isRTL = pos.begin <= radixPosition || pos.end <= radixPosition;
                        }
                    }

                    //backspace, delete, and escape get special treatment
                    if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127)) {//backspace/delete
                        var maskL = getMaskLength();
                        if (pos.begin == 0 && pos.end == maskL) {
                            activeMasksetIndex = 0; //reset activemask
                            buffer = getActiveBuffer().slice();
                            writeBuffer(input, buffer);
                            caret(input, checkVal(input, buffer, false));
                        } else if ((pos.end - pos.begin) > 1 || ((pos.end - pos.begin) == 1 && opts.insertMode)) {
                            clearBuffer(buffer, pos.begin, pos.end);
                            determineActiveMasksetIndex(buffer, pos.begin, activeMasksetIndex);
                            writeBuffer(input, buffer);
                            caret(isRTL ? checkVal(input, buffer, false) : pos.begin);
                        } else {
                            var beginPos = pos.begin - (k == opts.keyCode.DELETE ? 0 : 1);
                            if (beginPos < firstMaskPos && k == opts.keyCode.DELETE) {
                                beginPos = firstMaskPos;
                            }
                            if (beginPos >= firstMaskPos) {
                                if (opts.numericInput && opts.greedy && k == opts.keyCode.DELETE && buffer[beginPos] == opts.radixPoint) {
                                    beginPos = seekNext(buffer, beginPos);
                                    isRTL = false;
                                }
                                if (isRTL) {
                                    beginPos = shiftR(firstMaskPos, beginPos, getPlaceHolder(beginPos), true);
                                    beginPos = (opts.numericInput && opts.greedy && k == opts.keyCode.BACKSPACE && buffer[beginPos + 1] == opts.radixPoint) ? beginPos + 1 : seekNext(buffer, beginPos);
                                } else beginPos = shiftL(beginPos, maskL);
                                determineActiveMasksetIndex(buffer, beginPos, activeMasksetIndex);
                                writeBuffer(input, buffer, beginPos);
                            }
                        }
                        if (input._valueGet() == getActiveBuffer().join(''))
                            $(input).trigger('cleared');

                        e.preventDefault(); //stop default action but allow propagation
                    } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
                        setTimeout(function () {
                            var caretPos = checkVal(input, buffer, false, true);
                            if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
                            caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
                        }, 0);
                    } else if (k == opts.keyCode.HOME || k == opts.keyCode.PAGE_UP) {//Home or page_up
                        caret(input, 0, e.shiftKey ? pos.begin : 0);
                    }
                    else if (k == opts.keyCode.ESCAPE) {//escape
                        input._valueSet(undoBuffer);
                        caret(input, 0, checkVal(input, buffer));
                    } else if (k == opts.keyCode.INSERT) {//insert
                        opts.insertMode = !opts.insertMode;
                        caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
                    } else if (e.ctrlKey && k == 88) {
                        setTimeout(function () {
                            caret(input, checkVal(input, buffer, true));
                        }, 0);
                    } else if (!opts.insertMode) { //overwritemode
                        if (k == opts.keyCode.RIGHT) {//right
                            var caretPos = pos.begin == pos.end ? pos.end + 1 : pos.end;
                            caretPos = caretPos < getMaskLength() ? caretPos : pos.end;
                            caret(input, e.shiftKey ? pos.begin : caretPos, e.shiftKey ? caretPos + 1 : caretPos);
                        } else if (k == opts.keyCode.LEFT) {//left
                            var caretPos = pos.begin - 1;
                            caretPos = caretPos > 0 ? caretPos : 0;
                            caret(input, caretPos, e.shiftKey ? pos.end : caretPos);
                        }
                    }

                    opts.onKeyDown.call(this, e, opts); //extra stuff to execute on keydown
                    ignorable = $.inArray(k, opts.ignorables) != -1;
                }

                function keypressEvent(e) {
                    //Safari 5.1.x - modal dialog fires keypress twice workaround
                    if (skipKeyPressEvent) return false;
                    skipKeyPressEvent = true;

                    var input = this, $input = $(input);

                    e = e || window.event;
                    var k = e.which || e.charCode || e.keyCode,
                        c = String.fromCharCode(k);

                    if (opts.numericInput && c == opts.radixPoint) {
                        var nptStr = input._valueGet();
                        var radixPosition = nptStr.indexOf(opts.radixPoint);
                        caret(input, seekNext(buffer, radixPosition != -1 ? radixPosition : getMaskLength()));
                    }

                    if (e.ctrlKey || e.altKey || e.metaKey || ignorable) {
                        return true;
                    } else {
                        if (k) {
                            $input.trigger('input');

                            var pos = caret(input), maskL = getMaskLength(), writeOutBuffer = true;
                            clearBuffer(buffer, pos.begin, pos.end);

                            if (isRTL) {
                                var p = opts.numericInput ? pos.end : seekPrevious(buffer, pos.end), np;
                                if ((np = isValid(p == maskL || getBufferElement(buffer, p) == opts.radixPoint ? seekPrevious(buffer, p) : p, c, buffer, false, isRTL)) !== false) {
                                    var refresh = false;
                                    if (np !== true) {
                                        refresh = np["refresh"]; //only rewrite buffer from isValid
                                        p = np.pos != undefined ? np.pos : p; //set new position from isValid
                                        c = np.c != undefined ? np.c : c; //set new char from isValid
                                    }
                                    if (refresh !== true) {
                                        var firstUnmaskedPosition = firstMaskPos;
                                        if (opts.insertMode == true) {
                                            if (opts.greedy == true) {
                                                var bfrClone = buffer.slice();
                                                while (getBufferElement(bfrClone, firstUnmaskedPosition, true) != getPlaceHolder(firstUnmaskedPosition) && firstUnmaskedPosition <= p) {
                                                    firstUnmaskedPosition = firstUnmaskedPosition == maskL ? (maskL + 1) : seekNext(buffer, firstUnmaskedPosition);
                                                }
                                            }

                                            if (firstUnmaskedPosition <= p && (opts.greedy || buffer.length < maskL)) {
                                                if (buffer[firstMaskPos] != getPlaceHolder(firstMaskPos) && buffer.length < maskL) {
                                                    var offset = prepareBuffer(buffer, -1, isRTL);
                                                    if (pos.end != 0) p = p + offset;
                                                    maskL = buffer.length;
                                                }
                                                shiftL(firstUnmaskedPosition, opts.numericInput ? seekPrevious(buffer, p) : p, c);
                                            } else writeOutBuffer = false;
                                        } else setBufferElement(buffer, opts.numericInput ? seekPrevious(buffer, p) : p, c);
                                    }
                                    if (writeOutBuffer) {
                                        writeBuffer(input, buffer, opts.numericInput && p == 0 ? seekNext(buffer, p) : p);
                                        setTimeout(function () { //timeout needed for IE
                                            if (isComplete(input))
                                                $input.trigger("complete");
                                        }, 0);
                                    }
                                } else if (android) writeBuffer(input, buffer, pos.begin);
                            }
                            else {
                                var p = seekNext(buffer, pos.begin - 1), np;
                                prepareBuffer(buffer, p, isRTL);
                                if ((np = isValid(p, c, buffer, false, isRTL)) !== false) {
                                    var refresh = false;
                                    if (np !== true) {
                                        refresh = np["refresh"]; //only rewrite buffer from isValid
                                        p = np.pos != undefined ? np.pos : p; //set new position from isValid
                                        c = np.c != undefined ? np.c : c; //set new char from isValid
                                    }
                                    if (refresh !== true) {
                                        if (opts.insertMode == true) {
                                            var lastUnmaskedPosition = getMaskLength();
                                            var bfrClone = buffer.slice();
                                            while (getBufferElement(bfrClone, lastUnmaskedPosition, true) != getPlaceHolder(lastUnmaskedPosition) && lastUnmaskedPosition >= p) {
                                                lastUnmaskedPosition = lastUnmaskedPosition == 0 ? -1 : seekPrevious(buffer, lastUnmaskedPosition);
                                            }
                                            if (lastUnmaskedPosition >= p)
                                                shiftR(p, buffer.length, c);
                                            else writeOutBuffer = false;
                                        } else setBufferElement(buffer, p, c);
                                    }
                                    if (writeOutBuffer) {
                                        var next = seekNext(buffer, p);
                                        writeBuffer(input, buffer, next);

                                        setTimeout(function () { //timeout needed for IE
                                            if (isComplete(input))
                                                $input.trigger("complete");
                                        }, 0);
                                    }
                                } else if (android) writeBuffer(input, buffer, pos.begin);
                            }
                            e.preventDefault();
                        }
                    }
                }

                function keyupEvent(e) {
                    var $input = $(this), input = this;
                    var k = e.keyCode;
                    opts.onKeyUp.call(this, e, opts); //extra stuff to execute on keyup
                    if (k == opts.keyCode.TAB && $input.hasClass('focus.inputmask') && input._valueGet().length == 0) {
                        buffer = getActiveBuffer().slice();
                        writeBuffer(input, buffer);
                        if (!isRTL) caret(input, 0);
                        undoBuffer = input._valueGet();
                    }
                }
            }

            return this; //return this to expose publics
        };
    }
})(jQuery);
