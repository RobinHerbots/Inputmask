#DO NOT USE - experimental

#jquery.inputmask

Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://opensource.org/licenses/mit-license.php)

jquery.inputmask is a jQuery plugin which create an input mask.

An inputmask helps the user with the input by ensuring a predefined format. This can be useful for dates, numerics, phone numbers, ...

Highlights:
- easy to use
- optional parts anywere in the mask
- possibility to define aliases which hide complexity
- date / datetime masks
- numeric masks
- lots of callbacks
- non-greedy masks
- many features can be enabled/disabled/configured by options
- supports readonly/disabled/dir="rtl" attributes
- support data-inputmask attribute  
- multi-mask support  
- regex-mask support
- value formatting / validating without input element

Demo page see http://robinherbots.github.io/jquery.inputmask

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZNR3EB6JTMMSS)


## Usage:

Include the js-files which you can find in the dist-folder. You have the bundled file which contains the main plugin code and also all extensions (date, numerics, other) or if you prefer to only include some parts, use the separate js-files in the dist/min folder.

The minimum to include is the jquery.inputmask.js

```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.inputmask.js" type="text/javascript"></script>
```

Define your masks:

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y");  //direct mask
   $("#phone").inputmask("mask", {"mask": "(999) 999-9999"}); //specifying fn & options
   $("#tin").inputmask({"mask": "99-9999999"}); //specifying options only
});
```

or

```html
<input data-inputmask="'alias': 'date'" />
<input data-inputmask="'mask': '9', 'repeat': 10, 'greedy' : false" />
<input data-inputmask="'mask': '99-9999999'" />
```
```javascript
$(document).ready(function(){
    $(":input").inputmask();
});
```

#### Default masking definitions

  - 9 : numeric
  - a : alphabetical
  - * : alphanumeric 

There are more definitions defined within the extensions.  
You can find info within the js-files or by further exploring the options.

## Options:

### change the placeholder


```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "placeholder": "*" });
});
```

or a multi-char placeholder

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "placeholder": "dd/mm/yyyy" });
});
```

### execute a function when the mask is completed, incomplete or cleared

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "oncomplete": function(){ alert('inputmask complete'); } });
   $("#date").inputmask("d/m/y",{ "onincomplete": function(){ alert('inputmask incomplete'); } });
   $("#date").inputmask("d/m/y",{ "oncleared": function(){ alert('inputmask cleared'); } });
});
```

### clearIncomplete - clear the incomplete input on blur

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "clearIncomplete": true } });
});
```

### mask repeat function

```javascript
$(document).ready(function(){
   $("#number").inputmask({ "mask": "9", "repeat": 10 });  // ~ mask "9999999999"
});
```

### mask non-greedy repeat function

```javascript
$(document).ready(function(){
   $("#number").inputmask({ "mask": "9", "repeat": 10, "greedy": false });  // ~ mask "9" or mask "99" or ... mask "9999999999"
});
```

With the non-greedy option set to false, you can specify * as repeat.  This makes an endless repeat.

### get the unmaskedvalue

```javascript
$(document).ready(function(){
   $("#number").inputmask('unmaskedvalue');
});
```

### onUnMask
Executes after unmasking to allow post-processing of the unmaskedvalue.  The arguments to the function are maskedValue, unmaskedValue.

```javascript
$(document).ready(function(){
   $("#number").inputmask("decimal", { onUnMask: function(maskedValue, unmaskedValue) {
		//do something with the value
		return unmaskedValue;
   }});
});
```

### set a value and apply mask

this can be done with the traditional jquery.val function (all browsers) or JavaScript value property for browsers which implement lookupGetter or getOwnPropertyDescriptor

```javascript
$(document).ready(function(){
   $("#number").val(12345);

   var number = document.getElementById("number");
   number.value = 12345;
});
```

with the autoUnmaskoption you can change the return of $.fn.val (or value property) to unmaskedvalue or the maskedvalue

```javascript
$(document).ready(function(){
   	$('#<%= tbDate.ClientID%>').inputmask({ "mask": "d/m/y", 'autoUnmask' : true});	//  value: 23/03/1973
	alert($('#<%= tbDate.ClientID%>').val());	// shows 23031973     (autoUnmask: true)

	var tbDate = document.getElementById("<%= tbDate.ClientID%>");
    alert(tbDate.value);	// shows 23031973     (autoUnmask: true)
});
```

### add custom definitions

You can define your own definitions to use in your mask.  
Start by choosing a masksymbol. 

##### validator
Next define your validator.  The validator can be a regular expression or a function.

##### cardinality
Cardinality specifies how many characters are represented and validated for the definition.

##### prevalidator
The prevalidator option is 
used to validate the characters before the definition cardinality is reached. (see 'j' example)

