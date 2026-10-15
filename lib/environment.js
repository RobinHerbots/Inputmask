import window from "./global/window";

const nav = window.navigator || {},
  ua = nav.userAgent || "",
  mobile = (() => {
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
  iphone = /iphone/i.test(ua);

export { mobile, iphone };
