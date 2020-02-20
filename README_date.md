# datetime extensions

Date and Time masks.

# Aliases

- datetime

# Options

## inputFormat
Format used to input the date

ex:   
- dd/mm/yyyy  
- mm/dd/yyyy  
- dd.mm.yyyy HH:MM:ss  

### Supported symbols
- d  
Day of the month as digits; no leading zero for single-digit days.
- dd  
Day of the month as digits; leading zero for single-digit days.
- ddd  
Day of the week as a three-letter abbreviation.
- dddd  
Day of the week as its full name.
- m  
Month as digits; no leading zero for single-digit months.
- mm  
Month as digits; leading zero for single-digit months.
- mmm  
Month as a three-letter abbreviation.
- mmmm  
Month as its full name.
- yy  
Year as last two digits; leading zero for years less than 10.
- yyyy  
Year as 4 digits.
- h  
Hours; no leading zero for single-digit hours (12-hour clock).
- hh  
Hours; leading zero for single-digit hours (12-hour clock).
- hx  
Hours; no limit; x = number of digits ~ use as h2, h3, ...   
-H  
Hours; no leading zero for single-digit hours (24-hour clock).
- HH  
Hours; leading zero for single-digit hours (24-hour clock).
- Hx  
Hours; no limit; x = number of digits ~ use as H2, H3, ...   
- M  
Minutes; no leading zero for single-digit minutes. Uppercase M unlike CF timeFormat's m to avoid conflict with months.
- MM  
Minutes; leading zero for single-digit minutes. Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
- s  
Seconds; no leading zero for single-digit seconds.
- ss  
Seconds; leading zero for single-digit seconds.
- l  
Milliseconds. 3 digits.
- L  
Milliseconds. 2 digits.
- t  
Lowercase, single-character time marker string: a or p.
- tt  
Two-character time marker string: am or pm.
- T  
Single-character time marker string: A or P.
- TT  
Two-character time marker string: AM or PM.
- Z  
US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
- o  
GMT/UTC timezone offset, e.g. -0500 or +0230.
- S  
The date's ordinal suffix (st, nd, rd, or th). Works well with d.

### Optional parts
To mark a part of the inputFormat as optional, use the [] as you would for other masks.

Ex.
inputFormat: "dd/mm/yyyy [HH]"


## displayFormat
Visual format when the input looses focus
## outputFormat
Unmasking format
## min
Minimum value.  
This needs to be in the same format as the inputformat.  

## max
Maximum value.   
This needs to be in the same format as the inputformat.  