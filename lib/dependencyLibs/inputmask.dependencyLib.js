/*
 Input Mask plugin dependencyLib
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

import window from "../global/window";

import data from "./data";
import { on, off, trigger, Event } from "./events";
import extend from "./extend";

const document = window.document;

class DependencyLib {
  constructor(elem) {
    if (elem instanceof DependencyLib) {
      return elem;
    }
    if (elem !== undefined && elem !== null && elem !== window) {
      this[0] = elem.nodeName
        ? elem
        : elem[0] !== undefined && elem[0].nodeName
          ? elem[0]
          : typeof elem === "string"
            ? document.querySelector(elem)
            : elem;
      if (this[0] !== undefined && this[0] !== null) {
        data(this[0], "events", data(this[0], "events") || {});
      }
    }
  }

  on = on;
  off = off;
  trigger = trigger;
}

// static
DependencyLib.extend = extend;
DependencyLib.data = data;
DependencyLib.Event = Event;

function dependencyLib(elem) {
  return new DependencyLib(elem);
}

dependencyLib.extend = DependencyLib.extend;
dependencyLib.data = DependencyLib.data;
dependencyLib.Event = DependencyLib.Event;


export default dependencyLib;
