// "use strict"
const toyRobot = require('./components/toyRobot');
const b='my val';

const newToyRobot= new toyRobot();

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
  });
  
  lineReader.on('line', function (line) {
    console.log('Command:', line);
    let a=newToyRobot.parseCommand(line);
    console.log(a);
  });