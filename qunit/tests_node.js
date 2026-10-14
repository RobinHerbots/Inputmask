// Node-only QUnit module: the built bundles must load and run without a DOM.
// Guards regressions like bare `matchMedia`/`window` globals crashing a bundle
// at import time (SSR / jsdom without a rendering engine, #2894).
//
// Runs through the QUnit Node CLI (see the "qunitnode" grunt task):
//   qunit qunit/tests_node.js
// It must NOT be imported by qunit/index.js, the assertions rely on Node's
// CommonJS require and dynamic import of the dist artifacts.
const path = require("node:path"),
  { pathToFileURL } = require("node:url");

// The QUnit CLI exposes QUnit as a global before loading this file; fall back
// to loading it directly so the module also runs via `node qunit/tests_node.js`.
const QUnit = globalThis.QUnit || require("qunit");

QUnit.module("node bundles");

QUnit.test(
  "CJS (UMD) bundle loads and formats without a DOM",
  function (assert) {
    // require, not import: this is the entry a Node/SSR consumer reaches
    const Inputmask = require("../dist/inputmask").default;

    assert.equal(
      Inputmask.format("abcdef", { mask: "aa-aa-aa" }),
      "ab-cd-ef",
      "aa-aa-aa"
    );
    assert.equal(
      Inputmask.format("123456", { mask: "99-99-99" }),
      "12-34-56",
      "99-99-99"
    );
  }
);

QUnit.test(
  "ESM bundle loads and formats without a DOM",
  async function (assert) {
    const mod = await import(
        pathToFileURL(
          path.join(__dirname, "..", "dist", "esm", "inputmask.mjs")
        ).href
      ),
      InputmaskESM = mod.default;

    assert.equal(
      InputmaskESM.format("0a1b2c", { mask: "9a9a9a" }),
      "0a1b2c",
      "9a9a9a"
    );
  }
);

// Under the QUnit CLI the runner owns the start and the reporter. When run
// directly with node, start here and derive the exit code from the results.
if (!globalThis.QUnit) {
  QUnit.on("runEnd", (details) => {
    const { passed, failed } = details.testCounts;
    console.log(`node bundles: ${passed} passed, ${failed} failed`);
    process.exitCode = failed ? 1 : 0;
  });
  QUnit.start();
}
