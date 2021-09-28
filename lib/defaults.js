import keyCode from "./keycode.json";

export default {
	_maxTestPos: 500,
	placeholder: "_",
	optionalmarker: ["[", "]"],
	quantifiermarker: ["{", "}"],
	groupmarker: ["(", ")"],
	alternatormarker: "|",
	escapeChar: "\\",
	mask: null, //needs tobe null instead of undefined as the extend method does not consider props with the undefined value
	regex: null, //regular expression as a mask
	oncomplete: () => {
	}, //executes when the mask is complete
	onincomplete: () => {
	}, //executes when the mask is incomplete and focus is lost
	oncleared: () => {
	}, //executes when the mask is cleared
	repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
	greedy: false, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
	autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
	removeMaskOnSubmit: false, //remove the mask before submitting the form.
	clearMaskOnLostFocus: true,
	insertMode: true, //insert the input or overwrite the input
	insertModeVisual: true, //show selected caret when insertmode = false
	clearIncomplete: false, //clear the incomplete input on blur
	alias: null,
	onKeyDown: () => {
	}, //callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
	onBeforeMask: null, //executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
	onBeforePaste: function (pastedValue, opts) {
		return typeof opts.onBeforeMask === "function" ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
	}, //executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
	onBeforeWrite: null, //executes before writing to the masked element. args => event, opts
	onUnMask: null, //executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
	showMaskOnFocus: true, //show the mask-placeholder when the input has focus
	showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
	onKeyValidation: () => {
	}, //executes on every key-press with the result of isValid. Params: key, result, opts
	skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
	numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
	rightAlign: false, //align to the right
	undoOnEscape: true, //pressing escape reverts the value to the value before focus
	//numeric basic properties
	radixPoint: "", //".", // | ","
	_radixDance: false, //dance around the radixPoint
	groupSeparator: "", //",", // | "."
	//numeric basic properties
	keepStatic: null, //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible
	positionCaretOnTab: true, //when enabled the caret position is set after the latest valid position on TAB
	tabThrough: false, //allows for tabbing through the different parts of the masked field
	supportsInputType: ["text", "tel", "url", "password", "search"], //list with the supported input types
	//specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
	ignorables: [
		keyCode.BACKSPACE,
		keyCode.TAB,
		keyCode["PAUSE/BREAK"],
		keyCode.ESCAPE,
		keyCode.PAGE_UP,
		keyCode.PAGE_DOWN,
		keyCode.END,
		keyCode.HOME,
		keyCode.LEFT,
		keyCode.UP,
		keyCode.RIGHT,
		keyCode.DOWN,
		keyCode.INSERT,
		keyCode.DELETE,
		93,
		112,
		113,
		114,
		115,
		116,
		117,
		118,
		119,
		120,
		121,
		122,
		123,
		0,
		229
	],
	isComplete: null, //override for isComplete - args => buffer, opts - return true || false
	preValidation: null, //hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts, maskset, caretPos, strict => return true/false/command object
	postValidation: null, //hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval => return true/false/json
	staticDefinitionSymbol: undefined, //specify a definitionSymbol for static content, used to make matches for alternators
	jitMasking: false, //just in time masking ~ only mask while typing, can n (number), true or false
	nullable: true, //return nothing instead of the buffertemplate when the user hasn't entered anything.
	inputEventOnly: false, //dev option - testing inputfallback behavior
	noValuePatching: false, //disable value property patching
	positionCaretOnClick: "lvp", //none, lvp (based on the last valid position (default), radixFocus (position caret to radixpoint on initial click), select (select the whole input), ignore (ignore the click and continue the mask)
	casing: null, //mask-level casing. Options: null, "upper", "lower" or "title" or callback args => elem, test, pos, validPositions return charValue
	inputmode: "text", //specify the inputmode
	importDataAttributes: true, //import data-inputmask attributes
	shiftPositions: true, //shift position of the mask entries on entry and deletion.
	usePrototypeDefinitions: true, //use the default defined definitions from the prototype
	validationEventTimeOut: 3000, //Time to show validation error on form submit
	substitutes: {} //define character substitutes
};