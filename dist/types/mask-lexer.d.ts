/**
 * A single test definition of the mask.
 */
export type MaskTest = {
    fn: RegExp | {
        test: (char: string) => boolean;
    } | null;
    static: boolean;
    optionality: boolean;
    /**
     * indicator for an optional from the definition
     */
    defOptionality?: boolean;
    newBlockMarker: "master" | boolean;
    casing?: "upper" | "lower" | "title" | "follow" | null | ((elem: HTMLElement, test: MaskTest, pos: number, validPositions: any) => string);
    def: string;
    placeholder?: string;
    nativeDef: string;
    generated?: boolean;
};
/**
 * The generated maskset for a mask.
 */
export type Maskset = {
    mask: string;
    maskToken: import("./masktoken").MaskToken[];
    validPositions: any[];
    _buffer: string[] | undefined;
    buffer: string[] | undefined;
    tests: Record<number, any>;
    /**
     * excluded alternations
     */
    excludes: Record<number, any[]>;
    metadata: any;
    maskLength: number | undefined;
    jitOffset: Record<number, number>;
};
/**
 * A single test definition of the mask.
 *
 * @typedef {Object} MaskTest
 * @property {RegExp | { test: (char: string) => boolean } | null} fn
 * @property {boolean} static
 * @property {boolean} optionality
 * @property {boolean} [defOptionality] indicator for an optional from the definition
 * @property {"master" | boolean} newBlockMarker
 * @property {"upper" | "lower" | "title" | "follow" | null | ((elem: HTMLElement, test: MaskTest, pos: number, validPositions: any) => string)} [casing]
 * @property {string} def
 * @property {string} [placeholder]
 * @property {string} nativeDef
 * @property {boolean} [generated]
 */
/**
 * The generated maskset for a mask.
 *
 * @typedef {Object} Maskset
 * @property {string} mask
 * @property {import("./masktoken").MaskToken[]} maskToken
 * @property {any[]} validPositions
 * @property {string[] | undefined} _buffer
 * @property {string[] | undefined} buffer
 * @property {Record<number, any>} tests
 * @property {Record<number, any[]>} excludes excluded alternations
 * @property {any} metadata
 * @property {number | undefined} maskLength
 * @property {Record<number, number>} jitOffset
 */
/**
 * @param {import("./defaults").InputmaskOptions} opts
 * @param {boolean} nocache
 * @returns {Maskset}
 */
export function generateMaskSet(opts: import("./defaults").InputmaskOptions, nocache: boolean): Maskset;
