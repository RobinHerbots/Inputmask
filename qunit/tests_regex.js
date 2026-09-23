import { keys } from "../lib/keycode";

export default function (qunit, Inputmask) {
  const $ = Inputmask.dependencyLib;

  qunit.module("Regex masks");

  qunit.test('inputmask({ regex: "[0-9]*"});', function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      regex: "[0-9]*"
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("123abc45");

    assert.equal(testmask.value, "12345", "Result " + testmask.value);
  });

  qunit.test('inputmask({ regex: "[0-9]*"}); ~ isComplete', function (assert) {
    const $fixture = $("#qunit-fixture"),
      done = assert.async();
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      regex: "[0-9]*",
      oncomplete: function () {
        assert.equal(testmask.value, "1", "Result " + testmask.value);
        done();
      }
    }).mask(testmask);

    testmask.focus();
    $("#testmask").SendKey("1");
  });

  qunit.test(
    'inputmask({ regex: "[A-Za-z\u0410-\u044F\u0401\u04510-9]*"});',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123abc45");

      assert.equal(testmask.value, "123abc45", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*"});',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123abc45");

      assert.equal(testmask.value, "abc45", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*"});',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123abc45");

      assert.equal(testmask.value, "abc45", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "[-]?(([1-8][0-9])|[1-9]0?)"});',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "[-]?(([1-8][0-9])|[1-9]0?)"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("90");

      assert.equal(testmask.value, "90", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "[-]?(([1-8][0-9])|[1-9]0?)"});',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "[-]?(([1-8][0-9])|[1-9]0?)"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("0");

      assert.equal(testmask.value, "", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "[-]?(([1-8][0-9])|[1-9]0?)"});',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "[-]?(([1-8][0-9])|[1-9]0?)"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("-78");

      assert.equal(testmask.value, "-78", "Result " + testmask.value);
    }
  );

  qunit.test(
    "inputmask({ regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\" - simple regex email",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("some.body@mail.com");
      testmask.blur();

      assert.equal(
        testmask.value,
        "some.body@mail.com",
        "Result " + testmask.value
      );
    }
  );

  qunit.test(
    "inputmask({ regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\" - complexer regex email",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*)?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("denise.van.de.cruys@mail.com");
      testmask.blur();

      assert.equal(
        testmask.value,
        "denise.van.de.cruys@mail.com",
        "Result " + testmask.value
      );
    }
  );

  qunit.test(
    'inputmask({ regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" - mrpanacs regex 1-123-4562',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("1-123-4562");

      assert.equal(testmask.value, "1-123-4562", "Result " + testmask.value);
    }
  );
  qunit.test(
    'inputmask({ regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" - mrpanacs regex 20-222-2222',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("20-222-2222");

      assert.equal(testmask.value, "20-222-2222", "Result " + testmask.value);
    }
  );
  qunit.test(
    'inputmask({ regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" - mrpanacs regex 22-222-234',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("22-222-234");

      assert.equal(testmask.value, "22-222-234", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" - mrpanacs regex 70-12-34',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("70-12-34");

      assert.equal(testmask.value, "70-123-4___", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" - mrpanacs regex 70-12-34567',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("70-12-34567");

      assert.equal(testmask.value, "70-123-4567", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" - arame regex 12',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12");

      assert.equal(testmask.value, "12", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" } - arame regex 12.5',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12.5");

      assert.equal(testmask.value, "12.5", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" } - arame regex 12.75',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("12.75");

      assert.equal(testmask.value, "12.75", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "(abc)+(def)" }); - Flyarbonkers regex abcdef',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "(abc)+(def)",
        jitMasking: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("abcdef");

      assert.equal(testmask.value, "abcdef", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "(abc)+(def)" }); - Flyarbonkers regex 123a4b5c6d7e8f',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "(abc)+(def)",
        jitMasking: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("123a4b5c6d7e8f");

      assert.equal(testmask.value, "abcdef", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "(abc)+(def)" }); - Flyarbonkers regex abcabcdef',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "(abc)+(def)",
        jitMasking: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("abcabcdef");

      assert.equal(testmask.value, "abcabcdef", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({ regex: "(abc){2,4}(def)" }); - Flyarbonkers regex abcafebcaefbfcabcdef',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "(abc){2,4}(def)",
        jitMasking: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("abcafebcaefbfcabcdef");

      assert.equal(
        testmask.value,
        "abcabcabcabcdef",
        "Result " + testmask.value
      );
    }
  );

  qunit.test(
    'inputmask({regex: "[а-яА-Я\\s]*"}) - type space - SilentImp',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "[а-яА-Я\\s]*"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").SendKey(keys.Space);

      assert.equal(testmask.value, " ", "Result " + testmask.value);
    }
  );

  qunit.test(
    'inputmask({regex: "\\+7 \\(\\d{3}\\) \\d{3} \\d{4}"}) - hxss',
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "\\+7 \\(\\d{3}\\) \\d{3} \\d{4}"
      }).mask(testmask);

      testmask.focus();
      setTimeout(function () {
        assert.equal(
          testmask.inputmask.__valueGet.call(testmask),
          "+7 (___) ___ ____",
          "Result " + testmask.inputmask.__valueGet.call(testmask)
        );
        done();
      }, 0);
    }
  );

  qunit.test("[0-9]{2}|[0-9]{3} - type 123", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({
      regex: "[0-9]{2}|[0-9]{3}"
    }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("123");

    assert.equal(
      testmask.inputmask.__valueGet.call(testmask),
      "123",
      "Result " + testmask.inputmask.__valueGet.call(testmask)
    );
  });

  qunit.test(
    "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc) - type maimairel",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("10px");

      assert.equal(
        testmask.inputmask.__valueGet.call(testmask),
        "10px",
        "Result " + testmask.inputmask.__valueGet.call(testmask)
      );
    }
  );

  qunit.test(
    "([A-Z]* [A-Z]*)|([a-z]* [a-z]*) - type 1 (non-matching) - no freeze",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "([A-Z]* [A-Z]*)|([a-z]* [a-z]*)"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("1");

      assert.equal(testmask.value, "", "Result " + testmask.value);
    }
  );

  qunit.test(
    "([A-Z]* [A-Z]*)|([a-z]* [a-z]*) - type uppercase",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "([A-Z]* [A-Z]*)|([a-z]* [a-z]*)"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("AB CD");

      assert.equal(testmask.value, "AB CD", "Result " + testmask.value);
    }
  );

  qunit.test(
    "([A-Z]* [A-Z]*)|([a-z]* [a-z]*) - type lowercase",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex: "([A-Z]* [A-Z]*)|([a-z]* [a-z]*)"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("ab cd");

      assert.equal(testmask.value, "ab cd", "Result " + testmask.value);
    }
  );

  qunit.test(
    "{ } that is not a quantifier is treated as a literal",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ regex: "\\d{" }).mask(testmask);

      const defs = [];
      (function walk(token) {
        token.matches.forEach(function (m) {
          if (m.matches) walk(m);
          else defs.push(m);
        });
      })(testmask.inputmask.maskset.maskToken[0]);
      const brace = defs.filter(function (d) {
        return d.def === "{";
      });

      assert.equal(brace.length, 1, "stray { becomes one token");
      assert.equal(brace[0].static, true, "stray { becomes a static literal");
    }
  );

  qunit.test("char escape \\u0041 (unicode)", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ regex: "\\u0041[0-9]" }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("A5");

    assert.equal(testmask.value, "A5", "Result " + testmask.value);
  });

  qunit.test("unicode category \\P{...}", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ regex: "\\P{L}[0-9]" }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("a12");

    assert.equal(testmask.value, "12", "Result " + testmask.value);
  });

  qunit.test("named capture group (?<year>...)", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ regex: "(?<year>\\d{4})-(?<month>\\d{2})" }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("202412");

    assert.equal(testmask.value, "2024-12", "Result " + testmask.value);
  });

  qunit.test("lookbehind (?<=...)", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ regex: "(?<=\\d)[a-z]" }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("5a");

    assert.equal(testmask.value, "5a", "Result " + testmask.value);
  });

  qunit.test("negative lookbehind (?<!...)", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ regex: "(?<!\\d)[a-z]" }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("5a");

    assert.equal(testmask.value, "5a", "Result " + testmask.value);
  });

  qunit.test(
    "#1873 lookaheads do not leak into the template",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        regex:
          "(?!^[-])(?!.*?[-]{2,})(?!^[^-][-])(?![^-]*?-[^-]-[^-]*?)(?![-][^-]$)[а-яА-ЯёЁ-]{0,99}"
      }).mask(testmask);

      testmask.focus();
      $("#testmask").Type("абв");

      assert.equal(testmask.value, "абв", "Result " + testmask.value);
      assert.equal(
        testmask.inputmask.isComplete(),
        true,
        "isComplete " + testmask.inputmask.isComplete()
      );
    }
  );

  qunit.test("#1868 lookahead ^(?=.*[1-9]) types 1.50", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ regex: "^(?=.*[1-9])\\d{1,6}\\.\\d{2}$" }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("1.50");

    assert.equal(testmask.value, "1.50", "Result " + testmask.value);
  });

