// UMD jQuery bundle lane: load dist/jquery.inputmask.js as a global script
// (UMD global branch) so behavior matches how the bundle is consumed. karma
// loads jquery then dist/jquery.inputmask.js before this harness bundle.
import registerTests from "./harness.js";

registerTests(window.Inputmask, {
  jquery: true,
  label: "UMD jQuery (dist/jquery.inputmask.js)"
});
