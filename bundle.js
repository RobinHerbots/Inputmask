import "./lib/global/FormData";

import { registerCssunit } from "./lib/extensions/cssunit";
import { registerDatetime } from "./lib/extensions/date";
import { registerDefinitions } from "./lib/extensions/definitions";
import { registerEmail } from "./lib/extensions/email";
import { registerIp } from "./lib/extensions/ip";
import { registerMac } from "./lib/extensions/mac";
import { registerNumeric } from "./lib/extensions/numeric";
import { registerSsn } from "./lib/extensions/ssn";
import { registerUrl } from "./lib/extensions/url";
import { registerVin } from "./lib/extensions/vin";
import "./lib/components/inputmaskElement";
import Inputmask from "./lib/index";

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
