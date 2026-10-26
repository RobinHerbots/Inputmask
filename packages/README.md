# Framework packages

First-party wrappers around [Inputmask](../README.md), published as separate
packages. All of them share the same framework-agnostic controller from the core
package (`createInputmaskAdapter`), so option updates, remasking, cleanup and the
change payload behave identically everywhere. All packages require `inputmask`
5.1.0-beta.37 or newer, the first release that exports the controller.

| Package | Adapter | Notes |
| --- | --- | --- |
| [`@inputmask/react`](./react) | `<Inputmask />` component | Ref/imperative access via `maskRef` |
| [`@inputmask/vue`](./vue) | `v-inputmask` directive, plugin | Works with `v-model` |
| [`@inputmask/svelte`](./svelte) | `use:inputmask` action | Reactive params |
| [`@inputmask/angular`](./angular) | `[inputmask]` directive | `ControlValueAccessor` / `ngModel` |
| [`@inputmask/jquery`](./jquery) | `$.fn.inputmask` plugin | Classic jQuery plugin, registers extensions |

## Extensions

The wrappers import the core `inputmask` entry. Optional aliases such as
`datetime`, `numeric`, `email`, `url`, `ip`, `mac`, `vin`, `ssn`, `cssunit` and
the custom `definitions` are **not** registered by that entry. Register the ones
you use once, before mounting a masked input:

```js
import { registerDatetime } from "inputmask/extensions/date";
import { registerNumeric } from "inputmask/extensions/numeric";

registerDatetime();
registerNumeric();
```

Without this, an `alias` that depends on an unregistered extension will not
resolve.

## Development

The packages are npm workspaces. The core package is linked into the workspaces
through `"inputmask": "file:../.."`, so always build the core first:

```bash
npm install
npm run build          # core ESM/UMD bundles
npm run types          # core declarations
npm run build:packages # react, vue, svelte and angular
npm run test:packages  # react, vue and svelte unit tests
```

The Angular package is built with `ng-packagr` and currently has no unit test
lane; it is validated through its library build.
