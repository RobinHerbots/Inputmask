/**
 * fromAlternate tells whether the current validation runs as part of an alternation
 * (mask branch switch).
 * - `undefined` (or `false`): not alternating
 * - `true`: validating after an alternation decision was already made at the top level
 * - a number: an alternation re-insert is in progress; the value is the number of inputs
 *   still to be written, including the current one (`validInputs.length - i`, where `i` is
 *   the index of the input being re-inserted). A count of `1` marks the final write, so
 *   final constraints (e.g. numeric min/max) must be enforced on it.
 * @typedef {boolean | number | undefined} FromAlternate
 */

/**
 * Public options surface for Inputmask instances.
 *
 * @typedef {Object} InputmaskOptions
 * @property {number} [_maxTestPos]
 * @property {string} [placeholder]
 * @property {string[] | [string, string]} [optionalmarker]
 * @property {string[] | [string, string]} [quantifiermarker]
 * @property {string[] | [string, string]} [groupmarker]
 * @property {string} [alternatormarker]
 * @property {string} [escapeChar]
 * @property {string | null} [mask]
 * @property {string | null} [regex]
 * @property {(event?: Event) => void} [oncomplete]
 * @property {(event?: Event) => void} [onincomplete]
 * @property {(event?: Event) => void} [oncleared]
 * @property {number | string} [repeat]
 * @property {boolean} [greedy]
 * @property {boolean} [autoUnmask]
 * @property {boolean} [removeMaskOnSubmit]
 * @property {boolean} [clearMaskOnLostFocus]
 * @property {boolean} [insertMode]
 * @property {boolean} [insertModeVisual]
 * @property {boolean} [clearIncomplete]
 * @property {string | null} [alias]
 * @property {(event: Event, buffer: string[], caretPos: number, opts: InputmaskOptions) => void} [onKeyDown]
 * @property {((initialValue: string, opts: InputmaskOptions) => string) | null} [onBeforeMask]
 * @property {(pastedValue: string, opts: InputmaskOptions) => string} [onBeforePaste]
 * @property {((event: Event | undefined, buffer: string[], caretPos: number, opts: InputmaskOptions) => any) | null} [onBeforeWrite]
 * @property {((maskedValue: string, unmaskedValue: string, opts: InputmaskOptions) => string) | null} [onUnMask]
 * @property {string | null} [outputMask]
 * @property {boolean} [showMaskOnFocus]
 * @property {boolean} [showMaskOnHover]
 * @property {(key: string, result: boolean, opts: InputmaskOptions) => void} [onKeyValidation]
 * @property {string} [skipOptionalPartCharacter]
 * @property {boolean} [numericInput]
 * @property {boolean} [rightAlign]
 * @property {boolean} [undoOnEscape]
 * @property {string} [radixPoint]
 * @property {boolean} [_radixDance]
 * @property {string} [groupSeparator]
 * @property {boolean | null} [keepStatic]
 * @property {boolean} [positionCaretOnTab]
 * @property {boolean} [tabThrough]
 * @property {string[]} [supportsInputType]
 * @property {((buffer: string[], opts: InputmaskOptions) => boolean) | null} [isComplete]
 * @property {((buffer: string[], pos: number, char: string, isSelection: boolean, opts: InputmaskOptions, maskset: any, caretPos: number, strict: boolean) => boolean | Object) | null} [preValidation]
 * @property {((buffer: string[], pos: number, char: string, currentResult: boolean | Object, opts: InputmaskOptions, maskset: any, strict: boolean, fromCheckval: boolean, fromAlternate: FromAlternate) => boolean | Object) | null} [postValidation]
 * @property {string | undefined} [staticDefinitionSymbol]
 * @property {boolean | number} [jitMasking]
 * @property {boolean} [nullable]
 * @property {boolean} [inputEventOnly]
 * @property {boolean} [noValuePatching]
 * @property {"none" | "lvp" | "radixFocus" | "select" | "ignore"} [positionCaretOnClick]
 * @property {"upper" | "lower" | "title" | "follow" | ((elem: HTMLElement, test: any, pos: number, validPositions: any) => string) | null} [casing]
 * @property {string} [inputmode]
 * @property {boolean} [importDataAttributes]
 * @property {boolean} [shiftPositions]
 * @property {boolean} [usePrototypeDefinitions]
 * @property {number} [validationEventTimeOut]
 * @property {Record<string, string>} [substitutes]
 */

