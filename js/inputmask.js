/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 -	Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0-dev
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["./dependencyLibs/inputmask.dependencyLib", "./global/window", "./global/document"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./global/window"), require("./global/document"));
    } else {
        window.Inputmask = factory(window.dependencyLib || jQuery, window, document);
    }
}
(function ($, window, document, undefined) {
    var ua = navigator.userAgent,
        mobile = /mobile/i.test(ua),
        iemobile = /iemobile/i.test(ua),
        iphone = /iphone/i.test(ua) && !iemobile,
        android = /android/i.test(ua) && !iemobile;

    function Inputmask(alias, options, internal) {
        //allow instanciating without new
        if (!(this instanceof Inputmask)) {
            return new Inputmask(alias, options, internal);
        }

        this.el = undefined;
        this.events = {};
        this.maskset = undefined;
        this.refreshValue = false; //indicate a refresh from the inputvalue is needed (form.reset)

        if (internal !== true) {
            //init options
            if ($.isPlainObject(alias)) {
                options = alias;
            } else {
                options = options || {};
                options.alias = alias;
            }
            this.opts = $.extend(true, {}, this.defaults, options);
            this.noMasksCache = options && options.definitions !== undefined;
            this.userOptions = options || {}; //user passed options
            this.isRTL = this.opts.numericInput;
            resolveAlias(this.opts.alias, options, this.opts);
        }
    }

    Inputmask.prototype = {
        dataAttribute: "data-inputmask", //data attribute prefix used for attribute binding
        //options default
        defaults: {
            placeholder: "_",
            optionalmarker: {
                start: "[",
                end: "]"
            },
            quantifiermarker: {
                start: "{",
                end: "}"
            },
            groupmarker: {
                start: "(",
                end: ")"
            },
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null, //needs tobe null instead of undefined as the extend method does not consider props with the undefined value
            regex: null, //regular expression as a mask
            oncomplete: $.noop, //executes when the mask is complete
            onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
            oncleared: $.noop, //executes when the mask is cleared
            repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
            greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
            autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
            removeMaskOnSubmit: false, //remove the mask before submitting the form.
            clearMaskOnLostFocus: true,
            insertMode: true, //insert the input or overwrite the input
            clearIncomplete: false, //clear the incomplete input on blur
            alias: null,
            onKeyDown: $.noop, //callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
            onBeforeMask: null, //executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
            onBeforePaste: function (pastedValue, opts) {
                return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
            }, //executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
            onBeforeWrite: null, //executes before writing to the masked element. args => event, opts
            onUnMask: null, //executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
            showMaskOnFocus: true, //show the mask-placeholder when the input has focus
            showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
            onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: key, result, opts
            skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
            numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
            rightAlign: false, //align to the right
            undoOnEscape: true, //pressing escape reverts the value to the value before focus
            //numeric basic properties
            radixPoint: "", //".", // | ","
            radixPointDefinitionSymbol: undefined, //set the radixPoint definitionSymbol ~ used for awareness of the radixpoint
            groupSeparator: "", //",", // | "."
            //numeric basic properties
            keepStatic: null, //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible - null see auto selection for multi masks
            positionCaretOnTab: true, //when enabled the caret position is set after the latest valid position on TAB
            tabThrough: false, //allows for tabbing through the different parts of the masked field
            supportsInputType: ["text", "tel", "password"], //list with the supported input types
            //specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
            ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
            isComplete: null, //override for isComplete - args => buffer, opts - return true || false
            canClearPosition: $.noop, //hook to alter the clear behavior in the stripValidPositions args => maskset, position, lastValidPosition, opts => return true|false/command object
            preValidation: null, //hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts => return true/false/command object
            postValidation: null, //hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, currentResult, opts => return true/false/json
            staticDefinitionSymbol: undefined, //specify a definitionSymbol for static content, used to make matches for alternators
            jitMasking: false, //just in time masking ~ only mask while typing, can n (number), true or false
            nullable: true, //return nothing instead of the buffertemplate when the user hasn't entered anything.
            inputEventOnly: false, //dev option - testing inputfallback behavior
            noValuePatching: false, //disable value property patching
            positionCaretOnClick: "lvp", //none, lvp (based on the last valid position (default), radixFocus (position caret to radixpoint on initial click)
            casing: null, //mask-level casing. Options: null, "upper", "lower" or "title" or callback args => elem, test, pos, validPositions return charValue
            inputmode: "verbatim", //specify the inputmode  - already in place for when browsers will support it
            colorMask: false, //enable css styleable mask
            androidHack: false, //see README_android.md
            importDataAttributes: true //import data-inputmask attributes
        },
        definitions: {
            "9": { //\uFF11-\uFF19 #1606
                validator: "[0-9\uFF11-\uFF19]",
                cardinality: 1,
                definitionSymbol: "*"
            },
            "a": { //\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5 #76
                validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
                cardinality: 1,
                definitionSymbol: "*"
            },
            "*": {
                validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
                cardinality: 1
            }
        },
        aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
        masksCache: {},
        mask: function (elems) {
            var that = this;

            function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
                if (opts.importDataAttributes === true) {
                    var attrOptions = npt.getAttribute(dataAttribute),
                        option, dataoptions, optionData, p;

                    function importOption(option, optionData) {
                        optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option);
                        if (optionData !== null) {
                            if (typeof optionData === "string") {
                                if (option.indexOf("on") === 0) optionData = window[optionData]; //get function definition
                                else if (optionData === "false") optionData = false;
                                else if (optionData === "true") optionData = true;
                            }
                            userOptions[option] = optionData;
                        }
                    }

                    if (attrOptions && attrOptions !== "") {
                        attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
                        dataoptions = JSON.parse("{" + attrOptions + "}");
                    }

                    //resolve aliases
                    if (dataoptions) { //pickup alias from dataAttribute
                        optionData = undefined;
                        for (p in dataoptions) {
                            if (p.toLowerCase() === "alias") {
                                optionData = dataoptions[p];
                                break;
                            }
                        }
                    }
                    importOption("alias", optionData); //pickup alias from dataAttribute-alias
                    if (userOptions.alias) {
                        resolveAlias(userOptions.alias, userOptions, opts);
                    }

                    for (option in opts) {
                        if (dataoptions) {
                            optionData = undefined;
                            for (p in dataoptions) {
                                if (p.toLowerCase() === option.toLowerCase()) {
                                    optionData = dataoptions[p];
                                    break;
                                }
                            }
                        }
                        importOption(option, optionData);
                    }
                }
                $.extend(true, opts, userOptions);

                //handle dir=rtl
                if (npt.dir === "rtl" || opts.rightAlign) {
                    npt.style.textAlign = "right";
                }

                if (npt.dir === "rtl" || opts.numericInput) {
                    npt.dir = "ltr";
                    npt.removeAttribute("dir");
                    opts.isRTL = true;
                }

                return opts;
            }

            if (typeof elems === "string") {
                elems = document.getElementById(elems) || document.querySelectorAll(elems);
            }
            elems = elems.nodeName ? [elems] : elems;
            $.each(elems, function (ndx, el) {
                var scopedOpts = $.extend(true, {}, that.opts);
                importAttributeOptions(el, scopedOpts, $.extend(true, {}, that.userOptions), that.dataAttribute);
                var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                if (maskset !== undefined) {
                    if (el.inputmask !== undefined) {
                        el.inputmask.opts.autoUnmask = true; //force autounmasking when remasking
                        el.inputmask.remove();
                    }
                    //store inputmask instance on the input with element reference
                    el.inputmask = new Inputmask(undefined, undefined, true);
                    el.inputmask.opts = scopedOpts;
                    el.inputmask.noMasksCache = that.noMasksCache;
                    el.inputmask.userOptions = $.extend(true, {}, that.userOptions);
                    el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
                    el.inputmask.el = el;
                    el.inputmask.maskset = maskset;

                    $.data(el, "_inputmask_opts", scopedOpts);

                    maskScope.call(el.inputmask, {
                        "action": "mask"
                    });
                }
            });
            return elems && elems[0] ? (elems[0].inputmask || this) : this;
        },
        option: function (options, noremask) { //set extra options || retrieve value of a current option
            if (typeof options === "string") {
                return this.opts[options];
            } else if (typeof options === "object") {
                $.extend(this.userOptions, options); //user passed options
                //remask
                if (this.el && noremask !== true) {
                    this.mask(this.el);
                }
                return this;
            }
        },
        unmaskedvalue: function (value) {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                "action": "unmaskedvalue",
                "value": value
            });
        },
        remove: function () {
            return maskScope.call(this, {
                "action": "remove"
            });
        },
        getemptymask: function () { //return the default (empty) mask value, usefull for setting the default value in validation
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                "action": "getemptymask"
            });
        },
        hasMaskedValue: function () { //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
            return !this.opts.autoUnmask;
        },
        isComplete: function () {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                "action": "isComplete"
            });
        },
        getmetadata: function () { //return mask metadata if exists
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                "action": "getmetadata"
            });
        },
        isValid: function (value) {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                "action": "isValid",
                "value": value
            });
        },
        format: function (value, metadata) {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                "action": "format",
                "value": value,
                "metadata": metadata //true/false getmetadata
            });
        },
        analyseMask: function (mask, regexMask, opts) {
            var tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                //Thx to https://github.com/slevithan/regex-colorizer for the regexTokenizer regex
                regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                escaped = false,
                currentToken = new MaskToken(),
                match,
                m,
                openenings = [],
                maskTokens = [],
                openingToken,
                currentOpeningToken,
                alternator,
                lastMatch,
                groupToken;

            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [];
                this.openGroup = isGroup || false;
                this.alternatorGroup = false;
                this.isGroup = isGroup || false;
                this.isOptional = isOptional || false;
                this.isQuantifier = isQuantifier || false;
                this.isAlternator = isAlternator || false;
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }

            //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
            function insertTestDefinition(mtoken, element, position) {
                position = position !== undefined ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) {
                    if (element.indexOf("[") === 0 || (escaped && /\\d|\\s|\\w]/i.test(element)) || element === ".") {
                        mtoken.matches.splice(position++, 0, {
                            fn: new RegExp(element, opts.casing ? "i" : ""),
                            cardinality: 1,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
                            casing: null,
                            def: element,
                            placeholder: undefined,
                            nativeDef: element
                        });
                    } else {
                        if (escaped) element = element[element.length - 1];
                        $.each(element.split(""), function (ndx, lmnt) {
                            prevMatch = mtoken.matches[position - 1];
                            mtoken.matches.splice(position++, 0, {
                                fn: null,
                                cardinality: 0,
                                optionality: mtoken.isOptional,
                                newBlockMarker: prevMatch === undefined || (prevMatch.def !== lmnt && prevMatch.fn !== null),
                                casing: null,
                                def: opts.staticDefinitionSymbol || lmnt,
                                placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                                nativeDef: lmnt
                            });
                        });
                    }
                    escaped = false;
                } else {
                    var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];
                    if (maskdef && !escaped) {
                        var prevalidators = maskdef.prevalidator,
                            prevalidatorsL = prevalidators ? prevalidators.length : 0;
                        //handle prevalidators
                        for (var i = 1; i < maskdef.cardinality; i++) {
                            var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [],
                                validator = prevalidator.validator,
                                cardinality = prevalidator.cardinality;
                            mtoken.matches.splice(position++, 0, {
                                fn: validator ? typeof validator === "string" ? new RegExp(validator, opts.casing ? "i" : "") : new function () {
                                    this.test = validator;
                                } : new RegExp("."),
                                cardinality: cardinality ? cardinality : 1,
                                optionality: mtoken.isOptional,
                                newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                                casing: maskdef.casing,
                                def: maskdef.definitionSymbol || element,
                                placeholder: maskdef.placeholder,
                                nativeDef: element
                            });
                            prevMatch = mtoken.matches[position - 1];
                        }
                        mtoken.matches.splice(position++, 0, {
                            fn: maskdef.validator ? typeof maskdef.validator == "string" ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                                this.test = maskdef.validator;
                            } : new RegExp("."),
                            cardinality: maskdef.cardinality,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            nativeDef: element
                        });
                    } else {
                        mtoken.matches.splice(position++, 0, {
                            fn: null,
                            cardinality: 0,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || (prevMatch.def !== element && prevMatch.fn !== null),
                            casing: null,
                            def: opts.staticDefinitionSymbol || element,
                            placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                            nativeDef: element
                        });
                        escaped = false;
                    }
                }
            }

            function verifyGroupMarker(maskToken) {
                if (maskToken && maskToken.matches) {
                    $.each(maskToken.matches, function (ndx, token) {
                            var nextToken = maskToken.matches[ndx + 1];
                            if ((nextToken === undefined || (nextToken.matches === undefined || nextToken.isQuantifier === false)) && token && token.isGroup) { //this is not a group but a normal mask => convert
                                token.isGroup = false;
                                if (!regexMask) {
                                    insertTestDefinition(token, opts.groupmarker.start, 0);
                                    if (token.openGroup !== true) {
                                        insertTestDefinition(token, opts.groupmarker.end);
                                    }
                                }
                            }
                            verifyGroupMarker(token);
                        }
                    );
                }
            }

            function defaultCase() {
                if (openenings.length > 0) {
                    currentOpeningToken = openenings[openenings.length - 1];
                    insertTestDefinition(currentOpeningToken, m);
                    if (currentOpeningToken.isAlternator) { //handle alternator a | b case
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                            alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
                        }
                        if (openenings.length > 0) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            currentOpeningToken.matches.push(alternator);
                        } else {
                            currentToken.matches.push(alternator);
                        }
                    }
                } else {
                    insertTestDefinition(currentToken, m);
                }
            }

            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    if (st === opts.optionalmarker.start) st = opts.optionalmarker.end;
                    else if (st === opts.optionalmarker.end) st = opts.optionalmarker.start;
                    else if (st === opts.groupmarker.start) st = opts.groupmarker.end;
                    else if (st === opts.groupmarker.end) st = opts.groupmarker.start;

                    return st;
                }

                maskToken.matches = maskToken.matches.reverse();
                for (var match in maskToken.matches) {
                    if (maskToken.matches.hasOwnProperty(match)) {
                        var intMatch = parseInt(match);
                        if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) { //reposition quantifier
                            var qt = maskToken.matches[match];
                            maskToken.matches.splice(match, 1);
                            maskToken.matches.splice(intMatch + 1, 0, qt);
                        }
                        if (maskToken.matches[match].matches !== undefined) {
                            maskToken.matches[match] = reverseTokens(maskToken.matches[match]);
                        } else {
                            maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                        }
                    }
                }

                return maskToken;
            }

            if (regexMask) {
                opts.optionalmarker.start = undefined;
                opts.optionalmarker.end = undefined;
            }
            while (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask)) {
                m = match[0];

                if (regexMask) {
                    switch (m.charAt(0)) {
                        //Quantifier
                        case "?":
                            m = "{0,1}";
                            break;
                        case "+":
                        case "*":
                            m = "{" + m + "}";
                            break;
                    }
                }

                if (escaped) {
                    defaultCase();
                    continue;
                }
                switch (m.charAt(0)) {
                    case opts.escapeChar:
                        escaped = true;
                        if (regexMask) {
                            defaultCase();
                        }
                        break;
                    case opts.optionalmarker.end:
                    // optional closing
                    case opts.groupmarker.end:
                        // Group closing
                        openingToken = openenings.pop();
                        openingToken.openGroup = false; //mark group as complete
                        if (openingToken !== undefined) {
                            if (openenings.length > 0) {
                                currentOpeningToken = openenings[openenings.length - 1];
                                currentOpeningToken.matches.push(openingToken);
                                if (currentOpeningToken.isAlternator) { //handle alternator (a) | (b) case
                                    alternator = openenings.pop();
                                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                                        alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
                                        alternator.matches[mndx].alternatorGroup = false;
                                    }
                                    if (openenings.length > 0) {
                                        currentOpeningToken = openenings[openenings.length - 1];
                                        currentOpeningToken.matches.push(alternator);
                                    } else {
                                        currentToken.matches.push(alternator);
                                    }
                                }
                            } else {
                                currentToken.matches.push(openingToken);
                            }
                        } else defaultCase();
                        break;
                    case opts.optionalmarker.start:
                        // optional opening
                        openenings.push(new MaskToken(false, true));
                        break;
                    case opts.groupmarker.start:
                        // Group opening
                        openenings.push(new MaskToken(true));
                        break;
                    case opts.quantifiermarker.start:
                        //Quantifier
                        var quantifier = new MaskToken(false, false, true);

                        m = m.replace(/[{}]/g, "");
                        var mq = m.split(","),
                            mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                            mq1 = mq.length === 1 ? mq0 : (isNaN(mq[1]) ? mq[1] : parseInt(mq[1]));
                        if (mq1 === "*" || mq1 === "+") {
                            mq0 = mq1 === "*" ? 0 : 1;
                        }
                        quantifier.quantifier = {
                            min: mq0,
                            max: mq1
                        };
                        if (openenings.length > 0) {
                            var matches = openenings[openenings.length - 1].matches;
                            match = matches.pop();
                            if (!match.isGroup) {
                                groupToken = new MaskToken(true);
                                groupToken.matches.push(match);
                                match = groupToken;
                            }
                            matches.push(match);
                            matches.push(quantifier);
                        } else {
                            match = currentToken.matches.pop();
                            if (!match.isGroup) {
                                if (regexMask && match.fn === null) {
                                    if (match.def === ".") match.fn = new RegExp(match.def, opts.casing ? "i" : "");
                                }

                                groupToken = new MaskToken(true);
                                groupToken.matches.push(match);
                                match = groupToken;
                            }
                            currentToken.matches.push(match);
                            currentToken.matches.push(quantifier);
                        }
                        break;
                    case opts.alternatormarker:
                        if (openenings.length > 0) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                            if (currentOpeningToken.openGroup && //regexp alt syntax
                                (subToken.matches === undefined || (subToken.isGroup === false && subToken.isAlternator === false))) { //alternations within group
                                lastMatch = openenings.pop();
                            } else {
                                lastMatch = currentOpeningToken.matches.pop();
                            }
                        } else {
                            lastMatch = currentToken.matches.pop();
                        }
                        if (lastMatch.isAlternator) {
                            openenings.push(lastMatch);
                        } else {
                            if (lastMatch.alternatorGroup) {
                                alternator = openenings.pop();
                                lastMatch.alternatorGroup = false;
                            } else {
                                alternator = new MaskToken(false, false, false, true);
                            }
                            alternator.matches.push(lastMatch);
                            openenings.push(alternator);
                            if (lastMatch.openGroup) { //regexp alt syntax
                                lastMatch.openGroup = false;
                                var alternatorGroup = new MaskToken(true);
                                alternatorGroup.alternatorGroup = true;
                                openenings.push(alternatorGroup);
                            }
                        }
                        break;
                    default:
                        defaultCase();
                }
            }

            while (openenings.length > 0) {
                openingToken = openenings.pop();
                currentToken.matches.push(openingToken);
            }
            if (currentToken.matches.length > 0) {
                verifyGroupMarker(currentToken);
                maskTokens.push(currentToken);
            }

            if (opts.numericInput || opts.isRTL) {
                reverseTokens(maskTokens[0]);
            }
            // console.log(JSON.stringify(maskTokens));
            return maskTokens;
        }
    };

    //apply defaults, definitions, aliases
    Inputmask.extendDefaults = function (options) {
        $.extend(true, Inputmask.prototype.defaults, options);
    };
    Inputmask.extendDefinitions = function (definition) {
        $.extend(true, Inputmask.prototype.definitions, definition);
    };
    Inputmask.extendAliases = function (alias) {
        $.extend(true, Inputmask.prototype.aliases, alias);
    };
    //static fn on inputmask
    Inputmask.format = function (value, options, metadata) {
        return Inputmask(options).format(value, metadata);
    };
    Inputmask.unmask = function (value, options) {
        return Inputmask(options).unmaskedvalue(value);
    };
    Inputmask.isValid = function (value, options) {
        return Inputmask(options).isValid(value);
    };
    Inputmask.remove = function (elems) {
        $.each(elems, function (ndx, el) {
            if (el.inputmask) el.inputmask.remove();
        });
    };
    Inputmask.escapeRegex = function (str) {
        var specials = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
        return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    };
    Inputmask.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        BACKSPACE_SAFARI: 127,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91,
        X: 88
    };

    function resolveAlias(aliasStr, options, opts) {
        var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
        if (aliasDefinition) {
            if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
            $.extend(true, opts, aliasDefinition); //merge alias definition in the options
            $.extend(true, opts, options); //reapply extra given options
            return true;
        } else //alias not found - try as mask
        if (opts.mask === null) {
            opts.mask = aliasStr;
        }

        return false;
    }

    function generateMaskSet(opts, nocache) {
        function generateMask(mask, metadata, opts) {
            var regexMask = false;
            if (mask === null || mask === "") {
                regexMask = opts.regex !== null;
                if (regexMask) {
                    mask = opts.regex;
                    mask = mask.replace(/^(\^)(.*)(\$)$/, "$2");
                } else {
                    regexMask = true;
                    mask = ".*";
                }
            }
            if (mask.length === 1 && opts.greedy === false && opts.repeat !== 0) {
                opts.placeholder = "";
            } //hide placeholder with single non-greedy mask
            if (opts.repeat > 0 || opts.repeat === "*" || opts.repeat === "+") {
                var repeatStart = opts.repeat === "*" ? 0 : (opts.repeat === "+" ? 1 : opts.repeat);
                mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
            }

            // console.log(mask);
            var masksetDefinition,
                maskdefKey = regexMask ? "regex_" + opts.regex : (opts.numericInput ? mask.split("").reverse().join("") : mask);
            if (Inputmask.prototype.masksCache[maskdefKey] === undefined || nocache === true) {
                masksetDefinition = {
                    "mask": mask,
                    "maskToken": Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    "validPositions": {},
                    "_buffer": undefined,
                    "buffer": undefined,
                    "tests": {},
                    "metadata": metadata,
                    maskLength: undefined
                };
                if (nocache !== true) {
                    Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition;
                    masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);
                }
            } else masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);

            return masksetDefinition;
        }

        var ms;

        if ($.isFunction(opts.mask)) { //allow mask to be a preprocessing fn - should return a valid mask
            opts.mask = opts.mask(opts);
        }
        if ($.isArray(opts.mask)) {
            if (opts.mask.length > 1) {
                opts.keepStatic = opts.keepStatic === null ? true : opts.keepStatic; //enable by default when passing multiple masks when the option is not explicitly specified
                var altMask = opts.groupmarker.start;
                $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
                    if (altMask.length > 1) {
                        altMask += opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start;
                    }
                    if (msk.mask !== undefined && !$.isFunction(msk.mask)) {
                        altMask += msk.mask;
                    } else {
                        altMask += msk;
                    }
                });
                altMask += opts.groupmarker.end;
                // console.log(altMask);
                return generateMask(altMask, opts.mask, opts);
            } else opts.mask = opts.mask.pop();
        }

        if (opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask)) {
            ms = generateMask(opts.mask.mask, opts.mask, opts);
        } else {
            ms = generateMask(opts.mask, opts.mask, opts);
        }

        return ms;
    };


    //masking scope
    //actionObj definition see below
    function maskScope(actionObj, maskset, opts) {
        maskset = maskset || this.maskset;
        opts = opts || this.opts;
        var inputmask = this,
            el = this.el,
            isRTL = this.isRTL,
            undoValue,
            $el,
            skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
            skipInputEvent = false, //skip when triggered from within inputmask
            ignorable = false,
            maxLength,
            mouseEnter = false,
            colorMask;

        //maskset helperfunctions
        function getMaskTemplate(baseOnInput, minimalPos, includeMode) {
            //includeMode true => input, undefined => placeholder, false => mask
            minimalPos = minimalPos || 0;
            var maskTemplate = [],
                ndxIntlzr, pos = 0,
                test, testPos, lvp = getLastValidPosition();
            do {
                if (baseOnInput === true && getMaskSet().validPositions[pos]) {
                    testPos = getMaskSet().validPositions[pos];
                    test = testPos.match;
                    ndxIntlzr = testPos.locator.slice();
                    maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
                } else {
                    testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                    test = testPos.match;
                    ndxIntlzr = testPos.locator.slice();
                    if (opts.jitMasking === false || pos < lvp || (typeof opts.jitMasking === "number" && isFinite(opts.jitMasking) && opts.jitMasking > pos)) {
                        maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
                    }
                }
                pos++;
            } while ((maxLength === undefined || pos < maxLength) && (test.fn !== null || test.def !== "") || minimalPos > pos);
            if (maskTemplate[maskTemplate.length - 1] === "") {
                maskTemplate.pop(); //drop the last one which is empty
            }

            getMaskSet().maskLength = pos + 1;
            return maskTemplate;
        }

        function getMaskSet() {
            return maskset;
        }

        function resetMaskSet(soft) {
            var maskset = getMaskSet();
            maskset.buffer = undefined;
            if (soft !== true) {
                // maskset._buffer = undefined;
                maskset.validPositions = {};
                maskset.p = 0;
            }
        }

        function getLastValidPosition(closestTo, strict, validPositions) {
            var before = -1,
                after = -1,
                valids = validPositions || getMaskSet().validPositions; //for use in valhook ~ context switch
            if (closestTo === undefined) closestTo = -1;
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
                    if (psNdx <= closestTo) before = psNdx;
                    if (psNdx >= closestTo) after = psNdx;
                }
            }
            return (before !== -1 && (closestTo - before) > 1) || after < closestTo ? before : after;
        }

        function stripValidPositions(start, end, nocheck, strict) {
            function IsEnclosedStatic(pos) {
                var posMatch = getMaskSet().validPositions[pos];
                if (posMatch !== undefined && posMatch.match.fn === null) {
                    var prevMatch = getMaskSet().validPositions[pos - 1],
                        nextMatch = getMaskSet().validPositions[pos + 1];
                    return prevMatch !== undefined && nextMatch !== undefined;
                }
                return false;
            }

            var i, startPos = start,
                positionsClone = $.extend(true, {}, getMaskSet().validPositions), needsValidation = false;
            getMaskSet().p = start; //needed for alternated position after overtype selection

            for (i = end - 1; i >= startPos; i--) { //clear selection
                if (getMaskSet().validPositions[i] !== undefined) {
                    if (nocheck === true ||
                        ((getMaskSet().validPositions[i].match.optionality || !IsEnclosedStatic(i)) && opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts) !== false)) {
                        delete getMaskSet().validPositions[i];
                    }
                }
            }

            //clear buffer
            resetMaskSet(true);
            for (i = startPos + 1; i <= getLastValidPosition();) {
                while (getMaskSet().validPositions[startPos] !== undefined) startPos++;
                if (i < startPos) i = startPos + 1;
                if (getMaskSet().validPositions[i] !== undefined || !isMask(i)) {
                    var t = getTestTemplate(i);
                    if (needsValidation === false && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def) { //obvious match
                        getMaskSet().validPositions[startPos] = $.extend(true, {}, positionsClone[startPos]);
                        getMaskSet().validPositions[startPos].input = t.input;
                        delete getMaskSet().validPositions[i];
                        i++;
                    } else if (positionCanMatchDefinition(startPos, t.match.def)) {
                        if (isValid(startPos, t.input || getPlaceholder(i), true) !== false) {
                            delete getMaskSet().validPositions[i];
                            i++;
                            needsValidation = true;
                        }
                    } else if (!isMask(i)) {
                        i++;
                        startPos--;
                    }
                    startPos++;
                } else i++;
            }

            resetMaskSet(true);
        }

        function determineTestTemplate(tests, guessNextBest) {
            var testPos,
                testPositions = tests,
                lvp = getLastValidPosition(),
                lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0],
                lvTestAltArr = (lvTest.alternation !== undefined) ? lvTest.locator[lvTest.alternation].toString().split(",") : [];
            for (var ndx = 0; ndx < testPositions.length; ndx++) {
                testPos = testPositions[ndx];

                if (testPos.match &&
                    (((opts.greedy && testPos.match.optionalQuantifier !== true) || (testPos.match.optionality === false || testPos.match.newBlockMarker === false) && testPos.match.optionalQuantifier !== true) &&
                        ((lvTest.alternation === undefined || lvTest.alternation !== testPos.alternation) ||
                            (testPos.locator[lvTest.alternation] !== undefined && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr))))) {

                    if (guessNextBest !== true || (testPos.match.fn === null && !/[0-9a-bA-Z]/.test(testPos.match.def))) {
                        break;
                    }
                }
            }

            return testPos;
        }

        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            return getMaskSet().validPositions[pos] || determineTestTemplate(getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
        }

        function getTest(pos) {
            if (getMaskSet().validPositions[pos]) {
                return getMaskSet().validPositions[pos];
            }
            return getTests(pos)[0];
        }

        function positionCanMatchDefinition(pos, def) {
            var valid = false,
                tests = getTests(pos);
            for (var tndx = 0; tndx < tests.length; tndx++) {
                if (tests[tndx].match && tests[tndx].match.def === def) {
                    valid = true;
                    break;
                }
            }
            return valid;
        }


        function getTests(pos, ndxIntlzr, tstPs) {
            var maskTokens = getMaskSet().maskToken,
                testPos = ndxIntlzr ? tstPs : 0,
                ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
                matches = [],
                insertStop = false,
                latestMatch,
                cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) { //ndxInitializer contains a set of indexes to speedup searches in the mtokens
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    function isFirstMatch(latestMatch, tokenGroup) {
                        var firstMatch = $.inArray(latestMatch, tokenGroup.matches) === 0;
                        if (!firstMatch) {
                            $.each(tokenGroup.matches, function (ndx, match) {
                                if (match.isQuantifier === true) {
                                    firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);
                                    if (firstMatch) return false;
                                }
                            });
                        }
                        return firstMatch;
                    }

                    function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                        var bestMatch, indexPos;

                        if (getMaskSet().validPositions[pos - 1] && targetAlternation && getMaskSet().tests[pos]) { //detect altarnation offset
                            var vpAlternation = getMaskSet().validPositions[pos - 1].locator;
                            var tpAlternation = getMaskSet().tests[pos][0].locator;
                            for (var i = 0; i < targetAlternation; i++) {
                                if (vpAlternation[i] !== tpAlternation[i]) {
                                    return vpAlternation.slice(targetAlternation + 1);
                                }
                            }
                        }

                        if (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) {
                            $.each(getMaskSet().tests[pos] || [getMaskSet().validPositions[pos]], function (ndx, lmnt) {
                                var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation,
                                    ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                if ((indexPos === undefined || ndxPos < indexPos) && ndxPos !== -1) {
                                    bestMatch = lmnt;
                                    indexPos = ndxPos;
                                }
                            });
                        }
                        return bestMatch ?
                            bestMatch.locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1) :
                            targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
                    }

                    function definitionCanMatchDefinition(source, target) {
                        return source.match.nativeDef === target.match.nativeDef || source.match.def === target.match.nativeDef || source.match.nativeDef === target.match.def;
                    }

                    function isSubsetOf(source, target) {
                        if (source.match.fn !== null && target.match.fn !== null) {//is regex a subset
                            //do we need a dfa for this?
                            //currently only a simplistic approach
                            return target.match.fn.test(source.match.def.replace(/[\[\]]/g, ""), getMaskSet(), pos, false, opts, false);
                        }
                        return false;
                    }

                    function staticCanMatchDefinition(source, target) {
                        return source.match.fn === null && target.match.fn !== null ? target.match.fn.test(source.match.def, getMaskSet(), pos, false, opts, false) : false;
                    }

                    if (testPos > 10000) {
                        throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                    }
                    if (testPos === pos && match.matches === undefined) {
                        matches.push({
                            "match": match,
                            "locator": loopNdx.reverse(),
                            "cd": cacheDependency
                        });
                        return true;
                    } else if (match.matches !== undefined) {
                        if (match.isGroup && quantifierRecurse !== match) { //when a group pass along to the quantifier
                            match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx);
                            if (match) return true;
                        } else if (match.isOptional) {
                            var optionalToken = match;
                            match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                            if (match) {
                                latestMatch = matches[matches.length - 1].match;
                                if (isFirstMatch(latestMatch, optionalToken)) {
                                    insertStop = true; //insert a stop
                                    testPos = pos; //match the position after the group
                                } else return true;
                            }
                        } else if (match.isAlternator) {
                            var alternateToken = match,
                                malternateMatches = [],
                                maltMatches,
                                currentMatches = matches.slice(),
                                loopNdxCnt = loopNdx.length;
                            var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if (altIndex === -1 || typeof altIndex === "string") {
                                var currentPos = testPos,
                                    ndxInitializerClone = ndxInitializer.slice(),
                                    altIndexArr = [],
                                    amndx;
                                if (typeof altIndex == "string") {
                                    altIndexArr = altIndex.split(",");
                                } else {
                                    for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                                        altIndexArr.push(amndx);
                                    }
                                }
                                for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                                    amndx = parseInt(altIndexArr[ndx]);
                                    matches = [];
                                    //set the correct ndxInitializer
                                    ndxInitializer = resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice();
                                    match = handleMatch(alternateToken.matches[amndx] || maskToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) || match;
                                    if (match !== true && match !== undefined && (altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length)) { //no match in the alternations (length mismatch) => look further
                                        var ntndx = $.inArray(match, maskToken.matches) + 1;
                                        if (maskToken.matches.length > ntndx) {
                                            match = handleMatch(maskToken.matches[ntndx], [ntndx].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse);
                                            if (match) {
                                                altIndexArr.push(ntndx.toString());
                                                $.each(matches, function (ndx, lmnt) {
                                                    lmnt.alternation = loopNdx.length - 1;
                                                });
                                            }
                                        }
                                    }
                                    maltMatches = matches.slice();
                                    testPos = currentPos;
                                    matches = [];

                                    //fuzzy merge matches
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                        var altMatch = maltMatches[ndx1], dropMatch = false;
                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            //verify equality
                                            if (typeof altIndex !== "string" || $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) !== -1) {
                                                if (definitionCanMatchDefinition(altMatch, altMatch2)) {
                                                    dropMatch = true;
                                                    if (altMatch.alternation === altMatch2.alternation &&
                                                        altMatch2.locator[altMatch2.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) === -1) {
                                                        altMatch2.locator[altMatch2.alternation] = altMatch2.locator[altMatch2.alternation] + "," + altMatch.locator[altMatch.alternation];
                                                        altMatch2.alternation = altMatch.alternation; //we pass the alternation index => used in determineLastRequiredPosition
                                                    }
                                                    if (altMatch.match.nativeDef === altMatch2.match.def) {
                                                        altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation];
                                                        malternateMatches.splice(malternateMatches.indexOf(altMatch2), 1, altMatch);
                                                    }
                                                    break;
                                                } else if (altMatch.match.def === altMatch2.match.def) {
                                                    dropMatch = false;
                                                    break;
                                                } else if (staticCanMatchDefinition(altMatch, altMatch2) || isSubsetOf(altMatch, altMatch2)) {
                                                    // console.log("case 5");
                                                    if (altMatch.alternation === altMatch2.alternation &&
                                                        altMatch.locator[altMatch.alternation].toString().indexOf(altMatch2.locator[altMatch2.alternation].toString().split("")[0]) === -1) {

                                                        //no alternation marker
                                                        altMatch.na = altMatch.na || altMatch.locator[altMatch.alternation].toString();
                                                        if (altMatch.na.indexOf(altMatch.locator[altMatch.alternation].toString().split("")[0]) === -1) {
                                                            altMatch.na = altMatch.na + "," + altMatch.locator[altMatch2.alternation].toString().split("")[0];
                                                        }
                                                        //insert match above general match
                                                        dropMatch = true;
                                                        altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation].toString().split("")[0] + "," + altMatch.locator[altMatch.alternation];
                                                        malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                        if (!dropMatch) {
                                            malternateMatches.push(altMatch);
                                        }
                                    }
                                }
                                if (typeof altIndex == "string") { //filter matches
                                    malternateMatches = $.map(malternateMatches, function (lmnt, ndx) {
                                        if (isFinite(ndx)) {
                                            var mamatch,
                                                alternation = lmnt.alternation,
                                                altLocArr = lmnt.locator[alternation].toString().split(",");
                                            lmnt.locator[alternation] = undefined;
                                            lmnt.alternation = undefined;

                                            for (var alndx = 0; alndx < altLocArr.length; alndx++) {
                                                mamatch = $.inArray(altLocArr[alndx], altIndexArr) !== -1;
                                                if (mamatch) { //rebuild the locator with valid entries
                                                    if (lmnt.locator[alternation] !== undefined) {
                                                        lmnt.locator[alternation] += ",";
                                                        lmnt.locator[alternation] += altLocArr[alndx];
                                                    } else lmnt.locator[alternation] = parseInt(altLocArr[alndx]);

                                                    lmnt.alternation = alternation;
                                                }
                                            }

                                            if (lmnt.locator[alternation] !== undefined) return lmnt;
                                        }
                                    });
                                }

                                matches = currentMatches.concat(malternateMatches);
                                testPos = pos;
                                insertStop = matches.length > 0; //insert a stopelemnt when there is an alternate - needed for non-greedy option
                                match = malternateMatches.length > 0; //set correct match state

                                //cloneback
                                ndxInitializer = ndxInitializerClone.slice();
                            } else {
                                // if (alternateToken.matches[altIndex]) { //if not in the initial alternation => look further
                                match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                                // } else match = false;
                            }
                            if (match) return true;
                        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) {
                            var qt = match;
                            for (var qndx = (ndxInitializer.length > 0) ? ndxInitializer.shift() : 0; (qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max)) && testPos <= pos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); //set the tokenGroup as quantifierRecurse marker
                                if (match) {
                                    //get latest match
                                    latestMatch = matches[matches.length - 1].match;
                                    latestMatch.optionalQuantifier = qndx > (qt.quantifier.min - 1);
                                    if (isFirstMatch(latestMatch, tokenGroup)) { //search for next possible match
                                        if (qndx > (qt.quantifier.min - 1)) {
                                            insertStop = true;
                                            testPos = pos; //match the position after the group
                                            break; //stop quantifierloop
                                        } else return true;
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                            if (match) return true;
                        }
                    }

                    else {
                        testPos++;
                    }
                }

                for (var tndx = (ndxInitializer.length > 0 ? ndxInitializer.shift() : 0); tndx < maskToken.matches.length; tndx++) {
                    if (maskToken.matches[tndx].isQuantifier !== true) {
                        var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                        if (match && testPos === pos) {
                            return match;
                        } else if (testPos > pos) {
                            break;
                        }
                    }
                }
            }

            function mergeLocators(tests) {
                var locator = [];
                if (!$.isArray(tests)) tests = [tests];
                if (tests.length > 0) {
                    if (tests[0].alternation === undefined) {
                        locator = determineTestTemplate(tests.slice()).locator.slice();
                        if (locator.length === 0) locator = tests[0].locator.slice();
                    }
                    else {
                        $.each(tests, function (ndx, tst) {
                            if (tst.def !== "") {
                                if (locator.length === 0) locator = tst.locator.slice();
                                else {
                                    for (var i = 0; i < locator.length; i++) {
                                        if (tst.locator[i] && locator[i].toString().indexOf(tst.locator[i]) === -1) {
                                            locator[i] += "," + tst.locator[i];
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                return locator;
            }

            function filterTests(tests) {
                if (opts.keepStatic && pos > 0) {
                    if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
                        if (tests[0].match.optionality !== true &&
                            tests[0].match.optionalQuantifier !== true &&
                            tests[0].match.fn === null && !/[0-9a-bA-Z]/.test(tests[0].match.def)) {
                            if (getMaskSet().validPositions[pos - 1] === undefined) {
                                return [determineTestTemplate(tests)];
                            }
                            else if (getMaskSet().validPositions[pos - 1].alternation === tests[0].alternation) {
                                return [determineTestTemplate(tests)];
                            } else if (getMaskSet().validPositions[pos - 1]) {
                                return [determineTestTemplate(tests)];
                            }
                        }
                    }
                }

                return tests;
            }

            if (pos > -1) {
                if (ndxIntlzr === undefined) { //determine index initializer
                    var previousPos = pos - 1,
                        test;
                    while ((test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && previousPos > -1) {
                        previousPos--;
                    }
                    if (test !== undefined && previousPos > -1) {
                        ndxInitializer = mergeLocators(test);
                        cacheDependency = ndxInitializer.join("");
                        testPos = previousPos;
                    }
                }
                if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) { //cacheDependency is set on all tests, just check on the first
                    //console.log("cache hit " + pos + " - " + ndxIntlzr);
                    return filterTests(getMaskSet().tests[pos]);
                }
                for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                    var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
                    if ((match && testPos === pos) || testPos > pos) {
                        break;
                    }
                }
            }
            if (matches.length === 0 || insertStop) {
                matches.push({
                    match: {
                        fn: null,
                        cardinality: 0,
                        optionality: true,
                        casing: null,
                        def: "",
                        placeholder: ""
                    },
                    locator: [],
                    cd: cacheDependency
                });
            }

            if (ndxIntlzr !== undefined && getMaskSet().tests[pos]) { //prioritize full tests for caching
                return filterTests($.extend(true, [], matches));
            }
            getMaskSet().tests[pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props
            // console.log(pos + " - " + JSON.stringify(matches));
            return filterTests(getMaskSet().tests[pos]);
        }

        function getBufferTemplate() {
            if (getMaskSet()._buffer === undefined) {
                //generate template
                getMaskSet()._buffer = getMaskTemplate(false, 1);
                if (getMaskSet().buffer === undefined) {
                    getMaskSet().buffer = getMaskSet()._buffer.slice();
                }
            }
            return getMaskSet()._buffer;
        }

        function getBuffer(noCache) {
            if (getMaskSet().buffer === undefined || noCache === true) {
                getMaskSet().buffer = getMaskTemplate(true, getLastValidPosition(), true);
            }
            return getMaskSet().buffer;
        }

        function refreshFromBuffer(start, end, buffer) {
            var i, p;
            if (start === true) {
                resetMaskSet();
                start = 0;
                end = buffer.length;
            } else {
                for (i = start; i < end; i++) {
                    delete getMaskSet().validPositions[i];
                }
            }
            p = start;
            for (i = start; i < end; i++) {
                resetMaskSet(true); //prevents clobber from the buffer
                if (buffer[i] !== opts.skipOptionalPartCharacter) {
                    var valResult = isValid(p, buffer[i], true, true);
                    if (valResult !== false) {
                        resetMaskSet(true);
                        p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1;
                    }
                }
            }
        }

        function casing(elem, test, pos) {
            switch (opts.casing || test.casing) {
                case "upper":
                    elem = elem.toUpperCase();
                    break;
                case "lower":
                    elem = elem.toLowerCase();
                    break;
                case "title":
                    var posBefore = getMaskSet().validPositions[pos - 1];
                    if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE)) {
                        elem = elem.toUpperCase();
                    } else {
                        elem = elem.toLowerCase();
                    }
                    break;
                default:
                    if ($.isFunction(opts.casing)) {
                        var args = Array.prototype.slice.call(arguments);
                        args.push(getMaskSet().validPositions);
                        elem = opts.casing.apply(this, args);
                    }
            }

            return elem;
        }

        function checkAlternationMatch(altArr1, altArr2, na) {
            var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
                isMatch = false, naArr = na !== undefined ? na.split(",") : [],
                naNdx;

            //remove no alternate indexes from alternation array
            for (var i = 0; i < naArr.length; i++) {
                if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
                    altArr1.splice(naNdx, 1);
                }
            }

            for (var alndx = 0; alndx < altArr1.length; alndx++) {
                if ($.inArray(altArr1[alndx], altArrC) !== -1) {
                    isMatch = true;
                    break;
                }
            }
            return isMatch;
        }

        function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) { //strict true ~ no correction or autofill
            function isSelection(posObj) {
                var selection = isRTL ? (posObj.begin - posObj.end) > 1 || ((posObj.begin - posObj.end) === 1) :
                    (posObj.end - posObj.begin) > 1 || ((posObj.end - posObj.begin) === 1);

                return selection && posObj.begin === 0 && posObj.end === getMaskSet().maskLength ? "full" : selection;
            }

            strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

            var maskPos = pos;
            if (pos.begin !== undefined) { //position was a position object - used to handle a delete by typing over a selection
                maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin;
            }

            function _isValid(position, c, strict) {
                var rslt = false;
                $.each(getTests(position), function (ndx, tst) {
                        var test = tst.match,
                            loopend = c ? 1 : 0,
                            chrs = "";
                        for (var i = test.cardinality; i > loopend; i--) {
                            chrs += getBufferElement(position - (i - 1));
                        }
                        if (c) {
                            chrs += c;
                        }

                        //make sure the buffer is set and correct
                        getBuffer(true);
                        //return is false or a json object => { pos: ??, c: ??} or true
                        rslt = test.fn != null ?
                            test.fn.test(chrs, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? //non mask
                                {
                                    c: getPlaceholder(position, test, true) || test.def,
                                    pos: position
                                } : false;

                        if (rslt !== false) {
                            var elem = rslt.c !== undefined ? rslt.c : c;
                            elem = (elem === opts.skipOptionalPartCharacter && test.fn === null) ?
                                (getPlaceholder(position, test, true) || test.def) : elem;

                            var validatedPos = position,
                                possibleModifiedBuffer = getBuffer();

                            if (rslt.remove !== undefined) { //remove position(s)
                                if (!$.isArray(rslt.remove)) rslt.remove = [rslt.remove];
                                $.each(rslt.remove.sort(function (a, b) {
                                    return b - a;
                                }), function (ndx, lmnt) {
                                    stripValidPositions(lmnt, lmnt + 1, true);
                                });
                            }
                            if (rslt.insert !== undefined) { //insert position(s)
                                if (!$.isArray(rslt.insert)) rslt.insert = [rslt.insert];
                                $.each(rslt.insert.sort(function (a, b) {
                                    return a - b;
                                }), function (ndx, lmnt) {
                                    isValid(lmnt.pos, lmnt.c, true, fromSetValid);
                                });
                            }

                            if (rslt.refreshFromBuffer) {
                                var refresh = rslt.refreshFromBuffer;
                                // strict = true;
                                refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, possibleModifiedBuffer);
                                if (rslt.pos === undefined && rslt.c === undefined) {
                                    rslt.pos = getLastValidPosition();
                                    return false; //breakout if refreshFromBuffer && nothing to insert
                                }
                                validatedPos = rslt.pos !== undefined ? rslt.pos : position;
                                if (validatedPos !== position) {
                                    rslt = $.extend(rslt, isValid(validatedPos, elem, true, fromSetValid)); //revalidate new position strict
                                    return false;
                                }

                            } else if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) { //their is a position offset
                                validatedPos = rslt.pos;
                                refreshFromBuffer(position, validatedPos, getBuffer().slice());
                                if (validatedPos !== position) {
                                    rslt = $.extend(rslt, isValid(validatedPos, elem, true)); //revalidate new position strict
                                    return false;
                                }
                            }

                            if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
                                return false; //breakout if nothing to insert
                            }

                            if (ndx > 0) {
                                resetMaskSet(true);
                            }

                            if (!setValidPosition(validatedPos, $.extend({}, tst, {
                                    "input": casing(elem, test, validatedPos)
                                }), fromSetValid, isSelection(pos))) {
                                rslt = false;
                            }
                            return false; //break from $.each
                        }
                    }
                );
                return rslt;
            }

            function alternate(pos, c, strict) {
                var validPsClone = $.extend(true, {}, getMaskSet().validPositions),
                    lastAlt,
                    alternation,
                    isValidRslt = false,
                    altPos, prevAltPos, i, validPos, lAltPos = getLastValidPosition(), altNdxs, decisionPos;
                //find last modified alternation
                prevAltPos = getMaskSet().validPositions[lAltPos];
                for (; lAltPos >= 0; lAltPos--) {
                    altPos = getMaskSet().validPositions[lAltPos];
                    if (altPos && altPos.alternation !== undefined) {
                        lastAlt = lAltPos;
                        alternation = getMaskSet().validPositions[lastAlt].alternation;
                        if (prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
                            break;
                        }
                        prevAltPos = altPos;
                    }
                }
                if (alternation !== undefined) {
                    decisionPos = parseInt(lastAlt);
                    var decisionTaker = prevAltPos.locator[prevAltPos.alternation || alternation] !== undefined ? prevAltPos.locator[prevAltPos.alternation || alternation] : altNdxs[0]; //no match in the alternations (length mismatch)
                    if (decisionTaker.length > 0) { //no decision taken ~ take first one as decider
                        decisionTaker = decisionTaker.split(",")[0];
                    }
                    var possibilityPos = getMaskSet().validPositions[decisionPos],
                        prevPos = getMaskSet().validPositions[decisionPos - 1];
                    $.each(getTests(decisionPos, prevPos ? prevPos.locator : undefined, decisionPos - 1), function (ndx, test) {
                        altNdxs = test.locator[alternation] ? test.locator[alternation].toString().split(",") : [];
                        for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                            var validInputs = [],
                                staticInputsBeforePos = 0,
                                staticInputsBeforePosAlternate = 0,
                                verifyValidInput = false;
                            if (decisionTaker < altNdxs[mndx] && (test.na === undefined || ($.inArray(altNdxs[mndx], test.na.split(",")) === -1 || $.inArray(decisionTaker.toString(), altNdxs) === -1))) {
                                getMaskSet().validPositions[decisionPos] = $.extend(true, {}, test);
                                var possibilities = getMaskSet().validPositions[decisionPos].locator;
                                getMaskSet().validPositions[decisionPos].locator[alternation] = parseInt(altNdxs[mndx]); //set forced decision
                                if (test.match.fn == null) {
                                    if (possibilityPos.input !== test.match.def) {
                                        verifyValidInput = true; //verify that the new definition matches the input
                                        if (possibilityPos.generatedInput !== true) {
                                            validInputs.push(possibilityPos.input);
                                        }
                                    }
                                    staticInputsBeforePosAlternate++;
                                    getMaskSet().validPositions[decisionPos].generatedInput = !/[0-9a-bA-Z]/.test(test.match.def);
                                    getMaskSet().validPositions[decisionPos].input = test.match.def;
                                } else {
                                    getMaskSet().validPositions[decisionPos].input = possibilityPos.input;
                                }
                                for (i = decisionPos + 1; i < getLastValidPosition(undefined, true) + 1; i++) {
                                    validPos = getMaskSet().validPositions[i];
                                    if (validPos && validPos.generatedInput !== true && /[0-9a-bA-Z]/.test(validPos.input)) {
                                        validInputs.push(validPos.input);
                                    } else if (i < pos) staticInputsBeforePos++;
                                    delete getMaskSet().validPositions[i];
                                }
                                if (verifyValidInput && validInputs[0] === test.match.def) {
                                    validInputs.shift();
                                }
                                resetMaskSet(true); //clear getbuffer
                                isValidRslt = true;
                                while (validInputs.length > 0) {
                                    var input = validInputs.shift();
                                    if (input !== opts.skipOptionalPartCharacter) {
                                        if (!(isValidRslt = isValid(getLastValidPosition(undefined, true) + 1, input, false, fromSetValid, true))) {
                                            break;
                                        }
                                    }
                                }

                                if (isValidRslt) {
                                    getMaskSet().validPositions[decisionPos].locator = possibilities; //reset forceddecision ~ needed for proper delete
                                    var targetLvp = getLastValidPosition(pos) + 1;
                                    for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) {
                                        validPos = getMaskSet().validPositions[i];
                                        if ((validPos === undefined || validPos.match.fn == null) && i < (pos + (staticInputsBeforePosAlternate - staticInputsBeforePos))) {
                                            staticInputsBeforePosAlternate++;
                                        }
                                    }
                                    pos = pos + (staticInputsBeforePosAlternate - staticInputsBeforePos);
                                    isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid, true);
                                }
                                if (!isValidRslt) {
                                    resetMaskSet();
                                    getMaskSet().validPositions = $.extend(true, {}, validPsClone);
                                } else return false; //exit $.each
                            }
                        }
                    });
                }

                return isValidRslt;
            }

            //set alternator choice on previous skipped placeholder positions
            function trackbackAlternations(originalPos, newPos) {
                var vp = getMaskSet().validPositions[newPos];
                if (vp) {
                    var targetLocator = vp.locator,
                        tll = targetLocator.length;

                    for (var ps = originalPos; ps < newPos; ps++) {
                        if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, true)) {
                            var tests = getTests(ps).slice(),
                                bestMatch = determineTestTemplate(tests, true),
                                equality = -1;
                            if (tests[tests.length - 1].match.def === "") tests.pop();
                            $.each(tests, function (ndx, tst) { //find best matching
                                for (var i = 0; i < tll; i++) {
                                    if (tst.locator[i] !== undefined && checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(","), tst.na)) {
                                        if (equality < i) {
                                            equality = i;
                                            bestMatch = tst;
                                        }
                                    } else {
                                        //check if alternationIndex is closer then the current bestmatch
                                        var targetAI = targetLocator[i],
                                            bestMatchAI = bestMatch.locator[i],
                                            tstAI = tst.locator[i];
                                        if ((targetAI - bestMatchAI) > Math.abs(targetAI - tstAI)) {
                                            bestMatch = tst;
                                        }
                                        break;
                                    }
                                }
                            });
                            bestMatch = $.extend({}, bestMatch, {
                                "input": getPlaceholder(ps, bestMatch.match, true) || bestMatch.match.def
                            });
                            bestMatch.generatedInput = true;
                            setValidPosition(ps, bestMatch, true);
                            //revalidate the new position to update the locator value
                            getMaskSet().validPositions[newPos] = undefined;
                            _isValid(newPos, vp.input, true);
                        }
                    }
                }
            }

            function setValidPosition(pos, validTest, fromSetValid, isSelection) {
                if (isSelection || (opts.insertMode && getMaskSet().validPositions[pos] !== undefined && fromSetValid === undefined)) {
                    //reposition & revalidate others
                    var positionsClone = $.extend(true, {}, getMaskSet().validPositions),
                        lvp = getLastValidPosition(undefined, true),
                        i;
                    for (i = pos; i <= lvp; i++) { //clear selection
                        delete getMaskSet().validPositions[i];
                    }
                    getMaskSet().validPositions[pos] = $.extend(true, {}, validTest);
                    var valid = true,
                        j, vps = getMaskSet().validPositions, needsValidation = false,
                        initialLength = getMaskSet().maskLength;
                    for (i = (j = pos); i <= lvp; i++) {
                        var t = positionsClone[i];
                        if (t !== undefined /*&& (t.generatedInput !== true || t.match.fn === null)*/) {
                            var posMatch = j;
                            while (posMatch < getMaskSet().maskLength && ((t.match.fn === null && vps[i] && (vps[i].match.optionalQuantifier === true || vps[i].match.optionality === true)) || t.match.fn != null)) {
                                posMatch++;
                                if (needsValidation === false && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def) { //obvious match
                                    getMaskSet().validPositions[posMatch] = $.extend(true, {}, positionsClone[posMatch]);
                                    getMaskSet().validPositions[posMatch].input = t.input;
                                    fillMissingNonMask(posMatch);
                                    j = posMatch;
                                    valid = true;
                                } else if (positionCanMatchDefinition(posMatch, t.match.def)) { //validated match
                                    var result = isValid(posMatch, t.input, true, true);
                                    valid = result !== false;
                                    j = (result.caret || result.insert) ? getLastValidPosition() : posMatch;
                                    needsValidation = true;
                                } else {
                                    valid = t.generatedInput === true;
                                    if (!valid && posMatch >= getMaskSet().maskLength - 1) break;
                                }
                                if (getMaskSet().maskLength < initialLength) getMaskSet().maskLength = initialLength; //a bit hacky but the masklength is corrected later on
                                if (valid) break;
                            }
                        }
                        if (!valid) break;
                    }

                    if (!valid) {
                        getMaskSet().validPositions = $.extend(true, {}, positionsClone);
                        resetMaskSet(true);
                        return false;
                    }
                }

                else {
                    getMaskSet().validPositions[pos] = $.extend(true, {}, validTest);
                }


                resetMaskSet(true);
                return true;
            }

            var result = true,
                positionsClone = $.extend(true, {}, getMaskSet().validPositions); //clone the currentPositions


            function fillMissingNonMask(maskPos) {
                //Check for a nonmask before the pos
                //find previous valid
                for (var pndx = maskPos - 1; pndx > -1; pndx--) {
                    if (getMaskSet().validPositions[pndx]) break;
                }
                ////fill missing nonmask and valid placeholders
                var testTemplate, testsFromPos;
                for (pndx++; pndx < maskPos; pndx++) {
                    if (getMaskSet().validPositions[pndx] === undefined && (opts.jitMasking === false || opts.jitMasking > pndx)) {
                        testsFromPos = getTests(pndx, getTestTemplate(pndx - 1).locator, pndx - 1).slice();
                        if (testsFromPos[testsFromPos.length - 1].match.def === "") testsFromPos.pop();
                        testTemplate = determineTestTemplate(testsFromPos);
                        if (testTemplate && (testTemplate.match.def === opts.radixPointDefinitionSymbol || !isMask(pndx, true) ||
                                ($.inArray(opts.radixPoint, getBuffer()) < pndx && testTemplate.match.fn && testTemplate.match.fn.test(getPlaceholder(pndx), getMaskSet(), pndx, false, opts)))) {
                            result = _isValid(pndx, getPlaceholder(pndx, testTemplate.match, true) || (testTemplate.match.fn == null ? testTemplate.match.def : (getPlaceholder(pndx) !== "" ? getPlaceholder(pndx) : getBuffer()[pndx])), true);
                            if (result !== false) {
                                getMaskSet().validPositions[result.pos || pndx].generatedInput = true;
                            }
                        }
                    }
                }
            }

            if ($.isFunction(opts.preValidation) && !strict && fromSetValid !== true && validateOnly !== true) {
                result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts);
            }
            if (result === true) {
                fillMissingNonMask(maskPos);

                if (isSelection(pos)) {
                    handleRemove(undefined, Inputmask.keyCode.DELETE, pos, true, true);
                    maskPos = getMaskSet().p;
                }

                if (maskPos < getMaskSet().maskLength && (maxLength === undefined || maskPos < maxLength)) {
                    result = _isValid(maskPos, c, strict);
                    if ((!strict || fromSetValid === true) && result === false && validateOnly !== true) {
                        var currentPosValid = getMaskSet().validPositions[maskPos];
                        if (currentPosValid && currentPosValid.match.fn === null && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
                            result = {
                                "caret": seekNext(maskPos)
                            };
                        } else if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && !isMask(maskPos, true)) { //does the input match on a further position?
                            for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
                                // if (!isMask(nPos, true)) {
                                // 	continue;
                                // }
                                result = _isValid(nPos, c, strict);
                                if (result !== false) {
                                    trackbackAlternations(maskPos, result.pos !== undefined ? result.pos : nPos);
                                    maskPos = nPos;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (result === false && opts.keepStatic && !strict && fromAlternate !== true) { //try fuzzy alternator logic
                    result = alternate(maskPos, c, strict);
                }
                if (result === true) {
                    result = {
                        "pos": maskPos
                    };
                }
            }
            if ($.isFunction(opts.postValidation) && result !== false && !strict && fromSetValid !== true && validateOnly !== true) {
                var postResult = opts.postValidation(getBuffer(true), result, opts);
                if (postResult.refreshFromBuffer && postResult.buffer) {
                    var refresh = postResult.refreshFromBuffer;
                    refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, postResult.buffer);
                }
                result = postResult === true ? result : postResult;
            }

            if (result && result.pos === undefined) {
                result.pos = maskPos;
            }

            if (result === false || validateOnly === true) {
                resetMaskSet(true);
                getMaskSet().validPositions = $.extend(true, {}, positionsClone); //revert validation changes
            }

            return result;
        }

        function isMask(pos, strict) {
            var test = getTestTemplate(pos).match;
            if (test.def === "") test = getTest(pos).match;

            if (test.fn != null) {
                return test.fn;
            }
            if (strict !== true && pos > -1) {
                var tests = getTests(pos);
                return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
            }
            return false;
        }

        function seekNext(pos, newBlock) {
            var maskL = getMaskSet().maskLength;
            if (pos >= maskL) return maskL;
            var position = pos;
            if (getTests(maskL + 1).length > 1) {
                getMaskTemplate(true, maskL + 1, true);
                maskL = getMaskSet().maskLength;
            }
            while (++position < maskL &&
            ((newBlock === true && (getTest(position).match.newBlockMarker !== true || !isMask(position))) ||
                (newBlock !== true && !isMask(position)))) {
            }
            return position;
        }

        function seekPrevious(pos, newBlock) {
            var position = pos, tests;
            if (position <= 0) return 0;

            while (--position > 0 &&
            ((newBlock === true && getTest(position).match.newBlockMarker !== true) ||
                (newBlock !== true && !isMask(position) &&
                    (tests = getTests(position), tests.length < 2 || (tests.length === 2 && tests[1].match.def === ""))))) {
            }

            return position;
        }

        function getBufferElement(position) {
            return getMaskSet().validPositions[position] === undefined ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
        }

        function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
            if (event && $.isFunction(opts.onBeforeWrite)) {
                //    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
                var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
                        buffer = getBuffer(true);
                    }
                    //only alter when intented !== undefined
                    if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
                }
            }
            if (input !== undefined) {
                input.inputmask._valueSet(buffer.join(""));
                if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
                    if (android && event && event.type === "input") {
                        setTimeout(function () {
                            caret(input, caretPos);
                        }, 0);
                    } else caret(input, caretPos);
                } else renderColorMask(input, caretPos, buffer.length === 0);
                if (triggerInputEvent === true) {
                    skipInputEvent = true;
                    $(input).trigger("input");
                }
            }
        }

        function getPlaceholder(pos, test, returnPL) {
            test = test || getTest(pos).match;
            if (test.placeholder !== undefined || returnPL === true) {
                return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
            } else if (test.fn === null) {
                if (pos > -1 && getMaskSet().validPositions[pos] === undefined) {
                    var tests = getTests(pos),
                        staticAlternations = [],
                        prevTest;
                    if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
                        for (var i = 0; i < tests.length; i++) {
                            if (tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true &&
                                (tests[i].match.fn === null || (prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, true, opts) !== false))) {
                                staticAlternations.push(tests[i]);
                                if (tests[i].match.fn === null) prevTest = tests[i];
                                if (staticAlternations.length > 1) {
                                    if (/[0-9a-bA-Z]/.test(staticAlternations[0].match.def)) {
                                        return opts.placeholder.charAt(pos % opts.placeholder.length);
                                    }
                                }
                            }
                        }
                    }
                }
                return test.def;
            }

            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }

        var EventRuler = {
            on: function (input, eventName, eventHandler) {
                var ev = function (e) {
                    // console.log("triggered " + e.type);

                    if (this.inputmask === undefined && this.nodeName !== "FORM") { //happens when cloning an object with jquery.clone
                        var imOpts = $.data(this, "_inputmask_opts");
                        if (imOpts) (new Inputmask(imOpts)).mask(this);
                        else EventRuler.off(this);
                    } else if (e.type !== "setvalue" && this.nodeName !== "FORM" && (this.disabled || (this.readOnly && !(e.type === "keydown" && (e.ctrlKey && e.keyCode === 67) || (opts.tabThrough === false && e.keyCode === Inputmask.keyCode.TAB))))) {
                        e.preventDefault();
                    } else {
                        switch (e.type) {
                            case "input":
                                if (skipInputEvent === true) {
                                    skipInputEvent = false;
                                    return e.preventDefault();
                                }
                                break;
                            case "keydown":
                                //Safari 5.1.x - modal dialog fires keypress twice workaround
                                skipKeyPressEvent = false;
                                skipInputEvent = false;
                                break;
                            case "keypress":
                                if (skipKeyPressEvent === true) {
                                    return e.preventDefault();
                                }
                                skipKeyPressEvent = true;
                                break;
                            case "click":
                                if (iemobile || iphone) {
                                    var that = this, args = arguments;
                                    setTimeout(function () {
                                        eventHandler.apply(that, args);
                                    }, 0);
                                    return false;
                                }
                                break;
                        }
                        // console.log("executed " + e.type);
                        var returnVal = eventHandler.apply(this, arguments);
                        if (returnVal === false) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        return returnVal;
                    }
                };
                //keep instance of the event
                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
                input.inputmask.events[eventName].push(ev);

                if ($.inArray(eventName, ["submit", "reset"]) !== -1) {
                    if (input.form !== null) $(input.form).on(eventName, ev);
                } else {
                    $(input).on(eventName, ev);
                }
            },
            off: function (input, event) {
                if (input.inputmask && input.inputmask.events) {
                    var events;
                    if (event) {
                        events = [];
                        events[event] = input.inputmask.events[event];
                    } else {
                        events = input.inputmask.events;
                    }
                    $.each(events, function (eventName, evArr) {
                        while (evArr.length > 0) {
                            var ev = evArr.pop();
                            if ($.inArray(eventName, ["submit", "reset"]) !== -1) {
                                if (input.form !== null) $(input.form).off(eventName, ev);
                            } else {
                                $(input).off(eventName, ev);
                            }
                        }
                        delete input.inputmask.events[eventName];
                    });
                }
            }
        };
        var EventHandlers = {
            keydownEvent: function (e) {
                function isInputEventSupported(eventName) {
                    var el = document.createElement("input"),
                        evName = "on" + eventName,
                        isSupported = (evName in el);
                    if (!isSupported) {
                        el.setAttribute(evName, "return;");
                        isSupported = typeof el[evName] === "function";
                    }
                    el = null;
                    return isSupported;
                }

                var input = this,
                    $input = $(input),
                    k = e.keyCode,
                    pos = caret(input);

                //backspace, delete, and escape get special treatment
                if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || (iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI) || (e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut"))) { //backspace/delete
                    e.preventDefault(); //stop default action but allow propagation
                    handleRemove(input, k, pos);
                    writeBuffer(input, getBuffer(true), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join(""));
                    if (input.inputmask._valueGet() === getBufferTemplate().join("")) {
                        $input.trigger("cleared");
                    } else if (isComplete(getBuffer()) === true) {
                        $input.trigger("complete");
                    }
                } else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
                    e.preventDefault();
                    var caretPos = seekNext(getLastValidPosition());
                    if (!opts.insertMode && caretPos === getMaskSet().maskLength && !e.shiftKey) caretPos--;
                    caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
                } else if ((k === Inputmask.keyCode.HOME && !e.shiftKey) || k === Inputmask.keyCode.PAGE_UP) { //Home or page_up
                    e.preventDefault();
                    caret(input, 0, e.shiftKey ? pos.begin : 0, true);
                } else if (((opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE) || (k === 90 && e.ctrlKey)) && e.altKey !== true) { //escape && undo && #762
                    checkVal(input, true, false, undoValue.split(""));
                    $input.trigger("click");
                } else if (k === Inputmask.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
                    opts.insertMode = !opts.insertMode;
                    caret(input, !opts.insertMode && pos.begin === getMaskSet().maskLength ? pos.begin - 1 : pos.begin);
                } else if (opts.tabThrough === true && k === Inputmask.keyCode.TAB) {
                    if (e.shiftKey === true) {
                        if (getTest(pos.begin).match.fn === null) {
                            pos.begin = seekNext(pos.begin);
                        }
                        pos.end = seekPrevious(pos.begin, true);
                        pos.begin = seekPrevious(pos.end, true);
                    } else {
                        pos.begin = seekNext(pos.begin, true);
                        pos.end = seekNext(pos.begin, true);
                        if (pos.end < getMaskSet().maskLength) pos.end--;
                    }
                    if (pos.begin < getMaskSet().maskLength) {
                        e.preventDefault();
                        caret(input, pos.begin, pos.end);
                    }
                } else if (!e.shiftKey) {
                    if (opts.insertMode === false) {
                        if (k === Inputmask.keyCode.RIGHT) {
                            setTimeout(function () {
                                var caretPos = caret(input);
                                caret(input, caretPos.begin);
                            }, 0);
                        } else if (k === Inputmask.keyCode.LEFT) {
                            setTimeout(function () {
                                var caretPos = caret(input);
                                caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
                            }, 0);
                        }
                    }
                }
                opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts);
                ignorable = $.inArray(k, opts.ignorables) !== -1;
            },
            keypressEvent: function (e, checkval, writeOut, strict, ndx) {
                var input = this,
                    $input = $(input),
                    k = e.which || e.charCode || e.keyCode;

                if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
                    if (k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("")) {
                        undoValue = getBuffer().join("");
                        // e.preventDefault();
                        setTimeout(function () {
                            $input.trigger("change");
                        }, 0);
                    }
                    return true;
                } else {
                    if (k) {
                        //special treat the decimal separator
                        if (k === 46 && e.shiftKey === false && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
                        var pos = checkval ? {
                                begin: ndx,
                                end: ndx
                            } : caret(input),
                            forwardPosition, c = String.fromCharCode(k);

                        getMaskSet().writeOutBuffer = true;
                        var valResult = isValid(pos, c, strict);
                        if (valResult !== false) {
                            resetMaskSet(true);
                            forwardPosition = valResult.caret !== undefined ? valResult.caret : checkval ? valResult.pos + 1 : seekNext(valResult.pos);
                            getMaskSet().p = forwardPosition; //needed for checkval
                        }

                        if (writeOut !== false) {
                            setTimeout(function () {
                                opts.onKeyValidation.call(input, k, valResult, opts);
                            }, 0);
                            if (getMaskSet().writeOutBuffer && valResult !== false) {
                                var buffer = getBuffer();
                                writeBuffer(input, buffer, (opts.numericInput && valResult.caret === undefined) ? seekPrevious(forwardPosition) : forwardPosition, e, checkval !== true);
                                if (checkval !== true) {
                                    setTimeout(function () { //timeout needed for IE
                                        if (isComplete(buffer) === true) $input.trigger("complete");
                                    }, 0);
                                }
                            }
                        }

                        e.preventDefault();

                        if (checkval) {
                            if (valResult !== false) valResult.forwardPosition = forwardPosition;
                            return valResult;
                        }
                    }
                }
            },
            pasteEvent: function (e) {
                var input = this,
                    ev = e.originalEvent || e,
                    $input = $(input),
                    inputValue = input.inputmask._valueGet(true),
                    caretPos = caret(input),
                    tempValue;

                // console.log(inputValue);

                if (isRTL) {
                    tempValue = caretPos.end;
                    caretPos.end = caretPos.begin;
                    caretPos.begin = tempValue;
                }

                var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
                    valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);

                if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
                if (valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("")) valueAfterCaret = "";
                if (isRTL) {
                    tempValue = valueBeforeCaret;
                    valueBeforeCaret = valueAfterCaret;
                    valueAfterCaret = tempValue;
                }

                if (window.clipboardData && window.clipboardData.getData) { // IE
                    inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
                } else if (ev.clipboardData && ev.clipboardData.getData) {
                    inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
                } else return true; //allow native paste event as fallback ~ masking will continue by inputfallback

                var pasteValue = inputValue;
                // console.log(inputValue);
                if ($.isFunction(opts.onBeforePaste)) {
                    pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts);
                    if (pasteValue === false) {
                        return e.preventDefault();
                    }
                    if (!pasteValue) {
                        pasteValue = inputValue;
                    }
                }
                checkVal(input, false, false, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split(""));
                writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join(""));
                if (isComplete(getBuffer()) === true) {
                    $input.trigger("complete");
                }

                return e.preventDefault();
            },
            inputFallBackEvent: function (e) { //fallback when keypress is not triggered
                function repositionCaret(input, frontPart, backPart) {
                    var targetPos = caret(input).begin, currentValue = input.inputmask._valueGet(),
                        pos = currentValue.indexOf(frontPart), currentPos = targetPos;
                    if (pos === 0 && targetPos !== frontPart.length) {
                        targetPos = frontPart.length;
                    } else {
                        while (currentValue.match(Inputmask.escapeRegex(backPart) + "$") === null) {
                            backPart = backPart.substr(1);
                        }
                        var pos2 = currentValue.indexOf(backPart);
                        if (pos2 !== -1 && backPart !== "" && targetPos > pos2 && pos2 > pos) {
                            targetPos = pos2;
                        }
                    }

                    if (!isMask(targetPos)) targetPos = seekNext(targetPos);
                    if (currentPos !== targetPos) {
                        caret(input, targetPos);
                        if (android) { //caret is set by android after inputevent
                            setTimeout(function () {
                                caret(input, targetPos);
                            }, 0);
                        }
                    }
                }

                function radixPointHandler(input, inputValue, caretPos) {
                    //radixpoint tweak
                    if (inputValue.charAt(caretPos.begin - 1) === "." && opts.radixPoint !== "") {
                        inputValue = inputValue.split("");
                        inputValue[caretPos.begin - 1] = opts.radixPoint.charAt(0);
                        inputValue = inputValue.join("");
                    }

                    if (inputValue.charAt(caretPos.begin - 1) === opts.radixPoint && inputValue.length > getBuffer().length) {
                        var keypress = new $.Event("keypress");
                        keypress.which = opts.radixPoint.charCodeAt(0);
                        EventHandlers.keypressEvent.call(input, keypress, true, true, false, caretPos.begin - 1);
                        return false;

                    }
                }

                function ieMobileHandler(input, inputValue, caretPos) {
                    if (iemobile) { //iemobile just set the character at the end althought the caret position is correctly set
                        var inputChar = inputValue.replace(getBuffer().join(""), "");
                        if (inputChar.length === 1) {
                            var keypress = new $.Event("keypress");
                            keypress.which = inputChar.charCodeAt(0);
                            EventHandlers.keypressEvent.call(input, keypress, true, true, false, getMaskSet().validPositions[caretPos.begin - 1] ? caretPos.begin : caretPos.begin - 1);
                            return false;
                        }
                    }
                }

                var input = this,
                    inputValue = input.inputmask._valueGet();

                if (getBuffer().join("") !== inputValue) {
                    var caretPos = caret(input);
                    if (radixPointHandler(input, inputValue, caretPos) === false) return false;
                    inputValue = inputValue.replace(new RegExp("(" + Inputmask.escapeRegex(getBufferTemplate().join("")) + ")*"), "");
                    if (ieMobileHandler(input, inputValue, caretPos) === false) return false;

                    if (caretPos.begin > inputValue.length) {
                        caret(input, inputValue.length);
                        caretPos = caret(input);
                    }

                    var buffer = getBuffer().join(""),
                        frontPart = inputValue.substr(0, caretPos.begin),
                        backPart = inputValue.substr(caretPos.begin),
                        frontBufferPart = buffer.substr(0, caretPos.begin),
                        backBufferPart = buffer.substr(caretPos.begin);

                    //check if thare was a selection
                    var selection = caretPos, entries = "", isEntry = false;
                    if (frontPart !== frontBufferPart) {
                        selection.begin = 0;
                        var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length
                        for (var i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) {
                            selection.begin++;
                        }
                        if (isEntry) {
                            entries += frontPart.slice(selection.begin, selection.end);
                        }
                    }
                    if (backPart !== backBufferPart) {
                        if (backPart.length > backBufferPart.length) {
                            if (isEntry) {
                                selection.end = selection.begin;
                            }
                        } else {
                            if (backPart.length < backBufferPart.length) {
                                selection.end += backBufferPart.length - backPart.length;
                            }
                            else if (backPart.charAt(0) !== backBufferPart.charAt(0)) {
                                selection.end++;
                            }
                        }
                    }

                    writeBuffer(input, getBuffer(), selection);
                    if (entries.length > 0) {
                        $.each(entries.split(""), function (ndx, entry) {
                            var keypress = new $.Event("keypress");
                            keypress.which = entry.charCodeAt(0);
                            ignorable = false; //make sure ignorable is ignored ;-)
                            EventHandlers.keypressEvent.call(input, keypress);
                        });
                    } else {
                        if (selection.begin === selection.end - 1) {
                            caret(input, seekPrevious(selection.begin + 1), selection.end);
                        }
                        e.keyCode = Inputmask.keyCode.DELETE;
                        EventHandlers.keydownEvent.call(input, e);
                    }

                    e.preventDefault();
                }
            },
            setValueEvent: function (e) {
                this.inputmask.refreshValue = false;
                var input = this,
                    value = input.inputmask._valueGet(true);

                if ($.isFunction(opts.onBeforeMask)) value = opts.onBeforeMask.call(inputmask, value, opts) || value;
                value = value.split("");
                checkVal(input, true, false, isRTL ? value.reverse() : value);
                undoValue = getBuffer().join("");
                if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("")) {
                    input.inputmask._valueSet("");
                }
            }

            ,
            focusEvent: function (e) {
                var input = this,
                    nptValue = input.inputmask._valueGet();
                if (opts.showMaskOnFocus && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue === ""))) {
                    if (input.inputmask._valueGet() !== getBuffer().join("")) {
                        writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
                    } else if (mouseEnter === false) { //only executed on focus without mouseenter
                        caret(input, seekNext(getLastValidPosition()));
                    }
                }
                if (opts.positionCaretOnTab === true && mouseEnter === false && nptValue !== "") {
                    writeBuffer(input, getBuffer(), caret(input));
                    EventHandlers.clickEvent.apply(input, [e, true]);
                }
                undoValue = getBuffer().join("");
            }
            ,
            mouseleaveEvent: function (e) {
                var input = this;
                mouseEnter = false;
                if (opts.clearMaskOnLostFocus && document.activeElement !== input) {
                    var buffer = getBuffer().slice(),
                        nptValue = input.inputmask._valueGet();
                    if (nptValue !== input.getAttribute("placeholder") && nptValue !== "") {
                        if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
                            buffer = [];
                        } else { //clearout optional tail of the mask
                            clearOptionalTail(buffer);
                        }
                        writeBuffer(input, buffer);
                    }
                }
            }
            ,
            clickEvent: function (e, tabbed) {
                function doRadixFocus(clickPos) {
                    if (opts.radixPoint !== "") {
                        var vps = getMaskSet().validPositions;
                        if (vps[clickPos] === undefined || (vps[clickPos].input === getPlaceholder(clickPos))) {
                            if (clickPos < seekNext(-1)) return true;
                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                            if (radixPos !== -1) {
                                for (var vp in vps) {
                                    if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                }

                var input = this;
                setTimeout(function () { //needed for Chrome ~ initial selection clears after the clickevent
                    if (document.activeElement === input) {
                        var selectedCaret = caret(input);
                        if (tabbed) {
                            if (isRTL) {
                                selectedCaret.end = selectedCaret.begin;
                            }
                            else {
                                selectedCaret.begin = selectedCaret.end;
                            }
                        }
                        if (selectedCaret.begin === selectedCaret.end) {
                            switch (opts.positionCaretOnClick) {
                                case "none":
                                    break;
                                case "radixFocus":
                                    if (doRadixFocus(selectedCaret.begin)) {
                                        var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                                        caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                                        break;
                                    }
                                default: //lvp:
                                    var clickPosition = selectedCaret.begin,
                                        lvclickPosition = getLastValidPosition(clickPosition, true),
                                        lastPosition = seekNext(lvclickPosition);
                                    if (clickPosition < lastPosition) {
                                        caret(input, !isMask(clickPosition, true) && !isMask(clickPosition - 1, true) ? seekNext(clickPosition) : clickPosition);
                                    } else {
                                        var lvp = getMaskSet().validPositions[lvclickPosition],
                                            tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp),
                                            placeholder = getPlaceholder(lastPosition, tt.match);
                                        if ((placeholder !== "" && getBuffer()[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true) || (!isMask(lastPosition, true) && tt.match.def === placeholder)) {
                                            var newPos = seekNext(lastPosition);
                                            if (clickPosition >= newPos || clickPosition === lastPosition) {
                                                lastPosition = newPos;
                                            }
                                        }
                                        caret(input, lastPosition);
                                    }
                                    break;
                            }
                        }
                    }
                }, 0);
            }
            ,
            dblclickEvent: function (e) {
                var input = this;
                setTimeout(function () {
                    caret(input, 0, seekNext(getLastValidPosition()));
                }, 0);
            }
            ,
            cutEvent: function (e) {
                var input = this,
                    $input = $(input),
                    pos = caret(input),
                    ev = e.originalEvent || e;

                //correct clipboardData
                var clipboardData = window.clipboardData || ev.clipboardData,
                    clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join(""));
                if (document.execCommand) document.execCommand("copy"); // copy selected content to system clipbaord

                handleRemove(input, Inputmask.keyCode.DELETE, pos);
                writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join(""));

                if (input.inputmask._valueGet() === getBufferTemplate().join("")) {
                    $input.trigger("cleared");
                }
            }
            ,
            blurEvent: function (e) {
                var $input = $(this),
                    input = this;
                if (input.inputmask) {
                    var nptValue = input.inputmask._valueGet(),
                        buffer = getBuffer().slice();

                    if (nptValue !== "") {
                        if (opts.clearMaskOnLostFocus) {
                            if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
                                buffer = [];
                            } else { //clearout optional tail of the mask
                                clearOptionalTail(buffer);
                            }
                        }
                        if (isComplete(buffer) === false) {
                            setTimeout(function () {
                                $input.trigger("incomplete");
                            }, 0);
                            if (opts.clearIncomplete) {
                                resetMaskSet();
                                if (opts.clearMaskOnLostFocus) {
                                    buffer = [];
                                } else {
                                    buffer = getBufferTemplate().slice();
                                }
                            }
                        }

                        writeBuffer(input, buffer, undefined, e);
                    }

                    if (undoValue !== getBuffer().join("")) {
                        undoValue = buffer.join("");
                        $input.trigger("change");
                    }
                }
            }
            ,
            mouseenterEvent: function (e) {
                var input = this;
                mouseEnter = true;
                if (document.activeElement !== input && opts.showMaskOnHover) {
                    if (input.inputmask._valueGet() !== getBuffer().join("")) {
                        writeBuffer(input, getBuffer());
                    }
                }
            }
            ,
            submitEvent: function (e) { //trigger change on submit if any
                if (undoValue !== getBuffer().join("")) {
                    $el.trigger("change");
                }
                if (opts.clearMaskOnLostFocus && getLastValidPosition() === -1 && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("")) {
                    el.inputmask._valueSet(""); //clear masktemplete on submit and still has focus
                }
                if (opts.removeMaskOnSubmit) {
                    el.inputmask._valueSet(el.inputmask.unmaskedvalue(), true);
                    setTimeout(function () {
                        writeBuffer(el, getBuffer());
                    }, 0);
                }
            }
            ,
            resetEvent: function (e) {
                el.inputmask.refreshValue = true; //indicate a forced refresh when there is a call to the value before leaving the triggering event fn
                setTimeout(function () {
                    $el.trigger("setvalue");
                }, 0);
            }
        };

        function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
            var inputValue = nptvl.slice(),
                charCodes = "",
                initialNdx = -1, result = undefined;

            // console.log(nptvl);

            function isTemplateMatch(ndx, charCodes) {
                var charCodeNdx = getBufferTemplate().slice(ndx, seekNext(ndx)).join("").indexOf(charCodes);
                return charCodeNdx !== -1 && !isMask(ndx) && getTest(ndx).match.nativeDef === charCodes.charAt(charCodes.length - 1);
            }

            resetMaskSet();
            if (!strict && opts.autoUnmask !== true) {
                var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""),
                    matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                if (matches && matches.length > 0) {
                    inputValue.splice(0, matches.length * staticInput.length);
                    initialNdx = seekNext(initialNdx);
                }
            } else {
                initialNdx = seekNext(initialNdx);
            }
            if (initialNdx === -1) {
                getMaskSet().p = seekNext(initialNdx);
                initialNdx = 0;
            } else getMaskSet().p = initialNdx;
            $.each(inputValue, function (ndx, charCode) {
                // console.log(charCode);
                if (charCode !== undefined) { //inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
                    if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, true) &&
                        isValid(ndx, inputValue[ndx], true, undefined, undefined, true) === false) {
                        getMaskSet().p++;
                    }
                    else {

                        var keypress = new $.Event("_checkval");
                        keypress.which = charCode.charCodeAt(0);
                        charCodes += charCode;
                        var lvp = getLastValidPosition(undefined, true),
                            lvTest = getMaskSet().validPositions[lvp],
                            nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : undefined, lvp);
                        if (!isTemplateMatch(initialNdx, charCodes) || strict || opts.autoUnmask) {
                            var pos = strict ? ndx : (nextTest.match.fn == null && nextTest.match.optionality && (lvp + 1) < getMaskSet().p ? lvp + 1 : getMaskSet().p);
                            result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, pos);
                            initialNdx = pos + 1;
                            charCodes = "";
                        } else {
                            result = EventHandlers.keypressEvent.call(input, keypress, true, false, true, lvp + 1);
                        }
                        if (result !== false && !strict && $.isFunction(opts.onBeforeWrite)) {
                            var origResult = result;
                            result = opts.onBeforeWrite.call(inputmask, keypress, getBuffer(), result.forwardPosition, opts);
                            result = $.extend(origResult, result);
                            if (result && result.refreshFromBuffer) {
                                var refresh = result.refreshFromBuffer;
                                refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer);
                                resetMaskSet(true);
                                if (result.caret) {
                                    getMaskSet().p = result.caret;
                                    result.forwardPosition = result.caret;
                                }
                            }
                        }
                    }
                }
            });
            if (writeOut) {
                var caretPos = undefined;
                if (document.activeElement === input && result) {
                    caretPos = opts.numericInput ? seekPrevious(result.forwardPosition) : result.forwardPosition;
                }

                writeBuffer(input, getBuffer(), caretPos, initiatingEvent || new $.Event("checkval"), initiatingEvent && initiatingEvent.type === "input");
            }
        }

        function unmaskedvalue(input) {
            if (input) {
                if (input.inputmask === undefined) {
                    return input.value;
                }
                if (input.inputmask && input.inputmask.refreshValue) { //forced refresh from the value form.reset
                    EventHandlers.setValueEvent.call(input);
                }
            }
            var umValue = [],
                vps = getMaskSet().validPositions;
            for (var pndx in vps) {
                if (vps[pndx].match && vps[pndx].match.fn != null) {
                    umValue.push(vps[pndx].input);
                }
            }
            var unmaskedValue = umValue.length === 0 ? "" : (isRTL ? umValue.reverse() : umValue).join("");
            if ($.isFunction(opts.onUnMask)) {
                var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
            }
            return unmaskedValue;
        }

        function caret(input, begin, end, notranslate) {
            function translatePosition(pos) {
                if (notranslate !== true && isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "")) {
                    var bffrLght = getBuffer().join("").length; //join is needed because sometimes we get an empty buffer element which must not be counted for the caret position (numeric alias)
                    pos = bffrLght - pos;
                }
                return pos;
            }

            var range;
            if (begin !== undefined) {
                if (begin.begin !== undefined) {
                    end = begin.end;
                    begin = begin.begin;
                }
                if (typeof begin === "number") {
                    begin = translatePosition(begin);
                    end = translatePosition(end);
                    end = (typeof end == "number") ? end : begin;
                    // if (!$(input).is(":visible")) {
                    // 	return;
                    // }

                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;

                    if (!mobile && opts.insertMode === false && begin === end) end++; //set visualization for insert/overwrite mode
                    if (input.setSelectionRange) {
                        input.selectionStart = begin;
                        input.selectionEnd = end;
                    } else if (window.getSelection) {
                        range = document.createRange();
                        if (input.firstChild === undefined || input.firstChild === null) {
                            var textNode = document.createTextNode("");
                            input.appendChild(textNode);
                        }
                        range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
                        range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
                        range.collapse(true);
                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                        //input.focus();
                    } else if (input.createTextRange) {
                        range = input.createTextRange();
                        range.collapse(true);
                        range.moveEnd("character", end);
                        range.moveStart("character", begin);
                        range.select();

                    }
                    renderColorMask(input, {begin: begin, end: end});
                }
            } else {
                if (input.setSelectionRange) {
                    begin = input.selectionStart;
                    end = input.selectionEnd;
                } else if (window.getSelection) {
                    range = window.getSelection().getRangeAt(0);
                    if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
                        begin = range.startOffset;
                        end = range.endOffset;
                    }
                } else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange();
                    begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
                    end = begin + range.text.length;
                }

                /*eslint-disable consistent-return */
                return {
                    "begin": translatePosition(begin),
                    "end": translatePosition(end)
                };
                /*eslint-enable consistent-return */
            }
        }

        function determineLastRequiredPosition(returnDefinition) {
            var buffer = getBuffer(),
                bl = buffer.length,
                pos, lvp = getLastValidPosition(),
                positions = {},
                lvTest = getMaskSet().validPositions[lvp],
                ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
                testPos;
            for (pos = lvp + 1; pos < buffer.length; pos++) {
                testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                ndxIntlzr = testPos.locator.slice();
                positions[pos] = $.extend(true, {}, testPos);
            }

            var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
            for (pos = bl - 1; pos > lvp; pos--) {
                testPos = positions[pos];
                if ((testPos.match.optionality ||
                        (testPos.match.optionalQuantifier && testPos.match.newBlockMarker) ||
                        (lvTestAlt &&
                            ((lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.fn != null) ||
                                (testPos.match.fn === null && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && getTests(pos)[0].def !== "")))) &&
                    buffer[pos] === getPlaceholder(pos, testPos.match)) {
                    bl--;
                } else break;
            }
            return returnDefinition ? {
                "l": bl,
                "def": positions[bl] ? positions[bl].match : undefined
            } : bl;
        }

        function clearOptionalTail(buffer) {
            var rl = determineLastRequiredPosition(),
                validPos, bl = buffer.length;

            var lv = getMaskSet().validPositions[getLastValidPosition()];
            while (rl < bl &&
            !isMask(rl, true) &&
            (validPos = (lv !== undefined ? getTestTemplate(rl, lv.locator.slice(""), lv) : getTest(rl))) &&
            validPos.match.optionality !== true &&
            ((validPos.match.optionalQuantifier !== true && validPos.match.newBlockMarker !== true) || (rl + 1 === bl &&
                (lv !== undefined ? getTestTemplate(rl + 1, lv.locator.slice(""), lv) : getTest(rl + 1)).match.def === ""))) {
                rl++;
            }

            //exceptionally strip from the validatedPositions
            while ((validPos = getMaskSet().validPositions[rl - 1]) && validPos && validPos.match.optionality && validPos.input === opts.skipOptionalPartCharacter) {
                rl--;
            }
            buffer.splice(rl);
            return buffer;
        }

        function isComplete(buffer) { //return true / false / undefined (repeat *)
            if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
            if (opts.repeat === "*") return undefined;
            var complete = false,
                lrp = determineLastRequiredPosition(true),
                aml = seekPrevious(lrp.l);

            if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                complete = true;
                for (var i = 0; i <= aml; i++) {
                    var test = getTestTemplate(i).match;
                    if ((test.fn !== null && getMaskSet().validPositions[i] === undefined && test.optionality !== true && test.optionalQuantifier !== true) || (test.fn === null && buffer[i] !== getPlaceholder(i, test))) {
                        complete = false;
                        break;
                    }
                }
            }
            return complete;
        }


        function handleRemove(input, k, pos, strict, fromIsValid) {
            function generalize() {
                if (opts.keepStatic) {
                    var validInputs = [],
                        lastAlt = getLastValidPosition(-1, true),
                        positionsClone = $.extend(true, {}, getMaskSet().validPositions),
                        prevAltPos = getMaskSet().validPositions[lastAlt];
                    //find last alternation
                    for (; lastAlt >= 0; lastAlt--) {
                        var altPos = getMaskSet().validPositions[lastAlt];
                        if (altPos) {
                            if (altPos.generatedInput !== true && /[0-9a-bA-Z]/.test(altPos.input)) {
                                validInputs.push(altPos.input);
                            }
                            delete getMaskSet().validPositions[lastAlt];
                            if (altPos.alternation !== undefined && altPos.locator[altPos.alternation] !== prevAltPos.locator[altPos.alternation]) {
                                break;
                            }
                            prevAltPos = altPos;
                        }
                    }

                    if (lastAlt > -1) {
                        getMaskSet().p = seekNext(getLastValidPosition(-1, true));
                        while (validInputs.length > 0) {
                            var keypress = new $.Event("keypress");
                            keypress.which = validInputs.pop().charCodeAt(0);
                            // eslint-disable-next-line no-use-before-define
                            EventHandlers.keypressEvent.call(input, keypress, true, false, false, getMaskSet().p);

                        }
                    } else getMaskSet().validPositions = $.extend(true, {}, positionsClone); //restore original positions
                }
            }

            if (opts.numericInput || isRTL) {
                if (k === Inputmask.keyCode.BACKSPACE) {
                    k = Inputmask.keyCode.DELETE;
                } else if (k === Inputmask.keyCode.DELETE) {
                    k = Inputmask.keyCode.BACKSPACE;
                }

                if (isRTL) {
                    var pend = pos.end;
                    pos.end = pos.begin;
                    pos.begin = pend;
                }
            }

            if (k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || opts.insertMode === false)) {
                pos.begin = seekPrevious(pos.begin);
                if (getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator) {
                    pos.begin--;
                }
            } else if (k === Inputmask.keyCode.DELETE && pos.begin === pos.end) {
                pos.end = isMask(pos.end, true) && (getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint  ) ?
                    pos.end + 1 :
                    seekNext(pos.end) + 1;
                if (getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator) {
                    pos.end++;
                }
            }

            stripValidPositions(pos.begin, pos.end, false, strict);
            if (strict !== true) {
                generalize(); //revert the alternation
            }
            var lvp = getLastValidPosition(pos.begin, true);
            if (lvp < pos.begin) {
                //if (lvp === -1) resetMaskSet();
                getMaskSet().p = seekNext(lvp);
            } else if (strict !== true) {
                getMaskSet().p = pos.begin;
                if (fromIsValid !== true) {
                    //put position on first valid from pos.begin ~ #1351
                    while (getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined) {
                        getMaskSet().p++;
                    }
                }
            }
        }

        function initializeColorMask(input) {
            var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);

            function findCaretPos(clientx) {
                //calculate text width
                var e = document.createElement("span"), caretPos;
                for (var style in computedStyle) { //clone styles
                    if (isNaN(style) && style.indexOf("font") !== -1) {
                        e.style[style] = computedStyle[style];
                    }
                }
                e.style.textTransform = computedStyle.textTransform;
                e.style.letterSpacing = computedStyle.letterSpacing;
                e.style.position = "absolute";
                e.style.height = "auto";
                e.style.width = "auto";
                e.style.visibility = "hidden";
                e.style.whiteSpace = "nowrap";

                document.body.appendChild(e);
                var inputText = input.inputmask._valueGet(), previousWidth = 0, itl;
                for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
                    e.innerHTML += inputText.charAt(caretPos) || "_";
                    if (e.offsetWidth >= clientx) {
                        var offset1 = (clientx - previousWidth);
                        var offset2 = e.offsetWidth - clientx;
                        e.innerHTML = inputText.charAt(caretPos);
                        offset1 -= (e.offsetWidth / 3);
                        caretPos = offset1 < offset2 ? caretPos - 1 : caretPos;
                        break;
                    }
                    previousWidth = e.offsetWidth;
                }
                document.body.removeChild(e);
                return caretPos;
            }

            var template = document.createElement("div");
            template.style.width = computedStyle.width;
            template.style.textAlign = computedStyle.textAlign;
            colorMask = document.createElement("div");
            colorMask.className = "im-colormask";
            input.parentNode.insertBefore(colorMask, input);
            input.parentNode.removeChild(input);
            colorMask.appendChild(template);
            colorMask.appendChild(input);
            input.style.left = template.offsetLeft + "px";

            $(input).on("click", function (e) {
                caret(input, findCaretPos(e.clientX));
                return EventHandlers.clickEvent.call(input, [e]);
            });
            $(input).on("keydown", function (e) {
                if (!e.shiftKey && opts.insertMode !== false) {
                    setTimeout(function () {
                        renderColorMask(input);
                    }, 0);
                }
            });
        }

        Inputmask.prototype.positionColorMask = function (input, template) {
            input.style.left = template.offsetLeft + "px";
        }

        function renderColorMask(input, caretPos, clear) {
            var maskTemplate = "", isStatic = false, test, testPos, ndxIntlzr, pos = 0;

            function handleStatic() {
                if (!isStatic && (test.fn === null || testPos.input === undefined)) {
                    isStatic = true;
                    maskTemplate += "<span class='im-static'>"
                } else if (isStatic && ((test.fn !== null && testPos.input !== undefined) || test.def === "")) {
                    isStatic = false;
                    maskTemplate += "</span>"
                }
            }

            function handleCaret(force) {
                if ((force === true || pos === caretPos.begin) && document.activeElement === input) {
                    maskTemplate += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>";
                }
            }

            if (colorMask !== undefined) {
                var buffer = getBuffer();
                if (caretPos === undefined) {
                    caretPos = caret(input);
                } else if (caretPos.begin === undefined) {
                    caretPos = {begin: caretPos, end: caretPos};
                }

                if (clear !== true) {
                    var lvp = getLastValidPosition();
                    do {
                        handleCaret();
                        if (getMaskSet().validPositions[pos]) {
                            testPos = getMaskSet().validPositions[pos];
                            test = testPos.match;
                            ndxIntlzr = testPos.locator.slice();
                            handleStatic();
                            maskTemplate += buffer[pos];
                        } else {
                            testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                            test = testPos.match;
                            ndxIntlzr = testPos.locator.slice();
                            if (opts.jitMasking === false || pos < lvp || (typeof opts.jitMasking === "number" && isFinite(opts.jitMasking) && opts.jitMasking > pos)) {
                                handleStatic();
                                maskTemplate += getPlaceholder(pos, test);
                            }
                        }
                        pos++;
                    } while ((maxLength === undefined || pos < maxLength) && (test.fn !== null || test.def !== "") || lvp > pos || isStatic);
                    if (maskTemplate.indexOf("im-caret") === -1) handleCaret(true);
                    if (isStatic) handleStatic();
                }

                var template = colorMask.getElementsByTagName("div")[0];
                template.innerHTML = maskTemplate;
                input.inputmask.positionColorMask(input, template);
            }
        }

        function mask(elem) {
            function isElementTypeSupported(input, opts) {
                function patchValueProperty(npt) {
                    var valueGet;
                    var valueSet;

                    function patchValhook(type) {
                        if ($.valHooks && ($.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true)) {
                            var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                                return elem.value;
                            };
                            var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                                elem.value = value;
                                return elem;
                            };

                            $.valHooks[type] = {
                                get: function (elem) {
                                    if (elem.inputmask) {
                                        if (elem.inputmask.opts.autoUnmask) {
                                            return elem.inputmask.unmaskedvalue();
                                        } else {
                                            var result = valhookGet(elem);
                                            return getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                                        }
                                    } else return valhookGet(elem);
                                },
                                set: function (elem, value) {
                                    var $elem = $(elem),
                                        result;
                                    result = valhookSet(elem, value);
                                    if (elem.inputmask) {
                                        $elem.trigger("setvalue");
                                    }
                                    return result;
                                },
                                inputmaskpatch: true
                            };
                        }
                    }

                    function getter() {
                        if (this.inputmask) {
                            return this.inputmask.opts.autoUnmask ?
                                this.inputmask.unmaskedvalue() :
                                (getLastValidPosition() !== -1 || opts.nullable !== true ?
                                    (document.activeElement === this && opts.clearMaskOnLostFocus ?
                                        (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") :
                                        valueGet.call(this)) :
                                    "");
                        } else return valueGet.call(this);
                    }

                    function setter(value) {
                        valueSet.call(this, value);
                        if (this.inputmask) {
                            $(this).trigger("setvalue");
                        }
                    }

                    function installNativeValueSetFallback(npt) {
                        EventRuler.on(npt, "mouseenter", function (event) {
                            var $input = $(this),
                                input = this,
                                value = input.inputmask._valueGet();
                            if (value !== getBuffer().join("") /*&& getLastValidPosition() > 0*/) {
                                $input.trigger("setvalue");
                            }
                        });
                    }

                    if (!npt.inputmask.__valueGet) {
                        if (opts.noValuePatching !== true) {
                            if (Object.getOwnPropertyDescriptor) {
                                if (typeof Object.getPrototypeOf !== "function") {
                                    Object.getPrototypeOf = typeof "test".__proto__ === "object" ? function (object) {
                                        return object.__proto__;
                                    } : function (object) {
                                        return object.constructor.prototype;
                                    };
                                }

                                var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
                                if (valueProperty && valueProperty.get && valueProperty.set) {
                                    valueGet = valueProperty.get;
                                    valueSet = valueProperty.set;
                                    Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: true
                                    });
                                } else if (npt.tagName !== "INPUT") {
                                    valueGet = function () {
                                        return this.textContent;
                                    };
                                    valueSet = function (value) {
                                        this.textContent = value;
                                    };
                                    Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: true
                                    });
                                }
                            } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                                valueGet = npt.__lookupGetter__("value");
                                valueSet = npt.__lookupSetter__("value");

                                npt.__defineGetter__("value", getter);
                                npt.__defineSetter__("value", setter);
                            }
                            npt.inputmask.__valueGet = valueGet; //store native property getter
                            npt.inputmask.__valueSet = valueSet; //store native property setter
                        }
                        npt.inputmask._valueGet = function (overruleRTL) {
                            return isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                        };
                        npt.inputmask._valueSet = function (value, overruleRTL) { //null check is needed for IE8 => otherwise converts to "null"
                            valueSet.call(this.el, (value === null || value === undefined) ? "" : ((overruleRTL !== true && isRTL) ? value.split("").reverse().join("") : value));
                        };

                        if (valueGet === undefined) { //jquery.val fallback
                            valueGet = function () {
                                return this.value;
                            };
                            valueSet = function (value) {
                                this.value = value;
                            };
                            patchValhook(npt.type);
                            installNativeValueSetFallback(npt);
                        }
                    }
                }

                var elementType = input.getAttribute("type");
                var isSupported = (input.tagName === "INPUT" && $.inArray(elementType, opts.supportsInputType) !== -1) || input.isContentEditable || input.tagName === "TEXTAREA";
                if (!isSupported) {
                    if (input.tagName === "INPUT") {
                        var el = document.createElement("input");
                        el.setAttribute("type", elementType);
                        isSupported = el.type === "text"; //apply mask only if the type is not natively supported
                        el = null;
                    } else isSupported = "partial";
                }
                if (isSupported !== false) {
                    patchValueProperty(input);
                } else input.inputmask = undefined;
                return isSupported;
            }

            //unbind all events - to make sure that no other mask will interfere when re-masking
            EventRuler.off(elem);
            var isSupported = isElementTypeSupported(elem, opts);
            if (isSupported !== false) {
                el = elem;
                $el = $(el);

                //read maxlength prop from el
                maxLength = el !== undefined ? el.maxLength : undefined;
                if (maxLength === -1) maxLength = undefined;

                if (opts.colorMask === true) {
                    initializeColorMask(el);
                }

                if (android) {
                    if (el.hasOwnProperty("inputmode")) {
                        el.inputmode = opts.inputmode;
                        el.setAttribute("inputmode", opts.inputmode);
                    }
                    if (opts.androidHack === "rtfm") {
                        if (opts.colorMask !== true) {
                            initializeColorMask(el);
                        }
                        el.type = "password";
                    }
                }

                if (isSupported === true) {
                    //bind events
                    EventRuler.on(el, "submit", EventHandlers.submitEvent);
                    EventRuler.on(el, "reset", EventHandlers.resetEvent);

                    EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
                    EventRuler.on(el, "blur", EventHandlers.blurEvent);
                    EventRuler.on(el, "focus", EventHandlers.focusEvent);
                    EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
                    if (opts.colorMask !== true) {
                        EventRuler.on(el, "click", EventHandlers.clickEvent);
                    }
                    EventRuler.on(el, "dblclick", EventHandlers.dblclickEvent);
                    EventRuler.on(el, "paste", EventHandlers.pasteEvent);
                    EventRuler.on(el, "dragdrop", EventHandlers.pasteEvent);
                    EventRuler.on(el, "drop", EventHandlers.pasteEvent);
                    EventRuler.on(el, "cut", EventHandlers.cutEvent);
                    EventRuler.on(el, "complete", opts.oncomplete);
                    EventRuler.on(el, "incomplete", opts.onincomplete);
                    EventRuler.on(el, "cleared", opts.oncleared);
                    if (!android && opts.inputEventOnly !== true) {
                        EventRuler.on(el, "keydown", EventHandlers.keydownEvent);
                        EventRuler.on(el, "keypress", EventHandlers.keypressEvent);
                    } else el.removeAttribute("maxLength");
                    EventRuler.on(el, "compositionstart", $.noop);
                    EventRuler.on(el, "compositionupdate", $.noop);
                    EventRuler.on(el, "compositionend", $.noop);
                    EventRuler.on(el, "keyup", $.noop);
                    EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
                    EventRuler.on(el, "beforeinput", $.noop); //https://github.com/w3c/input-events - to implement
                }
                EventRuler.on(el, "setvalue", EventHandlers.setValueEvent);

                //apply mask
                undoValue = getBufferTemplate().join(""); //initialize the buffer and getmasklength
                if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || document.activeElement === el) {
                    var initialValue = $.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(true), opts) || el.inputmask._valueGet(true)) : el.inputmask._valueGet(true);
                    if (initialValue !== "") checkVal(el, true, false, isRTL ? initialValue.split("").reverse() : initialValue.split(""));
                    var buffer = getBuffer().slice();
                    undoValue = buffer.join("");
                    // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
                    if (isComplete(buffer) === false) {
                        if (opts.clearIncomplete) {
                            resetMaskSet();
                        }
                    }
                    if (opts.clearMaskOnLostFocus && document.activeElement !== el) {
                        if (getLastValidPosition() === -1) {
                            buffer = [];
                        } else {
                            clearOptionalTail(buffer);
                        }
                    }
                    writeBuffer(el, buffer);
                    if (document.activeElement === el) { //position the caret when in focus
                        caret(el, seekNext(getLastValidPosition()));
                    }
                }
            }
        }

