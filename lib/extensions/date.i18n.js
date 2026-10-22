/**
 * Default internationalization (i18n) settings for date formatting.
 * Users can override these by passing an `i18n` option to the date/datetime alias.
 *
 * @typedef {Object} I18nOptions
 * @property {string[]} dayNames - Full day names (Sunday-Saturday)
 * @property {string[]} monthNames - Full month names (January-December) followed by abbreviated (Jan-Dec)
 * @property {string[]} ordinalSuffix - Ordinal suffixes for dates (st, nd, rd, th)
 * @property {string} AM - AM indicator
 * @property {string} PM - PM indicator
 *
 * @type {I18nOptions}
 */
export const defaultI18n = {
  dayNames: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  ordinalSuffix: ["st", "nd", "rd", "th"],
  AM: "AM",
  PM: "PM"
};

/**
 * Merge user-provided i18n options with defaults.
 * @param {Partial<typeof defaultI18n>} [userI18n]
 * @returns {typeof defaultI18n}
 */
export function mergeI18n(userI18n) {
  if (!userI18n) return { ...defaultI18n };
  return {
    dayNames: userI18n.dayNames || defaultI18n.dayNames,
    monthNames: userI18n.monthNames || defaultI18n.monthNames,
    ordinalSuffix: userI18n.ordinalSuffix || defaultI18n.ordinalSuffix,
    AM: userI18n.AM || defaultI18n.AM,
    PM: userI18n.PM || defaultI18n.PM
  };
}
