export default attach;
/**
 * Attach the element-bound half of the API to an Inputmask class: the
 * instance methods `mask`/`remove` and the statics `remove`/`setValue`.
 * lib/core/inputmask.js itself stays free of DOM references; the public entries
 * (lib/index.js, the bundles) call this once at load time.
 * @param {any} Inputmask
 * @returns {void}
 */
declare function attach(Inputmask: any): void;
