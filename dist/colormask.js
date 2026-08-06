/*!
 * dist/colormask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.17
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(Object(typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 472
() {

if (FormData.Inputmask === undefined) {
  class FormDataPatch extends FormData {
    constructor(form, submitter) {
      super(form, submitter);
      const entries = this.entries();
      let entry;
      while ((entry = entries.next()).done === false) {
        const fieldName = entry.value[0],
          originalValue = entry.value[1],
          // Get the original value from FormData
          element = form[fieldName];
        if (element && element.inputmask !== undefined && !(originalValue instanceof File)) {
          // Apply masking only if it's not a File and the element has inputmask
          this.set(fieldName, element.value);
        }
      }
      return this;
    }
  }
  FormDataPatch.Inputmask = true;
  // eslint-disable-next-line no-global-assign
  FormData = FormDataPatch;
}

/***/ },

/***/ 9306
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(4901);
var tryToString = __webpack_require__(6823);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ },

/***/ 6469
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(8227);
var create = __webpack_require__(2360);
var defineProperty = (__webpack_require__(4913).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ },

/***/ 679
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isPrototypeOf = __webpack_require__(1625);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};


/***/ },

/***/ 8551
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(34);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ },

/***/ 9617
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(5397);
var toAbsoluteIndex = __webpack_require__(5610);
var lengthOfArrayLike = __webpack_require__(6198);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ },

/***/ 4527
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var isArray = __webpack_require__(4376);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ },

/***/ 6319
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(8551);
var iteratorClose = __webpack_require__(9539);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ },

/***/ 2195
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(9504);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ },

/***/ 7740
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var hasOwn = __webpack_require__(9297);
var ownKeys = __webpack_require__(5031);
var getOwnPropertyDescriptorModule = __webpack_require__(7347);
var definePropertyModule = __webpack_require__(4913);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ },

/***/ 2211
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ },

/***/ 2529
(module) {

"use strict";

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ },

/***/ 6699
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ },

/***/ 6980
(module) {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ },

/***/ 4659
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};


/***/ },

/***/ 2106
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var makeBuiltIn = __webpack_require__(283);
var defineProperty = __webpack_require__(4913);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ },

/***/ 6840
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(4901);
var definePropertyModule = __webpack_require__(4913);
var makeBuiltIn = __webpack_require__(283);
var defineGlobalProperty = __webpack_require__(9433);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ },

/***/ 6279
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var defineBuiltIn = __webpack_require__(6840);

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ },

/***/ 9433
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ },

/***/ 3724
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(9039);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ },

/***/ 4055
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);
var isObject = __webpack_require__(34);

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ },

/***/ 6837
(module) {

"use strict";

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw new $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ },

/***/ 8727
(module) {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ },

/***/ 2839
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ },

/***/ 9519
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);
var userAgent = __webpack_require__(2839);

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ },

/***/ 6518
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);
var getOwnPropertyDescriptor = (__webpack_require__(7347).f);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIn = __webpack_require__(6840);
var defineGlobalProperty = __webpack_require__(9433);
var copyConstructorProperties = __webpack_require__(7740);
var isForced = __webpack_require__(2796);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ },

/***/ 9039
(module) {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ },

/***/ 8745
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ },

/***/ 6080
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(7476);
var aCallable = __webpack_require__(9306);
var NATIVE_BIND = __webpack_require__(616);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ },

/***/ 616
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = function () { /* empty */ }.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ },

/***/ 9565
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(616);

var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ },

/***/ 350
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var hasOwn = __webpack_require__(9297);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ },

/***/ 7476
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var classofRaw = __webpack_require__(2195);
var uncurryThis = __webpack_require__(9504);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ },

/***/ 9504
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ },

/***/ 7751
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ },

/***/ 1767
(module) {

"use strict";

// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/ecma262/#sec-getiteratordirect
module.exports = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};


/***/ },

/***/ 8563
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var anObject = __webpack_require__(8551);
var tryToString = __webpack_require__(6823);
var getIteratorMethod = __webpack_require__(3085);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (isCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ },

/***/ 3085
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(2195);
var isNullOrUndefined = __webpack_require__(4117);
var getMethod = __webpack_require__(5966);
var wellKnownSymbol = __webpack_require__(8227);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || (classof(it) === 'Arguments' ? ArrayPrototype[ITERATOR] : undefined);
};


/***/ },

/***/ 5966
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(9306);
var isNullOrUndefined = __webpack_require__(4117);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ },

/***/ 4576
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ },

/***/ 9297
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(9504);
var toObject = __webpack_require__(8981);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ },

/***/ 421
(module) {

"use strict";

module.exports = {};


/***/ },

/***/ 397
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(7751);

module.exports = getBuiltIn('document', 'documentElement');


/***/ },

/***/ 5917
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);
var createElement = __webpack_require__(4055);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ },

/***/ 7055
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var classof = __webpack_require__(2195);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ },

/***/ 3706
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(9504);
var isCallable = __webpack_require__(4901);
var store = __webpack_require__(7629);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ },

/***/ 1181
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(8622);
var globalThis = __webpack_require__(4576);
var isObject = __webpack_require__(34);
var createNonEnumerableProperty = __webpack_require__(6699);
var hasOwn = __webpack_require__(9297);
var shared = __webpack_require__(7629);
var sharedKey = __webpack_require__(6119);
var hiddenKeys = __webpack_require__(421);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ },

/***/ 4209
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(8227);
var Iterators = __webpack_require__(6269);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ },

/***/ 4376
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(2195);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ },

/***/ 4901
(module) {

"use strict";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ },

/***/ 2796
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ },

/***/ 4117
(module) {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ },

/***/ 34
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(4901);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ },

/***/ 6395
(module) {

"use strict";

module.exports = false;


/***/ },

/***/ 757
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(7751);
var isCallable = __webpack_require__(4901);
var isPrototypeOf = __webpack_require__(1625);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ },

/***/ 2652
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(6080);
var call = __webpack_require__(9565);
var anObject = __webpack_require__(8551);
var tryToString = __webpack_require__(6823);
var isArrayIteratorMethod = __webpack_require__(4209);
var lengthOfArrayLike = __webpack_require__(6198);
var isPrototypeOf = __webpack_require__(1625);
var getIterator = __webpack_require__(8563);
var getIteratorMethod = __webpack_require__(3085);
var iteratorClose = __webpack_require__(9539);

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    var $iterator = iterator;
    iterator = undefined;
    if ($iterator) iteratorClose($iterator, 'normal');
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    // `IteratorValue` errors should propagate without closing the iterator
    var value = step.value;
    try {
      result = callFn(value);
    } catch (error) {
      if (iterator) iteratorClose(iterator, 'throw', error);
      else throw error;
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ },

/***/ 6859
(module) {

"use strict";

// release references held by exhausted / closed iterator helpers to allow GC of the source chain
module.exports = function (state) {
  state.iterator = state.next = state.nextHandler = state.mapper = state.predicate = state.inner =
    state.iterables = state.iters = state.openIters = state.padding = state.finishResults = state.buffer = null;
};


/***/ },

/***/ 1385
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var iteratorClose = __webpack_require__(9539);

module.exports = function (iters, kind, value) {
  for (var i = iters.length - 1; i >= 0; i--) {
    if (iters[i] === undefined) continue;
    try {
      value = iteratorClose(iters[i].iterator, kind, value);
    } catch (error) {
      kind = 'throw';
      value = error;
    }
  }
  if (kind === 'throw') throw value;
  return value;
};


/***/ },

/***/ 9539
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(9565);
var anObject = __webpack_require__(8551);
var getMethod = __webpack_require__(5966);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ },

/***/ 9462
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(9565);
var create = __webpack_require__(2360);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIns = __webpack_require__(6279);
var wellKnownSymbol = __webpack_require__(8227);
var InternalStateModule = __webpack_require__(1181);
var getMethod = __webpack_require__(5966);
var IteratorPrototype = (__webpack_require__(7657).IteratorPrototype);
var createIterResultObject = __webpack_require__(2529);
var iteratorClose = __webpack_require__(9539);
var iteratorCloseAll = __webpack_require__(1385);
var cleanupState = __webpack_require__(6859);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var NORMAL = 'normal';
var THROW = 'throw';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      if (state.done) return createIterResultObject(undefined, true);
      try {
        var result = state.nextHandler();
        if (state.done) cleanupState(state);
        return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
      } catch (error) {
        state.done = true;
        cleanupState(state);
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      var inner = state.inner;
      var openIters = state.openIters;
      var done = state.done;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod(iterator, 'return');
        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
      }
      cleanupState(state);
      if (done) return createIterResultObject(undefined, true);
      if (inner) try {
        iteratorClose(inner.iterator, NORMAL);
      } catch (error) {
        return iteratorClose(iterator, THROW, error);
      }
      if (openIters) try {
        iteratorCloseAll(openIters, NORMAL);
      } catch (error) {
        if (iterator) return iteratorClose(iterator, THROW, error);
        throw error;
      }
      if (iterator) iteratorClose(iterator, NORMAL);
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};


/***/ },

/***/ 684
(module) {

"use strict";

// Should throw an error on invalid iterator
// https://issues.chromium.org/issues/336839115
module.exports = function (methodName, argument) {
  // eslint-disable-next-line es/no-iterator -- required for testing
  var method = typeof Iterator == 'function' && Iterator.prototype[methodName];
  if (method) try {
    method.call({ next: null }, argument).next();
  } catch (error) {
    return true;
  }
};


/***/ },

/***/ 4549
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);

// https://github.com/tc39/ecma262/pull/3467
module.exports = function (METHOD_NAME, ExpectedError) {
  var Iterator = globalThis.Iterator;
  var IteratorPrototype = Iterator && Iterator.prototype;
  var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];

  var CLOSED = false;

  if (method) try {
    method.call({
      next: function () { return { done: true }; },
      'return': function () { CLOSED = true; }
    }, -1);
  } catch (error) {
    // https://bugs.webkit.org/show_bug.cgi?id=291195
    if (!(error instanceof ExpectedError)) CLOSED = false;
  }

  if (!CLOSED) return method;
};


/***/ },

/***/ 7657
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var create = __webpack_require__(2360);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltIn = __webpack_require__(6840);
var wellKnownSymbol = __webpack_require__(8227);
var IS_PURE = __webpack_require__(6395);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ },

/***/ 6269
(module) {

"use strict";

module.exports = Object.create ? Object.create(null) : {};


/***/ },

/***/ 6198
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__(8014);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ },

/***/ 283
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var hasOwn = __webpack_require__(9297);
var DESCRIPTORS = __webpack_require__(3724);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(350).CONFIGURABLE);
var inspectSource = __webpack_require__(3706);
var InternalStateModule = __webpack_require__(1181);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ },

/***/ 741
(module) {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ },

/***/ 2360
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(8551);
var definePropertiesModule = __webpack_require__(6801);
var enumBugKeys = __webpack_require__(8727);
var hiddenKeys = __webpack_require__(421);
var html = __webpack_require__(397);
var documentCreateElement = __webpack_require__(4055);
var sharedKey = __webpack_require__(6119);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ },

/***/ 6801
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var definePropertyModule = __webpack_require__(4913);
var anObject = __webpack_require__(8551);
var toIndexedObject = __webpack_require__(5397);
var objectKeys = __webpack_require__(1072);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ },

/***/ 4913
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var IE8_DOM_DEFINE = __webpack_require__(5917);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var anObject = __webpack_require__(8551);
var toPropertyKey = __webpack_require__(6969);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ },

/***/ 7347
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var call = __webpack_require__(9565);
var propertyIsEnumerableModule = __webpack_require__(8773);
var createPropertyDescriptor = __webpack_require__(6980);
var toIndexedObject = __webpack_require__(5397);
var toPropertyKey = __webpack_require__(6969);
var hasOwn = __webpack_require__(9297);
var IE8_DOM_DEFINE = __webpack_require__(5917);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ },

/***/ 8480
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ },

/***/ 3717
(__unused_webpack_module, exports) {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ },

/***/ 2787
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var hasOwn = __webpack_require__(9297);
var isCallable = __webpack_require__(4901);
var toObject = __webpack_require__(8981);
var sharedKey = __webpack_require__(6119);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(2211);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ },

/***/ 1625
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(9504);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ },

/***/ 1828
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(9504);
var hasOwn = __webpack_require__(9297);
var toIndexedObject = __webpack_require__(5397);
var indexOf = (__webpack_require__(9617).indexOf);
var hiddenKeys = __webpack_require__(421);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ },

/***/ 1072
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ },

/***/ 8773
(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ },

/***/ 4270
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ },

/***/ 5031
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(7751);
var uncurryThis = __webpack_require__(9504);
var getOwnPropertyNamesModule = __webpack_require__(8480);
var getOwnPropertySymbolsModule = __webpack_require__(3717);
var anObject = __webpack_require__(8551);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ },

/***/ 7750
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isNullOrUndefined = __webpack_require__(4117);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ },

/***/ 6119
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var shared = __webpack_require__(5745);
var uid = __webpack_require__(3392);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ },

/***/ 7629
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IS_PURE = __webpack_require__(6395);
var globalThis = __webpack_require__(4576);
var defineGlobalProperty = __webpack_require__(9433);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.50.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.',
  license: 'https://github.com/zloirock/core-js/blob/v3.50.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ },

/***/ 5745
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var store = __webpack_require__(7629);
// eslint-disable-next-line es/no-object-create -- safe
var create = Object.create || Object;

module.exports = function (key, value) {
  return store[key] || (store[key] = value || create(null));
};


/***/ },

/***/ 4495
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(9519);
var fails = __webpack_require__(9039);
var globalThis = __webpack_require__(4576);

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ },

/***/ 5610
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(1291);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ },

/***/ 5397
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7055);
var requireObjectCoercible = __webpack_require__(7750);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ },

/***/ 1291
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var trunc = __webpack_require__(741);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ },

/***/ 8014
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(1291);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ },

/***/ 8981
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var requireObjectCoercible = __webpack_require__(7750);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ },

/***/ 2777
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(9565);
var isObject = __webpack_require__(34);
var isSymbol = __webpack_require__(757);
var getMethod = __webpack_require__(5966);
var ordinaryToPrimitive = __webpack_require__(4270);
var wellKnownSymbol = __webpack_require__(8227);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ },

/***/ 6969
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(2777);
var isSymbol = __webpack_require__(757);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ },

/***/ 6823
(module) {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ },

/***/ 3392
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(9504);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.1.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ },

/***/ 7040
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4495);

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';


/***/ },

/***/ 8686
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ },

/***/ 8622
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ },

/***/ 8227
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(4576);
var shared = __webpack_require__(5745);
var hasOwn = __webpack_require__(9297);
var uid = __webpack_require__(3392);
var NATIVE_SYMBOL = __webpack_require__(4495);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ },

/***/ 4423
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var $includes = (__webpack_require__(9617).includes);
var fails = __webpack_require__(9039);
var addToUnscopables = __webpack_require__(6469);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// Safari 26.4- bug
var BROKEN_ON_SPARSE_WITH_FROM_INDEX = fails(function () {
  // eslint-disable-next-line no-sparse-arrays, es/no-array-prototype-includes -- detection
  return [, 1].includes(undefined, 1);
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE || BROKEN_ON_SPARSE_WITH_FROM_INDEX }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ },

/***/ 4114
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var setArrayLength = __webpack_require__(4527);
var doesNotExceedSafeInteger = __webpack_require__(6837);
var fails = __webpack_require__(9039);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ },

/***/ 8111
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var anInstance = __webpack_require__(679);
var anObject = __webpack_require__(8551);
var isCallable = __webpack_require__(4901);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltInAccessor = __webpack_require__(2106);
var createProperty = __webpack_require__(4659);
var fails = __webpack_require__(9039);
var hasOwn = __webpack_require__(9297);
var wellKnownSymbol = __webpack_require__(8227);
var IteratorPrototype = (__webpack_require__(7657).IteratorPrototype);
var DESCRIPTORS = __webpack_require__(3724);
var IS_PURE = __webpack_require__(6395);

var CONSTRUCTOR = 'constructor';
var ITERATOR = 'Iterator';
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = globalThis[ITERATOR];

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS) {
    defineBuiltInAccessor(IteratorPrototype, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject(this);
        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
        if (hasOwn(this, key)) this[key] = replacement;
        else createProperty(this, key, replacement);
      }
    });
  } else IteratorPrototype[key] = value;
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://tc39.es/ecma262/#sec-iterator
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});


/***/ },

/***/ 1148
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);

var everyWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('every', TypeError);

// `Iterator.prototype.every` method
// https://tc39.es/ecma262/#sec-iterator.prototype.every
$({ target: 'Iterator', proto: true, real: true, forced: everyWithoutClosingOnEarlyError }, {
  every: function every(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (everyWithoutClosingOnEarlyError) return call(everyWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return !iterate(record, function (value, stop) {
      if (!predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});


/***/ },

/***/ 2489
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);
var IS_PURE = __webpack_require__(6395);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperThrowsOnInvalidIterator = __webpack_require__(684);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);

var FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('filter', function () { /* empty */ });
var filterWithoutClosingOnEarlyError = !IS_PURE && !FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('filter', TypeError);

var FORCED = IS_PURE || FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR || filterWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://tc39.es/ecma262/#sec-iterator.prototype.filter
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  filter: function filter(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (filterWithoutClosingOnEarlyError) return call(filterWithoutClosingOnEarlyError, this, predicate);

    return new IteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});


/***/ },

/***/ 116
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);

var findWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('find', TypeError);

// `Iterator.prototype.find` method
// https://tc39.es/ecma262/#sec-iterator.prototype.find
$({ target: 'Iterator', proto: true, real: true, forced: findWithoutClosingOnEarlyError }, {
  find: function find(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (findWithoutClosingOnEarlyError) return call(findWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});


/***/ },

/***/ 7588
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);

var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('forEach', TypeError);

// `Iterator.prototype.forEach` method
// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
$({ target: 'Iterator', proto: true, real: true, forced: forEachWithoutClosingOnEarlyError }, {
  forEach: function forEach(fn) {
    anObject(this);
    try {
      aCallable(fn);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (forEachWithoutClosingOnEarlyError) return call(forEachWithoutClosingOnEarlyError, this, fn);

    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});


/***/ },

/***/ 1701
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperThrowsOnInvalidIterator = __webpack_require__(684);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);
var IS_PURE = __webpack_require__(6395);

var MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('map', function () { /* empty */ });
var mapWithoutClosingOnEarlyError = !IS_PURE && !MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('map', TypeError);

var FORCED = IS_PURE || MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || mapWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://tc39.es/ecma262/#sec-iterator.prototype.map
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  map: function map(mapper) {
    anObject(this);
    try {
      aCallable(mapper);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (mapWithoutClosingOnEarlyError) return call(mapWithoutClosingOnEarlyError, this, mapper);

    return new IteratorProxy(getIteratorDirect(this), {
      mapper: mapper
    });
  }
});


/***/ },

/***/ 8237
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);
var apply = __webpack_require__(8745);
var fails = __webpack_require__(9039);

var $TypeError = TypeError;

// https://bugs.webkit.org/show_bug.cgi?id=291651
var FAILS_ON_INITIAL_UNDEFINED = fails(function () {
  // eslint-disable-next-line es/no-iterator-prototype-reduce, es/no-array-prototype-keys, array-callback-return -- required for testing
  [].keys().reduce(function () { /* empty */ }, undefined);
});

var reduceWithoutClosingOnEarlyError = !FAILS_ON_INITIAL_UNDEFINED && iteratorHelperWithoutClosingOnEarlyError('reduce', $TypeError);

// `Iterator.prototype.reduce` method
// https://tc39.es/ecma262/#sec-iterator.prototype.reduce
$({ target: 'Iterator', proto: true, real: true, forced: FAILS_ON_INITIAL_UNDEFINED || reduceWithoutClosingOnEarlyError }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    try {
      aCallable(reducer);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    if (reduceWithoutClosingOnEarlyError) {
      return apply(reduceWithoutClosingOnEarlyError, this, noInitial ? [reducer] : [reducer, accumulator]);
    }
    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = reducer(accumulator, value, counter);
      }
      counter++;
    }, { IS_RECORD: true });
    if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value');
    return accumulator;
  }
});


/***/ },

/***/ 3579
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var iteratorClose = __webpack_require__(9539);
var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__(4549);

var someWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('some', TypeError);

