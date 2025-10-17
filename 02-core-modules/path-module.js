const path = require('path');
const myPath = '/home/armaan/projects/NodeJS/02-core-modules/path-module.js';

let path_value;
path_value = path.basename(myPath);
path_value = path.dirname(myPath);
path_value = path.extname(myPath);
path_value = path.parse(myPath);
path_value = path.delimiter;
path_value = path.format(path.parse(myPath));





console.log(path_value);


// console.log(path.format(path.parse(myPath)));
// console.log(path.normalize(myPath));

// path.format(pathObject)
// path.matchesGlob(path, pattern)
// path.isAbsolute(path)
// path.join([...paths])
// path.normalize(path)
// path.parse(path)
// path.posix
// path.relative(from, to)
// path.resolve([...paths])
// path.sep
// path.toNamespacedPath(path)
// path.win32;