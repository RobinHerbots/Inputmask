import {
  getMaskTemplate,
  getPlaceholder,
  getTest,
  getTests,
  getTestTemplate,
  seekNext,
  isMask,
  getLastValidPosition
} from "./rule-engine";
import window from "./window";

export {
  caret,
  determineLastRequiredPosition,
  determineNewCaretPosition,
  getBuffer,
  getBufferTemplate,
  resetMaskSet,
  translatePosition
};

// tobe put on prototype?
function caret(input, begin, end, notranslate, isDelete) {
  const inputmask = this,
    opts = this.opts;

  let range;
  if (begin !== undefined) {
    if (Array.isArray(begin)) {
      end = inputmask.isRTL ? begin[0] : begin[1];
      begin = inputmask.isRTL ? begin[1] : begin[0];
    }

    if (begin.begin !== undefined) {
      end = inputmask.isRTL ? begin.begin : begin.end;
      begin = inputmask.isRTL ? begin.end : begin.begin;
    }

    if (isDelete && begin !== end && end !== undefined) {
      if (begin < end) end = begin;
      else begin = end;
    }
    if (typeof begin === "number") {
      begin = notranslate ? begin : translatePosition.call(inputmask, begin);
      end = notranslate ? end : translatePosition.call(inputmask, end);
      end = typeof end === "number" ? end : begin;
      // if (!$(input).is(":visible")) {
      // 	return;
      // }

      inputmask.caretPos = { begin, end }; // track caret internally
      if (input && input.inputmask) {
        input.inputmask.caretPos = { begin, end };
      }

      const isDOM = !!(input && input.nodeName && input.ownerDocument);
      if (isDOM) {
        const scrollCalc =
          parseInt(
            (input.ownerDocument.defaultView || window).getComputedStyle(
              input,
              null
            ).fontSize
          ) * end;
        input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
        if (
          opts.insertModeVisual &&
          opts.insertMode === false &&
          begin === end
        ) {
          if (!isDelete) {
            end++; // set visualization for insert/overwrite mode
          }
        }
        if (input === input.getRootNode().activeElement) {
          if ("setSelectionRange" in input) {
            input.setSelectionRange(begin, end);
          } else if (window.getSelection) {
            range = document.createRange();
            if (input.firstChild === undefined || input.firstChild === null) {
              const textNode = document.createTextNode("");
              input.appendChild(textNode);
            }
            range.setStart(
              input.firstChild,
              begin < input.inputmask._valueGet().length
                ? begin
                : input.inputmask._valueGet().length
            );
            range.setEnd(
              input.firstChild,
              end < input.inputmask._valueGet().length
                ? end
                : input.inputmask._valueGet().length
            );
            range.collapse(true);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            // input.focus();
          } else if (input.createTextRange) {
            range = input.createTextRange();
            range.collapse(true);
            range.moveEnd("character", end);
            range.moveStart("character", begin);
            range.select();
          }

          input.inputmask.caretHook === undefined ||
            input.inputmask.caretHook.call(inputmask, { begin, end });
        }
      } else {
        if (
          opts.insertModeVisual &&
          opts.insertMode === false &&
          begin === end
        ) {
          if (!isDelete) {
            end++; // set visualization for insert/overwrite mode
          }
        }
        inputmask.caretHook === undefined ||
          inputmask.caretHook({ begin, end });
      }
    }
  } else {
    const isDOM = !!(input && input.nodeName);
    if (isDOM && "selectionStart" in input && "selectionEnd" in input) {
      begin = input.selectionStart;
      end = input.selectionEnd;
    } else if (isDOM && window.getSelection) {
      range = window.getSelection().getRangeAt(0);
      if (
        range.commonAncestorContainer.parentNode === input ||
        range.commonAncestorContainer === input
      ) {
        begin = range.startOffset;
        end = range.endOffset;
      }
    } else if (isDOM && document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      begin =
        0 -
        range
          .duplicate()
          .moveStart(
            "character",
            -(input && input.inputmask
              ? input.inputmask._valueGet().length
              : inputmask._valueGet().length)
          );
      end = begin + range.text.length;
    } else {
      const caretPos = (input && input.inputmask && input.inputmask.caretPos) ||
        inputmask.caretPos || { begin: 0, end: 0 };
      begin = caretPos.begin ?? 0;
      end = caretPos.end ?? begin;
    }

    // if (opts.insertModeVisual && opts.insertMode === false && begin === (end - 1)) end--; //correct caret for insert/overwrite mode

    return {
      begin: notranslate ? begin : translatePosition.call(inputmask, begin),
      end: notranslate ? end : translatePosition.call(inputmask, end)
    };
  }
}

