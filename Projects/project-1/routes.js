// Title : Routes
// Description: Application routes

// dependencies
const {sampleHandler} =  require("./handlers/routeHandlers/sampleHandler");
// const {} = require("./handlers/routeHandlers/notFoundHandler");

const routes = {
    sample: sampleHandler,
}
module.exports = routes;