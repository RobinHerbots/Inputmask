// eslint-disable-next-line import-x/order
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

  // grunt-release (last published 2022) shelled out to "npm publish" through
  // shell.exec with silent: true, so an expired npm token only surfaced as
  // "Failed when executing: `npm publish`", and it had already created the git
  // tag by then. These tasks stream npm's own output and check the
  // authentication before anything is tagged or published.
  //
  // The check is not tied to the classic access tokens npm has revoked. npm
  // login now hands out a two hour session token, a long lived granular
  // access token is the other option, and "npm whoami" validates either one
  // just the same, so it keeps doing its job: catching a dead credential while
  // there is still nothing tagged. The one place it cannot pass is trusted
  // publishing, where npm exchanges the CI provider's OIDC token at publish
  // time and there is no credential in ~/.npmrc to present, hence the
  // warn instead of fatal under CI.
  //
  // Everything runs with stdio: "inherit" so npm inherits the terminal and can
  // ask for a two factor challenge itself. That challenge is enforced on top
  // of a valid session: 2FA runs over WebAuthn security keys now that npm is
  // retiring TOTP, which only works interactively, while a TOTP based account
  // can still pass an npm_config_otp one time password.
  const isCI = process.env.CI === "true" || process.env.CI === "1",
    npmRegistry = "https://registry.npmjs.org",
    gitRemote = "origin";

  const npmAuthHint =
    'run "grunt npmlogin" to refresh it, npm login opens a browser and stores a ' +
    "two hour session token in ~/.npmrc, and publishing on top of that asks " +
    "for a 2FA challenge, a security key";

  function run(cmd) {
    execSync(cmd, { stdio: "inherit" });
  }

  function gitTagExists(tag) {
    try {
      execSync(`git rev-parse -q --verify refs/tags/${tag}`, {
        stdio: "ignore"
      });
      return true;
    } catch {
      return false;
    }
  }

  grunt.registerTask("npmlogin", "Log in to npm in a browser", function () {
    grunt.log.ok(
      "npm login opens a browser and stores a two hour session token in ~/.npmrc - run this from an interactive terminal"
    );
    run(`npm login --registry ${npmRegistry}`);
  });

  grunt.registerTask("npmauth", "Check the npm authentication", function () {
    let user;
    try {
      user = execSync(`npm whoami --registry ${npmRegistry}`, {
        stdio: ["ignore", "pipe", "inherit"]
      })
        .toString()
        .trim();
    } catch {
      if (isCI) {
        grunt.log.warn(
          `npm could not authenticate against ${npmRegistry} up front, carrying on because trusted publishing exchanges an OIDC token at publish time - ${npmAuthHint}`
        );
        return;
      }
      grunt.fail.fatal(
        `npm could not authenticate against ${npmRegistry} - ${npmAuthHint}`
      );
    }
    grunt.log.ok("npm authenticated as " + user);
  });

  grunt.registerTask(
    "gitrelease",
    "Tag the package.json version and push it",
    function () {
      const version = grunt.config("pkg").version;
      if (gitTagExists(version)) {
        // keeps a re-run after a failed npm publish working
        grunt.log.ok("git tag " + version + " already exists, keeping it");
      } else {
        run(`git tag ${version} -m "version ${version}"`);
      }
      run(`git push ${gitRemote} HEAD`);
      run(`git push ${gitRemote} ${version}`);
    }
  );

  grunt.registerTask(
    "npmpublish",
    "Publish to the npm registry",
    function (tag) {
      run(`npm publish${tag ? " --tag " + tag : ""}`);
    }
  );

  grunt.registerTask("publish", [
    "npmauth",
    "gitrelease",
    "npmpublish",
    "nugetpack",
    "nugetpush"
  ]);
  // a prerelease (x.y.z-beta.n) goes to npm under the next tag and to NuGet as a
  // prerelease version, where consumers have to opt in for it
  grunt.registerTask("publishnext", function () {
    const version = grunt.config("pkg").version;
    if (!version.includes("-")) {
      grunt.fail.fatal(
        `publishnext needs a prerelease version, ${version} is a stable one - use "grunt publish"`
      );
    }
    grunt.task.run("npmauth");
    grunt.task.run("gitrelease");
    grunt.task.run("npmpublish:next");
    grunt.task.run("nugetpack");
    grunt.task.run("nugetpush");
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
