/*!
 * dist/inputmask
 * <%= pkg.homepage %>
 * Copyright (c) 2010 - <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>
 * Licensed under the <%= pkg.license %> license
 * Version: <%= pkg.version %>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(8);

__webpack_require__(9);

module.exports = __webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
var Inputmask = __webpack_require__(2); //extra definitions


Inputmask.extendDefinitions({
  "A": {
    validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
    casing: "upper" //auto uppercasing

  },
  "&": {
    //alfanumeric uppercasing
    validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
    casing: "upper"
  },
  "#": {
    //hexadecimal
    validator: "[0-9A-Fa-f]",
    casing: "upper"
  }
});
var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");

function ipValidator(chrs, maskset, pos, strict, opts) {
  if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
    chrs = maskset.buffer[pos - 1] + chrs;

    if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
      chrs = maskset.buffer[pos - 2] + chrs;
    } else chrs = "0" + chrs;
  } else chrs = "00" + chrs;

  return ipValidatorRegex.test(chrs);
}

Inputmask.extendAliases({
  "cssunit": {
    regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
  },
  "url": {
    //needs update => https://en.wikipedia.org/wiki/URL
    regex: "(https?|ftp)//.*",
    autoUnmask: false
  },
  "ip": {
    //ip-address mask
    mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
    definitions: {
      "i": {
        validator: ipValidator
      },
      "j": {
        validator: ipValidator
      },
      "k": {
        validator: ipValidator
      },
      "l": {
        validator: ipValidator
      }
    },
    onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
      return maskedValue;
    },
    inputmode: "numeric"
  },
  "email": {
    //https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
    //https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
    //should be extended with the toplevel domains at the end
    mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
    greedy: false,
    casing: "lower",
    onBeforePaste: function onBeforePaste(pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace("mailto:", "");
    },
    definitions: {
      "*": {
        validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5!#$%&'*+/=?^_`{|}~-]"
      },
      "-": {
        validator: "[0-9A-Za-z-]"
      }
    },
    onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
      return maskedValue;
    },
    inputmode: "email"
  },
  "mac": {
    mask: "##:##:##:##:##:##"
  },
  //https://en.wikipedia.org/wiki/Vehicle_identification_number
  // see issue #1199
  "vin": {
    mask: "V{13}9{4}",
    definitions: {
      "V": {
        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
        casing: "upper"
      }
    },
    clearIncomplete: true,
    autoUnmask: true
  }
});
module.exports = Inputmask;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */
var $ = __webpack_require__(3),
    window = __webpack_require__(4),
    document = window.document,
    generateMaskSet = __webpack_require__(5).generateMaskSet,
    analyseMask = __webpack_require__(5).analyseMask,
    maskScope = __webpack_require__(6);

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
      if (alias) options.alias = alias;
    }

    this.opts = $.extend(true, {}, this.defaults, options);
    this.noMasksCache = options && options.definitions !== undefined;
    this.userOptions = options || {}; //user passed options

    resolveAlias(this.opts.alias, options, this.opts);
    this.isRTL = this.opts.numericInput;
  }
}

Inputmask.prototype = {
  dataAttribute: "data-inputmask",
  //data attribute prefix used for attribute binding
  //options default
  defaults: {
    placeholder: "_",
    optionalmarker: ["[", "]"],
    quantifiermarker: ["{", "}"],
    groupmarker: ["(", ")"],
    alternatormarker: "|",
    escapeChar: "\\",
    mask: null,
    //needs tobe null instead of undefined as the extend method does not consider props with the undefined value
    regex: null,
    //regular expression as a mask
    oncomplete: $.noop,
    //executes when the mask is complete
    onincomplete: $.noop,
    //executes when the mask is incomplete and focus is lost
    oncleared: $.noop,
    //executes when the mask is cleared
    repeat: 0,
    //repetitions of the mask: * ~ forever, otherwise specify an integer
    greedy: false,
    //true: allocated buffer for the mask and repetitions - false: allocate only if needed
    autoUnmask: false,
    //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
    removeMaskOnSubmit: false,
    //remove the mask before submitting the form.
    clearMaskOnLostFocus: true,
    insertMode: true,
    //insert the input or overwrite the input
    clearIncomplete: false,
    //clear the incomplete input on blur
    alias: null,
    onKeyDown: $.noop,
    //callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
    onBeforeMask: null,
    //executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
    onBeforePaste: function onBeforePaste(pastedValue, opts) {
      return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
    },
    //executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
    onBeforeWrite: null,
    //executes before writing to the masked element. args => event, opts
    onUnMask: null,
    //executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
    showMaskOnFocus: true,
    //show the mask-placeholder when the input has focus
    showMaskOnHover: true,
    //show the mask-placeholder when hovering the empty input
    onKeyValidation: $.noop,
    //executes on every key-press with the result of isValid. Params: key, result, opts
    skipOptionalPartCharacter: " ",
    //a character which can be used to skip an optional part of a mask
    numericInput: false,
    //numericInput input direction style (input shifts to the left while holding the caret position)
    rightAlign: false,
    //align to the right
    undoOnEscape: true,
    //pressing escape reverts the value to the value before focus
    //numeric basic properties
    radixPoint: "",
    //".", // | ","
    _radixDance: false,
    //dance around the radixPoint
    groupSeparator: "",
    //",", // | "."
    //numeric basic properties
    keepStatic: null,
    //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible - null see auto selection for multi masks
    positionCaretOnTab: true,
    //when enabled the caret position is set after the latest valid position on TAB
    tabThrough: false,
    //allows for tabbing through the different parts of the masked field
    supportsInputType: ["text", "tel", "url", "password", "search"],
    //list with the supported input types
    //specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
    ignorables: [8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
    isComplete: null,
    //override for isComplete - args => buffer, opts - return true || false
    preValidation: null,
    //hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts, maskset, caretPos, strict => return true/false/command object
    postValidation: null,
    //hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, currentResult, opts, maskset, strict => return true/false/json
    staticDefinitionSymbol: undefined,
    //specify a definitionSymbol for static content, used to make matches for alternators
    jitMasking: false,
    //just in time masking ~ only mask while typing, can n (number), true or false
    nullable: true,
    //return nothing instead of the buffertemplate when the user hasn't entered anything.
    inputEventOnly: false,
    //dev option - testing inputfallback behavior
    noValuePatching: false,
    //disable value property patching
    positionCaretOnClick: "lvp",
    //none, lvp (based on the last valid position (default), radixFocus (position caret to radixpoint on initial click), select (select the whole input), ignore (ignore the click and continue the mask)
    casing: null,
    //mask-level casing. Options: null, "upper", "lower" or "title" or callback args => elem, test, pos, validPositions return charValue
    inputmode: "verbatim",
    //specify the inputmode
    importDataAttributes: true,
    //import data-inputmask attributes
    shiftPositions: true //shift position of the mask entries on entry and deletion.

  },
  definitions: {
    "9": {
      //\uFF11-\uFF19 #1606
      validator: "[0-9\uFF11-\uFF19]",
      definitionSymbol: "*"
    },
    "a": {
      //\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5 #76
      validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
      definitionSymbol: "*"
    },
    "*": {
      validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]"
    }
  },
  aliases: {},
  //aliases definitions
  masksCache: {},
  mask: function mask(elems) {
    var that = this;

    if (typeof elems === "string") {
      elems = document.getElementById(elems) || document.querySelectorAll(elems);
    }

    elems = elems.nodeName ? [elems] : elems;
    $.each(elems, function (ndx, el) {
      var scopedOpts = $.extend(true, {}, that.opts);

      if (importAttributeOptions(el, scopedOpts, $.extend(true, {}, that.userOptions), that.dataAttribute)) {
        var maskset = generateMaskSet(scopedOpts, that.noMasksCache);

        if (maskset !== undefined) {
          if (el.inputmask !== undefined) {
            el.inputmask.opts.autoUnmask = true; //force autounmasking when remasking

            el.inputmask.remove();
          } //store inputmask instance on the input with element reference


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
      }
    });
    return elems && elems[0] ? elems[0].inputmask || this : this;
  },
  option: function option(options, noremask) {
    //set extra options || retrieve value of a current option
    if (typeof options === "string") {
      return this.opts[options];
    } else if (_typeof(options) === "object") {
      $.extend(this.userOptions, options); //user passed options
      //remask

      if (this.el && noremask !== true) {
        this.mask(this.el);
      }

      return this;
    }
  },
  unmaskedvalue: function unmaskedvalue(value) {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return maskScope.call(this, {
      "action": "unmaskedvalue",
      "value": value
    });
  },
  remove: function remove() {
    return maskScope.call(this, {
      "action": "remove"
    });
  },
  getemptymask: function getemptymask() {
    //return the default (empty) mask value, usefull for setting the default value in validation
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return maskScope.call(this, {
      "action": "getemptymask"
    });
  },
  hasMaskedValue: function hasMaskedValue() {
    //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
    return !this.opts.autoUnmask;
  },
  isComplete: function isComplete() {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return maskScope.call(this, {
      "action": "isComplete"
    });
  },
  getmetadata: function getmetadata() {
    //return mask metadata if exists
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return maskScope.call(this, {
      "action": "getmetadata"
    });
  },
  isValid: function isValid(value) {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return maskScope.call(this, {
      "action": "isValid",
      "value": value
    });
  },
  format: function format(value, metadata) {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return maskScope.call(this, {
      "action": "format",
      "value": value,
      "metadata": metadata //true/false getmetadata

    });
  },
  setValue: function setValue(value) {
    if (this.el) {
      $(this.el).trigger("setvalue", [value]);
    }
  },
  analyseMask: analyseMask
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

function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
  function importOption(option, optionData) {
    optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option);

    if (optionData !== null) {
      if (typeof optionData === "string") {
        if (option.indexOf("on") === 0) {
          optionData = window[optionData];
        } //get function definition
        else if (optionData === "false") {
            optionData = false;
          } else if (optionData === "true") optionData = true;
      }

      userOptions[option] = optionData;
    }
  }

  if (opts.importDataAttributes === true) {
    var attrOptions = npt.getAttribute(dataAttribute),
        option,
        dataoptions,
        optionData,
        p;

    if (attrOptions && attrOptions !== "") {
      attrOptions = attrOptions.replace(/'/g, "\"");
      dataoptions = JSON.parse("{" + attrOptions + "}");
    } //resolve aliases


    if (dataoptions) {
      //pickup alias from dataAttribute
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

  $.extend(true, opts, userOptions); //handle dir=rtl

  if (npt.dir === "rtl" || opts.rightAlign) {
    npt.style.textAlign = "right";
  }

  if (npt.dir === "rtl" || opts.numericInput) {
    npt.dir = "ltr";
    npt.removeAttribute("dir");
    opts.isRTL = true;
  }

  return Object.keys(userOptions).length;
} //apply defaults, definitions, aliases


Inputmask.extendDefaults = function (options) {
  $.extend(true, Inputmask.prototype.defaults, options);
};

Inputmask.extendDefinitions = function (definition) {
  $.extend(true, Inputmask.prototype.definitions, definition);
};

Inputmask.extendAliases = function (alias) {
  $.extend(true, Inputmask.prototype.aliases, alias);
}; //static fn on inputmask


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
  if (typeof elems === "string") {
    elems = document.getElementById(elems) || document.querySelectorAll(elems);
  }

  elems = elems.nodeName ? [elems] : elems;
  $.each(elems, function (ndx, el) {
    if (el.inputmask) el.inputmask.remove();
  });
};

Inputmask.setValue = function (elems, value) {
  if (typeof elems === "string") {
    elems = document.getElementById(elems) || document.querySelectorAll(elems);
  }

  elems = elems.nodeName ? [elems] : elems;
  $.each(elems, function (ndx, el) {
    if (el.inputmask) el.inputmask.setValue(value);else $(el).trigger("setvalue", [value]);
  });
};

var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");

Inputmask.escapeRegex = function (str) {
  return str.replace(escapeRegexRegex, "\\$1");
};

Inputmask.dependencyLib = $; //make inputmask available

window.Inputmask = Inputmask;
module.exports = Inputmask;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 Input Mask plugin dependencyLib
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
var window = __webpack_require__(4),
    document = window.document; //helper functions
// Use a stripped-down indexOf as it's faster than native
// http://jsperf.com/thor-indexof-vs-for/5


function indexOf(list, elem) {
  var i = 0,
      len = list.length;

  for (; i < len; i++) {
    if (list[i] === elem) {
      return i;
    }
  }

  return -1;
}

function isWindow(obj) {
  return obj != null && obj === obj["window"];
}

function isArraylike(obj) {
  // Support: iOS 8.2 (not reproducible in simulator)
  // `in` check used to prevent JIT error (gh-2145)
  // hasOwn isn't used here due to false negatives
  // regarding Nodelist length in IE
  var length = "length" in obj && obj.length,
      ltype = _typeof(obj);

  if (ltype === "function" || isWindow(obj)) {
    return false;
  }

  if (obj.nodeType === 1 && length) {
    return true;
  }

  return ltype === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
}

function isValidElement(elem) {
  return elem instanceof Element;
}

function DependencyLib(elem) {
  if (elem instanceof DependencyLib) {
    return elem;
  }

  if (!(this instanceof DependencyLib)) {
    return new DependencyLib(elem);
  }

  if (elem !== undefined && elem !== null && elem !== window) {
    this[0] = elem.nodeName ? elem : elem[0] !== undefined && elem[0].nodeName ? elem[0] : document.querySelector(elem);

    if (this[0] !== undefined && this[0] !== null) {
      this[0].eventRegistry = this[0].eventRegistry || {};
    }
  }
}

DependencyLib.prototype = {
  on: function on(events, handler) {
    function addEvent(ev, namespace) {
      //register domevent
      if (elem.addEventListener) {
        // all browsers except IE before version 9
        elem.addEventListener(ev, handler, false);
      } else if (elem.attachEvent) {
        // IE before version 9
        elem.attachEvent("on" + ev, handler);
      }

      eventRegistry[ev] = eventRegistry[ev] || {};
      eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
      eventRegistry[ev][namespace].push(handler);
    }

    if (isValidElement(this[0])) {
      var eventRegistry = this[0].eventRegistry,
          elem = this[0];

      var _events = events.split(" ");

      for (var endx = 0; endx < _events.length; endx++) {
        var nsEvent = _events[endx].split("."),
            ev = nsEvent[0],
            namespace = nsEvent[1] || "global";

        addEvent(ev, namespace);
      }
    }

    return this;
  },
  off: function off(events, handler) {
    var eventRegistry, elem;

    function removeEvent(ev, namespace, handler) {
      if (ev in eventRegistry === true) {
        //unbind to dom events
        if (elem.removeEventListener) {
          // all browsers except IE before version 9
          elem.removeEventListener(ev, handler, false);
        } else if (elem.detachEvent) {
          // IE before version 9
          elem.detachEvent("on" + ev, handler);
        }

        if (namespace === "global") {
          for (var nmsp in eventRegistry[ev]) {
            eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);
          }
        } else {
          eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
        }
      }
    }

    function resolveNamespace(ev, namespace) {
      var evts = [],
          hndx,
          hndL;

      if (ev.length > 0) {
        if (handler === undefined) {
          for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) {
            evts.push({
              ev: ev,
              namespace: namespace && namespace.length > 0 ? namespace : "global",
              handler: eventRegistry[ev][namespace][hndx]
            });
          }
        } else {
          evts.push({
            ev: ev,
            namespace: namespace && namespace.length > 0 ? namespace : "global",
            handler: handler
          });
        }
      } else if (namespace.length > 0) {
        for (var evNdx in eventRegistry) {
          for (var nmsp in eventRegistry[evNdx]) {
            if (nmsp === namespace) {
              if (handler === undefined) {
                for (hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) {
                  evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: eventRegistry[evNdx][nmsp][hndx]
                  });
                }
              } else {
                evts.push({
                  ev: evNdx,
                  namespace: nmsp,
                  handler: handler
                });
              }
            }
          }
        }
      }

      return evts;
    }

    if (isValidElement(this[0])) {
      eventRegistry = this[0].eventRegistry;
      elem = this[0];

      var _events = events.split(" ");

      for (var endx = 0; endx < _events.length; endx++) {
        var nsEvent = _events[endx].split("."),
            offEvents = resolveNamespace(nsEvent[0], nsEvent[1]);

        for (var i = 0, offEventsL = offEvents.length; i < offEventsL; i++) {
          removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
        }
      }
    }

    return this;
  },
  trigger: function trigger(events
  /* , args... */
  ) {
    if (isValidElement(this[0])) {
      var eventRegistry = this[0].eventRegistry,
          elem = this[0];

      var _events = typeof events === "string" ? events.split(" ") : [events.type];

      for (var endx = 0; endx < _events.length; endx++) {
        var nsEvent = _events[endx].split("."),
            ev = nsEvent[0],
            namespace = nsEvent[1] || "global";

        if (document !== undefined && namespace === "global") {
          //trigger domevent
          var evnt,
              i,
              params = {
            bubbles: true,
            cancelable: true,
            detail: arguments[1]
          }; // The custom event that will be created

          if (document.createEvent) {
            try {
              evnt = new CustomEvent(ev, params);
            } catch (e) {
              evnt = document.createEvent("CustomEvent");
              evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
            }

            if (events.type) DependencyLib.extend(evnt, events);
            elem.dispatchEvent(evnt);
          } else {
            evnt = document.createEventObject();
            evnt.eventType = ev;
            evnt.detail = arguments[1];
            if (events.type) DependencyLib.extend(evnt, events);
            elem.fireEvent("on" + evnt.eventType, evnt);
          }
        } else if (eventRegistry[ev] !== undefined) {
          arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event(arguments[0]);
          arguments[0].detail = arguments.slice(1);

          if (namespace === "global") {
            for (var nmsp in eventRegistry[ev]) {
              for (i = 0; i < eventRegistry[ev][nmsp].length; i++) {
                eventRegistry[ev][nmsp][i].apply(elem, arguments);
              }
            }
          } else {
            for (i = 0; i < eventRegistry[ev][namespace].length; i++) {
              eventRegistry[ev][namespace][i].apply(elem, arguments);
            }
          }
        }
      }
    }

    return this;
  }
}; //static