// `Iterator.prototype.some` method
// https://tc39.es/ecma262/#sec-iterator.prototype.some
$({ target: 'Iterator', proto: true, real: true, forced: someWithoutClosingOnEarlyError }, {
  some: function some(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (someWithoutClosingOnEarlyError) return call(someWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ bundle_colormask)
});

// EXTERNAL MODULE: ./lib/global/FormData.js
var bundle_colormask_FormData = __webpack_require__(472);
;// ./lib/definitions.js
/* harmony default export */ const definitions = ({
  9: {
    validator: "\\p{N}",
    definitionSymbol: "*"
  },
  a: {
    validator: "\\p{L}",
    definitionSymbol: "*"
  },
  "*": {
    validator: "[\\p{L}\\p{N}]"
  }
});
;// ./lib/global/window.js
const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
/* harmony default export */ const global_window = (canUseDOM ? window : {});
;// ./lib/dependencyLibs/data.js
/* harmony default export */ function data(owner, key, value) {
  if (value === undefined) {
    return owner.__data ? owner.__data[key] : null;
  } else {
    owner.__data = owner.__data || {};
    owner.__data[key] = value;
  }
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(4114);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__(8111);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.for-each.js
var es_iterator_for_each = __webpack_require__(7588);
;// ./lib/dependencyLibs/extend.js
function extend() {
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
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (Object.prototype.toString.call(copy) === "[object Object]" || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && Object.prototype.toString.call(src) === "[object Object]" ? src : {};
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
;// ./lib/dependencyLibs/events.js








const events_document = global_window.document;
function isValidElement(elem) {
  return elem instanceof Element && data(elem, "events");
}
let Evnt;
if (typeof global_window.CustomEvent === "function") {
  Evnt = global_window.CustomEvent;
} else if (global_window.Event && events_document && events_document.createEvent) {
  Evnt = function (event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: undefined
    };
    const evt = events_document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };
  Evnt.prototype = global_window.Event.prototype;
} else if (typeof Event !== "undefined") {
  // nodejs
  Evnt = Event;
}
function on(events, handler) {
  if (!this[0] || !isValidElement(this[0])) {
    return this; // Early return if no valid element
  }
  const elem = this[0],
    eventRegistry = data(elem, "events"),
    addEvent = (ev, namespace) => {
      // register domevent
      if (elem.addEventListener) {
        // all browsers except IE before version 9
        elem.addEventListener(ev, handler, false);
      } else if (elem.attachEvent) {
        // IE before version 9
        elem.attachEvent(`on${ev}`, handler);
      }
      eventRegistry[ev] = eventRegistry[ev] || {};
      eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
      eventRegistry[ev][namespace].push(handler);
    };
  events.split(" ").forEach(event => {
    const [ev, namespace = "global"] = event.split(".");
    addEvent(ev, namespace);
  });
  return this;
}
function off(events, handler) {
  let eventRegistry, elem;
  function removeEvent(ev, namespace, handler) {
    if (ev in eventRegistry === true) {
      // unbind to dom events
      if (elem.removeEventListener) {
        // all browsers except IE before version 9
        elem.removeEventListener(ev, handler, false);
      } else if (elem.detachEvent) {
        // IE before version 9
        elem.detachEvent(`on${ev}`, handler);
      }
      // when the namespace is not defined (global namespace), we need to clean up all events in all namespaces
      if (namespace === "global") {
        for (const nmsp in eventRegistry[ev]) {
          eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);
        }
      } else {
        eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
      }
    }
  }
  function resolveNamespace(ev, namespace) {
    const evts = [];
    let hndx, hndL;
    if (ev.length > 0) {
      const namespaces = namespace ? [namespace] : Object.keys(eventRegistry[ev]);
      for (let nsi = 0; nsi < namespaces.length; nsi++) {
        namespace = namespaces[nsi];
        if (handler === undefined) {
          for (hndx = 0, hndL = eventRegistry[ev][namespace]?.length || 0; hndx < hndL; hndx++) {
            evts.push({
              ev,
              namespace,
              handler: eventRegistry[ev][namespace][hndx]
            });
          }
        } else {
          evts.push({
            ev,
            namespace,
            handler
          });
        }
      }
    } else if (namespace.length > 0) {
      for (const evNdx in eventRegistry) {
        if (eventRegistry[evNdx][namespace]) {
          if (handler === undefined) {
            for (hndx = 0, hndL = eventRegistry[evNdx][namespace].length; hndx < hndL; hndx++) {
              evts.push({
                ev: evNdx,
                namespace,
                handler: eventRegistry[evNdx][namespace][hndx]
              });
            }
          } else {
            evts.push({
              ev: evNdx,
              namespace,
              handler
            });
          }
        }
      }
    }
    return evts;
  }
  if (isValidElement(this[0])) {
    eventRegistry = data(this[0], "events");
    elem = this[0];
    // if no events defined, remove all events
    events = events || Object.keys(eventRegistry).join(" ");
    if (events !== "") {
      events.split(" ").forEach(event => {
        const [ev, namespace] = event.split(".");
        resolveNamespace(ev, namespace).forEach(({
          ev: ev1,
          handler: handler1,
          namespace: namespace1
        }) => {
          removeEvent(ev1, namespace1, handler1);
        });
      });
    }
  }
  return this;
}
function trigger(events /* , args... */) {
  if (isValidElement(this[0])) {
    const eventRegistry = data(this[0], "events"),
      elem = this[0],
      _events = typeof events === "string" ? events.split(" ") : [events.type];
    for (let endx = 0; endx < _events.length; endx++) {
      const nsEvent = _events[endx].split("."),
        ev = nsEvent[0],
        namespace = nsEvent[1] || "global";
      if (events_document !== undefined) {
        // trigger domevent
        let evnt;
        const params = {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: arguments[1]
        };
        // The custom event that will be created
        if (events_document.createEvent) {
          try {
            switch (ev) {
              case "input":
                params.inputType = "insertText";
                evnt = new InputEvent(ev, params);
                break;
              default:
                evnt = new CustomEvent(ev, params);
            }
          } catch (e) {
            evnt = events_document.createEvent("CustomEvent");
            evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
          }
          if (events.type) extend(evnt, events);
          elem.dispatchEvent(evnt);
        } else {
          evnt = events_document.createEventObject();
          evnt.eventType = ev;
          evnt.detail = arguments[1];
          if (events.type) extend(evnt, events);
          elem.fireEvent("on" + evnt.eventType, evnt);
        }
      } else if (eventRegistry[ev] !== undefined) {
        arguments[0] = arguments[0].type ? arguments[0] : inputmask_dependencyLib.Event(arguments[0]);
        arguments[0].detail = arguments.slice(1);
        const registry = eventRegistry[ev],
          handlers = namespace === "global" ? Object.values(registry).flat() : registry[namespace];
        handlers.forEach(handler => handler.apply(elem, arguments));
      }
    }
  }
  return this;
}
;// ./lib/dependencyLibs/inputmask.dependencyLib.js
/*
 Input Mask plugin dependencyLib
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */





const inputmask_dependencyLib_document = global_window.document;
function DependencyLib(elem) {
  if (elem instanceof DependencyLib) {
    return elem;
  }
  if (!(this instanceof DependencyLib)) {
    return new DependencyLib(elem);
  }
  if (elem !== undefined && elem !== null && elem !== global_window) {
    this[0] = elem.nodeName ? elem : elem[0] !== undefined && elem[0].nodeName ? elem[0] : inputmask_dependencyLib_document.querySelector(elem);
    if (this[0] !== undefined && this[0] !== null) {
      data(this[0], "events", data(this[0], "events") || {});
    }
  }
}
DependencyLib.prototype = {
  on: on,
  off: off,
  trigger: trigger
};

// static
DependencyLib.extend = extend;
DependencyLib.data = data;
DependencyLib.Event = Evnt;
/* harmony default export */ const inputmask_dependencyLib = (DependencyLib);
;// ./lib/extensions/definitions.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */




// extra definitions
function definitions_definitions(options) {
  return inputmask_dependencyLib.extend(true, {
    A: {
      validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
      casing: "upper" // auto uppercasing
    },
    "&": {
      // alfanumeric uppercasing
      validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
      casing: "upper"
    },
    "#": {
      // hexadecimal
      validator: "[0-9A-Fa-f]",
      casing: "upper"
    }
  }, options);
}
function registerDefinitions() {
  inputmask_dependencyLib.extend(true, definitions, definitions_definitions());
}
;// ./lib/defaults.js
/**
 * Public options surface for Inputmask instances.
 *
 * @typedef {Object} InputmaskOptions
 * @property {number} [_maxTestPos]
 * @property {string} [placeholder]
 * @property {string[] | [string, string]} [optionalmarker]
 * @property {string[] | [string, string]} [quantifiermarker]
 * @property {string[] | [string, string]} [groupmarker]
 * @property {string} [alternatormarker]
 * @property {string} [escapeChar]
 * @property {string | null} [mask]
 * @property {string | null} [regex]
 * @property {(event?: Event) => void} [oncomplete]
 * @property {(event?: Event) => void} [onincomplete]
 * @property {(event?: Event) => void} [oncleared]
 * @property {number | string} [repeat]
 * @property {boolean} [greedy]
 * @property {boolean} [autoUnmask]
 * @property {boolean} [removeMaskOnSubmit]
 * @property {boolean} [clearMaskOnLostFocus]
 * @property {boolean} [insertMode]
 * @property {boolean} [insertModeVisual]
 * @property {boolean} [clearIncomplete]
 * @property {string | null} [alias]
 * @property {(event: Event, buffer: string[], caretPos: number, opts: InputmaskOptions) => void} [onKeyDown]
 * @property {((initialValue: string, opts: InputmaskOptions) => string) | null} [onBeforeMask]
 * @property {(pastedValue: string, opts: InputmaskOptions) => string} [onBeforePaste]
 * @property {((event: Event | undefined, buffer: string[], caretPos: number, opts: InputmaskOptions) => any) | null} [onBeforeWrite]
 * @property {((maskedValue: string, unmaskedValue: string, opts: InputmaskOptions) => string) | null} [onUnMask]
 * @property {string | null} [outputMask]
 * @property {boolean} [showMaskOnFocus]
 * @property {boolean} [showMaskOnHover]
 * @property {(key: string, result: boolean, opts: InputmaskOptions) => void} [onKeyValidation]
 * @property {string} [skipOptionalPartCharacter]
 * @property {boolean} [numericInput]
 * @property {boolean} [rightAlign]
 * @property {boolean} [undoOnEscape]
 * @property {string} [radixPoint]
 * @property {boolean} [_radixDance]
 * @property {string} [groupSeparator]
 * @property {boolean | null} [keepStatic]
 * @property {boolean} [positionCaretOnTab]
 * @property {boolean} [tabThrough]
 * @property {string[]} [supportsInputType]
 * @property {((buffer: string[], opts: InputmaskOptions) => boolean) | null} [isComplete]
 * @property {((buffer: string[], pos: number, char: string, isSelection: boolean, opts: InputmaskOptions, maskset: any, caretPos: number, strict: boolean) => boolean | Object) | null} [preValidation]
 * @property {((buffer: string[], pos: number, char: string, currentResult: boolean | Object, opts: InputmaskOptions, maskset: any, strict: boolean, fromCheckval: boolean, fromAlternate: boolean) => boolean | Object) | null} [postValidation]
 * @property {string | undefined} [staticDefinitionSymbol]
 * @property {boolean | number} [jitMasking]
 * @property {boolean} [nullable]
 * @property {boolean} [inputEventOnly]
 * @property {boolean} [noValuePatching]
 * @property {"none" | "lvp" | "radixFocus" | "select" | "ignore"} [positionCaretOnClick]
 * @property {"upper" | "lower" | "title" | "follow" | ((elem: HTMLElement, test: any, pos: number, validPositions: any) => string) | null} [casing]
 * @property {string} [inputmode]
 * @property {boolean} [importDataAttributes]
 * @property {boolean} [shiftPositions]
 * @property {boolean} [usePrototypeDefinitions]
 * @property {number} [validationEventTimeOut]
 * @property {Record<string, string>} [substitutes]
 */

/** @type {InputmaskOptions} */
const defaults = {
  _maxTestPos: 500,
  placeholder: "_",
  optionalmarker: ["[", "]"],
  quantifiermarker: ["{", "}"],
  groupmarker: ["(", ")"],
  alternatormarker: "|",
  escapeChar: "\\",
  mask: null,
  // needs tobe null instead of undefined as the extend method does not consider props with the undefined value
  regex: null,
  // regular expression as a mask
  oncomplete: () => {},
  // executes when the mask is complete
  onincomplete: () => {},
  // executes when the mask is incomplete and focus is lost
  oncleared: () => {},
  // executes when the mask is cleared
  repeat: 0,
  // repetitions of the mask: * ~ forever, otherwise specify an integer
  greedy: false,
  // true: allocated buffer for the mask and repetitions - false: allocate only if needed
  autoUnmask: false,
  // automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
  removeMaskOnSubmit: false,
  // remove the mask before submitting the form.
  clearMaskOnLostFocus: true,
  insertMode: true,
  // insert the input or overwrite the input
  insertModeVisual: true,
  // show selected caret when insertmode = false
  clearIncomplete: false,
  // clear the incomplete input on blur
  alias: null,
  onKeyDown: () => {},
  // callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
  onBeforeMask: null,
  // executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
  onBeforePaste: function (pastedValue, opts) {
    return typeof opts.onBeforeMask === "function" ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
  },
  // executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
  onBeforeWrite: null,
  // executes before writing to the masked element. args => event, opts
  onUnMask: null,
  // executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
  outputMask: null,
  // mask to apply when unmasking
  showMaskOnFocus: true,
  // show the mask-placeholder when the input has focus
  showMaskOnHover: true,
  // show the mask-placeholder when hovering the empty input
  onKeyValidation: () => {},
  // executes on every key-press with the result of isValid. Params: key, result, opts
  skipOptionalPartCharacter: " ",
  // a character which can be used to skip an optional part of a mask
  numericInput: false,
  // numericInput input direction style (input shifts to the left while holding the caret position)
  rightAlign: false,
  // align to the right
  undoOnEscape: true,
  // pressing escape reverts the value to the value before focus
  // numeric basic properties
  radixPoint: "",
  // ".", // | ","
  _radixDance: false,
  // dance around the radixPoint
  groupSeparator: "",
  // ",", // | "."
  // numeric basic properties
  keepStatic: null,
  // try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible
  positionCaretOnTab: true,
  // when enabled the caret position is set after the latest valid position on TAB
  tabThrough: false,
  // allows for tabbing through the different parts of the masked field
  supportsInputType: ["text", "tel", "url", "password", "search"],
  // list with the supported input types
  isComplete: null,
  // override for isComplete - args => buffer, opts - return true || false
  preValidation: null,
  // hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts, maskset, caretPos, strict => return true/false/command object
  postValidation: null,
  // hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval, fromAlternate => return true/false/json
  staticDefinitionSymbol: undefined,
  // specify a definitionSymbol for static content, used to make matches for alternators
  jitMasking: false,
  // just in time masking ~ only mask while typing, can n (number), true or false
  nullable: true,
  // return nothing instead of the buffertemplate when the user hasn't entered anything.
  inputEventOnly: false,
  // dev option - testing inputfallback behavior
  noValuePatching: false,
  // disable value property patching
  positionCaretOnClick: "lvp",
  // none, lvp (based on the last valid position (default), radixFocus (position caret to radixpoint on initial click), select (select the whole input), ignore (ignore the click and continue the mask)
  casing: null,
  // mask-level casing. Options: null, "upper", "lower" or "title" or "follow" or callback args => elem, test, pos, validPositions return charValue
  inputmode: "text",
  // specify the inputmode
  importDataAttributes: true,
  // import data-inputmask attributes
  shiftPositions: true,
  // shift position of the mask entries on entry and deletion.
  usePrototypeDefinitions: true,
  // use the default defined definitions from the prototype
  validationEventTimeOut: 3000,
  // Time to show validation error on form submit
  substitutes: {} // define character substitutes
};
/* harmony default export */ const lib_defaults = (defaults);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(4423);
;// ./lib/environment.js

const ua = global_window.navigator && global_window.navigator.userAgent || "",
  ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0,
  mobile = !!(navigator.userAgentData?.mobile ?? ((matchMedia("(pointer:coarse)").matches || navigator.maxTouchPoints) && innerWidth <= 1024 || /Mobi|Android|iPhone/i.test(ua))),
  iphone = /iphone/i.test(ua);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.reduce.js
var es_iterator_reduce = __webpack_require__(8237);
;// ./lib/keycode.js



const ignorables = {
    Alt: 18,
    AltGraph: 18,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowUp: 38,
    Backspace: 8,
    CapsLock: 20,
    Control: 17,
    ContextMenu: 93,
    Dead: 221,
    Delete: 46,
    End: 35,
    Escape: 27,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    Home: 36,
    Insert: 45,
    NumLock: 144,
    PageDown: 34,
    PageUp: 33,
    Pause: 19,
    PrintScreen: 44,
    Process: 229,
    Shift: 16,
    ScrollLock: 145,
    Tab: 9,
    Unidentified: 229
  },
  keyCode = {
    c: 67,
    x: 88,
    z: 90,
    BACKSPACE_SAFARI: 127,
    Enter: 13,
    Meta_LEFT: 91,
    Meta_RIGHT: 92,
    Space: 32,
    ...ignorables
  },
  keyCodeRev = Object.entries(keyCode).reduce((acc, [key, value]) => (
  // eslint-disable-next-line no-sequences
  acc[value] = acc[value] === undefined ? key : acc[value], acc), {}),
  keys = Object.entries(keyCode).reduce(
  // eslint-disable-next-line no-sequences
  (acc, [key, value]) => (acc[key] = key === "Space" ? " " : key, acc), {});
function toKey(keyCode, shiftKey) {
  return keyCodeRev[keyCode] || (shiftKey ? String.fromCharCode(keyCode) : String.fromCharCode(keyCode).toLowerCase());
}
function toKeyCode(key) {
  return keyCode[key];
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.every.js
var es_iterator_every = __webpack_require__(1148);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.filter.js
var es_iterator_filter = __webpack_require__(2489);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.find.js
var es_iterator_find = __webpack_require__(116);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.map.js
var es_iterator_map = __webpack_require__(1701);
;// ./lib/validation-tests.js












function getLocator(tst, align) {
  // need to align the locators to be correct
  let locator = (tst.alternation != undefined ? tst.mloc[`${getDecisionTaker(tst)}:${tst.alternation}`] || tst.locator : tst.locator).join("");
  if (locator !== "") {
    locator = locator.split(":")[0]; // strip off alternation marker
    while (locator.length < align) locator += "0";
  }
  return locator;
}
function getDecisionTaker(tst) {
  let decisionTaker = tst.locator[tst.alternation];
  if (typeof decisionTaker === "string" && decisionTaker.length > 0) {
    // no decision taken ~ take smallest as decider
    decisionTaker = decisionTaker.split(",").sort((a, b) => a - b)[0];
  }
  return decisionTaker !== undefined ? decisionTaker.toString() : "";
}

// tobe put on prototype?
function getPlaceholder(pos, test, returnPL) {
  const inputmask = this,
    opts = this.opts,
    maskset = this.maskset;
  test = test || getTest.call(inputmask, pos).match;
  if (test.placeholder !== undefined || returnPL === true) {
    if (test.placeholder !== "" && test.static === true && test.generated !== true) {
      // static and not dynamically generated ~ does not occur in regex mask ~ numeric alias def is not a valid entry
      const lvp = getLastValidPosition.call(inputmask, pos),
        nextPos = seekNext.call(inputmask, lvp);
      return (returnPL ? pos <= nextPos : pos < nextPos) ? casing.call(inputmask, opts.staticDefinitionSymbol && test.static ? test.nativeDef : test.def, test, pos) : typeof test.placeholder === "function" ? test.placeholder(opts) : test.placeholder;
    } else {
      return typeof test.placeholder === "function" ? test.placeholder(opts) : test.placeholder;
    }
  } else if (test.static === true) {
    if (pos > -1 && maskset.validPositions[pos] === undefined) {
      let tests = getTests.call(inputmask, pos),
        staticAlternations = [],
        prevTest;
      if (typeof opts.placeholder === "string" && tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
        for (let i = 0; i < tests.length; i++) {
          if (tests[i].match.def !== "" && tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true && (tests[i].match.static === true || prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, maskset, pos, true, opts) !== false)) {
            staticAlternations.push(tests[i]);
            if (tests[i].match.static === true) prevTest = tests[i];
            if (staticAlternations.length > 1) {
              if (/[0-9a-zA-Z]/.test(staticAlternations[0].match.def)) {
                return opts.placeholder.charAt(pos % opts.placeholder.length);
              }
            }
          }
        }
      }
    }
    return test.def;
  }
  return typeof opts.placeholder === "object" ? test.def : opts.placeholder.charAt(pos % opts.placeholder.length);
}

// tobe put on prototype?
function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
  // includeMode true => input, undefined => placeholder, false => mask

  const inputmask = this,
    opts = this.opts,
    maskset = this.maskset,
    greedy = opts.greedy,
    maskTemplate = [];
  if (clearOptionalTail && opts.greedy) {
    opts.greedy = false;
    inputmask.maskset.tests = {};
  }
  minimalPos = minimalPos || 0;
  let ndxIntlzr,
    pos = 0,
    test,
    testPos,
    jitRenderStatic;
  do {
    if (baseOnInput === true && maskset.validPositions[pos]) {
      testPos = clearOptionalTail && maskset.validPositions[pos].match.optionality && maskset.validPositions[pos + 1] === undefined && (maskset.validPositions[pos].generatedInput === true || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos];
      test = testPos.match;
      ndxIntlzr = testPos.locator.slice();
      maskTemplate.push(includeMode === true ? testPos.match.displayChar !== undefined ? testPos.match.displayChar : testPos.input : includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, pos, test));
    } else {
      testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
      test = testPos.match;
      ndxIntlzr = testPos.locator.slice();
      const jitMasking = noJit === true ? false : opts.jitMasking !== false ? opts.jitMasking : test.jit;
      // check for groupSeparator is a hack for the numerics as we don't want the render of the groupSeparator beforehand
      jitRenderStatic = (jitRenderStatic || maskset.validPositions[pos - 1] /* && getTest.call(inputmask, pos + 1).match.def == "" */) && test.static && test.def !== opts.groupSeparator && test.fn === null;
      if (jitRenderStatic || jitMasking === false || jitMasking === undefined /* || pos < lvp */ || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
        maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, maskTemplate.length, test));
      } else {
        jitRenderStatic = false;
      }
    }
    pos++;
  } while (test.static !== true || test.def !== "" || minimalPos > pos);
  if (maskTemplate[maskTemplate.length - 1] === "") {
    maskTemplate.pop(); // drop the last one which is empty
  }
  if (includeMode !== false ||
  // do not alter the masklength when just retrieving the maskdefinition
  maskset.maskLength === undefined) {
    // just make sure the maskLength gets initialized in all cases (needed for isValid)
    maskset.maskLength = pos - 1;
  }
  opts.greedy = greedy;
  return maskTemplate;
}

// tobe put on prototype?
function getTestTemplate(pos, ndxIntlzr, tstPs) {
  const inputmask = this,
    maskset = this.maskset;
  return maskset.validPositions[pos] || determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
}

// tobe put on prototype?
function determineTestTemplate(pos, tests) {
  const inputmask = this,
    opts = inputmask.opts,
    optionalityLevel = determineOptionalityLevel(pos, tests);
  pos = pos > 0 ? pos - 1 : 0;
  const longestLocator = Math.max(...tests.map(tst => tst.locator === undefined ? 0 : tst.locator.length)),
    prevTest = getTest.call(inputmask, pos),
    prevLocator = getLocator(prevTest, longestLocator);
  let lenghtOffset = 0,
    tstLocator,
    closest,
    bestMatch;
  if (opts.greedy && tests.length > 1 && tests[tests.length - 1].match.def === "") lenghtOffset = 1;
  // console.log(" optionality = " + optionalityLevel);
  // console.log(" - " + JSON.stringify(tests));
  for (let ndx = 0; ndx < tests.length - lenghtOffset; ndx++) {
    // find best matching
    const tst = tests[ndx];
    tstLocator = getLocator(tst, longestLocator);
    const distance = Number(tstLocator) - Number(prevLocator); // find the closest match to the previous one
    // console.log("distance", distance, tstLocator, prevLocator);

    if (tst.unMatchedAlternationStopped !== true || tests.filter(tst => tst.unMatchedAlternationStopped !== true).length <= 1) {
      // only skip when there are choices outside the alternation
      if (closest === undefined || tstLocator !== "" && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.optionality - optionalityLevel > 0 && bestMatch.match.newBlockMarker === "master" && (!tst.match.optionality || tst.match.optionality - optionalityLevel < 1 || !tst.match.newBlockMarker) || bestMatch && !opts.greedy && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) {
        closest = distance;
        bestMatch = tst;
      }
    }
  }
  return bestMatch;
}
function determineOptionalityLevel(pos, tests) {
  let optionalityLevel = 0,
    differentOptionalLevels = false;
  tests.forEach(test => {
    if (test.match.optionality) {
      if (optionalityLevel !== 0 && optionalityLevel !== test.match.optionality) differentOptionalLevels = true;
      if (optionalityLevel === 0 || optionalityLevel > test.match.optionality) {
        optionalityLevel = test.match.optionality;
      }
    }
  });
  if (optionalityLevel) {
    if (pos == 0) optionalityLevel = 0;else if (tests.length == 1) optionalityLevel = 0;else if (!differentOptionalLevels) optionalityLevel = 0;
  }
  return optionalityLevel;
}

// tobe put on prototype?
function getTest(pos, tests) {
  const inputmask = this,
    maskset = this.maskset;
  if (maskset.validPositions[pos]) {
    return maskset.validPositions[pos];
  }
  return (tests || getTests.call(inputmask, pos))[0];
}
function isSubsetOf(source, target, opts) {
  function expand(pattern) {
    let expanded = [],
      start = -1,
      end;
    for (let i = 0, l = pattern.length; i < l; i++) {
      if (pattern.charAt(i) === "-") {
        end = pattern.charCodeAt(i + 1);
        while (++start < end) expanded.push(String.fromCharCode(start));
      } else {
        start = pattern.charCodeAt(i);
        expanded.push(pattern.charAt(i));
      }
    }
    return expanded.join("");
  }
  if (source.match.def === target.match.nativeDef) return true;
  if ((opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) && source.match.static !== true && target.match.static !== true) {
    // is regex a subset
    if (target.match.fn.source === ".") return true;
    return expand(target.match.fn.source.replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.source.replace(/[[\]/]/g, ""))) !== -1;
  }
  return false;
}

