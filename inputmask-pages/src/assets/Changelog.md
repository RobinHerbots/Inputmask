# Change Log

## [5.0.8 - 15/03/2023]

### Addition

- Regex unicode categories
- Comma input turns to decimal #2577 => add substituteRadixPoint option to numeric alias

### Updates

- Update GH pages
- fix test resolving when using quantifiers within an optional group
- drop IE Mobile support
- datetime alias
  - change default for insertModeVisual to false. - #2664
- consolidate keydown, keypress & keyup into keyEvent (wip)
- refactor keyboard event keycode to key
- refactor validPositions from object to array. - #2428
- add keepStatic behavior to optional parts - #2619
- fix wrong caret positioning with RTL
- fix value reversing with noValuePatching & numericInput - #2629

### Fixed

- Inputmask fails to handle null value #1485
- crash the input value #2529
- Problems with deleting static chars in alternator mask #2648
- in firefox placeholders are not removed - not even on the demo page #2667
- Tab not moving to next field #2644
- Regex unicode categories cause RangeError: Maximum call stack size exceeded #2639
- error message: Cannot read properties of undefined (reading 'allowMinus') #2642
- fix iphone\ios bug for cyrillic keyboard - #2637
- getemptymask returns a reversed string in 5.x #2605
- DateTime milliseconds (unmaskedvalue) #2597
- Negation symbol not working (12345) #2596
- Is it possible to create a definition for optional digits/characters? #2524 (regression)
- Propagation of the click event to the container #2423
- Minus sign can't be entered into currency field #2583
- ReferenceError: self is not defined #2581

## [5.0.7 - 30/12/2021]

### Addition

- Numeric alias
  - stripLeadingZeroes option - #2523
- Correctly handle nested optionals (email alias)
- character substitution
- extend definition options - #2524
  - optional
  - static
  - generated
- add casing definition option to the readme

### Updates

- change behavior of keepStatic option (see readme)
- update ip alias to correctly handle the greedy: true option
- fix greedy option with quantifiers
- fix error in mask-lexer for \\w in regex
- currency alias: add character substitution for the radixpoint
- alias \\d to [0-9] in regex masks
- clear masktemplate before submitting regardsless of the clearMaskOnLostFocus option

### Fixed

- Add new option "stripLeadingZeroes" to the numeric extension #2523
- Alternation like (9|999) shows extra placeholder #2277
- Numeric shortcut not working for decimal places #2553
- Fix backspace bug with insertMode: false #2572
- InsertMode toggle not functioning #2565
- Uncaught InternalError: too much recursion freezes the browser #2570 (Regex issue)
- Different behaviour configuration by attribute vs initialization #2530
- The requested module './inputmask.js' does not provide an export named 'default' #2560
- Issue with leapday #2546
- Not removing the decimal separator in suffixed inputs #2511
- Cant type dot on iphone #2541
- How can I replace the dot for comma while tipping? #2542
- Issue with global Inputmask.prototype reference (easy fix) #2544
- crash the input value #2529 - part 1
- fix datetime with jitmasking - #2297
- min and max not working in datetime for 12 Hours format i.e. dd/mm/yyyy hh:MM:ss TT #2297

## [5.0.6 - 01/06/2021]

### Addition

- validationEventTimeOut option

### Updates

- User Webpack/Terserplugin for minification
- Fix caret shift with negative numbers in numeric aliases
- enhance alternation logic
- update datetime alias
- datetime prefillYear option  
    Enable/disable prefilling of the year.  
    Although you can just over type the proposed value without deleting, many seems to see a problem with the year prediction.  
    This options is to disable this feature.
- better handle maxLength

### Fixed

