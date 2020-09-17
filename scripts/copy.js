const fs = require('fs');
var copydir = require('copy-dir');

// destination.txt will be created or overwritten by default.
var package = JSON.parse(fs.readFileSync('package.json'));
delete package.scripts;
delete package.jest;
delete package.devDependencies;

fs.writeFileSync( 'dist/package.json',JSON.stringify(package));
console.log("package.json copied")

fs.copyFile('DIST.md', 'dist/README.md',()=>{console.log("README.md copied")});

copydir.sync('./imgs', './dist/imgs', {
    utimes: true,  // keep add time and modify time
    mode: true,    // keep file mode
    cover: true    // cover file when exists, default is true
  });