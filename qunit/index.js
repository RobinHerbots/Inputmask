// UMD native bundle lane: dist/inputmask.js, vanilla dependencyLib.
// No jQuery is loaded on the page by karma.conf.js for this lane.
import Inputmask from "../dist/inputmask.js";

import registerTests from "./harness.js";

registerTests(Inputmask, {
  label: "UMD native (dist/inputmask.js)"
});
