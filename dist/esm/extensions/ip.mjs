/*!
 * inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
import{dependencyLib as t,aliases as e}from"../inputmask.mjs";const r=/25[0-5]|2[0-4][0-9]|[01][0-9][0-9]/;function n(t,e,n,f,i){if(n-1>-1&&"."!==e.buffer[n-1]?(t=e.buffer[n-1]+t,t=n-2>-1&&"."!==e.buffer[n-2]?e.buffer[n-2]+t:"0"+t):t="00"+t,i.greedy&&parseInt(t)>255&&r.test("00"+t.charAt(2))){const r=[...e.buffer.slice(0,n),".",t.charAt(2)];if(r.join("").match(/\./g).length<4)return{refreshFromBuffer:!0,buffer:r,caret:n+2}}return r.test(t)}function f(e){return t.extend(!0,{mask:"i{1,3}.j{1,3}.k{1,3}.l{1,3}",definitions:{i:{validator:n},j:{validator:n},k:{validator:n},l:{validator:n}},onUnMask:function(t,e,r){return t},inputmode:"decimal",substitutes:{",":"."}},e)}function i(){t.extend(!0,e,{ip:f()})}export{f as ip,i as registerIp};
//# sourceMappingURL=ip.mjs.map
