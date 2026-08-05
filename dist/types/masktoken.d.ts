/**
 * A token of a parsed mask tree.
 *
 * @typedef {Object} MaskToken
 * @property {Array<MaskToken | import("./mask-lexer").MaskTest>} matches
 * @property {boolean} openGroup
 * @property {boolean} alternatorGroup
 * @property {boolean} isGroup
 * @property {boolean} isOptional
 * @property {boolean} isQuantifier
 * @property {boolean} isAlternator
 * @property {{ min: number | string; max: number | string; jit?: number | string }} quantifier
 */
export default function _default(isGroup: any, isOptional: any, isQuantifier: any, isAlternator: any): void;
export default class _default {
    /**
     * A token of a parsed mask tree.
     *
     * @typedef {Object} MaskToken
     * @property {Array<MaskToken | import("./mask-lexer").MaskTest>} matches
     * @property {boolean} openGroup
     * @property {boolean} alternatorGroup
     * @property {boolean} isGroup
     * @property {boolean} isOptional
     * @property {boolean} isQuantifier
     * @property {boolean} isAlternator
     * @property {{ min: number | string; max: number | string; jit?: number | string }} quantifier
     */
    constructor(isGroup: any, isOptional: any, isQuantifier: any, isAlternator: any);
    matches: any[];
    openGroup: any;
    alternatorGroup: boolean;
    isGroup: any;
    isOptional: any;
    isQuantifier: any;
    isAlternator: any;
    quantifier: {
        min: number;
        max: number;
    };
}
/**
 * A token of a parsed mask tree.
 */
export type MaskToken = {
    matches: Array<MaskToken | import("./mask-lexer").MaskTest>;
    openGroup: boolean;
    alternatorGroup: boolean;
    isGroup: boolean;
    isOptional: boolean;
    isQuantifier: boolean;
    isAlternator: boolean;
    quantifier: {
        min: number | string;
        max: number | string;
        jit?: number | string;
    };
};
