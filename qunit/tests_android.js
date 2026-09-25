export default function (qunit, Inputmask) {
  const $ = Inputmask.dependencyLib;

  // #1907 - "Mask not working properly after update to this last version on
  // Android". Android delivers no usable keypress: keydown arrives as
  // key "Unidentified" (keyCode 229) and the character insertion only shows up
  // as an input event (inputType "insertText") with the native value already
  // updated. On Samsung/Android 7 the fallback processing lagged one keystroke
  // behind, so the last typed character stayed "hidden" (a duplicated value in
  // the buffer that only surfaced on the next keystroke).
  qunit.module("Android input fallback - #1907");

  function type(testmask) {
    // simulate one Android keystroke: a dead keydown (identified as
    // "Unidentified") followed by an input event whose native value already
    // contains the inserted char
    return function (char) {
      const keydown = new KeyboardEvent("keydown", {
        key: "Unidentified",
        bubbles: true,
        cancelable: true
      });
      testmask.dispatchEvent(keydown);

      const caretPos = $.caret(testmask).begin,
        value = testmask.inputmask.__valueGet.call(testmask),
        newValue = value.slice(0, caretPos) + char + value.slice(caretPos);
      $(testmask).input(newValue, caretPos + 1, "insertText");
    };
  }

  function withMask(assert, mask, run) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    Inputmask({ mask }).mask(testmask);
    testmask.focus();
    setTimeout(function () {
      run(testmask);
      done();
    }, 0);
  }

  qunit.test(
    "99999999 9 \\*\\*\\* - typing updates the value per keystroke",
    function (assert) {
      withMask(assert, "99999999 9 \\*\\*\\*", function (testmask) {
        assert.equal(
          testmask.inputmask.__valueGet.call(testmask),
          "________ _ ***",
          "mask template shown: " + testmask.inputmask.__valueGet.call(testmask)
        );

        const androidType = type(testmask);
        androidType("1");
        assert.equal(
          testmask.value,
          "1_______ _ ***",
          "after 1: " + testmask.value
        );
        androidType("2");
        assert.equal(
          testmask.value,
          "12______ _ ***",
          "after 2: " + testmask.value
        );
        androidType("3");
        assert.equal(
          testmask.value,
          "123_____ _ ***",
          "after 3: " + testmask.value
        );
        androidType("4");
        assert.equal(
          testmask.value,
          "1234____ _ ***",
          "after 4: " + testmask.value
        );
        androidType("5");
        assert.equal(
          testmask.value,
          "12345___ _ ***",
          "after 5: " + testmask.value
        );
        androidType("6");
        assert.equal(
          testmask.value,
          "123456__ _ ***",
          "after 6: " + testmask.value
        );
        androidType("7");
        assert.equal(
          testmask.value,
          "1234567_ _ ***",
          "after 7: " + testmask.value
        );
        androidType("8");
        assert.equal(
          testmask.value,
          "12345678 _ ***",
          "after 8: " + testmask.value
        );
        androidType("9");
        assert.equal(
          testmask.value,
          "12345678 9 ***",
          "after 9: " + testmask.value
        );
      });
    }
  );

  qunit.test(
    "99999999 9 *** (star definers) - typing updates the value per keystroke",
    function (assert) {
      withMask(assert, "99999999 9 ***", function (testmask) {
        const androidType = type(testmask);
        androidType("1");
        assert.equal(
          testmask.value,
          "1_______ _ ___",
          "after 1: " + testmask.value
        );
        androidType("2");
        assert.equal(
          testmask.value,
          "12______ _ ___",
          "after 2: " + testmask.value
        );
        androidType("3");
        androidType("4");
        androidType("5");
        androidType("6");
        androidType("7");
        androidType("8");
        assert.equal(
          testmask.value,
          "12345678 _ ___",
          "after 8: " + testmask.value
        );
        androidType("9");
        assert.equal(
          testmask.value,
          "12345678 9 ___",
          "after 9: " + testmask.value
        );
        androidType("k");
        assert.equal(
          testmask.value,
          "12345678 9 k__",
          "after k: " + testmask.value
        );
        androidType("k");
        assert.equal(
          testmask.value,
          "12345678 9 kk_",
          "after kk: " + testmask.value
        );
        androidType("k");
        assert.equal(
          testmask.value,
          "12345678 9 kkk",
          "after kkk: " + testmask.value
        );
      });
    }
  );

  qunit.test(
    "99999999 9 \\*\\*\\* - deleteContentBackward removes the hidden duplicate",
    function (assert) {
      withMask(assert, "99999999 9 \\*\\*\\*", function (testmask) {
        const androidType = type(testmask);
        "12345678".split("").forEach(androidType);
        assert.equal(
          testmask.value,
          "12345678 _ ***",
          "filled: " + testmask.value
        );

        // Android maps the backspace key to deleteContentBackward; the value
        // the browser reports already lost the char before the caret
        $(testmask).input("1234567 _ ***", 7, "deleteContentBackward");
        assert.equal(
          testmask.value,
          "1234567_ _ ***",
          "restores the placeholder: " + testmask.value
        );
        androidType("9");
        assert.equal(
          testmask.value,
          "12345679 _ ***",
          "continues typing: " + testmask.value
        );
      });
    }
  );
}
