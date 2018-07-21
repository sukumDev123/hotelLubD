import { reducerRoom, RoomArrayIs } from "./room.reducers";
import { ActionReducerMap } from "@ngrx/store";
import {  err_reducer } from "./err.reducer";
import { MessageCreated } from "../../interface/msg-create.interface";
import { reducerRoomSelect } from "./room-select.reducer";

export interface ManagetReducer {
    rooms : RoomArrayIs ,
    err :  MessageCreated ,
    room_select :   RoomArrayIs
}



export const reducer_total : ActionReducerMap<ManagetReducer> = {
    rooms: reducerRoom ,
    err : err_reducer,
    room_select : reducerRoomSelect
}