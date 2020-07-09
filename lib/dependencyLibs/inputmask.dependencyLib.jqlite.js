/*
 Input Mask plugin dependencyLib
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */
var $ = require("jqlite"), window = require("../global/window"), document = window.document;
// Use a stripped-down indexOf as it's faster than native
// http://jsperf.com/thor-indexof-vs-for/5
function indexOf(list, elem) {
	var i = 0,
		len = list.length;
	for (; i < len; i++) {
		if (list[i] === elem) {
			return i;
		}
	}
	return -1;
}


function isWindow(obj) {
	return obj != null && obj === obj.window;
}
$.inArray = function (elem, arr, i) {
	return arr == null ? -1 : indexOf(arr, elem, i);
};
$.isPlainObject = function (obj) {
	// Not plain objects:
	// - Any object or value whose internal [[Class]] property is not "[object Object]"
	// - DOM nodes
	// - window
	if (typeof obj !== "object" || obj.nodeType || isWindow(obj)) {
		return false;
	}

	if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
		return false;
	}

	// If the function hasn't returned already, we're confident that
	// |obj| is a plain object, created by {} or constructed with new Object
	return true;
};
$.extend = function () {
	var options, name, src, copy, copyIsArray, clone,
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

	// Extend jQuery itself if only one argument is passed
	if (i === length) {
		target = this;
		i--;
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
				if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && $.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = $.extend(deep, clone, copy);

					// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

$.data = function (elem, name, data) {
	return $(elem).data(name, data);
};
$.Event = $.Event || function CustomEvent(event, params) {
	params = params || {
		bubbles: false,
		cancelable: false,
		detail: undefined
	};
	var evt = document.createEvent("CustomEvent");
	evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	return evt;
};
$.Event.prototype = window.Event.prototype;

module.exports = $;
