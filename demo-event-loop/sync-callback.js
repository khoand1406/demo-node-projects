const Task1= ()=> console.log('Task 1');

const Task2= (cb)=> {
    console.log('Task 2');
    cb();
}

const Task3= ()=>{
    console.log('Task 3');
}

Task1();
Task2(Task3);
Task3()