DependencyLib.isFunction = function (obj) {
  return typeof obj === "function";
};

DependencyLib.noop = function () {};

DependencyLib.isArray = Array.isArray;

DependencyLib.inArray = function (elem, arr, i) {
  return arr == null ? -1 : indexOf(arr, elem, i);
};

DependencyLib.valHooks = undefined;

DependencyLib.isPlainObject = function (obj) {
  // Not plain objects:
  // - Any object or value whose internal [[Class]] property is not "[object Object]"
  // - DOM nodes
  // - window
  if (_typeof(obj) !== "object" || obj.nodeType || isWindow(obj)) {
    return false;
  }

  if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
    return false;
  } // If the function hasn't returned already, we're confident that
  // |obj| is a plain object, created by {} or constructed with new Object


  return true;
};

DependencyLib.extend = function () {
  var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false; // Handle a deep copy situation

  if (typeof target === "boolean") {
    deep = target; // Skip the boolean and the target

    target = arguments[i] || {};
    i++;
  } // Handle case when target is a string or something (possible in deep copy)


  if (_typeof(target) !== "object" && !DependencyLib.isFunction(target)) {
    target = {};
  } // Extend jQuery itself if only one argument is passed


  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name]; // Prevent never-ending loop

        if (target === copy) {
          continue;
        } // Recurse if we're merging plain objects or arrays


        if (deep && copy && (DependencyLib.isPlainObject(copy) || (copyIsArray = DependencyLib.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && DependencyLib.isArray(src) ? src : [];
          } else {
            clone = src && DependencyLib.isPlainObject(src) ? src : {};
          } // Never move original objects, clone them


          target[name] = DependencyLib.extend(deep, clone, copy); // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  } // Return the modified object


  return target;
};

DependencyLib.each = function (obj, callback) {
  var value,
      i = 0;

  if (isArraylike(obj)) {
    for (var length = obj.length; i < length; i++) {
      value = callback.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      value = callback.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  }

  return obj;
};

DependencyLib.data = function (owner, key, value) {
  if (value === undefined) {
    return owner.__data ? owner.__data[key] : null;
  } else {
    owner.__data = owner.__data || {};
    owner.__data[key] = value;
  }
};

if (typeof window.CustomEvent === "function") {
  DependencyLib.Event = window.CustomEvent;
} else {
  DependencyLib.Event = function (event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  DependencyLib.Event.prototype = window.Event.prototype;
}

module.exports = DependencyLib;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(3);

function generateMaskSet(opts, nocache) {
  var ms;

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
      var repeatStart = opts.repeat === "*" ? 0 : opts.repeat === "+" ? 1 : opts.repeat;
      mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
    } // console.log(mask);


    var masksetDefinition, maskdefKey;
    maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;

    if (opts.keepStatic !== false) {
      //keepstatic modifies the output from the testdefinitions ~ so differentiate in the maskcache
      maskdefKey = "ks_" + maskdefKey;
    }

    if (Inputmask.prototype.masksCache[maskdefKey] === undefined || nocache === true) {
      masksetDefinition = {
        "mask": mask,
        "maskToken": Inputmask.prototype.analyseMask(mask, regexMask, opts),
        "validPositions": {},
        "_buffer": undefined,
        "buffer": undefined,
        "tests": {},
        "excludes": {},
        //excluded alternations
        "metadata": metadata,
        "maskLength": undefined,
        "jitOffset": {}
      };

      if (nocache !== true) {
        Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition;
        masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);
      }
    } else {
      masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);
    }

    return masksetDefinition;
  }

  if ($.isFunction(opts.mask)) {
    //allow mask to be a preprocessing fn - should return a valid mask
    opts.mask = opts.mask(opts);
  }

  if ($.isArray(opts.mask)) {
    if (opts.mask.length > 1) {
      if (opts.keepStatic === null) {
        //enable by default when passing multiple masks when the option is not explicitly specified
        opts.keepStatic = "auto";

        for (var i = 0; i < opts.mask.length; i++) {
          //multiple mask startting with different mask
          if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
            opts.keepStatic = true;
            break;
          }
        }
      }

      var altMask = opts.groupmarker[0];
      $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
        if (altMask.length > 1) {
          altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0];
        }

        if (msk.mask !== undefined && !$.isFunction(msk.mask)) {
          altMask += msk.mask;
        } else {
          altMask += msk;
        }
      });
      altMask += opts.groupmarker[1]; // console.log(altMask);

      return generateMask(altMask, opts.mask, opts);
    } else {
      opts.mask = opts.mask.pop();
    }
  }

  if (opts.keepStatic === null) opts.keepStatic = false;

  if (opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask)) {
    ms = generateMask(opts.mask.mask, opts.mask, opts);
  } else {
    ms = generateMask(opts.mask, opts.mask, opts);
  }

  return ms;
}

