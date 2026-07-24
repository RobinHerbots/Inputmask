import window from "./global/window";

const ua = (window.navigator && window.navigator.userAgent) || "",
  ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0,
  mobile = !!(
    navigator.userAgentData?.mobile ??
    (((matchMedia("(pointer:coarse)").matches || navigator.maxTouchPoints) &&
      innerWidth <= 1024) ||
      /Mobi|Android|iPhone/i.test(ua))
  ),
  iphone = /iphone/i.test(ua);

export { ie, mobile, iphone };
