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
});
