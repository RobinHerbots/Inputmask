define([
	"qunit",
	"jquery",
	"inputmask",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../dist/inputmask/inputmask.regex.extensions",
	"../dist/inputmask/jquery.inputmask",
	"prototypeExtensions",
	"simulator"
], function(qunit, $, Inputmask) {
	qunit.module("jquery.inputmask plugin");
	qunit.test("", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');

		$("#testmask").inputmask({"mask": "99-9999-99"});
		$("#testmask").focus();
		assert.equal(testmask.inputmask._valueGet(), "__-____-__", "Result " + testmask.inputmask._valueGet());
	});
});
