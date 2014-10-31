#jquery.inputmask 3.x

Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://opensource.org/licenses/mit-license.php)

[![devDependency Status](https://david-dm.org/RobinHerbots/jquery.inputmask/dev-status.svg)](https://david-dm.org/RobinHerbots/jquery.inputmask#info=devDependencies) [![peerDependency Status](https://david-dm.org/RobinHerbots/jquery.inputmask/peer-status.svg)](https://david-dm.org/RobinHerbots/jquery.inputmask#info=peerDependencies)

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
- support data-inputmask attribute(s)  
- alternator-mask support
- regex-mask support
- dynamic-mask support
- preprocessing-mask support
- value formatting / validating without input element
- AMD support

Demo page see http://robinherbots.github.io/jquery.inputmask

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZNR3EB6JTMMSS)


## Usage:

Include the js-files which you can find in the dist-folder. You have the bundled file which contains the main plugin code and also all extensions (date, numerics, other) or if you prefer to only include some parts, use the separate js-files in the dist/min folder.

If you use a module loader like requireJS, use the js-files in dist/inputmask

The minimum to include is the jquery.inputmask.js

```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.inputmask.js" type="text/javascript"></script>
```

Define your masks:

```javascript
$(document).ready(function(){
   $(selector).inputmask("99-9999999");  //static mask
   $(selector).inputmask("mask", {"mask": "(999) 999-9999"}); //specifying fn & options
   $(selector).inputmask({"mask": "99-9999999"}); //specifying options only
   $(selector).inputmask("9-a{1,3}9{1,3}"); //mask with dynamic syntax 
});
```

or via data-inputmask attribute

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

Any option can also be passed through the use of a data attribute. Use data-inputmask-<***the name op the option***>="value"

```html
<input id="example1" data-inputmask-clearmaskonlostfocus="false" />
<input id="example2" data-inputmask-regex="[a-za-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" />
```
```javascript
$(document).ready(function(){
   $("#example1").inputmask("99-9999999");
   $("#example2").inputmask("Regex");
});
```


#### Default masking definitions

  - 9 : numeric
  - a : alphabetical
  - * : alphanumeric 

There are more definitions defined within the extensions.  
You can find info within the js-files or by further exploring the options.

## Masking types
### Static masks

These are the very basic of masking.  The mask is defined and will not change during the input.


```javascript
$(document).ready(function(){
   $(selector).inputmask("aa-9999");  //static mask
   $(selector).inputmask({mask: "aa-9999"});  //static mask
});
```

### Optional masks

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

### Dynamic masks

Dynamic masks can change during the input.  To define a dynamic part use { }.

{n} => n repeats  
{n,m} => from n to m repeats

Also {+} and {*} is allowed. + start from 1 and * start from 0.

```javascript
$(document).ready(function(){
   $(selector).inputmask("aa-9{4}");  //static mask with dynamic syntax
   $(selector).inputmask("aa-9{1,4}");  //dynamic mask ~ the 9 def can be occur 1 to 4 times

   //email mask	
   $(selector).inputmask({
            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
            greedy: false,
            onBeforePaste: function (pastedValue, opts) {
                pastedValue = pastedValue.toLowerCase();
                return pastedValue.replace("mailto:", "");
            },
            definitions: {
                '*': {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                    cardinality: 1,
                    casing: "lower"
                }
            }
	});
```

### Alternator masks

The alternator syntax is like an **OR** statement.  The mask can be one of the 2 choices specified in the alternator.

To define an alternator use the |.  
ex: "a|9" => a or 9  
	"(aaa)|(999)" => aaa or 999  

Also make sure to read about the keepStatic option.  

```javascript
$("selector").inputmask("(99.9)|(X)", {
                definitions: {
                    "X": {
                        validator: "[xX]",
                        cardinality: 1,
                        casing: "upper"
                    }
                }
            });
```
or

```javascript
$("selector").inputmask({
                mask: ["99.9", "X"],
                definitions: {
                    "X": {
                        validator: "[xX]",
                        cardinality: 1,
                        casing: "upper"
                    }
                }
            });
```

### Preprocessing masks

You can define the mask as a function which can allow to preprocess the resulting mask.  Example sorting for multiple masks or retrieving mask definitions dynamically through ajax.
The preprocessing fn should return a valid mask definition.

```javascript
  $(selector).inputmask({ mask: function () { /* do stuff */ return ["[1-]AAA-999", "[1-]999-AAA"]; }});
```

## Define custom definitions

You can define your own definitions to use in your mask.  
Start by choosing a masksymbol. 

##### validator(chrs, maskset, pos, strict, opts)
Next define your validator.  The validator can be a regular expression or a function. 

The return value of a validator can be true,  false or a command object.  
###### Options of the command object
- pos : position to insert
- c : character to insert
- caret : position of the caret
- remove : position to remove
- refreshFromBuffer : 
	- true => refresh validPositions from the complete buffer
	- { start: , end: } => refresh from start to end

##### cardinality
Cardinality specifies how many characters are represented and validated for the definition.

##### prevalidator(chrs, maskset, pos, strict, opts)
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

##### placeholder
Specify a placeholder for a definition.

### set defaults

```javascript
$.extend($.inputmask.defaults, {
    'autoUnmask': true
});
```


## Options:

#### placeholder

Change the mask placeholder

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
#### optionalmarker

Definition of the symbols used to indicate an optional part in the mask.  
```javascript
optionalmarker: { start: "[", end: "]" },
```
#### quantifiermarker

Definition of the symbols used to indicate a quantifier in the mask.  
```javascript
quantifiermarker: { start: "{", end: "}" },
```
#### groupmarker

Definition of the symbols used to indicate a group in the mask.  
```javascript
groupmarker: { start: "(", end: ")" },
```
#### alternatormarker

Definition of the symbols used to indicate an alternator part in the mask.  
```javascript
alternatormarker: "|",
```
#### escapeChar

Definition of the symbols used to escape a part in the mask.  
```javascript
escapeChar: "\\",
```
See **escape special mask chars**

#### mask

The mask to use.

#### oncomplete

Execute a function when the mask is completed

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "oncomplete": function(){ alert('inputmask complete'); } });
});
```

#### onincomplete

Execute a function when the mask is incomplete.  Executes on blur.

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "onincomplete": function(){ alert('inputmask incomplete'); } });
});
```
#### oncleared