// tobe put on prototype?
function getTests(pos, ndxIntlzr, tstPs) {
  let inputmask = this,
    $ = this.dependencyLib,
    maskset = this.maskset,
    opts = this.opts,
    el = this.el,
    maskTokens = maskset.maskToken,
    testPos = ndxIntlzr ? tstPs : 0,
    ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
    matches = [],
    insertStop = false,
    insertStopFromAlternation = false,
    latestMatch,
    cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "",
    unMatchedAlternation = false;
  function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
    // ndxInitializer contains a set of indexes to speedup searches in the mtokens
    function handleMatch(match, loopNdx, quantifierRecurse) {
      function isFirstMatch(latestMatch, tokenGroup) {
        let firstMatch = tokenGroup.matches.indexOf(latestMatch) === 0;
        if (!firstMatch) {
          tokenGroup.matches.every(function (match, ndx) {
            if (match.isQuantifier === true) {
              firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);
            } else if (Object.prototype.hasOwnProperty.call(match, "matches")) {
              firstMatch = isFirstMatch(latestMatch, match);
            }
            if (firstMatch) {
              if (tokenGroup.matches[ndx + 1] && tokenGroup.matches[ndx + 1].isQuantifier) {
                firstMatch = ndx === 0;
              }
              return false;
            }
            return true;
          });
        }
        return firstMatch;
      }
      function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
        let bestMatch,
          distance,
          locator,
          newAlternateMloc,
          alternateMloc = `${alternateNdx}:${targetAlternation}`;
        if (maskset.tests[pos] || maskset.validPositions[pos]) {
          (maskset.validPositions[pos] ? [maskset.validPositions[pos]] : maskset.tests[pos]).every(function (lmnt, ndx) {
            if (lmnt.mloc[alternateMloc]) {
              bestMatch = lmnt;
              return false; // break
            }

            // check if an entry in mloc match the alternateNdx on targetAlternation
            const mlocMatches = Object.values(lmnt.mloc).filter(
            // eslint-disable-next-line eqeqeq
            m => m[targetAlternation] == alternateNdx);
            // for each mlocMatch check the calculated distance
            mlocMatches.every(mlocMatch => {
              let mlocMatchL = mlocMatch.join("").split(":")[0]; // strip off alternation marker
              locator = locator || mlocMatchL;
              while (mlocMatchL.length < locator.length) mlocMatchL += "0";
              const mlocDistance = Number(mlocMatchL);
              // console.log("mlocDistance", mlocDistance);
              if (bestMatch === undefined || mlocDistance < distance) {
                distance = mlocDistance;
                bestMatch = lmnt;

                // key from mlocMatch
                newAlternateMloc = Object.entries(lmnt.mloc).find(entry => entry[1].toString() === mlocMatch.toString())[0];
              }
              return true; // continue
            });
            return true;
          });
        }
        if (bestMatch) {
          if (targetAlternation === undefined) {
            alternateMloc = `${alternateNdx}:${bestMatch.alternation}`;
          }
          const bestMatchAltIndex = `${bestMatch.locator[bestMatch.alternation]}:${bestMatch.alternation}`,
            slocator = bestMatch.mloc[newAlternateMloc || alternateMloc] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
          if (slocator[slocator.length - 1].toString().indexOf(":") !== -1) {
            // eslint-disable-next-line no-unused-vars
            const alternation = slocator.pop();
            // targetAlternation = parseInt(alternation.substring(1));
          }
          const sliceStart = parseInt(
          // newAlternateMloc
          //   ? newAlternateMloc.split(":")[1]
          //   : targetAlternation ||
          bestMatch.alternation) + 1;

          // console.log(
          //   "resolveNdxInitializer",
          //   pos,
          //   alternateNdx,
          //   targetAlternation,
          //   slocator,
          //   sliceStart,
          //   bestMatch
          // );

          return slocator.slice(sliceStart);
        } else {
          return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
        }
      }
      function staticCanMatchDefinition(source, target) {
        return source.match.static === true && target.match.static !== true ? target.match.fn.test(source.match.def, maskset, pos, false, opts, false) : false;
      }

      // mergelocators for retrieving the correct locator match when merging
      function setMergeLocators(targetMatch, altMatch) {
        function mergeLoc(altNdx) {
          targetMatch.mloc = targetMatch.mloc || {};
          let locNdx = targetMatch.locator[altNdx];
          if (locNdx === undefined) {
            targetMatch.alternation = undefined;
          } else {
            if (altMatch === undefined) {
              if (typeof locNdx === "string") locNdx = locNdx.split(",")[0];
              locNdx = `${locNdx}:${altNdx}`;
              if (targetMatch.mloc[locNdx] === undefined) {
                targetMatch.mloc[locNdx] = targetMatch.locator.slice();
                targetMatch.mloc[locNdx].push(`:${altNdx}`); // add alternation index
              }
            } else {
              let offset = 0;
              for (const ndx in altMatch.mloc) {
                // if (typeof ndx === "string") ndx = parseInt(ndx.split(",")[0]);
                if (targetMatch.mloc[ndx] === undefined) {
                  targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                } else {
                  do {
                    if (targetMatch.mloc[ndx + offset] === undefined) {
                      targetMatch.mloc[ndx + offset] = altMatch.mloc[ndx];
                      break;
                    }
                  } while (targetMatch.mloc[ndx + offset++] !== undefined);
                }
              }
              targetMatch.locator = mergeLocators(testPos, [targetMatch, altMatch]);
            }
            if (targetMatch.alternation > altNdx) {
              // if the alternation index is higher than the current one resolve it to the alternation
              targetMatch.alternation = altNdx;
            }
            return true;
          }
          return false;
        }
        let alternationNdx = targetMatch.alternation,
          shouldMerge = altMatch === undefined || alternationNdx <= altMatch.alternation && targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]) === -1;
        if (!shouldMerge && alternationNdx > altMatch.alternation) {
          for (let i = 0; i < alternationNdx; i++) {
            if (targetMatch.locator[i] !== altMatch.locator[i]) {
              alternationNdx = i;
              shouldMerge = true;
              break;
            }
          }
        }
        if (shouldMerge) {
          return mergeLoc(alternationNdx);
        }
        return false;
      }
      function handleGroup() {
        match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse);
        if (match) return true;
      }
      function handleOptional() {
        const optionalToken = match,
          mtchsNdx = matches.length;
        match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
        if (matches.length > 0) {
          // check on matches.length instead of match to handle quantifier in a recursive call
          // mark optionality in matches
          matches.forEach(function (mtch, ndx) {
            if (ndx >= mtchsNdx) {
              mtch.match.optionality = mtch.match.optionality ? mtch.match.optionality + 1 : 1;
            }
          });
          latestMatch = matches[matches.length - 1].match;
          if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) {
            // prevent loop see #698
            insertStop = true; // insert a stop
            testPos = pos; // match the position after the group
          } else {
            return match; // make the loop continue when it is deliberately by a quantifier
          }
        }
      }
      function handleAlternator() {
        function calculateMatchesLength(matches) {
          let matchesLength = 0;
          for (let ndx = 0; ndx < matches.length; ndx++) {
            const match = matches[ndx];
            if (match.isQuantifier && !isNaN(match.quantifier.max)) {
              matchesLength += match.quantifier.max;
            } else {
              matchesLength++;
            }
          }
          return matchesLength;
        }
        function isUnmatchedAlternation(alternateToken) {
          const matchesLength = alternateToken.matches[0].matches ? calculateMatchesLength(alternateToken.matches[0].matches) : 1;
          let matchesNewLength;
          for (let alndx = 0; alndx < alternateToken.matches.length; alndx++) {
            matchesNewLength = alternateToken.matches[alndx].matches ? calculateMatchesLength(alternateToken.matches[alndx].matches) : 1;
            if (matchesLength !== matchesNewLength) {
              break;
            }
          }
          return matchesLength !== matchesNewLength;
        }
        inputmask.hasAlternator = true;
        const alternateToken = match,
          malternateMatches = [],
          currentMatches = matches.slice(),
          loopNdxCnt = loopNdx.length,
          altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
        let maltMatches;
        if (altIndex === -1 || typeof altIndex === "string") {
          const currentPos = testPos,
            ndxInitializerClone = ndxInitializer.slice();
          let altIndexArr = [],
            amndx;
          if (typeof altIndex === "string") {
            altIndexArr = altIndex.split(",");
          } else {
            for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
              altIndexArr.push(amndx.toString());
            }
          }
          if (maskset.excludes[pos] !== undefined) {
            const altIndexArrClone = altIndexArr.slice();
            for (let i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
              const excludeSet = maskset.excludes[pos][i].toString().split(":");
              if (loopNdx.length == excludeSet[1]) {
                altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
              }
            }
            if (altIndexArr.length === 0) {
              // fully alternated => reset
              delete maskset.excludes[pos];
              altIndexArr = altIndexArrClone;
            }
          }
          if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) altIndexArr = altIndexArr.slice(0, 1);
          for (let ndx = 0; ndx < altIndexArr.length; ndx++) {
            amndx = parseInt(altIndexArr[ndx]);
            matches = [];
            // set the correct ndxInitializer
            ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
            // console.log("ndxInit", ndxInitializer);
            const tokenMatch = alternateToken.matches[amndx];
            if (tokenMatch && handleMatch(tokenMatch, [amndx].concat(loopNdx), quantifierRecurse)) {
              match = true;
            } else {
              // if (currentPos !== 0) {
              // only check with the first alternate
              unMatchedAlternation = isUnmatchedAlternation(alternateToken);
              // }
              if (tokenMatch && tokenMatch.matches && tokenMatch.matches.length > alternateToken.matches[0].matches.length) {
                break;
              }
            }
            maltMatches = matches.slice();
            testPos = currentPos;
            matches = [];

            // fuzzy merge matches
            for (let ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
              let altMatch = maltMatches[ndx1],
                dropMatch = false;
              altMatch.alternation = altMatch.alternation || loopNdxCnt;
              setMergeLocators(altMatch);
              for (let ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                const altMatch2 = malternateMatches[ndx2];
                if (typeof altIndex !== "string" || altMatch.alternation !== undefined && altIndex.indexOf(altMatch.locator[altMatch.alternation].toString()) !== -1) {
                  if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                    dropMatch = true;
                    setMergeLocators(altMatch2, altMatch);
                    break;
                  } else if (isSubsetOf(altMatch, altMatch2, opts)) {
                    if (setMergeLocators(altMatch, altMatch2)) {
                      dropMatch = true;
                      malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                    }
                    break;
                  } else if (isSubsetOf(altMatch2, altMatch, opts)) {
                    setMergeLocators(altMatch2, altMatch);
                    break;
                  } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                    if (setMergeLocators(altMatch, altMatch2)) {
                      // insert match above general match
                      dropMatch = true;
                      malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                    }
                    break;
                  } else if (staticCanMatchDefinition(altMatch2, altMatch)) {
                    setMergeLocators(altMatch2, altMatch);
                    // hackery to solve a mask like ([0]9)|(2a) ~ note the static 0 is optional ~ see unittest ivaninDarpatov
                    // this needs a better solution, but his will do for now
                    if (altMatch2.match.optionality && el.inputmask.userOptions.keepStatic === undefined) {
                      opts.keepStatic = currentPos;
                    }
                    break;
                  }
                }
              }
              if (!dropMatch) {
                malternateMatches.push(altMatch);
              }
            }
          }
          matches = currentMatches.concat(malternateMatches);
          testPos = pos;
          insertStop = insertStop || matches.length > 0 && unMatchedAlternation; // insert a stopelemnt when there is an alternate - needed for non-greedy option
          if (!unMatchedAlternation && insertStop) insertStopFromAlternation = true; // track insertStop set inside a symmetric alternation
          match = malternateMatches.length > 0 && !unMatchedAlternation; // set correct match state

          if (unMatchedAlternation && insertStop && !match) {
            // mark matches with unMatchedAlternationStopped
            matches.forEach(function (mtch, ndx) {
              mtch.unMatchedAlternationStopped = true;
            });
          }

          // cloneback
          ndxInitializer = ndxInitializerClone.slice();
        } else {
          match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
        }
        if (match) {
          return true;
        }
      }
      function handleQuantifier() {
        const qt = match;
        let breakloop = false;
        for (let qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
          const tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
          match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); // set the tokenGroup as quantifierRecurse marker
          if (match) {
            matches.forEach(function (mtch, ndx) {
              if (IsMatchOf(tokenGroup, mtch.match)) latestMatch = mtch.match;else latestMatch = matches[matches.length - 1].match;

              // mark optionality
              // TODO FIX RECURSIVE QUANTIFIERS
              latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
              // console.log(pos + " " + qt.quantifier.min + " " + latestMatch.optionalQuantifier);
              // qndx + 1 as the index starts from 0
              latestMatch.jit = (qndx + 1) * (tokenGroup.matches.indexOf(latestMatch) + 1) > qt.quantifier.jit;
              if ((latestMatch.optionalQuantifier || latestMatch.optionality) && isFirstMatch(latestMatch, tokenGroup)) {
                insertStop = true;
                testPos = pos; // match the position after the group
                if (opts.greedy && maskset.validPositions[pos - 1] == undefined && qndx > qt.quantifier.min && ["*", "+"].indexOf(qt.quantifier.max) != -1) {
                  matches.pop();
                  cacheDependency = undefined;
                }
                breakloop = true; // stop quantifierloop && search for next possible match
                match = false; // mark match to false to make sure the loop in optionals continues
              }
              if (!breakloop && latestMatch.jit /* && !latestMatch.optionalQuantifier */) {
                // always set jitOffset, isvalid checks when to apply
                maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch);
              }
            });
            if (breakloop) break; // search for next possible match
            return true;
          }
        }
      }
      if (testPos > pos + opts._maxTestPos) {
        throw new Error(`Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. ${maskset.mask}`);
      }
      if (testPos === pos && match.matches === undefined) {
        matches.push({
          match,
          locator: loopNdx.reverse(),
          cd: cacheDependency,
          mloc: {}
        });
        if (match.optionality && quantifierRecurse === undefined && (opts.definitions && opts.definitions[match.nativeDef] && opts.definitions[match.nativeDef].optional || definitions[match.nativeDef] && definitions[match.nativeDef].optional)) {
          // prevent loop see #698
          insertStop = true; // insert a stop
          testPos = pos; // match the position after the group
        } else {
          return true;
        }
      } else if (match.matches !== undefined) {
        if (match.isGroup && quantifierRecurse !== match) {
          // when a group pass along to the quantifier
          return handleGroup();
        } else if (match.isOptional) {
          return handleOptional();
        } else if (match.isAlternator) {
          return handleAlternator();
        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) {
          return handleQuantifier();
        } else {
          match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
          if (match) return true;
        }
      } else {
        testPos++;
      }
    }

    // the offset is set in the quantifierloop when git masking is used
    for (let tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) {
      if (maskToken.matches[tndx].isQuantifier !== true) {
        const match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
        if (match && testPos === pos) {
          return match;
        } else if (testPos > pos) {
          break;
        }
      }
    }
  }
  function IsMatchOf(tokenGroup, match) {
    let isMatch = tokenGroup.matches.indexOf(match) != -1;
    if (!isMatch) {
      tokenGroup.matches.forEach((mtch, ndx) => {
        if (mtch.matches !== undefined && !isMatch) {
          isMatch = IsMatchOf(mtch, match);
        }
      });
    }
    return isMatch;
  }
  function mergeLocators(pos, tests) {
    let locator = [];
    if (!Array.isArray(tests)) tests = [tests];
    if (tests.length > 0) {
      if (tests[0].alternation === undefined || opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && pos >= opts.keepStatic) {
        locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice();
        if (locator.length === 0) locator = tests[0].locator.slice();
      } else {
        // alternation = tests[0].locator.length - 1;
        tests.forEach(mtch => {
          Object.values(mtch.mloc).forEach(mloc => {
            mloc.forEach((loc, locNdx) => {
              // if (locNdx > alternation) return;
              const mergedPos = locator[locNdx];
              if (loc.toString().includes(":") || mergedPos && mergedPos.toString().includes(":")) return;
              if (mergedPos === undefined) {
                locator[locNdx] = loc;
              } else if (!mergedPos.toString().includes(loc)) {
                locator[locNdx] = locator[locNdx] + "," + loc;
              }
            });
          });
        });
      }
    }
    // console.log("mergeLocators", pos, tests, locator);
    return locator;
  }
  if (pos > -1) {
    if (ndxIntlzr === undefined) {
      // determine index initializer
      let previousPos = pos - 1,
        test;
      while ((test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) === undefined && previousPos > -1) {
        previousPos--;
      }
      if (test !== undefined && previousPos > -1) {
        ndxInitializer = mergeLocators(previousPos, test);
        cacheDependency = ndxInitializer.join("");
        testPos = previousPos;
      }
    }
    if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) {
      // cacheDependency is set on all tests, just check on the first
      return maskset.tests[pos];
    }
    for (let mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
      const match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
      if (match && testPos === pos || testPos > pos) {
        break;
      }
    }
  }
  if (matches.length === 0 || insertStop) {
    matches.push({
      match: {
        fn: null,
        static: true,
        optionality: false,
        casing: null,
        def: "",
        placeholder: ""
      },
      // mark when there are unmatched alternations  ex: mask: "(a|aa)"
      // this will result in the least distance to select the correct test result in determineTestTemplate
      locator: unMatchedAlternation && matches.filter(tst => tst.unMatchedAlternationStopped !== true).length === 0 ? [0] : insertStopFromAlternation && matches.length > 0 && matches.filter(tst => !tst.match.static).every(tst => tst.match.optionalQuantifier) ? [0] : [],
      mloc: {},
      cd: cacheDependency
    });
  }
  let result;
  if (ndxIntlzr !== undefined && maskset.tests[pos]) {
    // prioritize full tests for caching
    result = $.extend(true, [], matches);
  } else {
    // console.log("stored " + pos + " - " + JSON.stringify(matches));
    maskset.tests[pos] = $.extend(true, [], matches); // set a clone to prevent overwriting some props
    result = maskset.tests[pos];
  }

  // console.log(pos, JSON.stringify(matches));
  // cleanup optionality marking
  matches.forEach(t => {
    t.match.optionality = t.match.defOptionality || false;
  });
  return result;
}
;// ./lib/validation.js











// tobe put on prototype?
function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
  // pos == true => generalize
  const inputmask = this,
    $ = this.dependencyLib,
    opts = this.opts,
    maskset = inputmask.maskset;
  if (!inputmask.hasAlternator) return false;
  const validPsClone = $.extend(true, [], maskset.validPositions),
    tstClone = $.extend(true, {}, maskset.tests);
  let lastAlt,
    alternation,
    isValidRslt = false,
    returnRslt = false,
    altPos,
    prevAltPos,
    i,
    validPos,
    decisionPos,
    lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition.call(inputmask),
    nextPos,
    input,
    begin,
    end;
  if (selection) {
    begin = selection.begin;
    end = selection.end;
    if (selection.begin > selection.end) {
      begin = selection.end;
      end = selection.begin;
    }
  }
  if (lAltPos === -1 && rAltPos === undefined) {
    // do not recurse when already passed the beginning
    lastAlt = 0;
    prevAltPos = getTest.call(inputmask, lastAlt);
    alternation = prevAltPos.alternation;
  } else {
    // find last modified alternation
    for (; lAltPos >= 0; lAltPos--) {
      altPos = lAltPos === 0 ? getTest.call(inputmask, 0) : maskset.validPositions[lAltPos];
      if (altPos && altPos.alternation !== undefined) {
        if (lAltPos <= (maskPos || 0) && prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
          break;
        }
        lastAlt = lAltPos;
        alternation = altPos.alternation;
        prevAltPos = altPos;
      }
    }
  }
  if (alternation !== undefined) {
    decisionPos = parseInt(lastAlt);
    maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [];
    // generalize
    if (maskPos !== true) {
      maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos) + ":" + prevAltPos.alternation);
    }
    const validInputs = [];
    let resultPos = -1;
    for (i = decisionPos; decisionPos < getLastValidPosition.call(inputmask, undefined, true) + 1; i++) {
      if (resultPos === -1 && maskPos <= i && c !== undefined) {
        validInputs.push(c);
        resultPos = validInputs.length - 1;
      }
      validPos = maskset.validPositions[decisionPos];
      if (validPos && validPos.generatedInput !== true && (decisionPos !== 0 || validPos.input !== opts.skipOptionalPartCharacter) && (selection === undefined || i < begin || i >= end)) {
        validInputs.push(validPos.input);
      }
      // delete maskset.validPositions[i++];
      maskset.validPositions.splice(decisionPos, 1);
    }
    if (resultPos === -1 && c !== undefined) {
      validInputs.push(c);
      resultPos = validInputs.length - 1;
    }
    while (maskset.excludes[decisionPos] !== undefined && maskset.excludes[decisionPos].length < 10) {
      // maskset.tests[decisionPos] = undefined; //clear decisionPos
      maskset.tests = {}; // clear all
      resetMaskSet.call(inputmask, true); // clear getbuffer
      isValidRslt = true;
      nextPos = decisionPos - 1;
      const targetTemplate = getMaskTemplate.call(inputmask, true, 0);
      for (i = 0; i < validInputs.length; i++) {
        input = validInputs[i];
        if (targetTemplate[nextPos + 1] === input && opts.numericInput !== true) {
          nextPos++;
        } else if (i === 0 || returnRslt.caretPos !== undefined || opts.insertMode === false) {
          nextPos = seekNext.call(inputmask, nextPos);
        } else {
          nextPos = getLastValidPosition.call(inputmask, nextPos, true) + 1;
        }

        // nextPos = translatePosition.call(inputmask, nextPos);
        if (!(isValidRslt = isValid.call(inputmask, nextPos, input, false, fromIsValid, true))) {
          // if (isComplete.call(inputmask, getBuffer.call(inputmask))) {
          // isValidRslt = returnRslt; // keep previous result if any
          // }
          break;
        }
        if (i === resultPos) {
          returnRslt = isValidRslt;
        }
        if (maskPos === true && isValidRslt) {
          // return validposition on generalise
          returnRslt = {
            caretPos: i
          };
        }
      }
      if (!isValidRslt) {
        resetMaskSet.call(inputmask);
        prevAltPos = getTest.call(inputmask, decisionPos); // get the current decisionPos to exclude ~ needs to be before restoring the initial validation
        // reset & revert
        maskset.validPositions = $.extend(true, [], validPsClone);
        maskset.tests = $.extend(true, {}, tstClone); // refresh tests after possible alternating
        returnRslt = false;
        if (maskset.excludes[decisionPos]) {
          if (prevAltPos.alternation != undefined) {
            const decisionTaker = getDecisionTaker(prevAltPos);
            if (maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation) !== -1) {
              returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
              break;
            }
            maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation);
            for (i = decisionPos; i < getLastValidPosition.call(inputmask, undefined, true) + 1; i++) maskset.validPositions.splice(decisionPos);
          } else delete maskset.excludes[decisionPos];
        } else {
          // latest alternation
          returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
          break;
        }
      } else {
        break;
      }
    }
  }

  // reset alternation excludes
  if (!returnRslt || opts.keepStatic !== false) {
    delete maskset.excludes[decisionPos];
  }
  if (!returnRslt) {
    maskset.validPositions = $.extend(true, [], validPsClone);
    maskset.tests = $.extend(true, {}, tstClone); // refresh tests after possible alternating
  }
  return returnRslt;
}
function casing(elem, test, pos) {
  const opts = this.opts,
    maskset = this.maskset;
  switch (opts.casing || test.casing) {
    case "upper":
      elem = elem.toLocaleUpperCase();
      break;
    case "lower":
      elem = elem.toLocaleLowerCase();
      break;
    case "title":
      var posBefore = maskset.validPositions[pos - 1];
      if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(keyCode.Space)) {
        elem = elem.toLocaleUpperCase();
      } else {
        elem = elem.toLocaleLowerCase();
      }
      break;
    case "follow":
      if (test.def && test.def !== test.def.toLocaleLowerCase()) {
        elem = elem.toLocaleUpperCase();
      } else if (test.def && test.def !== test.def.toLocaleUpperCase()) {
        elem = elem.toLocaleLowerCase();
      }
      break;
    default:
      if (typeof opts.casing === "function") {
        const args = Array.prototype.slice.call(arguments);
        args.push(maskset.validPositions);
        elem = opts.casing.apply(this, args);
      }
  }
  return elem;
}

// tobe put on prototype?
function checkAlternationMatch(altArr1, altArr2, na) {
  const opts = this.opts;
  let altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
    isMatch = false,
    naArr = na !== undefined ? na.split(",") : [],
    naNdx;

  // remove no alternate indexes from alternation array
  for (let i = 0; i < naArr.length; i++) {
    if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
      altArr1.splice(naNdx, 1);
    }
  }
  for (let alndx = 0; alndx < altArr1.length; alndx++) {
    if (altArrC.includes(altArr1[alndx])) {
      isMatch = true;
      break;
    }
  }
  return isMatch;
}

// tobe put on prototype?
function handleRemove(input, c, pos, strict, fromIsValid) {
  const inputmask = this,
    maskset = this.maskset,
    opts = this.opts;
  if (opts.numericInput || inputmask.isRTL) {
    if (c === keys.Backspace) {
      c = keys.Delete;
    } else if (c === keys.Delete) {
      c = keys.Backspace;
    }
    if (inputmask.isRTL) {
      const pend = pos.end;
      pos.end = pos.begin;
      pos.begin = pend;
    }
  }
  const lvp = getLastValidPosition.call(inputmask, undefined, true);
  if (pos.end >= getBuffer.call(inputmask).length && lvp >= pos.end) {
    // handle numeric negate symbol offset, due to  dynamic jit masking
    pos.end = lvp + 1;
  }
  if (c === keys.Backspace) {
    if (pos.end - pos.begin < 1) {
      pos.begin = seekPrevious.call(inputmask, pos.begin);
    }
  } else if (c === keys.Delete) {
    if (pos.begin === pos.end) {
      pos.end = isMask.call(inputmask, pos.end, true, true) ? pos.end + 1 : seekNext.call(inputmask, pos.end) + 1;
    }
  }
  let offset;
  if ((offset = revalidateMask.call(inputmask, pos)) !== false) {
    if (strict !== true && opts.keepStatic !== false || opts.regex !== null && getTest.call(inputmask, pos.begin).match.def.indexOf("|") !== -1) {
      // TODO NEEDS BETTER CHECK WHEN TO ALTERNATE  ~ opts regex isn"t good enough
      alternate.call(inputmask, true);
    }
    if (strict !== true) {
      maskset.p = c === keys.Delete ? pos.begin + offset : pos.begin;
      maskset.p = determineNewCaretPosition.call(inputmask, {
        begin: maskset.p,
        end: maskset.p
      }, false, opts.insertMode === false && c === keys.Backspace ? "none" : undefined).begin;
    }
  }
}

// tobe put on prototype?
function isComplete(buffer) {
  // return true / false / undefined (repeat *)
  const inputmask = this,
    opts = this.opts,
    maskset = this.maskset;
  if (typeof opts.isComplete === "function") return opts.isComplete(buffer, opts);
  if (opts.repeat === "*") return undefined;
  let complete = false,
    lrp = determineLastRequiredPosition.call(inputmask, true),
    aml = lrp.l; // seekPrevious.call(inputmask, lrp.l);

  if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
    complete = true;
    for (let i = 0; i <= aml; i++) {
      const test = getTestTemplate.call(inputmask, i).match;
      if (test.static !== true && maskset.validPositions[i] === undefined && (test.optionality === false || test.optionality === undefined || test.optionality && test.newBlockMarker == false) && (test.optionalQuantifier === false || test.optionalQuantifier === undefined) || test.static === true && test.def != "" && buffer[i] !== getPlaceholder.call(inputmask, i, test)) {
        complete = false;
        break;
      }
    }
  }
  return complete;
}
function isSelection(posObj) {
  const inputmask = this,
    opts = this.opts,
    insertModeOffset = opts.insertMode ? 0 : 1;
  return inputmask.isRTL ? posObj.begin - posObj.end > insertModeOffset : posObj.end - posObj.begin > insertModeOffset;
}

// tobe put on prototype?
function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
  // strict true ~ no correction or autofill
  const inputmask = this,
    $ = this.dependencyLib,
    opts = this.opts,
    maskset = inputmask.maskset;
  strict = strict === true; // always set a value to strict to prevent possible strange behavior in the extensions

  let maskPos = pos;
  if (pos.begin !== undefined) {
    // position was a position object - used to handle a delete by typing over a selection
    maskPos = inputmask.isRTL ? pos.end : pos.begin;
  }
  function processCommandObject(commandObj) {
    if (commandObj !== undefined) {
      if (commandObj.remove !== undefined) {
        // remove position(s)
        if (!Array.isArray(commandObj.remove)) commandObj.remove = [commandObj.remove];
        commandObj.remove.sort(function (a, b) {
          return inputmask.isRTL ? a.pos - b.pos : b.pos - a.pos;
        }).forEach(function (lmnt) {
          revalidateMask.call(inputmask, {
            begin: lmnt,
            end: lmnt + 1
          });
        });
        commandObj.remove = undefined;
      }
      if (commandObj.insert !== undefined) {
        // insert position(s)
        if (!Array.isArray(commandObj.insert)) commandObj.insert = [commandObj.insert];
        commandObj.insert.sort(function (a, b) {
          return inputmask.isRTL ? b.pos - a.pos : a.pos - b.pos;
        }).forEach(function (lmnt) {
          if (lmnt.c !== "") {
            isValid.call(inputmask, lmnt.pos, lmnt.c, lmnt.strict !== undefined ? lmnt.strict : true, lmnt.fromIsValid !== undefined ? lmnt.fromIsValid : fromIsValid);
          }
        });
        commandObj.insert = undefined;
      }
      if (commandObj.refreshFromBuffer && commandObj.buffer) {
        const refresh = commandObj.refreshFromBuffer;
        refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, commandObj.buffer);
        commandObj.refreshFromBuffer = undefined;
      }
      if (commandObj.rewritePosition !== undefined) {
        maskPos = commandObj.rewritePosition;
        // commandObj.rewritePosition = undefined;
        commandObj = true; // see prevalidation in isValid
      }
    }
    return commandObj;
  }
  function _isValid(position, c, strict) {
    let rslt = false;
    getTests.call(inputmask, position).every(function (tst, ndx) {
      const test = tst.match;
      // make sure the buffer is set and correct
      getBuffer.call(inputmask, true);
      if (test.jit && maskset.validPositions[seekPrevious.call(inputmask, position)] === undefined) {
        // ignore if jit is not desirable
        rslt = false;
      } else {
        // return is false or a json object => { pos: ??, c: ??} or true
        if (test.displayChar !== undefined && c === test.displayChar) {
          // display char (re-read from a masked value): restore the native input when available
          const cached = inputmask._displayValueCache ? inputmask._displayValueCache[position] : undefined;
          rslt = {
            c: cached !== undefined && cached.input !== undefined ? cached.input : c,
            pos: position
          };
        } else {
          rslt = test.fn != null ? test.fn.test(c, maskset, position, strict, opts, isSelection.call(inputmask, pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" // non mask
          ? {
            c: getPlaceholder.call(inputmask, position, test, true) || test.def,
            pos: position
          } : false;
        }
      }
      if (rslt !== false) {
        let elem = rslt.c !== undefined ? rslt.c : c,
          validatedPos = position;
        elem = elem === opts.skipOptionalPartCharacter && test.static === true ? getPlaceholder.call(inputmask, position, test, true) || test.def : elem;
        rslt = processCommandObject(rslt);
        if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) {
          // their is a position offset
          validatedPos = rslt.pos;
        }
        if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
          return false; // breakout if nothing to insert
        }
        if (revalidateMask.call(inputmask, pos, $.extend({}, tst, {
          input: casing.call(inputmask, elem, test, validatedPos)
        }), fromIsValid, validatedPos) === false) {
          rslt = false;
        }
        return false; // break from loop
      }
      return true;
    });
    return rslt;
  }
  let result = true,
    positionsClone = $.extend(true, [], maskset.validPositions); // clone the currentPositions

  if (opts.keepStatic === false && maskset.excludes[maskPos] !== undefined && fromAlternate !== true && fromIsValid !== true) {
    for (let i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) {
      if (maskset.excludes[i] !== undefined) {
        maskset.excludes[i] = undefined;
        delete maskset.tests[i];
      }
    }
  }
  if (typeof opts.preValidation === "function" && fromIsValid !== true && validateOnly !== true) {
    result = opts.preValidation.call(inputmask, getBuffer.call(inputmask), maskPos, c, isSelection.call(inputmask, pos), opts, maskset, pos, strict || fromAlternate);
    result = processCommandObject(result);
  }
  if (result === true) {
    // preValidation result
    result = _isValid(maskPos, c, strict);
    if ((!strict || fromIsValid === true) && result === false && validateOnly !== true) {
      const currentPosValid = maskset.validPositions[maskPos];
      if (currentPosValid && currentPosValid.match.static === true && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
        result = {
          caret: seekNext.call(inputmask, maskPos)
        };
      } else {
        if (opts.insertMode || maskset.validPositions[seekNext.call(inputmask, maskPos)] === undefined || pos.end > maskPos) {
          // does the input match on a further position?
          let skip = false;
          if (maskset.jitOffset[maskPos] && maskset.validPositions[seekNext.call(inputmask, maskPos)] === undefined) {
            result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, true, true);
            if (result !== false) {
              if (fromAlternate !== true) result.caret = maskPos;
              skip = true;
            }
          }
          if (pos.end > maskPos) {
            maskset.validPositions[maskPos] = undefined;
          }
          if (!skip && !isMask.call(inputmask, maskPos, opts.keepStatic && maskPos === 0)) {
            for (let nPos = maskPos + 1, snPos = seekNext.call(inputmask, maskPos, false, maskPos !== 0); nPos <= snPos; nPos++) {
              // if (!isMask(nPos, true)) {
              // 	continue;
              // }
              result = _isValid(nPos, c, strict);
              if (result !== false) {
                result = trackbackPositions.call(inputmask, maskPos, result.pos !== undefined ? result.pos : nPos) || result;
                maskPos = nPos;
                break;
              }
            }
          }
        }
      }
    }
    if (inputmask.hasAlternator && fromAlternate !== true && !strict) {
      fromAlternate = true; // stop possible loop
      if (result === false) {
        // try alternating when the validation fails
        if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && maskPos >= opts.keepStatic) {
          // console.log("alternate 0");
          result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, undefined, pos);
        }
      } else if (result === true) {
        // try alternating when the validation succeeds
        // selection clears an alternated keepstatic mask ~ #2189
        if (isSelection.call(inputmask, pos) && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && opts.keepStatic) {
          // console.log("alternate 1");
          result = alternate.call(inputmask, true) || result;
        }
        // alternate by adding extra input in between
        else if (opts.numericInput !== true && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && getLastValidPosition.call(inputmask, undefined, true) > maskPos) {
          // console.log("alternate 2");
          result = alternate.call(inputmask, true) || result;
        }
      }
    }
    if (result === true) {
      result = {
        pos: maskPos
      };
    }
    if (typeof opts.postValidation === "function" && fromIsValid !== true && validateOnly !== true) {
      const postResult = opts.postValidation.call(inputmask, getBuffer.call(inputmask, true), pos.begin !== undefined ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval, fromAlternate);
      if (postResult !== undefined) {
        result = postResult === true ? result : postResult;
      }
    }
  }
  if (result && result.pos === undefined) {
    result.pos = maskPos;
  }
  if (result === false || validateOnly === true) {
    resetMaskSet.call(inputmask, true);
    maskset.validPositions = $.extend(true, [], positionsClone); // revert validation changes
  } else {
    trackbackPositions.call(inputmask, undefined, maskPos, true);
  }
  let endResult = processCommandObject(result);
  // console.log("returned result " + JSON.stringify(endResult));
  if (inputmask.maxLength !== undefined) {
    const buffer = getBuffer.call(inputmask);
    if (buffer.length > inputmask.maxLength && !fromIsValid) {
      resetMaskSet.call(inputmask, true);
      maskset.validPositions = $.extend(true, [], positionsClone); // revert validation changes
      endResult = false;
    }
  }
  return endResult;
}

