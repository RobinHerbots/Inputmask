/*
 * Input Mask Core
 * http://github.com/RobinHerbots/inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */

import $ from "../dependencyLibs/inputmask.dependencyLib";

import { aliases, masksCache, resolveAlias } from "./cache";
import defaults from "./defaults";
import definitions from "./definitions";
import {
  applyInputValue,
  checkVal,
  clearOptionalTail,
  unmaskedvalue
} from "./inputHandling";
import { keys } from "./keycode";
import { generateMaskSet } from "./mask-lexer";
import { caret, getBuffer, getBufferTemplate } from "./positioning";
import { getMaskTemplate, seekNext } from "./rule-engine.js";
import { handleRemoveKey, processKeypress, isComplete } from "./validation";
import window from "./window";

export { aliases, masksCache };

/** @typedef {import("./core/defaults.js").default} InputmaskOptions */
/** @typedef {Element | Element[] | NodeList | string} InputmaskElements */

/**
 * @typedef {Object} InputmaskInstance
 * @property {boolean} isRTL
 * @property {(elems: InputmaskElements) => InputmaskInstance | any} mask
 * @property {(options: keyof InputmaskOptions | InputmaskOptions, noremask?: boolean) => any} option
 * @property {(value?: string) => string} unmaskedvalue
 * @property {() => Element | undefined} remove
 * @property {() => string} getemptymask
 * @property {() => boolean} hasMaskedValue
 * @property {() => boolean} isComplete
 * @property {() => any} getmetadata
 * @property {(value?: string) => boolean} isValid
 * @property {{
 *   (value: string, metadata?: false): string;
 *   (value: string, metadata: true): { value: string; metadata: any };
 *   (value: string, metadata?: boolean): string | { value: string; metadata: any };
 * }} format
 * @property {(value: string) => void} setValue
 */

/**
 * @typedef {((alias?: string | InputmaskOptions, options?: InputmaskOptions, internal?: boolean) => InputmaskInstance) & {
 *   extendDefaults: (options: InputmaskOptions) => void;
 *   extendDefinitions: (definition: Record<string, any>) => void;
 *   extendAliases: (alias: Record<string, InputmaskOptions>) => void;
 *   format: {
 *     (value: string, options?: InputmaskOptions, metadata?: false): string;
 *     (value: string, options: InputmaskOptions | undefined, metadata: true): { value: string; metadata: any };
 *     (value: string, options?: InputmaskOptions, metadata?: boolean): string | { value: string; metadata: any };
 *   };
 *   unmask: (value: string, options?: InputmaskOptions) => string;
 *   isValid: (value: string, options?: InputmaskOptions) => boolean;
 *   remove: (elems: InputmaskElements) => void;
 *   setValue: (elems: InputmaskElements, value: string) => void;
 *   dependencyLib: any;
 * }} InputmaskStatic
 */

/**
 * @param {string | InputmaskOptions} [alias]
 * @param {InputmaskOptions} [options]
 * @param {boolean} [internal]
 * @returns {InputmaskInstance}
 */
function Inputmask(alias, options, internal) {
  // allow instanciating without new
  if (!(this instanceof Inputmask)) {
    return new Inputmask(alias, options, internal);
  }

  // Read the static, not the module-local import: bundle.jquery.js overrides
  // Inputmask.dependencyLib with the jQuery implementation after loading.
  this.dependencyLib = Inputmask.dependencyLib;
  this.el = undefined;
  this.events = {};
  this.maskset = undefined;

  if (internal !== true) {
    // init options
    if (Object.prototype.toString.call(alias) === "[object Object]") {
      options = alias;
    } else {
      options = options || {};
      if (alias) options.alias = alias;
    }
    this.opts = $.extend(true, {}, defaults, options);
    this.noMasksCache = options && options.definitions !== undefined;
    this.userOptions = options || {}; // user passed options
    resolveAlias(this.opts.alias, options, this.opts);
  }

  // maskscope properties
  this.displayValue = undefined;
  this.caretPos = undefined;
  this.refreshValue = false; // indicate a refresh from the inputvalue is needed (form.reset)
  this.undoValue = undefined;
  this.$el = undefined;
  this.skipInputEvent = false; // skip when triggered from within inputmask
  this.validationEvent = false;
  this.ignorable = false;
  // eslint-disable-next-line no-unused-expressions
  this.maxLength;
  this.mouseEnter = false;
  this.clicked = 0;
  this.originalPlaceholder = undefined; // needed for FF
  this.isComposing = false; // keydowncode == 229  compositionevent fallback
  this.lastInputEvent = null; // track last input event to prevent duplicates #2855
  this.hasAlternator = false;
}

