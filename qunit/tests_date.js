import {keys} from "../lib/keycode";

export default function (qunit, Inputmask) {
	var $ = Inputmask.dependencyLib;

	function pad (val, len) {
		val = String(val);
		len = len || 2;
		while (val.length < len) val = "0" + val;
		return val;
	}

	qunit.module("Date.Extensions - dd/mm/yyyy");
	qunit.test("valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");

		assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
	});
	qunit.test("invalid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("abcdefghijklmnop");

		assert.equal(testmask.value, "", "Result " + testmask.value);
	});
	qunit.test("overtype valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$.caret(testmask, 0, "23/03/1973".length);
		$("#testmask").Type("04102017");

		assert.equal(testmask.value, "04/10/2017", "Result " + testmask.value);
	});
	qunit.test("overtype invalid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$.caret(testmask, 0, "23/03/1973".length);
		$("#testmask").Type("abcdefghijklmnop");

		assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
	});
	qunit.test("insert current date", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").SendKey(keys.ArrowRight, keys.Control);
		var today = new Date();
		today = pad(today.getDate(), 2) + "/" + pad(parseInt(today.getMonth()) + 1, 2) + "/" + today.getFullYear();
		assert.equal(testmask.value, today, "Result " + testmask.value);
	});
	qunit.test("backspace year", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);

		assert.equal(testmask.value, "23/03/yyyy", "Result " + testmask.value);
	});
	qunit.test("delete year", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$.caret(testmask, "23/03/".length);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);

		assert.equal(testmask.value, "23/03/yyyy", "Result " + testmask.value);
	});
	qunit.test("set date 592017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("592017");
		assert.equal(testmask.value, "05/09/2017", "Result " + testmask.value);
	});
	qunit.test("set date 01/01/1800 min date 01/01/1900 - max: 31/12/2017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900",
			max: "31/12/2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011800");
		assert.equal(testmask.value, "01/01/1yyy", "Result " + testmask.value);
	});
	qunit.test("set date 01/01/1800 min date 01/01/1900 max date 31/12/1900", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900",
			max: "31/12/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011800");
		assert.equal(testmask.value, "01/01/1yyy", "Result " + testmask.value);
	});
	qunit.test("set date 01/01/2018 max date 31/12/2017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900",
			max: "31/12/2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01012018");
		assert.equal(testmask.value, "01/01/201y", "Result " + testmask.value);
	});
	qunit.test("set date 01/01/1900 min date 01/01/1900", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900",
			max: "31/12/2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011900");
		assert.equal(testmask.value, "01/01/1900", "Result " + testmask.value);
	});
	qunit.test("set date 31/12/2017 max date 31/12/2017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900",
			max: "31/12/2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("31122017");
		assert.equal(testmask.value, "31/12/2017", "Result " + testmask.value);
	});

	qunit.test("min 14/02/1938 max 14/02/2038 enter 01011939", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "14/02/1938",
			max: "14/02/2038"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011939");
		assert.equal(testmask.value, "01/01/1939", "Result " + testmask.value);
	});

	qunit.test("overtype fuzzy valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$.caret(testmask, 0, "23/03/1973".length);
		$("#testmask").Type("882018");

		assert.equal(testmask.value, "08/08/2018", "Result " + testmask.value);
	});

	qunit.test("Autocorrect, select all type 2", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("4");
		$.caret(testmask, 0, "dd/mm/yyyy".length);
		$("#testmask").Type("2");


		assert.equal(testmask.value, "2d/mm/yyyy", "Result " + testmask.value);
	});

	qunit.test("Prefill year - DeepaSunil86 - #2266", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("23320");

		assert.equal(testmask.value, "23/03/" + new Date().getFullYear(), "Result " + testmask.value);
	});

	qunit.test("Prefill year - with min - DeepaSunil86 - #2266", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy",
			min: "01/01/2019"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2332019");

		assert.equal(testmask.value, "23/03/2019", "Result " + testmask.value);
	});

	qunit.module("Date.Extensions - mm/dd/yyyy");
	qunit.test("valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("3231973");

		assert.equal(testmask.value, "03/23/1973", "Result " + testmask.value);
	});
	qunit.test("invalid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("abcdefghijklmnop");

		assert.equal(testmask.value, "", "Result " + testmask.value);
	});
	qunit.test("overtype valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("3231973");
		$.caret(testmask, 0, "03/23/1973".length);
		$("#testmask").Type("10042017");

		assert.equal(testmask.value, "10/04/2017", "Result " + testmask.value);
	});
	qunit.test("overtype invalid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("3231973");
		$.caret(testmask, 0, "03/23/1973".length);
		$("#testmask").Type("abcdefghijklmnop");

		assert.equal(testmask.value, "03/23/1973", "Result " + testmask.value);
	});
	qunit.test("insert current date", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").SendKey(keys.ArrowRight, keys.Control);
		var today = new Date();
		today = pad(parseInt(today.getMonth()) + 1, 2) + "/" + pad(today.getDate(), 2) + "/" + today.getFullYear();
		assert.equal(testmask.value, today, "Result " + testmask.value);
	});
	qunit.test("backspace year", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("3231973");
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);

		assert.equal(testmask.value, "03/23/yyyy", "Result " + testmask.value);
	});
	qunit.test("delete year", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("3231973");
		$.caret(testmask, "03/23/".length);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);

		assert.equal(testmask.value, "03/23/yyyy", "Result " + testmask.value);
	});
	qunit.test("set date 952017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("952017");
		assert.equal(testmask.value, "09/05/2017", "Result " + testmask.value);
	});
	qunit.test("set date 01/01/1800 min date 01/01/1900", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900",
			max: "12/31/2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011800");
		assert.equal(testmask.value, "01/01/1yyy", "Result " + testmask.value);
	});
	qunit.test("set date 01/01/2018 max date 12/31/2017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900",
			max: "12/31/2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01012018");
		assert.equal(testmask.value, "01/01/201y", "Result " + testmask.value);
	});
	qunit.test("set date 01/01/1900 min date 01/01/1900", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900",
			max: "12/31/2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011900");
		assert.equal(testmask.value, "01/01/1900", "Result " + testmask.value);
	});
	qunit.test("set date 12/31/2017 max date 12/31/2017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900",
			max: "12/31/2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("12312017");
		assert.equal(testmask.value, "12/31/2017", "Result " + testmask.value);
	});

	qunit.test("min 02/14/1938 max 02/14/2038 enter 01011939", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "02/14/1938",
			max: "02/14/2038"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011939");
		assert.equal(testmask.value, "01/01/1939", "Result " + testmask.value);
	});

	qunit.test("overtype fuzzy valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("3231973");
		$.caret(testmask, 0, "03/23/1973".length);
		$("#testmask").Type("882018");

		assert.equal(testmask.value, "08/08/2018", "Result " + testmask.value);
	});

	qunit.test("Prefill year - DeepaSunil86 - #2266", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("32320");

		assert.equal(testmask.value, "03/23/" + new Date().getFullYear(), "Result " + testmask.value);
	});

	qunit.test("Prefill year - with min - DeepaSunil86 - #2266", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
			min: "01/01/2019"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("3232019");

		assert.equal(testmask.value, "03/23/2019", "Result " + testmask.value);
	});

	qunit.test("Datetime inputFormat mm/dd/yyyy allows entry of 02/3 without padding the day - Josh68 - #1922", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "mm/dd/yyyy",
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("232020");

		assert.equal(testmask.value, "02/03/2020", "Result " + testmask.value);
	});

	qunit.module("Date.Extensions - dd.mm.yyyy");
	qunit.test("valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");

		assert.equal(testmask.value, "23.03.1973", "Result " + testmask.value);
	});
	qunit.test("invalid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("abcdefghijklmnop");

		assert.equal(testmask.value, "", "Result " + testmask.value);
	});
	qunit.test("overtype valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$.caret(testmask, 0, "23.03.1973".length);
		$("#testmask").Type("04102017");

		assert.equal(testmask.value, "04.10.2017", "Result " + testmask.value);
	});
	qunit.test("overtype invalid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$.caret(testmask, 0, "23.03.1973".length);
		$("#testmask").Type("abcdefghijklmnop");

		assert.equal(testmask.value, "23.03.1973", "Result " + testmask.value);
	});
	qunit.test("insert current date", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").SendKey(keys.ArrowRight, keys.Control);
		var today = new Date();
		today = pad(today.getDate(), 2) + "." + pad(parseInt(today.getMonth()) + 1, 2) + "." + today.getFullYear();
		assert.equal(testmask.value, today, "Result " + testmask.value);
	});
	qunit.test("backspace year", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);

		assert.equal(testmask.value, "23.03.yyyy", "Result " + testmask.value);
	});
	qunit.test("delete year", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$.caret(testmask, "23.03.".length);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);
		$("#testmask").SendKey(keys.Delete);

		assert.equal(testmask.value, "23.03.yyyy", "Result " + testmask.value);
	});
	qunit.test("set date 592017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("592017");
		assert.equal(testmask.value, "05.09.2017", "Result " + testmask.value);
	});
	qunit.test("set date 01.01.1800 min date 01.01.1900", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900",
			max: "31.12.2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011800");
		assert.equal(testmask.value, "01.01.1yyy", "Result " + testmask.value);
	});
	qunit.test("set date 01.01.2018 max date 31.12.2017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900",
			max: "31.12.2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01012018");
		assert.equal(testmask.value, "01.01.201y", "Result " + testmask.value);
	});
	qunit.test("set date 01/01/1900 min date 01/01/1900", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900",
			max: "31.12.2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011900");
		assert.equal(testmask.value, "01.01.1900", "Result " + testmask.value);
	});
	qunit.test("set date 31.12.2017 max date 31.12.2017", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900",
			max: "31.12.2017"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("31122017");
		assert.equal(testmask.value, "31.12.2017", "Result " + testmask.value);
	});

	qunit.test("min 14.02.1938 max 14.02.2038 enter 01011939", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "14.02.1938",
			max: "14.02.2038"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("01011939");
		assert.equal(testmask.value, "01.01.1939", "Result " + testmask.value);
	});

	qunit.test("overtype fuzzy valid entry", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd.mm.yyyy",
			min: "01.01.1900"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("2331973");
		$.caret(testmask, 0, "23.03.1973".length);
		$("#testmask").Type("882018");

		assert.equal(testmask.value, "08.08.2018", "Result " + testmask.value);
	});

	qunit.module("Date.Extensions - yyyy-mm-dd");
	qunit.test("date format yyyy-mm-dd doesn't work with min and max #2360", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask({
			alias: "datetime",
			inputFormat: "yyyy-mm-dd",
			min: "1950-01-01",
			max: "1999-12-31",
			clearIncomplete: true,
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("19500101");

		assert.equal(testmask.value, "1950-01-01", "Result " + testmask.value);
	});
	qunit.test("date format yyyy-mm-dd doesn't work with min and max #2360", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask({
			alias: "datetime",
			inputFormat: "yyyy-mm-dd",
			min: "1950-01-01",
			max: "1999-12-31",
			clearIncomplete: true,
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("20001231");

		assert.equal(testmask.value, "1yyy-mm-dd", "Result " + testmask.value);
	});

	qunit.test("date format yyyy-mm-dd doesn't work with min and max #2360", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask({
			alias: "datetime",
			inputFormat: "yyyy-mm-dd",
			min: "1950-01-01",
			max: "1999-12-31",
			clearIncomplete: true,
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("19991231");

		assert.equal(testmask.value, "1999-12-31", "Result " + testmask.value);
	});

	qunit.module("Date.Extensions - HH:MM:ss");
	qunit.test("HH:MM:SS - enter 111111", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM:ss"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("111111");
		assert.equal(testmask.value, "11:11:11", "Result " + testmask.value);
	});

	qunit.test("HH:MM:SS - enter 222222", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM:ss"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("222222");
		assert.equal(testmask.value, "22:22:22", "Result " + testmask.value);
	});
	qunit.test("HH:MM:SS - enter 333333", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM:ss"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("333333");
		assert.equal(testmask.value, "03:33:33", "Result " + testmask.value);
	});

	qunit.test("HH:MM:SS - enter 235959", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM:ss"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("235959");
		assert.equal(testmask.value, "23:59:59", "Result " + testmask.value);
	});

	qunit.test("HH:MM:SS - enter 245959", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM:ss"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("245959");
		assert.equal(testmask.value, "2H:MM:ss", "Result " + testmask.value);
	});

	qunit.test("HH:MM:SS - enter 235959 - backspace all", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM:ss"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("235959");

		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);

		assert.equal(testmask.value, "", "Result " + testmask.value);
	});

	qunit.test("HH:MM - setval 14:02", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM"
		}).mask(testmask);

		$("#testmask").val("14:02");
		assert.equal(testmask.value, "14:02", "Result " + testmask.value);
	});
	qunit.module("Date.Extensions - misc");
	qunit.test("HH:MM minmax 10:00 - 11:10 enter 1059", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM",
			min: "10:00",
			max: "11:10"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("1059");
		assert.equal(testmask.value, "10:59", "Result " + testmask.value);
	});

	qunit.test("HH:MM minmax 10:00 - 11:10 enter 1230", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM",
			min: "10:00",
			max: "11:10"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").val("1230");
		assert.equal(testmask.value, "10:MM", "Result " + testmask.value);
	});

	qunit.test("hh:MM TT type 99a - goto first pos - type 1", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "hh:MM TT"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("99a");
		$.caret(testmask, 0);
		$("#testmask").Type("1");
		assert.equal(testmask.value, "10:09 AM", "Result " + testmask.value);
	});

	qunit.test("HH:MM:ss - Autocorrect, select all type 2", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM:ss"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("24");
		$.caret(testmask, 0, "HH:MM:ss".length);
		$("#testmask").Type("2");


		assert.equal(testmask.value, "2H:MM:ss", "Result " + testmask.value);
	});

	qunit.test("HH:MM:ss - Autocorrect, backspace all type 2 - #2194", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "HH:MM:ss"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("24");
		$.caret(testmask, "HH:".length);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").SendKey(keys.Backspace);
		$("#testmask").Type("2");


		assert.equal(testmask.value, "2H:MM:ss", "Result " + testmask.value);
	});

	qunit.test("24 hour format with 24:00 inclusive - #2272", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "H2:MM",
			max: "24:00",
			placeholder: "HH:MM"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("23:59");

		assert.equal(testmask.value, "23:59", "Result " + testmask.value);
	});

	qunit.test("yearfill bug - hoesein - #1966", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd-mm-yyyy",
			placeholder: "_",
			clearIncomplete: true,
			min: "09-09-0999", max: "04-02-2020"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("01122019");

		assert.equal(testmask.value, "01-12-2019", "Result " + testmask.value);
	});

	qunit.test("leapyear bug - #2286", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			"placeholder": "mm/dd/yyyy HH:MM",
			"inputFormat": "mm/dd/yyyy HH:MM",
			"min": "01/01/1753 00:00",
			"max": "03/03/2020 23:59"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("02/29/2012 10:25");

		assert.equal(testmask.value, "02/29/2012 10:25", "Result " + testmask.value);
	});

	qunit.test("leapyear bug jitMasking true - #2453", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			"inputFormat": "mm/dd/yyyy",
			jitMasking: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("02/29/2020");

		assert.equal(testmask.value, "02/29/2020", "Result " + testmask.value);
	});

	qunit.test("dd/mm/yyyy type 3022 - #2456", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			"inputFormat": "dd/mm/yyyy"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("3022");

		assert.equal(testmask.value, "30/mm/yyyy", "Result " + testmask.value);
	});

	qunit.test("leapyear bug - when placeholder is defined to space cant type 2 after type 29/0 - #2451", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			"placeholder": " ",
			"inputFormat": "dd/mm/yyyy",
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("29/02/2012");

		assert.equal(testmask.value, "29/02/2012", "Result " + testmask.value);
	});

	qunit.test("leapyear bug - when placeholder is defined cant type 2 after type 0 - #2451", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			"placeholder": " ",
			"inputFormat": "mm/dd/yyyy",
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("02/29/2012");

		assert.equal(testmask.value, "02/29/2012", "Result " + testmask.value);
	});

	qunit.test("H2:MM min 12:59- #2297", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "H2:MM",
			placeholder: "0",
			min: "12:59",
			max: "33:33"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12:44");

		assert.equal(testmask.value, "12:00", "Result " + testmask.value);
	});

	qunit.test("Min Max AMPM- #2297", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy hh:MM:ss TT",
			placeholder: "DD/MM/YYYY hh:mm:ss XM",
			min: "30/03/2020 12:00:00 AM",
			max: "30/03/2020 11:59:59 PM",
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("30/03/2020 11:00:00 AM");

		assert.equal(testmask.value, "30/03/2020 11:00:00 AM", "Result " + testmask.value);
	});

	qunit.test("Min Max AMPM- #2297", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy hh:MM:ss TT",
			placeholder: "DD/MM/YYYY hh:mm:ss XM",
			min: "30/03/2020 12:00:00 AM",
			max: "30/03/2020 11:59:59 PM",
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("30/03/2020 12:00:00 AM");

		assert.equal(testmask.value, "30/03/2020 12:00:00 AM", "Result " + testmask.value);
	});

	qunit.test("Min Max AMPM- #2297", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" />");
		var testmask = document.getElementById("testmask");
		Inputmask("datetime", {
			inputFormat: "dd/mm/yyyy hh:MM:ss TT",
			placeholder: "DD/MM/YYYY hh:mm:ss XM",
			min: "30/03/2020 12:00:00 AM",
			max: "30/03/2020 11:59:59 PM",
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("30/03/2020 11:00:00 PM");

		assert.equal(testmask.value, "30/03/2020 11:00:00 PM", "Result " + testmask.value);
	});
}
