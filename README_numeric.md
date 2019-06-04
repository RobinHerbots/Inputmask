# numeric extensions
## Aliases

- numeric
- currency
- decimal
- integer
- percentage

## Options
### digits
Number of fractionalDigits
Default: "*"

The value can be a number, *, or a quantifier syntax like 2,4
When the quantifier syntax is used, the digitsOptional option is ignored

### digitsOptional
Specify wheter the digits are optional.
Default: true

### enforceDigitsOnBlur 
Enforces the decimal part when leaving the input field.

### allowMinus
Allow to enter -.
Default: true

### negationSymbol
Define your negationSymbol.
Default: {
  front: "-", //"("
  back: "" //")"
}

### prefix
Define a prefix.
Default: ""

### suffix
Define a suffix.
Default: ""

### min
Minimum value
Default: undefined

### max
Maximum value
Default: undefined

### step
Define the step the ctrl-up & ctrl-down must take.
Default: 1

### unmaskAsNumber
Make unmasking returning a number instead of a string.
Default: false

Be warned that using the unmaskAsNumber option together with jQuery.serialize will fail as serialize expects a string. (See issue [#1288])


[#1288]: https://github.com/RobinHerbots/jquery.inputmask/issues/1288


### inputType
Indicates whether the value passed for initialization is text or a number

Default: "text"


### Setting initial values

When initializing the mask with a value, you need to take some rules into account.
Depending of the option inputType the value will be interpreted as text or as a number.

When inputType is text, the symbol of the radixPoint must be correct.  When using number the . (dot) is used as radixpoint.

Setting a number will always work when using vanilla javascript setters.

Example with komma (,) as radixpoint
```
/html
<input name="npt" value="123456,789"/>

//js
Inputmask("decimal", {
    radixPoint: ',',
    inputtype: "text"
}).mask("input");

$("input").val("123456,789");
$("input").val(123456.789); //this doesn't work because jQuery converts the number to a string
before passing it along to the Inputmask.

document.getElementsByName("npt")[0].value = "123456,789";
document.getElementsByName("npt")[0].value = 123456.789; //type number

```