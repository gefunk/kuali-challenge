let Elevator = require ("./elevator");


class Controller{
    constructor(num_floors, num_elevators){
        // initialize elevators with the number of elevators
        this.elevators = {};
        for(i = 0; i < num_elevators; i++){
            this.elevators[i] = new Elevator(i, 5, elevatorDoorOpen, elevatorDoorClose);
        }
        
        // initialize the number of floors
        // we will keep track of which elevator is on which floor here
        this.floors = {};
        for(i = 0; i < num_floors; i++){
            this.floors[i] = {};
        }
    }
    
    /** 
    * information handler for elevator door open
    */
    elevatorDoorOpen(elevator_id){
        console.log("Elevator ", elevator_id, " door open");
    }
    
    /** 
    * informational handler for elevator door close
    */
    elevatorDoorClose(elevator_id){
        console.log("Elevator ", elevator_id, " door close");
    }
    
    /**
    * find next closest elevator
    */
    _findNextClosestElevator(floor_no, callback){
        // Find the next closest elevator
        // this method is incrementing downwards at the same time
        // as well as incrementing up to conduct the closest elevator search
        // in double time if done independently
        for(var nextClosestFloorDown=floor_no; nextClosestFloorDown >= 1; nextClosestFloorDown--){
            
            // search the next closest floor upwards, max at the num floor
            let nextClosestFloorUp = floor_no + (floor_no - nextClosestFloorDown);
            if(nextClosestFloorUp > num_floors){
                nextClosestFloorUp = num_floors;
            }
            
            // check the upwards or downwards floor for the closest elevator
            if(this.floor[nextClosestFloorDown][0]){
                callback(nextClosestFloorDown);
            }else if(Object.keys(this.floors[floor_no]).length == 0this.floor[nextClosestFloorUp][0]){
                callback(nextClosestFloorUp);
            }
        }
        
        
    }
    
    _checkElevatorAvailableOnFloor(floor_no){
        
    }
    
    /**
    * Helper function to call elevator on floor
    * @param {int} floor_no - the floor no to call elevator from
    */
    _checkElevatorOnFloor(floor_no){
        //check if any elevators are on the floor
        if(Object.keys(this.floors[floor_no]).length != 0){
            // call any of the elevators that are on this floor
            let floor = this.floor[floor_no];
            for (var elevator in floor) {
                if(floor.hasOwnProperty(elevator)){
                    if(floor[elevator].request(floor_no)){
                        return true;
                    }
                }
            }
        }
    }
    
    /**
    * Request Elevator to come to pickup
    * @param {int} floor_no - the floor to come pick up from
    */
    requestElevator(floor_no){
        
        let elevatorCalled = false;
        // call elevator on this floor if its there
        if(this._callElevatorOnFloor(floor_no)){
            elevatorCalled=true;
        }
        
        else{
            // check the next closest elevator up or down
            this._findNextClosestElevator(floor_no, function(){
                
            });
        }

    }
    
    /**
    * Service Elevator based on ID
    * @param {int} elevator_id - the elevator to service
    */
    serviceElevator(elevator_id){
        this.elevators[elevator_id].doMaintenace();
    }
}


/** 
* information handler for elevator door open
*/
function elevatorDoorOpen(elevator_id){
    console.log("Elevator ", elevator_id, " door open");
}

/** 
* informational handler for elevator door close
*/
function elevatorDoorClose(elevator_id){
    console.log("Elevator ", elevator_id, " door close");
}


function requestElevator(floor_no){
    
}







