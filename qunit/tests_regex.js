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

qunit.module("Regex masks");

test("inputmask(\"Regex\", { regex: \"[0-9]*\"});", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[0-9]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123abc45");

	equal(testmask.value, "12345", "Result " + testmask.value);

	$("#testmask").remove();
});

asyncTest("inputmask(\"Regex\", { regex: \"[0-9]*\"}); ~ isComplete", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[0-9]*",
		oncomplete: function() {
			equal(testmask.value, "1", "Result " + testmask.value);
			start();
			$("#testmask").remove();
		}
	}).mask(testmask);

	testmask.focus();
	$("#testmask").SendKey("1");
});

test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123abc45");

	equal(testmask.value, "123abc45", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123abc45");

	equal(testmask.value, "abc45", "Result " + testmask.value);

	$("#testmask").remove();
});


test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123abc45");

	equal(testmask.value, "abc45", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[-]?(([1-8][0-9])|[1-9]0?)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("90");

	equal(testmask.value, "90", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[-]?(([1-8][0-9])|[1-9]0?)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("0");

	equal(testmask.value, "", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[-]?(([1-8][0-9])|[1-9]0?)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("-78");

	equal(testmask.value, "-78", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\" - simple regex email", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("some.body@mail.com");

	equal(testmask.value, "some.body@mail.com", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\" - complexer regex email", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("denise.van.de.cruys@mail.com");

	equal(testmask.value, "denise.van.de.cruys@mail.com", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 1-123-4562", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("1-123-4562");

	equal(testmask.value, "1-123-4562", "Result " + testmask.value);

	$("#testmask").remove();
});
test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 20-222-2222", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("20-222-2222");

	equal(testmask.value, "20-222-2222", "Result " + testmask.value);

	$("#testmask").remove();
});
test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 22-222-234", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("22-222-234");

	equal(testmask.value, "22-222-234", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 70-12-34", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("70-12-34");

	equal(testmask.value, "70-123", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" - arame regex 12", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12");

	equal(testmask.value, "12", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" } - arame regex 12.5", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12.5");

	equal(testmask.value, "12.5", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" } - arame regex 12.75", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12.75");

	equal(testmask.value, "12.75", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex abcdef", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask('Regex', {
		regex: "(abc)+(def)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("abcdef");

	equal(testmask.value, "abcdef", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex 123a4b5c6d7e8f", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask('Regex', {
		regex: "(abc)+(def)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123a4b5c6d7e8f");

	equal(testmask.value, "abcdef", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex abcabcdef", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask('Regex', {
		regex: "(abc)+(def)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("abcabcdef");

	equal(testmask.value, "abcabcdef", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc){2,4}(def)\" }); - Flyarbonkers regex abdefcafebcaefbfcabcdef", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask('Regex', {
		regex: "(abc){2,4}(def)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("abdefcafebcaefbfcabcdef");

	equal(testmask.value, "abcabcabcabcdef", "Result " + testmask.value);

	$("#testmask").remove();
});

test("inputmask(\"Regex\", {regex: \"[а-яА-Я\\s]*\"}) - type space - SilentImp", function() {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask("Regex", {
		regex: "[а-яА-Я\\s]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").SendKey(Inputmask.keyCode.SPACE);

	equal(testmask.value, " ", "Result " + testmask.value);

	$("#testmask").remove();
});

});
