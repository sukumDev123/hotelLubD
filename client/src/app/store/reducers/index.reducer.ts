import { reducerRoom, RoomArrayIs } from "./booking.reducers";
import { ActionReducerMap } from "../../../../node_modules/@ngrx/store";
import { Message, err_reducer } from "./err.reducer";

export interface ManagetReducer {
    rooms : RoomArrayIs ,
    err :  Message
}



export const reducer_total : ActionReducerMap<ManagetReducer> = {
    rooms: reducerRoom ,
    err : err_reducer
}