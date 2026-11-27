/*
 * Prototype generator.  Build-time only: the generated data module has no
 * dependency on libphonenumber-js at runtime.
 *
 *   node packages/inputmask.phone/bin/generate-from-libphonenumber.js
 */
import { writeFile } from "node:fs/promises";

import examples from "libphonenumber-js/examples.mobile";
import {
  getCountries,
  getCountryCallingCode,
  getExampleNumber
} from "libphonenumber-js/min";

const destination = new URL(
    "../lib/phone-codes/phone-libphonenumber.generated.js",
    import.meta.url
  ),
  displayName = new Intl.DisplayNames(["en"], { type: "region" });

function maskFromExample(country) {
  const example = getExampleNumber(country, examples);
  if (!example) return undefined;

  const formatted = example.formatInternational(),
    callingCode = "+" + getCountryCallingCode(country);

  if (!formatted.startsWith(callingCode)) return undefined;

  return {
    mask: callingCode + formatted.slice(callingCode.length).replace(/\d/g, "#"),
    cc: country,
    cd: displayName.of(country) || country,
    example: formatted
  };
}

const phoneCodes = getCountries()
    .map(maskFromExample)
    .filter(Boolean)
    .sort((a, b) => a.cc.localeCompare(b.cc)),
  contents = `/*
 Generated from libphonenumber-js example numbers - do not edit by hand.
 Run: node packages/inputmask.phone/bin/generate-from-libphonenumber.js
 */
export const countrycode = "";
export const phoneCodes = ${JSON.stringify(phoneCodes, null, 2)};

export default { countrycode, phoneCodes };
`;

await writeFile(destination, contents);
console.log(`Wrote ${phoneCodes.length} masks to ${destination.pathname}`);
