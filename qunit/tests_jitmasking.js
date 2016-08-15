define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.extensions",
	"prototypeExtensions",
	"simulator"
], function (qunit, $, Inputmask) {
	qunit.module("JIT Masking");

	qunit.test("'(.999){*}', { jitMasking: true, numericInput: true   }", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask('(.999){*}', { jitMasking: true, numericInput: true   }).mask(testmask);
		$("#testmask").Type("123456");
		assert.equal($(testmask).val(), "123.456", "Result " + $(testmask).val());
	});
});
