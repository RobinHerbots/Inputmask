define([
	"qunit",
	"../dist/inputmask/dependencyLibs/inputmask.dependencyLib",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
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

	qunit.test("(999) 999-9999", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(999) 999-9999", {inputEventOnly: true}).mask(testmask);

		testmask.focus();
		//simulate input
		$(testmask).input("1231231234");

		assert.equal(testmask.value, "(123) 123-1234", "Result " + testmask.value);
	});

	qunit.test("(999) 999-9999 - type 123 + backspace", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(999) 999-9999", {inputEventOnly: true}).mask(testmask);

		testmask.focus();
		//simulate input
		$(testmask).input("123");
		//simulate backspace
		$(testmask).input("(12) ___-____", 3);
		assert.ok($.caret(testmask).begin == 3, "Caret " + $.caret(testmask).begin);
	});

});
