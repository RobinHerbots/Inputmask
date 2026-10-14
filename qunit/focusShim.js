/*
 * Test-harness only: make focus()/blur() replay the event the browser withheld.
 *
 * BrowserStack real mobile devices run with `document.hasFocus() === false`. On
 * such a page the native focus()/blur() still set/clear `document.activeElement`
 * but Chrome suppresses the `focus`/`blur` DOM events. Inputmask attaches its
 * handlers natively (EventRuler.on -> $(input).on("focus.inputmask", ...)), so
 * without the event `focusEvent`/`blurEvent` never run: showMaskOnFocus does not
 * paint, clearMaskOnLostFocus/clearIncomplete do not clear and onincomplete
 * never fires.
 *
 * The suite is written for a focused page, so we normalise by dispatching the
 * missing event ourselves. On a real focused page (desktop/jsdom) the native
 * event fires, `fired` is true and this shim is a no-op.
 *
 * We track a single "virtually focused" element rather than trusting
 * document.activeElement, because on the affected devices activeElement drops
 * back to <body> one task later, which would otherwise make the focus handler
 * run again on every $.caret() call while typing.
 */
let currentFocus = null,
  installed = false;

function handleRealEvent(el, type) {
  if (type === "focus") {
    currentFocus = el;
  } else if (currentFocus === el) {
    currentFocus = null;
  }
}

function patch(proto, method, type) {
  const original = proto[method];
  if (typeof original !== "function") {
    return;
  }

  proto[method] = function (...args) {
    const isFocus = type === "focus";

    // When focusing a different element the browser first blurs the previous
    // one; we do the same so tests that hop between fields keep working.
    if (isFocus && currentFocus && currentFocus !== this) {
      const previous = currentFocus;
      currentFocus = null;
      previous.dispatchEvent(new FocusEvent("blur"));
    }

    let fired = false;
    const mark = () => {
      fired = true;
    };
    this.addEventListener(type, mark, { capture: true, once: true });
    const result = original.apply(this, args);
    this.removeEventListener(type, mark, { capture: true });

    if (fired) {
      // the browser dispatched the real event, keep the virtual state in sync
      handleRealEvent(this, type);
    } else if (isFocus) {
      if (currentFocus !== this) {
        currentFocus = this;
        this.dispatchEvent(new FocusEvent("focus"));
      }
    } else if (currentFocus === this) {
      currentFocus = null;
      this.dispatchEvent(new FocusEvent("blur"));
    }

    return result;
  };
}

export default function installFocusShim() {
  if (installed) {
    return;
  }
  installed = true;
  patch(HTMLElement.prototype, "focus", "focus");
  patch(HTMLElement.prototype, "blur", "blur");
}
