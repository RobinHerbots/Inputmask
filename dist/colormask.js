/*!
 * inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? (module.exports = factory(), module.exports.default = module.exports) :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Inputmask = factory());
})(this, (function () { 'use strict';

  var FormData$1 = {};

  var hasRequiredFormData;
  function requireFormData() {
    if (hasRequiredFormData) return FormData$1;
    hasRequiredFormData = 1;
    if (FormData.Inputmask === undefined) {
      class FormDataPatch extends FormData {
        constructor(form, submitter) {
          super(form, submitter);
          const entries = this.entries();
          let entry;
          while ((entry = entries.next()).done === false) {
            const fieldName = entry.value[0],
              originalValue = entry.value[1],
              // Get the original value from FormData
              element = form[fieldName];
            if (element && element.inputmask !== undefined && !(originalValue instanceof File)) {
              // Apply masking only if it's not a File and the element has inputmask
              this.set(fieldName, element.value);
            }
          }
          return this;
        }
      }
      FormDataPatch.Inputmask = true;
      // eslint-disable-next-line no-global-assign
      FormData = FormDataPatch;
    }
    return FormData$1;
  }

  requireFormData();

  const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  const window$1 = canUseDOM ? window : {};

  function data (owner, key, value) {
    if (value === undefined) {
      return owner.__data ? owner.__data[key] : null;
    } else {
      owner.__data = owner.__data || {};
      owner.__data[key] = value;
    }
  }

  function isWritable(target, name) {
    let descriptor = Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(target, name);
    if (descriptor) {
      if ("value" in descriptor) {
        return descriptor.writable !== false;
      }
      // an accessor property is only writable when it carries a setter
      return typeof descriptor.set === "function";
    }

    // no own property: an assignment only throws when a non-configurable accessor
    // without a setter (or a non-writable data prop) blocks it on the prototype chain
    let proto = Object.getPrototypeOf && Object.getPrototypeOf(target);
    while (proto) {
      descriptor = Object.getOwnPropertyDescriptor(proto, name);
      if (descriptor) {
        if ("value" in descriptor) {
          return descriptor.writable !== false;
        }
        return typeof descriptor.set === "function" || descriptor.configurable;
      }
      proto = Object.getPrototypeOf(proto);
    }
    return true;
  }
  function extend() {
    let options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      deep = false;
    const length = arguments.length;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && typeof target !== "function") {
      target = {};
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          // "__proto__" would resolve through the prototype chain: src comes back
          // as Object.prototype and the deep merge below writes into it. Inherited
          // keys are not ours to copy either.
          if (name === "__proto__" || !Object.prototype.hasOwnProperty.call(options, name)) {
            continue;
          }
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Never overwrite a non-writable target property (e.g. the read-only
          // isTrusted accessor on DOM events): assigning to it would throw
          if (!isWritable(target, name)) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (Object.prototype.toString.call(copy) === "[object Object]" || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && Object.prototype.toString.call(src) === "[object Object]" ? src : {};
            }

            // Never move original objects, clone them
            target[name] = extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  }

  const document$2 = window$1.document;
  function isValidElement(elem) {
    return elem instanceof Element && data(elem, "events");
  }
  let Evnt;
  if (typeof window$1.CustomEvent === "function") {
    Evnt = window$1.CustomEvent;
  } else if (window$1.Event && document$2 && document$2.createEvent) {
    Evnt = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        composed: true,
        detail: undefined
      };
      const evt = document$2.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    Evnt.prototype = window$1.Event.prototype;
  } else if (typeof Event !== "undefined") {
    // nodejs
    Evnt = Event;
  }
  function on(events, handler) {
    if (!this[0] || !isValidElement(this[0])) {
      return this; // Early return if no valid element
    }
    const elem = this[0],
      eventRegistry = data(elem, "events"),
      addEvent = (ev, namespace) => {
        // register domevent
        elem.addEventListener(ev, handler, false);
        eventRegistry[ev] = eventRegistry[ev] || {};
        eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
        eventRegistry[ev][namespace].push(handler);
      };
    events.split(" ").forEach(event => {
      const [ev, namespace = "global"] = event.split(".");
      addEvent(ev, namespace);
    });
    return this;
  }
  function off(events, handler) {
    let eventRegistry, elem;
    function removeEvent(ev, namespace, handler) {
      if (ev in eventRegistry === true) {
        // unbind to dom events
        elem.removeEventListener(ev, handler, false);
        // when the namespace is not defined (global namespace), we need to clean up all events in all namespaces
        if (namespace === "global") {
          for (const nmsp in eventRegistry[ev]) {
            eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);
          }
        } else {
          eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
        }
      }
    }
    function resolveNamespace(ev, namespace) {
      const evts = [];
      let hndx, hndL;
      if (ev.length > 0) {
        const namespaces = namespace ? [namespace] : Object.keys(eventRegistry[ev]);
        for (let nsi = 0; nsi < namespaces.length; nsi++) {
          namespace = namespaces[nsi];
          if (handler === undefined) {
            for (hndx = 0, hndL = eventRegistry[ev][namespace]?.length || 0; hndx < hndL; hndx++) {
              evts.push({
                ev,
                namespace,
                handler: eventRegistry[ev][namespace][hndx]
              });
            }
          } else {
            evts.push({
              ev,
              namespace,
              handler
            });
          }
        }
      } else if (namespace.length > 0) {
        for (const evNdx in eventRegistry) {
          if (eventRegistry[evNdx][namespace]) {
            if (handler === undefined) {
              for (hndx = 0, hndL = eventRegistry[evNdx][namespace].length; hndx < hndL; hndx++) {
                evts.push({
                  ev: evNdx,
                  namespace,
                  handler: eventRegistry[evNdx][namespace][hndx]
                });
              }
            } else {
              evts.push({
                ev: evNdx,
                namespace,
                handler
              });
            }
          }
        }
      }
      return evts;
    }
    if (isValidElement(this[0])) {
      eventRegistry = data(this[0], "events");
      elem = this[0];
      // if no events defined, remove all events
      events = events || Object.keys(eventRegistry).join(" ");
      if (events !== "") {
        events.split(" ").forEach(event => {
          const [ev, namespace] = event.split(".");
          resolveNamespace(ev, namespace).forEach(({
            ev: ev1,
            handler: handler1,
            namespace: namespace1
          }) => {
            removeEvent(ev1, namespace1, handler1);
          });
        });
      }
    }
    return this;
  }
  function trigger(events /* , args... */) {
    if (isValidElement(this[0])) {
      const eventRegistry = data(this[0], "events"),
        elem = this[0],
        _events = typeof events === "string" ? events.split(" ") : [events.type];
      for (let endx = 0; endx < _events.length; endx++) {
        const nsEvent = _events[endx].split("."),
          ev = nsEvent[0],
          namespace = nsEvent[1] || "global";
        if (document$2 !== undefined) {
          // trigger domevent
          let evnt;
          const params = {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: arguments[1]
          };
          // The custom event that will be created
          try {
            switch (ev) {
              case "input":
                params.inputType = "insertText";
                evnt = new InputEvent(ev, params);
                break;
              default:
                evnt = new CustomEvent(ev, params);
            }
          } catch (e) {
            evnt = document$2.createEvent("CustomEvent");
            evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
          }
          if (events.type) extend(evnt, events);
          elem.dispatchEvent(evnt);
        } else if (eventRegistry[ev] !== undefined) {
          arguments[0] = arguments[0].type ? arguments[0] : Evnt(arguments[0]);
          arguments[0].detail = arguments.slice(1);
          const registry = eventRegistry[ev],
            handlers = namespace === "global" ? Object.values(registry).flat() : registry[namespace];
          handlers.forEach(handler => handler.apply(elem, arguments));
        }
      }
    }
    return this;
  }

  /*
   Input Mask plugin dependencyLib
   http://github.com/RobinHerbots/jquery.inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */

  const document$1 = window$1.document;
  function DependencyLib(elem) {
    if (elem instanceof DependencyLib) {
      return elem;
    }
    if (!(this instanceof DependencyLib)) {
      return new DependencyLib(elem);
    }
    if (elem !== undefined && elem !== null && elem !== window$1) {
      this[0] = elem.nodeName ? elem : elem[0] !== undefined && elem[0].nodeName ? elem[0] : document$1.querySelector(elem);
      if (this[0] !== undefined && this[0] !== null) {
        data(this[0], "events", data(this[0], "events") || {});
      }
    }
  }
  DependencyLib.prototype = {
    on,
    off,
    trigger
  };

  // static
  DependencyLib.extend = extend;
  DependencyLib.data = data;
  DependencyLib.Event = Evnt;

  const aliases = {},
    masksCache = {};

  // resolve a plain alias name (or an alias chain) into concrete mask options;
  // used by the instance constructor and by the data-attribute option import
  function resolveAlias(aliasStr, options, opts) {
    const aliasDefinition = aliases[aliasStr];
    if (aliasDefinition) {
      if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); // alias is another alias
      DependencyLib.extend(true, opts, aliasDefinition); // merge alias definition in the options
      DependencyLib.extend(true, opts, options); // reapply extra given options
      return true;
    } // alias not found => treat as mask
    else if (opts.mask === null) {
      opts.mask = aliasStr;
    }
    return false;
  }

  /**
   * fromAlternate tells whether the current validation runs as part of an alternation
   * (mask branch switch).
   * - `undefined` (or `false`): not alternating
   * - `true`: validating after an alternation decision was already made at the top level
   * - a number: an alternation re-insert is in progress; the value is the number of inputs
   *   still to be written, including the current one (`validInputs.length - i`, where `i` is
   *   the index of the input being re-inserted). A count of `1` marks the final write, so
   *   final constraints (e.g. numeric min/max) must be enforced on it.
   * @typedef {boolean | number | undefined} FromAlternate
   */

  /**
   * Public options surface for Inputmask instances.
   *
   * @typedef {Object} InputmaskOptions
   * @property {number} [_maxTestPos]
   * @property {string | Record<number, string>} [placeholder]
   * @property {string[] | [string, string]} [optionalmarker]
   * @property {string[] | [string, string]} [quantifiermarker]
   * @property {string[] | [string, string]} [groupmarker]
   * @property {string} [alternatormarker]
   * @property {string} [escapeChar]
   * @property {string | null} [mask]
   * @property {string | null} [regex]
   * @property {(event?: Event) => void} [oncomplete]
   * @property {(event?: Event) => void} [onincomplete]
   * @property {(event?: Event) => void} [oncleared]
   * @property {number | string} [repeat]
   * @property {boolean} [greedy]
   * @property {boolean} [autoUnmask]
   * @property {boolean} [removeMaskOnSubmit]
   * @property {boolean} [clearMaskOnLostFocus]
   * @property {boolean} [insertMode]
   * @property {boolean} [insertModeToggle]
   * @property {boolean} [insertModeVisual]
   * @property {boolean} [clearIncomplete]
   * @property {string | null} [alias]
   * @property {(event: Event, buffer: string[], caretPos: number, opts: InputmaskOptions) => void} [onKeyDown]
   * @property {((initialValue: string, opts: InputmaskOptions) => string) | null} [onBeforeMask]
   * @property {(pastedValue: string, opts: InputmaskOptions) => string} [onBeforePaste]
   * @property {((event: Event | undefined, buffer: string[], caretPos: number, opts: InputmaskOptions) => any) | null} [onBeforeWrite]
   * @property {((maskedValue: string, unmaskedValue: string, opts: InputmaskOptions) => string) | null} [onUnMask]
   * @property {string | null} [outputMask]
   * @property {boolean} [showMaskOnFocus]
   * @property {boolean} [showMaskOnHover]
   * @property {(key: string, result: boolean, opts: InputmaskOptions) => void} [onKeyValidation]
   * @property {string} [skipOptionalPartCharacter]
   * @property {boolean} [numericInput]
   * @property {boolean} [rightAlign]
   * @property {boolean} [undoOnEscape]
   * @property {string} [radixPoint]
   * @property {boolean} [_radixDance]
   * @property {string} [groupSeparator]
   * @property {boolean | null} [keepStatic]
   * @property {boolean} [positionCaretOnTab]
   * @property {boolean} [tabThrough]
   * @property {string[]} [supportsInputType]
   * @property {((buffer: string[], opts: InputmaskOptions) => boolean) | null} [isComplete]
   * @property {((buffer: string[], pos: number, char: string, isSelection: boolean, opts: InputmaskOptions, maskset: any, caretPos: number, strict: boolean) => boolean | Object) | null} [preValidation]
   * @property {((buffer: string[], pos: number, char: string, currentResult: boolean | Object, opts: InputmaskOptions, maskset: any, strict: boolean, fromCheckval: boolean, fromAlternate: FromAlternate) => boolean | Object) | null} [postValidation]
   * @property {string | undefined} [staticDefinitionSymbol]
   * @property {boolean | number} [jitMasking]
   * @property {boolean} [nullable]
   * @property {boolean} [inputEventOnly]
   * @property {boolean} [noValuePatching]
   * @property {"none" | "lvp" | "radixFocus" | "select" | "ignore"} [positionCaretOnClick]
   * @property {"upper" | "lower" | "title" | "follow" | ((elem: HTMLElement, test: any, pos: number, validPositions: any) => string) | null} [casing]
   * @property {string} [inputmode]
   * @property {boolean} [importDataAttributes]
   * @property {boolean} [shiftPositions]
   * @property {boolean} [usePrototypeDefinitions]
   * @property {boolean} [validateOnly]
   * @property {number} [validationEventTimeOut]
   * @property {Record<string, string>} [substitutes]
   */

  /** @type {InputmaskOptions} */
  const defaults = {
    _maxTestPos: 500,
    // No placeholder default ~ each definition carries its own (see
    // definitions.js), so an option-less mask renders from the definition and a
    // user placeholder only applies where one was asked for.
    optionalmarker: ["[", "]"],
    quantifiermarker: ["{", "}"],
    groupmarker: ["(", ")"],
    alternatormarker: "|",
    escapeChar: "\\",
    mask: null,
    // needs tobe null instead of undefined as the extend method does not consider props with the undefined value
    regex: null,
    // regular expression as a mask
    oncomplete: () => {},
    // executes when the mask is complete
    onincomplete: () => {},
    // executes when the mask is incomplete and focus is lost
    oncleared: () => {},
    // executes when the mask is cleared
    repeat: 0,
    // repetitions of the mask: * ~ forever, otherwise specify an integer
    greedy: false,
    // true: allocated buffer for the mask and repetitions - false: allocate only if needed
    autoUnmask: false,
    // automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
    removeMaskOnSubmit: false,
    // remove the mask before submitting the form.
    clearMaskOnLostFocus: true,
    insertMode: true,
    // insert the input or overwrite the input
    insertModeToggle: true,
    // allow the INSERT key to switch between insert- and overwrite-mode
    insertModeVisual: true,
    // show selected caret when insertmode = false
    clearIncomplete: false,
    // clear the incomplete input on blur
    alias: null,
    onKeyDown: () => {},
    // callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
    onBeforeMask: null,
    // executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
    onBeforePaste: function (pastedValue, opts) {
      return typeof opts.onBeforeMask === "function" ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
    },
    // executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
    onBeforeWrite: null,
    // executes before writing to the masked element. args => event, opts
    onUnMask: null,
    // executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
    outputMask: null,
    // mask to apply when unmasking
    showMaskOnFocus: true,
    // show the mask-placeholder when the input has focus
    showMaskOnHover: true,
    // show the mask-placeholder when hovering the empty input
    onKeyValidation: () => {},
    // executes on every key-press with the result of isValid. Params: key, result, opts
    skipOptionalPartCharacter: " ",
    // a character which can be used to skip an optional part of a mask
    numericInput: false,
    // numericInput input direction style (input shifts to the left while holding the caret position)
    rightAlign: false,
    // align to the right
    undoOnEscape: true,
    // pressing escape reverts the value to the value before focus
    // numeric basic properties
    radixPoint: "",
    // ".", // | ","
    _radixDance: false,
    // dance around the radixPoint
    groupSeparator: "",
    // ",", // | "."
    // numeric basic properties
    keepStatic: null,
    // try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible
    positionCaretOnTab: true,
    // when enabled the caret position is set after the latest valid position on TAB
    tabThrough: false,
    // allows for tabbing through the different parts of the masked field
    supportsInputType: ["text", "tel", "url", "password", "search"],
    // list with the supported input types
    isComplete: null,
    // override for isComplete - args => buffer, opts - return true || false
    preValidation: null,
    // hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts, maskset, caretPos, strict => return true/false/command object
    postValidation: null,
    // hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval, fromAlternate (number of inputs still to write during an alternation, otherwise undefined) => return true/false/json
    staticDefinitionSymbol: undefined,
    // specify a definitionSymbol for static content, used to make matches for alternators
    jitMasking: false,
    // just in time masking ~ only mask while typing, can n (number), true or false
    nullable: true,
    // return nothing instead of the buffertemplate when the user hasn't entered anything.
    inputEventOnly: false,
    // dev option - testing inputfallback behavior
    noValuePatching: false,
    // disable value property patching
    positionCaretOnClick: "lvp",
    // none, lvp (based on the last valid position (default), radixFocus (position caret to radixpoint on initial click), select (select the whole input), ignore (ignore the click and continue the mask)
    casing: null,
    // mask-level casing. Options: null, "upper", "lower" or "title" or "follow" or callback args => elem, test, pos, validPositions return charValue
    inputmode: "text",
    // specify the inputmode
    importDataAttributes: true,
    // import data-inputmask attributes
    shiftPositions: true,
    // shift position of the mask entries on entry and deletion.
    usePrototypeDefinitions: true,
    // use the default defined definitions from the prototype
    validationEventTimeOut: 3000,
    // Time to show validation error on form submit
    substitutes: {},
    // define character substitutes
    validateOnly: false // regex masks of a single character class with a "*" quantifier (e.g. "[^<|>]*") apply the same test at every position ~ reuse it instead of re-resolving the mask per position, so long free-form input (see #2567) stays cheap. Ignored with a warning for any other mask.
  };

  // Placeholder of the prototype definitions below. A regex mask has no
  // definition to inherit it from, so the lexer falls back to this one.
  const DEFAULT_PLACEHOLDER = "_";
  const definitions$1 = {
    9: {
      validator: "\\p{N}",
      definitionSymbol: "*",
      placeholder: "_"
    },
    a: {
      validator: "\\p{L}",
      definitionSymbol: "*",
      placeholder: "_"
    },
    "*": {
      validator: "[\\p{L}\\p{N}]",
      placeholder: "_"
    }
  };

  const ignorables = {
      Alt: 18,
      AltGraph: 18,
      ArrowDown: 40,
      ArrowLeft: 37,
      ArrowRight: 39,
      ArrowUp: 38,
      Backspace: 8,
      CapsLock: 20,
      Control: 17,
      ContextMenu: 93,
      Dead: 221,
      Delete: 46,
      End: 35,
      Escape: 27,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      Home: 36,
      Insert: 45,
      NumLock: 144,
      PageDown: 34,
      PageUp: 33,
      Pause: 19,
      PrintScreen: 44,
      Process: 229,
      Shift: 16,
      ScrollLock: 145,
      Tab: 9,
      Unidentified: 229
    },
    keyCode = {
      c: 67,
      x: 88,
      z: 90,
      BACKSPACE_SAFARI: 127,
      Enter: 13,
      Meta_LEFT: 91,
      Meta_RIGHT: 92,
      Space: 32,
      ...ignorables
    };
    Object.entries(keyCode).reduce((acc, [key, value]) => (
    // eslint-disable-next-line no-sequences
    acc[value] = acc[value] === undefined ? key : acc[value], acc), {});
    const keys = Object.entries(keyCode).reduce(
    // eslint-disable-next-line no-sequences
    (acc, [key, value]) => (acc[key] = key === "Space" ? " " : key, acc), {});

  function casing(elem, test, pos) {
    const opts = this.opts,
      maskset = this.maskset;
    switch (opts.casing || test.casing) {
      case "upper":
        elem = elem.toLocaleUpperCase();
        break;
      case "lower":
        elem = elem.toLocaleLowerCase();
        break;
      case "title":
        {
          const posBefore = maskset.validPositions[pos - 1];
          if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(keyCode.Space)) {
            elem = elem.toLocaleUpperCase();
          } else {
            elem = elem.toLocaleLowerCase();
          }
          break;
        }
      case "follow":
        if (test.def && test.def !== test.def.toLocaleLowerCase()) {
          elem = elem.toLocaleUpperCase();
        } else if (test.def && test.def !== test.def.toLocaleUpperCase()) {
          elem = elem.toLocaleLowerCase();
        }
        break;
      default:
        if (typeof opts.casing === "function") {
          const args = Array.prototype.slice.call(arguments);
          args.push(maskset.validPositions);
          elem = opts.casing.apply(this, args);
        }
    }
    return elem;
  }
  function getLastValidPosition(closestTo, strict, validPositions) {
    const maskset = this.maskset;
    let before = -1,
      after = -1;
    const valids = validPositions || maskset.validPositions; // for use in valhook ~ context switch
    if (closestTo === undefined) closestTo = -1;
    for (let psNdx = 0, vpl = valids.length; psNdx < vpl; psNdx++) {
      if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
        if (psNdx <= closestTo) before = psNdx;
        if (psNdx >= closestTo) after = psNdx;
      }
    }
    return before === -1 || before === closestTo ? after : after === -1 ? before : closestTo - before < after - closestTo ? before : after;
  }
  function getLocator(tst, align) {
    // need to align the locators to be correct
    let locator = (tst.alternation != null ? tst.mloc[`${getDecisionTaker(tst)}:${tst.alternation}`] || tst.locator : tst.locator).join("");
    if (locator !== "") {
      locator = locator.split(":")[0]; // strip off alternation marker
      if (align > locator.length) locator = locator.padEnd(align, "0");
    }
    return locator;
  }
  function getDecisionTaker(tst) {
    let decisionTaker = tst.locator[tst.alternation];
    if (typeof decisionTaker === "string" && decisionTaker.length > 0) {
      // no decision taken ~ take smallest as decider
      decisionTaker = decisionTaker.split(",").sort((a, b) => a - b)[0];
    }
    return decisionTaker !== undefined ? decisionTaker.toString() : "";
  }

  // tobe put on prototype?
  function getPlaceholder(pos, test, returnPL) {
    const inputmask = this,
      opts = this.opts,
      maskset = this.maskset;
    test = test || getTest.call(inputmask, pos).match;

    // Only for the alternation placeholder below: a baked placeholder indexes by
    // token, while that one answers a display position.
    const phStr = typeof opts.placeholder === "string" ? opts.placeholder : DEFAULT_PLACEHOLDER,
      isPhMap = typeof opts.placeholder === "object";

    // The lexer resolves the placeholder of every test when it builds it, so this
    // only has to decide what a baked placeholder cannot say ~ whether the static's
    // own character still stands, or the placeholder has to take over.

    // static and not dynamically generated ~ does not occur in regex mask ~ numeric alias def is not a valid entry
    if (test.placeholder !== "" && test.static === true && test.generated !== true) {
      // Several static alternatives can share one position, and then none of
      // them is the character to show ~ the placeholder stands in for all of
      // them. The lexer gives every static its own character as placeholder, so
      // this cannot be read off the placeholder being absent.
      if (!isPhMap && returnPL !== true && pos > -1 && maskset.validPositions[pos] === undefined) {
        const ph = staticAlternationPlaceholder.call(inputmask, pos, phStr);
        if (ph !== undefined) return ph;
      }
      const lvp = getLastValidPosition.call(inputmask, pos),
        nextPos = seekNext.call(inputmask, lvp);
      if (returnPL ? pos <= nextPos : pos < nextPos) {
        return casing.call(inputmask, opts.staticDefinitionSymbol && test.static ? test.nativeDef : test.def, test, pos);
      }
    }
    return typeof test.placeholder === "function" ? test.placeholder(opts) : test.placeholder;
  }

  /**
   * The placeholder to show for a position that several static alternatives
   * share, or undefined when they do not share it.
   *
   * @this {Inputmask}
   * @param {number} pos
   * @param {string} phStr
   * @returns {string | undefined}
   */
  function staticAlternationPlaceholder(pos, phStr) {
    const inputmask = this,
      opts = inputmask.opts,
      maskset = inputmask.maskset,
      tests = getTests.call(inputmask, pos);
    if (tests.length < 2 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
      return undefined;
    }
    let prevTest,
      staticAlternations = 0,
      firstStaticDef;
    for (let i = 0; i < tests.length; i++) {
      const tstMatch = tests[i].match;
      if (tstMatch.def !== "" && tstMatch.optionality !== true && tstMatch.optionalQuantifier !== true && (tstMatch.static === true || prevTest === undefined || tstMatch.fn.test(prevTest.match.def, maskset, pos, true, opts) !== false)) {
        if (staticAlternations === 0) firstStaticDef = tstMatch.def;
        staticAlternations++;
        if (tstMatch.static === true) prevTest = tests[i];
        if (staticAlternations > 1 && /[0-9a-zA-Z]/.test(firstStaticDef)) {
          return phStr.charAt(pos % phStr.length);
        }
      }
    }
    return undefined;
  }

  // tobe put on prototype?
  function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
    // includeMode true => input, undefined => placeholder, false => mask

    const inputmask = this,
      opts = this.opts,
      maskset = this.maskset,
      greedy = opts.greedy,
      maskTemplate = [];
    if (clearOptionalTail && opts.greedy) {
      opts.greedy = false;
      inputmask.maskset.tests = {};
    }
    minimalPos = minimalPos || 0;
    let ndxIntlzr,
      pos = 0,
      test,
      testPos,
      jitRenderStatic;
    do {
      if (baseOnInput === true && maskset.validPositions[pos]) {
        testPos = clearOptionalTail && maskset.validPositions[pos].match.optionality && maskset.validPositions[pos + 1] === undefined && (maskset.validPositions[pos].generatedInput === true || maskset.validPositions[pos].input === opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos];
        test = testPos.match;
        ndxIntlzr = testPos.locator.slice();
        maskTemplate.push(includeMode === true ? testPos.match.displayChar !== undefined ? testPos.match.displayChar : testPos.input : includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, pos, test));
      } else {
        testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
        test = testPos.match;
        ndxIntlzr = testPos.locator.slice();
        const jitMasking = noJit === true ? false : opts.jitMasking !== false ? opts.jitMasking : test.jit;
        // check for groupSeparator is a hack for the numerics as we don't want the render of the groupSeparator beforehand
        jitRenderStatic = (jitRenderStatic || maskset.validPositions[pos - 1] /* && getTest.call(inputmask, pos + 1).match.def == "" */) && test.static && test.def !== opts.groupSeparator && test.fn === null;
        if (jitRenderStatic || jitMasking === false || jitMasking === undefined /* || pos < lvp */ || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
          maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, maskTemplate.length, test));
        } else {
          jitRenderStatic = false;
        }
      }
      pos++;
    } while (test.static !== true || test.def !== "" || minimalPos > pos);
    if (maskTemplate[maskTemplate.length - 1] === "") {
      maskTemplate.pop(); // drop the last one which is empty
    }
    if (includeMode !== false ||
    // do not alter the masklength when just retrieving the maskdefinition
    maskset.maskLength === undefined) {
      // just make sure the maskLength gets initialized in all cases (needed for isValid)
      maskset.maskLength = pos - 1;
    }
    opts.greedy = greedy;
    return maskTemplate;
  }

  // tobe put on prototype?
  function getTestTemplate(pos, ndxIntlzr, tstPs) {
    const inputmask = this,
      maskset = this.maskset;
    return maskset.validPositions[pos] || determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
  }

  // tobe put on prototype?
  function determineTestTemplate(pos, tests) {
    const inputmask = this,
      opts = inputmask.opts,
      optionalityLevel = determineOptionalityLevel(pos, tests);
    pos = pos > 0 ? pos - 1 : 0;
    // longest locator length ~ Math.max of an empty list when there are no tests
    let longestLocator = -Infinity,
      choices = 0;
    for (let ndx = 0; ndx < tests.length; ndx++) {
      const tst = tests[ndx],
        locatorLength = tst.locator === undefined ? 0 : tst.locator.length;
      if (locatorLength > longestLocator) longestLocator = locatorLength;
      if (tst.unMatchedAlternationStopped !== true) choices++;
    }
    const prevTest = getTest.call(inputmask, pos),
      prevLocator = getLocator(prevTest, longestLocator);
    let lenghtOffset = 0,
      tstLocator,
      closest,
      bestMatch;
    if (opts.greedy && tests.length > 1 && tests[tests.length - 1].match.def === "") lenghtOffset = 1;
    // console.log(" optionality = " + optionalityLevel);
    // console.log(" - " + JSON.stringify(tests));
    for (let ndx = 0; ndx < tests.length - lenghtOffset; ndx++) {
      // find best matching
      const tst = tests[ndx];
      tstLocator = getLocator(tst, longestLocator);
      const distance = Number(tstLocator) - Number(prevLocator); // find the closest match to the previous one
      // console.log("distance", distance, tstLocator, prevLocator);

      if (tst.unMatchedAlternationStopped !== true || choices <= 1) {
        // only skip when there are choices outside the alternation
        if (closest === undefined || tstLocator !== "" && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.optionality - optionalityLevel > 0 && bestMatch.match.newBlockMarker === "master" && (!tst.match.optionality || tst.match.optionality - optionalityLevel < 1 || !tst.match.newBlockMarker) || bestMatch && !opts.greedy && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) {
          closest = distance;
          bestMatch = tst;
        }
      }
    }
    return bestMatch;
  }
  function determineOptionalityLevel(pos, tests) {
    let optionalityLevel = 0,
      differentOptionalLevels = false;
    tests.forEach(test => {
      if (test.match.optionality) {
        if (optionalityLevel !== 0 && optionalityLevel !== test.match.optionality) differentOptionalLevels = true;
        if (optionalityLevel === 0 || optionalityLevel > test.match.optionality) {
          optionalityLevel = test.match.optionality;
        }
      }
    });
    if (optionalityLevel) {
      if (pos === 0) optionalityLevel = 0;else if (tests.length === 1) optionalityLevel = 0;else if (!differentOptionalLevels) optionalityLevel = 0;
    }
    return optionalityLevel;
  }

  // tobe put on prototype?
  function getTest(pos, tests) {
    const inputmask = this,
      maskset = this.maskset;
    if (maskset.validPositions[pos]) {
      return maskset.validPositions[pos];
    }
    return (tests || getTests.call(inputmask, pos))[0];
  }
  function isSubsetOf(source, target, opts) {
    function expand(pattern) {
      const expanded = [];
      let start = -1,
        end;
      for (let i = 0, l = pattern.length; i < l; i++) {
        if (pattern.charAt(i) === "-") {
          end = pattern.charCodeAt(i + 1);
          while (++start < end) expanded.push(String.fromCharCode(start));
        } else {
          start = pattern.charCodeAt(i);
          expanded.push(pattern.charAt(i));
        }
      }
      return expanded.join("");
    }
    if (source.match.def === target.match.nativeDef) return true;
    if ((opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) && source.match.static !== true && target.match.static !== true) {
      // is regex a subset
      if (target.match.fn.source === ".") return true;
      return expand(target.match.fn.source.replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.source.replace(/[[\]/]/g, ""))) !== -1;
    }
    return false;
  }

  // tobe put on prototype?
  function getTests(pos, ndxIntlzr, tstPs) {
    const inputmask = this,
      $ = this.dependencyLib,
      maskset = this.maskset,
      opts = this.opts,
      maskTokens = maskset.maskToken;
    let testPos = ndxIntlzr ? tstPs : 0,
      ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
      matches = [],
      insertStop = false,
      insertStopFromAlternation = false,
      latestMatchEntry,
      cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "",
      unMatchedAlternation = false;
    // stack of the repetition indexes of the currently resolved quantifiers,
    // innermost last. It lets a match tell from which quantifier repetition it
    // originates, so the optional stop is not inserted on a later repetition of a
    // nested quantifier (see isNestedQuantifierContinuation).
    const quantifierStack = [];
    if (opts.validateOnly === true && maskset.wholeRegex && maskset.positionIndependent === true && maskset.voBuilding !== true) {
      // validateOnly: an unlimited single-definition mask matches the same way at
      // every position, so resolve the definition once (position 0) and reuse it
      // instead of walking the mask tokens for each character
      if (maskset.voTests === undefined) {
        maskset.voBuilding = true;
        try {
          maskset.voTests = getTests.call(inputmask, 0);
        } finally {
          maskset.voBuilding = false;
        }
      }
      return maskset.voTests;
    }
    function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
      // ndxInitializer contains a set of indexes to speedup searches in the mtokens
      function handleMatch(match, loopNdx, quantifierRecurse) {
        function isFirstMatch(latestMatch, tokenGroup) {
          let firstMatch = tokenGroup.matches.indexOf(latestMatch) === 0;
          if (!firstMatch) {
            tokenGroup.matches.every(function (match, ndx) {
              if (match.isQuantifier === true) {
                firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);
              } else if (Object.prototype.hasOwnProperty.call(match, "matches")) {
                firstMatch = isFirstMatch(latestMatch, match);
              }
              if (firstMatch) {
                if (tokenGroup.matches[ndx + 1] && tokenGroup.matches[ndx + 1].isQuantifier) {
                  firstMatch = ndx === 0;
                }
                return false;
              }
              return true;
            });
          }
          return firstMatch;
        }

        // A group whose first element is itself a quantified group (e.g. the
        // "(\\d{2})" in "(\\d{2})?") re-enters the same match object on every
        // repetition of the inner quantifier, so isFirstMatch keeps reporting
        // true. The optional stop is inserted only on the first repetition of a
        // nested quantifier ~ otherwise it lands one repetition too early and the
        // template loses the still required positions (see #2226).
        // It mirrors the optionality level of optionals, but for quantifiers: the
        // repetition index of the innermost quantifier.
        function isNestedQuantifierContinuation(latestMatchEntry) {
          return latestMatchEntry.quantifierNdx > 0 && latestMatchEntry.quantifierDepth > quantifierStack.length + 1;
        }
        function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
          let bestMatch,
            distance,
            locator,
            newAlternateMloc,
            alternateMloc = `${alternateNdx}:${targetAlternation}`;
          if (maskset.tests[pos] || maskset.validPositions[pos]) {
            (maskset.validPositions[pos] ? [maskset.validPositions[pos]] : maskset.tests[pos]).every(function (lmnt, ndx) {
              if (lmnt.mloc[alternateMloc]) {
                bestMatch = lmnt;
                return false; // break
              }

              // check if an entry in mloc match the alternateNdx on targetAlternation
              const mlocMatches = Object.values(lmnt.mloc).filter(
              // eslint-disable-next-line eqeqeq
              m => m[targetAlternation] == alternateNdx);
              // for each mlocMatch check the calculated distance
              mlocMatches.every(mlocMatch => {
                let mlocMatchL = mlocMatch.join("").split(":")[0]; // strip off alternation marker
                locator = locator || mlocMatchL;
                while (mlocMatchL.length < locator.length) mlocMatchL += "0";
                const mlocDistance = Number(mlocMatchL);
                // console.log("mlocDistance", mlocDistance);
                if (bestMatch === undefined || mlocDistance < distance) {
                  distance = mlocDistance;
                  bestMatch = lmnt;

                  // key from mlocMatch
                  newAlternateMloc = Object.entries(lmnt.mloc).find(entry => entry[1].toString() === mlocMatch.toString())[0];
                }
                return true; // continue
              });
              return true;
            });
          }
          if (bestMatch) {
            if (targetAlternation === undefined) {
              alternateMloc = `${alternateNdx}:${bestMatch.alternation}`;
            }
            const bestMatchAltIndex = `${bestMatch.locator[bestMatch.alternation]}:${bestMatch.alternation}`,
              slocator = bestMatch.mloc[newAlternateMloc || alternateMloc] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
            if (slocator[slocator.length - 1].toString().indexOf(":") !== -1) {
              // eslint-disable-next-line no-unused-vars
              slocator.pop();
              // targetAlternation = parseInt(alternation.substring(1));
            }
            const sliceStart = parseInt(
            // newAlternateMloc
            //   ? newAlternateMloc.split(":")[1]
            //   : targetAlternation ||
            bestMatch.alternation) + 1;

            // console.log(
            //   "resolveNdxInitializer",
            //   pos,
            //   alternateNdx,
            //   targetAlternation,
            //   slocator,
            //   sliceStart,
            //   bestMatch
            // );

            return slocator.slice(sliceStart);
          } else {
            return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
          }
        }
        function staticCanMatchDefinition(source, target) {
          return source.match.static === true && target.match.static !== true ? target.match.fn.test(source.match.def, maskset, pos, false, opts, false) : false;
        }

        // mergelocators for retrieving the correct locator match when merging
        function setMergeLocators(targetMatch, altMatch) {
          function mergeLoc(altNdx) {
            targetMatch.mloc = targetMatch.mloc || {};
            let locNdx = targetMatch.locator[altNdx];
            if (locNdx === undefined) {
              targetMatch.alternation = undefined;
            } else {
              if (altMatch === undefined) {
                if (typeof locNdx === "string") locNdx = locNdx.split(",")[0];
                locNdx = `${locNdx}:${altNdx}`;
                if (targetMatch.mloc[locNdx] === undefined) {
                  targetMatch.mloc[locNdx] = targetMatch.locator.slice();
                  targetMatch.mloc[locNdx].push(`:${altNdx}`); // add alternation index
                }
              } else {
                let offset = 0;
                for (const ndx in altMatch.mloc) {
                  // if (typeof ndx === "string") ndx = parseInt(ndx.split(",")[0]);
                  if (targetMatch.mloc[ndx] === undefined) {
                    targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                  } else {
                    do {
                      if (targetMatch.mloc[ndx + offset] === undefined) {
                        targetMatch.mloc[ndx + offset] = altMatch.mloc[ndx];
                        break;
                      }
                    } while (targetMatch.mloc[ndx + offset++] !== undefined);
                  }
                }
                targetMatch.locator = mergeLocators(testPos, [targetMatch, altMatch]);
              }
              if (targetMatch.alternation > altNdx) {
                // if the alternation index is higher than the current one resolve it to the alternation
                targetMatch.alternation = altNdx;
              }
              return true;
            }
            return false;
          }
          let alternationNdx = targetMatch.alternation,
            shouldMerge = altMatch === undefined || alternationNdx <= altMatch.alternation && targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]) === -1;
          if (!shouldMerge && alternationNdx > altMatch.alternation) {
            for (let i = 0; i < alternationNdx; i++) {
              if (targetMatch.locator[i] !== altMatch.locator[i]) {
                alternationNdx = i;
                shouldMerge = true;
                break;
              }
            }
          }
          if (shouldMerge) {
            return mergeLoc(alternationNdx);
          }
          return false;
        }
        function handleGroup() {
          match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse);
          if (match) return true;
        }
        function handleOptional() {
          const optionalToken = match,
            mtchsNdx = matches.length;
          match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
          if (matches.length > 0) {
            // check on matches.length instead of match to handle quantifier in a recursive call
            // mark optionality in matches
            matches.forEach(function (mtch, ndx) {
              if (ndx >= mtchsNdx) {
                mtch.match.optionality = mtch.match.optionality ? mtch.match.optionality + 1 : 1;
              }
            });
            latestMatchEntry = matches[matches.length - 1];
            if (quantifierRecurse === undefined && isFirstMatch(latestMatchEntry.match, optionalToken)) {
              // prevent loop see #698
              insertStop = true; // insert a stop
              testPos = pos; // match the position after the group
            } else {
              return match; // make the loop continue when it is deliberately by a quantifier
            }
          }
        }
        function handleAlternator() {
          function calculateMatchesLength(matches) {
            let matchesLength = 0;
            for (let ndx = 0; ndx < matches.length; ndx++) {
              const match = matches[ndx];
              if (match.isQuantifier && !isNaN(match.quantifier.max)) {
                matchesLength += match.quantifier.max;
              } else {
                matchesLength++;
              }
            }
            return matchesLength;
          }
          function isUnmatchedAlternation(alternateToken) {
            const matchesLength = alternateToken.matches[0].matches ? calculateMatchesLength(alternateToken.matches[0].matches) : 1;
            let matchesNewLength;
            for (let alndx = 0; alndx < alternateToken.matches.length; alndx++) {
              matchesNewLength = alternateToken.matches[alndx].matches ? calculateMatchesLength(alternateToken.matches[alndx].matches) : 1;
              if (matchesLength !== matchesNewLength) {
                break;
              }
            }
            return matchesLength !== matchesNewLength;
          }
          inputmask.hasAlternator = true;
          const alternateToken = match,
            malternateMatches = [],
            currentMatches = matches.slice(),
            loopNdxCnt = loopNdx.length,
            altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
          let maltMatches;
          if (altIndex === -1 || typeof altIndex === "string") {
            const currentPos = testPos,
              ndxInitializerClone = ndxInitializer.slice();
            let altIndexArr = [],
              amndx;
            if (typeof altIndex === "string") {
              altIndexArr = altIndex.split(",");
            } else {
              for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                altIndexArr.push(amndx.toString());
              }
            }
            if (maskset.excludes[pos] !== undefined) {
              const altIndexArrClone = altIndexArr.slice();
              for (let i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
                const excludeSet = maskset.excludes[pos][i].toString().split(":");
                if (loopNdx.length === Number(excludeSet[1])) {
                  altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
                }
              }
              if (altIndexArr.length === 0) {
                // fully alternated => reset
                delete maskset.excludes[pos];
                altIndexArr = altIndexArrClone;
              }
            }
            if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) altIndexArr = altIndexArr.slice(0, 1);
            for (let ndx = 0; ndx < altIndexArr.length; ndx++) {
              amndx = parseInt(altIndexArr[ndx]);
              matches = [];
              // set the correct ndxInitializer
              ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
              // console.log("ndxInit", ndxInitializer);
              const tokenMatch = alternateToken.matches[amndx];
              if (tokenMatch && handleMatch(tokenMatch, [amndx].concat(loopNdx), quantifierRecurse)) {
                match = true;
              } else {
                // if (currentPos !== 0) {
                // only check with the first alternate
                unMatchedAlternation = isUnmatchedAlternation(alternateToken);
                // }
                if (tokenMatch && tokenMatch.matches && tokenMatch.matches.length > alternateToken.matches[0].matches.length) {
                  break;
                }
              }
              maltMatches = matches.slice();
              testPos = currentPos;
              matches = [];

              // fuzzy merge matches
              for (let ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                const altMatch = maltMatches[ndx1];
                let dropMatch = false;
                altMatch.alternation = altMatch.alternation || loopNdxCnt;
                setMergeLocators(altMatch);
                for (let ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                  const altMatch2 = malternateMatches[ndx2];
                  if (typeof altIndex !== "string" || altMatch.alternation !== undefined && altIndex.indexOf(altMatch.locator[altMatch.alternation].toString()) !== -1) {
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
                      if (setMergeLocators(altMatch, altMatch2)) {
                        // insert match above general match
                        dropMatch = true;
                        malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                      }
                      break;
                    } else if (staticCanMatchDefinition(altMatch2, altMatch)) {
                      setMergeLocators(altMatch2, altMatch);
                      // hackery to solve a mask like ([0]9)|(2a) ~ note the static 0 is optional ~ see unittest ivaninDarpatov
                      // this needs a better solution, but his will do for now
                      if (altMatch2.match.optionality && inputmask.userOptions.keepStatic === undefined) {
                        opts.keepStatic = currentPos;
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
            insertStop = insertStop || matches.length > 0 && unMatchedAlternation; // insert a stopelemnt when there is an alternate - needed for non-greedy option
            if (!unMatchedAlternation && insertStop) insertStopFromAlternation = true; // track insertStop set inside a symmetric alternation
            match = malternateMatches.length > 0 && !unMatchedAlternation; // set correct match state

            if (unMatchedAlternation && insertStop && !match) {
              // mark matches with unMatchedAlternationStopped
              matches.forEach(function (mtch, ndx) {
                mtch.unMatchedAlternationStopped = true;
              });
            }

            // cloneback
            ndxInitializer = ndxInitializerClone.slice();
          } else {
            match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
          }
          if (match) {
            return true;
          }
        }
        function handleQuantifier() {
          const qt = match,
            // the tokengroup is fixed over the whole quantifierloop
            tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
          let breakloop = false;
          for (let qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
            quantifierStack.push(qndx);
            match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); // set the tokenGroup as quantifierRecurse marker
            quantifierStack.pop();
            if (match) {
              matches.forEach(function (mtch, ndx) {
                if (IsMatchOf(tokenGroup, mtch.match)) {
                  latestMatchEntry = mtch;
                } else {
                  latestMatchEntry = matches[matches.length - 1];
                }

                // mark optionality
                latestMatchEntry.match.optionalQuantifier = qndx >= qt.quantifier.min;
                // console.log(pos + " " + qt.quantifier.min + " " + latestMatchEntry.match.optionalQuantifier);
                // qndx + 1 as the index starts from 0
                latestMatchEntry.match.jit = (qndx + 1) * (tokenGroup.matches.indexOf(latestMatchEntry.match) + 1) > qt.quantifier.jit;
                if ((latestMatchEntry.match.optionalQuantifier || latestMatchEntry.match.optionality) && isFirstMatch(latestMatchEntry.match, tokenGroup) && !isNestedQuantifierContinuation(latestMatchEntry)) {
                  insertStop = true;
                  testPos = pos; // match the position after the group
                  if (opts.greedy && maskset.validPositions[pos - 1] === undefined && qndx > qt.quantifier.min && ["*", "+"].indexOf(qt.quantifier.max) !== -1) {
                    matches.pop();
                    cacheDependency = undefined;
                  }
                  breakloop = true; // stop quantifierloop && search for next possible match
                  match = false; // mark match to false to make sure the loop in optionals continues
                }
                if (!breakloop && latestMatchEntry.match.jit) {
                  // always set jitOffset, isvalid checks when to apply
                  maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatchEntry.match);
                }
              });
              if (breakloop) break; // search for next possible match
              return true;
            }
          }
        }
        if (testPos > pos + opts._maxTestPos) {
          throw new Error(`Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. ${maskset.mask}`);
        }
        if (testPos === pos && match.matches === undefined) {
          matches.push({
            match,
            locator: loopNdx.reverse(),
            cd: cacheDependency,
            mloc: {},
            quantifierNdx: quantifierStack.length ? quantifierStack[quantifierStack.length - 1] : 0,
            quantifierDepth: quantifierStack.length
          });
          if (match.optionality && quantifierRecurse === undefined && (opts.definitions && opts.definitions[match.nativeDef] && opts.definitions[match.nativeDef].optional || definitions$1[match.nativeDef] && definitions$1[match.nativeDef].optional)) {
            // prevent loop see #698
            insertStop = true; // insert a stop
            testPos = pos; // match the position after the group
          } else {
            return true;
          }
        } else if (match.matches !== undefined) {
          if (match.isGroup && quantifierRecurse !== match) {
            // when a group pass along to the quantifier
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

      // the offset is set in the quantifierloop when git masking is used
      for (let tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) {
        if (maskToken.matches[tndx].isQuantifier !== true) {
          const match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
          if (match && testPos === pos) {
            return match;
          } else if (testPos > pos) {
            break;
          }
        }
      }
    }
    function IsMatchOf(tokenGroup, match) {
      const mtchs = tokenGroup.matches;
      if (mtchs.indexOf(match) !== -1) return true;
      for (let ndx = 0; ndx < mtchs.length; ndx++) {
        if (mtchs[ndx].matches !== undefined && IsMatchOf(mtchs[ndx], match)) {
          return true;
        }
      }
      return false;
    }
    function mergeLocators(pos, tests) {
      let locator = [];
      if (!Array.isArray(tests)) tests = [tests];
      if (tests.length > 0) {
        if (tests[0].alternation === undefined || opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && pos >= opts.keepStatic) {
          // A single test is always returned by determineTestTemplate, so skip the
          // selection walk and read its locator directly.
          if (tests.length === 1) return tests[0].locator.slice();
          locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice();
          if (locator.length === 0) locator = tests[0].locator.slice();
        } else {
          // alternation = tests[0].locator.length - 1;
          tests.forEach(mtch => {
            Object.values(mtch.mloc).forEach(mloc => {
              mloc.forEach((loc, locNdx) => {
                // if (locNdx > alternation) return;
                const mergedPos = locator[locNdx];
                if (loc.toString().includes(":") || mergedPos && mergedPos.toString().includes(":")) return;
                if (mergedPos === undefined) {
                  locator[locNdx] = loc;
                } else if (!mergedPos.toString().includes(loc)) {
                  locator[locNdx] = locator[locNdx] + "," + loc;
                }
              });
            });
          });
        }
      }
      // console.log("mergeLocators", pos, tests, locator);
      return locator;
    }
    if (pos > -1) {
      if (ndxIntlzr === undefined) {
        // determine index initializer
        let previousPos = pos - 1,
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
        // cacheDependency is set on all tests, just check on the first
        return maskset.tests[pos];
      }
      for (let mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
        const match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
        if (match && testPos === pos || testPos > pos) {
          break;
        }
      }
    }
    if (matches.length === 0 || insertStop) {
      matches.push({
        match: {
          fn: null,
          static: true,
          optionality: false,
          casing: null,
          def: "",
          placeholder: ""
        },
        // mark when there are unmatched alternations  ex: mask: "(a|aa)"
        // this will result in the least distance to select the correct test result in determineTestTemplate
        locator: unMatchedAlternation && matches.filter(tst => tst.unMatchedAlternationStopped !== true).length === 0 ? [0] : insertStopFromAlternation && matches.length > 0 && matches.filter(tst => !tst.match.static).every(tst => tst.match.optionalQuantifier) ? [0] : [],
        mloc: {},
        cd: cacheDependency
      });
    }
    let result;
    if (ndxIntlzr !== undefined && maskset.tests[pos]) {
      // prioritize full tests for caching
      result = $.extend(true, [], matches);
    } else {
      // console.log("stored " + pos + " - " + JSON.stringify(matches));
      maskset.tests[pos] = $.extend(true, [], matches); // set a clone to prevent overwriting some props
      result = maskset.tests[pos];
    }

    // console.log(pos, JSON.stringify(matches));
    // cleanup optionality marking
    matches.forEach(t => {
      t.match.optionality = t.match.defOptionality || false;
    });
    return result;
  }

  // tobe put on prototype?
  function seekNext(pos, newBlock, fuzzy) {
    const inputmask = this;
    if (fuzzy === undefined) fuzzy = true;
    let position = pos + 1;
    while (getTest.call(inputmask, position).match.def !== "" && (newBlock === true && (getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true)) || newBlock !== true && !isMask.call(inputmask, position, undefined, fuzzy))) {
      position++;
    }
    return position;
  }

  // tobe put on prototype?
  function seekPrevious(pos, newBlock) {
    const inputmask = this;
    let position = pos - 1;
    if (pos <= 0) return 0;
    while (position > 0 && (newBlock === true && (getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true)) || newBlock !== true && !isMask.call(inputmask, position, undefined, true))) {
      position--;
    }
    return position;
  }

  // tobe put on prototype?
  function isMask(pos, strict, fuzzy) {
    const inputmask = this,
      maskset = this.maskset;
    let test = getTestTemplate.call(inputmask, pos).match;
    if (test.def === "") test = getTest.call(inputmask, pos).match;
    if (test.static !== true) {
      return test.fn;
    }
    if (fuzzy === true && maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].generatedInput !== true) {
      return true;
    }
    if (strict !== true && pos > -1) {
      if (fuzzy) {
        // check on the number of tests
        const tests = getTests.call(inputmask, pos);
        return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
      }
      // else based on the template
      const testTemplate = determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos)),
        testPlaceHolder = getPlaceholder.call(inputmask, pos, testTemplate.match);
      return testTemplate.match.def !== testPlaceHolder;
    }
    return false;
  }

  // tobe put on prototype?
  function caret(input, begin, end, notranslate, isDelete) {
    const inputmask = this,
      opts = this.opts;
    let range;
    if (begin !== undefined) {
      if (Array.isArray(begin)) {
        end = inputmask.isRTL ? begin[0] : begin[1];
        begin = inputmask.isRTL ? begin[1] : begin[0];
      }
      if (begin.begin !== undefined) {
        end = inputmask.isRTL ? begin.begin : begin.end;
        begin = inputmask.isRTL ? begin.end : begin.begin;
      }
      if (isDelete && begin !== end && end !== undefined) {
        if (begin < end) end = begin;else begin = end;
      }
      if (typeof begin === "number") {
        begin = notranslate ? begin : translatePosition.call(inputmask, begin);
        end = notranslate ? end : translatePosition.call(inputmask, end);
        end = typeof end === "number" ? end : begin;
        // if (!$(input).is(":visible")) {
        // 	return;
        // }

        inputmask.caretPos = {
          begin,
          end
        }; // track caret internally
        if (input && input.inputmask) {
          input.inputmask.caretPos = {
            begin,
            end
          };
        }
        const isDOM = !!(input && input.nodeName && input.ownerDocument);
        if (isDOM) {
          const scrollCalc = parseInt((input.ownerDocument.defaultView || window$1).getComputedStyle(input, null).fontSize) * end;
          input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
          if (opts.insertModeVisual && opts.insertMode === false && begin === end) {
            if (!isDelete) {
              end++; // set visualization for insert/overwrite mode
            }
          }
          if (input === input.getRootNode().activeElement) {
            if ("setSelectionRange" in input) {
              input.setSelectionRange(begin, end);
            } else if (window$1.getSelection) {
              range = document.createRange();
              if (input.firstChild === undefined || input.firstChild === null) {
                const textNode = document.createTextNode("");
                input.appendChild(textNode);
              }
              range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
              range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
              range.collapse(true);
              const sel = window$1.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
              // input.focus();
            } else if (input.createTextRange) {
              range = input.createTextRange();
              range.collapse(true);
              range.moveEnd("character", end);
              range.moveStart("character", begin);
              range.select();
            }
            input.inputmask.caretHook === undefined || input.inputmask.caretHook.call(inputmask, {
              begin,
              end
            });
          }
        } else {
          if (opts.insertModeVisual && opts.insertMode === false && begin === end) {
            if (!isDelete) {
              end++; // set visualization for insert/overwrite mode
            }
          }
          inputmask.caretHook === undefined || inputmask.caretHook({
            begin,
            end
          });
        }
      }
    } else {
      const isDOM = !!(input && input.nodeName);
      if (isDOM && "selectionStart" in input && "selectionEnd" in input) {
        begin = input.selectionStart;
        end = input.selectionEnd;
      } else if (isDOM && window$1.getSelection) {
        range = window$1.getSelection().getRangeAt(0);
        if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
          begin = range.startOffset;
          end = range.endOffset;
        }
      } else if (isDOM && document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        begin = 0 - range.duplicate().moveStart("character", -(input && input.inputmask ? input.inputmask._valueGet().length : inputmask._valueGet().length));
        end = begin + range.text.length;
      } else {
        const caretPos = input && input.inputmask && input.inputmask.caretPos || inputmask.caretPos || {
          begin: 0,
          end: 0
        };
        begin = caretPos.begin ?? 0;
        end = caretPos.end ?? begin;
      }

      // if (opts.insertModeVisual && opts.insertMode === false && begin === (end - 1)) end--; //correct caret for insert/overwrite mode

      return {
        begin: notranslate ? begin : translatePosition.call(inputmask, begin),
        end: notranslate ? end : translatePosition.call(inputmask, end)
      };
    }
  }

  // tobe put on prototype?
  function checkAlternationMatch(altArr1, altArr2, na) {
    const opts = this.opts,
      altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
      naArr = na !== undefined ? na.split(",") : [];
    let isMatch = false,
      naNdx;

    // remove no alternate indexes from alternation array
    for (let i = 0; i < naArr.length; i++) {
      if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
        altArr1.splice(naNdx, 1);
      }
    }
    for (let alndx = 0; alndx < altArr1.length; alndx++) {
      if (altArrC.includes(altArr1[alndx])) {
        isMatch = true;
        break;
      }
    }
    return isMatch;
  }

  // tobe put on prototype?
  function determineLastRequiredPosition(returnDefinition) {
    const inputmask = this,
      {
        maskset,
        dependencyLib: $
      } = inputmask,
      lvp = getLastValidPosition.call(inputmask),
      positions = {},
      lvTest = maskset.validPositions[lvp],
      buffer = getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true, true);
    let bl = buffer.length,
      pos,
      ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
      testPos;
    for (pos = lvp + 1; pos < buffer.length; pos++) {
      testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
      ndxIntlzr = testPos.locator.slice();
      positions[pos] = $.extend(true, {}, testPos);
    }
    const lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined,
      // the optionality level of the last valid position
      lvOptionality = lvTest !== undefined ? lvTest.match.optionality || 0 : 0;
    for (pos = bl - 1; pos > lvp; pos--) {
      testPos = positions[pos];
      if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.static !== true || testPos.match.static === true && testPos.locator[lvTest.alternation] && checkAlternationMatch.call(inputmask, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && getTests.call(inputmask, pos)[0].def !== "")) && buffer[pos] === getPlaceholder.call(inputmask, pos, testPos.match)) {
        // only optional positions in a deeper optional block than the last valid
        // position can be trimmed ~ an optional block that is entered is required
        if (testPos.match.optionality - lvOptionality < 1) {
          break;
        }
        bl--;
        if (testPos.match.optionality) {
          // find the last position that is not optional ~ isoptional and newblockmarker == "master"
          let prevPos = pos;
          while (prevPos > 0) {
            const test = getTest.call(inputmask, prevPos);
            if (test.match.newBlockMarker === "master" || test.match.newBlockMarker === true) {
              break;
            }
            prevPos--;
          }
          if (maskset.validPositions[prevPos] !== undefined) {
            break;
          }
        }
      } else {
        break;
      }
    }

    // no extra required positions
    if (pos === lvp) {
      bl = pos;
    }
    return returnDefinition ? {
      l: bl,
      def: positions[bl] ? positions[bl].match : undefined,
      lvOptionality
    } : bl;
  }

  // tobe put on prototype?
  function determineNewCaretPosition(selectedCaret, tabbed, positionCaretOnClick) {
    const inputmask = this,
      {
        maskset,
        opts
      } = inputmask;
    let clickPosition, lvclickPosition, lastPosition;
    function doRadixFocus(clickPos) {
      if (opts.radixPoint !== "" && opts.digits !== 0) {
        const vps = maskset.validPositions;
        if (vps[clickPos] === undefined || vps[clickPos].input === undefined) {
          if (clickPos < seekNext.call(inputmask, -1)) return true;
          const radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
          if (radixPos !== -1) {
            for (const vp in vps) {
              const pos = Number(vp);
              if (radixPos < pos && vps[vp] !== undefined && vps[vp].input !== getPlaceholder.call(inputmask, pos)) {
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
          if (inputmask.clicked > 1 && maskset.validPositions.length === 0) break;
          if (doRadixFocus(selectedCaret.begin)) {
            const radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
            selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
            break;
          } else if (inputmask.clicked > 0 &&
          // only react to a click, not to checkVal /
          // key handling which also come through here
          inputmask.isRTL // the buffer coordinates below assume a reversed
          ) {
            const buffer = getBuffer.call(inputmask).join(""),
              suffixReversed = opts.suffix.split("").reverse().join(""),
              suffixPos = buffer.indexOf(suffixReversed),
              newClickPosition = suffixPos + opts.suffix.length;
            if (newClickPosition > selectedCaret.begin) selectedCaret.end = selectedCaret.begin = newClickPosition;
            break;
          }
        // fallback to lvp
        // eslint-disable-next-line no-fallthrough
        default:
          // lvp:
          clickPosition = selectedCaret.begin;
          lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, true);
          lastPosition = seekNext.call(inputmask, lvclickPosition === -1 && !isMask.call(inputmask, 0) ? -1 : lvclickPosition);
          if (clickPosition <= lastPosition) {
            selectedCaret.end = selectedCaret.begin = !isMask.call(inputmask, clickPosition, false, true) ? seekNext.call(inputmask, clickPosition) : clickPosition;
          } else {
            const lvp = maskset.validPositions[lvclickPosition],
              tt = getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : undefined, lvp),
              placeholder = getPlaceholder.call(inputmask, lastPosition, tt.match);
            if (placeholder !== "" && getBuffer.call(inputmask)[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true || !isMask.call(inputmask, lastPosition, opts.keepStatic, true) && tt.match.def === placeholder) {
              const newPos = seekNext.call(inputmask, lastPosition);
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

  // tobe put on prototype?
  function getBuffer(noCache) {
    const inputmask = this,
      {
        maskset
      } = inputmask;
    if (maskset.buffer === undefined || noCache === true) {
      maskset.buffer = getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true);
      if (maskset._buffer === undefined) maskset._buffer = maskset.buffer.slice();
    }
    return maskset.buffer;
  }

  // tobe put on prototype?
  function getBufferTemplate() {
    const inputmask = this,
      maskset = this.maskset;
    if (maskset._buffer === undefined) {
      // generate template
      maskset._buffer = getMaskTemplate.call(inputmask, false, 1);
      if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
    }
    return maskset._buffer;
  }

  // soft ~ undefined reset validpositions; soft = false also reset tests; soft = true only reset the maskset
  function resetMaskSet(soft) {
    const maskset = this.maskset;
    maskset.buffer = undefined;
    if (soft !== true) {
      maskset.validPositions = [];
      maskset.p = 0;
    }
    if (soft === false) {
      maskset.tests = {};
      maskset.jitOffset = {};
    }
  }
  function translatePosition(pos) {
    const inputmask = this,
      opts = this.opts,
      el = this.el;
    if (inputmask.isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
      pos = inputmask._valueGet().length - pos;
      if (pos < 0) pos = 0;
    }
    return pos;
  }

  // tobe put on prototype?
  function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
    // pos == true => generalize
    const inputmask = this,
      $ = this.dependencyLib,
      opts = this.opts,
      maskset = inputmask.maskset;
    if (!inputmask.hasAlternator) return false;
    const validPsClone = maskset.validPositions.slice(),
      tstClone = $.extend(true, {}, maskset.tests);
    let lastAlt,
      alternation,
      isValidRslt = false,
      returnRslt = false,
      altPos,
      prevAltPos,
      i,
      validPos,
      decisionPos,
      lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition.call(inputmask),
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
      // do not recurse when already passed the beginning
      lastAlt = 0;
      prevAltPos = getTest.call(inputmask, lastAlt);
      alternation = prevAltPos.alternation;
    } else {
      // find last modified alternation
      for (; lAltPos >= 0; lAltPos--) {
        altPos = lAltPos === 0 ? getTest.call(inputmask, 0) : maskset.validPositions[lAltPos];
        if (altPos && altPos.alternation !== undefined) {
          if (lAltPos <= (maskPos || 0) && prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
            break;
          }
          lastAlt = lAltPos;
          alternation = altPos.alternation;
          prevAltPos = altPos;
        }
      }
    }
    if (alternation !== undefined) {
      decisionPos = parseInt(lastAlt);
      maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [];
      // generalize
      if (maskPos !== true) {
        maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos) + ":" + prevAltPos.alternation);
      }
      const validInputs = [];
      let resultPos = -1;
      for (i = decisionPos; decisionPos < getLastValidPosition.call(inputmask, undefined, true) + 1; i++) {
        if (resultPos === -1 && maskPos <= i && c !== undefined) {
          validInputs.push(c);
          resultPos = validInputs.length - 1;
        }
        validPos = maskset.validPositions[decisionPos];
        if (validPos && validPos.generatedInput !== true && (decisionPos !== 0 || validPos.input !== opts.skipOptionalPartCharacter) && (selection === undefined || i < begin || i >= end)) {
          validInputs.push(validPos.input);
        }
        // delete maskset.validPositions[i++];
        maskset.validPositions.splice(decisionPos, 1);
      }
      if (resultPos === -1 && c !== undefined) {
        validInputs.push(c);
        resultPos = validInputs.length - 1;
      }
      while (maskset.excludes[decisionPos] !== undefined && maskset.excludes[decisionPos].length < 10) {
        // maskset.tests[decisionPos] = undefined; //clear decisionPos
        maskset.tests = {}; // clear all
        resetMaskSet.call(inputmask, true); // clear getbuffer
        isValidRslt = true;
        nextPos = decisionPos - 1;
        const targetTemplate = getMaskTemplate.call(inputmask, true, 0);
        for (i = 0; i < validInputs.length; i++) {
          input = validInputs[i];
          if (targetTemplate[nextPos + 1] === input && opts.numericInput !== true) {
            nextPos++;
          } else if (nextPos === -1 && i === 0 && opts.digitsOptional === false) {
            nextPos = determineNewCaretPosition.call(inputmask, {
              begin: nextPos,
              end: nextPos
            }, false, opts.positionCaretOnClick).begin;

            // console.log("nextPos " + nextPos);
          } else if (i === 0 || returnRslt.caretPos !== undefined || opts.insertMode === false) {
            nextPos = seekNext.call(inputmask, nextPos);
          } else {
            nextPos = getLastValidPosition.call(inputmask, nextPos, true) + 1;
          }

          // nextPos = translatePosition.call(inputmask, nextPos);
          if (!(isValidRslt = isValid.call(inputmask, nextPos, input, false, fromIsValid, validInputs.length - i))) {
            // if (isComplete.call(inputmask, getBuffer.call(inputmask))) {
            // isValidRslt = returnRslt; // keep previous result if any
            // }
            break;
          }
          // With numericInput, isValid can seat the input past the position we
          // offered - the first position is static when there is a suffix, and
          // there is the radix dance - so continue from the position it reports
          // rather than from the guess, or the next input is inserted in front
          // of this one instead of after it. Without it the offered position
          // stands, because the reported one is not always where the input was
          // seated: a datetime correction reports the position after the field
          // it corrected.
          if (opts.numericInput && isValidRslt.pos !== undefined) {
            nextPos = isValidRslt.pos;
          }
          if (i === resultPos) {
            returnRslt = isValidRslt;
          }
          if (maskPos === true && isValidRslt) {
            // return validposition on generalise
            returnRslt = {
              caretPos: i
            };
          }
        }
        if (!isValidRslt) {
          resetMaskSet.call(inputmask);
          prevAltPos = getTest.call(inputmask, decisionPos); // get the current decisionPos to exclude ~ needs to be before restoring the initial validation
          // reset & revert (copy: execution continues and mutates the live array below)
          maskset.validPositions = validPsClone.slice();
          maskset.tests = $.extend(true, {}, tstClone); // refresh tests after possible alternating
          returnRslt = false;
          if (maskset.excludes[decisionPos]) {
            if (prevAltPos.alternation != null) {
              const decisionTaker = getDecisionTaker(prevAltPos);
              if (maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation) !== -1) {
                returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                break;
              }
              maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation);
              for (i = decisionPos; i < getLastValidPosition.call(inputmask, undefined, true) + 1; i++) maskset.validPositions.splice(decisionPos);
            } else delete maskset.excludes[decisionPos];
          } else {
            // latest alternation
            returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
            break;
          }
        } else {
          break;
        }
      }
    }

    // reset alternation excludes
    if (!returnRslt || opts.keepStatic !== false) {
      delete maskset.excludes[decisionPos];
    }
    if (!returnRslt) {
      maskset.validPositions = validPsClone;
      maskset.tests = $.extend(true, {}, tstClone); // refresh tests after possible alternating
    }
    return returnRslt;
  }

  // tobe put on prototype?
  function handleRemove(input, c, pos, strict, fromIsValid) {
    const inputmask = this,
      maskset = this.maskset,
      opts = this.opts;
    if (opts.numericInput || inputmask.isRTL) {
      if (c === keys.Backspace) {
        c = keys.Delete;
      } else if (c === keys.Delete) {
        c = keys.Backspace;
      }
      if (inputmask.isRTL) {
        const pend = pos.end;
        pos.end = pos.begin;
        pos.begin = pend;
      }
    }
    if (opts.numericInput && c === keys.Backspace && pos.begin === 0 && pos.end === 0 && isMask.call(inputmask, 0, true, true)) {
      pos.end = 1;
    }
    const lvp = getLastValidPosition.call(inputmask, undefined, true);
    if (pos.end >= getBuffer.call(inputmask).length && lvp >= pos.end) {
      // handle numeric negate symbol offset, due to  dynamic jit masking
      pos.end = lvp + 1;
    }
    if (c === keys.Backspace) {
      if (pos.end - pos.begin < 1) {
        pos.begin = seekPrevious.call(inputmask, pos.begin);
      }
    } else if (c === keys.Delete) {
      if (pos.begin === pos.end) {
        pos.end = isMask.call(inputmask, pos.end, true, true) ? pos.end + 1 : seekNext.call(inputmask, pos.end) + 1;
      }
    }
    let offset;
    if ((offset = revalidateMask.call(inputmask, pos)) !== false) {
      if (strict !== true && opts.keepStatic !== false || opts.regex !== null && getTest.call(inputmask, pos.begin).match.def.indexOf("|") !== -1) {
        // TODO NEEDS BETTER CHECK WHEN TO ALTERNATE  ~ opts regex isn"t good enough
        alternate.call(inputmask, true);
      }
      if (getLastValidPosition.call(inputmask) === -1) {
        // full clear: reset the tests cache so dynamic mask definitions
        // (numeric radix/negation) don't leave a stale residue in the template #2890
        resetMaskSet.call(inputmask, false);
      }
      if (strict !== true) {
        pos.begin = c === keys.Delete ? pos.begin + offset : pos.begin;
        maskset.p = determineNewCaretPosition.call(inputmask, {
          begin: pos.begin,
          end: pos.begin
        }, false, opts.insertMode === false && c === keys.Backspace ? "none" : undefined).begin;
      }
    }
  }

  // tobe put on prototype?
  function isComplete(buffer) {
    // return true / false / undefined (repeat *)
    const inputmask = this,
      opts = this.opts,
      maskset = this.maskset;
    if (typeof opts.isComplete === "function") return opts.isComplete(buffer, opts);
    if (opts.repeat === "*") return undefined;
    if (maskset.wholeRegex) {
      // a regex mask is complete when its full-string regex matches the value
      // with placeholder-only positions omitted
      // A regex mask carries the prototype placeholder on its dynamic tests, but a
      // static one has none ~ getPlaceholder hands back its own definition there,
      // which is not what an untouched position shows.
      const phChar = i => typeof opts.placeholder === "string" ? opts.placeholder.charAt(i % opts.placeholder.length) : typeof opts.placeholder === "object" ? getPlaceholder.call(inputmask, i, getTestTemplate.call(inputmask, i).match) : DEFAULT_PLACEHOLDER;
      let filledValue = "";
      for (let i = 0; i < buffer.length; i++) {
        if (maskset.validPositions[i] !== undefined || buffer[i] !== phChar(i)) {
          filledValue += buffer[i];
        }
      }
      return maskset.wholeRegex.test(filledValue);
    }
    let complete = false;
    const lrp = determineLastRequiredPosition.call(inputmask, true),
      aml = lrp.l; // seekPrevious.call(inputmask, lrp.l);

    if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
      complete = true;
      for (let i = 0; i <= aml; i++) {
        const test = getTestTemplate.call(inputmask, i).match;
        if (test.static !== true && maskset.validPositions[i] === undefined && (test.optionality === false || test.optionality === undefined || test.optionality && test.newBlockMarker === false ||
        // an optional position in the same optional block as the last valid
        // position is required ~ the optional block is entered
        test.optionality && test.optionality - lrp.lvOptionality < 1) && (test.optionalQuantifier === false || test.optionalQuantifier === undefined) || test.static === true && test.def !== "" && buffer[i] !== getPlaceholder.call(inputmask, i, test)) {
          complete = false;
          break;
        }
      }
    }
    return complete;
  }
  function isSelection(posObj) {
    const inputmask = this,
      opts = this.opts,
      insertModeOffset = opts.insertMode ? 0 : 1;
    return inputmask.isRTL ? posObj.begin - posObj.end > insertModeOffset : posObj.end - posObj.begin > insertModeOffset;
  }

  // tobe put on prototype?
  function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
    // strict true ~ no correction or autofill
    const inputmask = this,
      $ = this.dependencyLib,
      opts = this.opts,
      maskset = inputmask.maskset;
    strict = strict === true; // always set a value to strict to prevent possible strange behavior in the extensions

    let maskPos = pos;
    if (pos.begin !== undefined) {
      // position was a position object - used to handle a delete by typing over a selection
      maskPos = inputmask.isRTL ? pos.end : pos.begin;
    }
    function processCommandObject(commandObj) {
      if (commandObj !== undefined) {
        if (commandObj.remove !== undefined) {
          // remove position(s)
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
          // insert position(s)
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
          const refresh = commandObj.refreshFromBuffer;
          refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, commandObj.buffer);
          commandObj.refreshFromBuffer = undefined;
        }
        if (commandObj.rewritePosition !== undefined) {
          maskPos = commandObj.rewritePosition;
          // commandObj.rewritePosition = undefined;
          commandObj = true; // see prevalidation in isValid
        }
      }
      return commandObj;
    }
    function _isValid(position, c, strict) {
      let rslt = false;
      getTests.call(inputmask, position).every(function (tst, ndx) {
        const test = tst.match;
        // make sure the buffer is set and correct; a validateOnly mask is one
        // character class at every position, so its tests never read the buffer
        // and the forced refresh is a pure O(n) rebuild per test entry
        if (opts.validateOnly !== true || maskset.positionIndependent !== true) {
          getBuffer.call(inputmask, true);
        }
        if (test.jit && maskset.validPositions[seekPrevious.call(inputmask, position)] === undefined) {
          // ignore if jit is not desirable
          rslt = false;
        } else {
          // return is false or a json object => { pos: ??, c: ??} or true
          if (test.displayChar !== undefined && c === test.displayChar) {
            // display char (re-read from a masked value): restore the native input when available
            const cached = inputmask._displayValueCache ? inputmask._displayValueCache[position] : undefined;
            rslt = {
              c: cached !== undefined && cached.input !== undefined ? cached.input : c,
              pos: position
            };
          } else {
            rslt = test.fn != null ? test.fn.test(c, maskset, position, strict, opts, isSelection.call(inputmask, pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" // non mask
            ? {
              c: getPlaceholder.call(inputmask, position, test, true) || test.def,
              pos: position
            } : false;
          }
        }
        if (rslt !== false) {
          let elem = rslt.c !== undefined ? rslt.c : c,
            validatedPos = position;
          elem = elem === opts.skipOptionalPartCharacter && test.static === true ? getPlaceholder.call(inputmask, position, test, true) || test.def : elem;
          rslt = processCommandObject(rslt);
          if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) {
            // their is a position offset
            validatedPos = rslt.pos;
          }
          if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
            return false; // breakout if nothing to insert
          }
          if (revalidateMask.call(inputmask, pos, $.extend({}, tst, {
            input: casing.call(inputmask, elem, test, validatedPos)
          }), fromIsValid, validatedPos) === false) {
            rslt = false;
          }
          return false; // break from loop
        }
        return true;
      });
      return rslt;
    }
    let result = true;
    const positionsClone = maskset.validPositions.slice(); // snapshot currentPositions (shallow: entries are never mutated in place during a validation pass)

    if (opts.keepStatic === false && maskset.excludes[maskPos] !== undefined && fromAlternate !== true && typeof fromAlternate !== "number" && fromIsValid !== true) {
      for (let i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) {
        if (maskset.excludes[i] !== undefined) {
          maskset.excludes[i] = undefined;
          delete maskset.tests[i];
        }
      }
    }
    if (typeof opts.preValidation === "function" && fromIsValid !== true && validateOnly !== true) {
      result = opts.preValidation.call(inputmask, getBuffer.call(inputmask), maskPos, c, isSelection.call(inputmask, pos), opts, maskset, pos, strict || typeof fromAlternate === "number");
      result = processCommandObject(result);
    }
    if (result === true) {
      // preValidation result
      result = _isValid(maskPos, c, strict);
      if ((!strict || fromIsValid === true) && result === false && validateOnly !== true) {
        const currentPosValid = maskset.validPositions[maskPos];
        if (currentPosValid && currentPosValid.match.static === true && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
          result = {
            caret: seekNext.call(inputmask, maskPos)
          };
        } else {
          if (opts.insertMode || maskset.validPositions[seekNext.call(inputmask, maskPos)] === undefined || pos.end > maskPos) {
            // does the input match on a further position?
            let skip = false;
            if (maskset.jitOffset[maskPos] && maskset.validPositions[seekNext.call(inputmask, maskPos)] === undefined) {
              result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, true, true);
              if (result !== false) {
                if (fromAlternate !== true && typeof fromAlternate !== "number") result.caret = maskPos;
                skip = true;
              }
            }
            if (pos.end > maskPos) {
              maskset.validPositions[maskPos] = undefined;
            }
            if (!skip && !isMask.call(inputmask, maskPos, opts.keepStatic && maskPos === 0)) {
              for (let nPos = maskPos + 1, snPos = seekNext.call(inputmask, maskPos, false, maskPos !== 0); nPos <= snPos; nPos++) {
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
      if (inputmask.hasAlternator && fromAlternate !== true && typeof fromAlternate !== "number" && !strict) {
        fromAlternate = true; // stop possible loop
        if (result === false) {
          // try alternating when the validation fails
          if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && maskPos >= opts.keepStatic) {
            // console.log("alternate 0");
            result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, undefined, pos);
          }
        } else if (result === true) {
          // try alternating when the validation succeeds
          // selection clears an alternated keepstatic mask ~ #2189
          if (isSelection.call(inputmask, pos) && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && opts.keepStatic) {
            // console.log("alternate 1");
            result = alternate.call(inputmask, true) || result;
          }
          // alternate by adding extra input in between
          else if (opts.numericInput !== true && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && getLastValidPosition.call(inputmask, undefined, true) > maskPos) {
            // console.log("alternate 2");
            result = alternate.call(inputmask, true) || result;
          }
        }
      }
      if (result === true) {
        result = {
          pos: maskPos
        };
      }
      if (typeof opts.postValidation === "function" && fromIsValid !== true && validateOnly !== true) {
        const postResult = opts.postValidation.call(inputmask, getBuffer.call(inputmask, true), pos, c, result, opts, maskset, strict, fromCheckval, fromAlternate);
        if (postResult !== undefined) {
          result = postResult === true ? result : postResult;
        }
      }
    }
    if (result && result.pos === undefined) {
      result.pos = maskPos;
    }
    if (result === false || validateOnly === true) {
      resetMaskSet.call(inputmask, true);
      // revert validation changes (copy: processCommandObject below may still mutate the live array)
      maskset.validPositions = positionsClone.slice();
    } else {
      trackbackPositions.call(inputmask, undefined, maskPos, true);
    }
    let endResult = processCommandObject(result);
    // console.log("returned result " + JSON.stringify(endResult));
    if (inputmask.maxLength !== undefined) {
      const buffer = getBuffer.call(inputmask);
      if (buffer.length > inputmask.maxLength && !fromIsValid) {
        resetMaskSet.call(inputmask, true);
        maskset.validPositions = positionsClone; // revert validation changes
        endResult = false;
      }
    }
    return endResult;
  }

  // tobe put on prototype?
  function positionCanMatchDefinition(pos, testDefinition, opts) {
    const inputmask = this,
      maskset = this.maskset;
    let valid = false;
    const tests = getTests.call(inputmask, pos);
    for (let tndx = 0; tndx < tests.length; tndx++) {
      if (tests[tndx].match && (tests[tndx].match.nativeDef === testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] && (!opts.shiftPositions || !testDefinition.match.static) || tests[tndx].match.nativeDef === testDefinition.match.nativeDef || opts.regex && !tests[tndx].match.static && tests[tndx].match.fn.test(testDefinition.input, maskset, pos, false, opts))) {
        valid = true;
        break;
      } else if (tests[tndx].match && tests[tndx].match.def === testDefinition.match.nativeDef) {
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

  // fill in best positions according the current input
  function trackbackPositions(originalPos, newPos, fillOnly) {
    const inputmask = this,
      maskset = this.maskset,
      $ = this.dependencyLib;

    // console.log("trackbackPositions " + originalPos + " " + newPos);
    if (originalPos === undefined) {
      // find previous valid
      for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
        if (maskset.validPositions[originalPos]) break;
      }
    }
    for (let ps = originalPos; ps < newPos; ps++) {
      if (maskset.validPositions[ps] === undefined && !isMask.call(inputmask, ps, false)) {
        const vp = ps === 0 ? getTest.call(inputmask, ps) : maskset.validPositions[ps - 1];
        if (vp) {
          const tests = getTests.call(inputmask, ps).slice();
          if (tests[tests.length - 1].match.def === "") tests.pop();
          let bestMatch = determineTestTemplate.call(inputmask, ps, tests),
            np;
          if (bestMatch && (bestMatch.match.jit !== true || bestMatch.match.newBlockMarker === "master" && (np = maskset.validPositions[ps + 1]) && np.match.optionalQuantifier === true)) {
            bestMatch = $.extend({}, bestMatch, {
              input: getPlaceholder.call(inputmask, ps, bestMatch.match, true) || bestMatch.match.def
            });
            bestMatch.generatedInput = true;
            revalidateMask.call(inputmask, ps, bestMatch, true);
            if (fillOnly !== true) {
              // revalidate the new position to update the locator value
              const cvpInput = maskset.validPositions[newPos].input;
              maskset.validPositions[newPos] = undefined;
              return isValid.call(inputmask, newPos, cvpInput, true, true);
            }
          }
        }
      }
    }
  }

  // tobe put on prototype?
  function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
    // console.log("revalidateMask " + fromIsValid);
    const inputmask = this,
      maskset = this.maskset,
      opts = this.opts,
      $ = this.dependencyLib;
    function IsEnclosedStatic(pos, valids, selection) {
      const posMatch = valids[pos];
      if (posMatch !== undefined && posMatch.match.static === true && posMatch.match.optionality !== true && (valids[0] === undefined || valids[0].alternation === undefined)) {
        const prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match.static === true && valids[pos - 1] : valids[pos - 1],
          nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match.static === true && valids[pos + 1] : valids[pos + 1];
        return prevMatch && nextMatch;
      }
      return false;
    }
    let offset = 0,
      begin = pos.begin !== undefined ? pos.begin : pos,
      end = pos.end !== undefined ? pos.end : pos,
      valid = true;
    if (pos.begin > pos.end) {
      begin = pos.end;
      end = pos.begin;
    }
    validatedPos = validatedPos !== undefined ? validatedPos : begin;
    if (fromIsValid === undefined && (begin !== end || opts.insertMode && maskset.validPositions[validatedPos] !== undefined || validTest === undefined || validTest.match.optionalQuantifier || validTest.match.optionality)) {
      // reposition & revalidate others
      const positionsClone = maskset.validPositions.slice(),
        lvp = getLastValidPosition.call(inputmask, undefined, true);
      let i;
      maskset.p = begin; // needed for alternated position after overtype selection

      const clearpos = isSelection.call(inputmask, pos) ? begin : validatedPos;
      if (lvp >= clearpos) {
        if (validTest === undefined) {
          for (i = lvp; i >= clearpos; i--) delete maskset.tests[i + 1];
        }
        maskset.validPositions.splice(clearpos, lvp - clearpos + 1);
      }
      let j = validatedPos,
        posMatch = j,
        t,
        canMatch,
        test;
      if (validTest) {
        maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
        posMatch++;
        j++;
      }
      let replayStart = validTest ? end : end - 1;
      if (validTest && begin !== end) {
        const jitAnchor = Object.keys(maskset.jitOffset || {}).map(key => parseInt(key, 10)).filter(key => !isNaN(key)).sort((a, b) => a - b)[0];
        if (jitAnchor !== undefined && maskset.jitOffset[jitAnchor] !== undefined) {
          const newReplayStart = end + maskset.jitOffset[jitAnchor];
          for (let i = end; i < newReplayStart; i++) {
            const vp = positionsClone[i];
            if (vp !== undefined) {
              if ((vp.match.def === "+" || vp.match.def === "-") && vp.input !== undefined) {
                replayStart = i + 1;
              }
              break;
            }
          }
        }
      }
      for (i = replayStart; i <= lvp; i++) {
        if ((t = positionsClone[i]) !== undefined && (opts.shiftPositions !== true || t.generatedInput !== true) && (i >= end || i >= begin && IsEnclosedStatic(i, positionsClone, {
          begin,
          end
        }))) {
          while (test = getTest.call(inputmask, posMatch), test.match.def !== "") {
            // loop needed to match further positions
            if ((canMatch = positionCanMatchDefinition.call(inputmask, posMatch, t, opts)) !== false || t.match.def === "+") {
              // validated match //we still need some hackery for the + validator (numeric alias)
              if (t.match.def === "+") getBuffer.call(inputmask, true);
              const result = isValid.call(inputmask, posMatch, t.input, true,
              // t.match.def !== "+",
              true // t.match.def !== "+"
              );
              valid = result !== false;
              j = (result.pos || posMatch) + 1;
              if (!valid && canMatch) break;
            } else {
              valid = false;
            }
            if (valid) {
              if (validTest === undefined && t.match.static && i === pos.begin) offset++;
              break;
            }
            if (!valid && getBuffer.call(inputmask), posMatch > maskset.maskLength) {
              break;
            }
            posMatch++;
          }
          if (getTest.call(inputmask, posMatch).match.def === "") {
            valid = false;
          }
          // restore position
          posMatch = j;
        }
        if (!valid) break;
      }
      if (!valid) {
        maskset.validPositions = positionsClone;
        resetMaskSet.call(inputmask, true);
        return false;
      }
    } else if (validTest && getTest.call(inputmask, validatedPos).match.cd === validTest.match.cd) {
      maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
    }
    resetMaskSet.call(inputmask, true);
    return offset;
  }

  // tobe put on prototype?
  function refreshFromBuffer(start, end, buffer) {
    const inputmask = this,
      maskset = this.maskset,
      opts = this.opts,
      $ = this.dependencyLib;
    // checkVal.call(inputmask, el, false, true, isRTL ? buffer.reverse() : buffer);
    let i, p;
    const skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
      bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer;
    opts.skipOptionalPartCharacter = "";
    if (start === true) {
      resetMaskSet.call(inputmask, false);
      start = 0;
      end = buffer.length;
      p = determineNewCaretPosition.call(inputmask, {
        begin: 0,
        end: 0
      }, false).begin;
    } else {
      for (i = start; i < end; i++) {
        delete maskset.validPositions[i];
      }
      p = start;
    }
    const keypress = new $.Event("keypress");
    for (i = start; i < end; i++) {
      keypress.key = bffr[i].toString();
      inputmask.ignorable = false; // make sure ignorable is ignored ;-)
      const valResult = processKeypress.call(inputmask, keypress, true, false, false, p);
      if (valResult !== false && valResult !== undefined) {
        p = valResult.forwardPosition;
      }
    }
    opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
  }

  // core keystroke evaluation ~ shared by the DOM keypress handler, checkVal and
  // the headless session api. this = inputmask instance
  function processKeypress(e, checkval, writeOut, strict, ndx) {
    const inputmask = this,
      opts = inputmask.opts,
      maskset = inputmask.maskset,
      input = inputmask.el;
    let c = e.key;
    if (c && c.length === 1 && !e.ctrlKey && !e.metaKey) {
      inputmask.ignorable = false;
    }
    if (checkval !== true && !(e.ctrlKey && e.altKey && !inputmask.ignorable) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) {
      return undefined;
    }
    if (!c) return undefined;

    // special treat the decimal separator
    // if ((k === 44 || k === 46) && e.location === 3 && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
    const pos = checkval ? {
      begin: ndx,
      end: ndx
    } : caret.call(inputmask, input);
    let forwardPosition;

    // allow for character substitution
    if (!checkval) c = opts.substitutes[c] || c;
    maskset.writeOutBuffer = true;
    const valResult = isValid.call(inputmask, pos, c, strict, undefined, undefined, undefined, checkval);
    if (valResult !== false) {
      resetMaskSet.call(inputmask, true);
      forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos);
      maskset.p = forwardPosition; // needed for checkval
    }
    forwardPosition = opts.numericInput && valResult.caret === undefined ? seekPrevious.call(inputmask, forwardPosition) : forwardPosition;
    if (writeOut !== false) {
      if (input) {
        setTimeout(function () {
          opts.onKeyValidation.call(input, c, valResult);
        }, 0);
      } else if (typeof opts.onKeyValidation === "function") {
        opts.onKeyValidation.call(inputmask, c, valResult);
      }
      if (maskset.writeOutBuffer && valResult !== false) {
        const buffer = getBuffer.call(inputmask);
        writeBuffer.call(inputmask, input, buffer, forwardPosition, e, checkval !== true);
      }
    }
    if (e && e.preventDefault) e.preventDefault();
    if (checkval) {
      if (valResult !== false) valResult.forwardPosition = forwardPosition;
      return valResult;
    }
    return valResult !== false ? valResult : false;
  }

  // core backspace/delete handling ~ shared by the DOM keydown handler and the
  // headless session api. this = inputmask instance
  function handleRemoveKey(input, c, pos, e) {
    const inputmask = this;
    if (e && e.preventDefault) e.preventDefault(); // stop default action but allow propagation
    handleRemove.call(inputmask, input, c, pos);
    const currentVal = input && input.inputmask ? input.inputmask._valueGet() : inputmask._valueGet();
    writeBuffer.call(inputmask, input, getBuffer.call(inputmask, true), pos, e, currentVal !== getBuffer.call(inputmask).join(""));
  }
  function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
    let onBeforeWriteResult;
    const inputmask = input && input.inputmask || (input && input.maskset ? input : this),
      opts = inputmask.opts,
      $ = inputmask.dependencyLib;
    if (event && typeof opts.onBeforeWrite === "function") {
      //    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
      onBeforeWriteResult = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
      if (onBeforeWriteResult) {
        if (onBeforeWriteResult.refreshFromBuffer) {
          const refresh = onBeforeWriteResult.refreshFromBuffer;
          refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, onBeforeWriteResult.buffer || buffer);
          buffer = getBuffer.call(inputmask, true);
        }
        if (caretPos !== undefined) caretPos = onBeforeWriteResult.caret !== undefined ? onBeforeWriteResult.caret : caretPos;
      }
    }
    inputmask._valueSet(buffer.join(""));
    if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
      // console.log(caretPos);
      caret.call(inputmask, input, caretPos, undefined, undefined, event !== undefined && event.type === "keydown" && (event.key === keys.Delete || event.key === keys.Backspace));
    }
    if (input !== undefined && input.inputmask) {
      input.inputmask.writeBufferHook === undefined || input.inputmask.writeBufferHook(caretPos);
    } else if (inputmask.writeBufferHook) {
      inputmask.writeBufferHook(caretPos);
    }
    if (triggerEvents === true && input !== undefined && input.nodeName) {
      const $input = $(input),
        nptVal = input.inputmask ? input.inputmask._valueGet() : inputmask._valueGet();
      if (input.inputmask) input.inputmask.skipInputEvent = true;
      $input.trigger("input");
      if (inputmask.undoValue !== nptVal) {
        inputmask.undoValue = nptVal;
        $input.trigger("change");
      }
      setTimeout(function () {
        // timeout needed for IE
        if (nptVal === getBufferTemplate.call(inputmask).join("")) {
          $input.trigger("cleared");
        } else if (isComplete.call(inputmask, buffer) === true) {
          $input.trigger("complete");
        }
      }, 0);
    }
    const result = {
      buffer,
      caret: caretPos,
      value: buffer.join(""),
      onBeforeWrite: onBeforeWriteResult
    };
    return event && event.type === "_checkval" ? onBeforeWriteResult : result;
  }

  function applyInputValue(input, value, initialEvent, strict) {
    const inputmask = input && input.inputmask || (input && input.maskset ? input : this),
      opts = inputmask.opts;
    if (input && input.inputmask) input.inputmask.refreshValue = false;else inputmask.refreshValue = false;
    if (strict !== true && typeof opts.onBeforeMask === "function") value = opts.onBeforeMask.call(inputmask, value, opts) || value;
    value = (value || "").toString().split("");
    checkVal.call(inputmask, input, true, false, value, initialEvent);
    inputmask.undoValue = inputmask._valueGet(true);
    if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && inputmask._valueGet() === getBufferTemplate.call(inputmask).join("") && getLastValidPosition.call(inputmask) === -1) {
      inputmask._valueSet("");
    }
  }

  // todo put on prototype?
  function clearOptionalTail(buffer) {
    const inputmask = this;
    buffer.length = 0;
    const template = getMaskTemplate.call(inputmask, true, 0, true, undefined, true);
    let lmnt;
    while ((lmnt = template.shift()) !== undefined) buffer.push(lmnt);
    return buffer;
  }
  function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
    const inputmask = input && input.inputmask || (input && input.maskset ? input : this),
      maskset = inputmask.maskset,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib,
      inputValue = nptvl.slice(),
      skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
    let charCodes = "",
      initialNdx = -1,
      result;
    opts.skipOptionalPartCharacter = ""; // see issue #2311

    function isTemplateMatch(ndx, charCodes) {
      if (opts.validateOnly === true && maskset.positionIndependent === true && isMask.call(inputmask, ndx) && isMask.call(inputmask, ndx, false, true)) {
        // every position holds the mask definition, so the static template can
        // never start with the typed characters; skip rebuilding it per character
        return false;
      }
      const targetTemplate = getMaskTemplate.call(inputmask, true, 0).slice(ndx, seekNext.call(inputmask, ndx, false, false)).join("").replace(/'/g, "");
      let charCodeNdx = targetTemplate.indexOf(charCodes);
      // strip spaces from targetTemplate
      while (charCodeNdx > 0 && targetTemplate[charCodeNdx - 1] === " ") charCodeNdx--;
      const match = charCodeNdx === 0 && !isMask.call(inputmask, ndx) && (getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || getTest.call(inputmask, ndx).match.static === true && getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || getTest.call(inputmask, ndx).match.nativeDef === " " && (getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || getTest.call(inputmask, ndx + 1).match.static === true && getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
      if (!match && charCodeNdx > 0 && !isMask.call(inputmask, ndx, false, true)) {
        const nextPos = seekNext.call(inputmask, ndx);
        if (inputmask.caretPos.begin < nextPos) {
          inputmask.caretPos = {
            begin: nextPos
          };
        }
      }
      return match;
    }
    inputmask._displayValueCache = maskset.validPositions.slice();
    resetMaskSet.call(inputmask, false);
    inputmask.clicked = 0; // reset click counter to correctly determine the caretposition in checkval
    initialNdx = opts.radixPoint ? determineNewCaretPosition.call(inputmask, {
      begin: 0,
      end: 0
    }, false, opts.__financeInput === false ? "radixFocus" : undefined).begin : 0;
    maskset.p = initialNdx;
    inputmask.caretPos = {
      begin: initialNdx
    };
    const staticMatches = [];
    let prevCaretPos = inputmask.caretPos;
    inputValue.forEach(function (charCode, ndx) {
      if (charCode !== undefined) {
        // inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
        /* if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true) &&
        isValid.call(inputmask, ndx, inputValue[ndx], true, undefined, true, true) === false) {
        inputmask.caretPos.begin++;
        } else */
        // console.log("caret " + inputmask.caretPos.begin);
        const keypress = new $.Event("_checkval");
        keypress.key = charCode;
        charCodes += charCode;
        const lvp = getLastValidPosition.call(inputmask, undefined, true);
        if (!isTemplateMatch(initialNdx, charCodes)) {
          result = processKeypress.call(inputmask, keypress, true, false, strict, inputmask.caretPos.begin);
          if (result) {
            initialNdx = inputmask.caretPos.begin + 1;
            charCodes = "";
          }
        } else {
          result = getTest.call(inputmask, ndx).match.static === true ? processKeypress.call(inputmask, keypress, true, false, strict, lvp + 1) : false;
        }
        if (result) {
          if (result.pos !== undefined && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true && maskset.validPositions[result.pos].alternation === undefined) {
            staticMatches.push(result.pos);
            if (!inputmask.isRTL) {
              result.forwardPosition = result.pos + 1;
            }
          }
          const onbeforeWriteResult = writeBuffer.call(inputmask, undefined, getBuffer.call(inputmask), result.forwardPosition, keypress, false);
          inputmask.caretPos = {
            begin: onbeforeWriteResult?.caret || result.forwardPosition,
            end: onbeforeWriteResult?.caret || result.forwardPosition
          };
          prevCaretPos = inputmask.caretPos;
        } else {
          if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true)) {
            inputmask.caretPos.begin++;
          } else inputmask.caretPos = prevCaretPos; // restore the caret position from before the failed validation
        }
      }
    });
    if (staticMatches.length > 0) {
      let sndx, validPos;
      const nextValid = seekNext.call(inputmask, -1, undefined, false);
      if (!isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length <= nextValid || isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length > 0 && staticMatches.length !== nextValid && staticMatches[0] === 0) {
        // should check if is sequence starting from 0
        let nextSndx = nextValid;
        while ((sndx = staticMatches.shift()) !== undefined) {
          if (sndx < nextSndx) {
            const keypress = new $.Event("_checkval");
            validPos = maskset.validPositions[sndx];
            validPos.generatedInput = true;
            keypress.key = validPos.input;
            result = processKeypress.call(inputmask, keypress, true, false, strict, nextSndx);
            if (result && result.pos !== undefined && result.pos !== sndx && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true) {
              staticMatches.push(result.pos);
            } else if (!result) break;
            nextSndx++;
          }
        }
      } else {
        // delete all free statics
        while (sndx = staticMatches.pop()) {
          validPos = maskset.validPositions[sndx];
          if (validPos && maskset.validPositions[sndx + 1] === undefined) {
            delete maskset.validPositions[sndx];
          }
        }
      }
    }
    if (writeOut) {
      writeBuffer.call(inputmask, input, getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && (initiatingEvent.type === "input" && inputmask.undoValue !== getBuffer.call(inputmask).join("") || initiatingEvent.type === "paste"));
      // for (var vndx in maskset.validPositions) {
      // 	if (maskset.validPositions[vndx].match.generated !== true) { //only remove non forced generated
      // 		delete maskset.validPositions[vndx].generatedInput; //clear generated markings ~ consider initializing with a  value as fully typed
      // 	}
      // }
    }
    inputmask._displayValueCache = undefined;
    opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
  }
  function HandleNativePlaceholder(npt, value) {
    if (npt.placeholder !== value) {
      npt.placeholder = value;
      if (npt.placeholder === "") npt.removeAttribute("placeholder");
    }
  }
  function unmaskedvalue(input) {
    const inputmask = input ? input.inputmask : this,
      opts = inputmask.opts,
      maskset = inputmask.maskset;
    if (input) {
      if (input.inputmask === undefined) {
        return input.value;
      }
      if (input.inputmask && input.inputmask.refreshValue) {
        // forced refresh from the value form.reset
        applyInputValue(input, input.inputmask._valueGet(true));
      }
    }
    const umValue = [],
      vps = maskset.validPositions;
    for (let pndx = 0, vpl = vps.length; pndx < vpl; pndx++) {
      if (vps[pndx] && vps[pndx].match && (vps[pndx].match.static !== true || opts.keepStatic !== true && Array.isArray(maskset.metadata) && vps[pndx].generatedInput !== true)) {
        // only include non generated input with multiple masks (check on metadata) and without keepStatic true
        umValue.push(vps[pndx].input);
      }
    }
    let unmaskedValue = umValue.length === 0 ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
    if (typeof opts.onUnMask === "function") {
      const bufferValue = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join("");
      unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
    }
    if (opts.outputMask && unmaskedValue.length > 0) {
      return inputmask.options({
        mask: opts.outputMask,
        alias: null
      }).format(unmaskedValue, opts.metadata);
    }
    return unmaskedValue;
  }

  const escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
  function escapeRegex(str) {
    return str.replace(escapeRegexRegex, "\\$1");
  }

  /**
   * A token of a parsed mask tree.
   *
   * @typedef {Object} MaskToken
   * @property {Array<MaskToken | import("./mask-lexer").MaskTest>} matches
   * @property {boolean} openGroup
   * @property {boolean} alternatorGroup
   * @property {boolean} isGroup
   * @property {boolean} isOptional
   * @property {boolean} isQuantifier
   * @property {boolean} isAlternator
   * @property {{ min: number | string; max: number | string; jit?: number | string }} quantifier
   */

  function MaskToken (isGroup, isOptional, isQuantifier, isAlternator) {
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

  const tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
    // Thx to https://github.com/slevithan/regex-colorizer for the regexTokenizer regex
    regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?(?:[:=!]|<[\w$][^>]*>|<[=!])?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g;

  /**
   * A single test definition of the mask.
   *
   * @typedef {Object} MaskTest
   * @property {RegExp | { test: (char: string) => boolean } | null} fn
   * @property {boolean} static
   * @property {boolean} optionality
   * @property {boolean} [defOptionality] indicator for an optional from the definition
   * @property {"master" | boolean} newBlockMarker
   * @property {"upper" | "lower" | "title" | "follow" | null | ((elem: HTMLElement, test: MaskTest, pos: number, validPositions: any) => string)} [casing]
   * @property {string} def
   * @property {string} [placeholder]
   * @property {string} [displayChar]
   * @property {string} nativeDef
   * @property {boolean} [generated]
   */

  /**
   * The generated maskset for a mask.
   *
   * @typedef {Object} Maskset
   * @property {string} mask
   * @property {RegExp | null | undefined} [wholeRegex] compiled full-string regex for the regex mask
   * @property {boolean} [positionIndependent] true when the mask is one definition with an unlimited quantifier, so every position shares the same test
   * @property {import("./masktoken").MaskToken[]} maskToken
   * @property {any[]} validPositions
   * @property {string[] | undefined} _buffer
   * @property {string[] | undefined} buffer
   * @property {Record<number, any>} tests
   * @property {Record<number, any[]>} excludes excluded alternations
   * @property {any} metadata
   * @property {number | undefined} maskLength
   * @property {Record<number, number>} jitOffset
   */

  /**
   * Whether the placeholder option is a per-position placeholder map (supplied by
   * an alias, see the datetime alias) rather than a plain string.
   *
   * A map is indexed per position, so it counts as "supplied" even when empty,
   * and the generated testdefinitions differ.
   *
   * A null placeholder counts as "no map" ~ typeof null === "object" would
   * otherwise classify it as a map and index into null.
   *
   * @param {import("./defaults").InputmaskOptions} opts
   * @returns {boolean}
   */
  function isPlaceholderMap(opts) {
    return typeof opts.placeholder === "object" && opts.placeholder !== null;
  }

  /**
   * Whether the parsed token tree contains an alternator (regex "|").
   *
   * Recurses through group and quantifier tokens; mask tests are leaves.
   *
   * @param {import("./masktoken").MaskToken | MaskTest} token
   * @returns {boolean}
   */
  function containsAlternator(token) {
    if (token.isAlternator === true || token.alternatorGroup === true) {
      return true;
    }
    if (Array.isArray(token.matches)) {
      for (let i = 0; i < token.matches.length; i++) {
        if (containsAlternator(token.matches[i])) return true;
      }
    }
    return false;
  }

  /**
   * @param {import("./defaults").InputmaskOptions} opts
   * @param {boolean} nocache
   * @returns {Maskset}
   */
  function generateMaskSet(opts, nocache) {
    let /** @type {Maskset} */ms;

    /**
     * @param {string} mask
     * @param {{ repeat: number | string; groupmarker: string[] | [string, string]; quantifiermarker: string[] | [string, string]; keepStatic: boolean | null }} opts
     * @returns {string}
     */
    function preProcessMask(mask, {
      repeat,
      groupmarker,
      quantifiermarker,
      keepStatic
    }) {
      if (repeat > 0 || repeat === "*" || repeat === "+") {
        const repeatStart = repeat === "*" ? 0 : repeat === "+" ? 1 : repeat;
        if (repeatStart !== repeat) {
          mask = groupmarker[0] + mask + groupmarker[1] + quantifiermarker[0] + repeatStart + "," + repeat + quantifiermarker[1];
        } else {
          // repeat the mask n times
          const msk = mask;
          for (let i = 1; i < repeatStart; i++) {
            mask += msk;
          }
        }
      }
      if (keepStatic === true) {
        const optionalRegex = "(.)\\[([^\\]]*)\\]",
          // "(?<p1>.)\\[(?<p2>[^\\]]*)\\]", remove named capture group @2428
          maskMatches = mask.match(new RegExp(optionalRegex, "g"));
        maskMatches && maskMatches.forEach((m, i) => {
          let [p1, p2] = m.split("[");
          p2 = p2.replace("]", "");
          mask = mask.replace(new RegExp(`${escapeRegex(p1)}\\[${escapeRegex(p2)}\\]`), p1.charAt(0) === p2.charAt(0) ? `(${p1}|${p1}${p2})` : `${p1}[${p2}]`);
          // console.log(mask);
        });
      }
      return mask;
    }

    /**
     * @param {string} mask
     * @param {any} metadata
     * @param {import("./defaults").InputmaskOptions} opts
     * @returns {Maskset}
     */
    function generateMask(mask, metadata, opts) {
      let regexMask = false;
      if (mask === null || mask === "") {
        regexMask = opts.regex !== null;
        if (regexMask) {
          opts.regex = opts.regex.replace(/^(\^)(.*)(\$)$/, "$2");
          mask = opts.regex;
        } else {
          regexMask = true;
          mask = ".*";
        }
      }
      if (mask.length === 1 && opts.greedy === false && opts.repeat !== 0) {
        opts.placeholder = "";
      } // hide placeholder with single non-greedy mask
      mask = preProcessMask(mask, opts);

      // console.log(mask);
      let masksetDefinition, maskdefKey;
      maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
      if (opts.keepStatic !== null) {
        // keepstatic modifies the output from the testdefinitions ~ so differentiate in the maskcache
        maskdefKey = "ks_" + opts.keepStatic + maskdefKey;
      }
      if (opts.placeholder !== undefined) {
        // the placeholder is baked into the testdefinitions (see
        // resolvePlaceholder) ~ so differentiate in the maskcache
        maskdefKey = "ph_" + JSON.stringify(opts.placeholder) + maskdefKey;
      }
      if (masksCache[maskdefKey] === undefined || nocache === true) {
        const maskToken = analyseMask$1(mask, regexMask, opts);
        /** @type {Maskset} */
        masksetDefinition = {
          mask,
          maskToken,
          validPositions: [],
          _buffer: undefined,
          buffer: undefined,
          tests: {},
          excludes: {},
          // excluded alternations
          metadata,
          maskLength: undefined,
          jitOffset: {},
          wholeRegex: undefined,
          positionIndependent: undefined
        };

        // one definition carrying an unlimited quantifier (e.g. "[^<|>]*"): the
        // same test applies at every position, so resolving it once is enough.
        // A "+" quantifier is excluded: position 0 requires a character while
        // later positions do not, so the tests are not position-independent.
        // Alternation (e.g. "(a|b)*") is excluded: its branch tests differ per
        // position and must be built by the standard walk.
        masksetDefinition.positionIndependent = maskToken.length === 1 && maskToken[0].matches.length === 2 && maskToken[0].matches[1].isQuantifier === true && maskToken[0].matches[1].quantifier.max === "*" && !containsAlternator(maskToken[0]);
        if (regexMask) {
          // compile the full-string regex once
          try {
            masksetDefinition.wholeRegex = new RegExp("^(?:" + opts.regex + ")$", "u");
          } catch (e) {
            try {
              masksetDefinition.wholeRegex = new RegExp("^(?:" + opts.regex + ")$");
            } catch (e2) {
              // broken regex => don't gate completeness
              masksetDefinition.wholeRegex = null;
            }
          }
        }
        if (opts.validateOnly === true && (!masksetDefinition.wholeRegex || masksetDefinition.positionIndependent !== true)) {
          console.warn("Inputmask: validateOnly is ignored for this mask - it needs a regex mask of one character class with an unlimited quantifier, such as opts.regex = " + '"[^<|>]*". Standard validation is used instead.');
        }
        if (nocache !== true) {
          masksCache[maskdefKey] = masksetDefinition;
          masksetDefinition = DependencyLib.extend(true, {}, masksCache[maskdefKey]);
        }
      } else {
        masksetDefinition = DependencyLib.extend(true, {}, masksCache[maskdefKey]);
      }
      return masksetDefinition;
    }
    if (typeof opts.mask === "function") {
      // allow mask to be a preprocessing fn - should return a valid mask
      opts.mask = opts.mask(opts);
    }
    if (Array.isArray(opts.mask)) {
      if (opts.mask.length > 1) {
        if (opts.keepStatic === null) {
          // enable by default when passing multiple masks when the option is not explicitly specified
          opts.keepStatic = true;
        }
        let altMask = opts.groupmarker[0];
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
    if (opts.keepStatic === null) {
      opts.keepStatic = false;
    }
    return ms;
  }

  /**
   * @param {string} mask
   * @param {boolean} regexMask
   * @param {import("./defaults").InputmaskOptions} opts
   * @returns {import("./masktoken").MaskToken[]}
   */
  function analyseMask$1(mask, regexMask, opts) {
    const currentToken = new MaskToken(),
      /** @type {import("./masktoken").MaskToken[]} */openenings = [],
      /** @type {import("./masktoken").MaskToken[]} */maskTokens = [];
    let escaped = false,
      /** @type {RegExpExecArray} */match,
      /** @type {string} */m,
      /** @type {import("./masktoken").MaskToken} */openingToken,
      /** @type {import("./masktoken").MaskToken} */currentOpeningToken,
      /** @type {import("./masktoken").MaskToken} */alternator,
      /** @type {import("./masktoken").MaskToken | MaskTest} */lastMatch,
      closeRegexGroup = false;

    // test definition => {fn: RegExp/function, static: true/false optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}

    /**
     * Resolve the placeholder of a test at the current top-level token index.
     *
     * Precedence is a placeholder map first, then a placeholder that a registered
     * definition asked for, then a string placeholder, then the prototype
     * placeholder of the definition.
     *
     * Only a registered definition (opts.definitions) outranks the global string.
     * An alias registers a placeholder per definition on purpose ~ numeric puts
     * the radixPoint and the groupSeparator on their own definitions, and letting
     * the global placeholder win would render a numeric mask as a row of digits. A
     * prototype definition is only the last resort, so that {mask: "999",
     * placeholder: "0"} still renders zeroes rather than underscores.
     *
     * A map is indexed per position, so a missing entry falls through. A string is
     * cycled over the token index ~ for a mask without groups or quantifiers the
     * token index is the buffer position, so a format-shaped placeholder lines up
     * ("99/99/9999" <- "dd/MM/yyyy"); for grouped masks every token inside a group
     * shares the group index, which is why multi-char strings are discouraged in
     * favour of a map.
     *
     * Always returns a string. That is what lets getPlaceholder read the
     * placeholder off the test instead of re-deriving it, and it is why a
     * definition without one of its own ends up on the prototype placeholder ~ an
     * empty position still has to render something.
     *
     * @param {string | undefined} [definitionPlaceholder] placeholder of the definition the test is built from
     * @param {boolean} [registered] the definition came from opts.definitions rather than the prototypes
     * @returns {string}
     */
    function resolvePlaceholder(definitionPlaceholder, registered) {
      if (isPlaceholderMap(opts)) {
        return opts.placeholder[currentToken.matches.length] ?? definitionPlaceholder ?? DEFAULT_PLACEHOLDER;
      } else if (registered && definitionPlaceholder !== undefined) {
        return definitionPlaceholder;
      } else if (typeof opts.placeholder === "string") {
        return opts.placeholder.length > 1 ? opts.placeholder.charAt(currentToken.matches.length % opts.placeholder.length) : opts.placeholder;
      }
      return definitionPlaceholder ?? DEFAULT_PLACEHOLDER;
    }

    /**
     * @param {import("./masktoken").MaskToken} mtoken
     * @param {string} element
     * @param {number} [position]
     */
    function insertTestDefinition(mtoken, element, position) {
      position = position !== undefined ? position : mtoken.matches.length;
      let prevMatch = mtoken.matches[position - 1],
        flag = opts.casing ? "i" : "";
      if (regexMask) {
        if (element.indexOf("[") === 0 || escaped && /\\(?:[dDsSwWpPnrtfv]|0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z])/.test(element) || element === ".") {
          if (/\\p\{.*}/i.test(element)) flag += "u";
          mtoken.matches.splice(position++, 0, {
            fn: new RegExp(element, flag),
            static: false,
            optionality: false,
            newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element,
            casing: null,
            def: element,
            // a regex mask has no definition to inherit a placeholder from, so it
            // gets the prototype one baked in
            placeholder: resolvePlaceholder(DEFAULT_PLACEHOLDER),
            nativeDef: element
          });
        } else {
          if (escaped) element = element[element.length - 1];
          element.split("").forEach(function (lmnt) {
            prevMatch = mtoken.matches[position - 1];
            mtoken.matches.splice(position++, 0, createStaticTest(lmnt, prevMatch, flag,
            // a static displays its own character, so it outranks a string
            // placeholder ~ a map still wins over it
            resolvePlaceholder(lmnt, true)));
          });
        }
        escaped = false;
      } else {
        const maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && definitions$1[element];
        if (maskdef && !escaped) {
          if (typeof maskdef.validator === "string" && /\\p\{.*}/i.test(maskdef.validator)) flag += "u";
          mtoken.matches.splice(position++, 0, {
            fn: maskdef.validator ? typeof maskdef.validator === "string" ? new RegExp(maskdef.validator, flag) : new function () {
              this.test = maskdef.validator;
            }() : /./,
            static: maskdef.static || false,
            optionality: maskdef.optional || false,
            defOptionality: maskdef.optional || false,
            // indicator for an optional from the definition
            newBlockMarker: prevMatch === undefined || maskdef.optional ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
            casing: maskdef.casing,
            def: maskdef.definitionSymbol || element,
            placeholder: resolvePlaceholder(maskdef.placeholder, !!(opts.definitions && opts.definitions[element])),
            displayChar: maskdef.displayChar,
            nativeDef: element,
            generated: maskdef.generated
          });
        } else {
          mtoken.matches.splice(position++, 0, createStaticTest(element, prevMatch, flag,
          // a static displays its own character, so it outranks a string
          // placeholder ~ a map still wins over it
          resolvePlaceholder(element, true)));
          escaped = false;
        }
      }
    }

    /**
     * @param {string} element
     * @param {MaskTest | import("./masktoken").MaskToken | undefined} prevMatch
     * @param {string} flag
     * @param {string} placeholder always defined, resolvePlaceholder fills the gap
     * @returns {MaskTest}
     */
    function createStaticTest(element, prevMatch, flag, placeholder) {
      return {
        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", flag) : null,
        static: true,
        optionality: false,
        newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element && prevMatch.static !== true,
        casing: null,
        def: opts.staticDefinitionSymbol || element,
        placeholder,
        nativeDef: (escaped ? "'" : "") + element
      };
    }

    /**
     * @param {import("./masktoken").MaskToken} maskToken
     */
    function verifyGroupMarker(maskToken) {
      if (maskToken && maskToken.matches) {
        maskToken.matches.forEach(function (token, ndx) {
          const nextToken = maskToken.matches[ndx + 1];
          if ((nextToken === undefined || nextToken.matches === undefined || nextToken.isQuantifier === false) && token && token.isGroup) {
            // this is not a group but a normal mask => convert
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

    /**
     * @param {import("./masktoken").MaskToken} alternator
     * @param {boolean} unsetAlternatorGroup
     */
    function pushAlternator(alternator, unsetAlternatorGroup) {
      alternator.matches.forEach(function (token) {
        token.isGroup = false;
        if (unsetAlternatorGroup) token.alternatorGroup = false;
      });
      if (openenings.length > 0) {
        currentOpeningToken = openenings[openenings.length - 1];
        currentOpeningToken.matches.push(alternator);
      } else {
        currentToken.matches.push(alternator);
      }
    }
    function defaultCase() {
      if (openenings.length > 0) {
        currentOpeningToken = openenings[openenings.length - 1];
        insertTestDefinition(currentOpeningToken, m);
        if (currentOpeningToken.isAlternator) {
          // handle alternator a | b case
          pushAlternator(openenings.pop(), false);
        }
      } else {
        insertTestDefinition(currentToken, m);
      }
    }

    /**
     * @param {import("./masktoken").MaskToken} maskToken
     * @returns {import("./masktoken").MaskToken}
     */
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
      for (const match in maskToken.matches) {
        if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
          const intMatch = parseInt(match);
          if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
            // reposition quantifier
            const qt = maskToken.matches[match];
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

    /**
     * @param {Array<import("./masktoken").MaskToken | MaskTest>} matches
     * @returns {import("./masktoken").MaskToken}
     */
    function groupify(matches) {
      const groupToken = new MaskToken(true);
      groupToken.openGroup = false;
      groupToken.matches = matches;
      return groupToken;
    }

    /**
     * @param {string} m
     * @returns {{ min: number | string; max: number | string; jit: number | string }}
     */
    function parseQuantifier(m) {
      m = m.replace(/[{}?]/g, ""); // ? matches lazy quantifiers
      const mqj = m.split("|"),
        mq = mqj[0].split(",");
      let min = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]);
      const max = mq.length === 1 ? min : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]),
        jit = isNaN(mqj[1]) ? mqj[1] : parseInt(mqj[1]);
      if (min === "*" || min === "+") {
        min = max === "*" ? 0 : 1;
      }
      return {
        min,
        max,
        jit
      };
    }
    function closeGroup() {
      // Group closing
      openingToken = openenings.pop();
      openingToken.openGroup = false; // mark group as complete
      if (openingToken !== undefined) {
        if (openenings.length > 0) {
          currentOpeningToken = openenings[openenings.length - 1];
          currentOpeningToken.matches.push(openingToken);
          if (currentOpeningToken.isAlternator) {
            // handle alternator (a) | (b) case
            pushAlternator(openenings.pop(), true);
          }
        } else {
          currentToken.matches.push(openingToken);
        }
      } else {
        defaultCase();
      }
    }

    /**
     * @param {Array<import("./masktoken").MaskToken | MaskTest>} matches
     * @returns {import("./masktoken").MaskToken | MaskTest}
     */
    function groupQuantifier(matches) {
      let lastMatch = matches.pop();
      if (lastMatch.isQuantifier) {
        lastMatch = groupify([matches.pop(), lastMatch]);
      }
      return lastMatch;
    }
    function skipAssertion() {
      // consume the balanced content of an inline regex assertion
      // (?= (?! (?<= (?<! so it leaks no characters into the mask template
      let depth = 1;
      do {
        const assertionToken = regexTokenizer.exec(mask);
        if (assertionToken === null) break;
        if (assertionToken[0].charAt(0) === "(") depth++;else if (assertionToken[0] === ")") depth--;
      } while (depth > 0);
      if (depth === 0) {
        // drop a quantifier that would otherwise attach to the token before the assertion
        const quantToken = regexTokenizer.exec(mask);
        if (quantToken && !/^[?*+]|\{[0-9]+(?:,[0-9]*)?\}/.test(quantToken[0])) {
          regexTokenizer.lastIndex = quantToken.index;
        }
      }
    }
    if (regexMask) {
      opts.optionalmarker[0] = undefined;
      opts.optionalmarker[1] = undefined;
    }
    tokenizer.lastIndex = 0;
    regexTokenizer.lastIndex = 0;
    // console.log(mask);
    while (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask)) {
      // console.log(match);
      m = match[0];
      if (regexMask) {
        switch (m.charAt(0)) {
          // Quantifier
          case "?":
            m = "{0,1}";
            break;
          case "+":
          case "*":
            m = "{" + m + "}";
            break;
          case "|":
            // regex mask alternator  ex: [01][0-9]|2[0-3] => ([01][0-9]|2[0-3])
            if (openenings.length === 0) {
              // wrap the mask in a group to form a regex alternator  ([01][0-9]|2[0-3])
              const altRegexGroup = groupify(currentToken.matches);
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
          case "\\p": // Unicode Categories
          case "\\P":
            {
              // consume the property part { ... } of the escape
              const prop = regexTokenizer.exec(mask);
              if (prop && prop[0] === "{") {
                const rest = regexTokenizer.exec(mask);
                if (rest && rest[0].charAt(rest[0].length - 1) === "}") {
                  m += "{" + rest[0];
                } else {
                  // incomplete property => put the tokens back
                  regexTokenizer.lastIndex = rest ? rest.index : prop.index;
                }
              } else if (prop) {
                // not a property => put the token back
                regexTokenizer.lastIndex = prop.index;
              }
              break;
            }
          case "(?:":
            // non capturing group
            // treat as group
            break;
          case "(?=": // lookahead
          case "(?!":
            // negative lookahead
            // skip the assertion so it leaks no characters into the mask template
            skipAssertion();
            continue;
        }
      }
      if (escaped) {
        defaultCase();
        continue;
      }
      switch (m.charAt(0)) {
        case "$":
        case "^":
          // ignore beginswith and endswith as in masking this makes no point
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
          openenings.push(new MaskToken(false, true));
          break;
        case opts.groupmarker[0]:
          // Group opening
          openenings.push(new MaskToken(true));
          break;
        case opts.quantifiermarker[0]:
          {
            // Quantifier
            const quantifier = new MaskToken(false, false, true);
            quantifier.quantifier = parseQuantifier(m);
            if (isNaN(quantifier.quantifier.min) && isNaN(quantifier.quantifier.max)) {
              // a "{" that is not a quantifier is a literal character
              defaultCase();
              break;
            }
            const matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
            match = matches.pop();
            if (!match.isGroup) {
              match = groupify([match]);
            }
            matches.push(match);
            matches.push(quantifier);
          }
          break;
        case opts.alternatormarker:
          if (openenings.length > 0) {
            currentOpeningToken = openenings[openenings.length - 1];
            const subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
            if (currentOpeningToken.openGroup && (
            // regexp alt syntax
            subToken.matches === undefined || subToken.isGroup === false && subToken.isAlternator === false)) {
              // alternations within group
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
              // regexp alt syntax
              lastMatch.openGroup = false;
              const alternatorGroup = new MaskToken(true);
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

  /*
   * Input Mask Core
   * http://github.com/RobinHerbots/inputmask
   * Copyright (c) Robin Herbots
   * Licensed under the MIT license
   */


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
    this.dependencyLib = DependencyLib;
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
      this.opts = DependencyLib.extend(true, {}, defaults, options);
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
    dataAttribute: "data-inputmask",
    // data attribute prefix used for attribute binding
    get isRTL() {
      return this.opts.isRTL || this.opts.numericInput;
    },
    option: function (options, noremask) {
      // set extra options || retrieve value of a current option
      if (typeof options === "string") {
        return this.opts[options];
      } else if (typeof options === "object") {
        DependencyLib.extend(this.userOptions, options); // user passed options
        // remask
        if (this.el && noremask !== true) {
          this.mask(this.el);
        }
        return this;
      }
    },
    unmaskedvalue: function (value) {
      this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
      if (value !== undefined) {
        const valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
        checkVal.call(this, undefined, false, false, valueBuffer);
        if (typeof this.opts.onBeforeWrite === "function") this.opts.onBeforeWrite.call(this, undefined, getBuffer.call(this), 0, this.opts);
      }
      return unmaskedvalue.call(this, this.el);
    },
    getemptymask: function () {
      // return the default (empty) mask value, usefull for setting the default value in validation
      this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
      return (this.isRTL ? getBufferTemplate.call(this).reverse() : getBufferTemplate.call(this)).join("");
    },
    hasMaskedValue: function () {
      // check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
      return !this.opts.autoUnmask;
    },
    isComplete: function () {
      this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
      return isComplete.call(this, getBuffer.call(this));
    },
    getmetadata: function () {
      // return mask metadata if exists
      this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
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
      this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
      if (value) {
        const valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
        checkVal.call(this, undefined, true, false, valueBuffer);
      }
      const buffer = clearOptionalTail.call(this, []),
        isC = isComplete.call(this, buffer),
        isc2 = value === (this.isRTL ? buffer.reverse().join("") : buffer.join(""));
      return isC && (value === undefined || isc2);
    },
    format: function (value, metadata) {
      this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
      const valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
      checkVal.call(this, undefined, true, false, valueBuffer);
      const formattedValue = this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join("");
      return metadata ? {
        value: formattedValue,
        metadata: this.getmetadata()
      } : formattedValue;
    },
    setValue: function (value, caretPos) {
      if (this.el) {
        DependencyLib(this.el).trigger("setvalue", [value, caretPos]);
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
        return this.isRTL && overruleRTL !== true ? this.el.inputmask.__valueGet.call(this.el).split("").reverse().join("") : this.el.inputmask.__valueGet.call(this.el);
      }
      const val = this.displayValue !== undefined ? this.displayValue : this.maskset ? getBuffer.call(this).join("") : "";
      return this.isRTL && overruleRTL !== true ? val.split("").reverse().join("") : val;
    },
    _valueSet: function (value, overruleRTL) {
      value = value === null || value === undefined ? "" : value.toString();
      this.displayValue = overruleRTL !== true && this.isRTL ? value.split("").reverse().join("") : value;
      if (this.el && this.el.inputmask && this.el.inputmask.__valueSet) {
        this.el.inputmask.__valueSet.call(this.el, overruleRTL !== true && this.isRTL ? value.split("").reverse().join("") : value);
      }
    },
    ensureInitialized: function (initialValue) {
      if (this.maskset === undefined) {
        this.maskset = generateMaskSet(this.opts, this.noMasksCache);
        getBufferTemplate.call(this).join("");
        const initialPos = seekNext.call(this, -1);
        this.caretPos = {
          begin: initialPos,
          end: initialPos
        };
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
      const key = direction === "delete" || direction === "forward" ? keys.Delete : keys.Backspace,
        keydown = {
          type: "keydown",
          key,
          preventDefault: () => {}
        };
      handleRemoveKey.call(this, this.el, key, caret.call(this, this.el), keydown);
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
    DependencyLib.extend(true, defaults, options);
  };
  /**
   * @param {Record<string, any>} definition
   * @returns {void}
   */
  Inputmask.extendDefinitions = function (definition) {
    DependencyLib.extend(true, definitions$1, definition);
  };
  /**
   * @param {Record<string, InputmaskOptions>} alias
   * @returns {void}
   */
  Inputmask.extendAliases = function (alias) {
    DependencyLib.extend(true, aliases, alias);
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
  Inputmask.dependencyLib = DependencyLib;

  // make inputmask available
  window$1.Inputmask = Inputmask;
  const InputmaskExport = /** @type {InputmaskStatic} */Inputmask;

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */
  function cssunit(options) {
    return DependencyLib.extend(true, {
      regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
    }, options);
  }
  function registerCssunit() {
    DependencyLib.extend(true, aliases, {
      cssunit: cssunit()
    });
  }

  /**
   * Default internationalization (i18n) settings for date formatting.
   * Users can override these by passing an `i18n` option to the date/datetime alias.
   *
   * @typedef {Object} I18nOptions
   * @property {string[]} dayNames - Full day names (Sunday-Saturday)
   * @property {string[]} monthNames - Full month names (January-December) followed by abbreviated (Jan-Dec)
   * @property {string[]} ordinalSuffix - Ordinal suffixes for dates (st, nd, rd, th)
   * @property {string} AM - AM indicator
   * @property {string} PM - PM indicator
   *
   * @type {I18nOptions}
   */
  const defaultI18n = {
    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ordinalSuffix: ["st", "nd", "rd", "th"],
    AM: "AM",
    PM: "PM"
  };

  /**
   * Merge user-provided i18n options with defaults.
   * @param {Partial<typeof defaultI18n>} [userI18n]
   * @returns {typeof defaultI18n}
   */
  function mergeI18n(userI18n) {
    if (!userI18n) return {
      ...defaultI18n
    };
    return {
      dayNames: userI18n.dayNames || defaultI18n.dayNames,
      monthNames: userI18n.monthNames || defaultI18n.monthNames,
      ordinalSuffix: userI18n.ordinalSuffix || defaultI18n.ordinalSuffix,
      AM: userI18n.AM || defaultI18n.AM,
      PM: userI18n.PM || defaultI18n.PM
    };
  }

  /*
    Input Mask plugin extensions
    http://github.com/RobinHerbots/inputmask
    Copyright (c) Robin Herbots
    Licensed under the MIT license
  */

  // resolve the translations for the given options, falling back to the defaults
  function i18nOf(opts) {
    return opts && opts.i18n || defaultI18n;
  }
  class DateObject {
    constructor(mask, format, opts, inputmask) {
      this.mask = mask;
      this.format = format;
      this.opts = opts;
      this.inputmask = inputmask;
      this._date = new Date(1, 0, 1);
      this.initDateObject(mask, this.opts, this.inputmask);
    }
    get date() {
      if (this._date === undefined) {
        this._date = new Date(1, 0, 1);
        this.initDateObject(undefined, this.opts, this.inputmask);
      }
      return this._date;
    }
    initDateObject(mask, opts, inputmask) {
      let match,
        lastNdx = -1;
      getTokenizer(opts).lastIndex = 0;
      while (match = getTokenizer(opts).exec(this.format)) {
        if (match.index >= lastNdx) {
          const dynMatches = /\d+$/.exec(match[0]),
            fcode = dynMatches ? match[0][0] + "x" : match[0];
          let value;
          if (mask !== undefined) {
            // console.log("mask", mask);
            if (dynMatches) {
              const lastIndex = getTokenizer(opts).lastIndex,
                tokenMatch = getTokenMatch.call(inputmask, match.index, opts, inputmask && inputmask.maskset);
              getTokenizer(opts).lastIndex = lastIndex;
              value = mask.slice(0, mask.indexOf(tokenMatch.nextMatch[0]));
            } else {
              const targetSymbol = match[0][0];
              let ndx = match.index;
              while (inputmask && (opts.placeholder[`${match.index}'${getTest.call(inputmask, ndx).match.placeholder}`] || getTest.call(inputmask, ndx).match.placeholder) === targetSymbol) {
                ndx++;
              }
              lastNdx = ndx;
              const targetMatchLength = ndx - match.index;
              value = mask.slice(0, targetMatchLength || formatcode(fcode) && formatcode(fcode)[4] || fcode.length);
            }
            mask = mask.slice(value.length);
          }
          if (Object.prototype.hasOwnProperty.call(formatCode, fcode)) {
            this.setValue(this, value, fcode, formatcode(fcode)[2], formatcode(fcode)[1]);
          }
        }
      }
    }
    setValue(dateObj, value, fcode, targetProp, dateOperation) {
      if (value !== undefined) {
        switch (targetProp) {
          case "ampm":
            dateObj[targetProp] = value;
            dateObj["raw" + targetProp] = value.replace(/\s/g, "_");
            dateObj["partial" + targetProp] = !/^[ap](m)?$/i.test(value);
            break;
          case "month":
            if (fcode === "MMM" || fcode === "MMMM") {
              // Get i18n from opts (merged with defaults)
              const i18n = i18nOf(this.opts);
              fcode === "MMM" ? dateObj[targetProp] = pad(i18n.monthNames.slice(0, 12).findIndex(item => value.toLowerCase() === item.toLowerCase()) + 1, 2) : dateObj[targetProp] = pad(i18n.monthNames.slice(12, 24).findIndex(item => value.toLowerCase() === item.toLowerCase()) + 1, 2);
              dateObj[targetProp] = dateObj[targetProp] === "00" ? "" : dateObj[targetProp].toString();
              dateObj["raw" + targetProp] = dateObj[targetProp];
              dateObj["partial" + targetProp] = dateObj[targetProp] === "" || dateObj[targetProp] === undefined;
              break;
            }
          // eslint-disable-next-line no-fallthrough
          default:
            dateObj[targetProp] = value.replace(/[^0-9]/g, "0");
            dateObj["raw" + targetProp] = value.replace(/\s/g, "_");
            dateObj["partial" + targetProp] = /[^0-9]/.test(value);
        }
      }
      if (dateOperation !== undefined) {
        let datavalue = dateObj[targetProp];
        if (targetProp === "day" && parseInt(datavalue) === 29 || targetProp === "month" && parseInt(datavalue) === 2) {
          if (parseInt(dateObj.day) === 29 && parseInt(dateObj.month) === 2 && (dateObj.year === "" || dateObj.year === undefined)) {
            // set temporary leap year in dateObj
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
          if (datavalue.length < formatcode(fcode)[4]) datavalue = pad(datavalue, formatcode(fcode)[4], true);
        }
        if (datavalue !== "" && !isNaN(datavalue) || targetProp === "ampm")
          // only pass the value ~ the native date setters take extra positional
          // arguments (eg. setFullYear(year, month)) which would corrupt the date
          dateOperation.call(dateObj._date, datavalue);
      }
    }
    reset() {
      this._date = new Date(1, 0, 1);
    }
    reInit() {
      this._date = undefined;
      // eslint-disable-next-line no-unused-expressions
      this.date;
    }
  }
  let useDateObject = false;
  const currentYear = new Date().getFullYear();

  // supported codes for formatting
  // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format
  // https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7
  // https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table

  const formatCodeAlias = {
    D: "d",
    DD: "dd",
    DDD: "ddd",
    DDDD: "dddd",
    mmm: "MMM",
    mmmm: "MMMM",
    YY: "yy",
    YYYY: "yyyy",
    sss: "L"
  };
  const formatAlias = {
    isoDate: "yyyy-MM-dd",
    // 2007-06-09
    isoTime: "HH:mm:ss",
    // 17:46:21
    isoDateTime: "yyyy-MM-dd\\THH:mm:ss",
    // 2007-06-09T17:46:21
    isoUtcDateTime: "UTC:yyyy-MM-dd\\THH:mm:ss\\Z" // 2007-06-09T22:46:21Z
  };
  const formatCode = {
    // regex, valueSetter, type, displayformatter, #entries (optional)
    d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
    // Day of the month as digits; no leading zero for single-digit days.
    dd: ["[0][1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
      return pad(Date.prototype.getDate.call(this), 2);
    }],
    // Day of the month as digits; leading zero for single-digit days.
    ddd: [""],
    // Day of the week as a three-letter abbreviation.
    dddd: [""],
    // Day of the week as its full name.
    M: ["[1-9]|1[012]", function (val) {
      let mval = val ? parseInt(val) : 0;
      if (mval > 0) mval--;
      return Date.prototype.setMonth.call(this, mval);
    }, "month", function () {
      return Date.prototype.getMonth.call(this) + 1;
    }],
    // Month as digits; no leading zero for single-digit months.
    MM: ["[0][1-9]|1[012]", function (val) {
      let mval = val ? parseInt(val) : 0;
      if (mval > 0) mval--;
      return Date.prototype.setMonth.call(this, mval);
    }, "month", function () {
      return pad(Date.prototype.getMonth.call(this) + 1, 2);
    }],
    // Month as digits; leading zero for single-digit months.
    MMM: [
    // the regex and the display formatter depend on the i18n of the instance
    function (opts) {
      return i18nOf(opts).monthNames.slice(0, 12).join("|");
    }, function (val) {
      // the month name is resolved to its 1 based number before the setter is
      // called ~ see DateObject.setValue
      const mval = parseInt(val, 10) - 1;
      return !isNaN(mval) && mval >= 0 ? Date.prototype.setMonth.call(this, mval) : false;
    }, "month", function (opts) {
      return i18nOf(opts).monthNames.slice(0, 12)[Date.prototype.getMonth.call(this)];
    }],
    // Month as a three-letter abbreviation.
    MMMM: [function (opts) {
      return i18nOf(opts).monthNames.slice(12, 24).join("|");
    }, function (val) {
      const mval = parseInt(val, 10) - 1;
      return !isNaN(mval) && mval >= 0 ? Date.prototype.setMonth.call(this, mval) : false;
    }, "month", function (opts) {
      return i18nOf(opts).monthNames.slice(12, 24)[Date.prototype.getMonth.call(this)];
    }],
    // Month as its full name.
    yy: ["[0-9]{2}", function (val) {
      const centuryPart = new Date().getFullYear().toString().slice(0, 2);
      Date.prototype.setFullYear.call(this, `${centuryPart}${val}`);
    }, "year", function () {
      return pad(Date.prototype.getFullYear.call(this), 2);
    }, 2],
    // Year as last two digits; leading zero for years less than 10.
    yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
      return pad(Date.prototype.getFullYear.call(this), 4);
    }, 4],
    h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
    // Hours; no leading zero for single-digit hours (12-hour clock).
    hh: ["[0][1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
      return pad(Date.prototype.getHours.call(this), 2);
    }],
    // Hours; leading zero for single-digit hours (12-hour clock).
    hx: [function (x) {
      return `[0-9]{${x}}`;
    }, Date.prototype.setHours, "hours", function (x) {
      return Date.prototype.getHours;
    }],
    // Hours; no limit; set maximum digits
    H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
    // Hours; no leading zero for single-digit hours (24-hour clock).
    HH: ["[0][0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
      return pad(Date.prototype.getHours.call(this), 2);
    }],
    // Hours; leading zero for single-digit hours (24-hour clock).
    Hx: [function (x) {
      return `[0-9]{${x}}`;
    }, Date.prototype.setHours, "hours", function (x) {
      return function () {
        return pad(Date.prototype.getHours.call(this), x);
      };
    }],
    // Hours; no limit; set maximum digits
    m: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
    // Minutes; no leading zero for single-digit minutes. Uppercase M unlike CF timeFormat's m to avoid conflict with months.
    mm: ["[0][0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
      return pad(Date.prototype.getMinutes.call(this), 2);
    }],
    // Minutes; leading zero for single-digit minutes. Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
    s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
    // Seconds; no leading zero for single-digit seconds.
    ss: ["[0][0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
      return pad(Date.prototype.getSeconds.call(this), 2);
    }],
    // Seconds; leading zero for single-digit seconds.
    l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
      return pad(Date.prototype.getMilliseconds.call(this), 3);
    }, 3],
    // Milliseconds. 3 digits.
    L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
      return pad(Date.prototype.getMilliseconds.call(this), 2);
    }, 2],
    // Milliseconds. 2 digits.
    t: ["[ap]", setAMPM, "ampm", getAMPM, 1],
    // Lowercase, single-character time marker string: a or p.
    tt: ["[ap]m", setAMPM, "ampm", getAMPM, 2],
    // two-character time marker string: am or pm.
    T: ["[AP]", setAMPM, "ampm", getAMPM, 1],
    // single-character time marker string: A or P.
    TT: ["[AP]M", setAMPM, "ampm", getAMPM, 2],
    // two-character time marker string: AM or PM.
    Z: [".*", undefined, "Z", getTimeZoneAbbreviated],
    // US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
    o: [""],
    // GMT/UTC timezone offset, e.g. -0500 or +0230.
    S: [function (opts) {
      return i18nOf(opts).ordinalSuffix.join("|");
    }] // The date's ordinal suffix (st, nd, rd, or th).
  };
  function formatcode(match) {
    const fcMatch = formatCodeAlias[match] || match,
      dynMatches = /\d+$/.exec(fcMatch);
    if (dynMatches && dynMatches[0] !== undefined) {
      const fcode = formatCode[fcMatch[0] + "x"].slice("");
      fcode[0] = fcode[0](dynMatches[0]);
      fcode[3] = fcode[3](dynMatches[0]);
      return fcode;
    } else if (formatCode[fcMatch]) {
      return formatCode[fcMatch];
    }
    return undefined;
  }

  // the regex part of a format code can be a function of the options (i18n)
  function formatcodeRegex(fcode, opts) {
    return typeof fcode[0] === "function" ? fcode[0](opts) : fcode[0];
  }
  function getTokenizer(opts) {
    if (!opts.tokenizer) {
      const tokens = [],
        dyntokens = [],
        formatCodeKeys = Object.keys(formatCode).concat(Object.keys(formatCodeAlias));
      for (const ndx of formatCodeKeys) {
        if (/\.*x$/.test(ndx)) {
          const dynToken = ndx[0] + "\\d+";
          if (dyntokens.indexOf(dynToken) === -1) {
            dyntokens.push(dynToken);
          }
        } else if (tokens.indexOf(ndx[0]) === -1) {
          tokens.push(ndx[0]);
        }
      }
      opts.tokenizer = "(" + (dyntokens.length > 0 ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + "+)+?|.";
      opts.tokenizer = new RegExp(opts.tokenizer, "g");
    }
    return opts.tokenizer;
  }
  function prefillYear(dateParts, currentResult, opts) {
    if (dateParts.year !== dateParts.rawyear) {
      const crrntyear = currentYear.toString(),
        enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""),
        currentYearPart = crrntyear.slice(0, enteredPart.length),
        currentYearNextPart = crrntyear.slice(enteredPart.length);
      if (enteredPart.length === 2 && enteredPart === currentYearPart) {
        const entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
        if (dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime())) {
          // update dateParts
          dateParts.date.setFullYear(currentYear);
          dateParts.year = crrntyear;
          // update result
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
    const inputmask = this;
    if (!useDateObject) return true;
    if (dateParts.rawday === undefined || !isFinite(dateParts.rawday) && new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day || dateParts.day == "29" && (!isFinite(dateParts.rawyear) || dateParts.rawyear === undefined || dateParts.rawyear === "") || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) {
      return currentResult;
    } else {
      // take corrective action if possible
      if (dateParts.day == "29") {
        const tokenMatch = getTokenMatch.call(inputmask, currentResult.pos, opts, inputmask.maskset);
        if (tokenMatch.targetMatch && ["yyyy", "YYYY"].includes(tokenMatch.targetMatch[0]) && currentResult.pos - tokenMatch.targetMatchIndex === 2) {
          currentResult.remove = currentResult.pos + 1;
          return currentResult;
        }
      } else if (dateParts.date.getMonth() == 2 && dateParts.day == "30" && currentResult.c !== undefined) {
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
        currentResult.caret = seekNext.call(this, currentResult.pos + 1);
        return currentResult;
      }
      return false;
    }
  }
  function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
    if (!result) return result;
    if (result && opts.min) {
      if (/* useDateObject && (dateParts["year"] === undefined || dateParts["yearSet"]) && */!isNaN(opts.min.date.getTime())) {
        let match;
        dateParts.reset();
        getTokenizer(opts).lastIndex = 0;
        while (match = getTokenizer(opts).exec(opts.inputFormat)) {
          let fcode;
          if (fcode = formatcode(match[0])) {
            if (fcode[3]) {
              const setFn = fcode[1],
                current = dateParts[fcode[2]],
                minVal = opts.min[fcode[2]],
                maxVal = opts.max ? opts.max[fcode[2]] : minVal + 1;
              let curVal = [],
                forceCurrentValue = false;
              for (let i = 0; i < minVal.length; i++) {
                if (maskset.validPositions[i + match.index] === undefined && !forceCurrentValue) {
                  if (i + match.index == 0 && current[i] < minVal[i]) {
                    curVal[i] = current[i];
                    forceCurrentValue = true;
                  } else {
                    curVal[i] = minVal[i];
                  }
                  // ADD +1 to whole
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

  // parse the given format and return a mask pattern
  // when a dateObjValue is passed a datestring in the requested format is returned
  function parse(format, dateObjValue, opts) {
    // parse format to regex string
    let mask = "",
      match,
      fcode,
      ndx = 0,
      escaped = false;
    const placeHolder = {};
    getTokenizer(opts).lastIndex = 0;
    while (match = getTokenizer(opts).exec(format)) {
      if (match[0] === opts.escapeChar) {
        escaped = true;
      } else {
        if (dateObjValue === undefined) {
          if (!escaped && (fcode = formatcode(match[0]))) {
            mask += "(" + formatcodeRegex(fcode, opts) + ")";
            // map placeholder to placeholder object and set placeholder mappings
            if (opts.placeholder && opts.placeholder !== "") {
              placeHolder[ndx] = opts.placeholder[match.index % opts.placeholder.length];
              // internal use of datetime alias
              placeHolder[`${match.index}'${opts.placeholder[match.index % opts.placeholder.length]}`] = match[0].charAt(0);
            } else {
              placeHolder[ndx] = match[0].charAt(0);
            }
          } else {
            switch (match[0]) {
              case "[":
                mask += "(";
                break;
              case "]":
                mask += ")?";
                break;
              default:
                mask += escapeRegex(match[0]);
                placeHolder[ndx] = match[0].charAt(0);
            }
          }
        } else {
          if (!escaped && (fcode = formatcode(match[0]))) {
            if (fcode[3] && dateObjValue["partial" + fcode[2]] !== true) {
              const getFn = fcode[3];
              mask += getFn.call(dateObjValue.date, opts);
            } else if (fcode[2] && dateObjValue["raw" + fcode[2]] !== undefined) {
              mask += dateObjValue["raw" + fcode[2]];
            } else {
              mask += match[0];
            }
          } else {
            mask += match[0];
          }
        }
        ndx++;
        escaped = false;
      }
    }
    if (dateObjValue === undefined) {
      // console.log(JSON.stringify(placeHolder));
      opts.placeholder = placeHolder;
    }
    return mask;
  }

  // padding function
  function pad(val, len, right) {
    val = String(val);
    len = len || 2;
    while (val.length < len) val = right ? val + "0" : "0" + val;
    return val;
  }
  function analyseMask(mask, format, opts) {
    const inputmask = this;
    if (typeof mask === "string") {
      return new DateObject(mask, format, opts, inputmask);
    } else if (mask && typeof mask === "object" && Object.prototype.hasOwnProperty.call(mask, "date")) {
      return mask;
    } else if (mask instanceof Date) {
      return new DateObject(importDate(mask, opts), format, opts, inputmask);
    }
    return undefined;
  }
  function importDate(dateObj, opts) {
    return parse(opts.inputFormat, {
      date: dateObj
    }, opts);
  }
  function getTokenMatch(pos, opts, maskset) {
    const inputmask = this;
    let calcPos = 0,
      targetMatch,
      match,
      matchLength = 0;
    getTokenizer(opts).lastIndex = 0;
    while (match = getTokenizer(opts).exec(opts.inputFormat)) {
      // console.log(`match.index ${match.index}`);
      const dynMatches = /\d+$/.exec(match[0]);
      if (dynMatches) {
        matchLength = parseInt(dynMatches[0]);
      } else {
        const targetSymbol = match[0][0];
        let ndx = calcPos;
        while (inputmask && (opts.placeholder[`${match.index}'${getTest.call(inputmask, ndx).match.placeholder}`] || getTest.call(inputmask, ndx).match.placeholder) === targetSymbol) {
          ndx++;
        }
        matchLength = ndx - calcPos;
        if (matchLength === 0) matchLength = match[0].length;
      }
      calcPos += matchLength;
      // console.log(`calcPos ${calcPos}`);

      if (calcPos >= pos + 1) {
        let masksetHint = "";
        if (maskset && maskset.tests[pos]) {
          const filteredPlaceholders = Object.keys(opts.placeholder).filter(value => {
            for (let i = match.index - 1; i < calcPos; i++) {
              if (value === `${i}'${maskset.tests[pos][0].match.placeholder}`) {
                return true;
              }
            }
            return false;
          });
          masksetHint = filteredPlaceholders.length > 0 ? opts.placeholder[filteredPlaceholders[0]] : maskset.tests[pos][0].match.placeholder;
        }
        // console.log(masksetHint);
        if (match[0].indexOf(masksetHint) !== -1) {
          // console.log(`match ${masksetHint} ${calcPos} >= ${pos + 1}`);
          targetMatch = match;
          match = getTokenizer(opts).exec(opts.inputFormat);
          break;
        }
      }
    }
    return {
      targetMatchIndex: calcPos - matchLength,
      nextMatch: match,
      targetMatch
    };
  }
  const datetimeAlias = {
    mask: function (opts) {
      // do not allow numeric input in datetime alias
      opts.numericInput = false;

      // Merge user-provided i18n with defaults
      opts.i18n = mergeI18n(opts.i18n);
      opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat; // resolve possible formatAlias
      if (opts.repeat) {
        opts.repeat = parseInt(opts.repeat.toString());
        if (opts.repeat > 0) {
          let inputFormat = "";
          for (let i = 0; i < opts.repeat; i++) {
            inputFormat = inputFormat + opts.inputFormat;
          }
          opts.inputFormat = inputFormat;
          opts.repeat = 0;
        }
      }
      opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat; // resolve possible formatAlias
      opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat; // resolve possible formatAlias
      // opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, "");
      opts.regex = parse(opts.inputFormat, undefined, opts);
      // console.log("inputFormat", opts.regex);
      opts.min = analyseMask(opts.min, opts.inputFormat, opts);
      opts.max = analyseMask(opts.max, opts.inputFormat, opts);
      return null; // migrate to regex mask
    },
    placeholder: "",
    // set default as none (~ auto); when a custom placeholder is passed it will be used
    inputFormat: "isoDateTime",
    // format used to input the date
    displayFormat: null,
    // visual format when the input looses focus
    outputFormat: null,
    // unmasking format
    min: null,
    // needs to be in the same format as the inputfornat
    max: null,
    // needs to be in the same format as the inputfornat,
    skipOptionalPartCharacter: "",
    preValidation: function (buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
      const inputmask = this;
      if (strict) return true;
      if (isNaN(c) && buffer[pos] !== c) {
        const tokenMatch = getTokenMatch.call(inputmask, pos, opts, maskset);
        if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && tokenMatch.targetMatch[0].length > 1) {
          const validator = formatcodeRegex(formatcode(tokenMatch.targetMatch[0]), opts);
          if (new RegExp(validator).test("0" + buffer[pos - 1])) {
            buffer[pos] = buffer[pos - 1];
            buffer[pos - 1] = "0";
            return {
              fuzzy: true,
              buffer,
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
    postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
      const inputmask = this,
        {
          _buffer
        } = inputmask.maskset,
        posBegin = typeof pos === "object" ? pos.begin : pos,
        posEnd = typeof pos === "object" ? pos.end : pos,
        selectionReplace = posEnd - posBegin;
      pos = {
        begin: posBegin,
        end: posEnd
      };
      if (strict) return true;
      let tokenMatch, validator;
      if (currentResult === false) {
        // try some shifting
        tokenMatch = getTokenMatch.call(inputmask, pos.begin + 1, opts, maskset);
        if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos.begin && tokenMatch.targetMatch[0].length > 1 && formatcode(tokenMatch.targetMatch[0]) !== undefined) {
          validator = formatcodeRegex(formatcode(tokenMatch.targetMatch[0]), opts);
        } else {
          tokenMatch = getTokenMatch.call(inputmask, pos.begin + 2, opts, maskset);
          if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos.begin + 1 && tokenMatch.targetMatch[0].length > 1 && formatcode(tokenMatch.targetMatch[0]) !== undefined) {
            validator = formatcodeRegex(formatcode(tokenMatch.targetMatch[0]), opts);
          }
        }
        if (validator !== undefined) {
          // correct position ~ pos in front of shifted targetMatch
          pos.begin = tokenMatch.targetMatchIndex;
          if (maskset.validPositions[pos.begin + 1] !== undefined && new RegExp(validator).test(c + "0")) {
            if (selectionReplace > 0) {
              // restore the template for the replaced selection and drop stale positions
              buffer.splice(pos.begin, selectionReplace, ..._buffer.slice(pos.begin, pos.begin + selectionReplace));
              for (let i = pos.begin; i < pos.begin + selectionReplace; i++) delete maskset.validPositions[i];
            }
            buffer[pos.begin] = c;
            buffer[pos.begin + 1] = "0";
            currentResult = {
              // insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
              pos: pos.begin + 2,
              // this will triggeer a refreshfrombuffer
              caret: pos.begin + 1
            };
          } else if (new RegExp(validator).test("0" + c)) {
            // remove selection and refill with _buffer template
            if (selectionReplace > 0) {
              buffer.splice(pos.begin, selectionReplace, ..._buffer.slice(pos.begin, pos.begin + selectionReplace));
              for (let i = pos.begin; i < pos.begin + selectionReplace; i++) delete maskset.validPositions[i];
            }
            buffer[pos.begin] = "0";
            buffer[pos.begin + 1] = c;
            currentResult = {
              // insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
              pos: pos.begin + 2 // this will triggeer a refreshfrombuffer
            };
          }
        }
        if (currentResult === false) return currentResult;
      }
      if (currentResult.fuzzy) {
        buffer = currentResult.buffer;
        pos = {
          begin: currentResult.pos,
          end: currentResult.pos
        };
      }

      // full validate target
      tokenMatch = getTokenMatch.call(inputmask, pos.begin, opts, maskset);
      if (tokenMatch.targetMatch && tokenMatch.targetMatch[0] && formatcode(tokenMatch.targetMatch[0]) !== undefined) {
        const fcode = formatcode(tokenMatch.targetMatch[0]);
        validator = formatcodeRegex(fcode, opts);
        const part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
        if (new RegExp(validator).test(part.join("")) === false && tokenMatch.targetMatch[0].length === 2 && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1]) {
          if (pos.begin === tokenMatch.targetMatchIndex) {
            // first char of a 2-char group typed over a stale second char that
            // makes the combination invalid: clear the second position so it can
            // be typed freely instead of auto-correcting to "0" (issue #550)
            const tpl = getMaskTemplate.call(inputmask, false, 1, undefined, true);
            delete maskset.validPositions[tokenMatch.targetMatchIndex + 1];
            buffer[tokenMatch.targetMatchIndex + 1] = tpl[tokenMatch.targetMatchIndex + 1];
          } else {
            const staleIdx = tokenMatch.targetMatchIndex + 1;
            maskset.validPositions[staleIdx] = DependencyLib.extend(true, {}, maskset.validPositions[staleIdx], {
              input: "0"
            });
          }
        }
        if (fcode[2] == "year") {
          // Clear the rest of the year while it is being retyped, so a half typed year does not
          // keep validating against the previous digits. Bounded to the year token: running to
          // buffer.length wiped every segment behind it, and splicing shifted those positions
          // down instead of clearing them.
          const _buffer = getMaskTemplate.call(inputmask, false, 1, undefined, true),
            yearEnd = tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length;
          for (let i = pos.begin + 1; i < yearEnd; i++) {
            buffer[i] = _buffer[i];
            delete maskset.validPositions[i];
          }
        }
      }
      let result = currentResult;
      const dateParts = analyseMask.call(inputmask, buffer.join(""), opts.inputFormat, opts);
      if (result && !isNaN(dateParts.date.getTime())) {
        // check for a valid date ~ an invalid date returns NaN which isn't equal
        if (opts.prefillYear) result = prefillYear(dateParts, result, opts);
        result = isValidDate.call(inputmask, dateParts, result, opts);
        result = isDateInRange(dateParts, result, opts, maskset);
      }
      if (pos !== undefined && result && currentResult.pos !== pos.begin) {
        return {
          buffer: parse(opts.inputFormat, dateParts, opts).split(""),
          refreshFromBuffer: {
            start: pos.begin,
            end: currentResult.pos
          },
          pos: currentResult.caret !== undefined ? currentResult.caret : currentResult.pos // correct caret position
        };
      }
      return result;
    },
    onKeyDown: function (e, buffer, caretPos, opts) {
      const input = this;
      if (e.ctrlKey && e.key === keys.ArrowRight) {
        input.inputmask._valueSet(importDate(new Date(), opts));
        DependencyLib(input).trigger("setvalue");
      }
    },
    onUnMask: function (maskedValue, unmaskedValue, opts) {
      const inputmask = this;
      return unmaskedValue ? parse(opts.outputFormat, analyseMask.call(inputmask, maskedValue, opts.inputFormat, opts), opts) : unmaskedValue;
    },
    casing: "follow",
    onBeforeMask: function (initialValue, opts) {
      if (Object.prototype.toString.call(initialValue) === "[object Date]") {
        initialValue = importDate(initialValue, opts);
      } else if (typeof initialValue === "string" && opts.outputFormat !== opts.inputFormat) {
        // accept whole values written in the outputFormat (e.g. by a datepicker
        // setting input.value natively) next to values already in the inputFormat;
        // the value is converted only when it unmistakeably matches a format
        const matches = (dateParts, format) => dateParts !== undefined && !isNaN(dateParts.date.getTime()) && parse(format, dateParts, opts) === initialValue,
          inFormat = analyseMask.call(this, initialValue, opts.inputFormat, opts);
        if (!matches(inFormat, opts.inputFormat)) {
          const outFormat = analyseMask(initialValue, opts.outputFormat, opts);
          if (matches(outFormat, opts.outputFormat)) initialValue = importDate(outFormat.date, opts);
        }
      }
      return initialValue;
    },
    insertMode: false,
    insertModeToggle: false,
    // insertMode is fixed for date/datetime - don't let the INSERT key flip it
    insertModeVisual: false,
    shiftPositions: false,
    keepStatic: false,
    inputmode: "numeric",
    prefillYear: true // Allows to disable prefill for datetime year.
  };

  // Export helper functions for UMD bundle
  function setAMPM(value) {
    const hours = this.getHours();
    if (value.toLowerCase().includes("p")) {
      this.setHours(hours + 12);
    } else if (value.toLowerCase().includes("a") && hours >= 12) {
      this.setHours(hours - 12);
    }
  }
  function getAMPM() {
    const date = this;
    let hours = date.getHours();
    hours = hours || 12;
    return hours >= 12 ? "PM" : "AM";
  }
  function getTimeZoneAbbreviated() {
    // not perfect, but ok for now
    const date = this;
    let {
      1: tz
    } = date.toString().match(/\((.+)\)/);
    if (tz.includes(" ")) {
      tz = tz.replace("-", " ").toUpperCase();
      tz = tz.split(" ").map(([first]) => first).join("");
    }
    return tz;
  }
  function datetime(options) {
    return DependencyLib.extend(true, {}, datetimeAlias, options);
  }
  function registerDatetime() {
    DependencyLib.extend(true, aliases, {
      datetime: datetime()
    });
  }

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */

  // extra definitions
  function definitions(options) {
    return DependencyLib.extend(true, {
      A: {
        validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
        casing: "upper" // auto uppercasing
      },
      "&": {
        // alfanumeric uppercasing
        validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
        casing: "upper"
      },
      "#": {
        // hexadecimal
        validator: "[0-9A-Fa-f]",
        casing: "upper"
      }
    }, options);
  }
  function registerDefinitions() {
    DependencyLib.extend(true, definitions$1, definitions());
  }

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */
  function email(options) {
    return DependencyLib.extend(true, {
      // https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
      // https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
      // should be extended with the toplevel domains at the end
      mask: function ({
        separator,
        quantifier
      }) {
        const emailMask = "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]";
        let mask = emailMask;
        if (separator) {
          for (let i = 0; i < quantifier; i++) {
            mask += `[${separator}${emailMask}]`;
          }
        }
        return mask;
      },
      greedy: false,
      casing: "lower",
      separator: null,
      quantifier: 5,
      skipOptionalPartCharacter: "",
      onBeforePaste: function (pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
      },
      definitions: {
        "*": {
          validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5!#$%&'*+/=?^_`{|}~-]"
        },
        "-": {
          validator: "[0-9A-Za-z-]"
        }
      },
      onUnMask: function (maskedValue, unmaskedValue, opts) {
        return maskedValue;
      },
      inputmode: "email"
    }, options);
  }
  function registerEmail() {
    DependencyLib.extend(true, aliases, {
      email: email()
    });
  }

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */
  const ipValidatorRegex = /25[0-5]|2[0-4][0-9]|[01][0-9][0-9]/;
  function ipValidator(chrs, maskset, pos, strict, opts) {
    if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
      chrs = maskset.buffer[pos - 1] + chrs;
      if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
        chrs = maskset.buffer[pos - 2] + chrs;
      } else chrs = "0" + chrs;
    } else chrs = "00" + chrs;
    if (opts.greedy && parseInt(chrs) > 255 && ipValidatorRegex.test("00" + chrs.charAt(2))) {
      const buffer = [...maskset.buffer.slice(0, pos), ".", chrs.charAt(2)];
      if (buffer.join("").match(/\./g).length < 4) {
        return {
          refreshFromBuffer: true,
          buffer,
          caret: pos + 2
        };
      }
    }
    return ipValidatorRegex.test(chrs);
  }
  function ip(options) {
    return DependencyLib.extend(true, {
      // ip-address mask
      mask: "i{1,3}.j{1,3}.k{1,3}.l{1,3}",
      definitions: {
        i: {
          validator: ipValidator
        },
        j: {
          validator: ipValidator
        },
        k: {
          validator: ipValidator
        },
        l: {
          validator: ipValidator
        }
      },
      onUnMask: function (maskedValue, unmaskedValue, opts) {
        return maskedValue;
      },
      inputmode: "decimal",
      substitutes: {
        ",": "."
      }
    }, options);
  }
  function registerIp() {
    DependencyLib.extend(true, aliases, {
      ip: ip()
    });
  }

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */
  function mac(options) {
    return DependencyLib.extend(true, {
      mask: "##:##:##:##:##:##"
    }, definitions, options);
  }
  function registerMac() {
    registerDefinitions();
    DependencyLib.extend(true, aliases, {
      mac: mac()
    });
  }

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */

  // resolved on every call so a definition extended at runtime is honoured
  function isDigit(chr) {
    return new RegExp(definitions$1["9"].validator, "u").test(chr);
  }
  function autoEscape(txt, opts) {
    let escapedTxt = "";
    for (let i = 0; i < txt.length; i++) {
      if (definitions$1[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i)) {
        escapedTxt += "\\" + txt.charAt(i);
      } else {
        escapedTxt += txt.charAt(i);
      }
    }
    return escapedTxt;
  }
  function alignDigits(buffer, digits, opts, force) {
    let negationBack = false;
    if (buffer.length > 0 && digits > 0 && (!opts.digitsOptional || force)) {
      let radixPosition = buffer.indexOf(opts.radixPoint);
      if (opts.negationSymbol.back === buffer[buffer.length - 1]) {
        negationBack = true;
        buffer.length--;
      }
      if (radixPosition === -1) {
        buffer.push(opts.radixPoint);
        radixPosition = buffer.length - 1;
      }
      for (let i = 1; i <= digits; i++) {
        if (!isFinite(buffer[radixPosition + i])) {
          buffer[radixPosition + i] = "0";
        }
      }
    }
    if (negationBack) buffer.push(opts.negationSymbol.back);
    return buffer;
  }
  function unmaskAsNumber(str, opts) {
    return opts.onUnMask(str, undefined, DependencyLib.extend({}, opts, {
      unmaskAsNumber: true
    }));
  }

  // onUnMask's text form, whatever the unmaskAsNumber option says
  function unmaskAsString(str, opts) {
    return opts.onUnMask(str, undefined, DependencyLib.extend({}, opts, {
      unmaskAsNumber: false
    }));
  }
  function boundaryBuffer(bound, opts) {
    // 5.x: the boundary keeps opts.digits only when they are not optional
    // (alignDigits pads when !opts.digitsOptional); with digitsOptional the
    // clamped value keeps its integer form.
    return alignDigits(bound.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse();
  }
  function findValidator(symbol, maskset) {
    let posNdx = 0;
    if (symbol === "+") {
      posNdx = seekNext.call(this, maskset.validPositions.length - 1);
    }
    for (let tstNdx in maskset.tests) {
      tstNdx = parseInt(tstNdx);
      if (tstNdx >= posNdx) {
        for (let ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) {
          if ((maskset.validPositions[tstNdx] === undefined || symbol === "-") && maskset.tests[tstNdx][ndx].match.def === symbol) {
            return tstNdx + (maskset.validPositions[tstNdx] !== undefined && symbol !== "-" ? 1 : 0);
          }
        }
      }
    }
    return posNdx;
  }
  function findValid(symbol, maskset) {
    let ret = -1;
    for (let ndx = 0, vpl = maskset.validPositions.length; ndx < vpl; ndx++) {
      const tst = maskset.validPositions[ndx];
      if (tst && tst.match.def === symbol) {
        ret = ndx;
        break;
      }
    }
    return ret;
  }

  // a negation placeholder, not a literal sign inside the prefix or suffix
  function hasNegationPart(maskset, def) {
    return maskset.validPositions.some(vp => vp && vp.match.static !== true && vp.match.def === def);
  }
  function isNegated(maskset) {
    return hasNegationPart(maskset, "+") || hasNegationPart(maskset, "-");
  }

  // does the value render the number the empty mask renders, or nothing at all.
  // jitMasking leaves the affixes out of the buffer until they are reached, so
  // when the wrapper cannot parse what is there, ask the mask instead: a digit
  // belonging to the prefix or suffix is not a number the user entered
  function holdsNoNumber(buffer, maskset, opts) {
    const number = matchNumberInWrapper(buffer, opts);
    if (number === null) {
      return !maskset.validPositions.some(vp => vp && vp.match.static !== true && isDigit(vp.input));
    }
    return number === "" || number === matchNumberInWrapper(maskset._buffer, opts);
  }
  function parseMinMaxOptions(opts) {
    if (opts.parseMinMaxOptions === undefined) {
      // convert min and max options
      if (opts.min !== null) {
        opts.min = opts.min.toString().replace(new RegExp(escapeRegex(opts.groupSeparator), "g"), "");
        if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
        opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
        if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
      }
      if (opts.max !== null) {
        opts.max = opts.max.toString().replace(new RegExp(escapeRegex(opts.groupSeparator), "g"), "");
        if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
        opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
        if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
      }
      opts.parseMinMaxOptions = "done";
    }
  }
  function genMask(opts) {
    opts.repeat = 0;
    // treat equal separator and radixpoint
    if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
      if (opts.radixPoint === ".") {
        opts.groupSeparator = ",";
      } else if (opts.radixPoint === ",") {
        opts.groupSeparator = ".";
      } else {
        opts.groupSeparator = "";
      }
    }
    // prevent conflict with default skipOptionalPartCharacter
    if (opts.groupSeparator === " ") {
      opts.skipOptionalPartCharacter = undefined;
    }

    // enforce placeholder to single
    if (opts.placeholder !== undefined && opts.placeholder.length > 1) {
      opts.placeholder = opts.placeholder.charAt(0);
    }
    // only allow radixfocus when placeholder = 0
    if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "") {
      opts.positionCaretOnClick = "lvp";
    }
    let decimalDef = "0",
      radixPointDef = opts.radixPoint;
    if (opts.numericInput === true && opts.__financeInput === undefined) {
      // finance people input style
      decimalDef = "1";
      opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
      opts.digitsOptional = false;
      if (isNaN(opts.digits)) opts.digits = opts.digits.indexOf(",") !== -1 ? opts.digits.split(",")[0] : 2;
      opts._radixDance = false;
      radixPointDef = opts.radixPoint === "," ? "?" : "!";
      if (opts.radixPoint !== "" && opts.definitions[radixPointDef] === undefined) {
        // update separator definition
        opts.definitions[radixPointDef] = {};
        opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]";
        opts.definitions[radixPointDef].placeholder = opts.radixPoint;
        opts.definitions[radixPointDef].static = true;
        opts.definitions[radixPointDef].generated = true; // forced marker as generated input
      }
    } else {
      opts.__financeInput = false; // needed to keep original selection when remasking
      opts.numericInput = true;
    }

    // Register the groupSeparator as a definition *before* escaping prefix/suffix
    // so that a groupSeparator character appearing inside the prefix or suffix
    // (e.g. prefix: "€ " with groupSeparator: " ") is escaped as a literal instead
    // of being picked up by the lexer as a dynamic placeholder. Fixes #2262.
    if (opts.groupSeparator !== "" && opts.definitions[opts.groupSeparator] === undefined) {
      opts.definitions[opts.groupSeparator] = {
        validator: "[" + opts.groupSeparator + "]",
        placeholder: opts.groupSeparator,
        static: true,
        generated: true // forced marker as generated input
      };
    }
    let mask = "[+]",
      altMask;
    mask += autoEscape(opts.prefix, opts);
    if (opts.groupSeparator !== "") {
      mask += opts._mask(opts);
    } else {
      mask += "9{+}";
    }
    if (opts.digits !== undefined && opts.digits !== 0) {
      const dq = opts.digits.toString().split(",");
      if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
        mask += radixPointDef + decimalDef + "{" + opts.digits + "}";
      } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
        if (opts.digitsOptional || opts.jitMasking) {
          altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}";
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
      opts.keepStatic = true;
      mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask];
    }
    opts.greedy = false; // enforce greedy false

    parseMinMaxOptions(opts);
    if (opts.radixPoint !== "" && opts.substituteRadixPoint) opts.substitutes[opts.radixPoint == "." ? "," : "."] = opts.radixPoint;
    // console.log(mask);
    return mask;
  }
  function handleRadixDance(pos, c, radixPos, maskset, opts) {
    if (opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back) {
      if (pos <= radixPos && (radixPos > 0 || c == opts.radixPoint) && (maskset.validPositions[pos - 1] === undefined || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back)) {
        pos -= 1;
      }
    }
    return pos;
  }
  function decimalValidator(chrs, maskset, pos, strict, opts) {
    const radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
      result = (radixPos !== -1 || strict && opts.jitMasking) && new RegExp(definitions$1["9"].validator, "u").test(chrs);
    if (!strict && opts._radixDance && radixPos !== -1 && result && maskset.validPositions[radixPos] == undefined) {
      return {
        insert: {
          pos: radixPos === pos ? radixPos + 1 : radixPos,
          c: opts.radixPoint,
          fromIsValid: true
        },
        pos
      };
    }
    return result;
  }

  // Match the numeric body of the (reversed) buffer against the prefix/suffix
  // wrapper, returning the captured "number" group or null if the match fails.
  function matchNumberInWrapper(buffer, opts) {
    const match = new RegExp("(^" + (opts.negationSymbol.front !== "" ? "(?:" + escapeRegex(opts.negationSymbol.front) + ")?" : "") + escapeRegex(opts.prefix) + ")(.*?)(" + escapeRegex(opts.suffix) + (opts.negationSymbol.back !== "" ? "(?:" + escapeRegex(opts.negationSymbol.back) + ")?" : "") + "$)").exec(buffer.slice().reverse().join(""));
    return match ? match[2] : null;
  }
  function checkForLeadingZeroes(buffer, opts) {
    let number = matchNumberInWrapper(buffer, opts) ?? "",
      leadingzeroes = false;
    if (number) {
      number = number.split(opts.radixPoint.charAt(0))[0];
      leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number);
    }
    return leadingzeroes && (leadingzeroes[0].length > 1 || leadingzeroes[0].length > 0 && leadingzeroes[0].length < number.length) ? leadingzeroes : false;
  }

  // number aliases
  const numericAlias = {
      mask: genMask,
      _mask: function (opts) {
        return "(" + opts.groupSeparator + "999){+|1}";
      },
      digits: "*",
      // number of fractionalDigits
      digitsOptional: true,
      enforceDigitsOnBlur: false,
      radixPoint: ".",
      positionCaretOnClick: "radixFocus",
      _radixDance: true,
      groupSeparator: "",
      allowMinus: true,
      negationSymbol: {
        front: "-",
        // "("
        back: "" // ")"
      },
      prefix: "",
      suffix: "",
      min: null,
      // minimum value
      max: null,
      // maximum value
      setMinMaxOnOverflow: false,
      step: 1,
      inputType: "text",
      // number ~ specify that values which are set are in textform (radix point  is same as in the options) or in numberform (radixpoint = .)
      unmaskAsNumber: false,
      roundingFN: Math.round,
      // Math.floor ,  fn(x)
      inputmode: "decimal",
      shortcuts: {
        k: "1000",
        m: "1000000"
      },
      // global options
      placeholder: "0",
      greedy: false,
      rightAlign: true,
      insertMode: true,
      autoUnmask: false,
      skipOptionalPartCharacter: "",
      stripLeadingZeroes: true,
      substituteRadixPoint: true,
      definitions: {
        0: {
          validator: decimalValidator
        },
        1: {
          validator: decimalValidator,
          definitionSymbol: "9"
        },
        "+": {
          validator: function (chrs, maskset, pos, strict, opts) {
            return opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front);
          }
        },
        "-": {
          validator: function (chrs, maskset, pos, strict, opts) {
            return opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.back);
          }
        }
      },
      preValidation: function (buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
        const inputmask = this;
        if (opts.__financeInput !== false && c === opts.radixPoint) return false;
        const radixPos = buffer.indexOf(opts.radixPoint),
          initPos = pos;
        pos = handleRadixDance(pos, c, radixPos, maskset, opts);
        if (c === "-" || c === opts.negationSymbol.front) {
          if (opts.allowMinus !== true) return false;
          let isNegative = false;
          const front = findValid("+", maskset),
            back = findValid("-", maskset);
          if (front !== -1) {
            isNegative = [front];
            if (back !== -1) isNegative.push(back);
          }
          const checkMax = isNegative !== false && opts.max !== null,
            checkMin = isNegative === false && opts.min !== null;
          // Reject typing "-" against a non-negative min — alignDigits would
          // pad the orphan sign to "-0". setMinMaxOnOverflow=true has its own
          // boundary refresh in postValidation.
          if (!opts.setMinMaxOnOverflow && checkMin && opts.min >= 0) return false;
          // A sign flip out of range: setMinMaxOnOverflow puts the boundary it
          // crossed in the field, as an overflowing keystroke does, otherwise
          // the keystroke is refused. postValidation's range check doesn't fire
          // after the validator's `{remove: ...}` return (toggle-off path), so
          // the flip has to be caught here. #2846
          if ((checkMax || checkMin) && this.maskset.validPositions.length > 0) {
            const absVal = Math.abs(unmaskAsNumber(buffer.slice().reverse().join(""), opts));
            if (checkMax && absVal > opts.max || checkMin && -absVal < opts.min) {
              if (!opts.setMinMaxOnOverflow) return false;
              return {
                refreshFromBuffer: true,
                buffer: boundaryBuffer(checkMax ? opts.max : opts.min, opts)
              };
            }
          }
          return isNegative !== false ? {
            remove: isNegative,
            caret: initPos - opts.negationSymbol.back.length
          } : {
            insert: [{
              pos: findValidator.call(inputmask, "+", maskset),
              c: opts.negationSymbol.front,
              fromIsValid: true,
              strict: strict !== undefined ? strict : false
            }, {
              pos: findValidator.call(inputmask, "-", maskset),
              c: opts.negationSymbol.back,
              fromIsValid: undefined,
              strict: strict !== undefined ? strict : false
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
          const radixValidatorPos = findValidator.call(inputmask, opts.radixPoint, maskset);
          if (maskset.validPositions[radixValidatorPos]) {
            maskset.validPositions[radixValidatorPos] = DependencyLib.extend(true, {}, maskset.validPositions[radixValidatorPos], {
              generatedInput: maskset.validPositions[radixValidatorPos].generated || false
            });
          }
          return {
            caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
          };
        }
        if (opts.__financeInput === false) {
          if (isSelection) {
            if (opts.digitsOptional) {
              // Full selection overwrite (covers entire value including suffix) lands on suffix position
              // in RTL. Target base mask units position instead.
              if (caretPos.end <= opts.suffix.length) {
                return {
                  rewritePosition: opts.suffix.length
                };
              }
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
          } else {
            if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && opts.digits > 0 && this.__valueGet.call(this.el) === "") {
              return {
                rewritePosition: radixPos
              };
            }

            // Cursor placed at or before the prefix on a field with no digits
            // would otherwise fall through to alternation switching and land
            // in the decimal part (#2615)
            if (pos >= buffer.length - opts.prefix.length && opts.radixPoint !== "") {
              const digitTest = new RegExp(definitions$1["9"].validator, "u");
              if (!maskset.validPositions.some(vp => vp && !vp.generatedInput && digitTest.test(vp.input))) {
                return {
                  rewritePosition: radixPos !== -1 ? radixPos : 0
                };
              }
            }
          }
        }
        return {
          rewritePosition: pos
        };
      },
      postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval, fromAlternate) {
        if (currentResult === false) return currentResult;
        if (strict) return true;
        // A checkval write (setvalue, paste, initial value) is whole-value: accept
        // every char and let the final onBeforeWrite clamp normalize the boundary,
        // instead of rejecting overflow chars mid-write (which truncates the value).
        if (fromCheckval) return currentResult;
        if (opts.min !== null || opts.max !== null) {
          const unmasked = unmaskAsNumber(buffer.slice().reverse().join(""), opts);
          if (opts.min !== null && unmasked < opts.min && (fromAlternate !== true && typeof fromAlternate !== "number" || unmasked < 0) && (unmasked.toString().length > opts.min.toString().length ||
          // > instead of >= because we want to allow to type a bigger number
          buffer[0] === opts.radixPoint ||
          // disallow radixpoint when value is smaller than min
          unmasked < 0)) {
            return unmasked < 0 && opts.setMinMaxOnOverflow ? {
              refreshFromBuffer: true,
              buffer: boundaryBuffer(opts.min, opts)
            } : false;
          }
          if (opts.max !== null && opts.max >= 0 && unmasked > opts.max && !(typeof fromAlternate === "number" && fromAlternate > 1)) {
            return opts.setMinMaxOnOverflow ? {
              refreshFromBuffer: true,
              buffer: boundaryBuffer(opts.max, opts)
            } : false;
          }
        }
        return currentResult;
      },
      onUnMask: function (maskedValue, unmaskedValue, opts) {
        if (unmaskedValue === "" && opts.nullable === true) {
          return unmaskedValue;
        }
        let processValue = maskedValue.replace(opts.prefix, "");
        processValue = processValue.replace(opts.suffix, "");
        processValue = processValue.replace(new RegExp(escapeRegex(opts.groupSeparator), "g"), "");
        const placeholderChar = opts.placeholder !== undefined ? opts.placeholder.charAt(0) : "";
        if (placeholderChar !== "") {
          processValue = processValue.replace(new RegExp(placeholderChar, "g"), "0");
        }
        if (opts.unmaskAsNumber) {
          if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(escapeRegex.call(this, opts.radixPoint), ".");
          processValue = processValue.replace(new RegExp("^" + escapeRegex(opts.negationSymbol.front)), "-");
          processValue = processValue.replace(new RegExp(escapeRegex(opts.negationSymbol.back) + "$"), "");
          // a blank buffer, or a lone sign/radix, holds no number; Number("") is
          // 0, which a min/max check would mistake for a real 0 (#2863)
          const numberValue = Number(processValue);
          return /[0-9]/.test(processValue) ? numberValue : NaN;
        }
        return processValue;
      },
      isComplete: function (buffer, opts) {
        let maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
        maskedValue = maskedValue.replace(new RegExp("^" + escapeRegex(opts.negationSymbol.front)), "-");
        maskedValue = maskedValue.replace(new RegExp(escapeRegex(opts.negationSymbol.back) + "$"), "");
        maskedValue = maskedValue.replace(opts.prefix, "");
        maskedValue = maskedValue.replace(opts.suffix, "");
        maskedValue = maskedValue.replace(new RegExp(escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
        if (opts.radixPoint === ",") maskedValue = maskedValue.replace(escapeRegex(opts.radixPoint), ".");
        return isFinite(maskedValue);
      },
      onBeforeMask: function (initialValue, opts) {
        initialValue = initialValue ?? "";
        const radixPoint = opts.radixPoint || ",",
          originalValue = initialValue;
        if (isFinite(opts.digits)) opts.digits = parseInt(opts.digits);
        if ((typeof initialValue === "number" || opts.inputType === "number") && radixPoint !== "") {
          initialValue = initialValue.toString().replace(".", radixPoint);
        }
        const isNegative = initialValue.charAt(0) === "-" || initialValue.charAt(0) === opts.negationSymbol.front,
          valueParts = initialValue.split(radixPoint),
          integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
          decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "",
          forceDigits = valueParts.length > 1,
          // beyond Number.MAX_SAFE_INTEGER (9007199254740991, 16 digits) any
          // parseFloat/rounding or string min/max compare would collapse the
          // integer precision (#2715)
          isHuge = integerPart.replace("-", "").length > 15;
        initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);
        let digits = 0;
        if (radixPoint !== "") {
          digits = !opts.digitsOptional ? opts.digits : opts.digits < decimalPart.length ? opts.digits : decimalPart.length;
          if (decimalPart !== "" || !opts.digitsOptional) {
            if (isHuge) {
              // keep the incoming value as-is: numeric rounding would collapse it
              initialValue = originalValue;
            } else {
              const digitsFactor = Math.pow(10, digits || 1);

              // make the initialValue a valid javascript number for the parsefloat
              initialValue = initialValue.replace(escapeRegex(radixPoint), ".");
              if (!isNaN(parseFloat(initialValue))) {
                initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits);
              }
              initialValue = initialValue.toString().replace(".", radixPoint);
            }
          }
        }
        // this needs to be in a separate part and not directly in decimalPart to allow rounding
        if (opts.digits === 0 && initialValue.indexOf(radixPoint) !== -1) {
          initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint));
        }
        if (initialValue !== "" && !isHuge && (opts.min !== null || opts.max !== null)) {
          const numberValue = initialValue.toString().replace(radixPoint, ".");
          if (opts.min !== null && numberValue < opts.min) {
            initialValue = opts.min.toString().replace(".", radixPoint);
          } else if (opts.max !== null && numberValue > opts.max) {
            initialValue = opts.max.toString().replace(".", radixPoint);
          }
        }
        if (isNegative && initialValue.charAt(0) !== "-") {
          initialValue = "-" + initialValue;
        }
        return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
      },
      onBeforeWrite: function (e, buffer, caretPos, opts) {
        const inputmask = this,
          maskset = inputmask.maskset;
        function stripBuffer(buffer, stripRadix) {
          if (opts.__financeInput !== false || stripRadix) {
            const position = buffer.indexOf(opts.radixPoint);
            if (position !== -1) {
              buffer.splice(position, 1);
            }
          }
          if (opts.groupSeparator !== "") {
            let position;
            while ((position = buffer.indexOf(opts.groupSeparator)) !== -1) {
              buffer.splice(position, 1);
            }
          }
          return buffer;
        }
        function checkAlignment(buffer, result, opts) {
          result = result || {};
          const bffr = (result && result.buffer || buffer).slice().reverse();
          let radixPos = bffr.indexOf(opts.radixPoint);
          const digits = bffr.slice(radixPos + 1, radixPos + 1 + opts.digits),
            needsAlign = radixPos === -1 || digits.length < opts.digits || !digits.every(ch => isFinite(ch));
          if (needsAlign) {
            result.refreshFromBuffer = true;
            result.buffer = alignDigits(bffr.slice(), opts.digits, opts, true).reverse();
            const delta = result.buffer.length - bffr.length;
            if (delta > 0 && caretPos !== undefined) {
              result.caret = (caretPos.begin !== undefined ? caretPos.begin : caretPos) + delta;
              radixPos = result.buffer.indexOf(opts.radixPoint);
              if (result.caret > radixPos) result.caret = radixPos;
            }
          }
          return result;
        }
        let result, leadingzeroes;
        if (opts.stripLeadingZeroes && (leadingzeroes = checkForLeadingZeroes(buffer, opts))) {
          const caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1),
            offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0;
          for (let i = leadingzeroes[0].length - offset; i > 0; i--) {
            this.maskset.validPositions.splice(caretNdx + i, 1);
            buffer.splice(caretNdx + i, 1);
          }
        }

        // When the integer part has no digit yet (typing starts at the radix
        // point, e.g. ".5", or at a bare suffix, e.g. "%", which under
        // jitMasking has no placeholder), the leading zero is missing. Inject
        // it explicitly at the integer position instead of leaving a lonely
        // radix or suffix. #2561 #1810
        if (opts.jitMasking !== false && opts.jitMasking !== undefined && e && buffer.length > 0 && (typeof e.key === "string" && e.key.length === 1 || e.type === "input" && typeof e.data === "string" && e.data.length === 1)) {
          const number = matchNumberInWrapper(buffer, opts) ?? "",
            radixNdx = buffer.indexOf(opts.radixPoint),
            backLen = opts.negationSymbol.back.length,
            display = buffer.slice().reverse().join(""),
            isRadixStart = number.charAt(0) === opts.radixPoint.charAt(0) || number === "" && display.charAt(0) === opts.radixPoint.charAt(0),
            isBareSuffix = number === "" && opts.suffix !== "" && buffer.length === opts.suffix.length + backLen;
          if (isBareSuffix || isRadixStart && radixNdx !== -1) {
            // the buffer is reversed, so an integer digit goes directly behind
            // the radix, or behind the suffix (and the closing negation symbol
            // when the value is already negative) when there is no radix yet
            const injectNdx = isRadixStart ? radixNdx + 1 : opts.suffix.length + backLen;
            // place a real input digit, like the engine's own insert command
            isValid.call(inputmask, injectNdx, "0", true, true);
            buffer.splice(injectNdx, 0, "0");
          }
        }
        if (e) {
          switch (e.type) {
            case "blur":
            case "checkval":
            case "input":
              if ((opts.min !== null || opts.max !== null) && this.maskset.validPositions.length > 0) {
                const unmasked = unmaskAsNumber(buffer.slice().reverse().join(""), opts);
                // unmaskAsNumber is NaN when the buffer holds no number, so a
                // blank/whitespace value is not mistaken for a real 0 and clamped
                if (!isNaN(unmasked) && opts.min !== null && unmasked < opts.min) {
                  return {
                    refreshFromBuffer: true,
                    buffer: boundaryBuffer(opts.min, opts)
                  };
                } else if (!isNaN(unmasked) && opts.max !== null && unmasked > opts.max) {
                  return {
                    refreshFromBuffer: true,
                    buffer: boundaryBuffer(opts.max, opts)
                  };
                }
              }
              if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                // strip negation symbol on blur when value is 0. Match on the
                // raw buffer so a groupSeparator-colliding char inside the
                // prefix/suffix (e.g. space in "€ ") is preserved; normalize
                // only the extracted number group. Fixes #2262.
                const rawNumber = matchNumberInWrapper(buffer, opts);
                if (rawNumber !== null) {
                  let number = rawNumber.split(opts.groupSeparator).join("");
                  if (opts.radixPoint) number = number.replace(opts.radixPoint, ".");
                  if (number === "" || number == 0) {
                    result = {
                      refreshFromBuffer: true,
                      buffer: [0]
                    };
                  }
                }
              } else if (opts.radixPoint !== "") {
                // strip radixpoint on blur when it is the latest char
                const radixNDX = buffer.indexOf(opts.radixPoint);
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
              if (e && e.type === "blur" && (opts.enforceDigitsOnBlur || opts.digitsOptional === false && opts.jitMasking === false)) {
                result = checkAlignment(buffer, result, opts);
              }
              break;
            case "_checkval":
            case "keydown":
              if (e.key === keys.Delete || e.key === keys.Backspace || e.key === keys.BACKSPACE_SAFARI) {
                if (
                // nothing but the sign is left, e.g. "-0" - clear it
                isNegated(maskset) && holdsNoNumber(buffer, maskset, opts) ||
                // half of a paired negation symbol is left behind - deleting
                // "(" out of "(50)" cannot render as anything sensible - so
                // clear the value, as it did before
                opts.negationSymbol.front !== "" && opts.negationSymbol.back !== "" && hasNegationPart(maskset, "+") !== hasNegationPart(maskset, "-")) {
                  result = {
                    refreshFromBuffer: true,
                    buffer: [],
                    caret: caretPos.begin
                  };
                }
                if (opts.digitsOptional === false) {
                  const caret = typeof caretPos === "object" ? caretPos : {
                      begin: caretPos,
                      end: caretPos
                    },
                    end = caret.end === caret.begin ? caret.end + 1 : caret.end;
                  let reAlign = false,
                    radixNdx = buffer.indexOf(opts.radixPoint);
                  if (caret.end <= radixNdx) {
                    for (let i = caret.begin; i < end; i++) {
                      radixNdx = buffer.indexOf(opts.radixPoint) - 1;
                      if (buffer[radixNdx] === "0") {
                        buffer.splice(radixNdx, 1);
                        reAlign = true;
                      }
                    }
                    if (reAlign) result = checkAlignment(buffer, result, opts);
                  } else {
                    result = result || {};
                    // the radix dance: after a deletion in the integer part,
                    // park the caret on the integer digit next to the radix
                    // point instead of leaving it in the fraction, so repeated
                    // Deletes keep eating the integer part
                    result.caret = radixNdx + 1;
                    // Deleting a digit left of the radix point on a fixed-digits
                    // mask has to drop the digit and repad the fraction, the
                    // same job checkAlignment does for the fraction above. It
                    // cannot do it here: the engine removes the digit for
                    // Backspace but not for a Delete in the integer part, so
                    // nothing else takes the digit out and the fraction is left
                    // short - currency "0.23" never reaches "0.00" (#1351).
                    //
                    // The deletion site is buffer[caret.begin - 1], which the
                    // first two conditions already checked. The last two ask
                    // whether a digit was really deleted there, because an
                    // earlier pass can have rebuilt the whole buffer - taking
                    // the sign off sends the value over max, so it is clamped to
                    // the boundary - while the native value still holds the text
                    // from before. The caret then points into a layout that no
                    // longer exists and the splice takes a digit out of the
                    // boundary that was just written: "$ 30.00" loses the 0 of
                    // 30. #2904
                    //
                    // Neither of the two tells on its own. Comparing lengths
                    // catches the rebuild, but a clamp that keeps the rendered
                    // length slips through - the native value is stale in the
                    // currency case too, there just at equal length. Reading the
                    // character under the caret catches a caret that landed on
                    // the radix point, but a digit sitting there does not prove
                    // anything was deleted from it. So both have to agree.
                    // translatePosition cannot bridge the gap either, it derives
                    // the mask position from that same stale native value.
                    if (e.key === keys.Delete && opts.numericInput && opts._radixDance === true && buffer[caret.begin - 1] !== undefined && /\d/.test(buffer[caret.begin - 1]) && inputmask._valueGet().length === buffer.length && /\d/.test(buffer.slice().reverse()[caret.begin] || "")) {
                      const spliced = buffer.slice();
                      spliced.splice(caret.begin - 1, 1);
                      result.refreshFromBuffer = true;
                      result.buffer = alignDigits(spliced.reverse(), opts.digits, opts).reverse();
                    }
                  }
                }
              }
          }
        }

        // Taking the sign off a negative value is that value crossing max.
        // setMinMaxOnOverflow sets the boundary there and then, as it does for
        // an overflowing keystroke, instead of leaving the value to be clamped
        // on blur. Only the pure flip counts - the sign and nothing else,
        // compared as text, not as a number: deleting digits is ordinary
        // editing. #2846
        if (e && opts.setMinMaxOnOverflow && opts.max !== null && (e.type === "cut" || e.type === "keydown" && (e.key === keys.Delete || e.key === keys.Backspace || e.key === keys.BACKSPACE_SAFARI))) {
          const after = buffer.slice().reverse().join("");
          if (unmaskAsNumber(after, opts) > opts.max && unmaskAsString(inputmask._valueGet(true), opts) === opts.negationSymbol.front + unmaskAsString(after, opts) + opts.negationSymbol.back) {
            return {
              refreshFromBuffer: true,
              buffer: boundaryBuffer(opts.max, opts)
            };
          }
        }
        return result;
      },
      onKeyDown: function (e, buffer, caretPos, opts) {
        const $input = DependencyLib(this);
        if (e.location !== 3) {
          let pattern;
          const c = e.key;
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
            case keys.ArrowUp:
              this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
              $input.trigger("setvalue");
              return false;
            case keys.ArrowDown:
              this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
              $input.trigger("setvalue");
              return false;
          }
        }
      }
    },
    currencyAlias = {
      prefix: "",
      // "$ ",
      groupSeparator: ",",
      // alias: "numeric",
      digits: 2,
      digitsOptional: false
    },
    decimalAlias = {
      // alias: "numeric"
    },
    integerAlias = {
      // alias: "numeric",
      inputmode: "numeric",
      digits: 0
    },
    percentageAlias = {
      // alias: "numeric",
      min: 0,
      max: 100,
      suffix: " %",
      digits: 0,
      allowMinus: false
    },
    indiannsAlias = {
      // indian numbering system
      // alias: "numeric",
      _mask: function (opts) {
        return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
      },
      groupSeparator: ",",
      radixPoint: ".",
      placeholder: "0",
      digits: 2,
      digitsOptional: false
    };
  function registerNumeric() {
    DependencyLib.extend(true, aliases, {
      numeric: numericAlias,
      currency: {
        alias: "numeric",
        ...currencyAlias
      },
      decimal: {
        alias: "numeric",
        ...decimalAlias
      },
      integer: {
        alias: "numeric",
        ...integerAlias
      },
      percentage: {
        alias: "numeric",
        ...percentageAlias
      },
      indianns: {
        alias: "numeric",
        ...indiannsAlias
      }
    });
  }

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */
  function ssn(options) {
    return DependencyLib.extend(true, {
      mask: "999-99-9999",
      postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict) {
        const bffr = getMaskTemplate.call(this, true, getLastValidPosition.call(this), true, true);
        return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(bffr.join(""));
      }
    }, options);
  }
  function registerSsn() {
    DependencyLib.extend(true, aliases, {
      // http://rion.io/2013/09/10/validating-social-security-numbers-through-regular-expressions-2/
      // https://en.wikipedia.org/wiki/Social_Security_number
      ssn: ssn()
    });
  }

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */
  function url(options) {
    return DependencyLib.extend(true, {
      // needs update => https://en.wikipedia.org/wiki/URL
      regex: "(https?|ftp)://.*",
      autoUnmask: false,
      keepStatic: false,
      tabThrough: true
    }, options);
  }
  function registerUrl() {
    DependencyLib.extend(true, aliases, {
      url: url()
    });
  }

  /*
   Input Mask plugin extensions
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */
  function vin(options) {
    return DependencyLib.extend(true, {
      // https://en.wikipedia.org/wiki/Vehicle_identification_number
      // see issue #1199
      mask: "V{13}9{4}",
      definitions: {
        V: {
          validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
          casing: "upper"
        }
      },
      clearIncomplete: true,
      autoUnmask: true
    }, options);
  }
  function registerVin() {
    DependencyLib.extend(true, aliases, {
      vin: vin()
    });
  }

  const nav = window$1.navigator || {},
    ua = nav.userAgent || "",
    mobile = (() => {
      try {
        const coarsePointer = typeof window$1.matchMedia === "function" ? window$1.matchMedia("(pointer:coarse)").matches : false;
        return !!(nav.userAgentData?.mobile ?? ((coarsePointer || nav.maxTouchPoints) && (window$1.innerWidth || 0) <= 1024 || /Mobi|Android|iPhone/i.test(ua)));
      } catch (e) {
        return /Mobi|Android|iPhone/i.test(ua);
      }
    })(),
    iphone = /iphone/i.test(ua);

  const EventHandlers = {
    keyEvent: function (e, checkval, writeOut, strict, ndx) {
      const inputmask = this.inputmask || this,
        opts = inputmask.opts,
        $ = inputmask.dependencyLib,
        maskset = inputmask.maskset,
        input = this.nodeName ? this : inputmask.el,
        $input = input ? $(input) : undefined,
        c = e.key;

      // Browsers and password managers can fill in a field in a way that fires
      // a keydown event without any real key attached to it (it isn't an
      // actual keystroke). If we don't stop here, the code below assumes a
      // real key was pressed and crashes the page.
      if (!c) return;
      const pos = caret.call(inputmask, input),
        kdResult = opts.onKeyDown.call(this, e, getBuffer.call(inputmask), pos, opts);
      if (kdResult !== undefined) return kdResult;

      // backspace, delete, and escape get special treatment
      if (c === keys.Backspace || c === keys.Delete || iphone && c === keys.BACKSPACE_SAFARI || e.ctrlKey && c === keys.x && (!input || !("oncut" in input))) {
        // backspace/delete
        handleRemoveKey.call(inputmask, input, c, pos, e);
      } else if (c === keys.End || c === keys.PageDown) {
        // when END or PAGE_DOWN pressed set position at lastmatch
        e.preventDefault();
        const caretPos = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
        caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
      } else if (c === keys.Home && !e.shiftKey || c === keys.PageUp) {
        // Home or page_up
        e.preventDefault();
        caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, true);
      } else if ((opts.undoOnEscape && c === keys.Escape ||
      // eslint-disable-next-line no-constant-binary-expression -- TODO: revisit, ctrl+z undo branch is disabled via `false &&`, see #762
      false) && e.altKey !== true) {
        // escape && undo && #762
        checkVal(input, true, false, inputmask.undoValue.split(""));
        $input.trigger("click");
      } else if (c === keys.Insert && !(e.shiftKey || e.ctrlKey) && opts.insertModeToggle === true &&
      // an explicitly given insertMode wins over the INSERT key toggle
      inputmask.userOptions.insertMode === undefined) {
        // insert
        if (!isSelection.call(inputmask, pos)) {
          opts.insertMode = !opts.insertMode;
          caret.call(inputmask, input, pos.begin, pos.begin);
        } else opts.insertMode = !opts.insertMode;
      } else if (opts.tabThrough === true && c === keys.Tab) {
        if (e.shiftKey === true) {
          pos.end = seekPrevious.call(inputmask, pos.end, true);
          if (getTest.call(inputmask, pos.end - 1).match.static === true) {
            pos.end--;
          }
          pos.begin = seekPrevious.call(inputmask, pos.end, true);
          if (pos.begin >= 0 && pos.end > 0) {
            e.preventDefault();
            caret.call(inputmask, input, pos.begin, pos.end);
          }
        } else {
          pos.begin = seekNext.call(inputmask, pos.begin, true);
          pos.end = seekNext.call(inputmask, pos.begin, true);
          if (pos.end < maskset.maskLength) pos.end--;
          if (pos.begin <= maskset.maskLength) {
            e.preventDefault();
            caret.call(inputmask, input, pos.begin, pos.end);
          }
        }
      } else if (!e.shiftKey) {
        if (opts.insertModeVisual && opts.insertMode === false) {
          if (c === keys.ArrowRight) {
            setTimeout(function () {
              const caretPos = caret.call(inputmask, input);
              caret.call(inputmask, input, caretPos.begin);
            }, 0);
          } else if (c === keys.ArrowLeft) {
            setTimeout(function () {
              const caretPos = {
                begin: translatePosition.call(inputmask, input.inputmask.caretPos.begin),
                end: translatePosition.call(inputmask, input.inputmask.caretPos.end)
              };
              if (inputmask.isRTL) {
                caret.call(inputmask, input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1));
              } else {
                caret.call(inputmask, input, caretPos.begin - (caretPos.begin === 0 ? 0 : 1));
              }
            }, 0);
          }
        } else {
          inputmask.keyEventHook === undefined || inputmask.keyEventHook(e);
        }
      }
      inputmask.isComposing = c === keys.Process || c === keys.Unidentified;
      inputmask.ignorable = c === undefined || c.length > 1;
      return EventHandlers.keypressEvent.call(inputmask, e, checkval, writeOut, strict, ndx);
    },
    keypressEvent: function (e, checkval, writeOut, strict, ndx) {
      const inputmask = this.inputmask || this,
        $ = inputmask.dependencyLib,
        input = this.nodeName ? this : inputmask.el,
        $input = input ? $(input) : undefined,
        c = e.key;
      if (c && c.length === 1 && !e.ctrlKey && !e.metaKey) {
        inputmask.ignorable = false;
      }
      if (checkval !== true && !(e.ctrlKey && e.altKey && !inputmask.ignorable) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) {
        if (c === keys.Enter) {
          if (inputmask.undoValue !== inputmask._valueGet(true)) {
            inputmask.undoValue = inputmask._valueGet(true);
            if ($input) {
              setTimeout(function () {
                $input.trigger("change");
              }, 0);
            }
          }
        }
        return undefined;
      }
      return processKeypress.call(inputmask, e, checkval, writeOut, strict, ndx);
    },
    pasteEvent: function (e) {
      const input = this,
        inputmask = this.inputmask,
        opts = inputmask.opts,
        inputValue = inputmask._valueGet(true);
      let pastedValue;
      if (e.clipboardData && e.clipboardData.getData) {
        pastedValue = e.clipboardData.getData("text/plain");
      }
      if (pastedValue === undefined || pastedValue === "") {
        // nothing to interpolate, let the browser handle the paste
        inputmask.pasteValue = undefined;
        return;
      }

      // Compute the value the paste should produce, but do not preventDefault the
      // paste event.  Letting the native paste land and normalizing on the
      // follow-up input event keeps masked inputs from tripping the Lighthouse /
      // PageSpeed "preventing users from pasting into input fields" audit (#2823)
      // and keeps password-manager fills working.  The browser fires an input
      // event with inputType "insertFromPaste" right after a non-prevented paste.
      const caretPos = caret.call(inputmask, input, undefined, undefined, true);
      let valueBeforeCaret = inputValue.substr(0, caretPos.begin),
        valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
      if (valueBeforeCaret === (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
      if (valueAfterCaret === (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(caretPos.end).join("")) valueAfterCaret = "";
      let pasteValue = valueBeforeCaret + pastedValue + valueAfterCaret;
      if (inputmask.isRTL && opts.numericInput !== true) {
        pasteValue = pasteValue.split("");
        for (const c of getBufferTemplate.call(inputmask)) {
          if (pasteValue[0] === c) pasteValue.shift();
        }
        pasteValue = pasteValue.reverse().join("");
      }
      if (typeof opts.onBeforePaste === "function") {
        pasteValue = opts.onBeforePaste.call(inputmask, pasteValue, opts);
        if (pasteValue === false) {
          inputmask.pasteValue = false;
          inputmask.pasteInputValue = inputValue;
          return;
        }
        if (!pasteValue) {
          pasteValue = inputValue;
        }
      }
      inputmask.pasteValue = pasteValue;
    },
    inputFallBackEvent: function (e) {
      // fallback when keypress is not triggered
      const inputmask = this.inputmask,
        opts = inputmask.opts,
        $ = inputmask.dependencyLib,
        charPlaceholder = "\x1F";
      if (e.inputType === "insertFromPaste" && inputmask.pasteValue !== undefined) {
        // apply the paste computed in pasteEvent, the native (unprevented) paste
        // already landed and this normalizes it to the mask
        const pasteValue = inputmask.pasteValue,
          pasteInputValue = inputmask.pasteInputValue;
        inputmask.pasteValue = undefined;
        inputmask.pasteInputValue = undefined;
        if (pasteValue === false) {
          // onBeforePaste rejected the paste -> restore the previous value
          applyInputValue(this, pasteInputValue);
        } else {
          checkVal(this, true, false, pasteValue.toString().split(""), e);
        }
        return false;
      }

      // console.log(e.inputType);

      function analyseChanges(inputValue, buffer, caretPos) {
        const frontPart = inputValue.substr(0, caretPos.begin).split(""),
          backPart = inputValue.substr(caretPos.begin).split(""),
          frontBufferPart = buffer.substr(0, caretPos.begin).split(""),
          backBufferPart = buffer.substr(caretPos.begin).split(""),
          fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length,
          bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length,
          data = [],
          marker = "\x1E";
        let bl,
          i,
          action = "",
          placeholder;

        // align buffers
        while (frontPart.length < fpl) frontPart.push(marker);
        while (frontBufferPart.length < fpl) frontBufferPart.push(marker);
        while (backPart.length < bpl) backPart.unshift(marker);
        while (backBufferPart.length < bpl) backBufferPart.unshift(marker);
        const newBuffer = frontPart.concat(backPart),
          oldBuffer = frontBufferPart.concat(backBufferPart);

        // console.log("N " + newBuffer);
        // console.log("O " + oldBuffer);

        for (i = 0, bl = newBuffer.length; i < bl; i++) {
          placeholder = getPlaceholder.call(inputmask, translatePosition.call(inputmask, i));
          switch (action) {
            case "insertText":
              if (oldBuffer[i - 1] === newBuffer[i] && caretPos.begin === newBuffer.length - 1) {
                data.push(newBuffer[i]);
              }
              i = bl;
              break;
            case "insertReplacementText":
              if (newBuffer[i] === marker) {
                // extend selection
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
                // breakout loop
                i = bl;
              }
              break;
            default:
              if (newBuffer[i] !== oldBuffer[i]) {
                if ((newBuffer[i + 1] === marker || newBuffer[i + 1] === placeholder || newBuffer[i + 1] === undefined) && (oldBuffer[i] === placeholder && oldBuffer[i + 1] === marker || oldBuffer[i] === marker)) {
                  // basic insert
                  action = "insertText";
                  data.push(newBuffer[i]);
                  caretPos.begin--;
                  caretPos.end--;
                } else if (oldBuffer[i + 1] === marker && oldBuffer[i] === newBuffer[i + 1]) {
                  // insert between
                  action = "insertText";
                  data.push(newBuffer[i]);
                  caretPos.begin--;
                  caretPos.end--;
                } else if (newBuffer[i] !== placeholder && newBuffer[i] !== marker && (newBuffer[i + 1] === marker || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) /* single char replacement */) {
                  // replace selection
                  action = "insertReplacementText";
                  data.push(newBuffer[i]);
                  caretPos.begin--;
                } else if (newBuffer[i] === marker && !e.inputType?.startsWith("insert")) {
                  // delete~backspace
                  action = "deleteContentBackward";
                  if (isMask.call(inputmask, translatePosition.call(inputmask, i), true) || oldBuffer[i] === opts.radixPoint) caretPos.end++;
                } else {
                  i = bl;
                }
              }
              break;
          }
        }
        return {
          action,
          data,
          caret: caretPos
        };
      }
      const input = this,
        inputValue = input.inputmask._valueGet(true),
        buffer = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join(""),
        caretPos = caret.call(inputmask, input, undefined, undefined, true);
      let changes, keydown;
      if (buffer !== inputValue) {
        const charBeforeCaret = inputValue.charAt(caretPos.begin - 1),
          nptValue = inputValue.split("");
        if (charBeforeCaret !== "" && nptValue.length > buffer.length) {
          nptValue[caretPos.begin - 1] = charPlaceholder;
        }
        changes = analyseChanges(nptValue.join(""), buffer, caretPos);
        if (input.getRootNode().activeElement !== input) {
          input.focus();
        }
        writeBuffer(input, getBuffer.call(inputmask));
        caret.call(inputmask, input, caretPos.begin, caretPos.end, true);

        // Japanese IME hack #2662
        if (!mobile && inputmask.skipNextInsert && e.inputType === "insertText" && changes.action === "insertText" && inputmask.isComposing) {
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
              const keypress = new $.Event("keypress");
              keypress.key = entry === charPlaceholder ? charBeforeCaret : entry;
              inputmask.ignorable = false; // make sure ignorable is ignored ;-)
              EventHandlers.keypressEvent.call(input, keypress);
            });
            setTimeout(function () {
              // #2195 trigger keyup to help some other plugins to track changes
              inputmask.$el.trigger("keyup");
            }, 0);
            break;
          case "deleteContentBackward":
            keydown = new $.Event("keydown");
            keydown.key = keys.Backspace;
            EventHandlers.keyEvent.call(input, keydown);
            break;
          default:
            applyInputValue(input, inputValue, e);
            caret.call(inputmask, input, caretPos.begin, caretPos.end, true);
            break;
        }
        e.preventDefault();
      }
    },
    setValueEvent: function (e) {
      const inputmask = this.inputmask,
        $ = inputmask.dependencyLib,
        input = this;
      let value = e && e.detail ? e.detail[0] : arguments[1];
      if (value === undefined) {
        value = input.inputmask._valueGet(true);
      } else if (typeof inputmask.opts.onBeforeMask === "function") {
        value = inputmask.opts.onBeforeMask.call(inputmask, value, inputmask.opts) || value;
      }
      applyInputValue(input, value, new $.Event("input"), (e && e.detail ? e.detail[0] : arguments[1]) !== undefined);
      if (e.detail && e.detail[1] !== undefined || arguments[2] !== undefined) {
        caret.call(inputmask, input, e.detail ? e.detail[1] : arguments[2]);
      }
    },
    focusEvent: function (e) {
      const inputmask = this.inputmask,
        opts = inputmask.opts,
        input = this,
        nptValue = inputmask && inputmask._valueGet();
      if (opts.showMaskOnFocus) {
        if (nptValue !== getBuffer.call(inputmask).join("")) {
          writeBuffer(input, getBuffer.call(inputmask), seekNext.call(inputmask, getLastValidPosition.call(inputmask)));
        } /* else if (mouseEnter === false) { //only executed on focus without mouseenter
          caret(input, seekNext(getLastValidPosition()));
          } */
      }
      if (opts.positionCaretOnTab === true && inputmask.mouseEnter === false && (!isComplete.call(inputmask, getBuffer.call(inputmask)) || getLastValidPosition.call(inputmask) === -1)) {
        EventHandlers.clickEvent.apply(input, [e, true]);
      }
      inputmask.undoValue = inputmask && inputmask._valueGet(true);
    },
    invalidEvent: function (e) {
      this.inputmask.validationEvent = true;
    },
    mouseleaveEvent: function () {
      const inputmask = this.inputmask,
        opts = inputmask.opts,
        input = this;
      inputmask.mouseEnter = false;
      if (opts.clearMaskOnLostFocus && input.getRootNode().activeElement !== input) {
        const bufferTemplate = (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("");
        if (input.placeholder === bufferTemplate) {
          HandleNativePlaceholder(input, inputmask.originalPlaceholder);
        }
      }
    },
    clickEvent: function (e, tabbed) {
      const inputmask = this.inputmask;
      if (e.type === "click") inputmask.clicked++;
      const input = this;
      if (input.getRootNode().activeElement === input) {
        const newCaretPosition = determineNewCaretPosition.call(inputmask, caret.call(inputmask, input), tabbed);
        if (newCaretPosition !== undefined) {
          caret.call(inputmask, input, newCaretPosition);
        }
      }
    },
    cutEvent: function (e) {
      const inputmask = this.inputmask,
        maskset = inputmask.maskset,
        input = this,
        pos = caret.call(inputmask, input),
        // correct clipboardData
        clipData = inputmask.isRTL ? getBuffer.call(inputmask).slice(pos.end, pos.begin) : getBuffer.call(inputmask).slice(pos.begin, pos.end),
        clipDataText = inputmask.isRTL ? clipData.reverse().join("") : clipData.join("");
      if (window$1.navigator && window$1.navigator.clipboard) window$1.navigator.clipboard.writeText(clipDataText);
      handleRemove.call(inputmask, input, keys.Delete, pos);
      writeBuffer(input, getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== inputmask._valueGet(true));
    },
    blurEvent: function (e) {
      const inputmask = this.inputmask,
        opts = inputmask.opts,
        $ = inputmask.dependencyLib;
      inputmask.clicked = 0;
      const $input = $(this),
        input = this;
      if (input.inputmask) {
        const bufferTemplate = (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("");
        if (input.placeholder === bufferTemplate) {
          HandleNativePlaceholder(input, inputmask.originalPlaceholder);
        }
        let nptValue = input.inputmask._valueGet(),
          buffer = getBuffer.call(inputmask).slice();
        if (nptValue !== "") {
          if (opts.clearMaskOnLostFocus) {
            if (getLastValidPosition.call(inputmask) === -1 && nptValue === getBufferTemplate.call(inputmask).join("")) {
              buffer = [];
            } else {
              // clearout optional tail of the mask
              clearOptionalTail.call(inputmask, buffer);
            }
          }
          if (isComplete.call(inputmask, buffer) === false) {
            setTimeout(function () {
              $input.trigger("incomplete");
            }, 0);
            if (opts.clearIncomplete) {
              resetMaskSet.call(inputmask, false);
              if (opts.clearMaskOnLostFocus) {
                buffer = [];
              } else {
                buffer = getBufferTemplate.call(inputmask).slice();
              }
            }
          }
          writeBuffer(input, buffer, undefined, e);
        }
        nptValue = inputmask._valueGet(true);
        if (inputmask.undoValue !== nptValue) {
          const bufferTemplateStr = (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("");
          if (nptValue !== "" || inputmask.undoValue !== bufferTemplateStr || inputmask.undoValue === bufferTemplateStr && inputmask.maskset.validPositions.length > 0) {
            inputmask.undoValue = nptValue;
            $input.trigger("change");
          }
        }
      }
    },
    mouseenterEvent: function () {
      const inputmask = this.inputmask,
        {
          showMaskOnHover
        } = inputmask.opts,
        input = this;
      inputmask.mouseEnter = true;
      if (input.getRootNode().activeElement !== input) {
        const bufferTemplate = (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("");
        if (showMaskOnHover) {
          inputmask.originalPlaceholder = input.placeholder;
          HandleNativePlaceholder(input, bufferTemplate);
        }
      }
    },
    submitEvent: function () {
      // trigger change on submit if any
      const inputmask = this.inputmask,
        opts = inputmask.opts;
      if (inputmask.undoValue !== inputmask._valueGet(true)) {
        inputmask.$el.trigger("change");
      }
      if (/* opts.clearMaskOnLostFocus && */getLastValidPosition.call(inputmask) === -1 && inputmask._valueGet && inputmask._valueGet() === getBufferTemplate.call(inputmask).join("")) {
        inputmask._valueSet(""); // clear masktemplete on submit and still has focus
      }
      if (opts.clearIncomplete && isComplete.call(inputmask, getBuffer.call(inputmask)) === false) {
        inputmask._valueSet("");
      }
      if (opts.removeMaskOnSubmit) {
        inputmask._valueSet(inputmask.unmaskedvalue(), true);
        setTimeout(function () {
          writeBuffer(inputmask.el, getBuffer.call(inputmask));
        }, 0);
      }
    },
    resetEvent: function () {
      const inputmask = this.inputmask;
      inputmask.refreshValue = true; // indicate a forced refresh when there is a call to the value before leaving the triggering event fn
      setTimeout(function () {
        applyInputValue(inputmask.el, inputmask._valueGet(true));
      }, 0);
    }
  };

  registerDefinitions();
  registerCssunit();
  registerUrl();
  registerIp();
  registerEmail();
  registerMac();
  registerVin();
  registerSsn();
  registerDatetime();
  registerNumeric();

  /*
   Input Mask colormask extension
   http://github.com/RobinHerbots/inputmask
   Copyright (c) Robin Herbots
   Licensed under the MIT license
   */
  const $ = InputmaskExport.dependencyLib;
  function Colormask(alias, options, internal) {
    // allow instanciating without new
    if (!(this instanceof Colormask)) {
      return new Colormask();
    }
    this.colorMask = undefined;
    Object.getOwnPropertyNames(InputmaskExport).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = InputmaskExport[key];
      }
    }, this);
  }
  Colormask.prototype = InputmaskExport.prototype;
  Colormask.prototype.writeBufferHook = function (caretPos) {
    renderColorMask.call(this, this.el, caretPos, false);
  };
  Colormask.prototype.caretHook = function (caretPos) {
    renderColorMask.call(this, this.el, caretPos, false);
  };
  Colormask.prototype.applyMaskHook = function () {
    initializeColorMask.call(this, this.el);
  };
  Colormask.prototype.keyEventHook = function (e) {
    if (e.key === keys.ArrowRight || e.key === keys.ArrowLeft) {
      const inputmask = this;
      setTimeout(function () {
        const caretPos = caret.call(inputmask, inputmask.el, undefined, undefined, true);
        renderColorMask.call(inputmask, inputmask.el, caretPos);
      }, 0);
    }
  };
  function initializeColorMask(input) {
    const computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);
    function findCaretPos(clientx) {
      // calculate text width
      const e = document.createElement("span");
      let caretPos = 0;
      for (const style in computedStyle) {
        // clone styles
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
      const inputText = input.inputmask.__valueGet.call(input);
      let previousWidth = 0;
      while (e.offsetWidth < clientx) {
        const ichar = inputText.charAt(caretPos);
        e.innerHTML += ichar === " " || ichar === "" ? "_" : ichar;
        if (e.offsetWidth >= clientx) {
          let offset1 = clientx - previousWidth;
          const offset2 = e.offsetWidth - clientx;
          e.innerHTML = inputText.charAt(caretPos);
          offset1 += Math.round(e.offsetWidth / 2);
          caretPos = (offset1 < offset2 ? caretPos - 1 : caretPos) - 1;
          break;
        }
        previousWidth = e.offsetWidth;
        caretPos++;
      }
      if (input.style.textAlign === "right") {
        e.innerHTML = "_";
        const maxChars = Math.ceil(input.offsetWidth / e.offsetWidth) - 1;
        caretPos = inputText.length - (maxChars - caretPos) + 1;
      }
      document.body.removeChild(e);
      return caretPos;
    }
    const template = document.createElement("div");
    template.style.width = computedStyle.width;
    template.style.textAlign = computedStyle.textAlign;
    const colorMask = document.createElement("div");
    input.inputmask.colorMask = colorMask;
    colorMask.className = "im-colormask";
    input.parentNode.insertBefore(colorMask, input);
    input.parentNode.removeChild(input);
    colorMask.appendChild(input);
    colorMask.appendChild(template);
    input.style.left = template.offsetLeft + "px";
    $(colorMask).on("mouseleave", function (e) {
      return EventHandlers.mouseleaveEvent.call(input, [e]);
    });
    $(colorMask).on("mouseenter", function (e) {
      return EventHandlers.mouseenterEvent.call(input, [e]);
    });
    $(colorMask).on("click", function (e) {
      caret.call(input.inputmask, input, findCaretPos(e.clientX), undefined, true);
      return EventHandlers.clickEvent.call(input, [e]);
    });
  }
  function positionColorMask(input, template) {
    input.style.left = template.offsetLeft + "px";
  }
  function renderColorMask(input, caretPos, clear) {
    const inputmask = this,
      {
        isRTL,
        maskset,
        opts,
        maxLength
      } = inputmask,
      maskTemplate = [];
    let isStatic = false,
      test,
      testPos,
      ndxIntlzr,
      pos = 0;
    const templates = {
      static: {
        start: isRTL ? "</span>" : "<span class='im-static'>",
        end: isRTL ? "<span class='im-static'>" : "</span>"
      },
      caret: {
        start: '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">',
        start_select: '<mark class="im-caret-select">',
        end: "</mark>"
      }
    };
    function setEntry(entry) {
      if (entry === undefined) entry = "";
      if (!isStatic && (test.static === true || testPos.input === undefined)) {
        isStatic = true;
        maskTemplate.push(templates.static.start + entry);
      } else if (isStatic && (test.static !== true && testPos.input !== undefined || test.def === "")) {
        isStatic = false;
        maskTemplate.push(templates.static.end + entry);
      } else {
        maskTemplate.push(entry);
      }
    }
    function setCaret(begin, end, length) {
      if (document.activeElement === input) {
        maskTemplate.splice(begin, 0, begin === end || length > maskset.maskLength ? templates.caret.start : templates.caret.start_select);
        maskTemplate.splice(end + (isRTL ? 0 : 1), 0, templates.caret.end);
      }
    }
    if (input.inputmask.colorMask !== undefined) {
      const buffer = getBuffer.call(inputmask);
      if (caretPos === undefined) {
        caretPos = caret.call(inputmask, input);
      } else if (caretPos.begin === undefined) {
        caretPos = {
          begin: caretPos,
          end: caretPos
        };
      }
      if (isRTL) {
        // translate caretPos
        caretPos.begin = translatePosition.call(inputmask, caretPos.begin);
        caretPos.end = translatePosition.call(inputmask, caretPos.end);
      }
      if (clear !== true) {
        const lvp = getLastValidPosition.call(inputmask);
        do {
          if (maskset.validPositions[pos]) {
            testPos = maskset.validPositions[pos];
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            setEntry(buffer[pos]);
          } else {
            testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            const jitMasking = opts.jitMasking !== false ? opts.jitMasking : test.jit;
            if (jitMasking === false || jitMasking === undefined /* || pos < lvp */ || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
              setEntry(getPlaceholder.call(inputmask, pos, test));
              // } else {
              // 	isStatic = false;
            } // break infinite loop
          }
          pos++;
        } while ((maxLength === undefined || pos < maxLength) && (test.static !== true || test.def !== "") || lvp > pos || isStatic);
        if (isStatic) setEntry();
        setCaret(isRTL ? caretPos.end : caretPos.begin, isRTL ? caretPos.begin : caretPos.end, caretPos.end);
      }
      const template = input.inputmask.colorMask.getElementsByTagName("div")[0];
      template.innerHTML = (isRTL ? maskTemplate.reverse() : maskTemplate).join("");
      positionColorMask(input, template);
      // console.log(template.innerHTML)
      // console.log(JSON.stringify(caretPos));
    }
  }

  // make inputmask available
  window.Colormask = Colormask;

  return Colormask;

}));
//# sourceMappingURL=colormask.js.map
