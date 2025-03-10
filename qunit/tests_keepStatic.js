import { keys } from "../lib/keycode";

export default function (qunit, Inputmask) {
  var $ = Inputmask.dependencyLib;

  qunit.module("keepStatic mask switching");

  qunit.test(
    '{ mask: ["+55-99-9999-9999", "+55-99-99999-9999", ], keepStatic: true }',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["+55-99-9999-9999", "+55-99-99999-9999"],
        keepStatic: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("12123451234");

      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "+55-12-12345-1234",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test(
    '{ mask: "+55-99-9999|(99)-9999", keepStatic: true } - type 12123451234',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: "+55-99-9999|(99)-9999",
        keepStatic: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("12123451234");

      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "+55-12-12345-1234",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test(
    "{ mask: ['(99) 9999-9999', '(99) 99999-9999'] } - val('1212341234')",
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["(99) 9999-9999", "(99) 99999-9999"]
      }).mask(testmask);
      $("#testmask").val("1212341234");

      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "(12) 1234-1234",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test(
    '{ mask: "+55-99-9999|(99)-9999", keepStatic: false } type 12123451234',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: "+55-99-9999|(99)-9999",
        keepStatic: false
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("12123451234");

      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "+55-12-12345-1234",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test(
    '{ mask: ["+55-99-9999-9999", "+55-99-99999-9999", ], keepStatic: true } - type 12123451234 + backspace',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["+55-99-9999-9999", "+55-99-99999-9999"],
        keepStatic: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("12123451234");
      $("#testmask").SendKey(keys.Backspace);

      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "+55-12-1234-5123",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test(
    '{ mask: ["99-9999-99","99-99999-99"] } - type 12123412 + add 1 upfront',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99-9999-99", "99-99999-99"]
      }).mask(testmask);
      $("#testmask").Type("12123412");
      $.caret(testmask, 0);
      $("#testmask").Type("1");
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "11-21234-12",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test(
    '{ mask: ["99-99999-9","99-999999-9"] } - type 121234561',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99-99999-9", "99-999999-9"]
      }).mask(testmask);
      $("#testmask").Type("121234561");
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "12-123456-1",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test(
    '{ "keepStatic": true, greedy: false, mask: "(99-9)|(99999)" } - type 12345',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        keepStatic: true,
        greedy: false,
        mask: "(99-9)|(99999)"
      }).mask(testmask);
      $("#testmask").Type("12345");
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "12345",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test("7|8 999 99 99 - hiddenman", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("7|8 999 99 99").mask(testmask);
    testmask.focus();
    setTimeout(function () {
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "_ ___ __ __",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
      done();
    }, 0);
  });

  qunit.test("7|8 999 99 99 type 7 - hiddenman", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("7|8 999 99 99").mask(testmask);
    $("#testmask").Type("7");
    assert.equal(
      document.getElementById("testmask").inputmask._valueGet(),
      "7 ___ __ __",
      "Result " + document.getElementById("testmask").inputmask._valueGet()
    );
  });

  qunit.test("7|8 999 99 99 type 8 - hiddenman", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("7|8 999 99 99").mask(testmask);
    $("#testmask").Type("8");
    assert.equal(
      document.getElementById("testmask").inputmask._valueGet(),
      "8 ___ __ __",
      "Result " + document.getElementById("testmask").inputmask._valueGet()
    );
  });

  qunit.test("(78)|(79) 999 99 99", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("(78)|(79) 999 99 99").mask(testmask);
    testmask.focus();
    setTimeout(function () {
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "7_ ___ __ __",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
      done();
    }, 0);
  });

  qunit.test("(78)|(79) 999 99 99 - type 5", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("(78)|(79) 999 99 99").mask(testmask);
    testmask.focus();
    $("#testmask").Type("5");
    assert.equal(
      document.getElementById("testmask").inputmask._valueGet(),
      "75 ___ __ __",
      "Result " + document.getElementById("testmask").inputmask._valueGet()
    );
  });

  qunit.test("(78)|(74) 999 99 99", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("(78)|(74) 999 99 99").mask(testmask);
    testmask.focus();
    setTimeout(function () {
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "7_ ___ __ __",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
      done();
    }, 0);
  });

  qunit.test("5-9|(9a)-5 - keepstatic: false", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask({
      mask: "5-9|(9a)-5",
      keepStatic: false
    }).mask(testmask);
    testmask.focus();
    setTimeout(function () {
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "5-_-5",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
      done();
    }, 0);
  });

  qunit.test(
    "['(99) 9999-9999', '(99) 9-9999-9999'] - type 12123412345 - 3m0",
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["(99) 9999-9999", "(99) 9-9999-9999"],
        removeMaskOnSubmit: false,
        clearmaskonlostfocus: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("12123412345");
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "(12) 1-2341-2345",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );

  qunit.test(
    "['(99) 9999-9999', '(99) 9-9999-9999'] - type 12123412345 - backspace - 3m0",
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["(99) 9999-9999", "(99) 9-9999-9999"],
        removeMaskOnSubmit: false,
        clearmaskonlostfocus: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("12123412345");
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "(12) 1234-1234",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );
  qunit.test(
    "(99 99)|(*****) keepStatic false - type 12 abc",
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask("(99 99)|(*****)", {
        keepStatic: false
      }).mask(testmask);

      $("#testmask").Type("12 abc");
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "12 __",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );
  qunit.test(
    "(99 99)|(*****) keepStatic false - type 12 123",
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask("(99 99)|(*****)", {
        keepStatic: false
      }).mask(testmask);

      $("#testmask").Type("12 123");
      assert.equal(
        document.getElementById("testmask").inputmask._valueGet(),
        "12 12",
        "Result " + document.getElementById("testmask").inputmask._valueGet()
      );
    }
  );
  qunit.test("(99 99)|(*****) keepStatic true - type 1212", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("(99 99)|(*****)", {
      keepStatic: true
    }).mask(testmask);

    $("#testmask").Type("1212");
    assert.equal(
      document.getElementById("testmask").inputmask._valueGet(),
      "12 12",
      "Result " + document.getElementById("testmask").inputmask._valueGet()
    );
  });
  qunit.test("(99 99)|(*****) keepStatic true - type 12123", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("(99 99)|(*****)", {
      keepStatic: true
    }).mask(testmask);

    $("#testmask").Type("12123");
    assert.equal(
      document.getElementById("testmask").inputmask._valueGet(),
      "12123",
      "Result " + document.getElementById("testmask").inputmask._valueGet()
    );
  });
  qunit.test("(99 99)|(*****) keepStatic true - type abcde", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("(99 99)|(*****)", {
      keepStatic: true
    }).mask(testmask);

    $("#testmask").Type("abcde");
    assert.equal(
      document.getElementById("testmask").inputmask._valueGet(),
      "abcde",
      "Result " + document.getElementById("testmask").inputmask._valueGet()
    );
  });

  qunit.test(
    '["9+9", "(99)+99+99"] keepStatic true - type 123 - ishytow',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask(["9+9", "(99)+99+99"], {
        keepStatic: true
      }).mask(testmask);

      $("#testmask").Type("123");
      assert.equal(testmask.value, "(12)+3_+__", "Result " + testmask.value);
    }
  );
  qunit.test(
    '["9+9", "99+99", "(99)+99+99"] keepStatic true - type 12345 - ishytow',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask(["9+9", "99+99", "(99)+99+99"], {
        keepStatic: true
      }).mask(testmask);

      $("#testmask").Type("12345");
      assert.equal(testmask.value, "(12)+34+5_", "Result " + testmask.value);
    }
  );

  qunit.test(
    '["9+9", "99+99", "(99)+99+99"] keepStatic true - type 1234 - ishytow',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask(["9+9", "99+99", "(99)+99+99"], {
        keepStatic: true
      }).mask(testmask);

      $("#testmask").Type("1234");
      assert.equal(testmask.value, "12+34", "Result " + testmask.value);
    }
  );

  qunit.test(
    '["999-9999", "(999) 999-9999", "1-(999) 999-9999"] - 999-9999 - carylewis',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask(["999-9999", "(999) 999-9999", "1-(999) 999-9999"]).mask(
        testmask
      );

      $("#testmask").Type("1231234");
      assert.equal(testmask.value, "123-1234", "Result " + testmask.value);
    }
  );
  qunit.test(
    '["999-9999", "(999) 999-9999", "1-(999) 999-9999"] - (999) 999-9999 - carylewis',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask(["999-9999", "(999) 999-9999", "1-(999) 999-9999"]).mask(
        testmask
      );

      $("#testmask").Type("1231231234");
      assert.equal(
        testmask.value,
        "(123) 123-1234",
        "Result " + testmask.value
      );
    }
  );
  qunit.test(
    '["999-9999", "(999) 999-9999", "1-(999) 999-9999"] - 1-(999) 999-9999 - carylewis',
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      var testmask = document.getElementById("testmask");
      Inputmask(["999-9999", "(999) 999-9999", "1-(999) 999-9999"]).mask(
        testmask
      );

      $("#testmask").Type("11231231234");
      assert.equal(
        testmask.value,
        "1-(123) 123-1234",
        "Result " + testmask.value
      );
    }
  );

  qunit.test("(99[9]) 99999-99999 - #2619", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("(99[9]) 99999-99999", {
      keepStatic: true
    }).mask(testmask);

    $("#testmask").Type("123456789012");
    assert.equal(
      testmask.value,
      "(12) 34567-89012",
      "Result " + testmask.value
    );
  });

  qunit.test("(99[9]) 99999-99999 #2 - #2619", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask("(99[9]) 99999-99999", {
      keepStatic: true
    }).mask(testmask);

    $("#testmask").Type("1234567890123");
    assert.equal(
      testmask.value,
      "(123) 45678-90123",
      "Result " + testmask.value
    );
  });
}
