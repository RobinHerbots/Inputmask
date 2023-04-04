/*!
 * dist/jquery.inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2023 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.8
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__20__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
var _inputmask2 = _interopRequireDefault(__webpack_require__(7));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _inputmask2["default"];
exports["default"] = _default;

/***/ }),
/* 2 */
/***/ (function() {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
if (typeof Object.getPrototypeOf !== "function") {
  Object.getPrototypeOf = _typeof("test".__proto__) === "object" ? function (object) {
    return object.__proto__;
  } : function (object) {
    return object.constructor.prototype;
  };
}

/***/ }),
/* 3 */
/***/ (function() {



// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function value(searchElement, fromIndex) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError("\"this\" is null or not defined");
      }
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

/***/ }),
/* 4 */
/***/ (function() {



var reduce = Function.bind.call(Function.call, Array.prototype.reduce);
var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var concat = Function.bind.call(Function.call, Array.prototype.concat);
var keys = Object.keys;
if (!Object.entries) {
  Object.entries = function entries(O) {
    return reduce(keys(O), function (e, k) {
      return concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []);
    }, []);
  };
}

/***/ }),
/* 5 */
/***/ (function() {



if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _inputmask = _interopRequireDefault(__webpack_require__(7));
var _positioning = __webpack_require__(10);
var _validationTests = __webpack_require__(11);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

//extra definitions
_inputmask["default"].extendDefinitions({
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
_inputmask["default"].extendAliases({
  "cssunit": {
    regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
  },
  "url": {
    //needs update => https://en.wikipedia.org/wiki/URL
    regex: "(https?|ftp)://.*",
    autoUnmask: false,
    keepStatic: false,
    tabThrough: true
  },
  "ip": {
    //ip-address mask
    mask: "i{1,3}.j{1,3}.k{1,3}.l{1,3}",
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
    inputmode: "decimal",
    substitutes: {
      ",": "."
    }
  },
  "email": {
    //https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
    //https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
    //should be extended with the toplevel domains at the end
    mask: function mask(_ref) {
      var separator = _ref.separator,
        quantifier = _ref.quantifier;
      var emailMask = "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]";
      var mask = emailMask;
      if (separator) {
        for (var i = 0; i < quantifier; i++) {
          mask += "[".concat(separator).concat(emailMask, "]");
        }
      }
      return mask;
    },
    greedy: false,
    casing: "lower",
    separator: null,
    quantifier: 5,
    skipOptionalPartCharacter: "",
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
  },
  //http://rion.io/2013/09/10/validating-social-security-numbers-through-regular-expressions-2/
  //https://en.wikipedia.org/wiki/Social_Security_number
  "ssn": {
    mask: "999-99-9999",
    postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
      var bffr = _validationTests.getMaskTemplate.call(this, true, _positioning.getLastValidPosition.call(this), true, true);
      return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(bffr.join(""));
    }
  }
});

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _mask = __webpack_require__(8);
var _inputmask = _interopRequireDefault(__webpack_require__(19));
var _window = _interopRequireDefault(__webpack_require__(15));
var _maskLexer = __webpack_require__(21);
var _validationTests = __webpack_require__(11);
var _positioning = __webpack_require__(10);
var _validation = __webpack_require__(12);
var _inputHandling = __webpack_require__(17);
var _eventruler = __webpack_require__(18);
var _definitions = _interopRequireDefault(__webpack_require__(24));
var _defaults = _interopRequireDefault(__webpack_require__(25));
var _canUseDOM = _interopRequireDefault(__webpack_require__(16));
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */

var document = _window["default"].document,
  dataKey = "_inputmask_opts";
function Inputmask(alias, options, internal) {
  if (!_canUseDOM["default"]) {
    return;
  }

  //allow instanciating without new
  if (!(this instanceof Inputmask)) {
    return new Inputmask(alias, options, internal);
  }
  this.dependencyLib = _inputmask["default"];
  this.el = undefined;
  this.events = {};
  this.maskset = undefined;
  if (internal !== true) {
    //init options
    if (Object.prototype.toString.call(alias) === "[object Object]") {
      options = alias;
    } else {
      options = options || {};
      if (alias) options.alias = alias;
    }
    this.opts = _inputmask["default"].extend(true, {}, this.defaults, options);
    this.noMasksCache = options && options.definitions !== undefined;
    this.userOptions = options || {}; //user passed options
    resolveAlias(this.opts.alias, options, this.opts);
  }

  //maskscope properties
  this.refreshValue = false; //indicate a refresh from the inputvalue is needed (form.reset)
  this.undoValue = undefined;
  this.$el = undefined;
  this.skipInputEvent = false; //skip when triggered from within inputmask
  this.validationEvent = false;
  this.ignorable = false;
  this.maxLength;
  this.mouseEnter = false;
  this.clicked = 0;
  this.originalPlaceholder = undefined; //needed for FF
  this.isComposing = false,
  //keydowncode == 229  compositionevent fallback
  this.hasAlternator = false;
}
Inputmask.prototype = {
  dataAttribute: "data-inputmask",
  //data attribute prefix used for attribute binding
  //options default
  defaults: _defaults["default"],
  definitions: _definitions["default"],
  aliases: {},
  //aliases definitions
  masksCache: {},
  get isRTL() {
    return this.opts.isRTL || this.opts.numericInput;
  },
  mask: function mask(elems) {
    var that = this;
    if (typeof elems === "string") {
      elems = document.getElementById(elems) || document.querySelectorAll(elems);
    }
    elems = elems.nodeName ? [elems] : Array.isArray(elems) ? elems : [].slice.call(elems); //[].slice as alternate for Array.from (Yandex browser)
    elems.forEach(function (el, ndx) {
      var scopedOpts = _inputmask["default"].extend(true, {}, that.opts);
      if (importAttributeOptions(el, scopedOpts, _inputmask["default"].extend(true, {}, that.userOptions), that.dataAttribute)) {
        var maskset = (0, _maskLexer.generateMaskSet)(scopedOpts, that.noMasksCache);
        if (maskset !== undefined) {
          if (el.inputmask !== undefined) {
            el.inputmask.opts.autoUnmask = true; //force autounmasking when remasking
            el.inputmask.remove();
          }
          //store inputmask instance on the input with element reference
          el.inputmask = new Inputmask(undefined, undefined, true);
          el.inputmask.opts = scopedOpts;
          el.inputmask.noMasksCache = that.noMasksCache;
          el.inputmask.userOptions = _inputmask["default"].extend(true, {}, that.userOptions);
          // el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
          el.inputmask.el = el;
          el.inputmask.$el = (0, _inputmask["default"])(el);
          el.inputmask.maskset = maskset;
          _inputmask["default"].data(el, dataKey, that.userOptions);
          _mask.mask.call(el.inputmask);
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
      _inputmask["default"].extend(this.userOptions, options); //user passed options
      //remask
      if (this.el && noremask !== true) {
        this.mask(this.el);
      }
      return this;
    }
  },
  unmaskedvalue: function unmaskedvalue(value) {
    this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
    if (this.el === undefined || value !== undefined) {
      var valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
      _inputHandling.checkVal.call(this, undefined, false, false, valueBuffer);
      if (typeof this.opts.onBeforeWrite === "function") this.opts.onBeforeWrite.call(this, undefined, _positioning.getBuffer.call(this), 0, this.opts);
    }
    return _inputHandling.unmaskedvalue.call(this, this.el);
  },
  remove: function remove() {
    if (this.el) {
      _inputmask["default"].data(this.el, dataKey, null); //invalidate
      //writeout the value
      var cv = this.opts.autoUnmask ? (0, _inputHandling.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask);
      if (cv !== _positioning.getBufferTemplate.call(this).join("")) this._valueSet(cv, this.opts.autoUnmask);else this._valueSet("");
      //unbind all events
      _eventruler.EventRuler.off(this.el);

      //restore the value property
      var valueProperty;
      if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
        valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value");
        if (valueProperty) {
          if (this.__valueGet) {
            Object.defineProperty(this.el, "value", {
              get: this.__valueGet,
              set: this.__valueSet,
              configurable: true
            });
          }
        }
      } else if (document.__lookupGetter__ && this.el.__lookupGetter__("value")) {
        if (this.__valueGet) {
          this.el.__defineGetter__("value", this.__valueGet);
          this.el.__defineSetter__("value", this.__valueSet);
        }
      }
      //clear data
      this.el.inputmask = undefined;
    }
    return this.el;
  },
  getemptymask: function getemptymask() {
    //return the default (empty) mask value, usefull for setting the default value in validation
    this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
    return (this.isRTL ? _positioning.getBufferTemplate.call(this).reverse() : _positioning.getBufferTemplate.call(this)).join("");
  },
  hasMaskedValue: function hasMaskedValue() {
    //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
    return !this.opts.autoUnmask;
  },
  isComplete: function isComplete() {
    this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
    return _validation.isComplete.call(this, _positioning.getBuffer.call(this));
  },
  getmetadata: function getmetadata() {
    //return mask metadata if exists
    this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
    if (Array.isArray(this.maskset.metadata)) {
      var maskTarget = _validationTests.getMaskTemplate.call(this, true, 0, false).join("");
      this.maskset.metadata.forEach(function (mtdt) {
        if (mtdt.mask === maskTarget) {
          maskTarget = mtdt;
          return false;
        }
        return true;
      });
      return maskTarget;
    }
    return this.maskset.metadata;
  },
  isValid: function isValid(value) {
    this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
    if (value) {
      var valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
      _inputHandling.checkVal.call(this, undefined, true, false, valueBuffer);
    } else {
      value = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");
    }
    var buffer = _positioning.getBuffer.call(this);
    var rl = _positioning.determineLastRequiredPosition.call(this),
      lmib = buffer.length - 1;
    for (; lmib > rl; lmib--) {
      if (_positioning.isMask.call(this, lmib)) break;
    }
    buffer.splice(rl, lmib + 1 - rl);
    return _validation.isComplete.call(this, buffer) && value === (this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join(""));
  },
  format: function format(value, metadata) {
    this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
    var valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
    _inputHandling.checkVal.call(this, undefined, true, false, valueBuffer);
    var formattedValue = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");
    return metadata ? {
      value: formattedValue,
      metadata: this.getmetadata()
    } : formattedValue;
  },
  setValue: function setValue(value) {
    if (this.el) {
      (0, _inputmask["default"])(this.el).trigger("setvalue", [value]);
    }
  },
  analyseMask: _maskLexer.analyseMask
};
function resolveAlias(aliasStr, options, opts) {
  var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
  if (aliasDefinition) {
    if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
    _inputmask["default"].extend(true, opts, aliasDefinition); //merge alias definition in the options
    _inputmask["default"].extend(true, opts, options); //reapply extra given options
    return true;
  } else
    //alias not found - try as mask
    if (opts.mask === null) {
      opts.mask = aliasStr;
    }
  return false;
}
function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
  function importOption(option, optionData) {
    var attrOption = dataAttribute === "" ? option : dataAttribute + "-" + option;
    optionData = optionData !== undefined ? optionData : npt.getAttribute(attrOption);
    if (optionData !== null) {
      if (typeof optionData === "string") {
        if (option.indexOf("on") === 0) {
          optionData = _window["default"][optionData];
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
    }

    //resolve aliases
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
  _inputmask["default"].extend(true, opts, userOptions);

  //handle dir=rtl
  if (npt.dir === "rtl" || opts.rightAlign) {
    npt.style.textAlign = "right";
  }
  if (npt.dir === "rtl" || opts.numericInput) {
    npt.dir = "ltr";
    npt.removeAttribute("dir");
    opts.isRTL = true;
  }
  return Object.keys(userOptions).length;
}

//apply defaults, definitions, aliases
Inputmask.extendDefaults = function (options) {
  _inputmask["default"].extend(true, Inputmask.prototype.defaults, options);
};
Inputmask.extendDefinitions = function (definition) {
  _inputmask["default"].extend(true, Inputmask.prototype.definitions, definition);
};
Inputmask.extendAliases = function (alias) {
  _inputmask["default"].extend(true, Inputmask.prototype.aliases, alias);
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
  if (typeof elems === "string") {
    elems = document.getElementById(elems) || document.querySelectorAll(elems);
  }
  elems = elems.nodeName ? [elems] : elems;
  elems.forEach(function (el) {
    if (el.inputmask) el.inputmask.remove();
  });
};
Inputmask.setValue = function (elems, value) {
  if (typeof elems === "string") {
    elems = document.getElementById(elems) || document.querySelectorAll(elems);
  }
  elems = elems.nodeName ? [elems] : elems;
  elems.forEach(function (el) {
    if (el.inputmask) el.inputmask.setValue(value);else (0, _inputmask["default"])(el).trigger("setvalue", [value]);
  });
};
Inputmask.dependencyLib = _inputmask["default"];

//make inputmask available
_window["default"].Inputmask = Inputmask;
var _default = Inputmask;
exports["default"] = _default;

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mask = mask;
var _keycode = __webpack_require__(9);
var _positioning = __webpack_require__(10);
var _inputHandling = __webpack_require__(17);
var _eventruler = __webpack_require__(18);
var _environment = __webpack_require__(14);
var _validation = __webpack_require__(12);
var _eventhandlers = __webpack_require__(13);
//todo put on the prototype?
function mask() {
  var inputmask = this,
    opts = this.opts,
    el = this.el,
    $ = this.dependencyLib;
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
                  return _positioning.getLastValidPosition.call(inputmask, undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                }
              } else {
                return valhookGet(elem);
              }
            },
            set: function set(elem, value) {
              var result = valhookSet(elem, value);
              if (elem.inputmask) {
                (0, _inputHandling.applyInputValue)(elem, value);
              }
              return result;
            },
            inputmaskpatch: true
          };
        }
      }
      function getter() {
        if (this.inputmask) {
          return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : _positioning.getLastValidPosition.call(inputmask) !== -1 || opts.nullable !== true ? (this.inputmask.shadowRoot || this.ownerDocument).activeElement === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice()).reverse() : _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice())).join("") : valueGet.call(this) : "";
        } else {
          return valueGet.call(this);
        }
      }
      function setter(value) {
        valueSet.call(this, value);
        if (this.inputmask) {
          (0, _inputHandling.applyInputValue)(this, value);
        }
      }
      function installNativeValueSetFallback(npt) {
        _eventruler.EventRuler.on(npt, "mouseenter", function () {
          var input = this,
            value = input.inputmask._valueGet(true),
            bufferValue = (input.inputmask.isRTL ? _positioning.getBuffer.call(input.inputmask).slice().reverse() : _positioning.getBuffer.call(input.inputmask)).join("");
          if (value != bufferValue) {
            (0, _inputHandling.applyInputValue)(input, value);
          }
        });
      }
      if (!npt.inputmask.__valueGet) {
        if (opts.noValuePatching !== true) {
          if (Object.getOwnPropertyDescriptor) {
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
          return inputmask.isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
        };
        npt.inputmask._valueSet = function (value, overruleRTL) {
          //null check is needed for IE8 => otherwise converts to "null"
          valueSet.call(this.el, value === null || value === undefined ? "" : overruleRTL !== true && inputmask.isRTL ? value.split("").reverse().join("") : value);
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
      opts.ignorables.push(_keycode.keys.Enter);
    }
    var elementType = input.getAttribute("type");
    var isSupported = input.tagName.toLowerCase() === "input" && opts.supportsInputType.includes(elementType) || input.isContentEditable || input.tagName.toLowerCase() === "textarea";
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
  }

  //unbind all events - to make sure that no other mask will interfere when re-masking
  _eventruler.EventRuler.off(el);
  var isSupported = isElementTypeSupported(el, opts);
  if (isSupported !== false) {
    inputmask.originalPlaceholder = el.placeholder;

    //read maxlength prop from el
    inputmask.maxLength = el !== undefined ? el.maxLength : undefined;
    if (inputmask.maxLength === -1) inputmask.maxLength = undefined;
    if ("inputMode" in el && el.getAttribute("inputmode") === null) {
      el.inputMode = opts.inputmode;
      el.setAttribute("inputmode", opts.inputmode);
    }
    if (isSupported === true) {
      opts.showMaskOnFocus = opts.showMaskOnFocus && ["cc-number", "cc-exp"].indexOf(el.autocomplete) === -1;
      if (_environment.iphone) {
        //selecting the caret shows as a selection on iphone
        opts.insertModeVisual = false;
        //disable autocorrect
        el.setAttribute("autocorrect", "off");
      }

      //bind events
      _eventruler.EventRuler.on(el, "submit", _eventhandlers.EventHandlers.submitEvent);
      _eventruler.EventRuler.on(el, "reset", _eventhandlers.EventHandlers.resetEvent);
      _eventruler.EventRuler.on(el, "blur", _eventhandlers.EventHandlers.blurEvent);
      _eventruler.EventRuler.on(el, "focus", _eventhandlers.EventHandlers.focusEvent);
      _eventruler.EventRuler.on(el, "invalid", _eventhandlers.EventHandlers.invalidEvent);
      _eventruler.EventRuler.on(el, "click", _eventhandlers.EventHandlers.clickEvent);
      _eventruler.EventRuler.on(el, "mouseleave", _eventhandlers.EventHandlers.mouseleaveEvent);
      _eventruler.EventRuler.on(el, "mouseenter", _eventhandlers.EventHandlers.mouseenterEvent);
      _eventruler.EventRuler.on(el, "paste", _eventhandlers.EventHandlers.pasteEvent);
      _eventruler.EventRuler.on(el, "cut", _eventhandlers.EventHandlers.cutEvent);
      _eventruler.EventRuler.on(el, "complete", opts.oncomplete);
      _eventruler.EventRuler.on(el, "incomplete", opts.onincomplete);
      _eventruler.EventRuler.on(el, "cleared", opts.oncleared);
      if (opts.inputEventOnly !== true) {
        _eventruler.EventRuler.on(el, "keydown", _eventhandlers.EventHandlers.keyEvent);
      }
      if (_environment.mobile || opts.inputEventOnly) {
        el.removeAttribute("maxLength");
      }
      _eventruler.EventRuler.on(el, "input", _eventhandlers.EventHandlers.inputFallBackEvent);
      // EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent); //https://github.com/w3c/input-events - to implement
    }

    _eventruler.EventRuler.on(el, "setvalue", _eventhandlers.EventHandlers.setValueEvent);

    //apply mask
    _positioning.getBufferTemplate.call(inputmask).join(""); //initialize the buffer and getmasklength
    inputmask.undoValue = inputmask._valueGet(true);
    var activeElement = (el.inputmask.shadowRoot || el.ownerDocument).activeElement;
    if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || activeElement === el) {
      (0, _inputHandling.applyInputValue)(el, el.inputmask._valueGet(true), opts);
      var buffer = _positioning.getBuffer.call(inputmask).slice();
      if (_validation.isComplete.call(inputmask, buffer) === false) {
        if (opts.clearIncomplete) {
          _positioning.resetMaskSet.call(inputmask);
        }
      }
      if (opts.clearMaskOnLostFocus && activeElement !== el) {
        if (_positioning.getLastValidPosition.call(inputmask) === -1) {
          buffer = [];
        } else {
          _inputHandling.clearOptionalTail.call(inputmask, buffer);
        }
      }
      if (opts.clearMaskOnLostFocus === false || opts.showMaskOnFocus && activeElement === el || el.inputmask._valueGet(true) !== "") {
        (0, _inputHandling.writeBuffer)(el, buffer);
      }
      if (activeElement === el) {
        //position the caret when in focus
        _positioning.caret.call(inputmask, el, _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask)));
      }
    }
  }
}

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keys = exports.keyCode = void 0;
exports.toKey = toKey;
exports.toKeyCode = toKeyCode;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var keyCode = {
  "AltGraph": 18,
  "ArrowDown": 40,
  "ArrowLeft": 37,
  "ArrowRight": 39,
  "ArrowUp": 38,
  "Backspace": 8,
  "BACKSPACE_SAFARI": 127,
  "CapsLock": 20,
  "Delete": 46,
  "End": 35,
  "Enter": 13,
  "Escape": 27,
  "Home": 36,
  "Insert": 45,
  "PageDown": 34,
  "PageUp": 33,
  "Space": 32,
  "Tab": 9,
  "c": 67,
  "x": 88,
  "z": 90,
  "Shift": 16,
  "Control": 17,
  "Alt": 18,
  "Pause": 19,
  "Meta_LEFT": 91,
  "Meta_RIGHT": 92,
  "ContextMenu": 93,
  "Process": 229,
  "Unidentified": 229,
  "F1": 112,
  "F2": 113,
  "F3": 114,
  "F4": 115,
  "F5": 116,
  "F6": 117,
  "F7": 118,
  "F8": 119,
  "F9": 120,
  "F10": 121,
  "F11": 122,
  "F12": 123
};
exports.keyCode = keyCode;
var keyCodeRev = Object.entries(keyCode).reduce(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    key = _ref2[0],
    value = _ref2[1];
  return acc[value] = acc[value] === undefined ? key : acc[value], acc;
}, {});
var keys = Object.entries(keyCode).reduce(function (acc, _ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
    key = _ref4[0],
    value = _ref4[1];
  return acc[key] = key === "Space" ? " " : key, acc;
}, {});
exports.keys = keys;
function toKey(keyCode, shiftKey) {
  return keyCodeRev[keyCode] || (shiftKey ? String.fromCharCode(keyCode) : String.fromCharCode(keyCode).toLowerCase());
}
function toKeyCode(key) {
  return keyCode[key];
}

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.caret = caret;
exports.determineLastRequiredPosition = determineLastRequiredPosition;
exports.determineNewCaretPosition = determineNewCaretPosition;
exports.getBuffer = getBuffer;
exports.getBufferTemplate = getBufferTemplate;
exports.getLastValidPosition = getLastValidPosition;
exports.isMask = isMask;
exports.resetMaskSet = resetMaskSet;
exports.seekNext = seekNext;
exports.seekPrevious = seekPrevious;
exports.translatePosition = translatePosition;
var _validationTests = __webpack_require__(11);
var _validation = __webpack_require__(12);
//tobe put on prototype?
function caret(input, begin, end, notranslate, isDelete) {
  var inputmask = this,
    opts = this.opts;
  var range;
  if (begin !== undefined) {
    if (Array.isArray(begin)) {
      end = inputmask.isRTL ? begin[0] : begin[1];
      begin = inputmask.isRTL ? begin[1] : begin[0];
    }
    if (begin.begin !== undefined) {
      end = inputmask.isRTL ? begin.begin : begin.end;
      begin = inputmask.isRTL ? begin.end : begin.begin;
    }
    if (typeof begin === "number") {
      begin = notranslate ? begin : translatePosition.call(inputmask, begin);
      end = notranslate ? end : translatePosition.call(inputmask, end);
      end = typeof end == "number" ? end : begin;
      // if (!$(input).is(":visible")) {
      // 	return;
      // }

      var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
      input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
      input.inputmask.caretPos = {
        begin: begin,
        end: end
      }; //track caret internally
      if (opts.insertModeVisual && opts.insertMode === false && begin === end) {
        if (!isDelete) {
          end++; //set visualization for insert/overwrite mode
        }
      }

      if (input === (input.inputmask.shadowRoot || input.ownerDocument).activeElement) {
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
          sel.addRange(range);
          //input.focus();
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

    // if (opts.insertModeVisual && opts.insertMode === false && begin === (end - 1)) end--; //correct caret for insert/overwrite mode

    /*eslint-disable consistent-return */
    return {
      "begin": notranslate ? begin : translatePosition.call(inputmask, begin),
      "end": notranslate ? end : translatePosition.call(inputmask, end)
    };
    /*eslint-enable consistent-return */
  }
}

//tobe put on prototype?
function determineLastRequiredPosition(returnDefinition) {
  var inputmask = this,
    maskset = inputmask.maskset,
    $ = inputmask.dependencyLib;
  var buffer = _validationTests.getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true, true),
    bl = buffer.length,
    pos,
    lvp = getLastValidPosition.call(inputmask),
    positions = {},
    lvTest = maskset.validPositions[lvp],
    ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
    testPos;
  for (pos = lvp + 1; pos < buffer.length; pos++) {
    testPos = _validationTests.getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
    ndxIntlzr = testPos.locator.slice();
    positions[pos] = $.extend(true, {}, testPos);
  }
  var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
  for (pos = bl - 1; pos > lvp; pos--) {
    testPos = positions[pos];
    if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match["static"] != true || testPos.match["static"] === true && testPos.locator[lvTest.alternation] && _validation.checkAlternationMatch.call(inputmask, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && _validationTests.getTests.call(inputmask, pos)[0].def !== "")) && buffer[pos] === _validationTests.getPlaceholder.call(inputmask, pos, testPos.match)) {
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

//tobe put on prototype?
function determineNewCaretPosition(selectedCaret, tabbed, positionCaretOnClick) {
  var inputmask = this,
    maskset = inputmask.maskset,
    opts = inputmask.opts;
  function doRadixFocus(clickPos) {
    if (opts.radixPoint !== "" && opts.digits !== 0) {
      var vps = maskset.validPositions;
      if (vps[clickPos] === undefined || vps[clickPos].input === _validationTests.getPlaceholder.call(inputmask, clickPos)) {
        if (clickPos < seekNext.call(inputmask, -1)) return true;
        var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
        if (radixPos !== -1) {
          for (var vp = 0, vpl = vps.length; vp < vpl; vp++) {
            if (vps[vp] && radixPos < vp && vps[vp].input !== _validationTests.getPlaceholder.call(inputmask, vp)) {
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
    if (inputmask.isRTL) {
      selectedCaret.end = selectedCaret.begin;
    } else {
      selectedCaret.begin = selectedCaret.end;
    }
  }
  if (selectedCaret.begin === selectedCaret.end) {
    positionCaretOnClick = positionCaretOnClick || opts.positionCaretOnClick;
    switch (positionCaretOnClick) {
      case "none":
        break;
      case "select":
        selectedCaret = {
          begin: 0,
          end: getBuffer.call(inputmask).length
        };
        break;
      case "ignore":
        selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
        break;
      case "radixFocus":
        if (inputmask.clicked > 1 && maskset.validPositions.length == 0) break;
        if (doRadixFocus(selectedCaret.begin)) {
          var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
          selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
          break;
        }
      //fallback to lvp
      // eslint-disable-next-line no-fallthrough
      default:
        //lvp:
        var clickPosition = selectedCaret.begin,
          lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, true),
          lastPosition = seekNext.call(inputmask, lvclickPosition === -1 && !isMask.call(inputmask, 0) ? -1 : lvclickPosition);
        if (clickPosition <= lastPosition) {
          selectedCaret.end = selectedCaret.begin = !isMask.call(inputmask, clickPosition, false, true) ? seekNext.call(inputmask, clickPosition) : clickPosition;
        } else {
          var lvp = maskset.validPositions[lvclickPosition],
            tt = _validationTests.getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : undefined, lvp),
            placeholder = _validationTests.getPlaceholder.call(inputmask, lastPosition, tt.match);
          if (placeholder !== "" && getBuffer.call(inputmask)[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true || !isMask.call(inputmask, lastPosition, opts.keepStatic, true) && tt.match.def === placeholder) {
            var newPos = seekNext.call(inputmask, lastPosition);
            if (clickPosition >= newPos || clickPosition === lastPosition) {
              lastPosition = newPos;
            }
          }
          selectedCaret.end = selectedCaret.begin = lastPosition;
        }
    }
    return selectedCaret;
  }
}

//tobe put on prototype?
function getBuffer(noCache) {
  var inputmask = this,
    maskset = inputmask.maskset;
  if (maskset.buffer === undefined || noCache === true) {
    maskset.buffer = _validationTests.getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true);
    if (maskset._buffer === undefined) maskset._buffer = maskset.buffer.slice();
  }
  return maskset.buffer;
}

//tobe put on prototype?
function getBufferTemplate() {
  var inputmask = this,
    maskset = this.maskset;
  if (maskset._buffer === undefined) {
    //generate template
    maskset._buffer = _validationTests.getMaskTemplate.call(inputmask, false, 1);
    if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
  }
  return maskset._buffer;
}

//tobe put on prototype?
function getLastValidPosition(closestTo, strict, validPositions) {
  var maskset = this.maskset;
  var before = -1,
    after = -1,
    valids = validPositions || maskset.validPositions; //for use in valhook ~ context switch
  if (closestTo === undefined) closestTo = -1;
  for (var psNdx = 0, vpl = valids.length; psNdx < vpl; psNdx++) {
    if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
      if (psNdx <= closestTo) before = psNdx;
      if (psNdx >= closestTo) after = psNdx;
    }
  }
  return before === -1 || before == closestTo ? after : after == -1 ? before : closestTo - before < after - closestTo ? before : after;
}

//tobe put on prototype?
function isMask(pos, strict, fuzzy) {
  var inputmask = this,
    maskset = this.maskset;
  var test = _validationTests.getTestTemplate.call(inputmask, pos).match;
  if (test.def === "") test = _validationTests.getTest.call(inputmask, pos).match;
  if (test["static"] !== true) {
    return test.fn;
  }
  if (fuzzy === true && maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].generatedInput !== true) {
    return true;
  }
  if (strict !== true && pos > -1) {
    if (fuzzy) {
      //check on the number of tests
      var tests = _validationTests.getTests.call(inputmask, pos);
      return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
    }
    //else based on the template
    var testTemplate = _validationTests.determineTestTemplate.call(inputmask, pos, _validationTests.getTests.call(inputmask, pos));
    var testPlaceHolder = _validationTests.getPlaceholder.call(inputmask, pos, testTemplate.match);
    return testTemplate.match.def !== testPlaceHolder;
  }
  return false;
}

//tobe put on prototype?
function resetMaskSet(soft) {
  var maskset = this.maskset;
  maskset.buffer = undefined;
  if (soft !== true) {
    maskset.validPositions = [];
    maskset.p = 0;
  }
}

//tobe put on prototype?
function seekNext(pos, newBlock, fuzzy) {
  var inputmask = this;
  if (fuzzy === undefined) fuzzy = true;
  var position = pos + 1;
  while (_validationTests.getTest.call(inputmask, position).match.def !== "" && (newBlock === true && (_validationTests.getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true)) || newBlock !== true && !isMask.call(inputmask, position, undefined, fuzzy))) {
    position++;
  }
  return position;
}

//tobe put on prototype?
function seekPrevious(pos, newBlock) {
  var inputmask = this;
  var position = pos - 1;
  if (pos <= 0) return 0;
  while (position > 0 && (newBlock === true && (_validationTests.getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true)) || newBlock !== true && !isMask.call(inputmask, position, undefined, true))) {
    position--;
  }
  return position;
}

//tobe put on prototype?
function translatePosition(pos) {
  var inputmask = this,
    opts = this.opts,
    el = this.el;
  if (inputmask.isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
    pos = inputmask._valueGet().length - pos;
    if (pos < 0) pos = 0;
  }
  return pos;
}

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.determineTestTemplate = determineTestTemplate;
exports.getDecisionTaker = getDecisionTaker;
exports.getMaskTemplate = getMaskTemplate;
exports.getPlaceholder = getPlaceholder;
exports.getTest = getTest;
exports.getTestTemplate = getTestTemplate;
exports.getTests = getTests;
exports.isSubsetOf = isSubsetOf;
var _inputmask = _interopRequireDefault(__webpack_require__(7));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function getLocator(tst, align) {
  //need to align the locators to be correct
  var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
  if (locator !== "") while (locator.length < align) {
    locator += "0";
  }
  return locator;
}
function getDecisionTaker(tst) {
  var decisionTaker = tst.locator[tst.alternation];
  if (typeof decisionTaker == "string" && decisionTaker.length > 0) {
    //no decision taken ~ take first one as decider
    decisionTaker = decisionTaker.split(",")[0];
  }
  return decisionTaker !== undefined ? decisionTaker.toString() : "";
}

//tobe put on prototype?
function getPlaceholder(pos, test, returnPL) {
  var inputmask = this,
    opts = this.opts,
    maskset = this.maskset;
  test = test || getTest.call(inputmask, pos).match;
  if (test.placeholder !== undefined || returnPL === true) {
    return typeof test.placeholder === "function" ? test.placeholder(opts) : test.placeholder;
  } else if (test["static"] === true) {
    if (pos > -1 && maskset.validPositions[pos] === undefined) {
      var tests = getTests.call(inputmask, pos),
        staticAlternations = [],
        prevTest;
      if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
        for (var i = 0; i < tests.length; i++) {
          if (tests[i].match.def !== "" && tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true && (tests[i].match["static"] === true || prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, maskset, pos, true, opts) !== false)) {
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

//tobe put on prototype?
function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
  //includeMode true => input, undefined => placeholder, false => mask

  var inputmask = this,
    opts = this.opts,
    maskset = this.maskset;
  var greedy = opts.greedy;
  if (clearOptionalTail && opts.greedy) {
    opts.greedy = false;
    inputmask.maskset.tests = {};
  }
  minimalPos = minimalPos || 0;
  var maskTemplate = [],
    ndxIntlzr,
    pos = 0,
    test,
    testPos,
    jitRenderStatic;
  do {
    if (baseOnInput === true && maskset.validPositions[pos]) {
      testPos = clearOptionalTail && maskset.validPositions[pos].match.optionality && maskset.validPositions[pos + 1] === undefined && (maskset.validPositions[pos].generatedInput === true || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos];
      test = testPos.match;
      ndxIntlzr = testPos.locator.slice();
      maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, pos, test));
    } else {
      testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
      test = testPos.match;
      ndxIntlzr = testPos.locator.slice();
      var jitMasking = noJit === true ? false : opts.jitMasking !== false ? opts.jitMasking : test.jit;
      //check for groupSeparator is a hack for the numerics as we don't want the render of the groupSeparator beforehand
      jitRenderStatic = (jitRenderStatic && test["static"] && test.def !== opts.groupSeparator && test.fn === null || maskset.validPositions[pos - 1] && test["static"] && test.def !== opts.groupSeparator && test.fn === null) && maskset.tests[pos] /*&& maskset.tests[pos].length === 1*/;
      if (jitRenderStatic || jitMasking === false || jitMasking === undefined /*|| pos < lvp*/ || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
        maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, maskTemplate.length, test));
      } else {
        jitRenderStatic = false;
      }
    }
    pos++;
  } while (test["static"] !== true || test.def !== "" || minimalPos > pos);
  if (maskTemplate[maskTemplate.length - 1] === "") {
    maskTemplate.pop(); //drop the last one which is empty
  }

  if (includeMode !== false ||
  //do not alter the masklength when just retrieving the maskdefinition
  maskset.maskLength === undefined)
    //just make sure the maskLength gets initialized in all cases (needed for isValid)
    {
      maskset.maskLength = pos - 1;
    }
  opts.greedy = greedy;
  return maskTemplate;
}

