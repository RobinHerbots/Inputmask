/*!
 * dist/esm/extensions/cssunit.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
export const __webpack_esm_id__ = 0;
export const __webpack_esm_ids__ = [0];
export const __webpack_esm_modules__ = {

/***/ 22
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cssunit: () => (/* binding */ cssunit),
/* harmony export */   registerCssunit: () => (/* binding */ registerCssunit)
/* harmony export */ });
/* harmony import */ var _core_inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



function cssunit(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, {
    regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
  }, options);
}
function registerCssunit() {
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, _core_inputmask__WEBPACK_IMPORTED_MODULE_0__.aliases, {
    cssunit: cssunit()
  });
}

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "../inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./cssunit.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(22);
const __webpack_exports__cssunit = __webpack_exports__.cssunit;
const __webpack_exports__registerCssunit = __webpack_exports__.registerCssunit;
export { __webpack_exports__cssunit as cssunit, __webpack_exports__registerCssunit as registerCssunit };

//# sourceMappingURL=cssunit.mjs.map