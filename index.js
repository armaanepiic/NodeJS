// console.log('Hello programmers. How are you?');
// console.log('All arguments:', process.argv);
// console.log('First argument:', process.argv[1]);
// console.log('Second argument:', process.argv[0]);


// console.log('Environment:', process.env.NODE_ENV || 'development');
// console.log('Custom variable:', process.env.MY_VARIABLE);
// console.log('Database URL:', process.env.DATABASE_URL || 'Not set');

// console.log(`V8 version: ${process.versions.v8}`);

// const fs = require('fs');
// fs.readFile('notes.txt', (err, data) => {
//   console.log('File read complete');
// });
// console.log('Next task');

// console.log('First');
// setTimeout(() => console.log('Third'), 0);
// Promise.resolve().then(() => console.log('Second'));
// console.log('Fourth');



// console.log('1. Start');

// // Next tick queue
// process.nextTick(() => console.log('2. Next tick'));

// // Microtask queue (Promise)
// Promise.resolve().then(() => console.log('3. Promise'));

// // Timer phase
// setTimeout(() => console.log('4. Timeout'), 0);

// // Check phase
// setImmediate(() => console.log('5. Immediate'));

// console.log('6. End');




// const fs = require('fs');

// console.log('1. Starting sync read...');
// const data = fs.readFileSync('notes.txt', 'utf8');
// console.log('2. File contents:', data);
// console.log('3. Done reading file');



const fs = require('fs').promises;

console.log('1. Reading file...');
fs.readFile('notes.txt', 'utf8')
  .then(data => {
    console.log('3. File content:', data);
  })
  .catch(err => console.error('Error:', err));

console.log('2. This runs before file is read!');