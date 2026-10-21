/*!
 * dist/esm/extensions/mac.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
export const __webpack_esm_id__ = 5;
export const __webpack_esm_ids__ = [5];
export const __webpack_esm_modules__ = {

/***/ 18
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   definitions: () => (/* binding */ definitions),
/* harmony export */   registerDefinitions: () => (/* binding */ registerDefinitions)
/* harmony export */ });
/* harmony import */ var _core_definitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */




// extra definitions
function definitions(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, {
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
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, _core_definitions__WEBPACK_IMPORTED_MODULE_0__["default"], definitions());
}

/***/ },

/***/ 17
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mac: () => (/* binding */ mac),
/* harmony export */   registerMac: () => (/* binding */ registerMac)
/* harmony export */ });
/* harmony import */ var _core_inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */




function mac(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, {
    mask: "##:##:##:##:##:##"
  }, _definitions__WEBPACK_IMPORTED_MODULE_2__.definitions, options);
}
function registerMac() {
  (0,_definitions__WEBPACK_IMPORTED_MODULE_2__.registerDefinitions)();
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, _core_inputmask__WEBPACK_IMPORTED_MODULE_0__.aliases, {
    mac: mac()
  });
}

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "../inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./mac.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(17);
const __webpack_exports__mac = __webpack_exports__.mac;
const __webpack_exports__registerMac = __webpack_exports__.registerMac;
export { __webpack_exports__mac as mac, __webpack_exports__registerMac as registerMac };

//# sourceMappingURL=mac.mjs.map