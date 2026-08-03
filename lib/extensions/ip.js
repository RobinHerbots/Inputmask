/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import Inputmask from "../inputmask";

const ipValidatorRegex = /25[0-5]|2[0-4][0-9]|[01][0-9][0-9]/;

function ipValidator(chrs, maskset, pos, strict, opts) {
  if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
    chrs = maskset.buffer[pos - 1] + chrs;
    if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
      chrs = maskset.buffer[pos - 2] + chrs;
    } else chrs = "0" + chrs;
  } else chrs = "00" + chrs;
  if (
    opts.greedy &&
    parseInt(chrs) > 255 &&
    ipValidatorRegex.test("00" + chrs.charAt(2))
  ) {
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

Inputmask.extendAliases({
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
    substitutes: { ",": "." }
  }
});
