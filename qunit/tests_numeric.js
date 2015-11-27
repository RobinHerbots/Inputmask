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

	qunit.module("Numeric.Extensions");

	qunit.test("€ Currency precision 2", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			placeholder: "0",
			autoGroup: true,
			digits: 2,
			digitsOptional: false,
			prefix: "€ "
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("1234");
			assert.equal(testmask.value, "€ 1,234.00", "Result " + testmask.value);
			done();
		}, 0);
	});


	qunit.test("integer  type 124 correct to 1234", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			autoGroup: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("124");
		$.caret(testmask, 2);
		$("#testmask").Type("3");
		assert.equal(testmask.value, "1,234", "Result " + testmask.value);

	});

	qunit.test("numeric  type 00000 - Webunity", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			autoGroup: true,
			integerDigits: 9
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("00000");

		assert.equal(testmask.value, "0", "Result " + testmask.value);

	});

	qunit.test("numeric -placeholder 0 type 00000 - Webunity", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			autoGroup: true,
			placeholder: "0"
		}).mask(testmask)

		testmask.focus();
		$("#testmask").Type("00000");

		assert.equal($("#testmask")[0].inputmask._valueGet(), "0", "Result " + testmask.value);

	});

	qunit.test("numeric placeholder 0 prefix € type 0.123 - Webunity", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			autoGroup: true,
			placeholder: "0",
			prefix: "€ "
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("0.123");

		assert.equal(testmask.value, "€ 0.123", "Result " + testmask.value);

	});

	qunit.test("numeric placeholder 0 prefix € type 0.123 - backspace - Webunity", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			autoGroup: true,
			placeholder: "0",
			prefix: "€ "
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("0.123");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

		assert.equal(testmask.value, "€ 0.12", "Result " + testmask.value);

	});

	qunit.test("numeric placeholder 0 prefix € type 0.123 + add 1 in front - Webunity", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			autoGroup: true,
			placeholder: "0",
			prefix: "€ "
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("0.123");
		$.caret(testmask, 2);
		$("#testmask").Type("1");

		assert.equal(testmask.value, "€ 10.123", "Result " + testmask.value);

	});

	qunit.test("numeric placeholder 0 autoGroup: false prefix € type 0.123 + add 123 in front - Webunity", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			autoGroup: false,
			placeholder: "0",
			prefix: "€ "
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("0.123");
		$.caret(testmask, 2);
		$("#testmask").Type("123");

		assert.equal(testmask.value, "€ 1230.123", "Result " + testmask.value);

	});

	qunit.test("numeric placeholder 0 autoGroup: true prefix € type 0.123 + add 123 in front - Webunity", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			groupSeparator: ",",
			autoGroup: true,
			placeholder: "0",
			prefix: "€ "
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("0.123");
		$.caret(testmask, 2);
		$("#testmask").Type("123");

		assert.equal(testmask.value, "€ 1,230.123", "Result " + testmask.value);

	});

	qunit.test("integer alias with integerDigits 9 & autogroup - type 123456789 - gigermocas", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("integer", {
			groupSeparator: ",",
			autoGroup: true,
			integerDigits: 9
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456789");

		assert.equal(testmask.value, "123,456,789", "Result " + testmask.value);

	});

	qunit.test("integer alias with integerDigits 9 & autogroup - type 1234567890123456789 - gigermocas", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("integer", {
			groupSeparator: ",",
			autoGroup: true,
			integerDigits: 9
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234567890123456789");

		assert.equal(testmask.value, "123,456,789", "Result " + testmask.value);

	});

	qunit.test("integer alias with integerDigits 4 & autogroup - type 1234567890123456789 - gigermocas", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("integer", {
			groupSeparator: ",",
			autoGroup: true,
			integerDigits: 4
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234567890123456789");

		assert.equal(testmask.value, "1,234", "Result " + testmask.value);

	});

	qunit.test("decimal alias with integerDigits 9 & autogroup - type 123456789 - gigermocas", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			groupSeparator: ",",
			autoGroup: true,
			integerDigits: 9
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456789");

		assert.equal(testmask.value, "123,456,789", "Result " + testmask.value);

	});

	qunit.test("decimal alias with integerDigits 4 & autogroup - type 1234 - gigermocas", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			groupSeparator: ",",
			autoGroup: true,
			integerDigits: 4
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234");

		assert.equal(testmask.value, "1,234", "Result " + testmask.value);

	});

	qunit.test("numeric alias with allowMinus:false type=text - vijjj", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			radixPoint: ".",
			integerDigits: 6,
			allowMinus: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		$.caret(testmask, 0);
		$("#testmask").SendKey("-");

		assert.equal(testmask.value, "123456", "Result " + testmask.value);

	});

	qunit.test("numeric alias with allowMinus:false type=number - mask not applied - MartinVerges", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="number" id="testmask" />');
		Inputmask("numeric", {
			radixPoint: ".",
			integerDigits: 6,
			allowMinus: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		$("#testmask").SendKey("-");

		//IE7 does not know type=number and treats as type=text
		ok(testmask.value == "" || testmask.value == "123456", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"numeric\", { prefix: \"€ \" }\") - input 12345.12", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			prefix: "€ "
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("12345.12");

		assert.equal(testmask.value, "€ 12345.12", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			autoGroup: true,
			groupSeparator: ","
		}).mask(testmask);

		testmask.focus();

		$("#testmask").SendKey("1");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("3");
		$("#testmask").SendKey("4");
		$("#testmask").SendKey("5");
		$("#testmask").SendKey(".");
		$("#testmask").SendKey("1");
		$("#testmask").SendKey("2");
		$("#testmask").SendKey("3");

		assert.equal(testmask.value, "12,345.123", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\", decimalProtect: true }\") - input 12345.123 + remove .123", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			autoGroup: true,
			groupSeparator: ",",
			decimalProtect: true
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345.123");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		testmask.blur();
		setTimeout(function() {
			assert.equal(testmask.value, "12,345", "Result " + testmask.value);
			done();
		}, 0);
	});
	qunit.test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			autoGroup: true,
			groupSeparator: ","
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345.123");
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").Type(".789");

		assert.equal(testmask.value, "12,345.789", "Result " + testmask.value);

	});
	qunit.test("inputmask(\"decimal\", { autoGroup: true, groupSeparator: \",\" }\") - input 12345.123 + replace .123 => .789", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			autoGroup: true,
			groupSeparator: ","
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345.123");
		//$("#testmask").trigger("click");
		$.caret(testmask, 6, 10);
		$("#testmask").Type(".789");

		assert.equal(testmask.value, "12,345.789", "Result " + testmask.value);

	});
	qunit.test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\", decimalProtect: true  }\") - input 12345.123 + remove .123", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			autoGroup: false,
			groupSeparator: ",",
			decimalProtect: true
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345.123");
		//$("#testmask").trigger("click");
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);

		assert.equal(testmask.value, "12345", "Result " + testmask.value);

	});
	qunit.test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\", decimalProtect: false  }\") - input 12345.123 + remove .123", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			autoGroup: false,
			groupSeparator: ",",
			decimalProtect: false
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345.123");
		//$("#testmask").trigger("click");
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);

		assert.equal(testmask.value, "12345", "Result " + testmask.value);

	});
	qunit.test("inputmask(\"decimal\", { autoGroup: false, groupSeparator: \",\", decimalProtect: true  }\") - input 12345.123 + replace .123 => .789", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			autoGroup: false,
			groupSeparator: ",",
			decimalProtect: true
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("12345.123");
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.LEFT);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		$("#testmask").Type(".789");

		assert.equal(testmask.value, "12345.789", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - maxlength 10", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" maxlength="10" />');
		Inputmask("decimal").mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789012345");

		assert.equal(testmask.value, "1234567890", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal, { repeat: 15 }\") - maxlength 10", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" maxlength="10" />');
		Inputmask("decimal", {
			repeat: 15
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789012345");

		assert.equal(testmask.value, "1234567890", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal, { repeat: 5, decimalProtect: true }\") - maxlength 10", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" maxlength="10" />');
		Inputmask("decimal", {
			repeat: 5,
			decimalProtect: true
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789012345");

		assert.equal(testmask.value, "12345", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal, { repeat: 5, decimalProtect: false }\") - maxlength 10", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" maxlength="10" />');
		Inputmask("decimal", {
			repeat: 5,
			decimalProtect: false
		}).mask(testmask);

		testmask.focus();

		$("#testmask").Type("123456789012345");

		assert.equal(testmask.value, "12345.6789", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\")", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal").mask(testmask);

		testmask.focus();

		$("#testmask").Type("1234567890");
		$.caret(testmask, 0, 10);
		$("#testmask").Type("12345");

		assert.equal(testmask.value, "12345", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - value=\"1234567890\"", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="1234567890" />');
		Inputmask("decimal").mask(testmask);

		testmask.focus();

		$.caret(testmask, 0, 10);
		$("#testmask").Type("12345");

		assert.equal(testmask.value, "12345", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\")", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal").mask(testmask);

		testmask.focus();

		$("#testmask").Type("1234567890");
		$.caret(testmask, 3, 5);
		$("#testmask").SendKey("0");

		assert.equal(testmask.value, "123067890", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - value=\"1234567890\"", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="1234567890" />');
		Inputmask("decimal").mask(testmask);

		testmask.focus();

		$.caret(testmask, 3, 5);
		$("#testmask").SendKey("0");

		assert.equal(testmask.value, "123067890", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - value=\"123.45\" Replace last integer", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			digits: 2
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123.45");
		$.caret(testmask, 2, 3);
		$("#testmask").SendKey("7");

		assert.equal(testmask.value, "127.45", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\", { digits: 2 }) - value=\"123\" - RomeroMsk", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			digits: 2
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123");
		$.caret(testmask, 0, 3);
		$("#testmask").SendKey(",,..");
		$("#testmask").Type("45");

		assert.equal(testmask.value, "0.45", "Result " + testmask.value);

	});

	qunit.test("inputmask - Multiple inputs masked, Integer mask doesn't allow typing - #402 - albatrocity", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		$fixture.append('<input type="text" id="testmask2" />');
		var testmask2 = document.getElementById("testmask2");
		Inputmask("integer", {
			autoGroup: true,
			groupSeparator: ",",
			groupSize: 3
		}).mask(testmask);
		Inputmask("(999)-999-9999").mask(testmask2);


		testmask.focus();
		$("#testmask").Type("12345");

		assert.equal(testmask.value, "12,345", "Result " + testmask.value);

		$("#testmask2").remove();
	});

	qunit.test("decimal alias with groupseparator delete - YoussefTaghlabi", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3,
			digits: 2,
			autoGroup: true,
			allowPlus: false,
			allowMinus: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234567");
		$.caret(testmask, 0);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);

		assert.equal(testmask.value, "234,567", "Result " + testmask.value);

	});

	qunit.test("decimal alias with groupseparator backspace - YoussefTaghlabi", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3,
			digits: 2,
			autoGroup: true,
			allowPlus: false,
			allowMinus: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234567");
		$.caret(testmask, 1);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

		assert.equal(testmask.value, "234,567", "Result " + testmask.value);

	});

	qunit.test("decimal alias with plus or minus & autogroup - type -123456 - YoussefTaghlabi", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3,
			digits: 2,
			autoGroup: true,
			allowPlus: true,
			allowMinus: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("-123456");

		assert.equal(testmask.value, "-123,456", "Result " + testmask.value);

	});

	qunit.test("decimal alias with plus or minus & autogroup - type 123465 - - YoussefTaghlabi", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3,
			digits: 2,
			autoGroup: true,
			allowPlus: true,
			allowMinus: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123456");
		$.caret(testmask, 0);
		$("#testmask").SendKey("-");

		assert.equal(testmask.value, "-123,456", "Result " + testmask.value);

	});

	qunit.test("decimal alias with plus or minus & autogroup", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3,
			digits: 2,
			autoGroup: true,
			allowPlus: true,
			allowMinus: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("1234.56");

		assert.equal(testmask.value, "1,234.56", "Result " + testmask.value);

	});

	qunit.test("decimal alias set value with val() - kochelmonster", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			radixPoint: ",",
			groupSeparator: ".",
			digits: 2,
			autoGroup: true,
			suffix: ' €'
		}).mask(testmask);

		$("#testmask").val("39.399.392,22 €");

		assert.equal(testmask.value, "39.399.392,22 €", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - value=\"123.1\" blur digitsoptional", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			digits: 3
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123.1");
		testmask.blur();
		setTimeout(function() {
			assert.equal(testmask.value, "123.1", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"decimal\") - value=\"123.1\" blur", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			digits: 3,
			digitsOptional: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123.1");
		testmask.blur();
		setTimeout(function() {
			assert.equal(testmask.value, "123.100", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency alias - 200000 => replace 2 to 3", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("200000");
			$.caret(testmask, 2, 3);
			$("#testmask").Type("3");
			assert.equal(testmask.value, "$ 300,000.00", "Result " + testmask.value);
			done();
		}, 5);
	});

	qunit.test("inputmask(\"integer\") - -0 - laxmikantG", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("integer", {
			placeholder: "0"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("-0");
		testmask.blur();
		setTimeout(function() {
			assert.equal(testmask.value, "", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"integer\") - 123- - laxmikantG", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("integer", {
			placeholder: "0"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").Type("123-");

		assert.equal(testmask.value, "-123", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - val(\"-5000,77\"); - ManRueda", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			integerDigits: 10,
			groupSeparator: '.',
			autoGroup: true,
			digits: 2,
			radixPoint: ',',
			groupSize: 3
		}).mask(testmask);

		$("#testmask").val("-5000,77");

		assert.equal(testmask.value, "-5.000,77", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - -0 - ManRueda", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			integerDigits: 10,
			groupSeparator: '.',
			autoGroup: true,
			digits: 2,
			radixPoint: ',',
			groupSize: 3
		}).mask(testmask);

		$("#testmask").val("-0");
		testmask.blur();

		assert.equal(testmask.value, "0", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"integer\") - -5.000,77 - DrSammyD", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('integer', {
			placeholder: "0"
		}).mask(testmask);

		$("#testmask").val("-5.000,77");
		testmask.blur();

		assert.equal(testmask.value, "-5000", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\ placeholder :\"\" digitsoptional: false) - 123 - loostro", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="0,00" />');
		Inputmask("decimal", {
			radixPoint: ",",
			digits: 2,
			digitsOptional: false,
			autoGroup: true,
			groupSeparator: " ",
			groupSize: 3,
			allowPlus: false,
			allowMinus: false,
		}).mask(testmask);
		testmask.focus();
		$("#testmask").trigger("click");
		$.caret(testmask, 0);

		setTimeout(function() {
			$("#testmask").Type("123");
			assert.equal(testmask.value, "123,00", "Result " + testmask.value);
			done();
		}, 5);
	});

	qunit.test("inputmask(\"decimal\ placeholder :\"0\" digitsoptional: false) - .12 - YodaJM", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			digits: 2,
			placeholder: "0",
			digitsOptional: false
		}).mask(testmask);
		testmask.focus();
		$.caret(testmask, 0, 4);

		setTimeout(function() {
			$("#testmask").Type(".12");
			assert.equal(testmask.value, "0.12", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("inputmask(\"decimal\") - '8100000.00' - ManRueda", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			integerDigits: 6,
			groupSeparator: '.',
			autoGroup: true,
			digits: 2,
			radixPoint: ',',
			groupSize: 3
		}).mask(testmask);

		$("#testmask").val("8100000.00");

		assert.equal(testmask.value, "810.000,00", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - '12345678.12' - ManRueda", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			integerDigits: 6,
			groupSeparator: '.',
			autoGroup: true,
			digits: 2,
			radixPoint: ',',
			groupSize: 3
		}).mask(testmask);

		$("#testmask").val("12345678.12");

		assert.equal(testmask.value, "123.456,12", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - '8100000,00' - ManRueda", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			integerDigits: 6,
			groupSeparator: '.',
			autoGroup: true,
			digits: 2,
			radixPoint: ',',
			groupSize: 3
		}).mask(testmask);

		$("#testmask").val("8100000,00");

		assert.equal(testmask.value, "810.000,00", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - 8100000.00 - ManRueda", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			integerDigits: 6,
			groupSeparator: '.',
			autoGroup: true,
			digits: 2,
			radixPoint: ',',
			groupSize: 3
		}).mask(testmask);

		$("#testmask").val(8100000.00);
		assert.equal(testmask.value, "810.000", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - 8100000.00 digitsoptional false - ManRueda", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			integerDigits: 6,
			groupSeparator: '.',
			autoGroup: true,
			digits: 2,
			digitsOptional: false,
			radixPoint: ',',
			groupSize: 3
		}).mask(testmask);

		$("#testmask").val(8100000.00);
		testmask.blur();

		assert.equal(testmask.value, "810.000,00", "Result " + testmask.value);

	});

	qunit.test("inputmask(\"decimal\") - 810000.00 - ManRueda", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('decimal', {
			integerDigits: 6,
			groupSeparator: '.',
			autoGroup: true,
			digits: 2,
			radixPoint: ',',
			groupSize: 3
		}).mask(testmask);

		$("#testmask").val('810000.00');

		assert.equal(testmask.value, "810.000,00", "Result " + testmask.value);

	});


	qunit.test("inputmask(\"decimal\") - 123456   78 - babupca", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			alias: "decimal",
			integerDigits: 6,
			digits: 3,
			allowMinus: false,
			digitsOptional: false,
			placeholder: "0"
		}).mask(testmask);
		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("123456");
			$.caret(testmask, 8);
			$("#testmask").Type("78");
			$.caret(testmask, 5);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			assert.equal(testmask.value, "12346.078", "Result " + testmask.value);
			done();
		}, 0);
	});

	qunit.test("currency alias - 1234 => del 1", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("1234");
			$.caret(testmask, 3);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			assert.equal(testmask.value, "$ 234.00", "Result " + testmask.value);
			done();
		}, 5);
	});

	qunit.test("currency alias - 0.02 => type 1 in integer part", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("0.02");
			$.caret(testmask, 3);
			$("#testmask").SendKey("1");
			assert.equal(testmask.value, "$ 1.02", "Result " + testmask.value);
			done();
		}, 5);
	});

	qunit.test("currency alias - 0.02 => position before 0 type 1 in integer part", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("0.02");
			$.caret(testmask, 2);
			$("#testmask").SendKey("1");
			assert.equal(testmask.value, "$ 10.02", "Result " + testmask.value);
			done();
		}, 5);
	});

	qunit.test("currency alias - 1.23 => del 1 in integer part", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("1.23");
			$.caret(testmask, 3);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			assert.equal(testmask.value, "$ 0.23", "Result " + testmask.value);
			done();
		}, 5);
	});

	qunit.test("currency alias - 1234.56 => delete all", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("1234.56");
			$.caret(testmask, 0, 10);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			assert.equal($("#testmask")[0].inputmask._valueGet(), "$ 0.00", "Result " + $("#testmask")[0].inputmask._valueGet());
			done();
		}, 5);
	});

	qunit.test("numeric prefix='$' - paste 1234.56 - baileyjames9 & TheAndyBob", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			radixPoint: ".",
			groupSeparator: ",",
			digits: 2,
			autoGroup: true,
			prefix: '$' //No Space, this will truncate the first character
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").paste("1234.56");
			assert.equal(testmask.value, "$1,234.56", "Result " + testmask.value);
			done();
		}, 5);
	});

	qunit.test("currency alias - 1234.56 => select integer press 1 - babupca", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("1234.56");
			$.caret(testmask, 0, 7);
			$("#testmask").SendKey("1");
			assert.equal($("#testmask")[0].inputmask._valueGet(), "$ 1.56", "Result " + $("#testmask")[0].inputmask._valueGet());
			done();
		}, 5);
	});

	qunit.test("currency alias - 123.56 => select integer press 1 - babupca", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("123.56");
			$.caret(testmask, 0, 5);
			$("#testmask").SendKey("1");
			assert.equal($("#testmask")[0].inputmask._valueGet(), "$ 1.56", "Result " + $("#testmask")[0].inputmask._valueGet());
			done();
		}, 5);
	});

	qunit.test("currency alias - 123.56 => select integer press 1 - babupca", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency", {
			prefix: "$"
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("123.56");
			$.caret(testmask, 0, 4);
			$("#testmask").SendKey("1");
			assert.equal($("#testmask")[0].inputmask._valueGet(), "$1.56", "Result " + $("#testmask")[0].inputmask._valueGet());
			done();
		}, 5);
	});

	qunit.test("currency alias - min 1000", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency", {
			min: 1000
		}).mask(testmask);

		testmask.focus();
		testmask.blur();
		setTimeout(function() {
			assert.equal($("#testmask")[0].inputmask._valueGet(), "$ 1,000.00", "Result " + $("#testmask")[0].inputmask._valueGet());
			done();
		}, 5);
	});

	qunit.test("currency alias - max 1000 - type 1234", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency", {
			max: 1000
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("1234");
			assert.equal($("#testmask")[0].inputmask._valueGet(), "$ 123.00", "Result " + $("#testmask")[0].inputmask._valueGet());
			done();
		}, 5);
	});

	qunit.test("currency alias - type 1010 delete first 1 - FilipeZhou", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		$("#testmask").Type("1010");
		$.caret(testmask, 3);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		assert.equal($("#testmask")[0].inputmask._valueGet(), "$ 10.00", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("currency alias - type 1010 delete middle 1 - FilipeZhou", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		$("#testmask").Type("1010");
		$.caret(testmask, 6);
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		assert.equal($("#testmask")[0].inputmask._valueGet(), "$ 100.00", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("currency alias - type -1234 delete -", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		$("#testmask").Type("-1234");
		$.caret(testmask, 0);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		assert.equal($("#testmask")[0].inputmask._valueGet(), "$ 1,234.00", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("decimal alias - type 12345.12 add 6 in front - freeze - DatXN", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			integerDigits: 5,
			digits: 2,
			allowMinus: false,
			allowPlus: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		$("#testmask").Type("12345.12");
		$.caret(testmask, 0);
		$("#testmask").SendKey("6");
		assert.equal($("#testmask")[0].inputmask._valueGet(), "12345.12", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("decimal alias - type 123456789 - add , before 8 - jpontet", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			allowMinus: true,
			integerDigits: 12,
			digits: 2,
			radixPoint: ",",
			autoGroup: true,
			groupSeparator: " ",
			groupSize: 3,
			rightAlign: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		$("#testmask").Type("123456789");
		$.caret(testmask, 9);
		$("#testmask").SendKey(",");
		assert.equal($("#testmask")[0].inputmask._valueGet(), "1 234 567,89", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("decimal alias - type 123456789 - add , before 8 - backspace - jpontet", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			allowMinus: true,
			integerDigits: 12,
			digits: 2,
			radixPoint: ",",
			autoGroup: true,
			groupSeparator: " ",
			groupSize: 3,
			rightAlign: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		$("#testmask").Type("123456789");
		$.caret(testmask, 9);
		$("#testmask").SendKey(",");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		assert.equal($("#testmask")[0].inputmask._valueGet(), "123 456,89", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("decimal alias - type 1234567890 - add , before 9 - jpontet", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			allowMinus: true,
			integerDigits: 12,
			digits: 2,
			radixPoint: ",",
			autoGroup: true,
			groupSeparator: " ",
			groupSize: 3,
			rightAlign: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		$("#testmask").Type("1234567890");
		$.caret(testmask, 11);
		$("#testmask").SendKey(",");
		assert.equal($("#testmask")[0].inputmask._valueGet(), "12 345 678,90", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("decimal alias - type 1234567890 - add , before 9 - backspace - jpontet", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			allowMinus: true,
			integerDigits: 12,
			digits: 2,
			radixPoint: ",",
			autoGroup: true,
			groupSeparator: " ",
			groupSize: 3,
			rightAlign: false
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");
		$("#testmask").Type("1234567890");
		$.caret(testmask, 11);
		$("#testmask").SendKey(",");
		$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
		assert.equal($("#testmask")[0].inputmask._valueGet(), "1 234 567,90", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("numeric alias - value=\"-1234\" minvalue = 1000", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="-1234" />');
		Inputmask("numeric", {
			allowMinus: true,
			min: 1000,
			max: 3000
		}).mask(testmask);

		assert.equal($("#testmask")[0].inputmask._valueGet(), "1000", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("numeric alias - value=\"-1234\" minvalue = -1000", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="-1234" />');
		Inputmask("numeric", {
			allowMinus: true,
			min: -1000,
			max: 3000
		}).mask(testmask);

		assert.equal($("#testmask")[0].inputmask._valueGet(), "-1000", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("numeric alias - value=\"1000\" minvalue = 1000", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="1000" />');
		Inputmask("numeric", {
			allowMinus: true,
			min: 1000,
			max: 3000
		}).mask(testmask);

		assert.equal($("#testmask")[0].inputmask._valueGet(), "1000", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("numeric alias - value=\"-1000\" minvalue = -1000", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" value="-1000" />');
		Inputmask("numeric", {
			allowMinus: true,
			min: -1000,
			max: 3000
		}).mask(testmask);

		assert.equal($("#testmask")[0].inputmask._valueGet(), "-1000", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("decimal alias - overwrite decimal value - shahvaiz", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("decimal", {
			autoGroup: true,
			groupSeparator: ",",
			suffix: '%'
		}).mask(testmask);
		$("#testmask").Type("123.123");
		$.caret(testmask, 4, 7);
		$("#testmask").Type("4");
		assert.equal($("#testmask")[0].inputmask._valueGet(), "123.4%", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("numeric alias - placeholder: \"_\" - lucafik", function(assert) {
		var done = assert.async(),
			$fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric", {
			integerDigits: 2,
			digits: 2,
			placeholder: "_",
			digitsOptional: false
		}).mask(testmask);
		testmask.focus();
		$("#testmask").trigger("click");
		setTimeout(function() {
			$("#testmask").Type("12");
			assert.equal($("#testmask")[0].inputmask._valueGet(), "12.__", "Result " + $("#testmask")[0].inputmask._valueGet());
			done();
		}, 0);
	});

	qunit.test("numeric alias - type 123.123 - delete all - ivodopyanov", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("numeric").mask(testmask);
		$("#testmask").Type("123.123");
		$.caret(testmask, 0, testmask.value.length);
		$("#testmask").SendKey(Inputmask.keyCode.DELETE);
		assert.equal($("#testmask")[0].inputmask._valueGet(), "", "Result " + $("#testmask")[0].inputmask._valueGet());

	});

	qunit.test("currency alias - 123 - isvalid - ivodopyanov", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);
		$("#testmask").Type("123");
		var isValid  =Inputmask("currency").isValid(testmask.value);
		assert.equal(isValid, true, "Result " + isValid);
	});
	qunit.test("currency alias - $ 99,999,999.00 - isvalid - ivodopyanov", function(assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency").mask(testmask);
		$("#testmask").Type("$ 99,999,999.00");
		var isValid  =Inputmask("currency").isValid(testmask.value);
		assert.equal(isValid, true, "Result " + isValid);
	});
});
