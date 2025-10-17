const os = require('os');
let os_value;

os_value = os.platform(); // linux
os_value = os.homedir();
os_value = os.freemem();
os_value = os.cpus();

console.log(os_value); 

// os.EOL
// os.availableParallelism()
// os.arch()
// os.constants
// os.cpus()
// os.devNull
// os.endianness()
// os.freemem()
// os.getPriority([pid])
// os.homedir()
// os.hostname()
// os.loadavg()
// os.machine()
// os.networkInterfaces()
// os.platform()
// os.release()
// os.setPriority([pid, ]priority)
// os.tmpdir()
// os.totalmem()
// os.type()
// os.uptime()
// os.userInfo([options])
// os.version()