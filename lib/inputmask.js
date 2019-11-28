/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */
var $ = require("./dependencyLibs/inputmask.dependencyLib"), window = require("./global/window"),
	document = window.document,
	generateMaskSet = require("./maskset").generateMaskSet,
	analyseMask = require("./maskset").analyseMask,
	maskScope = require("./maskScope");


function Inputmask(alias, options, internal) {
	//allow instanciating without new
	if (!(this instanceof Inputmask)) {
		return new Inputmask(alias, options, internal);
	}

	this.el = undefined;
	this.events = {};
	this.maskset = undefined;
	this.refreshValue = false; //indicate a refresh from the inputvalue is needed (form.reset)

	if (internal !== true) {
		//init options
		if ($.isPlainObject(alias)) {
			options = alias;
		} else {
			options = options || {};
			if (alias) options.alias = alias;
		}
		this.opts = $.extend(true, {}, this.defaults, options);
		this.noMasksCache = options && options.definitions !== undefined;
		this.userOptions = options || {}; //user passed options
		resolveAlias(this.opts.alias, options, this.opts);
		this.isRTL = this.opts.numericInput;
	}
}

Inputmask.prototype = {
	dataAttribute: "data-inputmask", //data attribute prefix used for attribute binding
	//options default
	defaults: {
		_maxTestPos: 500,
		placeholder: "_",
		optionalmarker: ["[", "]"],
		quantifiermarker: ["{", "}"],
		groupmarker: ["(", ")"],
		alternatormarker: "|",
		escapeChar: "\\",
		mask: null, //needs tobe null instead of undefined as the extend method does not consider props with the undefined value
		regex: null, //regular expression as a mask
		oncomplete: $.noop, //executes when the mask is complete
		onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
		oncleared: $.noop, //executes when the mask is cleared
		repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
		greedy: false, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
		autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
		removeMaskOnSubmit: false, //remove the mask before submitting the form.
		clearMaskOnLostFocus: true,
		insertMode: true, //insert the input or overwrite the input
		insertModeVisual: true, //show selected caret when insertmode = false
		clearIncomplete: false, //clear the incomplete input on blur
		alias: null,
		onKeyDown: $.noop, //callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
		onBeforeMask: null, //executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
		onBeforePaste: function (pastedValue, opts) {
			return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
		}, //executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
		onBeforeWrite: null, //executes before writing to the masked element. args => event, opts
		onUnMask: null, //executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
		showMaskOnFocus: true, //show the mask-placeholder when the input has focus
		showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
		onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: key, result, opts
		skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
		numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
		rightAlign: false, //align to the right
		undoOnEscape: true, //pressing escape reverts the value to the value before focus
		//numeric basic properties
		radixPoint: "", //".", // | ","
		_radixDance: false, //dance around the radixPoint
		groupSeparator: "", //",", // | "."
		//numeric basic properties
		keepStatic: null, //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible
		positionCaretOnTab: true, //when enabled the caret position is set after the latest valid position on TAB
		tabThrough: false, //allows for tabbing through the different parts of the masked field
		supportsInputType: ["text", "tel", "url", "password", "search"], //list with the supported input types
		//specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
		ignorables: [8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
		isComplete: null, //override for isComplete - args => buffer, opts - return true || false
		preValidation: null, //hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts, maskset, caretPos, strict => return true/false/command object
		postValidation: null, //hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, c, currentResult, opts, maskset, strict => return true/false/json
		staticDefinitionSymbol: undefined, //specify a definitionSymbol for static content, used to make matches for alternators
		jitMasking: false, //just in time masking ~ only mask while typing, can n (number), true or false
		nullable: true, //return nothing instead of the buffertemplate when the user hasn't entered anything.
		inputEventOnly: false, //dev option - testing inputfallback behavior
		noValuePatching: false, //disable value property patching
		positionCaretOnClick: "lvp", //none, lvp (based on the last valid position (default), radixFocus (position caret to radixpoint on initial click), select (select the whole input), ignore (ignore the click and continue the mask)
		casing: null, //mask-level casing. Options: null, "upper", "lower" or "title" or callback args => elem, test, pos, validPositions return charValue
		inputmode: "text", //specify the inputmode
		importDataAttributes: true, //import data-inputmask attributes
		shiftPositions: true //shift position of the mask entries on entry and deletion.
	},
	definitions: {
		"9": { //\uFF11-\uFF19 #1606
			validator: "[0-9\uFF11-\uFF19]",
			definitionSymbol: "*"
		},
		"a": { //\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5 #76
			validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
			definitionSymbol: "*"
		},
		"*": {
			validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]"
		}
	},
	aliases: {}, //aliases definitions
	masksCache: {},
	mask: function (elems) {
		var that = this;
		if (typeof elems === "string") {
			elems = document.getElementById(elems) || document.querySelectorAll(elems);
		}
		elems = elems.nodeName ? [elems] : elems;
		$.each(elems, function (ndx, el) {
			var scopedOpts = $.extend(true, {}, that.opts);
			if (importAttributeOptions(el, scopedOpts, $.extend(true, {}, that.userOptions), that.dataAttribute)) {
				var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
				if (maskset !== undefined) {
					if (el.inputmask !== undefined) {
						el.inputmask.opts.autoUnmask = true; //force autounmasking when remasking
						el.inputmask.remove();
					}
					//store inputmask instance on the input with element reference
					el.inputmask = new Inputmask(undefined, undefined, true);
					el.inputmask.opts = scopedOpts;
					el.inputmask.noMasksCache = that.noMasksCache;
					el.inputmask.userOptions = $.extend(true, {}, that.userOptions);
					el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
					el.inputmask.el = el;
					el.inputmask.maskset = maskset;

					$.data(el, "_inputmask_opts", scopedOpts);

					maskScope.call(el.inputmask, {
						"action": "mask"
					});
				}
			}
		});
		return elems && elems[0] ? (elems[0].inputmask || this) : this;
	},
	option: function (options, noremask) { //set extra options || retrieve value of a current option
		if (typeof options === "string") {
			return this.opts[options];
		} else if (typeof options === "object") {
			$.extend(this.userOptions, options); //user passed options
			//remask
			if (this.el && noremask !== true) {
				this.mask(this.el);
			}
			return this;
		}
	},
	unmaskedvalue: function (value) {
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		return maskScope.call(this, {
			"action": "unmaskedvalue",
			"value": value
		});
	},
	remove: function () {
		return maskScope.call(this, {
			"action": "remove"
		});
	},
	getemptymask: function () { //return the default (empty) mask value, usefull for setting the default value in validation
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		return maskScope.call(this, {
			"action": "getemptymask"
		});
	},
	hasMaskedValue: function () { //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
		return !this.opts.autoUnmask;
	},
	isComplete: function () {
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		return maskScope.call(this, {
			"action": "isComplete"
		});
	},
	getmetadata: function () { //return mask metadata if exists
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		return maskScope.call(this, {
			"action": "getmetadata"
		});
	},
	isValid: function (value) {
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		return maskScope.call(this, {
			"action": "isValid",
			"value": value
		});
	},
	format: function (value, metadata) {
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		return maskScope.call(this, {
			"action": "format",
			"value": value,
			"metadata": metadata //true/false getmetadata
		});
	},
	setValue: function (value) {
		if (this.el) {
			$(this.el).trigger("setvalue", [value]);
		}
	},
	analyseMask: analyseMask
};

