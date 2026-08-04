/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import baseDefinitions from "../definitions";
import $ from "../dependencyLibs/inputmask.dependencyLib";

export { definitions, registerDefinitions };

// extra definitions
function definitions(options) {
  return $.extend(
    true,
    {
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
    },
    options
  );
}

function registerDefinitions() {
  $.extend(true, baseDefinitions, definitions());
}
