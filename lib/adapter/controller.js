/*
 * Inputmask framework adapter
 * http://github.com/RobinHerbots/inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 *
 * Framework-agnostic controller used by the React, Vue, Svelte and Angular
 * wrappers. It owns the mount/update/destroy lifecycle around the regular DOM
 * API, so every wrapper behaves identically.
 */

import Inputmask from "../core/inputmask.js";
import attach from "../dom/attach.js";

// The adapter is a public entry as well; make sure the element-bound methods
// are available even when this module is imported on its own.
attach(Inputmask);

/**
 * @typedef {object} InputmaskChangePayload
 * @property {string} value Model value: the input.value, which is unmasked when `autoUnmask` is enabled.
 * @property {string} maskedValue Value as displayed in the input.
 * @property {string} unmaskedValue Value with the mask literals removed.
 * @property {boolean} isComplete Whether the mask is completely filled in.
 * @property {Event | undefined} event The native event that triggered the change.
 */

/**
 * @typedef {object} InputmaskAdapter
 * @property {() => any} mount Attach the mask. Idempotent.
 * @property {(options?: object) => void} update Apply new options. Remasks only when a non-function option changed.
 * @property {() => void} destroy Remove the mask and restore the native value property.
 * @property {(value: string, caretPos?: number) => void} setValue Programmatic value update.
 * @property {() => any} getInstance The live Inputmask element instance, if mounted.
 * @property {() => string} getValue The current value as exposed by the (patched) input.value.
 * @property {() => string} getUnmaskedValue The current value without mask literals.
 * @property {() => boolean} isComplete Whether the mask is completely filled in.
 * @property {(listener: (payload: InputmaskChangePayload) => void) => () => void} on Subscribe to value changes. Returns an unsubscribe function.
 */

/**
 * Create a framework-agnostic controller for a single element.
 * @param {HTMLElement} el
 * @param {object} [options]
 * @returns {InputmaskAdapter}
 */
export function createInputmaskAdapter(el, options = {}) {
  if (!el) {
    throw new TypeError("createInputmaskAdapter: an element is required");
  }

  let latest = { ...options };
  let instance = null;
  let mounted = false;
  let applyingValue = false;
  const functionProxies = new Map();
  const listeners = new Set();

  function proxyFor(key) {
    let proxy = functionProxies.get(key);
    if (proxy === undefined) {
      proxy = function (...args) {
        const fn = latest[key];
        return typeof fn === "function" ? fn.apply(this, args) : undefined;
      };
      functionProxies.set(key, proxy);
    }
    return proxy;
  }

  // Inputmask reads its handlers from `opts`, which are bound when the mask is
  // created. Handing it stable proxies keeps a new inline callback on every
  // render from forcing a remask (and losing the caret).
  function buildOptions() {
    const built = { ...latest };
    for (const key of Object.keys(built)) {
      if (typeof latest[key] === "function") {
        built[key] = proxyFor(key);
      }
    }
    return built;
  }

  function handleInput(event) {
    // Inputmask triggers a native input event for programmatic setValue calls.
    // That is not a user edit, so do not feed it back to the wrapper.
    if (applyingValue) {
      return;
    }
    const payload = {
      value: el.value,
      maskedValue:
        instance && typeof instance._valueGet === "function"
          ? instance._valueGet(true)
          : el.value,
      unmaskedValue: instance ? instance.unmaskedvalue() : el.value,
      isComplete: instance ? instance.isComplete() : false,
      event
    };
    listeners.forEach((listener) => listener(payload));
  }

  function mount() {
    if (mounted) {
      return instance;
    }
    mounted = true;
    const built = buildOptions();
    if (Object.keys(built).length === 0) {
      return null;
    }
    instance = new Inputmask(built).mask(el);
    el.addEventListener("input", handleInput);
    return instance;
  }

  function update(nextOptions = {}) {
    const previous = latest;
    latest = { ...nextOptions };
    if (!mounted) {
      return;
    }
    if (!instance) {
      const built = buildOptions();
      if (Object.keys(built).length === 0) {
        return;
      }
      instance = new Inputmask(built).mask(el);
      el.addEventListener("input", handleInput);
      return;
    }
    if (!hasStructuralChange(previous, latest)) {
      return;
    }

    const unmasked = instance.unmaskedvalue();
    // Detach first so the listener is always registered after Inputmask's own
    // handlers again, and so programmatic remasking does not emit a change.
    el.removeEventListener("input", handleInput);
    instance.remove();
    instance = null;

    const built = buildOptions();
    if (Object.keys(built).length === 0) {
      el.addEventListener("input", handleInput);
      return;
    }
    instance = new Inputmask(built).mask(el);
    if (unmasked !== "" && instance.unmaskedvalue() !== unmasked) {
      instance.setValue(unmasked);
    }
    el.addEventListener("input", handleInput);
  }

  function destroy() {
    el.removeEventListener("input", handleInput);
    listeners.clear();
    if (el.inputmask) {
      el.inputmask.remove();
    }
    instance = null;
    mounted = false;
  }

  function setValue(value, caretPos) {
    if (instance) {
      applyingValue = true;
      try {
        instance.setValue(value, caretPos);
      } finally {
        applyingValue = false;
      }
    } else {
      el.value = value;
    }
  }

  function on(listener) {
    listeners.add(listener);
    return function unsubscribe() {
      listeners.delete(listener);
    };
  }

  return {
    mount,
    update,
    destroy,
    setValue,
    on,
    getInstance: () => instance,
    getValue: () => el.value,
    getUnmaskedValue: () => (instance ? instance.unmaskedvalue() : el.value),
    isComplete: () => (instance ? instance.isComplete() : false)
  };
}

/**
 * A change is structural when something other than the identity of a handler
 * function differs. Adding or removing a handler is structural (it has to be
 * bound), replacing one with another is not (the proxy forwards to the latest).
 * @param {object} previous
 * @param {object} next
 * @returns {boolean}
 */
function hasStructuralChange(previous, next) {
  const keys = new Set([...Object.keys(previous), ...Object.keys(next)]);
  for (const key of keys) {
    const hadKey = Object.prototype.hasOwnProperty.call(previous, key);
    const hasKey = Object.prototype.hasOwnProperty.call(next, key);
    if (hadKey !== hasKey) {
      return true;
    }
    const before = previous[key];
    const after = next[key];
    const beforeIsFunction = typeof before === "function";
    const afterIsFunction = typeof after === "function";
    if (beforeIsFunction || afterIsFunction) {
      if (beforeIsFunction !== afterIsFunction) {
        return true;
      }
      continue;
    }
    if (!equalValue(before, after)) {
      return true;
    }
  }
  return false;
}

/**
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
function equalValue(a, b) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null || typeof a !== typeof b) {
    return false;
  }
  if (typeof a !== "object") {
    return false;
  }
  if (a instanceof RegExp || b instanceof RegExp) {
    return (
      a instanceof RegExp &&
      b instanceof RegExp &&
      a.source === b.source &&
      a.flags === b.flags
    );
  }
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!equalValue(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (const key of aKeys) {
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !equalValue(a[key], b[key])
    ) {
      return false;
    }
  }
  return true;
}
