/**
 * @typedef {object} InputmaskChangePayload
 * @property {string} value Model value: the input.value, which is unmasked when `autoUnmask` is enabled.
 * @property {string} maskedValue Value as displayed in the input.
 * @property {string} unmaskedValue Value with the mask literals removed.
 * @property {boolean} isComplete Whether the mask is completely filled in.
 * @property {Event | undefined} event The native event that triggered the change.
 */
/**
 * @typedef {object} InputmaskAdapter
 * @property {() => any} mount Attach the mask. Idempotent.
 * @property {(options?: object) => void} update Apply new options. Remasks only when a non-function option changed.
 * @property {() => void} destroy Remove the mask and restore the native value property.
 * @property {(value: string, caretPos?: number) => void} setValue Programmatic value update.
 * @property {() => any} getInstance The live Inputmask element instance, if mounted.
 * @property {() => string} getValue The current value as exposed by the (patched) input.value.
 * @property {() => string} getUnmaskedValue The current value without mask literals.
 * @property {() => boolean} isComplete Whether the mask is completely filled in.
 * @property {(listener: (payload: InputmaskChangePayload) => void) => () => void} on Subscribe to value changes. Returns an unsubscribe function.
 */
/**
 * Create a framework-agnostic controller for a single element.
 * @param {HTMLElement} el
 * @param {object} [options]
 * @returns {InputmaskAdapter}
 */
export function createInputmaskAdapter(el: HTMLElement, options?: object): InputmaskAdapter;
export type InputmaskChangePayload = {
    /**
     * Model value: the input.value, which is unmasked when `autoUnmask` is enabled.
     */
    value: string;
    /**
     * Value as displayed in the input.
     */
    maskedValue: string;
    /**
     * Value with the mask literals removed.
     */
    unmaskedValue: string;
    /**
     * Whether the mask is completely filled in.
     */
    isComplete: boolean;
    /**
     * The native event that triggered the change.
     */
    event: Event | undefined;
};
export type InputmaskAdapter = {
    /**
     * Attach the mask. Idempotent.
     */
    mount: () => any;
    /**
     * Apply new options. Remasks only when a non-function option changed.
     */
    update: (options?: object) => void;
    /**
     * Remove the mask and restore the native value property.
     */
    destroy: () => void;
    /**
     * Programmatic value update.
     */
    setValue: (value: string, caretPos?: number) => void;
    /**
     * The live Inputmask element instance, if mounted.
     */
    getInstance: () => any;
    /**
     * The current value as exposed by the (patched) input.value.
     */
    getValue: () => string;
    /**
     * The current value without mask literals.
     */
    getUnmaskedValue: () => string;
    /**
     * Whether the mask is completely filled in.
     */
    isComplete: () => boolean;
    /**
     * Subscribe to value changes. Returns an unsubscribe function.
     */
    on: (listener: (payload: InputmaskChangePayload) => void) => () => void;
};
