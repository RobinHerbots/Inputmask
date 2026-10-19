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
    // the public entry attaches the DOM driver even when loaded without a DOM
    assert.equal(
      typeof Inputmask.prototype.mask,
      "function",
      "prototype.mask attached"
    );
    assert.equal(
      typeof Inputmask.prototype.remove,
      "function",
      "prototype.remove attached"
    );
    assert.equal(typeof Inputmask.remove, "function", "static remove attached");
    assert.equal(
      typeof Inputmask.setValue,
      "function",
      "static setValue attached"
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

    const session = InputmaskESM({ mask: "aa-99-aa" });
    session.input("ab12cd");
    assert.equal(session.getValue(), "ab-12-cd", "ESM session input");
    assert.equal(
      session.unmaskedvalue(),
      "ab12cd",
      "ESM session unmaskedvalue"
    );
    session.backspace();
    assert.equal(session.getValue(), "ab-12-c_", "ESM session backspace");
    assert.equal(
      typeof InputmaskESM.prototype.mask,
      "function",
      "ESM prototype.mask attached"
    );
  }
);

QUnit.test(
  "Headless interactive session: input, delete, paste, and selection",
  function (assert) {
    const Inputmask = require("../dist/inputmask").default;
    const session = Inputmask({ mask: "99/99/9999" });

    assert.equal(session.getValue(), "__/__/____", "initial template value");
    assert.deepEqual(
      session.getSelection(),
      { begin: 0, end: 0 },
      "initial caret"
    );

    session.input("1");
    assert.equal(session.getValue(), "1_/__/____", "typed 1");
    assert.deepEqual(
      session.getSelection(),
      { begin: 1, end: 1 },
      "caret after 1"
    );

    session.input("2");
    assert.equal(session.getValue(), "12/__/____", "typed 2");
    assert.deepEqual(
      session.getSelection(),
      { begin: 3, end: 3 },
      "caret skipped separator to 3"
    );

    session.input("34");
    assert.equal(session.getValue(), "12/34/____", "typed 34");
    assert.deepEqual(
      session.getSelection(),
      { begin: 6, end: 6 },
      "caret after 34"
    );

    session.backspace();
    assert.equal(session.getValue(), "12/3_/____", "backspace removed 4");
    assert.deepEqual(
      session.getSelection(),
      { begin: 4, end: 4 },
      "caret on 4"
    );

    session.input("5");
    assert.equal(session.getValue(), "12/35/____", "re-typed 5");

    session.paste("2026");
    assert.equal(session.getValue(), "12/35/2026", "pasted year");
    assert.equal(session.unmaskedvalue(), "12352026", "unmasked value");
    assert.equal(session.isComplete(), true, "isComplete is true");

    // Test setValue
    session.setValue("01012000");
    assert.equal(session.getValue(), "01/01/2000", "setValue masked correctly");
    assert.equal(
      session.unmaskedvalue(),
      "01012000",
      "setValue unmasked value"
    );
  }
);

QUnit.test(
  "Headless interactive session: controlled input recipe (setValue + selection)",
  function (assert) {
    const Inputmask = require("../dist/inputmask").default;
    const session = new Inputmask({ mask: "(999) 999-9999" });

    // what a controlled onChange does: push the raw text, read state back
    session.setValue("1234567890");
    assert.equal(session.getValue(), "(123) 456-7890", "masked value");
    assert.equal(session.unmaskedvalue(), "1234567890", "unmasked value");
    assert.equal(session.isComplete(), true, "isComplete");

    session.setSelection(5, 8);
    assert.deepEqual(
      session.getSelection(),
      { begin: 5, end: 8 },
      "selection round-trip"
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
