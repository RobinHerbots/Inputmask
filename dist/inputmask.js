/*!
 * dist/inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2018 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.0-beta.82
 */
!function webpackUniversalModuleDefinition(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var a = t();
        for (var n in a) ("object" == typeof exports ? exports : e)[n] = a[n];
    }
}(window, function() {
    return function(a) {
        var n = {};
        function __webpack_require__(e) {
            if (n[e]) return n[e].exports;
            var t = n[e] = {
                i: e,
                l: !1,
                exports: {}
            };
            return a[e].call(t.exports, t, t.exports, __webpack_require__), t.l = !0, t.exports;
        }
        return __webpack_require__.m = a, __webpack_require__.c = n, __webpack_require__.d = function(e, t, a) {
            __webpack_require__.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: a
            });
        }, __webpack_require__.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, __webpack_require__.t = function(t, e) {
            if (1 & e && (t = __webpack_require__(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var a = Object.create(null);
            if (__webpack_require__.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t) for (var n in t) __webpack_require__.d(a, n, function(e) {
                return t[e];
            }.bind(null, n));
            return a;
        }, __webpack_require__.n = function(e) {
            var t = e && e.__esModule ? function getDefault() {
                return e.default;
            } : function getModuleExports() {
                return e;
            };
            return __webpack_require__.d(t, "a", t), t;
        }, __webpack_require__.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
    }([ function(e, t, a) {
        "use strict";
        a(1), a(5), a(6), e.exports = a(2);
    }, function(e, t, a) {
        "use strict";
        var n = a(2);
        n.extendDefinitions({
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
        }), n.extendAliases({
            cssunit: {
                regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
            },
            url: {
                regex: "(https?|ftp)//.*",
                autoUnmask: !1
            },
            ip: {
                mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
                definitions: {
                    i: {
                        validator: function validator(e, t, a, n, i) {
                            return e = -1 < a - 1 && "." !== t.buffer[a - 1] ? (e = t.buffer[a - 1] + e, -1 < a - 2 && "." !== t.buffer[a - 2] ? t.buffer[a - 2] + e : "0" + e) : "00" + e, 
                            new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(e);
                        }
                    }
                },
                onUnMask: function onUnMask(e, t, a) {
                    return e;
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                casing: "lower",
                onBeforePaste: function onBeforePaste(e, t) {
                    return (e = e.toLowerCase()).replace("mailto:", "");
                },
                definitions: {
                    "*": {
                        validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
                    },
                    "-": {
                        validator: "[0-9A-Za-z-]"
                    }
                },
                onUnMask: function onUnMask(e, t, a) {
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
                clearIncomplete: !0,
                autoUnmask: !0
            }
        }), e.exports = n;
    }, function(e, t, a) {
        "use strict";
        var T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        e.exports = function(F, M, V) {
            var S = M.document, e = navigator.userAgent, x = 0 < e.indexOf("MSIE ") || 0 < e.indexOf("Trident/"), P = isInputEventSupported("touchstart"), _ = /iemobile/i.test(e), E = /iphone/i.test(e) && !_;
            function Inputmask(e, t, a) {
                if (!(this instanceof Inputmask)) return new Inputmask(e, t, a);
                this.el = V, this.events = {}, this.maskset = V, !(this.refreshValue = !1) !== a && (F.isPlainObject(e) ? t = e : (t = t || {}, 
                e && (t.alias = e)), this.opts = F.extend(!0, {}, this.defaults, t), this.noMasksCache = t && t.definitions !== V, 
                this.userOptions = t || {}, this.isRTL = this.opts.numericInput, resolveAlias(this.opts.alias, t, this.opts));
            }
            function resolveAlias(e, t, a) {
                var n = Inputmask.prototype.aliases[e];
                return n ? (n.alias && resolveAlias(n.alias, V, a), F.extend(!0, a, n), F.extend(!0, a, t), 
                !0) : (null === a.mask && (a.mask = e), !1);
            }
            function generateMaskSet(a, s) {
                function generateMask(e, t, a) {
                    var n = !1;
                    if (null !== e && "" !== e || (n = null !== a.regex, e = n ? (e = a.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (n = !0, 
                    ".*")), 1 === e.length && !1 === a.greedy && 0 !== a.repeat && (a.placeholder = ""), 
                    0 < a.repeat || "*" === a.repeat || "+" === a.repeat) {
                        var i = "*" === a.repeat ? 0 : "+" === a.repeat ? 1 : a.repeat;
                        e = a.groupmarker[0] + e + a.groupmarker[1] + a.quantifiermarker[0] + i + "," + a.repeat + a.quantifiermarker[1];
                    }
                    var r, o = n ? "regex_" + a.regex : a.numericInput ? e.split("").reverse().join("") : e;
                    return Inputmask.prototype.masksCache[o] === V || !0 === s ? (r = {
                        mask: e,
                        maskToken: Inputmask.prototype.analyseMask(e, n, a),
                        validPositions: {},
                        _buffer: V,
                        buffer: V,
                        tests: {},
                        excludes: {},
                        metadata: t,
                        maskLength: V,
                        jitOffset: {}
                    }, !0 !== s && (Inputmask.prototype.masksCache[o] = r, r = F.extend(!0, {}, Inputmask.prototype.masksCache[o]))) : r = F.extend(!0, {}, Inputmask.prototype.masksCache[o]), 
                    r;
                }
                if (F.isFunction(a.mask) && (a.mask = a.mask(a)), F.isArray(a.mask)) {
                    if (1 < a.mask.length) {
                        if (null === a.keepStatic) {
                            a.keepStatic = "auto";
                            for (var e = 0; e < a.mask.length; e++) if (a.mask[e].charAt(0) !== a.mask[0].charAt(0)) {
                                a.keepStatic = !0;
                                break;
                            }
                        }
                        var n = a.groupmarker[0];
                        return F.each(a.isRTL ? a.mask.reverse() : a.mask, function(e, t) {
                            1 < n.length && (n += a.groupmarker[1] + a.alternatormarker + a.groupmarker[0]), 
                            t.mask === V || F.isFunction(t.mask) ? n += t : n += t.mask;
                        }), generateMask(n += a.groupmarker[1], a.mask, a);
                    }
                    a.mask = a.mask.pop();
                }
                return a.mask && a.mask.mask !== V && !F.isFunction(a.mask.mask) ? generateMask(a.mask.mask, a.mask, a) : generateMask(a.mask, a.mask, a);
            }
            function isInputEventSupported(e) {
                var t = S.createElement("input"), a = "on" + e, n = a in t;
                return n || (t.setAttribute(a, "return;"), n = "function" == typeof t[a]), t = null, 
                n;
            }
            function maskScope(e, t, N) {
                t = t || this.maskset, N = N || this.opts;
                var m, i, g, f, r, u = this, l = this.el, k = this.isRTL, o = !1, c = !1, h = !1, n = !1;
                function getMaskTemplate(e, t, a, n, i) {
                    var r = N.greedy;
                    i && (N.greedy = !1), t = t || 0;
                    var o, s, l, u = [], c = 0;
                    getLastValidPosition();
                    do {
                        if (!0 === e && getMaskSet().validPositions[c]) l = i && !0 === getMaskSet().validPositions[c].match.optionality && getMaskSet().validPositions[c + 1] === V && (!0 === getMaskSet().validPositions[c].generatedInput || getMaskSet().validPositions[c].input == N.skipOptionalPartCharacter && 0 < c) ? determineTestTemplate(c, getTests(c, o, c - 1)) : getMaskSet().validPositions[c], 
                        s = l.match, o = l.locator.slice(), u.push(!0 === a ? l.input : !1 === a ? s.nativeDef : getPlaceholder(c, s)); else {
                            l = getTestTemplate(c, o, c - 1), s = l.match, o = l.locator.slice();
                            var p = !0 !== n && (!1 !== N.jitMasking ? N.jitMasking : s.jit);
                            (!1 === p || p === V || "number" == typeof p && isFinite(p) && c < p) && u.push(!1 === a ? s.nativeDef : getPlaceholder(c, s));
                        }
                        "auto" === N.keepStatic && s.newBlockMarker && null !== s.fn && (N.keepStatic = c - 1), 
                        c++;
                    } while ((g === V || c < g) && (null !== s.fn || "" !== s.def) || c < t);
                    return "" === u[u.length - 1] && u.pop(), !1 === a && getMaskSet().maskLength !== V || (getMaskSet().maskLength = c - 1), 
                    N.greedy = r, u;
                }
                function getMaskSet() {
                    return t;
                }
                function resetMaskSet(e) {
                    var t = getMaskSet();
                    t.buffer = V, !0 !== e && (t.validPositions = {}, t.p = 0);
                }
                function getLastValidPosition(e, t, a) {
                    var n = -1, i = -1, r = a || getMaskSet().validPositions;
                    for (var o in e === V && (e = -1), r) {
                        var s = parseInt(o);
                        r[s] && (t || !0 !== r[s].generatedInput) && (s <= e && (n = s), e <= s && (i = s));
                    }
                    return -1 === n || n == e ? i : -1 == i ? n : e - n < i - e ? n : i;
                }
                function getDecisionTaker(e) {
                    var t = e.locator[e.alternation];
                    return "string" == typeof t && 0 < t.length && (t = t.split(",")[0]), t !== V ? t.toString() : "";
                }
                function getLocator(e, t) {
                    var a = (e.alternation != V ? e.mloc[getDecisionTaker(e)] : e.locator).join("");
                    if ("" !== a) for (;a.length < t; ) a += "0";
                    return a;
                }
                function determineTestTemplate(e, t) {
                    for (var a, n, i, r = getTest(e = 0 < e ? e - 1 : 0), o = getLocator(r), s = 0; s < t.length; s++) {
                        var l = t[s];
                        a = getLocator(l, o.length);
                        var u = Math.abs(a - o);
                        (n === V || "" !== a && u < n || i && i.match.optionality && "master" === i.match.newBlockMarker && (!l.match.optionality || !l.match.newBlockMarker) || i && i.match.optionalQuantifier && !l.match.optionalQuantifier) && (n = u, 
                        i = l);
                    }
                    return i;
                }
                function getTestTemplate(e, t, a) {
                    return getMaskSet().validPositions[e] || determineTestTemplate(e, getTests(e, t ? t.slice() : t, a));
                }
                function getTest(e, t) {
                    return getMaskSet().validPositions[e] ? getMaskSet().validPositions[e] : (t || getTests(e))[0];
                }
                function positionCanMatchDefinition(e, t) {
                    for (var a = !1, n = getTests(e), i = 0; i < n.length; i++) if (n[i].match && n[i].match.def === t) {
                        a = !0;
                        break;
                    }
                    return a;
                }
                function getTests(A, e, t) {
                    var O, a = getMaskSet().maskToken, B = e ? t : 0, n = e ? e.slice() : [ 0 ], I = [], L = !1, j = e ? e.join("") : "";
                    function resolveTestFromToken(D, C, e, t) {
                        function handleMatch(e, t, a) {
                            function isFirstMatch(a, n) {
                                var i = 0 === F.inArray(a, n.matches);
                                return i || F.each(n.matches, function(e, t) {
                                    if (!0 === t.isQuantifier ? i = isFirstMatch(a, n.matches[e - 1]) : t.hasOwnProperty("matches") && (i = isFirstMatch(a, t)), 
                                    i) return !1;
                                }), i;
                            }
                            function resolveNdxInitializer(e, i, r) {
                                var o, s;
                                if ((getMaskSet().tests[e] || getMaskSet().validPositions[e]) && F.each(getMaskSet().tests[e] || [ getMaskSet().validPositions[e] ], function(e, t) {
                                    if (t.mloc[i]) return o = t, !1;
                                    var a = r !== V ? r : t.alternation, n = t.locator[a] !== V ? t.locator[a].toString().indexOf(i) : -1;
                                    (s === V || n < s) && -1 !== n && (o = t, s = n);
                                }), o) {
                                    var t = o.locator[o.alternation], a = o.mloc[i] || o.mloc[t] || o.locator;
                                    return a.slice((r !== V ? r : o.alternation) + 1);
                                }
                                return r !== V ? resolveNdxInitializer(e, i) : V;
                            }
                            function isSubsetOf(e, t) {
                                function expand(e) {
                                    for (var t, a, n = [], i = 0, r = e.length; i < r; i++) if ("-" === e.charAt(i)) for (a = e.charCodeAt(i + 1); ++t < a; ) n.push(String.fromCharCode(t)); else t = e.charCodeAt(i), 
                                    n.push(e.charAt(i));
                                    return n.join("");
                                }
                                return N.regex && null !== e.match.fn && null !== t.match.fn ? -1 !== expand(t.match.def.replace(/[\[\]]/g, "")).indexOf(expand(e.match.def.replace(/[\[\]]/g, ""))) : e.match.def === t.match.nativeDef;
                            }
                            function setMergeLocators(e, t) {
                                if (t === V || e.alternation === t.alternation && -1 === e.locator[e.alternation].toString().indexOf(t.locator[t.alternation])) {
                                    e.mloc = e.mloc || {};
                                    var a = e.locator[e.alternation];
                                    if (a !== V) {
                                        if ("string" == typeof a && (a = a.split(",")[0]), e.mloc[a] === V && (e.mloc[a] = e.locator.slice()), 
                                        t !== V) {
                                            for (var n in t.mloc) "string" == typeof n && (n = n.split(",")[0]), e.mloc[n] === V && (e.mloc[n] = t.mloc[n]);
                                            e.locator[e.alternation] = Object.keys(e.mloc).join(",");
                                        }
                                        return !0;
                                    }
                                    e.alternation = V;
                                }
                                return !1;
                            }
                            if (500 < B && a !== V) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                            if (B === A && e.matches === V) return I.push({
                                match: e,
                                locator: t.reverse(),
                                cd: j,
                                mloc: {}
                            }), !0;
                            if (e.matches !== V) {
                                if (e.isGroup && a !== e) {
                                    if (e = handleMatch(D.matches[F.inArray(e, D.matches) + 1], t, a)) return !0;
                                } else if (e.isOptional) {
                                    var n = e;
                                    if (e = resolveTestFromToken(e, C, t, a)) {
                                        if (F.each(I, function(e, t) {
                                            t.match.optionality = !0;
                                        }), O = I[I.length - 1].match, a !== V || !isFirstMatch(O, n)) return !0;
                                        L = !0, B = A;
                                    }
                                } else if (e.isAlternator) {
                                    var i, r = e, o = [], s = I.slice(), l = t.length, u = 0 < C.length ? C.shift() : -1;
                                    if (-1 === u || "string" == typeof u) {
                                        var c, p = B, f = C.slice(), d = [];
                                        if ("string" == typeof u) d = u.split(","); else for (c = 0; c < r.matches.length; c++) d.push(c.toString());
                                        if (getMaskSet().excludes[A]) {
                                            for (var g = d.slice(), m = 0, k = getMaskSet().excludes[A].length; m < k; m++) d.splice(d.indexOf(getMaskSet().excludes[A][m].toString()), 1);
                                            0 === d.length && (getMaskSet().excludes[A] = V, d = g);
                                        }
                                        (!0 === N.keepStatic || isFinite(parseInt(N.keepStatic)) && p >= N.keepStatic) && (d = d.slice(0, 1));
                                        for (var h = !1, v = 0; v < d.length; v++) {
                                            c = parseInt(d[v]), I = [], C = "string" == typeof u && resolveNdxInitializer(B, c, l) || f.slice(), 
                                            r.matches[c] && handleMatch(r.matches[c], [ c ].concat(t), a) ? e = !0 : 0 === v && (h = !0), 
                                            i = I.slice(), B = p, I = [];
                                            for (var y = 0; y < i.length; y++) {
                                                var b = i[y], M = !1;
                                                b.match.jit = b.match.jit || h, b.alternation = b.alternation || l, setMergeLocators(b);
                                                for (var S = 0; S < o.length; S++) {
                                                    var x = o[S];
                                                    if ("string" != typeof u || b.alternation !== V && -1 !== F.inArray(b.locator[b.alternation].toString(), d)) {
                                                        if (b.match.nativeDef === x.match.nativeDef) {
                                                            M = !0, setMergeLocators(x, b);
                                                            break;
                                                        }
                                                        if (isSubsetOf(b, x)) {
                                                            setMergeLocators(b, x) && (M = !0, o.splice(o.indexOf(x), 0, b));
                                                            break;
                                                        }
                                                        if (isSubsetOf(x, b)) {
                                                            setMergeLocators(x, b);
                                                            break;
                                                        }
                                                        if (w = x, void 0, !(!((T = T = b).locator.slice(T.alternation).join("") == w.locator.slice(w.alternation).join("")) || null !== T.match.fn || null === w.match.fn) && w.match.fn.test(T.match.def, getMaskSet(), A, !1, N, !1)) {
                                                            setMergeLocators(b, x) && (M = !0, o.splice(o.indexOf(x), 0, b));
                                                            break;
                                                        }
                                                    }
                                                }
                                                M || o.push(b);
                                            }
                                        }
                                        I = s.concat(o), B = A, L = 0 < I.length, e = 0 < o.length, C = f.slice();
                                    } else e = handleMatch(r.matches[u] || D.matches[u], [ u ].concat(t), a);
                                    if (e) return !0;
                                } else if (e.isQuantifier && a !== D.matches[F.inArray(e, D.matches) - 1]) for (var P = e, _ = 0 < C.length ? C.shift() : 0; _ < (isNaN(P.quantifier.max) ? _ + 1 : P.quantifier.max) && B <= A; _++) {
                                    var E = D.matches[F.inArray(P, D.matches) - 1];
                                    if (e = handleMatch(E, [ _ ].concat(t), E)) {
                                        if ((O = I[I.length - 1].match).optionalQuantifier = _ >= P.quantifier.min, O.jit = (_ || 1) * E.matches.indexOf(O) >= P.quantifier.jit, 
                                        O.optionalQuantifier && isFirstMatch(O, E)) {
                                            L = !0, B = A;
                                            break;
                                        }
                                        return O.jit && (getMaskSet().jitOffset[A] = E.matches.indexOf(O)), !0;
                                    }
                                } else if (e = resolveTestFromToken(e, C, t, a)) return !0;
                            } else B++;
                            var T, w;
                        }
                        for (var a = 0 < C.length ? C.shift() : 0; a < D.matches.length; a++) if (!0 !== D.matches[a].isQuantifier) {
                            var n = handleMatch(D.matches[a], [ a ].concat(e), t);
                            if (n && B === A) return n;
                            if (A < B) break;
                        }
                    }
                    if (-1 < A) {
                        if (e === V) {
                            for (var i, r = A - 1; (i = getMaskSet().validPositions[r] || getMaskSet().tests[r]) === V && -1 < r; ) r--;
                            i !== V && -1 < r && (n = function mergeLocators(e, t) {
                                var n = [];
                                return F.isArray(t) || (t = [ t ]), 0 < t.length && (t[0].alternation === V ? 0 === (n = determineTestTemplate(e, t.slice()).locator.slice()).length && (n = t[0].locator.slice()) : F.each(t, function(e, t) {
                                    if ("" !== t.def) if (0 === n.length) n = t.locator.slice(); else for (var a = 0; a < n.length; a++) t.locator[a] && -1 === n[a].toString().indexOf(t.locator[a]) && (n[a] += "," + t.locator[a]);
                                })), n;
                            }(r, i), j = n.join(""), B = r);
                        }
                        if (getMaskSet().tests[A] && getMaskSet().tests[A][0].cd === j) return getMaskSet().tests[A];
                        for (var o = n.shift(); o < a.length; o++) {
                            var s = resolveTestFromToken(a[o], n, [ o ]);
                            if (s && B === A || A < B) break;
                        }
                    }
                    return (0 === I.length || L) && I.push({
                        match: {
                            fn: null,
                            optionality: !1,
                            casing: null,
                            def: "",
                            placeholder: ""
                        },
                        locator: [],
                        mloc: {},
                        cd: j
                    }), e !== V && getMaskSet().tests[A] ? F.extend(!0, [], I) : (getMaskSet().tests[A] = F.extend(!0, [], I), 
                    getMaskSet().tests[A]);
                }
                function getBufferTemplate() {
                    return getMaskSet()._buffer === V && (getMaskSet()._buffer = getMaskTemplate(!1, 1), 
                    getMaskSet().buffer === V && (getMaskSet().buffer = getMaskSet()._buffer.slice())), 
                    getMaskSet()._buffer;
                }
                function getBuffer(e) {
                    return getMaskSet().buffer !== V && !0 !== e || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0), 
                    getMaskSet()._buffer === V && (getMaskSet()._buffer = getMaskSet().buffer.slice())), 
                    getMaskSet().buffer;
                }
                function refreshFromBuffer(e, t, a) {
                    var n, i;
                    if (!0 === e) resetMaskSet(), e = 0, t = a.length; else for (n = e; n < t; n++) delete getMaskSet().validPositions[n];
                    for (n = i = e; n < t; n++) if (resetMaskSet(!0), a[n] !== N.skipOptionalPartCharacter) {
                        var r = isValid(i, a[n], !0, !0);
                        !1 !== r && (resetMaskSet(!0), i = r.caret !== V ? r.caret : r.pos + 1);
                    }
                }
                function checkAlternationMatch(e, t, a) {
                    for (var n, i = N.greedy ? t : t.slice(0, 1), r = !1, o = a !== V ? a.split(",") : [], s = 0; s < o.length; s++) -1 !== (n = e.indexOf(o[s])) && e.splice(n, 1);
                    for (var l = 0; l < e.length; l++) if (-1 !== F.inArray(e[l], i)) {
                        r = !0;
                        break;
                    }
                    return r;
                }
                function alternate(e, t, a, n, i) {
                    var r, o, s, l, u, c, p, f = F.extend(!0, {}, getMaskSet().validPositions), d = !1, g = i !== V ? i : getLastValidPosition();
                    if (-1 === g && i === V) l = getTest(r = 0), o = l.alternation; else for (;0 <= g; g--) if ((s = getMaskSet().validPositions[g]) && s.alternation !== V) {
                        if (l && l.locator[s.alternation] !== s.locator[s.alternation]) break;
                        r = g, o = getMaskSet().validPositions[r].alternation, l = s;
                    }
                    if (o !== V) {
                        p = parseInt(r), getMaskSet().excludes[p] = getMaskSet().excludes[p] || [], !0 !== e && getMaskSet().excludes[p].push(getDecisionTaker(l));
                        var m = [], k = 0;
                        for (u = p; u < getLastValidPosition(V, !0) + 1; u++) (c = getMaskSet().validPositions[u]) && !0 !== c.generatedInput ? m.push(c.input) : u < e && k++, 
                        delete getMaskSet().validPositions[u];
                        for (;getMaskSet().excludes[p] && getMaskSet().excludes[p].length < 10; ) {
                            var h = -1 * k, v = m.slice();
                            for (getMaskSet().tests[p] = V, resetMaskSet(!0), d = !0; 0 < v.length; ) {
                                var y = v.shift();
                                if (!(d = isValid(getLastValidPosition(V, !0) + 1, y, !1, n, !0))) break;
                            }
                            if (d && t !== V) {
                                var b = getLastValidPosition(e) + 1;
                                for (u = p; u < getLastValidPosition() + 1; u++) ((c = getMaskSet().validPositions[u]) === V || null == c.match.fn) && u < e + h && h++;
                                d = isValid(b < (e += h) ? b : e, t, a, n, !0);
                            }
                            if (d) break;
                            if (resetMaskSet(), l = getTest(p), getMaskSet().validPositions = F.extend(!0, {}, f), 
                            !getMaskSet().excludes[p]) {
                                d = alternate(e, t, a, n, p - 1);
                                break;
                            }
                            var M = getDecisionTaker(l);
                            if (-1 !== getMaskSet().excludes[p].indexOf(M)) {
                                d = alternate(e, t, a, n, p - 1);
                                break;
                            }
                            for (getMaskSet().excludes[p].push(M), u = p; u < getLastValidPosition(V, !0) + 1; u++) delete getMaskSet().validPositions[u];
                        }
                    }
                    return getMaskSet().excludes[p] = V, d;
                }
                function isValid(u, e, t, c, a, n) {
                    function isSelection(e) {
                        return k ? 1 < e.begin - e.end || e.begin - e.end == 1 : 1 < e.end - e.begin || e.end - e.begin == 1;
                    }
                    t = !0 === t;
                    var i = u;
                    function _isValid(r, o, s) {
                        var l = !1;
                        return F.each(getTests(r), function(e, t) {
                            var a = t.match;
                            if (getBuffer(!0), !1 !== (l = null != a.fn ? a.fn.test(o, getMaskSet(), r, s, N, isSelection(u)) : (o === a.def || o === N.skipOptionalPartCharacter) && "" !== a.def && {
                                c: getPlaceholder(r, a, !0) || a.def,
                                pos: r
                            })) {
                                var n = l.c !== V ? l.c : o, i = r;
                                return n = n === N.skipOptionalPartCharacter && null === a.fn ? getPlaceholder(r, a, !0) || a.def : n, 
                                l.remove !== V && (F.isArray(l.remove) || (l.remove = [ l.remove ]), F.each(l.remove.sort(function(e, t) {
                                    return t - e;
                                }), function(e, t) {
                                    revalidateMask({
                                        begin: t,
                                        end: t + 1
                                    });
                                })), l.insert !== V && (F.isArray(l.insert) || (l.insert = [ l.insert ]), F.each(l.insert.sort(function(e, t) {
                                    return e - t;
                                }), function(e, t) {
                                    isValid(t.pos, t.c, !0, c);
                                })), !0 !== l && l.pos !== V && l.pos !== r && (i = l.pos), !0 !== l && l.pos === V && l.c === V || revalidateMask(u, F.extend({}, t, {
                                    input: function casing(e, t, a) {
                                        switch (N.casing || t.casing) {
                                          case "upper":
                                            e = e.toUpperCase();
                                            break;

                                          case "lower":
                                            e = e.toLowerCase();
                                            break;

                                          case "title":
                                            var n = getMaskSet().validPositions[a - 1];
                                            e = 0 === a || n && n.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? e.toUpperCase() : e.toLowerCase();
                                            break;

                                          default:
                                            if (F.isFunction(N.casing)) {
                                                var i = Array.prototype.slice.call(arguments);
                                                i.push(getMaskSet().validPositions), e = N.casing.apply(this, i);
                                            }
                                        }
                                        return e;
                                    }(n, a, i)
                                }), c, i) || (l = !1), !1;
                            }
                        }), l;
                    }
                    u.begin !== V && (i = k ? u.end : u.begin);
                    var r = !0, o = F.extend(!0, {}, getMaskSet().validPositions);
                    if (F.isFunction(N.preValidation) && !t && !0 !== c && !0 !== n && (r = N.preValidation(getBuffer(), i, e, isSelection(u), N, getMaskSet())), 
                    !0 === r) {
                        if (trackbackPositions(V, i, !0), (g === V || i < g) && (r = _isValid(i, e, t), 
                        (!t || !0 === c) && !1 === r && !0 !== n)) {
                            var s = getMaskSet().validPositions[i];
                            if (!s || null !== s.match.fn || s.match.def !== e && e !== N.skipOptionalPartCharacter) {
                                if ((N.insertMode || getMaskSet().validPositions[seekNext(i)] === V) && (!isMask(i, !0) || getMaskSet().jitOffset[i])) if (getMaskSet().jitOffset[i] && getMaskSet().validPositions[seekNext(i)] === V) (r = isValid(i + getMaskSet().jitOffset[i], e, t)).caret = i; else for (var l = i + 1, p = seekNext(i); l <= p; l++) if (!1 !== (r = _isValid(l, e, t))) {
                                    r = trackbackPositions(i, r.pos !== V ? r.pos : l) || r, i = l;
                                    break;
                                }
                            } else r = {
                                caret: seekNext(i)
                            };
                        }
                        !1 !== r || !1 === N.keepStatic || null != N.regex && !isComplete(getBuffer()) || t || !0 === a || (r = alternate(i, e, t, c)), 
                        !0 === r && (r = {
                            pos: i
                        });
                    }
                    if (F.isFunction(N.postValidation) && !1 !== r && !t && !0 !== c && !0 !== n) {
                        var f = N.postValidation(getBuffer(!0), u.begin !== V ? k ? u.end : u.begin : u, r, N);
                        if (f !== V) {
                            if (f.refreshFromBuffer && f.buffer) {
                                var d = f.refreshFromBuffer;
                                refreshFromBuffer(!0 === d ? d : d.start, d.end, f.buffer);
                            }
                            r = !0 === f ? r : f;
                        }
                    }
                    return r && r.pos === V && (r.pos = i), !1 !== r && !0 !== n || (resetMaskSet(!0), 
                    getMaskSet().validPositions = F.extend(!0, {}, o)), r;
                }
                function trackbackPositions(e, t, a) {
                    var n;
                    if (e === V) for (e = t - 1; 0 < e && !getMaskSet().validPositions[e]; e--) ;
                    for (var i = e; i < t; i++) if (getMaskSet().validPositions[i] === V && !isMask(i, !0)) {
                        var r = 0 == i ? getTest(i) : getMaskSet().validPositions[i - 1];
                        if (r) {
                            var o = getTests(i).slice();
                            "" === o[o.length - 1].match.def && o.pop();
                            var s = determineTestTemplate(i, o);
                            if ((s = F.extend({}, s, {
                                input: getPlaceholder(i, s.match, !0) || s.match.def
                            })).generatedInput = !0, revalidateMask(i, s, !0), !0 !== a) {
                                var l = getMaskSet().validPositions[t].input;
                                getMaskSet().validPositions[t] = V, n = isValid(t, l, !0, !0);
                            }
                        }
                    }
                    return n;
                }
                function revalidateMask(e, t, a, n) {
                    function IsEnclosedStatic(e, t, a) {
                        var n = t[e];
                        if (n === V || (null !== n.match.fn || !0 === n.match.optionality) && n.input !== N.radixPoint) return !1;
                        var i = a.begin <= e - 1 ? t[e - 1] && null === t[e - 1].match.fn && t[e - 1] : t[e - 1], r = a.end > e + 1 ? t[e + 1] && null === t[e + 1].match.fn && t[e + 1] : t[e + 1];
                        return i && r;
                    }
                    var i = e.begin !== V ? e.begin : e, r = e.end !== V ? e.end : e;
                    if (e.begin > e.end && (i = e.end, r = e.begin), n = n !== V ? n : i, i !== r || N.insertMode && getMaskSet().validPositions[n] !== V && a === V) {
                        var o = F.extend(!0, {}, getMaskSet().validPositions), s = getLastValidPosition(V, !0);
                        for (getMaskSet().p = i, f = s; i <= f; f--) getMaskSet().validPositions[f] && "+" === getMaskSet().validPositions[f].match.nativeDef && (N.isNegative = !1), 
                        delete getMaskSet().validPositions[f];
                        var l = !0, u = n, c = (getMaskSet().validPositions, !1), p = u, f = u;
                        for (t && (getMaskSet().validPositions[n] = F.extend(!0, {}, t), p++, u++, i < r && f++); f <= s; f++) {
                            var d = o[f];
                            if (d !== V && (r <= f || i <= f && !0 !== d.generatedInput && IsEnclosedStatic(f, o, {
                                begin: i,
                                end: r
                            }))) {
                                for (;"" !== getTest(p).match.def; ) {
                                    if (!1 === c && o[p] && o[p].match.nativeDef === d.match.nativeDef) getMaskSet().validPositions[p] = F.extend(!0, {}, o[p]), 
                                    getMaskSet().validPositions[p].input = d.input, trackbackPositions(V, p, !0), u = p + 1, 
                                    l = !0; else if (N.shiftPositions && positionCanMatchDefinition(p, d.match.def)) {
                                        var g = isValid(p, d.input, !0, !0);
                                        l = !1 !== g, u = g.caret || g.insert ? getLastValidPosition() : p + 1, c = !0;
                                    } else l = !0 === d.generatedInput || d.input === N.radixPoint && !0 === N.numericInput;
                                    if (l) break;
                                    if (!l && r < p && isMask(p, !0) && (null !== d.match.fn || p > getMaskSet().maskLength)) break;
                                    p++;
                                }
                                "" == getTest(p).match.def && (l = !1), p = u;
                            }
                            if (!l) break;
                        }
                        if (!l) return getMaskSet().validPositions = F.extend(!0, {}, o), resetMaskSet(!0), 
                        !1;
                    } else t && (getMaskSet().validPositions[n] = F.extend(!0, {}, t));
                    return resetMaskSet(!0), !0;
                }
                function isMask(e, t) {
                    var a = getTestTemplate(e).match;
                    if ("" === a.def && (a = getTest(e).match), null != a.fn) return a.fn;
                    if (!0 !== t && -1 < e) {
                        var n = getTests(e);
                        return n.length > 1 + ("" === n[n.length - 1].match.def ? 1 : 0);
                    }
                    return !1;
                }
                function seekNext(e, t) {
                    for (var a = e + 1; "" !== getTest(a).match.def && (!0 === t && (!0 !== getTest(a).match.newBlockMarker || !isMask(a)) || !0 !== t && !isMask(a)); ) a++;
                    return a;
                }
                function seekPrevious(e, t) {
                    var a, n = e;
                    if (n <= 0) return 0;
                    for (;0 < --n && (!0 === t && !0 !== getTest(n).match.newBlockMarker || !0 !== t && !isMask(n) && ((a = getTests(n)).length < 2 || 2 === a.length && "" === a[1].match.def)); ) ;
                    return n;
                }
                function writeBuffer(e, t, a, n, i) {
                    if (n && F.isFunction(N.onBeforeWrite)) {
                        var r = N.onBeforeWrite.call(u, n, t, a, N);
                        if (r) {
                            if (r.refreshFromBuffer) {
                                var o = r.refreshFromBuffer;
                                refreshFromBuffer(!0 === o ? o : o.start, o.end, r.buffer || t), t = getBuffer(!0);
                            }
                            a !== V && (a = r.caret !== V ? r.caret : a);
                        }
                    }
                    if (e !== V && (e.inputmask._valueSet(t.join("")), a === V || n !== V && "blur" === n.type ? renderColorMask(e, a, 0 === t.length) : caret(e, a), 
                    !0 === i)) {
                        var s = F(e), l = e.inputmask._valueGet();
                        c = !0, s.trigger("input"), setTimeout(function() {
                            l === getBufferTemplate().join("") ? s.trigger("cleared") : !0 === isComplete(t) && s.trigger("complete");
                        }, 0);
                    }
                }
                function getPlaceholder(e, t, a) {
                    if ((t = t || getTest(e).match).placeholder !== V || !0 === a) return F.isFunction(t.placeholder) ? t.placeholder(N) : t.placeholder;
                    if (null !== t.fn) return N.placeholder.charAt(e % N.placeholder.length);
                    if (-1 < e && getMaskSet().validPositions[e] === V) {
                        var n, i = getTests(e), r = [];
                        if (i.length > 1 + ("" === i[i.length - 1].match.def ? 1 : 0)) for (var o = 0; o < i.length; o++) if (!0 !== i[o].match.optionality && !0 !== i[o].match.optionalQuantifier && (null === i[o].match.fn || n === V || !1 !== i[o].match.fn.test(n.match.def, getMaskSet(), e, !0, N)) && (r.push(i[o]), 
                        null === i[o].match.fn && (n = i[o]), 1 < r.length && /[0-9a-bA-Z]/.test(r[0].match.def))) return N.placeholder.charAt(e % N.placeholder.length);
                    }
                    return t.def;
                }
                function HandleNativePlaceholder(e, t) {
                    if (x && e.inputmask._valueGet() !== t) {
                        var a = getBuffer().slice(), n = e.inputmask._valueGet();
                        n !== t && (-1 === getLastValidPosition() && n === getBufferTemplate().join("") ? a = [] : clearOptionalTail(a), 
                        writeBuffer(e, a));
                    } else e.placeholder !== t && (e.placeholder = t, "" === e.placeholder && e.removeAttribute("placeholder"));
                }
                var a, s = {
                    on: function on(e, t, r) {
                        var a = function ev(e) {
                            var t = this;
                            if (t.inputmask === V && "FORM" !== this.nodeName) {
                                var a = F.data(t, "_inputmask_opts");
                                a ? new Inputmask(a).mask(t) : s.off(t);
                            } else {
                                if ("setvalue" === e.type || "FORM" === this.nodeName || !(t.disabled || t.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === N.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                                    switch (e.type) {
                                      case "input":
                                        if (!0 === c) return c = !1, e.preventDefault();
                                        if (P) {
                                            var n = arguments;
                                            return setTimeout(function() {
                                                r.apply(t, n), caret(t, t.inputmask.caretPos, V, !0);
                                            }, 0), !1;
                                        }
                                        break;

                                      case "keydown":
                                        c = o = !1;
                                        break;

                                      case "keypress":
                                        if (!0 === o) return e.preventDefault();
                                        o = !0;
                                        break;

                                      case "click":
                                        if (_ || E) {
                                            var n = arguments;
                                            return setTimeout(function() {
                                                r.apply(t, n);
                                            }, 0), !1;
                                        }
                                    }
                                    var i = r.apply(t, arguments);
                                    return !1 === i && (e.preventDefault(), e.stopPropagation()), i;
                                }
                                e.preventDefault();
                            }
                        };
                        e.inputmask.events[t] = e.inputmask.events[t] || [], e.inputmask.events[t].push(a), 
                        -1 !== F.inArray(t, [ "submit", "reset" ]) ? null !== e.form && F(e.form).on(t, a) : F(e).on(t, a);
                    },
                    off: function off(n, e) {
                        var t;
                        n.inputmask && n.inputmask.events && (e ? (t = [])[e] = n.inputmask.events[e] : t = n.inputmask.events, 
                        F.each(t, function(e, t) {
                            for (;0 < t.length; ) {
                                var a = t.pop();
                                -1 !== F.inArray(e, [ "submit", "reset" ]) ? null !== n.form && F(n.form).off(e, a) : F(n).off(e, a);
                            }
                            delete n.inputmask.events[e];
                        }));
                    }
                }, v = {
                    keydownEvent: function keydownEvent(e) {
                        var t = this, a = F(t), n = e.keyCode, i = caret(t);
                        if (n === Inputmask.keyCode.BACKSPACE || n === Inputmask.keyCode.DELETE || E && n === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && n === Inputmask.keyCode.X && !isInputEventSupported("cut")) e.preventDefault(), 
                        handleRemove(0, n, i), writeBuffer(t, getBuffer(!0), getMaskSet().p, e, t.inputmask._valueGet() !== getBuffer().join("")); else if (n === Inputmask.keyCode.END || n === Inputmask.keyCode.PAGE_DOWN) {
                            e.preventDefault();
                            var r = seekNext(getLastValidPosition());
                            caret(t, e.shiftKey ? i.begin : r, r, !0);
                        } else n === Inputmask.keyCode.HOME && !e.shiftKey || n === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), 
                        caret(t, 0, e.shiftKey ? i.begin : 0, !0)) : (N.undoOnEscape && n === Inputmask.keyCode.ESCAPE || 90 === n && e.ctrlKey) && !0 !== e.altKey ? (checkVal(t, !0, !1, m.split("")), 
                        a.trigger("click")) : n !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === N.tabThrough && n === Inputmask.keyCode.TAB && (!0 === e.shiftKey ? (null === getTest(i.begin).match.fn && (i.begin = seekNext(i.begin)), 
                        i.end = seekPrevious(i.begin, !0), i.begin = seekPrevious(i.end, !0)) : (i.begin = seekNext(i.begin, !0), 
                        i.end = seekNext(i.begin, !0), i.end < getMaskSet().maskLength && i.end--), i.begin < getMaskSet().maskLength && (e.preventDefault(), 
                        caret(t, i.begin, i.end))) : (N.insertMode = !N.insertMode, t.setAttribute("im-insert", N.insertMode));
                        N.onKeyDown.call(this, e, getBuffer(), caret(t).begin, N), h = -1 !== F.inArray(n, N.ignorables);
                    },
                    keypressEvent: function keypressEvent(e, t, a, n, i) {
                        var r = this, o = F(r), s = e.which || e.charCode || e.keyCode;
                        if (!(!0 === t || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || h)) return s === Inputmask.keyCode.ENTER && m !== getBuffer().join("") && (m = getBuffer().join(""), 
                        setTimeout(function() {
                            o.trigger("change");
                        }, 0)), !0;
                        if (s) {
                            46 === s && !1 === e.shiftKey && "" !== N.radixPoint && (s = N.radixPoint.charCodeAt(0));
                            var l, u = t ? {
                                begin: i,
                                end: i
                            } : caret(r), c = String.fromCharCode(s), p = 0;
                            if (N._radixDance && N.numericInput) {
                                var f = getBuffer().indexOf(N.radixPoint.charAt(0)) + 1;
                                u.begin <= f && (s === N.radixPoint.charCodeAt(0) && (p = 1), u.begin -= 1, u.end -= 1);
                            }
                            getMaskSet().writeOutBuffer = !0;
                            var d = isValid(u, c, n);
                            if (!1 !== d && (resetMaskSet(!0), l = d.caret !== V ? d.caret : seekNext(d.pos.begin ? d.pos.begin : d.pos), 
                            getMaskSet().p = l), l = (N.numericInput && d.caret === V ? seekPrevious(l) : l) + p, 
                            !1 !== a && (setTimeout(function() {
                                N.onKeyValidation.call(r, s, d, N);
                            }, 0), getMaskSet().writeOutBuffer && !1 !== d)) {
                                var g = getBuffer();
                                writeBuffer(r, g, l, e, !0 !== t);
                            }
                            if (e.preventDefault(), t) return !1 !== d && (d.forwardPosition = l), d;
                        }
                    },
                    pasteEvent: function pasteEvent(e) {
                        var t, a = this, n = e.originalEvent || e, i = (F(a), a.inputmask._valueGet(!0)), r = caret(a);
                        k && (t = r.end, r.end = r.begin, r.begin = t);
                        var o = i.substr(0, r.begin), s = i.substr(r.end, i.length);
                        if (o === (k ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, r.begin).join("") && (o = ""), 
                        s === (k ? getBufferTemplate().reverse() : getBufferTemplate()).slice(r.end).join("") && (s = ""), 
                        M.clipboardData && M.clipboardData.getData) i = o + M.clipboardData.getData("Text") + s; else {
                            if (!n.clipboardData || !n.clipboardData.getData) return !0;
                            i = o + n.clipboardData.getData("text/plain") + s;
                        }
                        var l = i;
                        if (F.isFunction(N.onBeforePaste)) {
                            if (!1 === (l = N.onBeforePaste.call(u, i, N))) return e.preventDefault();
                            l || (l = i);
                        }
                        return checkVal(a, !1, !1, l.toString().split("")), writeBuffer(a, getBuffer(), seekNext(getLastValidPosition()), e, m !== getBuffer().join("")), 
                        e.preventDefault();
                    },
                    inputFallBackEvent: function inputFallBackEvent(e) {
                        var n = this, t = n.inputmask._valueGet();
                        if (getBuffer().join("") !== t) {
                            var a = caret(n);
                            if (t = function ieMobileHandler(e, t, a) {
                                if (_) {
                                    var n = t.replace(getBuffer().join(""), "");
                                    if (1 === n.length) {
                                        var i = t.split("");
                                        i.splice(a.begin, 0, n), t = i.join("");
                                    }
                                }
                                return t;
                            }(0, t = function radixPointHandler(e, t, a) {
                                return "." === t.charAt(a.begin - 1) && "" !== N.radixPoint && ((t = t.split(""))[a.begin - 1] = N.radixPoint.charAt(0), 
                                t = t.join("")), t;
                            }(0, t, a), a), getBuffer().join("") !== t) {
                                var i = getBuffer().join(""), r = !N.numericInput && t.length > i.length ? -1 : 0, o = t.substr(0, a.begin), s = t.substr(a.begin), l = i.substr(0, a.begin + r), u = i.substr(a.begin + r), c = a, p = "", f = !1;
                                if (o !== l) {
                                    var d, g = (f = o.length >= l.length) ? o.length : l.length;
                                    for (d = 0; o.charAt(d) === l.charAt(d) && d < g; d++) ;
                                    f && (c.begin = d - r, p += o.slice(d, c.end));
                                }
                                if (s !== u && (s.length > u.length ? p += s.slice(0, 1) : s.length < u.length && (c.end += u.length - s.length, 
                                f || "" === N.radixPoint || "" !== s || o.charAt(c.begin + r - 1) !== N.radixPoint || (c.begin--, 
                                p = N.radixPoint))), writeBuffer(n, getBuffer(), {
                                    begin: c.begin + r,
                                    end: c.end + r
                                }), 0 < p.length) F.each(p.split(""), function(e, t) {
                                    var a = new F.Event("keypress");
                                    a.which = t.charCodeAt(0), h = !1, v.keypressEvent.call(n, a);
                                }); else {
                                    c.begin === c.end - 1 && (c.begin = seekPrevious(c.begin + 1), c.begin === c.end - 1 ? caret(n, c.begin) : caret(n, c.begin, c.end));
                                    var m = new F.Event("keydown");
                                    m.keyCode = N.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE, 
                                    v.keydownEvent.call(n, m);
                                }
                                e.preventDefault();
                            }
                        }
                    },
                    beforeInputEvent: function beforeInputEvent(e) {
                        if (e.cancelable) {
                            var n = this;
                            switch (e.inputType) {
                              case "insertText":
                                return F.each(e.data.split(""), function(e, t) {
                                    var a = new F.Event("keypress");
                                    a.which = t.charCodeAt(0), h = !1, v.keypressEvent.call(n, a);
                                }), e.preventDefault();

                              case "deleteContentBackward":
                                var t = new F.Event("keydown");
                                return t.keyCode = Inputmask.keyCode.BACKSPACE, v.keydownEvent.call(n, t), e.preventDefault();

                              case "deleteContentForward":
                                var t = new F.Event("keydown");
                                return t.keyCode = Inputmask.keyCode.DELETE, v.keydownEvent.call(n, t), e.preventDefault();
                            }
                        }
                    },
                    setValueEvent: function setValueEvent(e) {
                        this.inputmask.refreshValue = !1;
                        var t = e && e.detail ? e.detail[0] : arguments[1], t = t || this.inputmask._valueGet(!0);
                        F.isFunction(N.onBeforeMask) && (t = N.onBeforeMask.call(u, t, N) || t), checkVal(this, !0, !1, t = t.split("")), 
                        m = getBuffer().join(""), (N.clearMaskOnLostFocus || N.clearIncomplete) && this.inputmask._valueGet() === getBufferTemplate().join("") && this.inputmask._valueSet("");
                    },
                    focusEvent: function focusEvent(e) {
                        var t = this, a = t.inputmask._valueGet();
                        N.showMaskOnFocus && (!N.showMaskOnHover || N.showMaskOnHover && "" === a) && (t.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(t, getBuffer(), seekNext(getLastValidPosition())) : !1 === n && caret(t, seekNext(getLastValidPosition()))), 
                        !0 === N.positionCaretOnTab && !1 === n && v.clickEvent.apply(t, [ e, !0 ]), m = getBuffer().join("");
                    },
                    mouseleaveEvent: function mouseleaveEvent(e) {
                        n = !1, N.clearMaskOnLostFocus && S.activeElement !== this && HandleNativePlaceholder(this, r);
                    },
                    clickEvent: function clickEvent(e, u) {
                        var c = this;
                        setTimeout(function() {
                            if (S.activeElement === c) {
                                var e = caret(c);
                                if (u && (k ? e.end = e.begin : e.begin = e.end), e.begin === e.end) switch (N.positionCaretOnClick) {
                                  case "none":
                                    break;

                                  case "select":
                                    caret(c, 0, getBuffer().length);
                                    break;

                                  case "ignore":
                                    caret(c, seekNext(getLastValidPosition()));
                                    break;

                                  case "radixFocus":
                                    if (function doRadixFocus(e) {
                                        if ("" !== N.radixPoint) {
                                            var t = getMaskSet().validPositions;
                                            if (t[e] === V || t[e].input === getPlaceholder(e)) {
                                                if (e < seekNext(-1)) return !0;
                                                var a = F.inArray(N.radixPoint, getBuffer());
                                                if (-1 !== a) {
                                                    for (var n in t) if (a < n && t[n].input !== getPlaceholder(n)) return !1;
                                                    return !0;
                                                }
                                            }
                                        }
                                        return !1;
                                    }(e.begin)) {
                                        var t = getBuffer().join("").indexOf(N.radixPoint);
                                        caret(c, N.numericInput ? seekNext(t) : t);
                                        break;
                                    }

                                  default:
                                    var a = e.begin, n = getLastValidPosition(a, !0), i = seekNext(n);
                                    if (a < i) caret(c, isMask(a, !0) || isMask(a - 1, !0) ? a : seekNext(a)); else {
                                        var r = getMaskSet().validPositions[n], o = getTestTemplate(i, r ? r.match.locator : V, r), s = getPlaceholder(i, o.match);
                                        if ("" !== s && getBuffer()[i] !== s && !0 !== o.match.optionalQuantifier && !0 !== o.match.newBlockMarker || !isMask(i, N.keepStatic) && o.match.def === s) {
                                            var l = seekNext(i);
                                            (l <= a || a === i) && (i = l);
                                        }
                                        caret(c, i);
                                    }
                                }
                            }
                        }, 0);
                    },
                    cutEvent: function cutEvent(e) {
                        F(this);
                        var t = caret(this), a = e.originalEvent || e, n = M.clipboardData || a.clipboardData, i = k ? getBuffer().slice(t.end, t.begin) : getBuffer().slice(t.begin, t.end);
                        n.setData("text", k ? i.reverse().join("") : i.join("")), S.execCommand && S.execCommand("copy"), 
                        handleRemove(0, Inputmask.keyCode.DELETE, t), writeBuffer(this, getBuffer(), getMaskSet().p, e, m !== getBuffer().join(""));
                    },
                    blurEvent: function blurEvent(e) {
                        var t = F(this);
                        if (this.inputmask) {
                            HandleNativePlaceholder(this, r);
                            var a = this.inputmask._valueGet(), n = getBuffer().slice();
                            "" === a && f === V || (N.clearMaskOnLostFocus && (-1 === getLastValidPosition() && a === getBufferTemplate().join("") ? n = [] : clearOptionalTail(n)), 
                            !1 === isComplete(n) && (setTimeout(function() {
                                t.trigger("incomplete");
                            }, 0), N.clearIncomplete && (resetMaskSet(), n = N.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
                            writeBuffer(this, n, V, e)), m !== getBuffer().join("") && (m = n.join(""), t.trigger("change"));
                        }
                    },
                    mouseenterEvent: function mouseenterEvent(e) {
                        n = !0, S.activeElement !== this && N.showMaskOnHover && HandleNativePlaceholder(this, (k ? getBuffer().slice().reverse() : getBuffer()).join(""));
                    },
                    submitEvent: function submitEvent(e) {
                        m !== getBuffer().join("") && i.trigger("change"), N.clearMaskOnLostFocus && -1 === getLastValidPosition() && l.inputmask._valueGet && l.inputmask._valueGet() === getBufferTemplate().join("") && l.inputmask._valueSet(""), 
                        N.clearIncomplete && !1 === isComplete(getBuffer()) && l.inputmask._valueSet(""), 
                        N.removeMaskOnSubmit && (l.inputmask._valueSet(l.inputmask.unmaskedvalue(), !0), 
                        setTimeout(function() {
                            writeBuffer(l, getBuffer());
                        }, 0));
                    },
                    resetEvent: function resetEvent(e) {
                        l.inputmask.refreshValue = !0, setTimeout(function() {
                            i.trigger("setvalue");
                        }, 0);
                    }
                };
                function checkVal(i, e, r, t, a) {
                    var o = this || i.inputmask, s = t.slice(), l = "", u = -1, c = V;
                    if (resetMaskSet(), r || !0 === N.autoUnmask) u = seekNext(u); else {
                        var n = getBufferTemplate().slice(0, seekNext(-1)).join(""), p = s.join("").match(new RegExp("^" + Inputmask.escapeRegex(n), "g"));
                        p && 0 < p.length && (s.splice(0, p.length * n.length), u = seekNext(u));
                    }
                    -1 === u ? (getMaskSet().p = seekNext(u), u = 0) : getMaskSet().p = u, o.caretPos = {
                        begin: u
                    }, F.each(s, function(e, t) {
                        if (t !== V) if (getMaskSet().validPositions[e] === V && s[e] === getPlaceholder(e) && isMask(e, !0) && !1 === isValid(e, s[e], !0, V, V, !0)) getMaskSet().p++; else {
                            var a = new F.Event("_checkval");
                            a.which = t.charCodeAt(0), l += t;
                            var n = getLastValidPosition(V, !0);
                            !function isTemplateMatch(e, t) {
                                return -1 !== getMaskTemplate(!0, 0, !1).slice(e, seekNext(e)).join("").replace(/'/g, "").indexOf(t) && !isMask(e) && (getTest(e).match.nativeDef === t.charAt(0) || null === getTest(e).match.fn && getTest(e).match.nativeDef === "'" + t.charAt(0) || " " === getTest(e).match.nativeDef && (getTest(e + 1).match.nativeDef === t.charAt(0) || null === getTest(e + 1).match.fn && getTest(e + 1).match.nativeDef === "'" + t.charAt(0)));
                            }(u, l) ? (c = v.keypressEvent.call(i, a, !0, !1, r, o.caretPos.begin)) && (u = o.caretPos.begin + 1, 
                            l = "") : c = v.keypressEvent.call(i, a, !0, !1, r, n + 1), c && (writeBuffer(V, getBuffer(), c.forwardPosition, a, !1), 
                            o.caretPos = {
                                begin: c.forwardPosition,
                                end: c.forwardPosition
                            });
                        }
                    }), e && writeBuffer(i, getBuffer(), c ? c.forwardPosition : V, a || new F.Event("checkval"), a && "input" === a.type);
                }
                function unmaskedvalue(e) {
                    if (e) {
                        if (e.inputmask === V) return e.value;
                        e.inputmask && e.inputmask.refreshValue && v.setValueEvent.call(e);
                    }
                    var t = [], a = getMaskSet().validPositions;
                    for (var n in a) a[n].match && null != a[n].match.fn && t.push(a[n].input);
                    var i = 0 === t.length ? "" : (k ? t.reverse() : t).join("");
                    if (F.isFunction(N.onUnMask)) {
                        var r = (k ? getBuffer().slice().reverse() : getBuffer()).join("");
                        i = N.onUnMask.call(u, r, i, N);
                    }
                    return i;
                }
                function caret(e, t, a, n) {
                    function translatePosition(e) {
                        return !k || "number" != typeof e || N.greedy && "" === N.placeholder || !l || (e = l.inputmask._valueGet().length - e), 
                        e;
                    }
                    var i;
                    if (t === V) return "selectionStart" in e ? (t = e.selectionStart, a = e.selectionEnd) : M.getSelection ? (i = M.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== e && i.commonAncestorContainer !== e || (t = i.startOffset, 
                    a = i.endOffset) : S.selection && S.selection.createRange && (i = S.selection.createRange(), 
                    t = 0 - i.duplicate().moveStart("character", -e.inputmask._valueGet().length), a = t + i.text.length), 
                    {
                        begin: n ? t : translatePosition(t),
                        end: n ? a : translatePosition(a)
                    };
                    if (F.isArray(t) && (a = k ? t[0] : t[1], t = k ? t[1] : t[0]), t.begin !== V && (a = k ? t.begin : t.end, 
                    t = k ? t.end : t.begin), "number" == typeof t) {
                        t = n ? t : translatePosition(t), a = "number" == typeof (a = n ? a : translatePosition(a)) ? a : t;
                        var r = parseInt(((e.ownerDocument.defaultView || M).getComputedStyle ? (e.ownerDocument.defaultView || M).getComputedStyle(e, null) : e.currentStyle).fontSize) * a;
                        if (e.scrollLeft = r > e.scrollWidth ? r : 0, e.inputmask.caretPos = {
                            begin: t,
                            end: a
                        }, e === S.activeElement) {
                            if ("selectionStart" in e) e.selectionStart = t, e.selectionEnd = a; else if (M.getSelection) {
                                if (i = S.createRange(), e.firstChild === V || null === e.firstChild) {
                                    var o = S.createTextNode("");
                                    e.appendChild(o);
                                }
                                i.setStart(e.firstChild, t < e.inputmask._valueGet().length ? t : e.inputmask._valueGet().length), 
                                i.setEnd(e.firstChild, a < e.inputmask._valueGet().length ? a : e.inputmask._valueGet().length), 
                                i.collapse(!0);
                                var s = M.getSelection();
                                s.removeAllRanges(), s.addRange(i);
                            } else e.createTextRange && ((i = e.createTextRange()).collapse(!0), i.moveEnd("character", a), 
                            i.moveStart("character", t), i.select());
                            renderColorMask(e, {
                                begin: t,
                                end: a
                            });
                        }
                    }
                }
                function determineLastRequiredPosition(e) {
                    var t, a, n = getMaskTemplate(!0, getLastValidPosition(), !0, !0), i = n.length, r = getLastValidPosition(), o = {}, s = getMaskSet().validPositions[r], l = s !== V ? s.locator.slice() : V;
                    for (t = r + 1; t < n.length; t++) a = getTestTemplate(t, l, t - 1), l = a.locator.slice(), 
                    o[t] = F.extend(!0, {}, a);
                    var u = s && s.alternation !== V ? s.locator[s.alternation] : V;
                    for (t = i - 1; r < t && ((a = o[t]).match.optionality || a.match.optionalQuantifier && a.match.newBlockMarker || u && (u !== o[t].locator[s.alternation] && null != a.match.fn || null === a.match.fn && a.locator[s.alternation] && checkAlternationMatch(a.locator[s.alternation].toString().split(","), u.toString().split(",")) && "" !== getTests(t)[0].def)) && n[t] === getPlaceholder(t, a.match); t--) i--;
                    return e ? {
                        l: i,
                        def: o[i] ? o[i].match : V
                    } : i;
                }
                function clearOptionalTail(e) {
                    for (var t, a = getMaskTemplate(!(e.length = 0), 0, !0, V, !0); (t = a.shift()) !== V; ) e.push(t);
                    return e;
                }
                function isComplete(e) {
                    if (F.isFunction(N.isComplete)) return N.isComplete(e, N);
                    if ("*" === N.repeat) return V;
                    var t = !1, a = determineLastRequiredPosition(!0), n = seekPrevious(a.l);
                    if (a.def === V || a.def.newBlockMarker || a.def.optionality || a.def.optionalQuantifier) {
                        t = !0;
                        for (var i = 0; i <= n; i++) {
                            var r = getTestTemplate(i).match;
                            if (null !== r.fn && getMaskSet().validPositions[i] === V && !0 !== r.optionality && !0 !== r.optionalQuantifier || null === r.fn && e[i] !== getPlaceholder(i, r)) {
                                t = !1;
                                break;
                            }
                        }
                    }
                    return t;
                }
                function handleRemove(e, t, a, n, i) {
                    if ((N.numericInput || k) && (t === Inputmask.keyCode.BACKSPACE ? t = Inputmask.keyCode.DELETE : t === Inputmask.keyCode.DELETE && (t = Inputmask.keyCode.BACKSPACE), 
                    k)) {
                        var r = a.end;
                        a.end = a.begin, a.begin = r;
                    }
                    if (t === Inputmask.keyCode.BACKSPACE && a.end - a.begin < 1 ? (a.begin = seekPrevious(a.begin), 
                    getMaskSet().validPositions[a.begin] !== V && getMaskSet().validPositions[a.begin].input === N.groupSeparator && a.begin--) : t === Inputmask.keyCode.DELETE && a.begin === a.end && (a.end = isMask(a.end, !0) && getMaskSet().validPositions[a.end] && getMaskSet().validPositions[a.end].input !== N.radixPoint ? a.end + 1 : seekNext(a.end) + 1, 
                    getMaskSet().validPositions[a.begin] !== V && getMaskSet().validPositions[a.begin].input === N.groupSeparator && a.end++), 
                    revalidateMask(a), !0 !== n && !1 !== N.keepStatic || null !== N.regex) {
                        var o = alternate(!0);
                        if (o) {
                            var s = o.caret !== V ? o.caret : o.pos ? seekNext(o.pos.begin ? o.pos.begin : o.pos) : getLastValidPosition(-1, !0);
                            (t !== Inputmask.keyCode.DELETE || a.begin > s) && a.begin;
                        }
                    }
                    var l = getLastValidPosition(a.begin, !0);
                    if (l < a.begin || -1 === a.begin) getMaskSet().p = seekNext(l); else if (!0 !== n && (getMaskSet().p = a.begin, 
                    !0 !== i)) for (;getMaskSet().p < l && getMaskSet().validPositions[getMaskSet().p] === V; ) getMaskSet().p++;
                }
                function initializeColorMask(u) {
                    var c = (u.ownerDocument.defaultView || M).getComputedStyle(u, null), e = S.createElement("div");
                    e.style.width = c.width, e.style.textAlign = c.textAlign, f = S.createElement("div"), 
                    (u.inputmask.colorMask = f).className = "im-colormask", u.parentNode.insertBefore(f, u), 
                    u.parentNode.removeChild(u), f.appendChild(u), f.appendChild(e), u.style.left = e.offsetLeft + "px", 
                    F(f).on("mouseleave", function(e) {
                        return v.mouseleaveEvent.call(u, [ e ]);
                    }), F(f).on("mouseenter", function(e) {
                        return v.mouseenterEvent.call(u, [ e ]);
                    }), F(f).on("click", function(e) {
                        return caret(u, function findCaretPos(e) {
                            var t, a = S.createElement("span");
                            for (var n in c) isNaN(n) && -1 !== n.indexOf("font") && (a.style[n] = c[n]);
                            a.style.textTransform = c.textTransform, a.style.letterSpacing = c.letterSpacing, 
                            a.style.position = "absolute", a.style.height = "auto", a.style.width = "auto", 
                            a.style.visibility = "hidden", a.style.whiteSpace = "nowrap", S.body.appendChild(a);
                            var i, r = u.inputmask._valueGet(), o = 0;
                            for (t = 0, i = r.length; t <= i; t++) {
                                if (a.innerHTML += r.charAt(t) || "_", a.offsetWidth >= e) {
                                    var s = e - o, l = a.offsetWidth - e;
                                    a.innerHTML = r.charAt(t), s -= a.offsetWidth / 3, t = s < l ? t - 1 : t;
                                    break;
                                }
                                o = a.offsetWidth;
                            }
                            return S.body.removeChild(a), t;
                        }(e.clientX)), v.clickEvent.call(u, [ e ]);
                    });
                }
                function renderColorMask(e, t, a) {
                    var n, i, r, o = [], s = !1, l = 0;
                    function setEntry(e) {
                        if (e === V && (e = ""), s || null !== n.fn && i.input !== V) if (s && (null !== n.fn && i.input !== V || "" === n.def)) {
                            s = !1;
                            var t = o.length;
                            o[t - 1] = o[t - 1] + "</span>", o.push(e);
                        } else o.push(e); else s = !0, o.push("<span class='im-static'>" + e);
                    }
                    if (f !== V) {
                        var u = getBuffer();
                        if (t === V ? t = caret(e) : t.begin === V && (t = {
                            begin: t,
                            end: t
                        }), !0 !== a) {
                            for (var c = getLastValidPosition(); getMaskSet().validPositions[l] ? (i = getMaskSet().validPositions[l], 
                            n = i.match, r = i.locator.slice(), setEntry(u[l])) : (i = getTestTemplate(l, r, l - 1), 
                            n = i.match, r = i.locator.slice(), !1 === N.jitMasking || l < c || "number" == typeof N.jitMasking && isFinite(N.jitMasking) && N.jitMasking > l ? setEntry(getPlaceholder(l, n)) : s = !1), 
                            l++, (g === V || l < g) && (null !== n.fn || "" !== n.def) || l < c || s; ) ;
                            s && setEntry(), function setCaret() {
                                S.activeElement === e && (o.splice(t.begin, 0, t.begin === t.end || t.end > getMaskSet().maskLength ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">'), 
                                o.splice(t.end + 1, 0, "</mark>"));
                            }();
                        }
                        var p = f.getElementsByTagName("div")[0];
                        p.innerHTML = o.join(""), e.inputmask.positionColorMask(e, p);
                    }
                }
                if (Inputmask.prototype.positionColorMask = function(e, t) {
                    e.style.left = t.offsetLeft + "px";
                }, e !== V) switch (e.action) {
                  case "isComplete":
                    return l = e.el, isComplete(getBuffer());

                  case "unmaskedvalue":
                    return l !== V && e.value === V || (a = e.value, a = (F.isFunction(N.onBeforeMask) && N.onBeforeMask.call(u, a, N) || a).split(""), 
                    checkVal.call(this, V, !1, !1, a), F.isFunction(N.onBeforeWrite) && N.onBeforeWrite.call(u, V, getBuffer(), 0, N)), 
                    unmaskedvalue(l);

                  case "mask":
                    !function mask(e) {
                        function isElementTypeSupported(e, r) {
                            function patchValueProperty(e) {
                                var t, a, n;
                                function patchValhook(e) {
                                    if (F.valHooks && (F.valHooks[e] === V || !0 !== F.valHooks[e].inputmaskpatch)) {
                                        var a = F.valHooks[e] && F.valHooks[e].get ? F.valHooks[e].get : function(e) {
                                            return e.value;
                                        }, i = F.valHooks[e] && F.valHooks[e].set ? F.valHooks[e].set : function(e, t) {
                                            return e.value = t, e;
                                        };
                                        F.valHooks[e] = {
                                            get: function get(e) {
                                                if (e.inputmask) {
                                                    if (e.inputmask.opts.autoUnmask) return e.inputmask.unmaskedvalue();
                                                    var t = a(e);
                                                    return -1 !== getLastValidPosition(V, V, e.inputmask.maskset.validPositions) || !0 !== r.nullable ? t : "";
                                                }
                                                return a(e);
                                            },
                                            set: function set(e, t) {
                                                var a, n = F(e);
                                                return a = i(e, t), e.inputmask && n.trigger("setvalue", [ t ]), a;
                                            },
                                            inputmaskpatch: !0
                                        };
                                    }
                                }
                                function getter() {
                                    return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== r.nullable ? S.activeElement === this && r.clearMaskOnLostFocus ? (k ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : t.call(this) : "" : t.call(this);
                                }
                                function setter(e) {
                                    a.call(this, e), this.inputmask && F(this).trigger("setvalue", [ e ]);
                                }
                                if (!e.inputmask.__valueGet) {
                                    if (!0 !== r.noValuePatching) {
                                        if (Object.getOwnPropertyDescriptor) {
                                            "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === T("test".__proto__) ? function(e) {
                                                return e.__proto__;
                                            } : function(e) {
                                                return e.constructor.prototype;
                                            });
                                            var i = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), "value") : V;
                                            i && i.get && i.set ? (t = i.get, a = i.set, Object.defineProperty(e, "value", {
                                                get: getter,
                                                set: setter,
                                                configurable: !0
                                            })) : "INPUT" !== e.tagName && (t = function valueGet() {
                                                return this.textContent;
                                            }, a = function valueSet(e) {
                                                this.textContent = e;
                                            }, Object.defineProperty(e, "value", {
                                                get: getter,
                                                set: setter,
                                                configurable: !0
                                            }));
                                        } else S.__lookupGetter__ && e.__lookupGetter__("value") && (t = e.__lookupGetter__("value"), 
                                        a = e.__lookupSetter__("value"), e.__defineGetter__("value", getter), e.__defineSetter__("value", setter));
                                        e.inputmask.__valueGet = t, e.inputmask.__valueSet = a;
                                    }
                                    e.inputmask._valueGet = function(e) {
                                        return k && !0 !== e ? t.call(this.el).split("").reverse().join("") : t.call(this.el);
                                    }, e.inputmask._valueSet = function(e, t) {
                                        a.call(this.el, null === e || e === V ? "" : !0 !== t && k ? e.split("").reverse().join("") : e);
                                    }, t === V && (t = function valueGet() {
                                        return this.value;
                                    }, a = function valueSet(e) {
                                        this.value = e;
                                    }, patchValhook(e.type), n = e, s.on(n, "mouseenter", function(e) {
                                        var t = F(this), a = this.inputmask._valueGet();
                                        a !== getBuffer().join("") && t.trigger("setvalue");
                                    }));
                                }
                            }
                            var t = e.getAttribute("type"), a = "INPUT" === e.tagName && -1 !== F.inArray(t, r.supportsInputType) || e.isContentEditable || "TEXTAREA" === e.tagName;
                            if (!a) if ("INPUT" === e.tagName) {
                                var n = S.createElement("input");
                                n.setAttribute("type", t), a = "text" === n.type, n = null;
                            } else a = "partial";
                            return !1 !== a ? patchValueProperty(e) : e.inputmask = V, a;
                        }
                        s.off(e);
                        var t = isElementTypeSupported(e, N);
                        if (!1 !== t && (i = F(l = e), r = l.placeholder, -1 === (g = l !== V ? l.maxLength : V) && (g = V), 
                        !0 === N.colorMask && initializeColorMask(l), P && ("inputmode" in l && (l.inputmode = N.inputmode, 
                        l.setAttribute("inputmode", N.inputmode)), !0 === N.disablePredictiveText && ("autocorrect" in l ? l.autocorrect = !1 : (!0 !== N.colorMask && initializeColorMask(l), 
                        l.type = "password"))), !0 === t && (l.setAttribute("im-insert", N.insertMode), 
                        s.on(l, "submit", v.submitEvent), s.on(l, "reset", v.resetEvent), s.on(l, "blur", v.blurEvent), 
                        s.on(l, "focus", v.focusEvent), !0 !== N.colorMask && (s.on(l, "click", v.clickEvent), 
                        s.on(l, "mouseleave", v.mouseleaveEvent), s.on(l, "mouseenter", v.mouseenterEvent)), 
                        s.on(l, "paste", v.pasteEvent), s.on(l, "cut", v.cutEvent), s.on(l, "complete", N.oncomplete), 
                        s.on(l, "incomplete", N.onincomplete), s.on(l, "cleared", N.oncleared), P || !0 === N.inputEventOnly ? l.removeAttribute("maxLength") : (s.on(l, "keydown", v.keydownEvent), 
                        s.on(l, "keypress", v.keypressEvent)), s.on(l, "input", v.inputFallBackEvent), s.on(l, "beforeinput", v.beforeInputEvent)), 
                        s.on(l, "setvalue", v.setValueEvent), m = getBufferTemplate().join(""), "" !== l.inputmask._valueGet(!0) || !1 === N.clearMaskOnLostFocus || S.activeElement === l)) {
                            var a = F.isFunction(N.onBeforeMask) && N.onBeforeMask.call(u, l.inputmask._valueGet(!0), N) || l.inputmask._valueGet(!0);
                            "" !== a && checkVal(l, !0, !1, a.split(""));
                            var n = getBuffer().slice();
                            m = n.join(""), !1 === isComplete(n) && N.clearIncomplete && resetMaskSet(), N.clearMaskOnLostFocus && S.activeElement !== l && (-1 === getLastValidPosition() ? n = [] : clearOptionalTail(n)), 
                            (!1 === N.clearMaskOnLostFocus || N.showMaskOnFocus && S.activeElement === l || "" !== l.inputmask._valueGet(!0)) && writeBuffer(l, n), 
                            S.activeElement === l && caret(l, seekNext(getLastValidPosition()));
                        }
                    }(l);
                    break;

                  case "format":
                    return a = (F.isFunction(N.onBeforeMask) && N.onBeforeMask.call(u, e.value, N) || e.value).split(""), 
                    checkVal.call(this, V, !0, !1, a), e.metadata ? {
                        value: k ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                        metadata: maskScope.call(this, {
                            action: "getmetadata"
                        }, t, N)
                    } : k ? getBuffer().slice().reverse().join("") : getBuffer().join("");

                  case "isValid":
                    e.value ? (a = e.value.split(""), checkVal.call(this, V, !0, !0, a)) : e.value = getBuffer().join("");
                    for (var p = getBuffer(), d = determineLastRequiredPosition(), y = p.length - 1; d < y && !isMask(y); y--) ;
                    return p.splice(d, y + 1 - d), isComplete(p) && e.value === getBuffer().join("");

                  case "getemptymask":
                    return getBufferTemplate().join("");

                  case "remove":
                    return l && l.inputmask && (F.data(l, "_inputmask_opts", null), i = F(l), l.inputmask._valueSet(N.autoUnmask ? unmaskedvalue(l) : l.inputmask._valueGet(!0)), 
                    s.off(l), l.inputmask.colorMask && ((f = l.inputmask.colorMask).removeChild(l), 
                    f.parentNode.insertBefore(l, f), f.parentNode.removeChild(f)), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(l), "value") && l.inputmask.__valueGet && Object.defineProperty(l, "value", {
                        get: l.inputmask.__valueGet,
                        set: l.inputmask.__valueSet,
                        configurable: !0
                    }) : S.__lookupGetter__ && l.__lookupGetter__("value") && l.inputmask.__valueGet && (l.__defineGetter__("value", l.inputmask.__valueGet), 
                    l.__defineSetter__("value", l.inputmask.__valueSet)), l.inputmask = V), l;

                  case "getmetadata":
                    if (F.isArray(t.metadata)) {
                        var b = getMaskTemplate(!0, 0, !1).join("");
                        return F.each(t.metadata, function(e, t) {
                            if (t.mask === b) return b = t, !1;
                        }), b;
                    }
                    return t.metadata;
                }
            }
            return Inputmask.prototype = {
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
                    oncomplete: F.noop,
                    onincomplete: F.noop,
                    oncleared: F.noop,
                    repeat: 0,
                    greedy: !1,
                    autoUnmask: !1,
                    removeMaskOnSubmit: !1,
                    clearMaskOnLostFocus: !0,
                    insertMode: !0,
                    clearIncomplete: !1,
                    alias: null,
                    onKeyDown: F.noop,
                    onBeforeMask: null,
                    onBeforePaste: function onBeforePaste(e, t) {
                        return F.isFunction(t.onBeforeMask) ? t.onBeforeMask.call(this, e, t) : e;
                    },
                    onBeforeWrite: null,
                    onUnMask: null,
                    showMaskOnFocus: !0,
                    showMaskOnHover: !0,
                    onKeyValidation: F.noop,
                    skipOptionalPartCharacter: " ",
                    numericInput: !1,
                    rightAlign: !1,
                    undoOnEscape: !0,
                    radixPoint: "",
                    _radixDance: !1,
                    groupSeparator: "",
                    keepStatic: null,
                    positionCaretOnTab: !0,
                    tabThrough: !1,
                    supportsInputType: [ "text", "tel", "password", "search" ],
                    ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
                    isComplete: null,
                    preValidation: null,
                    postValidation: null,
                    staticDefinitionSymbol: V,
                    jitMasking: !1,
                    nullable: !0,
                    inputEventOnly: !1,
                    noValuePatching: !1,
                    positionCaretOnClick: "lvp",
                    casing: null,
                    inputmode: "verbatim",
                    colorMask: !1,
                    disablePredictiveText: !1,
                    importDataAttributes: !0,
                    shiftPositions: !0
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
                    var i = this;
                    return "string" == typeof e && (e = S.getElementById(e) || S.querySelectorAll(e)), 
                    e = e.nodeName ? [ e ] : e, F.each(e, function(e, t) {
                        var a = F.extend(!0, {}, i.opts);
                        if (function importAttributeOptions(a, e, n, i) {
                            if (!0 === e.importDataAttributes) {
                                var t, r, o, s, l = function importOption(e, t) {
                                    null !== (t = t !== V ? t : a.getAttribute(i + "-" + e)) && ("string" == typeof t && (0 === e.indexOf("on") ? t = M[t] : "false" === t ? t = !1 : "true" === t && (t = !0)), 
                                    n[e] = t);
                                }, u = a.getAttribute(i);
                                if (u && "" !== u && (u = u.replace(/'/g, '"'), r = JSON.parse("{" + u + "}")), 
                                r) for (s in o = V, r) if ("alias" === s.toLowerCase()) {
                                    o = r[s];
                                    break;
                                }
                                for (t in l("alias", o), n.alias && resolveAlias(n.alias, n, e), e) {
                                    if (r) for (s in o = V, r) if (s.toLowerCase() === t.toLowerCase()) {
                                        o = r[s];
                                        break;
                                    }
                                    l(t, o);
                                }
                            }
                            return F.extend(!0, e, n), ("rtl" === a.dir || e.rightAlign) && (a.style.textAlign = "right"), 
                            ("rtl" === a.dir || e.numericInput) && (a.dir = "ltr", a.removeAttribute("dir"), 
                            e.isRTL = !0), Object.keys(n).length;
                        }(t, a, F.extend(!0, {}, i.userOptions), i.dataAttribute)) {
                            var n = generateMaskSet(a, i.noMasksCache);
                            n !== V && (t.inputmask !== V && (t.inputmask.opts.autoUnmask = !0, t.inputmask.remove()), 
                            t.inputmask = new Inputmask(V, V, !0), t.inputmask.opts = a, t.inputmask.noMasksCache = i.noMasksCache, 
                            t.inputmask.userOptions = F.extend(!0, {}, i.userOptions), t.inputmask.isRTL = a.isRTL || a.numericInput, 
                            (t.inputmask.el = t).inputmask.maskset = n, F.data(t, "_inputmask_opts", a), maskScope.call(t.inputmask, {
                                action: "mask"
                            }));
                        }
                    }), e && e[0] && e[0].inputmask || this;
                },
                option: function option(e, t) {
                    return "string" == typeof e ? this.opts[e] : "object" === (void 0 === e ? "undefined" : T(e)) ? (F.extend(this.userOptions, e), 
                    this.el && !0 !== t && this.mask(this.el), this) : void 0;
                },
                unmaskedvalue: function unmaskedvalue(e) {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                    maskScope.call(this, {
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
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                    maskScope.call(this, {
                        action: "getemptymask"
                    });
                },
                hasMaskedValue: function hasMaskedValue() {
                    return !this.opts.autoUnmask;
                },
                isComplete: function isComplete() {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                    maskScope.call(this, {
                        action: "isComplete"
                    });
                },
                getmetadata: function getmetadata() {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                    maskScope.call(this, {
                        action: "getmetadata"
                    });
                },
                isValid: function isValid(e) {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                    maskScope.call(this, {
                        action: "isValid",
                        value: e
                    });
                },
                format: function format(e, t) {
                    return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                    maskScope.call(this, {
                        action: "format",
                        value: e,
                        metadata: t
                    });
                },
                setValue: function setValue(e) {
                    this.el && F(this.el).trigger("setvalue", [ e ]);
                },
                analyseMask: function analyseMask(e, r, o) {
                    var t, a, n, i, s, l, u = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, c = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, p = !1, f = new MaskToken(), d = [], g = [];
                    function MaskToken(e, t, a, n) {
                        this.matches = [], this.openGroup = e || !1, this.alternatorGroup = !1, this.isGroup = e || !1, 
                        this.isOptional = t || !1, this.isQuantifier = a || !1, this.isAlternator = n || !1, 
                        this.quantifier = {
                            min: 1,
                            max: 1
                        };
                    }
                    function insertTestDefinition(a, e, n) {
                        n = n !== V ? n : a.matches.length;
                        var i = a.matches[n - 1];
                        if (r) 0 === e.indexOf("[") || p && /\\d|\\s|\\w]/i.test(e) || "." === e ? a.matches.splice(n++, 0, {
                            fn: new RegExp(e, o.casing ? "i" : ""),
                            optionality: !1,
                            newBlockMarker: i === V ? "master" : i.def !== e,
                            casing: null,
                            def: e,
                            placeholder: V,
                            nativeDef: e
                        }) : (p && (e = e[e.length - 1]), F.each(e.split(""), function(e, t) {
                            i = a.matches[n - 1], a.matches.splice(n++, 0, {
                                fn: null,
                                optionality: !1,
                                newBlockMarker: i === V ? "master" : i.def !== t && null !== i.fn,
                                casing: null,
                                def: o.staticDefinitionSymbol || t,
                                placeholder: o.staticDefinitionSymbol !== V ? t : V,
                                nativeDef: (p ? "'" : "") + t
                            });
                        })), p = !1; else {
                            var t = (o.definitions ? o.definitions[e] : V) || Inputmask.prototype.definitions[e];
                            t && !p ? a.matches.splice(n++, 0, {
                                fn: t.validator ? "string" == typeof t.validator ? new RegExp(t.validator, o.casing ? "i" : "") : new function() {
                                    this.test = t.validator;
                                }() : new RegExp("."),
                                optionality: !1,
                                newBlockMarker: i === V ? "master" : i.def !== (t.definitionSymbol || e),
                                casing: t.casing,
                                def: t.definitionSymbol || e,
                                placeholder: t.placeholder,
                                nativeDef: e
                            }) : (a.matches.splice(n++, 0, {
                                fn: null,
                                optionality: !1,
                                newBlockMarker: i === V ? "master" : i.def !== e && null !== i.fn,
                                casing: null,
                                def: o.staticDefinitionSymbol || e,
                                placeholder: o.staticDefinitionSymbol !== V ? e : V,
                                nativeDef: (p ? "'" : "") + e
                            }), p = !1);
                        }
                    }
                    function defaultCase() {
                        if (0 < d.length) {
                            if (insertTestDefinition(i = d[d.length - 1], a), i.isAlternator) {
                                s = d.pop();
                                for (var e = 0; e < s.matches.length; e++) s.matches[e].isGroup && (s.matches[e].isGroup = !1);
                                0 < d.length ? (i = d[d.length - 1]).matches.push(s) : f.matches.push(s);
                            }
                        } else insertTestDefinition(f, a);
                    }
                    function groupify(e) {
                        var t = new MaskToken(!0);
                        return t.openGroup = !1, t.matches = e, t;
                    }
                    for (r && (o.optionalmarker[0] = V, o.optionalmarker[1] = V); t = r ? c.exec(e) : u.exec(e); ) {
                        if (a = t[0], r) switch (a.charAt(0)) {
                          case "?":
                            a = "{0,1}";
                            break;

                          case "+":
                          case "*":
                            a = "{" + a + "}";
                        }
                        if (p) defaultCase(); else switch (a.charAt(0)) {
                          case "(?=":
                          case "(?!":
                          case "(?<=":
                          case "(?<!":
                            break;

                          case o.escapeChar:
                            p = !0, r && defaultCase();
                            break;

                          case o.optionalmarker[1]:
                          case o.groupmarker[1]:
                            if ((n = d.pop()).openGroup = !1, n !== V) if (0 < d.length) {
                                if ((i = d[d.length - 1]).matches.push(n), i.isAlternator) {
                                    s = d.pop();
                                    for (var m = 0; m < s.matches.length; m++) s.matches[m].isGroup = !1, s.matches[m].alternatorGroup = !1;
                                    0 < d.length ? (i = d[d.length - 1]).matches.push(s) : f.matches.push(s);
                                }
                            } else f.matches.push(n); else defaultCase();
                            break;

                          case o.optionalmarker[0]:
                            d.push(new MaskToken(!1, !0));
                            break;

                          case o.groupmarker[0]:
                            d.push(new MaskToken(!0));
                            break;

                          case o.quantifiermarker[0]:
                            var k = new MaskToken(!1, !1, !0), h = (a = a.replace(/[{}]/g, "")).split("|"), v = h[0].split(","), y = isNaN(v[0]) ? v[0] : parseInt(v[0]), b = 1 === v.length ? y : isNaN(v[1]) ? v[1] : parseInt(v[1]);
                            "*" !== y && "+" !== y || (y = "*" === b ? 0 : 1), k.quantifier = {
                                min: y,
                                max: b,
                                jit: h[1]
                            };
                            var M = 0 < d.length ? d[d.length - 1].matches : f.matches;
                            if ((t = M.pop()).isAlternator) {
                                M.push(t), M = t.matches;
                                var S = new MaskToken(!0), x = M.pop();
                                M.push(S), M = S.matches, t = x;
                            }
                            t.isGroup || (t = groupify([ t ])), M.push(t), M.push(k);
                            break;

                          case o.alternatormarker:
                            var P = function groupQuantifier(e) {
                                var t = e.pop();
                                return t.isQuantifier && (t = groupify([ e.pop(), t ])), t;
                            };
                            if (0 < d.length) {
                                var _ = (i = d[d.length - 1]).matches[i.matches.length - 1];
                                l = i.openGroup && (_.matches === V || !1 === _.isGroup && !1 === _.isAlternator) ? d.pop() : P(i.matches);
                            } else l = P(f.matches);
                            if (l.isAlternator) d.push(l); else if (l.alternatorGroup ? (s = d.pop(), l.alternatorGroup = !1) : s = new MaskToken(!1, !1, !1, !0), 
                            s.matches.push(l), d.push(s), l.openGroup) {
                                var E = new MaskToken(!(l.openGroup = !1));
                                E.alternatorGroup = !0, d.push(E);
                            }
                            break;

                          default:
                            defaultCase();
                        }
                    }
                    for (;0 < d.length; ) n = d.pop(), f.matches.push(n);
                    return 0 < f.matches.length && (function verifyGroupMarker(n) {
                        n && n.matches && F.each(n.matches, function(e, t) {
                            var a = n.matches[e + 1];
                            (a === V || a.matches === V || !1 === a.isQuantifier) && t && t.isGroup && (t.isGroup = !1, 
                            r || (insertTestDefinition(t, o.groupmarker[0], 0), !0 !== t.openGroup && insertTestDefinition(t, o.groupmarker[1]))), 
                            verifyGroupMarker(t);
                        });
                    }(f), g.push(f)), (o.numericInput || o.isRTL) && function reverseTokens(e) {
                        for (var t in e.matches = e.matches.reverse(), e.matches) if (e.matches.hasOwnProperty(t)) {
                            var a = parseInt(t);
                            if (e.matches[t].isQuantifier && e.matches[a + 1] && e.matches[a + 1].isGroup) {
                                var n = e.matches[t];
                                e.matches.splice(t, 1), e.matches.splice(a + 1, 0, n);
                            }
                            e.matches[t].matches !== V ? e.matches[t] = reverseTokens(e.matches[t]) : e.matches[t] = ((i = e.matches[t]) === o.optionalmarker[0] ? i = o.optionalmarker[1] : i === o.optionalmarker[1] ? i = o.optionalmarker[0] : i === o.groupmarker[0] ? i = o.groupmarker[1] : i === o.groupmarker[1] && (i = o.groupmarker[0]), 
                            i);
                        }
                        var i;
                        return e;
                    }(g[0]), g;
                }
            }, Inputmask.extendDefaults = function(e) {
                F.extend(!0, Inputmask.prototype.defaults, e);
            }, Inputmask.extendDefinitions = function(e) {
                F.extend(!0, Inputmask.prototype.definitions, e);
            }, Inputmask.extendAliases = function(e) {
                F.extend(!0, Inputmask.prototype.aliases, e);
            }, Inputmask.format = function(e, t, a) {
                return Inputmask(t).format(e, a);
            }, Inputmask.unmask = function(e, t) {
                return Inputmask(t).unmaskedvalue(e);
            }, Inputmask.isValid = function(e, t) {
                return Inputmask(t).isValid(e);
            }, Inputmask.remove = function(e) {
                "string" == typeof e && (e = S.getElementById(e) || S.querySelectorAll(e)), e = e.nodeName ? [ e ] : e, 
                F.each(e, function(e, t) {
                    t.inputmask && t.inputmask.remove();
                });
            }, Inputmask.setValue = function(e, a) {
                "string" == typeof e && (e = S.getElementById(e) || S.querySelectorAll(e)), e = e.nodeName ? [ e ] : e, 
                F.each(e, function(e, t) {
                    t.inputmask ? t.inputmask.setValue(a) : F(t).trigger("setvalue", [ a ]);
                });
            }, Inputmask.escapeRegex = function(e) {
                return e.replace(new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ].join("|\\") + ")", "gim"), "\\$1");
            }, Inputmask.keyCode = {
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
            }, Inputmask.dependencyLib = F, M.Inputmask = Inputmask;
        }(a(3), a(4));
    }, function(e, t, a) {
        "use strict";
        var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        }, n = a(4), f = n.document;
        function isWindow(e) {
            return null != e && e === e.window;
        }
        function isValidElement(e) {
            return e instanceof Element;
        }
        function DependencyLib(e) {
            return e instanceof DependencyLib ? e : this instanceof DependencyLib ? void (null != e && e !== n && (this[0] = e.nodeName ? e : void 0 !== e[0] && e[0].nodeName ? e[0] : f.querySelector(e), 
            void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(e);
        }
        DependencyLib.prototype = {
            on: function on(e, a) {
                if (isValidElement(this[0])) for (var t = function addEvent(e, t) {
                    i.addEventListener ? i.addEventListener(e, a, !1) : i.attachEvent && i.attachEvent("on" + e, a), 
                    n[e] = n[e] || {}, n[e][t] = n[e][t] || [], n[e][t].push(a);
                }, n = this[0].eventRegistry, i = this[0], r = e.split(" "), o = 0; o < r.length; o++) {
                    var s = r[o].split(".");
                    t(s[0], s[1] || "global");
                }
                return this;
            },
            off: function off(e, s) {
                if (isValidElement(this[0])) for (var t = function removeEvent(e, t, a) {
                    if (e in l == !0) if (i.removeEventListener ? i.removeEventListener(e, a, !1) : i.detachEvent && i.detachEvent("on" + e, a), 
                    "global" === t) for (var n in l[e]) l[e][n].splice(l[e][n].indexOf(a), 1); else l[e][t].splice(l[e][t].indexOf(a), 1);
                }, a = function resolveNamespace(e, t) {
                    var a, n, i = [];
                    if (0 < e.length) if (void 0 === s) for (a = 0, n = l[e][t].length; a < n; a++) i.push({
                        ev: e,
                        namespace: t && 0 < t.length ? t : "global",
                        handler: l[e][t][a]
                    }); else i.push({
                        ev: e,
                        namespace: t && 0 < t.length ? t : "global",
                        handler: s
                    }); else if (0 < t.length) for (var r in l) for (var o in l[r]) if (o === t) if (void 0 === s) for (a = 0, 
                    n = l[r][o].length; a < n; a++) i.push({
                        ev: r,
                        namespace: o,
                        handler: l[r][o][a]
                    }); else i.push({
                        ev: r,
                        namespace: o,
                        handler: s
                    });
                    return i;
                }, l = this[0].eventRegistry, i = this[0], n = e.split(" "), r = 0; r < n.length; r++) for (var o = n[r].split("."), u = a(o[0], o[1]), c = 0, p = u.length; c < p; c++) t(u[c].ev, u[c].namespace, u[c].handler);
                return this;
            },
            trigger: function trigger(e) {
                if (isValidElement(this[0])) for (var t = this[0].eventRegistry, a = this[0], n = "string" == typeof e ? e.split(" ") : [ e.type ], i = 0; i < n.length; i++) {
                    var r = n[i].split("."), o = r[0], s = r[1] || "global";
                    if (void 0 !== f && "global" === s) {
                        var l, u, c = {
                            bubbles: !0,
                            cancelable: !0,
                            detail: arguments[1]
                        };
                        if (f.createEvent) {
                            try {
                                l = new CustomEvent(o, c);
                            } catch (e) {
                                (l = f.createEvent("CustomEvent")).initCustomEvent(o, c.bubbles, c.cancelable, c.detail);
                            }
                            e.type && DependencyLib.extend(l, e), a.dispatchEvent(l);
                        } else (l = f.createEventObject()).eventType = o, l.detail = arguments[1], e.type && DependencyLib.extend(l, e), 
                        a.fireEvent("on" + l.eventType, l);
                    } else if (void 0 !== t[o]) if (e = e.type ? e : DependencyLib.Event(e), "global" === s) for (var p in t[o]) for (u = 0; u < t[o][p].length; u++) t[o][p][u].apply(a, arguments); else for (u = 0; u < t[o][s].length; u++) t[o][s][u].apply(a, arguments);
                }
                return this;
            }
        }, DependencyLib.isFunction = function(e) {
            return "function" == typeof e;
        }, DependencyLib.noop = function() {}, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function(e, t, a) {
            return null == t ? -1 : function indexOf(e, t) {
                for (var a = 0, n = e.length; a < n; a++) if (e[a] === t) return a;
                return -1;
            }(t, e);
        }, DependencyLib.valHooks = void 0, DependencyLib.isPlainObject = function(e) {
            return "object" === (void 0 === e ? "undefined" : c(e)) && !e.nodeType && !isWindow(e) && !(e.constructor && !Object.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf"));
        }, DependencyLib.extend = function() {
            var e, t, a, n, i, r, o = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
            for ("boolean" == typeof o && (u = o, o = arguments[s] || {}, s++), "object" === (void 0 === o ? "undefined" : c(o)) || DependencyLib.isFunction(o) || (o = {}), 
            s === l && (o = this, s--); s < l; s++) if (null != (e = arguments[s])) for (t in e) a = o[t], 
            o !== (n = e[t]) && (u && n && (DependencyLib.isPlainObject(n) || (i = DependencyLib.isArray(n))) ? (r = i ? (i = !1, 
            a && DependencyLib.isArray(a) ? a : []) : a && DependencyLib.isPlainObject(a) ? a : {}, 
            o[t] = DependencyLib.extend(u, r, n)) : void 0 !== n && (o[t] = n));
            return o;
        }, DependencyLib.each = function(e, t) {
            var a = 0;
            if (function isArraylike(e) {
                var t = "length" in e && e.length, a = void 0 === e ? "undefined" : c(e);
                return "function" !== a && !isWindow(e) && (!(1 !== e.nodeType || !t) || "array" === a || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
            }(e)) for (var n = e.length; a < n && !1 !== t.call(e[a], a, e[a]); a++) ; else for (a in e) if (!1 === t.call(e[a], a, e[a])) break;
            return e;
        }, DependencyLib.data = function(e, t, a) {
            if (void 0 === a) return e.__data ? e.__data[t] : null;
            e.__data = e.__data || {}, e.__data[t] = a;
        }, "function" == typeof n.CustomEvent ? DependencyLib.Event = n.CustomEvent : (DependencyLib.Event = function(e, t) {
            t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var a = f.createEvent("CustomEvent");
            return a.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), a;
        }).prototype = n.Event.prototype, e.exports = DependencyLib;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __WEBPACK_AMD_DEFINE_RESULT__, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        __WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window;
        }.call(exports, __webpack_require__, exports, module), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }, function(e, t, a) {
        "use strict";
        var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        }, s = a(2), l = s.dependencyLib, c = {
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
        }, n = {
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };
        function getTokenizer(e) {
            if (!e.tokenizer) {
                var t = [];
                for (var a in c) -1 === t.indexOf(a[0]) && t.push(a[0]);
                e.tokenizer = "(" + t.join("+|") + ")+?|.", e.tokenizer = new RegExp(e.tokenizer, "g");
            }
            return e.tokenizer;
        }
        function parse(e, t, a, n) {
            for (var i, r = ""; i = getTokenizer(a).exec(e); ) {
                if (void 0 === t) if (c[i[0]]) r += "(" + c[i[0]][0] + ")"; else switch (i[0]) {
                  case "[":
                    r += "(";
                    break;

                  case "]":
                    r += ")?";
                    break;

                  default:
                    r += s.escapeRegex(i[0]);
                } else if (c[i[0]]) if (!0 !== n && c[i[0]][3]) r += c[i[0]][3].call(t.date); else c[i[0]][2] ? r += t["raw" + c[i[0]][2]] : r += i[0]; else r += i[0];
            }
            return r;
        }
        function pad(e, t) {
            for (e = String(e), t = t || 2; e.length < t; ) e = "0" + e;
            return e;
        }
        function analyseMask(e, t, r) {
            var o, a, n, i = {
                date: new Date(1, 0, 1)
            }, s = e;
            function setValue(e, t, a) {
                e[o] = function extendProperty(e) {
                    var t = e.replace(/[^0-9]/g, "0");
                    if (t != e) {
                        var a = e.replace(/[^0-9]/g, ""), n = (r.min && r.min[o] || e).toString(), i = (r.max && r.max[o] || e).toString();
                        t = a + (a < n.slice(0, a.length) ? n.slice(a.length) : a > i.slice(0, a.length) ? i.slice(a.length) : t.toString().slice(a.length));
                    }
                    return t;
                }(t), e["raw" + o] = t, void 0 !== n && n.call(e.date, "month" == o ? parseInt(e[o]) - 1 : e[o]);
            }
            if ("string" == typeof s) {
                for (;a = getTokenizer(r).exec(t); ) {
                    var l = s.slice(0, a[0].length);
                    c.hasOwnProperty(a[0]) && (c[a[0]][0], o = c[a[0]][2], n = c[a[0]][1], setValue(i, l)), 
                    s = s.slice(l.length);
                }
                return i;
            }
            if (s && "object" === (void 0 === s ? "undefined" : u(s)) && s.hasOwnProperty("date")) return s;
        }
        s.extendAliases({
            datetime: {
                mask: function mask(e) {
                    return c.S = e.i18n.ordinalSuffix.join("|"), e.inputFormat = n[e.inputFormat] || e.inputFormat, 
                    e.displayFormat = n[e.displayFormat] || e.displayFormat || e.inputFormat, e.outputFormat = n[e.outputFormat] || e.outputFormat || e.inputFormat, 
                    e.placeholder = "" !== e.placeholder ? e.placeholder : e.inputFormat.replace(/[\[\]]/, ""), 
                    e.regex = parse(e.inputFormat, void 0, e), null;
                },
                placeholder: "",
                inputFormat: "isoDateTime",
                displayFormat: void 0,
                outputFormat: void 0,
                min: null,
                max: null,
                i18n: {
                    dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                    monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    ordinalSuffix: [ "st", "nd", "rd", "th" ]
                },
                postValidation: function postValidation(e, t, a, n) {
                    n.min = analyseMask(n.min, n.inputFormat, n), n.max = analyseMask(n.max, n.inputFormat, n);
                    var i = a, r = analyseMask(e.join(""), n.inputFormat, n);
                    return i && r.date.getTime() == r.date.getTime() && (i = (i = function isValidDate(e, t) {
                        return (!isFinite(e.rawday) || "29" == e.day && !isFinite(e.rawyear) || new Date(e.date.getFullYear(), isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1, 0).getDate() >= e.day) && t;
                    }(r, i)) && function isDateInRange(e, t) {
                        var a = !0;
                        if (t.min) {
                            if (e.rawyear) {
                                var n = e.rawyear.replace(/[^0-9]/g, "");
                                a = t.min.year.substr(0, n.length) <= n;
                            }
                            e.year === e.rawyear && t.min.date.getTime() == t.min.date.getTime() && (a = t.min.date.getTime() <= e.date.getTime());
                        }
                        return a && t.max && t.max.date.getTime() == t.max.date.getTime() && (a = t.max.date.getTime() >= e.date.getTime()), 
                        a;
                    }(r, n)), t && i && a.pos !== t ? {
                        buffer: parse(n.inputFormat, r, n),
                        refreshFromBuffer: {
                            start: t,
                            end: a.pos
                        }
                    } : i;
                },
                onKeyDown: function onKeyDown(e, t, a, n) {
                    if (e.ctrlKey && e.keyCode === s.keyCode.RIGHT) {
                        for (var i, r = new Date(), o = ""; i = getTokenizer(n).exec(n.inputFormat); ) "d" === i[0].charAt(0) ? o += pad(r.getDate(), i[0].length) : "m" === i[0].charAt(0) ? o += pad(r.getMonth() + 1, i[0].length) : "yyyy" === i[0] ? o += r.getFullYear().toString() : "y" === i[0].charAt(0) && (o += pad(r.getYear(), i[0].length));
                        this.inputmask._valueSet(o), l(this).trigger("setvalue");
                    }
                },
                onUnMask: function onUnMask(e, t, a) {
                    return parse(a.outputFormat, analyseMask(e, a.inputFormat, a), a, !0);
                },
                casing: function casing(e, t, a, n) {
                    return 0 == t.nativeDef.indexOf("[ap]") ? e.toLowerCase() : 0 == t.nativeDef.indexOf("[AP]") ? e.toUpperCase() : e;
                },
                insertMode: !1,
                shiftPositions: !1
            }
        }), e.exports = s;
    }, function(e, t, a) {
        "use strict";
        var k = a(2), h = k.dependencyLib;
        function autoEscape(e, t) {
            for (var a = "", n = 0; n < e.length; n++) k.prototype.definitions[e.charAt(n)] || t.definitions[e.charAt(n)] || t.optionalmarker.start === e.charAt(n) || t.optionalmarker.end === e.charAt(n) || t.quantifiermarker.start === e.charAt(n) || t.quantifiermarker.end === e.charAt(n) || t.groupmarker.start === e.charAt(n) || t.groupmarker.end === e.charAt(n) || t.alternatormarker === e.charAt(n) ? a += "\\" + e.charAt(n) : a += e.charAt(n);
            return a;
        }
        k.extendAliases({
            numeric: {
                mask: function mask(e) {
                    if (0 !== e.repeat && isNaN(e.integerDigits) && (e.integerDigits = e.repeat), e.repeat = 0, 
                    e.groupSeparator === e.radixPoint && e.digits && "0" !== e.digits && ("." === e.radixPoint ? e.groupSeparator = "," : "," === e.radixPoint ? e.groupSeparator = "." : e.groupSeparator = ""), 
                    " " === e.groupSeparator && (e.skipOptionalPartCharacter = void 0), e.autoGroup = e.autoGroup && "" !== e.groupSeparator, 
                    e.autoGroup && ("string" == typeof e.groupSize && isFinite(e.groupSize) && (e.groupSize = parseInt(e.groupSize)), 
                    isFinite(e.integerDigits))) {
                        var t = Math.floor(e.integerDigits / e.groupSize), a = e.integerDigits % e.groupSize;
                        e.integerDigits = parseInt(e.integerDigits) + (0 === a ? t - 1 : t), e.integerDigits < 1 && (e.integerDigits = "*");
                    }
                    1 < e.placeholder.length && (e.placeholder = e.placeholder.charAt(0)), "radixFocus" === e.positionCaretOnClick && "" === e.placeholder && !1 === e.integerOptional && (e.positionCaretOnClick = "lvp"), 
                    e.definitions[";"] = e.definitions["~"], e.definitions[";"].definitionSymbol = "~", 
                    !0 === e.numericInput && (e.positionCaretOnClick = "radixFocus" === e.positionCaretOnClick ? "lvp" : e.positionCaretOnClick, 
                    e.digitsOptional = !1, isNaN(e.digits) && (e.digits = 2), e.decimalProtect = !1);
                    var mask = "[+]";
                    if (mask += autoEscape(e.prefix, e), !0 === e.integerOptional ? mask += "~{1," + e.integerDigits + "}" : mask += "~{" + e.integerDigits + "}", 
                    void 0 !== e.digits) {
                        var n = e.decimalProtect ? ":" : e.radixPoint, i = e.digits.toString().split(",");
                        isFinite(i[0]) && i[1] && isFinite(i[1]) ? mask += n + ";{" + e.digits + "}" : (isNaN(e.digits) || 0 < parseInt(e.digits)) && (e.digitsOptional ? mask += "[" + n + ";{1," + e.digits + "}]" : mask += n + ";{" + e.digits + "}");
                    }
                    return mask += autoEscape(e.suffix, e), mask += "[-]", e.greedy = !1, mask;
                },
                placeholder: "",
                greedy: !1,
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                groupSize: 3,
                groupSeparator: "",
                autoGroup: !1,
                allowMinus: !0,
                negationSymbol: {
                    front: "-",
                    back: ""
                },
                integerDigits: "+",
                integerOptional: !0,
                prefix: "",
                suffix: "",
                rightAlign: !0,
                decimalProtect: !0,
                min: null,
                max: null,
                step: 1,
                insertMode: !0,
                autoUnmask: !1,
                unmaskAsNumber: !1,
                inputType: "text",
                inputmode: "numeric",
                preValidation: function preValidation(e, t, a, n, i, r) {
                    if ("-" === a || a === i.negationSymbol.front) return !0 === i.allowMinus && (i.isNegative = void 0 === i.isNegative || !i.isNegative, 
                    "" === e.join("") || {
                        caret: r.validPositions[t] ? t : void 0,
                        dopost: !0
                    });
                    if (!1 === n && a === i.radixPoint && void 0 !== i.digits && (isNaN(i.digits) || 0 < parseInt(i.digits))) {
                        var o = h.inArray(i.radixPoint, e);
                        if (-1 !== o && void 0 !== r.validPositions[o]) return !0 === i.numericInput ? t === o : {
                            caret: o + 1
                        };
                    }
                    return !0;
                },
                postValidation: function postValidation(e, t, a, n) {
                    var i = n.suffix.split(""), r = n.prefix.split("");
                    if (void 0 === a.pos && void 0 !== a.caret && !0 !== a.dopost) return a;
                    var o = void 0 !== a.caret ? a.caret : a.pos, s = e.slice();
                    n.numericInput && (o = s.length - o - 1, s = s.reverse());
                    var l = s[o];
                    if (l === n.groupSeparator && (l = s[o += 1]), o === s.length - n.suffix.length - 1 && l === n.radixPoint) return a;
                    void 0 !== l && l !== n.radixPoint && l !== n.negationSymbol.front && l !== n.negationSymbol.back && (s[o] = "?", 
                    0 < n.prefix.length && o >= (!1 === n.isNegative ? 1 : 0) && o < n.prefix.length - 1 + (!1 === n.isNegative ? 1 : 0) ? r[o - (!1 === n.isNegative ? 1 : 0)] = "?" : 0 < n.suffix.length && o >= s.length - n.suffix.length - (!1 === n.isNegative ? 1 : 0) && (i[o - (s.length - n.suffix.length - (!1 === n.isNegative ? 1 : 0))] = "?")), 
                    r = r.join(""), i = i.join("");
                    var u = s.join("").replace(r, "");
                    if (u = (u = (u = (u = u.replace(i, "")).replace(new RegExp(k.escapeRegex(n.groupSeparator), "g"), "")).replace(new RegExp("[-" + k.escapeRegex(n.negationSymbol.front) + "]", "g"), "")).replace(new RegExp(k.escapeRegex(n.negationSymbol.back) + "$"), ""), 
                    isNaN(n.placeholder) && (u = u.replace(new RegExp(k.escapeRegex(n.placeholder), "g"), "")), 
                    1 < u.length && 1 !== u.indexOf(n.radixPoint) && ("0" === l && (u = u.replace(/^\?/g, "")), 
                    u = u.replace(/^0/g, "")), u.charAt(0) === n.radixPoint && "" !== n.radixPoint && !0 !== n.numericInput && (u = "0" + u), 
                    "" !== u) {
                        if (u = u.split(""), (!n.digitsOptional || n.enforceDigitsOnBlur && "blur" === a.event) && isFinite(n.digits)) {
                            var c = h.inArray(n.radixPoint, u), p = h.inArray(n.radixPoint, s);
                            -1 === c && (u.push(n.radixPoint), c = u.length - 1);
                            for (var f = 1; f <= n.digits; f++) n.digitsOptional && (!n.enforceDigitsOnBlur || "blur" !== a.event) || void 0 !== u[c + f] && u[c + f] !== n.placeholder.charAt(0) ? -1 !== p && void 0 !== s[p + f] && (u[c + f] = u[c + f] || s[p + f]) : u[c + f] = a.placeholder || n.placeholder.charAt(0);
                        }
                        if (!0 !== n.autoGroup || "" === n.groupSeparator || l === n.radixPoint && void 0 === a.pos && !a.dopost) u = u.join(""); else {
                            var d = u[u.length - 1] === n.radixPoint && a.c === n.radixPoint;
                            u = k(function buildPostMask(e, t) {
                                var a = "";
                                if (a += "(" + t.groupSeparator + "*{" + t.groupSize + "}){*}", "" !== t.radixPoint) {
                                    var n = e.join("").split(t.radixPoint);
                                    n[1] && (a += t.radixPoint + "*{" + n[1].match(/^\d*\??\d*/)[0].length + "}");
                                }
                                return a;
                            }(u, n), {
                                numericInput: !0,
                                jitMasking: !0,
                                definitions: {
                                    "*": {
                                        validator: "[0-9?]",
                                        cardinality: 1
                                    }
                                }
                            }).format(u.join("")), d && (u += n.radixPoint), u.charAt(0) === n.groupSeparator && u.substr(1);
                        }
                    }
                    if (n.isNegative && "blur" === a.event && (n.isNegative = "0" !== u), u = r + u, 
                    u += i, n.isNegative && (u = n.negationSymbol.front + u, u += n.negationSymbol.back), 
                    u = u.split(""), void 0 !== l) if (l !== n.radixPoint && l !== n.negationSymbol.front && l !== n.negationSymbol.back) -1 < (o = h.inArray("?", u)) ? u[o] = l : o = a.caret || 0; else if (l === n.radixPoint || l === n.negationSymbol.front || l === n.negationSymbol.back) {
                        var g = h.inArray(l, u);
                        -1 !== g && (o = g);
                    }
                    n.numericInput && (o = u.length - o - 1, u = u.reverse());
                    var m = {
                        caret: void 0 !== l && void 0 === a.pos || void 0 === o ? o : o + (n.numericInput ? -1 : 1),
                        buffer: u,
                        refreshFromBuffer: a.dopost || e.join("") !== u.join("")
                    };
                    return m.refreshFromBuffer ? m : a;
                },
                onBeforeWrite: function onBeforeWrite(e, t, a, n) {
                    if (e) switch (e.type) {
                      case "keydown":
                        return n.postValidation(t, a, {
                            caret: a,
                            dopost: !0
                        }, n);

                      case "blur":
                      case "checkval":
                        var i;
                        if (function parseMinMaxOptions(e) {
                            void 0 === e.parseMinMaxOptions && (null !== e.min && (e.min = e.min.toString().replace(new RegExp(k.escapeRegex(e.groupSeparator), "g"), ""), 
                            "," === e.radixPoint && (e.min = e.min.replace(e.radixPoint, ".")), e.min = isFinite(e.min) ? parseFloat(e.min) : NaN, 
                            isNaN(e.min) && (e.min = Number.MIN_VALUE)), null !== e.max && (e.max = e.max.toString().replace(new RegExp(k.escapeRegex(e.groupSeparator), "g"), ""), 
                            "," === e.radixPoint && (e.max = e.max.replace(e.radixPoint, ".")), e.max = isFinite(e.max) ? parseFloat(e.max) : NaN, 
                            isNaN(e.max) && (e.max = Number.MAX_VALUE)), e.parseMinMaxOptions = "done");
                        }(n), null !== n.min || null !== n.max) {
                            if (i = n.onUnMask(t.join(""), void 0, h.extend({}, n, {
                                unmaskAsNumber: !0
                            })), null !== n.min && i < n.min) return n.isNegative = n.min < 0, n.postValidation(n.min.toString().replace(".", n.radixPoint).split(""), a, {
                                caret: a,
                                dopost: !0,
                                placeholder: "0"
                            }, n);
                            if (null !== n.max && i > n.max) return n.isNegative = n.max < 0, n.postValidation(n.max.toString().replace(".", n.radixPoint).split(""), a, {
                                caret: a,
                                dopost: !0,
                                placeholder: "0"
                            }, n);
                        }
                        return n.postValidation(t, a, {
                            caret: a,
                            placeholder: "0",
                            event: "blur"
                        }, n);

                      case "_checkval":
                        return {
                            caret: a
                        };
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
                        validator: function validator(e, t, a, n, i, r) {
                            var o;
                            if ("k" === e || "m" === e) {
                                o = {
                                    insert: [],
                                    c: 0
                                };
                                for (var s = 0, l = "k" === e ? 2 : 5; s < l; s++) o.insert.push({
                                    pos: a + s,
                                    c: 0
                                });
                                return o.pos = a + l, o;
                            }
                            if (!0 === (o = n ? new RegExp("[0-9" + k.escapeRegex(i.groupSeparator) + "]").test(e) : new RegExp("[0-9]").test(e))) {
                                if (!0 !== i.numericInput && void 0 !== t.validPositions[a] && "~" === t.validPositions[a].match.def && !r) {
                                    var u = t.buffer.join(""), c = (u = (u = u.replace(new RegExp("[-" + k.escapeRegex(i.negationSymbol.front) + "]", "g"), "")).replace(new RegExp(k.escapeRegex(i.negationSymbol.back) + "$"), "")).split(i.radixPoint);
                                    1 < c.length && (c[1] = c[1].replace(/0/g, i.placeholder.charAt(0))), "0" === c[0] && (c[0] = c[0].replace(/0/g, i.placeholder.charAt(0))), 
                                    u = c[0] + i.radixPoint + c[1] || "";
                                    var p = t._buffer.join("");
                                    for (u === i.radixPoint && (u = p); null === u.match(k.escapeRegex(p) + "$"); ) p = p.slice(1);
                                    o = void 0 === (u = (u = u.replace(p, "")).split(""))[a] ? {
                                        pos: a,
                                        remove: a
                                    } : {
                                        pos: a
                                    };
                                }
                            } else n || e !== i.radixPoint || void 0 !== t.validPositions[a - 1] || (o = {
                                insert: {
                                    pos: a,
                                    c: 0
                                },
                                pos: a + 1
                            });
                            return o;
                        },
                        cardinality: 1
                    },
                    "+": {
                        validator: function validator(e, t, a, n, i) {
                            return i.allowMinus && ("-" === e || e === i.negationSymbol.front);
                        },
                        cardinality: 1,
                        placeholder: ""
                    },
                    "-": {
                        validator: function validator(e, t, a, n, i) {
                            return i.allowMinus && e === i.negationSymbol.back;
                        },
                        cardinality: 1,
                        placeholder: ""
                    },
                    ":": {
                        validator: function validator(e, t, a, n, i) {
                            var r = "[" + k.escapeRegex(i.radixPoint) + "]", o = new RegExp(r).test(e);
                            return o && t.validPositions[a] && t.validPositions[a].match.placeholder === i.radixPoint && (o = {
                                caret: a + 1
                            }), o;
                        },
                        cardinality: 1,
                        placeholder: function placeholder(e) {
                            return e.radixPoint;
                        }
                    }
                },
                onUnMask: function onUnMask(e, t, a) {
                    if ("" === t && !0 === a.nullable) return t;
                    var n = e.replace(a.prefix, "");
                    return n = (n = n.replace(a.suffix, "")).replace(new RegExp(k.escapeRegex(a.groupSeparator), "g"), ""), 
                    "" !== a.placeholder.charAt(0) && (n = n.replace(new RegExp(a.placeholder.charAt(0), "g"), "0")), 
                    a.unmaskAsNumber ? ("" !== a.radixPoint && -1 !== n.indexOf(a.radixPoint) && (n = n.replace(k.escapeRegex.call(this, a.radixPoint), ".")), 
                    n = (n = n.replace(new RegExp("^" + k.escapeRegex(a.negationSymbol.front)), "-")).replace(new RegExp(k.escapeRegex(a.negationSymbol.back) + "$"), ""), 
                    Number(n)) : n;
                },
                isComplete: function isComplete(e, t) {
                    var a = (t.numericInput ? e.slice().reverse() : e).join("");
                    return a = (a = (a = (a = (a = a.replace(new RegExp("^" + k.escapeRegex(t.negationSymbol.front)), "-")).replace(new RegExp(k.escapeRegex(t.negationSymbol.back) + "$"), "")).replace(t.prefix, "")).replace(t.suffix, "")).replace(new RegExp(k.escapeRegex(t.groupSeparator) + "([0-9]{3})", "g"), "$1"), 
                    "," === t.radixPoint && (a = a.replace(k.escapeRegex(t.radixPoint), ".")), isFinite(a);
                },
                onBeforeMask: function onBeforeMask(e, t) {
                    t.isNegative = void 0;
                    var a = t.radixPoint || ",";
                    "number" != typeof e && "number" !== t.inputType || "" === a || (e = e.toString().replace(".", a));
                    var n = e.split(a), i = n[0].replace(/[^\-0-9]/g, ""), r = 1 < n.length ? n[1].replace(/[^0-9]/g, "") : "";
                    e = i + ("" !== r ? a + r : r);
                    var o = 0;
                    if ("" !== a && (o = r.length, "" !== r)) {
                        var s = Math.pow(10, o || 1);
                        isFinite(t.digits) && (o = parseInt(t.digits), s = Math.pow(10, o)), e = e.replace(k.escapeRegex(a), "."), 
                        isFinite(e) && (e = Math.round(parseFloat(e) * s) / s), e = e.toString().replace(".", a);
                    }
                    return 0 === t.digits && -1 !== e.indexOf(k.escapeRegex(a)) && (e = e.substring(0, e.indexOf(k.escapeRegex(a)))), 
                    function alignDigits(e, t, a) {
                        if (0 < t) {
                            var n = h.inArray(a.radixPoint, e);
                            -1 === n && (e.push(a.radixPoint), n = e.length - 1);
                            for (var i = 1; i <= t; i++) e[n + i] = e[n + i] || "0";
                        }
                        return e;
                    }(e.toString().split(""), o, t).join("");
                },
                onKeyDown: function onKeyDown(e, t, a, n) {
                    var i = h(this);
                    if (e.ctrlKey) switch (e.keyCode) {
                      case k.keyCode.UP:
                        i.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(n.step)), i.trigger("setvalue");
                        break;

                      case k.keyCode.DOWN:
                        i.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(n.step)), i.trigger("setvalue");
                    }
                }
            },
            currency: {
                prefix: "$ ",
                groupSeparator: ",",
                alias: "numeric",
                placeholder: "0",
                autoGroup: !0,
                digits: 2,
                digitsOptional: !1,
                clearMaskOnLostFocus: !1
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
                digitsOptional: !0,
                radixPoint: ".",
                placeholder: "0",
                autoGroup: !1,
                min: 0,
                max: 100,
                suffix: " %",
                allowMinus: !1
            }
        }), e.exports = k;
    } ]);
});
//# sourceMappingURL=inputmask.js.map