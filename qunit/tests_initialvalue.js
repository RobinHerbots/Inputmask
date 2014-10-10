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

