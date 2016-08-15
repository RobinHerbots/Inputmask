define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"prototypeExtensions",
	"simulator"
], function(qunit, $, Inputmask) {
	qunit.module("Date.Extensions");
	qunit.test("inputmask(\"dd/mm/yyyy\") - input 2331973", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").SendKey("2");
		$("#testmask").SendKey("3");
		$("#testmask").SendKey("3");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("9");
		$("#testmask").SendKey("7");
		$("#testmask").SendKey("3");

		assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
	});
	qunit.test("inputmask(\"mm/dd/yyyy\") - input 3231973", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mm/dd/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").SendKey("3");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("3");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("9");
		$("#testmask").SendKey("7");
		$("#testmask").SendKey("3");

		assert.equal(testmask.value, "03/23/1973", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\") - input 29022012", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").SendKey("2");
		$("#testmask").SendKey("9");
		$("#testmask").SendKey("0");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("0");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("2");

		assert.equal(testmask.value, "29/02/2012", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\") - input 29022013", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").SendKey("2");
		$("#testmask").SendKey("9");
		$("#testmask").SendKey("0");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("0");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("3");

		assert.equal(testmask.value, "29/02/201y", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"mm/dd/yyyy\") - input 02292012", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mm/dd/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").SendKey("0");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("9");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("0");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("2");

		assert.equal(testmask.value, "02/29/2012", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"mm/dd/yyyy\") - input 02292013", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mm/dd/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").SendKey("0");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("9");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("0");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("3");

		assert.equal(testmask.value, "02/29/201y", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\") - input CTRL RIGHT", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();
		$("#testmask").SendKey(Inputmask.keyCode.RIGHT, Inputmask.keyCode.CONTROL);
		assert.ok(testmask.value != "dd/mm/yyyy", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\") - input 2331973 BACKSPACE x4 2013", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").SendKey("2");
		$("#testmask").SendKey("3");
		$("#testmask").SendKey("3");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("9");
		$("#testmask").SendKey("7");
		$("#testmask").SendKey("3");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("0");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("3");

		assert.equal(testmask.value, "23/03/2013", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\") - input 23373 ", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").Type("23373");
		assert.equal(testmask.value, "23/03/2073", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\") - input 23318 - jimithing277", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();

		$("#testmask").Type("23318");
		assert.equal(testmask.value, "23/03/2018", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\", { yearrange: { minyear: 1900, maxyear: 2000 } }) - input 23373 ", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy", {
			yearrange: {
				minyear: 1900,
				maxyear: 2000
			}
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("23373");
		assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"hh:mm\") - add remove add", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('hh:mm', {
			clearIncomplete: true
		}).mask(testmask);
		testmask.inputmask.remove();
		Inputmask('hh:mm', {
			clearIncomplete: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("abcdef");
		$("#testmask").Type("23:50");

		assert.equal(testmask.value, "23:50", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"mm/yyyy\") - input 31973", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mm/yyyy").mask(testmask);

		testmask.focus();
		$("#testmask").Type("31973");
		assert.equal(testmask.value, "03/1973", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"mm/dd/yyyy\") - select some input 1 - Guamaso", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("mm/dd/yyyy").mask(testmask);

		testmask.focus();
		$.caret(testmask, 0, 5);
		$("#testmask").Type("1");
		assert.equal(testmask.value, "1m/dd/yyyy", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"dd/mm/yyyy\") - input 2331973 - remove 23", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();
		$("#testmask").Type("23031973");
		$.caret(testmask, 0, 2);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);

		assert.equal(testmask.value, "dd/03/1973", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\") - input 01011000 - Skiv22", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy", {
			yearrange: {
				minyear: 1000,
				maxyear: 2099
			}
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("01011000");

		assert.equal(testmask.value, "01/01/1000", "Result " + testmask.value);


	});

	qunit.test("inputmask(\"dd/mm/yyyy\", { yearrange: { minyear: 1900, maxyear: 2016 } })", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy", {
			yearrange: {
				minyear: 1900,
				maxyear: 2016
			}
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("23373");
		assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"dd/mm/yyyy\", { yearrange: { minyear: 1900, maxyear: 2017 } })", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy", {
			yearrange: {
				minyear: 1900,
				maxyear: 2017
			}
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("23373");
		assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"dd/mm/yyyy\", { yearrange: { minyear: 1900, maxyear: 2018 } })", function(assert) {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("dd/mm/yyyy", {
				yearrange: {
					minyear: 1900,
					maxyear: 2018
				}
			}).mask(testmask);

			testmask.focus();

			$("#testmask").Type("23373");
			assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"dd/mm/yyyy\", { yearrange: { minyear: 1900, maxyear: 2019 } })", function(assert) {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("dd/mm/yyyy", {
				yearrange: {
					minyear: 1900,
					maxyear: 2019
				}
			}).mask(testmask);

			testmask.focus();

			$("#testmask").Type("23373");
			assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"dd/mm/yyyy\", { yearrange: { minyear: 1900, maxyear: 2018 } }) -- 2012", function(assert) {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("dd/mm/yyyy", {
				yearrange: {
					minyear: 1900,
					maxyear: 2018
				}
			}).mask(testmask);

			testmask.focus();

			$("#testmask").Type("23312");
			assert.equal(testmask.value, "23/03/2012", "Result " + testmask.value);
	});
});
