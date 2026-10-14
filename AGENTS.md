# Inputmask

## What this is

JavaScript input-mask library. Source in `lib/` (plain JS, ES modules). TypeScript declarations are **generated** from JS via `tsc --emitDeclarationOnly` — never hand-edit `dist/types/`.

## Key commands

| Task | Command |
|------|---------|
| Full validate (build + lint + types + test) | `npm test` (runs `grunt validate`) |
| Build (clean + webpack + copy + types) | `npx grunt build` |
| Watch (vanilla bundle) | `npm start` |
| Watch (jQuery bundle) | `npm run jquery` |
| Watch (test bundle) | `npm run qunit` |
| Generate types only | `npm run types` |
| Lint only | `npx eslint "lib/**/*.js"` |

**Command order matters for `validate`:** webpack → copy → types → qunitnode → eslint → karma:unit → karma:jsdom. Running steps out of order will fail (the tests need the built `dist/`/test bundle, lint needs the source).

## Architecture

- **Entry point:** `lib/inputmask.js` — the core Inputmask class
- **Bundle entry points:** `bundle.js` (vanilla), `bundle.jquery.js` (jQuery), `bundle.colormask.js`
- **Dependency abstraction:** `lib/dependencyLibs/` — swaps between vanilla DOM and jQuery via webpack alias
- **Extensions:** `lib/extensions/` — each exports a `register*()` function, called in `bundle.js`
- **Tests:** `qunit/` — QUnit test files, bundled via webpack into `qunit/qunit.js`
- **Output formats:** ESM (`dist/esm/*.mjs`), UMD (`dist/inputmask.js`), minified UMD (`dist/inputmask.min.js`)

## Testing

QUnit is the only test framework; it runs in three lanes:

| Lane | Command | Notes |
|------|---------|-------|
| All lanes | `npm run test:all` | Node → Chrome → jsdom → BrowserStack; build first (`grunt webpack`) |
| BrowserStack matrix | `npm run test:browserstack` | Real desktop + mobile devices (`cross-env CI=true karma start karma.conf.js --single-run`); needs `BROWSERSTACK_USERNAME`/`BROWSERSTACK_ACCESS_KEY` in the environment |
| Browser (Karma) | `npm run test:chrome` | Local `ChromeHeadless` |
| Node + jsdom (Karma) | `npm run test:jsdom` | Same bundle/config via the `jsdom` launcher |
| Node, DOM-less bundles | `npm run test:node` | Runs `qunit/tests_node.js` against `dist/` (build first) |

- `grunt validate` covers all three (`qunitnode` → `karma:unit` → `karma:jsdom`).
- `QUnit.config.testTimeout` is set to 10s (`client.qunit.testTimeout` in `karma.conf.js`) so a stalled async test fails instead of tripping Karma's 30s `browserNoActivityTimeout` and disconnecting the whole browser.
- Real mobile BrowserStack (`bs_chrome_pixel*`, `bs_*_iPhone*`) runs with `document.hasFocus() === false`, so the browser never dispatches `focus`/`blur` even though `element.focus()` sets `document.activeElement`. `qunit/focusShim.js` (installed first thing in `qunit/index.js`) replays the withheld event so the focus/blur-driven paths (`showMaskOnFocus`, `clearMaskOnLostFocus`, `clearIncomplete`, `onincomplete`) run as on a focused page; all real desktop + mobile devices pass 927/927. It is a no-op when the browser fires the real event.
- The browser/jsdom suite is built by webpack into `qunit/qunit.js` (`npm run qunit` watches it); tests import from `../bundle`, not `dist/`.
- `qunit/tests_node.js` is the only module that loads `dist/` directly (Node `require` + dynamic `import`), and must not be imported by `qunit/index.js`.
- To run a focused test: edit `qunit/index.js` to import only the test module you need, rebuild the bundle, then run Karma.

## Numeric input gotchas

- `numericInput` is auto-set to `true` in the numeric alias when the user doesn't provide it (`genMask` in `lib/extensions/numeric.js`). It flips `isRTL` to `true` (`inputmask.js`: `get isRTL() { return this.opts.isRTL || this.opts.numericInput; }`).
- When `isRTL`/`numericInput` is active, buffers and caret positions are **reversed** relative to what the user sees: the mask is reversed in the mask-lexer, `getBuffer()` returns mask-order (reversed from display), `handleRemove` swaps Backspace↔Delete and swaps `pos.begin`/`pos.end`, and `refreshFromBuffer` reverses via `bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer`.
- Always read buffers with the display orientation in mind (e.g. internal `00,65` displays as `56,00`).
- `inputEventOnly: true` does not bind keydown; the input event fires `inputFallBackEvent`, which maps `deleteContentBackward` to a synthetic Backspace `keyEvent`.
- In the numeric `onBeforeWrite` keydown branch, a normal backspace triggers `refreshFromBuffer` via the `checkAlignment` path (digit realignment), not via the `buffer: []` negation-symbol branch — the negation branch can stay cold.

## Code style

- Prettier: double quotes, no trailing commas, 2-space indent
- ESLint: flat config (`eslint.config.mjs`), ESM native flat config based on `@eslint/js` + `eslint-plugin-import-x` + `eslint-plugin-n` + `eslint-plugin-prettier` (rules ported inline from the legacy `eslint-config-standard`)
- Semicolons required (with omitLastInOneLineBlock)
- `import-x/order` enforced: newlines between import groups, alphabetical
- Source files live in `lib/`, never edit `dist/` or `build/`
