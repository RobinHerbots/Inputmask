/*!
 * inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
import{dependencyLib as t,aliases as e}from"../inputmask.mjs";function n(e){return t.extend(!0,{mask:function({separator:t,quantifier:e}){const n="*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]";let r=n;if(t)for(let a=0;a<e;a++)r+=`[${t}${n}]`;return r},greedy:!1,casing:"lower",separator:null,quantifier:5,skipOptionalPartCharacter:"",onBeforePaste:function(t,e){return(t=t.toLowerCase()).replace("mailto:","")},definitions:{"*":{validator:"[0-9１-９A-Za-zА-яЁёÀ-ÿµ!#$%&'*+/=?^_`{|}~-]"},"-":{validator:"[0-9A-Za-z-]"}},onUnMask:function(t,e,n){return t},inputmode:"email"},e)}function r(){t.extend(!0,e,{email:n()})}export{n as email,r as registerEmail};
//# sourceMappingURL=email.mjs.map
