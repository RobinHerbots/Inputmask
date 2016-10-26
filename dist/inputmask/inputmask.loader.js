/*!
* inputmask.loader.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2016 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.4-60
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "./inputmask.dependencyLib", "./inputmask", "./inputmask.extensions", "./inputmask.date.extensions", "./inputmask.numeric.extensions", "./inputmask.phone.extensions", "./inputmask.regex.extensions", "./jquery.inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("./inputmask.dependencyLib"), require("./inputmask"), require("./inputmask.extensions"), require("./inputmask.date.extensions"), require("./inputmask.numeric.extensions"), require("./inputmask.phone.extensions"), require("./inputmask.regex.extensions"), require("./jquery.inputmask")) : (window.InputmaskLoader = jQuery.Deferred(), 
    jQuery.getScript("./dist/inputmask/inputmask.dependencyLib.js").done(function() {
        jQuery.getScript("./js/inputmask.js").done(function() {
            jQuery.getScript("./js/inputmask.extensions.js").done(function() {
                jQuery.getScript("./js/inputmask.date.extensions.js").done(function() {
                    jQuery.getScript("./js/inputmask.numeric.extensions.js").done(function() {
                        jQuery.getScript("./js/inputmask.phone.extensions.js").done(function() {
                            jQuery.getScript("./js/inputmask.regex.extensions.js").done(function() {
                                jQuery.getScript("./js/jquery.inputmask.js").done(function() {
                                    window.InputmaskLoader.resolve();
                                });
                            });
                        });
                    });
                });
            });
        });
    }));
}(function($, Inputmask) {
    return Inputmask;
});