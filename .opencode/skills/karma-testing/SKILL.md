---
name: karma-testing
description: Use when running, selecting, or debugging unit tests with QUnit in the Inputmask repository. Front-load when investigating bugs, running single or multiple select test suites, choosing a lane (Karma browser, Node + jsdom, or DOM-less Node bundles), or configuring local Chrome and BrowserStack targets.
---

# Karma & QUnit Testing in Inputmask

This skill guides testing workflows in the Inputmask repository using Karma and QUnit.

## Critical Rules & Pitfalls

1. **Local runs default to `ChromeHeadless` with `singleRun: true`:**
   With `CI` unset, `karma.conf.js` targets `ChromeHeadless` and exits on its own, so a plain `npx karma start karma.conf.js` no longer hangs. Passing `--browsers ChromeHeadless --single-run` is still fine (and explicit). Do NOT switch the default back to the GUI `Chrome` launcher — a visible Chrome never exits cleanly when driven from a CLI tool. Use `--browsers Chrome` only for the interactive debugging workflow (section 3).

2. **ALWAYS Redirect Output to a File — Do Not Pipe Inline:**
   Karma emits progress lines with ANSI escape codes that cause PowerShell `Select-String` and similar pipe commands to buffer indefinitely. Redirect stdout/stderr to a temp file, then read the file separately:
   ```bash
   npx karma start karma.conf.js --browsers ChromeHeadless --single-run --reporters progress > $env:TEMP\karma_results.log 2>&1
   ```
   Then read the file with the `Read` or `Select-String` tool in a separate step.

3. **ALWAYS Rebuild the Test Bundles After Any Changes:**
   Tests run from `qunit/qunit*.js`, which are compiled by rollup (`npm run build`) from `qunit/index*.js`, `qunit/harness.js` and `lib/`. Any edit in `lib/` or `qunit/*.js` (including `qunit/focusShim.js`) requires rebuilding (`npm run build`) or running the build in watch mode (`npm run build:watch`) before running Karma. The Node bundle tests (`qunit/tests_node.js`) do NOT use these bundles — run them with `npm run test:node` (after a build, they load `dist/`).

4. **The suite runs once per bundle:**
   `INPUTMASK_BUNDLE=umd|jquery|esm` selects `qunit/qunit.js`, `qunit/qunit.jquery.js` or `qunit/qunit.esm.js`. Only the `jquery` lane loads `node_modules/jquery/dist/jquery.js` (plus `dist/jquery.inputmask.js` as a global script). The native and ESM lanes have no jQuery on the page; the jQuery-only test module is not registered and the jQuery insertMode test is reported as skipped.

---

## Workflows

### 1. Running Tests (Recommended Pattern)

Always use this exact pattern for reliable, non-hanging test runs:

```bash
# 1. Rebuild bundles (if source changed)
npm run build

# 2. Run one lane (umd | jquery | esm), output to file
npm run test:umd > $env:TEMP\karma_umd.log 2>&1
npm run test:jquery > $env:TEMP\karma_jquery.log 2>&1
npm run test:esm > $env:TEMP\karma_esm.log 2>&1

# Or all three sequentially
npm run test:bundles > $env:TEMP\karma_bundles.log 2>&1

# 3. Read results (separate step)
Select-String -Path $env:TEMP\karma_*.log -Pattern "TOTAL|FAILED" | Select-Object -Last 5
```

### 2. Running a Single Test Suite or Selected Test Suites

To isolate specific test files (e.g., only `qunit/tests_numeric.js` or `qunit/tests_date.js`):

1. Edit `qunit/harness.js` to register only the desired test module(s):
   ```javascript
   // ...
   if (qunit) {
     testsNumeric(qunit, Inputmask);
     testsDate(qunit, Inputmask);
   }
   ```

   Note: do NOT add `qunit.load()` — `karma-qunit` sets `autostart: false` and starts the run itself.

2. Rebuild the test bundles:
   ```bash
   npm run build
   ```

3. Run Karma (pick the bundle lane you are debugging):
   ```bash
   npm run test:umd > $env:TEMP\karma_results.log 2>&1
   ```

