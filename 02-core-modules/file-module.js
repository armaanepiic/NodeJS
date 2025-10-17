const fs = require('fs');

fs.writeFileSync('myfile.txt', "Hello Programmers"); // synchronous way
fs.writeFileSync('myfile.txt', "How are you"); // replaced
fs.appendFileSync('myfile.txt', " I am arman!"); // appended

// synchronour way
let data = fs.readFileSync('myfile.txt'); // <Buffer 48 6f 77 20 61 72 65 20 79 6f 75 20 49 20 61 6d 20 61 72 6d 61 6e 21>
data = fs.readFileSync('myfile.txt').toString();
// console.log(data);


// asynchronous way
data = fs.readFile("myfile.txt", 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file ' + err);
    } else {
        console.log('file content ' + data);
    }
});
console.log('Reading file... (this runs first!)');