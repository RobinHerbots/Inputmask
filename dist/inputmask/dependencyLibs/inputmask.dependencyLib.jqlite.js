/*!
* dependencyLibs/inputmask.dependencyLib.jqlite.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-78
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "jqlite", "../global/window", "../global/document]" ], factory) : "object" == typeof exports ? module.exports = factory(require("jqlite"), require("../global/window"), require("../global/document")) : window.dependencyLib = factory(jqlite, window, document);
}(function($, window, document) {
    function indexOf(list, elem) {
        for (var i = 0, len = list.length; i < len; i++) if (list[i] === elem) return i;
        return -1;
    }
    function isWindow(obj) {
        return null != obj && obj === obj.window;
    }
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, ltype = typeof obj;
        return "function" !== ltype && !isWindow(obj) && (!(1 !== obj.nodeType || !length) || ("array" === ltype || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj));
    }
    return $.inArray = function(elem, arr, i) {
        return null == arr ? -1 : indexOf(arr, elem);
    }, $.isFunction = function(obj) {
        return "function" == typeof obj;
    }, $.isArray = Array.isArray, $.isPlainObject = function(obj) {
        return "object" == typeof obj && !obj.nodeType && !isWindow(obj) && !(obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"));
    }, $.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || $.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        target !== (copy = options[name]) && (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && $.isArray(src) ? src : []) : clone = src && $.isPlainObject(src) ? src : {}, 
        target[name] = $.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, $.each = function(obj, callback) {
        var i = 0;
        if (isArraylike(obj)) for (var length = obj.length; i < length && !1 !== callback.call(obj[i], i, obj[i]); i++) ; else for (i in obj) if (!1 === callback.call(obj[i], i, obj[i])) break;
        return obj;
    }, $.data = function(elem, name, data) {
        return $(elem).data(name, data);
    }, $.Event = $.Event || function(event, params) {
        params = params || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var evt = document.createEvent("CustomEvent");
        return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), 
        evt;
    }, $.Event.prototype = window.Event.prototype, $;
});