var webpackConfig = require("./webpack.config");

module.exports = function (grunt) {
// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: ["dist"],
		bump: {
			options: {
				files: ["package.json", "bower.json", "composer.json"],
				updateConfigs: ["pkg"],
				commit: false,
				createTag: false,
				push: false,
				prereleaseName: "beta"
			}
		},
		release: {
			options: {
				bump: false,
				commit: false,
				add: false
			}
		},
		nugetpack: {
			dist: {
				src: function () {
					return "nuspecs/Inputmask.nuspec";
				}(),
				dest: "build/",
				options: {
					version: "<%= pkg.version %>"
				}
			},
			dist2: {
				src: function () {
					return "nuspecs/jquery.inputmask.nuspec";
				}(),
				dest: "build/",
				options: {
					version: "<%= pkg.version %>"
				}
			}
		},
		nugetpush: {
			dist: {
				src: "build/InputMask.<%= pkg.version %>.nupkg",
				options: {
					source: "https://www.nuget.org"
				}
			},
			dist2: {
				src: "build/jquery.inputMask.<%= pkg.version %>.nupkg",
				options: {
					source: "https://www.nuget.org"
				}
			}
		},
		eslint: {
			target: "lib/*.js"
		},
		availabletasks: {
			tasks: {
				options: {
					filter: "exclude",
					tasks: ["availabletasks", "default"],
					showTasks: ["user"]
				}
			}
		},
		webpack: {
			main: webpackConfig("production")[0],
			jquery: webpackConfig("production")[1]
		},
		copy: {
			extensions: {
				files: [
					{src: "lib/bindings/inputmask.binding.js", dest: "dist/bindings/inputmask.binding.js"},
					{src: "lib/bindings/inputmask.es6.js", dest: "dist/inputmask.es6.js"}
				]
			}
		}
	});

	// Load the plugin that provides the tasks.
	require("load-grunt-tasks")(grunt);

	grunt.registerTask("publish", ["release", "nugetpack", "nugetpush"]);
	grunt.registerTask("publishnext", function () {
		grunt.config("release.options.npmtag", "next");
		grunt.task.run("release");
	});
	grunt.registerTask("validate", ["webpack", "copy", "eslint"]);
	grunt.registerTask("build", ["bump:prerelease", "clean", "webpack", "copy"]);
	grunt.registerTask("build:patch", ["bump:patch", "clean", "webpack", "copy"]);
	grunt.registerTask("build:minor", ["bump:minor", "clean", "webpack", "copy"]);
	grunt.registerTask("build:major", ["bump:major", "clean", "webpack", "copy"]);
	grunt.registerTask("default", ["availabletasks"]);
};
