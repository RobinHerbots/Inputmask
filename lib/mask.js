import keyCode from "./keycode.json";
import {caret, getBuffer, getBufferTemplate, getLastValidPosition, resetMaskSet, seekNext} from "./positioning";
import {applyInputValue, clearOptionalTail, writeBuffer} from "./inputHandling";
import {EventRuler} from "./eventruler";
import {iphone, mobile} from "./environment";
import {isComplete} from "./validation";
import {EventHandlers} from "./eventhandlers";

export{mask};

//todo put on the prototype?
function mask() {
	const inputmask = this,
		opts= this.opts,
	el=this.el,$=this.dependencyLib;


	function isElementTypeSupported(input, opts) {
		function patchValueProperty(npt) {
			var valueGet;
			var valueSet;

			function patchValhook(type) {
				if ($.valHooks && ($.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true)) {
					var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
						return elem.value;
					};
					var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
						elem.value = value;
						return elem;
					};

					$.valHooks[type] = {
						get: function (elem) {
							if (elem.inputmask) {
								if (elem.inputmask.opts.autoUnmask) {
									return elem.inputmask.unmaskedvalue();
								} else {
									var result = valhookGet(elem);
									return getLastValidPosition.call(inputmask, undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
								}
							} else {
								return valhookGet(elem);
							}
						},
						set: function (elem, value) {
							var result = valhookSet(elem, value);
							if (elem.inputmask) {
								applyInputValue(elem, value);
							}
							return result;
						},
						inputmaskpatch: true
					};
				}
			}

			function getter() {
				if (this.inputmask) {
					return this.inputmask.opts.autoUnmask ?
						this.inputmask.unmaskedvalue() :
						(getLastValidPosition.call(inputmask) !== -1 || opts.nullable !== true ?
							((this.inputmask.shadowRoot || document.activeElement) === this && opts.clearMaskOnLostFocus ?
								(inputmask.isRTL ? clearOptionalTail.call(inputmask,getBuffer.call(inputmask).slice()).reverse() : clearOptionalTail.call(inputmask,getBuffer.call(inputmask).slice())).join("") :
								valueGet.call(this)) :
							"");
				} else {
					return valueGet.call(this);
				}
			}

			function setter(value) {
				valueSet.call(this, value);
				if (this.inputmask) {
					applyInputValue(this, value);
				}
			}

			function installNativeValueSetFallback(npt) {
				EventRuler.on(npt, "mouseenter", function () {
					var input = this,
						value = input.inputmask._valueGet(true);
					if (value !== (inputmask.isRTL ? getBuffer.call(inputmask).reverse() : getBuffer.call(inputmask)).join("")) { //Is this correct? to apply RTL? TOCHECK
						applyInputValue(input, value);
					}
				});
			}

			if (!npt.inputmask.__valueGet) {
				if (opts.noValuePatching !== true) {
					if (Object.getOwnPropertyDescriptor) {
						var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
						if (valueProperty && valueProperty.get && valueProperty.set) {
							valueGet = valueProperty.get;
							valueSet = valueProperty.set;
							Object.defineProperty(npt, "value", {
								get: getter,
								set: setter,
								configurable: true
							});
						} else if (npt.tagName.toLowerCase() !== "input") {
							valueGet = function () {
								return this.textContent;
							};
							valueSet = function (value) {
								this.textContent = value;
							};
							Object.defineProperty(npt, "value", {
								get: getter,
								set: setter,
								configurable: true
							});
						}
					} else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
						valueGet = npt.__lookupGetter__("value");
						valueSet = npt.__lookupSetter__("value");

						npt.__defineGetter__("value", getter);
						npt.__defineSetter__("value", setter);
					}
					npt.inputmask.__valueGet = valueGet; //store native property getter
					npt.inputmask.__valueSet = valueSet; //store native property setter
				}
				npt.inputmask._valueGet = function (overruleRTL) {
					return inputmask.isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
				};
				npt.inputmask._valueSet = function (value, overruleRTL) { //null check is needed for IE8 => otherwise converts to "null"
					valueSet.call(this.el, (value === null || value === undefined) ? "" : ((overruleRTL !== true && inputmask.isRTL) ? value.split("").reverse().join("") : value));
				};

				if (valueGet === undefined) { //jquery.val fallback
					valueGet = function () {
						return this.value;
					};
					valueSet = function (value) {
						this.value = value;
					};
					patchValhook(npt.type);
					installNativeValueSetFallback(npt);
				}
			}
		}

		if (input.tagName.toLowerCase() !== "textarea") {
			opts.ignorables.push(keyCode.ENTER);
		}

		var elementType = input.getAttribute("type");
		var isSupported = (input.tagName.toLowerCase() === "input" && opts.supportsInputType.includes(elementType)) || input.isContentEditable || input.tagName.toLowerCase() === "textarea";
		if (!isSupported) {
			if (input.tagName.toLowerCase() === "input") {
				var el = document.createElement("input");
				el.setAttribute("type", elementType);
				isSupported = el.type === "text"; //apply mask only if the type is not natively supported
				el = null;
			} else {
				isSupported = "partial";
			}
		}
		if (isSupported !== false) {
			patchValueProperty(input);
		} else {
			input.inputmask = undefined;
		}
		return isSupported;
	}

	//unbind all events - to make sure that no other mask will interfere when re-masking
	EventRuler.off(el);
	var isSupported = isElementTypeSupported(el, opts);
	if (isSupported !== false) {
		inputmask.originalPlaceholder = el.placeholder;

		//read maxlength prop from el
		inputmask.maxLength = el !== undefined ? el.maxLength : undefined;
		if (inputmask.maxLength === -1) inputmask.maxLength = undefined;
		if ("inputMode" in el && el.getAttribute("inputmode") === null) {
			el.inputMode = opts.inputmode;
			el.setAttribute("inputmode", opts.inputmode);
		}


		if (isSupported === true) {
			opts.showMaskOnFocus = opts.showMaskOnFocus && ["cc-number", "cc-exp"].indexOf(el.autocomplete) === -1;
			if (iphone) { //selecting the caret shows as a slection on iphone
				opts.insertModeVisual = false;
			}

			//bind events
			EventRuler.on(el, "submit", EventHandlers.submitEvent);
			EventRuler.on(el, "reset", EventHandlers.resetEvent);
			EventRuler.on(el, "blur", EventHandlers.blurEvent);
			EventRuler.on(el, "focus", EventHandlers.focusEvent);
			EventRuler.on(el, "invalid", EventHandlers.invalidEvent);
			EventRuler.on(el, "click", EventHandlers.clickEvent);
			EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
			EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
			EventRuler.on(el, "paste", EventHandlers.pasteEvent);
			EventRuler.on(el, "cut", EventHandlers.cutEvent);
			EventRuler.on(el, "complete", opts.oncomplete);
			EventRuler.on(el, "incomplete", opts.onincomplete);
			EventRuler.on(el, "cleared", opts.oncleared);
			if (opts.inputEventOnly !== true) {
				EventRuler.on(el, "keydown", EventHandlers.keydownEvent);
				EventRuler.on(el, "keypress", EventHandlers.keypressEvent);
				EventRuler.on(el, "keyup", EventHandlers.keyupEvent);
			}
			if (mobile || opts.inputEventOnly) {
				el.removeAttribute("maxLength");
			}
			EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
			EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent);
			// EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent); //https://github.com/w3c/input-events - to implement
		}
		EventRuler.on(el, "setvalue", EventHandlers.setValueEvent);

		//apply mask
		inputmask.undoValue = getBufferTemplate.call(inputmask).join(""); //initialize the buffer and getmasklength
		var activeElement = (el.inputmask.shadowRoot || document).activeElement;
		if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || activeElement === el) {
			applyInputValue(el, el.inputmask._valueGet(true), opts);
			var buffer = getBuffer.call(inputmask).slice();
			if (isComplete.call(inputmask, buffer) === false) {
				if (opts.clearIncomplete) {
					resetMaskSet.call(inputmask);
				}
			}
			if (opts.clearMaskOnLostFocus && activeElement !== el) {
				if (getLastValidPosition.call(inputmask) === -1) {
					buffer = [];
				} else {
					clearOptionalTail.call(inputmask, buffer);
				}
			}
			if (opts.clearMaskOnLostFocus === false || (opts.showMaskOnFocus && activeElement === el) || el.inputmask._valueGet(true) !== "") {
				writeBuffer(el, buffer);
			}
			if (activeElement === el) { //position the caret when in focus
				caret.call(inputmask,el, seekNext.call(inputmask, getLastValidPosition.call(inputmask)));
			}
		}
	}
}