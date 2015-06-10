module("Escape character");

test("inputmask(\"9\\|9\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var input = $("#testmask");
    input.inputmask("9\\|9");

    input[0].focus();

    input.Type("23");
    equal(input.val(), "2|3", "Result " + input.val());

    input.remove();
});

test("inputmask(\"9\\[9\\]\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var input = $("#testmask");
    input.inputmask("9\\[9\\]");

    input[0].focus();

    input.Type("23");
    equal(input.val(), "2[3]", "Result " + input.val());

    input.remove();
});

test("inputmask(\"9\\\\9\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var input = $("#testmask");
    input.inputmask("9\\\\9");

    input[0].focus();

    input.Type("23");
    equal(input.val(), "2\\3", "Result " + input.val());

    input.remove();
});

test("inputmask(\"9\\{9\\}\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var input = $("#testmask");
    input.inputmask("9\\{9\\}");

    input[0].focus();

    input.Type("23");
    equal(input.val(), "2{3}", "Result " + input.val());

    input.remove();
});

test("inputmask(\"9\\(9\\)\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var input = $("#testmask");
    input.inputmask("9\\(9\\)");

    input[0].focus();

    input.Type("23");
    equal(input.val(), "2(3)", "Result " + input.val());

    input.remove();
});


test("inputmask(\"9\\?9\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var input = $("#testmask");
    input.inputmask("9\\?9");

    input[0].focus();

    input.Type("23");
    equal(input.val(), "2?3", "Result " + input.val());

    input.remove();
});

test("inputmask(\"\\9999\") value not mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" value="999" id="testmask" />');
    var input = $("#testmask");
    input.inputmask("\\9999", {isValueMask: false});

    input[0].focus();

    equal(input.val(), "9999", "Result " + input.val());

    input.remove();
});