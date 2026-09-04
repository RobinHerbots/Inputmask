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

## Code style

- Prettier: double quotes, no trailing commas, 2-space indent
- ESLint: flat config (`eslint.config.js`), extends `standard` + `prettier`
- Semicolons required (with omitLastInOneLineBlock)
- `import-x/order` enforced: newlines between import groups, alphabetical
- Source files live in `lib/`, never edit `dist/` or `build/`
