/*
 * Audit every generated/imported phone mask.
 *
 *   npm run verify:masks --workspace inputmask.phone
 *   npm run verify:masks --workspace inputmask.phone -- --type
 *
 * Default mode checks format/unmask round-trips for every mask.  --type also
 * simulates keystrokes into a jsdom input for every mask.  Both modes are
 * build-time/dev-only and have no runtime impact on the package.
 */
import { createRequire } from "node:module";

import {
  registerPhone,
  registerPhoneCodes
} from "../lib/inputmask.phone.extensions.js";
import phoneBe from "../lib/phone-codes/phone-be.js";
import phoneCa from "../lib/phone-codes/phone-ca.js";
import phoneHu from "../lib/phone-codes/phone-hu.js";
import phoneIt from "../lib/phone-codes/phone-it.js";
import phoneGenerated from "../lib/phone-codes/phone-libphonenumber.generated.js";
import phoneMx from "../lib/phone-codes/phone-mx.js";
import phoneNl from "../lib/phone-codes/phone-nl.js";
import phoneRu from "../lib/phone-codes/phone-ru.js";
import phone from "../lib/phone-codes/phone.js";

const argValue = (name) => {
    const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
    return arg ? Number(arg.slice(name.length + 3)) : undefined;
  },
  datasetArg = process.argv.find((arg) => arg.startsWith("--dataset=")),
  datasetFilter = datasetArg && datasetArg.slice("--dataset=".length),
  startIndex = argValue("start") ?? 0,
  endIndex = argValue("end") ?? Number.POSITIVE_INFINITY,
  require = createRequire(import.meta.url),
  typecheck = process.argv.includes("--type"),
  definitions = { "#": { validator: "\\p{N}", definitionSymbol: "*" } },
  patterns = ["123456789", "987654321", "246813579", "135792468"],
  datasets = Object.fromEntries(
    Object.entries({
      phone,
      phoneBe,
      phoneCa,
      phoneHu,
      phoneIt,
      phoneMx,
      phoneNl,
      phoneRu,
      phoneGenerated
    }).filter(([name]) => !datasetFilter || name === datasetFilter)
  );

if (datasetFilter && Object.keys(datasets).length === 0) {
  throw new Error(`Unknown dataset: ${datasetFilter}`);
}

const digits = (value) => String(value).replace(/\D/g, "");

function escapeMaskLiterals(mask) {
  return mask.replace(/[()9]/g, "\\$&");
}

// Build deterministic values from the mask.  `formatValue` contains only the
// "#" positions (what Inputmask.format expects).  `typeValue` contains the
// digits a user actually types: national digits for a country dataset, or the
// full international digits for the generic dataset (which has no countrycode).
function samples(mask, countrycode, pattern = patterns[0]) {
  const expected = { format: "", type: "" },
    values = { format: "", type: "" };
  const cc = String(countrycode || "").replace(/\D/g, "");
  const leading = mask.match(/^\+(\d+)/);
  const skipCallingCode = cc && leading && leading[1] === cc;
  let variable = 0;

  for (let i = 0; i < mask.length; i++) {
    const chr = mask[i];
    if (chr === "#") {
      const digit = pattern[variable++ % pattern.length];
      values.format += digit;
      values.type += digit;
      expected.format += digit;
      expected.type += digit;
    } else if (/\d/.test(chr)) {
      const inCallingCode = skipCallingCode && i > 0 && i <= cc.length + 1;
      if (!inCallingCode) values.type += chr;
      expected.format += chr;
      expected.type += chr;
    } else {
      expected.format += chr;
      expected.type += chr;
    }
  }

  return { values, expected };
}

function optionsFor(mask) {
  return {
    mask: escapeMaskLiterals(mask),
    definitions,
    usePrototypeDefinitions: false,
    inputmode: "tel"
  };
}

