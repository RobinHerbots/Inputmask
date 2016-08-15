/*!
* jquery.inputmask.min.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2016 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.2-106
*/
/*
 * Input Mask plugin for jquery
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 -	Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0-dev
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","inputmask"],a):"object"==typeof exports?module.exports=a(require("jquery"),require("./inputmask")):a(jQuery,window.Inputmask)}(function(a,b){
//jquery plugin
return void 0===a.fn.inputmask&&(a.fn.inputmask=function(c,d){var e,f=this[0];if(void 0===d&&(d={}),"string"==typeof c)switch(c){case"unmaskedvalue":return f&&f.inputmask?f.inputmask.unmaskedvalue():a(f).val();case"remove":return this.each(function(){this.inputmask&&this.inputmask.remove()});case"getemptymask":return f&&f.inputmask?f.inputmask.getemptymask():"";case"hasMaskedValue"://check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
return!(!f||!f.inputmask)&&f.inputmask.hasMaskedValue();case"isComplete":return!f||!f.inputmask||f.inputmask.isComplete();case"getmetadata"://return mask metadata if exists
return f&&f.inputmask?f.inputmask.getmetadata():void 0;case"setvalue":a(f).val(d),f&&void 0===f.inputmask&&//reactivate jquery.clone
a(f).triggerHandler("setvalue");break;case"option":if("string"!=typeof d)return this.each(function(){if(void 0!==this.inputmask)return this.inputmask.option(d)});if(f&&void 0!==f.inputmask)return f.inputmask.option(d);break;default:return d.alias=c,e=new b(d),this.each(function(){e.mask(this)})}else{if("object"==typeof c)return e=new b(c),void 0===c.mask&&void 0===c.alias?this.each(function(){return void 0!==this.inputmask?this.inputmask.option(c):void e.mask(this)}):this.each(function(){e.mask(this)});if(void 0===c)
//look for data-inputmask atributes
return this.each(function(){e=new b(d),e.mask(this)})}}),a.fn.inputmask});