//tobe put on prototype?
function getTestTemplate(pos, ndxIntlzr, tstPs) {
  var inputmask = this,
    maskset = this.maskset;
  return maskset.validPositions[pos] || determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
}

//tobe put on prototype?
function determineTestTemplate(pos, tests) {
  var inputmask = this,
    opts = this.opts,
    lenghtOffset = 0;
  var optionalityLevel = determineOptionalityLevel(pos, tests);
  pos = pos > 0 ? pos - 1 : 0;
  var altTest = getTest.call(inputmask, pos),
    targetLocator = getLocator(altTest),
    tstLocator,
    closest,
    bestMatch;
  if (opts.greedy && tests.length > 1 && tests[tests.length - 1].match.def === "") lenghtOffset = 1;
  // console.log(" optionality = " + optionalityLevel);
  // console.log(" - " + JSON.stringify(tests));
  for (var ndx = 0; ndx < tests.length - lenghtOffset; ndx++) {
    //find best matching
    var tst = tests[ndx];
    tstLocator = getLocator(tst, targetLocator.length);
    var distance = Math.abs(tstLocator - targetLocator);
    if (closest === undefined || tstLocator !== "" && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.optionality - optionalityLevel > 0 && bestMatch.match.newBlockMarker === "master" && (!tst.match.optionality || tst.match.optionality - optionalityLevel < 1 || !tst.match.newBlockMarker) || bestMatch && !opts.greedy && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) {
      closest = distance;
      bestMatch = tst;
    }
  }
  return bestMatch;
}
function determineOptionalityLevel(pos, tests) {
  var optionalityLevel = 0,
    differentOptionalLevels = false;
  tests.forEach(function (test) {
    if (test.match.optionality) {
      if (optionalityLevel !== 0 && optionalityLevel !== test.match.optionality) differentOptionalLevels = true;
      if (optionalityLevel === 0 || optionalityLevel > test.match.optionality) {
        optionalityLevel = test.match.optionality;
      }
    }
  });
  if (optionalityLevel) {
    if (pos == 0) optionalityLevel = 0;else if (tests.length == 1) optionalityLevel = 0;else if (!differentOptionalLevels) optionalityLevel = 0;
  }
  return optionalityLevel;
}

