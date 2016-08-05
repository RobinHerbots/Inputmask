/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2016 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.2-106
*/
/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 -	Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0-dev
 */
!function(a){function b(c,d){
//allow instanciating without new
//allow instanciating without new
//init options
//user passed options
return this instanceof b?(a.isPlainObject(c)?d=c:(d=d||{},d.alias=c),this.el=void 0,this.opts=a.extend(!0,{},this.defaults,d),this.noMasksCache=d&&void 0!==d.definitions,this.userOptions=d||{},this.events={},void e(this.opts.alias,d,this.opts)):new b(c,d)}
//helper functions
function c(a){var b=document.createElement("input"),c="on"+a,d=c in b;return d||(b.setAttribute(c,"return;"),d="function"==typeof b[c]),b=null,d}function d(b,c){var d=b.getAttribute("type"),e="INPUT"===b.tagName&&a.inArray(d,c.supportsInputType)!==-1||b.isContentEditable||"TEXTAREA"===b.tagName;if(!e&&"INPUT"===b.tagName){var f=document.createElement("input");f.setAttribute("type",d),e="text"===f.type,//apply mask only if the type is not natively supported
f=null}return e}function e(b,c,d){var f=d.aliases[b];//alias is another alias
//merge alias definition in the options
//alias not found - try as mask
return f?(f.alias&&e(f.alias,void 0,d),a.extend(!0,d,f),a.extend(!0,d,c),!0):(null===d.mask&&(d.mask=b),!1)}function f(b,c,d){function f(a,c){c=void 0!==c?c:b.getAttribute("data-inputmask-"+a),null!==c&&("string"==typeof c&&(0===a.indexOf("on")?c=window[c]:"false"===c?c=!1:"true"===c&&(c=!0)),d[a]=c)}var g,h,i,j,k=b.getAttribute("data-inputmask");
//resolve aliases
if(k&&""!==k&&(k=k.replace(new RegExp("'","g"),'"'),h=JSON.parse("{"+k+"}")),h){//pickup alias from data-inputmask
i=void 0;for(j in h)if("alias"===j.toLowerCase()){i=h[j];break}}f("alias",i),//pickup alias from data-inputmask-alias
d.alias&&e(d.alias,d,c);for(g in c){if(h){i=void 0;for(j in h)if(j.toLowerCase()===g.toLowerCase()){i=h[j];break}}f(g,i)}return a.extend(!0,c,d),c}function g(c,d){function e(b){function d(a,b,c,d){this.matches=[],this.isGroup=a||!1,this.isOptional=b||!1,this.isQuantifier=c||!1,this.isAlternator=d||!1,this.quantifier={min:1,max:1}}
//test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
function e(b,d,e){var f=c.definitions[d];e=void 0!==e?e:b.matches.length;var g=b.matches[e-1];if(f&&!r){f.placeholder=a.isFunction(f.placeholder)?f.placeholder(c):f.placeholder;
//handle prevalidators
for(var h=f.prevalidator,i=h?h.length:0,j=1;j<f.cardinality;j++){var k=i>=j?h[j-1]:[],l=k.validator,m=k.cardinality;b.matches.splice(e++,0,{fn:l?"string"==typeof l?new RegExp(l):new function(){this.test=l}:new RegExp("."),cardinality:m?m:1,optionality:b.isOptional,newBlockMarker:void 0===g||g.def!==(f.definitionSymbol||d),casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,mask:d}),g=b.matches[e-1]}b.matches.splice(e++,0,{fn:f.validator?"string"==typeof f.validator?new RegExp(f.validator):new function(){this.test=f.validator}:new RegExp("."),cardinality:f.cardinality,optionality:b.isOptional,newBlockMarker:void 0===g||g.def!==(f.definitionSymbol||d),casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,mask:d})}else b.matches.splice(e++,0,{fn:null,cardinality:0,optionality:b.isOptional,newBlockMarker:void 0===g||g.def!==d,casing:null,def:c.staticDefinitionSymbol||d,placeholder:void 0!==c.staticDefinitionSymbol?d:void 0,mask:d}),r=!1}function f(a,b){a.isGroup&&(//this is not a group but a normal mask => convert
a.isGroup=!1,e(a,c.groupmarker.start,0),b!==!0&&e(a,c.groupmarker.end))}function g(a,b,c,d){b.matches.length>0&&(void 0===d||d)&&(c=b.matches[b.matches.length-1],f(c)),e(b,a)}function h(){if(t.length>0){if(m=t[t.length-1],g(k,m,o,!m.isAlternator),m.isAlternator){//handle alternator a | b case
n=t.pop();for(var a=0;a<n.matches.length;a++)n.matches[a].isGroup=!1;t.length>0?(m=t[t.length-1],m.matches.push(n)):s.matches.push(n)}}else g(k,s,o)}function i(a){function b(a){return a===c.optionalmarker.start?a=c.optionalmarker.end:a===c.optionalmarker.end?a=c.optionalmarker.start:a===c.groupmarker.start?a=c.groupmarker.end:a===c.groupmarker.end&&(a=c.groupmarker.start),a}a.matches=a.matches.reverse();for(var d in a.matches){var e=parseInt(d);if(a.matches[d].isQuantifier&&a.matches[e+1]&&a.matches[e+1].isGroup){//reposition quantifier
var f=a.matches[d];a.matches.splice(d,1),a.matches.splice(e+1,0,f)}void 0!==a.matches[d].matches?a.matches[d]=i(a.matches[d]):a.matches[d]=b(a.matches[d])}return a}for(var j,k,l,m,n,o,p,q=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,r=!1,s=new d,t=[],u=[];j=q.exec(b);)if(k=j[0],r)h();else switch(k.charAt(0)){case c.escapeChar:r=!0;break;case c.optionalmarker.end:
// optional closing
case c.groupmarker.end:if(
// Group closing
l=t.pop(),void 0!==l)if(t.length>0){if(m=t[t.length-1],m.matches.push(l),m.isAlternator){//handle alternator (a) | (b) case
n=t.pop();for(var v=0;v<n.matches.length;v++)n.matches[v].isGroup=!1;t.length>0?(m=t[t.length-1],m.matches.push(n)):s.matches.push(n)}}else s.matches.push(l);else h();break;case c.optionalmarker.start:
// optional opening
t.push(new d((!1),(!0)));break;case c.groupmarker.start:
// Group opening
t.push(new d((!0)));break;case c.quantifiermarker.start:
//Quantifier
var w=new d((!1),(!1),(!0));k=k.replace(/[{}]/g,"");var x=k.split(","),y=isNaN(x[0])?x[0]:parseInt(x[0]),z=1===x.length?y:isNaN(x[1])?x[1]:parseInt(x[1]);if("*"!==z&&"+"!==z||(y="*"===z?0:1),w.quantifier={min:y,max:z},t.length>0){var A=t[t.length-1].matches;j=A.pop(),j.isGroup||(p=new d((!0)),p.matches.push(j),j=p),A.push(j),A.push(w)}else j=s.matches.pop(),j.isGroup||(p=new d((!0)),p.matches.push(j),j=p),s.matches.push(j),s.matches.push(w);break;case c.alternatormarker:t.length>0?(m=t[t.length-1],o=m.matches.pop()):o=s.matches.pop(),o.isAlternator?t.push(o):(n=new d((!1),(!1),(!1),(!0)),n.matches.push(o),t.push(n));break;default:h()}for(;t.length>0;)l=t.pop(),f(l,!0),s.matches.push(l);
// console.log(JSON.stringify(maskTokens));
return s.matches.length>0&&(o=s.matches[s.matches.length-1],f(o),u.push(s)),c.numericInput&&i(u[0]),u}function f(f,g){if(null!==f&&""!==f){//hide placeholder with single non-greedy mask
if(1===f.length&&c.greedy===!1&&0!==c.repeat&&(c.placeholder=""),c.repeat>0||"*"===c.repeat||"+"===c.repeat){var h="*"===c.repeat?0:"+"===c.repeat?1:c.repeat;f=c.groupmarker.start+f+c.groupmarker.end+c.quantifiermarker.start+h+","+c.repeat+c.quantifiermarker.end}
// console.log(mask);
var i;return void 0===b.prototype.masksCache[f]||d===!0?(i={mask:f,maskToken:e(f),validPositions:{},_buffer:void 0,buffer:void 0,tests:{},metadata:g,maskLength:void 0},d!==!0&&(b.prototype.masksCache[c.numericInput?f.split("").reverse().join(""):f]=i,i=a.extend(!0,{},b.prototype.masksCache[c.numericInput?f.split("").reverse().join(""):f]))):i=a.extend(!0,{},b.prototype.masksCache[c.numericInput?f.split("").reverse().join(""):f]),i}}function g(a){
// if (opts.numericInput) {
// 	mask = mask.split('').reverse();
// 	mask = mask.join('');
// }
return a=a.toString()}var h;if(a.isFunction(c.mask)&&(//allow mask to be a preprocessing fn - should return a valid mask
c.mask=c.mask(c)),a.isArray(c.mask)){if(c.mask.length>1){c.keepStatic=null===c.keepStatic||c.keepStatic;//enable by default when passing multiple masks when the option is not explicitly specified
var i="(";return a.each(c.numericInput?c.mask.reverse():c.mask,function(b,c){i.length>1&&(i+=")|("),i+=g(void 0===c.mask||a.isFunction(c.mask)?c:c.mask)}),i+=")",f(i,c.mask)}c.mask=c.mask.pop()}return c.mask&&(h=void 0===c.mask.mask||a.isFunction(c.mask.mask)?f(g(c.mask),c.mask):f(g(c.mask.mask),c.mask)),h}
//android = /android.*safari.*/i.test(ua) && !iemobile;
//masking scope
//actionObj definition see below
function h(e,f,g){
//maskset helperfunctions
function i(a,b,c){b=b||0;var d,e,f,h=[],i=0,j=o();ha=void 0!==fa?fa.maxLength:void 0,ha===-1&&(ha=void 0);do{if(a===!0&&m().validPositions[i]){var k=m().validPositions[i];e=k.match,d=k.locator.slice(),h.push(c===!0?k.input:I(i,e))}else f=s(i,d,i-1),e=f.match,d=f.locator.slice(),(g.jitMasking===!1||i<j||isFinite(g.jitMasking)&&g.jitMasking>i)&&h.push(I(i,e));i++}while((void 0===ha||i<ha)&&(null!==e.fn||""!==e.def)||b>i);return""===h[h.length-1]&&h.pop(),m().maskLength=i+1,h}function m(){return f}function n(a){var b=m();b.buffer=void 0,a!==!0&&(b._buffer=void 0,b.validPositions={},b.p=0)}function o(a,b,c){var d=-1,e=-1,f=c||m().validPositions;//for use in valhook ~ context switch
void 0===a&&(a=-1);for(var g in f){var h=parseInt(g);f[h]&&(b||null!==f[h].match.fn)&&(h<=a&&(d=h),h>=a&&(e=h))}return d!==-1&&a-d>1||e<a?d:e}function p(b,c,d,e){if(e||g.insertMode&&void 0!==m().validPositions[b]&&void 0===d){
//reposition & revalidate others
var f,h=a.extend(!0,{},m().validPositions),i=o();for(f=b;f<=i;f++)//clear selection
delete m().validPositions[f];m().validPositions[b]=a.extend(!0,{},c);var j,k=!0,l=m().validPositions,p=!1;for(f=j=b;f<=i;f++){var q=h[f];if(void 0!==q)for(var r=j,s=-1;r<m().maskLength&&(null==q.match.fn&&l[f]&&(l[f].match.optionalQuantifier===!0||l[f].match.optionality===!0)||null!=q.match.fn);){
//} else posMatch = seekNext(j);
if(
//determine next position
//if (t.match.fn === null || (!opts.keepStatic && vps[i] && (vps[i + 1] !== undefined && getTests(i + 1, vps[i].locator.slice(), i).length > 1 || vps[i].alternation !== undefined))) {
r++,p===!1&&h[r]&&h[r].match.def===q.match.def){//obvious match
m().validPositions[r]=a.extend(!0,{},h[r]),m().validPositions[r].input=q.input,j=r,k=!0;break}if(u(r,q.match.def)){//validated match
var t=C(r,q.input,!0,!0);if(k=t!==!1,j=t.caret||t.insert?o():r,p=!0,k)break}else{if(k=null==q.match.fn,s===r)break;//prevent endless loop
s=r}}if(!k)break}if(!k)return m().validPositions=a.extend(!0,{},h),n(!0),!1}else m().validPositions[b]=a.extend(!0,{},c);return n(!0),!0}function q(b,c,d,e){function f(a){var b=m().validPositions[a];if(void 0!==b&&null===b.match.fn){var c=m().validPositions[a-1],d=m().validPositions[a+1];return void 0!==c&&void 0!==d}return!1}var h,i=b,j=a.extend(!0,{},m().validPositions),k=!1;//needed for alternated position after overtype selection
for(m().p=b,h=c-1;h>=i;h--)//clear selection
void 0!==m().validPositions[h]&&(d===!0||!f(h)&&g.canClearPosition(m(),h,o(),e,g)!==!1)&&delete m().validPositions[h];for(
//clear buffer
n(!0),h=i+1;h<=o();){for(;void 0!==m().validPositions[i];)i++;var l=m().validPositions[i];
// while (getMaskSet().validPositions[i] == undefined) i++;
if(h<i&&(h=i+1),void 0===m().validPositions[h]&&D(h)||void 0!==l)h++;else{var p=s(h);k===!1&&j[i]&&j[i].match.def===p.match.def?(//obvious match
m().validPositions[i]=a.extend(!0,{},j[i]),m().validPositions[i].input=p.input,delete m().validPositions[h],h++):u(i,p.match.def)?C(i,p.input||I(h),!0)!==!1&&(delete m().validPositions[h],h++,k=!0):D(h)||(h++,i--),i++}}n(!0)}function r(a,b){for(var c,d=a,e=o(),f=m().validPositions[e]||w(0)[0],h=void 0!==f.alternation?f.locator[f.alternation].toString().split(","):[],i=0;i<d.length&&(c=d[i],!c.match||(!g.greedy&&!b||c.match.optionalQuantifier===!0)&&(c.match.optionality!==!1&&c.match.newBlockMarker!==!1||c.match.optionalQuantifier===!0)||!(void 0===f.alternation||f.alternation!==c.alternation||void 0!==c.locator[f.alternation]&&B(c.locator[f.alternation].toString().split(","),h)));i++);return c}function s(a,b,c){return m().validPositions[a]||r(w(a,b?b.slice():b,c))}function t(a){return m().validPositions[a]?m().validPositions[a]:w(a)[0]}function u(a,b){for(var c=!1,d=w(a),e=0;e<d.length;e++)if(d[e].match&&d[e].match.def===b){c=!0;break}return c}function v(b,c){var d,e;return(m().tests[b]||m().validPositions[b])&&a.each(m().tests[b]||[m().validPositions[b]],function(a,b){var f=b.alternation?b.locator[b.alternation].toString().indexOf(c):-1;(void 0===e||f<e)&&f!==-1&&(d=b,e=f)}),d}function w(b,c,d){function e(c,d,f,h){//ndxInitializer contains a set of indexes to speedup searches in the mtokens
function j(f,h,l){function q(b,c){var d=0===a.inArray(b,c.matches);return d||a.each(c.matches,function(a,e){if(e.isQuantifier===!0&&(d=q(b,c.matches[a-1])))return!1}),d}function r(a,b){var c=v(a,b);return c?c.locator.slice(c.alternation+1):void 0}function s(a,c){return null===a.match.fn&&null!==c.match.fn&&c.match.fn.test(a.match.def,m(),b,!1,g,!1)}if(k>1e4)throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+m().mask;if(k===b&&void 0===f.matches)return n.push({match:f,locator:h.reverse(),cd:p}),!0;if(void 0!==f.matches){if(f.isGroup&&l!==f){if(//when a group pass along to the quantifier
f=j(c.matches[a.inArray(f,c.matches)+1],h))return!0}else if(f.isOptional){var t=f;if(f=e(f,d,h,l)){if(i=n[n.length-1].match,!q(i,t))return!0;o=!0,//insert a stop
k=b}}else if(f.isAlternator){var u,w=f,x=[],y=n.slice(),z=h.length,A=d.length>0?d.shift():-1;if(A===-1||"string"==typeof A){var B,C=k,D=d.slice(),E=[];if("string"==typeof A)E=A.split(",");else for(B=0;B<w.matches.length;B++)E.push(B);for(var F=0;F<E.length;F++){if(B=parseInt(E[F]),n=[],
//set the correct ndxInitializer
d=r(k,B)||D.slice(),
//console.log("resolved " + ndxInitializerClone + " vs " + resolveNdxInitializer(testPos, amndx));
f=j(w.matches[B]||c.matches[B],[B].concat(h),l)||f,f!==!0&&void 0!==f&&E[E.length-1]<w.matches.length){//no match in the alternations (length mismatch) => look further
var G=a.inArray(f,c.matches)+1;c.matches.length>G&&(f=j(c.matches[G],[G].concat(h.slice(1,h.length)),l),f&&(E.push(G.toString()),a.each(n,function(a,b){b.alternation=h.length-1})))}u=n.slice(),k=C,n=[];
//fuzzy merge matches
for(var H=0;H<u.length;H++){var I=u[H],J=!1;I.alternation=I.alternation||z;for(var K=0;K<x.length;K++){var L=x[K];
//verify equality
if(("string"!=typeof A||a.inArray(I.locator[I.alternation].toString(),E)!==-1)&&(I.match.def===L.match.def||s(I,L))){J=I.match.mask===L.match.mask,L.locator[I.alternation].toString().indexOf(I.locator[I.alternation])===-1&&(L.locator[I.alternation]=L.locator[I.alternation]+","+I.locator[I.alternation],L.alternation=I.alternation,//we pass the alternation index => used in determineLastRequiredPosition
null==I.match.fn&&(//staticCanMatchDefinition => set no alternate on match
L.na=L.na||I.locator[I.alternation].toString(),L.na.indexOf(I.locator[I.alternation])===-1&&(L.na=L.na+","+I.locator[I.alternation])));break}}J||x.push(I)}}"string"==typeof A&&(//filter matches
x=a.map(x,function(b,c){if(isFinite(c)){var d,e=b.alternation,f=b.locator[e].toString().split(",");b.locator[e]=void 0,b.alternation=void 0;for(var g=0;g<f.length;g++)d=a.inArray(f[g],E)!==-1,d&&(//rebuild the locator with valid entries
void 0!==b.locator[e]?(b.locator[e]+=",",b.locator[e]+=f[g]):b.locator[e]=parseInt(f[g]),b.alternation=e);if(void 0!==b.locator[e])return b}})),n=y.concat(x),k=b,o=n.length>0,//insert a stopelemnt when there is an alternate - needed for non-greedy option
//cloneback
d=D.slice()}else
// if (alternateToken.matches[altIndex]) { //if not in the initial alternation => look further
f=j(w.matches[A]||c.matches[A],[A].concat(h),l);if(f)return!0}else if(f.isQuantifier&&l!==c.matches[a.inArray(f,c.matches)-1])for(var M=f,N=d.length>0?d.shift():0;N<(isNaN(M.quantifier.max)?N+1:M.quantifier.max)&&k<=b;N++){var O=c.matches[a.inArray(M,c.matches)-1];//set the tokenGroup as quantifierRecurse marker
if(f=j(O,[N].concat(h),O)){if(
//get latest match
i=n[n.length-1].match,i.optionalQuantifier=N>M.quantifier.min-1,q(i,O)){//search for next possible match
if(N>M.quantifier.min-1){o=!0,k=b;//match the position after the group
break}return!0}return!0}}else if(f=e(f,d,h,l))return!0}else k++}for(var l=d.length>0?d.shift():0;l<c.matches.length;l++)if(c.matches[l].isQuantifier!==!0){var q=j(c.matches[l],[l].concat(f),h);if(q&&k===b)return q;if(k>b)break}}function f(b){var c=[];return a.isArray(b)||(b=[b]),b.length>0&&(void 0===b[0].alternation?(c=r(b.slice()).locator.slice(),0===c.length&&(c=b[0].locator.slice())):a.each(b,function(a,b){if(""!==b.def)if(0===c.length)c=b.locator.slice();else for(var d=0;d<c.length;d++)b.locator[d]&&c[d].toString().indexOf(b.locator[d])===-1&&(c[d]+=","+b.locator[d])})),c}function h(a){return g.keepStatic&&b>0&&a.length>1+(""===a[a.length-1].match.def?1:0)&&a[0].match.optionality!==!0&&a[0].match.optionalQuantifier!==!0&&null===a[0].match.fn&&!/[0-9a-bA-Z]/.test(a[0].match.def)?[r(a)]:a}var i,j=m().maskToken,k=c?d:0,l=c?c.slice():[0],n=[],o=!1,p=c?c.join(""):"";if(b>-1){if(void 0===c){for(//determine index initializer
var q,s=b-1;void 0===(q=m().validPositions[s]||m().tests[s])&&s>-1;)s--;void 0!==q&&s>-1&&(l=f(q),p=l.join(""),k=s)}if(m().tests[b]&&m().tests[b][0].cd===p)//cacheDependency is set on all tests, just check on the first
//console.log("cache hit " + pos + " - " + ndxIntlzr);
return h(m().tests[b]);for(var t=l.shift();t<j.length;t++){var u=e(j[t],l,[t]);if(u&&k===b||k>b)break}}return(0===n.length||o)&&n.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:"",placeholder:""},locator:[],cd:p}),void 0!==c&&m().tests[b]?h(a.extend(!0,[],n)):(m().tests[b]=a.extend(!0,[],n),h(m().tests[b]))}function x(){
//generate template
return void 0===m()._buffer&&(m()._buffer=i(!1,1),void 0===m().buffer&&m()._buffer.slice()),m()._buffer}function y(a){return void 0!==m().buffer&&a!==!0||(m().buffer=i(!0,o(),!0)),m().buffer}function z(a,b,c){var d;if(a===!0)n(),a=0,b=c.length;else for(d=a;d<b;d++)delete m().validPositions[d];for(d=a;d<b;d++)n(!0),//prevents clobber from the buffer
c[d]!==g.skipOptionalPartCharacter&&C(d,c[d],!0,!0)}function A(a,c,d){switch(c.casing){case"upper":a=a.toUpperCase();break;case"lower":a=a.toLowerCase();break;case"title":var e=m().validPositions[d-1];a=0===d||e&&e.input===String.fromCharCode(b.keyCode.SPACE)?a.toUpperCase():a.toLowerCase()}return a}function B(b,c){for(var d=g.greedy?c:c.slice(0,1),e=!1,f=0;f<b.length;f++)if(a.inArray(b[f],d)!==-1){e=!0;break}return e}function C(c,d,e,f,h){//strict true ~ no correction or autofill
function i(a){return ja?a.begin-a.end>1||a.begin-a.end===1&&g.insertMode:a.end-a.begin>1||a.end-a.begin===1&&g.insertMode}function j(b,d,e){var h=!1;return a.each(w(b),function(j,k){for(var l=k.match,r=d?1:0,s="",t=l.cardinality;t>r;t--)s+=G(b-(t-1));if(d&&(s+=d),
//make sure the buffer is set and correct
y(!0),
//return is false or a json object => { pos: ??, c: ??} or true
h=null!=l.fn?l.fn.test(s,m(),b,e,g,i(c)):(d===l.def||d===g.skipOptionalPartCharacter)&&""!==l.def&&//non mask
{c:l.placeholder||l.def,pos:b},h!==!1){var u=void 0!==h.c?h.c:d;u=u===g.skipOptionalPartCharacter&&null===l.fn?l.placeholder||l.def:u;var v=b,w=y();if(void 0!==h.remove&&(//remove position(s)
a.isArray(h.remove)||(h.remove=[h.remove]),a.each(h.remove.sort(function(a,b){return b-a}),function(a,b){q(b,b+1,!0)})),void 0!==h.insert&&(//insert position(s)
a.isArray(h.insert)||(h.insert=[h.insert]),a.each(h.insert.sort(function(a,b){return a-b}),function(a,b){C(b.pos,b.c,!1,f)})),h.refreshFromBuffer){var x=h.refreshFromBuffer;if(e=!0,z(x===!0?x:x.start,x.end,w),void 0===h.pos&&void 0===h.c)return h.pos=o(),!1;if(v=void 0!==h.pos?h.pos:b,v!==b)//revalidate new position strict
return h=a.extend(h,C(v,u,!0,f)),!1}else if(h!==!0&&void 0!==h.pos&&h.pos!==b&&(//their is a position offset
v=h.pos,z(b,v,y().slice()),v!==b))//revalidate new position strict
return h=a.extend(h,C(v,u,!0)),!1;return(h===!0||void 0!==h.pos||void 0!==h.c)&&(j>0&&n(!0),p(v,a.extend({},k,{input:A(u,l,v)}),f,i(c))||(h=!1),!1)}}),h}function k(b,c,d){var e,h,i,j,k,l,p,q,r=a.extend(!0,{},m().validPositions),s=!1,t=o();for(
//find last modified alternation
j=m().validPositions[t];t>=0;t--)if(i=m().validPositions[t],i&&void 0!==i.alternation){if(e=t,h=m().validPositions[e].alternation,j.locator[i.alternation]!==i.locator[i.alternation])break;j=i}if(void 0!==h){q=parseInt(e);var u=void 0!==j.locator[j.alternation||h]?j.locator[j.alternation||h]:p[0];//no match in the alternations (length mismatch)
u.length>0&&(//no decision taken ~ take first one as decider
u=u.split(",")[0]);var v=m().validPositions[q],x=m().validPositions[q-1];a.each(w(q,x?x.locator:void 0,q-1),function(e,i){p=i.locator[h]?i.locator[h].toString().split(","):[];for(var j=0;j<p.length;j++){var t=[],w=0,x=0,y=!1;if(u<p[j]&&(void 0===i.na||a.inArray(p[j],i.na.split(","))===-1)){m().validPositions[q]=a.extend(!0,{},i);var z=m().validPositions[q].locator;for(m().validPositions[q].locator[h]=parseInt(p[j]),//set forced decision
null==i.match.fn?(v.input!==i.match.def&&(y=!0,//verify that the new definition matches the input
v.generatedInput!==!0&&t.push(v.input)),x++,m().validPositions[q].generatedInput=!/[0-9a-bA-Z]/.test(i.match.def),m().validPositions[q].input=i.match.def):m().validPositions[q].input=v.input,k=q+1;k<o(void 0,!0)+1;k++)l=m().validPositions[k],l&&l.generatedInput!==!0&&/[0-9a-bA-Z]/.test(l.input)?t.push(l.input):k<b&&w++,delete m().validPositions[k];for(y&&t[0]===i.match.def&&t.shift(),n(!0),//clear getbuffer
s=!0;t.length>0;){var A=t.shift();if(A!==g.skipOptionalPartCharacter&&!(s=C(o(void 0,!0)+1,A,!1,f,!0)))break}if(s){m().validPositions[q].locator=z;//reset forceddecision ~ needed for proper delete
var B=o(b)+1;for(k=q+1;k<o()+1;k++)l=m().validPositions[k],(void 0===l||null==l.match.fn)&&k<b+(x-w)&&x++;b+=x-w,s=C(b>B?B:b,c,d,f,!0)}if(s)return!1;n(),m().validPositions=a.extend(!0,{},r)}}})}return s}
//set alternator choice on previous skipped placeholder positions
function l(b,c){for(var d=m().validPositions[c],e=d.locator,f=e.length,g=b;g<c;g++)if(void 0===m().validPositions[g]&&!D(g,!0)){var h=w(g),i=h[0],j=-1;a.each(h,function(a,b){//find best matching
for(var c=0;c<f&&(void 0!==b.locator[c]&&B(b.locator[c].toString().split(","),e[c].toString().split(",")));c++)j<c&&(j=c,i=b)}),p(g,a.extend({},i,{input:i.match.placeholder||i.match.def}),!0)}}e=e===!0;//always set a value to strict to prevent possible strange behavior in the extensions
var t=c;void 0!==c.begin&&(//position was a position object - used to handle a delete by typing over a selection
t=ja&&!i(c)?c.end:c.begin);//clone the currentPositions
//Check for a nonmask before the pos
//find previous valid
for(var u=!1,v=a.extend(!0,{},m().validPositions),x=t-1;x>-1&&!m().validPositions[x];x--);
////fill missing nonmask and valid placeholders
var F;for(x++;x<t;x++)void 0===m().validPositions[x]&&(g.jitMasking===!1||g.jitMasking>x)&&((F=s(x,s(x-1).locator,x-1)).match.def===g.radixPointDefinitionSymbol||!D(x,!0)||a.inArray(g.radixPoint,y())<x&&F.match.fn&&F.match.fn.test(I(x),m(),x,!1,g))&&(u=j(x,F.match.placeholder||(null==F.match.fn?F.match.def:""!==I(x)?I(x):y()[x]),!0),u!==!1&&(m().validPositions[u.pos||x].generatedInput=!0));if(i(c)&&(Q(void 0,b.keyCode.DELETE,c),t=m().p),t<m().maskLength&&(u=j(t,d,e),(!e||f===!0)&&u===!1)){var H=m().validPositions[t];if(!H||null!==H.match.fn||H.match.def!==d&&d!==g.skipOptionalPartCharacter){if((g.insertMode||void 0===m().validPositions[E(t)])&&!D(t,!0)){//does the input match on a further position?
var J=w(t).slice();""===J[J.length-1].match.def&&J.pop();var K=r(J,!0);K&&(K=K.match.placeholder||K.match.def,j(t,K,e));for(var L=t+1,M=E(t);L<=M;L++)if(u=j(L,d,e),u!==!1){l(t,L),t=L;break}}}else u={caret:E(t)}}//try fuzzy alternator logic
return u===!1&&g.keepStatic&&!e&&h!==!0&&(u=k(t,d,e)),u===!0&&(u={pos:t}),a.isFunction(g.postValidation)&&u!==!1&&!e&&f!==!0&&(u=!!g.postValidation(y(!0),u,g)&&u),void 0===u.pos&&(u.pos=t),u===!1&&(n(!0),m().validPositions=a.extend(!0,{},v)),u}function D(a,b){var c;if(b?(c=s(a).match,""===c.def&&(c=t(a).match)):c=t(a).match,null!=c.fn)return c.fn;if(b!==!0&&a>-1){var d=w(a);return d.length>1+(""===d[d.length-1].match.def?1:0)}return!1}function E(a,b){var c=m().maskLength;if(a>=c)return c;for(var d=a;++d<c&&(b===!0&&(t(d).match.newBlockMarker!==!0||!D(d))||b!==!0&&!D(d)););return d}function F(a,b){var c,d=a;if(d<=0)return 0;for(;--d>0&&(b===!0&&t(d).match.newBlockMarker!==!0||b!==!0&&!D(d)&&(c=w(d),c.length<2||2===c.length&&""===c[1].match.def)););return d}function G(a){return void 0===m().validPositions[a]?I(a):m().validPositions[a].input}function H(b,c,d,e,f){if(e&&a.isFunction(g.onBeforeWrite)){var h=g.onBeforeWrite(e,c,d,g);if(h){if(h.refreshFromBuffer){var i=h.refreshFromBuffer;z(i===!0?i:i.start,i.end,h.buffer||c),c=y(!0)}
//only alter when intented !== undefined
void 0!==d&&(d=void 0!==h.caret?h.caret:d)}}b.inputmask._valueSet(c.join("")),void 0===d||void 0!==e&&"blur"===e.type||L(b,d),f===!0&&(la=!0,a(b).trigger("input"))}function I(a,b){if(b=b||t(a).match,void 0!==b.placeholder)return b.placeholder;if(null===b.fn){if(a>-1&&void 0===m().validPositions[a]){var c,d=w(a),e=[];if(d.length>1+(""===d[d.length-1].match.def?1:0))for(var f=0;f<d.length;f++)if(d[f].match.optionality!==!0&&d[f].match.optionalQuantifier!==!0&&(null===d[f].match.fn||void 0===c||d[f].match.fn.test(c.match.def,m(),a,!0,g)!==!1)&&(e.push(d[f]),null===d[f].match.fn&&(c=d[f]),e.length>1&&/[0-9a-bA-Z]/.test(e[0].match.def)))return g.placeholder.charAt(a%g.placeholder.length)}return b.def}return g.placeholder.charAt(a%g.placeholder.length)}function J(c,d,e,f,h){function i(){var a=!1,b=x().slice(l,E(l)).join("").indexOf(k);if(b!==-1&&!D(l)){a=!0;for(var c=x().slice(l,l+b),d=0;d<c.length;d++)if(" "!==c[d]){a=!1;break}}return a}var j=f.slice(),k="",l=0,p=void 0;
// if (writeOut) input.inputmask._valueSet(""); //initial clear
if(n(),m().p=E(-1),!e)if(g.autoUnmask!==!0){var q=x().slice(0,E(-1)).join(""),r=j.join("").match(new RegExp("^"+b.escapeRegex(q),"g"));r&&r.length>0&&(j.splice(0,r.length*q.length),l=E(l))}else l=E(l);if(a.each(j,function(b,d){if(void 0!==d){//inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
var f=new a.Event("keypress");f.which=d.charCodeAt(0),k+=d;var h=o(void 0,!0),j=m().validPositions[h],q=s(h+1,j?j.locator.slice():void 0,h);if(!i()||e||g.autoUnmask){var r=e?b:null==q.match.fn&&q.match.optionality&&h+1<m().p?h+1:m().p;p=S.call(c,f,!0,!1,e,r),l=r+1,k=""}else p=S.call(c,f,!0,!1,!0,h+1);if(!e&&a.isFunction(g.onBeforeWrite)&&(p=g.onBeforeWrite(f,y(),p.forwardPosition,g),p&&p.refreshFromBuffer)){var t=p.refreshFromBuffer;z(t===!0?t:t.start,t.end,p.buffer),n(!0),p.caret&&(m().p=p.caret)}}}),d){var t=document.activeElement===c&&(h||p)?h?L(c).begin:p.forwardPosition:void 0,u=y().length-c.inputmask._valueGet().length;H(c,y(),t+u,h||new a.Event("checkval"))}}function K(b){if(b&&void 0===b.inputmask)return b.value;var c=[],d=m().validPositions;for(var e in d)d[e].match&&null!=d[e].match.fn&&c.push(d[e].input);var f=0===c.length?"":(ja?c.reverse():c).join("");if(a.isFunction(g.onUnMask)){var h=(ja?y().slice().reverse():y()).join("");f=g.onUnMask(h,f,g)||f}return f}function L(a,b,c,d){function e(a){if(d!==!0&&ja&&"number"==typeof a&&(!g.greedy||""!==g.placeholder)){var b=y().join("").length;//join is needed because sometimes we get an empty buffer element which must not be counted for the caret position (numeric alias)
a=b-a}return a}var f;if("number"!=typeof b)/*eslint-disable consistent-return */
return a.setSelectionRange?(b=a.selectionStart,c=a.selectionEnd):window.getSelection?(f=window.getSelection().getRangeAt(0),f.commonAncestorContainer.parentNode!==a&&f.commonAncestorContainer!==a||(b=f.startOffset,c=f.endOffset)):document.selection&&document.selection.createRange&&(f=document.selection.createRange(),b=0-f.duplicate().moveStart("character",-a.inputmask._valueGet().length),c=b+f.text.length),{begin:e(b),end:e(c)};b=e(b),c=e(c),c="number"==typeof c?c:b;
// if (!$(input).is(":visible")) {
// 	return;
// }
var h=parseInt(((a.ownerDocument.defaultView||window).getComputedStyle?(a.ownerDocument.defaultView||window).getComputedStyle(a,null):a.currentStyle).fontSize)*c;//set visualization for insert/overwrite mode
if(a.scrollLeft=h>a.scrollWidth?h:0,j||g.insertMode!==!1||b!==c||c++,a.setSelectionRange)a.selectionStart=b,a.selectionEnd=c;else if(window.getSelection){if(f=document.createRange(),void 0===a.firstChild||null===a.firstChild){var i=document.createTextNode("");a.appendChild(i)}f.setStart(a.firstChild,b<a.inputmask._valueGet().length?b:a.inputmask._valueGet().length),f.setEnd(a.firstChild,c<a.inputmask._valueGet().length?c:a.inputmask._valueGet().length),f.collapse(!0);var k=window.getSelection();k.removeAllRanges(),k.addRange(f)}else a.createTextRange&&(f=a.createTextRange(),f.collapse(!0),f.moveEnd("character",c),f.moveStart("character",b),f.select())}function M(b){var c,d,e=y(),f=e.length,g=o(),h={},i=m().validPositions[g],j=void 0!==i?i.locator.slice():void 0;for(c=g+1;c<e.length;c++)d=s(c,j,c-1),j=d.locator.slice(),h[c]=a.extend(!0,{},d);var k=i&&void 0!==i.alternation?i.locator[i.alternation]:void 0;for(c=f-1;c>g&&(d=h[c],(d.match.optionality||d.match.optionalQuantifier||k&&(k!==h[c].locator[i.alternation]&&null!=d.match.fn||null===d.match.fn&&d.locator[i.alternation]&&B(d.locator[i.alternation].toString().split(","),k.toString().split(","))&&""!==w(c)[0].def))&&e[c]===I(c,d.match));c--)f--;return b?{l:f,def:h[f]?h[f].match:void 0}:f}function N(a){for(var b=M(),c=a.length-1;c>b&&!D(c);c--);return a.splice(b,c+1-b),a}function O(b){//return true / false / undefined (repeat *)
if(a.isFunction(g.isComplete))return g.isComplete(b,g);if("*"!==g.repeat){var c=!1,d=M(!0),e=F(d.l);if(void 0===d.def||d.def.newBlockMarker||d.def.optionality||d.def.optionalQuantifier){c=!0;for(var f=0;f<=e;f++){var h=s(f).match;if(null!==h.fn&&void 0===m().validPositions[f]&&h.optionality!==!0&&h.optionalQuantifier!==!0||null===h.fn&&b[f]!==I(f,h)){c=!1;break}}}return c}}function P(b){function c(b){if(a.valHooks&&(void 0===a.valHooks[b]||a.valHooks[b].inputmaskpatch!==!0)){var c=a.valHooks[b]&&a.valHooks[b].get?a.valHooks[b].get:function(a){return a.value},d=a.valHooks[b]&&a.valHooks[b].set?a.valHooks[b].set:function(a,b){return a.value=b,a};a.valHooks[b]={get:function(a){if(a.inputmask){if(a.inputmask.opts.autoUnmask)return a.inputmask.unmaskedvalue();var b=c(a);return o(void 0,void 0,a.inputmask.maskset.validPositions)!==-1||g.nullable!==!0?b:""}return c(a)},set:function(b,c){var e,f=a(b);return e=d(b,c),b.inputmask&&f.trigger("setvalue"),e},inputmaskpatch:!0}}}function d(){return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():o()!==-1||g.nullable!==!0?document.activeElement===this&&g.clearMaskOnLostFocus?(ja?N(y().slice()).reverse():N(y().slice())).join(""):h.call(this):"":h.call(this)}function e(b){i.call(this,b),this.inputmask&&a(this).trigger("setvalue")}function f(b){oa.on(b,"mouseenter",function(b){var c=a(this),d=this,e=d.inputmask._valueGet();e!==y().join("")&&c.trigger("setvalue")})}var h,i;if(!b.inputmask.__valueGet){if(Object.getOwnPropertyDescriptor){"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"==typeof"test".__proto__?function(a){return a.__proto__}:function(a){return a.constructor.prototype});var j=Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(b),"value"):void 0;j&&j.get&&j.set?(h=j.get,i=j.set,Object.defineProperty(b,"value",{get:d,set:e,configurable:!0})):"INPUT"!==b.tagName&&(h=function(){return this.textContent},i=function(a){this.textContent=a},Object.defineProperty(b,"value",{get:d,set:e,configurable:!0}))}else document.__lookupGetter__&&b.__lookupGetter__("value")&&(h=b.__lookupGetter__("value"),i=b.__lookupSetter__("value"),b.__defineGetter__("value",d),b.__defineSetter__("value",e));b.inputmask.__valueGet=h,//store native property getter
b.inputmask._valueGet=function(a){return ja&&a!==!0?h.call(this.el).split("").reverse().join(""):h.call(this.el)},b.inputmask.__valueSet=i,//store native property setter
b.inputmask._valueSet=function(a,b){//null check is needed for IE8 => otherwise converts to "null"
i.call(this.el,null===a||void 0===a?"":b!==!0&&ja?a.split("").reverse().join(""):a)},void 0===h&&(//jquery.val fallback
h=function(){return this.value},i=function(a){this.value=a},c(b.type),f(b))}}function Q(c,d,e,f){function h(){if(g.keepStatic){
//find last alternation
for(var b=[],d=o(-1,!0),e=a.extend(!0,{},m().validPositions),f=m().validPositions[d];d>=0;d--){var h=m().validPositions[d];if(h){if(/*altPos.generatedInput !== true &&*/ /[0-9a-bA-Z]/.test(h.input)&&b.push(h.input),delete m().validPositions[d],void 0!==h.alternation&&h.locator[h.alternation]!==f.locator[h.alternation])break;f=h}}if(d>-1)for(m().p=E(o(-1,!0));b.length>0;){var i=new a.Event("keypress");i.which=b.pop().charCodeAt(0),S.call(c,i,!0,!1,!1,m().p)}else m().validPositions=a.extend(!0,{},e)}}if((g.numericInput||ja)&&(d===b.keyCode.BACKSPACE?d=b.keyCode.DELETE:d===b.keyCode.DELETE&&(d=b.keyCode.BACKSPACE),ja)){var i=e.end;e.end=e.begin,e.begin=i}d===b.keyCode.BACKSPACE&&(e.end-e.begin<1||g.insertMode===!1)?(e.begin=F(e.begin),void 0===m().validPositions[e.begin]||m().validPositions[e.begin].input!==g.groupSeparator&&m().validPositions[e.begin].input!==g.radixPoint||e.begin--):d===b.keyCode.DELETE&&e.begin===e.end&&(e.end=D(e.end,!0)?e.end+1:E(e.end)+1,void 0===m().validPositions[e.begin]||m().validPositions[e.begin].input!==g.groupSeparator&&m().validPositions[e.begin].input!==g.radixPoint||e.end++),q(e.begin,e.end,!1,f),f!==!0&&h();var j=o(e.begin,!0);j<e.begin?
//if (lvp === -1) resetMaskSet();
m().p=E(j):f!==!0&&(m().p=e.begin)}function R(d){var e=this,f=a(e),h=d.keyCode,i=L(e);
//backspace, delete, and escape get special treatment
if(h===b.keyCode.BACKSPACE||h===b.keyCode.DELETE||l&&h===b.keyCode.BACKSPACE_SAFARI||d.ctrlKey&&h===b.keyCode.X&&!c("cut"))//backspace/delete
d.preventDefault(),//stop default action but allow propagation
Q(e,h,i),H(e,y(!0),m().p,d,e.inputmask._valueGet()!==y().join("")),e.inputmask._valueGet()===x().join("")?f.trigger("cleared"):O(y())===!0&&f.trigger("complete"),g.showTooltip&&(//update tooltip
e.title=g.tooltip||m().mask);else if(h===b.keyCode.END||h===b.keyCode.PAGE_DOWN){//when END or PAGE_DOWN pressed set position at lastmatch
d.preventDefault();var j=E(o());g.insertMode||j!==m().maskLength||d.shiftKey||j--,L(e,d.shiftKey?i.begin:j,j,!0)}else h===b.keyCode.HOME&&!d.shiftKey||h===b.keyCode.PAGE_UP?(//Home or page_up
d.preventDefault(),L(e,0,d.shiftKey?i.begin:0,!0)):(g.undoOnEscape&&h===b.keyCode.ESCAPE||90===h&&d.ctrlKey)&&d.altKey!==!0?(//escape && undo && #762
J(e,!0,!1,ea.split("")),f.trigger("click")):h!==b.keyCode.INSERT||d.shiftKey||d.ctrlKey?g.tabThrough===!0&&h===b.keyCode.TAB?(d.shiftKey===!0?(null===t(i.begin).match.fn&&(i.begin=E(i.begin)),i.end=F(i.begin,!0),i.begin=F(i.end,!0)):(i.begin=E(i.begin,!0),i.end=E(i.begin,!0),i.end<m().maskLength&&i.end--),i.begin<m().maskLength&&(d.preventDefault(),L(e,i.begin,i.end))):g.insertMode!==!1||d.shiftKey||(h===b.keyCode.RIGHT?setTimeout(function(){var a=L(e);L(e,a.begin)},0):h===b.keyCode.LEFT&&setTimeout(function(){var a=L(e);L(e,ja?a.begin+1:a.begin-1)},0)):(//insert
g.insertMode=!g.insertMode,L(e,g.insertMode||i.begin!==m().maskLength?i.begin:i.begin-1));g.onKeyDown.call(this,d,y(),L(e).begin,g),ma=a.inArray(h,g.ignorables)!==-1}function S(c,d,e,f,h){var i=this,j=a(i),k=c.which||c.charCode||c.keyCode;if(!(d===!0||c.ctrlKey&&c.altKey)&&(c.ctrlKey||c.metaKey||ma))
// e.preventDefault();
return k===b.keyCode.ENTER&&ea!==y().join("")&&(ea=y().join(""),setTimeout(function(){j.trigger("change")},0)),!0;if(k){
//special treat the decimal separator
46===k&&c.shiftKey===!1&&","===g.radixPoint&&(k=44);var l,o=d?{begin:h,end:h}:L(i),p=String.fromCharCode(k);m().writeOutBuffer=!0;var q=C(o,p,f);if(q!==!1&&(n(!0),l=void 0!==q.caret?q.caret:d?q.pos+1:E(q.pos),m().p=l),e!==!1){var r=this;if(setTimeout(function(){g.onKeyValidation.call(r,k,q,g)},0),m().writeOutBuffer&&q!==!1){var s=y();H(i,s,g.numericInput&&void 0===q.caret?F(l):l,c,d!==!0),d!==!0&&setTimeout(function(){//timeout needed for IE
O(s)===!0&&j.trigger("complete")},0)}}if(g.showTooltip&&(//update tooltip
i.title=g.tooltip||m().mask),c.preventDefault(),d)return q.forwardPosition=l,q}}function T(b){var c,d=this,e=b.originalEvent||b,f=a(d),h=d.inputmask._valueGet(!0),i=L(d);ja&&(c=i.end,i.end=i.begin,i.begin=c);var j=h.substr(0,i.begin),k=h.substr(i.end,h.length);j===(ja?x().reverse():x()).slice(0,i.begin).join("")&&(j=""),k===(ja?x().reverse():x()).slice(i.end).join("")&&(k=""),ja&&(c=j,j=k,k=c),window.clipboardData&&window.clipboardData.getData?// IE
h=j+window.clipboardData.getData("Text")+k:e.clipboardData&&e.clipboardData.getData&&(h=j+e.clipboardData.getData("text/plain")+k);var l=h;if(a.isFunction(g.onBeforePaste)){if(l=g.onBeforePaste(h,g),l===!1)return b.preventDefault();l||(l=h)}return J(d,!1,!1,ja?l.split("").reverse():l.toString().split("")),H(d,y(),E(o()),b,ea!==y().join("")),O(y())===!0&&f.trigger("complete"),b.preventDefault()}function U(c){//fallback when keypress fails
var d=this,e=d.inputmask._valueGet();if(y().join("")!==e){var f=L(d);if(e=e.replace(new RegExp("("+b.escapeRegex(x().join(""))+")*"),""),k){//iemobile just set the character at the end althought the caret position is correctly set
var g=e.replace(y().join(""),"");if(1===g.length){var h=new a.Event("keypress");return h.which=g.charCodeAt(0),S.call(d,h,!0,!0,!1,m().validPositions[f.begin-1]?f.begin:f.begin-1),!1}}
//detect & treat possible backspace
if(f.begin>e.length&&(L(d,e.length),f=L(d)),y().length-e.length!==1||e.charAt(f.begin)===y()[f.begin]||e.charAt(f.begin+1)===y()[f.begin]||D(f.begin)){for(var i=o()+1,j=y().slice(i).join("");null===e.match(b.escapeRegex(j)+"$");)j=j.slice(1);e=e.replace(j,""),e=e.split(""),J(d,!0,!1,e,c),O(y())===!0&&a(d).trigger("complete")}else c.keyCode=b.keyCode.BACKSPACE,R.call(d,c);c.preventDefault()}}function V(b){var c=this,d=c.inputmask._valueGet();J(c,!0,!1,(a.isFunction(g.onBeforeMask)?g.onBeforeMask(d,g)||d:d).split("")),ea=y().join(""),(g.clearMaskOnLostFocus||g.clearIncomplete)&&c.inputmask._valueGet()===x().join("")&&c.inputmask._valueSet("")}function W(a){var b=this,c=b.inputmask._valueGet();g.showMaskOnFocus&&(!g.showMaskOnHover||g.showMaskOnHover&&""===c)?b.inputmask._valueGet()!==y().join("")&&H(b,y(),E(o())):na===!1&&//only executed on focus without mouseenter
L(b,E(o())),g.positionCaretOnTab===!0&&setTimeout(function(){Y.apply(this,[a])},0),ea=y().join("")}function X(a){var b=this;if(na=!1,g.clearMaskOnLostFocus&&document.activeElement!==b){var c=y().slice(),d=b.inputmask._valueGet();d!==b.getAttribute("placeholder")&&""!==d&&(o()===-1&&d===x().join("")?c=[]://clearout optional tail of the mask
N(c),H(b,c))}}function Y(b){function c(b){if(""!==g.radixPoint){var c=m().validPositions;if(void 0===c[b]||c[b].input===I(b)){if(b<E(-1))return!0;var d=a.inArray(g.radixPoint,y());if(d!==-1){for(var e in c)if(d<e&&c[e].input!==I(e))return!1;return!0}}}return!1}var d=this;setTimeout(function(){//needed for Chrome ~ initial selection clears after the clickevent
if(document.activeElement===d){var b=L(d);if(b.begin===b.end)switch(g.positionCaretOnClick){case"none":break;case"radixFocus":if(c(b.begin)){L(d,g.numericInput?E(a.inArray(g.radixPoint,y())):a.inArray(g.radixPoint,y()));break}default://lvp:
var e=b.begin,f=o(e,!0),h=E(f);if(e<h)L(d,D(e)||D(e-1)?e:E(e));else{var i=I(h);(""!==i&&y()[h]!==i&&t(h).match.optionalQuantifier!==!0||!D(h,!0)&&t(h).match.def===i)&&(h=E(h)),L(d,h)}}}},0)}function Z(a){var b=this;setTimeout(function(){L(b,0,E(o()))},0)}function $(c){var d=this,e=a(d),f=L(d),h=c.originalEvent||c,i=window.clipboardData||h.clipboardData,j=ja?y().slice(f.end,f.begin):y().slice(f.begin,f.end);i.setData("text",ja?j.reverse().join(""):j.join("")),document.execCommand&&document.execCommand("copy"),// copy selected content to system clipbaord
Q(d,b.keyCode.DELETE,f),H(d,y(),m().p,c,ea!==y().join("")),d.inputmask._valueGet()===x().join("")&&e.trigger("cleared"),g.showTooltip&&(//update tooltip
d.title=g.tooltip||m().mask)}function _(b){var c=a(this),d=this;if(d.inputmask){var e=d.inputmask._valueGet(),f=y().slice();ea!==f.join("")&&setTimeout(function(){//change event should be triggered after the other buffer manipulations on blur
c.trigger("change"),ea=f.join("")},0),""!==e&&(g.clearMaskOnLostFocus&&(o()===-1&&e===x().join("")?f=[]://clearout optional tail of the mask
N(f)),O(f)===!1&&(setTimeout(function(){c.trigger("incomplete")},0),g.clearIncomplete&&(n(),f=g.clearMaskOnLostFocus?[]:x().slice())),H(d,f,void 0,b))}}function aa(a){var b=this;na=!0,document.activeElement!==b&&g.showMaskOnHover&&b.inputmask._valueGet()!==y().join("")&&H(b,y())}function ba(a){//trigger change on submit if any
ea!==y().join("")&&ga.trigger("change"),g.clearMaskOnLostFocus&&o()===-1&&fa.inputmask._valueGet&&fa.inputmask._valueGet()===x().join("")&&fa.inputmask._valueSet(""),g.removeMaskOnSubmit&&(fa.inputmask._valueSet(fa.inputmask.unmaskedvalue(),!0),setTimeout(function(){H(fa,y())},0))}function ca(a){setTimeout(function(){ga.trigger("setvalue")},0)}function da(b){//initialize the buffer and getmasklength
if(fa=b,ga=a(fa),
//show tooltip
g.showTooltip&&(fa.title=g.tooltip||m().mask),("rtl"===fa.dir||g.rightAlign)&&(fa.style.textAlign="right"),("rtl"===fa.dir||g.numericInput)&&(fa.dir="ltr",fa.removeAttribute("dir"),fa.inputmask.isRTL=!0,ja=!0),
//unbind all events - to make sure that no other mask will interfere when re-masking
oa.off(fa),P(fa),d(fa,g)&&(
//bind events
oa.on(fa,"submit",ba),oa.on(fa,"reset",ca),oa.on(fa,"mouseenter",aa),oa.on(fa,"blur",_),oa.on(fa,"focus",W),oa.on(fa,"mouseleave",X),oa.on(fa,"click",Y),oa.on(fa,"dblclick",Z),oa.on(fa,"paste",T),oa.on(fa,"dragdrop",T),oa.on(fa,"drop",T),oa.on(fa,"cut",$),oa.on(fa,"complete",g.oncomplete),oa.on(fa,"incomplete",g.onincomplete),oa.on(fa,"cleared",g.oncleared),g.inputEventOnly!==!0&&(oa.on(fa,"keydown",R),oa.on(fa,"keypress",S)),oa.on(fa,"input",U)),oa.on(fa,"setvalue",V),
//apply mask
x(),""!==fa.inputmask._valueGet()||g.clearMaskOnLostFocus===!1||document.activeElement===fa){var c=a.isFunction(g.onBeforeMask)?g.onBeforeMask(fa.inputmask._valueGet(),g)||fa.inputmask._valueGet():fa.inputmask._valueGet();J(fa,!0,!1,c.split(""));var e=y().slice();ea=e.join(""),
// Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
O(e)===!1&&g.clearIncomplete&&n(),g.clearMaskOnLostFocus&&document.activeElement!==fa&&(o()===-1?e=[]:N(e)),H(fa,e),document.activeElement===fa&&//position the caret when in focus
L(fa,E(o()))}}var ea,fa,ga,ha,ia,ja=!1,ka=!1,//Safari 5.1.x - modal dialog fires keypress twice workaround
la=!1,//skip when triggered from within inputmask
ma=!1,na=!0,oa={on:function(c,d,e){var f=function(c){
// console.log("triggered " + e.type);
if(void 0===this.inputmask&&"FORM"!==this.nodeName){//happens when cloning an object with jquery.clone
var d=a.data(this,"_inputmask_opts");d?new b(d).mask(this):oa.off(this)}else{if("setvalue"===c.type||!(this.disabled||this.readOnly&&!("keydown"===c.type&&c.ctrlKey&&67===c.keyCode||g.tabThrough===!1&&c.keyCode===b.keyCode.TAB))){switch(c.type){case"input":if(la===!0)return la=!1,c.preventDefault();break;case"keydown":
//Safari 5.1.x - modal dialog fires keypress twice workaround
ka=!1,la=!1;break;case"keypress":if(ka===!0)return c.preventDefault();ka=!0;break;case"click":if(k){var f=this;return setTimeout(function(){e.apply(f,arguments)},0),!1}}
// console.log("executed " + e.type);
var h=e.apply(this,arguments);return h===!1&&(c.preventDefault(),c.stopPropagation()),h}c.preventDefault()}};
//keep instance of the event
c.inputmask.events[d]=c.inputmask.events[d]||[],c.inputmask.events[d].push(f),a.inArray(d,["submit","reset"])!==-1?null!=c.form&&a(c.form).on(d,f):a(c).on(d,f)},off:function(b,c){if(b.inputmask&&b.inputmask.events){var d;c?(d=[],d[c]=b.inputmask.events[c]):d=b.inputmask.events,a.each(d,function(c,d){for(;d.length>0;){var e=d.pop();a.inArray(c,["submit","reset"])!==-1?null!=b.form&&a(b.form).off(c,e):a(b).off(c,e)}delete b.inputmask.events[c]})}}};if(void 0!==e)switch(e.action){case"isComplete":return fa=e.el,O(y());case"unmaskedvalue":return fa=e.el,void 0!==fa&&void 0!==fa.inputmask?(f=fa.inputmask.maskset,g=fa.inputmask.opts,ja=fa.inputmask.isRTL):(ia=e.value,g.numericInput&&(ja=!0),ia=(a.isFunction(g.onBeforeMask)?g.onBeforeMask(ia,g)||ia:ia).split(""),J(void 0,!1,!1,ja?ia.reverse():ia),a.isFunction(g.onBeforeWrite)&&g.onBeforeWrite(void 0,y(),0,g)),K(fa);case"mask":fa=e.el,f=fa.inputmask.maskset,g=fa.inputmask.opts,ja=fa.inputmask.isRTL,da(fa);break;case"format":return g.numericInput&&(ja=!0),ia=(a.isFunction(g.onBeforeMask)?g.onBeforeMask(e.value,g)||e.value:e.value).split(""),J(void 0,!1,!1,ja?ia.reverse():ia),a.isFunction(g.onBeforeWrite)&&g.onBeforeWrite(void 0,y(),0,g),e.metadata?{value:ja?y().slice().reverse().join(""):y().join(""),metadata:h({action:"getmetadata"},f,g)}:ja?y().slice().reverse().join(""):y().join("");case"isValid":g.numericInput&&(ja=!0),e.value?(ia=e.value.split(""),J(void 0,!1,!0,ja?ia.reverse():ia)):e.value=y().join("");for(var pa=y(),qa=M(),ra=pa.length-1;ra>qa&&!D(ra);ra--);return pa.splice(qa,ra+1-qa),O(pa)&&e.value===y().join("");case"getemptymask":return x().join("");case"remove":fa=e.el,ga=a(fa),f=fa.inputmask.maskset,g=fa.inputmask.opts,
//writeout the unmaskedvalue
fa.inputmask._valueSet(K(fa)),
//unbind all events
oa.off(fa);
//restore the value property
var sa;Object.getOwnPropertyDescriptor&&Object.getPrototypeOf?(sa=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(fa),"value"),sa&&fa.inputmask.__valueGet&&Object.defineProperty(fa,"value",{get:fa.inputmask.__valueGet,set:fa.inputmask.__valueSet,configurable:!0})):document.__lookupGetter__&&fa.__lookupGetter__("value")&&fa.inputmask.__valueGet&&(fa.__defineGetter__("value",fa.inputmask.__valueGet),fa.__defineSetter__("value",fa.inputmask.__valueSet)),
//clear data
fa.inputmask=void 0;break;case"getmetadata":if(a.isArray(f.metadata)){for(var ta,ua=o(void 0,!0),va=ua;va>=0;va--)if(m().validPositions[va]&&void 0!==m().validPositions[va].alternation){ta=m().validPositions[va].alternation;break}return void 0!==ta?f.metadata[m().validPositions[va].locator[ta]]:[]}return f.metadata}}b.prototype={
//options default
defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,//needs tobe null instead of undefined as the extend method does not consider props with the undefined value
oncomplete:a.noop,//executes when the mask is complete
onincomplete:a.noop,//executes when the mask is incomplete and focus is lost
oncleared:a.noop,//executes when the mask is cleared
repeat:0,//repetitions of the mask: * ~ forever, otherwise specify an integer
greedy:!0,//true: allocated buffer for the mask and repetitions - false: allocate only if needed
autoUnmask:!1,//automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
removeMaskOnSubmit:!1,//remove the mask before submitting the form.
clearMaskOnLostFocus:!0,insertMode:!0,//insert the input or overwrite the input
clearIncomplete:!1,//clear the incomplete input on blur
aliases:{},//aliases definitions => see jquery.inputmask.extensions.js
alias:null,onKeyDown:a.noop,//callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
onBeforeMask:null,//executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
onBeforePaste:function(b,c){return a.isFunction(c.onBeforeMask)?c.onBeforeMask(b,c):b},//executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
onBeforeWrite:null,//executes before writing to the masked element. args => event, opts
onUnMask:null,//executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
showMaskOnFocus:!0,//show the mask-placeholder when the input has focus
showMaskOnHover:!0,//show the mask-placeholder when hovering the empty input
onKeyValidation:a.noop,//executes on every key-press with the result of isValid. Params: key, result, opts
skipOptionalPartCharacter:" ",//a character which can be used to skip an optional part of a mask
showTooltip:!1,//show the activemask as tooltip
tooltip:void 0,//tooltip to show
numericInput:!1,//numericInput input direction style (input shifts to the left while holding the caret position)
rightAlign:!1,//align to the right
undoOnEscape:!0,//pressing escape reverts the value to the value before focus
//numeric basic properties
radixPoint:"",//".", // | ","
radixPointDefinitionSymbol:void 0,//set the radixPoint definitionSymbol ~ used for awareness of the radixpoint
groupSeparator:"",//",", // | "."
//numeric basic properties
keepStatic:null,//try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible - null see auto selection for multi masks
positionCaretOnTab:!0,//when enabled the caret position is set after the latest valid position on TAB
tabThrough:!1,//allows for tabbing through the different parts of the masked field
supportsInputType:["text","tel","password"],//list with the supported input types
definitions:{9:{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1}},
//specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:null,//override for isComplete - args => buffer, opts - return true || false
canClearPosition:a.noop,//hook to alter the clear behavior in the stripValidPositions args => maskset, position, lastValidPosition, opts => return true|false
postValidation:null,//hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, currentResult, opts => return true/false
staticDefinitionSymbol:void 0,//specify a definitionSymbol for static content, used to make matches for alternators
jitMasking:!1,//just in time masking ~ only mask while typing, can n (number), true or false
nullable:!0,//return nothing instead of the buffertemplate when the user hasn't entered anything.
inputEventOnly:!1,//testing inputfallback behavior
positionCaretOnClick:"lvp"},masksCache:{},mask:function(c){var d=this;return"string"==typeof c&&(c=document.getElementById(c)||document.querySelectorAll(c)),c=c.nodeName?[c]:c,a.each(c,function(c,e){var i=a.extend(!0,{},d.opts);f(e,i,a.extend(!0,{},d.userOptions));var j=g(i,d.noMasksCache);void 0!==j&&(void 0!==e.inputmask&&e.inputmask.remove(),
//store inputmask instance on the input with element reference
e.inputmask=new b,e.inputmask.opts=i,e.inputmask.noMasksCache=d.noMasksCache,e.inputmask.userOptions=a.extend(!0,{},d.userOptions),e.inputmask.el=e,e.inputmask.maskset=j,e.inputmask.isRTL=!1,a.data(e,"_inputmask_opts",i),h({action:"mask",el:e}))}),c&&c[0]?c[0].inputmask||this:this},option:function(b,c){//set extra options || retrieve value of a current option
//set extra options || retrieve value of a current option
//user passed options
//remask
return"string"==typeof b?this.opts[b]:"object"==typeof b?(a.extend(this.userOptions,b),this.el&&c!==!0&&this.mask(this.el),this):void 0},unmaskedvalue:function(a){return h({action:"unmaskedvalue",el:this.el,value:a},this.el&&this.el.inputmask?this.el.inputmask.maskset:g(this.opts,this.noMasksCache),this.opts)},remove:function(){if(this.el)//delete ~ undefined
return h({action:"remove",el:this.el}),this.el.inputmask=void 0,this.el},getemptymask:function(){//return the default (empty) mask value, usefull for setting the default value in validation
return h({action:"getemptymask"},this.maskset||g(this.opts,this.noMasksCache),this.opts)},hasMaskedValue:function(){//check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
return!this.opts.autoUnmask},isComplete:function(){return h({action:"isComplete",el:this.el},this.maskset||g(this.opts,this.noMasksCache),this.opts)},getmetadata:function(){//return mask metadata if exists
return h({action:"getmetadata"},this.maskset||g(this.opts,this.noMasksCache),this.opts)},isValid:function(a){return h({action:"isValid",value:a},this.maskset||g(this.opts,this.noMasksCache),this.opts)},format:function(a,b){return h({action:"format",value:a,metadata:b},this.maskset||g(this.opts,this.noMasksCache),this.opts)}},
//apply defaults, definitions, aliases
b.extendDefaults=function(c){a.extend(!0,b.prototype.defaults,c)},b.extendDefinitions=function(c){a.extend(!0,b.prototype.defaults.definitions,c)},b.extendAliases=function(c){a.extend(!0,b.prototype.defaults.aliases,c)},
//static fn on inputmask
b.format=function(a,c,d){return b(c).format(a,d)},b.unmask=function(a,c){return b(c).unmaskedvalue(a)},b.isValid=function(a,c){return b(c).isValid(a)},b.remove=function(b){a.each(b,function(a,b){b.inputmask&&b.inputmask.remove()})},b.escapeRegex=function(a){var b=["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"];return a.replace(new RegExp("(\\"+b.join("|\\")+")","gim"),"\\$1")},b.keyCode={ALT:18,BACKSPACE:8,BACKSPACE_SAFARI:127,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91,X:88};var i=navigator.userAgent,j=/mobile/i.test(i),k=/iemobile/i.test(i),l=/iphone/i.test(i)&&!k;
//make inputmask available
return window.Inputmask=b,b}(jQuery),/*
 * Input Mask plugin for jquery
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 -	Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0-dev
 */