// tobe put on prototype?
function checkAlternationMatch(altArr1, altArr2, na) {
  const opts = this.opts,
    altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
    naArr = na !== undefined ? na.split(",") : [];
  let isMatch = false,
    naNdx;

  // remove no alternate indexes from alternation array
  for (let i = 0; i < naArr.length; i++) {
    if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
      altArr1.splice(naNdx, 1);
    }
  }

  for (let alndx = 0; alndx < altArr1.length; alndx++) {
    if (altArrC.includes(altArr1[alndx])) {
      isMatch = true;
      break;
    }
  }
  return isMatch;
}

// tobe put on prototype?
function determineLastRequiredPosition(returnDefinition) {
  const inputmask = this,
    { maskset, dependencyLib: $ } = inputmask,
    lvp = getLastValidPosition.call(inputmask),
    positions = {},
    lvTest = maskset.validPositions[lvp],
    buffer = getMaskTemplate.call(
      inputmask,
      true,
      getLastValidPosition.call(inputmask),
      true,
      true
    );
  let bl = buffer.length,
    pos,
    ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
    testPos;
  for (pos = lvp + 1; pos < buffer.length; pos++) {
    testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
    ndxIntlzr = testPos.locator.slice();
    positions[pos] = $.extend(true, {}, testPos);
  }

  const lvTestAlt =
      lvTest && lvTest.alternation !== undefined
        ? lvTest.locator[lvTest.alternation]
        : undefined,
    // the optionality level of the last valid position
    lvOptionality = lvTest !== undefined ? lvTest.match.optionality || 0 : 0;
  for (pos = bl - 1; pos > lvp; pos--) {
    testPos = positions[pos];
    if (
      (testPos.match.optionality ||
        (testPos.match.optionalQuantifier && testPos.match.newBlockMarker) ||
        (lvTestAlt &&
          ((lvTestAlt !== positions[pos].locator[lvTest.alternation] &&
            testPos.match.static !== true) ||
            (testPos.match.static === true &&
              testPos.locator[lvTest.alternation] &&
              checkAlternationMatch.call(
                inputmask,
                testPos.locator[lvTest.alternation].toString().split(","),
                lvTestAlt.toString().split(",")
              ) &&
              getTests.call(inputmask, pos)[0].def !== "")))) &&
      buffer[pos] === getPlaceholder.call(inputmask, pos, testPos.match)
    ) {
      // only optional positions in a deeper optional block than the last valid
      // position can be trimmed ~ an optional block that is entered is required
      if (testPos.match.optionality - lvOptionality < 1) {
        break;
      }
      bl--;
      if (testPos.match.optionality) {
        // find the last position that is not optional ~ isoptional and newblockmarker == "master"
        let prevPos = pos;
        while (prevPos > 0) {
          const test = getTest.call(inputmask, prevPos);
          if (
            test.match.newBlockMarker === "master" ||
            test.match.newBlockMarker === true
          ) {
            break;
          }
          prevPos--;
        }
        if (maskset.validPositions[prevPos] !== undefined) {
          break;
        }
      }
    } else {
      break;
    }
  }

  // no extra required positions
  if (pos === lvp) {
    bl = pos;
  }

  return returnDefinition
    ? {
        l: bl,
        def: positions[bl] ? positions[bl].match : undefined,
        lvOptionality
      }
    : bl;
}