//tobe put on prototype?
function getTest(pos, tests) {
  var inputmask = this,
    maskset = this.maskset;
  if (maskset.validPositions[pos]) {
    return maskset.validPositions[pos];
  }
  return (tests || getTests.call(inputmask, pos))[0];
}
function isSubsetOf(source, target, opts) {
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

//tobe put on prototype?
function getTests(pos, ndxIntlzr, tstPs) {
  var inputmask = this,
    $ = this.dependencyLib,
    maskset = this.maskset,
    opts = this.opts,
    el = this.el,
    maskTokens = maskset.maskToken,
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
        var firstMatch = tokenGroup.matches.indexOf(latestMatch) === 0;
        if (!firstMatch) {
          tokenGroup.matches.every(function (match, ndx) {
            if (match.isQuantifier === true) {
              firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);
            } else if (Object.prototype.hasOwnProperty.call(match, "matches")) firstMatch = isFirstMatch(latestMatch, match);
            if (firstMatch) return false;
            return true;
          });
        }
        return firstMatch;
      }
      function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
        var bestMatch, indexPos;
        if (maskset.tests[pos] || maskset.validPositions[pos]) {
          (maskset.tests[pos] || [maskset.validPositions[pos]]).every(function (lmnt, ndx) {
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
            return true;
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
      function staticCanMatchDefinition(source, target) {
        return source.match["static"] === true && target.match["static"] !== true ? target.match.fn.test(source.match.def, maskset, pos, false, opts, false) : false;
      }

      //mergelocators for retrieving the correct locator match when merging
      function setMergeLocators(targetMatch, altMatch) {
        var alternationNdx = targetMatch.alternation,
          shouldMerge = altMatch === undefined || alternationNdx === altMatch.alternation && targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]) === -1;
        if (!shouldMerge && alternationNdx > altMatch.alternation) {
          for (var i = altMatch.alternation; i < alternationNdx; i++) {
            if (targetMatch.locator[i] !== altMatch.locator[i]) {
              alternationNdx = i;
              shouldMerge = true;
              break;
            }
          }
        }
        if (shouldMerge) {
          targetMatch.mloc = targetMatch.mloc || {};
          var locNdx = targetMatch.locator[alternationNdx];
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
              targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
            }
            return true;
          }
        }
        return false;
      }
      function isSameLevel(targetMatch, altMatch) {
        if (targetMatch.locator.length !== altMatch.locator.length) {
          return false;
        }
        for (var locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) {
          if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) {
            return false;
          }
        }
        return true;
      }
      function handleGroup() {
        match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse);
        if (match) return true;
      }
      function handleOptional() {
        var optionalToken = match,
          mtchsNdx = matches.length;
        match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
        if (matches.length > 0) {
          //check on matches.length instead of match to handle quantifier in a recursive call
          //mark optionality in matches
          matches.forEach(function (mtch, ndx) {
            if (ndx >= mtchsNdx) {
              mtch.match.optionality = mtch.match.optionality ? mtch.match.optionality + 1 : 1;
            }
          });
          latestMatch = matches[matches.length - 1].match;
          if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) {
            //prevent loop see #698
            insertStop = true; //insert a stop
            testPos = pos; //match the position after the group
          } else {
            return match; //make the loop continue when it is deliberately by a quantifier
          }
        }
      }

      function handleAlternator() {
        inputmask.hasAlternator = true;
        var alternateToken = match,
          malternateMatches = [],
          maltMatches,
          currentMatches = matches.slice(),
          loopNdxCnt = loopNdx.length,
          unMatchedAlternation = false;
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
            for (var i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
              var excludeSet = maskset.excludes[pos][i].toString().split(":");
              if (loopNdx.length == excludeSet[1]) {
                altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
              }
            }
            if (altIndexArr.length === 0) {
              //fully alternated => reset
              delete maskset.excludes[pos];
              altIndexArr = altIndexArrClone;
            }
          }
          if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) altIndexArr = altIndexArr.slice(0, 1);
          for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
            amndx = parseInt(altIndexArr[ndx]);
            matches = [];
            //set the correct ndxInitializer
            ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
            var tokenMatch = alternateToken.matches[amndx];
            if (tokenMatch && handleMatch(tokenMatch, [amndx].concat(loopNdx), quantifierRecurse)) {
              match = true;
            } else {
              if (ndx === 0) {
                unMatchedAlternation = true;
              }
              if (tokenMatch && tokenMatch.matches && tokenMatch.matches.length > alternateToken.matches[0].matches.length) {
                break;
              }
            }
            maltMatches = matches.slice();
            testPos = currentPos;
            matches = [];

            //fuzzy merge matches
            for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
              var altMatch = maltMatches[ndx1],
                dropMatch = false;
              altMatch.match.jit = altMatch.match.jit || unMatchedAlternation; //mark jit when there are unmatched alternations  ex: mask: "(a|aa)"
              altMatch.alternation = altMatch.alternation || loopNdxCnt;
              setMergeLocators(altMatch);
              for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                var altMatch2 = malternateMatches[ndx2];
                if (typeof altIndex !== "string" || altMatch.alternation !== undefined && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString())) {
                  if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                    dropMatch = true;
                    setMergeLocators(altMatch2, altMatch);
                    break;
                  } else if (isSubsetOf(altMatch, altMatch2, opts)) {
                    if (setMergeLocators(altMatch, altMatch2)) {
                      dropMatch = true;
                      malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                    }
                    break;
                  } else if (isSubsetOf(altMatch2, altMatch, opts)) {
                    setMergeLocators(altMatch2, altMatch);
                    break;
                  } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                    if (!isSameLevel(altMatch, altMatch2) && el.inputmask.userOptions.keepStatic === undefined) {
                      opts.keepStatic = true;
                    } else if (setMergeLocators(altMatch, altMatch2)) {
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
      }
      function handleQuantifier() {
        var qt = match,
          breakloop = false;
        for (var qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
          var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
          match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); //set the tokenGroup as quantifierRecurse marker
          if (match) {
            matches.forEach(function (mtch, ndx) {
              if (IsMatchOf(tokenGroup, mtch.match)) latestMatch = mtch.match;else latestMatch = matches[matches.length - 1].match;

              //mark optionality
              //TODO FIX RECURSIVE QUANTIFIERS
              latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
              // console.log(pos + " " + qt.quantifier.min + " " + latestMatch.optionalQuantifier);
              //qndx + 1 as the index starts from 0
              latestMatch.jit = (qndx + 1) * (tokenGroup.matches.indexOf(latestMatch) + 1) > qt.quantifier.jit;
              if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                insertStop = true;
                testPos = pos; //match the position after the group
                if (opts.greedy && maskset.validPositions[pos - 1] == undefined && qndx > qt.quantifier.min && ["*", "+"].indexOf(qt.quantifier.max) != -1) {
                  matches.pop();
                  cacheDependency = undefined;
                }
                breakloop = true; //stop quantifierloop && search for next possible match
                match = false; //mark match to false to make sure the loop in optionals continues
              }

              if (!breakloop && latestMatch.jit /*&& !latestMatch.optionalQuantifier*/) {
                //always set jitOffset, isvalid checks when to apply
                maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch);
              }
            });
            if (breakloop) break; // search for next possible match
            return true;
          }
        }
      }
      if (testPos > pos + opts._maxTestPos) {
        throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
      }
      if (testPos === pos && match.matches === undefined) {
        matches.push({
          "match": match,
          "locator": loopNdx.reverse(),
          "cd": cacheDependency,
          "mloc": {}
        });
        if (match.optionality && quantifierRecurse === undefined && (opts.definitions && opts.definitions[match.nativeDef] && opts.definitions[match.nativeDef].optional || _inputmask["default"].prototype.definitions[match.nativeDef] && _inputmask["default"].prototype.definitions[match.nativeDef].optional)) {
          //prevent loop see #698
          insertStop = true; //insert a stop
          testPos = pos; //match the position after the group
        } else {
          return true;
        }
      } else if (match.matches !== undefined) {
        if (match.isGroup && quantifierRecurse !== match) {
          //when a group pass along to the quantifier
          return handleGroup();
        } else if (match.isOptional) {
          return handleOptional();
        } else if (match.isAlternator) {
          return handleAlternator();
        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) {
          return handleQuantifier();
        } else {
          match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
          if (match) return true;
        }
      } else {
        testPos++;
      }
    }

    //the offset is set in the quantifierloop when git masking is used
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
  function IsMatchOf(tokenGroup, match) {
    var isMatch = tokenGroup.matches.indexOf(match) != -1;
    if (!isMatch) {
      tokenGroup.matches.forEach(function (mtch, ndx) {
        if (mtch.matches !== undefined && !isMatch) {
          isMatch = IsMatchOf(mtch, match);
        }
      });
    }
    return isMatch;
  }
  function mergeLocators(pos, tests) {
    var locator = [],
      alternation;
    if (!Array.isArray(tests)) tests = [tests];
    if (tests.length > 0) {
      if (tests[0].alternation === undefined || opts.keepStatic === true) {
        locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice();
        if (locator.length === 0) locator = tests[0].locator.slice();
      } else {
        tests.forEach(function (tst) {
          if (tst.def !== "") {
            if (locator.length === 0) {
              alternation = tst.alternation;
              locator = tst.locator.slice();
            } else {
              if (tst.locator[alternation] && locator[alternation].toString().indexOf(tst.locator[alternation]) === -1) {
                locator[alternation] += "," + tst.locator[alternation];
              }
            }
          }
        });
      }
    }
    return locator;
  }
  if (pos > -1) {
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
  var result;
  if (ndxIntlzr !== undefined && maskset.tests[pos]) {
    //prioritize full tests for caching
    result = $.extend(true, [], matches);
  } else {
    maskset.tests[pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props
    result = maskset.tests[pos];
  }

  // console.log(pos + " - " + JSON.stringify(matches));
  //cleanup optionality marking
  matches.forEach(function (t) {
    t.match.optionality = t.match.defOptionality || false;
  });
  return result;
}

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.alternate = alternate;
exports.checkAlternationMatch = checkAlternationMatch;
exports.handleRemove = handleRemove;
exports.isComplete = isComplete;
exports.isSelection = isSelection;
exports.isValid = isValid;
exports.refreshFromBuffer = refreshFromBuffer;
exports.revalidateMask = revalidateMask;
var _validationTests = __webpack_require__(11);
var _keycode = __webpack_require__(9);
var _positioning = __webpack_require__(10);
var _eventhandlers = __webpack_require__(13);
//tobe put on prototype?
function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
  //pos == true => generalize
  var inputmask = this,
    $ = this.dependencyLib,
    opts = this.opts,
    maskset = inputmask.maskset;
  var validPsClone = $.extend(true, [], maskset.validPositions),
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
    lAltPos = rAltPos !== undefined ? rAltPos : _positioning.getLastValidPosition.call(inputmask),
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
    prevAltPos = _validationTests.getTest.call(inputmask, lastAlt);
    alternation = prevAltPos.alternation;
  } else {
    //find last modified alternation
    for (; lAltPos >= 0; lAltPos--) {
      altPos = maskset.validPositions[lAltPos];
      if (altPos && altPos.alternation !== undefined) {
        if (lAltPos <= (maskPos || 0) && prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
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
      maskset.excludes[decisionPos].push((0, _validationTests.getDecisionTaker)(prevAltPos) + ":" + prevAltPos.alternation);
    }
    var validInputs = [],
      resultPos = -1;
    for (i = decisionPos; i < _positioning.getLastValidPosition.call(inputmask, undefined, true) + 1; i++) {
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
      // maskset.tests[decisionPos] = undefined; //clear decisionPos
      maskset.tests = {}; //clear all
      _positioning.resetMaskSet.call(inputmask, true); //clear getbuffer
      isValidRslt = true;
      for (i = 0; i < validInputs.length; i++) {
        nextPos = isValidRslt.caret || _positioning.getLastValidPosition.call(inputmask, undefined, true) + 1;
        input = validInputs[i];
        // nextPos = translatePosition.call(inputmask, nextPos);
        if (!(isValidRslt = isValid.call(inputmask, nextPos, input, false, fromIsValid, true))) {
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
        _positioning.resetMaskSet.call(inputmask);
        prevAltPos = _validationTests.getTest.call(inputmask, decisionPos); //get the current decisionPos to exclude ~ needs to be before restoring the initial validation
        //reset & revert
        maskset.validPositions = $.extend(true, [], validPsClone);
        maskset.tests = $.extend(true, {}, tstClone); //refresh tests after possible alternating
        if (maskset.excludes[decisionPos]) {
          var decisionTaker = (0, _validationTests.getDecisionTaker)(prevAltPos);
          if (maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation) !== -1) {
            returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
            break;
          }
          maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation);
          for (i = decisionPos; i < _positioning.getLastValidPosition.call(inputmask, undefined, true) + 1; i++) {
            delete maskset.validPositions[i];
          }
        } else {
          //latest alternation
          returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
          break;
        }
      } else {
        break;
      }
    }
  }
  //reset alternation excludes
  if (!returnRslt || opts.keepStatic !== false) {
    delete maskset.excludes[decisionPos];
  }
  return returnRslt;
}
function casing(elem, test, pos) {
  var opts = this.opts,
    maskset = this.maskset;
  switch (opts.casing || test.casing) {
    case "upper":
      elem = elem.toUpperCase();
      break;
    case "lower":
      elem = elem.toLowerCase();
      break;
    case "title":
      var posBefore = maskset.validPositions[pos - 1];
      if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(_keycode.keyCode.Space)) {
        elem = elem.toUpperCase();
      } else {
        elem = elem.toLowerCase();
      }
      break;
    default:
      if (typeof opts.casing === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.push(maskset.validPositions);
        elem = opts.casing.apply(this, args);
      }
  }
  return elem;
}

//tobe put on prototype?
function checkAlternationMatch(altArr1, altArr2, na) {
  var opts = this.opts;
  var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
    isMatch = false,
    naArr = na !== undefined ? na.split(",") : [],
    naNdx;

  //remove no alternate indexes from alternation array
  for (var i = 0; i < naArr.length; i++) {
    if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
      altArr1.splice(naNdx, 1);
    }
  }
  for (var alndx = 0; alndx < altArr1.length; alndx++) {
    if (altArrC.includes(altArr1[alndx])) {
      isMatch = true;
      break;
    }
  }
  return isMatch;
}

//tobe put on prototype?
function handleRemove(input, c, pos, strict, fromIsValid) {
  var inputmask = this,
    maskset = this.maskset,
    opts = this.opts;
  if (opts.numericInput || inputmask.isRTL) {
    if (c === _keycode.keys.Backspace) {
      c = _keycode.keys.Delete;
    } else if (c === _keycode.keys.Delete) {
      c = _keycode.keys.Backspace;
    }
    if (inputmask.isRTL) {
      var pend = pos.end;
      pos.end = pos.begin;
      pos.begin = pend;
    }
  }
  var lvp = _positioning.getLastValidPosition.call(inputmask, undefined, true);
  if (pos.end >= _positioning.getBuffer.call(inputmask).length && lvp >= pos.end) {
    //handle numeric negate symbol offset, due to  dynamic jit masking
    pos.end = lvp + 1;
  }
  if (c === _keycode.keys.Backspace) {
    if (pos.end - pos.begin < 1) {
      pos.begin = _positioning.seekPrevious.call(inputmask, pos.begin);
    }
  } else if (c === _keycode.keys.Delete) {
    if (pos.begin === pos.end) {
      pos.end = _positioning.isMask.call(inputmask, pos.end, true, true) ? pos.end + 1 : _positioning.seekNext.call(inputmask, pos.end) + 1;
    }
  }
  var offset;
  if ((offset = revalidateMask.call(inputmask, pos)) !== false) {
    if (strict !== true && opts.keepStatic !== false || opts.regex !== null && _validationTests.getTest.call(inputmask, pos.begin).match.def.indexOf("|") !== -1) {
      //TODO NEEDS BETTER CHECK WHEN TO ALTERNATE  ~ opts regex isn"t good enough
      var result = alternate.call(inputmask, true);
      if (result) {
        var newPos = result.caret !== undefined ? result.caret : result.pos ? _positioning.seekNext.call(inputmask, result.pos.begin ? result.pos.begin : result.pos) : _positioning.getLastValidPosition.call(inputmask, -1, true);
        if (c !== _keycode.keys.Delete || pos.begin > newPos) {
          pos.begin == newPos;
        }
      }
    }
    if (strict !== true) {
      maskset.p = c === _keycode.keys.Delete ? pos.begin + offset : pos.begin;
      maskset.p = _positioning.determineNewCaretPosition.call(inputmask, {
        begin: maskset.p,
        end: maskset.p
      }, false, opts.insertMode === false && c === _keycode.keys.Backspace ? "none" : undefined).begin;
    }
  }
}

//tobe put on prototype?
function isComplete(buffer) {
  //return true / false / undefined (repeat *)
  var inputmask = this,
    opts = this.opts,
    maskset = this.maskset;
  if (typeof opts.isComplete === "function") return opts.isComplete(buffer, opts);
  if (opts.repeat === "*") return undefined;
  var complete = false,
    lrp = _positioning.determineLastRequiredPosition.call(inputmask, true),
    aml = _positioning.seekPrevious.call(inputmask, lrp.l);
  if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
    complete = true;
    for (var i = 0; i <= aml; i++) {
      var test = _validationTests.getTestTemplate.call(inputmask, i).match;
      if (test["static"] !== true && maskset.validPositions[i] === undefined && test.optionality !== true && test.optionalQuantifier !== true || test["static"] === true && buffer[i] !== _validationTests.getPlaceholder.call(inputmask, i, test)) {
        complete = false;
        break;
      }
    }
  }
  return complete;
}
function isSelection(posObj) {
  var inputmask = this,
    opts = this.opts,
    insertModeOffset = opts.insertMode ? 0 : 1;
  return inputmask.isRTL ? posObj.begin - posObj.end > insertModeOffset : posObj.end - posObj.begin > insertModeOffset;
}

