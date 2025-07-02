/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
import { escapeRegex } from "../escapeRegex";
import Inputmask from "../inputmask";
import { keyCode, keys } from "../keycode.js";
import { seekNext } from "../positioning";
import { getMaskTemplate, getTest } from "../validation-tests";
import "./inputmask.date.i18n";

const $ = Inputmask.dependencyLib;

class DateObject {
  constructor(mask, format, opts, inputmask) {
    this.mask = mask;
    this.format = format;
    this.opts = opts;
    this.inputmask = inputmask;
    this._date = new Date(1, 0, 1);
    this.initDateObject(mask, this.opts, this.inputmask);
  }

  get date() {
    if (this._date === undefined) {
      this._date = new Date(1, 0, 1);
      this.initDateObject(undefined, this.opts, this.inputmask);
    }
    return this._date;
  }

  initDateObject(mask, opts, inputmask) {
    let match,
      lastNdx = -1;
    getTokenizer(opts).lastIndex = 0;
    while ((match = getTokenizer(opts).exec(this.format))) {
      if (match.index >= lastNdx) {
        let dynMatches = /\d+$/.exec(match[0]),
          fcode = dynMatches ? match[0][0] + "x" : match[0],
          value;
        if (mask !== undefined) {
          // console.log("mask", mask);
          if (dynMatches) {
            const lastIndex = getTokenizer(opts).lastIndex,
              tokenMatch = getTokenMatch.call(
                inputmask,
                match.index,
                opts,
                inputmask && inputmask.maskset
              );
            getTokenizer(opts).lastIndex = lastIndex;
            value = mask.slice(0, mask.indexOf(tokenMatch.nextMatch[0]));
          } else {
            let targetSymbol = match[0][0],
              ndx = match.index;
            while (
              inputmask &&
              (opts.placeholder[
                `${match.index}'${
                  getTest.call(inputmask, ndx).match.placeholder
                }`
              ] || getTest.call(inputmask, ndx).match.placeholder) ===
                targetSymbol
            ) {
              ndx++;
            }
            lastNdx = ndx;
            const targetMatchLength = ndx - match.index;
            value = mask.slice(
              0,
              targetMatchLength ||
                (formatcode(fcode) && formatcode(fcode)[4]) ||
                fcode.length
            );
          }
          mask = mask.slice(value.length);
        }

        if (Object.prototype.hasOwnProperty.call(formatCode, fcode)) {
          this.setValue(
            this,
            value,
            fcode,
            formatcode(fcode)[2],
            formatcode(fcode)[1]
          );
        }
      }
    }
  }

  setValue(dateObj, value, fcode, targetProp, dateOperation) {
    if (value !== undefined) {
      switch (targetProp) {
        case "ampm":
          dateObj[targetProp] = value;
          dateObj["raw" + targetProp] = value.replace(/\s/g, "_");
          break;
        case "month":
          if (fcode === "MMM" || fcode === "MMMM") {
            fcode === "MMM"
              ? (dateObj[targetProp] = pad(
                  i18n.monthNames
                    .slice(0, 12)
                    .findIndex(
                      (item) => value.toLowerCase() === item.toLowerCase()
                    ) + 1,
                  2
                ))
              : (dateObj[targetProp] = pad(
                  i18n.monthNames
                    .slice(12, 24)
                    .findIndex(
                      (item) => value.toLowerCase() === item.toLowerCase()
                    ) + 1,
                  2
                ));
            dateObj[targetProp] =
              dateObj[targetProp] === "00"
                ? ""
                : dateObj[targetProp].toString();
            dateObj["raw" + targetProp] = dateObj[targetProp];
            break;
          }
        // eslint-disable-next-line no-fallthrough
        default:
          dateObj[targetProp] = value.replace(/[^0-9]/g, "0");
          dateObj["raw" + targetProp] = value.replace(/\s/g, "_");
      }
    }
    if (dateOperation !== undefined) {
      let datavalue = dateObj[targetProp];
      if (
        (targetProp === "day" && parseInt(datavalue) === 29) ||
        (targetProp === "month" && parseInt(datavalue) === 2)
      ) {
        if (
          parseInt(dateObj.day) === 29 &&
          parseInt(dateObj.month) === 2 &&
          (dateObj.year === "" || dateObj.year === undefined)
        ) {
          // set temporary leap year in dateObj
          dateObj._date.setFullYear(2012, 1, 29);
        }
      }
      if (targetProp === "day") {
        useDateObject = true;
        if (parseInt(datavalue) === 0) datavalue = 1;
      }
      if (targetProp === "month") useDateObject = true;
      if (targetProp === "year") {
        useDateObject = true;
        if (datavalue.length < formatcode(fcode)[4])
          datavalue = pad(datavalue, formatcode(fcode)[4], true);
      }
      if ((datavalue !== "" && !isNaN(datavalue)) || targetProp === "ampm")
        dateOperation.call(dateObj._date, datavalue);
    }
  }

