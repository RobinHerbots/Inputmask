const webpackConfig = require("./webpack.config");
const { execSync } = require("child_process");

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["dist"],
    bump: {
      options: {
        files: ["package.json", "bower.json", "composer.json"],
        updateConfigs: ["pkg"],
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
        src: (function () {
          return "nuspecs/Inputmask.nuspec";
        })(),
        dest: "build/",
        options: {
          version: "<%= pkg.version %>"
        }
      },
      dist2: {
        src: (function () {
          return "nuspecs/jquery.inputmask.nuspec";
        })(),
        dest: "build/",
        options: {
          version: "<%= pkg.version %>"
        }
      }
    },
    nugetpush: {
      dist: {
        src: "build/InputMask.<%= pkg.version %>.nupkg",
        options: {
          source: "https://www.nuget.org"
        }
      },
      dist2: {
        src: "build/jquery.inputMask.<%= pkg.version %>.nupkg",
        options: {
          source: "https://www.nuget.org"
        }
      }
    },
    karma: {
      options: {
        configFile: "karma.conf.js"
      },
      unit: {
        singleRun: true
      }
    },
    eslint: {
      target: "lib/*.js"
    },
    availabletasks: {
      tasks: {
        options: {
          filter: "exclude",
          tasks: ["availabletasks", "default"],
          showTasks: ["user"]
        }
      }
    },
    webpack: {
      main: webpackConfig({ production: true })[0],
      jquery: webpackConfig({ production: true })[1],
      colormask: webpackConfig({ production: true })[2],
      modern: webpackConfig({ production: true })[3],
      test: webpackConfig({ production: true })[4]
    },
    copy: {
      extensions: {
        files: [
          {
            src: "lib/bindings/inputmask.binding.js",
            dest: "dist/bindings/inputmask.binding.js"
          },
          { src: "lib/extensions/colormask.css", dest: "dist/colormask.css" },
          {
            src: "Changelog.md",
            dest: "inputmask-pages/src/assets/Changelog.md"
          }
        ]
      }
    }
  });

  // Load the plugin that provides the tasks.
  require("load-grunt-tasks")(grunt);

  grunt.registerTask("updateYear", function () {
    const year = new Date().getFullYear(),
      readme = grunt.file.read("README.md"),
      updated = readme.replace(
        /Copyright \(c\) 2010 - (?:\{\{year\}\}|\d{4})/,
        `Copyright (c) 2010 - ${year}`
      );
    grunt.file.write("README.md", updated);
    grunt.log.ok("README.md copyright year updated to " + year);
  });

  grunt.registerTask("publish", ["release", "nugetpack", "nugetpush"]);
  grunt.registerTask("publishnext", function () {
    grunt.config("release.options.npmtag", "next");
    grunt.task.run("release");
  });
  grunt.registerTask("types", function () {
    execSync("npm run types", { stdio: "inherit" });
  });
  grunt.registerTask("validate", [
    "webpack",
    "copy",
    "types",
    "eslint",
    "karma"
  ]);
  grunt.registerTask("build", [
    "updateYear",
    "bump:prerelease",
    "clean",
    "webpack",
    "copy",
    "types"
  ]);
  grunt.registerTask("build:patch", [
    "updateYear",
    "bump:patch",
    "clean",
    "webpack",
    "copy",
    "types"
  ]);
  grunt.registerTask("build:minor", [
    "updateYear",
    "bump:minor",
    "clean",
    "webpack",
    "copy",
    "types"
  ]);
  grunt.registerTask("build:major", [
    "updateYear",
    "bump:major",
    "clean",
    "webpack",
    "copy",
    "types"
  ]);
  grunt.registerTask("default", ["availabletasks"]);
};
