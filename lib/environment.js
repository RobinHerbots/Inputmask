import window from "./global/window";

const ua = (window.navigator && window.navigator.userAgent) || "",
	ie = (ua.indexOf("MSIE ") > 0) || (ua.indexOf("Trident/") > 0),
	mobile = (window.navigator && window.navigator.maxTouchPoints) || "ontouchstart" in window, //not entirely correct but will currently do
	iemobile = /iemobile/i.test(ua),
	iphone = /iphone/i.test(ua) && !iemobile;

export {ie, mobile, iemobile, iphone};
