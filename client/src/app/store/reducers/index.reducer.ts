import { reducerRoom, RoomArrayIs } from "./room.reducers";
import { ActionReducerMap } from "@ngrx/store";
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