// tobe put on prototype?
function positionCanMatchDefinition(pos, testDefinition, opts) {
  const inputmask = this,
    maskset = this.maskset;
  let valid = false,
    tests = getTests.call(inputmask, pos);
  for (let tndx = 0; tndx < tests.length; tndx++) {
    if (tests[tndx].match && (tests[tndx].match.nativeDef === testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] && (!opts.shiftPositions || !testDefinition.match.static) || tests[tndx].match.nativeDef === testDefinition.match.nativeDef || opts.regex && !tests[tndx].match.static && tests[tndx].match.fn.test(testDefinition.input, maskset, pos, false, opts))) {
      valid = true;
      break;
    } else if (tests[tndx].match && tests[tndx].match.def === testDefinition.match.nativeDef) {
      valid = undefined;
      break;
    }
  }
  if (valid === false) {
    if (maskset.jitOffset[pos] !== undefined) {
      valid = positionCanMatchDefinition.call(inputmask, pos + maskset.jitOffset[pos], testDefinition, opts);
    }
  }
  return valid;
}

// tobe put on prototype?
function refreshFromBuffer(start, end, buffer) {
  const inputmask = this,
    maskset = this.maskset,
    opts = this.opts,
    $ = this.dependencyLib;
  // checkVal.call(inputmask, el, false, true, isRTL ? buffer.reverse() : buffer);
  let i,
    p,
    skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
    bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer;
  opts.skipOptionalPartCharacter = "";
  if (start === true) {
    resetMaskSet.call(inputmask, false);
    start = 0;
    end = buffer.length;
    p = determineNewCaretPosition.call(inputmask, {
      begin: 0,
      end: 0
    }, false).begin;
  } else {
    for (i = start; i < end; i++) {
      delete maskset.validPositions[i];
    }
    p = start;
  }
  const keypress = new $.Event("keypress");
  for (i = start; i < end; i++) {
    keypress.key = bffr[i].toString();
    inputmask.ignorable = false; // make sure ignorable is ignored ;-)
    const valResult = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, false, p);
    if (valResult !== false && valResult !== undefined) {
      p = valResult.forwardPosition;
    }
  }
  opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}

// tobe put on prototype?
// fill in best positions according the current input
function trackbackPositions(originalPos, newPos, fillOnly) {
  const inputmask = this,
    maskset = this.maskset,
    $ = this.dependencyLib;

  // console.log("trackbackPositions " + originalPos + " " + newPos);
  if (originalPos === undefined) {
    // find previous valid
    for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
      if (maskset.validPositions[originalPos]) break;
    }
  }
  for (let ps = originalPos; ps < newPos; ps++) {
    if (maskset.validPositions[ps] === undefined && !isMask.call(inputmask, ps, false)) {
      const vp = ps == 0 ? getTest.call(inputmask, ps) : maskset.validPositions[ps - 1];
      if (vp) {
        const tests = getTests.call(inputmask, ps).slice();
        if (tests[tests.length - 1].match.def === "") tests.pop();
        var bestMatch = determineTestTemplate.call(inputmask, ps, tests),
          np;
        if (bestMatch && (bestMatch.match.jit !== true || bestMatch.match.newBlockMarker === "master" && (np = maskset.validPositions[ps + 1]) && np.match.optionalQuantifier === true)) {
          bestMatch = $.extend({}, bestMatch, {
            input: getPlaceholder.call(inputmask, ps, bestMatch.match, true) || bestMatch.match.def
          });
          bestMatch.generatedInput = true;
          revalidateMask.call(inputmask, ps, bestMatch, true);
          if (fillOnly !== true) {
            // revalidate the new position to update the locator value
            const cvpInput = maskset.validPositions[newPos].input;
            maskset.validPositions[newPos] = undefined;
            return isValid.call(inputmask, newPos, cvpInput, true, true);
          }
        }
      }
    }
  }
}

// tobe put on prototype?
function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
  // console.log("revalidateMask " + fromIsValid);
  const inputmask = this,
    maskset = this.maskset,
    opts = this.opts,
    $ = this.dependencyLib;
  function IsEnclosedStatic(pos, valids, selection) {
    const posMatch = valids[pos];
    if (posMatch !== undefined && posMatch.match.static === true && posMatch.match.optionality !== true && (valids[0] === undefined || valids[0].alternation === undefined)) {
      const prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match.static === true && valids[pos - 1] : valids[pos - 1],
        nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match.static === true && valids[pos + 1] : valids[pos + 1];
      return prevMatch && nextMatch;
    }
    return false;
  }
  let offset = 0,
    begin = pos.begin !== undefined ? pos.begin : pos,
    end = pos.end !== undefined ? pos.end : pos,
    valid = true;
  if (pos.begin > pos.end) {
    begin = pos.end;
    end = pos.begin;
  }
  validatedPos = validatedPos !== undefined ? validatedPos : begin;
  if (fromIsValid === undefined && (begin !== end || opts.insertMode && maskset.validPositions[validatedPos] !== undefined || validTest === undefined || validTest.match.optionalQuantifier || validTest.match.optionality)) {
    // reposition & revalidate others
    let positionsClone = $.extend(true, [], maskset.validPositions),
      lvp = getLastValidPosition.call(inputmask, undefined, true),
      i;
    maskset.p = begin; // needed for alternated position after overtype selection

    const clearpos = isSelection.call(inputmask, pos) ? begin : validatedPos;
    for (i = lvp; i >= clearpos; i--) {
      maskset.validPositions.splice(i, 1);
      if (validTest === undefined) delete maskset.tests[i + 1];
    }
    let j = validatedPos,
      posMatch = j,
      t,
      canMatch,
      test;
    if (validTest) {
      maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
      posMatch++;
      j++;
    }
    if (positionsClone[end] == undefined && maskset.jitOffset[end]) {
      end += maskset.jitOffset[end] + (validTest ? 1 : 0);
    }
    for (i = validTest ? end : end - 1; i <= lvp; i++) {
      if ((t = positionsClone[i]) !== undefined && (opts.shiftPositions !== true || t.generatedInput !== true) && (i >= end || i >= begin && IsEnclosedStatic(i, positionsClone, {
        begin,
        end
      }))) {
        while (test = getTest.call(inputmask, posMatch), test.match.def !== "") {
          // loop needed to match further positions
          if ((canMatch = positionCanMatchDefinition.call(inputmask, posMatch, t, opts)) !== false || t.match.def === "+") {
            // validated match //we still need some hackery for the + validator (numeric alias)
            if (t.match.def === "+") getBuffer.call(inputmask, true);
            const result = isValid.call(inputmask, posMatch, t.input, t.match.def !== "+", /* t.match.def !== "+" */true);
            valid = result !== false;
            j = (result.pos || posMatch) + 1;
            if (!valid && canMatch) break;
          } else {
            valid = false;
          }
          if (valid) {
            if (validTest === undefined && t.match.static && i === pos.begin) offset++;
            break;
          }
          if (!valid && getBuffer.call(inputmask), posMatch > maskset.maskLength) {
            break;
          }
          posMatch++;
        }
        if (getTest.call(inputmask, posMatch).match.def == "") {
          valid = false;
        }
        // restore position
        posMatch = j;
      }
      if (!valid) break;
    }
    if (!valid) {
      maskset.validPositions = $.extend(true, [], positionsClone);
      resetMaskSet.call(inputmask, true);
      return false;
    }
  } else if (validTest && getTest.call(inputmask, validatedPos).match.cd === validTest.match.cd) {
    maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
  }
  resetMaskSet.call(inputmask, true);
  return offset;
}
;// ./lib/positioning.js





// tobe put on prototype?
function caret(input, begin, end, notranslate, isDelete) {
  const inputmask = this,
    opts = this.opts;
  let range;
  if (begin !== undefined) {
    if (Array.isArray(begin)) {
      end = inputmask.isRTL ? begin[0] : begin[1];
      begin = inputmask.isRTL ? begin[1] : begin[0];
    }
    if (begin.begin !== undefined) {
      end = inputmask.isRTL ? begin.begin : begin.end;
      begin = inputmask.isRTL ? begin.end : begin.begin;
    }
    if (typeof begin === "number") {
      begin = notranslate ? begin : translatePosition.call(inputmask, begin);
      end = notranslate ? end : translatePosition.call(inputmask, end);
      end = typeof end === "number" ? end : begin;
      // if (!$(input).is(":visible")) {
      // 	return;
      // }

      const scrollCalc = parseInt(((input.ownerDocument.defaultView || global_window).getComputedStyle ? (input.ownerDocument.defaultView || global_window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
      input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
      input.inputmask.caretPos = {
        begin,
        end
      }; // track caret internally
      if (opts.insertModeVisual && opts.insertMode === false && begin === end) {
        if (!isDelete) {
          end++; // set visualization for insert/overwrite mode
        }
      }
      if (input === input.getRootNode().activeElement) {
        if ("setSelectionRange" in input) {
          input.setSelectionRange(begin, end);
        } else if (global_window.getSelection) {
          range = document.createRange();
          if (input.firstChild === undefined || input.firstChild === null) {
            const textNode = document.createTextNode("");
            input.appendChild(textNode);
          }
          range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
          range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
          range.collapse(true);
          const sel = global_window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          // input.focus();
        } else if (input.createTextRange) {
          range = input.createTextRange();
          range.collapse(true);
          range.moveEnd("character", end);
          range.moveStart("character", begin);
          range.select();
        }
        input.inputmask.caretHook === undefined || input.inputmask.caretHook.call(inputmask, {
          begin,
          end
        });
      }
    }
  } else {
    if ("selectionStart" in input && "selectionEnd" in input) {
      begin = input.selectionStart;
      end = input.selectionEnd;
    } else if (global_window.getSelection) {
      range = global_window.getSelection().getRangeAt(0);
      if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
        begin = range.startOffset;
        end = range.endOffset;
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
      end = begin + range.text.length;
    }

    // if (opts.insertModeVisual && opts.insertMode === false && begin === (end - 1)) end--; //correct caret for insert/overwrite mode

    return {
      begin: notranslate ? begin : translatePosition.call(inputmask, begin),
      end: notranslate ? end : translatePosition.call(inputmask, end)
    };
  }
}

// tobe put on prototype?
function determineLastRequiredPosition(returnDefinition) {
  const inputmask = this,
    {
      maskset,
      dependencyLib: $
    } = inputmask,
    lvp = getLastValidPosition.call(inputmask),
    positions = {},
    lvTest = maskset.validPositions[lvp],
    buffer = getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true, true);
  let bl = buffer.length,
    pos,
    ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
    testPos;
  for (pos = lvp + 1; pos < buffer.length; pos++) {
    testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
    ndxIntlzr = testPos.locator.slice();
    positions[pos] = $.extend(true, {}, testPos);
  }
  const lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
  for (pos = bl - 1; pos > lvp; pos--) {
    testPos = positions[pos];
    if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.static !== true || testPos.match.static === true && testPos.locator[lvTest.alternation] && checkAlternationMatch.call(inputmask, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && getTests.call(inputmask, pos)[0].def !== "")) && buffer[pos] === getPlaceholder.call(inputmask, pos, testPos.match)) {
      bl--;
      if (testPos.match.optionality) {
        // find the last position that is not optional ~ isoptional and newblockmarker == "master"
        let prevPos = pos;
        while (prevPos > 0) {
          const test = getTest.call(inputmask, prevPos);
          if (test.match.newBlockMarker === "master" || test.match.newBlockMarker === true) {
            break;
          }
          prevPos--;
        }
        if (maskset.validPositions[prevPos] !== undefined) {
          break;
        }
      }
    } else {
      break;
    }
  }

  // no extra required positions
  if (pos === lvp) {
    bl = pos;
  }
  return returnDefinition ? {
    l: bl,
    def: positions[bl] ? positions[bl].match : undefined
  } : bl;
}

// tobe put on prototype?
function determineNewCaretPosition(selectedCaret, tabbed, positionCaretOnClick) {
  const inputmask = this,
    {
      maskset,
      opts
    } = inputmask;
  let clickPosition, lvclickPosition, lastPosition;
  function doRadixFocus(clickPos) {
    if (opts.radixPoint !== "" && opts.digits !== 0) {
      const vps = maskset.validPositions;
      if (vps[clickPos] === undefined || vps[clickPos].input === undefined) {
        if (clickPos < seekNext.call(inputmask, -1)) return true;
        const radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
        if (radixPos !== -1) {
          for (const vp in vps) {
            const pos = Number(vp);
            if (radixPos < pos && vps[vp].input !== getPlaceholder.call(inputmask, pos)) {
              return false;
            }
          }
          return true;
        }
      }
    }
    return false;
  }
  if (tabbed) {
    if (inputmask.isRTL) {
      selectedCaret.end = selectedCaret.begin;
    } else {
      selectedCaret.begin = selectedCaret.end;
    }
  }
  if (selectedCaret.begin === selectedCaret.end) {
    positionCaretOnClick = positionCaretOnClick || opts.positionCaretOnClick;
    switch (positionCaretOnClick) {
      case "none":
        break;
      case "select":
        selectedCaret = {
          begin: 0,
          end: getBuffer.call(inputmask).length
        };
        break;
      case "ignore":
        selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
        break;
      case "radixFocus":
        if (inputmask.clicked > 1 && maskset.validPositions.length === 0) break;
        if (doRadixFocus(selectedCaret.begin)) {
          const radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
          selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
          break;
        }
      // fallback to lvp
      // eslint-disable-next-line no-fallthrough
      default:
        // lvp:
        clickPosition = selectedCaret.begin;
        lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, true);
        lastPosition = seekNext.call(inputmask, lvclickPosition === -1 && !isMask.call(inputmask, 0) ? -1 : lvclickPosition);
        if (clickPosition <= lastPosition) {
          selectedCaret.end = selectedCaret.begin = !isMask.call(inputmask, clickPosition, false, true) ? seekNext.call(inputmask, clickPosition) : clickPosition;
        } else {
          const lvp = maskset.validPositions[lvclickPosition],
            tt = getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : undefined, lvp),
            placeholder = getPlaceholder.call(inputmask, lastPosition, tt.match);
          if (placeholder !== "" && getBuffer.call(inputmask)[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true || !isMask.call(inputmask, lastPosition, opts.keepStatic, true) && tt.match.def === placeholder) {
            const newPos = seekNext.call(inputmask, lastPosition);
            if (clickPosition >= newPos || clickPosition === lastPosition) {
              lastPosition = newPos;
            }
          }
          selectedCaret.end = selectedCaret.begin = lastPosition;
        }
    }
    return selectedCaret;
  }
}

// tobe put on prototype?
function getBuffer(noCache) {
  const inputmask = this,
    {
      maskset
    } = inputmask;
  if (maskset.buffer === undefined || noCache === true) {
    maskset.buffer = getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true);
    if (maskset._buffer === undefined) maskset._buffer = maskset.buffer.slice();
  }
  return maskset.buffer;
}

// tobe put on prototype?
function getBufferTemplate() {
  const inputmask = this,
    maskset = this.maskset;
  if (maskset._buffer === undefined) {
    // generate template
    maskset._buffer = getMaskTemplate.call(inputmask, false, 1);
    if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
  }
  return maskset._buffer;
}

// tobe put on prototype?
function getLastValidPosition(closestTo, strict, validPositions) {
  const maskset = this.maskset;
  let before = -1,
    after = -1;
  const valids = validPositions || maskset.validPositions; // for use in valhook ~ context switch
  if (closestTo === undefined) closestTo = -1;
  for (let psNdx = 0, vpl = valids.length; psNdx < vpl; psNdx++) {
    if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
      if (psNdx <= closestTo) before = psNdx;
      if (psNdx >= closestTo) after = psNdx;
    }
  }
  return before === -1 || before === closestTo ? after : after === -1 ? before : closestTo - before < after - closestTo ? before : after;
}

// tobe put on prototype?
function isMask(pos, strict, fuzzy) {
  const inputmask = this,
    maskset = this.maskset;
  let test = getTestTemplate.call(inputmask, pos).match;
  if (test.def === "") test = getTest.call(inputmask, pos).match;
  if (test.static !== true) {
    return test.fn;
  }
  if (fuzzy === true && maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].generatedInput !== true) {
    return true;
  }
  if (strict !== true && pos > -1) {
    if (fuzzy) {
      // check on the number of tests
      const tests = getTests.call(inputmask, pos);
      return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
    }
    // else based on the template
    const testTemplate = determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos)),
      testPlaceHolder = getPlaceholder.call(inputmask, pos, testTemplate.match);
    return testTemplate.match.def !== testPlaceHolder;
  }
  return false;
}

// tobe put on prototype?
// soft ~ undefined reset validpositions; soft = false also reset tests; soft = true only reset the maskset
function resetMaskSet(soft) {
  const maskset = this.maskset;
  maskset.buffer = undefined;
  if (soft !== true) {
    maskset.validPositions = [];
    maskset.p = 0;
  }
  if (soft === false) {
    maskset.tests = {};
    maskset.jitOffset = {};
  }
}

// tobe put on prototype?
function seekNext(pos, newBlock, fuzzy) {
  const inputmask = this;
  if (fuzzy === undefined) fuzzy = true;
  let position = pos + 1;
  while (getTest.call(inputmask, position).match.def !== "" && (newBlock === true && (getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true)) || newBlock !== true && !isMask.call(inputmask, position, undefined, fuzzy))) {
    position++;
  }
  return position;
}

// tobe put on prototype?
function seekPrevious(pos, newBlock) {
  const inputmask = this;
  let position = pos - 1;
  if (pos <= 0) return 0;
  while (position > 0 && (newBlock === true && (getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true)) || newBlock !== true && !isMask.call(inputmask, position, undefined, true))) {
    position--;
  }
  return position;
}

// tobe put on prototype?
function translatePosition(pos) {
  const inputmask = this,
    opts = this.opts,
    el = this.el;
  if (inputmask.isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
    pos = inputmask._valueGet().length - pos;
    if (pos < 0) pos = 0;
  }
  return pos;
}
;// ./lib/eventhandlers.js











