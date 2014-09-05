module.exports = function (grunt) {
    function createBanner(fileName) {
        return '/*\n' +
            '* ' + fileName + '\n' +
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
            "inputmask": {
                dest: 'dist/inputmask/<%= pkg.name %>.js',
                src: 'js/<%= pkg.name %>.js',
                options: { banner: createBanner('<%= pkg.name %>') }
            },
            "inputmask.extensions": {
                dest: 'dist/inputmask/<%= pkg.name %>.extensions.js',
                src: 'js/<%= pkg.name %>.extensions.js',
                options: { banner: createBanner('<%= pkg.name %>.extensions') }
            },
            "inputmask.date.extensions": {
                dest: 'dist/inputmask/<%= pkg.name %>.date.extensions.js',
                src: 'js/<%= pkg.name %>.date.extensions.js',
                options: { banner: createBanner('<%= pkg.name %>.date.extensions') }
            },
            "inputmask.numeric.extensions": {
                dest: 'dist/inputmask/<%= pkg.name %>.numeric.extensions.js',
                src: 'js/<%= pkg.name %>.numeric.extensions.js',
                options: { banner: createBanner('<%= pkg.name %>.numeric.extensions') }
            },
            "inputmask.phone.extensions": {
                dest: 'dist/inputmask/<%= pkg.name %>.phone.extensions.js',
                src: 'js/<%= pkg.name %>.phone.extensions.js',
                options: { banner: createBanner('<%= pkg.name %>.phone.extensions') }
            },
            "inputmask.regex.extensions": {
                dest: 'dist/inputmask/<%= pkg.name %>.regex.extensions.js',
                src: 'js/<%= pkg.name %>.regex.extensions.js',
                options: { banner: createBanner('<%= pkg.name %>.regex.extensions') }
            },
            "inputmaskbundle": {
                files: {
                    'dist/<%= pkg.name %>.bundle.js': [
                        'js/<%= pkg.name %>.js',
                        'js/<%= pkg.name %>.extensions.js',
                        'js/<%= pkg.name %>.date.extensions.js',
                        'js/<%= pkg.name %>.numeric.extensions.js',
                        'js/<%= pkg.name %>.phone.extensions.js',
                        'js/<%= pkg.name %>.regex.extensions.js'
                    ]
                },
                options: { banner: createBanner('<%= pkg.name %>.bundle') }
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