/*
 * Input Mask plugin for jquery
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 -	Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0-dev
 */

(function($) {
  if ($.fn.inputmask === undefined) {
    //jquery plugin
    $.fn.inputmask = function(fn, options) {
      var nptmask;
      options = options || {};
      if (typeof fn === "string") {
        switch (fn) {
          case "mask":
            nptmask = new inputmask(options);
            return this.each(function() {
              nptmask.mask(this);
            });
          case "unmaskedvalue":
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();
          case "remove":
            return this.each(function() {
              if (this.inputmask) this.inputmask.remove();
            });
          case "getemptymask":
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.getemptymask() : "";
          case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.hasMaskedValue() : false;
          case "isComplete":
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.isComplete() : true;
          case "getmetadata": //return mask metadata if exists
            var input = this.jquery && this.length > 0 ? this[0] : this;
            return input.inputmask ? input.inputmask.getmetadata() : undefined;
          default:
            options.alias = fn;
            nptmask = new inputmask(options);
            return this.each(function() {
              nptmask.mask(this);
            });
        }
      } else if (typeof fn == "object") {
        nptmask = new inputmask(fn);
        return this.each(function() {
          nptmask.mask(this);
        });
      } else if (fn == undefined) {
        //look for data-inputmask atributes
        return this.each(function() {
          nptmask = new inputmask(options);
          nptmask.mask(this);
        });
      }
    };
  }
  return $.fn.inputmask;
})(jQuery);
