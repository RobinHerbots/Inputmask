/*!
 * dist/esm/vin.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
export const __webpack_esm_id__ = 379;
export const __webpack_esm_ids__ = [379];
export const __webpack_esm_modules__ = {

/***/ 328
(__unused_webpack_module, __webpack_exports__, __inputmask_require) {

/* harmony export */ __inputmask_require.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ vin),
/* harmony export */   j: () => (/* binding */ registerVin)
/* harmony export */ });
/* harmony import */ var _core_inputmask__WEBPACK_IMPORTED_MODULE_0__ = __inputmask_require(466);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __inputmask_require(123);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



function vin(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, {
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
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, _core_inputmask__WEBPACK_IMPORTED_MODULE_0__/* .aliases */ .z2, {
    vin: vin()
  });
}

/***/ }

};
;

// load runtime
import { __inputmask_require } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__inputmask_require(__inputmask_require.s = moduleId))

import * as __webpack_chunk_1__ from "./vin.mjs";
__inputmask_require.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(328);
const __webpack_exports__registerVin = __webpack_exports__.j;
const __webpack_exports__vin = __webpack_exports__.W;
export { __webpack_exports__registerVin as registerVin, __webpack_exports__vin as vin };