qunit.test("#1775 lookahead ^(?=.{1,21}$) types John Doe", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask({ regex: "^(?=.{1,21}$)[a-zA-Z]([a-zA-Z] ?)*[a-zA-Z]$" }).mask(
      testmask
    );

    testmask.focus();
    $("#testmask").Type("John Doe");

    assert.equal(
      testmask.value.indexOf("John Doe"),
      0,
      "Result " + testmask.value
    );
    assert.equal(
      testmask.inputmask.isComplete(),
      true,
      "isComplete " + testmask.inputmask.isComplete()
    );
  });

  qunit.test("#1865 lookahead ^(?!.*?[._]{2}) types ab c", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ regex: "^(?!.*?[._]{2})[a-zA-Z_.\\s&-]{1,40}" }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("ab c");

    assert.equal(testmask.value, "ab c", "Result " + testmask.value);
  });

qunit.test("#2535 lookahead ^(0|(?!0+$)[\\dA-Z]+)$", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask({ regex: "^(0|(?!0+$)[\\dA-Z]+)$", autoUnmask: false }).mask(
      testmask
    );

    testmask.focus();
    $("#testmask").Type("0");

    assert.equal(testmask.value, "0", "Result " + testmask.value);
    assert.equal(
      testmask.inputmask.isComplete(),
      true,
      "0 isComplete " + testmask.inputmask.isComplete()
    );
  });

  qunit.test("wholeRegex gate rejects all-zero value", function (assert) {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    var testmask = document.getElementById("testmask");
    Inputmask({ regex: "^(?!0+$)[\\dA-Z]*$" }).mask(testmask);

    testmask.focus();
    $("#testmask").Type("0");

    assert.equal(testmask.value, "0", "Result " + testmask.value);
    assert.equal(
      testmask.inputmask.isComplete(),
      false,
      "0 isComplete " + testmask.inputmask.isComplete()
    );

    $("#testmask").Type("1");
    assert.equal(testmask.value, "01", "Result " + testmask.value);
    assert.equal(
      testmask.inputmask.isComplete(),
      true,
      "01 isComplete " + testmask.inputmask.isComplete()
    );
  });
}
