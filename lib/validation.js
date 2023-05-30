import {
    determineTestTemplate,
    getDecisionTaker,
    getPlaceholder,
    getTest,
    getTests,
    getTestTemplate
} from "./validation-tests";
import {keyCode, keys} from "./keycode.js";
import {
    determineLastRequiredPosition, determineNewCaretPosition,
    getBuffer,
    getLastValidPosition,
    isMask,
    resetMaskSet,
    seekNext,
    seekPrevious
} from "./positioning";
import {EventHandlers} from "./eventhandlers";

export {
    alternate,
    checkAlternationMatch,
    isComplete,
    isSelection,
    isValid,
    refreshFromBuffer,
    revalidateMask,
    handleRemove
};

//tobe put on prototype?
function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) { //pos == true => generalize
    const inputmask = this,
        $ = this.dependencyLib,
        opts = this.opts,
        maskset = inputmask.maskset;

    var validPsClone = $.extend(true, [], maskset.validPositions),
        tstClone = $.extend(true, {}, maskset.tests),
        lastAlt,
        alternation,
        isValidRslt = false, returnRslt = false,
        altPos, prevAltPos, i, validPos,
        decisionPos,
        lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition.call(inputmask), nextPos, input, begin, end;

    if (selection) {
        begin = selection.begin;
        end = selection.end;
        if (selection.begin > selection.end) {
            begin = selection.end;
            end = selection.begin;
        }
    }
    if (lAltPos === -1 && rAltPos === undefined) { //do not recurse when already paste the beginning
        lastAlt = 0;
        prevAltPos = getTest.call(inputmask, lastAlt);
        alternation = prevAltPos.alternation;
    } else {
        //find last modified alternation
        for (; lAltPos >= 0; lAltPos--) {
            altPos = maskset.validPositions[lAltPos];
            if (altPos && altPos.alternation !== undefined) {
                if (lAltPos <= (maskPos || 0) && prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
                    break;
                }
                lastAlt = lAltPos;
                alternation = maskset.validPositions[lastAlt].alternation;
                prevAltPos = altPos;
            }
        }
    }

    if (alternation !== undefined) {
        decisionPos = parseInt(lastAlt);
        maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [];
        if (maskPos !== true) { //generalize
            maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos) + ":" + prevAltPos.alternation);
        }

        var validInputs = [], resultPos = -1;
        for (i = decisionPos; decisionPos < getLastValidPosition.call(inputmask, undefined, true) + 1; i++) {
            if (resultPos === -1 && maskPos <= i && c !== undefined) {
                validInputs.push(c);
                resultPos = validInputs.length - 1;
            }
            validPos = maskset.validPositions[decisionPos];
            if (validPos && validPos.generatedInput !== true && (selection === undefined || (i < begin || i >= end))) {
                validInputs.push(validPos.input);
            }
            // delete maskset.validPositions[i++];
            maskset.validPositions.splice(decisionPos, 1);
        }
        if (resultPos === -1 && c !== undefined) {
            validInputs.push(c);
            resultPos = validInputs.length - 1;
        }

        while (maskset.excludes[decisionPos] !== undefined && maskset.excludes[decisionPos].length < 10) {
            // maskset.tests[decisionPos] = undefined; //clear decisionPos
            maskset.tests = {};  //clear all
            resetMaskSet.call(inputmask, true); //clear getbuffer
            isValidRslt = true;
            for (i = 0; i < validInputs.length; i++) {
                nextPos = isValidRslt.caret || (getLastValidPosition.call(inputmask, undefined, true) + 1);
                input = validInputs[i];
                // nextPos = translatePosition.call(inputmask, nextPos);
                if (!(isValidRslt = isValid.call(inputmask, nextPos, input, false, fromIsValid, true))) {
                    break;
                }
                if (i === resultPos) {
                    returnRslt = isValidRslt;
                }
                if (maskPos == true && isValidRslt) {  //return validposition on generalise
                    returnRslt = {caretPos: i};
                }
            }
            if (!isValidRslt) {
                resetMaskSet.call(inputmask);
                prevAltPos = getTest.call(inputmask, decisionPos);  //get the current decisionPos to exclude ~ needs to be before restoring the initial validation
                //reset & revert
                maskset.validPositions = $.extend(true, [], validPsClone);
                maskset.tests = $.extend(true, {}, tstClone); //refresh tests after possible alternating
                if (maskset.excludes[decisionPos]) {
                    var decisionTaker = getDecisionTaker(prevAltPos);
                    if (maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation) !== -1) {
                        returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                        break;
                    }
                    maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation);
                    for (i = decisionPos; i < getLastValidPosition.call(inputmask, undefined, true) + 1; i++) maskset.validPositions.splice(decisionPos);
                } else { //latest alternation
                    returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                    break;
                }
            } else {
                break;
            }
        }
    }
    //reset alternation excludes
    if (!returnRslt || opts.keepStatic !== false) {
        delete maskset.excludes[decisionPos];
    }
    return returnRslt;
}

