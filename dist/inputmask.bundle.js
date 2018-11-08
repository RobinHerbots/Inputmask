/*!
 * dist/inputmask.bundle
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2018 Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 5.0.0-beta.27
 */
(function webpackUniversalModuleDefinition(e, t) {
    if (typeof exports === "object" && typeof module === "object") module.exports = t(); else if (typeof define === "function" && define.amd) define([], t); else {
        var i = t();
        for (var a in i) (typeof exports === "object" ? exports : e)[a] = i[a];
    }
})(window, function() {
    return function(i) {
        var a = {};
        function __webpack_require__(e) {
            if (a[e]) {
                return a[e].exports;
            }
            var t = a[e] = {
                i: e,
                l: false,
                exports: {}
            };
            i[e].call(t.exports, t, t.exports, __webpack_require__);
            t.l = true;
            return t.exports;
        }
        __webpack_require__.m = i;
        __webpack_require__.c = a;
        __webpack_require__.d = function(e, t, i) {
            if (!__webpack_require__.o(e, t)) {
                Object.defineProperty(e, t, {
                    enumerable: true,
                    get: i
                });
            }
        };
        __webpack_require__.r = function(e) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(e, "__esModule", {
                value: true
            });
        };
        __webpack_require__.t = function(t, e) {
            if (e & 1) t = __webpack_require__(t);
            if (e & 8) return t;
            if (e & 4 && typeof t === "object" && t && t.__esModule) return t;
            var i = Object.create(null);
            __webpack_require__.r(i);
            Object.defineProperty(i, "default", {
                enumerable: true,
                value: t
            });
            if (e & 2 && typeof t != "string") for (var a in t) __webpack_require__.d(i, a, function(e) {
                return t[e];
            }.bind(null, a));
            return i;
        };
        __webpack_require__.n = function(e) {
            var t = e && e.__esModule ? function getDefault() {
                return e["default"];
            } : function getModuleExports() {
                return e;
            };
            __webpack_require__.d(t, "a", t);
            return t;
        };
        __webpack_require__.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 3);
    }([ function(t, i, a) {
        "use strict";
        var n, r, s;
        var T = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        (function(e) {
            if (true) {
                !(r = [ a(1), a(2) ], n = e, s = typeof n === "function" ? n.apply(i, r) : n, s !== undefined && (t.exports = s));
            } else {}
        })(function(N, S, F) {
            var x = S.document, e = navigator.userAgent, P = e.indexOf("MSIE ") > 0 || e.indexOf("Trident/") > 0, _ = isInputEventSupported("touchstart"), E = /iemobile/i.test(e), w = /iphone/i.test(e) && !E;
            function Inputmask(e, t, i) {
                if (!(this instanceof Inputmask)) {
                    return new Inputmask(e, t, i);
                }
                this.el = F;
                this.events = {};
                this.maskset = F;
                this.refreshValue = false;
                if (i !== true) {
                    if (N.isPlainObject(e)) {
                        t = e;
                    } else {
                        t = t || {};
                        if (e) t.alias = e;
                    }
                    this.opts = N.extend(true, {}, this.defaults, t);
                    this.noMasksCache = t && t.definitions !== F;
                    this.userOptions = t || {};
                    this.isRTL = this.opts.numericInput;
                    resolveAlias(this.opts.alias, t, this.opts);
                }
            }
            Inputmask.prototype = {
                dataAttribute: "data-inputmask",
                defaults: {
                    placeholder: "_",
                    optionalmarker: [ "[", "]" ],
                    quantifiermarker: [ "{", "}" ],
                    groupmarker: [ "(", ")" ],
                    alternatormarker: "|",
                    escapeChar: "\\",
                    mask: null,
                    regex: null,
                    oncomplete: N.noop,
                    onincomplete: N.noop,
                    oncleared: N.noop,
                    repeat: 0,
                    greedy: false,
                    autoUnmask: false,
                    removeMaskOnSubmit: false,
                    clearMaskOnLostFocus: true,
                    insertMode: true,
                    clearIncomplete: false,
                    alias: null,
                    onKeyDown: N.noop,
                    onBeforeMask: null,
                    onBeforePaste: function onBeforePaste(e, t) {
                        return N.isFunction(t.onBeforeMask) ? t.onBeforeMask.call(this, e, t) : e;
                    },
                    onBeforeWrite: null,
                    onUnMask: null,
                    showMaskOnFocus: true,
                    showMaskOnHover: true,
                    onKeyValidation: N.noop,
                    skipOptionalPartCharacter: " ",
                    numericInput: false,
                    rightAlign: false,
                    undoOnEscape: true,
                    radixPoint: "",
                    _radixDance: false,
                    groupSeparator: "",
                    keepStatic: null,
                    positionCaretOnTab: true,
                    tabThrough: false,
                    supportsInputType: [ "text", "tel", "password", "search" ],
                    ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
                    isComplete: null,
                    preValidation: null,
                    postValidation: null,
                    staticDefinitionSymbol: F,
                    jitMasking: false,
                    nullable: true,
                    inputEventOnly: false,
                    noValuePatching: false,
                    positionCaretOnClick: "lvp",
                    casing: null,
                    inputmode: "verbatim",
                    colorMask: false,
                    disablePredictiveText: false,
                    importDataAttributes: true,
                    shiftPositions: true
                },
                definitions: {
                    9: {
                        validator: "[0-9\uff11-\uff19]",
                        definitionSymbol: "*"
                    },
                    a: {
                        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        definitionSymbol: "*"
                    },
                    "*": {
                        validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"
                    }
                },
                aliases: {},
                masksCache: {},
                mask: function mask(e) {
                    var n = this;
                    function importAttributeOptions(i, e, a, n) {
                        if (e.importDataAttributes === true) {
                            var t = function importOption(e, t) {
                                t = t !== F ? t : i.getAttribute(n + "-" + e);
                                if (t !== null) {
                                    if (typeof t === "string") {
                                        if (e.indexOf("on") === 0) t = S[t]; else if (t === "false") t = false; else if (t === "true") t = true;
                                    }
                                    a[e] = t;
                                }
                            };
                            var r = i.getAttribute(n), s, o, l, u;
                            if (r && r !== "") {
                                r = r.replace(/'/g, '"');
                                o = JSON.parse("{" + r + "}");
                            }
                            if (o) {
                                l = F;
                                for (u in o) {
                                    if (u.toLowerCase() === "alias") {
                                        l = o[u];
                                        break;
                                    }
                                }
                            }
                            t("alias", l);
                            if (a.alias) {
                                resolveAlias(a.alias, a, e);
                            }
                            for (s in e) {
                                if (o) {
                                    l = F;
                                    for (u in o) {
                                        if (u.toLowerCase() === s.toLowerCase()) {
                                            l = o[u];
                                            break;
                                        }
                                    }
                                }
                                t(s, l);
                            }
                        }
                        N.extend(true, e, a);
                        if (i.dir === "rtl" || e.rightAlign) {
                            i.style.textAlign = "right";
                        }
                        if (i.dir === "rtl" || e.numericInput) {
                            i.dir = "ltr";
                            i.removeAttribute("dir");
                            e.isRTL = true;
                        }
                        return Object.keys(a).length;
                    }
                    if (typeof e === "string") {
                        e = x.getElementById(e) || x.querySelectorAll(e);
                    }
                    e = e.nodeName ? [ e ] : e;
                    N.each(e, function(e, t) {
                        var i = N.extend(true, {}, n.opts);
                        if (importAttributeOptions(t, i, N.extend(true, {}, n.userOptions), n.dataAttribute)) {
                            var a = generateMaskSet(i, n.noMasksCache);
                            if (a !== F) {
                                if (t.inputmask !== F) {
                                    t.inputmask.opts.autoUnmask = true;
                                    t.inputmask.remove();
                                }
                                t.inputmask = new Inputmask(F, F, true);
                                t.inputmask.opts = i;
                                t.inputmask.noMasksCache = n.noMasksCache;
                                t.inputmask.userOptions = N.extend(true, {}, n.userOptions);
                                t.inputmask.isRTL = i.isRTL || i.numericInput;
                                t.inputmask.el = t;
                                t.inputmask.maskset = a;
                                N.data(t, "_inputmask_opts", i);
                                maskScope.call(t.inputmask, {
                                    action: "mask"
                                });
                            }
                        }
                    });
                    return e && e[0] ? e[0].inputmask || this : this;
                },
                option: function option(e, t) {
                    if (typeof e === "string") {
                        return this.opts[e];
                    } else if ((typeof e === "undefined" ? "undefined" : T(e)) === "object") {
                        N.extend(this.userOptions, e);
                        if (this.el && t !== true) {
                            this.mask(this.el);
                        }
                        return this;
                    }
                },
                unmaskedvalue: function unmaskedvalue(e) {
                    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                    return maskScope.call(this, {
                        action: "unmaskedvalue",
                        value: e
                    });
                },
                remove: function remove() {
                    return maskScope.call(this, {
                        action: "remove"
                    });
                },
                getemptymask: function getemptymask() {
                    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                    return maskScope.call(this, {
                        action: "getemptymask"
                    });
                },
                hasMaskedValue: function hasMaskedValue() {
                    return !this.opts.autoUnmask;
                },
                isComplete: function isComplete() {
                    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                    return maskScope.call(this, {
                        action: "isComplete"
                    });
                },
                getmetadata: function getmetadata() {
                    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                    return maskScope.call(this, {
                        action: "getmetadata"
                    });
                },
                isValid: function isValid(e) {
                    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                    return maskScope.call(this, {
                        action: "isValid",
                        value: e
                    });
                },
                format: function format(e, t) {
                    this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                    return maskScope.call(this, {
                        action: "format",
                        value: e,
                        metadata: t
                    });
                },
                setValue: function setValue(e) {
                    if (this.el) {
                        N(this.el).trigger("setvalue", [ e ]);
                    }
                },
                analyseMask: function analyseMask(e, r, s) {
                    var t = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, i = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, o = false, a = new MaskToken(), n, l, u = [], f = [], c, p, d, g, m;
                    function MaskToken(e, t, i, a) {
                        this.matches = [];
                        this.openGroup = e || false;
                        this.alternatorGroup = false;
                        this.isGroup = e || false;
                        this.isOptional = t || false;
                        this.isQuantifier = i || false;
                        this.isAlternator = a || false;
                        this.quantifier = {
                            min: 1,
                            max: 1
                        };
                    }
                    function insertTestDefinition(i, e, a) {
                        a = a !== F ? a : i.matches.length;
                        var n = i.matches[a - 1];
                        if (r) {
                            if (e.indexOf("[") === 0 || o && /\\d|\\s|\\w]/i.test(e) || e === ".") {
                                i.matches.splice(a++, 0, {
                                    fn: new RegExp(e, s.casing ? "i" : ""),
                                    optionality: false,
                                    newBlockMarker: n === F ? "master" : n.def !== e,
                                    casing: null,
                                    def: e,
                                    placeholder: F,
                                    nativeDef: e
                                });
                            } else {
                                if (o) e = e[e.length - 1];
                                N.each(e.split(""), function(e, t) {
                                    n = i.matches[a - 1];
                                    i.matches.splice(a++, 0, {
                                        fn: null,
                                        optionality: false,
                                        newBlockMarker: n === F ? "master" : n.def !== t && n.fn !== null,
                                        casing: null,
                                        def: s.staticDefinitionSymbol || t,
                                        placeholder: s.staticDefinitionSymbol !== F ? t : F,
                                        nativeDef: (o ? "'" : "") + t
                                    });
                                });
                            }
                            o = false;
                        } else {
                            var t = (s.definitions ? s.definitions[e] : F) || Inputmask.prototype.definitions[e];
                            if (t && !o) {
                                i.matches.splice(a++, 0, {
                                    fn: t.validator ? typeof t.validator == "string" ? new RegExp(t.validator, s.casing ? "i" : "") : new function() {
                                        this.test = t.validator;
                                    }() : new RegExp("."),
                                    optionality: false,
                                    newBlockMarker: n === F ? "master" : n.def !== (t.definitionSymbol || e),
                                    casing: t.casing,
                                    def: t.definitionSymbol || e,
                                    placeholder: t.placeholder,
                                    nativeDef: e
                                });
                            } else {
                                i.matches.splice(a++, 0, {
                                    fn: null,
                                    optionality: false,
                                    newBlockMarker: n === F ? "master" : n.def !== e && n.fn !== null,
                                    casing: null,
                                    def: s.staticDefinitionSymbol || e,
                                    placeholder: s.staticDefinitionSymbol !== F ? e : F,
                                    nativeDef: (o ? "'" : "") + e
                                });
                                o = false;
                            }
                        }
                    }
                    function verifyGroupMarker(a) {
                        if (a && a.matches) {
                            N.each(a.matches, function(e, t) {
                                var i = a.matches[e + 1];
                                if ((i === F || i.matches === F || i.isQuantifier === false) && t && t.isGroup) {
                                    t.isGroup = false;
                                    if (!r) {
                                        insertTestDefinition(t, s.groupmarker[0], 0);
                                        if (t.openGroup !== true) {
                                            insertTestDefinition(t, s.groupmarker[1]);
                                        }
                                    }
                                }
                                verifyGroupMarker(t);
                            });
                        }
                    }
                    function defaultCase() {
                        if (u.length > 0) {
                            p = u[u.length - 1];
                            insertTestDefinition(p, l);
                            if (p.isAlternator) {
                                d = u.pop();
                                for (var e = 0; e < d.matches.length; e++) {
                                    if (d.matches[e].isGroup) d.matches[e].isGroup = false;
                                }
                                if (u.length > 0) {
                                    p = u[u.length - 1];
                                    p.matches.push(d);
                                } else {
                                    a.matches.push(d);
                                }
                            }
                        } else {
                            insertTestDefinition(a, l);
                        }
                    }
                    function reverseTokens(e) {
                        function reverseStatic(e) {
                            if (e === s.optionalmarker[0]) e = s.optionalmarker[1]; else if (e === s.optionalmarker[1]) e = s.optionalmarker[0]; else if (e === s.groupmarker[0]) e = s.groupmarker[1]; else if (e === s.groupmarker[1]) e = s.groupmarker[0];
                            return e;
                        }
                        e.matches = e.matches.reverse();
                        for (var t in e.matches) {
                            if (e.matches.hasOwnProperty(t)) {
                                var i = parseInt(t);
                                if (e.matches[t].isQuantifier && e.matches[i + 1] && e.matches[i + 1].isGroup) {
                                    var a = e.matches[t];
                                    e.matches.splice(t, 1);
                                    e.matches.splice(i + 1, 0, a);
                                }
                                if (e.matches[t].matches !== F) {
                                    e.matches[t] = reverseTokens(e.matches[t]);
                                } else {
                                    e.matches[t] = reverseStatic(e.matches[t]);
                                }
                            }
                        }
                        return e;
                    }
                    function groupify(e) {
                        var t = new MaskToken(true);
                        t.openGroup = false;
                        t.matches = e;
                        return t;
                    }
                    if (r) {
                        s.optionalmarker[0] = F;
                        s.optionalmarker[1] = F;
                    }
                    while (n = r ? i.exec(e) : t.exec(e)) {
                        l = n[0];
                        if (r) {
                            switch (l.charAt(0)) {
                              case "?":
                                l = "{0,1}";
                                break;

                              case "+":
                              case "*":
                                l = "{" + l + "}";
                                break;
                            }
                        }
                        if (o) {
                            defaultCase();
                            continue;
                        }
                        switch (l.charAt(0)) {
                          case "(?=":
                            break;

                          case "(?!":
                            break;

                          case "(?<=":
                            break;

                          case "(?<!":
                            break;

                          case s.escapeChar:
                            o = true;
                            if (r) {
                                defaultCase();
                            }
                            break;

                          case s.optionalmarker[1]:
                          case s.groupmarker[1]:
                            c = u.pop();
                            c.openGroup = false;
                            if (c !== F) {
                                if (u.length > 0) {
                                    p = u[u.length - 1];
                                    p.matches.push(c);
                                    if (p.isAlternator) {
                                        d = u.pop();
                                        for (var k = 0; k < d.matches.length; k++) {
                                            d.matches[k].isGroup = false;
                                            d.matches[k].alternatorGroup = false;
                                        }
                                        if (u.length > 0) {
                                            p = u[u.length - 1];
                                            p.matches.push(d);
                                        } else {
                                            a.matches.push(d);
                                        }
                                    }
                                } else {
                                    a.matches.push(c);
                                }
                            } else defaultCase();
                            break;

                          case s.optionalmarker[0]:
                            u.push(new MaskToken(false, true));
                            break;

                          case s.groupmarker[0]:
                            u.push(new MaskToken(true));
                            break;

                          case s.quantifiermarker[0]:
                            var h = new MaskToken(false, false, true);
                            l = l.replace(/[{}]/g, "");
                            var v = l.split("|"), y = v[0].split(","), b = isNaN(y[0]) ? y[0] : parseInt(y[0]), M = y.length === 1 ? b : isNaN(y[1]) ? y[1] : parseInt(y[1]);
                            if (b === "*" || b === "+") {
                                b = M === "*" ? 0 : 1;
                            }
                            h.quantifier = {
                                min: b,
                                max: M,
                                jit: v[1]
                            };
                            var S = u.length > 0 ? u[u.length - 1].matches : a.matches;
                            n = S.pop();
                            if (n.isAlternator) {
                                S.push(n);
                                S = n.matches;
                                var m = new MaskToken(true);
                                var x = S.pop();
                                S.push(m);
                                S = m.matches;
                                n = x;
                            }
                            if (!n.isGroup) {
                                n = groupify([ n ]);
                            }
                            S.push(n);
                            S.push(h);
                            break;

                          case s.alternatormarker:
                            var P = function groupQuantifier(e) {
                                var t = e.pop();
                                if (t.isQuantifier) {
                                    t = groupify([ e.pop(), t ]);
                                }
                                return t;
                            };
                            if (u.length > 0) {
                                p = u[u.length - 1];
                                var _ = p.matches[p.matches.length - 1];
                                if (p.openGroup && (_.matches === F || _.isGroup === false && _.isAlternator === false)) {
                                    g = u.pop();
                                } else {
                                    g = P(p.matches);
                                }
                            } else {
                                g = P(a.matches);
                            }
                            if (g.isAlternator) {
                                u.push(g);
                            } else {
                                if (g.alternatorGroup) {
                                    d = u.pop();
                                    g.alternatorGroup = false;
                                } else {
                                    d = new MaskToken(false, false, false, true);
                                }
                                d.matches.push(g);
                                u.push(d);
                                if (g.openGroup) {
                                    g.openGroup = false;
                                    var E = new MaskToken(true);
                                    E.alternatorGroup = true;
                                    u.push(E);
                                }
                            }
                            break;

                          default:
                            defaultCase();
                        }
                    }
                    while (u.length > 0) {
                        c = u.pop();
                        a.matches.push(c);
                    }
                    if (a.matches.length > 0) {
                        verifyGroupMarker(a);
                        f.push(a);
                    }
                    if (s.numericInput || s.isRTL) {
                        reverseTokens(f[0]);
                    }
                    return f;
                }
            };
            Inputmask.extendDefaults = function(e) {
                N.extend(true, Inputmask.prototype.defaults, e);
            };
            Inputmask.extendDefinitions = function(e) {
                N.extend(true, Inputmask.prototype.definitions, e);
            };
            Inputmask.extendAliases = function(e) {
                N.extend(true, Inputmask.prototype.aliases, e);
            };
            Inputmask.format = function(e, t, i) {
                return Inputmask(t).format(e, i);
            };
            Inputmask.unmask = function(e, t) {
                return Inputmask(t).unmaskedvalue(e);
            };
            Inputmask.isValid = function(e, t) {
                return Inputmask(t).isValid(e);
            };
            Inputmask.remove = function(e) {
                if (typeof e === "string") {
                    e = x.getElementById(e) || x.querySelectorAll(e);
                }
                e = e.nodeName ? [ e ] : e;
                N.each(e, function(e, t) {
                    if (t.inputmask) t.inputmask.remove();
                });
            };
            Inputmask.setValue = function(e, i) {
                if (typeof e === "string") {
                    e = x.getElementById(e) || x.querySelectorAll(e);
                }
                e = e.nodeName ? [ e ] : e;
                N.each(e, function(e, t) {
                    if (t.inputmask) t.inputmask.setValue(i); else N(t).trigger("setvalue", [ i ]);
                });
            };
            Inputmask.escapeRegex = function(e) {
                var t = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
                return e.replace(new RegExp("(\\" + t.join("|\\") + ")", "gim"), "\\$1");
            };
            Inputmask.keyCode = {
                BACKSPACE: 8,
                BACKSPACE_SAFARI: 127,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                X: 88,
                CONTROL: 17
            };
            Inputmask.dependencyLib = N;
            function resolveAlias(e, t, i) {
                var a = Inputmask.prototype.aliases[e];
                if (a) {
                    if (a.alias) resolveAlias(a.alias, F, i);
                    N.extend(true, i, a);
                    N.extend(true, i, t);
                    return true;
                } else if (i.mask === null) {
                    i.mask = e;
                }
                return false;
            }
            function generateMaskSet(i, o) {
                function generateMask(e, t, i) {
                    var a = false;
                    if (e === null || e === "") {
                        a = i.regex !== null;
                        if (a) {
                            e = i.regex;
                            e = e.replace(/^(\^)(.*)(\$)$/, "$2");
                        } else {
                            a = true;
                            e = ".*";
                        }
                    }
                    if (e.length === 1 && i.greedy === false && i.repeat !== 0) {
                        i.placeholder = "";
                    }
                    if (i.repeat > 0 || i.repeat === "*" || i.repeat === "+") {
                        var n = i.repeat === "*" ? 0 : i.repeat === "+" ? 1 : i.repeat;
                        e = i.groupmarker[0] + e + i.groupmarker[1] + i.quantifiermarker[0] + n + "," + i.repeat + i.quantifiermarker[1];
                    }
                    var r, s = a ? "regex_" + i.regex : i.numericInput ? e.split("").reverse().join("") : e;
                    if (Inputmask.prototype.masksCache[s] === F || o === true) {
                        r = {
                            mask: e,
                            maskToken: Inputmask.prototype.analyseMask(e, a, i),
                            validPositions: {},
                            _buffer: F,
                            buffer: F,
                            tests: {},
                            excludes: {},
                            metadata: t,
                            maskLength: F
                        };
                        if (o !== true) {
                            Inputmask.prototype.masksCache[s] = r;
                            r = N.extend(true, {}, Inputmask.prototype.masksCache[s]);
                        }
                    } else r = N.extend(true, {}, Inputmask.prototype.masksCache[s]);
                    return r;
                }
                var e;
                if (N.isFunction(i.mask)) {
                    i.mask = i.mask(i);
                }
                if (N.isArray(i.mask)) {
                    if (i.mask.length > 1) {
                        if (i.keepStatic === null) {
                            i.keepStatic = "auto";
                            for (var t = 0; t < i.mask.length; t++) {
                                if (i.mask[t].charAt(0) !== i.mask[0].charAt(0)) {
                                    i.keepStatic = true;
                                    break;
                                }
                            }
                        }
                        var a = i.groupmarker[0];
                        N.each(i.isRTL ? i.mask.reverse() : i.mask, function(e, t) {
                            if (a.length > 1) {
                                a += i.groupmarker[1] + i.alternatormarker + i.groupmarker[0];
                            }
                            if (t.mask !== F && !N.isFunction(t.mask)) {
                                a += t.mask;
                            } else {
                                a += t;
                            }
                        });
                        a += i.groupmarker[1];
                        return generateMask(a, i.mask, i);
                    } else i.mask = i.mask.pop();
                }
                if (i.mask && i.mask.mask !== F && !N.isFunction(i.mask.mask)) {
                    e = generateMask(i.mask.mask, i.mask, i);
                } else {
                    e = generateMask(i.mask, i.mask, i);
                }
                return e;
            }
            function isInputEventSupported(e) {
                var t = x.createElement("input"), i = "on" + e, a = i in t;
                if (!a) {
                    t.setAttribute(i, "return;");
                    a = typeof t[i] === "function";
                }
                t = null;
                return a;
            }
            function maskScope(e, t, L) {
                t = t || this.maskset;
                L = L || this.opts;
                var f = this, l = this.el, g = this.isRTL, m, n, s = false, u = false, k = false, h, a = false, p, r;
                function getMaskTemplate(e, t, i, a, n) {
                    var r = L.greedy;
                    if (n) L.greedy = false;
                    t = t || 0;
                    var s = [], o, l = 0, u, f, c = getLastValidPosition();
                    do {
                        if (e === true && getMaskSet().validPositions[l]) {
                            f = n && getMaskSet().validPositions[l].match.optionality === true && getMaskSet().validPositions[l + 1] === F && (getMaskSet().validPositions[l].generatedInput === true || getMaskSet().validPositions[l].input == L.skipOptionalPartCharacter && l > 0) ? determineTestTemplate(l, getTests(l, o, l - 1)) : getMaskSet().validPositions[l];
                            u = f.match;
                            o = f.locator.slice();
                            s.push(i === true ? f.input : i === false ? u.nativeDef : getPlaceholder(l, u));
                        } else {
                            f = getTestTemplate(l, o, l - 1);
                            u = f.match;
                            o = f.locator.slice();
                            var p = a === true ? false : L.jitMasking !== false ? L.jitMasking : u.jit;
                            if (p === false || p === F || typeof p === "number" && isFinite(p) && p > l) {
                                s.push(i === false ? u.nativeDef : getPlaceholder(l, u));
                            }
                        }
                        if (L.keepStatic === "auto") {
                            if (u.newBlockMarker && u.fn !== null) {
                                L.keepStatic = l - 1;
                            }
                        }
                        l++;
                    } while ((h === F || l < h) && (u.fn !== null || u.def !== "") || t > l);
                    if (s[s.length - 1] === "") {
                        s.pop();
                    }
                    if (i !== false || getMaskSet().maskLength === F) getMaskSet().maskLength = l - 1;
                    L.greedy = r;
                    return s;
                }
                function getMaskSet() {
                    return t;
                }
                function resetMaskSet(e) {
                    var t = getMaskSet();
                    t.buffer = F;
                    if (e !== true) {
                        t.validPositions = {};
                        t.p = 0;
                    }
                }
                function getLastValidPosition(e, t, i) {
                    var a = -1, n = -1, r = i || getMaskSet().validPositions;
                    if (e === F) e = -1;
                    for (var s in r) {
                        var o = parseInt(s);
                        if (r[o] && (t || r[o].generatedInput !== true)) {
                            if (o <= e) a = o;
                            if (o >= e) n = o;
                        }
                    }
                    return a === -1 || a == e ? n : n == -1 ? a : e - a < n - e ? a : n;
                }
                function getDecisionTaker(e) {
                    var t = e.locator[e.alternation];
                    if (typeof t == "string" && t.length > 0) {
                        t = t.split(",")[0];
                    }
                    return t !== F ? t.toString() : "";
                }
                function getLocator(e, t) {
                    var i = (e.alternation != F ? e.mloc[getDecisionTaker(e)] : e.locator).join("");
                    if (i !== "") while (i.length < t) {
                        i += "0";
                    }
                    return i;
                }
                function determineTestTemplate(e, t) {
                    e = e > 0 ? e - 1 : 0;
                    var i = getTest(e), a = getLocator(i), n, r, s;
                    for (var o = 0; o < t.length; o++) {
                        var l = t[o];
                        n = getLocator(l, a.length);
                        var u = Math.abs(n - a);
                        if (r === F || n !== "" && u < r || s && s.match.optionality && s.match.newBlockMarker === "master" && (!l.match.optionality || !l.match.newBlockMarker) || s && s.match.optionalQuantifier && !l.match.optionalQuantifier) {
                            r = u;
                            s = l;
                        }
                    }
                    return s;
                }
                function getTestTemplate(e, t, i) {
                    return getMaskSet().validPositions[e] || determineTestTemplate(e, getTests(e, t ? t.slice() : t, i));
                }
                function getTest(e, t) {
                    if (getMaskSet().validPositions[e]) {
                        return getMaskSet().validPositions[e];
                    }
                    return (t || getTests(e))[0];
                }
                function positionCanMatchDefinition(e, t) {
                    var i = false, a = getTests(e);
                    for (var n = 0; n < a.length; n++) {
                        if (a[n].match && a[n].match.def === t) {
                            i = true;
                            break;
                        }
                    }
                    return i;
                }
                function getTests(D, e, t) {
                    var i = getMaskSet().maskToken, C = e ? t : 0, a = e ? e.slice() : [ 0 ], A = [], O = false, B, I = e ? e.join("") : "";
                    function resolveTestFromToken(w, T, e, t) {
                        function handleMatch(e, t, i) {
                            function isFirstMatch(i, a) {
                                var n = N.inArray(i, a.matches) === 0;
                                if (!n) {
                                    N.each(a.matches, function(e, t) {
                                        if (t.isQuantifier === true) n = isFirstMatch(i, a.matches[e - 1]); else if (t.hasOwnProperty("matches")) n = isFirstMatch(i, t);
                                        if (n) return false;
                                    });
                                }
                                return n;
                            }
                            function resolveNdxInitializer(e, n, r) {
                                var s, o;
                                if (getMaskSet().tests[e] || getMaskSet().validPositions[e]) {
                                    N.each(getMaskSet().tests[e] || [ getMaskSet().validPositions[e] ], function(e, t) {
                                        if (t.mloc[n]) {
                                            s = t;
                                            return false;
                                        }
                                        var i = r !== F ? r : t.alternation, a = t.locator[i] !== F ? t.locator[i].toString().indexOf(n) : -1;
                                        if ((o === F || a < o) && a !== -1) {
                                            s = t;
                                            o = a;
                                        }
                                    });
                                }
                                if (s) {
                                    var t = s.locator[s.alternation];
                                    var i = s.mloc[n] || s.mloc[t] || s.locator;
                                    return i.slice((r !== F ? r : s.alternation) + 1);
                                } else {
                                    return r !== F ? resolveNdxInitializer(e, n) : F;
                                }
                            }
                            function isSubsetOf(e, t) {
                                function expand(e) {
                                    var t = [], i, a;
                                    for (var n = 0, r = e.length; n < r; n++) {
                                        if (e.charAt(n) === "-") {
                                            a = e.charCodeAt(n + 1);
                                            while (++i < a) {
                                                t.push(String.fromCharCode(i));
                                            }
                                        } else {
                                            i = e.charCodeAt(n);
                                            t.push(e.charAt(n));
                                        }
                                    }
                                    return t.join("");
                                }
                                if (L.regex && e.match.fn !== null && t.match.fn !== null) {
                                    return expand(t.match.def.replace(/[\[\]]/g, "")).indexOf(expand(e.match.def.replace(/[\[\]]/g, ""))) !== -1;
                                }
                                return e.match.def === t.match.nativeDef;
                            }
                            function staticCanMatchDefinition(e, t) {
                                var i = e.locator.slice(e.alternation).join(""), a = t.locator.slice(t.alternation).join(""), n = i == a;
                                n = n && e.match.fn === null && t.match.fn !== null ? t.match.fn.test(e.match.def, getMaskSet(), D, false, L, false) : false;
                                return n;
                            }
                            function setMergeLocators(e, t) {
                                if (t === F || e.alternation === t.alternation && e.locator[e.alternation].toString().indexOf(t.locator[t.alternation]) === -1) {
                                    e.mloc = e.mloc || {};
                                    var i = e.locator[e.alternation];
                                    if (i === F) e.alternation = F; else {
                                        if (typeof i === "string") i = i.split(",")[0];
                                        if (e.mloc[i] === F) e.mloc[i] = e.locator.slice();
                                        if (t !== F) {
                                            for (var a in t.mloc) {
                                                if (typeof a === "string") a = a.split(",")[0];
                                                if (e.mloc[a] === F) e.mloc[a] = t.mloc[a];
                                            }
                                            e.locator[e.alternation] = Object.keys(e.mloc).join(",");
                                        }
                                        return true;
                                    }
                                }
                                return false;
                            }
                            if (C > 500 && i !== F) {
                                throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                            }
                            if (C === D && e.matches === F) {
                                A.push({
                                    match: e,
                                    locator: t.reverse(),
                                    cd: I,
                                    mloc: {}
                                });
                                return true;
                            } else if (e.matches !== F) {
                                if (e.isGroup && i !== e) {
                                    e = handleMatch(w.matches[N.inArray(e, w.matches) + 1], t, i);
                                    if (e) return true;
                                } else if (e.isOptional) {
                                    var a = e;
                                    e = resolveTestFromToken(e, T, t, i);
                                    if (e) {
                                        N.each(A, function(e, t) {
                                            t.match.optionality = true;
                                        });
                                        B = A[A.length - 1].match;
                                        if (i === F && isFirstMatch(B, a)) {
                                            O = true;
                                            C = D;
                                        } else return true;
                                    }
                                } else if (e.isAlternator) {
                                    var n = e, r = [], s, o = A.slice(), l = t.length;
                                    var u = T.length > 0 ? T.shift() : -1;
                                    if (u === -1 || typeof u === "string") {
                                        var f = C, c = T.slice(), p = [], d;
                                        if (typeof u == "string") {
                                            p = u.split(",");
                                        } else {
                                            for (d = 0; d < n.matches.length; d++) {
                                                p.push(d.toString());
                                            }
                                        }
                                        if (getMaskSet().excludes[D]) {
                                            var g = p.slice();
                                            for (var m = 0, k = getMaskSet().excludes[D].length; m < k; m++) {
                                                p.splice(p.indexOf(getMaskSet().excludes[D][m].toString()), 1);
                                            }
                                            if (p.length === 0) {
                                                getMaskSet().excludes[D] = F;
                                                p = g;
                                            }
                                        }
                                        if (L.keepStatic === true || isFinite(parseInt(L.keepStatic)) && f >= L.keepStatic) p = p.slice(0, 1);
                                        var h = false;
                                        for (var v = 0; v < p.length; v++) {
                                            d = parseInt(p[v]);
                                            A = [];
                                            T = typeof u === "string" ? resolveNdxInitializer(C, d, l) || c.slice() : c.slice();
                                            if (n.matches[d] && handleMatch(n.matches[d], [ d ].concat(t), i)) e = true; else if (v === 0) {
                                                h = true;
                                            }
                                            s = A.slice();
                                            C = f;
                                            A = [];
                                            for (var y = 0; y < s.length; y++) {
                                                var b = s[y], M = false;
                                                b.match.jit = b.match.jit || h;
                                                b.alternation = b.alternation || l;
                                                setMergeLocators(b);
                                                for (var S = 0; S < r.length; S++) {
                                                    var x = r[S];
                                                    if (typeof u !== "string" || b.alternation !== F && N.inArray(b.locator[b.alternation].toString(), p) !== -1) {
                                                        if (b.match.nativeDef === x.match.nativeDef) {
                                                            M = true;
                                                            setMergeLocators(x, b);
                                                            break;
                                                        } else if (isSubsetOf(b, x)) {
                                                            if (setMergeLocators(b, x)) {
                                                                M = true;
                                                                r.splice(r.indexOf(x), 0, b);
                                                            }
                                                            break;
                                                        } else if (isSubsetOf(x, b)) {
                                                            setMergeLocators(x, b);
                                                            break;
                                                        } else if (staticCanMatchDefinition(b, x)) {
                                                            if (setMergeLocators(b, x)) {
                                                                M = true;
                                                                r.splice(r.indexOf(x), 0, b);
                                                            }
                                                            break;
                                                        }
                                                    }
                                                }
                                                if (!M) {
                                                    r.push(b);
                                                }
                                            }
                                        }
                                        A = o.concat(r);
                                        C = D;
                                        O = A.length > 0;
                                        e = r.length > 0;
                                        T = c.slice();
                                    } else e = handleMatch(n.matches[u] || w.matches[u], [ u ].concat(t), i);
                                    if (e) return true;
                                } else if (e.isQuantifier && i !== w.matches[N.inArray(e, w.matches) - 1]) {
                                    var P = e;
                                    for (var _ = T.length > 0 ? T.shift() : 0; _ < (isNaN(P.quantifier.max) ? _ + 1 : P.quantifier.max) && C <= D; _++) {
                                        var E = w.matches[N.inArray(P, w.matches) - 1];
                                        e = handleMatch(E, [ _ ].concat(t), E);
                                        if (e) {
                                            B = A[A.length - 1].match;
                                            B.optionalQuantifier = _ > P.quantifier.min - 1;
                                            B.jit = (_ || 1) * E.matches.indexOf(B) >= P.quantifier.jit;
                                            if (B.optionalQuantifier && isFirstMatch(B, E)) {
                                                O = true;
                                                C = D;
                                                break;
                                            }
                                            if (B.jit && !B.optionalQuantifier) {
                                                B.jitOffset = E.matches.indexOf(B);
                                            }
                                            return true;
                                        }
                                    }
                                } else {
                                    e = resolveTestFromToken(e, T, t, i);
                                    if (e) return true;
                                }
                            } else {
                                C++;
                            }
                        }
                        for (var i = T.length > 0 ? T.shift() : 0; i < w.matches.length; i++) {
                            if (w.matches[i].isQuantifier !== true) {
                                var a = handleMatch(w.matches[i], [ i ].concat(e), t);
                                if (a && C === D) {
                                    return a;
                                } else if (C > D) {
                                    break;
                                }
                            }
                        }
                    }
                    function mergeLocators(e, t) {
                        var a = [];
                        if (!N.isArray(t)) t = [ t ];
                        if (t.length > 0) {
                            if (t[0].alternation === F) {
                                a = determineTestTemplate(e, t.slice()).locator.slice();
                                if (a.length === 0) a = t[0].locator.slice();
                            } else {
                                N.each(t, function(e, t) {
                                    if (t.def !== "") {
                                        if (a.length === 0) a = t.locator.slice(); else {
                                            for (var i = 0; i < a.length; i++) {
                                                if (t.locator[i] && a[i].toString().indexOf(t.locator[i]) === -1) {
                                                    a[i] += "," + t.locator[i];
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        return a;
                    }
                    if (D > -1) {
                        if (e === F) {
                            var n = D - 1, r;
                            while ((r = getMaskSet().validPositions[n] || getMaskSet().tests[n]) === F && n > -1) {
                                n--;
                            }
                            if (r !== F && n > -1) {
                                a = mergeLocators(n, r);
                                I = a.join("");
                                C = n;
                            }
                        }
                        if (getMaskSet().tests[D] && getMaskSet().tests[D][0].cd === I) {
                            return getMaskSet().tests[D];
                        }
                        for (var s = a.shift(); s < i.length; s++) {
                            var o = resolveTestFromToken(i[s], a, [ s ]);
                            if (o && C === D || C > D) {
                                break;
                            }
                        }
                    }
                    if (A.length === 0 || O) {
                        A.push({
                            match: {
                                fn: null,
                                optionality: false,
                                casing: null,
                                def: "",
                                placeholder: ""
                            },
                            locator: [],
                            mloc: {},
                            cd: I
                        });
                    }
                    if (e !== F && getMaskSet().tests[D]) {
                        return N.extend(true, [], A);
                    }
                    getMaskSet().tests[D] = N.extend(true, [], A);
                    console.log(D + " - " + JSON.stringify(A));
                    return getMaskSet().tests[D];
                }
                function getBufferTemplate() {
                    if (getMaskSet()._buffer === F) {
                        getMaskSet()._buffer = getMaskTemplate(false, 1);
                        if (getMaskSet().buffer === F) getMaskSet().buffer = getMaskSet()._buffer.slice();
                    }
                    return getMaskSet()._buffer;
                }
                function getBuffer(e) {
                    if (getMaskSet().buffer === F || e === true) {
                        getMaskSet().buffer = getMaskTemplate(true, getLastValidPosition(), true);
                        if (getMaskSet()._buffer === F) getMaskSet()._buffer = getMaskSet().buffer.slice();
                    }
                    return getMaskSet().buffer;
                }
                function refreshFromBuffer(e, t, i) {
                    var a, n;
                    if (e === true) {
                        resetMaskSet();
                        e = 0;
                        t = i.length;
                    } else {
                        for (a = e; a < t; a++) {
                            delete getMaskSet().validPositions[a];
                        }
                    }
                    n = e;
                    for (a = e; a < t; a++) {
                        resetMaskSet(true);
                        if (i[a] !== L.skipOptionalPartCharacter) {
                            var r = isValid(n, i[a], true, true);
                            if (r !== false) {
                                resetMaskSet(true);
                                n = r.caret !== F ? r.caret : r.pos + 1;
                            }
                        }
                    }
                }
                function casing(e, t, i) {
                    switch (L.casing || t.casing) {
                      case "upper":
                        e = e.toUpperCase();
                        break;

                      case "lower":
                        e = e.toLowerCase();
                        break;

                      case "title":
                        var a = getMaskSet().validPositions[i - 1];
                        if (i === 0 || a && a.input === String.fromCharCode(Inputmask.keyCode.SPACE)) {
                            e = e.toUpperCase();
                        } else {
                            e = e.toLowerCase();
                        }
                        break;

                      default:
                        if (N.isFunction(L.casing)) {
                            var n = Array.prototype.slice.call(arguments);
                            n.push(getMaskSet().validPositions);
                            e = L.casing.apply(this, n);
                        }
                    }
                    return e;
                }
                function checkAlternationMatch(e, t, i) {
                    var a = L.greedy ? t : t.slice(0, 1), n = false, r = i !== F ? i.split(",") : [], s;
                    for (var o = 0; o < r.length; o++) {
                        if ((s = e.indexOf(r[o])) !== -1) {
                            e.splice(s, 1);
                        }
                    }
                    for (var l = 0; l < e.length; l++) {
                        if (N.inArray(e[l], a) !== -1) {
                            n = true;
                            break;
                        }
                    }
                    return n;
                }
                function alternate(e, t, i, a, n) {
                    var r = N.extend(true, {}, getMaskSet().validPositions), s, o, l = false, u, f, c, p, d, g = n !== F ? n : getLastValidPosition();
                    if (g === -1 && n === F) {
                        s = 0;
                        f = getTest(s);
                        o = f.alternation;
                    } else {
                        for (;g >= 0; g--) {
                            u = getMaskSet().validPositions[g];
                            if (u && u.alternation !== F) {
                                if (f && f.locator[u.alternation] !== u.locator[u.alternation]) {
                                    break;
                                }
                                s = g;
                                o = getMaskSet().validPositions[s].alternation;
                                f = u;
                            }
                        }
                    }
                    if (o !== F) {
                        d = parseInt(s);
                        getMaskSet().excludes[d] = getMaskSet().excludes[d] || [];
                        if (e !== true) {
                            getMaskSet().excludes[d].push(getDecisionTaker(f));
                        }
                        var m = [], k = 0;
                        for (c = d; c < getLastValidPosition(F, true) + 1; c++) {
                            p = getMaskSet().validPositions[c];
                            if (p && p.generatedInput !== true) {
                                m.push(p.input);
                            } else if (c < e) k++;
                            delete getMaskSet().validPositions[c];
                        }
                        while (getMaskSet().excludes[d] && getMaskSet().excludes[d].length < 10) {
                            var h = k * -1, v = m.slice();
                            getMaskSet().tests[d] = F;
                            resetMaskSet(true);
                            l = true;
                            while (v.length > 0) {
                                var y = v.shift();
                                if (!(l = isValid(getLastValidPosition(F, true) + 1, y, false, a, true))) {
                                    break;
                                }
                            }
                            if (l && t !== F) {
                                var b = getLastValidPosition(e) + 1;
                                for (c = d; c < getLastValidPosition() + 1; c++) {
                                    p = getMaskSet().validPositions[c];
                                    if ((p === F || p.match.fn == null) && c < e + h) {
                                        h++;
                                    }
                                }
                                e = e + h;
                                l = isValid(e > b ? b : e, t, i, a, true);
                            }
                            if (!l) {
                                resetMaskSet();
                                f = getTest(d);
                                getMaskSet().validPositions = N.extend(true, {}, r);
                                if (getMaskSet().excludes[d]) {
                                    var M = getDecisionTaker(f);
                                    if (getMaskSet().excludes[d].indexOf(M) !== -1) {
                                        l = alternate(e, t, i, a, d - 1);
                                        break;
                                    }
                                    getMaskSet().excludes[d].push(M);
                                    for (c = d; c < getLastValidPosition(F, true) + 1; c++) {
                                        delete getMaskSet().validPositions[c];
                                    }
                                } else {
                                    l = alternate(e, t, i, a, d - 1);
                                    break;
                                }
                            } else break;
                        }
                    }
                    getMaskSet().excludes[d] = F;
                    return l;
                }
                function isValid(u, e, t, f, i, a) {
                    function isSelection(e) {
                        return g ? e.begin - e.end > 1 || e.begin - e.end === 1 : e.end - e.begin > 1 || e.end - e.begin === 1;
                    }
                    t = t === true;
                    var n = u;
                    if (u.begin !== F) {
                        n = g ? u.end : u.begin;
                    }
                    function _isValid(r, s, o) {
                        var l = false;
                        N.each(getTests(r), function(e, t) {
                            var i = t.match;
                            getBuffer(true);
                            l = i.fn != null ? i.fn.test(s, getMaskSet(), r, o, L, isSelection(u)) : (s === i.def || s === L.skipOptionalPartCharacter) && i.def !== "" ? {
                                c: getPlaceholder(r, i, true) || i.def,
                                pos: r
                            } : false;
                            if (l !== false) {
                                var a = l.c !== F ? l.c : s, n = r;
                                a = a === L.skipOptionalPartCharacter && i.fn === null ? getPlaceholder(r, i, true) || i.def : a;
                                if (l.remove !== F) {
                                    if (!N.isArray(l.remove)) l.remove = [ l.remove ];
                                    N.each(l.remove.sort(function(e, t) {
                                        return t - e;
                                    }), function(e, t) {
                                        revalidateMask({
                                            begin: t,
                                            end: t + 1
                                        });
                                    });
                                }
                                if (l.insert !== F) {
                                    if (!N.isArray(l.insert)) l.insert = [ l.insert ];
                                    N.each(l.insert.sort(function(e, t) {
                                        return e - t;
                                    }), function(e, t) {
                                        isValid(t.pos, t.c, true, f);
                                    });
                                }
                                if (l !== true && l.pos !== F && l.pos !== r) {
                                    n = l.pos;
                                }
                                if (l !== true && l.pos === F && l.c === F) {
                                    return false;
                                }
                                if (!revalidateMask(u, N.extend({}, t, {
                                    input: casing(a, i, n)
                                }), f, n)) {
                                    l = false;
                                }
                                return false;
                            }
                        });
                        return l;
                    }
                    var r = true, s = N.extend(true, {}, getMaskSet().validPositions);
                    if (N.isFunction(L.preValidation) && !t && f !== true && a !== true) {
                        r = L.preValidation(getBuffer(), n, e, isSelection(u), L, getMaskSet());
                    }
                    if (r === true) {
                        trackbackPositions(F, n, true);
                        if (h === F || n < h) {
                            r = _isValid(n, e, t);
                            if ((!t || f === true) && r === false && a !== true) {
                                var o = getMaskSet().validPositions[n];
                                if (o && o.match.fn === null && (o.match.def === e || e === L.skipOptionalPartCharacter)) {
                                    r = {
                                        caret: seekNext(n)
                                    };
                                } else if ((L.insertMode || getMaskSet().validPositions[seekNext(n)] === F) && !isMask(n, true)) {
                                    for (var l = n + 1, c = seekNext(n); l <= c; l++) {
                                        r = _isValid(l, e, t);
                                        if (r !== false) {
                                            r = trackbackPositions(n, r.pos !== F ? r.pos : l) || r;
                                            n = l;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        if (r === false && L.keepStatic !== false && (L.regex == null || isComplete(getBuffer())) && !t && i !== true) {
                            r = alternate(n, e, t, f);
                        }
                        if (r === true) {
                            r = {
                                pos: n
                            };
                        }
                    }
                    if (N.isFunction(L.postValidation) && r !== false && !t && f !== true && a !== true) {
                        var p = L.postValidation(getBuffer(true), u.begin !== F ? g ? u.end : u.begin : u, r, L);
                        if (p !== F) {
                            if (p.refreshFromBuffer && p.buffer) {
                                var d = p.refreshFromBuffer;
                                refreshFromBuffer(d === true ? d : d.start, d.end, p.buffer);
                            }
                            r = p === true ? r : p;
                        }
                    }
                    if (r && r.pos === F) {
                        r.pos = n;
                    }
                    if (r === false || a === true) {
                        resetMaskSet(true);
                        getMaskSet().validPositions = N.extend(true, {}, s);
                    }
                    return r;
                }
                function trackbackPositions(e, t, i) {
                    var a;
                    if (e === F) {
                        for (e = t - 1; e > 0; e--) {
                            if (getMaskSet().validPositions[e]) break;
                        }
                    }
                    for (var n = e; n < t; n++) {
                        if (getMaskSet().validPositions[n] === F && !isMask(n, true)) {
                            var r = n == 0 ? getTest(n) : getMaskSet().validPositions[n - 1];
                            if (r) {
                                var s = getTests(n).slice();
                                if (s[s.length - 1].match.def === "") s.pop();
                                var o = determineTestTemplate(n, s);
                                o = N.extend({}, o, {
                                    input: getPlaceholder(n, o.match, true) || o.match.def
                                });
                                o.generatedInput = true;
                                revalidateMask(n, o, true);
                                if (i !== true) {
                                    var l = getMaskSet().validPositions[t].input;
                                    getMaskSet().validPositions[t] = F;
                                    a = isValid(t, l, true, true);
                                }
                            }
                        }
                    }
                    return a;
                }
                function revalidateMask(e, t, i, a) {
                    function IsEnclosedStatic(e, t, i) {
                        var a = t[e];
                        if (a !== F && (a.match.fn === null && a.match.optionality !== true || a.input === L.radixPoint)) {
                            var n = i.begin <= e - 1 ? t[e - 1] && t[e - 1].match.fn === null && t[e - 1] : t[e - 1], r = i.end > e + 1 ? t[e + 1] && t[e + 1].match.fn === null && t[e + 1] : t[e + 1];
                            return n && r;
                        }
                        return false;
                    }
                    var n = e.begin !== F ? e.begin : e, r = e.end !== F ? e.end : e;
                    if (e.begin > e.end) {
                        n = e.end;
                        r = e.begin;
                    }
                    a = a !== F ? a : n;
                    if (n !== r || L.insertMode && getMaskSet().validPositions[a] !== F && i === F) {
                        var s = N.extend(true, {}, getMaskSet().validPositions), o = getLastValidPosition(F, true), l;
                        getMaskSet().p = n;
                        for (l = o; l >= n; l--) {
                            if (getMaskSet().validPositions[l] && getMaskSet().validPositions[l].match.nativeDef === "+") {
                                L.isNegative = false;
                            }
                            delete getMaskSet().validPositions[l];
                        }
                        var u = true, f = a, c = getMaskSet().validPositions, p = false, d = f, l = f;
                        if (t) {
                            getMaskSet().validPositions[a] = N.extend(true, {}, t);
                            d++;
                            f++;
                            if (n < r) l++;
                        }
                        for (;l <= o; l++) {
                            var g = s[l];
                            if (g !== F && (l >= r || l >= n && g.generatedInput !== true && IsEnclosedStatic(l, s, {
                                begin: n,
                                end: r
                            }))) {
                                while (getTest(d).match.def !== "") {
                                    if (p === false && s[d] && s[d].match.nativeDef === g.match.nativeDef) {
                                        getMaskSet().validPositions[d] = N.extend(true, {}, s[d]);
                                        getMaskSet().validPositions[d].input = g.input;
                                        trackbackPositions(F, d, true);
                                        f = d + 1;
                                        u = true;
                                    } else if (L.shiftPositions && positionCanMatchDefinition(d, g.match.def)) {
                                        var m = isValid(d, g.input, true, true);
                                        u = m !== false;
                                        f = m.caret || m.insert ? getLastValidPosition() : d + 1;
                                        p = true;
                                    } else {
                                        u = g.generatedInput === true || g.input === L.radixPoint && L.numericInput === true;
                                    }
                                    if (u) break;
                                    if (!u && d > r && isMask(d, true) && (g.match.fn !== null || d > getMaskSet().maskLength)) {
                                        break;
                                    }
                                    d++;
                                }
                                if (getTest(d).match.def == "") u = false;
                                d = f;
                            }
                            if (!u) break;
                        }
                        if (!u) {
                            getMaskSet().validPositions = N.extend(true, {}, s);
                            resetMaskSet(true);
                            return false;
                        }
                    } else if (t) {
                        getMaskSet().validPositions[a] = N.extend(true, {}, t);
                    }
                    resetMaskSet(true);
                    return true;
                }
                function isMask(e, t) {
                    var i = getTestTemplate(e).match;
                    if (i.def === "") i = getTest(e).match;
                    if (i.fn != null) {
                        return i.fn;
                    }
                    if (t !== true && e > -1) {
                        var a = getTests(e);
                        return a.length > 1 + (a[a.length - 1].match.def === "" ? 1 : 0);
                    }
                    return false;
                }
                function seekNext(e, t) {
                    var i = e + 1;
                    while (getTest(i).match.def !== "" && (t === true && (getTest(i).match.newBlockMarker !== true || !isMask(i)) || t !== true && !isMask(i))) {
                        i++;
                    }
                    return i;
                }
                function seekPrevious(e, t) {
                    var i = e, a;
                    if (i <= 0) return 0;
                    while (--i > 0 && (t === true && getTest(i).match.newBlockMarker !== true || t !== true && !isMask(i) && (a = getTests(i), 
                    a.length < 2 || a.length === 2 && a[1].match.def === ""))) {}
                    return i;
                }
                function writeBuffer(e, t, i, a, n) {
                    if (a && N.isFunction(L.onBeforeWrite)) {
                        var r = L.onBeforeWrite.call(f, a, t, i, L);
                        if (r) {
                            if (r.refreshFromBuffer) {
                                var s = r.refreshFromBuffer;
                                refreshFromBuffer(s === true ? s : s.start, s.end, r.buffer || t);
                                t = getBuffer(true);
                            }
                            if (i !== F) i = r.caret !== F ? r.caret : i;
                        }
                    }
                    if (e !== F) {
                        e.inputmask._valueSet(t.join(""));
                        if (i !== F && (a === F || a.type !== "blur")) {
                            caret(e, i);
                        } else renderColorMask(e, i, t.length === 0);
                        if (n === true) {
                            var o = N(e), l = e.inputmask._valueGet();
                            u = true;
                            o.trigger("input");
                            setTimeout(function() {
                                if (l === getBufferTemplate().join("")) {
                                    o.trigger("cleared");
                                } else if (isComplete(t) === true) {
                                    o.trigger("complete");
                                }
                            }, 0);
                        }
                    }
                }
                function getPlaceholder(e, t, i) {
                    t = t || getTest(e).match;
                    if (t.placeholder !== F || i === true) {
                        return N.isFunction(t.placeholder) ? t.placeholder(L) : t.placeholder;
                    } else if (t.fn === null) {
                        if (e > -1 && getMaskSet().validPositions[e] === F) {
                            var a = getTests(e), n = [], r;
                            if (a.length > 1 + (a[a.length - 1].match.def === "" ? 1 : 0)) {
                                for (var s = 0; s < a.length; s++) {
                                    if (a[s].match.optionality !== true && a[s].match.optionalQuantifier !== true && (a[s].match.fn === null || r === F || a[s].match.fn.test(r.match.def, getMaskSet(), e, true, L) !== false)) {
                                        n.push(a[s]);
                                        if (a[s].match.fn === null) r = a[s];
                                        if (n.length > 1) {
                                            if (/[0-9a-bA-Z]/.test(n[0].match.def)) {
                                                return L.placeholder.charAt(e % L.placeholder.length);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return t.def;
                    }
                    return L.placeholder.charAt(e % L.placeholder.length);
                }
                function HandleNativePlaceholder(e, t) {
                    if (P && e.inputmask._valueGet() !== t) {
                        var i = getBuffer().slice(), a = e.inputmask._valueGet();
                        if (a !== t) {
                            if (getLastValidPosition() === -1 && a === getBufferTemplate().join("")) {
                                i = [];
                            } else {
                                clearOptionalTail(i);
                            }
                            writeBuffer(e, i);
                        }
                    } else if (e.placeholder !== t) {
                        e.placeholder = t;
                        if (e.placeholder === "") e.removeAttribute("placeholder");
                    }
                }
                var o = {
                    on: function on(e, t, r) {
                        var i = function ev(e) {
                            var t = this;
                            if (t.inputmask === F && this.nodeName !== "FORM") {
                                var i = N.data(t, "_inputmask_opts");
                                if (i) new Inputmask(i).mask(t); else o.off(t);
                            } else if (e.type !== "setvalue" && this.nodeName !== "FORM" && (t.disabled || t.readOnly && !(e.type === "keydown" && e.ctrlKey && e.keyCode === 67 || L.tabThrough === false && e.keyCode === Inputmask.keyCode.TAB))) {
                                e.preventDefault();
                            } else {
                                switch (e.type) {
                                  case "input":
                                    if (u === true) {
                                        u = false;
                                        return e.preventDefault();
                                    }
                                    if (_) {
                                        var a = arguments;
                                        setTimeout(function() {
                                            r.apply(t, a);
                                            caret(t, t.inputmask.caretPos, F, true);
                                        }, 0);
                                        return false;
                                    }
                                    break;

                                  case "keydown":
                                    s = false;
                                    u = false;
                                    break;

                                  case "keypress":
                                    if (s === true) {
                                        return e.preventDefault();
                                    }
                                    s = true;
                                    break;

                                  case "click":
                                    if (E || w) {
                                        var a = arguments;
                                        setTimeout(function() {
                                            r.apply(t, a);
                                        }, 0);
                                        return false;
                                    }
                                    break;
                                }
                                var n = r.apply(t, arguments);
                                if (n === false) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                                return n;
                            }
                        };
                        e.inputmask.events[t] = e.inputmask.events[t] || [];
                        e.inputmask.events[t].push(i);
                        if (N.inArray(t, [ "submit", "reset" ]) !== -1) {
                            if (e.form !== null) N(e.form).on(t, i);
                        } else {
                            N(e).on(t, i);
                        }
                    },
                    off: function off(a, e) {
                        if (a.inputmask && a.inputmask.events) {
                            var t;
                            if (e) {
                                t = [];
                                t[e] = a.inputmask.events[e];
                            } else {
                                t = a.inputmask.events;
                            }
                            N.each(t, function(e, t) {
                                while (t.length > 0) {
                                    var i = t.pop();
                                    if (N.inArray(e, [ "submit", "reset" ]) !== -1) {
                                        if (a.form !== null) N(a.form).off(e, i);
                                    } else {
                                        N(a).off(e, i);
                                    }
                                }
                                delete a.inputmask.events[e];
                            });
                        }
                    }
                };
                var v = {
                    keydownEvent: function keydownEvent(e) {
                        var t = this, i = N(t), a = e.keyCode, n = caret(t);
                        if (a === Inputmask.keyCode.BACKSPACE || a === Inputmask.keyCode.DELETE || w && a === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && a === Inputmask.keyCode.X && !isInputEventSupported("cut")) {
                            e.preventDefault();
                            handleRemove(t, a, n);
                            writeBuffer(t, getBuffer(true), getMaskSet().p, e, t.inputmask._valueGet() !== getBuffer().join(""));
                        } else if (a === Inputmask.keyCode.END || a === Inputmask.keyCode.PAGE_DOWN) {
                            e.preventDefault();
                            var r = seekNext(getLastValidPosition());
                            caret(t, e.shiftKey ? n.begin : r, r, true);
                        } else if (a === Inputmask.keyCode.HOME && !e.shiftKey || a === Inputmask.keyCode.PAGE_UP) {
                            e.preventDefault();
                            caret(t, 0, e.shiftKey ? n.begin : 0, true);
                        } else if ((L.undoOnEscape && a === Inputmask.keyCode.ESCAPE || a === 90 && e.ctrlKey) && e.altKey !== true) {
                            checkVal(t, true, false, m.split(""));
                            i.trigger("click");
                        } else if (a === Inputmask.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) {
                            L.insertMode = !L.insertMode;
                            t.setAttribute("im-insert", L.insertMode);
                        } else if (L.tabThrough === true && a === Inputmask.keyCode.TAB) {
                            if (e.shiftKey === true) {
                                if (getTest(n.begin).match.fn === null) {
                                    n.begin = seekNext(n.begin);
                                }
                                n.end = seekPrevious(n.begin, true);
                                n.begin = seekPrevious(n.end, true);
                            } else {
                                n.begin = seekNext(n.begin, true);
                                n.end = seekNext(n.begin, true);
                                if (n.end < getMaskSet().maskLength) n.end--;
                            }
                            if (n.begin < getMaskSet().maskLength) {
                                e.preventDefault();
                                caret(t, n.begin, n.end);
                            }
                        }
                        L.onKeyDown.call(this, e, getBuffer(), caret(t).begin, L);
                        k = N.inArray(a, L.ignorables) !== -1;
                    },
                    keypressEvent: function keypressEvent(e, t, i, a, n) {
                        var r = this, s = N(r), o = e.which || e.charCode || e.keyCode;
                        if (t !== true && !(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || k)) {
                            if (o === Inputmask.keyCode.ENTER && m !== getBuffer().join("")) {
                                m = getBuffer().join("");
                                setTimeout(function() {
                                    s.trigger("change");
                                }, 0);
                            }
                            return true;
                        } else {
                            if (o) {
                                if (o === 46 && e.shiftKey === false && L.radixPoint !== "") o = L.radixPoint.charCodeAt(0);
                                var l = t ? {
                                    begin: n,
                                    end: n
                                } : caret(r), u, f = String.fromCharCode(o), c = 0;
                                if (L._radixDance && L.numericInput) {
                                    var p = getBuffer().indexOf(L.radixPoint.charAt(0)) + 1;
                                    if (l.begin <= p) {
                                        if (o === L.radixPoint.charCodeAt(0)) c = 1;
                                        l.begin -= 1;
                                        l.end -= 1;
                                    }
                                }
                                getMaskSet().writeOutBuffer = true;
                                var d = isValid(l, f, a);
                                if (d !== false) {
                                    resetMaskSet(true);
                                    u = d.caret !== F ? d.caret : seekNext(d.pos.begin ? d.pos.begin : d.pos);
                                    getMaskSet().p = u;
                                }
                                u = (L.numericInput && d.caret === F ? seekPrevious(u) : u) + c;
                                if (i !== false) {
                                    setTimeout(function() {
                                        L.onKeyValidation.call(r, o, d, L);
                                    }, 0);
                                    if (getMaskSet().writeOutBuffer && d !== false) {
                                        var g = getBuffer();
                                        writeBuffer(r, g, u, e, t !== true);
                                    }
                                }
                                e.preventDefault();
                                if (t) {
                                    if (d !== false) d.forwardPosition = u;
                                    return d;
                                }
                            }
                        }
                    },
                    pasteEvent: function pasteEvent(e) {
                        var t = this, i = e.originalEvent || e, a = N(t), n = t.inputmask._valueGet(true), r = caret(t), s;
                        if (g) {
                            s = r.end;
                            r.end = r.begin;
                            r.begin = s;
                        }
                        var o = n.substr(0, r.begin), l = n.substr(r.end, n.length);
                        if (o === (g ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, r.begin).join("")) o = "";
                        if (l === (g ? getBufferTemplate().reverse() : getBufferTemplate()).slice(r.end).join("")) l = "";
                        if (S.clipboardData && S.clipboardData.getData) {
                            n = o + S.clipboardData.getData("Text") + l;
                        } else if (i.clipboardData && i.clipboardData.getData) {
                            n = o + i.clipboardData.getData("text/plain") + l;
                        } else return true;
                        var u = n;
                        if (N.isFunction(L.onBeforePaste)) {
                            u = L.onBeforePaste.call(f, n, L);
                            if (u === false) {
                                return e.preventDefault();
                            }
                            if (!u) {
                                u = n;
                            }
                        }
                        checkVal(t, false, false, u.toString().split(""));
                        writeBuffer(t, getBuffer(), seekNext(getLastValidPosition()), e, m !== getBuffer().join(""));
                        return e.preventDefault();
                    },
                    inputFallBackEvent: function inputFallBackEvent(e) {
                        function radixPointHandler(e, t, i) {
                            if (t.charAt(i.begin - 1) === "." && L.radixPoint !== "") {
                                t = t.split("");
                                t[i.begin - 1] = L.radixPoint.charAt(0);
                                t = t.join("");
                            }
                            return t;
                        }
                        function ieMobileHandler(e, t, i) {
                            if (E) {
                                var a = t.replace(getBuffer().join(""), "");
                                if (a.length === 1) {
                                    var n = t.split("");
                                    n.splice(i.begin, 0, a);
                                    t = n.join("");
                                }
                            }
                            return t;
                        }
                        var a = this, t = a.inputmask._valueGet();
                        if (getBuffer().join("") !== t) {
                            var i = caret(a);
                            t = radixPointHandler(a, t, i);
                            t = ieMobileHandler(a, t, i);
                            if (getBuffer().join("") !== t) {
                                var n = getBuffer().join(""), r = !L.numericInput && t.length > n.length ? -1 : 0, s = t.substr(0, i.begin), o = t.substr(i.begin), l = n.substr(0, i.begin + r), u = n.substr(i.begin + r);
                                var f = i, c = "", p = false;
                                if (s !== l) {
                                    var d = (p = s.length >= l.length) ? s.length : l.length, g;
                                    for (g = 0; s.charAt(g) === l.charAt(g) && g < d; g++) {}
                                    if (p) {
                                        f.begin = g - r;
                                        c += s.slice(g, f.end);
                                    }
                                }
                                if (o !== u) {
                                    if (o.length > u.length) {
                                        c += o.slice(0, 1);
                                    } else {
                                        if (o.length < u.length) {
                                            f.end += u.length - o.length;
                                            if (!p && L.radixPoint !== "" && o === "" && s.charAt(f.begin + r - 1) === L.radixPoint) {
                                                f.begin--;
                                                c = L.radixPoint;
                                            }
                                        }
                                    }
                                }
                                writeBuffer(a, getBuffer(), {
                                    begin: f.begin + r,
                                    end: f.end + r
                                });
                                if (c.length > 0) {
                                    N.each(c.split(""), function(e, t) {
                                        var i = new N.Event("keypress");
                                        i.which = t.charCodeAt(0);
                                        k = false;
                                        v.keypressEvent.call(a, i);
                                    });
                                } else {
                                    if (f.begin === f.end - 1) {
                                        f.begin = seekPrevious(f.begin + 1);
                                        if (f.begin === f.end - 1) {
                                            caret(a, f.begin);
                                        } else {
                                            caret(a, f.begin, f.end);
                                        }
                                    }
                                    var m = new N.Event("keydown");
                                    m.keyCode = L.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE;
                                    v.keydownEvent.call(a, m);
                                }
                                e.preventDefault();
                            }
                        }
                    },
                    beforeInputEvent: function beforeInputEvent(e) {
                        if (e.cancelable) {
                            var a = this;
                            switch (e.inputType) {
                              case "insertText":
                                N.each(e.data.split(""), function(e, t) {
                                    var i = new N.Event("keypress");
                                    i.which = t.charCodeAt(0);
                                    k = false;
                                    v.keypressEvent.call(a, i);
                                });
                                return e.preventDefault();

                              case "deleteContentBackward":
                                var t = new N.Event("keydown");
                                t.keyCode = Inputmask.keyCode.BACKSPACE;
                                v.keydownEvent.call(a, t);
                                return e.preventDefault();

                              case "deleteContentForward":
                                var t = new N.Event("keydown");
                                t.keyCode = Inputmask.keyCode.DELETE;
                                v.keydownEvent.call(a, t);
                                return e.preventDefault();
                            }
                        }
                    },
                    setValueEvent: function setValueEvent(e) {
                        this.inputmask.refreshValue = false;
                        var t = this, i = e && e.detail ? e.detail[0] : arguments[1], i = i || t.inputmask._valueGet(true);
                        if (N.isFunction(L.onBeforeMask)) i = L.onBeforeMask.call(f, i, L) || i;
                        i = i.split("");
                        checkVal(t, true, false, i);
                        m = getBuffer().join("");
                        if ((L.clearMaskOnLostFocus || L.clearIncomplete) && t.inputmask._valueGet() === getBufferTemplate().join("")) {
                            t.inputmask._valueSet("");
                        }
                    },
                    focusEvent: function focusEvent(e) {
                        var t = this, i = t.inputmask._valueGet();
                        if (L.showMaskOnFocus && (!L.showMaskOnHover || L.showMaskOnHover && i === "")) {
                            if (t.inputmask._valueGet() !== getBuffer().join("")) {
                                writeBuffer(t, getBuffer(), seekNext(getLastValidPosition()));
                            } else if (a === false) {
                                caret(t, seekNext(getLastValidPosition()));
                            }
                        }
                        if (L.positionCaretOnTab === true && a === false) {
                            v.clickEvent.apply(t, [ e, true ]);
                        }
                        m = getBuffer().join("");
                    },
                    mouseleaveEvent: function mouseleaveEvent(e) {
                        var t = this;
                        a = false;
                        if (L.clearMaskOnLostFocus && x.activeElement !== t) {
                            HandleNativePlaceholder(t, r);
                        }
                    },
                    clickEvent: function clickEvent(e, u) {
                        function doRadixFocus(e) {
                            if (L.radixPoint !== "") {
                                var t = getMaskSet().validPositions;
                                if (t[e] === F || t[e].input === getPlaceholder(e)) {
                                    if (e < seekNext(-1)) return true;
                                    var i = N.inArray(L.radixPoint, getBuffer());
                                    if (i !== -1) {
                                        for (var a in t) {
                                            if (i < a && t[a].input !== getPlaceholder(a)) {
                                                return false;
                                            }
                                        }
                                        return true;
                                    }
                                }
                            }
                            return false;
                        }
                        var f = this;
                        setTimeout(function() {
                            if (x.activeElement === f) {
                                var e = caret(f);
                                if (u) {
                                    if (g) {
                                        e.end = e.begin;
                                    } else {
                                        e.begin = e.end;
                                    }
                                }
                                if (e.begin === e.end) {
                                    switch (L.positionCaretOnClick) {
                                      case "none":
                                        break;

                                      case "select":
                                        caret(f, 0, getBuffer().length);
                                        break;

                                      case "ignore":
                                        caret(f, seekNext(getLastValidPosition()));
                                        break;

                                      case "radixFocus":
                                        if (doRadixFocus(e.begin)) {
                                            var t = getBuffer().join("").indexOf(L.radixPoint);
                                            caret(f, L.numericInput ? seekNext(t) : t);
                                            break;
                                        }

                                      default:
                                        var i = e.begin, a = getLastValidPosition(i, true), n = seekNext(a);
                                        if (i < n) {
                                            caret(f, !isMask(i, true) && !isMask(i - 1, true) ? seekNext(i) : i);
                                        } else {
                                            var r = getMaskSet().validPositions[a], s = getTestTemplate(n, r ? r.match.locator : F, r), o = getPlaceholder(n, s.match);
                                            if (o !== "" && getBuffer()[n] !== o && s.match.optionalQuantifier !== true && s.match.newBlockMarker !== true || !isMask(n, L.keepStatic) && s.match.def === o) {
                                                var l = seekNext(n);
                                                if (i >= l || i === n) {
                                                    n = l;
                                                }
                                            }
                                            caret(f, n);
                                        }
                                        break;
                                    }
                                }
                            }
                        }, 0);
                    },
                    cutEvent: function cutEvent(e) {
                        var t = this, i = N(t), a = caret(t), n = e.originalEvent || e;
                        var r = S.clipboardData || n.clipboardData, s = g ? getBuffer().slice(a.end, a.begin) : getBuffer().slice(a.begin, a.end);
                        r.setData("text", g ? s.reverse().join("") : s.join(""));
                        if (x.execCommand) x.execCommand("copy");
                        handleRemove(t, Inputmask.keyCode.DELETE, a);
                        writeBuffer(t, getBuffer(), getMaskSet().p, e, m !== getBuffer().join(""));
                    },
                    blurEvent: function blurEvent(e) {
                        var t = N(this), i = this;
                        if (i.inputmask) {
                            HandleNativePlaceholder(i, r);
                            var a = i.inputmask._valueGet(), n = getBuffer().slice();
                            if (a !== "" || p !== F) {
                                if (L.clearMaskOnLostFocus) {
                                    if (getLastValidPosition() === -1 && a === getBufferTemplate().join("")) {
                                        n = [];
                                    } else {
                                        clearOptionalTail(n);
                                    }
                                }
                                if (isComplete(n) === false) {
                                    setTimeout(function() {
                                        t.trigger("incomplete");
                                    }, 0);
                                    if (L.clearIncomplete) {
                                        resetMaskSet();
                                        if (L.clearMaskOnLostFocus) {
                                            n = [];
                                        } else {
                                            n = getBufferTemplate().slice();
                                        }
                                    }
                                }
                                writeBuffer(i, n, F, e);
                            }
                            if (m !== getBuffer().join("")) {
                                m = n.join("");
                                t.trigger("change");
                            }
                        }
                    },
                    mouseenterEvent: function mouseenterEvent(e) {
                        var t = this;
                        a = true;
                        if (x.activeElement !== t && L.showMaskOnHover) {
                            HandleNativePlaceholder(t, (g ? getBuffer().slice().reverse() : getBuffer()).join(""));
                        }
                    },
                    submitEvent: function submitEvent(e) {
                        if (m !== getBuffer().join("")) {
                            n.trigger("change");
                        }
                        if (L.clearMaskOnLostFocus && getLastValidPosition() === -1 && l.inputmask._valueGet && l.inputmask._valueGet() === getBufferTemplate().join("")) {
                            l.inputmask._valueSet("");
                        }
                        if (L.clearIncomplete && isComplete(getBuffer()) === false) {
                            l.inputmask._valueSet("");
                        }
                        if (L.removeMaskOnSubmit) {
                            l.inputmask._valueSet(l.inputmask.unmaskedvalue(), true);
                            setTimeout(function() {
                                writeBuffer(l, getBuffer());
                            }, 0);
                        }
                    },
                    resetEvent: function resetEvent(e) {
                        l.inputmask.refreshValue = true;
                        setTimeout(function() {
                            n.trigger("setvalue");
                        }, 0);
                    }
                };
                function checkVal(n, e, r, t, i) {
                    var s = this || n.inputmask, o = t.slice(), l = "", u = -1, f = F;
                    function isTemplateMatch(e, t) {
                        var i = getMaskTemplate(true, 0, false).slice(e, seekNext(e)).join("").replace(/'/g, "").indexOf(t);
                        return i !== -1 && !isMask(e) && (getTest(e).match.nativeDef === t.charAt(0) || getTest(e).match.fn === null && getTest(e).match.nativeDef === "'" + t.charAt(0) || getTest(e).match.nativeDef === " " && (getTest(e + 1).match.nativeDef === t.charAt(0) || getTest(e + 1).match.fn === null && getTest(e + 1).match.nativeDef === "'" + t.charAt(0)));
                    }
                    resetMaskSet();
                    if (!r && L.autoUnmask !== true) {
                        var a = getBufferTemplate().slice(0, seekNext(-1)).join(""), c = o.join("").match(new RegExp("^" + Inputmask.escapeRegex(a), "g"));
                        if (c && c.length > 0) {
                            o.splice(0, c.length * a.length);
                            u = seekNext(u);
                        }
                    } else {
                        u = seekNext(u);
                    }
                    if (u === -1) {
                        getMaskSet().p = seekNext(u);
                        u = 0;
                    } else getMaskSet().p = u;
                    s.caretPos = {
                        begin: u
                    };
                    N.each(o, function(e, t) {
                        if (t !== F) {
                            if (getMaskSet().validPositions[e] === F && o[e] === getPlaceholder(e) && isMask(e, true) && isValid(e, o[e], true, F, F, true) === false) {
                                getMaskSet().p++;
                            } else {
                                var i = new N.Event("_checkval");
                                i.which = t.charCodeAt(0);
                                l += t;
                                var a = getLastValidPosition(F, true);
                                if (!isTemplateMatch(u, l)) {
                                    f = v.keypressEvent.call(n, i, true, false, r, s.caretPos.begin);
                                    if (f) {
                                        u = s.caretPos.begin + 1;
                                        l = "";
                                    }
                                } else {
                                    f = v.keypressEvent.call(n, i, true, false, r, a + 1);
                                }
                                if (f) {
                                    writeBuffer(F, getBuffer(), f.forwardPosition, i, false);
                                    s.caretPos = {
                                        begin: f.forwardPosition,
                                        end: f.forwardPosition
                                    };
                                }
                            }
                        }
                    });
                    if (e) writeBuffer(n, getBuffer(), f ? f.forwardPosition : F, i || new N.Event("checkval"), i && i.type === "input");
                }
                function unmaskedvalue(e) {
                    if (e) {
                        if (e.inputmask === F) {
                            return e.value;
                        }
                        if (e.inputmask && e.inputmask.refreshValue) {
                            v.setValueEvent.call(e);
                        }
                    }
                    var t = [], i = getMaskSet().validPositions;
                    for (var a in i) {
                        if (i[a].match && i[a].match.fn != null) {
                            t.push(i[a].input);
                        }
                    }
                    var n = t.length === 0 ? "" : (g ? t.reverse() : t).join("");
                    if (N.isFunction(L.onUnMask)) {
                        var r = (g ? getBuffer().slice().reverse() : getBuffer()).join("");
                        n = L.onUnMask.call(f, r, n, L);
                    }
                    return n;
                }
                function caret(e, t, i, a) {
                    function translatePosition(e) {
                        if (g && typeof e === "number" && (!L.greedy || L.placeholder !== "") && l) {
                            e = l.inputmask._valueGet().length - e;
                        }
                        return e;
                    }
                    var n;
                    if (t !== F) {
                        if (N.isArray(t)) {
                            i = g ? t[0] : t[1];
                            t = g ? t[1] : t[0];
                        }
                        if (t.begin !== F) {
                            i = g ? t.begin : t.end;
                            t = g ? t.end : t.begin;
                        }
                        if (typeof t === "number") {
                            t = a ? t : translatePosition(t);
                            i = a ? i : translatePosition(i);
                            i = typeof i == "number" ? i : t;
                            var r = parseInt(((e.ownerDocument.defaultView || S).getComputedStyle ? (e.ownerDocument.defaultView || S).getComputedStyle(e, null) : e.currentStyle).fontSize) * i;
                            e.scrollLeft = r > e.scrollWidth ? r : 0;
                            e.inputmask.caretPos = {
                                begin: t,
                                end: i
                            };
                            if (e === x.activeElement) {
                                if ("selectionStart" in e) {
                                    e.selectionStart = t;
                                    e.selectionEnd = i;
                                } else if (S.getSelection) {
                                    n = x.createRange();
                                    if (e.firstChild === F || e.firstChild === null) {
                                        var s = x.createTextNode("");
                                        e.appendChild(s);
                                    }
                                    n.setStart(e.firstChild, t < e.inputmask._valueGet().length ? t : e.inputmask._valueGet().length);
                                    n.setEnd(e.firstChild, i < e.inputmask._valueGet().length ? i : e.inputmask._valueGet().length);
                                    n.collapse(true);
                                    var o = S.getSelection();
                                    o.removeAllRanges();
                                    o.addRange(n);
                                } else if (e.createTextRange) {
                                    n = e.createTextRange();
                                    n.collapse(true);
                                    n.moveEnd("character", i);
                                    n.moveStart("character", t);
                                    n.select();
                                }
                                renderColorMask(e, {
                                    begin: t,
                                    end: i
                                });
                            }
                        }
                    } else {
                        if ("selectionStart" in e) {
                            t = e.selectionStart;
                            i = e.selectionEnd;
                        } else if (S.getSelection) {
                            n = S.getSelection().getRangeAt(0);
                            if (n.commonAncestorContainer.parentNode === e || n.commonAncestorContainer === e) {
                                t = n.startOffset;
                                i = n.endOffset;
                            }
                        } else if (x.selection && x.selection.createRange) {
                            n = x.selection.createRange();
                            t = 0 - n.duplicate().moveStart("character", -e.inputmask._valueGet().length);
                            i = t + n.text.length;
                        }
                        return {
                            begin: a ? t : translatePosition(t),
                            end: a ? i : translatePosition(i)
                        };
                    }
                }
                function determineLastRequiredPosition(e) {
                    var t = getMaskTemplate(true, getLastValidPosition(), true, true), i = t.length, a, n = getLastValidPosition(), r = {}, s = getMaskSet().validPositions[n], o = s !== F ? s.locator.slice() : F, l;
                    for (a = n + 1; a < t.length; a++) {
                        l = getTestTemplate(a, o, a - 1);
                        o = l.locator.slice();
                        r[a] = N.extend(true, {}, l);
                    }
                    var u = s && s.alternation !== F ? s.locator[s.alternation] : F;
                    for (a = i - 1; a > n; a--) {
                        l = r[a];
                        if ((l.match.optionality || l.match.optionalQuantifier && l.match.newBlockMarker || u && (u !== r[a].locator[s.alternation] && l.match.fn != null || l.match.fn === null && l.locator[s.alternation] && checkAlternationMatch(l.locator[s.alternation].toString().split(","), u.toString().split(",")) && getTests(a)[0].def !== "")) && t[a] === getPlaceholder(a, l.match)) {
                            i--;
                        } else break;
                    }
                    return e ? {
                        l: i,
                        def: r[i] ? r[i].match : F
                    } : i;
                }
                function clearOptionalTail(e) {
                    e.length = 0;
                    var t = getMaskTemplate(true, 0, true, F, true), i, a;
                    while (i = t.shift(), i !== F) {
                        e.push(i);
                    }
                    return e;
                }
                function isComplete(e) {
                    if (N.isFunction(L.isComplete)) return L.isComplete(e, L);
                    if (L.repeat === "*") return F;
                    var t = false, i = determineLastRequiredPosition(true), a = seekPrevious(i.l);
                    if (i.def === F || i.def.newBlockMarker || i.def.optionality || i.def.optionalQuantifier) {
                        t = true;
                        for (var n = 0; n <= a; n++) {
                            var r = getTestTemplate(n).match;
                            if (r.fn !== null && getMaskSet().validPositions[n] === F && r.optionality !== true && r.optionalQuantifier !== true || r.fn === null && e[n] !== getPlaceholder(n, r)) {
                                t = false;
                                break;
                            }
                        }
                    }
                    return t;
                }
                function handleRemove(e, t, i, a, n) {
                    if (L.numericInput || g) {
                        if (t === Inputmask.keyCode.BACKSPACE) {
                            t = Inputmask.keyCode.DELETE;
                        } else if (t === Inputmask.keyCode.DELETE) {
                            t = Inputmask.keyCode.BACKSPACE;
                        }
                        if (g) {
                            var r = i.end;
                            i.end = i.begin;
                            i.begin = r;
                        }
                    }
                    if (t === Inputmask.keyCode.BACKSPACE && i.end - i.begin < 1) {
                        i.begin = seekPrevious(i.begin);
                        if (getMaskSet().validPositions[i.begin] !== F && getMaskSet().validPositions[i.begin].input === L.groupSeparator) {
                            i.begin--;
                        }
                    } else if (t === Inputmask.keyCode.DELETE && i.begin === i.end) {
                        i.end = isMask(i.end, true) && getMaskSet().validPositions[i.end] && getMaskSet().validPositions[i.end].input !== L.radixPoint ? i.end + 1 : seekNext(i.end) + 1;
                        if (getMaskSet().validPositions[i.begin] !== F && getMaskSet().validPositions[i.begin].input === L.groupSeparator) {
                            i.end++;
                        }
                    }
                    revalidateMask(i);
                    if (a !== true && L.keepStatic !== false || L.regex !== null) {
                        var s = alternate(true);
                        if (s) {
                            var o = s.caret !== F ? s.caret : s.pos ? seekNext(s.pos.begin ? s.pos.begin : s.pos) : getLastValidPosition(-1, true);
                            if (t !== Inputmask.keyCode.DELETE || i.begin > o) {
                                i.begin == o;
                            }
                        }
                    }
                    var l = getLastValidPosition(i.begin, true);
                    if (l < i.begin || i.begin === -1) {
                        getMaskSet().p = seekNext(l);
                    } else if (a !== true) {
                        getMaskSet().p = i.begin;
                        if (n !== true) {
                            while (getMaskSet().p < l && getMaskSet().validPositions[getMaskSet().p] === F) {
                                getMaskSet().p++;
                            }
                        }
                    }
                }
                function initializeColorMask(u) {
                    var f = (u.ownerDocument.defaultView || S).getComputedStyle(u, null);
                    function findCaretPos(e) {
                        var t = x.createElement("span"), i;
                        for (var a in f) {
                            if (isNaN(a) && a.indexOf("font") !== -1) {
                                t.style[a] = f[a];
                            }
                        }
                        t.style.textTransform = f.textTransform;
                        t.style.letterSpacing = f.letterSpacing;
                        t.style.position = "absolute";
                        t.style.height = "auto";
                        t.style.width = "auto";
                        t.style.visibility = "hidden";
                        t.style.whiteSpace = "nowrap";
                        x.body.appendChild(t);
                        var n = u.inputmask._valueGet(), r = 0, s;
                        for (i = 0, s = n.length; i <= s; i++) {
                            t.innerHTML += n.charAt(i) || "_";
                            if (t.offsetWidth >= e) {
                                var o = e - r;
                                var l = t.offsetWidth - e;
                                t.innerHTML = n.charAt(i);
                                o -= t.offsetWidth / 3;
                                i = o < l ? i - 1 : i;
                                break;
                            }
                            r = t.offsetWidth;
                        }
                        x.body.removeChild(t);
                        return i;
                    }
                    var e = x.createElement("div");
                    e.style.width = f.width;
                    e.style.textAlign = f.textAlign;
                    p = x.createElement("div");
                    u.inputmask.colorMask = p;
                    p.className = "im-colormask";
                    u.parentNode.insertBefore(p, u);
                    u.parentNode.removeChild(u);
                    p.appendChild(u);
                    p.appendChild(e);
                    u.style.left = e.offsetLeft + "px";
                    N(p).on("mouseleave", function(e) {
                        return v.mouseleaveEvent.call(u, [ e ]);
                    });
                    N(p).on("mouseenter", function(e) {
                        return v.mouseenterEvent.call(u, [ e ]);
                    });
                    N(p).on("click", function(e) {
                        caret(u, findCaretPos(e.clientX));
                        return v.clickEvent.call(u, [ e ]);
                    });
                }
                Inputmask.prototype.positionColorMask = function(e, t) {
                    e.style.left = t.offsetLeft + "px";
                };
                function renderColorMask(e, t, i) {
                    var a = [], n = false, r, s, o, l = 0;
                    function setEntry(e) {
                        if (e === F) e = "";
                        if (!n && (r.fn === null || s.input === F)) {
                            n = true;
                            a.push("<span class='im-static'>" + e);
                        } else if (n && (r.fn !== null && s.input !== F || r.def === "")) {
                            n = false;
                            var t = a.length;
                            a[t - 1] = a[t - 1] + "</span>";
                            a.push(e);
                        } else a.push(e);
                    }
                    function setCaret() {
                        if (x.activeElement === e) {
                            a.splice(t.begin, 0, t.begin === t.end || t.end > getMaskSet().maskLength ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">');
                            a.splice(t.end + 1, 0, "</mark>");
                        }
                    }
                    if (p !== F) {
                        var u = getBuffer();
                        if (t === F) {
                            t = caret(e);
                        } else if (t.begin === F) {
                            t = {
                                begin: t,
                                end: t
                            };
                        }
                        if (i !== true) {
                            var f = getLastValidPosition();
                            do {
                                if (getMaskSet().validPositions[l]) {
                                    s = getMaskSet().validPositions[l];
                                    r = s.match;
                                    o = s.locator.slice();
                                    setEntry(u[l]);
                                } else {
                                    s = getTestTemplate(l, o, l - 1);
                                    r = s.match;
                                    o = s.locator.slice();
                                    if (L.jitMasking === false || l < f || typeof L.jitMasking === "number" && isFinite(L.jitMasking) && L.jitMasking > l) {
                                        setEntry(getPlaceholder(l, r));
                                    } else n = false;
                                }
                                l++;
                            } while ((h === F || l < h) && (r.fn !== null || r.def !== "") || f > l || n);
                            if (n) setEntry();
                            setCaret();
                        }
                        var c = p.getElementsByTagName("div")[0];
                        c.innerHTML = a.join("");
                        e.inputmask.positionColorMask(e, c);
                    }
                }
                function mask(e) {
                    function isElementTypeSupported(e, r) {
                        function patchValueProperty(e) {
                            var t;
                            var i;
                            function patchValhook(e) {
                                if (N.valHooks && (N.valHooks[e] === F || N.valHooks[e].inputmaskpatch !== true)) {
                                    var i = N.valHooks[e] && N.valHooks[e].get ? N.valHooks[e].get : function(e) {
                                        return e.value;
                                    };
                                    var n = N.valHooks[e] && N.valHooks[e].set ? N.valHooks[e].set : function(e, t) {
                                        e.value = t;
                                        return e;
                                    };
                                    N.valHooks[e] = {
                                        get: function get(e) {
                                            if (e.inputmask) {
                                                if (e.inputmask.opts.autoUnmask) {
                                                    return e.inputmask.unmaskedvalue();
                                                } else {
                                                    var t = i(e);
                                                    return getLastValidPosition(F, F, e.inputmask.maskset.validPositions) !== -1 || r.nullable !== true ? t : "";
                                                }
                                            } else return i(e);
                                        },
                                        set: function set(e, t) {
                                            var i = N(e), a;
                                            a = n(e, t);
                                            if (e.inputmask) {
                                                i.trigger("setvalue", [ t ]);
                                            }
                                            return a;
                                        },
                                        inputmaskpatch: true
                                    };
                                }
                            }
                            function getter() {
                                if (this.inputmask) {
                                    return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : getLastValidPosition() !== -1 || r.nullable !== true ? x.activeElement === this && r.clearMaskOnLostFocus ? (g ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : t.call(this) : "";
                                } else return t.call(this);
                            }
                            function setter(e) {
                                i.call(this, e);
                                if (this.inputmask) {
                                    N(this).trigger("setvalue", [ e ]);
                                }
                            }
                            function installNativeValueSetFallback(e) {
                                o.on(e, "mouseenter", function(e) {
                                    var t = N(this), i = this, a = i.inputmask._valueGet();
                                    if (a !== getBuffer().join("")) {
                                        t.trigger("setvalue");
                                    }
                                });
                            }
                            if (!e.inputmask.__valueGet) {
                                if (r.noValuePatching !== true) {
                                    if (Object.getOwnPropertyDescriptor) {
                                        if (typeof Object.getPrototypeOf !== "function") {
                                            Object.getPrototypeOf = T("test".__proto__) === "object" ? function(e) {
                                                return e.__proto__;
                                            } : function(e) {
                                                return e.constructor.prototype;
                                            };
                                        }
                                        var a = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), "value") : F;
                                        if (a && a.get && a.set) {
                                            t = a.get;
                                            i = a.set;
                                            Object.defineProperty(e, "value", {
                                                get: getter,
                                                set: setter,
                                                configurable: true
                                            });
                                        } else if (e.tagName !== "INPUT") {
                                            t = function valueGet() {
                                                return this.textContent;
                                            };
                                            i = function valueSet(e) {
                                                this.textContent = e;
                                            };
                                            Object.defineProperty(e, "value", {
                                                get: getter,
                                                set: setter,
                                                configurable: true
                                            });
                                        }
                                    } else if (x.__lookupGetter__ && e.__lookupGetter__("value")) {
                                        t = e.__lookupGetter__("value");
                                        i = e.__lookupSetter__("value");
                                        e.__defineGetter__("value", getter);
                                        e.__defineSetter__("value", setter);
                                    }
                                    e.inputmask.__valueGet = t;
                                    e.inputmask.__valueSet = i;
                                }
                                e.inputmask._valueGet = function(e) {
                                    return g && e !== true ? t.call(this.el).split("").reverse().join("") : t.call(this.el);
                                };
                                e.inputmask._valueSet = function(e, t) {
                                    i.call(this.el, e === null || e === F ? "" : t !== true && g ? e.split("").reverse().join("") : e);
                                };
                                if (t === F) {
                                    t = function valueGet() {
                                        return this.value;
                                    };
                                    i = function valueSet(e) {
                                        this.value = e;
                                    };
                                    patchValhook(e.type);
                                    installNativeValueSetFallback(e);
                                }
                            }
                        }
                        var t = e.getAttribute("type");
                        var i = e.tagName === "INPUT" && N.inArray(t, r.supportsInputType) !== -1 || e.isContentEditable || e.tagName === "TEXTAREA";
                        if (!i) {
                            if (e.tagName === "INPUT") {
                                var a = x.createElement("input");
                                a.setAttribute("type", t);
                                i = a.type === "text";
                                a = null;
                            } else i = "partial";
                        }
                        if (i !== false) {
                            patchValueProperty(e);
                        } else e.inputmask = F;
                        return i;
                    }
                    o.off(e);
                    var t = isElementTypeSupported(e, L);
                    if (t !== false) {
                        l = e;
                        n = N(l);
                        r = l.placeholder;
                        h = l !== F ? l.maxLength : F;
                        if (h === -1) h = F;
                        if (L.colorMask === true) {
                            initializeColorMask(l);
                        }
                        if (_) {
                            if ("inputmode" in l) {
                                l.inputmode = L.inputmode;
                                l.setAttribute("inputmode", L.inputmode);
                            }
                            if (L.disablePredictiveText === true) {
                                if ("autocorrect" in l) {
                                    l.autocorrect = false;
                                } else {
                                    if (L.colorMask !== true) {
                                        initializeColorMask(l);
                                    }
                                    l.type = "password";
                                }
                            }
                        }
                        if (t === true) {
                            l.setAttribute("im-insert", L.insertMode);
                            o.on(l, "submit", v.submitEvent);
                            o.on(l, "reset", v.resetEvent);
                            o.on(l, "blur", v.blurEvent);
                            o.on(l, "focus", v.focusEvent);
                            if (L.colorMask !== true) {
                                o.on(l, "click", v.clickEvent);
                                o.on(l, "mouseleave", v.mouseleaveEvent);
                                o.on(l, "mouseenter", v.mouseenterEvent);
                            }
                            o.on(l, "paste", v.pasteEvent);
                            o.on(l, "cut", v.cutEvent);
                            o.on(l, "complete", L.oncomplete);
                            o.on(l, "incomplete", L.onincomplete);
                            o.on(l, "cleared", L.oncleared);
                            if (!_ && L.inputEventOnly !== true) {
                                o.on(l, "keydown", v.keydownEvent);
                                o.on(l, "keypress", v.keypressEvent);
                            } else {
                                l.removeAttribute("maxLength");
                            }
                            o.on(l, "input", v.inputFallBackEvent);
                            o.on(l, "beforeinput", v.beforeInputEvent);
                        }
                        o.on(l, "setvalue", v.setValueEvent);
                        m = getBufferTemplate().join("");
                        if (l.inputmask._valueGet(true) !== "" || L.clearMaskOnLostFocus === false || x.activeElement === l) {
                            var i = N.isFunction(L.onBeforeMask) ? L.onBeforeMask.call(f, l.inputmask._valueGet(true), L) || l.inputmask._valueGet(true) : l.inputmask._valueGet(true);
                            if (i !== "") checkVal(l, true, false, i.split(""));
                            var a = getBuffer().slice();
                            m = a.join("");
                            if (isComplete(a) === false) {
                                if (L.clearIncomplete) {
                                    resetMaskSet();
                                }
                            }
                            if (L.clearMaskOnLostFocus && x.activeElement !== l) {
                                if (getLastValidPosition() === -1) {
                                    a = [];
                                } else {
                                    clearOptionalTail(a);
                                }
                            }
                            if (L.clearMaskOnLostFocus === false || L.showMaskOnFocus && x.activeElement === l || l.inputmask._valueGet(true) !== "") writeBuffer(l, a);
                            if (x.activeElement === l) {
                                caret(l, seekNext(getLastValidPosition()));
                            }
                        }
                    }
                }
                var i;
                if (e !== F) {
                    switch (e.action) {
                      case "isComplete":
                        l = e.el;
                        return isComplete(getBuffer());

                      case "unmaskedvalue":
                        if (l === F || e.value !== F) {
                            i = e.value;
                            i = (N.isFunction(L.onBeforeMask) ? L.onBeforeMask.call(f, i, L) || i : i).split("");
                            checkVal.call(this, F, false, false, i);
                            if (N.isFunction(L.onBeforeWrite)) L.onBeforeWrite.call(f, F, getBuffer(), 0, L);
                        }
                        return unmaskedvalue(l);

                      case "mask":
                        mask(l);
                        break;

                      case "format":
                        i = (N.isFunction(L.onBeforeMask) ? L.onBeforeMask.call(f, e.value, L) || e.value : e.value).split("");
                        checkVal.call(this, F, true, false, i);
                        if (e.metadata) {
                            return {
                                value: g ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                                metadata: maskScope.call(this, {
                                    action: "getmetadata"
                                }, t, L)
                            };
                        }
                        return g ? getBuffer().slice().reverse().join("") : getBuffer().join("");

                      case "isValid":
                        if (e.value) {
                            i = e.value.split("");
                            checkVal.call(this, F, true, true, i);
                        } else {
                            e.value = getBuffer().join("");
                        }
                        var c = getBuffer();
                        var d = determineLastRequiredPosition(), y = c.length - 1;
                        for (;y > d; y--) {
                            if (isMask(y)) break;
                        }
                        c.splice(d, y + 1 - d);
                        return isComplete(c) && e.value === getBuffer().join("");

                      case "getemptymask":
                        return getBufferTemplate().join("");

                      case "remove":
                        if (l && l.inputmask) {
                            N.data(l, "_inputmask_opts", null);
                            n = N(l);
                            l.inputmask._valueSet(L.autoUnmask ? unmaskedvalue(l) : l.inputmask._valueGet(true));
                            o.off(l);
                            if (l.inputmask.colorMask) {
                                p = l.inputmask.colorMask;
                                p.removeChild(l);
                                p.parentNode.insertBefore(l, p);
                                p.parentNode.removeChild(p);
                            }
                            var b;
                            if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
                                b = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(l), "value");
                                if (b) {
                                    if (l.inputmask.__valueGet) {
                                        Object.defineProperty(l, "value", {
                                            get: l.inputmask.__valueGet,
                                            set: l.inputmask.__valueSet,
                                            configurable: true
                                        });
                                    }
                                }
                            } else if (x.__lookupGetter__ && l.__lookupGetter__("value")) {
                                if (l.inputmask.__valueGet) {
                                    l.__defineGetter__("value", l.inputmask.__valueGet);
                                    l.__defineSetter__("value", l.inputmask.__valueSet);
                                }
                            }
                            l.inputmask = F;
                        }
                        return l;
                        break;

                      case "getmetadata":
                        if (N.isArray(t.metadata)) {
                            var M = getMaskTemplate(true, 0, false).join("");
                            N.each(t.metadata, function(e, t) {
                                if (t.mask === M) {
                                    M = t;
                                    return false;
                                }
                            });
                            return M;
                        }
                        return t.metadata;
                    }
                }
            }
            S.Inputmask = Inputmask;
            return Inputmask;
        });
    }, function(t, i, a) {
        "use strict";
        var n, r, s;
        var f = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        (function(e) {
            if (true) {
                !(r = [ a(2) ], n = e, s = typeof n === "function" ? n.apply(i, r) : n, s !== undefined && (t.exports = s));
            } else {}
        })(function(t) {
            var p = t.document;
            function indexOf(e, t) {
                var i = 0, a = e.length;
                for (;i < a; i++) {
                    if (e[i] === t) {
                        return i;
                    }
                }
                return -1;
            }
            function isWindow(e) {
                return e != null && e === e.window;
            }
            function isArraylike(e) {
                var t = "length" in e && e.length, i = typeof e === "undefined" ? "undefined" : f(e);
                if (i === "function" || isWindow(e)) {
                    return false;
                }
                if (e.nodeType === 1 && t) {
                    return true;
                }
                return i === "array" || t === 0 || typeof t === "number" && t > 0 && t - 1 in e;
            }
            function isValidElement(e) {
                return e instanceof Element;
            }
            function DependencyLib(e) {
                if (e instanceof DependencyLib) {
                    return e;
                }
                if (!(this instanceof DependencyLib)) {
                    return new DependencyLib(e);
                }
                if (e !== undefined && e !== null && e !== t) {
                    this[0] = e.nodeName ? e : e[0] !== undefined && e[0].nodeName ? e[0] : p.querySelector(e);
                    if (this[0] !== undefined && this[0] !== null) {
                        this[0].eventRegistry = this[0].eventRegistry || {};
                    }
                }
            }
            function getWindow(e) {
                return isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false;
            }
            DependencyLib.prototype = {
                on: function on(e, i) {
                    if (isValidElement(this[0])) {
                        var t = function addEvent(e, t) {
                            if (n.addEventListener) {
                                n.addEventListener(e, i, false);
                            } else if (n.attachEvent) {
                                n.attachEvent("on" + e, i);
                            }
                            a[e] = a[e] || {};
                            a[e][t] = a[e][t] || [];
                            a[e][t].push(i);
                        };
                        var a = this[0].eventRegistry, n = this[0];
                        var r = e.split(" ");
                        for (var s = 0; s < r.length; s++) {
                            var o = r[s].split("."), l = o[0], u = o[1] || "global";
                            t(l, u);
                        }
                    }
                    return this;
                },
                off: function off(e, o) {
                    if (isValidElement(this[0])) {
                        var t = function removeEvent(e, t, i) {
                            if (e in l === true) {
                                if (n.removeEventListener) {
                                    n.removeEventListener(e, i, false);
                                } else if (n.detachEvent) {
                                    n.detachEvent("on" + e, i);
                                }
                                if (t === "global") {
                                    for (var a in l[e]) {
                                        l[e][a].splice(l[e][a].indexOf(i), 1);
                                    }
                                } else {
                                    l[e][t].splice(l[e][t].indexOf(i), 1);
                                }
                            }
                        };
                        var i = function resolveNamespace(e, t) {
                            var i = [], a, n;
                            if (e.length > 0) {
                                if (o === undefined) {
                                    for (a = 0, n = l[e][t].length; a < n; a++) {
                                        i.push({
                                            ev: e,
                                            namespace: t && t.length > 0 ? t : "global",
                                            handler: l[e][t][a]
                                        });
                                    }
                                } else {
                                    i.push({
                                        ev: e,
                                        namespace: t && t.length > 0 ? t : "global",
                                        handler: o
                                    });
                                }
                            } else if (t.length > 0) {
                                for (var r in l) {
                                    for (var s in l[r]) {
                                        if (s === t) {
                                            if (o === undefined) {
                                                for (a = 0, n = l[r][s].length; a < n; a++) {
                                                    i.push({
                                                        ev: r,
                                                        namespace: s,
                                                        handler: l[r][s][a]
                                                    });
                                                }
                                            } else {
                                                i.push({
                                                    ev: r,
                                                    namespace: s,
                                                    handler: o
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                            return i;
                        };
                        var l = this[0].eventRegistry, n = this[0];
                        var a = e.split(" ");
                        for (var r = 0; r < a.length; r++) {
                            var s = a[r].split("."), u = i(s[0], s[1]);
                            for (var f = 0, c = u.length; f < c; f++) {
                                t(u[f].ev, u[f].namespace, u[f].handler);
                            }
                        }
                    }
                    return this;
                },
                trigger: function trigger(e) {
                    if (isValidElement(this[0])) {
                        var t = this[0].eventRegistry, i = this[0];
                        var a = typeof e === "string" ? e.split(" ") : [ e.type ];
                        for (var n = 0; n < a.length; n++) {
                            var r = a[n].split("."), s = r[0], o = r[1] || "global";
                            if (p !== undefined && o === "global") {
                                var l, u, f = {
                                    bubbles: true,
                                    cancelable: true,
                                    detail: arguments[1]
                                };
                                if (p.createEvent) {
                                    try {
                                        l = new CustomEvent(s, f);
                                    } catch (e) {
                                        l = p.createEvent("CustomEvent");
                                        l.initCustomEvent(s, f.bubbles, f.cancelable, f.detail);
                                    }
                                    if (e.type) DependencyLib.extend(l, e);
                                    i.dispatchEvent(l);
                                } else {
                                    l = p.createEventObject();
                                    l.eventType = s;
                                    l.detail = arguments[1];
                                    if (e.type) DependencyLib.extend(l, e);
                                    i.fireEvent("on" + l.eventType, l);
                                }
                            } else if (t[s] !== undefined) {
                                arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event(arguments[0]);
                                if (o === "global") {
                                    for (var c in t[s]) {
                                        for (u = 0; u < t[s][c].length; u++) {
                                            t[s][c][u].apply(i, arguments);
                                        }
                                    }
                                } else {
                                    for (u = 0; u < t[s][o].length; u++) {
                                        t[s][o][u].apply(i, arguments);
                                    }
                                }
                            }
                        }
                    }
                    return this;
                }
            };
            DependencyLib.isFunction = function(e) {
                return typeof e === "function";
            };
            DependencyLib.noop = function() {};
            DependencyLib.isArray = Array.isArray;
            DependencyLib.inArray = function(e, t, i) {
                return t == null ? -1 : indexOf(t, e, i);
            };
            DependencyLib.valHooks = undefined;
            DependencyLib.isPlainObject = function(e) {
                if ((typeof e === "undefined" ? "undefined" : f(e)) !== "object" || e.nodeType || isWindow(e)) {
                    return false;
                }
                if (e.constructor && !Object.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
                return true;
            };
            DependencyLib.extend = function() {
                var e, t, i, a, n, r, s = arguments[0] || {}, o = 1, l = arguments.length, u = false;
                if (typeof s === "boolean") {
                    u = s;
                    s = arguments[o] || {};
                    o++;
                }
                if ((typeof s === "undefined" ? "undefined" : f(s)) !== "object" && !DependencyLib.isFunction(s)) {
                    s = {};
                }
                if (o === l) {
                    s = this;
                    o--;
                }
                for (;o < l; o++) {
                    if ((e = arguments[o]) != null) {
                        for (t in e) {
                            i = s[t];
                            a = e[t];
                            if (s === a) {
                                continue;
                            }
                            if (u && a && (DependencyLib.isPlainObject(a) || (n = DependencyLib.isArray(a)))) {
                                if (n) {
                                    n = false;
                                    r = i && DependencyLib.isArray(i) ? i : [];
                                } else {
                                    r = i && DependencyLib.isPlainObject(i) ? i : {};
                                }
                                s[t] = DependencyLib.extend(u, r, a);
                            } else if (a !== undefined) {
                                s[t] = a;
                            }
                        }
                    }
                }
                return s;
            };
            DependencyLib.each = function(e, t) {
                var i, a = 0;
                if (isArraylike(e)) {
                    for (var n = e.length; a < n; a++) {
                        i = t.call(e[a], a, e[a]);
                        if (i === false) {
                            break;
                        }
                    }
                } else {
                    for (a in e) {
                        i = t.call(e[a], a, e[a]);
                        if (i === false) {
                            break;
                        }
                    }
                }
                return e;
            };
            DependencyLib.data = function(e, t, i) {
                if (i === undefined) {
                    return e.__data ? e.__data[t] : null;
                } else {
                    e.__data = e.__data || {};
                    e.__data[t] = i;
                }
            };
            if (typeof t.CustomEvent === "function") {
                DependencyLib.Event = t.CustomEvent;
            } else {
                DependencyLib.Event = function(e, t) {
                    t = t || {
                        bubbles: false,
                        cancelable: false,
                        detail: undefined
                    };
                    var i = p.createEvent("CustomEvent");
                    i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail);
                    return i;
                };
                DependencyLib.Event.prototype = t.Event.prototype;
            }
            return DependencyLib;
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __WEBPACK_AMD_DEFINE_RESULT__;
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;
        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); else {}
    }, function(e, t, i) {
        "use strict";
        i(4);
        i(5);
        i(6);
        var a = i(0);
        var n = _interopRequireDefault(a);
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        window.Inputmask = n.default;
    }, function(t, i, a) {
        "use strict";
        var n, r, s;
        var e = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        (function(e) {
            if (true) {
                !(r = [ a(0) ], n = e, s = typeof n === "function" ? n.apply(i, r) : n, s !== undefined && (t.exports = s));
            } else {}
        })(function(e) {
            e.extendDefinitions({
                A: {
                    validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    casing: "upper"
                },
                "&": {
                    validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    casing: "upper"
                },
                "#": {
                    validator: "[0-9A-Fa-f]",
                    casing: "upper"
                }
            });
            e.extendAliases({
                cssunit: {
                    regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
                },
                url: {
                    regex: "(https?|ftp)//.*",
                    autoUnmask: false
                },
                ip: {
                    mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
                    definitions: {
                        i: {
                            validator: function validator(e, t, i, a, n) {
                                if (i - 1 > -1 && t.buffer[i - 1] !== ".") {
                                    e = t.buffer[i - 1] + e;
                                    if (i - 2 > -1 && t.buffer[i - 2] !== ".") {
                                        e = t.buffer[i - 2] + e;
                                    } else e = "0" + e;
                                } else e = "00" + e;
                                return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(e);
                            }
                        }
                    },
                    onUnMask: function onUnMask(e, t, i) {
                        return e;
                    },
                    inputmode: "numeric"
                },
                email: {
                    mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                    greedy: false,
                    casing: "lower",
                    onBeforePaste: function onBeforePaste(e, t) {
                        e = e.toLowerCase();
                        return e.replace("mailto:", "");
                    },
                    definitions: {
                        "*": {
                            validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
                        },
                        "-": {
                            validator: "[0-9A-Za-z-]"
                        }
                    },
                    onUnMask: function onUnMask(e, t, i) {
                        return e;
                    },
                    inputmode: "email"
                },
                mac: {
                    mask: "##:##:##:##:##:##"
                },
                vin: {
                    mask: "V{13}9{4}",
                    definitions: {
                        V: {
                            validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                            casing: "upper"
                        }
                    },
                    clearIncomplete: true,
                    autoUnmask: true
                }
            });
            return e;
        });
    }, function(t, i, a) {
        "use strict";
        var n, r, s;
        var c = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        (function(e) {
            if (true) {
                !(r = [ a(0) ], n = e, s = typeof n === "function" ? n.apply(i, r) : n, s !== undefined && (t.exports = s));
            } else {}
        })(function(l) {
            var u = l.dependencyLib;
            var f = {
                d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
                dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
                    return pad(Date.prototype.getDate.call(this), 2);
                } ],
                ddd: [ "" ],
                dddd: [ "" ],
                m: [ "[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
                    return Date.prototype.getMonth.call(this) + 1;
                } ],
                mm: [ "0[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
                    return pad(Date.prototype.getMonth.call(this) + 1, 2);
                } ],
                mmm: [ "" ],
                mmmm: [ "" ],
                yy: [ "[0-9]{2}", Date.prototype.setFullYear, "year", function() {
                    return pad(Date.prototype.getFullYear.call(this), 2);
                } ],
                yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
                    return pad(Date.prototype.getFullYear.call(this), 4);
                } ],
                h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
                hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
                    return pad(Date.prototype.getHours.call(this), 2);
                } ],
                hhh: [ "[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours ],
                H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
                HH: [ "[01][0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
                    return pad(Date.prototype.getHours.call(this), 2);
                } ],
                HHH: [ "[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours ],
                M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
                MM: [ "[0-5][0-9]", Date.prototype.setMinutes, "minutes", function() {
                    return pad(Date.prototype.getMinutes.call(this), 2);
                } ],
                s: [ "[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds ],
                ss: [ "[0-5][0-9]", Date.prototype.setSeconds, "seconds", function() {
                    return pad(Date.prototype.getSeconds.call(this), 2);
                } ],
                l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
                    return pad(Date.prototype.getMilliseconds.call(this), 3);
                } ],
                L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
                    return pad(Date.prototype.getMilliseconds.call(this), 2);
                } ],
                t: [ "[ap]" ],
                tt: [ "[ap]m" ],
                T: [ "[AP]" ],
                TT: [ "[AP]M" ],
                Z: [ "" ],
                o: [ "" ],
                S: [ "" ]
            }, t = {
                isoDate: "yyyy-mm-dd",
                isoTime: "HH:MM:ss",
                isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
            };
            function getTokenizer(e) {
                if (!e.tokenizer) {
                    var t = [];
                    for (var i in f) {
                        if (t.indexOf(i[0]) === -1) t.push(i[0]);
                    }
                    e.tokenizer = "(" + t.join("+|") + ")+?|.";
                    e.tokenizer = new RegExp(e.tokenizer, "g");
                }
                return e.tokenizer;
            }
            function isValidDate(e, t) {
                return !isFinite(e.rawday) || e.day == "29" && !isFinite(e.rawyear) || new Date(e.date.getFullYear(), isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1, 0).getDate() >= e.day ? t : false;
            }
            function isDateInRange(e, t) {
                var i = true;
                if (t.min) {
                    if (e["rawyear"]) {
                        var a = e["rawyear"].replace(/[^0-9]/g, ""), n = t.min.year.substr(0, a.length);
                        i = n <= a;
                    }
                    if (e["year"] === e["rawyear"]) {
                        if (t.min.date.getTime() === t.min.date.getTime()) {
                            i = t.min.date.getTime() <= e.date.getTime();
                        }
                    }
                }
                if (i && t.max && t.max.date.getTime() === t.max.date.getTime()) {
                    i = t.max.date.getTime() >= e.date.getTime();
                }
                return i;
            }
            function parse(e, t, i, a) {
                var n = "", r;
                while (r = getTokenizer(i).exec(e)) {
                    if (t === undefined) {
                        if (f[r[0]]) {
                            n += "(" + f[r[0]][0] + ")";
                        } else {
                            switch (r[0]) {
                              case "[":
                                n += "(";
                                break;

                              case "]":
                                n += ")?";
                                break;

                              default:
                                n += l.escapeRegex(r[0]);
                            }
                        }
                    } else {
                        if (f[r[0]]) {
                            if (a !== true && f[r[0]][3]) {
                                var s = f[r[0]][3];
                                n += s.call(t.date);
                            } else if (f[r[0]][2]) n += t["raw" + f[r[0]][2]]; else n += r[0];
                        } else n += r[0];
                    }
                }
                return n;
            }
            function pad(e, t) {
                e = String(e);
                t = t || 2;
                while (e.length < t) {
                    e = "0" + e;
                }
                return e;
            }
            function analyseMask(e, t, r) {
                var i = {
                    date: new Date(1, 0, 1)
                }, s, a = e, n, o, l;
                function extendProperty(e) {
                    var t = e.replace(/[^0-9]/g, "0");
                    if (t != e) {
                        var i = e.replace(/[^0-9]/g, ""), a = (r.min && r.min[s] || e).toString(), n = (r.max && r.max[s] || e).toString();
                        t = i + (i < a.slice(0, i.length) ? a.slice(i.length) : i > n.slice(0, i.length) ? n.slice(i.length) : t.toString().slice(i.length));
                    }
                    return t;
                }
                function setValue(e, t, i) {
                    e[s] = extendProperty(t);
                    e["raw" + s] = t;
                    if (o !== undefined) o.call(e.date, s == "month" ? parseInt(e[s]) - 1 : e[s]);
                }
                if (typeof a === "string") {
                    while (n = getTokenizer(r).exec(t)) {
                        var u = a.slice(0, n[0].length);
                        if (f.hasOwnProperty(n[0])) {
                            l = f[n[0]][0];
                            s = f[n[0]][2];
                            o = f[n[0]][1];
                            setValue(i, u, r);
                        }
                        a = a.slice(u.length);
                    }
                    return i;
                } else if (a && (typeof a === "undefined" ? "undefined" : c(a)) === "object" && a.hasOwnProperty("date")) {
                    return a;
                }
                return undefined;
            }
            l.extendAliases({
                datetime: {
                    mask: function mask(e) {
                        f.S = e.i18n.ordinalSuffix.join("|");
                        e.inputFormat = t[e.inputFormat] || e.inputFormat;
                        e.displayFormat = t[e.displayFormat] || e.displayFormat || e.inputFormat;
                        e.outputFormat = t[e.outputFormat] || e.outputFormat || e.inputFormat;
                        e.placeholder = e.placeholder !== "" ? e.placeholder : e.inputFormat.replace(/[\[\]]/, "");
                        e.regex = parse(e.inputFormat, undefined, e);
                        return null;
                    },
                    placeholder: "",
                    inputFormat: "isoDateTime",
                    displayFormat: undefined,
                    outputFormat: undefined,
                    min: null,
                    max: null,
                    i18n: {
                        dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                        monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                        ordinalSuffix: [ "st", "nd", "rd", "th" ]
                    },
                    postValidation: function postValidation(e, t, i, a) {
                        a.min = analyseMask(a.min, a.inputFormat, a);
                        a.max = analyseMask(a.max, a.inputFormat, a);
                        var n = i, r = analyseMask(e.join(""), a.inputFormat, a);
                        if (n && r.date.getTime() === r.date.getTime()) {
                            n = isValidDate(r, n);
                            n = n && isDateInRange(r, a);
                        }
                        if (t && n && i.pos !== t) {
                            return {
                                buffer: parse(a.inputFormat, r, a),
                                refreshFromBuffer: {
                                    start: t,
                                    end: i.pos
                                }
                            };
                        }
                        return n;
                    },
                    onKeyDown: function onKeyDown(e, t, i, a) {
                        var n = this;
                        if (e.ctrlKey && e.keyCode === l.keyCode.RIGHT) {
                            var r = new Date(), s, o = "";
                            while (s = getTokenizer(a).exec(a.inputFormat)) {
                                if (s[0].charAt(0) === "d") {
                                    o += pad(r.getDate(), s[0].length);
                                } else if (s[0].charAt(0) === "m") {
                                    o += pad(r.getMonth() + 1, s[0].length);
                                } else if (s[0] === "yyyy") {
                                    o += r.getFullYear().toString();
                                } else if (s[0].charAt(0) === "y") {
                                    o += pad(r.getYear(), s[0].length);
                                }
                            }
                            n.inputmask._valueSet(o);
                            u(n).trigger("setvalue");
                        }
                    },
                    onUnMask: function onUnMask(e, t, i) {
                        return parse(i.outputFormat, analyseMask(e, i.inputFormat, i), i, true);
                    },
                    casing: function casing(e, t, i, a) {
                        if (t.nativeDef.indexOf("[ap]") == 0) return e.toLowerCase();
                        if (t.nativeDef.indexOf("[AP]") == 0) return e.toUpperCase();
                        return e;
                    },
                    insertMode: false,
                    shiftPositions: false
                }
            });
            return l;
        });
    }, function(t, i, a) {
        "use strict";
        var n, r, s;
        var e = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e;
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        (function(e) {
            if (true) {
                !(r = [ a(0) ], n = e, s = typeof n === "function" ? n.apply(i, r) : n, s !== undefined && (t.exports = s));
            } else {}
        })(function(k) {
            var h = k.dependencyLib;
            function autoEscape(e, t) {
                var i = "";
                for (var a = 0; a < e.length; a++) {
                    if (k.prototype.definitions[e.charAt(a)] || t.definitions[e.charAt(a)] || t.optionalmarker.start === e.charAt(a) || t.optionalmarker.end === e.charAt(a) || t.quantifiermarker.start === e.charAt(a) || t.quantifiermarker.end === e.charAt(a) || t.groupmarker.start === e.charAt(a) || t.groupmarker.end === e.charAt(a) || t.alternatormarker === e.charAt(a)) {
                        i += "\\" + e.charAt(a);
                    } else i += e.charAt(a);
                }
                return i;
            }
            function alignDigits(e, t, i) {
                if (t > 0) {
                    var a = h.inArray(i.radixPoint, e);
                    if (a === -1) {
                        e.push(i.radixPoint);
                        a = e.length - 1;
                    }
                    for (var n = 1; n <= t; n++) {
                        e[a + n] = e[a + n] || "0";
                    }
                }
                return e;
            }
            k.extendAliases({
                numeric: {
                    mask: function mask(e) {
                        if (e.repeat !== 0 && isNaN(e.integerDigits)) {
                            e.integerDigits = e.repeat;
                        }
                        e.repeat = 0;
                        if (e.groupSeparator === e.radixPoint && e.digits && e.digits !== "0") {
                            if (e.radixPoint === ".") {
                                e.groupSeparator = ",";
                            } else if (e.radixPoint === ",") {
                                e.groupSeparator = ".";
                            } else e.groupSeparator = "";
                        }
                        if (e.groupSeparator === " ") {
                            e.skipOptionalPartCharacter = undefined;
                        }
                        e.autoGroup = e.autoGroup && e.groupSeparator !== "";
                        if (e.autoGroup) {
                            if (typeof e.groupSize == "string" && isFinite(e.groupSize)) e.groupSize = parseInt(e.groupSize);
                            if (isFinite(e.integerDigits)) {
                                var t = Math.floor(e.integerDigits / e.groupSize);
                                var i = e.integerDigits % e.groupSize;
                                e.integerDigits = parseInt(e.integerDigits) + (i === 0 ? t - 1 : t);
                                if (e.integerDigits < 1) {
                                    e.integerDigits = "*";
                                }
                            }
                        }
                        if (e.placeholder.length > 1) {
                            e.placeholder = e.placeholder.charAt(0);
                        }
                        if (e.positionCaretOnClick === "radixFocus" && e.placeholder === "" && e.integerOptional === false) {
                            e.positionCaretOnClick = "lvp";
                        }
                        e.definitions[";"] = e.definitions["~"];
                        e.definitions[";"].definitionSymbol = "~";
                        if (e.numericInput === true) {
                            e.positionCaretOnClick = e.positionCaretOnClick === "radixFocus" ? "lvp" : e.positionCaretOnClick;
                            e.digitsOptional = false;
                            if (isNaN(e.digits)) e.digits = 2;
                            e.decimalProtect = false;
                        }
                        var mask = "[+]";
                        mask += autoEscape(e.prefix, e);
                        if (e.integerOptional === true) {
                            mask += "~{1," + e.integerDigits + "}";
                        } else mask += "~{" + e.integerDigits + "}";
                        if (e.digits !== undefined) {
                            var a = e.decimalProtect ? ":" : e.radixPoint;
                            var n = e.digits.toString().split(",");
                            if (isFinite(n[0]) && n[1] && isFinite(n[1])) {
                                mask += a + ";{" + e.digits + "}";
                            } else if (isNaN(e.digits) || parseInt(e.digits) > 0) {
                                if (e.digitsOptional) {
                                    mask += "[" + a + ";{1," + e.digits + "}]";
                                } else mask += a + ";{" + e.digits + "}";
                            }
                        }
                        mask += autoEscape(e.suffix, e);
                        mask += "[-]";
                        e.greedy = false;
                        return mask;
                    },
                    placeholder: "",
                    greedy: false,
                    digits: "*",
                    digitsOptional: true,
                    enforceDigitsOnBlur: false,
                    radixPoint: ".",
                    positionCaretOnClick: "radixFocus",
                    groupSize: 3,
                    groupSeparator: "",
                    autoGroup: false,
                    allowMinus: true,
                    negationSymbol: {
                        front: "-",
                        back: ""
                    },
                    integerDigits: "+",
                    integerOptional: true,
                    prefix: "",
                    suffix: "",
                    rightAlign: true,
                    decimalProtect: true,
                    min: null,
                    max: null,
                    step: 1,
                    insertMode: true,
                    autoUnmask: false,
                    unmaskAsNumber: false,
                    inputType: "text",
                    inputmode: "numeric",
                    preValidation: function preValidation(e, t, i, a, n, r) {
                        if (i === "-" || i === n.negationSymbol.front) {
                            if (n.allowMinus !== true) return false;
                            n.isNegative = n.isNegative === undefined ? true : !n.isNegative;
                            if (e.join("") === "") return true;
                            return {
                                caret: r.validPositions[t] ? t : undefined,
                                dopost: true
                            };
                        }
                        if (a === false && i === n.radixPoint && n.digits !== undefined && (isNaN(n.digits) || parseInt(n.digits) > 0)) {
                            var s = h.inArray(n.radixPoint, e);
                            if (s !== -1 && r.validPositions[s] !== undefined) {
                                if (n.numericInput === true) {
                                    return t === s;
                                }
                                return {
                                    caret: s + 1
                                };
                            }
                        }
                        return true;
                    },
                    postValidation: function postValidation(e, t, i, a) {
                        function buildPostMask(e, t) {
                            var i = "";
                            i += "(" + t.groupSeparator + "*{" + t.groupSize + "}){*}";
                            if (t.radixPoint !== "") {
                                var a = e.join("").split(t.radixPoint);
                                if (a[1]) {
                                    i += t.radixPoint + "*{" + a[1].match(/^\d*\??\d*/)[0].length + "}";
                                }
                            }
                            return i;
                        }
                        var n = a.suffix.split(""), r = a.prefix.split("");
                        if (i.pos === undefined && i.caret !== undefined && i.dopost !== true) return i;
                        var s = i.caret !== undefined ? i.caret : i.pos;
                        var o = e.slice();
                        if (a.numericInput) {
                            s = o.length - s - 1;
                            o = o.reverse();
                        }
                        var l = o[s];
                        if (l === a.groupSeparator) {
                            s += 1;
                            l = o[s];
                        }
                        if (s === o.length - a.suffix.length - 1 && l === a.radixPoint) return i;
                        if (l !== undefined) {
                            if (l !== a.radixPoint && l !== a.negationSymbol.front && l !== a.negationSymbol.back) {
                                o[s] = "?";
                                if (a.prefix.length > 0 && s >= (a.isNegative === false ? 1 : 0) && s < a.prefix.length - 1 + (a.isNegative === false ? 1 : 0)) {
                                    r[s - (a.isNegative === false ? 1 : 0)] = "?";
                                } else if (a.suffix.length > 0 && s >= o.length - a.suffix.length - (a.isNegative === false ? 1 : 0)) {
                                    n[s - (o.length - a.suffix.length - (a.isNegative === false ? 1 : 0))] = "?";
                                }
                            }
                        }
                        r = r.join("");
                        n = n.join("");
                        var u = o.join("").replace(r, "");
                        u = u.replace(n, "");
                        u = u.replace(new RegExp(k.escapeRegex(a.groupSeparator), "g"), "");
                        u = u.replace(new RegExp("[-" + k.escapeRegex(a.negationSymbol.front) + "]", "g"), "");
                        u = u.replace(new RegExp(k.escapeRegex(a.negationSymbol.back) + "$"), "");
                        if (isNaN(a.placeholder)) {
                            u = u.replace(new RegExp(k.escapeRegex(a.placeholder), "g"), "");
                        }
                        if (u.length > 1 && u.indexOf(a.radixPoint) !== 1) {
                            if (l === "0") {
                                u = u.replace(/^\?/g, "");
                            }
                            u = u.replace(/^0/g, "");
                        }
                        if (u.charAt(0) === a.radixPoint && a.radixPoint !== "" && a.numericInput !== true) {
                            u = "0" + u;
                        }
                        if (u !== "") {
                            u = u.split("");
                            if ((!a.digitsOptional || a.enforceDigitsOnBlur && i.event === "blur") && isFinite(a.digits)) {
                                var f = h.inArray(a.radixPoint, u);
                                var c = h.inArray(a.radixPoint, o);
                                if (f === -1) {
                                    u.push(a.radixPoint);
                                    f = u.length - 1;
                                }
                                for (var p = 1; p <= a.digits; p++) {
                                    if ((!a.digitsOptional || a.enforceDigitsOnBlur && i.event === "blur") && (u[f + p] === undefined || u[f + p] === a.placeholder.charAt(0))) {
                                        u[f + p] = i.placeholder || a.placeholder.charAt(0);
                                    } else if (c !== -1 && o[c + p] !== undefined) {
                                        u[f + p] = u[f + p] || o[c + p];
                                    }
                                }
                            }
                            if (a.autoGroup === true && a.groupSeparator !== "" && (l !== a.radixPoint || i.pos !== undefined || i.dopost)) {
                                var d = u[u.length - 1] === a.radixPoint && i.c === a.radixPoint;
                                u = k(buildPostMask(u, a), {
                                    numericInput: true,
                                    jitMasking: true,
                                    definitions: {
                                        "*": {
                                            validator: "[0-9?]",
                                            cardinality: 1
                                        }
                                    }
                                }).format(u.join(""));
                                if (d) u += a.radixPoint;
                                if (u.charAt(0) === a.groupSeparator) {
                                    u.substr(1);
                                }
                            } else u = u.join("");
                        }
                        if (a.isNegative && i.event === "blur") {
                            a.isNegative = u !== "0";
                        }
                        u = r + u;
                        u += n;
                        if (a.isNegative) {
                            u = a.negationSymbol.front + u;
                            u += a.negationSymbol.back;
                        }
                        u = u.split("");
                        if (l !== undefined) {
                            if (l !== a.radixPoint && l !== a.negationSymbol.front && l !== a.negationSymbol.back) {
                                s = h.inArray("?", u);
                                if (s > -1) {
                                    u[s] = l;
                                } else s = i.caret || 0;
                            } else if (l === a.radixPoint || l === a.negationSymbol.front || l === a.negationSymbol.back) {
                                var g = h.inArray(l, u);
                                if (g !== -1) s = g;
                            }
                        }
                        if (a.numericInput) {
                            s = u.length - s - 1;
                            u = u.reverse();
                        }
                        var m = {
                            caret: (l === undefined || i.pos !== undefined) && s !== undefined ? s + (a.numericInput ? -1 : 1) : s,
                            buffer: u,
                            refreshFromBuffer: i.dopost || e.join("") !== u.join("")
                        };
                        return m.refreshFromBuffer ? m : i;
                    },
                    onBeforeWrite: function onBeforeWrite(e, t, i, a) {
                        function parseMinMaxOptions(e) {
                            if (e.parseMinMaxOptions === undefined) {
                                if (e.min !== null) {
                                    e.min = e.min.toString().replace(new RegExp(k.escapeRegex(e.groupSeparator), "g"), "");
                                    if (e.radixPoint === ",") e.min = e.min.replace(e.radixPoint, ".");
                                    e.min = isFinite(e.min) ? parseFloat(e.min) : NaN;
                                    if (isNaN(e.min)) e.min = Number.MIN_VALUE;
                                }
                                if (e.max !== null) {
                                    e.max = e.max.toString().replace(new RegExp(k.escapeRegex(e.groupSeparator), "g"), "");
                                    if (e.radixPoint === ",") e.max = e.max.replace(e.radixPoint, ".");
                                    e.max = isFinite(e.max) ? parseFloat(e.max) : NaN;
                                    if (isNaN(e.max)) e.max = Number.MAX_VALUE;
                                }
                                e.parseMinMaxOptions = "done";
                            }
                        }
                        if (e) {
                            switch (e.type) {
                              case "keydown":
                                return a.postValidation(t, i, {
                                    caret: i,
                                    dopost: true
                                }, a);

                              case "blur":
                              case "checkval":
                                var n;
                                parseMinMaxOptions(a);
                                if (a.min !== null || a.max !== null) {
                                    n = a.onUnMask(t.join(""), undefined, h.extend({}, a, {
                                        unmaskAsNumber: true
                                    }));
                                    if (a.min !== null && n < a.min) {
                                        a.isNegative = a.min < 0;
                                        return a.postValidation(a.min.toString().replace(".", a.radixPoint).split(""), i, {
                                            caret: i,
                                            dopost: true,
                                            placeholder: "0"
                                        }, a);
                                    } else if (a.max !== null && n > a.max) {
                                        a.isNegative = a.max < 0;
                                        return a.postValidation(a.max.toString().replace(".", a.radixPoint).split(""), i, {
                                            caret: i,
                                            dopost: true,
                                            placeholder: "0"
                                        }, a);
                                    }
                                }
                                return a.postValidation(t, i, {
                                    caret: i,
                                    placeholder: "0",
                                    event: "blur"
                                }, a);

                              case "_checkval":
                                return {
                                    caret: i
                                };

                              default:
                                break;
                            }
                        }
                    },
                    regex: {
                        integerPart: function integerPart(e, t) {
                            return t ? new RegExp("[" + k.escapeRegex(e.negationSymbol.front) + "+]?") : new RegExp("[" + k.escapeRegex(e.negationSymbol.front) + "+]?\\d+");
                        },
                        integerNPart: function integerNPart(e) {
                            return new RegExp("[\\d" + k.escapeRegex(e.groupSeparator) + k.escapeRegex(e.placeholder.charAt(0)) + "]+");
                        }
                    },
                    definitions: {
                        "~": {
                            validator: function validator(e, t, i, a, n, r) {
                                var s, o;
                                if (e === "k" || e === "m") {
                                    s = {
                                        insert: [],
                                        c: 0
                                    };
                                    for (var l = 0, o = e === "k" ? 2 : 5; l < o; l++) {
                                        s.insert.push({
                                            pos: i + l,
                                            c: 0
                                        });
                                    }
                                    s.pos = i + o;
                                    return s;
                                }
                                s = a ? new RegExp("[0-9" + k.escapeRegex(n.groupSeparator) + "]").test(e) : new RegExp("[0-9]").test(e);
                                if (s === true) {
                                    if (n.numericInput !== true && t.validPositions[i] !== undefined && t.validPositions[i].match.def === "~" && !r) {
                                        var u = t.buffer.join("");
                                        u = u.replace(new RegExp("[-" + k.escapeRegex(n.negationSymbol.front) + "]", "g"), "");
                                        u = u.replace(new RegExp(k.escapeRegex(n.negationSymbol.back) + "$"), "");
                                        var f = u.split(n.radixPoint);
                                        if (f.length > 1) {
                                            f[1] = f[1].replace(/0/g, n.placeholder.charAt(0));
                                        }
                                        if (f[0] === "0") {
                                            f[0] = f[0].replace(/0/g, n.placeholder.charAt(0));
                                        }
                                        u = f[0] + n.radixPoint + f[1] || "";
                                        var c = t._buffer.join("");
                                        if (u === n.radixPoint) {
                                            u = c;
                                        }
                                        while (u.match(k.escapeRegex(c) + "$") === null) {
                                            c = c.slice(1);
                                        }
                                        u = u.replace(c, "");
                                        u = u.split("");
                                        if (u[i] === undefined) {
                                            s = {
                                                pos: i,
                                                remove: i
                                            };
                                        } else {
                                            s = {
                                                pos: i
                                            };
                                        }
                                    }
                                } else if (!a && e === n.radixPoint && t.validPositions[i - 1] === undefined) {
                                    s = {
                                        insert: {
                                            pos: i,
                                            c: 0
                                        },
                                        pos: i + 1
                                    };
                                }
                                return s;
                            },
                            cardinality: 1
                        },
                        "+": {
                            validator: function validator(e, t, i, a, n) {
                                return n.allowMinus && (e === "-" || e === n.negationSymbol.front);
                            },
                            cardinality: 1,
                            placeholder: ""
                        },
                        "-": {
                            validator: function validator(e, t, i, a, n) {
                                return n.allowMinus && e === n.negationSymbol.back;
                            },
                            cardinality: 1,
                            placeholder: ""
                        },
                        ":": {
                            validator: function validator(e, t, i, a, n) {
                                var r = "[" + k.escapeRegex(n.radixPoint) + "]";
                                var s = new RegExp(r).test(e);
                                if (s && t.validPositions[i] && t.validPositions[i].match.placeholder === n.radixPoint) {
                                    s = {
                                        caret: i + 1
                                    };
                                }
                                return s;
                            },
                            cardinality: 1,
                            placeholder: function placeholder(e) {
                                return e.radixPoint;
                            }
                        }
                    },
                    onUnMask: function onUnMask(e, t, i) {
                        if (t === "" && i.nullable === true) {
                            return t;
                        }
                        var a = e.replace(i.prefix, "");
                        a = a.replace(i.suffix, "");
                        a = a.replace(new RegExp(k.escapeRegex(i.groupSeparator), "g"), "");
                        if (i.placeholder.charAt(0) !== "") {
                            a = a.replace(new RegExp(i.placeholder.charAt(0), "g"), "0");
                        }
                        if (i.unmaskAsNumber) {
                            if (i.radixPoint !== "" && a.indexOf(i.radixPoint) !== -1) a = a.replace(k.escapeRegex.call(this, i.radixPoint), ".");
                            a = a.replace(new RegExp("^" + k.escapeRegex(i.negationSymbol.front)), "-");
                            a = a.replace(new RegExp(k.escapeRegex(i.negationSymbol.back) + "$"), "");
                            return Number(a);
                        }
                        return a;
                    },
                    isComplete: function isComplete(e, t) {
                        var i = (t.numericInput ? e.slice().reverse() : e).join("");
                        i = i.replace(new RegExp("^" + k.escapeRegex(t.negationSymbol.front)), "-");
                        i = i.replace(new RegExp(k.escapeRegex(t.negationSymbol.back) + "$"), "");
                        i = i.replace(t.prefix, "");
                        i = i.replace(t.suffix, "");
                        i = i.replace(new RegExp(k.escapeRegex(t.groupSeparator) + "([0-9]{3})", "g"), "$1");
                        if (t.radixPoint === ",") i = i.replace(k.escapeRegex(t.radixPoint), ".");
                        return isFinite(i);
                    },
                    onBeforeMask: function onBeforeMask(e, t) {
                        t.isNegative = undefined;
                        var i = t.radixPoint || ",";
                        if ((typeof e == "number" || t.inputType === "number") && i !== "") {
                            e = e.toString().replace(".", i);
                        }
                        var a = e.split(i), n = a[0].replace(/[^\-0-9]/g, ""), r = a.length > 1 ? a[1].replace(/[^0-9]/g, "") : "";
                        e = n + (r !== "" ? i + r : r);
                        var s = 0;
                        if (i !== "") {
                            s = r.length;
                            if (r !== "") {
                                var o = Math.pow(10, s || 1);
                                if (isFinite(t.digits)) {
                                    s = parseInt(t.digits);
                                    o = Math.pow(10, s);
                                }
                                e = e.replace(k.escapeRegex(i), ".");
                                if (isFinite(e)) e = Math.round(parseFloat(e) * o) / o;
                                e = e.toString().replace(".", i);
                            }
                        }
                        if (t.digits === 0 && e.indexOf(k.escapeRegex(i)) !== -1) {
                            e = e.substring(0, e.indexOf(k.escapeRegex(i)));
                        }
                        return alignDigits(e.toString().split(""), s, t).join("");
                    },
                    onKeyDown: function onKeyDown(e, t, i, a) {
                        var n = h(this);
                        if (e.ctrlKey) {
                            switch (e.keyCode) {
                              case k.keyCode.UP:
                                n.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(a.step));
                                n.trigger("setvalue");
                                break;

                              case k.keyCode.DOWN:
                                n.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(a.step));
                                n.trigger("setvalue");
                                break;
                            }
                        }
                    }
                },
                currency: {
                    prefix: "$ ",
                    groupSeparator: ",",
                    alias: "numeric",
                    placeholder: "0",
                    autoGroup: true,
                    digits: 2,
                    digitsOptional: false,
                    clearMaskOnLostFocus: false
                },
                decimal: {
                    alias: "numeric"
                },
                integer: {
                    alias: "numeric",
                    digits: 0,
                    radixPoint: ""
                },
                percentage: {
                    alias: "numeric",
                    digits: 2,
                    digitsOptional: true,
                    radixPoint: ".",
                    placeholder: "0",
                    autoGroup: false,
                    min: 0,
                    max: 100,
                    suffix: " %",
                    allowMinus: false
                }
            });
            return k;
        });
    } ]);
});