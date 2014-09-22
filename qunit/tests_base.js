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
    $("#testmask").blur();
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
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
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
    $("#testmask").SendKey($.inputmask.keyCode.LEFT);
    $("#testmask").SendKey($.inputmask.keyCode.LEFT);
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
    $("#testmask").Type("4");
    $("#testmask").SendKey($.inputmask.keyCode.RIGHT);
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
    $("#testmask").SendKey($.inputmask.keyCode.LEFT);
    $("#testmask").SendKey($.inputmask.keyCode.LEFT);
    $("#testmask").SendKey($.inputmask.keyCode.LEFT);
    $("#testmask").SendKey($.inputmask.keyCode.DELETE);
    $("#testmask").SendKey(52);
    $("#testmask").SendKey($.inputmask.keyCode.RIGHT);
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
    $.caret($("#testmask"), 3, 7);
    $("#testmask").SendKey($.inputmask.keyCode.DELETE);

    equal($("#testmask").val(), "123.789.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\") - backspace selection start with nomask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789");
    $.caret($("#testmask"), 3, 7);
    $("#testmask").SendKey($.inputmask.keyCode.DELETE);

    equal($("#testmask").val(), "123.789.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\") - overtype selection start with nomask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789");
    $.caret($("#testmask"), 3, 7);
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
    $("#testmask").SendKey($.inputmask.keyCode.LEFT);
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
    $.caret($("#testmask"), 5);
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);

    equal($("#testmask").val(), "23/0_/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"(999)999-9999\") - ruslanfedoseenko mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("(999)999-9999");

    $("#testmask")[0].focus();

    $("#testmask").val("9999999999");
    $.caret($("#testmask"), 4, 5);
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
    $.caret($("#testmask"), 4, 5);
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

test("Intergroup selection - dhilt", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();
    $("#testmask").Type("23314");

    $.caret($("#testmask"), 4, 7);
    $("#testmask").SendKey("6");
    equal($("#testmask").val(), "23/06/y014", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("Delete selection with non-masks", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("(999)999-9999");

    $("#testmask")[0].focus();
    $("#testmask").Type("9999999999");

    $.caret($("#testmask"), 8, 11);
    $("#testmask").SendKey($.inputmask.keyCode.DELETE);
    equal($("#testmask").val(), "(999)999-99__", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Non-greedy masks");
test("inputmask(\"*\", { greedy: false, repeat: \"*\" }) - replace cd with 1", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("*", { greedy: false, repeat: "*" });

    $("#testmask")[0].focus();

    $("#testmask").Type("abcdef");
    $.caret($("#testmask"), 2, 4);
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

test("{ mask: \"A\", placeholder: \"\", repeat: 16 }) - type testtest - glosswordteam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "A", placeholder: "", repeat: 16 });

    $("#testmask")[0].focus();

    $("#testmask").Type("testtest");

    equal($("#testmask").val(), "TESTTEST", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("{ mask: \"A\", repeat: 16, greedy: false }) - type testtest - glosswordteam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "A", repeat: 16, greedy: false });

    $("#testmask")[0].focus();

    $("#testmask").Type("testtest");

    equal($("#testmask").val(), "TESTTEST", "Result " + $("#testmask").val());

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
    $.caret($("#testmask"), 13, 14);
    $("#testmask").Type("3");
    equal($("#testmask").val(), "01 650 103 003 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" replace 002 with 003 - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    $.caret($("#testmask"), 11, 14);
    $("#testmask").Type("003");
    equal($("#testmask").val(), "01 650 103 003 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" replace 02 with 01 - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    $.caret($("#testmask"), 12, 14);
    $("#testmask").Type("01");
    equal($("#testmask").val(), "01 650 103 001 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\", { greedy: false }) ~ value=\"016501030020001DE1015170\" replace 02 with 01 - wuSam", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999", { greedy: false });
    $.caret($("#testmask"), 12, 14);
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
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);

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
        $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
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
    $("#testmask")[0].focus();
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
    $("#testmask")[0].focus();
    $("#testmask").paste("0079114041112");

    setTimeout(function () {
        equal($("#testmask").val(), "+7 (911) 404-11-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);

});

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"+32(123)12-12-12\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("+32(123)12-12-12");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(123)12-12-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"32(123)12-12-12\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("32(123)12-12-12");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(123)12-12-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"(123)12-12-12\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("(123)12-12-12");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(123)12-12-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"32473890428\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("32473890428");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)89-04-28", "Result " + $("#testmask").val());
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
    $fixture.append('<input type="text" id="testmask" disabled="disabled" />');
    $("#testmask").inputmask({ "mask": "(999) 999-9999" });
    $("#testmask").val("8144419449");
    equal($("#testmask").val(), "(814) 441-9449", "Result " + $("#testmask").val());

    $("#testmask").remove();
});