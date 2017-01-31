if (typeof define === "function" && define.amd)
	define(function () {
		return document;
	});
else if (typeof exports === "object")
	module.exports = document;
