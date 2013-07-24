var keyCodes = {
    ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
    NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
}

$.fn.SendKey = function (keyCode, modifier) {
    var sendDummyKeydown = false;
    if (Object.prototype.toString.call(keyCode) == '[object String]') {
        keyCode = keyCode.charCodeAt(0);
        sendDummyKeydown = true;
    }

    function caret(input, begin, end) {
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

    switch (keyCode) {
        case keyCodes.LEFT: {
            if (modifier == undefined) {
                var pos = caret(this);
                caret(this, pos.begin - 1);
                break;
            }
        }
        case keyCodes.RIGHT: {
            if (modifier == undefined) {
                var pos = caret(this);
                caret(this, pos.begin + 1);
                break;
            }
        }
        default: {
            var keydown = $.Event("keydown"),
                keypress = $.Event("keypress"),
                keyup = $.Event("keyup");

            if (!sendDummyKeydown) {
                keydown.keyCode = keyCode;
                if (modifier == keyCodes.CONTROL)
                    keydown.ctrlKey = true;
            }
            $(this).trigger(keydown);
            if (!keydown.isDefaultPrevented()) {
                keypress.keyCode = keyCode;
                if (modifier == keyCodes.CONTROL)
                    keypress.ctrlKey = true;
                $(this).trigger(keypress);
                if (!keypress.isDefaultPrevented()) {
                    keyup.keyCode = keyCode;
                    if (modifier == keyCodes.CONTROL)
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

module("Simple masking");

test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: false}", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99-99-99", { clearMaskOnLostFocus: false });

    equal(document.getElementById("testmask").value, "__-__-__", "Result " + document.getElementById("testmask").value);

    $("#testmask").remove();
});

test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: true}", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99-99-99", { clearMaskOnLostFocus: true });

    equal(document.getElementById("testmask").value, "", "Result " + document.getElementById("testmask").value);

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\")", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey(49);
    $("#testmask").SendKey(50);
    $("#testmask").SendKey(51);

    equal($("#testmask").val(), "123.___.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("inputmask(\"999.999.999\", { oncomplete: ... })", 1, function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999", {
        oncomplete: function () {
            equal($("#testmask").val(), "123.456.789", "Result " + $("#testmask").val());
            start();
            $("#testmask").remove();
        }
    });

    $("#testmask")[0].focus();
    $("#testmask").SendKey(49);
    $("#testmask").SendKey(50);
    $("#testmask").SendKey(51);
    $("#testmask").SendKey(52);
    $("#testmask").SendKey(53);
    $("#testmask").SendKey(54);
    $("#testmask").SendKey(55);
    $("#testmask").SendKey(56);
    $("#testmask").SendKey(57);
});

asyncTest("inputmask(\"9-AAA.999\") - change event", 1, function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-AAA.999").change(function () {
        ok(true, "Change triggered");
        setTimeout(function () {
            $("#testmask").remove();
            start();
        });
    });

    $("#testmask")[0].focus();
    $("#testmask").SendKey(49);
    $("#testmask").SendKey(65);
    $("#testmask").SendKey(66);
    $("#testmask").SendKey(67);
    $("#testmask").SendKey(50);
    $("#testmask").SendKey(51);

    $("#testmask").blur();
});

asyncTest("inputmask(\"9-AAA.999\", { onincomplete: ... })", 1, function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-AAA.999", {
        onincomplete: function () {
            equal($("#testmask").val(), "1-ABC.12_", "Result " + $("#testmask").val());
            start();
            $("#testmask").remove();
        }
    });

    $("#testmask")[0].focus();
    $("#testmask").SendKey(49);
    $("#testmask").SendKey(65);
    $("#testmask").SendKey(66);
    $("#testmask").SendKey(67);
    $("#testmask").SendKey(49);
    $("#testmask").SendKey(50);

    $("#testmask").blur();
});

