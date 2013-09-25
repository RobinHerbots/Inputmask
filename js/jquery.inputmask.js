/**
* @license Input Mask plugin for jquery
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2013 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 0.0.0
*/

(function ($) {
    if ($.fn.inputmask === undefined) {
        $.inputmask = {
            //options default
            defaults: {
                placeholder: "_",
                optionalmarker: { start: "[", end: "]" },
                quantifiermarker: { start: "{", end: "}" },
                groupmarker: { start: "(", end: ")" },
                escapeChar: "\\",
                mask: null,
                oncomplete: $.noop, //executes when the mask is complete
                onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
                oncleared: $.noop, //executes when the mask is cleared
                repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
                greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
                autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
                clearMaskOnLostFocus: true,
                insertMode: true, //insert the input or overwrite the input
                clearIncomplete: false, //clear the incomplete input on blur
                aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
                onKeyUp: $.noop, //override to implement autocomplete on certain keys for example
                onKeyDown: $.noop, //override to implement autocomplete on certain keys for example
                showMaskOnFocus: true, //show the mask-placeholder when the input has focus
                showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
                onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
                skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
                showTooltip: false, //show the activemask as tooltip
                numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
                //numeric basic properties
                isNumeric: false, //enable numeric features
                radixPoint: "", //".", // | ","
                skipRadixDance: false, //disable radixpoint caret positioning
                rightAlignNumerics: true, //align numerics to the right
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
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                getMaskLength: function (buffer, greedy, repeat, currentBuffer, opts) {
                    var calculatedLength = buffer.length;
                    if (!greedy) {
                        if (repeat == "*") {
                            calculatedLength = currentBuffer.length + 1;
                        } else if (repeat > 1) {
                            calculatedLength += (buffer.length * (repeat - 1));
                        }
                    }
                    return calculatedLength;
                }
            },
            escapeRegex: function (str) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
            }
        };

        $.fn.inputmask = function (fn, options) {
            var opts = $.extend(true, {}, $.inputmask.defaults, options),
                msie10 = /*@cc_on!@*/false,
                iphone = navigator.userAgent.match(new RegExp("iphone", "i")) !== null,
                android = navigator.userAgent.match(new RegExp("android.*safari.*", "i")) !== null,
                pasteEvent = isInputEventSupported('paste') && !msie10 ? 'paste' : isInputEventSupported('input') ? 'input' : "propertychange",
                android53x,
                masksets,
                activeMasksetIndex = 0;

            if (android) {
                var browser = navigator.userAgent.match(/safari.*/i),
                    version = parseInt(new RegExp(/[0-9]+/).exec(browser));
                android53x = (version <= 537);
                //android534 = (533 < version) && (version <= 534);
            }
            if (typeof fn === "string") {
                switch (fn) {
                    case "mask":
                        //resolve possible aliases given by options
                        resolveAlias(opts.alias, options);
                        masksets = generateMaskSets();

                        return this.each(function () {
                            maskScope($.extend(true, {}, masksets), 0).mask(this);
                        });
                    case "unmaskedvalue":
                        var $input = $(this), input = this;
                        if ($input.data('_inputmask')) {
                            masksets = $input.data('_inputmask')['masksets'];
                            activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
                            opts = $input.data('_inputmask')['opts'];
                            return maskScope(masksets, activeMasksetIndex).unmaskedvalue($input);
                        } else return $input.val();
                    case "remove":
                        return this.each(function () {
                            var $input = $(this), input = this;
                            if ($input.data('_inputmask')) {
                                masksets = $input.data('_inputmask')['masksets'];
                                activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
                                opts = $input.data('_inputmask')['opts'];
                                //writeout the unmaskedvalue
                                input._valueSet(maskScope(masksets, activeMasksetIndex).unmaskedvalue($input, true));
                                //clear data
                                $input.removeData('_inputmask');
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
                                try { //try catch needed for IE7 as it does not supports deleting fns
                                    delete input._valueGet;
                                    delete input._valueSet;
                                } catch (e) {
                                    input._valueGet = undefined;
                                    input._valueSet = undefined;

                                }
                            }
                        });
                        break;
                    case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
                        if (this.data('_inputmask')) {
                            masksets = this.data('_inputmask')['masksets'];
                            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                            return masksets[activeMasksetIndex]['_buffer'].join('');
                        }
                        else return "";
                    case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value 
                        return this.data('_inputmask') ? !this.data('_inputmask')['opts'].autoUnmask : false;
                    case "isComplete":
                        masksets = this.data('_inputmask')['masksets'];
                        activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                        opts = this.data('_inputmask')['opts'];
                        return maskScope(masksets, activeMasksetIndex).isComplete(this[0]._valueGet().split(''));
                    case "getmetadata": //return mask metadata if exists
                        if (this.data('_inputmask')) {
                            masksets = this.data('_inputmask')['masksets'];
                            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                            return masksets[activeMasksetIndex]['metadata'];
                        }
                        else return undefined;
                    default:
                        //check if the fn is an alias
                        if (!resolveAlias(fn, options)) {
                            //maybe fn is a mask so we try
                            //set mask
                            opts.mask = fn;
                        }
                        masksets = generateMaskSets();

                        return this.each(function () {
                            maskScope($.extend(true, {}, masksets), activeMasksetIndex).mask(this);
                        });

                        break;
                }
            } else if (typeof fn == "object") {
                opts = $.extend(true, {}, $.inputmask.defaults, fn);

                resolveAlias(opts.alias, fn); //resolve aliases
                masksets = generateMaskSets();

                return this.each(function () {
                    maskScope($.extend(true, {}, masksets), activeMasksetIndex).mask(this);
                });
            } else if (fn == undefined) {
                //look for data-inputmask atribute - the attribute should only contain optipns
                return this.each(function () {
                    var attrOptions = $(this).attr("data-inputmask");
                    if (attrOptions && attrOptions != "") {
                        try {
                            attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
                            var dataoptions = $.parseJSON("{" + attrOptions + "}");
                            $.extend(true, dataoptions, options);
                            opts = $.extend(true, {}, $.inputmask.defaults, dataoptions);
                            resolveAlias(opts.alias, dataoptions);
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
                if (opts.numericInput) {
                    mask = mask.split('').reverse().join('');
                }
                var escaped = false, outCount = 0, greedy = opts.greedy, repeat = opts.repeat;
                if (repeat == "*") greedy = false;
                if (greedy == true && opts.placeholder == "") opts.placeholder = " ";
                if (mask.length == 1 && greedy == false) { opts.placeholder = ""; } //hide placeholder with single non-greedy mask
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
                for (var i = 1; i < repeat && greedy; i++) {
                    repeatedMask = repeatedMask.concat(singleMask.slice());
                }

                return { "mask": repeatedMask, "repeat": repeat, "greedy": greedy };
            }
            //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int, casing: null/upper/lower, def: definitionSymbol}
            function getTestingChain(mask) {
                if (opts.numericInput) {
                    mask = mask.split('').reverse().join('');
                }
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
                                outElem.push({ fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function () { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: isOptional, newBlockMarker: isOptional == true ? newBlockMarker : false, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
                                if (isOptional == true) //reset newBlockMarker
                                    newBlockMarker = false;
                            }
                            outElem.push({ fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function () { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
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
            function generateMaskSets() {
                var ms = [];
                var genmasks = []; //used to keep track of the masks that where processed, to avoid duplicates
                var maskTokens = [];
                function analyseMask(mask) { //just an idea - not in use for the moment
                    var tokenizer = /(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[]()|\\]+|./g;
                    //var tokenizer = /\[\^?]?(?:[^\\\]]+ | \\[\S\s]?)*]? | \\(?:0(?:[0-3][0-7]{0,2} | [4-7][0-7]?)? | [1-9][0-9]* | x[0-9A-Fa-f]{2} | u[0-9A-Fa-f]{4} | c[A-Za-z] | [\S\s]?) | \((?:\?[:=!]?)? | (?:[?*+] | \{[0-9]+(?:,[0-9]*)?\})\?? | [^.?*+^${[() | \\]+ | ./g;
                    function maskToken() {
                        this.matches = [];
                        this.isGroup = false;
                        this.isOptional = false;
                        this.isQuantifier = false;
                    };
                    var currentToken = new maskToken(),
                        match, m, openenings = [];

                    maskTokens = [];

                    while (match = tokenizer.exec(mask)) {
                        m = match[0];
                        switch (m.charAt(0)) {
                            case opts.optionalmarker.end:
                                // optional closing
                            case opts.groupmarker.end:
                                // Group closing
                                var openingToken = openenings.pop();
                                if (openenings.length > 0) {
                                    openenings[openenings.length - 1]["matches"].push(openingToken);
                                } else {
                                    maskTokens.push(openingToken);
                                    currentToken = new maskToken();
                                }
                                break;
                            case opts.optionalmarker.start:
                                // optional opening
                                if (!currentToken.isGroup && currentToken.matches.length > 0)
                                    maskTokens.push(currentToken);
                                currentToken = new maskToken();
                                currentToken.isOptional = true;
                                openenings.push(currentToken);
                                break;
                            case opts.groupmarker.start:
                                // Group opening
                                if (!currentToken.isGroup && currentToken.matches.length > 0)
                                    maskTokens.push(currentToken);
                                currentToken = new maskToken();
                                currentToken.isGroup = true;
                                openenings.push(currentToken);
                                break;
                            case opts.quantifiermarker.start:
                                //Quantifier
                                var quantifier = new maskToken();
                                quantifier.isQuantifier = true;
                                quantifier.matches.push(m);
                                if (openenings.length > 0) {
                                    openenings[openenings.length - 1]["matches"].push(quantifier);
                                } else {
                                    currentToken.matches.push(quantifier);
                                }
                                break;
                            default:
                                if (openenings.length > 0) {
                                    openenings[openenings.length - 1]["matches"].push(m);
                                } else {
                                    currentToken.matches.push(m);
                                }
                        }
                    }

                    if (currentToken.matches.length > 0)
                        maskTokens.push(currentToken);

                    return maskTokens;
                }

                function markOptional(maskPart) { //needed for the clearOptionalTail functionality
                    return opts.optionalmarker.start + maskPart + opts.optionalmarker.end;
                }
                function splitFirstOptionalEndPart(maskPart) {
                    var optionalStartMarkers = 0, optionalEndMarkers = 0, mpl = maskPart.length;
                    for (i = 0; i < mpl; i++) {
                        if (maskPart.charAt(i) == opts.optionalmarker.start) {
                            optionalStartMarkers++;
                        }
                        if (maskPart.charAt(i) == opts.optionalmarker.end) {
                            optionalEndMarkers++;
                        }
                        if (optionalStartMarkers > 0 && optionalStartMarkers == optionalEndMarkers)
                            break;
                    }
                    var maskParts = [maskPart.substring(0, i)];
                    if (i < mpl) {
                        maskParts.push(maskPart.substring(i + 1, mpl));
                    }
                    return maskParts;
                }
                function splitFirstOptionalStartPart(maskPart) {
                    var mpl = maskPart.length;
                    for (i = 0; i < mpl; i++) {
                        if (maskPart.charAt(i) == opts.optionalmarker.start) {
                            break;
                        }
                    }
                    var maskParts = [maskPart.substring(0, i)];
                    if (i < mpl) {
                        maskParts.push(maskPart.substring(i + 1, mpl));
                    }
                    return maskParts;
                }
                function generateMask(maskPrefix, maskPart, metadata) {
                    var maskParts = splitFirstOptionalEndPart(maskPart);
                    var newMask, maskTemplate;

                    var masks = splitFirstOptionalStartPart(maskParts[0]);
                    if (masks.length > 1) {
                        newMask = maskPrefix + masks[0] + markOptional(masks[1]) + (maskParts.length > 1 ? maskParts[1] : "");
                        if ($.inArray(newMask, genmasks) == -1) {
                            genmasks.push(newMask);
                            maskTemplate = getMaskTemplate(newMask);
                            ms.push({
                                "mask": newMask,
                                "_buffer": maskTemplate["mask"],
                                "buffer": maskTemplate["mask"].slice(),
                                "tests": getTestingChain(newMask),
                                "lastValidPosition": -1,
                                "greedy": maskTemplate["greedy"],
                                "repeat": maskTemplate["repeat"],
                                "metadata": metadata
                            });
                        }
                        newMask = maskPrefix + masks[0] + (maskParts.length > 1 ? maskParts[1] : "");
                        if ($.inArray(newMask, genmasks) == -1) {
                            genmasks.push(newMask);
                            maskTemplate = getMaskTemplate(newMask);
                            ms.push({
                                "mask": newMask,
                                "_buffer": maskTemplate["mask"],
                                "buffer": maskTemplate["mask"].slice(),
                                "tests": getTestingChain(newMask),
                                "lastValidPosition": -1,
                                "greedy": maskTemplate["greedy"],
                                "repeat": maskTemplate["repeat"],
                                "metadata": metadata
                            });
                        }
                        if (splitFirstOptionalStartPart(masks[1]).length > 1) { //optional contains another optional
                            generateMask(maskPrefix + masks[0], masks[1] + maskParts[1], metadata);
                        }
                        if (maskParts.length > 1 && splitFirstOptionalStartPart(maskParts[1]).length > 1) {
                            generateMask(maskPrefix + masks[0] + markOptional(masks[1]), maskParts[1], metadata);
                            generateMask(maskPrefix + masks[0], maskParts[1], metadata);
                        }
                    }
                    else {
                        newMask = maskPrefix + maskParts;
                        if ($.inArray(newMask, genmasks) == -1) {
                            genmasks.push(newMask);
                            maskTemplate = getMaskTemplate(newMask);
                            ms.push({
                                "mask": newMask,
                                "_buffer": maskTemplate["mask"],
                                "buffer": maskTemplate["mask"].slice(),
                                "tests": getTestingChain(newMask),
                                "lastValidPosition": -1,
                                "greedy": maskTemplate["greedy"],
                                "repeat": maskTemplate["repeat"],
                                "metadata": metadata
                            });
                        }
                    }

                }

                if ($.isFunction(opts.mask)) { //allow mask to be a preprocessing fn - should return a valid mask
                    opts.mask = opts.mask.call(this, opts);
                }
                if ($.isArray(opts.mask)) {
                    $.each(opts.mask, function (ndx, msk) {
                        if (msk["mask"] != undefined) {
                            generateMask("", msk["mask"].toString(), msk);
                        } else
                            generateMask("", msk.toString());
                    });
                } else generateMask("", opts.mask.toString());

                //analyseMask(opts.mask);

                return opts.greedy ? ms : ms.sort(function (a, b) { return a["mask"].length - b["mask"].length; });
            }
            function getPlaceHolder(pos) {
                return opts.placeholder.charAt(pos % opts.placeholder.length);
            }

            function maskScope(masksets, activeMasksetIndex) {
                var isRTL = false,
                    valueOnFocus = getActiveBuffer().join('');

                //maskset helperfunctions
                function getActiveMaskSet() {
                    return masksets[activeMasksetIndex];
                }

                function getActiveTests() {
                    return getActiveMaskSet()['tests'];
                }

                function getActiveBufferTemplate() {
                    return getActiveMaskSet()['_buffer'];
                }

                function getActiveBuffer() {
                    return getActiveMaskSet()['buffer'];
                }

                function isValid(pos, c, strict) { //strict true ~ no correction or autofill
                    strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions 

                    function _isValid(position, activeMaskset, c, strict) {
                        var testPos = determineTestPosition(position), loopend = c ? 1 : 0, chrs = '', buffer = activeMaskset["buffer"];
                        for (var i = activeMaskset['tests'][testPos].cardinality; i > loopend; i--) {
                            chrs += getBufferElement(buffer, testPos - (i - 1));
                        }

                        if (c) {
                            chrs += c;
                        }

                        //return is false or a json object => { pos: ??, c: ??} or true
                        return activeMaskset['tests'][testPos].fn != null ?
                            activeMaskset['tests'][testPos].fn.test(chrs, buffer, position, strict, opts)
                            : (c == getBufferElement(activeMaskset['_buffer'], position, true) || c == opts.skipOptionalPartCharacter) ?
                                { "refresh": true, c: getBufferElement(activeMaskset['_buffer'], position, true), pos: position }
                                : false;
                    }

                    function PostProcessResults(maskForwards, results) {
                        var hasValidActual = false;
                        $.each(results, function (ndx, rslt) {
                            hasValidActual = $.inArray(rslt["activeMasksetIndex"], maskForwards) == -1 && rslt["result"] !== false;
                            if (hasValidActual) return false;
                        });
                        if (hasValidActual) { //strip maskforwards
                            results = $.map(results, function (rslt, ndx) {
                                if ($.inArray(rslt["activeMasksetIndex"], maskForwards) == -1) {
                                    return rslt;
                                } else {
                                    masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = actualLVP;
                                }
                            });
                        } else { //keep maskforwards with the least forward
                            var lowestPos = -1, lowestIndex = -1;
                            $.each(results, function (ndx, rslt) {
                                if ($.inArray(rslt["activeMasksetIndex"], maskForwards) != -1 && rslt["result"] !== false & (lowestPos == -1 || lowestPos > rslt["result"]["pos"])) {
                                    lowestPos = rslt["result"]["pos"];
                                    lowestIndex = rslt["activeMasksetIndex"];
                                }
                            });
                            results = $.map(results, function (rslt, ndx) {
                                if ($.inArray(rslt["activeMasksetIndex"], maskForwards) != -1) {
                                    if (rslt["result"]["pos"] == lowestPos) {
                                        return rslt;
                                    } else if (rslt["result"] !== false) {
                                        for (var i = pos; i < lowestPos; i++) {
                                            rsltValid = _isValid(i, masksets[rslt["activeMasksetIndex"]], masksets[lowestIndex]["buffer"][i], true);
                                            if (rsltValid === false) {
                                                break;
                                            } else {
                                                setBufferElement(masksets[rslt["activeMasksetIndex"]]["buffer"], i, masksets[lowestIndex]["buffer"][i], true);
                                                masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = i;
                                            }
                                        }
                                        //also check check for the lowestpos with the new input
                                        rsltValid = _isValid(lowestPos, masksets[rslt["activeMasksetIndex"]], c, true);
                                        if (rsltValid !== false) {
                                            setBufferElement(masksets[rslt["activeMasksetIndex"]]["buffer"], lowestPos, c, true);
                                            masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = lowestPos;
                                        }
                                        //console.log("ndx " + rslt["activeMasksetIndex"] + " validate " + masksets[rslt["activeMasksetIndex"]]["buffer"].join('') + " lv " + masksets[rslt["activeMasksetIndex"]]['lastValidPosition']);
                                        return rslt;
                                    }
                                }
                            });
                        }
                        return results;
                    }

                    if (strict) {
                        var result = _isValid(pos, getActiveMaskSet(), c, strict); //only check validity in current mask when validating strict
                        if (result === true) {
                            result = { "pos": pos }; //always take a possible corrected maskposition into account
                        }
                        return result;
                    }

                    var results = [], result = false, currentActiveMasksetIndex = activeMasksetIndex,
                        actualBuffer = getActiveBuffer().slice(), actualLVP = getActiveMaskSet()["lastValidPosition"],
                        actualPrevious = seekPrevious(pos),
                        maskForwards = [];
                    $.each(masksets, function (index, value) {
                        if (typeof (value) == "object") {
                            activeMasksetIndex = index;

                            var maskPos = pos;
                            var lvp = getActiveMaskSet()['lastValidPosition'],
                                rsltValid;
                            if (lvp == actualLVP && (maskPos - actualLVP) > 1) {
                                for (var i = lvp == -1 ? 0 : lvp; i < maskPos; i++) {
                                    rsltValid = _isValid(i, getActiveMaskSet(), actualBuffer[i], true);
                                    if (rsltValid === false) {
                                        break;
                                    } else {
                                        setBufferElement(getActiveBuffer(), i, actualBuffer[i], true);
                                        if (rsltValid === true) {
                                            rsltValid = { "pos": i }; //always take a possible corrected maskposition into account
                                        }
                                        var newValidPosition = rsltValid.pos || i;
                                        if (getActiveMaskSet()['lastValidPosition'] < newValidPosition)
                                            getActiveMaskSet()['lastValidPosition'] = newValidPosition; //set new position from isValid
                                    }
                                }
                            }

                            if (!isMask(maskPos) && !_isValid(maskPos, getActiveMaskSet(), c, strict)) {
                                maskPos = seekNext(pos);
                                maskForwards.push(activeMasksetIndex);
                                //console.log('maskforwards ' + activeMasksetIndex);
                            }

                            if (getActiveMaskSet()['lastValidPosition'] >= actualLVP || activeMasksetIndex == currentActiveMasksetIndex) {
                                if (maskPos >= 0 && maskPos < getMaskLength()) {
                                    result = _isValid(maskPos, getActiveMaskSet(), c, strict);
                                    if (result !== false) {
                                        if (result === true) {
                                            result = { "pos": maskPos }; //always take a possible corrected maskposition into account
                                        }
                                        var newValidPosition = result.pos || maskPos;
                                        if (getActiveMaskSet()['lastValidPosition'] < newValidPosition)
                                            getActiveMaskSet()['lastValidPosition'] = newValidPosition; //set new position from isValid
                                        //console.log("pos " + pos + " ndx " + activeMasksetIndex + " validate " + getActiveBuffer().join('') + " lv " + getActiveMaskSet()['lastValidPosition']);
                                    }
                                    results.push({ "activeMasksetIndex": index, "result": result });
                                }
                            }
                        }
                    });
                    activeMasksetIndex = currentActiveMasksetIndex; //reset activeMasksetIndex

                    return PostProcessResults(maskForwards, results); //return results of the multiple mask validations
                }

                function determineActiveMasksetIndex() {
                    var currentMasksetIndex = activeMasksetIndex,
                        highestValid = { "activeMasksetIndex": 0, "lastValidPosition": -1, "next": -1 };
                    $.each(masksets, function (index, value) {
                        if (typeof (value) == "object") {
                            activeMasksetIndex = index;
                            if (getActiveMaskSet()['lastValidPosition'] > highestValid['lastValidPosition']) {
                                highestValid["activeMasksetIndex"] = index;
                                highestValid["lastValidPosition"] = getActiveMaskSet()['lastValidPosition'];
                                highestValid["next"] = seekNext(getActiveMaskSet()['lastValidPosition']);
                            } else if (getActiveMaskSet()['lastValidPosition'] == highestValid['lastValidPosition'] &&
                                   (highestValid['next'] == -1 || highestValid['next'] > seekNext(getActiveMaskSet()['lastValidPosition']))) {
                                highestValid["activeMasksetIndex"] = index;
                                highestValid["lastValidPosition"] = getActiveMaskSet()['lastValidPosition'];
                                highestValid["next"] = seekNext(getActiveMaskSet()['lastValidPosition']);
                            }
                        }
                    });

                    activeMasksetIndex = highestValid["lastValidPosition"] != -1 && masksets[currentMasksetIndex]["lastValidPosition"] == highestValid["lastValidPosition"] ? currentMasksetIndex : highestValid["activeMasksetIndex"];
                    if (currentMasksetIndex != activeMasksetIndex) {
                        clearBuffer(getActiveBuffer(), seekNext(highestValid["lastValidPosition"]), getMaskLength());
                        getActiveMaskSet()["writeOutBuffer"] = true;
                    }
                }

                function isMask(pos) {
                    var testPos = determineTestPosition(pos);
                    var test = getActiveTests()[testPos];

                    return test != undefined ? test.fn : false;
                }

                function determineTestPosition(pos) {
                    return pos % getActiveTests().length;
                }



                function getMaskLength() {
                    return opts.getMaskLength(getActiveBufferTemplate(), getActiveMaskSet()['greedy'], getActiveMaskSet()['repeat'], getActiveBuffer(), opts);
                }

                //pos: from position

                function seekNext(pos) {
                    var maskL = getMaskLength();
                    if (pos >= maskL) return maskL;
                    var position = pos;
                    while (++position < maskL && !isMask(position)) {
                    }
                    ;
                    return position;
                }

                //pos: from position

                function seekPrevious(pos) {
                    var position = pos;
                    if (position <= 0) return 0;

                    while (--position > 0 && !isMask(position)) {
                    }
                    ;
                    return position;
                }

                function setBufferElement(buffer, position, element, autoPrepare) {
                    if (autoPrepare) position = prepareBuffer(buffer, position);

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

                function prepareBuffer(buffer, position) {
                    var j;
                    while (buffer[position] == undefined && buffer.length < getMaskLength()) {
                        j = 0;
                        while (getActiveBufferTemplate()[j] !== undefined) { //add a new buffer
                            buffer.push(getActiveBufferTemplate()[j++]);
                        }
                    }

                    return position;
                }

                function writeBuffer(input, buffer, caretPos) {
                    input._valueSet(buffer.join(''));
                    if (caretPos != undefined) {
                        caret(input, caretPos);
                    }
                }

                ;

                function clearBuffer(buffer, start, end) {
                    for (var i = start, maskL = getMaskLength() ; i < end && i < maskL; i++) {
                        setBufferElement(buffer, i, getBufferElement(getActiveBufferTemplate().slice(), i, true));
                    }
                }

                ;

                function setReTargetPlaceHolder(buffer, pos) {
                    var testPos = determineTestPosition(pos);
                    setBufferElement(buffer, pos, getBufferElement(getActiveBufferTemplate(), testPos));
                }

                function checkVal(input, writeOut, strict, nptvl) {
                    var inputValue = nptvl != undefined ? nptvl.slice() : truncateInput(input._valueGet()).split('');

                    $.each(masksets, function (ndx, ms) {
                        if (typeof (ms) == "object") {
                            ms["buffer"] = ms["_buffer"].slice();
                            ms["lastValidPosition"] = -1;
                        }
                    });
                    if (strict !== true) activeMasksetIndex = 0;
                    if (writeOut) input._valueSet(""); //initial clear
                    var ml = getMaskLength();
                    $.each(inputValue, function (ndx, charCode) {
                        var index = ndx,
                            lvp = getActiveMaskSet()["lastValidPosition"],
                            pos = lvp == -1 ? index : seekNext(lvp);

                        if ((strict && isMask(index)) ||
                            ((charCode != getBufferElement(getActiveBufferTemplate().slice(), index, true) || isMask(index)) &&
                             $.inArray(charCode, getActiveBufferTemplate().slice(lvp + 1, pos)) == -1)
                            ) {
                            $(input).trigger("_keypress", [true, charCode.charCodeAt(0), writeOut, strict, index]);
                        }
                    });

                    if (strict === true) {
                        getActiveMaskSet()["lastValidPosition"] = seekPrevious(getActiveMaskSet()["p"]);
                    }
                }

                function escapeRegex(str) {
                    return $.inputmask.escapeRegex.call(this, str);
                }

                function truncateInput(inputValue) {
                    return inputValue.replace(new RegExp("(" + escapeRegex(getActiveBufferTemplate().join('')) + ")*$"), "");
                }

                function clearOptionalTail(input) {
                    var buffer = getActiveBuffer(), tmpBuffer = buffer.slice(), testPos, pos;
                    for (var pos = tmpBuffer.length - 1; pos >= 0; pos--) {
                        var testPos = determineTestPosition(pos);
                        if (getActiveTests()[testPos].optionality) {
                            if (!isMask(pos) || !isValid(pos, buffer[pos], true))
                                tmpBuffer.pop();
                            else break;
                        } else break;
                    }
                    writeBuffer(input, tmpBuffer);
                }

                //functionality fn
                this.unmaskedvalue = function ($input, skipDatepickerCheck) {
                    isRTL = $input.data('_inputmask')['isRTL'];
                    return unmaskedvalue($input, skipDatepickerCheck);
                };
                function unmaskedvalue($input, skipDatepickerCheck) {
                    if (getActiveTests() && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
                        //checkVal(input, false, true);
                        var umValue = $.map(getActiveBuffer(), function (element, index) {
                            return isMask(index) && isValid(index, element, true) ? element : null;
                        });
                        return (isRTL ? umValue.reverse() : umValue).join('');
                    } else {
                        return $input[0]._valueGet();
                    }
                }

                function TranslatePosition(pos) {
                    if (isRTL && typeof pos == 'number') {
                        var bffrLght = getActiveBuffer().length;
                        pos = bffrLght - pos;
                    }
                    return pos;
                }
                function caret(input, begin, end) {
                    var npt = input.jquery && input.length > 0 ? input[0] : input, range;
                    if (typeof begin == 'number') {
                        begin = TranslatePosition(begin); end = TranslatePosition(end);
                        if (!$(input).is(':visible')) {
                            return;
                        }
                        end = (typeof end == 'number') ? end : begin;
                        if (opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
                        if (npt.setSelectionRange) {
                            npt.selectionStart = begin;
                            npt.selectionEnd = android ? begin : end;

                        } else if (npt.createTextRange) {
                            range = npt.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', end);
                            range.moveStart('character', begin);
                            range.select();
                        }
                    } else {
                        if (!$(input).is(':visible')) {
                            return { "begin": 0, "end": 0 };
                        }
                        if (npt.setSelectionRange) {
                            begin = npt.selectionStart;
                            end = npt.selectionEnd;
                        } else if (document.selection && document.selection.createRange) {
                            range = document.selection.createRange();
                            begin = 0 - range.duplicate().moveStart('character', -100000);
                            end = begin + range.text.length;
                        }
                        begin = TranslatePosition(begin); end = TranslatePosition(end);
                        return { "begin": begin, "end": end };
                    }
                };

                this.isComplete = function (buffer) {
                    return isComplete(buffer);
                };
                function isComplete(buffer) {
                    var complete = false, highestValidPosition = 0, currentActiveMasksetIndex = activeMasksetIndex;
                    $.each(masksets, function (ndx, ms) {
                        if (typeof (ms) == "object") {
                            activeMasksetIndex = ndx;
                            var aml = seekPrevious(getMaskLength());
                            if (ms["lastValidPosition"] >= highestValidPosition && ms["lastValidPosition"] == aml) {
                                var msComplete = true;
                                for (var i = 0; i <= aml; i++) {
                                    var mask = isMask(i), testPos = determineTestPosition(i);
                                    if ((mask && (buffer[i] == undefined || buffer[i] == getPlaceHolder(i))) || (!mask && buffer[i] != getActiveBufferTemplate()[testPos])) {
                                        msComplete = false;
                                        break;
                                    }
                                }
                                complete = complete || msComplete;
                                if (complete) //break loop
                                    return false;
                            }
                            highestValidPosition = ms["lastValidPosition"];
                        }
                    });
                    activeMasksetIndex = currentActiveMasksetIndex; //reset activeMaskset
                    return complete;
                }

                function isSelection(begin, end) {
                    return isRTL ? (begin - end) > 1 || ((begin - end) == 1 && opts.insertMode) :
                            (end - begin) > 1 || ((end - begin) == 1 && opts.insertMode);
                }

                this.mask = function (el) {
                    var $input = $(el);
                    if (!$input.is(":input")) return;

                    //store tests & original buffer in the input element - used to get the unmasked value
                    $input.data('_inputmask', {
                        'masksets': masksets,
                        'activeMasksetIndex': activeMasksetIndex,
                        'opts': opts,
                        'isRTL': false
                    });

                    //show tooltip
                    if (opts.showTooltip) {
                        $input.prop("title", getActiveMaskSet()["mask"]);
                    }

                    //correct greedy setting if needed
                    getActiveMaskSet()['greedy'] = getActiveMaskSet()['greedy'] ? getActiveMaskSet()['greedy'] : getActiveMaskSet()['repeat'] == 0;

                    //handle maxlength attribute
                    if ($input.attr("maxLength") != null) //only when the attribute is set
                    {
                        var maxLength = $input.prop('maxLength');
                        if (maxLength > -1) { //handle *-repeat
                            $.each(masksets, function (ndx, ms) {
                                if (typeof (ms) == "object") {
                                    if (ms["repeat"] == "*") {
                                        ms["repeat"] = maxLength;
                                    }
                                }
                            });
                        }
                        if (getMaskLength() > maxLength && maxLength > -1) { //FF sets no defined max length to -1 
                            if (maxLength < getActiveBufferTemplate().length) getActiveBufferTemplate().length = maxLength;
                            if (getActiveMaskSet()['greedy'] == false) {
                                getActiveMaskSet()['repeat'] = Math.round(maxLength / getActiveBufferTemplate().length);
                            }
                            $input.prop('maxLength', getMaskLength() * 2);
                        }
                    }

                    patchValueProperty(el);

                    //init vars
                    var skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
                        ignorable = false;

                    if (opts.numericInput) opts.isNumeric = opts.numericInput;
                    if (el.dir == "rtl" || (opts.numericInput && opts.rightAlignNumerics) || (opts.isNumeric && opts.rightAlignNumerics))
                        $input.css("text-align", "right");

                    if (el.dir == "rtl" || opts.numericInput) {
                        el.dir = "ltr";
                        $input.removeAttr("dir");
                        var inputData = $input.data('_inputmask');
                        inputData['isRTL'] = true;
                        $input.data('_inputmask', inputData);
                        isRTL = true;
                    }

                    //unbind all events - to make sure that no other mask will interfere when re-masking
                    $input.unbind(".inputmask");
                    $input.removeClass('focus.inputmask');
                    //bind events
                    $input.closest('form').bind("submit", function () { //trigger change on submit if any
                        if (valueOnFocus != getActiveBuffer().join('')) {
                            $input.change();
                        }
                    }).bind('reset', function () {
                        $.each(masksets, function (ndx, ms) {
                            if (typeof (ms) == "object") {
                                ms["buffer"] = ms["_buffer"].slice();
                                ms["lastValidPosition"] = -1;
                            }
                        });
                    });
                    $input.bind("mouseenter.inputmask", function () {
                        var $input = $(this), input = this;
                        if (!$input.hasClass('focus.inputmask') && opts.showMaskOnHover) {
                            if (input._valueGet() != getActiveBuffer().join('')) {
                                writeBuffer(input, getActiveBuffer());
                            }
                        }
                    }).bind("blur.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet(), buffer = getActiveBuffer();
                        $input.removeClass('focus.inputmask');
                        if (valueOnFocus != getActiveBuffer().join('')) {
                            $input.change();
                        }
                        if (opts.clearMaskOnLostFocus && nptValue != '') {
                            if (nptValue == getActiveBufferTemplate().join(''))
                                input._valueSet('');
                            else { //clearout optional tail of the mask
                                clearOptionalTail(input);
                            }
                        }
                        if (!isComplete(buffer)) {
                            $input.trigger("incomplete");
                            if (opts.clearIncomplete) {
                                $.each(masksets, function (ndx, ms) {
                                    if (typeof (ms) == "object") {
                                        ms["buffer"] = ms["_buffer"].slice();
                                        ms["lastValidPosition"] = -1;
                                    }
                                });
                                activeMasksetIndex = 0;
                                if (opts.clearMaskOnLostFocus)
                                    input._valueSet('');
                                else {
                                    buffer = getActiveBufferTemplate().slice();
                                    writeBuffer(input, buffer);
                                }
                            }
                        }
                    }).bind("focus.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet();
                        if (opts.showMaskOnFocus && !$input.hasClass('focus.inputmask') && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
                            if (input._valueGet() != getActiveBuffer().join('')) {
                                writeBuffer(input, getActiveBuffer(), seekNext(getActiveMaskSet()["lastValidPosition"]));
                            }
                        }
                        $input.addClass('focus.inputmask');
                        valueOnFocus = getActiveBuffer().join('');
                    }).bind("mouseleave.inputmask", function () {
                        var $input = $(this), input = this;
                        if (opts.clearMaskOnLostFocus) {
                            if (!$input.hasClass('focus.inputmask')) {
                                if (input._valueGet() == getActiveBufferTemplate().join('') || input._valueGet() == '')
                                    input._valueSet('');
                                else { //clearout optional tail of the mask
                                    clearOptionalTail(input);
                                }
                            }
                        }
                    }).bind("click.inputmask", function () {
                        var input = this;
                        setTimeout(function () {
                            var selectedCaret = caret(input), buffer = getActiveBuffer();
                            if (selectedCaret.begin == selectedCaret.end) {
                                var clickPosition = opts.isRTL ? TranslatePosition(selectedCaret.begin) : selectedCaret.begin,
                                    lvp = getActiveMaskSet()["lastValidPosition"],
                                    lastPosition;
                                if (opts.isNumeric) {
                                    lastPosition = opts.skipRadixDance === false && opts.radixPoint != "" && $.inArray(opts.radixPoint, buffer) != -1 ?
                                        (opts.numericInput ? seekNext($.inArray(opts.radixPoint, buffer)) : $.inArray(opts.radixPoint, buffer)) :
                                        seekNext(lvp);
                                } else {
                                    lastPosition = seekNext(lvp);
                                }
                                if (clickPosition < lastPosition) {
                                    if (isMask(clickPosition))
                                        caret(input, clickPosition);
                                    else caret(input, seekNext(clickPosition));
                                } else
                                    caret(input, lastPosition);
                            }
                        }, 0);
                    }).bind('dblclick.inputmask', function () {
                        var input = this;
                        setTimeout(function () {
                            caret(input, 0, seekNext(getActiveMaskSet()["lastValidPosition"]));
                        }, 0);
                    }).bind("keydown.inputmask", keydownEvent
                    ).bind("keypress.inputmask", keypressEvent
                    ).bind("keyup.inputmask", keyupEvent
                    ).bind(pasteEvent + ".inputmask dragdrop.inputmask drop.inputmask", function (e) {
                        var input = this, $input = $(input);

                        //paste event for IE8 and lower I guess ;-)
                        if (e.type == "propertychange" && input._valueGet().length <= getMaskLength()) {
                            return true;
                        }
                        setTimeout(function () {
                            checkVal(input, true, false);
                            if (isComplete(getActiveBuffer()))
                                $input.trigger("complete");
                            $input.click();
                        }, 0);
                    }).bind('setvalue.inputmask', function () {
                        var input = this;
                        checkVal(input, true);
                        valueOnFocus = getActiveBuffer().join('');
                        if (input._valueGet() == getActiveBufferTemplate().join(''))
                            input._valueSet('');
                    }).bind("_keypress.inputmask", keypressEvent //will be skipped be the eventruler
                    ).bind('complete.inputmask', opts.oncomplete)
                        .bind('incomplete.inputmask', opts.onincomplete)
                        .bind('cleared.inputmask', opts.oncleared);

                    //apply mask
                    checkVal(el, true, false);
                    valueOnFocus = getActiveBuffer().join('');
                    // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
                    var activeElement;
                    try {
                        activeElement = document.activeElement;
                    } catch (e) {
                    }
                    if (activeElement === el) { //position the caret when in focus
                        $input.addClass('focus.inputmask');
                        caret(el, seekNext(getActiveMaskSet()["lastValidPosition"]));
                    } else if (opts.clearMaskOnLostFocus) {
                        if (getActiveBuffer().join('') == getActiveBufferTemplate().join('')) {
                            el._valueSet('');
                        } else {
                            clearOptionalTail(el);
                        }
                    } else {
                        writeBuffer(el, getActiveBuffer());
                    }

                    installEventRuler(el);

                    //private functions

                    function installEventRuler(npt) {
                        var events = $._data(npt).events;

                        $.each(events, function (eventType, eventHandlers) {
                            $.each(eventHandlers, function (ndx, eventHandler) {
                                if (eventHandler.namespace == "inputmask") {
                                    if (eventHandler.type != "setvalue" && eventHandler.type != "_keypress") {
                                        var handler = eventHandler.handler;
                                        eventHandler.handler = function (e) {
                                            if (this.readOnly || this.disabled)
                                                e.preventDefault;
                                            else
                                                return handler.apply(this, arguments);
                                        };
                                    }
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
                                var valueGet = valueProperty.get;
                                var valueSet = valueProperty.set;
                                npt._valueGet = function () {
                                    return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                                };
                                npt._valueSet = function (value) {
                                    valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                                };

                                Object.defineProperty(npt, "value", {
                                    get: function () {
                                        var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                                            activeMasksetIndex = inputData['activeMasksetIndex'];
                                        return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != masksets[activeMasksetIndex]['_buffer'].join('') ? valueGet.call(this) : '';
                                    },
                                    set: function (value) {
                                        valueSet.call(this, value);
                                        $(this).triggerHandler('setvalue.inputmask');
                                    }
                                });
                            }
                        } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                            if (!npt._valueGet) {
                                var valueGet = npt.__lookupGetter__("value");
                                var valueSet = npt.__lookupSetter__("value");
                                npt._valueGet = function () {
                                    return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                                };
                                npt._valueSet = function (value) {
                                    valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                                };

                                npt.__defineGetter__("value", function () {
                                    var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                                        activeMasksetIndex = inputData['activeMasksetIndex'];
                                    return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != masksets[activeMasksetIndex]['_buffer'].join('') ? valueGet.call(this) : '';
                                });
                                npt.__defineSetter__("value", function (value) {
                                    valueSet.call(this, value);
                                    $(this).triggerHandler('setvalue.inputmask');
                                });
                            }
                        } else {
                            if (!npt._valueGet) {
                                npt._valueGet = function () { return isRTL ? this.value.split('').reverse().join('') : this.value; };
                                npt._valueSet = function (value) { this.value = isRTL ? value.split('').reverse().join('') : value; };
                            }
                            if ($.valHooks.text == undefined || $.valHooks.text.inputmaskpatch != true) {
                                var valueGet = $.valHooks.text && $.valHooks.text.get ? $.valHooks.text.get : function () { return this.value; };
                                var valueSet = $.valHooks.text && $.valHooks.text.set ? $.valHooks.text.set : function (value) { return this.value = value; };

                                jQuery.extend($.valHooks, {
                                    text: {
                                        get: function (elem) {
                                            var $elem = $(elem);
                                            if ($elem.data('_inputmask')) {
                                                if ($elem.data('_inputmask')['opts'].autoUnmask)
                                                    return $elem.inputmask('unmaskedvalue');
                                                else {
                                                    var result = valueGet.call(elem),
                                                        inputData = $elem.data('_inputmask'), masksets = inputData['masksets'],
                                                        activeMasksetIndex = inputData['activeMasksetIndex'];
                                                    return result != masksets[activeMasksetIndex]['_buffer'].join('') ? result : '';
                                                }
                                            } else return valueGet.call(elem);
                                        },
                                        set: function (elem, value) {
                                            var $elem = $(elem);
                                            var result = valueSet.call(elem, value);
                                            if ($elem.data('_inputmask')) $elem.triggerHandler('setvalue.inputmask');
                                            return result;
                                        },
                                        inputmaskpatch: true
                                    }
                                });
                            }
                        }
                    }

                    //shift chars to left from start to end and put c at end position if defined
                    function shiftL(start, end, c) {
                        var buffer = getActiveBuffer();
                        while (!isMask(start) && start - 1 >= 0) start--; //jumping over nonmask position
                        for (var i = start; i < end && i < getMaskLength() ; i++) {
                            if (isMask(i)) {
                                setReTargetPlaceHolder(buffer, i);
                                var j = seekNext(i);
                                var p = getBufferElement(buffer, j);
                                if (p != getPlaceHolder(j)) {
                                    if (j < getMaskLength() && isValid(i, p, true) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
                                        setBufferElement(buffer, i, getBufferElement(buffer, j), true);
                                        if (j < end) {
                                            setReTargetPlaceHolder(buffer, j); //cleanup next position
                                        }
                                    } else {
                                        if (isMask(i))
                                            break;
                                    }
                                } //else if (c == undefined) break;
                            } else {
                                setReTargetPlaceHolder(buffer, i);
                            }
                        }
                        if (c != undefined)
                            setBufferElement(buffer, seekPrevious(end), c);

                        if (getActiveMaskSet()["greedy"] == false) {
                            var trbuffer = truncateInput(buffer.join('')).split('');
                            buffer.length = trbuffer.length;
                            for (var i = 0, bl = buffer.length; i < bl; i++) {
                                buffer[i] = trbuffer[i];
                            }
                            if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
                        }
                        return start; //return the used start position
                    }

                    function shiftR(start, end, c, full) { //full => behave like a push right ~ do not stop on placeholders
                        var buffer = getActiveBuffer();
                        for (var i = start; i <= end && i < getMaskLength() ; i++) {
                            if (isMask(i)) {
                                var t = getBufferElement(buffer, i, true);
                                setBufferElement(buffer, i, c, true);
                                if (t != getPlaceHolder(i)) {
                                    var j = seekNext(i);
                                    if (j < getMaskLength()) {
                                        if (isValid(j, t, true) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def)
                                            c = t;
                                        else {
                                            if (isMask(j))
                                                break;
                                            else c = t;
                                        }
                                    } else break;
                                } else {
                                    c = t;
                                    if (full !== true) break;
                                }
                            } else
                                setReTargetPlaceHolder(buffer, i);
                        }
                        var lengthBefore = buffer.length;
                        if (getActiveMaskSet()["greedy"] == false) {
                            var trbuffer = truncateInput(buffer.join('')).split('');
                            buffer.length = trbuffer.length;
                            for (var i = 0, bl = buffer.length; i < bl; i++) {
                                buffer[i] = trbuffer[i];
                            }
                            if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
                        }
                        return end - (lengthBefore - buffer.length); //return new start position
                    }

                    ;

                    function keydownEvent(e) {
                        //Safari 5.1.x - modal dialog fires keypress twice workaround
                        skipKeyPressEvent = false;
                        var input = this, k = e.keyCode, pos = caret(input);

                        //backspace, delete, and escape get special treatment
                        if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127) || (e.ctrlKey && k == 88)) { //backspace/delete
                            e.preventDefault(); //stop default action but allow propagation

                            if (opts.numericInput || isRTL) {
                                switch (k) {
                                    case opts.keyCode.BACKSPACE:
                                        k = opts.keyCode.DELETE;
                                        break;
                                    case opts.keyCode.DELETE:
                                        k = opts.keyCode.BACKSPACE;
                                        break;
                                }
                            }

                            if (isSelection(pos.begin, pos.end)) {
                                if (isRTL) {
                                    var pend = pos.end;
                                    pos.end = pos.begin;
                                    pos.begin = pend;
                                }
                                clearBuffer(getActiveBuffer(), pos.begin, pos.end);
                                if (pos.begin == 0 && pos.end == getMaskLength()) {
                                    $.each(masksets, function (ndx, ms) {
                                        if (typeof (ms) == "object") {
                                            ms["buffer"] = ms["_buffer"].slice();
                                            ms["lastValidPosition"] = -1;
                                        }
                                    });
                                } else { //partial selection
                                    var ml = getMaskLength();
                                    if (opts.greedy == false) {
                                        shiftL(pos.begin, ml);
                                    } else {
                                        for (var i = pos.begin; i < pos.end; i++) {
                                            if (isMask(i))
                                                shiftL(pos.begin, ml);
                                        }
                                    }
                                    var firstMaskPos = seekNext(-1);
                                    checkVal(input, false, true, getActiveBuffer());
                                    if (getActiveMaskSet()['lastValidPosition'] < firstMaskPos) {
                                        getActiveMaskSet()["lastValidPosition"] = -1;
                                        getActiveMaskSet()["p"] = firstMaskPos;
                                    } else {
                                        getActiveMaskSet()["writeOutBuffer"] = true;
                                        getActiveMaskSet()["p"] = pos.begin;
                                    }
                                }
                            } else {
                                $.each(masksets, function (ndx, ms) {
                                    if (typeof (ms) == "object") {
                                        activeMasksetIndex = ndx;
                                        var beginPos = android53x ? pos.end : pos.begin;
                                        var buffer = getActiveBuffer(), firstMaskPos = seekNext(-1),
                                            maskL = getMaskLength();
                                        if (k == opts.keyCode.BACKSPACE) {
                                            beginPos--;
                                        }
                                        if (beginPos < firstMaskPos)
                                            beginPos = firstMaskPos;
                                        if (beginPos < maskL) {
                                            if (opts.isNumeric && opts.radixPoint != "" && buffer[beginPos] == opts.radixPoint) {
                                                beginPos = (buffer.length - 1 == beginPos) /* radixPoint is latest? delete it */ ? beginPos : seekNext(beginPos);
                                                beginPos = shiftL(beginPos, maskL);
                                            } else {
                                                beginPos = shiftL(beginPos, maskL);
                                            }

                                            if (getActiveMaskSet()['lastValidPosition'] != -1 && getActiveBuffer()[getActiveMaskSet()['lastValidPosition']] == getActiveBufferTemplate()[getActiveMaskSet()['lastValidPosition']])
                                                getActiveMaskSet()["lastValidPosition"] = getActiveMaskSet()["lastValidPosition"] == 0 ? -1 : seekPrevious(getActiveMaskSet()["lastValidPosition"]);
                                            if (getActiveMaskSet()['lastValidPosition'] < firstMaskPos) {
                                                getActiveMaskSet()["lastValidPosition"] = -1;
                                                getActiveMaskSet()["p"] = firstMaskPos;
                                            } else {
                                                getActiveMaskSet()["writeOutBuffer"] = true;
                                                getActiveMaskSet()["p"] = beginPos;
                                            }
                                        }
                                    }
                                });

                            }

                            determineActiveMasksetIndex();
                            writeBuffer(input, getActiveBuffer(), getActiveMaskSet()["p"]);
                            if (input._valueGet() == getActiveBufferTemplate().join(''))
                                $(input).trigger('cleared');

                            if (opts.showTooltip) { //update tooltip
                                $input.prop("title", getActiveMaskSet()["mask"]);
                            }
                        } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
                            setTimeout(function () {
                                var caretPos = seekNext(getActiveMaskSet()["lastValidPosition"]);
                                if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
                                caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
                            }, 0);
                        } else if ((k == opts.keyCode.HOME && !e.shiftKey) || k == opts.keyCode.PAGE_UP) { //Home or page_up
                            caret(input, 0, e.shiftKey ? pos.begin : 0);
                        } else if (k == opts.keyCode.ESCAPE) { //escape
                            checkVal(input, true, true, valueOnFocus);
                        } else if (k == opts.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
                            opts.insertMode = !opts.insertMode;
                            caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
                        } else if (opts.insertMode == false && !e.shiftKey) {
                            if (k == opts.keyCode.RIGHT) {
                                setTimeout(function () {
                                    var caretPos = caret(input);
                                    caret(input, caretPos.begin);
                                }, 0);
                            } else if (k == opts.keyCode.LEFT) {
                                setTimeout(function () {
                                    var caretPos = caret(input);
                                    caret(input, caretPos.begin - 1);
                                }, 0);
                            }
                        }
                        var currentCaret = caret(input);
                        opts.onKeyDown.call(this, e, getActiveBuffer(), opts); //extra stuff to execute on keydown
                        caret(input, currentCaret.begin, currentCaret.end);
                        ignorable = $.inArray(k, opts.ignorables) != -1;
                    }

                    function keypressEvent(e, checkval, k, writeOut, strict, ndx) {
                        //Safari 5.1.x - modal dialog fires keypress twice workaround
                        if (k == undefined && skipKeyPressEvent) return false;
                        skipKeyPressEvent = true;

                        var input = this, $input = $(input);

                        e = e || window.event;
                        var k = k || e.which || e.charCode || e.keyCode;

                        if ((!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) && checkval !== true) {
                            return true;
                        } else {
                            if (k) {
                                //special treat the decimal separator
                                if (checkval !== true && k == 46 && e.shiftKey == false && opts.radixPoint == ",") k = 44;

                                var pos, results, result, c = String.fromCharCode(k);
                                if (checkval) {
                                    var pcaret = strict ? ndx : getActiveMaskSet()["lastValidPosition"] + 1;
                                    pos = { begin: pcaret, end: pcaret };
                                } else {
                                    pos = caret(input);
                                }

                                //should we clear a possible selection??
                                var isSlctn = isSelection(pos.begin, pos.end), redetermineLVP = false,
                                    initialIndex = activeMasksetIndex;
                                if (isSlctn) {
                                    if (isRTL) {
                                        var pend = pos.end;
                                        pos.end = pos.begin;
                                        pos.begin = pend;
                                    }
                                    $.each(masksets, function (ndx, lmnt) {
                                        if (typeof (lmnt) == "object") {
                                            activeMasksetIndex = ndx;
                                            getActiveMaskSet()["undoBuffer"] = getActiveBuffer().join(''); //init undobuffer for recovery when not valid
                                            var posend = pos.end < getMaskLength() ? pos.end : getMaskLength();
                                            if (getActiveMaskSet()["lastValidPosition"] > pos.begin && getActiveMaskSet()["lastValidPosition"] < posend) {
                                                getActiveMaskSet()["lastValidPosition"] = seekPrevious(pos.begin);
                                            } else {
                                                redetermineLVP = true;
                                            }
                                            clearBuffer(getActiveBuffer(), pos.begin, posend);
                                            var ml = getMaskLength();
                                            if (opts.greedy == false) {
                                                shiftL(pos.begin, ml);
                                            } else {
                                                for (var i = pos.begin; i < posend; i++) {
                                                    if (isMask(i))
                                                        shiftL(pos.begin, ml);
                                                }
                                            }
                                        }
                                    });
                                    if (redetermineLVP === true) {
                                        activeMasksetIndex = initialIndex;
                                        checkVal(input, false, true, getActiveBuffer());
                                        if (!opts.insertMode) { //preserve some space
                                            $.each(masksets, function (ndx, lmnt) {
                                                if (typeof (lmnt) == "object") {
                                                    activeMasksetIndex = ndx;
                                                    shiftR(pos.begin, getMaskLength(), getPlaceHolder(pos.begin), true);
                                                    getActiveMaskSet()["lastValidPosition"] = seekNext(getActiveMaskSet()["lastValidPosition"]);
                                                }
                                            });
                                        }
                                    }
                                    activeMasksetIndex = initialIndex; //restore index
                                }

                                var radixPosition = getActiveBuffer().join('').indexOf(opts.radixPoint);
                                if (opts.isNumeric && checkval !== true && radixPosition != -1) {
                                    if (pos.begin <= radixPosition) {
                                        pos.begin = seekPrevious(pos.begin);
                                        pos.end = pos.begin;
                                    } else if (c == opts.radixPoint) {
                                        pos.begin = radixPosition;
                                        pos.end = pos.begin;
                                    }
                                }


                                var p = pos.begin;
                                results = isValid(p, c, strict);
                                if (strict === true) results = [{ "activeMasksetIndex": activeMasksetIndex, "result": results }];
                                var minimalForwardPosition = -1;
                                $.each(results, function (index, result) {
                                    activeMasksetIndex = result["activeMasksetIndex"];
                                    getActiveMaskSet()["writeOutBuffer"] = true;
                                    var np = result["result"];
                                    if (np !== false) {
                                        var refresh = false, buffer = getActiveBuffer();
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
                                                    lastUnmaskedPosition = lastUnmaskedPosition == 0 ? -1 : seekPrevious(lastUnmaskedPosition);
                                                }
                                                if (lastUnmaskedPosition >= p) {
                                                    shiftR(p, buffer.length, c);
                                                    //shift the lvp if needed
                                                    var lvp = getActiveMaskSet()["lastValidPosition"], nlvp = seekNext(lvp);
                                                    if (nlvp != getMaskLength() && lvp >= p && (getBufferElement(getActiveBuffer(), nlvp, true) != getPlaceHolder(nlvp))) {
                                                        getActiveMaskSet()["lastValidPosition"] = nlvp;
                                                    }
                                                } else getActiveMaskSet()["writeOutBuffer"] = false;
                                            } else setBufferElement(buffer, p, c, true);
                                            if (minimalForwardPosition == -1 || minimalForwardPosition > seekNext(p)) {
                                                minimalForwardPosition = seekNext(p);
                                            }
                                        } else {
                                            var nextPos = p < getMaskLength() ? p + 1 : p;
                                            if (minimalForwardPosition == -1 || minimalForwardPosition > nextPos) {
                                                minimalForwardPosition = nextPos;
                                            }
                                        }
                                        getActiveMaskSet()["p"] = minimalForwardPosition; //needed for checkval strict 
                                        //console.log(getActiveBuffer().join("") + " " + minimalForwardPosition);
                                    }
                                });

                                if (strict !== true) {
                                    activeMasksetIndex = initialIndex;
                                    determineActiveMasksetIndex();
                                }
                                if (writeOut !== false) {
                                    $.each(results, function (ndx, rslt) {
                                        if (rslt["activeMasksetIndex"] == activeMasksetIndex) {
                                            result = rslt;
                                            return false;
                                        }
                                    });
                                    if (result != undefined) {
                                        var self = this;
                                        setTimeout(function () { opts.onKeyValidation.call(self, result["result"], opts); }, 0);
                                        if (getActiveMaskSet()["writeOutBuffer"] && result["result"] !== false) {
                                            var buffer = getActiveBuffer();

                                            var newCaretPosition;
                                            if (checkval) {
                                                newCaretPosition = undefined;
                                            } else if (opts.numericInput) {
                                                if (p > radixPosition) {
                                                    newCaretPosition = seekPrevious(minimalForwardPosition);
                                                } else if (c == opts.radixPoint) {
                                                    newCaretPosition = minimalForwardPosition - 1;
                                                } else newCaretPosition = seekPrevious(minimalForwardPosition - 1);
                                            } else {
                                                newCaretPosition = minimalForwardPosition;
                                            }

                                            writeBuffer(input, buffer, newCaretPosition);
                                            if (checkval !== true) {
                                                setTimeout(function () { //timeout needed for IE
                                                    if (isComplete(buffer))
                                                        $input.trigger("complete");
                                                }, 0);
                                            }
                                        } else if (isSlctn) {
                                            getActiveMaskSet()["buffer"] = getActiveMaskSet()["undoBuffer"].split('');
                                        }
                                    }
                                }

                                if (opts.showTooltip) { //update tooltip
                                    $input.prop("title", getActiveMaskSet()["mask"]);
                                }
                                e.preventDefault();
                            }
                        }
                    }

                    function keyupEvent(e) {
                        var $input = $(this), input = this, k = e.keyCode, buffer = getActiveBuffer();
                        var currentCaret = caret(input);
                        opts.onKeyUp.call(this, e, buffer, opts); //extra stuff to execute on keyup
                        caret(input, currentCaret.begin, currentCaret.end);
                        if (k == opts.keyCode.TAB && $input.hasClass('focus.inputmask') && input._valueGet().length == 0 && opts.showMaskOnFocus) {
                            buffer = getActiveBufferTemplate().slice();
                            writeBuffer(input, buffer);
                            caret(input, 0);
                            valueOnFocus = getActiveBuffer().join('');
                        }
                    }
                };
                return this;
            };
            return this;
        };
    }
})(jQuery);