  reset() {
    this._date = new Date(1, 0, 1);
  }

  reInit() {
    this._date = undefined;
    // eslint-disable-next-line no-unused-expressions
    this.date;
  }
}

let useDateObject = false;
const currentYear = new Date().getFullYear(),
  i18n = Inputmask.prototype.i18n,
  // supported codes for formatting
  // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format
  // https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7
  // https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  formatCode = {
    // regex, valueSetter, type, displayformatter, #entries (optional)
    d: [
      "[1-9]|[12][0-9]|3[01]",
      Date.prototype.setDate,
      "day",
      Date.prototype.getDate
    ], // Day of the month as digits; no leading zero for single-digit days.
    dd: [
      "0[1-9]|[12][0-9]|3[01]",
      Date.prototype.setDate,
      "day",
      function () {
        return pad(Date.prototype.getDate.call(this), 2);
      }
    ], // Day of the month as digits; leading zero for single-digit days.
    ddd: [""], // Day of the week as a three-letter abbreviation.
    dddd: [""], // Day of the week as its full name.
    M: [
      "[1-9]|1[012]",
      function (val) {
        let mval = val ? parseInt(val) : 0;
        if (mval > 0) mval--;
        return Date.prototype.setMonth.call(this, mval);
      },
      "month",
      function () {
        return Date.prototype.getMonth.call(this) + 1;
      }
    ], // Month as digits; no leading zero for single-digit months.
    MM: [
      "0[1-9]|1[012]",
      function (val) {
        let mval = val ? parseInt(val) : 0;
        if (mval > 0) mval--;
        return Date.prototype.setMonth.call(this, mval);
      },
      "month",
      function () {
        return pad(Date.prototype.getMonth.call(this) + 1, 2);
      }
    ], // Month as digits; leading zero for single-digit months.
    MMM: [
      i18n.monthNames.slice(0, 12).join("|"),
      function (val) {
        const mval = i18n.monthNames
          .slice(0, 12)
          .findIndex((item) => val.toLowerCase() === item.toLowerCase());
        return mval !== -1 ? Date.prototype.setMonth.call(this, mval) : false;
      },
      "month",
      function () {
        return i18n.monthNames.slice(0, 12)[Date.prototype.getMonth.call(this)];
      }
    ], // Month as a three-letter abbreviation.
    MMMM: [
      i18n.monthNames.slice(12, 24).join("|"),
      function (val) {
        const mval = i18n.monthNames
          .slice(12, 24)
          .findIndex((item) => val.toLowerCase() === item.toLowerCase());
        return mval !== -1 ? Date.prototype.setMonth.call(this, mval) : false;
      },
      "month",
      function () {
        return i18n.monthNames.slice(12, 24)[
          Date.prototype.getMonth.call(this)
        ];
      }
    ], // Month as its full name.
    yy: [
      "[0-9]{2}",
      function (val) {
        const centuryPart = new Date().getFullYear().toString().slice(0, 2);
        Date.prototype.setFullYear.call(this, `${centuryPart}${val}`);
      },
      "year",
      function () {
        return pad(Date.prototype.getFullYear.call(this), 2);
      },
      2
    ], // Year as last two digits; leading zero for years less than 10.
    yyyy: [
      "[0-9]{4}",
      Date.prototype.setFullYear,
      "year",
      function () {
        return pad(Date.prototype.getFullYear.call(this), 4);
      },
      4
    ],
    h: [
      "[1-9]|1[0-2]",
      Date.prototype.setHours,
      "hours",
      Date.prototype.getHours
    ], // Hours; no leading zero for single-digit hours (12-hour clock).
    hh: [
      "0[1-9]|1[0-2]",
      Date.prototype.setHours,
      "hours",
      function () {
        return pad(Date.prototype.getHours.call(this), 2);
      }
    ], // Hours; leading zero for single-digit hours (12-hour clock).
    hx: [
      function (x) {
        return `[0-9]{${x}}`;
      },
      Date.prototype.setHours,
      "hours",
      function (x) {
        return Date.prototype.getHours;
      }
    ], // Hours; no limit; set maximum digits
    H: [
      "1?[0-9]|2[0-3]",
      Date.prototype.setHours,
      "hours",
      Date.prototype.getHours
    ], // Hours; no leading zero for single-digit hours (24-hour clock).
    HH: [
      "0[0-9]|1[0-9]|2[0-3]",
      Date.prototype.setHours,
      "hours",
      function () {
        return pad(Date.prototype.getHours.call(this), 2);
      }
    ], // Hours; leading zero for single-digit hours (24-hour clock).
    Hx: [
      function (x) {
        return `[0-9]{${x}}`;
      },
      Date.prototype.setHours,
      "hours",
      function (x) {
        return function () {
          return pad(Date.prototype.getHours.call(this), x);
        };
      }
    ], // Hours; no limit; set maximum digits
    m: [
      "[1-5]?[0-9]",
      Date.prototype.setMinutes,
      "minutes",
      Date.prototype.getMinutes
    ], // Minutes; no leading zero for single-digit minutes. Uppercase M unlike CF timeFormat's m to avoid conflict with months.
    mm: [
      "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
      Date.prototype.setMinutes,
      "minutes",
      function () {
        return pad(Date.prototype.getMinutes.call(this), 2);
      }
    ], // Minutes; leading zero for single-digit minutes. Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
    s: [
      "[1-5]?[0-9]",
      Date.prototype.setSeconds,
      "seconds",
      Date.prototype.getSeconds
    ], // Seconds; no leading zero for single-digit seconds.
    ss: [
      "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
      Date.prototype.setSeconds,
      "seconds",
      function () {
        return pad(Date.prototype.getSeconds.call(this), 2);
      }
    ], // Seconds; leading zero for single-digit seconds.
    l: [
      "[0-9]{3}",
      Date.prototype.setMilliseconds,
      "milliseconds",
      function () {
        return pad(Date.prototype.getMilliseconds.call(this), 3);
      },
      3
    ], // Milliseconds. 3 digits.
    L: [
      "[0-9]{2}",
      Date.prototype.setMilliseconds,
      "milliseconds",
      function () {
        return pad(Date.prototype.getMilliseconds.call(this), 2);
      },
      2
    ], // Milliseconds. 2 digits.
    t: ["[ap]", setAMPM, "ampm", getAMPM, 1], // Lowercase, single-character time marker string: a or p.
    tt: ["[ap]m", setAMPM, "ampm", getAMPM, 2], // two-character time marker string: am or pm.
    T: ["[AP]", setAMPM, "ampm", getAMPM, 1], // single-character time marker string: A or P.
    TT: ["[AP]M", setAMPM, "ampm", getAMPM, 2], // two-character time marker string: AM or PM.
    Z: [".*", undefined, "Z", getTimeZoneAbbreviated], // US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
    o: [""], // GMT/UTC timezone offset, e.g. -0500 or +0230.
    S: [""] // The date's ordinal suffix (st, nd, rd, or th).
  },
  formatCodeAlias = {
    D: "d",
    DD: "dd",
    DDD: "ddd",
    DDDD: "dddd",
    YY: "yy",
    YYYY: "yyyy",
    sss: "L"
  },
  formatAlias = {
    isoDate: "yyyy-MM-dd", // 2007-06-09
    isoTime: "HH:mm:ss", // 17:46:21
    isoDateTime: "yyyy-MM-dd\\THH:mm:ss", // 2007-06-09T17:46:21
    isoUtcDateTime: "UTC:yyyy-MM-dd\\THH:mm:ss\\Z" // 2007-06-09T22:46:21Z
  };

