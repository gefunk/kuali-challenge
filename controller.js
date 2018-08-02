let Elevator = require ("./elevator");


class Controller{
    constructor(num_floors, num_elevators){
        
        // initialize the number of floors
        // we will keep track of which elevator is on which floor here
        this.floors = {};
        for(var i = 0; i < num_floors; i++){
            this.floors[i.toString()] = {};
        }
        
        // initialize available elevators
        // keep track of available elevators in this object
        this.floorsAvailableElevators = {};
        for(var i = 0; i < num_floors; i++){
            this.floorsAvailableElevators[i.toString()] = {};
        }
        
        // initialize elevators with the number of elevators
        for(var elevator_num = 0; i < num_elevators; i++){
            let e = new Elevator(elevator_num, 5, elevatorDoorOpen, elevatorDoorClose);
            this.floorsAvailableElevators.["1"].elevator_num = e;
            this.floors.["1"].elevator_num = e;
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
            // this will never let a request for the elevator go past the max floor
            let nextClosestFloorUp = floor_no + (floor_no - nextClosestFloorDown);
            if(nextClosestFloorUp > num_floors){
                nextClosestFloorUp = num_floors;
            }
            
            // check the upwards or downwards floor for the closest elevator
            if(this._checkElevatorOnFloor(nextClosestFloorDown)){
                
                callback(nextClosestFloorDown);


            }else if(this._checkElevatorOnFloor(nextClosestFloorUp)){
                callback(nextClosestFloorUp);
            }
        }
        
        
    }
    
    
    /**
    * @param {int} get the next available elevator on the floor
    */
    _getElevatorAvailableOnFloor(floor_no, callback){
        // call any of the elevators that are on this floor
        let floor = this.floor[floor_no];
        for (var elevator in floor) {
            if(floor.hasOwnProperty(elevator)){
                if(floor[elevator].isAvailable()){
                    callback(floor[elevator]);
                }
            }
        }
    }
    
    /**
    * Helper function to call elevator on floor
    * @param {int} floor_no - the floor no to call elevator from
    */
    _checkElevatorOnFloor(floor_no){
        //check if any elevators are on the floor
        if(Object.keys(this.floors[floor_no]).length != 0){
            return true;
        }else{
            return false;
        }
    }
    
    /**
    * Request Elevator to come to pickup
    * @param {int} floor_no - the floor to come pick up from
    */
    requestElevator(floor_no){
        
        let elevatorCalled = false;
        // call elevator on this floor if its there
        if(this._checkElevatorOnFloor(floor_no)){
            this._getElevatorAvailableOnFloor(floor_no, function(elevator){
                if(elevator){
                    elevator.request(floor_no);
                    
                } else {
                    // no available elevators on floor
                    // second option is to see if any elevators are crossing
                    // this floor while moving
                    if(elevatorCrossing){
                        
                    }else{
                        // third option is to call the next closest elevator
                        // from another floor
                        this._findNextClosestElevator(floor_no, function(floor_no){

                        });
                    }
                }
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







