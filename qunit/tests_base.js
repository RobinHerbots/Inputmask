define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.extensions",
	"prototypeExtensions",
	"simulator"
], function (qunit, $, Inputmask) {
	qunit.module("Simple masking");

	qunit.test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: false}", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask({
			mask: "99-99-99",
			clearMaskOnLostFocus: false
		}).mask(testmask);

		assert.equal(testmask.inputmask._valueGet(), "__-__-__", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: true}", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask({
			mask: "99-99-99",
			clearMaskOnLostFocus: false
		}).mask(testmask);
		testmask.blur();
		setTimeout(function () {
			assert.equal(testmask.value, "", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"999.999.999\")", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123");
		assert.equal(testmask.value, "123.___.___", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"999.999.999\") + backspace", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		assert.equal(testmask.value, "12_.___.___", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"999.999.999\", { oncomplete: ... })", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999", {
			oncomplete: function () {
				assert.equal(testmask.value, "123.456.789", "Result " + testmask.value);
				testmask.inputmask.remove();
				done();
			}
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456789");
	});

	qunit.test("inputmask(\"9-AAA.999\") - change event", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		$("#testmask").on("change", function () {
			assert.ok(true, "Change triggered");
			done();
		});

		Inputmask("9-AAA.999").mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("1abc12");
			testmask.blur();
		}, 0);
	});

	qunit.test("inputmask(\"9-AAA.999\", { onincomplete: ... })", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9-AAA.999", {
			onincomplete: function () {
				assert.equal(testmask.value, "1-ABC.12_", "Result " + testmask.value);
				testmask.inputmask.remove();
				done();
			}
		}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("1abc12");
			testmask.blur();
		}, 0);
	});

	qunit.test("inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123");
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").Type("4");
		$("#testmask").SendKey(Inputmask.keyCode.RIGHT);
		$("#testmask").Type("56");

		assert.equal(testmask.value, "143.56_.___", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").SendKey(49);
		$("#testmask").SendKey(50);
		$("#testmask").SendKey(51);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(52);
		$("#testmask").SendKey(Inputmask.keyCode.RIGHT);
		$("#testmask").SendKey(53);
		$("#testmask").SendKey(54);

		assert.equal(testmask.value, "143.56_.___", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"999.999.999\") - delete selection start with nomask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789");
		$.caret(testmask, 3, 7);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);

		assert.equal(testmask.value, "123.789.___", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"999.999.999\") - backspace selection start with nomask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789");
		$.caret(testmask, 3, 7);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);

		assert.equal(testmask.value, "123.789.___", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"999.999.999\") - overtype selection start with nomask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789");
		$.caret(testmask, 3, 7);
		$("#testmask").Type("1");

		assert.equal(testmask.value, "123.178.9__", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"*****\")", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*****").mask(testmask);

		testmask.focus();

		$("#testmask").Type("abe");
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").Type("cd");

		assert.equal(testmask.value, "abcde", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"(999)999-9999\") - ruslanfedoseenko mask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(999)999-9999").mask(testmask);

		testmask.focus();

		testmask.value = "9999999999";
		$.caret(testmask, 4, 5);
		$("#testmask").Type("7");
		assert.equal(testmask.value, "(999)999-9999", "Result " + testmask.value);
	});
	qunit.test("inputmask(\"(999)999-9999\") - insert false - ruslanfedoseenko mask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(999)999-9999", {
			insertMode: false
		}).mask(testmask);

		testmask.focus();

		testmask.value = "9999999999";
		$.caret(testmask, 4, 5);
		$("#testmask").Type("7");
		assert.equal(testmask.value, "(999)999-9999", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"\") - empty mask - andywolk", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("").mask(testmask);

		testmask.focus();
		$("#testmask").val("123");
		assert.equal(testmask.value, "123", "Result " + testmask.value);
	});


	qunit.test("Intergroup selection - dhilt", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();
		$("#testmask").Type("23314");

		$.caret(testmask, 4, 7);
		$("#testmask").SendKey("6");
		assert.equal(testmask.value, "23/03/2014", "Result " + testmask.value);
	});
	qunit.test("Intergroup selection - dhilt", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();
		$("#testmask").Type("23314");

		$.caret(testmask, 4, 6);
		$("#testmask").SendKey("6");
		assert.equal(testmask.value, "23/06/y014", "Result " + testmask.value);
	});

	qunit.test("Delete selection with non-masks", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(999)999-9999").mask(testmask);

		testmask.focus();
		$("#testmask").Type("9999999999");

		$.caret(testmask, 8, 11);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		assert.equal(testmask.value, "(999)999-99__", "Result " + testmask.value);
	});

	qunit.test("Selection and backspace also deletes previous - kenaku", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999 99 99 999").mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234567890");

		$.caret(testmask, 2, 3);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		assert.equal(testmask.value, "124 56 78 90_", "Result " + testmask.value);
	});


	qunit.module("Non-greedy masks");
	qunit.test("inputmask(\"*\", { greedy: false, repeat: \"*\" }) - replace cd with 1", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*", {
			greedy: false,
			repeat: "*"
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("abcdef");
		$.caret(testmask, 2, 4);
		$("#testmask").SendKey("1");
		assert.equal(testmask.value, "ab1ef", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"*\", { greedy: false, repeat: \"*\" }) - type abcdef", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*", {
			greedy: false,
			repeat: "*"
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("abcdef");

		assert.equal(testmask.value, "abcdef", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"A.\", { repeat: \"*\" }) - type abc - joostburg", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("A.", {
			repeat: "*"
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("abc");

		assert.equal(testmask.value, "A.B.C", "Result " + testmask.value);
	});

	qunit.test("{ mask: \"A\", placeholder: \"\", repeat: 16 }) - type testtest - glosswordteam", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "A",
			placeholder: "",
			repeat: 16
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("testtest");

		assert.equal(testmask.value, "TESTTEST", "Result " + testmask.value);
	});

	qunit.test("{ mask: \"A\", repeat: 16, greedy: false }) - type testtest - glosswordteam", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "A",
			repeat: 16,
			greedy: false
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("testtest");

		assert.equal(testmask.value, "TESTTEST", "Result " + testmask.value);
	});

	qunit.module("greedy masks");
	qunit.test("inputmask(\"*\", { greedy: true, repeat: 10, clearMaskOnLostFocus: false  })", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*", {
			greedy: true,
			repeat: 10,
			clearMaskOnLostFocus: false
		}).mask(testmask);

		testmask.focus();
		assert.equal($("#testmask")[0].inputmask._valueGet(), "__________", "Result " + $("#testmask")[0].inputmask._valueGet());
	});
	qunit.test("inputmask(\"*\", { greedy: true, repeat: 10 }) - type 12345678901234567890", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*", {
			greedy: true,
			repeat: 10
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345678901234567890");

		assert.equal(testmask.value, "1234567890", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"9,99\", { greedy: true, repeat: 5 }) - type 12345678901234567890", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9,99", {
			greedy: true,
			repeat: 5
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345678901234567890");

		assert.equal(testmask.value, "1,234,567,890,123,45", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"9\", repeat: 10, placeholder: \"\", numericInput: true }) - greedy true with empty placeholder - type 12345", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			"mask": "9",
			repeat: 10,
			placeholder: "",
			numericInput: true
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345");

		assert.equal(testmask.value, "12345", "Result " + testmask.value);
	});

	qunit.test("creditcard switch - pchelailya", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9999 9999 9999 9999").mask(testmask);
		$("#testmask").on("keyup", function (event) {
			var value = this.inputmask.unmaskedvalue();

			if (value != null && value.length === 2 && value === "37") {
				Inputmask("9999 999999 99999").mask(this);
			}
		});
		testmask.focus();
		$("#testmask").Type("37");
		setTimeout(function () {
			$("#testmask").Type("12");
			assert.equal(testmask.value, "3712 ______ _____", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("maskscache - same mask diff definitions - StonesEditeurs", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "Z{1,*}",
			definitions: {
				'Z': {
					validator: function (chrs, buffer, pos, strict, opts) {
						return {
							pos: pos,
							c: 'A'
						};
					},
				}
			}
		}).mask(testmask);

		Inputmask({
			mask: "Z{1,*}", // <= Same mask
			definitions: {
				'Z': {
					validator: function (chrs, buffer, pos, strict, opts) {
						return {
							pos: pos,
							c: 'B'
						}; // <= another definition
					},
				}
			}
		}).mask(testmask);

		$("#testmask").Type("abcdef");
		assert.equal(document.getElementById("testmask").inputmask._valueGet(), "BBBBBB", "Result " + document.getElementById("testmask").inputmask._valueGet());
	});

	qunit.test("autoUnmask not work in newest release #1109 - danilG", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "+7 999 999-99-99",
			autoUnmask: true
		}).mask(testmask);

		$(testmask).val("9226845186");
		//Let's get value exact immediate - this crack's
		$(testmask).val();

		$(testmask).trigger("mouseenter");

		assert.equal(document.getElementById("testmask").inputmask._valueGet(), "+7 922 684-51-86", "Result " + document.getElementById("testmask").inputmask._valueGet());
	});

	qunit.test("Title Case - Especially", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("p{1,10}", {
			definitions: {
				"p": {
					validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5 ]",
					cardinality: 1,
					casing: "title" //auto uppercasing
				}
			},
		}).mask(testmask);
		$(testmask).val("title case");

		assert.equal(document.getElementById("testmask").inputmask._valueGet(), "Title Case", "Result " + document.getElementById("testmask").inputmask._valueGet());
	});

	qunit.test("Bug when typing after a fixed character #1299 - gayanj", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("AaaBAaaVaa").mask(testmask);

		testmask.focus();
		$.caret(testmask, 4);
		$("#testmask").Type("a");

		assert.equal(document.getElementById("testmask").inputmask._valueGet(), "___BA__V__", "Result " + document.getElementById("testmask").inputmask._valueGet());
	});
});
