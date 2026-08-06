import definitions from "./definitions";
import $ from "./dependencyLibs/inputmask.dependencyLib";
import { escapeRegex } from "./escapeRegex";
import { masksCache } from "./inputmask";
import MaskToken from "./masktoken";

export { generateMaskSet };

const tokenizer =
    /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
  // Thx to https://github.com/slevithan/regex-colorizer for the regexTokenizer regex
  regexTokenizer =
    /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g;

/**
 * A single test definition of the mask.
 *
 * @typedef {Object} MaskTest
 * @property {RegExp | { test: (char: string) => boolean } | null} fn
 * @property {boolean} static
 * @property {boolean} optionality
 * @property {boolean} [defOptionality] indicator for an optional from the definition
 * @property {"master" | boolean} newBlockMarker
 * @property {"upper" | "lower" | "title" | "follow" | null | ((elem: HTMLElement, test: MaskTest, pos: number, validPositions: any) => string)} [casing]
 * @property {string} def
 * @property {string} [placeholder]
 * @property {string} [displayChar]
 * @property {string} nativeDef
 * @property {boolean} [generated]
 */

/**
 * The generated maskset for a mask.
 *
 * @typedef {Object} Maskset
 * @property {string} mask
 * @property {import("./masktoken").MaskToken[]} maskToken
 * @property {any[]} validPositions
 * @property {string[] | undefined} _buffer
 * @property {string[] | undefined} buffer
 * @property {Record<number, any>} tests
 * @property {Record<number, any[]>} excludes excluded alternations
 * @property {any} metadata
 * @property {number | undefined} maskLength
 * @property {Record<number, number>} jitOffset
 */

/**
 * @param {import("./defaults").InputmaskOptions} opts
 * @param {boolean} nocache
 * @returns {Maskset}
 */
