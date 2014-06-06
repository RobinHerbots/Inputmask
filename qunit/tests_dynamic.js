module("Dynamic Masks");
test("inputmask(\"9-a{3}9{3}\" - simple dynamic mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-a{3}9{3}");

    $("#testmask")[0].focus();
    $("#testmask").Type("1abc123");

    equal($("#testmask").val(), "1-abc123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"9-a{1,3}9{1,3}\" - simple dynamic mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-a{1,3}9{1,3}");

    $("#testmask")[0].focus();
    $("#testmask").Type("1a1");

    equal($("#testmask").val(), "1-a1__", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"9-a{1,3}9{1,3}\" - simple dynamic mask - greedy false", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-a{1,3}9{1,3}", { greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("1a1");

    equal($("#testmask").val(), "1-a1", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"9-a{1,3}/9{2,3}\" - simple dynamic mask - greedy true", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-a{1,3}/9{2,3}", { greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("1a/123");

    equal($("#testmask").val(), "1-a/123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("email mask greedy false", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email", { greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("some.body@mail.com");
    $("#testmask").blur();
    equal($("#testmask").val(), "some.body@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("email mask greedy true", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email", { greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("some.body@mail.com");
    $("#testmask").blur();
    equal($("#testmask").val(), "some.body@mail.com___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("email mask - partial input", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email");

    $("#testmask")[0].focus();
    $("#testmask").Type("some.");
    $("#testmask").blur();
    equal($("#testmask").val(), "some._@_.__", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("email mask - partial input 2", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email");

    $("#testmask")[0].focus();
    $("#testmask").Type("some@mail.com");
    caret($("#testmask"), 4);
    $("#testmask").Type(".body");
    equal($("#testmask").val(), "some.body@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});