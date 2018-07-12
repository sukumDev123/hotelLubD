import { reducerRoom, RoomArrayIs } from "./booking.reducers";
import { ActionReducerMap } from "../../../../node_modules/@ngrx/store";
import {  err_reducer } from "./err.reducer";
import { MessageCreated } from "../../interface/msg-create.interface";

export interface ManagetReducer {
    rooms : RoomArrayIs ,
    err :  MessageCreated
}



export const reducer_total : ActionReducerMap<ManagetReducer> = {
    rooms: reducerRoom ,
    err : err_reducer
}