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
    displayChar?: string;
    nativeDef: string;
    generated?: boolean;
};
/**
 * The generated maskset for a mask.
 */
export type Maskset = {
    mask: string;
    /**
     * compiled full-string regex for the regex mask
     */
    wholeRegex?: RegExp | null | undefined;
    /**
     * true when the mask is one definition with an unlimited quantifier, so every position shares the same test
     */
    positionIndependent?: boolean;
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
 * @param {import("./defaults").InputmaskOptions} opts
 * @param {boolean} nocache
 * @returns {Maskset}
 */
export function generateMaskSet(opts: import("./defaults").InputmaskOptions, nocache: boolean): Maskset;
