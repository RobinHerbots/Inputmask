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

	qunit.module("Initial value setting");

	qunit.test("inputmask(\"999:99\", { placeholder: \"0\"}) value=\"007:20\"", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="007:20" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999:99", {
			placeholder: "0"
		}).mask(testmask);

		assert.equal(testmask.value, "007:20", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"01 650 103 002 0001 DE101 5170\" - wuSam", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="01 650 103 002 0001 DE101 5170" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99 999 999 999 9999 \\D\\E*** 9999").mask(testmask);
		assert.equal(testmask.value, "01 650 103 002 0001 DE101 5170", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" - wuSam", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99 999 999 999 9999 \\D\\E*** 9999").mask(testmask);
		assert.equal(testmask.value, "01 650 103 002 0001 DE101 5170", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" replace 2 with 3 - wuSam", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99 999 999 999 9999 \\D\\E*** 9999").mask(testmask);
		$.caret(testmask, 13, 14);
		$("#testmask").Type("3");
		assert.equal(testmask.value, "01 650 103 003 0001 DE101 5170", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" replace 002 with 003 - wuSam", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99 999 999 999 9999 \\D\\E*** 9999").mask(testmask);
		$.caret(testmask, 11, 14);
		$("#testmask").Type("003");
		assert.equal(testmask.value, "01 650 103 003 0001 DE101 5170", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\") ~ value=\"016501030020001DE1015170\" replace 02 with 01 - wuSam", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99 999 999 999 9999 \\D\\E*** 9999").mask(testmask);
		$.caret(testmask, 12, 14);
		$("#testmask").Type("01");
		assert.equal(testmask.value, "01 650 103 001 0001 DE101 5170", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"99 999 999 999 9999 \\D\\E*** 9999\", { greedy: false }) ~ value=\"016501030020001DE1015170\" replace 02 with 01 - wuSam", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="016501030020001DE1015170" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99 999 999 999 9999 \\D\\E*** 9999", {
			greedy: false
		}).mask(testmask);
		$.caret(testmask, 12, 14);
		$("#testmask").Type("01");
		assert.equal(testmask.value, "01 650 103 001 0001 DE101 5170", "Result " + testmask.value);
	});


	qunit.test("inputmask(\"\\D\\E***\") ~ value=\"DE001\" - wuSam", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="DE001" />');
		var testmask = document.getElementById("testmask");
		Inputmask("\\D\\E***").mask(testmask);
		assert.equal(testmask.value, "DE001", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"decimal\") ~ value=\"123.45\"", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="123.45" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal").mask(testmask);
		assert.equal(testmask.value, "123.45", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"decimal\") ~ value=\"123.45\" - disabled input", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="123.45" disabled="disabled" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal").mask(testmask);
		assert.equal(testmask.value, "123.45", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"mm/yyyy\") ~ value=\"031973\" - disabled input", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="031973" disabled="disabled" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mm/yyyy").mask(testmask);
		assert.equal(testmask.value, "03/1973", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"6703 9999 9999 9999 9\") ~ value=\"6703 1234 5678 9012 3\" - FransVdb", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="6703 1234 5678 9012 3" />');
		Inputmask("6703 9999 9999 9999 9");
		assert.equal(testmask.value, "6703 1234 5678 9012 3", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"6703 9999 9999 9999 9\") ~ type \"6703 1234 5678 9012 3\" + backspace - FransVdb", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("6703 9999 9999 9999 9").mask(testmask);
		testmask.focus();
		$("#testmask").Type("1234567890123");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

		assert.equal(testmask.value, "6703 1234 5678 9012 _", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"6703 9999 9999 9999 9\") ~ type \"6703670367036\" + backspace - FransVdb", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("6703 9999 9999 9999 9").mask(testmask);
		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("6703670367036");
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			assert.equal(testmask.value, "6703 6703 6703 6703 _", "Result " + testmask.value);
			done();
		}, 0);
	});
});
