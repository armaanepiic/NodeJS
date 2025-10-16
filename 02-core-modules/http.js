// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('hello programmers!');
//         res.end();
//     } else if (req.url === '/about') {
//         res.write("this is about page!");
//         res.end();
//     } else {
//         res.write("not found");
//         res.end();
//     }
// });
// server.listen(5000);
// server.on('connection', (socket) => {
//     console.log('new connection');
// });
// console.log("listening on port 3000");


const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end("<h1>Hello World!</h1>");
}).listen(8080);

// http.createServer - This creates a server object.
// res.writeHead(200, {'Content-Type': 'text/plain'}) - Sends a response header to the browser.
// 200 = status code (means “OK”).
// 'Content-Type': 'text/plain' tells the browser the content is plain text.