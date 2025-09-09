import fs from 'fs/promises';
export class Logger{
    private fileName: string;

    constructor(fileName: string){
        this.fileName = fileName;
    }

    async log(message: string){
        const timestamp = new Date().toISOString();
        message= `${timestamp} - ${this.fileName} - ${message}`;
        await fs.appendFile(this.fileName, message + '\n');
        console.log('Logged:', message);
    }
}