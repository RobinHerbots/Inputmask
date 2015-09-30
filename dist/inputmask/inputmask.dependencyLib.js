/*!
* inputmask.dependencyLib.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.1-113
*/
!function(factory) {
    "function" == typeof define && define.amd ? define(factory) : "object" == typeof exports ? module.exports = factory() : factory();
}(function() {
    function indexOf(list, elem) {
        for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
        return -1;
    }
    function type(obj) {
        return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[class2type.toString.call(obj)] || "object" : typeof obj;
    }
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function Event(elem) {
        void 0 !== elem && null !== elem && (this[0] = elem.nodeName ? elem : document.querySelector(elem), 
        this[0].eventRegistry = this[0].eventRegistry || {});
    }
    function DependencyLib(elem) {
        return void 0 !== elem && null !== elem && (this[0] = elem.nodeName ? elem : document.querySelector(elem), 
        this[0].eventRegistry = this[0].eventRegistry || {}), this instanceof DependencyLib ? void 0 : new DependencyLib(elem);
    }
    for (var class2type = {}, classTypes = "Boolean Number String Function Array Date RegExp Object Error".split(" "), nameNdx = 0; nameNdx < classTypes.length; nameNdx++) class2type["[object " + classTypes[nameNdx] + "]"] = classTypes[nameNdx].toLowerCase();
    var domEvents = function() {
        var domEvents = [];
        for (var i in document) "on" !== i.substring(0, 2) || null !== document[i] && "function" != typeof document[i] || domEvents.push(i.substring(2));
        return domEvents;
    }();
    return Event.prototype = {
        on: function(events, handler) {
            function addEvent(ev, namespace) {
                -1 !== domEvents.indexOf(ev) && (elem.addEventListener ? elem.addEventListener(ev, handler, !1) : elem.attachEvent && elem.attachEvent("on" + ev, handler)), 
                eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [], 
                eventRegistry[ev][namespace].push(handler);
            }
            if (void 0 !== this[0]) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
                var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                addEvent(ev, namespace);
            }
            return this;
        },
        off: function(events, handler) {
            function removeEvent(ev, namespace, handler) {
                if (ev in eventRegistry == !0) if (-1 !== domEvents.indexOf(ev) && (elem.removeEventListener ? elem.removeEventListener(ev, handler, !1) : elem.detachEvent && elem.detachEvent("on" + ev, handler)), 
                "global" === namespace) for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1); else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
            }
            function resolveNamespace(ev, namespace) {
                var evts = [];
                if (ev.length > 0) if (void 0 === handler) for (var hndx = 0, hndL = eventRegistry[ev][namespace].length; hndL > hndx; hndx++) evts.push({
                    ev: ev,
                    namespace: namespace.length > 0 ? namespace : "global",
                    handler: eventRegistry[ev][namespace][hndx]
                }); else evts.push({
                    ev: ev,
                    namespace: namespace.length > 0 ? namespace : "global",
                    handler: handler
                }); else if (namespace.length > 0) for (var evNdx in eventRegistry) for (var nmsp in eventRegistry[evNdx]) if (nmsp === namespace) if (void 0 === handler) for (var hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndL > hndx; hndx++) evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: eventRegistry[evNdx][nmsp][hndx]
                }); else evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: handler
                });
                return evts;
            }
            if (void 0 !== this[0]) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) for (var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]), i = 0, offEventsL = offEvents.length; offEventsL > i; i++) removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
            return this;
        },
        trigger: function(events) {
            if (void 0 !== this[0]) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
                var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                if (-1 !== domEvents.indexOf(ev) && "global" === namespace) {
                    var evnt;
                    document.createEvent ? (evnt = new CustomEvent(ev, {
                        detail: Array.prototype.slice.call(arguments, 1)
                    }), elem.dispatchEvent(evnt)) : (evnt = document.createEventObject(), evnt.eventType = ev, 
                    elem.fireEvent("on" + evnt.eventType, evnt));
                } else if (void 0 !== eventRegistry[ev]) if (arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event(arguments[0]), 
                "global" === namespace) for (var nmsp in eventRegistry[ev]) for (var i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments); else for (var i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments);
            }
            return this;
        }
    }, DependencyLib.prototype = Event.prototype, DependencyLib.isFunction = function(obj) {
        return "function" === type(obj);
    }, DependencyLib.noop = function() {}, DependencyLib.parseJSON = function(data) {
        return JSON.parse(data + "");
    }, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function(elem, arr, i) {
        return null == arr ? -1 : indexOf(arr, elem, i);
    }, DependencyLib.valHooks = void 0, DependencyLib.isWindow = function(obj) {
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
    }, DependencyLib.each = function(obj, callback) {
        var value, i = 0;
        if (isArraylike(obj)) for (var length = obj.length; length > i && (value = callback.call(obj[i], i, obj[i]), 
        value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
        value === !1) break;
        return obj;
    }, DependencyLib.map = function(elems, callback) {
        var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
        if (isArray) for (;length > i; i++) value = callback(elems[i], i), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i), 
        null != value && ret.push(value);
        return [].concat(ret);
    }, DependencyLib.Event = function(type) {
        return {
            preventDefault: DependencyLib.noop,
            altKey: !1,
            charCode: 0,
            ctrlKey: !1,
            currentTarget: null,
            keyCode: 0,
            metaKey: !1,
            shiftKey: !1,
            target: null,
            type: type,
            which: 0
        };
    }, DependencyLib.data = function(owner, key, value) {
        return void 0 === value ? owner.__data ? owner.__data[key] : null : (owner.__data = owner.__data || {}, 
        void (owner.__data[key] = value));
    }, window.dependencyLib = DependencyLib, DependencyLib;
});