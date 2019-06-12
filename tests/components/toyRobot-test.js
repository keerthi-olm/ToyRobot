
const chai = require('chai');
const expect = chai.expect; 
const toyRobot = require('../../components/toyRobot');


describe('toyRobot', function() {
  it('Component should be a function ', function() {

    expect(toyRobot).to.be.a('function');
  });
  it('method toyRobot.parsedCommand should return an object', function() {
    let newToyRobot= new toyRobot("");
    expect(newToyRobot.parsedCommand()).to.be.a('object');
  });
  it('method toyRobot.parsedCommand should return an object of  three elements when a valid place command has been entered ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0,0,NORTH";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input)).to.have.property('command','PLACE');
    expect(newToyRobot.parsedCommand(input)).to.have.property('x',0);
    expect(newToyRobot.parsedCommand(input)).to.have.property('y',0);
    expect(newToyRobot.parsedCommand(input)).to.have.property('f','NORTH');
  });
  it('method toyRobot.parsedCommand should not accept place commands that do not have exactly three arguments', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0";
    const input2= "PLACE 0,3,3,4";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input)).to.have.property('command','INVALID');
    expect(newToyRobot.parsedCommand(input2)).to.have.property('command','INVALID');

  });
  it('method toyRobot.parsedCommand should return command property with value invalid when a invalid place command has been entered ', function() {
    var newToyRobot= new toyRobot();
    const input="PLACEx 0,0,NORTH";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input)).to.have.property('command','INVALID');
    const input2="PLACE 0,0,NORTHesat";
    expect(newToyRobot.parsedCommand(input2)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input2)).to.have.property('command','INVALID');
    const input3="PLACE 0,eee,NORTHesat";
    expect(newToyRobot.parsedCommand(input3)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input3)).to.have.property('command','INVALID');
  });

  it('method toyRobot.parsedCommand should not accept any commands until a place command has been issued ', function() {
    var newToyRobot= new toyRobot();
    const input="MOVE";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input)).to.have.property('command','INVALID');

  });
  it('method toyRobot.parsedCommand should  accept commands after a place command has been issued ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0,0,NORTH";
    const input2="MOVE";
    const input3="LEFT";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input2)).to.have.property('command','MOVE');
    expect(newToyRobot.parsedCommand(input3)).to.have.property('command','LEFT');

  });
  // Test toyRobot.executeCommand method

  it('method toyRobot.execute command ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0,0,NORTH";
    const parsedCommand=newToyRobot.parsedCommand(input);
    expect(newToyRobot.executeCommand(parsedCommand)).to.equal('Place succesfully completed');

  });

});
