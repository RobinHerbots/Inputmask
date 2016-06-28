define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../extra/phone-codes/phone",
	"../extra/phone-codes/phone-be",
	"../extra/phone-codes/phone-nl",
	"../extra/phone-codes/phone-ru",
	"../extra/phone-codes/phone-uk",
	"../dist/inputmask/inputmask.regex.extensions",
	"prototypeExtensions",
	"simulator"
], function (qunit, $, Inputmask) {

	qunit.module("Phone masks");

	qunit.test("inputmask(\"phone be\") - type \"473890428\"", 1, function (assert) {
		var done = assert.async(), $fixture =$("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");

		Inputmask("phonebe").mask(testmask);
		testmask.focus();
		$("#testmask").Type("473890428");

		setTimeout(function () {
			equal(testmask.value, "+32(473)89-04-28", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"phone be\") - value \"+32473890428\"", 1, function (assert) {
		var done = assert.async(), $fixture =$("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="+32473890428" />');
		Inputmask("phonebe").mask(testmask);
		testmask.focus();
		setTimeout(function () {
			equal(testmask.value, "+32(473)89-04-28", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"phone\") - value=\"+32(473)890-428\"", 1, function (assert) {
		var done = assert.async(), $fixture =$("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="+32(473)890-428" />');
		Inputmask("phone").mask(testmask);

		setTimeout(function () {
			equal(testmask.value, "+32(473)890-428", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"phone\") - value=\"32473890428\"", 1, function (assert) {
		var done = assert.async(), $fixture =$("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="32473890428" />');
		Inputmask("phone").mask(testmask);

		setTimeout(function () {
			equal(testmask.value, "+32(473)890-428", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"phone\") - Brazil new", 1, function (assert) {
		var done = assert.async(), $fixture =$("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="5512123451234" />');
		Inputmask("phone").mask(testmask);

		setTimeout(function () {
			equal(testmask.value, "+55-12-12345-1234", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"phone\") - Brazil old", 1, function (assert) {
		var done = assert.async(), $fixture =$("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="55121234-1234" />');
		Inputmask("phone").mask(testmask);

		setTimeout(function () {
			equal(testmask.value, "+55-12-1234-1234", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"phone\") - Brazil switch", 1, function (assert) {
		var done = assert.async(), $fixture =$("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="55121234-1234" />');
		Inputmask("phone").mask(testmask);

		testmask.focus();
		$.caret(testmask, $("#testmask")[0].value.length); //for FF
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").Type("451234");
		setTimeout(function () {
			equal(testmask.value, "+55-12-12345-1234", "Result " + testmask.value);
			done();
		}, 0);
	});

});