const EventHandlers = {
  keyEvent: function (e, checkval, writeOut, strict, ndx) {
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib,
      maskset = inputmask.maskset,
      input = this,
      $input = $(input),
      c = e.key,
      pos = caret.call(inputmask, input),
      kdResult = opts.onKeyDown.call(this, e, getBuffer.call(inputmask), pos, opts);
    if (kdResult !== undefined) return kdResult;

    // backspace, delete, and escape get special treatment
    if (c === keys.Backspace || c === keys.Delete || iphone && c === keys.BACKSPACE_SAFARI || e.ctrlKey && c === keys.x && !("oncut" in input)) {
      // backspace/delete
      e.preventDefault(); // stop default action but allow propagation
      handleRemove.call(inputmask, input, c, pos);
      writeBuffer(input, getBuffer.call(inputmask, true), maskset.p, e, input.inputmask._valueGet() !== getBuffer.call(inputmask).join(""));
    } else if (c === keys.End || c === keys.PageDown) {
      // when END or PAGE_DOWN pressed set position at lastmatch
      e.preventDefault();
      const caretPos = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
      caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
    } else if (c === keys.Home && !e.shiftKey || c === keys.PageUp) {
      // Home or page_up
      e.preventDefault();
      caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, true);
    } else if ((opts.undoOnEscape && c === keys.Escape ||
    // eslint-disable-next-line no-constant-binary-expression -- TODO: revisit, ctrl+z undo branch is disabled via `false &&`, see #762
     false && 0) && e.altKey !== true) {
      // escape && undo && #762
      checkVal(input, true, false, inputmask.undoValue.split(""));
      $input.trigger("click");
    } else if (c === keys.Insert && !(e.shiftKey || e.ctrlKey) && inputmask.userOptions.insertMode === undefined) {
      // insert
      if (!isSelection.call(inputmask, pos)) {
        opts.insertMode = !opts.insertMode;
        caret.call(inputmask, input, pos.begin, pos.begin);
      } else opts.insertMode = !opts.insertMode;
    } else if (opts.tabThrough === true && c === keys.Tab) {
      if (e.shiftKey === true) {
        pos.end = seekPrevious.call(inputmask, pos.end, true);
        if (getTest.call(inputmask, pos.end - 1).match.static === true) {
          pos.end--;
        }
        pos.begin = seekPrevious.call(inputmask, pos.end, true);
        if (pos.begin >= 0 && pos.end > 0) {
          e.preventDefault();
          caret.call(inputmask, input, pos.begin, pos.end);
        }
      } else {
        pos.begin = seekNext.call(inputmask, pos.begin, true);
        pos.end = seekNext.call(inputmask, pos.begin, true);
        if (pos.end < maskset.maskLength) pos.end--;
        if (pos.begin <= maskset.maskLength) {
          e.preventDefault();
          caret.call(inputmask, input, pos.begin, pos.end);
        }
      }
    } else if (!e.shiftKey) {
      if (opts.insertModeVisual && opts.insertMode === false) {
        if (c === keys.ArrowRight) {
          setTimeout(function () {
            const caretPos = caret.call(inputmask, input);
            caret.call(inputmask, input, caretPos.begin);
          }, 0);
        } else if (c === keys.ArrowLeft) {
          setTimeout(function () {
            const caretPos = {
              begin: translatePosition.call(inputmask, input.inputmask.caretPos.begin),
              end: translatePosition.call(inputmask, input.inputmask.caretPos.end)
            };
            if (inputmask.isRTL) {
              caret.call(inputmask, input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1));
            } else {
              caret.call(inputmask, input, caretPos.begin - (caretPos.begin === 0 ? 0 : 1));
            }
          }, 0);
        }
      } else {
        inputmask.keyEventHook === undefined || inputmask.keyEventHook(e);
      }
    }
    inputmask.isComposing = c === keys.Process || c === keys.Unidentified;
    inputmask.ignorable = c === undefined || c.length > 1;
    return EventHandlers.keypressEvent.call(inputmask, e, checkval, writeOut, strict, ndx);
  },
  keypressEvent: function (e, checkval, writeOut, strict, ndx) {
    const inputmask = this.inputmask || this,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib,
      maskset = inputmask.maskset,
      input = inputmask.el,
      $input = $(input);
    let c = e.key;
    if (checkval !== true && !(e.ctrlKey && e.altKey && !inputmask.ignorable) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) {
      if (c === keys.Enter) {
        if (inputmask.undoValue !== inputmask._valueGet(true)) {
          inputmask.undoValue = inputmask._valueGet(true);
          setTimeout(function () {
            $input.trigger("change");
          }, 0);
        }
      }
    } else if (c) {
      // special treat the decimal separator
      // if ((k === 44 || k === 46) && e.location === 3 && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
      let pos = checkval ? {
          begin: ndx,
          end: ndx
        } : caret.call(inputmask, input),
        forwardPosition;

      // allow for character substitution
      if (!checkval) c = opts.substitutes[c] || c;
      maskset.writeOutBuffer = true;
      const valResult = isValid.call(inputmask, pos, c, strict, undefined, undefined, undefined, checkval);
      if (valResult !== false) {
        resetMaskSet.call(inputmask, true);
        forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos);
        maskset.p = forwardPosition; // needed for checkval
      }
      forwardPosition = opts.numericInput && valResult.caret === undefined ? seekPrevious.call(inputmask, forwardPosition) : forwardPosition;
      if (writeOut !== false) {
        setTimeout(function () {
          opts.onKeyValidation.call(input, c, valResult);
        }, 0);
        if (maskset.writeOutBuffer && valResult !== false) {
          const buffer = getBuffer.call(inputmask);
          writeBuffer(input, buffer, forwardPosition, e, checkval !== true);
        }
      }
      e.preventDefault();
      if (checkval) {
        if (valResult !== false) valResult.forwardPosition = forwardPosition;
        return valResult;
      }
    }
  },
  pasteEvent: async function (e) {
    function handlePaste(inputmask, input, inputValue, pastedValue, onBeforePaste) {
      let caretPos = caret.call(inputmask, input, undefined, undefined, true),
        valueBeforeCaret = inputValue.substr(0, caretPos.begin),
        valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
      if (valueBeforeCaret == (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
      if (valueAfterCaret == (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(caretPos.end).join("")) valueAfterCaret = "";
      pastedValue = valueBeforeCaret + pastedValue + valueAfterCaret;
      if (inputmask.isRTL && opts.numericInput !== true) {
        pastedValue = pastedValue.split("");
        for (const c of getBufferTemplate.call(inputmask)) {
          if (pastedValue[0] === c) pastedValue.shift();
        }
        pastedValue = pastedValue.reverse().join("");
      }
      let pasteValue = pastedValue;
      if (typeof onBeforePaste === "function") {
        pasteValue = onBeforePaste.call(inputmask, pasteValue, opts);
        if (pasteValue === false) {
          return false;
        }
        if (!pasteValue) {
          pasteValue = inputValue;
        }
      }
      checkVal(input, true, false, pasteValue.toString().split(""), e);
    }
    const input = this,
      inputmask = this.inputmask,
      opts = inputmask.opts;
    let inputValue = inputmask._valueGet(true),
      pastedValue;
    inputmask.skipInputEvent = true;
    if (e.clipboardData && e.clipboardData.getData) {
      pastedValue = e.clipboardData.getData("text/plain");
    } else if (global_window.clipboardData && global_window.clipboardData.getData) {
      // IE
      pastedValue = global_window.clipboardData.getData("Text");
    }
    handlePaste(inputmask, input, inputValue, pastedValue, opts.onBeforePaste);
    e.preventDefault();
  },
  inputFallBackEvent: function (e) {
    // fallback when keypress is not triggered
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib;

    // console.log(e.inputType);

    function analyseChanges(inputValue, buffer, caretPos) {
      let frontPart = inputValue.substr(0, caretPos.begin).split(""),
        backPart = inputValue.substr(caretPos.begin).split(""),
        frontBufferPart = buffer.substr(0, caretPos.begin).split(""),
        backBufferPart = buffer.substr(caretPos.begin).split(""),
        fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length,
        bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length,
        bl,
        i,
        action = "",
        data = [],
        marker = "~",
        placeholder;

      // align buffers
      while (frontPart.length < fpl) frontPart.push(marker);
      while (frontBufferPart.length < fpl) frontBufferPart.push(marker);
      while (backPart.length < bpl) backPart.unshift(marker);
      while (backBufferPart.length < bpl) backBufferPart.unshift(marker);
      const newBuffer = frontPart.concat(backPart),
        oldBuffer = frontBufferPart.concat(backBufferPart);

      // console.log("N " + newBuffer);
      // console.log("O " + oldBuffer);

      for (i = 0, bl = newBuffer.length; i < bl; i++) {
        placeholder = getPlaceholder.call(inputmask, translatePosition.call(inputmask, i));
        switch (action) {
          case "insertText":
            if (oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1) {
              data.push(newBuffer[i]);
            }
            i = bl;
            break;
          case "insertReplacementText":
            if (newBuffer[i] === marker) {
              // extend selection
              caretPos.end++;
            } else {
              // breakout loop
              i = bl;
            }
            break;
          case "deleteContentBackward":
            if (newBuffer[i] === marker) {
              caretPos.end++;
            } else {
              // breakout loop
              i = bl;
            }
            break;
          default:
            if (newBuffer[i] !== oldBuffer[i]) {
              if ((newBuffer[i + 1] === marker || newBuffer[i + 1] === placeholder || newBuffer[i + 1] === undefined) && (oldBuffer[i] === placeholder && oldBuffer[i + 1] === marker || oldBuffer[i] === marker)) {
                // basic insert
                action = "insertText";
                data.push(newBuffer[i]);
                caretPos.begin--;
                caretPos.end--;
              } else if (oldBuffer[i + 1] === marker && oldBuffer[i] === newBuffer[i + 1]) {
                // insert between
                action = "insertText";
                data.push(newBuffer[i]);
                caretPos.begin--;
                caretPos.end--;
              } else if (newBuffer[i] !== placeholder && newBuffer[i] !== marker && (newBuffer[i + 1] === marker || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) /* single char replacement */) {
                // replace selection
                action = "insertReplacementText";
                data.push(newBuffer[i]);
                caretPos.begin--;
              } else if (newBuffer[i] === marker) {
                // delete~backspace
                action = "deleteContentBackward";
                if (isMask.call(inputmask, translatePosition.call(inputmask, i), true) || oldBuffer[i] === opts.radixPoint) caretPos.end++;
              } else {
                i = bl;
              }
            }
            break;
        }
      }
      return {
        action,
        data,
        caret: caretPos
      };
    }
    let input = this,
      inputValue = input.inputmask._valueGet(true),
      buffer = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join(""),
      caretPos = caret.call(inputmask, input, undefined, undefined, true),
      changes;
    if (buffer !== inputValue) {
      changes = analyseChanges(inputValue, buffer, caretPos);
      if (input.getRootNode().activeElement !== input) {
        input.focus();
      }
      writeBuffer(input, getBuffer.call(inputmask));
      caret.call(inputmask, input, caretPos.begin, caretPos.end, true);

      // Japanese IME hack #2662
      if (!mobile && inputmask.skipNextInsert && e.inputType === "insertText" && changes.action === "insertText" && inputmask.isComposing) {
        return false;
      }
      if (e.inputType === "insertCompositionText" && changes.action === "insertText" && inputmask.isComposing) {
        inputmask.skipNextInsert = true;
      } else {
        inputmask.skipNextInsert = false;
      }
      switch (changes.action) {
        case "insertText":
        case "insertReplacementText":
          changes.data.forEach(function (entry, ndx) {
            const keypress = new $.Event("keypress");
            keypress.key = entry;
            inputmask.ignorable = false; // make sure ignorable is ignored ;-)
            EventHandlers.keypressEvent.call(input, keypress);
          });
          setTimeout(function () {
            // #2195 trigger keyup to help some other plugins to track changes
            inputmask.$el.trigger("keyup");
          }, 0);
          break;
        case "deleteContentBackward":
          var keydown = new $.Event("keydown");
          keydown.key = keys.Backspace;
          EventHandlers.keyEvent.call(input, keydown);
          break;
        default:
          applyInputValue(input, inputValue, e);
          caret.call(inputmask, input, caretPos.begin, caretPos.end, true);
          break;
      }
      e.preventDefault();
    }
  },
  setValueEvent: function (e) {
    const inputmask = this.inputmask,
      $ = inputmask.dependencyLib;
    let input = this,
      value = e && e.detail ? e.detail[0] : arguments[1];
    if (value === undefined) {
      value = input.inputmask._valueGet(true);
    }
    applyInputValue(input, value, new $.Event("input"), (e && e.detail ? e.detail[0] : arguments[1]) !== undefined);
    if (e.detail && e.detail[1] !== undefined || arguments[2] !== undefined) {
      caret.call(inputmask, input, e.detail ? e.detail[1] : arguments[2]);
    }
  },
  focusEvent: function (e) {
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      input = this,
      nptValue = inputmask && inputmask._valueGet();
    if (opts.showMaskOnFocus) {
      if (nptValue !== getBuffer.call(inputmask).join("")) {
        writeBuffer(input, getBuffer.call(inputmask), seekNext.call(inputmask, getLastValidPosition.call(inputmask)));
      } /* else if (mouseEnter === false) { //only executed on focus without mouseenter
        caret(input, seekNext(getLastValidPosition()));
        } */
    }
    if (opts.positionCaretOnTab === true && inputmask.mouseEnter === false && (!isComplete.call(inputmask, getBuffer.call(inputmask)) || getLastValidPosition.call(inputmask) === -1)) {
      EventHandlers.clickEvent.apply(input, [e, true]);
    }
    inputmask.undoValue = inputmask && inputmask._valueGet(true);
  },
  invalidEvent: function (e) {
    this.inputmask.validationEvent = true;
  },
  mouseleaveEvent: function () {
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      input = this;
    inputmask.mouseEnter = false;
    if (opts.clearMaskOnLostFocus && input.getRootNode().activeElement !== input) {
      HandleNativePlaceholder(input, inputmask.originalPlaceholder);
    }
  },
  clickEvent: function (e, tabbed) {
    const inputmask = this.inputmask;
    inputmask.clicked++;
    const input = this;
    if (input.getRootNode().activeElement === input) {
      const newCaretPosition = determineNewCaretPosition.call(inputmask, caret.call(inputmask, input), tabbed);
      if (newCaretPosition !== undefined) {
        caret.call(inputmask, input, newCaretPosition);
      }
    }
  },
  cutEvent: function (e) {
    const inputmask = this.inputmask,
      maskset = inputmask.maskset,
      input = this,
      pos = caret.call(inputmask, input),
      // correct clipboardData
      clipData = inputmask.isRTL ? getBuffer.call(inputmask).slice(pos.end, pos.begin) : getBuffer.call(inputmask).slice(pos.begin, pos.end),
      clipDataText = inputmask.isRTL ? clipData.reverse().join("") : clipData.join("");
    if (global_window.navigator && global_window.navigator.clipboard) global_window.navigator.clipboard.writeText(clipDataText);else if (global_window.clipboardData && global_window.clipboardData.getData) {
      // IE
      global_window.clipboardData.setData("Text", clipDataText);
    }
    handleRemove.call(inputmask, input, keys.Delete, pos);
    writeBuffer(input, getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== inputmask._valueGet(true));
  },
  blurEvent: function (e) {
    const inputmask = this.inputmask,
      opts = inputmask.opts,
      $ = inputmask.dependencyLib;
    inputmask.clicked = 0;
    const $input = $(this),
      input = this;
    if (input.inputmask) {
      HandleNativePlaceholder(input, inputmask.originalPlaceholder);
      let nptValue = input.inputmask._valueGet(),
        buffer = getBuffer.call(inputmask).slice();
      if (nptValue !== "") {
        if (opts.clearMaskOnLostFocus) {
          if (getLastValidPosition.call(inputmask) === -1 && nptValue === getBufferTemplate.call(inputmask).join("")) {
            buffer = [];
          } else {
            // clearout optional tail of the mask
            clearOptionalTail.call(inputmask, buffer);
          }
        }
        if (isComplete.call(inputmask, buffer) === false) {
          setTimeout(function () {
            $input.trigger("incomplete");
          }, 0);
          if (opts.clearIncomplete) {
            resetMaskSet.call(inputmask, false);
            if (opts.clearMaskOnLostFocus) {
              buffer = [];
            } else {
              buffer = getBufferTemplate.call(inputmask).slice();
            }
          }
        }
        writeBuffer(input, buffer, undefined, e);
      }
      nptValue = inputmask._valueGet(true);
      if (inputmask.undoValue !== nptValue) {
        const bufferTemplateStr = (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("");
        if (nptValue !== "" || inputmask.undoValue !== bufferTemplateStr || inputmask.undoValue === bufferTemplateStr && inputmask.maskset.validPositions.length > 0) {
          inputmask.undoValue = nptValue;
          $input.trigger("change");
        }
      }
    }
  },
  mouseenterEvent: function () {
    const inputmask = this.inputmask,
      {
        showMaskOnHover
      } = inputmask.opts,
      input = this;
    inputmask.mouseEnter = true;
    if (input.getRootNode().activeElement !== input) {
      const bufferTemplate = (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("");
      if (showMaskOnHover) {
        HandleNativePlaceholder(input, bufferTemplate);
      }
    }
  },
  submitEvent: function () {
    // trigger change on submit if any
    const inputmask = this.inputmask,
      opts = inputmask.opts;
    if (inputmask.undoValue !== inputmask._valueGet(true)) {
      inputmask.$el.trigger("change");
    }
    if (/* opts.clearMaskOnLostFocus && */getLastValidPosition.call(inputmask) === -1 && inputmask._valueGet && inputmask._valueGet() === getBufferTemplate.call(inputmask).join("")) {
      inputmask._valueSet(""); // clear masktemplete on submit and still has focus
    }
    if (opts.clearIncomplete && isComplete.call(inputmask, getBuffer.call(inputmask)) === false) {
      inputmask._valueSet("");
    }
    if (opts.removeMaskOnSubmit) {
      inputmask._valueSet(inputmask.unmaskedvalue(), true);
      setTimeout(function () {
        writeBuffer(inputmask.el, getBuffer.call(inputmask));
      }, 0);
    }
  },
  resetEvent: function () {
    const inputmask = this.inputmask;
    inputmask.refreshValue = true; // indicate a forced refresh when there is a call to the value before leaving the triggering event fn
    setTimeout(function () {
      applyInputValue(inputmask.el, inputmask._valueGet(true));
    }, 0);
  }
};
;// ./lib/inputHandling.js











function applyInputValue(input, value, initialEvent, strict) {
  const inputmask = input ? input.inputmask : this,
    opts = inputmask.opts;
  input.inputmask.refreshValue = false;
  if (strict !== true && typeof opts.onBeforeMask === "function") value = opts.onBeforeMask.call(inputmask, value, opts) || value;
  value = (value || "").toString().split("");
  checkVal(input, true, false, value, initialEvent);
  inputmask.undoValue = inputmask._valueGet(true);
  if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate.call(inputmask).join("") && getLastValidPosition.call(inputmask) === -1) {
    input.inputmask._valueSet("");
  }
}

// todo put on prototype?
function clearOptionalTail(buffer) {
  const inputmask = this;
  buffer.length = 0;
  let template = getMaskTemplate.call(inputmask, true, 0, true, undefined, true),
    lmnt;
  while ((lmnt = template.shift()) !== undefined) buffer.push(lmnt);
  return buffer;
}
function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
  const inputmask = input ? input.inputmask : this,
    maskset = inputmask.maskset,
    opts = inputmask.opts,
    $ = inputmask.dependencyLib;
  let inputValue = nptvl.slice(),
    charCodes = "",
    initialNdx = -1,
    result,
    skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
  opts.skipOptionalPartCharacter = ""; // see issue #2311

  function isTemplateMatch(ndx, charCodes) {
    let targetTemplate = getMaskTemplate.call(inputmask, true, 0).slice(ndx, seekNext.call(inputmask, ndx, false, false)).join("").replace(/'/g, ""),
      charCodeNdx = targetTemplate.indexOf(charCodes);
    // strip spaces from targetTemplate
    while (charCodeNdx > 0 && targetTemplate[charCodeNdx - 1] === " ") charCodeNdx--;
    const match = charCodeNdx === 0 && !isMask.call(inputmask, ndx) && (getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || getTest.call(inputmask, ndx).match.static === true && getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || getTest.call(inputmask, ndx).match.nativeDef === " " && (getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || getTest.call(inputmask, ndx + 1).match.static === true && getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
    if (!match && charCodeNdx > 0 && !isMask.call(inputmask, ndx, false, true)) {
      const nextPos = seekNext.call(inputmask, ndx);
      if (inputmask.caretPos.begin < nextPos) {
        inputmask.caretPos = {
          begin: nextPos
        };
      }
    }
    return match;
  }
  inputmask._displayValueCache = maskset.validPositions.slice();
  resetMaskSet.call(inputmask, false);
  inputmask.clicked = 0; // reset click counter to correctly determine the caretposition in checkval
  initialNdx = opts.radixPoint ? determineNewCaretPosition.call(inputmask, {
    begin: 0,
    end: 0
  }, false, opts.__financeInput === false ? "radixFocus" : undefined).begin : 0;
  maskset.p = initialNdx;
  inputmask.caretPos = {
    begin: initialNdx
  };
  let staticMatches = [],
    prevCaretPos = inputmask.caretPos;
  inputValue.forEach(function (charCode, ndx) {
    if (charCode !== undefined) {
      // inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
      /* if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true) &&
      isValid.call(inputmask, ndx, inputValue[ndx], true, undefined, true, true) === false) {
      inputmask.caretPos.begin++;
      } else */
      // console.log("caret " + inputmask.caretPos.begin);
      const keypress = new $.Event("_checkval");
      keypress.key = charCode;
      charCodes += charCode;
      const lvp = getLastValidPosition.call(inputmask, undefined, true);
      if (!isTemplateMatch(initialNdx, charCodes)) {
        result = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, inputmask.caretPos.begin);
        if (result) {
          initialNdx = inputmask.caretPos.begin + 1;
          charCodes = "";
        }
      } else {
        result = getTest.call(inputmask, ndx).match.static === true ? EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, lvp + 1) : false;
      }
      if (result) {
        if (result.pos !== undefined && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true && maskset.validPositions[result.pos].alternation === undefined) {
          staticMatches.push(result.pos);
          if (!inputmask.isRTL) {
            result.forwardPosition = result.pos + 1;
          }
        }
        writeBuffer.call(inputmask, undefined, getBuffer.call(inputmask), result.forwardPosition, keypress, false);
        inputmask.caretPos = {
          begin: result.forwardPosition,
          end: result.forwardPosition
        };
        prevCaretPos = inputmask.caretPos;
      } else {
        if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true)) {
          inputmask.caretPos.begin++;
        } else inputmask.caretPos = prevCaretPos; // restore the caret position from before the failed validation
      }
    }
  });
  if (staticMatches.length > 0) {
    let sndx,
      validPos,
      nextValid = seekNext.call(inputmask, -1, undefined, false);
    if (!isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length <= nextValid || isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length > 0 && staticMatches.length !== nextValid && staticMatches[0] === 0) {
      // should check if is sequence starting from 0
      let nextSndx = nextValid;
      while ((sndx = staticMatches.shift()) !== undefined) {
        if (sndx < nextSndx) {
          const keypress = new $.Event("_checkval");
          validPos = maskset.validPositions[sndx];
          validPos.generatedInput = true;
          keypress.key = validPos.input;
          result = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, nextSndx);
          if (result && result.pos !== undefined && result.pos !== sndx && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true) {
            staticMatches.push(result.pos);
          } else if (!result) break;
          nextSndx++;
        }
      }
    } else {
      // delete all free statics
      while (sndx = staticMatches.pop()) {
        validPos = maskset.validPositions[sndx];
        if (validPos && maskset.validPositions[sndx + 1] === undefined) {
          delete maskset.validPositions[sndx];
        }
      }
    }
  }
  if (writeOut) {
    writeBuffer.call(inputmask, input, getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && (initiatingEvent.type === "input" && inputmask.undoValue !== getBuffer.call(inputmask).join("") || initiatingEvent.type === "paste"));
    // for (var vndx in maskset.validPositions) {
    // 	if (maskset.validPositions[vndx].match.generated !== true) { //only remove non forced generated
    // 		delete maskset.validPositions[vndx].generatedInput; //clear generated markings ~ consider initializing with a  value as fully typed
    // 	}
    // }
  }
  inputmask._displayValueCache = undefined;
  opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}
function HandleNativePlaceholder(npt, value) {
  const inputmask = npt ? npt.inputmask : this;
  if (ie) {
    if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
      let buffer = getBuffer.call(inputmask).slice(),
        nptValue = npt.inputmask._valueGet();
      if (nptValue !== value) {
        const lvp = getLastValidPosition.call(inputmask);
        if (lvp === -1 && nptValue === getBufferTemplate.call(inputmask).join("")) {
          buffer = [];
        } else if (lvp !== -1) {
          // clearout optional tail of the mask
          clearOptionalTail.call(inputmask, buffer);
        }
        writeBuffer(npt, buffer);
      }
    }
  } else if (npt.placeholder !== value) {
    npt.placeholder = value;
    if (npt.placeholder === "") npt.removeAttribute("placeholder");
  }
}
function unmaskedvalue(input) {
  const inputmask = input ? input.inputmask : this,
    opts = inputmask.opts,
    maskset = inputmask.maskset;
  if (input) {
    if (input.inputmask === undefined) {
      return input.value;
    }
    if (input.inputmask && input.inputmask.refreshValue) {
      // forced refresh from the value form.reset
      applyInputValue(input, input.inputmask._valueGet(true));
    }
  }
  const umValue = [],
    vps = maskset.validPositions;
  for (let pndx = 0, vpl = vps.length; pndx < vpl; pndx++) {
    if (vps[pndx] && vps[pndx].match && (vps[pndx].match.static != true || opts.keepStatic !== true && Array.isArray(maskset.metadata) && vps[pndx].generatedInput !== true)) {
      // only include non generated input with multiple masks (check on metadata) and without keepStatic true
      umValue.push(vps[pndx].input);
    }
  }
  let unmaskedValue = umValue.length === 0 ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
  if (typeof opts.onUnMask === "function") {
    const bufferValue = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join("");
    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
  }
  if (opts.outputMask && unmaskedValue.length > 0) {
    return lib_inputmask.format(unmaskedValue, {
      ...opts,
      mask: opts.outputMask,
      alias: null
    });
  }
  return unmaskedValue;
}
function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
  const inputmask = input ? input.inputmask : this,
    opts = inputmask.opts,
    $ = inputmask.dependencyLib;
  if (event && typeof opts.onBeforeWrite === "function") {
    //    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
    const result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
    if (result) {
      if (result.refreshFromBuffer) {
        const refresh = result.refreshFromBuffer;
        refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
        buffer = getBuffer.call(inputmask, true);
      }
      if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
    }
  }
  if (input !== undefined) {
    input.inputmask._valueSet(buffer.join(""));
    if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
      // console.log(caretPos);
      caret.call(inputmask, input, caretPos, undefined, undefined, event !== undefined && event.type === "keydown" && (event.key === keys.Delete || event.key === keys.Backspace));
    }
    input.inputmask.writeBufferHook === undefined || input.inputmask.writeBufferHook(caretPos);
    if (triggerEvents === true) {
      const $input = $(input),
        nptVal = input.inputmask._valueGet();
      input.inputmask.skipInputEvent = true;
      $input.trigger("input");
      setTimeout(function () {
        // timeout needed for IE
        if (nptVal === getBufferTemplate.call(inputmask).join("")) {
          $input.trigger("cleared");
        } else if (isComplete.call(inputmask, buffer) === true) {
          $input.trigger("complete");
        }
      }, 0);
    }
  }
}
;// ./lib/eventruler.js






const EventRuler = {
  on: function (input, eventName, eventHandler) {
    const $ = input.inputmask.dependencyLib;
    let ev = function (e) {
      if (e.originalEvent) {
        e = e.originalEvent || e; // get original event from jquery event
        arguments[0] = e;
      }
      // console.log(e.type);
      const that = this,
        inputmask = that.inputmask,
        opts = inputmask ? inputmask.opts : undefined;
      let args;
      if (inputmask === undefined && this.nodeName !== "FORM") {
        // happens when cloning an object with jquery.clone
        const imOpts = $.data(that, "_inputmask_opts");
        $(that).off(); // unbind all events
        if (imOpts) {
          new lib_inputmask(imOpts).mask(that);
        }
      } else if (!["submit", "reset", "setvalue"].includes(e.type) && this.nodeName !== "FORM" && (that.disabled || that.readOnly && !(e.type === "keydown" && e.ctrlKey && e.key === keys.c || opts.tabThrough === false && e.key === keys.Tab))) {
        e.preventDefault();
      } else {
        switch (e.type) {
          case "input":
            if (inputmask.skipInputEvent === true) {
              inputmask.skipInputEvent = false;
              return e.preventDefault();
            }

            // #2855
            // Prevent duplicate input processing between keyEvent and inputFallBackEvent
            // This fixes Chinese IME duplication issue on Safari where both events fire for the same input
            // if (
            //   inputmask.lastInputEvent &&
            //   Date.now() - inputmask.lastInputEvent.time < 10 &&
            //   inputmask.lastInputEvent.data === e.data
            // ) {
            //   return;
            // }
            // Mark input as processed to prevent duplicate handling by keyEvent
            // This fixes Chinese IME duplication issue on Safari #2855
            inputmask.lastInputEvent = {
              time: Date.now(),
              data: e.data
            };

            // if (mobile) { //this causes problem see #2220
            // 	args = arguments;
            // 	setTimeout(function () { //needed for caret selection when entering a char on Android 8 - #1818
            // 		eventHandler.apply(that, args);
            // 		caret(that, that.inputmask.caretPos, undefined, true);
            // 	}, 0);
            // 	return false;
            // }
            break;
          case "keydown":
            // Prevent duplicate input processing between keyEvent and inputFallBackEvent #2855
            // This fixes Chinese IME duplication issue on Safari where both events fire for the same input
            if (inputmask.lastInputEvent && Date.now() - inputmask.lastInputEvent.time < 10 && inputmask.lastInputEvent.data === e.key) {
              return false;
            }
            break;
          case "click":
          case "focus":
            if (inputmask.validationEvent) {
              // #841
              inputmask.validationEvent = false;
              input.blur();
              HandleNativePlaceholder(input, (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join(""));
              setTimeout(function () {
                input.focus();
              }, opts.validationEventTimeOut);
              return false;
            }
            args = arguments;
            setTimeout(function () {
              // needed for Chrome ~ initial selection clears after the clickevent
              if (!input.inputmask) {
                // `inputmask.remove()` was called before this callback
                return;
              }
              eventHandler.apply(that, args);
            }, 0);
            return;
          /* false */ // #2423
        }
        const returnVal = eventHandler.apply(that, arguments);
        if (returnVal === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        return returnVal;
      }
    };
    // add inputmask namespace to event
    eventName = `${eventName}.inputmask`;
    if (["submit.inputmask", "reset.inputmask"].includes(eventName)) {
      ev = ev.bind(input); // bind creates a new eventhandler (wrap)
      if (input.form !== null) $(input.form).on(eventName, ev);
    } else {
      $(input).on(eventName, ev);
    }
  },
  off: function (input, event) {
    if (input.inputmask) {
      const $ = input.inputmask.dependencyLib;
      $(input).off(event || ".inputmask");
    }
  }
};
;// ./lib/mask.js









// todo put on the prototype?
function mask() {
  const inputmask = this,
    opts = this.opts,
    el = this.el,
    $ = this.dependencyLib;
  function isElementTypeSupported(input, opts) {
    function patchValueProperty(npt) {
      let valueGet, valueSet;
      function patchValhook(type) {
        if ($.valHooks && ($.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true)) {
          const valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
              return elem.value;
            },
            valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
              elem.value = value;
              return elem;
            };
          $.valHooks[type] = {
            get: function (elem) {
              if (elem.inputmask) {
                if (elem.inputmask.opts.autoUnmask) {
                  return elem.inputmask.unmaskedvalue();
                } else {
                  const result = valhookGet(elem);
                  return getLastValidPosition.call(inputmask, undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                }
              } else {
                return valhookGet(elem);
              }
            },
            set: function (elem, value) {
              const result = valhookSet(elem, value);
              if (elem.inputmask) {
                applyInputValue(elem, value);
              }
              return result;
            },
            inputmaskpatch: true
          };
        }
      }
      function getter() {
        if (this.inputmask) {
          return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : getLastValidPosition.call(inputmask) !== -1 || opts.nullable !== true ? this.getRootNode().activeElement === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? clearOptionalTail.call(inputmask, getBuffer.call(inputmask).slice()).reverse() : clearOptionalTail.call(inputmask, getBuffer.call(inputmask).slice())).join("") : valueGet.call(this) : "";
        } else {
          return valueGet.call(this);
        }
      }
      function setter(value) {
        valueSet.call(this, value);
        if (this.inputmask) {
          applyInputValue(this, value);
        }
      }
      function installNativeValueSetFallback(npt) {
        EventRuler.on(npt, "mouseenter", function () {
          const input = this,
            value = input.inputmask._valueGet(true),
            bufferValue = (input.inputmask.isRTL ? getBuffer.call(input.inputmask).slice().reverse() : getBuffer.call(input.inputmask)).join("");
          if (value != bufferValue) {
            applyInputValue(input, value);
          }
        });
      }
      if (!npt.inputmask.__valueGet) {
        if (opts.noValuePatching !== true) {
          if (Object.getOwnPropertyDescriptor) {
            const valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
            if (valueProperty && valueProperty.get && valueProperty.set) {
              valueGet = valueProperty.get;
              valueSet = valueProperty.set;
              Object.defineProperty(npt, "value", {
                get: getter,
                set: setter,
                configurable: true
              });
            } else if (npt.tagName.toLowerCase() !== "input") {
              valueGet = function () {
                return this.textContent;
              };
              valueSet = function (value) {
                this.textContent = value;
              };
              Object.defineProperty(npt, "value", {
                get: getter,
                set: setter,
                configurable: true
              });
            }
          } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
            valueGet = npt.__lookupGetter__("value");
            valueSet = npt.__lookupSetter__("value");
            npt.__defineGetter__("value", getter);
            npt.__defineSetter__("value", setter);
          }
          npt.inputmask.__valueGet = valueGet; // store native property getter
          npt.inputmask.__valueSet = valueSet; // store native property setter
        }
        npt.inputmask._valueGet = function (overruleRTL) {
          return inputmask.isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
        };
        npt.inputmask._valueSet = function (value, overruleRTL) {
          // null check is needed for IE8 => otherwise converts to "null"
          valueSet.call(this.el, value === null || value === undefined ? "" : overruleRTL !== true && inputmask.isRTL ? value.split("").reverse().join("") : value);
        };
        if (valueGet === undefined) {
          // jquery.val fallback
          valueGet = function () {
            return this.value;
          };
          valueSet = function (value) {
            this.value = value;
          };
          patchValhook(npt.type);
          installNativeValueSetFallback(npt);
        }
      }
    }
    const elementType = input.getAttribute("type");
    let isSupported = input.tagName.toLowerCase() === "input" && opts.supportsInputType.includes(elementType) || input.isContentEditable || input.tagName.toLowerCase() === "textarea";
    if (!isSupported) {
      if (input.tagName.toLowerCase() === "input") {
        let el = document.createElement("input");
        el.setAttribute("type", elementType);
        isSupported = el.type === "text"; // apply mask only if the type is not natively supported
        el = null;
      } else {
        isSupported = "partial";
      }
    }
    if (isSupported !== false) {
      patchValueProperty(input);
    } else {
      input.inputmask = undefined;
    }
    return isSupported;
  }

  // unbind all events - to make sure that no other mask will interfere when re-masking
  EventRuler.off(el);
  const isSupported = isElementTypeSupported(el, opts);
  if (isSupported !== false) {
    inputmask.originalPlaceholder = el.placeholder;

    // read maxlength prop from el
    inputmask.maxLength = el !== undefined ? el.maxLength : undefined;
    if (inputmask.maxLength === -1) inputmask.maxLength = undefined;
    if ("inputMode" in el && el.getAttribute("inputmode") === null) {
      el.inputMode = opts.inputmode;
      el.setAttribute("inputmode", opts.inputmode);
    }
    if (isSupported === true) {
      opts.showMaskOnFocus = opts.showMaskOnFocus && ["cc-number", "cc-exp"].indexOf(el.autocomplete) === -1;
      if (iphone) {
        // selecting the caret shows as a selection on iphone
        opts.insertModeVisual = false;
        // disable autocorrect
        el.setAttribute("autocorrect", "off");
      }

      // bind events
      EventRuler.on(el, "submit", EventHandlers.submitEvent);
      EventRuler.on(el, "reset", EventHandlers.resetEvent);
      EventRuler.on(el, "blur", EventHandlers.blurEvent);
      EventRuler.on(el, "focus", EventHandlers.focusEvent);
      EventRuler.on(el, "invalid", EventHandlers.invalidEvent);
      EventRuler.on(el, "click", EventHandlers.clickEvent);
      EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
      EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
      EventRuler.on(el, "paste", EventHandlers.pasteEvent);
      EventRuler.on(el, "cut", EventHandlers.cutEvent);
      EventRuler.on(el, "complete", opts.oncomplete);
      EventRuler.on(el, "incomplete", opts.onincomplete);
      EventRuler.on(el, "cleared", opts.oncleared);
      if (opts.inputEventOnly !== true) {
        EventRuler.on(el, "keydown", EventHandlers.keyEvent);
      }
      if (mobile || opts.inputEventOnly) {
        el.removeAttribute("maxLength");
      }
      EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
      // EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent); //https://github.com/w3c/input-events - to implement
    }
    EventRuler.on(el, "setvalue", EventHandlers.setValueEvent);

    // apply mask
    inputmask.applyMaskHook === undefined || inputmask.applyMaskHook();
    getBufferTemplate.call(inputmask).join(""); // initialize the buffer and getmasklength
    inputmask.undoValue = inputmask._valueGet(true);
    const activeElement = el.getRootNode().activeElement;
    if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || activeElement === el) {
      applyInputValue(el, el.inputmask._valueGet(true));
      let buffer = getBuffer.call(inputmask).slice();
      if (isComplete.call(inputmask, buffer) === false) {
        if (opts.clearIncomplete) {
          resetMaskSet.call(inputmask, false);
        }
      }
      if (opts.clearMaskOnLostFocus && activeElement !== el) {
        if (getLastValidPosition.call(inputmask) === -1) {
          buffer = [];
        } else {
          clearOptionalTail.call(inputmask, buffer);
        }
      }
      if (opts.clearMaskOnLostFocus === false || opts.showMaskOnFocus && activeElement === el || el.inputmask._valueGet(true) !== "") {
        writeBuffer(el, buffer);
      }
      if (activeElement === el) {
        // position the caret when in focus
        caret.call(inputmask, el, seekNext.call(inputmask, getLastValidPosition.call(inputmask)));
      } else {
        caret.call(inputmask, el, 0);
      }
    }
  }
}
;// ./lib/escapeRegex.js
const escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
function escapeRegex(str) {
  return str.replace(escapeRegexRegex, "\\$1");
}
;// ./lib/masktoken.js
/**
 * A token of a parsed mask tree.
 *
 * @typedef {Object} MaskToken
 * @property {Array<MaskToken | import("./mask-lexer").MaskTest>} matches
 * @property {boolean} openGroup
 * @property {boolean} alternatorGroup
 * @property {boolean} isGroup
 * @property {boolean} isOptional
 * @property {boolean} isQuantifier
 * @property {boolean} isAlternator
 * @property {{ min: number | string; max: number | string; jit?: number | string }} quantifier
 */