Execute a function when the mask is cleared.

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "oncleared": function(){ alert('inputmask cleared'); } });
});
```

#### repeat

Mask repeat function. Repeat the mask definition x-times.

```javascript
$(document).ready(function(){
   $("#number").inputmask({ "mask": "9", "repeat": 10 });  // ~ mask "9999999999"
});
```

#### greedy

Toggle to allocate as much possible or the opposite.
Non-greedy repeat function.

```javascript
$(document).ready(function(){
   $("#number").inputmask({ "mask": "9", "repeat": 10, "greedy": false });  // ~ mask "9" or mask "99" or ... mask "9999999999"
});
```

With the non-greedy option set to false, you can specify * as repeat.  This makes an endless repeat.

#### autoUnmask

Automatically unmask the value when retrieved.  
Default: false.

#### removeMaskOnSubmit
Remove the mask before submitting the form.  

#### clearMaskOnLostFocus

Remove the empty mask on blur or when not empty removes the optional trailing part

```javascript
$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",{placeholder:" ", clearMaskOnLostFocus: true }); //default
});
```

#### insertMode

Toggle to insert or overwrite input.  
Default: true.  
This option can be altered by pressing the Insert key.

#### clearIncomplete

Clear the incomplete input on blur

```javascript
$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "clearIncomplete": true } });
});
```

#### aliases

Definitions of aliases.

With an alias you can define a complex mask definition and call it by using an alias name.  So this is mainly to simplify the use of your masks.  Some aliases found in the extensions are: email, currency, decimal, integer, date, datetime, dd/mm/yyyy, etc. 


First you have to create an alias definition.  The alias definition can contain options for the mask, custom definitions, the mask to use etc. 

When you pass in an alias, the alias is first resolved and then the other options are applied.  So you can call an alias and pass another mask to be applied over the alias.
This also means that you can write aliases which "inherit" from another alias.

Some examples can be found in jquery.inputmask.xxx.extensions.js

use:

```javascript
   $("#date").inputmask("date");
```
or
```javascript
   $("#date").inputmask({ alias: "date"});
```

You can also call an alias and extend it with some more options

```javascript
   $("#date").inputmask("date", { "clearIncomplete": true });
```
or
```javascript
   $("#date").inputmask({ alias: "date", "clearIncomplete": true });
```

#### alias

The alias to use.
```javascript
   $("#date").inputmask({ alias: "email"});
```

#### onKeyUp
#### onKeyPress
#### onKeyDown
#### onBeforeMask

Executes before masking the initial value to allow preprocessing of the initial value.
  
Function arguments: initialValue, opts  
Function return: processedValue

```javascript
$(selector).inputmask({
                alias: 'phonebe',
                onBeforeMask: function (value, opts) {
                     		    var processedValue = value.replace(/^0/g, "");
                                if (processedValue.indexOf("32") > 1 || 	processedValue.indexOf("32") == -1) {
                                    processedValue = "32" + processedValue;
                                }
                                      
                                return processedValue;
                            }
            });
```


#### onBeforePaste

Executes before masking the pasted value to allow preprocessing of the pasted value. 

Function arguments: pastedValue, opts  
Function return: processedValue

```javascript
$(selector).inputmask({
                mask: '9999 9999 9999 9999',
                placeholder: ' ',
                showMaskOnHover: false,
                showMaskOnFocus: false,
                onBeforePaste: function (pastedValue, opts) { 
					var processedValue = pastedValue; 

					//do something with it

					return processedValue; 
				}
            });