##### definitionSymbol
When you insert or delete characters, they are only shifted when the definition type is the same.  This behavior can be overridden
by giving a definitionSymbol. (see example x, y, z, which can be used for ip-address masking, the validation is different, but it is allowed to shift the characters between the definitions)

```javascript
$.extend($.inputmask.defaults.definitions, {
    'f': {  //masksymbol
        "validator": "[0-9\(\)\.\+/ ]",
        "cardinality": 1,
        'prevalidator': null
    },
	'g': {
        "validator": function (chrs, buffer, pos, strict, opts) { 
			//do some logic and return true, false, or { "pos": new position, "c": character to place }
		}		
        "cardinality": 1,
        'prevalidator': null
    },
	'j': { //basic year
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [
                        { validator: "[12]", cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
            ]
     }, 
	 'x': {
        validator: "[0-2]",
        cardinality: 1,
        definitionSymbol: "i" //this allows shifting values from other definitions, with the same masksymbol or definitionSymbol
     },
     'y': {
        validator: function (chrs, buffer, pos, strict, opts) {
                        var valExp2 = new RegExp("2[0-5]|[01][0-9]");
                        return valExp2.test(buffer[pos - 1] + chrs);
                    },
        cardinality: 1,
        definitionSymbol: "i"
     },
     'z': {
        validator: function (chrs, buffer, pos, strict, opts) {
                       var valExp3 = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
                        return valExp3.test(buffer[pos - 2] + buffer[pos - 1] + chrs);
        },
        cardinality: 1,
        definitionSymbol: "i"
      }
});
```

### set defaults

```javascript
$.extend($.inputmask.defaults, {
    'autoUnmask': true
});
```

### numeric input direction

```javascript
$(document).ready(function(){
    $(selector).inputmask('€ 999.999.999,99', { numericInput: true });    //123456  =>  € ___.__1.234,56
});
```

#### skipRadixDance

If you define a radixPoint the caret will always jump to the integer part, until you type the radixpoint.  

```javascript
$(document).ready(function(){
    $(selector).inputmask('€ 999.999.999,99', { numericInput: true, radixPoint: "," });
});
```

This behavior can be skipped by setting the skipRadixDance to true.

#### align the numerics to the right

By setting the rightAlignNumerics you can specify to right align a numeric inputmask.  Default is true.  

```javascript
$(document).ready(function(){
    $(selector).inputmask('decimal', { rightAlignNumerics: false });  //disables the right alignment of the decimal input
});
```


### remove the inputmask

```javascript
$(document).ready(function(){
    $('selector').inputmask('remove');
});
```

### escape special mask chars

```javascript
$(document).ready(function(){
    $("#months").inputmask("m \\months");
});
```

### clearMaskOnLostFocus

remove the empty mask on blur or when not empty removes the optional trailing part

```javascript
$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",{placeholder:" ", clearMaskOnLostFocus: true }); //default
});
```

### Optional Masks

It is possible to define some parts in the mask as optional.  This is done by using [ ].

Example:

```javascript
$('#test').inputmask('(99) 9999[9]-9999');
```
This mask wil allow input like (99) 99999-9999 or (99) 9999-9999.  
Input => 12123451234      mask => (12) 12345-1234    (trigger complete)  
Input => 121234-1234      mask => (12) 1234-1234     (trigger complete)  
Input => 1212341234       mask => (12) 12341-234_    (trigger incomplete)  

#### skipOptionalPartCharacter
As an extra there is another configurable character which is used to skip an optional part in the mask.  

```javascript
skipOptionalPartCharacter: " ",
```
Input => 121234 1234      mask => (12) 1234-1234     (trigger complete)  

When `clearMaskOnLostFocus: true` is set in the options (default), the mask will clear out the optional part when it is not filled in and this only in case the optional part is at the end of the mask.

For example, given:

```javascript
$('#test').inputmask('999[-AAA]');
```
While the field has focus and is blank, users will see the full mask `___-___`.
When the required part of the mask is filled and the field loses focus, the user will see `123`.
When both the required and optional parts of the mask are filled out and the field loses focus, the user will see `123-ABC`.

#### Optional masks with greedy false

When defining an optional mask together with the greedy: false option, the inputmask will show the smallest possible mask as input first.

```javascript
$(selector).inputmask({ mask: "99999[-9999]", greedy: false });
```

The initial mask shown will be "_____" instead of "_____-____". 

### Multiple masks

You can define multiple mask for your input.  Depending on the input the masking will switch between the defined masks.  
This can be useful when the masks are too different to solve it with optional parts.

```javascript
  $(selector).inputmask({ mask: ["999.999", "aa-aa-aa"]});
```

#### inputmask-multi format

You can also pass an array for masking with the a format like the format used in inputmask-multi

