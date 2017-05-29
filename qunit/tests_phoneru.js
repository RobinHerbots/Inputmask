export default function (qunit, $, Inputmask) {

	qunit.module("Phoneru masks");


	for (var i = 0; i < Inputmask.prototype.aliases.phoneru.phoneCodes.length; i += 25) {
		qunit.test("inputmask(\"phoneru\") - " + i + "-" + (i + 25), function (assert) {
				var i = assert.test.testName.match(/\d+$/);
				i = i - 25;
				var $fixture = $("#qunit-fixture");
				$fixture.append('<input type="text" id="testmask" />');
				var testmask = document.getElementById("testmask");
				Inputmask("phoneru", {nullable: false}).mask(testmask);

				testmask.focus();

				$.each(Inputmask.prototype.aliases.phoneru.phoneCodes.slice(i, i + 25), function (ndx, lmnt) {
					var ndx = 1, input, expected = lmnt.mask;
					while (expected.match(/#/)) {
						expected = expected.replace(/#/, ndx++);
						if (ndx > 9) ndx = 1;
					}
					input = expected;
					//input = input.replace(/\+/g, "");
					input = input.replace(/\(/g, "");
					// input = input.replace(/\)/g, "");
					input = input.replace(/-/g, "");

					$(testmask).val(input);
					assert.equal(testmask.value, expected, "Result " + testmask.value);
				});
			}
		)
	}
};
