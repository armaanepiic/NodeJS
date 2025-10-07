const path = require('path');
const myPath = '/home/armaan/projects/NodeJS/index.js';
console.log(path.basename(myPath));
console.log(path.dirname(myPath));
console.log(path.extname(myPath));
console.log(path.parse(myPath));
console.log(path.delimiter);
console.log(path.format(path.parse(myPath)));
console.log(path.normalize(myPath));

path.format(pathObject)
path.matchesGlob(path, pattern)
path.isAbsolute(path)
path.join([...paths])
path.normalize(path)
path.parse(path)
path.posix
path.relative(from, to)
path.resolve([...paths])
path.sep
path.toNamespacedPath(path)
path.win32