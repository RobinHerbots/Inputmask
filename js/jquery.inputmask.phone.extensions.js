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
            opts.definitions = {
                'p': {
                    validator: function () { return false; },
                    cardinality: 1
                },
                '#': {
                    validator: "[0-9]",
                    cardinality: 1
                }
            };
            var maskList = [];
            $.ajax({
                url: opts.url,
                async: false,
                dataType: 'json',
                success: function (response) {
                    maskList = response;
                }
            });

            maskList.splice(0, 0, "+p(ppp)ppp-pppp");
            return maskList;
        }
    }
});


