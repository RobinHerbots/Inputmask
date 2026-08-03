/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import Inputmask from "../inputmask";

Inputmask.extendAliases({
  email: {
    // https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
    // https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
    // should be extended with the toplevel domains at the end
    mask: function ({ separator, quantifier }) {
      let emailMask =
          "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
        mask = emailMask;
      if (separator) {
        for (let i = 0; i < quantifier; i++) {
          mask += `[${separator}${emailMask}]`;
        }
      }
      return mask;
    },
    greedy: false,
    casing: "lower",
    separator: null,
    quantifier: 5,
    skipOptionalPartCharacter: "",
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace("mailto:", "");
    },
    definitions: {
      "*": {
        validator:
          "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5!#$%&'*+/=?^_`{|}~-]"
      },
      "-": {
        validator: "[0-9A-Za-z-]"
      }
    },
    onUnMask: function (maskedValue, unmaskedValue, opts) {
      return maskedValue;
    },
    inputmode: "email"
  }
});
