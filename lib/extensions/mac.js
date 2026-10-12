/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import $ from "../dependencyLibs/inputmask.dependencyLib";
import { aliases } from "../inputmask";

import { definitions, registerDefinitions } from "./definitions";

export { mac, registerMac };

function mac(options) {
  return $.extend(
    true,
    {
      mask: "##:##:##:##:##:##"
    },
    definitions,
    options
  );
}

function registerMac() {
  registerDefinitions();
  $.extend(true, aliases, {
    mac: mac()
  });
}
