import {
	determineTestTemplate,
	getMaskTemplate,
	getPlaceholder,
	getTest,
	getTests,
	getTestTemplate
} from "./validation-tests";
import {checkAlternationMatch} from "./validation";
import {mask} from "./mask";

export {
	caret,
	determineLastRequiredPosition,
	determineNewCaretPosition,
	getBuffer,
	getBufferTemplate,
	getLastValidPosition,
	isMask,
	resetMaskSet,
	seekNext,
	seekPrevious,
	translatePosition
};

//tobe put on prototype?
function caret(input, begin, end, notranslate, isDelete) {
	const inputmask = this,
		opts = this.opts;

	var range;
	if (begin !== undefined) {
		if (Array.isArray(begin)) {
			end = inputmask.isRTL ? begin[0] : begin[1];
			begin = inputmask.isRTL ? begin[1] : begin[0];
		}
		if (begin.begin !== undefined) {
			end = inputmask.isRTL ? begin.begin : begin.end;
			begin = inputmask.isRTL ? begin.end : begin.begin;
		}
		if (typeof begin === "number") {
			begin = notranslate ? begin : translatePosition.call(inputmask, begin);
			end = notranslate ? end : translatePosition.call(inputmask, end);
			end = (typeof end == "number") ? end : begin;
			// if (!$(input).is(":visible")) {
			// 	return;
			// }

			var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
			input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
			input.inputmask.caretPos = {begin: begin, end: end}; //track caret internally
			if (opts.insertModeVisual && opts.insertMode === false && begin === end) {
				if (!isDelete) {
					end++; //set visualization for insert/overwrite mode
				}
			}
			if (input === (input.inputmask.shadowRoot || document).activeElement) {
				if ("setSelectionRange" in input) {
					input.setSelectionRange(begin, end);
				} else if (window.getSelection) {
					range = document.createRange();
					if (input.firstChild === undefined || input.firstChild === null) {
						var textNode = document.createTextNode("");
						input.appendChild(textNode);
					}
					range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
					range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
					range.collapse(true);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
					//input.focus();
				} else if (input.createTextRange) {
					range = input.createTextRange();
					range.collapse(true);
					range.moveEnd("character", end);
					range.moveStart("character", begin);
					range.select();
				}
			}
		}
	} else {
		if ("selectionStart" in input && "selectionEnd" in input) {
			begin = input.selectionStart;
			end = input.selectionEnd;
		} else if (window.getSelection) {
			range = window.getSelection().getRangeAt(0);
			if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
				begin = range.startOffset;
				end = range.endOffset;
			}
		} else if (document.selection && document.selection.createRange) {
			range = document.selection.createRange();
			begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
			end = begin + range.text.length;
		}

		// if (opts.insertModeVisual && opts.insertMode === false && begin === (end - 1)) end--; //correct caret for insert/overwrite mode

		/*eslint-disable consistent-return */
		return {
			"begin": notranslate ? begin : translatePosition.call(inputmask, begin),
			"end": notranslate ? end : translatePosition.call(inputmask, end)
		};
		/*eslint-enable consistent-return */
	}
}

//tobe put on prototype?
function determineLastRequiredPosition(returnDefinition) {
	const inputmask = this,
		maskset = this.maskset,
		$ = this.dependencyLib;

	var buffer = getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true, true),
		bl = buffer.length,
		pos, lvp = getLastValidPosition.call(inputmask),
		positions = {},
		lvTest = maskset.validPositions[lvp],
		ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
		testPos;
	for (pos = lvp + 1; pos < buffer.length; pos++) {
		testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
		ndxIntlzr = testPos.locator.slice();
		positions[pos] = $.extend(true, {}, testPos);
	}

	var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
	for (pos = bl - 1; pos > lvp; pos--) {
		testPos = positions[pos];
		if ((testPos.match.optionality ||
			(testPos.match.optionalQuantifier && testPos.match.newBlockMarker) ||
			(lvTestAlt &&
				(
					(lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.static != true) ||
					(testPos.match.static === true &&
						testPos.locator[lvTest.alternation] &&
						checkAlternationMatch.call(inputmask, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) &&
						getTests.call(inputmask, pos)[0].def !== "")
				)
			)) &&
			buffer[pos] === getPlaceholder.call(inputmask, pos, testPos.match)) {
			bl--;
		} else {
			break;
		}
	}
	return returnDefinition ? {
		"l": bl,
		"def": positions[bl] ? positions[bl].match : undefined
	} : bl;
}

