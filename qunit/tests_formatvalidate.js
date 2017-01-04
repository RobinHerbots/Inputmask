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
	qunit.module("Value formatting");
	qunit.test("Inputmask.format(\"2331973\", { alias: \"date\"})", function(assert) {
		var formattedValue = Inputmask.format("2331973", {
			alias: "date"
		});
		assert.equal(formattedValue, "23/03/1973", "Result " + formattedValue);
	});

	qunit.test("Inputmask.format(\"016501030020001DE1015170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function(assert) {
		var formattedValue = Inputmask.format("016501030020001DE1015170", {
			mask: "99 999 999 999 9999 \\D\\E*** 9999"
		});
		assert.equal(formattedValue, "01 650 103 002 0001 DE101 5170", "Result " + formattedValue);
	});

	qunit.test("Inputmask.format(\"12\", {  mask: \"$ 999999\", numericInput: true, placeholder: \"0\" }); - gigermocas", function(assert) {
		var formattedValue = Inputmask.format("12", {
			mask: "$ 999999",
			numericInput: true,
			placeholder: "0"
		});
		assert.equal(formattedValue, "$ 000012", "Result " + formattedValue);
	});


	qunit.test("Inputmask.format(\"1111111.11\" - ... autoGroup: true - swd120", function(assert) {
		var formattedValue = Inputmask.format("1111111.11", {
			alias: "decimal",
			radixPoint: ".",
			digits: 2,
			autoGroup: true,
			groupSeparator: ",",
			groupSize: 3,
			allowMinus: true
		});
		assert.equal(formattedValue, "1,111,111.11", "Result " + formattedValue);
	});

	qunit.test("Inputmask.format(phone, { mask: '(999) 999-9999' })); - krivaten", function(assert) {
		var phone = '5551112222';
		var formattedValue = Inputmask.format(phone, {
			mask: '(999) 999-9999'
		});
		assert.equal(formattedValue, "(555) 111-2222", "Result " + formattedValue);
	});

	qunit.test("format(62.91, { alias: 'numeric' } - penihel", function(assert) {
		var formattedValue = 	Inputmask.format(62.91, { alias: 'numeric' });
		assert.equal(formattedValue, "62.91", "Result " + formattedValue);
	});

	qunit.module("Value Validating");
	qunit.test("Inputmask.isValid(\"23/03/1973\", { alias: \"date\"})", function(assert) {
		var isValid = Inputmask.isValid("23/03/1973", {
			alias: "date"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("Inputmask.isValid(\"01 650 103 002 0001 DE101 5170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function(assert) {
		var isValid = Inputmask.isValid("01 650 103 002 0001 DE101 5170", {
			mask: "99 999 999 999 9999 \\D\\E*** 9999"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("Inputmask.isValid email => false", function(assert) {
		var isValid = Inputmask.isValid("some.body@mail.c", {
			alias: "email"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("Inputmask.isValid email => true", function(assert) {
		var isValid = Inputmask.isValid("some.body@mail.com", {
			alias: "email"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("Inputmask.isValid email greedy => false", function(assert) {
		var isValid = Inputmask.isValid("some.body@mail.c", {
			alias: "email",
			greedy: true
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("Inputmask.isValid email greedy => true", function(assert) {
		var isValid = Inputmask.isValid("some.body@mail.com", {
			alias: "email",
			greedy: true
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("YoussefTaghlabi isValid(\"100\", { alias: \"integer\" }", function(assert) {
		var isValid = Inputmask.isValid("100", {
			alias: "integer"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});
	qunit.test("YoussefTaghlabi isValid(\"100.00\", { alias: \"integer\" }", function(assert) {
		var isValid = Inputmask.isValid("100.00", {
			alias: "integer"
		});
		assert.equal(isValid, false, "Result " + isValid);
	});
	qunit.test("YoussefTaghlabi isValid(\"123\", { alias: \"decimal\" }", function(assert) {
		var isValid = Inputmask.isValid("123", {
			alias: "decimal"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});
	qunit.test("YoussefTaghlabi isValid(\"123.45\", { alias: \"decimal\" }", function(assert) {
		var isValid = Inputmask.isValid("123.45", {
			alias: "decimal"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});
	qunit.test("YoussefTaghlabi isValid(\"123456.78\", { alias: \"decimal\" }", function(assert) {
		var isValid = Inputmask.isValid("123456.78", {
			alias: "decimal"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});
	qunit.test("YoussefTaghlabi isValid(\"123,456.78\", { alias: \"decimal\" }", function(assert) {
		var isValid = Inputmask.isValid("123,456.78", {
			alias: "decimal",
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3
		});
		assert.equal(isValid, true, "Result " + isValid);
	});
	qunit.test("YoussefTaghlabi isValid(\"12,\", { alias: \"decimal\" }", function(assert) {
		var isValid = Inputmask.isValid("12,", {
			alias: "decimal",
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3
		});
		assert.equal(isValid, false, "Result " + isValid);
	});
	qunit.test("YoussefTaghlabi isValid(\"12,1.45\", { alias: \"decimal\" }", function(assert) {
		var isValid = Inputmask.isValid("12,1.45", {
			alias: "decimal",
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3
		});
		assert.equal(isValid, false, "Result " + isValid);
	});
	qunit.test("YoussefTaghlabi isValid(\"12,345.67\", { alias: \"decimal\" }", function(assert) {
		var isValid = Inputmask.isValid("12,345.67", {
			alias: "decimal",
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("thomstark isValid(\"12lbs\", {mask:\"99[9]lb\\s\", greedy:false, skipOptionalPartCharacter: \"\", \"clearIncomplete\":true}", function(assert) {
		var isValid = Inputmask.isValid("12lbs", {
			mask: "99[9]lb\\s",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("thomstark isValid(\"1'2\"\", {mask:\"9'9[9]\"\", greedy:false, skipOptionalPartCharacter: \"\", \"clearIncomplete\":true}", function(assert) {
		var isValid = Inputmask.isValid("1'2\"", {
			mask: "9'9[9]\"",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("thomstark isValid(\"12lbs\", {mask:\"99{1,2}lb\\s\", greedy:false, skipOptionalPartCharacter: \"\", \"clearIncomplete\":true}", function(assert) {
		var isValid = Inputmask.isValid("12lbs", {
			mask: "99{1,2}lb\\s",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("thomstark isValid(\"9'9{1,2}\", {mask:\"9'9[9]\"\", greedy:false, skipOptionalPartCharacter: \"\", \"clearIncomplete\":true}", function(assert) {
		var isValid = Inputmask.isValid("1'2\"", {
			mask: "9'9{1,2}\"",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("a13x3y isValid(\"some_body@mail.com\", {alias:\"email\"}", function(assert) {
		var isValid = Inputmask.isValid("some_body@mail.com", {
			alias: "email"
		});
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.test("Inputmask(\"99-99[ 99/99]\").isValid(\"03-11\") - pricejt", function(assert) {
		var isValid = Inputmask("99-99[ 99/99]").isValid("03-11");
		assert.equal(isValid, true, "Result " + isValid);
	});

	qunit.module("Value unmasking");
	qunit.test("inputmask.unmask(\"23/03/1973\", { alias: \"dd/mm/yyyy\" })", function(assert) {
		var unmasked = Inputmask.unmask("23/03/1973", {
			alias: "dd/mm/yyyy"
		});
		assert.equal(unmasked, "23031973", "Result " + unmasked);
	});


});
