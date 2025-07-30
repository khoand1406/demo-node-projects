const log = (msg) => console.log(`${Date.now()} - ${msg}`);

log("Start");

Promise.resolve().then(() => log("Promise.then"));
process.nextTick(() => log("process.nextTick"));

log("End");