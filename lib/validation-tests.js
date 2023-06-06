export {
    determineTestTemplate,
    getDecisionTaker,
    getMaskTemplate,
    getPlaceholder,
    getTest,
    getTests,
    getTestTemplate,
    isSubsetOf
};
import Inputmask from "./inputmask";

function getLocator(tst, align) { //need to align the locators to be correct
    var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
    if (locator !== "") while (locator.length < align) locator += "0";
    return locator;
}

function getDecisionTaker(tst) {
    var decisionTaker = tst.locator[tst.alternation];
    if (typeof decisionTaker == "string" && decisionTaker.length > 0) { //no decision taken ~ take first one as decider
        decisionTaker = decisionTaker.split(",")[0];
    }
    return decisionTaker !== undefined ? decisionTaker.toString() : "";
}

//tobe put on prototype?
function getPlaceholder(pos, test, returnPL) {
    const inputmask = this,
        opts = this.opts,
        maskset = this.maskset;

    test = test || getTest.call(inputmask, pos).match;
    if (test.placeholder !== undefined || returnPL === true) {
        return typeof test.placeholder === "function" ? test.placeholder(opts) : test.placeholder;
    } else if (test.static === true) {
        if (pos > -1 && maskset.validPositions[pos] === undefined) {
            var tests = getTests.call(inputmask, pos),
                staticAlternations = [],
                prevTest;
            if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
                for (var i = 0; i < tests.length; i++) {
                    if (tests[i].match.def !== "" && tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true &&
                        (tests[i].match.static === true || (prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, maskset, pos, true, opts) !== false))) {
                        staticAlternations.push(tests[i]);
                        if (tests[i].match.static === true) prevTest = tests[i];
                        if (staticAlternations.length > 1) {
                            if (/[0-9a-bA-Z]/.test(staticAlternations[0].match.def)) {
                                return opts.placeholder.charAt(pos % opts.placeholder.length);
                            }
                        }
                    }
                }
            }
        }
        return test.def;
    }

    return opts.placeholder.charAt(pos % opts.placeholder.length);
}

//tobe put on prototype?
function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
    //includeMode true => input, undefined => placeholder, false => mask

    var inputmask = this,
        opts = this.opts,
        maskset = this.maskset;


    var greedy = opts.greedy;
    if (clearOptionalTail && opts.greedy) {
        opts.greedy = false;
        inputmask.maskset.tests = {};
    }
    minimalPos = minimalPos || 0;
    var maskTemplate = [],
        ndxIntlzr, pos = 0,
        test, testPos, jitRenderStatic;
    do {
        if (baseOnInput === true && maskset.validPositions[pos]) {
            testPos = (clearOptionalTail && maskset.validPositions[pos].match.optionality
                && maskset.validPositions[pos + 1] === undefined
                && (maskset.validPositions[pos].generatedInput === true || (maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0)))
                ? determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr, pos - 1))
                : maskset.validPositions[pos];
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, pos, test));
        } else {
            testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            var jitMasking = noJit === true ? false : (opts.jitMasking !== false ? opts.jitMasking : test.jit);
            //check for groupSeparator is a hack for the numerics as we don't want the render of the groupSeparator beforehand
            jitRenderStatic = (jitRenderStatic || (maskset.validPositions[pos - 1] /* && getTest.call(inputmask, pos + 1).match.def == "" */)) &&
                test.static && test.def !== opts.groupSeparator && test.fn === null;

            if (jitRenderStatic || jitMasking === false || jitMasking === undefined /*|| pos < lvp*/ || (typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos)) {
                maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, maskTemplate.length, test));
            } else {
                jitRenderStatic = false;
            }
        }

        pos++;
    } while ((test.static !== true || test.def !== "") || minimalPos > pos);
    if (maskTemplate[maskTemplate.length - 1] === "") {
        maskTemplate.pop(); //drop the last one which is empty
    }
    if (includeMode !== false || //do not alter the masklength when just retrieving the maskdefinition
        maskset.maskLength === undefined) //just make sure the maskLength gets initialized in all cases (needed for isValid)
    {
        maskset.maskLength = pos - 1;
    }

    opts.greedy = greedy;
    return maskTemplate;
}

//tobe put on prototype?
function getTestTemplate(pos, ndxIntlzr, tstPs) {
    var inputmask = this,
        maskset = this.maskset;

    return maskset.validPositions[pos] || determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
}

