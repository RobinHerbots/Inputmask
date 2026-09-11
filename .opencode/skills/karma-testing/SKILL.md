---
name: karma-testing
description: Use when running, selecting, or debugging unit tests with Karma and QUnit in the Inputmask repository. Front-load when investigating bugs, running single or multiple select test suites, or configuring local Chrome and BrowserStack targets.
---

# Karma & QUnit Testing in Inputmask

This skill guides testing workflows in the Inputmask repository using Karma and QUnit.

## Critical Rules & Pitfalls

1. **ALWAYS Use `ChromeHeadless` for Automated Runs:**
   `karma.conf.js` adds a **GUI Chrome** launcher when `CI` is not set. Running `npx karma start` or `grunt karma` via a CLI tool (Bash, PowerShell, etc.) without `--browsers ChromeHeadless` opens a visible Chrome window that **never exits cleanly**, causing the command to hang indefinitely.

2. **ALWAYS Redirect Output to a File — Do Not Pipe Inline:**
   Karma emits progress lines with ANSI escape codes that cause PowerShell `Select-String` and similar pipe commands to buffer indefinitely. Redirect stdout/stderr to a temp file, then read the file separately:
   ```bash
   npx karma start karma.conf.js --browsers ChromeHeadless --single-run --reporters progress > $env:TEMP\karma_results.log 2>&1
   ```
   Then read the file with the `Read` or `Select-String` tool in a separate step.

3. **ALWAYS Rebuild the Test Bundle After Any Changes:**
   Tests run from `qunit/qunit.js`, which is compiled by webpack from `qunit/index.js` and `lib/`. Any edit in `lib/`, `qunit/tests_*.js`, or `qunit/index.js` requires rebuilding the test bundle (`npx webpack --config-name test`) before running Karma, or running webpack in watch mode.

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

     qunit.load();
   }
   ```

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

Use BrowserStack ONLY when reproducing or verifying browser-specific or OS-specific issues (e.g., Safari/iOS or Android mobile events):
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

---

## Quick Reference Commands

| Task | Command |
| :--- | :--- |
| Build test bundle once | `npx webpack --config-name test` |
| Watch test bundle | `npm run qunit` |
| Run all tests (headless, non-hanging) | `npx karma start karma.conf.js --browsers ChromeHeadless --single-run --reporters progress > $env:TEMP\karma_results.log 2>&1` |
| Run tests with live auto-watch | `npx karma start --browsers Chrome --no-single-run --auto-watch` |
| Full validation pipeline | `npm test` *(runs `grunt validate`)* |

---

## Known Pre-existing Failures

The following numeric test is known to fail in the current HEAD (a WIP refactor regression — it passes at `9dfeac29f`, "fix clearing value leaves sticky minus or lone radix on currency/numeric #2890"). It is NOT something to chase while working on unrelated numeric issues unless asked:

- **negationSymbol parentheses + clearIncomplete** — `numeric + (negationSymbol = parentheses) + (clearIncomplete = true) + type -123. then blur`: expected `"(123.000)"`, actual `"(123,000)"` (radix renders as group separator after `.val()` + blur).

> Note: `Currency digits and delete #1351`, `highlighting values with negative numbers #2714`, and `currency type 1234.56 + backspace x4` were previously on this list but are now FIXED on HEAD via the `revalidateMask` replay fix in `lib/validation.js` and a fractional-delete realignment branch in the numeric `onBeforeWrite` keydown handler (`lib/extensions/numeric.js`, the `caret.end > radixNdx` `else` branch): it guards on `e.key === Delete && numericInput && _radixDance && buffer[caret.begin-1]` is a digit, then splices the reversed buffer, `alignDigits` re-pads to `opts.digits`, and returns `refreshFromBuffer` + corrected internal-order buffer so `writeBuffer` fully re-validates validPositions (orphaned radix gets rebuilt).
