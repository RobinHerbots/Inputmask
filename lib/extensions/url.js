/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import { aliases } from "../inputmask";
import $ from "../dependencyLibs/inputmask.dependencyLib";

export { url, registerUrl };

function url(options) {
  return $.extend(
    true,
    {
      // needs update => https://en.wikipedia.org/wiki/URL
      regex: "(https?|ftp)://.*",
      autoUnmask: false,
      keepStatic: false,
      tabThrough: true
    },
    options
  );
}

function registerUrl() {
  $.extend(true, aliases, {
    url: url()
  });
}
