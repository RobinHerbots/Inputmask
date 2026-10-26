# @inputmask/react

React component for [Inputmask](https://github.com/RobinHerbots/Inputmask).

## Install

```bash
npm install @inputmask/react "inputmask@^5.1.0-beta.37"
```

`react` and `react-dom` (18 or newer) and `inputmask` (5.1.0-beta.37 or newer)
are peer dependencies.

## Usage

```tsx
import { Inputmask } from "@inputmask/react";

export function MaskedInputs() {
  return (
    <>
      {/* Phone */}
      <Inputmask mask="+99 999 99 99" />
      {/* Email (register the email extension first) */}
      <Inputmask alias="email" />
      {/* Full options object */}
      <Inputmask
        options={{ mask: "9999-9999", clearIncomplete: true }}
        onChange={(event, payload) => console.log(payload.unmaskedValue)}
      />
    </>
  );
}
```

### Imperative access via `maskRef`

```tsx
import { Inputmask, type Adapter } from "@inputmask/react";
import { useRef } from "react";

export function MaskedInputWithRef() {
  const maskRef = useRef<Adapter | null>(null);

  const setValue = () => {
    maskRef.current?.setValue("123456");
  };

  const getValue = () => {
    console.log(maskRef.current?.getValue());
  };

  return (
    <>
      <Inputmask mask="999-999" maskRef={maskRef} />
      <button type="button" onClick={setValue}>Set value</button>
      <button type="button" onClick={getValue}>Log value</button>
    </>
  );
}
```

The `Adapter` provides:
- `setValue(value: string)` — programmatically set the value
- `getValue(): string` — get the current unmasked value
- `update(options: InputmaskOptions)` — update mask options
- `destroy()` — tear down the mask
- `on(callback) => () => void` — subscribe to changes
- `getInstance(): Inputmask` — raw Inputmask instance

## Props

| Prop | Description |
| --- | --- |
| `mask` | Mask shorthand, merged into `options` |
| `alias` | Alias shorthand, merged into `options` |
| `options` | Full Inputmask options object |
| `value` | Controlled model value (follows `input.value`, so it is unmasked when `autoUnmask` is enabled) |
| `defaultValue` | Initial value of the uncontrolled input |
| `onChange` | `(event, payload) => void`, called on every value change |
| `inputRef` | Ref to the underlying `<input>` |
| `maskRef` | Ref to the controller (`mount`, `update`, `setValue`, `getInstance`, ...) |

Other `<input>` props are forwarded.

`payload` contains `value`, `maskedValue`, `unmaskedValue`, `isComplete` and the
native `event`.

## Notes

- The input is uncontrolled from React's point of view. The `value` prop is
  synchronised through the Inputmask API so masking and caret handling stay in
  control.
- Callback options (`oncomplete`, `onBeforeMask`, ...) always call the latest
  render's function without causing a remask.

## Extensions

The core entry does not register optional aliases. Register the extensions you
use once, before rendering:

```ts
import { registerDatetime } from "inputmask/extensions/date";
import { registerNumeric } from "inputmask/extensions/numeric";

registerDatetime();
registerNumeric();
```

## Build and test

```bash
npm run build --workspace=@inputmask/react
npm run test --workspace=@inputmask/react
```

The core package must be built first (`npm run build && npm run types` at the
repository root).