function casing(elem, test, pos) {
    const opts = this.opts,
        maskset = this.maskset;

    switch (opts.casing || test.casing) {
        case "upper":
            elem = elem.toUpperCase();
            break;
        case "lower":
            elem = elem.toLowerCase();
            break;
        case "title":
            var posBefore = maskset.validPositions[pos - 1];
            if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(keyCode.Space)) {
                elem = elem.toUpperCase();
            } else {
                elem = elem.toLowerCase();
            }
            break;
        default:
            if (typeof opts.casing === "function") {
                var args = Array.prototype.slice.call(arguments);
                args.push(maskset.validPositions);
                elem = opts.casing.apply(this, args);
            }
    }

    return elem;
}

//tobe put on prototype?
function checkAlternationMatch(altArr1, altArr2, na) {
    const opts = this.opts;

    var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
        isMatch = false,
        naArr = na !== undefined ? na.split(",") : [],
        naNdx;

    //remove no alternate indexes from alternation array
    for (var i = 0; i < naArr.length; i++) {
        if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
            altArr1.splice(naNdx, 1);
        }
    }

    for (var alndx = 0; alndx < altArr1.length; alndx++) {
        if (altArrC.includes(altArr1[alndx])) {
            isMatch = true;
            break;
        }
    }
    return isMatch;
}

//tobe put on prototype?
function handleRemove(input, c, pos, strict, fromIsValid) {
    const inputmask = this, maskset = this.maskset, opts = this.opts;

    if (opts.numericInput || inputmask.isRTL) {
        if (c === keys.Backspace) {
            c = keys.Delete;
        } else if (c === keys.Delete) {
            c = keys.Backspace;
        }

        if (inputmask.isRTL) {
            var pend = pos.end;
            pos.end = pos.begin;
            pos.begin = pend;
        }
    }

    var lvp = getLastValidPosition.call(inputmask, undefined, true);
    if (pos.end >= getBuffer.call(inputmask).length && lvp >= pos.end) { //handle numeric negate symbol offset, due to  dynamic jit masking
        pos.end = lvp + 1;
    }

    if (c === keys.Backspace) {
        if ((pos.end - pos.begin < 1)) {
            pos.begin = seekPrevious.call(inputmask, pos.begin);
        }
    } else if (c === keys.Delete) {
        if (pos.begin === pos.end) {
            pos.end = isMask.call(inputmask, pos.end, true, true) ? pos.end + 1 : seekNext.call(inputmask, pos.end) + 1;
        }
    }
    var offset;
    if ((offset = revalidateMask.call(inputmask, pos)) !== false) {
        if (strict !== true && opts.keepStatic !== false || (opts.regex !== null && getTest.call(inputmask, pos.begin).match.def.indexOf("|") !== -1)) { //TODO NEEDS BETTER CHECK WHEN TO ALTERNATE  ~ opts regex isn"t good enough
            var result = alternate.call(inputmask, true);
            if (result) {
                var newPos = result.caret !== undefined ? result.caret : (result.pos ? seekNext.call(inputmask, result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition.call(inputmask, -1, true));
                if (c !== keys.Delete || pos.begin > newPos) {
                    pos.begin == newPos;
                }
            }
        }

        if (strict !== true) {
            maskset.p = c === keys.Delete ? pos.begin + offset : pos.begin;
            maskset.p = determineNewCaretPosition.call(inputmask, {
                begin: maskset.p,
                end: maskset.p
            }, false, opts.insertMode === false && c === keys.Backspace ? "none" : undefined).begin;
        }
    }
}

//tobe put on prototype?
function isComplete(buffer) { //return true / false / undefined (repeat *)
    const inputmask = this, opts = this.opts, maskset = this.maskset;

    if (typeof opts.isComplete === "function") return opts.isComplete(buffer, opts);
    if (opts.repeat === "*") return undefined;
    var complete = false,
        lrp = determineLastRequiredPosition.call(inputmask, true),
        aml = lrp.l; // seekPrevious.call(inputmask, lrp.l);

    if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
        complete = true;
        for (var i = 0; i <= aml; i++) {
            var test = getTestTemplate.call(inputmask, i).match;
            if ((test.static !== true &&
                    maskset.validPositions[i] === undefined &&
                    (test.optionality === false || test.optionality === undefined || (test.optionality && test.newBlockMarker == false)) &&
                    (test.optionalQuantifier === false || test.optionalQuantifier === undefined)) ||
                (test.static === true && test.def != "" && buffer[i] !== getPlaceholder.call(inputmask, i, test))
            ) {
                complete = false;
                break;
            }
        }
    }

    return complete;
}

