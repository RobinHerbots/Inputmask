## numeric extensions

```javascript
$(document).ready(function(){
   $(selector).inputmask("decimal");
   $(selector).inputmask("decimal", { allowMinus: false });
   $(selector).inputmask("integer");
});
```

Define the radixpoint

```javascript
$(document).ready(function(){
   $(selector).inputmask("decimal", { radixPoint: "," });
});
```

Define the number of digits after the radixpoint

```javascript
$(document).ready(function(){
   $(selector).inputmask("decimal", { digits: 3 });
});
```

Define the number of digits before the radixpoint

```javascript
$(document).ready(function(){
   $(selector).inputmask("decimal", { integerDigits: 5 });
});
```

When TAB out of the input the digits autocomplate with 0 if the digits option is given a valid number.

Grouping support through:  autoGroup, groupSeparator, groupSize

```javascript
$(document).ready(function(){
   $(selector).inputmask("decimal", { radixPoint: ",", autoGroup: true, groupSeparator: ".", groupSize: 3 });
});
```

Allow minus and/or plus symbol

```javascript
$(document).ready(function(){
   $(selector).inputmask("decimal", { allowMinus: false });
   $(selector).inputmask("integer", { allowMinus: false, allowPlus: true });
});
```
