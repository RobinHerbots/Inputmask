/*!
 * dist/esm/inputmask.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.11
 */
/******/ var __webpack_modules__ = ({

/***/ 472
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  9: {
    validator: "\\p{N}",
    definitionSymbol: "*"
  },
  a: {
    validator: "\\p{L}",
    definitionSymbol: "*"
  },
  "*": {
    validator: "[\\p{L}\\p{N}]"
  }
});
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "A", 0, /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ ]);


/***/ },

/***/ 123
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ inputmask_dependencyLib)
});

// EXTERNAL MODULE: ./lib/global/window.js
var global_window = __webpack_require__(266);
;// ./lib/dependencyLibs/data.js
/* harmony default export */ function data(owner, key, value) {
  if (value === undefined) {
    return owner.__data ? owner.__data[key] : null;
  } else {
    owner.__data = owner.__data || {};
    owner.__data[key] = value;
  }
}
;// ./lib/dependencyLibs/extend.js
function extend() {
  let options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

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
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
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
;// ./lib/dependencyLibs/events.js





const events_document = global_window/* default */.A.document;
function isValidElement(elem) {
  return elem instanceof Element && data(elem, "events");
}
let Evnt;
if (typeof global_window/* default */.A.CustomEvent === "function") {
  Evnt = global_window/* default */.A.CustomEvent;
} else if (global_window/* default */.A.Event && events_document && events_document.createEvent) {
  Evnt = function (event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: undefined
    };
    const evt = events_document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };
  Evnt.prototype = global_window/* default */.A.Event.prototype;
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
      if (elem.addEventListener) {
        // all browsers except IE before version 9
        elem.addEventListener(ev, handler, false);
      } else if (elem.attachEvent) {
        // IE before version 9
        elem.attachEvent(`on${ev}`, handler);
      }
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
      if (elem.removeEventListener) {
        // all browsers except IE before version 9
        elem.removeEventListener(ev, handler, false);
      } else if (elem.detachEvent) {
        // IE before version 9
        elem.detachEvent(`on${ev}`, handler);
      }
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
      if (events_document !== undefined) {
        // trigger domevent
        let evnt;
        const params = {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: arguments[1]
        };
        // The custom event that will be created
        if (events_document.createEvent) {
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
            evnt = events_document.createEvent("CustomEvent");
            evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
          }
          if (events.type) extend(evnt, events);
          elem.dispatchEvent(evnt);
        } else {
          evnt = events_document.createEventObject();
          evnt.eventType = ev;
          evnt.detail = arguments[1];
          if (events.type) extend(evnt, events);
          elem.fireEvent("on" + evnt.eventType, evnt);
        }
      } else if (eventRegistry[ev] !== undefined) {
        arguments[0] = arguments[0].type ? arguments[0] : inputmask_dependencyLib.Event(arguments[0]);
        arguments[0].detail = arguments.slice(1);
        const registry = eventRegistry[ev],
          handlers = namespace === "global" ? Object.values(registry).flat() : registry[namespace];
        handlers.forEach(handler => handler.apply(elem, arguments));
      }
    }
  }
  return this;
}
;// ./lib/dependencyLibs/inputmask.dependencyLib.js
/*
 Input Mask plugin dependencyLib
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */





const inputmask_dependencyLib_document = global_window/* default */.A.document;
function DependencyLib(elem) {
  if (elem instanceof DependencyLib) {
    return elem;
  }
  if (!(this instanceof DependencyLib)) {
    return new DependencyLib(elem);
  }
  if (elem !== undefined && elem !== null && elem !== global_window/* default */.A) {
    this[0] = elem.nodeName ? elem : elem[0] !== undefined && elem[0].nodeName ? elem[0] : inputmask_dependencyLib_document.querySelector(elem);
    if (this[0] !== undefined && this[0] !== null) {
      data(this[0], "events", data(this[0], "events") || {});
    }
  }
}
DependencyLib.prototype = {
  on: on,
  off: off,
  trigger: trigger
};

// static
DependencyLib.extend = extend;
DependencyLib.data = data;
DependencyLib.Event = Evnt;
/* harmony default export */ const inputmask_dependencyLib = (DependencyLib);

/***/ },

/***/ 351
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _global_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(266);

const ua = _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.navigator && _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.navigator.userAgent || "",
  ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0,
  mobile = !!(navigator.userAgentData?.mobile ?? ((matchMedia("(pointer:coarse)").matches || navigator.maxTouchPoints) && innerWidth <= 1024 || /Mobi|Android|iPhone/i.test(ua))),
  iphone = /iphone/i.test(ua);

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "H", 0, /* binding */ mobile,
/* harmony export */   "Q", 0, /* binding */ iphone,
/* harmony export */   "ie", 0, /* binding */ ie
/* harmony export */ ]);


/***/ },

/***/ 340
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ escapeRegex)
/* harmony export */ });
const escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
function escapeRegex(str) {
  return str.replace(escapeRegexRegex, "\\$1");
}

/***/ },

/***/ 47
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ EventHandlers)
/* harmony export */ });
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(351);
/* harmony import */ var _global_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(266);
/* harmony import */ var _inputHandling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(507);
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(539);
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(687);
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(895);