/* harmony default export */ function masktoken(isGroup, isOptional, isQuantifier, isAlternator) {
  this.matches = [];
  this.openGroup = isGroup || false;
  this.alternatorGroup = false;
  this.isGroup = isGroup || false;
  this.isOptional = isOptional || false;
  this.isQuantifier = isQuantifier || false;
  this.isAlternator = isAlternator || false;
  this.quantifier = {
    min: 1,
    max: 1
  };
}
;// ./lib/mask-lexer.js









const tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
  // Thx to https://github.com/slevithan/regex-colorizer for the regexTokenizer regex
  regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g;

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
  let /** @type {Maskset} */ms;

  /**
   * @param {string} mask
   * @param {{ repeat: number | string; groupmarker: string[] | [string, string]; quantifiermarker: string[] | [string, string]; keepStatic: boolean | null }} opts
   * @returns {string}
   */
  function preProcessMask(mask, {
    repeat,
    groupmarker,
    quantifiermarker,
    keepStatic
  }) {
    if (repeat > 0 || repeat === "*" || repeat === "+") {
      const repeatStart = repeat === "*" ? 0 : repeat === "+" ? 1 : repeat;
      if (repeatStart !== repeat) {
        mask = groupmarker[0] + mask + groupmarker[1] + quantifiermarker[0] + repeatStart + "," + repeat + quantifiermarker[1];
      } else {
        // repeat the mask n times
        const msk = mask;
        for (let i = 1; i < repeatStart; i++) {
          mask += msk;
        }
      }
    }
    if (keepStatic === true) {
      const optionalRegex = "(.)\\[([^\\]]*)\\]",
        // "(?<p1>.)\\[(?<p2>[^\\]]*)\\]", remove named capture group @2428
        maskMatches = mask.match(new RegExp(optionalRegex, "g"));
      maskMatches && maskMatches.forEach((m, i) => {
        let [p1, p2] = m.split("[");
        p2 = p2.replace("]", "");
        mask = mask.replace(new RegExp(`${escapeRegex(p1)}\\[${escapeRegex(p2)}\\]`), p1.charAt(0) === p2.charAt(0) ? `(${p1}|${p1}${p2})` : `${p1}[${p2}]`);
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
    maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
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
        excludes: {},
        // excluded alternations
        metadata,
        maskLength: undefined,
        jitOffset: {}
      };
      if (nocache !== true) {
        masksCache[maskdefKey] = masksetDefinition;
        masksetDefinition = inputmask_dependencyLib.extend(true, {}, masksCache[maskdefKey]);
      }
    } else {
      masksetDefinition = inputmask_dependencyLib.extend(true, {}, masksCache[maskdefKey]);
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
  if (opts.mask && opts.mask.mask !== undefined && typeof opts.mask.mask !== "function") {
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
  const currentToken = new masktoken(),
    /** @type {import("./masktoken").MaskToken[]} */openenings = [],
    /** @type {import("./masktoken").MaskToken[]} */maskTokens = [];
  let escaped = false,
    /** @type {RegExpExecArray} */match,
    /** @type {string} */m,
    /** @type {import("./masktoken").MaskToken} */openingToken,
    /** @type {import("./masktoken").MaskToken} */currentOpeningToken,
    /** @type {import("./masktoken").MaskToken} */alternator,
    /** @type {import("./masktoken").MaskToken | MaskTest} */lastMatch,
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
      if (element.indexOf("[") === 0 || escaped && /\\d|\\s|\\w|\\p/i.test(element) || element === ".") {
        if (/\\p\{.*}/i.test(element)) flag += "u";
        mtoken.matches.splice(position++, 0, {
          fn: new RegExp(element, flag),
          static: false,
          optionality: false,
          newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element,
          casing: null,
          def: element,
          placeholder: typeof opts.placeholder === "object" ? opts.placeholder[currentToken.matches.length] : undefined,
          nativeDef: element
        });
      } else {
        if (escaped) element = element[element.length - 1];
        element.split("").forEach(function (lmnt) {
          prevMatch = mtoken.matches[position - 1];
          mtoken.matches.splice(position++, 0, createStaticTest(lmnt, prevMatch, flag, opts.staticDefinitionSymbol !== undefined ? lmnt : typeof opts.placeholder === "object" ? opts.placeholder[currentToken.matches.length] : undefined));
        });
      }
      escaped = false;
    } else {
      const maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && definitions[element];
      if (maskdef && !escaped) {
        if (typeof maskdef.validator === "string" && /\\p\{.*}/i.test(maskdef.validator)) flag += "u";
        mtoken.matches.splice(position++, 0, {
          fn: maskdef.validator ? typeof maskdef.validator === "string" ? new RegExp(maskdef.validator, flag) : new function () {
            this.test = maskdef.validator;
          }() : /./,
          static: maskdef.static || false,
          optionality: maskdef.optional || false,
          defOptionality: maskdef.optional || false,
          // indicator for an optional from the definition
          newBlockMarker: prevMatch === undefined || maskdef.optional ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
          casing: maskdef.casing,
          def: maskdef.definitionSymbol || element,
          placeholder: maskdef.placeholder,
          displayChar: maskdef.displayChar,
          nativeDef: element,
          generated: maskdef.generated
        });
      } else {
        mtoken.matches.splice(position++, 0, createStaticTest(element, prevMatch, flag, opts.staticDefinitionSymbol !== undefined ? element : undefined));
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
      fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", flag) : null,
      static: true,
      optionality: false,
      newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element && prevMatch.static !== true,
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
        if ((nextToken === undefined || nextToken.matches === undefined || nextToken.isQuantifier === false) && token && token.isGroup) {
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
        if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
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
    const groupToken = new masktoken(true);
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
    return {
      min,
      max,
      jit
    };
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
  while (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask)) {
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
        case "\\p":
          // Unicode Categories
          m += regexTokenizer.exec(mask)[0]; // {
          m += regexTokenizer.exec(mask)[0]; // ?}
          break;
        case "(?:": // non capturing group
        case "(?=": // lookahead
        case "(?!": // negative lookahead
        case "(?<=": // lookbehind
        case "(?<!":
          // negative lookbehind
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
        openenings.push(new masktoken(false, true));
        break;
      case opts.groupmarker[0]:
        // Group opening
        openenings.push(new masktoken(true));
        break;
      case opts.quantifiermarker[0]:
        {
          // Quantifier
          const quantifier = new masktoken(false, false, true);
          quantifier.quantifier = parseQuantifier(m);
          const matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
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
          const subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
          if (currentOpeningToken.openGroup && (
          // regexp alt syntax
          subToken.matches === undefined || subToken.isGroup === false && subToken.isAlternator === false)) {
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
            alternator = new masktoken(false, false, false, true);
          }
          alternator.matches.push(lastMatch);
          openenings.push(alternator);
          if (lastMatch.openGroup) {
            // regexp alt syntax
            lastMatch.openGroup = false;
            const alternatorGroup = new masktoken(true);
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
;// ./lib/inputmask.js


/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */













const inputmask_document = global_window.document,
  dataKey = "_inputmask_opts",
  aliases = {},
  masksCache = {};

/** @typedef {import("./defaults.js").default} InputmaskOptions */
/** @typedef {Element | Element[] | NodeList | string} InputmaskElements */

/**
 * @typedef {Object} InputmaskInstance
 * @property {boolean} isRTL
 * @property {(elems: InputmaskElements) => InputmaskInstance | any} mask
 * @property {(options: keyof InputmaskOptions | InputmaskOptions, noremask?: boolean) => any} option
 * @property {(value?: string) => string} unmaskedvalue
 * @property {() => Element | undefined} remove
 * @property {() => string} getemptymask
 * @property {() => boolean} hasMaskedValue
 * @property {() => boolean} isComplete
 * @property {() => any} getmetadata
 * @property {(value?: string) => boolean} isValid
 * @property {(value: string, metadata?: boolean) => string | { value: string; metadata: any }} format
 * @property {(value: string) => void} setValue
 */

/**
 * @typedef {((alias?: string | InputmaskOptions, options?: InputmaskOptions, internal?: boolean) => InputmaskInstance) & {
 *   extendDefaults: (options: InputmaskOptions) => void;
 *   extendDefinitions: (definition: Record<string, any>) => void;
 *   extendAliases: (alias: Record<string, InputmaskOptions>) => void;
 *   format: (value: string, options?: InputmaskOptions, metadata?: boolean) => string | { value: string; metadata: any };
 *   unmask: (value: string, options?: InputmaskOptions) => string;
 *   isValid: (value: string, options?: InputmaskOptions) => boolean;
 *   remove: (elems: InputmaskElements) => void;
 *   setValue: (elems: InputmaskElements, value: string) => void;
 *   dependencyLib: any;
 * }} InputmaskStatic
 */

/**
 * @param {string | InputmaskOptions} [alias]
 * @param {InputmaskOptions} [options]
 * @param {boolean} [internal]
 * @returns {InputmaskInstance}
 */
function Inputmask(alias, options, internal) {
  // allow instanciating without new
  if (!(this instanceof Inputmask)) {
    return new Inputmask(alias, options, internal);
  }
  this.dependencyLib = inputmask_dependencyLib;
  this.el = undefined;
  this.events = {};
  this.maskset = undefined;
  if (internal !== true) {
    // init options
    if (Object.prototype.toString.call(alias) === "[object Object]") {
      options = alias;
    } else {
      options = options || {};
      if (alias) options.alias = alias;
    }
    this.opts = inputmask_dependencyLib.extend(true, {}, lib_defaults, options);
    this.noMasksCache = options && options.definitions !== undefined;
    this.userOptions = options || {}; // user passed options
    resolveAlias(this.opts.alias, options, this.opts);
  }

  // maskscope properties
  this.refreshValue = false; // indicate a refresh from the inputvalue is needed (form.reset)
  this.undoValue = undefined;
  this.$el = undefined;
  this.skipInputEvent = false; // skip when triggered from within inputmask
  this.validationEvent = false;
  this.ignorable = false;
  // eslint-disable-next-line no-unused-expressions
  this.maxLength;
  this.mouseEnter = false;
  this.clicked = 0;
  this.originalPlaceholder = undefined; // needed for FF
  this.isComposing = false; // keydowncode == 229  compositionevent fallback
  this.lastInputEvent = null; // track last input event to prevent duplicates #2855
  this.hasAlternator = false;
}

/** @type {any} */
Inputmask.prototype = {
  dataAttribute: "data-inputmask",
  // data attribute prefix used for attribute binding
  i18n: {},
  get isRTL() {
    return this.opts.isRTL || this.opts.numericInput;
  },
  mask: function (elems) {
    const that = this;
    if (typeof elems === "string") {
      elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
    }
    elems = elems.nodeName ? [elems] : Array.isArray(elems) ? elems : [].slice.call(elems); // [].slice as alternate for Array.from (Yandex browser)
    elems.forEach(function (el, ndx) {
      const scopedOpts = inputmask_dependencyLib.extend(true, {}, that.opts);
      if (importAttributeOptions(el, scopedOpts, inputmask_dependencyLib.extend(true, {}, that.userOptions), that.dataAttribute)) {
        const maskset = generateMaskSet(scopedOpts, that.noMasksCache);
        if (maskset !== undefined) {
          if (el.inputmask !== undefined) {
            el.inputmask.opts.autoUnmask = true; // force autounmasking when remasking
            el.inputmask.remove();
          }
          // store inputmask instance on the input with element reference
          el.inputmask = new Inputmask(undefined, undefined, true);
          el.inputmask.opts = scopedOpts;
          el.inputmask.noMasksCache = that.noMasksCache;
          el.inputmask.userOptions = inputmask_dependencyLib.extend(true, {}, that.userOptions);
          // el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
          el.inputmask.el = el;
          el.inputmask.$el = inputmask_dependencyLib(el);
          el.inputmask.maskset = maskset;
          inputmask_dependencyLib.data(el, dataKey, that.userOptions);
          mask.call(el.inputmask);
        }
      }
    });
    return elems && elems[0] ? elems[0].inputmask || this : this;
  },
  option: function (options, noremask) {
    // set extra options || retrieve value of a current option
    if (typeof options === "string") {
      return this.opts[options];
    } else if (typeof options === "object") {
      inputmask_dependencyLib.extend(this.userOptions, options); // user passed options
      // remask
      if (this.el && noremask !== true) {
        this.mask(this.el);
      }
      return this;
    }
  },
  unmaskedvalue: function (value) {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    if (this.el === undefined || value !== undefined) {
      const valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
      checkVal.call(this, undefined, false, false, valueBuffer);
      if (typeof this.opts.onBeforeWrite === "function") this.opts.onBeforeWrite.call(this, undefined, getBuffer.call(this), 0, this.opts);
    }
    return unmaskedvalue.call(this, this.el);
  },
  remove: function () {
    if (this.el) {
      inputmask_dependencyLib.data(this.el, dataKey, null); // invalidate
      // writeout the value
      const cv = this.opts.autoUnmask ? unmaskedvalue(this.el) : this._valueGet(this.opts.autoUnmask);
      if (cv !== getBufferTemplate.call(this).join("")) this._valueSet(cv, this.opts.autoUnmask);else this._valueSet("");
      // unbind all events
      EventRuler.off(this.el);

      // restore the value property
      let valueProperty;
      if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
        valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value");
        if (valueProperty) {
          if (this.__valueGet) {
            Object.defineProperty(this.el, "value", {
              get: this.__valueGet,
              set: this.__valueSet,
              configurable: true
            });
          }
        }
      } else if (inputmask_document.__lookupGetter__ && this.el.__lookupGetter__("value")) {
        if (this.__valueGet) {
          this.el.__defineGetter__("value", this.__valueGet);
          this.el.__defineSetter__("value", this.__valueSet);
        }
      }
      // clear data
      this.el.inputmask = undefined;
    }
    return this.el;
  },
  getemptymask: function () {
    // return the default (empty) mask value, usefull for setting the default value in validation
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return (this.isRTL ? getBufferTemplate.call(this).reverse() : getBufferTemplate.call(this)).join("");
  },
  hasMaskedValue: function () {
    // check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
    return !this.opts.autoUnmask;
  },
  isComplete: function () {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    return isComplete.call(this, getBuffer.call(this));
  },
  getmetadata: function () {
    // return mask metadata if exists
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    if (Array.isArray(this.maskset.metadata)) {
      let maskTarget = getMaskTemplate.call(this, true, 0, false).join("");
      this.maskset.metadata.forEach(function (mtdt) {
        if (mtdt.mask === maskTarget) {
          maskTarget = mtdt;
          return false;
        }
        return true;
      });
      return maskTarget;
    }
    return this.maskset.metadata;
  },
  isValid: function (value) {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    if (value) {
      const valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
      checkVal.call(this, undefined, true, false, valueBuffer);
    }
    const buffer = clearOptionalTail.call(this, []),
      isC = isComplete.call(this, buffer),
      isc2 = value === (this.isRTL ? buffer.reverse().join("") : buffer.join(""));
    return isC && (value === undefined || isc2);
  },
  format: function (value, metadata) {
    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
    const valueBuffer = (typeof this.opts.onBeforeMask === "function" ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
    checkVal.call(this, undefined, true, false, valueBuffer);
    const formattedValue = this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join("");
    return metadata ? {
      value: formattedValue,
      metadata: this.getmetadata()
    } : formattedValue;
  },
  setValue: function (value) {
    if (this.el) {
      inputmask_dependencyLib(this.el).trigger("setvalue", [value]);
    }
  }
};
function resolveAlias(aliasStr, options, opts) {
  const aliasDefinition = aliases[aliasStr];
  if (aliasDefinition) {
    if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); // alias is another alias
    inputmask_dependencyLib.extend(true, opts, aliasDefinition); // merge alias definition in the options
    inputmask_dependencyLib.extend(true, opts, options); // reapply extra given options
    return true;
  } // alias not found - try as mask
  else if (opts.mask === null) {
    opts.mask = aliasStr;
  }
  return false;
}
function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
  function importOption(option, optionData) {
    const attrOption = dataAttribute === "" ? option : dataAttribute + "-" + option;
    optionData = optionData !== undefined ? optionData : npt.getAttribute(attrOption);
    if (optionData !== null) {
      if (typeof optionData === "string") {
        if (option.startsWith("on")) {
          // get function definition
          optionData = global_window[optionData];
        } else if (optionData === "false") optionData = false;else if (optionData === "true") optionData = true;else if (option === "mask") optionData = optionData.replace(/\\\\/g, "\\");
      }
      userOptions[option] = optionData;
    }
  }
  if (opts.importDataAttributes === true) {
    let attrOptions = npt.getAttribute(dataAttribute),
      option,
      dataoptions,
      optionData,
      p;
    if (attrOptions && attrOptions !== "") {
      attrOptions = attrOptions.replace(/'/g, '"');
      dataoptions = JSON.parse("{" + attrOptions + "}");
    }

    // resolve aliases
    if (dataoptions) {
      // pickup alias from dataAttribute
      optionData = undefined;
      for (p in dataoptions) {
        if (p.toLowerCase() === "alias") {
          optionData = dataoptions[p];
          break;
        }
      }
    }
    importOption("alias", optionData); // pickup alias from dataAttribute-alias
    if (userOptions.alias) {
      resolveAlias(userOptions.alias, userOptions, opts);
    }
    for (option in opts) {
      if (dataoptions) {
        optionData = undefined;
        for (p in dataoptions) {
          if (p.toLowerCase() === option.toLowerCase()) {
            optionData = dataoptions[p];
            break;
          }
        }
      }
      importOption(option, optionData);
    }
  }
  inputmask_dependencyLib.extend(true, opts, userOptions);

  // handle dir=rtl
  if (npt.dir === "rtl" || opts.rightAlign) {
    npt.style.textAlign = "right";
  }
  if (npt.dir === "rtl" || opts.numericInput) {
    npt.dir = "ltr";
    npt.removeAttribute("dir");
    opts.isRTL = true;
  }
  return Object.keys(userOptions).length;
}

// apply defaults, definitions, aliases
/**
 * @param {InputmaskOptions} options
 * @returns {void}
 */
Inputmask.extendDefaults = function (options) {
  inputmask_dependencyLib.extend(true, lib_defaults, options);
};
/**
 * @param {Record<string, any>} definition
 * @returns {void}
 */
Inputmask.extendDefinitions = function (definition) {
  inputmask_dependencyLib.extend(true, definitions, definition);
};
/**
 * @param {Record<string, InputmaskOptions>} alias
 * @returns {void}
 */
Inputmask.extendAliases = function (alias) {
  inputmask_dependencyLib.extend(true, aliases, alias);
};
// static fn on inputmask
/**
 * @param {string} value
 * @param {InputmaskOptions} [options]
 * @param {boolean} [metadata]
 * @returns {string | { value: string; metadata: any }}
 */
Inputmask.format = function (value, options, metadata) {
  return Inputmask(options).format(value, metadata);
};
/**
 * @param {string} value
 * @param {InputmaskOptions} [options]
 * @returns {string}
 */
Inputmask.unmask = function (value, options) {
  return Inputmask(options).unmaskedvalue(value);
};
/**
 * @param {string} value
 * @param {InputmaskOptions} [options]
 * @returns {boolean}
 */
Inputmask.isValid = function (value, options) {
  return Inputmask(options).isValid(value);
};
/**
 * @param {InputmaskElements} elems
 * @returns {void}
 */
Inputmask.remove = function (elems) {
  if (typeof elems === "string") {
    elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
  }
  elems = elems.nodeName ? [elems] : elems;
  for (let i = 0; i < elems.length; i++) {
    if (elems[i].inputmask) elems[i].inputmask.remove();
  }
};
/**
 * @param {InputmaskElements} elems
 * @param {string} value
 * @returns {void}
 */
Inputmask.setValue = function (elems, value) {
  if (typeof elems === "string") {
    elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
  }
  elems = elems.nodeName ? [elems] : elems;
  elems.forEach(function (el) {
    if (el.inputmask) el.inputmask.setValue(value);else inputmask_dependencyLib(el).trigger("setvalue", [value]);
  });
};
Inputmask.dependencyLib = inputmask_dependencyLib;

// make inputmask available
global_window.Inputmask = Inputmask;
const InputmaskExport = /** @type {InputmaskStatic} */Inputmask;
/* harmony default export */ const lib_inputmask = (InputmaskExport);
;// ./lib/extensions/cssunit.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



function cssunit(options) {
  return inputmask_dependencyLib.extend(true, {
    regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
  }, options);
}
function registerCssunit() {
  inputmask_dependencyLib.extend(true, aliases, {
    cssunit: cssunit()
  });
}
;// ./lib/extensions/url.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



function url(options) {
  return inputmask_dependencyLib.extend(true, {
    // needs update => https://en.wikipedia.org/wiki/URL
    regex: "(https?|ftp)://.*",
    autoUnmask: false,
    keepStatic: false,
    tabThrough: true
  }, options);
}
function registerUrl() {
  inputmask_dependencyLib.extend(true, aliases, {
    url: url()
  });
}
;// ./lib/extensions/ip.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



const ipValidatorRegex = /25[0-5]|2[0-4][0-9]|[01][0-9][0-9]/;
function ipValidator(chrs, maskset, pos, strict, opts) {
  if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
    chrs = maskset.buffer[pos - 1] + chrs;
    if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
      chrs = maskset.buffer[pos - 2] + chrs;
    } else chrs = "0" + chrs;
  } else chrs = "00" + chrs;
  if (opts.greedy && parseInt(chrs) > 255 && ipValidatorRegex.test("00" + chrs.charAt(2))) {
    const buffer = [...maskset.buffer.slice(0, pos), ".", chrs.charAt(2)];
    if (buffer.join("").match(/\./g).length < 4) {
      return {
        refreshFromBuffer: true,
        buffer,
        caret: pos + 2
      };
    }
  }
  return ipValidatorRegex.test(chrs);
}
function ip(options) {
  return inputmask_dependencyLib.extend(true, {
    // ip-address mask
    mask: "i{1,3}.j{1,3}.k{1,3}.l{1,3}",
    definitions: {
      i: {
        validator: ipValidator
      },
      j: {
        validator: ipValidator
      },
      k: {
        validator: ipValidator
      },
      l: {
        validator: ipValidator
      }
    },
    onUnMask: function (maskedValue, unmaskedValue, opts) {
      return maskedValue;
    },
    inputmode: "decimal",
    substitutes: {
      ",": "."
    }
  }, options);
}
function registerIp() {
  inputmask_dependencyLib.extend(true, aliases, {
    ip: ip()
  });
}
;// ./lib/extensions/email.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



function email(options) {
  return inputmask_dependencyLib.extend(true, {
    // https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
    // https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
    // should be extended with the toplevel domains at the end
    mask: function ({
      separator,
      quantifier
    }) {
      let emailMask = "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
        mask = emailMask;
      if (separator) {
        for (let i = 0; i < quantifier; i++) {
          mask += `[${separator}${emailMask}]`;
        }
      }
      return mask;
    },
    greedy: false,
    casing: "lower",
    separator: null,
    quantifier: 5,
    skipOptionalPartCharacter: "",
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace("mailto:", "");
    },
    definitions: {
      "*": {
        validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5!#$%&'*+/=?^_`{|}~-]"
      },
      "-": {
        validator: "[0-9A-Za-z-]"
      }
    },
    onUnMask: function (maskedValue, unmaskedValue, opts) {
      return maskedValue;
    },
    inputmode: "email"
  }, options);
}
function registerEmail() {
  inputmask_dependencyLib.extend(true, aliases, {
    email: email()
  });
}
;// ./lib/extensions/mac.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */




function mac(options) {
  return inputmask_dependencyLib.extend(true, {
    mask: "##:##:##:##:##:##"
  }, definitions_definitions, options);
}
function registerMac() {
  registerDefinitions();
  inputmask_dependencyLib.extend(true, aliases, {
    mac: mac()
  });
}
;// ./lib/extensions/vin.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */



function vin(options) {
  return inputmask_dependencyLib.extend(true, {
    // https://en.wikipedia.org/wiki/Vehicle_identification_number
    // see issue #1199
    mask: "V{13}9{4}",
    definitions: {
      V: {
        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
        casing: "upper"
      }
    },
    clearIncomplete: true,
    autoUnmask: true
  }, options);
}
function registerVin() {
  inputmask_dependencyLib.extend(true, aliases, {
    vin: vin()
  });
}
;// ./lib/extensions/ssn.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */






function ssn(options) {
  return inputmask_dependencyLib.extend(true, {
    mask: "999-99-9999",
    postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict) {
      const bffr = getMaskTemplate.call(this, true, getLastValidPosition.call(this), true, true);
      return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(bffr.join(""));
    }
  }, options);
}
function registerSsn() {
  inputmask_dependencyLib.extend(true, aliases, {
    // http://rion.io/2013/09/10/validating-social-security-numbers-through-regular-expressions-2/
    // https://en.wikipedia.org/wiki/Social_Security_number
    ssn: ssn()
  });
}
;// ./lib/extensions/inputmask.date.i18n.js
/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

const $ = lib_inputmask.dependencyLib;
$.extend(true, lib_inputmask.prototype.i18n, {
  dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ordinalSuffix: ["st", "nd", "rd", "th"]
});
;// ./lib/extensions/date.js





/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */







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
    while (match = getTokenizer(opts).exec(this.format)) {
      if (match.index >= lastNdx) {
        let dynMatches = /\d+$/.exec(match[0]),
          fcode = dynMatches ? match[0][0] + "x" : match[0],
          value;
        if (mask !== undefined) {
          // console.log("mask", mask);
          if (dynMatches) {
            const lastIndex = getTokenizer(opts).lastIndex,
              tokenMatch = getTokenMatch.call(inputmask, match.index, opts, inputmask && inputmask.maskset);
            getTokenizer(opts).lastIndex = lastIndex;
            value = mask.slice(0, mask.indexOf(tokenMatch.nextMatch[0]));
          } else {
            let targetSymbol = match[0][0],
              ndx = match.index;
            while (inputmask && (opts.placeholder[`${match.index}'${getTest.call(inputmask, ndx).match.placeholder}`] || getTest.call(inputmask, ndx).match.placeholder) === targetSymbol) {
              ndx++;
            }
            lastNdx = ndx;
            const targetMatchLength = ndx - match.index;
            value = mask.slice(0, targetMatchLength || formatcode(fcode) && formatcode(fcode)[4] || fcode.length);
          }
          mask = mask.slice(value.length);
        }
        if (Object.prototype.hasOwnProperty.call(formatCode, fcode)) {
          this.setValue(this, value, fcode, formatcode(fcode)[2], formatcode(fcode)[1]);
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
            fcode === "MMM" ? dateObj[targetProp] = pad(i18n.monthNames.slice(0, 12).findIndex(item => value.toLowerCase() === item.toLowerCase()) + 1, 2) : dateObj[targetProp] = pad(i18n.monthNames.slice(12, 24).findIndex(item => value.toLowerCase() === item.toLowerCase()) + 1, 2);
            dateObj[targetProp] = dateObj[targetProp] === "00" ? "" : dateObj[targetProp].toString();
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
      if (targetProp === "day" && parseInt(datavalue) === 29 || targetProp === "month" && parseInt(datavalue) === 2) {
        if (parseInt(dateObj.day) === 29 && parseInt(dateObj.month) === 2 && (dateObj.year === "" || dateObj.year === undefined)) {
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
        if (datavalue.length < formatcode(fcode)[4]) datavalue = pad(datavalue, formatcode(fcode)[4], true);
      }
      if (datavalue !== "" && !isNaN(datavalue) || targetProp === "ampm") dateOperation.call(dateObj._date, datavalue);
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
  i18n = lib_inputmask.prototype.i18n,
  // supported codes for formatting
  // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format
  // https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7
  // https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  formatCode = {
    // regex, valueSetter, type, displayformatter, #entries (optional)
    d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
    // Day of the month as digits; no leading zero for single-digit days.
    dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
      return pad(Date.prototype.getDate.call(this), 2);
    }],
    // Day of the month as digits; leading zero for single-digit days.
    ddd: [""],
    // Day of the week as a three-letter abbreviation.
    dddd: [""],
    // Day of the week as its full name.
    M: ["[1-9]|1[012]", function (val) {
      let mval = val ? parseInt(val) : 0;
      if (mval > 0) mval--;
      return Date.prototype.setMonth.call(this, mval);
    }, "month", function () {
      return Date.prototype.getMonth.call(this) + 1;
    }],
    // Month as digits; no leading zero for single-digit months.
    MM: ["0[1-9]|1[012]", function (val) {
      let mval = val ? parseInt(val) : 0;
      if (mval > 0) mval--;
      return Date.prototype.setMonth.call(this, mval);
    }, "month", function () {
      return pad(Date.prototype.getMonth.call(this) + 1, 2);
    }],
    // Month as digits; leading zero for single-digit months.
    MMM: [i18n.monthNames.slice(0, 12).join("|"), function (val) {
      const mval = i18n.monthNames.slice(0, 12).findIndex(item => val.toLowerCase() === item.toLowerCase());
      return mval !== -1 ? Date.prototype.setMonth.call(this, mval) : false;
    }, "month", function () {
      return i18n.monthNames.slice(0, 12)[Date.prototype.getMonth.call(this)];
    }],
    // Month as a three-letter abbreviation.
    MMMM: [i18n.monthNames.slice(12, 24).join("|"), function (val) {
      const mval = i18n.monthNames.slice(12, 24).findIndex(item => val.toLowerCase() === item.toLowerCase());
      return mval !== -1 ? Date.prototype.setMonth.call(this, mval) : false;
    }, "month", function () {
      return i18n.monthNames.slice(12, 24)[Date.prototype.getMonth.call(this)];
    }],
    // Month as its full name.
    yy: ["[0-9]{2}", function (val) {
      const centuryPart = new Date().getFullYear().toString().slice(0, 2);
      Date.prototype.setFullYear.call(this, `${centuryPart}${val}`);
    }, "year", function () {
      return pad(Date.prototype.getFullYear.call(this), 2);
    }, 2],
    // Year as last two digits; leading zero for years less than 10.
    yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
      return pad(Date.prototype.getFullYear.call(this), 4);
    }, 4],
    h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
    // Hours; no leading zero for single-digit hours (12-hour clock).
    hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
      return pad(Date.prototype.getHours.call(this), 2);
    }],
    // Hours; leading zero for single-digit hours (12-hour clock).
    hx: [function (x) {
      return `[0-9]{${x}}`;
    }, Date.prototype.setHours, "hours", function (x) {
      return Date.prototype.getHours;
    }],
    // Hours; no limit; set maximum digits
    H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
    // Hours; no leading zero for single-digit hours (24-hour clock).
    HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
      return pad(Date.prototype.getHours.call(this), 2);
    }],
    // Hours; leading zero for single-digit hours (24-hour clock).
    Hx: [function (x) {
      return `[0-9]{${x}}`;
    }, Date.prototype.setHours, "hours", function (x) {
      return function () {
        return pad(Date.prototype.getHours.call(this), x);
      };
    }],
    // Hours; no limit; set maximum digits
    m: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
    // Minutes; no leading zero for single-digit minutes. Uppercase M unlike CF timeFormat's m to avoid conflict with months.
    mm: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
      return pad(Date.prototype.getMinutes.call(this), 2);
    }],
    // Minutes; leading zero for single-digit minutes. Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
    s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
    // Seconds; no leading zero for single-digit seconds.
    ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
      return pad(Date.prototype.getSeconds.call(this), 2);
    }],
    // Seconds; leading zero for single-digit seconds.
    l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
      return pad(Date.prototype.getMilliseconds.call(this), 3);
    }, 3],
    // Milliseconds. 3 digits.
    L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
      return pad(Date.prototype.getMilliseconds.call(this), 2);
    }, 2],
    // Milliseconds. 2 digits.
    t: ["[ap]", setAMPM, "ampm", getAMPM, 1],
    // Lowercase, single-character time marker string: a or p.
    tt: ["[ap]m", setAMPM, "ampm", getAMPM, 2],
    // two-character time marker string: am or pm.
    T: ["[AP]", setAMPM, "ampm", getAMPM, 1],
    // single-character time marker string: A or P.
    TT: ["[AP]M", setAMPM, "ampm", getAMPM, 2],
    // two-character time marker string: AM or PM.
    Z: [".*", undefined, "Z", getTimeZoneAbbreviated],
    // US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
    o: [""],
    // GMT/UTC timezone offset, e.g. -0500 or +0230.
    S: [""] // The date's ordinal suffix (st, nd, rd, or th).
  },
  formatCodeAlias = {
    D: "d",
    DD: "dd",
    DDD: "ddd",
    DDDD: "dddd",
    mmm: "MMM",
    mmmm: "MMMM",
    YY: "yy",
    YYYY: "yyyy",
    sss: "L"
  },
  formatAlias = {
    isoDate: "yyyy-MM-dd",
    // 2007-06-09
    isoTime: "HH:mm:ss",
    // 17:46:21
    isoDateTime: "yyyy-MM-dd\\THH:mm:ss",
    // 2007-06-09T17:46:21
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
    {
      1: tz
    } = date.toString().match(/\((.+)\)/);
  if (tz.includes(" ")) {
    tz = tz.replace("-", " ").toUpperCase();
    tz = tz.split(" ").map(([first]) => first).join("");
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
      formatCodeKeys = Object.keys(formatCode).concat(Object.keys(formatCodeAlias));
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
    opts.tokenizer = "(" + (dyntokens.length > 0 ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + "+)+?|.";
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
      const entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
      if (dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime())) {
        // update dateParts
        dateParts.date.setFullYear(currentYear);
        dateParts.year = crrntyear;
        // update result
        currentResult.insert = [{
          pos: currentResult.pos + 1,
          c: currentYearNextPart[0]
        }, {
          pos: currentResult.pos + 2,
          c: currentYearNextPart[1]
        }];
      }
    }
  }
  return currentResult;
}
function isValidDate(dateParts, currentResult, opts) {
  const inputmask = this;
  if (!useDateObject) return true;
  if (dateParts.rawday === undefined || !isFinite(dateParts.rawday) && new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day || dateParts.day == "29" && (!isFinite(dateParts.rawyear) || dateParts.rawyear === undefined || dateParts.rawyear === "") || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) {
    return currentResult;
  } else {
    // take corrective action if possible
    if (dateParts.day == "29") {
      const tokenMatch = getTokenMatch.call(inputmask, currentResult.pos, opts, inputmask.maskset);
      if (tokenMatch.targetMatch && ["yyyy", "YYYY"].includes(tokenMatch.targetMatch[0]) && currentResult.pos - tokenMatch.targetMatchIndex === 2) {
        currentResult.remove = currentResult.pos + 1;
        return currentResult;
      }
    } else if (dateParts.date.getMonth() == 2 && dateParts.day == "30" && currentResult.c !== undefined) {
      dateParts.day = "03";
      dateParts.date.setDate(3);
      dateParts.date.setMonth(1);
      currentResult.insert = [{
        pos: currentResult.pos,
        c: "0"
      }, {
        pos: currentResult.pos + 1,
        c: currentResult.c
      }];
      currentResult.caret = seekNext.call(this, currentResult.pos + 1);
      return currentResult;
    }
    return false;
  }
}
function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
  if (!result) return result;
  if (result && opts.min) {
    if (/* useDateObject && (dateParts["year"] === undefined || dateParts["yearSet"]) && */!isNaN(opts.min.date.getTime())) {
      let match;
      dateParts.reset();
      getTokenizer(opts).lastIndex = 0;
      while (match = getTokenizer(opts).exec(opts.inputFormat)) {
        var fcode;
        if (fcode = formatcode(match[0])) {
          if (fcode[3]) {
            let setFn = fcode[1],
              current = dateParts[fcode[2]],
              minVal = opts.min[fcode[2]],
              maxVal = opts.max ? opts.max[fcode[2]] : minVal + 1,
              curVal = [],
              forceCurrentValue = false;
            for (let i = 0; i < minVal.length; i++) {
              if (maskset.validPositions[i + match.index] === undefined && !forceCurrentValue) {
                if (i + match.index == 0 && current[i] < minVal[i]) {
                  curVal[i] = current[i];
                  forceCurrentValue = true;
                } else {
                  curVal[i] = minVal[i];
                }
                // ADD +1 to whole
                if (fcode[2] === "year" && current.length - 1 == i && minVal != maxVal) curVal = (parseInt(curVal.join("")) + 1).toString().split("");
                if (fcode[2] === "ampm" && minVal != maxVal && opts.min.date.getTime() > dateParts.date.getTime()) curVal[i] = maxVal[i];
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
  while (match = getTokenizer(opts).exec(format)) {
    if (match[0] === opts.escapeChar) {
      escaped = true;
    } else {
      if (dateObjValue === undefined) {
        if (!escaped && (fcode = formatcode(match[0]))) {
          mask += "(" + fcode[0] + ")";
          // map placeholder to placeholder object and set placeholder mappings
          if (opts.placeholder && opts.placeholder !== "") {
            placeHolder[ndx] = opts.placeholder[match.index % opts.placeholder.length];
            // internal use of datetime alias
            placeHolder[`${match.index}'${opts.placeholder[match.index % opts.placeholder.length]}`] = match[0].charAt(0);
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
function date_analyseMask(mask, format, opts) {
  const inputmask = this;
  if (typeof mask === "string") {
    return new DateObject(mask, format, opts, inputmask);
  } else if (mask && typeof mask === "object" && Object.prototype.hasOwnProperty.call(mask, "date")) {
    return mask;
  }
  return undefined;
}
function importDate(dateObj, opts) {
  return parse(opts.inputFormat, {
    date: dateObj
  }, opts);
}
function getTokenMatch(pos, opts, maskset) {
  let inputmask = this,
    calcPos = 0,
    targetMatch,
    match,
    matchLength = 0;
  getTokenizer(opts).lastIndex = 0;
  while (match = getTokenizer(opts).exec(opts.inputFormat)) {
    // console.log(`match.index ${match.index}`);
    const dynMatches = /\d+$/.exec(match[0]);
    if (dynMatches) {
      matchLength = parseInt(dynMatches[0]);
    } else {
      let targetSymbol = match[0][0],
        ndx = calcPos;
      while (inputmask && (opts.placeholder[`${match.index}'${getTest.call(inputmask, ndx).match.placeholder}`] || getTest.call(inputmask, ndx).match.placeholder) === targetSymbol) {
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
        const filteredPlaceholders = Object.keys(opts.placeholder).filter(value => {
          for (let i = match.index - 1; i < calcPos; i++) {
            if (value === `${i}'${maskset.tests[pos][0].match.placeholder}`) {
              return true;
            }
          }
          return false;
        });
        masksetHint = filteredPlaceholders.length > 0 ? opts.placeholder[filteredPlaceholders[0]] : maskset.tests[pos][0].match.placeholder;
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

const datetimeAlias = {
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
    opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat; // resolve possible formatAlias
    opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat; // resolve possible formatAlias
    // opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, "");
    opts.regex = parse(opts.inputFormat, undefined, opts);
    // console.log("inputFormat", opts.regex);
    opts.min = date_analyseMask(opts.min, opts.inputFormat, opts);
    opts.max = date_analyseMask(opts.max, opts.inputFormat, opts);
    return null; // migrate to regex mask
  },
  placeholder: "",
  // set default as none (~ auto); when a custom placeholder is passed it will be used
  inputFormat: "isoDateTime",
  // format used to input the date
  displayFormat: null,
  // visual format when the input looses focus
  outputFormat: null,
  // unmasking format
  min: null,
  // needs to be in the same format as the inputfornat
  max: null,
  // needs to be in the same format as the inputfornat,
  skipOptionalPartCharacter: "",
  preValidation: function (buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
    const inputmask = this;
    if (strict) return true;
    if (isNaN(c) && buffer[pos] !== c) {
      const tokenMatch = getTokenMatch.call(inputmask, pos, opts, maskset);
      if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && tokenMatch.targetMatch[0].length > 1) {
        const validator = formatcode(tokenMatch.targetMatch[0])[0];
        if (new RegExp(validator).test("0" + buffer[pos - 1])) {
          buffer[pos] = buffer[pos - 1];
          buffer[pos - 1] = "0";
          return {
            fuzzy: true,
            buffer,
            refreshFromBuffer: {
              start: pos - 1,
              end: pos + 1
            },
            pos: pos + 1
          };
        }
      }
    }
    return true;
  },
  postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
    const inputmask = this;
    if (strict) return true;
    let tokenMatch, validator;
    if (currentResult === false) {
      // try some shifting
      tokenMatch = getTokenMatch.call(inputmask, pos + 1, opts, maskset);
      if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && tokenMatch.targetMatch[0].length > 1 && formatcode(tokenMatch.targetMatch[0]) !== undefined) {
        validator = formatcode(tokenMatch.targetMatch[0])[0];
      } else {
        tokenMatch = getTokenMatch.call(inputmask, pos + 2, opts, maskset);
        if (tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos + 1 && tokenMatch.targetMatch[0].length > 1 && formatcode(tokenMatch.targetMatch[0]) !== undefined) {
          validator = formatcode(tokenMatch.targetMatch[0]);
        }
      }
      if (validator !== undefined) {
        // correct position ~ pos in front of shifted targetMatch
        pos = tokenMatch.targetMatchIndex;
        if (maskset.validPositions[pos + 1] !== undefined && new RegExp(validator).test(c + "0")) {
          buffer[pos] = c;
          buffer[pos + 1] = "0";
          currentResult = {
            // insert: [{pos: pos, c: "0"}, {pos: pos + 1, c: c}],
            pos: pos + 2,
            // this will triggeer a refreshfrombuffer
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
    if (tokenMatch.targetMatch && tokenMatch.targetMatch[0] && formatcode(tokenMatch.targetMatch[0]) !== undefined) {
      const fcode = formatcode(tokenMatch.targetMatch[0]);
      validator = fcode[0];
      const part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
      if (new RegExp(validator).test(part.join("")) === false && tokenMatch.targetMatch[0].length === 2 && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1]) {
        maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0";
      }
      if (fcode[2] == "year") {
        const _buffer = getMaskTemplate.call(inputmask, false, 1, undefined, true);
        for (let i = pos + 1; i < buffer.length; i++) {
          buffer[i] = _buffer[i];
          maskset.validPositions.splice(pos + 1, 1);
        }
      }
    }
    let result = currentResult,
      dateParts = date_analyseMask.call(inputmask, buffer.join(""), opts.inputFormat, opts);
    if (result && !isNaN(dateParts.date.getTime())) {
      // check for a valid date ~ an invalid date returns NaN which isn't equal
      if (opts.prefillYear) result = prefillYear(dateParts, result, opts);
      result = isValidDate.call(inputmask, dateParts, result, opts);
      result = isDateInRange(dateParts, result, opts, maskset, fromCheckval);
    }
    if (pos !== undefined && result && currentResult.pos !== pos) {
      return {
        buffer: parse(opts.inputFormat, dateParts, opts).split(""),
        refreshFromBuffer: {
          start: pos,
          end: currentResult.pos
        },
        pos: currentResult.caret !== undefined ? currentResult.caret : currentResult.pos // correct caret position
      };
    }
    return result;
  },
  onKeyDown: function (e, buffer, caretPos, opts) {
    const input = this;
    if (e.ctrlKey && e.key === keys.ArrowRight) {
      input.inputmask._valueSet(importDate(new Date(), opts));
      inputmask_dependencyLib(input).trigger("setvalue");
    }
  },
  onUnMask: function (maskedValue, unmaskedValue, opts) {
    const inputmask = this;
    return unmaskedValue ? parse(opts.outputFormat, date_analyseMask.call(inputmask, maskedValue, opts.inputFormat, opts), opts) : unmaskedValue;
  },
  casing: "follow",
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
};
function datetime(options) {
  return inputmask_dependencyLib.extend(true, {}, datetimeAlias, options);
}
function registerDatetime() {
  inputmask_dependencyLib.extend(true, aliases, {
    datetime: datetime()
  });
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.some.js
var es_iterator_some = __webpack_require__(3579);
;// ./lib/extensions/numeric.js
/* unused harmony import specifier */ var numeric_$;



/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */






function autoEscape(txt, opts) {
  let escapedTxt = "";
  for (let i = 0; i < txt.length; i++) {
    if (definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i)) {
      escapedTxt += "\\" + txt.charAt(i);
    } else {
      escapedTxt += txt.charAt(i);
    }
  }
  return escapedTxt;
}
function alignDigits(buffer, digits, opts, force) {
  if (buffer.length > 0 && digits > 0 && (!opts.digitsOptional || force)) {
    var radixPosition = buffer.indexOf(opts.radixPoint),
      negationBack = false;
    if (opts.negationSymbol.back === buffer[buffer.length - 1]) {
      negationBack = true;
      buffer.length--;
    }
    if (radixPosition === -1) {
      buffer.push(opts.radixPoint);
      radixPosition = buffer.length - 1;
    }
    for (let i = 1; i <= digits; i++) {
      if (!isFinite(buffer[radixPosition + i])) {
        buffer[radixPosition + i] = "0";
      }
    }
  }
  if (negationBack) buffer.push(opts.negationSymbol.back);
  return buffer;
}
function findValidator(symbol, maskset) {
  let posNdx = 0;
  if (symbol === "+") {
    posNdx = seekNext.call(this, maskset.validPositions.length - 1);
  }
  for (let tstNdx in maskset.tests) {
    tstNdx = parseInt(tstNdx);
    if (tstNdx >= posNdx) {
      for (let ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) {
        if ((maskset.validPositions[tstNdx] === undefined || symbol === "-") && maskset.tests[tstNdx][ndx].match.def === symbol) {
          return tstNdx + (maskset.validPositions[tstNdx] !== undefined && symbol !== "-" ? 1 : 0);
        }
      }
    }
  }
  return posNdx;
}
function findValid(symbol, maskset) {
  let ret = -1;
  for (let ndx = 0, vpl = maskset.validPositions.length; ndx < vpl; ndx++) {
    const tst = maskset.validPositions[ndx];
    if (tst && tst.match.def === symbol) {
      ret = ndx;
      break;
    }
  }
  return ret;
}
function parseMinMaxOptions(opts) {
  if (opts.parseMinMaxOptions === undefined) {
    // convert min and max options
    if (opts.min !== null) {
      opts.min = opts.min.toString().replace(new RegExp(escapeRegex(opts.groupSeparator), "g"), "");
      if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
      opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
      if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
    }
    if (opts.max !== null) {
      opts.max = opts.max.toString().replace(new RegExp(escapeRegex(opts.groupSeparator), "g"), "");
      if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
      opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
      if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
    }
    opts.parseMinMaxOptions = "done";
  }
}
function genMask(opts) {
  opts.repeat = 0;
  // treat equal separator and radixpoint
  if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
    if (opts.radixPoint === ".") {
      opts.groupSeparator = ",";
    } else if (opts.radixPoint === ",") {
      opts.groupSeparator = ".";
    } else {
      opts.groupSeparator = "";
    }
  }
  // prevent conflict with default skipOptionalPartCharacter
  if (opts.groupSeparator === " ") {
    opts.skipOptionalPartCharacter = undefined;
  }

  // enforce placeholder to single
  if (opts.placeholder.length > 1) {
    opts.placeholder = opts.placeholder.charAt(0);
  }
  // only allow radixfocus when placeholder = 0
  if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "") {
    opts.positionCaretOnClick = "lvp";
  }
  let decimalDef = "0",
    radixPointDef = opts.radixPoint;
  if (opts.numericInput === true && opts.__financeInput === undefined) {
    // finance people input style
    decimalDef = "1";
    opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
    opts.digitsOptional = false;
    if (isNaN(opts.digits)) opts.digits = opts.digits.indexOf(",") !== -1 ? opts.digits.split(",")[0] : 2;
    opts._radixDance = false;
    radixPointDef = opts.radixPoint === "," ? "?" : "!";
    if (opts.radixPoint !== "" && opts.definitions[radixPointDef] === undefined) {
      // update separator definition
      opts.definitions[radixPointDef] = {};
      opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]";
      opts.definitions[radixPointDef].placeholder = opts.radixPoint;
      opts.definitions[radixPointDef].static = true;
      opts.definitions[radixPointDef].generated = true; // forced marker as generated input
    }
  } else {
    opts.__financeInput = false; // needed to keep original selection when remasking
    opts.numericInput = true;
  }
  let mask = "[+]",
    altMask;
  mask += autoEscape(opts.prefix, opts);
  if (opts.groupSeparator !== "") {
    if (opts.definitions[opts.groupSeparator] === undefined) {
      // update separator definition
      opts.definitions[opts.groupSeparator] = {};
      opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]";
      opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator;
      opts.definitions[opts.groupSeparator].static = true;
      opts.definitions[opts.groupSeparator].generated = true; // forced marker as generated input
    }
    mask += opts._mask(opts);
  } else {
    mask += "9{+}";
  }
  if (opts.digits !== undefined && opts.digits !== 0) {
    const dq = opts.digits.toString().split(",");
    if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
      mask += radixPointDef + decimalDef + "{" + opts.digits + "}";
    } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
      if (opts.digitsOptional || opts.jitMasking) {
        altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}";
        // mask += "[" + opts.radixPoint + "]";
        opts.keepStatic = true;
      } else {
        mask += radixPointDef + decimalDef + "{" + opts.digits + "}";
      }
    }
  } else {
    opts.inputmode = "numeric";
  }
  mask += autoEscape(opts.suffix, opts);
  mask += "[-]";
  if (altMask) {
    mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask];
  }
  opts.greedy = false; // enforce greedy false

  parseMinMaxOptions(opts);
  if (opts.radixPoint !== "" && opts.substituteRadixPoint) opts.substitutes[opts.radixPoint == "." ? "," : "."] = opts.radixPoint;
  // console.log(mask);
  return mask;
}
function handleRadixDance(pos, c, radixPos, maskset, opts) {
  if (opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back) {
    if (pos <= radixPos && (radixPos > 0 || c == opts.radixPoint) && (maskset.validPositions[pos - 1] === undefined || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back)) {
      pos -= 1;
    }
  }
  return pos;
}
function decimalValidator(chrs, maskset, pos, strict, opts) {
  const radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
    result = (radixPos !== -1 || strict && opts.jitMasking) && new RegExp(opts.definitions["9"].validator).test(chrs);
  if (!strict && opts._radixDance && radixPos !== -1 && result && maskset.validPositions[radixPos] == undefined) {
    return {
      insert: {
        pos: radixPos === pos ? radixPos + 1 : radixPos,
        c: opts.radixPoint
      },
      pos
    };
  }
  return result;
}
function checkForLeadingZeroes(buffer, opts) {
  // check leading zeros
  let numberMatches = new RegExp("(^" + (opts.negationSymbol.front !== "" ? escapeRegex(opts.negationSymbol.front) + "?" : "") + escapeRegex(opts.prefix) + ")(.*)(" + escapeRegex(opts.suffix) + (opts.negationSymbol.back != "" ? escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
    number = numberMatches ? numberMatches[2] : "",
    leadingzeroes = false;
  if (number) {
    number = number.split(opts.radixPoint.charAt(0))[0];
    leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number);
  }
  return leadingzeroes && (leadingzeroes[0].length > 1 || leadingzeroes[0].length > 0 && leadingzeroes[0].length < number.length) ? leadingzeroes : false;
}

// number aliases
const numericAlias = {
  mask: genMask,
  _mask: function (opts) {
    return "(" + opts.groupSeparator + "999){+|1}";
  },
  digits: "*",
  // number of fractionalDigits
  digitsOptional: true,
  enforceDigitsOnBlur: false,
  radixPoint: ".",
  positionCaretOnClick: "radixFocus",
  _radixDance: true,
  groupSeparator: "",
  allowMinus: true,
  negationSymbol: {
    front: "-",
    // "("
    back: "" // ")"
  },
  prefix: "",
  suffix: "",
  min: null,
  // minimum value
  max: null,
  // maximum value
  SetMaxOnOverflow: false,
  step: 1,
  inputType: "text",
  // number ~ specify that values which are set are in textform (radix point  is same as in the options) or in numberform (radixpoint = .)
  unmaskAsNumber: false,
  roundingFN: Math.round,
  // Math.floor ,  fn(x)
  inputmode: "decimal",
  shortcuts: {
    k: "1000",
    m: "1000000"
  },
  // global options
  placeholder: "0",
  greedy: false,
  rightAlign: true,
  insertMode: true,
  autoUnmask: false,
  skipOptionalPartCharacter: "",
  usePrototypeDefinitions: false,
  stripLeadingZeroes: true,
  substituteRadixPoint: true,
  definitions: {
    0: {
      validator: decimalValidator
    },
    1: {
      validator: decimalValidator,
      definitionSymbol: "9"
    },
    9: {
      // \uFF11-\uFF19 #1606
      validator: "[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]",
      definitionSymbol: "*"
    },
    "+": {
      validator: function (chrs, maskset, pos, strict, opts) {
        return opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front);
      }
    },
    "-": {
      validator: function (chrs, maskset, pos, strict, opts) {
        return opts.allowMinus && chrs === opts.negationSymbol.back;
      }
    }
  },
  preValidation: function (buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
    const inputmask = this;
    if (opts.__financeInput !== false && c === opts.radixPoint) return false;
    const radixPos = buffer.indexOf(opts.radixPoint),
      initPos = pos;
    pos = handleRadixDance(pos, c, radixPos, maskset, opts);
    if (c === "-" || c === opts.negationSymbol.front) {
      if (opts.allowMinus !== true) return false;
      let isNegative = false,
        front = findValid("+", maskset),
        back = findValid("-", maskset);
      if (front !== -1) {
        isNegative = [front];
        if (back !== -1) isNegative.push(back);
      }
      return isNegative !== false ? {
        remove: isNegative,
        caret: initPos - opts.negationSymbol.back.length
      } : {
        insert: [{
          pos: findValidator.call(inputmask, "+", maskset),
          c: opts.negationSymbol.front,
          fromIsValid: true
        }, {
          pos: findValidator.call(inputmask, "-", maskset),
          c: opts.negationSymbol.back,
          fromIsValid: undefined
        }],
        caret: initPos + opts.negationSymbol.back.length
      };
    }
    if (c === opts.groupSeparator) {
      return {
        caret: initPos
      };
    }
    if (strict) return true;
    if (radixPos !== -1 && opts._radixDance === true && isSelection === false && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && radixPos !== pos) {
      const radixValidatorPos = findValidator.call(inputmask, opts.radixPoint, maskset);
      if (maskset.validPositions[radixValidatorPos]) {
        maskset.validPositions[radixValidatorPos].generatedInput = maskset.validPositions[radixValidatorPos].generated || false;
      }
      return {
        caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
      };
    }
    if (opts.__financeInput === false) {
      if (isSelection) {
        if (opts.digitsOptional) {
          return {
            rewritePosition: caretPos.end
          };
        } else if (!opts.digitsOptional) {
          if (caretPos.begin > radixPos && caretPos.end <= radixPos) {
            if (c === opts.radixPoint) {
              return {
                insert: {
                  pos: radixPos + 1,
                  c: "0",
                  fromIsValid: true
                },
                rewritePosition: radixPos
              };
            } else {
              return {
                rewritePosition: radixPos + 1
              };
            }
          } else if (caretPos.begin < radixPos) {
            return {
              rewritePosition: caretPos.begin - 1
            };
          }
        }
      } else {
        if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && opts.digits > 0 && this.__valueGet.call(this.el) === "") {
          return {
            rewritePosition: radixPos
          };
        }

        // Cursor placed at or before the prefix on a field with no digits
        // would otherwise fall through to alternation switching and land
        // in the decimal part (#2615)
        if (pos >= buffer.length - opts.prefix.length && opts.radixPoint !== "") {
          const digitTest = new RegExp(opts.definitions["9"].validator);
          if (!maskset.validPositions.some(vp => vp && !vp.generatedInput && digitTest.test(vp.input))) {
            return {
              rewritePosition: radixPos !== -1 ? radixPos : 0
            };
          }
        }
      }
    }
    return {
      rewritePosition: pos
    };
  },
  postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval, fromAlternate) {
    if (currentResult === false) return currentResult;
    if (strict) return true;
    if (opts.min !== null || opts.max !== null) {
      const unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, inputmask_dependencyLib.extend({}, opts, {
        unmaskAsNumber: true
      }));
      if (opts.min !== null && unmasked < opts.min && fromAlternate !== true && (unmasked.toString().length > opts.min.toString().length ||
      // > instead of >= because we want to allow to type a bigger number
      buffer[0] === opts.radixPoint ||
      // disallow radixpoint when value is smaller than min
      unmasked < 0)) {
        return false;
        // return {
        // 	refreshFromBuffer: true,
        // 	buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
        // };
      }
      if (opts.max !== null && opts.max >= 0 && unmasked > opts.max) {
        return opts.SetMaxOnOverflow ? {
          refreshFromBuffer: true,
          buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
        } : false;
      }
    }
    return currentResult;
  },
  onUnMask: function (maskedValue, unmaskedValue, opts) {
    if (unmaskedValue === "" && opts.nullable === true) {
      return unmaskedValue;
    }
    let processValue = maskedValue.replace(opts.prefix, "");
    processValue = processValue.replace(opts.suffix, "");
    processValue = processValue.replace(new RegExp(escapeRegex(opts.groupSeparator), "g"), "");
    if (opts.placeholder.charAt(0) !== "") {
      processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0");
    }
    if (opts.unmaskAsNumber) {
      if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(escapeRegex.call(this, opts.radixPoint), ".");
      processValue = processValue.replace(new RegExp("^" + escapeRegex(opts.negationSymbol.front)), "-");
      processValue = processValue.replace(new RegExp(escapeRegex(opts.negationSymbol.back) + "$"), "");
      return Number(processValue);
    }
    return processValue;
  },
  isComplete: function (buffer, opts) {
    let maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
    maskedValue = maskedValue.replace(new RegExp("^" + escapeRegex(opts.negationSymbol.front)), "-");
    maskedValue = maskedValue.replace(new RegExp(escapeRegex(opts.negationSymbol.back) + "$"), "");
    maskedValue = maskedValue.replace(opts.prefix, "");
    maskedValue = maskedValue.replace(opts.suffix, "");
    maskedValue = maskedValue.replace(new RegExp(escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
    if (opts.radixPoint === ",") maskedValue = maskedValue.replace(escapeRegex(opts.radixPoint), ".");
    return isFinite(maskedValue);
  },
  onBeforeMask: function (initialValue, opts) {
    initialValue = initialValue ?? "";
    const radixPoint = opts.radixPoint || ",";
    if (isFinite(opts.digits)) opts.digits = parseInt(opts.digits);
    if ((typeof initialValue === "number" || opts.inputType === "number") && radixPoint !== "") {
      initialValue = initialValue.toString().replace(".", radixPoint);
    }
    const isNegative = initialValue.charAt(0) === "-" || initialValue.charAt(0) === opts.negationSymbol.front,
      valueParts = initialValue.split(radixPoint),
      integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
      decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "",
      forceDigits = valueParts.length > 1;
    initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);
    let digits = 0;
    if (radixPoint !== "") {
      digits = !opts.digitsOptional ? opts.digits : opts.digits < decimalPart.length ? opts.digits : decimalPart.length;
      if (decimalPart !== "" || !opts.digitsOptional) {
        const digitsFactor = Math.pow(10, digits || 1);

        // make the initialValue a valid javascript number for the parsefloat
        initialValue = initialValue.replace(escapeRegex(radixPoint), ".");
        if (!isNaN(parseFloat(initialValue))) {
          initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits);
        }
        initialValue = initialValue.toString().replace(".", radixPoint);
      }
    }
    // this needs to be in a separate part and not directly in decimalPart to allow rounding
    if (opts.digits === 0 && initialValue.indexOf(radixPoint) !== -1) {
      initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint));
    }
    if (initialValue !== "" && (opts.min !== null || opts.max !== null)) {
      const numberValue = initialValue.toString().replace(radixPoint, ".");
      if (opts.min !== null && numberValue < opts.min) {
        initialValue = opts.min.toString().replace(".", radixPoint);
      } else if (opts.max !== null && numberValue > opts.max) {
        initialValue = opts.max.toString().replace(".", radixPoint);
      }
    }
    if (isNegative && initialValue.charAt(0) !== "-") {
      initialValue = "-" + initialValue;
    }
    return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
  },
  onBeforeWrite: function (e, buffer, caretPos, opts) {
    function stripBuffer(buffer, stripRadix) {
      if (opts.__financeInput !== false || stripRadix) {
        var position = buffer.indexOf(opts.radixPoint);
        if (position !== -1) {
          buffer.splice(position, 1);
        }
      }
      if (opts.groupSeparator !== "") {
        while ((position = buffer.indexOf(opts.groupSeparator)) !== -1) {
          buffer.splice(position, 1);
        }
      }
      return buffer;
    }
    let result, leadingzeroes;
    if (opts.stripLeadingZeroes && (leadingzeroes = checkForLeadingZeroes(buffer, opts))) {
      const caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1),
        offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0;
      for (let i = leadingzeroes[0].length - offset; i > 0; i--) {
        this.maskset.validPositions.splice(caretNdx + i, 1);
        delete buffer[caretNdx + i];
      }
    }
    if (e) {
      switch (e.type) {
        case "blur":
        case "checkval":
          if (opts.min !== null || opts.max !== null) {
            const unmasked = opts.onUnMask(buffer.slice().reverse().join(""), undefined, inputmask_dependencyLib.extend({}, opts, {
              unmaskAsNumber: true
            }));
            if (opts.min !== null && unmasked < opts.min && buffer.join() !== "") {
              return {
                refreshFromBuffer: true,
                buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
              };
            } else if (opts.max !== null && unmasked > opts.max) {
              return {
                refreshFromBuffer: true,
                buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
              };
            }
          }
          if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
            // strip negation symbol on blur when value is 0
            const nmbrMtchs = new RegExp("(^" + (opts.negationSymbol.front != "" ? escapeRegex(opts.negationSymbol.front) + "?" : "") + escapeRegex(opts.prefix) + ")(.*)(" + escapeRegex(opts.suffix) + (opts.negationSymbol.back != "" ? escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), true).reverse().join("")),
              number = nmbrMtchs ? nmbrMtchs[2] : "";
            if (number == 0) {
              result = {
                refreshFromBuffer: true,
                buffer: [0]
              };
            }
          } else if (opts.radixPoint !== "") {
            // strip radixpoint on blur when it is the latest char
            const radixNDX = buffer.indexOf(opts.radixPoint);
            if (radixNDX === opts.suffix.length) {
              if (result && result.buffer) {
                result.buffer.splice(0, 1 + opts.suffix.length);
              } else {
                buffer.splice(0, 1 + opts.suffix.length);
                result = {
                  refreshFromBuffer: true,
                  buffer: stripBuffer(buffer)
                };
              }
            }
          }
          if (opts.enforceDigitsOnBlur) {
            result = result || {};
            const bffr = (result && result.buffer || buffer).slice().reverse();
            result.refreshFromBuffer = true;
            result.buffer = alignDigits(bffr, opts.digits, opts, true).reverse();
          }
      }
    }
    return result;
  },
  onKeyDown: function (e, buffer, caretPos, opts) {
    let $input = inputmask_dependencyLib(this),
      bffr;
    if (e.location != 3) {
      let pattern,
        c = e.key;
      if (pattern = opts.shortcuts && opts.shortcuts[c]) {
        if (pattern.length > 1) {
          this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) * parseInt(pattern));
          $input.trigger("setvalue");
          return false;
        }
      }
    }
    if (e.ctrlKey) {
      switch (e.key) {
        case keys.ArrowUp:
          this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
          $input.trigger("setvalue");
          return false;
        case keys.ArrowDown:
          this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
          $input.trigger("setvalue");
          return false;
      }
    }
    if (!e.shiftKey && (e.key === keys.Delete || e.key === keys.Backspace || e.key === keys.BACKSPACE_SAFARI) && caretPos.begin !== buffer.length) {
      if (buffer[e.key === keys.Delete ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) {
        bffr = buffer.slice().reverse();
        if (opts.negationSymbol.front !== "") bffr.shift();
        if (opts.negationSymbol.back !== "") bffr.pop();
        $input.trigger("setvalue", [bffr.join(""), caretPos.begin]);
        return false;
      } else if (opts._radixDance === true) {
        const radixPos = buffer.indexOf(opts.radixPoint);
        if (!opts.digitsOptional) {
          if (radixPos !== -1 && (caretPos.begin < radixPos || caretPos.end < radixPos || e.key === keys.Delete && (caretPos.begin === radixPos || caretPos.begin - 1 === radixPos))) {
            let restoreCaretPos;
            if (caretPos.begin === caretPos.end) {
              // only adjust when not a selection
              if (e.key === keys.Backspace || e.key === keys.BACKSPACE_SAFARI) caretPos.begin++;else if (e.key === keys.Delete && caretPos.begin - 1 === radixPos) {
                restoreCaretPos = inputmask_dependencyLib.extend({}, caretPos);
                caretPos.begin--;
                caretPos.end--;
              }
            }
            bffr = buffer.slice().reverse();
            bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end || 1);
            if (e.key === keys.Backspace || e.key === keys.BACKSPACE_SAFARI) bffr.splice(bffr.length - caretPos.end + 1, 0, "0");
            // console.log(caretPos);
            bffr = alignDigits(bffr, opts.digits, opts).join("");
            if (restoreCaretPos) {
              caretPos = restoreCaretPos;
            }
            $input.trigger("setvalue", [bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin]);
            return false;
          }
        } else if (radixPos === 0) {
          bffr = buffer.slice().reverse();
          bffr.pop();
          $input.trigger("setvalue", [bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin]);
          return false;
        }
      }
    }
  }
};
const currencyAlias = {
  prefix: "",
  // "$ ",
  groupSeparator: ",",
  // alias: "numeric",
  digits: 2,
  digitsOptional: false
};
const decimalAlias = {
  // alias: "numeric"
};
const integerAlias = {
  // alias: "numeric",
  inputmode: "numeric",
  digits: 0
};
const percentageAlias = {
  // alias: "numeric",
  min: 0,
  max: 100,
  suffix: " %",
  digits: 0,
  allowMinus: false
};
const indiannsAlias = {
  // indian numbering system
  // alias: "numeric",
  _mask: function (opts) {
    return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
  },
  groupSeparator: ",",
  radixPoint: ".",
  placeholder: "0",
  digits: 2,
  digitsOptional: false
};

