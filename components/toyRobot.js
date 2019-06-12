function ToyRobot() {
  // this.input=input
  this.start=false;
  this.maxX=5;
  this.minX=0;
  this.maxY=5;
  this.minY=0;
  this.currentX=0;
  this.currentY=0;
  this.currentFacing='' ;
  this.facing=['NORTH','SOUTH','EAST','WEST'] ; //0=north,1=south,2=east,3=west
  this.suportedCommands=["PLACE","MOVE","LEFT","RIGHT","REPORT"];



  this.executeCommand = function(command={"command":"PLACE"}) {
    let fn;
    let value=1;
    let move=false;
    let message='Place command was unsuccessful';
    let currentPos;
    let actions = {
      'PLACE':  (command) =>{
        // console.log(command.f);
        if (command.x>=this.minX && command.x<=this.maxX && command.y>=this.minY && command.y<=this.maxY) move=true;
   
     if(move) {
       this.currentX=command.x,  this.currentY=command.y,  this.currentFacing=command.f;
       message='Place succesfully completed';

     }
       currentPos=this.getCurrentPosition();
       
        return {'message':message,'pos':currentPos};
      },
      'MOVE':  (command) => {
         const f=this.currentFacing;
         const orientationIndex=this.facing.indexOf(f);
         console.log( orientationIndex);
         switch (orientationIndex) {
          case 0: { //North
            if (this.currentY<5) {++this.currentY;message='Move succesfully completed';}
            break;
          }
          case 1: { //South
            if (this.currentY>0) {--this.currentY;message='Move succesfully completed';}
            break;
          }
          case 2: {  //East
            
            if (this.currentX<5) {++this.currentX;message='Move succesfully completed';}
            break;
          }
          case 3: {  //West
            if (this.currentX>0) {--this.currentX;message='Move succesfully completed';}
          
            break;
          }
          default: {
            
          }
        }

        // if (this.currentY<5) {++this.currentY;message='Move succesfully completed';}
        currentPos=this.getCurrentPosition();
        
        
        return {'message':message,'pos':currentPos};
      },
      'LEFT':  (command) => { //Rotate left
        const compass=['WEST','NORTH','EAST','SOUTH']
        const f=this.currentFacing;
        let orientationIndex=compass.indexOf(f);

        console.log( orientationIndex);

        (orientationIndex > 0) ? --orientationIndex : orientationIndex=3;

        console.log(compass[orientationIndex]);
        this.currentFacing=compass[orientationIndex];
        currentPos=this.getCurrentPosition();
        message='Move succesfully completed';
        return {'message':message,'pos':currentPos};
       },
      'RIGHT':  (command) => { 
        const compass=['WEST','NORTH','EAST','SOUTH']
        const f=this.currentFacing;
        let orientationIndex=compass.indexOf(f);

        

        (orientationIndex < 3) ? ++orientationIndex : orientationIndex=0;

        console.log(compass[orientationIndex]);
        this.currentFacing=compass[orientationIndex];
        currentPos=this.getCurrentPosition();
        message='Rotate succesfully completed'
        return {'message':message,'pos':currentPos};        
      },
      'REPORT': (command) => {
  
        message='Report succesfully completed';
        currentPos=this.getCurrentPosition();
        return {'message':message,'pos':currentPos};  

       },
      'default': function (command) {
        // console.log(command);
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

    this.getCurrentPosition = function() {
     
      return {"x":this.currentX,"y":this.currentY,"f":this.currentFacing}
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

      let resultCommand={"command":"","x":0,"y":0,"f":0};
      const command=input.toUpperCase().split(' ');
      const length=command.length;
      const F= this.facing;
      const suportedCommands=this.suportedCommands;
      const isInCommandList=suportedCommands.indexOf(command[0]);
      const start=this.start;
      let message='';

      
     
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
        message=this.executeCommand(resultCommand);
        
        
      }
      return resultCommand ;
    }
  


  
  
  module.exports = ToyRobot;
  

  