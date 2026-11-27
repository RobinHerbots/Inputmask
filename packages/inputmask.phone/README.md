# inputmask.phone

Phone aliases for Inputmask 5.x. This is the in-tree port of
[RobinHerbots/inputmask.phone](https://github.com/RobinHerbots/inputmask.phone).

```js
import Inputmask from "inputmask";
import { registerPhoneCodes } from "inputmask.phone";
import phonebe from "inputmask.phone/phone-codes/phone-be";

registerPhoneCodes(Inputmask, "phonebe", phonebe);
Inputmask("phonebe").mask(document.querySelector("input"));
```

Importing the package registers the `abstractphone` alias. Country datasets
are opt-in through `registerPhoneCodes`. The original alias names are kept:
`phone`, `phonebe`, `phoneca`, `phonehu`, `phoneit`, `phonemx`, `phonenl`,
`phoneru`.

## Verifying masks

Run the build-time mask audit with:

```sh
npm run verify:masks --workspace inputmask.phone
npm run verify:masks --workspace inputmask.phone -- --type
```

The first command checks every mask for parse/format/unmask round-trips. `--type`
also simulates typing through the registered alias. See
[docs/libphonenumber.md](docs/libphonenumber.md) for the metadata-based
prototype generator and audit details.
