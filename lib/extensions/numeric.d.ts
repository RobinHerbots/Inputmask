import type { InputmaskOptions } from "inputmask";

/**
 * Extra options supported by the numeric-related aliases.
 * These options are consumed after importing "inputmask/extensions/numeric".
 */
export interface NumericAliasOptions extends InputmaskOptions {
  /** Alias selector, typically "numeric", "currency", "decimal", "integer", etc. */
  alias?: string;
  digits?: number | string;
  digitsOptional?: boolean;
  enforceDigitsOnBlur?: boolean;
  radixPoint?: string;
  groupSeparator?: string;
  allowMinus?: boolean;
  prefix?: string;
  suffix?: string;
  min?: number | string | null;
  max?: number | string | null;
  step?: number;
  inputType?: "text" | "number";
  unmaskAsNumber?: boolean;
  inputmode?: string;
  /** Shortcut map such as { k: "1000", m: "1000000" }. */
  shortcuts?: Record<string, string>;
  stripLeadingZeroes?: boolean;
  substituteRadixPoint?: boolean;
}

/** Returns the options for a numeric mask without registering the alias. */
export declare function numeric(
  options?: Partial<NumericAliasOptions>
): NumericAliasOptions;
/** Returns the options for a currency mask without registering the alias. */
export declare function currency(
  options?: Partial<NumericAliasOptions>
): NumericAliasOptions;
/** Returns the options for a decimal mask without registering the alias. */
export declare function decimal(
  options?: Partial<NumericAliasOptions>
): NumericAliasOptions;
/** Returns the options for an integer mask without registering the alias. */
export declare function integer(
  options?: Partial<NumericAliasOptions>
): NumericAliasOptions;
/** Returns the options for a percentage mask without registering the alias. */
export declare function percentage(
  options?: Partial<NumericAliasOptions>
): NumericAliasOptions;
/** Returns the options for an Indian numbering system mask without registering the alias. */
export declare function indianns(
  options?: Partial<NumericAliasOptions>
): NumericAliasOptions;
/** Registers the numeric-related aliases globally. */
export declare function registerNumeric(): void;
