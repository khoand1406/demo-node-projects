import fs from "fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname, '../output.txt');
export const formatLog= function(log){
    let datetime= new Date();
    return fs.writeFile(logPath, `[${datetime}: ${log}]`)
}