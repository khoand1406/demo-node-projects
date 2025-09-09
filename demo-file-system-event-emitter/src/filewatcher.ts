import { EventEmitter } from "node:events";
import fs from "node:fs";
export class fileWatcher extends EventEmitter {
    private file: string;

    constructor(file: string) {
        super();
        this.file = file;
    }

    watch() {
        fs.watch(this.file, (eventType) => {
        if (eventType === "change") {
            this.emit("fileChanged", this.file);
            }
        });
    }
}
