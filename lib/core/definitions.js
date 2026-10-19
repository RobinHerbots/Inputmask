// Placeholder of the prototype definitions below. A regex mask has no
// definition to inherit it from, so the lexer falls back to this one.
export const DEFAULT_PLACEHOLDER = "_";

export default {
  9: {
    validator: "\\p{N}",
    definitionSymbol: "*",
    placeholder: "_"
  },
  a: {
    validator: "\\p{L}",
    definitionSymbol: "*",
    placeholder: "_"
  },
  "*": {
    validator: "[\\p{L}\\p{N}]",
    placeholder: "_"
  }
};