function(a,b){
//jquery plugin
return void 0===a.fn.inputmask&&(a.fn.inputmask=function(c,d){var e,f=this[0];if(void 0===d&&(d={}),"string"==typeof c)switch(c){case"unmaskedvalue":return f&&f.inputmask?f.inputmask.unmaskedvalue():a(f).val();case"remove":return this.each(function(){this.inputmask&&this.inputmask.remove()});case"getemptymask":return f&&f.inputmask?f.inputmask.getemptymask():"";case"hasMaskedValue"://check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
return!(!f||!f.inputmask)&&f.inputmask.hasMaskedValue();case"isComplete":return!f||!f.inputmask||f.inputmask.isComplete();case"getmetadata"://return mask metadata if exists
return f&&f.inputmask?f.inputmask.getmetadata():void 0;case"setvalue":a(f).val(d),f&&void 0===f.inputmask&&//reactivate jquery.clone
a(f).triggerHandler("setvalue");break;case"option":if("string"!=typeof d)return this.each(function(){if(void 0!==this.inputmask)return this.inputmask.option(d)});if(f&&void 0!==f.inputmask)return f.inputmask.option(d);break;default:return d.alias=c,e=new b(d),this.each(function(){e.mask(this)})}else{if("object"==typeof c)return e=new b(c),void 0===c.mask&&void 0===c.alias?this.each(function(){return void 0!==this.inputmask?this.inputmask.option(c):void e.mask(this)}):this.each(function(){e.mask(this)});if(void 0===c)
//look for data-inputmask atributes
return this.each(function(){e=new b(d),e.mask(this)})}}),a.fn.inputmask}(jQuery,Inputmask),/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 -  Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 0.0.0-dev

 Optional extensions on the jquery.inputmask base
 */
