module("Numeric.Extensions");

test("integer alias with integerDigits 9 & autogroup - type 123456789 - gigermocas", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("integer", {
		groupSeparator: ",",
		autoGroup: true,
		integerDigits: 9
	});

    $("#testmask")[0].focus();
    $("#testmask").Type("123456789");
    
    equal($("#testmask").val(), "123,456,789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("integer alias with integerDigits 9 & autogroup - type 1234567890123456789 - gigermocas", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("integer", {
		groupSeparator: ",",
		autoGroup: true,
		integerDigits: 9
	});

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567890123456789");
    
    equal($("#testmask").val(), "123,456,789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("integer alias with integerDigits 4 & autogroup - type 1234567890123456789 - gigermocas", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("integer", {
		groupSeparator: ",",
		autoGroup: true,
		integerDigits: 4
	});

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567890123456789");
    
    equal($("#testmask").val(), "1,234", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("decimal alias with integerDigits 9 & autogroup - type 123456789 - gigermocas", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
		groupSeparator: ",",
		autoGroup: true,
		integerDigits: 9
	});

    $("#testmask")[0].focus();
    $("#testmask").Type("123456789");
    
    equal($("#testmask").val(), "123,456,789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("decimal alias with integerDigits 4 & autogroup - type 1234 - gigermocas", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
		groupSeparator: ",",
		autoGroup: true,
		integerDigits: 4
	});

    $("#testmask")[0].focus();
    $("#testmask").Type("1234");
    
    equal($("#testmask").val(), "1,234", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("numeric alias with allowMinus:false type=text - vijjj", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("numeric", {
        radixPoint: ".",
        integerDigits: 6,
        allowMinus: false
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    caret($("#testmask"), 0);
    $("#testmask").SendKey("-");

    equal($("#testmask").val(), "123456", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("numeric alias with allowMinus:false type=number - mask not applied - MartinVerges", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="number" id="testmask" />');
    $("#testmask").inputmask("numeric", {
        radixPoint: ".",
        integerDigits: 6,
        allowMinus: false
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    $("#testmask").SendKey("-");

    equal($("#testmask").val(), "", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"numeric\", { prefix: \"€ \" }\") - input 12345.12", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("numeric", { prefix: "€ " });

    $("#testmask")[0].focus();
    $("#testmask").Type("12345.12");

    equal($("#testmask").val(), "€ 12345.12", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");
    $("#testmask").SendKey("4");
    $("#testmask").SendKey("5");
    $("#testmask").SendKey(".");
    $("#testmask").SendKey("1");
    $("#testmask").SendKey("2");
    $("#testmask").SendKey("3");

    equal($("#testmask").val(), "12,345.123", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123 + remove .123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);

    equal($("#testmask").val(), "12,345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").Type(".789");

    equal($("#testmask").val(), "12,345.789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: true, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    caret($("#testmask"), 6, 10);
    $("#testmask").Type(".789");

    equal($("#testmask").val(), "12,345.789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\" }\") - input 12345.123 + remove .123", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: false, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    //$("#testmask").click();
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { autoGroup: false, groupSeparator: "," });

    $("#testmask")[0].focus();

    $("#testmask").Type("12345.123");
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.LEFT);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").SendKey(keyCodes.DELETE);
    $("#testmask").Type(".789");

    equal($("#testmask").val(), "12345.789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - maxlength 10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" maxlength="10" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789012345");

    equal($("#testmask").val(), "1234567890", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal, { repeat: 15 }\") - maxlength 10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" maxlength="10" />');
    $("#testmask").inputmask("decimal", { repeat: 15 });

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789012345");

    equal($("#testmask").val(), "1234567890", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal, { repeat: 5 }\") - maxlength 10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" maxlength="10" />');
    $("#testmask").inputmask("decimal", { repeat: 5 });

    $("#testmask")[0].focus();

    $("#testmask").Type("123456789012345");

    equal($("#testmask").val(), "12345.6789", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    $("#testmask").Type("1234567890");
    caret($("#testmask"), 0, 10);
    $("#testmask").Type("12345");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - value=\"1234567890\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="1234567890" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    caret($("#testmask"), 0, 10);
    $("#testmask").Type("12345");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\")", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    $("#testmask").Type("1234567890");
    caret($("#testmask"), 3, 5);
    $("#testmask").SendKey("0");

    equal($("#testmask").val(), "123067890", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - value=\"1234567890\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="1234567890" />');
    $("#testmask").inputmask("decimal");

    $("#testmask")[0].focus();

    caret($("#testmask"), 3, 5);
    $("#testmask").SendKey("0");

    equal($("#testmask").val(), "123067890", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\") - value=\"123.45\" Replace last integer", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { digits: 2 });

    $("#testmask")[0].focus();
    $("#testmask").Type("123.45");
    caret($("#testmask"), 2, 3);
    $("#testmask").SendKey("7");

    equal($("#testmask").val(), "127.45", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask(\"decimal\", { digits: 2 }) - value=\"123\" - RomeroMsk", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", { digits: 2 });

    $("#testmask")[0].focus();
    $("#testmask").Type("123");
    caret($("#testmask"), 0, 3);
    $("#testmask").SendKey(",,..");
    $("#testmask").SendKey(keyCodes.RIGHT);
    $("#testmask").SendKey(keyCodes.RIGHT); //needed in test
    $("#testmask").SendKey(keyCodes.RIGHT); //needed in test
    $("#testmask").Type("45");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("inputmask - Multiple inputs masked, Integer mask doesn't allow typing - #402 - albatrocity", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("integer", {
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3
    });
    $("#testmask2").inputmask("(999)-999-9999");


    $("#testmask")[0].focus();
    $("#testmask").Type("12345");

    equal($("#testmask").val(), "12,345", "Result " + $("#testmask").val());
    $("#testmask").remove();
    $("#testmask2").remove();
});

test("decimal alias with groupseparator delete - YoussefTaghlabi", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3,
        digits: 2,
        autoGroup: true,
        allowPlus: false,
        allowMinus: true
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567");
    caret($("#testmask"), 0);
    $("#testmask").SendKey(keyCodes.DELETE);

    equal($("#testmask").val(), "234,567", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("decimal alias with groupseparator backspace - YoussefTaghlabi", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3,
        digits: 2,
        autoGroup: true,
        allowPlus: false,
        allowMinus: true
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("1234567");
    caret($("#testmask"), 1);
    $("#testmask").SendKey(keyCodes.BACKSPACE);

    equal($("#testmask").val(), "234,567", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("decimal alias with plus or minus & autogroup - YoussefTaghlabi", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3,
        digits: 2,
        autoGroup: true,
        allowPlus: true,
        allowMinus: true
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("-123456");

    equal($("#testmask").val(), "-123,456", "Result " + $("#testmask").val());
    $("#testmask").remove();
});

test("decimal alias with plus or minus & autogroup - YoussefTaghlabi", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3,
        digits: 2,
        autoGroup: true,
        allowPlus: true,
        allowMinus: true
    });

    $("#testmask")[0].focus();
    $("#testmask").Type("123456");
    caret($("#testmask"), 0);
    $("#testmask").SendKey("-");

    equal($("#testmask").val(), "-123,456", "Result " + $("#testmask").val());
    $("#testmask").remove();
});