test("inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey(49);
    $("#testmask").SendKey(50);
    $("#testmask").SendKey(51);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    $("#testmask").SendKey(52);
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(53);
    $("#testmask").SendKey(54);

    equal($("#testmask").val(), "143.56_.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey(49);
    $("#testmask").SendKey(50);
    $("#testmask").SendKey(51);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(52);
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(53);
    $("#testmask").SendKey(54);

    equal($("#testmask").val(), "143.56_.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("RTL inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function () {
    $('body').append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    $("#testmask").SendKey("4");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey("5");
    $("#testmask").SendKey("6");

    equal($("#testmask").val(), "___._65.341", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("RTL inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function () {
    $('body').append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey("4");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey("5");
    $("#testmask").SendKey("6");

    equal($("#testmask").val(), "___._65.341", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"*****\")", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("*****");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").Type("abe");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").Type("cd");

    equal($("#testmask").val(), "abcde", "Result " + $("#testmask").val());

    $("#testmask").remove();
});


module("Initial value setting");

test("inputmask(\"999:99\", { placeholder: \"0\"}) value=\"007:20\"", function () {
    $('body').append('<input type="text" id="testmask" value="007:20" />');
    $("#testmask").inputmask("999:99", { placeholder: "0" });

    equal($("#testmask").val(), "007:20", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"01 650 103 002 0001 DE101 5170\"", function () {
    $('body').append('<input type="text" id="testmask" value="01 650 103 002 0001 DE101 5170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    equal($("#testmask").val(), "01 650 103 002 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\"", function () {
    $('body').append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    equal($("#testmask").val(), "01 650 103 002 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"\\D\\E***\") ~ value=\"DE001\"", function () {
    $('body').append('<input type="text" id="testmask" value="DE001" />');
    $("#testmask").inputmask("\\D\\E***");
    equal($("#testmask").val(), "DE001", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"decimal\") ~ value=\"123.45\"", function () {
    $('body').append('<input type="text" id="testmask" value="123.45" />');
    $("#testmask").inputmask("decimal");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Set value with fn.val");
test("inputmask(\"decimal\") ~ value=\"123.45\"", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal");
    $("#testmask").val("123.45");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"+7 (999) 999-99-99\") ~ value=\"+7 (+79114041112___) ___-__-__\"", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+7 (999) 999-99-99");
    $("#testmask").val("+7 (+79114041112___) ___-__-__");
    equal($("#testmask").val(), "+7 (911) 404-11-12", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Optional & multi masks");
test("inputmask(\"(99) 9999[9]-99999\") - input 121234-12345", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("(99) 9999[9]-99999");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("4");
    $("#testmask").SendKey("-");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("4");
    $("#testmask").SendKey("5");

    equal($("#testmask").val(), "(12) 1234-12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"(99) 9999[9]-99999\") - input 121234512345", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("(99) 9999[9]-99999");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("4");
    $("#testmask").SendKey("5");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("4");
    $("#testmask").SendKey("5");

    equal($("#testmask").val(), "(12) 12345-12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask({ mask: [\"999.999.999-99\", \"99.999.999/9999-99\"]}) - input 12312312312", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["999.999.999-99", "99.999.999/9999-99"] });

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");

    equal($("#testmask").val(), "123.123.123-12", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask({ mask: [\"999.999.999-99\", \"99.999.999/9999-99\"]}) - input 12.123123123412", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["999.999.999-99", "99.999.999/9999-99"] });

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey(".");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("4");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");

    equal($("#testmask").val(), "12.123.123/1234-12", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345");
    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345-1234", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345-1234");
    equal($("#testmask").val(), "12345-1234", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 123451234", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("123451234");
    equal($("#testmask").val(), "12345-1234", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 1234512", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234512");
    equal($("#testmask").val(), "12345-12__", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 1234561234", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999" ] });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234561234");
    equal($("#testmask").val(), "123456-1234", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 123456", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    equal($("#testmask").val(), "12345-6___", "Result " + $("#testmask").val());
    //this is correct as the sequence of the masks || currently "99999-9999", "999999-9999" are valid and thus showing "99999-9999"

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: true }) - input 123", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    equal($("#testmask").val(), "123__-____", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    equal($("#testmask").val(), "123__", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 12345", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345");
    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    equal($("#testmask").val(), "12345-6___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456789", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456789");
    equal($("#testmask").val(), "12345-6789", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Date.Extensions");
test("inputmask(\"dd/mm/yyyy\") - input 2331973", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("9");
    $("#testmask").SendKey("7");
    $("#testmask").SendKey("3");

    equal($("#testmask").val(), "23/03/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"mm/dd/yyyy\") - input 3231973", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mm/dd/yyyy");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("3");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("9");
    $("#testmask").SendKey("7");
    $("#testmask").SendKey("3");

    equal($("#testmask").val(), "03/23/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"dd/mm/yyyy\") - input 29022012", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("2");
    $("#testmask").SendKey("9");
    $("#testmask").SendKey("0");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("0");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");

    equal($("#testmask").val(), "29/02/2012", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"dd/mm/yyyy\") - input 29022013", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("2");
    $("#testmask").SendKey("9");
    $("#testmask").SendKey("0");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("0");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("3");

    equal($("#testmask").val(), "29/02/201y", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"mm/dd/yyyy\") - input 02292012", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mm/dd/yyyy");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("0");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("9");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("0");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");

    equal($("#testmask").val(), "02/29/2012", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"mm/dd/yyyy\") - input 02292013", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mm/dd/yyyy");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("0");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("9");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("0");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("3");

    equal($("#testmask").val(), "02/29/201y", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"dd/mm/yyyy\") - input CTRL RIGHT", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey(keyCodes.RIGHT, keyCodes.CONTROL);

    ok($("#testmask").val() != "dd/mm/yyyy", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"dd/mm/yyyy\") - input 2331973 BACKSPACE x4 2013", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("9");
    $("#testmask").SendKey("7");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("0");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("3");

    equal($("#testmask").val(), "23/03/2013", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Numeric.Extensions");
test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("4");
    $("#testmask").SendKey("5");
    $("#testmask").SendKey(".");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");

    equal($("#testmask").val(), "12,345.123", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123 + remove .123", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    var event;

    $("#testmask").Type("12345.123");
    $("#testmask")[0].focus();
    //$("#testmask").click();
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.BACKSPACE);

    equal($("#testmask").val(), "12,345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    var event;

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").Type(".789");

    equal($("#testmask").val(), "12,345.789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\" }\") - input 12345.123 + remove .123", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: false, groupSeparator: "," });

    $("#testmask")[0].focus();

    var event;

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.BACKSPACE);

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: false, groupSeparator: "," });

    $("#testmask")[0].focus();

    var event;

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").Type(".789");

    equal($("#testmask").val(), "12345.789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
