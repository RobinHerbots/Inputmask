const { execSync } = require("child_process"),
  webpackConfig = require("./webpack.config");

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

  // The NuGet packages are built with the dotnet SDK, so packaging works on any
  // platform and no longer depends on the legacy Windows-only nuget.exe.  The
  // metadata stays in the nuspecs, nuspecs/Pack.csproj only drives "dotnet
  // pack" for both of them.
  const nugetPackages = ["Inputmask.nuspec", "jquery.inputmask.nuspec"],
    nugetSource =
      process.env.NUGET_SOURCE || "https://api.nuget.org/v3/index.json",
    nugetApiKey = process.env.NUGET_API_KEY;

  grunt.registerTask("nugetpack", function () {
    const version = grunt.config("pkg").version;
    nugetPackages.forEach(function (nuspec) {
      grunt.log.ok("Packing " + nuspec);
      execSync(
        `dotnet pack nuspecs/Pack.csproj -c Release -p:Version=${version} -p:NuspecFile=${nuspec} -o build`,
        { stdio: "inherit" }
      );
    });
  });

  grunt.registerTask("nugetpush", function () {
    if (!nugetApiKey) {
      grunt.fail.fatal(
        "NUGET_API_KEY is not set - create an api key on nuget.org and expose it as NUGET_API_KEY"
      );
    }
    const version = grunt.config("pkg").version,
      // the package id decides the file name, so match on the version instead
      // of hardcoding the ids
      packages = grunt.file
        .expand("build/*.nupkg")
        .filter((nupkg) => nupkg.endsWith("." + version + ".nupkg"));
    if (packages.length !== nugetPackages.length) {
      grunt.fail.fatal(
        `expected ${nugetPackages.length} package(s) for version ${version} in build/, found ${packages.length} - run "grunt nugetpack" first`
      );
    }
    packages.forEach(function (nupkg) {
      grunt.log.ok("Pushing " + nupkg);
      execSync(
        `dotnet nuget push "${nupkg}" --source ${nugetSource} --api-key ${nugetApiKey} --skip-duplicate`,
        { stdio: "inherit" }
      );
    });
  });

  grunt.registerTask("publish", ["release", "nugetpack", "nugetpush"]);
  grunt.registerTask("publishnext", function () {
    grunt.config("release.options.npmtag", "next");
    grunt.task.run("release");
  });
  grunt.registerTask("types", function () {
    execSync("npm run types", { stdio: "inherit" });
  });
  grunt.registerTask("nodetest", function () {
    execSync("node nodetest.js", { stdio: "inherit" });
  });
  grunt.registerTask("validate", [
    "webpack",
    "copy",
    "types",
    "nodetest",
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
