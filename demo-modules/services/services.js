import path from "path";
import { fileURLToPath } from "url";
import { readJsonFile, writeJsonFile } from "../helper/helper.js";
import { formatLog } from "../helper/loghelper.js";
import { generateRandomId } from "../helper/utils.js";


const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

const dataPath= path.resolve(__dirname, '../data/Roommate.json');
const errorPath= path.resolve(__dirname, '../error.txt');

export async function CreateRoomate(data){
    const roomates= await readJsonFile(dataPath, errorPath);
    const roomate= {id: generateRandomId(), name: data}
    roomates.push(roomate);
    await writeJsonFile(dataPath, roomates);
    formatLog('Create Roommate Success');
    console.log('Create Roomate Success');
}

async function ListRoomate(){
    const roomates= await readJsonFile(dataPath, errorPath);
    if(roomates.length===0){
        formatLog('No Roomates Found');
    }
    return roomates;
}

export async function Delete(id) {
    const roomates= ListRoomate();
    const filtered= roomates.filter(roomate=> roomate.Id !== Number(id));
    if (notes.length === filtered.length){
        formatLog('No Roomates Found');
        return console.log(' Roomates not found.');
    } 
    await writeJsonFile(dataPath, filtered)
    console.log('Roomate deleted')
        
}




