import $ from "../dependencyLibs/inputmask.dependencyLib";

const aliases = {},
  masksCache = {};

// resolve a plain alias name (or an alias chain) into concrete mask options;
// used by the instance constructor and by the data-attribute option import
function resolveAlias(aliasStr, options, opts) {
  const aliasDefinition = aliases[aliasStr];
  if (aliasDefinition) {
    if (aliasDefinition.alias)
      resolveAlias(aliasDefinition.alias, undefined, opts); // alias is another alias
    $.extend(true, opts, aliasDefinition); // merge alias definition in the options
    $.extend(true, opts, options); // reapply extra given options
    return true;
  } // alias not found => treat as mask
  else if (opts.mask === null) {
    opts.mask = aliasStr;
  }

  return false;
}

export { aliases, masksCache, resolveAlias };