//tobe put on prototype?
function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
  //strict true ~ no correction or autofill
  var inputmask = this,
    $ = this.dependencyLib,
    opts = this.opts,
    maskset = inputmask.maskset;
  strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

  var maskPos = pos;
  if (pos.begin !== undefined) {
    //position was a position object - used to handle a delete by typing over a selection
    maskPos = inputmask.isRTL ? pos.end : pos.begin;
  }
  function processCommandObject(commandObj) {
    if (commandObj !== undefined) {
      if (commandObj.remove !== undefined) {
        //remove position(s)
        if (!Array.isArray(commandObj.remove)) commandObj.remove = [commandObj.remove];
        commandObj.remove.sort(function (a, b) {
          return inputmask.isRTL ? a.pos - b.pos : b.pos - a.pos;
        }).forEach(function (lmnt) {
          revalidateMask.call(inputmask, {
            begin: lmnt,
            end: lmnt + 1
          });
        });
        commandObj.remove = undefined;
      }
      if (commandObj.insert !== undefined) {
        //insert position(s)
        if (!Array.isArray(commandObj.insert)) commandObj.insert = [commandObj.insert];
        commandObj.insert.sort(function (a, b) {
          return inputmask.isRTL ? b.pos - a.pos : a.pos - b.pos;
        }).forEach(function (lmnt) {
          if (lmnt.c !== "") {
            isValid.call(inputmask, lmnt.pos, lmnt.c, lmnt.strict !== undefined ? lmnt.strict : true, lmnt.fromIsValid !== undefined ? lmnt.fromIsValid : fromIsValid);
          }
        });
        commandObj.insert = undefined;
      }
      if (commandObj.refreshFromBuffer && commandObj.buffer) {
        var refresh = commandObj.refreshFromBuffer;
        refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, commandObj.buffer);
        commandObj.refreshFromBuffer = undefined;
      }
      if (commandObj.rewritePosition !== undefined) {
        maskPos = commandObj.rewritePosition;
        // commandObj.rewritePosition = undefined;
        commandObj = true;
      }
    }
    return commandObj;
  }
  function _isValid(position, c, strict) {
    var rslt = false;
    _validationTests.getTests.call(inputmask, position).every(function (tst, ndx) {
      var test = tst.match;
      //make sure the buffer is set and correct
      _positioning.getBuffer.call(inputmask, true);
      if (test.jit && maskset.validPositions[_positioning.seekPrevious.call(inputmask, position)] === undefined)
        //ignore if jit is not desirable
        {
          rslt = false;
        } else {
        //return is false or a json object => { pos: ??, c: ??} or true
        rslt = test.fn != null ? test.fn.test(c, maskset, position, strict, opts, isSelection.call(inputmask, pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ?
        //non mask
        {
          c: _validationTests.getPlaceholder.call(inputmask, position, test, true) || test.def,
          pos: position
        } : false;
      }
      if (rslt !== false) {
        var elem = rslt.c !== undefined ? rslt.c : c,
          validatedPos = position;
        elem = elem === opts.skipOptionalPartCharacter && test["static"] === true ? _validationTests.getPlaceholder.call(inputmask, position, test, true) || test.def : elem;
        rslt = processCommandObject(rslt);
        if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) {
          //their is a position offset
          validatedPos = rslt.pos;
        }
        if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
          return false; //breakout if nothing to insert
        }

        if (revalidateMask.call(inputmask, pos, $.extend({}, tst, {
          "input": casing.call(inputmask, elem, test, validatedPos)
        }), fromIsValid, validatedPos) === false) {
          rslt = false;
        }
        return false; //break from loop
      }

      return true;
    });
    return rslt;
  }
  var result = true,
    positionsClone = $.extend(true, {}, maskset.validPositions); //clone the currentPositions

  if (opts.keepStatic === false && maskset.excludes[maskPos] !== undefined && fromAlternate !== true && fromIsValid !== true) {
    for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) {
      if (maskset.excludes[i] !== undefined) {
        maskset.excludes[i] = undefined;
        delete maskset.tests[i];
      }
    }
  }
  if (typeof opts.preValidation === "function" && fromIsValid !== true && validateOnly !== true) {
    result = opts.preValidation.call(inputmask, _positioning.getBuffer.call(inputmask), maskPos, c, isSelection.call(inputmask, pos), opts, maskset, pos, strict || fromAlternate);
    result = processCommandObject(result);
  }
  if (result === true) {
    //preValidation result
    result = _isValid(maskPos, c, strict);
    if ((!strict || fromIsValid === true) && result === false && validateOnly !== true) {
      var currentPosValid = maskset.validPositions[maskPos];
      if (currentPosValid && currentPosValid.match["static"] === true && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
        result = {
          "caret": _positioning.seekNext.call(inputmask, maskPos)
        };
      } else {
        if (opts.insertMode || maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] === undefined || pos.end > maskPos) {
          //does the input match on a further position?
          var skip = false;
          if (maskset.jitOffset[maskPos] && maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] === undefined) {
            result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, true, true);
            if (result !== false) {
              if (fromAlternate !== true) result.caret = maskPos;
              skip = true;
            }
          }
          if (pos.end > maskPos) {
            maskset.validPositions[maskPos] = undefined;
          }
          if (!skip && !_positioning.isMask.call(inputmask, maskPos, opts.keepStatic && maskPos === 0)) {
            for (var nPos = maskPos + 1, snPos = _positioning.seekNext.call(inputmask, maskPos, false, maskPos !== 0); nPos <= snPos; nPos++) {
              // if (!isMask(nPos, true)) {
              // 	continue;
              // }
              result = _isValid(nPos, c, strict);
              if (result !== false) {
                result = trackbackPositions.call(inputmask, maskPos, result.pos !== undefined ? result.pos : nPos) || result;
                maskPos = nPos;
                break;
              }
            }
          }
        }
      }
    }
    if (inputmask.hasAlternator && fromAlternate !== true && !strict) {
      if (result === false && opts.keepStatic && (isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) || maskPos === 0)) {
        //try fuzzy alternator logic
        result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, undefined, pos);
      } else if (isSelection.call(inputmask, pos) && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && opts.keepStatic) {
        //selection clears an alternated keepstatic mask ~ #2189
        result = alternate.call(inputmask, true);
      } else if (result == true && opts.numericInput !== true && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && _positioning.getLastValidPosition.call(inputmask, undefined, true) > maskPos) {
        // console.log("Alternating");
        result = alternate.call(inputmask, true);
      }
    }
    if (result === true) {
      result = {
        "pos": maskPos
      };
    }
  }
  if (typeof opts.postValidation === "function" && fromIsValid !== true && validateOnly !== true) {
    var postResult = opts.postValidation.call(inputmask, _positioning.getBuffer.call(inputmask, true), pos.begin !== undefined ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval);
    if (postResult !== undefined) {
      result = postResult === true ? result : postResult;
    }
  }
  if (result && result.pos === undefined) {
    result.pos = maskPos;
  }
  if (result === false || validateOnly === true) {
    _positioning.resetMaskSet.call(inputmask, true);
    maskset.validPositions = $.extend(true, [], positionsClone); //revert validation changes
  } else {
    trackbackPositions.call(inputmask, undefined, maskPos, true);
  }
  var endResult = processCommandObject(result);
  // console.log("returned result " + JSON.stringify(endResult));
  if (inputmask.maxLength !== undefined) {
    var buffer = _positioning.getBuffer.call(inputmask);
    if (buffer.length > inputmask.maxLength && !fromIsValid) {
      _positioning.resetMaskSet.call(inputmask, true);
      maskset.validPositions = $.extend(true, [], positionsClone); //revert validation changes
      endResult = false;
    }
  }
  return endResult;
}

//tobe put on prototype?
function positionCanMatchDefinition(pos, testDefinition, opts) {
  var inputmask = this,
    maskset = this.maskset;
  var valid = false,
    tests = _validationTests.getTests.call(inputmask, pos);
  for (var tndx = 0; tndx < tests.length; tndx++) {
    if (tests[tndx].match && (tests[tndx].match["nativeDef"] === testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] && (!opts.shiftPositions || !testDefinition.match["static"]) || tests[tndx].match["nativeDef"] === testDefinition.match["nativeDef"] || opts.regex && !tests[tndx].match["static"] && tests[tndx].match.fn.test(testDefinition.input, maskset, pos, false, opts))) {
      valid = true;
      break;
    } else if (tests[tndx].match && tests[tndx].match["def"] === testDefinition.match["nativeDef"]) {
      valid = undefined;
      break;
    }
  }
  if (valid === false) {
    if (maskset.jitOffset[pos] !== undefined) {
      valid = positionCanMatchDefinition.call(inputmask, pos + maskset.jitOffset[pos], testDefinition, opts);
    }
  }
  return valid;
}

//tobe put on prototype?
function refreshFromBuffer(start, end, buffer) {
  var inputmask = this,
    maskset = this.maskset,
    opts = this.opts,
    $ = this.dependencyLib;
  // checkVal.call(inputmask, el, false, true, isRTL ? buffer.reverse() : buffer);
  var i,
    p,
    skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
    bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer;
  opts.skipOptionalPartCharacter = "";
  if (start === true) {
    _positioning.resetMaskSet.call(inputmask);
    maskset.tests = {}; //refresh tests after possible alternating
    start = 0;
    end = buffer.length;
    p = _positioning.determineNewCaretPosition.call(inputmask, {
      begin: 0,
      end: 0
    }, false).begin;
  } else {
    for (i = start; i < end; i++) {
      delete maskset.validPositions[i];
    }
    p = start;
  }
  var keypress = new $.Event("keypress");
  for (i = start; i < end; i++) {
    keypress.key = bffr[i].toString();
    inputmask.ignorable = false; //make sure ignorable is ignored ;-)
    var valResult = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, true, false, false, p);
    if (valResult !== false && valResult !== undefined) {
      p = valResult.forwardPosition;
    }
  }
  opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}

//tobe put on prototype?
//fill in best positions according the current input
function trackbackPositions(originalPos, newPos, fillOnly) {
  var inputmask = this,
    maskset = this.maskset,
    $ = this.dependencyLib;

  // console.log("trackbackPositions " + originalPos + " " + newPos);
  if (originalPos === undefined) {
    //find previous valid
    for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
      if (maskset.validPositions[originalPos]) break;
    }
  }
  for (var ps = originalPos; ps < newPos; ps++) {
    if (maskset.validPositions[ps] === undefined && !_positioning.isMask.call(inputmask, ps, false)) {
      var vp = ps == 0 ? _validationTests.getTest.call(inputmask, ps) : maskset.validPositions[ps - 1];
      if (vp) {
        var tests = _validationTests.getTests.call(inputmask, ps).slice();
        if (tests[tests.length - 1].match.def === "") tests.pop();
        var bestMatch = _validationTests.determineTestTemplate.call(inputmask, ps, tests),
          np;
        if (bestMatch && (bestMatch.match.jit !== true || bestMatch.match.newBlockMarker === "master" && (np = maskset.validPositions[ps + 1]) && np.match.optionalQuantifier === true)) {
          bestMatch = $.extend({}, bestMatch, {
            "input": _validationTests.getPlaceholder.call(inputmask, ps, bestMatch.match, true) || bestMatch.match.def
          });
          bestMatch.generatedInput = true;
          revalidateMask.call(inputmask, ps, bestMatch, true);
          if (fillOnly !== true) {
            //revalidate the new position to update the locator value
            var cvpInput = maskset.validPositions[newPos].input;
            maskset.validPositions[newPos] = undefined;
            return isValid.call(inputmask, newPos, cvpInput, true, true);
          }
        }
      }
    }
  }
}

