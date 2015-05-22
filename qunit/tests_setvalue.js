module("Set value with fn.val");
test("inputmask(\"decimal\") ~ value=\"123.45\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("decimal");
    $("#testmask").val("123.45");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"9\") ~ value=\"1\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("9");
    $("#testmask").val("1");
    equal($("#testmask").val(), "1", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"decimal\") ~ .val(\"123.45\") - disabled input", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" disabled="disabled" />');
    $("#testmask").inputmask("decimal");
    $("#testmask").val("123.45");
    equal($("#testmask").val(), "123.45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"mm/yyyy\") ~ .val(\"031973\") - disabled input", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" disabled="disabled" />');
    $("#testmask").inputmask("mm/yyyy");
    $("#testmask").val("031973");
    equal($("#testmask").val(), "03/1973", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask({ \"mask\": \"(999) 999-9999\" }) ~ .val(\"8144419449\") - type=\"tel\" - bodrick", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="tel" id="testmask" disabled="disabled" />');
    $("#testmask").inputmask({ "mask": "(999) 999-9999" });
    $("#testmask").val("8144419449");
    equal($("#testmask").val(), "(814) 441-9449", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test(".inputmask('decimal',{ alias:\"decimal\",integerDigits:9,digits:3,digitsOptional: false,placeholder: '0' }); - '2000.000' - vijjj", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('decimal', { alias: "decimal", integerDigits: 9, digits: 3, digitsOptional: false, placeholder: '0' });
    $("#testmask").val('2000.000');
    equal($("#testmask").val(), "2000.000", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test(".inputmask('decimal',{ alias:\"decimal\",integerDigits:9,digits:3,digitsOptional: false,placeholder: '0' }); - 3000.000 - vijjj", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('decimal', { alias: "decimal", integerDigits: 9, digits: 3, digitsOptional: false, placeholder: '0' });
    $("#testmask").val(3000.000);
    equal($("#testmask").val(), "3000.000", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test(".inputmask('decimal',{ alias:\"decimal\",integerDigits:9,digits:3,digitsOptional: false,placeholder: '0' }); - '4000.00' - vijjj", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('decimal', { alias: "decimal", integerDigits: 9, digits: 3, digitsOptional: false, placeholder: '0' });
    $("#testmask").val('4000.00');
    equal($("#testmask").val(), "4000.000", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test(".inputmask('decimal',{ alias:\"decimal\",integerDigits:9,digits:3,digitsOptional: false,placeholder: '0' }); - '5000.000' - vijjj", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('decimal', { alias: "decimal", integerDigits: 9, digits: 3, digitsOptional: false, placeholder: '0' });
    document.getElementById('testmask').value = '5000.000';
    equal($("#testmask").val(), "5000.000", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test(".inputmask(\"mask\", {\"mask\": \"+7 (999) 999-99-99\"}); - \"+7 (705) 123-45-67\" - serious-andy", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mask", { "mask": "+7 (999) 999-99-99" });
    $("#testmask").val('+7 (705) 123-45-67');
    equal($("#testmask").val(), "+7 (705) 123-45-67", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test(".inputmask(\"mask\", {\"mask\": \"+375 (99) 999-99-99\"}); - \"+375 (37) 999-99-99\" - PavelTyk", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mask", { "mask": "+375 (99) 999-99-99" });
    $("#testmask").val('+375 (37) 999-99-99');
    equal($("#testmask").val(), "+375 (37) 999-99-99", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest(".inputmask(\"mask\", {\"mask\": \"+7(999)999-99-99\"}); - '7771231234' + '' - moongrate", function () {
    var $fixture = $("body");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("mask", { "mask": "+7(999)999-99-99" });
    $("#testmask")[0].focus();
    setTimeout(function () {
        $("#testmask").Type('7771231234');
        $("#testmask").val($("#testmask").val());
        start();
        equal($("#testmask").val(), "+7(777)123-12-34", "Result " + $("#testmask").val());
        $("#testmask").remove();
    }, 0);
});