function(a,b){
//date & time aliases
return b.extendDefinitions({h:{//hours
validator:"[01][0-9]|2[0-3]",cardinality:2,prevalidator:[{validator:"[0-2]",cardinality:1}]},s:{//seconds || minutes
validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:"[0-5]",cardinality:1}]},d:{//basic day
validator:"0[1-9]|[12][0-9]|3[01]",cardinality:2,prevalidator:[{validator:"[0-3]",cardinality:1}]},m:{//basic month
validator:"0[1-9]|1[012]",cardinality:2,prevalidator:[{validator:"[01]",cardinality:1}]},y:{//basic year
validator:"(19|20)\\d{2}",cardinality:4,prevalidator:[{validator:"[12]",cardinality:1},{validator:"(19|20)",cardinality:2},{validator:"(19|20)\\d",cardinality:3}]}}),b.extendAliases({"dd/mm/yyyy":{mask:"1/2/y",placeholder:"dd/mm/yyyy",regex:{val1pre:new RegExp("[0-3]"),//daypre
val1:new RegExp("0[1-9]|[12][0-9]|3[01]"),//day
val2pre:function(a){var c=b.escapeRegex.call(this,a);return new RegExp("((0[1-9]|[12][0-9]|3[01])"+c+"[01])")},//monthpre
val2:function(a){var c=b.escapeRegex.call(this,a);return new RegExp("((0[1-9]|[12][0-9])"+c+"(0[1-9]|1[012]))|(30"+c+"(0[13-9]|1[012]))|(31"+c+"(0[13578]|1[02]))")}},leapday:"29/02/",separator:"/",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(a,b,c){if(isNaN(a))return!1;var d=parseInt(a.concat(b.toString().slice(a.length))),e=parseInt(a.concat(c.toString().slice(a.length)));return!isNaN(d)&&(b<=d&&d<=c)||!isNaN(e)&&(b<=e&&e<=c)},determinebaseyear:function(a,b,c){var d=(new Date).getFullYear();if(a>d)return a;if(b<d){for(var e=b.toString().slice(0,2),f=b.toString().slice(2,4);b<e+c;)e--;var g=e+f;return a>g?a:g}if(a<=d&&d<=b){for(var h=d.toString().slice(0,2);b<h+c;)h--;var i=h+c;return i<a?a:i}return d},onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey&&c.keyCode===b.keyCode.RIGHT){var h=new Date;g.val(h.getDate().toString()+(h.getMonth()+1).toString()+h.getFullYear().toString()),g.trigger("setvalue")}},getFrontValue:function(a,b,c){for(var d=0,e=0,f=0;f<a.length&&"2"!==a.charAt(f);f++){var g=c.definitions[a.charAt(f)];g?(d+=e,e=g.cardinality):e++}return b.join("").substr(d,e)},definitions:{1:{//val1 ~ day or month
validator:function(a,b,c,d,e){var f=e.regex.val1.test(a);return d||f||a.charAt(1)!==e.separator&&"-./".indexOf(a.charAt(1))===-1||!(f=e.regex.val1.test("0"+a.charAt(0)))?f:(b.buffer[c-1]="0",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)})},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=a;isNaN(b.buffer[c+1])||(f+=b.buffer[c+1]);var g=1===f.length?e.regex.val1pre.test(f):e.regex.val1.test(f);if(!d&&!g){if(g=e.regex.val1.test(a+"0"))return b.buffer[c]=a,b.buffer[++c]="0",{pos:c,c:"0"};if(g=e.regex.val1.test("0"+a))return b.buffer[c]="0",c++,{pos:c}}return g},cardinality:1}]},2:{//val2 ~ day or month
validator:function(a,b,c,d,e){var f=e.getFrontValue(b.mask,b.buffer,e);f.indexOf(e.placeholder[0])!==-1&&(f="01"+e.separator);var g=e.regex.val2(e.separator).test(f+a);if(!d&&!g&&(a.charAt(1)===e.separator||"-./".indexOf(a.charAt(1))!==-1)&&(g=e.regex.val2(e.separator).test(f+"0"+a.charAt(0))))return b.buffer[c-1]="0",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)};
//check leap yeap
if(e.mask.indexOf("2")===e.mask.length-1&&g){var h=b.buffer.join("").substr(4,4)+a;if(h!==e.leapday)return!0;var i=parseInt(b.buffer.join("").substr(0,4),10);//detect leap year
//detect leap year
return i%4===0&&(i%100!==0||i%400===0)}return g},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){isNaN(b.buffer[c+1])||(a+=b.buffer[c+1]);var f=e.getFrontValue(b.mask,b.buffer,e);f.indexOf(e.placeholder[0])!==-1&&(f="01"+e.separator);var g=1===a.length?e.regex.val2pre(e.separator).test(f+a):e.regex.val2(e.separator).test(f+a);return d||g||!(g=e.regex.val2(e.separator).test(f+"0"+a))?g:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},y:{//year
validator:function(a,b,c,d,e){if(e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)){var f=b.buffer.join("").substr(0,6);if(f!==e.leapday)return!0;var g=parseInt(a,10);//detect leap year
//detect leap year
return g%4===0&&(g%100!==0||g%400===0)}return!1},cardinality:4,prevalidator:[{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+"0").toString().slice(0,1);if(f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+"0").toString().slice(0,2),f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),b.buffer[c++]=g.charAt(1),{pos:c}}return f},cardinality:1},{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2);if(f=e.isInYearRange(a[0]+g[1]+a[1],e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(1),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2),e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear)){var h=b.buffer.join("").substr(0,6);if(h!==e.leapday)f=!0;else{var i=parseInt(a,10);//detect leap year
f=i%4===0&&(i%100!==0||i%400===0)}}else f=!1;if(f)return b.buffer[c-1]=g.charAt(0),b.buffer[c++]=g.charAt(1),b.buffer[c++]=a.charAt(0),{refreshFromBuffer:{start:c-3,end:c},pos:c}}return f},cardinality:2},{validator:function(a,b,c,d,e){return e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)},cardinality:3}]}},insertMode:!1,autoUnmask:!1},"mm/dd/yyyy":{placeholder:"mm/dd/yyyy",alias:"dd/mm/yyyy",//reuse functionality of dd/mm/yyyy alias
regex:{val2pre:function(a){var c=b.escapeRegex.call(this,a);return new RegExp("((0[13-9]|1[012])"+c+"[0-3])|(02"+c+"[0-2])")},//daypre
val2:function(a){var c=b.escapeRegex.call(this,a);return new RegExp("((0[1-9]|1[012])"+c+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+c+"30)|((0[13578]|1[02])"+c+"31)")},//day
val1pre:new RegExp("[01]"),//monthpre
val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey&&c.keyCode===b.keyCode.RIGHT){var h=new Date;g.val((h.getMonth()+1).toString()+h.getDate().toString()+h.getFullYear().toString()),g.trigger("setvalue")}}},"yyyy/mm/dd":{mask:"y/1/2",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",leapday:"/02/29",onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey&&c.keyCode===b.keyCode.RIGHT){var h=new Date;g.val(h.getFullYear().toString()+(h.getMonth()+1).toString()+h.getDate().toString()),g.trigger("setvalue")}}},"dd.mm.yyyy":{mask:"1.2.y",placeholder:"dd.mm.yyyy",leapday:"29.02.",separator:".",alias:"dd/mm/yyyy"},"dd-mm-yyyy":{mask:"1-2-y",placeholder:"dd-mm-yyyy",leapday:"29-02-",separator:"-",alias:"dd/mm/yyyy"},"mm.dd.yyyy":{mask:"1.2.y",placeholder:"mm.dd.yyyy",leapday:"02.29.",separator:".",alias:"mm/dd/yyyy"},"mm-dd-yyyy":{mask:"1-2-y",placeholder:"mm-dd-yyyy",leapday:"02-29-",separator:"-",alias:"mm/dd/yyyy"},"yyyy.mm.dd":{mask:"y.1.2",placeholder:"yyyy.mm.dd",leapday:".02.29",separator:".",alias:"yyyy/mm/dd"},"yyyy-mm-dd":{mask:"y-1-2",placeholder:"yyyy-mm-dd",leapday:"-02-29",separator:"-",alias:"yyyy/mm/dd"},datetime:{mask:"1/2/y h:s",placeholder:"dd/mm/yyyy hh:mm",alias:"dd/mm/yyyy",regex:{hrspre:new RegExp("[012]"),//hours pre
hrs24:new RegExp("2[0-4]|1[3-9]"),hrs:new RegExp("[01][0-9]|2[0-4]"),//hours
ampm:new RegExp("^[a|p|A|P][m|M]"),mspre:new RegExp("[0-5]"),//minutes/seconds pre
ms:new RegExp("[0-5][0-9]")},timeseparator:":",hourFormat:"24",// or 12
definitions:{h:{//hours
validator:function(a,b,c,d,e){if("24"===e.hourFormat&&24===parseInt(a,10))return b.buffer[c-1]="0",b.buffer[c]="0",{refreshFromBuffer:{start:c-1,end:c},c:"0"};var f=e.regex.hrs.test(a);if(!d&&!f&&(a.charAt(1)===e.timeseparator||"-.:".indexOf(a.charAt(1))!==-1)&&(f=e.regex.hrs.test("0"+a.charAt(0))))return b.buffer[c-1]="0",b.buffer[c]=a.charAt(0),c++,{refreshFromBuffer:{start:c-2,end:c},pos:c,c:e.timeseparator};if(f&&"24"!==e.hourFormat&&e.regex.hrs24.test(a)){var g=parseInt(a,10);return 24===g?(b.buffer[c+5]="a",b.buffer[c+6]="m"):(b.buffer[c+5]="p",b.buffer[c+6]="m"),g-=12,g<10?(b.buffer[c]=g.toString(),b.buffer[c-1]="0"):(b.buffer[c]=g.toString().charAt(1),b.buffer[c-1]=g.toString().charAt(0)),{refreshFromBuffer:{start:c-1,end:c+6},c:b.buffer[c]}}return f},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.hrspre.test(a);return d||f||!(f=e.regex.hrs.test("0"+a))?f:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},s:{//seconds || minutes
validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.mspre.test(a);return d||f||!(f=e.regex.ms.test("0"+a))?f:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},t:{//am/pm
validator:function(a,b,c,d,e){return e.regex.ampm.test(a+"m")},casing:"lower",cardinality:1}},insertMode:!1,autoUnmask:!1},datetime12:{mask:"1/2/y h:s t\\m",placeholder:"dd/mm/yyyy hh:mm xm",alias:"datetime",hourFormat:"12"},"mm/dd/yyyy hh:mm xm":{mask:"1/2/y h:s t\\m",placeholder:"mm/dd/yyyy hh:mm xm",alias:"datetime12",regex:{val2pre:function(a){var c=b.escapeRegex.call(this,a);return new RegExp("((0[13-9]|1[012])"+c+"[0-3])|(02"+c+"[0-2])")},val2:function(a){var c=b.escapeRegex.call(this,a);return new RegExp("((0[1-9]|1[012])"+c+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+c+"30)|((0[13578]|1[02])"+c+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey&&c.keyCode===b.keyCode.RIGHT){var h=new Date;g.val((h.getMonth()+1).toString()+h.getDate().toString()+h.getFullYear().toString()),g.trigger("setvalue")}}},"hh:mm t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"h:s t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm:ss":{mask:"h:s:s",placeholder:"hh:mm:ss",alias:"datetime",autoUnmask:!1},"hh:mm":{mask:"h:s",placeholder:"hh:mm",alias:"datetime",autoUnmask:!1},date:{alias:"dd/mm/yyyy"},"mm/yyyy":{mask:"1/y",placeholder:"mm/yyyy",leapday:"donotuse",separator:"/",alias:"mm/dd/yyyy"},shamsi:{regex:{val2pre:function(a){var c=b.escapeRegex.call(this,a);return new RegExp("((0[1-9]|1[012])"+c+"[0-3])")},val2:function(a){var c=b.escapeRegex.call(this,a);return new RegExp("((0[1-9]|1[012])"+c+"(0[1-9]|[12][0-9]))|((0[1-9]|1[012])"+c+"30)|((0[1-6])"+c+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},yearrange:{minyear:1300,maxyear:1499},mask:"y/1/2",leapday:"/12/30",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",clearIncomplete:!0}}),b}(jQuery,Inputmask),/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 -  Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 0.0.0-dev

 Optional extensions on the jquery.inputmask base
 */
