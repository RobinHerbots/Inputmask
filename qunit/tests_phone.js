define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../dist/inputmask/inputmask.regex.extensions",
	"prototypeExtensions",
	"simulator"
], function(qunit, $, Inputmask) {

qunit.module("Phone masks");

asyncTest("inputmask(\"phone be\") - type \"473890428\"", 1, function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");

	Inputmask("phonebe", {
		"url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-be.js"
	}).mask(testmask);
	testmask.focus();
	$("#testmask").Type("473890428");

	setTimeout(function() {
		equal(testmask.value, "+32(473)89-04-28", "Result " + testmask.value);
		start();
		$("#testmask").remove();
	}, 0);
});

asyncTest("inputmask(\"phone be\") - value \"+32473890428\"", 1, function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" value="+32473890428" />');
	Inputmask("phonebe", {
		"url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-be.js"
	}).mask(testmask);
	testmask.focus();
	setTimeout(function() {
		equal(testmask.value, "+32(473)89-04-28", "Result " + testmask.value);
		start();
		$("#testmask").remove();
	}, 0);
});

asyncTest("inputmask(\"phone\") - value=\"+32(473)890-428\"", 1, function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" value="+32(473)890-428" />');
	Inputmask("phone", {
		"url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js"
	}).mask(testmask);

	setTimeout(function() {
		equal(testmask.value, "+32(473)890-428", "Result " + testmask.value);
		start();
		$("#testmask").remove();
	}, 0);
});

asyncTest("inputmask(\"phone\") - value=\"32473890428\"", 1, function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" value="32473890428" />');
	Inputmask("phone", {
		"url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js"
	}).mask(testmask);

	setTimeout(function() {
		equal(testmask.value, "+32(473)890-428", "Result " + testmask.value);
		start();
		$("#testmask").remove();
	}, 0);
});

asyncTest("inputmask(\"phone\") - Brazil new", 1, function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" value="5512123451234" />');
	Inputmask("phone", {
		"url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js"
	}).mask(testmask);

	setTimeout(function() {
		equal(testmask.value, "+55-12-12345-1234", "Result " + testmask.value);
		start();
		$("#testmask").remove();
	}, 0);
});

asyncTest("inputmask(\"phone\") - Brazil old", 1, function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" value="55121234-1234" />');
	Inputmask("phone", {
		"url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js"
	}).mask(testmask);

	setTimeout(function() {
		equal(testmask.value, "+55-12-1234-1234", "Result " + testmask.value);
		start();
		$("#testmask").remove();
	}, 0);
});

asyncTest("inputmask(\"phone\") - Brazil switch", 1, function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" value="55121234-1234" />');
	Inputmask("phone", {
		"url": "https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/extra/phone-codes/phone-codes.js"
	}).mask(testmask);


	testmask.focus();
	$.caret(testmask, $("#testmask")[0].value.length); //for FF
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	$("#testmask").Type("451234");
	setTimeout(function() {
		equal(testmask.value, "+55-12-12345-1234", "Result " + testmask.value);
		start();
		$("#testmask").remove();
	}, 0);
});

});
