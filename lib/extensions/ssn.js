/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import Inputmask from "../inputmask";
import { aliases } from "../inputmask";
import $ from "../dependencyLibs/inputmask.dependencyLib";
import { getLastValidPosition } from "../positioning";
import { getMaskTemplate } from "../validation-tests";

export { ssn, registerSsn };

function ssn(options) {
  $.extend(
    true,
    {
      mask: "999-99-9999",
      postValidation: function (
        buffer,
        pos,
        c,
        currentResult,
        opts,
        maskset,
        strict
      ) {
        const bffr = getMaskTemplate.call(
          this,
          true,
          getLastValidPosition.call(this),
          true,
          true
        );
        return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(
          bffr.join("")
        );
      }
    },
    options
  );
}

function registerSsn() {
  $.extend(true, aliases, {
    // http://rion.io/2013/09/10/validating-social-security-numbers-through-regular-expressions-2/
    // https://en.wikipedia.org/wiki/Social_Security_number
    ssn: ssn()
  });
}
