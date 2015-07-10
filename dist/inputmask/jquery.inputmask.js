/*!
* jquery.inputmask.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.64-114
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "./inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("jquery"), require("./inputmask")) : factory(jQuery);
}(function($) {
    return void 0 === $.fn.inputmask && ($.fn.inputmask = function(fn, options) {
        var nptmask;
        if (options = options || {}, "string" == typeof fn) switch (fn) {
          case "mask":
            return nptmask = new inputmask(options), this.each(function() {
                nptmask.mask(this);
            });

          case "unmaskedvalue":
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

          case "remove":
            return this.each(function() {
                this.inputmask && this.inputmask.remove();
            });

          case "getemptymask":
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.getemptymask() : "";

          case "hasMaskedValue":
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.hasMaskedValue() : !1;

          case "isComplete":
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.isComplete() : !0;

          case "getmetadata":
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.getmetadata() : void 0;

          default:
            return options.alias = fn, nptmask = new inputmask(options), this.each(function() {
                nptmask.mask(this);
            });
        } else {
            if ("object" == typeof fn) return nptmask = new inputmask(fn), this.each(function() {
                nptmask.mask(this);
            });
            if (void 0 == fn) return this.each(function() {
                nptmask = new inputmask(options), nptmask.mask(this);
            });
        }
    }), $.fn.inputmask;
});