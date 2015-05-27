/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 -	Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0-dev
 */

(function($) {
  function inputmask(options) {
    this.el = undefined;
    //init options
    this.opts = $.extend(true, {}, this.defaults, options);
    this.noMasksCache = options && options.definitions !== undefined;
    this.userOptions = options || {}; //user passed options
    resolveAlias(this.opts.alias, options, this.opts);
  }

  inputmask.prototype = {
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
      mask: null,
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
      aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
      alias: null,
      onKeyDown: $.noop, //callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
      onBeforeMask: undefined, //executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
      onBeforePaste: undefined, //executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
      onBeforeWrite: undefined, //executes before writing to the masked element. args => event, opts
      onUnMask: undefined, //executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
      showMaskOnFocus: true, //show the mask-placeholder when the input has focus
      showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
      onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
      skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
      showTooltip: false, //show the activemask as tooltip
      numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
      rightAlign: false, //align to the right
      undoOnEscape: true, //pressing escape reverts the value to the value before focus
      //numeric basic properties
      radixPoint: "", //".", // | ","
      groupSeparator: "", //",", // | "."
      radixFocus: false, //position caret to radixpoint on initial click
      //numeric basic properties
      nojumps: false, //do not jump over fixed parts in the mask
      nojumpsThreshold: 0, //start nojumps as of
      keepStatic: undefined, //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible - undefined see auto selection for multi masks
      definitions: {
        '9': {
          validator: "[0-9]",
          cardinality: 1,
          definitionSymbol: "*"
        },
        'a': {
          validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
          cardinality: 1,
          definitionSymbol: "*"
        },
        '*': {
          validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
          cardinality: 1
        }
      },
      //specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
      ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
      isComplete: undefined, //override for isComplete - args => buffer, opts - return true || false
      canClearPosition: $.noop, //hook to alter the clear behavior in the stripValidPositions args => maskset, position, lastValidPosition, opts => return true|false
      postValidation: undefined //hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, opts => return true/false
    },
    keyCode: {
      ALT: 18,
      BACKSPACE: 8,
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
      WINDOWS: 91
    },
    masksCache: {},
    mask: function(el) {
      var input = el.jquery && el.length > 0 ? el[0] : el,
        scopedOpts = $.extend(true, {}, this.opts);
      importAttributeOptions(el, scopedOpts, $.extend(true, {}, this.userOptions));
      var maskset = generateMaskSet(scopedOpts, this.noMasksCache);
      if (maskset != undefined) {
        //store inputmask instance on the input with element reference
        input.inputmask = new inputmask();
        input.inputmask.opts = scopedOpts;
        input.inputmask.noMasksCache = this.noMasksCache;
        input.inputmask.el = input;
        input.inputmask.maskset = maskset;
        input.inputmask.isRTL = false;

        maskScope({
          "action": "mask",
          "el": input
        }, maskset, input.inputmask.opts);
      }
      return el;
    },
    unmaskedvalue: function() {
      if (this.el) {
        return maskScope({
          "action": "unmaskedvalue",
          "el": this.el
        });
      }
    },
    remove: function() {
      if (this.el) {
        maskScope({
          "action": "remove",
          "el": this.el
        });
        this.el.inputmask = undefined; //delete ~ undefined
        return this.el;
      }
    },
    getemptymask: function() { //return the default (empty) mask value, usefull for setting the default value in validation
      if (this.el) {
        return maskScope({
          "action": "getemptymask",
          "el": this.el
        });
      }
    },
    hasMaskedValue: function() { //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
      return !this.opts.autoUnmask;
    },
    isComplete: function() {
      if (this.el) {
        return maskScope({
          "action": "isComplete",
          "buffer": this.el._valueGet().split(''),
          "el": this.el
        });
      }
    },
    getmetadata: function() { //return mask metadata if exists
      if (this.el) {
        return maskScope({
          "action": "getmetadata",
          "el": this.el
        });
      }
    }
  }

  //aply defaults, definitions, aliases
  inputmask.extendDefaults = function(options) {
    $.extend(inputmask.prototype.defaults, options);
  }
  inputmask.extendDefinitions = function(definition) {
    $.extend(inputmask.prototype.defaults.definitions, definition);
  }
  inputmask.extendAliases = function(alias) {
      $.extend(inputmask.prototype.defaults.aliases, alias);
    }
    //static fn on inputmask
  inputmask.format = function(value, options, metadata) {
    var opts = $.extend(true, {}, inputmask.prototype.defaults, options);
    resolveAlias(opts.alias, options, opts);
    return maskScope({
      "action": "format",
      "value": value,
      "metadata": metadata //true/false getmetadata
    }, generateMaskSet(opts, options && options.definitions !== undefined), opts);
  }
  inputmask.isValid = function(value, options) {
    var opts = $.extend(true, {}, inputmask.prototype.defaults, options);
    resolveAlias(opts.alias, options, opts);
    return maskScope({
      "action": "isValid",
      "value": value
    }, generateMaskSet(opts, options && options.definitions !== undefined), opts);
  }
  inputmask.escapeRegex = function(str) {
    var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^'];
    return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
  }
  inputmask.keyCode = {
    ALT: 18,
    BACKSPACE: 8,
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
    WINDOWS: 91
  }

  //helper functions
  function isInputEventSupported(eventName) {
    var el = document.createElement('input'),
      evName = 'on' + eventName,
      isSupported = (evName in el);
    if (!isSupported) {
      el.setAttribute(evName, 'return;');
      isSupported = typeof el[evName] == 'function';
    }
    el = null;
    return isSupported;
  }

  function isInputTypeSupported(inputType) {
    var isSupported = inputType == "text" || inputType == "tel" || inputType == "password";
    if (!isSupported) {
      var el = document.createElement('input');
      el.setAttribute("type", inputType);
      isSupported = el.type === "text"; //apply mask only if the type is not natively supported
      el = null;
    }
    return isSupported;
  }

  function resolveAlias(aliasStr, options, opts) {
    var aliasDefinition = opts.aliases[aliasStr];
    if (aliasDefinition) {
      if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
      $.extend(true, opts, aliasDefinition); //merge alias definition in the options
      $.extend(true, opts, options); //reapply extra given options
      return true;
    } else { //alias not found - try as mask
      if (opts.mask == undefined)
        opts.mask = aliasStr;
    }

    return false;
  }

  function importAttributeOptions(npt, opts, userOptions) {
    var $npt = $(npt);
    var attrOptions = $npt.data("inputmask");
    if (attrOptions && attrOptions != "") {
      try {
        attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
        var dataoptions = $.parseJSON("{" + attrOptions + "}");
        $.extend(true, userOptions, dataoptions);
      } catch (ex) {} //need a more relax parseJSON
    }
    for (var option in opts) {
      var optionData = $npt.data("inputmask-" + option.toLowerCase());
      if (optionData != undefined) {
        optionData = typeof optionData == "boolean" ? optionData : optionData.toString();
        if (option == "mask" && optionData.indexOf("[") == 0) {
          userOptions[option] = optionData.replace(/[\s[\]]/g, "").split("','");
          userOptions[option][0] = userOptions[option][0].replace("'", "");
          userOptions[option][userOptions[option].length - 1] = userOptions[option][userOptions[option].length - 1].replace("'", "");
        } else
          userOptions[option] = optionData;
      }
    }
    if (userOptions.alias)
      resolveAlias(userOptions.alias, userOptions, opts);
    else $.extend(true, opts, userOptions);
    return opts;
  }

  function generateMaskSet(opts, nocache) {
    var ms = undefined;

    function analyseMask(mask) {
      var tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g,
        escaped = false;

      function maskToken(isGroup, isOptional, isQuantifier, isAlternator) {
        this.matches = [];
        this.isGroup = isGroup || false;
        this.isOptional = isOptional || false;
        this.isQuantifier = isQuantifier || false;
        this.isAlternator = isAlternator || false;
        this.quantifier = {
          min: 1,
          max: 1
        };
      };

      //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
      function insertTestDefinition(mtoken, element, position) {
        var maskdef = opts.definitions[element];
        var newBlockMarker = mtoken.matches.length == 0;
        position = position != undefined ? position : mtoken.matches.length;
        if (maskdef && !escaped) {
          maskdef["placeholder"] = $.isFunction(maskdef["placeholder"]) ? maskdef["placeholder"].call(this, opts) : maskdef["placeholder"];
          var prevalidators = maskdef["prevalidator"],
            prevalidatorsL = prevalidators ? prevalidators.length : 0;
          for (var i = 1; i < maskdef.cardinality; i++) {
            var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [],
              validator = prevalidator["validator"],
              cardinality = prevalidator["cardinality"];
            mtoken.matches.splice(position++, 0, {
              fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function() {
                this.test = validator;
              } : new RegExp("."),
              cardinality: cardinality ? cardinality : 1,
              optionality: mtoken.isOptional,
              newBlockMarker: newBlockMarker,
              casing: maskdef["casing"],
              def: maskdef["definitionSymbol"] || element,
              placeholder: maskdef["placeholder"],
              mask: element
            });
          }
          mtoken.matches.splice(position++, 0, {
            fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function() {
              this.test = maskdef.validator;
            } : new RegExp("."),
            cardinality: maskdef.cardinality,
            optionality: mtoken.isOptional,
            newBlockMarker: newBlockMarker,
            casing: maskdef["casing"],
            def: maskdef["definitionSymbol"] || element,
            placeholder: maskdef["placeholder"],
            mask: element
          });
        } else {
          mtoken.matches.splice(position++, 0, {
            fn: null,
            cardinality: 0,
            optionality: mtoken.isOptional,
            newBlockMarker: newBlockMarker,
            casing: null,
            def: element,
            placeholder: undefined,
            mask: element
          });
          escaped = false;
        }
      }

      var currentToken = new maskToken(),
        match,
        m,
        openenings = [],
        maskTokens = [],
        openingToken,
        currentOpeningToken,
        alternator,
        lastMatch;

      while (match = tokenizer.exec(mask)) {
        m = match[0];
        switch (m.charAt(0)) {
          case opts.optionalmarker.end:
            // optional closing
          case opts.groupmarker.end:
            // Group closing
            openingToken = openenings.pop();
            if (openenings.length > 0) {
              currentOpeningToken = openenings[openenings.length - 1];
              currentOpeningToken["matches"].push(openingToken);
              if (currentOpeningToken.isAlternator) { //handle alternator (a) | (b) case
                alternator = openenings.pop();
                for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                  alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
                }
                if (openenings.length > 0) {
                  currentOpeningToken = openenings[openenings.length - 1];
                  currentOpeningToken["matches"].push(alternator);
                } else {
                  currentToken.matches.push(alternator);
                }
              }
            } else {
              currentToken.matches.push(openingToken);
            }
            break;
          case opts.optionalmarker.start:
            // optional opening
            openenings.push(new maskToken(false, true));
            break;
          case opts.groupmarker.start:
            // Group opening
            openenings.push(new maskToken(true));
            break;
          case opts.quantifiermarker.start:
            //Quantifier
            var quantifier = new maskToken(false, false, true);

            m = m.replace(/[{}]/g, "");
            var mq = m.split(","),
              mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
              mq1 = mq.length == 1 ? mq0 : (isNaN(mq[1]) ? mq[1] : parseInt(mq[1]));
            if (mq1 == "*" || mq1 == "+") {
              mq0 = mq1 == "*" ? 0 : 1;
            }
            quantifier.quantifier = {
              min: mq0,
              max: mq1
            };
            if (openenings.length > 0) {
              var matches = openenings[openenings.length - 1]["matches"];
              match = matches.pop();
              if (!match["isGroup"]) {
                var groupToken = new maskToken(true);
                groupToken.matches.push(match);
                match = groupToken;
              }
              matches.push(match);
              matches.push(quantifier);
            } else {
              match = currentToken.matches.pop();
              if (!match["isGroup"]) {
                var groupToken = new maskToken(true);
                groupToken.matches.push(match);
                match = groupToken;
              }
              currentToken.matches.push(match);
              currentToken.matches.push(quantifier);
            }
            break;
          case opts.escapeChar:
            escaped = true;
            break;
          case opts.alternatormarker:
            if (openenings.length > 0) {
              currentOpeningToken = openenings[openenings.length - 1];
              lastMatch = currentOpeningToken.matches.pop();
            } else {
              lastMatch = currentToken.matches.pop();
            }
            if (lastMatch.isAlternator) {
              openenings.push(lastMatch);
            } else {
              alternator = new maskToken(false, false, false, true);
              alternator.matches.push(lastMatch);
              openenings.push(alternator);
            }
            break;
          default:
            if (openenings.length > 0) {
              currentOpeningToken = openenings[openenings.length - 1];
              if (currentOpeningToken.matches.length > 0 && !currentOpeningToken.isAlternator) {
                lastMatch = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                if (lastMatch["isGroup"]) { //this is not a group but a normal mask => convert
                  lastMatch.isGroup = false;
                  insertTestDefinition(lastMatch, opts.groupmarker.start, 0);
                  insertTestDefinition(lastMatch, opts.groupmarker.end);
                }
              }
              insertTestDefinition(currentOpeningToken, m);
              if (currentOpeningToken.isAlternator) { //handle alternator a | b case
                alternator = openenings.pop();
                for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                  alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
                }
                if (openenings.length > 0) {
                  currentOpeningToken = openenings[openenings.length - 1];
                  currentOpeningToken["matches"].push(alternator);
                } else {
                  currentToken.matches.push(alternator);
                }
              }
            } else {
              if (currentToken.matches.length > 0) {
                lastMatch = currentToken.matches[currentToken.matches.length - 1];
                if (lastMatch["isGroup"]) { //this is not a group but a normal mask => convert
                  lastMatch.isGroup = false;
                  insertTestDefinition(lastMatch, opts.groupmarker.start, 0);
                  insertTestDefinition(lastMatch, opts.groupmarker.end);
                }
              }
              insertTestDefinition(currentToken, m);
            }
        }
      }

      if (currentToken.matches.length > 0) {
        lastMatch = currentToken.matches[currentToken.matches.length - 1];
        if (lastMatch["isGroup"]) { //this is not a group but a normal mask => convert
          lastMatch.isGroup = false;
          insertTestDefinition(lastMatch, opts.groupmarker.start, 0);
          insertTestDefinition(lastMatch, opts.groupmarker.end);
        }
        maskTokens.push(currentToken);
      }

      //console.log(JSON.stringify(maskTokens));
      return maskTokens;
    }

    function generateMask(mask, metadata) {
      if (mask == undefined || mask == "")
        return undefined;
      else {
        if (mask.length == 1 && opts.greedy == false && opts.repeat != 0) {
          opts.placeholder = "";
        } //hide placeholder with single non-greedy mask
        if (opts.repeat > 0 || opts.repeat == "*" || opts.repeat == "+") {
          var repeatStart = opts.repeat == "*" ? 0 : (opts.repeat == "+" ? 1 : opts.repeat);
          mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
        }

        var masksetDefinition;
        if (inputmask.prototype.masksCache[mask] == undefined || nocache === true) {
          masksetDefinition = {
            "mask": mask,
            "maskToken": analyseMask(mask),
            "validPositions": {},
            "_buffer": undefined,
            "buffer": undefined,
            "tests": {},
            "metadata": metadata
          };
          if (nocache !== true)
            inputmask.prototype.masksCache[mask] = masksetDefinition;
        } else masksetDefinition = $.extend(true, {}, inputmask.prototype.masksCache[mask]);

        return masksetDefinition;
      }
    }

    function preProcessMask(mask) {
      mask = mask.toString();
      if (opts.numericInput) { //TODO FIX FOR DYNAMIC MASKS WITH QUANTIFIERS
        mask = mask.split('').reverse();
        for (var ndx = 0; ndx < mask.length; ndx++) {
          if (mask[ndx] == opts.optionalmarker.start)
            mask[ndx] = opts.optionalmarker.end;
          else if (mask[ndx] == opts.optionalmarker.end)
            mask[ndx] = opts.optionalmarker.start;
          else if (mask[ndx] == opts.groupmarker.start)
            mask[ndx] = opts.groupmarker.end;
          else if (mask[ndx] == opts.groupmarker.end)
            mask[ndx] = opts.groupmarker.start;
        }
        mask = mask.join('');
      }
      return mask;
    }

    if ($.isFunction(opts.mask)) { //allow mask to be a preprocessing fn - should return a valid mask
      opts.mask = opts.mask.call(this, opts);
    }
    if ($.isArray(opts.mask)) {
      if (opts.mask.length > 1) {
        opts.keepStatic = opts.keepStatic == undefined ? true : opts.keepStatic; //enable by default when passing multiple masks when the option is not explicitly specified
        var altMask = "(";
        $.each(opts.mask, function(ndx, msk) {
          if (altMask.length > 1)
            altMask += ")|(";
          if (msk["mask"] != undefined && !$.isFunction(msk["mask"])) {
            altMask += preProcessMask(msk["mask"]);
          } else {
            altMask += preProcessMask(msk);
          }
        });
        altMask += ")";
        return generateMask(altMask, opts.mask);
      } else opts.mask = opts.mask.pop();
    }

    if (opts.mask) {
      if (opts.mask["mask"] != undefined && !$.isFunction(opts.mask["mask"])) {
        ms = generateMask(preProcessMask(opts.mask["mask"]), opts.mask);
      } else {
        ms = generateMask(preProcessMask(opts.mask), opts.mask);
      }
    }

    return ms;
  }

  var ua = navigator.userAgent,
    iphone = ua.match(new RegExp("iphone", "i")) !== null,
    android = ua.match(new RegExp("android.*safari.*", "i")) !== null,
    androidchrome = ua.match(new RegExp("android.*chrome.*", "i")) !== null,
    androidfirefox = ua.match(new RegExp("android.*firefox.*", "i")) !== null,
    kindle = /Kindle/i.test(ua) || /Silk/i.test(ua) || /KFTT/i.test(ua) || /KFOT/i.test(ua) || /KFJWA/i.test(ua) || /KFJWI/i.test(ua) || /KFSOWI/i.test(ua) || /KFTHWA/i.test(ua) || /KFTHWI/i.test(ua) || /KFAPWA/i.test(ua) || /KFAPWI/i.test(ua),
    PasteEventType = isInputEventSupported('paste') ? 'paste' : isInputEventSupported('input') ? 'input' : "propertychange";

  //if (androidchrome) {
  //		var browser = navigator.userAgent.match(new RegExp("chrome.*", "i")),
  //				version = parseInt(new RegExp(/[0-9]+/).exec(browser));
  //		androidchrome32 = (version == 32);
  //}

  //masking scope
  //actionObj definition see below
  function maskScope(actionObj, maskset, opts) {
    var isRTL = false,
      undoValue,
      compositionValidPos,
      compositionCaretPos,
      compositionData,
      el, $el,
      skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
      skipInputEvent = false, //skip when triggered from within inputmask
      ignorable = false,
      maxLength,
      firstClick = true,
      mouseEnter = true;

    //maskset helperfunctions
    function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
      minimalPos = minimalPos || 0;
      var maskTemplate = [],
        ndxIntlzr, pos = 0,
        test, testPos;
      do {
        if (baseOnInput === true && getMaskSet()['validPositions'][pos]) {
          var validPos = getMaskSet()['validPositions'][pos];
          test = validPos["match"];
          ndxIntlzr = validPos["locator"].slice();
          maskTemplate.push(includeInput === true ? validPos["input"] : getPlaceholder(pos, test));
        } else {
          //console.log("getmasktemplate " + pos + " " + JSON.stringify(ndxIntlzr));
          testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
          test = testPos["match"];
          ndxIntlzr = testPos["locator"].slice();
          maskTemplate.push(getPlaceholder(pos, test));
        }
        pos++;
      } while ((maxLength == undefined || pos - 1 < maxLength) && test["fn"] != null || (test["fn"] == null && test["def"] != "") || minimalPos >= pos);
      maskTemplate.pop(); //drop the last one which is empty
      return maskTemplate;
    }

    function getMaskSet() {
      return maskset;
    }

    function resetMaskSet(soft) {
      var maskset = getMaskSet();
      maskset["buffer"] = undefined;
      maskset["tests"] = {};
      if (soft !== true) {
        maskset["_buffer"] = undefined;
        maskset["validPositions"] = {};
        maskset["p"] = 0;
      }
    }

    function getLastValidPosition(closestTo, strict) {
      var maskset = getMaskSet(),
        lastValidPosition = -1,
        valids = maskset["validPositions"];
      if (closestTo == undefined) closestTo = -1;
      var before = lastValidPosition,
        after = lastValidPosition;
      for (var posNdx in valids) {
        var psNdx = parseInt(posNdx);
        if (valids[psNdx] && (strict || valids[psNdx]["match"].fn != null)) {
          if (psNdx <= closestTo) before = psNdx;
          if (psNdx >= closestTo) after = psNdx;
        }
      }
      lastValidPosition = (before != -1 && (closestTo - before) > 1) || after < closestTo ? before : after;
      return lastValidPosition;
    }

    function setValidPosition(pos, validTest, fromSetValid) {
      if (opts.insertMode && getMaskSet()["validPositions"][pos] != undefined && fromSetValid == undefined) {
        //reposition & revalidate others
        var positionsClone = $.extend(true, {}, getMaskSet()["validPositions"]),
          lvp = getLastValidPosition(),
          i;
        for (i = pos; i <= lvp; i++) { //clear selection
          delete getMaskSet()["validPositions"][i];
        }
        getMaskSet()["validPositions"][pos] = validTest;
        var valid = true,
          j, vps = getMaskSet()["validPositions"];
        for (i = (j = pos); i <= lvp; i++) {
          var t = positionsClone[i];
          if (t != undefined) {
            var posMatch = j,
              prevPosMatch = -1;
            while (posMatch < getMaskLength() && ((t.match.fn == null && vps[i] && (vps[i].match.optionalQuantifier === true || vps[i].match.optionality === true)) || t.match.fn != null)) {
              //determine next position
              if (t.match.fn == null || (!opts.keepStatic && vps[i] && (vps[i + 1] != undefined && getTests(i + 1, vps[i].locator.slice(), i).length > 1 || vps[i].alternation != undefined)))
                posMatch++;
              else
                posMatch = seekNext(j);

              //does it match
              if (positionCanMatchDefinition(posMatch, t["match"].def)) {
                valid = isValid(posMatch, t["input"], true, true) !== false;
                j = posMatch;
                break;
              } else {
                valid = t["match"].fn == null;
                if (prevPosMatch == posMatch) break; //prevent endless loop
                prevPosMatch = posMatch;
              }
            }
          }
          if (!valid) break;
        }

        if (!valid) {
          getMaskSet()["validPositions"] = $.extend(true, {}, positionsClone);
          return false;
        }
      } else
        getMaskSet()["validPositions"][pos] = validTest;

      return true;
    }

    function stripValidPositions(start, end, nocheck, strict) {
      var i, startPos = start;
      getMaskSet()["p"] = start; //needed for alternated position after overtype selection

      var endPos = end;
      for (i = startPos; i < end; i++) { //clear selection
        if (getMaskSet()["validPositions"][i] != undefined) {
          if (nocheck === true || opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts) != false)
            delete getMaskSet()["validPositions"][i];
        }
      }

      resetMaskSet(true);
      for (i = startPos + 1; i <= getLastValidPosition();) {
        while (getMaskSet()["validPositions"][startPos] != undefined) startPos++;
        var s = getMaskSet()["validPositions"][startPos];
        if (i < startPos) i = startPos + 1;
        var t = getMaskSet()["validPositions"][i];
        if (t != undefined && s == undefined) {
          if (positionCanMatchDefinition(startPos, t.match.def) && isValid(startPos, t["input"], true) !== false) {
            delete getMaskSet()["validPositions"][i];
            i++;
          }
          startPos++;
        } else i++;
      }
      //remove radixpoint if needed
      var lvp = getLastValidPosition(),
        ml = getMaskLength();
      if (nocheck !== true && getMaskSet()["validPositions"][lvp] != undefined && getMaskSet()["validPositions"][lvp].input == opts.radixPoint)
        delete getMaskSet()["validPositions"][lvp];

      for (i = lvp + 1; i <= ml; i++) {
        if (getMaskSet()["validPositions"][i])
          delete getMaskSet()["validPositions"][i];
      }

      resetMaskSet(true);
    }

    function getTestTemplate(pos, ndxIntlzr, tstPs) {
      var testPos = getMaskSet()["validPositions"][pos];
      if (testPos == undefined) {
        var testPositions = getTests(pos, ndxIntlzr, tstPs),
          lvp = getLastValidPosition(),
          lvTest = getMaskSet()["validPositions"][lvp] || getTests(0)[0],
          lvTestAltArr = (lvTest.alternation != undefined) ? lvTest["locator"][lvTest.alternation].toString().split(',') : [];
        for (var ndx = 0; ndx < testPositions.length; ndx++) {
          testPos = testPositions[ndx];

          if (testPos["match"] &&
            (((opts.greedy && testPos["match"].optionalQuantifier !== true) || (testPos["match"].optionality === false || testPos["match"].newBlockMarker === false) && testPos["match"].optionalQuantifier !== true) &&
              ((lvTest.alternation == undefined || lvTest.alternation != testPos.alternation) ||
                (testPos["locator"][lvTest.alternation] != undefined && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr))))) {
            break;
          }
        }
      }

      return testPos;
    }

    function getTest(pos) {
      if (getMaskSet()['validPositions'][pos]) {
        return getMaskSet()['validPositions'][pos]["match"];
      }
      return getTests(pos)[0]["match"];
    }

    function positionCanMatchDefinition(pos, def) {
      var valid = false,
        tests = getTests(pos);
      for (var tndx = 0; tndx < tests.length; tndx++) {
        if (tests[tndx]["match"] && tests[tndx]["match"].def == def) {
          valid = true;
          break;
        }
      }
      return valid;
    };

    function getTests(pos, ndxIntlzr, tstPs, cacheable) {
      var maskTokens = getMaskSet()["maskToken"],
        testPos = ndxIntlzr ? tstPs : 0,
        ndxInitializer = ndxIntlzr || [0],
        matches = [],
        insertStop = false;

      function ResolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) { //ndxInitilizer contains a set of indexes to speedup searches in the mtokens
        function handleMatch(match, loopNdx, quantifierRecurse) {
          if (testPos > 10000) {
            alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet()["mask"]);
            return true;
          }
          if (testPos == pos && match.matches == undefined) {
            matches.push({
              "match": match,
              "locator": loopNdx.reverse()
            });
            return true;
          } else if (match.matches != undefined) {
            if (match.isGroup && quantifierRecurse !== true) { //when a group pass along to the quantifier
              match = handleMatch(maskToken.matches[tndx + 1], loopNdx);
              if (match) return true;
            } else if (match.isOptional) {
              var optionalToken = match;
              match = ResolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
              if (match) {
                var latestMatch = matches[matches.length - 1]["match"];
                var isFirstMatch = $.inArray(latestMatch, optionalToken.matches) == 0;
                if (isFirstMatch) {
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
              if (altIndex == -1 || typeof altIndex == "string") {
                var currentPos = testPos,
                  ndxInitializerClone = ndxInitializer.slice(),
                  altIndexArr = [];
                if (typeof altIndex == "string") altIndexArr = altIndex.split(",");
                for (var amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                  matches = [];
                  match = handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) || match;
                  if (match !== true && match != undefined && (altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length)) { //no match in the alternations (length mismatch) => look further
                    var ntndx = maskToken.matches.indexOf(match) + 1;
                    if (maskToken.matches.length > ntndx) {
                      match = handleMatch(maskToken.matches[ntndx], [ntndx].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse)
                      if (match) {
                        altIndexArr.push(ntndx.toString());
                        $.each(matches, function(ndx, lmnt) {
                          lmnt.alternation = loopNdx.length - 1;
                        });
                      }
                    }
                  }
                  maltMatches = matches.slice();
                  testPos = currentPos;
                  matches = [];
                  //cloneback
                  for (var i = 0; i < ndxInitializerClone.length; i++) {
                    ndxInitializer[i] = ndxInitializerClone[i];
                  }
                  //fuzzy merge matches
                  for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                    var altMatch = maltMatches[ndx1];
                    altMatch.alternation = altMatch.alternation || loopNdxCnt;
                    for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                      var altMatch2 = malternateMatches[ndx2];
                      //verify equality
                      if (altMatch.match.mask == altMatch2.match.mask && (typeof altIndex != "string" || $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) != -1)) {
                        maltMatches.splice(ndx1, 1);
                        ndx1--;
                        altMatch2.locator[altMatch.alternation] = altMatch2.locator[altMatch.alternation] + "," + altMatch.locator[altMatch.alternation];
                        altMatch2.alternation = altMatch.alternation; //we pass the alternation index => used in determineLastRequiredPosition
                        break;
                      }
                    }
                  }
                  malternateMatches = malternateMatches.concat(maltMatches);
                }

                if (typeof altIndex == "string") { //filter matches
                  malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                    if (isFinite(ndx)) {
                      var mamatch,
                        alternation = lmnt.alternation,
                        altLocArr = lmnt.locator[alternation].toString().split(",");
                      lmnt.locator[alternation] = undefined;
                      lmnt.alternation = undefined;
                      for (var alndx = 0; alndx < altLocArr.length; alndx++) {
                        mamatch = $.inArray(altLocArr[alndx], altIndexArr) != -1;
                        if (mamatch) { //rebuild the locator with valid entries
                          if (lmnt.locator[alternation] != undefined) {
                            lmnt.locator[alternation] += ",";
                            lmnt.locator[alternation] += altLocArr[alndx];
                          } else
                            lmnt.locator[alternation] = parseInt(altLocArr[alndx]);

                          lmnt.alternation = alternation;
                        }
                      }
                      if (lmnt.locator[alternation] != undefined) return lmnt;
                    }
                  });
                }

                matches = currentMatches.concat(malternateMatches);
                testPos = pos;
                insertStop = matches.length > 0; //insert a stopelemnt when there is an alternate
              } else {
                if (alternateToken.matches[altIndex]) { //if not in the initial alternation => look further
                  match = handleMatch(alternateToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                } else match = false;
              }
              if (match) return true;
            } else if (match.isQuantifier && quantifierRecurse !== true) {
              var qt = match;
              for (var qndx = (ndxInitializer.length > 0 && quantifierRecurse !== true) ? ndxInitializer.shift() : 0;
                (qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max)) && testPos <= pos; qndx++) {
                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                match = handleMatch(tokenGroup, [qndx].concat(loopNdx), true);
                if (match) {
                  //get latest match
                  var latestMatch = matches[matches.length - 1]["match"];
                  latestMatch.optionalQuantifier = qndx > (qt.quantifier.min - 1);
                  var isFirstMatch = $.inArray(latestMatch, tokenGroup.matches) == 0;

                  if (isFirstMatch) { //search for next possible match
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
              match = ResolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
              if (match)
                return true;
            }
          } else testPos++;
        }

        for (var tndx = (ndxInitializer.length > 0 ? ndxInitializer.shift() : 0); tndx < maskToken.matches.length; tndx++) {
          if (maskToken.matches[tndx]["isQuantifier"] !== true) {
            var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
            if (match && testPos == pos) {
              return match;
            } else if (testPos > pos) {
              break;
            }
          }
        }
      }

      if (cacheable === true && getMaskSet()['tests'][pos]) {
        return getMaskSet()['tests'][pos];
      }
      if (ndxIntlzr == undefined) {
        var previousPos = pos - 1,
          test;
        while ((test = getMaskSet()['validPositions'][previousPos]) == undefined && previousPos > -1) {
          if (getMaskSet()['tests'][previousPos] && (test = getMaskSet()['tests'][previousPos][0]) != undefined)
            break;
          previousPos--;

        }
        if (test != undefined && previousPos > -1) {
          testPos = previousPos;
          ndxInitializer = test["locator"].slice();
        }
      }
      for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
        var match = ResolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
        if ((match && testPos == pos) || testPos > pos) {
          break;
        }
      }
      if (matches.length == 0 || insertStop)
        matches.push({
          "match": {
            fn: null,
            cardinality: 0,
            optionality: true,
            casing: null,
            def: ""
          },
          "locator": []
        });

      getMaskSet()['tests'][pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props

      //console.log(pos + " - " + JSON.stringify(matches));
      return getMaskSet()['tests'][pos];
    }

    function getBufferTemplate() {
      if (getMaskSet()['_buffer'] == undefined) {
        //generate template
        getMaskSet()["_buffer"] = getMaskTemplate(false, 1);
      }
      return getMaskSet()['_buffer'];
    }

    function getBuffer() {
      if (getMaskSet()['buffer'] == undefined) {
        getMaskSet()['buffer'] = getMaskTemplate(true, getLastValidPosition(), true);
      }
      return getMaskSet()['buffer'];
    }

    function refreshFromBuffer(start, end, buffer) {
      buffer = buffer || getBuffer().slice(); //pass or work on clone
      if (start === true) {
        resetMaskSet();
        start = 0;
        end = buffer.length;
      } else {
        for (var i = start; i < end; i++) {
          delete getMaskSet()["validPositions"][i];
          delete getMaskSet()["tests"][i];
        }
      }

      for (var i = start; i < end; i++) {
        if (buffer[i] != opts.skipOptionalPartCharacter) {
          isValid(i, buffer[i], true, true);
        }
      }
    }

    function casing(elem, test) {
      switch (test.casing) {
        case "upper":
          elem = elem.toUpperCase();
          break;
        case "lower":
          elem = elem.toLowerCase();
          break;
      }

      return elem;
    }

    function checkAlternationMatch(altArr1, altArr2) {
      var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
        isMatch = false;
      for (var alndx = 0; alndx < altArr1.length; alndx++) {
        if ($.inArray(altArr1[alndx], altArrC) != -1) {
          isMatch = true;
          break;
        }
      }
      return isMatch;
    }

    function isValid(pos, c, strict, fromSetValid) { //strict true ~ no correction or autofill
      strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

      function _isValid(position, c, strict, fromSetValid) {
        var rslt = false;
        //console.log(JSON.stringify(getTests(position)));
        $.each(getTests(position), function(ndx, tst) {
          var test = tst["match"];
          var loopend = c ? 1 : 0,
            chrs = '',
            buffer = getBuffer();
          for (var i = test.cardinality; i > loopend; i--) {
            chrs += getBufferElement(position - (i - 1));
          }
          if (c) {
            chrs += c;
          }

          //return is false or a json object => { pos: ??, c: ??} or true
          rslt = test.fn != null ?
            test.fn.test(chrs, getMaskSet(), position, strict, opts) : (c == test["def"] || c == opts.skipOptionalPartCharacter) && test["def"] != "" ? //non mask
            {
              c: test["def"],
              pos: position
            } : false;

          if (rslt !== false) {
            var elem = rslt.c != undefined ? rslt.c : c;
            elem = (elem == opts.skipOptionalPartCharacter && test["fn"] === null) ? test["def"] : elem;

            var validatedPos = position,
              possibleModifiedBuffer = getBuffer();

            if (rslt["remove"] != undefined) { //remove position(s)
              if (!$.isArray(rslt["remove"])) rslt["remove"] = [rslt["remove"]];
              $.each(rslt["remove"].sort(function(a, b) {
                return b - a;
              }), function(ndx, lmnt) {
                stripValidPositions(lmnt, lmnt + 1, true);
              });
            }
            if (rslt["insert"] != undefined) { //insert position(s)
              if (!$.isArray(rslt["insert"])) rslt["insert"] = [rslt["insert"]];
              $.each(rslt["insert"].sort(function(a, b) {
                return a - b;
              }), function(ndx, lmnt) {
                isValid(lmnt["pos"], lmnt["c"], true);
              });
            }

            if (rslt["refreshFromBuffer"]) {
              var refresh = rslt["refreshFromBuffer"];
              strict = true;
              refreshFromBuffer(refresh === true ? refresh : refresh["start"], refresh["end"], possibleModifiedBuffer);
              if (rslt.pos == undefined && rslt.c == undefined) {
                rslt.pos = getLastValidPosition();
                return false; //breakout if refreshFromBuffer && nothing to insert
              }
              validatedPos = rslt.pos != undefined ? rslt.pos : position;
              if (validatedPos != position) {
                rslt = $.extend(rslt, isValid(validatedPos, elem, true)); //revalidate new position strict
                return false;
              }

            } else if (rslt !== true && rslt.pos != undefined && rslt["pos"] != position) { //their is a position offset
              validatedPos = rslt["pos"];
              refreshFromBuffer(position, validatedPos);
              if (validatedPos != position) {
                rslt = $.extend(rslt, isValid(validatedPos, elem, true)); //revalidate new position strict
                return false;
              }
            }

            if (rslt != true && rslt.pos == undefined && rslt.c == undefined) {
              return false; //breakout if nothing to insert
            }

            if (ndx > 0) {
              resetMaskSet(true);
            }

            if (!setValidPosition(validatedPos, $.extend({}, tst, {
                "input": casing(elem, test)
              }), fromSetValid))
              rslt = false;
            return false; //break from $.each
          }
        });

        return rslt;
      }

      function alternate(pos, c, strict, fromSetValid) {
        var validPsClone = $.extend(true, {}, getMaskSet()["validPositions"]),
          lastAlt,
          alternation,
          isValidRslt,
          altPos;
        //find last modified alternation
        for (var lAlt = getLastValidPosition(); lAlt >= 0; lAlt--) {
          altPos = getMaskSet()["validPositions"][lAlt];
          if (altPos && altPos.alternation != undefined) {
            lastAlt = lAlt;
            alternation = getMaskSet()["validPositions"][lastAlt].alternation;
            if (getTestTemplate(lastAlt).locator[altPos.alternation] != altPos.locator[altPos.alternation]) {
              break;
            }
          }
        }
        if (alternation != undefined) {
          //find first decision making position
          lastAlt = parseInt(lastAlt);
          for (var decisionPos in getMaskSet()["validPositions"]) {
            decisionPos = parseInt(decisionPos);
            altPos = getMaskSet()["validPositions"][decisionPos];
            if (decisionPos >= lastAlt && altPos.alternation != undefined) {
              var altNdxs = getMaskSet()["validPositions"][lastAlt].locator[alternation].toString().split(','),
                decisionTaker = altPos.locator[alternation] || altNdxs[0]; //no match in the alternations (length mismatch)
              if (decisionTaker.length > 0) { //no decision taken ~ take first one as decider
                decisionTaker = decisionTaker.split(',')[0];
              }

              for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                if (decisionTaker < altNdxs[mndx]) {
                  var possibilityPos, possibilities;
                  for (var dp = decisionPos; dp >= 0; dp--) {
                    possibilityPos = getMaskSet()["validPositions"][dp];
                    if (possibilityPos != undefined) {
                      possibilities = possibilityPos.locator[alternation]; //store to reset
                      //possibilityPos.alternation = undefined;
                      possibilityPos.locator[alternation] = parseInt(altNdxs[mndx]);
                      break;
                    }
                  }
                  if (decisionTaker != possibilityPos.locator[alternation]) {
                    var validInputs = [],
                      staticInputsBeforePos = 0;
                    for (var i = decisionPos + 1; i < getLastValidPosition() + 1; i++) {
                      var validPos = getMaskSet()["validPositions"][i];
                      if (validPos) {
                        if (validPos.match.fn != null) {
                          validInputs.push(validPos.input);
                        } else if (i < pos) staticInputsBeforePos++;
                      }
                      delete getMaskSet()["validPositions"][i];
                      delete getMaskSet()["tests"][i];
                    }
                    resetMaskSet(true); //clear getbuffer
                    opts.keepStatic = !opts.keepStatic; //disable keepStatic on getMaskLength
                    isValidRslt = true;
                    while (validInputs.length > 0) {
                      var input = validInputs.shift();
                      //console.log(input);
                      if (input != opts.skipOptionalPartCharacter) {
                        if (!(isValidRslt = isValid(getLastValidPosition() + 1, input, false, true))) {
                          break;
                        }
                      }
                    }

                    possibilityPos.alternation = alternation;
                    possibilityPos.locator[alternation] = possibilities; //reset forceddecision ~ needed for proper delete
                    if (isValidRslt) {
                      var targetLvp = getLastValidPosition(pos) + 1;
                      var staticInputsBeforePosAlternate = 0;
                      for (var i = decisionPos + 1; i < getLastValidPosition() + 1; i++) {
                        var validPos = getMaskSet()["validPositions"][i];
                        if (validPos && validPos.match.fn == null && i < pos)
                          staticInputsBeforePosAlternate++;
                      }
                      pos = pos + (staticInputsBeforePosAlternate - staticInputsBeforePos);
                      isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid);
                    }
                    opts.keepStatic = !opts.keepStatic; //enable keepStatic on getMaskLength
                    if (!isValidRslt) {
                      resetMaskSet();
                      getMaskSet()["validPositions"] = $.extend(true, {}, validPsClone);
                    } else
                      return isValidRslt;
                  }
                }
              }
              break;
            }
          }
        }
        return false;
      }

      //set alternator choice on previous skipped placeholder positions
      function trackbackAlternations(originalPos, newPos) {
          var vp = getMaskSet()["validPositions"][newPos],
            targetLocator = vp.locator,
            tll = targetLocator.length;

          for (var ps = originalPos; ps < newPos; ps++) {
            if (!isMask(ps)) {
              var tests = getTests(ps),
                bestMatch = tests[0],
                equality = -1;
              $.each(tests, function(ndx, tst) {
                for (var i = 0; i < tll; i++) {
                  if (tst.locator[i] && checkAlternationMatch(tst.locator[i].toString().split(','), targetLocator[i].toString().split(',')) && equality < i) {
                    equality = i;
                    bestMatch = tst;
                  }
                }
              });
              setValidPosition(ps, $.extend({}, bestMatch, {
                "input": bestMatch["match"].def
              }), true)
            }
          }
        }
        //Check for a nonmask before the pos
      var buffer = getBuffer();
      //find previous valid
      for (var pndx = pos - 1; pndx > -1; pndx--) {
        if (getMaskSet()["validPositions"][pndx])
          break;
      }
      ////fill missing nonmask and valid placeholders
      pndx++;
      for (; pndx < pos; pndx++) {
        //console.log("missing " + pndx + " " + buffer[pndx] + " ismask " + isMask(pndx) + " plchldr " + getPlaceholder(pndx) + " nrt " + getTests(pndx).len);
        if (getMaskSet()["validPositions"][pndx] == undefined && (((!isMask(pndx) || buffer[pndx] != getPlaceholder(pndx)) && getTests(pndx).length > 1) || (buffer[pndx] == opts.radixPoint || buffer[pndx] == "0" && $.inArray(opts.radixPoint, buffer) < pndx))) //special case for decimals ~ = placeholder but yet valid input
        {
          //console.log("inject " + pndx + " " + buffer[pndx]);
          _isValid(pndx, buffer[pndx], true);
        }
      }

      var maskPos = pos,
        result = false,
        positionsClone = $.extend(true, {}, getMaskSet()["validPositions"]); //clone the currentPositions

      //if (fromSetValid && maskPos >= getMaskLength()) {
      //		resetMaskSet(true); //masklenght can be altered on the process => reset to get the actual length
      //}
      if (maskPos < getMaskLength()) {
        result = _isValid(maskPos, c, strict, fromSetValid);
        if ((!strict || fromSetValid) && result === false) {
          var currentPosValid = getMaskSet()["validPositions"][maskPos];
          if (currentPosValid && currentPosValid["match"].fn == null && (currentPosValid["match"].def == c || c == opts.skipOptionalPartCharacter)) {
            result = {
              "caret": seekNext(maskPos)
            };
          } else if ((opts.insertMode || getMaskSet()["validPositions"][seekNext(maskPos)] == undefined) && !isMask(maskPos)) { //does the input match on a further position?
            for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
              result = _isValid(nPos, c, strict, fromSetValid);
              if (result !== false) {
                trackbackAlternations(maskPos, nPos);
                maskPos = nPos;
                break;
              }
            }
          }
        }
      }
      if (result === false && opts.keepStatic && isComplete(buffer)) { //try fuzzy alternator logic
        result = alternate(pos, c, strict, fromSetValid);
      }
      if (result === true) result = {
        "pos": maskPos
      };

      if ($.isFunction(opts.postValidation) && result != false && !strict) {
        resetMaskSet(true);
        var postValidResult = opts.postValidation(getBuffer(), opts);
        if (!postValidResult) {
          resetMaskSet(true);
          getMaskSet()["validPositions"] = $.extend(true, {}, positionsClone); //revert validation changes
          return false;
        }
      }

      return result;
    }

    function isMask(pos) {
      var test = getTest(pos);
      if (test.fn != null)
        return test.fn
      else if (!opts.keepStatic && getMaskSet()["validPositions"][pos] == undefined) {
        var tests = getTests(pos),
          staticAlternations = true;
        for (var i = 0; i < tests.length; i++) {
          if (tests[i].match.def != "" && ( /*tests[i].match.fn !== null || */ (tests[i].alternation == undefined || tests[i].locator[tests[i].alternation].length > 1))) {
            staticAlternations = false;
            break;
          }
        }
        return staticAlternations;
      }

      return false;
    }

    function getMaskLength() {
      var maskLength;
      maxLength = $el.prop('maxLength');
      if (maxLength == -1) maxLength = undefined; /* FF sets no defined max length to -1 */
      var pos, lvp = getLastValidPosition(),
        testPos = getMaskSet()["validPositions"][lvp],
        ndxIntlzr = testPos != undefined ? testPos["locator"].slice() : undefined;
      for (pos = lvp + 1; testPos == undefined || (testPos["match"]["fn"] != null || (testPos["match"]["fn"] == null && testPos["match"]["def"] != "")); pos++) {
        testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
        ndxIntlzr = testPos["locator"].slice();
      }

      var lastTest = getTest(pos - 1);
      maskLength = (lastTest.def != "") ? pos : pos - 1;
      return (maxLength == undefined || maskLength < maxLength) ? maskLength : maxLength;
    }

    function seekNext(pos) {
      var maskL = getMaskLength();
      if (pos >= maskL) return maskL;
      var position = pos;
      while (++position < maskL && !isMask(position) && (opts.nojumps !== true || opts.nojumpsThreshold > position)) {}

      return position;
    }

    function seekPrevious(pos) {
      var position = pos;
      if (position <= 0) return 0;

      while (--position > 0 && !isMask(position)) {};
      return position;
    }

    function getBufferElement(position) {
      return getMaskSet()["validPositions"][position] == undefined ? getPlaceholder(position) : getMaskSet()["validPositions"][position]["input"];
    }

    function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
      if (event && $.isFunction(opts.onBeforeWrite)) {
        var result = opts.onBeforeWrite.call(input, event, buffer, caretPos, opts);
        if (result) {
          if (result["refreshFromBuffer"]) {
            var refresh = result["refreshFromBuffer"];
            refreshFromBuffer(refresh === true ? refresh : refresh["start"], refresh["end"], result["buffer"]);

            resetMaskSet(true);
            buffer = getBuffer();
          }
          caretPos = result.caret || caretPos;
        }
      }
      input._valueSet(buffer.join(''));
      if (caretPos != undefined) {
        caret(input, caretPos);
      }
      if (triggerInputEvent === true) {
        skipInputEvent = true;
        $(input).trigger("input");
      }
    }

    function getPlaceholder(pos, test) {
      test = test || getTest(pos);
      if (test["placeholder"] != undefined)
        return test["placeholder"];
      else if (test["fn"] == null) {
        if (!opts.keepStatic && getMaskSet()["validPositions"][pos] == undefined) {
          var tests = getTests(pos),
            hasAlternations = false,
            prevTest;
          for (var i = 0; i < tests.length; i++) {
            if (prevTest && tests[i].match.def != "" && (tests[i].match.def != prevTest.match.def && (tests[i].alternation == undefined || tests[i].alternation == prevTest.alternation))) {
              hasAlternations = true;
              break;
            }

            if (tests[i].match.optionality != true && tests[i].match.optionalQuantifier != true)
              prevTest = tests[i];
          }

          if (hasAlternations)
            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        return test["def"]
      } else {
        return opts.placeholder.charAt(pos % opts.placeholder.length);
      }
    }

    function checkVal(input, writeOut, strict, nptvl) {
      function isTemplateMatch() {
        var isMatch = false;
        var charCodeNdx = getBufferTemplate().slice(initialNdx, seekNext(initialNdx)).join('').indexOf(charCodes);
        if (charCodeNdx != -1 && !isMask(initialNdx)) {
          isMatch = true;
          var bufferTemplateArr = getBufferTemplate().slice(initialNdx, initialNdx + charCodeNdx);
          for (var i = 0; i < bufferTemplateArr.length; i++) {
            if (bufferTemplateArr[i] != " ") {
              isMatch = false;
              break;
            }
          }
        }

        return isMatch;
      }
      var inputValue = nptvl != undefined ? nptvl.slice() : input._valueGet().split(''),
        charCodes = "",
        initialNdx = 0;
      resetMaskSet();
      getMaskSet()["p"] = seekNext(-1);
      if (writeOut) input._valueSet(""); //initial clear

      if (!strict) {
        var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(''),
          matches = inputValue.join('').match(new RegExp("^" + escapeRegex(staticInput), "g"));
        if (matches && matches.length > 0) {
          inputValue.splice(0, matches.length * staticInput.length);
          initialNdx = seekNext(initialNdx);
        }
      }


      $.each(inputValue, function(ndx, charCode) {
        var keypress = $.Event("keypress");
        keypress.which = charCode.charCodeAt(0);
        charCodes += charCode;
        var lvp = getLastValidPosition(undefined, true),
          lvTest = getMaskSet()["validPositions"][lvp],
          nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : undefined, lvp);
        if (!isTemplateMatch() || strict) {
          var pos = strict ? ndx : (nextTest["match"].fn == null && nextTest["match"].optionality && (lvp + 1) < getMaskSet()["p"] ? lvp + 1 : getMaskSet()["p"]);
          keypressEvent.call(input, keypress, true, false, strict, pos);
          initialNdx = pos + 1;
          charCodes = "";
        } else {
          keypressEvent.call(input, keypress, true, false, true, lvp + 1);
        }

      });
      if (writeOut) {
        writeBuffer(input, getBuffer(), $(input).is(":focus") ? seekNext(getLastValidPosition(0)) : undefined, $.Event("checkval"));
      }
    }

    function escapeRegex(str) {
      return inputmask.escapeRegex(str);
    }

    function unmaskedvalue($input) {
      if ($input[0].inputmask && !$input.hasClass('hasDatepicker')) {
        var umValue = [],
          vps = getMaskSet()["validPositions"];
        for (var pndx in vps) {
          if (vps[pndx]["match"] && vps[pndx]["match"].fn != null) {
            umValue.push(vps[pndx]["input"]);
          }
        }
        var unmaskedValue = (isRTL ? umValue.reverse() : umValue).join('');
        var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join('');
        if ($.isFunction(opts.onUnMask)) {
          unmaskedValue = (opts.onUnMask.call($input, bufferValue, unmaskedValue, opts) || unmaskedValue);
        }
        return unmaskedValue;
      } else {
        return $input[0]._valueGet();
      }
    }

    function TranslatePosition(pos) {
      if (isRTL && typeof pos == 'number' && (!opts.greedy || opts.placeholder != "")) {
        var bffrLght = getBuffer().length;
        pos = bffrLght - pos;
      }
      return pos;
    }

    function caret(input, begin, end) {
      var npt = input.jquery && input.length > 0 ? input[0] : input,
        range;
      if (typeof begin == 'number') {
        begin = TranslatePosition(begin);
        end = TranslatePosition(end);
        end = (typeof end == 'number') ? end : begin;
        if (!$(npt).is(":visible")) {
          return;
        }

        var scrollCalc = $(npt).css("font-size").replace("px", "") * end;
        npt.scrollLeft = scrollCalc > npt.scrollWidth ? scrollCalc : 0;
        if (!androidchrome && opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
        if (npt.setSelectionRange) {
          npt.selectionStart = begin;
          npt.selectionEnd = end;
        } else if (window.getSelection) {
          range = document.createRange();
          if (npt.firstChild == undefined) {
            var textNode = document.createTextNode("");
            npt.appendChild(textNode);
          }
          range.setStart(npt.firstChild, begin < npt._valueGet().length ? begin : npt._valueGet().length);
          range.setEnd(npt.firstChild, end < npt._valueGet().length ? end : npt._valueGet().length);
          range.collapse(true);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          //npt.focus();
        } else if (npt.createTextRange) {
          range = npt.createTextRange();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();

        }
      } else {
        if (npt.setSelectionRange) {
          begin = npt.selectionStart;
          end = npt.selectionEnd;
        } else if (window.getSelection) {
          range = window.getSelection().getRangeAt(0);
          if (range.commonAncestorContainer.parentNode == npt || range.commonAncestorContainer == npt) {
            begin = range.startOffset;
            end = range.endOffset;
          }
        } else if (document.selection && document.selection.createRange) {
          range = document.selection.createRange();
          begin = 0 - range.duplicate().moveStart('character', -100000);
          end = begin + range.text.length;
        }
        return {
          "begin": TranslatePosition(begin),
          "end": TranslatePosition(end)
        };
      }
    }

    function determineLastRequiredPosition(returnDefinition) {
      var buffer = getBuffer(),
        bl = buffer.length,
        pos, lvp = getLastValidPosition(),
        positions = {},
        lvTest = getMaskSet()["validPositions"][lvp],
        ndxIntlzr = lvTest != undefined ? lvTest["locator"].slice() : undefined,
        testPos;
      for (pos = lvp + 1; pos < buffer.length; pos++) {
        testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
        ndxIntlzr = testPos["locator"].slice();
        positions[pos] = $.extend(true, {}, testPos);
      }

      var lvTestAlt = lvTest && lvTest.alternation != undefined ? lvTest["locator"][lvTest.alternation] : undefined;
      for (pos = bl - 1; pos > lvp; pos--) {
        testPos = positions[pos];
        if ((testPos.match.optionality ||
            testPos.match.optionalQuantifier ||
            (lvTestAlt && ((lvTestAlt != positions[pos]["locator"][lvTest.alternation] && testPos.match.fn != null) ||
              (testPos.match.fn == null && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.split(",")) && getTests(pos)[0].def != "")))) && buffer[pos] == getPlaceholder(pos, testPos.match)) {
          bl--;
        } else break;
      }
      return returnDefinition ? {
        "l": bl,
        "def": positions[bl] ? positions[bl]["match"] : undefined
      } : bl;
    }

    function clearOptionalTail(buffer) {
      var rl = determineLastRequiredPosition(),
        lmib = buffer.length - 1;
      for (; lmib > rl; lmib--) {
        if (isMask(lmib)) break; //fixme ismask is not good enough
      }
      buffer.splice(rl, lmib + 1 - rl);

      return buffer
    }

    function isComplete(buffer) { //return true / false / undefined (repeat *)
      if ($.isFunction(opts.isComplete)) return opts.isComplete.call($el, buffer, opts);
      if (opts.repeat == "*") return undefined;
      var complete = false,
        lrp = determineLastRequiredPosition(true),
        aml = seekPrevious(lrp["l"]),
        lvp = getLastValidPosition();

      if (lrp["def"] == undefined || lrp["def"].newBlockMarker || lrp["def"].optionality || lrp["def"].optionalQuantifier) {
        complete = true;
        for (var i = 0; i <= aml; i++) {
          var test = getTestTemplate(i).match;
          if ((test.fn != null && getMaskSet()["validPositions"][i] == undefined && test.optionality !== true && test.optionalQuantifier !== true) || (test.fn == null && buffer[i] != getPlaceholder(i, test))) {
            complete = false;
            break;
          }
        }
      }
      return complete;
    }

    function isSelection(begin, end) {
      return isRTL ? (begin - end) > 1 || ((begin - end) == 1 && opts.insertMode) :
        (end - begin) > 1 || ((end - begin) == 1 && opts.insertMode);
    }

    function installEventRuler(npt) {
      var events = $._data(npt).events,
        inComposition = false;

      $.each(events, function(eventType, eventHandlers) {
        $.each(eventHandlers, function(ndx, eventHandler) {
          if (eventHandler.namespace == "inputmask") {
            if (eventHandler.type != "setvalue") {
              var handler = eventHandler.handler;
              eventHandler.handler = function(e) {
                // console.log("triggered " + e.type);
                if (this.disabled || (this.readOnly && !(e.type == "keydown" && (e.ctrlKey && e.keyCode == 67) || e.keyCode == inputmask.keyCode.TAB)))
                  e.preventDefault();
                else {
                  switch (e.type) {
                    case "input":
                      if (skipInputEvent === true || inComposition === true) {
                        skipInputEvent = false;
                        return e.preventDefault();
                      }
                      break;
                    case "keydown":
                      //Safari 5.1.x - modal dialog fires keypress twice workaround
                      skipKeyPressEvent = false;
                      inComposition = false;
                      break;
                    case "keypress":
                      if (skipKeyPressEvent === true)
                        return e.preventDefault();
                      skipKeyPressEvent = true;

                      break;
                    case "compositionstart":
                      inComposition = true;
                      break;
                    case "compositionupdate":
                      skipInputEvent = true;
                      break;
                    case "compositionend":
                      inComposition = false;
                      break;
                  }
                  //console.log("executed " + e.type);
                  return handler.apply(this, arguments);
                }
              };
            }
          }
        });
      });
    }

    function patchValueProperty(npt) {
      var valueGet;
      var valueSet;

      function PatchValhook(type) {
        if ($.valHooks[type] == undefined || $.valHooks[type].inputmaskpatch != true) {
          var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
            return elem.value;
          };
          var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
            elem.value = value;
            return elem;
          };

          $.valHooks[type] = {
            get: function(elem) {
              var $elem = $(elem);
              if (elem.inputmask) {
                if (elem.inputmask.opts.autoUnmask)
                  return elem.inputmask.unmaskedvalue();
                else {
                  var result = valhookGet(elem),
                    maskset = elem.inputmask.maskset,
                    bufferTemplate = maskset['_buffer'];
                  bufferTemplate = bufferTemplate ? bufferTemplate.join('') : '';
                  return result != bufferTemplate ? result : '';
                }
              } else return valhookGet(elem);
            },
            set: function(elem, value) {
              var $elem = $(elem),
                result;
              result = valhookSet(elem, value);
              if (elem.inputmask)
                $elem.triggerHandler('setvalue.inputmask');
              return result;
            },
            inputmaskpatch: true
          };
        }
      }

      function getter() {
        var $self = $(this);
        if (this.inputmask) {
          return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : (valueGet.call(this) != getBufferTemplate().join('') ? valueGet.call(this) : '');
        } else return valueGet.call(this);
      }

      function setter(value) {
        valueSet.call(this, value);
        if (this.inputmask)
          $(this).triggerHandler('setvalue.inputmask');
      }

      function InstallNativeValueSetFallback(npt) {
        $(npt).bind("mouseenter.inputmask", function(event) {
          var $input = $(this),
            input = this,
            value = input._valueGet();
          if (value != "" && value != getBuffer().join(''))
            $input.triggerHandler('setvalue.inputmask');
        });
        //!! the bound handlers are executed in the order they where bound
        //reorder the events - the mouseenter event is internally mapped to the mouseover event
        var events = $._data(npt).events;
        var handlers = events["mouseover"];
        if (handlers) {
          var ourHandler = handlers[handlers.length - 1];
          for (var i = handlers.length - 1; i > 0; i--) {
            handlers[i] = handlers[i - 1];
          }
          handlers[0] = ourHandler;
        }
      }

      if (!npt._valueGet) {
        var valueProperty;
        if (Object.getOwnPropertyDescriptor && npt.value == undefined) { // && npt.isContentEditable) {
          valueGet = function() {
            return this.textContent;
          }
          valueSet = function(value) {
            this.textContent = value;
          }

          Object.defineProperty(npt, "value", {
            get: getter,
            set: setter
          });
        } else if ((valueProperty = (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(npt, "value"))) && valueProperty.configurable && false) { //experimental for chrome
          npt._value = valueProperty.value;
          valueGet = function() {
            return this._value || "";
          }
          valueSet = function(value) {
            this._value = value;
            this.select();
            this.setRangeText(value);
            this.selectionStart = this.selectionEnd;
          }

          Object.defineProperty(npt, "value", {
            get: getter,
            set: setter
          });
        } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
          valueGet = npt.__lookupGetter__("value");
          valueSet = npt.__lookupSetter__("value");

          npt.__defineGetter__("value", getter);
          npt.__defineSetter__("value", setter);
        } else { //jquery.val
          valueGet = function() {
            return npt.value;
          }
          valueSet = function(value) {
            npt.value = value;
          }
          PatchValhook(npt.type);
          InstallNativeValueSetFallback(npt);
        }
        npt._valueGet = function(overruleRTL) {
          return isRTL && overruleRTL !== true ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
        };
        npt._valueSet = function(value) {
          valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
        };
      }
    }

    function handleRemove(input, k, pos, strict) {
        function generalize() {
          if (opts.keepStatic) {
            resetMaskSet(true);
            var validInputs = [],
              lastAlt, positionsClone = $.extend(true, {}, getMaskSet()["validPositions"]);
            //find last alternation
            for (lastAlt = getLastValidPosition(); lastAlt >= 0; lastAlt--) {
              var validPos = getMaskSet()["validPositions"][lastAlt];
              if (validPos) {
                if (validPos.match.fn != null)
                  validInputs.push(validPos.input);
                delete getMaskSet()["validPositions"][lastAlt];
                if (validPos.alternation != undefined && validPos.locator[validPos.alternation] == getTestTemplate(lastAlt).locator[validPos.alternation]) {
                  break;
                }
              }
            }

            if (lastAlt > -1) {
              while (validInputs.length > 0) {
                getMaskSet()["p"] = seekNext(getLastValidPosition());
                var keypress = $.Event("keypress");
                keypress.which = validInputs.pop().charCodeAt(0);
                keypressEvent.call(input, keypress, true, false, false, getMaskSet()["p"]);
              }
            } else {
              //restore original positions
              getMaskSet()["validPositions"] = $.extend(true, {}, positionsClone);
            }
          }
        }

        if (opts.numericInput || isRTL) {
          if (k == inputmask.keyCode.BACKSPACE)
            k = inputmask.keyCode.DELETE;
          else if (k == inputmask.keyCode.DELETE)
            k = inputmask.keyCode.BACKSPACE;

          if (isRTL) {
            var pend = pos.end;
            pos.end = pos.begin;
            pos.begin = pend;
          }
        }

        if (k == inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || opts.insertMode == false)) {
          pos.begin = seekPrevious(pos.begin);
          if (getMaskSet()["validPositions"][pos.begin] != undefined && (getMaskSet()["validPositions"][pos.begin].input == opts.groupSeparator || getMaskSet()["validPositions"][pos.begin].input == opts.radixPoint)) {
            pos.begin--;
          }
        } else if (k == inputmask.keyCode.DELETE && pos.begin == pos.end) {
          pos.end = isMask(pos.end) ? pos.end + 1 : seekNext(pos.end) + 1;
          if (getMaskSet()["validPositions"][pos.begin] != undefined && (getMaskSet()["validPositions"][pos.begin].input == opts.groupSeparator || getMaskSet()["validPositions"][pos.begin].input == opts.radixPoint)) {
            pos.end++;
          }
        }

        stripValidPositions(pos.begin, pos.end, false, strict);
        if (strict !== true) {
          generalize(); //revert the alternation

          var lvp = getLastValidPosition(pos.begin);
          if (lvp < pos.begin) {
            if (lvp == -1) resetMaskSet();
            getMaskSet()["p"] = seekNext(lvp);
          } else {
            getMaskSet()["p"] = pos.begin;
          }
        }
      }
      //postprocessing of the validpositions according to the buffer manipulations
    function handleOnKeyResult(input, keyResult, caretPos) {
      if (keyResult && keyResult["refreshFromBuffer"]) {
        var refresh = keyResult["refreshFromBuffer"];
        refreshFromBuffer(refresh === true ? refresh : refresh["start"], refresh["end"], keyResult["buffer"]);

        resetMaskSet(true);
        if (caretPos != undefined) {
          writeBuffer(input, getBuffer());
          caret(input, keyResult.caret || caretPos.begin, keyResult.caret || caretPos.end);
        }
      }
    }

    function keydownEvent(e) {
      var input = this,
        $input = $(input),
        k = e.keyCode,
        pos = caret(input);

      //backspace, delete, and escape get special treatment
      if (k == inputmask.keyCode.BACKSPACE || k == inputmask.keyCode.DELETE || (iphone && k == 127) || (e.ctrlKey && k == 88 && !isInputEventSupported("cut"))) { //backspace/delete
        e.preventDefault(); //stop default action but allow propagation
        if (k == 88) undoValue = getBuffer().join('');
        handleRemove(input, k, pos);
        writeBuffer(input, getBuffer(), getMaskSet()["p"], e, undoValue != getBuffer().join(''));
        if (input._valueGet() == getBufferTemplate().join(''))
          $input.trigger('cleared');
        else if (isComplete(getBuffer()) === true)
          $input.trigger("complete");
        if (opts.showTooltip) { //update tooltip
          $input.prop("title", getMaskSet()["mask"]);
        }
      } else if (k == inputmask.keyCode.END || k == inputmask.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
        setTimeout(function() {
          var caretPos = seekNext(getLastValidPosition());
          if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
          caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
        }, 0);
      } else if ((k == inputmask.keyCode.HOME && !e.shiftKey) || k == inputmask.keyCode.PAGE_UP) { //Home or page_up
        caret(input, 0, e.shiftKey ? pos.begin : 0);
      } else if (((opts.undoOnEscape && k == inputmask.keyCode.ESCAPE) || (k == 90 && e.ctrlKey)) && e.altKey !== true) { //escape && undo && #762
        checkVal(input, true, false, undoValue.split(''));
        $input.click();
      } else if (k == inputmask.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
        opts.insertMode = !opts.insertMode;
        caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
      } else if (opts.insertMode == false && !e.shiftKey) {
        if (k == inputmask.keyCode.RIGHT) {
          setTimeout(function() {
            var caretPos = caret(input);
            caret(input, caretPos.begin);
          }, 0);
        } else if (k == inputmask.keyCode.LEFT) {
          setTimeout(function() {
            var caretPos = caret(input);
            caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
          }, 0);
        }
      }
      opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts);
      ignorable = $.inArray(k, opts.ignorables) != -1;
    }

    function keypressEvent(e, checkval, writeOut, strict, ndx) {
      var input = this,
        $input = $(input),
        k = e.which || e.charCode || e.keyCode;

      if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
        return true;
      } else {
        if (k) {
          //special treat the decimal separator
          if (k == 46 && e.shiftKey == false && opts.radixPoint == ",") k = 44;
          var pos = checkval ? {
              begin: ndx,
              end: ndx
            } : caret(input),
            forwardPosition, c = String.fromCharCode(k);

          //should we clear a possible selection??
          var isSlctn = isSelection(pos.begin, pos.end);
          if (isSlctn) {
            getMaskSet()["undoPositions"] = $.extend(true, {}, getMaskSet()["validPositions"]); //init undobuffer for recovery when not valid
            handleRemove(input, inputmask.keyCode.DELETE, pos, true);
            pos.begin = getMaskSet()["p"];
            if (!opts.insertMode) { //preserve some space
              opts.insertMode = !opts.insertMode;
              setValidPosition(pos.begin, strict);
              opts.insertMode = !opts.insertMode;
            }
            isSlctn = !opts.multi;
          }

          getMaskSet()["writeOutBuffer"] = true;
          var p = isRTL && !isSlctn ? pos.end : pos.begin;
          var valResult = isValid(p, c, strict);
          if (valResult !== false) {
            if (valResult !== true) {
              p = valResult.pos != undefined ? valResult.pos : p; //set new position from isValid
              c = valResult.c != undefined ? valResult.c : c; //set new char from isValid
            }
            resetMaskSet(true);
            if (valResult.caret != undefined)
              forwardPosition = valResult.caret;
            else {
              var vps = getMaskSet()["validPositions"];
              if (!opts.keepStatic && (vps[p + 1] != undefined && getTests(p + 1, vps[p].locator.slice(), p).length > 1 || vps[p].alternation != undefined))
                forwardPosition = p + 1;
              else
                forwardPosition = seekNext(p);
            }
            getMaskSet()["p"] = forwardPosition; //needed for checkval
          }

          if (writeOut !== false) {
            var self = this;
            setTimeout(function() {
              opts.onKeyValidation.call(self, valResult, opts);
            }, 0);
            if (getMaskSet()["writeOutBuffer"] && valResult !== false) {
              var buffer = getBuffer();
              writeBuffer(input, buffer, checkval ? undefined : opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition, e, checkval !== true);
              if (checkval !== true) {
                setTimeout(function() { //timeout needed for IE
                  if (isComplete(buffer) === true)
                    $input.trigger("complete");
                }, 0);
              }
            } else if (isSlctn) {
              getMaskSet()["buffer"] = undefined;
              getMaskSet()["validPositions"] = getMaskSet()["undoPositions"];
            }
          } else if (isSlctn) {
            getMaskSet()["buffer"] = undefined;
            getMaskSet()["validPositions"] = getMaskSet()["undoPositions"];
          }

          if (opts.showTooltip) { //update tooltip
            $input.prop("title", getMaskSet()["mask"]);
          }

          if (checkval && $.isFunction(opts.onBeforeWrite)) {
            var result = opts.onBeforeWrite.call(this, e, getBuffer(), forwardPosition, opts);
            if (result && result["refreshFromBuffer"]) {
              var refresh = result["refreshFromBuffer"];
              refreshFromBuffer(refresh === true ? refresh : refresh["start"], refresh["end"], result["buffer"]);

              resetMaskSet(true);
              if (result.caret) {
                getMaskSet()["p"] = result.caret;
              }
            }
          }
          e.preventDefault();
        }
      }
    }

    function pasteEvent(e) {
      var input = this,
        $input = $(input),
        inputValue = input._valueGet(true),
        caretPos = caret(input);
      //paste event for IE8 and lower I guess ;-)
      if (e.type == "propertychange" && input._valueGet().length <= getMaskLength()) {
        return true;
      } else if (e.type == "paste") {
        var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
          valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);

        if (valueBeforeCaret == getBufferTemplate().slice(0, caretPos.begin).join('')) valueBeforeCaret = "";
        if (valueAfterCaret == getBufferTemplate().slice(caretPos.end).join('')) valueAfterCaret = "";

        if (window.clipboardData && window.clipboardData.getData) { // IE
          inputValue = valueBeforeCaret + window.clipboardData.getData('Text') + valueAfterCaret;
        } else if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
          inputValue = valueBeforeCaret + e.originalEvent.clipboardData.getData('text/plain') + valueAfterCaret;
        }
      }

      var pasteValue = inputValue;
      if ($.isFunction(opts.onBeforePaste)) {
        pasteValue = opts.onBeforePaste.call(input, inputValue, opts);
        if (pasteValue === false) {
          e.preventDefault();
          return false;
        }
        if (!pasteValue)
          pasteValue = inputValue;
      }
      checkVal(input, false, false, isRTL ? pasteValue.split('').reverse() : pasteValue.split(''));
      writeBuffer(input, getBuffer(), undefined, e, true);
      $input.click();
      if (isComplete(getBuffer()) === true)
        $input.trigger("complete");

      return false;
    }

    function inputFallBackEvent(e) { //fallback when keypress & compositionevents fail
      var input = this;
      checkVal(input, true, false);

      if (isComplete(getBuffer()) === true)
        $(input).trigger("complete");

      e.preventDefault();
    }

    function compositionStartEvent(e) {
      var input = this;
      undoValue = getBuffer().join('');
      if (compositionData == "" || e.originalEvent.data.indexOf(compositionData) != 0) {
        compositionCaretPos = caret(input);
      }
    }

    function compositionUpdateEvent(e) {
      var input = this,
        caretPos = caret(input);
      if (e.originalEvent.data.indexOf(compositionData) == 0) {
        resetMaskSet();
        caretPos = compositionCaretPos;
      }
      var newData = e.originalEvent.data;
      caret(input, caretPos.begin, caretPos.end);
      for (var i = 0; i < newData.length; i++) {
        var keypress = $.Event("keypress");
        keypress.which = newData.charCodeAt(i);
        skipKeyPressEvent = false;
        ignorable = false;
        keypressEvent.call(input, keypress); //needs update
      }
      setTimeout(function() {
        var forwardPosition = getMaskSet()["p"];
        writeBuffer(input, getBuffer(), opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition);
      }, 0);
      compositionData = e.originalEvent.data;
    }

    function compositionEndEvent(e) {
      //pickup by inputfallback
    }

    function mask(el) {
      $el = $(el);

      //show tooltip
      if (opts.showTooltip) {
        $el.prop("title", getMaskSet()["mask"]);
      }

      if (el.dir == "rtl" || opts.rightAlign)
        $el.css("text-align", "right");

      if (el.dir == "rtl" || opts.numericInput) {
        el.dir = "ltr";
        $el.removeAttr("dir");
        el.inputmask.isRTL = true;
        isRTL = true;
      }

      //unbind all events - to make sure that no other mask will interfere when re-masking
      $el.unbind(".inputmask");

      if (($el.is(":input") && isInputTypeSupported($el.attr("type"))) || el.isContentEditable) {
        //bind events
        $el.closest('form').bind("submit", function(e) { //trigger change on submit if any
          if (undoValue != getBuffer().join('')) {
            $el.change();
          }
          if (opts.clearMaskOnLostFocus && $el[0]._valueGet && $el[0]._valueGet() == getBufferTemplate().join('')) {
            $el[0]._valueSet(''); //clear masktemplete on submit and still has focus
          }
          if (opts.removeMaskOnSubmit) {
            $el.inputmask("remove");
          }
        }).bind('reset', function() {
          setTimeout(function() {
            $el.triggerHandler('setvalue.inputmask');
          }, 0);
        });
        $el.bind("mouseenter.inputmask", function() {
          var $input = $(this),
            input = this;
          mouseEnter = true;
          if (!$input.is(":focus") && opts.showMaskOnHover) {
            if (input._valueGet() != getBuffer().join('')) {
              writeBuffer(input, getBuffer());
            }
          }
        }).bind("blur.inputmask", function(e) {
          var $input = $(this),
            input = this;
          if (input.inputmask) {
            var nptValue = input._valueGet(),
              buffer = getBuffer().slice();
            firstClick = true;
            if (undoValue != buffer.join('')) {
              setTimeout(function() { //change event should be triggered after the other buffer manipulations on blur
                $input.change();
                undoValue = buffer.join('');
              }, 0);
            }
            if (nptValue != '') {
              if (opts.clearMaskOnLostFocus) {
                if (nptValue == getBufferTemplate().join(''))
                  buffer = [];
                else { //clearout optional tail of the mask
                  clearOptionalTail(buffer);
                }
              }
              if (isComplete(buffer) === false) {
                $input.trigger("incomplete");
                if (opts.clearIncomplete) {
                  resetMaskSet();
                  if (opts.clearMaskOnLostFocus)
                    buffer = [];
                  else {
                    buffer = getBufferTemplate().slice();

                  }
                }
              }

              writeBuffer(input, buffer, undefined, e);
            }
          }
        }).bind("focus.inputmask", function(e) {
          var $input = $(this),
            input = this,
            nptValue = input._valueGet();
          if (opts.showMaskOnFocus && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
            if (input._valueGet() != getBuffer().join('')) {
              writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
            }
          } else if (mouseEnter === false) { //only executed on focus without mouseenter
            caret(input, seekNext(getLastValidPosition()));
          }
          undoValue = getBuffer().join('');
        }).bind("mouseleave.inputmask", function() {
          var $input = $(this),
            input = this;
          mouseEnter = false;
          if (opts.clearMaskOnLostFocus) {
            var buffer = getBuffer().slice(),
              nptValue = input._valueGet();
            if (!$input.is(":focus") && nptValue != $input.attr("placeholder") && nptValue != '') {
              if (nptValue == getBufferTemplate().join(''))
                buffer = [];
              else { //clearout optional tail of the mask
                clearOptionalTail(buffer);
              }
              writeBuffer(input, buffer);
            }
          }
        }).bind("click.inputmask", function() {
          var $input = $(this),
            input = this;
          if ($input.is(":focus")) {
            var selectedCaret = caret(input);
            if (selectedCaret.begin == selectedCaret.end) {
              if (opts.radixFocus && opts.radixPoint != "" && $.inArray(opts.radixPoint, getBuffer()) != -1 && (firstClick || getBuffer().join('') == getBufferTemplate().join(''))) {
                caret(input, $.inArray(opts.radixPoint, getBuffer()));
                firstClick = false;
              } else {
                var clickPosition = TranslatePosition(selectedCaret.begin),
                  lastPosition = seekNext(getLastValidPosition(clickPosition));

                if (clickPosition < lastPosition) {
                  caret(input, isMask(clickPosition) ? clickPosition : seekNext(clickPosition));
                } else {
                  caret(input, lastPosition);
                }
              }
            }
          }
        }).bind('dblclick.inputmask', function() {
          var input = this;
          setTimeout(function() {
            caret(input, 0, seekNext(getLastValidPosition()));
          }, 0);
        }).bind(PasteEventType + ".inputmask dragdrop.inputmask drop.inputmask", pasteEvent).bind('cut.inputmask', function(e) {
          skipInputEvent = true; //stop inputFallback
          var input = this,
            $input = $(input),
            pos = caret(input);

          handleRemove(input, inputmask.keyCode.DELETE, pos);
          writeBuffer(input, getBuffer(), getMaskSet()["p"], e, undoValue != getBuffer().join(''));

          if (input._valueGet() == getBufferTemplate().join(''))
            $input.trigger('cleared');

          if (opts.showTooltip) { //update tooltip
            $input.prop("title", getMaskSet()["mask"]);
          }
        }).bind('complete.inputmask', opts.oncomplete).bind('incomplete.inputmask', opts.onincomplete).bind('cleared.inputmask', opts.oncleared);

        $el.bind("keydown.inputmask", keydownEvent).bind("keypress.inputmask", keypressEvent);

        if (!androidfirefox) {
          $el.bind("compositionstart.inputmask", compositionStartEvent).bind("compositionupdate.inputmask", compositionUpdateEvent).bind("compositionend.inputmask", compositionEndEvent);
        }

        if (PasteEventType === "paste") {
          $el.bind("input.inputmask", inputFallBackEvent);
        }

        //if (android || androidfirefox || androidchrome || kindle) {
        //		$el.unbind("input.inputmask");
        //		$el.bind("input.inputmask", mobileInputEvent);
        //}
      }

      $el.bind('setvalue.inputmask', function() {
        var input = this,
          value = input._valueGet();
        input._valueSet($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(input, value, opts) || value) : value);
        checkVal(input, true, false);
        undoValue = getBuffer().join('');
        if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input._valueGet() == getBufferTemplate().join(''))
          input._valueSet('');
      });

      patchValueProperty(el);

      //apply mask
      var initialValue = $.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(el, el._valueGet(), opts) || el._valueGet()) : el._valueGet();
      checkVal(el, true, false, initialValue.split(''));
      var buffer = getBuffer().slice();
      undoValue = buffer.join('');
      // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
      var activeElement;
      try {
        activeElement = document.activeElement;
      } catch (e) {}
      if (isComplete(buffer) === false) {
        if (opts.clearIncomplete)
          resetMaskSet();
      }
      if (opts.clearMaskOnLostFocus) {
        if (buffer.join('') == getBufferTemplate().join('')) {
          buffer = [];
        } else {
          clearOptionalTail(buffer);
        }
      }
      writeBuffer(el, buffer);
      if (activeElement === el) { //position the caret when in focus
        caret(el, seekNext(getLastValidPosition()));
      }

      installEventRuler(el);
    }

    //action object
    if (actionObj != undefined) {
      switch (actionObj["action"]) {
        case "isComplete":
          el = actionObj["el"]
          $el = $(el);
          maskset = el.inputmask.maskset;
          opts = el.inputmask.opts;
          return isComplete(actionObj["buffer"]);
        case "unmaskedvalue":
          el = actionObj["el"]
          $el = $(el);
          maskset = el.inputmask.maskset;
          opts = el.inputmask.opts;
          isRTL = el.inputmask.isRTL;
          return unmaskedvalue($el);
        case "mask":
          undoValue = getBuffer().join('');
          mask(actionObj["el"]);
          break;
        case "format":
          $el = $({});
          //store inputmask instance on the input with element reference
          $el[0].inputmask = new inputmask();
          $el[0].inputmask.opts = opts;
          $el[0].inputmask.el = $el[0];
          $el[0].inputmask.maskset = maskset;
          $el[0].inputmask.isRTL = opts.numericInput;

          if (opts.numericInput) {
            isRTL = true;
          }
          var valueBuffer = ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call($el, actionObj["value"], opts) || actionObj["value"]) : actionObj["value"]).split('');
          checkVal($el, false, false, isRTL ? valueBuffer.reverse() : valueBuffer);
          $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(this, undefined, getBuffer(), 0, opts);

          if (actionObj["metadata"]) {
            return {
              value: isRTL ? getBuffer().slice().reverse().join('') : getBuffer().join(''),
              metadata: $el.inputmask("getmetadata")
            }
          }

          return isRTL ? getBuffer().slice().reverse().join('') : getBuffer().join('');
        case "isValid":
          $el = $({});
          //store inputmask instance on the input with element reference
          $el[0].inputmask = new inputmask();
          $el[0].inputmask.opts = opts;
          $el[0].inputmask.el = $el[0];
          $el[0].inputmask.maskset = maskset;
          $el[0].inputmask.isRTL = opts.numericInput;

          if (opts.numericInput) {
            isRTL = true;
          }
          var valueBuffer = actionObj["value"].split('');
          checkVal($el, false, true, isRTL ? valueBuffer.reverse() : valueBuffer);
          var buffer = getBuffer();
          var rl = determineLastRequiredPosition(),
            lmib = buffer.length - 1;
          for (; lmib > rl; lmib--) {
            if (isMask(lmib)) break;
          }
          buffer.splice(rl, lmib + 1 - rl);

          return isComplete(buffer) && actionObj["value"] == buffer.join('');
        case "getemptymask":
          el = actionObj["el"]
          $el = $(el);
          maskset = el.inputmask.maskset;
          opts = el.inputmask.opts;
          return getBufferTemplate();
        case "remove":
          el = actionObj["el"]
          $el = $(el);
          maskset = el.inputmask.maskset;
          opts = el.inputmask.opts;
          //writeout the unmaskedvalue
          el._valueSet(unmaskedvalue($el));
          //unbind all events
          $el.unbind(".inputmask");
          //clear data
          el.inputmask = undefined;
          //restore the value property
          var valueProperty;
          if (Object.getOwnPropertyDescriptor)
            valueProperty = Object.getOwnPropertyDescriptor(el, "value");
          if (valueProperty && valueProperty.get) {
            if (el._valueGet) {
              Object.defineProperty(el, "value", {
                get: el._valueGet,
                set: el._valueSet
              });
            }
          } else if (document.__lookupGetter__ && el.__lookupGetter__("value")) {
            if (el._valueGet) {
              el.__defineGetter__("value", el._valueGet);
              el.__defineSetter__("value", el._valueSet);
            }
          }
          try { //try catch needed for IE7 as it does not supports deleting fns
            delete el._valueGet;
            delete el._valueSet;
          } catch (e) {
            el._valueGet = undefined;
            el._valueSet = undefined;

          }
          break;
        case "getmetadata":
          el = actionObj["el"]
          $el = $(el);
          maskset = el.inputmask.maskset;
          opts = el.inputmask.opts;
          if ($.isArray(maskset["metadata"])) {
            //find last alternation
            var alternation, lvp = getLastValidPosition();
            for (var firstAlt = lvp; firstAlt >= 0; firstAlt--) {
              if (getMaskSet()["validPositions"][firstAlt] && getMaskSet()["validPositions"][firstAlt].alternation != undefined) {
                alternation = getMaskSet()["validPositions"][firstAlt].alternation;
                break;
              }
            }
            if (alternation != undefined) {
              return maskset["metadata"][getMaskSet()["validPositions"][lvp].locator[alternation]];
            } else return maskset["metadata"][0];
          }

          return maskset["metadata"];
      }
    }
  }

  //make inputmask available
  window.inputmask = inputmask;
  return inputmask;
})(jQuery);
