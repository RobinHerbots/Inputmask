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
            wrapAMDLoader(srcFiles[srcNdx], "build/" + dstFile, dstFile.indexOf("extension") == -1 ? ["jquery"] : ["jquery", "./jquery.inputmask"]);
            uglifyConfig[dstFile] = {
                dest: 'dist/inputmask/' + dstFile,
                src: "build/" + dstFile,
                options: { banner: createBanner(dstFile) }
            };
        }

        srcFiles = grunt.file.expand(path + "/*.extensions.js");
        srcFiles.splice(0, 0, "js/jquery.inputmask.js");
        uglifyConfig["inputmaskbundle"] = {
            files: {
                'dist/<%= pkg.name %>.bundle.js': srcFiles
            },
            options: { banner: createBanner('<%= pkg.name %>.bundle') }
        }
        return uglifyConfig;
    }
    function wrapAMDLoader(src, dst, dependencies) {
        function stripClosureExecution() {
            return srcFile.replace(new RegExp("\\(jQuery\\).*$"), "");
        }

        var srcFile = grunt.file.read(src),
            dstContent = "(function (factory) {" +
                "if (typeof define === 'function' && define.amd) {" +
                "define(" + JSON.stringify(dependencies) + ", factory);" +
                "} else {" +
                "factory(jQuery);" +
                "}}" + stripClosureExecution() + ");";
        grunt.file.write(dst, dstContent);
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