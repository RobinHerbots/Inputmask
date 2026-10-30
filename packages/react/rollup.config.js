import { fileURLToPath } from "node:url";

import { createPackageConfig } from "../rollup.config.shared.mjs";

export default createPackageConfig({
  pkgDir: fileURLToPath(new URL(".", import.meta.url)),
  entry: "src/index.tsx",
  name: "react.inputmask",
  jsx: true
});
