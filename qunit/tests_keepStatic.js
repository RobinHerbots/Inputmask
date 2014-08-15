module("keepStatic mask switching");

test("{ mask: [\"+55-99-9999-9999\", \"+55-99-99999-9999\", ], keepStatic: true }", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({ mask: ["+55-99-9999-9999", "+55-99-99999-9999"], keepStatic: true });
    $("#testmask")[0].focus();
    $("#testmask").Type("12123451234");

    equal(document.getElementById("testmask")._valueGet(), "+55-12-12345-1234", "Result " + document.getElementById("testmask")._valueGet());

    $("#testmask").remove();
});
