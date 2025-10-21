// Title: Uptime Monitoring application
// Description: A RESTFull API to monitor up or down time of user defined links
// dependecies
const http = require('http');
const { buffer } = require('stream/consumers');
const {handleReqRes} = require('./helpers/handleReqRes');

// app-object - module scaffolding
const app = {};

// configuration
app.config = {
    PORT: 3000
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.PORT, () => {
        console.log(`Listening to port ${app.config.PORT}`);
    })
}
// handle Request Response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();