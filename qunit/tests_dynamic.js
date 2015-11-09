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
], function(qunit, $, Inputmask) {

		qunit.module("Dynamic Masks");
		test("inputmask(\"9-a{3}9{3}\" - simple dynamic mask", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("9-a{3}9{3}").mask(testmask);

			testmask.focus();
			$("#testmask").Type("1abc123");

			equal(testmask.value, "1-abc123", "Result " + testmask.value);

			$("#testmask").remove();
		});
		test("inputmask(\"9-a{1,3}9{1,3}\" - simple dynamic mask", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("9-a{1,3}9{1,3}").mask(testmask);

			testmask.focus();
			$("#testmask").Type("1a1");

			equal(testmask.value, "1-a1", "Result " + testmask.value);

			$("#testmask").remove();
		});
		test("inputmask(\"9-a{1,3}9{1,3}\" - simple dynamic mask - greedy false", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("9-a{1,3}9{1,3}", {
				greedy: false
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("1a1");

			equal(testmask.value, "1-a1", "Result " + testmask.value);

			$("#testmask").remove();
		});
		test("inputmask(\"9-a{1,3}/9{2,3}\" - simple dynamic mask - greedy true", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("9-a{1,3}/9{2,3}", {
				greedy: true
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("1a/123");

			equal(testmask.value, "1-a/123", "Result " + testmask.value);

			$("#testmask").remove();
		});
		test("email mask greedy false", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email", {
				greedy: false
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("some.body@mail.com");
			testmask.blur();
			equal(testmask.value, "some.body@mail.com", "Result " + testmask.value);

			$("#testmask").remove();
		});
		asyncTest("email mask greedy true", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email", {
				greedy: true
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("some.body@mail.com");
			testmask.blur();
			setTimeout(function() {
				start();
				equal(testmask.value, "some.body@mail.com", "Result " + testmask.value);
				$("#testmask").remove();
			}, 0);
		});

		test("email mask - partial input", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email").mask(testmask);

			testmask.focus();
			$("#testmask").Type("some.");
			testmask.blur();
			equal(testmask.value, "some._@_", "Result " + testmask.value);

			$("#testmask").remove();
		});

		test("email mask - partial input 2", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email").mask(testmask);

			testmask.focus();
			$("#testmask").Type("some@mail.com");
			$.caret(testmask, 4);
			$("#testmask").Type(".body");
			equal(testmask.value, "some.body@mail.com", "Result " + testmask.value);

			$("#testmask").remove();
		});

		test("email mask - babu@us.lufthansa.com - babupca", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email").mask(testmask);

			testmask.focus();
			$("#testmask").Type("babu@us.lufthansa.com");
			equal(testmask.value, "babu@us.lufthansa.com", "Result " + testmask.value);

			$("#testmask").remove();
		});

		test("email mask - email@subdomain.domain.com - babupca", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email").mask(testmask);

			testmask.focus();
			$("#testmask").Type("email@subdomain.domain.com");
			equal(testmask.value, "email@subdomain.domain.com", "Result " + testmask.value);

			$("#testmask").remove();
		});

		asyncTest("email mask - paste test.test@test.com - Kurumas", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email").mask(testmask);

			testmask.focus();
			$("#testmask").paste("test.test@test.com");
			setTimeout(function() {
				equal(testmask.value, "test.test@test.com", "Result " + testmask.value);
				start();
				$("#testmask").remove();
			}, 0);
		});

		test("quantifier mask greedy false - FairSite2C", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("9{0,4}", {
				greedy: false
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("123");
			equal(testmask.value, "123", "Result " + testmask.value);

			$("#testmask").remove();
		});

		test("quantifier mask greedy true - FairSite2C", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("9{0,4}", {
				greedy: true
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("123");
			equal(testmask.value, "123", "Result " + testmask.value);

			$("#testmask").remove();
		});


		asyncTest("email mask - clearIncomplete - hiddenman", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email", {
				clearIncomplete: true
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("akornilov");
			testmask.blur();
			setTimeout(function() {
				equal(document.getElementById("testmask").inputmask._valueGet(), "", "Result " + document.getElementById("testmask").inputmask._valueGet());
				start();
				$("#testmask").remove();
			}, 0);
		});

		asyncTest("email mask - clearIncomplete - hiddenman", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email", {
				clearIncomplete: true
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("akornilov@");
			testmask.blur();
			setTimeout(function() {
				equal(document.getElementById("testmask").inputmask._valueGet(), "", "Result " + document.getElementById("testmask").inputmask._valueGet());
				start();
				$("#testmask").remove();
			}, 0);
		});

		asyncTest("email mask - clearIncomplete - hiddenman", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask("email", {
				clearIncomplete: true
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("akornilov@gmail.com");
			testmask.blur();
			setTimeout(function() {
				equal(document.getElementById("testmask").inputmask._valueGet(), "akornilov@gmail.com", "Result " + document.getElementById("testmask").inputmask._valueGet());
				start();
				$("#testmask").remove();
			}, 0);
		});

		test("mask: '\\\\a{*}', repeat: 5 - voidmain02", function() {
			var $fixture = $("#qunit-fixture");
			$fixture.append('<input type="text" id="testmask" />');
			var testmask = document.getElementById("testmask");
			Inputmask({
				mask: '\\\\a{*}',
				repeat: 5
			}).mask(testmask);

			testmask.focus();
			$("#testmask").Type("abcd abcd abcd abcd abcd");
			equal(document.getElementById("testmask").inputmask._valueGet(), "\\abcd\\abcd\\abcd\\abcd\\abcd", "Result " + document.getElementById("testmask").inputmask._valueGet());
			$("#testmask").remove();
		});
});
