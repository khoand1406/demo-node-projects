import express from 'express';
import { logger, nextLogger } from './middleware/logger.js';
import router from './route/users.js';
const app= express();
const port= 8080;


app.use(logger);
app.use(nextLogger);
app.get('/', (req, res)=> {
    
    res.send('Hello world');
    
})
app.use('/users', router);


app.use((err, req, res, next)=> {
    console.log('chay qua middleware check error')
    res.status(400).send(err.message);
})


app.listen(port, (err)=>{
    if(err) console.log(err);
    console.log(`Server is running at port: ${port}`);
})
