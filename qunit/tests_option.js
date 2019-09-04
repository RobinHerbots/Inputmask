export default function (qunit, Inputmask) {
    var $ = Inputmask.dependencyLib;
	qunit.module("Extra options after masking");

	qunit.test("decimal alias add suffix later - gkostov", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({alias: "decimal", suffix: ""}).mask("testmask");
		testmask.inputmask.option({suffix: "%"});

		$("#testmask").val("123.45");
		assert.equal(testmask.value, "123.45%", "Result " + testmask.value);
	});
};
