/*!
 * dist/esm/colormask.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.18
 */
export const __webpack_esm_id__ = 153;
export const __webpack_esm_ids__ = [153];
export const __webpack_esm_modules__ = {

/***/ 122
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ renderColorMask)
/* harmony export */ });
/* harmony import */ var _eventhandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(375);
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(539);
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(895);
/*
 Input Mask colormask extension
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */





const $ = _inputmask__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.dependencyLib;
function Colormask(alias, options, internal) {
  // allow instanciating without new
  if (!(this instanceof Colormask)) {
    return new Colormask(alias, options, internal);
  }
  this.colorMask = undefined;
  Object.getOwnPropertyNames(_inputmask__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay).forEach(function (key) {
    if (!Object.prototype.hasOwnProperty.call(this, key)) {
      this[key] = _inputmask__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay[key];
    }
  }, this);
}
Colormask.prototype = _inputmask__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.prototype;
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
  if (e.key === _keycode_js__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.ArrowRight || e.key === _keycode_js__WEBPACK_IMPORTED_MODULE_2__/* .keys */ .HP.ArrowLeft) {
    const inputmask = this;
    setTimeout(function () {
      const caretPos = _positioning__WEBPACK_IMPORTED_MODULE_3__/* .caret */ .OW.call(inputmask, inputmask.el, undefined, undefined, true);
      renderColorMask.call(inputmask, inputmask.el, caretPos);
    }, 0);
  }
};
function initializeColorMask(input) {
  const computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);
  function findCaretPos(clientx) {
    // calculate text width
    let e = document.createElement("span"),
      caretPos = 0;
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
    let inputText = input.inputmask.__valueGet.call(input),
      previousWidth = 0;
    while (e.offsetWidth < clientx) {
      const ichar = inputText.charAt(caretPos);
      e.innerHTML += ichar === " " || ichar === "" ? "_" : ichar;
      if (e.offsetWidth >= clientx) {
        let offset1 = clientx - previousWidth,
          offset2 = e.offsetWidth - clientx;
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
    return _eventhandlers__WEBPACK_IMPORTED_MODULE_0__/* .EventHandlers */ .C.mouseleaveEvent.call(input, [e]);
  });
  $(colorMask).on("mouseenter", function (e) {
    return _eventhandlers__WEBPACK_IMPORTED_MODULE_0__/* .EventHandlers */ .C.mouseenterEvent.call(input, [e]);
  });
  $(colorMask).on("click", function (e) {
    _positioning__WEBPACK_IMPORTED_MODULE_3__/* .caret */ .OW.call(input.inputmask, input, findCaretPos(e.clientX), undefined, true);
    return _eventhandlers__WEBPACK_IMPORTED_MODULE_0__/* .EventHandlers */ .C.clickEvent.call(input, [e]);
  });
}
function positionColorMask(input, template) {
  input.style.left = template.offsetLeft + "px";
}
function renderColorMask(input, caretPos, clear) {
  let inputmask = this,
    {
      isRTL,
      maskset,
      opts,
      maxLength
    } = inputmask,
    maskTemplate = [],
    isStatic = false,
    test,
    testPos,
    ndxIntlzr,
    pos = 0,
    templates = {
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
    const buffer = _positioning__WEBPACK_IMPORTED_MODULE_3__/* .getBuffer */ .Zo.call(inputmask);
    if (caretPos === undefined) {
      caretPos = _positioning__WEBPACK_IMPORTED_MODULE_3__/* .caret */ .OW.call(inputmask, input);
    } else if (caretPos.begin === undefined) {
      caretPos = {
        begin: caretPos,
        end: caretPos
      };
    }
    if (isRTL) {
      // translate caretPos
      caretPos.begin = _positioning__WEBPACK_IMPORTED_MODULE_3__/* .translatePosition */ .Mu.call(inputmask, caretPos.begin);
      caretPos.end = _positioning__WEBPACK_IMPORTED_MODULE_3__/* .translatePosition */ .Mu.call(inputmask, caretPos.end);
    }
    if (clear !== true) {
      const lvp = _positioning__WEBPACK_IMPORTED_MODULE_3__/* .getLastValidPosition */ .SE.call(inputmask);
      do {
        if (maskset.validPositions[pos]) {
          testPos = maskset.validPositions[pos];
          test = testPos.match;
          ndxIntlzr = testPos.locator.slice();
          setEntry(buffer[pos]);
        } else {
          testPos = _validation_tests__WEBPACK_IMPORTED_MODULE_4__/* .getTestTemplate */ .t.call(inputmask, pos, ndxIntlzr, pos - 1);
          test = testPos.match;
          ndxIntlzr = testPos.locator.slice();
          const jitMasking = opts.jitMasking !== false ? opts.jitMasking : test.jit;
          if (jitMasking === false || jitMasking === undefined /* || pos < lvp */ || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
            setEntry(_validation_tests__WEBPACK_IMPORTED_MODULE_4__/* .getPlaceholder */ .G_.call(inputmask, pos, test));
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Colormask);
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "A", 0, /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ ]);


/***/ }

};
;

// load runtime
import { __webpack_require__ } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./colormask.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(122);
const __webpack_exports__default = __webpack_exports__.A;
const __webpack_exports__renderColorMask = __webpack_exports__.y;
export { __webpack_exports__default as default, __webpack_exports__renderColorMask as renderColorMask };