function analyseMask(mask, regexMask, opts) {
  var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
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
      closeRegexGroup = false;

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
  } //test definition => {fn: RegExp/function, static: true/false optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}


  function insertTestDefinition(mtoken, element, position) {
    position = position !== undefined ? position : mtoken.matches.length;
    var prevMatch = mtoken.matches[position - 1];

    if (regexMask) {
      if (element.indexOf("[") === 0 || escaped && /\\d|\\s|\\w]/i.test(element) || element === ".") {
        mtoken.matches.splice(position++, 0, {
          fn: new RegExp(element, opts.casing ? "i" : ""),
          "static": false,
          optionality: false,
          newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element,
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
            fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
            "static": true,
            optionality: false,
            newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== lmnt && prevMatch["static"] !== true,
            casing: null,
            def: opts.staticDefinitionSymbol || lmnt,
            placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
            nativeDef: (escaped ? "'" : "") + lmnt
          });
        });
      }

      escaped = false;
    } else {
      var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];

      if (maskdef && !escaped) {
        mtoken.matches.splice(position++, 0, {
          fn: maskdef.validator ? typeof maskdef.validator == "string" ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
            this.test = maskdef.validator;
          }() : new RegExp("."),
          "static": false,
          optionality: false,
          newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
          casing: maskdef.casing,
          def: maskdef.definitionSymbol || element,
          placeholder: maskdef.placeholder,
          nativeDef: element
        });
      } else {
        mtoken.matches.splice(position++, 0, {
          fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
          "static": true,
          optionality: false,
          newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element && prevMatch["static"] !== true,
          casing: null,
          def: opts.staticDefinitionSymbol || element,
          placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
          nativeDef: (escaped ? "'" : "") + element
        });
        escaped = false;
      }
    }
  }

  function verifyGroupMarker(maskToken) {
    if (maskToken && maskToken.matches) {
      $.each(maskToken.matches, function (ndx, token) {
        var nextToken = maskToken.matches[ndx + 1];

        if ((nextToken === undefined || nextToken.matches === undefined || nextToken.isQuantifier === false) && token && token.isGroup) {
          //this is not a group but a normal mask => convert
          token.isGroup = false;

          if (!regexMask) {
            insertTestDefinition(token, opts.groupmarker[0], 0);

            if (token.openGroup !== true) {
              insertTestDefinition(token, opts.groupmarker[1]);
            }
          }
        }

        verifyGroupMarker(token);
      });
    }
  }

  function defaultCase() {
    if (openenings.length > 0) {
      currentOpeningToken = openenings[openenings.length - 1];
      insertTestDefinition(currentOpeningToken, m);

      if (currentOpeningToken.isAlternator) {
        //handle alternator a | b case
        alternator = openenings.pop();

        for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
          if (alternator.matches[mndx].isGroup) alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
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
      if (st === opts.optionalmarker[0]) {
        st = opts.optionalmarker[1];
      } else if (st === opts.optionalmarker[1]) {
        st = opts.optionalmarker[0];
      } else if (st === opts.groupmarker[0]) {
        st = opts.groupmarker[1];
      } else if (st === opts.groupmarker[1]) st = opts.groupmarker[0];

      return st;
    }

    maskToken.matches = maskToken.matches.reverse();

    for (var match in maskToken.matches) {
      if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
        var intMatch = parseInt(match);

        if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
          //reposition quantifier
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

  function groupify(matches) {
    var groupToken = new MaskToken(true);
    groupToken.openGroup = false;
    groupToken.matches = matches;
    return groupToken;
  }

  function closeGroup() {
    // Group closing
    openingToken = openenings.pop();
    openingToken.openGroup = false; //mark group as complete

    if (openingToken !== undefined) {
      if (openenings.length > 0) {
        currentOpeningToken = openenings[openenings.length - 1];
        currentOpeningToken.matches.push(openingToken);

        if (currentOpeningToken.isAlternator) {
          //handle alternator (a) | (b) case
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
    } else {
      defaultCase();
    }
  }

  function groupQuantifier(matches) {
    var lastMatch = matches.pop();

    if (lastMatch.isQuantifier) {
      lastMatch = groupify([matches.pop(), lastMatch]);
    }

    return lastMatch;
  }

  if (regexMask) {
    opts.optionalmarker[0] = undefined;
    opts.optionalmarker[1] = undefined;
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

        case "|":
          //regex mask alternator  ex: [01][0-9]|2[0-3] => ([01][0-9]|2[0-3])
          if (openenings.length === 0) {
            //wrap the mask in a group to form a regex alternator  ([01][0-9]|2[0-3])
            var altRegexGroup = groupify(currentToken.matches);
            altRegexGroup.openGroup = true;
            openenings.push(altRegexGroup);
            currentToken.matches = [];
            closeRegexGroup = true;
          }

          break;
      }
    }

    if (escaped) {
      defaultCase();
      continue;
    }

    switch (m.charAt(0)) {
      case "(?=":
        //lookahead
        break;

      case "(?!":
        //negative lookahead
        break;

      case "(?<=":
        //lookbehind
        break;

      case "(?<!":
        //negative lookbehind
        break;

      case opts.escapeChar:
        escaped = true;

        if (regexMask) {
          defaultCase();
        }

        break;
      // optional closing

      case opts.optionalmarker[1]:
      case opts.groupmarker[1]:
        closeGroup();
        break;

      case opts.optionalmarker[0]:
        // optional opening
        openenings.push(new MaskToken(false, true));
        break;

      case opts.groupmarker[0]:
        // Group opening
        openenings.push(new MaskToken(true));
        break;

      case opts.quantifiermarker[0]:
        //Quantifier
        var quantifier = new MaskToken(false, false, true);
        m = m.replace(/[{}]/g, "");
        var mqj = m.split("|"),
            mq = mqj[0].split(","),
            mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
            mq1 = mq.length === 1 ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);

        if (mq0 === "*" || mq0 === "+") {
          mq0 = mq1 === "*" ? 0 : 1;
        }

        quantifier.quantifier = {
          min: mq0,
          max: mq1,
          jit: mqj[1]
        };
        var matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
        match = matches.pop();

        if (match.isAlternator) {
          //handle quantifier in an alternation [0-9]{2}|[0-9]{3}
          matches.push(match); //push back alternator

          matches = match.matches; //remap target matches

          var groupToken = new MaskToken(true);
          var tmpMatch = matches.pop();
          matches.push(groupToken); //push the group

          matches = groupToken.matches;
          match = tmpMatch;
        }

        if (!match.isGroup) {
          // if (regexMask && match.fn === null) { //why is this needed???
          //     if (match.def === ".") match.fn = new RegExp(match.def, opts.casing ? "i" : "");
          // }
          match = groupify([match]);
        }

        matches.push(match);
        matches.push(quantifier);
        break;

      case opts.alternatormarker:
        if (openenings.length > 0) {
          currentOpeningToken = openenings[openenings.length - 1];
          var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];

          if (currentOpeningToken.openGroup && ( //regexp alt syntax
          subToken.matches === undefined || subToken.isGroup === false && subToken.isAlternator === false)) {
            //alternations within group
            lastMatch = openenings.pop();
          } else {
            lastMatch = groupQuantifier(currentOpeningToken.matches);
          }
        } else {
          lastMatch = groupQuantifier(currentToken.matches);
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

          if (lastMatch.openGroup) {
            //regexp alt syntax
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

  if (closeRegexGroup) closeGroup();

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
  } // console.log(JSON.stringify(maskTokens));


  return maskTokens;
}

module.exports = {
  generateMaskSet: generateMaskSet,
  analyseMask: analyseMask
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $ = __webpack_require__(3),
    window = __webpack_require__(4),
    document = window.document,
    ua = window.navigator && window.navigator.userAgent || "",
    ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0,
    mobile = "ontouchstart" in window,
    //not entirely correct but will currently do
iemobile = /iemobile/i.test(ua),
    iphone = /iphone/i.test(ua) && !iemobile,
    keyCode = __webpack_require__(7); //masking scope
//actionObj definition see below


module.exports = function maskScope(actionObj, maskset, opts) {
  maskset = maskset || this.maskset;
  opts = opts || this.opts;
  var inputmask = this,
      el = this.el,
      isRTL = this.isRTL || (this.isRTL = opts.numericInput),
      undoValue,
      $el,
      skipKeyPressEvent = false,
      //Safari 5.1.x - modal dialog fires keypress twice workaround
  skipInputEvent = false,
      //skip when triggered from within inputmask
  validationEvent = false,
      ignorable = false,
      maxLength,
      mouseEnter = false,
      originalPlaceholder = undefined; //needed for FF
  //maskset helperfunctions

  function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
    //includeMode true => input, undefined => placeholder, false => mask
    var greedy = opts.greedy;
    if (clearOptionalTail) opts.greedy = false;
    minimalPos = minimalPos || 0;
    var maskTemplate = [],
        ndxIntlzr,
        pos = 0,
        test,
        testPos;

    do {
      if (baseOnInput === true && maskset.validPositions[pos]) {
        testPos = clearOptionalTail && maskset.validPositions[pos].match.optionality === true && maskset.validPositions[pos + 1] === undefined && (maskset.validPositions[pos].generatedInput === true || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos];
        test = testPos.match;
        ndxIntlzr = testPos.locator.slice();
        maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
      } else {
        testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
        test = testPos.match;
        ndxIntlzr = testPos.locator.slice();
        var jitMasking = noJit === true ? false : opts.jitMasking !== false ? opts.jitMasking : test.jit;

        if (jitMasking === false || jitMasking === undefined
        /*|| pos < lvp*/
        || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
          maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
        }
      }

      if (opts.keepStatic === "auto") {
        if (test.newBlockMarker && test["static"] !== true) {
          opts.keepStatic = pos - 1;
        }
      }

      pos++;
    } while ((maxLength === undefined || pos < maxLength) && (test["static"] !== true || test.def !== "") || minimalPos > pos);

    if (maskTemplate[maskTemplate.length - 1] === "") {
      maskTemplate.pop(); //drop the last one which is empty
    }

    if (includeMode !== false || //do not alter the masklength when just retrieving the maskdefinition
    maskset.maskLength === undefined) //just make sure the maskLength gets initialized in all cases (needed for isValid)
      {
        maskset.maskLength = pos - 1;
      }

    opts.greedy = greedy;
    return maskTemplate;
  }

  function resetMaskSet(soft) {
    maskset.buffer = undefined;

    if (soft !== true) {
      maskset.validPositions = {};
      maskset.p = 0;
    }
  }

  function getLastValidPosition(closestTo, strict, validPositions) {
    var before = -1,
        after = -1,
        valids = validPositions || maskset.validPositions; //for use in valhook ~ context switch

    if (closestTo === undefined) closestTo = -1;

    for (var posNdx in valids) {
      var psNdx = parseInt(posNdx);

      if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
        if (psNdx <= closestTo) before = psNdx;
        if (psNdx >= closestTo) after = psNdx;
      }
    }

    return before === -1 || before == closestTo ? after : after == -1 ? before : closestTo - before < after - closestTo ? before : after;
  }

  function getDecisionTaker(tst) {
    var decisionTaker = tst.locator[tst.alternation];

    if (typeof decisionTaker == "string" && decisionTaker.length > 0) {
      //no decision taken ~ take first one as decider
      decisionTaker = decisionTaker.split(",")[0];
    }

    return decisionTaker !== undefined ? decisionTaker.toString() : "";
  }

  function getLocator(tst, align) {
    //need to align the locators to be correct
    var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
    if (locator !== "") while (locator.length < align) {
      locator += "0";
    }
    return locator;
  }

  function determineTestTemplate(pos, tests) {
    pos = pos > 0 ? pos - 1 : 0;
    var altTest = getTest(pos),
        targetLocator = getLocator(altTest),
        tstLocator,
        closest,
        bestMatch;

    for (var ndx = 0; ndx < tests.length; ndx++) {
      //find best matching
      var tst = tests[ndx];
      tstLocator = getLocator(tst, targetLocator.length);
      var distance = Math.abs(tstLocator - targetLocator);

      if (closest === undefined || tstLocator !== "" && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.newBlockMarker === "master" && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) {
        closest = distance;
        bestMatch = tst;
      }
    }

    return bestMatch;
  }

  function getTestTemplate(pos, ndxIntlzr, tstPs) {
    return maskset.validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
  }

  function getTest(pos, tests) {
    if (maskset.validPositions[pos]) {
      return maskset.validPositions[pos];
    }

    return (tests || getTests(pos))[0];
  }

  function positionCanMatchDefinition(pos, testDefinition, opts) {
    var valid = false,
        tests = getTests(pos),
        defProp = opts.shiftPositions ? "def" : "nativeDef";

    for (var tndx = 0; tndx < tests.length; tndx++) {
      if (tests[tndx].match && tests[tndx].match[defProp] === testDefinition.match[defProp]) {
        valid = true;
        break;
      }
    }

    if (valid === false) {
      if (maskset.jitOffset[pos] !== undefined) {
        valid = positionCanMatchDefinition(pos + maskset.jitOffset[pos], testDefinition, opts);
      }
    }

    return valid;
  }

  function getTests(pos, ndxIntlzr, tstPs) {
    var maskTokens = maskset.maskToken,
        testPos = ndxIntlzr ? tstPs : 0,
        ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
        matches = [],
        insertStop = false,
        latestMatch,
        cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

    function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
      //ndxInitializer contains a set of indexes to speedup searches in the mtokens
      function handleMatch(match, loopNdx, quantifierRecurse) {
        function isFirstMatch(latestMatch, tokenGroup) {
          var firstMatch = $.inArray(latestMatch, tokenGroup.matches) === 0;

          if (!firstMatch) {
            $.each(tokenGroup.matches, function (ndx, match) {
              if (match.isQuantifier === true) {
                firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);
              } else if (Object.prototype.hasOwnProperty.call(match, "matches")) firstMatch = isFirstMatch(latestMatch, match);

              if (firstMatch) return false;
            });
          }

          return firstMatch;
        }

        function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
          var bestMatch, indexPos;

          if (maskset.tests[pos] || maskset.validPositions[pos]) {
            $.each(maskset.tests[pos] || [maskset.validPositions[pos]], function (ndx, lmnt) {
              if (lmnt.mloc[alternateNdx]) {
                bestMatch = lmnt;
                return false; //break
              }

              var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation,
                  ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;

              if ((indexPos === undefined || ndxPos < indexPos) && ndxPos !== -1) {
                bestMatch = lmnt;
                indexPos = ndxPos;
              }
            });
          }

          if (bestMatch) {
            var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
            var locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
            return locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1);
          } else {
            return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
          }
        }

        function isSubsetOf(source, target) {
          function expand(pattern) {
            var expanded = [],
                start = -1,
                end;

            for (var i = 0, l = pattern.length; i < l; i++) {
              if (pattern.charAt(i) === "-") {
                end = pattern.charCodeAt(i + 1);

                while (++start < end) {
                  expanded.push(String.fromCharCode(start));
                }
              } else {
                start = pattern.charCodeAt(i);
                expanded.push(pattern.charAt(i));
              }
            }

            return expanded.join("");
          }

          if (source.match.def === target.match.nativeDef) return true;

          if ((opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) && source.match["static"] !== true && target.match["static"] !== true) {
            //is regex a subset
            return expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, ""))) !== -1;
          }

          return false;
        }

        function staticCanMatchDefinition(source, target) {
          return source.match["static"] === true && target.match["static"] !== true ? target.match.fn.test(source.match.def, maskset, pos, false, opts, false) : false;
        } //mergelocators for retrieving the correct locator match when merging


        function setMergeLocators(targetMatch, altMatch) {
          if (altMatch === undefined || targetMatch.alternation === altMatch.alternation && targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) === -1) {
            targetMatch.mloc = targetMatch.mloc || {};
            var locNdx = targetMatch.locator[targetMatch.alternation];

            if (locNdx === undefined) {
              targetMatch.alternation = undefined;
            } else {
              if (typeof locNdx === "string") locNdx = locNdx.split(",")[0];
              if (targetMatch.mloc[locNdx] === undefined) targetMatch.mloc[locNdx] = targetMatch.locator.slice();

              if (altMatch !== undefined) {
                for (var ndx in altMatch.mloc) {
                  if (typeof ndx === "string") ndx = ndx.split(",")[0];
                  if (targetMatch.mloc[ndx] === undefined) targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                }

                targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",");
              }

              return true;
            }
          }

          return false;
        }

        if (testPos > 500 && quantifierRecurse !== undefined) {
          throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
        }

        if (testPos === pos && match.matches === undefined) {
          matches.push({
            "match": match,
            "locator": loopNdx.reverse(),
            "cd": cacheDependency,
            "mloc": {}
          });
          return true;
        } else if (match.matches !== undefined) {
          if (match.isGroup && quantifierRecurse !== match) {
            //when a group pass along to the quantifier
            match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse);
            if (match) return true;
          } else if (match.isOptional) {
            var optionalToken = match,
                mtchsNdx = matches.length;
            match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);

            if (match) {
              //mark optionality in matches
              $.each(matches, function (ndx, mtch) {
                if (ndx >= mtchsNdx) {
                  mtch.match.optionality = true;
                }
              });
              latestMatch = matches[matches.length - 1].match;

              if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) {
                //prevent loop see #698
                insertStop = true; //insert a stop

                testPos = pos; //match the position after the group
              } else {
                return true;
              }
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
                  altIndexArr.push(amndx.toString());
                }
              }

              if (maskset.excludes[pos] !== undefined) {
                var altIndexArrClone = altIndexArr.slice();

                for (var i = 0, el = maskset.excludes[pos].length; i < el; i++) {
                  altIndexArr.splice(altIndexArr.indexOf(maskset.excludes[pos][i].toString()), 1);
                }

                if (altIndexArr.length === 0) {
                  //fully alternated => reset
                  delete maskset.excludes[pos];
                  altIndexArr = altIndexArrClone;
                }
              }

              if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) altIndexArr = altIndexArr.slice(0, 1);
              var unMatchedAlternation = false;

              for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                amndx = parseInt(altIndexArr[ndx]);
                matches = []; //set the correct ndxInitializer

                ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();

                if (alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse)) {
                  match = true;
                } else if (ndx === 0) {
                  unMatchedAlternation = true;
                }

                maltMatches = matches.slice();
                testPos = currentPos;
                matches = []; //fuzzy merge matches

                for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                  var altMatch = maltMatches[ndx1],
                      dropMatch = false;
                  altMatch.match.jit = altMatch.match.jit || unMatchedAlternation; //mark jit when there are unmatched alternations  ex: mask: "(a|aa)"

                  altMatch.alternation = altMatch.alternation || loopNdxCnt;
                  setMergeLocators(altMatch);

                  for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                    var altMatch2 = malternateMatches[ndx2];

                    if (typeof altIndex !== "string" || altMatch.alternation !== undefined && $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) !== -1) {
                      if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                        dropMatch = true;
                        setMergeLocators(altMatch2, altMatch);
                        break;
                      } else if (isSubsetOf(altMatch, altMatch2)) {
                        if (setMergeLocators(altMatch, altMatch2)) {
                          dropMatch = true;
                          malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                        }

                        break;
                      } else if (isSubsetOf(altMatch2, altMatch)) {
                        setMergeLocators(altMatch2, altMatch);
                        break;
                      } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                        if (setMergeLocators(altMatch, altMatch2)) {
                          //insert match above general match
                          dropMatch = true;
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

              matches = currentMatches.concat(malternateMatches);
              testPos = pos;
              insertStop = matches.length > 0; //insert a stopelemnt when there is an alternate - needed for non-greedy option

              match = malternateMatches.length > 0; //set correct match state
              //cloneback

              ndxInitializer = ndxInitializerClone.slice();
            } else {
              match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
            }

            if (match) return true;
          } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) {
            var qt = match;

            for (var qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
              var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
              match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); //set the tokenGroup as quantifierRecurse marker

              if (match) {
                //get latest match
                latestMatch = matches[matches.length - 1].match; //mark optionality
                //TODO FIX RECURSIVE QUANTIFIERS

                latestMatch.optionalQuantifier = qndx >= qt.quantifier.min; // console.log(pos + " " + qt.quantifier.min + " " + latestMatch.optionalQuantifier);

                latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit;

                if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                  insertStop = true;
                  testPos = pos; //match the position after the group

                  break; //stop quantifierloop && search for next possible match
                }

                if (latestMatch.jit
                /*&& !latestMatch.optionalQuantifier*/
                ) {
                    //always set jitOffset, isvalid checks when to apply
                    maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch);
                  }

                return true;
              }
            }
          } else {
            match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
            if (match) return true;
          }
        } else {
          testPos++;
        }
      } //the offset is set in the quantifierloop when git masking is used


      for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) {
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

    function mergeLocators(pos, tests) {
      var locator = [];
      if (!$.isArray(tests)) tests = [tests];

      if (tests.length > 0) {
        if (tests[0].alternation === undefined || opts.keepStatic === true) {
          locator = determineTestTemplate(pos, tests.slice()).locator.slice();
          if (locator.length === 0) locator = tests[0].locator.slice();
        } else {
          $.each(tests, function (ndx, tst) {
            if (tst.def !== "") {
              if (locator.length === 0) {
                locator = tst.locator.slice();
              } else {
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

    if (pos > -1 && (maxLength === undefined || pos < maxLength)) {
      if (ndxIntlzr === undefined) {
        //determine index initializer
        var previousPos = pos - 1,
            test;

        while ((test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) === undefined && previousPos > -1) {
          previousPos--;
        }

        if (test !== undefined && previousPos > -1) {
          ndxInitializer = mergeLocators(previousPos, test);
          cacheDependency = ndxInitializer.join("");
          testPos = previousPos;
        }
      }

      if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) {
        //cacheDependency is set on all tests, just check on the first
        return maskset.tests[pos];
      }

      for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
        var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);

        if (match && testPos === pos || testPos > pos) {
          break;
        }
      }
    }

    if (matches.length === 0 || insertStop) {
      matches.push({
        match: {
          fn: null,
          "static": true,
          optionality: false,
          casing: null,
          def: "",
          placeholder: ""
        },
        locator: [],
        mloc: {},
        cd: cacheDependency
      });
    }

    if (ndxIntlzr !== undefined && maskset.tests[pos]) {
      //prioritize full tests for caching
      return $.extend(true, [], matches);
    }

    maskset.tests[pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props
    // console.log(pos + " - " + JSON.stringify(matches));

    return maskset.tests[pos];
  }

  function getBufferTemplate() {
    if (maskset._buffer === undefined) {
      //generate template
      maskset._buffer = getMaskTemplate(false, 1);
      if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
    }

    return maskset._buffer;
  }

  function getBuffer(noCache) {
    if (maskset.buffer === undefined || noCache === true) {
      maskset.buffer = getMaskTemplate(true, getLastValidPosition(), true);
      if (maskset._buffer === undefined) maskset._buffer = maskset.buffer.slice();
    }

    return maskset.buffer;
  }

  function refreshFromBuffer(start, end, buffer) {
    // checkVal.call(inputmask, el, false, true, isRTL ? buffer.reverse() : buffer);
    var i,
        p,
        skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
    opts.skipOptionalPartCharacter = "";

    if (start === true) {
      resetMaskSet();
      maskset.tests = {}; //refresh tests after possible alternating

      start = 0;
      end = buffer.length;
    } else {
      for (i = start; i < end; i++) {
        delete maskset.validPositions[i];
      }
    }

    p = start;

    for (i = start; i < end; i++) {
      var valResult = isValid(p, buffer[i], true, true);

      if (valResult !== false) {
        p = valResult.caret !== undefined && valResult.caret > valResult.pos ? valResult.caret : valResult.pos + 1;
      }
    }

    opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
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
        var posBefore = maskset.validPositions[pos - 1];

        if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(keyCode.SPACE)) {
          elem = elem.toUpperCase();
        } else {
          elem = elem.toLowerCase();
        }

        break;

      default:
        if ($.isFunction(opts.casing)) {
          var args = Array.prototype.slice.call(arguments);
          args.push(maskset.validPositions);
          elem = opts.casing.apply(this, args);
        }

    }

    return elem;
  }

  function checkAlternationMatch(altArr1, altArr2, na) {
    var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
        isMatch = false,
        naArr = na !== undefined ? na.split(",") : [],
        naNdx; //remove no alternate indexes from alternation array

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

  function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
    //pos == true => generalize
    var validPsClone = $.extend(true, {}, maskset.validPositions),
        tstClone = $.extend(true, {}, maskset.tests),
        lastAlt,
        alternation,
        isValidRslt = false,
        returnRslt = false,
        altPos,
        prevAltPos,
        i,
        validPos,
        decisionPos,
        lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition(),
        nextPos,
        input,
        begin,
        end;

    if (selection) {
      begin = selection.begin;
      end = selection.end;

      if (selection.begin > selection.end) {
        begin = selection.end;
        end = selection.begin;
      }
    }

    if (lAltPos === -1 && rAltPos === undefined) {
      //do not recurse when already paste the beginning
      lastAlt = 0;
      prevAltPos = getTest(lastAlt);
      alternation = prevAltPos.alternation;
    } else {
      //find last modified alternation
      for (; lAltPos >= 0; lAltPos--) {
        altPos = maskset.validPositions[lAltPos];

        if (altPos && altPos.alternation !== undefined) {
          if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
            break;
          }

          lastAlt = lAltPos;
          alternation = maskset.validPositions[lastAlt].alternation;
          prevAltPos = altPos;
        }
      }
    }

    if (alternation !== undefined) {
      decisionPos = parseInt(lastAlt);
      maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [];

      if (maskPos !== true) {
        //generalize
        maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos));
      }

      var validInputs = [],
          resultPos = -1;

      for (i = decisionPos; i < getLastValidPosition(undefined, true) + 1; i++) {
        if (resultPos === -1 && maskPos <= i && c !== undefined) {
          validInputs.push(c);
          resultPos = validInputs.length - 1;
        }

        validPos = maskset.validPositions[i];

        if (validPos && validPos.generatedInput !== true && (selection === undefined || i < begin || i >= end)) {
          validInputs.push(validPos.input);
        }

        delete maskset.validPositions[i];
      }

      if (resultPos === -1 && c !== undefined) {
        validInputs.push(c);
        resultPos = validInputs.length - 1;
      }

      while (maskset.excludes[decisionPos] !== undefined && maskset.excludes[decisionPos].length < 10) {
        maskset.tests[decisionPos] = undefined; //clear decisionPos

        resetMaskSet(true); //clear getbuffer

        isValidRslt = true;

        for (i = 0; i < validInputs.length; i++) {
          nextPos = isValidRslt.caret || getLastValidPosition(undefined, true) + 1;
          input = validInputs[i];

          if (!(isValidRslt = isValid(nextPos, input, false, fromIsValid, true))) {
            break;
          }

          if (i === resultPos) {
            returnRslt = isValidRslt;
          }

          if (maskPos == true && isValidRslt) {
            //return validposition on generalise
            returnRslt = {
              caretPos: i
            };
          }
        }

        if (!isValidRslt) {
          resetMaskSet();
          prevAltPos = getTest(decisionPos); //get the current decisionPos to exclude ~ needs to be before restoring the initial validation
          //reset & revert

          maskset.validPositions = $.extend(true, {}, validPsClone);
          maskset.tests = $.extend(true, {}, tstClone); //refresh tests after possible alternating

          if (maskset.excludes[decisionPos]) {
            var decisionTaker = getDecisionTaker(prevAltPos);

            if (maskset.excludes[decisionPos].indexOf(decisionTaker) !== -1) {
              returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
              break;
            }

            maskset.excludes[decisionPos].push(decisionTaker);

            for (i = decisionPos; i < getLastValidPosition(undefined, true) + 1; i++) {
              delete maskset.validPositions[i];
            }
          } else {
            //latest alternation
            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
            break;
          }
        } else {
          break;
        }
      }
    } //reset alternation excludes


    if (!returnRslt || opts.keepStatic !== false) {
      delete maskset.excludes[decisionPos];
    }

    return returnRslt;
  }

  function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly) {
    //strict true ~ no correction or autofill
    function isSelection(posObj) {
      return isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end === 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin === 1;
    }

    strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

    var maskPos = pos;

    if (pos.begin !== undefined) {
      //position was a position object - used to handle a delete by typing over a selection
      maskPos = isRTL ? pos.end : pos.begin;
    }

    function processCommandObject(commandObj) {
      if (commandObj !== undefined) {
        if (commandObj.remove !== undefined) {
          //remove position(s)
          if (!$.isArray(commandObj.remove)) commandObj.remove = [commandObj.remove];
          $.each(commandObj.remove.sort(function (a, b) {
            return b.pos - a.pos;
          }), function (ndx, lmnt) {
            revalidateMask({
              begin: lmnt,
              end: lmnt + 1
            });
          });
          commandObj.remove = undefined;
        }

        if (commandObj.insert !== undefined) {
          //insert position(s)
          if (!$.isArray(commandObj.insert)) commandObj.insert = [commandObj.insert];
          $.each(commandObj.insert.sort(function (a, b) {
            return a.pos - b.pos;
          }), function (ndx, lmnt) {
            if (lmnt.c !== "") {
              isValid(lmnt.pos, lmnt.c, lmnt.strict !== undefined ? lmnt.strict : true, lmnt.fromIsValid !== undefined ? lmnt.fromIsValid : fromIsValid);
            }
          });
          commandObj.insert = undefined;
        }

        if (commandObj.refreshFromBuffer && commandObj.buffer) {
          var refresh = commandObj.refreshFromBuffer;
          refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, commandObj.buffer);
          commandObj.refreshFromBuffer = undefined;
        }

        if (commandObj.rewritePosition !== undefined) {
          maskPos = commandObj.rewritePosition; // commandObj.rewritePosition = undefined;

          commandObj = true;
        }
      }

      return commandObj;
    }

    function _isValid(position, c, strict) {
      var rslt = false;
      $.each(getTests(position), function (ndx, tst) {
        var test = tst.match; //make sure the buffer is set and correct

        getBuffer(true); //return is false or a json object => { pos: ??, c: ??} or true

        rslt = test.fn != null ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? //non mask
        {
          c: getPlaceholder(position, test, true) || test.def,
          pos: position
        } : false;

        if (rslt !== false) {
          var elem = rslt.c !== undefined ? rslt.c : c,
              validatedPos = position;
          elem = elem === opts.skipOptionalPartCharacter && test["static"] === true ? getPlaceholder(position, test, true) || test.def : elem;
          rslt = processCommandObject(rslt);

          if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) {
            //their is a position offset
            validatedPos = rslt.pos;
          }

          if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
            return false; //breakout if nothing to insert
          }

          if (revalidateMask(pos, $.extend({}, tst, {
            "input": casing(elem, test, validatedPos)
          }), fromIsValid, validatedPos) === false) {
            rslt = false;
          }

          return false; //break from $.each
        }
      });
      return rslt;
    }

    var result = true,
        positionsClone = $.extend(true, {}, maskset.validPositions); //clone the currentPositions

    if (opts.keepStatic === false && maskset.excludes[maskPos] !== undefined && fromAlternate !== true && fromIsValid !== true) {
      for (var i = maskPos; i < (isRTL ? pos.begin : pos.end); i++) {
        if (maskset.excludes[i] !== undefined) {
          maskset.excludes[i] = undefined;
          delete maskset.tests[i];
        }
      }
    }

    if ($.isFunction(opts.preValidation) && fromIsValid !== true && validateOnly !== true && fromAlternate !== true) {
      result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, maskset, pos, strict);
      result = processCommandObject(result);
    }

    if (result === true) {
      //preValidation result
      if (maxLength === undefined || maskPos < maxLength) {
        result = _isValid(maskPos, c, strict);

        if ((!strict || fromIsValid === true) && result === false && validateOnly !== true) {
          var currentPosValid = maskset.validPositions[maskPos];

          if (currentPosValid && currentPosValid.match["static"] === true && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
            result = {
              "caret": seekNext(maskPos)
            };
          } else {
            if (opts.insertMode || maskset.validPositions[seekNext(maskPos)] === undefined || pos.end > maskPos) {
              //does the input match on a further position?
              var skip = false;

              if (maskset.jitOffset[maskPos] && maskset.validPositions[seekNext(maskPos)] === undefined) {
                result = isValid(maskPos + maskset.jitOffset[maskPos], c, true);

                if (result !== false) {
                  if (fromAlternate !== true) result.caret = maskPos;
                  skip = true;
                }
              }

              if (pos.end > maskPos) {
                maskset.validPositions[maskPos] = undefined;
              }

              if (!skip && !isMask(maskPos, true)) {
                for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
                  // if (!isMask(nPos, true)) {
                  // 	continue;
                  // }
                  result = _isValid(nPos, c, strict);

                  if (result !== false) {
                    result = trackbackPositions(maskPos, result.pos !== undefined ? result.pos : nPos) || result;
                    maskPos = nPos;
                    break;
                  }
                }
              }
            }
          }
        }
      } else {
        result = false;
      }

      if (result === false && (opts.keepStatic === false || isComplete(getBuffer()) || maskPos === 0) && !strict && fromAlternate !== true) {
        //try fuzzy alternator logic
        result = alternate(maskPos, c, strict, fromIsValid, undefined, pos);
      } else if (isSelection(pos) && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && opts.keepStatic === true && !strict && fromAlternate !== true) {
        //selection clears an alternated keepstatic mask ~ #2189
        result = alternate(true);
      }

      if (result === true) {
        result = {
          "pos": maskPos
        };
      }
    }

    if ($.isFunction(opts.postValidation) && result !== false && fromIsValid !== true && validateOnly !== true) {
      var postResult = opts.postValidation(getBuffer(true), pos.begin !== undefined ? isRTL ? pos.end : pos.begin : pos, result, opts, maskset, strict);

      if (postResult !== undefined) {
        result = postResult === true ? result : postResult;
      }
    }

    if (result && result.pos === undefined) {
      result.pos = maskPos;
    }

    if (result === false || validateOnly === true) {
      resetMaskSet(true);
      maskset.validPositions = $.extend(true, {}, positionsClone); //revert validation changes
    } else {
      trackbackPositions(undefined, maskPos, true);
    }

    var endResult = processCommandObject(result); // console.log("returned result " + JSON.stringify(endResult));

    return endResult;
  } //fill in best positions according the current input


  function trackbackPositions(originalPos, newPos, fillOnly) {
    // console.log("trackbackPositions " + originalPos + " " + newPos);
    if (originalPos === undefined) {
      //find previous valid
      for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
        if (maskset.validPositions[originalPos]) break;
      }
    }

    for (var ps = originalPos; ps < newPos; ps++) {
      if (maskset.validPositions[ps] === undefined && !isMask(ps, true)) {
        var vp = ps == 0 ? getTest(ps) : maskset.validPositions[ps - 1];

        if (vp) {
          var tests = getTests(ps).slice();
          if (tests[tests.length - 1].match.def === "") tests.pop();
          var bestMatch = determineTestTemplate(ps, tests),
              np;

          if (bestMatch && (bestMatch.match.jit !== true || bestMatch.match.newBlockMarker === "master" && (np = maskset.validPositions[ps + 1]) && np.match.optionalQuantifier === true)) {
            bestMatch = $.extend({}, bestMatch, {
              "input": getPlaceholder(ps, bestMatch.match, true) || bestMatch.match.def
            });
            bestMatch.generatedInput = true;
            revalidateMask(ps, bestMatch, true);

            if (fillOnly !== true) {
              //revalidate the new position to update the locator value
              var cvpInput = maskset.validPositions[newPos].input;
              maskset.validPositions[newPos] = undefined;
              return isValid(newPos, cvpInput, true, true);
            }
          }
        }
      }
    }
  }

  function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
    function IsEnclosedStatic(pos, valids, selection) {
      var posMatch = valids[pos];

      if (posMatch !== undefined && posMatch.match["static"] === true && posMatch.match.optionality !== true && (valids[0] === undefined || valids[0].alternation === undefined)) {
        var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match["static"] === true && valids[pos - 1] : valids[pos - 1],
            nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match["static"] === true && valids[pos + 1] : valids[pos + 1];
        return prevMatch && nextMatch;
      }

      return false;
    }

    var offset = 0,
        begin = pos.begin !== undefined ? pos.begin : pos,
        end = pos.end !== undefined ? pos.end : pos;

    if (pos.begin > pos.end) {
      begin = pos.end;
      end = pos.begin;
    }

    if (validTest === undefined && opts.insertMode === false && end < maskset.maskLength) {
      if (begin !== 0 || end !== 0) {
        begin += 1;
        end += 1;
      }
    }

    validatedPos = validatedPos !== undefined ? validatedPos : begin;

    if (begin !== end || opts.insertMode && maskset.validPositions[validatedPos] !== undefined && fromIsValid === undefined || validTest === undefined) {
      //reposition & revalidate others
      var positionsClone = $.extend(true, {}, maskset.validPositions),
          lvp = validTest === undefined && opts.insertMode === false ? end > 1 ? end - 1 : end : getLastValidPosition(undefined, true),
          i;
      maskset.p = begin; //needed for alternated position after overtype selection

      for (i = lvp; i >= begin; i--) {
        delete maskset.validPositions[i];
        if (validTest === undefined) delete maskset.tests[i + 1];
      }

      var valid = true,
          j = validatedPos,
          posMatch = j,
          t;
      i = j;

      if (validTest) {
        maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
        posMatch++;
        j++;
        if (begin < end) i++; //if selection and entry move start by one
      }

      if (validTest || opts.insertMode) {
        for (; i <= lvp; i++) {
          if ((t = positionsClone[i]) !== undefined && t.generatedInput !== true && (i >= end || i >= begin && IsEnclosedStatic(i, positionsClone, {
            begin: begin,
            end: end
          }))) {
            while (getTest(posMatch).match.def !== "") {
              //loop needed to match further positions
              if (positionCanMatchDefinition(posMatch, t, opts) || t.match.def === "+") {
                //validated match //we still need some hackery for the + validator (numeric alias)
                if (t.match.def === "+") getBuffer(true);
                var result = isValid(posMatch, t.input, t.match.def !== "+", t.match.def !== "+");
                valid = result !== false;
                j = (result.pos || posMatch) + 1;
                if (!valid) break;
              } else {
                valid = false;
              }

              if (valid) {
                if (validTest === undefined && t.match["static"] && i === pos.begin) offset++;
                break;
              }

              if (!valid && posMatch > maskset.maskLength) {
                break;
              }

              posMatch++;
            }

            if (getTest(posMatch).match.def == "") {
              valid = false;
            } //restore position


            posMatch = j;
          }

          if (!valid) break;
        }
      }

      if (!valid) {
        maskset.validPositions = $.extend(true, {}, positionsClone);
        resetMaskSet(true);
        return false;
      }
    } else if (validTest) {
      maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
    }

    resetMaskSet(true);
    return offset;
  }

  function isMask(pos, strict, fuzzy) {
    var test = getTestTemplate(pos).match;
    if (test.def === "") test = getTest(pos).match;

    if (test["static"] !== true) {
      return test.fn;
    }

    if (fuzzy === true && maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].generatedInput !== true) {
      return true;
    }

    if (strict !== true && pos > -1) {
      var tests = getTests(pos);
      return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
    }

    return false;
  }

  function seekNext(pos, newBlock) {
    var position = pos + 1;

    while (getTest(position).match.def !== "" && (newBlock === true && (getTest(position).match.newBlockMarker !== true || !isMask(position, undefined, true)) || newBlock !== true && !isMask(position, undefined, true))) {
      position++;
    }

    return position;
  }

  function seekPrevious(pos, newBlock) {
    var position = pos,
        tests;
    if (position <= 0) return 0;

    while (--position > 0 && (newBlock === true && getTest(position).match.newBlockMarker !== true || newBlock !== true && !isMask(position, undefined, true) && ( // eslint-disable-next-line no-empty
    tests = getTests(position), tests.length < 2 || tests.length === 2 && tests[1].match.def === ""))) {}

    return position;
  }

  function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
    if (event && $.isFunction(opts.onBeforeWrite)) {
      //    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
      var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);

      if (result) {
        if (result.refreshFromBuffer) {
          var refresh = result.refreshFromBuffer;
          refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
          buffer = getBuffer(true);
        }

        if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
      }
    }

    if (input !== undefined) {
      input.inputmask._valueSet(buffer.join(""));

      if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
        caret(input, caretPos);
      }

      if (triggerEvents === true) {
        var $input = $(input),
            nptVal = input.inputmask._valueGet();

        skipInputEvent = true;
        $input.trigger("input");
        setTimeout(function () {
          //timeout needed for IE
          if (nptVal === getBufferTemplate().join("")) {
            $input.trigger("cleared");
          } else if (isComplete(buffer) === true) {
            $input.trigger("complete");
          }
        }, 0);
      }
    }
  }

  function getPlaceholder(pos, test, returnPL) {
    test = test || getTest(pos).match;

    if (test.placeholder !== undefined || returnPL === true) {
      return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
    } else if (test["static"] === true) {
      if (pos > -1 && maskset.validPositions[pos] === undefined) {
        var tests = getTests(pos),
            staticAlternations = [],
            prevTest;

        if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
          for (var i = 0; i < tests.length; i++) {
            if (tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true && (tests[i].match["static"] === true || prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, maskset, pos, true, opts) !== false)) {
              staticAlternations.push(tests[i]);
              if (tests[i].match["static"] === true) prevTest = tests[i];

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

  function HandleNativePlaceholder(npt, value) {
    if (ie) {
      if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
        var buffer = getBuffer().slice(),
            nptValue = npt.inputmask._valueGet();

        if (nptValue !== value) {
          var lvp = getLastValidPosition();

          if (lvp === -1 && nptValue === getBufferTemplate().join("")) {
            buffer = [];
          } else if (lvp !== -1) {
            //clearout optional tail of the mask
            clearOptionalTail(buffer);
          }

          writeBuffer(npt, buffer);
        }
      }
    } else if (npt.placeholder !== value) {
      npt.placeholder = value;
      if (npt.placeholder === "") npt.removeAttribute("placeholder");
    }
  }

  function determineNewCaretPosition(selectedCaret, tabbed) {
    function doRadixFocus(clickPos) {
      if (opts.radixPoint !== "" && opts.digits !== 0) {
        var vps = maskset.validPositions;

        if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
          if (clickPos < seekNext(-1)) return true;
          var radixPos = $.inArray(opts.radixPoint, getBuffer());

          if (radixPos !== -1) {
            for (var vp in vps) {
              if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder(vp)) {
                return false;
              }
            }

            return true;
          }
        }
      }

      return false;
    }

    if (tabbed) {
      if (isRTL) {
        selectedCaret.end = selectedCaret.begin;
      } else {
        selectedCaret.begin = selectedCaret.end;
      }
    }

    if (selectedCaret.begin === selectedCaret.end) {
      switch (opts.positionCaretOnClick) {
        case "none":
          break;

        case "select":
          return {
            begin: 0,
            end: getBuffer().length
          };

        case "ignore":
          return seekNext(getLastValidPosition());

        case "radixFocus":
          if (doRadixFocus(selectedCaret.begin)) {
            var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
            return opts.numericInput ? seekNext(radixPos) : radixPos;
          }

        //fallback to lvp
        // eslint-disable-next-line no-fallthrough

        default:
          //lvp:
          var clickPosition = selectedCaret.begin,
              lvclickPosition = getLastValidPosition(clickPosition, true),
              lastPosition = seekNext(lvclickPosition === -1 && !isMask(0) ? 0 : lvclickPosition);

          if (clickPosition < lastPosition) {
            return !isMask(clickPosition, true) && !isMask(clickPosition - 1, true) ? seekNext(clickPosition) : clickPosition;
          } else {
            var lvp = maskset.validPositions[lvclickPosition],
                tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp),
                placeholder = getPlaceholder(lastPosition, tt.match);

            if (placeholder !== "" && getBuffer()[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
              var newPos = seekNext(lastPosition);

              if (clickPosition >= newPos || clickPosition === lastPosition) {
                lastPosition = newPos;
              }
            }

            return lastPosition;
          }

      }
    }
  }

  var EventRuler = {
    on: function on(input, eventName, eventHandler) {
      var ev = function ev(e) {
        e = e.originalEvent || e; //get original event from jquery evenbt

        var that = this,
            args;

        if (that.inputmask === undefined && this.nodeName !== "FORM") {
          //happens when cloning an object with jquery.clone
          var imOpts = $.data(that, "_inputmask_opts");

          if (imOpts) {
            new Inputmask(imOpts).mask(that);
          } else {
            EventRuler.off(that);
          }
        } else if (e.type !== "setvalue" && this.nodeName !== "FORM" && (that.disabled || that.readOnly && !(e.type === "keydown" && e.ctrlKey && e.keyCode === 67 || opts.tabThrough === false && e.keyCode === keyCode.TAB))) {
          e.preventDefault();
        } else {
          switch (e.type) {
            case "input":
              if (skipInputEvent === true || e.inputType && e.inputType === "insertCompositionText") {
                skipInputEvent = false;
                return e.preventDefault();
              }

              if (mobile) {
                args = arguments;
                setTimeout(function () {
                  //needed for caret selection when entering a char on Android 8 - #1818
                  eventHandler.apply(that, args);
                  caret(that, that.inputmask.caretPos, undefined, true);
                }, 0);
                return false;
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
            case "focus":
              if (validationEvent) {
                // #841
                validationEvent = false;
                input.blur();
                HandleNativePlaceholder(input, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""));
                setTimeout(function () {
                  input.focus();
                }, 3000);
                return false;
              }

              args = arguments;
              setTimeout(function () {
                //needed for Chrome ~ initial selection clears after the clickevent
                eventHandler.apply(that, args);
              }, 0);
              return false;
          }

          var returnVal = eventHandler.apply(that, arguments);

          if (returnVal === false) {
            e.preventDefault();
            e.stopPropagation();
          }

          return returnVal;
        }
      }; //keep instance of the event


      input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
      input.inputmask.events[eventName].push(ev);

      if ($.inArray(eventName, ["submit", "reset"]) !== -1) {
        if (input.form !== null) $(input.form).on(eventName, ev);
      } else {
        $(input).on(eventName, ev);
      }
    },
    off: function off(input, event) {
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
    keydownEvent: function keydownEvent(e) {
      var input = this,
          $input = $(input),
          k = e.keyCode,
          pos = caret(input);
      var kdResult = opts.onKeyDown.call(this, e, getBuffer(), pos, opts);
      if (kdResult !== undefined) return kdResult; //backspace, delete, and escape get special treatment

      if (k === keyCode.BACKSPACE || k === keyCode.DELETE || iphone && k === keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === keyCode.X && !("oncut" in input)) {
        //backspace/delete
        e.preventDefault(); //stop default action but allow propagation

        handleRemove(input, k, pos);
        writeBuffer(input, getBuffer(true), maskset.p, e, input.inputmask._valueGet() !== getBuffer().join(""));
      } else if (k === keyCode.END || k === keyCode.PAGE_DOWN) {
        //when END or PAGE_DOWN pressed set position at lastmatch
        e.preventDefault();
        var caretPos = seekNext(getLastValidPosition());
        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
      } else if (k === keyCode.HOME && !e.shiftKey || k === keyCode.PAGE_UP) {
        //Home or page_up
        e.preventDefault();
        caret(input, 0, e.shiftKey ? pos.begin : 0, true);
      } else if ((opts.undoOnEscape && k === keyCode.ESCAPE || k === 90 && e.ctrlKey) && e.altKey !== true) {
        //escape && undo && #762
        checkVal(input, true, false, undoValue.split(""));
        $input.trigger("click"); // } else if (k === keyCode.INSERT && !(e.shiftKey || e.ctrlKey) && inputmask.userOptions.insertMode === undefined) { //insert
        // 	opts.insertMode = !opts.insertMode;
        // 	caret(input, pos.begin, pos.end);
      } else if (opts.tabThrough === true && k === keyCode.TAB) {
        if (e.shiftKey === true) {
          if (getTest(pos.begin).match["static"] === true) {
            pos.begin = seekNext(pos.begin);
          }

          pos.end = seekPrevious(pos.begin, true);
          pos.begin = seekPrevious(pos.end, true);
        } else {
          pos.begin = seekNext(pos.begin, true);
          pos.end = seekNext(pos.begin, true);
          if (pos.end < maskset.maskLength) pos.end--;
        }

        if (pos.begin < maskset.maskLength) {
          e.preventDefault();
          caret(input, pos.begin, pos.end);
        }
      } else if (!e.shiftKey) {
        if (opts.insertMode === false) {
          if (k === keyCode.RIGHT) {
            setTimeout(function () {
              var caretPos = caret(input);
              caret(input, caretPos.begin);
            }, 0);
          } else if (k === keyCode.LEFT) {
            setTimeout(function () {
              var caretPos = {
                begin: translatePosition(input.inputmask.caretPos.begin),
                end: translatePosition(input.inputmask.caretPos.end)
              };

              if (isRTL) {
                caret(input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1));
              } else {
                caret(input, caretPos.begin - (caretPos.begin === 0 ? 0 : 1));
              }
            }, 0);
          }
        }
      }

      ignorable = $.inArray(k, opts.ignorables) !== -1;
    },
    keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
      var input = this,
          $input = $(input),
          k = e.which || e.charCode || e.keyCode;

      if (checkval !== true && !(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) {
        if (k === keyCode.ENTER && undoValue !== getBuffer().join("")) {
          undoValue = getBuffer().join(""); // e.preventDefault();

          setTimeout(function () {
            $input.trigger("change");
          }, 0);
        }

        skipInputEvent = true; //skip the input as otherwise the skipped char could be picked up for validation by the inputfallback

        return true;
      } else if (k) {
        //special treat the decimal separator
        if (k === 46 && e.shiftKey === false && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
        var pos = checkval ? {
          begin: ndx,
          end: ndx
        } : caret(input),
            forwardPosition,
            c = String.fromCharCode(k);
        maskset.writeOutBuffer = true;
        var valResult = isValid(pos, c, strict);

        if (valResult !== false) {
          resetMaskSet(true);
          forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos);
          maskset.p = forwardPosition; //needed for checkval
        }

        forwardPosition = opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition;

        if (writeOut !== false) {
          setTimeout(function () {
            opts.onKeyValidation.call(input, k, valResult, opts);
          }, 0);

          if (maskset.writeOutBuffer && valResult !== false) {
            var buffer = getBuffer();
            writeBuffer(input, buffer, forwardPosition, e, checkval !== true);
          }
        }

        e.preventDefault();

        if (checkval) {
          if (valResult !== false) valResult.forwardPosition = forwardPosition;
          return valResult;
        }
      }
    },
    pasteEvent: function pasteEvent(e) {
      var input = this,
          inputValue = input.inputmask._valueGet(true),
          caretPos = caret(input),
          tempValue;

      if (isRTL) {
        tempValue = caretPos.end;
        caretPos.end = caretPos.begin;
        caretPos.begin = tempValue;
      }

      var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
          valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
      if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
      if (valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("")) valueAfterCaret = "";

      if (window.clipboardData && window.clipboardData.getData) {
        // IE
        inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
      } else if (e.clipboardData && e.clipboardData.getData) {
        inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
      } else {
        return true;
      } //allow native paste event as fallback ~ masking will continue by inputfallback


      var pasteValue = inputValue;

      if ($.isFunction(opts.onBeforePaste)) {
        pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts);

        if (pasteValue === false) {
          return e.preventDefault();
        }

        if (!pasteValue) {
          pasteValue = inputValue;
        }
      }

      checkVal(input, false, false, pasteValue.toString().split(""));
      writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join(""));
      return e.preventDefault();
    },
    inputFallBackEvent: function inputFallBackEvent(e) {
      //fallback when keypress is not triggered
      function ieMobileHandler(input, inputValue, caretPos) {
        if (iemobile) {
          //iemobile just sets the character at the end althought the caret position is correctly set
          var inputChar = inputValue.replace(getBuffer().join(""), "");

          if (inputChar.length === 1) {
            var iv = inputValue.split("");
            iv.splice(caretPos.begin, 0, inputChar);
            inputValue = iv.join("");
          }
        }

        return inputValue;
      }

      function analyseChanges(inputValue, buffer, caretPos) {
        var frontPart = inputValue.substr(0, caretPos.begin).split(""),
            backPart = inputValue.substr(caretPos.begin).split(""),
            frontBufferPart = buffer.substr(0, caretPos.begin).split(""),
            backBufferPart = buffer.substr(caretPos.begin).split("");
        var fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length,
            bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length,
            bl,
            i,
            action = "",
            data = [],
            marker = "~",
            placeholder; //align buffers

        while (frontPart.length < fpl) {
          frontPart.push(marker);
        }

        while (frontBufferPart.length < fpl) {
          frontBufferPart.push(marker);
        }

        while (backPart.length < bpl) {
          backPart.unshift(marker);
        }

        while (backBufferPart.length < bpl) {
          backBufferPart.unshift(marker);
        }

        var newBuffer = frontPart.concat(backPart);
        var oldBuffer = frontBufferPart.concat(backBufferPart); // console.log("N " + newBuffer);
        // console.log("O " + oldBuffer);

        for (i = 0, bl = newBuffer.length; i < bl; i++) {
          placeholder = getPlaceholder(translatePosition(i));

          switch (action) {
            case "insertText":
              // if (oldBuffer[i] === placeholder && newBuffer[i] !== placeholder) {
              // 	data.push(newBuffer[i]);
              // 	caretPos.begin--;
              // } else {
              // breakout loop
              i = bl; // }

              break;

            case "insertReplacementText":
              if (newBuffer[i] === marker) {
                //extend selection
                caretPos.end++;
              } else {
                // breakout loop
                i = bl;
              }

              break;

            case "deleteContentBackward":
              if (newBuffer[i] === marker) {
                caretPos.end++;
              } else {
                //breakout loop
                i = bl;
              }

              break;

            default:
              if (newBuffer[i] !== oldBuffer[i]) {
                if (
                /*newBuffer[i] !== placeholder &&*/
                oldBuffer[i] === placeholder && oldBuffer[i + 1] === marker || oldBuffer[i] === marker) {
                  //basic insert
                  action = "insertText";
                  data.push(newBuffer[i]);
                  caretPos.begin--;
                  caretPos.end--;
                } else if (oldBuffer[i + 1] === marker && oldBuffer[i] === newBuffer[i + 1]) {
                  //insert between
                  action = "insertText";
                  data.push(newBuffer[i]);
                  caretPos.begin--;
                  caretPos.end--;
                } else if (newBuffer[i] !== placeholder && newBuffer[i] !== marker && (newBuffer[i + 1] === marker || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]
                /*single char replacement*/
                )) {
                  //replace selection
                  action = "insertReplacementText";
                  data.push(newBuffer[i]);
                  caretPos.begin--;
                } else if (newBuffer[i] === marker) {
                  //delete~backspace
                  action = "deleteContentBackward";
                  if (isMask(translatePosition(i), true)) caretPos.end++;
                } else {
                  i = bl;
                }
              }

              break;
          }
        }

        return {
          action: action,
          data: data,
          caret: caretPos
        };
      }

      var input = this,
          inputValue = input.inputmask._valueGet(true),
          buffer = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""),
          caretPos = caret(input, undefined, undefined, true);

      if (buffer !== inputValue) {
        // inputValue = radixPointHandler(input, inputValue, caretPos);
        inputValue = ieMobileHandler(input, inputValue, caretPos);
        var changes = analyseChanges(inputValue, buffer, caretPos); // console.log(JSON.stringify(changes));

        if (document.activeElement !== input) {
          input.focus();
        }

        writeBuffer(input, getBuffer());
        caret(input, caretPos.begin, caretPos.end, true);

        switch (changes.action) {
          case "insertText":
          case "insertReplacementText":
            $.each(changes.data, function (ndx, entry) {
              var keypress = new $.Event("keypress");
              keypress.which = entry.charCodeAt(0);
              ignorable = false; //make sure ignorable is ignored ;-)

              EventHandlers.keypressEvent.call(input, keypress);
            });
            setTimeout(function () {
              //#2195 trigger keyup to help some other plugins to track changes
              $el.trigger("keyup");
            }, 0);
            break;

          case "deleteContentBackward":
            var keydown = new $.Event("keydown");
            keydown.keyCode = keyCode.BACKSPACE;
            EventHandlers.keydownEvent.call(input, keydown);
            break;

          default:
            applyInputValue(input, inputValue);
            break;
        }

        e.preventDefault();
      }
    },
    compositionendEvent: function compositionendEvent(e) {
      $el.trigger("input");
    },
    setValueEvent: function setValueEvent(e) {
      var input = this,
          value = e && e.detail ? e.detail[0] : arguments[1];

      if (value === undefined) {
        value = input.inputmask._valueGet(true);
      }

      applyInputValue(input, value);

      if (e.detail && e.detail[1] !== undefined || arguments[2] !== undefined) {
        caret(input, e.detail ? e.detail[1] : arguments[2]);
      }
    },
    focusEvent: function focusEvent(e) {
      var input = this,
          nptValue = input.inputmask._valueGet();

      if (opts.showMaskOnFocus) {
        if (nptValue !== getBuffer().join("")) {
          writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
        }
        /*else if (mouseEnter === false) { //only executed on focus without mouseenter
        caret(input, seekNext(getLastValidPosition()));
        }*/

      }

      if (opts.positionCaretOnTab === true && mouseEnter === false && (!isComplete(getBuffer()) || getLastValidPosition() === -1)) {
        EventHandlers.clickEvent.apply(input, [e, true]);
      }

      undoValue = getBuffer().join("");
    },
    invalidEvent: function invalidEvent(e) {
      validationEvent = true;
    },
    mouseleaveEvent: function mouseleaveEvent() {
      var input = this;
      mouseEnter = false;

      if (opts.clearMaskOnLostFocus && document.activeElement !== input) {
        HandleNativePlaceholder(input, originalPlaceholder);
      }
    },
    clickEvent: function clickEvent(e, tabbed) {
      var input = this;

      if (document.activeElement === input) {
        var newCaretPosition = determineNewCaretPosition(caret(input), tabbed);

        if (newCaretPosition !== undefined) {
          caret(input, newCaretPosition);
        }
      }
    },
    cutEvent: function cutEvent(e) {
      var input = this,
          pos = caret(input); //correct clipboardData

      var clipboardData = window.clipboardData || e.clipboardData,
          clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
      clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join(""));
      if (document.execCommand) document.execCommand("copy"); // copy selected content to system clipbaord

      handleRemove(input, keyCode.DELETE, pos);
      writeBuffer(input, getBuffer(), maskset.p, e, undoValue !== getBuffer().join(""));
    },
    blurEvent: function blurEvent(e) {
      var $input = $(this),
          input = this;

      if (input.inputmask) {
        HandleNativePlaceholder(input, originalPlaceholder);

        var nptValue = input.inputmask._valueGet(),
            buffer = getBuffer().slice();

        if (nptValue !== "") {
          if (opts.clearMaskOnLostFocus) {
            if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
              buffer = [];
            } else {
              //clearout optional tail of the mask
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
          undoValue = getBuffer().join("");
          $input.trigger("change");
        }
      }
    },
    mouseenterEvent: function mouseenterEvent() {
      var input = this;
      mouseEnter = true;

      if (document.activeElement !== input) {
        if (originalPlaceholder == undefined && input.placeholder !== originalPlaceholder) {
          originalPlaceholder = input.placeholder;
        }

        if (opts.showMaskOnHover) {
          HandleNativePlaceholder(input, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""));
        }
      }
    },
    submitEvent: function submitEvent() {
      //trigger change on submit if any
      if (undoValue !== getBuffer().join("")) {
        $el.trigger("change");
      }

      if (opts.clearMaskOnLostFocus && getLastValidPosition() === -1 && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("")) {
        el.inputmask._valueSet(""); //clear masktemplete on submit and still has focus

      }

      if (opts.clearIncomplete && isComplete(getBuffer()) === false) {
        el.inputmask._valueSet("");
      }

      if (opts.removeMaskOnSubmit) {
        el.inputmask._valueSet(el.inputmask.unmaskedvalue(), true);

        setTimeout(function () {
          writeBuffer(el, getBuffer());
        }, 0);
      }
    },
    resetEvent: function resetEvent() {
      el.inputmask.refreshValue = true; //indicate a forced refresh when there is a call to the value before leaving the triggering event fn

      setTimeout(function () {
        applyInputValue(el, el.inputmask._valueGet(true));
      }, 0);
    }
  };

  function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
    var inputmask = this || input.inputmask,
        inputValue = nptvl.slice(),
        charCodes = "",
        initialNdx = -1,
        result = undefined; // console.log(nptvl);

    function isTemplateMatch(ndx, charCodes) {
      if (opts.regex) return false;
      var targetTemplate = getMaskTemplate(true, 0, false).slice(ndx, seekNext(ndx)).join("").replace(/'/g, ""),
          charCodeNdx = targetTemplate.indexOf(charCodes); //strip spaces from targetTemplate

      while (charCodeNdx > 0 && targetTemplate[charCodeNdx - 1] === " ") {
        charCodeNdx--;
      }

      var match = charCodeNdx === 0 && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || getTest(ndx).match["static"] === true && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || getTest(ndx).match.nativeDef === " " && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || getTest(ndx + 1).match["static"] === true && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
      if (!match && charCodeNdx > 0) inputmask.caretPos = {
        begin: seekNext(charCodeNdx)
      };
      return match;
    }

    resetMaskSet();
    maskset.tests = {}; //reset tests ~ possible after alternating

    initialNdx = opts.radixPoint ? determineNewCaretPosition(0) : 0;
    maskset.p = initialNdx;
    inputmask.caretPos = {
      begin: initialNdx
    };
    var staticMatches = [],
        prevCaretPos = inputmask.caretPos;
    $.each(inputValue, function (ndx, charCode) {
      if (charCode !== undefined) {
        //inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
        if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, true) && isValid(ndx, inputValue[ndx], true, undefined, undefined, true) === false) {
          maskset.p++;
        } else {
          var keypress = new $.Event("_checkval");
          keypress.which = charCode.toString().charCodeAt(0);
          charCodes += charCode;
          var lvp = getLastValidPosition(undefined, true);

          if (!isTemplateMatch(initialNdx, charCodes)) {
            result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, inputmask.caretPos.begin);

            if (result) {
              initialNdx = inputmask.caretPos.begin + 1;
              charCodes = "";
            }
          } else {
            result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, lvp + 1);
          }

          if (result) {
            if (result.pos !== undefined && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match["static"] === true) {
              staticMatches.push(result.pos);

              if (!isRTL) {
                result.forwardPosition = result.pos + 1;
              }
            }

            writeBuffer(undefined, getBuffer(), result.forwardPosition, keypress, false);
            inputmask.caretPos = {
              begin: result.forwardPosition,
              end: result.forwardPosition
            };
            prevCaretPos = inputmask.caretPos;
          } else {
            inputmask.caretPos = prevCaretPos;
          } //restore the caret position from before the failed validation

        }
      }
    });

    if (staticMatches.length > 0) {
      var sndx, validPos, nextValid;

      if (!isComplete(getBuffer()) || staticMatches.length < seekNext(0)) {
        while ((sndx = staticMatches.pop()) !== undefined) {
          if (sndx !== staticMatches.length) {
            var keypress = new $.Event("_checkval"),
                nextSndx = sndx + 1;
            validPos = maskset.validPositions[sndx];
            validPos.generatedInput = true;
            keypress.which = validPos.input.charCodeAt(0);

            while ((nextValid = maskset.validPositions[nextSndx]) && nextValid.input === validPos.input) {
              nextSndx++;
            }

            result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, nextSndx);

            if (result && result.pos !== undefined && result.pos !== sndx && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match["static"] === true) {
              staticMatches.push(result.pos);
            }
          }
        }
      } else {
        //mark al statics as generated
        while (sndx = staticMatches.pop()) {
          validPos = maskset.validPositions[sndx];

          if (validPos) {
            validPos.generatedInput = true;
          }
        }
      }
    }

    if (writeOut) {
      writeBuffer(input, getBuffer(), result ? result.forwardPosition : undefined, initiatingEvent || new $.Event("checkval"), initiatingEvent && initiatingEvent.type === "input");
    }
  }

  function unmaskedvalue(input) {
    if (input) {
      if (input.inputmask === undefined) {
        return input.value;
      }

      if (input.inputmask && input.inputmask.refreshValue) {
        //forced refresh from the value form.reset
        applyInputValue(input, input.inputmask._valueGet(true));
      }
    }

    var umValue = [],
        vps = maskset.validPositions;

    for (var pndx in vps) {
      if (vps[pndx] && vps[pndx].match && vps[pndx].match["static"] != true) {
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

  function translatePosition(pos) {
    if (isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
      pos = el.inputmask._valueGet().length - pos;
    }

    return pos;
  }

  function caret(input, begin, end, notranslate) {
    var range;

    if (begin !== undefined) {
      if ($.isArray(begin)) {
        end = isRTL ? begin[0] : begin[1];
        begin = isRTL ? begin[1] : begin[0];
      }

      if (begin.begin !== undefined) {
        end = isRTL ? begin.begin : begin.end;
        begin = isRTL ? begin.end : begin.begin;
      }

      if (typeof begin === "number") {
        begin = notranslate ? begin : translatePosition(begin);
        end = notranslate ? end : translatePosition(end);
        end = typeof end == "number" ? end : begin; // if (!$(input).is(":visible")) {
        // 	return;
        // }

        var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
        input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
        input.inputmask.caretPos = {
          begin: begin,
          end: end
        }; //track caret internally

        if (opts.insertMode === false && begin === end) end++; //set visualization for insert/overwrite mode

        if (input === document.activeElement) {
          if ("setSelectionRange" in input) {
            input.setSelectionRange(begin, end);
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
            sel.addRange(range); //input.focus();
          } else if (input.createTextRange) {
            range = input.createTextRange();
            range.collapse(true);
            range.moveEnd("character", end);
            range.moveStart("character", begin);
            range.select();
          }
        }
      }
    } else {
      if ("selectionStart" in input && "selectionEnd" in input) {
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

      if (opts.insertMode === false && begin === end - 1) end--; //correct caret for insert/overwrite mode

      /*eslint-disable consistent-return */

      return {
        "begin": notranslate ? begin : translatePosition(begin),
        "end": notranslate ? end : translatePosition(end)
      };
      /*eslint-enable consistent-return */
    }
  }

  function determineLastRequiredPosition(returnDefinition) {
    var buffer = getMaskTemplate(true, getLastValidPosition(), true, true),
        bl = buffer.length,
        pos,
        lvp = getLastValidPosition(),
        positions = {},
        lvTest = maskset.validPositions[lvp],
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

      if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match["static"] != true || testPos.match["static"] === true && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && getTests(pos)[0].def !== "")) && buffer[pos] === getPlaceholder(pos, testPos.match)) {
        bl--;
      } else {
        break;
      }
    }

    return returnDefinition ? {
      "l": bl,
      "def": positions[bl] ? positions[bl].match : undefined
    } : bl;
  }

  function clearOptionalTail(buffer) {
    buffer.length = 0;
    var template = getMaskTemplate(true, 0, true, undefined, true),
        lmnt;

    while ((lmnt = template.shift()) !== undefined) {
      buffer.push(lmnt);
    }

    return buffer;
  }

  function isComplete(buffer) {
    //return true / false / undefined (repeat *)
    if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
    if (opts.repeat === "*") return undefined;
    var complete = false,
        lrp = determineLastRequiredPosition(true),
        aml = seekPrevious(lrp.l);

    if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
      complete = true;

      for (var i = 0; i <= aml; i++) {
        var test = getTestTemplate(i).match;

        if (test["static"] !== true && maskset.validPositions[i] === undefined && test.optionality !== true && test.optionalQuantifier !== true || test["static"] === true && buffer[i] !== getPlaceholder(i, test)) {
          complete = false;
          break;
        }
      }
    }

    return complete;
  }

  function handleRemove(input, k, pos, strict, fromIsValid) {
    if (opts.numericInput || isRTL) {
      if (k === keyCode.BACKSPACE) {
        k = keyCode.DELETE;
      } else if (k === keyCode.DELETE) {
        k = keyCode.BACKSPACE;
      }

      if (isRTL) {
        var pend = pos.end;
        pos.end = pos.begin;
        pos.begin = pend;
      }
    }

    if (k === keyCode.BACKSPACE || k === keyCode.DELETE && opts.insertMode === false) {
      if (pos.end - pos.begin < 1) {
        pos.begin = seekPrevious(pos.begin);

        if (maskset.validPositions[pos.begin] !== undefined && maskset.validPositions[pos.begin].input === opts.groupSeparator) {
          pos.begin--;
        }
      }
    } else if (k === keyCode.DELETE) {
      if (pos.begin === pos.end) {
        pos.end = isMask(pos.end, true, true)
        /*&& (maskset.validPositions[pos.end] && maskset.validPositions[pos.end].input !== opts.radixPoint)*/
        ? pos.end + 1 : seekNext(pos.end) + 1;

        if (maskset.validPositions[pos.begin] !== undefined && maskset.validPositions[pos.begin].input === opts.groupSeparator) {
          pos.end++;
        }
      }
    }

    var offset;

    if ((offset = revalidateMask(pos)) !== false) {
      if (strict !== true && opts.keepStatic !== false || opts.regex !== null && getTest(pos.begin).match.def.indexOf("|") !== -1) {
        //TODO NEEDS BETTER CHECK WHEN TO ALTERNATE  ~ opts regex isn"t good enough
        var result = alternate(true);

        if (result) {
          var newPos = result.caret !== undefined ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, true);

          if (k !== keyCode.DELETE || pos.begin > newPos) {
            pos.begin == newPos;
          }
        }
      }

      var lvp = getLastValidPosition(pos.end, true);

      if (lvp < pos.begin) {
        maskset.p = opts.insertMode === false ? seekPrevious(lvp + 1) : seekNext(lvp);
      } else if (strict !== true) {
        maskset.p = k === keyCode.DELETE ? pos.begin + offset : pos.begin;

        if (opts.insertMode === false && k === keyCode.DELETE) {
          maskset.p = pos.end + 1;

          if (maskset.validPositions[maskset.p] === undefined && getLastValidPosition(maskset.maskLength, true) < maskset.p) {
            maskset.p = seekPrevious(lvp + 1);
          }
        }
      }
    }
  }

  function applyInputValue(input, value) {
    input.inputmask.refreshValue = false;
    if ($.isFunction(opts.onBeforeMask)) value = opts.onBeforeMask.call(inputmask, value, opts) || value;
    value = value.toString().split("");
    checkVal(input, true, false, value);
    undoValue = getBuffer().join("");

    if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && getLastValidPosition() === -1) {
      input.inputmask._valueSet("");
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
              get: function get(elem) {
                if (elem.inputmask) {
                  if (elem.inputmask.opts.autoUnmask) {
                    return elem.inputmask.unmaskedvalue();
                  } else {
                    var result = valhookGet(elem);
                    return getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                  }
                } else {
                  return valhookGet(elem);
                }
              },
              set: function set(elem, value) {
                var result = valhookSet(elem, value);

                if (elem.inputmask) {
                  applyInputValue(elem, value);
                }

                return result;
              },
              inputmaskpatch: true
            };
          }
        }

        function getter() {
          if (this.inputmask) {
            return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : getLastValidPosition() !== -1 || opts.nullable !== true ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "";
          } else {
            return valueGet.call(this);
          }
        }

        function setter(value) {
          valueSet.call(this, value);

          if (this.inputmask) {
            applyInputValue(this, value);
          }
        }

        function installNativeValueSetFallback(npt) {
          EventRuler.on(npt, "mouseenter", function () {
            var input = this,
                value = input.inputmask._valueGet(true);

            if (value !== (isRTL ? getBuffer().reverse() : getBuffer()).join("")) {
              //Is this correct? to apply RTL? TOCHECK
              applyInputValue(input, value);
            }
          });
        }

        if (!npt.inputmask.__valueGet) {
          if (opts.noValuePatching !== true) {
            if (Object.getOwnPropertyDescriptor) {
              if (typeof Object.getPrototypeOf !== "function") {
                Object.getPrototypeOf = _typeof("test".__proto__) === "object" ? function (object) {
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
              } else if (npt.tagName.toLowerCase() !== "input") {
                valueGet = function valueGet() {
                  return this.textContent;
                };

                valueSet = function valueSet(value) {
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

          npt.inputmask._valueSet = function (value, overruleRTL) {
            //null check is needed for IE8 => otherwise converts to "null"
            valueSet.call(this.el, value === null || value === undefined ? "" : overruleRTL !== true && isRTL ? value.split("").reverse().join("") : value);
          };

          if (valueGet === undefined) {
            //jquery.val fallback
            valueGet = function valueGet() {
              return this.value;
            };

            valueSet = function valueSet(value) {
              this.value = value;
            };

            patchValhook(npt.type);
            installNativeValueSetFallback(npt);
          }
        }
      }

      if (input.tagName.toLowerCase() !== "textarea") {
        opts.ignorables.push(keyCode.ENTER);
      }

      var elementType = input.getAttribute("type");
      var isSupported = input.tagName.toLowerCase() === "input" && $.inArray(elementType, opts.supportsInputType) !== -1 || input.isContentEditable || input.tagName.toLowerCase() === "textarea";

      if (!isSupported) {
        if (input.tagName.toLowerCase() === "input") {
          var el = document.createElement("input");
          el.setAttribute("type", elementType);
          isSupported = el.type === "text"; //apply mask only if the type is not natively supported

          el = null;
        } else {
          isSupported = "partial";
        }
      }

      if (isSupported !== false) {
        patchValueProperty(input);
      } else {
        input.inputmask = undefined;
      }

      return isSupported;
    } //unbind all events - to make sure that no other mask will interfere when re-masking


    EventRuler.off(elem);
    var isSupported = isElementTypeSupported(elem, opts);

    if (isSupported !== false) {
      el = elem;
      $el = $(el);
      originalPlaceholder = el.placeholder; //read maxlength prop from el

      maxLength = el !== undefined ? el.maxLength : undefined;
      if (maxLength === -1) maxLength = undefined;

      if ("inputMode" in el && el.getAttribute("inputmode") === null) {
        el.inputMode = opts.inputmode;
        el.setAttribute("inputmode", opts.inputmode);
      }

      if (isSupported === true) {
        opts.showMaskOnFocus = opts.showMaskOnFocus && ["cc-number", "cc-exp"].indexOf(el.autocomplete) === -1; //bind events

        EventRuler.on(el, "submit", EventHandlers.submitEvent);
        EventRuler.on(el, "reset", EventHandlers.resetEvent);
        EventRuler.on(el, "blur", EventHandlers.blurEvent);
        EventRuler.on(el, "focus", EventHandlers.focusEvent);
        EventRuler.on(el, "invalid", EventHandlers.invalidEvent);
        EventRuler.on(el, "click", EventHandlers.clickEvent);
        EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
        EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
        EventRuler.on(el, "paste", EventHandlers.pasteEvent);
        EventRuler.on(el, "cut", EventHandlers.cutEvent);
        EventRuler.on(el, "complete", opts.oncomplete);
        EventRuler.on(el, "incomplete", opts.onincomplete);
        EventRuler.on(el, "cleared", opts.oncleared);

        if (!mobile && opts.inputEventOnly !== true) {
          EventRuler.on(el, "keydown", EventHandlers.keydownEvent);
          EventRuler.on(el, "keypress", EventHandlers.keypressEvent);
        } else {
          el.removeAttribute("maxLength");
        }

        EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
        EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent); // EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent); //https://github.com/w3c/input-events - to implement
      }

      EventRuler.on(el, "setvalue", EventHandlers.setValueEvent); //apply mask

      undoValue = getBufferTemplate().join(""); //initialize the buffer and getmasklength

      if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || document.activeElement === el) {
        applyInputValue(el, el.inputmask._valueGet(true), opts);
        var buffer = getBuffer().slice(); // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.

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

        if (opts.clearMaskOnLostFocus === false || opts.showMaskOnFocus && document.activeElement === el || el.inputmask._valueGet(true) !== "") {
          writeBuffer(el, buffer);
        }

        if (document.activeElement === el) {
          //position the caret when in focus
          caret(el, seekNext(getLastValidPosition()));
        }
      }
    }
  } //action object


  var valueBuffer;

  if (actionObj !== undefined) {
    switch (actionObj.action) {
      case "isComplete":
        el = actionObj.el;
        return isComplete(getBuffer());

      case "unmaskedvalue":
        if (el === undefined || actionObj.value !== undefined) {
          valueBuffer = actionObj.value;
          valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer : valueBuffer).split("");
          checkVal.call(this, undefined, false, false, valueBuffer);
          if ($.isFunction(opts.onBeforeWrite)) opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts);
        }

        return unmaskedvalue(el);

      case "mask":
        mask(el);
        break;

      case "format":
        valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split("");
        checkVal.call(this, undefined, true, false, valueBuffer);

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
          valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split("");
          checkVal.call(this, undefined, true, false, valueBuffer);
        } else {
          actionObj.value = isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
        }

        var buffer = getBuffer();
        var rl = determineLastRequiredPosition(),
            lmib = buffer.length - 1;

        for (; lmib > rl; lmib--) {
          if (isMask(lmib)) break;
        }

        buffer.splice(rl, lmib + 1 - rl);
        return isComplete(buffer) && actionObj.value === (isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""));

      case "getemptymask":
        return getBufferTemplate().join("");

      case "remove":
        if (el && el.inputmask) {
          $.data(el, "_inputmask_opts", null); //invalidate

          $el = $(el); //writeout the value

          var cv = opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(opts.autoUnmask);
          if (cv !== getBufferTemplate().join("")) el.inputmask._valueSet(cv, opts.autoUnmask);else el.inputmask._valueSet(""); //unbind all events

          EventRuler.off(el); //restore the value property

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
          } //clear data


          el.inputmask = undefined;
        }

        return el;

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
};

