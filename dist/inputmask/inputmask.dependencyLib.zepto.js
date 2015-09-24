/*!
* inputmask.dependencyLib.zepto.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.1-89
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "zepto", "zepto_data", "zepto_event" ], factory) : "object" == typeof exports ? module.exports = factory(require("zepto"), require("zepto_data"), require("zepto_event")) : factory(Zepto);
}(function($) {
    return $.extend = function() {
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