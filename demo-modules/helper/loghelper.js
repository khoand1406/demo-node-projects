
export const formatLog= function(log){
    let datetime= new Date();
    return `[${datetime}: ${log}]`
}