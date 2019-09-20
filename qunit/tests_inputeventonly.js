export default function (qunit, Inputmask) {
	var $ = Inputmask.dependencyLib;
	qunit.module("inputEventOnly: true");

	qunit.test("XXX-9999-9999-XXX-XXX - gersteba", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
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
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("(999) 999-9999", {inputEventOnly: true}).mask(testmask);

		testmask.focus();
		//simulate input
		$(testmask).input("1231231234");

		assert.equal(testmask.value, "(123) 123-1234", "Result " + testmask.value);
	});

	qunit.test("(999) 999-9999 - type 123 + backspace", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("(999) 999-9999", {inputEventOnly: true}).mask(testmask);

		testmask.focus();
		//simulate input
		$(testmask).input("123");
		//simulate backspace
		$(testmask).input("(12) ___-____", 3);
		assert.ok($.caret(testmask).begin == 3, "Caret " + $.caret(testmask).begin);
	});


	qunit.test("9999\\9\\9 - type 1234 + backspace - NightsDream", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask({
			"mask": "9999\\9\\9",
			clearMaskOnLostFocus: false,
			placeholder: "X",
			colorMask: true,
			inputEventOnly: true
		}).mask(testmask);

		testmask.focus();
		//simulate input
		$(testmask).input("123499");
		//simulate backspace
		$(testmask).input("12399", 3);
		assert.ok($.caret(testmask).begin == 3, "Caret " + $.caret(testmask).begin + " : " + testmask.value);
		assert.ok(testmask.value == "123X99", testmask.value);
	});

	qunit.test("numeric placeholder 0 - alexey-m-ukolov", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask({
			alias: "numeric",
			placeholder: "0",
			inputEventOnly: true,
			colorMask: true,
			androidHack: "rtfm"
		}, {inputEventOnly: true}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$(testmask).Type("10");
			assert.equal(testmask.value, "10", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("numeric 1 - #1617", function (assert) {
		var done = assert.async(), $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ".",
			radixPoint: ",",
			placeholder: "0",
			autoGroup: true,
			digits: 2,
			digitsOptional: false,
			clearMaskOnLostFocus: false,
			inputEventOnly: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$.caret(testmask, 0);
			$(testmask).Type("56,03");
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$(testmask).Type("0,03");
			assert.equal(testmask.value, "50,03", "Result " + testmask.value);
			done();
		}, 0);
	});
};
