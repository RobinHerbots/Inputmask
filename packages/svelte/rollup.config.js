import { fileURLToPath } from "node:url";

import { createPackageConfig } from "../rollup.config.shared.mjs";

export default createPackageConfig({
  pkgDir: fileURLToPath(new URL(".", import.meta.url)),
  entry: "src/index.ts",
  name: "svelte.inputmask"
});
