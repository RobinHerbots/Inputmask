define([
	"qunit",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../dist/inputmask/inputmask.regex.extensions",
	"prototypeExtensions",
	"simulator"
], function(qunit) {
	// start QUnit.
	qunit.load();
	qunit.start();

	require([
		"tests_base",
		"tests_setvalue",
		"tests_paste",
		"tests_initialvalue",
		"tests_date",
		"tests_dynamic",
		"tests_formatvalidate",
		"tests_ip",
		"tests_keepStatic",
		"tests_multi",
		"tests_numeric",
		"tests_numericinput",
		"tests_optional",
		"tests_phone",
		"tests_regex", "tests_escape"
	]);


});