/** @type {InputmaskOptions} */
const defaults = {
  _maxTestPos: 500,
  placeholder: "_",
  optionalmarker: ["[", "]"],
  quantifiermarker: ["{", "}"],
  groupmarker: ["(", ")"],
  alternatormarker: "|",
  escapeChar: "\\",
  mask: null, // needs tobe null instead of undefined as the extend method does not consider props with the undefined value
  regex: null, // regular expression as a mask
  oncomplete: () => {}, // executes when the mask is complete
  onincomplete: () => {}, // executes when the mask is incomplete and focus is lost
  oncleared: () => {}, // executes when the mask is cleared
  repeat: 0, // repetitions of the mask: * ~ forever, otherwise specify an integer
  greedy: false, // true: allocated buffer for the mask and repetitions - false: allocate only if needed
  autoUnmask: false, // automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
  removeMaskOnSubmit: false, // remove the mask before submitting the form.
  clearMaskOnLostFocus: true,
  insertMode: true, // insert the input or overwrite the input
  insertModeVisual: true, // show selected caret when insertmode = false
  clearIncomplete: false, // clear the incomplete input on blur
  alias: null,
  onKeyDown: () => {}, // callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
  onBeforeMask: null, // executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
  onBeforePaste: function (pastedValue, opts) {
    return typeof opts.onBeforeMask === "function"
      ? opts.onBeforeMask.call(this, pastedValue, opts)
      : pastedValue;
  }, // executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
  onBeforeWrite: null, // executes before writing to the masked element. args => event, opts
  onUnMask: null, // executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
  outputMask: null, // mask to apply when unmasking
  showMaskOnFocus: true, // show the mask-placeholder when the input has focus
  showMaskOnHover: true, // show the mask-placeholder when hovering the empty input
  onKeyValidation: () => {}, // executes on every key-press with the result of isValid. Params: key, result, opts
  skipOptionalPartCharacter: " ", // a character which can be used to skip an optional part of a mask
  numericInput: false, // numericInput input direction style (input shifts to the left while holding the caret position)
  rightAlign: false, // align to the right
  undoOnEscape: true, // pressing escape reverts the value to the value before focus
  // numeric basic properties
  radixPoint: "", // ".", // | ","
  _radixDance: false, // dance around the radixPoint
  groupSeparator: "", // ",", // | "."
  // numeric basic properties
  keepStatic: null, // try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible
  positionCaretOnTab: true, // when enabled the caret position is set after the latest valid position on TAB
  tabThrough: false, // allows for tabbing through the different parts of the masked field
  supportsInputType: ["text", "tel", "url", "password", "search"], // list with the supported input types
  isComplete: null, // override for isComplete - args => buffer, opts - return true || false
  preValidation: null, // hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts, maskset, caretPos, strict => return true/false/command object
  postValidation: null, // hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval, fromAlternate (number of inputs still to write during an alternation, otherwise undefined) => return true/false/json
  staticDefinitionSymbol: undefined, // specify a definitionSymbol for static content, used to make matches for alternators
  jitMasking: false, // just in time masking ~ only mask while typing, can n (number), true or false
  nullable: true, // return nothing instead of the buffertemplate when the user hasn't entered anything.
  inputEventOnly: false, // dev option - testing inputfallback behavior
  noValuePatching: false, // disable value property patching
  positionCaretOnClick: "lvp", // none, lvp (based on the last valid position (default), radixFocus (position caret to radixpoint on initial click), select (select the whole input), ignore (ignore the click and continue the mask)
  casing: null, // mask-level casing. Options: null, "upper", "lower" or "title" or "follow" or callback args => elem, test, pos, validPositions return charValue
  inputmode: "text", // specify the inputmode
  importDataAttributes: true, // import data-inputmask attributes
  shiftPositions: true, // shift position of the mask entries on entry and deletion.
  usePrototypeDefinitions: true, // use the default defined definitions from the prototype
  validationEventTimeOut: 3000, // Time to show validation error on form submit
  substitutes: {} // define character substitutes
};

export default defaults;
