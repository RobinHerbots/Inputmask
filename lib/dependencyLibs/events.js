import extend from "./extend";
import window from "../global/window";
import DependencyLib from "./inputmask.dependencyLib";

export {on, off, trigger, Evnt as Event};

const document = window.document;

function isValidElement(elem) {
    return elem instanceof Element;
}

let Evnt;
if (typeof window.CustomEvent === "function") {
    Evnt = window.CustomEvent;
} else if (window.Event && document && document.createEvent) {
    Evnt = function (event, params) {
        params = params || {bubbles: false, cancelable: false, composed: true, detail: undefined};
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };
    Evnt.prototype = window.Event.prototype;
} else if (typeof Event != "undefined") { //nodejs
    Evnt = Event;
}

function on(events, handler) {
    function addEvent(ev, namespace) {
        //register domevent
        if (elem.addEventListener) { // all browsers except IE before version 9
            elem.addEventListener(ev, handler, false);
        } else if (elem.attachEvent) { // IE before version 9
            elem.attachEvent(`on${ev}`, handler);
        }
        eventRegistry[ev] = eventRegistry[ev] || {};
        eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
        eventRegistry[ev][namespace].push(handler);
    }

    if (isValidElement(this[0])) {
        var eventRegistry = this[0].eventRegistry,
            elem = this[0];

        events.split(" ").forEach((event) => {
            const [ev, namespace = "global"] = event.split(".");
            addEvent(ev, namespace);
        });
    }
    return this;
}

function off(events, handler) {
    var eventRegistry, elem;

    function removeEvent(ev, namespace, handler) {
        if (ev in eventRegistry === true) {
            //unbind to dom events
            if (elem.removeEventListener) { // all browsers except IE before version 9
                elem.removeEventListener(ev, handler, false);
            } else if (elem.detachEvent) { // IE before version 9
                elem.detachEvent(`on${ev}`, handler);
            }
            if (namespace === "global") {
                for (var nmsp in eventRegistry[ev]) {
                    eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);
                }
            } else {
                eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
            }
        }
    }

    function resolveNamespace(ev, namespace) {
        var evts = [],
            hndx, hndL;
        if (ev.length > 0) {
            if (handler === undefined) {
                for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) {
                    evts.push({
                        ev: ev,
                        namespace: namespace && namespace.length > 0 ? namespace : "global",
                        handler: eventRegistry[ev][namespace][hndx]
                    });
                }
            } else {
                evts.push({
                    ev: ev,
                    namespace: namespace && namespace.length > 0 ? namespace : "global",
                    handler: handler
                });
            }
        } else if (namespace.length > 0) {
            for (var evNdx in eventRegistry) {
                for (var nmsp in eventRegistry[evNdx]) {
                    if (nmsp === namespace) {
                        if (handler === undefined) {
                            for (hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) {
                                evts.push({
                                    ev: evNdx,
                                    namespace: nmsp,
                                    handler: eventRegistry[evNdx][nmsp][hndx]
                                });
                            }
                        } else {
                            evts.push({
                                ev: evNdx,
                                namespace: nmsp,
                                handler: handler
                            });
                        }
                    }
                }
            }
        }

        return evts;
    }

    if (isValidElement(this[0]) && events) {
        eventRegistry = this[0].eventRegistry;
        elem = this[0];

        events.split(" ").forEach((event) => {
            const [ev, namespace] = event.split(".");
            resolveNamespace(ev, namespace).forEach(({ev: ev1, handler: handler1, namespace: namespace1}) => {
                removeEvent(ev1, namespace1, handler1);
            });
        });
    }
    return this;
}

function trigger(events /* , args... */) {
    if (isValidElement(this[0])) {
        var eventRegistry = this[0].eventRegistry,
            elem = this[0];
        var _events = typeof events === "string" ? events.split(" ") : [events.type];
        for (var endx = 0; endx < _events.length; endx++) {
            var nsEvent = _events[endx].split("."),
                ev = nsEvent[0],
                namespace = nsEvent[1] || "global";
            if (document !== undefined && namespace === "global") {
                //trigger domevent
                var evnt, i, params = {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                    detail: arguments[1]
                };
                // The custom event that will be created
                if (document.createEvent) {
                    try {
                        switch (ev) {
                            case "input":
                                params.inputType = "insertText";
                                evnt = new InputEvent(ev, params);
                                break;
                            default:
                                evnt = new CustomEvent(ev, params);
                        }
                    } catch (e) {
                        evnt = document.createEvent("CustomEvent");
                        evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
                    }
                    if (events.type) extend(evnt, events);
                    elem.dispatchEvent(evnt);
                } else {
                    evnt = document.createEventObject();
                    evnt.eventType = ev;
                    evnt.detail = arguments[1];
                    if (events.type) extend(evnt, events);
                    elem.fireEvent("on" + evnt.eventType, evnt);
                }
            } else if (eventRegistry[ev] !== undefined) {
                arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event(arguments[0]);
                arguments[0].detail = arguments.slice(1);

                const registry = eventRegistry[ev],
                    handlers = namespace === "global" ? Object.values(registry).flat() : registry[namespace];
                handlers.forEach(handler => handler.apply(elem, arguments));
            }
        }
    }
    return this;
}
