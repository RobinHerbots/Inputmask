# libphonenumber metadata exploration

## Options considered

### 1. Runtime integration (not chosen)

Use `libphonenumber-js` in the browser to parse/format values and build masks
from `AsYouType` output. This gives the best coverage but adds a runtime
dependency, duplicates Inputmask's own input handling, and makes bundle size
depend on the metadata level (`min`, `max`, `mobile`).

### 2. Build-time generation from metadata (prototype, implemented)

`bin/generate-from-libphonenumber.js` reads `libphonenumber-js` country codes
and example numbers, then emits plain data in
`lib/phone-codes/phone-libphonenumber.generated.js`. The generated module has
no runtime dependency.

The current generator produces one mask per country by taking the international
example number and replacing every national digit with `#`, keeping the calling
code and the formatting separators. It generates 245 masks, including Kosovo
(`+383 43 201 234` → `+383 ## ### ###`).

```js
import { registerPhoneCodes } from "inputmask.phone";
import phoneGenerated from "inputmask.phone/phone-codes/phone-libphonenumber.generated.js";

registerPhoneCodes(Inputmask, "phoneGenerated", phoneGenerated);
```

Regenerate with:

```sh
node packages/inputmask.phone/bin/generate-from-libphonenumber.js
```

Limitations: one example does not cover all national number lengths or
formats, mobile and fixed-line patterns are not separated, and calling codes
shared by several countries (+1 NANP, +7 RU/KZ) cannot be distinguished by the
calling code alone.

### 3. Full `numberFormats` inversion (not implemented)

Metadata `numberFormats` are regular expressions such as
`(?:[2-7]\d{2}|8\d{3})\d{5}` with optional national prefixes. Turning those
into Inputmask masks is not a mechanical conversion: ranges and alternations
become many masks, optional groups need combinatorial expansion, and the "best"
mask depends on the entered digits. A practical variant would feed prefixes to
`AsYouType` at build time and collect distinct formatting templates, but that
still needs a size/coverage policy and careful escaping of literal `9`, `(` and
`)`, which are mask syntax in Inputmask.

## Porting notes

The old package patched `Inputmask.prototype.analyseMask`; that function is
private in Inputmask 5.x. This port folds large mask lists into a trie before
`generateMaskSet` sees them. The trie splits masks into lexer tokens (so
escaped sequences such as `\(` remain intact) and enables `keepStatic` for
folded lists after sorting by specificity. This keeps the 12,817-entry Canada
dataset usable and makes autofill select the most specific matching mask.

The alias does not override `showMaskOnHover`/`clearMaskOnLostFocus`, so the
"placeholder always visible" report (#8) is covered by the Inputmask 5 defaults
and an empty unfocused input stays blank.

## Mask audit

`bin/verify-masks.js` checks every imported and generated mask without adding
any runtime dependency:

```sh
npm run verify:masks --workspace inputmask.phone
npm run verify:masks --workspace inputmask.phone -- --type
```

The default mode verifies that each mask parses and that a value built from its
`#` positions round-trips through `format`/`unmask`. `--type` additionally
types the dialable digits through the registered alias in jsdom. Large datasets
can be split with `--dataset=phoneCa --start=0 --end=500`.

A `--type` failure means the mask can parse but is shadowed by another mask in
the same folded/overlapping set; it is not a lexer error. The audit reports the
exact mask, input, expected value and actual value.
