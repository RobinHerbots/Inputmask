import Inputmask from "./inputmask";
import keyCode from "./keycode.json";
import {getBufferTemplate} from "./positioning";
import {HandleNativePlaceholder} from "./inputHandling";

export {EventRuler};

var EventRuler = {
	on: function (input, eventName, eventHandler) {
		const $ = input.inputmask.dependencyLib;

		var ev = function (e) {
			if (e.originalEvent) {
				e = e.originalEvent || e; //get original event from jquery evenbt
				arguments[0] = e;
			}
			// console.log(e.type);
			var that = this, args, inputmask = that.inputmask, opts = inputmask ? inputmask.opts : undefined;
			if (inputmask === undefined && this.nodeName !== "FORM") { //happens when cloning an object with jquery.clone
				var imOpts = $.data(that, "_inputmask_opts");
				$(that).off(); //unbind all events
				if (imOpts) {
					(new Inputmask(imOpts)).mask(that);
				}
			} else if (!["submit", "reset", "setvalue"].includes(e.type) && this.nodeName !== "FORM" && (that.disabled || (that.readOnly && !(e.type === "keydown" && (e.ctrlKey && e.keyCode === 67) || (opts.tabThrough === false && e.keyCode === keyCode.TAB))))) {
				e.preventDefault();
			} else {
				switch (e.type) {
					case "input":
						if (inputmask.skipInputEvent === true || (e.inputType && e.inputType === "insertCompositionText")) {
							inputmask.skipInputEvent = false;
							return e.preventDefault();
						}

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
						//Safari 5.1.x - modal dialog fires keypress twice workaround
						inputmask.skipKeyPressEvent = false;
						inputmask.skipInputEvent = inputmask.isComposing = e.keyCode === keyCode.KEY_229;
						break;
					case "keyup":
					case "compositionend":
						if (inputmask.isComposing) {
							inputmask.skipInputEvent = false;
						}
						break;
					case "keypress":
						if (inputmask.skipKeyPressEvent === true) {
							return e.preventDefault();
						}
						inputmask.skipKeyPressEvent = true;
						break;
					case "click":
					case "focus":
						if (inputmask.validationEvent) { // #841
							inputmask.validationEvent = false;
							input.blur();
							HandleNativePlaceholder(input, (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join(""));
							setTimeout(function () {
								input.focus();
							}, 3000);
							return false;
						}
						args = arguments;
						setTimeout(function () { //needed for Chrome ~ initial selection clears after the clickevent
							if (!input.inputmask) {
								// `inputmask.remove()` was called before this callback
								return;
							}
							eventHandler.apply(that, args);
						}, 0);
						return false;
				}
				var returnVal = eventHandler.apply(that, arguments);
				if (returnVal === false) {
					e.preventDefault();
					e.stopPropagation();
				}
				return returnVal;
			}
		};
		if (["submit", "reset"].includes(eventName)) {
			ev = ev.bind(input); //bind creates a new eventhandler (wrap)
			if (input.form !== null) $(input.form).on(eventName, ev);
		} else {
			$(input).on(eventName, ev);
		}

		//keep instance of the event
		input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
		input.inputmask.events[eventName].push(ev);

	},
	off: function (input, event) {
		if (input.inputmask && input.inputmask.events) {
			const $ = input.inputmask.dependencyLib;
			let events = input.inputmask.events;
			if (event) {
				events = [];
				events[event] = input.inputmask.events[event];
			}
			for (let eventName in events) {
				let evArr = events[eventName];
				while (evArr.length > 0) {
					let ev = evArr.pop();
					if (["submit", "reset",].includes(eventName)) {
						if (input.form !== null) $(input.form).off(eventName, ev);
					} else {
						$(input).off(eventName, ev);
					}
				}
				delete input.inputmask.events[eventName];
			}
		}
	}
};