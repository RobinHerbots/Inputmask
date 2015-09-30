/*!
* inputmask.dependencyLib.jbone.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.1-113
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jbone" ], factory) : "object" == typeof exports ? module.exports = factory(require("jbone")) : factory(jBone);
}(function($) {
    return window.dependencyLib = $, $;
});