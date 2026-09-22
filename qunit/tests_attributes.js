export default function (qunit, Inputmask) {
  const $ = Inputmask.dependencyLib;
  qunit.module("Attribute options");

  qunit.test(
    "data-inputmask=\"'alias':'integer', 'allowMinus': false, 'allowPlus': false\" - StennikovDmitriy",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append(
        "<input type=\"text\" id=\"testmask\" data-inputmask=\"'alias':'integer', 'allowMinus': false, 'allowPlus': false\" />"
      );
      const testmask = document.getElementById("testmask");
      Inputmask().mask(testmask);

      $("#testmask").Type("1234,56");
      assert.equal(testmask.value, "123456", "Result " + testmask.value);
    }
  );

  qunit.test(
    "data-inputmask=\"'mask':'[9-]AAA-999'\" - airomero",
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append(
        '<input type="text" id="testmask" data-inputmask="\'mask\':\'[9-]AAA-999\'" />'
      );
      const testmask = document.getElementById("testmask");
      Inputmask().mask(testmask);

      $("#testmask").Type("abc123");
      assert.equal(testmask.value, "ABC-123", "Result " + testmask.value);
    }
  );

  qunit.test(
    'data-inputmask="[0-9A-Z]{0,11}" does not crash init - #2635',
    function (assert) {
      const $fixture = $("#qunit-fixture");
      $fixture.append(
        '<input type="text" id="testmask" data-inputmask="[0-9A-Z]{0,11}" />'
      );
      const testmask = document.getElementById("testmask");
      Inputmask().mask(testmask);

      assert.equal(
        testmask.inputmask,
        undefined,
        "invalid data-inputmask content is ignored without crashing"
      );
    }
  );
}