function setAMPM(value) {
  const hours = this.getHours();
  if (value.toLowerCase().includes("p")) {
    this.setHours(hours + 12);
    // console.log("setAMPM + 12");
  } else if (value.toLowerCase().includes("a") && hours >= 12) {
    this.setHours(hours - 12);
  }
}

function getAMPM() {
  let date = this,
    hours = date.getHours();
  hours = hours || 12;
  return hours >= 12 ? "PM" : "AM";
}

function getTimeZoneAbbreviated() {
  // not perfect, but ok for now
  let date = this,
    { 1: tz } = date.toString().match(/\((.+)\)/);
  if (tz.includes(" ")) {
    tz = tz.replace("-", " ").toUpperCase();
    tz = tz
      .split(" ")
      .map(([first]) => first)
      .join("");
  }
  return tz;
}

function formatcode(match) {
  const fcMatch = formatCodeAlias[match] || match,
    dynMatches = /\d+$/.exec(fcMatch);
  if (dynMatches && dynMatches[0] !== undefined) {
    const fcode = formatCode[fcMatch[0] + "x"].slice("");
    fcode[0] = fcode[0](dynMatches[0]);
    fcode[3] = fcode[3](dynMatches[0]);

    return fcode;
  } else if (formatCode[fcMatch]) {
    return formatCode[fcMatch];
  }

  return undefined;
}