//tobe put on prototype?
function determineTestTemplate(pos, tests) {
    var inputmask = this,
        opts = this.opts,
        lenghtOffset = 0;
    var optionalityLevel = determineOptionalityLevel(pos, tests);
    pos = pos > 0 ? pos - 1 : 0;
    var altTest = getTest.call(inputmask, pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch;
    if (opts.greedy && tests.length > 1 && tests[tests.length - 1].match.def === "")
        lenghtOffset = 1;
    // console.log(" optionality = " + optionalityLevel);
    // console.log(" - " + JSON.stringify(tests));
    for (var ndx = 0; ndx < tests.length - lenghtOffset; ndx++) { //find best matching
        var tst = tests[ndx];
        tstLocator = getLocator(tst, targetLocator.length);
        var distance = Math.abs(tstLocator - targetLocator);

        if (closest === undefined
            || (tstLocator !== "" && distance < closest)
            || (bestMatch && !opts.greedy &&
                (bestMatch.match.optionality && bestMatch.match.optionality - optionalityLevel > 0) &&
                bestMatch.match.newBlockMarker === "master" &&
                ((!tst.match.optionality || tst.match.optionality - optionalityLevel < 1) || !tst.match.newBlockMarker))
            || (bestMatch && !opts.greedy && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier)) {
            closest = distance;
            bestMatch = tst;
        }
    }
    return bestMatch;
}

function determineOptionalityLevel(pos, tests) {
    let optionalityLevel = 0, differentOptionalLevels = false;
    tests.forEach(test => {
        if (test.match.optionality) {
            if (optionalityLevel !== 0 && optionalityLevel !== test.match.optionality)
                differentOptionalLevels = true;
            if (optionalityLevel === 0 || optionalityLevel > test.match.optionality) {
                optionalityLevel = test.match.optionality;
            }
        }
    });
    if (optionalityLevel) {
        if (pos == 0) optionalityLevel = 0;
        else if (tests.length == 1) optionalityLevel = 0;
        else if (!differentOptionalLevels) optionalityLevel = 0;
    }
    return optionalityLevel;
}

//tobe put on prototype?
function getTest(pos, tests) {
    var inputmask = this,
        maskset = this.maskset;

    if (maskset.validPositions[pos]) {
        return maskset.validPositions[pos];
    }
    return (tests || getTests.call(inputmask, pos))[0];
}

function isSubsetOf(source, target, opts) {
    function expand(pattern) {
        var expanded = [], start = -1, end;
        for (var i = 0, l = pattern.length; i < l; i++) {
            if (pattern.charAt(i) === "-") {
                end = pattern.charCodeAt(i + 1);
                while (++start < end) expanded.push(String.fromCharCode(start));
            } else {
                start = pattern.charCodeAt(i);
                expanded.push(pattern.charAt(i));
            }
        }
        return expanded.join("");
    }

    if (source.match.def === target.match.nativeDef) return true;
    if ((opts.regex || (source.match.fn instanceof RegExp && target.match.fn instanceof RegExp)) && source.match.static !== true && target.match.static !== true) { //is regex a subset
        return expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, ""))) !== -1;
    }
    return false;
}

