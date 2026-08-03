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

export {};
