var im = require("./bundle");
var dependencyLib = require("./lib/dependencyLibs/inputmask.dependencyLib");
var jQuery = require("jquery");
if (dependencyLib === jQuery) {
    require("./lib/jquery.inputmask");
}

module.exports = im;

