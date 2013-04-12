#jquery.inputmask

Copyright (c) 2010 - 2013 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)

jquery.inputmask is a jquery plugin which create an input mask.

An inputmask helps the user with the input by ensuring a predefined format. This can be usefull for dates, numerics, phone numbers, ...

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


## Usage:

Include the js-files which you can find in the dist-folder. You have the bundled file which contains the main plugin code and also all extensions. (date, numerics, other) or if you prefer to only include some parts, use the separate js-files in the dist/min folder.

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

### get the unmaskedvalue

```javascript
$(document).ready(function(){
   $("#number").inputmask('unmaskedvalue');
});
```

### set a value and apply mask

this can be done with the traditionnal jquery.val function (all browsers) or javascript value property for browsers which implement lookupGetter or getOwnPropertyDescriptor

```javascript
$(document).ready(function(){
   $("#number").val(12345);

   var number = document.getElementById("number");
   number.value = 12345;
});
```

with the autoUnmaskoption you can change the return of $.fn.val (or value property)  to unmaskedvalue or the maskedvalue

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
by giving a definitionSymbol. (see example x, y, z, which can be used for ip-address masking, the validation is different, but it is allowed to shift the characteres between the definitions)

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
    'autounmask': true
});
```

### numeric input direction

```javascript
$(document).ready(function(){
    $(selector).inputmask('€ 999.999.999,99', { numericInput: true });    //123456  =>  € ___.__1.234,56
});
```

If you define a radixPoint the caret will always jump to the integer part, until you type the radixpoint.  

```javascript
$(document).ready(function(){
    $(selector).inputmask('€ 999.999.999,99', { numericInput: true, radixPoint: "," });
});
```

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

When `clearMaskOnLostFocus: true` is set in the options (default), the mask will clearout the optional part when it is not filled in and this only in case the optional part is at the end of the mask.

For example, given:

```javascript
$('#test').inputmask('999[-AAA]');
```
While the field has focus and is blank, users will see the full mask `___-___`.
When the required part of the mask is filled and the field loses focus, the user will see `123`.
When both the required and optional parts of the mask are filled out and the field loses focus, the user will see `123-ABC`.

### Multiple masks

You can define multiple mask for your input.  Depending on the input the masking will switch between the defined masks.  
This can be usefull when the masks are too different to solve it with optional parts.

```javascript
  $(selector).inputmask({ mask: ["999.999", "aa-aa-aa"]});
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

see jquery.inputmask.extensions.js for an example how to define "auto"-casing in a definition (definition A)
casing can be null, "upper" or "lower"

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

### hasMaskedValue

Check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value 

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

Verify wheter the current value is complete or not.

```javascript
$(document).ready(function(){
    if($("#ssn").inputmask("isComplete")){
		//do something
	}
});
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
This gets parsed with $.parseJSON (for the moment), so be sure to use a welformed json-string without the {}.

```html
<input data-inputmask="'alias': 'date'" />
<input data-inputmask="'mask': '9', 'repeat': 10, 'greedy' : false" />
```
```javascript
$(document).ready(function(){
    $(":input").inputmask();
});
```

## Compiling with Google Closure Compiler

First grab the sources from github.  In the root you type ant.
A new folder dist is created with the minified and optimized js-files

## .NET Nuget Package Install
```html
PM> Install-Package jQuery.InputMask
```

In App_Start, BundleConfig.cs
```c#
bundles.Add(new ScriptBundle("~/bundles/inputmask").Include(
                        "~/Scripts/jquery.inputmask/jquery.inputmask.js",
						"~/Scripts/jquery.inputmask/jquery.inputmask.extensions.js",
						"~/Scripts/jquery.inputmask/jquery.inputmask.date.extensions.js",
						"~/Scripts/jquery.inputmask/jquery.inputmask.numeric.extensions.js"));
```

In Layout
```html
@Scripts.Render("~/bundles/inputmask")
```


# jquery.inputmask extensions

## Alias definitions

### date & datetime aliases

```javascript
$(document).ready(function(){
   $("#date").inputmask("dd/mm/yyyy");
   $("#date").inputmask("mm/dd/yyyy");
   $("#date").inputmask("date"); // alias for dd/mm/yyyy
   $("#date").inputmask("date", {yearrange: { minyear: 1900, maxyear: 2099 }}); //specify year range
});
```

The date aliases take leapyears into account.  There is also autocompletion on day, month, year.
For example:

input:	2/2/2012 		result: 02/02/2012  
input:  352012			result: 03/05/2012  
input:  3/530			result: 03/05/2030  
input:  ctrl rightarrow	        result: the date from today  

```javascript
$(document).ready(function(){
   $("#date").inputmask("datetime"); // 24h
   $("#date").inputmask("datetime12"); // am/pm
});
```

### numeric aliases

```javascript
$(document).ready(function(){
   $("#numeric").inputmask("decimal");
   $("#numeric").inputmask("non-negative-decimal");
   $("#numeric").inputmask("integer");
});
```

With the decimal mask the caret will always jump to the integer part, until you type the radixpoint.  
There is autocompletion on tab with decimal numbers.

Define the radixpoint

```javascript
$(document).ready(function(){
   $("#numeric").inputmask("decimal", { radixPoint: "," });
});
```
Define the number of digits after the radixpoint

```javascript
$(document).ready(function(){
   $("#numeric").inputmask("decimal", { digits: 3 });
});
```
Grouping support through:  autoGroup, groupSeparator, groupSize
```javascript
$(document).ready(function(){
   $("#numeric").inputmask("decimal", { radixPoint: ",", autoGroup: true, groupSeparator: ".", groupSize: 3 });
});
```

### other aliases

An ip adress alias for entering valid ip-addresses.

```javascript
$(document).ready(function(){
   $(selector).inputmask("ip");
});
```

You can find/modify/extend this alias in the jquery.inputmask.extensions.js


