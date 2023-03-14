import {keys} from "../lib/keycode";

export default function (qunit, Inputmask) {
	var $ = Inputmask.dependencyLib;
	qunit.module("Alternations");

	qunit.test("\"9{1,2}C|S A{1,3} 9{4}\" - ankitajain32", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("9{1,2}C|S A{1,3} 9{4}").mask(testmask);
		$("#testmask").Type("12Cabc1234");
		assert.equal(testmask.inputmask._valueGet(), "12C ABC 1234", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("\"9{1,2}C|S A{1,3} 9{4}\" replace C with S - ankitajain32", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("9{1,2}C|S A{1,3} 9{4}").mask(testmask);
		$("#testmask").Type("12Cabc1234");
		$.caret(testmask, 2, 3);
		$("#testmask").Type("S");
		assert.equal(testmask.inputmask._valueGet(), "12S ABC 1234", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("nested alternations 1", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("0<2)##-##-##>|<3<4)#-##-##>|<5)#-##-##>|<6)#-##-##>>", {
			groupmarker: ["<", ">"]
		}).mask(testmask);

		$("#testmask").Type("02121212");

		assert.equal(testmask.inputmask._valueGet(), "02)12-12-12", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("nested alternations 2", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("0<2)##-##-##>|<3<4)#-##-##>|<5)#-##-##>|<6)#-##-##>>", {
			groupmarker: ["<", ">"]
		}).mask(testmask);

		$("#testmask").Type("03411212");

		assert.equal(testmask.inputmask._valueGet(), "034)1-12-12", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("nested alternations 3", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("0<2)##-##-##>|<3<4)#-##-##>|<5)#-##-##>|<6)#-##-##>>", {
			groupmarker: ["<", ">"]
		}).mask(testmask);

		$("#testmask").Type("03511212");

		assert.equal(testmask.inputmask._valueGet(), "035)1-12-12", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("nested alternations 4", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("0<2)##-##-##>|<3<4)#-##-##>|<5)#-##-##>|<6)#-##-##>>", {
			groupmarker: ["<", ">"]
		}).mask(testmask);

		$("#testmask").Type("03611212");

		assert.equal(testmask.inputmask._valueGet(), "036)1-12-12", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("alternations W|XY|Z", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("W|XY|Z").mask(testmask);

		$("#testmask").Type("WZ");

		assert.equal(testmask.inputmask._valueGet(), "WZ", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("alternations (W)|(X)(Y)|(Z)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(W)|(X)(Y)|(Z)").mask(testmask);

		$("#testmask").Type("WZ");

		assert.equal(testmask.inputmask._valueGet(), "WZ", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("alternations (9{1,3}|SE|NE|SW|NW)-9{1,3} - yesman85", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(9{1,3}|SE|NE|SW|NW)-9{1,3}").mask(testmask);

		$("#testmask").Type("(NE123");

		assert.equal(testmask.inputmask._valueGet(), "NE-123", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("((S))", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("((S))").mask(testmask);
		testmask.focus();
		setTimeout(function () {
			assert.equal(testmask.inputmask._valueGet(), "((S))", "Result " + testmask.inputmask._valueGet());
			done();
		}, 0);
	});
	qunit.test("((S)", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("((S)").mask(testmask);
		testmask.focus();
		setTimeout(function () {
			assert.equal(testmask.inputmask._valueGet(), "((S)", "Result " + testmask.inputmask._valueGet());
			done();
		}, 0);
	});

	qunit.test("+371-99-999-999 - artemkaint", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask([
			"+371-99-999-999",
			"+370(999)99-999",
			"+375(99)999-99-99",
			"+374-99-999-999",
			"+380(99)999-99-99",
			"+358(999)999-99-99",
			"+373-9999-9999",
			"+381-99-999-9999"
		], {
			keepStatic: false
		}).mask(testmask);
		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("7112123123");
			assert.equal(testmask.inputmask._valueGet(), "+371-12-123-123", "Result " + testmask.inputmask._valueGet());
			done();
		}, 0);
	});
	qunit.test("+374-99-999-999 - artemkaint", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask([
			"+371-99-999-999",
			"+370(999)99-999",
			"+375(99)999-99-99",
			"+374-99-999-999",
			"+380(99)999-99-99",
			"+358(999)999-99-99",
			"+373-9999-9999",
			"+381-99-999-9999"
		], {
			keepStatic: false
		}).mask(testmask);
		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("7412123123");
			assert.equal(testmask.inputmask._valueGet(), "+374-12-123-123", "Result " + testmask.inputmask._valueGet());
			done();
		}, 0);
	});

	qunit.test("+358(999)999-99-99, - artemkaint", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask([
			"+371-99-999-999",
			"+370(999)99-999",
			"+375(99)999-99-99",
			"+374-99-999-999",
			"+380(99)999-99-99",
			"+358(999)999-99-99",
			"+373-9999-9999",
			"+381-99-999-9999"
		], {
			keepStatic: false
		}).mask(testmask);
		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("51231231212");
			assert.equal(testmask.inputmask._valueGet(), "+358(123)123-12-12", "Result " + testmask.inputmask._valueGet());
			done();
		}, 0);
	});


	qunit.test("(9)|(a9) - type 1 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(9)|(a9)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("12");
		assert.equal(testmask.inputmask._valueGet(), "1", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(9)|(a9) - type a1 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(9)|(a9)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("a1");
		assert.equal(testmask.inputmask._valueGet(), "a1", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(999)|(0aa) - type 0ab - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(999)|(0aa)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("0ab");
		assert.equal(testmask.inputmask._valueGet(), "0ab", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(999)|(0aa) - type 1ab - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(999)|(0aa)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("1ab");
		assert.equal(testmask.inputmask._valueGet(), "1__", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(9)|(09)|(19)|(2f) - type 41 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(9)|(09)|(19)|(2f)", {
			definitions: {
				"f": {validator: "[0-3]"}
			}
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("41");
		assert.equal(testmask.inputmask._valueGet(), "4", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(9)|(09)|(19)|(2f) - type 01 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(9)|(09)|(19)|(2f)", {
			definitions: {
				"f": {validator: "[0-3]"}
			}
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("01");
		assert.equal(testmask.inputmask._valueGet(), "01", "Result " + testmask.inputmask._valueGet());
	});
	qunit.test("(9)|(09)|(19)|(2f) - type 11 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(9)|(09)|(19)|(2f)", {
			definitions: {
				"f": {validator: "[0-3]"}
			}
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("11");
		assert.equal(testmask.inputmask._valueGet(), "11", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(9)|(09)|(19)|(2f) - type 23 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(9)|(09)|(19)|(2f)", {
			definitions: {
				"f": {validator: "[0-3]"}
			}
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("23");
		assert.equal(testmask.inputmask._valueGet(), "23", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(9|09|19|2f) - type 24 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(9|09|19|2f)", {
			definitions: {
				"f": {validator: "[0-3]"}
			}
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("24");
		assert.equal(testmask.inputmask._valueGet(), "2", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(1|2|3)/(4|5)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(1|2|3)/(4|5)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("34");
		assert.equal(testmask.inputmask._valueGet(), "3/4", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(99)|(*a)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(99)|(*a)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("12");
		assert.equal(testmask.inputmask._valueGet(), "12", "Result " + testmask.inputmask._valueGet());
	});
	qunit.test("(99)|(*a)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(99)|(*a)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("1a");
		assert.equal(testmask.inputmask._valueGet(), "1a", "Result " + testmask.inputmask._valueGet());
	});
	qunit.test("(99)|(*a)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(99)|(*a)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("ab");
		assert.equal(testmask.inputmask._valueGet(), "ab", "Result " + testmask.inputmask._valueGet());
	});
	qunit.test("(99)|(*a)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(99)|(*a)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("a2");
		assert.equal(testmask.inputmask._valueGet(), "a_", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("regex: \"([0-9]{2})|([a-z0-9][a-z])\"", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask({regex: "([0-9]{2})|([a-z0-9][a-z])"}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("a2");
		assert.equal(testmask.inputmask._valueGet(), "a_", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("9|(9a)", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("9|(9a)").mask(testmask);
		testmask.focus();
		$("#testmask").Type("1");
		assert.equal(testmask.inputmask._valueGet(), "1", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("([0]9)|(19)|(2f) - type 26 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("([0]9)|(19)|(2f)", {
			definitions: {
				"f": {validator: "[0-3]"}
			}
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("26");
		assert.equal(testmask.inputmask._valueGet(), "2", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("(0{0,1}9)|(19)|(2f) - type 26 - ivaninDarpatov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("(0{0,1}9)|(19)|(2f)", {
			definitions: {
				"f": {validator: "[0-3]"}
			}
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("26");
		assert.equal(testmask.inputmask._valueGet(), "2", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("+(1|\\90|221) (999) 999 99-99 - type 1 - tcagkansokmen", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("+(1|\\90|221) (999) 999 99-99").mask(testmask);
		testmask.focus();
		$("#testmask").Type("1");
		assert.equal(testmask.inputmask._valueGet(), "+1 (___) ___ __-__", "Result " + testmask.inputmask._valueGet());
	});
	qunit.test("+(1|\\90|221) (999) 999 99-99 - type 9 - tcagkansokmen", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("+(1|\\90|221) (999) 999 99-99").mask(testmask);
		testmask.focus();
		$("#testmask").Type("9");
		assert.equal(testmask.inputmask._valueGet(), "+90 (___) ___ __-__", "Result " + testmask.inputmask._valueGet());
	});
	qunit.test("+(1|\\90|221) (999) 999 99-99 - type 2 - tcagkansokmen", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("+(1|\\90|221) (999) 999 99-99").mask(testmask);
		testmask.focus();
		$("#testmask").Type("2");
		assert.equal(testmask.inputmask._valueGet(), "+221 (___) ___ __-__", "Result " + testmask.inputmask._valueGet());
	});

	qunit.test("+(9| ){0,15} - #2125", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask("+(9| ){0,15}").mask(testmask);
		testmask.focus();
		$("#testmask").Type("123 456");
		assert.equal(testmask.value, "+123 456", "Result " + testmask.value);
	});

	qunit.test("Problems with deleting static chars in alternator mask type b - #2648", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask({
			mask: [
				"BE9{2} 9{3} 9",
				"\\AT9{2} 9{2} 9{2}",
			],
			casing: "upper",
			keepStatic: false
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("at121212");
		$.caret(testmask, 2);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").Type("b");
		assert.equal(testmask.value, "BE12 121 2", "Result " + testmask.value);
	});

	qunit.test("Problems with deleting static chars in alternator mask type a - #2648", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask({
			mask: [
				"BE9{2} 9{3} 9",
				"\\AT9{2} 9{2} 9{2}",
			],
			casing: "upper",
			keepStatic: false
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("at121212");
		$.caret(testmask, 2);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").Type("a");
		assert.equal(testmask.value, "AT12 12 12", "Result " + testmask.value);
	});

	qunit.test("Problems with deleting static chars in alternator mask delete a - #2648", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");

		Inputmask({
			mask: [
				'B9',
				'\\A9 9{1}'
			],
			casing: "upper",
			keepStatic: false
		}).mask(testmask);
		testmask.focus();
		$("#testmask").Type("a12");
		$.caret(testmask, 1);
		$("#testmask").SendKey(keys.Backspace);
		assert.equal(testmask.value, "_1 2", "Result " + testmask.value);
	});
}
