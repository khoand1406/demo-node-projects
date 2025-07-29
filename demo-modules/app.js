import { CreateRoomate, Delete } from "./services/services.js";


const [,,command, ...args]= process.argv


    switch(command){
        case 'add':
            await CreateRoomate(args[0]);
            break;
        case 'delete':
            await Delete(args[0]);
            break;
        case 'exit':
            break;
            
    }
