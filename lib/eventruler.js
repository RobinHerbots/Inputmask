import { HandleNativePlaceholder } from "./inputHandling";
import Inputmask from "./inputmask";
import { keys } from "./keycode.js";
import { getBufferTemplate } from "./positioning";

export { EventRuler };

const EventRuler = {
  on: function (input, eventName, eventHandler) {
    const $ = input.inputmask.dependencyLib;

    let ev = function (e) {
      if (e.originalEvent) {
        e = e.originalEvent || e; // get original event from jquery event
        arguments[0] = e;
      }
      // console.log(e.type);
      const that = this,
        inputmask = that.inputmask,
        opts = inputmask ? inputmask.opts : undefined;
      let args;
      if (inputmask === undefined && this.nodeName !== "FORM") {
        // happens when cloning an object with jquery.clone
        const imOpts = $.data(that, "_inputmask_opts");
        $(that).off(); // unbind all events
        if (imOpts) {
          new Inputmask(imOpts).mask(that);
        }
      } else if (
        !["submit", "reset", "setvalue"].includes(e.type) &&
        this.nodeName !== "FORM" &&
        (that.disabled ||
          (that.readOnly &&
            !(
              (e.type === "keydown" && e.ctrlKey && e.key === keys.c) ||
              (opts.tabThrough === false && e.key === keys.Tab)
            )))
      ) {
        e.preventDefault();
      } else {
        switch (e.type) {
          case "input":
            if (inputmask.skipInputEvent === true) {
              inputmask.skipInputEvent = false;
              return e.preventDefault();
            }

            // #2855
            // Prevent duplicate input processing between keyEvent and inputFallBackEvent
            // This fixes Chinese IME duplication issue on Safari where both events fire for the same input
            // if (
            //   inputmask.lastInputEvent &&
            //   Date.now() - inputmask.lastInputEvent.time < 10 &&
            //   inputmask.lastInputEvent.data === e.data
            // ) {
            //   return;
            // }
            // Mark input as processed to prevent duplicate handling by keyEvent
            // This fixes Chinese IME duplication issue on Safari #2855
            inputmask.lastInputEvent = {
              time: Date.now(),
              data: e.data
            };

            // if (mobile) { //this causes problem see #2220
            // 	args = arguments;
            // 	setTimeout(function () { //needed for caret selection when entering a char on Android 8 - #1818
            // 		eventHandler.apply(that, args);
            // 		caret(that, that.inputmask.caretPos, undefined, true);
            // 	}, 0);
            // 	return false;
            // }
            break;
          case "keydown":
            // Prevent duplicate input processing between keyEvent and inputFallBackEvent #2855
            // This fixes Chinese IME duplication issue on Safari where both events fire for the same input
            if (
              inputmask.lastInputEvent &&
              Date.now() - inputmask.lastInputEvent.time < 10 &&
              inputmask.lastInputEvent.data === e.key
            ) {
              return false;
            }
            break;
          case "click":
          case "focus":
            if (inputmask.validationEvent) {
              // #841
              inputmask.validationEvent = false;
              input.blur();
              HandleNativePlaceholder(
                input,
                (inputmask.isRTL
                  ? getBufferTemplate.call(inputmask).slice().reverse()
                  : getBufferTemplate.call(inputmask)
                ).join("")
              );
              setTimeout(function () {
                input.focus();
              }, opts.validationEventTimeOut);
              return false;
            }
            args = arguments;
            setTimeout(function () {
              // needed for Chrome ~ initial selection clears after the clickevent
              if (!input.inputmask) {
                // `inputmask.remove()` was called before this callback
                return;
              }
              eventHandler.apply(that, args);
            }, 0);
            return /* false */; // #2423
        }
        const returnVal = eventHandler.apply(that, arguments);
        if (returnVal === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        return returnVal;
      }
    };
    // add inputmask namespace to event
    eventName = `${eventName}.inputmask`;
    if (["submit.inputmask", "reset.inputmask"].includes(eventName)) {
      ev = ev.bind(input); // bind creates a new eventhandler (wrap)
      if (input.form !== null) $(input.form).on(eventName, ev);
    } else {
      $(input).on(eventName, ev);
    }
  },
  off: function (input, event) {
    if (input.inputmask) {
      const $ = input.inputmask.dependencyLib;
      $(input).off(event || ".inputmask");
    }
  }
};
