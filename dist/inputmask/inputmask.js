/*!
 * dist/inputmask/inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2018 Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 5.0.0-beta.29
 */
!function webpackUniversalModuleDefinition(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var n = t();
        for (var a in n) ("object" == typeof exports ? exports : e)[a] = n[a];
    }
}(window, function() {
    return function(n) {
        var a = {};
        function __webpack_require__(e) {
            if (a[e]) return a[e].exports;
            var t = a[e] = {
                i: e,
                l: !1,
                exports: {}
            };
            return n[e].call(t.exports, t, t.exports, __webpack_require__), t.l = !0, t.exports;
        }
        return __webpack_require__.m = n, __webpack_require__.c = a, __webpack_require__.d = function(e, t, n) {
            __webpack_require__.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
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
            var n = Object.create(null);
            if (__webpack_require__.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t) for (var a in t) __webpack_require__.d(n, a, function(e) {
                return t[e];
            }.bind(null, a));
            return n;
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
    }([ function(e, t, n) {
        "use strict";
        var a, i, r, T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        i = [ n(1), n(2) ], void 0 === (r = "function" == typeof (a = function(N, M, G) {
            var S = M.document, e = navigator.userAgent, _ = 0 < e.indexOf("MSIE ") || 0 < e.indexOf("Trident/"), P = isInputEventSupported("touchstart"), E = /iemobile/i.test(e), x = /iphone/i.test(e) && !E;
            function Inputmask(e, t, n) {
                if (!(this instanceof Inputmask)) return new Inputmask(e, t, n);
                this.el = G, this.events = {}, this.maskset = G, !(this.refreshValue = !1) !== n && (N.isPlainObject(e) ? t = e : (t = t || {}, 
                e && (t.alias = e)), this.opts = N.extend(!0, {}, this.defaults, t), this.noMasksCache = t && t.definitions !== G, 
                this.userOptions = t || {}, this.isRTL = this.opts.numericInput, resolveAlias(this.opts.alias, t, this.opts));
            }
            function resolveAlias(e, t, n) {
                var a = Inputmask.prototype.aliases[e];
                return a ? (a.alias && resolveAlias(a.alias, G, n), N.extend(!0, n, a), N.extend(!0, n, t), 
                !0) : (null === n.mask && (n.mask = e), !1);
            }
            function generateMaskSet(n, o) {
                function generateMask(e, t, n) {
                    var a = !1;
                    if (null !== e && "" !== e || (a = null !== n.regex, e = a ? (e = n.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (a = !0, 
                    ".*")), 1 === e.length && !1 === n.greedy && 0 !== n.repeat && (n.placeholder = ""), 
                    0 < n.repeat || "*" === n.repeat || "+" === n.repeat) {
                        var i = "*" === n.repeat ? 0 : "+" === n.repeat ? 1 : n.repeat;
                        e = n.groupmarker[0] + e + n.groupmarker[1] + n.quantifiermarker[0] + i + "," + n.repeat + n.quantifiermarker[1];
                    }
                    var r, s = a ? "regex_" + n.regex : n.numericInput ? e.split("").reverse().join("") : e;
                    return Inputmask.prototype.masksCache[s] === G || !0 === o ? (r = {
                        mask: e,
                        maskToken: Inputmask.prototype.analyseMask(e, a, n),
                        validPositions: {},
                        _buffer: G,
                        buffer: G,
                        tests: {},
                        excludes: {},
                        metadata: t,
                        maskLength: G
                    }, !0 !== o && (Inputmask.prototype.masksCache[s] = r, r = N.extend(!0, {}, Inputmask.prototype.masksCache[s]))) : r = N.extend(!0, {}, Inputmask.prototype.masksCache[s]), 
                    r;
                }
                if (N.isFunction(n.mask) && (n.mask = n.mask(n)), N.isArray(n.mask)) {
                    if (1 < n.mask.length) {
                        if (null === n.keepStatic) {
                            n.keepStatic = "auto";
                            for (var e = 0; e < n.mask.length; e++) if (n.mask[e].charAt(0) !== n.mask[0].charAt(0)) {
                                n.keepStatic = !0;
                                break;
                            }
                        }
                        var a = n.groupmarker[0];
                        return N.each(n.isRTL ? n.mask.reverse() : n.mask, function(e, t) {
                            1 < a.length && (a += n.groupmarker[1] + n.alternatormarker + n.groupmarker[0]), 
                            t.mask === G || N.isFunction(t.mask) ? a += t : a += t.mask;
                        }), generateMask(a += n.groupmarker[1], n.mask, n);
                    }
                    n.mask = n.mask.pop();
                }
                return n.mask && n.mask.mask !== G && !N.isFunction(n.mask.mask) ? generateMask(n.mask.mask, n.mask, n) : generateMask(n.mask, n.mask, n);
            }
            function isInputEventSupported(e) {
                var t = S.createElement("input"), n = "on" + e, a = n in t;
                return a || (t.setAttribute(n, "return;"), a = "function" == typeof t[n]), t = null, 
                a;
            }
            function maskScope(e, t, V) {
                t = t || this.maskset, V = V || this.opts;
                var d, i, m, p, r, u = this, l = this.el, g = this.isRTL, s = !1, c = !1, h = !1, a = !1;
                function getMaskTemplate(e, t, n, a, i) {
                    var r = V.greedy;
                    i && (V.greedy = !1), t = t || 0;
                    var s, o, l, u = [], c = 0;
                    getLastValidPosition();
                    do {
                        if (!0 === e && getMaskSet().validPositions[c]) l = i && !0 === getMaskSet().validPositions[c].match.optionality && getMaskSet().validPositions[c + 1] === G && (!0 === getMaskSet().validPositions[c].generatedInput || getMaskSet().validPositions[c].input == V.skipOptionalPartCharacter && 0 < c) ? determineTestTemplate(c, getTests(c, s, c - 1)) : getMaskSet().validPositions[c], 
                        o = l.match, s = l.locator.slice(), u.push(!0 === n ? l.input : !1 === n ? o.nativeDef : getPlaceholder(c, o)); else {
                            l = getTestTemplate(c, s, c - 1), o = l.match, s = l.locator.slice();
                            var f = !0 !== a && (!1 !== V.jitMasking ? V.jitMasking : o.jit);
                            (!1 === f || f === G || "number" == typeof f && isFinite(f) && c < f) && u.push(!1 === n ? o.nativeDef : getPlaceholder(c, o));
                        }
                        "auto" === V.keepStatic && o.newBlockMarker && null !== o.fn && (V.keepStatic = c - 1), 
                        c++;
                    } while ((m === G || c < m) && (null !== o.fn || "" !== o.def) || c < t);
                    return "" === u[u.length - 1] && u.pop(), !1 === n && getMaskSet().maskLength !== G || (getMaskSet().maskLength = c - 1), 
                    V.greedy = r, u;
                }
                function getMaskSet() {
                    return t;
                }
                function resetMaskSet(e) {
                    var t = getMaskSet();
                    t.buffer = G, !0 !== e && (t.validPositions = {}, t.p = 0);
                }
                function getLastValidPosition(e, t, n) {
                    var a = -1, i = -1, r = n || getMaskSet().validPositions;
                    for (var s in e === G && (e = -1), r) {
                        var o = parseInt(s);
                        r[o] && (t || !0 !== r[o].generatedInput) && (o <= e && (a = o), e <= o && (i = o));
                    }
                    return -1 === a || a == e ? i : -1 == i ? a : e - a < i - e ? a : i;
                }
                function getDecisionTaker(e) {
                    var t = e.locator[e.alternation];
                    return "string" == typeof t && 0 < t.length && (t = t.split(",")[0]), t !== G ? t.toString() : "";
                }
                function getLocator(e, t) {
                    var n = (e.alternation != G ? e.mloc[getDecisionTaker(e)] : e.locator).join("");
                    if ("" !== n) for (;n.length < t; ) n += "0";
                    return n;
                }
                function determineTestTemplate(e, t) {
                    for (var n, a, i, r = getTest(e = 0 < e ? e - 1 : 0), s = getLocator(r), o = 0; o < t.length; o++) {
                        var l = t[o];
                        n = getLocator(l, s.length);
                        var u = Math.abs(n - s);
                        (a === G || "" !== n && u < a || i && i.match.optionality && "master" === i.match.newBlockMarker && (!l.match.optionality || !l.match.newBlockMarker) || i && i.match.optionalQuantifier && !l.match.optionalQuantifier) && (a = u, 
                        i = l);
                    }
                    return i;
                }
                function getTestTemplate(e, t, n) {
                    return getMaskSet().validPositions[e] || determineTestTemplate(e, getTests(e, t ? t.slice() : t, n));
                }
                function getTest(e, t) {
                    return getMaskSet().validPositions[e] ? getMaskSet().validPositions[e] : (t || getTests(e))[0];
                }
                function positionCanMatchDefinition(e, t) {
                    for (var n = !1, a = getTests(e), i = 0; i < a.length; i++) if (a[i].match && a[i].match.def === t) {
                        n = !0;
                        break;
                    }
                    return n;
                }
                function getTests(A, e, t) {
                    var O, n = getMaskSet().maskToken, D = e ? t : 0, a = e ? e.slice() : [ 0 ], L = [], I = !1, j = e ? e.join("") : "";
                    function resolveTestFromToken(w, B, e, t) {
                        function handleMatch(e, t, n) {
                            function isFirstMatch(n, a) {
                                var i = 0 === N.inArray(n, a.matches);
                                return i || N.each(a.matches, function(e, t) {
                                    if (!0 === t.isQuantifier ? i = isFirstMatch(n, a.matches[e - 1]) : t.hasOwnProperty("matches") && (i = isFirstMatch(n, t)), 
                                    i) return !1;
                                }), i;
                            }
                            function resolveNdxInitializer(e, i, r) {
                                var s, o;
                                if ((getMaskSet().tests[e] || getMaskSet().validPositions[e]) && N.each(getMaskSet().tests[e] || [ getMaskSet().validPositions[e] ], function(e, t) {
                                    if (t.mloc[i]) return s = t, !1;
                                    var n = r !== G ? r : t.alternation, a = t.locator[n] !== G ? t.locator[n].toString().indexOf(i) : -1;
                                    (o === G || a < o) && -1 !== a && (s = t, o = a);
                                }), s) {
                                    var t = s.locator[s.alternation], n = s.mloc[i] || s.mloc[t] || s.locator;
                                    return n.slice((r !== G ? r : s.alternation) + 1);
                                }
                                return r !== G ? resolveNdxInitializer(e, i) : G;
                            }
                            function isSubsetOf(e, t) {
                                function expand(e) {
                                    for (var t, n, a = [], i = 0, r = e.length; i < r; i++) if ("-" === e.charAt(i)) for (n = e.charCodeAt(i + 1); ++t < n; ) a.push(String.fromCharCode(t)); else t = e.charCodeAt(i), 
                                    a.push(e.charAt(i));
                                    return a.join("");
                                }
                                return V.regex && null !== e.match.fn && null !== t.match.fn ? -1 !== expand(t.match.def.replace(/[\[\]]/g, "")).indexOf(expand(e.match.def.replace(/[\[\]]/g, ""))) : e.match.def === t.match.nativeDef;
                            }
                            function setMergeLocators(e, t) {
                                if (t === G || e.alternation === t.alternation && -1 === e.locator[e.alternation].toString().indexOf(t.locator[t.alternation])) {
                                    e.mloc = e.mloc || {};
                                    var n = e.locator[e.alternation];
                                    if (n !== G) {
                                        if ("string" == typeof n && (n = n.split(",")[0]), e.mloc[n] === G && (e.mloc[n] = e.locator.slice()), 
                                        t !== G) {
                                            for (var a in t.mloc) "string" == typeof a && (a = a.split(",")[0]), e.mloc[a] === G && (e.mloc[a] = t.mloc[a]);
                                            e.locator[e.alternation] = Object.keys(e.mloc).join(",");
                                        }
                                        return !0;
                                    }
                                    e.alternation = G;
                                }
                                return !1;
                            }
                            if (500 < D && n !== G) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                            if (D === A && e.matches === G) return L.push({
                                match: e,
                                locator: t.reverse(),
                                cd: j,
                                mloc: {}
                            }), !0;
                            if (e.matches !== G) {
                                if (e.isGroup && n !== e) {
                                    if (e = handleMatch(w.matches[N.inArray(e, w.matches) + 1], t, n)) return !0;
                                } else if (e.isOptional) {
                                    var a = e;
                                    if (e = resolveTestFromToken(e, B, t, n)) {
                                        if (N.each(L, function(e, t) {
                                            t.match.optionality = !0;
                                        }), O = L[L.length - 1].match, n !== G || !isFirstMatch(O, a)) return !0;
                                        I = !0, D = A;
                                    }
                                } else if (e.isAlternator) {
                                    var i, r = e, s = [], o = L.slice(), l = t.length, u = 0 < B.length ? B.shift() : -1;
                                    if (-1 === u || "string" == typeof u) {
                                        var c, f = D, p = B.slice(), k = [];
                                        if ("string" == typeof u) k = u.split(","); else for (c = 0; c < r.matches.length; c++) k.push(c.toString());
                                        if (getMaskSet().excludes[A]) {
                                            for (var m = k.slice(), d = 0, g = getMaskSet().excludes[A].length; d < g; d++) k.splice(k.indexOf(getMaskSet().excludes[A][d].toString()), 1);
                                            0 === k.length && (getMaskSet().excludes[A] = G, k = m);
                                        }
                                        (!0 === V.keepStatic || isFinite(parseInt(V.keepStatic)) && f >= V.keepStatic) && (k = k.slice(0, 1));
                                        for (var h = !1, v = 0; v < k.length; v++) {
                                            c = parseInt(k[v]), L = [], B = "string" == typeof u && resolveNdxInitializer(D, c, l) || p.slice(), 
                                            r.matches[c] && handleMatch(r.matches[c], [ c ].concat(t), n) ? e = !0 : 0 === v && (h = !0), 
                                            i = L.slice(), D = f, L = [];
                                            for (var b = 0; b < i.length; b++) {
                                                var y = i[b], M = !1;
                                                y.match.jit = y.match.jit || h, y.alternation = y.alternation || l, setMergeLocators(y);
                                                for (var S = 0; S < s.length; S++) {
                                                    var _ = s[S];
                                                    if ("string" != typeof u || y.alternation !== G && -1 !== N.inArray(y.locator[y.alternation].toString(), k)) {
                                                        if (y.match.nativeDef === _.match.nativeDef) {
                                                            M = !0, setMergeLocators(_, y);
                                                            break;
                                                        }
                                                        if (isSubsetOf(y, _)) {
                                                            setMergeLocators(y, _) && (M = !0, s.splice(s.indexOf(_), 0, y));
                                                            break;
                                                        }
                                                        if (isSubsetOf(_, y)) {
                                                            setMergeLocators(_, y);
                                                            break;
                                                        }
                                                        if (C = _, void 0, !(!((T = T = y).locator.slice(T.alternation).join("") == C.locator.slice(C.alternation).join("")) || null !== T.match.fn || null === C.match.fn) && C.match.fn.test(T.match.def, getMaskSet(), A, !1, V, !1)) {
                                                            setMergeLocators(y, _) && (M = !0, s.splice(s.indexOf(_), 0, y));
                                                            break;
                                                        }
                                                    }
                                                }
                                                M || s.push(y);
                                            }
                                        }
                                        L = o.concat(s), D = A, I = 0 < L.length, e = 0 < s.length, B = p.slice();
                                    } else e = handleMatch(r.matches[u] || w.matches[u], [ u ].concat(t), n);
                                    if (e) return !0;
                                } else if (e.isQuantifier && n !== w.matches[N.inArray(e, w.matches) - 1]) for (var P = e, E = 0 < B.length ? B.shift() : 0; E < (isNaN(P.quantifier.max) ? E + 1 : P.quantifier.max) && D <= A; E++) {
                                    var x = w.matches[N.inArray(P, w.matches) - 1];
                                    if (e = handleMatch(x, [ E ].concat(t), x)) {
                                        if ((O = L[L.length - 1].match).optionalQuantifier = E > P.quantifier.min - 1, O.jit = (E || 1) * x.matches.indexOf(O) >= P.quantifier.jit, 
                                        O.optionalQuantifier && isFirstMatch(O, x)) {
                                            I = !0, D = A;
                                            break;
                                        }
                                        return O.jit && !O.optionalQuantifier && (O.jitOffset = x.matches.indexOf(O)), !0;
                                    }
                                } else if (e = resolveTestFromToken(e, B, t, n)) return !0;
                            } else D++;
                            var T, C;
                        }
                        for (var n = 0 < B.length ? B.shift() : 0; n < w.matches.length; n++) if (!0 !== w.matches[n].isQuantifier) {
                            var a = handleMatch(w.matches[n], [ n ].concat(e), t);
                            if (a && D === A) return a;
                            if (A < D) break;
                        }
                    }
                    if (-1 < A) {
                        if (e === G) {
                            for (var i, r = A - 1; (i = getMaskSet().validPositions[r] || getMaskSet().tests[r]) === G && -1 < r; ) r--;
                            i !== G && -1 < r && (a = function mergeLocators(e, t) {
                                var a = [];
                                return N.isArray(t) || (t = [ t ]), 0 < t.length && (t[0].alternation === G ? 0 === (a = determineTestTemplate(e, t.slice()).locator.slice()).length && (a = t[0].locator.slice()) : N.each(t, function(e, t) {
                                    if ("" !== t.def) if (0 === a.length) a = t.locator.slice(); else for (var n = 0; n < a.length; n++) t.locator[n] && -1 === a[n].toString().indexOf(t.locator[n]) && (a[n] += "," + t.locator[n]);
                                })), a;
                            }(r, i), j = a.join(""), D = r);
                        }
                        if (getMaskSet().tests[A] && getMaskSet().tests[A][0].cd === j) return getMaskSet().tests[A];
                        for (var s = a.shift(); s < n.length; s++) {
                            var o = resolveTestFromToken(n[s], a, [ s ]);
                            if (o && D === A || A < D) break;
                        }
                    }
                    return (0 === L.length || I) && L.push({
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
                    }), e !== G && getMaskSet().tests[A] ? N.extend(!0, [], L) : (getMaskSet().tests[A] = N.extend(!0, [], L), 
                    getMaskSet().tests[A]);
                }
                function getBufferTemplate() {
                    return getMaskSet()._buffer === G && (getMaskSet()._buffer = getMaskTemplate(!1, 1), 
                    getMaskSet().buffer === G && (getMaskSet().buffer = getMaskSet()._buffer.slice())), 
                    getMaskSet()._buffer;
                }
                function getBuffer(e) {
                    return getMaskSet().buffer !== G && !0 !== e || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0), 
                    getMaskSet()._buffer === G && (getMaskSet()._buffer = getMaskSet().buffer.slice())), 
                    getMaskSet().buffer;
                }
                function refreshFromBuffer(e, t, n) {
                    var a, i;
                    if (!0 === e) resetMaskSet(), e = 0, t = n.length; else for (a = e; a < t; a++) delete getMaskSet().validPositions[a];
                    for (a = i = e; a < t; a++) if (resetMaskSet(!0), n[a] !== V.skipOptionalPartCharacter) {
                        var r = isValid(i, n[a], !0, !0);
                        !1 !== r && (resetMaskSet(!0), i = r.caret !== G ? r.caret : r.pos + 1);
                    }
                }
                function checkAlternationMatch(e, t, n) {
                    for (var a, i = V.greedy ? t : t.slice(0, 1), r = !1, s = n !== G ? n.split(",") : [], o = 0; o < s.length; o++) -1 !== (a = e.indexOf(s[o])) && e.splice(a, 1);
                    for (var l = 0; l < e.length; l++) if (-1 !== N.inArray(e[l], i)) {
                        r = !0;
                        break;
                    }
                    return r;
                }
                function alternate(e, t, n, a, i) {
                    var r, s, o, l, u, c, f, p = N.extend(!0, {}, getMaskSet().validPositions), k = !1, m = i !== G ? i : getLastValidPosition();
                    if (-1 === m && i === G) l = getTest(r = 0), s = l.alternation; else for (;0 <= m; m--) if ((o = getMaskSet().validPositions[m]) && o.alternation !== G) {
                        if (l && l.locator[o.alternation] !== o.locator[o.alternation]) break;
                        r = m, s = getMaskSet().validPositions[r].alternation, l = o;
                    }
                    if (s !== G) {
                        f = parseInt(r), getMaskSet().excludes[f] = getMaskSet().excludes[f] || [], !0 !== e && getMaskSet().excludes[f].push(getDecisionTaker(l));
                        var d = [], g = 0;
                        for (u = f; u < getLastValidPosition(G, !0) + 1; u++) (c = getMaskSet().validPositions[u]) && !0 !== c.generatedInput ? d.push(c.input) : u < e && g++, 
                        delete getMaskSet().validPositions[u];
                        for (;getMaskSet().excludes[f] && getMaskSet().excludes[f].length < 10; ) {
                            var h = -1 * g, v = d.slice();
                            for (getMaskSet().tests[f] = G, resetMaskSet(!0), k = !0; 0 < v.length; ) {
                                var b = v.shift();
                                if (!(k = isValid(getLastValidPosition(G, !0) + 1, b, !1, a, !0))) break;
                            }
                            if (k && t !== G) {
                                var y = getLastValidPosition(e) + 1;
                                for (u = f; u < getLastValidPosition() + 1; u++) ((c = getMaskSet().validPositions[u]) === G || null == c.match.fn) && u < e + h && h++;
                                k = isValid(y < (e += h) ? y : e, t, n, a, !0);
                            }
                            if (k) break;
                            if (resetMaskSet(), l = getTest(f), getMaskSet().validPositions = N.extend(!0, {}, p), 
                            !getMaskSet().excludes[f]) {
                                k = alternate(e, t, n, a, f - 1);
                                break;
                            }
                            var M = getDecisionTaker(l);
                            if (-1 !== getMaskSet().excludes[f].indexOf(M)) {
                                k = alternate(e, t, n, a, f - 1);
                                break;
                            }
                            for (getMaskSet().excludes[f].push(M), u = f; u < getLastValidPosition(G, !0) + 1; u++) delete getMaskSet().validPositions[u];
                        }
                    }
                    return getMaskSet().excludes[f] = G, k;
                }
                function isValid(u, e, t, c, n, a) {
                    function isSelection(e) {
                        return g ? 1 < e.begin - e.end || e.begin - e.end == 1 : 1 < e.end - e.begin || e.end - e.begin == 1;
                    }
                    t = !0 === t;
                    var i = u;
                    function _isValid(r, s, o) {
                        var l = !1;
                        return N.each(getTests(r), function(e, t) {
                            var n = t.match;
                            if (getBuffer(!0), !1 !== (l = null != n.fn ? n.fn.test(s, getMaskSet(), r, o, V, isSelection(u)) : (s === n.def || s === V.skipOptionalPartCharacter) && "" !== n.def && {
                                c: getPlaceholder(r, n, !0) || n.def,
                                pos: r
                            })) {
                                var a = l.c !== G ? l.c : s, i = r;
                                return a = a === V.skipOptionalPartCharacter && null === n.fn ? getPlaceholder(r, n, !0) || n.def : a, 
                                l.remove !== G && (N.isArray(l.remove) || (l.remove = [ l.remove ]), N.each(l.remove.sort(function(e, t) {
                                    return t - e;
                                }), function(e, t) {
                                    revalidateMask({
                                        begin: t,
                                        end: t + 1
                                    });
                                })), l.insert !== G && (N.isArray(l.insert) || (l.insert = [ l.insert ]), N.each(l.insert.sort(function(e, t) {
                                    return e - t;
                                }), function(e, t) {
                                    isValid(t.pos, t.c, !0, c);
                                })), !0 !== l && l.pos !== G && l.pos !== r && (i = l.pos), !0 !== l && l.pos === G && l.c === G || revalidateMask(u, N.extend({}, t, {
                                    input: function casing(e, t, n) {
                                        switch (V.casing || t.casing) {
                                          case "upper":
                                            e = e.toUpperCase();
                                            break;

                                          case "lower":
                                            e = e.toLowerCase();
                                            break;

                                          case "title":
                                            var a = getMaskSet().validPositions[n - 1];
                                            e = 0 === n || a && a.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? e.toUpperCase() : e.toLowerCase();
                                            break;

                                          default:
                                            if (N.isFunction(V.casing)) {
                                                var i = Array.prototype.slice.call(arguments);
                                                i.push(getMaskSet().validPositions), e = V.casing.apply(this, i);
                                            }
                                        }
                                        return e;
                                    }(a, n, i)
                                }), c, i) || (l = !1), !1;
                            }
                        }), l;
                    }
                    u.begin !== G && (i = g ? u.end : u.begin);
                    var r = !0, s = N.extend(!0, {}, getMaskSet().validPositions);
                    if (N.isFunction(V.preValidation) && !t && !0 !== c && !0 !== a && (r = V.preValidation(getBuffer(), i, e, isSelection(u), V, getMaskSet())), 
                    !0 === r) {
                        if (trackbackPositions(G, i, !0), (m === G || i < m) && (r = _isValid(i, e, t), 
                        (!t || !0 === c) && !1 === r && !0 !== a)) {
                            var o = getMaskSet().validPositions[i];
                            if (!o || null !== o.match.fn || o.match.def !== e && e !== V.skipOptionalPartCharacter) {
                                if ((V.insertMode || getMaskSet().validPositions[seekNext(i)] === G) && !isMask(i, !0)) for (var l = i + 1, f = seekNext(i); l <= f; l++) if (!1 !== (r = _isValid(l, e, t))) {
                                    r = trackbackPositions(i, r.pos !== G ? r.pos : l) || r, i = l;
                                    break;
                                }
                            } else r = {
                                caret: seekNext(i)
                            };
                        }
                        !1 !== r || !1 === V.keepStatic || null != V.regex && !isComplete(getBuffer()) || t || !0 === n || (r = alternate(i, e, t, c)), 
                        !0 === r && (r = {
                            pos: i
                        });
                    }
                    if (N.isFunction(V.postValidation) && !1 !== r && !t && !0 !== c && !0 !== a) {
                        var p = V.postValidation(getBuffer(!0), u.begin !== G ? g ? u.end : u.begin : u, r, V);
                        if (p !== G) {
                            if (p.refreshFromBuffer && p.buffer) {
                                var k = p.refreshFromBuffer;
                                refreshFromBuffer(!0 === k ? k : k.start, k.end, p.buffer);
                            }
                            r = !0 === p ? r : p;
                        }
                    }
                    return r && r.pos === G && (r.pos = i), !1 !== r && !0 !== a || (resetMaskSet(!0), 
                    getMaskSet().validPositions = N.extend(!0, {}, s)), r;
                }
                function trackbackPositions(e, t, n) {
                    var a;
                    if (e === G) for (e = t - 1; 0 < e && !getMaskSet().validPositions[e]; e--) ;
                    for (var i = e; i < t; i++) if (getMaskSet().validPositions[i] === G && !isMask(i, !0)) {
                        var r = 0 == i ? getTest(i) : getMaskSet().validPositions[i - 1];
                        if (r) {
                            var s = getTests(i).slice();
                            "" === s[s.length - 1].match.def && s.pop();
                            var o = determineTestTemplate(i, s);
                            if ((o = N.extend({}, o, {
                                input: getPlaceholder(i, o.match, !0) || o.match.def
                            })).generatedInput = !0, revalidateMask(i, o, !0), !0 !== n) {
                                var l = getMaskSet().validPositions[t].input;
                                getMaskSet().validPositions[t] = G, a = isValid(t, l, !0, !0);
                            }
                        }
                    }
                    return a;
                }
                function revalidateMask(e, t, n, a) {
                    function IsEnclosedStatic(e, t, n) {
                        var a = t[e];
                        if (a === G || (null !== a.match.fn || !0 === a.match.optionality) && a.input !== V.radixPoint) return !1;
                        var i = n.begin <= e - 1 ? t[e - 1] && null === t[e - 1].match.fn && t[e - 1] : t[e - 1], r = n.end > e + 1 ? t[e + 1] && null === t[e + 1].match.fn && t[e + 1] : t[e + 1];
                        return i && r;
                    }
                    var i = e.begin !== G ? e.begin : e, r = e.end !== G ? e.end : e;
                    if (e.begin > e.end && (i = e.end, r = e.begin), a = a !== G ? a : i, i !== r || V.insertMode && getMaskSet().validPositions[a] !== G && n === G) {
                        var s = N.extend(!0, {}, getMaskSet().validPositions), o = getLastValidPosition(G, !0);
                        for (getMaskSet().p = i, p = o; i <= p; p--) getMaskSet().validPositions[p] && "+" === getMaskSet().validPositions[p].match.nativeDef && (V.isNegative = !1), 
                        delete getMaskSet().validPositions[p];
                        var l = !0, u = a, c = (getMaskSet().validPositions, !1), f = u, p = u;
                        for (t && (getMaskSet().validPositions[a] = N.extend(!0, {}, t), f++, u++, i < r && p++); p <= o; p++) {
                            var k = s[p];
                            if (k !== G && (r <= p || i <= p && !0 !== k.generatedInput && IsEnclosedStatic(p, s, {
                                begin: i,
                                end: r
                            }))) {
                                for (;"" !== getTest(f).match.def; ) {
                                    if (!1 === c && s[f] && s[f].match.nativeDef === k.match.nativeDef) getMaskSet().validPositions[f] = N.extend(!0, {}, s[f]), 
                                    getMaskSet().validPositions[f].input = k.input, trackbackPositions(G, f, !0), u = f + 1, 
                                    l = !0; else if (V.shiftPositions && positionCanMatchDefinition(f, k.match.def)) {
                                        var m = isValid(f, k.input, !0, !0);
                                        l = !1 !== m, u = m.caret || m.insert ? getLastValidPosition() : f + 1, c = !0;
                                    } else l = !0 === k.generatedInput || k.input === V.radixPoint && !0 === V.numericInput;
                                    if (l) break;
                                    if (!l && r < f && isMask(f, !0) && (null !== k.match.fn || f > getMaskSet().maskLength)) break;
                                    f++;
                                }
                                "" == getTest(f).match.def && (l = !1), f = u;
                            }
                            if (!l) break;
                        }
                        if (!l) return getMaskSet().validPositions = N.extend(!0, {}, s), resetMaskSet(!0), 
                        !1;
                    } else t && (getMaskSet().validPositions[a] = N.extend(!0, {}, t));
                    return resetMaskSet(!0), !0;
                }
                function isMask(e, t) {
                    var n = getTestTemplate(e).match;
                    if ("" === n.def && (n = getTest(e).match), null != n.fn) return n.fn;
                    if (!0 !== t && -1 < e) {
                        var a = getTests(e);
                        return a.length > 1 + ("" === a[a.length - 1].match.def ? 1 : 0);
                    }
                    return !1;
                }
                function seekNext(e, t) {
                    for (var n = e + 1; "" !== getTest(n).match.def && (!0 === t && (!0 !== getTest(n).match.newBlockMarker || !isMask(n)) || !0 !== t && !isMask(n)); ) n++;
                    return n;
                }
                function seekPrevious(e, t) {
                    var n, a = e;
                    if (a <= 0) return 0;
                    for (;0 < --a && (!0 === t && !0 !== getTest(a).match.newBlockMarker || !0 !== t && !isMask(a) && ((n = getTests(a)).length < 2 || 2 === n.length && "" === n[1].match.def)); ) ;
                    return a;
                }
                function writeBuffer(e, t, n, a, i) {
                    if (a && N.isFunction(V.onBeforeWrite)) {
                        var r = V.onBeforeWrite.call(u, a, t, n, V);
                        if (r) {
                            if (r.refreshFromBuffer) {
                                var s = r.refreshFromBuffer;
                                refreshFromBuffer(!0 === s ? s : s.start, s.end, r.buffer || t), t = getBuffer(!0);
                            }
                            n !== G && (n = r.caret !== G ? r.caret : n);
                        }
                    }
                    if (e !== G && (e.inputmask._valueSet(t.join("")), n === G || a !== G && "blur" === a.type ? renderColorMask(e, n, 0 === t.length) : caret(e, n), 
                    !0 === i)) {
                        var o = N(e), l = e.inputmask._valueGet();
                        c = !0, o.trigger("input"), setTimeout(function() {
                            l === getBufferTemplate().join("") ? o.trigger("cleared") : !0 === isComplete(t) && o.trigger("complete");
                        }, 0);
                    }
                }
                function getPlaceholder(e, t, n) {
                    if ((t = t || getTest(e).match).placeholder !== G || !0 === n) return N.isFunction(t.placeholder) ? t.placeholder(V) : t.placeholder;
                    if (null !== t.fn) return V.placeholder.charAt(e % V.placeholder.length);
                    if (-1 < e && getMaskSet().validPositions[e] === G) {
                        var a, i = getTests(e), r = [];
                        if (i.length > 1 + ("" === i[i.length - 1].match.def ? 1 : 0)) for (var s = 0; s < i.length; s++) if (!0 !== i[s].match.optionality && !0 !== i[s].match.optionalQuantifier && (null === i[s].match.fn || a === G || !1 !== i[s].match.fn.test(a.match.def, getMaskSet(), e, !0, V)) && (r.push(i[s]), 
                        null === i[s].match.fn && (a = i[s]), 1 < r.length && /[0-9a-bA-Z]/.test(r[0].match.def))) return V.placeholder.charAt(e % V.placeholder.length);
                    }
                    return t.def;
                }
                function HandleNativePlaceholder(e, t) {
                    if (_ && e.inputmask._valueGet() !== t) {
                        var n = getBuffer().slice(), a = e.inputmask._valueGet();
                        a !== t && (-1 === getLastValidPosition() && a === getBufferTemplate().join("") ? n = [] : clearOptionalTail(n), 
                        writeBuffer(e, n));
                    } else e.placeholder !== t && (e.placeholder = t, "" === e.placeholder && e.removeAttribute("placeholder"));
                }
                var n, o = {
                    on: function on(e, t, r) {
                        var n = function ev(e) {
                            var t = this;
                            if (t.inputmask === G && "FORM" !== this.nodeName) {
                                var n = N.data(t, "_inputmask_opts");
                                n ? new Inputmask(n).mask(t) : o.off(t);
                            } else {
                                if ("setvalue" === e.type || "FORM" === this.nodeName || !(t.disabled || t.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === V.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                                    switch (e.type) {
                                      case "input":
                                        if (!0 === c) return c = !1, e.preventDefault();
                                        if (P) {
                                            var a = arguments;
                                            return setTimeout(function() {
                                                r.apply(t, a), caret(t, t.inputmask.caretPos, G, !0);
                                            }, 0), !1;
                                        }
                                        break;

                                      case "keydown":
                                        c = s = !1;
                                        break;

                                      case "keypress":
                                        if (!0 === s) return e.preventDefault();
                                        s = !0;
                                        break;

                                      case "click":
                                        if (E || x) {
                                            var a = arguments;
                                            return setTimeout(function() {
                                                r.apply(t, a);
                                            }, 0), !1;
                                        }
                                    }
                                    var i = r.apply(t, arguments);
                                    return !1 === i && (e.preventDefault(), e.stopPropagation()), i;
                                }
                                e.preventDefault();
                            }
                        };
                        e.inputmask.events[t] = e.inputmask.events[t] || [], e.inputmask.events[t].push(n), 
                        -1 !== N.inArray(t, [ "submit", "reset" ]) ? null !== e.form && N(e.form).on(t, n) : N(e).on(t, n);
                    },
                    off: function off(a, e) {
                        var t;
                        a.inputmask && a.inputmask.events && (e ? (t = [])[e] = a.inputmask.events[e] : t = a.inputmask.events, 
                        N.each(t, function(e, t) {
                            for (;0 < t.length; ) {
                                var n = t.pop();
                                -1 !== N.inArray(e, [ "submit", "reset" ]) ? null !== a.form && N(a.form).off(e, n) : N(a).off(e, n);
                            }
                            delete a.inputmask.events[e];
                        }));
                    }
                }, v = {
                    keydownEvent: function keydownEvent(e) {
                        var t = this, n = N(t), a = e.keyCode, i = caret(t);
                        if (a === Inputmask.keyCode.BACKSPACE || a === Inputmask.keyCode.DELETE || x && a === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && a === Inputmask.keyCode.X && !isInputEventSupported("cut")) e.preventDefault(), 
                        handleRemove(0, a, i), writeBuffer(t, getBuffer(!0), getMaskSet().p, e, t.inputmask._valueGet() !== getBuffer().join("")); else if (a === Inputmask.keyCode.END || a === Inputmask.keyCode.PAGE_DOWN) {
                            e.preventDefault();
                            var r = seekNext(getLastValidPosition());
                            caret(t, e.shiftKey ? i.begin : r, r, !0);
                        } else a === Inputmask.keyCode.HOME && !e.shiftKey || a === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), 
                        caret(t, 0, e.shiftKey ? i.begin : 0, !0)) : (V.undoOnEscape && a === Inputmask.keyCode.ESCAPE || 90 === a && e.ctrlKey) && !0 !== e.altKey ? (checkVal(t, !0, !1, d.split("")), 
                        n.trigger("click")) : a !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === V.tabThrough && a === Inputmask.keyCode.TAB && (!0 === e.shiftKey ? (null === getTest(i.begin).match.fn && (i.begin = seekNext(i.begin)), 
                        i.end = seekPrevious(i.begin, !0), i.begin = seekPrevious(i.end, !0)) : (i.begin = seekNext(i.begin, !0), 
                        i.end = seekNext(i.begin, !0), i.end < getMaskSet().maskLength && i.end--), i.begin < getMaskSet().maskLength && (e.preventDefault(), 
                        caret(t, i.begin, i.end))) : (V.insertMode = !V.insertMode, t.setAttribute("im-insert", V.insertMode));
                        V.onKeyDown.call(this, e, getBuffer(), caret(t).begin, V), h = -1 !== N.inArray(a, V.ignorables);
                    },
                    keypressEvent: function keypressEvent(e, t, n, a, i) {
                        var r = this, s = N(r), o = e.which || e.charCode || e.keyCode;
                        if (!(!0 === t || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || h)) return o === Inputmask.keyCode.ENTER && d !== getBuffer().join("") && (d = getBuffer().join(""), 
                        setTimeout(function() {
                            s.trigger("change");
                        }, 0)), !0;
                        if (o) {
                            46 === o && !1 === e.shiftKey && "" !== V.radixPoint && (o = V.radixPoint.charCodeAt(0));
                            var l, u = t ? {
                                begin: i,
                                end: i
                            } : caret(r), c = String.fromCharCode(o), f = 0;
                            if (V._radixDance && V.numericInput) {
                                var p = getBuffer().indexOf(V.radixPoint.charAt(0)) + 1;
                                u.begin <= p && (o === V.radixPoint.charCodeAt(0) && (f = 1), u.begin -= 1, u.end -= 1);
                            }
                            getMaskSet().writeOutBuffer = !0;
                            var k = isValid(u, c, a);
                            if (!1 !== k && (resetMaskSet(!0), l = k.caret !== G ? k.caret : seekNext(k.pos.begin ? k.pos.begin : k.pos), 
                            getMaskSet().p = l), l = (V.numericInput && k.caret === G ? seekPrevious(l) : l) + f, 
                            !1 !== n && (setTimeout(function() {
                                V.onKeyValidation.call(r, o, k, V);
                            }, 0), getMaskSet().writeOutBuffer && !1 !== k)) {
                                var m = getBuffer();
                                writeBuffer(r, m, l, e, !0 !== t);
                            }
                            if (e.preventDefault(), t) return !1 !== k && (k.forwardPosition = l), k;
                        }
                    },
                    pasteEvent: function pasteEvent(e) {
                        var t, n = this, a = e.originalEvent || e, i = (N(n), n.inputmask._valueGet(!0)), r = caret(n);
                        g && (t = r.end, r.end = r.begin, r.begin = t);
                        var s = i.substr(0, r.begin), o = i.substr(r.end, i.length);
                        if (s === (g ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, r.begin).join("") && (s = ""), 
                        o === (g ? getBufferTemplate().reverse() : getBufferTemplate()).slice(r.end).join("") && (o = ""), 
                        M.clipboardData && M.clipboardData.getData) i = s + M.clipboardData.getData("Text") + o; else {
                            if (!a.clipboardData || !a.clipboardData.getData) return !0;
                            i = s + a.clipboardData.getData("text/plain") + o;
                        }
                        var l = i;
                        if (N.isFunction(V.onBeforePaste)) {
                            if (!1 === (l = V.onBeforePaste.call(u, i, V))) return e.preventDefault();
                            l || (l = i);
                        }
                        return checkVal(n, !1, !1, l.toString().split("")), writeBuffer(n, getBuffer(), seekNext(getLastValidPosition()), e, d !== getBuffer().join("")), 
                        e.preventDefault();
                    },
                    inputFallBackEvent: function inputFallBackEvent(e) {
                        var a = this, t = a.inputmask._valueGet();
                        if (getBuffer().join("") !== t) {
                            var n = caret(a);
                            if (t = function ieMobileHandler(e, t, n) {
                                if (E) {
                                    var a = t.replace(getBuffer().join(""), "");
                                    if (1 === a.length) {
                                        var i = t.split("");
                                        i.splice(n.begin, 0, a), t = i.join("");
                                    }
                                }
                                return t;
                            }(0, t = function radixPointHandler(e, t, n) {
                                return "." === t.charAt(n.begin - 1) && "" !== V.radixPoint && ((t = t.split(""))[n.begin - 1] = V.radixPoint.charAt(0), 
                                t = t.join("")), t;
                            }(0, t, n), n), getBuffer().join("") !== t) {
                                var i = getBuffer().join(""), r = !V.numericInput && t.length > i.length ? -1 : 0, s = t.substr(0, n.begin), o = t.substr(n.begin), l = i.substr(0, n.begin + r), u = i.substr(n.begin + r), c = n, f = "", p = !1;
                                if (s !== l) {
                                    var k, m = (p = s.length >= l.length) ? s.length : l.length;
                                    for (k = 0; s.charAt(k) === l.charAt(k) && k < m; k++) ;
                                    p && (c.begin = k - r, f += s.slice(k, c.end));
                                }
                                if (o !== u && (o.length > u.length ? f += o.slice(0, 1) : o.length < u.length && (c.end += u.length - o.length, 
                                p || "" === V.radixPoint || "" !== o || s.charAt(c.begin + r - 1) !== V.radixPoint || (c.begin--, 
                                f = V.radixPoint))), writeBuffer(a, getBuffer(), {
                                    begin: c.begin + r,
                                    end: c.end + r
                                }), 0 < f.length) N.each(f.split(""), function(e, t) {
                                    var n = new N.Event("keypress");
                                    n.which = t.charCodeAt(0), h = !1, v.keypressEvent.call(a, n);
                                }); else {
                                    c.begin === c.end - 1 && (c.begin = seekPrevious(c.begin + 1), c.begin === c.end - 1 ? caret(a, c.begin) : caret(a, c.begin, c.end));
                                    var d = new N.Event("keydown");
                                    d.keyCode = V.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE, 
                                    v.keydownEvent.call(a, d);
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
                                return N.each(e.data.split(""), function(e, t) {
                                    var n = new N.Event("keypress");
                                    n.which = t.charCodeAt(0), h = !1, v.keypressEvent.call(a, n);
                                }), e.preventDefault();

                              case "deleteContentBackward":
                                var t = new N.Event("keydown");
                                return t.keyCode = Inputmask.keyCode.BACKSPACE, v.keydownEvent.call(a, t), e.preventDefault();

                              case "deleteContentForward":
                                var t = new N.Event("keydown");
                                return t.keyCode = Inputmask.keyCode.DELETE, v.keydownEvent.call(a, t), e.preventDefault();
                            }
                        }
                    },
                    setValueEvent: function setValueEvent(e) {
                        this.inputmask.refreshValue = !1;
                        var t = e && e.detail ? e.detail[0] : arguments[1], t = t || this.inputmask._valueGet(!0);
                        N.isFunction(V.onBeforeMask) && (t = V.onBeforeMask.call(u, t, V) || t), checkVal(this, !0, !1, t = t.split("")), 
                        d = getBuffer().join(""), (V.clearMaskOnLostFocus || V.clearIncomplete) && this.inputmask._valueGet() === getBufferTemplate().join("") && this.inputmask._valueSet("");
                    },
                    focusEvent: function focusEvent(e) {
                        var t = this, n = t.inputmask._valueGet();
                        V.showMaskOnFocus && (!V.showMaskOnHover || V.showMaskOnHover && "" === n) && (t.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(t, getBuffer(), seekNext(getLastValidPosition())) : !1 === a && caret(t, seekNext(getLastValidPosition()))), 
                        !0 === V.positionCaretOnTab && !1 === a && v.clickEvent.apply(t, [ e, !0 ]), d = getBuffer().join("");
                    },
                    mouseleaveEvent: function mouseleaveEvent(e) {
                        a = !1, V.clearMaskOnLostFocus && S.activeElement !== this && HandleNativePlaceholder(this, r);
                    },
                    clickEvent: function clickEvent(e, u) {
                        var c = this;
                        setTimeout(function() {
                            if (S.activeElement === c) {
                                var e = caret(c);
                                if (u && (g ? e.end = e.begin : e.begin = e.end), e.begin === e.end) switch (V.positionCaretOnClick) {
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
                                        if ("" !== V.radixPoint) {
                                            var t = getMaskSet().validPositions;
                                            if (t[e] === G || t[e].input === getPlaceholder(e)) {
                                                if (e < seekNext(-1)) return !0;
                                                var n = N.inArray(V.radixPoint, getBuffer());
                                                if (-1 !== n) {
                                                    for (var a in t) if (n < a && t[a].input !== getPlaceholder(a)) return !1;
                                                    return !0;
                                                }
                                            }
                                        }
                                        return !1;
                                    }(e.begin)) {
                                        var t = getBuffer().join("").indexOf(V.radixPoint);
                                        caret(c, V.numericInput ? seekNext(t) : t);
                                        break;
                                    }

                                  default:
                                    var n = e.begin, a = getLastValidPosition(n, !0), i = seekNext(a);
                                    if (n < i) caret(c, isMask(n, !0) || isMask(n - 1, !0) ? n : seekNext(n)); else {
                                        var r = getMaskSet().validPositions[a], s = getTestTemplate(i, r ? r.match.locator : G, r), o = getPlaceholder(i, s.match);
                                        if ("" !== o && getBuffer()[i] !== o && !0 !== s.match.optionalQuantifier && !0 !== s.match.newBlockMarker || !isMask(i, V.keepStatic) && s.match.def === o) {
                                            var l = seekNext(i);
                                            (l <= n || n === i) && (i = l);
                                        }
                                        caret(c, i);
                                    }
                                }
                            }
                        }, 0);
                    },
                    cutEvent: function cutEvent(e) {
                        N(this);
                        var t = caret(this), n = e.originalEvent || e, a = M.clipboardData || n.clipboardData, i = g ? getBuffer().slice(t.end, t.begin) : getBuffer().slice(t.begin, t.end);
                        a.setData("text", g ? i.reverse().join("") : i.join("")), S.execCommand && S.execCommand("copy"), 
                        handleRemove(0, Inputmask.keyCode.DELETE, t), writeBuffer(this, getBuffer(), getMaskSet().p, e, d !== getBuffer().join(""));
                    },
                    blurEvent: function blurEvent(e) {
                        var t = N(this);
                        if (this.inputmask) {
                            HandleNativePlaceholder(this, r);
                            var n = this.inputmask._valueGet(), a = getBuffer().slice();
                            "" === n && p === G || (V.clearMaskOnLostFocus && (-1 === getLastValidPosition() && n === getBufferTemplate().join("") ? a = [] : clearOptionalTail(a)), 
                            !1 === isComplete(a) && (setTimeout(function() {
                                t.trigger("incomplete");
                            }, 0), V.clearIncomplete && (resetMaskSet(), a = V.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
                            writeBuffer(this, a, G, e)), d !== getBuffer().join("") && (d = a.join(""), t.trigger("change"));
                        }
                    },
                    mouseenterEvent: function mouseenterEvent(e) {
                        a = !0, S.activeElement !== this && V.showMaskOnHover && HandleNativePlaceholder(this, (g ? getBuffer().slice().reverse() : getBuffer()).join(""));
                    },
                    submitEvent: function submitEvent(e) {
                        d !== getBuffer().join("") && i.trigger("change"), V.clearMaskOnLostFocus && -1 === getLastValidPosition() && l.inputmask._valueGet && l.inputmask._valueGet() === getBufferTemplate().join("") && l.inputmask._valueSet(""), 
                        V.clearIncomplete && !1 === isComplete(getBuffer()) && l.inputmask._valueSet(""), 
                        V.removeMaskOnSubmit && (l.inputmask._valueSet(l.inputmask.unmaskedvalue(), !0), 
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
                function checkVal(i, e, r, t, n) {
                    var s = this || i.inputmask, o = t.slice(), l = "", u = -1, c = G;
                    if (resetMaskSet(), r || !0 === V.autoUnmask) u = seekNext(u); else {
                        var a = getBufferTemplate().slice(0, seekNext(-1)).join(""), f = o.join("").match(new RegExp("^" + Inputmask.escapeRegex(a), "g"));
                        f && 0 < f.length && (o.splice(0, f.length * a.length), u = seekNext(u));
                    }
                    -1 === u ? (getMaskSet().p = seekNext(u), u = 0) : getMaskSet().p = u, s.caretPos = {
                        begin: u
                    }, N.each(o, function(e, t) {
                        if (t !== G) if (getMaskSet().validPositions[e] === G && o[e] === getPlaceholder(e) && isMask(e, !0) && !1 === isValid(e, o[e], !0, G, G, !0)) getMaskSet().p++; else {
                            var n = new N.Event("_checkval");
                            n.which = t.charCodeAt(0), l += t;
                            var a = getLastValidPosition(G, !0);
                            !function isTemplateMatch(e, t) {
                                return -1 !== getMaskTemplate(!0, 0, !1).slice(e, seekNext(e)).join("").replace(/'/g, "").indexOf(t) && !isMask(e) && (getTest(e).match.nativeDef === t.charAt(0) || null === getTest(e).match.fn && getTest(e).match.nativeDef === "'" + t.charAt(0) || " " === getTest(e).match.nativeDef && (getTest(e + 1).match.nativeDef === t.charAt(0) || null === getTest(e + 1).match.fn && getTest(e + 1).match.nativeDef === "'" + t.charAt(0)));
                            }(u, l) ? (c = v.keypressEvent.call(i, n, !0, !1, r, s.caretPos.begin)) && (u = s.caretPos.begin + 1, 
                            l = "") : c = v.keypressEvent.call(i, n, !0, !1, r, a + 1), c && (writeBuffer(G, getBuffer(), c.forwardPosition, n, !1), 
                            s.caretPos = {
                                begin: c.forwardPosition,
                                end: c.forwardPosition
                            });
                        }
                    }), e && writeBuffer(i, getBuffer(), c ? c.forwardPosition : G, n || new N.Event("checkval"), n && "input" === n.type);
                }
                function unmaskedvalue(e) {
                    if (e) {
                        if (e.inputmask === G) return e.value;
                        e.inputmask && e.inputmask.refreshValue && v.setValueEvent.call(e);
                    }
                    var t = [], n = getMaskSet().validPositions;
                    for (var a in n) n[a].match && null != n[a].match.fn && t.push(n[a].input);
                    var i = 0 === t.length ? "" : (g ? t.reverse() : t).join("");
                    if (N.isFunction(V.onUnMask)) {
                        var r = (g ? getBuffer().slice().reverse() : getBuffer()).join("");
                        i = V.onUnMask.call(u, r, i, V);
                    }
                    return i;
                }
                function caret(e, t, n, a) {
                    function translatePosition(e) {
                        return !g || "number" != typeof e || V.greedy && "" === V.placeholder || !l || (e = l.inputmask._valueGet().length - e), 
                        e;
                    }
                    var i;
                    if (t === G) return "selectionStart" in e ? (t = e.selectionStart, n = e.selectionEnd) : M.getSelection ? (i = M.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== e && i.commonAncestorContainer !== e || (t = i.startOffset, 
                    n = i.endOffset) : S.selection && S.selection.createRange && (i = S.selection.createRange(), 
                    t = 0 - i.duplicate().moveStart("character", -e.inputmask._valueGet().length), n = t + i.text.length), 
                    {
                        begin: a ? t : translatePosition(t),
                        end: a ? n : translatePosition(n)
                    };
                    if (N.isArray(t) && (n = g ? t[0] : t[1], t = g ? t[1] : t[0]), t.begin !== G && (n = g ? t.begin : t.end, 
                    t = g ? t.end : t.begin), "number" == typeof t) {
                        t = a ? t : translatePosition(t), n = "number" == typeof (n = a ? n : translatePosition(n)) ? n : t;
                        var r = parseInt(((e.ownerDocument.defaultView || M).getComputedStyle ? (e.ownerDocument.defaultView || M).getComputedStyle(e, null) : e.currentStyle).fontSize) * n;
                        if (e.scrollLeft = r > e.scrollWidth ? r : 0, e.inputmask.caretPos = {
                            begin: t,
                            end: n
                        }, e === S.activeElement) {
                            if ("selectionStart" in e) e.selectionStart = t, e.selectionEnd = n; else if (M.getSelection) {
                                if (i = S.createRange(), e.firstChild === G || null === e.firstChild) {
                                    var s = S.createTextNode("");
                                    e.appendChild(s);
                                }
                                i.setStart(e.firstChild, t < e.inputmask._valueGet().length ? t : e.inputmask._valueGet().length), 
                                i.setEnd(e.firstChild, n < e.inputmask._valueGet().length ? n : e.inputmask._valueGet().length), 
                                i.collapse(!0);
                                var o = M.getSelection();
                                o.removeAllRanges(), o.addRange(i);
                            } else e.createTextRange && ((i = e.createTextRange()).collapse(!0), i.moveEnd("character", n), 
                            i.moveStart("character", t), i.select());
                            renderColorMask(e, {
                                begin: t,
                                end: n
                            });
                        }
                    }
                }
                function determineLastRequiredPosition(e) {
                    var t, n, a = getMaskTemplate(!0, getLastValidPosition(), !0, !0), i = a.length, r = getLastValidPosition(), s = {}, o = getMaskSet().validPositions[r], l = o !== G ? o.locator.slice() : G;
                    for (t = r + 1; t < a.length; t++) n = getTestTemplate(t, l, t - 1), l = n.locator.slice(), 
                    s[t] = N.extend(!0, {}, n);
                    var u = o && o.alternation !== G ? o.locator[o.alternation] : G;
                    for (t = i - 1; r < t && ((n = s[t]).match.optionality || n.match.optionalQuantifier && n.match.newBlockMarker || u && (u !== s[t].locator[o.alternation] && null != n.match.fn || null === n.match.fn && n.locator[o.alternation] && checkAlternationMatch(n.locator[o.alternation].toString().split(","), u.toString().split(",")) && "" !== getTests(t)[0].def)) && a[t] === getPlaceholder(t, n.match); t--) i--;
                    return e ? {
                        l: i,
                        def: s[i] ? s[i].match : G
                    } : i;
                }
                function clearOptionalTail(e) {
                    for (var t, n = getMaskTemplate(!(e.length = 0), 0, !0, G, !0); (t = n.shift()) !== G; ) e.push(t);
                    return e;
                }
                function isComplete(e) {
                    if (N.isFunction(V.isComplete)) return V.isComplete(e, V);
                    if ("*" === V.repeat) return G;
                    var t = !1, n = determineLastRequiredPosition(!0), a = seekPrevious(n.l);
                    if (n.def === G || n.def.newBlockMarker || n.def.optionality || n.def.optionalQuantifier) {
                        t = !0;
                        for (var i = 0; i <= a; i++) {
                            var r = getTestTemplate(i).match;
                            if (null !== r.fn && getMaskSet().validPositions[i] === G && !0 !== r.optionality && !0 !== r.optionalQuantifier || null === r.fn && e[i] !== getPlaceholder(i, r)) {
                                t = !1;
                                break;
                            }
                        }
                    }
                    return t;
                }
                function handleRemove(e, t, n, a, i) {
                    if ((V.numericInput || g) && (t === Inputmask.keyCode.BACKSPACE ? t = Inputmask.keyCode.DELETE : t === Inputmask.keyCode.DELETE && (t = Inputmask.keyCode.BACKSPACE), 
                    g)) {
                        var r = n.end;
                        n.end = n.begin, n.begin = r;
                    }
                    if (t === Inputmask.keyCode.BACKSPACE && n.end - n.begin < 1 ? (n.begin = seekPrevious(n.begin), 
                    getMaskSet().validPositions[n.begin] !== G && getMaskSet().validPositions[n.begin].input === V.groupSeparator && n.begin--) : t === Inputmask.keyCode.DELETE && n.begin === n.end && (n.end = isMask(n.end, !0) && getMaskSet().validPositions[n.end] && getMaskSet().validPositions[n.end].input !== V.radixPoint ? n.end + 1 : seekNext(n.end) + 1, 
                    getMaskSet().validPositions[n.begin] !== G && getMaskSet().validPositions[n.begin].input === V.groupSeparator && n.end++), 
                    revalidateMask(n), !0 !== a && !1 !== V.keepStatic || null !== V.regex) {
                        var s = alternate(!0);
                        if (s) {
                            var o = s.caret !== G ? s.caret : s.pos ? seekNext(s.pos.begin ? s.pos.begin : s.pos) : getLastValidPosition(-1, !0);
                            (t !== Inputmask.keyCode.DELETE || n.begin > o) && n.begin;
                        }
                    }
                    var l = getLastValidPosition(n.begin, !0);
                    if (l < n.begin || -1 === n.begin) getMaskSet().p = seekNext(l); else if (!0 !== a && (getMaskSet().p = n.begin, 
                    !0 !== i)) for (;getMaskSet().p < l && getMaskSet().validPositions[getMaskSet().p] === G; ) getMaskSet().p++;
                }
                function initializeColorMask(u) {
                    var c = (u.ownerDocument.defaultView || M).getComputedStyle(u, null), e = S.createElement("div");
                    e.style.width = c.width, e.style.textAlign = c.textAlign, p = S.createElement("div"), 
                    (u.inputmask.colorMask = p).className = "im-colormask", u.parentNode.insertBefore(p, u), 
                    u.parentNode.removeChild(u), p.appendChild(u), p.appendChild(e), u.style.left = e.offsetLeft + "px", 
                    N(p).on("mouseleave", function(e) {
                        return v.mouseleaveEvent.call(u, [ e ]);
                    }), N(p).on("mouseenter", function(e) {
                        return v.mouseenterEvent.call(u, [ e ]);
                    }), N(p).on("click", function(e) {
                        return caret(u, function findCaretPos(e) {
                            var t, n = S.createElement("span");
                            for (var a in c) isNaN(a) && -1 !== a.indexOf("font") && (n.style[a] = c[a]);
                            n.style.textTransform = c.textTransform, n.style.letterSpacing = c.letterSpacing, 
                            n.style.position = "absolute", n.style.height = "auto", n.style.width = "auto", 
                            n.style.visibility = "hidden", n.style.whiteSpace = "nowrap", S.body.appendChild(n);
                            var i, r = u.inputmask._valueGet(), s = 0;
                            for (t = 0, i = r.length; t <= i; t++) {
                                if (n.innerHTML += r.charAt(t) || "_", n.offsetWidth >= e) {
                                    var o = e - s, l = n.offsetWidth - e;
                                    n.innerHTML = r.charAt(t), o -= n.offsetWidth / 3, t = o < l ? t - 1 : t;
                                    break;
                                }
                                s = n.offsetWidth;
                            }
                            return S.body.removeChild(n), t;
                        }(e.clientX)), v.clickEvent.call(u, [ e ]);
                    });
                }
                function renderColorMask(e, t, n) {
                    var a, i, r, s = [], o = !1, l = 0;
                    function setEntry(e) {
                        if (e === G && (e = ""), o || null !== a.fn && i.input !== G) if (o && (null !== a.fn && i.input !== G || "" === a.def)) {
                            o = !1;
                            var t = s.length;
                            s[t - 1] = s[t - 1] + "</span>", s.push(e);
                        } else s.push(e); else o = !0, s.push("<span class='im-static'>" + e);
                    }
                    if (p !== G) {
                        var u = getBuffer();
                        if (t === G ? t = caret(e) : t.begin === G && (t = {
                            begin: t,
                            end: t
                        }), !0 !== n) {
                            for (var c = getLastValidPosition(); getMaskSet().validPositions[l] ? (i = getMaskSet().validPositions[l], 
                            a = i.match, r = i.locator.slice(), setEntry(u[l])) : (i = getTestTemplate(l, r, l - 1), 
                            a = i.match, r = i.locator.slice(), !1 === V.jitMasking || l < c || "number" == typeof V.jitMasking && isFinite(V.jitMasking) && V.jitMasking > l ? setEntry(getPlaceholder(l, a)) : o = !1), 
                            l++, (m === G || l < m) && (null !== a.fn || "" !== a.def) || l < c || o; ) ;
                            o && setEntry(), function setCaret() {
                                S.activeElement === e && (s.splice(t.begin, 0, t.begin === t.end || t.end > getMaskSet().maskLength ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">'), 
                                s.splice(t.end + 1, 0, "</mark>"));
                            }();
                        }
                        var f = p.getElementsByTagName("div")[0];
                        f.innerHTML = s.join(""), e.inputmask.positionColorMask(e, f);
                    }
                }
                if (Inputmask.prototype.positionColorMask = function(e, t) {
                    e.style.left = t.offsetLeft + "px";
                }, e !== G) switch (e.action) {
                  case "isComplete":
                    return l = e.el, isComplete(getBuffer());

                  case "unmaskedvalue":
                    return l !== G && e.value === G || (n = e.value, n = (N.isFunction(V.onBeforeMask) && V.onBeforeMask.call(u, n, V) || n).split(""), 
                    checkVal.call(this, G, !1, !1, n), N.isFunction(V.onBeforeWrite) && V.onBeforeWrite.call(u, G, getBuffer(), 0, V)), 
                    unmaskedvalue(l);

                  case "mask":
                    !function mask(e) {
                        function isElementTypeSupported(e, r) {
                            function patchValueProperty(e) {
                                var t, n, a;
                                function patchValhook(e) {
                                    if (N.valHooks && (N.valHooks[e] === G || !0 !== N.valHooks[e].inputmaskpatch)) {
                                        var n = N.valHooks[e] && N.valHooks[e].get ? N.valHooks[e].get : function(e) {
                                            return e.value;
                                        }, i = N.valHooks[e] && N.valHooks[e].set ? N.valHooks[e].set : function(e, t) {
                                            return e.value = t, e;
                                        };
                                        N.valHooks[e] = {
                                            get: function get(e) {
                                                if (e.inputmask) {
                                                    if (e.inputmask.opts.autoUnmask) return e.inputmask.unmaskedvalue();
                                                    var t = n(e);
                                                    return -1 !== getLastValidPosition(G, G, e.inputmask.maskset.validPositions) || !0 !== r.nullable ? t : "";
                                                }
                                                return n(e);
                                            },
                                            set: function set(e, t) {
                                                var n, a = N(e);
                                                return n = i(e, t), e.inputmask && a.trigger("setvalue", [ t ]), n;
                                            },
                                            inputmaskpatch: !0
                                        };
                                    }
                                }
                                function getter() {
                                    return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== r.nullable ? S.activeElement === this && r.clearMaskOnLostFocus ? (g ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : t.call(this) : "" : t.call(this);
                                }
                                function setter(e) {
                                    n.call(this, e), this.inputmask && N(this).trigger("setvalue", [ e ]);
                                }
                                if (!e.inputmask.__valueGet) {
                                    if (!0 !== r.noValuePatching) {
                                        if (Object.getOwnPropertyDescriptor) {
                                            "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === T("test".__proto__) ? function(e) {
                                                return e.__proto__;
                                            } : function(e) {
                                                return e.constructor.prototype;
                                            });
                                            var i = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), "value") : G;
                                            i && i.get && i.set ? (t = i.get, n = i.set, Object.defineProperty(e, "value", {
                                                get: getter,
                                                set: setter,
                                                configurable: !0
                                            })) : "INPUT" !== e.tagName && (t = function valueGet() {
                                                return this.textContent;
                                            }, n = function valueSet(e) {
                                                this.textContent = e;
                                            }, Object.defineProperty(e, "value", {
                                                get: getter,
                                                set: setter,
                                                configurable: !0
                                            }));
                                        } else S.__lookupGetter__ && e.__lookupGetter__("value") && (t = e.__lookupGetter__("value"), 
                                        n = e.__lookupSetter__("value"), e.__defineGetter__("value", getter), e.__defineSetter__("value", setter));
                                        e.inputmask.__valueGet = t, e.inputmask.__valueSet = n;
                                    }
                                    e.inputmask._valueGet = function(e) {
                                        return g && !0 !== e ? t.call(this.el).split("").reverse().join("") : t.call(this.el);
                                    }, e.inputmask._valueSet = function(e, t) {
                                        n.call(this.el, null === e || e === G ? "" : !0 !== t && g ? e.split("").reverse().join("") : e);
                                    }, t === G && (t = function valueGet() {
                                        return this.value;
                                    }, n = function valueSet(e) {
                                        this.value = e;
                                    }, patchValhook(e.type), a = e, o.on(a, "mouseenter", function(e) {
                                        var t = N(this), n = this.inputmask._valueGet();
                                        n !== getBuffer().join("") && t.trigger("setvalue");
                                    }));
                                }
                            }
                            var t = e.getAttribute("type"), n = "INPUT" === e.tagName && -1 !== N.inArray(t, r.supportsInputType) || e.isContentEditable || "TEXTAREA" === e.tagName;
                            if (!n) if ("INPUT" === e.tagName) {
                                var a = S.createElement("input");
                                a.setAttribute("type", t), n = "text" === a.type, a = null;
                            } else n = "partial";
                            return !1 !== n ? patchValueProperty(e) : e.inputmask = G, n;
                        }
                        o.off(e);
                        var t = isElementTypeSupported(e, V);
                        if (!1 !== t && (i = N(l = e), r = l.placeholder, -1 === (m = l !== G ? l.maxLength : G) && (m = G), 
                        !0 === V.colorMask && initializeColorMask(l), P && ("inputmode" in l && (l.inputmode = V.inputmode, 
                        l.setAttribute("inputmode", V.inputmode)), !0 === V.disablePredictiveText && ("autocorrect" in l ? l.autocorrect = !1 : (!0 !== V.colorMask && initializeColorMask(l), 
                        l.type = "password"))), !0 === t && (l.setAttribute("im-insert", V.insertMode), 
                        o.on(l, "submit", v.submitEvent), o.on(l, "reset", v.resetEvent), o.on(l, "blur", v.blurEvent), 
                        o.on(l, "focus", v.focusEvent), !0 !== V.colorMask && (o.on(l, "click", v.clickEvent), 
                        o.on(l, "mouseleave", v.mouseleaveEvent), o.on(l, "mouseenter", v.mouseenterEvent)), 
                        o.on(l, "paste", v.pasteEvent), o.on(l, "cut", v.cutEvent), o.on(l, "complete", V.oncomplete), 
                        o.on(l, "incomplete", V.onincomplete), o.on(l, "cleared", V.oncleared), P || !0 === V.inputEventOnly ? l.removeAttribute("maxLength") : (o.on(l, "keydown", v.keydownEvent), 
                        o.on(l, "keypress", v.keypressEvent)), o.on(l, "input", v.inputFallBackEvent), o.on(l, "beforeinput", v.beforeInputEvent)), 
                        o.on(l, "setvalue", v.setValueEvent), d = getBufferTemplate().join(""), "" !== l.inputmask._valueGet(!0) || !1 === V.clearMaskOnLostFocus || S.activeElement === l)) {
                            var n = N.isFunction(V.onBeforeMask) && V.onBeforeMask.call(u, l.inputmask._valueGet(!0), V) || l.inputmask._valueGet(!0);
                            "" !== n && checkVal(l, !0, !1, n.split(""));
                            var a = getBuffer().slice();
                            d = a.join(""), !1 === isComplete(a) && V.clearIncomplete && resetMaskSet(), V.clearMaskOnLostFocus && S.activeElement !== l && (-1 === getLastValidPosition() ? a = [] : clearOptionalTail(a)), 
                            (!1 === V.clearMaskOnLostFocus || V.showMaskOnFocus && S.activeElement === l || "" !== l.inputmask._valueGet(!0)) && writeBuffer(l, a), 
                            S.activeElement === l && caret(l, seekNext(getLastValidPosition()));
                        }
                    }(l);
                    break;

                  case "format":
                    return n = (N.isFunction(V.onBeforeMask) && V.onBeforeMask.call(u, e.value, V) || e.value).split(""), 
                    checkVal.call(this, G, !0, !1, n), e.metadata ? {
                        value: g ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                        metadata: maskScope.call(this, {
                            action: "getmetadata"
                        }, t, V)
                    } : g ? getBuffer().slice().reverse().join("") : getBuffer().join("");

                  case "isValid":
                    e.value ? (n = e.value.split(""), checkVal.call(this, G, !0, !0, n)) : e.value = getBuffer().join("");
                    for (var f = getBuffer(), k = determineLastRequiredPosition(), b = f.length - 1; k < b && !isMask(b); b--) ;
                    return f.splice(k, b + 1 - k), isComplete(f) && e.value === getBuffer().join("");

                  case "getemptymask":
                    return getBufferTemplate().join("");

                  case "remove":
                    return l && l.inputmask && (N.data(l, "_inputmask_opts", null), i = N(l), l.inputmask._valueSet(V.autoUnmask ? unmaskedvalue(l) : l.inputmask._valueGet(!0)), 
                    o.off(l), l.inputmask.colorMask && ((p = l.inputmask.colorMask).removeChild(l), 
                    p.parentNode.insertBefore(l, p), p.parentNode.removeChild(p)), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(l), "value") && l.inputmask.__valueGet && Object.defineProperty(l, "value", {
                        get: l.inputmask.__valueGet,
                        set: l.inputmask.__valueSet,
                        configurable: !0
                    }) : S.__lookupGetter__ && l.__lookupGetter__("value") && l.inputmask.__valueGet && (l.__defineGetter__("value", l.inputmask.__valueGet), 
                    l.__defineSetter__("value", l.inputmask.__valueSet)), l.inputmask = G), l;

                  case "getmetadata":
                    if (N.isArray(t.metadata)) {
                        var y = getMaskTemplate(!0, 0, !1).join("");
                        return N.each(t.metadata, function(e, t) {
                            if (t.mask === y) return y = t, !1;
                        }), y;
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
                    oncomplete: N.noop,
                    onincomplete: N.noop,
                    oncleared: N.noop,
                    repeat: 0,
                    greedy: !1,
                    autoUnmask: !1,
                    removeMaskOnSubmit: !1,
                    clearMaskOnLostFocus: !0,
                    insertMode: !0,
                    clearIncomplete: !1,
                    alias: null,
                    onKeyDown: N.noop,
                    onBeforeMask: null,
                    onBeforePaste: function onBeforePaste(e, t) {
                        return N.isFunction(t.onBeforeMask) ? t.onBeforeMask.call(this, e, t) : e;
                    },
                    onBeforeWrite: null,
                    onUnMask: null,
                    showMaskOnFocus: !0,
                    showMaskOnHover: !0,
                    onKeyValidation: N.noop,
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
                    staticDefinitionSymbol: G,
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
                    e = e.nodeName ? [ e ] : e, N.each(e, function(e, t) {
                        var n = N.extend(!0, {}, i.opts);
                        if (function importAttributeOptions(n, e, a, i) {
                            if (!0 === e.importDataAttributes) {
                                var t, r, s, o, l = function importOption(e, t) {
                                    null !== (t = t !== G ? t : n.getAttribute(i + "-" + e)) && ("string" == typeof t && (0 === e.indexOf("on") ? t = M[t] : "false" === t ? t = !1 : "true" === t && (t = !0)), 
                                    a[e] = t);
                                }, u = n.getAttribute(i);
                                if (u && "" !== u && (u = u.replace(/'/g, '"'), r = JSON.parse("{" + u + "}")), 
                                r) for (o in s = G, r) if ("alias" === o.toLowerCase()) {
                                    s = r[o];
                                    break;
                                }
                                for (t in l("alias", s), a.alias && resolveAlias(a.alias, a, e), e) {
                                    if (r) for (o in s = G, r) if (o.toLowerCase() === t.toLowerCase()) {
                                        s = r[o];
                                        break;
                                    }
                                    l(t, s);
                                }
                            }
                            return N.extend(!0, e, a), ("rtl" === n.dir || e.rightAlign) && (n.style.textAlign = "right"), 
                            ("rtl" === n.dir || e.numericInput) && (n.dir = "ltr", n.removeAttribute("dir"), 
                            e.isRTL = !0), Object.keys(a).length;
                        }(t, n, N.extend(!0, {}, i.userOptions), i.dataAttribute)) {
                            var a = generateMaskSet(n, i.noMasksCache);
                            a !== G && (t.inputmask !== G && (t.inputmask.opts.autoUnmask = !0, t.inputmask.remove()), 
                            t.inputmask = new Inputmask(G, G, !0), t.inputmask.opts = n, t.inputmask.noMasksCache = i.noMasksCache, 
                            t.inputmask.userOptions = N.extend(!0, {}, i.userOptions), t.inputmask.isRTL = n.isRTL || n.numericInput, 
                            (t.inputmask.el = t).inputmask.maskset = a, N.data(t, "_inputmask_opts", n), maskScope.call(t.inputmask, {
                                action: "mask"
                            }));
                        }
                    }), e && e[0] && e[0].inputmask || this;
                },
                option: function option(e, t) {
                    return "string" == typeof e ? this.opts[e] : "object" === (void 0 === e ? "undefined" : T(e)) ? (N.extend(this.userOptions, e), 
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
                    this.el && N(this.el).trigger("setvalue", [ e ]);
                },
                analyseMask: function analyseMask(e, r, s) {
                    var t, n, a, i, o, l, u = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, c = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, f = !1, p = new MaskToken(), k = [], m = [];
                    function MaskToken(e, t, n, a) {
                        this.matches = [], this.openGroup = e || !1, this.alternatorGroup = !1, this.isGroup = e || !1, 
                        this.isOptional = t || !1, this.isQuantifier = n || !1, this.isAlternator = a || !1, 
                        this.quantifier = {
                            min: 1,
                            max: 1
                        };
                    }
                    function insertTestDefinition(n, e, a) {
                        a = a !== G ? a : n.matches.length;
                        var i = n.matches[a - 1];
                        if (r) 0 === e.indexOf("[") || f && /\\d|\\s|\\w]/i.test(e) || "." === e ? n.matches.splice(a++, 0, {
                            fn: new RegExp(e, s.casing ? "i" : ""),
                            optionality: !1,
                            newBlockMarker: i === G ? "master" : i.def !== e,
                            casing: null,
                            def: e,
                            placeholder: G,
                            nativeDef: e
                        }) : (f && (e = e[e.length - 1]), N.each(e.split(""), function(e, t) {
                            i = n.matches[a - 1], n.matches.splice(a++, 0, {
                                fn: null,
                                optionality: !1,
                                newBlockMarker: i === G ? "master" : i.def !== t && null !== i.fn,
                                casing: null,
                                def: s.staticDefinitionSymbol || t,
                                placeholder: s.staticDefinitionSymbol !== G ? t : G,
                                nativeDef: (f ? "'" : "") + t
                            });
                        })), f = !1; else {
                            var t = (s.definitions ? s.definitions[e] : G) || Inputmask.prototype.definitions[e];
                            t && !f ? n.matches.splice(a++, 0, {
                                fn: t.validator ? "string" == typeof t.validator ? new RegExp(t.validator, s.casing ? "i" : "") : new function() {
                                    this.test = t.validator;
                                }() : new RegExp("."),
                                optionality: !1,
                                newBlockMarker: i === G ? "master" : i.def !== (t.definitionSymbol || e),
                                casing: t.casing,
                                def: t.definitionSymbol || e,
                                placeholder: t.placeholder,
                                nativeDef: e
                            }) : (n.matches.splice(a++, 0, {
                                fn: null,
                                optionality: !1,
                                newBlockMarker: i === G ? "master" : i.def !== e && null !== i.fn,
                                casing: null,
                                def: s.staticDefinitionSymbol || e,
                                placeholder: s.staticDefinitionSymbol !== G ? e : G,
                                nativeDef: (f ? "'" : "") + e
                            }), f = !1);
                        }
                    }
                    function defaultCase() {
                        if (0 < k.length) {
                            if (insertTestDefinition(i = k[k.length - 1], n), i.isAlternator) {
                                o = k.pop();
                                for (var e = 0; e < o.matches.length; e++) o.matches[e].isGroup && (o.matches[e].isGroup = !1);
                                0 < k.length ? (i = k[k.length - 1]).matches.push(o) : p.matches.push(o);
                            }
                        } else insertTestDefinition(p, n);
                    }
                    function groupify(e) {
                        var t = new MaskToken(!0);
                        return t.openGroup = !1, t.matches = e, t;
                    }
                    for (r && (s.optionalmarker[0] = G, s.optionalmarker[1] = G); t = r ? c.exec(e) : u.exec(e); ) {
                        if (n = t[0], r) switch (n.charAt(0)) {
                          case "?":
                            n = "{0,1}";
                            break;

                          case "+":
                          case "*":
                            n = "{" + n + "}";
                        }
                        if (f) defaultCase(); else switch (n.charAt(0)) {
                          case "(?=":
                          case "(?!":
                          case "(?<=":
                          case "(?<!":
                            break;

                          case s.escapeChar:
                            f = !0, r && defaultCase();
                            break;

                          case s.optionalmarker[1]:
                          case s.groupmarker[1]:
                            if ((a = k.pop()).openGroup = !1, a !== G) if (0 < k.length) {
                                if ((i = k[k.length - 1]).matches.push(a), i.isAlternator) {
                                    o = k.pop();
                                    for (var d = 0; d < o.matches.length; d++) o.matches[d].isGroup = !1, o.matches[d].alternatorGroup = !1;
                                    0 < k.length ? (i = k[k.length - 1]).matches.push(o) : p.matches.push(o);
                                }
                            } else p.matches.push(a); else defaultCase();
                            break;

                          case s.optionalmarker[0]:
                            k.push(new MaskToken(!1, !0));
                            break;

                          case s.groupmarker[0]:
                            k.push(new MaskToken(!0));
                            break;

                          case s.quantifiermarker[0]:
                            var g = new MaskToken(!1, !1, !0), h = (n = n.replace(/[{}]/g, "")).split("|"), v = h[0].split(","), b = isNaN(v[0]) ? v[0] : parseInt(v[0]), y = 1 === v.length ? b : isNaN(v[1]) ? v[1] : parseInt(v[1]);
                            "*" !== b && "+" !== b || (b = "*" === y ? 0 : 1), g.quantifier = {
                                min: b,
                                max: y,
                                jit: h[1]
                            };
                            var M = 0 < k.length ? k[k.length - 1].matches : p.matches;
                            if ((t = M.pop()).isAlternator) {
                                M.push(t), M = t.matches;
                                var S = new MaskToken(!0), _ = M.pop();
                                M.push(S), M = S.matches, t = _;
                            }
                            t.isGroup || (t = groupify([ t ])), M.push(t), M.push(g);
                            break;

                          case s.alternatormarker:
                            var P = function groupQuantifier(e) {
                                var t = e.pop();
                                return t.isQuantifier && (t = groupify([ e.pop(), t ])), t;
                            };
                            if (0 < k.length) {
                                var E = (i = k[k.length - 1]).matches[i.matches.length - 1];
                                l = i.openGroup && (E.matches === G || !1 === E.isGroup && !1 === E.isAlternator) ? k.pop() : P(i.matches);
                            } else l = P(p.matches);
                            if (l.isAlternator) k.push(l); else if (l.alternatorGroup ? (o = k.pop(), l.alternatorGroup = !1) : o = new MaskToken(!1, !1, !1, !0), 
                            o.matches.push(l), k.push(o), l.openGroup) {
                                var x = new MaskToken(!(l.openGroup = !1));
                                x.alternatorGroup = !0, k.push(x);
                            }
                            break;

                          default:
                            defaultCase();
                        }
                    }
                    for (;0 < k.length; ) a = k.pop(), p.matches.push(a);
                    return 0 < p.matches.length && (function verifyGroupMarker(a) {
                        a && a.matches && N.each(a.matches, function(e, t) {
                            var n = a.matches[e + 1];
                            (n === G || n.matches === G || !1 === n.isQuantifier) && t && t.isGroup && (t.isGroup = !1, 
                            r || (insertTestDefinition(t, s.groupmarker[0], 0), !0 !== t.openGroup && insertTestDefinition(t, s.groupmarker[1]))), 
                            verifyGroupMarker(t);
                        });
                    }(p), m.push(p)), (s.numericInput || s.isRTL) && function reverseTokens(e) {
                        for (var t in e.matches = e.matches.reverse(), e.matches) if (e.matches.hasOwnProperty(t)) {
                            var n = parseInt(t);
                            if (e.matches[t].isQuantifier && e.matches[n + 1] && e.matches[n + 1].isGroup) {
                                var a = e.matches[t];
                                e.matches.splice(t, 1), e.matches.splice(n + 1, 0, a);
                            }
                            e.matches[t].matches !== G ? e.matches[t] = reverseTokens(e.matches[t]) : e.matches[t] = ((i = e.matches[t]) === s.optionalmarker[0] ? i = s.optionalmarker[1] : i === s.optionalmarker[1] ? i = s.optionalmarker[0] : i === s.groupmarker[0] ? i = s.groupmarker[1] : i === s.groupmarker[1] && (i = s.groupmarker[0]), 
                            i);
                        }
                        var i;
                        return e;
                    }(m[0]), m;
                }
            }, Inputmask.extendDefaults = function(e) {
                N.extend(!0, Inputmask.prototype.defaults, e);
            }, Inputmask.extendDefinitions = function(e) {
                N.extend(!0, Inputmask.prototype.definitions, e);
            }, Inputmask.extendAliases = function(e) {
                N.extend(!0, Inputmask.prototype.aliases, e);
            }, Inputmask.format = function(e, t, n) {
                return Inputmask(t).format(e, n);
            }, Inputmask.unmask = function(e, t) {
                return Inputmask(t).unmaskedvalue(e);
            }, Inputmask.isValid = function(e, t) {
                return Inputmask(t).isValid(e);
            }, Inputmask.remove = function(e) {
                "string" == typeof e && (e = S.getElementById(e) || S.querySelectorAll(e)), e = e.nodeName ? [ e ] : e, 
                N.each(e, function(e, t) {
                    t.inputmask && t.inputmask.remove();
                });
            }, Inputmask.setValue = function(e, n) {
                "string" == typeof e && (e = S.getElementById(e) || S.querySelectorAll(e)), e = e.nodeName ? [ e ] : e, 
                N.each(e, function(e, t) {
                    t.inputmask ? t.inputmask.setValue(n) : N(t).trigger("setvalue", [ n ]);
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
            }, Inputmask.dependencyLib = N, M.Inputmask = Inputmask;
        }) ? a.apply(t, i) : a) || (e.exports = r);
    }, function(e, t, n) {
        "use strict";
        var a, i, r, c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        i = [ n(2) ], void 0 === (r = "function" == typeof (a = function(t) {
            var p = t.document;
            function isWindow(e) {
                return null != e && e === e.window;
            }
            function isValidElement(e) {
                return e instanceof Element;
            }
            function DependencyLib(e) {
                return e instanceof DependencyLib ? e : this instanceof DependencyLib ? void (null != e && e !== t && (this[0] = e.nodeName ? e : void 0 !== e[0] && e[0].nodeName ? e[0] : p.querySelector(e), 
                void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(e);
            }
            return DependencyLib.prototype = {
                on: function on(e, n) {
                    if (isValidElement(this[0])) for (var t = function addEvent(e, t) {
                        i.addEventListener ? i.addEventListener(e, n, !1) : i.attachEvent && i.attachEvent("on" + e, n), 
                        a[e] = a[e] || {}, a[e][t] = a[e][t] || [], a[e][t].push(n);
                    }, a = this[0].eventRegistry, i = this[0], r = e.split(" "), s = 0; s < r.length; s++) {
                        var o = r[s].split(".");
                        t(o[0], o[1] || "global");
                    }
                    return this;
                },
                off: function off(e, o) {
                    if (isValidElement(this[0])) for (var t = function removeEvent(e, t, n) {
                        if (e in l == 1) if (i.removeEventListener ? i.removeEventListener(e, n, !1) : i.detachEvent && i.detachEvent("on" + e, n), 
                        "global" === t) for (var a in l[e]) l[e][a].splice(l[e][a].indexOf(n), 1); else l[e][t].splice(l[e][t].indexOf(n), 1);
                    }, n = function resolveNamespace(e, t) {
                        var n, a, i = [];
                        if (0 < e.length) if (void 0 === o) for (n = 0, a = l[e][t].length; n < a; n++) i.push({
                            ev: e,
                            namespace: t && 0 < t.length ? t : "global",
                            handler: l[e][t][n]
                        }); else i.push({
                            ev: e,
                            namespace: t && 0 < t.length ? t : "global",
                            handler: o
                        }); else if (0 < t.length) for (var r in l) for (var s in l[r]) if (s === t) if (void 0 === o) for (n = 0, 
                        a = l[r][s].length; n < a; n++) i.push({
                            ev: r,
                            namespace: s,
                            handler: l[r][s][n]
                        }); else i.push({
                            ev: r,
                            namespace: s,
                            handler: o
                        });
                        return i;
                    }, l = this[0].eventRegistry, i = this[0], a = e.split(" "), r = 0; r < a.length; r++) for (var s = a[r].split("."), u = n(s[0], s[1]), c = 0, f = u.length; c < f; c++) t(u[c].ev, u[c].namespace, u[c].handler);
                    return this;
                },
                trigger: function trigger(e) {
                    if (isValidElement(this[0])) for (var t = this[0].eventRegistry, n = this[0], a = "string" == typeof e ? e.split(" ") : [ e.type ], i = 0; i < a.length; i++) {
                        var r = a[i].split("."), s = r[0], o = r[1] || "global";
                        if (void 0 !== p && "global" === o) {
                            var l, u, c = {
                                bubbles: !0,
                                cancelable: !0,
                                detail: arguments[1]
                            };
                            if (p.createEvent) {
                                try {
                                    l = new CustomEvent(s, c);
                                } catch (e) {
                                    (l = p.createEvent("CustomEvent")).initCustomEvent(s, c.bubbles, c.cancelable, c.detail);
                                }
                                e.type && DependencyLib.extend(l, e), n.dispatchEvent(l);
                            } else (l = p.createEventObject()).eventType = s, l.detail = arguments[1], e.type && DependencyLib.extend(l, e), 
                            n.fireEvent("on" + l.eventType, l);
                        } else if (void 0 !== t[s]) if (e = e.type ? e : DependencyLib.Event(e), "global" === o) for (var f in t[s]) for (u = 0; u < t[s][f].length; u++) t[s][f][u].apply(n, arguments); else for (u = 0; u < t[s][o].length; u++) t[s][o][u].apply(n, arguments);
                    }
                    return this;
                }
            }, DependencyLib.isFunction = function(e) {
                return "function" == typeof e;
            }, DependencyLib.noop = function() {}, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function(e, t, n) {
                return null == t ? -1 : function indexOf(e, t) {
                    for (var n = 0, a = e.length; n < a; n++) if (e[n] === t) return n;
                    return -1;
                }(t, e);
            }, DependencyLib.valHooks = void 0, DependencyLib.isPlainObject = function(e) {
                return !("object" !== (void 0 === e ? "undefined" : c(e)) || e.nodeType || isWindow(e) || e.constructor && !Object.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf"));
            }, DependencyLib.extend = function() {
                var e, t, n, a, i, r, s = arguments[0] || {}, o = 1, l = arguments.length, u = !1;
                for ("boolean" == typeof s && (u = s, s = arguments[o] || {}, o++), "object" === (void 0 === s ? "undefined" : c(s)) || DependencyLib.isFunction(s) || (s = {}), 
                o === l && (s = this, o--); o < l; o++) if (null != (e = arguments[o])) for (t in e) n = s[t], 
                s !== (a = e[t]) && (u && a && (DependencyLib.isPlainObject(a) || (i = DependencyLib.isArray(a))) ? (r = i ? (i = !1, 
                n && DependencyLib.isArray(n) ? n : []) : n && DependencyLib.isPlainObject(n) ? n : {}, 
                s[t] = DependencyLib.extend(u, r, a)) : void 0 !== a && (s[t] = a));
                return s;
            }, DependencyLib.each = function(e, t) {
                var n = 0;
                if (function isArraylike(e) {
                    var t = "length" in e && e.length, n = void 0 === e ? "undefined" : c(e);
                    return "function" !== n && !isWindow(e) && (!(1 !== e.nodeType || !t) || "array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
                }(e)) for (var a = e.length; n < a && !1 !== t.call(e[n], n, e[n]); n++) ; else for (n in e) if (!1 === t.call(e[n], n, e[n])) break;
                return e;
            }, DependencyLib.data = function(e, t, n) {
                if (void 0 === n) return e.__data ? e.__data[t] : null;
                e.__data = e.__data || {}, e.__data[t] = n;
            }, "function" == typeof t.CustomEvent ? DependencyLib.Event = t.CustomEvent : (DependencyLib.Event = function(e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var n = p.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
            }).prototype = t.Event.prototype, DependencyLib;
        }) ? a.apply(t, i) : a) || (e.exports = r);
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
    } ]);
});