/***/ }),
/* 7 */
/***/ (function(module) {

module.exports = JSON.parse("{\"BACKSPACE\":8,\"BACKSPACE_SAFARI\":127,\"DELETE\":46,\"DOWN\":40,\"END\":35,\"ENTER\":13,\"ESCAPE\":27,\"HOME\":36,\"INSERT\":45,\"LEFT\":37,\"PAGE_DOWN\":34,\"PAGE_UP\":33,\"RIGHT\":39,\"SPACE\":32,\"TAB\":9,\"UP\":38,\"X\":88,\"CONTROL\":17}");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
var Inputmask = __webpack_require__(2),
    $ = Inputmask.dependencyLib,
    keyCode = __webpack_require__(7),
    //supported codes for formatting
//http://blog.stevenlevithan.com/archives/date-time-format
//https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7
formatCode = {
  //regex, valueSetter, type, displayformatter
  d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
  //Day of the month as digits; no leading zero for single-digit days.
  dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
    return pad(Date.prototype.getDate.call(this), 2);
  }],
  //Day of the month as digits; leading zero for single-digit days.
  ddd: [""],
  //Day of the week as a three-letter abbreviation.
  dddd: [""],
  //Day of the week as its full name.
  m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
    return Date.prototype.getMonth.call(this) + 1;
  }],
  //Month as digits; no leading zero for single-digit months.
  mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
    return pad(Date.prototype.getMonth.call(this) + 1, 2);
  }],
  //Month as digits; leading zero for single-digit months.
  mmm: [""],
  //Month as a three-letter abbreviation.
  mmmm: [""],
  //Month as its full name.
  yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
    return pad(Date.prototype.getFullYear.call(this), 2);
  }],
  //Year as last two digits; leading zero for years less than 10.
  yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
    return pad(Date.prototype.getFullYear.call(this), 4);
  }],
  h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
  //Hours; no leading zero for single-digit hours (12-hour clock).
  hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
    return pad(Date.prototype.getHours.call(this), 2);
  }],
  //Hours; leading zero for single-digit hours (12-hour clock).
  hx: [function (x) {
    return "[0-9]{".concat(x, "}");
  }, Date.prototype.setHours, "hours", Date.prototype.getHours],
  //Hours; no limit; set maximum digits
  H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
  //Hours; no leading zero for single-digit hours (24-hour clock).
  HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
    return pad(Date.prototype.getHours.call(this), 2);
  }],
  //Hours; leading zero for single-digit hours (24-hour clock).
  Hx: [function (x) {
    return "[0-9]{".concat(x, "}");
  }, Date.prototype.setHours, "hours", Date.prototype.getHours],
  //Hours; no limit; set maximum digits
  M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
  //Minutes; no leading zero for single-digit minutes. Uppercase M unlike CF timeFormat's m to avoid conflict with months.
  MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
    return pad(Date.prototype.getMinutes.call(this), 2);
  }],
  //Minutes; leading zero for single-digit minutes. Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
  s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
  //Seconds; no leading zero for single-digit seconds.
  ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
    return pad(Date.prototype.getSeconds.call(this), 2);
  }],
  //Seconds; leading zero for single-digit seconds.
  l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
    return pad(Date.prototype.getMilliseconds.call(this), 3);
  }],
  //Milliseconds. 3 digits.
  L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
    return pad(Date.prototype.getMilliseconds.call(this), 2);
  }],
  //Milliseconds. 2 digits.
  t: ["[ap]"],
  //Lowercase, single-character time marker string: a or p.
  tt: ["[ap]m"],
  //two-character time marker string: am or pm.
  T: ["[AP]"],
  //single-character time marker string: A or P.
  TT: ["[AP]M"],
  //two-character time marker string: AM or PM.
  Z: [""],
  //US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
  o: [""],
  //GMT/UTC timezone offset, e.g. -0500 or +0230.
  S: [""] //The date's ordinal suffix (st, nd, rd, or th).

},
    formatAlias = {
  isoDate: "yyyy-mm-dd",
  //2007-06-09
  isoTime: "HH:MM:ss",
  //17:46:21
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  //2007-06-09T17:46:21
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'" //2007-06-09T22:46:21Z

};

