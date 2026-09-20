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
}
