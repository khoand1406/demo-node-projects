import * as fs from "fs/promises";
import { formatLog } from "./loghelper.js";


export const readJsonFile = async function (filename, errorfilename) {
  if (typeof filename !== 'string') {
    const readError = formatLog('Require string input');
    await fs.writeFile(errorfilename, readError, 'utf-8');
    return [];
  }

  try {
    const data = await fs.readFile(filename, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    await fs.writeFile(errorfilename, `Read error: ${err.message}`, 'utf-8');
    return [];
  }
};

export const writeJsonFile= async function (filename, content) {
    await fs.writeFile(filename,JSON.stringify(content, null, 2),'utf-8');
}

