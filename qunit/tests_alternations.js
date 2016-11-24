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
});
