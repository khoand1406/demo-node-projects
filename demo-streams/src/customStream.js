import { Readable } from "stream";
import { Buffer } from "buffer";
export class CustomStream extends Readable{
    constructor(options){
        super(options);
        this.current=1;
        this.max= 5;
    }

    _read(size){
        setImmediate(()=>{
            this.push(':)')
            if(this.current> this.max){
                this.push(null);
            }
            else{
                const chunk= Buffer.from(this.current.toString());
                this.push(chunk);
                this.current++
            }
        });
    }

    _destroy(err, callback){
        console.log('Stream destroyed');
        callback(err);
    }

}