import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "react.inputmask": "src/index.tsx"
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ["inputmask", "react", "react-dom"]
});
