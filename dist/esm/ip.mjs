/*!
 * dist/esm/ip.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.6
 */
export const __webpack_esm_id__ = 851;
export const __webpack_esm_ids__ = [851];
export const __webpack_esm_modules__ = {

/***/ 56
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(327);
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

const ipValidatorRegex = /25[0-5]|2[0-4][0-9]|[01][0-9][0-9]/;
function ipValidator(chrs, maskset, pos, strict, opts) {
  if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
    chrs = maskset.buffer[pos - 1] + chrs;
    if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
      chrs = maskset.buffer[pos - 2] + chrs;
    } else chrs = "0" + chrs;
  } else chrs = "00" + chrs;
  if (opts.greedy && parseInt(chrs) > 255 && ipValidatorRegex.test("00" + chrs.charAt(2))) {
    const buffer = [...maskset.buffer.slice(0, pos), ".", chrs.charAt(2)];
    if (buffer.join("").match(/\./g).length < 4) {
      return {
        refreshFromBuffer: true,
        buffer,
        caret: pos + 2
      };
    }
  }
  return ipValidatorRegex.test(chrs);
}
_inputmask__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.extendAliases({
  ip: {
    // ip-address mask
    mask: "i{1,3}.j{1,3}.k{1,3}.l{1,3}",
    definitions: {
      i: {
        validator: ipValidator
      },
      j: {
        validator: ipValidator
      },
      k: {
        validator: ipValidator
      },
      l: {
        validator: ipValidator
      }
    },
    onUnMask: function (maskedValue, unmaskedValue, opts) {
      return maskedValue;
    },
    inputmode: "decimal",
    substitutes: {
      ",": "."
    }
  }
});

/***/ }

};
;

// load runtime
import { __webpack_require__ } from "./inputmask.mjs";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))

import * as __webpack_chunk_1__ from "./ip.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(56);
