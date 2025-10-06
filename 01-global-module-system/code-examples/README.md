# Topic 01: Global Object and Module System

## 📌 Overview
Understanding the fundamental differences between browser JavaScript and Node.js, including the global object, module system, and how Node.js wraps and executes code.

---

## 🎯 Key Concepts

### 1. **No `window` Object in Node.js**
- Unlike browsers, Node.js does **not** have a `window` object
- Attempting to use `window` will result in: `ReferenceError: window is not defined`

```javascript
console.log(window); // ❌ ReferenceError: window is not defined
```

### 2. **The `global` Object**
- Node.js provides a `global` object, which is equivalent to `window` in browsers
- Contains built-in functions and properties available throughout the application

```javascript
console.log(global);
```

**Output includes:**
- `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`
- `setImmediate`, `clearImmediate`
- `queueMicrotask`
- `structuredClone`
- `fetch`, `crypto`, `performance`
- `atob`, `btoa`

### 3. **Global Functions**
- Functions like `setTimeout()` work in Node.js because they exist inside the `global` object
- You don't need to prefix them with `global.`

```javascript
setTimeout(() => {
    console.log("test");
}, 2000); // ✅ Works perfectly
```

### 4. **Variable Scoping Difference**

**Browser (JavaScript):**
```javascript
var a = 5;
console.log(window.a); // 5 ✅
```

**Node.js:**
```javascript
var a = 5;
console.log(global.a); // undefined ❌
```

**Why?** Variables declared in Node.js are scoped to the module, not added to `global`.

---

## 📁 Special Variables in Node.js

### `__dirname`
- Returns the **directory path** of the current file
- **Not** included in the `global` object

```javascript
console.log(__dirname); 
// Output: /home/armaan/projects/NodeJS
```

### `__filename`
- Returns the **full file path** including filename
- **Not** included in the `global` object

```javascript
console.log(__filename); 
// Output: /home/armaan/projects/NodeJS/index.js
```

---

## 🔧 Module System

### Understanding `module` Object

When you log `module`, you see:

```javascript
console.log(module);
```

**Output:**
```javascript
{
  id: '.',
  path: '/home/armaan/projects/NodeJS',
  exports: {},
  filename: '/home/armaan/projects/NodeJS/index.js',
  loaded: false,
  children: [],
  paths: [
    '/home/armaan/projects/NodeJS/node_modules',
    '/home/armaan/projects/node_modules',
    '/home/armaan/node_modules',
    '/home/node_modules',
    '/node_modules'
  ]
}
```

**Key Properties:**
- `id`: Module identifier
- `path`: Directory path
- `exports`: What this module exports (initially empty `{}`)
- `filename`: Full file path
- `loaded`: Whether module has finished loading
- `children`: Array of modules required by this module
- `paths`: Locations where Node.js looks for modules

---

## 📦 Exporting and Importing Modules

### Exporting (`people.js`)

```javascript
const people = ["sakib", "tamim", "rubel"];
var a = 6;
const test = () => {
  console.log("I am test function");
};

module.exports = { people, a, test };
```

### Importing (`index.js`)

```javascript
const people = require('./people');

console.log(people.people); // ["sakib", "tamim", "rubel"]
console.log(people.a);      // 6
console.log(people.test);   // [Function: test]
```

---

## 🎭 The Module Wrapper Function (IIFE)

**Critical Concept:** Every Node.js file is wrapped in a special function before execution.

### What Actually Happens?

Your code:
```javascript
const people = ["sakib", "tamim", "rubel"];
module.exports = { people };
```

Gets wrapped like this:
```javascript
(function(exports, require, module, __filename, __dirname) {
    const people = ["sakib", "tamim", "rubel"];
    module.exports = { people };
    
    return module.exports;
})();
```

### Parameters Provided by Node.js:
1. **`exports`** - Shorthand reference to `module.exports`
2. **`require`** - Function to import modules
3. **`module`** - Reference to current module
4. **`__filename`** - Full path to current file
5. **`__dirname`** - Directory path of current file

**Why this matters:**
- Variables are **module-scoped**, not global
- Explains why `__dirname` and `__filename` are available
- Explains why `require` and `module` work without importing them

---

## 🧪 Working with NPM Packages

### Using Lodash

```javascript
const _ = require('lodash');
const people = ["sakib", "tamim", "rubel"];

console.log(_.last(people)); // "rubel"
```

**Note:** Make sure to install lodash first:
```bash
npm install lodash
```

---

## 💡 Key Takeaways

✅ Node.js uses `global` instead of `window`  
✅ Variables declared in files are **module-scoped**, not global-scoped  
✅ `__dirname` and `__filename` give you file location information  
✅ Every file is wrapped in a Module Wrapper Function (IIFE)  
✅ Use `module.exports` to export and `require()` to import  
✅ The `module` object contains metadata about the current module  

---

## 📝 Questions to Explore

- What's the difference between `module.exports` and `exports`?
- How does Node.js resolve module paths?
- What are CommonJS vs ES6 modules?
- Can you modify the `global` object?

---

## 🔗 Related Topics
- **Next:** Topic 02 - File System Operations
- **See Also:** CommonJS Module System, NPM Basics