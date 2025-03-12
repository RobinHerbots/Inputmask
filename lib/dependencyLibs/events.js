import window from "../global/window";

import data from "./data";
import extend from "./extend";
import DependencyLib from "./inputmask.dependencyLib";

export { on, off, trigger, Evnt as Event };

const document = window.document;

function isValidElement(elem) {
  return elem instanceof Element && data(elem, "events");
}

let Evnt;
if (typeof window.CustomEvent === "function") {
  Evnt = window.CustomEvent;
} else if (window.Event && document && document.createEvent) {
  Evnt = function (event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: undefined
    };
    const evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  };
  Evnt.prototype = window.Event.prototype;
} else if (typeof Event !== "undefined") {
  // nodejs
  Evnt = Event;
}

function on(events, handler) {
  if (!this[0] || !isValidElement(this[0])) {
    return this; // Early return if no valid element
  }

  const elem = this[0],
    eventRegistry = data(elem, "events"),
    addEvent = (ev, namespace) => {
      // register domevent
      if (elem.addEventListener) {
        // all browsers except IE before version 9
        elem.addEventListener(ev, handler, false);
      } else if (elem.attachEvent) {
        // IE before version 9
        elem.attachEvent(`on${ev}`, handler);
      }
      eventRegistry[ev] = eventRegistry[ev] || {};
      eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
      eventRegistry[ev][namespace].push(handler);
    };

  events.split(" ").forEach((event) => {
    const [ev, namespace = "global"] = event.split(".");
    addEvent(ev, namespace);
  });

  return this;
}

function off(events, handler) {
  let eventRegistry, elem;

  function removeEvent(ev, namespace, handler) {
    if (ev in eventRegistry === true) {
      // unbind to dom events
      if (elem.removeEventListener) {
        // all browsers except IE before version 9
        elem.removeEventListener(ev, handler, false);
      } else if (elem.detachEvent) {
        // IE before version 9
        elem.detachEvent(`on${ev}`, handler);
      }
      // when the namespace is not defined (global namespace), we need to clean up all events in all namespaces
      if (namespace === "global") {
        for (const nmsp in eventRegistry[ev]) {
          eventRegistry[ev][nmsp].splice(
            eventRegistry[ev][nmsp].indexOf(handler),
            1
          );
        }
      } else {
        eventRegistry[ev][namespace].splice(
          eventRegistry[ev][namespace].indexOf(handler),
          1
        );
      }
    }
  }

  function resolveNamespace(ev, namespace) {
    const evts = [];
    let hndx, hndL;
    if (ev.length > 0) {
      const namespaces = namespace
        ? [namespace]
        : Object.keys(eventRegistry[ev]);
      for (let nsi = 0; nsi < namespaces.length; nsi++) {
        namespace = namespaces[nsi];
        if (handler === undefined) {
          for (
            hndx = 0, hndL = eventRegistry[ev][namespace]?.length || 0;
            hndx < hndL;
            hndx++
          ) {
            evts.push({
              ev,
              namespace,
              handler: eventRegistry[ev][namespace][hndx]
            });
          }
        } else {
          evts.push({
            ev,
            namespace,
            handler
          });
        }
      }
    } else if (namespace.length > 0) {
      for (const evNdx in eventRegistry) {
        if (eventRegistry[evNdx][namespace]) {
          if (handler === undefined) {
            for (
              hndx = 0, hndL = eventRegistry[evNdx][namespace].length;
              hndx < hndL;
              hndx++
            ) {
              evts.push({
                ev: evNdx,
                namespace,
                handler: eventRegistry[evNdx][namespace][hndx]
              });
            }
          } else {
            evts.push({
              ev: evNdx,
              namespace,
              handler
            });
          }
        }
      }
    }

    return evts;
  }

  if (isValidElement(this[0])) {
    eventRegistry = data(this[0], "events");
    elem = this[0];
    // if no events defined, remove all events
    events = events || Object.keys(eventRegistry).join(" ");

    if (events !== "") {
      events.split(" ").forEach((event) => {
        const [ev, namespace] = event.split(".");
        resolveNamespace(ev, namespace).forEach(
          ({ ev: ev1, handler: handler1, namespace: namespace1 }) => {
            removeEvent(ev1, namespace1, handler1);
          }
        );
      });
    }
  }
  return this;
}

function trigger(events /* , args... */) {
  if (isValidElement(this[0])) {
    const eventRegistry = data(this[0], "events"),
      elem = this[0],
      _events = typeof events === "string" ? events.split(" ") : [events.type];
    for (let endx = 0; endx < _events.length; endx++) {
      const nsEvent = _events[endx].split("."),
        ev = nsEvent[0],
        namespace = nsEvent[1] || "global";
      if (document !== undefined) {
        // trigger domevent
        let evnt;
        const params = {
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
            evnt.initCustomEvent(
              ev,
              params.bubbles,
              params.cancelable,
              params.detail
            );
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
        arguments[0] = arguments[0].type
          ? arguments[0]
          : DependencyLib.Event(arguments[0]);
        arguments[0].detail = arguments.slice(1);

        const registry = eventRegistry[ev],
          handlers =
            namespace === "global"
              ? Object.values(registry).flat()
              : registry[namespace];
        handlers.forEach((handler) => handler.apply(elem, arguments));
      }
    }
  }
  return this;
}
