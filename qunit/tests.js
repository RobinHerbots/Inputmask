module("Simple masking");

test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: false}", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99-99-99", { clearMaskOnLostFocus: false });

    equal(document.getElementById("testmask")._valueGet(), "__-__-__", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: true}", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99-99-99", { clearMaskOnLostFocus: true });

    equal(document.getElementById("testmask").value, "", "Result " + document.getElementById("testmask").value);

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").Type("123");
    equal($("#testmask").val(), "123.___.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\") + backspace", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").Type("123");
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    equal($("#testmask").val(), "12_.___.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("inputmask(\"999.999.999\", { oncomplete: ... })", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999", {
        oncomplete: function () {
            equal($("#testmask").val(), "123.456.789", "Result " + $("#testmask").val());
            start();
            $("#testmask").remove();
        }
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456789");
});

asyncTest("inputmask(\"9-AAA.999\") - change event", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-AAA.999").change(function () {
        ok(true, "Change triggered");
        start();
        $("#testmask").remove();
    });

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("1abc12");
        $("#testmask").blur();
    }, 0);
});

asyncTest("inputmask(\"9-AAA.999\", { onincomplete: ... })", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-AAA.999", {
        onincomplete: function () {
            equal($("#testmask").val(), "1-ABC.12_", "Result " + $("#testmask").val());
            start();
            $("#testmask").remove();
        }
    });

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("1abc12");
        $("#testmask").blur();
    }, 0);
});

test("inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").Type("123");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    $("#testmask").Type("4");
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").Type("56");

    equal($("#testmask").val(), "143.56_.___", "Result " + $("#testmask").val());

    //$("#testmask").remove();
});

