# @inputmask/svelte

Svelte action for [Inputmask](https://github.com/RobinHerbots/Inputmask).

## Install

```bash
npm install @inputmask/svelte "inputmask@^5.1.0-beta.37"
```

`svelte` (4 or newer, including Svelte 5) and `inputmask` (5.1.0-beta.37 or
newer) are peer dependencies.

## Usage

```svelte
<script>
  import { inputmask } from "@inputmask/svelte";

  let phone = "";
</script>

<!-- Phone -->
<input use:inputmask={"+99 999 99 99"} bind:value={phone} />
<!-- Phone with extra options -->
<input use:inputmask={{ mask: "+99 999 99 99", clearIncomplete: true }} />
<!-- Email (register the email extension first) -->
<input use:inputmask={{ alias: "email" }} />
```

The action accepts a mask string, a mask array or a full options object. Updating
the parameter remasks the input while preserving the raw value, and the mask is
removed automatically when the element is destroyed.

## Extensions

The core entry does not register optional aliases. Register the extensions you
use once, before the component mounts:

```ts
import { registerDatetime } from "inputmask/extensions/date";
import { registerNumeric } from "inputmask/extensions/numeric";

registerDatetime();
registerNumeric();
```

## Build and test

```bash
npm run build --workspace=@inputmask/svelte
npm run test --workspace=@inputmask/svelte
```

The core package must be built first (`npm run build && npm run types` at the
repository root).
