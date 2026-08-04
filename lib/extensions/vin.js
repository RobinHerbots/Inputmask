/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import { aliases } from "../inputmask";
import $ from "../dependencyLibs/inputmask.dependencyLib";

export { vin, registerVin };

function vin(options) {
  return $.extend(
    true,
    {
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
    },
    options
  );
}

function registerVin() {
  $.extend(true, aliases, {
    vin: vin()
  });
}
