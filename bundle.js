import "./lib/polyfills/Object.getPrototypeOf";
import "./lib/polyfills/Array.includes";
import "./lib/polyfills/Object.entries";
import "./lib/polyfills/String.includes";

import "./lib/global/FormData";

import { registerDefinitions } from "./lib/extensions/definitions";
import { registerCssunit } from "./lib/extensions/cssunit";
import { registerUrl } from "./lib/extensions/url";
import { registerIp } from "./lib/extensions/ip";
import { registerEmail } from "./lib/extensions/email";
import { registerMac } from "./lib/extensions/mac";
import { registerVin } from "./lib/extensions/vin";
import { registerSsn } from "./lib/extensions/ssn";
import { registerDatetime } from "./lib/extensions/date";
import { registerNumeric } from "./lib/extensions/numeric";
import "./lib/inputmaskElement";
import Inputmask from "./lib/inputmask";

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

export default Inputmask;
