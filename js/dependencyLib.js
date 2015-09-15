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

		var dependencyLib = {
			isFunction: function(obj) {
				return jQuery.type(obj) === "function";
			},
			noop: function() {},
			parseJSON: function(data) {
				return JSON.parse(data + "");
			},
			isArray: Array.isArray,
			inArray: function(elem, arr, i) {
				return arr == null ? -1 : indexOf.call(arr, elem, i);
			},
			valHooks: undefined,
			extend: $.extend,
			each: $.each,
			map: $.map,
			Event: $.Event, //needs to be replaced
			_data: $._data, //needs to be replaced
			data: $.data //needs to be replaced
		}
		dependencyLib = $; //todo split out needed functionality
		window.dependencyLib = dependencyLib;
		return dependencyLib;
	}));
