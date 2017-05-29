export default function(qunit, $, Inputmask) {

qunit.module("Regex masks");

qunit.test("inputmask({ regex: \"[0-9]*\"});", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[0-9]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123abc45");

	assert.equal(testmask.value, "12345", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"[0-9]*\"}); ~ isComplete", function(assert) {
	var $fixture = $("#qunit-fixture"), done = assert.async();
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[0-9]*",
		oncomplete: function() {
			assert.equal(testmask.value, "1", "Result " + testmask.value);
			done();
		}
	}).mask(testmask);

	testmask.focus();
	$("#testmask").SendKey("1");
});

qunit.test("inputmask({ regex: \"[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({regex: "[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123abc45");

	assert.equal(testmask.value, "123abc45", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123abc45");

	assert.equal(testmask.value, "abc45", "Result " + testmask.value);
});


qunit.test("inputmask({ regex: \"[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123abc45");

	assert.equal(testmask.value, "abc45", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[-]?(([1-8][0-9])|[1-9]0?)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("90");

	assert.equal(testmask.value, "90", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[-]?(([1-8][0-9])|[1-9]0?)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("0");

	assert.equal(testmask.value, "", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[-]?(([1-8][0-9])|[1-9]0?)"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("-78");

	assert.equal(testmask.value, "-78", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\" - simple regex email", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("some.body@mail.com");

	assert.equal(testmask.value, "some.body@mail.com", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\" - complexer regex email", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("denise.van.de.cruys@mail.com");

	assert.equal(testmask.value, "denise.van.de.cruys@mail.com", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 1-123-4562", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("1-123-4562");

	assert.equal(testmask.value, "1-123-4562", "Result " + testmask.value);
});
qunit.test("inputmask({ regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 20-222-2222", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("20-222-2222");

	assert.equal(testmask.value, "20-222-2222", "Result " + testmask.value);
});
qunit.test("inputmask({ regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 22-222-234", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("22-222-234");

	assert.equal(testmask.value, "22-222-234", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 70-12-34", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("70-12-34");

	assert.equal(testmask.value, "70-123", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" - arame regex 12", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12");

	assert.equal(testmask.value, "12", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" } - arame regex 12.5", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12.5");

	assert.equal(testmask.value, "12.5", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" } - arame regex 12.75", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("12.75");

	assert.equal(testmask.value, "12.75", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"(abc)+(def)\" }); - Flyarbonkers regex abcdef", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "(abc)+(def)",
		jitMasking: true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("abcdef");

	assert.equal(testmask.value, "abcdef", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"(abc)+(def)\" }); - Flyarbonkers regex 123a4b5c6d7e8f", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "(abc)+(def)",
		jitMasking: true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("123a4b5c6d7e8f");

	assert.equal(testmask.value, "abcdef", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"(abc)+(def)\" }); - Flyarbonkers regex abcabcdef", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "(abc)+(def)",
		jitMasking: true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("abcabcdef");

	assert.equal(testmask.value, "abcabcdef", "Result " + testmask.value);
});

qunit.test("inputmask({ regex: \"(abc){2,4}(def)\" }); - Flyarbonkers regex abcafebcaefbfcabcdef", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "(abc){2,4}(def)",
		jitMasking: true
	}).mask(testmask);

	testmask.focus();
	$("#testmask").Type("abcafebcaefbfcabcdef");

	assert.equal(testmask.value, "abcabcabcabcdef", "Result " + testmask.value);
});

qunit.test("inputmask({regex: \"[а-яА-Я\\s]*\"}) - type space - SilentImp", function(assert) {
	var $fixture = $("#qunit-fixture");
	$fixture.append('<input type="text" id="testmask" />');
	var testmask = document.getElementById("testmask");
	Inputmask({
		regex: "[а-яА-Я\\s]*"
	}).mask(testmask);

	testmask.focus();
	$("#testmask").SendKey(Inputmask.keyCode.SPACE);

	assert.equal(testmask.value, " ", "Result " + testmask.value);
});

};
