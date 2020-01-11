var $ = require("./dependencyLibs/inputmask.dependencyLib"), window = require("./global/window"),
	document = window.document,
	ua = (window.navigator && window.navigator.userAgent) || "",
	ie = (ua.indexOf("MSIE ") > 0) || (ua.indexOf("Trident/") > 0),
	mobile = "ontouchstart" in window, //not entirely correct but will currently do
	iemobile = /iemobile/i.test(ua),
	iphone = /iphone/i.test(ua) && !iemobile,
	keyCode = require("./keycode");

//masking scope
//actionObj definition see below
module.exports = function maskScope(actionObj, maskset, opts) {
	maskset = maskset || this.maskset;
	opts = opts || this.opts;

	var inputmask = this,
		el = this.el,
		isRTL = this.isRTL || (this.isRTL = opts.numericInput),
		undoValue,
		$el,
		skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
		skipInputEvent = false, //skip when triggered from within inputmask
		validationEvent = false,
		ignorable = false,
		maxLength,
		mouseEnter = false,
		originalPlaceholder = undefined; //needed for FF

	//maskset helperfunctions
	function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
		//includeMode true => input, undefined => placeholder, false => mask

		var greedy = opts.greedy;
		if (clearOptionalTail) opts.greedy = false;
		minimalPos = minimalPos || 0;
		var maskTemplate = [],
			ndxIntlzr, pos = 0,
			test, testPos, jitRenderStatic;
		do {
			if (baseOnInput === true && maskset.validPositions[pos]) {
				testPos = (clearOptionalTail && maskset.validPositions[pos].match.optionality === true
					&& maskset.validPositions[pos + 1] === undefined
					&& (maskset.validPositions[pos].generatedInput === true || (maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0)))
					? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1))
					: maskset.validPositions[pos];
				test = testPos.match;
				ndxIntlzr = testPos.locator.slice();
				maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
			} else {
				testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
				test = testPos.match;
				ndxIntlzr = testPos.locator.slice();
				var jitMasking = noJit === true ? false : (opts.jitMasking !== false ? opts.jitMasking : test.jit);
				//check for groupSeparator is a hack for the numerics as we don't want the render of the groupSeparator beforehand
				jitRenderStatic = (jitRenderStatic && test.static && test.def !== opts.groupSeparator && test.fn === null) || (maskset.validPositions[pos - 1] && test.static && test.def !== opts.groupSeparator && test.fn === null);
				if (jitRenderStatic || jitMasking === false || jitMasking === undefined /*|| pos < lvp*/ || (typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos)) {
					maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
				} else {
					jitRenderStatic = false;
				}
			}

			pos++;
		} while ((maxLength === undefined || pos < maxLength) && (test.static !== true || test.def !== "") || minimalPos > pos);
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

	function resetMaskSet(soft) {
		maskset.buffer = undefined;
		if (soft !== true) {
			maskset.validPositions = {};
			maskset.p = 0;
		}
	}

	function getLastValidPosition(closestTo, strict, validPositions) {
		var before = -1,
			after = -1,
			valids = validPositions || maskset.validPositions; //for use in valhook ~ context switch
		if (closestTo === undefined) closestTo = -1;
		for (var posNdx in valids) {
			var psNdx = parseInt(posNdx);
			if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
				if (psNdx <= closestTo) before = psNdx;
				if (psNdx >= closestTo) after = psNdx;
			}
		}
		return (before === -1 || before == closestTo) ? after : after == -1 ? before : (closestTo - before) < (after - closestTo) ? before : after;
	}

	function getDecisionTaker(tst) {
		var decisionTaker = tst.locator[tst.alternation];
		if (typeof decisionTaker == "string" && decisionTaker.length > 0) { //no decision taken ~ take first one as decider
			decisionTaker = decisionTaker.split(",")[0];
		}
		return decisionTaker !== undefined ? decisionTaker.toString() : "";
	}

	function getLocator(tst, align) { //need to align the locators to be correct
		var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
		if (locator !== "") while (locator.length < align) locator += "0";
		return locator;
	}

	function determineTestTemplate(pos, tests) {
		pos = pos > 0 ? pos - 1 : 0;
		var altTest = getTest(pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch;
		for (var ndx = 0; ndx < tests.length; ndx++) { //find best matching
			var tst = tests[ndx];
			tstLocator = getLocator(tst, targetLocator.length);
			var distance = Math.abs(tstLocator - targetLocator);
			if (closest === undefined
				|| (tstLocator !== "" && distance < closest)
				|| (bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.newBlockMarker === "master" && (!tst.match.optionality || !tst.match.newBlockMarker))
				|| (bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier)) {
				closest = distance;
				bestMatch = tst;
			}
		}

		return bestMatch;
	}


	function getTestTemplate(pos, ndxIntlzr, tstPs) {
		return maskset.validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
	}

	function getTest(pos, tests) {
		if (maskset.validPositions[pos]) {
			return maskset.validPositions[pos];
		}
		return (tests || getTests(pos))[0];
	}

	function positionCanMatchDefinition(pos, testDefinition, opts) {
		var valid = false,
			tests = getTests(pos);
		for (var tndx = 0; tndx < tests.length; tndx++) {
			if (tests[tndx].match &&
				((tests[tndx].match["nativeDef"] === testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] && (!opts.shiftPositions || !testDefinition.match.static)) ||
					tests[tndx].match["nativeDef"] === testDefinition.match["nativeDef"])) {
				valid = true;
				break;
			} else if (tests[tndx].match && tests[tndx].match["def"] === testDefinition.match["nativeDef"]) {
				valid = undefined;
				break;
			}
		}
		if (valid === false) {
			if (maskset.jitOffset[pos] !== undefined) {
				valid = positionCanMatchDefinition(pos + maskset.jitOffset[pos], testDefinition, opts);
			}
		}
		return valid;
	}


	function getTests(pos, ndxIntlzr, tstPs) {
		var maskTokens = maskset.maskToken,
			testPos = ndxIntlzr ? tstPs : 0,
			ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
			matches = [],
			insertStop = false,
			latestMatch,
			cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

		function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) { //ndxInitializer contains a set of indexes to speedup searches in the mtokens
			function handleMatch(match, loopNdx, quantifierRecurse) {
				function isFirstMatch(latestMatch, tokenGroup) {
					var firstMatch = $.inArray(latestMatch, tokenGroup.matches) === 0;
					if (!firstMatch) {
						$.each(tokenGroup.matches, function (ndx, match) {
							if (match.isQuantifier === true) {
								firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);
							} else if (Object.prototype.hasOwnProperty.call(match, "matches")) firstMatch = isFirstMatch(latestMatch, match);
							if (firstMatch) return false;
						});
					}
					return firstMatch;
				}

				function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
					var bestMatch, indexPos;

					if (maskset.tests[pos] || maskset.validPositions[pos]) {
						$.each(maskset.tests[pos] || [maskset.validPositions[pos]], function (ndx, lmnt) {
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

				function isSubsetOf(source, target) {
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

				if (testPos > opts._maxTestPos && quantifierRecurse !== undefined) {
					throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
				}
				if (testPos === pos && match.matches === undefined) {
					matches.push({
						"match": match,
						"locator": loopNdx.reverse(),
						"cd": cacheDependency,
						"mloc": {}
					});
					return true;
				} else if (match.matches !== undefined) {
					if (match.isGroup && quantifierRecurse !== match) { //when a group pass along to the quantifier
						match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse);
						if (match) return true;
					} else if (match.isOptional) {
						var optionalToken = match, mtchsNdx = matches.length;
						match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
						if (match) {
							//mark optionality in matches
							$.each(matches, function (ndx, mtch) {
								if (ndx >= mtchsNdx) {
									mtch.match.optionality = true;
								}
							});
							latestMatch = matches[matches.length - 1].match;
							if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) { //prevent loop see #698
								insertStop = true; //insert a stop
								testPos = pos; //match the position after the group
							} else {
								return true;
							}
						}
					} else if (match.isAlternator) {
						var alternateToken = match,
							malternateMatches = [],
							maltMatches,
							currentMatches = matches.slice(),
							loopNdxCnt = loopNdx.length;
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
							var unMatchedAlternation = false;
							for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
								amndx = parseInt(altIndexArr[ndx]);
								matches = [];
								//set the correct ndxInitializer
								ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
								if (alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse)) {
									match = true;
								} else if (ndx === 0) {
									unMatchedAlternation = true;
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
										if (typeof altIndex !== "string" || (altMatch.alternation !== undefined && $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) !== -1)) {
											if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
												dropMatch = true;
												setMergeLocators(altMatch2, altMatch);
												break;
											} else if (isSubsetOf(altMatch, altMatch2)) {
												if (setMergeLocators(altMatch, altMatch2)) {
													dropMatch = true;
													malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
												}
												break;
											} else if (isSubsetOf(altMatch2, altMatch)) {
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
					} else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) {
						var qt = match;
						for (var qndx = (ndxInitializer.length > 0) ? ndxInitializer.shift() : 0; (qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max)) && testPos <= pos; qndx++) {
							var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
							match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); //set the tokenGroup as quantifierRecurse marker
							if (match) {
								//get latest match
								latestMatch = matches[matches.length - 1].match;
								//mark optionality
								//TODO FIX RECURSIVE QUANTIFIERS
								latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
								// console.log(pos + " " + qt.quantifier.min + " " + latestMatch.optionalQuantifier);
								latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit;
								if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
									insertStop = true;
									testPos = pos; //match the position after the group
									break; //stop quantifierloop && search for next possible match
								}
								if (latestMatch.jit /*&& !latestMatch.optionalQuantifier*/) {
									//always set jitOffset, isvalid checks when to apply
									maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch);
								}
								return true;
							}
						}
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

		function mergeLocators(pos, tests) {
			var locator = [];
			if (!$.isArray(tests)) tests = [tests];
			if (tests.length > 0) {
				if (tests[0].alternation === undefined || opts.keepStatic === true) {
					locator = determineTestTemplate(pos, tests.slice()).locator.slice();
					if (locator.length === 0) locator = tests[0].locator.slice();
				} else {
					$.each(tests, function (ndx, tst) {
						if (tst.def !== "") {
							if (locator.length === 0) {
								locator = tst.locator.slice();
							} else {
								for (var i = 0; i < locator.length; i++) {
									if (tst.locator[i] && locator[i].toString().indexOf(tst.locator[i]) === -1) {
										locator[i] += "," + tst.locator[i];
									}
								}
							}
						}
					});
				}
			}
			return locator;
		}

		if (pos > -1 && (maxLength === undefined || pos < maxLength)) {
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

		if (ndxIntlzr !== undefined && maskset.tests[pos]) { //prioritize full tests for caching
			return $.extend(true, [], matches);
		}
		maskset.tests[pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props
		// console.log(pos + " - " + JSON.stringify(matches));
		return maskset.tests[pos];
	}

	function getBufferTemplate() {
		if (maskset._buffer === undefined) {
			//generate template
			maskset._buffer = getMaskTemplate(false, 1);
			if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
		}
		return maskset._buffer;
	}

	function getBuffer(noCache) {
		if (maskset.buffer === undefined || noCache === true) {
			maskset.buffer = getMaskTemplate(true, getLastValidPosition(), true);
			if (maskset._buffer === undefined) maskset._buffer = maskset.buffer.slice();
		}
		return maskset.buffer;
	}

	function refreshFromBuffer(start, end, buffer) {
		// checkVal.call(inputmask, el, false, true, isRTL ? buffer.reverse() : buffer);
		var i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
			bffr = isRTL ? buffer.slice().reverse() : buffer;
		opts.skipOptionalPartCharacter = "";
		if (start === true) {
			resetMaskSet();
			maskset.tests = {}; //refresh tests after possible alternating
			start = 0;
			end = buffer.length;
			p = determineNewCaretPosition({begin: 0, end: 0}, false).begin;
		} else {
			for (i = start; i < end; i++) {
				delete maskset.validPositions[i];
			}
			p = start;
		}

		var keypress = new $.Event("keypress");
		for (i = start; i < end; i++) {
			keypress.which = bffr[i].toString().charCodeAt(0);
			ignorable = false; //make sure ignorable is ignored ;-)
			var valResult = EventHandlers.keypressEvent.call(el, keypress, true, false, false, p);
			if (valResult !== false) {
				p = valResult.forwardPosition;
			}
		}

		opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
	}

	function casing(elem, test, pos) {
		switch (opts.casing || test.casing) {
			case "upper":
				elem = elem.toUpperCase();
				break;
			case "lower":
				elem = elem.toLowerCase();
				break;
			case "title":
				var posBefore = maskset.validPositions[pos - 1];
				if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(keyCode.SPACE)) {
					elem = elem.toUpperCase();
				} else {
					elem = elem.toLowerCase();
				}
				break;
			default:
				if ($.isFunction(opts.casing)) {
					var args = Array.prototype.slice.call(arguments);
					args.push(maskset.validPositions);
					elem = opts.casing.apply(this, args);
				}
		}

		return elem;
	}

	function checkAlternationMatch(altArr1, altArr2, na) {
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
			if ($.inArray(altArr1[alndx], altArrC) !== -1) {
				isMatch = true;
				break;
			}
		}
		return isMatch;
	}

	function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) { //pos == true => generalize
		var validPsClone = $.extend(true, {}, maskset.validPositions),
			tstClone = $.extend(true, {}, maskset.tests),
			lastAlt,
			alternation,
			isValidRslt = false, returnRslt = false,
			altPos, prevAltPos, i, validPos,
			decisionPos,
			lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition(), nextPos, input, begin, end;

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
			prevAltPos = getTest(lastAlt);
			alternation = prevAltPos.alternation;
		} else {
			//find last modified alternation
			for (; lAltPos >= 0; lAltPos--) {
				altPos = maskset.validPositions[lAltPos];
				if (altPos && altPos.alternation !== undefined) {
					if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
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
			for (i = decisionPos; i < getLastValidPosition(undefined, true) + 1; i++) {
				if (resultPos === -1 && maskPos <= i && c !== undefined) {
					validInputs.push(c);
					resultPos = validInputs.length - 1;
				}
				validPos = maskset.validPositions[i];
				if (validPos && validPos.generatedInput !== true && (selection === undefined || (i < begin || i >= end))) {
					validInputs.push(validPos.input);
				}
				delete maskset.validPositions[i];
			}
			if (resultPos === -1 && c !== undefined) {
				validInputs.push(c);
				resultPos = validInputs.length - 1;
			}

			while (maskset.excludes[decisionPos] !== undefined && maskset.excludes[decisionPos].length < 10) {
				// maskset.tests[decisionPos] = undefined; //clear decisionPos
				maskset.tests = {};  //clear all
				resetMaskSet(true); //clear getbuffer
				isValidRslt = true;
				for (i = 0; i < validInputs.length; i++) {
					nextPos = isValidRslt.caret || (getLastValidPosition(undefined, true) + 1);
					input = validInputs[i];
					if (!(isValidRslt = isValid(nextPos, input, false, fromIsValid, true))) {
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
					resetMaskSet();
					prevAltPos = getTest(decisionPos);  //get the current decisionPos to exclude ~ needs to be before restoring the initial validation
					//reset & revert
					maskset.validPositions = $.extend(true, {}, validPsClone);
					maskset.tests = $.extend(true, {}, tstClone); //refresh tests after possible alternating
					if (maskset.excludes[decisionPos]) {
						var decisionTaker = getDecisionTaker(prevAltPos);
						if (maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation) !== -1) {
							returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
							break;
						}
						maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation);
						for (i = decisionPos; i < getLastValidPosition(undefined, true) + 1; i++) delete maskset.validPositions[i];
					} else { //latest alternation
						returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
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

	function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly) { //strict true ~ no correction or autofill
		function isSelection(posObj) {
			return isRTL ? (posObj.begin - posObj.end) > 1 || ((posObj.begin - posObj.end) === 1) :
				(posObj.end - posObj.begin) > 1 || ((posObj.end - posObj.begin) === 1);
		}

		strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

		var maskPos = pos;
		if (pos.begin !== undefined) { //position was a position object - used to handle a delete by typing over a selection
			maskPos = isRTL ? pos.end : pos.begin;
		}

		function processCommandObject(commandObj) {
			if (commandObj !== undefined) {
				if (commandObj.remove !== undefined) { //remove position(s)
					if (!$.isArray(commandObj.remove)) commandObj.remove = [commandObj.remove];
					$.each(commandObj.remove.sort(function (a, b) {
						return b.pos - a.pos;
					}), function (ndx, lmnt) {
						revalidateMask({begin: lmnt, end: lmnt + 1});
					});
					commandObj.remove = undefined;
				}
				if (commandObj.insert !== undefined) { //insert position(s)
					if (!$.isArray(commandObj.insert)) commandObj.insert = [commandObj.insert];
					$.each(commandObj.insert.sort(function (a, b) {
						return a.pos - b.pos;
					}), function (ndx, lmnt) {
						if (lmnt.c !== "") {
							isValid(lmnt.pos, lmnt.c, lmnt.strict !== undefined ? lmnt.strict : true, lmnt.fromIsValid !== undefined ? lmnt.fromIsValid : fromIsValid);
						}
					});
					commandObj.insert = undefined;
				}

				if (commandObj.refreshFromBuffer && commandObj.buffer) {
					var refresh = commandObj.refreshFromBuffer;
					refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, commandObj.buffer);
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

			$.each(getTests(position), function (ndx, tst) {
				var test = tst.match;
				//make sure the buffer is set and correct
				getBuffer(true);
				//return is false or a json object => { pos: ??, c: ??} or true
				rslt = test.fn != null ?
					test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? //non mask
						{
							c: getPlaceholder(position, test, true) || test.def,
							pos: position
						} : false;

				if (rslt !== false) {
					var elem = rslt.c !== undefined ? rslt.c : c, validatedPos = position;
					elem = (elem === opts.skipOptionalPartCharacter && test.static === true) ?
						(getPlaceholder(position, test, true) || test.def) : elem;

					rslt = processCommandObject(rslt);

					if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) { //their is a position offset
						validatedPos = rslt.pos;
					}

					if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
						return false; //breakout if nothing to insert
					}

					if (revalidateMask(pos, $.extend({}, tst, {
						"input": casing(elem, test, validatedPos)
					}), fromIsValid, validatedPos) === false) {
						rslt = false;
					}
					return false; //break from $.each
				}
			});
			return rslt;
		}

		var result = true,
			positionsClone = $.extend(true, {}, maskset.validPositions); //clone the currentPositions

		if (opts.keepStatic === false && maskset.excludes[maskPos] !== undefined && fromAlternate !== true && fromIsValid !== true) {
			for (var i = maskPos; i < (isRTL ? pos.begin : pos.end); i++) {
				if (maskset.excludes[i] !== undefined) {
					maskset.excludes[i] = undefined;
					delete maskset.tests[i];
				}
			}
		}

		if ($.isFunction(opts.preValidation) && fromIsValid !== true && validateOnly !== true) {
			result = opts.preValidation.call(el, getBuffer(), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate);
			result = processCommandObject(result);
		}
		if (result === true) { //preValidation result
			if (maxLength === undefined || maskPos < maxLength) {
				result = _isValid(maskPos, c, strict);
				if ((!strict || fromIsValid === true) && result === false && validateOnly !== true) {
					var currentPosValid = maskset.validPositions[maskPos];
					if (currentPosValid && currentPosValid.match.static === true && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
						result = {
							"caret": seekNext(maskPos)
						};
					} else {
						if (opts.insertMode || maskset.validPositions[seekNext(maskPos)] === undefined || pos.end > maskPos) { //does the input match on a further position?
							var skip = false;
							if (maskset.jitOffset[maskPos] && maskset.validPositions[seekNext(maskPos)] === undefined) {
								result = isValid(maskPos + maskset.jitOffset[maskPos], c, true);
								if (result !== false) {
									if (fromAlternate !== true) result.caret = maskPos;
									skip = true;
								}
							}
							if (pos.end > maskPos) {
								maskset.validPositions[maskPos] = undefined;
							}
							if (!skip && !isMask(maskPos, opts.keepStatic)) {
								for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
									// if (!isMask(nPos, true)) {
									// 	continue;
									// }
									result = _isValid(nPos, c, strict);
									if (result !== false) {
										result = trackbackPositions(maskPos, result.pos !== undefined ? result.pos : nPos) || result;
										maskPos = nPos;
										break;
									}
								}
							}
						}
					}
				}
			} else {
				result = false;
			}


			if (result === false && opts.keepStatic && (isComplete(getBuffer()) || maskPos === 0) && !strict && fromAlternate !== true) { //try fuzzy alternator logic
				result = alternate(maskPos, c, strict, fromIsValid, undefined, pos);
			} else if (isSelection(pos) && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && opts.keepStatic && !strict && fromAlternate !== true) { //selection clears an alternated keepstatic mask ~ #2189
				result = alternate(true);
			}

			if (result === true) {
				result = {
					"pos": maskPos
				};
			}
		}
		if ($.isFunction(opts.postValidation) && fromIsValid !== true && validateOnly !== true) {
			var postResult = opts.postValidation.call(el, getBuffer(true), pos.begin !== undefined ? (isRTL ? pos.end : pos.begin) : pos, c, result, opts, maskset, strict);
			if (postResult !== undefined) {
				result = postResult === true ? result : postResult;
			}
		}

		if (result && result.pos === undefined) {
			result.pos = maskPos;
		}

		if (result === false || validateOnly === true) {
			resetMaskSet(true);
			maskset.validPositions = $.extend(true, {}, positionsClone); //revert validation changes
		} else {
			trackbackPositions(undefined, maskPos, true);
		}

		var endResult = processCommandObject(result);
		// console.log("returned result " + JSON.stringify(endResult));
		return endResult;
	}

	//fill in best positions according the current input
	function trackbackPositions(originalPos, newPos, fillOnly) {
		// console.log("trackbackPositions " + originalPos + " " + newPos);
		if (originalPos === undefined) {
			//find previous valid
			for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
				if (maskset.validPositions[originalPos]) break;
			}
		}
		for (var ps = originalPos; ps < newPos; ps++) {
			if (maskset.validPositions[ps] === undefined && !isMask(ps, true)) {
				var vp = ps == 0 ? getTest(ps) : maskset.validPositions[ps - 1];
				if (vp) {
					var tests = getTests(ps).slice();
					if (tests[tests.length - 1].match.def === "") tests.pop();
					var bestMatch = determineTestTemplate(ps, tests), np;
					if (bestMatch && (bestMatch.match.jit !== true || (bestMatch.match.newBlockMarker === "master" && (np = maskset.validPositions[ps + 1]) && np.match.optionalQuantifier === true))) {
						bestMatch = $.extend({}, bestMatch, {
							"input": getPlaceholder(ps, bestMatch.match, true) || bestMatch.match.def
						});
						bestMatch.generatedInput = true;
						revalidateMask(ps, bestMatch, true);

						if (fillOnly !== true) {
							//revalidate the new position to update the locator value
							var cvpInput = maskset.validPositions[newPos].input;
							maskset.validPositions[newPos] = undefined;
							return isValid(newPos, cvpInput, true, true);
						}
					}
				}
			}
		}
	}

	function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
		function IsEnclosedStatic(pos, valids, selection) {
			var posMatch = valids[pos];
			if (posMatch !== undefined && posMatch.match.static === true && posMatch.match.optionality !== true && (valids[0] === undefined || valids[0].alternation === undefined)) {
				var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match.static === true && valids[pos - 1] : valids[pos - 1],
					nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match.static === true && valids[pos + 1] : valids[pos + 1];
				return prevMatch && nextMatch;
			}
			return false;
		}

		var offset = 0, begin = pos.begin !== undefined ? pos.begin : pos, end = pos.end !== undefined ? pos.end : pos;
		if (pos.begin > pos.end) {
			begin = pos.end;
			end = pos.begin;
		}

		validatedPos = validatedPos !== undefined ? validatedPos : begin;
		if (begin !== end || (opts.insertMode && maskset.validPositions[validatedPos] !== undefined && fromIsValid === undefined) || validTest === undefined) {
			//reposition & revalidate others
			var positionsClone = $.extend(true, {}, maskset.validPositions),
				lvp = getLastValidPosition(undefined, true),
				i;
			maskset.p = begin; //needed for alternated position after overtype selection

			for (i = lvp; i >= begin; i--) {
				delete maskset.validPositions[i];
				if (validTest === undefined) delete maskset.tests[i + 1];
			}

			var valid = true, j = validatedPos,
				posMatch = j, t, canMatch;

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
					while (getTest(posMatch).match.def !== "") { //loop needed to match further positions
						if ((canMatch = positionCanMatchDefinition(posMatch, t, opts)) !== false || t.match.def === "+") { //validated match //we still need some hackery for the + validator (numeric alias)
							if (t.match.def === "+") getBuffer(true);
							var result = isValid(posMatch, t.input, t.match.def !== "+", t.match.def !== "+");
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
						if (!valid && posMatch > maskset.maskLength) {
							break;
						}
						posMatch++;
					}
					if (getTest(posMatch).match.def == "") {
						valid = false;
					}
					//restore position
					posMatch = j;
				}
				if (!valid) break;
			}

			if (!valid) {
				maskset.validPositions = $.extend(true, {}, positionsClone);
				resetMaskSet(true);
				return false;
			}
		} else if (validTest && getTest(validatedPos).match.cd === validTest.match.cd) {
			maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
		}

		resetMaskSet(true);
		return offset;
	}

	function isMask(pos, strict, fuzzy) {
		var test = getTestTemplate(pos).match;
		if (test.def === "") test = getTest(pos).match;

		if (test.static !== true) {
			return test.fn;
		}
		if (fuzzy === true && (maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].generatedInput !== true)) {
			return true;
		}

		if (strict !== true && pos > -1) {
			if (fuzzy) { //check on the number of tests
				var tests = getTests(pos);
				return tests.length > (1 + (tests[tests.length - 1].match.def === "" ? 1 : 0));
			}
			//else based on the template
			var testTemplate = determineTestTemplate(pos, getTests(pos));
			var testPlaceHolder = getPlaceholder(pos, testTemplate.match);
			return testTemplate.match.def !== testPlaceHolder;

		}
		return false;
	}

	function seekNext(pos, newBlock, fuzzy) {
		if (fuzzy === undefined) fuzzy = true;
		var position = pos + 1;
		while (getTest(position).match.def !== "" &&
		((newBlock === true && (getTest(position).match.newBlockMarker !== true || !isMask(position, undefined, true))) ||
			(newBlock !== true && !isMask(position, undefined, fuzzy)))) {
			position++;
		}
		return position;
	}

	function seekPrevious(pos, newBlock) {
		var position = pos,
			tests;
		if (position <= 0) return 0;

		while (--position > 0 &&
		((newBlock === true && getTest(position).match.newBlockMarker !== true) ||
			(newBlock !== true && !isMask(position, undefined, true) &&
				// eslint-disable-next-line no-empty
				(tests = getTests(position), tests.length < 2 || (tests.length === 2 && tests[1].match.def === ""))))) {
		}
		return position;
	}

	function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
		if (event && $.isFunction(opts.onBeforeWrite)) {
			//    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
			var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
			if (result) {
				if (result.refreshFromBuffer) {
					var refresh = result.refreshFromBuffer;
					refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
					buffer = getBuffer(true);
				}
				if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
			}
		}
		if (input !== undefined) {
			input.inputmask._valueSet(buffer.join(""));
			if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
				caret(input, caretPos, undefined, undefined, (event !== undefined && event.type === "keydown" && (event.keyCode === keyCode.DELETE || event.keyCode === keyCode.BACKSPACE)));
			}
			if (triggerEvents === true) {
				var $input = $(input), nptVal = input.inputmask._valueGet();
				skipInputEvent = true;
				$input.trigger("input");
				setTimeout(function () { //timeout needed for IE
					if (nptVal === getBufferTemplate().join("")) {
						$input.trigger("cleared");
					} else if (isComplete(buffer) === true) {
						$input.trigger("complete");
					}
				}, 0);
			}
		}
	}

	function getPlaceholder(pos, test, returnPL) {
		test = test || getTest(pos).match;
		if (test.placeholder !== undefined || returnPL === true) {
			return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
		} else if (test.static === true) {
			if (pos > -1 && maskset.validPositions[pos] === undefined) {
				var tests = getTests(pos),
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

	function HandleNativePlaceholder(npt, value) {
		if (ie) {
			if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
				var buffer = getBuffer().slice(),
					nptValue = npt.inputmask._valueGet();
				if (nptValue !== value) {
					var lvp = getLastValidPosition();
					if (lvp === -1 && nptValue === getBufferTemplate().join("")) {
						buffer = [];
					} else if (lvp !== -1) { //clearout optional tail of the mask
						clearOptionalTail(buffer);
					}
					writeBuffer(npt, buffer);
				}
			}
		} else if (npt.placeholder !== value) {
			npt.placeholder = value;
			if (npt.placeholder === "") npt.removeAttribute("placeholder");
		}
	}

	function determineNewCaretPosition(selectedCaret, tabbed) {
		function doRadixFocus(clickPos) {
			if (opts.radixPoint !== "" && opts.digits !== 0) {
				var vps = maskset.validPositions;
				if (vps[clickPos] === undefined || (vps[clickPos].input === getPlaceholder(clickPos))) {
					if (clickPos < seekNext(-1)) return true;
					var radixPos = $.inArray(opts.radixPoint, getBuffer());
					if (radixPos !== -1) {
						for (var vp in vps) {
							if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder(vp)) {
								return false;
							}
						}
						return true;
					}
				}
			}
			return false;
		}

		if (tabbed) {
			if (isRTL) {
				selectedCaret.end = selectedCaret.begin;
			} else {
				selectedCaret.begin = selectedCaret.end;
			}
		}
		if (selectedCaret.begin === selectedCaret.end) {
			switch (opts.positionCaretOnClick) {
				case "none":
					break;
				case "select":
					selectedCaret = {begin: 0, end: getBuffer().length};
					break;
				case "ignore":
					selectedCaret.end = selectedCaret.begin = seekNext(getLastValidPosition());
					break;
				case "radixFocus":
					if (doRadixFocus(selectedCaret.begin)) {
						var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
						selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext(radixPos) : radixPos;
						break;
					} //fallback to lvp
				// eslint-disable-next-line no-fallthrough
				default: //lvp:
					var clickPosition = selectedCaret.begin,
						lvclickPosition = getLastValidPosition(clickPosition, true),
						lastPosition = seekNext((lvclickPosition === -1 && !isMask(0)) ? 0 : lvclickPosition);
					if (clickPosition < lastPosition) {
						selectedCaret.end = selectedCaret.begin = !isMask(clickPosition, true) && !isMask(clickPosition - 1, true) ? seekNext(clickPosition) : clickPosition;
					} else {
						var lvp = maskset.validPositions[lvclickPosition],
							tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp),
							placeholder = getPlaceholder(lastPosition, tt.match);
						if ((placeholder !== "" && getBuffer()[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true) || (!isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder)) {
							var newPos = seekNext(lastPosition);
							if (clickPosition >= newPos || clickPosition === lastPosition) {
								lastPosition = newPos;
							}
						}
						selectedCaret.end = selectedCaret.begin = lastPosition;
					}
			}
			return selectedCaret;
		}
	}

	var EventRuler = {
		on: function (input, eventName, eventHandler) {
			var ev = function (e) {
				if (e.originalEvent) {
					e = e.originalEvent || e; //get original event from jquery evenbt
					arguments[0] = e;
				}


				var that = this, args;
				if (that.inputmask === undefined && this.nodeName !== "FORM") { //happens when cloning an object with jquery.clone
					var imOpts = $.data(that, "_inputmask_opts");
					if (imOpts) {
						(new Inputmask(imOpts)).mask(that);
					} else {
						EventRuler.off(that);
					}
				} else if (e.type !== "setvalue" && this.nodeName !== "FORM" && (that.disabled || (that.readOnly && !(e.type === "keydown" && (e.ctrlKey && e.keyCode === 67) || (opts.tabThrough === false && e.keyCode === keyCode.TAB))))) {
					e.preventDefault();
				} else {
					switch (e.type) {
						case "input":
							if (skipInputEvent === true || (e.inputType && e.inputType === "insertCompositionText")) {
								skipInputEvent = false;
								return e.preventDefault();
							}

							// if (mobile) { //this caudes problem see #2220
							// 	args = arguments;
							// 	setTimeout(function () { //needed for caret selection when entering a char on Android 8 - #1818
							// 		eventHandler.apply(that, args);
							// 		caret(that, that.inputmask.caretPos, undefined, true);
							// 	}, 0);
							// 	return false;
							// }
							break;
						case "keydown":
							//Safari 5.1.x - modal dialog fires keypress twice workaround
							skipKeyPressEvent = false;
							skipInputEvent = false;
							break;
						case "keypress":
							if (skipKeyPressEvent === true) {
								return e.preventDefault();
							}
							skipKeyPressEvent = true;
							break;
						case "click":
						case "focus":
							if (validationEvent) { // #841
								validationEvent = false;
								input.blur();
								HandleNativePlaceholder(input, (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).join(""));
								setTimeout(function () {
									input.focus();
								}, 3000);
								return false;
							}
							args = arguments;
							setTimeout(function () { //needed for Chrome ~ initial selection clears after the clickevent
								if (!input.inputmask) {
									// `inputmask.remove()` was called before this callback
									return;
								}
								eventHandler.apply(that, args);
							}, 0);
							return false;
					}
					var returnVal = eventHandler.apply(that, arguments);
					if (returnVal === false) {
						e.preventDefault();
						e.stopPropagation();
					}
					return returnVal;
				}
			};
			//keep instance of the event
			input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
			input.inputmask.events[eventName].push(ev);

			if ($.inArray(eventName, ["submit", "reset"]) !== -1) {
				if (input.form !== null) $(input.form).on(eventName, ev);
			} else {
				$(input).on(eventName, ev);
			}
		},
		off: function (input, event) {
			if (input.inputmask && input.inputmask.events) {
				var events;
				if (event) {
					events = [];
					events[event] = input.inputmask.events[event];
				} else {
					events = input.inputmask.events;
				}
				$.each(events, function (eventName, evArr) {
					while (evArr.length > 0) {
						var ev = evArr.pop();
						if ($.inArray(eventName, ["submit", "reset",]) !== -1) {
							if (input.form !== null) $(input.form).off(eventName, ev);
						} else {
							$(input).off(eventName, ev);
						}
					}
					delete input.inputmask.events[eventName];
				});
			}
		}
	};
	var EventHandlers = {
		keydownEvent: function (e) {
			var input = this,
				$input = $(input),
				k = e.keyCode,
				pos = caret(input);

			var kdResult = opts.onKeyDown.call(this, e, getBuffer(), pos, opts);
			if (kdResult !== undefined) return kdResult;

			//backspace, delete, and escape get special treatment
			if (k === keyCode.BACKSPACE || k === keyCode.DELETE || (iphone && k === keyCode.BACKSPACE_SAFARI) || (e.ctrlKey && k === keyCode.X && !("oncut" in input))) { //backspace/delete
				e.preventDefault(); //stop default action but allow propagation
				handleRemove(input, k, pos);
				writeBuffer(input, getBuffer(true), maskset.p, e, input.inputmask._valueGet() !== getBuffer().join(""));
			} else if (k === keyCode.END || k === keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
				e.preventDefault();
				var caretPos = seekNext(getLastValidPosition());
				caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
			} else if ((k === keyCode.HOME && !e.shiftKey) || k === keyCode.PAGE_UP) { //Home or page_up
				e.preventDefault();
				caret(input, 0, e.shiftKey ? pos.begin : 0, true);
			} else if (((opts.undoOnEscape && k === keyCode.ESCAPE) || (k === 90 && e.ctrlKey)) && e.altKey !== true) { //escape && undo && #762
				checkVal(input, true, false, undoValue.split(""));
				$input.trigger("click");
				// } else if (k === keyCode.INSERT && !(e.shiftKey || e.ctrlKey) && inputmask.userOptions.insertMode === undefined) { //insert
				// 	opts.insertMode = !opts.insertMode;
				// 	caret(input, pos.begin, pos.end);
			} else if (opts.tabThrough === true && k === keyCode.TAB) {
				if (e.shiftKey === true) {
					if (getTest(pos.begin).match.static === true) {
						pos.begin = seekNext(pos.begin);
					}
					pos.end = seekPrevious(pos.begin, true);
					pos.begin = seekPrevious(pos.end, true);
				} else {
					pos.begin = seekNext(pos.begin, true);
					pos.end = seekNext(pos.begin, true);
					if (pos.end < maskset.maskLength) pos.end--;
				}
				if (pos.begin < maskset.maskLength) {
					e.preventDefault();
					caret(input, pos.begin, pos.end);
				}
			} else if (!e.shiftKey) {
				if (opts.insertModeVisual && opts.insertMode === false) {
					if (k === keyCode.RIGHT) {
						setTimeout(function () {
							var caretPos = caret(input);
							caret(input, caretPos.begin);
						}, 0);
					} else if (k === keyCode.LEFT) {
						setTimeout(function () {
							var caretPos = {
								begin: translatePosition(input.inputmask.caretPos.begin),
								end: translatePosition(input.inputmask.caretPos.end)
							};
							if (isRTL) {
								caret(input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1));
							} else {
								caret(input, caretPos.begin - (caretPos.begin === 0 ? 0 : 1));
							}
						}, 0);
					}
				}
			}

			ignorable = $.inArray(k, opts.ignorables) !== -1;
		},
		keypressEvent: function (e, checkval, writeOut, strict, ndx) {
			var input = this,
				$input = $(input),
				k = e.which || e.charCode || e.keyCode;

			if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
				if (k === keyCode.ENTER && undoValue !== getBuffer().join("")) {
					undoValue = getBuffer().join("");
					// e.preventDefault();
					setTimeout(function () {
						$input.trigger("change");
					}, 0);
				}
				skipInputEvent = true; //skip the input as otherwise the skipped char could be picked up for validation by the inputfallback
				return true;
			} else if (k) {
				//special treat the decimal separator
				if ((k === 44 || k === 46) && e.location === 3 && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
				var pos = checkval ? {
						begin: ndx,
						end: ndx
					} : caret(input),
					forwardPosition, c = String.fromCharCode(k);

				maskset.writeOutBuffer = true;
				var valResult = isValid(pos, c, strict);
				if (valResult !== false) {
					resetMaskSet(true);
					forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos);
					maskset.p = forwardPosition; //needed for checkval
				}

				forwardPosition = ((opts.numericInput && valResult.caret === undefined) ? seekPrevious(forwardPosition) : forwardPosition);
				if (writeOut !== false) {

					setTimeout(function () {
						opts.onKeyValidation.call(input, k, valResult);
					}, 0);
					if (maskset.writeOutBuffer && valResult !== false) {
						var buffer = getBuffer();
						writeBuffer(input, buffer, forwardPosition, e, checkval !== true);
					}
				}

				e.preventDefault();

				if (checkval) {
					if (valResult !== false) valResult.forwardPosition = forwardPosition;
					return valResult;
				}
			}
		},
		pasteEvent: function (e) {
			var input = this,
				inputValue = input.inputmask._valueGet(true),
				caretPos = caret(input),
				tempValue;

			if (isRTL) {
				tempValue = caretPos.end;
				caretPos.end = caretPos.begin;
				caretPos.begin = tempValue;
			}

			var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
				valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);

			if (valueBeforeCaret == (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
			if (valueAfterCaret == (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).slice(caretPos.end).join("")) valueAfterCaret = "";

			if (window.clipboardData && window.clipboardData.getData) { // IE
				inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
			} else if (e.clipboardData && e.clipboardData.getData) {
				inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
			} else {
				return true;
			} //allow native paste event as fallback ~ masking will continue by inputfallback

			var pasteValue = inputValue;
			if ($.isFunction(opts.onBeforePaste)) {
				pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts);
				if (pasteValue === false) {
					return e.preventDefault();
				}
				if (!pasteValue) {
					pasteValue = inputValue;
				}
			}
			checkVal(input, false, false, pasteValue.toString().split(""));
			writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join(""));
			return e.preventDefault();
		},
		inputFallBackEvent: function (e) { //fallback when keypress is not triggered
			function ieMobileHandler(input, inputValue, caretPos) {
				if (iemobile) { //iemobile just sets the character at the end althought the caret position is correctly set
					var inputChar = inputValue.replace(getBuffer().join(""), "");
					if (inputChar.length === 1) {
						var iv = inputValue.split("");
						iv.splice(caretPos.begin, 0, inputChar);
						inputValue = iv.join("");
					}
				}
				return inputValue;
			}

			function analyseChanges(inputValue, buffer, caretPos) {
				var frontPart = inputValue.substr(0, caretPos.begin).split(""),
					backPart = inputValue.substr(caretPos.begin).split(""),
					frontBufferPart = buffer.substr(0, caretPos.begin).split(""),
					backBufferPart = buffer.substr(caretPos.begin).split("");

				var fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length,
					bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length,
					bl, i, action = "", data = [], marker = "~", placeholder;

				//align buffers
				while (frontPart.length < fpl) frontPart.push(marker);
				while (frontBufferPart.length < fpl) frontBufferPart.push(marker);
				while (backPart.length < bpl) backPart.unshift(marker);
				while (backBufferPart.length < bpl) backBufferPart.unshift(marker);

				var newBuffer = frontPart.concat(backPart);
				var oldBuffer = frontBufferPart.concat(backBufferPart);

				// console.log("N " + newBuffer);
				// console.log("O " + oldBuffer);

				for (i = 0, bl = newBuffer.length; i < bl; i++) {
					placeholder = getPlaceholder(translatePosition(i));
					switch (action) {
						case "insertText":
							if (oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1) {
								data.push(newBuffer[i]);
							}
							i = bl;
							break;
						case "insertReplacementText":
							if (newBuffer[i] === marker) { //extend selection
								caretPos.end++;
							} else {
								// breakout loop
								i = bl;
							}
							break;
						case "deleteContentBackward":
							if (newBuffer[i] === marker) {
								caretPos.end++;
							} else {
								//breakout loop
								i = bl;
							}
							break;
						default:
							if (newBuffer[i] !== oldBuffer[i]) {
								if ((newBuffer[i + 1] === marker || newBuffer[i + 1] === placeholder || newBuffer[i + 1] === undefined) && ((oldBuffer[i] === placeholder && oldBuffer[i + 1] === marker) || oldBuffer[i] === marker)) {  //basic insert
									action = "insertText";
									data.push(newBuffer[i]);
									caretPos.begin--;
									caretPos.end--;
								} else if (oldBuffer[i + 1] === marker && oldBuffer[i] === newBuffer[i + 1]) { //insert between
									action = "insertText";
									data.push(newBuffer[i]);
									caretPos.begin--;
									caretPos.end--;
								} else if (newBuffer[i] !== placeholder && newBuffer[i] !== marker &&
									(newBuffer[i + 1] === marker || (oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1] /*single char replacement*/))) { //replace selection
									action = "insertReplacementText";
									data.push(newBuffer[i]);
									caretPos.begin--;
								} else if (newBuffer[i] === marker) {  //delete~backspace
									action = "deleteContentBackward";
									if (isMask(translatePosition(i), true) || oldBuffer[i] === opts.radixPoint) caretPos.end++;
								} else {
									i = bl;
								}
							}
							break;
					}
				}

				return {
					action: action,
					data: data,
					caret: caretPos
				};
			}

			var input = this,
				inputValue = input.inputmask._valueGet(true),
				buffer = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""),
				caretPos = caret(input, undefined, undefined, true);

			if (buffer !== inputValue) {
				// inputValue = radixPointHandler(input, inputValue, caretPos);
				inputValue = ieMobileHandler(input, inputValue, caretPos);

				var changes = analyseChanges(inputValue, buffer, caretPos);

				// console.log(JSON.stringify(changes));
				if ((input.inputmask.shadowRoot || document).activeElement !== input) {
					input.focus();
				}
				writeBuffer(input, getBuffer());
				caret(input, caretPos.begin, caretPos.end, true);
				switch (changes.action) {
					case "insertText":
					case "insertReplacementText":
						$.each(changes.data, function (ndx, entry) {
							var keypress = new $.Event("keypress");
							keypress.which = entry.charCodeAt(0);
							ignorable = false; //make sure ignorable is ignored ;-)
							EventHandlers.keypressEvent.call(input, keypress);
						});
						setTimeout(function () {  //#2195 trigger keyup to help some other plugins to track changes
							$el.trigger("keyup");
						}, 0);
						break;
					case "deleteContentBackward":
						var keydown = new $.Event("keydown");
						keydown.keyCode = keyCode.BACKSPACE;
						EventHandlers.keydownEvent.call(input, keydown);
						break;
					default:
						applyInputValue(input, inputValue);
						break;
				}

				e.preventDefault();
			}
		},
		compositionendEvent: function (e) {
			$el.trigger("input");
		},
		setValueEvent: function (e) {
			var input = this,
				value = (e && e.detail) ? e.detail[0] : arguments[1];

			if (value === undefined) {
				value = input.inputmask._valueGet(true);
			}

			applyInputValue(input, value);

			if ((e.detail && e.detail[1] !== undefined) || arguments[2] !== undefined) {
				caret(input, e.detail ? e.detail[1] : arguments[2]);
			}
		}
		,
		focusEvent: function (e) {
			var input = this,
				nptValue = input.inputmask._valueGet();

			if (opts.showMaskOnFocus) {
				if (nptValue !== getBuffer().join("")) {
					writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
				} /*else if (mouseEnter === false) { //only executed on focus without mouseenter
					caret(input, seekNext(getLastValidPosition()));
				}*/
			}
			if (opts.positionCaretOnTab === true && mouseEnter === false && (!isComplete(getBuffer()) || getLastValidPosition() === -1)) {
				EventHandlers.clickEvent.apply(input, [e, true]);
			}
			undoValue = getBuffer().join("");
		}
		,
		invalidEvent: function (e) {
			validationEvent = true;
		}
		,
		mouseleaveEvent: function () {
			var input = this;
			mouseEnter = false;
			if (opts.clearMaskOnLostFocus && (input.inputmask.shadowRoot || document).activeElement !== input) {
				HandleNativePlaceholder(input, originalPlaceholder);
			}
		}
		,
		clickEvent: function (e, tabbed) {
			var input = this;
			if ((input.inputmask.shadowRoot || document).activeElement === input) {
				var newCaretPosition = determineNewCaretPosition(caret(input), tabbed);
				if (newCaretPosition !== undefined) {
					caret(input, newCaretPosition);
				}
			}
		},
		cutEvent: function (e) {
			var input = this,
				pos = caret(input);

			//correct clipboardData
			var clipboardData = window.clipboardData || e.clipboardData,
				clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
			clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join(""));
			if (document.execCommand) document.execCommand("copy"); // copy selected content to system clipbaord

			handleRemove(input, keyCode.DELETE, pos);
			writeBuffer(input, getBuffer(), maskset.p, e, undoValue !== getBuffer().join(""));
		}
		,
		blurEvent: function (e) {
			var $input = $(this),
				input = this;
			if (input.inputmask) {
				HandleNativePlaceholder(input, originalPlaceholder);
				var nptValue = input.inputmask._valueGet(),
					buffer = getBuffer().slice();

				if (nptValue !== "") {
					if (opts.clearMaskOnLostFocus) {
						if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
							buffer = [];
						} else { //clearout optional tail of the mask
							clearOptionalTail(buffer);
						}
					}
					if (isComplete(buffer) === false) {
						setTimeout(function () {
							$input.trigger("incomplete");
						}, 0);
						if (opts.clearIncomplete) {
							resetMaskSet();
							if (opts.clearMaskOnLostFocus) {
								buffer = [];
							} else {
								buffer = getBufferTemplate().slice();
							}
						}
					}

					writeBuffer(input, buffer, undefined, e);
				}

				if (undoValue !== getBuffer().join("")) {
					undoValue = getBuffer().join("");
					$input.trigger("change");
				}
			}
		}
		,
		mouseenterEvent: function () {
			var input = this;
			mouseEnter = true;
			if ((input.inputmask.shadowRoot || document).activeElement !== input) {
				if (originalPlaceholder == undefined && input.placeholder !== originalPlaceholder) {
					originalPlaceholder = input.placeholder;
				}
				if (opts.showMaskOnHover) {
					HandleNativePlaceholder(input, (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).join(""));
				}
			}
		}
		,
		submitEvent: function () { //trigger change on submit if any
			if (undoValue !== getBuffer().join("")) {
				$el.trigger("change");
			}
			if (opts.clearMaskOnLostFocus && getLastValidPosition() === -1 && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("")) {
				el.inputmask._valueSet(""); //clear masktemplete on submit and still has focus
			}
			if (opts.clearIncomplete && isComplete(getBuffer()) === false) {
				el.inputmask._valueSet("");
			}
			if (opts.removeMaskOnSubmit) {
				el.inputmask._valueSet(el.inputmask.unmaskedvalue(), true);
				setTimeout(function () {
					writeBuffer(el, getBuffer());
				}, 0);
			}
		}
		,
		resetEvent: function () {
			el.inputmask.refreshValue = true; //indicate a forced refresh when there is a call to the value before leaving the triggering event fn
			setTimeout(function () {
				applyInputValue(el, el.inputmask._valueGet(true));
			}, 0);
		}
		,
	};

	function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
		var inputmask = this || input.inputmask,
			inputValue = nptvl.slice(),
			charCodes = "",
			initialNdx = -1,
			result = undefined;

		// console.log(nptvl);

		function isTemplateMatch(ndx, charCodes) {
			var targetTemplate = getMaskTemplate(true, 0).slice(ndx, seekNext(ndx)).join("").replace(/'/g, ""),
				charCodeNdx = targetTemplate.indexOf(charCodes);
			//strip spaces from targetTemplate
			while (charCodeNdx > 0 && targetTemplate[charCodeNdx - 1] === " ") charCodeNdx--;

			var match = charCodeNdx === 0 && !isMask(ndx)
				&& (getTest(ndx).match.nativeDef === charCodes.charAt(0)
					|| (getTest(ndx).match.static === true && getTest(ndx).match.nativeDef === ("'" + charCodes.charAt(0)))
					|| (getTest(ndx).match.nativeDef === " " && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0)
						|| (getTest(ndx + 1).match.static === true && getTest(ndx + 1).match.nativeDef === ("'" + charCodes.charAt(0))))));

			if (!match && charCodeNdx > 0 && !isMask(ndx, false, true)) {
				var nextPos = seekNext(ndx);
				if (inputmask.caretPos.begin < nextPos) {
					inputmask.caretPos = {begin: nextPos};
				}
			}
			return match;
		}

		resetMaskSet();
		maskset.tests = {}; //reset tests ~ possible after alternating
		initialNdx = opts.radixPoint ? determineNewCaretPosition({begin: 0, end: 0}).begin : 0;
		maskset.p = initialNdx;
		inputmask.caretPos = {begin: initialNdx};

		var staticMatches = [], prevCaretPos = inputmask.caretPos;
		$.each(inputValue, function (ndx, charCode) {
			if (charCode !== undefined) { //inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
				if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, true) &&
					isValid(ndx, inputValue[ndx], true, undefined, undefined, true) === false) {
					maskset.p++;
				} else {
					var keypress = new $.Event("_checkval");
					keypress.which = charCode.toString().charCodeAt(0);
					charCodes += charCode;
					var lvp = getLastValidPosition(undefined, true);
					if (!isTemplateMatch(initialNdx, charCodes)) {
						result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, inputmask.caretPos.begin);

						if (result) {
							initialNdx = inputmask.caretPos.begin + 1;
							charCodes = "";
						}
					} else {
						result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, lvp + 1);
					}
					if (result) {
						if (result.pos !== undefined && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true && maskset.validPositions[result.pos].alternation === undefined) {
							staticMatches.push(result.pos);
							if (!isRTL) {
								result.forwardPosition = result.pos + 1;
							}
						}
						writeBuffer(undefined, getBuffer(), result.forwardPosition, keypress, false);
						inputmask.caretPos = {begin: result.forwardPosition, end: result.forwardPosition};
						prevCaretPos = inputmask.caretPos;
					} else {
						inputmask.caretPos = prevCaretPos;
					}  //restore the caret position from before the failed validation
				}
			}
		});
		if (staticMatches.length > 0) {
			var sndx, validPos, nextValid = seekNext(-1, undefined, false);
			if ((!isComplete(getBuffer()) && staticMatches.length <= nextValid)
				|| (isComplete(getBuffer()) && staticMatches.length > 0 && (staticMatches.length !== nextValid && staticMatches[0] === 0))) { //should check if is sequence starting from 0
				var nextSndx = nextValid;
				while ((sndx = staticMatches.shift()) !== undefined) {
					var keypress = new $.Event("_checkval");
					validPos = maskset.validPositions[sndx];
					validPos.generatedInput = true;
					keypress.which = validPos.input.charCodeAt(0);
					result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, nextSndx);
					if (result && result.pos !== undefined && result.pos !== sndx && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true) {
						staticMatches.push(result.pos);
					} else if (!result) break;
					nextSndx++;
				}
			} else { //mark al statics as generated
				while ((sndx = staticMatches.pop())) {
					validPos = maskset.validPositions[sndx];
					if (validPos) {
						validPos.generatedInput = true;
					}
				}
			}
		}
		if (writeOut) {
			writeBuffer(input, getBuffer(), result ? result.forwardPosition : undefined, initiatingEvent || new $.Event("checkval"), initiatingEvent && initiatingEvent.type === "input");
			for (var vndx in maskset.validPositions) {
				if (maskset.validPositions[vndx].match.generated !== true) { //only remove non forced generated
					delete maskset.validPositions[vndx].generatedInput; //clear generated markings ~ consider initializing with a  value as fully typed
				}
			}
		}
	}

	function unmaskedvalue(input) {
		if (input) {
			if (input.inputmask === undefined) {
				return input.value;
			}
			if (input.inputmask && input.inputmask.refreshValue) { //forced refresh from the value form.reset
				applyInputValue(input, input.inputmask._valueGet(true));
			}
		}
		var umValue = [],
			vps = maskset.validPositions;
		for (var pndx in vps) {
			if (vps[pndx] && vps[pndx].match && (vps[pndx].match.static != true || vps[pndx].generatedInput !== true)) {
				umValue.push(vps[pndx].input);
			}
		}
		var unmaskedValue = umValue.length === 0 ? "" : (isRTL ? umValue.reverse() : umValue).join("");
		if ($.isFunction(opts.onUnMask)) {
			var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
			unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
		}
		return unmaskedValue;
	}

	function translatePosition(pos) {
		if (isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
			pos = el.inputmask._valueGet().length - pos;
		}
		return pos;
	}

	function caret(input, begin, end, notranslate, isDelete) {
		var range;
		if (begin !== undefined) {
			if ($.isArray(begin)) {
				end = isRTL ? begin[0] : begin[1];
				begin = isRTL ? begin[1] : begin[0];
			}
			if (begin.begin !== undefined) {
				end = isRTL ? begin.begin : begin.end;
				begin = isRTL ? begin.end : begin.begin;
			}
			if (typeof begin === "number") {
				begin = notranslate ? begin : translatePosition(begin);
				end = notranslate ? end : translatePosition(end);
				end = (typeof end == "number") ? end : begin;
				// if (!$(input).is(":visible")) {
				// 	return;
				// }

				var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
				input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
				input.inputmask.caretPos = {begin: begin, end: end}; //track caret internally
				if (opts.insertModeVisual && opts.insertMode === false && begin === end) {
					if (!isDelete) {
						end++; //set visualization for insert/overwrite mode
					}
				}
				if (input === (input.inputmask.shadowRoot || document).activeElement) {
					if ("setSelectionRange" in input) {
						input.setSelectionRange(begin, end);
					} else if (window.getSelection) {
						range = document.createRange();
						if (input.firstChild === undefined || input.firstChild === null) {
							var textNode = document.createTextNode("");
							input.appendChild(textNode);
						}
						range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
						range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
						range.collapse(true);
						var sel = window.getSelection();
						sel.removeAllRanges();
						sel.addRange(range);
						//input.focus();
					} else if (input.createTextRange) {
						range = input.createTextRange();
						range.collapse(true);
						range.moveEnd("character", end);
						range.moveStart("character", begin);
						range.select();
					}
				}
			}
		} else {
			if ("selectionStart" in input && "selectionEnd" in input) {
				begin = input.selectionStart;
				end = input.selectionEnd;
			} else if (window.getSelection) {
				range = window.getSelection().getRangeAt(0);
				if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
					begin = range.startOffset;
					end = range.endOffset;
				}
			} else if (document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
				end = begin + range.text.length;
			}

			// if (opts.insertModeVisual && opts.insertMode === false && begin === (end - 1)) end--; //correct caret for insert/overwrite mode

			/*eslint-disable consistent-return */
			return {
				"begin": notranslate ? begin : translatePosition(begin),
				"end": notranslate ? end : translatePosition(end)
			};
			/*eslint-enable consistent-return */
		}
	}

	function determineLastRequiredPosition(returnDefinition) {
		var buffer = getMaskTemplate(true, getLastValidPosition(), true, true),
			bl = buffer.length,
			pos, lvp = getLastValidPosition(),
			positions = {},
			lvTest = maskset.validPositions[lvp],
			ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
			testPos;
		for (pos = lvp + 1; pos < buffer.length; pos++) {
			testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
			ndxIntlzr = testPos.locator.slice();
			positions[pos] = $.extend(true, {}, testPos);
		}

		var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
		for (pos = bl - 1; pos > lvp; pos--) {
			testPos = positions[pos];
			if ((testPos.match.optionality ||
				(testPos.match.optionalQuantifier && testPos.match.newBlockMarker) ||
				(lvTestAlt &&
					(
						(lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.static != true) ||
						(testPos.match.static === true &&
							testPos.locator[lvTest.alternation] &&
							checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) &&
							getTests(pos)[0].def !== "")
					)
				)) &&
				buffer[pos] === getPlaceholder(pos, testPos.match)) {
				bl--;
			} else {
				break;
			}
		}
		return returnDefinition ? {
			"l": bl,
			"def": positions[bl] ? positions[bl].match : undefined
		} : bl;
	}

	function clearOptionalTail(buffer) {
		buffer.length = 0;
		var template = getMaskTemplate(true, 0, true, undefined, true), lmnt;
		while ((lmnt = template.shift()) !== undefined) buffer.push(lmnt);
		return buffer;
	}

	function isComplete(buffer) { //return true / false / undefined (repeat *)
		if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
		if (opts.repeat === "*") return undefined;
		var complete = false,
			lrp = determineLastRequiredPosition(true),
			aml = seekPrevious(lrp.l);

		if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
			complete = true;
			for (var i = 0; i <= aml; i++) {
				var test = getTestTemplate(i).match;
				if ((test.static !== true && maskset.validPositions[i] === undefined && test.optionality !== true && test.optionalQuantifier !== true) || (test.static === true && buffer[i] !== getPlaceholder(i, test))) {
					complete = false;
					break;
				}
			}
		}
		return complete;
	}


	function handleRemove(input, k, pos, strict, fromIsValid) {
		if (opts.numericInput || isRTL) {
			if (k === keyCode.BACKSPACE) {
				k = keyCode.DELETE;
			} else if (k === keyCode.DELETE) {
				k = keyCode.BACKSPACE;
			}

			if (isRTL) {
				var pend = pos.end;
				pos.end = pos.begin;
				pos.begin = pend;
			}
		}

		var lvp = getLastValidPosition(undefined, true);
		if (pos.end >= getBuffer().length && lvp >= pos.end) { //handle numeric negate symbol offset, due to  dynamic jit masking
			pos.end = lvp + 1;
		}

		if (k === keyCode.BACKSPACE) {
			if ((pos.end - pos.begin < 1)) {
				pos.begin = seekPrevious(pos.begin);
			}
		} else if (k === keyCode.DELETE) {
			if (pos.begin === pos.end) {
				pos.end = isMask(pos.end, true, true) ? pos.end + 1 : seekNext(pos.end) + 1;
			}
		}
		var offset;
		if ((offset = revalidateMask(pos)) !== false) {
			if (strict !== true && opts.keepStatic !== false || (opts.regex !== null && getTest(pos.begin).match.def.indexOf("|") !== -1)) { //TODO NEEDS BETTER CHECK WHEN TO ALTERNATE  ~ opts regex isn"t good enough
				var result = alternate(true);
				if (result) {
					var newPos = result.caret !== undefined ? result.caret : (result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, true));
					if (k !== keyCode.DELETE || pos.begin > newPos) {
						pos.begin == newPos;
					}
				}
			}

			if (strict !== true) {
				maskset.p = k === keyCode.DELETE ? pos.begin + offset : pos.begin;
			}
		}
	}

	function applyInputValue(input, value) {
		input.inputmask.refreshValue = false;
		if ($.isFunction(opts.onBeforeMask)) value = opts.onBeforeMask.call(inputmask, value, opts) || value;
		value = value.toString().split("");
		checkVal(input, true, false, value);
		undoValue = getBuffer().join("");
		if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && getLastValidPosition() === -1) {
			input.inputmask._valueSet("");
		}
	}

	function mask(elem) {
		function isElementTypeSupported(input, opts) {
			function patchValueProperty(npt) {
				var valueGet;
				var valueSet;

				function patchValhook(type) {
					if ($.valHooks && ($.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true)) {
						var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
							return elem.value;
						};
						var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
							elem.value = value;
							return elem;
						};

						$.valHooks[type] = {
							get: function (elem) {
								if (elem.inputmask) {
									if (elem.inputmask.opts.autoUnmask) {
										return elem.inputmask.unmaskedvalue();
									} else {
										var result = valhookGet(elem);
										return getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
									}
								} else {
									return valhookGet(elem);
								}
							},
							set: function (elem, value) {
								var result = valhookSet(elem, value);
								if (elem.inputmask) {
									applyInputValue(elem, value);
								}
								return result;
							},
							inputmaskpatch: true
						};
					}
				}

				function getter() {
					if (this.inputmask) {
						return this.inputmask.opts.autoUnmask ?
							this.inputmask.unmaskedvalue() :
							(getLastValidPosition() !== -1 || opts.nullable !== true ?
								((this.inputmask.shadowRoot || document.activeElement) === this && opts.clearMaskOnLostFocus ?
									(isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") :
									valueGet.call(this)) :
								"");
					} else {
						return valueGet.call(this);
					}
				}

				function setter(value) {
					valueSet.call(this, value);
					if (this.inputmask) {
						applyInputValue(this, value);
					}
				}

				function installNativeValueSetFallback(npt) {
					EventRuler.on(npt, "mouseenter", function () {
						var input = this,
							value = input.inputmask._valueGet(true);
						if (value !== (isRTL ? getBuffer().reverse() : getBuffer()).join("")) { //Is this correct? to apply RTL? TOCHECK
							applyInputValue(input, value);
						}
					});
				}

				if (!npt.inputmask.__valueGet) {
					if (opts.noValuePatching !== true) {
						if (Object.getOwnPropertyDescriptor) {
							if (typeof Object.getPrototypeOf !== "function") {
								Object.getPrototypeOf = typeof "test".__proto__ === "object" ? function (object) {
									return object.__proto__;
								} : function (object) {
									return object.constructor.prototype;
								};
							}

							var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
							if (valueProperty && valueProperty.get && valueProperty.set) {
								valueGet = valueProperty.get;
								valueSet = valueProperty.set;
								Object.defineProperty(npt, "value", {
									get: getter,
									set: setter,
									configurable: true
								});
							} else if (npt.tagName.toLowerCase() !== "input") {
								valueGet = function () {
									return this.textContent;
								};
								valueSet = function (value) {
									this.textContent = value;
								};
								Object.defineProperty(npt, "value", {
									get: getter,
									set: setter,
									configurable: true
								});
							}
						} else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
							valueGet = npt.__lookupGetter__("value");
							valueSet = npt.__lookupSetter__("value");

							npt.__defineGetter__("value", getter);
							npt.__defineSetter__("value", setter);
						}
						npt.inputmask.__valueGet = valueGet; //store native property getter
						npt.inputmask.__valueSet = valueSet; //store native property setter
					}
					npt.inputmask._valueGet = function (overruleRTL) {
						return isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
					};
					npt.inputmask._valueSet = function (value, overruleRTL) { //null check is needed for IE8 => otherwise converts to "null"
						valueSet.call(this.el, (value === null || value === undefined) ? "" : ((overruleRTL !== true && isRTL) ? value.split("").reverse().join("") : value));
					};

					if (valueGet === undefined) { //jquery.val fallback
						valueGet = function () {
							return this.value;
						};
						valueSet = function (value) {
							this.value = value;
						};
						patchValhook(npt.type);
						installNativeValueSetFallback(npt);
					}
				}
			}

			if (input.tagName.toLowerCase() !== "textarea") {
				opts.ignorables.push(keyCode.ENTER);
			}

			var elementType = input.getAttribute("type");
			var isSupported = (input.tagName.toLowerCase() === "input" && $.inArray(elementType, opts.supportsInputType) !== -1) || input.isContentEditable || input.tagName.toLowerCase() === "textarea";
			if (!isSupported) {
				if (input.tagName.toLowerCase() === "input") {
					var el = document.createElement("input");
					el.setAttribute("type", elementType);
					isSupported = el.type === "text"; //apply mask only if the type is not natively supported
					el = null;
				} else {
					isSupported = "partial";
				}
			}
			if (isSupported !== false) {
				patchValueProperty(input);
			} else {
				input.inputmask = undefined;
			}
			return isSupported;
		}

		//unbind all events - to make sure that no other mask will interfere when re-masking
		EventRuler.off(elem);
		var isSupported = isElementTypeSupported(elem, opts);
		if (isSupported !== false) {
			el = elem;
			$el = $(el);

			originalPlaceholder = el.placeholder;

			//read maxlength prop from el
			maxLength = el !== undefined ? el.maxLength : undefined;
			if (maxLength === -1) maxLength = undefined;
			if ("inputMode" in el && el.getAttribute("inputmode") === null) {
				el.inputMode = opts.inputmode;
				el.setAttribute("inputmode", opts.inputmode);
			}


			if (isSupported === true) {
				opts.showMaskOnFocus = opts.showMaskOnFocus && ["cc-number", "cc-exp"].indexOf(el.autocomplete) === -1;
				if (iphone) { //selecting the caret shows as a slection on iphone
					opts.insertModeVisual = false;
				}

				//bind events
				EventRuler.on(el, "submit", EventHandlers.submitEvent);
				EventRuler.on(el, "reset", EventHandlers.resetEvent);
				EventRuler.on(el, "blur", EventHandlers.blurEvent);
				EventRuler.on(el, "focus", EventHandlers.focusEvent);
				EventRuler.on(el, "invalid", EventHandlers.invalidEvent);
				EventRuler.on(el, "click", EventHandlers.clickEvent);
				EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
				EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
				EventRuler.on(el, "paste", EventHandlers.pasteEvent);
				EventRuler.on(el, "cut", EventHandlers.cutEvent);
				EventRuler.on(el, "complete", opts.oncomplete);
				EventRuler.on(el, "incomplete", opts.onincomplete);
				EventRuler.on(el, "cleared", opts.oncleared);
				if (!mobile && opts.inputEventOnly !== true) {
					EventRuler.on(el, "keydown", EventHandlers.keydownEvent);
					EventRuler.on(el, "keypress", EventHandlers.keypressEvent);
				} else {
					el.removeAttribute("maxLength");
				}
				EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
				EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent);
				// EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent); //https://github.com/w3c/input-events - to implement
			}
			EventRuler.on(el, "setvalue", EventHandlers.setValueEvent);

			//apply mask
			undoValue = getBufferTemplate().join(""); //initialize the buffer and getmasklength
			var activeElement = (el.inputmask.shadowRoot || document).activeElement;
			if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || activeElement === el) {
				applyInputValue(el, el.inputmask._valueGet(true), opts);
				var buffer = getBuffer().slice();
				if (isComplete(buffer) === false) {
					if (opts.clearIncomplete) {
						resetMaskSet();
					}
				}
				if (opts.clearMaskOnLostFocus && activeElement !== el) {
					if (getLastValidPosition() === -1) {
						buffer = [];
					} else {
						clearOptionalTail(buffer);
					}
				}
				if (opts.clearMaskOnLostFocus === false || (opts.showMaskOnFocus && activeElement === el) || el.inputmask._valueGet(true) !== "") {
					writeBuffer(el, buffer);
				}
				if (activeElement === el) { //position the caret when in focus
					caret(el, seekNext(getLastValidPosition()));
				}
			}
		}
	}

	//action object
	var valueBuffer;
	if (actionObj !== undefined) {
		switch (actionObj.action) {
			case "isComplete":
				el = actionObj.el;
				return isComplete(getBuffer());
			case "unmaskedvalue":
				if (el === undefined || actionObj.value !== undefined) {
					valueBuffer = actionObj.value;
					valueBuffer = ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer) : valueBuffer).split("");
					checkVal.call(this, undefined, false, false, valueBuffer);
					if ($.isFunction(opts.onBeforeWrite)) opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts);
				}
				return unmaskedvalue(el);
			case "mask":
				mask(el);
				break;
			case "format":
				valueBuffer = ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value) : actionObj.value).split("");
				checkVal.call(this, undefined, true, false, valueBuffer);
				if (actionObj.metadata) {
					return {
						value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
						metadata: maskScope.call(this, {
							"action": "getmetadata"
						}, maskset, opts)
					};
				}

				return isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
			case "isValid":
				if (actionObj.value) {
					valueBuffer = ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value) : actionObj.value).split("");
					checkVal.call(this, undefined, true, false, valueBuffer);
				} else {
					actionObj.value = isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
				}
				var buffer = getBuffer();
				var rl = determineLastRequiredPosition(),
					lmib = buffer.length - 1;
				for (; lmib > rl; lmib--) {
					if (isMask(lmib)) break;
				}
				buffer.splice(rl, lmib + 1 - rl);

				return isComplete(buffer) && actionObj.value === (isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""));
			case "getemptymask":
				return getBufferTemplate().join("");
			case "remove":
				if (el && el.inputmask) {
					$.data(el, "_inputmask_opts", null); //invalidate
					$el = $(el);
					//writeout the value
					var cv = opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(opts.autoUnmask);
					if (cv !== getBufferTemplate().join("")) el.inputmask._valueSet(cv, opts.autoUnmask); else el.inputmask._valueSet("");
					//unbind all events
					EventRuler.off(el);

					//restore the value property
					var valueProperty;
					if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
						valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value");
						if (valueProperty) {
							if (el.inputmask.__valueGet) {
								Object.defineProperty(el, "value", {
									get: el.inputmask.__valueGet,
									set: el.inputmask.__valueSet,
									configurable: true
								});
							}
						}
					} else if (document.__lookupGetter__ && el.__lookupGetter__("value")) {
						if (el.inputmask.__valueGet) {
							el.__defineGetter__("value", el.inputmask.__valueGet);
							el.__defineSetter__("value", el.inputmask.__valueSet);
						}
					}
					//clear data
					el.inputmask = undefined;
				}
				return el;
			case "getmetadata":
				if ($.isArray(maskset.metadata)) {
					var maskTarget = getMaskTemplate(true, 0, false).join("");
					$.each(maskset.metadata, function (ndx, mtdt) {
						if (mtdt.mask === maskTarget) {
							maskTarget = mtdt;
							return false;
						}
					});
					return maskTarget;
				}

				return maskset.metadata;
		}
	}
};
