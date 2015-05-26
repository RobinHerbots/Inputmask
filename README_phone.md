## phone extensions
Uses the phone mask definitions from [https://github.com/andr-04/inputmask-multi](https://github.com/andr-04/inputmask-multi)

```javascript
 $(selector).inputmask("phone", {
                url: "Scripts/jquery.inputmask/phone-codes/phone-codes.json",
                onKeyValidation: function () { //show some metadata in the console
                    console.log($(this).inputmask("getmetadata")["name_en"]);
                }
  });
```
