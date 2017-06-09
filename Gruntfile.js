const webpackConfig = require('./webpack.config');
const qunitWebpackConfig = require('./qunit/webpack.config');

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
        var uglifyConfig = {};
        var srcFiles = grunt.file.expand(path + "/**/*.js");
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
                    preserveComments: false,
                    ASCIIOnly: true
                }
            };
        }

        uglifyConfig["bundle"] = {
            dest: "dist/jquery.inputmask.bundle.js",
            src: "build/bundle.js",
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
            src: "build/bundle.js",
            options: {
                banner: createBanner("jquery.inputmask.bundle.js"),
                preserveComments: false,
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
                commitMessage: 'Inputmask <%= version %>'
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
        shell: {
            options: {
                stderr: false
            },
            gitcommitchanges: {
                command: ['git add .',
                    'git reset -- package.json',
                    'git commit -m "Inputmask <%= pkg.version %>"'
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
                    tasks: ['availabletasks', 'default', 'updateDistConfig'],
                    showTasks: ['user']
                }
            }
        },
        webpack: {
            build: webpackConfig,
            qunit: qunitWebpackConfig
        }
    });

// Load the plugin that provides the tasks.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('publish:patch', ['clean', 'bump:patch', 'webpack:build', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('publish:minor', ['clean', 'bump:minor', 'webpack:build', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('publish:major', ['clean', 'bump:major', 'webpack:build', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('validate', ['webpack:qunit', 'eslint', 'karma']);
    grunt.registerTask('build', ['bump:prerelease', 'clean', 'webpack:build', 'uglify']);
    grunt.registerTask('default', ["availabletasks"]);
};
