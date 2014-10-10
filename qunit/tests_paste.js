module("Paste value");
asyncTest("inputmask(\"+7 (999) 999-99-99\") ~ paste \"+7 (+79114041112___) ___-__-__\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+7 (999) 999-99-99");
    $("#testmask")[0].focus();
    $("#testmask").paste("+7 (+79114041112___) ___-__-__");

    setTimeout(function () {
        equal($("#testmask").val(), "+7 (911) 404-11-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);

});
asyncTest("inputmask(\"+7 (999) 999-99-99\") ~ paste \"+7 (+7 (9114041112___) ___-__-__\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+7 (999) 999-99-99");
    $("#testmask")[0].focus();
    $("#testmask").paste("+7 (+7 (9114041112___) ___-__-__");

    setTimeout(function () {
        equal($("#testmask").val(), "+7 (911) 404-11-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);

});

asyncTest("inputmask(\"+7 (999) 999-99-99\") ~ paste \"0079114041112\" - monoblaine", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+7 (999) 999-99-99", {
        onBeforePaste: function (pastedValue) {
            //just simplistic for the test ;-)
            var strippedValue = pastedValue.substr(2);
            return strippedValue;
        }
    });
    $("#testmask")[0].focus();
    $("#testmask").paste("0079114041112");

    setTimeout(function () {
        equal($("#testmask").val(), "+7 (911) 404-11-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);

});

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"+32(123)12-12-12\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("+32(123)12-12-12");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(123)12-12-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"32(123)12-12-12\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("32(123)12-12-12");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(123)12-12-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"(123)12-12-12\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("(123)12-12-12");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(123)12-12-12", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"32473890428\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("32473890428");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)89-04-28", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});