//tobe put on prototype?
function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
  var inputmask = this,
    maskset = this.maskset,
    opts = this.opts,
    $ = this.dependencyLib;
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
    end = pos.end !== undefined ? pos.end : pos,
    valid = true;
  if (pos.begin > pos.end) {
    begin = pos.end;
    end = pos.begin;
  }
  validatedPos = validatedPos !== undefined ? validatedPos : begin;
  if (fromIsValid === undefined && (begin !== end || opts.insertMode && maskset.validPositions[validatedPos] !== undefined || validTest === undefined || validTest.match.optionalQuantifier || validTest.match.optionality)) {
    //reposition & revalidate others
    var positionsClone = $.extend(true, {}, maskset.validPositions),
      lvp = _positioning.getLastValidPosition.call(inputmask, undefined, true),
      i;
    maskset.p = begin; //needed for alternated position after overtype selection

    for (i = lvp; i >= begin; i--) {
      delete maskset.validPositions[i];
      if (validTest === undefined) delete maskset.tests[i + 1];
    }
    var j = validatedPos,
      posMatch = j,
      t,
      canMatch,
      test;
    if (validTest) {
      maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
      posMatch++;
      j++;
    }
    for (i = validTest ? end : end - 1; i <= lvp; i++) {
      if ((t = positionsClone[i]) !== undefined && t.generatedInput !== true && (i >= end || i >= begin && IsEnclosedStatic(i, positionsClone, {
        begin: begin,
        end: end
      }))) {
        while (test = _validationTests.getTest.call(inputmask, posMatch), test.match.def !== "") {
          //loop needed to match further positions
          if ((canMatch = positionCanMatchDefinition.call(inputmask, posMatch, t, opts)) !== false || t.match.def === "+") {
            //validated match //we still need some hackery for the + validator (numeric alias)
            if (t.match.def === "+") _positioning.getBuffer.call(inputmask, true);
            var result = isValid.call(inputmask, posMatch, t.input, t.match.def !== "+", /*t.match.def !== "+"*/true);
            valid = result !== false;
            j = (result.pos || posMatch) + 1;
            if (!valid && canMatch) break;
          } else {
            valid = false;
          }
          if (valid) {
            if (validTest === undefined && t.match["static"] && i === pos.begin) offset++;
            break;
          }
          if (!valid && _positioning.getBuffer.call(inputmask), posMatch > maskset.maskLength) {
            break;
          }
          posMatch++;
        }
        if (_validationTests.getTest.call(inputmask, posMatch).match.def == "") {
          valid = false;
        }
        //restore position
        posMatch = j;
      }
      if (!valid) break;
    }
    if (!valid) {
      maskset.validPositions = $.extend(true, [], positionsClone);
      _positioning.resetMaskSet.call(inputmask, true);
      return false;
    }
  } else if (validTest && _validationTests.getTest.call(inputmask, validatedPos).match.cd === validTest.match.cd) {
    maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
  }
  _positioning.resetMaskSet.call(inputmask, true);
  return offset;
}

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EventHandlers = void 0;
var _positioning = __webpack_require__(10);
var _keycode = __webpack_require__(9);
var _environment = __webpack_require__(14);
var _validation = __webpack_require__(12);
var _inputHandling = __webpack_require__(17);
var _validationTests = __webpack_require__(11);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var EventHandlers = {
  keyEvent: function keyEvent(e, checkval, writeOut, strict, ndx) {
    var inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib,
      maskset = inputmask.maskset;
    var input = this,
      $input = $(input),
      c = e.key,
      pos = _positioning.caret.call(inputmask, input);
    var kdResult = opts.onKeyDown.call(this, e, _positioning.getBuffer.call(inputmask), pos, opts);
    if (kdResult !== undefined) return kdResult;

    //backspace, delete, and escape get special treatment
    if (c === _keycode.keys.Backspace || c === _keycode.keys.Delete || _environment.iphone && c === _keycode.keys.BACKSPACE_SAFARI || e.ctrlKey && c === _keycode.keys.x && !("oncut" in input)) {
      //backspace/delete
      e.preventDefault(); //stop default action but allow propagation
      _validation.handleRemove.call(inputmask, input, c, pos);
      (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask, true), maskset.p, e, input.inputmask._valueGet() !== _positioning.getBuffer.call(inputmask).join(""));
    } else if (c === _keycode.keys.End || c === _keycode.keys.PageDown) {
      //when END or PAGE_DOWN pressed set position at lastmatch
      e.preventDefault();
      var caretPos = _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask));
      _positioning.caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
    } else if (c === _keycode.keys.Home && !e.shiftKey || c === _keycode.keys.PageUp) {
      //Home or page_up
      e.preventDefault();
      _positioning.caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, true);
    } else if ((opts.undoOnEscape && c === _keycode.keys.Escape ||  false && 0) && e.altKey !== true) {
      //escape && undo && #762
      (0, _inputHandling.checkVal)(input, true, false, inputmask.undoValue.split(""));
      $input.trigger("click");
    } else if (c === _keycode.keys.Insert && !(e.shiftKey || e.ctrlKey) && inputmask.userOptions.insertMode === undefined) {
      //insert
      if (!_validation.isSelection.call(inputmask, pos)) {
        opts.insertMode = !opts.insertMode;
        _positioning.caret.call(inputmask, input, pos.begin, pos.begin);
      } else opts.insertMode = !opts.insertMode;
    } else if (opts.tabThrough === true && c === _keycode.keys.Tab) {
      if (e.shiftKey === true) {
        pos.end = _positioning.seekPrevious.call(inputmask, pos.end, true);
        if (_validationTests.getTest.call(inputmask, pos.end - 1).match["static"] === true) {
          pos.end--;
        }
        pos.begin = _positioning.seekPrevious.call(inputmask, pos.end, true);
        if (pos.begin >= 0 && pos.end > 0) {
          e.preventDefault();
          _positioning.caret.call(inputmask, input, pos.begin, pos.end);
        }
      } else {
        pos.begin = _positioning.seekNext.call(inputmask, pos.begin, true);
        pos.end = _positioning.seekNext.call(inputmask, pos.begin, true);
        if (pos.end < maskset.maskLength) pos.end--;
        if (pos.begin <= maskset.maskLength) {
          e.preventDefault();
          _positioning.caret.call(inputmask, input, pos.begin, pos.end);
        }
      }
    } else if (!e.shiftKey) {
      if (opts.insertModeVisual && opts.insertMode === false) {
        if (c === _keycode.keys.ArrowRight) {
          setTimeout(function () {
            var caretPos = _positioning.caret.call(inputmask, input);
            _positioning.caret.call(inputmask, input, caretPos.begin);
          }, 0);
        } else if (c === _keycode.keys.ArrowLeft) {
          setTimeout(function () {
            var caretPos = {
              begin: _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.begin),
              end: _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.end)
            };
            if (inputmask.isRTL) {
              _positioning.caret.call(inputmask, input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1));
            } else {
              _positioning.caret.call(inputmask, input, caretPos.begin - (caretPos.begin === 0 ? 0 : 1));
            }
          }, 0);
        }
      }
    }
    inputmask.isComposing = c == _keycode.keys.Process || c == _keycode.keys.Unidentified;
    inputmask.ignorable = opts.ignorables.includes(c);
    return EventHandlers.keypressEvent.call(this, e, checkval, writeOut, strict, ndx);
  },
  keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
    var inputmask = this.inputmask || this,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib,
      maskset = inputmask.maskset;
    var input = inputmask.el,
      $input = $(input),
      c = e.key;
    if (checkval !== true && !(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) {
      if (c === _keycode.keys.Enter) {
        if (inputmask.undoValue !== inputmask._valueGet(true)) {
          inputmask.undoValue = inputmask._valueGet(true);
          // e.preventDefault();

          setTimeout(function () {
            $input.trigger("change");
          }, 0);
        }
      }
      //inputmask.skipInputEvent = true; //skip the input as otherwise the skipped char could be picked up for validation by the inputfallback
      return;
    } else if (c) {
      //special treat the decimal separator
      // if ((k === 44 || k === 46) && e.location === 3 && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
      var pos = checkval ? {
          begin: ndx,
          end: ndx
        } : _positioning.caret.call(inputmask, input),
        forwardPosition;

      //allow for character substitution
      c = opts.substitutes[c] || c;
      maskset.writeOutBuffer = true;
      var valResult = _validation.isValid.call(inputmask, pos, c, strict, undefined, undefined, undefined, checkval);
      if (valResult !== false) {
        _positioning.resetMaskSet.call(inputmask, true);
        forwardPosition = valResult.caret !== undefined ? valResult.caret : _positioning.seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos);
        maskset.p = forwardPosition; //needed for checkval
      }

      forwardPosition = opts.numericInput && valResult.caret === undefined ? _positioning.seekPrevious.call(inputmask, forwardPosition) : forwardPosition;
      if (writeOut !== false) {
        setTimeout(function () {
          opts.onKeyValidation.call(input, c, valResult);
        }, 0);
        if (maskset.writeOutBuffer && valResult !== false) {
          var buffer = _positioning.getBuffer.call(inputmask);
          (0, _inputHandling.writeBuffer)(input, buffer, forwardPosition, e, checkval !== true);
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
    var inputmask = this.inputmask,
      opts = inputmask.opts;
    var input = this,
      inputValue = inputmask._valueGet(true),
      caretPos = _positioning.caret.call(inputmask, input),
      tempValue;
    if (inputmask.isRTL) {
      tempValue = caretPos.end;
      caretPos.end = _positioning.translatePosition.call(inputmask, caretPos.begin);
      caretPos.begin = _positioning.translatePosition.call(inputmask, tempValue);
    }
    var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
      valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
    if (valueBeforeCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
    if (valueAfterCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(caretPos.end).join("")) valueAfterCaret = "";
    if (window.clipboardData && window.clipboardData.getData) {
      // IE
      inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
    } else if (e.clipboardData && e.clipboardData.getData) {
      inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
    } else {
      return true;
    } //allow native paste event as fallback ~ masking will continue by inputfallback

    var pasteValue = inputValue;
    if (inputmask.isRTL) {
      pasteValue = pasteValue.split("");
      var _iterator = _createForOfIteratorHelper(_positioning.getBufferTemplate.call(inputmask)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          if (pasteValue[0] === c) pasteValue.shift();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      pasteValue = pasteValue.join("");
    }
    if (typeof opts.onBeforePaste === "function") {
      pasteValue = opts.onBeforePaste.call(inputmask, pasteValue, opts);
      if (pasteValue === false) {
        return false;
      }
      if (!pasteValue) {
        pasteValue = inputValue;
      }
    }
    (0, _inputHandling.checkVal)(input, true, false, pasteValue.toString().split(""), e);
    e.preventDefault();
  },
  inputFallBackEvent: function inputFallBackEvent(e) {
    //fallback when keypress is not triggered
    var inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib;
    // console.log(e.inputType);

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
        placeholder;

      //align buffers
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
      var oldBuffer = frontBufferPart.concat(backBufferPart);

      // console.log("N " + newBuffer);
      // console.log("O " + oldBuffer);

      for (i = 0, bl = newBuffer.length; i < bl; i++) {
        placeholder = _validationTests.getPlaceholder.call(inputmask, _positioning.translatePosition.call(inputmask, i));
        switch (action) {
          case "insertText":
            if (oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1) {
              data.push(newBuffer[i]);
            }
            i = bl;
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
              if ((newBuffer[i + 1] === marker || newBuffer[i + 1] === placeholder || newBuffer[i + 1] === undefined) && (oldBuffer[i] === placeholder && oldBuffer[i + 1] === marker || oldBuffer[i] === marker)) {
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
              } else if (newBuffer[i] !== placeholder && newBuffer[i] !== marker && (newBuffer[i + 1] === marker || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1] /*single char replacement*/)) {
                //replace selection
                action = "insertReplacementText";
                data.push(newBuffer[i]);
                caretPos.begin--;
              } else if (newBuffer[i] === marker) {
                //delete~backspace
                action = "deleteContentBackward";
                if (_positioning.isMask.call(inputmask, _positioning.translatePosition.call(inputmask, i), true) || oldBuffer[i] === opts.radixPoint) caretPos.end++;
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
      buffer = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join(""),
      caretPos = _positioning.caret.call(inputmask, input, undefined, undefined, true),
      changes;
    if (buffer !== inputValue) {
      changes = analyseChanges(inputValue, buffer, caretPos);
      if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
        input.focus();
      }
      (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask));
      _positioning.caret.call(inputmask, input, caretPos.begin, caretPos.end, true);

      // Japanese IME hack #2662
      if (!_environment.mobile && inputmask.skipNextInsert && e.inputType === "insertText" && changes.action === "insertText" && inputmask.isComposing) {
        return false;
      }
      if (e.inputType === "insertCompositionText" && changes.action === "insertText" && inputmask.isComposing) {
        inputmask.skipNextInsert = true;
      } else {
        inputmask.skipNextInsert = false;
      }
      switch (changes.action) {
        case "insertText":
        case "insertReplacementText":
          changes.data.forEach(function (entry, ndx) {
            var keypress = new $.Event("keypress");
            keypress.key = entry;
            inputmask.ignorable = false; //make sure ignorable is ignored ;-)
            EventHandlers.keypressEvent.call(input, keypress);
          });
          setTimeout(function () {
            //#2195 trigger keyup to help some other plugins to track changes
            inputmask.$el.trigger("keyup");
          }, 0);
          break;
        case "deleteContentBackward":
          var keydown = new $.Event("keydown");
          keydown.key = _keycode.keys.Backspace;
          EventHandlers.keyEvent.call(input, keydown);
          break;
        default:
          (0, _inputHandling.applyInputValue)(input, inputValue);
          _positioning.caret.call(inputmask, input, caretPos.begin, caretPos.end, true);
          break;
      }
      e.preventDefault();
    }
  },
  setValueEvent: function setValueEvent(e) {
    var inputmask = this.inputmask;
    var input = this,
      value = e && e.detail ? e.detail[0] : arguments[1];
    if (value === undefined) {
      value = input.inputmask._valueGet(true);
    }
    (0, _inputHandling.applyInputValue)(input, value);
    if (e.detail && e.detail[1] !== undefined || arguments[2] !== undefined) {
      _positioning.caret.call(inputmask, input, e.detail ? e.detail[1] : arguments[2]);
    }
  },
  focusEvent: function focusEvent(e) {
    var inputmask = this.inputmask,
      opts = inputmask.opts;
    var input = this,
      nptValue = inputmask === null || inputmask === void 0 ? void 0 : inputmask._valueGet();
    if (opts.showMaskOnFocus) {
      if (nptValue !== _positioning.getBuffer.call(inputmask).join("")) {
        (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask), _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask)));
      } /*else if (mouseEnter === false) { //only executed on focus without mouseenter
        caret(input, seekNext(getLastValidPosition()));
        }*/
    }

    if (opts.positionCaretOnTab === true && inputmask.mouseEnter === false && (!_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) || _positioning.getLastValidPosition.call(inputmask) === -1)) {
      EventHandlers.clickEvent.apply(input, [e, true]);
    }
    inputmask.undoValue = inputmask === null || inputmask === void 0 ? void 0 : inputmask._valueGet(true);
  },
  invalidEvent: function invalidEvent(e) {
    this.inputmask.validationEvent = true;
  },
  mouseleaveEvent: function mouseleaveEvent() {
    var inputmask = this.inputmask,
      opts = inputmask.opts;
    var input = this;
    inputmask.mouseEnter = false;
    if (opts.clearMaskOnLostFocus && (input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
      (0, _inputHandling.HandleNativePlaceholder)(input, inputmask.originalPlaceholder);
    }
  },
  clickEvent: function clickEvent(e, tabbed) {
    var inputmask = this.inputmask;
    inputmask.clicked++;
    var input = this;
    if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement === input) {
      var newCaretPosition = _positioning.determineNewCaretPosition.call(inputmask, _positioning.caret.call(inputmask, input), tabbed);
      if (newCaretPosition !== undefined) {
        _positioning.caret.call(inputmask, input, newCaretPosition);
      }
    }
  },
  cutEvent: function cutEvent(e) {
    var inputmask = this.inputmask,
      maskset = inputmask.maskset;
    var input = this,
      pos = _positioning.caret.call(inputmask, input);

    //correct clipboardData
    var clipData = inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice(pos.end, pos.begin) : _positioning.getBuffer.call(inputmask).slice(pos.begin, pos.end),
      clipDataText = inputmask.isRTL ? clipData.reverse().join("") : clipData.join("");
    if (window.navigator.clipboard) window.navigator.clipboard.writeText(clipDataText);else if (window.clipboardData && window.clipboardData.getData) {
      // IE
      window.clipboardData.setData("Text", clipDataText);
    }
    _validation.handleRemove.call(inputmask, input, _keycode.keys.Delete, pos);
    (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== inputmask._valueGet(true));
  },
  blurEvent: function blurEvent(e) {
    var inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib;
    inputmask.clicked = 0;
    var $input = $(this),
      input = this;
    if (input.inputmask) {
      (0, _inputHandling.HandleNativePlaceholder)(input, inputmask.originalPlaceholder);
      var nptValue = input.inputmask._valueGet(),
        buffer = _positioning.getBuffer.call(inputmask).slice();
      if (nptValue !== "") {
        if (opts.clearMaskOnLostFocus) {
          if (_positioning.getLastValidPosition.call(inputmask) === -1 && nptValue === _positioning.getBufferTemplate.call(inputmask).join("")) {
            buffer = [];
          } else {
            //clearout optional tail of the mask
            _inputHandling.clearOptionalTail.call(inputmask, buffer);
          }
        }
        if (_validation.isComplete.call(inputmask, buffer) === false) {
          setTimeout(function () {
            $input.trigger("incomplete");
          }, 0);
          if (opts.clearIncomplete) {
            _positioning.resetMaskSet.call(inputmask);
            if (opts.clearMaskOnLostFocus) {
              buffer = [];
            } else {
              buffer = _positioning.getBufferTemplate.call(inputmask).slice();
            }
          }
        }
        (0, _inputHandling.writeBuffer)(input, buffer, undefined, e);
      }
      if (inputmask.undoValue !== inputmask._valueGet(true)) {
        inputmask.undoValue = inputmask._valueGet(true);
        $input.trigger("change");
      }
    }
  },
  mouseenterEvent: function mouseenterEvent() {
    var inputmask = this.inputmask,
      showMaskOnHover = inputmask.opts.showMaskOnHover;
    var input = this;
    inputmask.mouseEnter = true;
    if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
      var bufferTemplate = (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("");
      if (showMaskOnHover) {
        (0, _inputHandling.HandleNativePlaceholder)(input, bufferTemplate);
      }
    }
  },
  submitEvent: function submitEvent() {
    //trigger change on submit if any
    var inputmask = this.inputmask,
      opts = inputmask.opts;
    if (inputmask.undoValue !== inputmask._valueGet(true)) {
      inputmask.$el.trigger("change");
    }
    if ( /*opts.clearMaskOnLostFocus && */_positioning.getLastValidPosition.call(inputmask) === -1 && inputmask._valueGet && inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("")) {
      inputmask._valueSet(""); //clear masktemplete on submit and still has focus
    }

    if (opts.clearIncomplete && _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) === false) {
      inputmask._valueSet("");
    }
    if (opts.removeMaskOnSubmit) {
      inputmask._valueSet(inputmask.unmaskedvalue(), true);
      setTimeout(function () {
        (0, _inputHandling.writeBuffer)(inputmask.el, _positioning.getBuffer.call(inputmask));
      }, 0);
    }
  },
  resetEvent: function resetEvent() {
    var inputmask = this.inputmask;
    inputmask.refreshValue = true; //indicate a forced refresh when there is a call to the value before leaving the triggering event fn
    setTimeout(function () {
      (0, _inputHandling.applyInputValue)(inputmask.el, inputmask._valueGet(true));
    }, 0);
  }
};
exports.EventHandlers = EventHandlers;

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mobile = exports.iphone = exports.ie = void 0;
var _window = _interopRequireDefault(__webpack_require__(15));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ua = _window["default"].navigator && _window["default"].navigator.userAgent || "",
  ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0,
  mobile = navigator.userAgentData && navigator.userAgentData.mobile || _window["default"].navigator && _window["default"].navigator.maxTouchPoints || "ontouchstart" in _window["default"],
  //not entirely correct but will currently do
  iphone = /iphone/i.test(ua);
exports.iphone = iphone;
exports.mobile = mobile;
exports.ie = ie;

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _canUseDOM = _interopRequireDefault(__webpack_require__(16));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _canUseDOM["default"] ? window : {};
exports["default"] = _default;

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var _default = canUseDOM;
exports["default"] = _default;

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HandleNativePlaceholder = HandleNativePlaceholder;
exports.applyInputValue = applyInputValue;
exports.checkVal = checkVal;
exports.clearOptionalTail = clearOptionalTail;
exports.unmaskedvalue = unmaskedvalue;
exports.writeBuffer = writeBuffer;
var _keycode = __webpack_require__(9);
var _validationTests = __webpack_require__(11);
var _positioning = __webpack_require__(10);
var _validation = __webpack_require__(12);
var _environment = __webpack_require__(14);
var _eventhandlers = __webpack_require__(13);
function applyInputValue(input, value) {
  var inputmask = input ? input.inputmask : this,
    opts = inputmask.opts;
  input.inputmask.refreshValue = false;
  if (typeof opts.onBeforeMask === "function") value = opts.onBeforeMask.call(inputmask, value, opts) || value;
  value = (value || "").toString().split("");
  checkVal(input, true, false, value);
  inputmask.undoValue = inputmask._valueGet(true);
  if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && _positioning.getLastValidPosition.call(inputmask) === -1) {
    input.inputmask._valueSet("");
  }
}

