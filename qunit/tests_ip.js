module("IP - masks");
asyncTest("inputmask(\"ip\" - 10.10.10.10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("ip");

    $("#testmask")[0].focus();
    $("#testmask").Type("10.10.10.10");
    $("#testmask2")[0].focus();
    setTimeout(function () {
        start();
        equal($("#testmask").val(), "10.10.10.10", "Result " + $("#testmask").val());

        $("#testmask").remove();
        $("#testmask2").remove();
    }, 0);
});

asyncTest("inputmask(\"ip\" - 1.1.1.1", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("ip");

    $("#testmask")[0].focus();
    $("#testmask").Type("1.1.1.1");
    $("#testmask2")[0].focus();
    setTimeout(function () {
        start();
        equal($("#testmask").val(), "1.1.1.1", "Result " + $("#testmask").val());

        $("#testmask").remove();
        $("#testmask2").remove();
    }, 0);
});

asyncTest("inputmask(\"ip\" - 255.255.255.255", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("ip");

    $("#testmask")[0].focus();
    $("#testmask").Type("255.255.255.255");
    setTimeout(function () {
        start();
        $("#testmask2")[0].focus();
        equal($("#testmask").val(), "255.255.255.255", "Result " + $("#testmask").val());

        $("#testmask").remove();
        $("#testmask2").remove();
    }, 0);
});

asyncTest("inputmask(\"ip\" - 192.168.1.100", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $fixture.append('<input type="text" id="testmask2" />');
    $("#testmask").inputmask("ip");

    $("#testmask")[0].focus();
    $("#testmask").Type("192.168.1.100");
    $("#testmask2")[0].focus();
    setTimeout(function () {
        start();
        equal($("#testmask").val(), "192.168.1.100", "Result " + $("#testmask").val());

        $("#testmask").remove();
        $("#testmask2").remove();
    }, 0);
});
