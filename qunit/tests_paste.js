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

	qunit.module("Paste value");
	qunit.test("inputmask(\"+7 (999) 999-99-99\") ~ paste \"+79114041112\"", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("+7 (999) 999-99-99").mask(testmask);
		testmask.focus();
		$("#testmask").paste("+79114041112");

		setTimeout(function () {
			assert.equal(testmask.value, "+7 (911) 404-11-12", "Result " + testmask.value);
			done();
		}, 0);

	});
	qunit.test("inputmask(\"+7 (999) 999-99-99\") ~ paste \"+7 (9114041112___)\"", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("+7 (999) 999-99-99").mask(testmask);
		testmask.focus();
		$("#testmask").paste("+7 (9114041112___)");

		setTimeout(function () {
			assert.equal(testmask.value, "+7 (911) 404-11-12", "Result " + testmask.value);
			done();
		}, 0);

	});

	qunit.test("inputmask(\"+7 (999) 999-99-99\") ~ paste \"0079114041112\" - monoblaine", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("+7 (999) 999-99-99", {
			onBeforePaste: function (pastedValue) {
				//just simplistic for the test ;-)
				var strippedValue = pastedValue.substr(3);
				return strippedValue;
			}
		}).mask(testmask);
		testmask.focus();
		$("#testmask").paste("0079114041112");

		setTimeout(function () {
			assert.equal(testmask.value, "+7 (911) 404-11-12", "Result " + testmask.value);
			done();
		}, 0);

	});

	qunit.test("inputmask(\"+31 9999999999\") ~ paste \"3112345678\" - jason16v", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("+31 9999999999").mask(testmask);
		testmask.focus();
		$("#testmask").paste("3112345678");

		setTimeout(function () {
			assert.equal(testmask.value, "+31 3112345678", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"+31 9999999999\") ~ paste \"+3112345678\" - jason16v", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("+31 9999999999").mask(testmask);
		testmask.focus();
		$("#testmask").paste("+3112345678");

		setTimeout(function () {
			assert.equal(testmask.value, "+31 12345678__", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("99.999.999/9999-99 numericInput ~ paste __-____/..__79100085302751__-____/..__ - imbelo", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			"mask": "99.999.999/9999-99",
			"numericInput": true
		}).mask(testmask);
		testmask.focus();
		$("#testmask").paste("__-____/..__79100085302751__-____/..__");

		setTimeout(function () {
			assert.equal(testmask.value, "79.100.085/3027-51", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency ~ $123.22 - sjk07", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('currency').mask(testmask);
		testmask.focus();
		$("#testmask").paste("$123.22");

		setTimeout(function () {
			assert.equal(testmask.value, "$ 123.22", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency ~ $-123.22 - sjk07", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('currency').mask(testmask);
		testmask.focus();
		$("#testmask").paste("$-123.22");

		setTimeout(function () {
			assert.equal(testmask.value, "-$ 123.22", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency ~ 1000.00 - sjk07", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('currency').mask(testmask);
		testmask.focus();
		$("#testmask").paste("1000.00");

		setTimeout(function () {
			assert.equal(testmask.value, "$ 1,000.00", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency ~ -1000.00 - sjk07", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('currency').mask(testmask);
		testmask.focus();
		$("#testmask").paste("-1000.00");

		setTimeout(function () {
			assert.equal(testmask.value, "-$ 1,000.00", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency ~ $1000.00 - sjk07", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('currency').mask(testmask);
		testmask.focus();
		$("#testmask").paste("$1000.00");

		setTimeout(function () {
			assert.equal(testmask.value, "$ 1,000.00", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency ~ $-1000.00 - sjk07", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('currency').mask(testmask);
		testmask.focus();
		$("#testmask").paste("$-1000.00");

		setTimeout(function () {
			assert.equal(testmask.value, "-$ 1,000.00", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency ~ 000.02 - sjk07", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('currency').mask(testmask);
		testmask.focus();
		$("#testmask").paste("000.02");

		setTimeout(function () {
			$(testmask).trigger("blur");
			assert.equal(testmask.value, "$ 0.02", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("02.999.999 ~ paste 02.024.900 - tnavarra", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("02.999.999").mask(testmask);
		testmask.focus();
		$("#testmask").paste("02.024.900");

		setTimeout(function () {
			assert.equal(testmask.value, "02.024.900", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("R9999999999 ~ paste 1234567890 - s-a", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("R9999999999", {
			"placeholder": "0",
			"showMaskOnFocus": false,
			"numericInput": true
		}).mask(testmask);
		$("#testmask").trigger("click");
		$("#testmask").paste("1234567890");

		setTimeout(function () {
			assert.equal(testmask.value, "R1234567890", "Result " + testmask.value);
			done();
		}, 0);
	});
});
