function isWritable(target, name) {
  let descriptor =
    Object.getOwnPropertyDescriptor &&
    Object.getOwnPropertyDescriptor(target, name);
  if (descriptor) {
    if ("value" in descriptor) {
      return descriptor.writable !== false;
    }
    // an accessor property is only writable when it carries a setter
    return typeof descriptor.set === "function";
  }

  // no own property: an assignment only throws when a non-configurable accessor
  // without a setter (or a non-writable data prop) blocks it on the prototype chain
  let proto = Object.getPrototypeOf && Object.getPrototypeOf(target);
  while (proto) {
    descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (descriptor) {
      if ("value" in descriptor) {
        return descriptor.writable !== false;
      }
      return typeof descriptor.set === "function" || descriptor.configurable;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return true;
}

export default function extend() {
  let options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

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
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        // "__proto__" would resolve through the prototype chain: src comes back
        // as Object.prototype and the deep merge below writes into it. Inherited
        // keys are not ours to copy either.
        if (
          name === "__proto__" ||
          !Object.prototype.hasOwnProperty.call(options, name)
        ) {
          continue;
        }
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Never overwrite a non-writable target property (e.g. the read-only
        // isTrusted accessor on DOM events): assigning to it would throw
        if (!isWritable(target, name)) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (
          deep &&
          copy &&
          (Object.prototype.toString.call(copy) === "[object Object]" ||
            (copyIsArray = Array.isArray(copy)))
        ) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone =
              src && Object.prototype.toString.call(src) === "[object Object]"
                ? src
                : {};
          }

          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
}
