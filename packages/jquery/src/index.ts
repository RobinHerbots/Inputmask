// jQuery plugin for Inputmask
// Provides $.fn.inputmask and re-exports Inputmask with jQuery dependencyLib

import $ from "jquery";
import jQueryDependencyLib from "./dependencyLibs/inputmask.dependencyLib.jquery";
import Inputmask from "inputmask";
import { registerDefinitions } from "inputmask/extensions/definitions";
import { registerCssunit } from "inputmask/extensions/cssunit";
import { registerUrl } from "inputmask/extensions/url";
import { registerIp } from "inputmask/extensions/ip";
import { registerEmail } from "inputmask/extensions/email";
import { registerMac } from "inputmask/extensions/mac";
import { registerVin } from "inputmask/extensions/vin";
import { registerSsn } from "inputmask/extensions/ssn";
import { registerDatetime } from "inputmask/extensions/date";
import { registerNumeric } from "inputmask/extensions/numeric";

// Override the dependencyLib for jQuery
Inputmask.dependencyLib = jQueryDependencyLib;

// Register all extensions
registerDefinitions();
registerCssunit();
registerUrl();
registerIp();
registerEmail();
registerMac();
registerVin();
registerSsn();
registerDatetime();
registerNumeric();

// jQuery plugin - extends $.fn
if ($.fn.inputmask === undefined) {
  $.fn.inputmask = function (fn, options) {
    let nptmask;
    const input = this[0];
    if (options === undefined) options = {};
    if (typeof fn === "string") {
      switch (fn) {
        case "unmaskedvalue":
          return input && input.inputmask
            ? input.inputmask.unmaskedvalue()
            : $(input).val();
        case "remove":
          return this.each(function () {
            if (this.inputmask) this.inputmask.remove();
          });
        case "getemptymask":
          return input && input.inputmask ? input.inputmask.getemptymask() : "";
        case "hasMaskedValue":
          return input && input.inputmask
            ? input.inputmask.hasMaskedValue()
            : false;
        case "isComplete":
          return input && input.inputmask ? input.inputmask.isComplete() : true;
        case "getmetadata":
          return input && input.inputmask
            ? input.inputmask.getmetadata()
            : undefined;
        case "setvalue":
          Inputmask.setValue(input, options);
          break;
        case "option":
          if (typeof options === "string") {
            if (input && input.inputmask !== undefined) {
              return input.inputmask.option(options);
            }
          } else {
            return this.each(function () {
              if (this.inputmask !== undefined) {
                return this.inputmask.option(options);
              }
            });
          }
          break;
        default:
          options.alias = fn;
          nptmask = new Inputmask(options);
          return this.each(function () {
            nptmask.mask(this);
          });
      }
    } else if (Array.isArray(fn)) {
      options.alias = fn;
      nptmask = new Inputmask(options);
      return this.each(function () {
        nptmask.mask(this);
      });
    } else if (typeof fn === "object") {
      nptmask = new Inputmask(fn);
      if (fn.mask === undefined && fn.alias === undefined) {
        return this.each(function () {
          if (this.inputmask !== undefined) {
            return this.inputmask.option(fn);
          } else nptmask.mask(this);
        });
      } else {
        return this.each(function () {
          nptmask.mask(this);
        });
      }
    } else if (fn === undefined) {
      // look for data-inputmask attributes
      return this.each(function () {
        nptmask = new Inputmask(options);
        nptmask.mask(this);
      });
    }
  };
}

export default Inputmask;