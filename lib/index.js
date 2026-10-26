/*
 * Inputmask public entry point
 * http://github.com/RobinHerbots/inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 *
 * headless Inputmask class + the DOM driver (element-bound methods).
 * import "inputmask/lib/core/inputmask" instead for the DOM-free class.
 */

import { createInputmaskAdapter } from "./adapter/controller.js";
import Inputmask from "./core/inputmask.js";
import attach from "./dom/attach.js";

// Framework-agnostic controller used by the @inputmask/* wrapper packages.
export { createInputmaskAdapter };
// Re-export everything extensions (and consumers) need
export { aliases, masksCache, resolveAlias } from "./core/cache.js";
export { default as defaults } from "./core/defaults.js";
export {
  default as definitions,
  DEFAULT_PLACEHOLDER
} from "./core/definitions.js";
export { escapeRegex } from "./core/escapeRegex.js";
export { keys } from "./core/keycode.js";
export { generateMaskSet } from "./core/mask-lexer.js";
export {
  caret,
  getBuffer,
  getBufferTemplate,
  determineLastRequiredPosition,
  determineNewCaretPosition,
  resetMaskSet,
  translatePosition
} from "./core/positioning.js";
export {
  getMaskTemplate,
  getTest,
  seekNext,
  isMask,
  getLastValidPosition,
  getPlaceholder
} from "./core/rule-engine.js";
export {
  handleRemoveKey,
  processKeypress,
  isComplete,
  writeBuffer,
  isValid
} from "./core/validation.js";
export {
  applyInputValue,
  checkVal,
  clearOptionalTail,
  unmaskedvalue,
  HandleNativePlaceholder
} from "./core/inputHandling.js";
export { default as dependencyLib } from "./dependencyLibs/inputmask.dependencyLib.js";
export { default as window } from "./core/window.js";

// Re-export extension registration functions for framework packages
export { registerDefinitions } from "./extensions/definitions.js";
export { registerCssunit } from "./extensions/cssunit.js";
export { registerUrl } from "./extensions/url.js";
export { registerIp } from "./extensions/ip.js";
export { registerEmail } from "./extensions/email.js";
export { registerMac } from "./extensions/mac.js";
export { registerVin } from "./extensions/vin.js";
export { registerSsn } from "./extensions/ssn.js";
export { registerDatetime } from "./extensions/date.js";
export { registerNumeric } from "./extensions/numeric.js";

attach(Inputmask);

// CJS/UMD consumers only receive the class (see bundle.js), so expose the
// adapter as a static there as well. ESM consumers use the named export above.
Inputmask.createInputmaskAdapter = createInputmaskAdapter;

export default Inputmask;