function formatcode(match) {
  var dynMatches = new RegExp("\\d+$").exec(match[0]);

  if (dynMatches && dynMatches[0] !== undefined) {
    var fcode = formatCode[match[0][0] + "x"].slice("");
    fcode[0] = fcode[0](dynMatches[0]);
    return fcode;
  } else if (formatCode[match[0]]) {
    return formatCode[match[0]];
  }
}

function getTokenizer(opts) {
  if (!opts.tokenizer) {
    var tokens = [],
        dyntokens = [];

    for (var ndx in formatCode) {
      if (ndx.endsWith("x")) {
        var dynToken = ndx[0] + "\\d+";

        if (dyntokens.indexOf(dynToken) === -1) {
          dyntokens.push(dynToken);
        }
      } else if (tokens.indexOf(ndx[0]) === -1) {
        tokens.push(ndx[0]);
      }
    }

    opts.tokenizer = "(" + (dyntokens.length > 0 ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.";
    opts.tokenizer = new RegExp(opts.tokenizer, "g");
  }

  return opts.tokenizer;
}

function isValidDate(dateParts, currentResult) {
  return !isFinite(dateParts.rawday) || dateParts.day == "29" && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day ? currentResult : false; //take corrective action if possible
}

function isDateInRange(dateParts, opts) {
  var result = true;

  if (opts.min) {
    if (dateParts["rawyear"]) {
      var rawYear = dateParts["rawyear"].replace(/[^0-9]/g, ""),
          minYear = opts.min.year.substr(0, rawYear.length);
      result = minYear <= rawYear;
    }

    if (dateParts["year"] === dateParts["rawyear"]) {
      if (opts.min.date.getTime() === opts.min.date.getTime()) {
        result = opts.min.date.getTime() <= dateParts.date.getTime();
      }
    }
  }

  if (result && opts.max && opts.max.date.getTime() === opts.max.date.getTime()) {
    result = opts.max.date.getTime() >= dateParts.date.getTime();
  }

  return result;
} //parse the given format and return a mask pattern
//when a dateObjValue is passed a datestring in the requested format is returned


function parse(format, dateObjValue, opts, raw) {
  //parse format to regex string
  var mask = "",
      match,
      fcode;
  getTokenizer(opts).lastIndex = 0;

  while (match = getTokenizer(opts).exec(format)) {
    if (dateObjValue === undefined) {
      if (fcode = formatcode(match)) {
        mask += "(" + fcode[0] + ")";
      } else {
        switch (match[0]) {
          case "[":
            mask += "(";
            break;

          case "]":
            mask += ")?";
            break;

          default:
            mask += Inputmask.escapeRegex(match[0]);
        }
      }
    } else {
      if (fcode = formatcode(match)) {
        if (raw !== true && fcode[3]) {
          var getFn = fcode[3];
          mask += getFn.call(dateObjValue.date);
        } else if (fcode[2]) {
          mask += dateObjValue["raw" + fcode[2]];
        } else {
          mask += match[0];
        }
      } else {
        mask += match[0];
      }
    }
  }

  return mask;
} //padding function


function pad(val, len) {
  val = String(val);
  len = len || 2;

  while (val.length < len) {
    val = "0" + val;
  }

  return val;
}

function analyseMask(maskString, format, opts) {
  var dateObj = {
    "date": new Date(1, 0, 1)
  },
      targetProp,
      mask = maskString,
      match,
      dateOperation;

  function extendProperty(value) {
    var correctedValue = value.replace(/[^0-9]/g, "0"); // if (correctedValue != value) { //only do correction on incomplete values
    //     //determine best validation match
    //     var enteredPart = value.replace(/[^0-9]/g, ""),
    //         enteredPartIndex = value.indexOf(enteredPart),
    //         minPart = (opts.min && opts.min[targetProp] || value).slice(enteredPartIndex, enteredPartIndex + enteredPart.length),
    //         maxPart = (opts.max && opts.max[targetProp] || value).slice(enteredPartIndex, enteredPartIndex + enteredPart.length),
    //         correctedPart = enteredPart < minPart ? minPart : (enteredPart > maxPart ? maxPart : correctedValue.slice(enteredPartIndex, enteredPartIndex + enteredPart.length));
    //     correctedValue = correctedValue.split("");
    //     correctedValue.splice(enteredPartIndex, 1, correctedPart);
    //     correctedValue = correctedValue.join("");
    // }

    return correctedValue;
  }

  function setValue(dateObj, value, opts) {
    dateObj[targetProp] = extendProperty(value);
    dateObj["raw" + targetProp] = value;

    if (dateOperation !== undefined) {
      dateOperation.call(dateObj.date, targetProp == "month" ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
    }
  }

  if (typeof mask === "string") {
    getTokenizer(opts).lastIndex = 0;

    while (match = getTokenizer(opts).exec(format)) {
      var value = mask.slice(0, match[0].length);

      if (formatCode.hasOwnProperty(match[0])) {
        // targetValidator = formatCode[match[0]][0];
        targetProp = formatCode[match[0]][2];
        dateOperation = formatCode[match[0]][1];
        setValue(dateObj, value, opts);
      }

      mask = mask.slice(value.length);
    }

    return dateObj;
  } else if (mask && _typeof(mask) === "object" && mask.hasOwnProperty("date")) {
    return mask;
  }

  return undefined;
}

Inputmask.extendAliases({
  "datetime": {
    mask: function mask(opts) {
      //localize
      formatCode.S = opts.i18n.ordinalSuffix.join("|");
      opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat; //resolve possible formatAlias

      opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat; //resolve possible formatAlias

      opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat; //resolve possible formatAlias

      opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, "");
      opts.regex = parse(opts.inputFormat, undefined, opts); // console.log(opts.regex);

      return null; //migrate to regex mask
    },
    placeholder: "",
    //set default as none (~ auto); when a custom placeholder is passed it will be used
    inputFormat: "isoDateTime",
    //format used to input the date
    displayFormat: undefined,
    //visual format when the input looses focus
    outputFormat: undefined,
    //unmasking format
    min: null,
    //needs to be in the same format as the inputfornat
    max: null,
    //needs to be in the same format as the inputfornat,
    skipOptionalPartCharacter: "",
    // Internationalization strings
    i18n: {
      dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      ordinalSuffix: ["st", "nd", "rd", "th"]
    },
    preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
      if (strict) return true;
      var calcPos = 0,
          targetMatch,
          match;

      if (isNaN(c) && buffer[pos] !== c) {
        getTokenizer(opts).lastIndex = 0;

        while (match = getTokenizer(opts).exec(opts.inputFormat)) {
          calcPos += match[0].length;

          if (calcPos >= pos) {
            targetMatch = match;
            match = getTokenizer(opts).exec(opts.inputFormat);
            break;
          }
        }

        if (match && match[0] === c && targetMatch[0].length > 1) {
          buffer[pos] = buffer[pos - 1];
          buffer[pos - 1] = "0";
          return {
            fuzzy: true,
            buffer: buffer,
            refreshFromBuffer: {
              start: pos - 1,
              end: pos + 1
            },
            pos: pos + 1
          };
        }
      }

      return true;
    },
    postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
      if (strict) return true;
      opts.min = analyseMask(opts.min, opts.inputFormat, opts);
      opts.max = analyseMask(opts.max, opts.inputFormat, opts);

      if (currentResult.fuzzy) {
        buffer = currentResult.buffer;
        pos = currentResult.pos;
      } //full validate target


      var calcPos = 0,
          match;
      getTokenizer(opts).lastIndex = 0;

      while (match = getTokenizer(opts).exec(opts.inputFormat)) {
        calcPos += match[0].length;

        if (calcPos > pos) {
          break;
        }
      }

      if (match && match[0] && formatCode[match[0]] !== undefined) {
        var validator = formatCode[match[0]][0];
        var part = buffer.slice(match.index, match.index + match[0].length);

        if (new RegExp(validator).test(part.join("")) === false && match[0].length === 2 && maskset.validPositions[match.index] && maskset.validPositions[match.index + 1]) {
          maskset.validPositions[match.index + 1].input = "0";
        }
      }

      var result = currentResult,
          dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);

      if (result && dateParts.date.getTime() === dateParts.date.getTime()) {
        //check for a valid date ~ an invalid date returns NaN which isn't equal
        result = isValidDate(dateParts, result);
        result = result && isDateInRange(dateParts, opts);
      }

      if (pos && result && currentResult.pos !== pos) {
        return {
          buffer: parse(opts.inputFormat, dateParts, opts).split(""),
          refreshFromBuffer: {
            start: pos,
            end: currentResult.pos
          }
        };
      }

      return result;
    },
    onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
      var input = this;

      if (e.ctrlKey && e.keyCode === keyCode.RIGHT) {
        var today = new Date(),
            match,
            date = "";
        getTokenizer(opts).lastIndex = 0;

        while (match = getTokenizer(opts).exec(opts.inputFormat)) {
          if (match[0].charAt(0) === "d") {
            date += pad(today.getDate(), match[0].length);
          } else if (match[0].charAt(0) === "m") {
            date += pad(today.getMonth() + 1, match[0].length);
          } else if (match[0] === "yyyy") {
            date += today.getFullYear().toString();
          } else if (match[0].charAt(0) === "y") {
            date += pad(today.getYear(), match[0].length);
          }
        }

        input.inputmask._valueSet(date);

        $(input).trigger("setvalue");
      }
    },
    onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
      return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, true) : unmaskedValue;
    },
    casing: function casing(elem, test, pos, validPositions) {
      if (test.nativeDef.indexOf("[ap]") == 0) return elem.toLowerCase();
      if (test.nativeDef.indexOf("[AP]") == 0) return elem.toUpperCase();
      return elem;
    },
    insertMode: false,
    shiftPositions: false,
    keepStatic: false
  }
});
module.exports = Inputmask;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
var Inputmask = __webpack_require__(2),
    $ = Inputmask.dependencyLib,
    keyCode = __webpack_require__(7);

