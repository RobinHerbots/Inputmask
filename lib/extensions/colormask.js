/*
 Input Mask colormask extension
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import { EventHandlers } from "../eventhandlers";
import Inputmask from "../inputmask";
import { keys } from "../keycode.js";
import {
  caret,
  getBuffer,
  getLastValidPosition,
  translatePosition
} from "../positioning";
import { getPlaceholder, getTestTemplate } from "../validation-tests";

const $ = Inputmask.dependencyLib;

function Colormask(alias, options, internal) {
  // allow instanciating without new
  if (!(this instanceof Inputmask)) {
    return new Inputmask(alias, options, internal);
  }
  this.colorMask = undefined;
  Object.getOwnPropertyNames(Inputmask).forEach(function (key) {
    if (!Object.prototype.hasOwnProperty.call(this, key)) {
      this[key] = Inputmask[key];
    }
  }, this);
}

Colormask.prototype = Inputmask.prototype;
Colormask.prototype.writeBufferHook = function (caretPos) {
  renderColorMask.call(this, this.el, caretPos, false);
};
Colormask.prototype.caretHook = function (caretPos) {
  renderColorMask.call(this, this.el, caretPos, false);
};
Colormask.prototype.applyMaskHook = function () {
  initializeColorMask.call(this, this.el);
};
Colormask.prototype.keyEventHook = function (e) {
  if (e.key === keys.ArrowRight || e.key === keys.ArrowLeft) {
    const inputmask = this;
    setTimeout(function () {
      const caretPos = caret.call(
        inputmask,
        inputmask.el,
        undefined,
        undefined,
        true
      );
      renderColorMask.call(inputmask, inputmask.el, caretPos);
    }, 0);
  }
};

function initializeColorMask(input) {
  const computedStyle = (
    input.ownerDocument.defaultView || window
  ).getComputedStyle(input, null);

  function findCaretPos(clientx) {
    // calculate text width
    let e = document.createElement("span"),
      caretPos = 0;
    for (const style in computedStyle) {
      // clone styles
      if (isNaN(style) && style.indexOf("font") !== -1) {
        e.style[style] = computedStyle[style];
      }
    }
    e.style.textTransform = computedStyle.textTransform;
    e.style.letterSpacing = computedStyle.letterSpacing;
    e.style.position = "absolute";
    e.style.height = "auto";
    e.style.width = "auto";
    e.style.visibility = "hidden";
    e.style.whiteSpace = "nowrap";

    document.body.appendChild(e);
    let inputText = input.inputmask.__valueGet.call(input),
      previousWidth = 0;

    while (e.offsetWidth < clientx) {
      const ichar = inputText.charAt(caretPos);
      e.innerHTML += ichar === " " || ichar === "" ? "_" : ichar;
      if (e.offsetWidth >= clientx) {
        let offset1 = clientx - previousWidth,
          offset2 = e.offsetWidth - clientx;
        e.innerHTML = inputText.charAt(caretPos);
        offset1 += Math.round(e.offsetWidth / 2);
        caretPos = (offset1 < offset2 ? caretPos - 1 : caretPos) - 1;
        break;
      }
      previousWidth = e.offsetWidth;
      caretPos++;
    }

    if (input.style.textAlign === "right") {
      e.innerHTML = "_";
      const maxChars = Math.ceil(input.offsetWidth / e.offsetWidth) - 1;
      caretPos = inputText.length - (maxChars - caretPos) + 1;
    }

    document.body.removeChild(e);
    return caretPos;
  }

  const template = document.createElement("div");
  template.style.width = computedStyle.width;
  template.style.textAlign = computedStyle.textAlign;
  const colorMask = document.createElement("div");
  input.inputmask.colorMask = colorMask;
  colorMask.className = "im-colormask";
  input.parentNode.insertBefore(colorMask, input);
  input.parentNode.removeChild(input);
  colorMask.appendChild(input);
  colorMask.appendChild(template);
  input.style.left = template.offsetLeft + "px";

  $(colorMask).on("mouseleave", function (e) {
    return EventHandlers.mouseleaveEvent.call(input, [e]);
  });
  $(colorMask).on("mouseenter", function (e) {
    return EventHandlers.mouseenterEvent.call(input, [e]);
  });
  $(colorMask).on("click", function (e) {
    caret.call(
      input.inputmask,
      input,
      findCaretPos(e.clientX),
      undefined,
      true
    );
    return EventHandlers.clickEvent.call(input, [e]);
  });
}

function positionColorMask(input, template) {
  input.style.left = template.offsetLeft + "px";
}

export function renderColorMask(input, caretPos, clear) {
  let inputmask = this,
    { isRTL, maskset, opts, maxLength } = inputmask,
    maskTemplate = [],
    isStatic = false,
    test,
    testPos,
    ndxIntlzr,
    pos = 0,
    templates = {
      static: {
        start: isRTL ? "</span>" : "<span class='im-static'>",
        end: isRTL ? "<span class='im-static'>" : "</span>"
      },
      caret: {
        start:
          '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">',
        start_select: '<mark class="im-caret-select">',
        end: "</mark>"
      }
    };

  function setEntry(entry) {
    if (entry === undefined) entry = "";
    if (!isStatic && (test.static === true || testPos.input === undefined)) {
      isStatic = true;
      maskTemplate.push(templates.static.start + entry);
    } else if (
      isStatic &&
      ((test.static !== true && testPos.input !== undefined) || test.def === "")
    ) {
      isStatic = false;
      maskTemplate.push(templates.static.end + entry);
    } else {
      maskTemplate.push(entry);
    }
  }

  function setCaret(begin, end, length) {
    if (document.activeElement === input) {
      maskTemplate.splice(
        begin,
        0,
        begin === end || length > maskset.maskLength
          ? templates.caret.start
          : templates.caret.start_select
      );
      maskTemplate.splice(end + (isRTL ? 0 : 1), 0, templates.caret.end);
    }
  }

  if (input.inputmask.colorMask !== undefined) {
    const buffer = getBuffer.call(inputmask);
    if (caretPos === undefined) {
      caretPos = caret.call(inputmask, input);
    } else if (caretPos.begin === undefined) {
      caretPos = {
        begin: caretPos,
        end: caretPos
      };
    }

    if (isRTL) {
      // translate caretPos
      caretPos.begin = translatePosition.call(inputmask, caretPos.begin);
      caretPos.end = translatePosition.call(inputmask, caretPos.end);
    }

    if (clear !== true) {
      const lvp = getLastValidPosition.call(inputmask);
      do {
        if (maskset.validPositions[pos]) {
          testPos = maskset.validPositions[pos];
          test = testPos.match;
          ndxIntlzr = testPos.locator.slice();
          setEntry(buffer[pos]);
        } else {
          testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
          test = testPos.match;
          ndxIntlzr = testPos.locator.slice();

          const jitMasking =
            opts.jitMasking !== false ? opts.jitMasking : test.jit;
          if (
            jitMasking === false ||
            jitMasking === undefined /* || pos < lvp */ ||
            (typeof jitMasking === "number" &&
              isFinite(jitMasking) &&
              jitMasking > pos)
          ) {
            setEntry(getPlaceholder.call(inputmask, pos, test));
            // } else {
            // 	isStatic = false;
          } // break infinite loop
        }
        pos++;
      } while (
        ((maxLength === undefined || pos < maxLength) &&
          (test.static !== true || test.def !== "")) ||
        lvp > pos ||
        isStatic
      );
      if (isStatic) setEntry();
      setCaret(
        isRTL ? caretPos.end : caretPos.begin,
        isRTL ? caretPos.begin : caretPos.end,
        caretPos.end
      );
    }

    const template = input.inputmask.colorMask.getElementsByTagName("div")[0];
    template.innerHTML = (isRTL ? maskTemplate.reverse() : maskTemplate).join(
      ""
    );
    positionColorMask(input, template);
    // console.log(template.innerHTML)
    // console.log(JSON.stringify(caretPos));
  }
}

// make inputmask available
window.Colormask = Colormask;
export default Colormask;
