/*!
 * inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.37
 */
function t(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var e,n={};const a=t(function(){if(e)return n;if(e=1,void 0===FormData.Inputmask){class t extends FormData{constructor(t,e){super(t,e);const n=this.entries();let a;for(;!1===(a=n.next()).done;){const e=a.value[0],n=a.value[1],r=t[e];!r||void 0===r.inputmask||n instanceof File||this.set(e,r.value)}return this}}t.Inputmask=!0,FormData=t}return n}());export{a as default};
//# sourceMappingURL=FormData.mjs.map
