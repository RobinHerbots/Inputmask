// Copies of resolved mask test entries. A "test" here is a valid-position
// entry ({ match, locator, mloc, cd, ... }), not a unit test.
//
// The `match` object of a resolved entry aliases the shared
// `maskset.maskToken` match objects, which are mutated while the mask is
// resolved. Entries are also cached per position in `maskset.tests`, so they
// have to be copied before they are stored. Custom definition validators keep
// state on `this` (the `{ test: fn }` wrapper), so every position needs its own
// wrapper; regular expressions are stateless for our use and can be shared.

export function cloneTestEntry(entry) {
  if (!entry || typeof entry !== "object") return entry;

  const match = entry.match;
  let matchClone = match;

  if (match && typeof match === "object") {
    matchClone = { ...match };
    const fn = match.fn;
    if (fn !== null && typeof fn === "object" && !(fn instanceof RegExp)) {
      matchClone.fn = { test: fn.test };
    }
  }

  const clone = { ...entry, match: matchClone };
  if (entry.locator !== undefined) {
    clone.locator = entry.locator.slice();
  }
  if (entry.mloc !== undefined) {
    const mloc = {};
    for (const key of Object.keys(entry.mloc)) {
      const locator = entry.mloc[key];
      mloc[key] = Array.isArray(locator) ? locator.slice() : locator;
    }
    clone.mloc = mloc;
  }
  return clone;
}

export function cloneTestList(list) {
  const clone = new Array(list.length);
  for (let i = 0; i < list.length; i++) {
    clone[i] = cloneTestEntry(list[i]);
  }
  return clone;
}
