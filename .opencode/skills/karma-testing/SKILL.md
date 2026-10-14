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

3. **ALWAYS Rebuild the Test Bundle After Any Changes:**
   Tests run from `qunit/qunit.js`, which is compiled by webpack from `qunit/index.js` and `lib/`. Any edit in `lib/` or `qunit/*.js` (including `qunit/focusShim.js`) requires rebuilding the test bundle (`npx webpack --config-name test`) before running Karma, or running webpack in watch mode. The Node bundle tests (`qunit/tests_node.js`) do NOT use this bundle — run them with `npm run test:node` (after a build, they load `dist/`).

---

## Workflows

### 1. Running Tests (Recommended Pattern)

Always use this exact pattern for reliable, non-hanging test runs:

```bash
# 1. Rebuild test bundle (if source changed)
npx webpack --config-name test

# 2. Run karma with ChromeHeadless, output to file
npx karma start karma.conf.js --browsers ChromeHeadless --single-run --reporters progress > $env:TEMP\karma_results.log 2>&1

# 3. Read results (separate step)
Select-String -Path $env:TEMP\karma_results.log -Pattern "TOTAL|FAILED" | Select-Object -Last 5
```

### 2. Running a Single Test Suite or Selected Test Suites

To isolate specific test files (e.g., only `qunit/tests_numeric.js` or `qunit/tests_date.js`):

1. Edit `qunit/index.js` to import and register only the desired test module(s):
   ```javascript
   import testsNumeric from "./tests_numeric";
   import testsDate from "./tests_date";

   // ...
   if (qunit) {
     testsNumeric(qunit, Inputmask);
     testsDate(qunit, Inputmask);
   }
   ```

   Note: do NOT add `qunit.load()` — `karma-qunit` sets `autostart: false` and starts the run itself.

2. Rebuild the test bundle:
   ```bash
   npx webpack --config-name test
   ```

3. Run Karma:
   ```bash
   npx karma start karma.conf.js --browsers ChromeHeadless --single-run --reporters progress > $env:TEMP\karma_results.log 2>&1
   ```

4. Check results:
   ```powershell
   Select-String -Path $env:TEMP\karma_results.log -Pattern "TOTAL" | ForEach-Object { $_.Line }
   ```

### 3. Fast Interactive & Live Debugging

To keep the browser open and re-run tests instantly on changes:

1. In one terminal, run the webpack test bundle watcher:
   ```bash
   npm run qunit
   ```

2. In another terminal, run Karma in watch mode:
   ```bash
   npx karma start --browsers Chrome --no-single-run --auto-watch
   ```

3. In the opened Chrome window, click the **DEBUG** button in the top right to open the standalone test page, then press **F12** to open Chrome DevTools for breakpoints and console logs.

### 4. Alternative: Direct Browser HTML Runner (No Karma)

You can run and debug QUnit tests directly in any browser without Karma:
1. Rebuild the test bundle: `npx webpack --config-name test` (or keep `npm run qunit` running).
2. Open `qunit/qunit.html` in your browser.
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

### 7. Node + jsdom and DOM-less Bundle Lanes

Two extra QUnit lanes run without a real browser:

- **Node + jsdom** (same browser suite, jsdom instead of Chrome):
  ```bash
  npm run test:jsdom   # karma start karma.conf.js --browsers jsdom --single-run
  ```
  Uses the same `qunit/qunit.js` bundle, so rebuild it after source changes.

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
| Build test bundle once | `npx webpack --config-name test` |
| Watch test bundle | `npm run qunit` |
| Run browser tests (headless) | `npm run test:chrome` *(= `karma start karma.conf.js --browsers ChromeHeadless --single-run`; redirect to a file if piping)* |
| Run Node + jsdom tests | `npm run test:jsdom` |
| Run DOM-less bundle tests (build first) | `npm run test:node` |
| Run all lanes (build first) | `npm run test:all` *(node → chrome → jsdom → browserstack)* |
| Run the BrowserStack matrix | `npm run test:browserstack` *(`cross-env CI=true karma start karma.conf.js --single-run`; real desktop + mobile devices, needs `BROWSERSTACK_USERNAME`/`BROWSERSTACK_ACCESS_KEY`)* |
| Run tests with live auto-watch (GUI Chrome) | `npx karma start --browsers Chrome --no-single-run --auto-watch` |
| Full validation pipeline | `npm test` *(runs `grunt validate`: webpack → copy → types → qunitnode → eslint → karma:unit → karma:jsdom)* |

---

## Known Pre-existing Failures

None currently. Browser (`ChromeHeadless`), Node + jsdom, and the BrowserStack desktop + real mobile (Android/iOS) lanes all report **927/927**.

- `QUnit.config.testTimeout` (10s) turns a stalled async test into one failure instead of a browser
  disconnect. Real-mobile `document.hasFocus() === false` (which suppressed `focus`/`blur`) is handled
  by `qunit/focusShim.js` — see section 6.
- The previously tracked **negationSymbol parentheses + clearIncomplete** numeric failure (`numeric + negationSymbol=parentheses + clearIncomplete=true + type -123. then blur`, expected `"(123.000)"`) now passes.

> For history: `Currency digits and delete #1351`, `highlighting values with negative numbers #2714`, and `currency type 1234.56 + backspace x4` were fixed via the `revalidateMask` replay fix in `lib/validation.js` and a fractional-delete realignment branch in the numeric `onBeforeWrite` keydown handler (`lib/extensions/numeric.js`, the `caret.end > radixNdx` `else` branch).
