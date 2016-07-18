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
], function (qunit, $, Inputmask) {
	qunit.module("Set value with fn.val");
	qunit.test("inputmask(\"decimal\") ~ value=\"123.45\"", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal").mask(testmask);
		$("#testmask").val("123.45");
		assert.equal(testmask.value, "123.45", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"9\") ~ value=\"1\"", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9").mask(testmask);
		$("#testmask").val("1");
		assert.equal(testmask.value, "1", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"decimal\") ~ .val(\"123.45\") - disabled input", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" disabled="disabled" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal").mask(testmask);
		$("#testmask").val("123.45");
		assert.equal(testmask.value, "123.45", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"mm/yyyy\") ~ .val(\"031973\") - disabled input", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" disabled="disabled" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mm/yyyy").mask(testmask);
		$("#testmask").val("031973");
		assert.equal(testmask.value, "03/1973", "Result " + testmask.value);
	});

	qunit.test("inputmask({ \"mask\": \"(999) 999-9999\" }) ~ .val(\"8144419449\") - type=\"tel\" - bodrick", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="tel" id="testmask" disabled="disabled" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			"mask": "(999) 999-9999"
		}).mask(testmask);
		$("#testmask").val("8144419449");
		assert.equal(testmask.value, "(814) 441-9449", "Result " + testmask.value);
	});

	qunit.test(".inputmask('decimal',{ alias:\"decimal\",integerDigits:9,digits:3,digitsOptional: false,placeholder: '0' }); - '2000.000' - vijjj", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			alias: "decimal",
			integerDigits: 9,
			digits: 3,
			digitsOptional: false,
			placeholder: '0'
		}).mask(testmask);
		$("#testmask").val('2000.000');
		assert.equal(testmask.value, "2000.000", "Result " + testmask.value);
	});

	qunit.test(".inputmask('decimal',{ alias:\"decimal\",integerDigits:9,digits:3,digitsOptional: false,placeholder: '0' }); - 3000.000 - vijjj", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			alias: "decimal",
			integerDigits: 9,
			digits: 3,
			digitsOptional: false,
			placeholder: '0'
		}).mask(testmask);
		$("#testmask").val(3000.000);
		assert.equal(testmask.value, "3000.000", "Result " + testmask.value);
	});

	qunit.test(".inputmask('decimal',{ alias:\"decimal\",integerDigits:9,digits:3,digitsOptional: false,placeholder: '0' }); - '4000.00' - vijjj", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			alias: "decimal",
			integerDigits: 9,
			digits: 3,
			digitsOptional: false,
			placeholder: '0'
		}).mask(testmask);
		$("#testmask").val('4000.00');
		assert.equal(testmask.value, "4000.000", "Result " + testmask.value);
	});

	qunit.test(".inputmask('decimal',{ alias:\"decimal\",integerDigits:9,digits:3,digitsOptional: false,placeholder: '0' }); - '5000.000' - vijjj", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			alias: "decimal",
			integerDigits: 9,
			digits: 3,
			digitsOptional: false,
			placeholder: '0'
		}).mask(testmask);
		document.getElementById('testmask').value = '5000.000';
		assert.equal(testmask.value, "5000.000", "Result " + testmask.value);
	});

	qunit.test(".inputmask(\"mask\", {\"mask\": \"+7 (999) 999-99-99\"}); - \"+7 (705) 123-45-67\" - serious-andy", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mask", {
			"mask": "+7 (999) 999-99-99"
		}).mask(testmask);
		$("#testmask").val('+7 (705) 123-45-67');
		assert.equal(testmask.value, "+7 (705) 123-45-67", "Result " + testmask.value);
	});

	qunit.test(".inputmask(\"mask\", {\"mask\": \"+375 (99) 999-99-99\"}); - \"+375 (37) 999-99-99\" - PavelTyk", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mask", {
			"mask": "+375 (99) 999-99-99"
		}).mask(testmask);
		$("#testmask").val('+375 (37) 999-99-99');
		assert.equal(testmask.value, "+375 (37) 999-99-99", "Result " + testmask.value);
	});

	qunit.test(".inputmask(\"mask\", {\"mask\": \"+7(999)999-99-99\"}); - '7771231234' + '' - moongrate", function (assert) {
		var $fixture = $("#qunit-fixture"), done = assert.async();
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mask", {
			"mask": "+7(999)999-99-99"
		}).mask(testmask);
		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type('7771231234');
			$("#testmask").val(testmask.value);
			assert.equal(testmask.value, "+7(777)123-12-34", "Result " + testmask.value);
			done();
		}, 0);
	});

});
