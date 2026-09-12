/*!
 * dist/esm/inputmaskElement.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.27
 */
export const __webpack_esm_id__ = 272;
export const __webpack_esm_ids__ = [272];
export const __webpack_esm_modules__ = {

/***/ 952
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _global_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(266);
/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(375);


const document = _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.document;

// add check if it is supported by the browser
// integrate shadowroot into maskcope
if (document && document.head && document.head.attachShadow && _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.customElements && _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.customElements.get("input-mask") === undefined) {
  class InputmaskElement extends HTMLElement {
    /** @type {HTMLInputElement} */
    input;
    constructor() {
      super();
      const attributeNames = this.getAttributeNames(),
        shadow = this.attachShadow({
          mode: "closed"
        });
      this.input = document.createElement("input");
      this.input.type = "text";
      shadow.appendChild(this.input);
      for (const attr in attributeNames) {
        if (Object.prototype.hasOwnProperty.call(attributeNames, attr)) {
          this.input.setAttribute(attributeNames[attr], this.getAttribute(attributeNames[attr]));
        }
      }
      const im = new _inputmask__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay();
      im.dataAttribute = "";
      im.mask(this.input);
    }

    /**
     * @param {string} attrName
     * @param {string | null} oldVal
     * @param {string | null} newVal
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.input.setAttribute(attrName, newVal);
    }

    // bind value
    get value() {
      return this.input.value;
    }

    /** @param {string} value */
    set value(value) {
      this.input.value = value;
    }
  }
  _global_window__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.customElements.define("input-mask", InputmaskElement);
}

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./inputmaskElement.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(952);
