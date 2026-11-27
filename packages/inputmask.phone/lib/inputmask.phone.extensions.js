/*
 Inputmask.phone extensions
 http://github.com/RobinHerbots/Inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license

 Port of https://github.com/RobinHerbots/inputmask.phone to Inputmask 5.x.
 The old version hooked Inputmask.prototype.analyseMask, which no longer
 exists; masks are now expanded/folded here before generateMaskSet sees them.
 */
const patchedClasses = new WeakSet(),
  maskCache = new WeakMap();

export { registerPhone, registerPhoneCodes };

function normalizeMask(entry) {
  return typeof entry === "string" ? entry : entry.mask;
}

function fixedDigits(mask) {
  return (mask.match(/\d/g) || []).length;
}

function maskSort(a, b) {
  const maskA = normalizeMask(a),
    maskB = normalizeMask(b),
    specificity = fixedDigits(maskB) - fixedDigits(maskA);

  return specificity !== 0
    ? specificity
    : maskB.length - maskA.length || maskA.localeCompare(maskB);
}

// "9" is a definition and "(" / ")" are the lexer's group markers, so escape
// the literal characters from the phone data before building the mask.
function escapeMaskLiterals(mask) {
  return mask.replace(/[()9]/g, "\\$&");
}

function selectPhoneCodes(opts) {
  let phoneCodes = opts.phoneCodes || [];

  if (opts.countrycode) {
    const callingCode = String(opts.countrycode).replace(/\D/g, ""),
      filtered = phoneCodes.filter((entry) => {
        const mask = normalizeMask(entry);
        return mask.indexOf("+" + callingCode) === 0;
      });

    if (filtered.length > 0) phoneCodes = filtered;
  }

  return phoneCodes.slice().sort(maskSort);
}

// Group by leading mask token so the lexer never sees >500 alternatives at
// one position.  Escaped characters such as "\(" must stay a single token,
// otherwise a generated group marker could be escaped by the trailing "\".
function buildTrieMask(phoneCodes, opts) {
  const maskGroups = {},
    separator =
      opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0];

  function reduce(masks, prefix, parent) {
    prefix = prefix || [];
    parent = parent || maskGroups;

    const key = prefix.join("");
    if (prefix.length > 0) parent[key] = {};

    const maskGroup = prefix.length > 0 ? parent[key] : parent;

    masks.forEach(function (pieces) {
      const variation = pieces[0];
      maskGroup[variation] = maskGroup[variation] || [];
      maskGroup[variation].push(pieces.slice(1));
    });

    Object.keys(maskGroup).forEach(function (ndx) {
      if (Array.isArray(maskGroup[ndx]) && maskGroup[ndx].length > 500) {
        reduce(maskGroup[ndx].slice(), [ndx], maskGroup);
      }
    });
  }

  function rebuild(maskGroup) {
    const submasks = [];

    Object.keys(maskGroup).forEach(function (ndx) {
      const alternatives = maskGroup[ndx];

      if (Array.isArray(alternatives)) {
        const masks = alternatives.map(function (pieces) {
          return pieces.join("");
        });

        submasks.push(
          masks.length === 1
            ? ndx + masks[0]
            : ndx +
                opts.groupmarker[0] +
                masks.join(separator) +
                opts.groupmarker[1]
        );
      } else {
        submasks.push(ndx + rebuild(alternatives));
      }
    });

    return submasks.length === 1
      ? submasks[0]
      : opts.groupmarker[0] + submasks.join(separator) + opts.groupmarker[1];
  }

  reduce(
    phoneCodes.map(function (entry) {
      return normalizeMask(entry).match(/\\.|./g) || [];
    })
  );
  return rebuild(maskGroups);
}

function maskMatches(mask, digits) {
  let digitIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    const chr = mask.charAt(i);

    if (chr === "#") {
      if (digitIndex >= digits.length) return true;
      digitIndex++;
    } else if (/\d/.test(chr)) {
      if (digits.charAt(digitIndex) !== chr) return false;
      digitIndex++;
    }
  }

  return digitIndex === digits.length;
}

