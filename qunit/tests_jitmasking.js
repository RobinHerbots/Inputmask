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
}
