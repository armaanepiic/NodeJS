// Title : Handle reques response
// Description : Handle Request and Response

// dependencies
const {StringDecoder} = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');
// modile scafolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    console.log(queryStringObject);
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on("end", ()=> {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end("Hello Programmers!"); 
    });

};

module.exports = handler;