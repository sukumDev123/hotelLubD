import { reducerRoom, RoomArrayIs } from "./booking.reducers";
import { ActionReducerMap } from "../../../../node_modules/@ngrx/store";

export interface RoomsIs {
    rooms : RoomArrayIs ,
    
}



export const reducer_total : ActionReducerMap<RoomsIs> = {
    rooms: reducerRoom
}