- Decimal mask with maxlength turns integer into real number on maximum length #2260
- jitMasking removing a decimal after the comma #2494
- Issue with negative values and prefix in currency mask #2476
- persian/arabic currency mask with regex #2472
- Issue with negative values and prefix in currency mask #2476
- Selecting all + backspace goes to the end of the input #2336
- Error thrown, if only insert radixpoint and leave field and placeholder = "" #2475
- Datetime alias with day auto-fill problem #2480
- Suppress DateTime year autocomplete? #2395
- Bug in iframes #2461
- stuck with cursor on / text of date with datetime extension #2464
- Inputmask with a _space_ as a placeholder and leap year date #2451
- setvalue() "removes" number before comma when "positionCaretOnClick" and "digitsOptional" are set. #2457
- Date field results into buggy output: 30/02/yy0y #2456
- cant enter the leap year using jit masking #2453
- Basically the same issue appears also when you have a valid date in the input but want to change something. #2435
- Can't remove "placeholder" from datetime alias #2438
- showMaskOnFocus: false causes 'Illegal invocation' error #2436
- Input Mask for search fields (partially filled mask) #2425
- HandleNativePlaceholder function prevents use of dynamic placeholders. #2433
- '0' getting added unnecessarily if navigating using arrow key for datetime input mask #2289
- jitmasking ssn #2420
- Removing the mask from Input results in TypeError: Cannot read property 'dependencyLib' of undefined #2403
- Country Code Problem #2397
- Error thrown in unmask after upgrade to 5.0.5 #2375
- Inputmask.remove(document.getElementById(selector)) is not working in Node after version 5.0.5 update #2373
- date format yyyy-mm-dd doesn't work with min and max #2360
- Datetime inputFormat mm/dd/yyyy allows entry of 02/3 without padding the day #1922

## [5.0.5 - 07/08/2020]

HOT FIX: jqlite dependency error

#### [5.0.4 - 07/08/2020]

### Addition

- usePrototypeDefinitions option
- numeric alias
  - SetMaxOnOverflow option

### Updates

- handle ^ and $ in regex masks
- datetime alias: add autofill logic to year
  - complete with current year
  - allow filled year be overtyped when min date is provided,
- &lt;input-mask&gt; enhance attribute handling

### Fixed

- The fractional part cannot be typed if negative values are displayed in parentheses #1836
- version 3.x to 4.x regex issue #1727
- unmask regression? #2315
  - only keep significant parts when using multiple masks
- Datetime alias 29/02/a valid year does not always allows #2286
- 'input-mask' has already been defined as a custom element #2285
- Using min with alias integer not working correctly because of postValidation #2284
- fix double events when using jQuery.clone function
- Alternative for removed integerDigits property? #2278
- Incorrect mask operation when deleting the value set through "value", "val", "setvalue". #2279
- Cursor jumps to end of mask if changing value during typing #2274

## [5.0.3 - 11/01/2020]

### Fixed

- regex mask crashes for long input size #2276
- Pasted value is getting mixed up #2255
- Swapped digits on paste with specific prefix #2256

## [5.0.2 - 09/01/2020]

### Addition

- &lt;input-mask&gt; html element #2247

### Fixed

- Numeric alias: cannot clear input on blur #2235
- Datetime alias H3:MM month validation fails #2239

## [5.0.1 - 18/12/2019]

### Addition

- ssn mask

### Updates

- numeric aliases: set value with jQuery.val or native input.value =
- numeric aliases: make min/max block input instead of setting the min/max value
- jitMasking: autofill statics to improve the user experience

### Fixed

- Backspace not removing characters in some cases #2246
- jitMasking and caret position with static characters #2243
- datetime does not working in IE11 #2238

## [5.0.0 - 02/12/2019]

### Addition

- add indian numbering support in numeric alias (indianns alias)
- add roundingFN option to numeric alias.  (currency, decimal, ...)
- input-inputmode support via inputmode option (if supported by browser)
- add shortcuts option in numeric alias.
- add insertModeVisual option

### Updates

- **postValidation**  
  - add inputchar to arguments  
  - also validate when the result is false**  
- **change behavior of keepStatic option**
  - multiple masks => default true  
  - all other masks => default false
- add more tokens for datetime format  
- refactor inputfallbackevent
- **drop colormask support**
- **drop disablePredictiveText option (was hack via colorMask)**  
- ignore generated statics in revalidateMask
- fix mask curruption when alternating and using jitmasking
- Casing option will also allow case insensitive entry for static symbols  
- **refactor numeric alias**
- package & bundling
- enhance regex alternations. ex: [01][0-9]|2[0-3] => ([01][0-9]|2[0-3])
- extend command object  
  - rewritePosition
- revert insert-mode caret as selection instead of colored caret
  - make delete/backspace behave like normal
  - make visual optional

### Fixed

