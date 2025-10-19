# Topic 02: Core Modules and Server

## 📌 Overview
Exploring Node.js built-in (core) modules that provide essential functionality without requiring external packages. Learn how to work with paths, OS information, events, and create your first HTTP server.

---

## 🎯 Key Concepts

### What are Core Modules?
- Built-in modules that come with Node.js
- No need to install via NPM
- Import using `require('module-name')`
- Provide essential functionality for file operations, networking, OS interactions, etc.

---

## 📁 1. Path Module

The `path` module provides utilities for working with file and directory paths.

### Basic Usage

```javascript
const path = require('path');
const myPath = '/home/armaan/projects/NodeJS/index.js';
```

### Common Methods

| Method | Output | Description |
|--------|--------|-------------|
| `path.basename(myPath)` | `index.js` | Gets the last portion of a path |
| `path.dirname(myPath)` | `/home/armaan/projects/NodeJS` | Gets the directory name |
| `path.extname(myPath)` | `.js` | Gets the file extension |

### `path.parse()` - Detailed Path Information

```javascript
console.log(path.parse(myPath));
```

**Output:**
```javascript
{
  root: '/',
  dir: '/home/armaan/projects/NodeJS',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
```

### Other Useful Path Methods

```javascript
path.format(pathObject)        // Converts object to path string
path.isAbsolute(path)          // Checks if path is absolute
path.join([...paths])          // Joins path segments
path.normalize(path)           // Normalizes path
path.relative(from, to)        // Gets relative path
path.resolve([...paths])       // Resolves to absolute path
path.delimiter                 // Platform-specific path delimiter
path.sep                       // Platform-specific path separator
```

**Cross-platform paths:**
- `path.posix` - POSIX-specific methods
- `path.win32` - Windows-specific methods

---

## 💻 2. OS Module

The `os` module provides operating system-related utility methods.

```javascript
const os = require('os');

console.log(os.platform());    // 'linux', 'darwin', 'win32', etc.
console.log(os.homedir());     // User's home directory
console.log(os.freemem());     // Free system memory in bytes
console.log(os.cpus());        // Array of CPU core information
```

### Useful OS Methods

- `os.arch()` - CPU architecture
- `os.hostname()` - Computer hostname
- `os.totalmem()` - Total system memory
- `os.uptime()` - System uptime in seconds
- `os.userInfo()` - Current user information
- `os.type()` - Operating system name

---

## ⚡ 3. Events Module

The Events module allows you to create, fire, and listen for custom events - a fundamental pattern in Node.js.

### Basic Event Emitter (Won't Work as Expected)

**❌ Problem:** Different EventEmitter instances can't communicate

```javascript
// events-module.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

const startPeriod = require("./school");
emitter.on("bellRing", ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});
startPeriod();

// school.js
const EventEmitter = require("events");
const emitter = new EventEmitter();  // Different instance!

function startPeriod() {
  console.log("Class started");
  setTimeout(() => {
    emitter.emit("bellRing", { period: "first", text: "Period ended" });
  }, 2000);
}
module.exports = startPeriod;
```

**Output:** Only `"Class started"` (event listener never fires)

**Why?** Each file creates a **different** EventEmitter instance. They can't communicate!

---

### ✅ Correct Way: Extending EventEmitter Class

```javascript
// school.js
const EventEmitter = require("events");

class School extends EventEmitter {
  startPeriod() {
    console.log("Class started");
    // Emit event after 2 seconds
    setTimeout(() => {
      this.emit("bellRing", { period: "first", text: "Period ended" });
    }, 2000);
  }
}

module.exports = School;
```

```javascript
// events-module.js
const School = require("./school");

const school = new School();

// Register listener
school.on("bellRing", ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});

school.startPeriod();
```

**Output:**
```
Class started
We need to run because first Period ended
```

### Event Pattern Explained

1. **Create a class** that extends `EventEmitter`
2. **Emit events** using `this.emit('eventName', data)`
3. **Listen to events** using `instance.on('eventName', callback)`

**Key Insight:** The emitter and listener must be the **same instance** for events to work!

---

## 🌐 4. HTTP Module

Create web servers without any external frameworks!

### Creating a Basic Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('hello programmers!');
        res.end();
    } else if (req.url === '/about') {
        res.write("this is about page!");
        res.end();
    } else {
        res.write("not found");
        res.end();
    }
});

