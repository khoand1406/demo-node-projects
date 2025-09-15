
import { readFile, writeFile } from '../src/utils.js';
import {describe, test, expect, beforeAll} from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs'
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const logPath = path.resolve(__dirname, '../src/logs');
const logfile = path.join(logPath, 'output.txt'); 


beforeAll(()=> {
    if(!fs.existsSync(logPath)){
        fs.mkdirSync(logPath);
    }
    fs.writeFile(logfile, "Test log file", (err)=>{
        if(err) throw err;
    });
})

describe('File Operations', () => {
  test('should read file', async () => {
    const data = await readFile();
    expect(data).toBeDefined();
  });

  test('Write Operations from Read Streams', async () => {
    const result = await writeFile();
    expect(result).toBeDefined();
  });
});
