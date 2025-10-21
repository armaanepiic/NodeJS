// title : routes
// description : Application Routes

// dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler')
const routes = {
    sample: sampleHandler,
}
module.exports = routes;