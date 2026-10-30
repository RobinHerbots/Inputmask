# Inputmask

## What this is

JavaScript input-mask library. Source in `lib/` (plain JS, ES modules). TypeScript declarations are **generated** from JS via `tsc --emitDeclarationOnly` — never hand-edit `dist/types/`.

## Key commands

| Task | Command |
|------|---------|
| Build the bundles | `npm run build` |
| Rebuild on change | `npm run build:watch` |
| Generate the type declarations | `npm run types` |
| Lint only | `npm run lint` |
| Full validate (build + types + node + lint + jsdom) | `npm test` |
| Browser (Karma) | `npm run test:chrome` |
| Node + jsdom (Karma) | `npm run test:jsdom` |
| Node, DOM-less bundles | `npm run test:node` |
| Build the framework packages | `npm run build:packages` |
| Test the framework packages | `npm run test:packages` |
| BrowserStack matrix | `npm run test:browserstack` |

**Command order matters:** `npm test` runs build → types → node → lint → jsdom. Running the steps out of order fails (the tests need the built `dist/` bundles, the lint and the type generation need the sources).

`Gruntfile.js` is kept for the release chores (version bump, NuGet packaging, publishing) and as a wrapper around the same chain. `npx grunt validate` additionally copies `Changelog.md` to `inputmask-pages/src/assets/Changelog.md`, so that file is a generated copy: edit the root changelog and run the copy, never the mirror.

## Architecture

- **Entry point:** `lib/index.js` — public entry; re-exports the headless class and attaches the DOM driver (`lib/dom/attach.js`). Deep import `lib/core/inputmask.js` for the DOM-free class only
- **Headless class:** `lib/core/inputmask.js` — constructor, aliases/definitions, validation/format statics and the headless session API; part of `lib/core/`, so it never imports `lib/dom/`
- **Headless core:** `lib/core/` — mask lexer, validation, positioning, key processing, input handling, plus the safe `window` shim (`window.js`); no direct DOM dependencies
- **DOM driver:** `lib/dom/` — browser event handlers (`eventhandlers.js`), event binding (`eventruler.js`), element patching (`mask.js`), environment sniffing (`environment.js`), and `attach.js` which adds the element-bound instance methods (`mask`, `remove`) and statics (`remove`, `setValue`) to the class
- **Bundle entry points:** `bundle.js` (vanilla), `bundle.jquery.js` (jQuery), `bundle.colormask.js`
- **Dependency abstraction:** `lib/dependencyLibs/` — `inputmask.dependencyLib.js` is the vanilla DOM implementation and `inputmask.dependencyLib.jquery.js` the jQuery one; `bundle.jquery.js` imports the jQuery variant and assigns it to `Inputmask.dependencyLib`
- **Extensions:** `lib/extensions/` — each exports a `register*()` function, called in `bundle.js`
- **Tests:** `qunit/` — QUnit test files, bundled by rollup into `qunit/qunit*.js` (one per bundle lane); `qunit/harness.js` registers the shared suite
- **Output formats:** ESM (`dist/esm/*.mjs`), UMD (`dist/inputmask.js`), minified UMD (`dist/inputmask.min.js`)
- **Framework packages:** `packages/*` — React, Vue, Svelte and jQuery wrappers built with rollup (shared config in `packages/rollup.config.shared.mjs`) and declarations emitted by `tsc` into `dist/types`; Angular uses `ng-packagr`. Build the core (`npm run build && npm run types`) before `npm run build:packages`. `@inputmask/jquery` also emits standalone UMD bundles (`dist/jquery.inputmask.umd.js`, `dist/jquery.inputmask.min.js`), and its CJS build bundles the core and the extensions because the core exports the extensions through an `import` condition only, so a CJS build that keeps them external cannot be `require`d

## The build

- `build.js` runs `rewrite-imports.js` and then every config of `rollup.config.cjs`.
- `rewrite-imports.js` generates the extension entry files in `lib/.rollup/` (gitignored) from `lib/extensions/*.js`: the core imports are rewritten to the sibling ESM bundle, so the extension bundles stay small and do not duplicate the core.
- **Side effects are declared in `rollup.config.cjs`** (`buildSideEffects`), not in the `sideEffects` field of `package.json`. That field describes the published package for consumers, the config describes the build. Every `resolve()` runs with `ignoreSideEffectsForRoot`, so node-resolve does not apply the `sideEffects` field of the root package in parallel: a resolver supplied `moduleSideEffects` wins over `treeshake.moduleSideEffects` and silently drops side-effect-only imports.
- A module only has to be listed when it is imported for its side effects alone. `moduleSideEffects: false` does not remove statements from a module that is included, it only allows dropping the module itself.
- The UMD bundles register the `<input-mask>` custom element (`lib/components/inputmaskElement.js`); the ESM main bundle does not. `lib/index.js` does not import the element, so `dist/esm/inputmask.mjs` stays free of it and the element is opt-in through `dist/esm/inputmaskElement.mjs`.
- `npm run build:watch` watches the sources and rebuilds on change. It re-runs `rewrite-imports.js` before every rebuild, because the extension bundles are built from the generated `lib/.rollup/` copies: an edit to `lib/extensions/*.js` only reaches rollup once the copies are regenerated (the rewrite skips the copies whose content did not change). The previous build's `cache` is passed back to rollup, so only the changed modules are re-transformed. `dist/`, `lib/.rollup/` and `qunit/qunit*.js` are excluded from the watch, otherwise the build would trigger itself. A change to `rollup.config.cjs` needs a restart, since the config is required once.

## Testing

QUnit is the only test framework. The browser suite runs once per built bundle:

| Lane | Command | Notes |
|------|---------|-------|
| Browser, UMD native | `npm run test:umd` | `dist/inputmask.js`, no jQuery on the page |
| Browser, UMD jQuery | `npm run test:jquery` | `dist/jquery.inputmask.js`, loads global jQuery first |
| Browser, ESM | `npm run test:esm` | `dist/esm/inputmask.mjs` + extension bundles, no jQuery |
| All browser bundles | `npm run test:bundles` | Runs the three lanes sequentially |
| Node + jsdom (Karma) | `npm run test:jsdom` | Same suite via the `jsdom` launcher, UMD native bundle |
| All jsdom bundles | `npm run test:jsdom:bundles` | jsdom equivalent of `test:bundles` |
| Node, DOM-less bundles | `npm run test:node` | Runs `qunit/tests_node.js` against `dist/` (build first) |
| BrowserStack matrix | `npm run test:browserstack` | Real desktop + mobile devices (`cross-env CI=true karma start karma.conf.js --single-run`); needs `BROWSERSTACK_USERNAME`/`BROWSERSTACK_ACCESS_KEY` in the environment |

- `karma.conf.js` selects the test bundle with `INPUTMASK_BUNDLE=umd|jquery|esm` (default `umd`). The jQuery lane is the only one that adds `node_modules/jquery/dist/jquery.js` and `dist/jquery.inputmask.js` (as a global script) to the page; the native and ESM lanes run without jQuery.
- Expected results: UMD native **937 passed + 1 skipped of 938**, UMD jQuery **938 passed + 1 skipped of 939**, ESM **937 passed + 1 skipped of 938**. The native/ESM skip is the jQuery-plugin insertMode test (the `tests_jquery_inputmask.js` module is not registered there); the jQuery skip is the native dependencyLib `extend` guard test.
- `qunit/harness.js` registers the shared suite against whatever `Inputmask` the entry passes in. The entries are `qunit/index.js` (UMD native), `qunit/index.jquery.js` (UMD jQuery) and `qunit/index.esm.js` (ESM core + `dist/esm/extensions/*.mjs` + `dist/esm/dom/FormData.mjs`, because the ESM entry does not register extensions itself).
- The ESM build intentionally does not emit the jQuery plugin or binding (`rollup.config.cjs` has those outputs disabled): ESM consumers use the native dependencyLib, so there is no ESM jQuery lane.
- `npm test` is unchanged: build, types, node lane, lint, and the UMD-native jsdom lane. `npm run test:bundles` is the opt-in full browser matrix.
- `QUnit.config.testTimeout` is set to 10s (`client.qunit.testTimeout` in `karma.conf.js`) so a stalled async test fails instead of tripping Karma's 30s `browserNoActivityTimeout` and disconnecting the whole browser.
- Real mobile BrowserStack (`bs_chrome_pixel*`, `bs_*_iPhone*`) runs with `document.hasFocus() === false`, so the browser never dispatches `focus`/`blur` even though `element.focus()` sets `document.activeElement`. `qunit/focusShim.js` (installed by the harness) replays the withheld event so the focus/blur-driven paths (`showMaskOnFocus`, `clearMaskOnLostFocus`, `clearIncomplete`, `onincomplete`) run as on a focused page; all real desktop + mobile devices pass the default UMD-native lane (937 executed + 1 jQuery-only skip). It is a no-op when the browser fires the real event.
- The browser/jsdom suite is built by rollup into `qunit/qunit.js`, `qunit/qunit.jquery.js` and `qunit/qunit.esm.js`, so the build has to run first.
- `qunit/tests_node.js` loads `dist/` through Node's CommonJS `require` and a dynamic `import` and must not be imported by the harness: the assertions rely on the Node semantics.
- Only the jQuery-plugin tests (`qunit/tests_jquery_inputmask.js` and the jQuery insertMode test) need jQuery; the other test modules use `Inputmask.dependencyLib`, so they exercise the backend of whichever bundle is under test.
- To run a focused test: edit `qunit/harness.js` to register only the test module you need, rebuild the bundles, then run Karma.

## Numeric input gotchas

- `numericInput` is auto-set to `true` in the numeric alias when the user doesn't provide it (`genMask` in `lib/extensions/numeric.js`). It flips `isRTL` to `true` (`inputmask.js`: `get isRTL() { return this.opts.numericInput || this.opts.isRTL; }`).
- When `isRTL`/`numericInput` is active, buffers and caret positions are **reversed** relative to what the user sees: the mask is reversed in the mask-lexer, `getBuffer()` returns mask-order (reversed from display), `handleRemove` swaps Backspace↔Delete and swaps `pos.begin`/`pos.end`, and `refreshFromBuffer` reverses via `bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer`.
- Always read buffers with the display orientation in mind (e.g. internal `00,65` displays as `56,00`).
- `inputEventOnly: true` does not bind keydown; the input event fires `inputFallBackEvent`, which maps `deleteContentBackward` to a synthetic Backspace `keyEvent`.
- In the numeric `onBeforeWrite` keydown branch, a normal backspace triggers `refreshFromBuffer` via the `checkAlignment` path (digit realignment), not via the `buffer: []` negation-symbol branch — the negation branch can stay cold.

## Code style

- Prettier: double quotes, no trailing commas, 2-space indent
- ESLint: flat config (`eslint.config.mjs`), ESM native flat config based on `@eslint/js` + `eslint-plugin-import-x` + `eslint-plugin-n` + `eslint-plugin-prettier` (rules ported inline from the legacy `eslint-config-standard`)
- Semicolons required (with omitLastInOneLineBlock)
- `import-x/order` enforced: newlines between import groups, alphabetical
- Source files live in `lib/`, never hand-edit `dist/`: it is generated by rollup and committed, so regenerate it (`npm run build`) and commit the result