```javascript
var phones = [
            { "mask": "+247-####", "cc": "AC", "name_en": "Ascension", "desc_en": "", "name_ru": "Остров Вознесения", "desc_ru": "" },
            { "mask": "+376-###-###", "cc": "AD", "name_en": "Andorra", "desc_en": "", "name_ru": "Андорра", "desc_ru": "" },
            { "mask": "+971-5#-###-####", "cc": "AE", "name_en": "United Arab Emirates", "desc_en": "mobile", "name_ru": "Объединенные Арабские Эмираты", "desc_ru": "мобильные" },
          ...
]
$(selector).inputmask({ mask: phones, definitions: { '#': { validator: "[0-9]", cardinality: 1}} }); //in case of inputmask-multi you need to specify the validator for #
```

The metadata of the actual mask provided in the mask definitions can be obtained by calling

```javascript
$(selector).inputmask("getmetadata");
```

### Preprocessing mask

You can define the mask as a function which can allow to preprocess the resulting mask.  Example sorting for multiple masks or retrieving mask definitions dynamically through ajax.
The preprocessing fn should return a valid mask definition.

```javascript
  $(selector).inputmask({ mask: function () { /* do stuff */ return ["[1-]AAA-999", "[1-]999-AAA"]; }});
```

### aliases option

First you have to create an alias definition (more examples can be found in jquery.inputmask.extensions.js)

```javascript
$.extend($.inputmask.defaults.aliases, {
        'date': {
            mask: "d/m/y"
        },
        'dd/mm/yyyy': {
	    alias: "date"
	}
});
```

use:

```javascript
$(document).ready(function(){
   $("#date").inputmask("date");    //   => equals to    $("#date").inputmask("d/m/y");
});
```

or use the dd/mm/yyyy alias of the date alias:

```javascript
$(document).ready(function(){
   $("#date").inputmask("dd/mm/yyyy");   //    => equals to    $("#date").inputmask("d/m/y");
});
```

### auto upper/lower- casing inputmask

You can define within a definition to automatically lowercase or uppercase the entry in an input by giving the casing.  
Casing can be null, "upper" or "lower"
```javascript
    $.extend($.inputmask.defaults.definitions, {
        'A': { 
            validator: "[A-Za-z]",
            cardinality: 1,
            casing: "upper" //auto uppercasing
        },
        '#': {
            validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
            cardinality: 1,
            casing: "upper"
        }
    });
```

Include jquery.inputmask.extensions.js for using the A and # definitions.

```javascript
$(document).ready(function(){
   $("#test").inputmask("999-AAA");    //   => 123abc ===> 123-ABC
});
```
### getemptymask command

return the default (empty) mask value


```javascript
$(document).ready(function(){
   $("#test").inputmask("999-AAA");
   var initialValue = $("#test").inputmask("getemptymask");  // initialValue  => "___-___"
});
```

### onKeyUp / onKeyDown option

Use this to do some extra processing of the input when certain keys are pressed.
This can be usefull when implementing an alias, ex. decimal alias, autofill the digits when pressing tab.

see jquery.inputmask.extensions.js for some examples

### onBeforePaste

This callback allows for preprocessing the pasted value before actually handling the value for masking.  This can be usefull for stripping away some characters before processing.

```javascript
$(document).ready(function(){
   $("#test").inputmask("99.", {
                repeat: 4,
                onBeforePaste: function (pastedValue) {
                    //do somehing with the value
                    return pastedValue;
                }
            });
});
```

### onBeforeMask

This callback allows for preprocessing the initial value before actually handling the value for masking.  This can be usefull for stripping away some characters before processing.

```javascript
$(document).ready(function(){
   $("#test").inputmask("99.", {
                repeat: 4,
                onBeforeMask: function (initialValue) {
                    //do somehing with the value
                    return initialValue;
                }
            });
});
```

### hasMaskedValue

Check whether the returned value is masked or not; currently only works reliably when using jquery.val fn to retrieve the value 

```javascript
$(document).ready(function(){
	function validateMaskedValue(val){}
	function validateValue(val){}

	var val = $("#test").val();
    if($("#test").inputmask("hasMaskedValue"))
	  validateMaskedValue(val); 
   else validateValue(val); 
});
```
### showMaskOnFocus

Shows the mask when the input gets focus. (default = true)

```javascript
$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",{ showMaskOnFocus: true }); //default
});
```

To make sure no mask is visible on focus also set the showMaskOnHover to false.  Otherwise hovering with the mouse will set the mask and will stay on focus.

### showMaskOnHover

Shows the mask when hovering the mouse. (default = true)

```javascript
$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",{ showMaskOnHover: true }); //default
});
```
### onKeyValidation

Callback function is executed on every keyvalidation with the result as parameter.

