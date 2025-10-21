// sending response Headers
// const http = require('http');
// const server = http.createServer((req, res) => {
//     console.log(req.headers);
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>Hello World</h1>');
// });
// const PORT = 3000;
// server.listen(3000, () => {
//     console.log(`Server running at http://localhost:${PORT}`)
// })


// reading response Headers
const http = require('http');
const server = http.createServer((req, res) => {
    console.log("Request Headers:", req.headers);
});
