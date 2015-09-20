(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["jquery"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("jquery"));
		} else {
			factory(jQuery);
		}
	}
	(function($) {

		//helper functions

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

		var class2type = {},
			classTypes = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
		for (var nameNdx = 0; nameNdx < classTypes.length; nameNdx++) {
			class2type["[object " + classTypes[nameNdx] + "]"] = classTypes[nameNdx].toLowerCase();
		}

		function type(obj) {
			if (obj == null) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[toString.call(obj)] || "object" :
				typeof obj;
		}

		//micro event lib
		function Event(elem) {
			this[0] = elem;
		}

		Event.prototype = {
			on: function() {
				$.fn.on.apply($(this[0]), arguments);
				return this;
			},
			off: function() {
				$.fn.off.apply($(this[0]), arguments);
				return this;
			},
			trigger: function() {
				$.fn.trigger.apply($(this[0]), arguments);
				return this;
			},
			triggerHandler: function() {
				$.fn.triggerHandler.apply($(this[0]), arguments);
				return this;
			}
		};

		function getDomEvents() {
			var domEvents = [];
			for (var i in document) {
				if (i.substring(0, 2) === "on" && (document[i] === null || typeof document[i] === 'function'))
					domEvents.push(i);
			}
			return domEvents;
		};


		function DependencyLib(elem) {
			return new Event(elem);
		}

		//static
		DependencyLib.isFunction = function(obj) {
			return type(obj) === "function";
		};
		DependencyLib.noop = function() {};
		DependencyLib.parseJSON = function(data) {
			return JSON.parse(data + "");
		};
		DependencyLib.isArray = Array.isArray;
		DependencyLib.inArray = function(elem, arr, i) {
			return arr == null ? -1 : indexOf(arr, elem, i);
		};
		DependencyLib.valHooks = undefined;
		DependencyLib.extend = $.extend;
		DependencyLib.each = $.each;
		DependencyLib.map = $.map;
		DependencyLib.Event = $.Event; //needs to be replaced
		DependencyLib._data = $._data; //needs to be replaced
		DependencyLib.data = $.data; //needs to be replaced

		window.dependencyLib = DependencyLib;
		return DependencyLib;
	}));
