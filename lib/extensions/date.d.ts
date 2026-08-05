import type { InputmaskOptions } from "inputmask";

/**
 * Extra options supported by the datetime/date aliases.
 * These options are consumed after importing "inputmask/extensions/date".
 */
export interface DateAliasOptions extends InputmaskOptions {
  /** Alias selector, typically "datetime", "date", "dd/mm/yyyy", etc. */
  alias?: string;
  /** Input parsing format. */
  inputFormat?: string;
  /** Display format used when the element loses focus. */
  displayFormat?: string | null;
  /** Output format for unmasked values. */
  outputFormat?: string | null;
  /** Minimum accepted date in inputFormat. */
  min?: string | null;
  /** Maximum accepted date in inputFormat. */
  max?: string | null;
  /** Optional custom placeholder per token position. */
  placeholder?: string | Record<string, string>;
}

/** Returns the options for a datetime/date mask without registering the alias. */
export declare function datetime(
  options?: Partial<DateAliasOptions>
): DateAliasOptions;
/** Registers the `datetime` alias globally. */
export declare function registerDatetime(): void;