function getTokenizer(opts) {
  if (!opts.tokenizer) {
    const tokens = [],
      dyntokens = [],
      formatCodeKeys = Object.keys(formatCode).concat(
        Object.keys(formatCodeAlias)
      );

    for (const ndx of formatCodeKeys) {
      if (/\.*x$/.test(ndx)) {
        const dynToken = ndx[0] + "\\d+";
        if (dyntokens.indexOf(dynToken) === -1) {
          dyntokens.push(dynToken);
        }
      } else if (tokens.indexOf(ndx[0]) === -1) {
        tokens.push(ndx[0]);
      }
    }
    opts.tokenizer =
      "(" +
      (dyntokens.length > 0 ? dyntokens.join("|") + "|" : "") +
      tokens.join("+|") +
      "+)+?|.";
    opts.tokenizer = new RegExp(opts.tokenizer, "g");
  }

  return opts.tokenizer;
}

function prefillYear(dateParts, currentResult, opts) {
  if (dateParts.year !== dateParts.rawyear) {
    const crrntyear = currentYear.toString(),
      enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""),
      currentYearPart = crrntyear.slice(0, enteredPart.length),
      currentYearNextPart = crrntyear.slice(enteredPart.length);
    if (enteredPart.length === 2 && enteredPart === currentYearPart) {
      const entryCurrentYear = new Date(
        currentYear,
        dateParts.month - 1,
        dateParts.day
      );
      if (
        dateParts.day == entryCurrentYear.getDate() &&
        (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime())
      ) {
        // update dateParts
        dateParts.date.setFullYear(currentYear);
        dateParts.year = crrntyear;
        // update result
        currentResult.insert = [
          {
            pos: currentResult.pos + 1,
            c: currentYearNextPart[0]
          },
          {
            pos: currentResult.pos + 2,
            c: currentYearNextPart[1]
          }
        ];
      }
    }
  }

  return currentResult;
}

