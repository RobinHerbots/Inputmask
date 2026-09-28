export default function (qunit, Inputmask) {
  function setup(opts, alias) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");
    if (alias) Inputmask(alias, opts).mask(testmask);
    else Inputmask(opts).mask(testmask);
    testmask.focus();
    return testmask;
  }

  function pressInsert(el) {
    el.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Insert", bubbles: true })
    );
  }

  qunit.module("insertMode toggle", {
    beforeEach() {
      Inputmask.extendDefaults({ inputEventOnly: false });
    }
  });

  qunit.test(
    "no insertMode option -> Insert toggles insertMode",
    function (assert) {
      const el = setup({ mask: "9999" });
      assert.equal(el.inputmask.opts.insertMode, true, "starts true");
      pressInsert(el);
      assert.equal(
        el.inputmask.opts.insertMode,
        false,
        "toggled to false -> " + el.inputmask.opts.insertMode
      );
    }
  );

  qunit.test(
    "insertMode:false in the options blocks the INSERT toggle #2847",
    function (assert) {
      const el = setup({ insertMode: false, mask: "9999" });
      pressInsert(el);
      assert.equal(
        el.inputmask.opts.insertMode,
        false,
        "still false -> " + el.inputmask.opts.insertMode
      );
    }
  );

  qunit.test(
    "datetime alias keeps insertMode:false on the INSERT key #2847",
    function (assert) {
      const el = setup({}, "datetime");
      assert.equal(
        el.inputmask.opts.insertMode,
        false,
        "alias sets insertMode false"
      );
      assert.equal(
        el.inputmask.userOptions.insertMode,
        undefined,
        "userOptions.insertMode undefined"
      );
      pressInsert(el);
      assert.equal(
        el.inputmask.opts.insertMode,
        false,
        "still false after insert -> " + el.inputmask.opts.insertMode
      );
    }
  );

  qunit.test(
    "insertMode:false via data-inputmask blocks the INSERT toggle #2847",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append(
        "<input type=\"text\" id=\"testmask\" data-inputmask=\"'mask':'9999', 'insertMode':'false'\" />"
      );
      const el = document.getElementById("testmask");
      Inputmask().mask(el);
      el.focus();
      assert.equal(el.inputmask.opts.insertMode, false, "attr applied");
      pressInsert(el);
      assert.equal(
        el.inputmask.opts.insertMode,
        false,
        "still false after insert -> " + el.inputmask.opts.insertMode
      );
    }
  );

  qunit.test("jQuery plugin insertMode:false", function (assert) {
    const $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const el = document.getElementById("testmask");
    window.jQuery("#testmask").inputmask("9999", { insertMode: false });
    el.focus();
    pressInsert(el);
    assert.equal(
      el.inputmask.opts.insertMode,
      false,
      "still false after insert -> " + el.inputmask.opts.insertMode
    );
  });

  qunit.test(".option({insertMode:false}) blocks toggle", function (assert) {
    const el = setup({ mask: "9999" });
    el.inputmask.option({ insertMode: false });
    pressInsert(el);
    assert.equal(
      el.inputmask.opts.insertMode,
      false,
      "still false after insert -> " + el.inputmask.opts.insertMode
    );
  });

  qunit.test(
    "insertModeToggle:false blocks the INSERT toggle",
    function (assert) {
      const el = setup({ mask: "9999", insertModeToggle: false });
      assert.equal(el.inputmask.opts.insertMode, true, "starts true");
      pressInsert(el);
      assert.equal(
        el.inputmask.opts.insertMode,
        true,
        "still true -> " + el.inputmask.opts.insertMode
      );
    }
  );

  qunit.test(
    "insertModeToggle:false wins over an explicit insertMode:true",
    function (assert) {
      const el = setup({
        mask: "9999",
        insertMode: true,
        insertModeToggle: false
      });
      pressInsert(el);
      assert.equal(
        el.inputmask.opts.insertMode,
        true,
        "still true -> " + el.inputmask.opts.insertMode
      );
    }
  );
}
