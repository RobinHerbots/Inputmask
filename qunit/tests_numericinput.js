module("Direction RTL");
asyncTest("inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").SendKey("1");
        $("#testmask").SendKey("2");
        $("#testmask").SendKey("3");
        $("#testmask").SendKey($.inputmask.keyCode.RIGHT);
        $("#testmask").SendKey($.inputmask.keyCode.RIGHT);
        $("#testmask").SendKey($.inputmask.keyCode.RIGHT);
        $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey("4");
        $("#testmask").SendKey($.inputmask.keyCode.LEFT);
        $("#testmask").SendKey("5");
        $("#testmask").SendKey("6");
        start();
        equal($("#testmask").val(), "___._65.341", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").SendKey("1");
        $("#testmask").SendKey("2");
        $("#testmask").SendKey("3");
        $("#testmask").SendKey($.inputmask.keyCode.RIGHT);
        $("#testmask").SendKey($.inputmask.keyCode.RIGHT);
        $("#testmask").SendKey($.inputmask.keyCode.DELETE);
        $("#testmask").SendKey("4");
        $("#testmask").SendKey($.inputmask.keyCode.LEFT);
        $("#testmask").SendKey("5");
        $("#testmask").SendKey("6");
        start();
        equal($("#testmask").val(), "___._65.341", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"999-aaa-999\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999-aaa-999");

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("123abc12");
        start();
        equal($("#testmask").val(), "_21-cba-321", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"999-999-999\") - replace selection", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999-999-999");

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("123456789");
        $.caret($("#testmask"), 4, 7);
        $("#testmask").Type("5");
        start();
        equal($("#testmask").val(), "__9-875-321", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"999-999-999\") - replace selection with backspace", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999-999-999");

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("123456789");
        $.caret($("#testmask"), 4, 7);
        $("#testmask").SendKey($.inputmask.keyCode.BACKSPACE);
        $("#testmask").Type("5");
        start();
        equal($("#testmask").val(), "__9-875-321", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"999-999-999\") - replace selection - with delete", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" dir="rtl" />');
    $("#testmask").inputmask("999-999-999");

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("123456789");
        $.caret($("#testmask"), 4, 7);
        $("#testmask").SendKey($.inputmask.keyCode.DELETE);
        $("#testmask").Type("5");
        start();
        equal($("#testmask").val(), "__9-875-321", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

module("Numeric Input");
asyncTest("inputmask({ mask: \"9\", numericInput: true, repeat: 10, greedy: true }); - 1234567890", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "9", numericInput: true, repeat: 10, greedy: true });

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("1234567890");
        start();
        equal($("#testmask").val(), "1234567890", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});
asyncTest("inputmask({ mask: \"9\", numericInput: true, repeat: 10, greedy: true }); - replace selection", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "9", numericInput: true, repeat: 10, greedy: true });

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("1234567890");
        $.caret($("#testmask"), 3, 6);
        $("#testmask").Type("5");
        start();
        equal($("#testmask").val(), "__12357890", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"99-99-99\", numericInput: true }); - 1234567890", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: "99-99-99", numericInput: true });

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("1234567890");
        start();
        equal($("#testmask").val(), "12-34-56", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"€ 999.999.999,99\", numericInput: true }); - 123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('€ 999.999.999,99', { numericInput: true });

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("123");
        start();
        equal($("#testmask").val(), "€ ___.___.__1,23", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"€ 999.999.999,99\", numericInput: true }); - 123 position before 456", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('€ 999.999.999,99', { numericInput: true });

    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type("123");
        $.caret($("#testmask"), 12);
        $("#testmask").Type("456");
        start();
        equal($("#testmask").val(), "€ ___.__4.561,23", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"€ 999.999.999,99\", { numericInput: true, radixPoint: \",\" }); - 123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('€ 999.999.999,99', { numericInput: true, radixPoint: "," });

    $("#testmask")[0].focus();
    $("#testmask").click();
    setTimeout(function () {
        $("#testmask").Type("123");

        equal($("#testmask").val(), "€ ___.___.__1,23", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"€ 999.999.999,99\", { numericInput: true, radixPoint: \",\" }); - 123,45", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('€ 999.999.999,99', { numericInput: true, radixPoint: "," });

    $("#testmask")[0].focus();
    $("#testmask").click();
    setTimeout(function () {
        $("#testmask").Type("123,45");

        equal($("#testmask").val(), "€ ___.___.123,45", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"9999 t\", { numericInput: true }); - 123 - Joe Rosa", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('9999 t', { numericInput: true });

    $("#testmask").focus();
    $("#testmask").click();
    setTimeout(function () {
        $("#testmask").Type("123");
        start();
        equal($("#testmask").val(), "_123 t", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"9999 t\", { numericInput: true, autoUnmask: true }); - 70  - Joe Rosa", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('9999 t', { numericInput: true, autoUnmask: true });

    $("#testmask").focus();
    $("#testmask").click();
    setTimeout(function () {
        $("#testmask").Type("70");
        start();
        equal($("#testmask").val(), "70", "Result " + $("#testmask").val());

        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask({ mask: \"['$9.99', '$99.99', '$999.99', '$9,999.99', '$99,999.99', '$999,999.99', '$9,999,999.99', '$99,999,999.99', '$999,999,999.99'], 'placeholder': ' ', 'numericInput': true, 'rightAlignNumerics': false\" value=\"$100000.00\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append("<input type=\"text\" id=\"testmask\" data-inputmask=\"'mask': ['$9.99', '$99.99', '$999.99', '$9,999.99', '$99,999.99', '$999,999.99', '$9,999,999.99', '$99,999,999.99', '$999,999,999.99'], 'placeholder': ' ', 'numericInput': true, 'rightAlignNumerics': false\" value=\"$100000.00\"/>");
    $("#testmask").inputmask();
    setTimeout(function () {
        equal($("#testmask").val(), "$100,000.00", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});