- Decimal - auto change comma to dot (numeric keyboard) #2098
- If a decimal < 0.000001 (scale = 6), masked value incorrect. #2110
- DateTime - HH:MM format doesn't accept some numbers for minutes #2209
- Set currency prefix to empty by default #2066
- NumericInput: Pasting integers without selecting results in extra 0s #2165
- Wrong mask application on decimal field #2188
- bootstrap-datepicker: date bug in mobile version #2195
- Time 24 Hours Issue. #2194
- 'Decimal'. New entered value is automatically prefixed with '.' #2189
- inputmode not working #2193
- Does not work on XHTML pages. #2187
- isInputEventSupported method is creating a non-passive event #2185
- No message with HTML5 validation #841
- "setvalue" for empty value and "clearMaskOnLostFocus=false" duplicates mask suffix #2181
- Uncaught TypeError: $(...).inputmask is not a function #1933
- 12Hr Format time Hour error #2121
- Backspace alters value/mask in datetime #2163
- Suffix and white-space groupSeparator problem #813
- Char before quantifier gets duplicated in tests #2152
- FireFox - mask placeholder doesn't disappear #2138
- im-insert not valid html #2122
- No message with HTML5 validation #841
- Manual input via virtual keyboard doesn't work #2116
- Can't insert more than 2 letters in Firefox #2114
- InputMask not getting fresh placeholder value #2111
- Chrome autofill does not work with Inputmask #1330
- Paste in inputmask #2088
- The first character is truncated when masking. #2089
- No leading zero for single-digit hours KO #2061
- Only 1st placeholder is displayed for fields with same alias numeric #2060
- Original placeholder disappear when mouseout in IE #2047
- Document bug with disabled inputs caused by Firefox 64 and older #2045
- Behaviour of v3 with hours not possible anymore #1918
- Unmasked value of datetime alias, if empty, returns the placeholder #2039
- ...

## [4.0.4 - 2018-12-03]

### Addition

- add url as supported input type

### Updates

- rework jit enabled quantifiers

### Fixed

- restore greedy functionality
- fix focus and mouseenter behavior in IE

## [4.0.3 - 2018-11-07]

### Addition

- numeric.extensions - add inputType option to specify the type of initial value
- README_numeric.md => Setting initial values

### Updates

- fix window.js for node

### Fixed

- digits: 3 - error on transform #2022
- "Can not read property 'join' of undefined" when using Inputmask.format #2019
- Inputmask numeric does no round up when digits is 0 #2018
- Strange Calendar popup issue in IE Only when used with Daterangepicker #1965
- incorrect work min max date - #2011, #2013

## [4.0.2 - 2018-09-14]

