/*!
 * dist/esm/mac.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.28
 */
export const __webpack_esm_id__ = 877;
export const __webpack_esm_ids__ = [554,877];
export const __webpack_esm_modules__ = {

/***/ 735
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ definitions),
/* harmony export */   I: () => (/* binding */ registerDefinitions)
/* harmony export */ });
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(472);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */




// extra definitions
function definitions(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, {
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
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, _definitions__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A, definitions());
}

/***/ },

/***/ 38
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ mac),
/* harmony export */   t: () => (/* binding */ registerMac)
/* harmony export */ });
/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(375);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(735);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */




function mac(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, {
    mask: "##:##:##:##:##:##"
  }, _definitions__WEBPACK_IMPORTED_MODULE_2__/* .definitions */ .B, options);
}
function registerMac() {
  (0,_definitions__WEBPACK_IMPORTED_MODULE_2__/* .registerDefinitions */ .I)();
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, _inputmask__WEBPACK_IMPORTED_MODULE_0__/* .aliases */ .z2, {
    mac: mac()
  });
}

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./mac.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(38);
const __webpack_exports__mac = __webpack_exports__.M;
const __webpack_exports__registerMac = __webpack_exports__.t;
export { __webpack_exports__mac as mac, __webpack_exports__registerMac as registerMac };
