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
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask"/>');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        digits: 0,
        groupSeparator: ",",
        shortcuts: null
      }).mask(testmask);
      $(testmask).Type("-3");
      $.caret(testmask, 0, 2);
      $(testmask).Type("4");
      assert.equal(testmask.value, "4", 'Result "' + testmask.value + '"');
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
    // within min — so |min| > max below, making the bypass observable (50 vs
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

  // ---- blur entry path (focus → optional Type → blur → assert) ----

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
  // applyInputValue invokes onBeforeMask with __skipRounding on the setvalue
  // path: the alias parser clamps before checkval while the bignum-unsafe
  // parseFloat round-trip (#2715) is suppressed.

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

    // Bignum precision (#2715): values beyond Number.MAX_SAFE_INTEGER must
    // round-trip through setvalue intact, not collapse through parseFloat.
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
    // negative values, so positive-below-min relies on the onBeforeMask
    // clamp running on the setvalue path.
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

    // The pre-checkval onBeforeMask clamp absorbs most overflows; SMOO=true
    // exercises the postValidation SMO branch directly.
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

    // European locale: JS Number.toString() yields "1234.56", but with
    // radixPoint="," and groupSeparator=".", a naive unmask would treat the
    // dot as a thousands separator and read 123456 instead of 1234.56.
    // Mirror onBeforeMask's number→radixPoint normalization.
    {
      label:
        "numeric radixPoint=',' groupSeparator='.' - setValue(1234.56) preserves in-range value #2846",
      alias: "numeric",
      opts: {
        radixPoint: ",",
        groupSeparator: ".",
        digits: 2,
        min: 0,
        max: 2000
      },
      value: 1234.56,
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
    // Empty input must not trigger the min clamp — parseNumeric returns ""
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

  // Internal numeric rewrites (negation-delete, radix-dance) push their
  // already-clean buffer back with onBeforeMask bypassed — must not be
  // re-clamped through the alias parser. Deleting "-" from "-50" with
  // {max:30, SMOO:false} leaves keyboard validation to settle on "5";
  // re-clamping would coerce that to "30".
  qunit.test(
    "numeric min=-100 max=30 SMOO=false - Backspace on '-' of '-50' does not clamp to max #2846",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("numeric", {
        min: -100,
        max: 30,
        digits: 0,
        SetMaxOnOverflow: false
      }).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").Type("-50");
        assert.equal(testmask.value, "-50", "Should have -50");
        $.caret(testmask, 1);
        $("#testmask").SendKey(keys.Backspace);
        setTimeout(function () {
          assert.equal(
            testmask.value,
            "5",
            "Internal buffer rewrite from negation-delete should keep keyboard validation - got " +
              testmask.value
          );
          done();
        }, 0);
      }, 0);
    }
  );
}
