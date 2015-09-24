/*!
* inputmask.dependencyLib.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.1-89
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : "object" == typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery);
}(function($) {
    function indexOf(list, elem) {
        for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
        return -1;
    }
    function type(obj) {
        return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[class2type.toString.call(obj)] || "object" : typeof obj;
    }
    function Event(elem) {
        this[0] = elem;
    }
    function DependencyLib(elem) {
        return this instanceof DependencyLib ? void 0 : new Event(elem);
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
    }, DependencyLib.valHooks = $.valHooks, DependencyLib.isWindow = function(obj) {
        return null != obj && obj === obj.window;
    }, DependencyLib.isPlainObject = function(obj) {
        return "object" !== type(obj) || obj.nodeType || DependencyLib.isWindow(obj) ? !1 : obj.constructor && !class2type.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0;
    }, DependencyLib.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || DependencyLib.isFunction(target) || (target = {}), 
        i === length && (target = this, i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (DependencyLib.isPlainObject(copy) || (copyIsArray = DependencyLib.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && DependencyLib.isArray(src) ? src : []) : clone = src && DependencyLib.isPlainObject(src) ? src : {}, 
        target[name] = DependencyLib.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, DependencyLib.each = $.each, DependencyLib.map = $.map, DependencyLib.Event = $.Event, 
    DependencyLib.data = $.data, window.dependencyLib = DependencyLib, DependencyLib;
});