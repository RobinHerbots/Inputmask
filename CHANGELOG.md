# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- hexadecimal definition (# in inputmask.extensions.js)
- positionCaretOnTab option
- inputmask.unmask
- numeric alias - increment/decrement by ctrl-up/ctrl-down
- numeric alias - round values
- percentage alias
- inputmask class
- setting defaults / definitions / aliases
  - inputmask.extendDefaults
  - inputmask.extendDefinitions
  - inputmask.extendAliases

### Updates
- change alfanumeric uppercase definition from # to +
- numericInput option also possible on dynamic-masks
- remove $.inputmask in favor of inputmask class
- remove "jquery." in the naming of the extensions to better reflect their denpendency
- separate jquery plugin code from the inputmask core (first step to remove jquery dependency from the inputmask core)
- Update placeholder handling

### Fixed
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
