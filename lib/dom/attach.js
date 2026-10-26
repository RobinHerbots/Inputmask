import { resolveAlias } from "../core/cache";
import { unmaskedvalue } from "../core/inputHandling";
import { generateMaskSet } from "../core/mask-lexer";
import { getBufferTemplate } from "../core/positioning";
import window from "../core/window";
import $ from "../dependencyLibs/inputmask.dependencyLib";

import { EventRuler } from "./eventruler";
import { mask as patchMask } from "./mask";

const document = window.document,
  dataKey = "_inputmask_opts";

export default attach;

/**
 * Attach the element-bound half of the API to an Inputmask class: the
 * instance methods `mask`/`remove` and the statics `remove`/`setValue`.
 * lib/core/inputmask.js itself stays free of DOM references; the public entries
 * (lib/index.js, the bundles) call this once at load time.
 * @param {any} Inputmask
 * @returns {void}
 */
function attach(Inputmask) {
  /**
   * @param {import("../core/inputmask.js").InputmaskElements} elems
   * @returns {any}
   */
  function mask(elems) {
    const that = this;
    if (typeof elems === "string") {
      elems =
        document.getElementById(elems) || document.querySelectorAll(elems);
    }
    elems = elems.nodeName
      ? [elems]
      : Array.isArray(elems)
        ? elems
        : [].slice.call(elems); // [].slice as alternate for Array.from (Yandex browser)
    elems.forEach(function (el) {
      const scopedOpts = $.extend(true, {}, that.opts),
        // importAttributeOptions enriches this object with the options read
        // from the data-attributes, so it has to be the one handed to the
        // element scoped instance - otherwise those options are lost from
        // userOptions (they only end up in opts) #2847
        scopedUserOptions = $.extend(true, {}, that.userOptions);
      if (
        importAttributeOptions(
          el,
          scopedOpts,
          scopedUserOptions,
          that.dataAttribute
        )
      ) {
        const maskset = generateMaskSet(scopedOpts, that.noMasksCache);
        if (maskset !== undefined) {
          if (el.inputmask !== undefined) {
            el.inputmask.opts.autoUnmask = true; // force autounmasking when remasking
            el.inputmask.remove();
          }
          // store inputmask instance on the input with element reference
          el.inputmask = new Inputmask(undefined, undefined, true);
          el.inputmask.opts = scopedOpts;
          el.inputmask.noMasksCache = that.noMasksCache;
          el.inputmask.userOptions = scopedUserOptions;
          el.inputmask.el = el;
          el.inputmask.$el = $(el);
          el.inputmask.maskset = maskset;

          $.data(el, dataKey, that.userOptions);
          patchMask.call(el.inputmask);
        }
      }
    });
    return elems && elems[0] ? elems[0].inputmask || this : this;
  }

  /**
   * @returns {Element | undefined}
   */
  function remove() {
    if (this.el) {
      $.data(this.el, dataKey, null); // invalidate
      // writeout the value
      const cv = this.opts.autoUnmask
        ? unmaskedvalue(this.el)
        : this._valueGet(this.opts.autoUnmask);
      if (cv !== getBufferTemplate.call(this).join(""))
        this._valueSet(cv, this.opts.autoUnmask);
      else this._valueSet("");
      // unbind all events
      EventRuler.off(this.el);

      // restore the value property
      let valueProperty;
      if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
        valueProperty = Object.getOwnPropertyDescriptor(
          Object.getPrototypeOf(this.el),
          "value"
        );
        if (valueProperty) {
          if (this.__valueGet) {
            Object.defineProperty(this.el, "value", {
              get: this.__valueGet,
              set: this.__valueSet,
              configurable: true
            });
          }
        }
      } else if (
        document.__lookupGetter__ &&
        this.el.__lookupGetter__("value")
      ) {
        if (this.__valueGet) {
          this.el.__defineGetter__("value", this.__valueGet);
          this.el.__defineSetter__("value", this.__valueSet);
        }
      }
      // clear data
      this.el.inputmask = undefined;
    }
    return this.el;
  }

  Inputmask.prototype.mask = mask;
  Inputmask.prototype.remove = remove;
  Inputmask.remove = staticRemove;
  Inputmask.setValue = staticSetValue;
}

/**
 * @param {import("../core/inputmask.js").InputmaskElements} elems
 * @returns {void}
 */
function staticRemove(elems) {
  if (typeof elems === "string") {
    elems = document.getElementById(elems) || document.querySelectorAll(elems);
  }
  elems = elems.nodeName ? [elems] : elems;
  for (let i = 0; i < elems.length; i++) {
    if (elems[i].inputmask) elems[i].inputmask.remove();
  }
}

/**
 * @param {import("../core/inputmask.js").InputmaskElements} elems
 * @param {string} value
 * @returns {void}
 */
function staticSetValue(elems, value) {
  if (typeof elems === "string") {
    elems = document.getElementById(elems) || document.querySelectorAll(elems);
  }
  elems = elems.nodeName ? [elems] : elems;
  elems.forEach(function (el) {
    if (el.inputmask) el.inputmask.setValue(value);
    else $(el).trigger("setvalue", [value]);
  });
}

// read the option overrides a consumer placed on the element itself
// (data-inputmask / data-inputmask-<option> attributes)
function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
  function importOption(option, optionData) {
    const attrOption =
      dataAttribute === "" ? option : dataAttribute + "-" + option;
    optionData =
      optionData !== undefined ? optionData : npt.getAttribute(attrOption);
    if (optionData !== null) {
      if (typeof optionData === "string") {
        if (option.startsWith("on")) {
          // get function definition
          optionData = window[optionData];
        } else if (optionData === "false") optionData = false;
        else if (optionData === "true") optionData = true;
        else if (option === "mask")
          optionData = optionData.replace(/\\\\/g, "\\");
      }
      userOptions[option] = optionData;
    }
  }

  if (opts.importDataAttributes === true) {
    let attrOptions = npt.getAttribute(dataAttribute),
      option,
      dataoptions,
      optionData,
      p;

    if (attrOptions && attrOptions !== "") {
      attrOptions = attrOptions.replace(/'/g, '"');
      try {
        dataoptions = JSON.parse("{" + attrOptions + "}");
      } catch (e) {
        dataoptions = undefined;
      }
    }

    // resolve aliases
    if (dataoptions) {
      // pickup alias from dataAttribute
      optionData = undefined;
      for (p in dataoptions) {
        if (p.toLowerCase() === "alias") {
          optionData = dataoptions[p];
          break;
        }
      }
    }
    importOption("alias", optionData); // pickup alias from dataAttribute-alias
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

  // handle dir=rtl
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