/** @type {any} */
Inputmask.prototype = {
  dataAttribute: "data-inputmask", // data attribute prefix used for attribute binding
  get isRTL() {
    return this.opts.isRTL || this.opts.numericInput;
  },
  option: function (options, noremask) {
    // set extra options || retrieve value of a current option
    if (typeof options === "string") {
      return this.opts[options];
    } else if (typeof options === "object") {
      $.extend(this.userOptions, options); // user passed options
      // remask
      if (this.el && noremask !== true) {
        this.mask(this.el);
      }
      return this;
    }
  },
  unmaskedvalue: function (value) {
    this.maskset =
      this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    if (value !== undefined) {
      const valueBuffer = (
        typeof this.opts.onBeforeMask === "function"
          ? this.opts.onBeforeMask.call(this, value, this.opts) || value
          : value
      ).split("");
      checkVal.call(this, undefined, false, false, valueBuffer);
      if (typeof this.opts.onBeforeWrite === "function")
        this.opts.onBeforeWrite.call(
          this,
          undefined,
          getBuffer.call(this),
          0,
          this.opts
        );
    }
    return unmaskedvalue.call(this, this.el);
  },
  getemptymask: function () {
    // return the default (empty) mask value, usefull for setting the default value in validation
    this.maskset =
      this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return (
      this.isRTL
        ? getBufferTemplate.call(this).reverse()
        : getBufferTemplate.call(this)
    ).join("");
  },
  hasMaskedValue: function () {
    // check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
    return !this.opts.autoUnmask;
  },
  isComplete: function () {
    this.maskset =
      this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return isComplete.call(this, getBuffer.call(this));
  },
  getmetadata: function () {
    // return mask metadata if exists
    this.maskset =
      this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    if (Array.isArray(this.maskset.metadata)) {
      let maskTarget = getMaskTemplate.call(this, true, 0, false).join("");
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
  isValid: function (value) {
    this.maskset =
      this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    if (value) {
      const valueBuffer = (
        typeof this.opts.onBeforeMask === "function"
          ? this.opts.onBeforeMask.call(this, value, this.opts) || value
          : value
      ).split("");
      checkVal.call(this, undefined, true, false, valueBuffer);
    }

    const buffer = clearOptionalTail.call(this, []),
      isC = isComplete.call(this, buffer),
      isc2 =
        value === (this.isRTL ? buffer.reverse().join("") : buffer.join(""));

    return isC && (value === undefined || isc2);
  },
  format: function (value, metadata) {
    this.maskset =
      this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    const valueBuffer = (
      typeof this.opts.onBeforeMask === "function"
        ? this.opts.onBeforeMask.call(this, value, this.opts) || value
        : value
    ).split("");
    checkVal.call(this, undefined, true, false, valueBuffer);
    const formattedValue = this.isRTL
      ? getBuffer.call(this).slice().reverse().join("")
      : getBuffer.call(this).join("");
    return metadata
      ? {
          value: formattedValue,
          metadata: this.getmetadata()
        }
      : formattedValue;
  },
  setValue: function (value, caretPos) {
    if (this.el) {
      $(this.el).trigger("setvalue", [value, caretPos]);
    } else {
      this.ensureInitialized();
      applyInputValue.call(this, undefined, value);
      if (caretPos !== undefined) {
        caret.call(this, undefined, caretPos);
      }
    }
    return this;
  },
  _valueGet: function (overruleRTL) {
    if (this.el && this.el.inputmask && this.el.inputmask.__valueGet) {
      return this.isRTL && overruleRTL !== true
        ? this.el.inputmask.__valueGet
            .call(this.el)
            .split("")
            .reverse()
            .join("")
        : this.el.inputmask.__valueGet.call(this.el);
    }
    const val =
      this.displayValue !== undefined
        ? this.displayValue
        : this.maskset
          ? getBuffer.call(this).join("")
          : "";
    return this.isRTL && overruleRTL !== true
      ? val.split("").reverse().join("")
      : val;
  },
  _valueSet: function (value, overruleRTL) {
    value = value === null || value === undefined ? "" : value.toString();
    this.displayValue =
      overruleRTL !== true && this.isRTL
        ? value.split("").reverse().join("")
        : value;
    if (this.el && this.el.inputmask && this.el.inputmask.__valueSet) {
      this.el.inputmask.__valueSet.call(
        this.el,
        overruleRTL !== true && this.isRTL
          ? value.split("").reverse().join("")
          : value
      );
    }
  },
  ensureInitialized: function (initialValue) {
    if (this.maskset === undefined) {
      this.maskset = generateMaskSet(this.opts, this.noMasksCache);
      getBufferTemplate.call(this).join("");
      const initialPos = seekNext.call(this, -1);
      this.caretPos = { begin: initialPos, end: initialPos };
      this.undoValue = this._valueGet(true);
      if (initialValue !== undefined) {
        this.setValue(initialValue);
      }
    }
    return this;
  },
  input: function (chars) {
    this.ensureInitialized();
    if (chars === undefined || chars === null || chars === "") return this;
    const str = chars.toString();
    for (let i = 0; i < str.length; i++) {
      const keypress = {
        type: "keypress",
        key: str.charAt(i),
        preventDefault: () => {}
      };
      processKeypress.call(this, keypress, false, true);
    }
    return this;
  },
  delete: function (direction) {
    this.ensureInitialized();
    const key =
        direction === "delete" || direction === "forward"
          ? keys.Delete
          : keys.Backspace,
      keydown = {
        type: "keydown",
        key,
        preventDefault: () => {}
      };
    handleRemoveKey.call(
      this,
      this.el,
      key,
      caret.call(this, this.el),
      keydown
    );
    return this;
  },
  backspace: function () {
    return this.delete("backspace");
  },
  paste: function (text) {
    this.ensureInitialized();
    if (text === undefined || text === null) return this;
    const currentVal = this._valueGet(true),
      caretPos = caret.call(this, undefined, undefined, undefined, true),
      valueBefore = currentVal.substr(0, caretPos.begin),
      valueAfter = currentVal.substr(caretPos.end);
    let pasteVal = valueBefore + text + valueAfter;
    if (typeof this.opts.onBeforePaste === "function") {
      pasteVal = this.opts.onBeforePaste.call(this, pasteVal, this.opts);
      if (pasteVal === false) return this;
      if (!pasteVal) pasteVal = currentVal;
    }
    checkVal.call(this, undefined, true, false, pasteVal.toString().split(""));
    return this;
  },
  setSelection: function (begin, end) {
    this.ensureInitialized();
    caret.call(this, this.el, begin, end);
    return this;
  },
  getSelection: function () {
    this.ensureInitialized();
    return caret.call(this, this.el);
  },
  getValue: function () {
    this.ensureInitialized();
    return this._valueGet();
  },
  get value() {
    return this.getValue();
  },
  get caret() {
    return this.getSelection();
  },
  get unmaskedValue() {
    return this.unmaskedvalue();
  }
};

// apply defaults, definitions, aliases
/**
 * @param {InputmaskOptions} options
 * @returns {void}
 */
Inputmask.extendDefaults = function (options) {
  $.extend(true, defaults, options);
};
/**
 * @param {Record<string, any>} definition
 * @returns {void}
 */
Inputmask.extendDefinitions = function (definition) {
  $.extend(true, definitions, definition);
};
/**
 * @param {Record<string, InputmaskOptions>} alias
 * @returns {void}
 */
Inputmask.extendAliases = function (alias) {
  $.extend(true, aliases, alias);
};
/**
 * @param {string} value
 * @param {InputmaskOptions} [options]
 * @param {boolean} [metadata]
 * @returns {string | { value: string; metadata: any }}
 */
Inputmask.format = function (value, options, metadata) {
  return Inputmask(options).format(value, metadata);
};
/**
 * @param {string} value
 * @param {InputmaskOptions} [options]
 * @returns {string}
 */
Inputmask.unmask = function (value, options) {
  return Inputmask(options).unmaskedvalue(value);
};
/**
 * @param {string} value
 * @param {InputmaskOptions} [options]
 * @returns {boolean}
 */
Inputmask.isValid = function (value, options) {
  return Inputmask(options).isValid(value);
};

Inputmask.dependencyLib = $;

// make inputmask available
window.Inputmask = Inputmask;
const InputmaskExport = /** @type {InputmaskStatic} */ (Inputmask);
export default InputmaskExport;
