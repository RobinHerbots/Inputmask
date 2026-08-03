export default DependencyLib;
declare function DependencyLib(elem: any): DependencyLib | {
    on: typeof on;
    off: typeof off;
    trigger: typeof trigger;
};
declare class DependencyLib {
    constructor(elem: any);
    0: any;
    on: typeof on;
    off: typeof off;
    trigger: typeof trigger;
}
declare namespace DependencyLib {
    export { extend, data, Event };
}
import { on } from "./events";
import { off } from "./events";
import { trigger } from "./events";
import extend from "./extend";
import data from "./data";
import { Event } from "./events";
