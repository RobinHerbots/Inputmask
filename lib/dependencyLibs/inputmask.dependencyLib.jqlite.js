/*
 Input Mask plugin dependencyLib
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */

import extend from "./extend";
import $ from "jqlite";
import window from "../global/window";
import { Event} from "./events";

$.extend = extend;
$.data = function (elem, name, data) {
	return $(elem).data(name, data);
};
$.Event = $.Event || Event;
$.Event.prototype = window.Event.prototype;

export default $;