function numeric(options) {
  return numeric_$.extend(true, {}, numericAlias, options);
}
function currency(options) {
  return numeric_$.extend(true, {}, numericAlias, currencyAlias, options);
}
function decimal(options) {
  return numeric_$.extend(true, {}, numericAlias, decimalAlias, options);
}
function integer(options) {
  return numeric_$.extend(true, {}, numericAlias, integerAlias, options);
}
function percentage(options) {
  return numeric_$.extend(true, {}, numericAlias, percentageAlias, options);
}
function indianns(options) {
  return numeric_$.extend(true, {}, numericAlias, indiannsAlias, options);
}
function registerNumeric() {
  inputmask_dependencyLib.extend(true, aliases, {
    numeric: numericAlias,
    currency: {
      alias: "numeric",
      ...currencyAlias
    },
    decimal: {
      alias: "numeric",
      ...decimalAlias
    },
    integer: {
      alias: "numeric",
      ...integerAlias
    },
    percentage: {
      alias: "numeric",
      ...percentageAlias
    },
    indianns: {
      alias: "numeric",
      ...indiannsAlias
    }
  });
}
;// ./lib/inputmaskElement.js


const inputmaskElement_document = global_window.document;

// add check if it is supported by the browser
// integrate shadowroot into maskcope
if (inputmaskElement_document && inputmaskElement_document.head && inputmaskElement_document.head.attachShadow && global_window.customElements && global_window.customElements.get("input-mask") === undefined) {
  class InputmaskElement extends HTMLElement {
    /** @type {HTMLInputElement} */
    input;
    constructor() {
      super();
      const attributeNames = this.getAttributeNames(),
        shadow = this.attachShadow({
          mode: "closed"
        });
      this.input = inputmaskElement_document.createElement("input");
      this.input.type = "text";
      shadow.appendChild(this.input);
      for (const attr in attributeNames) {
        if (Object.prototype.hasOwnProperty.call(attributeNames, attr)) {
          this.input.setAttribute(attributeNames[attr], this.getAttribute(attributeNames[attr]));
        }
      }
      const im = new lib_inputmask();
      im.dataAttribute = "";
      im.mask(this.input);
    }

    /**
     * @param {string} attrName
     * @param {string | null} oldVal
     * @param {string | null} newVal
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.input.setAttribute(attrName, newVal);
    }

    // bind value
    get value() {
      return this.input.value;
    }

    /** @param {string} value */
    set value(value) {
      this.input.value = value;
    }
  }
  global_window.customElements.define("input-mask", InputmaskElement);
}
;// ./bundle.js
/* unused harmony import specifier */ var bundle_Inputmask;













