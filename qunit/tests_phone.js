import { keys } from "../lib/core/keycode";
import {
  registerPhone,
  registerPhoneCodes
} from "../packages/inputmask.phone/lib/inputmask.phone.extensions.js";
import {
  phone as phoneAll,
  phoneBe as phoneBeAll,
  phoneCa as phoneCaAll,
  phoneHu,
  phoneIt,
  phoneMx,
  phoneNl,
  phoneRu
} from "../packages/inputmask.phone/lib/phone-codes/index.js";
import phonebe from "../packages/inputmask.phone/lib/phone-codes/phone-be.js";
import phoneCa from "../packages/inputmask.phone/lib/phone-codes/phone-ca.js";
import phoneGenerated from "../packages/inputmask.phone/lib/phone-codes/phone-libphonenumber.generated.js";
import {
  countrycode as globalCountrycode,
  phoneCodes as globalPhoneCodes
} from "../packages/inputmask.phone/lib/phone-codes/phone.js";

export default function (qunit, Inputmask) {
  // Register against the bundle under test instead of importing the package
  // entry, which would resolve the peer dependency to a second Inputmask copy.
  registerPhone(Inputmask);
  registerPhoneCodes(Inputmask, "phone", {
    countrycode: globalCountrycode,
    phoneCodes: globalPhoneCodes
  });
  registerPhoneCodes(Inputmask, "phonebe", phonebe);
  registerPhoneCodes(Inputmask, "phoneca", phoneCa);
  registerPhoneCodes(Inputmask, "phoneGenerated", phoneGenerated);

  // Simulator events must go through the instance used by Inputmask.
  const $ = Inputmask.dependencyLib;

  qunit.module("Phone masks");

  qunit.test("phone - all datasets imported", function (assert) {
    const datasets = {
        phone: phoneAll,
        phoneBe: phoneBeAll,
        phoneCa: phoneCaAll,
        phoneHu,
        phoneIt,
        phoneMx,
        phoneNl,
        phoneRu
      },
      expected = {
        phone: 308,
        phoneBe: 48,
        phoneCa: 12817,
        phoneHu: 67,
        phoneIt: 234,
        phoneMx: 72,
        phoneNl: 181,
        phoneRu: 2403
      };

    Object.keys(expected).forEach(function (name) {
      assert.equal(datasets[name].phoneCodes.length, expected[name], name);
    });
  });

  qunit.test("phone - Kosovo code from upstream PR #25", function (assert) {
    const kosovo = globalPhoneCodes.filter(function (entry) {
      return entry.cc === "XK" && entry.mask.indexOf("+383") === 0;
    });

    assert.equal(kosovo.length, 2, "Imported Kosovo masks");
  });

  qunit.test("phoneca - folded large dataset", function (assert) {
    const formatted = Inputmask.format("+12262001234", { alias: "phoneca" });

    assert.equal(formatted, "+1(226)200-12-34", "Result " + formatted);
  });

  qunit.test("generated libphonenumber mask", function (assert) {
    const formatted = Inputmask.format("+383 43 201 234", {
      alias: "phoneGenerated"
    });

    assert.equal(formatted, "+383 43 201 234", "Result " + formatted);
  });

  qunit.test(
    "phone - empty value keeps placeholder hidden (#8)",
    function (assert) {
      const done = assert.async(),
        $fixture = $("#qunit-fixture");
      $fixture.append('<input type="text" id="testmask" value="" />');
      const testmask = document.getElementById("testmask");

      Inputmask("phone").mask(testmask);

      setTimeout(function () {
        assert.equal(testmask.value, "", "Result " + testmask.value);
        done();
      }, 0);
    }
  );

  qunit.test("phonebe - type national number", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");

    Inputmask("phonebe").mask(testmask);
    testmask.focus();
    $("#testmask").Type("473890428");

    setTimeout(function () {
      assert.equal(
        testmask.value,
        "+32(473)89-04-28",
        "Result " + testmask.value
      );
      done();
    }, 0);
  });

  qunit.test("phonebe - national value 473890428", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");

    Inputmask("phonebe").mask(testmask);
    $(testmask).val("473890428");

    setTimeout(function () {
      assert.equal(
        testmask.value,
        "+32(473)89-04-28",
        "Result " + testmask.value
      );
      done();
    }, 0);
  });

  qunit.test("phone - international value", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append(
      '<input type="text" id="testmask" value="+32(473)890-428" />'
    );
    const testmask = document.getElementById("testmask");

    Inputmask("phone").mask(testmask);

    setTimeout(function () {
      assert.equal(
        testmask.value,
        "+32(473)890-428",
        "Result " + testmask.value
      );
      done();
    }, 0);
  });

  qunit.test("phone - national value", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="32473890428" />');
    const testmask = document.getElementById("testmask");

    Inputmask("phone").mask(testmask);

    setTimeout(function () {
      assert.equal(
        testmask.value,
        "+32(473)890-428",
        "Result " + testmask.value
      );
      done();
    }, 0);
  });

  // Upstream #7: typing the Armenian calling code must not become +1 ...
  qunit.test("phone - Armenian calling code", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");

    Inputmask("phone").mask(testmask);
    testmask.focus();
    $("#testmask").Type("37412345678");

    setTimeout(function () {
      assert.equal(
        testmask.value.indexOf("+374"),
        0,
        "Result " + testmask.value
      );
      done();
    }, 0);
  });

  // Upstream #9: German numbers must keep the +49 calling code.
  qunit.test("phone - German international value", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append(
      '<input type="text" id="testmask" value="+49 30 901820" />'
    );
    const testmask = document.getElementById("testmask");

    Inputmask("phone").mask(testmask);

    setTimeout(function () {
      assert.equal(
        testmask.value.indexOf("+49"),
        0,
        "Result " + testmask.value
      );
      done();
    }, 0);
  });

  // Upstream #5: +7 7xx is Kazakhstan, not Russia.
  qunit.test("phone - Kazakhstan calling code", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="+77172123456" />');
    const testmask = document.getElementById("testmask"),
      instance = Inputmask("phone").mask(testmask);

    setTimeout(function () {
      assert.equal(
        testmask.value.indexOf("+7(7"),
        0,
        "Result " + testmask.value
      );
      assert.equal(instance.getmetadata().cc, "KZ", "metadata country");
      done();
    }, 0);
  });

  // Upstream #13: countrycode restricts the mask list before masking a value.
  qunit.test("phone - countrycode filters autofill value", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" value="+79161234567" />');
    const testmask = document.getElementById("testmask");

    Inputmask("phone", { countrycode: "7" }).mask(testmask);

    setTimeout(function () {
      assert.equal(testmask.value.indexOf("+7"), 0, "Result " + testmask.value);
      assert.notEqual(testmask.value.indexOf("+1(242)"), 0, "no +1 mask");
      done();
    }, 0);
  });

  qunit.test("phonebe - backspace removes one digit", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append('<input type="text" id="testmask" />');
    const testmask = document.getElementById("testmask");

    Inputmask("phonebe", { nullable: false }).mask(testmask);
    $(testmask).val("+32473890428");
    testmask.focus();
    $.caret(testmask, testmask.value.length);
    $("#testmask").SendKey(keys.Backspace);

    setTimeout(function () {
      assert.equal(testmask.value.length, 16, "Result " + testmask.value);
      assert.equal(testmask.value.indexOf("+32"), 0, "no prefix");
      done();
    }, 0);
  });

  qunit.test("phonebe - metadata follows matched city", function (assert) {
    const done = assert.async(),
      $fixture = $("#qunit-fixture");
    $fixture.append(
      '<input type="text" id="testmask" value="+32(2)473-89-04" />'
    );
    const testmask = document.getElementById("testmask"),
      instance = Inputmask("phonebe").mask(testmask);

    setTimeout(function () {
      const metadata = instance.getmetadata();
      assert.equal(metadata.cc, "BE", "country");
      assert.equal(metadata.city, "Brussel/Bruxelles (Brussels)", "city");
      done();
    }, 0);
  });
}
