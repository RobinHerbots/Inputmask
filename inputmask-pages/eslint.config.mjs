// Flat-config entry point for the demo site.
//
// react-scripts (create-react-app) lints with ESLint 8's legacy eslintrc mode
// through `.eslintrc.json` when running `npm run build`, while ESLint 8.57+
// (what the editor and the CLI use) automatically switches to flat config as
// soon as an `eslint.config.*` file exists above the working directory. That
// file used to be the repository root config, which ignores this folder - so
// the build reported problems that never showed up in the editor.
//
// This file keeps a single source of truth: it is generated from the very same
// `.eslintrc.json`, so both paths report identical problems.
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const here = path.dirname(fileURLToPath(import.meta.url));

// The plugins pinned in this package (eslint-plugin-react-hooks 4,
// eslint-plugin-jest 27, ...) still use context APIs that ESLint 10 removed.
// They run on this package's own ESLint 8 - which is what the build and the
// editor use - so when a newer ESLint picks up this file (the repo root ships
// one), skip the folder instead of crashing, exactly as the root config does.
function loaderEslintMajor() {
  try {
    const require = createRequire(path.join(process.cwd(), "package.json"));
    const { version } = require("eslint/package.json");
    return Number.parseInt(version, 10);
  } catch {
    return 8;
  }
}

const skipForNewerEslint = loaderEslintMajor() >= 9;

const eslintrc = JSON.parse(
  fs.readFileSync(path.join(here, ".eslintrc.json"), "utf8")
);
// `root` is an eslintrc-only concept (it stops the config cascade at this
// directory); flat config is always scoped to the directory it lives in.
delete eslintrc.root;

const compat = new FlatCompat({
  baseDirectory: here,
  resolvePluginsRelativeTo: here
});

export default skipForNewerEslint
  ? [{ ignores: ["**"] }]
  : [
      {
        ignores: ["build/**"]
      },
      ...compat.config(eslintrc)
    ];