const EventHandlers = {
  keyEvent: function (e, checkval, writeOut, strict, ndx) {
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib,
      maskset = inputmask.maskset,
      input = this,
      $input = $(input),
      c = e.key,
      pos = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input),
      kdResult = opts.onKeyDown.call(this, e, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask), pos, opts);
    if (kdResult !== undefined) return kdResult;

    // backspace, delete, and escape get special treatment
    if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Backspace || c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Delete || _environment__WEBPACK_IMPORTED_MODULE_0__/* .iphone */ .Q && c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.BACKSPACE_SAFARI || e.ctrlKey && c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.x && !("oncut" in input)) {
      // backspace/delete
      e.preventDefault(); // stop default action but allow propagation
      _validation__WEBPACK_IMPORTED_MODULE_5__/* .handleRemove */ .Nr.call(inputmask, input, c, pos);
      (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .writeBuffer */ .Au)(input, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask, true), maskset.p, e, input.inputmask._valueGet() !== _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).join(""));
    } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.End || c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.PageDown) {
      // when END or PAGE_DOWN pressed set position at lastmatch
      e.preventDefault();
      const caretPos = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekNext */ .u4.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getLastValidPosition */ .SE.call(inputmask));
      _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
    } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Home && !e.shiftKey || c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.PageUp) {
      // Home or page_up
      e.preventDefault();
      _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, true);
    } else if ((opts.undoOnEscape && c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Escape ||
    // eslint-disable-next-line no-constant-binary-expression -- TODO: revisit, ctrl+z undo branch is disabled via `false &&`, see #762
     false && 0) && e.altKey !== true) {
      // escape && undo && #762
      (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .checkVal */ .eP)(input, true, false, inputmask.undoValue.split(""));
      $input.trigger("click");
    } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Insert && !(e.shiftKey || e.ctrlKey) && inputmask.userOptions.insertMode === undefined) {
      // insert
      if (!_validation__WEBPACK_IMPORTED_MODULE_5__/* .isSelection */ .X9.call(inputmask, pos)) {
        opts.insertMode = !opts.insertMode;
        _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, pos.begin, pos.begin);
      } else opts.insertMode = !opts.insertMode;
    } else if (opts.tabThrough === true && c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Tab) {
      if (e.shiftKey === true) {
        pos.end = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekPrevious */ .Ef.call(inputmask, pos.end, true);
        if (_validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, pos.end - 1).match.static === true) {
          pos.end--;
        }
        pos.begin = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekPrevious */ .Ef.call(inputmask, pos.end, true);
        if (pos.begin >= 0 && pos.end > 0) {
          e.preventDefault();
          _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, pos.begin, pos.end);
        }
      } else {
        pos.begin = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekNext */ .u4.call(inputmask, pos.begin, true);
        pos.end = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekNext */ .u4.call(inputmask, pos.begin, true);
        if (pos.end < maskset.maskLength) pos.end--;
        if (pos.begin <= maskset.maskLength) {
          e.preventDefault();
          _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, pos.begin, pos.end);
        }
      }
    } else if (!e.shiftKey) {
      if (opts.insertModeVisual && opts.insertMode === false) {
        if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.ArrowRight) {
          setTimeout(function () {
            const caretPos = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input);
            _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, caretPos.begin);
          }, 0);
        } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.ArrowLeft) {
          setTimeout(function () {
            const caretPos = {
              begin: _positioning__WEBPACK_IMPORTED_MODULE_4__/* .translatePosition */ .Mu.call(inputmask, input.inputmask.caretPos.begin),
              end: _positioning__WEBPACK_IMPORTED_MODULE_4__/* .translatePosition */ .Mu.call(inputmask, input.inputmask.caretPos.end)
            };
            if (inputmask.isRTL) {
              _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1));
            } else {
              _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, caretPos.begin - (caretPos.begin === 0 ? 0 : 1));
            }
          }, 0);
        }
      } else {
        inputmask.keyEventHook === undefined || inputmask.keyEventHook(e);
      }
    }
    inputmask.isComposing = c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Process || c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Unidentified;
    inputmask.ignorable = c === undefined || c.length > 1;
    return EventHandlers.keypressEvent.call(inputmask, e, checkval, writeOut, strict, ndx);
  },
  keypressEvent: function (e, checkval, writeOut, strict, ndx) {
    const inputmask = this.inputmask || this,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib,
      maskset = inputmask.maskset,
      input = inputmask.el,
      $input = $(input);
    let c = e.key;
    if (checkval !== true && !(e.ctrlKey && e.altKey && !inputmask.ignorable) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) {
      if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Enter) {
        if (inputmask.undoValue !== inputmask._valueGet(true)) {
          inputmask.undoValue = inputmask._valueGet(true);
          setTimeout(function () {
            $input.trigger("change");
          }, 0);
        }
      }
    } else if (c) {
      // special treat the decimal separator
      // if ((k === 44 || k === 46) && e.location === 3 && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
      let pos = checkval ? {
          begin: ndx,
          end: ndx
        } : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input),
        forwardPosition;

      // allow for character substitution
      if (!checkval) c = opts.substitutes[c] || c;
      maskset.writeOutBuffer = true;
      const valResult = _validation__WEBPACK_IMPORTED_MODULE_5__/* .isValid */ .fn.call(inputmask, pos, c, strict, undefined, undefined, undefined, checkval);
      if (valResult !== false) {
        _positioning__WEBPACK_IMPORTED_MODULE_4__/* .resetMaskSet */ .eo.call(inputmask, true);
        forwardPosition = valResult.caret !== undefined ? valResult.caret : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekNext */ .u4.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos);
        maskset.p = forwardPosition; // needed for checkval
      }
      forwardPosition = opts.numericInput && valResult.caret === undefined ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekPrevious */ .Ef.call(inputmask, forwardPosition) : forwardPosition;
      if (writeOut !== false) {
        setTimeout(function () {
          opts.onKeyValidation.call(input, c, valResult);
        }, 0);
        if (maskset.writeOutBuffer && valResult !== false) {
          const buffer = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask);
          (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .writeBuffer */ .Au)(input, buffer, forwardPosition, e, checkval !== true);
        }
      }
      e.preventDefault();
      if (checkval) {
        if (valResult !== false) valResult.forwardPosition = forwardPosition;
        return valResult;
      }
    }
  },
  pasteEvent: async function (e) {
    function handlePaste(inputmask, input, inputValue, pastedValue, onBeforePaste) {
      let caretPos = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, undefined, undefined, true),
        valueBeforeCaret = inputValue.substr(0, caretPos.begin),
        valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
      if (valueBeforeCaret == (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask)).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
      if (valueAfterCaret == (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask)).slice(caretPos.end).join("")) valueAfterCaret = "";
      pastedValue = valueBeforeCaret + pastedValue + valueAfterCaret;
      if (inputmask.isRTL && opts.numericInput !== true) {
        pastedValue = pastedValue.split("");
        for (const c of _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask)) {
          if (pastedValue[0] === c) pastedValue.shift();
        }
        pastedValue = pastedValue.reverse().join("");
      }
      let pasteValue = pastedValue;
      if (typeof onBeforePaste === "function") {
        pasteValue = onBeforePaste.call(inputmask, pasteValue, opts);
        if (pasteValue === false) {
          return false;
        }
        if (!pasteValue) {
          pasteValue = inputValue;
        }
      }
      (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .checkVal */ .eP)(input, true, false, pasteValue.toString().split(""), e);
    }
    const input = this,
      inputmask = this.inputmask,
      opts = inputmask.opts;
    let inputValue = inputmask._valueGet(true),
      pastedValue;
    inputmask.skipInputEvent = true;
    if (e.clipboardData && e.clipboardData.getData) {
      pastedValue = e.clipboardData.getData("text/plain");
    } else if (_global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.clipboardData && _global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.clipboardData.getData) {
      // IE
      pastedValue = _global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.clipboardData.getData("Text");
    }
    handlePaste(inputmask, input, inputValue, pastedValue, opts.onBeforePaste);
    e.preventDefault();
  },
  inputFallBackEvent: function (e) {
    // fallback when keypress is not triggered
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib;

    // console.log(e.inputType);

    function analyseChanges(inputValue, buffer, caretPos) {
      let frontPart = inputValue.substr(0, caretPos.begin).split(""),
        backPart = inputValue.substr(caretPos.begin).split(""),
        frontBufferPart = buffer.substr(0, caretPos.begin).split(""),
        backBufferPart = buffer.substr(caretPos.begin).split(""),
        fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length,
        bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length,
        bl,
        i,
        action = "",
        data = [],
        marker = "~",
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
        placeholder = _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getPlaceholder */ .G_.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .translatePosition */ .Mu.call(inputmask, i));
        switch (action) {
          case "insertText":
            if (oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1) {
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
              } else if (newBuffer[i] === marker) {
                // delete~backspace
                action = "deleteContentBackward";
                if (_positioning__WEBPACK_IMPORTED_MODULE_4__/* .isMask */ .$b.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .translatePosition */ .Mu.call(inputmask, i), true) || oldBuffer[i] === opts.radixPoint) caretPos.end++;
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
    let input = this,
      inputValue = input.inputmask._valueGet(true),
      buffer = (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask)).join(""),
      caretPos = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, undefined, undefined, true),
      changes;
    if (buffer !== inputValue) {
      changes = analyseChanges(inputValue, buffer, caretPos);
      if (input.getRootNode().activeElement !== input) {
        input.focus();
      }
      (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .writeBuffer */ .Au)(input, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask));
      _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, caretPos.begin, caretPos.end, true);

      // Japanese IME hack #2662
      if (!_environment__WEBPACK_IMPORTED_MODULE_0__/* .mobile */ .H && inputmask.skipNextInsert && e.inputType === "insertText" && changes.action === "insertText" && inputmask.isComposing) {
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
            keypress.key = entry;
            inputmask.ignorable = false; // make sure ignorable is ignored ;-)
            EventHandlers.keypressEvent.call(input, keypress);
          });
          setTimeout(function () {
            // #2195 trigger keyup to help some other plugins to track changes
            inputmask.$el.trigger("keyup");
          }, 0);
          break;
        case "deleteContentBackward":
          var keydown = new $.Event("keydown");
          keydown.key = _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Backspace;
          EventHandlers.keyEvent.call(input, keydown);
          break;
        default:
          (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .applyInputValue */ .gc)(input, inputValue, e);
          _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, caretPos.begin, caretPos.end, true);
          break;
      }
      e.preventDefault();
    }
  },
  setValueEvent: function (e) {
    const inputmask = this.inputmask,
      $ = inputmask.dependencyLib;
    let input = this,
      value = e && e.detail ? e.detail[0] : arguments[1];
    if (value === undefined) {
      value = input.inputmask._valueGet(true);
    }
    (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .applyInputValue */ .gc)(input, value, new $.Event("input"), (e && e.detail ? e.detail[0] : arguments[1]) !== undefined);
    if (e.detail && e.detail[1] !== undefined || arguments[2] !== undefined) {
      _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, e.detail ? e.detail[1] : arguments[2]);
    }
  },
  focusEvent: function (e) {
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      input = this,
      nptValue = inputmask && inputmask._valueGet();
    if (opts.showMaskOnFocus) {
      if (nptValue !== _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).join("")) {
        (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .writeBuffer */ .Au)(input, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask), _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekNext */ .u4.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getLastValidPosition */ .SE.call(inputmask)));
      } /* else if (mouseEnter === false) { //only executed on focus without mouseenter
        caret(input, seekNext(getLastValidPosition()));
        } */
    }
    if (opts.positionCaretOnTab === true && inputmask.mouseEnter === false && (!_validation__WEBPACK_IMPORTED_MODULE_5__/* .isComplete */ .As.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask)) || _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getLastValidPosition */ .SE.call(inputmask) === -1)) {
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
      (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .HandleNativePlaceholder */ .b1)(input, inputmask.originalPlaceholder);
    }
  },
  clickEvent: function (e, tabbed) {
    const inputmask = this.inputmask;
    inputmask.clicked++;
    const input = this;
    if (input.getRootNode().activeElement === input) {
      const newCaretPosition = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .determineNewCaretPosition */ .wD.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input), tabbed);
      if (newCaretPosition !== undefined) {
        _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, newCaretPosition);
      }
    }
  },
  cutEvent: function (e) {
    const inputmask = this.inputmask,
      maskset = inputmask.maskset,
      input = this,
      pos = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input),
      // correct clipboardData
      clipData = inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).slice(pos.end, pos.begin) : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).slice(pos.begin, pos.end),
      clipDataText = inputmask.isRTL ? clipData.reverse().join("") : clipData.join("");
    if (_global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.navigator && _global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.navigator.clipboard) _global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.navigator.clipboard.writeText(clipDataText);else if (_global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.clipboardData && _global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.clipboardData.getData) {
      // IE
      _global_window__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.clipboardData.setData("Text", clipDataText);
    }
    _validation__WEBPACK_IMPORTED_MODULE_5__/* .handleRemove */ .Nr.call(inputmask, input, _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Delete, pos);
    (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .writeBuffer */ .Au)(input, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask), maskset.p, e, inputmask.undoValue !== inputmask._valueGet(true));
  },
  blurEvent: function (e) {
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib;
    inputmask.clicked = 0;
    const $input = $(this),
      input = this;
    if (input.inputmask) {
      (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .HandleNativePlaceholder */ .b1)(input, inputmask.originalPlaceholder);
      let nptValue = input.inputmask._valueGet(),
        buffer = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).slice();
      if (nptValue !== "") {
        if (opts.clearMaskOnLostFocus) {
          if (_positioning__WEBPACK_IMPORTED_MODULE_4__/* .getLastValidPosition */ .SE.call(inputmask) === -1 && nptValue === _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).join("")) {
            buffer = [];
          } else {
            // clearout optional tail of the mask
            _inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .clearOptionalTail */ .ys.call(inputmask, buffer);
          }
        }
        if (_validation__WEBPACK_IMPORTED_MODULE_5__/* .isComplete */ .As.call(inputmask, buffer) === false) {
          setTimeout(function () {
            $input.trigger("incomplete");
          }, 0);
          if (opts.clearIncomplete) {
            _positioning__WEBPACK_IMPORTED_MODULE_4__/* .resetMaskSet */ .eo.call(inputmask, false);
            if (opts.clearMaskOnLostFocus) {
              buffer = [];
            } else {
              buffer = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).slice();
            }
          }
        }
        (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .writeBuffer */ .Au)(input, buffer, undefined, e);
      }
      nptValue = inputmask._valueGet(true);
      if (inputmask.undoValue !== nptValue) {
        const bufferTemplateStr = (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask)).join("");
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
      const bufferTemplate = (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask)).join("");
      if (showMaskOnHover) {
        (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .HandleNativePlaceholder */ .b1)(input, bufferTemplate);
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
    if (/* opts.clearMaskOnLostFocus && */_positioning__WEBPACK_IMPORTED_MODULE_4__/* .getLastValidPosition */ .SE.call(inputmask) === -1 && inputmask._valueGet && inputmask._valueGet() === _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).join("")) {
      inputmask._valueSet(""); // clear masktemplete on submit and still has focus
    }
    if (opts.clearIncomplete && _validation__WEBPACK_IMPORTED_MODULE_5__/* .isComplete */ .As.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask)) === false) {
      inputmask._valueSet("");
    }
    if (opts.removeMaskOnSubmit) {
      inputmask._valueSet(inputmask.unmaskedvalue(), true);
      setTimeout(function () {
        (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .writeBuffer */ .Au)(inputmask.el, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask));
      }, 0);
    }
  },
  resetEvent: function () {
    const inputmask = this.inputmask;
    inputmask.refreshValue = true; // indicate a forced refresh when there is a call to the value before leaving the triggering event fn
    setTimeout(function () {
      (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__/* .applyInputValue */ .gc)(inputmask.el, inputmask._valueGet(true));
    }, 0);
  }
};

/***/ },

/***/ 266
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (canUseDOM ? window : {});
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "A", 0, /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ ]);


/***/ },

/***/ 507
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Au: () => (/* binding */ writeBuffer),
/* harmony export */   b1: () => (/* binding */ HandleNativePlaceholder),
/* harmony export */   eP: () => (/* binding */ checkVal),
/* harmony export */   gc: () => (/* binding */ applyInputValue),
/* harmony export */   q4: () => (/* binding */ unmaskedvalue),
/* harmony export */   ys: () => (/* binding */ clearOptionalTail)
/* harmony export */ });
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(351);
/* harmony import */ var _eventhandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _inputmask_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(375);
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(539);
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(687);
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(895);








function applyInputValue(input, value, initialEvent, strict) {
  const inputmask = input ? input.inputmask : this,
    opts = inputmask.opts;
  input.inputmask.refreshValue = false;
  if (strict !== true && typeof opts.onBeforeMask === "function") value = opts.onBeforeMask.call(inputmask, value, opts) || value;
  value = (value || "").toString().split("");
  checkVal(input, true, false, value, initialEvent);
  inputmask.undoValue = inputmask._valueGet(true);
  if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).join("") && _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getLastValidPosition */ .SE.call(inputmask) === -1) {
    input.inputmask._valueSet("");
  }
}

