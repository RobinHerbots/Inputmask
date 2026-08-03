/*!
 * dist/esm/mac.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.1
 */
export const __webpack_esm_id__ = 877;
export const __webpack_esm_ids__ = [554,877];
export const __webpack_esm_modules__ = {

/***/ 735
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(205);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

// extra definitions
_inputmask__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.extendDefinitions({
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
});

/***/ },

/***/ 38
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(205);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(735);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */


_inputmask__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.extendAliases({
  mac: {
    mask: "##:##:##:##:##:##"
  }
});

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./mac.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(38);
