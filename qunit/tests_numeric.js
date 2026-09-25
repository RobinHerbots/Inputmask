import { keys } from "../lib/keycode";

export default function (qunit, Inputmask) {
  const $ = Inputmask.dependencyLib;

  qunit.module("Numeric.Extensions - numeric");
  qunit.test("numeric - type 1234.56", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234.56");
      assert.equal(testmask.value, "1234.56", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("numeric - type 1234.56 + type 7 between 12", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234.56");
      $.caret(testmask, 1);
      $("#testmask").Type("7");
      assert.equal(testmask.value, "17234.56", "Result " + testmask.value);
      done();
    }, 0);
  });
  qunit.module("Numeric.Extensions - currency");
  qunit.test("currency - type 1234.56", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234.56");
      assert.equal(testmask.value, "$ 1,234.56", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("currency - type 1234.56 + type 7 between 12", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234.56");
      $.caret(testmask, 3);
      $("#testmask").Type("7");
      assert.equal(testmask.value, "$ 17,234.56", "Result " + testmask.value);
      done();
    }, 0);
  });
  qunit.module("Numeric.Extensions - decimal");
  qunit.test("decimal - type 1234.56", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234.56");
      assert.equal(testmask.value, "1234.56", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("decimal - type 1234.56 + type 7 between 12", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234.56");
      $.caret(testmask, 1);
      $("#testmask").Type("7");
      assert.equal(testmask.value, "17234.56", "Result " + testmask.value);
      done();
    }, 0);
  });
  qunit.module("Numeric.Extensions - integer");
  qunit.test("integer - type 1234", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("integer").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234");
      assert.equal(testmask.value, "1234", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("integer - type 1234 + type 7 between 12", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("integer").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234");
      $.caret(testmask, 1);
      $("#testmask").Type("7");
      assert.equal(testmask.value, "17234", "Result " + testmask.value);
      done();
    }, 0);
  });
  qunit.module("Numeric.Extensions - percentage");
  qunit.test("percentage - type 25", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("percentage").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("25");
      assert.equal(testmask.value, "25 %", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("percentage - type 5 + type 7 before 5", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("percentage").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("5");
      $.caret(testmask, 0);
      $("#testmask").Type("7");
      assert.equal(testmask.value, "75 %", "Result " + testmask.value);
      done();
    }, 0);
  });
  qunit.module("Numeric.Extensions - indianns");
  qunit.test("indianns - type 1234567.89", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("indianns").mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234567.89");
      assert.equal(testmask.value, "12,34,567.89", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test(
    "indianns - type 1234567.89 + type 7 between 12",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("indianns").mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("1234567.89");
        $.caret(testmask, 1);
        $("#testmask").Type("7");
        assert.equal(
          testmask.value,
          "1,72,34,567.89",
          "Result " + testmask.value
        );
        done();
      }, 0);
    }
  );

  qunit.module("Numeric.Extensions");

  qunit.test("€ Currency precision 2", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      groupSeparator: ",",
      placeholder: "0",
      digits: 2,
      digitsOptional: false,
      prefix: "€ "
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234");
      assert.equal(testmask.value, "€ 1,234.00", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("integer type 124 correct to 1234", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      groupSeparator: ","
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("124");
    $.caret(testmask, 2);
    $("#testmask").Type("3");
    assert.equal(testmask.value, "1,234", "Result " + testmask.value);
  });

  qunit.test("numeric  type 00000 - Webunity", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      groupSeparator: ","
    }).mask(testmask);

    testmask.focus();
    setTimeout(function () {
      $("#testmask").Type("00000");
      $(testmask).trigger("blur");

      assert.equal(testmask.value, "0", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("numeric -placeholder 0 type 00000 - Webunity", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      groupSeparator: ",",
      placeholder: "0"
    }).mask(testmask);

    testmask.focus();
    setTimeout(function () {
      $("#testmask").Type("00000");
      assert.equal(testmask.value, "0", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test(
    "numeric placeholder 0 prefix € type 0.123 - Webunity",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        groupSeparator: ",",
        placeholder: "0",
        prefix: "€ "
      }).mask(testmask);

      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("0.123");

        assert.equal(testmask.value, "€ 0.123", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "numeric placeholder 0 prefix € type 0.123 - backspace - Webunity",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        groupSeparator: ",",
        placeholder: "0",
        prefix: "€ "
      }).mask(testmask);

      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("0.123");
        $("#testmask").SendKey(keys.Backspace);

        assert.equal(testmask.value, "€ 0.12", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "numeric placeholder 0 prefix € type 0.123 + add 1 in front - Webunity",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        groupSeparator: ",",
        placeholder: "0",
        prefix: "€ "
      }).mask(testmask);

      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("0.123");
        $.caret(testmask, 2);
        $("#testmask").Type("1");

        assert.equal(testmask.value, "€ 10.123", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "numeric placeholder 0 prefix € type 0.123 + add 123 in front - Webunity",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        placeholder: "0",
        prefix: "€ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("0.123");
      $.caret(testmask, 2);
      $("#testmask").Type("123");

      assert.equal(testmask.value, "€ 1230.123", "Result " + testmask.value);
    }
  );

  qunit.test(
    "numeric placeholder 0 prefix € type 0.123 + add 123 in front - Webunity",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        groupSeparator: ",",
        placeholder: "0",
        prefix: "€ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("0.123");
      $.caret(testmask, 2);
      $("#testmask").Type("123");

      assert.equal(testmask.value, "€ 1,230.123", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask("numeric", { prefix: "€ " }") - input 12345.12',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        prefix: "€ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12345.12");

      assert.equal(testmask.value, "€ 12345.12", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask("decimal", { groupSeparator: "," }") - input 12345.123',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
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
    }
  );

  qunit.test(
    'inputmask("decimal", { groupSeparator: ","}") - input 12345.123 + remove .123',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        groupSeparator: ","
      }).mask(testmask);

      testmask.focus();

      $("#testmask").Type("12345.123");
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      $(testmask).trigger("blur");
      setTimeout(function () {
        assert.equal(testmask.value, "12,345", "Result " + testmask.value);
        done();
      }, 0);
    }
  );
  qunit.test(
    'inputmask("decimal", { groupSeparator: "," }") - input 12345.123 + replace .123 => .789',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        groupSeparator: ","
      }).mask(testmask);

      testmask.focus();

      $("#testmask").Type("12345.123");
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").Type("789");

      assert.equal(testmask.value, "12,345.789", "Result " + testmask.value);
    }
  );
  qunit.test(
    'inputmask("decimal", { groupSeparator: "," }") - input 12345.123 + select replace .123 => .789',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        groupSeparator: ","
      }).mask(testmask);

      testmask.focus();

      $("#testmask").Type("12345.123");
      // $("#testmask").trigger("click");
      $.caret(testmask, 6, 10);
      $("#testmask").Type(".789");

      assert.equal(testmask.value, "12,345.789", "Result " + testmask.value);
    }
  );
  qunit.test(
    'inputmask("decimal", { groupSeparator: "," }") - input 12345.123 + remove .123',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        groupSeparator: ","
      }).mask(testmask);

      testmask.focus();

      $("#testmask").Type("12345.123");
      // $("#testmask").trigger("click");
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $(testmask).trigger("blur");
      assert.equal(testmask.value, "12,345", "Result " + testmask.value);
    }
  );
  qunit.test(
    'inputmask("decimal") - input 12345.123 + remove .123',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {}).mask(testmask);

      testmask.focus();

      $("#testmask").Type("12345.123");
      // $("#testmask").trigger("click");
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $(testmask).trigger("blur");
      assert.equal(testmask.value, "12345", "Result " + testmask.value);
    }
  );
  qunit.test(
    'inputmask("decimal") - input 12345.123 + replace .123 => .789',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {}).mask(testmask);

      testmask.focus();

      $("#testmask").Type("12345.123");
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.ArrowLeft);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").Type(".789");

      assert.equal(testmask.value, "12345.789", "Result " + testmask.value);
    }
  );

  qunit.test('inputmask("decimal") - maxlength 10', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" maxlength="10" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal").mask(testmask);

    testmask.focus();

    $("#testmask").Type("123456789012345");

    assert.equal(testmask.value, "1234567890", "Result " + testmask.value);
  });

  qunit.test('inputmask("decimal")', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal").mask(testmask);

    testmask.focus();

    $("#testmask").Type("1234567890");
    $.caret(testmask, 0, 10);
    $("#testmask").Type("12345");

    assert.equal(testmask.value, "12345", "Result " + testmask.value);
  });

  qunit.test('inputmask("decimal") - value="1234567890"', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="1234567890" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal").mask(testmask);

    testmask.focus();

    $.caret(testmask, 0, 10);
    $("#testmask").Type("12345");

    assert.equal(testmask.value, "12345", "Result " + testmask.value);
  });

  qunit.test('inputmask("decimal")', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal").mask(testmask);

    testmask.focus();

    $("#testmask").Type("1234567890");
    $.caret(testmask, 3, 5);
    $("#testmask").SendKey("0");

    assert.equal(testmask.value, "123067890", "Result " + testmask.value);
  });

  qunit.test('inputmask("decimal") - value="1234567890"', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="1234567890" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal").mask(testmask);

    testmask.focus();

    $.caret(testmask, 3, 5);
    $("#testmask").SendKey("0");

    assert.equal(testmask.value, "123067890", "Result " + testmask.value);
  });

  qunit.test(
    'inputmask("decimal") - value="123.45" Replace last integer',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        digits: 2
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123.45");
      $.caret(testmask, 2, 3);
      $("#testmask").SendKey("7");

      assert.equal(testmask.value, "127.45", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask("decimal", { digits: 2 }) - value="123" - RomeroMsk',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        digits: 2
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123");
      $.caret(testmask, 0, 3);
      $("#testmask").Type(",,...");
      $("#testmask").Type("45");

      assert.equal(testmask.value, "0.45", "Result " + testmask.value);
    }
  );

  qunit.test(
    "inputmask - Multiple inputs masked, Integer mask doesn't allow typing - #402 - albatrocity",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      $fixture.append('<input type="text" id="testmask2" />');
      const testmask2 = document.getElementById("testmask2");
      Inputmask("integer", {
        groupSeparator: ","
      }).mask(testmask);
      Inputmask("(999)-999-9999").mask(testmask2);

      testmask.focus();
      $("#testmask").Type("12345");

      assert.equal(testmask.value, "12,345", "Result " + testmask.value);

      $("#testmask2").remove();
    }
  );

  qunit.test(
    "decimal alias with groupseparator delete - YoussefTaghlabi",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        digits: 2,
        allowMinus: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("1234567");
      $.caret(testmask, 0);
      $("#testmask").SendKey(keys.Delete);

      assert.equal(testmask.value, "234,567", "Result " + testmask.value);
    }
  );

  qunit.test(
    "decimal alias with groupseparator backspace - YoussefTaghlabi",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        digits: 2,
        allowMinus: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("1234567");
      $.caret(testmask, 1);
      $("#testmask").SendKey(keys.Backspace);

      assert.equal(testmask.value, "234,567", "Result " + testmask.value);
    }
  );

  qunit.test(
    "decimal alias with minus - type -123456 - YoussefTaghlabi",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        digits: 2,
        allowMinus: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("-123456");

      assert.equal(testmask.value, "-123,456", "Result " + testmask.value);
    }
  );

  qunit.test(
    "decimal alias with plus or minus & autogroup - type 123465 - - YoussefTaghlabi",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        digits: 2,
        allowMinus: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123456");
      $.caret(testmask, 0);
      $("#testmask").SendKey("-");

      assert.equal(testmask.value, "-123,456", "Result " + testmask.value);
    }
  );

  qunit.test("decimal alias with plus or minus & autogroup", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      radixPoint: ".",
      groupSeparator: ",",
      digits: 2,
      allowMinus: true
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("1234.56");

    assert.equal(testmask.value, "1,234.56", "Result " + testmask.value);
  });

  qunit.test(
    "decimal alias set value with val() - kochelmonster",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ",",
        groupSeparator: ".",
        digits: 2,
        autoGroup: true,
        suffix: " €"
      }).mask(testmask);

      $("#testmask").val("39.399.392,22 €");

      assert.equal(
        testmask.value,
        "39.399.392,22 €",
        "Result " + testmask.value
      );
    }
  );

  qunit.test(
    'inputmask("decimal") - value="123.1" blur digitsoptional',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        digits: 3
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123.1");
      $(testmask).trigger("blur");
      setTimeout(function () {
        assert.equal(testmask.value, "123.1", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test('inputmask("decimal") - value="123.1" blur', function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      digits: 3,
      digitsOptional: false
    }).mask(testmask);

    testmask.focus();
    $("#testmask").val("123.1");
    $(testmask).trigger("blur");
    setTimeout(function () {
      assert.equal(testmask.value, "123.100", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("currency alias - 200000 => replace 2 to 3", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("200000");
      $.caret(testmask, 2, 3);
      $("#testmask").Type("3");
      assert.equal(testmask.value, "$ 300,000.00", "Result " + testmask.value);
      done();
    }, 5);
  });

  qunit.test('inputmask("integer") - -0 - laxmikantG', function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("integer", {
      placeholder: "0"
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("-0");
    $(testmask).trigger("blur");
    setTimeout(function () {
      assert.equal(testmask.value, "0", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test('inputmask("integer") - 123- - laxmikantG', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("integer", {
      placeholder: "0"
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("123-");

    assert.equal(testmask.value, "-123", "Result " + testmask.value);
  });

  qunit.test(
    'inputmask("decimal") - val("-5000,77"); - ManRueda',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        groupSeparator: ".",
        digits: 2,
        radixPoint: ","
      }).mask(testmask);

      $("#testmask").val("-5000,77");

      assert.equal(testmask.value, "-5.000,77", "Result " + testmask.value);
    }
  );

  qunit.test('inputmask("decimal") - -0 - ManRueda', function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      groupSeparator: ".",
      digits: 2,
      radixPoint: ","
    }).mask(testmask);

    $("#testmask").val("-0");
    $(testmask).trigger("blur");
    setTimeout(function () {
      assert.equal(testmask.value, "0", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test('inputmask("integer") - -5.000,77 - DrSammyD', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("integer", {
      placeholder: "0"
    }).mask(testmask);

    testmask.value = -5000.77;
    $(testmask).trigger("blur");

    assert.equal(testmask.value, "-5001", "Result " + testmask.value);
  });

  qunit.test('inputmask("integer") - 5.000,77 - DrSammyD', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("integer", {
      placeholder: "0",
      radixPoint: ","
    }).mask(testmask);

    $("#testmask").val("5.000,77");
    $(testmask).trigger("blur");

    assert.equal(testmask.value, "5001", "Result " + testmask.value);
  });

  qunit.test(
    'inputmask("decimal placeholder :"" digitsoptional: false) - 123 - loostro',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="0,00" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ",",
        digits: 2,
        digitsOptional: false,
        groupSeparator: " ",
        allowMinus: false
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      $.caret(testmask, 0);

      setTimeout(function () {
        $("#testmask").Type("123");
        assert.equal(testmask.value, "123,00", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test(
    'inputmask("decimal placeholder :"0" digitsoptional: false) - .12 - YodaJM',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        digits: 2,
        placeholder: "0",
        digitsOptional: false
      }).mask(testmask);
      testmask.focus();
      $.caret(testmask, 0, 4);

      setTimeout(function () {
        $("#testmask").Type(".12");
        assert.equal(testmask.value, "0.12", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test('inputmask("decimal") - 123456   78 - babupca', function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      alias: "decimal",
      digits: 3,
      allowMinus: false,
      digitsOptional: false,
      placeholder: "0"
    }).mask(testmask);
    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("123456");
      $.caret(testmask, 8);
      $("#testmask").Type("78");
      $.caret(testmask, 5);
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "12346.078", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("currency alias - 1234 => del 1", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234");
      $.caret(testmask, 3);
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "$ 234.00", "Result " + testmask.value);
      done();
    }, 5);
  });

  qunit.test(
    "currency alias - 0.02 => type 1 in integer part",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("0.02");
        $.caret(testmask, 3);
        $("#testmask").SendKey("1");
        assert.equal(testmask.value, "$ 1.02", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test(
    "currency alias - 0.02 => position before 0 type 1 in integer part",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("0.02");
        $.caret(testmask, 2);
        $("#testmask").SendKey("1");
        assert.equal(testmask.value, "$ 10.02", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test(
    "currency alias - 1.23 => del 1 in integer part",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("1.23");
        $.caret(testmask, 3);
        $("#testmask").SendKey(keys.Backspace);
        assert.equal(testmask.value, "$ 0.23", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test("currency alias - 1234.56 => delete all", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234.56");
      $.caret(testmask, 0, 10);
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(
        testmask.inputmask._valueGet(true),
        "$ 0.00",
        "Result " + testmask.inputmask._valueGet(true)
      );
      done();
    }, 5);
  });

  qunit.test(
    "numeric prefix='$' - paste 1234.56 - baileyjames9 & TheAndyBob",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        radixPoint: ".",
        groupSeparator: ",",
        digits: 2,
        autoGroup: true,
        prefix: "$" // No Space, this will truncate the first character
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").paste("1234.56");
        assert.equal(testmask.value, "$1,234.56", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test(
    "currency alias - 1234.56 => select integer press 1 - babupca",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("1234.56");
        $.caret(testmask, 0, 7);
        $("#testmask").SendKey("1");
        assert.equal(testmask.value, "$ 1.56", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test(
    "currency alias - 123.56 => select integer press 1 - babupca",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("123.56");
        $.caret(testmask, 0, 5);
        $("#testmask").SendKey("1");
        assert.equal(testmask.value, "$ 1.56", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test(
    "currency alias - 123.56 => select integer press 1 - babupca",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("123.56");
        $.caret(testmask, 0, 4);
        $("#testmask").SendKey("1");
        assert.equal(testmask.value, "$1.56", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test("currency alias - min 1000", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      min: 1000,
      prefix: "$ "
    }).mask(testmask);

    testmask.focus();
    setTimeout(function () {
      $("#testmask").trigger("blur");
      setTimeout(function () {
        assert.equal(testmask.value, "", "Result " + testmask.value);
        done();
      }, 0);
    }, 0);
  });

  qunit.test("currency alias - max 1000 - type 1234", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      max: 1000,
      prefix: "$ "
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("1234");
      $("#testmask").trigger("blur");
      setTimeout(function () {
        assert.equal(testmask.value, "$ 123.00", "Result " + testmask.value);
        done();
      }, 0);
    }, 5);
  });

  qunit.test(
    "currency alias - type 1010 delete first 1 - FilipeZhou",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("1010");
        $.caret(testmask, 3);
        $("#testmask").SendKey(keys.Backspace);
        assert.equal(testmask.value, "$ 10.00", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "currency alias - type 1010 delete middle 1 - FilipeZhou",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("1010");
        $.caret(testmask, 6);
        $("#testmask").SendKey(keys.Backspace);
        assert.equal(testmask.value, "$ 100.00", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test("currency alias - type -1234 delete -", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("-1234");
      $.caret(testmask, 0);
      $("#testmask").SendKey(keys.Delete);
      assert.equal(testmask.value, "$ 1,234.00", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test(
    "decimal alias - type 12345.12 add 6 in front - freeze - DatXN",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" maxlength=\'8\' />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        digits: 2,
        allowMinus: false
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      $("#testmask").Type("12345.12");
      $.caret(testmask, 0);
      $("#testmask").SendKey("6");
      assert.equal(testmask.value, "12345.12", "Result " + testmask.value);
    }
  );

  qunit.test(
    "decimal alias - type 123456789 - add , before 8 - jpontet",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        allowMinus: true,
        digits: 2,
        radixPoint: ",",
        groupSeparator: " ",
        rightAlign: false
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      $("#testmask").Type("123456789");
      $.caret(testmask, 9);
      $("#testmask").SendKey(",");
      assert.equal(testmask.value, "1 234 567,89", "Result " + testmask.value);
    }
  );

  qunit.test(
    "decimal alias - type 123456789 - add , before 8 - backspace - jpontet",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        allowMinus: true,
        digits: 2,
        radixPoint: ",",
        groupSeparator: " ",
        rightAlign: false
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      $("#testmask").Type("123456789");
      $.caret(testmask, 9);
      $("#testmask").SendKey(",");
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "123 456 789", "Result " + testmask.value);
    }
  );

  qunit.test(
    "decimal alias - type 1234567890 - add , before 9 - jpontet",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        allowMinus: true,
        digits: 2,
        radixPoint: ",",
        groupSeparator: " ",
        rightAlign: false
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      $("#testmask").Type("1234567890");
      $.caret(testmask, 11);
      $("#testmask").SendKey(",");
      assert.equal(testmask.value, "12 345 678,90", "Result " + testmask.value);
    }
  );

  qunit.test(
    "decimal alias - type 1234567890 - add , before 9 - backspace - jpontet",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        allowMinus: true,
        digits: 2,
        radixPoint: ",",
        groupSeparator: " ",
        rightAlign: false
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      $("#testmask").Type("1234567890");
      $.caret(testmask, 11);
      $("#testmask").SendKey(",");
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "1 234 567 890", "Result " + testmask.value);
    }
  );

  qunit.test(
    'numeric alias - value="-1234" minvalue = 1000',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="-1234" />');
      const testmask = document.getElementById("testmask");
      testmask.focus();
      Inputmask("numeric", {
        allowMinus: true,
        min: 1000,
        max: 3000
      }).mask(testmask);
      testmask.blur();
      setTimeout(function () {
        assert.equal(testmask.value, "1000", "Result " + testmask.value);
        done();
      }, 100);
    }
  );

  qunit.test(
    'numeric alias - value="-1234" minvalue = -1000',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="-1234" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        allowMinus: true,
        min: -1000,
        max: 3000
      }).mask(testmask);

      testmask.blur();
      assert.equal(testmask.value, "-1000", "Result " + testmask.value);
    }
  );

  qunit.test('numeric alias - value="1000" minvalue = 1000', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="1000" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      allowMinus: true,
      min: 1000,
      max: 3000
    }).mask(testmask);

    assert.equal(testmask.value, "1000", "Result " + testmask.value);
  });

  qunit.test(
    'numeric alias - value="-1000" minvalue = -1000',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="-1000" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        allowMinus: true,
        min: -1000,
        max: 3000
      }).mask(testmask);

      assert.equal(testmask.value, "-1000", "Result " + testmask.value);
    }
  );

  qunit.test(
    "decimal alias - overwrite decimal value - shahvaiz",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        groupSeparator: ",",
        suffix: "%"
      }).mask(testmask);
      $("#testmask").Type("123.123");
      $.caret(testmask, 4, 7);
      $("#testmask").Type("4");
      assert.equal(testmask.value, "123.4%", "Result " + testmask.value);
    }
  );

  qunit.test('numeric alias - placeholder: "_" - lucafik', function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      digits: 2,
      placeholder: "_",
      digitsOptional: false
    }).mask(testmask);
    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("12");
      assert.equal(testmask.value, "12.__", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test(
    "numeric alias - type 123.123 - delete all - ivodopyanov",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric").mask(testmask);
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("123.123");
        $.caret(testmask, 0, testmask.value.length);
        $("#testmask").SendKey(keys.Delete);
        assert.equal(testmask.value, "", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test("currency alias - 123 - isvalid - ivodopyanov", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("123");
      const isValid = Inputmask("currency", {
        prefix: "$ "
      }).isValid(testmask.value);
      assert.equal(
        isValid,
        true,
        "Result " + $(testmask).val() + " : " + isValid
      );
      done();
    }, 0);
  });
  qunit.test(
    "currency alias - $ 99,999,999.00 - isvalid - ivodopyanov",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      $("#testmask").Type("$ 99,999,999.00");
      const isValid = Inputmask("currency", {
        prefix: "$ "
      }).isValid(testmask.value);
      assert.equal(
        isValid,
        true,
        "Result " + $(testmask).val() + " : " + isValid
      );
    }
  );

  qunit.test("numeric alias - digits 2 type 0.12 - gharlan", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="0.12" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      digits: 2
    }).mask(testmask);
    $.caret(testmask, 0, 1);
    $("#testmask").Type("1");
    assert.equal(testmask.value, "1.12", "Result " + testmask.value);
  });
  qunit.test(
    "numeric alias - digits 2 select 0 type 1 - gharlan",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="0.00" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        digits: 2
      }).mask(testmask);
      $.caret(testmask, 0, 1);
      $("#testmask").Type("1");
      assert.equal(testmask.value, "1.00", "Result " + testmask.value);
    }
  );
  qunit.test(
    "decimal alias - value 20,00 select 2 type 5 - schmulschubiak",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="20,00" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ",",
        groupSeparator: " ",
        allowMinus: false,
        digits: 2,
        rightAlign: false
      }).mask(testmask);
      $.caret(testmask, 0, 1);
      $("#testmask").Type("5");
      assert.equal(testmask.value, "50,00", "Result " + testmask.value);
    }
  );
  qunit.test(
    "currency numericInput true - type 10020 - jaisonerick",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        allowMinus: false,
        rightAlign: false,
        groupSeparator: ".",
        radixPoint: ",",
        numericInput: true,
        digits: 2,
        prefix: "R$ ",
        unmaskAsNumber: false
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("10020");
        assert.equal(
          $(testmask).val(),
          "R$ 100,20",
          "Result " + $(testmask).val()
        );
        done();
      }, 0);
    }
  );

  qunit.test("numeric - type 978-3498064365 - andreasba", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric").mask(testmask);
    $("#testmask").Type("978-3498064365");
    assert.equal(
      $(testmask).val(),
      "-9783498064365",
      "Result " + $(testmask).val()
    );
  });
  qunit.test("numeric - type 978-3498064365 - andreasba", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      allowMinus: false
    }).mask(testmask);
    testmask.focus();
    $("#testmask").Type("978-3498064365");
    assert.equal(
      $(testmask).val(),
      "9783498064365",
      "Result " + $(testmask).val()
    );
  });
  qunit.test(
    "currency alias - isvalid - ivodopyanov - htmlmasta",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        prefix: "$ "
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        let i, isValid;
        for (i = 0; i < 10; i++) {
          $("#testmask").Type("9");
          isValid = Inputmask("currency", {
            prefix: "$ "
          }).isValid(testmask.value);
          assert.equal(
            isValid,
            true,
            'Value: "' + testmask.value + '"; isValid: ' + isValid
          );
        }
        done();
      }, 0);
    }
  );
  qunit.test("currency - goto last decimal place type 2", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);
    testmask.focus();
    $.caret(testmask, 5);
    $("#testmask").Type("2");
    assert.equal($(testmask).val(), "$ 0.02", "Result " + $(testmask).val());
  });

  qunit.test("decimal minvalue 0,3 - enter 0,2 - Aifz", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      alias: "decimal",
      radixPoint: ",",
      digits: "2",
      min: "0,3",
      max: "5",
      allowMinus: false
    }).mask(testmask);
    testmask.focus();
    $("#testmask").Type("0,2");
    setTimeout(function () {
      testmask.blur();
      assert.equal($(testmask).val(), "0,3", "Result " + $(testmask).val());
      done();
    }, 100);
  });

  qunit.test("currency max = 100 - type 200 - zigtechjs", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("percentage", {
      placeholder: "_",
      digitsOptional: false,
      digits: 2,
      max: 100,
      enforceDigitsOnBlur: true
    }).mask(testmask);
    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type("200");
      testmask.blur();
      assert.equal(testmask.value, "20.00 %", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test(
    "Numbers get swapped when cursor near suffix. #1278 - xklepio",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ",",
        digits: "2",
        autoUnmask: false,
        suffix: " €"
      }).mask(testmask);
      testmask.focus();
      $.caret(testmask, 1);
      $("#testmask").Type("52");
      assert.equal(testmask.value, "52 €", "Result " + testmask.value);
    }
  );

  qunit.test("numeric + numericInput #1328 - douglasdtc", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      groupSeparator: ".",
      radixPoint: ",",
      numericInput: true,
      digits: 2
    }).mask(testmask);
    testmask.focus();
    $("#testmask").val("237,38");

    assert.equal(testmask.value, "237,38", "Result " + testmask.value);
  });

  qunit.test("numeric + type -", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      negationSymbol: { front: "(", back: ")" },
      prefix: "$ "
    }).mask(testmask);
    testmask.focus();
    $.caret(testmask, 1);
    $("#testmask").Type("-");

    assert.equal(testmask.value, "($ 0.00)", "Result " + testmask.value);
  });

  qunit.test("numeric + type 123 - select partial type 0", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ "
    }).mask(testmask);
    testmask.focus();
    $("#testmask").val("123");
    $.caret(testmask, 0, 5);
    $("#testmask").Type("0");

    assert.equal(testmask.value, "$ 0.00", "Result " + testmask.value);
  });

  qunit.test(
    'numeric + groupSeparator: "  " backspace, - krajcot',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        digits: 0,
        groupSeparator: " ",
        prefix: "$ "
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("1");
      $.caret(testmask, 3);
      $("#testmask").SendKey(keys.Backspace);

      assert.equal(
        testmask.inputmask._valueGet(true),
        "$ 0",
        "Result " + testmask.inputmask._valueGet(true)
      );
    }
  );

  qunit.test(
    'numeric + groupSeparator: "  " delete, - krajcot',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        digits: 0,
        groupSeparator: " ",
        prefix: "$ "
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("1");
      $.caret(testmask, 2);
      $("#testmask").SendKey(keys.Delete);

      assert.equal(
        testmask.inputmask._valueGet(true),
        "$ 0",
        "Result " + testmask.inputmask._valueGet(true)
      );
    }
  );

  qunit.test("minvalue, - serGlazkov", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      alias: "integer",
      autoUnmask: false,
      rightAlign: false,
      min: 18,
      max: 80,
      prefix: "",
      suffix: " %"
    }).mask(testmask);
    testmask.focus();
    $("#testmask").Type("30");
    $.caret(testmask, 1);
    $("#testmask").SendKey(keys.Delete);
    $("#testmask").Type("1");
    assert.equal(testmask.value, "31 %", "Result " + testmask.value);
  });

  qunit.test("groupseparator ' ' - krajcot", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      groupSeparator: " ",
      suffix: " €",
      prefix: "",
      digits: 0,
      inputEventOnly: false
    }).mask(testmask);
    testmask.focus();
    $("#testmask").Type("0");
    setTimeout(function () {
      assert.equal(testmask.value, "0 €", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("decimal set 0.50", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      radixPoint: ",",
      groupSeparator: ".",
      digits: 2,
      removeMaskOnSubmit: false,
      enforceDigitsOnBlur: true,
      inputType: "number"
    }).mask(testmask);

    $(testmask).val("0.50");
    testmask.blur();
    assert.equal(testmask.value, "0,50", "Result " + testmask.value);
  });

  qunit.test("decimal set 1.000", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      radixPoint: ",",
      groupSeparator: ".",
      digits: 2,
      removeMaskOnSubmit: false
    }).mask(testmask);

    $(testmask).val("1.000");

    assert.equal(testmask.value, "1.000", "Result " + testmask.value);
  });
  qunit.test("decimal set 1234.56", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      radixPoint: ",",
      groupSeparator: ".",
      digits: 2,
      removeMaskOnSubmit: false,
      inputType: "number"
    }).mask(testmask);

    $(testmask).val("1234.56");

    assert.equal(testmask.value, "1.234,56", "Result " + testmask.value);
  });

  qunit.test("currency  set 100.00 - NurGuz", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      radixPoint: ",",
      inputType: "number",
      prefix: "$ "
    }).mask(testmask);

    $(testmask).val("100.00");

    assert.equal(testmask.value, "$ 100,00", "Result " + testmask.value);
  });

  qunit.test("decimal suffix: years => yers - marcelokohl", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      suffix: " years",
      rightAlign: false,
      onBeforeMask: function (value, opts) {
        return value;
      }
    }).mask(testmask);

    $(testmask).val("1");

    assert.equal(testmask.value, "1 years", "Result " + testmask.value);
  });

  qunit.test(
    "decimal type 38700 delete 7 type 8 - Borzák Attila",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", { groupSeparator: "," }).mask(testmask);

      $(testmask).Type("38800");
      $.caret(testmask, 3);
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").Type("8");

      assert.equal(testmask.value, "38,800", "Result " + testmask.value);
    }
  );

  qunit.test("decimal type 100. delete - Borzák Attila", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", { groupSeparator: "," }).mask(testmask);

    $(testmask).Type("100.");
    $("#testmask").SendKey(keys.Backspace);

    assert.equal(testmask.value, "100", "Result " + testmask.value);
  });

  qunit.test("Currency digits and delete #1351 - kousenlsn", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      max: "99999999.99",
      alias: "currency",
      prefix: "",
      autoUnmask: true
    }).mask(testmask);

    $(testmask).Type("1.23");
    $.caret(testmask, 0);
    $("#testmask").SendKey(keys.Delete);
    $("#testmask").SendKey(keys.Delete);
    $("#testmask").SendKey(keys.Delete);
    $("#testmask").SendKey(keys.Delete);

    assert.equal(testmask.value, "0.00", "Result " + testmask.value);
  });

  qunit.test(
    "numeric + (negationSymbol = parentheses) + (clearIncomplete = true) + type -123. then blur",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        rightAlign: false,
        digits: 3,
        enforceDigitsOnBlur: true,
        groupSeparator: ",",
        negationSymbol: {
          front: "(",
          back: ")"
        },
        clearIncomplete: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").val("-123.");
      testmask.blur();

      assert.equal(testmask.value, "(123.000)", "Result " + testmask.value);
    }
  );

  qunit.test("numeric rounding with digits 0 - dianavele", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="123,67"/>');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      radixPoint: ",",
      groupSeparator: ".",
      digits: 0,
      showMaskOnHover: false,
      showMaskOnFocus: false,
      placeholder: "0",
      digitsOptional: false,
      clearMaskOnLostFocus: false
    }).mask(testmask);

    assert.equal(testmask.value, "124", "Result " + testmask.value);
  });

  qunit.test("set 0.001 - ghost", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="0.001"/>');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      digits: 3,
      digitsOptional: false,
      suffix: " €",
      rightAlign: 0,
      groupSeparator: ".",
      radixPoint: ",",
      placeholder: "0",
      autoUnmask: true,
      removeMaskOnSubmit: true,
      inputType: "number"
    }).mask(testmask);

    assert.equal(testmask.value, "0,001", "Result " + testmask.value);
  });

  qunit.test(
    "percentage digits: 2 max: 1000.01 - jamesRUSS2 #2177",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("percentage", {
        digits: 2,
        max: "1000.01"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("9999");

      assert.equal(testmask.value, "999 %", "Result " + testmask.value);
    }
  );

  qunit.test(
    "'Decimal'. New entered value is automatically prefixed with '.' #2189",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal").mask(testmask);

      testmask.focus();
      $("#testmask").Type("123.45");
      $.caret(testmask, 0, "123.45".length);
      $("#testmask").Type("1");
      assert.equal(testmask.value, "1", "Result " + testmask.value);
    }
  );

  qunit.test("Decimal - select all type radixpoint - #2188", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      digits: 8,
      digitsOptional: false,
      max: 999999999,
      placeholder: "0.00000000",
      rightAlign: false,
      showMaskOnHover: false
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("123.45");
    $.caret(testmask, 0, "0.00000000".length);
    $("#testmask").Type(".1");
    assert.equal(testmask.value, "0.10000000", "Result " + testmask.value);
  });

  qunit.test("Decimal - set 0.0000001 - #2110", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("decimal", {
      alias: "decimal",
      placeholder: "",
      digits: 7,
      digitsOptional: true,
      groupSeparator: " ",
      autoGroup: true,
      showMaskOnHover: false,
      showMaskOnFocus: false,
      clearIncomplete: false
    }).mask(testmask);

    $("#testmask").val("0.0000001");
    assert.equal(testmask.value, "0.0000001", "Result " + testmask.value);
  });

  qunit.test("currency type 1234.56 + backspace x4", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask"/>');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      prefix: "$ ",
      inputEventOnly: false
    }).mask(testmask);
    testmask.focus();
    $.caret(testmask, 3);
    setTimeout(function () {
      $(testmask).Type("1234.56");
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "$ 123.00", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test("numeric 1 - #1617 - inputEventOnly false", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      groupSeparator: ".",
      radixPoint: ",",
      placeholder: "0",
      digits: 2,
      digitsOptional: false,
      clearMaskOnLostFocus: false,
      inputEventOnly: false
    }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $(testmask).Type("56,03");
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "5,00", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test(
    "digitsOptional: true + suffix not working as expected. can't enter decimal digits #2212",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        groupSeparator: ",",
        suffix: " EUR",
        digits: 2,
        digitsOptional: true // BUG
      }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $(testmask).Type("1234.56");
        assert.equal(
          testmask.value,
          "1,234.56 EUR",
          "Result " + testmask.value
        );
        done();
      }, 0);
    }
  );

  qunit.test(
    "initial 12345 - add new number at the end with positionCaretOnClick: select, using END key - #2223",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        positionCaretOnClick: "select",
        radixFocus: true,
        digitsOptional: false,
        digits: 2,
        _radixDance: true,
        numericInput: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      $(testmask).Type("12345");
      setTimeout(function () {
        $("#testmask").SendKey(keys.End);
        $(testmask).Type("6");
        assert.equal(testmask.value, "1234.56", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test(
    "initial 123.45 - add new number at the end with positionCaretOnClick: select, using END key - #2223",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="123.45" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        positionCaretOnClick: "select",
        radixFocus: true,
        digitsOptional: false,
        digits: 2,
        _radixDance: true,
        numericInput: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").SendKey(keys.End);
        $(testmask).Type("6");

        assert.equal(testmask.value, "1234.56", "Result " + testmask.value);
        done();
      }, 5);
    }
  );
  qunit.test(
    "initial 12345 - add new number at the end with positionCaretOnClick: select, using RIGHT key - #2223",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        positionCaretOnClick: "select",
        radixFocus: true,
        digitsOptional: false,
        digits: 2,
        _radixDance: true,
        numericInput: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      $(testmask).Type("12345");
      setTimeout(function () {
        $("#testmask").SendKey(keys.ArrowRight);
        $(testmask).Type("6");
        assert.equal(testmask.value, "1234.56", "Result " + testmask.value);
        done();
      }, 5);
    }
  );
  qunit.test(
    "initial 123.45 - add new number at the end with positionCaretOnClick: select, using RIGHT key - #2223",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="123.45" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        positionCaretOnClick: "select",
        radixFocus: true,
        digitsOptional: false,
        digits: 2,
        _radixDance: true,
        numericInput: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").SendKey(keys.ArrowRight);
        $(testmask).Type("6");
        assert.equal(testmask.value, "1234.56", "Result " + testmask.value);
        done();
      }, 5);
    }
  );

  qunit.test(
    "numeric digitsOptional true initial value 123.4",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="123.4" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        max: 999.99,
        digits: 2,
        digitsOptional: true
      }).mask(testmask);
      assert.equal(testmask.value, "123.4", "Result " + testmask.value);
    }
  );
  qunit.test(
    "numeric digitsOptional false initial value 123.4",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="123.4" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        max: 999.99,
        digits: 2,
        digitsOptional: false
      }).mask(testmask);
      assert.equal(testmask.value, "123.40", "Result " + testmask.value);
    }
  );

  qunit.test("numeric clear value - honboubao", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask"/>');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      radixPoint: ",",
      placeholder: "_",
      digits: 2,
      digitsOptional: false
    }).mask(testmask);
    testmask.value = "";

    assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
  });

  qunit.test(
    "Set negative value in percentage - estraschnov",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        radixPoint: ".",
        groupSeparator: ",",
        autoGroup: true,
        suffix: " %",
        clearMaskOnLostFocus: false
      }).mask(testmask);

      testmask.value = -54;

      assert.equal(testmask.value, "-54 %", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test(
    "setvalue() removes number before comma when positionCaretOnClick and digitsOptional are set. #2457",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "numeric",
        digits: 2,
        digitsOptional: false,
        positionCaretOnClick: "select",
        suffix: " €"
      }).mask(testmask);
      testmask.inputmask.setValue(12.36);

      assert.equal(
        testmask.value,
        "12.36 €",
        'Result "' + testmask.value + '"'
      );
    }
  );

  qunit.test(
    "Highlighting Values with Negative Numbers #2714",
    function (assert) {
      runNegativeSelectionOverwriteCase(assert, "-3");
    }
  );

  function runNegativeSelectionOverwriteCase(assert, initialValue) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask"/>');
    const testmask = document.getElementById("testmask");
    Inputmask("numeric", {
      digits: 0,
      groupSeparator: ",",
      shortcuts: null
    }).mask(testmask);

    $(testmask).Type(initialValue);
    $.caret(testmask, 0, testmask.value.length);

    $(testmask).Type("4");
    assert.equal(
      testmask.value,
      "4",
      'Result "' + testmask.value + '" for ' + initialValue
    );
  }

  qunit.test(
    "Highlighting Values with Negative Numbers -30 #2714",
    function (assert) {
      runNegativeSelectionOverwriteCase(assert, "-30");
    }
  );

  qunit.test(
    "Highlighting Values with Negative Numbers -300 #2714",
    function (assert) {
      runNegativeSelectionOverwriteCase(assert, "-300");
    }
  );

  qunit.test(
    "Highlighting Values with Negative Numbers -3000 #2714",
    function (assert) {
      runNegativeSelectionOverwriteCase(assert, "-3000");
    }
  );

  qunit.test(
    "Typing over selected value with decimal digits - #2893",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("percentage", {
        digits: 1,
        clearMaskOnEmpty: true,
        showMaskOnHover: false,
        inputType: "number",
        radixPoint: ".",
        groupSeparator: ","
      }).mask(testmask);

      $(testmask).Type("5.0");
      $.caret(testmask, 0, testmask.value.length);
      $(testmask).Type("4");
      assert.equal(testmask.value, "4 %", 'Result "' + testmask.value + '"');
      $(testmask).Type(".2");
      assert.equal(testmask.value, "4.2 %", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test(
    "Numeric field value resets to min value if min > 0 and value is blank - #2863",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        min: 10,
        max: 100,
        digits: 2,
        shortcuts: null
      }).mask(testmask);
      // blank value on focus should NOT reset to min
      $(testmask).Type("");
      $(testmask).trigger("blur");
      assert.equal(
        testmask.value,
        "",
        "Blank value should stay blank, not reset to min"
      );
      // whitespace value should also NOT reset to min
      $(testmask).Type("   ");
      $(testmask).trigger("blur");
      assert.equal(
        testmask.value,
        "",
        "Whitespace value should stay blank, not reset to min"
      );
    }
  );

  qunit.test(
    "Initial value with group separator and radix point - #2850",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        alias: "numeric",
        groupSeparator: ",",
        autoGroup: true,
        digits: 2,
        radixPoint: ".",
        digitsOptional: false,
        allowMinus: false,
        prefix: "",
        placeholder: ""
      }).mask(testmask);
      testmask.inputmask.setValue("10000.23");
      assert.equal(
        testmask.value,
        "10,000.23",
        'Result "' + testmask.value + '"'
      );
    }
  );

  qunit.test(
    "decimal min/max - type negative value with radix - #2846",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        digits: 3,
        min: -100,
        max: 30,
        shortcuts: null
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("-32.123");
      setTimeout(function () {
        assert.equal(
          $(testmask).val(),
          "-32.123",
          'Result "' + $(testmask).val() + '"'
        );
        done();
      }, 100);
    }
  );

  qunit.test(
    "Unable to replace deleted characters right of decimal with placeholder - #2801",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        digits: 2,
        groupSeparator: "",
        radixPoint: ".",
        shortcuts: null,
        placeholder: "0"
      }).mask(testmask);
      $(testmask).Type("12.34");
      // Position caret after radix point
      $.caret(testmask, 4, 4);
      // Delete "34"
      $("#testmask").SendKey(keys.Delete);
      $("#testmask").SendKey(keys.Delete);
      // Should be able to type new digits
      $(testmask).Type("56");
      assert.equal(testmask.value, "12.56", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test("Currency set null value - #2789", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask"/>');
    const testmask = document.getElementById("testmask");
    Inputmask("currency").mask(testmask);
    testmask.value = null;
    assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
  });

  qunit.test(
    "Minus is being deleted with the first digit #2860",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        digits: 0,
        groupSeparator: ",",
        shortcuts: null
      }).mask(testmask);
      $(testmask).Type("-1234");
      $.caret(testmask, 2, 2);
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "-234", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test("Clearing value leaves sticky minus #2890", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask"/>');
    const testmask = document.getElementById("testmask");
    Inputmask("currency", {
      autoUnmask: true,
      digitsOptional: true,
      placeholder: "",
      rightAlign: false,
      substituteRadixPoint: false,
      enforceDigitsOnBlur: true
    }).mask(testmask);
    $(testmask).Type("-123");
    $("#testmask").SendKey(keys.Backspace);
    $("#testmask").SendKey(keys.Backspace);
    $("#testmask").SendKey(keys.Backspace);
    assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
  });

  function currency2890Options() {
    return {
      autoUnmask: true,
      digitsOptional: true,
      placeholder: "",
      rightAlign: false,
      substituteRadixPoint: false,
      enforceDigitsOnBlur: true
    };
  }

  qunit.test(
    "Clearing value leaves lone radix on select-all + delete #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("100.");
      testmask.blur();
      assert.equal(testmask.value, "100.00", 'Result "' + testmask.value + '"');
      testmask.focus();
      $.caret(testmask, 0, testmask.value.length);
      $("#testmask").SendKey(keys.Delete);
      const masked = testmask.inputmask._valueGet();
      assert.equal(
        masked,
        "",
        'masked "' + masked + '" value "' + testmask.value + '"'
      );
    }
  );

  qunit.test(
    "Clearing value leaves lone radix on select-all + backspace #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("100.");
      testmask.blur();
      assert.equal(testmask.value, "100.00", 'Result "' + testmask.value + '"');
      testmask.focus();
      $.caret(testmask, 0, testmask.value.length);
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test(
    "Clearing value leaves lone radix on backspace digits #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("100.");
      testmask.blur();
      assert.equal(testmask.value, "100.00", 'Result "' + testmask.value + '"');
      testmask.focus();
      $.caret(testmask, testmask.value.length, testmask.value.length);
      for (let i = 0; i < 6; i++) {
        $("#testmask").SendKey(keys.Backspace);
      }
      assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test(
    "Clearing value leaves lone radix on select-all + delete without blur #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("100.");
      assert.equal(testmask.value, "100.", 'Result "' + testmask.value + '"');
      $.caret(testmask, 0, testmask.value.length);
      $("#testmask").SendKey(keys.Delete);
      assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test(
    "Clearing value leaves lone radix on backspace the radix #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("100.");
      assert.equal(testmask.value, "100.", 'Result "' + testmask.value + '"');
      $.caret(testmask, 0, testmask.value.length);
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test(
    "Clearing value leaves lone radix without autoUnmask #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        digitsOptional: true,
        placeholder: "",
        rightAlign: false,
        substituteRadixPoint: false,
        enforceDigitsOnBlur: true
      }).mask(testmask);
      $(testmask).Type("100.");
      testmask.blur();
      assert.equal(testmask.value, "100.00", 'Result "' + testmask.value + '"');
      testmask.focus();
      $.caret(testmask, 0, testmask.value.length);
      $("#testmask").SendKey(keys.Delete);
      const masked = testmask.inputmask._valueGet();
      assert.equal(
        masked,
        "",
        'masked "' + masked + '" value "' + testmask.value + '"'
      );
    }
  );

  qunit.test(
    "Clearing value leaves lone radix after click focus #2890",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("100.");
      testmask.blur();
      assert.equal(testmask.value, "100.00", 'Result "' + testmask.value + '"');
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $.caret(testmask, 0, testmask.value.length);
        $("#testmask").SendKey(keys.Delete);
        assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
        done();
      }, 50);
    }
  );

  qunit.test(
    "Clearing value leaves lone radix on select digits around radix #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("100.");
      testmask.blur();
      assert.equal(testmask.value, "100.00", 'Result "' + testmask.value + '"');
      testmask.focus();
      $.caret(testmask, 0, 3);
      $("#testmask").SendKey(keys.Delete);
      assert.equal(
        testmask.value,
        ".00",
        'after delete 100 -> value "' + testmask.value + '"'
      );
      $.caret(testmask, 0, testmask.value.length);
      $("#testmask").SendKey(keys.Delete);
      assert.equal(
        testmask.value,
        "",
        'after delete .00 -> value "' + testmask.value + '"'
      );
    }
  );

  qunit.test(
    "Clearing value leaves sticky minus typed alone #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("-");
      assert.equal(testmask.value, "-", 'Result "' + testmask.value + '"');
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test(
    "Clearing value leaves sticky minus paren negationSymbol #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", {
        ...currency2890Options(),
        negationSymbol: { front: "(", back: ")" }
      }).mask(testmask);
      $(testmask).Type("(1");
      assert.equal(testmask.value, "(1)", 'Result "' + testmask.value + '"');
      $("#testmask").SendKey(keys.Backspace);
      assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
    }
  );

  qunit.test(
    "Clearing value leaves sticky minus on select-all + delete #2890",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("currency", currency2890Options()).mask(testmask);
      $(testmask).Type("-123");
      assert.equal(testmask.value, "-123", 'Result "' + testmask.value + '"');
      $.caret(testmask, 0, testmask.value.length);
      $("#testmask").SendKey(keys.Delete);
      assert.equal(testmask.value, "", 'Result "' + testmask.value + '"');
    }
  );

  function decimal2615Test(name, opts, actions, expected) {
    qunit.test("decimal $ - " + name + " - #2615", function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("decimal", {
        digits: 2,
        prefix: "$",
        ...opts
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        actions(testmask);
        assert.equal(testmask.value, expected, "Result " + testmask.value);
        done();
      }, 0);
    });
  }

  decimal2615Test(
    "cursor at 0, type 5",
    {},
    function (testmask) {
      $.caret(testmask, 0);
      $("#testmask").SendKey("5");
    },
    "$5"
  );

  decimal2615Test(
    "type -, cursor at 0, type 5",
    {},
    function (testmask) {
      $("#testmask").SendKey("-");
      $.caret(testmask, 0);
      $("#testmask").SendKey("5");
    },
    "-$5"
  );

  decimal2615Test(
    "delete all, cursor at 0, type 5",
    {},
    function (testmask) {
      $("#testmask").Type("123");
      $.caret(testmask, 0, testmask.value.length);
      $("#testmask").SendKey(keys.Delete);
      $.caret(testmask, 0);
      $("#testmask").SendKey("5");
    },
    "$5"
  );

  decimal2615Test(
    "digitsOptional:false, cursor at 0, type 5",
    { digitsOptional: false },
    function (testmask) {
      $.caret(testmask, 0);
      $("#testmask").SendKey("5");
    },
    "$5.00"
  );

  decimal2615Test(
    "type 12345, cursor at 0, type 6 - non-regression",
    {},
    function (testmask) {
      $("#testmask").Type("12345");
      $.caret(testmask, 0);
      $("#testmask").SendKey("6");
    },
    "$6123.45"
  );

  decimal2615Test(
    "cursor at 0, type 56",
    {},
    function (testmask) {
      $.caret(testmask, 0);
      $("#testmask").SendKey("5");
      $("#testmask").SendKey("6");
    },
    "$56"
  );

  decimal2615Test(
    "radixPoint ',' groupSeparator ' ', cursor at 0, type 5",
    { radixPoint: ",", groupSeparator: " " },
    function (testmask) {
      $.caret(testmask, 0);
      $("#testmask").SendKey("5");
    },
    "$5"
  );

  decimal2615Test(
    "cursor at 0, type full-width digit \uFF15",
    {},
    function (testmask) {
      $.caret(testmask, 0);
      $("#testmask").SendKey("\uFF15");
    },
    "$\uFF15"
  );

  // Probe tests for prefix "$ " and cursor inside prefix
  decimal2615Test(
    "prefix '$ ' - cursor at 0, type 5",
    { prefix: "$ " },
    function (testmask) {
      $.caret(testmask, 0);
      $("#testmask").SendKey("5");
    },
    "$ 5"
  );

  decimal2615Test(
    "prefix '$ ' - cursor at 1 (middle of prefix), type 5",
    { prefix: "$ " },
    function (testmask) {
      $.caret(testmask, 1);
      $("#testmask").SendKey("5");
    },
    "$ 5"
  );

  decimal2615Test(
    "type 12345, cursor at 0, type 67",
    {},
    function (testmask) {
      $("#testmask").Type("12345");
      $.caret(testmask, 0);
      $("#testmask").SendKey("6");
      $("#testmask").SendKey("7");
    },
    "$67123.45"
  );

  decimal2615Test(
    "prefix '$ ' - type 12345, cursor at 0, type 67",
    { prefix: "$ " },
    function (testmask) {
      $("#testmask").Type("12345");
      $.caret(testmask, 0);
      $("#testmask").SendKey("6");
      $("#testmask").SendKey("7");
    },
    "$ 67123.45"
  );

  // ---- min/max bug reproductions ----

  [
    {
      label:
        "numeric min=-100 max=30 digits=3 SMOO=true - Type '-77777' clamps to min #2846",
      alias: "numeric",
      opts: {
        min: -100,
        max: 30,
        digits: 3,
        SetMaxOnOverflow: true
      },
      type: "-77777",
      expected: "-100"
    },
    {
      label: "numeric min=120 max=2345 - Type '1111' passes through",
      alias: "numeric",
      opts: { min: 120, max: 2345, digits: 0 },
      type: "1111",
      expected: "1111"
    },
    {
      label: "integer min=250 - Type '1500' passes through #2284",
      alias: "integer",
      opts: { min: 250 },
      type: "1500",
      expected: "1500"
    },
    {
      label:
        "numeric min=-100 max=30 digits=3 - Type '-32' passes through #2846",
      alias: "numeric",
      opts: { min: -100, max: 30, digits: 3 },
      type: "-32",
      expected: "-32"
    },
    {
      label:
        "numeric min=-100 max=30 digits=3 - Type '-32.123' passes through #2846",
      alias: "numeric",
      opts: { min: -100, max: 30, digits: 3 },
      type: "-32.123",
      expected: "-32.123"
    },
    {
      label:
        "numeric min=-100 max=30 - Type '50' rejects '0' (would exceed max 30) #2846",
      alias: "numeric",
      opts: { min: -100, max: 30, digits: 0 },
      type: "50",
      expected: "5"
    },
    {
      label: "numeric min=-100 max=30 - Type '-30' at exact max boundary #2846",
      alias: "numeric",
      opts: { min: -100, max: 30, digits: 0 },
      type: "-30",
      expected: "-30"
    },
    {
      label:
        "numeric max=30 digits=3 no min - Type '-5.5' passes through #2846",
      alias: "numeric",
      opts: { max: 30, digits: 3 },
      type: "-5.5",
      expected: "-5.5"
    },
    {
      label:
        "numeric max=30 digits=3 - Type '30.1' rejects '1' (would exceed max 30)",
      alias: "numeric",
      opts: { max: 30, digits: 3 },
      type: "30.1",
      expected: "30."
    },
    {
      label:
        "numeric min=-100 max=30 digits=3 - Type '99999' rejected (above max) #2846",
      alias: "numeric",
      opts: { min: -100, max: 30, digits: 3 },
      type: "99999",
      expected: "9"
    },
    {
      label:
        "decimal allowMinus min=-999 SMOO=true - Type '-1000' clamps to min #951",
      alias: "decimal",
      opts: { min: -999, digits: 0, SetMaxOnOverflow: true },
      type: "-1000",
      expected: "-999"
    },
    {
      label: "numeric min=-100 max=30 SMOO=true - Type '-777' clamps to min",
      alias: "numeric",
      opts: {
        min: -100,
        max: 30,
        digits: 0,
        SetMaxOnOverflow: true
      },
      type: "-777",
      expected: "-100"
    },
    {
      label:
        "numeric min=-100 SMOO=false - Type '-777' rejects keystroke below min, symmetric to above max #2846",
      alias: "numeric",
      opts: {
        min: -100,
        max: 30,
        digits: 0,
        SetMaxOnOverflow: false
      },
      type: "-777",
      expected: "-77"
    },
    {
      label:
        "numeric min=-100 default SMOO - Type '-777' rejects (default SMOO is false) #2846",
      alias: "numeric",
      opts: { min: -100, max: 30, digits: 0 },
      type: "-777",
      expected: "-77"
    },
    {
      label:
        "numeric min=-10 max=-1 SMOO=false - Type '-50' rejects below min in negative-only range #2846",
      alias: "numeric",
      opts: {
        min: -10,
        max: -1,
        digits: 0,
        SetMaxOnOverflow: false
      },
      type: "-50",
      expected: "-5"
    },
    {
      label:
        "numeric min=-10 max=-1 SMOO=true - Type '-50' clamps to min in negative-only range #2846",
      alias: "numeric",
      opts: {
        min: -10,
        max: -1,
        digits: 0,
        SetMaxOnOverflow: true
      },
      type: "-50",
      expected: "-10"
    },
    {
      label:
        "numeric min=0 allowMinus SMOO=false - Type '-5' rejects (negation disallowed) #2846",
      alias: "numeric",
      opts: {
        min: 0,
        max: 100,
        digits: 0,
        SetMaxOnOverflow: false
      },
      type: "-5",
      expected: "5"
    },
    {
      label: "numeric min=0 allowMinus SMOO=true - Type '-5' clamps to 0 #2846",
      alias: "numeric",
      opts: {
        min: 0,
        max: 100,
        digits: 0,
        SetMaxOnOverflow: true
      },
      type: "-5",
      expected: "0"
    },
    {
      label: "numeric min=-100 max=30 - Type '-100' at exact min boundary",
      alias: "numeric",
      opts: { min: -100, max: 30, digits: 0 },
      type: "-100",
      expected: "-100"
    },
    {
      label:
        "numeric min=-100 max=30 digits=3 SMOO=true - Type '-100.5' clamps to min",
      alias: "numeric",
      opts: {
        min: -100,
        max: 30,
        digits: 3,
        SetMaxOnOverflow: true
      },
      type: "-100.5",
      expected: "-100"
    },
    // #2846 negation-ambiguity guard: a '-' that comes from a literal
    // (suffix, groupSeparator) in the buffer must not be reparsed as unary
    // minus. Otherwise an above-max positive could sneak past as its negation
    // within min ÔÇö so |min| > max below, making the bypass observable (50 vs
    // -50, 100000 vs -100000 both fit their respective mins).
    {
      label:
        "numeric min=-100 max=30 suffix='-' - Type '50' must not bypass max via suffix negation check",
      alias: "numeric",
      opts: { min: -100, max: 30, suffix: "-", digits: 0 },
      type: "50",
      expected: "5-"
    },
    // Expected "100" (not "99999") because an insertable groupSeparator of '-'
    // is refused past the first thousands boundary: building "1-000" would be
    // the exact ambiguous buffer the guard rejects, so typing stops at 999.
    {
      label:
        "numeric min=-200000 max=99999 groupSeparator='-' - Type '100000' must not bypass max via groupSeparator negation check",
      alias: "numeric",
      opts: { min: -200000, max: 99999, groupSeparator: "-", digits: 0 },
      type: "100000",
      expected: "100"
    },
    {
      label:
        "numeric prefix='$' groupSeparator='.' radixPoint=',' min=-4000 digits=3 - Type '-3578' formats correctly",
      alias: "numeric",
      opts: {
        prefix: "$",
        groupSeparator: ".",
        radixPoint: ",",
        digits: 3,
        min: -4000,
        max: 4000,
        allowMinus: true
      },
      type: "-3578",
      expected: "-$3.578"
    },
    {
      label:
        "numeric prefix='$' groupSeparator='.' radixPoint=',' min=-4000 digits=3 - Type '-3578,965' (manual radix) formats correctly",
      alias: "numeric",
      opts: {
        prefix: "$",
        groupSeparator: ".",
        radixPoint: ",",
        digits: 3,
        min: -4000,
        max: 4000,
        allowMinus: true
      },
      type: "-3578,965",
      expected: "-$3.578,965"
    },
    {
      label:
        "numeric min=0 SMOO=false - Type '-5' rejects '-' upfront, no orphan '-0'",
      alias: "numeric",
      opts: { min: 0, max: 100, digits: 0 },
      type: "-5",
      expected: "5"
    },
    {
      label:
        "integer max=0 SMOO=false - toggle '-' off on '-0' normalizes to '0'",
      alias: "integer",
      opts: { max: 0 },
      type: "-0-",
      expected: "0"
    }
  ].forEach(function (tc) {
    qunit.test(tc.label, function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask(tc.alias, tc.opts).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type(tc.type);
        const msg = tc.label + " - got " + testmask.value;
        assert.equal(testmask.value, tc.expected, msg);
        done();
      }, 0);
    });
  });

  // ---- blur entry path (focus ÔåÆ optional Type ÔåÆ blur ÔåÆ assert) ----

  [
    {
      label: "numeric min=120 - value below min is clamped on blur",
      alias: "numeric",
      opts: { min: 120, max: 2345, digits: 0 },
      type: "50",
      expected: "120"
    },
    {
      label: "numeric min=120 - empty field stays empty on blur",
      alias: "numeric",
      opts: { min: 120, max: 2345, digits: 0 },
      type: "",
      expected: ""
    },
    {
      label: "numeric min=-100 max=30 - negative value clamped on blur #2846",
      alias: "numeric",
      opts: { min: -100, max: 30, digits: 0 },
      type: "-50",
      expected: "-50"
    },
    // https://github.com/RobinHerbots/Inputmask/issues/2863
    {
      label: "numeric min=1 - focus then blur empty field stays empty #2863",
      alias: "numeric",
      opts: { min: 1, digits: 0 },
      type: "",
      expected: ""
    },
    {
      label: "integer min=0 max=10 - empty field stays empty on blur",
      alias: "integer",
      opts: { min: 0, max: 10, rightAlign: false, clearIncomplete: true },
      type: "",
      expected: ""
    }
  ].forEach(function (tc) {
    qunit.test(tc.label, function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask(tc.alias, tc.opts).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        if (tc.type) $("#testmask").Type(tc.type);
        testmask.blur();
        setTimeout(function () {
          assert.equal(
            testmask.value,
            tc.expected,
            tc.label + " - got " + testmask.value
          );
          done();
        }, 0);
      }, 0);
    });
  });

  // https://github.com/RobinHerbots/Inputmask/issues/1763
  qunit.test(
    "integer min=1 max=255 - clear via val('') should stay empty #1763",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("integer", {
        min: 1,
        max: 255
      }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("100");
        testmask.blur();
        setTimeout(function () {
          assert.equal(testmask.value, "100", "Value should be 100");
          $("#testmask").val("");
          assert.equal(
            testmask.value,
            "",
            "After val('') field should be empty - got " + testmask.value
          );
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "integer min=1 max=255 - val('') then blur stays empty #1763",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("integer", {
        min: 1,
        max: 255
      }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("100");
        testmask.blur();
        setTimeout(function () {
          $("#testmask").val("");
          testmask.focus();
          testmask.blur();
          setTimeout(function () {
            assert.equal(
              testmask.value,
              "",
              "After val('') + blur field should stay empty - got " +
                testmask.value
            );
            done();
          }, 0);
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric min=-10 max=-1 - val('') stays empty not clamped to max #1763",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        min: -10,
        max: -1,
        digits: 0
      }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("-5");
        testmask.blur();
        setTimeout(function () {
          assert.equal(testmask.value, "-5", "Value should be -5");
          $("#testmask").val("");
          assert.equal(
            testmask.value,
            "",
            "After val('') field should be empty - got " + testmask.value
          );
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric min=-100 max=30 - val('50') clamped to max",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        min: -100,
        max: 30,
        digits: 0
      }).mask(testmask);
      $("#testmask").val("50");
      setTimeout(function () {
        assert.equal(
          testmask.value,
          "30",
          "val('50') should clamp to max 30 - got " + testmask.value
        );
        done();
      }, 0);
    }
  );

  qunit.test(
    "numeric min=-100 max=30 - toggle negation from -50 rejected (|50| > max)",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        min: -100,
        max: 30,
        digits: 0
      }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("-50");
        assert.equal(testmask.value, "-50", "Should have -50");
        // Toggle negation off - blocked because 50 > max 30
        $("#testmask").Type("-");
        setTimeout(function () {
          assert.equal(
            testmask.value,
            "-50",
            "Negation removal blocked because |50| > max 30 - got " +
              testmask.value
          );
          done();
        }, 0);
      }, 0);
    }
  );

  // ---- reproductions from GitHub issues ----

  // https://github.com/RobinHerbots/Inputmask/issues/2485
  // Currency-prefixed decimal (groupSeparator ".", radixPoint ",") with a
  // negative min: typing the fractional part (with a manual separator) must
  // not raise a RangeError. NOTE: the issue's auto-grouping part (raw digits
  // without a manual separator) is still broken on 5.x and uncovered here.
  qunit.test(
    "numeric prefix='$' groupSeparator='.' radixPoint=',' min=-4000 digits=3 - Type '-3578,965' no RangeError #2485",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        prefix: "$",
        groupSeparator: ".",
        radixPoint: ",",
        digits: 3,
        min: -4000,
        max: 4000,
        allowMinus: true
      }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        assert.ok(
          (function () {
            try {
              $("#testmask").Type("-3578,965");
              return true;
            } catch (e) {
              return false;
            }
          })(),
          "No RangeError while typing -3578,965"
        );
        assert.equal(testmask.value, "-$3.578,965", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  // https://github.com/RobinHerbots/Inputmask/issues/2829
  qunit.test(
    "numeric min=1 - programmatic input.value='' stays empty #2829",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", { min: 1 }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("5");
        testmask.blur();
        setTimeout(function () {
          assert.equal(testmask.value, "5", "Value should be 5");
          $("#testmask").val("");
          assert.equal(
            testmask.value,
            "",
            "Programmatic val('') should clear - got " + testmask.value
          );
          done();
        }, 0);
      }, 0);
    }
  );

  // https://github.com/RobinHerbots/Inputmask/issues/2863
  qunit.test(
    "numeric min=1 - whitespace-only value stays empty on blur #2863",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", { min: 1, digits: 0 }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").val(" ");
        testmask.blur();
        setTimeout(function () {
          assert.equal(
            testmask.value,
            "",
            "Whitespace-only field should stay empty on blur - got " +
              testmask.value
          );
          done();
        }, 0);
      }, 0);
    }
  );

  // ---- setvalue min/max clamping (#2846) ----
  // The 5.x strict setvalue path skips onBeforeMask, so clamping lives in the
  // numeric onBeforeWrite hook (its "input"/"checkval"/"blur" cases): checkval
  // writes accept every char and the final whole-value write clamps to the
  // min/max boundary.

  [
    // ---- above-max clamping with SMOO=false ----
    {
      label:
        "integer min=-999 max=999 SMOO=false - setvalue('10000') clamps to max #2846",
      alias: "integer",
      opts: { min: -999, max: 999, SetMaxOnOverflow: false },
      value: "10000",
      expected: "999"
    },
    {
      label:
        "integer min=0 max=50 SMOO=false - setvalue('99') clamps to max #2846",
      alias: "integer",
      opts: { min: 0, max: 50, SetMaxOnOverflow: false },
      value: "99",
      expected: "50"
    },
    {
      label:
        "integer min=0 max=500 SMOO=false - setvalue('123456') clamps to max #2846",
      alias: "integer",
      opts: { min: 0, max: 500, SetMaxOnOverflow: false },
      value: "123456",
      expected: "500"
    },
    {
      label:
        "numeric max=30.5 digits=1 SMOO=false - setvalue('99.9') clamps to max #2846",
      alias: "numeric",
      opts: { max: 30.5, digits: 1, SetMaxOnOverflow: false },
      value: "99.9",
      expected: "30.5"
    },

    // Bignum precision (#2715, #2775 duplicate): values beyond
    // Number.MAX_SAFE_INTEGER must round-trip through setvalue intact,
    // not collapse through parseFloat.
    {
      label:
        "numeric digits=2 - setvalue preserves bignum precision (no #2715 regression)",
      alias: "numeric",
      opts: { digits: 2, groupSeparator: ",", radixPoint: "." },
      value: "99,999,999,999,999,999,999,999.00",
      expected: "99,999,999,999,999,999,999,999.00"
    },

    // ---- below-min clamping ----
    // Negative-below-min and positive-below-min hit different branches in
    // postValidation, so each is covered.
    {
      label:
        "integer min=-999 max=999 SMOO=false - setvalue('-10000') clamps to min #2846",
      alias: "integer",
      opts: { min: -999, max: 999, SetMaxOnOverflow: false },
      value: "-10000",
      expected: "-999"
    },
    // Positive-below-min: postValidation's min branch only refreshes for
    // negative values, so positive-below-min relies on the whole-value
    // onBeforeWrite clamp on the setvalue path.
    {
      label:
        "integer min=10 max=999 SMOO=false - setvalue('5') clamps to min #2846",
      alias: "integer",
      opts: { min: 10, max: 999, SetMaxOnOverflow: false },
      value: "5",
      expected: "10"
    },
    {
      label: "numeric digits=0 min=100 - setvalue('50') clamps to min #2846",
      alias: "numeric",
      opts: { digits: 0, min: 100 },
      value: "50",
      expected: "100"
    },

    // The whole-value onBeforeWrite clamp absorbs most overflows; SMOO=true
    // exercises the postValidation SMO branch for interactive typing.
    {
      label: "integer max=999 SMOO=true - setvalue('5000') clamps to max",
      alias: "integer",
      opts: { min: 0, max: 999, SetMaxOnOverflow: true },
      value: "5000",
      expected: "999"
    },

    // ---- formatted input (prefix + groupSeparator + radix) ----
    // The numeric parser strips prefix/suffix/groupSeparator before the
    // min/max comparison, so formatted programmatic values clamp correctly
    // instead of NaN-passing through.
    {
      label:
        "numeric prefix='$' groupSeparator=',' max=1000 SMOO=false - setvalue clamps to max #2846",
      alias: "numeric",
      opts: {
        prefix: "$",
        groupSeparator: ",",
        radixPoint: ".",
        digits: 2,
        min: 0,
        max: 1000,
        SetMaxOnOverflow: false
      },
      value: "12345",
      expected: "$1,000"
    },
    {
      label:
        "numeric prefix='$' groupSeparator=',' max=1000 SMOO=false - setvalue('$5,000.00') clamps to max #2846",
      alias: "numeric",
      opts: {
        prefix: "$",
        groupSeparator: ",",
        radixPoint: ".",
        digits: 2,
        min: 0,
        // The setvalue path now runs onBeforeMask, which string-clamps the
        // whole value to the +/-boundary and alignDigits keeps the explicit
        // radix ("$1,000.00", not "$1,000"). integers-only output is covered
        // by the "12345" row above.
        max: 1000,
        SetMaxOnOverflow: false
      },
      value: "$5,000.00",
      expected: "$1,000.00"
    },
    // With digitsOptional: false the mask is not alternative, so the setvalue
    // clamp boundary keeps the mandatory fractional digits: ""$1,000.00""
    // instead of ""$1,000"".
    {
      label:
        "numeric prefix='$' groupSeparator=',' max=1000 digitsOptional=false SMOO=false - setvalue('$5,000.00') clamps to max #2846",
      alias: "numeric",
      opts: {
        prefix: "$",
        groupSeparator: ",",
        radixPoint: ".",
        digits: 2,
        digitsOptional: false,
        min: 0,
        max: 1000,
        SetMaxOnOverflow: false
      },
      value: "$5,000.00",
      expected: "$1,000.00"
    },
    // Symmetric counterpart of the "$5,000.00" above-max test: formatted
    // below-min input must also clamp (not coerce to NaN and pass through).
    {
      label:
        "numeric groupSeparator=',' min=10000 - setvalue('1,234') clamps to min #2846",
      alias: "numeric",
      opts: {
        groupSeparator: ",",
        radixPoint: ".",
        digits: 2,
        min: 10000,
        max: 99999
      },
      value: "1,234",
      expected: "10,000"
    },

    // Setvalue must not throw when onBeforeMask is null (frameworks
    // sometimes nullify alias hooks).
    {
      label: "numeric onBeforeMask=null - setvalue does not throw #2846",
      alias: "numeric",
      opts: { digits: 0, max: 50, onBeforeMask: null },
      value: "10",
      expected: "10"
    },

    // European locale: a formatted "1.234,56" string (radixPoint=",",
    // groupSeparator=".") must pass through in-range. The setvalue path runs
    // onBeforeMask, whose integerPart/decimalPart normalization tolerates the
    // groupSeparator; the min/max clamp keeps the in-range value untouched.
    {
      label:
        "numeric radixPoint=',' groupSeparator='.' - setValue('1234,56') preserves in-range value #2846",
      alias: "numeric",
      opts: {
        radixPoint: ",",
        groupSeparator: ".",
        digits: 2,
        min: 0,
        max: 2000
      },
      value: "1234,56",
      expected: "1.234,56"
    },

    // ---- baseline pass-through cases ----
    // In-range setvalue must pass through unchanged.
    {
      label:
        "numeric min=0 max=100 - setvalue('50') passes through in-range #2846",
      alias: "numeric",
      opts: { digits: 0, min: 0, max: 100 },
      value: "50",
      expected: "50"
    },
    // Empty input must not trigger the min clamp ÔÇö parseNumeric returns ""
    // and the clamp block is guarded by `initialValue !== ""`.
    {
      label: "numeric min=10 - setvalue('') leaves field empty #2846",
      alias: "numeric",
      opts: { digits: 0, min: 10, max: 999 },
      value: "",
      expected: ""
    },
    // Number arg below min: covers typeof==="number" normalization plus
    // the clamp branch in one path.
    {
      label: "numeric min=100 - setvalue(50) as number clamps to min #2846",
      alias: "numeric",
      opts: { digits: 0, min: 100, max: 999 },
      value: 50,
      expected: "100"
    },

    // After clamping a negative input up to a non-negative min, the
    // original "-" must not be re-prepended onto the boundary.
    {
      label:
        "integer min=10 max=100 - setvalue('-5') clamps to '10' (no stray '-' re-prepended)",
      alias: "integer",
      opts: { min: 10, max: 100 },
      value: "-5",
      expected: "10"
    }
  ].forEach(function (tc) {
    qunit.test(tc.label, function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask(tc.alias, tc.opts).mask(testmask);
      testmask.inputmask.setValue(tc.value);
      assert.equal(
        testmask.value,
        tc.expected,
        tc.label + " - got " + testmask.value
      );
    });
  });

  qunit.test(
    "native change/input events fire when backspacing fractional part - #2793",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      let keydownFired = 0,
        changeFired = 0,
        inputFired = 0;

      // Use digitsOptional: false to ensure value stays "0.00" when fractional part deleted
      Inputmask("numeric", {
        digits: 2,
        digitsOptional: false,
        radixPoint: ".",
        onKeyDown: function (e) {
          keydownFired++;
        }
      }).mask(testmask);

      // Track native events
      $(testmask).on("change", function () {
        changeFired++;
      });
      $(testmask).on("input", function () {
        inputFired++;
      });

      testmask.focus();
      // Type ".45" - only fractional part
      $(testmask).Type(".45");
      assert.equal(testmask.value, "0.45", "After typing .45");

      // Backspace twice to delete "45"
      $(testmask).SendKey("Backspace");
      $(testmask).SendKey("Backspace");

      setTimeout(function () {
        assert.equal(
          testmask.value,
          "0.00",
          "After backspacing twice with digitsOptional: false"
        );
        assert.ok(
          keydownFired >= 2,
          "onKeyDown should fire for each backspace, got " + keydownFired
        );
        assert.ok(
          changeFired >= 2,
          "native change event should fire for each backspace, got " +
            changeFired
        );
        assert.ok(
          inputFired >= 2,
          "native input event should fire for each backspace, got " + inputFired
        );
        done();
      }, 0);
    }
  );

  // Backspacing the last decimal digit left the empty mask plus the radix,
  // which the negation-delete check mistook for a lone sign and cleared the
  // whole field.
  [
    { typed: "0.5", expected: "0." },
    { typed: "1.5", expected: "1." }
  ].forEach(function (tc) {
    qunit.test(
      "numeric - type " + tc.typed + " then Backspace keeps the value",
      function (assert) {
        const done = assert.async(),
          $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        const testmask = document.getElementById("testmask");
        Inputmask({ alias: "decimal" }).mask(testmask);

        testmask.focus();
        $("#testmask").trigger("click");
        setTimeout(function () {
          $("#testmask").Type(tc.typed);
          $.caret(testmask, tc.typed.length);
          $("#testmask").SendKey(keys.Backspace);
          setTimeout(function () {
            assert.equal(
              testmask.value,
              tc.expected,
              "Result " + testmask.value
            );
            done();
          }, 0);
        }, 0);
      }
    );
  });

  qunit.test(
    "numeric - type -5 then Backspace clears the orphan sign",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal" }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-5");
        $.caret(testmask, 2);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  // a value that is negative but holds no entered digit is cleared, while a
  // negative value that still has one is left alone
  qunit.test(
    "numeric - type -0.5 then Backspace keeps the value",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal" }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-0.5");
        $.caret(testmask, 4);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "-0.", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric - Backspace inside a negative value keeps the value",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal" }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-5460");
        $.caret(testmask, 3);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "-560", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + mandatory digits - Backspace on the last digit clears -0.00",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="-0.05" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", numericInput: true, digits: 2 }).mask(
        testmask
      );

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $.caret(testmask, testmask.value.length);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + digit in the suffix - Backspace on the last digit keeps the value",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="-5 m2" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", suffix: " m2" }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $.caret(testmask, 3);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "-5 m2", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric - Backspace on -0.005 keeps the entered decimal zeros",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal" }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-.005");
        assert.equal(testmask.value, "-0.005", "typed " + testmask.value);
        $.caret(testmask, 6);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "-0.00", "C1 " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + a period in the suffix - Backspace on the last digit clears",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="-0.05" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        numericInput: true,
        digits: 2,
        suffix: " USD."
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $.caret(testmask, 5);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "", "C2a " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + a period in the prefix - Backspace keeps the entered zeros",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        digits: 0,
        prefix: "v.",
        stripLeadingZeroes: false
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-005");
        assert.equal(testmask.value, "-v.005", "typed " + testmask.value);
        $.caret(testmask, 6);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "-v.00", "C2b " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + digit in the suffix - Backspace next to it clears",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="-5 m2" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", suffix: " m2" }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        assert.equal(testmask.value, "-52 m2", "masked " + testmask.value);
        $.caret(testmask, 2);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "", "C3 " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + a hyphen in the suffix - Backspace keeps the value",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="0.05" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        numericInput: true,
        digits: 2,
        suffix: " pre-tax"
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $.caret(testmask, 4);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "0.00 pre-tax", "D1 " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + parenthetical negation - Backspace on the last digit clears",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="-0.05" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        numericInput: true,
        digits: 2,
        negationSymbol: { front: "(", back: ")" }
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        assert.equal(testmask.value, "(0.05)", "masked " + testmask.value);
        $.caret(testmask, 5);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "", "D2 " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  // the sign can sit at the back only, and then it is the one that has to be
  // recognised as the orphan
  qunit.test(
    "numeric + trailing-only negation - Backspace clears the orphan sign",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        negationSymbol: { front: "", back: "−" }
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("5-");
        $.caret(testmask, 1);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  // a negative value keeps its digits: the cleanup is for a lone sign, and the
  // caret landing on the sign in the reversed buffer is not that
  qunit.test(
    "numeric - type -55 then Backspace keeps the remaining digit",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal" }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-55");
        $.caret(testmask, 3);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "-5", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric - deleting the sign of -50 keeps the digits",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal" }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-50");
        $.caret(testmask, 1);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "50", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + a two character negation symbol - Backspace on the digit clears",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        negationSymbol: { front: "--", back: "" }
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-5");
        const before = testmask.value;
        $.caret(testmask, 3);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(before, "--5", "typed " + before);
          assert.equal(testmask.value, "", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + jitMasking and a prefix - Backspace on the digit clears",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", jitMasking: true, prefix: "$ " }).mask(
        testmask
      );
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-5");
        const before = testmask.value;
        $.caret(testmask, 4);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(before, "-$ 5", "typed " + before);
          assert.equal(testmask.value, "", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + paired negation - deleting one half clears",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        negationSymbol: { front: "(", back: ")" }
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-50");
        const before = testmask.value;
        $.caret(testmask, 0);
        $("#testmask").SendKey(keys.Delete);
        setTimeout(function () {
          assert.equal(before, "(50)", "typed " + before);
          assert.equal(testmask.value, "", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + trailing-only negation - Backspace keeps the remaining digit",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        negationSymbol: { front: "", back: "−" }
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("55-");
        assert.equal(testmask.value, "55−", "typed " + testmask.value);
        $.caret(testmask, 2);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "5−", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + paired negation and a hyphen in the suffix - Backspace keeps the value",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        negationSymbol: { front: "(", back: ")" },
        suffix: " pre-tax"
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("55");
        $.caret(testmask, 2);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "5 pre-tax", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "numeric + jitMasking, a prefix and a digit in the suffix - Backspace clears the orphan sign",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        jitMasking: true,
        prefix: "$ ",
        suffix: " m2"
      }).mask(testmask);
      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-5");
        $.caret(testmask, 4);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(testmask.value, "", "Result " + testmask.value);
          done();
        }, 0);
      }, 0);
    }
  );

  // Deleting a digit re-ran the alternation in generalise mode, which
  // replays the surviving input into a fresh maskset. A static in the way
  // made the replay lose track of where it had put the previous character,
  // so the next one was inserted before it and crossed the radix point.
  [
    { label: "suffix", opts: {}, typed: "1.5", caret: 3, expected: "1.%" },
    {
      label: "jitMasking",
      opts: { jitMasking: true },
      typed: "0.5",
      caret: 3,
      expected: "0.%"
    },
    {
      label: "jitMasking, two fraction digits",
      opts: { jitMasking: true },
      typed: "12.55",
      caret: 5,
      expected: "12.5%"
    },
    {
      // digitsOptional false drops the alternation, jitMasking brings it back,
      // and the replay then takes its own branch for the first input
      label: "mandatory digits with jitMasking",
      opts: { digits: 2, digitsOptional: false, jitMasking: true },
      typed: "12.55",
      caret: 5,
      expected: "12.5%"
    },
    {
      label: "prefix, no suffix",
      opts: { prefix: "$ ", suffix: "" },
      typed: "1.5",
      caret: 5,
      expected: "$ 1."
    },
    {
      label: "groupSeparator",
      opts: { groupSeparator: "," },
      typed: "1234.5",
      caret: 7,
      expected: "1,234.%"
    },
    { label: "negative", opts: {}, typed: "-1.5", caret: 4, expected: "-1.%" }
  ].forEach(function (tc) {
    qunit.test(
      "numeric - Backspace keeps the digits on their side of the radix (" +
        tc.label +
        ")",
      function (assert) {
        const done = assert.async(),
          $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        const testmask = document.getElementById("testmask");
        Inputmask(
          Object.assign({ alias: "decimal", suffix: "%" }, tc.opts)
        ).mask(testmask);

        testmask.focus();
        $("#testmask").trigger("click");
        setTimeout(function () {
          $("#testmask").Type(tc.typed);
          $.caret(testmask, tc.caret);
          $("#testmask").SendKey(keys.Backspace);
          setTimeout(function () {
            assert.equal(
              testmask.value,
              tc.expected,
              "Result " + testmask.value
            );
            done();
          }, 0);
        }, 0);
      }
    );
  });
  // Typing "-" onto a negative value is refused when the unsigned value
  // would exceed max. Removing the sign by Backspace, Delete or cut is the
  // same flip and must be refused the same way - otherwise "-50" with max 30
  // became "50", a value typing never lets in, and blur then clamped it to
  // "30". Deleting digits, or the sign together with digits, is ordinary
  // editing and goes through. #2846
  function signDeletionTest(name, opts, tc) {
    qunit.test(name, function (assert) {
      const done = assert.async();
      $("#qunit-fixture").append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", opts).mask(testmask);

      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type(tc.typed);
        if (tc.shown !== undefined) {
          assert.equal(
            testmask.value,
            tc.shown,
            "starting value " + testmask.value
          );
        }
        const seen = tc.act(testmask);
        setTimeout(function () {
          if (Array.isArray(tc.expected)) {
            assert.deepEqual(seen, tc.expected, "Result " + seen.join(" > "));
          } else {
            assert.equal(
              testmask.value,
              tc.expected,
              "Result " + testmask.value
            );
          }
          if (tc.caretWithin) {
            // a deletion collapses the selection, refused or not - onto it
            const pos = $.caret(testmask);
            assert.ok(
              pos.begin === pos.end &&
                pos.begin >= tc.caretWithin[0] &&
                pos.begin <= tc.caretWithin[1],
              "Caret " + pos.begin + "-" + pos.end
            );
          }
          if (!tc.blur) {
            done();
            return;
          }
          $("#testmask").trigger("blur");
          setTimeout(function () {
            assert.equal(
              testmask.value,
              tc.expected,
              "after blur " + testmask.value
            );
            done();
          }, 0);
        }, 0);
      }, 0);
    });
  }

  function press(key, begin, end) {
    return function (el) {
      $.caret(el, begin, end === undefined ? begin : end);
      $(el).SendKey(keys[key]);
    };
  }

  function typeOver(chars, begin, end) {
    return function (el) {
      $.caret(el, begin, end);
      $(el).Type(chars);
    };
  }

  // headless Chrome refuses clipboard writes; cutEvent only needs its
  // synchronous writeText call to succeed
  function cut(begin, end) {
    return function (el) {
      const clipboard = Object.getOwnPropertyDescriptor(
        window.navigator,
        "clipboard"
      );
      Object.defineProperty(window.navigator, "clipboard", {
        configurable: true,
        value: { writeText: function () {} }
      });
      $.caret(el, begin, end);
      try {
        $(el).trigger("cut");
      } finally {
        if (clipboard) {
          Object.defineProperty(window.navigator, "clipboard", clipboard);
        } else {
          delete window.navigator.clipboard;
        }
      }
    };
  }

  const signMax30 = { min: -100, max: 30, digits: 0 };

  [
    {
      label: "Backspace",
      typed: "-50",
      act: press("Backspace", 1),
      expected: "-50"
    },
    { label: "Delete", typed: "-50", act: press("Delete", 0), expected: "-50" },
    {
      label: "within range",
      typed: "-20",
      act: press("Backspace", 1),
      expected: "20"
    },
    {
      label: "SetMaxOnOverflow",
      typed: "-50",
      act: press("Backspace", 1),
      expected: "-50",
      opts: { SetMaxOnOverflow: true }
    },
    {
      label: "prefix",
      typed: "-50",
      act: press("Backspace", 1),
      expected: "-$ 50",
      opts: { prefix: "$ " }
    },
    {
      // Backspace skips the static prefix and reaches the sign from here
      label: "prefix, caret after it",
      typed: "-50",
      act: press("Backspace", 3),
      expected: "-$ 50",
      opts: { prefix: "$ " }
    },
    {
      label: "prefix, sign and prefix selected, Backspace",
      typed: "-50",
      act: press("Backspace", 0, 3),
      expected: "-$ 50",
      opts: { prefix: "$ " }
    },
    {
      label: "prefix, sign and prefix selected, Delete",
      typed: "-50",
      act: press("Delete", 0, 3),
      expected: "-$ 50",
      opts: { prefix: "$ " }
    },
    {
      label: "no max",
      typed: "-50",
      act: press("Backspace", 1),
      expected: "50",
      opts: { max: null }
    }
  ].forEach(function (tc) {
    signDeletionTest(
      "numeric max=30 - removing the sign of " +
        tc.typed +
        " past max (" +
        tc.label +
        ")",
      Object.assign({ SetMaxOnOverflow: false }, signMax30, tc.opts),
      Object.assign({ blur: true }, tc)
    );
  });

  // the typed "-" guard a deletion follows refuses a flip out of range both
  // ways - to positive past max, to negative past min - in either mode
  [
    { label: "-50 to 50, max 30", typed: "-50", opts: { min: -100, max: 30 } },
    { label: "50 to -50, min -30", typed: "50", opts: { min: -30, max: 100 } }
  ].forEach(function (tc) {
    [false, true].forEach(function (setMax) {
      signDeletionTest(
        "numeric - typing - is refused (" +
          tc.label +
          ", SetMaxOnOverflow " +
          setMax +
          ")",
        Object.assign({ digits: 0, SetMaxOnOverflow: setMax }, tc.opts),
        {
          typed: tc.typed,
          act: typeOver("-", 0, 0),
          expected: tc.typed,
          blur: true
        }
      );
    });
  });

  [
    {
      label: "a digit, not the sign",
      act: press("Backspace", 3, 3),
      expected: "-5"
    },
    {
      label: "the sign and a digit",
      act: press("Delete", 0, 2),
      expected: "0"
    },
    {
      // half a paired sign still clears the value, max or not
      label: "parenthetical negation",
      act: press("Backspace", 1, 1),
      expected: "",
      opts: { negationSymbol: { front: "(", back: ")" } }
    }
  ].forEach(function (tc) {
    signDeletionTest(
      "numeric max=30 - deleting part of -50 (" + tc.label + ")",
      Object.assign({}, signMax30, tc.opts),
      Object.assign({ typed: "-50" }, tc)
    );
  });

  // a lone sign holds no number to push past max - it can still be cleared
  signDeletionTest(
    "numeric max=-1 - Backspace on a lone sign clears it",
    { min: -100, max: -1, digits: 0 },
    { typed: "-", act: press("Backspace", 0, 1), expected: "" }
  );

  // replacing a selection by typing is keyboard validation already
  [
    { label: "cut the sign", act: cut(0, 1), expected: "-50" },
    {
      label: "Ctrl+Backspace on the sign",
      act: function (el) {
        $.caret(el, 1);
        $(el).SendKey(keys.Backspace, keys.Control);
      },
      expected: "-50"
    },
    {
      label: "replace the sign and a digit with a digit past max",
      act: typeOver("9", 0, 2),
      expected: "-50"
    },
    {
      label: "replace the sign and a digit with a digit within max",
      act: typeOver("2", 0, 2),
      expected: "20"
    },
    {
      label: "replace a digit, sign kept",
      act: typeOver("9", 1, 2),
      expected: "-90"
    }
  ].forEach(function (tc) {
    signDeletionTest(
      "numeric max - other deletions past max (" + tc.label + ")",
      signMax30,
      Object.assign({ typed: "-50" }, tc)
    );
  });

  signDeletionTest(
    "numeric max=30 - a refused Backspace on the sign leaves the caret",
    signMax30,
    {
      typed: "-50",
      act: press("Backspace", 1),
      expected: "-50",
      caretWithin: [1, 1]
    }
  );

  // the sign goes back without the value being typed again: an affix with a
  // digit and a two-character symbol stay as they were, and so does the caret
  [
    {
      label: "prefix with a digit, Delete before the sign",
      opts: { prefix: "v2 " },
      act: press("Delete", 0),
      expected: "-v2 50"
    },
    {
      label: "suffix with a digit, Delete before the sign",
      opts: { suffix: " m2" },
      act: press("Delete", 0),
      expected: "-50 m2"
    },
    {
      label: "two character negation symbol, Delete before it",
      opts: { negationSymbol: { front: "--", back: "" } },
      act: press("Delete", 0),
      expected: "--50"
    },
    {
      label: "Delete before the sign keeps the caret",
      act: press("Delete", 0),
      expected: "-50",
      caretWithin: [0, 0]
    },
    {
      label: "a selected sign, Backspace",
      act: press("Backspace", 0, 1),
      expected: "-50",
      caretWithin: [0, 1]
    },
    {
      label: "a selected sign, Delete",
      act: press("Delete", 0, 1),
      expected: "-50",
      caretWithin: [0, 1]
    }
  ].forEach(function (tc) {
    signDeletionTest(
      "numeric max=30 - a refused deletion restores the value (" +
        tc.label +
        ")",
      Object.assign({}, signMax30, tc.opts),
      Object.assign({ typed: "-50" }, tc)
    );
  });

  // with a negative max, clearing the whole value leaves no number at all -
  // that is not a value above max, so it goes through
  ["Backspace", "Delete", "cut"].forEach(function (how) {
    signDeletionTest(
      "numeric max=-1 - clearing -50 with " + how + " empties the field",
      { min: -100, max: -1, digits: 0 },
      {
        typed: "-50",
        act: how === "cut" ? cut(0, 3) : press(how, 0, 3),
        expected: ""
      }
    );
  });

  // the restored value keeps its exact digits - nothing is rounded past
  // 2^53, written in exponent notation, or stripped of its separators
  [
    { label: "beyond 2^53", typed: "-9007199254740993", opts: {} },
    {
      label: "a tiny fraction",
      typed: "-0.0000001",
      opts: { max: 0, digits: 7 }
    },
    {
      label: "group separators",
      typed: "-1234",
      opts: { max: 1000, groupSeparator: "," },
      shown: "-1,234"
    }
  ].forEach(function (tc) {
    const shown = tc.shown || tc.typed;
    signDeletionTest(
      "numeric - a refused deletion restores the exact number (" +
        tc.label +
        ")",
      Object.assign({ min: null, max: 30, digits: 0 }, tc.opts),
      { typed: tc.typed, shown, act: press("Delete", 0), expected: shown }
    );
  });

  // deleting digits moves a negative value towards zero, past a negative
  // max on the way - ordinary editing, which typing passes through as well
  [
    {
      label: "digits of -1000, max -50",
      opts: { min: -1000, max: -50, SetMaxOnOverflow: true },
      typed: "-1000",
      expected: ["-100", "-10", "-1"]
    },
    {
      label: "digits of -1000, max -50, no SetMaxOnOverflow",
      opts: { min: -1000, max: -50, SetMaxOnOverflow: false },
      typed: "-1000",
      expected: ["-100", "-10", "-1"]
    },
    {
      label: "digits of 1000, min 50",
      opts: { min: 50, max: 1000, SetMaxOnOverflow: true },
      typed: "1000",
      expected: ["100", "10", "1"]
    }
  ].forEach(function (tc) {
    signDeletionTest(
      "numeric - Backspace keeps deleting digits (" + tc.label + ")",
      Object.assign({ digits: 0 }, tc.opts),
      {
        typed: tc.typed,
        act: function (el) {
          $.caret(el, el.value.length);
          return tc.expected.map(function () {
            $(el).SendKey(keys.Backspace);
            return el.value;
          });
        },
        expected: tc.expected
      }
    );
  });

  // with a negative max the flip is refused too, like typing "-"; taking the
  // sign together with a digit is not a flip and goes through
  [
    {
      label: "Backspace on the sign",
      act: press("Backspace", 1, 1),
      expected: "-50"
    },
    {
      label: "the sign and a digit selected",
      act: press("Delete", 0, 2),
      expected: "0"
    }
  ].forEach(function (tc) {
    signDeletionTest(
      "numeric max=-1 - deleting from -50 (" + tc.label + ")",
      { max: -1, digits: 0 },
      Object.assign({ typed: "-50" }, tc)
    );
  });

  // jitMasking has not rendered the affixes or the mandatory digits yet, and
  // the refusal leaves it that way - no padding, the caret where it was
  [
    {
      label: "jitMasking, prefix not yet shown",
      opts: { max: 1000, jitMasking: true, prefix: "$ ", groupSeparator: " " },
      typed: "-1234",
      shown: "-1 234"
    },
    {
      label: "jitMasking, mandatory digits not yet shown",
      opts: {
        min: -100,
        max: 30,
        digits: 2,
        digitsOptional: false,
        jitMasking: true,
        prefix: "$ "
      },
      typed: "-50",
      shown: "-$ 50"
    }
  ].forEach(function (tc) {
    signDeletionTest(
      "numeric - Delete before the sign is refused (" + tc.label + ")",
      Object.assign({ digits: 0 }, tc.opts),
      {
        typed: tc.typed,
        shown: tc.shown,
        act: press("Delete", 0),
        expected: tc.shown,
        caretWithin: [0, 0]
      }
    );
  });

  // the value is not parsed out of the shown text: an unmaskAsNumber option,
  // or a prefix that is also the radix, leave it exactly as it was
  [
    {
      label: "unmaskAsNumber, a tiny fraction",
      opts: { min: null, max: 0, digits: 7, unmaskAsNumber: true },
      typed: "-0.0000001",
      shown: "-0.0000001"
    },
    {
      label: "unmaskAsNumber, beyond 2^53",
      opts: { min: null, max: 30, unmaskAsNumber: true },
      typed: "-9007199254740993",
      shown: "-9007199254740993"
    },
    {
      label: "jitMasking, a prefix that is the radix",
      opts: {
        max: 1000,
        digits: 2,
        jitMasking: true,
        prefix: ".",
        groupSeparator: ","
      },
      typed: "-1234.56",
      shown: "-1,234.56"
    }
  ].forEach(function (tc) {
    signDeletionTest(
      "numeric - a refused flip leaves the value as shown (" + tc.label + ")",
      Object.assign({ digits: 0 }, tc.opts),
      {
        typed: tc.typed,
        shown: tc.shown,
        act: press("Delete", 0),
        expected: tc.shown
      }
    );
  });
}
