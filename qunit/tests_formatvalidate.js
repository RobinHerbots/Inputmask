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

module("Value Validating");
test("$.inputmask.isValid(\"23/03/1973\", { alias: \"date\"})", function () {
    var formattedValue = $.inputmask.isValid("23/03/1973", { alias: "date" });
    equal(formattedValue, true, "Result " + formattedValue);
});

test("$.inputmask.isValid(\"01 650 103 002 0001 DE101 5170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function () {
    var formattedValue = $.inputmask.isValid("01 650 103 002 0001 DE101 5170", { mask: "99 999 999 999 9999 \\D\\E*** 9999" });
    equal(formattedValue, true, "Result " + formattedValue);
});