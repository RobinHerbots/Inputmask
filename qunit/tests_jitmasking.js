export default function (qunit, Inputmask) {
  const $ = Inputmask.dependencyLib;
  qunit.module("JIT Masking");

  qunit.test(
    "'(.999){*}', { jitMasking: true, numericInput: true   }",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");

      Inputmask("(.999){*}", {
        jitMasking: true,
        numericInput: true,
        groupSeparator: "." // hack see numerics ~otherwise the extra . in front is expected
      }).mask(testmask);
      $("#testmask").Type("123456");
      assert.equal($(testmask).val(), "123.456", "Result " + $(testmask).val());
    }
  );

  // jitMasking must end up on the same value as the fully masked alias, see #2561
  qunit.test(
    "decimal + suffix + jitMasking - type .5 (#2561)",
    function (assert) {
      const done = assert.async();
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", suffix: "%", jitMasking: true }).mask(
        testmask
      );

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type(".5");
        assert.equal(testmask.value, "0.5%", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test("decimal + jitMasking - type .5 (#2561)", function (assert) {
    const done = assert.async();
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ alias: "decimal", jitMasking: true }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type(".5");
      assert.equal(testmask.value, "0.5", "Result " + testmask.value);
      done();
    }, 0);
  });

  qunit.test(
    "decimal + suffix + jitMasking - type the suffix char (#2561)",
    function (assert) {
      const done = assert.async();
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", suffix: "%", jitMasking: true }).mask(
        testmask
      );

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("%");
        assert.equal(testmask.value, "0%", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "decimal + suffix + jitMasking - type the radix then blur (#2561)",
    function (assert) {
      const done = assert.async();
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", suffix: "%", jitMasking: true }).mask(
        testmask
      );

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type(".");
        assert.equal(testmask.value, "0.%", "Result " + testmask.value);
        testmask.blur();
        assert.equal(testmask.value, "0%", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test("numeric + jitMasking - type .5 (#2561)", function (assert) {
    const done = assert.async();
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ alias: "numeric", jitMasking: true }).mask(testmask);

    testmask.focus();
    $("#testmask").trigger("click");
    setTimeout(function () {
      $("#testmask").Type(".5");
      assert.equal(testmask.value, "0.5", "Result " + testmask.value);
      assert.equal(
        testmask.inputmask.unmaskedvalue(),
        "0.5",
        "Unmasked " + testmask.inputmask.unmaskedvalue()
      );
      done();
    }, 0);
  });

  qunit.test(
    "decimal + prefix + jitMasking - type .5 (#2561)",
    function (assert) {
      const done = assert.async();
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", prefix: "$ ", jitMasking: true }).mask(
        testmask
      );

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type(".5");
        assert.equal(testmask.value, "$ 0.5", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "decimal + radixPoint ',' + jitMasking - type ,5 (#2561)",
    function (assert) {
      const done = assert.async();
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        radixPoint: ",",
        groupSeparator: ".",
        jitMasking: true
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type(",5");
        assert.equal(testmask.value, "0,5", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  // #1810 reported the same missing integer digit on a currency alias
  [
    { typed: ".55", expected: "0.55" },
    { typed: "0.50", expected: "0.50" },
    { typed: "1.50", expected: "1.50" }
  ].forEach(function (tc) {
    qunit.test(
      "currency + jitMasking - type " + tc.typed + " (#1810)",
      function (assert) {
        const done = assert.async();
        const $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        const testmask = document.getElementById("testmask");
        Inputmask({
          alias: "currency",
          prefix: "",
          groupSeparator: ",",
          radixPoint: ".",
          digits: "2",
          jitMasking: true
        }).mask(testmask);

        testmask.focus();
        $("#testmask").trigger("click");
        setTimeout(function () {
          $("#testmask").Type(tc.typed);
          assert.equal(testmask.value, tc.expected, "Result " + testmask.value);
          done();
        }, 0);
      }
    );
  });

  // a digit that also occurs in the suffix stays the typed digit, it must not
  // be taken for a suffix char and replaced by the generated zero
  qunit.test(
    "decimal + digit in the suffix + jitMasking - type that digit (#2561)",
    function (assert) {
      const done = assert.async();
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", suffix: " m2", jitMasking: true }).mask(
        testmask
      );

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("2");
        assert.equal(testmask.value, "2", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "decimal + jitMasking - type -.5 keeps the sign (#2561)",
    function (assert) {
      const done = assert.async();
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({ alias: "decimal", jitMasking: true }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-.5");
        assert.equal(testmask.value, "-0.5", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test(
    "decimal + parenthetical negation + jitMasking - type -.5 (#2561)",
    function (assert) {
      const done = assert.async();
      const $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" />');
      const testmask = document.getElementById("testmask");
      Inputmask({
        alias: "decimal",
        jitMasking: true,
        negationSymbol: { front: "(", back: ")" }
      }).mask(testmask);

      testmask.focus();
      $("#testmask").trigger("click");
      setTimeout(function () {
        $("#testmask").Type("-.5");
        assert.equal(testmask.value, "(0.5)", "Result " + testmask.value);
        done();
      }, 0);
    }
  );
}
