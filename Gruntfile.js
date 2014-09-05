module.exports = function (grunt) {
    function createBanner() {
        return '/*\n' +
            '* <%= pkg.name %>\n' +
            '* http://github.com/RobinHerbots/jquery.inputmask\n' +
            '* Copyright (c) 2010 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            '* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)\n' +
            '* Version: <%= pkg.version %>\n' +
            '*/\n';
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: createBanner()
            },
            inputmask: {
                files: {
                    'dist/inputmask/<%= pkg.name %>.js': 'js/<%= pkg.name %>.js',
                    'dist/inputmask/<%= pkg.name %>.extensions.js': 'js/<%= pkg.name %>.extensions.js',
                    'dist/inputmask/<%= pkg.name %>.date.extensions.js': 'js/<%= pkg.name %>.date.extensions.js',
                    'dist/inputmask/<%= pkg.name %>.numeric.extensions.js': 'js/<%= pkg.name %>.numeric.extensions.js',
                    'dist/inputmask/<%= pkg.name %>.phone.extensions.js': 'js/<%= pkg.name %>.phone.extensions.js',
                    'dist/inputmask/<%= pkg.name %>.regex.extensions.js': 'js/<%= pkg.name %>.regex.extensions.js',
                }
            },
            inputmaskbundle: {
                files: {
                    'dist/<%= pkg.name %>.bundle.js': [
                        'js/<%= pkg.name %>.js',
                        'js/<%= pkg.name %>.extensions.js',
                        'js/<%= pkg.name %>.date.extensions.js',
                        'js/<%= pkg.name %>.numeric.extensions.js',
                        'js/<%= pkg.name %>.phone.extensions.js',
                        'js/<%= pkg.name %>.regex.extensions.js'
                    ]
                }
            }
        },
        clean: ["dist"],
        qunit: {
            files: ['qunit/qunit.html']
        }
    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'uglify']);

};