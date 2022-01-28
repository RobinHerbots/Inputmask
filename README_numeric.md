# numeric extensions
## Aliases

- numeric
- currency
- decimal
- integer
- percentage

The defaults are those defined in the base numeric alias.
The currency alias and others are derived from the numeric alias and can have other defaults.
Have a look in the inputmask.numeric.extensions.js for more details about which defaults are used. (At the end of the file)

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
Default: false

### radixPoint
default: "."

### positionCaretOnClick
Default: "radixFocus"
		
### groupSeparator
Default: ""
		
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

### SetMaxOnOverflow
Set the maximum value when the user types a number which is greater that the value of max.

Default: false

### step
Define the step the ctrl-up & ctrl-down must take.  
Default: 1

### inputType
Specify that values which are set are in textform (radix point is same as in the options) or in numberform (radixpoint = .)

Default: "text"

text: radixpoint should be the same as in the options  
number: radixpoint should be a . as the default for a number in js

### unmaskAsNumber
Make unmasking returning a number instead of a string.  
Default: false

Be warned that using the unmaskAsNumber option together with jQuery.serialize will fail as serialize expects a string. (See issue [#1288])


[#1288]: https://github.com/RobinHerbots/jquery.inputmask/issues/1288

### roundingFN
Set the fn for rounding the values when set.  
Default: Math.round

Other examples:
- Math.floor 
- fn(x) { /* do your own rounding logic */ return x; }

### inputmode
Default: "decimal"

### shortcuts: 
Default: {k: "1000", m: "1000000"}

Define shortcuts. 
This will allow typing 1k => 1000, 2m => 2000000
 
To disable just pass shortcuts: null as option

### stripLeadingZeroes
Default: true

Strip leading zeroes.

### substituteRadixPoint
Default: true

Substitude the radixpoint to allow , for . and vice versa.

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
