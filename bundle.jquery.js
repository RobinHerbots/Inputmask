var im = require("./bundle");
var jQuery = require("jquery");
if (im.dependencyLib === jQuery) {
	require("./lib/jquery.inputmask");
}

module.exports = im;

