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