function generateMaskSet(opts, nocache) {
  let /** @type {Maskset} */ ms;

  /**
   * @param {string} mask
   * @param {{ repeat: number | string; groupmarker: string[] | [string, string]; quantifiermarker: string[] | [string, string]; keepStatic: boolean | null }} opts
   * @returns {string}
   */
  function preProcessMask(
    mask,
    { repeat, groupmarker, quantifiermarker, keepStatic }
  ) {
    if (repeat > 0 || repeat === "*" || repeat === "+") {
      const repeatStart = repeat === "*" ? 0 : repeat === "+" ? 1 : repeat;
      if (repeatStart !== repeat) {
        mask =
          groupmarker[0] +
          mask +
          groupmarker[1] +
          quantifiermarker[0] +
          repeatStart +
          "," +
          repeat +
          quantifiermarker[1];
      } else {
        // repeat the mask n times
        const msk = mask;
        for (let i = 1; i < repeatStart; i++) {
          mask += msk;
        }
      }
    }
    if (keepStatic === true) {
      const optionalRegex = "(.)\\[([^\\]]*)\\]", // "(?<p1>.)\\[(?<p2>[^\\]]*)\\]", remove named capture group @2428
        maskMatches = mask.match(new RegExp(optionalRegex, "g"));
      maskMatches &&
        maskMatches.forEach((m, i) => {
          let [p1, p2] = m.split("[");
          p2 = p2.replace("]", "");
          mask = mask.replace(
            new RegExp(`${escapeRegex(p1)}\\[${escapeRegex(p2)}\\]`),
            p1.charAt(0) === p2.charAt(0)
              ? `(${p1}|${p1}${p2})`
              : `${p1}[${p2}]`
          );
          // console.log(mask);
        });
    }

    return mask;
  }

  /**
   * @param {string} mask
   * @param {any} metadata
   * @param {import("./defaults").InputmaskOptions} opts
   * @returns {Maskset}
   */
  function generateMask(mask, metadata, opts) {
    let regexMask = false;
    if (mask === null || mask === "") {
      regexMask = opts.regex !== null;
      if (regexMask) {
        mask = opts.regex;
        mask = mask.replace(/^(\^)(.*)(\$)$/, "$2");
      } else {
        regexMask = true;
        mask = ".*";
      }
    }
    if (mask.length === 1 && opts.greedy === false && opts.repeat !== 0) {
      opts.placeholder = "";
    } // hide placeholder with single non-greedy mask
    mask = preProcessMask(mask, opts);

    // console.log(mask);
    let masksetDefinition, maskdefKey;
    maskdefKey = regexMask
      ? "regex_" + opts.regex
      : opts.numericInput
        ? mask.split("").reverse().join("")
        : mask;
    if (opts.keepStatic !== null) {
      // keepstatic modifies the output from the testdefinitions ~ so differentiate in the maskcache
      maskdefKey = "ks_" + opts.keepStatic + maskdefKey;
    }
    if (typeof opts.placeholder === "object") {
      // placeholder object modifies the output from the testdefinitions ~ so differentiate in the maskcache
      maskdefKey = "ph_" + JSON.stringify(opts.placeholder) + maskdefKey;
    }

    if (masksCache[maskdefKey] === undefined || nocache === true) {
      /** @type {Maskset} */
      masksetDefinition = {
        mask,
        maskToken: analyseMask(mask, regexMask, opts),
        validPositions: [],
        _buffer: undefined,
        buffer: undefined,
        tests: {},
        excludes: {}, // excluded alternations
        metadata,
        maskLength: undefined,
        jitOffset: {}
      };
      if (nocache !== true) {
        masksCache[maskdefKey] = masksetDefinition;
        masksetDefinition = $.extend(true, {}, masksCache[maskdefKey]);
      }
    } else {
      masksetDefinition = $.extend(true, {}, masksCache[maskdefKey]);
    }

    return masksetDefinition;
  }

  if (typeof opts.mask === "function") {
    // allow mask to be a preprocessing fn - should return a valid mask
    opts.mask = opts.mask(opts);
  }
  if (Array.isArray(opts.mask)) {
    if (opts.mask.length > 1) {
      if (opts.keepStatic === null) {
        // enable by default when passing multiple masks when the option is not explicitly specified
        opts.keepStatic = true;
      }
      let altMask = opts.groupmarker[0];
      (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function (msk) {
        if (altMask.length > 1) {
          altMask += opts.alternatormarker;
        }
        if (msk.mask !== undefined && typeof msk.mask !== "function") {
          altMask += msk.mask;
        } else {
          altMask += msk;
        }
      });
      altMask += opts.groupmarker[1];
      // console.log(altMask);
      return generateMask(altMask, opts.mask, opts);
    } else {
      opts.mask = opts.mask.pop();
    }
  }
  if (
    opts.mask &&
    opts.mask.mask !== undefined &&
    typeof opts.mask.mask !== "function"
  ) {
    ms = generateMask(opts.mask.mask, opts.mask, opts);
  } else {
    ms = generateMask(opts.mask, opts.mask, opts);
  }
  if (opts.keepStatic === null) {
    opts.keepStatic = false;
  }
  return ms;
}

/**
 * @param {string} mask
 * @param {boolean} regexMask
 * @param {import("./defaults").InputmaskOptions} opts
 * @returns {import("./masktoken").MaskToken[]}
 */
