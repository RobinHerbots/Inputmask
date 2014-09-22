module("Regex masks")

test("inputmask(\"Regex\", { regex: \"[0-9]*\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[0-9]*" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc45");

    equal($("#testmask").val(), "12345", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

asyncTest("inputmask(\"Regex\", { regex: \"[0-9]*\"}); ~ isComplete", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", {
        regex: "[0-9]*", oncomplete: function () {
            equal($("#testmask").val(), "1", "Result " + $("#testmask").val());
            start();
            $("#testmask").remove();
        }
    });

    $("#testmask")[0].focus();
    $("#testmask").SendKey("1");
});

test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[A-Za-z\u0410-\u044F\u0401\u04510-9]*" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc45");

    equal($("#testmask").val(), "123abc45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[A-Za-z\u0410-\u044F\u0401\u0451]+[A-Za-z\u0410-\u044F\u0401\u04510-9]*" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc45");

    equal($("#testmask").val(), "abc45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});


test("inputmask(\"Regex\", { regex: \"[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[A-Za-z\u0410-\u044F\u0401\u0451]{1}[A-Za-z\u0410-\u044F\u0401\u04510-9]*" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123abc45");

    equal($("#testmask").val(), "abc45", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[-]?(([1-8][0-9])|[1-9]0?)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("90");

    equal($("#testmask").val(), "90", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[-]?(([1-8][0-9])|[1-9]0?)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("0");

    equal($("#testmask").val(), "", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[-]?(([1-8][0-9])|[1-9]0?)\"});", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[-]?(([1-8][0-9])|[1-9]0?)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("-78");

    equal($("#testmask").val(), "-78", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\" - simple regex email", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("some.body@mail.com");

    equal($("#testmask").val(), "some.body@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\" - complexer regex email", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("denise.van.de.cruys@mail.com");

    equal($("#testmask").val(), "denise.van.de.cruys@mail.com", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 1-123-4562", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" });

    $("#testmask")[0].focus();
    $("#testmask").Type("1-123-4562");

    equal($("#testmask").val(), "1-123-4562", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 20-222-2222", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" });

    $("#testmask")[0].focus();
    $("#testmask").Type("20-222-2222");

    equal($("#testmask").val(), "20-222-2222", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 22-222-234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" });

    $("#testmask")[0].focus();
    $("#testmask").Type("22-222-234");

    equal($("#testmask").val(), "22-222-234", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))\" - mrpanacs regex 70-12-34", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "(([2-9][0-9])-([0-9]{3}-[0-9]{3}))|((1|30|20|70)-([0-9]{3}-[0-9]{4}))" });

    $("#testmask")[0].focus();
    $("#testmask").Type("70-12-34");

    equal($("#testmask").val(), "70-123", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" - arame regex 12", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("12");

    equal($("#testmask").val(), "12", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" } - arame regex 12.5", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("12.5");

    equal($("#testmask").val(), "12.5", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", { regex: \"([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?\" } - arame regex 12.75", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "([0-9]|[1][0-9]|[2][0-3]?)(\\.(5|25|75))?" });

    $("#testmask")[0].focus();
    $("#testmask").Type("12.75");

    equal($("#testmask").val(), "12.75", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex abcdef", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('Regex', { regex: "(abc)+(def)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("abcdef");

    equal($("#testmask").val(), "abcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex 123a4b5c6d7e8f", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('Regex', { regex: "(abc)+(def)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("123a4b5c6d7e8f");

    equal($("#testmask").val(), "abcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc)+(def)\" }); - Flyarbonkers regex abcabcdef", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('Regex', { regex: "(abc)+(def)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("abcabcdef");

    equal($("#testmask").val(), "abcabcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask('Regex', { regex: \"(abc){2,4}(def)\" }); - Flyarbonkers regex abdefcafebcaefbfcabcdef", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('Regex', { regex: "(abc){2,4}(def)" });

    $("#testmask")[0].focus();
    $("#testmask").Type("abdefcafebcaefbfcabcdef");

    equal($("#testmask").val(), "abcabcabcabcdef", "Result " + $("#testmask").val());

    $("#testmask").remove();
});

test("inputmask(\"Regex\", {regex: \"[а-яА-Я\\s]*\"}) - type space - SilentImp", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("Regex", { regex: "[а-яА-Я\\s]*" });

    $("#testmask")[0].focus();
    $("#testmask").SendKey($.inputmask.keyCode.SPACE);

    equal($("#testmask").val(), " ", "Result " + $("#testmask").val());

    $("#testmask").remove();
});
