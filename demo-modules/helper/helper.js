import * as fs from "fs/promises";
import { formatLog } from "./loghelper";


export const readJsonFile= async function(filename, errorfilename){
    if(typeof(filename)!=='string'){
        const readError= formatLog('Require string input');
        fs.writeFile(errorfilename, readError, 'utf-8');
    }
    const data= await fs.readFile(filename, 'utf-8')
    return JSON.parse(data);
}

export const writeJsonFile= async function (filename, content) {
    await fs.writeFile(filename,JSON.stringify(content),'utf-8');
}

