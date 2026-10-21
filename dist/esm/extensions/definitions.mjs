/*!
 * dist/esm/extensions/definitions.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
export const __webpack_esm_id__ = 2;
export const __webpack_esm_ids__ = [2];
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

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "../inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./definitions.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(18);
const __webpack_exports__definitions = __webpack_exports__.definitions;
const __webpack_exports__registerDefinitions = __webpack_exports__.registerDefinitions;
export { __webpack_exports__definitions as definitions, __webpack_exports__registerDefinitions as registerDefinitions };

//# sourceMappingURL=definitions.mjs.map