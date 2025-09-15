import fs from 'fs/promises';
import fsCallback from 'fs';
import path, { resolve } from 'path';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath= path.join(__dirname, 'logs', 'sample.txt');

export async function getFileStats(){
    try {
        const stats=await fs.stat(filePath);
        return {
            size: stats.size,
            isDirectory: stats.isDirectory(),
            isFile: stats.isFile()
        }
    } catch (error) {
        console.error('Error getting file stats:', error);
    }
}

export function getFilePath(){
    try {
        const relativePath= './logs/sample.txt';
        const absolutePath= path.resolve(relativePath);
        return absolutePath;
    } catch (error) {
        console.error('Error occurs:'+ error);
    }
}

export async function getFileDescriptor(){
    try {
        const fileHandle= await fs.open(filePath, 'r');
        const buffer= Buffer.alloc(100);
        const content= await fileHandle.read(buffer, 0, buffer.length, 0);
        await fileHandle.close();
        return content.buffer.toString('utf-8', 0, content.bytesRead);
    } catch (error) {
        console.error('Error occurs:'+ error);  
    }
}

export async function readFile(){
    try {
        const data= await fs.readFile(filePath, 'utf-8');
        return data.slice(0, 100) + '...';
    } catch (error) {
        console.error('Error occurs:'+ error);
    }
}

export async function readLargeFileWithStream(){
    try {
        let data= '';
        const fileDescriptor= await fs.open(filePath, 'r');
        const fileStream= fsCallback.createReadStream(fileDescriptor.fd, {encoding: 'utf-8', highWaterMark: 16});
        fileStream.on('data', chunk => {
            data += chunk;
        });
        return new Promise((resolve, reject) => {
            fileStream.on('end', ()=>{
                resolve('File read with stream: ' + data.slice(0, 100) + '...');
            });
            fileStream.on('error', err => {
                reject('Error reading file stream: ' + err);
            });
        });
    } catch (error) {
        console.error('Error occurs:'+ error);
    }
}

export async function writeFile(){
    try {
        const fileStream= fsCallback.createReadStream(filePath, {encoding: 'utf-8', highWaterMark: 16});
        const writeStream= fsCallback.createWriteStream(path.join(__dirname , 'logs', 'output.txt'), {encoding: 'utf-8'});
        const transformStream= new Transform({
            transform(chunk, encoding, callback){
                const upperChunk= chunk.toString().toUpperCase();
                callback(null, upperChunk);
            }
        })
        fileStream.pipe(transformStream.pipe(writeStream));
        return new Promise((resolve, reject)=> {
            writeStream.on('pipe', ()=> {
                console.log('Piping data to write stream...');
            })
            writeStream.on('finish', ()=>{
                resolve('File writen either with stream and transform to upper case.');
            })
            writeStream.on('error', err => {
                reject('Error writing file stream: ' + err);
            });

        })
    } catch (error) {
        console.error('Error occurs:'+ error);
    }
}

async function checkReadPermissions(){
    try {
        await fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
        console.log('Read and write permissions are granted.');
    } catch (error) {
        console.error('Error checking permissions:', error);
    }
}

async function checlkWritePermissions(){
    try {
        await fs.access(filePath, fs.constants.W_OK);
        console.log('Write permission is granted.');
    } catch (error) {
        console.error('Error checking write permission:', error);
    }
}


