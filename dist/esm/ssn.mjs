/*!
 * dist/esm/ssn.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
export const __webpack_esm_id__ = 508;
export const __webpack_esm_ids__ = [508];
export const __webpack_esm_modules__ = {

/***/ 605
(__unused_webpack_module, __webpack_exports__, __inputmask_require) {

/* harmony export */ __inputmask_require.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ ssn),
/* harmony export */   s: () => (/* binding */ registerSsn)
/* harmony export */ });
/* harmony import */ var _core_inputmask__WEBPACK_IMPORTED_MODULE_0__ = __inputmask_require(466);
/* harmony import */ var _core_positioning__WEBPACK_IMPORTED_MODULE_1__ = __inputmask_require(173);
/* harmony import */ var _core_validation_tests__WEBPACK_IMPORTED_MODULE_2__ = __inputmask_require(217);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_3__ = __inputmask_require(123);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */





function ssn(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.extend(true, {
    mask: "999-99-9999",
    postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict) {
      const bffr = _core_validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getMaskTemplate */ .XR.call(this, true, _core_positioning__WEBPACK_IMPORTED_MODULE_1__/* .getLastValidPosition */ .SE.call(this), true, true);
      return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(bffr.join(""));
    }
  }, options);
}
function registerSsn() {
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.extend(true, _core_inputmask__WEBPACK_IMPORTED_MODULE_0__/* .aliases */ .z2, {
    // http://rion.io/2013/09/10/validating-social-security-numbers-through-regular-expressions-2/
    // https://en.wikipedia.org/wiki/Social_Security_number
    ssn: ssn()
  });
}

/***/ }

};
;

// load runtime
import { __inputmask_require } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__inputmask_require(__inputmask_require.s = moduleId))

import * as __webpack_chunk_1__ from "./ssn.mjs";
__inputmask_require.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(605);
const __webpack_exports__registerSsn = __webpack_exports__.s;
const __webpack_exports__ssn = __webpack_exports__.V;
export { __webpack_exports__registerSsn as registerSsn, __webpack_exports__ssn as ssn };