registerDefinitions();
registerCssunit();
registerUrl();
registerIp();
registerEmail();
registerMac();
registerVin();
registerSsn();
registerDatetime();
registerNumeric();
/* harmony default export */ const bundle = ((/* unused pure expression or super */ null && (bundle_Inputmask)));
;// ./lib/extensions/colormask.js



/*
 Input Mask colormask extension
 http://github.com/RobinHerbots/inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */





const colormask_$ = lib_inputmask.dependencyLib;
function Colormask(alias, options, internal) {
  // allow instanciating without new
  if (!(this instanceof Colormask)) {
    return new Colormask(alias, options, internal);
  }
  this.colorMask = undefined;
  Object.getOwnPropertyNames(lib_inputmask).forEach(function (key) {
    if (!Object.prototype.hasOwnProperty.call(this, key)) {
      this[key] = lib_inputmask[key];
    }
  }, this);
}
Colormask.prototype = lib_inputmask.prototype;
Colormask.prototype.writeBufferHook = function (caretPos) {
  renderColorMask.call(this, this.el, caretPos, false);
};
Colormask.prototype.caretHook = function (caretPos) {
  renderColorMask.call(this, this.el, caretPos, false);
};
Colormask.prototype.applyMaskHook = function () {
  initializeColorMask.call(this, this.el);
};
Colormask.prototype.keyEventHook = function (e) {
  if (e.key === keys.ArrowRight || e.key === keys.ArrowLeft) {
    const inputmask = this;
    setTimeout(function () {
      const caretPos = caret.call(inputmask, inputmask.el, undefined, undefined, true);
      renderColorMask.call(inputmask, inputmask.el, caretPos);
    }, 0);
  }
};
function initializeColorMask(input) {
  const computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);
  function findCaretPos(clientx) {
    // calculate text width
    let e = document.createElement("span"),
      caretPos = 0;
    for (const style in computedStyle) {
      // clone styles
      if (isNaN(style) && style.indexOf("font") !== -1) {
        e.style[style] = computedStyle[style];
      }
    }
    e.style.textTransform = computedStyle.textTransform;
    e.style.letterSpacing = computedStyle.letterSpacing;
    e.style.position = "absolute";
    e.style.height = "auto";
    e.style.width = "auto";
    e.style.visibility = "hidden";
    e.style.whiteSpace = "nowrap";
    document.body.appendChild(e);
    let inputText = input.inputmask.__valueGet.call(input),
      previousWidth = 0;
    while (e.offsetWidth < clientx) {
      const ichar = inputText.charAt(caretPos);
      e.innerHTML += ichar === " " || ichar === "" ? "_" : ichar;
      if (e.offsetWidth >= clientx) {
        let offset1 = clientx - previousWidth,
          offset2 = e.offsetWidth - clientx;
        e.innerHTML = inputText.charAt(caretPos);
        offset1 += Math.round(e.offsetWidth / 2);
        caretPos = (offset1 < offset2 ? caretPos - 1 : caretPos) - 1;
        break;
      }
      previousWidth = e.offsetWidth;
      caretPos++;
    }
    if (input.style.textAlign === "right") {
      e.innerHTML = "_";
      const maxChars = Math.ceil(input.offsetWidth / e.offsetWidth) - 1;
      caretPos = inputText.length - (maxChars - caretPos) + 1;
    }
    document.body.removeChild(e);
    return caretPos;
  }
  const template = document.createElement("div");
  template.style.width = computedStyle.width;
  template.style.textAlign = computedStyle.textAlign;
  const colorMask = document.createElement("div");
  input.inputmask.colorMask = colorMask;
  colorMask.className = "im-colormask";
  input.parentNode.insertBefore(colorMask, input);
  input.parentNode.removeChild(input);
  colorMask.appendChild(input);
  colorMask.appendChild(template);
  input.style.left = template.offsetLeft + "px";
  colormask_$(colorMask).on("mouseleave", function (e) {
    return EventHandlers.mouseleaveEvent.call(input, [e]);
  });
  colormask_$(colorMask).on("mouseenter", function (e) {
    return EventHandlers.mouseenterEvent.call(input, [e]);
  });
  colormask_$(colorMask).on("click", function (e) {
    caret.call(input.inputmask, input, findCaretPos(e.clientX), undefined, true);
    return EventHandlers.clickEvent.call(input, [e]);
  });
}
function positionColorMask(input, template) {
  input.style.left = template.offsetLeft + "px";
}
function renderColorMask(input, caretPos, clear) {
  let inputmask = this,
    {
      isRTL,
      maskset,
      opts,
      maxLength
    } = inputmask,
    maskTemplate = [],
    isStatic = false,
    test,
    testPos,
    ndxIntlzr,
    pos = 0,
    templates = {
      static: {
        start: isRTL ? "</span>" : "<span class='im-static'>",
        end: isRTL ? "<span class='im-static'>" : "</span>"
      },
      caret: {
        start: '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">',
        start_select: '<mark class="im-caret-select">',
        end: "</mark>"
      }
    };
  function setEntry(entry) {
    if (entry === undefined) entry = "";
    if (!isStatic && (test.static === true || testPos.input === undefined)) {
      isStatic = true;
      maskTemplate.push(templates.static.start + entry);
    } else if (isStatic && (test.static !== true && testPos.input !== undefined || test.def === "")) {
      isStatic = false;
      maskTemplate.push(templates.static.end + entry);
    } else {
      maskTemplate.push(entry);
    }
  }
  function setCaret(begin, end, length) {
    if (document.activeElement === input) {
      maskTemplate.splice(begin, 0, begin === end || length > maskset.maskLength ? templates.caret.start : templates.caret.start_select);
      maskTemplate.splice(end + (isRTL ? 0 : 1), 0, templates.caret.end);
    }
  }
  if (input.inputmask.colorMask !== undefined) {
    const buffer = getBuffer.call(inputmask);
    if (caretPos === undefined) {
      caretPos = caret.call(inputmask, input);
    } else if (caretPos.begin === undefined) {
      caretPos = {
        begin: caretPos,
        end: caretPos
      };
    }
    if (isRTL) {
      // translate caretPos
      caretPos.begin = translatePosition.call(inputmask, caretPos.begin);
      caretPos.end = translatePosition.call(inputmask, caretPos.end);
    }
    if (clear !== true) {
      const lvp = getLastValidPosition.call(inputmask);
      do {
        if (maskset.validPositions[pos]) {
          testPos = maskset.validPositions[pos];
          test = testPos.match;
          ndxIntlzr = testPos.locator.slice();
          setEntry(buffer[pos]);
        } else {
          testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
          test = testPos.match;
          ndxIntlzr = testPos.locator.slice();
          const jitMasking = opts.jitMasking !== false ? opts.jitMasking : test.jit;
          if (jitMasking === false || jitMasking === undefined /* || pos < lvp */ || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
            setEntry(getPlaceholder.call(inputmask, pos, test));
            // } else {
            // 	isStatic = false;
          } // break infinite loop
        }
        pos++;
      } while ((maxLength === undefined || pos < maxLength) && (test.static !== true || test.def !== "") || lvp > pos || isStatic);
      if (isStatic) setEntry();
      setCaret(isRTL ? caretPos.end : caretPos.begin, isRTL ? caretPos.begin : caretPos.end, caretPos.end);
    }
    const template = input.inputmask.colorMask.getElementsByTagName("div")[0];
    template.innerHTML = (isRTL ? maskTemplate.reverse() : maskTemplate).join("");
    positionColorMask(input, template);
    // console.log(template.innerHTML)
    // console.log(JSON.stringify(caretPos));
  }
}

// make inputmask available
window.Colormask = Colormask;
/* harmony default export */ const colormask = (Colormask);
;// ./bundle.colormask.js


/* harmony default export */ const bundle_colormask = (colormask);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});