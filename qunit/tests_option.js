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
	qunit.module("Extra options after masking");

	qunit.test("decimal alias add suffix later - gkostov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({alias: "decimal", suffix: ""}).mask("testmask");
		testmask.inputmask.option({suffix: "%"});

		$("#testmask").Type("123.45");
		assert.equal(testmask.value, "123.45%", "Result " + testmask.value);
	});
});
