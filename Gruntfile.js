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

    function createUglifyConfig(path) {
        var uglifyConfig = {};
        var srcFiles = grunt.file.expand(path + "/*.js");
        for (var srcNdx in srcFiles) {
            var dstFile = srcFiles[srcNdx].replace("js/", "");
            uglifyConfig[dstFile] = {
                dest: 'dist/inputmask/' + dstFile,
                src: srcFiles[srcNdx],
                options: { banner: createBanner(dstFile) }
            };
        }
        uglifyConfig["inputmaskbundle"] = {
            files: {
                'dist/<%= pkg.name %>.bundle.js': srcFiles
            },
            options: { banner: createBanner('<%= pkg.name %>.bundle') }
        }
        return uglifyConfig;
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: createUglifyConfig("js"),
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