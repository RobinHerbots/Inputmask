/*!
 * inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.36
 */
import{dependencyLib as t,getMaskTemplate as n,getLastValidPosition as i,aliases as o}from"../inputmask.mjs";function s(o){return t.extend(!0,{mask:"999-99-9999",postValidation:function(t,o,s,e,r,a,c){const u=n.call(this,!0,i.call(this),!0,!0);return/^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(u.join(""))}},o)}function e(){t.extend(!0,o,{ssn:s()})}export{e as registerSsn,s as ssn};
//# sourceMappingURL=ssn.mjs.map
