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
	qunit.module("inputEventOnly: true");

	qunit.test("XXX-9999-9999-XXX-XXX - gersteba", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			inputEventOnly: true,
			mask: "XXX-9999-9999-XXX-XXX",
			definitions: {
				"X": {
					validator: "[A-Ha-hJ-Nj-nPpR-Zr-z2-9]",
					cardinality: 1,
					casing: "upper"
				}
			}
		}).mask(testmask);

		testmask.focus();
		//simulate input
		$(testmask).input("abc12341234abcabc");

		assert.equal(testmask.value, "ABC-1234-1234-ABC-ABC", "Result " + testmask.value);
	});

});
