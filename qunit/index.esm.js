// ESM native bundle lane: dist/esm/inputmask.mjs plus the extension bundles.
//
// dist/esm/inputmask.mjs is built from lib/index.js, which deliberately does
// not register the extensions or the FormData patch (unlike bundle.js). The
// ESM consumer has to import those modules and call their register functions,
// so this lane mirrors what a consumer does instead of relying on the UMD
// side effects. No jQuery is loaded on the page for this lane.
import Inputmask from "../dist/esm/inputmask.mjs";
import "../dist/esm/global/FormData.mjs";
import { registerCssunit } from "../dist/esm/extensions/cssunit.mjs";
import { registerDatetime } from "../dist/esm/extensions/date.mjs";
import { registerDefinitions } from "../dist/esm/extensions/definitions.mjs";
import { registerEmail } from "../dist/esm/extensions/email.mjs";
import { registerIp } from "../dist/esm/extensions/ip.mjs";
import { registerMac } from "../dist/esm/extensions/mac.mjs";
import { registerNumeric } from "../dist/esm/extensions/numeric.mjs";
import { registerSsn } from "../dist/esm/extensions/ssn.mjs";
import { registerUrl } from "../dist/esm/extensions/url.mjs";
import { registerVin } from "../dist/esm/extensions/vin.mjs";

import registerTests from "./harness.js";

registerDefinitions();
registerCssunit();
registerUrl();
registerIp();
registerEmail();
registerMac();
registerVin();
registerSsn();
registerDatetime();
registerNumeric();

registerTests(Inputmask, {
  label: "ESM native (dist/esm/inputmask.mjs)"
});
