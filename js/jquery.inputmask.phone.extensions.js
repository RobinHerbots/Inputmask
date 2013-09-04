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
            function masksSort(maskList, defs, match, key) {
                maskList.sort(function (a, b) {
                    var ia = 0, ib = 0;
                    for (; (ia < a[key].length && ib < b[key].length) ;) {
                        var cha = a[key].charAt(ia);
                        var chb = b[key].charAt(ib);
                        if (!match.test(cha)) {
                            ia++;
                            continue;
                        }
                        if (!match.test(chb)) {
                            ib++;
                            continue;
                        }
                        if ($.inArray(cha, defs) != -1 && $.inArray(chb, defs) == -1) {
                            return 1;
                        }
                        if ($.inArray(cha, defs) == -1 && $.inArray(chb, defs) != -1) {
                            return -1;
                        }
                        if ($.inArray(cha, defs) == -1 && $.inArray(chb, defs) == -1) {
                            if (cha != chb) {
                                return cha < chb ? -1 : 1;
                            }
                        }
                        ia++;
                        ib++;
                    }
                    for (; (ia < a[key].length || ib < b[key].length) ;) {
                        if (ia < a[key].length && !match.test(a[key].charAt(ia))) {
                            ia++;
                            continue;
                        }
                        if (ib < b[key].length && !match.test(b[key].charAt(ib))) {
                            ib++;
                            continue;
                        }
                        if (ia < a[key].length) {
                            return 1;
                        }
                        if (ib < b[key].length) {
                            return -1;
                        }
                    }
                    return 0;
                });
                return maskList;
            }

            var maskList = [];
            $.ajax({
                url: opts.url,
                async: false,
                dataType: 'json',
                success: function (response) {
                    maskList = response;
                }
            });

            return masksSort(maskList, ['#'], /[0-9]|#/, "mask");
        }
    }
});


