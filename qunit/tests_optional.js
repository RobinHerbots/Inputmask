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

qunit.module("Optional");
test("inputmask(\"(99) 9999[9]-99999\") - input 121234-12345", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("(99) 9999[9]-99999").mask(testmask);

	testmask.focus();
	$("#testmask").Type("121234-12345");

	equal(testmask.value, "(12) 1234-12345", "Result " + testmask.value);

	$("#testmask").remove();
});
test("inputmask(\"(99) 9999[9]-99999\") - input 121234512345", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("(99) 9999[9]-99999").mask(testmask);

	testmask.focus();
	$("#testmask").Type("121234512345");

	equal(testmask.value, "(12) 12345-12345", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: true }) - input 123", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "99999[-9999]",
		greedy: true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123");
	equal(testmask.value, "123__", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "99999[-9999]",
		greedy: false
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123");
	equal(testmask.value, "123__", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 12345", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "99999[-9999]",
		greedy: false
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12345");
	equal(testmask.value, "12345", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "99999[-9999]",
		greedy: false
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123456");
	equal(testmask.value, "12345-6", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456789", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "99999[-9999]",
		greedy: false
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123456789");
	equal(testmask.value, "12345-6789", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"9[9][9] 999[9] 9999\") - input 123123 space 1234 - vipink70", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("9[9][9] 999[9] 9999").mask(testmask);

	testmask.focus();
	$("#testmask").Type("123123");
	$("#testmask").SendKey(Inputmask.keyCode.SPACE);
	$("#testmask").Type("1234");
	equal(testmask.value, "123 123 1234", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask('[9-]AAA.999') ", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask('[9-]AAA.999').mask(testmask);

	$("#testmask").Type("1abc123");
	$.caret(testmask, 4, 5);
	$("#testmask").Type("d");
	equal(testmask.value, "1-ABD.123", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask('9[9]:99') ", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask('9[9]:99').mask(testmask);

	$("#testmask").Type("3:44");
	$.caret(testmask, 1);
	$("#testmask").Type("3");
	equal(testmask.value, "33:44", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "99999[-9999]",
		greedy: false
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123456");
	testmask.blur();
	$("#testmask").trigger("mouseenter");
	equal(testmask.value, "12345-6___", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"9'9{1,2}\"\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "9'9{1,2}\"",
		greedy: false,
		skipOptionalPartCharacter: "",
		"clearIncomplete": true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12");
	testmask.blur();
	equal(testmask.value, "1'2\"", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"99{1,2}lb\\s\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "99{1,2}lb\\s",
		greedy: false,
		skipOptionalPartCharacter: "",
		"clearIncomplete": true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12");
	testmask.blur();
	equal(testmask.value, "12lbs", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"9'9[9]\"\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "9'9[9]\"",
		greedy: false,
		skipOptionalPartCharacter: "",
		"clearIncomplete": true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12");
	testmask.blur();
	equal(testmask.value, "1'2\"", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask({ mask: \"99[9]lb\\s\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "99[9]lb\\s",
		greedy: false,
		skipOptionalPartCharacter: "",
		"clearIncomplete": true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12");
	testmask.blur();
	equal(testmask.value, "12lbs", "Result " + testmask.value);

	$("#testmask").remove();
});


test(".inputmask(\"99999[-9999]\", { greedy: false }); - type 123456 backspace iscomplete?", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("99999[-9999]", {
		greedy: false
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123456");
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	equal(testmask.inputmask.isComplete(), true, "Result " + testmask.inputmask.isComplete());

	$("#testmask").remove();
});

asyncTest(".inputmask(\"99999[-9999]\", { greedy: false }); type 123456 backspace blur", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("99999[-9999]", {
		greedy: false
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123456");
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	testmask.blur();
	setTimeout(function() {
		start();
		equal($("#testmask")[0].inputmask._valueGet(), "12345", "Result " + $("#testmask")[0].inputmask._valueGet());
		$("#testmask").remove();
	}, 0);
});

asyncTest(".inputmask(\"99999[-9999]\", { greedy: false, autoUnmask: true }); type 123456 backspace", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("99999[-9999]", {
		greedy: false,
		autoUnmask: true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123456");
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	setTimeout(function() {
		start();
		equal(testmask.value, "12345", "Result " + testmask.value);
		$("#testmask").remove();
	}, 0);
});

test(".inputmask('999-999-9999[ ext 9{1,5}]'); - type 12345678901 backspace iscomplete? - antch", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask('999-999-9999[ ext 9{1,5}]').mask(testmask);

	testmask.focus();
	$("#testmask").Type("12345678901");
	$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
	equal(testmask.inputmask.isComplete(), true, "Result " + testmask.inputmask.isComplete());

	$("#testmask").remove();
});

test("inputmask({ mask: \"9999[ 9999][ 9999]\"}) - input 1234 space space - GMTA", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		mask: "9999[ 9999][ 9999]"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("1234  ");
	equal(testmask.value, "1234", "Result " + testmask.value);

	$("#testmask").remove();
});

});
