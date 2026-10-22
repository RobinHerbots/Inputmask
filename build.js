const rollup = require('rollup');
const { execSync } = require('child_process');
const config = require('./rollup.config.cjs');

// Run the import rewriting first
console.log('Rewriting extension imports...');
execSync('node rewrite-imports.js', { stdio: 'inherit' });

async function build() {
  for (const c of config) {
    console.log('Building:', c.input, '->', c.output.file);
    const bundle = await rollup.rollup(c);
    await bundle.write(c.output);
    await bundle.close();
  }
}

build().catch(e => {
  console.error(e);
  process.exit(1);
});