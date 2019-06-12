
function ToyRobot() {
  // this.input=input
  this.start=false;
  this.maxX=5;
  this.minX=0;
  this.maxY=5;
  this.minY=0;
  this.currentX=0;
  this.currentY=0;
  this.currentFacing=['NORTH','SOUTH','EAST','WEST'] ; //0=north,1=south,2=east,3=west
  this.suportedCommands=["PLACE","MOVE","LEFT","RIGHT","REPORT"];

  this.checkNextMove = function(nextMove){

  }


  this.executeCommand = function(command={"command":"PLACE"}) {
    let fn;
    let actions = {
      'PLACE': function (command) {
        
        return 'Place succesfully completed';
      },
      'default': function (command) {
        return 'Default item';
      }
    };
    // if the actions Object contains the command
    // passed in, let's use it
    if (actions[command.command]) {
      fn = actions[command.command];
    } else {
      // otherwise we'll assign the default
      // also the same as drinks.default
      // it's just a little more consistent using square
      // bracket notation everywhere
      fn = actions['default'];
    }

   
    return fn(command);
    
    }
  this.filterIntt = function(value) {
      if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value);
      } else {
        return NaN;
      }
    }
  }
  
  ToyRobot.prototype.parsedCommand = function(input='') {

      let resultCommand={};
      const command=input.toUpperCase().split(' ');
      const length=command.length;
      const F= this.currentFacing;
      const suportedCommands=this.suportedCommands;
      const isInCommandList=suportedCommands.indexOf(command[0]);
      const start=this.start;

      
     
      if (length===2 && command[0]==='PLACE') {
          resultCommand['command']='PLACE';
          const values = command[1].split(',');
          if (values.length===3) {
              const filteredX=this.filterIntt(values[0]);
              const filteredY=this.filterIntt(values[1]);
              if (filteredX!=NaN) {resultCommand['x']=filteredX}
            //  if (filteredY!=NaN) {resultCommand['y']=filteredY}
              filteredY!=NaN ? resultCommand['y']=filteredY : resultCommand={"command":"INVALID"};
              const face = F.indexOf(values[2]);
              // if (face!=-1) resultCommand['f']=F[face];
              face!=-1 ? resultCommand['f']=F[face] : resultCommand={"command":"INVALID"};

              if (resultCommand["command"]!="INVALID" && this.start===false) this.start=true; // robot started with place command
  
          } else {resultCommand={"command":"INVALID"}}
      } else if(isInCommandList!=-1) { 
       // resultCommand={"command":"MOVE"};
       resultCommand['command']=suportedCommands[isInCommandList];
      }
     
      if (isInCommandList===-1 || this.start===false) { resultCommand={"command":"INVALID"} } else {
        // execute command

      }
      return resultCommand ;
    }
  

  
  
  
  module.exports = ToyRobot;
  

  