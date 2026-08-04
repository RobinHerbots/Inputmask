/*!
 * dist/esm/ssn.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.6
 */
export const __webpack_esm_id__ = 508;
export const __webpack_esm_ids__ = [508];
export const __webpack_esm_modules__ = {

/***/ 605
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(327);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(539);
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(895);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



_inputmask__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.extendAliases({
  // http://rion.io/2013/09/10/validating-social-security-numbers-through-regular-expressions-2/
  // https://en.wikipedia.org/wiki/Social_Security_number
  ssn: {
    mask: "999-99-9999",
    postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict) {
      const bffr = _validation_tests__WEBPACK_IMPORTED_MODULE_2__/* .getMaskTemplate */ .XR.call(this, true, _positioning__WEBPACK_IMPORTED_MODULE_1__/* .getLastValidPosition */ .SE.call(this), true, true);
      return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(bffr.join(""));
    }
  }
});

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./ssn.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(605);
