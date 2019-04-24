if (typeof define === "function" && define.amd)
	define(function () {
		return typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;
	});
else if (typeof exports === "object")
	module.exports = typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;

