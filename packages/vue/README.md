# @inputmask/vue

Vue 3 directive and plugin for [Inputmask](https://github.com/RobinHerbots/Inputmask).

## Install

```bash
npm install @inputmask/vue "inputmask@^5.1.0-beta.37"
```

`vue` (3.3 or newer) and `inputmask` (5.1.0-beta.37 or newer) are peer
dependencies.

## Usage

Register the directive locally:

```vue
<script setup>
import { vInputmask } from "@inputmask/vue";
</script>

<template>
  <!-- Phone -->
  <input v-inputmask="'+99 999 99 99'" />
  <!-- Phone with extra options -->
  <input v-inputmask="{ mask: '+99 999 99 99', clearIncomplete: true }" />
  <!-- Email (register the email extension first) -->
  <input v-inputmask="{ alias: 'email' }" v-model="email" />
</template>
```

Or install the plugin once:

```ts
import { createApp } from "vue";
import { InputmaskPlugin } from "@inputmask/vue";
import App from "./App.vue";

createApp(App).use(InputmaskPlugin).mount("#app");
```

The directive accepts a mask string, a mask array or a full options object. The
binding is reactive: changing it remasks the input while preserving the raw
value.

Because Inputmask dispatches native `input` events, `v-model` works without any
extra wiring.

## Extensions

The core entry does not register optional aliases. Register the extensions you
use once, before mounting the app:

```ts
import { registerDatetime } from "inputmask/extensions/date";
import { registerNumeric } from "inputmask/extensions/numeric";

registerDatetime();
registerNumeric();
```

## Build and test

```bash
npm run build --workspace=@inputmask/vue
npm run test --workspace=@inputmask/vue
```

The core package must be built first (`npm run build && npm run types` at the
repository root).
