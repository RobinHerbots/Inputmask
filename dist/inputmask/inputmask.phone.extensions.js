/*!
* inputmask.phone.extensions.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2016 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.2-43
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "inputmask.dependencyLib", "inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("./inputmask.dependencyLib.jquery"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
}(function($, Inputmask) {
    return Inputmask.extendAliases({
        abstractphone: {
            countrycode: "",
            phoneCodes: [],
            mask: function(opts) {
                return opts.definitions = {
                    "#": opts.definitions[9]
                }, opts.phoneCodes.sort(function(a, b) {
                    return (a.mask || a) < (b.mask || b) ? -1 : 1;
                });
            },
            keepStatic: !1,
            onBeforeMask: function(value, opts) {
                var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
                return (processedValue.indexOf(opts.countrycode) > 1 || -1 === processedValue.indexOf(opts.countrycode)) && (processedValue = "+" + opts.countrycode + processedValue), 
                processedValue;
            }
        }
    }), Inputmask;
});