test("inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

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

test("inputmask(\"999.999.999\") - delete selection start with nomask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789");
    caret($("#testmask"), 3, 7);
    $("#testmask").SendKey(keyCodes.DELETE);

    equal($("#testmask").val(), "123.789.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\") - backspace selection start with nomask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789");
    caret($("#testmask"), 3, 7);
    $("#testmask").SendKey(keyCodes.DELETE);

    equal($("#testmask").val(), "123.789.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\") - overtype selection start with nomask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789");
    caret($("#testmask"), 3, 7);
    $("#testmask").Type("1");

    equal($("#testmask").val(), "123.178.9__", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"*****\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("*****");

    $("#testmask")[0].focus();

    $("#testmask").Type("abe");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").Type("cd");

    equal($("#testmask").val(), "abcde", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"d/m/y\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("d/m/y");

    $("#testmask")[0].focus();

    $("#testmask").Type("23031973");
    caret($("#testmask"), 5);
    $("#testmask").SendKey(keyCodes.BACKSPACE);

    equal($("#testmask").val(), "23/0_/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"(999)999-9999\") - ruslanfedoseenko mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("(999)999-9999");

    $("#testmask")[0].focus();

    $("#testmask").val("9999999999");
    caret($("#testmask"), 4, 5);
    $("#testmask").Type("7");

    equal($("#testmask").val(), "(999)999-9999", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"(999)999-9999\") - insert false - ruslanfedoseenko mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("(999)999-9999", { insertMode: false });

    $("#testmask")[0].focus();

    $("#testmask").val("9999999999");
    caret($("#testmask"), 4, 5);
    $("#testmask").Type("7");

    equal($("#testmask").val(), "(999)999-9999", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"\") - empty mask - andywolk", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("");

    $("#testmask")[0].focus();
    $("#testmask").val("123");
    equal($("#testmask").val(), "123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Non-greedy masks");
test("inputmask(\"*\", { greedy: false, repeat: \"*\" }) - replace cd with 1", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("*", { greedy: false, repeat: "*" });

    $("#testmask")[0].focus();

    $("#testmask").Type("abcdef");
    caret($("#testmask"), 2, 4);
    $("#testmask").SendKey("1");
    equal($("#testmask").val(), "ab1ef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"*\", { greedy: false, repeat: \"*\" }) - type abcdef", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("*", { greedy: false, repeat: "*" });

    $("#testmask")[0].focus();

    $("#testmask").Type("abcdef");

    equal($("#testmask").val(), "abcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"A.\", { repeat: \"*\" }) - type abc - joostburg", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("A.", { repeat: "*" });

    $("#testmask")[0].focus();

    $("#testmask").Type("abc");

    equal($("#testmask").val(), "A.B.C.", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("greedy masks");
test("inputmask(\"*\", { greedy: true, repeat: 10, clearMaskOnLostFocus: false  })", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("*", { greedy: true, repeat: 10, clearMaskOnLostFocus: false });

    $("#testmask")[0].focus();
    equal($("#testmask")[0]._valueGet(), "__________", "Result " + $("#testmask")[0]._valueGet());

    $("#testmask").remove();
});
test("inputmask(\"*\", { greedy: true, repeat: 10 }) - type 12345678901234567890", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("*", { greedy: true, repeat: 10 });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345678901234567890");

    equal($("#testmask").val(), "1234567890", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"9,99\", { greedy: true, repeat: 5 }) - type 12345678901234567890", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9,99", { greedy: true, repeat: 5 });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345678901234567890");

    equal($("#testmask").val(), "1,234,567,890,123,45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"9\", repeat: 10, placeholder: \"\", numericInput: true }) - greedy true with empty placeholder - type 12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ "mask": "9", repeat: 10, placeholder: "", numericInput: true });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Initial value setting");

test("inputmask(\"999:99\", { placeholder: \"0\"}) value=\"007:20\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="007:20" />');
    $("#testmask").inputmask("999:99", { placeholder: "0" });

    equal($("#testmask").val(), "007:20", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"01 650 103 002 0001 DE101 5170\" - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="01 650 103 002 0001 DE101 5170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    equal($("#testmask").val(), "01 650 103 002 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    equal($("#testmask").val(), "01 650 103 002 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" replace 2 with 3 - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    caret($("#testmask"), 13, 14);
    $("#testmask").Type("3");
    equal($("#testmask").val(), "01 650 103 003 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" replace 002 with 003 - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    caret($("#testmask"), 11, 14);
    $("#testmask").Type("003");
    equal($("#testmask").val(), "01 650 103 003 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" replace 02 with 01 - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    caret($("#testmask"), 12, 14);
    $("#testmask").Type("01");
    equal($("#testmask").val(), "01 650 103 001 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\", { greedy: false }) ~ value=\"016501030020001DE1015170\" replace 02 with 01 - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999", { greedy: false });
    caret($("#testmask"), 12, 14);
    $("#testmask").Type("01");
    equal($("#testmask").val(), "01 650 103 001 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});


test("inputmask(\"\\D\\E***\") ~ value=\"DE001\" - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="DE001" />');
    $("#testmask").inputmask("\\D\\E***");
    equal($("#testmask").val(), "DE001", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"decimal\") ~ value=\"123.45\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="123.45" />');
    $("#testmask").inputmask("decimal");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"decimal\") ~ value=\"123.45\" - disabled input", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="123.45" disabled="disabled" />');
    $("#testmask").inputmask("decimal");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"mm/yyyy\") ~ value=\"031973\" - disabled input", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="031973" disabled="disabled" />');
    $("#testmask").inputmask("mm/yyyy");
    equal($("#testmask").val(), "03/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"6703 9999 9999 9999 9\") ~ value=\"6703 1234 5678 9012 3\" - FransVdb", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="6703 1234 5678 9012 3" />');
    $("#testmask").inputmask("6703 9999 9999 9999 9");
    equal($("#testmask").val(), "6703 1234 5678 9012 3", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"6703 9999 9999 9999 9\") ~ type \"6703 1234 5678 9012 3\" + backspace - FransVdb", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("6703 9999 9999 9999 9");
    $("#testmask")[0].focus();
    $("#testmask").Type("1234567890123");
    $("#testmask").SendKey(keyCodes.BACKSPACE);

    equal($("#testmask").val(), "6703 1234 5678 9012 _", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("inputmask(\"6703 9999 9999 9999 9\") ~ type \"6703670367036\" + backspace - FransVdb", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("6703 9999 9999 9999 9");
    $("#testmask")[0].focus();
    $("#testmask").click();
    setTimeout(function () {
        $("#testmask").Type("6703670367036");
        $("#testmask").SendKey(keyCodes.BACKSPACE);
        equal($("#testmask").val(), "6703 6703 6703 6703 _", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});


module("Paste value");
asyncTest("inputmask(\"+7 (999) 999-99-99\") ~ paste \"+7 (+79114041112___) ___-__-__\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+7 (999) 999-99-99");
    $("#testmask").paste("+7 (+79114041112___) ___-__-__");

    setTimeout(function () {
        equal($("#testmask").val(), "+7 (911) 404-11-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);

});

asyncTest("inputmask(\"+7 (999) 999-99-99\") ~ paste \"0079114041112\" - monoblaine", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+7 (999) 999-99-99", {
        onBeforePaste: function (pastedValue) {
            //just simplistic for the test ;-)
            var strippedValue = pastedValue.substr(2);
            return strippedValue;
        }
    });
    $("#testmask").paste("0079114041112");

    setTimeout(function () {
        equal($("#testmask").val(), "+7 (911) 404-11-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);

});

module("Set value with fn.val");
test("inputmask(\"decimal\") ~ value=\"123.45\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal");
    $("#testmask").val("123.45");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"9\") ~ value=\"1\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9");
    $("#testmask").val("1");
    equal($("#testmask").val(), "1", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"decimal\") ~ .val(\"123.45\") - disabled input", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" disabled="disabled" />');
    $("#testmask").inputmask("decimal");
    $("#testmask").val("123.45");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"mm/yyyy\") ~ .val(\"031973\") - disabled input", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" disabled="disabled" />');
    $("#testmask").inputmask("mm/yyyy");
    $("#testmask").val("031973");
    equal($("#testmask").val(), "03/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ \"mask\": \"(999) 999-9999\" }) ~ .val(\"8144419449\") - type=\"tel\" - bodrick", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="tel" id="testmask" disabled="disabled" />');
    $("#testmask").inputmask({ "mask": "(999) 999-9999" });
    $("#testmask").val("8144419449");
    equal($("#testmask").val(), "(814) 441-9449", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Optional");
test("inputmask(\"(99) 9999[9]-99999\") - input 121234-12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("(99) 9999[9]-99999");

    $("#testmask")[0].focus();
    $("#testmask").Type("121234-12345");

    equal($("#testmask").val(), "(12) 1234-12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"(99) 9999[9]-99999\") - input 121234512345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("(99) 9999[9]-99999");

    $("#testmask")[0].focus();
    $("#testmask").Type("121234512345");

    equal($("#testmask").val(), "(12) 12345-12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: true }) - input 123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    equal($("#testmask").val(), "123__-____", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    equal($("#testmask").val(), "123__", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345");
    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    equal($("#testmask").val(), "12345-6___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456789", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456789");
    equal($("#testmask").val(), "12345-6789", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"9[9][9] 999[9] 9999\") - input 123123 space 1234 - vipink70", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9[9][9] 999[9] 9999");

    $("#testmask")[0].focus();
    $("#testmask").Type("123123");
    $("#testmask").SendKey(keyCodes.SPACE);
    $("#testmask").Type("1234");
    equal($("#testmask").val(), "123 123 1234", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('[9-]AAA.999') ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('[9-]AAA.999');

    $("#testmask").Type("1abc123");
    caret($("#testmask"), 4, 5);
    $("#testmask").Type("d");
    equal($("#testmask").val(), "1-ABD.123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("multi masks");
asyncTest("inputmask({ mask: [\"99-99\", \"999-99\"]}) - input 12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99-99", "999-99"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345");
    setTimeout(function () {
        equal($("#testmask").val(), "123-45", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"999.999.999-99\", \"99.999.999/9999-99\"]}) - input 12312312312", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["999.999.999-99", "99.999.999/9999-99"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12312312312");
    setTimeout(function () {
        equal($("#testmask").val(), "123.123.123-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"999.999.999-99\", \"99.999.999/9999-99\"]}) - input 12.123123123412", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["999.999.999-99", "99.999.999/9999-99"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12.123123123412");
    setTimeout(function () {
        equal($("#testmask").val(), "12.123.123/1234-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345");
    setTimeout(function () {
        equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345-1234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345-1234");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 123451234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("123451234");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 1234512", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234512");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-12__", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 1234561234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234561234");
    setTimeout(function () {
        equal($("#testmask").val(), "123456-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 123456", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-6___", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 123456 (rtl)", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    setTimeout(function () {
        equal($("#testmask").val(), "____-654321", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] }) ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] });

    $("#testmask").Type("1abc");
    setTimeout(function () {
        equal($("#testmask").val(), "1 ABC-___", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] }) ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] });

    $("#testmask").Type("a123");
    setTimeout(function () {
        equal($("#testmask").val(), "A 123-___", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

module("Date.Extensions");
test("inputmask(\"dd/mm/yyyy\") - input 2331973", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

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
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mm/dd/yyyy");

    $("#testmask")[0].focus();

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
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

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
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

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
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mm/dd/yyyy");

    $("#testmask")[0].focus();

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
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mm/dd/yyyy");

    $("#testmask")[0].focus();

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
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();
    $("#testmask").SendKey(keyCodes.RIGHT, keyCodes.CONTROL);
    ok($("#testmask").val() != "dd/mm/yyyy", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"dd/mm/yyyy\") - input 2331973 BACKSPACE x4 2013", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

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

test("inputmask(\"dd/mm/yyyy\") - input 23373 ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

    $("#testmask").Type("23373");
    equal($("#testmask").val(), "23/03/2073", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"dd/mm/yyyy\", { yearrange: { minyear: 1900, maxyear: 2000 } }) - input 23373 ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy", { yearrange: { minyear: 1900, maxyear: 2000 } });

    $("#testmask")[0].focus();

    $("#testmask").Type("23373");
    equal($("#testmask").val(), "23/03/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"hh:mm\") - add remove add", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $('#testmask').inputmask('hh:mm', { clearIncomplete: true });
    $('#testmask').inputmask('remove');
    $('#testmask').inputmask('hh:mm', { clearIncomplete: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("abcdef");
    $("#testmask").Type("23:50");

    equal($("#testmask").val(), "23:50", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"mm/yyyy\") - input 31973", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mm/yyyy");

    $("#testmask")[0].focus();
    $("#testmask").Type("31973");
    equal($("#testmask").val(), "03/1973", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"mm/dd/yyyy\") - select some input 1 - Guamaso", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mm/dd/yyyy");

    $("#testmask")[0].focus();
    caret($("#testmask")[0], 0, 5);
    $("#testmask").Type("1");
    equal($("#testmask").val(), "1m/dd/yyyy", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"dd/mm/yyyy\") - input 2331973 - remove 23", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();
    $("#testmask").Type("23031973");
    caret($("#testmask"), 0, 2);
    $("#testmask").SendKey(keyCodes.DELETE);

    equal($("#testmask").val(), "dd/03/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"dd/mm/yyyy\") - input 01011000 - Skiv22", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy", { yearrange: { minyear: 1000, maxyear: 2099 } });

    $("#testmask")[0].focus();
    $("#testmask").Type("01011000");

    equal($("#testmask").val(), "01/01/1000", "Result " + $("#testmask").val());

    $("#testmask").remove();
});



module("Numeric.Extensions");
test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

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
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    $("#testmask")[0].focus();
    //$("#testmask").click();
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
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").Type("789");

    equal($("#testmask").val(), "12,345.789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    caret($("#testmask"), 6, 10);
    $("#testmask").Type(".789");

    equal($("#testmask").val(), "12,345.789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\" }\") - input 12345.123 + remove .123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: false, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.BACKSPACE);

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: false, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").Type("789");

    equal($("#testmask").val(), "12345.789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - maxlength 10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" maxlength="10" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789012345");

    equal($("#testmask").val(), "1234567890", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal, { repeat: 15 }\") - maxlength 10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" maxlength="10" />');
    $("#testmask").inputmask("decimal", { repeat: 15 });

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789012345");

    equal($("#testmask").val(), "1234567890", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal, { repeat: 5 }\") - maxlength 10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" maxlength="10" />');
    $("#testmask").inputmask("decimal", { repeat: 5 });

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789012345");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    $("#testmask").Type("1234567890");
    caret($("#testmask"), 0, 10);
    $("#testmask").Type("12345");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - value=\"1234567890\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="1234567890" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    caret($("#testmask"), 0, 10);
    $("#testmask").Type("12345");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    $("#testmask").Type("1234567890");
    caret($("#testmask"), 3, 5);
    $("#testmask").SendKey("0");

    equal($("#testmask").val(), "123067890", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - value=\"1234567890\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="1234567890" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    caret($("#testmask"), 3, 5);
    $("#testmask").SendKey("0");

    equal($("#testmask").val(), "123067890", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - value=\"123.1\" tab out", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { digits: 3 });

    $("#testmask")[0].focus();
    $("#testmask").Type("123.1");
    $("#testmask").SendKey(keyCodes.TAB);

    equal($("#testmask").val(), "123.100", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - value=\"123.45\" Replace last integer", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { digits: 2 });

    $("#testmask")[0].focus();
    $("#testmask").Type("123.45");
    caret($("#testmask"), 2, 3);
    $("#testmask").SendKey("7");

    equal($("#testmask").val(), "127.45", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\", { digits: 2 }) - value=\"123\" - RomeroMsk", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { digits: 2 });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    caret($("#testmask"), 0, 3);
    $("#testmask").SendKey(",,..");
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(keyCodes.RIGHT); //needed in test
    $("#testmask").SendKey(keyCodes.RIGHT); //needed in test
    $("#testmask").Type("45");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask - Multiple inputs masked, Integer mask doesn't allow typing - #402 - albatrocity", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("integer", {
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3
    });
    $("#testmask2").inputmask("(999)-999-9999");


    $("#testmask")[0].focus();
    $("#testmask").Type("12345");

    equal($("#testmask").val(), "12,345", "Result " + $("#testmask").val());
    $("#testmask").remove();
    $("#testmask2").remove();
});

test("decimal alias with groupseparator delete - YoussefTaghlabi", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3,
        digits: 2,
        autoGroup: true,
        allowPlus: false,
        allowMinus: true
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567");
    caret($("#testmask"), 0);
    $("#testmask").SendKey(keyCodes.DELETE);

    equal($("#testmask").val(), "234,567", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("decimal alias with groupseparator backspace - YoussefTaghlabi", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3,
        digits: 2,
        autoGroup: true,
        allowPlus: false,
        allowMinus: true
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567");
    caret($("#testmask"), 1);
    $("#testmask").SendKey(keyCodes.BACKSPACE);

    equal($("#testmask").val(), "234,567", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("decimal alias with plus or minus & autogroup - YoussefTaghlabi", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3,
        digits: 2,
        autoGroup: true,
        allowPlus: true,
        allowMinus: true
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("-123456");

    equal($("#testmask").val(), "-123,456", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("decimal alias with plus or minus & autogroup - YoussefTaghlabi", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3,
        digits: 2,
        autoGroup: true,
        allowPlus: true,
        allowMinus: true
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    caret($("#testmask"), 0);
    $("#testmask").SendKey("-");

    equal($("#testmask").val(), "-123,456", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

module("Direction RTL");
test("inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey(keyCodes.RIGHT);
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

test("inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey("4");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey("5");
    $("#testmask").SendKey("6");

    equal($("#testmask").val(), "___._65.341", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999-aaa-999\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999-aaa-999");

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc12");

    equal($("#testmask").val(), "_21-cba-321", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999-999-999\") - replace selection", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999-999-999");

    $("#testmask")[0].focus();
    $("#testmask").Type("123456789");
    caret($("#testmask"), 4, 7);
    $("#testmask").Type("5");

    equal($("#testmask").val(), "__9-875-321", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999-999-999\") - replace selection with backspace", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999-999-999");

    $("#testmask")[0].focus();
    $("#testmask").Type("123456789");
    caret($("#testmask"), 4, 7);
    $("#testmask").SendKey(keyCodes.BACKSPACE);
    $("#testmask").Type("5");

    equal($("#testmask").val(), "__9-875-321", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999-999-999\") - replace selection - with delete", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999-999-999");

    $("#testmask")[0].focus();
    $("#testmask").Type("123456789");
    caret($("#testmask"), 4, 7);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").Type("5");

    equal($("#testmask").val(), "__9-875-321", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Numeric Input");
test("inputmask({ mask: \"9\", numericInput: true, repeat: 10, greedy: true }); - 1234567890", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "9", numericInput: true, repeat: 10, greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567890");

    equal($("#testmask").val(), "1234567890", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask({ mask: \"9\", numericInput: true, repeat: 10, greedy: true }); - replace selection", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "9", numericInput: true, repeat: 10, greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567890");
    caret($("#testmask"), 3, 6);
    $("#testmask").Type("5");

    equal($("#testmask").val(), "__12357890", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99-99-99\", numericInput: true }); - 1234567890", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99-99-99", numericInput: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567890");

    equal($("#testmask").val(), "12-34-56", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"€ 999.999.999,99\", numericInput: true }); - 123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('€ 999.999.999,99', { numericInput: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");

    equal($("#testmask").val(), "€ ___.___.__1,23", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"€ 999.999.999,99\", numericInput: true }); - 123 position before 456", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('€ 999.999.999,99', { numericInput: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    caret($("#testmask"), 12);
    $("#testmask").Type("456");
    equal($("#testmask").val(), "€ ___.__4.561,23", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("inputmask({ mask: \"€ 999.999.999,99\", { numericInput: true, radixPoint: \",\" }); - 123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('€ 999.999.999,99', { numericInput: true, radixPoint: "," });

    $("#testmask")[0].focus();
    $("#testmask").click();
    setTimeout(function () {
        $("#testmask").Type("123");

        equal($("#testmask").val(), "€ ___.___.123,__", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"€ 999.999.999,99\", { numericInput: true, radixPoint: \",\" }); - 123,45", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('€ 999.999.999,99', { numericInput: true, radixPoint: "," });

    $("#testmask")[0].focus();
    $("#testmask").click();
    setTimeout(function () {
        $("#testmask").Type("123,45");

        equal($("#testmask").val(), "€ ___.___.123,45", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

test("inputmask({ mask: \"9999 t\", { numericInput: true }); - 123 - Joe Rosa", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('9999 t', { numericInput: true });

    $("#testmask").focus();
    $("#testmask").click();
    $("#testmask").Type("123");
    equal($("#testmask").val(), "_123 t", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"9999 t\", { numericInput: true, autoUnmask: true }); - 70  - Joe Rosa", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('9999 t', { numericInput: true, autoUnmask: true });

    $("#testmask").focus();
    $("#testmask").click();
    $("#testmask").Type("70");
    equal($("#testmask").val(), "70", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("inputmask({ mask: \"['$9.99', '$99.99', '$999.99', '$9,999.99', '$99,999.99', '$999,999.99', '$9,999,999.99', '$99,999,999.99', '$999,999,999.99'], 'placeholder': ' ', 'numericInput': true, 'rightAlignNumerics': false\" value=\"$100000.00\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append("<input type=\"text\" id=\"testmask\" data-inputmask=\"'mask': ['$9.99', '$99.99', '$999.99', '$9,999.99', '$99,999.99', '$999,999.99', '$9,999,999.99', '$99,999,999.99', '$999,999,999.99'], 'placeholder': ' ', 'numericInput': true, 'rightAlignNumerics': false\" value=\"$100000.00\"/>");
    $("#testmask").inputmask();
    setTimeout(function () {
        equal($("#testmask").val(), "$100,000.00", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

module("Regex masks")

test("inputmask(\"Regex\", { regex: \"[0-9]*\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[0-9]*" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc45");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("inputmask(\"Regex\", { regex: \"[0-9]*\"}); ~ isComplete", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", {
        regex: "[0-9]*", oncomplete: function () {
            equal($("#testmask").val(), "1", "Result " + $("#testmask").val());
            start();
            $("#testmask").remove();
        }
    });

    $("#testmask")[0].focus();
    $("#testmask").SendKey("1");
});

test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[A-Za-z\u0410-\u044F\u0401\u04510-9]*" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc45");

    equal($("#testmask").val(), "123abc45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc45");

    equal($("#testmask").val(), "abc45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});


test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc45");

    equal($("#testmask").val(), "abc45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[-]?(([1-8][0-9])|[1-9]0?)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("90");

    equal($("#testmask").val(), "90", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[-]?(([1-8][0-9])|[1-9]0?)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("0");

    equal($("#testmask").val(), "", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[-]?(([1-8][0-9])|[1-9]0?)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("-78");

    equal($("#testmask").val(), "-78", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\" - simple regex email", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("some.body@mail.com");

    equal($("#testmask").val(), "some.body@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\" - complexer regex email", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("denise.van.de.cruys@mail.com");

    equal($("#testmask").val(), "denise.van.de.cruys@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 1-123-4562", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" });

    $("#testmask")[0].focus();
    $("#testmask").Type("1-123-4562");

    equal($("#testmask").val(), "1-123-4562", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 20-222-2222", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" });

    $("#testmask")[0].focus();
    $("#testmask").Type("20-222-2222");

    equal($("#testmask").val(), "20-222-2222", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 22-222-234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" });

    $("#testmask")[0].focus();
    $("#testmask").Type("22-222-234");

    equal($("#testmask").val(), "22-222-234", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 70-12-34", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" });

    $("#testmask")[0].focus();
    $("#testmask").Type("70-12-34");

    equal($("#testmask").val(), "70-123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" - arame regex 12", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("12");

    equal($("#testmask").val(), "12", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" } - arame regex 12.5", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("12.5");

    equal($("#testmask").val(), "12.5", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" } - arame regex 12.75", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("12.75");

    equal($("#testmask").val(), "12.75", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex abcdef", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('Regex', { regex: "(abc)+(def)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("abcdef");

    equal($("#testmask").val(), "abcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex 123a4b5c6d7e8f", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('Regex', { regex: "(abc)+(def)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123a4b5c6d7e8f");

    equal($("#testmask").val(), "abcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex abcabcdef", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('Regex', { regex: "(abc)+(def)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("abcabcdef");

    equal($("#testmask").val(), "abcabcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc){2,4}(def)\" }); - Flyarbonkers regex abdefcafebcaefbfcabcdef", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('Regex', { regex: "(abc){2,4}(def)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("abdefcafebcaefbfcabcdef");

    equal($("#testmask").val(), "abcabcabcabcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Phone masks")

asyncTest("inputmask(\"phone be\") - type \"473890428\"", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("phonebe", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/js/phone-codes/phone-be.json" });

	$("#testmask").Type("473890428");
	
    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)89-04-28", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone be\") - value \"32473890428\"", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="32473890428" />');
    $("#testmask").inputmask("phonebe", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/js/phone-codes/phone-be.json" });

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)89-04-28", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - value=\"+32(473)890-428\"", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="+32(473)890-428" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/js/phone-codes/phone-codes.json" });

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)890-428", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - value=\"32473890428\"", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="32473890428" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/js/phone-codes/phone-codes.json" });

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)890-428", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - Brazil new", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="5512123451234" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/js/phone-codes/phone-codes.json" });

    setTimeout(function () {
        equal($("#testmask").val(), "+55-12-12345-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - Brazil old", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="55121234-1234" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/js/phone-codes/phone-codes.json" });

    setTimeout(function () {
        equal($("#testmask").val(), "+55-12-1234-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - Brazil switch", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="55121234-1234" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/js/phone-codes/phone-codes.json" });

 
        $("#testmask")[0].focus();
        caret($("#testmask"), $("#testmask")[0].value.length); //for FF
        $("#testmask").SendKey(keyCodes.BACKSPACE);
        $("#testmask").SendKey(keyCodes.BACKSPACE);
        $("#testmask").SendKey(keyCodes.BACKSPACE);
        $("#testmask").SendKey(keyCodes.BACKSPACE);
        $("#testmask").SendKey(keyCodes.BACKSPACE);
		$("#testmask").Type("451234");
		setTimeout(function () {
			equal($("#testmask").val(), "+55-12-12345-1234", "Result " + $("#testmask").val());
			start();
			$("#testmask").remove();
    }, 0);
});

module("IP - masks")
test("inputmask(\"ip\" - 10.10.10.10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("ip")

    $("#testmask")[0].focus();
    $("#testmask").Type("10.10.10.10");
    $("#testmask2")[0].focus();
    equal($("#testmask").val(), "10.10.10.10", "Result " + $("#testmask").val());

    $("#testmask").remove();
    $("#testmask2").remove();
});

test("inputmask(\"ip\" - 1.1.1.1", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("ip")

    $("#testmask")[0].focus();
    $("#testmask").Type("1.1.1.1");
    $("#testmask2")[0].focus();
    equal($("#testmask").val(), "1.1.1.1", "Result " + $("#testmask").val());

    $("#testmask").remove();
    $("#testmask2").remove();
});

test("inputmask(\"ip\" - 255.255.255.255", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("ip")

    $("#testmask")[0].focus();
    $("#testmask").Type("255.255.255.255");
    $("#testmask2")[0].focus();
    equal($("#testmask").val(), "255.255.255.255", "Result " + $("#testmask").val());

    $("#testmask").remove();
    $("#testmask2").remove();
});

test("inputmask(\"ip\" - 192.168.1.100", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("ip")

    $("#testmask")[0].focus();
    $("#testmask").Type("192.168.1.100");
    $("#testmask2")[0].focus();
    equal($("#testmask").val(), "192.168.1.100", "Result " + $("#testmask").val());

    $("#testmask").remove();
    $("#testmask2").remove();
});

module("Value formatting");
test("$.inputmask.format(\"2331973\", { alias: \"date\"})", function () {
    var formattedValue = $.inputmask.format("2331973", { alias: "date" });
    equal(formattedValue, "23/03/1973", "Result " + formattedValue);
});

test("$.inputmask.format(\"016501030020001DE1015170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function () {
    var formattedValue = $.inputmask.format("016501030020001DE1015170", { mask: "99 999 999 999 9999 \\D\\E*** 9999" });
    equal(formattedValue, "01 650 103 002 0001 DE101 5170", "Result " + formattedValue);
});

test("$.inputmask.format(\"12\", {  mask: \"$ 999999\", numericInput: true, placeholder: \"0\" }); - gigermocas", function () {
    var formattedValue = $.inputmask.format("12", { mask: "$ 999999", numericInput: true, placeholder: "0" });
    equal(formattedValue, "$ 000012", "Result " + formattedValue);
});

module("Value Validating");
test("$.inputmask.isValid(\"23/03/1973\", { alias: \"date\"})", function () {
    var formattedValue = $.inputmask.isValid("23/03/1973", { alias: "date" });
    equal(formattedValue, true, "Result " + formattedValue);
});

test("$.inputmask.isValid(\"01 650 103 002 0001 DE101 5170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function () {
    var formattedValue = $.inputmask.isValid("01 650 103 002 0001 DE101 5170", { mask: "99 999 999 999 9999 \\D\\E*** 9999" });
    equal(formattedValue, true, "Result " + formattedValue);
});

module("Dynamic Masks");
test("inputmask(\"9-a{3}9{3}\" - simple dynamic mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-a{3}9{3}");

    $("#testmask")[0].focus();
    $("#testmask").Type("1abc123");

    equal($("#testmask").val(), "1-abc123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"9-a{1,3}9{1,3}\" - simple dynamic mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-a{1,3}9{1,3}");

    $("#testmask")[0].focus();
    $("#testmask").Type("1a1");

    equal($("#testmask").val(), "1-a1__", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"9-a{1,3}9{1,3}\" - simple dynamic mask - greedy false", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-a{1,3}9{1,3}", { greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("1a1");

    equal($("#testmask").val(), "1-a1", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"9-a{1,3}/9{2,3}\" - simple dynamic mask - greedy true", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-a{1,3}/9{2,3}", { greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("1a/123");

    equal($("#testmask").val(), "1-a/123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("email mask greedy false", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email", { greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("some.body@mail.com");

    equal($("#testmask").val(), "some.body@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("email mask greedy true", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email", { greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("some.body@mail.com");

    equal($("#testmask").val(), "some.body@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
