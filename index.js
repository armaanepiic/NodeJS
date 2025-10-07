


const fs = require('fs');
// to write a file
fs.writeFileSync('myfile.txt', 'hello programmers'); // synchronous way
// replace that file
fs.writeFileSync('myfile.txt', 'how are you'); // synchronous way
// append that file
fs.appendFileSync('myfile.txt', ' programmers'); // synchronous way
// read file
const data = fs.readFileSync('myfile.txt');
// console.log(data); // output: <Buffer 68 6f 77 20 61 72 65 20 79 6f 75 20 70 72 6f 67 72 61 6d 6d 65 72 73>
// console.log(data.toString()); // original data

fs.readFile('myfile.txt', (err, data)=> {
    console.log(data.toString());
});
console.log('I am first');