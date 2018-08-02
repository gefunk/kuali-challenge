/**
* Represents an elevator
*/
class Elevator{
    /**
    * constructor for elevator
    * @param {int} num_floors - the number of floors
    * @param {doorOpenHandler} - register handler to recieve door open message
    * @param {doorCloseHandler} - register handler to receive door close message
    */
    constructor(elevator_id, num_floors, doorOpenHandler, doorCloseHandler){
        // handlers to handle different events
        this.doorCloseHanlder = doorCloseHandler;
        this.doorOpenHandler = doorOpenHandler;        
        // elevator ID assigned by controller
        this.elevator_id = elevator_id;
        // set num floors in building
        this.num_floors = num_floors;  
        // init current floor to 1
        this.current_floor = 1;
        // keeps track of how many trips before maintenance
        this.trips = 0;
        this.isOccupied = false;
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
   
}
    
      