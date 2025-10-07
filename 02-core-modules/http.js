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
console.log("listening on port 3000");