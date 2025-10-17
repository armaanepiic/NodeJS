console.log(window); // window is not defined
setTimeout(()=>{
    console.log("test");
},2000);

console.log(global);
console.log(__dirname); // /home/armaan/projects/NodeJS
console.log(__filename); // /home/armaan/projects/NodeJS/index.js


const people = require('./people');
console.log(people.people);
console.log(people.a);
people.test();

const _ = require('lodash');
console.log(_.last(people.people));

