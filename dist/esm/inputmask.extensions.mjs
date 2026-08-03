/*!
 * dist/esm/inputmask.extensions.mjs
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.11-beta.0
 */
export const __webpack_esm_id__ = 108;
export const __webpack_esm_ids__ = [108];
export const __webpack_esm_modules__ = {

/***/ 829
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(205);
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(539);
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(895);
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
  cssunit: {
    regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
  },
  url: {
    // needs update => https://en.wikipedia.org/wiki/URL
    regex: "(https?|ftp)://.*",
    autoUnmask: false,
    keepStatic: false,
    tabThrough: true
  },
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
  },
  email: {
    // https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
    // https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
    // should be extended with the toplevel domains at the end
    mask: function ({
      separator,
      quantifier
    }) {
      let emailMask = "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
        mask = emailMask;
      if (separator) {
        for (let i = 0; i < quantifier; i++) {
          mask += `[${separator}${emailMask}]`;
        }
      }
      return mask;
    },
    greedy: false,
    casing: "lower",
    separator: null,
    quantifier: 5,
    skipOptionalPartCharacter: "",
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace("mailto:", "");
    },
    definitions: {
      "*": {
        validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5!#$%&'*+/=?^_`{|}~-]"
      },
      "-": {
        validator: "[0-9A-Za-z-]"
      }
    },
    onUnMask: function (maskedValue, unmaskedValue, opts) {
      return maskedValue;
    },
    inputmode: "email"
  },
  mac: {
    mask: "##:##:##:##:##:##"
  },
  // https://en.wikipedia.org/wiki/Vehicle_identification_number
  // see issue #1199
  vin: {
    mask: "V{13}9{4}",
    definitions: {
      V: {
        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
        casing: "upper"
      }
    },
    clearIncomplete: true,
    autoUnmask: true
  },
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

import * as __webpack_chunk_1__ from "./inputmask.extensions.mjs";
__webpack_require__.C(__webpack_chunk_1__);
var __webpack_exports__ = __webpack_exec__(829);
