module.exports = function (grunt) {
	function createBanner(fileName) {
		return "/*!\n" +
			"* " + fileName + "\n" +
			"* <%= pkg.homepage %>\n" +
			"* Copyright (c) 2010 - <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
			"* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)\n" +
			"* Version: <%= pkg.version %>\n" +
			"*/\n";
	}

	function createUglifyConfig(path) {
		function stripModuleLoaders(src, dst) {
			var srcFile = grunt.file.read(src);
			srcFile = srcFile.replace(new RegExp("\\(function\\s?\\(factory\\)[\\s\\S]*\\(function\\s?\\(\\$"), "(function ($");
			if (src.indexOf("extensions") === -1 && src.indexOf("jquery.inputmask") === -1) {
				srcFile = srcFile.replace(new RegExp("\\}\\)\\);[\\s]*$"), "})(jQuery);");
			} else srcFile = srcFile.replace(new RegExp("\\}\\)\\);[\\s]*$"), "})(jQuery, Inputmask);");
			grunt.file.write(dst, srcFile);
		}

		var uglifyConfig = {};
		var srcFiles = grunt.file.expand(path + "/*.js");
		for (var srcNdx in srcFiles) {
			var dstFile = srcFiles[srcNdx].replace("js/", ""),
				dstFileMin = dstFile.replace(".js", ".min.js");
			uglifyConfig[dstFile] = {
				dest: 'dist/inputmask/' + dstFile,
				src: srcFiles[srcNdx],
				options: {
					banner: createBanner(dstFile),
					beautify: true,
					mangle: false,
					preserveComments: false,
					ASCIIOnly: true
				}
			};
			uglifyConfig[dstFileMin] = {
				dest: "dist/min/inputmask/" + dstFileMin,
				src: srcFiles[srcNdx],
				options: {
					banner: createBanner(dstFileMin),
					preserveComments: "some",
					ASCIIOnly: true
				}
			};

			stripModuleLoaders("js/" + dstFile, "build/" + dstFile);
		}
		srcFiles = grunt.file.expand("build/*.extensions.js");
		srcFiles.splice(0, 0, "build/jquery.inputmask.js");
		srcFiles.splice(0, 0, "build/inputmask.js");
		uglifyConfig["bundle"] = {
			dest: "dist/jquery.inputmask.bundle.js",
			src: srcFiles,
			options: {
				banner: createBanner("jquery.inputmask.bundle.js"),
				beautify: true,
				mangle: false,
				preserveComments: false,
				ASCIIOnly: true
			}
		};
		uglifyConfig["bundlemin"] = {
			dest: "dist/min/jquery.inputmask.bundle.min.js",
			src: srcFiles,
			options: {
				banner: createBanner("jquery.inputmask.bundle.js"),
				preserveComments: "some",
				ASCIIOnly: true
			}
		};

		return uglifyConfig;
	}

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: createUglifyConfig("js"),
		clean: ["dist"],
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			unit: {
				runnerPort: 9999,
				singleRun: true,
				browsers: ["Chrome"], //will later add extra test targets
				logLevel: 'ERROR'
			}
		},
		bump: {
			options: {
				files: ['package.json', 'bower.json', 'composer.json', 'component.json'],
				updateConfigs: ['pkg'],
				commit: false,
				createTag: false,
				push: false
			}
		},
		release: {
			options: {
				bump: false,
				commitMessage: 'jquery.inputmask <%= version %>'
			}
		},
		nugetpack: {
			dist: {
				src: function () {
					return process.platform === "linux" ? 'nuspecs/jquery.inputmask.linux.nuspec' : 'nuspecs/jquery.inputmask.nuspec';
				}(),
				dest: 'dist/',
				options: {
					version: '<%= pkg.version %>'
				}
			}
		},
		nugetpush: {
			dist: {
				src: 'dist/jQuery.InputMask.<%= pkg.version %>.nupkg',
				options: {
					source: "https://www.nuget.org"
				}
			}
		},
		shell: {
			options: {
				stderr: false
			},
			gitcommitchanges: {
				command: ['git add .',
					'git reset -- package.json',
					'git commit -m "jquery.inputmask <%= pkg.version %>"'
				].join('&&')
			}
		},
		eslint: {
			target: "{extra/*,js}/*.js"
		},
		availabletasks: {
			tasks: {
				options: {
					filter: 'exclude',
					tasks: ['availabletasks', 'default'],
					showTasks: ['user']
				}
			}
		},
		browserify: {
			dist: {
				dest: 'build/browserify.bundle.js',
				src: [],
				options: {
					require: ["./"]
				}
			}
		}
	});

	// Load the plugin that provides the tasks.
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('publish:patch', ['clean', 'bump:patch', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
	grunt.registerTask('publish:minor', ['clean', 'bump:minor', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
	grunt.registerTask('publish:major', ['clean', 'bump:major', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
	grunt.registerTask('validate', ['eslint', 'browserify', 'karma']);
	grunt.registerTask('build', ['bump:prerelease', 'clean', 'uglify']);
	grunt.registerTask('default', ["availabletasks"]);

};
