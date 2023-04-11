import {
    caret, determineNewCaretPosition,
    getBuffer, getBufferTemplate,
    getLastValidPosition, isMask,
    resetMaskSet,
    seekNext,
    seekPrevious,
    translatePosition
} from "./positioning";
import {keys} from "./keycode.js";
import {iphone, mobile} from "./environment";
import {handleRemove, isComplete, isSelection, isValid} from "./validation";
import {applyInputValue, checkVal, clearOptionalTail, HandleNativePlaceholder, writeBuffer} from "./inputHandling";
import {getPlaceholder, getTest} from "./validation-tests";
import window from "./global/window";

export {EventHandlers};

var EventHandlers = {
    keyEvent: function (e, checkval, writeOut, strict, ndx) {
        const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib,
            maskset = inputmask.maskset;

        var input = this,
            $input = $(input),
            c = e.key,
            pos = caret.call(inputmask, input);

        var kdResult = opts.onKeyDown.call(this, e, getBuffer.call(inputmask), pos, opts);
        if (kdResult !== undefined) return kdResult;

        //backspace, delete, and escape get special treatment
        if (c === keys.Backspace || c === keys.Delete || (iphone && c === keys.BACKSPACE_SAFARI) || (e.ctrlKey && c === keys.x && !("oncut" in input))) { //backspace/delete
            e.preventDefault(); //stop default action but allow propagation
            handleRemove.call(inputmask, input, c, pos);
            writeBuffer(input, getBuffer.call(inputmask, true), maskset.p, e, input.inputmask._valueGet() !== getBuffer.call(inputmask).join(""));
        } else if (c === keys.End || c === keys.PageDown) { //when END or PAGE_DOWN pressed set position at lastmatch
            e.preventDefault();
            var caretPos = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
            caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
        } else if ((c === keys.Home && !e.shiftKey) || c === keys.PageUp) { //Home or page_up
            e.preventDefault();
            caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, true);
        } else if (((opts.undoOnEscape && c === keys.Escape) || (false && c === keys.z && e.ctrlKey)) && e.altKey !== true) { //escape && undo && #762
            checkVal(input, true, false, inputmask.undoValue.split(""));
            $input.trigger("click");
        } else if (c === keys.Insert && !(e.shiftKey || e.ctrlKey) && inputmask.userOptions.insertMode === undefined) { //insert
            if (!isSelection.call(inputmask, pos)) {
                opts.insertMode = !opts.insertMode;
                caret.call(inputmask, input, pos.begin, pos.begin);
            } else opts.insertMode = !opts.insertMode;
        } else if (opts.tabThrough === true && c === keys.Tab) {
            if (e.shiftKey === true) {
                pos.end = seekPrevious.call(inputmask, pos.end, true);
                if (getTest.call(inputmask, pos.end - 1).match.static === true) {
                    pos.end--;
                }
                pos.begin = seekPrevious.call(inputmask, pos.end, true);
                if (pos.begin >= 0 && pos.end > 0) {
                    e.preventDefault();
                    caret.call(inputmask, input, pos.begin, pos.end);
                }
            } else {
                pos.begin = seekNext.call(inputmask, pos.begin, true);
                pos.end = seekNext.call(inputmask, pos.begin, true);
                if (pos.end < maskset.maskLength) pos.end--;
                if (pos.begin <= maskset.maskLength) {
                    e.preventDefault();
                    caret.call(inputmask, input, pos.begin, pos.end);
                }
            }
        } else if (!e.shiftKey) {
            if (opts.insertModeVisual && opts.insertMode === false) {
                if (c === keys.ArrowRight) {
                    setTimeout(function () {
                        var caretPos = caret.call(inputmask, input);
                        caret.call(inputmask, input, caretPos.begin);
                    }, 0);
                } else if (c === keys.ArrowLeft) {
                    setTimeout(function () {
                        var caretPos = {
                            begin: translatePosition.call(inputmask, input.inputmask.caretPos.begin),
                            end: translatePosition.call(inputmask, input.inputmask.caretPos.end)
                        };
                        if (inputmask.isRTL) {
                            caret.call(inputmask, input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1));
                        } else {
                            caret.call(inputmask, input, caretPos.begin - (caretPos.begin === 0 ? 0 : 1));
                        }
                    }, 0);
                }
            }
        }

        inputmask.isComposing = (c == keys.Process || c == keys.Unidentified);
        inputmask.ignorable = opts.ignorables.includes(c);
        return EventHandlers.keypressEvent.call(this, e, checkval, writeOut, strict, ndx);
    },
    keypressEvent: function (e, checkval, writeOut, strict, ndx) {
        const inputmask = this.inputmask || this, opts = inputmask.opts, $ = inputmask.dependencyLib,
            maskset = inputmask.maskset;

        var input = inputmask.el,
            $input = $(input),
            c = e.key;

        if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable))) {
            if (c === keys.Enter) {
                if (inputmask.undoValue !== inputmask._valueGet(true)) {
                    inputmask.undoValue = inputmask._valueGet(true);
                    // e.preventDefault();

                    setTimeout(function () {
                        $input.trigger("change");
                    }, 0);
                }
            }
            //inputmask.skipInputEvent = true; //skip the input as otherwise the skipped char could be picked up for validation by the inputfallback
            return;
        } else if (c) {
            //special treat the decimal separator
            // if ((k === 44 || k === 46) && e.location === 3 && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
            var pos = checkval ? {
                    begin: ndx,
                    end: ndx
                } : caret.call(inputmask, input),
                forwardPosition;

            //allow for character substitution
            c = opts.substitutes[c] || c;
            maskset.writeOutBuffer = true;
            var valResult = isValid.call(inputmask, pos, c, strict, undefined, undefined, undefined, checkval);
            if (valResult !== false) {
                resetMaskSet.call(inputmask, true);
                forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos);
                maskset.p = forwardPosition; //needed for checkval
            }

            forwardPosition = ((opts.numericInput && valResult.caret === undefined) ? seekPrevious.call(inputmask, forwardPosition) : forwardPosition);
            if (writeOut !== false) {

                setTimeout(function () {
                    opts.onKeyValidation.call(input, c, valResult);
                }, 0);
                if (maskset.writeOutBuffer && valResult !== false) {
                    var buffer = getBuffer.call(inputmask);
                    writeBuffer(input, buffer, forwardPosition, e, checkval !== true);
                }
            }

            e.preventDefault();

            if (checkval) {
                if (valResult !== false) valResult.forwardPosition = forwardPosition;
                return valResult;
            }
        }
    },
    pasteEvent: function (e) {
        const inputmask = this.inputmask, opts = inputmask.opts;

        var input = this,
            inputValue = inputmask._valueGet(true),
            caretPos = caret.call(inputmask, input),
            tempValue;

        if (inputmask.isRTL) {
            tempValue = caretPos.end;
            caretPos.end = translatePosition.call(inputmask, caretPos.begin);
            caretPos.begin = translatePosition.call(inputmask, tempValue);
        }

        var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
            valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);

        if (valueBeforeCaret == (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
        if (valueAfterCaret == (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(caretPos.end).join("")) valueAfterCaret = "";

        if (window.clipboardData && window.clipboardData.getData) { // IE
            inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
        } else if (e.clipboardData && e.clipboardData.getData) {
            inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
        } else {
            return true;
        } //allow native paste event as fallback ~ masking will continue by inputfallback

        var pasteValue = inputValue;
        if (inputmask.isRTL) {
            pasteValue = pasteValue.split("");
            for (let c of getBufferTemplate.call(inputmask)) {
                if (pasteValue[0] === c)
                    pasteValue.shift();
            }
            pasteValue = pasteValue.join("");
        }
        if (typeof opts.onBeforePaste === "function") {
            pasteValue = opts.onBeforePaste.call(inputmask, pasteValue, opts);
            if (pasteValue === false) {
                return false;
            }
            if (!pasteValue) {
                pasteValue = inputValue;
            }
        }
        checkVal(input, true, false, pasteValue.toString().split(""), e);
        e.preventDefault();
    },
    inputFallBackEvent: function (e) { //fallback when keypress is not triggered
        const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
        // console.log(e.inputType);

        function analyseChanges(inputValue, buffer, caretPos) {
            var frontPart = inputValue.substr(0, caretPos.begin).split(""),
                backPart = inputValue.substr(caretPos.begin).split(""),
                frontBufferPart = buffer.substr(0, caretPos.begin).split(""),
                backBufferPart = buffer.substr(caretPos.begin).split("");

            var fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length,
                bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length,
                bl, i, action = "", data = [], marker = "~", placeholder;

            //align buffers
            while (frontPart.length < fpl) frontPart.push(marker);
            while (frontBufferPart.length < fpl) frontBufferPart.push(marker);
            while (backPart.length < bpl) backPart.unshift(marker);
            while (backBufferPart.length < bpl) backBufferPart.unshift(marker);

            var newBuffer = frontPart.concat(backPart);
            var oldBuffer = frontBufferPart.concat(backBufferPart);

            // console.log("N " + newBuffer);
            // console.log("O " + oldBuffer);

            for (i = 0, bl = newBuffer.length; i < bl; i++) {
                placeholder = getPlaceholder.call(inputmask, translatePosition.call(inputmask, i));
                switch (action) {
                    case "insertText":
                        if (oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1) {
                            data.push(newBuffer[i]);
                        }
                        i = bl;
                        break;
                    case "insertReplacementText":
                        if (newBuffer[i] === marker) { //extend selection
                            caretPos.end++;
                        } else {
                            // breakout loop
                            i = bl;
                        }
                        break;
                    case "deleteContentBackward":
                        if (newBuffer[i] === marker) {
                            caretPos.end++;
                        } else {
                            //breakout loop
                            i = bl;
                        }
                        break;
                    default:
                        if (newBuffer[i] !== oldBuffer[i]) {
                            if ((newBuffer[i + 1] === marker || newBuffer[i + 1] === placeholder || newBuffer[i + 1] === undefined) && ((oldBuffer[i] === placeholder && oldBuffer[i + 1] === marker) || oldBuffer[i] === marker)) {  //basic insert
                                action = "insertText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                                caretPos.end--;
                            } else if (oldBuffer[i + 1] === marker && oldBuffer[i] === newBuffer[i + 1]) { //insert between
                                action = "insertText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                                caretPos.end--;
                            } else if (newBuffer[i] !== placeholder && newBuffer[i] !== marker &&
                                (newBuffer[i + 1] === marker || (oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1] /*single char replacement*/))) { //replace selection
                                action = "insertReplacementText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                            } else if (newBuffer[i] === marker) {  //delete~backspace
                                action = "deleteContentBackward";
                                if (isMask.call(inputmask, translatePosition.call(inputmask, i), true) || oldBuffer[i] === opts.radixPoint) caretPos.end++;
                            } else {
                                i = bl;
                            }
                        }
                        break;
                }
            }

            return {
                action: action,
                data: data,
                caret: caretPos
            };
        }

        var input = this,
            inputValue = input.inputmask._valueGet(true),
            buffer = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join(""),
            caretPos = caret.call(inputmask, input, undefined, undefined, true),
            changes;

        if (buffer !== inputValue) {
            changes = analyseChanges(inputValue, buffer, caretPos);
            if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
                input.focus();
            }
            writeBuffer(input, getBuffer.call(inputmask));
            caret.call(inputmask, input, caretPos.begin, caretPos.end, true);

            // Japanese IME hack #2662
            if (!mobile && inputmask.skipNextInsert && e.inputType === "insertText" && changes.action === "insertText" && inputmask.isComposing) {
                return false;
            }
            if (e.inputType === "insertCompositionText" && changes.action === "insertText" && inputmask.isComposing) {
                inputmask.skipNextInsert = true;
            } else {
                inputmask.skipNextInsert = false;
            }

            switch (changes.action) {
                case "insertText":
                case "insertReplacementText":
                    changes.data.forEach(function (entry, ndx) {
                        var keypress = new $.Event("keypress");
                        keypress.key = entry;
                        inputmask.ignorable = false; //make sure ignorable is ignored ;-)
                        EventHandlers.keypressEvent.call(input, keypress);
                    });
                    setTimeout(function () {  //#2195 trigger keyup to help some other plugins to track changes
                        inputmask.$el.trigger("keyup");
                    }, 0);
                    break;
                case "deleteContentBackward":
                    var keydown = new $.Event("keydown");
                    keydown.key = keys.Backspace;
                    EventHandlers.keyEvent.call(input, keydown);
                    break;
                default:
                    applyInputValue(input, inputValue);
                    caret.call(inputmask, input, caretPos.begin, caretPos.end, true);
                    break;
            }

            e.preventDefault();
        }
    },
    setValueEvent: function (e) {
        const inputmask = this.inputmask;
        var input = this,
            value = (e && e.detail) ? e.detail[0] : arguments[1];

        if (value === undefined) {
            value = input.inputmask._valueGet(true);
        }

        applyInputValue(input, value);

        if ((e.detail && e.detail[1] !== undefined) || arguments[2] !== undefined) {
            caret.call(inputmask, input, e.detail ? e.detail[1] : arguments[2]);
        }
    }
    ,
    focusEvent: function (e) {
        const inputmask = this.inputmask, opts = inputmask.opts;
        var input = this,
            nptValue = inputmask && inputmask._valueGet();

        if (opts.showMaskOnFocus) {
            if (nptValue !== getBuffer.call(inputmask).join("")) {
                writeBuffer(input, getBuffer.call(inputmask), seekNext.call(inputmask, getLastValidPosition.call(inputmask)));
            } /*else if (mouseEnter === false) { //only executed on focus without mouseenter
					caret(input, seekNext(getLastValidPosition()));
				}*/
        }
        if (opts.positionCaretOnTab === true && inputmask.mouseEnter === false && (!isComplete.call(inputmask, getBuffer.call(inputmask)) || getLastValidPosition.call(inputmask) === -1)) {
            EventHandlers.clickEvent.apply(input, [e, true]);
        }
        inputmask.undoValue = inputmask && inputmask.unmaskedvalue();
    },
    invalidEvent: function (e) {
        this.inputmask.validationEvent = true;
    },
    mouseleaveEvent: function () {
        const inputmask = this.inputmask, opts = inputmask.opts;

        var input = this;
        inputmask.mouseEnter = false;
        if (opts.clearMaskOnLostFocus && (input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
            HandleNativePlaceholder(input, inputmask.originalPlaceholder);
        }
    },
    clickEvent: function (e, tabbed) {
        const inputmask = this.inputmask;
        inputmask.clicked++;

        var input = this;
        if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement === input) {
            var newCaretPosition = determineNewCaretPosition.call(inputmask, caret.call(inputmask, input), tabbed);
            if (newCaretPosition !== undefined) {
                caret.call(inputmask, input, newCaretPosition);
            }
        }
    },
    cutEvent: function (e) {
        const inputmask = this.inputmask, maskset = inputmask.maskset;

        var input = this,
            pos = caret.call(inputmask, input);

        //correct clipboardData
        var clipData = inputmask.isRTL ? getBuffer.call(inputmask).slice(pos.end, pos.begin) : getBuffer.call(inputmask).slice(pos.begin, pos.end),
            clipDataText = inputmask.isRTL ? clipData.reverse().join("") : clipData.join("");
        if (window.navigator && window.navigator.clipboard) window.navigator.clipboard.writeText(clipDataText);
        else if (window.clipboardData && window.clipboardData.getData) { // IE
            window.clipboardData.setData("Text", clipDataText);
        }
        handleRemove.call(inputmask, input, keys.Delete, pos);
        writeBuffer(input, getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== inputmask._valueGet(true));
    },
    blurEvent: function (e) {
        const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
        inputmask.clicked = 0;

        var $input = $(this),
            input = this;
        if (input.inputmask) {
            HandleNativePlaceholder(input, inputmask.originalPlaceholder);
            var nptValue = input.inputmask._valueGet(),
                buffer = getBuffer.call(inputmask).slice();

            if (nptValue !== "") {
                if (opts.clearMaskOnLostFocus) {
                    if (getLastValidPosition.call(inputmask) === -1 && nptValue === getBufferTemplate.call(inputmask).join("")) {
                        buffer = [];
                    } else { //clearout optional tail of the mask
                        clearOptionalTail.call(inputmask, buffer);
                    }
                }
                if (isComplete.call(inputmask, buffer) === false) {
                    setTimeout(function () {
                        $input.trigger("incomplete");
                    }, 0);
                    if (opts.clearIncomplete) {
                        resetMaskSet.call(inputmask);
                        if (opts.clearMaskOnLostFocus) {
                            buffer = [];
                        } else {
                            buffer = getBufferTemplate.call(inputmask).slice();
                        }

                    }
                }

                writeBuffer(input, buffer, undefined, e);
            }

            if (inputmask.undoValue !== inputmask._valueGet(true)) {
                inputmask.undoValue = inputmask._valueGet(true);
                $input.trigger("change");
            }
        }
    }
    ,
    mouseenterEvent: function () {
        const inputmask = this.inputmask, {showMaskOnHover} = inputmask.opts;

        var input = this;
        inputmask.mouseEnter = true;
        if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
            var bufferTemplate = (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("");
            if (showMaskOnHover) {
                HandleNativePlaceholder(input, bufferTemplate);
            }
        }
    }
    ,
    submitEvent: function () { //trigger change on submit if any
        const inputmask = this.inputmask, opts = inputmask.opts;

        if (inputmask.undoValue !== inputmask._valueGet(true)) {
            inputmask.$el.trigger("change");
        }
        if (/*opts.clearMaskOnLostFocus && */getLastValidPosition.call(inputmask) === -1 && inputmask._valueGet && inputmask._valueGet() === getBufferTemplate.call(inputmask).join("")) {
            inputmask._valueSet(""); //clear masktemplete on submit and still has focus
        }
        if (opts.clearIncomplete && isComplete.call(inputmask, getBuffer.call(inputmask)) === false) {
            inputmask._valueSet("");
        }
        if (opts.removeMaskOnSubmit) {
            inputmask._valueSet(inputmask.unmaskedvalue(), true);
            setTimeout(function () {
                writeBuffer(inputmask.el, getBuffer.call(inputmask));
            }, 0);
        }
    }
    ,
    resetEvent: function () {
        const inputmask = this.inputmask;

        inputmask.refreshValue = true; //indicate a forced refresh when there is a call to the value before leaving the triggering event fn
        setTimeout(function () {
            applyInputValue(inputmask.el, inputmask._valueGet(true));
        }, 0);
    }
};