//todo put on prototype?
function clearOptionalTail(buffer) {
  var inputmask = this;
  buffer.length = 0;
  var template = _validationTests.getMaskTemplate.call(inputmask, true, 0, true, undefined, true),
    lmnt;
  while ((lmnt = template.shift()) !== undefined) {
    buffer.push(lmnt);
  }
  return buffer;
}
function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
  var inputmask = input ? input.inputmask : this,
    maskset = inputmask.maskset,
    opts = inputmask.opts,
    $ = inputmask.dependencyLib;
  var inputValue = nptvl.slice(),
    charCodes = "",
    initialNdx = -1,
    result = undefined,
    skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
  opts.skipOptionalPartCharacter = ""; //see issue #2311

  function isTemplateMatch(ndx, charCodes) {
    var targetTemplate = _validationTests.getMaskTemplate.call(inputmask, true, 0).slice(ndx, _positioning.seekNext.call(inputmask, ndx, false, false)).join("").replace(/'/g, ""),
      charCodeNdx = targetTemplate.indexOf(charCodes);
    //strip spaces from targetTemplate
    while (charCodeNdx > 0 && targetTemplate[charCodeNdx - 1] === " ") {
      charCodeNdx--;
    }
    var match = charCodeNdx === 0 && !_positioning.isMask.call(inputmask, ndx) && (_validationTests.getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || _validationTests.getTest.call(inputmask, ndx).match["static"] === true && _validationTests.getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || _validationTests.getTest.call(inputmask, ndx).match.nativeDef === " " && (_validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || _validationTests.getTest.call(inputmask, ndx + 1).match["static"] === true && _validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
    if (!match && charCodeNdx > 0 && !_positioning.isMask.call(inputmask, ndx, false, true)) {
      var nextPos = _positioning.seekNext.call(inputmask, ndx);
      if (inputmask.caretPos.begin < nextPos) {
        inputmask.caretPos = {
          begin: nextPos
        };
      }
    }
    return match;
  }
  _positioning.resetMaskSet.call(inputmask);
  maskset.tests = {}; //reset tests ~ possible after alternating
  initialNdx = opts.radixPoint ? _positioning.determineNewCaretPosition.call(inputmask, {
    begin: 0,
    end: 0
  }, false, opts.__financeInput === false ? "radixFocus" : undefined).begin : 0;
  maskset.p = initialNdx;
  inputmask.caretPos = {
    begin: initialNdx
  };
  var staticMatches = [],
    prevCaretPos = inputmask.caretPos;
  inputValue.forEach(function (charCode, ndx) {
    if (charCode !== undefined) {
      //inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
      /*if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true) &&
          isValid.call(inputmask, ndx, inputValue[ndx], true, undefined, true, true) === false) {
          inputmask.caretPos.begin++;
      } else*/
      {
        var keypress = new $.Event("_checkval");
        keypress.key = charCode;
        charCodes += charCode;
        var lvp = _positioning.getLastValidPosition.call(inputmask, undefined, true);
        if (!isTemplateMatch(initialNdx, charCodes)) {
          result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, inputmask.caretPos.begin);
          if (result) {
            initialNdx = inputmask.caretPos.begin + 1;
            charCodes = "";
          }
        } else {
          result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, lvp + 1);
        }
        if (result) {
          if (result.pos !== undefined && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match["static"] === true && maskset.validPositions[result.pos].alternation === undefined) {
            staticMatches.push(result.pos);
            if (!inputmask.isRTL) {
              result.forwardPosition = result.pos + 1;
            }
          }
          writeBuffer.call(inputmask, undefined, _positioning.getBuffer.call(inputmask), result.forwardPosition, keypress, false);
          inputmask.caretPos = {
            begin: result.forwardPosition,
            end: result.forwardPosition
          };
          prevCaretPos = inputmask.caretPos;
        } else {
          if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === _validationTests.getPlaceholder.call(inputmask, ndx) && _positioning.isMask.call(inputmask, ndx, true)) {
            inputmask.caretPos.begin++;
          } else inputmask.caretPos = prevCaretPos; //restore the caret position from before the failed validation
        }
      }
    }
  });

  if (staticMatches.length > 0) {
    var sndx,
      validPos,
      nextValid = _positioning.seekNext.call(inputmask, -1, undefined, false);
    if (!_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && staticMatches.length <= nextValid || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && staticMatches.length > 0 && staticMatches.length !== nextValid && staticMatches[0] === 0) {
      //should check if is sequence starting from 0
      var nextSndx = nextValid;
      while ((sndx = staticMatches.shift()) !== undefined) {
        var keypress = new $.Event("_checkval");
        validPos = maskset.validPositions[sndx];
        validPos.generatedInput = true;
        keypress.key = validPos.input;
        result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, nextSndx);
        if (result && result.pos !== undefined && result.pos !== sndx && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match["static"] === true) {
          staticMatches.push(result.pos);
        } else if (!result) break;
        nextSndx++;
      }
    } else {//mark al statics as generated
      // while ((sndx = staticMatches.pop())) {
      // 	validPos = maskset.validPositions[sndx];
      // 	if (validPos) {
      // 		validPos.generatedInput = true;
      // 	}
      // }
    }
  }
  if (writeOut) {
    writeBuffer.call(inputmask, input, _positioning.getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && (initiatingEvent.type === "input" && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") || initiatingEvent.type === "paste"));
    // for (var vndx in maskset.validPositions) {
    // 	if (maskset.validPositions[vndx].match.generated !== true) { //only remove non forced generated
    // 		delete maskset.validPositions[vndx].generatedInput; //clear generated markings ~ consider initializing with a  value as fully typed
    // 	}
    // }
  }

  opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}
function HandleNativePlaceholder(npt, value) {
  var inputmask = npt ? npt.inputmask : this;
  if (_environment.ie) {
    if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
      var buffer = _positioning.getBuffer.call(inputmask).slice(),
        nptValue = npt.inputmask._valueGet();
      if (nptValue !== value) {
        var lvp = _positioning.getLastValidPosition.call(inputmask);
        if (lvp === -1 && nptValue === _positioning.getBufferTemplate.call(inputmask).join("")) {
          buffer = [];
        } else if (lvp !== -1) {
          //clearout optional tail of the mask
          clearOptionalTail.call(inputmask, buffer);
        }
        writeBuffer(npt, buffer);
      }
    }
  } else if (npt.placeholder !== value) {
    npt.placeholder = value;
    if (npt.placeholder === "") npt.removeAttribute("placeholder");
  }
}
function unmaskedvalue(input) {
  var inputmask = input ? input.inputmask : this,
    opts = inputmask.opts,
    maskset = inputmask.maskset;
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
  for (var pndx = 0, vpl = vps.length; pndx < vpl; pndx++) {
    if (vps[pndx] && vps[pndx].match && (vps[pndx].match["static"] != true || Array.isArray(maskset.metadata) && vps[pndx].generatedInput !== true)) {
      //only include generated input with multiple masks (check on metadata)
      umValue.push(vps[pndx].input);
    }
  }
  var unmaskedValue = umValue.length === 0 ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
  if (typeof opts.onUnMask === "function") {
    var bufferValue = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join("");
    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
  }
  return unmaskedValue;
}
function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
  var inputmask = input ? input.inputmask : this,
    opts = inputmask.opts,
    $ = inputmask.dependencyLib;
  if (event && typeof opts.onBeforeWrite === "function") {
    //    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
    var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
    if (result) {
      if (result.refreshFromBuffer) {
        var refresh = result.refreshFromBuffer;
        _validation.refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
        buffer = _positioning.getBuffer.call(inputmask, true);
      }
      if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
    }
  }
  if (input !== undefined) {
    input.inputmask._valueSet(buffer.join(""));
    if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
      // console.log(caretPos);
      _positioning.caret.call(inputmask, input, caretPos, undefined, undefined, event !== undefined && event.type === "keydown" && (event.key === _keycode.keys.Delete || event.key === _keycode.keys.Backspace));
    }
    if (triggerEvents === true) {
      var $input = $(input),
        nptVal = input.inputmask._valueGet();
      input.inputmask.skipInputEvent = true;
      $input.trigger("input");
      setTimeout(function () {
        //timeout needed for IE
        if (nptVal === _positioning.getBufferTemplate.call(inputmask).join("")) {
          $input.trigger("cleared");
        } else if (_validation.isComplete.call(inputmask, buffer) === true) {
          $input.trigger("complete");
        }
      }, 0);
    }
  }
}

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.EventRuler = void 0;
var _inputmask = _interopRequireDefault(__webpack_require__(7));
var _keycode = __webpack_require__(9);
var _positioning = __webpack_require__(10);
var _inputHandling = __webpack_require__(17);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var EventRuler = {
  on: function on(input, eventName, eventHandler) {
    var $ = input.inputmask.dependencyLib;
    var ev = function ev(e) {
      if (e.originalEvent) {
        e = e.originalEvent || e; //get original event from jquery evenbt
        arguments[0] = e;
      }
      // console.log(e.type);
      var that = this,
        args,
        inputmask = that.inputmask,
        opts = inputmask ? inputmask.opts : undefined;
      if (inputmask === undefined && this.nodeName !== "FORM") {
        //happens when cloning an object with jquery.clone
        var imOpts = $.data(that, "_inputmask_opts");
        $(that).off(); //unbind all events
        if (imOpts) {
          new _inputmask["default"](imOpts).mask(that);
        }
      } else if (!["submit", "reset", "setvalue"].includes(e.type) && this.nodeName !== "FORM" && (that.disabled || that.readOnly && !(e.type === "keydown" && e.ctrlKey && e.key === _keycode.keys.c || opts.tabThrough === false && e.key === _keycode.keys.Tab))) {
        e.preventDefault();
      } else {
        switch (e.type) {
          case "input":
            if (inputmask.skipInputEvent === true) {
              inputmask.skipInputEvent = false;
              return e.preventDefault();
            }

            // if (mobile) { //this causes problem see #2220
            // 	args = arguments;
            // 	setTimeout(function () { //needed for caret selection when entering a char on Android 8 - #1818
            // 		eventHandler.apply(that, args);
            // 		caret(that, that.inputmask.caretPos, undefined, true);
            // 	}, 0);
            // 	return false;
            // }
            break;
          case "click":
          case "focus":
            if (inputmask.validationEvent) {
              // #841
              inputmask.validationEvent = false;
              input.blur();
              (0, _inputHandling.HandleNativePlaceholder)(input, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join(""));
              setTimeout(function () {
                input.focus();
              }, opts.validationEventTimeOut);
              return false;
            }
            args = arguments;
            setTimeout(function () {
              //needed for Chrome ~ initial selection clears after the clickevent
              if (!input.inputmask) {
                // `inputmask.remove()` was called before this callback
                return;
              }
              eventHandler.apply(that, args);
            }, 0);
            return; /*false*/
          //#2423
        }

        var returnVal = eventHandler.apply(that, arguments);
        if (returnVal === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        return returnVal;
      }
    };
    if (["submit", "reset"].includes(eventName)) {
      ev = ev.bind(input); //bind creates a new eventhandler (wrap)
      if (input.form !== null) $(input.form).on(eventName, ev);
    } else {
      $(input).on(eventName, ev);
    }

    //keep instance of the event
    input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
    input.inputmask.events[eventName].push(ev);
  },
  off: function off(input, event) {
    if (input.inputmask && input.inputmask.events) {
      var $ = input.inputmask.dependencyLib;
      var events = input.inputmask.events;
      if (event) {
        events = [];
        events[event] = input.inputmask.events[event];
      }
      for (var eventName in events) {
        var evArr = events[eventName];
        while (evArr.length > 0) {
          var ev = evArr.pop();
          if (["submit", "reset"].includes(eventName)) {
            if (input.form !== null) $(input.form).off(eventName, ev);
          } else {
            $(input).off(eventName, ev);
          }
        }
        delete input.inputmask.events[eventName];
      }
    }
  }
};
exports.EventRuler = EventRuler;

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _jquery = _interopRequireDefault(__webpack_require__(20));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
 Input Mask plugin dependencyLib
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

if (_jquery["default"] === undefined) {
  throw "jQuery not loaded!";
}
var _default = _jquery["default"];
exports["default"] = _default;

/***/ }),
/* 20 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__20__;

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.analyseMask = analyseMask;
exports.generateMaskSet = generateMaskSet;
var _inputmask = _interopRequireDefault(__webpack_require__(19));
var _masktoken = _interopRequireDefault(__webpack_require__(22));
var _inputmask2 = _interopRequireDefault(__webpack_require__(7));
var _escapeRegex = _interopRequireDefault(__webpack_require__(23));
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function generateMaskSet(opts, nocache) {
  var ms;
  function preProcessMask(mask, _ref) {
    var repeat = _ref.repeat,
      groupmarker = _ref.groupmarker,
      quantifiermarker = _ref.quantifiermarker,
      keepStatic = _ref.keepStatic;
    if (repeat > 0 || repeat === "*" || repeat === "+") {
      var repeatStart = repeat === "*" ? 0 : repeat === "+" ? 1 : repeat;
      mask = groupmarker[0] + mask + groupmarker[1] + quantifiermarker[0] + repeatStart + "," + repeat + quantifiermarker[1];
    }
    if (keepStatic === true) {
      var optionalRegex = "(.)\\[([^\\]]*)\\]",
        // "(?<p1>.)\\[(?<p2>[^\\]]*)\\]", remove named capture group @2428
        maskMatches = mask.match(new RegExp(optionalRegex, "g"));
      maskMatches && maskMatches.forEach(function (m, i) {
        var _m$split = m.split("["),
          _m$split2 = _slicedToArray(_m$split, 2),
          p1 = _m$split2[0],
          p2 = _m$split2[1];
        p2 = p2.replace("]", "");
        mask = mask.replace(new RegExp("".concat((0, _escapeRegex["default"])(p1), "\\[").concat((0, _escapeRegex["default"])(p2), "\\]")), p1.charAt(0) === p2.charAt(0) ? "(".concat(p1, "|").concat(p1).concat(p2, ")") : "".concat(p1, "[").concat(p2, "]"));
        // console.log(mask);
      });
    }

    return mask;
  }
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
    mask = preProcessMask(mask, opts);

    // console.log(mask);
    var masksetDefinition, maskdefKey;
    maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
    if (opts.keepStatic !== null) {
      //keepstatic modifies the output from the testdefinitions ~ so differentiate in the maskcache
      maskdefKey = "ks_" + opts.keepStatic + maskdefKey;
    }
    if (_inputmask2["default"].prototype.masksCache[maskdefKey] === undefined || nocache === true) {
      masksetDefinition = {
        "mask": mask,
        "maskToken": _inputmask2["default"].prototype.analyseMask(mask, regexMask, opts),
        "validPositions": [],
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
        _inputmask2["default"].prototype.masksCache[maskdefKey] = masksetDefinition;
        masksetDefinition = _inputmask["default"].extend(true, {}, _inputmask2["default"].prototype.masksCache[maskdefKey]);
      }
    } else {
      masksetDefinition = _inputmask["default"].extend(true, {}, _inputmask2["default"].prototype.masksCache[maskdefKey]);
    }
    return masksetDefinition;
  }
  if (typeof opts.mask === "function") {
    //allow mask to be a preprocessing fn - should return a valid mask
    opts.mask = opts.mask(opts);
  }
  if (Array.isArray(opts.mask)) {
    if (opts.mask.length > 1) {
      if (opts.keepStatic === null) {
        //enable by default when passing multiple masks when the option is not explicitly specified
        opts.keepStatic = true;
      }
      var altMask = opts.groupmarker[0];
      (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function (msk) {
        if (altMask.length > 1) {
          altMask += opts.alternatormarker;
        }
        if (msk.mask !== undefined && typeof msk.mask !== "function") {
          altMask += msk.mask;
        } else {
          altMask += msk;
        }
      });
      altMask += opts.groupmarker[1];
      // console.log(altMask);
      return generateMask(altMask, opts.mask, opts);
    } else {
      opts.mask = opts.mask.pop();
    }
  }
  if (opts.mask && opts.mask.mask !== undefined && typeof opts.mask.mask !== "function") {
    ms = generateMask(opts.mask.mask, opts.mask, opts);
  } else {
    ms = generateMask(opts.mask, opts.mask, opts);
  }
  if (opts.keepStatic === null) opts.keepStatic = false;
  return ms;
}
function analyseMask(mask, regexMask, opts) {
  var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
    //Thx to https://github.com/slevithan/regex-colorizer for the regexTokenizer regex
    regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g;
  var escaped = false,
    currentToken = new _masktoken["default"](),
    match,
    m,
    openenings = [],
    maskTokens = [],
    openingToken,
    currentOpeningToken,
    alternator,
    lastMatch,
    closeRegexGroup = false;

  //test definition => {fn: RegExp/function, static: true/false optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
  function insertTestDefinition(mtoken, element, position) {
    position = position !== undefined ? position : mtoken.matches.length;
    var prevMatch = mtoken.matches[position - 1];
    if (regexMask) {
      if (element.indexOf("[") === 0 || escaped && /\\d|\\s|\\w|\\p/i.test(element) || element === ".") {
        var flag = opts.casing ? "i" : "";
        if (/^\\p\{.*}$/i.test(element)) flag += "u";
        mtoken.matches.splice(position++, 0, {
          fn: new RegExp(element, flag),
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
        element.split("").forEach(function (lmnt, ndx) {
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
      var maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && _inputmask2["default"].prototype.definitions[element];
      if (maskdef && !escaped) {
        mtoken.matches.splice(position++, 0, {
          fn: maskdef.validator ? typeof maskdef.validator == "string" ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
            this.test = maskdef.validator;
          }() : new RegExp("."),
          "static": maskdef["static"] || false,
          optionality: maskdef.optional || false,
          defOptionality: maskdef.optional || false,
          //indicator for an optional from the definition
          newBlockMarker: prevMatch === undefined || maskdef.optional ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
          casing: maskdef.casing,
          def: maskdef.definitionSymbol || element,
          placeholder: maskdef.placeholder,
          nativeDef: element,
          generated: maskdef.generated
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
      maskToken.matches.forEach(function (token, ndx) {
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
    var groupToken = new _masktoken["default"](true);
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
          var altMatchesLength = alternator.matches[0].matches ? alternator.matches[0].matches.length : 1;
          for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
            alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
            alternator.matches[mndx].alternatorGroup = false;
            if (opts.keepStatic === null && altMatchesLength < (alternator.matches[mndx].matches ? alternator.matches[mndx].matches.length : 1)) {
              //enable by default when passing multiple masks when the option is not explicitly specified
              opts.keepStatic = true;
            }
            altMatchesLength = alternator.matches[mndx].matches ? alternator.matches[mndx].matches.length : 1;
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
      switch (m) {
        case "\\d":
          m = "[0-9]";
          break;
        case "\\p":
          //Unicode Categories
          m += regexTokenizer.exec(mask)[0]; // {
          m += regexTokenizer.exec(mask)[0]; // ?}
          break;
        case "(?:": //non capturing group
        case "(?=": //lookahead
        case "(?!": //negative lookahead
        case "(?<=": //lookbehind
        case "(?<!":
          //negative lookbehind
          // treat as group
          break;
      }
    }
    if (escaped) {
      defaultCase();
      continue;
    }
    switch (m.charAt(0)) {
      case "$":
      case "^":
        //ignore beginswith and endswith as in masking this makes no point
        if (!regexMask) {
          defaultCase();
        }
        break;
      case opts.escapeChar:
        escaped = true;
        if (regexMask) defaultCase();
        break;
      // optional closing
      case opts.optionalmarker[1]:
      case opts.groupmarker[1]:
        closeGroup();
        break;
      case opts.optionalmarker[0]:
        // optional opening
        openenings.push(new _masktoken["default"](false, true));
        break;
      case opts.groupmarker[0]:
        // Group opening
        openenings.push(new _masktoken["default"](true));
        break;
      case opts.quantifiermarker[0]:
        //Quantifier
        var quantifier = new _masktoken["default"](false, false, true);
        m = m.replace(/[{}?]/g, ""); //? matches lazy quantifiers
        var mqj = m.split("|"),
          mq = mqj[0].split(","),
          mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
          mq1 = mq.length === 1 ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]),
          mqJit = isNaN(mqj[1]) ? mqj[1] : parseInt(mqj[1]);
        if (mq0 === "*" || mq0 === "+") {
          mq0 = mq1 === "*" ? 0 : 1;
        }
        quantifier.quantifier = {
          min: mq0,
          max: mq1,
          jit: mqJit
        };
        var matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
        match = matches.pop();
        // if (match.isAlternator) { //handle quantifier in an alternation [0-9]{2}|[0-9]{3}
        //     matches.push(match); //push back alternator
        //     matches = match.matches; //remap target matches
        //     var groupToken = new MaskToken(true);
        //     var tmpMatch = matches.pop();
        //     matches.push(groupToken); //push the group
        //     matches = groupToken.matches;
        //     match = tmpMatch;
        // }
        if (!match.isGroup) {
          match = groupify([match]);
        }
        matches.push(match);
        matches.push(quantifier);
        break;
      case opts.alternatormarker:
        if (openenings.length > 0) {
          currentOpeningToken = openenings[openenings.length - 1];
          var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
          if (currentOpeningToken.openGroup && (
          //regexp alt syntax
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
            alternator = new _masktoken["default"](false, false, false, true);
          }
          alternator.matches.push(lastMatch);
          openenings.push(alternator);
          if (lastMatch.openGroup) {
            //regexp alt syntax
            lastMatch.openGroup = false;
            var alternatorGroup = new _masktoken["default"](true);
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
  }
  // console.log(JSON.stringify(maskTokens));
  return maskTokens;
}

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
function _default(isGroup, isOptional, isQuantifier, isAlternator) {
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

/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
function _default(str) {
  return str.replace(escapeRegexRegex, "\\$1");
}

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = {
  "9": {
    //\uFF11-\uFF19 #1606
    validator: "[0-9\uFF10-\uFF19]",
    definitionSymbol: "*"
  },
  "a": {
    //\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5 #76
    validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
    definitionSymbol: "*"
  },
  "*": {
    validator: "[0-9\uFF10-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]"
  }
};
exports["default"] = _default;

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _keycode = __webpack_require__(9);
var _default = {
  _maxTestPos: 500,
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
  oncomplete: function oncomplete() {},
  //executes when the mask is complete
  onincomplete: function onincomplete() {},
  //executes when the mask is incomplete and focus is lost
  oncleared: function oncleared() {},
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
  insertModeVisual: true,
  //show selected caret when insertmode = false
  clearIncomplete: false,
  //clear the incomplete input on blur
  alias: null,
  onKeyDown: function onKeyDown() {},
  //callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
  onBeforeMask: null,
  //executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
  onBeforePaste: function onBeforePaste(pastedValue, opts) {
    return typeof opts.onBeforeMask === "function" ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
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
  onKeyValidation: function onKeyValidation() {},
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
  //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible
  positionCaretOnTab: true,
  //when enabled the caret position is set after the latest valid position on TAB
  tabThrough: false,
  //allows for tabbing through the different parts of the masked field
  supportsInputType: ["text", "tel", "url", "password", "search"],
  //list with the supported input types
  //specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
  ignorables: [_keycode.keys.Backspace, _keycode.keys.Tab, _keycode.keys.Pause, _keycode.keys.Escape, _keycode.keys.PageUp, _keycode.keys.PageDown, _keycode.keys.End, _keycode.keys.Home, _keycode.keys.ArrowLeft, _keycode.keys.ArrowUp, _keycode.keys.ArrowRight, _keycode.keys.ArrowDown, _keycode.keys.Insert, _keycode.keys.Delete, _keycode.keys.ContextMenu, _keycode.keys.F1, _keycode.keys.F2, _keycode.keys.F3, _keycode.keys.F4, _keycode.keys.F5, _keycode.keys.F6, _keycode.keys.F7, _keycode.keys.F8, _keycode.keys.F9, _keycode.keys.F10, _keycode.keys.F11, _keycode.keys.F12, _keycode.keys.Process, _keycode.keys.Unidentified, _keycode.keys.Shift, _keycode.keys.Control, _keycode.keys.Alt, _keycode.keys.Tab, _keycode.keys.AltGraph, _keycode.keys.CapsLock],
  isComplete: null,
  //override for isComplete - args => buffer, opts - return true || false
  preValidation: null,
  //hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts, maskset, caretPos, strict => return true/false/command object
  postValidation: null,
  //hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval => return true/false/json
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
  inputmode: "text",
  //specify the inputmode
  importDataAttributes: true,
  //import data-inputmask attributes
  shiftPositions: true,
  //shift position of the mask entries on entry and deletion.
  usePrototypeDefinitions: true,
  //use the default defined definitions from the prototype
  validationEventTimeOut: 3000,
  //Time to show validation error on form submit
  substitutes: {} //define character substitutes
};
exports["default"] = _default;

/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _inputmask = _interopRequireDefault(__webpack_require__(7));
var _keycode = __webpack_require__(9);
var _escapeRegex = _interopRequireDefault(__webpack_require__(23));
var _positioning = __webpack_require__(10);
var _validationTests = __webpack_require__(11);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

var $ = _inputmask["default"].dependencyLib;
var DateObject = /*#__PURE__*/function () {
  function DateObject(mask, format, opts) {
    _classCallCheck(this, DateObject);
    this.mask = mask;
    this.format = format;
    this.opts = opts;
    this._date = new Date(1, 0, 1);
    this.initDateObject(mask, this.opts);
  }
  _createClass(DateObject, [{
    key: "date",
    get: function get() {
      if (this._date === undefined) {
        this._date = new Date(1, 0, 1);
        this.initDateObject(undefined, this.opts);
      }
      return this._date;
    }
  }, {
    key: "initDateObject",
    value: function initDateObject(mask, opts) {
      var match;
      getTokenizer(opts).lastIndex = 0;
      while (match = getTokenizer(opts).exec(this.format)) {
        var dynMatches = new RegExp("\\d+$").exec(match[0]),
          fcode = dynMatches ? match[0][0] + "x" : match[0],
          value = void 0;
        if (mask !== undefined) {
          if (dynMatches) {
            var lastIndex = getTokenizer(opts).lastIndex,
              tokenMatch = getTokenMatch(match.index, opts);
            getTokenizer(opts).lastIndex = lastIndex;
            value = mask.slice(0, mask.indexOf(tokenMatch.nextMatch[0]));
          } else {
            value = mask.slice(0, formatCode[fcode] && formatCode[fcode][4] || fcode.length);
          }
          mask = mask.slice(value.length);
        }
        if (Object.prototype.hasOwnProperty.call(formatCode, fcode)) {
          this.setValue(this, value, fcode, formatCode[fcode][2], formatCode[fcode][1]);
        }
      }
    }
  }, {
    key: "setValue",
    value: function setValue(dateObj, value, fcode, targetProp, dateOperation) {
      if (value !== undefined) {
        dateObj[targetProp] = targetProp === "ampm" ? value : value.replace(/[^0-9]/g, "0");
        dateObj["raw" + targetProp] = value.replace(/\s/g, "_");
      }
      if (dateOperation !== undefined) {
        var datavalue = dateObj[targetProp];
        if (targetProp === "day" && parseInt(datavalue) === 29 || targetProp === "month" && parseInt(datavalue) === 2) {
          if (parseInt(dateObj.day) === 29 && parseInt(dateObj.month) === 2 && (dateObj.year === "" || dateObj.year === undefined)) {
            //set temporary leap year in dateObj
            dateObj._date.setFullYear(2012, 1, 29);
          }
        }
        if (targetProp === "day") {
          useDateObject = true;
          if (parseInt(datavalue) === 0) datavalue = 1;
        }
        if (targetProp === "month") useDateObject = true;
        if (targetProp === "year") {
          useDateObject = true;
          if (datavalue.length < 4) datavalue = pad(datavalue, 4, true);
        }
        if (datavalue !== "" && !isNaN(datavalue)) dateOperation.call(dateObj._date, datavalue);
        if (targetProp === "ampm") dateOperation.call(dateObj._date, datavalue);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this._date = new Date(1, 0, 1);
    }
  }, {
    key: "reInit",
    value: function reInit() {
      this._date = undefined;
      this.date;
    }
  }]);
  return DateObject;
}();
var currentYear = new Date().getFullYear(),
  useDateObject = false,
  //supported codes for formatting
  //http://blog.stevenlevithan.com/archives/date-time-format
  //https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7
  formatCode = {
    //regex, valueSetter, type, displayformatter, #entries (optional)
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
    m: ["[1-9]|1[012]", function (val) {
      var mval = val ? parseInt(val) : 0;
      if (mval > 0) mval--;
      return Date.prototype.setMonth.call(this, mval);
    }, "month", function () {
      return Date.prototype.getMonth.call(this) + 1;
    }],
    //Month as digits; no leading zero for single-digit months.
    mm: ["0[1-9]|1[012]", function (val) {
      var mval = val ? parseInt(val) : 0;
      if (mval > 0) mval--;
      return Date.prototype.setMonth.call(this, mval);
    }, "month", function () {
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
    }, Date.prototype.setHours, "hours", function (x) {
      return Date.prototype.getHours;
    }],
    //Hours; no limit; set maximum digits
    H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
    //Hours; no leading zero for single-digit hours (24-hour clock).
    HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
      return pad(Date.prototype.getHours.call(this), 2);
    }],
    //Hours; leading zero for single-digit hours (24-hour clock).
    Hx: [function (x) {
      return "[0-9]{".concat(x, "}");
    }, Date.prototype.setHours, "hours", function (x) {
      return function () {
        return pad(Date.prototype.getHours.call(this), x);
      };
    }],
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
    }, 3],
    //Milliseconds. 3 digits.
    L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
      return pad(Date.prototype.getMilliseconds.call(this), 2);
    }, 2],
    //Milliseconds. 2 digits.
    t: ["[ap]", setAMPM, "ampm", getAMPM, 1],
    //Lowercase, single-character time marker string: a or p.
    tt: ["[ap]m", setAMPM, "ampm", getAMPM, 2],
    //two-character time marker string: am or pm.
    T: ["[AP]", setAMPM, "ampm", getAMPM, 1],
    //single-character time marker string: A or P.
    TT: ["[AP]M", setAMPM, "ampm", getAMPM, 2],
    //two-character time marker string: AM or PM.
    Z: [".*", undefined, "Z", getTimeZoneAbbreviated],
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