function resolveAlias(aliasStr, options, opts) {
	var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
	if (aliasDefinition) {
		if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
		$.extend(true, opts, aliasDefinition); //merge alias definition in the options
		$.extend(true, opts, options); //reapply extra given options
		return true;
	} else //alias not found - try as mask
		if (opts.mask === null) {
			opts.mask = aliasStr;
		}

	return false;
}

function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
	function importOption(option, optionData) {
		optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option);
		if (optionData !== null) {
			if (typeof optionData === "string") {
				if (option.indexOf("on") === 0) {
					optionData = window[optionData];
				}//get function definition
				else if (optionData === "false") {
					optionData = false;
				} else if (optionData === "true") optionData = true;
			}
			userOptions[option] = optionData;
		}
	}

	if (opts.importDataAttributes === true) {
		var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;

		if (attrOptions && attrOptions !== "") {
			attrOptions = attrOptions.replace(/'/g, "\"");
			dataoptions = JSON.parse("{" + attrOptions + "}");
		}

		//resolve aliases
		if (dataoptions) { //pickup alias from dataAttribute
			optionData = undefined;
			for (p in dataoptions) {
				if (p.toLowerCase() === "alias") {
					optionData = dataoptions[p];
					break;
				}
			}
		}
		importOption("alias", optionData); //pickup alias from dataAttribute-alias
		if (userOptions.alias) {
			resolveAlias(userOptions.alias, userOptions, opts);
		}

		for (option in opts) {
			if (dataoptions) {
				optionData = undefined;
				for (p in dataoptions) {
					if (p.toLowerCase() === option.toLowerCase()) {
						optionData = dataoptions[p];
						break;
					}
				}
			}
			importOption(option, optionData);
		}
	}
	$.extend(true, opts, userOptions);

	//handle dir=rtl
	if (npt.dir === "rtl" || opts.rightAlign) {
		npt.style.textAlign = "right";
	}

	if (npt.dir === "rtl" || opts.numericInput) {
		npt.dir = "ltr";
		npt.removeAttribute("dir");
		opts.isRTL = true;
	}

	return Object.keys(userOptions).length;
}

//apply defaults, definitions, aliases
Inputmask.extendDefaults = function (options) {
	$.extend(true, Inputmask.prototype.defaults, options);
};
Inputmask.extendDefinitions = function (definition) {
	$.extend(true, Inputmask.prototype.definitions, definition);
};
Inputmask.extendAliases = function (alias) {
	$.extend(true, Inputmask.prototype.aliases, alias);
};
//static fn on inputmask
Inputmask.format = function (value, options, metadata) {
	return Inputmask(options).format(value, metadata);
};
Inputmask.unmask = function (value, options) {
	return Inputmask(options).unmaskedvalue(value);
};
Inputmask.isValid = function (value, options) {
	return Inputmask(options).isValid(value);
};
Inputmask.remove = function (elems) {
	if (typeof elems === "string") {
		elems = document.getElementById(elems) || document.querySelectorAll(elems);
	}
	elems = elems.nodeName ? [elems] : elems;
	$.each(elems, function (ndx, el) {
		if (el.inputmask) el.inputmask.remove();
	});
};
Inputmask.setValue = function (elems, value) {
	if (typeof elems === "string") {
		elems = document.getElementById(elems) || document.querySelectorAll(elems);
	}
	elems = elems.nodeName ? [elems] : elems;
	$.each(elems, function (ndx, el) {
		if (el.inputmask) el.inputmask.setValue(value); else $(el).trigger("setvalue", [value]);
	});
};
var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
Inputmask.escapeRegex = function (str) {
	return str.replace(escapeRegexRegex, "\\$1");
};

Inputmask.dependencyLib = $;

//make inputmask available
window.Inputmask = Inputmask;
module.exports = Inputmask;
