#jquery.inputmask

jquery.inputmask is a jquery plugin which create an input mask.

Copyright (c) 2010 - 2013 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)



## Usage:

Include the js-files:

```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.inputmask.js" type="text/javascript"></script>
<script src="jquery.inputmask.extensions.js" type="text/javascript"></script>
```

Define your masks:

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y");  //direct mask
   $("#phone").inputmask("mask", {"mask": "(999) 999-9999"}); //specifying fn & options
   $("#tin").inputmask({"mask": "99-9999999"}); //specifying options only
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

```javascript
$.extend($.inputmask.defaults.definitions, {
    'f': {
        "validator": "[0-9\(\)\.\+/ ]",
        "cardinality": 1,
        'prevalidator': null
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
    $('#test').inputmask('€ 999.999.999,99', { numericInput: true });    //123456  =>  € ___.__1.234,56
});
```

### remove the inputmask

```javascript
$(document).ready(function(){
    $('#test').inputmask('remove');
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


When `clearMaskOnLostFocus: true` is set in the options (default), the mask will clearout the optional part when it is not filled in and this only in case the optional part is at the end of the mask.

For example, given:

```javascript
$('#test').inputmask('999[-AAA]');
```
While the field has focus and is blank, users will see the full mask `___-___`.
When the required part of the mask is filled and the field loses focus, the user will see `123`.
When both the required and optional parts of the mask are filled out and the field loses focus, the user will see `123-ABC`.

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
                        "~/Scripts/jquery.inputmask.js",
						"~/Scripts/jquery.inputmask.extensions.js",
						"~/Scripts/jquery.inputmask.date.extensions.js",
						"~/Scripts/jquery.inputmask.numeric.extensions.js"));
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