function setAMPM(value) {
  var hours = this.getHours();
  if (value.toLowerCase().includes("p")) {
    this.setHours(hours + 12);
    // console.log("setAMPM + 12");
  } else if (value.toLowerCase().includes("a") && hours >= 12) {
    this.setHours(hours - 12);
  }
}
function getAMPM() {
  var date = this,
    hours = date.getHours();
  hours = hours || 12;
  return hours >= 12 ? "PM" : "AM";
}
function getTimeZoneAbbreviated() {
  //not perfect, but ok for now
  var date = this,
    _date$toString$match = date.toString().match(/\((.+)\)/),
    tz = _date$toString$match[1];
  if (tz.includes(" ")) {
    tz = tz.replace("-", " ").toUpperCase();
    tz = tz.split(" ").map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        first = _ref2[0];
      return first;
    }).join("");
  }
  return tz;
}
function formatcode(match) {
  var dynMatches = new RegExp("\\d+$").exec(match[0]);
  if (dynMatches && dynMatches[0] !== undefined) {
    var fcode = formatCode[match[0][0] + "x"].slice("");
    fcode[0] = fcode[0](dynMatches[0]);
    fcode[3] = fcode[3](dynMatches[0]);
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
      if (/\.*x$/.test(ndx)) {
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
function prefillYear(dateParts, currentResult, opts) {
  if (dateParts.year !== dateParts.rawyear) {
    var crrntyear = currentYear.toString(),
      enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""),
      currentYearPart = crrntyear.slice(0, enteredPart.length),
      currentYearNextPart = crrntyear.slice(enteredPart.length);
    if (enteredPart.length === 2 && enteredPart === currentYearPart) {
      var entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
      if (dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime())) {
        //update dateParts
        dateParts.date.setFullYear(currentYear);
        dateParts.year = crrntyear;
        //update result
        currentResult.insert = [{
          pos: currentResult.pos + 1,
          c: currentYearNextPart[0]
        }, {
          pos: currentResult.pos + 2,
          c: currentYearNextPart[1]
        }];
      }
    }
  }
  return currentResult;
}
function isValidDate(dateParts, currentResult, opts) {
  if (!useDateObject) return true;
  if (dateParts.rawday === undefined || !isFinite(dateParts.rawday) && new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day || dateParts.day == "29" && (!isFinite(dateParts.rawyear) || dateParts.rawyear === undefined || dateParts.rawyear === "") || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) {
    return currentResult;
  } else {
    //take corrective action if possible
    if (dateParts.day == "29") {
      var tokenMatch = getTokenMatch(currentResult.pos, opts);
      if (tokenMatch.targetMatch[0] === "yyyy" && currentResult.pos - tokenMatch.targetMatchIndex === 2) {
        currentResult.remove = currentResult.pos + 1;
        return currentResult;
      }
    } else if (dateParts.month == "02" && dateParts.day == "30" && currentResult.c !== undefined) {
      dateParts.day = "03";
      dateParts.date.setDate(3);
      dateParts.date.setMonth(1);
      currentResult.insert = [{
        pos: currentResult.pos,
        c: "0"
      }, {
        pos: currentResult.pos + 1,
        c: currentResult.c
      }];
      currentResult.caret = _positioning.seekNext.call(this, currentResult.pos + 1);
      return currentResult;
    }
    return false;
  }
}
function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
  if (!result) return result;
  if (result && opts.min) {
    if ( /*useDateObject && (dateParts["year"] === undefined || dateParts["yearSet"]) && */!isNaN(opts.min.date.getTime())) {
      var match;
      dateParts.reset();
      getTokenizer(opts).lastIndex = 0;
      while (match = getTokenizer(opts).exec(opts.inputFormat)) {
        var fcode;
        if (fcode = formatcode(match)) {
          if (fcode[3]) {
            var setFn = fcode[1];
            var current = dateParts[fcode[2]],
              minVal = opts.min[fcode[2]],
              maxVal = opts.max ? opts.max[fcode[2]] : minVal,
              curVal = [];
            var forceCurrentValue = false;
            for (var i = 0; i < minVal.length; i++) {
              if (maskset.validPositions[i + match.index] === undefined && !forceCurrentValue) {
                curVal[i] = minVal[i];
                // ADD +1 to whoile
                if (fcode[2] === "year" && current.length - 1 == i && minVal != maxVal) curVal = (parseInt(curVal.join("")) + 1).toString().split("");
                if (fcode[2] === "ampm" && minVal != maxVal && opts.min.date.getTime() > dateParts.date.getTime()) curVal[i] = maxVal[i];
              } else {
                curVal[i] = current[i];
                forceCurrentValue = forceCurrentValue || current[i] > minVal[i];
              }
            }
            setFn.call(dateParts._date, curVal.join(""));
          }
        }
      }
      result = opts.min.date.getTime() <= dateParts.date.getTime();
      dateParts.reInit();
    }
  }
  if (result && opts.max) {
    if (!isNaN(opts.max.date.getTime())) {
      result = opts.max.date.getTime() >= dateParts.date.getTime();
    }
  }
  return result;
}

//parse the given format and return a mask pattern
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
            mask += (0, _escapeRegex["default"])(match[0]);
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
}

//padding function
function pad(val, len, right) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = right ? val + "0" : "0" + val;
  }
  return val;
}
function analyseMask(mask, format, opts) {
  if (typeof mask === "string") {
    return new DateObject(mask, format, opts);
  } else if (mask && _typeof(mask) === "object" && Object.prototype.hasOwnProperty.call(mask, "date")) {
    return mask;
  }
  return undefined;
}
function importDate(dateObj, opts) {
  return parse(opts.inputFormat, {
    date: dateObj
  }, opts);
}
function getTokenMatch(pos, opts) {
  var calcPos = 0,
    targetMatch,
    match,
    matchLength = 0;
  getTokenizer(opts).lastIndex = 0;
  while (match = getTokenizer(opts).exec(opts.inputFormat)) {
    var dynMatches = new RegExp("\\d+$").exec(match[0]);
    matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length;
    calcPos += matchLength;
    if (calcPos >= pos + 1) {
      targetMatch = match;
      match = getTokenizer(opts).exec(opts.inputFormat);
      break;
    }
  }
  return {
    targetMatchIndex: calcPos - matchLength,
    nextMatch: match,
    targetMatch: targetMatch
  };
}
_inputmask["default"].extendAliases({
  "datetime": {
    mask: function mask(opts) {
      //do not allow numeric input in datetime alias
      opts.numericInput = false;

      //localize
      formatCode.S = opts.i18n.ordinalSuffix.join("|");
      opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat; //resolve possible formatAlias
      opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat; //resolve possible formatAlias
      opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat; //resolve possible formatAlias
      opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, "");
      opts.regex = parse(opts.inputFormat, undefined, opts);
      opts.min = analyseMask(opts.min, opts.inputFormat, opts);
      opts.max = analyseMask(opts.max, opts.inputFormat, opts);
      return null; //migrate to regex mask
    },

    placeholder: "",
    //set default as none (~ auto); when a custom placeholder is passed it will be used
    inputFormat: "isoDateTime",
    //format used to input the date
    displayFormat: null,
    //visual format when the input looses focus
    outputFormat: null,
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
      if (isNaN(c) && buffer[pos] !== c) {
        var tokenMatch = getTokenMatch(pos, opts);
        if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && tokenMatch.targetMatch[0].length > 1) {
          var validator = formatCode[tokenMatch.targetMatch[0]][0];
          if (new RegExp(validator).test("0" + buffer[pos - 1])) {
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
      }
      return true;
    },
    postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
      var inputmask = this;
      if (strict) return true;
      var tokenMatch, validator;
      if (currentResult === false) {
        //try some shifting
        tokenMatch = getTokenMatch(pos + 1, opts);
        if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && tokenMatch.targetMatch[0].length > 1 && formatCode[tokenMatch.targetMatch[0]] !== undefined) {
          validator = formatCode[tokenMatch.targetMatch[0]][0];
        } else {
          tokenMatch = getTokenMatch(pos + 2, opts);
          if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos + 1 && tokenMatch.targetMatch[0].length > 1 && formatCode[tokenMatch.targetMatch[0]] !== undefined) {
            validator = formatCode[tokenMatch.targetMatch[0]][0];
          }
        }
        if (validator !== undefined) {
          if (maskset.validPositions[pos + 1] !== undefined && new RegExp(validator).test(c + "0")) {
            buffer[pos] = c;
            buffer[pos + 1] = "0";
            currentResult = {
              //insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
              pos: pos + 2,
              //this will triggeer a refreshfrombuffer
              caret: pos
            };
          } else if (new RegExp(validator).test("0" + c)) {
            buffer[pos] = "0";
            buffer[pos + 1] = c;
            currentResult = {
              //insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
              pos: pos + 2 //this will triggeer a refreshfrombuffer
            };
          }
        }

        if (currentResult === false) return currentResult;
      }
      if (currentResult.fuzzy) {
        buffer = currentResult.buffer;
        pos = currentResult.pos;
      }

      //full validate target
      tokenMatch = getTokenMatch(pos, opts);
      if (tokenMatch.targetMatch && tokenMatch.targetMatch[0] && formatCode[tokenMatch.targetMatch[0]] !== undefined) {
        var fcode = formatCode[tokenMatch.targetMatch[0]];
        validator = fcode[0];
        var part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
        if (new RegExp(validator).test(part.join("")) === false && tokenMatch.targetMatch[0].length === 2 && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1]) {
          maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0";
        }
        if (fcode[2] == "year") {
          var _buffer = _validationTests.getMaskTemplate.call(inputmask, false, 1, undefined, true);
          for (var i = pos + 1; i < buffer.length; i++) {
            buffer[i] = _buffer[i];
            delete maskset.validPositions[i];
          }
        }
      }
      var result = currentResult,
        dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
      if (result && !isNaN(dateParts.date.getTime())) {
        //check for a valid date ~ an invalid date returns NaN which isn't equal
        if (opts.prefillYear) result = prefillYear(dateParts, result, opts);
        result = isValidDate.call(inputmask, dateParts, result, opts);
        result = isDateInRange(dateParts, result, opts, maskset, fromCheckval);
      }
      if (pos !== undefined && result && currentResult.pos !== pos) {
        return {
          buffer: parse(opts.inputFormat, dateParts, opts).split(""),
          refreshFromBuffer: {
            start: pos,
            end: currentResult.pos
          },
          pos: currentResult.caret || currentResult.pos //correct caret position
        };
      }

      return result;
    },
    onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
      var input = this;
      if (e.ctrlKey && e.key === _keycode.keys.ArrowRight) {
        input.inputmask._valueSet(importDate(new Date(), opts));
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
    onBeforeMask: function onBeforeMask(initialValue, opts) {
      if (Object.prototype.toString.call(initialValue) === "[object Date]") {
        initialValue = importDate(initialValue, opts);
      }
      return initialValue;
    },
    insertMode: false,
    insertModeVisual: false,
    shiftPositions: false,
    keepStatic: false,
    inputmode: "numeric",
    prefillYear: true //Allows to disable prefill for datetime year.
  }
});

/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _inputmask = _interopRequireDefault(__webpack_require__(7));
var _escapeRegex = _interopRequireDefault(__webpack_require__(23));
var _positioning = __webpack_require__(10);
var _keycode = __webpack_require__(9);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