function autoEscape(txt, opts) {
  var escapedTxt = "";

  for (var i = 0; i < txt.length; i++) {
    if (Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i)) {
      escapedTxt += "\\" + txt.charAt(i);
    } else {
      escapedTxt += txt.charAt(i);
    }
  }

  return escapedTxt;
}

function alignDigits(buffer, digits, opts, force) {
  if (digits > 0 && (!opts.digitsOptional || force)) {
    var radixPosition = $.inArray(opts.radixPoint, buffer);

    if (radixPosition === -1) {
      buffer.push(opts.radixPoint);
      radixPosition = buffer.length - 1;
    }

    for (var i = 1; i <= digits; i++) {
      buffer[radixPosition + i] = buffer[radixPosition + i] || "0";
    }
  }

  return buffer;
}

function findValidator(symbol, maskset) {
  var posNdx = 0;

  if (symbol === "+") {
    for (posNdx in maskset.validPositions) {
      ;
    }

    posNdx = parseInt(posNdx);
  }

  for (var tstNdx in maskset.tests) {
    tstNdx = parseInt(tstNdx);

    if (tstNdx >= posNdx) {
      for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) {
        if ((maskset.validPositions[tstNdx] === undefined || symbol === "-") && maskset.tests[tstNdx][ndx].match.def === symbol) {
          return tstNdx + (maskset.validPositions[tstNdx] !== undefined && symbol !== "-" ? 1 : 0);
        }
      }
    }
  }

  return posNdx;
}

