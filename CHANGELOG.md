# Change Log
All notable changes to this project will be documented in this file.

## [3.2.7] - 2016-01-28 
### Updates
- favor inputfallback for android
- enable IEMobile

### Fixed
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
### Added
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

### Added
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

### Added
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

### Added
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
### Added
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
### Added
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
