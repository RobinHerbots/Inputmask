import window from "./global/window";

const ua = (window.navigator && window.navigator.userAgent) || "",
    ie = (ua.indexOf("MSIE ") > 0) || (ua.indexOf("Trident/") > 0),
    mobile = (window.navigator && window.navigator.userAgentData && window.navigator.userAgentData.mobile) || (window.navigator && window.navigator.maxTouchPoints) || "ontouchstart" in window, //not entirely correct but will currently do
    iphone = /iphone/i.test(ua);

export {ie, mobile, iphone};