function isSelection(posObj) {
    const inputmask = this,
        opts = this.opts, insertModeOffset = opts.insertMode ? 0 : 1;
    return inputmask.isRTL ? (posObj.begin - posObj.end) > insertModeOffset : (posObj.end - posObj.begin) > insertModeOffset;
}

//tobe put on prototype?
function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) { //strict true ~ no correction or autofill
    const inputmask = this,
        $ = this.dependencyLib,
        opts = this.opts,
        maskset = inputmask.maskset;

    strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

    var maskPos = pos;
    if (pos.begin !== undefined) { //position was a position object - used to handle a delete by typing over a selection
        maskPos = inputmask.isRTL ? pos.end : pos.begin;
    }

    function processCommandObject(commandObj) {
        if (commandObj !== undefined) {
            if (commandObj.remove !== undefined) { //remove position(s)
                if (!Array.isArray(commandObj.remove)) commandObj.remove = [commandObj.remove];
                commandObj.remove.sort(function (a, b) {
                    return inputmask.isRTL ? a.pos - b.pos : b.pos - a.pos;
                }).forEach(function (lmnt) {
                    revalidateMask.call(inputmask, {begin: lmnt, end: lmnt + 1});
                });
                commandObj.remove = undefined;
            }
            if (commandObj.insert !== undefined) { //insert position(s)
                if (!Array.isArray(commandObj.insert)) commandObj.insert = [commandObj.insert];
                commandObj.insert.sort(function (a, b) {
                    return inputmask.isRTL ? b.pos - a.pos : a.pos - b.pos;
                }).forEach(function (lmnt) {
                    if (lmnt.c !== "") {
                        isValid.call(inputmask, lmnt.pos, lmnt.c, lmnt.strict !== undefined ? lmnt.strict : true, lmnt.fromIsValid !== undefined ? lmnt.fromIsValid : fromIsValid);
                    }
                });
                commandObj.insert = undefined;
            }

            if (commandObj.refreshFromBuffer && commandObj.buffer) {
                var refresh = commandObj.refreshFromBuffer;
                refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, commandObj.buffer);
                commandObj.refreshFromBuffer = undefined;
            }

            if (commandObj.rewritePosition !== undefined) {
                maskPos = commandObj.rewritePosition;
                // commandObj.rewritePosition = undefined;
                commandObj = true;
            }
        }
        return commandObj;
    }

    function _isValid(position, c, strict) {
        var rslt = false;
        getTests.call(inputmask, position).every(function (tst, ndx) {
            var test = tst.match;
            //make sure the buffer is set and correct
            getBuffer.call(inputmask, true);
            if (test.jit && maskset.validPositions[seekPrevious.call(inputmask, position)] === undefined) //ignore if jit is not desirable
            {
                rslt = false;
            } else {
                //return is false or a json object => { pos: ??, c: ??} or true
                rslt = test.fn != null ?
                    test.fn.test(c, maskset, position, strict, opts, isSelection.call(inputmask, pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? //non mask
                        {
                            c: getPlaceholder.call(inputmask, position, test, true) || test.def,
                            pos: position
                        } : false;
            }
            if (rslt !== false) {
                var elem = rslt.c !== undefined ? rslt.c : c, validatedPos = position;
                elem = (elem === opts.skipOptionalPartCharacter && test.static === true) ?
                    (getPlaceholder.call(inputmask, position, test, true) || test.def) : elem;

                rslt = processCommandObject(rslt);

                if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) { //their is a position offset
                    validatedPos = rslt.pos;
                }

                if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
                    return false; //breakout if nothing to insert
                }

                if (revalidateMask.call(inputmask, pos, $.extend({}, tst, {
                    "input": casing.call(inputmask, elem, test, validatedPos)
                }), fromIsValid, validatedPos) === false) {
                    rslt = false;
                }
                return false; //break from loop
            }

            return true;
        });
        return rslt;
    }

    var result = true,
        positionsClone = $.extend(true, {}, maskset.validPositions); //clone the currentPositions

    if (opts.keepStatic === false && maskset.excludes[maskPos] !== undefined && fromAlternate !== true && fromIsValid !== true) {
        for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) {
            if (maskset.excludes[i] !== undefined) {
                maskset.excludes[i] = undefined;
                delete maskset.tests[i];
            }
        }
    }

    if (typeof opts.preValidation === "function" && fromIsValid !== true && validateOnly !== true) {
        result = opts.preValidation.call(inputmask, getBuffer.call(inputmask), maskPos, c, isSelection.call(inputmask, pos), opts, maskset, pos, strict || fromAlternate);
        result = processCommandObject(result);
    }
    if (result === true) { //preValidation result
        result = _isValid(maskPos, c, strict);
        if ((!strict || fromIsValid === true) && result === false && validateOnly !== true) {
            var currentPosValid = maskset.validPositions[maskPos];
            if (currentPosValid && currentPosValid.match.static === true && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
                result = {
                    "caret": seekNext.call(inputmask, maskPos)
                };
            } else {
                if (opts.insertMode || maskset.validPositions[seekNext.call(inputmask, maskPos)] === undefined || pos.end > maskPos) { //does the input match on a further position?
                    var skip = false;
                    if (maskset.jitOffset[maskPos] && maskset.validPositions[seekNext.call(inputmask, maskPos)] === undefined) {
                        result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, true, true);
                        if (result !== false) {
                            if (fromAlternate !== true) result.caret = maskPos;
                            skip = true;
                        }
                    }
                    if (pos.end > maskPos) {
                        maskset.validPositions[maskPos] = undefined;
                    }
                    if (!skip && !isMask.call(inputmask, maskPos, opts.keepStatic && maskPos === 0)) {
                        for (var nPos = maskPos + 1, snPos = seekNext.call(inputmask, maskPos, false, maskPos !== 0); nPos <= snPos; nPos++) {
                            // if (!isMask(nPos, true)) {
                            // 	continue;
                            // }
                            result = _isValid(nPos, c, strict);
                            if (result !== false) {
                                result = trackbackPositions.call(inputmask, maskPos, result.pos !== undefined ? result.pos : nPos) || result;
                                maskPos = nPos;
                                break;
                            }
                        }
                    }
                }
            }
        }

        if (inputmask.hasAlternator && fromAlternate !== true && !strict) {
            if (result === false && opts.keepStatic && (isComplete.call(inputmask, getBuffer.call(inputmask)) || maskPos === 0)) { //try fuzzy alternator logic
                result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, undefined, pos);
            } else if (isSelection.call(inputmask, pos) && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && opts.keepStatic) { //selection clears an alternated keepstatic mask ~ #2189
                result = alternate.call(inputmask, true);
            } else if (result == true && opts.numericInput !== true && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && getLastValidPosition.call(inputmask, undefined, true) > maskPos) {
                // console.log("Alternating");
                result = alternate.call(inputmask, true);
            }
        }

        if (result === true) {
            result = {
                "pos": maskPos
            };
        }
    }
    if (typeof opts.postValidation === "function" && fromIsValid !== true && validateOnly !== true) {
        var postResult = opts.postValidation.call(inputmask, getBuffer.call(inputmask, true), pos.begin !== undefined ? (inputmask.isRTL ? pos.end : pos.begin) : pos, c, result, opts, maskset, strict, fromCheckval);
        if (postResult !== undefined) {
            result = postResult === true ? result : postResult;
        }
    }

    if (result && result.pos === undefined) {
        result.pos = maskPos;
    }

    if (result === false || validateOnly === true) {
        resetMaskSet.call(inputmask, true);
        maskset.validPositions = $.extend(true, [], positionsClone); //revert validation changes
    } else {
        trackbackPositions.call(inputmask, undefined, maskPos, true);
    }

    var endResult = processCommandObject(result);
    // console.log("returned result " + JSON.stringify(endResult));
    if (inputmask.maxLength !== undefined) {
        var buffer = getBuffer.call(inputmask);
        if (buffer.length > inputmask.maxLength && !fromIsValid) {
            resetMaskSet.call(inputmask, true);
            maskset.validPositions = $.extend(true, [], positionsClone); //revert validation changes
            endResult = false;
        }
    }
    return endResult;
}

