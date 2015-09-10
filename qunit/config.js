requirejs.config({
	baseUrl: "./",
	paths: {
		"jquery": "../node_modules/jquery/dist/jquery",
		"qunit": "../node_modules/qunitjs/qunit/qunit",
		"dependencyLib": "../dist/inputmask/dependencyLib",
		"inputmask": "../dist/inputmask/inputmask"
	},
	shim: {
		"simulator": {
			deps: [
				"jquery"
			]
		},
		'qunit': {
					exports: 'QUnit',
					init: function() {
							QUnit.config.autoload = false;
							QUnit.config.autostart = false;
					}
			}
	}
});
