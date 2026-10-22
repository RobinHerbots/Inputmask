const fs = require("fs");
const path = require("path");

// Per-extension import maps - only what's actually used
const extensionImports = {
  "cssunit.js": {
    "../core/inputmask": { named: ["aliases"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "date.js": {
    "../core/escapeRegex": { named: ["escapeRegex"] },
    "../core/inputmask": { named: ["aliases"] },
    "../core/keycode.js": { named: ["keys"] },
    "../core/rule-engine.js": { named: ["getMaskTemplate", "getTest", "seekNext"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "definitions.js": {
    "../core/definitions": { default: "definitions" },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "email.js": {
    "../core/inputmask": { named: ["aliases"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "ip.js": {
    "../core/inputmask": { named: ["aliases"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "mac.js": {
    "../core/inputmask": { named: ["aliases"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "numeric.js": {
    "../core/definitions": { default: "definitions" },
    "../core/escapeRegex": { named: ["escapeRegex"] },
    "../core/inputmask": { named: ["aliases"] },
    "../core/keycode": { named: ["keys"] },
    "../core/rule-engine": { named: ["seekNext"] },
    "../core/validation": { named: ["isValid"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "ssn.js": {
    "../core/inputmask": { named: ["aliases"] },
    "../core/rule-engine": { named: ["getMaskTemplate", "getLastValidPosition"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "url.js": {
    "../core/inputmask": { named: ["aliases"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  },
  "vin.js": {
    "../core/inputmask": { named: ["aliases"] },
    "../dependencyLibs/inputmask.dependencyLib": { default: "dependencyLib" }
  }
};

function rewriteImports(code, id) {
  const filename = path.basename(id);
  const imports = extensionImports[filename];
  if (!imports) return code;

  let rewritten = code;

  for (const [sourcePath, exports] of Object.entries(imports)) {
    const escapedSource = sourcePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Handle mixed import (default + named) specially
    if (exports.isMixed) {
      const named = exports.named.join(", ");
      const regex = new RegExp(
        `import\\s+(\\w+)\\s*,\\s*\\{[^}]*\\}\\s*from\\s+["']${escapedSource}["']`,
        "g"
      );
      rewritten = rewritten.replace(
        regex,
        `import $1, { ${named} } from "../inputmask.mjs"`
      );
      continue;
    }

    // default import: import X from "..."
    if (exports.default) {
      const regex = new RegExp(
        `import\\s+([\\w$]+)\\s+from\\s+["']${escapedSource}["']`,
        "g"
      );
      rewritten = rewritten.replace(
        regex,
        `import { ${exports.default} as $1 } from "../inputmask.mjs"`
      );
    }

    // mixed: import X, { a, b } from "..."
    if (exports.default && exports.named) {
      const named = exports.named.join(", ");
      const regex = new RegExp(
        `import\\s+([\\w$]+)\\s*,\\s*\\{[^}]*\\}\\s*from\\s+["']${escapedSource}["']`,
        "g"
      );
      rewritten = rewritten.replace(
        regex,
        `import { ${exports.default} as $1, ${named} } from "../inputmask.mjs"`
      );
    }

    // named imports: import { a, b } from "..."
    if (exports.named) {
      const named = exports.named.join(", ");
      const regex = new RegExp(
        `import\\s*\\{[^}]*\\}\\s*from\\s+["']${escapedSource}["']`,
        "g"
      );
      rewritten = rewritten.replace(
        regex,
        `import { ${named} } from "../inputmask.mjs"`
      );
    }
  }

  // Handle date extension's i18n import
  // The i18n module ships as its own bundle (date.i18n.mjs) next to the date
  // extension, so it stays a sibling import instead of a core import.
  if (id.includes("date.js")) {
    rewritten = rewritten.replace(
      /from\s+["']\.\/date\.i18n["']/g,
      'from "./date.i18n.mjs"'
    );
  }

  // Handle mac.js definitions import
  if (id.includes("mac.js")) {
    rewritten = rewritten.replace(
      /from\s+["']\.\/definitions["']/g,
      'from "./definitions.mjs"'
    );
  }

  return rewritten;
}

const extensions = [
  { name: "definitions", dir: "extensions" },
  { name: "cssunit", dir: "extensions" },
  { name: "url", dir: "extensions" },
  { name: "ip", dir: "extensions" },
  { name: "email", dir: "extensions" },
  { name: "mac", dir: "extensions" },
  { name: "vin", dir: "extensions" },
  { name: "ssn", dir: "extensions" },
  { name: "date", dir: "extensions" },
  { name: "numeric", dir: "extensions" }
];

const srcDir = path.join(__dirname, "lib");
const outDir = path.join(__dirname, "lib", ".rollup");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const ext of extensions) {
  const srcPath = path.join(srcDir, ext.dir, `${ext.name}.js`);
  const outPath = path.join(outDir, `${ext.name}.js`);

  let code = fs.readFileSync(srcPath, "utf8");
  code = rewriteImports(code, srcPath);

  fs.writeFileSync(outPath, code);
  console.log(`Rewrote: ${ext.name}.js`);
}

console.log("Done!");