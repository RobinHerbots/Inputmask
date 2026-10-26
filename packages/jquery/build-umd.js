import { rollup } from "rollup";
import config from "./rollup.config.cjs";

async function build() {
  for (const c of config) {
    console.log("Building UMD:", c.input, "->", c.output.file);
    const bundle = await rollup(c);
    await bundle.write(c.output);
    await bundle.close();
  }
  console.log("UMD build done!");
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});