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
			var nptmask, input;
			options = options || {};
			if (typeof fn === "string") {
				switch (fn) {
					case "mask":
						nptmask = new Inputmask(options);
						return this.each(function() {
							nptmask.mask(this);
						});
					case "unmaskedvalue":
						input = this.jquery && this.length > 0 ? this[0] : this;
						return input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();
					case "remove":
						return this.each(function() {
							if (this.inputmask) this.inputmask.remove();
						});
					case "getemptymask":
						input = this.jquery && this.length > 0 ? this[0] : this;
						return input.inputmask ? input.inputmask.getemptymask() : "";
					case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
						input = this.jquery && this.length > 0 ? this[0] : this;
						return input.inputmask ? input.inputmask.hasMaskedValue() : false;
					case "isComplete":
						input = this.jquery && this.length > 0 ? this[0] : this;
						return input.inputmask ? input.inputmask.isComplete() : true;
					case "getmetadata": //return mask metadata if exists
						input = this.jquery && this.length > 0 ? this[0] : this;
						return input.inputmask ? input.inputmask.getmetadata() : undefined;
					case "setvalue":
						input = this.jquery && this.length > 0 ? this[0] : this;
						$(input).val(options);
						if (input.Inputmask === undefined)
							$(input).triggerHandler("setvalue.inputmask");
						break;
					default:
						options.alias = fn;
						nptmask = new Inputmask(options);
						return this.each(function() {
							nptmask.mask(this);
						});
				}
			} else if (typeof fn == "object") {
				nptmask = new Inputmask(fn);
				return this.each(function() {
					nptmask.mask(this);
				});
			} else if (fn === undefined) {
				//look for data-inputmask atributes
				return this.each(function() {
					nptmask = new Inputmask(options);
					nptmask.mask(this);
				});
			}
		};
	}
	return $.fn.inputmask;
})(jQuery);
