import { getFileDescriptor, getFilePath, getFileStats, readFileSync, readLargeFileWithStream, writeFileAsync, makeDirectory, writeStream } from "./utils.js";

getFilePath();
getFileStats();
getFileDescriptor();

readFileSync();
readLargeFileWithStream();
writeFileAsync("Sample async");
makeDirectory();
writeStream();