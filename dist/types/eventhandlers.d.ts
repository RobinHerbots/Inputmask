export namespace EventHandlers {
    function keyEvent(e: any, checkval: any, writeOut: any, strict: any, ndx: any): any;
    function keypressEvent(e: any, checkval: any, writeOut: any, strict: any, ndx: any): any;
    function pasteEvent(e: any): Promise<void>;
    function inputFallBackEvent(e: any): boolean;
    function setValueEvent(e: any, ...args: any[]): void;
    function focusEvent(e: any): void;
    function invalidEvent(e: any): void;
    function mouseleaveEvent(): void;
    function clickEvent(e: any, tabbed: any): void;
    function cutEvent(e: any): void;
    function blurEvent(e: any): void;
    function mouseenterEvent(): void;
    function submitEvent(): void;
    function resetEvent(): void;
}
