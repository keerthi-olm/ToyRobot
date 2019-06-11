
function ParseCommand(input) {
this.input=input;
this.filterIntt = function(value) {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return Number(value);
    } else {
      return NaN;
    }
  }
}

ParseCommand.prototype.result = function() {
    let resultCommand={};
    let command=this.input.split(' ');
    const length=command.length;
    const F=['NORTH','SOUTH','EAST','WEST'];
    const suportedCommands=["PLACE","MOVE","LEFT","RIGHT","REPORT"];
    const isInCommandList=F.indexOf(command[0]);
    
    if (length===2 && command[0]==='PLACE') {
        resultCommand['command']='PLACE';
        const values = command[1].split(',');
        if (values.length===3) {
            const filteredX=this.filterIntt(values[0]);
            const filteredY=this.filterIntt(values[1]);
            if (filteredX!=NaN) {resultCommand['x']=filteredX}
            if (filteredY!=NaN) {resultCommand['y']=filteredY}
            const face = F.indexOf(values[2]);
            if (face!=-1) resultCommand['f']=F[face];

        }
    } else if(1) { resultCommand={"command":"MOVE"};}
    return resultCommand ;
  }

ParseCommand.prototype.checkFormat = function() {
    return 0;
  }



module.exports = ParseCommand;

