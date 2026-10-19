export function caret(input: any, begin: any, end: any, notranslate: any, isDelete: any): {
    begin: any;
    end: any;
};
export function determineLastRequiredPosition(returnDefinition: any): any;
export function determineNewCaretPosition(selectedCaret: any, tabbed: any, positionCaretOnClick: any): any;
export function getBuffer(noCache: any): any;
export function getBufferTemplate(): any;
export function getLastValidPosition(closestTo: any, strict: any, validPositions: any): number;
export function isMask(pos: any, strict: any, fuzzy: any): any;
export function resetMaskSet(soft: any): void;
export function seekNext(pos: any, newBlock: any, fuzzy: any): any;
export function seekPrevious(pos: any, newBlock: any): number;
export function translatePosition(pos: any): any;
