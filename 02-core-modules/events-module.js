const EventEmitter = require("events");
const emitter = new EventEmitter();

const School = require("./school");
// register a listener for bellRing event
const school = new School();
school.on("bellRing", ({ period, text }) => {
  console.log(`We need to run because ${period} ${text}`);
});
school.startPeriod();