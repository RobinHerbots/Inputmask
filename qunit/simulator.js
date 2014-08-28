(function ($) {
    $.keyCodes = {
        ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
    }
    $.caret = function (input, begin, end) {
        var npt = input.jquery && input.length > 0 ? input[0] : input, range;
        if (typeof begin == 'number') {
            if (!$(input).is(':visible')) {
                return;
            }
            end = (typeof end == 'number') ? end : begin;
            if (npt.setSelectionRange) {
                npt.selectionStart = begin;
                npt.selectionEnd = end;

            } else if (npt.createTextRange) {
                range = npt.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        } else {
            if (!$(input).is(':visible')) {
                return { "begin": 0, "end": 0 };
            }
            if (npt.setSelectionRange) {
                begin = npt.selectionStart;
                end = npt.selectionEnd;
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { "begin": begin, "end": end };
        }
    };
    $.fn.SendKey = function (keyCode, modifier) {
        var sendDummyKeydown = false;
        if (Object.prototype.toString.call(keyCode) == '[object String]') {
            keyCode = keyCode.charCodeAt(0);
            sendDummyKeydown = true;
        }

        switch (keyCode) {
            case $.keyCodes.LEFT: {
                if (modifier == undefined) {
                    var pos = $.caret(this);
                    $.caret(this, pos.begin - 1);
                    break;
                }
            }
            case $.keyCodes.RIGHT: {
                if (modifier == undefined) {
                    var pos = $.caret(this);
                    $.caret(this, pos.begin + 1);
                    break;
                }
            }
            default: {
                var keydown = $.Event("keydown"),
                    keypress = $.Event("keypress"),
                    keyup = $.Event("keyup");

                if (!sendDummyKeydown) {
                    keydown.keyCode = keyCode;
                    if (modifier == $.keyCodes.CONTROL)
                        keydown.ctrlKey = true;
                }
                $(this).trigger(keydown);
                if (!keydown.isDefaultPrevented()) {
                    keypress.keyCode = keyCode;
                    if (modifier == $.keyCodes.CONTROL)
                        keypress.ctrlKey = true;
                    $(this).trigger(keypress);
                    if (!keypress.isDefaultPrevented()) {
                        keyup.keyCode = keyCode;
                        if (modifier == $.keyCodes.CONTROL)
                            keyup.ctrlKey = true;
                        $(this).trigger(keyup);
                    }
                }
            }
        }
    }
    $.fn.Type = function (inputStr) {
        var $input = $(this);
        $.each(inputStr.split(''), function (ndx, lmnt) {
            $input.SendKey(lmnt);
        });
    }
    $.fn.paste = function (inputStr) {
        var $input = $(this);
        window.clipboardData ? window.clipboardData.setData("Text", inputStr) : $input[0]._valueSet(inputStr);
        $input.trigger('paste');
    }
})(jQuery);
