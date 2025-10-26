// Title: Handle request and response
// Description: Handle request and response

// dependecies
const url = require("url");
const routes = require("../routes");
const { StringDecoder } = require("string_decoder");
const { notFoundHandler } = require("../handlers/routeHandlers/notFoundHandler");

const handler = {};

handler.handleReqRes = (req, res) => {
  // request handling
  // get the url and parse it
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parseUrl.query;
  const headersObject = req.headers;

  const requestedProperties = {
    parseUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
  // console.log(chosenHandler);

  chosenHandler(requestedProperties, (statusCode, palyLoad) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    palyLoad = typeof palyLoad === "object" ? palyLoad : {};
    const palyLoadString = JSON.stringify(palyLoad);
    // return the final responst
    res.writeHead(statusCode);
    res.end(palyLoadString);
  });
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
    // response handle
    res.end("Hello programmers!");
  });
};

module.exports = handler;
