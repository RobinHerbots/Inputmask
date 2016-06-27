# phone extensions

In the inputmask.phone.extensions you can find the abstractphone alias which is like the base for the phone aliases.
In the extra/phone-codes folder you find some implementations.

You need to include the inputmask.phone.extensions.js and the phonecodes from within the extra folder to use the phone alias.


```javascript
$(selector).inputmask("phone", {
  onKeyValidation: function () { //show some metadata in the console
    console.log($(this).inputmask("getmetadata")["city"]);
  }
});
```


## Aliases
- phone
- phonebe
- phonenl
- phoneru
- phoneuk
