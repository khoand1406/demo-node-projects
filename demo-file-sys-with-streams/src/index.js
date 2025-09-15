import { getFileDescriptor, getFilePath, getFileStats, readFileSync, readLargeFileWithStream, writeFileAsync, makeDirectory, writeStream } from "./utils.js";

getFilePath();
getFileStats();
getFileDescriptor();

readFileSync();
readLargeFileWithStream();
writeFileAsync("Sample async");
makeDirectory();
writeStream();

setInterval(() => {
  const m = process.memoryUsage();

 
  const memoryStats = {
    RSS:        (m.rss / 1024 / 1024).toFixed(2) + " MB",
    HeapTotal:  (m.heapTotal / 1024 / 1024).toFixed(2) + " MB",
    HeapUsed:   (m.heapUsed / 1024 / 1024).toFixed(2) + " MB",
    External:   (m.external / 1024 / 1024).toFixed(2) + " MB",
    ArrayBuffer:(m.arrayBuffers / 1024 / 1024).toFixed(2) + " MB"
  };

  console.table(memoryStats);
}, 5000);