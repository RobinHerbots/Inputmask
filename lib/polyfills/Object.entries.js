const reduce = Function.bind.call(Function.call, Array.prototype.reduce),
  isEnumerable = Function.bind.call(
    Function.call,
    Object.prototype.propertyIsEnumerable
  ),
  concat = Function.bind.call(Function.call, Array.prototype.concat),
  keys = Object.keys;

if (!Object.entries) {
  Object.entries = function entries(O) {
    return reduce(
      keys(O),
      (e, k) =>
        concat(
          e,
          typeof k === "string" && isEnumerable(O, k) ? [[k, O[k]]] : []
        ),
      []
    );
  };
}