```javascript
$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",
			{ onKeyValidation: function (result) {
								console.log(result);
								} });
});
```
### isComplete

Verify whether the current value is complete or not.

```javascript
$(document).ready(function(){
    if($("#ssn").inputmask("isComplete")){
		//do something
	}
});
```

### showTooltip

Show the current mask definition as a tooltip.

```javascript
  $(selector).inputmask({ mask: ["999-999-9999 [x99999]", "+099 99 99 9999[9]-9999"], showTooltip: true });
```


## Supported markup options
### RTL attribute

```html
<input id="test" dir="rtl" />
```
### readonly attribute

```html
<input id="test" readonly="readonly" />
```
### disabled attribute

```html
<input id="test" disabled="disabled" />
```

### maxlength attribute

```html
<input id="test" maxlength="4" />
```
### data-inputmask attribute

You can also apply an inputmask by using the data-inputmask attribute.  In the attribute you specify the options wanted for the inputmask.
This gets parsed with $.parseJSON (for the moment), so be sure to use a well-formed json-string without the {}.

```html
<input data-inputmask="'alias': 'date'" />
<input data-inputmask="'mask': '9', 'repeat': 10, 'greedy' : false" />
```
```javascript
$(document).ready(function(){
    $(":input").inputmask();
});
```

## Value formatting

Instead of masking an input element it is also possible to use the inputmask for formatting given values.
Think of formatting values to show in jqGrid or on other elements then inputs.

```javascript
var formattedDate = $.inputmask.format("2331973", { alias: "dd/mm/yyyy"});
```

## Value validating

Validate a given value against the mask.

```javascript
var isValid = $.inputmask.isValid("23/03/1973", { alias: "dd/mm/yyyy"});
```

## Compiling with Google Closure Compiler

First grab the sources from GitHub.  In the root you type ant.
A new folder dist is created with the minified and optimized js-files

## .NET Nuget Package Install
```html
PM> Install-Package jQuery.InputMask
```

In App_Start, BundleConfig.cs
```c#
bundles.Add(new ScriptBundle("~/bundles/inputmask").Include(
                        "~/Scripts/jquery.inputmask/jquery.inputmask-{version}.js",
						"~/Scripts/jquery.inputmask/jquery.inputmask.extensions-{version}.js",
						"~/Scripts/jquery.inputmask/jquery.inputmask.date.extensions-{version}.js",
						"~/Scripts/jquery.inputmask/jquery.inputmask.numeric.extensions-{version}.js"));
```

In Layout
```html
@Scripts.Render("~/bundles/inputmask")
```


# jquery.inputmask extensions

## date & datetime extensions

```javascript
$(document).ready(function(){
   $(selector).inputmask("dd/mm/yyyy");
   $(selector).inputmask("mm/dd/yyyy");
   $(selector).inputmask("date"); // alias for dd/mm/yyyy
   $(selector).inputmask("date", {yearrange: { minyear: 1900, maxyear: 2099 }}); //specify year range
});
```

The date aliases take leap years into account.  There is also autocompletion on day, month, year.
For example:

input:	2/2/2012 		result: 02/02/2012  
input:  352012			result: 03/05/2012  
input:  3/530			result: 03/05/2030  
input:  ctrl rightarrow	        result: the date from today  

```javascript
$(document).ready(function(){
   $(selector).inputmask("datetime"); // 24h
   $(selector).inputmask("datetime12"); // am/pm
});
```

## numeric extensions

```javascript
$(document).ready(function(){
   $(selector).inputmask("decimal");
   $(selector).inputmask("decimal", { allowMinus: false });
   $(selector).inputmask("integer");
});
```

RadixDance

With the decimal mask the caret will always jump to the integer part, until you type the radixpoint.  
There is autocompletion on tab with decimal numbers.  You can disable this behaviour by setting the skipRadixDance to true.

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

## regex extensions

With the regex extension you can use any regular expression as a mask.  Currently this does only input restriction.  
There is no further masking visualization.

Example simple email regex:
```javascript
$(document).ready(function(){
   $(selector).inputmask('Regex', { regex: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}" });
});
```

## phone extensions
Uses the phone mask definitions from https://github.com/andr-04/inputmask-multi

```javascript
 $(selector).inputmask("phone", {
                url: "Scripts/jquery.inputmask/phone-codes/phone-codes.json", 
                onKeyValidation: function () { //show some metadata in the console
                    console.log($(this).inputmask("getmetadata")["name_en"]);
                } 
  });
```

## other extensions

An ip address alias for entering valid ip-addresses.

```javascript
$(document).ready(function(){
   $(selector).inputmask("ip");
});
```

You can find/modify/extend this alias in the jquery.inputmask.extensions.js

##External links

https://github.com/andr-04/inputmask-multi  
https://github.com/greengerong/green.inputmask4angular
