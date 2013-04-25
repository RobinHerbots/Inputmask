/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2013 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0

Regex extensions on the jquery.inputmask base
Allows for using regular expressions as a mask
*/
(function ($) {
     $.extend($.inputmask.defaults.aliases, { // $(selector).inputmask("Regex", { regex: "a regex expression"}
        'Regex': {
			mask: "r",
			greedy: false,
			repeat: 10, //needs to be computed
			regex: null,
			regexSplit: null,
            definitions: {
                'r': {
                    validator: function (chrs, buffer, pos, strict, opts) {
						function analyseRegex() {
							//implement me
						}
						if(opts.regexSplit == null){
							opts.regexSplit = analyseRegex();
						}
						
						var cbuffer =  buffer.splice(pos + 1, 0, chrs),
							regexPart, isValid = false;
						for(var i = 0; i < regexSplit.length; i++) {
							regexPart += opts.regexSplit[i];
							var exp = new RegExp(regexPart);
							isValid = exp.test(cbuffer);
							if(isValid) break;
						}
						
						return isValid;
				    }
				}
			}
		}
	});
})(jQuery);