```

#### onUnMask

Executes after unmasking to allow post-processing of the unmaskedvalue. 

Function arguments: maskedValue, unmaskedValue  
Function return: processedValue

```javascript
$(document).ready(function(){
   $("#number").inputmask("decimal", { onUnMask: function(maskedValue, unmaskedValue) {
		//do something with the value
		return unmaskedValue;
   }});
});
```
#### showMaskOnFocus

Shows the mask when the input gets focus. (default = true)

```javascript
$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",{ showMaskOnFocus: true }); //default
});
```

To make sure no mask is visible on focus also set the showMaskOnHover to false.  Otherwise hovering with the mouse will set the mask and will stay on focus.

#### showMaskOnHover

Shows the mask when hovering the mouse. (default = true)

```javascript
$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",{ showMaskOnHover: true }); //default
});
```

#### onKeyValidation

Callback function is executed on every keyvalidation with the result as parameter.

```javascript
$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",
			{ onKeyValidation: function (result) {
								console.log(result);
								} });
});
```

#### skipOptionalPartCharacter
#### showTooltip

Show the current mask definition as a tooltip.

```javascript
  $(selector).inputmask({ mask: ["999-999-9999 [x99999]", "+099 99 99 9999[9]-9999"], showTooltip: true });
```

#### numericInput

Numeric input direction.  Keeps the caret at the end.

```javascript
$(document).ready(function(){
    $(selector).inputmask('€ 999.999.999,99', { numericInput: true });    //123456  =>  € ___.__1.234,56
});
```

#### rightAlign

Align the input to the right

By setting the rightAlign you can specify to right align an inputmask. This is only applied in combination op the numericInput option or the dir-attribute. Default is true.  

```javascript
$(document).ready(function(){
    $(selector).inputmask('decimal', { rightAlign: false });  //disables the right alignment of the decimal input
});
```

#### radixPoint

Define the radixpoint (decimal separator)  
Default: ""

####radixFocus

Position the caret to the radixpoint on the initial click into the inputfield.  
Default: false

#### nojumps
 
Do not jump over fixed parts in the mask.  
Default: false
#### nojumpsThreshold

Start nojumps as of  
Default: 0
 
#### keepStatic
Default: undefined (~false)   
Use in combination with the alternator syntax
Try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible.

ex.
$(selector).inputmask({ mask: ["+55-99-9999-9999", "+55-99-99999-9999", ], keepStatic: true });

typing 1212345123 => should result in +55-12-1234-5123 
type extra 4 => switch to +55-12-12345-1234

When passing multiple masks (an array of masks) keepStatic is automatically set to true unless explicitly set through the options.

#### definitions
#### ignorables

#### isComplete

With this call-in (hook) you can override the default implementation of the isComplete function.  
Args => buffer, opts   
Return => true || false

```javascript
$(selector).inputmask("Regex", { 
	regex: "[0-9]*", 
	isComplete: function(buffer, opts) {
		return new RegExp(opts.regex).test(buffer.join(''));
	}
});
```

#### postProcessOnBlur

This is a hook todo some postprocessing of the value on the blur event, this overrides the clearOptionalTail functionality
Args => tmpBuffer, opts
Manipulations in the tmpBuffer are written to input element

##Functions

#### mask
#### unmaskedvalue

Get the unmaskedvalue

```javascript
$(document).ready(function(){
   $(selector).inputmask('unmaskedvalue');
});
```
#### remove

Remove the inputmask.

```javascript
$(document).ready(function(){
    $(selector).inputmask('remove');
});
```

#### getemptymask
#### hasMaskedValue
#### isComplete

Verify whether the current value is complete or not.

```javascript
$(document).ready(function(){
    if($(selector).inputmask("isComplete")){
		//do something
	}
});
```
#### getmetadata

The metadata of the actual mask provided in the mask definitions can be obtained by calling getmetadata.  If only a mask is provided the mask definition will be returned by the getmetadata.  

```javascript
$(selector).inputmask("getmetadata");
```

#### _detectScope

##General

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
### escape special mask chars

```javascript
$(document).ready(function(){
    $("#months").inputmask("m \\months");
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
### data-inputmask-<option\> attribute

All options can also be passed through data-attributes. 


```html
<input data-inputmask-mask="9" data-inputmask-repeat="10" data-inputmask-greedy="false" />
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

#=========== TODO ===========


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

### jqueryui.datepicker example
```javascript
    $('#calender').datepicker({
                dateFormat: 'dd/mm/yy',                
                changeMonth: true,
                changeYear: true
    }).inputmask('dd/mm/yyyy');
```

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
