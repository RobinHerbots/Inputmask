# Colormask

The colormask is the same as inputmask but allows you to specify a color for the mask. This is useful when you want to have a different color for the mask than the input text.

## Setup

### Classic web with <script\> tag

Include the files which you can find in the `dist` folder.

```html
<link rel="stylesheet" href="colormask.css" />
<script src="colormask.js"></script>
```

### In your modules

```javascript
import "inputmask/colormask.css";
import Colormask from "inputmask/colormask";

Colormask({ mask: "999-999-9999" }).mask(selector);
```

If your bundler does not resolve the `inputmask/*` subpath exports, use the `dist` files directly:

```javascript
import "inputmask/dist/colormask.css";
import Colormask from "inputmask/dist/colormask.js";
```

## Usage

First have a look at the stylesheet `colormask.css` to see how you can style the mask. Adjust the colors to your needs.

Use it like the inputmask but with Colormask instead of Inputmask.
