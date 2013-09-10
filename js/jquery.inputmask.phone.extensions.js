/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2013 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0

Phone extension based on inputmask-multi - DO NOT USE YET!!  in TEST
*/
$.extend($.inputmask.defaults.aliases, {
    'phone': {
        url: "phone-codes.json",
        mask: function (opts) {
            var maskList = [];
            $.ajax({
                url: opts.url,
                async: false,
                dataType: 'json',
                success: function (response) {
                    maskList = response;
                }
            });

            return maskList;
        }
    }
});


