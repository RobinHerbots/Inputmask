/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */
import "./getPrototypeOf";
import {mask} from "./mask";
import $ from "./dependencyLibs/inputmask.dependencyLib";
import window from "./global/window";
import {generateMaskSet, analyseMask} from "./mask-lexer";
import {getMaskTemplate} from "./validation-tests";
import {determineLastRequiredPosition, getBuffer, getBufferTemplate, isMask} from "./positioning";
import {isComplete} from "./validation";
import {checkVal, unmaskedvalue} from "./inputHandling";
import {EventRuler} from "./eventruler";
import definitions from "./definitions";
import defaults from "./defaults";

const document = window.document, dataKey = "_inputmask_opts";

function Inputmask(alias, options, internal) {
	//allow instanciating without new
	if (!(this instanceof Inputmask)) {
		return new Inputmask(alias, options, internal);
	}

	this.dependencyLib = $;
	this.el = undefined;
	this.events = {};
	this.maskset = undefined;

	if (internal !== true) {
		//init options
		if (Object.prototype.toString.call(alias) === "[object Object]") {
			options = alias;
		} else {
			options = options || {};
			if (alias) options.alias = alias;
		}
		this.opts = $.extend(true, {}, this.defaults, options);
		this.noMasksCache = options && options.definitions !== undefined;
		this.userOptions = options || {}; //user passed options
		resolveAlias(this.opts.alias, options, this.opts);
	}

	//maskscope properties
	this.refreshValue = false; //indicate a refresh from the inputvalue is needed (form.reset)
	this.undoValue = undefined;
	this.$el = undefined;
	this.skipKeyPressEvent = false; //Safari 5.1.x - modal dialog fires keypress twice workaround
	this.skipInputEvent = false; //skip when triggered from within inputmask
	this.validationEvent = false;
	this.ignorable = false;
	this.maxLength;
	this.mouseEnter = false;
	this.originalPlaceholder = undefined; //needed for FF
	this.isComposing = false; //keydowncode == 229  compositionevent fallback
}

Inputmask.prototype = {
	dataAttribute: "data-inputmask", //data attribute prefix used for attribute binding
	//options default
	defaults: defaults,
	definitions: definitions,
	aliases: {}, //aliases definitions
	masksCache: {},
	get isRTL() {
		return this.opts.isRTL || this.opts.numericInput;
	},
	mask: function (elems) {
		var that = this;
		if (typeof elems === "string") {
			elems = document.getElementById(elems) || document.querySelectorAll(elems);
		}
		elems = elems.nodeName ? [elems] : elems;
		elems.forEach(function (el, ndx) {
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
					// el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
					el.inputmask.el = el;
					el.inputmask.$el = $(el);
					el.inputmask.maskset = maskset;

					$.data(el, dataKey, that.userOptions);
					mask.call(el.inputmask);
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
		if (this.el === undefined || value !== undefined) {
			var valueBuffer = (typeof this.opts.onBeforeMask === "function" ? (this.opts.onBeforeMask.call(this, value, this.opts) || value) : value).split("");
			checkVal.call(this, undefined, false, false, valueBuffer);
			if (typeof this.opts.onBeforeWrite === "function") this.opts.onBeforeWrite.call(this, undefined, getBuffer.call(this), 0, this.opts);
		}
		return unmaskedvalue.call(this, this.el);
	},
	remove: function () {
		if (this.el) {
			$.data(this.el, dataKey, null); //invalidate
			//writeout the value
			var cv = this.opts.autoUnmask ? unmaskedvalue(this.el) : this._valueGet(this.opts.autoUnmask);
			if (cv !== getBufferTemplate.call(this).join("")) this._valueSet(cv, this.opts.autoUnmask); else this._valueSet("");
			//unbind all events
			EventRuler.off(this.el);

			//restore the value property
			var valueProperty;
			if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
				valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value");
				if (valueProperty) {
					if (this.__valueGet) {
						Object.defineProperty(this.el, "value", {
							get: this.__valueGet,
							set: this.__valueSet,
							configurable: true
						});
					}
				}
			} else if (document.__lookupGetter__ && this.el.__lookupGetter__("value")) {
				if (this.__valueGet) {
					this.el.__defineGetter__("value", this.__valueGet);
					this.el.__defineSetter__("value", this.__valueSet);
				}
			}
			//clear data
			this.el.inputmask = undefined;
		}
		return this.el;
	},
	getemptymask: function () { //return the default (empty) mask value, usefull for setting the default value in validation
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		return getBufferTemplate.call(this).join("");
	},
	hasMaskedValue: function () { //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
		return !this.opts.autoUnmask;
	},
	isComplete: function () {
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		return isComplete.call(this, getBuffer.call(this));
	},
	getmetadata: function () { //return mask metadata if exists
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		if (Array.isArray(this.maskset.metadata)) {
			var maskTarget = getMaskTemplate.call(this, true, 0, false).join("");
			this.maskset.metadata.forEach(function (mtdt) {
				if (mtdt.mask === maskTarget) {
					maskTarget = mtdt;
					return false;
				}

				return true;
			});
			return maskTarget;
		}
		return this.maskset.metadata;
	},
	isValid: function (value) {
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		if (value) {
			var valueBuffer = (typeof this.opts.onBeforeMask === "function" ? (this.opts.onBeforeMask.call(this, value, this.opts) || value) : value).split("");
			checkVal.call(this, undefined, true, false, valueBuffer);
		} else {
			value = this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join("");
		}
		var buffer = getBuffer.call(this);
		var rl = determineLastRequiredPosition.call(this),
			lmib = buffer.length - 1;
		for (; lmib > rl; lmib--) {
			if (isMask.call(this, lmib)) break;
		}
		buffer.splice(rl, lmib + 1 - rl);

		return isComplete.call(this, buffer) && value === (this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join(""));

	},
	format: function (value, metadata) {
		this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
		let valueBuffer = (typeof this.opts.onBeforeMask === "function" ? (this.opts.onBeforeMask.call(this, value, this.opts) || value) : value).split("");
		checkVal.call(this, undefined, true, false, valueBuffer);
		let formattedValue = this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join("");
		return metadata ? {
			value: formattedValue,
			metadata: this.getmetadata()
		} : formattedValue;
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
		const attrOption = dataAttribute === "" ? option : dataAttribute + "-" + option;
		optionData = optionData !== undefined ? optionData : npt.getAttribute(attrOption);
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
	elems.forEach(function (el) {
		if (el.inputmask) el.inputmask.remove();
	});
};
Inputmask.setValue = function (elems, value) {
	if (typeof elems === "string") {
		elems = document.getElementById(elems) || document.querySelectorAll(elems);
	}
	elems = elems.nodeName ? [elems] : elems;
	elems.forEach(function (el) {
		if (el.inputmask) el.inputmask.setValue(value); else $(el).trigger("setvalue", [value]);
	});
};

Inputmask.dependencyLib = $;

//make inputmask available
window.Inputmask = Inputmask;
export default Inputmask;