var $ = _inputmask["default"].dependencyLib;
function autoEscape(txt, opts) {
  var escapedTxt = "";
  for (var i = 0; i < txt.length; i++) {
    if (_inputmask["default"].prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i)) {
      escapedTxt += "\\" + txt.charAt(i);
    } else {
      escapedTxt += txt.charAt(i);
    }
  }
  return escapedTxt;
}
function alignDigits(buffer, digits, opts, force) {
  if (buffer.length > 0 && digits > 0 && (!opts.digitsOptional || force)) {
    var radixPosition = buffer.indexOf(opts.radixPoint),
      negationBack = false;
    if (opts.negationSymbol.back === buffer[buffer.length - 1]) {
      negationBack = true;
      buffer.length--;
    }
    if (radixPosition === -1) {
      buffer.push(opts.radixPoint);
      radixPosition = buffer.length - 1;
    }
    for (var i = 1; i <= digits; i++) {
      if (!isFinite(buffer[radixPosition + i])) {
        buffer[radixPosition + i] = "0";
      }
    }
  }
  if (negationBack) buffer.push(opts.negationSymbol.back);
  return buffer;
}
function findValidator(symbol, maskset) {
  var posNdx = 0;
  if (symbol === "+") {
    posNdx = _positioning.seekNext.call(this, maskset.validPositions.length - 1);
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
  for (var ndx = 0, vpl = maskset.validPositions.length; ndx < vpl; ndx++) {
    var tst = maskset.validPositions[ndx];
    if (tst && tst.match.def === symbol) {
      ret = ndx;
      break;
    }
  }
  return ret;
}
function parseMinMaxOptions(opts) {
  if (opts.parseMinMaxOptions === undefined) {
    // convert min and max options
    if (opts.min !== null) {
      opts.min = opts.min.toString().replace(new RegExp((0, _escapeRegex["default"])(opts.groupSeparator), "g"), "");
      if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
      opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
      if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
    }
    if (opts.max !== null) {
      opts.max = opts.max.toString().replace(new RegExp((0, _escapeRegex["default"])(opts.groupSeparator), "g"), "");
      if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
      opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
      if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
    }
    opts.parseMinMaxOptions = "done";
  }
}
function genMask(opts) {
  opts.repeat = 0;
  //treat equal separator and radixpoint
  if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
    if (opts.radixPoint === ".") {
      opts.groupSeparator = ",";
    } else if (opts.radixPoint === ",") {
      opts.groupSeparator = ".";
    } else {
      opts.groupSeparator = "";
    }
  }
  //prevent conflict with default skipOptionalPartCharacter
  if (opts.groupSeparator === " ") {
    opts.skipOptionalPartCharacter = undefined;
  }

  //enforce placeholder to single
  if (opts.placeholder.length > 1) {
    opts.placeholder = opts.placeholder.charAt(0);
  }
  //only allow radixfocus when placeholder = 0
  if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "") {
    opts.positionCaretOnClick = "lvp";
  }
  var decimalDef = "0",
    radixPointDef = opts.radixPoint;
  if (opts.numericInput === true && opts.__financeInput === undefined) {
    //finance people input style
    decimalDef = "1";
    opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
    opts.digitsOptional = false;
    if (isNaN(opts.digits)) opts.digits = 2;
    opts._radixDance = false;
    radixPointDef = opts.radixPoint === "," ? "?" : "!";
    if (opts.radixPoint !== "" && opts.definitions[radixPointDef] === undefined) {
      //update separator definition
      opts.definitions[radixPointDef] = {};
      opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]";
      opts.definitions[radixPointDef].placeholder = opts.radixPoint;
      opts.definitions[radixPointDef]["static"] = true;
      opts.definitions[radixPointDef].generated = true; //forced marker as generated input
    }
  } else {
    opts.__financeInput = false; //needed to keep original selection when remasking
    opts.numericInput = true;
  }
  var mask = "[+]",
    altMask;
  mask += autoEscape(opts.prefix, opts);
  if (opts.groupSeparator !== "") {
    if (opts.definitions[opts.groupSeparator] === undefined) {
      //update separatot definition
      opts.definitions[opts.groupSeparator] = {};
      opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]";
      opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator;
      opts.definitions[opts.groupSeparator]["static"] = true;
      opts.definitions[opts.groupSeparator].generated = true; //forced marker as generated input
    }

    mask += opts._mask(opts);
  } else {
    mask += "9{+}";
  }
  if (opts.digits !== undefined && opts.digits !== 0) {
    var dq = opts.digits.toString().split(",");
    if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
      mask += radixPointDef + decimalDef + "{" + opts.digits + "}";
    } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
      if (opts.digitsOptional && typeof opts.digitsOptional === "boolean" || opts.jitMasking) {
        altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}";
        // mask += "[" + opts.radixPoint + "]";
        opts.keepStatic = true;
      } else if (opts.digitsOptional && typeof opts.digitsOptional === "number" && opts.digits > opts.digitsOptional) {
        mask += radixPointDef + decimalDef + "{" + (opts.digits - opts.digitsOptional) + "," + opts.digits + "}";
      } else {
        mask += radixPointDef + decimalDef + "{" + opts.digits + "}";
      }
    }
  } else {
    opts.inputmode = "numeric";
  }
  mask += autoEscape(opts.suffix, opts);
  mask += "[-]";
  if (altMask) {
    mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask];
  }
  opts.greedy = false; //enforce greedy false

  parseMinMaxOptions(opts);
  if (opts.radixPoint !== "" && opts.substituteRadixPoint) opts.substitutes[opts.radixPoint == "." ? "," : "."] = opts.radixPoint;
  // console.log(mask);
  return mask;
}
function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
  if (opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back) {
    if (pos <= radixPos && (radixPos > 0 || c == opts.radixPoint) && (maskset.validPositions[pos - 1] === undefined || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back)) {
      pos -= 1;
    }
  }
  return pos;
}
function decimalValidator(chrs, maskset, pos, strict, opts) {
  var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
    result = (radixPos !== -1 || strict && opts.jitMasking) && new RegExp(opts.definitions["9"].validator).test(chrs);
  if (opts._radixDance && radixPos !== -1 && result && maskset.validPositions[radixPos] == undefined) {
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
  var numberMatches = new RegExp("(^" + (opts.negationSymbol.front !== "" ? (0, _escapeRegex["default"])(opts.negationSymbol.front) + "?" : "") + (0, _escapeRegex["default"])(opts.prefix) + ")(.*)(" + (0, _escapeRegex["default"])(opts.suffix) + (opts.negationSymbol.back != "" ? (0, _escapeRegex["default"])(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
    number = numberMatches ? numberMatches[2] : "",
    leadingzeroes = false;
  if (number) {
    number = number.split(opts.radixPoint.charAt(0))[0];
    leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number);
  }
  return leadingzeroes && (leadingzeroes[0].length > 1 || leadingzeroes[0].length > 0 && leadingzeroes[0].length < number.length) ? leadingzeroes : false;
}

//number aliases
_inputmask["default"].extendAliases({
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
    SetMaxOnOverflow: false,
    step: 1,
    inputType: "text",
    //number ~ specify that values which are set are in textform (radix point  is same as in the options) or in numberform (radixpoint = .)
    unmaskAsNumber: false,
    roundingFN: Math.round,
    //Math.floor ,  fn(x)
    inputmode: "decimal",
    shortcuts: {
      k: "1000",
      m: "1000000"
    },
    //global options
    placeholder: "0",
    greedy: false,
    rightAlign: true,
    insertMode: true,
    autoUnmask: false,
    skipOptionalPartCharacter: "",
    usePrototypeDefinitions: false,
    stripLeadingZeroes: true,
    substituteRadixPoint: true,
    definitions: {
      "0": {
        validator: decimalValidator
      },
      "1": {
        validator: decimalValidator,
        definitionSymbol: "9"
      },
      "9": {
        //\uFF11-\uFF19 #1606
        validator: "[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]",
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
      var inputmask = this;
      if (opts.__financeInput !== false && c === opts.radixPoint) return false;
      var radixPos = buffer.indexOf(opts.radixPoint),
        initPos = pos;
      pos = hanndleRadixDance(pos, c, radixPos, maskset, opts);
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
          caret: initPos - opts.negationSymbol.back.length
        } : {
          insert: [{
            pos: findValidator.call(inputmask, "+", maskset),
            c: opts.negationSymbol.front,
            fromIsValid: true
          }, {
            pos: findValidator.call(inputmask, "-", maskset),
            c: opts.negationSymbol.back,
            fromIsValid: undefined
          }],
          caret: initPos + opts.negationSymbol.back.length
        };
      }
      if (c === opts.groupSeparator) {
        return {
          caret: initPos
        };
      }
      if (strict) return true;
      if (radixPos !== -1 && opts._radixDance === true && isSelection === false && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && radixPos !== pos) {
        return {
          "caret": opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
        };
      }
      if (opts.__financeInput === false) {
        if (isSelection) {
          if (opts.digitsOptional) {
            return {
              rewritePosition: caretPos.end
            };
          } else if (!opts.digitsOptional) {
            if (caretPos.begin > radixPos && caretPos.end <= radixPos) {
              if (c === opts.radixPoint) {
                return {
                  insert: {
                    pos: radixPos + 1,
                    c: "0",
                    fromIsValid: true
                  },
                  rewritePosition: radixPos
                };
              } else {
                return {
                  rewritePosition: radixPos + 1
                };
              }
            } else if (caretPos.begin < radixPos) {
              return {
                rewritePosition: caretPos.begin - 1
              };
            }
          }
        } else if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && opts.digits > 0 && this.__valueGet.call(this.el) === "") {
          return {
            rewritePosition: radixPos
          };
        }
      }
      return {
        rewritePosition: pos
      };
    },
    postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
      if (currentResult === false) return currentResult;
      if (strict) return true;
      if (opts.min !== null || opts.max !== null) {
        var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, $.extend({}, opts, {
          unmaskAsNumber: true
        }));
        if (opts.min !== null && unmasked < opts.min && (unmasked.toString().length > opts.min.toString().length || unmasked < 0)) {
          return false;
          // return {
          // 	refreshFromBuffer: true,
          // 	buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
          // };
        }

        if (opts.max !== null && unmasked > opts.max) {
          return opts.SetMaxOnOverflow ? {
            refreshFromBuffer: true,
            buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
          } : false;
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
      processValue = processValue.replace(new RegExp((0, _escapeRegex["default"])(opts.groupSeparator), "g"), "");
      if (opts.placeholder.charAt(0) !== "") {
        processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0");
      }
      if (opts.unmaskAsNumber) {
        if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(_escapeRegex["default"].call(this, opts.radixPoint), ".");
        processValue = processValue.replace(new RegExp("^" + (0, _escapeRegex["default"])(opts.negationSymbol.front)), "-");
        processValue = processValue.replace(new RegExp((0, _escapeRegex["default"])(opts.negationSymbol.back) + "$"), "");
        return Number(processValue);
      }
      return processValue;
    },
    isComplete: function isComplete(buffer, opts) {
      var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
      maskedValue = maskedValue.replace(new RegExp("^" + (0, _escapeRegex["default"])(opts.negationSymbol.front)), "-");
      maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex["default"])(opts.negationSymbol.back) + "$"), "");
      maskedValue = maskedValue.replace(opts.prefix, "");
      maskedValue = maskedValue.replace(opts.suffix, "");
      maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex["default"])(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
      if (opts.radixPoint === ",") maskedValue = maskedValue.replace((0, _escapeRegex["default"])(opts.radixPoint), ".");
      return isFinite(maskedValue);
    },
    onBeforeMask: function onBeforeMask(initialValue, opts) {
      var radixPoint = opts.radixPoint || ",";
      if (isFinite(opts.digits)) opts.digits = parseInt(opts.digits);
      if ((typeof initialValue == "number" || opts.inputType === "number") && radixPoint !== "") {
        initialValue = initialValue.toString().replace(".", radixPoint);
      }
      var isNagtive = initialValue.charAt(0) === "-" || initialValue.charAt(0) === opts.negationSymbol.front;
      var valueParts = initialValue.split(radixPoint),
        integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
        decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "",
        forceDigits = valueParts.length > 1;
      initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);
      var digits = 0;
      if (radixPoint !== "") {
        digits = !opts.digitsOptional ? opts.digits : opts.digits < decimalPart.length ? opts.digits : decimalPart.length;
        if (decimalPart !== "" || !opts.digitsOptional) {
          var digitsFactor = Math.pow(10, digits || 1);

          //make the initialValue a valid javascript number for the parsefloat
          initialValue = initialValue.replace((0, _escapeRegex["default"])(radixPoint), ".");
          if (!isNaN(parseFloat(initialValue))) {
            initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits);
          }
          initialValue = initialValue.toString().replace(".", radixPoint);
        }
      }
      //this needs to be in a separate part and not directly in decimalPart to allow rounding
      if (opts.digits === 0 && initialValue.indexOf(radixPoint) !== -1) {
        initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint));
      }
      if (opts.min !== null || opts.max !== null) {
        var numberValue = initialValue.toString().replace(radixPoint, ".");
        if (opts.min !== null && numberValue < opts.min) {
          initialValue = opts.min.toString().replace(".", radixPoint);
        } else if (opts.max !== null && numberValue > opts.max) {
          initialValue = opts.max.toString().replace(".", radixPoint);
        }
      }
      if (isNagtive && initialValue.charAt(0) !== "-") {
        initialValue = "-" + initialValue;
      }
      return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
    },
    onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
      function stripBuffer(buffer, stripRadix) {
        if (opts.__financeInput !== false || stripRadix) {
          var position = buffer.indexOf(opts.radixPoint);
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
      var result, leadingzeroes;
      if (opts.stripLeadingZeroes && (leadingzeroes = checkForLeadingZeroes(buffer, opts))) {
        var caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1),
          offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0;
        for (var i = leadingzeroes[0].length - offset; i > 0; i--) {
          delete this.maskset.validPositions[caretNdx + i];
          delete buffer[caretNdx + i];
        }
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
            if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
              //strip negation symbol on blur when value is 0
              var nmbrMtchs = new RegExp("(^" + (opts.negationSymbol.front != "" ? (0, _escapeRegex["default"])(opts.negationSymbol.front) + "?" : "") + (0, _escapeRegex["default"])(opts.prefix) + ")(.*)(" + (0, _escapeRegex["default"])(opts.suffix) + (opts.negationSymbol.back != "" ? (0, _escapeRegex["default"])(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), true).reverse().join("")),
                number = nmbrMtchs ? nmbrMtchs[2] : "";
              if (number == 0) {
                result = {
                  refreshFromBuffer: true,
                  buffer: [0]
                };
              }
            } else if (opts.radixPoint !== "") {
              //strip radixpoint on blur when it is the latest char
              var radixNDX = buffer.indexOf(opts.radixPoint);
              if (radixNDX === opts.suffix.length) {
                if (result && result.buffer) {
                  result.buffer.splice(0, 1 + opts.suffix.length);
                } else {
                  buffer.splice(0, 1 + opts.suffix.length);
                  result = {
                    refreshFromBuffer: true,
                    buffer: stripBuffer(buffer)
                  };
                }
              }
            }
            if (opts.enforceDigitsOnBlur) {
              result = result || {};
              var bffr = result && result.buffer || buffer.slice().reverse();
              result.refreshFromBuffer = true;
              result.buffer = alignDigits(bffr, opts.digits, opts, true).reverse();
            }
        }
      }
      return result;
    },
    onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
      var $input = $(this),
        bffr;
      if (e.location != 3) {
        var pattern,
          c = e.key;
        if (pattern = opts.shortcuts && opts.shortcuts[c]) {
          if (pattern.length > 1) {
            this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) * parseInt(pattern));
            $input.trigger("setvalue");
            return false;
          }
        }
      }
      if (e.ctrlKey) {
        switch (e.key) {
          case _keycode.keys.ArrowUp:
            this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
            $input.trigger("setvalue");
            return false;
          case _keycode.keys.ArrowDown:
            this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
            $input.trigger("setvalue");
            return false;
        }
      }
      if (!e.shiftKey && (e.key === _keycode.keys.Delete || e.key === _keycode.keys.Backspace || e.key === _keycode.keys.BACKSPACE_SAFARI) && caretPos.begin !== buffer.length) {
        if (buffer[e.key === _keycode.keys.Delete ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) {
          bffr = buffer.slice().reverse();
          if (opts.negationSymbol.front !== "") bffr.shift();
          if (opts.negationSymbol.back !== "") bffr.pop();
          $input.trigger("setvalue", [bffr.join(""), caretPos.begin]);
          return false;
        } else if (opts._radixDance === true) {
          var radixPos = buffer.indexOf(opts.radixPoint);
          if (!opts.digitsOptional) {
            if (radixPos !== -1 && (caretPos.begin < radixPos || caretPos.end < radixPos || e.key === _keycode.keys.Delete && (caretPos.begin === radixPos || caretPos.begin - 1 === radixPos))) {
              var restoreCaretPos = undefined;
              if (caretPos.begin === caretPos.end) {
                //only adjust when not a selection
                if (e.key === _keycode.keys.Backspace || e.key === _keycode.keys.BACKSPACE_SAFARI) caretPos.begin++;else if (e.key === _keycode.keys.Delete && caretPos.begin - 1 === radixPos) {
                  restoreCaretPos = $.extend({}, caretPos);
                  caretPos.begin--;
                  caretPos.end--;
                }
              }
              bffr = buffer.slice().reverse();
              bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1);
              // console.log(caretPos);
              bffr = alignDigits(bffr, opts.digits, opts).join("");
              if (restoreCaretPos) {
                caretPos = restoreCaretPos;
              }
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
    prefix: "",
    //"$ ",
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
    inputmode: "numeric",
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

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _window = _interopRequireDefault(__webpack_require__(15));
var _inputmask = _interopRequireDefault(__webpack_require__(7));
var _canUseDOM = _interopRequireDefault(__webpack_require__(16));
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var document = _window["default"].document;

// add check if it is supported by the browser
// integrate shadowroot into maskcope
if (_canUseDOM["default"] && document && document.head && document.head.attachShadow && _window["default"].customElements && _window["default"].customElements.get("input-mask") === undefined) {
  var InputmaskElement = /*#__PURE__*/function (_HTMLElement) {
    _inherits(InputmaskElement, _HTMLElement);
    var _super = _createSuper(InputmaskElement);
    function InputmaskElement() {
      var _this;
      _classCallCheck(this, InputmaskElement);
      _this = _super.call(this);
      var attributeNames = _this.getAttributeNames(),
        shadow = _this.attachShadow({
          mode: "closed"
        }),
        input = document.createElement("input");
      input.type = "text";
      shadow.appendChild(input);
      for (var attr in attributeNames) {
        if (Object.prototype.hasOwnProperty.call(attributeNames, attr)) {
          input.setAttribute(attributeNames[attr], _this.getAttribute(attributeNames[attr]));
        }
      }
      var im = new _inputmask["default"]();
      im.dataAttribute = "";
      im.mask(input);
      input.inputmask.shadowRoot = shadow; //make the shadowRoot available
      return _this;
    }
    return _createClass(InputmaskElement);
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  _window["default"].customElements.define("input-mask", InputmaskElement);
}

/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _jquery = _interopRequireDefault(__webpack_require__(20));
var _inputmask = _interopRequireDefault(__webpack_require__(7));
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
 * Input Mask plugin for jquery
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */

if (_jquery["default"].fn.inputmask === undefined) {
  //jquery plugin
  _jquery["default"].fn.inputmask = function (fn, options) {
    var nptmask,
      input = this[0];
    if (options === undefined) options = {};
    if (typeof fn === "string") {
      switch (fn) {
        case "unmaskedvalue":
          return input && input.inputmask ? input.inputmask.unmaskedvalue() : (0, _jquery["default"])(input).val();
        case "remove":
          return this.each(function () {
            if (this.inputmask) this.inputmask.remove();
          });
        case "getemptymask":
          return input && input.inputmask ? input.inputmask.getemptymask() : "";
        case "hasMaskedValue":
          //check whether the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
          return input && input.inputmask ? input.inputmask.hasMaskedValue() : false;
        case "isComplete":
          return input && input.inputmask ? input.inputmask.isComplete() : true;
        case "getmetadata":
          //return mask metadata if exists
          return input && input.inputmask ? input.inputmask.getmetadata() : undefined;
        case "setvalue":
          _inputmask["default"].setValue(input, options);
          break;
        case "option":
          if (typeof options === "string") {
            if (input && input.inputmask !== undefined) {
              return input.inputmask.option(options);
            }
          } else {
            return this.each(function () {
              if (this.inputmask !== undefined) {
                return this.inputmask.option(options);
              }
            });
          }
          break;
        default:
          options.alias = fn;
          nptmask = new _inputmask["default"](options);
          return this.each(function () {
            nptmask.mask(this);
          });
      }
    } else if (Array.isArray(fn)) {
      options.alias = fn;
      nptmask = new _inputmask["default"](options);
      return this.each(function () {
        nptmask.mask(this);
      });
    } else if (_typeof(fn) == "object") {
      nptmask = new _inputmask["default"](fn);
      if (fn.mask === undefined && fn.alias === undefined) {
        return this.each(function () {
          if (this.inputmask !== undefined) {
            return this.inputmask.option(fn);
          } else nptmask.mask(this);
        });
      } else {
        return this.each(function () {
          nptmask.mask(this);
        });
      }
    } else if (fn === undefined) {
      //look for data-inputmask atributes
      return this.each(function () {
        nptmask = new _inputmask["default"](options);
        nptmask.mask(this);
      });
    }
  };
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _bundle = _interopRequireDefault(__webpack_require__(1));
__webpack_require__(29);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _bundle["default"];
exports["default"] = _default;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=jquery.inputmask.js.map