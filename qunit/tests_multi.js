module("multi masks");
asyncTest("inputmask({ mask: [\"99-99\", \"999-99\"]}) - input 12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99-99", "999-99"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345");
    setTimeout(function () {
        equal($("#testmask").val(), "123-45", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"999.999.999-99\", \"99.999.999/9999-99\"]}) - input 12312312312", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["999.999.999-99", "99.999.999/9999-99"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12312312312");
    setTimeout(function () {
        equal($("#testmask").val(), "123.123.123-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"999.999.999-99\", \"99.999.999/9999-99\"]}) - input 12.123123123412", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["999.999.999-99", "99.999.999/9999-99"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12.123123123412");
    setTimeout(function () {
        equal($("#testmask").val(), "12.123.123/1234-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345");
    $("#testmask").blur();
    setTimeout(function () {
        equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"], greedy: false, keepStatic: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345");
    setTimeout(function () {
        equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 12345-1234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345-1234");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 123451234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("123451234");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\"]]}) - input 1234512", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234512");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-12__", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 1234561234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234561234");
    setTimeout(function () {
        equal($("#testmask").val(), "123456-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 12345-6", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"] });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345-6");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-6___", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"], keepStatic: false}) - input 123456", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"], keepStatic: false });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    setTimeout(function () {
        equal($("#testmask").val(), "123456-____", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"] , keepStatic: true}) - input 123456", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"], keepStatic: true });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    setTimeout(function () {
        equal($("#testmask").val(), "12345-6___", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 123456 (rtl)", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"] });

    $("#testmask")[0].focus();
    setTimeout(function () { //needed to pass on ie
        $("#testmask").Type("123456");
        setTimeout(function () {
            start();
            equal($("#testmask").val(), "___6-54321", "Result " + $("#testmask").val());
            $("#testmask").remove();
        }, 0);
    }, 0);
});

asyncTest("inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] }) ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] });

    $("#testmask").Type("1abc");
    setTimeout(function () {
        equal($("#testmask").val(), "1 ABC-___", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] }) ", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] });

    $("#testmask").Type("a123");
    setTimeout(function () {
        equal($("#testmask").val(), "A 123-___", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

test("inputmask({ mask: ['99.9', 'X'}) - annames", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({
        mask: ["99.9", "X", "abc"],
        definitions: {
            "X": {
                validator: "[xX]",
                cardinality: 1,
                casing: "upper"
            }
        }
    });

    $("#testmask").Type("x");
    equal($("#testmask").val(), "X", "Result " + $("#testmask").val());
    $("#testmask").remove();
});