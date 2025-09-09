import { Logger } from "./logger";
import { fileWatcher } from "./filewatcher";
import path from "path";

const fileName= path.join(__dirname, 'testFile.txt');
const logFileName= path.join(__dirname, 'log.txt');
const logger= new Logger(logFileName);
const filewatcher= new fileWatcher(fileName);

filewatcher.on('fileChanged', async (filename) => {
    await logger.log(`File changed: ${filename}`);
});

filewatcher.watch();
console.log(`Watching for changes in ${fileName}...`);

process.nextTick(() => {
    logger.log('Application started and watching for file changes.');
});

setImmediate(() => {
    logger.log('This is an immediate log message.');
});

setTimeout(() => {
    logger.log('This is a delayed log message after 0 seconds.');
}, 0);


