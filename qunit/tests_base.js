module("Simple masking");

test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: false}", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99-99-99", { clearMaskOnLostFocus: false });

    equal(document.getElementById("testmask")._valueGet(), "__-__-__", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

asyncTest("inputmask(\"99-99-99\", { clearMaskOnLostFocus: true}", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99-99-99", { clearMaskOnLostFocus: true });
    $("#testmask").blur();
    setTimeout(function () {
        start();
        equal(document.getElementById("testmask").value, "", "Result " + document.getElementById("testmask").value);

        $("#testmask").remove();
    }, 0);
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

test("Selection and backspace also deletes previous - kenaku", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999 99 99 999");

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567890");

    $.caret($("#testmask"), 2, 3);
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
    equal($("#testmask").val(), "124 56 78 90_", "Result " + $("#testmask").val());

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

asyncTest("creditcard switch - pchelailya", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9999 9999 9999 9999");
    $("#testmask").on("keyup", function (event) {
        var value = $(this).inputmask("unmaskedvalue");

        if (value.length === 2 && value === "37") {
            $("input").inputmask("9999 999999 99999");
        }
    });
    $("#testmask")[0].focus();
    $("#testmask").Type("37");
    setTimeout(function() {
        $("#testmask").Type("12");
        start();
        equal($("#testmask").val(), "3712 ______ _____", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

test("maskscache - same mask diff definitions - StonesEditeurs", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({
        mask: "Z{1,*}",
        definitions: {
            'Z': {
                validator: function (chrs, buffer, pos, strict, opts) {
                    return { pos: pos, c: 'A' };
                },
            }
        }
    });

    $("#testmask").inputmask({
        mask: "Z{1,*}", // <= Same mask
        definitions: {
            'Z': {
                validator: function (chrs, buffer, pos, strict, opts) {
                    return { pos: pos, c: 'B' };  // <= another definition
                },
            }
        }
    });

    $("#testmask").Type("abcdef");
    equal(document.getElementById("testmask")._valueGet(), "BBBBBB", "Result " + document.getElementById("testmask")._valueGet());
    $("#testmask").remove();
});