//action object
        var valueBuffer;
        if (actionObj !== undefined) {
            switch (actionObj.action) {
                case "isComplete":
                    el = actionObj.el;
                    return isComplete(getBuffer());
                case "unmaskedvalue":
                    if (el === undefined || actionObj.value !== undefined) {
                        valueBuffer = actionObj.value;
                        valueBuffer = ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer) : valueBuffer).split("");
                        checkVal(undefined, false, false, isRTL ? valueBuffer.reverse() : valueBuffer);
                        if ($.isFunction(opts.onBeforeWrite)) opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts);
                    }
                    return unmaskedvalue(el);
                case "mask":
                    mask(el);
                    break;
                case "format":
                    valueBuffer = ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value) : actionObj.value).split("");
                    checkVal(undefined, true, false, isRTL ? valueBuffer.reverse() : valueBuffer);
                    if (actionObj.metadata) {
                        return {
                            value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                            metadata: maskScope.call(this, {
                                "action": "getmetadata"
                            }, maskset, opts)
                        };
                    }

                    return isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
                case "isValid":
                    if (actionObj.value) {
                        valueBuffer = actionObj.value.split("");
                        checkVal(undefined, true, true, isRTL ? valueBuffer.reverse() : valueBuffer);
                    } else {
                        actionObj.value = getBuffer().join("");
                    }
                    var buffer = getBuffer();
                    var rl = determineLastRequiredPosition(),
                        lmib = buffer.length - 1;
                    for (; lmib > rl; lmib--) {
                        if (isMask(lmib)) break;
                    }
                    buffer.splice(rl, lmib + 1 - rl);

                    return isComplete(buffer) && actionObj.value === getBuffer().join("");
                case "getemptymask":
                    return getBufferTemplate().join("");
                case "remove":
                    if (el && el.inputmask) {
                        $el = $(el);
                        //writeout the value
                        el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(true));
                        //unbind all events
                        EventRuler.off(el);
                        //restore the value property
                        var valueProperty;
                        if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
                            valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value");
                            if (valueProperty) {
                                if (el.inputmask.__valueGet) {
                                    Object.defineProperty(el, "value", {
                                        get: el.inputmask.__valueGet,
                                        set: el.inputmask.__valueSet,
                                        configurable: true
                                    });
                                }
                            }
                        } else if (document.__lookupGetter__ && el.__lookupGetter__("value")) {
                            if (el.inputmask.__valueGet) {
                                el.__defineGetter__("value", el.inputmask.__valueGet);
                                el.__defineSetter__("value", el.inputmask.__valueSet);
                            }
                        }
                        //clear data
                        el.inputmask = undefined;
                    }
                    return el;
                    break;
                case "getmetadata":
                    if ($.isArray(maskset.metadata)) {
                        var maskTarget = getMaskTemplate(true, 0, false).join("");
                        $.each(maskset.metadata, function (ndx, mtdt) {
                            if (mtdt.mask === maskTarget) {
                                maskTarget = mtdt;
                                return false;
                            }
                        });
                        return maskTarget;
                    }

                    return maskset.metadata;
            }
        }
    }

//make inputmask available
    return Inputmask;
}))
;