function findValid(symbol, maskset) {
  var ret = -1;
  $.each(maskset.validPositions, function (ndx, tst) {
    if (tst && tst.match.def === symbol) {
      ret = parseInt(ndx);
      return false;
    }
  });
  return ret;
}

function parseMinMaxOptions(opts) {
  if (opts.parseMinMaxOptions === undefined) {
    // convert min and max options
    if (opts.min !== null) {
      opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
      if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
      opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
      if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
    }

    if (opts.max !== null) {
      opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
      if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
      opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
      if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
    }

    opts.parseMinMaxOptions = "done";
  }
}

function genMask(opts) {
  opts.repeat = 0; //treat equal separator and radixpoint

  if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
    if (opts.radixPoint === ".") {
      opts.groupSeparator = ",";
    } else if (opts.radixPoint === ",") {
      opts.groupSeparator = ".";
    } else {
      opts.groupSeparator = "";
    }
  } //prevent conflict with default skipOptionalPartCharacter


  if (opts.groupSeparator === " ") {
    opts.skipOptionalPartCharacter = undefined;
  } //enforce placeholder to single


  if (opts.placeholder.length > 1) {
    opts.placeholder = opts.placeholder.charAt(0);
  } //only allow radixfocus when placeholder = 0


  if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "") {
    opts.positionCaretOnClick = "lvp";
  }

  var decimalDef = "0";

  if (opts.numericInput === true && opts.__financeInput === undefined) {
    //finance people input style
    decimalDef = "1";
    opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick; // opts.digitsOptional = false;

    if (isNaN(opts.digits)) opts.digits = 2;
    opts._radixDance = false;
  } else {
    opts.__financeInput = false; //needed to keep original selection when remasking

    opts.numericInput = true;
  }

  var mask = "[+]",
      altMask;
  mask += autoEscape(opts.prefix, opts);

  if (opts.groupSeparator !== "") {
    mask += opts._mask(opts);
  } else {
    mask += "9{+}";
  }

  if (opts.digits !== undefined && opts.digits !== 0) {
    var dq = opts.digits.toString().split(",");

    if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
      mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}";
    } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
      if (opts.digitsOptional) {
        altMask = mask + opts.radixPoint + decimalDef + "{0," + opts.digits + "}"; // mask += "[" + opts.radixPoint + "]";

        opts.keepStatic = true;
      } else {
        mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}";
      }
    }
  }

  mask += autoEscape(opts.suffix, opts);
  mask += "[-]";

  if (altMask) {
    mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask];
  }

  opts.greedy = false; //enforce greedy false

  parseMinMaxOptions(opts); // console.log(mask);

  return mask;
}