4. Check results:
   ```powershell
   Select-String -Path $env:TEMP\karma_results.log -Pattern "TOTAL" | ForEach-Object { $_.Line }
   ```

### 3. Fast Interactive & Live Debugging

To keep the browser open and re-run tests instantly on changes:

1. In one terminal, run the build watcher (rebuilds `dist/` and the test bundles):
   ```bash
   npm run build:watch
   ```

2. In another terminal, run Karma in watch mode:
   ```bash
   npx karma start --browsers Chrome --no-single-run --auto-watch
   ```

3. In the opened Chrome window, click the **DEBUG** button in the top right to open the standalone test page, then press **F12** to open Chrome DevTools for breakpoints and console logs.

### 4. Alternative: Direct Browser HTML Runner (No Karma)

You can run and debug QUnit tests directly in any browser without Karma:
1. Rebuild the test bundles: `npm run build` (or keep `npm run build:watch` running).
2. Open `qunit/qunit.html` in your browser (it loads the UMD native bundle, `qunit/qunit.js`).
3. Use the QUnit web interface dropdown to filter by module or re-run individual tests.

### 5. Running Specific Tests via CLI Filter

You can filter tests by name or module via Karma client arguments without modifying `qunit/index.js`:
```bash
# Filter by test name
npx karma start karma.conf.js --browsers ChromeHeadless --single-run -- --filter="masked" > $env:TEMP\karma_results.log 2>&1

# Filter by module name
npx karma start karma.conf.js --browsers ChromeHeadless --single-run -- --module="Simple masking" > $env:TEMP\karma_results.log 2>&1
```

### 6. Cross-Platform / Cross-Browser Testing (BrowserStack)

Use BrowserStack ONLY when reproducing or verifying browser-specific or OS-specific issues (e.g., Safari/iOS or Android mobile events). The BrowserStack reporter is only enabled when `CI` is set, but the launchers are always available:
1. Ensure credentials are set:
   ```powershell
   $env:BROWSERSTACK_USERNAME="<username>"
   $env:BROWSERSTACK_ACCESS_KEY="<access_key>"
   ```
2. Run Karma specifying the target custom launcher from `karma.conf.js`:
   ```bash
   npx karma start karma.conf.js --browsers bs_safari_mac_Sonoma --single-run > $env:TEMP\karma_results.log 2>&1
   # Or for mobile:
   npx karma start karma.conf.js --browsers bs_iPhone14 --single-run > $env:TEMP\karma_results.log 2>&1
   ```

> **Focus note.** BrowserStack real mobile devices run with
> `document.hasFocus() === false`, so the page never dispatches `focus`/`blur`
> (`focusFired=0`, `blurFired=0`) even though `element.focus()` sets
> `document.activeElement`. Inputmask attaches its handlers natively
> (`EventRuler.on` → `$(input).on("focus.inputmask")`), so without the event
> `focusEvent`/`blurEvent` never run. `qunit/focusShim.js`, installed at the top of
> `qunit/index.js`, patches `HTMLElement.prototype.focus`/`blur` to dispatch the
> withheld event (tracking a virtual focused element, since `document.activeElement`
> drops back to `<body>` a task later on those devices). On a focused page the real
> event fires and the shim is a no-op. With it, Android, iOS and desktop BrowserStack
> all report 927/927. Keep the shim rebuild in mind: it lives in the test bundle
> (`npx webpack --config-name test`).

### 7. Bundle Lanes (UMD native, UMD jQuery, ESM)

The browser suite runs once per built bundle. Each lane is a separate Karma run
because loading more than one test bundle in a page would register the suite twice.

| Lane | Env | Artifact | jQuery | Expected |
| :--- | :--- | :--- | :--- | :--- |
| UMD native | `INPUTMASK_BUNDLE=umd` | `dist/inputmask.js` | no | 937 pass, 1 skip (of 938) |
| UMD jQuery | `INPUTMASK_BUNDLE=jquery` | `dist/jquery.inputmask.js` | yes | 938 pass, 1 skip (of 939) |
| ESM native | `INPUTMASK_BUNDLE=esm` | `dist/esm/inputmask.mjs` + `dist/esm/extensions/*.mjs` | no | 937 pass, 1 skip (of 938) |

