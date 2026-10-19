/*
 * Inputmask public entry point
 * http://github.com/RobinHerbots/inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 *
 * headless Inputmask class + the DOM driver (element-bound methods).
 * import "inputmask/lib/core/inputmask" instead for the DOM-free class.
 */

import Inputmask from "./core/inputmask.js";
import attach from "./dom/attach.js";

/**
 * Type surface of the public entry (declared in lib/core/inputmask.js).
 * @typedef {import("./core/inputmask.js").InputmaskOptions} InputmaskOptions
 * @typedef {import("./core/inputmask.js").InputmaskElements} InputmaskElements
 * @typedef {import("./core/inputmask.js").InputmaskInstance} InputmaskInstance
 * @typedef {import("./core/inputmask.js").InputmaskStatic} InputmaskStatic
 */

attach(Inputmask);

export { aliases, masksCache } from "./core/inputmask.js";
export default Inputmask;
