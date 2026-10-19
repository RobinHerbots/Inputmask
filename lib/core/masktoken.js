/**
 * A token of a parsed mask tree.
 *
 * @typedef {Object} MaskToken
 * @property {Array<MaskToken | import("./mask-lexer").MaskTest>} matches
 * @property {boolean} openGroup
 * @property {boolean} alternatorGroup
 * @property {boolean} isGroup
 * @property {boolean} isOptional
 * @property {boolean} isQuantifier
 * @property {boolean} isAlternator
 * @property {{ min: number | string; max: number | string; jit?: number | string }} quantifier
 */

export default function (isGroup, isOptional, isQuantifier, isAlternator) {
  this.matches = [];
  this.openGroup = isGroup || false;
  this.alternatorGroup = false;
  this.isGroup = isGroup || false;
  this.isOptional = isOptional || false;
  this.isQuantifier = isQuantifier || false;
  this.isAlternator = isAlternator || false;
  this.quantifier = {
    min: 1,
    max: 1
  };
}
