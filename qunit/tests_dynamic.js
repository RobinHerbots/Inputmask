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

    equal($("#testmask").val(), "1-a1", "Result " + $("#testmask").val());

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
asyncTest("email mask greedy true", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email", { greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("some.body@mail.com");
    $("#testmask").blur();
    setTimeout(function () {
        start();
        equal($("#testmask").val(), "some.body@mail.com", "Result " + $("#testmask").val());
        $("#testmask").remove();
    }, 0);
});

test("email mask - partial input", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email");

    $("#testmask")[0].focus();
    $("#testmask").Type("some.");
    $("#testmask").blur();
    equal($("#testmask").val(), "some._@_", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("email mask - partial input 2", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email");

    $("#testmask")[0].focus();
    $("#testmask").Type("some@mail.com");
    $.caret($("#testmask"), 4);
    $("#testmask").Type(".body");
    equal($("#testmask").val(), "some.body@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("email mask - babu@us.lufthansa.com - babupca", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email");

    $("#testmask")[0].focus();
    $("#testmask").Type("babu@us.lufthansa.com");
    equal($("#testmask").val(), "babu@us.lufthansa.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("email mask - email@subdomain.domain.com - babupca", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email");

    $("#testmask")[0].focus();
    $("#testmask").Type("email@subdomain.domain.com");
    equal($("#testmask").val(), "email@subdomain.domain.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("email mask - paste test.test@test.com - Kurumas", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email");

    $("#testmask")[0].focus();
    $("#testmask").paste("test.test@test.com");
    setTimeout(function () {
        equal($("#testmask").val(), "test.test@test.com", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

test("quantifier mask greedy false - FairSite2C", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9{0,4}", { greedy: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    equal($("#testmask").val(), "123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("quantifier mask greedy true - FairSite2C", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9{0,4}", { greedy: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    equal($("#testmask").val(), "123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});


asyncTest("email mask - clearIncomplete - hiddenman", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email", { clearIncomplete: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("akornilov");
    $("#testmask").blur();
    setTimeout(function () {
        equal(document.getElementById("testmask")._valueGet(), "", "Result " + document.getElementById("testmask")._valueGet());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("email mask - clearIncomplete - hiddenman", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email", { clearIncomplete: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("akornilov@");
    $("#testmask").blur();
    setTimeout(function () {
        equal(document.getElementById("testmask")._valueGet(), "", "Result " + document.getElementById("testmask")._valueGet());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("email mask - clearIncomplete - hiddenman", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("email", { clearIncomplete: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("akornilov@gmail.com");
    $("#testmask").blur();
    setTimeout(function () {
        equal(document.getElementById("testmask")._valueGet(), "akornilov@gmail.com", "Result " + document.getElementById("testmask")._valueGet());
        start();
        $("#testmask").remove();
    }, 0);
});
