// Peer dependency; resolved by the consumer. Tests register directly against
// the bundle under test to avoid loading a second Inputmask instance.
// eslint-disable-next-line import-x/no-rename-default
import Inputmask from "inputmask";

import {
  registerPhone,
  registerPhoneCodes
} from "./lib/inputmask.phone.extensions.js";

// Keep the original package's side-effect behaviour: the abstractphone alias
// is available after importing the package.  Country datasets stay opt-in.
registerPhone(Inputmask);

export { registerPhone, registerPhoneCodes };
export default Inputmask;
