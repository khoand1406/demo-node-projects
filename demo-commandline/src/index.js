import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Username: ', username => {
  
  rl.stdoutMuted = true;

  rl.question('Password: ', password => {
    console.log('\nUsername:', username);
    console.log('Password received (hidden)');
    rl.close();
  });

  rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted) {
      rl.output.write('*');
    } else {
      rl.output.write(stringToWrite);
    }
  };
});