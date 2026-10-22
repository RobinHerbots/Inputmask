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
export { default as window } from "./global/window.js";

attach(Inputmask);

export default Inputmask;
