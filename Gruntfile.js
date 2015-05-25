module.exports = function(grunt) {
  function createBanner(fileName) {
    return '/*!\n' +
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
      var dstFile = srcFiles[srcNdx].replace("js/", ""),
        dstFileMin = dstFile.replace(".js", ".min.js");
      wrapModuleLoaders(srcFiles[srcNdx], "build/" + dstFile, dstFile.indexOf("jquery") == -1 ?
        (dstFile.indexOf("extension") == -1 ? ["jquery"] : ["jquery", "./inputmask"]) : ["jquery", "./inputmask"]);
      uglifyConfig[dstFile] = {
        dest: 'dist/inputmask/' + dstFile,
        src: "build/" + dstFile,
        options: {
          banner: createBanner(dstFile),
          beautify: true,
          mangle: false,
          preserveComments: "some",
          ASCIIOnly: true
        }
      };
      uglifyConfig[dstFileMin] = {
        dest: 'dist/inputmask/' + dstFileMin,
        src: "build/" + dstFile,
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
        'dist/<%= pkg.name %>.bundle.min.js': srcFiles
      },
      options: {
        banner: createBanner('<%= pkg.name %>.bundle'),
        preserveComments: "some",
        ASCIIOnly: true
      }
    }
    return uglifyConfig;
  }

  function wrapModuleLoaders(src, dst, dependencies) {
    function stripClosureExecution() {
      return srcFile.replace(new RegExp("\\(jQuery\\)[\\s\\S]*$"), "");
    }

    function createCommonJsRequires(dependencies) {
      var res = [];

      dependencies.forEach(function(dep) {
        res.push("require('" + dep + "')");
      });

      return res.join(", ");
    }

    var srcFile = grunt.file.read(src),
      dstContent = "(function (factory) {" +
      "if (typeof define === 'function' && define.amd) {" +
      "define(" + JSON.stringify(dependencies) + ", factory);" +
      "} else if (typeof exports === 'object') {" +
      "module.exports = factory(" + createCommonJsRequires(dependencies) + ");" +
      "} else {" +
      "factory(jQuery);" +
      "}}\n" + stripClosureExecution() + ");";
    grunt.file.write(dst, dstContent);
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: createUglifyConfig("js"),
    clean: ["dist"],
    qunit: {
      files: ['qunit/qunit.html']
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
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-nuget');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('publish:patch', ['clean', 'bump:patch', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
  grunt.registerTask('publish:minor', ['clean', 'bump:minor', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);
  grunt.registerTask('publish:major', ['clean', 'bump:major', 'uglify', 'shell:gitcommitchanges', 'release', 'nugetpack', 'nugetpush']);

  // Default task(s).
  grunt.registerTask('default', ['bump:prerelease', 'clean', 'uglify']);

};
