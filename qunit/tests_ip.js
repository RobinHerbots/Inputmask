import { keys } from "../lib/keycode";

export default function (qunit, Inputmask) {
  var $ = Inputmask.dependencyLib;

  qunit.module("IP - masks");
  qunit.test('inputmask("ip" - 10.10.10.10', function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    $fixture.append('<input type="text" id="testmask2" />');
    var testmask2 = document.getElementById("testmask2");
    Inputmask("ip").mask(testmask);

    testmask.focus();
    $("#testmask").Type("10.10.10.10");
    testmask2.focus();
    setTimeout(function () {
      assert.equal(testmask.value, "10.10.10.10", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test('inputmask("ip" - 1.1.1.1', function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    $fixture.append('<input type="text" id="testmask2" />');
    var testmask2 = document.getElementById("testmask2");
    Inputmask("ip").mask(testmask);

    testmask.focus();
    $("#testmask").Type("1.1.1.1");
    testmask2.focus();
    setTimeout(function () {
      assert.equal(testmask.value, "1.1.1.1", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test('inputmask("ip" - 255.255.255.255', function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    $fixture.append('<input type="text" id="testmask2" />');
    var testmask2 = document.getElementById("testmask2");
    Inputmask("ip").mask(testmask);

    testmask.focus();
    $("#testmask").Type("255.255.255.255");
    setTimeout(function () {
      testmask2.focus();
      assert.equal(
        testmask.value,
        "255.255.255.255",
        "Result " + testmask.value
      );
      done();
    }, 0);
  });

  qunit.test('inputmask("ip" - 192.168.1.100', function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    $fixture.append('<input type="text" id="testmask2" />');
    var testmask2 = document.getElementById("testmask2");
    Inputmask("ip").mask(testmask);

    testmask.focus();
    $("#testmask").Type("192.168.1.100");
    testmask2.focus();
    setTimeout(function () {
      assert.equal(testmask.value, "192.168.1.100", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test(
    'inputmask("ip" - 123123123123 - delete 2nd 1 - ',
    function (assert) {
      var done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      $fixture.append('<input type="text" id="testmask2" />');
      var testmask2 = document.getElementById("testmask2");
      Inputmask("ip").mask(testmask);

      testmask.focus();
      $("#testmask").Type("123123123123");
      testmask2.focus();
      $.caret(testmask, 4);
      $("#testmask").SendKey(keys.Delete);
      setTimeout(function () {
        assert.equal(
          testmask.value,
          "123.23.123.123",
          "Result " + testmask.value
        );
        done();
      }, 0);
    }
  );

  qunit.test("ip - greedy: true", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("ip", {
      greedy: true
    }).mask(testmask);

    testmask.focus();
    setTimeout(function () {
      assert.equal(
        testmask.inputmask._valueGet(),
        "___.___.___.___",
        "Result " + testmask.inputmask._valueGet()
      );
      done();
    }, 0);
  });

  qunit.test("ip - greedy: true 192.168.1.1", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("ip", {
      greedy: true
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("192.168.1.1");
    setTimeout(function () {
      assert.equal(
        testmask.inputmask._valueGet(),
        "192.168.1.1__",
        "Result " + testmask.inputmask._valueGet()
      );
      done();
    }, 0);
  });

  qunit.test("ip - greedy: true 192.168.1.1", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("ip", {
      greedy: true
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("192.168.1.1");
    setTimeout(function () {
      assert.equal(testmask.value, "192.168.1.1", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("ip - greedy: true 99999999", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("ip", {
      greedy: true
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("99999999");
    setTimeout(function () {
      assert.equal(testmask.value, "99.99.99.99", "Result " + testmask.value);
      done();
    }, 0);
  });
}
