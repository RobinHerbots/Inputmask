# @inputmask/angular

Angular directive for [Inputmask](https://github.com/RobinHerbots/Inputmask) with
`ControlValueAccessor` support, so it works with `ngModel` and reactive forms.

## Install

```bash
npm install @inputmask/angular "inputmask@^5.1.0-beta.37"
```

`@angular/core` and `@angular/forms` (18 or newer) and `inputmask`
(5.1.0-beta.37 or newer) are peer dependencies.

## Usage

The directive is standalone and supports both template-driven and reactive
forms.

### Template-driven forms

```ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputmaskDirective } from "@inputmask/angular";

@Component({
  standalone: true,
  imports: [FormsModule, InputmaskDirective],
  template: `
    <input inputmask="+99 999 99 99" [(ngModel)]="phone" />
  `
})
export class PhoneComponent {
  phone = "";
}
```

### Reactive forms

```ts
import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { InputmaskDirective } from "@inputmask/angular";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputmaskDirective],
  template: `
    <input inputmask="+99 999 99 99" [formControl]="phone" />
  `
})
export class PhoneComponent {
  phone = new FormControl("");
}
```

`[inputmask]` accepts a mask string, a mask array or a full options object.
`inputmaskOptions` can be used to pass extra options separately:

```html
<input inputmask="+99 999 99 99" [inputmaskOptions]="{ clearIncomplete: true }" />
```

The directive updates the form model on every Inputmask `input` event and
respects `setDisabledState`.

## Extensions

The core entry does not register optional aliases. Register the extensions you
use once, before bootstrapping the app:

```ts
import { registerDatetime } from "inputmask/extensions/date";
import { registerNumeric } from "inputmask/extensions/numeric";

registerDatetime();
registerNumeric();
```

## Build

```bash
npm run build --workspace=@inputmask/angular
```

The package is built with `ng-packagr`; the publishable output is written to
`packages/angular/dist`. There is currently no unit test lane for the Angular
wrapper; it is validated through the library build.

The core package must be built first (`npm run build && npm run types` at the
repository root).
