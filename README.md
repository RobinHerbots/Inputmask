# Inputmask

Copyright (c) 2010 - 2023 Robin Herbots Licensed under the MIT license (<https://opensource.org/licenses/MIT>)

The Inputmask has a very permissive license and this will stay that way. But when you use the Inputmask in a commercial setting, be so honest to make a small donation.
This will be appreciated very much.

[![donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZNR3EB6JTMMSS)

![npm](https://img.shields.io/npm/v/inputmask) ![npm (tag)](https://img.shields.io/npm/v/inputmask/next) ![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/inputmask)

Inputmask is a javascript library that creates an input mask. Inputmask can run against vanilla javascript, jQuery, and jqlite.

An inputmask helps the user with the input by ensuring a predefined format. This can be useful for dates, numerics, phone numbers, ...

## Usage

### Modern ES Modules

Inputmask exposes a modern, tree-shakable ES Module build. You can import the core functionality and then include only the extensions you need:

```javascript
import Inputmask from "inputmask";
import "inputmask/date.extensions";
import "inputmask/numeric.extensions";

Inputmask({"mask": "99/99/9999"}).mask(document.getElementById("myInput"));
```

### Legacy UMD

If you are using script tags or need the legacy UMD build containing all features natively bundled:

```html
<script src="node_modules/inputmask/dist/inputmask.min.js"></script>
```

```javascript
Inputmask({"mask": "99/99/9999"}).mask(document.getElementById("myInput"));
```

## Documentation and demo page

<https://robinherbots.github.io/Inputmask/>

Thanks to [Browserstack](https://www.browserstack.com) for providing a free license, so we can automate testing in different browsers and devices.

<a href="https://www.browserstack.com">
  <img src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" alt="Browserstack" width="150">
</a>
