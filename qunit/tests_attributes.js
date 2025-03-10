export default function (qunit, Inputmask) {
  var $ = Inputmask.dependencyLib;
  qunit.module("Attribute options");

  qunit.test(
    "data-inputmask=\"'alias':'integer', 'allowMinus': false, 'allowPlus': false\" - StennikovDmitriy",
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append(
        "<input type=\"text\" id=\"testmask\" data-inputmask=\"'alias':'integer', 'allowMinus': false, 'allowPlus': false\" />"
      );
      var testmask = document.getElementById("testmask");
      Inputmask().mask(testmask);

      $("#testmask").Type("1234,56");
      assert.equal(testmask.value, "123456", "Result " + testmask.value);
    }
  );

  qunit.test(
    "data-inputmask=\"'mask':'[9-]AAA-999'\" - airomero",
    function (assert) {
      var $fixture = $("#qunit-fixture");
      $fixture.append(
        '<input type="text" id="testmask" data-inputmask="\'mask\':\'[9-]AAA-999\'" />'
      );
      var testmask = document.getElementById("testmask");
      Inputmask().mask(testmask);

      $("#testmask").Type("abc123");
      assert.equal(testmask.value, "ABC-123", "Result " + testmask.value);
    }
  );
}
