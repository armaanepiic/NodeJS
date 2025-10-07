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

*(To be covered - file-module.js is empty)*

The `fs` module will allow you to:
- Read files
- Write files
- Delete files
- Create directories
- Watch file changes
- And more!

---

## 💡 Key Takeaways

✅ **Core modules** are built into Node.js - no installation needed  
✅ **Path module** helps work with file paths across different operating systems  
✅ **OS module** provides system information  
✅ **EventEmitter** must be the same instance for events to work - extend the class!  
✅ **HTTP module** lets you create web servers without Express  
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

---

## 📚 Next Steps

- Learn File System (fs) module operations
- Understand synchronous vs asynchronous methods
- Explore streams for handling large files
- Build a file-based routing system

---

## 🔗 Related Topics
- **Previous:** Topic 01 - Global Object and Module System
- **Next:** Topic 03 - File System Operations (Deep Dive)
- **See Also:** Express.js (higher-level HTTP framework)