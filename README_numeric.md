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

### groupSize
Define the grouping of the integer part.
Default: 3

### autoGroup
Enable grouping of the integer part.
Default: false

### allowPlus
Allow to enter +.
Default: true

### allowMinus
Allow to enter -.
Default: true

### negationSymbol
Define your negationSymbol.
Default: {
  front: "-", //"("
  back: "" //")"
}

### integerDigits
Number of integerDigits
Default: "+"

### integerOptional
Specify wheter the integerdigits are optional.
Default: true

### prefix
Define a prefix.
Default: ""

### suffix
Define a suffix.
Default: ""

### decimalProtect
Do not allow assumption of decimals input without entering the radixpoint.
Default: true

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
