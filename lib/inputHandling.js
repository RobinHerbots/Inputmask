import keyCode from "./keycode.json";
import {getMaskTemplate, getPlaceholder, getTest} from "./validation-tests";
import {
	caret,
	determineNewCaretPosition,
	getBuffer, getBufferTemplate,
	getLastValidPosition,
	isMask,
	resetMaskSet,
	seekNext
} from "./positioning";
import {isComplete, isValid, refreshFromBuffer} from "./validation";
import {ie} from "./environment";
import {EventHandlers} from "./eventhandlers";


export {applyInputValue, clearOptionalTail, checkVal, HandleNativePlaceholder, unmaskedvalue, writeBuffer};

function applyInputValue(input, value) {
	const inputmask = input ? input.inputmask : this, opts = inputmask.opts;

	input.inputmask.refreshValue = false;
	if (typeof opts.onBeforeMask === "function") value = opts.onBeforeMask.call(inputmask, value, opts) || value;
	value = value.toString().split("");
	checkVal(input, true, false, value);
	inputmask.undoValue = inputmask._valueGet(true);
	if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate.call(inputmask).join("") && getLastValidPosition.call(inputmask) === -1) {
		input.inputmask._valueSet("");
	}
}

//todo put on prototype?
function clearOptionalTail(buffer) {
	const inputmask = this;

	buffer.length = 0;
	var template = getMaskTemplate.call(inputmask, true, 0, true, undefined, true), lmnt;
	while ((lmnt = template.shift()) !== undefined) buffer.push(lmnt);
	return buffer;
}

function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
	const inputmask = input ? input.inputmask : this,
		maskset = inputmask.maskset,
		opts = inputmask.opts, $ = inputmask.dependencyLib;

	var inputValue = nptvl.slice(),
		charCodes = "",
		initialNdx = -1,
		result = undefined, skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
	opts.skipOptionalPartCharacter = ""; //see issue #2311

	function isTemplateMatch(ndx, charCodes) {
		var targetTemplate = getMaskTemplate.call(inputmask, true, 0).slice(ndx, seekNext.call(inputmask, ndx, false, false)).join("").replace(/'/g, ""),
			charCodeNdx = targetTemplate.indexOf(charCodes);
		//strip spaces from targetTemplate
		while (charCodeNdx > 0 && targetTemplate[charCodeNdx - 1] === " ") charCodeNdx--;

		var match = charCodeNdx === 0 && !isMask.call(inputmask, ndx)
			&& (getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0)
				|| (getTest.call(inputmask, ndx).match.static === true && getTest.call(inputmask, ndx).match.nativeDef === ("'" + charCodes.charAt(0)))
				|| (getTest.call(inputmask, ndx).match.nativeDef === " " && (getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0)
					|| (getTest.call(inputmask, ndx + 1).match.static === true && getTest.call(inputmask, ndx + 1).match.nativeDef === ("'" + charCodes.charAt(0))))));

		if (!match && charCodeNdx > 0 && !isMask.call(inputmask, ndx, false, true)) {
			var nextPos = seekNext.call(inputmask, ndx);
			if (inputmask.caretPos.begin < nextPos) {
				inputmask.caretPos = {begin: nextPos};
			}
		}
		return match;
	}

	resetMaskSet.call(inputmask);
	maskset.tests = {}; //reset tests ~ possible after alternating
	initialNdx = opts.radixPoint ? determineNewCaretPosition.call(inputmask, {
		begin: 0,
		end: 0
	}, false, opts.__financeInput === false ? "radixFocus" : undefined).begin : 0;
	maskset.p = initialNdx;
	inputmask.caretPos = {begin: initialNdx};

	var staticMatches = [], prevCaretPos = inputmask.caretPos;
	inputValue.forEach(function (charCode, ndx) {
		if (charCode !== undefined) { //inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
			/*if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true) &&
				isValid.call(inputmask, ndx, inputValue[ndx], true, undefined, true, true) === false) {
				inputmask.caretPos.begin++;
			} else*/
			{
				var keypress = new $.Event("_checkval");
				keypress.which = charCode.toString().charCodeAt(0);
				charCodes += charCode;
				var lvp = getLastValidPosition.call(inputmask, undefined, true);
				if (!isTemplateMatch(initialNdx, charCodes)) {
					result = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, inputmask.caretPos.begin);

					if (result) {
						initialNdx = inputmask.caretPos.begin + 1;
						charCodes = "";
					}
				} else {
					result = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, lvp + 1);
				}
				if (result) {
					if (result.pos !== undefined && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true && maskset.validPositions[result.pos].alternation === undefined) {
						staticMatches.push(result.pos);
						if (!inputmask.isRTL) {
							result.forwardPosition = result.pos + 1;
						}
					}
					writeBuffer.call(inputmask, undefined, getBuffer.call(inputmask), result.forwardPosition, keypress, false);
					inputmask.caretPos = {begin: result.forwardPosition, end: result.forwardPosition};
					prevCaretPos = inputmask.caretPos;
				} else {
					if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true)) {
						inputmask.caretPos.begin++;
					} else inputmask.caretPos = prevCaretPos; //restore the caret position from before the failed validation
				}
			}
		}
	});
	if (staticMatches.length > 0) {
		var sndx, validPos, nextValid = seekNext.call(inputmask, -1, undefined, false);
		if ((!isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length <= nextValid)
			|| (isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length > 0 && (staticMatches.length !== nextValid && staticMatches[0] === 0))) { //should check if is sequence starting from 0
			var nextSndx = nextValid;
			while ((sndx = staticMatches.shift()) !== undefined) {
				var keypress = new $.Event("_checkval");
				validPos = maskset.validPositions[sndx];
				validPos.generatedInput = true;
				keypress.which = validPos.input.charCodeAt(0);
				result = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, nextSndx);
				if (result && result.pos !== undefined && result.pos !== sndx && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true) {
					staticMatches.push(result.pos);
				} else if (!result) break;
				nextSndx++;
			}
		} else { //mark al statics as generated
			// while ((sndx = staticMatches.pop())) {
			// 	validPos = maskset.validPositions[sndx];
			// 	if (validPos) {
			// 		validPos.generatedInput = true;
			// 	}
			// }
		}
	}
	if (writeOut) {
		writeBuffer.call(inputmask, input, getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && initiatingEvent.type === "input" && inputmask.undoValue !== inputmask._valueGet(true));
		// for (var vndx in maskset.validPositions) {
		// 	if (maskset.validPositions[vndx].match.generated !== true) { //only remove non forced generated
		// 		delete maskset.validPositions[vndx].generatedInput; //clear generated markings ~ consider initializing with a  value as fully typed
		// 	}
		// }
	}
	opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}

