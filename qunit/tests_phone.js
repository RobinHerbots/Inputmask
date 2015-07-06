module("Phone masks")

asyncTest("inputmask(\"phone be\") - type \"473890428\"", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');

    $("#testmask").inputmask("phonebe", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-be.js" });
    $("#testmask")[0].focus();
    $("#testmask").Type("473890428");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)89-04-28", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone be\") - value \"+32473890428\"", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="+32473890428" />');
    $("#testmask").inputmask("phonebe", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-be.js" });
    $("#testmask")[0].focus();
    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)89-04-28", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - value=\"+32(473)890-428\"", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="+32(473)890-428" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js" });

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)890-428", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - value=\"32473890428\"", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="32473890428" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js" });

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)890-428", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - Brazil new", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="5512123451234" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js" });

    setTimeout(function () {
        equal($("#testmask").val(), "+55-12-12345-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - Brazil old", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="55121234-1234" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js" });

    setTimeout(function () {
        equal($("#testmask").val(), "+55-12-1234-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"phone\") - Brazil switch", 1, function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="55121234-1234" />');
    $("#testmask").inputmask("phone", { "url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js" });


    $("#testmask")[0].focus();
    $.caret($("#testmask"), $("#testmask")[0].value.length); //for FF
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    $("#testmask").SendKey(inputmask.keyCode.BACKSPACE);
    $("#testmask").Type("451234");
    setTimeout(function () {
        equal($("#testmask").val(), "+55-12-12345-1234", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