function(a,b){
//extra definitions
return b.extendDefinitions({A:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,casing:"upper"},"&":{//alfanumeric uppercasing
validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,casing:"upper"},"#":{//hexadecimal
validator:"[0-9A-Fa-f]",cardinality:1,casing:"upper"}}),b.extendAliases({url:{definitions:{i:{validator:".",cardinality:1}},mask:"(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",insertMode:!1,autoUnmask:!1},ip:{//ip-address mask
mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function(a,b,c,d,e){return c-1>-1&&"."!==b.buffer[c-1]?(a=b.buffer[c-1]+a,a=c-2>-1&&"."!==b.buffer[c-2]?b.buffer[c-2]+a:"0"+a):a="00"+a,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a)},cardinality:1}},onUnMask:function(a,b,c){return a}},email:{
//https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
//https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
//should be extended with the toplevel domains at the end
mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",greedy:!1,onBeforePaste:function(a,b){return a=a.toLowerCase(),a.replace("mailto:","")},definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",cardinality:1,casing:"lower"},"-":{validator:"[0-9A-Za-z-]",cardinality:1,casing:"lower"}},onUnMask:function(a,b,c){return a}},mac:{mask:"##:##:##:##:##:##"},
//https://en.wikipedia.org/wiki/Vehicle_identification_number
// see issue #1199
vin:{mask:"V{13}9{4}",definitions:{V:{validator:"[A-HJ-NPR-Za-hj-npr-z\\d]",cardinality:1,casing:"upper"}},clearIncomplete:!0,autoUnmask:!0}}),b}(jQuery,Inputmask),/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 - Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 0.0.0-dev

 Optional extensions on the jquery.inputmask base
 */
