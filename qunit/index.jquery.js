// UMD jQuery bundle lane: karma loads jquery and the standalone UMD bundle of
// the @inputmask/jquery workspace package as global scripts, so behavior
// matches how the bundle is consumed. The UMD bundle registers itself as
// `window.InputmaskJQuery`.
import registerTests from "./harness.js";

const Inputmask = window.Inputmask || window.InputmaskJQuery;

if (!Inputmask) {
  throw new Error(
    "@inputmask/jquery did not register window.InputmaskJQuery; is the UMD bundle loaded?"
  );
}

registerTests(Inputmask, {
  jquery: true,
  label: "UMD jQuery (@inputmask/jquery)"
});
