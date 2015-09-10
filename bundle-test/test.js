var browserify = require('browserify');
var fs = require('fs');
var path = require('path');

browserify({
  entries: ['./bundle-test/fixtures/src.js'],
})
.bundle()
.on('error', function(err){
  console.error("Failed to bundle, error: ", err)
  process.exit(1);
})
.pipe(fs.createWriteStream(path.resolve(__dirname, './tmp/output.js')))