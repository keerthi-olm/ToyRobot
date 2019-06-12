"use strict"
const toyRobot = require('./components/toyRobot');
const standard_input = process.stdin;

console.log("Please enter your robot commands");


standard_input.on('data', function (data) {

    // User input exit.
    if(data.toString().trim() === 'exit'){
        // Program exit.
        console.log("User input complete, program exit.");
        // process.exit();
    }else
    {
        // Print user input in console.
        console.log('User Input Data : ' + data);
    }
});