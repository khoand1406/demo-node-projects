export function generateRandomId(){
    const number= Math.random().toFixed(3);
    const string= new Date().toISOString();

    return `${number} ${string}`

}