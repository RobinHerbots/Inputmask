module.exports = function(grunt) {
	function createBanner(fileName) {
		return "/*!\n" +
			"* " + fileName + "\n" +
			"* http://github.com/RobinHerbots/jquery.inputmask\n" +
			"* Copyright (c) 2010 - <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
			"* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)\n" +
			"* Version: <%= pkg.version %>\n" +
			"*/\n";
	}

	function createUglifyConfig(path) {
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
					preserveComments: "some",
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
		}

		srcFiles = grunt.file.expand(path + "/*.extensions.js");
		srcFiles.splice(0, 0, "js/jquery.inputmask.js");
		srcFiles.splice(0, 0, "js/inputmask.js");
		srcFiles.splice(0, 0, "js/dependencyLib.js");
		uglifyConfig["inputmaskbundle"] = {
			files: {
				'dist/<%= pkg.name %>.bundle.js': srcFiles
			},
			options: {
				banner: createBanner('<%= pkg.name %>.bundle'),
				beautify: true,
				mangle: false,
				preserveComments: "some",
				ASCIIOnly: true
			}
		}
		uglifyConfig["inputmaskbundlemin"] = {
			files: {
				'dist/min/<%= pkg.name %>.bundle.min.js': srcFiles
			},
			options: {
				banner: createBanner('<%= pkg.name %>.bundle'),
				preserveComments: "some",
				ASCIIOnly: true
			}
		}
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
				src: function() {
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
				src: 'dist/jQuery.InputMask.<%= pkg.version %>.nupkg'
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
			target: grunt.file.expand("js/*.js")
		},
		availabletasks: {
			tasks: {
				options: {
					filter: 'exclude',
					tasks: ['availabletasks', 'default'],
					showTasks: ['user']
				}
			}
		}
	});

	// Load the plugin that provides the tasks.
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('publish:patch', ['clean', 'bump:patch', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
	grunt.registerTask('publish:minor', ['clean', 'bump:minor', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
	grunt.registerTask('publish:major', ['clean', 'bump:major', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
	grunt.registerTask('validate', ['eslint', 'karma']);
	grunt.registerTask('build', ['bump:prerelease', 'clean', 'uglify']);
	grunt.registerTask('default', ["availabletasks"]);

};
