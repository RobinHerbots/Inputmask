module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          name: 'jquery.inputmask',
          paths: {
            jquery: 'empty:'
          },
          include: [
            'jquery.inputmask.extensions',
            'jquery.inputmask.date.extensions',
            'jquery.inputmask.numeric.extensions',
            'jquery.inputmask.regex.extensions',
            'jquery.inputmask.phone.extensions'
          ],
          baseUrl: 'js',
          out: 'dist/jquery.inputmask.amdbundle.js',
          optimize: 'none',
          onModuleBundleComplete: function (data) {
            var fs = require('fs'),
              amdclean = require('amdclean'),
              outputFile = data.path;

            fs.writeFileSync(outputFile, amdclean.clean({
              filePath: outputFile,
              transformAMDChecks: false
            }));
          }
        }
      }
    },
    qunit: {
      files: ['qunit/qunit.html']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('build', ['requirejs']);
  grunt.registerTask('default', ['test', 'build']);
};
