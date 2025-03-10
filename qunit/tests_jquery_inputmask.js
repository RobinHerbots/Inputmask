require("../lib/jquery.inputmask");

export default function (qunit, $, Inputmask) {
  qunit.module("jquery.inputmask plugin");
  qunit.test("", function (assert) {
    var done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');

    $("#testmask").inputmask({ mask: "99-9999-99" });
    $("#testmask").focus();
    setTimeout(function () {
      assert.equal(
        $("#testmask")[0].inputmask._valueGet(),
        "__-____-__",
        "Result " + $("#testmask")[0].inputmask._valueGet()
      );
      done();
    }, 0);
  });
}