// todo put on prototype?
function clearOptionalTail(buffer) {
  const inputmask = this;
  buffer.length = 0;
  let template = _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getMaskTemplate */ .XR.call(inputmask, true, 0, true, undefined, true),
    lmnt;
  while ((lmnt = template.shift()) !== undefined) buffer.push(lmnt);
  return buffer;
}
function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
  const inputmask = input ? input.inputmask : this,
    maskset = inputmask.maskset,
    opts = inputmask.opts,
    $ = inputmask.dependencyLib;
  let inputValue = nptvl.slice(),
    charCodes = "",
    initialNdx = -1,
    result,
    skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
  opts.skipOptionalPartCharacter = ""; // see issue #2311

  function isTemplateMatch(ndx, charCodes) {
    let targetTemplate = _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getMaskTemplate */ .XR.call(inputmask, true, 0).slice(ndx, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekNext */ .u4.call(inputmask, ndx, false, false)).join("").replace(/'/g, ""),
      charCodeNdx = targetTemplate.indexOf(charCodes);
    // strip spaces from targetTemplate
    while (charCodeNdx > 0 && targetTemplate[charCodeNdx - 1] === " ") charCodeNdx--;
    const match = charCodeNdx === 0 && !_positioning__WEBPACK_IMPORTED_MODULE_4__/* .isMask */ .$b.call(inputmask, ndx) && (_validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, ndx).match.static === true && _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, ndx).match.nativeDef === " " && (_validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, ndx + 1).match.static === true && _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
    if (!match && charCodeNdx > 0 && !_positioning__WEBPACK_IMPORTED_MODULE_4__/* .isMask */ .$b.call(inputmask, ndx, false, true)) {
      const nextPos = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekNext */ .u4.call(inputmask, ndx);
      if (inputmask.caretPos.begin < nextPos) {
        inputmask.caretPos = {
          begin: nextPos
        };
      }
    }
    return match;
  }
  _positioning__WEBPACK_IMPORTED_MODULE_4__/* .resetMaskSet */ .eo.call(inputmask, false);
  inputmask.clicked = 0; // reset click counter to correctly determine the caretposition in checkval
  initialNdx = opts.radixPoint ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .determineNewCaretPosition */ .wD.call(inputmask, {
    begin: 0,
    end: 0
  }, false, opts.__financeInput === false ? "radixFocus" : undefined).begin : 0;
  maskset.p = initialNdx;
  inputmask.caretPos = {
    begin: initialNdx
  };
  let staticMatches = [],
    prevCaretPos = inputmask.caretPos;
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
      const lvp = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getLastValidPosition */ .SE.call(inputmask, undefined, true);
      if (!isTemplateMatch(initialNdx, charCodes)) {
        result = _eventhandlers__WEBPACK_IMPORTED_MODULE_1__/* .EventHandlers */ .C.keypressEvent.call(inputmask, keypress, true, false, strict, inputmask.caretPos.begin);
        if (result) {
          initialNdx = inputmask.caretPos.begin + 1;
          charCodes = "";
        }
      } else {
        result = _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getTest */ .bm.call(inputmask, ndx).match.static === true ? _eventhandlers__WEBPACK_IMPORTED_MODULE_1__/* .EventHandlers */ .C.keypressEvent.call(inputmask, keypress, true, false, strict, lvp + 1) : false;
      }
      if (result) {
        if (result.pos !== undefined && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true && maskset.validPositions[result.pos].alternation === undefined) {
          staticMatches.push(result.pos);
          if (!inputmask.isRTL) {
            result.forwardPosition = result.pos + 1;
          }
        }
        writeBuffer.call(inputmask, undefined, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask), result.forwardPosition, keypress, false);
        inputmask.caretPos = {
          begin: result.forwardPosition,
          end: result.forwardPosition
        };
        prevCaretPos = inputmask.caretPos;
      } else {
        if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === _validation_tests__WEBPACK_IMPORTED_MODULE_6__/* .getPlaceholder */ .G_.call(inputmask, ndx) && _positioning__WEBPACK_IMPORTED_MODULE_4__/* .isMask */ .$b.call(inputmask, ndx, true)) {
          inputmask.caretPos.begin++;
        } else inputmask.caretPos = prevCaretPos; // restore the caret position from before the failed validation
      }
    }
  });
  if (staticMatches.length > 0) {
    let sndx,
      validPos,
      nextValid = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .seekNext */ .u4.call(inputmask, -1, undefined, false);
    if (!_validation__WEBPACK_IMPORTED_MODULE_5__/* .isComplete */ .As.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask)) && staticMatches.length <= nextValid || _validation__WEBPACK_IMPORTED_MODULE_5__/* .isComplete */ .As.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask)) && staticMatches.length > 0 && staticMatches.length !== nextValid && staticMatches[0] === 0) {
      // should check if is sequence starting from 0
      let nextSndx = nextValid;
      while ((sndx = staticMatches.shift()) !== undefined) {
        if (sndx < nextSndx) {
          const keypress = new $.Event("_checkval");
          validPos = maskset.validPositions[sndx];
          validPos.generatedInput = true;
          keypress.key = validPos.input;
          result = _eventhandlers__WEBPACK_IMPORTED_MODULE_1__/* .EventHandlers */ .C.keypressEvent.call(inputmask, keypress, true, false, strict, nextSndx);
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
    writeBuffer.call(inputmask, input, _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && (initiatingEvent.type === "input" && inputmask.undoValue !== _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).join("") || initiatingEvent.type === "paste"));
    // for (var vndx in maskset.validPositions) {
    // 	if (maskset.validPositions[vndx].match.generated !== true) { //only remove non forced generated
    // 		delete maskset.validPositions[vndx].generatedInput; //clear generated markings ~ consider initializing with a  value as fully typed
    // 	}
    // }
  }
  opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}
function HandleNativePlaceholder(npt, value) {
  const inputmask = npt ? npt.inputmask : this;
  if (_environment__WEBPACK_IMPORTED_MODULE_0__.ie) {
    if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
      let buffer = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).slice(),
        nptValue = npt.inputmask._valueGet();
      if (nptValue !== value) {
        const lvp = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getLastValidPosition */ .SE.call(inputmask);
        if (lvp === -1 && nptValue === _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).join("")) {
          buffer = [];
        } else if (lvp !== -1) {
          // clearout optional tail of the mask
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
    if (vps[pndx] && vps[pndx].match && (vps[pndx].match.static != true || opts.keepStatic !== true && Array.isArray(maskset.metadata) && vps[pndx].generatedInput !== true)) {
      // only include non generated input with multiple masks (check on metadata) and without keepStatic true
      umValue.push(vps[pndx].input);
    }
  }
  let unmaskedValue = umValue.length === 0 ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
  if (typeof opts.onUnMask === "function") {
    const bufferValue = (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask)).join("");
    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
  }
  if (opts.outputMask && unmaskedValue.length > 0) {
    return _inputmask_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.format(unmaskedValue, {
      ...opts,
      mask: opts.outputMask,
      alias: null
    });
  }
  return unmaskedValue;
}
function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
  const inputmask = input ? input.inputmask : this,
    opts = inputmask.opts,
    $ = inputmask.dependencyLib;
  if (event && typeof opts.onBeforeWrite === "function") {
    //    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
    const result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
    if (result) {
      if (result.refreshFromBuffer) {
        const refresh = result.refreshFromBuffer;
        _validation__WEBPACK_IMPORTED_MODULE_5__/* .refreshFromBuffer */ .m5.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
        buffer = _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBuffer */ .Zo.call(inputmask, true);
      }
      if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
    }
  }
  if (input !== undefined) {
    input.inputmask._valueSet(buffer.join(""));
    if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
      // console.log(caretPos);
      _positioning__WEBPACK_IMPORTED_MODULE_4__/* .caret */ .OW.call(inputmask, input, caretPos, undefined, undefined, event !== undefined && event.type === "keydown" && (event.key === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Delete || event.key === _keycode_js__WEBPACK_IMPORTED_MODULE_3__/* .keys */ .HP.Backspace));
    }
    input.inputmask.writeBufferHook === undefined || input.inputmask.writeBufferHook(caretPos);
    if (triggerEvents === true) {
      const $input = $(input),
        nptVal = input.inputmask._valueGet();
      input.inputmask.skipInputEvent = true;
      $input.trigger("input");
      setTimeout(function () {
        // timeout needed for IE
        if (nptVal === _positioning__WEBPACK_IMPORTED_MODULE_4__/* .getBufferTemplate */ .Tc.call(inputmask).join("")) {
          $input.trigger("cleared");
        } else if (_validation__WEBPACK_IMPORTED_MODULE_5__/* .isComplete */ .As.call(inputmask, buffer) === true) {
          $input.trigger("complete");
        }
      }, 0);
    }
  }
}

/***/ },

/***/ 375
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  z2: () => (/* binding */ aliases),
  Ay: () => (/* binding */ lib_inputmask),
  st: () => (/* binding */ masksCache)
});

;// ./lib/defaults.js
/**
 * Public options surface for Inputmask instances.
 *
 * @typedef {Object} InputmaskOptions
 * @property {number} [_maxTestPos]
 * @property {string} [placeholder]
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
 * @property {((buffer: string[], pos: number, char: string, currentResult: boolean | Object, opts: InputmaskOptions, maskset: any, strict: boolean, fromCheckval: boolean, fromAlternate: boolean) => boolean | Object) | null} [postValidation]
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
 * @property {number} [validationEventTimeOut]
 * @property {Record<string, string>} [substitutes]
 */

/** @type {InputmaskOptions} */
const defaults = {
  _maxTestPos: 500,
  placeholder: "_",
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
  // hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval, fromAlternate => return true/false/json
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
  substitutes: {} // define character substitutes
};
/* harmony default export */ const lib_defaults = (defaults);
// EXTERNAL MODULE: ./lib/definitions.js
var definitions = __webpack_require__(472);
// EXTERNAL MODULE: ./lib/dependencyLibs/inputmask.dependencyLib.js + 3 modules
var inputmask_dependencyLib = __webpack_require__(123);
// EXTERNAL MODULE: ./lib/inputHandling.js
var inputHandling = __webpack_require__(507);
// EXTERNAL MODULE: ./lib/keycode.js
var keycode = __webpack_require__(32);
// EXTERNAL MODULE: ./lib/positioning.js
var positioning = __webpack_require__(539);
;// ./lib/eventruler.js





