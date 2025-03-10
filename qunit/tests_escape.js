export default function (qunit, Inputmask) {
  var $ = Inputmask.dependencyLib;
  qunit.module("Escape character");

  qunit.test('inputmask("9\\|9")', function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("9\\|9").mask(testmask);

    testmask.focus();

    $("#testmask").Type("23");
    assert.equal(testmask.value, "2|3", "Result " + testmask.value);
  });

  qunit.test('inputmask("9\\[9\\]")', function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("9\\[9\\]").mask(testmask);

    testmask.focus();

    $("#testmask").Type("23");
    assert.equal(testmask.value, "2[3]", "Result " + testmask.value);
  });

  qunit.test('inputmask("9\\\\9")', function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("9\\\\9").mask(testmask);

    testmask.focus();

    $("#testmask").Type("23");
    assert.equal(testmask.value, "2\\3", "Result " + testmask.value);
  });

  qunit.test('inputmask("9\\{9\\}")', function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("9\\{9\\}").mask(testmask);

    testmask.focus();

    $("#testmask").Type("23");
    assert.equal(testmask.value, "2{3}", "Result " + testmask.value);
  });

  qunit.test('inputmask("9\\(9\\)")', function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("9\\(9\\)").mask(testmask);

    testmask.focus();

    $("#testmask").Type("23");
    assert.equal(testmask.value, "2(3)", "Result " + testmask.value);
  });

  qunit.test('inputmask("9\\?9")', function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("9\\?9").mask(testmask);

    testmask.focus();

    $("#testmask").Type("23");
    assert.equal(testmask.value, "2?3", "Result " + testmask.value);
  });

  qunit.test('inputmask("\\9999") value not mask', function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" value="999" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("\\9999", {
      autoUnmask: true
    }).mask(testmask);

    testmask.focus();

    assert.equal(
      testmask.inputmask._valueGet(),
      "9999",
      "Result " + testmask.inputmask._valueGet()
    );
  });
}
