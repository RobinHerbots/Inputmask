# date & datetime extensions

Date & Time masks.  Includes autocompletion, yearranges, leapyeares, etc.

This extension will be updated in milestone 3.4.  
All aliases will be replaced by 1 generic datetime alias which can accept a specifier for the desired datetime format.

## Definitions

- h   :   hours  
- s   :   seconds / minutes  
- d   :   simple day  
- m   :   simple month  
- y   :   simple year   

## Aliases

- dd/mm/yyyy  
- mm/dd/yyyy
- yyyy/mm/dd  
- dd.mm.yyyy  
- dd-mm-yyyy  
- mm.dd.yyyy  
- mm-dd-yyyy  
- yyyy.mm.dd  
- yyyy-mm-dd  
- datetime  
- datetime12  
- mm/dd/yyyy hh:mm xm  
- hh:mm t  
- h:s t  
- hh:mm:ss  
- hh:mm  
- date  
- mm/yyyy  
- shamsi

## Options
### yearrange
Define a yearrange.  

yearrange: {
  minyear: 1900,
  maxyear: 2099
}

## jqueryui.datepicker example

```javascript
    $('#calender').datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true
    }).inputmask('dd/mm/yyyy');
```
