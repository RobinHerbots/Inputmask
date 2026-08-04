export default InputmaskExport;
export type InputmaskOptions = any;
export type InputmaskElements = Element | Element[] | NodeList | string;
export type InputmaskInstance = {
    isRTL: boolean;
    mask: (elems: InputmaskElements) => InputmaskInstance | any;
    option: (options: keyof InputmaskOptions | InputmaskOptions, noremask?: boolean) => any;
    unmaskedvalue: (value?: string) => string;
    remove: () => Element | undefined;
    getemptymask: () => string;
    hasMaskedValue: () => boolean;
    isComplete: () => boolean;
    getmetadata: () => any;
    isValid: (value?: string) => boolean;
    format: (value: string, metadata?: boolean) => string | {
        value: string;
        metadata: any;
    };
    setValue: (value: string) => void;
};
export type InputmaskStatic = ((alias?: string | InputmaskOptions, options?: InputmaskOptions, internal?: boolean) => InputmaskInstance) & {
    extendDefaults: (options: InputmaskOptions) => void;
    extendDefinitions: (definition: Record<string, any>) => void;
    extendAliases: (alias: Record<string, InputmaskOptions>) => void;
    format: (value: string, options?: InputmaskOptions, metadata?: boolean) => string | {
        value: string;
        metadata: any;
    };
    unmask: (value: string, options?: InputmaskOptions) => string;
    isValid: (value: string, options?: InputmaskOptions) => boolean;
    remove: (elems: InputmaskElements) => void;
    setValue: (elems: InputmaskElements, value: string) => void;
    dependencyLib: any;
};
export const masksCache: {};
declare const InputmaskExport: InputmaskStatic;
