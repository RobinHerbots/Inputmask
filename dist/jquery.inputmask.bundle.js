/*
* jquery.inputmask.bundle
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.27
*/
!function($) {
    function isInputEventSupported(eventName) {
        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
        return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
        el = null, isSupported;
    }
    function isInputTypeSupported(inputType) {
        var isSupported = "text" == inputType || "tel" == inputType;
        if (!isSupported) {
            var el = document.createElement("input");
            el.setAttribute("type", inputType), isSupported = "text" === el.type, el = null;
        }
        return isSupported;
    }
    function resolveAlias(aliasStr, options, opts) {
        var aliasDefinition = opts.aliases[aliasStr];
        return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
        $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : !1;
    }
    function generateMaskSet(opts, multi) {
        function analyseMask(mask) {
            function maskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, 
                this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition(mtoken, element, position) {
                var maskdef = opts.definitions[element], newBlockMarker = 0 == mtoken.matches.length;
                if (position = void 0 != position ? position : mtoken.matches.length, maskdef && !escaped) {
                    for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
                        var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator.validator, cardinality = prevalidator.cardinality;
                        mtoken.matches.splice(position++, 0, {
                            fn: validator ? "string" == typeof validator ? new RegExp(validator) : new function() {
                                this.test = validator;
                            }() : new RegExp("."),
                            cardinality: cardinality ? cardinality : 1,
                            optionality: mtoken.isOptional,
                            newBlockMarker: newBlockMarker,
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            mask: element
                        });
                    }
                    mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator) : new function() {
                            this.test = maskdef.validator;
                        }() : new RegExp("."),
                        cardinality: maskdef.cardinality,
                        optionality: mtoken.isOptional,
                        newBlockMarker: newBlockMarker,
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        mask: element
                    });
                } else mtoken.matches.splice(position++, 0, {
                    fn: null,
                    cardinality: 0,
                    optionality: mtoken.isOptional,
                    newBlockMarker: newBlockMarker,
                    casing: null,
                    def: element,
                    placeholder: void 0,
                    mask: element
                }), escaped = !1;
            }
            for (var match, m, openingToken, currentOpeningToken, alternator, lastMatch, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g, escaped = !1, currentToken = new maskToken(), openenings = [], maskTokens = []; match = tokenizer.exec(mask); ) switch (m = match[0], 
            m.charAt(0)) {
              case opts.optionalmarker.end:
              case opts.groupmarker.end:
                if (openingToken = openenings.pop(), openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else currentToken.matches.push(openingToken);
                break;

              case opts.optionalmarker.start:
                openenings.push(new maskToken(!1, !0));
                break;

              case opts.groupmarker.start:
                openenings.push(new maskToken(!0));
                break;

              case opts.quantifiermarker.start:
                var quantifier = new maskToken(!1, !1, !0);
                m = m.replace(/[{}]/g, "");
                var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 == mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                if (("*" == mq1 || "+" == mq1) && (mq0 = "*" == mq1 ? 0 : 1), quantifier.quantifier = {
                    min: mq0,
                    max: mq1
                }, openenings.length > 0) {
                    var matches = openenings[openenings.length - 1].matches;
                    if (match = matches.pop(), !match.isGroup) {
                        var groupToken = new maskToken(!0);
                        groupToken.matches.push(match), match = groupToken;
                    }
                    matches.push(match), matches.push(quantifier);
                } else {
                    if (match = currentToken.matches.pop(), !match.isGroup) {
                        var groupToken = new maskToken(!0);
                        groupToken.matches.push(match), match = groupToken;
                    }
                    currentToken.matches.push(match), currentToken.matches.push(quantifier);
                }
                break;

              case opts.escapeChar:
                escaped = !0;
                break;

              case opts.alternatormarker:
                openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                lastMatch = currentOpeningToken.matches.pop()) : lastMatch = currentToken.matches.pop(), 
                lastMatch.isAlternator ? openenings.push(lastMatch) : (alternator = new maskToken(!1, !1, !1, !0), 
                alternator.matches.push(lastMatch), openenings.push(alternator));
                break;

              default:
                if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.length > 0 && (lastMatch = currentOpeningToken.matches[currentOpeningToken.matches.length - 1], 
                    lastMatch.isGroup && (lastMatch.isGroup = !1, insertTestDefinition(lastMatch, opts.groupmarker.start, 0), 
                    insertTestDefinition(lastMatch, opts.groupmarker.end))), insertTestDefinition(currentOpeningToken, m), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else currentToken.matches.length > 0 && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
                lastMatch.isGroup && (lastMatch.isGroup = !1, insertTestDefinition(lastMatch, opts.groupmarker.start, 0), 
                insertTestDefinition(lastMatch, opts.groupmarker.end))), insertTestDefinition(currentToken, m);
            }
            return currentToken.matches.length > 0 && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
            lastMatch.isGroup && (lastMatch.isGroup = !1, insertTestDefinition(lastMatch, opts.groupmarker.start, 0), 
            insertTestDefinition(lastMatch, opts.groupmarker.end)), maskTokens.push(currentToken)), 
            maskTokens;
        }
        function generateMask(mask, metadata) {
            if (opts.numericInput && opts.multi !== !0) {
                mask = mask.split("").reverse();
                for (var ndx = 0; ndx < mask.length; ndx++) mask[ndx] == opts.optionalmarker.start ? mask[ndx] = opts.optionalmarker.end : mask[ndx] == opts.optionalmarker.end ? mask[ndx] = opts.optionalmarker.start : mask[ndx] == opts.groupmarker.start ? mask[ndx] = opts.groupmarker.end : mask[ndx] == opts.groupmarker.end && (mask[ndx] = opts.groupmarker.start);
                mask = mask.join("");
            }
            if (void 0 == mask || "" == mask) return void 0;
            if (1 == mask.length && 0 == opts.greedy && 0 != opts.repeat && (opts.placeholder = ""), 
            opts.repeat > 0 || "*" == opts.repeat || "+" == opts.repeat) {
                var repeatStart = "*" == opts.repeat ? 0 : "+" == opts.repeat ? 1 : opts.repeat;
                mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
            }
            return void 0 == $.inputmask.masksCache[mask] && ($.inputmask.masksCache[mask] = {
                mask: mask,
                maskToken: analyseMask(mask),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: metadata
            }), $.extend(!0, {}, $.inputmask.masksCache[mask]);
        }
        var ms = void 0;
        if ($.isFunction(opts.mask) && (opts.mask = opts.mask.call(this, opts)), $.isArray(opts.mask)) if (multi) ms = [], 
        $.each(opts.mask, function(ndx, msk) {
            ms.push(void 0 == msk.mask || $.isFunction(msk.mask) ? generateMask(msk.toString(), msk) : generateMask(msk.mask.toString(), msk));
        }); else {
            opts.keepStatic = void 0 == opts.keepStatic ? !0 : opts.keepStatic;
            var altMask = "(";
            $.each(opts.mask, function(ndx, msk) {
                altMask.length > 1 && (altMask += ")|("), altMask += void 0 == msk.mask || $.isFunction(msk.mask) ? msk.toString() : msk.mask.toString();
            }), altMask += ")", ms = generateMask(altMask, opts.mask);
        } else opts.mask && (ms = void 0 == opts.mask.mask || $.isFunction(opts.mask.mask) ? generateMask(opts.mask.toString(), opts.mask) : generateMask(opts.mask.mask.toString(), opts.mask));
        return ms;
    }
    function maskScope(actionObj, maskset, opts) {
        function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
            minimalPos = minimalPos || 0;
            var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0;
            do {
                if (baseOnInput === !0 && getMaskSet().validPositions[pos]) {
                    var validPos = getMaskSet().validPositions[pos];
                    test = validPos.match, ndxIntlzr = validPos.locator.slice(), maskTemplate.push(includeInput === !0 ? validPos.input : getPlaceholder(pos, test));
                } else {
                    if (minimalPos > pos) {
                        var testPositions = getTests(pos, ndxIntlzr, pos - 1);
                        testPos = testPositions[0];
                    } else testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                    test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(getPlaceholder(pos, test));
                }
                pos++;
            } while ((void 0 == maxLength || maxLength > pos - 1) && null != test.fn || null == test.fn && "" != test.def || minimalPos >= pos);
            return maskTemplate.pop(), maskTemplate;
        }
        function getMaskSet() {
            return maskset;
        }
        function resetMaskSet(soft) {
            var maskset = getMaskSet();
            maskset.buffer = void 0, maskset.tests = {}, soft !== !0 && (maskset._buffer = void 0, 
            maskset.validPositions = {}, maskset.p = 0);
        }
        function getLastValidPosition(closestTo) {
            var maskset = getMaskSet(), lastValidPosition = -1, valids = maskset.validPositions;
            void 0 == closestTo && (closestTo = -1);
            var before = lastValidPosition, after = lastValidPosition;
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                (-1 == closestTo || null != valids[psNdx].match.fn) && (closestTo > psNdx && (before = psNdx), 
                psNdx >= closestTo && (after = psNdx));
            }
            return lastValidPosition = closestTo - before > 1 || closestTo > after ? before : after;
        }
        function setValidPosition(pos, validTest, fromSetValid) {
            if (opts.insertMode && void 0 != getMaskSet().validPositions[pos] && void 0 == fromSetValid) {
                var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition();
                for (i = pos; lvp >= i; i++) delete getMaskSet().validPositions[i];
                getMaskSet().validPositions[pos] = validTest;
                var j, valid = !0;
                for (i = pos; lvp >= i; i++) {
                    var t = positionsClone[i];
                    if (void 0 != t) {
                        var vps = getMaskSet().validPositions;
                        j = !opts.keepStatic && (void 0 != vps[i + 1] && getTests(i + 1, vps[i].locator.slice(), i).length > 1 || vps[i] && void 0 != vps[i].alternation) ? i + 1 : seekNext(i), 
                        valid = positionCanMatchDefinition(j, t.match.def) ? valid && isValid(j, t.input, !0, !0) !== !1 : null == t.match.fn;
                    }
                    if (!valid) break;
                }
                if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                !1;
            } else getMaskSet().validPositions[pos] = validTest;
            return !0;
        }
        function stripValidPositions(start, end) {
            var i, startPos = start;
            for (void 0 != getMaskSet().validPositions[start] && getMaskSet().validPositions[start].input == opts.radixPoint && (end++, 
            startPos++), i = startPos; end > i; i++) void 0 == getMaskSet().validPositions[i] || getMaskSet().validPositions[i].input == opts.radixPoint && i != getLastValidPosition() || delete getMaskSet().validPositions[i];
            for (i = end; i <= getLastValidPosition(); ) {
                var t = getMaskSet().validPositions[i], s = getMaskSet().validPositions[startPos];
                void 0 != t && void 0 == s ? (positionCanMatchDefinition(startPos, t.match.def) && isValid(startPos, t.input, !0) !== !1 && (delete getMaskSet().validPositions[i], 
                i++), startPos++) : i++;
            }
            var lvp = getLastValidPosition();
            lvp >= start && void 0 != getMaskSet().validPositions[lvp] && getMaskSet().validPositions[lvp].input == opts.radixPoint && delete getMaskSet().validPositions[lvp], 
            resetMaskSet(!0);
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            for (var testPos, testPositions = getTests(pos, ndxIntlzr, tstPs), lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = void 0 != lvTest.alternation ? lvTest.locator[lvTest.alternation].split(",") : [], ndx = 0; ndx < testPositions.length && (testPos = testPositions[ndx], 
            !opts.greedy && (!testPos.match || testPos.match.optionality !== !1 && testPos.match.newBlockMarker !== !1 || testPos.match.optionalQuantifier === !0 || void 0 != lvTest.alternation && (void 0 == testPos.locator[lvTest.alternation] || -1 != $.inArray(testPos.locator[lvTest.alternation].toString(), lvTestAltArr)))); ndx++) ;
            return testPos;
        }
        function getTest(pos) {
            return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos].match : getTests(pos)[0].match;
        }
        function positionCanMatchDefinition(pos, def) {
            for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def == def) {
                valid = !0;
                break;
            }
            return valid;
        }
        function getTests(pos, ndxIntlzr, tstPs) {
            function ResolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    if (testPos > 1e4) return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask), 
                    !0;
                    if (testPos == pos && void 0 == match.matches) return matches.push({
                        match: match,
                        locator: loopNdx.reverse()
                    }), !0;
                    if (void 0 != match.matches) {
                        if (match.isGroup && quantifierRecurse !== !0) {
                            if (match = handleMatch(maskToken.matches[tndx + 1], loopNdx)) return !0;
                        } else if (match.isOptional) {
                            var optionalToken = match;
                            if (match = ResolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                                var latestMatch = matches[matches.length - 1].match, isFirstMatch = 0 == $.inArray(latestMatch, optionalToken.matches);
                                isFirstMatch && (insertStop = !0), testPos = pos;
                            }
                        } else if (match.isAlternator) {
                            var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if (-1 == altIndex || "string" == typeof altIndex) {
                                var altIndexArr, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice();
                                "string" == typeof altIndex && (altIndexArr = altIndex.split(","));
                                for (var amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                                    matches = [], match = handleMatch(alternateToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) || match, 
                                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                    for (var i = 0; i < ndxInitializerClone.length; i++) ndxInitializer[i] = ndxInitializerClone[i];
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) for (var altMatch = maltMatches[ndx1], ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                        var altMatch2 = malternateMatches[ndx2];
                                        if (altMatch.match.mask == altMatch2.match.mask && ("string" != typeof altIndex || -1 != $.inArray(altMatch.locator[loopNdxCnt].toString(), altIndexArr))) {
                                            maltMatches.splice(ndx1, 1), altMatch2.locator[loopNdxCnt] = altMatch2.locator[loopNdxCnt] + "," + altMatch.locator[loopNdxCnt], 
                                            altMatch2.alternation = loopNdxCnt;
                                            break;
                                        }
                                    }
                                    malternateMatches = malternateMatches.concat(maltMatches);
                                }
                                "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                                    if (isFinite(ndx)) {
                                        var mamatch, altLocArr = lmnt.locator[loopNdxCnt].toString().split(",");
                                        lmnt.locator[loopNdxCnt] = void 0, lmnt.alternation = void 0;
                                        for (var alndx = 0; alndx < altLocArr.length; alndx++) mamatch = -1 != $.inArray(altLocArr[alndx], altIndexArr), 
                                        mamatch && (void 0 != lmnt.locator[loopNdxCnt] ? (lmnt.locator[loopNdxCnt] += ",", 
                                        lmnt.alternation = loopNdxCnt, lmnt.locator[loopNdxCnt] += altLocArr[alndx]) : lmnt.locator[loopNdxCnt] = parseInt(altLocArr[alndx]));
                                        if (void 0 != lmnt.locator[loopNdxCnt]) return lmnt;
                                    }
                                })), matches = currentMatches.concat(malternateMatches), insertStop = !0;
                            } else match = handleMatch(alternateToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                            if (match) return !0;
                        } else if (match.isQuantifier && quantifierRecurse !== !0) {
                            var qt = match;
                            opts.greedy = opts.greedy && isFinite(qt.quantifier.max);
                            for (var qndx = ndxInitializer.length > 0 && quantifierRecurse !== !0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && pos >= testPos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), !0)) {
                                    var latestMatch = matches[matches.length - 1].match;
                                    latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1;
                                    var isFirstMatch = 0 == $.inArray(latestMatch, tokenGroup.matches);
                                    if (isFirstMatch) {
                                        if (qndx > qt.quantifier.min - 1) {
                                            insertStop = !0, testPos = pos;
                                            break;
                                        }
                                        return !0;
                                    }
                                    return !0;
                                }
                            }
                        } else if (match = ResolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
                    } else testPos++;
                }
                for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (maskToken.matches[tndx].isQuantifier !== !0) {
                    var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                    if (match && testPos == pos) return match;
                    if (testPos > pos) break;
                }
            }
            var maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr || [ 0 ], matches = [], insertStop = !1;
            if (void 0 == ndxIntlzr) {
                for (var test, previousPos = pos - 1; void 0 == (test = getMaskSet().validPositions[previousPos]) && previousPos > -1; ) previousPos--;
                if (void 0 != test && previousPos > -1) testPos = previousPos, ndxInitializer = test.locator.slice(); else {
                    for (previousPos = pos - 1; void 0 == (test = getMaskSet().tests[previousPos]) && previousPos > -1; ) previousPos--;
                    void 0 != test && previousPos > -1 && (testPos = previousPos, ndxInitializer = test[0].locator.slice());
                }
            }
            for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                var match = ResolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
                if (match && testPos == pos || testPos > pos) break;
            }
            return (0 == matches.length || insertStop) && matches.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: ""
                },
                locator: []
            }), getMaskSet().tests[pos] = $.extend(!0, [], matches), getMaskSet().tests[pos];
        }
        function getBufferTemplate() {
            return void 0 == getMaskSet()._buffer && (getMaskSet()._buffer = getMaskTemplate(!1, 1)), 
            getMaskSet()._buffer;
        }
        function getBuffer() {
            return void 0 == getMaskSet().buffer && (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)), 
            getMaskSet().buffer;
        }
        function refreshFromBuffer(start, end) {
            var buffer = getBuffer().slice();
            if (start === !0) resetMaskSet(), start = 0, end = buffer.length; else for (var i = start; end > i; i++) delete getMaskSet().validPositions[i], 
            delete getMaskSet().tests[i];
            for (var i = start; end > i; i++) buffer[i] != opts.skipOptionalPartCharacter && isValid(i, buffer[i], !0, !0);
        }
        function casing(elem, test) {
            switch (test.casing) {
              case "upper":
                elem = elem.toUpperCase();
                break;

              case "lower":
                elem = elem.toLowerCase();
            }
            return elem;
        }
        function isValid(pos, c, strict, fromSetValid) {
            function _isValid(position, c, strict, fromSetValid) {
                var rslt = !1;
                return $.each(getTests(position), function(ndx, tst) {
                    for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = (getBuffer(), test.cardinality); i > loopend; i--) chrs += getBufferElement(position - (i - 1));
                    if (c && (chrs += c), rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts) : c != test.def && c != opts.skipOptionalPartCharacter || "" == test.def ? !1 : {
                        c: test.def,
                        pos: position
                    }, rslt !== !1) {
                        var elem = void 0 != rslt.c ? rslt.c : c;
                        elem = elem == opts.skipOptionalPartCharacter && null === test.fn ? test.def : elem;
                        var validatedPos = position;
                        if (void 0 != rslt.remove && stripValidPositions(rslt.remove, rslt.remove + 1), 
                        rslt.refreshFromBuffer) {
                            var refresh = rslt.refreshFromBuffer;
                            if (strict = !0, refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end), 
                            void 0 == rslt.pos && void 0 == rslt.c) return rslt.pos = getLastValidPosition(), 
                            !1;
                            if (validatedPos = void 0 != rslt.pos ? rslt.pos : position, validatedPos != position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
                            !1;
                        } else if (rslt !== !0 && void 0 != rslt.pos && rslt.pos != position && (validatedPos = rslt.pos, 
                        refreshFromBuffer(position, validatedPos), validatedPos != position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
                        !1;
                        return 1 != rslt && void 0 == rslt.pos && void 0 == rslt.c ? !1 : (ndx > 0 && resetMaskSet(!0), 
                        setValidPosition(validatedPos, $.extend({}, tst, {
                            input: casing(elem, test)
                        }), fromSetValid) || (rslt = !1), !1);
                    }
                }), rslt;
            }
            function alternate(pos, c, strict, fromSetValid) {
                var lastAlt, alternation, validPsClone = $.extend(!0, {}, getMaskSet().validPositions);
                for (lastAlt = getLastValidPosition(); lastAlt >= 0; lastAlt--) if (getMaskSet().validPositions[lastAlt] && void 0 != getMaskSet().validPositions[lastAlt].alternation) {
                    alternation = getMaskSet().validPositions[lastAlt].alternation;
                    break;
                }
                if (void 0 != alternation) for (var decisionPos in getMaskSet().validPositions) if (parseInt(decisionPos) > parseInt(lastAlt) && void 0 === getMaskSet().validPositions[decisionPos].alternation) {
                    for (var altPos = getMaskSet().validPositions[decisionPos], decisionTaker = altPos.locator[alternation], altNdxs = getMaskSet().validPositions[lastAlt].locator[alternation].split(","), mndx = 0; mndx < altNdxs.length; mndx++) if (decisionTaker < altNdxs[mndx]) {
                        for (var possibilityPos, possibilities, dp = decisionPos - 1; dp >= 0; dp--) if (possibilityPos = getMaskSet().validPositions[dp], 
                        void 0 != possibilityPos) {
                            possibilities = possibilityPos.locator[alternation], possibilityPos.locator[alternation] = altNdxs[mndx];
                            break;
                        }
                        if (decisionTaker != possibilityPos.locator[alternation]) {
                            for (var buffer = getBuffer().slice(), i = decisionPos; i < getLastValidPosition() + 1; i++) delete getMaskSet().validPositions[i], 
                            delete getMaskSet().tests[i];
                            resetMaskSet(!0), opts.keepStatic = !opts.keepStatic;
                            for (var i = decisionPos; i < buffer.length; i++) buffer[i] != opts.skipOptionalPartCharacter && isValid(getLastValidPosition() + 1, buffer[i], !1, !0);
                            possibilityPos.locator[alternation] = possibilities;
                            var isValidRslt = isValid(pos, c, strict, fromSetValid);
                            if (opts.keepStatic = !opts.keepStatic, isValidRslt) return isValidRslt;
                            resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone);
                        }
                    }
                    break;
                }
                return !1;
            }
            strict = strict === !0;
            for (var buffer = getBuffer(), pndx = pos - 1; pndx > -1 && (!getMaskSet().validPositions[pndx] || null != getMaskSet().validPositions[pndx].match.fn); pndx--) void 0 == getMaskSet().validPositions[pndx] && (!isMask(pndx) || buffer[pndx] != getPlaceholder(pndx)) && getTests(pndx).length > 1 && _isValid(pndx, buffer[pndx], !0);
            var maskPos = pos, result = !1;
            if (fromSetValid && maskPos >= getMaskLength() && resetMaskSet(!0), maskPos < getMaskLength() && (result = _isValid(maskPos, c, strict, fromSetValid), 
            !strict && result === !1)) {
                var currentPosValid = getMaskSet().validPositions[maskPos];
                if (!currentPosValid || null != currentPosValid.match.fn || currentPosValid.match.def != c && c != opts.skipOptionalPartCharacter) {
                    if ((opts.insertMode || void 0 == getMaskSet().validPositions[seekNext(maskPos)]) && !isMask(maskPos)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); snPos >= nPos; nPos++) if (result = _isValid(nPos, c, strict, fromSetValid), 
                    result !== !1) {
                        maskPos = nPos;
                        break;
                    }
                } else result = {
                    caret: seekNext(maskPos)
                };
            }
            return result === !1 && opts.keepStatic && isComplete(buffer) && (result = alternate(pos, c, strict, fromSetValid)), 
            result === !0 && (result = {
                pos: maskPos
            }), result;
        }
        function isMask(pos) {
            var test = getTest(pos);
            return null != test.fn ? test.fn : !1;
        }
        function getMaskLength() {
            var maskLength;
            if (maxLength = $el.prop("maxLength"), -1 == maxLength && (maxLength = void 0), 
            0 == opts.greedy) {
                var pos, lvp = getLastValidPosition(), testPos = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 != testPos ? testPos.locator.slice() : void 0;
                for (pos = lvp + 1; void 0 == testPos || null != testPos.match.fn || null == testPos.match.fn && "" != testPos.match.def; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
                ndxIntlzr = testPos.locator.slice();
                maskLength = pos;
            } else maskLength = getBuffer().length;
            return void 0 == maxLength || maxLength > maskLength ? maskLength : maxLength;
        }
        function seekNext(pos) {
            var maskL = getMaskLength();
            if (pos >= maskL) return maskL;
            for (var position = pos; ++position < maskL && !isMask(position) && (opts.nojumps !== !0 || opts.nojumpsThreshold > position); ) ;
            return position;
        }
        function seekPrevious(pos) {
            var position = pos;
            if (0 >= position) return 0;
            for (;--position > 0 && !isMask(position); ) ;
            return position;
        }
        function getBufferElement(position) {
            return void 0 == getMaskSet().validPositions[position] ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
        }
        function writeBuffer(input, buffer, caretPos) {
            input._valueSet(buffer.join("")), void 0 != caretPos && caret(input, caretPos);
        }
        function getPlaceholder(pos, test) {
            test = test || getTest(pos);
            var placeholder = $.isFunction(test.placeholder) ? test.placeholder.call(this, opts) : test.placeholder;
            return void 0 != placeholder ? placeholder : null == test.fn ? test.def : opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        function checkVal(input, writeOut, strict, nptvl, intelliCheck) {
            var inputValue = void 0 != nptvl ? nptvl.slice() : truncateInput(input._valueGet()).split("");
            if (resetMaskSet(), writeOut && input._valueSet(""), $.each(inputValue, function(ndx, charCode) {
                if (intelliCheck === !0) {
                    var lvp = getLastValidPosition(), pos = -1 == lvp ? ndx : seekNext(lvp);
                    -1 == $.inArray(charCode, getBufferTemplate().slice(lvp + 1, pos)) && keypressEvent.call(input, void 0, !0, charCode.charCodeAt(0), !1, strict, strict ? ndx : getMaskSet().p);
                } else keypressEvent.call(input, void 0, !0, charCode.charCodeAt(0), !1, strict, strict ? ndx : getMaskSet().p), 
                strict = strict || ndx > 0 && ndx > getMaskSet().p;
            }), writeOut) {
                var keypressResult = opts.onKeyPress.call(this, void 0, getBuffer(), 0, opts);
                handleOnKeyResult(input, keypressResult), writeBuffer(input, getBuffer(), $(input).is(":focus") ? seekNext(getLastValidPosition(0)) : void 0);
            }
        }
        function escapeRegex(str) {
            return $.inputmask.escapeRegex.call(this, str);
        }
        function truncateInput(inputValue) {
            return inputValue.replace(new RegExp("(" + escapeRegex(getBufferTemplate().join("")) + ")*$"), "");
        }
        function unmaskedvalue($input) {
            if ($input.data("_inputmask") && !$input.hasClass("hasDatepicker")) {
                var umValue = [], vps = getMaskSet().validPositions;
                for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
                var unmaskedValue = (isRTL ? umValue.reverse() : umValue).join(""), bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                return $.isFunction(opts.onUnMask) && (unmaskedValue = opts.onUnMask.call($input, bufferValue, unmaskedValue, opts) || unmaskedValue), 
                unmaskedValue;
            }
            return $input[0]._valueGet();
        }
        function TranslatePosition(pos) {
            if (isRTL && "number" == typeof pos && (!opts.greedy || "" != opts.placeholder)) {
                var bffrLght = getBuffer().length;
                pos = bffrLght - pos;
            }
            return pos;
        }
        function caret(input, begin, end) {
            var range, npt = input.jquery && input.length > 0 ? input[0] : input;
            if ("number" != typeof begin) {
                var data = $(npt).data("_inputmask");
                return !$(npt).is(":visible") && data && void 0 != data.caret ? (begin = data.caret.begin, 
                end = data.caret.end) : npt.setSelectionRange ? (begin = npt.selectionStart, end = npt.selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
                begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), 
                begin = TranslatePosition(begin), end = TranslatePosition(end), {
                    begin: begin,
                    end: end
                };
            }
            begin = TranslatePosition(begin), end = TranslatePosition(end), end = "number" == typeof end ? end : begin;
            var data = $(npt).data("_inputmask") || {};
            data.caret = {
                begin: begin,
                end: end
            }, $(npt).data("_inputmask", data), $(npt).is(":visible") && (npt.scrollLeft = npt.scrollWidth, 
            0 == opts.insertMode && begin == end && end++, npt.setSelectionRange ? (npt.selectionStart = begin, 
            npt.selectionEnd = end) : npt.createTextRange && (range = npt.createTextRange(), 
            range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), 
            range.select()));
        }
        function determineLastRequiredPosition(returnDefinition) {
            var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 != lvTest ? lvTest.locator.slice() : void 0;
            for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
            var lvTestAltArr = lvTest && void 0 != lvTest.alternation ? lvTest.locator[lvTest.alternation].split(",") : [];
            for (pos = bl - 1; pos > lvp && (testPos = positions[pos].match, (testPos.optionality || testPos.optionalQuantifier || lvTest && void 0 != lvTest.alternation && void 0 != positions[pos].locator[lvTest.alternation] && -1 != $.inArray(positions[pos].locator[lvTest.alternation].toString(), lvTestAltArr)) && buffer[pos] == getPlaceholder(pos, testPos)); pos--) bl--;
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : void 0
            } : bl;
        }
        function clearOptionalTail(input) {
            for (var buffer = getBuffer(), tmpBuffer = buffer.slice(), rl = determineLastRequiredPosition(), lmib = tmpBuffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            tmpBuffer.splice(rl, lmib + 1 - rl), writeBuffer(input, tmpBuffer);
        }
        function isComplete(buffer) {
            if ($.isFunction(opts.isComplete)) return opts.isComplete.call($el, buffer, opts);
            if ("*" == opts.repeat) return void 0;
            var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l), lvp = getLastValidPosition();
            if (lvp == aml && (void 0 == lrp.def || lrp.def.newBlockMarker || lrp.def.optionalQuantifier)) {
                complete = !0;
                for (var i = 0; aml >= i; i++) {
                    var mask = isMask(i);
                    if (mask && (void 0 == buffer[i] || buffer[i] == getPlaceholder(i)) || !mask && buffer[i] != getPlaceholder(i)) {
                        complete = !1;
                        break;
                    }
                }
            }
            return complete;
        }
        function isSelection(begin, end) {
            return isRTL ? begin - end > 1 || begin - end == 1 && opts.insertMode : end - begin > 1 || end - begin == 1 && opts.insertMode;
        }
        function installEventRuler(npt) {
            var events = $._data(npt).events;
            $.each(events, function(eventType, eventHandlers) {
                $.each(eventHandlers, function(ndx, eventHandler) {
                    if ("inputmask" == eventHandler.namespace && "setvalue" != eventHandler.type) {
                        var handler = eventHandler.handler;
                        eventHandler.handler = function(e) {
                            return this.readOnly || this.disabled ? void e.preventDefault : handler.apply(this, arguments);
                        };
                    }
                });
            });
        }
        function patchValueProperty(npt) {
            function PatchValhook(type) {
                if (void 0 == $.valHooks[type] || 1 != $.valHooks[type].inputmaskpatch) {
                    var valueGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                        return elem.value;
                    }, valueSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                        return elem.value = value, elem;
                    };
                    $.valHooks[type] = {
                        get: function(elem) {
                            var $elem = $(elem);
                            if ($elem.data("_inputmask")) {
                                if ($elem.data("_inputmask").opts.autoUnmask) return $elem.inputmask("unmaskedvalue");
                                var result = valueGet(elem), inputData = $elem.data("_inputmask"), maskset = inputData.maskset, bufferTemplate = maskset._buffer;
                                return bufferTemplate = bufferTemplate ? bufferTemplate.join("") : "", result != bufferTemplate ? result : "";
                            }
                            return valueGet(elem);
                        },
                        set: function(elem, value) {
                            var result, $elem = $(elem), inputData = $elem.data("_inputmask");
                            return inputData ? (result = valueSet(elem, $.isFunction(inputData.opts.onBeforeMask) ? inputData.opts.onBeforeMask.call(el, value, inputData.opts) || value : value), 
                            $elem.triggerHandler("setvalue.inputmask")) : result = valueSet(elem, value), result;
                        },
                        inputmaskpatch: !0
                    };
                }
            }
            function getter() {
                var $self = $(this), inputData = $(this).data("_inputmask");
                return inputData ? inputData.opts.autoUnmask ? $self.inputmask("unmaskedvalue") : valueGet.call(this) != getBufferTemplate().join("") ? valueGet.call(this) : "" : valueGet.call(this);
            }
            function setter(value) {
                var inputData = $(this).data("_inputmask");
                inputData ? (valueSet.call(this, $.isFunction(inputData.opts.onBeforeMask) ? inputData.opts.onBeforeMask.call(el, value, inputData.opts) || value : value), 
                $(this).triggerHandler("setvalue.inputmask")) : valueSet.call(this, value);
            }
            function InstallNativeValueSetFallback(npt) {
                $(npt).bind("mouseenter.inputmask", function() {
                    var $input = $(this), input = this, value = input._valueGet();
                    "" != value && value != getBuffer().join("") && $input.trigger("setvalue");
                });
                var events = $._data(npt).events, handlers = events.mouseover;
                if (handlers) {
                    for (var ourHandler = handlers[handlers.length - 1], i = handlers.length - 1; i > 0; i--) handlers[i] = handlers[i - 1];
                    handlers[0] = ourHandler;
                }
            }
            var valueGet, valueSet;
            if (!npt._valueGet) {
                if (Object.getOwnPropertyDescriptor) {
                    Object.getOwnPropertyDescriptor(npt, "value");
                }
                document.__lookupGetter__ && npt.__lookupGetter__("value") ? (valueGet = npt.__lookupGetter__("value"), 
                valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                npt.__defineSetter__("value", setter)) : (valueGet = function() {
                    return npt.value;
                }, valueSet = function(value) {
                    npt.value = value;
                }, PatchValhook(npt.type), InstallNativeValueSetFallback(npt)), npt._valueGet = function() {
                    return isRTL ? valueGet.call(this).split("").reverse().join("") : valueGet.call(this);
                }, npt._valueSet = function(value) {
                    valueSet.call(this, isRTL ? value.split("").reverse().join("") : value);
                };
            }
        }
        function handleRemove(input, k, pos) {
            function generalize() {
                if (opts.keepStatic) {
                    resetMaskSet(!0);
                    var lastAlt, validInputs = [];
                    for (lastAlt = getLastValidPosition(); lastAlt >= 0; lastAlt--) if (getMaskSet().validPositions[lastAlt]) {
                        if (void 0 != getMaskSet().validPositions[lastAlt].alternation) break;
                        validInputs.push(getMaskSet().validPositions[lastAlt].input), delete getMaskSet().validPositions[lastAlt];
                    }
                    if (lastAlt > 0) for (;validInputs.length > 0; ) getMaskSet().p = seekNext(getLastValidPosition()), 
                    keypressEvent.call(input, void 0, !0, validInputs.pop().charCodeAt(0), !1, !1, getMaskSet().p);
                }
            }
            if ((opts.numericInput || isRTL) && (k == $.inputmask.keyCode.BACKSPACE ? k = $.inputmask.keyCode.DELETE : k == $.inputmask.keyCode.DELETE && (k = $.inputmask.keyCode.BACKSPACE), 
            isRTL)) {
                var pend = pos.end;
                pos.end = pos.begin, pos.begin = pend;
            }
            k == $.inputmask.keyCode.BACKSPACE && pos.end - pos.begin <= 1 ? pos.begin = seekPrevious(pos.begin) : k == $.inputmask.keyCode.DELETE && pos.begin == pos.end && pos.end++, 
            stripValidPositions(pos.begin, pos.end), generalize();
            var firstMaskedPos = getLastValidPosition(pos.begin);
            firstMaskedPos < pos.begin ? (-1 == firstMaskedPos && resetMaskSet(), getMaskSet().p = seekNext(firstMaskedPos)) : getMaskSet().p = pos.begin;
        }
        function handleOnKeyResult(input, keyResult, caretPos) {
            if (keyResult && keyResult.refreshFromBuffer) {
                var refresh = keyResult.refreshFromBuffer;
                refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end), resetMaskSet(!0), 
                void 0 != caretPos && (writeBuffer(input, getBuffer()), caret(input, keyResult.caret || caretPos.begin, keyResult.caret || caretPos.end));
            }
        }
        function keydownEvent(e) {
            skipKeyPressEvent = !1;
            var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
            k == $.inputmask.keyCode.BACKSPACE || k == $.inputmask.keyCode.DELETE || iphone && 127 == k || e.ctrlKey && 88 == k ? (e.preventDefault(), 
            88 == k && (valueOnFocus = getBuffer().join("")), handleRemove(input, k, pos), writeBuffer(input, getBuffer(), getMaskSet().p), 
            input._valueGet() == getBufferTemplate().join("") && $input.trigger("cleared"), 
            opts.showTooltip && $input.prop("title", getMaskSet().mask)) : k == $.inputmask.keyCode.END || k == $.inputmask.keyCode.PAGE_DOWN ? setTimeout(function() {
                var caretPos = seekNext(getLastValidPosition());
                opts.insertMode || caretPos != getMaskLength() || e.shiftKey || caretPos--, caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
            }, 0) : k == $.inputmask.keyCode.HOME && !e.shiftKey || k == $.inputmask.keyCode.PAGE_UP ? caret(input, 0, e.shiftKey ? pos.begin : 0) : k == $.inputmask.keyCode.ESCAPE || 90 == k && e.ctrlKey ? (checkVal(input, !0, !1, valueOnFocus.split("")), 
            $input.click()) : k != $.inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? 0 != opts.insertMode || e.shiftKey || (k == $.inputmask.keyCode.RIGHT ? setTimeout(function() {
                var caretPos = caret(input);
                caret(input, caretPos.begin);
            }, 0) : k == $.inputmask.keyCode.LEFT && setTimeout(function() {
                var caretPos = caret(input);
                caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
            }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin != getMaskLength() ? pos.begin : pos.begin - 1));
            var currentCaretPos = caret(input), keydownResult = opts.onKeyDown.call(this, e, getBuffer(), currentCaretPos.begin, opts);
            handleOnKeyResult(input, keydownResult, currentCaretPos), ignorable = -1 != $.inArray(k, opts.ignorables);
        }
        function keypressEvent(e, checkval, k, writeOut, strict, ndx) {
            if (void 0 == k && skipKeyPressEvent) return !1;
            skipKeyPressEvent = !0;
            var input = this, $input = $(input);
            e = e || window.event;
            var k = checkval ? k : e.which || e.charCode || e.keyCode;
            if (!(checkval === !0 || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return !0;
            if (k) {
                checkval !== !0 && 46 == k && 0 == e.shiftKey && "," == opts.radixPoint && (k = 44);
                var forwardPosition, pos = checkval ? {
                    begin: ndx,
                    end: ndx
                } : caret(input), c = String.fromCharCode(k), isSlctn = isSelection(pos.begin, pos.end);
                isSlctn && (getMaskSet().undoPositions = $.extend(!0, {}, getMaskSet().validPositions), 
                handleRemove(input, $.inputmask.keyCode.DELETE, pos), opts.insertMode || (opts.insertMode = !opts.insertMode, 
                setValidPosition(pos.begin, strict), opts.insertMode = !opts.insertMode), isSlctn = !opts.multi), 
                getMaskSet().writeOutBuffer = !0;
                var p = isRTL && !isSlctn ? pos.end : pos.begin, valResult = isValid(p, c, strict);
                if (valResult !== !1) {
                    if (valResult !== !0 && (p = void 0 != valResult.pos ? valResult.pos : p, c = void 0 != valResult.c ? valResult.c : c), 
                    resetMaskSet(!0), void 0 != valResult.caret) forwardPosition = valResult.caret; else {
                        var vps = getMaskSet().validPositions;
                        forwardPosition = !opts.keepStatic && (void 0 != vps[p + 1] && getTests(p + 1, vps[p].locator.slice(), p).length > 1 || void 0 != vps[p].alternation) ? p + 1 : seekNext(p);
                    }
                    getMaskSet().p = forwardPosition;
                }
                if (writeOut !== !1) {
                    var self = this;
                    if (setTimeout(function() {
                        opts.onKeyValidation.call(self, valResult, opts);
                    }, 0), getMaskSet().writeOutBuffer && valResult !== !1) {
                        var buffer = getBuffer();
                        writeBuffer(input, buffer, checkval ? void 0 : opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition), 
                        checkval !== !0 && setTimeout(function() {
                            isComplete(buffer) === !0 && $input.trigger("complete"), skipInputEvent = !0, $input.trigger("input");
                        }, 0);
                    } else isSlctn && (getMaskSet().buffer = void 0, getMaskSet().validPositions = getMaskSet().undoPositions);
                } else isSlctn && (getMaskSet().buffer = void 0, getMaskSet().validPositions = getMaskSet().undoPositions);
                if (opts.showTooltip && $input.prop("title", getMaskSet().mask), e && 1 != checkval) {
                    e.preventDefault();
                    var currentCaretPos = caret(input), keypressResult = opts.onKeyPress.call(this, e, getBuffer(), currentCaretPos.begin, opts);
                    handleOnKeyResult(input, keypressResult, currentCaretPos);
                }
            }
        }
        function keyupEvent(e) {
            var $input = $(this), input = this, k = e.keyCode, buffer = getBuffer(), currentCaretPos = caret(input), keyupResult = opts.onKeyUp.call(this, e, buffer, currentCaretPos.begin, opts);
            handleOnKeyResult(input, keyupResult, currentCaretPos), k == $.inputmask.keyCode.TAB && opts.showMaskOnFocus && ($input.hasClass("focus-inputmask") && 0 == input._valueGet().length ? (resetMaskSet(), 
            buffer = getBuffer(), writeBuffer(input, buffer), caret(input, 0), valueOnFocus = getBuffer().join("")) : (writeBuffer(input, buffer), 
            caret(input, TranslatePosition(0), TranslatePosition(getMaskLength()))));
        }
        function pasteEvent(e) {
            if (skipInputEvent === !0 && "input" == e.type) return skipInputEvent = !1, !0;
            var input = this, $input = $(input), inputValue = input._valueGet();
            if ("propertychange" == e.type && input._valueGet().length <= getMaskLength()) return !0;
            "paste" == e.type && (window.clipboardData && window.clipboardData.getData ? inputValue = window.clipboardData.getData("Text") : e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData && (inputValue = e.originalEvent.clipboardData.getData("text/plain")));
            var pasteValue = $.isFunction(opts.onBeforePaste) ? opts.onBeforePaste.call(input, inputValue, opts) || inputValue : inputValue;
            return checkVal(input, !0, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.split(""), !0), 
            $input.click(), isComplete(getBuffer()) === !0 && $input.trigger("complete"), !1;
        }
        function mobileInputEvent(e) {
            if (skipInputEvent === !0 && "input" == e.type) return skipInputEvent = !1, !0;
            var input = this, caretPos = caret(input), currentValue = input._valueGet();
            currentValue = currentValue.replace(new RegExp("(" + escapeRegex(getBufferTemplate().join("")) + ")*"), ""), 
            caretPos.begin > currentValue.length && (caret(input, currentValue.length), caretPos = caret(input)), 
            getBuffer().length - currentValue.length != 1 || currentValue.charAt(caretPos.begin) == getBuffer()[caretPos.begin] || currentValue.charAt(caretPos.begin + 1) == getBuffer()[caretPos.begin] || isMask(caretPos.begin) || (e.keyCode = $.inputmask.keyCode.BACKSPACE, 
            keydownEvent.call(input, e)), e.preventDefault();
        }
        function inputFallBackEvent(e) {
            if (skipInputEvent === !0 && "input" == e.type) return skipInputEvent = !1, !0;
            var input = this, caretPos = caret(input), currentValue = input._valueGet();
            caret(input, caretPos.begin - 1);
            var keypress = $.Event("keypress");
            keypress.which = currentValue.charCodeAt(caretPos.begin - 1), skipKeyPressEvent = !1, 
            ignorable = !1, keypressEvent.call(input, keypress, void 0, void 0, !1);
            var forwardPosition = getMaskSet().p;
            writeBuffer(input, getBuffer(), opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition), 
            e.preventDefault();
        }
        function compositionupdateEvent(e) {
            skipInputEvent = !0;
            var input = this;
            return setTimeout(function() {
                caret(input, caret(input).begin - 1);
                var keypress = $.Event("keypress");
                keypress.which = e.originalEvent.data.charCodeAt(0), skipKeyPressEvent = !1, ignorable = !1, 
                keypressEvent.call(input, keypress, void 0, void 0, !1);
                var forwardPosition = getMaskSet().p;
                writeBuffer(input, getBuffer(), opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition);
            }, 0), !1;
        }
        function mask(el) {
            if ($el = $(el), $el.is(":input") && isInputTypeSupported($el.attr("type"))) {
                if ($el.data("_inputmask", {
                    maskset: maskset,
                    opts: opts,
                    isRTL: !1
                }), opts.showTooltip && $el.prop("title", getMaskSet().mask), ("rtl" == el.dir || opts.rightAlign) && $el.css("text-align", "right"), 
                "rtl" == el.dir || opts.numericInput) {
                    el.dir = "ltr", $el.removeAttr("dir");
                    var inputData = $el.data("_inputmask");
                    inputData.isRTL = !0, $el.data("_inputmask", inputData), isRTL = !0;
                }
                $el.unbind(".inputmask"), $el.removeClass("focus-inputmask"), $el.closest("form").bind("submit", function() {
                    valueOnFocus != getBuffer().join("") && $el.change(), $el[0]._valueGet && $el[0]._valueGet() == getBufferTemplate().join("") && $el[0]._valueSet(""), 
                    opts.autoUnmask && opts.removeMaskOnSubmit && $el.inputmask("remove");
                }).bind("reset", function() {
                    setTimeout(function() {
                        $el.trigger("setvalue");
                    }, 0);
                }), $el.bind("mouseenter.inputmask", function() {
                    var $input = $(this), input = this;
                    !$input.hasClass("focus-inputmask") && opts.showMaskOnHover && input._valueGet() != getBuffer().join("") && writeBuffer(input, getBuffer());
                }).bind("blur.inputmask", function() {
                    var $input = $(this), input = this;
                    if ($input.data("_inputmask")) {
                        var nptValue = input._valueGet(), buffer = getBuffer();
                        $input.removeClass("focus-inputmask"), valueOnFocus != getBuffer().join("") && $input.change(), 
                        opts.clearMaskOnLostFocus && "" != nptValue && (nptValue == getBufferTemplate().join("") ? input._valueSet("") : clearOptionalTail(input)), 
                        isComplete(buffer) === !1 && ($input.trigger("incomplete"), opts.clearIncomplete && (resetMaskSet(), 
                        opts.clearMaskOnLostFocus ? input._valueSet("") : (buffer = getBufferTemplate().slice(), 
                        writeBuffer(input, buffer))));
                    }
                }).bind("focus.inputmask", function() {
                    var $input = $(this), input = this, nptValue = input._valueGet();
                    opts.showMaskOnFocus && !$input.hasClass("focus-inputmask") && (!opts.showMaskOnHover || opts.showMaskOnHover && "" == nptValue) && input._valueGet() != getBuffer().join("") && writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())), 
                    $input.addClass("focus-inputmask"), valueOnFocus = getBuffer().join("");
                }).bind("mouseleave.inputmask", function() {
                    var $input = $(this), input = this;
                    opts.clearMaskOnLostFocus && ($input.hasClass("focus-inputmask") || input._valueGet() == $input.attr("placeholder") || (input._valueGet() == getBufferTemplate().join("") || "" == input._valueGet() ? input._valueSet("") : clearOptionalTail(input)));
                }).bind("click.inputmask", function() {
                    var input = this;
                    $(input).is(":focus") && setTimeout(function() {
                        var selectedCaret = caret(input);
                        if (selectedCaret.begin == selectedCaret.end) if (opts.radixFocus && "" != opts.radixPoint && -1 != $.inArray(opts.radixPoint, getBuffer()) && getBuffer().join("") == getBufferTemplate().join("")) caret(input, $.inArray(opts.radixPoint, getBuffer())); else {
                            var clickPosition = isRTL ? TranslatePosition(selectedCaret.begin) : selectedCaret.begin, lastPosition = seekNext(getLastValidPosition(clickPosition));
                            lastPosition > clickPosition ? caret(input, isMask(clickPosition) ? clickPosition : seekNext(clickPosition)) : caret(input, lastPosition);
                        }
                    }, 0);
                }).bind("dblclick.inputmask", function() {
                    var input = this;
                    setTimeout(function() {
                        caret(input, 0, seekNext(getLastValidPosition()));
                    }, 0);
                }).bind(PasteEventType + ".inputmask dragdrop.inputmask drop.inputmask", pasteEvent).bind("setvalue.inputmask", function() {
                    var input = this;
                    checkVal(input, !0, !1, void 0, !0), valueOnFocus = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input._valueGet() == getBufferTemplate().join("") && input._valueSet("");
                }).bind("complete.inputmask", opts.oncomplete).bind("incomplete.inputmask", opts.onincomplete).bind("cleared.inputmask", opts.oncleared), 
                $el.bind("keydown.inputmask", keydownEvent).bind("keypress.inputmask", keypressEvent).bind("keyup.inputmask", keyupEvent).bind("compositionupdate.inputmask", compositionupdateEvent), 
                "paste" !== PasteEventType || msie1x || $el.bind("input.inputmask", inputFallBackEvent), 
                msie1x && $el.bind("input.inputmask", pasteEvent), (android || androidfirefox || androidchrome || kindle) && ("input" == PasteEventType && $el.unbind(PasteEventType + ".inputmask"), 
                $el.bind("input.inputmask", mobileInputEvent)), patchValueProperty(el);
                var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(el, el._valueGet(), opts) || el._valueGet() : el._valueGet();
                checkVal(el, !0, !1, initialValue.split(""), !0), valueOnFocus = getBuffer().join("");
                var activeElement;
                try {
                    activeElement = document.activeElement;
                } catch (e) {}
                isComplete(getBuffer()) === !1 && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus ? getBuffer().join("") == getBufferTemplate().join("") ? el._valueSet("") : clearOptionalTail(el) : writeBuffer(el, getBuffer()), 
                activeElement === el && ($el.addClass("focus-inputmask"), caret(el, seekNext(getLastValidPosition()))), 
                installEventRuler(el);
            }
        }
        var valueOnFocus, $el, maxLength, isRTL = !1, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1;
        if (void 0 != actionObj) switch (actionObj.action) {
          case "isComplete":
            return $el = $(actionObj.el), maskset = $el.data("_inputmask").maskset, opts = $el.data("_inputmask").opts, 
            isComplete(actionObj.buffer);

          case "unmaskedvalue":
            return $el = actionObj.$input, maskset = $el.data("_inputmask").maskset, opts = $el.data("_inputmask").opts, 
            isRTL = actionObj.$input.data("_inputmask").isRTL, unmaskedvalue(actionObj.$input);

          case "mask":
            valueOnFocus = getBuffer().join(""), mask(actionObj.el);
            break;

          case "format":
            $el = $({}), $el.data("_inputmask", {
                maskset: maskset,
                opts: opts,
                isRTL: opts.numericInput
            }), opts.numericInput && (isRTL = !0);
            var valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call($el, actionObj.value, opts) || actionObj.value : actionObj.value).split("");
            return checkVal($el, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer, !0), opts.onKeyPress.call(this, void 0, getBuffer(), 0, opts), 
            actionObj.metadata ? {
                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                metadata: $el.inputmask("getmetadata")
            } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

          case "isValid":
            $el = $({}), $el.data("_inputmask", {
                maskset: maskset,
                opts: opts,
                isRTL: opts.numericInput
            }), opts.numericInput && (isRTL = !0);
            var valueBuffer = actionObj.value.split("");
            checkVal($el, !1, !0, isRTL ? valueBuffer.reverse() : valueBuffer);
            for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value == buffer.join("");

          case "getemptymask":
            return $el = $(actionObj.el), maskset = $el.data("_inputmask").maskset, opts = $el.data("_inputmask").opts, 
            getBufferTemplate();

          case "remove":
            var el = actionObj.el;
            $el = $(el), maskset = $el.data("_inputmask").maskset, opts = $el.data("_inputmask").opts, 
            el._valueSet(unmaskedvalue($el)), $el.unbind(".inputmask"), $el.removeClass("focus-inputmask"), 
            $el.removeData("_inputmask");
            var valueProperty;
            Object.getOwnPropertyDescriptor && (valueProperty = Object.getOwnPropertyDescriptor(el, "value")), 
            valueProperty && valueProperty.get ? el._valueGet && Object.defineProperty(el, "value", {
                get: el._valueGet,
                set: el._valueSet
            }) : document.__lookupGetter__ && el.__lookupGetter__("value") && el._valueGet && (el.__defineGetter__("value", el._valueGet), 
            el.__defineSetter__("value", el._valueSet));
            try {
                delete el._valueGet, delete el._valueSet;
            } catch (e) {
                el._valueGet = void 0, el._valueSet = void 0;
            }
            break;

          case "getmetadata":
            if ($el = $(actionObj.el), maskset = $el.data("_inputmask").maskset, opts = $el.data("_inputmask").opts, 
            $.isArray(maskset.metadata)) {
                for (var alternation, lvp = getLastValidPosition(), firstAlt = lvp; firstAlt >= 0; firstAlt--) if (getMaskSet().validPositions[firstAlt] && void 0 != getMaskSet().validPositions[firstAlt].alternation) {
                    alternation = getMaskSet().validPositions[firstAlt].alternation;
                    break;
                }
                return void 0 != alternation ? maskset.metadata[getMaskSet().validPositions[lvp].locator[alternation]] : maskset.metadata[0];
            }
            return maskset.metadata;
        }
    }
    if (void 0 === $.fn.inputmask) {
        var msie1x = "function" == typeof ScriptEngineMajorVersion ? ScriptEngineMajorVersion() : new Function("/*@cc_on return @_jscript_version; @*/")() >= 10, ua = navigator.userAgent, iphone = null !== ua.match(new RegExp("iphone", "i")), android = null !== ua.match(new RegExp("android.*safari.*", "i")), androidchrome = null !== ua.match(new RegExp("android.*chrome.*", "i")), androidfirefox = null !== ua.match(new RegExp("android.*firefox.*", "i")), kindle = /Kindle/i.test(ua) || /Silk/i.test(ua) || /KFTT/i.test(ua) || /KFOT/i.test(ua) || /KFJWA/i.test(ua) || /KFJWI/i.test(ua) || /KFSOWI/i.test(ua) || /KFTHWA/i.test(ua) || /KFTHWI/i.test(ua) || /KFAPWA/i.test(ua) || /KFAPWI/i.test(ua), PasteEventType = isInputEventSupported("paste") ? "paste" : isInputEventSupported("input") ? "input" : "propertychange";
        $.inputmask = {
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                quantifiermarker: {
                    start: "{",
                    end: "}"
                },
                groupmarker: {
                    start: "(",
                    end: ")"
                },
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                oncomplete: $.noop,
                onincomplete: $.noop,
                oncleared: $.noop,
                repeat: 0,
                greedy: !0,
                autoUnmask: !1,
                removeMaskOnSubmit: !0,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                aliases: {},
                alias: null,
                onKeyUp: $.noop,
                onKeyPress: $.noop,
                onKeyDown: $.noop,
                onBeforeMask: void 0,
                onBeforePaste: void 0,
                onUnMask: void 0,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: $.noop,
                skipOptionalPartCharacter: " ",
                showTooltip: !1,
                numericInput: !1,
                rightAlign: !1,
                radixPoint: "",
                radixFocus: !1,
                nojumps: !1,
                nojumpsThreshold: 0,
                keepStatic: void 0,
                definitions: {
                    "9": {
                        validator: "[0-9]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    a: {
                        validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    "*": {
                        validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
                        cardinality: 1
                    }
                },
                ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 ],
                isComplete: void 0
            },
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            },
            masksCache: {},
            escapeRegex: function(str) {
                var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\" ];
                return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
            },
            format: function(value, options, metadata) {
                var opts = $.extend(!0, {}, $.inputmask.defaults, options);
                return resolveAlias(opts.alias, options, opts), maskScope({
                    action: "format",
                    value: value,
                    metadata: metadata
                }, generateMaskSet(opts), opts);
            },
            isValid: function(value, options) {
                var opts = $.extend(!0, {}, $.inputmask.defaults, options);
                return resolveAlias(opts.alias, options, opts), maskScope({
                    action: "isValid",
                    value: value
                }, generateMaskSet(opts), opts);
            }
        }, $.fn.inputmask = function(fn, options, targetScope, targetData, msk) {
            function importAttributeOptions(npt, opts, importedOptionsContainer) {
                var $npt = $(npt);
                $npt.data("inputmask-alias") && resolveAlias($npt.data("inputmask-alias"), {}, opts);
                for (var option in opts) {
                    var optionData = $npt.data("inputmask-" + option.toLowerCase());
                    void 0 != optionData && ("mask" == option && 0 == optionData.indexOf("[") ? (opts[option] = optionData.replace(/[\s[\]]/g, "").split("','"), 
                    opts[option][0] = opts[option][0].replace("'", ""), opts[option][opts[option].length - 1] = opts[option][opts[option].length - 1].replace("'", "")) : opts[option] = "boolean" == typeof optionData ? optionData : optionData.toString(), 
                    importedOptionsContainer && (importedOptionsContainer[option] = opts[option]));
                }
                return opts;
            }
            targetScope = targetScope || maskScope, targetData = targetData || "_inputmask";
            var maskset, opts = $.extend(!0, {}, $.inputmask.defaults, options);
            if ("string" == typeof fn) switch (fn) {
              case "mask":
                return resolveAlias(opts.alias, options, opts), maskset = generateMaskSet(opts, targetScope !== maskScope), 
                void 0 == maskset ? this : this.each(function() {
                    targetScope({
                        action: "mask",
                        el: this
                    }, $.extend(!0, {}, maskset), importAttributeOptions(this, opts));
                });

              case "unmaskedvalue":
                var $input = $(this);
                return $input.data(targetData) ? targetScope({
                    action: "unmaskedvalue",
                    $input: $input
                }) : $input.val();

              case "remove":
                return this.each(function() {
                    var $input = $(this);
                    $input.data(targetData) && targetScope({
                        action: "remove",
                        el: this
                    });
                });

              case "getemptymask":
                return this.data(targetData) ? targetScope({
                    action: "getemptymask",
                    el: this
                }) : "";

              case "hasMaskedValue":
                return this.data(targetData) ? !this.data(targetData).opts.autoUnmask : !1;

              case "isComplete":
                return this.data(targetData) ? targetScope({
                    action: "isComplete",
                    buffer: this[0]._valueGet().split(""),
                    el: this
                }) : !0;

              case "getmetadata":
                return this.data(targetData) ? targetScope({
                    action: "getmetadata",
                    el: this
                }) : void 0;

              case "_detectScope":
                return resolveAlias(opts.alias, options, opts), void 0 == msk || resolveAlias(msk, options, opts) || -1 != $.inArray(msk, [ "mask", "unmaskedvalue", "remove", "getemptymask", "hasMaskedValue", "isComplete", "getmetadata", "_detectScope" ]) || (opts.mask = msk), 
                $.isFunction(opts.mask) && (opts.mask = opts.mask.call(this, opts)), $.isArray(opts.mask);

              default:
                return resolveAlias(opts.alias, options, opts), resolveAlias(fn, options, opts) || (opts.mask = fn), 
                maskset = generateMaskSet(opts, targetScope !== maskScope), void 0 == maskset ? this : this.each(function() {
                    targetScope({
                        action: "mask",
                        el: this
                    }, $.extend(!0, {}, maskset), importAttributeOptions(this, opts));
                });
            } else {
                if ("object" == typeof fn) return opts = $.extend(!0, {}, $.inputmask.defaults, fn), 
                resolveAlias(opts.alias, fn, opts), maskset = generateMaskSet(opts, targetScope !== maskScope), 
                void 0 == maskset ? this : this.each(function() {
                    targetScope({
                        action: "mask",
                        el: this
                    }, $.extend(!0, {}, maskset), importAttributeOptions(this, opts));
                });
                if (void 0 == fn) return this.each(function() {
                    var attrOptions = $(this).attr("data-inputmask");
                    if (attrOptions && "" != attrOptions) try {
                        attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
                        var dataoptions = $.parseJSON("{" + attrOptions + "}");
                        $.extend(!0, dataoptions, options), opts = $.extend(!0, {}, $.inputmask.defaults, dataoptions), 
                        opts = importAttributeOptions(this, opts), resolveAlias(opts.alias, dataoptions, opts), 
                        opts.alias = void 0, $(this).inputmask("mask", opts, targetScope);
                    } catch (ex) {}
                    if ($(this).attr("data-inputmask-mask") || $(this).attr("data-inputmask-alias")) {
                        opts = $.extend(!0, {}, $.inputmask.defaults, {});
                        var dataOptions = {};
                        opts = importAttributeOptions(this, opts, dataOptions), resolveAlias(opts.alias, dataOptions, opts), 
                        opts.alias = void 0, $(this).inputmask("mask", opts, targetScope);
                    }
                });
            }
        };
    }
    return $.fn.inputmask;
}(jQuery), function($) {
    return $.extend($.inputmask.defaults.definitions, {
        h: {
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-2]",
                cardinality: 1
            } ]
        },
        s: {
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-5]",
                cardinality: 1
            } ]
        },
        d: {
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-3]",
                cardinality: 1
            } ]
        },
        m: {
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[01]",
                cardinality: 1
            } ]
        },
        y: {
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [ {
                validator: "[12]",
                cardinality: 1
            }, {
                validator: "(19|20)",
                cardinality: 2
            }, {
                validator: "(19|20)\\d",
                cardinality: 3
            } ]
        }
    }), $.extend($.inputmask.defaults.aliases, {
        "dd/mm/yyyy": {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"),
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                val2pre: function(separator) {
                    var escapedSeparator = $.inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])");
                },
                val2: function(separator) {
                    var escapedSeparator = $.inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))");
                }
            },
            leapday: "29/02/",
            separator: "/",
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            },
            isInYearRange: function(chrs, minyear, maxyear) {
                if (isNaN(chrs)) return !1;
                var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length))), enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
                return (isNaN(enteredyear) ? !1 : enteredyear >= minyear && maxyear >= enteredyear) || (isNaN(enteredyear2) ? !1 : enteredyear2 >= minyear && maxyear >= enteredyear2);
            },
            determinebaseyear: function(minyear, maxyear, hint) {
                var currentyear = new Date().getFullYear();
                if (minyear > currentyear) return minyear;
                if (currentyear > maxyear) {
                    for (var maxYearPrefix = maxyear.toString().slice(0, 2), maxYearPostfix = maxyear.toString().slice(2, 4); maxYearPrefix + hint > maxyear; ) maxYearPrefix--;
                    var maxxYear = maxYearPrefix + maxYearPostfix;
                    return minyear > maxxYear ? minyear : maxxYear;
                }
                return currentyear;
            },
            onKeyUp: function(e) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == $.inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString());
                }
            },
            definitions: {
                "1": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.regex.val1.test(chrs);
                        return strict || isValid || chrs.charAt(1) != opts.separator && -1 == "-./".indexOf(chrs.charAt(1)) || !(isValid = opts.regex.val1.test("0" + chrs.charAt(0))) ? isValid : (maskset.buffer[pos - 1] = "0", 
                        {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            pos: pos,
                            c: chrs.charAt(0)
                        });
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            isNaN(maskset.buffer[pos + 1]) || (chrs += maskset.buffer[pos + 1]);
                            var isValid = 1 == chrs.length ? opts.regex.val1pre.test(chrs) : opts.regex.val1.test(chrs);
                            return strict || isValid || !(isValid = opts.regex.val1.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                "2": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var frontValue = opts.mask.indexOf("2") == opts.mask.length - 1 ? maskset.buffer.join("").substr(5, 3) : maskset.buffer.join("").substr(0, 3);
                        -1 != frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid && (chrs.charAt(1) == opts.separator || -1 != "-./".indexOf(chrs.charAt(1))) && (isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
                        {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            pos: pos,
                            c: chrs.charAt(0)
                        };
                        if (opts.mask.indexOf("2") == opts.mask.length - 1 && isValid) {
                            var dayMonthValue = maskset.buffer.join("").substr(4, 4) + chrs;
                            if (dayMonthValue != opts.leapday) return !0;
                            var year = parseInt(maskset.buffer.join("").substr(0, 4), 10);
                            return year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            isNaN(maskset.buffer[pos + 1]) || (chrs += maskset.buffer[pos + 1]);
                            var frontValue = opts.mask.indexOf("2") == opts.mask.length - 1 ? maskset.buffer.join("").substr(5, 3) : maskset.buffer.join("").substr(0, 3);
                            -1 != frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                            var isValid = 1 == chrs.length ? opts.regex.val2pre(opts.separator).test(frontValue + chrs) : opts.regex.val2(opts.separator).test(frontValue + chrs);
                            return strict || isValid || !(isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                y: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        if (opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                            var dayMonthValue = maskset.buffer.join("").substr(0, 6);
                            if (dayMonthValue != opts.leapday) return !0;
                            var year = parseInt(chrs, 10);
                            return year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                        }
                        return !1;
                    },
                    cardinality: 4,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (!strict && !isValid) {
                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);
                                if (isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
                                {
                                    pos: pos
                                };
                                if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2), 
                                isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
                                maskset.buffer[pos++] = yearPrefix.charAt(1), {
                                    pos: pos
                                };
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }, {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (!strict && !isValid) {
                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                                if (isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(1), 
                                {
                                    pos: pos
                                };
                                if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2), 
                                opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                                    var dayMonthValue = maskset.buffer.join("").substr(0, 6);
                                    if (dayMonthValue != opts.leapday) isValid = !0; else {
                                        var year = parseInt(chrs, 10);
                                        isValid = year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                                    }
                                } else isValid = !1;
                                if (isValid) return maskset.buffer[pos - 1] = yearPrefix.charAt(0), maskset.buffer[pos++] = yearPrefix.charAt(1), 
                                maskset.buffer[pos++] = chrs.charAt(0), {
                                    refreshFromBuffer: {
                                        start: pos - 3,
                                        end: pos
                                    },
                                    pos: pos
                                };
                            }
                            return isValid;
                        },
                        cardinality: 2
                    }, {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        },
                        cardinality: 3
                    } ]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        "mm/dd/yyyy": {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy",
            regex: {
                val2pre: function(separator) {
                    var escapedSeparator = $.inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                },
                val2: function(separator) {
                    var escapedSeparator = $.inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyUp: function(e) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == $.inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString());
                }
            }
        },
        "yyyy/mm/dd": {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyUp: function(e) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == $.inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString());
                }
            }
        },
        "dd.mm.yyyy": {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: ".",
            alias: "dd/mm/yyyy"
        },
        "dd-mm-yyyy": {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: "-",
            alias: "dd/mm/yyyy"
        },
        "mm.dd.yyyy": {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: ".",
            alias: "mm/dd/yyyy"
        },
        "mm-dd-yyyy": {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: "-",
            alias: "mm/dd/yyyy"
        },
        "yyyy.mm.dd": {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: ".",
            alias: "yyyy/mm/dd"
        },
        "yyyy-mm-dd": {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: "-",
            alias: "yyyy/mm/dd"
        },
        datetime: {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"),
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"),
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"),
                ms: new RegExp("[0-5][0-9]")
            },
            timeseparator: ":",
            hourFormat: "24",
            definitions: {
                h: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        if ("24" == opts.hourFormat && 24 == parseInt(chrs, 10)) return maskset.buffer[pos - 1] = "0", 
                        maskset.buffer[pos] = "0", {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            c: "0"
                        };
                        var isValid = opts.regex.hrs.test(chrs);
                        if (!strict && !isValid && (chrs.charAt(1) == opts.timeseparator || -1 != "-.:".indexOf(chrs.charAt(1))) && (isValid = opts.regex.hrs.test("0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
                        maskset.buffer[pos] = chrs.charAt(0), pos++, {
                            refreshFromBuffer: {
                                start: pos - 2,
                                end: pos
                            },
                            pos: pos,
                            c: opts.timeseparator
                        };
                        if (isValid && "24" !== opts.hourFormat && opts.regex.hrs24.test(chrs)) {
                            var tmp = parseInt(chrs, 10);
                            return 24 == tmp ? (maskset.buffer[pos + 5] = "a", maskset.buffer[pos + 6] = "m") : (maskset.buffer[pos + 5] = "p", 
                            maskset.buffer[pos + 6] = "m"), tmp -= 12, 10 > tmp ? (maskset.buffer[pos] = tmp.toString(), 
                            maskset.buffer[pos - 1] = "0") : (maskset.buffer[pos] = tmp.toString().charAt(1), 
                            maskset.buffer[pos - 1] = tmp.toString().charAt(0)), {
                                refreshFromBuffer: {
                                    start: pos - 1,
                                    end: pos + 6
                                },
                                c: maskset.buffer[pos]
                            };
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.hrspre.test(chrs);
                            return strict || isValid || !(isValid = opts.regex.hrs.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                s: {
                    validator: "[0-5][0-9]",
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.mspre.test(chrs);
                            return strict || isValid || !(isValid = opts.regex.ms.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                t: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        return opts.regex.ampm.test(chrs + "m");
                    },
                    casing: "lower",
                    cardinality: 1
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        datetime12: {
            mask: "1/2/y h:s t\\m",
            placeholder: "dd/mm/yyyy hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:mm t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "h:s t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:mm:ss": {
            mask: "h:s:s",
            placeholder: "hh:mm:ss",
            alias: "datetime",
            autoUnmask: !1
        },
        "hh:mm": {
            mask: "h:s",
            placeholder: "hh:mm",
            alias: "datetime",
            autoUnmask: !1
        },
        date: {
            alias: "dd/mm/yyyy"
        },
        "mm/yyyy": {
            mask: "1/y",
            placeholder: "mm/yyyy",
            leapday: "donotuse",
            separator: "/",
            alias: "mm/dd/yyyy"
        }
    }), $.fn.inputmask;
}(jQuery), function($) {
    return $.extend($.inputmask.defaults.definitions, {
        A: {
            validator: "[A-Za-zА-яЁёÀ-ÿµ]",
            cardinality: 1,
            casing: "upper"
        },
        "#": {
            validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
            cardinality: 1,
            casing: "upper"
        }
    }), $.extend($.inputmask.defaults.aliases, {
        url: {
            mask: "ir",
            placeholder: "",
            separator: "",
            defaultPrefix: "http://",
            regex: {
                urlpre1: new RegExp("[fh]"),
                urlpre2: new RegExp("(ft|ht)"),
                urlpre3: new RegExp("(ftp|htt)"),
                urlpre4: new RegExp("(ftp:|http|ftps)"),
                urlpre5: new RegExp("(ftp:/|ftps:|http:|https)"),
                urlpre6: new RegExp("(ftp://|ftps:/|http:/|https:)"),
                urlpre7: new RegExp("(ftp://|ftps://|http://|https:/)"),
                urlpre8: new RegExp("(ftp://|ftps://|http://|https://)")
            },
            definitions: {
                i: {
                    validator: function() {
                        return !0;
                    },
                    cardinality: 8,
                    prevalidator: function() {
                        for (var result = [], prefixLimit = 8, i = 0; prefixLimit > i; i++) result[i] = function() {
                            var j = i;
                            return {
                                validator: function(chrs, maskset, pos, strict, opts) {
                                    if (opts.regex["urlpre" + (j + 1)]) {
                                        var k, tmp = chrs;
                                        j + 1 - chrs.length > 0 && (tmp = maskset.buffer.join("").substring(0, j + 1 - chrs.length) + "" + tmp);
                                        var isValid = opts.regex["urlpre" + (j + 1)].test(tmp);
                                        if (!strict && !isValid) {
                                            for (pos -= j, k = 0; k < opts.defaultPrefix.length; k++) maskset.buffer[pos] = opts.defaultPrefix[k], 
                                            pos++;
                                            for (k = 0; k < tmp.length - 1; k++) maskset.buffer[pos] = tmp[k], pos++;
                                            return {
                                                pos: pos
                                            };
                                        }
                                        return isValid;
                                    }
                                    return !1;
                                },
                                cardinality: j
                            };
                        }();
                        return result;
                    }()
                },
                r: {
                    validator: ".",
                    cardinality: 50
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        ip: {
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                i: {
                    validator: function(chrs, maskset, pos) {
                        return pos - 1 > -1 && "." != maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
                        chrs = pos - 2 > -1 && "." != maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs, 
                        new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    },
                    cardinality: 1
                }
            }
        },
        email: {
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",
            greedy: !1,
            onBeforePaste: function(pastedValue) {
                return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
            },
            definitions: {
                "*": {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                    cardinality: 1,
                    casing: "lower"
                }
            }
        }
    }), $.fn.inputmask;
}(jQuery), function($) {
    var inArray = function(searchValue, array, fromIndex) {
        return $.isArray(array) ? $.inArray(searchValue, array, fromIndex) : array.indexOf(searchValue, fromIndex);
    };
    return $.extend($.inputmask.defaults.aliases, {
        numeric: {
            mask: function(opts) {
                if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
                opts.repeat = 0, opts.groupSeparator == opts.radixPoint && (opts.groupSeparator = "." == opts.radixPoint ? "," : "," == opts.radixPoint ? "." : ""), 
                " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), opts.autoGroup = opts.autoGroup && "" != opts.groupSeparator, 
                opts.autoGroup && isFinite(opts.integerDigits)) {
                    var seps = Math.floor(opts.integerDigits / opts.groupSize), mod = opts.integerDigits % opts.groupSize;
                    opts.integerDigits += 0 == mod ? seps - 1 : seps;
                }
                opts.definitions[";"] = opts.definitions["~"];
                var mask = opts.prefix;
                return mask += "[+]", mask += "~{1," + opts.integerDigits + "}", void 0 != opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (mask += opts.digitsOptional ? "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}]" : (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}"), 
                mask += opts.suffix;
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
            groupSeparator: "",
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            integerDigits: "+",
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            postFormat: function(buffer, pos, reformatOnly, opts) {
                var needsRefresh = !1, charAtPos = buffer[pos];
                if ("" == opts.groupSeparator || -1 != inArray(opts.radixPoint, buffer) && pos >= inArray(opts.radixPoint, buffer) || new RegExp("[-+]").test(charAtPos)) return {
                    pos: pos
                };
                var cbuf = buffer.slice();
                charAtPos == opts.groupSeparator && (cbuf.splice(pos--, 1), charAtPos = cbuf[pos]), 
                reformatOnly ? cbuf[pos] = "?" : cbuf.splice(pos, 0, "?");
                var bufVal = cbuf.join("");
                if (opts.autoGroup || reformatOnly && -1 != bufVal.indexOf(opts.groupSeparator)) {
                    var escapedGroupSeparator = $.inputmask.escapeRegex.call(this, opts.groupSeparator);
                    needsRefresh = 0 == bufVal.indexOf(opts.groupSeparator), bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
                    var radixSplit = bufVal.split(opts.radixPoint);
                    if (bufVal = radixSplit[0], bufVal != opts.prefix + "?0" && bufVal.length >= opts.groupSize + opts.prefix.length) {
                        needsRefresh = !0;
                        for (var reg = new RegExp("([-+]?[\\d?]+)([\\d?]{" + opts.groupSize + "})"); reg.test(bufVal); ) bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2"), 
                        bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                    }
                    radixSplit.length > 1 && (bufVal += opts.radixPoint + radixSplit[1]);
                }
                buffer.length = bufVal.length;
                for (var i = 0, l = bufVal.length; l > i; i++) buffer[i] = bufVal.charAt(i);
                var newPos = inArray("?", buffer);
                return reformatOnly ? buffer[newPos] = charAtPos : buffer.splice(newPos, 1), {
                    pos: newPos,
                    refreshFromBuffer: needsRefresh
                };
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                if (e.keyCode == $.inputmask.keyCode.TAB && "0" != opts.placeholder.charAt(0)) {
                    var radixPosition = inArray(opts.radixPoint, buffer);
                    if (-1 != radixPosition && isFinite(opts.digits)) {
                        for (var i = 1; i <= opts.digits; i++) (void 0 == buffer[radixPosition + i] || buffer[radixPosition + i] == opts.placeholder.charAt(0)) && (buffer[radixPosition + i] = "0");
                        return {
                            refreshFromBuffer: {
                                start: ++radixPosition,
                                end: radixPosition + opts.digits
                            }
                        };
                    }
                } else if (opts.autoGroup && (e.keyCode == $.inputmask.keyCode.DELETE || e.keyCode == $.inputmask.keyCode.BACKSPACE)) {
                    var rslt = opts.postFormat(buffer, caretPos - 1, !0, opts);
                    return rslt.caret = rslt.pos + 1, rslt;
                }
            },
            onKeyPress: function(e, buffer, caretPos, opts) {
                if (opts.autoGroup) {
                    var rslt = opts.postFormat(buffer, caretPos - 1, !0, opts);
                    return rslt.caret = rslt.pos + 1, rslt;
                }
            },
            regex: {
                integerPart: function() {
                    return new RegExp("[-+]?\\d+");
                },
                integerNPart: function() {
                    return new RegExp("\\d+");
                }
            },
            signHandler: function(chrs, buffer, pos, strict, opts) {
                if (!strict && (opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs)) {
                    var matchRslt = buffer.join("").match(opts.regex.integerPart(opts));
                    if (matchRslt && matchRslt.length > 0 && "0" !== matchRslt[matchRslt.index]) return buffer[matchRslt.index] == ("-" === chrs ? "+" : "-") ? {
                        pos: matchRslt.index,
                        c: chrs,
                        remove: matchRslt.index,
                        caret: pos
                    } : buffer[matchRslt.index] == ("-" === chrs ? "-" : "+") ? {
                        remove: matchRslt.index,
                        caret: pos - 1
                    } : {
                        pos: matchRslt.index,
                        c: chrs,
                        caret: pos + 1
                    };
                }
                return !1;
            },
            radixHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict && chrs === opts.radixPoint) {
                    var radixPos = inArray(opts.radixPoint, maskset.buffer), integerValue = maskset.buffer.join("").match(opts.regex.integerPart(opts));
                    if (-1 != radixPos) return maskset.validPositions[radixPos - 1] ? {
                        caret: radixPos + 1
                    } : {
                        pos: integerValue.index,
                        c: integerValue[0],
                        caret: radixPos + 1
                    };
                }
                return !1;
            },
            leadingZeroHandler: function(chrs, maskset, pos, strict, opts) {
                var matchRslt = maskset.buffer.join("").match(opts.regex.integerNPart(opts)), radixPosition = inArray(opts.radixPoint, maskset.buffer);
                if (matchRslt && !strict && (-1 == radixPosition || matchRslt.index < radixPosition)) if (0 == matchRslt[0].indexOf("0") && pos >= opts.prefix.length) {
                    if (-1 == radixPosition || radixPosition >= pos && void 0 == maskset.validPositions[radixPosition]) return maskset.buffer.splice(matchRslt.index, 1), 
                    pos = pos > matchRslt.index ? pos - 1 : matchRslt.index, {
                        pos: pos,
                        remove: matchRslt.index
                    };
                    if (pos > matchRslt.index && radixPosition >= pos) return maskset.buffer.splice(matchRslt.index, 1), 
                    pos = pos > matchRslt.index ? pos - 1 : matchRslt.index, {
                        pos: pos,
                        remove: matchRslt.index
                    };
                } else if ("0" == chrs && pos <= matchRslt.index) return !1;
                return !0;
            },
            definitions: {
                "~": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset.buffer, pos, strict, opts);
                        if (!isValid && (isValid = opts.radixHandler(chrs, maskset, pos, strict, opts), 
                        !isValid && (isValid = strict ? new RegExp("[0-9" + $.inputmask.escapeRegex.call(this, opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs), 
                        isValid === !0 && (isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts), 
                        isValid === !0)))) {
                            var radixPosition = inArray(opts.radixPoint, maskset.buffer);
                            return opts.digitsOptional === !1 && pos > radixPosition && !strict ? {
                                pos: pos,
                                remove: pos
                            } : {
                                pos: pos
                            };
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                "+": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset.buffer, pos, strict, opts);
                        if (!isValid) {
                            var signed = "[";
                            opts.allowMinus === !0 && (signed += "-"), opts.allowPlus === !0 && (signed += "+"), 
                            signed += "]", isValid = new RegExp(signed).test(chrs);
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ""
                },
                ":": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset.buffer, pos, strict, opts);
                        if (!isValid) {
                            var radix = "[" + $.inputmask.escapeRegex.call(this, opts.radixPoint) + "]";
                            isValid = new RegExp(radix).test(chrs), isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder == opts.radixPoint && (isValid = {
                                pos: pos,
                                remove: pos
                            });
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: function(opts) {
                        return opts.radixPoint;
                    }
                }
            },
            insertMode: !0,
            autoUnmask: !1,
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), "");
            },
            isComplete: function(buffer, opts) {
                var maskedValue = buffer.join(""), bufClone = buffer.slice();
                if (opts.postFormat(bufClone, 0, !0, opts), bufClone.join("") != maskedValue) return !1;
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), ""), 
                processValue = processValue.replace($.inputmask.escapeRegex.call(this, opts.radixPoint), "."), 
                isFinite(processValue);
            },
            onBeforeMask: function(initialValue, opts) {
                if (isFinite(initialValue)) return initialValue.toString().replace(".", opts.radixPoint);
                var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
                return dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, ""), 
                initialValue = initialValue.replace(",", opts.radixPoint)) : kommaMatches.length > dotMatches.length && (initialValue = initialValue.replace(/,/g, ""), 
                initialValue = initialValue.replace(".", opts.radixPoint)) : initialValue = initialValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), ""), 
                initialValue;
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            radixPoint: ".",
            alias: "numeric",
            placeholder: "0",
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1,
            decimalProtect: !0
        },
        decimal: {
            alias: "numeric"
        },
        integer: {
            alias: "numeric",
            digits: "0"
        }
    }), $.fn.inputmask;
}(jQuery), function($) {
    return $.extend($.inputmask.defaults.aliases, {
        phone: {
            url: "phone-codes/phone-codes.js",
            maskInit: "+pp(pp)pppppppp",
            mask: function(opts) {
                opts.definitions = {
                    p: {
                        validator: function() {
                            return !1;
                        },
                        cardinality: 1
                    },
                    "#": {
                        validator: "[0-9]",
                        cardinality: 1
                    }
                };
                var maskList = [];
                return $.ajax({
                    url: opts.url,
                    async: !1,
                    dataType: "json",
                    success: function(response) {
                        maskList = response;
                    }
                }), maskList.splice(0, 0, opts.maskInit), maskList.sort(function(a, b) {
                    return a.length - b.length;
                }), maskList;
            },
            nojumps: !0,
            nojumpsThreshold: 1
        },
        phonebe: {
            alias: "phone",
            url: "phone-codes/phone-be.js",
            maskInit: "+32(pp)pppppppp",
            nojumpsThreshold: 4
        }
    }), $.fn.inputmask;
}(jQuery), function($) {
    return $.extend($.inputmask.defaults.aliases, {
        Regex: {
            mask: "r",
            greedy: !1,
            repeat: "*",
            regex: null,
            regexTokens: null,
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function(buffer, opts) {
                return new RegExp(opts.regex).test(buffer.join(""));
            },
            definitions: {
                r: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        function regexToken(isGroup, isQuantifier) {
                            this.matches = [], this.isGroup = isGroup || !1, this.isQuantifier = isQuantifier || !1, 
                            this.quantifier = {
                                min: 1,
                                max: 1
                            }, this.repeaterPart = void 0;
                        }
                        function analyseRegex() {
                            var match, m, currentToken = new regexToken(), opengroups = [];
                            for (opts.regexTokens = []; match = opts.tokenizer.exec(opts.regex); ) switch (m = match[0], 
                            m.charAt(0)) {
                              case "(":
                                opengroups.push(new regexToken(!0));
                                break;

                              case ")":
                                var groupToken = opengroups.pop();
                                opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(groupToken) : currentToken.matches.push(groupToken);
                                break;

                              case "{":
                              case "+":
                              case "*":
                                var quantifierToken = new regexToken(!1, !0);
                                m = m.replace(/[{}]/g, "");
                                var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 == mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                                if (quantifierToken.quantifier = {
                                    min: mq0,
                                    max: mq1
                                }, opengroups.length > 0) {
                                    var matches = opengroups[opengroups.length - 1].matches;
                                    if (match = matches.pop(), !match.isGroup) {
                                        var groupToken = new regexToken(!0);
                                        groupToken.matches.push(match), match = groupToken;
                                    }
                                    matches.push(match), matches.push(quantifierToken);
                                } else {
                                    if (match = currentToken.matches.pop(), !match.isGroup) {
                                        var groupToken = new regexToken(!0);
                                        groupToken.matches.push(match), match = groupToken;
                                    }
                                    currentToken.matches.push(match), currentToken.matches.push(quantifierToken);
                                }
                                break;

                              default:
                                opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(m) : currentToken.matches.push(m);
                            }
                            currentToken.matches.length > 0 && opts.regexTokens.push(currentToken);
                        }
                        function validateRegexToken(token, fromGroup) {
                            var isvalid = !1;
                            fromGroup && (regexPart += "(", openGroupCount++);
                            for (var mndx = 0; mndx < token.matches.length; mndx++) {
                                var matchToken = token.matches[mndx];
                                if (1 == matchToken.isGroup) isvalid = validateRegexToken(matchToken, !0); else if (1 == matchToken.isQuantifier) {
                                    var crrntndx = $.inArray(matchToken, token.matches), matchGroup = token.matches[crrntndx - 1], regexPartBak = regexPart;
                                    if (isNaN(matchToken.quantifier.max)) {
                                        for (;matchToken.repeaterPart && matchToken.repeaterPart != regexPart && matchToken.repeaterPart.length > regexPart.length && !(isvalid = validateRegexToken(matchGroup, !0)); ) ;
                                        isvalid = isvalid || validateRegexToken(matchGroup, !0), isvalid && (matchToken.repeaterPart = regexPart), 
                                        regexPart = regexPartBak + matchToken.quantifier.max;
                                    } else {
                                        for (var i = 0, qm = matchToken.quantifier.max - 1; qm > i && !(isvalid = validateRegexToken(matchGroup, !0)); i++) ;
                                        regexPart = regexPartBak + "{" + matchToken.quantifier.min + "," + matchToken.quantifier.max + "}";
                                    }
                                } else if (void 0 != matchToken.matches) for (var k = 0; k < matchToken.length && !(isvalid = validateRegexToken(matchToken[k], fromGroup)); k++) ; else {
                                    var testExp;
                                    if ("[" == matchToken.charAt(0)) {
                                        testExp = regexPart, testExp += matchToken;
                                        for (var j = 0; openGroupCount > j; j++) testExp += ")";
                                        var exp = new RegExp("^(" + testExp + ")$");
                                        isvalid = exp.test(bufferStr);
                                    } else for (var l = 0, tl = matchToken.length; tl > l; l++) if ("\\" != matchToken.charAt(l)) {
                                        testExp = regexPart, testExp += matchToken.substr(0, l + 1), testExp = testExp.replace(/\|$/, "");
                                        for (var j = 0; openGroupCount > j; j++) testExp += ")";
                                        var exp = new RegExp("^(" + testExp + ")$");
                                        if (isvalid = exp.test(bufferStr)) break;
                                    }
                                    regexPart += matchToken;
                                }
                                if (isvalid) break;
                            }
                            return fromGroup && (regexPart += ")", openGroupCount--), isvalid;
                        }
                        null == opts.regexTokens && analyseRegex();
                        var cbuffer = maskset.buffer.slice(), regexPart = "", isValid = !1, openGroupCount = 0;
                        cbuffer.splice(pos, 0, chrs);
                        for (var bufferStr = cbuffer.join(""), i = 0; i < opts.regexTokens.length; i++) {
                            var regexToken = opts.regexTokens[i];
                            if (isValid = validateRegexToken(regexToken, regexToken.isGroup)) break;
                        }
                        return isValid;
                    },
                    cardinality: 1
                }
            }
        }
    }), $.fn.inputmask;
}(jQuery);