function isValidDate(dateParts, currentResult, opts) {
  const inputmask = this;
  if (!useDateObject) return true;
  if (
    dateParts.rawday === undefined ||
    (!isFinite(dateParts.rawday) &&
      new Date(
        dateParts.date.getFullYear(),
        isFinite(dateParts.rawmonth)
          ? dateParts.month
          : dateParts.date.getMonth() + 1,
        0
      ).getDate() >= dateParts.day) ||
    (dateParts.day == "29" &&
      (!isFinite(dateParts.rawyear) ||
        dateParts.rawyear === undefined ||
        dateParts.rawyear === "")) ||
    new Date(
      dateParts.date.getFullYear(),
      isFinite(dateParts.rawmonth)
        ? dateParts.month
        : dateParts.date.getMonth() + 1,
      0
    ).getDate() >= dateParts.day
  ) {
    return currentResult;
  } else {
    // take corrective action if possible
    if (dateParts.day == "29") {
      const tokenMatch = getTokenMatch.call(
        inputmask,
        currentResult.pos,
        opts,
        inputmask.maskset
      );
      if (
        tokenMatch.targetMatch &&
        ["yyyy", "YYYY"].includes(tokenMatch.targetMatch[0]) &&
        currentResult.pos - tokenMatch.targetMatchIndex === 2
      ) {
        currentResult.remove = currentResult.pos + 1;
        return currentResult;
      }
    } else if (
      dateParts.date.getMonth() == 2 &&
      dateParts.day == "30" &&
      currentResult.c !== undefined
    ) {
      dateParts.day = "03";
      dateParts.date.setDate(3);
      dateParts.date.setMonth(1);
      currentResult.insert = [
        { pos: currentResult.pos, c: "0" },
        { pos: currentResult.pos + 1, c: currentResult.c }
      ];
      currentResult.caret = seekNext.call(this, currentResult.pos + 1);
      return currentResult;
    }
    return false;
  }
}

function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
  if (!result) return result;
  if (result && opts.min) {
    if (
      /* useDateObject && (dateParts["year"] === undefined || dateParts["yearSet"]) && */ !isNaN(
        opts.min.date.getTime()
      )
    ) {
      let match;
      dateParts.reset();
      getTokenizer(opts).lastIndex = 0;
      while ((match = getTokenizer(opts).exec(opts.inputFormat))) {
        var fcode;
        if ((fcode = formatcode(match[0]))) {
          if (fcode[3]) {
            let setFn = fcode[1],
              current = dateParts[fcode[2]],
              minVal = opts.min[fcode[2]],
              maxVal = opts.max ? opts.max[fcode[2]] : minVal + 1,
              curVal = [],
              forceCurrentValue = false;
            for (let i = 0; i < minVal.length; i++) {
              if (
                maskset.validPositions[i + match.index] === undefined &&
                !forceCurrentValue
              ) {
                if (i + match.index == 0 && current[i] < minVal[i]) {
                  curVal[i] = current[i];
                  forceCurrentValue = true;
                } else {
                  curVal[i] = minVal[i];
                }
                // ADD +1 to whole
                if (
                  fcode[2] === "year" &&
                  current.length - 1 == i &&
                  minVal != maxVal
                )
                  curVal = (parseInt(curVal.join("")) + 1).toString().split("");
                if (
                  fcode[2] === "ampm" &&
                  minVal != maxVal &&
                  opts.min.date.getTime() > dateParts.date.getTime()
                )
                  curVal[i] = maxVal[i];
              } else {
                curVal[i] = current[i];
                forceCurrentValue = forceCurrentValue || current[i] > minVal[i];
              }
            }

            setFn.call(dateParts._date, curVal.join(""));
          }
        }
      }

      result = opts.min.date.getTime() <= dateParts.date.getTime();
      dateParts.reInit();
    }
  }

  if (result && opts.max) {
    if (!isNaN(opts.max.date.getTime())) {
      result = opts.max.date.getTime() >= dateParts.date.getTime();
    }
  }
  return result;
}

