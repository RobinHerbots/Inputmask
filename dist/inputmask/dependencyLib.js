/*!
* dependencyLib.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.1-55
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : "object" == typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery);
}(function($) {
    function indexOf(list, elem) {
        for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
        return -1;
    }
    function type(obj) {
        return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
    }
    function Event(elem) {
        this[0] = elem;
    }
    function DependencyLib(elem) {
        return new Event(elem);
    }
    for (var class2type = {}, classTypes = "Boolean Number String Function Array Date RegExp Object Error".split(" "), nameNdx = 0; nameNdx < classTypes.length; nameNdx++) class2type["[object " + classTypes[nameNdx] + "]"] = classTypes[nameNdx].toLowerCase();
    return Event.prototype = {
        on: function() {
            return $.fn.on.apply($(this[0]), arguments), this;
        },
        off: function() {
            return $.fn.off.apply($(this[0]), arguments), this;
        },
        trigger: function() {
            return $.fn.trigger.apply($(this[0]), arguments), this;
        },
        triggerHandler: function() {
            return $.fn.triggerHandler.apply($(this[0]), arguments), this;
        }
    }, DependencyLib.isFunction = function(obj) {
        return "function" === type(obj);
    }, DependencyLib.noop = function() {}, DependencyLib.parseJSON = function(data) {
        return JSON.parse(data + "");
    }, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function(elem, arr, i) {
        return null == arr ? -1 : indexOf(arr, elem, i);
    }, DependencyLib.valHooks = void 0, DependencyLib.extend = $.extend, DependencyLib.each = $.each, 
    DependencyLib.map = $.map, DependencyLib.Event = $.Event, DependencyLib._data = $._data, 
    DependencyLib.data = $.data, window.dependencyLib = DependencyLib, DependencyLib;
});