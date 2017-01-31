if (typeof define === "function" && define.amd)
	define(function () {
		return window;
	});
else if (typeof exports === "object")
	module.exports = window;
