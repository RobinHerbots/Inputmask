export function renderColorMask(input: any, caretPos: any, clear: any): void;
export default Colormask;
declare function Colormask(alias: any, options: any, internal: any): Colormask;
declare class Colormask {
    constructor(alias: any, options: any, internal: any);
    colorMask: any;
    writeBufferHook(caretPos: any): void;
    caretHook(caretPos: any): void;
    applyMaskHook(): void;
    keyEventHook(e: any): void;
}
