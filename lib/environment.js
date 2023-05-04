function getEnv() {
    if (typeof window === "undefined" || !window.navigator) {
        return {
            ie: false,
            mobile: false,
            iphone: false
        };
    }

    const ua = (window.navigator && window.navigator.userAgent) || "";
    const ie = (ua.indexOf("MSIE ") > 0) || (ua.indexOf("Trident/") > 0);
    const mobile = (window.navigator && window.navigator.userAgentData && window.navigator.userAgentData.mobile) || (window.navigator && window.navigator.maxTouchPoints) || "ontouchstart" in window;
    const iphone = /iphone/i.test(ua);

    return {
        ie,
        mobile,
        iphone
    };
}

const { ie, mobile, iphone } = getEnv();

export {
    ie,
    mobile,
    iphone
};
