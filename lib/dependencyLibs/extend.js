const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const getPrototypeOf = Object.getPrototypeOf;
const objectToString = Object.prototype.toString;

function isWritable(target, name) {
  let descriptor = getOwnPropertyDescriptor(target, name);
  if (descriptor) {
    if ("value" in descriptor) {
      return descriptor.writable !== false;
    }
    // an accessor property is only writable when it carries a setter
    return typeof descriptor.set === "function";
  }

  // no own property: an assignment only throws when a non-configurable accessor
  // without a setter (or a non-writable data prop) blocks it on the prototype chain
  let proto = getPrototypeOf(target);
  while (proto) {
    descriptor = getOwnPropertyDescriptor(proto, name);
    if (descriptor) {
      if ("value" in descriptor) {
        return descriptor.writable !== false;
      }
      return typeof descriptor.set === "function" || descriptor.configurable;
    }
    proto = getPrototypeOf(proto);
  }
  return true;
}

// Recurse only into plain objects and arrays, like jQuery's extend: Dates,
// RegExps, DOM nodes, ... are copied by reference. The toString fallback keeps
// plain objects from another realm mergeable.
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const proto = getPrototypeOf(value);
  return (
    proto === Object.prototype ||
    proto === null ||
    objectToString.call(value) === "[object Object]"
  );
}

export default function extend() {
  let target = arguments[0] || {},
    i = 1,
    deep = false;
  const length = arguments.length;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
    deep = target;

    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }

  for (; i < length; i++) {
    const options = arguments[i];

    // Only deal with non-null/undefined values
    if (options == null) {
      continue;
    }

    // Own enumerable keys only, like the hasOwnProperty guard this replaces
    const names = Object.keys(options);
    for (let keyIndex = 0; keyIndex < names.length; keyIndex++) {
      const name = names[keyIndex];

      // "__proto__" would resolve through the prototype chain: src comes back
      // as Object.prototype and the deep merge below writes into it.
      if (name === "__proto__") {
        continue;
      }

      const src = target[name];
      const copy = options[name];

      // Prevent never-ending loop
      if (target === copy) {
        continue;
      }

      // Never overwrite a non-writable target property (e.g. the read-only
      // isTrusted accessor on DOM events): assigning to it would throw. A key
      // that is absent from the target cannot be blocked by an inherited
      // property, so the descriptor walk is only needed for existing keys.
      if (name in target && !isWritable(target, name)) {
        continue;
      }

      let copyIsArray;
      // Recurse if we're merging plain objects or arrays
      if (
        deep &&
        copy &&
        (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
      ) {
        let clone;
        if (copyIsArray) {
          clone = src && Array.isArray(src) ? src : [];
        } else {
          clone = src && isPlainObject(src) ? src : {};
        }

        // Never move original objects, clone them
        target[name] = extend(deep, clone, copy);
      } else if (copy !== undefined) {
        // Don't bring in undefined values
        target[name] = copy;
      }
    }
  }

  // Return the modified object
  return target;
}
