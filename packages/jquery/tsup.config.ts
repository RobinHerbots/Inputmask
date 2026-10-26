import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "jquery.inputmask": "src/index.ts"
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ["inputmask", "jquery"],
  platform: "browser",
  outDir: "dist"
});