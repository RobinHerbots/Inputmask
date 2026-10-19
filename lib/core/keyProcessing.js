import { writeBuffer } from "./inputHandling";
import {
  caret,
  getBuffer,
  resetMaskSet,
  seekNext,
  seekPrevious
} from "./positioning";
import { handleRemove, isValid } from "./validation";

export { processKeypress, handleRemoveKey };

// core keystroke evaluation ~ shared by the DOM keypress handler, checkVal and
// the headless session api. this = inputmask instance
function processKeypress(e, checkval, writeOut, strict, ndx) {
  const inputmask = this,
    opts = inputmask.opts,
    maskset = inputmask.maskset,
    input = inputmask.el;

  let c = e.key;
  if (c && c.length === 1 && !e.ctrlKey && !e.metaKey) {
    inputmask.ignorable = false;
  }

  if (
    checkval !== true &&
    !(e.ctrlKey && e.altKey && !inputmask.ignorable) &&
    (e.ctrlKey || e.metaKey || inputmask.ignorable)
  ) {
    return undefined;
  }

  if (!c) return undefined;

  // special treat the decimal separator
  // if ((k === 44 || k === 46) && e.location === 3 && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
  const pos = checkval
    ? {
        begin: ndx,
        end: ndx
      }
    : caret.call(inputmask, input);
  let forwardPosition;

  // allow for character substitution
  if (!checkval) c = opts.substitutes[c] || c;
  maskset.writeOutBuffer = true;
  const valResult = isValid.call(
    inputmask,
    pos,
    c,
    strict,
    undefined,
    undefined,
    undefined,
    checkval
  );
  if (valResult !== false) {
    resetMaskSet.call(inputmask, true);
    forwardPosition =
      valResult.caret !== undefined
        ? valResult.caret
        : seekNext.call(
            inputmask,
            valResult.pos.begin ? valResult.pos.begin : valResult.pos
          );
    maskset.p = forwardPosition; // needed for checkval
  }

  forwardPosition =
    opts.numericInput && valResult.caret === undefined
      ? seekPrevious.call(inputmask, forwardPosition)
      : forwardPosition;
  if (writeOut !== false) {
    if (input) {
      setTimeout(function () {
        opts.onKeyValidation.call(input, c, valResult);
      }, 0);
    } else if (typeof opts.onKeyValidation === "function") {
      opts.onKeyValidation.call(inputmask, c, valResult);
    }
    if (maskset.writeOutBuffer && valResult !== false) {
      const buffer = getBuffer.call(inputmask);
      writeBuffer.call(
        inputmask,
        input,
        buffer,
        forwardPosition,
        e,
        checkval !== true
      );
    }
  }

  if (e && e.preventDefault) e.preventDefault();

  if (checkval) {
    if (valResult !== false) valResult.forwardPosition = forwardPosition;
    return valResult;
  }
  return valResult !== false ? valResult : false;
}

// core backspace/delete handling ~ shared by the DOM keydown handler and the
// headless session api. this = inputmask instance
function handleRemoveKey(input, c, pos, e) {
  const inputmask = this;

  if (e && e.preventDefault) e.preventDefault(); // stop default action but allow propagation
  handleRemove.call(inputmask, input, c, pos);
  const currentVal =
    input && input.inputmask
      ? input.inputmask._valueGet()
      : inputmask._valueGet();
  writeBuffer.call(
    inputmask,
    input,
    getBuffer.call(inputmask, true),
    pos,
    e,
    currentVal !== getBuffer.call(inputmask).join("")
  );
}
