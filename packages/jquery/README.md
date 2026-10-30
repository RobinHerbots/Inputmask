# @inputmask/jquery

jQuery plugin for [Inputmask](https://github.com/RobinHerbots/Inputmask).

## Install

```bash
npm install @inputmask/jquery "inputmask@^5.1.0-beta.37" jquery
```

`jquery` (3.7 or newer) and `inputmask` (5.1.0-beta.37 or newer) are peer
dependencies.

## Usage

```ts
import $ from "jquery";
import "@inputmask/jquery";

$(document).ready(function () {
  // Phone
  $("#phone").inputmask("+99 999 99 99");

  // Phone with extra options
  $("#phone").inputmask({ mask: "+99 999 99 99", clearIncomplete: true });

  // Email (the package registers all extensions, so the alias is available)
  $("#email").inputmask({ alias: "email" });
});
```

The plugin attaches to `$.fn.inputmask` and accepts a mask string, a mask array
or a full options object.

## API

All the classic jQuery plugin methods are available:

```js
// Initialize
$(selector).inputmask("99-9999999");
$(selector).inputmask({ mask: "(999) 999-9999" });

// Get unmasked value
$(selector).inputmask("unmaskedvalue");

// Remove mask
$(selector).inputmask("remove");

// Get empty mask placeholder
$(selector).inputmask("getemptymask");

// Check if value is complete
$(selector).inputmask("isComplete");

// Set value programmatically
$(selector).inputmask("setvalue", "12345678");

// Get metadata
$(selector).inputmask("getmetadata");
```

## Extensions

Unlike the core `inputmask` entry, this package registers every extension it
ships with (`definitions`, `cssunit`, `url`, `ip`, `email`, `mac`, `vin`, `ssn`,
`datetime`, `numeric`), so the aliases work without extra setup.

If you also import the core directly, register the extensions on the instance
you use there:

```ts
import { registerDatetime } from "inputmask/extensions/date";
import { registerNumeric } from "inputmask/extensions/numeric";
import { registerEmail } from "inputmask/extensions/email";

registerDatetime();
registerNumeric();
registerEmail();
```

## Build and test

```bash
npm run build --workspace=@inputmask/jquery
npm run test --workspace=@inputmask/jquery
```

The core package must be built first (`npm run build && npm run types` at the
repository root).

## Browser (UMD)

`dist/jquery.inputmask.umd.js` (unminified) and
`dist/jquery.inputmask.min.js` (minified) are standalone browser bundles: load
jQuery first and the plugin registers `$.fn.inputmask` and exposes the
`Inputmask` class as `window.InputmaskJQuery`.
