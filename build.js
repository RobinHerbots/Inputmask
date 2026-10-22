const rollup = require("rollup");
const chokidar = require("chokidar");
const path = require("path");
const { execSync } = require("child_process");
const config = require("./rollup.config.cjs");

const WATCH = process.argv.includes("--watch");
const DEBOUNCE_MS = 150;

function rewriteImports() {
  console.log("Rewriting extension imports...");
  execSync("node rewrite-imports.js", { stdio: "inherit" });
}

async function build(caches) {
  for (const c of config) {
    console.log("Building:", c.input, "->", c.output.file);
    // The previous build's cache lets rollup reuse the parsed and transformed
    // modules, so a rebuild only runs the plugins for the modules that changed.
    const bundle = await rollup.rollup({
      ...c,
      cache: caches.get(c.output.file)
    });
    await bundle.write(c.output);
    caches.set(c.output.file, bundle.cache);
    await bundle.close();
  }
}

async function buildAll(caches) {
  const start = Date.now();
  await build(caches);
  console.log(`Done in ${((Date.now() - start) / 1000).toFixed(1)}s`);
}

function watch() {
  const caches = new Map();
  let building = false;
  let queued = false;
  let timer = null;

  async function rebuild() {
    if (building) {
      queued = true;
      return;
    }

    building = true;
    try {
      // The extension bundles are built from the generated lib/.rollup/ copies,
      // so the rewrite has to run before every rebuild. Everything else is built
      // from the real sources and is covered by the watcher below.
      rewriteImports();
      await buildAll(caches);
    } catch (e) {
      console.error(e);
    } finally {
      building = false;
      console.log("Watching for changes...\n");
      if (queued) {
        queued = false;
        rebuild();
      }
    }
  }

  // dist/ is written by the build, lib/.rollup/ by rewrite-imports.js and
  // qunit/qunit.js by the test bundle: watching them would rebuild in a loop.
  const watcher = chokidar.watch(
    [
      "lib/**/*.js",
      "bundle.js",
      "bundle.jquery.js",
      "bundle.colormask.js",
      "qunit/**/*.js",
      "rollup.config.cjs"
    ],
    {
      ignoreInitial: true,
      ignored: [
        "lib/.rollup/**",
        "dist/**",
        "node_modules/**",
        "qunit/qunit.js",
        "qunit/qunit.js.map"
      ]
    }
  );

  watcher.on("ready", rebuild);

  watcher.on("all", (event, file) => {
    if (path.basename(file) === "rollup.config.cjs") {
      console.log("[watch] rollup.config.cjs changed - restart to apply it");
      return;
    }

    console.log(`[watch] ${event}: ${file}`);
    clearTimeout(timer);
    timer = setTimeout(rebuild, DEBOUNCE_MS);
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => {
      watcher.close();
      process.exit();
    });
  }
}

if (WATCH) {
  watch();
} else {
  rewriteImports();
  buildAll(new Map()).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
