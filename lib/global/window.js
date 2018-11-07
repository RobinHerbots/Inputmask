if (typeof define === "function" && define.amd)
    define(function () {
        return window || new (eval("require('jsdom')")('')).window;
    });
else if (typeof exports === "object")
    module.exports = window || new (eval("require('jsdom')")('')).window;

