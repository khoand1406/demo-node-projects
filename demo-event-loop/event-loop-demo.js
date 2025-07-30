import * as fs from "fs"
const __filename= './Roommate.json';
console.log('START');
const Task1=(cb)=> {
    console.log('callback fuc');
    cb();
}
const fuc= ()=> {
    console.log('called through task 1');
}

setTimeout(() => {
    console.log('Set timeout...');
}, 0);

setImmediate(()=> {
    console.log('Set immediate');
});

setTimeout(()=> {
    Task1(fuc);
},0)

fs.readFile(__filename, () => {
  console.log("4. fs.readFile (I/O callback)");
});


Promise.resolve().then(() => {
  console.log("5. Promise.then (Microtask)");
});

process.nextTick(() => {
  console.log("6. process.nextTick");
});

console.log("7. End");