function findPhoneCode(phoneCodes, value) {
  const digits = String(value || "").replace(/\D/g, "");
  let best,
    bestScore = -1;

  phoneCodes.forEach(function (entry) {
    const mask = normalizeMask(entry);

    if (maskMatches(mask, digits)) {
      const score = fixedDigits(mask) * 100 + mask.length;
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }
  });

  return best;
}

// Metadata is attached to the mask array.  Folded masks (>500 variations)
// are a single string, so resolve metadata from the current value instead.
function patchGetMetadata(Inputmask) {
  if (patchedClasses.has(Inputmask)) return;
  patchedClasses.add(Inputmask);

  const getmetadata = Inputmask.prototype.getmetadata;

  Inputmask.prototype.getmetadata = function () {
    const metadata = getmetadata.call(this),
      phoneCodes = this.opts && this.opts.phoneCodes;

    if (!Array.isArray(phoneCodes)) return metadata;

    const value =
      typeof this.unmaskedvalue === "function" ? this.unmaskedvalue() : "";

    return findPhoneCode(phoneCodes, value) || metadata;
  };
}

function phoneMaskFor(opts) {
  const phoneCodes = opts.phoneCodes || [],
    callingCode = String(opts.countrycode || "");
  let byCallingCode = maskCache.get(phoneCodes);

  if (!byCallingCode) {
    byCallingCode = new Map();
    maskCache.set(phoneCodes, byCallingCode);
  }
  if (byCallingCode.has(callingCode)) return byCallingCode.get(callingCode);

  const escaped = selectPhoneCodes(opts).map(function (entry) {
      return Object.assign({}, entry, {
        mask: escapeMaskLiterals(normalizeMask(entry))
      });
    }),
    mask = escaped.length <= 500 ? escaped : buildTrieMask(escaped, opts);

  byCallingCode.set(callingCode, mask);
  return mask;
}

function registerPhone(Inputmask) {
  patchGetMetadata(Inputmask);

  Inputmask.extendAliases({
    abstractphone: {
      countrycode: "",
      phoneCodes: [],
      keepStatic: false,
      usePrototypeDefinitions: false,
      definitions: {
        "#": { validator: "\\p{N}", definitionSymbol: "*" }
      },
      mask: function (opts) {
        return phoneMaskFor(opts);
      },
      onBeforeMask: function (value, opts) {
        let processedValue = String(value)
          .replace(/[\s()-]/g, "")
          .replace(/[^\d+]/g, "");

        if (processedValue.charAt(0) === "+") return processedValue;

        const callingCode = opts.countrycode
          ? String(opts.countrycode).replace(/\D/g, "")
          : "";

        if (callingCode) {
          processedValue =
            "+" + callingCode + processedValue.replace(/^0+/, "");
        }

        return processedValue;
      },
      onUnMask: function (maskedValue) {
        return maskedValue.replace(/[\s()#-]/g, "");
      },
      inputmode: "tel"
    },
    // Kept for compatibility with the original inputmask.phone package.
    libphonenumber: {
      regex: "\\+\\d{3} \\d{3} \\d{2} \\d{2}"
    }
  });
}

function registerPhoneCodes(Inputmask, aliasName, data) {
  const phoneCodes = data.phoneCodes || [];

  Inputmask.extendAliases({
    [aliasName]: {
      alias: "abstractphone",
      countrycode: data.countrycode || "",
      phoneCodes,
      // Folded lists are a single alternation and need keepStatic to select
      // the matching branch.  Setting it inside mask() is too late: Inputmask
      // has already resolved the alias option by then.  Unfolded lists keep
      // the default false, which preserves country switching and metadata.
      keepStatic: phoneCodes.length > 500
    }
  });
}
