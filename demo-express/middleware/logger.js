export function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

export function nextLogger(req, res, next){
    console.log('next cua middleware1 da chay qua day');
    next();
}