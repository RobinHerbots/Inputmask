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
    $("#testmask").SendKey($.inputmask.keyCode.RIGHT, $.inputmask.keyCode.CONTROL);
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
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
    $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
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

test("inputmask(\"dd/mm/yyyy\") - input 23318 - jimithing277", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("dd/mm/yyyy");

    $("#testmask")[0].focus();

    $("#testmask").Type("23318");
    equal($("#testmask").val(), "23/03/2018", "Result " + $("#testmask").val());

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
    $.caret($("#testmask")[0], 0, 5);
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
    $.caret($("#testmask"), 0, 2);
    $("#testmask").SendKey($.inputmask.keyCode.DELETE);

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
