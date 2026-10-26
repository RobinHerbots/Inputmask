import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "svelte.inputmask": "src/index.ts"
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ["inputmask", "svelte"]
});
