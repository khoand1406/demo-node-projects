import http, { STATUS_CODES } from "node:http";
import { parse } from 'querystring';
import { readHtmlFiles, writeLog } from "./helpers/filehelpers.js";


const server= http.createServer(async (req, res)=> {
    const {url, method}= req;
    if(method === 'GET'){
        if(url==='/' || url==='/index'){
            const html= await readHtmlFiles('public', 'index.html');
            res.writeHead(200, {"content-type": "text/html"});
            res.end(html);
            writeLog(`Successfully make GET request to ${url} and get its response to render page. Response code: 200 ${STATUS_CODES[200]}`);
        }
        else if(url==='/about'){
            const html= await readHtmlFiles('public', 'about.html');
            res.writeHead(200, {"content-type":"text/html"});
            res.end(html);
            writeLog(`Successfully make GET request to ${url} and get its response to render page. Response code: 200 ${STATUS_CODES[200]}`);

        }else if(url==='/login'){
            const html= await readHtmlFiles('public', 'form.html');
            res.writeHead(200, {'content-type':'text/html'});
            res.end(html);
            writeLog(`Successfully make GET request to ${url} and get its response to render page. Response code: 200 ${STATUS_CODES[200]}`);
        }
        else{
            res.writeHead(404, {"content-type":"text/plain"});
            res.end("404 NOT FOUND");
            writeLog(`Get access to ${url} FAILED ! Resource not found. Response code: 404 ${STATUS_CODES[404]}`);
        }
    }else if(method==='POST' && url==='/submit'){
        let body = '';
    req.on('data', chunk => body += chunk.toString())
       .on('end', () => {
           const parsed = parse(body);
    
           res.writeHead(200, { "Content-Type": "application/json" });
           res.end(JSON.stringify({ message: "Data received", data: parsed }));
           
           writeLog(`POST /submit with data: ${JSON.stringify(parsed)}`);
       });
        
    }
    else{
        res.writeHead(404, {"content-type":"text/plain"})
        res.end('Action not found');
        writeLog(`Not allowed to make a ${method} request. Response code: 404 ${STATUS_CODES[404]}`);
    }
});

const PORT= 8080;
server.listen(PORT, ()=> {
    console.log('Server is listenning on port: '+ PORT);
})