//tobe put on prototype?
function positionCanMatchDefinition(pos, testDefinition, opts) {
    const inputmask = this,
        maskset = this.maskset;

    var valid = false,
        tests = getTests.call(inputmask, pos);
    for (var tndx = 0; tndx < tests.length; tndx++) {
        if (tests[tndx].match &&
            ((tests[tndx].match["nativeDef"] === testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] && (!opts.shiftPositions || !testDefinition.match.static)) ||
                tests[tndx].match["nativeDef"] === testDefinition.match["nativeDef"] ||
                (opts.regex && !tests[tndx].match.static && tests[tndx].match.fn.test(testDefinition.input, maskset, pos, false, opts)))) {
            valid = true;
            break;
        } else if (tests[tndx].match && tests[tndx].match["def"] === testDefinition.match["nativeDef"]) {
            valid = undefined;
            break;
        }
    }
    if (valid === false) {
        if (maskset.jitOffset[pos] !== undefined) {
            valid = positionCanMatchDefinition.call(inputmask, pos + maskset.jitOffset[pos], testDefinition, opts);
        }
    }
    return valid;
}

//tobe put on prototype?
function refreshFromBuffer(start, end, buffer) {
    const inputmask = this,
        maskset = this.maskset,
        opts = this.opts,
        $ = this.dependencyLib;
    // checkVal.call(inputmask, el, false, true, isRTL ? buffer.reverse() : buffer);
    var i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
        bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer;
    opts.skipOptionalPartCharacter = "";
    if (start === true) {
        resetMaskSet.call(inputmask, false);
        start = 0;
        end = buffer.length;
        p = determineNewCaretPosition.call(inputmask, {begin: 0, end: 0}, false).begin;
    } else {
        for (i = start; i < end; i++) {
            maskset.validPositions.splice(start, 0);
        }
        p = start;
    }

    var keypress = new $.Event("keypress");
    for (i = start; i < end; i++) {
        keypress.key = bffr[i].toString();
        inputmask.ignorable = false; //make sure ignorable is ignored ;-)
        var valResult = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, false, p);
        if (valResult !== false && valResult !== undefined) {
            p = valResult.forwardPosition;
        }
    }

    opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}

