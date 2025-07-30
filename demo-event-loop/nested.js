console.log('Start');

setTimeout(() => {
  console.log('setTimeout 1');

  Promise.resolve().then(() => {
    console.log('Promise inside setTimeout 1');
  });

  process.nextTick(() => {
    console.log('nextTick inside setTimeout 1');
  });

  setTimeout(() => {
    console.log('setTimeout 2 (nested)');

    Promise.resolve().then(() => {
      console.log('Promise inside setTimeout 2');
    });

    process.nextTick(() => {
      console.log('nextTick inside setTimeout 2');
    });
  }, 0);
}, 0);

Promise.resolve().then(() => {
  console.log('Promise outside setTimeout');
});

process.nextTick(() => {
  console.log('Next tick outset settimeout' );
});

console.log('End');
