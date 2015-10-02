define([
	"inputmask.dependencyLib",
	"inputmask"
], function($, Inputmask) {
	$.caret = function(input, begin, end) {
		input = input.nodeName ? input : input[0];
		var range;
		if (typeof begin === "number") {
			end = (typeof end == "number") ? end : begin;
			// if (!$(input).is(":visible")) {
			// 	return;
			// }

			if (input.setSelectionRange) {
				input.selectionStart = begin;
				input.selectionEnd = end;
			} else if (window.getSelection) {
				range = document.createRange();
				if (input.firstChild === undefined) {
					var textNode = document.createTextNode("");
					input.appendChild(textNode);
				}
				range.setStart(input.firstChild, begin < input.value.length ? begin : input.value.length);
				range.setEnd(input.firstChild, end < input.value.length ? end : input.value.length);
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
		} else {
			if (input.setSelectionRange) {
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
				begin = 0 - range.duplicate().moveStart("character", -100000);
				end = begin + range.text.length;
			}
			/*eslint-disable consistent-return */
			return {
				"begin": begin,
				"end": end
			};
			/*eslint-enable consistent-return */
		}
	};
	$.fn = $.fn || $.prototype;
	$.fn.SendKey = function(keyCode, modifier) {
		var sendDummyKeydown = false;
		if (Object.prototype.toString.call(keyCode) == '[object String]') {
			keyCode = keyCode.charCodeAt(0);
			sendDummyKeydown = true;
		}

		switch (keyCode) {
			case Inputmask.keyCode.LEFT:
				{
					if (modifier == undefined) {
						var pos = $.caret(this);
						$.caret(this, pos.begin - 1);
						break;
					}
				}
			case Inputmask.keyCode.RIGHT:
				{
					if (modifier == undefined) {
						var pos = $.caret(this);
						$.caret(this, pos.begin + 1);
						break;
					}
				}
			default:
				{
					var keydown = $.Event("keydown"),
						keypress = $.Event("keypress"),
						keyup = $.Event("keyup");

					if (!sendDummyKeydown) {
						keydown.keyCode = keyCode;
						if (modifier == Inputmask.keyCode.CONTROL)
							keydown.ctrlKey = true;
					}
					$(this).trigger(keydown);
					if (!keydown.isDefaultPrevented()) {
						keypress.keyCode = keyCode;
						if (modifier == Inputmask.keyCode.CONTROL)
							keypress.ctrlKey = true;
						$(this).trigger(keypress);
						//if (!keypress.isDefaultPrevented()) {
						keyup.keyCode = keyCode;
						if (modifier == Inputmask.keyCode.CONTROL)
							keyup.ctrlKey = true;
						$(this).trigger(keyup);
						//}
					}
				}
		}
	}
	if (!('append' in $.fn)) {
		$.fn.append = function(child) {
			var input = this.nodeName ? this : this[0];
			input.insertAdjacentHTML('beforeend', child);
		};
	}
	if (!('remove' in $.fn)) {
		$.fn.remove = function() {
			var input = this.nodeName ? this : this[0];
			if (input !== undefined && input !== null) {
				input.parentElement.removeChild(input);
				input = undefined;
			}
		};
	}
	if (!('val' in $.fn)) {
		$.fn.val = function(value) {
			var input = this.nodeName ? this : this[0];
			if (value !== undefined) {
				if (input.inputmask) {
					input.inputmask._valueSet(value);
					$(input).trigger("setvalue");
				} else input.value = value;
			}

			return input.value;
		};
	}

	$.fn.Type = function(inputStr) {
		var input = this.nodeName ? this : this[0],
			$input = $(input);
		$.each(inputStr.split(''), function(ndx, lmnt) {
			$input.SendKey(lmnt);
		});
	}
	$.fn.paste = function(inputStr) {
		var input = this.nodeName ? this : this[0],
			$input = $(input),
			isRTL = input.inputmask.isRTL;
		window.clipboardData ? window.clipboardData.setData("Text", inputStr) : $input[0].inputmask._valueSet(isRTL ? inputStr.split('').reverse().join('') : inputStr);
		$input.trigger('paste');
	}
});
