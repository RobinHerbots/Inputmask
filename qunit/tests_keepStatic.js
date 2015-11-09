define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../dist/inputmask/inputmask.regex.extensions",
	"prototypeExtensions",
	"simulator"
], function(qunit, $, Inputmask) {

qunit.module("keepStatic mask switching");

test("{ mask: [\"+55-99-9999-9999\", \"+55-99-99999-9999\", ], keepStatic: true }", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ mask: ["+55-99-9999-9999", "+55-99-99999-9999"], keepStatic: true }).mask(testmask);
    testmask.focus();
    $("#testmask").Type("12123451234");

    equal(document.getElementById("testmask").inputmask._valueGet(), "+55-12-12345-1234", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("{ mask: \"+55-99-9999|(99)-9999\", keepStatic: true } - type 12123451234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ mask: "+55-99-9999|(99)-9999", keepStatic: true }).mask(testmask);
    testmask.focus();
    $("#testmask").Type("12123451234");

    equal(document.getElementById("testmask").inputmask._valueGet(), "+55-12-12345-1234", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("{ mask: ['(99) 9999-9999', '(99) 99999-9999'] } - val('1212341234')", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ mask: ['(99) 9999-9999', '(99) 99999-9999'] }).mask(testmask);
    $("#testmask").val("1212341234");

    equal(document.getElementById("testmask").inputmask._valueGet(), "(12) 1234-1234", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("{ mask: \"+55-99-9999|(99)-9999\", keepStatic: false } type 12123451234", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ mask: "+55-99-9999|(99)-9999", keepStatic: false }).mask(testmask);
    testmask.focus();
    $("#testmask").Type("12123451234");

    equal(document.getElementById("testmask").inputmask._valueGet(), "+55-12-12345-1234", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("{ mask: [\"+55-99-9999-9999\", \"+55-99-99999-9999\", ], keepStatic: true } - type 12123451234 + backspace", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ mask: ["+55-99-9999-9999", "+55-99-99999-9999"], keepStatic: true }).mask(testmask);
    testmask.focus();
    $("#testmask").Type("12123451234");
    $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

    equal(document.getElementById("testmask").inputmask._valueGet(), "+55-12-1234-5123", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("{ mask: [\"99-9999-99\",\"99-99999-99\"] } - type 12123412 + add 1 upfront", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ mask: ["99-9999-99", "99-99999-99"] }).mask(testmask);
    $("#testmask").Type("12123412");
    $.caret(testmask, 0);
    $("#testmask").Type("1");
    equal(document.getElementById("testmask").inputmask._valueGet(), "11-21234-12", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("{ mask: [\"99-99999-9\",\"99-999999-9\"] } - type 121234561", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ mask: ["99-99999-9", "99-999999-9"] }).mask(testmask);
    $("#testmask").Type("121234561");
    equal(document.getElementById("testmask").inputmask._valueGet(), "12-123456-1", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("{ \"keepStatic\": true, greedy: false, mask: \"(99-9)|(99999)\" } - type 12345", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ "keepStatic": true, greedy: false, "mask": "(99-9)|(99999)" }).mask(testmask);
    $("#testmask").Type("12345");
    equal(document.getElementById("testmask").inputmask._valueGet(), "12345", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("7|8 999 99 99 - hiddenman", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask("7|8 999 99 99").mask(testmask);
    testmask.focus();
    equal(document.getElementById("testmask").inputmask._valueGet(), "_ ___ __ __", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("7|8 999 99 99 type 7 - hiddenman", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask("7|8 999 99 99").mask(testmask);
    $("#testmask").Type("7");
    equal(document.getElementById("testmask").inputmask._valueGet(), "7 ___ __ __", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("7|8 999 99 99 type 8 - hiddenman", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask("7|8 999 99 99").mask(testmask);
    $("#testmask").Type("8");
    equal(document.getElementById("testmask").inputmask._valueGet(), "8 ___ __ __", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("(78)|(79) 999 99 99", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask("(78)|(79) 999 99 99").mask(testmask);
    testmask.focus();
    equal(document.getElementById("testmask").inputmask._valueGet(), "7_ ___ __ __", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("(78)|(79) 999 99 99 - type 5", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask("(78)|(79) 999 99 99").mask(testmask);
    testmask.focus();
    $("#testmask").Type("5");
    equal(document.getElementById("testmask").inputmask._valueGet(), "75 ___ __ __", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("(78)|(74) 999 99 99", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask("(78)|(74) 999 99 99").mask(testmask);
    testmask.focus();
    equal(document.getElementById("testmask").inputmask._valueGet(), "7_ ___ __ __", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("5-9|(9a)-5 - keepstatic: false", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({ mask: "5-9|(9a)-5", keepStatic: false }).mask(testmask);
    testmask.focus();
    equal(document.getElementById("testmask").inputmask._valueGet(), "5-_-5", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("['(99) 9999-9999', '(99) 9-9999-9999'] - type 12123412345 - 3m0", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({mask:['(99) 9999-9999', '(99) 9-9999-9999'], removeMaskOnSubmit:false, clearmaskonlostfocus:true}).mask(testmask);
    testmask.focus();
    $("#testmask").Type("12123412345")
    equal(document.getElementById("testmask").inputmask._valueGet(), "(12) 1-2341-2345", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

test("['(99) 9999-9999', '(99) 9-9999-9999'] - type 12123412345 - backspace - 3m0", function () {
    var $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
var testmask = document.getElementById("testmask");
    Inputmask({mask:['(99) 9999-9999', '(99) 9-9999-9999'], removeMaskOnSubmit:false, clearmaskonlostfocus:true}).mask(testmask);
    testmask.focus();
    $("#testmask").Type("12123412345")
    $("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
    equal(document.getElementById("testmask").inputmask._valueGet(), "(12) 1234-1234", "Result " + document.getElementById("testmask").inputmask._valueGet());

    $("#testmask").remove();
});

});
