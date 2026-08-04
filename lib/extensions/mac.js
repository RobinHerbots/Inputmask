/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import { aliases } from "../inputmask";
import $ from "../dependencyLibs/inputmask.dependencyLib";
import { registerDefinitions } from "./definitions";

export { mac, registerMac };

function mac(options) {
  return $.extend(
    true,
    {
      mask: "##:##:##:##:##:##"
    },
    options
  );
}

function registerMac() {
  registerDefinitions();
  $.extend(true, aliases, {
    mac: mac()
  });
}