function analyseMask(mask, regexMask, opts) {
  const currentToken = new MaskToken(),
    /** @type {import("./masktoken").MaskToken[]} */ openenings = [],
    /** @type {import("./masktoken").MaskToken[]} */ maskTokens = [];
  let escaped = false,
    /** @type {RegExpExecArray} */ match,
    /** @type {string} */ m,
    /** @type {import("./masktoken").MaskToken} */ openingToken,
    /** @type {import("./masktoken").MaskToken} */ currentOpeningToken,
    /** @type {import("./masktoken").MaskToken} */ alternator,
    /** @type {import("./masktoken").MaskToken | MaskTest} */ lastMatch,
    closeRegexGroup = false;

  // test definition => {fn: RegExp/function, static: true/false optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
  /**
   * @param {import("./masktoken").MaskToken} mtoken
   * @param {string} element
   * @param {number} [position]
   */
  function insertTestDefinition(mtoken, element, position) {
    position = position !== undefined ? position : mtoken.matches.length;
    // console.log(element, position, currentToken.matches.length);
    // if (typeof opts.placeholder === "string")
    // 	console.log(opts.placeholder.charAt(currentToken.matches.length % opts.placeholder.length));
    let prevMatch = mtoken.matches[position - 1],
      flag = opts.casing ? "i" : "";
    if (regexMask) {
      if (
        element.indexOf("[") === 0 ||
        (escaped && /\\d|\\s|\\w|\\p/i.test(element)) ||
        element === "."
      ) {
        if (/\\p\{.*}/i.test(element)) flag += "u";
        mtoken.matches.splice(position++, 0, {
          fn: new RegExp(element, flag),
          static: false,
          optionality: false,
          newBlockMarker:
            prevMatch === undefined ? "master" : prevMatch.def !== element,
          casing: null,
          def: element,
          placeholder:
            typeof opts.placeholder === "object"
              ? opts.placeholder[currentToken.matches.length]
              : undefined,
          nativeDef: element
        });
      } else {
        if (escaped) element = element[element.length - 1];
        element.split("").forEach(function (lmnt) {
          prevMatch = mtoken.matches[position - 1];
          mtoken.matches.splice(
            position++,
            0,
            createStaticTest(
              lmnt,
              prevMatch,
              flag,
              opts.staticDefinitionSymbol !== undefined
                ? lmnt
                : typeof opts.placeholder === "object"
                  ? opts.placeholder[currentToken.matches.length]
                  : undefined
            )
          );
        });
      }
      escaped = false;
    } else {
      const maskdef =
        (opts.definitions && opts.definitions[element]) ||
        (opts.usePrototypeDefinitions && definitions[element]);
      if (maskdef && !escaped) {
        if (
          typeof maskdef.validator === "string" &&
          /\\p\{.*}/i.test(maskdef.validator)
        )
          flag += "u";
        mtoken.matches.splice(position++, 0, {
          fn: maskdef.validator
            ? typeof maskdef.validator === "string"
              ? new RegExp(maskdef.validator, flag)
              : new (function () {
                  this.test = maskdef.validator;
                })()
            : /./,
          static: maskdef.static || false,
          optionality: maskdef.optional || false,
          defOptionality: maskdef.optional || false, // indicator for an optional from the definition
          newBlockMarker:
            prevMatch === undefined || maskdef.optional
              ? "master"
              : prevMatch.def !== (maskdef.definitionSymbol || element),
          casing: maskdef.casing,
          def: maskdef.definitionSymbol || element,
          placeholder: maskdef.placeholder,
          displayChar: maskdef.displayChar,
          nativeDef: element,
          generated: maskdef.generated
        });
      } else {
        mtoken.matches.splice(
          position++,
          0,
          createStaticTest(
            element,
            prevMatch,
            flag,
            opts.staticDefinitionSymbol !== undefined ? element : undefined
          )
        );
        escaped = false;
      }
    }
  }

  /**
   * @param {string} element
   * @param {MaskTest | import("./masktoken").MaskToken | undefined} prevMatch
   * @param {string} flag
   * @param {string | undefined} placeholder
   * @returns {MaskTest}
   */
  function createStaticTest(element, prevMatch, flag, placeholder) {
    return {
      fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element)
        ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", flag)
        : null,
      static: true,
      optionality: false,
      newBlockMarker:
        prevMatch === undefined
          ? "master"
          : prevMatch.def !== element && prevMatch.static !== true,
      casing: null,
      def: opts.staticDefinitionSymbol || element,
      placeholder,
      nativeDef: (escaped ? "'" : "") + element
    };
  }

  /**
   * @param {import("./masktoken").MaskToken} maskToken
   */
  function verifyGroupMarker(maskToken) {
    if (maskToken && maskToken.matches) {
      maskToken.matches.forEach(function (token, ndx) {
        const nextToken = maskToken.matches[ndx + 1];
        if (
          (nextToken === undefined ||
            nextToken.matches === undefined ||
            nextToken.isQuantifier === false) &&
          token &&
          token.isGroup
        ) {
          // this is not a group but a normal mask => convert
          token.isGroup = false;
          if (!regexMask) {
            insertTestDefinition(token, opts.groupmarker[0], 0);
            if (token.openGroup !== true) {
              insertTestDefinition(token, opts.groupmarker[1]);
            }
          }
        }
        verifyGroupMarker(token);
      });
    }
  }

  /**
   * @param {import("./masktoken").MaskToken} alternator
   * @param {boolean} unsetAlternatorGroup
   */
  function pushAlternator(alternator, unsetAlternatorGroup) {
    alternator.matches.forEach(function (token) {
      token.isGroup = false;
      if (unsetAlternatorGroup) token.alternatorGroup = false;
    });
    if (openenings.length > 0) {
      currentOpeningToken = openenings[openenings.length - 1];
      currentOpeningToken.matches.push(alternator);
    } else {
      currentToken.matches.push(alternator);
    }
  }

  function defaultCase() {
    if (openenings.length > 0) {
      currentOpeningToken = openenings[openenings.length - 1];
      insertTestDefinition(currentOpeningToken, m);
      if (currentOpeningToken.isAlternator) {
        // handle alternator a | b case
        pushAlternator(openenings.pop(), false);
      }
    } else {
      insertTestDefinition(currentToken, m);
    }
  }

  /**
   * @param {import("./masktoken").MaskToken} maskToken
   * @returns {import("./masktoken").MaskToken}
   */
  function reverseTokens(maskToken) {
    function reverseStatic(st) {
      if (st === opts.optionalmarker[0]) {
        st = opts.optionalmarker[1];
      } else if (st === opts.optionalmarker[1]) {
        st = opts.optionalmarker[0];
      } else if (st === opts.groupmarker[0]) {
        st = opts.groupmarker[1];
      } else if (st === opts.groupmarker[1]) st = opts.groupmarker[0];

      return st;
    }

    maskToken.matches = maskToken.matches.reverse();
    for (const match in maskToken.matches) {
      if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
        const intMatch = parseInt(match);
        if (
          maskToken.matches[match].isQuantifier &&
          maskToken.matches[intMatch + 1] &&
          maskToken.matches[intMatch + 1].isGroup
        ) {
          // reposition quantifier
          const qt = maskToken.matches[match];
          maskToken.matches.splice(match, 1);
          maskToken.matches.splice(intMatch + 1, 0, qt);
        }
        if (maskToken.matches[match].matches !== undefined) {
          maskToken.matches[match] = reverseTokens(maskToken.matches[match]);
        } else {
          maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
        }
      }
    }

    return maskToken;
  }

  /**
   * @param {Array<import("./masktoken").MaskToken | MaskTest>} matches
   * @returns {import("./masktoken").MaskToken}
   */
  function groupify(matches) {
    const groupToken = new MaskToken(true);
    groupToken.openGroup = false;
    groupToken.matches = matches;
    return groupToken;
  }

  /**
   * @param {string} m
   * @returns {{ min: number | string; max: number | string; jit: number | string }}
   */
  function parseQuantifier(m) {
    m = m.replace(/[{}?]/g, ""); // ? matches lazy quantifiers
    const mqj = m.split("|"),
      mq = mqj[0].split(",");
    let min = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]);
    const max = mq.length === 1 ? min : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]),
      jit = isNaN(mqj[1]) ? mqj[1] : parseInt(mqj[1]);
    if (min === "*" || min === "+") {
      min = max === "*" ? 0 : 1;
    }
    return { min, max, jit };
  }

  function closeGroup() {
    // Group closing
    openingToken = openenings.pop();
    openingToken.openGroup = false; // mark group as complete
    if (openingToken !== undefined) {
      if (openenings.length > 0) {
        currentOpeningToken = openenings[openenings.length - 1];
        currentOpeningToken.matches.push(openingToken);
        if (currentOpeningToken.isAlternator) {
          // handle alternator (a) | (b) case
          pushAlternator(openenings.pop(), true);
        }
      } else {
        currentToken.matches.push(openingToken);
      }
    } else {
      defaultCase();
    }
  }

  /**
   * @param {Array<import("./masktoken").MaskToken | MaskTest>} matches
   * @returns {import("./masktoken").MaskToken | MaskTest}
   */
  function groupQuantifier(matches) {
    let lastMatch = matches.pop();
    if (lastMatch.isQuantifier) {
      lastMatch = groupify([matches.pop(), lastMatch]);
    }
    return lastMatch;
  }

  if (regexMask) {
    opts.optionalmarker[0] = undefined;
    opts.optionalmarker[1] = undefined;
  }
  tokenizer.lastIndex = 0;
  regexTokenizer.lastIndex = 0;
  // console.log(mask);
  while (
    (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask))
  ) {
    // console.log(match);
    m = match[0];

    if (regexMask) {
      switch (m.charAt(0)) {
        // Quantifier
        case "?":
          m = "{0,1}";
          break;
        case "+":
        case "*":
          m = "{" + m + "}";
          break;
        case "|":
          // regex mask alternator  ex: [01][0-9]|2[0-3] => ([01][0-9]|2[0-3])
          if (openenings.length === 0) {
            // wrap the mask in a group to form a regex alternator  ([01][0-9]|2[0-3])
            const altRegexGroup = groupify(currentToken.matches);
            altRegexGroup.openGroup = true;
            openenings.push(altRegexGroup);
            currentToken.matches = [];
            closeRegexGroup = true;
          }
          break;
      }
      switch (m) {
        case "\\d":
          m = "[0-9]";
          break;
        case "\\p": // Unicode Categories
          m += regexTokenizer.exec(mask)[0]; // {
          m += regexTokenizer.exec(mask)[0]; // ?}
          break;
        case "(?:": // non capturing group
        case "(?=": // lookahead
        case "(?!": // negative lookahead
        case "(?<=": // lookbehind
        case "(?<!": // negative lookbehind
          // treat as group
          break;
      }
    }

    if (escaped) {
      defaultCase();
      continue;
    }
    switch (m.charAt(0)) {
      case "$":
      case "^":
        // ignore beginswith and endswith as in masking this makes no point
        if (!regexMask) {
          defaultCase();
        }
        break;
      case opts.escapeChar:
        escaped = true;
        if (regexMask) defaultCase();
        break;
      // optional closing
      case opts.optionalmarker[1]:
      case opts.groupmarker[1]:
        closeGroup();
        break;
      case opts.optionalmarker[0]:
        // optional opening
        openenings.push(new MaskToken(false, true));
        break;
      case opts.groupmarker[0]:
        // Group opening
        openenings.push(new MaskToken(true));
        break;
      case opts.quantifiermarker[0]:
        {
          // Quantifier
          const quantifier = new MaskToken(false, false, true);
          quantifier.quantifier = parseQuantifier(m);
          const matches =
            openenings.length > 0
              ? openenings[openenings.length - 1].matches
              : currentToken.matches;
          match = matches.pop();
          if (!match.isGroup) {
            match = groupify([match]);
          }
          matches.push(match);
          matches.push(quantifier);
        }
        break;
      case opts.alternatormarker:
        if (openenings.length > 0) {
          currentOpeningToken = openenings[openenings.length - 1];
          const subToken =
            currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
          if (
            currentOpeningToken.openGroup && // regexp alt syntax
            (subToken.matches === undefined ||
              (subToken.isGroup === false && subToken.isAlternator === false))
          ) {
            // alternations within group
            lastMatch = openenings.pop();
          } else {
            lastMatch = groupQuantifier(currentOpeningToken.matches);
          }
        } else {
          lastMatch = groupQuantifier(currentToken.matches);
        }
        if (lastMatch.isAlternator) {
          openenings.push(lastMatch);
        } else {
          if (lastMatch.alternatorGroup) {
            alternator = openenings.pop();
            lastMatch.alternatorGroup = false;
          } else {
            alternator = new MaskToken(false, false, false, true);
          }
          alternator.matches.push(lastMatch);
          openenings.push(alternator);
          if (lastMatch.openGroup) {
            // regexp alt syntax
            lastMatch.openGroup = false;
            const alternatorGroup = new MaskToken(true);
            alternatorGroup.alternatorGroup = true;
            openenings.push(alternatorGroup);
          }
        }
        break;
      default:
        defaultCase();
    }
  }

  if (closeRegexGroup) closeGroup();

  while (openenings.length > 0) {
    openingToken = openenings.pop();
    currentToken.matches.push(openingToken);
  }
  if (currentToken.matches.length > 0) {
    verifyGroupMarker(currentToken);
    maskTokens.push(currentToken);
  }

  if (opts.numericInput || opts.isRTL) {
    reverseTokens(maskTokens[0]);
  }
  // console.log(JSON.stringify(maskTokens));
  return maskTokens;
}
