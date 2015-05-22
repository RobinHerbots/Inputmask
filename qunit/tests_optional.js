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
    $("#testmask").SendKey(inputmask.keyCode.SPACE);
    $("#testmask").Type("1234");
    equal($("#testmask").val(), "123 123 1234", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('[9-]AAA.999') ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('[9-]AAA.999');

    $("#testmask").Type("1abc123");
    $.caret($("#testmask"), 4, 5);
    $("#testmask").Type("d");
    equal($("#testmask").val(), "1-ABD.123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('9[9]:99') ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('9[9]:99');

    $("#testmask").Type("3:44");
    $.caret($("#testmask"), 1);
    $("#testmask").Type("3");
    equal($("#testmask").val(), "33:44", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99999[-9999]", greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    $("#testmask").blur();
    $("#testmask").trigger("mouseenter");
    equal($("#testmask").val(), "12345-6___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"9'9{1,2}\"\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "9'9{1,2}\"", greedy: false, skipOptionalPartCharacter: "", "clearIncomplete": true });

    $("#testmask")[0].focus();
    $("#testmask").Type("12");
    $("#testmask").blur();
    equal($("#testmask").val(), "1'2\"", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99{1,2}lb\\s\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99{1,2}lb\\s", greedy: false, skipOptionalPartCharacter: "", "clearIncomplete": true });

    $("#testmask")[0].focus();
    $("#testmask").Type("12");
    $("#testmask").blur();
    equal($("#testmask").val(), "12lbs", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"9'9[9]\"\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "9'9[9]\"", greedy: false, skipOptionalPartCharacter: "", "clearIncomplete": true });

    $("#testmask")[0].focus();
    $("#testmask").Type("12");
    $("#testmask").blur();
    equal($("#testmask").val(), "1'2\"", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ mask: \"99[9]lb\\s\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99[9]lb\\s", greedy: false, skipOptionalPartCharacter: "", "clearIncomplete": true });

    $("#testmask")[0].focus();
    $("#testmask").Type("12");
    $("#testmask").blur();
    equal($("#testmask").val(), "12lbs", "Result " + $("#testmask").val());

    $("#testmask").remove();
});


test(".inputmask(\"99999[-9999]\", { greedy: false }); - type 123456 backspace iscomplete?", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99999[-9999]", { greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    equal($("#testmask").inputmask("isComplete"), true, "Result " + $("#testmask").inputmask("isComplete"));

    $("#testmask").remove();
});

asyncTest(".inputmask(\"99999[-9999]\", { greedy: false }); type 123456 backspace blur", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99999[-9999]", { greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    $("#testmask").blur();
    setTimeout(function () {
        start();
        equal($("#testmask")[0]._valueGet(), "12345", "Result " + $("#testmask")[0]._valueGet());
        $("#testmask").remove();
    }, 0);
});

asyncTest(".inputmask(\"99999[-9999]\", { greedy: false, autoUnmask: true }); type 123456 backspace", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99999[-9999]", { greedy: false, autoUnmask: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    setTimeout(function () {
        start();
        equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
        $("#testmask").remove();
    }, 0);
});

test(".inputmask('999-999-9999[ ext 9{1,5}]'); - type 12345678901 backspace iscomplete? - antch", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('999-999-9999[ ext 9{1,5}]');

    $("#testmask")[0].focus();
    $("#testmask").Type("12345678901");
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    equal($("#testmask").inputmask("isComplete"), true, "Result " + $("#testmask").inputmask("isComplete"));

    $("#testmask").remove();
});

test("inputmask({ mask: \"9999[ 9999][ 9999]\"}) - input 1234 space space - GMTA", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "9999[ 9999][ 9999]"});

    $("#testmask")[0].focus();
    $("#testmask").Type("1234  ");
    equal($("#testmask").val(), "1234 ____ ____", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
