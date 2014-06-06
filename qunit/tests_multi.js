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
asyncTest("inputmask({ mask: [\"99999\", \"99999-9999\", \"999999-9999\"]]}) - input 123456", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["99999", "99999-9999", "999999-9999"] });

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
    $("#testmask").Type("123456");
    setTimeout(function () {
        equal($("#testmask").val(), "____-654321", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
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
