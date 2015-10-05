requirejs.config({
	baseUrl: "./",
	paths: {
		"jquery": "../node_modules/jquery/dist/jquery",
		"jbone": "../node_modules/jbone/dist/jbone",
		"jqlite": "../node_modules/jqlite/jqlite",
		"zepto": "../node_modules/zepto-component/zepto",
		"zepto_event": "../node_modules/zepto-component/src/event",
		"zepto_data": "../node_modules/zepto-component/src/data",
		"qunit": "../node_modules/qunitjs/qunit/qunit",
		"inputmask.dependencyLib": "../dist/inputmask/inputmask.dependencyLib.jquery",
		// "inputmask.dependencyLib": "../extra/dependencyLibs/inputmask.dependencyLib",
		// "inputmask.dependencyLib": "../extra/dependencyLibs/inputmask.dependencyLib.jqlite",
		"inputmask": "../dist/inputmask/inputmask"
	},
	shim: {
		'qunit': {
			exports: 'QUnit',
			init: function() {
				QUnit.config.autoload = false;
				QUnit.config.autostart = false;
			}
		}
	}
});
