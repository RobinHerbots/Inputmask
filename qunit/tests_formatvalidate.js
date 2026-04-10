export default function (qunit, Inputmask) {
  qunit.module("Value formatting");
  qunit.test(
    'Inputmask.format("2331973", { alias: "datetime"})',
    function (assert) {
      var formattedValue = Inputmask.format("2331973", {
        alias: "datetime",
        inputFormat: "dd/MM/yyyy",
        min: "01/01/1900"
      });
      assert.equal(formattedValue, "23/03/1973", "Result " + formattedValue);
    }
  );

  qunit.test(
    'Inputmask.format("016501030020001DE1015170", { mask: "99 999 999 999 9999 \\D\\E*** 9999"})',
    function (assert) {
      var formattedValue = Inputmask.format("016501030020001DE1015170", {
        mask: "99 999 999 999 9999 \\D\\E*** 9999"
      });
      assert.equal(
        formattedValue,
        "01 650 103 002 0001 DE101 5170",
        "Result " + formattedValue
      );
    }
  );

  qunit.test(
    'Inputmask.format("12", {  mask: "$ 999999", numericInput: true, placeholder: "0" }); - gigermocas',
    function (assert) {
      var formattedValue = Inputmask.format("12", {
        mask: "$ 999999",
        numericInput: true,
        placeholder: "0"
      });
      assert.equal(formattedValue, "$ 000012", "Result " + formattedValue);
    }
  );

  qunit.test(
    'Inputmask.format("1111111.11" - ... autoGroup: true - swd120',
    function (assert) {
      var formattedValue = Inputmask.format("1111111.11", {
        alias: "decimal",
        radixPoint: ".",
        digits: 2,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        allowMinus: true
      });
      assert.equal(formattedValue, "1,111,111.11", "Result " + formattedValue);
    }
  );

  qunit.test(
    "Inputmask.format(phone, { mask: '(999) 999-9999' })); - krivaten",
    function (assert) {
      var phone = "5551112222",
        formattedValue = Inputmask.format(phone, {
          mask: "(999) 999-9999"
        });
      assert.equal(
        formattedValue,
        "(555) 111-2222",
        "Result " + formattedValue
      );
    }
  );

  qunit.test("format(62.91, { alias: 'numeric' } - penihel", function (assert) {
    var formattedValue = Inputmask.format(62.91, { alias: "numeric" });
    assert.equal(formattedValue, "62.91", "Result " + formattedValue);
  });

  qunit.module("Value Validating");
  qunit.test(
    'Inputmask.isValid("23/03/1973", { alias: "datetime"})',
    function (assert) {
      var isValid = Inputmask.isValid("23/03/1973", {
        alias: "datetime",
        inputFormat: "dd/mm/yyyy",
        min: "01/01/1900"
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'Inputmask.isValid("01 650 103 002 0001 DE101 5170", { mask: "99 999 999 999 9999 \\D\\E*** 9999"})',
    function (assert) {
      var isValid = Inputmask.isValid("01 650 103 002 0001 DE101 5170", {
        mask: "99 999 999 999 9999 \\D\\E*** 9999"
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test("Inputmask.isValid email => true", function (assert) {
    var isValid = Inputmask.isValid("some.body@mail.c", {
      alias: "email"
    });
    assert.equal(isValid, true, "Result " + isValid);
  });

  qunit.test("Inputmask.isValid email => true", function (assert) {
    var isValid = Inputmask.isValid("some.body@mail.com", {
      alias: "email"
    });
    assert.equal(isValid, true, "Result " + isValid);
  });

  qunit.test("Inputmask.isValid email greedy => true", function (assert) {
    var isValid = Inputmask.isValid("some.body@mail.c", {
      alias: "email",
      greedy: true
    });
    assert.equal(isValid, true, "Result " + isValid);
  });

  qunit.test("Inputmask.isValid email greedy => true", function (assert) {
    var isValid = Inputmask.isValid("some.body@mail.com", {
      alias: "email",
      greedy: true
    });
    assert.equal(isValid, true, "Result " + isValid);
  });

  qunit.test(
    'YoussefTaghlabi isValid("100", { alias: "integer" }',
    function (assert) {
      var isValid = Inputmask.isValid("100", {
        alias: "integer"
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );
  qunit.test(
    'YoussefTaghlabi isValid("100.00", { alias: "integer" }',
    function (assert) {
      var isValid = Inputmask.isValid("100.00", {
        alias: "integer"
      });
      assert.equal(isValid, false, "Result " + isValid);
    }
  );
  qunit.test(
    'YoussefTaghlabi isValid("123", { alias: "decimal" }',
    function (assert) {
      var isValid = Inputmask.isValid("123", {
        alias: "decimal"
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );
  qunit.test(
    'YoussefTaghlabi isValid("123.45", { alias: "decimal" }',
    function (assert) {
      var isValid = Inputmask.isValid("123.45", {
        alias: "decimal"
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );
  qunit.test(
    'YoussefTaghlabi isValid("123456.78", { alias: "decimal" }',
    function (assert) {
      var isValid = Inputmask.isValid("123456.78", {
        alias: "decimal"
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );
  qunit.test(
    'YoussefTaghlabi isValid("123,456.78", { alias: "decimal" }',
    function (assert) {
      var isValid = Inputmask.isValid("123,456.78", {
        alias: "decimal",
        radixPoint: ".",
        groupSeparator: ","
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );
  qunit.test(
    'YoussefTaghlabi isValid("12,", { alias: "decimal" }',
    function (assert) {
      var isValid = Inputmask.isValid("12,", {
        alias: "decimal",
        radixPoint: ".",
        groupSeparator: ",",
        groupSize: 3
      });
      assert.equal(isValid, false, "Result " + isValid);
    }
  );
  qunit.test(
    'YoussefTaghlabi isValid("12,1.45", { alias: "decimal" }',
    function (assert) {
      var isValid = Inputmask.isValid("12,1.45", {
        alias: "decimal",
        radixPoint: ".",
        groupSeparator: ","
      });
      assert.equal(isValid, false, "Result " + isValid);
    }
  );
  qunit.test(
    'YoussefTaghlabi isValid("12,345.67", { alias: "decimal" }',
    function (assert) {
      var isValid = Inputmask.isValid("12,345.67", {
        alias: "decimal",
        radixPoint: ".",
        groupSeparator: ","
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'thomstark isValid("12lbs", {mask:"99[9]lb\\s", greedy:false, skipOptionalPartCharacter: "", "clearIncomplete":true}',
    function (assert) {
      var isValid = Inputmask.isValid("12lbs", {
        mask: "99[9]lb\\s",
        greedy: false,
        skipOptionalPartCharacter: "",
        clearIncomplete: true
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'thomstark isValid("1\'2"", {mask:"9\'9[9]"", greedy:false, skipOptionalPartCharacter: "", "clearIncomplete":true}',
    function (assert) {
      var isValid = Inputmask.isValid("1'2\"", {
        mask: "9'9[9]\"",
        greedy: false,
        skipOptionalPartCharacter: "",
        clearIncomplete: true
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'thomstark isValid("12lbs", {mask:"99{1,2}lb\\s", greedy:false, skipOptionalPartCharacter: "", "clearIncomplete":true}',
    function (assert) {
      var isValid = Inputmask.isValid("12lbs", {
        mask: "99{1,2}lb\\s",
        greedy: false,
        skipOptionalPartCharacter: "",
        clearIncomplete: true
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'thomstark isValid("9\'9{1,2}", {mask:"9\'9[9]"", greedy:false, skipOptionalPartCharacter: "", "clearIncomplete":true}',
    function (assert) {
      var isValid = Inputmask.isValid("1'2\"", {
        mask: "9'9{1,2}\"",
        greedy: false,
        skipOptionalPartCharacter: "",
        clearIncomplete: true
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'a13x3y isValid("some_body@mail.com", {alias:"email"}',
    function (assert) {
      var isValid = Inputmask.isValid("some_body@mail.com", {
        alias: "email"
      });
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'isValid("some.body@mail.com.", {alias:"email"}) - trailing dot #1908',
    function (assert) {
      var isValid = Inputmask.isValid("some.body@mail.com.", {
        alias: "email"
      });
      assert.equal(isValid, false, "Result " + isValid);
    }
  );

  qunit.test(
    'isValid("some.body@mail.com..", {alias:"email"}) - double trailing dot #1908',
    function (assert) {
      var isValid = Inputmask.isValid("some.body@mail.com..", {
        alias: "email"
      });
      assert.equal(isValid, false, "Result " + isValid);
    }
  );

  qunit.test(
    'Inputmask("(99[ ]){1,3}").isValid("99 99") - space in quantifier-nested optional group',
    function (assert) {
      var isValid = Inputmask("(99[ ]){1,3}").isValid("99 99");
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'Inputmask("(99[ ]){1,3}").isValid("99 99 99") - space in quantifier-nested optional group',
    function (assert) {
      var isValid = Inputmask("(99[ ]){1,3}").isValid("99 99 99");
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'Inputmask("(99[ ]){1,3}").isValid("99") - first repetition without optional space',
    function (assert) {
      var isValid = Inputmask("(99[ ]){1,3}").isValid("99");
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.test(
    'Inputmask("99-99[ 99/99]").isValid("03-11") - pricejt',
    function (assert) {
      var isValid = Inputmask("99-99[ 99/99]").isValid("03-11");
      assert.equal(isValid, true, "Result " + isValid);
    }
  );

  qunit.module("Value unmasking");
  qunit.test(
    'inputmask.unmask("23/03/1973", { alias: "datetime dd/mm/yyyy" })',
    function (assert) {
      var unmasked = Inputmask.unmask("23/03/1973", {
        alias: "datetime",
        inputFormat: "dd/mm/yyyy",
        min: "01/01/1900",
        outputFormat: "ddmmyyyy"
      });
      assert.equal(unmasked, "23031973", "Result " + unmasked);
    }
  );

  qunit.test(
    "Inputmask.unmask('(123)456-78-90', '(999)999-99-99')",
    function (assert) {
      var unmasked = Inputmask.unmask("(123)456-78-90", "(999)999-99-99");
      assert.equal(unmasked, "1234567890", "Result " + unmasked);
    }
  );

  // https://github.com/RobinHerbots/Inputmask/issues/2262
  qunit.module("Decimal alias - negative with prefix (#2262)");

  qunit.test(
    'Inputmask.isValid("-$10.25", { alias: "decimal", groupSeparator: ",", prefix: "$" })',
    function (assert) {
      var valid = Inputmask.isValid("-$10.25", {
        alias: "decimal",
        groupSeparator: ",",
        prefix: "$"
      });
      assert.equal(valid, true, "Result " + valid);
    }
  );

  qunit.test(
    'Inputmask.isValid("-$10,000.25", { alias: "decimal", groupSeparator: ",", prefix: "$" })',
    function (assert) {
      var valid = Inputmask.isValid("-$10,000.25", {
        alias: "decimal",
        groupSeparator: ",",
        prefix: "$"
      });
      assert.equal(valid, true, "Result " + valid);
    }
  );

  qunit.test(
    'Inputmask.format("-10.25", { alias: "decimal", groupSeparator: ",", prefix: "$" })',
    function (assert) {
      var formatted = Inputmask.format("-10.25", {
        alias: "decimal",
        groupSeparator: ",",
        prefix: "$"
      });
      assert.equal(formatted, "-$10.25", "Result " + formatted);
    }
  );

  // Follow-up from issue #2262: space group separator together with a space inside the prefix.
  qunit.test(
    'Inputmask.isValid("-\u20AC 10.25", { alias: "decimal", groupSeparator: " ", prefix: "\u20AC " })',
    function (assert) {
      var valid = Inputmask.isValid("-\u20AC 10.25", {
        alias: "decimal",
        groupSeparator: " ",
        prefix: "\u20AC "
      });
      assert.equal(valid, true, "Result " + valid);
    }
  );

  qunit.test(
    'Inputmask.format("-10.25", { alias: "decimal", groupSeparator: " ", prefix: "\u20AC " })',
    function (assert) {
      var formatted = Inputmask.format("-10.25", {
        alias: "decimal",
        groupSeparator: " ",
        prefix: "\u20AC "
      });
      assert.equal(formatted, "-\u20AC 10.25", "Result " + formatted);
    }
  );

  qunit.test(
    'Inputmask.format("-1234567.89", { alias: "decimal", groupSeparator: " ", prefix: "\u20AC " })',
    function (assert) {
      var formatted = Inputmask.format("-1234567.89", {
        alias: "decimal",
        groupSeparator: " ",
        prefix: "\u20AC "
      });
      assert.equal(formatted, "-\u20AC 1 234 567.89", "Result " + formatted);
    }
  );

  // Symmetric case: space inside the suffix.
  qunit.test(
    'Inputmask.format("-1234.56", { alias: "decimal", groupSeparator: " ", suffix: " \u20AC" })',
    function (assert) {
      var formatted = Inputmask.format("-1234.56", {
        alias: "decimal",
        groupSeparator: " ",
        suffix: " \u20AC"
      });
      assert.equal(formatted, "-1 234.56 \u20AC", "Result " + formatted);
    }
  );

  // Strip-negation-when-zero path: minus on a zero value must be dropped
  // without clobbering a prefix character that coincides with groupSeparator.
  qunit.test(
    'Inputmask.format("-0", { alias: "decimal", groupSeparator: " ", prefix: "\u20AC " })',
    function (assert) {
      var formatted = Inputmask.format("-0", {
        alias: "decimal",
        groupSeparator: " ",
        prefix: "\u20AC "
      });
      assert.equal(formatted, "\u20AC 0", "Result " + formatted);
    }
  );

  // Symmetric strip-negation-when-zero path with suffix collision.
  qunit.test(
    'Inputmask.format("-0", { alias: "decimal", groupSeparator: " ", suffix: " \u20AC" })',
    function (assert) {
      var formatted = Inputmask.format("-0", {
        alias: "decimal",
        groupSeparator: " ",
        suffix: " \u20AC"
      });
      assert.equal(formatted, "0 \u20AC", "Result " + formatted);
    }
  );

  // Round-trip: the fully-grouped output must also be accepted as valid input.
  qunit.test(
    'Inputmask.isValid("-\u20AC 1 234 567.89", { alias: "decimal", groupSeparator: " ", prefix: "\u20AC " })',
    function (assert) {
      var valid = Inputmask.isValid("-\u20AC 1 234 567.89", {
        alias: "decimal",
        groupSeparator: " ",
        prefix: "\u20AC "
      });
      assert.equal(valid, true, "Result " + valid);
    }
  );

  // Integer-style mask (radixPoint: ""): a bare negative must still collapse
  // to zero on checkval — regression guard for the radix-less zero cleanup.
  qunit.test(
    'Inputmask.format("-", { alias: "integer", radixPoint: "" })',
    function (assert) {
      var formatted = Inputmask.format("-", {
        alias: "integer",
        radixPoint: ""
      });
      assert.equal(formatted, "0", "Result " + formatted);
    }
  );

  qunit.test(
    'Inputmask.format("-", { alias: "decimal", radixPoint: "", digits: 0 })',
    function (assert) {
      var formatted = Inputmask.format("-", {
        alias: "decimal",
        radixPoint: "",
        digits: 0
      });
      assert.equal(formatted, "0", "Result " + formatted);
    }
  );

  qunit.test(
    'Inputmask.format("-", { alias: "numeric", radixPoint: "" })',
    function (assert) {
      var formatted = Inputmask.format("-", {
        alias: "numeric",
        radixPoint: ""
      });
      assert.equal(formatted, "0", "Result " + formatted);
    }
  );

  qunit.test(
    'Inputmask.format("-", { alias: "integer", placeholder: "" })',
    function (assert) {
      var formatted = Inputmask.format("-", {
        alias: "integer",
        placeholder: ""
      });
      assert.equal(formatted, "0", "Result " + formatted);
    }
  );

  // Radix-less with groupSeparator: an empty radixPoint replace must not
  // inject a stray "." into the number string.
  qunit.test(
    'Inputmask.format("-", { alias: "numeric", radixPoint: "", groupSeparator: ",", digits: 0 })',
    function (assert) {
      var formatted = Inputmask.format("-", {
        alias: "numeric",
        radixPoint: "",
        groupSeparator: ",",
        digits: 0
      });
      assert.equal(formatted, "0", "Result " + formatted);
    }
  );

  qunit.test(
    'Inputmask.format("-", { alias: "numeric", radixPoint: "", groupSeparator: ",", digits: 0, placeholder: "" })',
    function (assert) {
      var formatted = Inputmask.format("-", {
        alias: "numeric",
        radixPoint: "",
        groupSeparator: ",",
        digits: 0,
        placeholder: ""
      });
      assert.equal(formatted, "0", "Result " + formatted);
    }
  );

  // Parenthetical negation with prefix/groupSeparator collision.
  qunit.test(
    'Inputmask.format("-1234.56", { alias: "decimal", groupSeparator: " ", prefix: "\u20AC ", negationSymbol: { front: "(", back: ")" } })',
    function (assert) {
      var formatted = Inputmask.format("-1234.56", {
        alias: "decimal",
        groupSeparator: " ",
        prefix: "\u20AC ",
        negationSymbol: { front: "(", back: ")" }
      });
      assert.equal(
        formatted,
        "(\u20AC 1 234.56)",
        "Result " + formatted
      );
    }
  );

  qunit.test(
    'Inputmask.isValid("(\u20AC 1 234.56)", { alias: "decimal", groupSeparator: " ", prefix: "\u20AC ", negationSymbol: { front: "(", back: ")" } })',
    function (assert) {
      var valid = Inputmask.isValid("(\u20AC 1 234.56)", {
        alias: "decimal",
        groupSeparator: " ",
        prefix: "\u20AC ",
        negationSymbol: { front: "(", back: ")" }
      });
      assert.equal(valid, true, "Result " + valid);
    }
  );

  // Exact config from #2678: prefix "Rp. " with groupSeparator "." and radixPoint ","
  qunit.test(
    'Inputmask.format("-1000,55", { alias: "decimal", prefix: "Rp. ", radixPoint: ",", groupSeparator: "." }) - #2678',
    function (assert) {
      var formatted = Inputmask.format("-1000,55", {
        alias: "decimal",
        prefix: "Rp. ",
        radixPoint: ",",
        groupSeparator: "."
      });
      assert.equal(formatted, "-Rp. 1.000,55", "Result " + formatted);
    }
  );

  qunit.test(
    'Inputmask.isValid("-Rp. 1.000,55", { alias: "decimal", prefix: "Rp. ", radixPoint: ",", groupSeparator: "." }) - #2678',
    function (assert) {
      var valid = Inputmask.isValid("-Rp. 1.000,55", {
        alias: "decimal",
        prefix: "Rp. ",
        radixPoint: ",",
        groupSeparator: "."
      });
      assert.equal(valid, true, "Result " + valid);
    }
  );

  qunit.test(
    'Inputmask.format("-0", { alias: "decimal", prefix: "Rp. ", radixPoint: ",", groupSeparator: "." }) - #2678',
    function (assert) {
      var formatted = Inputmask.format("-0", {
        alias: "decimal",
        prefix: "Rp. ",
        radixPoint: ",",
        groupSeparator: "."
      });
      assert.equal(formatted, "Rp. 0", "Result " + formatted);
    }
  );

  // Exact config from #2771: suffix " zl" with groupSeparator " "
  qunit.test(
    'Inputmask.format("-1234.56", { alias: "decimal", suffix: " zl", groupSeparator: " " }) - #2771',
    function (assert) {
      var formatted = Inputmask.format("-1234.56", {
        alias: "decimal",
        suffix: " zl",
        groupSeparator: " "
      });
      assert.equal(formatted, "-1 234.56 zl", "Result " + formatted);
    }
  );

  qunit.test(
    'Inputmask.isValid("-1 234.56 zl", { alias: "decimal", suffix: " zl", groupSeparator: " " }) - #2771',
    function (assert) {
      var valid = Inputmask.isValid("-1 234.56 zl", {
        alias: "decimal",
        suffix: " zl",
        groupSeparator: " "
      });
      assert.equal(valid, true, "Result " + valid);
    }
  );

  qunit.test(
    'Inputmask.format("-0", { alias: "decimal", suffix: " zl", groupSeparator: " " }) - #2771',
    function (assert) {
      var formatted = Inputmask.format("-0", {
        alias: "decimal",
        suffix: " zl",
        groupSeparator: " "
      });
      assert.equal(formatted, "0 zl", "Result " + formatted);
    }
  );
}
