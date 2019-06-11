
var chai = require('chai');
var expect = chai.expect; 
let parseCommand = require('../../components/parseCommand');


describe('parseCommand', function() {
  it('Component should be a function ', function() {

    expect(parseCommand).to.be.a('function');
  });
  it('method parseCommand.result should return an object', function() {
    let newParseCommand= new parseCommand("");
    expect(newParseCommand.result()).to.be.a('object');
  });
  it('Component should return an object of  three elements when a valid place command has been entered ', function() {
    var newParseCommand= new parseCommand("PLACE 0,0,NORTH");
    expect(newParseCommand.result()).to.be.a('object');
    expect(newParseCommand.result()).to.have.property('command','PLACE');
    expect(newParseCommand.result()).to.have.property('x',0);
    expect(newParseCommand.result()).to.have.property('y',0);
    expect(newParseCommand.result()).to.have.property('f','NORTH');
  });
  it('Component should return an error message  when a invalid place command has been entered ', function() {
    var newParseCommand= new parseCommand("MOVE");
    expect(newParseCommand.result()).to.be.a('object');
    expect(newParseCommand.result()).to.have.property('command','MOVE');

  });

  it('Component should have a method that checks if input is correct format', function() {
    var newParseCommand= new parseCommand(["place 0,0,0"]);
    expect(newParseCommand.checkFormat()).to.equal(0);


  });

  // it('getSubtotal() should return 0 if no items are passed in', function() {
  //   var cartSummary = new parseCommand(["place 0,0,0"]);
  //   expect(cartSummary.getSubtotal()).to.equal(0);
  // });
});

let CartSummary = require('../../components/cartSummary');

describe('CartSummary', function() {
  it('getSubtotal() should return 0 if no items are passed in', function() {
    var cartSummaryx = new CartSummary([]);
    expect(cartSummaryx.getSubtotal()).to.equal(0);
  });
});