const EventRuler = {
  on: function (input, eventName, eventHandler) {
    const $ = input.inputmask.dependencyLib;
    let ev = function (e) {
      if (e.originalEvent) {
        e = e.originalEvent || e; // get original event from jquery event
        arguments[0] = e;
      }
      // console.log(e.type);
      const that = this,
        inputmask = that.inputmask,
        opts = inputmask ? inputmask.opts : undefined;
      let args;
      if (inputmask === undefined && this.nodeName !== "FORM") {
        // happens when cloning an object with jquery.clone
        const imOpts = $.data(that, "_inputmask_opts");
        $(that).off(); // unbind all events
        if (imOpts) {
          new lib_inputmask(imOpts).mask(that);
        }
      } else if (!["submit", "reset", "setvalue"].includes(e.type) && this.nodeName !== "FORM" && (that.disabled || that.readOnly && !(e.type === "keydown" && e.ctrlKey && e.key === keycode/* keys */.HP.c || opts.tabThrough === false && e.key === keycode/* keys */.HP.Tab))) {
        e.preventDefault();
      } else {
        switch (e.type) {
          case "input":
            if (inputmask.skipInputEvent === true) {
              inputmask.skipInputEvent = false;
              return e.preventDefault();
            }

            // #2855
            // Prevent duplicate input processing between keyEvent and inputFallBackEvent
            // This fixes Chinese IME duplication issue on Safari where both events fire for the same input
            // if (
            //   inputmask.lastInputEvent &&
            //   Date.now() - inputmask.lastInputEvent.time < 10 &&
            //   inputmask.lastInputEvent.data === e.data
            // ) {
            //   return;
            // }
            // Mark input as processed to prevent duplicate handling by keyEvent
            // This fixes Chinese IME duplication issue on Safari #2855
            inputmask.lastInputEvent = {
              time: Date.now(),
              data: e.data
            };

            // if (mobile) { //this causes problem see #2220
            // 	args = arguments;
            // 	setTimeout(function () { //needed for caret selection when entering a char on Android 8 - #1818
            // 		eventHandler.apply(that, args);
            // 		caret(that, that.inputmask.caretPos, undefined, true);
            // 	}, 0);
            // 	return false;
            // }
            break;
          case "keydown":
            // Prevent duplicate input processing between keyEvent and inputFallBackEvent #2855
            // This fixes Chinese IME duplication issue on Safari where both events fire for the same input
            if (inputmask.lastInputEvent && Date.now() - inputmask.lastInputEvent.time < 10 && inputmask.lastInputEvent.data === e.key) {
              return false;
            }
            break;
          case "click":
          case "focus":
            if (inputmask.validationEvent) {
              // #841
              inputmask.validationEvent = false;
              input.blur();
              (0,inputHandling/* HandleNativePlaceholder */.b1)(input, (inputmask.isRTL ? positioning/* getBufferTemplate */.Tc.call(inputmask).slice().reverse() : positioning/* getBufferTemplate */.Tc.call(inputmask)).join(""));
              setTimeout(function () {
                input.focus();
              }, opts.validationEventTimeOut);
              return false;
            }
            args = arguments;
            setTimeout(function () {
              // needed for Chrome ~ initial selection clears after the clickevent
              if (!input.inputmask) {
                // `inputmask.remove()` was called before this callback
                return;
              }
              eventHandler.apply(that, args);
            }, 0);
            return;
          /* false */ // #2423
        }
        const returnVal = eventHandler.apply(that, arguments);
        if (returnVal === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        return returnVal;
      }
    };
    // add inputmask namespace to event
    eventName = `${eventName}.inputmask`;
    if (["submit.inputmask", "reset.inputmask"].includes(eventName)) {
      ev = ev.bind(input); // bind creates a new eventhandler (wrap)
      if (input.form !== null) $(input.form).on(eventName, ev);
    } else {
      $(input).on(eventName, ev);
    }
  },
  off: function (input, event) {
    if (input.inputmask) {
      const $ = input.inputmask.dependencyLib;
      $(input).off(event || ".inputmask");
    }
  }
};
// EXTERNAL MODULE: ./lib/global/window.js
var global_window = __webpack_require__(266);
// EXTERNAL MODULE: ./lib/environment.js
var environment = __webpack_require__(351);
// EXTERNAL MODULE: ./lib/eventhandlers.js
var eventhandlers = __webpack_require__(47);
// EXTERNAL MODULE: ./lib/validation.js
var validation = __webpack_require__(687);
;// ./lib/mask.js








// todo put on the prototype?
function mask() {
  const inputmask = this,
    opts = this.opts,
    el = this.el,
    $ = this.dependencyLib;
  function isElementTypeSupported(input, opts) {
    function patchValueProperty(npt) {
      let valueGet, valueSet;
      function patchValhook(type) {
        if ($.valHooks && ($.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true)) {
          const valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
              return elem.value;
            },
            valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
              elem.value = value;
              return elem;
            };
          $.valHooks[type] = {
            get: function (elem) {
              if (elem.inputmask) {
                if (elem.inputmask.opts.autoUnmask) {
                  return elem.inputmask.unmaskedvalue();
                } else {
                  const result = valhookGet(elem);
                  return positioning/* getLastValidPosition */.SE.call(inputmask, undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                }
              } else {
                return valhookGet(elem);
              }
            },
            set: function (elem, value) {
              const result = valhookSet(elem, value);
              if (elem.inputmask) {
                (0,inputHandling/* applyInputValue */.gc)(elem, value);
              }
              return result;
            },
            inputmaskpatch: true
          };
        }
      }
      function getter() {
        if (this.inputmask) {
          return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : positioning/* getLastValidPosition */.SE.call(inputmask) !== -1 || opts.nullable !== true ? this.getRootNode().activeElement === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? inputHandling/* clearOptionalTail */.ys.call(inputmask, positioning/* getBuffer */.Zo.call(inputmask).slice()).reverse() : inputHandling/* clearOptionalTail */.ys.call(inputmask, positioning/* getBuffer */.Zo.call(inputmask).slice())).join("") : valueGet.call(this) : "";
        } else {
          return valueGet.call(this);
        }
      }
      function setter(value) {
        valueSet.call(this, value);
        if (this.inputmask) {
          (0,inputHandling/* applyInputValue */.gc)(this, value);
        }
      }
      function installNativeValueSetFallback(npt) {
        EventRuler.on(npt, "mouseenter", function () {
          const input = this,
            value = input.inputmask._valueGet(true),
            bufferValue = (input.inputmask.isRTL ? positioning/* getBuffer */.Zo.call(input.inputmask).slice().reverse() : positioning/* getBuffer */.Zo.call(input.inputmask)).join("");
          if (value != bufferValue) {
            (0,inputHandling/* applyInputValue */.gc)(input, value);
          }
        });
      }
      if (!npt.inputmask.__valueGet) {
        if (opts.noValuePatching !== true) {
          if (Object.getOwnPropertyDescriptor) {
            const valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
            if (valueProperty && valueProperty.get && valueProperty.set) {
              valueGet = valueProperty.get;
              valueSet = valueProperty.set;
              Object.defineProperty(npt, "value", {
                get: getter,
                set: setter,
                configurable: true
              });
            } else if (npt.tagName.toLowerCase() !== "input") {
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
          npt.inputmask.__valueGet = valueGet; // store native property getter
          npt.inputmask.__valueSet = valueSet; // store native property setter
        }
        npt.inputmask._valueGet = function (overruleRTL) {
          return inputmask.isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
        };
        npt.inputmask._valueSet = function (value, overruleRTL) {
          // null check is needed for IE8 => otherwise converts to "null"
          valueSet.call(this.el, value === null || value === undefined ? "" : overruleRTL !== true && inputmask.isRTL ? value.split("").reverse().join("") : value);
        };
        if (valueGet === undefined) {
          // jquery.val fallback
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
    const elementType = input.getAttribute("type");
    let isSupported = input.tagName.toLowerCase() === "input" && opts.supportsInputType.includes(elementType) || input.isContentEditable || input.tagName.toLowerCase() === "textarea";
    if (!isSupported) {
      if (input.tagName.toLowerCase() === "input") {
        let el = document.createElement("input");
        el.setAttribute("type", elementType);
        isSupported = el.type === "text"; // apply mask only if the type is not natively supported
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

  // unbind all events - to make sure that no other mask will interfere when re-masking
  EventRuler.off(el);
  const isSupported = isElementTypeSupported(el, opts);
  if (isSupported !== false) {
    inputmask.originalPlaceholder = el.placeholder;

    // read maxlength prop from el
    inputmask.maxLength = el !== undefined ? el.maxLength : undefined;
    if (inputmask.maxLength === -1) inputmask.maxLength = undefined;
    if ("inputMode" in el && el.getAttribute("inputmode") === null) {
      el.inputMode = opts.inputmode;
      el.setAttribute("inputmode", opts.inputmode);
    }
    if (isSupported === true) {
      opts.showMaskOnFocus = opts.showMaskOnFocus && ["cc-number", "cc-exp"].indexOf(el.autocomplete) === -1;
      if (environment/* iphone */.Q) {
        // selecting the caret shows as a selection on iphone
        opts.insertModeVisual = false;
        // disable autocorrect
        el.setAttribute("autocorrect", "off");
      }

      // bind events
      EventRuler.on(el, "submit", eventhandlers/* EventHandlers */.C.submitEvent);
      EventRuler.on(el, "reset", eventhandlers/* EventHandlers */.C.resetEvent);
      EventRuler.on(el, "blur", eventhandlers/* EventHandlers */.C.blurEvent);
      EventRuler.on(el, "focus", eventhandlers/* EventHandlers */.C.focusEvent);
      EventRuler.on(el, "invalid", eventhandlers/* EventHandlers */.C.invalidEvent);
      EventRuler.on(el, "click", eventhandlers/* EventHandlers */.C.clickEvent);
      EventRuler.on(el, "mouseleave", eventhandlers/* EventHandlers */.C.mouseleaveEvent);
      EventRuler.on(el, "mouseenter", eventhandlers/* EventHandlers */.C.mouseenterEvent);
      EventRuler.on(el, "paste", eventhandlers/* EventHandlers */.C.pasteEvent);
      EventRuler.on(el, "cut", eventhandlers/* EventHandlers */.C.cutEvent);
      EventRuler.on(el, "complete", opts.oncomplete);
      EventRuler.on(el, "incomplete", opts.onincomplete);
      EventRuler.on(el, "cleared", opts.oncleared);
      if (opts.inputEventOnly !== true) {
        EventRuler.on(el, "keydown", eventhandlers/* EventHandlers */.C.keyEvent);
      }
      if (environment/* mobile */.H || opts.inputEventOnly) {
        el.removeAttribute("maxLength");
      }
      EventRuler.on(el, "input", eventhandlers/* EventHandlers */.C.inputFallBackEvent);
      // EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent); //https://github.com/w3c/input-events - to implement
    }
    EventRuler.on(el, "setvalue", eventhandlers/* EventHandlers */.C.setValueEvent);

    // apply mask
    inputmask.applyMaskHook === undefined || inputmask.applyMaskHook();
    positioning/* getBufferTemplate */.Tc.call(inputmask).join(""); // initialize the buffer and getmasklength
    inputmask.undoValue = inputmask._valueGet(true);
    const activeElement = el.getRootNode().activeElement;
    if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || activeElement === el) {
      (0,inputHandling/* applyInputValue */.gc)(el, el.inputmask._valueGet(true));
      let buffer = positioning/* getBuffer */.Zo.call(inputmask).slice();
      if (validation/* isComplete */.As.call(inputmask, buffer) === false) {
        if (opts.clearIncomplete) {
          positioning/* resetMaskSet */.eo.call(inputmask, false);
        }
      }
      if (opts.clearMaskOnLostFocus && activeElement !== el) {
        if (positioning/* getLastValidPosition */.SE.call(inputmask) === -1) {
          buffer = [];
        } else {
          inputHandling/* clearOptionalTail */.ys.call(inputmask, buffer);
        }
      }
      if (opts.clearMaskOnLostFocus === false || opts.showMaskOnFocus && activeElement === el || el.inputmask._valueGet(true) !== "") {
        (0,inputHandling/* writeBuffer */.Au)(el, buffer);
      }
      if (activeElement === el) {
        // position the caret when in focus
        positioning/* caret */.OW.call(inputmask, el, positioning/* seekNext */.u4.call(inputmask, positioning/* getLastValidPosition */.SE.call(inputmask)));
      } else {
        positioning/* caret */.OW.call(inputmask, el, 0);
      }
    }
  }
}
// EXTERNAL MODULE: ./lib/escapeRegex.js
var escapeRegex = __webpack_require__(340);
;// ./lib/masktoken.js
/* harmony default export */ function masktoken(isGroup, isOptional, isQuantifier, isAlternator) {
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
;// ./lib/mask-lexer.js






function generateMaskSet(opts, nocache) {
  let ms;
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
        mask = mask.replace(new RegExp(`${(0,escapeRegex/* escapeRegex */.$)(p1)}\\[${(0,escapeRegex/* escapeRegex */.$)(p2)}\\]`), p1.charAt(0) === p2.charAt(0) ? `(${p1}|${p1}${p2})` : `${p1}[${p2}]`);
        // console.log(mask);
      });
    }
    return mask;
  }
  function generateMask(mask, metadata, opts) {
    let regexMask = false;
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
    } // hide placeholder with single non-greedy mask
    mask = preProcessMask(mask, opts);

    // console.log(mask);
    let masksetDefinition, maskdefKey;
    maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
    if (opts.keepStatic !== null) {
      // keepstatic modifies the output from the testdefinitions ~ so differentiate in the maskcache
      maskdefKey = "ks_" + opts.keepStatic + maskdefKey;
    }
    if (typeof opts.placeholder === "object") {
      // placeholder object modifies the output from the testdefinitions ~ so differentiate in the maskcache
      maskdefKey = "ph_" + JSON.stringify(opts.placeholder) + maskdefKey;
    }
    if (masksCache[maskdefKey] === undefined || nocache === true) {
      masksetDefinition = {
        mask,
        maskToken: analyseMask(mask, regexMask, opts),
        validPositions: [],
        _buffer: undefined,
        buffer: undefined,
        tests: {},
        excludes: {},
        // excluded alternations
        metadata,
        maskLength: undefined,
        jitOffset: {}
      };
      if (nocache !== true) {
        masksCache[maskdefKey] = masksetDefinition;
        masksetDefinition = inputmask_dependencyLib/* default */.A.extend(true, {}, masksCache[maskdefKey]);
      }
    } else {
      masksetDefinition = inputmask_dependencyLib/* default */.A.extend(true, {}, masksCache[maskdefKey]);
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
function analyseMask(mask, regexMask, opts) {
  const tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
    // Thx to https://github.com/slevithan/regex-colorizer for the regexTokenizer regex
    regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
    currentToken = new masktoken(),
    openenings = [],
    maskTokens = [];
  let escaped = false,
    match,
    m,
    openingToken,
    currentOpeningToken,
    alternator,
    lastMatch,
    closeRegexGroup = false;

  // test definition => {fn: RegExp/function, static: true/false optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
  function insertTestDefinition(mtoken, element, position) {
    position = position !== undefined ? position : mtoken.matches.length;
    // console.log(element, position, currentToken.matches.length);
    // if (typeof opts.placeholder === "string")
    // 	console.log(opts.placeholder.charAt(currentToken.matches.length % opts.placeholder.length));
    let prevMatch = mtoken.matches[position - 1],
      flag = opts.casing ? "i" : "";
    if (regexMask) {
      if (element.indexOf("[") === 0 || escaped && /\\d|\\s|\\w|\\p/i.test(element) || element === ".") {
        if (/\\p\{.*}/i.test(element)) flag += "u";
        mtoken.matches.splice(position++, 0, {
          fn: new RegExp(element, flag),
          static: false,
          optionality: false,
          newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element,
          casing: null,
          def: element,
          placeholder: typeof opts.placeholder === "object" ? opts.placeholder[currentToken.matches.length] : undefined,
          nativeDef: element
        });
      } else {
        if (escaped) element = element[element.length - 1];
        element.split("").forEach(function (lmnt, ndx) {
          prevMatch = mtoken.matches[position - 1];
          mtoken.matches.splice(position++, 0, {
            fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", flag) : null,
            static: true,
            optionality: false,
            newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== lmnt && prevMatch.static !== true,
            casing: null,
            def: opts.staticDefinitionSymbol || lmnt,
            placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : typeof opts.placeholder === "object" ? opts.placeholder[currentToken.matches.length] : undefined,
            nativeDef: (escaped ? "'" : "") + lmnt
          });
        });
      }
      escaped = false;
    } else {
      const maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && definitions/* default */.A[element];
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
          placeholder: maskdef.placeholder,
          nativeDef: element,
          generated: maskdef.generated
        });
      } else {
        mtoken.matches.splice(position++, 0, {
          fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", flag) : null,
          static: true,
          optionality: false,
          newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element && prevMatch.static !== true,
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
  function defaultCase() {
    if (openenings.length > 0) {
      currentOpeningToken = openenings[openenings.length - 1];
      insertTestDefinition(currentOpeningToken, m);
      if (currentOpeningToken.isAlternator) {
        // handle alternator a | b case
        alternator = openenings.pop();
        for (let mndx = 0; mndx < alternator.matches.length; mndx++) {
          if (alternator.matches[mndx].isGroup) alternator.matches[mndx].isGroup = false; // don't mark alternate groups as group
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
  function groupify(matches) {
    const groupToken = new masktoken(true);
    groupToken.openGroup = false;
    groupToken.matches = matches;
    return groupToken;
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
          alternator = openenings.pop();
          for (let mndx = 0; mndx < alternator.matches.length; mndx++) {
            alternator.matches[mndx].isGroup = false; // don't mark alternate groups as group
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
    let lastMatch = matches.pop();
    if (lastMatch.isQuantifier) {
      lastMatch = groupify([matches.pop(), lastMatch]);
    }
    return lastMatch;
  }
  if (regexMask) {
    opts.optionalmarker[0] = undefined;
    opts.optionalmarker[1] = undefined;
  }
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
        case "\\p":
          // Unicode Categories
          m += regexTokenizer.exec(mask)[0]; // {
          m += regexTokenizer.exec(mask)[0]; // ?}
          break;
        case "(?:": // non capturing group
        case "(?=": // lookahead
        case "(?!": // negative lookahead
        case "(?<=": // lookbehind
        case "(?<!":
          // negative lookbehind
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
        openenings.push(new masktoken(false, true));
        break;
      case opts.groupmarker[0]:
        // Group opening
        openenings.push(new masktoken(true));
        break;
      case opts.quantifiermarker[0]:
        {
          // Quantifier
          const quantifier = new masktoken(false, false, true);
          m = m.replace(/[{}?]/g, ""); // ? matches lazy quantifiers
          const mqj = m.split("|"),
            mq = mqj[0].split(",");
          let mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]);
          const mq1 = mq.length === 1 ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]),
            mqJit = isNaN(mqj[1]) ? mqj[1] : parseInt(mqj[1]);
          if (mq0 === "*" || mq0 === "+") {
            mq0 = mq1 === "*" ? 0 : 1;
          }
          quantifier.quantifier = {
            min: mq0,
            max: mq1,
            jit: mqJit
          };
          const matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
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
            alternator = new masktoken(false, false, false, true);
          }
          alternator.matches.push(lastMatch);
          openenings.push(alternator);
          if (lastMatch.openGroup) {
            // regexp alt syntax
            lastMatch.openGroup = false;
            const alternatorGroup = new masktoken(true);
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
// EXTERNAL MODULE: ./lib/validation-tests.js
var validation_tests = __webpack_require__(895);
;// ./lib/inputmask.js
/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */













const inputmask_document = global_window/* default */.A.document,
  dataKey = "_inputmask_opts",
  aliases = {},
  masksCache = {};

/** @typedef {import("./defaults.js").default} InputmaskOptions */
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
 * @property {(value: string, metadata?: boolean) => string | { value: string; metadata: any }} format
 * @property {(value: string) => void} setValue
 */

/**
 * @typedef {((alias?: string | InputmaskOptions, options?: InputmaskOptions, internal?: boolean) => InputmaskInstance) & {
 *   extendDefaults: (options: InputmaskOptions) => void;
 *   extendDefinitions: (definition: Record<string, any>) => void;
 *   extendAliases: (alias: Record<string, InputmaskOptions>) => void;
 *   format: (value: string, options?: InputmaskOptions, metadata?: boolean) => string | { value: string; metadata: any };
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
  this.dependencyLib = inputmask_dependencyLib/* default */.A;
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
    this.opts = inputmask_dependencyLib/* default */.A.extend(true, {}, lib_defaults, options);
    this.noMasksCache = options && options.definitions !== undefined;
    this.userOptions = options || {}; // user passed options
    resolveAlias(this.opts.alias, options, this.opts);
  }

  // maskscope properties
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
  i18n: {},
  get isRTL() {
    return this.opts.isRTL || this.opts.numericInput;
  },
  mask: function (elems) {
    const that = this;
    if (typeof elems === "string") {
      elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
    }
    elems = elems.nodeName ? [elems] : Array.isArray(elems) ? elems : [].slice.call(elems); // [].slice as alternate for Array.from (Yandex browser)
    elems.forEach(function (el, ndx) {
      const scopedOpts = inputmask_dependencyLib/* default */.A.extend(true, {}, that.opts);
      if (importAttributeOptions(el, scopedOpts, inputmask_dependencyLib/* default */.A.extend(true, {}, that.userOptions), that.dataAttribute)) {
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
          el.inputmask.userOptions = inputmask_dependencyLib/* default */.A.extend(true, {}, that.userOptions);
          // el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
          el.inputmask.el = el;
          el.inputmask.$el = (0,inputmask_dependencyLib/* default */.A)(el);
          el.inputmask.maskset = maskset;
          inputmask_dependencyLib/* default */.A.data(el, dataKey, that.userOptions);
          mask.call(el.inputmask);
        }
      }
    });
    return elems && elems[0] ? elems[0].inputmask || this : this;
  },
  option: function (options, noremask) {
    // set extra options || retrieve value of a current option
    if (typeof options === "string") {
      return this.opts[options];
    } else if (typeof options === "object") {
      inputmask_dependencyLib/* default */.A.extend(this.userOptions, options); // user passed options
      // remask
      if (this.el && noremask !== true) {
        this.mask(this.el);
      }
      return this;
    }
  },
  unmaskedvalue: function (value) {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    if (this.el === undefined || value !== undefined) {
      const valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
      inputHandling/* checkVal */.eP.call(this, undefined, false, false, valueBuffer);
      if (typeof this.opts.onBeforeWrite === "function") this.opts.onBeforeWrite.call(this, undefined, positioning/* getBuffer */.Zo.call(this), 0, this.opts);
    }
    return inputHandling/* unmaskedvalue */.q4.call(this, this.el);
  },
  remove: function () {
    if (this.el) {
      inputmask_dependencyLib/* default */.A.data(this.el, dataKey, null); // invalidate
      // writeout the value
      const cv = this.opts.autoUnmask ? (0,inputHandling/* unmaskedvalue */.q4)(this.el) : this._valueGet(this.opts.autoUnmask);
      if (cv !== positioning/* getBufferTemplate */.Tc.call(this).join("")) this._valueSet(cv, this.opts.autoUnmask);else this._valueSet("");
      // unbind all events
      EventRuler.off(this.el);

      // restore the value property
      let valueProperty;
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
      } else if (inputmask_document.__lookupGetter__ && this.el.__lookupGetter__("value")) {
        if (this.__valueGet) {
          this.el.__defineGetter__("value", this.__valueGet);
          this.el.__defineSetter__("value", this.__valueSet);
        }
      }
      // clear data
      this.el.inputmask = undefined;
    }
    return this.el;
  },
  getemptymask: function () {
    // return the default (empty) mask value, usefull for setting the default value in validation
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return (this.isRTL ? positioning/* getBufferTemplate */.Tc.call(this).reverse() : positioning/* getBufferTemplate */.Tc.call(this)).join("");
  },
  hasMaskedValue: function () {
    // check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
    return !this.opts.autoUnmask;
  },
  isComplete: function () {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return validation/* isComplete */.As.call(this, positioning/* getBuffer */.Zo.call(this));
  },
  getmetadata: function () {
    // return mask metadata if exists
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    if (Array.isArray(this.maskset.metadata)) {
      let maskTarget = validation_tests/* getMaskTemplate */.XR.call(this, true, 0, false).join("");
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
      inputHandling/* checkVal */.eP.call(this, undefined, true, false, valueBuffer);
    }
    const buffer = inputHandling/* clearOptionalTail */.ys.call(this, []),
      isC = validation/* isComplete */.As.call(this, buffer),
      isc2 = value === (this.isRTL ? buffer.reverse().join("") : buffer.join(""));
    return isC && (value === undefined || isc2);
  },
  format: function (value, metadata) {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    const valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
    inputHandling/* checkVal */.eP.call(this, undefined, true, false, valueBuffer);
    const formattedValue = this.isRTL ? positioning/* getBuffer */.Zo.call(this).slice().reverse().join("") : positioning/* getBuffer */.Zo.call(this).join("");
    return metadata ? {
      value: formattedValue,
      metadata: this.getmetadata()
    } : formattedValue;
  },
  setValue: function (value) {
    if (this.el) {
      (0,inputmask_dependencyLib/* default */.A)(this.el).trigger("setvalue", [value]);
    }
  }
};
function resolveAlias(aliasStr, options, opts) {
  const aliasDefinition = aliases[aliasStr];
  if (aliasDefinition) {
    if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); // alias is another alias
    inputmask_dependencyLib/* default */.A.extend(true, opts, aliasDefinition); // merge alias definition in the options
    inputmask_dependencyLib/* default */.A.extend(true, opts, options); // reapply extra given options
    return true;
  } // alias not found - try as mask
  else if (opts.mask === null) {
    opts.mask = aliasStr;
  }
  return false;
}
function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
  function importOption(option, optionData) {
    const attrOption = dataAttribute === "" ? option : dataAttribute + "-" + option;
    optionData = optionData !== undefined ? optionData : npt.getAttribute(attrOption);
    if (optionData !== null) {
      if (typeof optionData === "string") {
        if (option.startsWith("on")) {
          // get function definition
          optionData = global_window/* default */.A[optionData];
        } else if (optionData === "false") optionData = false;else if (optionData === "true") optionData = true;else if (option === "mask") optionData = optionData.replace(/\\\\/g, "\\");
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
      dataoptions = JSON.parse("{" + attrOptions + "}");
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
  inputmask_dependencyLib/* default */.A.extend(true, opts, userOptions);

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

// apply defaults, definitions, aliases
/**
 * @param {InputmaskOptions} options
 * @returns {void}
 */
Inputmask.extendDefaults = function (options) {
  inputmask_dependencyLib/* default */.A.extend(true, lib_defaults, options);
};
/**
 * @param {Record<string, any>} definition
 * @returns {void}
 */
Inputmask.extendDefinitions = function (definition) {
  inputmask_dependencyLib/* default */.A.extend(true, definitions/* default */.A, definition);
};
/**
 * @param {Record<string, InputmaskOptions>} alias
 * @returns {void}
 */
Inputmask.extendAliases = function (alias) {
  inputmask_dependencyLib/* default */.A.extend(true, aliases, alias);
};
// static fn on inputmask
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
/**
 * @param {InputmaskElements} elems
 * @returns {void}
 */
Inputmask.remove = function (elems) {
  if (typeof elems === "string") {
    elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
  }
  elems = elems.nodeName ? [elems] : elems;
  for (let i = 0; i < elems.length; i++) {
    if (elems[i].inputmask) elems[i].inputmask.remove();
  }
};
/**
 * @param {InputmaskElements} elems
 * @param {string} value
 * @returns {void}
 */
Inputmask.setValue = function (elems, value) {
  if (typeof elems === "string") {
    elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
  }
  elems = elems.nodeName ? [elems] : elems;
  elems.forEach(function (el) {
    if (el.inputmask) el.inputmask.setValue(value);else (0,inputmask_dependencyLib/* default */.A)(el).trigger("setvalue", [value]);
  });
};
Inputmask.dependencyLib = inputmask_dependencyLib/* default */.A;

// make inputmask available
global_window/* default */.A.Inputmask = Inputmask;
const InputmaskExport = /** @type {InputmaskStatic} */Inputmask;
/* harmony default export */ const lib_inputmask = (InputmaskExport);

/***/ },

/***/ 32
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HP: () => (/* binding */ keys),
/* harmony export */   tS: () => (/* binding */ keyCode)
/* harmony export */ });
/* unused harmony exports toKey, toKeyCode */

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
  },
  keyCodeRev = Object.entries(keyCode).reduce((acc, [key, value]) => (
  // eslint-disable-next-line no-sequences
  acc[value] = acc[value] === undefined ? key : acc[value], acc), {}),
  keys = Object.entries(keyCode).reduce(
  // eslint-disable-next-line no-sequences
  (acc, [key, value]) => (acc[key] = key === "Space" ? " " : key, acc), {});
function toKey(keyCode, shiftKey) {
  return keyCodeRev[keyCode] || (shiftKey ? String.fromCharCode(keyCode) : String.fromCharCode(keyCode).toLowerCase());
}
function toKeyCode(key) {
  return keyCode[key];
}

/***/ },

/***/ 539
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $b: () => (/* binding */ isMask),
/* harmony export */   Ef: () => (/* binding */ seekPrevious),
/* harmony export */   Mu: () => (/* binding */ translatePosition),
/* harmony export */   OW: () => (/* binding */ caret),
/* harmony export */   SE: () => (/* binding */ getLastValidPosition),
/* harmony export */   Tc: () => (/* binding */ getBufferTemplate),
/* harmony export */   Zo: () => (/* binding */ getBuffer),
/* harmony export */   c1: () => (/* binding */ determineLastRequiredPosition),
/* harmony export */   eo: () => (/* binding */ resetMaskSet),
/* harmony export */   u4: () => (/* binding */ seekNext),
/* harmony export */   wD: () => (/* binding */ determineNewCaretPosition)
/* harmony export */ });
/* harmony import */ var _global_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(266);
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(687);
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(895);





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
    if (typeof begin === "number") {
      begin = notranslate ? begin : translatePosition.call(inputmask, begin);
      end = notranslate ? end : translatePosition.call(inputmask, end);
      end = typeof end === "number" ? end : begin;
      // if (!$(input).is(":visible")) {
      // 	return;
      // }

      const scrollCalc = parseInt(((input.ownerDocument.defaultView || _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A).getComputedStyle ? (input.ownerDocument.defaultView || _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
      input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
      input.inputmask.caretPos = {
        begin,
        end
      }; // track caret internally
      if (opts.insertModeVisual && opts.insertMode === false && begin === end) {
        if (!isDelete) {
          end++; // set visualization for insert/overwrite mode
        }
      }
      if (input === input.getRootNode().activeElement) {
        if ("setSelectionRange" in input) {
          input.setSelectionRange(begin, end);
        } else if (_global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getSelection) {
          range = document.createRange();
          if (input.firstChild === undefined || input.firstChild === null) {
            const textNode = document.createTextNode("");
            input.appendChild(textNode);
          }
          range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
          range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
          range.collapse(true);
          const sel = _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getSelection();
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
    }
  } else {
    if ("selectionStart" in input && "selectionEnd" in input) {
      begin = input.selectionStart;
      end = input.selectionEnd;
    } else if (_global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getSelection) {
      range = _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getSelection().getRangeAt(0);
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

    return {
      begin: notranslate ? begin : translatePosition.call(inputmask, begin),
      end: notranslate ? end : translatePosition.call(inputmask, end)
    };
  }
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
    buffer = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getMaskTemplate */ .XR.call(inputmask, true, getLastValidPosition.call(inputmask), true, true);
  let bl = buffer.length,
    pos,
    ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
    testPos;
  for (pos = lvp + 1; pos < buffer.length; pos++) {
    testPos = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTestTemplate */ .t.call(inputmask, pos, ndxIntlzr, pos - 1);
    ndxIntlzr = testPos.locator.slice();
    positions[pos] = $.extend(true, {}, testPos);
  }
  const lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
  for (pos = bl - 1; pos > lvp; pos--) {
    testPos = positions[pos];
    if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.static !== true || testPos.match.static === true && testPos.locator[lvTest.alternation] && _validation__WEBPACK_IMPORTED_MODULE_1__/* .checkAlternationMatch */ .Nl.call(inputmask, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTests */ .eQ.call(inputmask, pos)[0].def !== "")) && buffer[pos] === _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getPlaceholder */ .G_.call(inputmask, pos, testPos.match)) {
      bl--;
      if (testPos.match.optionality) {
        // find the last position that is not optional ~ isoptional and newblockmarker == "master"
        let prevPos = pos;
        while (prevPos > 0) {
          const test = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTest */ .bm.call(inputmask, prevPos);
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
    def: positions[bl] ? positions[bl].match : undefined
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
            if (radixPos < pos && vps[vp].input !== _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getPlaceholder */ .G_.call(inputmask, pos)) {
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
          const radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
          selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
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
            tt = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTestTemplate */ .t.call(inputmask, lastPosition, lvp ? lvp.match.locator : undefined, lvp),
            placeholder = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getPlaceholder */ .G_.call(inputmask, lastPosition, tt.match);
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
    maskset.buffer = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getMaskTemplate */ .XR.call(inputmask, true, getLastValidPosition.call(inputmask), true);
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
    maskset._buffer = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getMaskTemplate */ .XR.call(inputmask, false, 1);
    if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
  }
  return maskset._buffer;
}

// tobe put on prototype?
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

// tobe put on prototype?
function isMask(pos, strict, fuzzy) {
  const inputmask = this,
    maskset = this.maskset;
  let test = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTestTemplate */ .t.call(inputmask, pos).match;
  if (test.def === "") test = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTest */ .bm.call(inputmask, pos).match;
  if (test.static !== true) {
    return test.fn;
  }
  if (fuzzy === true && maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].generatedInput !== true) {
    return true;
  }
  if (strict !== true && pos > -1) {
    if (fuzzy) {
      // check on the number of tests
      const tests = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTests */ .eQ.call(inputmask, pos);
      return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
    }
    // else based on the template
    const testTemplate = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .determineTestTemplate */ .WW.call(inputmask, pos, _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTests */ .eQ.call(inputmask, pos)),
      testPlaceHolder = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getPlaceholder */ .G_.call(inputmask, pos, testTemplate.match);
    return testTemplate.match.def !== testPlaceHolder;
  }
  return false;
}

// tobe put on prototype?
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

// tobe put on prototype?
function seekNext(pos, newBlock, fuzzy) {
  const inputmask = this;
  if (fuzzy === undefined) fuzzy = true;
  let position = pos + 1;
  while (_validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTest */ .bm.call(inputmask, position).match.def !== "" && (newBlock === true && (_validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTest */ .bm.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true)) || newBlock !== true && !isMask.call(inputmask, position, undefined, fuzzy))) {
    position++;
  }
  return position;
}

// tobe put on prototype?
function seekPrevious(pos, newBlock) {
  const inputmask = this;
  let position = pos - 1;
  if (pos <= 0) return 0;
  while (position > 0 && (newBlock === true && (_validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getTest */ .bm.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true)) || newBlock !== true && !isMask.call(inputmask, position, undefined, true))) {
    position--;
  }
  return position;
}

// tobe put on prototype?
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

/***/ },

/***/ 895
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G_: () => (/* binding */ getPlaceholder),
/* harmony export */   WW: () => (/* binding */ determineTestTemplate),
/* harmony export */   XR: () => (/* binding */ getMaskTemplate),
/* harmony export */   bm: () => (/* binding */ getTest),
/* harmony export */   eQ: () => (/* binding */ getTests),
/* harmony export */   gb: () => (/* binding */ getDecisionTaker),
/* harmony export */   t: () => (/* binding */ getTestTemplate)
/* harmony export */ });
/* unused harmony export isSubsetOf */
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(472);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(539);
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(687);




function getLocator(tst, align) {
  // need to align the locators to be correct
  let locator = (tst.alternation != undefined ? tst.mloc[`${getDecisionTaker(tst)}:${tst.alternation}`] || tst.locator : tst.locator).join("");
  if (locator !== "") {
    locator = locator.split(":")[0]; // strip off alternation marker
    while (locator.length < align) locator += "0";
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
  if (test.placeholder !== undefined || returnPL === true) {
    if (test.placeholder !== "" && test.static === true && test.generated !== true) {
      // static and not dynamically generated ~ does not occur in regex mask ~ numeric alias def is not a valid entry
      const lvp = _positioning__WEBPACK_IMPORTED_MODULE_1__/* .getLastValidPosition */ .SE.call(inputmask, pos),
        nextPos = _positioning__WEBPACK_IMPORTED_MODULE_1__/* .seekNext */ .u4.call(inputmask, lvp);
      return (returnPL ? pos <= nextPos : pos < nextPos) ? _validation__WEBPACK_IMPORTED_MODULE_2__/* .casing */ .Of.call(inputmask, opts.staticDefinitionSymbol && test.static ? test.nativeDef : test.def, test, pos) : typeof test.placeholder === "function" ? test.placeholder(opts) : test.placeholder;
    } else {
      return typeof test.placeholder === "function" ? test.placeholder(opts) : test.placeholder;
    }
  } else if (test.static === true) {
    if (pos > -1 && maskset.validPositions[pos] === undefined) {
      let tests = getTests.call(inputmask, pos),
        staticAlternations = [],
        prevTest;
      if (typeof opts.placeholder === "string" && tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
        for (let i = 0; i < tests.length; i++) {
          if (tests[i].match.def !== "" && tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true && (tests[i].match.static === true || prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, maskset, pos, true, opts) !== false)) {
            staticAlternations.push(tests[i]);
            if (tests[i].match.static === true) prevTest = tests[i];
            if (staticAlternations.length > 1) {
              if (/[0-9a-zA-Z]/.test(staticAlternations[0].match.def)) {
                return opts.placeholder.charAt(pos % opts.placeholder.length);
              }
            }
          }
        }
      }
    }
    return test.def;
  }
  return typeof opts.placeholder === "object" ? test.def : opts.placeholder.charAt(pos % opts.placeholder.length);
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
      testPos = clearOptionalTail && maskset.validPositions[pos].match.optionality && maskset.validPositions[pos + 1] === undefined && (maskset.validPositions[pos].generatedInput === true || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos];
      test = testPos.match;
      ndxIntlzr = testPos.locator.slice();
      maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, pos, test));
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
  const longestLocator = Math.max(...tests.map(tst => tst.locator === undefined ? 0 : tst.locator.length)),
    prevTest = getTest.call(inputmask, pos),
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

    if (tst.unMatchedAlternationStopped !== true || tests.filter(tst => tst.unMatchedAlternationStopped !== true).length <= 1) {
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
    if (pos == 0) optionalityLevel = 0;else if (tests.length == 1) optionalityLevel = 0;else if (!differentOptionalLevels) optionalityLevel = 0;
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
    let expanded = [],
      start = -1,
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
  let inputmask = this,
    $ = this.dependencyLib,
    maskset = this.maskset,
    opts = this.opts,
    el = this.el,
    maskTokens = maskset.maskToken,
    testPos = ndxIntlzr ? tstPs : 0,
    ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
    matches = [],
    insertStop = false,
    insertStopFromAlternation = false,
    latestMatch,
    cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "",
    unMatchedAlternation = false;
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
            const alternation = slocator.pop();
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
          latestMatch = matches[matches.length - 1].match;
          if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) {
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
              if (loopNdx.length == excludeSet[1]) {
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
              let altMatch = maltMatches[ndx1],
                dropMatch = false;
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
                    if (altMatch2.match.optionality && el.inputmask.userOptions.keepStatic === undefined) {
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
        const qt = match;
        let breakloop = false;
        for (let qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
          const tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
          match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); // set the tokenGroup as quantifierRecurse marker
          if (match) {
            matches.forEach(function (mtch, ndx) {
              if (IsMatchOf(tokenGroup, mtch.match)) latestMatch = mtch.match;else latestMatch = matches[matches.length - 1].match;

              // mark optionality
              // TODO FIX RECURSIVE QUANTIFIERS
              latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
              // console.log(pos + " " + qt.quantifier.min + " " + latestMatch.optionalQuantifier);
              // qndx + 1 as the index starts from 0
              latestMatch.jit = (qndx + 1) * (tokenGroup.matches.indexOf(latestMatch) + 1) > qt.quantifier.jit;
              if ((latestMatch.optionalQuantifier || latestMatch.optionality) && isFirstMatch(latestMatch, tokenGroup)) {
                insertStop = true;
                testPos = pos; // match the position after the group
                if (opts.greedy && maskset.validPositions[pos - 1] == undefined && qndx > qt.quantifier.min && ["*", "+"].indexOf(qt.quantifier.max) != -1) {
                  matches.pop();
                  cacheDependency = undefined;
                }
                breakloop = true; // stop quantifierloop && search for next possible match
                match = false; // mark match to false to make sure the loop in optionals continues
              }
              if (!breakloop && latestMatch.jit /* && !latestMatch.optionalQuantifier */) {
                // always set jitOffset, isvalid checks when to apply
                maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch);
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
          mloc: {}
        });
        if (match.optionality && quantifierRecurse === undefined && (opts.definitions && opts.definitions[match.nativeDef] && opts.definitions[match.nativeDef].optional || _definitions__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A[match.nativeDef] && _definitions__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A[match.nativeDef].optional)) {
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
    let isMatch = tokenGroup.matches.indexOf(match) != -1;
    if (!isMatch) {
      tokenGroup.matches.forEach((mtch, ndx) => {
        if (mtch.matches !== undefined && !isMatch) {
          isMatch = IsMatchOf(mtch, match);
        }
      });
    }
    return isMatch;
  }
  function mergeLocators(pos, tests) {
    let locator = [];
    if (!Array.isArray(tests)) tests = [tests];
    if (tests.length > 0) {
      if (tests[0].alternation === undefined || opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && pos >= opts.keepStatic) {
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

/***/ },

/***/ 687
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   As: () => (/* binding */ isComplete),
/* harmony export */   Nl: () => (/* binding */ checkAlternationMatch),
/* harmony export */   Nr: () => (/* binding */ handleRemove),
/* harmony export */   Of: () => (/* binding */ casing),
/* harmony export */   X9: () => (/* binding */ isSelection),
/* harmony export */   fn: () => (/* binding */ isValid),
/* harmony export */   m5: () => (/* binding */ refreshFromBuffer)
/* harmony export */ });
/* unused harmony exports alternate, revalidateMask */
/* harmony import */ var _eventhandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(539);
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(895);






// tobe put on prototype?
function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
  // pos == true => generalize
  const inputmask = this,
    $ = this.dependencyLib,
    opts = this.opts,
    maskset = inputmask.maskset;
  if (!inputmask.hasAlternator) return false;
  const validPsClone = $.extend(true, [], maskset.validPositions),
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
    lAltPos = rAltPos !== undefined ? rAltPos : _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getLastValidPosition */ .SE.call(inputmask),
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
    prevAltPos = _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTest */ .bm.call(inputmask, lastAlt);
    alternation = prevAltPos.alternation;
  } else {
    // find last modified alternation
    for (; lAltPos >= 0; lAltPos--) {
      altPos = lAltPos === 0 ? _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTest */ .bm.call(inputmask, 0) : maskset.validPositions[lAltPos];
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
      maskset.excludes[decisionPos].push((0,_validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getDecisionTaker */ .gb)(prevAltPos) + ":" + prevAltPos.alternation);
    }
    const validInputs = [];
    let resultPos = -1;
    for (i = decisionPos; decisionPos < _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getLastValidPosition */ .SE.call(inputmask, undefined, true) + 1; i++) {
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
      _positioning__WEBPACK_IMPORTED_MODULE_2__/* .resetMaskSet */ .eo.call(inputmask, true); // clear getbuffer
      isValidRslt = true;
      nextPos = decisionPos - 1;
      const targetTemplate = _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getMaskTemplate */ .XR.call(inputmask, true, 0);
      for (i = 0; i < validInputs.length; i++) {
        input = validInputs[i];
        if (targetTemplate[nextPos + 1] === input && opts.numericInput !== true) {
          nextPos++;
        } else if (i === 0 || returnRslt.caretPos !== undefined || opts.insertMode === false) {
          nextPos = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .seekNext */ .u4.call(inputmask, nextPos);
        } else {
          nextPos = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getLastValidPosition */ .SE.call(inputmask, nextPos, true) + 1;
        }

        // nextPos = translatePosition.call(inputmask, nextPos);
        if (!(isValidRslt = isValid.call(inputmask, nextPos, input, false, fromIsValid, true))) {
          // if (isComplete.call(inputmask, getBuffer.call(inputmask))) {
          // isValidRslt = returnRslt; // keep previous result if any
          // }
          break;
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
        _positioning__WEBPACK_IMPORTED_MODULE_2__/* .resetMaskSet */ .eo.call(inputmask);
        prevAltPos = _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTest */ .bm.call(inputmask, decisionPos); // get the current decisionPos to exclude ~ needs to be before restoring the initial validation
        // reset & revert
        maskset.validPositions = $.extend(true, [], validPsClone);
        maskset.tests = $.extend(true, {}, tstClone); // refresh tests after possible alternating
        returnRslt = false;
        if (maskset.excludes[decisionPos]) {
          if (prevAltPos.alternation != undefined) {
            const decisionTaker = (0,_validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getDecisionTaker */ .gb)(prevAltPos);
            if (maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation) !== -1) {
              returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
              break;
            }
            maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation);
            for (i = decisionPos; i < _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getLastValidPosition */ .SE.call(inputmask, undefined, true) + 1; i++) maskset.validPositions.splice(decisionPos);
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
    maskset.validPositions = $.extend(true, [], validPsClone);
    maskset.tests = $.extend(true, {}, tstClone); // refresh tests after possible alternating
  }
  return returnRslt;
}
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
      var posBefore = maskset.validPositions[pos - 1];
      if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(_keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keyCode */ .tS.Space)) {
        elem = elem.toLocaleUpperCase();
      } else {
        elem = elem.toLocaleLowerCase();
      }
      break;
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

// tobe put on prototype?
function checkAlternationMatch(altArr1, altArr2, na) {
  const opts = this.opts;
  let altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
    isMatch = false,
    naArr = na !== undefined ? na.split(",") : [],
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
function handleRemove(input, c, pos, strict, fromIsValid) {
  const inputmask = this,
    maskset = this.maskset,
    opts = this.opts;
  if (opts.numericInput || inputmask.isRTL) {
    if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keys */ .HP.Backspace) {
      c = _keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keys */ .HP.Delete;
    } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keys */ .HP.Delete) {
      c = _keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keys */ .HP.Backspace;
    }
    if (inputmask.isRTL) {
      const pend = pos.end;
      pos.end = pos.begin;
      pos.begin = pend;
    }
  }
  const lvp = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getLastValidPosition */ .SE.call(inputmask, undefined, true);
  if (pos.end >= _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getBuffer */ .Zo.call(inputmask).length && lvp >= pos.end) {
    // handle numeric negate symbol offset, due to  dynamic jit masking
    pos.end = lvp + 1;
  }
  if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keys */ .HP.Backspace) {
    if (pos.end - pos.begin < 1) {
      pos.begin = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .seekPrevious */ .Ef.call(inputmask, pos.begin);
    }
  } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keys */ .HP.Delete) {
    if (pos.begin === pos.end) {
      pos.end = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .isMask */ .$b.call(inputmask, pos.end, true, true) ? pos.end + 1 : _positioning__WEBPACK_IMPORTED_MODULE_2__/* .seekNext */ .u4.call(inputmask, pos.end) + 1;
    }
  }
  let offset;
  if ((offset = revalidateMask.call(inputmask, pos)) !== false) {
    if (strict !== true && opts.keepStatic !== false || opts.regex !== null && _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTest */ .bm.call(inputmask, pos.begin).match.def.indexOf("|") !== -1) {
      // TODO NEEDS BETTER CHECK WHEN TO ALTERNATE  ~ opts regex isn"t good enough
      alternate.call(inputmask, true);
    }
    if (strict !== true) {
      maskset.p = c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keys */ .HP.Delete ? pos.begin + offset : pos.begin;
      maskset.p = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .determineNewCaretPosition */ .wD.call(inputmask, {
        begin: maskset.p,
        end: maskset.p
      }, false, opts.insertMode === false && c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__/* .keys */ .HP.Backspace ? "none" : undefined).begin;
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
  let complete = false,
    lrp = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .determineLastRequiredPosition */ .c1.call(inputmask, true),
    aml = lrp.l; // seekPrevious.call(inputmask, lrp.l);

  if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
    complete = true;
    for (let i = 0; i <= aml; i++) {
      const test = _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTestTemplate */ .t.call(inputmask, i).match;
      if (test.static !== true && maskset.validPositions[i] === undefined && (test.optionality === false || test.optionality === undefined || test.optionality && test.newBlockMarker == false) && (test.optionalQuantifier === false || test.optionalQuantifier === undefined) || test.static === true && test.def != "" && buffer[i] !== _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getPlaceholder */ .G_.call(inputmask, i, test)) {
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
    _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTests */ .eQ.call(inputmask, position).every(function (tst, ndx) {
      const test = tst.match;
      // make sure the buffer is set and correct
      _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getBuffer */ .Zo.call(inputmask, true);
      if (test.jit && maskset.validPositions[_positioning__WEBPACK_IMPORTED_MODULE_2__/* .seekPrevious */ .Ef.call(inputmask, position)] === undefined) {
        // ignore if jit is not desirable
        rslt = false;
      } else {
        // return is false or a json object => { pos: ??, c: ??} or true
        rslt = test.fn != null ? test.fn.test(c, maskset, position, strict, opts, isSelection.call(inputmask, pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" // non mask
        ? {
          c: _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getPlaceholder */ .G_.call(inputmask, position, test, true) || test.def,
          pos: position
        } : false;
      }
      if (rslt !== false) {
        let elem = rslt.c !== undefined ? rslt.c : c,
          validatedPos = position;
        elem = elem === opts.skipOptionalPartCharacter && test.static === true ? _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getPlaceholder */ .G_.call(inputmask, position, test, true) || test.def : elem;
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
  let result = true,
    positionsClone = $.extend(true, [], maskset.validPositions); // clone the currentPositions

  if (opts.keepStatic === false && maskset.excludes[maskPos] !== undefined && fromAlternate !== true && fromIsValid !== true) {
    for (let i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) {
      if (maskset.excludes[i] !== undefined) {
        maskset.excludes[i] = undefined;
        delete maskset.tests[i];
      }
    }
  }
  if (typeof opts.preValidation === "function" && fromIsValid !== true && validateOnly !== true) {
    result = opts.preValidation.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getBuffer */ .Zo.call(inputmask), maskPos, c, isSelection.call(inputmask, pos), opts, maskset, pos, strict || fromAlternate);
    result = processCommandObject(result);
  }
  if (result === true) {
    // preValidation result
    result = _isValid(maskPos, c, strict);
    if ((!strict || fromIsValid === true) && result === false && validateOnly !== true) {
      const currentPosValid = maskset.validPositions[maskPos];
      if (currentPosValid && currentPosValid.match.static === true && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
        result = {
          caret: _positioning__WEBPACK_IMPORTED_MODULE_2__/* .seekNext */ .u4.call(inputmask, maskPos)
        };
      } else {
        if (opts.insertMode || maskset.validPositions[_positioning__WEBPACK_IMPORTED_MODULE_2__/* .seekNext */ .u4.call(inputmask, maskPos)] === undefined || pos.end > maskPos) {
          // does the input match on a further position?
          let skip = false;
          if (maskset.jitOffset[maskPos] && maskset.validPositions[_positioning__WEBPACK_IMPORTED_MODULE_2__/* .seekNext */ .u4.call(inputmask, maskPos)] === undefined) {
            result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, true, true);
            if (result !== false) {
              if (fromAlternate !== true) result.caret = maskPos;
              skip = true;
            }
          }
          if (pos.end > maskPos) {
            maskset.validPositions[maskPos] = undefined;
          }
          if (!skip && !_positioning__WEBPACK_IMPORTED_MODULE_2__/* .isMask */ .$b.call(inputmask, maskPos, opts.keepStatic && maskPos === 0)) {
            for (let nPos = maskPos + 1, snPos = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .seekNext */ .u4.call(inputmask, maskPos, false, maskPos !== 0); nPos <= snPos; nPos++) {
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
        else if (opts.numericInput !== true && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getLastValidPosition */ .SE.call(inputmask, undefined, true) > maskPos) {
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
      const postResult = opts.postValidation.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getBuffer */ .Zo.call(inputmask, true), pos.begin !== undefined ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval, fromAlternate);
      if (postResult !== undefined) {
        result = postResult === true ? result : postResult;
      }
    }
  }
  if (result && result.pos === undefined) {
    result.pos = maskPos;
  }
  if (result === false || validateOnly === true) {
    _positioning__WEBPACK_IMPORTED_MODULE_2__/* .resetMaskSet */ .eo.call(inputmask, true);
    maskset.validPositions = $.extend(true, [], positionsClone); // revert validation changes
  } else {
    trackbackPositions.call(inputmask, undefined, maskPos, true);
  }
  let endResult = processCommandObject(result);
  // console.log("returned result " + JSON.stringify(endResult));
  if (inputmask.maxLength !== undefined) {
    const buffer = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getBuffer */ .Zo.call(inputmask);
    if (buffer.length > inputmask.maxLength && !fromIsValid) {
      _positioning__WEBPACK_IMPORTED_MODULE_2__/* .resetMaskSet */ .eo.call(inputmask, true);
      maskset.validPositions = $.extend(true, [], positionsClone); // revert validation changes
      endResult = false;
    }
  }
  return endResult;
}

// tobe put on prototype?
function positionCanMatchDefinition(pos, testDefinition, opts) {
  const inputmask = this,
    maskset = this.maskset;
  let valid = false,
    tests = _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTests */ .eQ.call(inputmask, pos);
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

// tobe put on prototype?
function refreshFromBuffer(start, end, buffer) {
  const inputmask = this,
    maskset = this.maskset,
    opts = this.opts,
    $ = this.dependencyLib;
  // checkVal.call(inputmask, el, false, true, isRTL ? buffer.reverse() : buffer);
  let i,
    p,
    skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
    bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer;
  opts.skipOptionalPartCharacter = "";
  if (start === true) {
    _positioning__WEBPACK_IMPORTED_MODULE_2__/* .resetMaskSet */ .eo.call(inputmask, false);
    start = 0;
    end = buffer.length;
    p = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .determineNewCaretPosition */ .wD.call(inputmask, {
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
    const valResult = _eventhandlers__WEBPACK_IMPORTED_MODULE_0__/* .EventHandlers */ .C.keypressEvent.call(inputmask, keypress, true, false, false, p);
    if (valResult !== false && valResult !== undefined) {
      p = valResult.forwardPosition;
    }
  }
  opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}

// tobe put on prototype?
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
    if (maskset.validPositions[ps] === undefined && !_positioning__WEBPACK_IMPORTED_MODULE_2__/* .isMask */ .$b.call(inputmask, ps, false)) {
      const vp = ps == 0 ? _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTest */ .bm.call(inputmask, ps) : maskset.validPositions[ps - 1];
      if (vp) {
        const tests = _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTests */ .eQ.call(inputmask, ps).slice();
        if (tests[tests.length - 1].match.def === "") tests.pop();
        var bestMatch = _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .determineTestTemplate */ .WW.call(inputmask, ps, tests),
          np;
        if (bestMatch && (bestMatch.match.jit !== true || bestMatch.match.newBlockMarker === "master" && (np = maskset.validPositions[ps + 1]) && np.match.optionalQuantifier === true)) {
          bestMatch = $.extend({}, bestMatch, {
            input: _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getPlaceholder */ .G_.call(inputmask, ps, bestMatch.match, true) || bestMatch.match.def
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
    let positionsClone = $.extend(true, [], maskset.validPositions),
      lvp = _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getLastValidPosition */ .SE.call(inputmask, undefined, true),
      i;
    maskset.p = begin; // needed for alternated position after overtype selection

    const clearpos = isSelection.call(inputmask, pos) ? begin : validatedPos;
    for (i = lvp; i >= clearpos; i--) {
      maskset.validPositions.splice(i, 1);
      if (validTest === undefined) delete maskset.tests[i + 1];
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
    if (positionsClone[end] == undefined && maskset.jitOffset[end]) {
      end += maskset.jitOffset[end] + (validTest ? 1 : 0);
    }
    for (i = validTest ? end : end - 1; i <= lvp; i++) {
      if ((t = positionsClone[i]) !== undefined && (opts.shiftPositions !== true || t.generatedInput !== true) && (i >= end || i >= begin && IsEnclosedStatic(i, positionsClone, {
        begin,
        end
      }))) {
        while (test = _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTest */ .bm.call(inputmask, posMatch), test.match.def !== "") {
          // loop needed to match further positions
          if ((canMatch = positionCanMatchDefinition.call(inputmask, posMatch, t, opts)) !== false || t.match.def === "+") {
            // validated match //we still need some hackery for the + validator (numeric alias)
            if (t.match.def === "+") _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getBuffer */ .Zo.call(inputmask, true);
            const result = isValid.call(inputmask, posMatch, t.input, t.match.def !== "+", /* t.match.def !== "+" */true);
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
          if (!valid && _positioning__WEBPACK_IMPORTED_MODULE_2__/* .getBuffer */ .Zo.call(inputmask), posMatch > maskset.maskLength) {
            break;
          }
          posMatch++;
        }
        if (_validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTest */ .bm.call(inputmask, posMatch).match.def == "") {
          valid = false;
        }
        // restore position
        posMatch = j;
      }
      if (!valid) break;
    }
    if (!valid) {
      maskset.validPositions = $.extend(true, [], positionsClone);
      _positioning__WEBPACK_IMPORTED_MODULE_2__/* .resetMaskSet */ .eo.call(inputmask, true);
      return false;
    }
  } else if (validTest && _validation_tests__WEBPACK_IMPORTED_MODULE_3__/* .getTest */ .bm.call(inputmask, validatedPos).match.cd === validTest.match.cd) {
    maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
  }
  _positioning__WEBPACK_IMPORTED_MODULE_2__/* .resetMaskSet */ .eo.call(inputmask, true);
  return offset;
}

/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ const __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	const cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	const module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __webpack_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		if(Array.isArray(definition)) {
/******/ 			var i = 0;
/******/ 			while(i < definition.length) {
/******/ 				var key = definition[i++];
/******/ 				var binding = definition[i++];
/******/ 				if(!__webpack_require__.o(exports, key)) {
/******/ 					if(binding === 0) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 					} else {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 					}
/******/ 				} else if(binding === 0) { i++; }
/******/ 			}
/******/ 		} else {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/export webpack runtime */
/******/ export { __webpack_require__ };
/******/ 
/******/ /* webpack/runtime/import chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, Promise] = chunk loading, 0 = chunk loaded
/******/ 	const installedChunks = {
/******/ 		744: 0
/******/ 	};
/******/ 	
/******/ 	const installChunk = (data) => {
/******/ 		let {__webpack_esm_ids__, __webpack_esm_modules__, __webpack_esm_runtime__} = data;
/******/ 		// add "modules" to the modules object,
/******/ 		// then flag all "ids" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		for(moduleId in __webpack_esm_modules__) {
/******/ 			if(__webpack_require__.o(__webpack_esm_modules__, moduleId)) {
/******/ 				__webpack_require__.m[moduleId] = __webpack_esm_modules__[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(__webpack_esm_runtime__) __webpack_esm_runtime__(__webpack_require__);
/******/ 		for(;i < __webpack_esm_ids__.length; i++) {
/******/ 			chunkId = __webpack_esm_ids__[i];
/******/ 			if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[__webpack_esm_ids__[i]] = 0;
/******/ 		}
/******/ 	
/******/ 	}
/******/ 	
/******/ 	// no chunk on demand loading
/******/ 	
/******/ 	// no prefetching
/******/ 	
/******/ 	// no preloaded
/******/ 	
/******/ 	__webpack_require__.C = installChunk;
/******/ 	
/******/ 	// no on chunks loaded
/******/ 	// no HMR
/******/ 	
/******/ 	// no HMR manifest
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ let __webpack_exports__ = __webpack_require__(375);
/******/ const __webpack_exports__aliases = __webpack_exports__.z2;
/******/ const __webpack_exports__default = __webpack_exports__.Ay;
/******/ const __webpack_exports__masksCache = __webpack_exports__.st;
/******/ export { __webpack_exports__aliases as aliases, __webpack_exports__default as default, __webpack_exports__masksCache as masksCache };
/******/ 
