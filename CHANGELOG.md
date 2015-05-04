# Change Log
All notable changes to this project will be documented in this file.

## [3.1.63] - 2015-05-04
### Added
- Support for CommonJS (Browserify)

### Updates
- Allow masking the text content of other html-elements (other then div)
- Make alternators correctly handle alternations with different lengths
- better determine the last required position with multiple masks

### Fixed
- Edit New issue
Static masks fails when we set value="2015" for an input field where data-inputmask was "2999" #903
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
