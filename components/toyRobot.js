
function ToyRobot() {
  // this.input=input
  this.start=false;
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
      const command=input.split(' ');
      const length=command.length;
      const F=['NORTH','SOUTH','EAST','WEST'];
      const suportedCommands=["PLACE","MOVE","LEFT","RIGHT","REPORT"];
      const isInCommandList=suportedCommands.indexOf(command[0]);
      const startedStatus=this.start;
      
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
  
          }
      } else if(isInCommandList!=-1) { 
       // resultCommand={"command":"MOVE"};
       resultCommand['command']=suportedCommands[isInCommandList];
      }
     
      if (isInCommandList===-1 || this.start===false) resultCommand={"command":"INVALID"}
      return resultCommand ;
    }
  
  ToyRobot.prototype.checkCommandFormat = function() {
      return 0;
    }
  
  
  
  module.exports = ToyRobot;
  
  