```bash
npm run build
npm run test:umd    > $env:TEMP\im-umd.log 2>&1
npm run test:jquery > $env:TEMP\im-jquery.log 2>&1
npm run test:esm    > $env:TEMP\im-esm.log 2>&1
```

The native/ESM lanes deliberately do not load jQuery. The whole
`tests_jquery_inputmask.js` module is only registered on the jQuery lane, and the
"jQuery plugin insertMode:false" test in `tests_insertmode.js` is registered as a
skip there. The jQuery lane skips the native dependencyLib's non-writable
`extend` guard test, which does not apply to jQuery's `$.extend`. The ESM lane
has to register the extension bundles itself, because `dist/esm/inputmask.mjs`
is built from `lib/index.js` and does not include them.

### 8. Node + jsdom and DOM-less Bundle Lanes

Two extra QUnit lanes run without a real browser:

- **Node + jsdom** (same browser suite, jsdom instead of Chrome):
  ```bash
  npm run test:jsdom                 # UMD native, the default lane
  npm run test:jsdom:bundles         # umd, jquery and esm sequentially
  ```
  Uses the same `qunit/qunit*.js` bundles, so rebuild them after source changes.

- **Node, DOM-less bundles** (loads `dist/`, not the bundle):
  ```bash
  npm run test:node    # qunit qunit/tests_node.js
  ```
  Requires a build first (`dist/` must exist). This is where the CJS/ESM bundles are
  exercised without a DOM (guards SSR/import-time `matchMedia` regressions). It can also
  be run directly with `node qunit/tests_node.js`.

---

## Quick Reference Commands

| Task | Command |
| :--- | :--- |
| Build bundles once | `npm run build` |
| Watch the build | `npm run build:watch` |
| Run UMD native browser lane | `npm run test:umd` |
| Run UMD jQuery browser lane | `npm run test:jquery` |
| Run ESM browser lane | `npm run test:esm` |
| Run all browser bundle lanes | `npm run test:bundles` |
| Run browser tests (default UMD native) | `npm run test:chrome` *(= `karma start karma.conf.js --browsers ChromeHeadless --single-run`; redirect to a file if piping)* |
| Run Node + jsdom tests | `npm run test:jsdom` (`test:jsdom:bundles` for all three) |
| Run DOM-less bundle tests (build first) | `npm run test:node` |
| Run the BrowserStack matrix | `npm run test:browserstack` *(`cross-env CI=true karma start karma.conf.js --single-run`; real desktop + mobile devices, needs `BROWSERSTACK_USERNAME`/`BROWSERSTACK_ACCESS_KEY`)* |
| Run tests with live auto-watch (GUI Chrome) | `npx karma start --browsers Chrome --no-single-run --auto-watch` |
| Full validation pipeline | `npm test` *(build → types → node → lint → UMD-native jsdom; run `test:bundles` separately for the full browser matrix)* |

---

## Known Pre-existing Failures

None currently. The UMD jQuery lane reports **938 passed + 1 skipped** (of 939). The UMD native and ESM lanes report **937 passed + 1 skipped** (of 938): the jQuery-plugin insertMode test is skipped and the `tests_jquery_inputmask.js` module is not registered. Node + jsdom and the BrowserStack desktop + real mobile (Android/iOS) lanes are green as well.

- `QUnit.config.testTimeout` (10s) turns a stalled async test into one failure instead of a browser
  disconnect. Real-mobile `document.hasFocus() === false` (which suppressed `focus`/`blur`) is handled
  by `qunit/focusShim.js` — see section 6.
- The previously tracked **negationSymbol parentheses + clearIncomplete** numeric failure (`numeric + negationSymbol=parentheses + clearIncomplete=true + type -123. then blur`, expected `"(123.000)"`) now passes.

> For history: `Currency digits and delete #1351`, `highlighting values with negative numbers #2714`, and `currency type 1234.56 + backspace x4` were fixed via the `revalidateMask` replay fix in `lib/validation.js` and a fractional-delete realignment branch in the numeric `onBeforeWrite` keydown handler (`lib/extensions/numeric.js`, the `caret.end > radixNdx` `else` branch).
