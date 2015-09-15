# phone extensions

```javascript
 $(selector).inputmask("phone", {
                url: "Scripts/jquery.inputmask/phone-codes/phone-codes.json",
                onKeyValidation: function () { //show some metadata in the console
                    console.log($(this).inputmask("getmetadata")["city"]);
                }
  });
```


## Aliases
- phone
- phonebe

## Options

### url

Specify the url to fetch the phone codes.

### countrycode

Specify the countrycode to help determine phonenumbers when pasting or with an initialValue.
