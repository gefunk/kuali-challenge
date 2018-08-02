/**
* Represents an elevator
*/
class Elevator{

    /**
    * constructor for elevator
    * @param {int} num_floors - the number of floors
    */
    constructor(elevator_id, num_floors, doorOpenHandler, doorCloseHandler, moveFloorHandler){
        // handlers to handle different events
        this.doorCloseHanlder = doorCloseHandler;
        this.doorOpenHandler = doorOpenHandler;        
        this.moveFloorHandler = moveFloorHandler;
        // elevator ID assigned by controller
        this.elevator_id = elevator_id;
        // set num floors in building
        this.num_floors = num_floors;  
        // init current floor to 1
        this.current_floor = 1;
        // keeps track of how many trips before maintenance
        this.trips = 0;
        this.isOccupied = false;
        // maintenance mode
        this.maintenanceMode = false;
    }
    
    /**
    * @return if elevator is occupied or not
    */
    isOccupied(){
        return this.isOccupied;
    }
    
    /**
    * notifies registered handler of door open
    */
    function doorOpen(){
        this.doorOpenHandler(this.elevator_id);
    }
    
    /**
    * notifies registered handler of door close
    */
    function doorClose(){
        this.doorCloseHanlder(this.elevator_id);
    }
      
    /**
    * private function to move elevator to requested floor
    */
    function _moveToFloor(floor_no, callback){
        if(this.current_floor == floor_no){
            // elevator has reached floor
            console.log("Elevator at "+this.floor_no);
            this.doorOpen();
        }else if(this.current_floor < floor_no){
            this.current_floor += 1;
            console.log("Elevator, "+this.elevator_id+" moving to floor: "+this.current_floor);
            this.moveFloorHandler(this.current_floor);
            // recursively call function to move up one floor
            this._moveToFloor(floor_no);
        }else if(this.current_floor > floor_no){
            this.current_floor -= 1;
            console.log("Elevator, "+this.elevator_id+" moving to floor: "+this.current_floor);
            this.moveFloorHandler(this.current_floor);
            // recursively call function to move down one floor
            this._moveToFloor(floor_no);
            
        }

    }
      
    /**
    * handle request to go to floor
    * @param {int} floor_no the floor that the request is asking the elevator to go to
    * @return {boolean} if the request is successful or not
    */
    function request(floor_no){
        if(this.trips == 100){
            this.maintenanceMode = true;
            return false;
        }else{
            this._moveToFloor(floor_no, this.doorOpen);
            this.trips++;
            return true;
        }
    }
    
    /**
    * Do maintenance, set this elevator to be available again
    */
    function doMaintenance(){
        this.maintenanceMode = false;
    }
    
    
}

module.exports = Elevator;