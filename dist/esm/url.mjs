/*!
 * dist/esm/url.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.17
 */
export const __webpack_esm_id__ = 467;
export const __webpack_esm_ids__ = [467];
export const __webpack_esm_modules__ = {

/***/ 776
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ url),
/* harmony export */   v: () => (/* binding */ registerUrl)
/* harmony export */ });
/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(375);
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



function url(options) {
  return _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, {
    // needs update => https://en.wikipedia.org/wiki/URL
    regex: "(https?|ftp)://.*",
    autoUnmask: false,
    keepStatic: false,
    tabThrough: true
  }, options);
}
function registerUrl() {
  _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.extend(true, _inputmask__WEBPACK_IMPORTED_MODULE_0__/* .aliases */ .z2, {
    url: url()
  });
}

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./url.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(776);
const __webpack_exports__registerUrl = __webpack_exports__.v;
const __webpack_exports__url = __webpack_exports__.O;
export { __webpack_exports__registerUrl as registerUrl, __webpack_exports__url as url };
