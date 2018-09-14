const webpackConfig = require('./webpack.config');
const buildWebpackConfig = require('./webpackbuild.config');
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
                    compress: false,
                    output: {
                        ascii_only : true,
                        comments: false
                    }
                }
            };
            uglifyConfig[dstFileMin] = {
                dest: "dist/min/inputmask/" + dstFileMin,
                src: srcFiles[srcNdx],
                options: {
                    banner: createBanner(dstFileMin),
                    mangle: false,
                    compress: false,
                    output: {
                        ascii_only : true,
                        comments: false
                    }
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
                compress: false,
                output: {
                    ascii_only : true,
                    comments: false
                }
            }
        };
        uglifyConfig["bundlemin"] = {
            dest: "dist/min/jquery.inputmask.bundle.min.js",
            src: "build/bundle.js",
            options: {
                banner: createBanner("jquery.inputmask.bundle.js"),
                mangle: false,
                compress: false,
                output: {
                    ascii_only : true,
                    comments: false
                }
            }
        };

        return uglifyConfig;
    }

// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: createUglifyConfig("js"),
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
            build: buildWebpackConfig,
            qunit: qunitWebpackConfig
        }
    });

// Load the plugin that provides the tasks.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('publish', ['release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('publishnext', function () {
        grunt.config('release.options.npmtag', "next");
        grunt.task.run('release');
    });
    grunt.registerTask('validate', ['webpack:qunit', 'eslint']);
    grunt.registerTask('build', ['bump:prerelease', 'clean', 'webpack:build', 'uglify']);
    grunt.registerTask('build:patch', ['bump:patch', 'clean', 'webpack:build', 'uglify']);
    grunt.registerTask('build:minor', ['bump:minor', 'clean', 'webpack:build', 'uglify']);
    grunt.registerTask('build:major', ['bump:major', 'clean', 'webpack:build', 'uglify']);
    grunt.registerTask('default', ["availabletasks"]);
};
