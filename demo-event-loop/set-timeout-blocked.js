const Task1= ()=> console.log('Hello World');
const Task2= ()=> console.log('Set timeout...');
const Task3= ()=> console.log('Third');

Task1();
setTimeout(Task2, 0);


const startTime = new Date();
const threeMoreSeconds = 3000;
const endTime = new Date(startTime.getTime() + threeMoreSeconds);

while (new Date() < endTime) {
  Task3();
}