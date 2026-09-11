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
| Lint only | `npx eslint lib/*.js` |

**Command order matters for `validate`:** webpack → copy → types → eslint → karma. Running steps out of order will fail (tests need the built bundle, lint needs the source).

## Architecture

- **Entry point:** `lib/inputmask.js` — the core Inputmask class
- **Bundle entry points:** `bundle.js` (vanilla), `bundle.jquery.js` (jQuery), `bundle.colormask.js`
- **Dependency abstraction:** `lib/dependencyLibs/` — swaps between vanilla DOM and jQuery via webpack alias
- **Extensions:** `lib/extensions/` — each exports a `register*()` function, called in `bundle.js`
- **Tests:** `qunit/` — QUnit test files, bundled via webpack into `qunit/qunit.js`
- **Output formats:** ESM (`dist/esm/*.mjs`), UMD (`dist/inputmask.js`), minified UMD (`dist/inputmask.min.js`)

## Testing

- Framework: QUnit via Karma
- Locally: Chrome (added automatically when `CI` env is not set)
- CI: BrowserStack (requires `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` env vars)
- Test bundle is built by webpack (`npm run qunit` or as part of `grunt validate`)
- Tests import from `../bundle` (the vanilla bundle entry), not from `dist/`
- To run a focused test: edit `qunit/index.js` to import only the test module you need, then run `npm test`

## Numeric input gotchas

- `numericInput` is auto-set to `true` in the numeric alias when the user doesn't provide it (`genMask` in `lib/extensions/numeric.js`). It flips `isRTL` to `true` (`inputmask.js`: `get isRTL() { return this.opts.isRTL || this.opts.numericInput; }`).
- When `isRTL`/`numericInput` is active, buffers and caret positions are **reversed** relative to what the user sees: the mask is reversed in the mask-lexer, `getBuffer()` returns mask-order (reversed from display), `handleRemove` swaps Backspace↔Delete and swaps `pos.begin`/`pos.end`, and `refreshFromBuffer` reverses via `bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer`.
- Always read buffers with the display orientation in mind (e.g. internal `00,65` displays as `56,00`).
- `inputEventOnly: true` does not bind keydown; the input event fires `inputFallBackEvent`, which maps `deleteContentBackward` to a synthetic Backspace `keyEvent`.
- In the numeric `onBeforeWrite` keydown branch, a normal backspace triggers `refreshFromBuffer` via the `checkAlignment` path (digit realignment), not via the `buffer: []` negation-symbol branch — the negation branch can stay cold.

## Code style

- Prettier: double quotes, no trailing commas, 2-space indent
- ESLint: flat config (`eslint.config.js`), extends `standard` + `prettier`
- Semicolons required (with omitLastInOneLineBlock)
- `import-x/order` enforced: newlines between import groups, alphabetical
- Source files live in `lib/`, never edit `dist/` or `build/`
