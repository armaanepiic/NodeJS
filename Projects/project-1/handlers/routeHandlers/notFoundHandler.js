// Title: Not Found Handler

const handler = {};

handler.notFoundHandler = (requestedProperties, callback) => {
    console.log("Not Found");
    callback(404, {
        message: "Your requested URL was not Found!",
    })
};
module.exports = handler;