//tobe put on prototype?
//fill in best positions according the current input
function trackbackPositions(originalPos, newPos, fillOnly) {
    const inputmask = this,
        maskset = this.maskset,
        $ = this.dependencyLib;

    // console.log("trackbackPositions " + originalPos + " " + newPos);
    if (originalPos === undefined) {
        //find previous valid
        for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
            if (maskset.validPositions[originalPos]) break;
        }
    }
    for (var ps = originalPos; ps < newPos; ps++) {
        if (maskset.validPositions[ps] === undefined && !isMask.call(inputmask, ps, false)) {
            var vp = ps == 0 ? getTest.call(inputmask, ps) : maskset.validPositions[ps - 1];
            if (vp) {
                var tests = getTests.call(inputmask, ps).slice();
                if (tests[tests.length - 1].match.def === "") tests.pop();
                var bestMatch = determineTestTemplate.call(inputmask, ps, tests), np;
                if (bestMatch && (bestMatch.match.jit !== true || (bestMatch.match.newBlockMarker === "master" && (np = maskset.validPositions[ps + 1]) && np.match.optionalQuantifier === true))) {
                    bestMatch = $.extend({}, bestMatch, {
                        "input": getPlaceholder.call(inputmask, ps, bestMatch.match, true) || bestMatch.match.def
                    });
                    bestMatch.generatedInput = true;
                    revalidateMask.call(inputmask, ps, bestMatch, true);

                    if (fillOnly !== true) {
                        //revalidate the new position to update the locator value
                        var cvpInput = maskset.validPositions[newPos].input;
                        maskset.validPositions[newPos] = undefined;
                        return isValid.call(inputmask, newPos, cvpInput, true, true);
                    }
                }
            }
        }
    }
}

