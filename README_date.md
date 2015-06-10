## date & datetime extensions

```javascript
$(document).ready(function(){
   $(selector).inputmask("dd/mm/yyyy");
   $(selector).inputmask("mm/dd/yyyy");
   $(selector).inputmask("date"); // alias for dd/mm/yyyy
   $(selector).inputmask("date", {yearrange: { minyear: 1900, maxyear: 2099 }}); //specify year range
});
```

The date aliases take leap years into account.  There is also autocompletion on day, month, year. For example:

input:    2/2/2012         result: 02/02/2012<br>input:  352012            result: 03/05/2012<br>input:  3/530            result: 03/05/2030<br>input:  ctrl rightarrow            result: the date from today  

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
