define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask"
], function(qunit, $, Inputmask) {
	module("Simple masking");

	test("inputmask(\"99-99-99\", { clearMaskOnLostFocus: false}", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask({
			mask: "99-99-99",
			clearMaskOnLostFocus: false
		}).mask(testmask);

		equal(testmask.inputmask._valueGet(), "__-__-__", "Result " + testmask.inputmask._valueGet());

		$("#testmask").remove();
	});

	asyncTest("inputmask(\"99-99-99\", { clearMaskOnLostFocus: true}", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask({
			mask: "99-99-99",
			clearMaskOnLostFocus: false
		}).mask(testmask);
		testmask.blur();
		setTimeout(function() {
			start();
			equal(testmask.value, "", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	test("inputmask(\"999.999.999\")", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123");
		equal(testmask.value, "123.___.___", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"999.999.999\") + backspace", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		equal(testmask.value, "12_.___.___", "Result " + testmask.value);

		$("#testmask").remove();
	});

	asyncTest("inputmask(\"999.999.999\", { oncomplete: ... })", 1, function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999", {
			oncomplete: function() {
				equal(testmask.value, "123.456.789", "Result " + testmask.value);
				start();
				$("#testmask").remove();
			}
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456789");
	});

	asyncTest("inputmask(\"9-AAA.999\") - change event", 1, function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		$("#testmask").on("change", function() {
			ok(true, "Change triggered");
			start();
			$("#testmask").remove();
		});

		Inputmask("9-AAA.999").mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("1abc12");
			testmask.blur();
		}, 0);
	});

	asyncTest("inputmask(\"9-AAA.999\", { onincomplete: ... })", 1, function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9-AAA.999", {
			onincomplete: function() {
				equal(testmask.value, "1-ABC.12_", "Result " + testmask.value);
				start();
				$("#testmask").remove();
			}
		}).mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("1abc12");
			testmask.blur();
		}, 0);
	});

	test("inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function() {
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

		equal(testmask.value, "143.56_.___", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function() {
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

		equal(testmask.value, "143.56_.___", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"999.999.999\") - delete selection start with nomask", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789");
		$.caret(testmask, 3, 7);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);

		equal(testmask.value, "123.789.___", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"999.999.999\") - backspace selection start with nomask", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789");
		$.caret(testmask, 3, 7);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);

		equal(testmask.value, "123.789.___", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"999.999.999\") - overtype selection start with nomask", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789");
		$.caret(testmask, 3, 7);
		$("#testmask").Type("1");

		equal(testmask.value, "123.178.9__", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"*****\")", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*****").mask(testmask);

		testmask.focus();

		$("#testmask").Type("abe");
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").Type("cd");

		equal(testmask.value, "abcde", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"d/m/y\")", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("d/m/y").mask(testmask);

		testmask.focus();

		$("#testmask").Type("23031973");
		$.caret(testmask, 5);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

		equal(testmask.value, "23/0_/1973", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"(999)999-9999\") - ruslanfedoseenko mask", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(999)999-9999").mask(testmask);

		testmask.focus();

		testmask.value = "9999999999";
		$.caret(testmask, 4, 5);
		$("#testmask").Type("7");
		equal(testmask.value, "(999)999-9999", "Result " + testmask.value);
		$("#testmask").remove();
	});
	test("inputmask(\"(999)999-9999\") - insert false - ruslanfedoseenko mask", function() {
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
		equal(testmask.value, "(999)999-9999", "Result " + testmask.value);
		$("#testmask").remove();
	});

	test("inputmask(\"\") - empty mask - andywolk", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("").mask(testmask);

		testmask.focus();
		$("#testmask").val("123");
		equal(testmask.value, "123", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("Intergroup selection - dhilt", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("dd/mm/yyyy").mask(testmask);

		testmask.focus();
		$("#testmask").Type("23314");

		$.caret(testmask, 4, 7);
		$("#testmask").SendKey("6");
		equal(testmask.value, "23/06/y014", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("Delete selection with non-masks", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(999)999-9999").mask(testmask);

		testmask.focus();
		$("#testmask").Type("9999999999");

		$.caret(testmask, 8, 11);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		equal(testmask.value, "(999)999-99__", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("Selection and backspace also deletes previous - kenaku", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999 99 99 999").mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234567890");

		$.caret(testmask, 2, 3);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		equal(testmask.value, "124 56 78 90_", "Result " + testmask.value);

		$("#testmask").remove();
	});


	module("Non-greedy masks");
	test("inputmask(\"*\", { greedy: false, repeat: \"*\" }) - replace cd with 1", function() {
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
		equal(testmask.value, "ab1ef", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"*\", { greedy: false, repeat: \"*\" }) - type abcdef", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*", {
			greedy: false,
			repeat: "*"
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("abcdef");

		equal(testmask.value, "abcdef", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"A.\", { repeat: \"*\" }) - type abc - joostburg", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("A.", {
			repeat: "*"
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("abc");

		equal(testmask.value, "A.B.C.", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("{ mask: \"A\", placeholder: \"\", repeat: 16 }) - type testtest - glosswordteam", function() {
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

		equal(testmask.value, "TESTTEST", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("{ mask: \"A\", repeat: 16, greedy: false }) - type testtest - glosswordteam", function() {
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

		equal(testmask.value, "TESTTEST", "Result " + testmask.value);

		$("#testmask").remove();
	});

	module("greedy masks");
	test("inputmask(\"*\", { greedy: true, repeat: 10, clearMaskOnLostFocus: false  })", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*", {
			greedy: true,
			repeat: 10,
			clearMaskOnLostFocus: false
		}).mask(testmask);

		testmask.focus();
		equal($("#testmask")[0].inputmask._valueGet(), "__________", "Result " + $("#testmask")[0].inputmask._valueGet());

		$("#testmask").remove();
	});
	test("inputmask(\"*\", { greedy: true, repeat: 10 }) - type 12345678901234567890", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("*", {
			greedy: true,
			repeat: 10
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345678901234567890");

		equal(testmask.value, "1234567890", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask(\"9,99\", { greedy: true, repeat: 5 }) - type 12345678901234567890", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9,99", {
			greedy: true,
			repeat: 5
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345678901234567890");

		equal(testmask.value, "1,234,567,890,123,45", "Result " + testmask.value);

		$("#testmask").remove();
	});

	test("inputmask({ mask: \"9\", repeat: 10, placeholder: \"\", numericInput: true }) - greedy true with empty placeholder - type 12345", function() {
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

		equal(testmask.value, "12345", "Result " + testmask.value);

		$("#testmask").remove();
	});

	asyncTest("creditcard switch - pchelailya", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9999 9999 9999 9999").mask(testmask);
		$("#testmask").on("keyup", function(event) {
			var value = this.inputmask.unmaskedvalue();

			if (value != null && value.length === 2 && value === "37") {
				Inputmask("9999 999999 99999").mask(this);
			}
		});
		testmask.focus();
		$("#testmask").Type("37");
		setTimeout(function() {
			$("#testmask").Type("12");
			start();
			equal(testmask.value, "3712 ______ _____", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	test("maskscache - same mask diff definitions - StonesEditeurs", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "Z{1,*}",
			definitions: {
				'Z': {
					validator: function(chrs, buffer, pos, strict, opts) {
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
					validator: function(chrs, buffer, pos, strict, opts) {
						return {
							pos: pos,
							c: 'B'
						}; // <= another definition
					},
				}
			}
		}).mask(testmask);

		$("#testmask").Type("abcdef");
		equal(document.getElementById("testmask").inputmask._valueGet(), "BBBBBB", "Result " + document.getElementById("testmask").inputmask._valueGet());
		$("#testmask").remove();
	});
});
