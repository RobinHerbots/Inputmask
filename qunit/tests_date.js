export default function (qunit, Inputmask) {
    var $ = Inputmask.dependencyLib;
    function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
    }

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
        today = pad(today.getDate(), 2) + "/" + pad(parseInt(today.getMonth()) + 1, 2) + "/" + today.getFullYear();
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
    qunit.test("set date 01/01/1800 min date 01/01/1900", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy",
            min: "01/01/1900",
            max: "31/12/2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011800");
        assert.equal(testmask.value, "01/01/1yyy", "Result " + testmask.value);
    });
    qunit.test("set date 01/01/2018 max date 31/12/2017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy",
            min: "01/01/1900",
            max: "31/12/2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01012018");
        assert.equal(testmask.value, "01/01/201y", "Result " + testmask.value);
    });
    qunit.test("set date 01/01/1900 min date 01/01/1900", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy",
            min: "01/01/1900",
            max: "31/12/2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011900");
        assert.equal(testmask.value, "01/01/1900", "Result " + testmask.value);
    });
    qunit.test("set date 31/12/2017 max date 31/12/2017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy",
            min: "01/01/1900",
            max: "31/12/2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("31122017");
        assert.equal(testmask.value, "31/12/2017", "Result " + testmask.value);
    });

    qunit.test("min 14/02/1938 max 14/02/2038 enter 01011939", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy",
            min: "14/02/1938",
            max: "14/02/2038"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011939");
        assert.equal(testmask.value, "01/01/1939", "Result " + testmask.value);
    });

    qunit.test("overtype fuzzy valid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd/mm/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $.caret(testmask, 0, "23/03/1973".length);
        $("#testmask").Type("882018");

        assert.equal(testmask.value, "08/08/2018", "Result " + testmask.value);
    });


    qunit.module("Date.Extensions - mm/dd/yyyy");
    qunit.test("valid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("3231973");

        assert.equal(testmask.value, "03/23/1973", "Result " + testmask.value);
    });
    qunit.test("invalid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy"
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
            inputFormat: "mm/dd/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("3231973");
        $.caret(testmask, 0, "03/23/1973".length);
        $("#testmask").Type("10042017");

        assert.equal(testmask.value, "10/04/2017", "Result " + testmask.value);
    });
    qunit.test("overtype invalid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("3231973");
        $.caret(testmask, 0, "03/23/1973".length);
        $("#testmask").Type("abcdefghijklmnop");

        assert.equal(testmask.value, "03/23/1973", "Result " + testmask.value);
    });
    qunit.test("insert current date", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").SendKey(Inputmask.keyCode.RIGHT, Inputmask.keyCode.CONTROL);
        var today = new Date();
        today = pad(parseInt(today.getMonth()) + 1, 2) + "/" + pad(today.getDate(), 2) + "/" + today.getFullYear();
        assert.equal(testmask.value, today, "Result " + testmask.value);
    });
    qunit.test("backspace year", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("3231973");
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

        assert.equal(testmask.value, "03/23/yyyy", "Result " + testmask.value);
    });
    qunit.test("delete year", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("3231973");
        $.caret(testmask, "03/23/".length);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);

        assert.equal(testmask.value, "03/23/yyyy", "Result " + testmask.value);
    });
    qunit.test("set date 952017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("952017");
        assert.equal(testmask.value, "09/05/2017", "Result " + testmask.value);
    });
    qunit.test("set date 01/01/1800 min date 01/01/1900", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy",
            min: "01/01/1900",
            max: "12/31/2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011800");
        assert.equal(testmask.value, "01/01/1yyy", "Result " + testmask.value);
    });
    qunit.test("set date 01/01/2018 max date 12/31/2017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy",
            min: "01/01/1900",
            max: "12/31/2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01012018");
        assert.equal(testmask.value, "01/01/201y", "Result " + testmask.value);
    });
    qunit.test("set date 01/01/1900 min date 01/01/1900", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy",
            min: "01/01/1900",
            max: "12/31/2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011900");
        assert.equal(testmask.value, "01/01/1900", "Result " + testmask.value);
    });
    qunit.test("set date 12/31/2017 max date 12/31/2017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy",
            min: "01/01/1900",
            max: "12/31/2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("12312017");
        assert.equal(testmask.value, "12/31/2017", "Result " + testmask.value);
    });

    qunit.test("min 02/14/1938 max 02/14/2038 enter 01011939", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy",
            min: "02/14/1938",
            max: "02/14/2038"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011939");
        assert.equal(testmask.value, "01/01/1939", "Result " + testmask.value);
    });

    qunit.test("overtype fuzzy valid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "mm/dd/yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("3231973");
        $.caret(testmask, 0, "03/23/1973".length);
        $("#testmask").Type("882018");

        assert.equal(testmask.value, "08/08/2018", "Result " + testmask.value);
    });

    qunit.module("Date.Extensions - dd.mm.yyyy");
    qunit.test("valid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");

        assert.equal(testmask.value, "23.03.1973", "Result " + testmask.value);
    });
    qunit.test("invalid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy"
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
            inputFormat: "dd.mm.yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $.caret(testmask, 0, "23.03.1973".length);
        $("#testmask").Type("04102017");

        assert.equal(testmask.value, "04.10.2017", "Result " + testmask.value);
    });
    qunit.test("overtype invalid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $.caret(testmask, 0, "23.03.1973".length);
        $("#testmask").Type("abcdefghijklmnop");

        assert.equal(testmask.value, "23.03.1973", "Result " + testmask.value);
    });
    qunit.test("insert current date", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").SendKey(Inputmask.keyCode.RIGHT, Inputmask.keyCode.CONTROL);
        var today = new Date();
        today = pad(today.getDate(), 2) + "." + pad(parseInt(today.getMonth()) + 1, 2) + "." + today.getFullYear();
        assert.equal(testmask.value, today, "Result " + testmask.value);
    });
    qunit.test("backspace year", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
        $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

        assert.equal(testmask.value, "23.03.yyyy", "Result " + testmask.value);
    });
    qunit.test("delete year", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $.caret(testmask, "23.03.".length);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);
        $("#testmask").SendKey(Inputmask.keyCode.DELETE);

        assert.equal(testmask.value, "23.03.yyyy", "Result " + testmask.value);
    });
    qunit.test("set date 592017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("592017");
        assert.equal(testmask.value, "05.09.2017", "Result " + testmask.value);
    });
    qunit.test("set date 01.01.1800 min date 01.01.1900", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy",
            min: "01.01.1900",
            max: "31.12.2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011800");
        assert.equal(testmask.value, "01.01.1yyy", "Result " + testmask.value);
    });
    qunit.test("set date 01.01.2018 max date 31.12.2017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy",
            min: "01.01.1900",
            max: "31.12.2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01012018");
        assert.equal(testmask.value, "01.01.201y", "Result " + testmask.value);
    });
    qunit.test("set date 01/01/1900 min date 01/01/1900", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy",
            min: "01.01.1900",
            max: "31.12.2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011900");
        assert.equal(testmask.value, "01.01.1900", "Result " + testmask.value);
    });
    qunit.test("set date 31.12.2017 max date 31.12.2017", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy",
            min: "01.01.1900",
            max: "31.12.2017"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("31122017");
        assert.equal(testmask.value, "31.12.2017", "Result " + testmask.value);
    });

    qunit.test("min 14.02.1938 max 14.02.2038 enter 01011939", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy",
            min: "14.02.1938",
            max: "14.02.2038"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("01011939");
        assert.equal(testmask.value, "01.01.1939", "Result " + testmask.value);
    });

    qunit.test("overtype fuzzy valid entry", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "dd.mm.yyyy"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("2331973");
        $.caret(testmask, 0, "23.03.1973".length);
        $("#testmask").Type("882018");

        assert.equal(testmask.value, "08.08.2018", "Result " + testmask.value);
    });

    qunit.module("Date.Extensions - misc");
    qunit.test("HH:MM minmax 10:00 - 11:10 enter 1059", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "HH:MM",
            min: "10:00",
            max: "11:10"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("1059");
        assert.equal(testmask.value, "10:59", "Result " + testmask.value);
    });

    qunit.test("HH:MM minmax 10:00 - 11:10 enter 1230", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "HH:MM",
            min: "10:00",
            max: "11:10"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").val("1230");
        assert.equal(testmask.value, "10:MM", "Result " + testmask.value);
    });

    qunit.test("hh:MM TT type 99a - goto first pos - type 1", function (assert) {
        var $fixture = $("#qunit-fixture");
        $fixture.append('<input type="text" id="testmask" />');
        var testmask = document.getElementById("testmask");
        Inputmask("datetime", {
            inputFormat: "hh:MM TT"
        }).mask(testmask);

        testmask.focus();
        $("#testmask").Type("99a");
        $.caret(testmask, 0);
        $("#testmask").Type("1");
        assert.equal(testmask.value, "10:09 AM", "Result " + testmask.value);
    });
};
