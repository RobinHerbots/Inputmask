module("Paste value");
asyncTest("inputmask(\"+7 (999) 999-99-99\") ~ paste \"+79114041112\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+7 (999) 999-99-99");
    $("#testmask")[0].focus();
    $("#testmask").paste("+79114041112");

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
            var strippedValue = pastedValue.substr(3);
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

asyncTest("inputmask(\"+32(999)99-99-99\", { nojumps: true, nojumpsThreshold: 4 }) ~ paste \"+32473890428\"", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+32(999)99-99-99", { nojumps: true, nojumpsThreshold: 4 });
    $("#testmask")[0].focus();
    $("#testmask").paste("+32473890428");

    setTimeout(function () {
        equal($("#testmask").val(), "+32(473)89-04-28", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"+31 9999999999\") ~ paste \"3112345678\" - jason16v", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+31 9999999999");
    $("#testmask")[0].focus();
    $("#testmask").paste("3112345678");

    setTimeout(function () {
        equal($("#testmask").val(), "+31 3112345678", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("inputmask(\"+31 9999999999\") ~ paste \"+3112345678\" - jason16v", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("+31 9999999999");
    $("#testmask")[0].focus();
    $("#testmask").paste("+3112345678");

    setTimeout(function () {
        equal($("#testmask").val(), "+31 12345678__", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("99.999.999/9999-99 numericInput ~ paste __-____/..__79100085302751__-____/..__ - imbelo", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask({
        "mask": "99.999.999/9999-99",
        "numericInput": true
    });
    $("#testmask")[0].focus();
    $("#testmask").paste("__-____/..__79100085302751__-____/..__");

    setTimeout(function () {
        equal($("#testmask").val(), "79.100.085/3027-51", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("currency ~ $123.22 - sjk07", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('currency');
    $("#testmask")[0].focus();
    $("#testmask").paste("$123.22");

    setTimeout(function () {
        equal($("#testmask").val(), "$ 123.22", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("currency ~ $-123.22 - sjk07", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('currency');
    $("#testmask")[0].focus();
    $("#testmask").paste("$-123.22");

    setTimeout(function () {
        equal($("#testmask").val(), "$ -123.22", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("currency ~ 1000.00 - sjk07", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('currency');
    $("#testmask")[0].focus();
    $("#testmask").paste("1000.00");

    setTimeout(function () {
        equal($("#testmask").val(), "$ 1,000.00", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("currency ~ -1000.00 - sjk07", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('currency');
    $("#testmask")[0].focus();
    $("#testmask").paste("-1000.00");

    setTimeout(function () {
        equal($("#testmask").val(), "$ -1,000.00", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("currency ~ $1000.00 - sjk07", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('currency');
    $("#testmask")[0].focus();
    $("#testmask").paste("$1000.00");

    setTimeout(function () {
        equal($("#testmask").val(), "$ 1,000.00", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("currency ~ $-1000.00 - sjk07", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('currency');
    $("#testmask")[0].focus();
    $("#testmask").paste("$-1000.00");

    setTimeout(function () {
        equal($("#testmask").val(), "$ -1,000.00", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("currency ~ 000.02 - sjk07", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask('currency');
    $("#testmask")[0].focus();
    $("#testmask").paste("000.02");

    setTimeout(function () {
        equal($("#testmask").val(), "$ 0.02", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});

asyncTest("02.999.999 ~ paste 02.024.900 - tnavarra", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    $("#testmask").inputmask("02.999.999");
    $("#testmask")[0].focus();
    $("#testmask").paste("02.024.900");

    setTimeout(function () {
        equal($("#testmask").val(), "02.024.900", "Result " + $("#testmask").val());
        start();
        $("#testmask").remove();
    }, 0);
});