jquery.inputmask is a jquery plugin which create an input mask ;-)

The plugin is based on the maskedinput plugin of Josh Bush (http://digitalbush.com/projects/masked-input-plugin), but has finer control over the 'mask-definitions' and is fully compatible with the ui-datepicker

A definition can have a cardinality and have multiple prevalidators.

Example of some new definitions:

                 'm': { //month
                    validator: function(chrs, buffer) {
                        var dayValue = buffer.join('').substr(0, 3);
                        return $.inputmask.defaults.aliases['dd/mm/yyyy'].regex.month.test(dayValue + chrs);
                    },
                    cardinality: 2,
                    prevalidator: [{ validator: "[01]", cardinality: 1}]
                },
                'y': { //year
                    validator: function(chrs, buffer) {
                        if ($.inputmask.defaults.aliases['dd/mm/yyyy'].regex.year.test(chrs)) {
                            var dayMonthValue = buffer.join('').substr(0, 6);
                            if (dayMonthValue != "29/02/")
                                return true;
                            else {
                                var year = parseInt(chrs);  //detect leap year
                                if (year % 4 == 0)
                                    if (year % 100 == 0)
                                    if (year % 400 == 0)
                                    return true;
                                else return false;
                                else return true;
                                else return false;
                            }
                        } else return false;
                    },
                    cardinality: 4,
                    prevalidator: [
                        { validator: "[12]", cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
                        ]
                }
            },
            insertMode: false

These allow for a finer date validation then 99/99/9999 which also allows 33/33/3333 for example.  
In the jquery.inputmask.extentions.js you find a full date input validation which takes days, months & leap years into account.

Also extra features like mask-repetitions (greedy and non-gready) and many other additions are included.  In the examples you will find more about them.


Usage:

Include the js-files

<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.inputmask.js" type="text/javascript"></script>
<script src="jquery.inputmask.extentions.js" type="text/javascript"></script>

Define your masks:

$(document).ready(function(){
   $("#date").inputmask("d/m/y");  //direct mask
   $("#phone").inputmask("mask", {"mask": "(999) 999-9999"}); //specifying fn & options
   $("#tin").inputmask({"mask": "99-9999999"}); //specifying options only
});

Extra options:

change the placeholder

$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "placeholder": "*" });
});

or a multi-char placeholder

$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "placeholder": "dd/mm/yyyy" });
});

execute a function when the mask is completed, incomplete or cleared

$(document).ready(function(){
   $("#date").inputmask("d/m/y",{ "oncomplete": function(){ alert('inputmask complete'); } });
   $("#date").inputmask("d/m/y",{ "onincomplete": function(){ alert('inputmask incomplete'); } });
   $("#date").inputmask("d/m/y",{ "oncleared": function(){ alert('inputmask cleared'); } });
});

mask repeat function

$(document).ready(function(){
   $("#number").inputmask({ "mask": "9", "repeat": 10 });  // ~ mask "9999999999"
});

mask non-greedy repeat function

$(document).ready(function(){
   $("#number").inputmask({ "mask": "9", "repeat": 10, "greedy": false });  // ~ mask "9" or mask "99" or ... mask "9999999999"
});

get the unmaskedvalue

$(document).ready(function(){
   $("#number").inputmask('unmaskedvalue');
});

set a value and apply mask

$(document).ready(function(){
   $("#number").inputmask('setvalue', 12345); 
});

when the option patch_eval is set to true the same can be done with the traditionnal jquery.val function

$(document).ready(function(){
   $("#number").val(12345); 
});

with the autoUnmaskoption you can change the return of $.fn.val  to unmaskedvalue or the maskedvalue

$(document).ready(function(){
   	$('#<%= tbDate.ClientID%>').inputmask({ "mask": "d/m/y", 'autoUnmask' : true});	//  value: 23/03/1973

	alert($('#<%= tbDate.ClientID%>').val());	// shows 23031973     (autoUnmask: true)
});

add custom definitions

$.extend($.inputmask.defaults.definitions, {
    'f': {
        "validator": "[0-9\(\)\.\+/ ]",
        "cardinality": 1,
        'prevalidator': null
    }
});

set defaults

$.extend($.inputmask.defaults, {
    'autounmask': true
});

numeric input direction

$(document).ready(function(){
    $('#test').inputmask('€ 999.999.999,99', { numericInput: true });    //   123456  =>  € ___.__1.234,56
});

remove the inputmask

$(document).ready(function(){
    $('#test').inputmask('remove');
});

escape special mask chars

$(document).ready(function(){
    $("#months").inputmask("m \\months");
});

## clearIncomplere - remove incomplete input on blur

$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",{placeholder:" ", clearIncomplete: true });
});

## Optional Masks
When `clearIncomplete: true` is set in the options, the mask will treat masks marked option as separate from those that are not optional.

For example, given:
```javascript
$('#test').inputmask('999[-AAA]',{
	clearIncomplete: true
});
```
While the field has focus and is blank, users will see the full mask `___-___`.
When the required part of the mask is filled and the field loses focus, the user will see `123`.
When both the required and optional parts of the mask are filled out and the field loses focus, the user will see `123-abc`.

oncleared option

$(document).ready(function(){
    $("#ssn").inputmask("999-99-9999",{placeholder:" ", oncleared: function(){ alert('Set focus somewhere else ;-)');} });
});

aliases option

First you have to create an alias definition (more examples can be found in jquery.inputmask.extentions.js)

$.extend($.inputmask.defaults.aliases, {
        'date': {
            mask: "d/m/y"
        },
        'dd/mm/yyyy': {
	    alias: "date"
	}
});

use;
$(document).ready(function(){
   $("#date").inputmask("date");       => equals to    $("#date").inputmask("d/m/y");
});

or use the dd/mm/yyyy alias of the date alias:
$(document).ready(function(){
   $("#date").inputmask("dd/mm/yyyy");       => equals to    $("#date").inputmask("d/m/y");
});

auto upper/lower- casing inputmask

see jquery.inputmask.extentions.js for an example how to define "auto"-casing in a definition (definition A)
casing can be null, "upper" or "lower"

$(document).ready(function(){
   $("#test").inputmask("999-AAA");       => 123abc ===> 123-ABC 
});

getemptymask command

return the default (empty) mask value

$(document).ready(function(){
   $("#test").inputmask("999-AAA");    
   alert($("#test").inputmask("getemptymask"));    => "___-___" 
});

RTL input 

Just add the dir="rtl" attribute to the input element

<input id="test" dir="rtl" />

-----------------------------------------

