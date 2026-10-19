/*!
 * dist/esm/cssunit.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
export const __webpack_esm_id__ = 995;
export const __webpack_esm_ids__ = [995];
export const __webpack_esm_modules__ = {

/***/ 408
(__unused_webpack_module, __webpack_exports__, __inputmask_require) {

/* harmony export */ __inputmask_require.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ cssunit),
/* harmony export */   t: () => (/* binding */ registerCssunit)
/* harmony export */ });
/* harmony import */ var _core_inputmask__WEBPACK_IMPORTED_MODULE_0__ = __inputmask_require(466);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __inputmask_require(123);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



function cssunit(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, {
    regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
  }, options);
}
function registerCssunit() {
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, _core_inputmask__WEBPACK_IMPORTED_MODULE_0__/* .aliases */ .z2, {
    cssunit: cssunit()
  });
}

/***/ }

};
;

// load runtime
import { __inputmask_require } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__inputmask_require(__inputmask_require.s = moduleId))

import * as __webpack_chunk_1__ from "./cssunit.mjs";
__inputmask_require.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(408);
const __webpack_exports__cssunit = __webpack_exports__.a;
const __webpack_exports__registerCssunit = __webpack_exports__.t;
export { __webpack_exports__cssunit as cssunit, __webpack_exports__registerCssunit as registerCssunit };
