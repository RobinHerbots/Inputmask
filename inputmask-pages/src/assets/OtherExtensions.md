# other extensions

## Definitions

- ### A : alphabetical uppercasing

- ### & : alfanumeric uppercasing

- ### \# : hexadecimal

## Setup

With the modern ES Module build, import the extension and use its factory to build the mask options. No alias registration is needed:

```javascript
import Inputmask from "inputmask";
import { url } from "inputmask/extensions/url";
import { email } from "inputmask/extensions/email";
import { definitions } from "inputmask/extensions/definitions";

Inputmask(url()).mask(selector);
Inputmask(email()).mask(selector);
Inputmask({ mask: "999-AAA", definitions: definitions() }).mask(selector);
```

The classic string aliases (`Inputmask("url")`, ...) require the global registration build instead.

## Aliases

### URL

An URL mask for entering valid FTP, HTTP or HTTPS addresses.

```javascript
import { url } from "inputmask/extensions/url";

Inputmask(url()).mask(selector);
```

Or with the registered alias:

```javascript
Inputmask("url").mask(selector);
```

### IP address

An IP address alias for entering valid IP addresses.

```javascript
import { ip } from "inputmask/extensions/ip";

Inputmask(ip()).mask(selector);
```

Or with the registered alias:

```javascript
Inputmask("ip").mask(selector);
```

### Email

An email mask for entering valid email addresses.

```javascript
import { email } from "inputmask/extensions/email";

Inputmask(email()).mask(selector);
```

Or with the registered alias:

```javascript
Inputmask("email").mask(selector);
```

### MAC

An MAC mask for entering valid MAC addresses.

```javascript
import { mac } from "inputmask/extensions/mac";

Inputmask(mac()).mask(selector);
```

Or with the registered alias (which includes the definitions):

```javascript
Inputmask("mac").mask(selector);
```

### VIN (Vehicle identification number)

An VIN mask for entering valid VIN codes.

```javascript
import { vin } from "inputmask/extensions/vin";

Inputmask(vin()).mask(selector);
```

Or with the registered alias:

```javascript
Inputmask("vin").mask(selector);
```

### SSN (Social security number)

An SSN mask for entering valid SSN numbers.

```javascript
import { ssn } from "inputmask/extensions/ssn";

Inputmask(ssn()).mask(selector);
```

Or with the registered alias:

```javascript
Inputmask("ssn").mask(selector);
```

### CSS unit

A cssunit mask for entering valid css unit values like `10px`, `2.5em` or `100%`.

```javascript
import { cssunit } from "inputmask/extensions/cssunit";

Inputmask(cssunit()).mask(selector);
```

Or with the registered alias:

```javascript
Inputmask("cssunit").mask(selector);
```

You can find/modify/extend these aliases in lib/extensions/ (ip, email, url, cssunit, mac, vin, ssn, date, numeric and definitions modules).