//tobe put on prototype?
function determineNewCaretPosition(selectedCaret, tabbed) {
	const inputmask = this,
		maskset = this.maskset,
		opts = this.opts;

	function doRadixFocus(clickPos) {
		if (opts.radixPoint !== "" && opts.digits !== 0) {
			var vps = maskset.validPositions;
			if (vps[clickPos] === undefined || (vps[clickPos].input === getPlaceholder.call(inputmask, clickPos))) {
				if (clickPos < seekNext.call(inputmask, -1)) return true;
				var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
				if (radixPos !== -1) {
					for (var vp in vps) {
						if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder.call(inputmask, vp)) {
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
		switch (opts.positionCaretOnClick) {
			case "none":
				break;
			case "select":
				selectedCaret = {begin: 0, end: getBuffer.call(inputmask).length};
				break;
			case "ignore":
				selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
				break;
			case "radixFocus":
				if (doRadixFocus(selectedCaret.begin)) {
					var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
					selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
					break;
				} //fallback to lvp
			// eslint-disable-next-line no-fallthrough
			default: //lvp:
				var clickPosition = selectedCaret.begin,
					lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, true),
					lastPosition = seekNext.call(inputmask, (lvclickPosition === -1 && !isMask.call(inputmask, 0)) ? -1 : lvclickPosition);

				if (clickPosition <= lastPosition) {
					selectedCaret.end = selectedCaret.begin = !isMask.call(inputmask, clickPosition, false, true) ? seekNext.call(inputmask, clickPosition) : clickPosition;
				} else {
					var lvp = maskset.validPositions[lvclickPosition],
						tt = getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : undefined, lvp),
						placeholder = getPlaceholder.call(inputmask, lastPosition, tt.match);
					if ((placeholder !== "" && getBuffer.call(inputmask)[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true) || (!isMask.call(inputmask, lastPosition, opts.keepStatic, true) && tt.match.def === placeholder)) {
						var newPos = seekNext.call(inputmask, lastPosition);
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


//tobe put on prototype?
function getBuffer(noCache) {
	const inputmask = this, maskset = this.maskset;

	if (maskset.buffer === undefined || noCache === true) {
		maskset.buffer = getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true);
		if (maskset._buffer === undefined) maskset._buffer = maskset.buffer.slice();
	}
	return maskset.buffer;
}

//tobe put on prototype?
function getBufferTemplate() {
	const inputmask = this, maskset = this.maskset;

	if (maskset._buffer === undefined) {
		//generate template
		maskset._buffer = getMaskTemplate.call(inputmask, false, 1);
		if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
	}
	return maskset._buffer;
}

//tobe put on prototype?
function getLastValidPosition(closestTo, strict, validPositions) {
	const maskset = this.maskset;

	var before = -1,
		after = -1,
		valids = validPositions || maskset.validPositions; //for use in valhook ~ context switch
	if (closestTo === undefined) closestTo = -1;
	for (var posNdx in valids) {
		var psNdx = parseInt(posNdx);
		if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
			if (psNdx <= closestTo) before = psNdx;
			if (psNdx >= closestTo) after = psNdx;
		}
	}
	return (before === -1 || before == closestTo) ? after : after == -1 ? before : (closestTo - before) < (after - closestTo) ? before : after;
}

//tobe put on prototype?
function isMask(pos, strict, fuzzy) {
	const inputmask = this, maskset = this.maskset;

	var test = getTestTemplate.call(inputmask, pos).match;
	if (test.def === "") test = getTest.call(inputmask, pos).match;

	if (test.static !== true) {
		return test.fn;
	}
	if (fuzzy === true && (maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].generatedInput !== true)) {
		return true;
	}

	if (strict !== true && pos > -1) {
		if (fuzzy) { //check on the number of tests
			var tests = getTests.call(inputmask, pos);
			return tests.length > (1 + (tests[tests.length - 1].match.def === "" ? 1 : 0));
		}
		//else based on the template
		var testTemplate = determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos));
		var testPlaceHolder = getPlaceholder.call(inputmask, pos, testTemplate.match);
		return testTemplate.match.def !== testPlaceHolder;

	}
	return false;
}

//tobe put on prototype?
function resetMaskSet(soft) {
	const maskset = this.maskset;

	maskset.buffer = undefined;
	if (soft !== true) {
		maskset.validPositions = {};
		maskset.p = 0;
	}
}

//tobe put on prototype?
function seekNext(pos, newBlock, fuzzy) {
	const inputmask = this;

	if (fuzzy === undefined) fuzzy = true;
	var position = pos + 1;
	while (getTest.call(inputmask, position).match.def !== "" &&
	((newBlock === true && (getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true))) ||
		(newBlock !== true && !isMask.call(inputmask, position, undefined, fuzzy)))) {
		position++;
	}
	return position;
}

//tobe put on prototype?
function seekPrevious(pos, newBlock) {
	const inputmask = this;

	var position = pos - 1;
	if (pos <= 0) return 0;

	while (position > 0 &&
	((newBlock === true && (getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true))) ||
		(newBlock !== true && !isMask.call(inputmask, position, undefined, true)))) {
		position--;
	}
	return position;
}

//tobe put on prototype?
function translatePosition(pos) {
	const inputmask = this,
		opts = this.opts,
		el = this.el;

	if (inputmask.isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
		pos = inputmask._valueGet().length - pos;
	}
	return pos;
}
