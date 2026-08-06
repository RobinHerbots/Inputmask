import { keys } from "../lib/keycode";

// https://github.com/RobinHerbots/Inputmask/issues/2402
export default function (qunit, Inputmask) {
  const $ = Inputmask.dependencyLib;
  qunit.module("displayChar definition");

  function createInput(value) {
    const $fixture = $("#qunit-fixture");
    $fixture.append(
      `<input type="text" id="testmask"${value !== undefined ? ` value="${value}"` : ""} />`
    );
    return document.getElementById("testmask");
  }

  function maskOptions(extra) {
    return {
      mask: "####9999",
      definitions: {
        "#": {
          validator: "\\p{N}",
          displayChar: "#"
        }
      },
      ...extra
    };
  }

  qunit.test(
    "typing stores the native value, display shows the masked prefix",
    function (assert) {
      const testmask = createInput();
      Inputmask(maskOptions()).mask(testmask);

      $("#testmask").Type("12344567");

      assert.equal(
        testmask.inputmask._valueGet(),
        "####4567",
        "Result " + testmask.inputmask._valueGet()
      );
      assert.equal(
        testmask.inputmask.unmaskedvalue(),
        "12344567",
        "Result " + testmask.inputmask.unmaskedvalue()
      );
    }
  );

  qunit.test("autoUnmask returns the native digits via val", function (assert) {
    const testmask = createInput();
    Inputmask(maskOptions({ autoUnmask: true })).mask(testmask);

    $("#testmask").Type("12344567");

    assert.equal(
      testmask.inputmask._valueGet(),
      "####4567",
      "Result " + testmask.inputmask._valueGet()
    );
    assert.equal(
      $("#testmask").val(),
      "12344567",
      "Result " + $("#testmask").val()
    );
  });

  qunit.test(
    "partial typing shows masked prefix and placeholders",
    function (assert) {
      const testmask = createInput();
      Inputmask(maskOptions()).mask(testmask);

      $("#testmask").Type("1234");

      assert.equal(testmask.value, "####____", "Result " + testmask.value);
      assert.equal(
        testmask.inputmask.unmaskedvalue(),
        "1234",
        "Result " + testmask.inputmask.unmaskedvalue()
      );
    }
  );

  qunit.test("backspace removes the last visible digit", function (assert) {
    const testmask = createInput();
    Inputmask(maskOptions()).mask(testmask);

    $("#testmask").Type("12344567");
    $("#testmask").SendKey(keys.Backspace);

    assert.equal(testmask.value, "####456_", "Result " + testmask.value);
    assert.equal(
      testmask.inputmask.unmaskedvalue(),
      "1234456",
      "Result " + testmask.inputmask.unmaskedvalue()
    );
  });

  qunit.test(
    "setValue applies the mask and keeps the native value",
    function (assert) {
      const testmask = createInput();
      Inputmask(maskOptions()).mask(testmask);

      $("#testmask").val("12345678");

      assert.equal(testmask.value, "####5678", "Result " + testmask.value);
      assert.equal(
        testmask.inputmask.unmaskedvalue(),
        "12345678",
        "Result " + testmask.inputmask.unmaskedvalue()
      );
    }
  );

  qunit.test("initial value is masked on apply", function (assert) {
    const testmask = createInput("12344567");
    Inputmask(maskOptions()).mask(testmask);

    assert.equal(testmask.value, "####4567", "Result " + testmask.value);
    assert.equal(
      testmask.inputmask.unmaskedvalue(),
      "12344567",
      "Result " + testmask.inputmask.unmaskedvalue()
    );
  });

  qunit.test(
    "re-read of a masked value (paste) preserves the native digits",
    function (assert) {
      const done = assert.async(),
        testmask = createInput();
      Inputmask(maskOptions()).mask(testmask);

      $("#testmask").Type("12344567");
      $.caret(testmask, 5);
      $("#testmask").paste("99");

      setTimeout(function () {
        assert.equal(testmask.value, "####4995", "Result " + testmask.value);
        assert.equal(
          testmask.inputmask.unmaskedvalue(),
          "12344995",
          "Result " + testmask.inputmask.unmaskedvalue()
        );
        done();
      }, 0);
    }
  );
}
