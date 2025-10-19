const fs = require('fs');

const ourReadStrem = fs.createReadStream(`${__dirname}/myfile.txt`);
const ourwriteStrem = fs.createWriteStream(`${__dirname}/output.txt`);

// ourReadStrem.on('data', (chunk) => {
//     ourwriteStrem.write(chunk);
// });

ourReadStrem.pipe(ourwriteStrem);