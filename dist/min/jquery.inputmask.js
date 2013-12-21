/*
 Input Mask plugin for jquery
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 - 2013 Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 2.4.12
*/
(function(b){void 0===b.fn.inputmask&&(b.inputmask={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},escapeChar:"\\",mask:null,oncomplete:b.noop,onincomplete:b.noop,oncleared:b.noop,repeat:0,greedy:!0,autoUnmask:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},onKeyUp:b.noop,onKeyDown:b.noop,onUnMask:void 0,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:b.noop,skipOptionalPartCharacter:" ",
showTooltip:!1,numericInput:!1,isNumeric:!1,radixPoint:"",skipRadixDance:!1,rightAlignNumerics:!0,definitions:{9:{validator:"[0-9]",cardinality:1},a:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451]",cardinality:1},"*":{validator:"[A-Za-z\u0410-\u044f\u0401\u04510-9]",cardinality:1}},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,
NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],getMaskLength:function(b,H,F,A,y){y=b.length;H||("*"==F?y=A.length+1:1<F&&(y+=b.length*(F-1)));return y}},escapeRegex:function(b){return b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","gim"),"\\$1")}},b.fn.inputmask=function(w,
H){function F(a){var b=document.createElement("input");a="on"+a;var c=a in b;c||(b.setAttribute(a,"return;"),c="function"==typeof b[a]);return c}function A(e,d){var c=a.aliases[e];return c?(c.alias&&A(c.alias),b.extend(!0,a,c),b.extend(!0,a,d),!0):!1}function y(e){a.numericInput&&(e=e.split("").reverse().join(""));var d=!1,c=0,q=a.greedy,l=a.repeat;"*"==l&&(q=!1);1==e.length&&!1==q&&0!=l&&(a.placeholder="");e=b.map(e.split(""),function(b,k){var e=[];if(b==a.escapeChar)d=!0;else if(b!=a.optionalmarker.start&&
b!=a.optionalmarker.end||d){var g=a.definitions[b];if(g&&!d)for(var h=0;h<g.cardinality;h++)e.push(N(c+h));else e.push(b),d=!1;c+=e.length;return e}});for(var k=e.slice(),h=1;h<l&&q;h++)k=k.concat(e.slice());return{mask:k,repeat:l,greedy:q}}function O(e){a.numericInput&&(e=e.split("").reverse().join(""));var d=!1,c=!1,q=!1;return b.map(e.split(""),function(b,k){var e=[];if(b==a.escapeChar)c=!0;else{if(b!=a.optionalmarker.start||c){if(b!=a.optionalmarker.end||c){var G=a.definitions[b];if(G&&!c){for(var r=
G.prevalidator,f=r?r.length:0,g=1;g<G.cardinality;g++){var s=f>=g?r[g-1]:[],u=s.validator,s=s.cardinality;e.push({fn:u?"string"==typeof u?RegExp(u):new function(){this.test=u}:/./,cardinality:s?s:1,optionality:d,newBlockMarker:!0==d?q:!1,offset:0,casing:G.casing,def:G.definitionSymbol||b});!0==d&&(q=!1)}e.push({fn:G.validator?"string"==typeof G.validator?RegExp(G.validator):new function(){this.test=G.validator}:/./,cardinality:G.cardinality,optionality:d,newBlockMarker:q,offset:0,casing:G.casing,
def:G.definitionSymbol||b})}else e.push({fn:null,cardinality:0,optionality:d,newBlockMarker:q,offset:0,casing:null,def:b}),c=!1;q=!1;return e}d=!1}else d=!0;q=!0}})}function T(){function e(b){var c=b.length;for(i=0;i<c&&b.charAt(i)!=a.optionalmarker.start;i++);var e=[b.substring(0,i)];i<c&&e.push(b.substring(i+1,c));return e}function d(k,h,l){var r=0,f=0,g=h.length;for(i=0;i<g&&!(h.charAt(i)==a.optionalmarker.start&&r++,h.charAt(i)==a.optionalmarker.end&&f++,0<r&&r==f);i++);r=[h.substring(0,i)];i<
g&&r.push(h.substring(i+1,g));f=e(r[0]);1<f.length?(h=k+f[0]+(a.optionalmarker.start+f[1]+a.optionalmarker.end)+(1<r.length?r[1]:""),-1==b.inArray(h,q)&&""!=h&&(q.push(h),g=y(h),c.push({mask:h,_buffer:g.mask,buffer:g.mask.slice(),tests:O(h),lastValidPosition:-1,greedy:g.greedy,repeat:g.repeat,metadata:l})),h=k+f[0]+(1<r.length?r[1]:""),-1==b.inArray(h,q)&&""!=h&&(q.push(h),g=y(h),c.push({mask:h,_buffer:g.mask,buffer:g.mask.slice(),tests:O(h),lastValidPosition:-1,greedy:g.greedy,repeat:g.repeat,metadata:l})),
1<e(f[1]).length&&d(k+f[0],f[1]+r[1],l),1<r.length&&1<e(r[1]).length&&(d(k+f[0]+(a.optionalmarker.start+f[1]+a.optionalmarker.end),r[1],l),d(k+f[0],r[1],l))):(h=k+r,-1==b.inArray(h,q)&&""!=h&&(q.push(h),g=y(h),c.push({mask:h,_buffer:g.mask,buffer:g.mask.slice(),tests:O(h),lastValidPosition:-1,greedy:g.greedy,repeat:g.repeat,metadata:l})))}var c=[],q=[],l=[];b.isFunction(a.mask)&&(a.mask=a.mask.call(this,a));b.isArray(a.mask)?b.each(a.mask,function(a,b){void 0!=b.mask?d("",b.mask.toString(),b):d("",
b.toString())}):d("",a.mask.toString());(function(b){function c(){this.matches=[];this.isQuantifier=this.isOptional=this.isGroup=!1}var e=/(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[]()|\\]+|./g,d=new c,f,g=[];for(l=[];f=e.exec(b);)switch(f=f[0],f.charAt(0)){case a.optionalmarker.end:case a.groupmarker.end:f=g.pop();0<g.length?g[g.length-1].matches.push(f):(l.push(f),d=f);break;case a.optionalmarker.start:!d.isGroup&&0<d.matches.length&&l.push(d);d=new c;d.isOptional=!0;g.push(d);break;case a.groupmarker.start:!d.isGroup&&
0<d.matches.length&&l.push(d);d=new c;d.isGroup=!0;g.push(d);break;case a.quantifiermarker.start:var s=new c;s.isQuantifier=!0;s.matches.push(f);0<g.length?g[g.length-1].matches.push(s):d.matches.push(s);break;default:if(0<g.length)g[g.length-1].matches.push(f);else{if(d.isGroup||d.isOptional)d=new c;d.matches.push(f)}}0<d.matches.length&&l.push(d);return l})(a.mask);return a.greedy?c:c.sort(function(a,b){return a.mask.length-b.mask.length})}function N(b){return a.placeholder.charAt(b%a.placeholder.length)}
function E(e,d){function c(){return e[d]}function q(){return c().tests}function l(){return c()._buffer}function k(){return c().buffer}function h(n,p,z){function R(b,c,n,p){for(var d=f(b),e=n?1:0,U="",K=c.buffer,m=c.tests[d].cardinality;m>e;m--)U+=I(K,d-(m-1));n&&(U+=n);return null!=c.tests[d].fn?c.tests[d].fn.test(U,K,b,p,a):n==I(c._buffer,b,!0)||n==a.skipOptionalPartCharacter?{refresh:!0,c:I(c._buffer,b,!0),pos:b}:!1}if(z=!0===z){var l=R(n,c(),p,z);!0===l&&(l={pos:n});return l}var h=[],l=!1,q=d,
u=k().slice(),v=c().lastValidPosition;t(n);var x=[];b.each(e,function(a,b){if("object"==typeof b){d=a;var e=n,f=c().lastValidPosition,t;if(f==v){if(1<e-v)for(f=-1==f?0:f;f<e&&(t=R(f,c(),u[f],!0),!1!==t);f++)J(k(),f,u[f],!0),!0===t&&(t={pos:f}),t=t.pos||f,c().lastValidPosition<t&&(c().lastValidPosition=t);if(!r(e)&&!R(e,c(),p,z)){f=s(e)-e;for(t=0;t<f&&!1===R(++e,c(),p,z);t++);x.push(d)}}(c().lastValidPosition>=v||d==q)&&0<=e&&e<g()&&(l=R(e,c(),p,z),!1!==l&&(!0===l&&(l={pos:e}),t=l.pos||e,c().lastValidPosition<
t&&(c().lastValidPosition=t)),h.push({activeMasksetIndex:a,result:l}))}});d=q;return function(a,c){var d=!1;b.each(c,function(c,n){if(d=-1==b.inArray(n.activeMasksetIndex,a)&&!1!==n.result)return!1});if(d)c=b.map(c,function(c,n){if(-1==b.inArray(c.activeMasksetIndex,a))return c;e[c.activeMasksetIndex].lastValidPosition=v});else{var z=-1,g=-1;b.each(c,function(c,n){-1!=b.inArray(n.activeMasksetIndex,a)&&!1!==n.result&(-1==z||z>n.result.pos)&&(z=n.result.pos,g=n.activeMasksetIndex)});c=b.map(c,function(c,
U){if(-1!=b.inArray(c.activeMasksetIndex,a)){if(c.result.pos==z)return c;if(!1!==c.result){for(var K=n;K<z;K++)if(rsltValid=R(K,e[c.activeMasksetIndex],e[g].buffer[K],!0),!1===rsltValid){e[c.activeMasksetIndex].lastValidPosition=z-1;break}else J(e[c.activeMasksetIndex].buffer,K,e[g].buffer[K],!0),e[c.activeMasksetIndex].lastValidPosition=K;rsltValid=R(z,e[c.activeMasksetIndex],p,!0);!1!==rsltValid&&(J(e[c.activeMasksetIndex].buffer,z,p,!0),e[c.activeMasksetIndex].lastValidPosition=z);return c}}})}return c}(x,
h)}function u(){var a=d,p={activeMasksetIndex:0,lastValidPosition:-1,next:-1};b.each(e,function(a,b){"object"==typeof b&&(d=a,c().lastValidPosition>p.lastValidPosition?(p.activeMasksetIndex=a,p.lastValidPosition=c().lastValidPosition,p.next=s(c().lastValidPosition)):c().lastValidPosition==p.lastValidPosition&&(-1==p.next||p.next>s(c().lastValidPosition))&&(p.activeMasksetIndex=a,p.lastValidPosition=c().lastValidPosition,p.next=s(c().lastValidPosition)))});d=-1!=p.lastValidPosition&&e[a].lastValidPosition==
p.lastValidPosition?a:p.activeMasksetIndex;a!=d&&(w(k(),s(p.lastValidPosition),g()),c().writeOutBuffer=!0);v.data("_inputmask").activeMasksetIndex=d}function r(a){a=f(a);a=q()[a];return void 0!=a?a.fn:!1}function f(a){return a%q().length}function g(){return a.getMaskLength(l(),c().greedy,c().repeat,k(),a)}function s(a){var b=g();if(a>=b)return b;for(;++a<b&&!r(a););return a}function t(a){if(0>=a)return 0;for(;0<--a&&!r(a););return a}function J(a,b,c,e){e&&(b=y(a,b));e=q()[f(b)];var d=c;if(void 0!=
d&&void 0!=e)switch(e.casing){case "upper":d=c.toUpperCase();break;case "lower":d=c.toLowerCase()}a[b]=d}function I(a,b,c){c&&(b=y(a,b));return a[b]}function y(a,b){for(var c;void 0==a[b]&&a.length<g();)for(c=0;void 0!==l()[c];)a.push(l()[c++]);return b}function L(a,b,c){a._valueSet(b.join(""));void 0!=c&&x(a,c)}function w(a,b,c,e){for(var d=g();b<c&&b<d;b++)!0===e?r(b)||J(a,b,""):J(a,b,I(l().slice(),b,!0))}function B(a,b){var c=f(b);J(a,b,I(l(),c))}function A(a,k,f,h,r){h=void 0!=h?h.slice():F(a._valueGet()).split("");
b.each(e,function(a,b){"object"==typeof b&&(b.buffer=b._buffer.slice(),b.lastValidPosition=-1,b.p=-1)});!0!==f&&(d=0);k&&a._valueSet("");g();b.each(h,function(e,d){if(!0===r){var g=c().p,g=-1==g?g:t(g),h=-1==g?e:s(g);-1==b.inArray(d,l().slice(g+1,h))&&b(a).trigger("_keypress",[!0,d.charCodeAt(0),k,f,e])}else b(a).trigger("_keypress",[!0,d.charCodeAt(0),k,f,e])});!0===f&&-1!=c().p&&(c().lastValidPosition=t(c().p))}function H(a){return b.inputmask.escapeRegex.call(this,a)}function F(a){return a.replace(RegExp("("+
H(l().join(""))+")*$"),"")}function E(a){var b=k(),c=b.slice(),e,d;for(d=c.length-1;0<=d;d--)if(e=f(d),q()[e].optionality)if(r(d)&&h(d,b[d],!0))break;else c.pop();else break;L(a,c)}function O(c,d){if(!q()||!0!==d&&c.hasClass("hasDatepicker"))return c[0]._valueGet();var e=b.map(k(),function(a,b){return r(b)&&h(b,a,!0)?a:null}),e=(C?e.reverse():e).join("");return void 0!=a.onUnMask?a.onUnMask.call(this,k().join(""),e):e}function P(b){!C||"number"!=typeof b||a.greedy&&""==a.placeholder||(b=k().length-
b);return b}function x(c,d,e){var g=c.jquery&&0<c.length?c[0]:c;if("number"==typeof d)d=P(d),e=P(e),b(c).is(":visible")&&(e="number"==typeof e?e:d,g.scrollLeft=g.scrollWidth,!1==a.insertMode&&d==e&&e++,g.setSelectionRange?(g.selectionStart=d,g.selectionEnd=Y?d:e):g.createTextRange&&(c=g.createTextRange(),c.collapse(!0),c.moveEnd("character",e),c.moveStart("character",d),c.select()));else{if(!b(c).is(":visible"))return{begin:0,end:0};g.setSelectionRange?(d=g.selectionStart,e=g.selectionEnd):document.selection&&
document.selection.createRange&&(c=document.selection.createRange(),d=0-c.duplicate().moveStart("character",-1E5),e=d+c.text.length);d=P(d);e=P(e);return{begin:d,end:e}}}function W(c){if("*"!=a.repeat){var k=!1,h=0,s=d;b.each(e,function(a,b){if("object"==typeof b){d=a;var e=t(g());if(b.lastValidPosition>=h&&b.lastValidPosition==e){for(var s=!0,q=0;q<=e;q++){var u=r(q),v=f(q);if(u&&(void 0==c[q]||c[q]==N(q))||!u&&c[q]!=l()[v]){s=!1;break}}if(k=k||s)return!1}h=b.lastValidPosition}});d=s;return k}}var C=
!1,Q=k().join(""),v,T;this.unmaskedvalue=function(a,b){C=a.data("_inputmask").isRTL;return O(a,b)};this.isComplete=function(a){return W(a)};this.mask=function(n){function p(a){a=b._data(a).events;b.each(a,function(a,c){b.each(c,function(a,b){if("inputmask"==b.namespace&&"setvalue"!=b.type&&"_keypress"!=b.type){var c=b.handler;b.handler=function(a){if(this.readOnly||this.disabled)a.preventDefault;else return c.apply(this,arguments)}}})})}function z(a){var c;Object.getOwnPropertyDescriptor&&(c=Object.getOwnPropertyDescriptor(a,
"value"));if(c&&c.get){if(!a._valueGet){var e=c.get,d=c.set;a._valueGet=function(){return C?e.call(this).split("").reverse().join(""):e.call(this)};a._valueSet=function(a){d.call(this,C?a.split("").reverse().join(""):a)};Object.defineProperty(a,"value",{get:function(){var a=b(this),c=b(this).data("_inputmask"),d=c.masksets,g=c.activeMasksetIndex;return c&&c.opts.autoUnmask?a.inputmask("unmaskedvalue"):e.call(this)!=d[g]._buffer.join("")?e.call(this):""},set:function(a){d.call(this,a);b(this).triggerHandler("setvalue.inputmask")}})}}else if(document.__lookupGetter__&&
a.__lookupGetter__("value"))a._valueGet||(e=a.__lookupGetter__("value"),d=a.__lookupSetter__("value"),a._valueGet=function(){return C?e.call(this).split("").reverse().join(""):e.call(this)},a._valueSet=function(a){d.call(this,C?a.split("").reverse().join(""):a)},a.__defineGetter__("value",function(){var a=b(this),c=b(this).data("_inputmask"),d=c.masksets,g=c.activeMasksetIndex;return c&&c.opts.autoUnmask?a.inputmask("unmaskedvalue"):e.call(this)!=d[g]._buffer.join("")?e.call(this):""}),a.__defineSetter__("value",
function(a){d.call(this,a);b(this).triggerHandler("setvalue.inputmask")}));else if(a._valueGet||(a._valueGet=function(){return C?this.value.split("").reverse().join(""):this.value},a._valueSet=function(a){this.value=C?a.split("").reverse().join(""):a}),void 0==b.valHooks.text||!0!=b.valHooks.text.inputmaskpatch)e=b.valHooks.text&&b.valHooks.text.get?b.valHooks.text.get:function(a){return a.value},d=b.valHooks.text&&b.valHooks.text.set?b.valHooks.text.set:function(a,b){a.value=b;return a},jQuery.extend(b.valHooks,
{text:{get:function(a){var c=b(a);if(c.data("_inputmask")){if(c.data("_inputmask").opts.autoUnmask)return c.inputmask("unmaskedvalue");a=e(a);c=c.data("_inputmask");return a!=c.masksets[c.activeMasksetIndex]._buffer.join("")?a:""}return e(a)},set:function(a,c){var e=b(a),g=d(a,c);e.data("_inputmask")&&e.triggerHandler("setvalue.inputmask");return g},inputmaskpatch:!0}})}function y(a,b,e,d){var M=k();if(!1!==d)for(;!r(a)&&0<=a-1;)a--;for(d=a;d<b&&d<g();d++)if(r(d)){B(M,d);var n=s(d),u=I(M,n);if(u!=
N(n))if(n<g()&&!1!==h(d,u,!0)&&q()[f(d)].def==q()[f(n)].def)J(M,d,u,!0);else if(r(d))break}else B(M,d);void 0!=e&&J(M,t(b),e);if(!1==c().greedy){b=F(M.join("")).split("");M.length=b.length;d=0;for(e=M.length;d<e;d++)M[d]=b[d];0==M.length&&(c().buffer=l().slice())}return a}function H(a,b,d){var e=k();if(I(e,a,!0)!=N(a))for(var g=t(b);g>a&&0<=g;g--)if(r(g)){var n=t(g),s=I(e,n);s!=N(n)&&!1!==h(n,s,!0)&&q()[f(g)].def==q()[f(n)].def&&(J(e,g,s,!0),B(e,n))}else B(e,g);void 0!=d&&I(e,a)==N(a)&&J(e,a,d);a=
e.length;if(!1==c().greedy){d=F(e.join("")).split("");e.length=d.length;g=0;for(n=e.length;g<n;g++)e[g]=d[g];0==e.length&&(c().buffer=l().slice())}return b-(a-e.length)}function O(b,d,m){if(a.numericInput||C){switch(d){case a.keyCode.BACKSPACE:d=a.keyCode.DELETE;break;case a.keyCode.DELETE:d=a.keyCode.BACKSPACE}if(C){var f=m.end;m.end=m.begin;m.begin=f}}f=!0;m.begin==m.end?(f=d==a.keyCode.BACKSPACE?m.begin-1:m.begin,a.isNumeric&&""!=a.radixPoint&&k()[f]==a.radixPoint&&(m.begin=k().length-1==f?m.begin:
d==a.keyCode.BACKSPACE?f:s(f),m.end=m.begin),f=!1,d==a.keyCode.BACKSPACE?m.begin--:d==a.keyCode.DELETE&&m.end++):1!=m.end-m.begin||a.insertMode||(f=!1,d==a.keyCode.BACKSPACE&&m.begin--);w(k(),m.begin,m.end);var h=g();if(!1==a.greedy)y(m.begin,h,void 0,!C&&d==a.keyCode.BACKSPACE&&!f);else{for(var l=m.begin,n=m.begin;n<m.end;n++)if(r(n)||!f)l=y(m.begin,h,void 0,!C&&d==a.keyCode.BACKSPACE&&!f);f||(m.begin=l)}d=s(-1);w(k(),m.begin,m.end,!0);A(b,!1,void 0==e[1]||d>=m.end,k());c().lastValidPosition<d?(c().lastValidPosition=
-1,c().p=d):c().p=m.begin}function ba(d){X=!1;var e=this,m=b(e),f=d.keyCode,h=x(e);f==a.keyCode.BACKSPACE||f==a.keyCode.DELETE||ea&&127==f||d.ctrlKey&&88==f?(d.preventDefault(),88==f&&(Q=k().join("")),O(e,f,h),u(),L(e,k(),c().p),e._valueGet()==l().join("")&&m.trigger("cleared"),a.showTooltip&&m.prop("title",c().mask)):f==a.keyCode.END||f==a.keyCode.PAGE_DOWN?setTimeout(function(){var b=s(c().lastValidPosition);a.insertMode||b!=g()||d.shiftKey||b--;x(e,d.shiftKey?h.begin:b,b)},0):f==a.keyCode.HOME&&
!d.shiftKey||f==a.keyCode.PAGE_UP?x(e,0,d.shiftKey?h.begin:0):f==a.keyCode.ESCAPE||90==f&&d.ctrlKey?(A(e,!0,!1,Q.split("")),m.click()):f!=a.keyCode.INSERT||d.shiftKey||d.ctrlKey?!1!=a.insertMode||d.shiftKey||(f==a.keyCode.RIGHT?setTimeout(function(){var a=x(e);x(e,a.begin)},0):f==a.keyCode.LEFT&&setTimeout(function(){var a=x(e);x(e,a.begin-1)},0)):(a.insertMode=!a.insertMode,x(e,a.insertMode||h.begin!=g()?h.begin:h.begin-1));m=x(e);!0===a.onKeyDown.call(this,d,k(),a)&&x(e,m.begin,m.end);Z=-1!=b.inArray(f,
a.ignorables)}function ca(f,l,m,n,q,r){if(void 0==m&&X)return!1;X=!0;var v=b(this);f=f||window.event;m=m||f.which||f.charCode||f.keyCode;if((!f.ctrlKey||!f.altKey)&&(f.ctrlKey||f.metaKey||Z)&&!0!==l)return!0;if(m){!0!==l&&46==m&&!1==f.shiftKey&&","==a.radixPoint&&(m=44);var p,z,y=String.fromCharCode(m);l?(m=q?r:c().lastValidPosition+1,p={begin:m,end:m}):p=x(this);r=C?1<p.begin-p.end||1==p.begin-p.end&&a.insertMode:1<p.end-p.begin||1==p.end-p.begin&&a.insertMode;var A=d;r&&(d=A,b.each(e,function(a,
b){"object"==typeof b&&(d=a,c().undoBuffer=k().join(""))}),O(this,a.keyCode.DELETE,p),a.insertMode||b.each(e,function(a,b){"object"==typeof b&&(d=a,H(p.begin,g()),c().lastValidPosition=s(c().lastValidPosition))}),d=A);var B=k().join("").indexOf(a.radixPoint);a.isNumeric&&!0!==l&&-1!=B&&(a.greedy&&p.begin<=B?(p.begin=t(p.begin),p.end=p.begin):y==a.radixPoint&&(p.begin=B,p.end=p.begin));var D=p.begin;m=h(D,y,q);!0===q&&(m=[{activeMasksetIndex:d,result:m}]);var w=-1;b.each(m,function(b,e){d=e.activeMasksetIndex;
c().writeOutBuffer=!0;var f=e.result;if(!1!==f){var m=!1,h=k();!0!==f&&(m=f.refresh,D=void 0!=f.pos?f.pos:D,y=void 0!=f.c?f.c:y);if(!0!==m){if(!0==a.insertMode){f=g();for(h=h.slice();I(h,f,!0)!=N(f)&&f>=D;)f=0==f?-1:t(f);f>=D?(H(D,g(),y),h=c().lastValidPosition,f=s(h),f!=g()&&h>=D&&I(k(),f,!0)!=N(f)&&(c().lastValidPosition=f)):c().writeOutBuffer=!1}else J(h,D,y,!0);if(-1==w||w>s(D))w=s(D)}else!q&&(h=D<g()?D+1:D,-1==w||w>h)&&(w=h);w>c().p&&(c().p=w)}});!0!==q&&(d=A,u());if(!1!==n&&(b.each(m,function(a,
b){if(b.activeMasksetIndex==d)return z=b,!1}),void 0!=z)){var F=this;setTimeout(function(){a.onKeyValidation.call(F,z.result,a)},0);if(c().writeOutBuffer&&!1!==z.result){var E=k();n=l?void 0:a.numericInput?D>B?t(w):y==a.radixPoint?w-1:t(w-1):w;L(this,E,n);!0!==l&&setTimeout(function(){!0===W(E)&&v.trigger("complete");V=!0;v.trigger("input")},0)}else r&&(c().buffer=c().undoBuffer.split(""))}a.showTooltip&&v.prop("title",c().mask);f.preventDefault()}}function Y(c){var d=b(this),e=c.keyCode,f=k();da&&
e==a.keyCode.BACKSPACE&&T==this._valueGet()&&ba.call(this,c);a.onKeyUp.call(this,c,f,a);e==a.keyCode.TAB&&a.showMaskOnFocus&&(d.hasClass("focus.inputmask")&&0==this._valueGet().length?(f=l().slice(),L(this,f),x(this,0),Q=k().join("")):(L(this,f),f.join("")==l().join("")&&-1!=b.inArray(a.radixPoint,f)?(x(this,P(0)),d.click()):x(this,P(0),P(g()))))}v=b(n);if(v.is(":input")){v.data("_inputmask",{masksets:e,activeMasksetIndex:d,opts:a,isRTL:!1});a.showTooltip&&v.prop("title",c().mask);c().greedy=c().greedy?
c().greedy:0==c().repeat;if(null!=v.attr("maxLength")){var S=v.prop("maxLength");-1<S&&b.each(e,function(a,b){"object"==typeof b&&"*"==b.repeat&&(b.repeat=S)});g()>=S&&-1<S&&(S<l().length&&(l().length=S),!1==c().greedy&&(c().repeat=Math.round(S/l().length)),v.prop("maxLength",2*g()))}z(n);var X=!1,V=!1,Z=!1;a.numericInput&&(a.isNumeric=a.numericInput);("rtl"==n.dir||a.numericInput&&a.rightAlignNumerics||a.isNumeric&&a.rightAlignNumerics)&&v.css("text-align","right");if("rtl"==n.dir||a.numericInput){n.dir=
"ltr";v.removeAttr("dir");var $=v.data("_inputmask");$.isRTL=!0;v.data("_inputmask",$);C=!0}v.unbind(".inputmask");v.removeClass("focus.inputmask");v.closest("form").bind("submit",function(){Q!=k().join("")&&v.change()}).bind("reset",function(){setTimeout(function(){v.trigger("setvalue")},0)});v.bind("mouseenter.inputmask",function(){!b(this).hasClass("focus.inputmask")&&a.showMaskOnHover&&this._valueGet()!=k().join("")&&L(this,k())}).bind("blur.inputmask",function(){var c=b(this),f=this._valueGet(),
g=k();c.removeClass("focus.inputmask");Q!=k().join("")&&c.change();a.clearMaskOnLostFocus&&""!=f&&(f==l().join("")?this._valueSet(""):E(this));!1===W(g)&&(c.trigger("incomplete"),a.clearIncomplete&&(b.each(e,function(a,b){"object"==typeof b&&(b.buffer=b._buffer.slice(),b.lastValidPosition=-1)}),d=0,a.clearMaskOnLostFocus?this._valueSet(""):(g=l().slice(),L(this,g))))}).bind("focus.inputmask",function(){var d=b(this),e=this._valueGet();a.showMaskOnFocus&&!d.hasClass("focus.inputmask")&&(!a.showMaskOnHover||
a.showMaskOnHover&&""==e)&&this._valueGet()!=k().join("")&&L(this,k(),s(c().lastValidPosition));d.addClass("focus.inputmask");Q=k().join("")}).bind("mouseleave.inputmask",function(){var c=b(this);a.clearMaskOnLostFocus&&(c.hasClass("focus.inputmask")||this._valueGet()==c.attr("placeholder")||(this._valueGet()==l().join("")||""==this._valueGet()?this._valueSet(""):E(this)))}).bind("click.inputmask",function(){var d=this;setTimeout(function(){var e=x(d),f=k();if(e.begin==e.end){var e=a.isRTL?P(e.begin):
e.begin,g=c().lastValidPosition,f=a.isNumeric?!1===a.skipRadixDance&&""!=a.radixPoint&&-1!=b.inArray(a.radixPoint,f)?a.numericInput?s(b.inArray(a.radixPoint,f)):b.inArray(a.radixPoint,f):s(g):s(g);e<f?r(e)?x(d,e):x(d,s(e)):x(d,f)}},0)}).bind("dblclick.inputmask",function(){var a=this;setTimeout(function(){x(a,0,s(c().lastValidPosition))},0)}).bind(fa+".inputmask dragdrop.inputmask drop.inputmask",function(a){if(!0===V)return V=!1,!0;var c=this,d=b(c);if("propertychange"==a.type&&c._valueGet().length<=
g())return!0;setTimeout(function(){d.trigger("preprocessafterpaste");A(c,!0,!1,void 0,!0);!0===W(k())&&d.trigger("complete");d.click()},0)}).bind("setvalue.inputmask",function(){A(this,!0);Q=k().join("");this._valueGet()==l().join("")&&this._valueSet("")}).bind("_keypress.inputmask",ca).bind("complete.inputmask",a.oncomplete).bind("incomplete.inputmask",a.onincomplete).bind("cleared.inputmask",a.oncleared).bind("keyup.inputmask",Y).bind("preprocessafterpaste.inputmask",a.preprocessAfterPaste);da?
v.bind("input.inputmask",function(a){if(!0===V)return V=!1,!0;a=b(this);T=k().join("");A(this,!1,!1);L(this,k());!0===W(k())&&a.trigger("complete");a.click()}):v.bind("keydown.inputmask",ba).bind("keypress.inputmask",ca);A(n,!0,!1);Q=k().join("");var aa;try{aa=document.activeElement}catch(ga){}aa===n?(v.addClass("focus.inputmask"),x(n,s(c().lastValidPosition))):a.clearMaskOnLostFocus?k().join("")==l().join("")?n._valueSet(""):E(n):L(n,k());p(n)}};return this}var a=b.extend(!0,{},b.inputmask.defaults,
H),B=null!==navigator.userAgent.match(/msie 10/i),ea=null!==navigator.userAgent.match(/iphone/i),Y=null!==navigator.userAgent.match(/android.*safari.*/i),da=null!==navigator.userAgent.match(/android.*chrome.*/i),fa=F("paste")&&!B?"paste":F("input")?"input":"propertychange",u,t=0;if("string"===typeof w)switch(w){case "mask":return A(a.alias,H),u=T(),0==u.length?this:this.each(function(){E(b.extend(!0,{},u),0).mask(this)});case "unmaskedvalue":return B=b(this),B.data("_inputmask")?(u=B.data("_inputmask").masksets,
t=B.data("_inputmask").activeMasksetIndex,a=B.data("_inputmask").opts,E(u,t).unmaskedvalue(B)):B.val();case "remove":return this.each(function(){var e=b(this);if(e.data("_inputmask")){u=e.data("_inputmask").masksets;t=e.data("_inputmask").activeMasksetIndex;a=e.data("_inputmask").opts;this._valueSet(E(u,t).unmaskedvalue(e,!0));e.removeData("_inputmask");e.unbind(".inputmask");e.removeClass("focus.inputmask");var d;Object.getOwnPropertyDescriptor&&(d=Object.getOwnPropertyDescriptor(this,"value"));
d&&d.get?this._valueGet&&Object.defineProperty(this,"value",{get:this._valueGet,set:this._valueSet}):document.__lookupGetter__&&this.__lookupGetter__("value")&&this._valueGet&&(this.__defineGetter__("value",this._valueGet),this.__defineSetter__("value",this._valueSet));try{delete this._valueGet,delete this._valueSet}catch(c){this._valueSet=this._valueGet=void 0}}});case "getemptymask":return this.data("_inputmask")?(u=this.data("_inputmask").masksets,t=this.data("_inputmask").activeMasksetIndex,u[t]._buffer.join("")):
"";case "hasMaskedValue":return this.data("_inputmask")?!this.data("_inputmask").opts.autoUnmask:!1;case "isComplete":return u=this.data("_inputmask").masksets,t=this.data("_inputmask").activeMasksetIndex,a=this.data("_inputmask").opts,E(u,t).isComplete(this[0]._valueGet().split(""));case "getmetadata":if(this.data("_inputmask"))return u=this.data("_inputmask").masksets,t=this.data("_inputmask").activeMasksetIndex,u[t].metadata;return;default:return A(w,H)||(a.mask=w),u=T(),0==u.length?this:this.each(function(){E(b.extend(!0,
{},u),t).mask(this)})}else{if("object"==typeof w)return a=b.extend(!0,{},b.inputmask.defaults,w),A(a.alias,w),u=T(),0==u.length?this:this.each(function(){E(b.extend(!0,{},u),t).mask(this)});if(void 0==w)return this.each(function(){var e=b(this).attr("data-inputmask");if(e&&""!=e)try{var e=e.replace(RegExp("'","g"),'"'),d=b.parseJSON("{"+e+"}");b.extend(!0,d,H);a=b.extend(!0,{},b.inputmask.defaults,d);A(a.alias,d);a.alias=void 0;b(this).inputmask(a)}catch(c){}})}return this})})(jQuery);
