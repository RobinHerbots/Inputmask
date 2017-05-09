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

	qunit.module("Optional");
	qunit.test("inputmask(\"(99) 9999[9]-99999\") - input 121234-12345", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(99) 9999[9]-99999").mask(testmask);

		testmask.focus();
		$("#testmask").Type("121234-12345");

		assert.equal(testmask.value, "(12) 1234-12345", "Result " + testmask.value);
	});
	qunit.test("inputmask(\"(99) 9999[9]-99999\") - input 121234512345", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(99) 9999[9]-99999").mask(testmask);

		testmask.focus();
		$("#testmask").Type("121234512345");

		assert.equal(testmask.value, "(12) 12345-12345", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"99999[-9999]\", greedy: true }) - input 123", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99999[-9999]",
			greedy: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123");
		assert.equal(testmask.value, "123__", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99999[-9999]",
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123");
		assert.equal(testmask.value, "123__", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 12345", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99999[-9999]",
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12345");
		assert.equal(testmask.value, "12345", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99999[-9999]",
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		assert.equal(testmask.value, "12345-6", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456789", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99999[-9999]",
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456789");
		assert.equal(testmask.value, "12345-6789", "Result " + testmask.value);
	});

	qunit.test("inputmask(\"9[9][9] 999[9] 9999\") - input 123123 space 1234 - vipink70", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9[9][9] 999[9] 9999").mask(testmask);

		testmask.focus();
		$("#testmask").Type("123123");
		$("#testmask").SendKey(Inputmask.keyCode.SPACE);
		$("#testmask").Type("1234");
		assert.equal(testmask.value, "123 123 1234", "Result " + testmask.value);
	});

	qunit.test("inputmask('[9-]AAA.999') ", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('[9-]AAA.999').mask(testmask);

		$("#testmask").Type("1abc123");
		$.caret(testmask, 4, 5);
		$("#testmask").Type("d");
		assert.equal(testmask.value, "1-ABD.123", "Result " + testmask.value);
	});

	qunit.test("inputmask('9[9]:99') ", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('9[9]:99').mask(testmask);

		$("#testmask").Type("3:44");
		$.caret(testmask, 1);
		$("#testmask").Type("3");
		assert.equal(testmask.value, "33:44", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"99999[-9999]\", greedy: false }) - input 123456", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99999[-9999]",
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		testmask.blur();
		$("#testmask").trigger("mouseenter");
		assert.equal(testmask.value, "12345-6___", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"9'9{1,2}\"\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "9'9{1,2}\"",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12");
		testmask.blur();
		assert.equal(testmask.value, "1'2\"", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"99{1,2}lb\\s\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99{1,2}lb\\s",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12");
		testmask.blur();
		assert.equal(testmask.value, "12lbs", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"9'9[9]\"\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "9'9[9]\"",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12");
		testmask.blur();
		assert.equal(testmask.value, "1'2\"", "Result " + testmask.value);
	});

	qunit.test("inputmask({ mask: \"99[9]lb\\s\", greedy: false, skipOptionalPartCharacter: \"\", \"clearIncomplete\": true  }) - input 12 blur - thomstark", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99[9]lb\\s",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12");
		testmask.blur();
		assert.equal(testmask.value, "12lbs", "Result " + testmask.value);
	});


	qunit.test(".inputmask(\"99999[-9999]\", { greedy: false }); - type 123456 backspace iscomplete?", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99999[-9999]", {
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		assert.equal(testmask.inputmask.isComplete(), true, "Result " + testmask.inputmask.isComplete());
	});

	qunit.test(".inputmask(\"99999[-9999]\", { greedy: false }); type 123456 backspace blur", function (assert) {
		var $fixture = $("#qunit-fixture"), done = assert.async();
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99999[-9999]", {
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		testmask.blur();
		setTimeout(function () {
			assert.equal($("#testmask")[0].inputmask._valueGet(), "12345", "Result " + $("#testmask")[0].inputmask._valueGet());
			done();
		}, 0);
	});

	qunit.test(".inputmask(\"99999[-9999]\", { greedy: false, autoUnmask: true }); type 123456 backspace", function (assert) {
		var $fixture = $("#qunit-fixture"), done = assert.async();
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("99999[-9999]", {
			greedy: false,
			autoUnmask: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		setTimeout(function () {
			assert.equal(testmask.value, "12345", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test(".inputmask('999-999-9999[ ext 9{1,5}]'); - type 12345678901 backspace iscomplete? - antch", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('999-999-9999[ ext 9{1,5}]').mask(testmask);

		testmask.focus();
		$("#testmask").Type("12345678901");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		assert.equal(testmask.inputmask.isComplete(), true, "Result " + testmask.inputmask.isComplete());
	});

	qunit.test("inputmask({ mask: \"9999[ 9999][ 9999]\"}) - input 1234 space space - GMTA", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "9999[ 9999][ 9999]"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234  ");
		assert.equal(testmask.value, "1234", "Result " + testmask.value);
	});

	qunit.test("9999[ 9999][ 9999][ 9999][ 999] - Enfree", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: '9999[ 9999][ 9999][ 9999][ 999]',
			placeholder: '', greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("45464748");
		$.caret(testmask, 2);
		$("#testmask").Type("0909");

		assert.equal(testmask.value, "4509 0946 4748", "Result " + testmask.value);
	});

})
;