function(a,b){
//number aliases
return b.extendAliases({numeric:{mask:function(a){function c(b){for(var c="",d=0;d<b.length;d++)c+=a.definitions[b.charAt(d)]||a.optionalmarker.start===b.charAt(d)||a.optionalmarker.end===b.charAt(d)||a.quantifiermarker.start===b.charAt(d)||a.quantifiermarker.end===b.charAt(d)||a.groupmarker.start===b.charAt(d)||a.groupmarker.end===b.charAt(d)||a.alternatormarker===b.charAt(d)?"\\"+b.charAt(d):b.charAt(d);return c}if(0!==a.repeat&&isNaN(a.integerDigits)&&(a.integerDigits=a.repeat),a.repeat=0,a.groupSeparator===a.radixPoint&&(//treat equal separator and radixpoint
"."===a.radixPoint?a.groupSeparator=",":","===a.radixPoint?a.groupSeparator=".":a.groupSeparator="")," "===a.groupSeparator&&(//prevent conflict with default skipOptionalPartCharacter
a.skipOptionalPartCharacter=void 0),a.autoGroup=a.autoGroup&&""!==a.groupSeparator,a.autoGroup&&("string"==typeof a.groupSize&&isFinite(a.groupSize)&&(a.groupSize=parseInt(a.groupSize)),isFinite(a.integerDigits))){var d=Math.floor(a.integerDigits/a.groupSize),e=a.integerDigits%a.groupSize;a.integerDigits=parseInt(a.integerDigits)+(0===e?d-1:d),a.integerDigits<1&&(a.integerDigits="*")}
//enforce placeholder to single
a.placeholder.length>1&&(a.placeholder=a.placeholder.charAt(0)),
//only allow radixfocus when placeholder = 0
"radixFocus"===a.positionCaretOnClick&&""===a.placeholder&&a.integerOptional===!1&&(a.positionCaretOnClick="lvp"),a.definitions[";"]=a.definitions["~"],//clone integer def for decimals
a.definitions[";"].definitionSymbol="~",a.numericInput===!0&&(//finance people input style
a.positionCaretOnClick="radixFocus"===a.positionCaretOnClick?"lvp":a.positionCaretOnClick,a.digitsOptional=!1,isNaN(a.digits)&&(a.digits=2),a.decimalProtect=!1);var f=c(a.prefix);//enforce greedy false
//convert min and max options
return f+="[+]",f+=a.integerOptional===!0?"~{1,"+a.integerDigits+"}":"~{"+a.integerDigits+"}",void 0!==a.digits&&(isNaN(a.digits)||parseInt(a.digits)>0)&&(a.decimalProtect&&(a.radixPointDefinitionSymbol=":"),f+=a.digitsOptional?"["+(a.decimalProtect?":":a.radixPoint)+";{1,"+a.digits+"}]":(a.decimalProtect?":":a.radixPoint)+";{"+a.digits+"}"),f+="[-]",f+=c(a.suffix),a.greedy=!1,null!==a.min&&(a.min=a.min.toString().replace(new RegExp(b.escapeRegex(a.groupSeparator),"g"),""),","===a.radixPoint&&(a.min=a.min.replace(a.radixPoint,"."))),null!==a.max&&(a.max=a.max.toString().replace(new RegExp(b.escapeRegex(a.groupSeparator),"g"),""),","===a.radixPoint&&(a.max=a.max.replace(a.radixPoint,"."))),f},placeholder:"",greedy:!1,digits:"*",//number of fractionalDigits
digitsOptional:!0,radixPoint:".",positionCaretOnClick:"radixFocus",groupSize:3,groupSeparator:"",autoGroup:!1,allowPlus:!0,allowMinus:!0,negationSymbol:{front:"-",//"("
back:""},integerDigits:"+",//number of integerDigits
integerOptional:!0,prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,//do not allow assumption of decimals input without entering the radixpoint
min:null,//minimum value
max:null,//maximum value
step:1,insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,postFormat:function(c,d,e){//this needs to be removed // this is crap
// console.log(buffer);
e.numericInput===!0&&(c=c.reverse(),isFinite(d)&&(d=c.join("").length-d-1));var f,g;
//position overflow corrections
d=d>=c.length?c.length-1:d<e.prefix.length?e.prefix.length:d;var h=c[d],i=c.slice();h===e.groupSeparator&&(i.splice(d--,1),h=i[d]),
//mark current pos
i[d]="!";var j=i.join(""),k=j;if(j=j.replace(new RegExp(b.escapeRegex(e.suffix)+"$"),""),j=j.replace(new RegExp("^"+b.escapeRegex(e.prefix)),""),j.length>0&&e.autoGroup||j.indexOf(e.groupSeparator)!==-1){var l=b.escapeRegex(e.groupSeparator);j=j.replace(new RegExp(l,"g"),"");var m=j.split(h===e.radixPoint?"!":e.radixPoint);if(j=""===e.radixPoint?j:m[0],h!==e.negationSymbol.front&&(j=j.replace("!","?")),j.length>e.groupSize)for(var n=new RegExp("([-+]?[\\d?]+)([\\d?]{"+e.groupSize+"})");n.test(j)&&""!==e.groupSeparator;)j=j.replace(n,"$1"+e.groupSeparator+"$2"),j=j.replace(e.groupSeparator+e.groupSeparator,e.groupSeparator);j=j.replace("?","!"),""!==e.radixPoint&&m.length>1&&(j+=(h===e.radixPoint?"!":e.radixPoint)+m[1])}j=e.prefix+j+e.suffix;var o=k!==j;if(o)//align the length
for(c.length=j.length,f=0,g=j.length;f<g;f++)c[f]=j.charAt(f);var p=a.inArray("!",j);
// console.log("formatted " + buffer + " refresh " + needsRefresh);
return c[p]=h,p=e.numericInput&&isFinite(d)?c.join("").length-p-1:p,e.numericInput&&(c=c.reverse(),a.inArray(e.radixPoint,c)<p&&c.join("").length-e.suffix.length!==p&&(p-=1)),{pos:p,refreshFromBuffer:o,buffer:c}},onBeforeWrite:function(c,d,e,f){var g;if(c&&("blur"===c.type||"checkval"===c.type||"keydown"===c.type)){var h=f.numericInput?d.slice().reverse().join(""):d.join(""),i=h.replace(f.prefix,"");i=i.replace(f.suffix,""),i=i.replace(new RegExp(b.escapeRegex(f.groupSeparator),"g"),""),","===f.radixPoint&&(i=i.replace(f.radixPoint,"."));
//handle negation symbol
var j=i.match(new RegExp("[-"+b.escapeRegex(f.negationSymbol.front)+"]","g"));if(j=null!==j&&1===j.length,i=i.replace(new RegExp("[-"+b.escapeRegex(f.negationSymbol.front)+"]","g"),""),i=i.replace(new RegExp(b.escapeRegex(f.negationSymbol.back)+"$"),""),
//strip placeholder at the end
isNaN(f.placeholder)&&(i=i.replace(new RegExp(b.escapeRegex(f.placeholder),"g"),"")),i=i===f.negationSymbol.front?i+"0":i,""!==i&&isFinite(i)){var k=parseFloat(i),l=j?k*-1:k;if(null!==f.min&&isFinite(f.min)&&l<parseFloat(f.min)?(k=Math.abs(f.min),j=f.min<0,h=void 0):null!==f.max&&isFinite(f.max)&&l>parseFloat(f.max)&&(k=Math.abs(f.max),j=f.max<0,h=void 0),i=k.toString().replace(".",f.radixPoint).split(""),isFinite(f.digits)){var m=a.inArray(f.radixPoint,i),n=a.inArray(f.radixPoint,h);m===-1&&(i.push(f.radixPoint),m=i.length-1);for(var o=1;o<=f.digits;o++)f.digitsOptional||void 0!==i[m+o]&&i[m+o]!==f.placeholder.charAt(0)?n!==-1&&void 0!==h[n+o]&&(i[m+o]=i[m+o]||h[n+o]):i[m+o]="0";i[i.length-1]===f.radixPoint&&delete i[i.length-1]}if(k.toString()!==i&&k.toString()+"."!==i||j)return!j||0===k&&"blur"===c.type||(i.unshift(f.negationSymbol.front),i.push(f.negationSymbol.back)),i=(f.prefix+i.join("")).split(""),f.numericInput&&(i=i.reverse()),g=f.postFormat(i,f.numericInput?e:e-1,f),g.buffer&&(g.refreshFromBuffer=g.buffer.join("")!==d.join("")),g}}if(f.autoGroup)return g=f.postFormat(d,f.numericInput?e:e-1,f),g.caret=e<=f.prefix.length?g.pos:g.pos+1,g},regex:{integerPart:function(a){return new RegExp("["+b.escapeRegex(a.negationSymbol.front)+"+]?\\d+")},integerNPart:function(a){return new RegExp("[\\d"+b.escapeRegex(a.groupSeparator)+b.escapeRegex(a.placeholder.charAt(0))+"]+")}},signHandler:function(a,b,c,d,e){if(!d&&e.allowMinus&&"-"===a||e.allowPlus&&"+"===a){var f=b.buffer.join("").match(e.regex.integerPart(e));if(f&&f[0].length>0)return b.buffer[f.index]===("-"===a?"+":e.negationSymbol.front)?"-"===a?""!==e.negationSymbol.back?{pos:f.index,c:e.negationSymbol.front,remove:f.index,caret:c,insert:{pos:b.buffer.length-e.suffix.length-1,c:e.negationSymbol.back}}:{pos:f.index,c:e.negationSymbol.front,remove:f.index,caret:c}:""!==e.negationSymbol.back?{pos:f.index,c:"+",remove:[f.index,b.buffer.length-e.suffix.length-1],caret:c}:{pos:f.index,c:"+",remove:f.index,caret:c}:b.buffer[f.index]===("-"===a?e.negationSymbol.front:"+")?"-"===a&&""!==e.negationSymbol.back?{remove:[f.index,b.buffer.length-e.suffix.length-1],caret:c-1}:{remove:f.index,caret:c-1}:"-"===a?""!==e.negationSymbol.back?{pos:f.index,c:e.negationSymbol.front,caret:c+1,insert:{pos:b.buffer.length-e.suffix.length,c:e.negationSymbol.back}}:{pos:f.index,c:e.negationSymbol.front,caret:c+1}:{pos:f.index,c:a,caret:c+1}}return!1},radixHandler:function(b,c,d,e,f){if(!e&&f.numericInput!==!0&&b===f.radixPoint&&void 0!==f.digits&&(isNaN(f.digits)||parseInt(f.digits)>0)){var g=a.inArray(f.radixPoint,c.buffer),h=c.buffer.join("").match(f.regex.integerPart(f));if(g!==-1&&c.validPositions[g])return c.validPositions[g-1]?{caret:g+1}:{pos:h.index,c:h[0],caret:g+1};if(!h||"0"===h[0]&&h.index+1!==d)return c.buffer[h?h.index:d]="0",{pos:(h?h.index:d)+1,c:f.radixPoint}}return!1},leadingZeroHandler:function(b,c,d,e,f,g){if(!e){var h=c.buffer.slice("");if(h.splice(0,f.prefix.length),h.splice(h.length-f.suffix.length,f.suffix.length),f.numericInput===!0){var h=h.reverse(),i=h[0];if("0"===i&&void 0===c.validPositions[d-1])return{pos:d,remove:h.length-1}}else{d-=f.prefix.length;var j=a.inArray(f.radixPoint,h),k=h.slice(0,j!==-1?j:void 0).join("").match(f.regex.integerNPart(f));if(k&&(j===-1||d<=j)){var l=j===-1?0:parseInt(h.slice(j+1).join(""));if(0===k[0].indexOf(""!==f.placeholder?f.placeholder.charAt(0):"0")&&(k.index+1===d||g!==!0&&0===l))return c.buffer.splice(k.index+f.prefix.length,1),{pos:k.index+f.prefix.length,remove:k.index+f.prefix.length};if("0"===b&&d<=k.index&&k[0]!==f.groupSeparator)return!1}}}return!0},definitions:{"~":{validator:function(c,d,e,f,g,h){var i=g.signHandler(c,d,e,f,g);if(!i&&(i=g.radixHandler(c,d,e,f,g),!i&&(i=f?new RegExp("[0-9"+b.escapeRegex(g.groupSeparator)+"]").test(c):new RegExp("[0-9]").test(c),i===!0&&(i=g.leadingZeroHandler(c,d,e,f,g,h),i===!0)))){
//handle overwrite when fixed precision
var j=a.inArray(g.radixPoint,d.buffer);i=j!==-1&&(g.digitsOptional===!1||d.validPositions[e])&&g.numericInput!==!0&&e>j&&!f?{pos:e,remove:e}:{pos:e}}return i},cardinality:1},"+":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&(d&&e.allowMinus&&a===e.negationSymbol.front||e.allowMinus&&"-"===a||e.allowPlus&&"+"===a)&&(f=!(!d&&"-"===a)||(""!==e.negationSymbol.back?{pos:c,c:"-"===a?e.negationSymbol.front:"+",caret:c+1,insert:{pos:b.buffer.length,c:e.negationSymbol.back}}:{pos:c,c:"-"===a?e.negationSymbol.front:"+",caret:c+1})),f},cardinality:1,placeholder:""},"-":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&d&&e.allowMinus&&a===e.negationSymbol.back&&(f=!0),f},cardinality:1,placeholder:""},":":{validator:function(a,c,d,e,f){var g=f.signHandler(a,c,d,e,f);if(!g){var h="["+b.escapeRegex(f.radixPoint)+"]";g=new RegExp(h).test(a),g&&c.validPositions[d]&&c.validPositions[d].match.placeholder===f.radixPoint&&(g={caret:d+1})}return g?{c:f.radixPoint}:g},cardinality:1,placeholder:function(a){return a.radixPoint}}},onUnMask:function(a,c,d){if(""===c&&d.nullable===!0)return c;var e=a.replace(d.prefix,"");return e=e.replace(d.suffix,""),e=e.replace(new RegExp(b.escapeRegex(d.groupSeparator),"g"),""),d.unmaskAsNumber?(""!==d.radixPoint&&e.indexOf(d.radixPoint)!==-1&&(e=e.replace(b.escapeRegex.call(this,d.radixPoint),".")),Number(e)):e},isComplete:function(a,c){var d=a.join(""),e=a.slice();if(
//verify separator positions
c.postFormat(e,0,c),e.join("")!==d)return!1;var f=d.replace(c.prefix,"");return f=f.replace(c.suffix,""),f=f.replace(new RegExp(b.escapeRegex(c.groupSeparator),"g"),""),","===c.radixPoint&&(f=f.replace(b.escapeRegex(c.radixPoint),".")),isFinite(f)},onBeforeMask:function(a,c){if(""!==c.radixPoint&&isFinite(a))a=a.toString().replace(".",c.radixPoint);else{var d=a.match(/,/g),e=a.match(/\./g);e&&d?e.length>d.length?(a=a.replace(/\./g,""),a=a.replace(",",c.radixPoint)):d.length>e.length?(a=a.replace(/,/g,""),a=a.replace(".",c.radixPoint))://equal
a=a.indexOf(".")<a.indexOf(",")?a.replace(/\./g,""):a=a.replace(/,/g,""):a=a.replace(new RegExp(b.escapeRegex(c.groupSeparator),"g"),"")}if(0===c.digits&&(a.indexOf(".")!==-1?a=a.substring(0,a.indexOf(".")):a.indexOf(",")!==-1&&(a=a.substring(0,a.indexOf(",")))),""!==c.radixPoint&&isFinite(c.digits)&&a.indexOf(c.radixPoint)!==-1){var f=a.split(c.radixPoint),g=f[1].match(new RegExp("\\d*"))[0];if(parseInt(c.digits)<g.toString().length){var h=Math.pow(10,parseInt(c.digits));
//make the initialValue a valid javascript number for the parsefloat
a=a.replace(b.escapeRegex(c.radixPoint),"."),a=Math.round(parseFloat(a)*h)/h,a=a.toString().replace(".",c.radixPoint)}}return a.toString()},canClearPosition:function(a,b,c,d,e){var f=a.validPositions[b].input,g=f!==e.radixPoint||null!==a.validPositions[b].match.fn&&e.decimalProtect===!1||isFinite(f)||b===c||f===e.groupSeparator||f===e.negationSymbol.front||f===e.negationSymbol.back;return g},onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey)switch(c.keyCode){case b.keyCode.UP:g.val(parseFloat(this.inputmask.unmaskedvalue())+parseInt(f.step)),g.trigger("setvalue");break;case b.keyCode.DOWN:g.val(parseFloat(this.inputmask.unmaskedvalue())-parseInt(f.step)),g.trigger("setvalue")}}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:0,radixPoint:""},percentage:{alias:"numeric",digits:2,radixPoint:".",placeholder:"0",autoGroup:!1,min:0,max:100,suffix:" %",allowPlus:!1,allowMinus:!1}}),b}(jQuery,Inputmask),/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 -  Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 0.0.0-dev

 Phone extension.

 */
