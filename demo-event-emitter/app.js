import * as fs from 'fs';
import http from 'http';

const port= 8080;
const server= http.createServer((req, res) => {
    if(req.url==='/file'){
        const filepath= './content.txt';
        fs.access(filepath, fs.constants.F_OK, (err)=> {
            if(err){
                res.writeHead(404, {'content-type': 'application/json'});
                res.end('404 Not Found');   
                return;
            }
        });

        res.writeHead(200, {'content-type': 'application/json', 'content-disposition': 'attachment: filename="content.txt"'});

        const fileStream= fs.createReadStream(filepath);
        fileStream.pipe(res);

        fileStream.on('end', ()=>{
            console.log('Send file successfully');
        })

        fileStream.on('error', (err)=> {
            console.log('Error: ', err);
            res.writeHead(500, {"content-type": "application/json"});
            res.end(JSON.stringify({ "Error": "Server error" }))
        })
        

    }else{
         res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h2>Go to <a href="/file">/file</a> to download</h2>');
    }
});

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});