//tobe put on prototype?
function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
    const inputmask = this,
        maskset = this.maskset,
        opts = this.opts,
        $ = this.dependencyLib;

    function IsEnclosedStatic(pos, valids, selection) {
        var posMatch = valids[pos];
        if (posMatch !== undefined && posMatch.match.static === true && posMatch.match.optionality !== true && (valids[0] === undefined || valids[0].alternation === undefined)) {
            var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match.static === true && valids[pos - 1] : valids[pos - 1],
                nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match.static === true && valids[pos + 1] : valids[pos + 1];
            return prevMatch && nextMatch;
        }
        return false;
    }

    var offset = 0, begin = pos.begin !== undefined ? pos.begin : pos, end = pos.end !== undefined ? pos.end : pos,
        valid = true;
    if (pos.begin > pos.end) {
        begin = pos.end;
        end = pos.begin;
    }

    validatedPos = validatedPos !== undefined ? validatedPos : begin;
    if (fromIsValid === undefined && (begin !== end || (opts.insertMode && maskset.validPositions[validatedPos] !== undefined) || validTest === undefined || validTest.match.optionalQuantifier || validTest.match.optionality)) {
        //reposition & revalidate others
        var positionsClone = $.extend(true, {}, maskset.validPositions),
            lvp = getLastValidPosition.call(inputmask, undefined, true),
            i;
        maskset.p = begin; //needed for alternated position after overtype selection

        for (i = lvp; i >= begin; i--) {
            maskset.validPositions.splice(i, 1);
            if (validTest === undefined) delete maskset.tests[i + 1];
        }

        var j = validatedPos,
            posMatch = j, t, canMatch, test;

        if (validTest) {
            maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
            posMatch++;
            j++;
        }

        for (i = validTest ? end : end - 1; i <= lvp; i++) {
            if ((t = positionsClone[i]) !== undefined && t.generatedInput !== true &&
                (i >= end || (i >= begin && IsEnclosedStatic(i, positionsClone, {
                    begin: begin,
                    end: end
                })))) {
                while (test = getTest.call(inputmask, posMatch), test.match.def !== "") { //loop needed to match further positions
                    if ((canMatch = positionCanMatchDefinition.call(inputmask, posMatch, t, opts)) !== false || t.match.def === "+") { //validated match //we still need some hackery for the + validator (numeric alias)
                        if (t.match.def === "+") getBuffer.call(inputmask, true);
                        var result = isValid.call(inputmask, posMatch, t.input, t.match.def !== "+", /*t.match.def !== "+"*/ true);
                        valid = result !== false;
                        j = (result.pos || posMatch) + 1;
                        if (!valid && canMatch) break;
                    } else {
                        valid = false;
                    }
                    if (valid) {
                        if (validTest === undefined && t.match.static && i === pos.begin) offset++;
                        break;
                    }
                    if (!valid && getBuffer.call(inputmask), posMatch > maskset.maskLength) {
                        break;
                    }
                    posMatch++;
                }
                if (getTest.call(inputmask, posMatch).match.def == "") {
                    valid = false;
                }
                //restore position
                posMatch = j;
            }
            if (!valid) break;
        }
        if (!valid) {
            maskset.validPositions = $.extend(true, [], positionsClone);
            resetMaskSet.call(inputmask, true);
            return false;
        }
    } else if (validTest && getTest.call(inputmask, validatedPos).match.cd === validTest.match.cd) {
        maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
    }

    resetMaskSet.call(inputmask, true);
    return offset;
}
