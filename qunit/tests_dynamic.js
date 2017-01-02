define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../dist/inputmask/inputmask.regex.extensions",
	"prototypeExtensions",
	"simulator"
], function (qunit, $, Inputmask) {

	qunit.module("Dynamic Masks");
	qunit.test("inputmask(\"9-a{3}9{3}\" - simple dynamic mask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9-a{3}9{3}").mask(testmask);

		testmask.focus();
		$("#testmask").Type("1abc123");

		assert.equal(testmask.value, "1-abc123", "Result " + testmask.value);


	});
	qunit.test("inputmask(\"9-a{1,3}9{1,3}\" - simple dynamic mask", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9-a{1,3}9{1,3}").mask(testmask);

		testmask.focus();
		$("#testmask").Type("1a1");

		assert.equal(testmask.value, "1-a1", "Result " + testmask.value);


	});
	qunit.test("inputmask(\"9-a{1,3}9{1,3}\" - simple dynamic mask - greedy false", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9-a{1,3}9{1,3}", {
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1a1");

		assert.equal(testmask.value, "1-a1", "Result " + testmask.value);


	});
	qunit.test("inputmask(\"9-a{1,3}/9{2,3}\" - simple dynamic mask - greedy true", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9-a{1,3}/9{2,3}", {
			greedy: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1a/123");

		assert.equal(testmask.value, "1-a/123", "Result " + testmask.value);


	});
	qunit.test("email mask greedy false", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email", {
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("some.body@mail.com");
		testmask.blur();
		assert.equal(testmask.value, "some.body@mail.com", "Result " + testmask.value);


	});
	qunit.test("email mask greedy true", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email", {
			greedy: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("some.body@mail.com");
		testmask.blur();
		setTimeout(function () {
			assert.equal(testmask.value, "some.body@mail.com", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("email mask - partial input", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email").mask(testmask);

		testmask.focus();
		$("#testmask").Type("some.");
		testmask.blur();
		assert.equal(testmask.value, "some.@_._", "Result " + testmask.value);
	});

	qunit.test("email mask - partial input 2", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email").mask(testmask);

		testmask.focus();
		$("#testmask").Type("some@mail.com");
		$.caret(testmask, 4);
		$("#testmask").Type(".body");
		assert.equal(testmask.value, "some.body@mail.com", "Result " + testmask.value);


	});

	qunit.test("email mask - babu@us.lufthansa.com - babupca", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email").mask(testmask);

		testmask.focus();
		$("#testmask").Type("babu@us.lufthansa.com");
		assert.equal(testmask.value, "babu@us.lufthansa.com", "Result " + testmask.value);


	});

	qunit.test("email mask - email@subdomain.domain.com - babupca", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email").mask(testmask);

		testmask.focus();
		$("#testmask").Type("email@subdomain.domain.com");
		assert.equal(testmask.value, "email@subdomain.domain.com", "Result " + testmask.value);


	});

	qunit.test("email mask - paste test.test@test.com - Kurumas", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email").mask(testmask);

		testmask.focus();
		$("#testmask").paste("test.test@test.com");
		setTimeout(function () {
			assert.equal(testmask.value, "test.test@test.com", "Result " + testmask.value);
			done();

		}, 0);
	});

	qunit.test("quantifier mask greedy false - FairSite2C", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9{0,4}", {
			greedy: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123");
		assert.equal(testmask.value, "123", "Result " + testmask.value);


	});

	qunit.test("quantifier mask greedy true - FairSite2C", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("9{0,4}", {
			greedy: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123");
		assert.equal(testmask.value, "123", "Result " + testmask.value);


	});


	qunit.test("email mask - clearIncomplete - hiddenman", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email", {
			clearIncomplete: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("akornilov");
		testmask.blur();
		setTimeout(function () {
			assert.equal(document.getElementById("testmask").inputmask._valueGet(), "", "Result " + document.getElementById("testmask").inputmask._valueGet());
			done();

		}, 0);
	});

	qunit.test("email mask - clearIncomplete - hiddenman", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email", {
			clearIncomplete: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("akornilov@");
		testmask.blur();
		setTimeout(function () {
			assert.equal(document.getElementById("testmask").inputmask._valueGet(), "", "Result " + document.getElementById("testmask").inputmask._valueGet());
			done();

		}, 0);
	});

	qunit.test("email mask - clearIncomplete - hiddenman", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email", {
			clearIncomplete: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("akornilov@gmail.com");
		testmask.blur();
		setTimeout(function () {
			assert.equal(document.getElementById("testmask").inputmask._valueGet(), "akornilov@gmail.com", "Result " + document.getElementById("testmask").inputmask._valueGet());
			done();

		}, 0);
	});

	qunit.test("mask: '\\\\a{*}', repeat: 5 - voidmain02", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: '\\\\a{*}',
			repeat: 5
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("abcd abcd abcd abcd abcd");
		assert.equal(document.getElementById("testmask").inputmask._valueGet(), "\\abcd\\abcd\\abcd\\abcd\\abcd", "Result " + document.getElementById("testmask").inputmask._valueGet());

	});

	qunit.test("[a{1,3}-]9999 - type abc1234 => delete c - ivodopyanov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("[a{1,3}-]9999").mask(testmask);

		$("#testmask").Type("abc1234");
		$.caret(testmask, 2);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		assert.equal(document.getElementById("testmask").inputmask._valueGet(), "ab-1234", "Result " + document.getElementById("testmask").inputmask._valueGet());
	});

	qunit.test("email mask - mouseclick to domain part - hiddenman", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email").mask(testmask);

		testmask.focus();
		$("#testmask").Type("akornilov");

		//fake click in position
		$.caret(testmask, 10);
		$("#testmask").trigger("click");

		$("#testmask").Type("gmail.com");
		setTimeout(function () {
			assert.equal(document.getElementById("testmask").inputmask._valueGet(), "akornilov@gmail.com", "Result " + document.getElementById("testmask").inputmask._valueGet());
			done();
		}, 0);
	});
	qunit.test("I{1,3}-ZZ - rgafaric", function (assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="VAA" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			"mask": "I{1,3}-ZZ",
			definitions: {
				'Z': {
					"validator": "[A-Za-z]",
					cardinality: 1
				},
				'I': {
					"validator": "[ivxlcdmIVXLCDM]",
					cardinality: 1
				}
			}
		}).mask(testmask);
		testmask.blur();
		setTimeout(function () {
			assert.equal(document.getElementById("testmask").inputmask._valueGet(), "V-AA", "Result " + document.getElementById("testmask").inputmask._valueGet());
			done();
		}, 0);
	});

	qunit.test("email mask - some.body@mail.com - delete before @", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email").mask(testmask);

		testmask.focus();
		$("#testmask").Type("some.body@mail.com");
		$.caret(testmask, 9);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		assert.equal(testmask.value, "some.body@ail.com", "Result " + testmask.value);
	});

	qunit.test("email mask -123@mail.com - 123 => info", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("email").mask(testmask);

		testmask.focus();
		$("#testmask").Type("123@mail.com");
		$.caret(testmask, 0, 3);
		$("#testmask").Type("info");
		assert.equal(testmask.value, "info@mail.com", "Result " + testmask.value);
	});

	qunit.test("(aa)|(a.a.)|(aaa)|(aa.a.)|(a.aa.) - incomplete - danielpiterak", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(aa)|(a.a.)|(aaa)|(aa.a.)|(a.aa.)", {
			clearMaskOnLostFocus: true,
			showMaskOnHover: false,
			placeholder: " ",
			casing: "upper"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("p.p");
		testmask.blur();
		assert.equal(testmask.value, "P.P.", "Result " + testmask.value);
	});

	qunit.test("(aa)|(a.a.)|(aaa)|(aa.a.)|(a.aa.) - complete - danielpiterak", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("(aa)|(a.a.)|(aaa)|(aa.a.)|(a.aa.)", {
			clearMaskOnLostFocus: true,
			showMaskOnHover: false,
			placeholder: " ",
			casing: "upper"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("p.p.");
		testmask.blur();
		assert.equal(testmask.value, "P.P.", "Result " + testmask.value);
	});
});