server.listen(5000);

server.on('connection', (socket) => {
    console.log('new connection');
});

console.log("listening on port 5000");
```

### How It Works

1. **`http.createServer(callback)`** - Creates server
2. **Callback parameters:**
   - `req` (request) - Information about incoming request
   - `res` (response) - Object to send response back
3. **`req.url`** - The requested URL path
4. **`res.write()`** - Write data to response
5. **`res.end()`** - End the response (must call this!)
6. **`server.listen(port)`** - Start listening on a port
7. **`server.on('connection')`** - Event fired on new connection

### Testing Your Server

Open browser and visit:
- `http://localhost:5000/` → "hello programmers!"
- `http://localhost:5000/about` → "this is about page!"
- `http://localhost:5000/anything` → "not found"

---

## 📝 5. File System Module

The `fs` (File System) module allows you to work with files on your computer. Basic file operations will be covered in detail in upcoming topics.

---

## 🌊 6. Streams and Buffers (Deep Dive)

### What Are Streams?

**Streams** are collections of data that might not be available all at once. Instead of loading entire files into memory, streams allow you to process data piece by piece (in chunks).

### Real-World Analogy
Think of watching a video on YouTube:
- ❌ **Without Streams**: Download the entire 2GB video, then watch it
- ✅ **With Streams**: Start watching while it downloads in chunks

### Why Use Streams?

**Benefits:**
- **Memory Efficient** - Process large files without loading everything into RAM
- **Time Efficient** - Start processing data before it's fully loaded
- **Composable** - Chain multiple operations together using `pipe()`

---

### Types of Streams

1. **Readable** - Read data from a source (e.g., reading files)
2. **Writable** - Write data to a destination (e.g., writing files)
3. **Duplex** - Both readable and writable (e.g., TCP sockets)
4. **Transform** - Modify data as it's read/written (e.g., compression)

---

### Reading Streams

```javascript
const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/myfile.txt`);

// Listen for data chunks
ourReadStream.on('data', (chunk) => {
    console.log('Received chunk:');
    console.log(chunk); // Buffer object by default
});

// Specify encoding to get strings instead of Buffers
const readStream = fs.createReadStream(`${__dirname}/myfile.txt`, 'utf8');

readStream.on('data', (chunk) => {
    console.log(chunk); // Now it's a string!
});
```

---

### Writing Streams

```javascript
const fs = require('fs');

const writeStream = fs.createWriteStream(`${__dirname}/output.txt`);

// Write data
writeStream.write('Hello World!\n');
writeStream.write('This is line 2\n');

// Close the stream
writeStream.end();

// Listen for finish event
writeStream.on('finish', () => {
    console.log('Writing completed!');
});
```

---

### Piping Streams

**`pipe()`** is the most elegant way to connect streams. It automatically handles data flow, backpressure, and errors.

```javascript
const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/myfile.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

// Method 1: Manual (More code, more control)
ourReadStream.on('data', (chunk) => {
    ourWriteStream.write(chunk);
});

// Method 2: Using pipe (Recommended!)
ourReadStream.pipe(ourWriteStream);
```

**Why `pipe()` is better:**
- Handles backpressure automatically
- Cleaner, more readable code
- Less chance of memory leaks
- Automatically handles errors

---

### Streaming Files to HTTP Response

Instead of reading an entire file into memory and then sending it, stream it directly to the response:

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Create read stream
    const myReadStream = fs.createReadStream(`${__dirname}/myfile.txt`, 'utf8');
    
    // Pipe directly to response
    myReadStream.pipe(res);
});

server.listen(3000);
console.log('listening on port 3000');
```

**What happens:**
1. Client requests the file
2. Server starts reading file in chunks
3. Each chunk is immediately sent to client
4. Client starts receiving data instantly

**Benefits:**
- Works with files of ANY size
- Low memory usage (only one chunk in memory at a time)
- Better user experience (faster initial response)

---

### Handling POST Requests with Streams

The request object itself is a stream! You can read incoming data in chunks:

```javascript
const server = http.createServer((req, res) => {
    if (req.url === '/process' && req.method === 'POST') {
        const body = [];
        
        // Listen for data chunks
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        
        // When stream ends, process the data
        req.on('end', () => {
            console.log("Stream finished!");
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            res.write("Thank you for submission!");
            res.end();
        });
    }
});
```

