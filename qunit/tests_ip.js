define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask"
], function(qunit, $, Inputmask) {
  module("IP - masks");
asyncTest("inputmask(\"ip\" - 10.10.10.10", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    $fixture.append('<input type="text" id="testmask2" />');
		var testmask2 = document.getElementById("testmask2");
    Inputmask("ip").mask(testmask);

    testmask.focus();
    $("#testmask").Type("10.10.10.10");
    testmask2.focus();
    setTimeout(function () {
        start();
        equal(testmask.value, "10.10.10.10", "Result " + testmask.value);

        $("#testmask").remove();
        $("#testmask2").remove();
    }, 0);
});

asyncTest("inputmask(\"ip\" - 1.1.1.1", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    $fixture.append('<input type="text" id="testmask2" />');
		var testmask2 = document.getElementById("testmask2");
    Inputmask("ip").mask(testmask);

    testmask.focus();
    $("#testmask").Type("1.1.1.1");
  testmask2.focus();
    setTimeout(function () {
        start();
        equal(testmask.value, "1.1.1.1", "Result " + testmask.value);

        $("#testmask").remove();
        $("#testmask2").remove();
    }, 0);
});

asyncTest("inputmask(\"ip\" - 255.255.255.255", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    $fixture.append('<input type="text" id="testmask2" />');
		var testmask2 = document.getElementById("testmask2");
    Inputmask("ip").mask(testmask);

    testmask.focus();
    $("#testmask").Type("255.255.255.255");
    setTimeout(function () {
        start();
        testmask2.focus();
        equal(testmask.value, "255.255.255.255", "Result " + testmask.value);

        $("#testmask").remove();
        $("#testmask2").remove();
    }, 0);
});

asyncTest("inputmask(\"ip\" - 192.168.1.100", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    $fixture.append('<input type="text" id="testmask2" />');
		var testmask2 = document.getElementById("testmask2");
    Inputmask("ip").mask(testmask);

    testmask.focus();
    $("#testmask").Type("192.168.1.100");
    testmask2.focus();
    setTimeout(function () {
        start();
        equal(testmask.value, "192.168.1.100", "Result " + testmask.value);

        $("#testmask").remove();
        $("#testmask2").remove();
    }, 0);
});
});