function hanndleRadixDance(pos, c, radixPos, opts) {
  if (opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back) {
    if (pos <= radixPos && (radixPos > 0 || c == opts.radixPoint)) {
      pos -= 1;
    }
  }

  return pos;
}

function decimalValidator(chrs, maskset, pos, strict, opts) {
  var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
      result = radixPos !== -1 && new RegExp("[0-9\uFF11-\uFF19]").test(chrs);

  if (opts._radixDance && result && maskset.validPositions[radixPos] == undefined) {
    return {
      insert: {
        pos: radixPos === pos ? radixPos + 1 : radixPos,
        c: opts.radixPoint
      },
      pos: pos
    };
  }

  return result;
}

function checkForLeadingZeroes(buffer, opts) {
  //check leading zeros
  try {
    var numberMatches = new RegExp("(^" + (opts.negationSymbol.front !== "" ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + (opts.negationSymbol.back != "" ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
        number = numberMatches ? numberMatches[2] : "",
        leadingzeroes = false;

    if (number) {
      number = number.split(opts.radixPoint.charAt(0))[0];
      leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number);
    }

    return leadingzeroes && (leadingzeroes[0].length > 1 || leadingzeroes[0].length > 0 && leadingzeroes[0].length < number.length) ? leadingzeroes : false;
  } catch (e) {
    console.log(buffer.slice().reverse().join(""));
  }
} //number aliases


Inputmask.extendAliases({
  "numeric": {
    mask: genMask,
    _mask: function _mask(opts) {
      return "(" + opts.groupSeparator + "999){+|1}";
    },
    digits: "*",
    //number of fractionalDigits
    digitsOptional: true,
    enforceDigitsOnBlur: false,
    radixPoint: ".",
    positionCaretOnClick: "radixFocus",
    _radixDance: true,
    groupSeparator: "",
    allowMinus: true,
    negationSymbol: {
      front: "-",
      //"("
      back: "" //")"

    },
    prefix: "",
    suffix: "",
    min: null,
    //minimum value
    max: null,
    //maximum value
    step: 1,
    unmaskAsNumber: false,
    roundingFN: Math.round,
    //Math.floor ,  fn(x)
    inputmode: "numeric",
    shortcuts: {
      k: "000",
      m: "000000"
    },
    //global options
    placeholder: "0",
    greedy: false,
    rightAlign: true,
    insertMode: true,
    autoUnmask: false,
    skipOptionalPartCharacter: "",
    definitions: {
      "0": {
        validator: decimalValidator
      },
      "1": {
        validator: decimalValidator,
        definitionSymbol: "*"
      },
      "+": {
        validator: function validator(chrs, maskset, pos, strict, opts) {
          return opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front);
        }
      },
      "-": {
        validator: function validator(chrs, maskset, pos, strict, opts) {
          return opts.allowMinus && chrs === opts.negationSymbol.back;
        }
      }
    },
    preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
      if (opts.__financeInput !== false && c === opts.radixPoint) return false;
      var pattern;

      if (pattern = opts.shortcuts && opts.shortcuts[c]) {
        if (pattern.length > 1) {
          var inserts = [];

          for (var i = 0; i < pattern.length; i++) {
            inserts.push({
              pos: pos + i,
              c: pattern[i],
              strict: false
            });
          }
        }

        return {
          insert: inserts
        };
      }

      var radixPos = $.inArray(opts.radixPoint, buffer);
      pos = hanndleRadixDance(pos, c, radixPos, opts);

      if (c === "-" || c === opts.negationSymbol.front) {
        if (opts.allowMinus !== true) return false;
        var isNegative = false,
            front = findValid("+", maskset),
            back = findValid("-", maskset);

        if (front !== -1) {
          isNegative = [front, back];
        }

        return isNegative !== false ? {
          remove: isNegative,
          caret: radixPos > pos ? pos + 1 : pos
        } : {
          insert: [{
            pos: findValidator("+", maskset),
            c: opts.negationSymbol.front,
            fromIsValid: true
          }, {
            pos: findValidator("-", maskset),
            c: opts.negationSymbol.back,
            fromIsValid: undefined
          }],
          caret: radixPos > pos ? pos + 1 : pos
        };
      }

      if (strict) return true;

      if (radixPos !== -1 && opts._radixDance === true && isSelection === false && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && radixPos !== pos) {
        return {
          "caret": opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
        };
      }

      if (isSelection && opts.digitsOptional) {
        return {
          rewritePosition: caretPos.end
        };
      } else if (isSelection && !opts.digitsOptional && caretPos.begin > radixPos && caretPos.end <= radixPos) {
        return {
          rewritePosition: radixPos + 1
        };
      } else if (isSelection && !opts.digitsOptional && caretPos.begin < radixPos) {
        return {
          rewritePosition: caretPos.begin - 1
        };
      } else {
        return {
          rewritePosition: pos
        };
      }
    },
    postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
      if (strict) return true;

      if (opts.min !== null || opts.max !== null) {
        var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, $.extend({}, opts, {
          unmaskAsNumber: true
        }));

        if (opts.min !== null && unmasked < opts.min && (unmasked.toString().length >= opts.min.toString().length || unmasked < 0)) {
          return {
            refreshFromBuffer: true,
            buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
          };
        }

        if (opts.max !== null && unmasked > opts.max) {
          return {
            refreshFromBuffer: true,
            buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
          };
        }
      }

      return currentResult;
    },
    onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
      if (unmaskedValue === "" && opts.nullable === true) {
        return unmaskedValue;
      }

      var processValue = maskedValue.replace(opts.prefix, "");
      processValue = processValue.replace(opts.suffix, "");
      processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");

      if (opts.placeholder.charAt(0) !== "") {
        processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0");
      }

      if (opts.unmaskAsNumber) {
        if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".");
        processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
        processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
        return Number(processValue);
      }

      return processValue;
    },
    isComplete: function isComplete(buffer, opts) {
      var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
      maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
      maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
      maskedValue = maskedValue.replace(opts.prefix, "");
      maskedValue = maskedValue.replace(opts.suffix, "");
      maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
      if (opts.radixPoint === ",") maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
      return isFinite(maskedValue);
    },
    onBeforeMask: function onBeforeMask(initialValue, opts) {
      var radixPoint = opts.radixPoint || ",";

      if ((typeof initialValue == "number" || opts.inputType === "number") && radixPoint !== "") {
        initialValue = initialValue.toString().replace(".", radixPoint);
      }

      var valueParts = initialValue.split(radixPoint),
          integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
          decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "",
          forceDigits = valueParts.length > 1;
      initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);
      var digits = 0;

      if (radixPoint !== "") {
        digits = decimalPart.length;

        if (decimalPart !== "") {
          var digitsFactor = Math.pow(10, digits || 1);

          if (isFinite(opts.digits)) {
            digits = parseInt(opts.digits);
            digitsFactor = Math.pow(10, digits);
          } //make the initialValue a valid javascript number for the parsefloat


          initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), ".");

          if (isFinite(initialValue)) {
            initialValue = opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor;
          }

          initialValue = initialValue.toString().replace(".", radixPoint);
        }
      } //this needs to be in a separate part and not directly in decimalPart to allow rounding


      if (opts.digits === 0 && initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) !== -1) {
        initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)));
      }

      if (opts.min !== null || opts.max !== null) {
        var numberValue = initialValue.toString().replace(radixPoint, ".");

        if (opts.min !== null && numberValue < opts.min) {
          initialValue = opts.min.toString().replace(".", radixPoint);
        } else if (opts.max !== null && numberValue > opts.max) {
          initialValue = opts.max.toString().replace(".", radixPoint);
        }
      }

      return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
    },
    onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
      function stripBuffer(buffer, stripRadix) {
        if (opts.__financeInput !== false || stripRadix) {
          var position = $.inArray(opts.radixPoint, buffer);

          if (position !== -1) {
            buffer.splice(position, 1);
          }
        }

        if (opts.groupSeparator !== "") {
          while ((position = buffer.indexOf(opts.groupSeparator)) !== -1) {
            buffer.splice(position, 1);
          }
        }

        return buffer;
      }

      var result,
          leadingzeroes = checkForLeadingZeroes(buffer, opts);

      if (leadingzeroes) {
        var buf = buffer.slice().reverse(),
            caretNdx = buf.join("").indexOf(leadingzeroes[0]);
        buf.splice(caretNdx, leadingzeroes[0].length);
        var newCaretPos = buf.length - caretNdx;
        stripBuffer(buf);
        result = {
          refreshFromBuffer: true,
          buffer: buf.reverse(),
          caret: caretPos < newCaretPos ? caretPos : newCaretPos
        };
      }

      if (e) {
        switch (e.type) {
          case "blur":
          case "checkval":
            if (opts.min !== null) {
              var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, $.extend({}, opts, {
                unmaskAsNumber: true
              }));

              if (opts.min !== null && unmasked < opts.min) {
                return {
                  refreshFromBuffer: true,
                  buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                };
              }
            }

            if (opts.radixPoint !== "" && buffer[0] === opts.radixPoint) {
              if (result && result.buffer) {
                result.buffer.shift();
              } else {
                buffer.shift();
                result = {
                  refreshFromBuffer: true,
                  buffer: stripBuffer(buffer)
                };
              }
            } else {
              if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                var nmbrMtchs = new RegExp("(^" + (opts.negationSymbol.front != "" ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + (opts.negationSymbol.back != "" ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), true).reverse().join("")),
                    number = nmbrMtchs ? nmbrMtchs[2] : "";

                if (number == 0) {
                  result = {
                    refreshFromBuffer: true,
                    buffer: [0]
                  };
                }
              }
            }

        }
      }

      return result;
    },
    onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
      var $input = $(this),
          bffr;

      if (e.ctrlKey) {
        switch (e.keyCode) {
          case keyCode.UP:
            this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));

            $input.trigger("setvalue");
            return false;

          case keyCode.DOWN:
            this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));

            $input.trigger("setvalue");
            return false;
        }
      }

      if (!e.shiftKey && (e.keyCode === keyCode.DELETE || e.keyCode === keyCode.BACKSPACE || e.keyCode === keyCode.BACKSPACE_SAFARI)) {
        if (buffer[e.keyCode === keyCode.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) {
          bffr = buffer.slice().reverse();
          if (opts.negationSymbol.front !== "") bffr.shift();
          if (opts.negationSymbol.back !== "") bffr.pop();
          $input.trigger("setvalue", [bffr.join(""), caretPos.begin]);
          return false;
        } else if (opts._radixDance === true) {
          var radixPos = $.inArray(opts.radixPoint, buffer);

          if (!opts.digitsOptional) {
            if (radixPos !== -1 && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === keyCode.DELETE && caretPos.begin === radixPos)) {
              if (caretPos.begin === caretPos.end && (e.keyCode === keyCode.BACKSPACE || e.keyCode === keyCode.BACKSPACE_SAFARI)) {
                //only adjust when not a selection
                caretPos.begin++;
              }

              bffr = buffer.slice().reverse();
              bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1); // console.log(caretPos);

              bffr = alignDigits(bffr, opts.digits, opts).join("");
              $input.trigger("setvalue", [bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin]);
              return false;
            }
          } else if (radixPos === 0) {
            bffr = buffer.slice().reverse();
            bffr.pop();
            $input.trigger("setvalue", [bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin]);
            return false;
          }
        }
      }
    }
  },
  "currency": {
    prefix: "$ ",
    groupSeparator: ",",
    alias: "numeric",
    digits: 2,
    digitsOptional: false
  },
  "decimal": {
    alias: "numeric"
  },
  "integer": {
    alias: "numeric",
    digits: 0
  },
  "percentage": {
    alias: "numeric",
    min: 0,
    max: 100,
    suffix: " %",
    digits: 0,
    allowMinus: false
  },
  "indianns": {
    //indian numbering system
    alias: "numeric",
    _mask: function _mask(opts) {
      return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
    },
    groupSeparator: ",",
    radixPoint: ".",
    placeholder: "0",
    digits: 2,
    digitsOptional: false
  }
});
module.exports = Inputmask;

/***/ })
/******/ ]);
});
//# sourceMappingURL=inputmask.js.map