---

### Understanding Buffers

#### What is a Buffer?

A **Buffer** is a temporary storage area for binary data. It's Node.js's way of handling raw binary data directly.

#### Why Buffers?

JavaScript was originally designed for browsers and didn't have a way to handle binary data. Node.js added Buffers to work with:
- File systems
- TCP streams
- Image/video processing
- Cryptography

#### Working with Buffers

```javascript
// Create a buffer from a string
const buffer1 = Buffer.from('Hello World');
console.log(buffer1); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>

// Convert buffer to string
console.log(buffer1.toString()); // "Hello World"

// Create an empty buffer of specific size
const buffer2 = Buffer.alloc(10); // 10 bytes

// Write to buffer
buffer2.write('Hi');
console.log(buffer2.toString()); // "Hi"
```

#### Buffers with Streams

When you read a stream without encoding, you get Buffer objects:

```javascript
const readStream = fs.createReadStream(`${__dirname}/myfile.txt`);

readStream.on('data', (chunk) => {
    console.log(chunk); // <Buffer 41 20 77 65 65 6b ...>
    console.log(chunk.toString()); // Convert to readable text
});
```

---

### Stream Events Reference

**Readable Stream Events:**
- `'data'` - Chunk is available to process
- `'end'` - No more data to read
- `'error'` - An error occurred
- `'close'` - Stream is closed

**Writable Stream Events:**
- `'finish'` - All data has been written
- `'error'` - An error occurred
- `'close'` - Stream is closed
- `'drain'` - Ready to accept more data

---

### Key Stream & Buffer Concepts

✅ **Streams process data in chunks** - Don't load everything into memory  
✅ **Four types of streams** - Readable, Writable, Duplex, Transform  
✅ **`pipe()` is your friend** - Handles complexity automatically  
✅ **Buffers store binary data** - Temporary storage for raw data  
✅ **Encoding matters** - Specify 'utf8' for text files  
✅ **Event-driven** - Listen to 'data', 'end', 'error' events  
✅ **HTTP responses are streams** - Can pipe directly to them  
✅ **Memory efficient** - Handle files larger than available RAM

---

## 💡 Key Takeaways

✅ **Core modules** are built into Node.js - no installation needed  
✅ **Path module** helps work with file paths across different operating systems  
✅ **OS module** provides system information  
✅ **EventEmitter** must be the same instance for events to work - extend the class!  
✅ **HTTP module** lets you create web servers without Express  
✅ **Streams** process data in chunks - memory efficient for large files  
✅ **pipe()** is the elegant way to connect streams together  
✅ **Request object is a stream** - use events to read incoming data  
✅ Always call `res.end()` when using HTTP module  

---

## 🎯 Important Patterns

### Event Pattern
```javascript
// 1. Extend EventEmitter
class MyClass extends EventEmitter { }

// 2. Emit events
this.emit('eventName', data);

// 3. Listen to events
instance.on('eventName', (data) => { });
```

### HTTP Server Pattern
```javascript
// 1. Create server
const server = http.createServer((req, res) => { });

// 2. Handle routes
if (req.url === '/path') { }

// 3. Send response
res.write('content');
res.end();

// 4. Listen on port
server.listen(port);
```

---

## 🧪 Practice Exercises

Try these to solidify your learning:

1. Create a server with 5 different routes
2. Build an EventEmitter class that simulates a traffic light (red → yellow → green)
3. Use the `path` module to build absolute paths for different files
4. Use `os` module to log system information when server starts
5. Create a file upload handler using streams
6. Build a simple file server that streams different files based on routes
7. Implement a form that accepts POST data and saves it to a file using streams

---

## 📚 Next Steps

- Deep dive into File System (fs) module - sync vs async methods
- Explore different types of streams (Readable, Writable, Duplex, Transform)
- Learn about Buffers and binary data handling
- Build a file-based routing system
- Understand error handling in streams

---

## 🔗 Related Topics
- **Previous:** Topic 01 - Global Object and Module System
- **Next:** Topic 03 - File System Operations (Deep Dive)
- **See Also:** Express.js (higher-level HTTP framework)