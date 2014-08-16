/**
* @license Input Mask plugin for jquery
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 0.0.0
*
*  THIS IS A TEMPORARY HACK TO BE COMPATIBLE WITH MULTIPLE MASKS LIKE IN VERSION 2.X - WHEN THE ALTERNATOR SYNTAX IS IMPLEMENTED inputmask-multi WILL BE DELETED!!
*
*
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './jquery.inputmask'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    if ($.fn.inputmask != undefined) {
        function multiMaskScope(actionObj, masksets, opts) {
            function isInputEventSupported(eventName) {
                var el = document.createElement('input'),
                    eventName = 'on' + eventName,
                    isSupported = (eventName in el);
                if (!isSupported) {
                    el.setAttribute(eventName, 'return;');
                    isSupported = typeof el[eventName] == 'function';
                }
                el = null;
                return isSupported;
            }
            var PasteEventType = isInputEventSupported('paste') ? 'paste' : isInputEventSupported('input') ? 'input' : "propertychange",
                isRTL, el, $el, elmasks, activeMasksetIndex;

            function PatchValhookMulti(type) {
                if ($.valHooks[type] == undefined || $.valHooks[type].inputmaskmultipatch != true) {
                    var valueGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) { return elem.value; };
                    var valueSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                        elem.value = value;
                        return elem;
                    };

                    $.valHooks[type] = {
                        get: function (elem) {
                            var $elem = $(elem);
                            if ($elem.data('_inputmask-multi')) {
                                var data = $elem.data('_inputmask-multi');
                                return valueGet(data["elmasks"][data["activeMasksetIndex"]]);
                            } else return valueGet(elem);
                        },
                        set: function (elem, value) {
                            var $elem = $(elem);
                            var result = valueSet(elem, value);
                            if ($elem.data('_inputmask-multi')) $elem.triggerHandler('setvalue');
                            return result;
                        },
                        inputmaskmultipatch: true
                    };
                }
            }

            function mcaret(input, begin, end) {
                var npt = input.jquery && input.length > 0 ? input[0] : input, range;
                if (typeof begin == 'number') {
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    end = (typeof end == 'number') ? end : begin;

                    //store caret for multi scope
                    if (npt != el) {
                        var data = $(npt).data('_inputmask') || {};
                        data["caret"] = { "begin": begin, "end": end };
                        $(npt).data('_inputmask', data);
                    }
                    if (!$(npt).is(":visible")) {
                        return;
                    }

                    npt.scrollLeft = npt.scrollWidth;
                    if (opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
                    if (npt.setSelectionRange) {
                        npt.selectionStart = begin;
                        npt.selectionEnd = end;

                    } else if (npt.createTextRange) {
                        range = npt.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', begin);
                        range.select();
                    }
                } else {
                    var data = $(npt).data('_inputmask');
                    if (!$(npt).is(":visible") && data && data["caret"] != undefined) {
                        begin = data["caret"]["begin"];
                        end = data["caret"]["end"];
                    } else if (npt.setSelectionRange) {
                        begin = npt.selectionStart;
                        end = npt.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange();
                        begin = 0 - range.duplicate().moveStart('character', -100000);
                        end = begin + range.text.length;
                    }
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    return { "begin": begin, "end": end };
                }
            }

            function TranslatePosition(pos) {
                if (isRTL && typeof pos == 'number' && (!opts.greedy || opts.placeholder != "")) {
                    var bffrLght = el.value.length;
                    pos = bffrLght - pos;
                }
                return pos;
            }

            function determineActiveMask(eventType, elmasks) {

                if (eventType != "multiMaskScope") {
                    if ($.isFunction(opts.determineActiveMasksetIndex))
                        activeMasksetIndex = opts.determineActiveMasksetIndex.call($el, eventType, elmasks);
                    else {
                        var lpc = -1, cp = -1, lvp = -1;;
                        $.each(elmasks, function (ndx, lmsk) {
                            var data = $(lmsk).data('_inputmask');
                            var maskset = data["maskset"];
                            var lastValidPosition = -1, validPositionCount = 0, caretPos = mcaret(lmsk).begin;
                            for (var posNdx in maskset["validPositions"]) {
                                var psNdx = parseInt(posNdx);
                                if (psNdx > lastValidPosition) lastValidPosition = psNdx;
                                validPositionCount++;
                            }
                            if (validPositionCount > lpc
                                    || (validPositionCount == lpc && cp > caretPos && lvp > lastValidPosition)
                                    || (validPositionCount == lpc && cp == caretPos && lvp < lastValidPosition)
                            ) {
                                //console.log("lvp " + lastValidPosition + " vpc " + validPositionCount + " caret " + caretPos + " ams " + ndx);
                                lpc = validPositionCount;
                                cp = caretPos;
                                activeMasksetIndex = ndx;
                                lvp = lastValidPosition;
                            }
                        });
                    }

                    var data = $el.data('_inputmask-multi') || { "activeMasksetIndex": 0, "elmasks": elmasks };
                    data["activeMasksetIndex"] = activeMasksetIndex;
                    $el.data('_inputmask-multi', data);
                }

                if ($.inArray(eventType, ["focus"]) == -1 && el.value != elmasks[activeMasksetIndex]._valueGet()) {
                    var value = $(elmasks[activeMasksetIndex]).val() == "" ? elmasks[activeMasksetIndex]._valueGet() : $(elmasks[activeMasksetIndex]).val();
                    el.value = value;
                }
                if ($.inArray(eventType, ["blur", "focus"]) == -1) {
                    if ($(elmasks[activeMasksetIndex]).hasClass("focus-inputmask")) {
                        var activeCaret = mcaret(elmasks[activeMasksetIndex]);
                        mcaret(el, activeCaret.begin, activeCaret.end);
                    }
                }
            }

            opts.multi = true;

            function mask(npt) {
                el = npt;
                $el = $(el);
                isRTL = el.dir == "rtl" || opts.numericInput;
                activeMasksetIndex = 0;
                elmasks = $.map(masksets, function (msk, ndx) {
                    if (isFinite(ndx)) { //handle extension in the prototype of array for ie8
                        var elMaskStr = '<input type="text" ';
                        if ($el.attr("value")) elMaskStr += 'value="' + $el.attr("value") + '" ';
                        if ($el.attr("dir")) elMaskStr += 'dir="' + $el.attr("dir") + '" ';
                        elMaskStr += '/>';
                        var elmask = $(elMaskStr)[0];
                        $(elmask).inputmask($.extend({}, opts, { mask: msk.mask }));
                        return elmask;
                    }
                });

                $el.data('_inputmask-multi', { "activeMasksetIndex": 0, "elmasks": elmasks });
                if (el.dir == "rtl" || opts.rightAlign)
                    $el.css("text-align", "right");
                el.dir = "ltr";
                $el.removeAttr("dir");
                if ($el.attr("value") != "") {
                    determineActiveMask("init", elmasks);
                }

                $el.bind("mouseenter blur focus mouseleave click dblclick keydown keypress keypress", function (e) {
                    var caretPos = mcaret(el), k, goDetermine = true;
                    if (e.type == "keydown") {
                        k = e.keyCode;
                        if (k == opts.keyCode.DOWN && activeMasksetIndex < elmasks.length - 1) {
                            activeMasksetIndex++;
                            determineActiveMask("multiMaskScope", elmasks);
                            return false;
                        } else if (k == opts.keyCode.UP && activeMasksetIndex > 0) {
                            activeMasksetIndex--;
                            determineActiveMask("multiMaskScope", elmasks);
                            return false;
                        }
                        if (e.ctrlKey || k == opts.keyCode.SHIFT || e.altKey) {
                            return true;
                        }
                    } else if (e.type == "keypress" && (e.ctrlKey || k == opts.keyCode.SHIFT || e.altKey)) {
                        return true;
                    }
                    $.each(elmasks, function (ndx, lmnt) {
                        if (e.type == "keydown") {
                            k = e.keyCode;

                            if (k == opts.keyCode.BACKSPACE && lmnt._valueGet().length < caretPos.begin) {
                                return;
                            } else if (k == opts.keyCode.TAB) {
                                goDetermine = false;
                            } else if (k == opts.keyCode.RIGHT) {
                                mcaret(lmnt, caretPos.begin + 1, caretPos.end + 1);
                                goDetermine = false;
                                return;
                            } else if (k == opts.keyCode.LEFT) {
                                mcaret(lmnt, caretPos.begin - 1, caretPos.end - 1);
                                goDetermine = false;
                                return;
                            }
                        }
                        if ($.inArray(e.type, ["click"]) != -1) {
                            mcaret(lmnt, TranslatePosition(caretPos.begin), TranslatePosition(caretPos.end));
                            if (caretPos.begin != caretPos.end) {
                                goDetermine = false;
                                return;
                            }
                        }

                        if ($.inArray(e.type, ["keydown"]) != -1 && caretPos.begin != caretPos.end) {
                            mcaret(lmnt, caretPos.begin, caretPos.end);
                        }

                        $(lmnt).triggerHandler(e);
                    });
                    if (goDetermine) {
                        setTimeout(function () {
                            determineActiveMask(e.type, elmasks);
                        }, 0);
                    }
                });
                $el.bind(PasteEventType + " dragdrop drop setvalue", function (e) {
                    var caretPos = mcaret(el);
                    setTimeout(function () {
                        $.each(elmasks, function (ndx, lmnt) {
                            lmnt._valueSet(el.value);
                            $(lmnt).triggerHandler(e);
                        });
                        setTimeout(function () {
                            determineActiveMask(e.type, elmasks);
                        }, 0);
                    }, 0);
                });
                PatchValhookMulti(el.type);
            }

            //action object
            if (actionObj != undefined) {
                switch (actionObj["action"]) {
                    case "isComplete":
                        $el = $(actionObj["el"]);
                        var imdata = $el.data('_inputmask-multi'),
                            activeMask = imdata["elmasks"][imdata["activeMasksetIndex"]];
                        return $(activeMask).inputmask("isComplete");
                    case "unmaskedvalue":
                        $el = actionObj["$input"];
                        var imdata = $el.data('_inputmask-multi'),
                            activeMask = imdata["elmasks"][imdata["activeMasksetIndex"]];
                        return $(activeMask).inputmask("unmaskedvalue");
                    case "mask":
                        mask(actionObj["el"]);
                        break;
                }
            }
        };

        $.extend($.inputmask.defaults, {
            //multi-masks
            multi: false, //do not alter - internal use
            determineActiveMasksetIndex: undefined //override determineActiveMasksetIndex - args => eventType, elmasks - return int
        });

        $.inputmask._fn = $.fn.inputmask;
        $.fn.inputmask = function (fn, options) {
            if (typeof fn === "string") {
                if ($.inputmask._fn("_detectScope", options, undefined, undefined, fn))
                    return $.inputmask._fn.call(this, fn, options, multiMaskScope, "_inputmask-multi");
                else return $.inputmask._fn.call(this, fn, options);
            } else if (typeof fn == "object") {
                if ($.inputmask._fn("_detectScope", fn))
                    return $.inputmask._fn.call(this, fn, options, multiMaskScope, "_inputmask-multi");
                else return $.inputmask._fn.call(this, fn, options);
            } else if (fn == undefined)
                return $.inputmask._fn.call(this, fn, options);
        };
    }
}));
