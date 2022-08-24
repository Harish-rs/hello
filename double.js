const double = (a, b) => a + b; //+ b.parseInt();
const os = require("os");
console.log("memory usage", os.totalmem());

console.log(" os version", os.version());

console.log(process.argv);
const [, , n, m] = process.argv;
console.log(double(+n, +m));
