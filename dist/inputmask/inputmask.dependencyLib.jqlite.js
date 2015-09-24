/*!
* inputmask.dependencyLib.jqlite.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.1-89
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jqlite" ], factory) : "object" == typeof exports ? module.exports = factory(require("jqlite")) : factory(jQuery);
}(function($) {
    function type(obj) {
        return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[class2type.toString.call(obj)] || "object" : typeof obj;
    }
    for (var class2type = {}, classTypes = "Boolean Number String Function Array Date RegExp Object Error".split(" "), nameNdx = 0; nameNdx < classTypes.length; nameNdx++) class2type["[object " + classTypes[nameNdx] + "]"] = classTypes[nameNdx].toLowerCase();
    return $.isFunction = function(obj) {
        return "function" === type(obj);
    }, $.isArray = Array.isArray, $.isWindow = function(obj) {
        return null != obj && obj === obj.window;
    }, $.isPlainObject = function(obj) {
        return "object" !== type(obj) || obj.nodeType || $.isWindow(obj) ? !1 : obj.constructor && !class2type.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0;
    }, $.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || $.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && $.isArray(src) ? src : []) : clone = src && $.isPlainObject(src) ? src : {}, 
        target[name] = $.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, $.data = function(elem, name, data) {
        return $(elem).data(name, data);
    }, window.dependencyLib = $, $;
});