// Smoke test that the built bundles load and can be used in a DOM-less
// environment (Node, SSR, jsdom). Guards regressions like bare `matchMedia`
// globals crashing the module at import time (#2894).
const assert = require("node:assert"),
  path = require("node:path"),
  { pathToFileURL } = require("node:url");

async function run() {
  // 1. CJS (UMD) bundle
  const Inputmask = require("./dist/inputmask").default;
  assert.strictEqual(
    Inputmask.format("abcdef", { mask: "aa-aa-aa" }),
    "ab-cd-ef"
  );
  assert.strictEqual(
    Inputmask.format("123456", { mask: "99-99-99" }),
    "12-34-56"
  );

  // 2. ESM bundle
  const mod = await import(
      pathToFileURL(path.join(__dirname, "dist", "esm", "inputmask.mjs")).href
    ),
    InputmaskESM = mod.default;
  assert.strictEqual(
    InputmaskESM.format("0a1b2c", { mask: "9a9a9a" }),
    "0a1b2c"
  );

  console.log("nodetest ok");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
