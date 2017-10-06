export default function (qunit, $, Inputmask) {
    qunit.module("Date.Extensions - dd/mm/yyyy");
    qunit.test("valid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");

        assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
    });
    qunit.test("invalid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("abcdefghijklmnop");

        assert.equal(testmask.value, "", "Result " + testmask.value);
    });
    qunit.test("overtype valid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $.caret(testmask, 0, "23/03/1973".length);
        $("#testmask").Type("04102017");

        assert.equal(testmask.value, "04/10/2017", "Result " + testmask.value);
    });

    qunit.test("overtype invalid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $.caret(testmask, 0, "23/03/1973".length);
        $("#testmask").Type("abcdefghijklmnop");

        assert.equal(testmask.value, "23/03/1973", "Result " + testmask.value);
    });

    qunit.test("insert current date", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").SendKey(Inputmask.keyCode.RIGHT, Inputmask.keyCode.CONTROL);
        var today = new Date();
        today = "00".substr(0, 2 - today.getDate().toString().length) + today.getDate() + "/" + (parseInt(today.getMonth()) + 1) + "/" + today.getFullYear();
        assert.equal(testmask.value, today, "Result " + testmask.value);
    });

    qunit.test("backspace year", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

        assert.equal(testmask.value, "23/03/yyyy", "Result " + testmask.value);
    });

    qunit.test("delete year", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $.caret(testmask, "23/03/".length);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);

        assert.equal(testmask.value, "23/03/yyyy", "Result " + testmask.value);
    });

    qunit.test("set date 592017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("592017");
        assert.equal(testmask.value, "05/09/2017", "Result " + testmask.value);
    });
};
