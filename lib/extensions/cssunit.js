/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import { aliases } from "../inputmask";
import $ from "../dependencyLibs/inputmask.dependencyLib";

export { cssunit, registerCssunit };

function cssunit(options) {
  return $.extend(
    true,
    {
      regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
    },
    options
  );
}

function registerCssunit() {
  $.extend(true, aliases, {
    cssunit: cssunit()
  });
}
