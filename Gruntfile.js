const webpackConfig = require('./webpack.config');
const webpackJqueryConfig = require('./webpack.jqueryconfig');

module.exports = function (grunt) {
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: ["dist"],
        bump: {
            options: {
                files: ['package.json', 'bower.json', 'composer.json'],
                updateConfigs: ['pkg'],
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
                    return 'nuspecs/Inputmask.nuspec';
                }(),
                dest: 'build/',
                options: {
                    version: '<%= pkg.version %>'
                }
            },
            dist2: {
                src: function () {
                    return 'nuspecs/jquery.inputmask.nuspec';
                }(),
                dest: 'build/',
                options: {
                    version: '<%= pkg.version %>'
                }
            }
        },
        nugetpush: {
            dist: {
                src: 'build/InputMask.<%= pkg.version %>.nupkg',
                options: {
                    source: "https://www.nuget.org"
                }
            },
            dist2: {
                src: 'build/jquery.inputMask.<%= pkg.version %>.nupkg',
                options: {
                    source: "https://www.nuget.org"
                }
            }
        },
        eslint: {
            target: "{extra/*,js}/*.js"
        },
        availabletasks: {
            tasks: {
                options: {
                    filter: 'exclude',
                    tasks: ['availabletasks', 'default', 'updateDistConfig'],
                    showTasks: ['user']
                }
            }
        },
        webpack: {
            main: webpackConfig,
            jquery: webpackJqueryConfig
        },
        copy: {
            extensions: {
                files: [
                    {src: 'lib/inputmask.extensions.js', dest: 'dist/inputmask/inputmask.extensions.js'},
                    {src: 'lib/inputmask.date.extensions.js', dest: 'dist/inputmask/inputmask.date.extensions.js'},
                    {src: 'lib/inputmask.numeric.extensions.js', dest: 'dist/inputmask/inputmask.numeric.extensions.js'}
                ]
            }
        }
    });

// Load the plugin that provides the tasks.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('publish', ['release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('publishnext', function () {
        grunt.config('release.options.npmtag', "next");
        grunt.task.run('release');
    });
    grunt.registerTask('validate', ['webpack', 'copy', 'eslint']);
    grunt.registerTask('build', ['bump:prerelease', 'clean', 'webpack', 'copy']);
    grunt.registerTask('build:patch', ['bump:patch', 'clean', 'webpack', 'copy']);
    grunt.registerTask('build:minor', ['bump:minor', 'clean', 'webpack', 'copy']);
    grunt.registerTask('build:major', ['bump:major', 'clean', 'webpack', 'copy']);
    grunt.registerTask('default', ["availabletasks"]);
};
