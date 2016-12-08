define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.extensions",
	"prototypeExtensions",
	"simulator"
], function (qunit, $, Inputmask) {
	qunit.module("Alternations");

	qunit.test("\"9{1,2}C|S A{1,3} 9{4}\" - ankitajain32", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("9{1,2}C|S A{1,3} 9{4}").mask(testmask);
		$("#testmask").Type("12Cabc1234");
		assert.equal(testmask.inputmask._valueGet(), "12C ABC 1234", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("\"9{1,2}C|S A{1,3} 9{4}\" replace C with S - ankitajain32", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("9{1,2}C|S A{1,3} 9{4}").mask(testmask);
		$("#testmask").Type("12Cabc1234");
		$.caret(testmask, 2, 3);
		$("#testmask").Type("S");
		assert.equal(testmask.inputmask._valueGet(), "12S ABC 1234", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("nested alternations 1", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("0<2)##-##-##>|<3<4)#-##-##>|<5)#-##-##>|<6)#-##-##>>", {
			groupmarker: {
				start: "<",
				end: ">"
			}
		}).mask(testmask);

		$("#testmask").Type("02121212");

		assert.equal(testmask.inputmask._valueGet(), "02)12-12-12", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("nested alternations 2", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("0<2)##-##-##>|<3<4)#-##-##>|<5)#-##-##>|<6)#-##-##>>", {
			groupmarker: {
				start: "<",
				end: ">"
			}
		}).mask(testmask);

		$("#testmask").Type("03411212");

		assert.equal(testmask.inputmask._valueGet(), "034)1-12-12", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("nested alternations 3", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("0<2)##-##-##>|<3<4)#-##-##>|<5)#-##-##>|<6)#-##-##>>", {
			groupmarker: {
				start: "<",
				end: ">"
			}
		}).mask(testmask);

		$("#testmask").Type("03511212");

		assert.equal(testmask.inputmask._valueGet(), "035)1-12-12", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("nested alternations 4", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("0<2)##-##-##>|<3<4)#-##-##>|<5)#-##-##>|<6)#-##-##>>", {
			groupmarker: {
				start: "<",
				end: ">"
			}
		}).mask(testmask);

		$("#testmask").Type("03611212");

		assert.equal(testmask.inputmask._valueGet(), "036)1-12-12", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("alternations W|XY|Z", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("W|XY|Z").mask(testmask);

		$("#testmask").Type("WZ");

		assert.equal(testmask.inputmask._valueGet(), "WZ", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("alternations (W)|(X)(Y)|(Z)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("(W)|(X)(Y)|(Z)").mask(testmask);

		$("#testmask").Type("WZ");

		assert.equal(testmask.inputmask._valueGet(), "WZ", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("alternations (9{1,3})|(S|NE|W)-9{1,3}", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("(9{1,3})|(S|NE|W)-9{1,3}").mask(testmask);

		$("#testmask").Type("NE123");

		assert.equal(testmask.inputmask._valueGet(), "NE-123", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("alternations (9{1,3})|((S|N)(E|W))-9{1,3} - yesman85", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("(9{1,3})|((S|N)(E|W))-9{1,3}").mask(testmask);

		$("#testmask").Type("(NE123");

		assert.equal(testmask.inputmask._valueGet(), "(N)(E)-123", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("((S))", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("((S))").mask(testmask);
		testmask.focus();
		assert.equal(testmask.inputmask._valueGet(), "((S))", "Result " + testmask.inputmask._valueGet());
	});
	qunit.test("((S)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("((S)").mask(testmask);
		testmask.focus();
		assert.equal(testmask.inputmask._valueGet(), "((S)", "Result " + testmask.inputmask._valueGet());
	});
});