//tobe put on prototype?
function getTests(pos, ndxIntlzr, tstPs) {
    var inputmask = this,
        $ = this.dependencyLib,
        maskset = this.maskset,
        opts = this.opts,
        el = this.el,
        maskTokens = maskset.maskToken,
        testPos = ndxIntlzr ? tstPs : 0,
        ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
        matches = [],
        insertStop = false,
        latestMatch,
        cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

    function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) { //ndxInitializer contains a set of indexes to speedup searches in the mtokens
        function handleMatch(match, loopNdx, quantifierRecurse) {
            function isFirstMatch(latestMatch, tokenGroup) {
                var firstMatch = tokenGroup.matches.indexOf(latestMatch) === 0;
                if (!firstMatch) {
                    tokenGroup.matches.every(function (match, ndx) {
                        if (match.isQuantifier === true) {
                            firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);
                        } else if (Object.prototype.hasOwnProperty.call(match, "matches")) firstMatch = isFirstMatch(latestMatch, match);
                        if (firstMatch) return false;

                        return true;
                    });
                }
                return firstMatch;
            }

            function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                var bestMatch, indexPos;

                if (maskset.tests[pos] || maskset.validPositions[pos]) {
                    (maskset.tests[pos] || [maskset.validPositions[pos]]).every(function (lmnt, ndx) {
                        if (lmnt.mloc[alternateNdx]) {
                            bestMatch = lmnt;
                            return false; //break
                        }
                        var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation,
                            ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                        if ((indexPos === undefined || ndxPos < indexPos) && ndxPos !== -1) {
                            bestMatch = lmnt;
                            indexPos = ndxPos;
                        }

                        return true;
                    });
                }
                if (bestMatch) {
                    var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
                    var locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                    return locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1);
                } else {
                    return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
                }
            }

            function staticCanMatchDefinition(source, target) {
                return source.match.static === true && target.match.static !== true ? target.match.fn.test(source.match.def, maskset, pos, false, opts, false) : false;
            }

            //mergelocators for retrieving the correct locator match when merging
            function setMergeLocators(targetMatch, altMatch) {
                var alternationNdx = targetMatch.alternation,
                    shouldMerge = altMatch === undefined || (alternationNdx === altMatch.alternation &&
                        targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]) === -1);
                if (!shouldMerge && alternationNdx > altMatch.alternation) {
                    for (var i = altMatch.alternation; i < alternationNdx; i++) {
                        if (targetMatch.locator[i] !== altMatch.locator[i]) {
                            alternationNdx = i;
                            shouldMerge = true;
                            break;
                        }
                    }
                }

                if (shouldMerge) {
                    targetMatch.mloc = targetMatch.mloc || {};
                    var locNdx = targetMatch.locator[alternationNdx];
                    if (locNdx === undefined) {
                        targetMatch.alternation = undefined;
                    } else {
                        if (typeof locNdx === "string") locNdx = locNdx.split(",")[0];
                        if (targetMatch.mloc[locNdx] === undefined) targetMatch.mloc[locNdx] = targetMatch.locator.slice();
                        if (altMatch !== undefined) {
                            for (var ndx in altMatch.mloc) {
                                if (typeof ndx === "string") ndx = ndx.split(",")[0];
                                if (targetMatch.mloc[ndx] === undefined) targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                            }
                            targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
                        }
                        return true;
                    }
                }
                return false;
            }

            function isSameLevel(targetMatch, altMatch) {
                if (targetMatch.locator.length !== altMatch.locator.length) {
                    return false;
                }
                for (let locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) {
                    if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) {
                        return false;
                    }
                }
                return true;
            }

            function handleGroup() {
                match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse);
                if (match) return true;
            }

            function handleOptional() {
                var optionalToken = match, mtchsNdx = matches.length;
                match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                if (matches.length > 0) { //check on matches.length instead of match to handle quantifier in a recursive call
                    //mark optionality in matches
                    matches.forEach(function (mtch, ndx) {
                        if (ndx >= mtchsNdx) {
                            mtch.match.optionality = mtch.match.optionality ? mtch.match.optionality + 1 : 1;
                        }
                    });
                    latestMatch = matches[matches.length - 1].match;

                    if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) { //prevent loop see #698
                        insertStop = true; //insert a stop
                        testPos = pos; //match the position after the group
                    } else {
                        return match; //make the loop continue when it is deliberately by a quantifier
                    }
                }
            }

            function handleAlternator() {
                inputmask.hasAlternator = true;
                var alternateToken = match,
                    malternateMatches = [],
                    maltMatches,
                    currentMatches = matches.slice(),
                    loopNdxCnt = loopNdx.length,
                    unMatchedAlternation = false;
                var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                if (altIndex === -1 || typeof altIndex === "string") {
                    var currentPos = testPos,
                        ndxInitializerClone = ndxInitializer.slice(),
                        altIndexArr = [],
                        amndx;
                    if (typeof altIndex == "string") {
                        altIndexArr = altIndex.split(",");
                    } else {
                        for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                            altIndexArr.push(amndx.toString());
                        }
                    }

                    if (maskset.excludes[pos] !== undefined) {
                        var altIndexArrClone = altIndexArr.slice();
                        for (var i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
                            var excludeSet = maskset.excludes[pos][i].toString().split(":");
                            if (loopNdx.length == excludeSet[1]) {
                                altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
                            }
                        }
                        if (altIndexArr.length === 0) { //fully alternated => reset
                            delete maskset.excludes[pos];
                            altIndexArr = altIndexArrClone;
                        }
                    }
                    if (opts.keepStatic === true || (isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic)) altIndexArr = altIndexArr.slice(0, 1);
                    for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                        amndx = parseInt(altIndexArr[ndx]);
                        matches = [];
                        //set the correct ndxInitializer
                        ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
                        var tokenMatch = alternateToken.matches[amndx];
                        if (tokenMatch && handleMatch(tokenMatch, [amndx].concat(loopNdx), quantifierRecurse)) {
                            match = true;
                        } else {
                            if (ndx === 0) {
                                unMatchedAlternation = true;
                            }
                            if (tokenMatch && tokenMatch.matches && tokenMatch.matches.length > alternateToken.matches[0].matches.length) {
                                break;
                            }
                        }

                        maltMatches = matches.slice();
                        testPos = currentPos;
                        matches = [];

                        //fuzzy merge matches
                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                            var altMatch = maltMatches[ndx1],
                                dropMatch = false;
                            altMatch.match.jit = altMatch.match.jit || unMatchedAlternation; //mark jit when there are unmatched alternations  ex: mask: "(a|aa)"
                            altMatch.alternation = altMatch.alternation || loopNdxCnt;
                            setMergeLocators(altMatch);
                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                var altMatch2 = malternateMatches[ndx2];
                                if (typeof altIndex !== "string" || (altMatch.alternation !== undefined && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString()))) {
                                    if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                        dropMatch = true;
                                        setMergeLocators(altMatch2, altMatch);
                                        break;
                                    } else if (isSubsetOf(altMatch, altMatch2, opts)) {
                                        if (setMergeLocators(altMatch, altMatch2)) {
                                            dropMatch = true;
                                            malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                        }
                                        break;
                                    } else if (isSubsetOf(altMatch2, altMatch, opts)) {
                                        setMergeLocators(altMatch2, altMatch);
                                        break;
                                    } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                        if (!isSameLevel(altMatch, altMatch2) && el.inputmask.userOptions.keepStatic === undefined) {
                                            opts.keepStatic = true;
                                        } else if (setMergeLocators(altMatch, altMatch2)) {
                                            //insert match above general match
                                            dropMatch = true;
                                            malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                        }
                                        break;
                                    }
                                }
                            }
                            if (!dropMatch) {
                                malternateMatches.push(altMatch);
                            }
                        }
                    }

                    matches = currentMatches.concat(malternateMatches);
                    testPos = pos;
                    insertStop = matches.length > 0; //insert a stopelemnt when there is an alternate - needed for non-greedy option
                    match = malternateMatches.length > 0; //set correct match state

                    //cloneback
                    ndxInitializer = ndxInitializerClone.slice();
                } else {
                    match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                }
                if (match) return true;
            }

            function handleQuantifier() {
                var qt = match, breakloop = false;
                for (var qndx = (ndxInitializer.length > 0) ? ndxInitializer.shift() : 0; (qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max)) && testPos <= pos; qndx++) {
                    var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
                    match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); //set the tokenGroup as quantifierRecurse marker
                    if (match) {
                        matches.forEach(function (mtch, ndx) {
                            if (IsMatchOf(tokenGroup, mtch.match))
                                latestMatch = mtch.match;
                            else latestMatch = matches[matches.length - 1].match;

                            //mark optionality
                            //TODO FIX RECURSIVE QUANTIFIERS
                            latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
                            // console.log(pos + " " + qt.quantifier.min + " " + latestMatch.optionalQuantifier);
                            //qndx + 1 as the index starts from 0
                            latestMatch.jit = (qndx + 1) * (tokenGroup.matches.indexOf(latestMatch) + 1) > qt.quantifier.jit;
                            if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                insertStop = true;
                                testPos = pos; //match the position after the group
                                if (opts.greedy && maskset.validPositions[pos - 1] == undefined && qndx > qt.quantifier.min && ["*", "+"].indexOf(qt.quantifier.max) != -1) {
                                    matches.pop();
                                    cacheDependency = undefined;
                                }
                                breakloop = true; //stop quantifierloop && search for next possible match
                                match = false; //mark match to false to make sure the loop in optionals continues
                            }
                            if (!breakloop && latestMatch.jit /*&& !latestMatch.optionalQuantifier*/) {
                                //always set jitOffset, isvalid checks when to apply
                                maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch);
                            }
                        });
                        if (breakloop) break; // search for next possible match
                        return true;
                    }
                }
            }

            if (testPos > (pos + opts._maxTestPos)) {
                throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
            }
            if (testPos === pos && match.matches === undefined) {
                matches.push({
                    "match": match,
                    "locator": loopNdx.reverse(),
                    "cd": cacheDependency,
                    "mloc": {}
                });
                if (match.optionality && quantifierRecurse === undefined &&
                    ((opts.definitions && opts.definitions[match.nativeDef] && opts.definitions[match.nativeDef].optional) ||
                        (Inputmask.prototype.definitions[match.nativeDef] && Inputmask.prototype.definitions[match.nativeDef].optional))) { //prevent loop see #698
                    insertStop = true; //insert a stop
                    testPos = pos; //match the position after the group
                } else {
                    return true;
                }
            } else if (match.matches !== undefined) {
                if (match.isGroup && quantifierRecurse !== match) { //when a group pass along to the quantifier
                    return handleGroup();
                } else if (match.isOptional) {
                    return handleOptional();
                } else if (match.isAlternator) {
                    return handleAlternator();
                } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) {
                    return handleQuantifier();
                } else {
                    match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                    if (match) return true;
                }
            } else {
                testPos++;
            }
        }

        //the offset is set in the quantifierloop when git masking is used
        for (var tndx = (ndxInitializer.length > 0 ? ndxInitializer.shift() : 0); tndx < maskToken.matches.length; tndx++) {
            if (maskToken.matches[tndx].isQuantifier !== true) {
                var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                if (match && testPos === pos) {
                    return match;
                } else if (testPos > pos) {
                    break;
                }
            }
        }
    }

    function IsMatchOf(tokenGroup, match) {
        let isMatch = tokenGroup.matches.indexOf(match) != -1;
        if (!isMatch) {
            tokenGroup.matches.forEach((mtch, ndx) => {
                if (mtch.matches !== undefined && !isMatch) {
                    isMatch = IsMatchOf(mtch, match);
                }
            });
        }
        return isMatch;
    }

    function mergeLocators(pos, tests) {
        let locator = [], alternation;
        if (!Array.isArray(tests)) tests = [tests];

        if (tests.length > 0) {
            if (tests[0].alternation === undefined || opts.keepStatic === true) {
                locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice();
                if (locator.length === 0) locator = tests[0].locator.slice();
            } else {
                tests.forEach(function (tst) {
                    if (tst.def !== "") {
                        if (locator.length === 0) {
                            alternation = tst.alternation;
                            locator = tst.locator.slice();
                        } else {
                            if (tst.locator[alternation] && locator[alternation].toString().indexOf(tst.locator[alternation]) === -1) {
                                locator[alternation] += "," + tst.locator[alternation];
                            }
                        }
                    }
                });
            }
        }
        return locator;
    }

    if (pos > -1) {
        if (ndxIntlzr === undefined) { //determine index initializer
            var previousPos = pos - 1,
                test;
            while ((test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) === undefined && previousPos > -1) {
                previousPos--;
            }
            if (test !== undefined && previousPos > -1) {
                ndxInitializer = mergeLocators(previousPos, test);
                cacheDependency = ndxInitializer.join("");
                testPos = previousPos;
            }
        }
        if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) { //cacheDependency is set on all tests, just check on the first
            return maskset.tests[pos];
        }
        for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
            var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
            if ((match && testPos === pos) || testPos > pos) {
                break;
            }
        }
    }
    if (matches.length === 0 || insertStop) {
        matches.push({
            match: {
                fn: null,
                static: true,
                optionality: false,
                casing: null,
                def: "",
                placeholder: ""
            },
            locator: [],
            mloc: {},
            cd: cacheDependency
        });
    }
    var result;
    if (ndxIntlzr !== undefined && maskset.tests[pos]) { //prioritize full tests for caching
        result = $.extend(true, [], matches);
    } else {
        maskset.tests[pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props
        result = maskset.tests[pos];
    }

    // console.log(pos + " - " + JSON.stringify(matches));
    //cleanup optionality marking
    matches.forEach(t => {
        t.match.optionality = t.match.defOptionality || false;
    });

    return result;
}
