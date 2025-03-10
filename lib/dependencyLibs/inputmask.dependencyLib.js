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

function DependencyLib(elem) {
  if (elem instanceof DependencyLib) {
    return elem;
  }
  if (!(this instanceof DependencyLib)) {
    return new DependencyLib(elem);
  }
  if (elem !== undefined && elem !== null && elem !== window) {
    this[0] = elem.nodeName
      ? elem
      : elem[0] !== undefined && elem[0].nodeName
      ? elem[0]
      : document.querySelector(elem);
    if (this[0] !== undefined && this[0] !== null) {
      this[0].eventRegistry = this[0].eventRegistry || {};
    }
  }
}

DependencyLib.prototype = {
  on,
  off,
  trigger
};

// static
DependencyLib.extend = extend;
DependencyLib.data = data;
DependencyLib.Event = Event;

export default DependencyLib;