function HandleNativePlaceholder(npt, value) {
	const inputmask = npt ? npt.inputmask : this;

	if (ie) {
		if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
			var buffer = getBuffer.call(inputmask).slice(),
				nptValue = npt.inputmask._valueGet();
			if (nptValue !== value) {
				var lvp = getLastValidPosition.call(inputmask);
				if (lvp === -1 && nptValue === getBufferTemplate.call(inputmask).join("")) {
					buffer = [];
				} else if (lvp !== -1) { //clearout optional tail of the mask
					clearOptionalTail.call(inputmask, buffer);
				}
				writeBuffer(npt, buffer);
			}
		}
	} else if (npt.placeholder !== value) {
		npt.placeholder = value;
		if (npt.placeholder === "") npt.removeAttribute("placeholder");
	}
}

function unmaskedvalue(input) {
	const inputmask = input ? input.inputmask : this,
		opts = inputmask.opts,
		maskset = inputmask.maskset;

	if (input) {
		if (input.inputmask === undefined) {
			return input.value;
		}
		if (input.inputmask && input.inputmask.refreshValue) { //forced refresh from the value form.reset
			applyInputValue(input, input.inputmask._valueGet(true));
		}
	}
	var umValue = [],
		vps = maskset.validPositions;
	for (var pndx in vps) {
		if (vps[pndx] && vps[pndx].match && (vps[pndx].match.static != true || (Array.isArray(maskset.metadata) && vps[pndx].generatedInput !== true))) {
			//only include generated input with multiple masks (check on metadata)
			umValue.push(vps[pndx].input);
		}
	}
	var unmaskedValue = umValue.length === 0 ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
	if (typeof opts.onUnMask === "function") {
		var bufferValue = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join("");
		unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
	}
	return unmaskedValue;
}

function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
	const inputmask = input ? input.inputmask : this,
		opts = inputmask.opts,
		$ = inputmask.dependencyLib;

	if (event && typeof opts.onBeforeWrite === "function") {
		//    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
		var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
		if (result) {
			if (result.refreshFromBuffer) {
				var refresh = result.refreshFromBuffer;
				refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
				buffer = getBuffer.call(inputmask, true);
			}
			if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
		}
	}
	if (input !== undefined) {
		input.inputmask._valueSet(buffer.join(""));
		if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
			// console.log(caretPos);
			caret.call(inputmask, input, caretPos, undefined, undefined, (event !== undefined && event.type === "keydown" && (event.keyCode === keyCode.DELETE || event.keyCode === keyCode.BACKSPACE)));
		}
		if (triggerEvents === true) {
			var $input = $(input), nptVal = input.inputmask._valueGet();
			input.inputmask.skipInputEvent = true;
			$input.trigger("input");
			setTimeout(function () { //timeout needed for IE
				if (nptVal === getBufferTemplate.call(inputmask).join("")) {
					$input.trigger("cleared");
				} else if (isComplete.call(inputmask, buffer) === true) {
					$input.trigger("complete");
				}
			}, 0);
		}
	}
}