// tobe put on prototype?
function determineNewCaretPosition(
  selectedCaret,
  tabbed,
  positionCaretOnClick
) {
  const inputmask = this,
    { maskset, opts } = inputmask;
  let clickPosition, lvclickPosition, lastPosition;

  function doRadixFocus(clickPos) {
    if (opts.radixPoint !== "" && opts.digits !== 0) {
      const vps = maskset.validPositions;
      if (vps[clickPos] === undefined || vps[clickPos].input === undefined) {
        if (clickPos < seekNext.call(inputmask, -1)) return true;
        const radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
        if (radixPos !== -1) {
          for (const vp in vps) {
            const pos = Number(vp);
            if (
              radixPos < pos &&
              vps[vp] !== undefined &&
              vps[vp].input !== getPlaceholder.call(inputmask, pos)
            ) {
              return false;
            }
          }
          return true;
        }
      }
    }
    return false;
  }

  if (tabbed) {
    if (inputmask.isRTL) {
      selectedCaret.end = selectedCaret.begin;
    } else {
      selectedCaret.begin = selectedCaret.end;
    }
  }
  if (selectedCaret.begin === selectedCaret.end) {
    positionCaretOnClick = positionCaretOnClick || opts.positionCaretOnClick;
    switch (positionCaretOnClick) {
      case "none":
        break;
      case "select":
        selectedCaret = { begin: 0, end: getBuffer.call(inputmask).length };
        break;
      case "ignore":
        selectedCaret.end = selectedCaret.begin = seekNext.call(
          inputmask,
          getLastValidPosition.call(inputmask)
        );
        break;
      case "radixFocus":
        if (inputmask.clicked > 1 && maskset.validPositions.length === 0) break;
        if (doRadixFocus(selectedCaret.begin)) {
          const radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
          selectedCaret.end = selectedCaret.begin = opts.numericInput
            ? seekNext.call(inputmask, radixPos)
            : radixPos;
          break;
        } else if (
          inputmask.clicked > 0 && // only react to a click, not to checkVal /
          // key handling which also come through here
          inputmask.isRTL // the buffer coordinates below assume a reversed
        ) {
          const buffer = getBuffer.call(inputmask).join(""),
            suffixReversed = opts.suffix.split("").reverse().join(""),
            suffixPos = buffer.indexOf(suffixReversed),
            newClickPosition = suffixPos + opts.suffix.length;
          if (newClickPosition > selectedCaret.begin)
            selectedCaret.end = selectedCaret.begin = newClickPosition;
          break;
        } // fallback to lvp
      // eslint-disable-next-line no-fallthrough
      default: // lvp:
        clickPosition = selectedCaret.begin;
        lvclickPosition = getLastValidPosition.call(
          inputmask,
          clickPosition,
          true
        );
        lastPosition = seekNext.call(
          inputmask,
          lvclickPosition === -1 && !isMask.call(inputmask, 0)
            ? -1
            : lvclickPosition
        );

        if (clickPosition <= lastPosition) {
          selectedCaret.end = selectedCaret.begin = !isMask.call(
            inputmask,
            clickPosition,
            false,
            true
          )
            ? seekNext.call(inputmask, clickPosition)
            : clickPosition;
        } else {
          const lvp = maskset.validPositions[lvclickPosition],
            tt = getTestTemplate.call(
              inputmask,
              lastPosition,
              lvp ? lvp.match.locator : undefined,
              lvp
            ),
            placeholder = getPlaceholder.call(
              inputmask,
              lastPosition,
              tt.match
            );
          if (
            (placeholder !== "" &&
              getBuffer.call(inputmask)[lastPosition] !== placeholder &&
              tt.match.optionalQuantifier !== true &&
              tt.match.newBlockMarker !== true) ||
            (!isMask.call(inputmask, lastPosition, opts.keepStatic, true) &&
              tt.match.def === placeholder)
          ) {
            const newPos = seekNext.call(inputmask, lastPosition);
            if (clickPosition >= newPos || clickPosition === lastPosition) {
              lastPosition = newPos;
            }
          }
          selectedCaret.end = selectedCaret.begin = lastPosition;
        }
    }

    return selectedCaret;
  }
}

// tobe put on prototype?
function getBuffer(noCache) {
  const inputmask = this,
    { maskset } = inputmask;

  if (maskset.buffer === undefined || noCache === true) {
    maskset.buffer = getMaskTemplate.call(
      inputmask,
      true,
      getLastValidPosition.call(inputmask),
      true
    );
    if (maskset._buffer === undefined) maskset._buffer = maskset.buffer.slice();
  }
  return maskset.buffer;
}

// tobe put on prototype?
function getBufferTemplate() {
  const inputmask = this,
    maskset = this.maskset;

  if (maskset._buffer === undefined) {
    // generate template
    maskset._buffer = getMaskTemplate.call(inputmask, false, 1);
    if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
  }
  return maskset._buffer;
}

// soft ~ undefined reset validpositions; soft = false also reset tests; soft = true only reset the maskset
function resetMaskSet(soft) {
  const maskset = this.maskset;

  maskset.buffer = undefined;
  if (soft !== true) {
    maskset.validPositions = [];
    maskset.p = 0;
  }
  if (soft === false) {
    maskset.tests = {};
    maskset.jitOffset = {};
  }
}

function translatePosition(pos) {
  const inputmask = this,
    opts = this.opts,
    el = this.el;

  if (
    inputmask.isRTL &&
    typeof pos === "number" &&
    (!opts.greedy || opts.placeholder !== "") &&
    el
  ) {
    pos = inputmask._valueGet().length - pos;
    if (pos < 0) pos = 0;
  }
  return pos;
}
