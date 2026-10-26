import window, { canUseDOM } from "../core/window";

const nav = canUseDOM ? window.navigator || {} : {},
  ua = canUseDOM ? nav.userAgent || "" : "",
  mobile = (() => {
    if (!canUseDOM) {
      return false;
    }
    try {
      const coarsePointer =
        typeof window.matchMedia === "function"
          ? window.matchMedia("(pointer:coarse)").matches
          : false;
      return !!(
        nav.userAgentData?.mobile ??
        (((coarsePointer || nav.maxTouchPoints) &&
          (window.innerWidth || 0) <= 1024) ||
          /Mobi|Android|iPhone/i.test(ua))
      );
    } catch (e) {
      return /Mobi|Android|iPhone/i.test(ua);
    }
  })(),
  iphone = canUseDOM ? /iphone/i.test(ua) : false;

export { mobile, iphone };
