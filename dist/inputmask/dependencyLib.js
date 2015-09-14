/*!
* dependencyLib.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.1-29
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : "object" == typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery);
}(function($) {
    function indexOf(list, elem) {
        for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
        return -1;
    }
    var dependencyLib = {
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        noop: function() {},
        parseJSON: function(data) {
            return JSON.parse(data + "");
        },
        isArray: Array.isArray,
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
        },
        valHooks: void 0,
        extend: $.extend,
        each: $.each,
        map: $.map,
        Event: $.Event,
        _data: $._data,
        data: $.data
    };
    return dependencyLib = $, window.dependencyLib = dependencyLib, dependencyLib;
});