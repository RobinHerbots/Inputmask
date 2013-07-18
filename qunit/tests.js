$.fn.SendKey = function (keyCode) {
    var keydown = $.Event("keydown"),
		keypress = $.Event("keypress");
    keyup = $.Event("keyup");

    keydown.keyCode = keyCode;
    $(this).trigger(keydown)
    if (!keydown.isDefaultPrevented()) {
        keypress.keyCode = keyCode;
        $(this).trigger(keypress);
        if (!keypress.isDefaultPrevented()) {
            keyup.keyCode = keyCode;
            $(this).trigger(keryup);
        }
    }
}


module("Simple masking");

test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: false}", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99-99-99", { clearMaskOnLostFocus: false });

    equal(document.getElementById("testmask").value, "__-__-__", "Result " + document.getElementById("testmask").value);

    $("#testmask").remove();
});

test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: true}", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("99-99-99", { clearMaskOnLostFocus: true });

    equal(document.getElementById("testmask").value, "", "Result " + document.getElementById("testmask").value);

    $("#testmask").remove();
});

test("inputmask(\"999.999.999\")", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999");

    $("#testmask")[0].focus();

    var event;

    $("#testmask").SendKey(49);
    $("#testmask").SendKey(50);
    $("#testmask").SendKey(51);

    equal($("#testmask").val(), "123.___.___", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("inputmask(\"999.999.999\", { oncomplete: ... })", 1, function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("999.999.999", {
        oncomplete: function () {
            equal($("#testmask").val(), "123.456.789", "Result " + $("#testmask").val());
            start();
            $("#testmask").remove();
        }
    });

    $("#testmask")[0].focus();
    $("#testmask").SendKey(49);
    $("#testmask").SendKey(50);
    $("#testmask").SendKey(51);
    $("#testmask").SendKey(52);
    $("#testmask").SendKey(53);
    $("#testmask").SendKey(54);
    $("#testmask").SendKey(55);
    $("#testmask").SendKey(56);
    $("#testmask").SendKey(57);
});

asyncTest("inputmask(\"9-AAA.999\") - change event", 1, function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-AAA.999").change(function () {
        ok(true, "Change triggered");
        setTimeout(function () {
            $("#testmask").remove();
            start();
        });
    });

    $("#testmask")[0].focus();
    $("#testmask").SendKey(49);
    $("#testmask").SendKey(65);
    $("#testmask").SendKey(66);
    $("#testmask").SendKey(67);
    $("#testmask").SendKey(50);
    $("#testmask").SendKey(51);

    $("#testmask").blur();
});

asyncTest("inputmask(\"9-AAA.999\", { onincomplete: ... })", 1, function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9-AAA.999", {
        onincomplete: function () {
            equal($("#testmask").val(), "1-ABC.12_", "Result " + $("#testmask").val());
            start();
            $("#testmask").remove();
        }
    });

    $("#testmask")[0].focus();
    $("#testmask").SendKey(49);
    $("#testmask").SendKey(65);
    $("#testmask").SendKey(66);
    $("#testmask").SendKey(67);
    $("#testmask").SendKey(49);
    $("#testmask").SendKey(50);

    $("#testmask").blur();
});


module("Initial value setting");

test("inputmask(\"999:99\", { placeholder: \"0\"}) value=\"007:20\"", function () {
    $('body').append('<input type="text" id="testmask" value="007:20" />');
    $("#testmask").inputmask("999:99", { placeholder: "0" });

    equal($("#testmask").val(), "007:20", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"01 650 103 002 0001 DE101 5170\"", function () {
    $('body').append('<input type="text" id="testmask" value="01 650 103 002 0001 DE101 5170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    equal($("#testmask").val(), "01 650 103 002 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\"", function () {
    $('body').append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
    $("#testmask").inputmask("99 999 999 999 9999 \\D\\E*** 9999");
    equal($("#testmask").val(), "01 650 103 002 0001 DE101 5170", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"\\D\\E***\") ~ value=\"DE001\"", function () {
    $('body').append('<input type="text" id="testmask" value="DE001" />');
    $("#testmask").inputmask("\\D\\E***");
    equal($("#testmask").val(), "DE001", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"decimal\") ~ value=\"123.45\"", function () {
    $('body').append('<input type="text" id="testmask" value="123.45" />');
    $("#testmask").inputmask("decimal");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

module("Set value with fn.val");
test("inputmask(\"decimal\") ~ value=\"123.45\"", function () {
    $('body').append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal");
    $("#testmask").val("123.45");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});