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
    $("#testmask").SendKey($.inputmask.keyCode.SPACE);
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