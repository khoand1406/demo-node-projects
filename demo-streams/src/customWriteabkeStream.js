import { Writeable } from "stream";


export class MyWritable extends Writeable {
  constructor(options) {
    super({ ...options, objectMode: true });
  }

  _write(chunk, encoding, callback) {
    console.log(`Writing:`, chunk);
    
    callback();
  }

  _final(callback) {
    console.log('All data written. Finishing stream.');
    callback();
  }
}