export default defaults;
/**
 * Public options surface for Inputmask instances.
 */
export type InputmaskOptions = {
    _maxTestPos?: number;
    placeholder?: string;
    optionalmarker?: string[] | [string, string];
    quantifiermarker?: string[] | [string, string];
    groupmarker?: string[] | [string, string];
    alternatormarker?: string;
    escapeChar?: string;
    mask?: string | null;
    regex?: string | null;
    oncomplete?: (event?: Event) => void;
    onincomplete?: (event?: Event) => void;
    oncleared?: (event?: Event) => void;
    repeat?: number | string;
    greedy?: boolean;
    autoUnmask?: boolean;
    removeMaskOnSubmit?: boolean;
    clearMaskOnLostFocus?: boolean;
    insertMode?: boolean;
    insertModeVisual?: boolean;
    clearIncomplete?: boolean;
    alias?: string | null;
    onKeyDown?: (event: Event, buffer: string[], caretPos: number, opts: InputmaskOptions) => void;
    onBeforeMask?: ((initialValue: string, opts: InputmaskOptions) => string) | null;
    onBeforePaste?: (pastedValue: string, opts: InputmaskOptions) => string;
    onBeforeWrite?: ((event: Event | undefined, buffer: string[], caretPos: number, opts: InputmaskOptions) => any) | null;
    onUnMask?: ((maskedValue: string, unmaskedValue: string, opts: InputmaskOptions) => string) | null;
    outputMask?: string | null;
    showMaskOnFocus?: boolean;
    showMaskOnHover?: boolean;
    onKeyValidation?: (key: string, result: boolean, opts: InputmaskOptions) => void;
    skipOptionalPartCharacter?: string;
    numericInput?: boolean;
    rightAlign?: boolean;
    undoOnEscape?: boolean;
    radixPoint?: string;
    _radixDance?: boolean;
    groupSeparator?: string;
    keepStatic?: boolean | null;
    positionCaretOnTab?: boolean;
    tabThrough?: boolean;
    supportsInputType?: string[];
    isComplete?: ((buffer: string[], opts: InputmaskOptions) => boolean) | null;
    preValidation?: ((buffer: string[], pos: number, char: string, isSelection: boolean, opts: InputmaskOptions, maskset: any, caretPos: number, strict: boolean) => boolean | any) | null;
    postValidation?: ((buffer: string[], pos: number, char: string, currentResult: boolean | any, opts: InputmaskOptions, maskset: any, strict: boolean, fromCheckval: boolean, fromAlternate: boolean) => boolean | any) | null;
    staticDefinitionSymbol?: string | undefined;
    jitMasking?: boolean | number;
    nullable?: boolean;
    inputEventOnly?: boolean;
    noValuePatching?: boolean;
    positionCaretOnClick?: "none" | "lvp" | "radixFocus" | "select" | "ignore";
    casing?: "upper" | "lower" | "title" | "follow" | ((elem: HTMLElement, test: any, pos: number, validPositions: any) => string) | null;
    inputmode?: string;
    importDataAttributes?: boolean;
    shiftPositions?: boolean;
    usePrototypeDefinitions?: boolean;
    validationEventTimeOut?: number;
    substitutes?: Record<string, string>;
};
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
 * @property {((buffer: string[], pos: number, char: string, currentResult: boolean | Object, opts: InputmaskOptions, maskset: any, strict: boolean, fromCheckval: boolean, fromAlternate: boolean) => boolean | Object) | null} [postValidation]
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
declare const defaults: InputmaskOptions;