// parse the given format and return a mask pattern
// when a dateObjValue is passed a datestring in the requested format is returned
function parse(format, dateObjValue, opts) {
  // parse format to regex string
  let mask = "",
    match,
    fcode,
    ndx = 0,
    escaped = false;
  const placeHolder = {};
  getTokenizer(opts).lastIndex = 0;
  while ((match = getTokenizer(opts).exec(format))) {
    if (match[0] === opts.escapeChar) {
      escaped = true;
    } else {
      if (dateObjValue === undefined) {
        if (!escaped && (fcode = formatcode(match[0]))) {
          mask += "(" + fcode[0] + ")";
          // map placeholder to placeholder object and set placeholder mappings
          if (opts.placeholder && opts.placeholder !== "") {
            placeHolder[ndx] =
              opts.placeholder[match.index % opts.placeholder.length];
            // internal use of datetime alias
            placeHolder[
              `${match.index}'${
                opts.placeholder[match.index % opts.placeholder.length]
              }`
            ] = match[0].charAt(0);
          } else {
            placeHolder[ndx] = match[0].charAt(0);
          }
        } else {
          switch (match[0]) {
            case "[":
              mask += "(";
              break;
            case "]":
              mask += ")?";
              break;
            default:
              mask += escapeRegex(match[0]);
              placeHolder[ndx] = match[0].charAt(0);
          }
        }
      } else {
        if (!escaped && (fcode = formatcode(match[0]))) {
          if (fcode[3]) {
            const getFn = fcode[3];
            mask += getFn.call(dateObjValue.date);
          } else if (fcode[2] && dateObjValue["raw" + fcode[2]] !== undefined) {
            mask += dateObjValue["raw" + fcode[2]];
          } else {
            mask += match[0];
          }
        } else {
          mask += match[0];
        }
      }
      ndx++;
      escaped = false;
    }
  }
  if (dateObjValue === undefined) {
    // console.log(JSON.stringify(placeHolder));
    opts.placeholder = placeHolder;
  }
  return mask;
}

// padding function
function pad(val, len, right) {
  val = String(val);
  len = len || 2;
  while (val.length < len) val = right ? val + "0" : "0" + val;
  return val;
}

function analyseMask(mask, format, opts) {
  const inputmask = this;

  if (typeof mask === "string") {
    return new DateObject(mask, format, opts, inputmask);
  } else if (
    mask &&
    typeof mask === "object" &&
    Object.prototype.hasOwnProperty.call(mask, "date")
  ) {
    return mask;
  }
  return undefined;
}

function importDate(dateObj, opts) {
  return parse(opts.inputFormat, { date: dateObj }, opts);
}

function getTokenMatch(pos, opts, maskset) {
  let inputmask = this,
    calcPos = 0,
    targetMatch,
    match,
    matchLength = 0;

  getTokenizer(opts).lastIndex = 0;
  while ((match = getTokenizer(opts).exec(opts.inputFormat))) {
    // console.log(`match.index ${match.index}`);
    const dynMatches = /\d+$/.exec(match[0]);
    if (dynMatches) {
      matchLength = parseInt(dynMatches[0]);
    } else {
      let targetSymbol = match[0][0],
        ndx = calcPos;
      while (
        inputmask &&
        (opts.placeholder[
          `${match.index}'${getTest.call(inputmask, ndx).match.placeholder}`
        ] || getTest.call(inputmask, ndx).match.placeholder) === targetSymbol
      ) {
        ndx++;
      }
      matchLength = ndx - calcPos;
      if (matchLength === 0) matchLength = match[0].length;
    }

    calcPos += matchLength;
    // console.log(`calcPos ${calcPos}`);

    if (calcPos >= pos + 1) {
      let masksetHint = "";
      if (maskset && maskset.tests[pos]) {
        const filteredPlaceholders = Object.keys(opts.placeholder).filter(
          (value) => {
            for (let i = match.index - 1; i < calcPos; i++) {
              if (value === `${i}'${maskset.tests[pos][0].match.placeholder}`) {
                return true;
              }
            }
            return false;
          }
        );

        masksetHint =
          filteredPlaceholders.length > 0
            ? opts.placeholder[filteredPlaceholders[0]]
            : maskset.tests[pos][0].match.placeholder;
      }
      // console.log(masksetHint);
      if (match[0].indexOf(masksetHint) !== -1) {
        // console.log(`match ${masksetHint} ${calcPos} >= ${pos + 1}`);
        targetMatch = match;
        match = getTokenizer(opts).exec(opts.inputFormat);
        break;
      } else {
        // console.log(`no match ${masksetHint} ${calcPos} >= ${pos + 1}`);
      }
    }
  }
  return {
    targetMatchIndex: calcPos - matchLength,
    nextMatch: match,
    targetMatch
  };
}