(4.0.1 => 4.0.2 rebuild dist with newer version of uglify #2000)

### Updates

- <strong>remove phone alias</strong> (~ use <https://github.com/RobinHerbots/inputmask.phone> or <https://github.com/andr-04/inputmask-multi> instead) #1981
- enhance gettests for jit enabled quantifiers
- pass initial validation position to postvalidation, to allow prefills in the datetime alias
- remove caret selection for insertMode => use inputmask.css for visualization
- update nuget package
- update dependencies

### Fixed

- When blur input, inputmask adds attr placeholder to input - #1992
- Fix endless loop for quantifiers (see tests_dynamic.js - latest unittests) #1983
- Element keeps the focus to itself in ie11 #1846
- Changes for min/max options do not get picked up. #1931
- Behaviour of v3 with hours not possible anymore #1918
- Multiple alternators #1553
- jquery.inputmask: clearIncomplete and placeholder don't appear to do anything when array of masks used #1892
- Problem with delete masked date on iOS #1899
- Autofill corrupts input on email mask #1908(gl)

## [4.0.0 - 2018-05-26]

### Addition

- add support for beforeInput event with inputType (Input Events Level 2 - <https://w3c.github.io/input-events/>)
- extend positionCaretOnClick with "ignore" to ignore the click in the input
- jit enabled dynamic masks
- add support for input type search
- new datetime alias
- extend positionCaretOnClick with "select" to select the whole input on focus
- add regex option (replaces the Regex alias)
- CSS Unit Mask #1843

### Updates

- make behavior of [] an {0,1} consistent
- change default value from greedy option to false
- fix unmatched alternations in gettests. ("[0-9]{2}|[0-9]{3}" like masks)
- code cleanup and refactoring
  - enhance determineTestTemplate
  - oncomplete calls
  - merge setValidPosition and stripValidPositions => revalidateMask
  - remove canClearPosition hook
  - change notation of optionalmarker, quantifiermarker, groupmarker
  - drop prevalidator and cardinality support in definitions
  - drop Regex alias
  - drop all date/time related aliases => replaced by new datetime alias
- improve alternation logic
- improve inputfallback (Android)
- better caret handling in colormask
- disable autocorrect on safari when disablePredictiveText is used
- rename androidHack option to disablePredictiveText. Make it available for other platforms.

### Fixed

- Both date and time in same masked textbox #1888
- time input mask min and max #1674
- Bug: Using backspace when caret is not at the end messes up static placeholders #1525
- Fast typing text #1872
- jitMasking + disablePredictiveText causes android browser tab to stuck when clicked on "backspase" #1862
- Android 6 issue - Samsung device keyboard #1818
- Method oncomplete doesn't work correctly with jitMasking #1845
- isComplete in numeric extensions doesn't take into account negationSymbol #1844
- Email alias - retype @ removes last . #1324
- When "clearIncomplete: true" and pressing Enter to Submit Form #1839
- Hang on combination of optional mask and repeat #698
- Can't remove inputmask on focus? #1820
- Not able to input 31.12. in DD.MM date input in v4.x #1803
- problem with two separate alternations #1722
- colorMask + Remask = Duplicate im-colormask element #1709

### Note

Be aware when upgrading from 3.3.11, that the regex alias is removed
and that the datetime alias has totally changed.
So expect you need todo some changes to your date-masks and regex masks.
Also some defaults has changed, so have a read through the changes for this release.

There are still many open issues but postponing the release to resolve all issues will take like another year,
while there are already many enhancements available.

## [3.3.9 - 2017-10-10]

### Updates

- enhance inputfallback (Android)

### Fixes

- On Android with date mask input mashing up #1708
- Currency mask works incorrectly on Android Chrome v58 #1617
- Can't input character at the end if it's also a placeholder on Android #1648

## [3.3.8 - 2017-08-24]

### Addition

- Addition \uFF11-\uFF19 character range to 9 definition #1606
- importDataAttributes option #1633
- add dot support in regex #1651

### Updates

- pass inputmask object in the callbacks
- colorMask enhancement: better positioning and more controllable via inputmask.css
- remove maxLength attribute on android #1490
- enhance inputfallback (Android)

### Fixes

- Mask appear when I press TAB & showMaskOnFocus: false, showMaskOnHover: false #1198
- DependencyLib.Event CustomEvent #1642
- Wrong initial cursor position with Numeric and Prefix #1578
- Currency mask works incorrectly on Android Chrome v58 #1617
- Can't input character at the end if it's also a placeholder on Android #1648
- colorMask - incorrect positioning #1421
- Object doesn't support property or method '_valueGet' in version 3.3.7 #1645
- Usage of numericInput in data-inputmask causes reversed value #1640
- Numeric suffix makes radixPoint disappear on preset value #1638
- Cannot delete after fill up all the mask Android Chrome browser Jsfiddle #1637

## [3.3.7 - 2017-06-09]

### Addition

- allow custom operation in casing option by callback #1565

### Updates

- put back Regex alias extension for legacy support #1611
- postvalidation cannot set pos of undefined
- fix undoValue initialization

### Fixed

- Major issue with regex #1611
- React onChange event doesn't work with Inputmask #1377
- Currency digits and delete #1351
- Decimal editing problems #1603
- UX problem with email mask #1600
- Force numeric to empty (on blur) with '0' as value #215
- ndxInitializer.shift is not a function

## [3.3.6 - 2017-05-11]

### Addition

- noValuePatching option #1276

### Updates

- drop Regex alias => use the inputmask regex option instead
- alternator syntax update - regex like alternations is now supported (aa|99|AA) ~ aa or 99 or AA

### Fixed

- NaN with negationSymbol and unmaskAsNumber #1581
- A dot (.) in Regex Causes Errors #647
- variable "undoValue" isn't initialized correctly #1519
- on submit change event is triggered #1392
- Change Event Problems for Masked Input #1583
- integer backspace bug when set maxLength attr. #1546
- Regex with placeholder, not working? #798
- Visualize regular expressions #1040
- Mobile phone code update needed for Malaysia #1571
- suffix bug (regression) #1558
- 29 february of non leap-year #1567

## [3.3.5 - 2017-04-10]

### Addition

- add example webpack setup (thx to Kevin Suen)
- build-in regex support without extension (WIP)

### Updates

- Change package name to Inputmask to better reflect that Inputmask doesn't require jQuery
- make removing the inputmask take the autoUnmask option into account
- enhance inputfallback event (android)
- restructure project
- performance updates
  - initialization

### Fixed

- Changes are not reflected back to model when using with Vue2 (mobile) #1468
- Multiple alternators #1553
- Weird Issue with decimal masking when value is like 0.55 #1512
- IE 8 problems with currency and jquery.inputmask.bundle.js #1545
- Rounding error for numeric aliases #1300
- Currency InputMask Input Value issue with numericInput: true #1269
- onCleared event doesn't fire with 'numeric' alias in some case #1495
- Currency InputMask Input Value issue with numericInput: true #1269
- Rounding numeric values #1540
- Casing lower/upper as extend aliases? #1529
- This line of code returns an unexpected value when unmasking as number #1527
- Phone Mask Cursor Issue on Chrome on some Androids.. #1490
- min value issue fix #1177
- static is a reserved keyword #1479
- hasOwnProperty check missing in reverseTokens (numericInput) #1486
- Per-element radixPoint overwrites defaults #1454
- Form not cleaning correctly when AutoUnmask option is set to true #1442
- Form can`t submitted with input[name=disabled] #1473

## [3.3.4 - 2016-12-22]

### Addition

- extra extension points: analyseMask
- colorMask option ~ css styleable mask

### Updates

- remove tooltip option
- remove h,s,d,m,y definitions => use the date/time aliases
- phone-alias - fine-tune mask sorting
- make data-inputmask attribute naming configurable (dataAttribute on Inputmask)
- numeric alias move negation symbols to the edges
- handle android predictive text enabled
- rename js/inputmask.dependencyLib.jquery.js to js/inputmask.dependencyLib.js
- rename dist/inputmask.dependencyLib.jquery.js to dist/inputmask.dependencyLib.js
- commonjs dep to inputmask.dependencyLib instead to inputmask.dependencyLib.jquery => can be symlinked to another dependencyLib
- improve inputfallback (Android support)

### Fixed

- IE11 : SCRIPT438: Object doesn't support property or method 'isFinite' #1472
- () as literal followed by an optional, doubles the optional template #1453
- Decimal mask excluding zero with custom RadixPoint and GroupSeparator #1418
- Can't remove dot from the middle of a word #1439
- Invalid Leap Year dates can be entered #1368
- jquery.val returns empty value (when using an unsupported input type) #1415
- Losing the decimal part when the maximum number of digits is reached #1257
- Not allowing to change existing number to 0 #1381
- Numbers get swapped when cursor near suffix. #1278
- androidHack: Caret positioning needs some fine tuning #1412
- How can I get "-$123.45", not "$-123.45"? #1360
- Placeholder color #972
- Other color on placeholder (wrap placeholder in span, using contenteditable?) #873
- Error on 3.3.3: Uncaught TypeError: Cannot set property 'generatedInput' of undefined #1399
- ios 8, safari, on first visit unable to enter any characters #826
- Numerica mask not run in Galaxy S5 + Chrome + Android #1357

## [3.3.3 - 2016-09-09] - hotfix

### Updates

- revert moving jquery dependencyLib
- correct caret positioning - radixFocus & placeholder: ""

### Fixed

- Build failure in heroku after release of 3.3.2 #1384
- Error with inputMask any case (v3.3.2) #1383

## [3.3.2 - 2016-09-09]

### Addition

- mask-level casing => #1352
- 'casing': 'title' #1277
- add quantifier syntax for digits option in numeric alias. #1374

### Updates

- add bundle in nuget package
- change default of positionCaretOnTab to true
- include min files in nuspecs
- better filter for input targets in inputmask.binder.js
- improve alternation selection
- removed nojumps option
- update phone alias implementation
  - add unit tests for phonecodes
- replaced radixFocus option by positionCaretOnClick.  Allows choice for behavior of the caret on click. (none, lvp (default), radixFocus)
- performance updates
  - getmasklength
  - use selective caching in getTests

### Fixed

- Problems with greedy dynamic masks in current version 3.x #1375
- Croatian phone mask only supports city of Zagreb #1359
- Pasting to masked input not working on Android #1061
- Unable to get property 'forwardPosition' of undefined or null reference IE11 #1342
- Input event doesn't fire in IE #1287
- Dynamically changing mask based on number of entered characters #1336
- change addEventListener not fired in IE11 #1310 - inputmask.dependencyLib.js
- Hide mask's items that have multiple options #678
- Bug when typing after a fixed character #1299
- onUnMask is not being called #1291
- How Can I have caret position on decimal digit(after decimal point) for currency inputmask ? #1282
- How to implement mask for these numbers? #840 (alternator)
- 'setvalue' on mask with a suffix results in suffix being doubled, while `$.fn.val` works fine #1267

## [3.3.1] - 2016-04-20

### Updates

- better handle alternator logic by merging the locators
- patchValueProperty - enable native value property patch on IE8/IE9
- speedup insert and delete from characters
- adding extra options through option method => auto apply the mask + add noremask option

### Fixed

- Safari date mask - Context switch when jquery.valhook fallback is used #1255
- Email alias _@_ => _@_._ #1245
- Safari Error: RangeError: Maximum call stack size exceeded #1241
- Safari Maximum call stack size exceeded when inputmask bound twice #1226

## [3.3.0] - 2016-04-05

### Addition

- nullable option => switch to return the placeholder or null when nothing is entered
- VIN mask #1199

### Updates

- also escape []{}() in the prefix and suffix for decimals
- Can not change integer part when it is "0" #1192
- change funtionality of postValidation => result may be true|false
- improve getmetadata
- patchValueProperty - enable native value property patch on IE10/IE11

### Fixed

- PostValidation function fails when using placeholder and digitsOptional is false #1240
- min value issue #1177
- min value for decimal isn't working #1178
- InputMask remove a 0 in left side. (numericInput: true) #1238
- validate regular expression for indian vehicle registration number #1223
- Distinguish empty value and '$ 0.00' value for currency alias #1053
- 'alias': 'numeric', zero value #1221
- Clicking on a highlighted masked field does not set the caret to the first valid position (Chrome) #1218
- Caret Positioned After Last Decimal Digit Disallows Sign Input When digits Option Set #1139
- numeric alias produces "0.00" instead of null when cleared out. #902
- IE8 error: Object doesn't support this property or method #1217
- update negation handling for numeric alias
- NumericInput option can't handle 100.00 #1162
- "0.00" not displayed if "clearMaskOnLostFocus: true" #1171
- Lost zero while replacing a digit in group #1202
- RadixFocus problem #686
- Can not change integer part when it is "0" #1192
- "[object Object]" value after `$element.inputmask('setvalue', '')` call #1208
- Paste does not work properly when using numericInput #1195
- error occurs in safari 9.0.3 (11601.4.4) #1191
- Can not clear value when select all and press BACKSPACE in some circumstance #1179
- Email mask incorrectly including underscore #868 => allowed as not typed => result invalid
- AutoUnmask not working on IE11 #1187
- Email mask not accepting valid emails #971
- Deleting character from input with 'email' alias shifts all data #1052
- Fix some events like paste & cut for Vanilla dependencyLib #1072

## [3.2.7] - 2016-01-28

### Updates

- favor inputfallback for android
- enable IEMobile

### Fixed

- Firefox, Android - cursor jumps to the left in numeric mask #1138
- Issue in Android (Samsung GALAXY S5) #825
- time mask, backspace behavior on android chrome #817
- Android Chrome Browser #867
- Mask issue in Android with Swype Keyboard #692
- Pasting to masked input not working on Android #1061
- Decimal point/comma not working on Android 4.4 #1041
- Doesn't work on Android #1073
- numeric input in mobile #897
- Support for Android default browser #368
- Repeating a character and a number On Mobile #898
- Inputs are ignored on FF 39 on Android 5.0.2 #982
- Phone input mask duplicates each character on Samsung Android tablet #834
- Support for Android default browser #368
- fixed "valids is not defined" error #1166

## [3.2.6] - 2016-01-25

### Addition

- add jitMasking option
- supportsInputType option
- staticDefinitionSymbol (see readme)
- include textarea as a valid masking element

### Updates

- enhance inputfallback ~ merge mobileinputevent
- caching with cache-dependency check in the getTests fn
- implement missing parts in the jqlite DependencyLib
- Remove namespaces for events (simplifies implementing other dependencyLibs, besides jquery)
- update alternation logic

### Fixed

- Windows Phone User unable to set Date #993
- '405 not allowed' error on loading phone-codes.js on certain Ajax configuration. #1156
- Issue with reset of inputmask field #1157
- IE11 clear not working in emulated IE9 mode #1144
- Show placeholder as user types #1141
- Initial value like VAA gets truncated to V-__ with mask like "I{1,3}-ZZ" #1134
- Input mask can't be applied on other HTML5 input types #828
- IE9 SCRIPT445: Object does not support this action #1135
- Multiple Mask Click Focus Error #1133
- Double enter for submit #1131
- Multiple masks #760
- Cursor shifted to the RIGHT align any way. #1088
- No-strict mask #1084
- Inputmask not work with textarea #1128

## [3.2.5] - 2015-11-27

### Updates

- improve cursor positioning and placeholder handling
- remove $("selector").inputmask("mask", { mask: "99-999 ..." }) format from plugin

### Fixed

- Currency validator gives false negative if number of digits in integer part is not multiplier of groupSize #1122
- data-inputmask => mask with optionals not parsed correctly #1119
- Email mask doesn't allow to go to the domain part by mouse #885
- alias options from 'data-inputmask' is not used anymore #1113
- Numeric extensions don't supported with vanilla DependencyLib #1116

## [3.2.4] - 2015-11-20

### Updates

- allow passing an element id to the mask function
- allow passing a selector to the mask function
- fix for bower package

### Fixed

- get the pressed key onKeyValidation #1114
- write a global function for onKeyValidation #1111 => update readme
- NumericInput Causes err #856
- Certain phones not inputable #758
- I have a problems with mask input, I can't input Ukraine phone +380(XX)XXX-XX-XX #1050
- you can't write ukraine number to phone field +380999999999 #1019
- autoUnmask not work in newest release #1109
- Definition {_} throws an exception #1106 => update readme
- Uncaught TypeError for "percentage" alias #1108
- Wrong behavior for symbol delete in ip alias #1092
- fix element validation for the vanilla dependencyLib #1104

## [3.2.3] - 2015-11-09

### Addition

- Inputmask.remove
- inputmask.binding => automated inputmask binding for html attributes
- Add tooltip option

### Updates

- fix bug in maskscache - context mixing
- allow passing multiple inputs to mask function
- Improve handling of compositionevents
- improve extendAliases, extendDefinitions, extendDefaults

### Fixed

- Cannot erase input value throw mask symbols (Android 4.4, Android 4.2) #1090
- CTRL-x / Cut issue #948
- Double "Change" action when pressing Enter in Firefox #1070
- upper/lower case handling in data-inputmask-* #1079
- IE8 Null values after submit #1076
- Each character repeats on Mobile #912
- extra tooltip property #1071
- Numeric aliases insert '0' in input after clearing if there was fraction part #1067
- Clear optional tail in getvalue. See #1055 #1065

## [3.2.2] - 2015-10-07

### Fixed

- Missing comma in bower.json and component.json #1064

## [3.2.1] - 2015-10-07

### Addition

- inputmask.dependencyLib.jquery
- inputmask.dependencyLib.jqlite

### Updates

- namespace dependencyLib => inputmask.dependencyLib
- fix jquery.inputmask.bundle.js
- fix dependency paths for browserify
- update files to be included for package.json, bower.json, component.json

### Fixed

- oncomplete not called when set with option function #1033
- oncompleate set value incorrect action #1039
- JQuery dependency #517
- IsValid on Optional Mask returning false #1055
- Focus loop on IE9 with numeric.extensions #989
- Currency with autogroup and no digits not working #1062
- field input width characters cropped while writing #1060 (regression fix)
- DependencyLib error in Internet Explorer #1047
- Dynamically switching mask in same input box not functioning as expected #1016
- 3.2.0 Error extendDefinitions and extendAliases not functions #1024
- Browserify error: `Error: Cannot find module 'inputmask' from '/Users/.../node_modules/jquery.inputmask/dist/inputmask` #1030
- Invalid JSON phone-uk.js #1025

## [3.2.0] - 2015-09-04

### Addition

- add option command to set and retrieve options on an inputmask
- dependencyLib wrapper around needed jQuery functionality
- mac address alias #986
- tabThrough option - Tab and autoselect mask parts #433
- eslint testing in grunt validate task
- $.fn.inputmask("setvalue", value)
- jquery.clone support (also see $.fn.inputmask("setvalue", value))
- hexadecimal definition (# in inputmask.extensions.js)
- positionCaretOnTab option
- Inputmask.unmask
- numeric alias - increment/decrement by ctrl-up/ctrl-down
- numeric alias - round values
- percentage alias
- Inputmask class
- setting defaults / definitions / aliases
  - Inputmask.extendDefaults
  - Inputmask.extendDefinitions
  - Inputmask.extendAliases

### Updates

- enhance caret positioning behavior & radicFocus
- change alfanumeric uppercase definition from # to &
- numericInput option also possible on dynamic-masks
- remove $.inputmask in favor of Inputmask class
- remove "jquery." in the naming of the extensions to better reflect their denpendency
- separate jquery plugin code from the inputmask core (first step to remove jquery dependency from the inputmask core)
- Update placeholder handling

### Fixed

- Mask cleared on ajax submit or jquery unobtrusive validation error #1020
- Update readme for numerics #994
- extra zeros in currency alias #1008
- masks parsing generate a Maximum call stack size exceeded #1007
- Issue using datamask-input attributes and event handlers #992
- Set specific inputmask option on already initialized control #949
- Money question #644
- Decimal numbers with fixed decimal part #990
- Focus loop on IE9 with numeric.extensions #989
- Numeric inputs with default value are setted to blank when submit the form #983
- Default Enter key function getting lost on an input mask text field #938
- Add JSHint and JSCS #879 => used eslint instead
- On google chrome, cannot use jquery to clone the inputmask control with data and events #713
- Cannot overwrite characters when highlighting the characters to the right of the decimal #974
- Decimal mask accepts "123,456." (RadixPoint with no number after it) #973
- Make numericInput work with complex masks #963
- Auto position cursor at end of data on focus #965
- Decimal separator conversion #919
- Entering a period on a blank 'numeric' alias input not allowed #888
- Typing 1000 becomes 1.00 using groupSeparator="." #959
- phone-codes.js is missing when installing with bower #937
- Repeat function doesn't work for dynamic masks #960
- Provide convenient method to unmask value #929
- Min value doesn't work with allowMinus #951
- Escape value is inconsistent after mask #935
- Escape optional marker, quantifiable marker, alternator marker and backslash not working #930
- Is numeric carret position broken? #928
- Decimal looses digits #924
- Firefox: cursor jumps to the right when clicking anywhere on the value #921
- Numeric inputMask doesn't rounds value #754
- <strike>Chinese / Japanese characters are unable to mask #198</strike>
- <strike>Infinite Loop on IE (v11) when using Japanese IME Keyboard #749</strike>
- Delete key not working properly #799
- Selecting and overwriting text will delete the character to the immediate right #914
- Can't delete digits after decimal point on negative numbers #892
- decimal : extra number after delete and typing new numbers #904
- Dynamic masks with {*} and zero repeats #875
- Mask does not alternate back after deleting digit #905
- never trigger 'input' event when paste after invoke inputmask #776
- Script looping start when add '.' between decimal values #870 ('.' part)

## [3.1.63] - 2015-05-04

### Addition

- Support for CommonJS (Browserify)

### Updates

- Allow masking the text content of other html-elements (other then div)
- Make alternators correctly handle alternations with different lengths
- better determine the last required position with multiple masks

### Fixed

- Script looping start when add '.' between decimal values #870 (script loop)
- Static masks fails when we set value="2015" for an input field where data-inputmask was "2999" #903
- contenteditable decimal #882
- Tab out does not work when element is readonly #884
- Change mask default for allowPlus and allowMinus #896
- Browser hangs after trying to type some additional digits at the start of a date field #876
- inputmask decimal with integerDigits or digits with maxlength can cause Browser freezed #889
- masking a password field #821 (reenable type=password)
- email inputmask "isComplete" always returns true #855
- When two masks specified backspace clears the whole input instead of last char #780
- Phone extention backspace problem #454

## [3.1.62] - 2015-03-26

### Addition

- Numeric alias: add unmaskAsNumber option
- import russian phone codes from inputmask-multi
- enable masking the text content in a div
- enable contenteditable elements for inputmask
- Update Command object to handle inserts and allow for multiple removes
- Add a change log
- Add Component package manager support - component.json

### Fixed

- updating a value on onincomplete event doesn't work #955
- $.inputmask.isValid("1A", { mask : "1A" }) returns false #858
- IE8 doesn't support window.getSelection js error #853
- Email with dot - paste not working #847
- Standard phone numbers in Brazil #836 (Part 1)
- Sequentional optional parts do not fully match #699
- How i fix that number problem? #835
- Form reset doesn't get same value as initial mask #842
- Numeric extension doesn't seem to support min/max values #830
- Numeric max filter #837
- Mask cache - 2 definitions for same mask #831
- Adding parentheses as a negative format for Decimal and Integer aliases (100) #451
- Should not allow "-" or "+" as numbers #815
- isComplete erroneously returning false when backspacing with an optional mask #824

## [3.1.61] - 2015-02-05

Initial start of a changelog

See commits for previous history.
