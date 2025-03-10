const Inputmask = require("./dist/inputmask").default,
  im = Inputmask.format("abcdef", { mask: "aa-aa-aa" });
console.log(im);
