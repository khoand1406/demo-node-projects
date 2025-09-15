import path from "path";
import { CustomStream } from "./customStream.js";
import fs from "fs"
import { CustomWritableStream } from "./customWriteabkeStream.js";

outPutFilePath= path.join(__dirname, 'logs', 'output.txt');
export function ReadByCustomStream(){
    const customReadable= new CustomStream();
    customReadable.on('data', (chunk)=> {
        console.log(chunk.toString());
    })
    customReadable.on('end', ()=> {
        console.log('No more data');
    })
    customReadable.on('error', (err)=> {
        console.error('Error:', err);
    })

}

export function WriteCustomStream(){
    const customWriteable= new CustomWritableStream();
}