import { keys} from "../lib/keycode";

export default function (qunit, Inputmask) {
	var $ = Inputmask.dependencyLib;

	qunit.module("Direction RTL");
	qunit.test("inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" dir=\"rtl\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").SendKey("1");
			$("#testmask").SendKey("2");
			$("#testmask").SendKey("3");
			$("#testmask").SendKey(keys.ArrowRight);
			$("#testmask").SendKey(keys.ArrowRight);
			$("#testmask").SendKey(keys.ArrowRight);
			$("#testmask").SendKey(keys.Backspace);
			$("#testmask").SendKey("4");
			$("#testmask").SendKey(keys.ArrowLeft);
			$("#testmask").SendKey("5");
			$("#testmask").SendKey("6");
			assert.equal(testmask.value, "___._65.341", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" dir=\"rtl\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").SendKey("1");
			$("#testmask").SendKey("2");
			$("#testmask").SendKey("3");
			$("#testmask").SendKey(keys.ArrowRight);
			$("#testmask").SendKey(keys.ArrowRight);
			$("#testmask").SendKey(keys.Delete);
			$("#testmask").SendKey("4");
			$("#testmask").SendKey(keys.ArrowLeft);
			$("#testmask").SendKey("5");
			$("#testmask").SendKey("6");
			assert.equal(testmask.value, "___._65.341", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask(\"999-aaa-999\")", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" dir=\"rtl\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("999-aaa-999").mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("123abc12");
			assert.equal(testmask.value, "_21-cba-321", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask(\"999-999-999\") - replace selection", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" dir=\"rtl\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("999-999-999").mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("123456789");
			$.caret(testmask, 4, 7);
			$("#testmask").Type("5");
			assert.equal(testmask.value, "__9-875-321", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask(\"999-999-999\") - replace selection with backspace", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" dir=\"rtl\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("999-999-999").mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("123456789");
			$.caret(testmask, 4, 7);
			$("#testmask").SendKey(keys.Backspace);
			$("#testmask").Type("5");
			assert.equal(testmask.value, "__9-875-321", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask(\"999-999-999\") - replace selection - with delete", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" dir=\"rtl\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("999-999-999").mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("123456789");
			$.caret(testmask, 4, 7);
			$("#testmask").SendKey(keys.Delete);
			$("#testmask").Type("5");
			assert.equal(testmask.value, "__9-875-321", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.module("Numeric Input");
	qunit.test("inputmask({ mask: \"9\", numericInput: true, repeat: 10, greedy: true }); - 1234567890", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "9",
			numericInput: true,
			repeat: 10,
			greedy: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("1234567890");
			assert.equal(testmask.value, "1234567890", "Result " + testmask.value);
			done();

		}, 0);
	});
	qunit.test("inputmask({ mask: \"9\", numericInput: true, repeat: 10, greedy: true }); - replace selection", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "9",
			numericInput: true,
			repeat: 10,
			greedy: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("1234567890");
			$.caret(testmask, 3, 6);
			$("#testmask").Type("5");
			assert.equal(testmask.value, "__12357890", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: \"99-99-99\", numericInput: true }); - 1234567890", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99-99-99",
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("1234567890");
			assert.equal(testmask.value, "12-34-56", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: \"€ 999.999.999,99\", numericInput: true }); - 123", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("€ 999.999.999,99", {
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("123");
			assert.equal(testmask.value, "€ ___.___.__1,23", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: \"€ 999.999.999,99\", numericInput: true }); - 123 position before 456", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("€ 999.999.999,99", {
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("123");
			$.caret(testmask, 12);
			$("#testmask").Type("456");
			assert.equal(testmask.value, "€ ___.__4.561,23", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: \"€ 999.999.999,99\", { numericInput: true, radixPoint: \",\" }); - 123", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("€ 999.999.999,99", {
			numericInput: true,
			radixPoint: ","
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		;
		setTimeout(function () {
			$("#testmask").Type("123");

			assert.equal(testmask.value, "€ ___.___.__1,23", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: \"€ 999.999.999,99\", { numericInput: true, radixPoint: \",\" }); - 123,45", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("€ 999.999.999,99", {
			numericInput: true,
			radixPoint: ","
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		;
		setTimeout(function () {
			$("#testmask").Type("123,45");

			assert.equal(testmask.value, "€ ___.___.123,45", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: \"9999 t\", { numericInput: true }); - 123 - Joe Rosa", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("9999 t", {
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");

		setTimeout(function () {
			$("#testmask").Type("123");
			assert.equal(testmask.value, "_123 t", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: \"9999 t\", { numericInput: true, autoUnmask: true }); - 70  - Joe Rosa", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("9999 t", {
			numericInput: true,
			autoUnmask: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function () {
			$("#testmask").Type("70");
			assert.equal(testmask.value, "70", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("inputmask({ mask: \"['$9.99', '$99.99', '$999.99', '$9,999.99', '$99,999.99', '$999,999.99', '$9,999,999.99', '$99,999,999.99', '$999,999,999.99'], 'placeholder': ' ', 'numericInput': true, 'rightAlignNumerics': false\" value=\"$100000.00\"", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" data-inputmask=\"'mask': ['$9.99', '$99.99', '$999.99', '$9,999.99', '$99,999.99', '$999,999.99', '$9,999,999.99', '$99,999,999.99', '$999,999,999.99'], 'placeholder': ' ', 'numericInput': true, 'rightAlignNumerics': false\" value=\"$100000.00\"/>");
		var testmask = document.getElementById("testmask");
		Inputmask().mask(testmask);
		setTimeout(function () {
			assert.equal(testmask.value, "$100,000.00", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("cuurency - numericInput: true - 123456 backspace x4", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("currency", {
			numericInput: true,
			prefix: "$ "
		}).mask(testmask);

		testmask.focus();
		setTimeout(function () {
			$("#testmask").Type("123456");
			$("#testmask").SendKey(keys.Backspace);
			$("#testmask").SendKey(keys.Backspace);
			$("#testmask").SendKey(keys.Backspace);
			$("#testmask").SendKey(keys.Backspace);

			assert.equal(testmask.value, "$ 0.12", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("decimal - numericInput: true - initial value 20,00 - Inkeliz", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" value=\"20,00\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			radixPoint: ",",
			rightAlign: false,
			showMaskOnHover: false,
			numericInput: true,
			rightAlignNumerics: false,
			greedy: false
		}).mask(testmask);
		setTimeout(function () {
			assert.equal(testmask.value, "20,00", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency - numericInput: true - initial value 4545.56 - sadhuria", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" value=\"4545.56\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("currency", {
			groupSeparator: ",",
			placeholder: "0.00",
			numericInput: true,
			prefix: "$ "
		}).mask(testmask);

		assert.equal(testmask.value, "$ 4,545.56", "Result " + testmask.value);

	});

	qunit.test("(,999){+|1}.99 - Baiquan", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("(,999){+|1}.99", {
			numericInput: true,
			placeholder: "0"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function () {
			$("#testmask").Type("123456");
			assert.equal(testmask.value, "1,234.56", "Result " + testmask.value);
			done();

		}, 0);

	});
};