Inputmask.extendAliases({
  datetime: {
    mask: function (opts) {
      // do not allow numeric input in datetime alias
      opts.numericInput = false;

      // localize
      formatCode.S = i18n.ordinalSuffix.join("|");

      opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat; // resolve possible formatAlias
      if (opts.repeat) {
        opts.repeat = parseInt(opts.repeat.toString());
        if (opts.repeat > 0) {
          let inputFormat = "";
          for (let i = 0; i < opts.repeat; i++) {
            inputFormat = inputFormat + opts.inputFormat;
          }
          opts.inputFormat = inputFormat;
          opts.repeat = 0;
        }
      }
      opts.displayFormat =
        formatAlias[opts.displayFormat] ||
        opts.displayFormat ||
        opts.inputFormat; // resolve possible formatAlias
      opts.outputFormat =
        formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat; // resolve possible formatAlias
      // opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, "");
      opts.regex = parse(opts.inputFormat, undefined, opts);
      // console.log("inputFormat", opts.regex);
      opts.min = analyseMask(opts.min, opts.inputFormat, opts);
      opts.max = analyseMask(opts.max, opts.inputFormat, opts);
      return null; // migrate to regex mask
    },
    placeholder: "", // set default as none (~ auto); when a custom placeholder is passed it will be used
    inputFormat: "isoDateTime", // format used to input the date
    displayFormat: null, // visual format when the input looses focus
    outputFormat: null, // unmasking format
    min: null, // needs to be in the same format as the inputfornat
    max: null, // needs to be in the same format as the inputfornat,
    skipOptionalPartCharacter: "",
    preValidation: function (
      buffer,
      pos,
      c,
      isSelection,
      opts,
      maskset,
      caretPos,
      strict
    ) {
      const inputmask = this;
      if (strict) return true;
      if (isNaN(c) && buffer[pos] !== c) {
        const tokenMatch = getTokenMatch.call(inputmask, pos, opts, maskset);
        if (
          tokenMatch.nextMatch &&
          tokenMatch.nextMatch[0] === c &&
          tokenMatch.targetMatch[0].length > 1
        ) {
          const validator = formatcode(tokenMatch.targetMatch[0])[0];
          if (new RegExp(validator).test("0" + buffer[pos - 1])) {
            buffer[pos] = buffer[pos - 1];
            buffer[pos - 1] = "0";
            return {
              fuzzy: true,
              buffer,
              refreshFromBuffer: { start: pos - 1, end: pos + 1 },
              pos: pos + 1
            };
          }
        }
      }
      return true;
    },
    postValidation: function (
      buffer,
      pos,
      c,
      currentResult,
      opts,
      maskset,
      strict,
      fromCheckval
    ) {
      const inputmask = this;

      if (strict) return true;
      let tokenMatch, validator;
      if (currentResult === false) {
        // try some shifting
        tokenMatch = getTokenMatch.call(inputmask, pos + 1, opts, maskset);
        if (
          tokenMatch.targetMatch &&
          tokenMatch.targetMatchIndex === pos &&
          tokenMatch.targetMatch[0].length > 1 &&
          formatcode(tokenMatch.targetMatch[0]) !== undefined
        ) {
          validator = formatcode(tokenMatch.targetMatch[0])[0];
        } else {
          tokenMatch = getTokenMatch.call(inputmask, pos + 2, opts, maskset);
          if (
            tokenMatch.targetMatch &&
            tokenMatch.targetMatchIndex === pos + 1 &&
            tokenMatch.targetMatch[0].length > 1 &&
            formatcode(tokenMatch.targetMatch[0]) !== undefined
          ) {
            validator = formatcode(tokenMatch.targetMatch[0]);
          }
        }
        if (validator !== undefined) {
          // correct position ~ pos in front of shifted targetMatch
          pos = tokenMatch.targetMatchIndex;
          if (
            maskset.validPositions[pos + 1] !== undefined &&
            new RegExp(validator).test(c + "0")
          ) {
            buffer[pos] = c;
            buffer[pos + 1] = "0";
            currentResult = {
              // insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
              pos: pos + 2, // this will triggeer a refreshfrombuffer
              caret: pos + 1
            };
          } else if (new RegExp(validator).test("0" + c)) {
            buffer[pos] = "0";
            buffer[pos + 1] = c;
            currentResult = {
              // insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
              pos: pos + 2 // this will triggeer a refreshfrombuffer
            };
          }
        }

        if (currentResult === false) return currentResult;
      }

      if (currentResult.fuzzy) {
        buffer = currentResult.buffer;
        pos = currentResult.pos;
      }

      // full validate target
      tokenMatch = getTokenMatch.call(inputmask, pos, opts, maskset);
      if (
        tokenMatch.targetMatch &&
        tokenMatch.targetMatch[0] &&
        formatcode(tokenMatch.targetMatch[0]) !== undefined
      ) {
        const fcode = formatcode(tokenMatch.targetMatch[0]);
        validator = fcode[0];
        const part = buffer.slice(
          tokenMatch.targetMatchIndex,
          tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length
        );
        if (
          new RegExp(validator).test(part.join("")) === false &&
          tokenMatch.targetMatch[0].length === 2 &&
          maskset.validPositions[tokenMatch.targetMatchIndex] &&
          maskset.validPositions[tokenMatch.targetMatchIndex + 1]
        ) {
          maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0";
        }
        if (fcode[2] == "year") {
          const _buffer = getMaskTemplate.call(
            inputmask,
            false,
            1,
            undefined,
            true
          );
          for (let i = pos + 1; i < buffer.length; i++) {
            buffer[i] = _buffer[i];
            maskset.validPositions.splice(pos + 1, 1);
          }
        }
      }

      let result = currentResult,
        dateParts = analyseMask.call(
          inputmask,
          buffer.join(""),
          opts.inputFormat,
          opts
        );
      if (result && !isNaN(dateParts.date.getTime())) {
        // check for a valid date ~ an invalid date returns NaN which isn't equal
        if (opts.prefillYear) result = prefillYear(dateParts, result, opts);
        result = isValidDate.call(inputmask, dateParts, result, opts);
        result = isDateInRange(dateParts, result, opts, maskset, fromCheckval);
      }

      if (pos !== undefined && result && currentResult.pos !== pos) {
        return {
          buffer: parse(opts.inputFormat, dateParts, opts).split(""),
          refreshFromBuffer: { start: pos, end: currentResult.pos },
          pos:
            currentResult.caret !== undefined
              ? currentResult.caret
              : currentResult.pos // correct caret position
        };
      }

      return result;
    },
    onKeyDown: function (e, buffer, caretPos, opts) {
      const input = this;
      if (e.ctrlKey && e.key === keys.ArrowRight) {
        input.inputmask._valueSet(importDate(new Date(), opts));
        $(input).trigger("setvalue");
      }
    },
    onUnMask: function (maskedValue, unmaskedValue, opts) {
      const inputmask = this;
      return unmaskedValue
        ? parse(
            opts.outputFormat,
            analyseMask.call(inputmask, maskedValue, opts.inputFormat, opts),
            opts
          )
        : unmaskedValue;
    },
    casing: function (elem, test, pos, validPositions) {
      if (test.nativeDef.indexOf("[ap]") == 0) return elem.toLowerCase();
      if (test.nativeDef.indexOf("[AP]") == 0) return elem.toUpperCase();

      const posBefore = getTest.call(this, [pos - 1]);
      if (posBefore.match.def.indexOf("[AP]") == 0) return elem.toUpperCase();

      if (
        pos === 0 ||
        (posBefore && posBefore.input === String.fromCharCode(keyCode.Space)) ||
        (posBefore &&
          posBefore.match.def === String.fromCharCode(keyCode.Space))
      ) {
        return elem.toUpperCase();
      }

      if (test.static && test.def === test.def.toUpperCase())
        return elem.toUpperCase();

      return elem.toLowerCase();
    },
    onBeforeMask: function (initialValue, opts) {
      if (Object.prototype.toString.call(initialValue) === "[object Date]") {
        initialValue = importDate(initialValue, opts);
      }

      return initialValue;
    },
    insertMode: false,
    insertModeVisual: false,
    shiftPositions: false,
    keepStatic: false,
    inputmode: "numeric",
    prefillYear: true // Allows to disable prefill for datetime year.
  }
});
