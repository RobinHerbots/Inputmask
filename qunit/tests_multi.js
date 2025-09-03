import { keys } from "../lib/keycode";

export default function (qunit, Inputmask) {
  const $ = Inputmask.dependencyLib;

  qunit.module("multi masks");
  qunit.test(
    'inputmask({ mask: ["99-99", "999-99"]}) - input 12345',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99-99", "999-99"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12345");
      setTimeout(function () {
        assert.equal(testmask.value, "123-45", "Result " + testmask.value);
        done();
      }, 0);
    }
  );
  qunit.test(
    'inputmask({ mask: ["999.999.999-99", "99.999.999/9999-99"]}) - input 12312312312',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["999.999.999-99", "99.999.999/9999-99"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12312312312");
      setTimeout(function () {
        assert.equal(
          testmask.value,
          "123.123.123-12",
          "Result " + testmask.value
        );
        done();
      }, 0);
    }
  );
  qunit.test(
    'inputmask({ mask: ["999.999.999-99", "99.999.999/9999-99"]}) - input 12.123123123412',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["999.999.999-99", "99.999.999/9999-99"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12.123123123412");
      setTimeout(function () {
        assert.equal(
          testmask.value,
          "12.123.123/1234-12",
          "Result " + testmask.value
        );
        done();
      }, 0);
    }
  );

  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999"]]}) - input 12345 greedy + blur',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12345");
      testmask.blur();
      setTimeout(function () {
        assert.equal(
          testmask.inputmask._valueGet(),
          "12345",
          "Result " + testmask.inputmask._valueGet()
        );
        done();
      }, 0);
    }
  );
  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999"]]}) - input 12345 not greedy',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999"],
        greedy: false,
        keepStatic: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12345");
      setTimeout(function () {
        assert.equal(testmask.value, "12345", "Result " + testmask.value);
        done();
      }, 0);
    }
  );
  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999"]]}) - input 12345-1234',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12345-1234");
      setTimeout(function () {
        assert.equal(testmask.value, "12345-1234", "Result " + testmask.value);
        done();
      }, 0);
    }
  );
  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999"]]}) - input 123451234',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123451234");
      setTimeout(function () {
        assert.equal(testmask.value, "12345-1234", "Result " + testmask.value);
        done();
      }, 0);
    }
  );
  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999"]]}) - input 1234512',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("1234512");
      setTimeout(function () {
        assert.equal(testmask.value, "12345-12__", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999", "999999-9999"]]}) - input 1234561234',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999", "999999-9999"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("1234561234");
      setTimeout(function () {
        assert.equal(testmask.value, "123456-1234", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999", "999999-9999"]]}) - input 12345-6',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999", "999999-9999"]
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12345-6");
      setTimeout(function () {
        assert.equal(testmask.value, "12345-6___", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999", "999999-9999"] , keepStatic: true}) - input 123456',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999", "999999-9999"],
        keepStatic: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123456");
      setTimeout(function () {
        assert.equal(testmask.value, "12345-6___", "Result " + testmask.value);
        done();
      }, 0);
    }
  );
  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999", "999999-9999"], keepStatic: false}) - input 123456',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999", "999999-9999"],
        keepStatic: false
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123456");
      setTimeout(function () {
        assert.equal(testmask.value, "123456-____", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    'inputmask({ mask: ["99999", "99999-9999", "999999-9999"]]}) - input 123456 (rtl)',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" dir="rtl" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["99999", "99999-9999", "999999-9999"]
      }).mask(testmask);

      testmask.focus();
      setTimeout(function () {
        // needed to pass on ie
        $("#testmask").Type("123456");
        setTimeout(function () {
          assert.equal(
            testmask.value,
            "___65-4321",
            "Result " + testmask.value
          );
          done();
        }, 0);
      }, 0);
    }
  );

  qunit.test(
    "inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] }) ",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["9 AAA-AAA", "A 999-999"]
      }).mask(testmask);

      $("#testmask").Type("1abc");
      setTimeout(function () {
        assert.equal(testmask.value, "1 ABC-___", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "inputmask({ mask: ['9 AAA-AAA', 'A 999-999'] }) ",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: ["9 AAA-AAA", "A 999-999"]
      }).mask(testmask);

      $("#testmask").Type("a123");
      setTimeout(function () {
        assert.equal(testmask.value, "A 123-___", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test("inputmask({ mask: ['99.9', 'X'}) - annames", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      mask: ["99.9", "X", "abc"],
      definitions: {
        X: {
          validator: "[xX]",
          cardinality: 1,
          casing: "upper"
        }
      }
    }).mask(testmask);

    $("#testmask").Type("x");
    assert.equal(testmask.value, "X", "Result " + testmask.value);
  });

  qunit.test(
    'inputmask({ mask: [{ "mask": "###-##-####" }]) - lynxlive',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask"),
        ssns = [
          {
            mask: "###-##-####"
          }
        ];
      Inputmask({
        mask: ssns,
        greedy: false,
        definitions: {
          "#": {
            validator: "[0-9]",
            cardinality: 1
          }
        }
      }).mask(testmask);

      $("#testmask").Type("123121234");
      assert.equal(testmask.value, "123-12-1234", "Result " + testmask.value);
    }
  );
  qunit.test("'[9-]AAA-999', '999999' - type 1A - dekdegiv", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      mask: ["[9-]AAA-999", "999999"],
      keepStatic: false
    }).mask(testmask);

    $("#testmask").Type("1a");
    assert.equal(testmask.value, "1-A__-___", "Result " + testmask.value);
  });

  qunit.test("(99 99 999999)|(*{+}) - 12abc - dekdegiv", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("(99 99 999999)|(*{+})").mask(testmask);

    $("#testmask").Type("12abc");
    assert.equal(testmask.value, "12abc", "Result " + testmask.value);
  });

  qunit.test(
    "(99 99 999999)|(*{+}) - 12 34 delete ' 34' + 2abc",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("(99 99 999999)|(*{+})").mask(testmask);

      $("#testmask").Type("12 34");
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").SendKey(keys.Backspace);
      $("#testmask").Type("2abc");
      assert.equal(testmask.value, "122abc", "Result " + testmask.value);
    }
  );

  qunit.test("(99 99 999999)|(i{+}) - 12 3abc - dekdegiv", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask("(99 99 999999)|(*{+})", {
      definitions: {
        "*": {
          validator: ".",
          cardinality: 1,
          definitionSymbol: "*"
        }
      },
      staticDefinitionSymbol: "*"
    }).mask(testmask);

    $("#testmask").Type("12 3abc");
    assert.equal(testmask.value, "12 3abc", "Result " + testmask.value);
  });
  qunit.test(
    '["(99) 9999-9999","(99) 99999-9999"] - 12123451234 - click front - asyncerror',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask(["(99) 9999-9999", "(99) 99999-9999"]).mask(testmask);

      $("#testmask").Type("12123451234");
      $.caret(testmask, 0);
      testmask.focus();
      $("#testmask").trigger("click");
      assert.equal(
        testmask.value,
        "(12) 12345-1234",
        "Result " + testmask.value
      );
    }
  );

  qunit.test(
    '["+7(999)999-99-99","+380(99)999-99-99","+375(99)999-99-99"] - andychups',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask(
        ["+7(999)999-99-99", "+380(99)999-99-99", "+375(99)999-99-99"],
        {
          keepStatic: false
        }
      ).mask(testmask);
      $("#testmask").Type("3");
      setTimeout(function () {
        assert.equal(
          testmask.inputmask._valueGet(),
          "+3__(__)___-__-__",
          "Result " + testmask.inputmask._valueGet()
        );
        done();
      }, 0);
    }
  );
  qunit.test(
    '["+7(999)999-99-99","+380(99)999-99-99","+375(99)999-99-99"] - andychups',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask(
        ["+7(999)999-99-99", "+380(99)999-99-99", "+375(99)999-99-99"],
        {
          keepStatic: false
        }
      ).mask(testmask);
      testmask.focus();
      setTimeout(function () {
        $("#testmask").trigger("click");
        assert.equal(
          testmask.inputmask._valueGet(),
          "+_(___)___-__-__",
          "Result " + testmask.inputmask._valueGet()
        );
        done();
      }, 0);
    }
  );

  qunit.test(
    "(9{4} 9{4} 9{4} 9{4})|(9{4} 9{6} 9[5])|(9{9} 9{9}) - 1234123412341234 - necrosisoff ",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("(9{4} 9{4} 9{4} 9{4})|(9{4} 9{6} 9[5])|(9{9} 9{9})", {
        keepStatic: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("1234123412341234");
      assert.equal(
        testmask.inputmask._valueGet(),
        "1234 1234 1234 1234",
        "Result " + testmask.inputmask._valueGet()
      );
    }
  );

  qunit.test(
    "(9{4} 9{4} 9{4} 9{4})|(9{4} 9{6} 9[5])|(9{9} 9{9}) - 12341234123412341 - necrosisoff ",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask("(9{4} 9{4} 9{4} 9{4})|(9{4} 9{6} 9[5])|(9{9} 9{9})", {
        keepStatic: true
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("12341234123412341");
      assert.equal(
        testmask.inputmask._valueGet(),
        "123412341 23412341_",
        "Result " + testmask.inputmask._valueGet()
      );
    }
  );

  qunit.test(
    "mask: option auto-chooses an option rather than denying input - type 3 - #2225",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: [
          "4999 9999 9999 9999",
          "5999 9999 9999 9999",
          "2999 9999 9999 9999",
          "6999 9999 9999 9999 [999]",
          "3999 999999 99999"
        ],
        greedy: false,
        keepStatic: false
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("3");
      assert.equal(
        testmask.inputmask._valueGet(),
        "3___ ______ _____",
        "Result " + testmask.inputmask._valueGet()
      );
    }
  );

  qunit.test(
    "mask: option auto-chooses an option rather than denying input - type 1 - #2225",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        mask: [
          "4999 9999 9999 9999",
          "5999 9999 9999 9999",
          "2999 9999 9999 9999",
          "6999 9999 9999 9999 [999]",
          "3999 999999 99999"
        ],
        greedy: false,
        keepStatic: false
      }).mask(testmask);
      testmask.focus();
      $("#testmask").Type("1");
      assert.equal(
        testmask.inputmask._valueGet(),
        "",
        "Result " + testmask.inputmask._valueGet()
      );
    }
  );

  qunit.test("Multi mask test - #2854", function (assert) {
    const $fixture = $("#qunit-fixture");

    function testInput(input, message, inputValue) {
      const done = assert.async(),
        testmask = document.createElement("input");
      testmask.id = "testmask-" + Date.now(); // Unique ID
      $fixture[0].appendChild(testmask); // Append to fixture

      Inputmask({
        mask: [
          "aaa-9999-*", // 3 letters, dash, 4 digits, dash, alphanumeric
          "01-16149999999999999999-9", // Specific numeric pattern
          "E00*************" // E00 followed by 13 alphanumeric chars
        ],
        casing: "upper"
      }).mask(testmask);

      testmask.focus();
      $(testmask).Type(input);
      testmask.blur();

      // **Create a new scope to preserve expectedValue**
      (function (expected, inputmask) {
        setTimeout(() => {
          assert.equal(inputmask.value, expected, message);
          $fixture[0].removeChild(inputmask); // Clean up fixture
          done();
        }, 0); // Increased timeout
      })(inputValue !== undefined ? inputValue : input, testmask); // Pass in the current expectedValue
    }

    testInput(
      "abc-1234-x",
      "Alphanumeric mask with lowercase input",
      "ABC-1234-X"
    );
    testInput(
      "09999999999999999-9",
      "Specific numeric pattern full match",
      "01-16149999999999999999-9"
    );
    testInput(
      "EABC123DEF456D",
      "E00 mask with 13 alphanumeric characters",
      "E00ABC123DEF456D"
    );

    testInput(
      "abc-1234-xyz",
      "Input exceeding max length should be switch to mask3 as this is valid",
      "ABC-1234-X"
    );
    testInput(
      "etest1234567890",
      "E00 mask with lowercase and exceeding length",
      "E00TEST123456789"
    );
  });
}
