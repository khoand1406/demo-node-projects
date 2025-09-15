import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getFileStats() {
    const filePath= path.join(__dirname ,'logs', 'sample.txt');
    fs.stat(filePath, (err, stats)=> {
        if(err) return console.error('Error:', err);
        console.log('\nFile stats: ');
        console.log('\nFile size: '+ stats.size + ' bytes');
        console.log('\nIs directory'+ stats.isDirectory() );
        console.log('\nIs file: '+ stats.isFile() );
    } );
}

export function getFilePath(){
    console.log('\nFile path details: ');
    const relative= './sample.txt';
    const absolute= path.resolve(relative);
    console.log('\nRelative path: '+ relative);
    console.log('\nAbsolute path: '+ absolute);
    console.log('\nDirectory name: '+ path.dirname(absolute));
    console.log('\nBase name: '+ path.basename(absolute));
    console.log('\nFile extension: '+ path.extname(absolute));

    const joined= path.join(__dirname, 'logs', 'sample.txt');
    console.log('\nJoined path (Safed): '+ joined);
}

export function getFileDescriptor(){
    const filePath= path.join(__dirname , 'logs', 'large.json');
    fs.open(filePath, 'r', (err, fd)=> {
        if(err) return console.error('Error:', err);
        console.log('\nFile descriptor:', fd);
        const buffer= Buffer.alloc(200);
        fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead)=> {
            if(err) return console.error('Error:', err);
            console.log(`\nRead ${bytesRead} bytes from file: ${filePath}`);
            console.log(buffer.toString('utf-8', 0, bytesRead));
            fs.close(fd, (err)=> {
                if(err) return console.error('Error closing file:', err);
            });
        });
    });
}

export function readFileSync(){
    const filePath= path.join(__dirname , 'logs', 'large.json');
    try{
        const data= fs.readFileSync(filePath, 'utf-8');
        console.log('\nSynchronous file read:', data.slice(0, 100) + '...'); 
        
    }catch(err){
        console.error('Error reading file:', err);
    }
}

export function checkReadPermissions() {
    const filePath= path.join(__dirname ,'logs', 'sample.txt');
    fs.access(filePath, fs.constants.R_OK, (err)=> {
        if(err) {
            console.error('\nNo read permission for file:', err);
            return false;
        }
        console.log('\nRead permission granted for file:', filePath);
        return true;
    });
    }

export function checkWritePermissions() {
    const filePath= path.join(__dirname , 'logs','sample.txt');
    fs.access(filePath, fs.constants.W_OK, (err)=> {
        if(err) {
            console.error('\nNo write permission for file:', err);
            return false;
        }
        console.log('\nWrite permission granted for file:', filePath);
        return true;
    });
    }       



export function readSmallFileAsync(){
    const filePath= path.join(__dirname , 'logs', 'sample.txt');
    try{
        if(checkReadPermissions()===false) return;
        fs.readFile(filePath, 'utf-8', (err, data)=>{
            if(err) return console.error('Error reading file:', err);
            console.log('\nAsynchronous file read:');
            console.log(data);
        });

    }catch(err){
        console.error('Error reading file:', err);
    }
}

export function readLargeFileWithStream(){
    const filePath= path.join(__dirname , 'logs', 'large.json');
    try{
        if(checkReadPermissions()===false) return;
        const readStream= fs.createReadStream(filePath, {encoding: 'utf-8'});
        let data= '';
        readStream.on('data', (chunk)=> {
            data += chunk;
        });
        readStream.on('end', ()=> {
            console.log('\nStreamed file read complete:');
            
        });
        readStream.on('error', (err)=> {
            console.error('Error reading file stream:', err);
        });
        
    }catch(err){
        console.error('Error reading file:', err);
    }
}

export function writeFileAsync(content){
    const filePath= path.join(__dirname ,'logs', 'output.txt');

    try{
        if(checkWritePermissions()===false) return;
        fs.writeFile(filePath, content, 'utf-8', (err)=> {
            if(err) return console.error('Error writing file:', err);
            console.log('\nFile written successfully to', filePath);
        });
        
    }catch(err){
        console.error('Error writing file:', err);
    }
}

export function makeDirectory(){
    const dirPath= path.join(__dirname , 'newDir');
    fs.mkdir(dirPath, { recursive: true }, (err)=> {
        if(err) return console.error('Error creating directory:', err);
        console.log('\nDirectory created successfully:', dirPath);
    });
  
}

export function readFilesInDirectory(){
    const dirPath= path.join(__dirname , 'newDir');
    fs.readdir(dirPath, (err, files)=> {
        if(err) return console.error('Error reading directory:', err);
        console.log('\nFiles in directory:', files);
    });
}

export function writeStream(){
    const filePath= path.join(__dirname, 'logs', 'sample.txt');
    const filetoRead= path.join(__dirname , 'logs', 'large.json');
    try{
        if(checkWritePermissions()===false) return;
        const readStream= fs.createReadStream(filetoRead, {encoding: 'utf-8', highWaterMark: 16 * 1024});
        const writeStream= fs.createWriteStream(filePath, {encoding: 'utf-8'});
        readStream.pipe(writeStream);
        writeStream.on('finish', ()=> {
            console.log('\nFile written successfully using stream to', filePath);
        });
        writeStream.on('error', (err)=> {
            console.error('Error writing file stream:', err);
        });


    }catch(err){
        console.error('Error with stream:', err);
    }
}




