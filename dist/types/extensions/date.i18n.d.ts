/**
 * Merge user-provided i18n options with defaults.
 * @param {Partial<typeof defaultI18n>} [userI18n]
 * @returns {typeof defaultI18n}
 */
export function mergeI18n(userI18n?: Partial<typeof defaultI18n>): typeof defaultI18n;
export namespace defaultI18n {
    let dayNames: string[];
    let monthNames: string[];
    let ordinalSuffix: string[];
    let AM: string;
    let PM: string;
}
/**
 * Default internationalization (i18n) settings for date formatting.
 * Users can override these by passing an `i18n` option to the date/datetime alias.
 */
export type I18nOptions = I18nOptions;
