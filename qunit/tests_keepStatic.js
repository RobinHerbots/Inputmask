module("keepStatic mask switching");

test("{ mask: [\"+55-99-9999-9999\", \"+55-99-99999-9999\", ], keepStatic: true }", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["+55-99-9999-9999", "+55-99-99999-9999"], keepStatic: true });
    $("#testmask")[0].focus();
    $("#testmask").Type("12123451234");

    equal(document.getElementById("testmask")._valueGet(), "+55-12-12345-1234", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

test("{ mask: \"+55-99-9999|(99)-9999\", keepStatic: true } - type 1212341234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "+55-99-9999|(99)-9999", keepStatic: true });
    $("#testmask")[0].focus();
    $("#testmask").Type("1212341234");

    equal(document.getElementById("testmask")._valueGet(), "+55-12-1234-1234", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

test("{ mask: ['(99) 9999-9999', '(99) 99999-9999'] } - val('1212341234')", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ['(99) 9999-9999', '(99) 99999-9999'] });
    $("#testmask").val("1212341234");

    equal(document.getElementById("testmask")._valueGet(), "(12) 1234-1234", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

test("{ mask: \"+55-99-9999|(99)-9999\", keepStatic: true } type 12123451234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "+55-99-9999|(99)-9999", keepStatic: true });
    $("#testmask")[0].focus();
    $("#testmask").Type("12123451234");

    equal(document.getElementById("testmask")._valueGet(), "+55-12-12345-1234", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

test("{ mask: [\"+55-99-9999-9999\", \"+55-99-99999-9999\", ], keepStatic: true } - type 12123451234 + backspace", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["+55-99-9999-9999", "+55-99-99999-9999"], keepStatic: true });
    $("#testmask")[0].focus();
    $("#testmask").Type("12123451234");
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);

    equal(document.getElementById("testmask")._valueGet(), "+55-12-1234-5123", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

test("{ mask: [\"99-9999-99\",\"99-99999-99\"] } - type 12123412 + add 1 upfront", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99-9999-99", "99-99999-99"] });
    $("#testmask").Type("12123412");
    $.caret($("#testmask"), 0);
    $("#testmask").Type("1");
    equal(document.getElementById("testmask")._valueGet(), "11-21234-12", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

test("{ mask: [\"99-99999-9\",\"99-999999-9\"] } - type 121234561", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99-99999-9", "99-999999-9"] });
    $("#testmask").Type("121234561");
    equal(document.getElementById("testmask")._valueGet(), "12-123456-1", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});

test("{ \"keepStatic\": true, greedy: false, mask: \"(99-9)|(99999)\" } - type 1234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ "keepStatic": true, greedy: false, "mask": "(99-9)|(99999)" });
    $("#testmask").Type("1234");
    equal(document.getElementById("testmask")._valueGet(), "1234", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});