function(a,b){return b.extendAliases({abstractphone:{countrycode:"",phoneCodes:[],mask:function(a){a.definitions={"#":a.definitions[9]};var b=a.phoneCodes.sort(function(a,b){var c=(a.mask||a).replace(/#/g,"9").replace(/[\+\(\)#-]/g,""),d=(b.mask||b).replace(/#/g,"9").replace(/[\+\(\)#-]/g,"");return c<d?-1:1});return b},keepStatic:!0,onBeforeMask:function(a,b){var c=a.replace(/^0{1,2}/,"").replace(/[\s]/g,"");return(c.indexOf(b.countrycode)>1||c.indexOf(b.countrycode)===-1)&&(c="+"+b.countrycode+c),c},onUnMask:function(a,b,c){
//implement me
return b}}}),b}(jQuery,Inputmask),/*
 Input Mask plugin extensions
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 -  Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 0.0.0-dev

 Regex extensions on the jquery.inputmask base
 Allows for using regular expressions as a mask
 */
function(a,b){return b.extendAliases({// $(selector).inputmask("Regex", { regex: "[0-9]*"}
Regex:{mask:"r",greedy:!1,repeat:"*",regex:null,regexTokens:null,
//Thx to https://github.com/slevithan/regex-colorizer for the tokenizer regex
tokenizer:/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,quantifierFilter:/[0-9]+[^,]/,isComplete:function(a,b){return new RegExp(b.regex).test(a.join(""))},definitions:{r:{validator:function(b,c,d,e,f){function g(a,b){this.matches=[],this.isGroup=a||!1,this.isQuantifier=b||!1,this.quantifier={min:1,max:1},this.repeaterPart=void 0}function h(){var a,b,c=new g,d=[];
// The tokenizer regex does most of the tokenization grunt work
for(f.regexTokens=[];a=f.tokenizer.exec(f.regex);)switch(b=a[0],b.charAt(0)){case"(":// Group opening
d.push(new g((!0)));break;case")":// Group closing
k=d.pop(),d.length>0?d[d.length-1].matches.push(k):c.matches.push(k);break;case"{":case"+":case"*"://Quantifier
var e=new g((!1),(!0));b=b.replace(/[{}]/g,"");var h=b.split(","),i=isNaN(h[0])?h[0]:parseInt(h[0]),j=1===h.length?i:isNaN(h[1])?h[1]:parseInt(h[1]);if(e.quantifier={min:i,max:j},d.length>0){var l=d[d.length-1].matches;a=l.pop(),a.isGroup||(k=new g((!0)),k.matches.push(a),a=k),l.push(a),l.push(e)}else a=c.matches.pop(),a.isGroup||(k=new g((!0)),k.matches.push(a),a=k),c.matches.push(a),c.matches.push(e);break;default:d.length>0?d[d.length-1].matches.push(b):c.matches.push(b)}c.matches.length>0&&f.regexTokens.push(c)}function i(b,c){var d=!1;c&&(m+="(",o++);for(var e=0;e<b.matches.length;e++){var f=b.matches[e];if(f.isGroup===!0)d=i(f,!0);else if(f.isQuantifier===!0){var g=a.inArray(f,b.matches),h=b.matches[g-1],k=m;if(isNaN(f.quantifier.max)){for(;f.repeaterPart&&f.repeaterPart!==m&&f.repeaterPart.length>m.length&&!(d=i(h,!0)););d=d||i(h,!0),d&&(f.repeaterPart=m),m=k+f.quantifier.max}else{for(var l=0,n=f.quantifier.max-1;l<n&&!(d=i(h,!0));l++);m=k+"{"+f.quantifier.min+","+f.quantifier.max+"}"}}else if(void 0!==f.matches)for(var p=0;p<f.length&&!(d=i(f[p],c));p++);else{var q;if("["==f.charAt(0)){q=m,q+=f;for(var r=0;r<o;r++)q+=")";var s=new RegExp("^("+q+")$");d=s.test(j)}else for(var t=0,u=f.length;t<u;t++)if("\\"!==f.charAt(t)){q=m,q+=f.substr(0,t+1),q=q.replace(/\|$/,"");for(var r=0;r<o;r++)q+=")";var s=new RegExp("^("+q+")$");if(d=s.test(j))break}m+=f}if(d)break}return c&&(m+=")",o--),d}var j,k,l=c.buffer.slice(),m="",n=!1,o=0;null===f.regexTokens&&h(),l.splice(d,0,b),j=l.join("");for(var p=0;p<f.regexTokens.length;p++){var q=f.regexTokens[p];if(n=i(q,q.isGroup))break}return n},cardinality:1}}}}),b}(jQuery,Inputmask);