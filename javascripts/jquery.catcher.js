/**
* @license Javascript Error Catcher plugin for jquery
* http://github.com/RobinHerbots/jquery.catcher
* Copyright (c) 2013 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 0.0.0
*/
(function ($) {
    if ($.catcher == undefined) {
        $.catcher = new function () {
            this.defaults = {
                onError: $.noop
            };

            var opts = this.defaults;
            this.wrap = function (fn, options) {
                if (fn == undefined) return false;

                opts = $.extend(true, {}, this.defaults, options);
                return _wrapper(fn);
            };

            return this;

            function _wrap(fn) {
                if (fn && fn["isWrapped"] === true) return fn;
                function wrappedFn() {
                    this.isWrapped = true;
                    try {
                        return fn.apply(this, arguments);
                    } catch (e) {
                        opts.onError.call(this, e);
                        return false;
                    }
                }

                return wrappedFn;
            }
            function _wrapper(obj) {
                for (var fname in obj) {
                    var fn = obj[fname];
                    if (fn["isWrapped"] !== true) {
                        switch (typeof (fn)) {
                            case 'object':
                            case 'array':
                                _wrapper(fn);
                                break;
                            case 'function':
                                obj[fname] = _wrap(fn);
                                break;
                        }
                    }
                }
                return obj;
            }
        }();
    }
}(jQuery));
