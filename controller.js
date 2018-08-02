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
            let e = new Elevator(elevator_num, 5, elevatorDoorOpen, elevatorDoorClose, elevatorMaintenaceActive,elevatorMaintenaceInActive);
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
    * Remove elevator from available floors
    * @param {int} elevator_id, the elevator that should be removed
    * @param {int} floor_num, the floor that it is currently on
    */
    elevatorMaintenaceActive(elevator_id, floor_num){
        console.log("Elevator is going to maintenanceMode");
        let floor = this.floorsAvailableElevators[floor_no];
        for (var elevator in floor) {
            if(floor.hasOwnProperty(elevator)){
                if(floor[elevator].elevator_id == elevator_id){
                    delete floor[elevator];
                    break;
                }
            }
        }
    }
    
    /**
    * Add elevator to available elevators on floors
    * @param {elevator} the elevator to add back to the available floors
    */
    elevatorMaintenaceInActive(elevator){
        console.log("Elevator is coming out of maintenanceMode");
        let floor = this.floorsAvailableElevators[floor_no];
        floor[elevator.elevator_id] = elevator;
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
        let floor = this.floorsAvailableElevators[floor_no];
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
        if(Object.keys(this.floorsAvailableElevators[floor_no]).length != 0){
            return true;
        }else{
            return false;
        }
    }
    
    /**
    * Helper function to call the first
    * elevator on this floor
    */
    _callElevatorOnFloor(floor_no){
        // call any of the elevators that are on this floor
        let floor = this.floorsAvailableElevators[floor_no];
        for (var elevator in floor) {
            if(floor.hasOwnProperty(elevator)){
                floor[elevator].request();
                break;
            }
        }
    }
    
    /**
    * Request Elevator to come to pickup
    * @param {int} floor_no - the floor to come pick up from
    */
    requestElevator(floor_no){
        
        // call elevator on this floor if its there
        if(this._checkElevatorOnFloor(floor_no)){
            this._callElevatorOnFloor(floorWithElevator);
        } else if(elevatorCrossing){
            // no available elevators on floor
            // second option is to see if any elevators are crossing
            // this floor while moving
            
        }else{
            // third option is to call the next closest elevator
            // from another floor
            this._findNextClosestElevator(floor_no, function(floorWithElevator){
                this._callElevatorOnFloor(floorWithElevator);
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







