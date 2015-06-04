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

test("inputmask(\"9\\9999\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="999" />');
    var input = $("#testmask");
    input.inputmask("9\\9999");

    input[0].focus();

    /*input.Type("999");*/
    equal(input.val(), "9999_", "Result " + input.val());

    input.remove();
});

test("inputmask(\"9\\9\\999\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="99" />');
    var input = $("#testmask");
    input.inputmask("9\\9\\999");

    input[0].focus();

    /*input.Type("999");*/
    equal(input.val(), "9999_", "Result " + input.val());

    input.remove();
});


test("inputmask(\"\\aaaaa\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var input = $("#testmask");
    input.inputmask("\\aaaaa");

    input[0].focus();

    input.Type("aaa");
    equal(input.val(), "aaaa_", "Result " + input.val());

    input.remove();
});
