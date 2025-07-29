import fs from "fs/promises";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
const __root= resolve(__dirname, '..');

export async function readHtmlFiles(directory, filename){
    try {
        const filePath = resolve(__root, directory, filename);
        const html = await fs.readFile(filePath, 'utf-8');
        return html;
    } catch (error) {
        formatlog(error);
        return null;
    }
}

export function writeLog(content){
    const formatLog= formatlog(content);
    return fs.appendFile(resolve(__root, 'helpers', 'log.txt' ), formatLog, "utf-8")
}

function formatlog(log){
    const date= new Date().toString('yyyy-MM-dd');
    return `${date} ${log} \n`
}
