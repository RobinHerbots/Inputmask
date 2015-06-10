/*!
* inputmask.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.64-77
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : "object" == typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery);
}(function($) {
    function inputmask(options) {
        this.el = void 0, this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && void 0 !== options.definitions, 
        this.userOptions = options || {}, resolveAlias(this.opts.alias, options, this.opts);
    }
    function isInputEventSupported(eventName) {
        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
        return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
        el = null, isSupported;
    }
    function isInputTypeSupported(inputType) {
        var isSupported = "text" == inputType || "tel" == inputType || "password" == inputType;
        if (!isSupported) {
            var el = document.createElement("input");
            el.setAttribute("type", inputType), isSupported = "text" === el.type, el = null;
        }
        return isSupported;
    }
    function resolveAlias(aliasStr, options, opts) {
        var aliasDefinition = opts.aliases[aliasStr];
        return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
        $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (void 0 == opts.mask && (opts.mask = aliasStr), 
        !1);
    }
    function importAttributeOptions(npt, opts, userOptions) {
        var $npt = $(npt), attrOptions = $npt.data("inputmask");
        if (attrOptions && "" != attrOptions) try {
            attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
            var dataoptions = $.parseJSON("{" + attrOptions + "}");
            $.extend(!0, userOptions, dataoptions);
        } catch (ex) {}
        for (var option in opts) {
            var optionData = $npt.data("inputmask-" + option.toLowerCase());
            void 0 != optionData && (optionData = "boolean" == typeof optionData ? optionData : optionData.toString(), 
            "mask" == option && 0 == optionData.indexOf("[") ? (userOptions[option] = optionData.replace(/[\s[\]]/g, "").split("','"), 
            userOptions[option][0] = userOptions[option][0].replace("'", ""), userOptions[option][userOptions[option].length - 1] = userOptions[option][userOptions[option].length - 1].replace("'", "")) : userOptions[option] = optionData);
        }
        return userOptions.alias ? resolveAlias(userOptions.alias, userOptions, opts) : $.extend(!0, opts, userOptions), 
        opts;
    }
    function generateMaskSet(opts, nocache) {
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
                    maskdef.placeholder = $.isFunction(maskdef.placeholder) ? maskdef.placeholder.call(this, opts) : maskdef.placeholder;
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
            function verifyGroupMarker(lastMatch) {
                lastMatch.isGroup && (lastMatch.isGroup = !1, insertTestDefinition(lastMatch, opts.groupmarker.start, 0), 
                insertTestDefinition(lastMatch, opts.groupmarker.end));
            }
            function maskCurrentToken(m, currentToken, lastMatch, extraCondition) {
                currentToken.matches.length > 0 && (void 0 == extraCondition || extraCondition) && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
                verifyGroupMarker(lastMatch)), insertTestDefinition(currentToken, m);
            }
            for (var match, m, openingToken, currentOpeningToken, alternator, lastMatch, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g, escaped = !1, currentToken = new maskToken(), openenings = [], maskTokens = []; match = tokenizer.exec(mask); ) if (m = match[0], 
            escaped) maskCurrentToken(m, currentToken, lastMatch); else switch (m.charAt(0)) {
              case opts.escapeChar:
                escaped = !0;
                break;

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

              case opts.alternatormarker:
                openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                lastMatch = currentOpeningToken.matches.pop()) : lastMatch = currentToken.matches.pop(), 
                lastMatch.isAlternator ? openenings.push(lastMatch) : (alternator = new maskToken(!1, !1, !1, !0), 
                alternator.matches.push(lastMatch), openenings.push(alternator));
                break;

              default:
                if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], maskCurrentToken(m, currentOpeningToken, lastMatch, !currentOpeningToken.isAlternator), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else maskCurrentToken(m, currentToken, lastMatch);
            }
            return currentToken.matches.length > 0 && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
            verifyGroupMarker(lastMatch), maskTokens.push(currentToken)), maskTokens;
        }
        function generateMask(mask, metadata) {
            if (void 0 == mask || "" == mask) return void 0;
            if (1 == mask.length && 0 == opts.greedy && 0 != opts.repeat && (opts.placeholder = ""), 
            opts.repeat > 0 || "*" == opts.repeat || "+" == opts.repeat) {
                var repeatStart = "*" == opts.repeat ? 0 : "+" == opts.repeat ? 1 : opts.repeat;
                mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
            }
            var masksetDefinition;
            return void 0 == inputmask.prototype.masksCache[mask] || nocache === !0 ? (masksetDefinition = {
                mask: mask,
                maskToken: analyseMask(mask),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: metadata
            }, nocache !== !0 && (inputmask.prototype.masksCache[mask] = masksetDefinition)) : masksetDefinition = $.extend(!0, {}, inputmask.prototype.masksCache[mask]), 
            masksetDefinition;
        }
        function preProcessMask(mask) {
            if (mask = mask.toString(), opts.numericInput) {
                mask = mask.split("").reverse();
                for (var ndx = 0; ndx < mask.length; ndx++) mask[ndx] == opts.optionalmarker.start ? mask[ndx] = opts.optionalmarker.end : mask[ndx] == opts.optionalmarker.end ? mask[ndx] = opts.optionalmarker.start : mask[ndx] == opts.groupmarker.start ? mask[ndx] = opts.groupmarker.end : mask[ndx] == opts.groupmarker.end && (mask[ndx] = opts.groupmarker.start);
                mask = mask.join("");
            }
            return mask;
        }
        var ms = void 0;
        if ($.isFunction(opts.mask) && (opts.mask = opts.mask.call(this, opts)), $.isArray(opts.mask)) {
            if (opts.mask.length > 1) {
                opts.keepStatic = void 0 == opts.keepStatic ? !0 : opts.keepStatic;
                var altMask = "(";
                return $.each(opts.mask, function(ndx, msk) {
                    altMask.length > 1 && (altMask += ")|("), altMask += preProcessMask(void 0 == msk.mask || $.isFunction(msk.mask) ? msk : msk.mask);
                }), altMask += ")", generateMask(altMask, opts.mask);
            }
            opts.mask = opts.mask.pop();
        }
        return opts.mask && (ms = void 0 == opts.mask.mask || $.isFunction(opts.mask.mask) ? generateMask(preProcessMask(opts.mask), opts.mask) : generateMask(preProcessMask(opts.mask.mask), opts.mask)), 
        ms;
    }
    function maskScope(actionObj, maskset, opts) {
        function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
            minimalPos = minimalPos || 0;
            var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0;
            do {
                if (baseOnInput === !0 && getMaskSet().validPositions[pos]) {
                    var validPos = getMaskSet().validPositions[pos];
                    test = validPos.match, ndxIntlzr = validPos.locator.slice(), maskTemplate.push(includeInput === !0 ? validPos.input : getPlaceholder(pos, test));
                } else testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, 
                ndxIntlzr = testPos.locator.slice(), maskTemplate.push(getPlaceholder(pos, test));
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
        function getLastValidPosition(closestTo, strict) {
            var maskset = getMaskSet(), lastValidPosition = -1, valids = maskset.validPositions;
            void 0 == closestTo && (closestTo = -1);
            var before = lastValidPosition, after = lastValidPosition;
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                valids[psNdx] && (strict || null != valids[psNdx].match.fn) && (closestTo >= psNdx && (before = psNdx), 
                psNdx >= closestTo && (after = psNdx));
            }
            return lastValidPosition = -1 != before && closestTo - before > 1 || closestTo > after ? before : after;
        }
        function setValidPosition(pos, validTest, fromSetValid) {
            if (opts.insertMode && void 0 != getMaskSet().validPositions[pos] && void 0 == fromSetValid) {
                var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition();
                for (i = pos; lvp >= i; i++) delete getMaskSet().validPositions[i];
                getMaskSet().validPositions[pos] = validTest;
                var j, valid = !0, vps = getMaskSet().validPositions;
                for (i = j = pos; lvp >= i; i++) {
                    var t = positionsClone[i];
                    if (void 0 != t) for (var posMatch = j, prevPosMatch = -1; posMatch < getMaskLength() && (null == t.match.fn && vps[i] && (vps[i].match.optionalQuantifier === !0 || vps[i].match.optionality === !0) || null != t.match.fn); ) {
                        if (null == t.match.fn || !opts.keepStatic && vps[i] && (void 0 != vps[i + 1] && getTests(i + 1, vps[i].locator.slice(), i).length > 1 || void 0 != vps[i].alternation) ? posMatch++ : posMatch = seekNext(j), 
                        positionCanMatchDefinition(posMatch, t.match.def)) {
                            valid = isValid(posMatch, t.input, !0, !0) !== !1, j = posMatch;
                            break;
                        }
                        if (valid = null == t.match.fn, prevPosMatch == posMatch) break;
                        prevPosMatch = posMatch;
                    }
                    if (!valid) break;
                }
                if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                !1;
            } else getMaskSet().validPositions[pos] = validTest;
            return !0;
        }
        function stripValidPositions(start, end, nocheck, strict) {
            var i, startPos = start;
            getMaskSet().p = start;
            for (i = startPos; end > i; i++) void 0 != getMaskSet().validPositions[i] && (nocheck === !0 || 0 != opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts)) && delete getMaskSet().validPositions[i];
            for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition(); ) {
                for (;void 0 != getMaskSet().validPositions[startPos]; ) startPos++;
                var s = getMaskSet().validPositions[startPos];
                startPos > i && (i = startPos + 1);
                var t = getMaskSet().validPositions[i];
                void 0 != t && void 0 == s ? (positionCanMatchDefinition(startPos, t.match.def) && isValid(startPos, t.input, !0) !== !1 && (delete getMaskSet().validPositions[i], 
                i++), startPos++) : i++;
            }
            var lvp = getLastValidPosition(), ml = getMaskLength();
            for (nocheck !== !0 && void 0 != getMaskSet().validPositions[lvp] && getMaskSet().validPositions[lvp].input == opts.radixPoint && delete getMaskSet().validPositions[lvp], 
            i = lvp + 1; ml >= i; i++) getMaskSet().validPositions[i] && delete getMaskSet().validPositions[i];
            resetMaskSet(!0);
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            var testPos = getMaskSet().validPositions[pos];
            if (void 0 == testPos) for (var testPositions = getTests(pos, ndxIntlzr, tstPs), lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = void 0 != lvTest.alternation ? lvTest.locator[lvTest.alternation].toString().split(",") : [], ndx = 0; ndx < testPositions.length && (testPos = testPositions[ndx], 
            !(testPos.match && (opts.greedy && testPos.match.optionalQuantifier !== !0 || (testPos.match.optionality === !1 || testPos.match.newBlockMarker === !1) && testPos.match.optionalQuantifier !== !0) && (void 0 == lvTest.alternation || lvTest.alternation != testPos.alternation || void 0 != testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr)))); ndx++) ;
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
        function getTests(pos, ndxIntlzr, tstPs, cacheable) {
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
                                if (!isFirstMatch) return !0;
                                insertStop = !0, testPos = pos;
                            }
                        } else if (match.isAlternator) {
                            var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if (-1 == altIndex || "string" == typeof altIndex) {
                                var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                                "string" == typeof altIndex && (altIndexArr = altIndex.split(","));
                                for (var amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                                    if (matches = [], match = handleMatch(alternateToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) || match, 
                                    match !== !0 && void 0 != match && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length) {
                                        var ntndx = maskToken.matches.indexOf(match) + 1;
                                        maskToken.matches.length > ntndx && (match = handleMatch(maskToken.matches[ntndx], [ ntndx ].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse), 
                                        match && (altIndexArr.push(ntndx.toString()), $.each(matches, function(ndx, lmnt) {
                                            lmnt.alternation = loopNdx.length - 1;
                                        })));
                                    }
                                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                    for (var i = 0; i < ndxInitializerClone.length; i++) ndxInitializer[i] = ndxInitializerClone[i];
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                        var altMatch = maltMatches[ndx1];
                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            if (altMatch.match.mask == altMatch2.match.mask && ("string" != typeof altIndex || -1 != $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr))) {
                                                maltMatches.splice(ndx1, 1), ndx1--, altMatch2.locator[altMatch.alternation] = altMatch2.locator[altMatch.alternation] + "," + altMatch.locator[altMatch.alternation], 
                                                altMatch2.alternation = altMatch.alternation;
                                                break;
                                            }
                                        }
                                    }
                                    malternateMatches = malternateMatches.concat(maltMatches);
                                }
                                "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                                    if (isFinite(ndx)) {
                                        var mamatch, alternation = lmnt.alternation, altLocArr = lmnt.locator[alternation].toString().split(",");
                                        lmnt.locator[alternation] = void 0, lmnt.alternation = void 0;
                                        for (var alndx = 0; alndx < altLocArr.length; alndx++) mamatch = -1 != $.inArray(altLocArr[alndx], altIndexArr), 
                                        mamatch && (void 0 != lmnt.locator[alternation] ? (lmnt.locator[alternation] += ",", 
                                        lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), 
                                        lmnt.alternation = alternation);
                                        if (void 0 != lmnt.locator[alternation]) return lmnt;
                                    }
                                })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0;
                            } else match = alternateToken.matches[altIndex] ? handleMatch(alternateToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse) : !1;
                            if (match) return !0;
                        } else if (match.isQuantifier && quantifierRecurse !== !0) for (var qt = match, qndx = ndxInitializer.length > 0 && quantifierRecurse !== !0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && pos >= testPos; qndx++) {
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
            if (cacheable === !0 && getMaskSet().tests[pos]) return getMaskSet().tests[pos];
            if (void 0 == ndxIntlzr) {
                for (var test, previousPos = pos - 1; void 0 == (test = getMaskSet().validPositions[previousPos]) && previousPos > -1 && (!getMaskSet().tests[previousPos] || void 0 == (test = getMaskSet().tests[previousPos][0])); ) previousPos--;
                void 0 != test && previousPos > -1 && (testPos = previousPos, ndxInitializer = test.locator.slice());
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
        function refreshFromBuffer(start, end, buffer) {
            if (buffer = buffer || getBuffer().slice(), start === !0) resetMaskSet(), start = 0, 
            end = buffer.length; else for (var i = start; end > i; i++) delete getMaskSet().validPositions[i], 
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
        function checkAlternationMatch(altArr1, altArr2) {
            for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, alndx = 0; alndx < altArr1.length; alndx++) if (-1 != $.inArray(altArr1[alndx], altArrC)) {
                isMatch = !0;
                break;
            }
            return isMatch;
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
                        var validatedPos = position, possibleModifiedBuffer = getBuffer();
                        if (void 0 != rslt.remove && ($.isArray(rslt.remove) || (rslt.remove = [ rslt.remove ]), 
                        $.each(rslt.remove.sort(function(a, b) {
                            return b - a;
                        }), function(ndx, lmnt) {
                            stripValidPositions(lmnt, lmnt + 1, !0);
                        })), void 0 != rslt.insert && ($.isArray(rslt.insert) || (rslt.insert = [ rslt.insert ]), 
                        $.each(rslt.insert.sort(function(a, b) {
                            return a - b;
                        }), function(ndx, lmnt) {
                            isValid(lmnt.pos, lmnt.c, !0);
                        })), rslt.refreshFromBuffer) {
                            var refresh = rslt.refreshFromBuffer;
                            if (strict = !0, refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), 
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
                for (var lastAlt, alternation, isValidRslt, altPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), lAlt = getLastValidPosition(); lAlt >= 0 && (altPos = getMaskSet().validPositions[lAlt], 
                !altPos || void 0 == altPos.alternation || (lastAlt = lAlt, alternation = getMaskSet().validPositions[lastAlt].alternation, 
                getTestTemplate(lastAlt).locator[altPos.alternation] == altPos.locator[altPos.alternation])); lAlt--) ;
                if (void 0 != alternation) {
                    lastAlt = parseInt(lastAlt);
                    for (var decisionPos in getMaskSet().validPositions) if (decisionPos = parseInt(decisionPos), 
                    altPos = getMaskSet().validPositions[decisionPos], decisionPos >= lastAlt && void 0 != altPos.alternation) {
                        var altNdxs = getMaskSet().validPositions[lastAlt].locator[alternation].toString().split(","), decisionTaker = altPos.locator[alternation] || altNdxs[0];
                        decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]);
                        for (var mndx = 0; mndx < altNdxs.length; mndx++) if (decisionTaker < altNdxs[mndx]) {
                            for (var possibilityPos, possibilities, dp = decisionPos; dp >= 0; dp--) if (possibilityPos = getMaskSet().validPositions[dp], 
                            void 0 != possibilityPos) {
                                possibilities = possibilityPos.locator[alternation], possibilityPos.locator[alternation] = parseInt(altNdxs[mndx]);
                                break;
                            }
                            if (decisionTaker != possibilityPos.locator[alternation]) {
                                for (var validInputs = [], staticInputsBeforePos = 0, i = decisionPos + 1; i < getLastValidPosition() + 1; i++) {
                                    var validPos = getMaskSet().validPositions[i];
                                    validPos && (null != validPos.match.fn ? validInputs.push(validPos.input) : pos > i && staticInputsBeforePos++), 
                                    delete getMaskSet().validPositions[i], delete getMaskSet().tests[i];
                                }
                                for (resetMaskSet(!0), opts.keepStatic = !opts.keepStatic, isValidRslt = !0; validInputs.length > 0; ) {
                                    var input = validInputs.shift();
                                    if (input != opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition() + 1, input, !1, !0))) break;
                                }
                                if (possibilityPos.alternation = alternation, possibilityPos.locator[alternation] = possibilities, 
                                isValidRslt) {
                                    for (var targetLvp = getLastValidPosition(pos) + 1, staticInputsBeforePosAlternate = 0, i = decisionPos + 1; i < getLastValidPosition() + 1; i++) {
                                        var validPos = getMaskSet().validPositions[i];
                                        validPos && null == validPos.match.fn && pos > i && staticInputsBeforePosAlternate++;
                                    }
                                    pos += staticInputsBeforePosAlternate - staticInputsBeforePos, isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid);
                                }
                                if (opts.keepStatic = !opts.keepStatic, isValidRslt) return isValidRslt;
                                resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone);
                            }
                        }
                        break;
                    }
                }
                return !1;
            }
            function trackbackAlternations(originalPos, newPos) {
                for (var vp = getMaskSet().validPositions[newPos], targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; newPos > ps; ps++) if (!isMask(ps)) {
                    var tests = getTests(ps), bestMatch = tests[0], equality = -1;
                    $.each(tests, function(ndx, tst) {
                        for (var i = 0; tll > i; i++) tst.locator[i] && checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(",")) && i > equality && (equality = i, 
                        bestMatch = tst);
                    }), setValidPosition(ps, $.extend({}, bestMatch, {
                        input: bestMatch.match.def
                    }), !0);
                }
            }
            strict = strict === !0;
            for (var buffer = getBuffer(), pndx = pos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx--) ;
            for (pndx++; pos > pndx; pndx++) void 0 == getMaskSet().validPositions[pndx] && ((!isMask(pndx) || buffer[pndx] != getPlaceholder(pndx)) && getTests(pndx).length > 1 || buffer[pndx] == opts.radixPoint || "0" == buffer[pndx] && $.inArray(opts.radixPoint, buffer) < pndx) && _isValid(pndx, buffer[pndx], !0);
            var maskPos = pos, result = !1, positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
            if (maskPos < getMaskLength() && (result = _isValid(maskPos, c, strict, fromSetValid), 
            (!strict || fromSetValid) && result === !1)) {
                var currentPosValid = getMaskSet().validPositions[maskPos];
                if (!currentPosValid || null != currentPosValid.match.fn || currentPosValid.match.def != c && c != opts.skipOptionalPartCharacter) {
                    if ((opts.insertMode || void 0 == getMaskSet().validPositions[seekNext(maskPos)]) && !isMask(maskPos)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); snPos >= nPos; nPos++) if (result = _isValid(nPos, c, strict, fromSetValid), 
                    result !== !1) {
                        trackbackAlternations(maskPos, nPos), maskPos = nPos;
                        break;
                    }
                } else result = {
                    caret: seekNext(maskPos)
                };
            }
            if (result === !1 && opts.keepStatic && isComplete(buffer) && (result = alternate(pos, c, strict, fromSetValid)), 
            result === !0 && (result = {
                pos: maskPos
            }), $.isFunction(opts.postValidation) && 0 != result && !strict) {
                resetMaskSet(!0);
                var postValidResult = opts.postValidation(getBuffer(), opts);
                if (!postValidResult) return resetMaskSet(!0), getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                !1;
            }
            return result;
        }
        function isMask(pos) {
            var test = getTest(pos);
            if (null != test.fn) return test.fn;
            if (!opts.keepStatic && void 0 == getMaskSet().validPositions[pos]) {
                for (var tests = getTests(pos), staticAlternations = !0, i = 0; i < tests.length; i++) if ("" != tests[i].match.def && (void 0 == tests[i].alternation || tests[i].locator[tests[i].alternation].length > 1)) {
                    staticAlternations = !1;
                    break;
                }
                return staticAlternations;
            }
            return !1;
        }
        function getMaskLength() {
            var maskLength;
            maxLength = $el.prop("maxLength"), -1 == maxLength && (maxLength = void 0);
            var pos, lvp = getLastValidPosition(), testPos = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 != testPos ? testPos.locator.slice() : void 0;
            for (pos = lvp + 1; void 0 == testPos || null != testPos.match.fn || null == testPos.match.fn && "" != testPos.match.def; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice();
            var lastTest = getTest(pos - 1);
            return maskLength = "" != lastTest.def ? pos : pos - 1, void 0 == maxLength || maxLength > maskLength ? maskLength : maxLength;
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
        function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
            if (event && $.isFunction(opts.onBeforeWrite)) {
                var result = opts.onBeforeWrite.call(input, event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer), 
                        resetMaskSet(!0), buffer = getBuffer();
                    }
                    caretPos = result.caret || caretPos;
                }
            }
            input._valueSet(buffer.join("")), void 0 != caretPos && caret(input, caretPos), 
            triggerInputEvent === !0 && (skipInputEvent = !0, $(input).trigger("input"));
        }
        function getPlaceholder(pos, test) {
            if (test = test || getTest(pos), void 0 != test.placeholder) return test.placeholder;
            if (null == test.fn) {
                if (!opts.keepStatic && void 0 == getMaskSet().validPositions[pos]) {
                    for (var prevTest, tests = getTests(pos), hasAlternations = !1, i = 0; i < tests.length; i++) {
                        if (prevTest && "" != tests[i].match.def && tests[i].match.def != prevTest.match.def && (void 0 == tests[i].alternation || tests[i].alternation == prevTest.alternation)) {
                            hasAlternations = !0;
                            break;
                        }
                        1 != tests[i].match.optionality && 1 != tests[i].match.optionalQuantifier && (prevTest = tests[i]);
                    }
                    if (hasAlternations) return opts.placeholder.charAt(pos % opts.placeholder.length);
                }
                return test.def;
            }
            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        function checkVal(input, writeOut, strict, nptvl) {
            function isTemplateMatch() {
                var isMatch = !1, charCodeNdx = getBufferTemplate().slice(initialNdx, seekNext(initialNdx)).join("").indexOf(charCodes);
                if (-1 != charCodeNdx && !isMask(initialNdx)) {
                    isMatch = !0;
                    for (var bufferTemplateArr = getBufferTemplate().slice(initialNdx, initialNdx + charCodeNdx), i = 0; i < bufferTemplateArr.length; i++) if (" " != bufferTemplateArr[i]) {
                        isMatch = !1;
                        break;
                    }
                }
                return isMatch;
            }
            var inputValue = void 0 != nptvl ? nptvl.slice() : input._valueGet().split(""), charCodes = "", initialNdx = 0;
            if (resetMaskSet(), getMaskSet().p = seekNext(-1), writeOut && input._valueSet(""), 
            !strict) {
                var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + escapeRegex(staticInput), "g"));
                matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), 
                initialNdx = seekNext(initialNdx));
            }
            $.each(inputValue, function(ndx, charCode) {
                var keypress = $.Event("keypress");
                keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                var lvp = getLastValidPosition(void 0, !0), lvTest = getMaskSet().validPositions[lvp], nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : void 0, lvp);
                if (!isTemplateMatch() || strict) {
                    var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                    keypressEvent.call(input, keypress, !0, !1, strict, pos), initialNdx = pos + 1, 
                    charCodes = "";
                } else keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
            }), writeOut && writeBuffer(input, getBuffer(), $(input).is(":focus") ? seekNext(getLastValidPosition(0)) : void 0, $.Event("checkval"));
        }
        function escapeRegex(str) {
            return inputmask.escapeRegex(str);
        }
        function unmaskedvalue($input) {
            if ($input[0].inputmask && !$input.hasClass("hasDatepicker")) {
                var umValue = [], vps = getMaskSet().validPositions;
                for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
                var unmaskedValue = (isRTL ? umValue.reverse() : umValue).join(""), bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                return $.isFunction(opts.onUnMask) && (unmaskedValue = opts.onUnMask.call($input, bufferValue, unmaskedValue, opts) || unmaskedValue), 
                unmaskedValue;
            }
            return $input[0]._valueGet();
        }
        function caret(input, begin, end) {
            function TranslatePosition(pos) {
                if (isRTL && "number" == typeof pos && (!opts.greedy || "" != opts.placeholder)) {
                    var bffrLght = getBuffer().length;
                    pos = bffrLght - pos;
                }
                return pos;
            }
            var range, npt = input.jquery && input.length > 0 ? input[0] : input;
            if ("number" != typeof begin) return npt.setSelectionRange ? (begin = npt.selectionStart, 
            end = npt.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), 
            (range.commonAncestorContainer.parentNode == npt || range.commonAncestorContainer == npt) && (begin = range.startOffset, 
            end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
            begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), 
            {
                begin: TranslatePosition(begin),
                end: TranslatePosition(end)
            };
            if (begin = TranslatePosition(begin), end = TranslatePosition(end), end = "number" == typeof end ? end : begin, 
            $(npt).is(":visible")) {
                var scrollCalc = $(npt).css("font-size").replace("px", "") * end;
                if (npt.scrollLeft = scrollCalc > npt.scrollWidth ? scrollCalc : 0, androidchrome || 0 != opts.insertMode || begin != end || end++, 
                npt.setSelectionRange) npt.selectionStart = begin, npt.selectionEnd = end; else if (window.getSelection) {
                    if (range = document.createRange(), void 0 == npt.firstChild) {
                        var textNode = document.createTextNode("");
                        npt.appendChild(textNode);
                    }
                    range.setStart(npt.firstChild, begin < npt._valueGet().length ? begin : npt._valueGet().length), 
                    range.setEnd(npt.firstChild, end < npt._valueGet().length ? end : npt._valueGet().length), 
                    range.collapse(!0);
                    var sel = window.getSelection();
                    sel.removeAllRanges(), sel.addRange(range);
                } else npt.createTextRange && (range = npt.createTextRange(), range.collapse(!0), 
                range.moveEnd("character", end), range.moveStart("character", begin), range.select());
            }
        }
        function determineLastRequiredPosition(returnDefinition) {
            var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 != lvTest ? lvTest.locator.slice() : void 0;
            for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
            var lvTestAlt = lvTest && void 0 != lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
            for (pos = bl - 1; pos > lvp && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier || lvTestAlt && (lvTestAlt != positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null == testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.split(",")) && "" != getTests(pos)[0].def)) && buffer[pos] == getPlaceholder(pos, testPos.match)); pos--) bl--;
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : void 0
            } : bl;
        }
        function clearOptionalTail(buffer) {
            for (var rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), buffer;
        }
        function isComplete(buffer) {
            if ($.isFunction(opts.isComplete)) return opts.isComplete.call($el, buffer, opts);
            if ("*" == opts.repeat) return void 0;
            {
                var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
                getLastValidPosition();
            }
            if (void 0 == lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                complete = !0;
                for (var i = 0; aml >= i; i++) {
                    var test = getTestTemplate(i).match;
                    if (null != test.fn && void 0 == getMaskSet().validPositions[i] && test.optionality !== !0 && test.optionalQuantifier !== !0 || null == test.fn && buffer[i] != getPlaceholder(i, test)) {
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
            var events = $._data(npt).events, inComposition = !1;
            $.each(events, function(eventType, eventHandlers) {
                $.each(eventHandlers, function(ndx, eventHandler) {
                    if ("inputmask" == eventHandler.namespace && "setvalue" != eventHandler.type) {
                        var handler = eventHandler.handler;
                        eventHandler.handler = function(e) {
                            if (!(this.disabled || this.readOnly && !("keydown" == e.type && e.ctrlKey && 67 == e.keyCode || e.keyCode == inputmask.keyCode.TAB))) {
                                switch (e.type) {
                                  case "input":
                                    if (skipInputEvent === !0 || inComposition === !0) return skipInputEvent = !1, e.preventDefault();
                                    break;

                                  case "keydown":
                                    skipKeyPressEvent = !1, inComposition = !1;
                                    break;

                                  case "keypress":
                                    if (skipKeyPressEvent === !0) return e.preventDefault();
                                    skipKeyPressEvent = !0;
                                    break;

                                  case "compositionstart":
                                    inComposition = !0;
                                    break;

                                  case "compositionupdate":
                                    skipInputEvent = !0;
                                    break;

                                  case "compositionend":
                                    inComposition = !1;
                                }
                                return handler.apply(this, arguments);
                            }
                            e.preventDefault();
                        };
                    }
                });
            });
        }
        function patchValueProperty(npt) {
            function PatchValhook(type) {
                if (void 0 == $.valHooks[type] || 1 != $.valHooks[type].inputmaskpatch) {
                    var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                        return elem.value;
                    }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                        return elem.value = value, elem;
                    };
                    $.valHooks[type] = {
                        get: function(elem) {
                            $(elem);
                            if (elem.inputmask) {
                                if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                var result = valhookGet(elem), maskset = elem.inputmask.maskset, bufferTemplate = maskset._buffer;
                                return bufferTemplate = bufferTemplate ? bufferTemplate.join("") : "", result != bufferTemplate ? result : "";
                            }
                            return valhookGet(elem);
                        },
                        set: function(elem, value) {
                            var result, $elem = $(elem);
                            return result = valhookSet(elem, value), elem.inputmask && $elem.triggerHandler("setvalue.inputmask"), 
                            result;
                        },
                        inputmaskpatch: !0
                    };
                }
            }
            function getter() {
                $(this);
                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : valueGet.call(this) != getBufferTemplate().join("") ? valueGet.call(this) : "" : valueGet.call(this);
            }
            function setter(value) {
                valueSet.call(this, value), this.inputmask && $(this).triggerHandler("setvalue.inputmask");
            }
            function InstallNativeValueSetFallback(npt) {
                $(npt).bind("mouseenter.inputmask", function(event) {
                    var $input = $(this), input = this, value = input._valueGet();
                    "" != value && value != getBuffer().join("") && $input.triggerHandler("setvalue.inputmask");
                });
                //!! the bound handlers are executed in the order they where bound
                var events = $._data(npt).events, handlers = events.mouseover;
                if (handlers) {
                    for (var ourHandler = handlers[handlers.length - 1], i = handlers.length - 1; i > 0; i--) handlers[i] = handlers[i - 1];
                    handlers[0] = ourHandler;
                }
            }
            var valueGet, valueSet;
            if (!npt._valueGet) {
                var valueProperty;
                Object.getOwnPropertyDescriptor && void 0 == npt.value ? (valueGet = function() {
                    return this.textContent;
                }, valueSet = function(value) {
                    this.textContent = value;
                }, Object.defineProperty(npt, "value", {
                    get: getter,
                    set: setter
                })) : ((valueProperty = Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(npt, "value")) && valueProperty.configurable, 
                document.__lookupGetter__ && npt.__lookupGetter__("value") ? (valueGet = npt.__lookupGetter__("value"), 
                valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                npt.__defineSetter__("value", setter)) : (valueGet = function() {
                    return npt.value;
                }, valueSet = function(value) {
                    npt.value = value;
                }, PatchValhook(npt.type), InstallNativeValueSetFallback(npt))), npt._valueGet = function(overruleRTL) {
                    return isRTL && overruleRTL !== !0 ? valueGet.call(this).split("").reverse().join("") : valueGet.call(this);
                }, npt._valueSet = function(value) {
                    valueSet.call(this, isRTL ? value.split("").reverse().join("") : value);
                };
            }
        }
        function handleRemove(input, k, pos, strict) {
            function generalize() {
                if (opts.keepStatic) {
                    resetMaskSet(!0);
                    var lastAlt, validInputs = [], positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
                    for (lastAlt = getLastValidPosition(); lastAlt >= 0; lastAlt--) {
                        var validPos = getMaskSet().validPositions[lastAlt];
                        if (validPos && (null != validPos.match.fn && validInputs.push(validPos.input), 
                        delete getMaskSet().validPositions[lastAlt], void 0 != validPos.alternation && validPos.locator[validPos.alternation] == getTestTemplate(lastAlt).locator[validPos.alternation])) break;
                    }
                    if (lastAlt > -1) for (;validInputs.length > 0; ) {
                        getMaskSet().p = seekNext(getLastValidPosition());
                        var keypress = $.Event("keypress");
                        keypress.which = validInputs.pop().charCodeAt(0), keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p);
                    } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone);
                }
            }
            if ((opts.numericInput || isRTL) && (k == inputmask.keyCode.BACKSPACE ? k = inputmask.keyCode.DELETE : k == inputmask.keyCode.DELETE && (k = inputmask.keyCode.BACKSPACE), 
            isRTL)) {
                var pend = pos.end;
                pos.end = pos.begin, pos.begin = pend;
            }
            if (k == inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || 0 == opts.insertMode) ? (pos.begin = seekPrevious(pos.begin), 
            void 0 == getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input != opts.groupSeparator && getMaskSet().validPositions[pos.begin].input != opts.radixPoint || pos.begin--) : k == inputmask.keyCode.DELETE && pos.begin == pos.end && (pos.end = isMask(pos.end) ? pos.end + 1 : seekNext(pos.end) + 1, 
            void 0 == getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input != opts.groupSeparator && getMaskSet().validPositions[pos.begin].input != opts.radixPoint || pos.end++), 
            stripValidPositions(pos.begin, pos.end, !1, strict), strict !== !0) {
                generalize();
                var lvp = getLastValidPosition(pos.begin);
                lvp < pos.begin ? (-1 == lvp && resetMaskSet(), getMaskSet().p = seekNext(lvp)) : getMaskSet().p = pos.begin;
            }
        }
        function keydownEvent(e) {
            var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
            k == inputmask.keyCode.BACKSPACE || k == inputmask.keyCode.DELETE || iphone && 127 == k || e.ctrlKey && 88 == k && !isInputEventSupported("cut") ? (e.preventDefault(), 
            88 == k && (undoValue = getBuffer().join("")), handleRemove(input, k, pos), writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue != getBuffer().join("")), 
            input._valueGet() == getBufferTemplate().join("") ? $input.trigger("cleared") : isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
            opts.showTooltip && $input.prop("title", getMaskSet().mask)) : k == inputmask.keyCode.END || k == inputmask.keyCode.PAGE_DOWN ? setTimeout(function() {
                var caretPos = seekNext(getLastValidPosition());
                opts.insertMode || caretPos != getMaskLength() || e.shiftKey || caretPos--, caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
            }, 0) : k == inputmask.keyCode.HOME && !e.shiftKey || k == inputmask.keyCode.PAGE_UP ? caret(input, 0, e.shiftKey ? pos.begin : 0) : (opts.undoOnEscape && k == inputmask.keyCode.ESCAPE || 90 == k && e.ctrlKey) && e.altKey !== !0 ? (checkVal(input, !0, !1, undoValue.split("")), 
            $input.click()) : k != inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? 0 != opts.insertMode || e.shiftKey || (k == inputmask.keyCode.RIGHT ? setTimeout(function() {
                var caretPos = caret(input);
                caret(input, caretPos.begin);
            }, 0) : k == inputmask.keyCode.LEFT && setTimeout(function() {
                var caretPos = caret(input);
                caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
            }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin != getMaskLength() ? pos.begin : pos.begin - 1)), 
            opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 != $.inArray(k, opts.ignorables);
        }
        function keypressEvent(e, checkval, writeOut, strict, ndx) {
            var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
            if (!(checkval === !0 || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return !0;
            if (k) {
                46 == k && 0 == e.shiftKey && "," == opts.radixPoint && (k = 44);
                var forwardPosition, pos = checkval ? {
                    begin: ndx,
                    end: ndx
                } : caret(input), c = String.fromCharCode(k), isSlctn = isSelection(pos.begin, pos.end);
                isSlctn && (getMaskSet().undoPositions = $.extend(!0, {}, getMaskSet().validPositions), 
                handleRemove(input, inputmask.keyCode.DELETE, pos, !0), pos.begin = getMaskSet().p, 
                opts.insertMode || (opts.insertMode = !opts.insertMode, setValidPosition(pos.begin, strict), 
                opts.insertMode = !opts.insertMode), isSlctn = !opts.multi), getMaskSet().writeOutBuffer = !0;
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
                        writeBuffer(input, buffer, checkval ? void 0 : opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition, e, checkval !== !0), 
                        checkval !== !0 && setTimeout(function() {
                            isComplete(buffer) === !0 && $input.trigger("complete");
                        }, 0);
                    } else isSlctn && (getMaskSet().buffer = void 0, getMaskSet().validPositions = getMaskSet().undoPositions);
                } else isSlctn && (getMaskSet().buffer = void 0, getMaskSet().validPositions = getMaskSet().undoPositions);
                if (opts.showTooltip && $input.prop("title", getMaskSet().mask), checkval && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite.call(this, e, getBuffer(), forwardPosition, opts);
                    if (result && result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer), 
                        resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret);
                    }
                }
                e.preventDefault();
            }
        }
        function pasteEvent(e) {
            var input = this, $input = $(input), inputValue = input._valueGet(!0), caretPos = caret(input);
            if ("propertychange" == e.type && input._valueGet().length <= getMaskLength()) return !0;
            if ("paste" == e.type) {
                var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                valueBeforeCaret == getBufferTemplate().slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
                valueAfterCaret == getBufferTemplate().slice(caretPos.end).join("") && (valueAfterCaret = ""), 
                window.clipboardData && window.clipboardData.getData ? inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret : e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData && (inputValue = valueBeforeCaret + e.originalEvent.clipboardData.getData("text/plain") + valueAfterCaret);
            }
            var pasteValue = inputValue;
            if ($.isFunction(opts.onBeforePaste)) {
                if (pasteValue = opts.onBeforePaste.call(input, inputValue, opts), pasteValue === !1) return e.preventDefault(), 
                !1;
                pasteValue || (pasteValue = inputValue);
            }
            return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.split("")), 
            writeBuffer(input, getBuffer(), void 0, e, !0), $input.click(), isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
            !1;
        }
        function inputFallBackEvent(e) {
            var input = this;
            checkVal(input, !0, !1), isComplete(getBuffer()) === !0 && $(input).trigger("complete"), 
            e.preventDefault();
        }
        function compositionStartEvent(e) {
            var input = this;
            undoValue = getBuffer().join(""), ("" == compositionData || 0 != e.originalEvent.data.indexOf(compositionData)) && (compositionCaretPos = caret(input));
        }
        function compositionUpdateEvent(e) {
            var input = this, caretPos = caret(input);
            0 == e.originalEvent.data.indexOf(compositionData) && (resetMaskSet(), caretPos = compositionCaretPos);
            var newData = e.originalEvent.data;
            caret(input, caretPos.begin, caretPos.end);
            for (var i = 0; i < newData.length; i++) {
                var keypress = $.Event("keypress");
                keypress.which = newData.charCodeAt(i), skipKeyPressEvent = !1, ignorable = !1, 
                keypressEvent.call(input, keypress);
            }
            setTimeout(function() {
                var forwardPosition = getMaskSet().p;
                writeBuffer(input, getBuffer(), opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition);
            }, 0), compositionData = e.originalEvent.data;
        }
        function compositionEndEvent(e) {}
        function mask(el) {
            $el = $(el), opts.showTooltip && $el.prop("title", getMaskSet().mask), ("rtl" == el.dir || opts.rightAlign) && $el.css("text-align", "right"), 
            ("rtl" == el.dir || opts.numericInput) && (el.dir = "ltr", $el.removeAttr("dir"), 
            el.inputmask.isRTL = !0, isRTL = !0), $el.unbind(".inputmask"), ($el.is(":input") && isInputTypeSupported($el.attr("type")) || el.isContentEditable) && ($el.closest("form").bind("submit", function(e) {
                undoValue != getBuffer().join("") && $el.change(), opts.clearMaskOnLostFocus && $el[0]._valueGet && $el[0]._valueGet() == getBufferTemplate().join("") && $el[0]._valueSet(""), 
                opts.removeMaskOnSubmit && $el.inputmask("remove");
            }).bind("reset", function() {
                setTimeout(function() {
                    $el.triggerHandler("setvalue.inputmask");
                }, 0);
            }), $el.bind("mouseenter.inputmask", function() {
                var $input = $(this), input = this;
                mouseEnter = !0, !$input.is(":focus") && opts.showMaskOnHover && input._valueGet() != getBuffer().join("") && writeBuffer(input, getBuffer());
            }).bind("blur.inputmask", function(e) {
                var $input = $(this), input = this;
                if (input.inputmask) {
                    var nptValue = input._valueGet(), buffer = getBuffer().slice();
                    firstClick = !0, undoValue != buffer.join("") && setTimeout(function() {
                        $input.change(), undoValue = buffer.join("");
                    }, 0), "" != nptValue && (opts.clearMaskOnLostFocus && (nptValue == getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
                    isComplete(buffer) === !1 && ($input.trigger("incomplete"), opts.clearIncomplete && (resetMaskSet(), 
                    buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), writeBuffer(input, buffer, void 0, e));
                }
            }).bind("focus.inputmask", function(e) {
                var input = ($(this), this), nptValue = input._valueGet();
                opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" == nptValue) ? input._valueGet() != getBuffer().join("") && writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : mouseEnter === !1 && caret(input, seekNext(getLastValidPosition())), 
                undoValue = getBuffer().join("");
            }).bind("mouseleave.inputmask", function() {
                var $input = $(this), input = this;
                if (mouseEnter = !1, opts.clearMaskOnLostFocus) {
                    var buffer = getBuffer().slice(), nptValue = input._valueGet();
                    $input.is(":focus") || nptValue == $input.attr("placeholder") || "" == nptValue || (nptValue == getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), 
                    writeBuffer(input, buffer));
                }
            }).bind("click.inputmask", function() {
                var $input = $(this), input = this;
                if ($input.is(":focus")) {
                    var selectedCaret = caret(input);
                    if (selectedCaret.begin == selectedCaret.end) if (opts.radixFocus && "" != opts.radixPoint && -1 != $.inArray(opts.radixPoint, getBuffer()) && (firstClick || getBuffer().join("") == getBufferTemplate().join(""))) caret(input, $.inArray(opts.radixPoint, getBuffer())), 
                    firstClick = !1; else {
                        var clickPosition = selectedCaret.begin, lastPosition = seekNext(getLastValidPosition(clickPosition));
                        lastPosition > clickPosition ? caret(input, isMask(clickPosition) ? clickPosition : seekNext(clickPosition)) : caret(input, lastPosition);
                    }
                }
            }).bind("dblclick.inputmask", function() {
                var input = this;
                setTimeout(function() {
                    caret(input, 0, seekNext(getLastValidPosition()));
                }, 0);
            }).bind(PasteEventType + ".inputmask dragdrop.inputmask drop.inputmask", pasteEvent).bind("cut.inputmask", function(e) {
                skipInputEvent = !0;
                var input = this, $input = $(input), pos = caret(input);
                handleRemove(input, inputmask.keyCode.DELETE, pos), writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue != getBuffer().join("")), 
                input._valueGet() == getBufferTemplate().join("") && $input.trigger("cleared"), 
                opts.showTooltip && $input.prop("title", getMaskSet().mask);
            }).bind("complete.inputmask", opts.oncomplete).bind("incomplete.inputmask", opts.onincomplete).bind("cleared.inputmask", opts.oncleared), 
            $el.bind("keydown.inputmask", keydownEvent).bind("keypress.inputmask", keypressEvent), 
            androidfirefox || $el.bind("compositionstart.inputmask", compositionStartEvent).bind("compositionupdate.inputmask", compositionUpdateEvent).bind("compositionend.inputmask", compositionEndEvent), 
            "paste" === PasteEventType && $el.bind("input.inputmask", inputFallBackEvent)), 
            $el.bind("setvalue.inputmask", function() {
                var input = this, value = input._valueGet();
                input._valueSet($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(input, value, opts) || value : value), 
                checkVal(input, !0, !1), undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input._valueGet() == getBufferTemplate().join("") && input._valueSet("");
            }), patchValueProperty(el);
            var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(el, el._valueGet(), opts) || el._valueGet() : el._valueGet();
            checkVal(el, !0, !1, initialValue.split(""));
            var buffer = getBuffer().slice();
            undoValue = buffer.join("");
            var activeElement;
            try {
                activeElement = document.activeElement;
            } catch (e) {}
            isComplete(buffer) === !1 && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && (buffer.join("") == getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
            writeBuffer(el, buffer), activeElement === el && caret(el, seekNext(getLastValidPosition())), 
            installEventRuler(el);
        }
        var undoValue, compositionCaretPos, compositionData, el, $el, maxLength, isRTL = !1, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, firstClick = !0, mouseEnter = !0;
        if (void 0 != actionObj) switch (actionObj.action) {
          case "isComplete":
            return el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            isComplete(actionObj.buffer);

          case "unmaskedvalue":
            return el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            isRTL = el.inputmask.isRTL, unmaskedvalue($el);

          case "mask":
            undoValue = getBuffer().join(""), mask(actionObj.el);
            break;

          case "format":
            $el = $({}), $el[0].inputmask = new inputmask(), $el[0].inputmask.opts = opts, $el[0].inputmask.el = $el[0], 
            $el[0].inputmask.maskset = maskset, $el[0].inputmask.isRTL = opts.numericInput, 
            opts.numericInput && (isRTL = !0);
            var valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call($el, actionObj.value, opts) || actionObj.value : actionObj.value).split("");
            return checkVal($el, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(this, void 0, getBuffer(), 0, opts), 
            actionObj.metadata ? {
                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                metadata: $el.inputmask("getmetadata")
            } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

          case "isValid":
            $el = $({}), $el[0].inputmask = new inputmask(), $el[0].inputmask.opts = opts, $el[0].inputmask.el = $el[0], 
            $el[0].inputmask.maskset = maskset, $el[0].inputmask.isRTL = opts.numericInput, 
            opts.numericInput && (isRTL = !0);
            var valueBuffer = actionObj.value.split("");
            checkVal($el, !1, !0, isRTL ? valueBuffer.reverse() : valueBuffer);
            for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value == buffer.join("");

          case "getemptymask":
            return el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            getBufferTemplate();

          case "remove":
            el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            el._valueSet(unmaskedvalue($el)), $el.unbind(".inputmask"), el.inputmask = void 0;
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
            if (el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
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
    inputmask.prototype = {
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
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            aliases: {},
            alias: null,
            onKeyDown: $.noop,
            onBeforeMask: void 0,
            onBeforePaste: void 0,
            onBeforeWrite: void 0,
            onUnMask: void 0,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: $.noop,
            skipOptionalPartCharacter: " ",
            showTooltip: !1,
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: "",
            groupSeparator: "",
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
                    validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1
                }
            },
            ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 ],
            isComplete: void 0,
            canClearPosition: $.noop,
            postValidation: void 0
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
        mask: function(el) {
            var input = el.jquery && el.length > 0 ? el[0] : el, scopedOpts = $.extend(!0, {}, this.opts);
            importAttributeOptions(el, scopedOpts, $.extend(!0, {}, this.userOptions));
            var maskset = generateMaskSet(scopedOpts, this.noMasksCache);
            return void 0 != maskset && (input.inputmask = new inputmask(), input.inputmask.opts = scopedOpts, 
            input.inputmask.noMasksCache = this.noMasksCache, input.inputmask.el = input, input.inputmask.maskset = maskset, 
            input.inputmask.isRTL = !1, maskScope({
                action: "mask",
                el: input
            }, maskset, input.inputmask.opts)), el;
        },
        unmaskedvalue: function() {
            return this.el ? maskScope({
                action: "unmaskedvalue",
                el: this.el
            }) : void 0;
        },
        remove: function() {
            return this.el ? (maskScope({
                action: "remove",
                el: this.el
            }), this.el.inputmask = void 0, this.el) : void 0;
        },
        getemptymask: function() {
            return this.el ? maskScope({
                action: "getemptymask",
                el: this.el
            }) : void 0;
        },
        hasMaskedValue: function() {
            return !this.opts.autoUnmask;
        },
        isComplete: function() {
            return this.el ? maskScope({
                action: "isComplete",
                buffer: this.el._valueGet().split(""),
                el: this.el
            }) : void 0;
        },
        getmetadata: function() {
            return this.el ? maskScope({
                action: "getmetadata",
                el: this.el
            }) : void 0;
        }
    }, inputmask.extendDefaults = function(options) {
        $.extend(inputmask.prototype.defaults, options);
    }, inputmask.extendDefinitions = function(definition) {
        $.extend(inputmask.prototype.defaults.definitions, definition);
    }, inputmask.extendAliases = function(alias) {
        $.extend(inputmask.prototype.defaults.aliases, alias);
    }, inputmask.format = function(value, options, metadata) {
        var opts = $.extend(!0, {}, inputmask.prototype.defaults, options);
        return resolveAlias(opts.alias, options, opts), maskScope({
            action: "format",
            value: value,
            metadata: metadata
        }, generateMaskSet(opts, options && void 0 !== options.definitions), opts);
    }, inputmask.isValid = function(value, options) {
        var opts = $.extend(!0, {}, inputmask.prototype.defaults, options);
        return resolveAlias(opts.alias, options, opts), maskScope({
            action: "isValid",
            value: value
        }, generateMaskSet(opts, options && void 0 !== options.definitions), opts);
    }, inputmask.escapeRegex = function(str) {
        var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
        return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    }, inputmask.keyCode = {
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
    };
    var ua = navigator.userAgent, iphone = null !== ua.match(new RegExp("iphone", "i")), androidchrome = (null !== ua.match(new RegExp("android.*safari.*", "i")), 
    null !== ua.match(new RegExp("android.*chrome.*", "i"))), androidfirefox = null !== ua.match(new RegExp("android.*firefox.*", "i")), PasteEventType = (/Kindle/i.test(ua) || /Silk/i.test(ua) || /KFTT/i.test(ua) || /KFOT/i.test(ua) || /KFJWA/i.test(ua) || /KFJWI/i.test(ua) || /KFSOWI/i.test(ua) || /KFTHWA/i.test(ua) || /KFTHWI/i.test(ua) || /KFAPWA/i.test(ua) || /KFAPWI/i.test(ua), 
    isInputEventSupported("paste") ? "paste" : isInputEventSupported("input") ? "input" : "propertychange");
    return window.inputmask = inputmask, inputmask;
});