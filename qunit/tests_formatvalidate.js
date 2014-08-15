module("Value formatting");
test("$.inputmask.format(\"2331973\", { alias: \"date\"})", function () {
    var formattedValue = $.inputmask.format("2331973", { alias: "date" });
    equal(formattedValue, "23/03/1973", "Result " + formattedValue);
});

test("$.inputmask.format(\"016501030020001DE1015170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function () {
    var formattedValue = $.inputmask.format("016501030020001DE1015170", { mask: "99 999 999 999 9999 \\D\\E*** 9999" });
    equal(formattedValue, "01 650 103 002 0001 DE101 5170", "Result " + formattedValue);
});

test("$.inputmask.format(\"12\", {  mask: \"$ 999999\", numericInput: true, placeholder: \"0\" }); - gigermocas", function () {
    var formattedValue = $.inputmask.format("12", { mask: "$ 999999", numericInput: true, placeholder: "0" });
    equal(formattedValue, "$ 000012", "Result " + formattedValue);
});


test("$.inputmask.format(\"1111111.11\" - ... autoGroup: true - swd120", function () {
    var formattedValue = $.inputmask.format("1111111.11", {
        alias: "decimal",
        radixPoint: ".",
        digits: 2,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        allowMinus: true
    });
    equal(formattedValue, "1,111,111.11", "Result " + formattedValue);
});


module("Value Validating");
test("$.inputmask.isValid(\"23/03/1973\", { alias: \"date\"})", function () {
    var isValid = $.inputmask.isValid("23/03/1973", { alias: "date" });
    equal(isValid, true, "Result " + isValid);
});

test("$.inputmask.isValid(\"01 650 103 002 0001 DE101 5170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function () {
    var isValid = $.inputmask.isValid("01 650 103 002 0001 DE101 5170", { mask: "99 999 999 999 9999 \\D\\E*** 9999" });
    equal(isValid, true, "Result " + isValid);
});

test("$.inputmask.isValid email => false", function () {
    var isValid = $.inputmask.isValid("some.body@mail.c", { alias: "email" });
    equal(isValid, true, "Result " + isValid);
});

test("$.inputmask.isValid email => true", function () {
    var isValid = $.inputmask.isValid("some.body@mail.com", { alias: "email" });
    equal(isValid, true, "Result " + isValid);
});

test("$.inputmask.isValid email greedy => false", function () {
    var isValid = $.inputmask.isValid("some.body@mail.c", { alias: "email", greedy: true });
    equal(isValid, true, "Result " + isValid);
});

test("$.inputmask.isValid email greedy => true", function () {
    var isValid = $.inputmask.isValid("some.body@mail.com", { alias: "email", greedy: true });
    equal(isValid, true, "Result " + isValid);
});

test("YoussefTaghlabi isValid(\"100\", { alias: \"integer\" }", function () {
    var isValid = $.inputmask.isValid("100", { alias: "integer" });
    equal(isValid, true, "Result " + isValid);
});
test("YoussefTaghlabi isValid(\"100.00\", { alias: \"integer\" }", function () {
    var isValid = $.inputmask.isValid("100.00", { alias: "integer" });
    equal(isValid, false, "Result " + isValid);
});
test("YoussefTaghlabi isValid(\"123\", { alias: \"decimal\" }", function () {
    var isValid = $.inputmask.isValid("123", { alias: "decimal" });
    equal(isValid, true, "Result " + isValid);
});
test("YoussefTaghlabi isValid(\"123.45\", { alias: \"decimal\" }", function () {
    var isValid = $.inputmask.isValid("123.45", { alias: "decimal" });
    equal(isValid, true, "Result " + isValid);
});
test("YoussefTaghlabi isValid(\"123456.78\", { alias: \"decimal\" }", function () {
    var isValid = $.inputmask.isValid("123456.78", { alias: "decimal" });
    equal(isValid, true, "Result " + isValid);
});
test("YoussefTaghlabi isValid(\"123,456.78\", { alias: \"decimal\" }", function () {
    var isValid = $.inputmask.isValid("123,456.78", {
        alias: "decimal", radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3
    });
    equal(isValid, true, "Result " + isValid);
});
test("YoussefTaghlabi isValid(\"12,\", { alias: \"decimal\" }", function () {
    var isValid = $.inputmask.isValid("12,", {
        alias: "decimal", radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3
    });
    equal(isValid, false, "Result " + isValid);
});
test("YoussefTaghlabi isValid(\"12,1.45\", { alias: \"decimal\" }", function () {
    var isValid = $.inputmask.isValid("12,1.45", {
        alias: "decimal", radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3
    });
    equal(isValid, false, "Result " + isValid);
});
test("YoussefTaghlabi isValid(\"12,345.67\", { alias: \"decimal\" }", function () {
    var isValid = $.inputmask.isValid("12,345.67", {
        alias: "decimal", radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3
    });
    equal(isValid, true, "Result " + isValid);
});