let dom;
if (typecheck) {
  const { JSDOM } = await import("jsdom");
  dom = new JSDOM("<!doctype html><html><body></body></html>", {
    pretendToBeVisual: true
  });

  // The DOM-less dependencyLib calls its event constructor without `new`.
  // jsdom's native CustomEvent is a class and rejects that, so expose a
  // callable wrapper before loading the bundle.
  const NativeCustomEvent = dom.window.CustomEvent;
  dom.window.CustomEvent = function (event, params) {
    return new NativeCustomEvent(event, params);
  };
  dom.window.CustomEvent.prototype = NativeCustomEvent.prototype;

  for (const key of [
    "window",
    "document",
    "Element",
    "Event",
    "InputEvent",
    "HTMLElement",
    "CustomEvent"
  ]) {
    globalThis[key] = dom.window[key];
  }
  Object.defineProperty(globalThis, "navigator", {
    value: dom.window.navigator,
    configurable: true
  });
}

const Inputmask = require("../../../dist/inputmask.js");

registerPhone(Inputmask);
for (const [name, data] of Object.entries(datasets)) {
  registerPhoneCodes(Inputmask, `verify_${name}`, data);
}

function typeValue(alias, value) {
  const input = dom.window.document.createElement("input"),
    $ = Inputmask.dependencyLib;

  dom.window.document.body.appendChild(input);
  Inputmask(alias).mask(input);
  input.focus();

  // Mirror qunit/simulator.js: keydown, keypress and keyup are all sent, and
  // defaultPrevented is not consulted because $.Event is not cancelable there.
  for (const chr of value) {
    for (const type of ["keydown", "keypress", "keyup"]) {
      const event = new $.Event(type);
      event.key = chr;
      input.dispatchEvent(event);
    }
  }

  const typed = input.value;
  Inputmask.remove(input);
  input.remove();
  return typed;
}

let total = 0,
  failureCount = 0;
const failures = [];
const report = (failure) => {
  failureCount++;
  if (failures.length < 50) failures.push(failure);
};

for (const [name, data] of Object.entries(datasets)) {
  const alias = `verify_${name}`;
  let index = -1;

  for (const entry of data.phoneCodes) {
    index++;
    if (index < startIndex || index >= endIndex) continue;
    total++;
    const sample = samples(entry.mask, data.countrycode),
      opts = optionsFor(entry.mask),
      formatted = Inputmask.format(sample.values.format, opts);

    if (formatted !== sample.expected.format) {
      report({
        name,
        mask: entry.mask,
        value: sample.values.format,
        expected: sample.expected.format,
        formatted,
        kind: "format"
      });
      continue;
    }

    // Default unmask strips all mask literals, including fixed calling-code
    // and area-code digits, so only the "#" positions should remain.
    const unmasked = Inputmask.unmask(formatted, opts);
    if (digits(unmasked) !== sample.values.format) {
      report({
        name,
        mask: entry.mask,
        value: sample.values.format,
        unmasked,
        kind: "unmask"
      });
    }

    if (typecheck) {
      let typedOk = false,
        lastTyped;

      // A folded dataset can shadow a short prefix with a longer one.  Try a
      // few digit patterns so a mask is not reported untypable just because
      // the first sample happened to match a more specific sibling mask.
      for (const pattern of patterns) {
        const typeSample = samples(entry.mask, data.countrycode, pattern);
        lastTyped = typeValue(alias, typeSample.values.type);
        if (lastTyped === typeSample.expected.type) {
          typedOk = true;
          break;
        }
      }

      if (!typedOk) {
        report({
          name,
          mask: entry.mask,
          value: sample.values.type,
          expected: sample.expected.type,
          typed: lastTyped,
          kind: "type"
        });
      }
    }
  }
}

console.log(
  `Checked ${total} masks (${typecheck ? "format + unmask + type" : "format + unmask"})`
);
console.log(`Failures: ${failureCount}`);
if (failures.length > 0) console.log(JSON.stringify(failures, null, 2));
process.exitCode = failureCount > 0 ? 1 : 0;
